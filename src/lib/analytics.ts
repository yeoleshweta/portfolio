/**
 * Analytics layer for shweta.tech
 * ------------------------------------------------------------------
 * A thin, typed wrapper around GA4's gtag.js.
 *
 * Design rules:
 *  1. Nothing here throws. If GA is missing, blocked, or not consented,
 *     every call becomes a no-op. Analytics must never break the site.
 *  2. Event names are snake_case and defined once, here.
 *  3. Every event carries `page_type` so reports can segment
 *     home / case study / experience without regex on the path.
 *  4. No personally identifiable information is ever sent.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

/** Verbose console logging of every event. Set NEXT_PUBLIC_GA_DEBUG=true locally. */
export const GA_DEBUG = process.env.NEXT_PUBLIC_GA_DEBUG === "true";

export const GA_ENABLED = GA_MEASUREMENT_ID.length > 0;

/** localStorage key holding the visitor's cookie choice. */
export const CONSENT_STORAGE_KEY = "sw_consent_v1";

export type ConsentChoice = "granted" | "denied";

/* ────────────────────────────── types ───────────────────────────── */

type GtagCommand = "js" | "config" | "event" | "set" | "consent" | "get";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: GtagCommand, ...args: unknown[]) => void;
  }
}

export type EventParams = Record<
  string,
  string | number | boolean | undefined
>;

/* ─────────────────────── event name registry ────────────────────── */
/**
 * The complete list of custom events this site sends.
 * Automatic GA4 events (page_view, scroll, click, file_download,
 * session_start, user_engagement) are NOT listed here — they come from
 * Enhanced Measurement and need no code.
 */
export const EVENTS = {
  /** App Router client navigation (first load comes from gtag config). */
  PAGE_VIEW: "page_view",
  /** Resume/CV opened or downloaded. KEY EVENT. */
  CV_DOWNLOAD: "cv_download",
  /** mailto: click — the strongest intent signal on the site. KEY EVENT. */
  CONTACT_CLICK: "contact_click",
  /** Outbound click to LinkedIn / GitHub / any social profile. */
  SOCIAL_CLICK: "social_click",
  /** A project card on the home page was clicked through to a case study. */
  PROJECT_CARD_CLICK: "project_card_click",
  /** A /work/* page was opened. */
  CASE_STUDY_VIEW: "case_study_view",
  /** The scroll-spy moved into a new section of a case study. */
  CASE_STUDY_SECTION_VIEW: "case_study_section_view",
  /** Reader reached ~90% of a case study. Secondary key event. */
  CASE_STUDY_COMPLETE: "case_study_complete",
  /** 25 / 50 / 75 / 90 % scroll milestones on any page. */
  SCROLL_DEPTH: "scroll_depth",
  /** Navbar / mobile-menu link click. */
  NAV_CLICK: "nav_click",
  /** Featured-work carousel arrow or swipe. */
  CAROUSEL_SCROLL: "carousel_scroll",
  /** 30 / 60 / 180 second engaged-time milestones. */
  ENGAGED_TIME: "engaged_time",
  /** The draggable "Toss me!" tiles in the contact panel were played with. */
  EASTER_EGG_PLAY: "easter_egg_play",
  /** Visitor accepted or declined analytics cookies. */
  CONSENT_UPDATE: "consent_update",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

/* ───────────────────────────── helpers ──────────────────────────── */

/** Classify the current route so every event can be segmented by page type. */
export function pageTypeFor(pathname: string): string {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/work/")) return "case_study";
  if (pathname.startsWith("/experience")) return "experience";
  return "other";
}

/** `/work/abim` -> `abim`. Returns "" for non-case-study routes. */
export function projectSlugFor(pathname: string): string {
  return pathname.startsWith("/work/") ? pathname.split("/")[2] ?? "" : "";
}

/** Strip undefined values so GA doesn't receive empty params. */
function clean(params: EventParams): EventParams {
  const out: EventParams = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") out[key] = value;
  }
  return out;
}

/* ──────────────────────────── public API ────────────────────────── */

/**
 * Send a custom event to GA4.
 * Safe to call anywhere, at any time — including before gtag.js finishes
 * loading (the inline stub queues into dataLayer).
 */
export function track(name: EventName, params: EventParams = {}): void {
  if (typeof window === "undefined") return;

  const payload = clean({
    page_path: window.location.pathname,
    page_type: pageTypeFor(window.location.pathname),
    ...params,
  });

  if (GA_DEBUG) {
    // eslint-disable-next-line no-console
    console.log("[analytics]", name, payload);
  }

  if (!GA_ENABLED || typeof window.gtag !== "function") return;

  try {
    window.gtag("event", name, payload);
  } catch {
    /* analytics must never break the page */
  }
}

/* ──────────────────────────── consent ───────────────────────────── */

/** Read the stored consent choice, or null if the visitor hasn't chosen. */
export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null; // private mode / storage blocked
  }
}

/**
 * Persist a consent choice and push it to Google Consent Mode v2.
 * Granting also unlocks the analytics cookie for future sessions.
 */
export function setConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    /* storage blocked — the choice still applies for this page load */
  }

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: choice,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }

  track(EVENTS.CONSENT_UPDATE, { consent_state: choice });
}
