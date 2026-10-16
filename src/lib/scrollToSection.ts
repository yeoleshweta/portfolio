import { getLenis } from "@/lib/lenisRef";

const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 3);

function headerOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(
    "--header-height",
  );
  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 94;
}

function motionReduced() {
  return (
    document.documentElement.classList.contains("reduce-motion") ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function focusHeading(el: HTMLElement) {
  const heading =
    el.querySelector<HTMLElement>("h1, h2, h3") ?? el;
  if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
  heading.focus({ preventScroll: true });
}

/** Scroll a section into view under the sticky header, then move focus to its heading. */
export function scrollToSection(id: string, push = true) {
  const el = document.getElementById(id);
  if (!el) return;

  const offset = -headerOffset();
  const lenis = getLenis();
  const instant = motionReduced() || !lenis;

  if (instant) {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "auto" });
    focusHeading(el);
  } else {
    lenis.scrollTo(el, {
      offset,
      duration: 1.1,
      easing: EASE_OUT,
      onComplete: () => focusHeading(el),
    });
  }

  if (push && window.location.hash !== `#${id}`) {
    history.pushState(null, "", `#${id}`);
  }
}

export function scrollToTop(push = true) {
  const lenis = getLenis();
  const instant = motionReduced() || !lenis;
  const heroHeading = document.querySelector<HTMLElement>("main h1");

  if (instant) {
    window.scrollTo({ top: 0, behavior: "auto" });
  } else {
    lenis.scrollTo(0, { duration: 1.1, easing: EASE_OUT });
  }

  if (heroHeading) {
    if (!heroHeading.hasAttribute("tabindex")) {
      heroHeading.setAttribute("tabindex", "-1");
    }
    window.setTimeout(() => heroHeading.focus({ preventScroll: true }), instant ? 0 : 1100);
  }

  if (push && window.location.hash) {
    history.pushState(null, "", window.location.pathname);
  }
}
