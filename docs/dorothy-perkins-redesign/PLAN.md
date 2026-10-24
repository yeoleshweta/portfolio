# Dorothy Perkins case study: redesign plan

Page: `/work/dorothy-perkins` · Source design: `Downloads/Case Study.pdf` (five pages, "Dorothy Perkins: why weren't students saving?") · Live reference: https://www.shwetasharma.tech/work/dorothy-perkins · Status: planned, then built on the local branch, not pushed.

## 1. Goal

Rebuild the case study around one question: **why weren't students saving?** The data already knew who was shopping. The page shows how a student discount and regional ranking were made visible, with each pattern chosen for being the most honest and the most in the shopper's control. It then shows the components, tokens and accessibility rules behind them.

## 2. What changes in the repo

| File | Change |
|---|---|
| `src/app/work/dorothy-perkins/page.tsx` | Rewritten from the inline copy to the design's eight chapters: hero, gaps, patterns, components and states, tokens, accessibility, results, reflection |
| `src/app/work/dorothy-perkins/dorothyPerkins.module.css` | New. Palette scoped to `.page` from the design's sampled colours; uses the site's display, script and hand fonts |
| `src/content/dorothyPerkins.ts` | New. All copy, tokens and rules |
| `src/lib/caseStudyMeta.ts` | Title changed to "Why Weren’t Students Saving?", the design's question. Metadata only; the description is unchanged |
| `docs/dorothy-perkins-redesign/PLAN.md` | This file |

Unchanged: `layout.tsx` and `opengraph-image.tsx` (they read `caseStudyMeta.ts`), `caseStudyBriefs.ts` (its brief already says "about half", which matches "50% … as reported"), `tests/a11y.spec.ts` (the route is already listed).

The page uses `CaseStudyLayout` with `hideBrief`, as the Miss Selfridge and Evans pages do, so the shared micro/TL;DR teaser does not sit above the design's own gaps chapter.

## 3. Page structure

| Section | Job | Visual |
|---|---|---|
| Hero (near-black) | The question and the headline result | Four outlined tags, two-line title with a script "saving?", lead, four meta items, a 50% stat box |
| 01 · The gaps (grey) | Three gaps between the data and the site | Three rotated sticky notes (two yellow, one lilac) |
| 02 · Working out the patterns (lilac) | Two decisions, each with status quo, rejected and chosen options | Two groups of three option cards; the chosen card has an accent border and a "Chosen" tag; handwritten note |
| 03 · Components and states (grey) | Each pattern as a component with states and rules | Four specimens: student price toggle, price, trending near you, welcome banner; each has a spec list |
| 04 · Tokens (lilac) | The token set behind the components, checked against WCAG 2.2 AA | Token table with colour swatches |
| 05 · Accessibility (grey) | How each pattern maps to WCAG 2.2 criteria | Rule table |
| 06 · Results (lilac) | Three results and the programme principle | Three stats; dark principle box; governance footnote |
| 07 · Reflection (grey) | What I learned and what I'd change | Three cards and an "If I ran it again" list |

## 4. Specimens and interaction

- The specimens are static recreations, as the design says ("recreated specimens with placeholder products"). The toggle, the "Change area" link and the "Close" control are styled to match the design but are not focusable, so no fake controls appear in the accessibility tree. The state wording ("Student prices on · 10% off") is text, so the state is not carried by colour alone.
- The price block is real text: the struck-through old price is paired with a visually hidden "was", and the student price with a hidden "Student price", so screen readers can tell which price is which (the design's rule).
- No animation on the page. The token table lists a 150 ms fade for price changes; that is documentation of the component, not motion on this page.
- Reduced motion: nothing to disable beyond the page's own transitions, which are none.

## 5. Claims ledger

| Claim | Source | Status |
|---|---|---|
| 50% of UK sales segmented at peak, "(as reported)" | Design | Kept with the "(as reported)" qualifier |
| 10% student discount, moved from checkout to the first page a student sees | Design | Kept. The design gives no uplift figure, and none is shown |
| Board-level strategy; personalization discussed at board level | Design | Kept. No number attached |
| Students got 10% off; price £50.00 → £45.00 | Design specimen | Kept. £45.00 is 10% off £50.00 |
| Token contrast: student price #5B3FD4 6.76:1 on white; toggle #5B3FD4 with white text 6.76:1 | Recomputed (WCAG relative luminance) | Confirmed |
| Live toggle #8B69FA with white text is 3.82:1 and fails | Recomputed; the live site's `--color-accent` is `#8b69fa` | Confirmed. The new page uses #5B3FD4 for the toggle, so the failing colour is removed |
| Was-price token #5C5C5C "6.09:1 on the card ground" | Recomputed on the design's sampled card ground (#F4F3EF): **6.02:1** | **Corrected** to 6.0:1. Still passes AA |
| Toggle outline #1F1F1F above 3:1 for 1.4.11 | Recomputed: 16.5:1 on white | Confirmed |
| Target 44px, above the 24px minimum in 2.5.8 | Design | Kept |
| Accessibility mapping (4.1.2, 4.1.3, 1.3.1, 3.2.3, 2.1.1, 2.4.11) | Design | Kept as the design's mapping. 3.2.3 is applied to the toggle's persistence across pages; that is the design's framing, not a formal audit |
| Gareth Rees-John, Digital Director, quote | Previous page only; not in the design | **Removed.** A named person's quote has no support in the design, and this is a privacy-sensitive case |
| City names (New York, LA, Atlanta, Houston, Chicago) and product names | Previous page only | **Removed.** The design uses "[Product]" placeholders and says the specimens are not the original screens |
| "5 cities" and "Instant" result cards | Previous page only | **Removed.** Replaced by the design's three results |
| "Four layers" and the overview paragraphs | Previous page only | **Removed.** The design has no overview section |
| Capita and Qubit team line; platform Qubit | Design | Kept |

## 6. Accessibility

- One `h1`; `h2` chapters; `h3` for option groups, specimen titles and card titles; `h4` only where a card needs one.
- Contrast, by WCAG relative luminance: accent `#5B3FD4` on grey 6.0:1 and on lilac 5.5:1; body `#181818` on grey 15.9:1; muted `#565656` on lilac 6.0:1 and on grey 6.6:1; hero lead on near-black well above 4.5:1; yellow `#FEF2B6` on the stat box 16.0:1.
- The rule table and the token table are real tables with headers and captions. They stack below 640 px with `data-label` cells, as on the other case studies.
- The specimens carry their state in text. Decorative swatches and the sticky rotations are `aria-hidden` or have no meaning to convey.
- The axe suite for `/work/dorothy-perkins` must pass.

## 7. Verification

1. `npx tsc --noEmit`; ESLint on the touched files.
2. Playwright axe for `/work/dorothy-perkins`.
3. Preview at 1280 px and 320 px: no horizontal overflow; tables stack under 640 px; specimens wrap; no console errors beyond the site's shared ones; no `undefined` class names.
4. Check the token table has seven rows, the rule table six rows, and the specimens render their spec lists.

Results for this change: `tsc --noEmit` and ESLint pass on the touched files; the axe suite for `/work/dorothy-perkins` passes; at 320 px there is no horizontal overflow and the tables stack; the page has one `h1`, the seven section ids, and no fake controls in the specimens. The console shows 404s, as on the other case-study pages. They are not from this page's own resources (no broken images or local assets), and I did not trace their source further.

## 8. Open points for the user

- **Homepage badge** now reads "Segmented 50% of UK sales (as reported)", to match the design. `caseStudyMeta.ts` is unchanged; its description says "about half", which the design's "(as reported)" figure supports.
- **Quote:** the removed Gareth Rees-John quote can be restored only with the design's sign-off and the person's approval.
- **Role title:** the design says "Personalization specialist"; the Evans page says "Personalization & Experimentation Specialist". Confirm the title for this project.
- **WCAG mapping:** the design's mapping is kept as written. Confirm if the page should say "mapped to" rather than "meets".
