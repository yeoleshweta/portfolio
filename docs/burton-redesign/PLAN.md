# Burton case study: redesign plan (portfolio theme)

Page: `/work/burton` · Source design: `Downloads/Burton — Case Study.pdf` (five pages, "Burton: should the homepage check the forecast?") · Status: planned, then built on the local branch, not pushed.

## 1. Goal

Rebuild the case study around one question: **should the homepage check the forecast?** One homepage tile joined local weather to visitor location, was tested against a control, and lifted conversion by 11.6% across all users. The page shows how the gap was framed, how the three decisions were made, the chain from IP address to tile, the component and its states, and the accessibility rules that keep a weather-aware page predictable.

## 2. What changes in the repo

| File | Change |
|---|---|
| `src/app/work/burton/page.tsx` | Rewritten from the inline copy to the design's eight chapters: hero, gaps, pattern decisions, interaction logic, component, tokens, accessibility, results and reflection |
| `src/app/work/burton/burton.module.css` | Rewritten to use `globals.css` tokens only. The gradients from the live page are replaced by flat tokens |
| `src/content/burton.ts` | New. All copy, decisions, steps, tile specimens, token rows and rules |
| `docs/burton-redesign/PLAN.md` | This file |

Unchanged: `layout.tsx` and `opengraph-image.tsx`, `caseStudyMeta.ts` (its title "Should the Homepage Check the Forecast?" and description "lifted conversion by 11.6%" still match the design), `caseStudyBriefs.ts` (its brief "Conversion lifted by 11.6%" matches), the homepage metric "+11.6% conversion lift" (matches), `tests/a11y.spec.ts` (the route is already listed).

The page uses `CaseStudyLayout` with `hideBrief`, as the other rebuilt case studies do.

## 3. Theme mapping

The site has no dark mode, so colour comes from the light tokens in `globals.css`. The design's weather colours (yellow and slate) are mapped to tokens, and the contrast is recomputed on the tokens (§7).

| Design element | Token |
|---|---|
| Page and band grounds | `--color-bg` (#f2f2f2), `--color-surface` (#ffffff); lilac band `color-mix(in srgb, var(--color-accent) 12%, var(--color-bg))` |
| Dark hero | `--color-text` as the background, `--color-surface` as the text (the Evans and Miss Selfridge pattern) |
| Headings and key numbers | `--color-accent-text` (#5b3fd4) |
| Italic accent on the last key word | `--font-script` in `--color-lilac` (#7a5fd4) on light, `--color-sticky-accent` (#e6ddfd) on the dark hero. Headings only |
| Sunny weather bar | `--color-sticky` (#fff3b8). The design's #FFF3C4 is the same yellow |
| Rain weather bar | `--color-bg` (#f2f2f2). The design's slate #E3E8EF has no portfolio token; the grey ground carries the rain state with its icon and words |
| Tile message and CTA | `--color-text` for the CTA background, `--color-surface` for its text |
| Tile container | `--color-surface`, `--color-border`, `--radius-sm` (18 px). The design uses 12 px; the theme radius replaces it |
| Sticky notes | `--color-sticky` and `--color-sticky-accent` |

**Deliberate deviations from the design.** The gradients on the live demo are not reproduced; flat tokens are used, as the design itself recommends. The 12 px tile radius becomes `--radius-sm`. The slate rain colour becomes the grey ground.

## 4. Page structure

| Section | Job | Visual |
|---|---|---|
| Hero (dark) | The question and the result | Four tags, a two-line title with an italic "forecast?", lead, four meta items, and a stat box with "+11.6%" |
| 01 · The gaps (grey) | A shop window that couldn't see the weather | Lead and three rotated sticky notes |
| 02 · Working out the pattern (lilac) | Three decisions: scope, freshness, voice | Scope cards (status quo, rejected, chosen); freshness cards (rejected, chosen); voice cards (framings A, B, C) |
| 03 · Interaction logic (grey) | From IP address to raincoat | Five steps in a row, then three fallbacks; a footnote about the reconstruction |
| 04 · The component (lilac) | One tile, two weathers, three voices | Four tile specimens (rain × data, sun × data, rain × brand, rain × aspiration) and a spec list |
| 05 · Tokens (grey) | Weather as a theme, not a reskin | Token table on the portfolio tokens, with contrast |
| 06 · Accessibility (lilac) | Contextual, and still predictable | Rule table: rule, WCAG 2.2 criterion, in practice |
| 07 · Results (grey) | One tile, one number | Three stats; a dark "reading the number" box; the credit footnote |
| 08 · Reflection (lilac) | What I learned | Three cards and an "If I ran it again" list |

## 5. Interaction and responsive layout

- The tiles are static recreations. Their CTAs are styled `span`s, not links, so no fake controls reach the accessibility tree.
- The weather state is shown in words ("11°C · Rain"); the icon is decorative and hidden from assistive technology.
- Under 960 px the results grid stacks; under 640 px the tile grid stacks, the chain stacks, and the tables stack with `data-label` cells.
- No motion. The sticky notes are static rotations, removed under reduced motion.

## 6. Claims ledger

| Claim | Source | Status |
|---|---|---|
| +11.6% conversion uplift across all users, against a control | Design; matches the brief, meta and homepage metric | Kept |
| One contained homepage tile, no sitewide changes; three framings rotated | Design | Kept |
| The controlled test supports saying the tile caused the uplift; it can't say which framing did the most work | Design | Kept |
| Sample size and confidence interval aren't published | Design | Kept |
| Weather state and location joined via the visitor's IP, looked up live per session | Design | Kept |
| Sunny and rain states on the live page; other states and fallback rules are a reconstruction | Design footnote | Kept as a footnote |
| Weather checked once at page load; no live update mid-session | Design | Kept |
| Specimen temperatures (11°C, 24°C) and copy | Design; labelled illustrative | Kept, labelled as illustrative |
| "The live demo's colours pass (5.89:1 and 6.97:1)" | Design only; I did not reproduce these values on the live page | **Not carried over.** The page says the gradients are replaced with flat tokens, without the two ratios |
| Token values (#FFF3C4, #6B5A1E, #E3E8EF, #4A4F57, #1F1F1F) and their ratios | Design, illustrative | **Replaced** with portfolio tokens; ratios recomputed (§7). The design's ratios were reproduced exactly on its own values |
| Richard Wilson, Digital Director, Burton, quote | Previous page only; not in the design | **Removed.** A named person's quote is not in the design |
| "Our number one store is our website" quote | Previous page only | **Removed** |
| "Every physical Burton store adjusts…" paragraph; "an unusually large return … we trust it" | Previous page only | **Removed**; not in the design |
| Accessibility rule mapping (1.4.1, 1.1.1, 2.2.2, 3.2.5 as an AAA guide, 2.4.4, performance) | Design | Kept as the design's mapping, not a formal audit |
| Results: "1" contained mechanic; "3" framings | Design | Kept |
| Reflection and "If I ran it again" | Design | Kept |

## 7. Accessibility and contrast

Recomputed on the portfolio tokens (WCAG relative luminance):

- Body `#1c1c1c` on the sunny bar `#fff3b8`: 15.2:1; on the rain ground `#f2f2f2`: 15.2:1.
- Secondary `#595959` (sun and rain meta lines): 6.3:1 on both grounds.
- White text on the CTA `#1c1c1c`: 17.0:1.
- Headings `#5b3fd4` on grey: 6.0:1; body `#1c1c1c` on white: 17.0:1.
- The italic accent in lilac `#7a5fd4` is only used in headings at 30 px and above (large text, 3:1 applies; it measures 4.25:1 on grey and 3.75:1 on the lilac band). On the dark hero the accent is `#e6ddfd`.
- The design's "Check" column reproduces: the design's own values (14.81, 6.07, 13.39, 6.70, 16.48) match the recomputed ratios exactly, so the method is the same.

Structure:

- One `h1`; `h2` for the eight chapters; `h3` for sticky notes, decision cards, step names, tile titles and reflection cards.
- The decision cards carry their status in text ("Status quo", "Rejected", "Chosen", "Framing A"), not colour.
- The chain is a list of five steps; the arrows between them are `aria-hidden`.
- The tiles and their CTAs are not focusable. The photo placeholder is text, labelled as a placeholder.
- The rule table and the token table are real tables with captions and headers, and stack below 640 px with `data-label` cells.
- The axe suite for `/work/burton` must pass.

## 8. Verification

1. `npx tsc --noEmit`; ESLint on the touched files.
2. Playwright axe for `/work/burton`.
3. Preview at 1280 px and 320 px: no horizontal overflow; the tile grid, the chain and both tables stack; no console errors beyond the site's shared ones; no `undefined` class names.
4. Check the chain has five steps and three fallbacks; the tile grid has four tiles; the token table has seven rows and the rule table six rows.

Results for this change: `tsc --noEmit` and ESLint pass on the touched files; no unused CSS classes; the stylesheet has no colour literals; the axe suite for `/work/burton` passes; at 320 px there is no horizontal overflow, the chain is one column and both tables stack; the page has one `h1` (whose lines now read as one sentence), the eight section ids, five chain steps, four tiles, seven token rows and six rule rows; the only focusable elements are the table of contents and the pager.
5. Check the stylesheet has no colour literals.

## 9. Open points for the user

- **Gradients and the live demo's ratios (5.89:1, 6.97:1)** are not reproduced. Confirm the live page's gradients should be retired, as the design recommends.
- **Specimen values** (11°C, 24°C, "Your area") are illustrative; confirm they are acceptable on a live case study.
- **Role title:** the design says "Personalization specialist", the same as the Dorothy Perkins page. Confirm this matches the other case studies.
- **Accessibility mapping:** the design's mapping is kept as written. It describes how the tile follows each criterion; it is not a formal audit.
