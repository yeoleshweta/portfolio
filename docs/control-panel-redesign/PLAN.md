# Urbanfit Control Panel micro case study: plan

Page: `/work/control-panel` · Source: the Urbanfit Control Panel design canvas, artboard "Urbanfit Control Panel — Micro Case Study" (`project/Main.dc.html`, 30 screens, 8 exported) · Status: built on the local branch, not pushed.

## 1. Goal

Add the Control Panel as the **first card in the homepage micro case-study section**, and build its page from the design artboard. The page is one internal desktop tool for Urbanfit's supplement business: admins, warehouses and franchise shops share one layout, each seeing only what their role allows.

## 2. Where it sits

- **Homepage micro section** = `SLUGS` in `src/components/AboutMeSection.tsx`. The Control Panel is first, so Poshmera moves to second. Its icon is `LayoutDashboard`, and its outcome line is "One layout, three roles", because the design gives no outcome numbers.
- **Pager order** = `CASE_STUDY_ORDER` in `src/content/caseStudyBriefs.ts`: ABIM, Control Panel, Poshmera, PM persona study.
- **Category** "Design Systems", as for the Urbanfit Studio study.

## 3. What changes in the repo

| File | Change |
|---|---|
| `src/app/work/control-panel/page.tsx` | New. The artboard's chapters 01–08 and the hero; a working price calculator, the one client-side part |
| `src/app/work/control-panel/controlPanel.module.css` | New. The artboard's CSS on portfolio tokens; Poppins for the calculator and specimens |
| `src/app/work/control-panel/layout.tsx`, `opengraph-image.tsx` | New. Metadata from `caseStudyMeta.ts` |
| `src/content/controlPanel.ts` | New. All copy, rows, captions, alt text and calculator defaults |
| `public/assets/control-panel/*.jpg` | New. The eight screens the artboard uses (1512 × 977), downloaded from the design canvas |
| `src/lib/caseStudyMeta.ts` | New `control-panel` entry |
| `src/content/caseStudyBriefs.ts` | `control-panel` inserted before `poshmera` in `CASE_STUDY_ORDER` |
| `src/components/AboutMeSection.tsx` | `control-panel` first in `SLUGS`, with its icon and outcome |
| `tests/a11y.spec.ts` | `/work/control-panel` added to the route list |
| `docs/control-panel-redesign/PLAN.md` | This file |

## 4. Decisions made in the port

- **The calculator is live.** The artboard's calculator is a working recreation: MRP and three channel percentages, with the prices computed as the MRP less each percentage. It is a client component with `useState`. Percentages are clamped to 0–90%, and values below zero or not numbers become 0.
- **Failing colours are swatches, not text.** The as-designed stock-status greens and oranges (1.69:1 and 2.63:1) and the teal sidebar (white labels at 1.65:1) fail contrast. Their text would fail axe, so they are drawn as colour swatches, and their ratios are in the captions. This is the same approach as the Poshmera page.
- **Specimens are decorative and static.** Stages are `aria-hidden`. The table toolbar's buttons are `span`s, so no fake controls reach the accessibility tree.
- **Specimen stages are white**, so the labelled ratios describe the exact colour pairs.
- **Tables stack below 640px**, with each cell labelled by its column heading, as on the Poshmera page.
- **The page is self-contained.** Its helpers (`Marked`, `Chapter`, `DataTable`, `Stats`, the specimen card) repeat the Poshmera page's. Moving them into a shared module is a follow-up; it touches both pages.

## 5. Page structure

| Chapter | Content from the design |
|---|---|
| Hero (dark) | Four tags; title with "branch" in italic; lead; five meta items; the admin dashboard in a laptop frame |
| 01 · The problem | Lead; three stickies: stock moves, one product many prices, three roles three views |
| 02 · Structure (dark) | Five-section sidebar note; the stock path with the distribution step highlighted; four prototype figures |
| 03 · Role-based dashboards | Admin and franchise shop screens |
| 04 · Stock and pricing (tint) | Inventory hub and add-stock screens; the working calculator with its note |
| 05 · Records, quotes and access | Customer list, sales report, quotation and permissions screens |
| 06 · Components (tint) | Three specimens: stock status, sidebar navigation, table toolbar |
| 07 · Accessibility audit | Three figures; the nine-row findings table with severity |
| 08 · Reflection (tint) | Three cards; "to validate next" list |

## 6. Claims ledger

| Claim | Source | Status |
|---|---|---|
| 30 screens; 484 interactions | Design | Kept |
| 203 navigation, 246 state-change (167 on click, 79 on hover), 18 overlays | Design | Kept. These add to 467, not 484; the remaining 17 are not broken out in the design. Flagged |
| 79 hover-only state changes | Design, same as the 246 hover count | Kept. The design's count of hover changes matches its state breakdown |
| 19 component sets; user menu 27 uses; status labels 25 uses | Design | Kept. Counts from the Figma file, not recomputed here |
| 2,971 text layers; 2,047 smaller than 12px, down to 8px | Design's own audit of the Figma file | Kept as the design's counts. Not reproducible without the file |
| Green status #1BE1AF is 1.69:1 on white | Recomputed, WCAG relative luminance | Confirmed |
| Orange status #FF774A is 2.63:1 on white | Recomputed | Confirmed |
| White on teal #1CE1CF is 1.65:1 | Recomputed | Confirmed |
| Suggested rail: text #E6FFFB on #0F2B29 and active item #04201D on #1CE1CF | Recomputed: 14.35:1 and 10.35:1 | Confirmed. "10.3:1 and up" is the lower of the two |
| Suggested status chips: #0B6B4E on #E3F5EE is 5.75:1; #9C2A12 on #FDE8E4 is 6.48:1 | Recomputed | Confirmed |
| Grey text #C0C0C0 to #858585 is 1.82 to 3.69:1 on white | Recomputed: #C0C0C0 1.82, #979797 2.92, #909090 3.19, #858585 3.69 | Confirmed |
| #4D4D4D is 8.45:1 on white | Recomputed | Confirmed |
| The design calls #4D4D4D "already the main text colour" | The artboard's own main text is #1C1C1C (17.04:1 on white) | Not matched. The page says "use #4D4D4D, which passes at 8.45:1" and does not repeat the claim. Confirm which is the Figma main text |
| Blue Update button, white label, 3.5:1 | The design gives no as-designed hex | Not verified. The suggested #0A6FE0 is 4.81:1 with white, which is confirmed |
| Calculator: MRP 3000 at 25%, 35% and 45% gives 2250, 1950 and 1650 | Arithmetic: 3000 × 0.75, × 0.65, × 0.55 | Confirmed. The design's note is right that the gym figure matches 45%, not the 25% shown |
| Sidebar labels on every screen fail at 1.65:1 | Design | Kept as the design's claim |
| Names, contact details, addresses and profile photos are blurred | Design | Kept. No names appear on the page |
| The permissions table and the calculator are recreations | Design footer | Kept as stated. The calculator is a working recreation on the page |
| No research findings or outcome numbers | Design footer | Kept. The page includes none |

No external sources are cited by the design, so none are checked here.

## 7. Accessibility

- One `h1`; `h2` per chapter; `h3` for option cards, specimens, the calculator heading and the reflection cards.
- Severity pills carry their word.
- The calculator has a `fieldset` and `legend`; each input has a `label`; the output sits in an `aria-live="polite"` region, so changes are announced.
- Failing colours are swatches (section 4), so axe reports nothing from them.

## 8. Verification

1. `npx tsc --noEmit`: exit 0.
2. ESLint on the touched files: no findings.
3. Repo axe spec (`tests/a11y.spec.ts`, `-g "work/control-panel"`): passes.
4. Axe at 1280 px: 0 violations.
5. 320 px: no horizontal overflow; no `undefined` class names.
6. Calculator in the browser: defaults give ₹2,250, ₹1,950 and ₹1,650; MRP 4000 at 20% gives ₹3,200; a gym rate of 95% clamps to 90% and gives ₹400.
7. Homepage micro slider: Control Panel is first, Poshmera second.
8. Console: one 404 for a shared IBM Plex font request, which also appears on the other case studies.

## 9. Open points

- **Main text colour.** The design says #4D4D4D is already the main text colour; the artboard uses #1C1C1C. Confirm which is right.
- **Blue button ratio.** The 3.5:1 claim has no as-designed hex to check.
- **The 17 interactions** not broken out (484 total against 467 listed). Confirm before publishing.
- **Calculator note.** The design's note says one of two values needs correcting. The page keeps the note as written, so the case study shows the discrepancy the design found.
- **Shared helpers.** This page repeats the Poshmera page's helpers. Extracting them is a follow-up.
