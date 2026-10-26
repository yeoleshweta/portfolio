# Poshmera micro case study: plan

Page: `/work/poshmera` · Source: the Poshmera design file, artboard "Poshmera — Mobile Micro Case Study" (`project/Main.dc.html`, 48 mobile frames, 16 exported screens) · Status: built on the local branch, not pushed.

## 1. Goal

Add Poshmera as the **first card in the homepage micro case-study section**, and build its page from the design artboard. The app is a women's fashion app designed from research to launch around the moments shoppers hesitate: size, delivery, price and payment.

## 2. Where it sits

- **Homepage micro section** = `SLUGS` in `src/components/AboutMeSection.tsx`. Poshmera is first, so it shows first in the slider. Its icon is `Shirt`, and its outcome line is "8,000 installs in month one (as reported)". Micro cards have no cover; they show icon, category, title and outcome.
- **Pager order** = `CASE_STUDY_ORDER` in `src/content/caseStudyBriefs.ts`. Poshmera sits between ABIM and the PM persona study, so the previous link is ABIM and the next link is the PM persona study.
- **Numbering.** No cover, so no renumbering.

## 3. What changes in the repo

| File | Change |
|---|---|
| `src/app/work/poshmera/page.tsx` | New. The artboard's chapters 01–09 and the hero, rendered from the content file |
| `src/app/work/poshmera/poshmera.module.css` | New. The artboard's CSS, ported to CSS modules on portfolio tokens |
| `src/app/work/poshmera/layout.tsx`, `opengraph-image.tsx` | New. Metadata from `caseStudyMeta.ts`, as on the other routes |
| `src/content/poshmera.ts` | New. All copy, rows, captions and alt text |
| `public/assets/poshmera/*.jpg` | New. The 16 screens the artboard uses, downloaded from the design file |
| `src/lib/caseStudyMeta.ts` | New `poshmera` entry: title, description, category "Mixed Methods" |
| `src/content/caseStudyBriefs.ts` | `poshmera` inserted before `pm-ux-study` in `CASE_STUDY_ORDER` |
| `src/components/AboutMeSection.tsx` | `poshmera` first in `SLUGS`, with its icon and outcome |
| `tests/a11y.spec.ts` | `/work/poshmera` added to the route list |
| `docs/poshmera-redesign/PLAN.md` | This file |

The artboard has 26 assets, of which 16 are placed in the layout. The other ten are not used by the artboard and are not copied.

## 4. Theme

The artboard says it "mirrors `src/app/globals.css`", so its layout and most of its values are kept as they are, and tokens come from the portfolio:

- Poshmera colours (pink, sale pink, grey, fail and pass) are set on `.page`. The sale pink and the Notify Me colours are used only where the design shows them.
- Body text uses `--font-primary`. Italic accents use `--font-script`. Hand-lettered notes use `--font-hand`. Code and labels use JetBrains Mono, as on Urbanfit.
- **Lato**, the app's typeface, is loaded with `next/font` for the specimens only (`--font-lato`). The page's own text does not use it.
- The dark hero and the dark interaction band keep the artboard's near-black values.

## 5. Page structure

| Chapter | Content from the design |
|---|---|
| Hero (dark) | Four tags; title with "trust" in italic; lead; five meta items; three phone screens |
| 01 · Snapshot | Six research and result figures, with the note on the 13% denominator |
| 02 · The shopping path (dark) | Nine-step path with the sign-in step highlighted; four prototype figures |
| 03 · Decision 1 · Finding the right dress | Quick filter and full filter screens; considered and chosen options |
| 04 · Decision 2 · The product page | Out-of-stock and pincode screens; three options, including the contrast note |
| 05 · Decision 3 · Bag and checkout | Six captioned screens in a strip; two cards on payment and pincode |
| 06 · Growth loops | Four captioned screens in a strip |
| 07 · Components and tokens | Three specimen cards (product price, size chip, Notify Me); the proposed colour table |
| 08 · iOS and Android | Platform mapping table |
| 09 · Accessibility audit | Three figures; the findings table with severity; two cards |

## 6. Decisions made in the port

- **Failing colours are swatches, not text.** The as-designed sale price and the orange and green Notify Me buttons fail contrast. Their text would fail axe, so they are drawn as colour swatches. Their ratios are stated in the captions beside them. This follows the Urbanfit page, where the failing active tab is drawn without its word.
- **Specimens are decorative and static.** Each stage is `aria-hidden`, and the size chips are `span`s, not buttons, so no fake controls reach the accessibility tree. The information in each stage is repeated in the text beside it.
- **The specimen stage is white.** The design's ratios were measured on white. With a white stage, the labels describe the exact colour pair on the page.
- **Tables stack below 640px.** Each cell carries a `data-label` with its column heading, and the column headings are visually hidden. The artboard scrolls its tables, which leaves a 320px reader with no reachable scroll region.
- **Strips are focusable scroll regions** (`tabIndex=0`, labelled), so keyboard users can scroll them.
- **Screens are the design's own exports** at 2× (856 px wide). The listing screen is a long capture (856 × 3018); the hero crops it to the top, as the artboard does.

## 7. Claims ledger

| Claim | Source | Status |
|---|---|---|
| 15 target shoppers interviewed; 250 survey responses; 3 rounds of usability testing | Portfolio text, stated on the artboard as "as reported" | Not in the design file. Kept as reported. Not verified here |
| 8,000 installs in the first month, against a target of 5,000; 4.3★ App Store rating | Same as above | Kept as reported. Not verified here |
| 13% checkout completion; its denominator is not stated | Same as above; the artboard flags the missing denominator | Kept. The page states the denominator is open |
| 24 weeks; 48 mobile frames; "UX lead, research to launch"; Urbanfit Wellness · Pune | Design | Kept |
| 286 prototype interactions; 3 starting flows; 4 tabs; 7 home layout explorations | Design | Kept. Counts from the Figma file, not recomputed here |
| Component uses: product price 69, discount badge 41, status bar 32, bottom bar 10 | Design | Kept. Counts from the Figma file, not recomputed here |
| 402 of 1,545 text layers below 12pt, down to 7pt; 275 sale-price layers; 8 font families | Design's own accessibility audit of the Figma file | Kept as the design's counts. Not reproducible without the file |
| #FF0052 on white is 3.91:1 | Recomputed, WCAG relative luminance | Confirmed |
| #D6005F on white is 5.22:1 | Recomputed | Confirmed |
| #5E5E5E on white is 6.48:1 | Recomputed | Confirmed |
| #B0B0B0 is 2.17:1 and #CCCCCC is 1.61:1 on white | Recomputed | Confirmed |
| Black on #FF1D8E is 5.82:1; white on #FF1D8E is 3.61:1 | Recomputed | Confirmed |
| White on #FFAA4B is 1.89:1; white on #189B62 is 3.56:1; white on black is 21:1 | Recomputed | Confirmed |
| Sale price 39% off: (870 − 530) ÷ 870 = 39.1% | Computed | Confirmed |
| Frames are 428 × 926 | Design; exported screens are 856 px wide, which is 2× | Confirmed from the image sizes |
| Product photography is illustrated placeholders | Design footer | Kept as stated. The footer says so on the page |
| Names, phone numbers, emails and addresses are blurred | Design | Kept. No names appear on the page |
| "Nigerian flag with +91" finding | Design | Kept as the design's finding |

No external sources are cited by the design, so none are checked here.

## 8. Accessibility

- One `h1`; `h2` per chapter; `h3` for option cards, specimens and cards; no skipped levels.
- Severity pills carry their word ("High", "Medium", "Low"), not colour alone.
- The as-designed failing colours are swatches (section 6), so axe reports nothing from them.
- Screen captions and alt text come from the artboard. The screens are images with alt text.

## 9. Verification

1. `npx tsc --noEmit`: exit 0.
2. ESLint on the touched files: no findings.
3. Repo axe spec (`tests/a11y.spec.ts`, `-g "work/poshmera"`): passes.
4. Axe at 1280 px: 0 violations.
5. 320 px: no horizontal overflow; tables display as stacked blocks; no `undefined` class names.
6. All 17 screen references load (they are lazy-loaded; scrolling triggers them).
7. Homepage micro slider: Poshmera is first (position 1 of 10).
8. Pager: previous is "From Frameworks to F1 Scores" (ABIM); next is "Keeping the PM Persona Current".

## 10. Open points

- **Research and result figures.** The page states that 15 interviews, 250 survey responses, 3 test rounds, 8,000 installs (against 5,000), 4.3★ and 13% checkout completion are as reported. The design file does not hold them. Confirm these are the figures to publish.
- **The 13% denominator.** The page says it is open. It needs stating before the figure is compared with anything.
- **Company and role.** The page says "Urbanfit Wellness · Pune" and "UX lead, research to launch", as the design does. The Urbanfit case study uses "UI/UX designer" for a different project. Confirm both.
- **Category.** "Mixed Methods" was chosen because the work combines interviews, a survey, usability testing and analytics. Confirm.
- **Placeholder product images.** The screens' product photos are illustrated placeholders, as the design's footer says.
