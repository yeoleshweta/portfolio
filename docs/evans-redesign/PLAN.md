# Evans case study: redesign plan

Page: `/work/evans` · Source design: `Portfolio Assets/Design_evans.pdf` (one page, "Experimentation portfolio · Metric design") · Status: built and checked on the local branch, not pushed.

The file the user first named, `Downloads/Case Study.pdf`, is no longer there. The user chose `Design_evans.pdf` from the repo. Its body paragraphs are not in the PDF's text layer, so the copy was read from rendered crops.

## 1. Goal

Rebuild the case study around one claim: **six small, individually measured experiments, each scored on revenue per visitor (RPV), added up to millions, and uplifts do not sum.** The design is editorial: serif headings, paper and cream tones, a rust accent and a dark close.

## 2. What changes in the repo

| File | Change |
|---|---|
| `src/app/work/evans/page.tsx` | Rewritten to the design: hero, overview, tension, experiment chart, implementation, evidence, key learnings, credit |
| `src/app/work/evans/evans.module.css` | New. Editorial palette scoped to `.page`; serif is a system stack (no new font) |
| `src/content/evans.ts` | New. All copy and data, sourced from the design (see §5) |
| `docs/evans-redesign/PLAN.md` | This file |

Unchanged: `layout.tsx`, `opengraph-image.tsx`, `tests/a11y.spec.ts` (the route is already listed), `caseStudyBriefs.ts`, `caseStudyMeta.ts`.

No images. The PDF's chart is rebuilt as buttons with bar heights. It uses `CaseStudyLayout` with `hideBrief`, as the Miss Selfridge page does, so the shared micro/TL;DR teaser is not shown above the design's own overview.

## 3. Page structure

| Section | Job | Visual |
|---|---|---|
| Hero (paper) | The claim in one sentence | Mono kicker, serif title, lead, four-cell meta strip (role, team, methods, outcome) |
| Overview (paper) | A portfolio of small bets | Two paragraphs |
| 01 · The tension (cream) | Three constraints that shaped the programme | Three cards and a pull quote |
| 02 · The craft (paper) | Six experiments, each scored on RPV | Six bar buttons; a detail card for the selected bar (default: top-200 popularity) |
| 03 · Implementation (cream) | Measured individually; factual urgency; uplifts do not sum | Three paragraphs with bold claims |
| 04 · Evidence (paper) | Measuring the lift | 2×2 stat grid and an attributed quote |
| Key learnings (ink) | Three lessons | Three headed paragraphs, then a credit line on paper |

The design's top bar links (Topshop, Miss Selfridge, Topman) are not reproduced. The site header and the case-study pager cover navigation. There is no Topman route in the repo.

## 4. Interaction and responsive layout

- The six bars are real `button`s with `aria-pressed`, and each has an `aria-label` with its name and value. The detail card is `aria-live="polite"` and is text, so the selection does not rely on colour.
- Desktop: bars are heights proportional to the largest uplift (+8.43% = 85% of the track, leaving room for the value label). The height transition is disabled under `prefers-reduced-motion`.
- Under 640 px: the bars become a 2-column grid of cards with horizontal fills. A vertical bar was too narrow for labels such as "Welcome message" at 320 px.

## 5. Claims ledger

| Claim | Source | Status |
|---|---|---|
| Uplifts: social proof +3.34%, 'Selling Fast!' +3.47%, top-200 popularity +8.43%, top-200 mobile +5.62%, welcome message +2.5%, checkout friction +3.19% | Design chart | Used as the design gives them. **Changed from the previous page**, which had social proof +2.5% and 'Selling Fast!' +3.34%. Flagged for the user to confirm |
| Best single experience +8.43% RPV (top-200 popularity); range 2.5%–8.43% | Design | Kept |
| Six uplifts "claim 26%" when added | Arithmetic: 3.34 + 3.47 + 8.43 + 5.62 + 2.5 + 3.19 = **26.55%** | **Changed** to "about 27%" in the learnings. The design's 26% truncates the sum. The previous page's 25% was also wrong |
| "Across four layers of the journey" | Design lead | **Dropped** from the lead. The chart's tags name five layers (trust, urgency, mobile, onboarding, checkout), so the count of four could not be shown. The lead now says "Six experiences across the journey". Flagged |
| "Several million pounds" / "millions" of top-line revenue | Design only; no source in the repo | **Kept as written and flagged.** It is stated in the lead, the implementation text, the evidence stats and the learnings. The user must confirm it before it goes live |
| Role "Personalization & Experimentation Specialist"; team "Capita · Qubit ecosystem · Evans" | Design | Kept. Role titles differ across studies (see §7) |
| Descriptions for social proof, welcome message and checkout friction | Previous page | Kept. The design shows only the top-200 card |
| 'Selling Fast!' description | Previous page said "stock levels"; the design's implementation text says "trailing 24-hour add-to-bag data" | **Changed** to the design's rule: the badge appears only on products that are actually moving |
| Top-200 mobile description | Previous page said "predominantly mobile user base"; the design says the base was "not digitally native" | **Changed**: "predominantly mobile user base" is removed, since the design does not support it |
| "Factual by construction": urgency badges use trailing 24-hour add-to-bag data | Design | Kept; a process claim, not a number |
| Full journey: product page, basket, mobile, first-visit onboarding, checkout | Design | Kept |
| Quote: "The Arcadia measurement standard…", after Simon Pritchard, Group Digital Director, Arcadia | Design | Kept and attributed as the design gives it |
| Capita as the team's company; Capita acquired Qubit | Design for the team line. The acquisition is not checked in this work | Team line kept as the design gives it. The acquisition claim is not used on the page |
| Footer: "Shweta Sharma · Quantitative UX Researcher" | Design | Kept. The title differs from the hero role (see §7) |

## 6. Accessibility and checks

- One `h1`, ordered `h2` and `h3`. All six section ids exist and match the layout's table of contents.
- Contrast, by WCAG luminance: rust `#8B4A2B` on paper 6.46:1 and on cream 5.93:1; ink on cream 15.1:1; body `#3A3832` on paper 11.2:1; muted `#6B675C` on cream 4.96:1 and on paper 5.4:1; cream `#F4F0E6` on ink 15.1:1; muted-on-dark `#A9A397` on ink 6.9:1.
- Inactive bars are `#8F887A` (3.3:1 on paper), darkened from the design's `#DDD6C8` (1.27:1). The selected bar is also named in its `aria-label` and in the detail text.
- Results: `npx tsc --noEmit` passes; ESLint on the touched files has no findings; the axe suite for `/work/evans` passes (no serious or critical violations).
- Preview at 1280 px and 320 px: no horizontal overflow; the detail card updates when a bar is clicked; the mobile card grid reads without overlap.
- Console: six 404s appear on `/work/evans` and also on the unchanged `/work/miss-selfridge`. They come from the shared site, not from this page.

## 7. Open points for the user

- **"Several million pounds" / "millions"** has no source in the repo or the design. Confirm it before the live page relies on it.
- **Bar values:** the design swaps the social proof and 'Selling Fast!' values relative to the previous page and gives 'Selling Fast!' +3.47%. Confirm which set is right.
- **Role and title:** Evans hero says "Personalization & Experimentation Specialist"; the footer says "Quantitative UX Researcher". Miss Selfridge says "Measurement & personalization specialist"; the Personalization page says "UX Analyst & Experimentation Designer". Which is right for each project?
- **Quote:** the design attributes the quote to a named Arcadia director. Confirm it may be published as it stands.
