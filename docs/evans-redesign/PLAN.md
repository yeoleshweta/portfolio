# Evans case study: redesign plan (portfolio theme)

Page: `/work/evans` · Source design: `Downloads/Case Study.pdf` (four pages, "Evans: do small wins compound?") · Live reference: https://www.shwetasharma.tech/work/evans · Status: planned, then built on the local branch, not pushed.

This replaces the earlier plan, which followed `Portfolio Assets/Design_evans.pdf` with a cream-and-rust palette. This design uses the portfolio's own purple, lilac and sticky-note look, so the page now uses the site's theme tokens rather than a scoped palette.

## 1. Goal

Rebuild the case study around one claim: **six small experiments, each tested on its own and judged on revenue per visitor (RPV), added up to millions, and their uplifts do not sum.** The page also shows the interaction patterns as rules (trigger, what it shows, when it stays hidden), and the accessibility rules behind them.

## 2. What changes in the repo

| File | Change |
|---|---|
| `src/app/work/evans/page.tsx` | Rewritten to the design's six chapters: hero, question, portfolio, interaction patterns, honest by design, results and reflection |
| `src/app/work/evans/evans.module.css` | Rewritten to use `globals.css` tokens only. No scoped palette |
| `src/content/evans.ts` | Rewritten. All copy, bar data and specimen data |
| `docs/evans-redesign/PLAN.md` | This file |

Unchanged: `layout.tsx`, `opengraph-image.tsx`, `caseStudyBriefs.ts` (its brief already says "from 2.5% to 8.43%", which this design also says), `caseStudyMeta.ts` (its title and description still match), `tests/a11y.spec.ts` (the route is already listed).

The page uses `CaseStudyLayout` with `hideBrief`, as the other rebuilt case studies do.

## 3. Theme mapping

The site has no dark mode, so all colour comes from the light tokens in `globals.css`.

| Design element | Token |
|---|---|
| Page and card grounds | `--color-bg` (#f2f2f2), `--color-surface` (#ffffff) |
| Dark hero and dark formula box | `--color-text` as the background, `--color-surface` as the text (the Miss Selfridge pattern) |
| Headings and key numbers | `--color-accent-text` (#5b3fd4) |
| Italic script accents in headings | `--font-script` in `--color-lilac` (#7a5fd4). Large text only |
| Lilac chapter band | `color-mix(in srgb, var(--color-accent) 12%, var(--color-bg))` (the Miss Selfridge pattern) |
| Sticky notes | `--color-sticky` (#fff3b8) and `--color-sticky-accent` (#e6ddfd) |
| Bars | `--color-accent` (#8b69fa) for the five others; `--color-accent-text` (#5b3fd4) for the best result |
| Body, secondary text | `--color-text`, `--color-text-secondary` |
| Borders | `--color-border` |
| Radius and type | `--radius-card` (cards), `--radius-sm` (small cards), `--radius-pill` (tags); `--font-display`, `--font-primary`, `--font-hand`, and the mono stack the site already uses |

**Deliberate deviation.** The design shows the checkout error in red. The portfolio has no error token, and you asked to stick to the theme, so the specimen shows the error with a heavy border, bold text and a leading "!" rather than a new colour. The state is not carried by colour alone.

## 4. Page structure

| Section | Job | Visual |
|---|---|---|
| Hero (dark, `--color-text`) | The claim in one line | Four tags, two-line title with a script "compound?", lead, four meta items, and a stat box with "+2.5% to +8.43%" |
| 01 · The question (grey) | Many small bets, or one big redesign | Three rotated sticky notes (yellow, lilac, yellow) |
| 02 · The portfolio (lilac) | Six experiences, each scored on its own | Six horizontal bars with category, name and value; a hand-written footnote |
| 03 · Interaction patterns (grey) | Each pattern is a rule | Six specimen cards in a 3 × 2 grid, each with a visual, a title, an RPV line and TRIGGER / SHOWS / HIDDEN rows; a footnote |
| 04 · Honest by design (lilac) | Persuasion that's true, and readable | Rule table: rule, WCAG 2.2 criterion, in practice |
| 05 · Results (grey) | Small wins, honestly counted | Three stats; a dark formula box showing the struck-through sum; the credit footnote |
| 06 · Reflection (lilac) | What I'd tell the next team | Four cards (one lilac) and an "If I ran it again" list |

## 5. Interaction and responsive layout

- The bars are a static list, as in the design. Each row has the name and value as text; the bar fill is decorative (`aria-hidden`), so the values carry the information.
- Specimens are static recreations. Their switches, buttons and inputs are styled but not focusable, so no fake controls reach the accessibility tree.
- Under 960 px: the meta strip becomes two columns and the results grid stacks. Under 640 px: the six specimen cards stack in one column, the rule table stacks with `data-label` cells, and each bar becomes a label-and-value row above its track.
- No motion beyond the sticky notes' static rotation.

## 6. Claims ledger

| Claim | Source | Status |
|---|---|---|
| Uplifts: social proof +2.50%, "Selling fast" badge +3.34%, top-200 popularity +8.43%, mobile +5.62%, sizing welcome banner +2.50%, checkout friction +3.19% | This design | Used as given. **Changed from my last build**, which used social proof +3.34% and "Selling fast" +3.47% from the earlier design. This mapping matches the page before that build |
| Range "+2.5% to +8.43%"; best single result +8.43% (top-200 popularity) | This design; matches the brief | Kept |
| Six uplifts sum to 25.6% | Arithmetic: 2.5 + 3.34 + 8.43 + 5.62 + 2.5 + 3.19 = 25.58 | Kept. **Changed** from "about 27%" in my last build, which used the earlier design's values |
| "Several million pounds" / "Millions" of added revenue, "(reported)" | This design only; no source in the repo | **Kept as written and flagged.** The user must confirm it before it goes live |
| "Selling fast" trigger: stock in the selected size falls below a threshold | This design | Kept. The earlier design tied the badge to trailing 24-hour add-to-bag data; this design does not, so the page no longer says so |
| Top-200 popularity: items in the top 200 added to bag over the last 24 hours | This design | Kept |
| "Mostly mobile, not digitally native" (audience) | This design | Kept. The previous page said "predominantly mobile user base" and was changed last build; this design gives the wording above |
| Role "Personalization & experimentation specialist"; team "Capita · Qubit, for Evans (Arcadia)"; methods "A/B testing · behavioural data · RPV" | This design | Kept as given. Role capitalisation follows the design |
| Simon Pritchard quote (Group Digital Director, Arcadia) | Previous build only; not in this design | **Removed.** A named person's quote is not in this design, so it is not carried over |
| Arcadia's measurement standard: investments judged on incremental value | This design, unattributed | Kept as an unattributed footnote |
| "Four layers" | Previous build | Not used in this design; not present |
| Specimen values: "12 people are viewing this now", "Size 18 selected", placeholder products | This design | Kept. They are labelled as recreated specimens with placeholder products and illustrative wording, so the "12" is not a measured figure |
| WCAG rules: 2.2.1, 1.4.1, 4.1.3, 3.3.1 and 3.3.3, 3.3.7, 2.5.8 | This design | Kept as the design's mapping. It describes how the patterns follow each criterion; it is not a formal audit |
| Filter chips "well above the 24px minimum" | This design | Kept. The page does not state a number |

## 7. Accessibility and contrast

Measured on the portfolio tokens (WCAG relative luminance):

- Body `#1c1c1c` on grey 15.9:1 and on the sticky notes 13–15:1.
- Secondary `#595959` on white 7.0:1 and on the lilac band 5.5:1.
- Headings `#5b3fd4` on grey 6.0:1 and on white 6.8:1.
- Hero text: white on `#1c1c1c` 17.0:1; `#e8e8e8` secondary 13.9:1; sticky yellow stat 15.2:1.
- Lilac `#7a5fd4` is 4.25:1 on grey and 3.75:1 on the lilac band. It is used only for italic accents in headings, which are 30 px and above. WCAG's large-text threshold is 24 px, where 3:1 applies. It is not used for body text or small labels.
- Bar fills `#8b69fa` are 3.8:1 against white (non-text 3:1 met). The best bar uses `#5b3fd4` (6.8:1).

Structure:

- One `h1`; `h2` for the six chapters; `h3` for sticky notes, specimen titles, reflection cards and the "If I ran it again" heading.
- The rule table and the bar list are real semantic elements with headers. The rule table stacks below 640 px with `data-label` cells.
- The strikethrough sum is followed by the plain-text verdict "not the program's lift", so the meaning does not depend on the strikethrough.
- Decorative arrows, swatches, icons and bar fills are `aria-hidden`.
- The axe suite for `/work/evans` must pass.

## 8. Verification

1. `npx tsc --noEmit`; ESLint on the touched files.
2. Playwright axe for `/work/evans`.
3. Preview at 1280 px and 320 px: no horizontal overflow; specimen cards stack; the rule table stacks; no console errors beyond the site's shared ones; no `undefined` class names.
4. Check: the six bars sum to 25.6% in the formula; the bar list has six rows; the specimen grid has six cards; the rule table has six rows.
5. Check no unused CSS classes; check the stylesheet has no colour literals (`#…`, `rgb(…)`), so every colour comes from `globals.css` tokens or a `color-mix` of them.

Results for this change: `tsc --noEmit` and ESLint pass on the touched files; no unused CSS classes; the stylesheet has no colour literals; the axe suite for `/work/evans` passes; at 320 px there is no horizontal overflow after the stat value was allowed to wrap, and the bars and the rule table stack; the page has one `h1`, the six section ids, six bars, six specimen cards, six rule rows and no interactive controls. The console shows a 404 that also appears on the other case-study pages, and stale import errors from an earlier compile in the dev server's buffer. The server returns 200 with the new page.

## 9. Open points for the user

- **"Several million pounds" / "Millions"** has no source in the repo or the design, and the design marks it "(reported)". Confirm it before the live page relies on it.
- **Bar values** changed from my last build back to the mapping this design uses (social proof +2.50%, "Selling fast" +3.34%). Confirm this is the intended mapping.
- **Error state** is shown without red, to stay on the portfolio theme. If you want the design's red, it needs a token added to `globals.css`.
- **Role title:** the design says "Personalization & experimentation specialist". The Miss Selfridge page says "Measurement & personalization specialist", and the Dorothy Perkins page says "Personalization specialist". Confirm the title for each project.
