# Portfolio rework — Phase 0 baseline

Measured 16 Oct 2026 against the **live site** (`https://www.shwetasharma.tech`, `main` @ `bbba9ee`) before any rework changes ship. Local comparisons are against branch `portfolio-rework` @ `eaa02b8` (WCAG foundations commit, not deployed).

Raw Lighthouse JSON: [`docs/baseline/`](baseline/) (`lh-<page>-<mobile|desktop>.json`).

## 1. Lighthouse (lab, Lighthouse 12)

Mobile = default Lighthouse mobile emulation (Moto G Power, slow 4G throttling). Desktop = `--preset=desktop`. INP is a field metric and isn't available in lab runs, so TBT is recorded as the proxy.

| Page | Device | Perf | A11y | LCP | CLS | TBT | FCP | Image bytes | Total bytes |
|---|---|---|---|---|---|---|---|---|---|
| `/` | Mobile | 65 | 96 | 7.02 s | 0.000 | 9 ms | 4.68 s | 598 KB | 1,322 KB |
| `/` | Desktop | 98 | 96 | 1.09 s | 0.000 | 0 ms | 0.28 s | 465 KB | 1,203 KB |
| `/work/abim` | Mobile | 78 | 94 | 6.36 s | 0.000 | 0 ms | 0.95 s | 7 KB | 755 KB |
| `/work/abim` | Desktop | 95 | 94 | 1.56 s | 0.000 | 0 ms | 0.27 s | 7 KB | 770 KB |
| `/experience` | Mobile | 84 | 95 | 4.58 s | 0.000 | 0 ms | 0.93 s | 7 KB | 738 KB |
| `/experience` | Desktop | 100 | 95 | 0.77 s | 0.000 | 0 ms | 0.28 s | 7 KB | 741 KB |

Notes:

- **LCP elements are text, not images**: hero H1 line on `/`, the case study H1 on `/work/abim`, the intro paragraph on `/experience`. Slow mobile LCP is driven by font/JS render delay and the entrance animations, not image weight.
- **Home image opportunities**: `uses-responsive-images` ~396 KB (mobile) / ~376 KB (desktop); `offscreen-images` ~589 KB on mobile (activity marquee + portrait loaded eagerly).
- `/work/abim` and `/experience` image bytes are tiny in lab because their images are below the fold/lazy; not representative of a full scroll.
- Lighthouse a11y failures: `/` → `aria-allowed-role`, `color-contrast`; `/work/abim` → `color-contrast`, `heading-order`; `/experience` → `color-contrast`.

## 2. axe (WCAG 2.0/2.1/2.2 A + AA tags, serious/critical only)

Run with `PLAYWRIGHT_BASE_URL=https://www.shwetasharma.tech npm run test:a11y`. **17 / 17 routes fail** on live, all for a single rule: `color-contrast` (serious). No critical issues.

| Route(s) | Nodes | Failing elements (fg on bg = ratio) |
|---|---|---|
| `/`, `/experience` | 2 | Navbar `brandScript` "tech" `#b59bff` on `#f1eeee` = 2.0; Consent "Allow" `#fff` on `#8b69fa` = 3.81 |
| `/work/abim`, burton, crypto-secure, design-thinking, dorothy-perkins, evans, gesturepro, miss-selfridge, my-ai-friends, personalization, stories-by-children | 7 | **Two navbars rendered** (`body > nav` and `CaseStudyLayout > nav`): brandScript `#b59bff` on `#d5d2d3` = 1.53 and on `#eeebeb` = 1.94; 4 nav links `#5d5d5d` on frosted `#d5d2d3` = 4.38; Consent "Allow" = 3.81 |
| `/work/healthcare-bias` | 9 | Same 7 as above + section label `#8b69fa` on `#fff` = 3.81 + external link button `#fff` on `#8b69fa` = 3.81 |
| `/work/fuel-design-system`, `/work/team-contract` (password gate) | 3 | brandScript 2.01; gate subtitle `#cddeca` on `#367c2b` = 3.65 (Fuel); Consent "Allow" |
| `/work/john-deere` | 1 | Consent "Allow" = 3.81 |

**Same scan on `portfolio-rework` (local, WCAG commit applied):** `/`, `/experience`, `/work/john-deere` pass. Remaining:

- [ ] Case study nav links `#5d5d5d` on frosted header `#d5d2d3` = 4.38 (needs ≥ 4.5) — all `CaseStudyLayout` pages.
- [ ] `/work/healthcare-bias` section label + external link button still use `#8b69fa` (3.81).
- [ ] `/work/fuel-design-system` gate subtitle `#cddeca` on `#367c2b` = 3.65.
- [ ] Klyro widget not covered by axe (third-party, injected late); see keyboard notes.

## 3. Keyboard-only walkthrough of `/` (live)

Real `Tab` presses via Playwright Chromium at 1440×900 (the Cursor browser only dispatches synthetic DOM key events, which don't move native focus). Logged every focus stop, whether it was on-screen, whether something else was painted over its centre, and whether it had a focus indicator.

Tab order (first visit, consent banner showing): brand → Home → Projects → Work Experience → Contact → Download CV → ABIM card → Design Thinking card → "Scroll more work right" → 10 more-work cards → LinkedIn → email → Download CV → Klyro "Let's vibe!" → Decline → Allow → `<body>` → wraps.

Findings:

- [ ] **No skip link** — first stop is the brand link; 6 header stops before content. (Fixed on `portfolio-rework`.)
- [ ] **Consent banner covers focused cards** — all 10 "more work" carousel cards (stops 10–19) are hidden under the fixed consent banner while focused. Focus order also reaches the banner last, after the footer.
- [ ] **Large jump with no stops**: Download CV (scrollY 0) → ABIM card (scrollY 3910). The About word-reveal, activity marquee and hero have no focusable content, so keyboard users skip ~4 viewports with no context.
- [ ] **Featured cards have very long accessible names** — the whole card (category, `[ref: …]` caption, title, body) is one link name.
- [ ] **Carousel**: only the "Scroll more work right" button is a tab stop at the start position; tabbing through the cards scrolls the track but the arrow buttons are skipped after that.
- [ ] **Focus lands on `<body>`** after the last focusable element (after Klyro launcher / consent buttons) before wrapping — no visible focus for one stop.
- [ ] **Klyro launcher** ("Let's vibe!") is in tab order after the footer; panel contents not tested (third-party; previously found unnamed buttons and an `<h1>` inside the widget).
- [x] No keyboard traps found.
- [x] Every stop showed a focus indicator (browser default outline on live; brand `:focus-visible` ring on `portfolio-rework`).
- [x] No focused element was hidden under the fixed header in this pass.
- [ ] Contact "hobbies" sticky section: no focusable content; nothing to trap, but nothing reachable either.

## 4. Repo facts to tick off in later phases

- [ ] **Lenis** (`src/components/SmoothScroll.tsx`): `duration: 1.2`, custom easing, `smoothWheel: true`, `touchMultiplier: 2`, prevent on Klyro + `[data-lenis-prevent]`, driven by GSAP ticker. No `lerp`/`syncTouch`. Reduced motion disables it (on `portfolio-rework`).
- [ ] **Carousel snap**: `FeaturedWork.module.css:301` `scroll-snap-type: x mandatory`; `.miniCard` `scroll-snap-align: start` (line 326).
- [ ] **Hero portrait**: `/assets/IMG_1191.jpg` is **406×406** source, rendered by `next/image` at 112×112.
- [ ] **OG image**: `src/app/opengraph-image.png` is **190×190** (should be 1200×630).
- [ ] **Duplicate header** on case studies: live renders `body > nav` (root layout) **and** `CaseStudyLayout > nav`. Removed from `CaseStudyLayout` on `portfolio-rework`.
- [ ] **"Key phrase to use" note** shipped as visible copy: `src/app/work/abim/page.tsx:949`.
- [ ] **TODO(shweta)** placeholders in `src/app/work/john-deere/page.tsx` lines 59, 343, 361 (`[SQUARE BRACKETS]`, `[TENURE]`, `[VERIFY STEP ORDER]`).
- [ ] **Hero H1** spans "DESIGNING / EXPERIENCES / research" have no spaces between them (screen readers read run-together words).
- [ ] **3D cube** is CSS (27 `Cubie` divs), not WebGL; `GlassCube.tsx` also exists.
- [ ] **About word reveal** (`AboutMeSection.tsx`): `min-height: 300vh`, sticky 100vh.
- [ ] **Activity marquee** (`AboutSection.tsx`): `400vh` sticky scene, 7 `/assets/SelfImages/*` images duplicated, generic alt text.
- [ ] **next/image config** (`next.config.ts`): only `remotePatterns` for framerusercontent.com; no `formats`/`qualities`. `next/image` used only in `AboutSection`, `HeroSection`, `BeforeAfter`; raw `<img>` in `fuel-design-system/page.tsx`, `CaseStudyContent.tsx`, `CaseStudyHero.tsx` (7 `@next/next/no-img-element` warnings).
- [ ] **Klyro** loaded via `<Script src="https://unpkg.com/@klyro/widget/dist/widget.js" strategy="afterInteractive">` in `src/app/layout.tsx`.

## 5. Automated checks added in Phase 0

- `npm run lint` — now includes `jsx-a11y` recommended rules. Baseline: **115 problems (101 errors, 14 warnings)**; 28 are jsx-a11y (`aria-role` 11, `mouse-events-have-key-events` 10, `click-events-have-key-events` 2, `no-static-element-interactions` 2, `no-noninteractive-tabindex` 1), the rest pre-existing (`react/no-unescaped-entities` 63, `react-hooks/set-state-in-effect` 5, etc.).
- `npm run test:a11y` — Playwright + axe over `/`, `/experience` and all 15 `/work/*` routes (password-gated routes scanned at the gate). Defaults to `http://localhost:3000` (starts `npm run dev` if needed); set `PLAYWRIGHT_BASE_URL` to scan another host. Baseline: live 0/17 pass; `portfolio-rework` local 3/17 pass.
