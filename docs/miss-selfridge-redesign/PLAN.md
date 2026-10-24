# Miss Selfridge case study: redesign plan

Page: `/work/miss-selfridge` · Source design: `Miss Selfridge — Case Study.pdf` (4 pages) · Status: planned and implemented on a local branch, not pushed.

## 1. Goal

Rebuild the case study around one question: **would they have bought anyway?** The page shows how a display program was held to a causal standard (a placebo holdout, a two-tailed test and a success metric matched to the mission), and why ROI alone would have flattered it.

## 2. What changes in the repo

| File | Change |
|---|---|
| `src/app/work/miss-selfridge/page.tsx` | Rewritten to the PDF's five chapters and hero |
| `src/app/work/miss-selfridge/missSelfridge.module.css` | New. Tokens from `globals.css`; the test diagram uses scoped tones |
| `src/content/missSelfridge.ts` | New. All copy and data |
| `docs/miss-selfridge-redesign/PLAN.md` | This file |

Unchanged: `layout.tsx`, `opengraph-image.tsx`, `src/lib/caseStudyMeta.ts` (its description already says 47%, which the PDF supports), `src/content/caseStudyBriefs.ts` (its brief already says 47% and the two-tailed test), `tests/a11y.spec.ts` (route already listed).

No images. The PDF's diagrams are rebuilt as HTML and CSS (flow steps, two arms, a formula block, bars and tables).

## 3. Page structure

| # | Section | Job | Visual |
|---|---|---|---|
| — | Hero | The question and the headline result | Tags, title with *anyway?*, lead, four meta items, a 47% stat box |
| 01 | The question | Every campaign claims the sales that follow it | Three rotated stickies: attribution trap, one budget three jobs, a calendar that never stops |
| 02 | Experiment design | Measured against doing nothing, not against zero | Two-step flow, a treated arm (90%) and a holdout arm (10%), a formula block, decisions table |
| 03 | Budget by job | Fenced by funnel job, not by channel habit | Three-segment bar (50 / 25 / 25) and three job cards |
| 04 | Results | What we could defend | Three result cards, "What 47% means" vs "What changed" |
| 05 | Reflection | What I'd tell the next team | Four lesson cards, "If I ran it again", a further-reading link |

## 4. Claims ledger (PDF → page)

| Claim | Basis given in the PDF | Status on the page |
|---|---|---|
| 47% of campaign-driven purchases came from customers new to the brand | New Customer Rate, programme data | Kept; the page says it describes who bought, not the size of the lift |
| Randomised 90 / 10 split (treated / placebo holdout) | Test design | Kept |
| Budget 50 / 25 / 25 across prospecting, conversion and retention | Programme plan | Kept |
| Two-tailed significance test; the lift was significant | Test result | Kept. The size of the lift is confidential and is not shown |
| Black Friday to Christmas; Qubit for Miss Selfridge (Arcadia) | Project | Kept |
| Metrics generalised for confidentiality | PDF footnote | Kept as a footnote |
| "Placebos cost money" and the ghost-ad idea | Opinion, labelled "today I'd look at" | Kept as a reflection, not a result |
| Further reading: Remerge, "Incrementality tests 101" | Web search: the article exists at the URL below | Linked: https://www.remerge.io/blog/incrementality-tests-101-intent-to-treat-psa-ghost-ads-and-ghost-bids/ |

Removed from the existing page, because the PDF does not carry them: the first-person narrative blocks (the "study that made measured against the counterfactual my operating standard" passage and similar). The existing page has no lift figure, so no number is removed.

## 5. Open points

- The hero role "Measurement & personalization specialist" differs from the title used on the Personalization page ("UX Analyst & Experimentation Designer"). Confirm which is right for this project.
- The PDF's results are a "significant" result with no size. The page keeps that wording; it does not add a confidence interval, because none is given.

## 6. Accessibility

- One `h1`, ordered `h2` and `h3`.
- The flow and the arms are real lists with text labels. Arrows are decorative and hidden from assistive tech.
- The formula block is text, not an image.
- Tables stack below 640 px with `data-label` cells.
- No timers, carousels or motion beyond the sticky tilt, which is removed under reduced motion.
- The axe suite (filtered to this route) must pass.

## 7. Verification

1. `npx tsc --noEmit`; ESLint on the touched files only.
2. Playwright axe for `/work/miss-selfridge`.
3. Preview at 1280 px and 320 px: no horizontal overflow, tables stack, no console errors, no `undefined` class names.
4. Check the decisions table has six rows and the budget bars sum to 100%.
