# Stories by Children case study: redesign plan

Page: `/work/stories-by-children` · Source design: `Stories by Children — Case Study.pdf` (7 pages) · Status: planned, implemented on a local branch, not pushed.

## 1. Goal

Rebuild the case study to the PDF's story: **families weren't reaching a story → a homepage that serves both readers → a small set of components reused everywhere → tokens, interactions and accessibility designed for a 7-year-old and their parent → a reflection on designing for the pair.** The page shows only placeholder content and illustrations. No child's photo or full name appears anywhere.

## 2. What changes in the repo

| File | Change |
|---|---|
| `src/app/work/stories-by-children/page.tsx` | Rewritten to the PDF's seven chapters and hero |
| `src/app/work/stories-by-children/storiesByChildren.module.css` | New. Tokens from `globals.css`, plus scoped brand tones for the mocks |
| `src/content/storiesByChildren.ts` | New. All copy, data and the homepage section table |
| `src/lib/caseStudyMeta.ts` | Description rewritten to match the PDF's figures (no unsourced "cut the share") |
| `src/content/caseStudyBriefs.ts` | Micro "changed" line rewritten to match the PDF |
| `docs/stories-by-children-redesign/PLAN.md` | This file |

Unchanged: `layout.tsx`, `opengraph-image.tsx`, `public/assets/StoriesByChildren.jpg` (the cover is an illustration, not a photo), `tests/a11y.spec.ts` (route already listed).

## 3. Page structure

| # | Section | Job | Visual |
|---|---|---|---|
| — | Hero | The two audiences in one line | Tags, title with *two*, meta (role, team, timeline, method), browser-frame mock using the cover illustration |
| 01 | Problem & research | Analytics showed the drop-off; sessions were run with families | Three figures (60%, 50% → 85%, 4+ → 1–2) and four stickies |
| 02 | Design breakdown | The homepage order is the main IA decision | 14-section table tagged Kids / Parents / Both; story listing mock; contest card mock |
| 03 | Components | Eight component sets, reused | Six set cards; anatomy of a story card with five numbered callouts |
| 04 | Variables & tokens | Raw values audited into a three-layer token proposal | Three-column layer table; type scale list; "illustrative" note |
| 05 | Interaction patterns | 254 prototype interactions in four patterns | Four counted rows; three "why / what I'd change" cards |
| 06 | Accessibility & content | Kids and parents need different content and gates | Two columns; content-model table; WCAG table; privacy card |
| 07 | Outcome & reflection | Four lessons and next steps | Four cards; next-steps list; link to the live platform |

## 4. Visual decisions

- **No screenshots from the PDF.** The PDF's pages are full-page rasters, so crops would also carry its text and its contest-card venue details. The mocks are rebuilt as HTML/CSS with placeholder text.
- **Illustrations:** only the existing cover illustration is used, in the hero frame. The PDF's contest-card artwork is replaced by a plain coloured panel with a placeholder label.
- **Brand tones:** teal `#214545`, gold `#D4AC28`, butter `#FEEDB5`, lilac `#DEC4FF`, cream `#FFF8E6`. These are scoped to the page's mocks (`--sbc-*` variables in the module). All page chrome uses `globals.css` tokens.
- **Text colours:** the page's own text meets the PDF's fixes: no `#868686` or `#B9B9B9` for text; secondary text is `#6B6B6B` (5.3:1); links are underlined.

## 5. Claims ledger (PDF → page)

| Claim | Source given in the PDF | Status on the page |
|---|---|---|
| 60% of visitors never reached a story (before) | Analytics | Kept, labelled "before" |
| 50% → 85% task success across two Lean UX rounds | Moderated tests | Kept; the old "+40% page views" etc. are removed |
| 4+ → 1–2 clicks to reach a story | Audit | Kept |
| 9,022px homepage; 14 sections; Kids/Parents/Both tags | Figma | Kept. Counts recomputed from the table: Kids 6, Parents 4, Both 4 |
| 8 component sets reused 199 times; nav 10 variants · 155 uses | Figma | Heading kept. Only 6 sets are described, so the page says so |
| 254 interactions: 110 + 68 + 44 + 24 + 8 | Figma | Kept; the five rows sum to 254 (checked) |
| 21 screens | Figma | Kept |
| Token counts (383, 100, 96, 135, 149, 87, 27, 24, 10, 5) | Audit of the file | Kept, labelled "counts from the audit" |
| Contrast ratios (10.5:1, 9.4:1, 4.49:1, 3.6:1, 2.0:1, 2.2:1, 4.9:1, 5.3:1, 6.5:1) | Calculated | Recomputed with WCAG luminance: all match to 0.1 except near-black #1A1A1A, which computes to 8.1:1 (PDF: 7.9:1, hex not given). Shown as "about 8:1" |
| Six weeks, 1 designer · 1 developer · 1 stakeholder | Project | Kept |
| Testing with families, parent in the room | Sessions | Kept |

Removed from the live page because no source supports them: "+40% page views", "+25% story submissions", "70% category exploration", the "Numbers After Launch" section and the "cut the share of visitors" wording in the meta description and the micro brief.

## 6. Privacy

- No real child's photo, name or school on the page. Venue, dates and author credits are placeholders.
- The PDF's privacy card is reproduced as the design's own finding, not as a claim about the live site's photos.
- The sign-up overlay is described, not shown.

## 7. Accessibility

- One `h1`, ordered `h2` and `h3`, a `sr-only` note on the external link, underlined in-text links.
- No carousels, timers or auto-advancing content on the page, so the PDF's 0.8 s carousel and 2 s dissolve findings do not apply to the new page.
- Hover and focus states are not used to show information; all content is visible without hover.
- Tables stack below 640 px with `data-label` cells.
- The axe suite (`npm run test:a11y`, filtered to this route) must pass.

## 8. Verification

1. `npx tsc --noEmit`; ESLint on the touched files only.
2. Playwright axe for `/work/stories-by-children`.
3. Preview at 1280 px and 320 px: no horizontal overflow, tables stack, no console errors, no `undefined` class names.
4. Confirm the interaction and component counts sum as stated (254; 155 + …) and the table tags add to 14.

## 9. Open questions

- The PDF says 8 component sets but describes 6. Which two are missing?
- Should the cut "+40% / +25% / 70%" post-launch figures come back with a source?
- The PDF's privacy finding describes the live site's photos and names. Does the live site still show them?
