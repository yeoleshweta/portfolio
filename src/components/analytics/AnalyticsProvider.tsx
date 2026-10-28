"use client";

import { useEffect, useRef } from "react";
import { browserCollector } from "@/lib/analytics/client";
import { usePathname } from "next/navigation";
import {
  CONSENT_EVENT,
  EVENTS,
  projectSlugFor,
  track,
  type EventName,
  type EventParams,
} from "@/lib/analytics";

/**
 * The site-wide behavioural listener. Mount once, in the root layout.
 *
 * It handles everything that can be observed generically, so individual
 * components stay clean:
 *
 *   • delegated click tracking (CV, mailto, socials, anything [data-track])
 *   • scroll-depth milestones (25 / 50 / 75 / 90 %)
 *   • case-study completion
 *   • engaged-time milestones (30 / 60 / 180 s of *visible* time)
 *   • SPA page_view on App Router client navigations (skips first load —
 *     that one is already sent by gtag config send_page_view)
 *   • case_study_view on every /work/* route
 *
 * Components only need a `data-track` attribute when the semantics can't be
 * inferred from the link itself (e.g. which project card was clicked).
 */

const SCROLL_MILESTONES = [25, 50, 75, 90] as const;
const TIME_MILESTONES = [30, 60, 180] as const;

/** Hosts we care about by name. Everything else falls back to GA4's
 *  automatic outbound `click` event from Enhanced Measurement. */
const SOCIAL_HOSTS: Record<string, string> = {
  "linkedin.com": "linkedin",
  "www.linkedin.com": "linkedin",
  "github.com": "github",
  "www.github.com": "github",
  "x.com": "x",
  "twitter.com": "x",
  "medium.com": "medium",
  "shweta969612.substack.com": "substack",
  "dribbble.com": "dribbble",
  "behance.net": "behance",
  "www.behance.net": "behance",
  "scholar.google.com": "google_scholar",
};

const RESUME_PATTERN = /(resume|cv)/i;
const DOC_PATTERN = /\.(pdf|zip|docx?)($|\?)/i;

/** Read data-track-* attributes off an element into GA event params. */
function paramsFromDataset(el: HTMLElement): EventParams {
  const params: EventParams = {};
  for (const [key, value] of Object.entries(el.dataset)) {
    if (!key.startsWith("track") || key === "track" || value === undefined) {
      continue;
    }
    // dataset key "trackProjectSlug" -> GA param "project_slug"
    const name = key
      .slice("track".length)
      .replace(/^[A-Z]/, (c) => c.toLowerCase())
      .replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
    params[name] = value;
  }
  return params;
}

/** Where on the page did this click happen? Used as the `location` param. */
function locationOf(el: Element): string {
  const explicit = el.closest<HTMLElement>("[data-track-location]");
  if (explicit?.dataset.trackLocation) return explicit.dataset.trackLocation;
  if (el.closest("nav")) return "navbar";
  if (el.closest("#contact")) return "contact_section";
  if (el.closest("footer")) return "footer";
  return "body";
}

export default function AnalyticsProvider() {
  const pathname = usePathname();
  /* One page-view authority for initial loads, App Router transitions and consent. */
  useEffect(() => {
    const report = () => {
      track(EVENTS.PAGE_VIEW, { page_title: document.title });
      if (pathname?.startsWith("/work/") && pathname !== "/work/team-contract") {
        track(EVENTS.CASE_STUDY_VIEW, {project_slug: projectSlugFor(pathname)});
      }
    };
    const frame = requestAnimationFrame(report);
    window.addEventListener(CONSENT_EVENT, report);
    const flush = window.setInterval(() => { void browserCollector()?.flush(); }, 5000);
    const heartbeat = window.setInterval(() => {
      if (document.visibilityState === "visible") void browserCollector()?.flush(true);
    }, 30000);
    const onLeave = () => { void browserCollector()?.flush(); };
    window.addEventListener("pagehide", onLeave);
    const sync = (event: StorageEvent) => {
      if (event.key === "sw_consent_v1" || event.key === "sw_analytics_excluded") {
        if (event.newValue !== "granted" || event.key === "sw_analytics_excluded") browserCollector()?.reset();
      }
    };
    window.addEventListener("storage", sync);
    return () => {
      cancelAnimationFrame(frame); clearInterval(flush); clearInterval(heartbeat);
      window.removeEventListener(CONSENT_EVENT, report);
      window.removeEventListener("pagehide", onLeave);
      window.removeEventListener("storage", sync);
    };
  }, [pathname]);

  /* ── delegated click tracking ── */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const el = target.closest<HTMLElement>("a[href], [data-track]");
      if (!el) return;

      const location = locationOf(el);

      // 1. Explicit opt-in: <button data-track="carousel_scroll" data-track-direction="right">
      const explicitEvent = el.dataset.track;
      if (explicitEvent) {
        track(explicitEvent as EventName, {
          location,
          ...paramsFromDataset(el),
        });
        // A data-track anchor may ALSO be a CV link; fall through for those.
        if (!(el instanceof HTMLAnchorElement)) return;
      }

      if (!(el instanceof HTMLAnchorElement)) return;

      const rawHref = el.getAttribute("href") ?? "";
      if (!rawHref || rawHref.startsWith("#")) return;

      // 2. Contact intent
      if (rawHref.startsWith("mailto:")) {
        track(EVENTS.CONTACT_CLICK, { method: "email", location });
        return;
      }
      if (rawHref.startsWith("tel:")) {
        track(EVENTS.CONTACT_CLICK, { method: "phone", location });
        return;
      }

      // 3. Resume / document downloads
      const isDoc = DOC_PATTERN.test(rawHref);
      if (isDoc && RESUME_PATTERN.test(rawHref)) {
        track(el.hasAttribute("download") ? EVENTS.RESUME_DOWNLOADED : EVENTS.RESUME_VIEWED, {
          location,
          file_name: rawHref.split("/").pop() ?? rawHref,
          file_extension: rawHref.split(".").pop()?.split("?")[0] ?? "",
          ...paramsFromDataset(el),
        });
        return;
      }

      // 4. Known social / professional profiles
      let host = "";
      try {
        host = new URL(rawHref, window.location.origin).hostname;
      } catch {
        return;
      }
      if (host && host !== window.location.hostname) {
        const network = SOCIAL_HOSTS[host];
        if (network) {
          track(EVENTS.SOCIAL_CLICK, { network, location, link_domain: host });
        }
        if (!network) track(EVENTS.OUTBOUND_CLICK, { link_domain: host, location });
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  /* ── scroll depth + case-study completion, reset per route ── */
  const firedScroll = useRef<Set<number>>(new Set());
  const routeStart = useRef<number>(0);

  useEffect(() => {
    firedScroll.current = new Set();
    routeStart.current = Date.now();
  }, [pathname]);

  useEffect(() => {
    let ticking = false;

    const measure = () => {
      ticking = false;
      if (window.location.pathname === "/work/team-contract" && !document.querySelector("[data-case-study-body]")) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable < 400) return; // short page — depth is meaningless

      const scrolled = window.scrollY || doc.scrollTop || 0;
      const percent = Math.round((scrolled / scrollable) * 100);

      for (const milestone of SCROLL_MILESTONES) {
        if (percent < milestone || firedScroll.current.has(milestone)) continue;
        firedScroll.current.add(milestone);

        track(EVENTS.SCROLL_DEPTH, { percent_scrolled: milestone });

        if (milestone === 90 && window.location.pathname.startsWith("/work/")) {
          track(EVENTS.CASE_STUDY_COMPLETE, {
            project_slug: projectSlugFor(window.location.pathname),
            time_on_page_sec: Math.round(
              (Date.now() - routeStart.current) / 1000,
            ),
          });
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Visible-time slices retain short visits and final partial intervals. */
  useEffect(() => {
    let visibleSince = document.visibilityState === "visible" ? Date.now() : null;
    let seconds = 0;
    const fired = new Set<number>();
    const checkpoint = () => {
      if (visibleSince !== null) {
        const duration = Math.max(0, (Date.now() - visibleSince) / 1000);
        if (duration >= 1 && (pathname !== "/work/team-contract" || document.querySelector("[data-case-study-body]"))) {
          seconds += duration;
          track(EVENTS.PAGE_ENGAGEMENT, {duration_sec: Math.round(duration), project_slug: projectSlugFor(pathname), page_path: pathname});
        }
      }
      visibleSince = document.visibilityState === "visible" ? Date.now() : null;
      for (const milestone of TIME_MILESTONES) {
        if (seconds >= milestone && !fired.has(milestone)) {
          fired.add(milestone); track(EVENTS.ENGAGED_TIME, {seconds: milestone});
        }
      }
    };
    const onVisibility = () => { checkpoint(); void browserCollector()?.flush(); };
    const onHide = () => { checkpoint(); visibleSince = null; void browserCollector()?.flush(); };
    const resetTime = () => { seconds = 0; fired.clear(); visibleSince = document.visibilityState === "visible" ? Date.now() : null; };
    window.addEventListener(CONSENT_EVENT, resetTime);
    const interval = window.setInterval(checkpoint, 15000);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onHide);
    // Old-route cleanup happens after window.location changes, so capture its path explicitly.
    return () => { checkpoint(); clearInterval(interval); window.removeEventListener(CONSENT_EVENT, resetTime); document.removeEventListener("visibilitychange", onVisibility); window.removeEventListener("pagehide", onHide); };
  }, [pathname]);

  return null;
}
