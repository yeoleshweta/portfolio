# Fuel × Deere Survey case study: redesign plan

Page: `/work/fuel-design-system` · Status as of 18 Oct 2026: **built, production build passing, committed to `main` (not pushed).**

## 1. Goal

Rebuild the Fuel case study around one story: **every survey needed a developer → Deere Survey let PMs do it themselves in ~30 minutes → it was built entirely from Fuel, and its gaps went back into Fuel.** The centrepiece is a working-prototype animation of the real Standard Flow Path on a laptop, with design decisions popping up on sticky notes beside it.

## 2. What's in the repo now

| File | What it is |
|---|---|
| `src/app/work/fuel-design-system/page.tsx` | New page: hero, TL;DR and chapters 01–10 |
| `src/app/work/fuel-design-system/fuelSurvey.module.css` | Page styles, globals.css tokens only |
| `src/content/fuelSurvey.ts` | All copy, image paths and prototype steps |
| `src/components/casestudy/LaptopPrototype.tsx` + `.module.css` | The animated laptop prototype (reusable) |
| `public/work/fuel-survey/` | 20 redacted screens, `survey-prototype.gif` / `.mp4` / `.webm`, poster |
| `src/content/caseStudyBriefs.ts`, `src/lib/caseStudyMeta.ts`, `src/components/covers/FuelCover.tsx` | Over-claims removed ("100+ screens", "25% faster spec") |
| `docs/fuel-redesign/page.previous.tsx.txt` | Backup of the page before this change |

## 3. Page structure

| # | Section | Job | Key visual |
|---|---|---|---|
| — | Hero | The outcome in one line | Time card: ~3 days → ~30 min, hand note "reported by PMs + what I observed" |
| — | The short version | Stats + TL;DR fields | 250 teams · ~30 min · 0 hand-offs · 1 system |
| 01 | The problem | Old vs new process | Before/after lanes, 4 stickies, HMW card |
| 02 | The Fuel bet | Why this mattered to the UX team | FY24 objective, 3 key results, "where my work landed" table |
| 03 | Inside Fuel | Shweta's work on the system itself | 6-stage intake, dark token-layer band, guidelines + a11y cards |
| 04 | The product | The flow, clicked through | **Laptop prototype** + the 13 decisions + "Where Fuel shows up" |
| 05 | The components | The question card | Standard → Custom badge mock, 7 answer types, 2 component sheets |
| 06 | Reach | Languages and audiences | Language preview + 3 dialogs |
| 07 | Closing the loop | Results PMs can read | Expanded survey row + 3 cards |
| 08 | Accessibility | Accessible by default | POUR cards + plan targets |
| 09 | Giving it back | Components and teaching returned to Fuel | Honest sticky: merge status unconfirmed |
| 10 | Impact | What changed and what's unproven | 3 impact cards, limits, next measures |

## 4. The laptop prototype

**How it works.** The component plays 13 real screens from the Figma Standard Flow Path on one ~62-second timeline. On each step:

1. The cursor glides to the click target and presses.
2. A purple ring pulses where it clicked.
3. A yellow box highlights what the PM is looking at.
4. An overlay shows the result: the template picker, typed title, ticked checkbox, language menu, image library, "3 of 3 selected" chip, Move-to-page menu, Custom tooltip, answer-type menu, country menu, and a saved message.
5. A sticky note with that step's design decision pops in beside the laptop, with a hand-drawn arrow, and fades after about two steps.

**Where the data lives.** Copy, images and alt text are in `fuelSurvey.ts`. Click and overlay positions are percentages of the 1440×900 screen, kept in `GEOMETRY` inside the component.

**Accessibility (WCAG 2.2 AA).**
- A Pause/Play button covers 2.2.2 Pause, Stop, Hide.
- Prev and Next buttons are 44px targets and announce the step through a polite live region.
- It starts paused when the visitor prefers reduced motion.
- It stops animating when scrolled off-screen.
- The screen is a single `role="img"` with a label for the current step. Every overlay is `aria-hidden`.
- The 13 decisions are also printed as a plain list below it, for screen readers and reduced-motion visitors.

**Responsive.** Container queries make it fit whatever column it's in:
- At 900px wide or more, stickies sit left and right of the laptop.
- Narrower than that, the current decision shows as one sticky under the laptop.
- At 560px and below, labels wrap and the doodle arrow hides.

**GIF and video.** `survey-prototype.gif` (1000px, 10fps, 2.8 MB) is for LinkedIn, Dribbble and email. `.mp4`/`.webm` are lighter if you ever want a video instead of the live component. The page itself uses the live component, which stays sharp at any size.

## 5. Rules this follows

- Owner IDs and the survey owner's name are blurred in every image, on the canvas too. Participants and colleagues are never named.
- No dollar figures from the OKR board, and BCA is not expanded.
- The time saving is always "reported by PMs and observed", never "measured".
- Token names are marked as illustrative.
- Components handed to Fuel come with the honest note that merge status was never confirmed.
- Colours come from globals.css tokens. The only exceptions are Deere green and yellow, scoped to the product mocks. The green is darkened to `#2e6b24` so white text passes 4.5:1.

## 6. Checks already done

- `npx tsc --noEmit`: no errors in the new files.
- `npx eslint` on every changed file, including jsx-a11y: passes.
- Rendered with `next dev` in a cloud copy of the repo:
  - desktop (1440) and phone (390) screenshots look right
  - axe (WCAG 2.0–2.2 A/AA) reports 0 violations
  - 0 console errors
- `next build` (production): passes. All 35 routes prerender, including the new `opengraph-image`.
- `tests/a11y.spec.ts` against the production build: the Fuel page's own content has 0 violations. It still fails on 5 site-wide navbar labels (see §7, item 0), which fail the same way on 14 other pages.

## 7. What's left (in order)

0. **Site-wide, not this page:** the navbar labels (`Navbar.module.css` `.navLabel`, `#5d5d5d`) drop to 4.38:1 on the frosted bar over light content. Darken the label colour (e.g. `var(--color-text)`) so `npm run test:a11y` goes green on every page.

1. **Run it yourself:** `npm run dev` → open `/work/fuel-design-system`. Watch one full loop at desktop width, then at phone width.
2. **Run the repo's checks:** `npm run lint` and `npm run test:a11y`. Add the page to `tests/a11y.spec.ts` if it isn't listed.
3. **Tune any click that looks off:** nudge its numbers in `GEOMETRY` in `LaptopPrototype.tsx`. Values are % of the screen.
4. **Optional: steps 04 and 14.** These near-duplicate screens were left out. Add them back if you want the hover state on the welcome page or the second unit dropdown.
5. ~~**Social image**~~ Done: `caseStudyMeta.cover` now uses `survey-prototype-poster.jpg`.
6. **Clean up:** `src/app/work/fuel-design-system/JohnDeere Projects/` (105 MB) is no longer used by this page. Move it out of `src/`, to `Portfolio Assets/` or outside the repo.
7. ~~**Commit**~~ Done, separately from the unrelated `AboutSection` changes, which are still uncommitted. **Push** (`git push`) when you're happy with it locally.
8. ~~**Delete the temporary render copy**~~ Done.

## 8. Done when

- [ ] The prototype loops smoothly, pauses on hover/Pause, and the stickies appear beside the laptop on a laptop-size screen.
- [ ] Prev/Next work by keyboard and screen readers hear the step.
- [ ] With reduced motion on, it starts paused and the list carries the decisions.
- [ ] Works at 320px and 200% zoom, with no horizontal scroll.
- [ ] `npm run lint` and `npm run test:a11y` pass.
- [ ] No unblurred IDs or names in any image.
