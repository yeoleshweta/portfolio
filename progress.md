# Portfolio — Work in Progress

_Last updated: 2026-03-24_

---

## Active Requirements

### REQ-1 — Visual Consistency (Styling Only)
**Status:** Monitoring / No Breaking Changes Found

**Scope:** Fonts, typography, layout, background, and color balance must be consistent across all sections. No changes to animations or interaction feel.

**Findings:**
- Design tokens in `globals.css` are used consistently across all component CSS modules (`--font-display`, `--font-primary`, `--font-script`, `--color-accent`, etc.)
- Color palette is cohesive: `#f2f2f2` background, `#1c1c1c` text, `#8b69fa` accent
- `AboutSection.module.css` uses hardcoded `#1a1a1a` and `#444` for title/description — these are close enough to the system tokens to feel consistent but could be normalized to `var(--color-text)` and `var(--color-text-secondary)` if needed
- All section headings use `var(--font-display)` (Inter Display); body copy uses `var(--font-primary)` (Inter/IBM Plex Sans); italic accent words use `var(--font-script)` (Kepler Std)
- No font or color inconsistencies identified that visually break the experience

**Files to watch:**
- `src/app/globals.css` — design tokens
- `src/components/AboutSection.module.css`
- `src/components/HeroSection.module.css`
- `src/components/FeaturedWork.module.css`
- `src/components/ContactSection.module.css`

---

### REQ-2 — Carousel Hover Captions
**Status:** ⏸ Reverted (user requested rollback)

**Scope:** Add hover effect with translucent caption overlay on gallery images in the "When I'm not researching" section. Captions should be casual and fun.

**What was done:**
- Added `caption` field to `galleryImages` array in `AboutSection.tsx`
- Added `caption` prop to `GalleryCard` component
- Added `hovered` state with Framer Motion `onHoverStart` / `onHoverEnd` handlers
- Added caption overlay div (`.cardCaption`) that slides up from the bottom on hover
- Caption uses `rgba(10, 10, 15, 0.58)` background + `backdrop-filter: blur(10px)` for translucent effect
- Transition: `translateY(100%) → translateY(0)` with 0.28s ease

**Captions assigned:**
| Image | Caption |
|---|---|
| Group selfie | squad goals 🙌 |
| Jumping portrait | main character energy ✌️ |
| Motorcycle in the mountains | mountain roads hit different 🏍️ |
| Handstand in the mountains | gravity is just a suggestion 🙃 |
| Scuba diving | breathing? overrated 🤿 |
| Travel exploring | always somewhere new 🌍 |
| Fun trip | collecting memories 🌊 |

**Files changed:**
- `src/components/AboutSection.tsx` — caption data + GalleryCard hover logic
- `src/components/AboutSection.module.css` — `.cardCaption` + `.cardCaptionVisible` styles

---

### REQ-3 — Carousel Viewport Fit
**Status:** ⏸ Reverted (user requested rollback)

**Scope:** The carousel must fit fully within the visible viewport window without cutting off cards at the bottom. Must not disturb the heart animation or the title/description text above.

**Root cause:**
- `galleryY` final value was `440px` — this shifted the 3D track center 440px below the carousel container center
- `carouselContainer` is centered at `50svh` from the sticky top
- On a 900px viewport: card bottom was at `94px + 450px + 440px + 190px = 1174px` — well below the 900px viewport edge

**Fix applied:**
- Changed `galleryY` from `[600, 440]` → `[600, 120]`
- On 900px viewport: card bottom now at `94 + 450 + 120 + 190 = 854px` — within view ✓
- On 800px viewport: `94 + 400 + 120 + 190 = 804px` — just at edge ✓
- Header (title + desc + heart) occupies ~200-250px from sticky top, giving ~470px+ of clearance above cards ✓

**Files changed:**
- `src/components/AboutSection.tsx` — `galleryY` transform output range

---

## Backlog / Future Considerations

- [ ] **REQ-1 follow-up:** Normalize hardcoded color values (`#1a1a1a`, `#444`) in `AboutSection.module.css` to CSS variables for full token consistency
- [ ] **Mobile carousel:** On `≤768px`, the carousel container drops to `480px` height. Consider further reducing card size or adjusting perspective for small screens
- [ ] **Caption accessibility:** Caption text is currently hidden until hover — consider if keyboard focus should also trigger caption visibility
- [ ] **Design explorations:** Four HTML/PDF files in `/Portfolio/` folder are untracked — decide whether to commit, clean up, or build out as alternate layout experiments
- [ ] **Case study pages:** Eight case study routes exist under `/work/` — audit for styling consistency with the home page design system
- [ ] **Performance:** Multiple `priority` Image props in the carousel — evaluate if all 14 cards (7×2) truly need eager loading vs. lazy for the non-visible ring positions

---

## Recent Commits (Context)

| Hash | Message |
|---|---|
| `e3c647a` | fix: resolve TypeScript RefObject null type error in ContactSection |
| `fb62c0b` | feat: Redesign projects section and add physics-based contact tiles |
| `7492bbf` | feat: Add new design options and implement a Bento Grid layout for the Featured Work section |
| `6dc3536` | feat: Enhance SmoothScroll to allow native scrolling within Klyro widget |
| `52073f3` | fix: Adjust stickyContainer top, height, and padding for correct sticky behavior |
