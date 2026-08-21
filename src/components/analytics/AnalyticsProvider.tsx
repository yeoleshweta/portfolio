"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  EVENTS,
  pageTypeFor,
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
  const isFirstPath = useRef(true);

  /* ── SPA page_view on client navigations (skip initial load) ── */
  useEffect(() => {
    if (!pathname) return;
    if (isFirstPath.current) {
      isFirstPath.current = false;
      return;
    }
    track(EVENTS.PAGE_VIEW, {
      page_title: document.title,
    });
  }, [pathname]);

  /* ── case_study_view on every /work/* route ── */
  useEffect(() => {
    if (!pathname?.startsWith("/work/")) return;
    track(EVENTS.CASE_STUDY_VIEW, {
      project_slug: projectSlugFor(pathname),
      project_title: document.title,
    });
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
        track(EVENTS.CV_DOWNLOAD, {
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
        // Unknown outbound hosts are covered by GA4 Enhanced Measurement.
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  /* ── scroll depth + case-study completion, reset per route ── */
  const firedScroll = useRef<Set<number>>(new Set());
  const routeStart = useRef<number>(Date.now());

  useEffect(() => {
    firedScroll.current = new Set();
    routeStart.current = Date.now();
  }, [pathname]);

  useEffect(() => {
    let ticking = false;

    const measure = () => {
      ticking = false;
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

  /* ── engaged time: only counts while the tab is actually visible ── */
  useEffect(() => {
    let seconds = 0;
    const fired = new Set<number>();

    const interval = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      seconds += 5;
      for (const milestone of TIME_MILESTONES) {
        if (seconds >= milestone && !fired.has(milestone)) {
          fired.add(milestone);
          track(EVENTS.ENGAGED_TIME, {
            seconds: milestone,
            page_type: pageTypeFor(window.location.pathname),
          });
        }
      }
    }, 5000);

    return () => window.clearInterval(interval);
  }, [pathname]);

  return null;
}
