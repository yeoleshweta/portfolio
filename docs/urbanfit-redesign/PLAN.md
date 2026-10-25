# Urbanfit Studio case study: plan

Page: `/work/urbanfit` · Source: `Downloads/Case Study.pdf` (eleven pages, "Urbanfit Studio: a coach, a dietitian and a tracker in one pocket") · Status: planned, then built on the local branch, not pushed.

## 1. Goal

Add the Urbanfit Studio case study as the **third card in the homepage case-study section**, with an animated cover that fits the app, and build its page from the design. The page shows one mobile app for iOS and Android: a personal plan, daily trackers, paid experts, and an accessibility audit.

## 2. Where it sits

- **Homepage case-study section** = `src/components/FeaturedWork.tsx`. Each card has an animated cover (`src/components/covers/`) and a `coverLabel`. Urbanfit is inserted at index 2, so the order becomes Fuel, John Deere SUS, **Urbanfit**, Personalization, ABIM.
- **Pager order** = `CASE_STUDY_ORDER` in `src/content/caseStudyBriefs.ts`. Urbanfit is inserted at index 2 so previous and next links follow the same order.
- **Numbering.** Each cover shows its position: "CASE STUDY 0N" in the kicker and a numbered badge. Inserting at 3 moves Personalization from 03 to 04 and ABIM from 04 to 05. Those two covers are renumbered; the new cover is 03.

## 3. What changes in the repo

| File | Change |
|---|---|
| `src/app/work/urbanfit/page.tsx` | New. The design's chapters: where this fits, brief, information architecture, the four flows, interaction model, components, tokens, platforms, accessibility audit and reflection |
| `src/app/work/urbanfit/urbanfit.module.css` | New. Portfolio theme tokens only |
| `src/app/work/urbanfit/layout.tsx`, `opengraph-image.tsx` | New. Metadata from `caseStudyMeta.ts`, the same as the other routes |
| `src/content/urbanfit.ts` | New. All copy, rows and captions |
| `src/lib/caseStudyMeta.ts` | New `urbanfit` entry: title, description, category "Design Systems" |
| `src/content/caseStudyBriefs.ts` | `urbanfit` inserted at index 2 of `CASE_STUDY_ORDER` |
| `src/components/covers/UrbanfitCover.tsx` | New animated cover |
| `src/components/covers/covers.module.css` | `u`-prefixed cover styles and keyframes, added to the shared module |
| `src/components/covers/index.ts` | Exports `UrbanfitCover` |
| `src/components/covers/PersonalizationCover.tsx` | Kicker and badge 03 → 04 |
| `src/components/covers/AbimCover.tsx` | Kicker and badge 04 → 05 |
| `src/components/FeaturedWork.tsx` | Urbanfit entry at index 2 with its outcome, label and cover |
| `tests/a11y.spec.ts` | `/work/urbanfit` added to the route list |
| `docs/urbanfit-redesign/PLAN.md` | This file |

## 4. Theme

The site has no dark mode. Colour comes from `globals.css` tokens: `--color-bg`, `--color-surface`, `--color-text`, `--color-accent` and `--color-accent-text`, `--color-lilac`, `--color-sticky`, `--color-sticky-accent`. The design's violet "Studio" purple (#6323FE) is not used, except in the bottom-bar specimen (§9), where the finding is about that colour's contrast. The page uses the portfolio's accent everywhere else. The design's section fills map to the portfolio's grey and lilac bands, and the dark interaction-model band maps to `--color-text`.

## 5. Page structure

| Chapter | Content from the design |
|---|---|
| Hero (dark) | Four tags; title with "one pocket" in italic; lead; meta (role, company, timeline, platforms, Figma size) |
| 00 · Where this fits | Four cards (web, this chapter, commerce, internal); this chapter highlighted |
| 01 · The brief | Three stickies (Bet 1–3); four stats: 75 frames, 131 interactions, 4 tabs, 4 home states |
| 02 · Information architecture | Four tab cards (Home, Nutrition, Profile, Fitness); eight flow cards |
| 03 · Flow 1 · Plan setup | Seven captioned screens; four interaction decisions |
| 04 · Flow 2 · Home | The four-state table; two captioned states |
| 05 · Flow 3 · Trackers | Six captioned screens; anatomy list; "why one template" card |
| 06 · Flow 4 · Experts, meals and workouts | Seven captioned screens |
| 07 · Interaction model (dark) | Four stats; the flow chain; the four-row interaction table (prototype, use, iOS, Android) |
| 08 · Components | Six specimen cards: day chip, text field, unit toggle and stepper, progress ring, bottom bar as designed and suggested |
| 09 · Variables and tokens | Collections table; three findings; proposed Studio mode table |
| 10 · iOS and Android | Platform mapping table; the "Health App" footnote |
| 11 · Accessibility audit | Four stats; findings table with severity; "what already works" |
| 12 · Reflection | Three cards; "to validate next" list; credit footnote |

## 6. Omissions

- **Screen images are not reproduced.** The eleven PDF pages are full-page images, and the phone screens are not separately extractable. Each captioned screen is described in text, using the design's own captions. Visible in the design: the phone strips; not reproduced: the screens themselves.
- **Hidden captions.** The design's strips scroll. Captions that are clipped in the rendered page (for example "Workout video" and "Upsell in context") come from the PDF's text layer and are included.

## 7. Cover

`UrbanfitCover` follows the `c4` board pattern: a 1440 × 900 stage with a visual panel above a 340 px info card, scaled by `CoverFrame`, with pausing and reduced-motion handling inherited from the shared frame.

The visual is a phone with a header ring, a plan card and a four-tab bottom bar:

- **Tracker ring.** The ring draws to 2860 of 10,000 steps (28.6%), then holds and resets.
- **Coach, dietitian, tracker.** Three chips slide in from the left, one after another, and merge into the phone, where a "My plan" card fades in.
- **Four tabs.** A pill indicator steps across Home, Nutrition, Profile and Fitness.

The loop runs about 6 seconds. Reduced motion stops the animation through the shared frame's `data-motion="off"` rule.

Info card: badge 03, kicker "CASE STUDY 03 · MOBILE APP", h3 "A coach, a dietitian and a *tracker*", meta "68 SCREENS · IOS AND ANDROID", lede from the design's hero, pills "Mobile app", "Interaction design", "Design system", "Accessibility".

## 8. Claims ledger

| Claim | Source | Status |
|---|---|---|
| 75 frames: 68 screens and 7 bottom sheets; 68 screens · 7 sheets in Figma | Design, consistent in the hero and brief | Kept |
| 131 prototype interactions; 6 overlays, 31 state swaps, 1 timed | Design; the interaction table gives the same 131 | Kept |
| 4 tabs; 4 home states | Design | Kept |
| 84 variables in four collections (35 + 18 + 21 + 10 = 84); 14 text styles | Design; the collection counts add to 84 | Kept |
| text/muted #8D8D8D is 3.32:1 on white | Recomputed: 3.32 | Confirmed |
| Grey body text #898A8D 3.45:1, #979797 2.92:1, #787878 4.42:1 on white | Recomputed: 3.45, 2.92, 4.42 | Confirmed |
| gray-600 #5C5C5C is 6.69:1 on white | Recomputed: 6.69 | Confirmed |
| Activity-graph green #4CAF50 is 2.78:1 on white | Recomputed: 2.78 | Confirmed |
| White on purple #6323FE is 6.56:1 | Recomputed: 6.56 | Confirmed |
| Black label on purple #6323FE is 3.2:1, below 4.5:1 | Recomputed: 3.20 | Confirmed |
| 454 of 1,832 text layers are smaller than 12pt; 380 greys below 4.5:1; lowest contrast 1.15:1; 0 drag-only inputs | The design's own audit of the Figma file | Kept as the design's audit counts. Not reproducible without the file |
| "Eight short questions" (setup) | Design | Kept. The strip shows seven captioned screens (01–07); the eighth step is not captioned in the design. Flagged |
| "Four tabs on top of seven flows": eight cards, with Start labelled "before the tabs" | Design | Kept; the seven flows are the cards labelled with a tab |
| Google Fit APIs are deprecated in 2026 | Design; not checked here | Kept as the design states it. Flagged for confirmation |
| Platform guidance: W3C draft note (May 2025); Android Developers migration FAQ | Design footnote | Kept as cited by the design. Not checked here |
| Company "Urbanfit Wellness · Pune, India"; timeline 2021–2022; role "UI/UX designer" | Design | Kept |
| Named people in screens are blurred | Design | Kept as a footnote. No names appear on the page |

## 9. Accessibility

- One `h1`; `h2` per chapter; `h3` for cards and specimens; `h4` only where a card needs one.
- The stat grids, the findings table and the platform table are real tables or lists with headers; tables stack below 640 px with `data-label` cells.
- The four tab cards and the flow cards carry their text labels; the tab indicator in the cover is decorative (cover content is `aria-hidden` inside the frame).
- The specimens (day chip, text field, stepper, ring, bottom bar) are static; no fake controls reach the accessibility tree.
- Severity pills carry their word ("High", "Medium", "Low"), not colour alone.
- The as-designed bottom bar draws its active tab as a black block with no word. Its 3.2:1 contrast is a finding the design makes; drawn as a labelled black-on-purple pill, axe would fail the page on the specimen itself. The block is decorative (`aria-hidden`), and the finding is stated in the text beside it. The suggested bar keeps its word, in purple on white (6.56:1).

## 10. Verification

1. `npx tsc --noEmit`; ESLint on the touched files.
2. Playwright axe for `/work/urbanfit`: passes (no serious or critical violations). Axe on the homepage shows the same violations as before this change (the Fuel cover's contrast, the carousel dots' target size, and a hidden focus region). None comes from the Urbanfit cover.
3. Homepage: the featured carousel shows Urbanfit third ("3 of 5"); the cover animates (the chips slide in and merge, the ring fills, the tab indicator steps). Reduced motion stops it through the shared frame.
4. `/work/urbanfit`: 1280 px and 320 px, no horizontal overflow; tables stack; no console errors beyond the site's shared ones; no `undefined` class names.
5. Pager: Urbanfit's previous and next links are the second and fourth entries of the order.

## 11. Open points

- **Eight vs seven steps** in the setup flow: confirm the eighth step, or the page's "Eight short questions" wording.
- **Google Fit deprecation (2026)**: confirm before it is published.
- **Role**: the design says "UI/UX designer", while the other case studies say "Personalization specialist". Kept as the design's role for this project.
- **Existing covers renumbered**: Personalization and ABIM now show 04 and 05. This follows from the placement and has no other effect.
