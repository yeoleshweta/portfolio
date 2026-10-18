# ABTools case study — detailed redesign spec

**Page:** `/work/john-deere-sus`
**Design source of truth:** Claude Design canvas “ABTools Case Study Redesign” (https://claude.ai/artifact/57VPGJbybmW1hXZhUjWuxB). Local copies of every board are in `docs/abtools-redesign/design/`.
**Standard:** WCAG 2.2 AA.
**Scope:** `src/app/work/john-deere-sus/page.tsx`, `johnDeere.module.css`, `src/content/johnDeere.ts`, new components in `src/components/casestudy/`, one font and two tokens in `src/app/layout.tsx` / `globals.css`.

This file replaces the shorter `README-CURSOR.md` as the build spec. Keep both in the repo.

---

## 0. How to use this with Cursor

1. Commit or stash any open work first. (`AboutSection.tsx` and its CSS are currently modified.)
2. First prompt, with this file attached:

   > Read `docs/abtools-redesign/CASE-STUDY-SPEC.md` fully, then `docs/abtools-redesign/design/Main.dc.html`. Read `src/app/work/john-deere-sus/page.tsx`, `johnDeere.module.css`, `src/content/johnDeere.ts`, `src/app/globals.css`, and every file in `src/components/casestudy/`. List any conflicts between the spec and the code. Do not edit anything yet.

3. Then one phase per prompt (section 9): “Do Phase 1 of CASE-STUDY-SPEC.md.” Run `npm run lint` and `npm run dev` after each phase, check the page, commit.
4. Rule for Cursor in every phase: **use the repo’s tokens, not the hex values in the `.dc.html` files.** The design files are a visual reference only.

---

## 1. Story and structure

The page should read as a story, not a report:

> Teams liked UX but rarely used it for evidence → a redesign needed proof → we measured the same people twice → usability went up, satisfaction didn’t → the words explained why (Notes) → we turned findings into reusable patterns → evidence changed what happened next.

### 1.1 Final section order

Replace the `sections` array in `page.tsx` with this. Old ids are kept where content survives, so existing links keep working.

| # | `id` | TOC `label` | Built from (current) |
|---|---|---|---|
| — | `stats-strip` | (not in TOC) | stats strip, unchanged position |
| — | `overview` | The short version | `overview` → becomes TL;DR card |
| P | `context` | Prologue: why evidence | `context` (09) **moved up** |
| 01 | `problem` | 01 · The problem | `background` + `problem` merged |
| 02 | `design` | 02 · The plan | `design` |
| 03 | `participants` | 03 · The people | `participants` |
| 04 | `workflow` | 04 · The workflow | `workflow` |
| 05 | `results` | 05 · The numbers | `results` |
| 06 | `findings` | 06 · What people said | `findings` (minus Notes) |
| 07 | `notes` | 07 · The Notes problem | **new**, Notes content moved out of `findings` |
| 08 | `decisions` | 08 · The verdict | `decisions` |
| 09 | `patterns` | 09 · Design system | `patterns` |
| 10 | `impact` | 10 · Impact | `impact` + new “Where it led” |
| 11 | `lessons` | 11 · Looking back | `limitations` + `next` + `lessons` merged |

Remove the ids `background`, `limitations` and `next` (their content moves).

### 1.2 Section backgrounds (alternate for rhythm)

| Section | Wrapper |
|---|---|
| stats, overview, prologue | plain |
| problem | `tintSection` |
| design | plain |
| participants | `tintSection` |
| workflow | plain |
| results | `tintSection` |
| findings | plain |
| notes | `tintSection` |
| decisions | `darkSection` (keep) |
| patterns | plain |
| impact | `tintSection` |
| lessons | plain |

---

## 2. Theme, tokens and the doodle kit

### 2.1 Use existing tokens (from `globals.css`)

| Purpose | Token |
|---|---|
| Page background | `--color-bg` (#f2f2f2) |
| Cards | `--color-surface` |
| Body text | `--color-text` |
| Secondary text | `--color-text-secondary` |
| Accent for text, lines, filled chart marks, focus | `--color-accent-text` (#5b3fd4) |
| Accent for decoration only (glows, underlines, fills under 3:1 needs) | `--color-accent` (#8b69fa) — never for text |
| Italic accent words in headings | `--font-script` + `--color-lilac` |
| Headings | `--font-display` |
| Borders | `--color-border` |
| Card radius | `--radius-card` (32px) for big cards; use 18px for small cards (add `--radius-sm: 18px`) |

### 2.2 Add

In `globals.css` `:root`:

```css
--color-sticky: #fff3b8;        /* sticky notes; text on it = --color-text */
--color-sticky-shadow: rgba(28, 28, 28, 0.10);
--color-before: #6f6f6f;         /* "before" marks; ≥3:1 on #f2f2f2 and #fff */
--radius-sm: 18px;
--font-hand: var(--font-caveat), "Comic Sans MS", cursive;
```

In `src/app/layout.tsx`, load Caveat with `next/font/google` (`weight: ["700"]`, `variable: "--font-caveat"`, `display: "swap"`) and add the variable class to `<html>`.

Contrast checks to confirm:
- `--color-accent-text` on `--color-bg` and on `--color-sticky` ≥ 4.5:1.
- `--color-text-secondary` on `--color-sticky` ≥ 4.5:1 (if not, use `--color-text` on stickies).

### 2.3 Doodle kit (new components)

All in `src/components/casestudy/doodles/`, one CSS module `doodles.module.css`.

**`HandNote`**
```tsx
type HandNoteProps = { children: ReactNode; rotate?: number; as?: "p" | "span"; className?: string };
```
- `font-family: var(--font-hand); font-weight: 700; font-size: clamp(22px, 2.2vw, 28px); line-height: 1.15; color: var(--color-accent-text);`
- `transform: rotate(${rotate ?? -1.5}deg)`; clamp `rotate` to −3…3.
- Real text. Never `aria-hidden`. If the note only repeats nearby text, wrap it in `<span aria-hidden="true">` at the call site instead.

**`StickyNote`**
```tsx
type StickyNoteProps = { children: ReactNode; rotate?: number; size?: "sm" | "md"; className?: string };
```
- `background: var(--color-sticky); color: var(--color-text); border-radius: 4px; box-shadow: 0 3px 0 var(--color-sticky-shadow); padding: 18px 20px (md) / 12px 14px (sm); font-size: 18px (md) / 15px (sm); line-height: 1.4;`
- Rotation −2…2deg. Rendered as a `<div>`; if it's a list item, the parent is a `<ul>` and the sticky is `<li>`.

**`SketchArrow`** — inline SVG, `aria-hidden="true" focusable="false"`.
```tsx
type SketchArrowProps = { width?: number; height?: number; direction?: "right" | "down"; tone?: "ink" | "accent" };
```
Path (right, 96×48): `M4 34 C 26 8, 58 6, 86 22` + head `M74 12 L88 23 L72 30`, `stroke-width: 3`, round caps/joins, `fill: none`. `tone="accent"` → `var(--color-accent-text)`, else `var(--color-text)`.

**`SketchUnderline`** — SVG 190×16, `M3 10 C 48 3, 118 14, 187 6`, `stroke: var(--color-accent)`, `stroke-width: 4`, round cap, `aria-hidden`.

**`SketchCircle`** — SVG loop to circle a number/bar (used in Prologue): `M30 18 C 120 -4, 290 6, 312 54 C 330 96, 210 116, 110 110 C 30 104, 4 78, 12 52 C 18 30, 50 20, 86 16`, viewBox `0 0 330 120`, stroke `var(--color-accent-text)` 4px, `aria-hidden`.

**`DoodleAvatar`** — 52×52 SVG: circle head (cx 26, cy 19, r 10) + shoulders path `M8 48 C 10 34, 42 34, 44 48`, stroke `var(--color-text)` 2.5, head fill from a `tint` prop (4 soft tints). `aria-hidden`.

Motion: none of these animate. Keep `BeeTrail` as is; it already respects the motion toggle.

---

## 3. Section-by-section spec

For each section: layout, components, copy (use verbatim unless noted), data changes, accessibility, and acceptance.

### 3.0 Hero (`CaseStudyHero`, variant `abtools`)

**Layout:** keep `CaseStudyHero`. Add a right-hand slot (or a `children` block) holding a new `SusScoreCard`. On ≥ 1024px: title left (≈60%), card right (≈40%). Below 1024px: card under the subtitle.

**Copy**
- Category/eyebrow: `Case study · John Deere Financial · Jan–Aug 2021`
- Title: `When did ‘better’ actually mean better?` — wrap `‘better’` in the script/lilac style.
- Subtitle (replace current): `A new web version of ABTools, a credit tool used all day by John Deere Financial analysts, looked cleaner. I ran a two-wave study with the same four power users to find out whether it was actually easier to use, and where it still got in the way.`
- Method chips (new, under subtitle): `Longitudinal study` · `Within-subjects` · `SUS benchmark` · `Interviews` · `Thematic analysis`

**`SusScoreCard`** (new, `src/components/casestudy/SusScoreCard.tsx`)
- White card, `--radius-sm`, padding 28–32px, `transform: rotate(-1.2deg)`.
- Eyebrow: `System Usability Scale (SUS)`.
- Row: `Old desktop` / **60** (64px, `--color-before`) → `SketchArrow tone="accent"` → `New web app` / **85.6** (84px, `--color-text`) with `SketchUnderline` below.
- Body (16px): `+25.6 points, above the Global IT average (63), the FY21 target (67) and the industry average (68). Four participants, so read it as direction, not proof.`
- Under the card: `<HandNote rotate={-2}>same 4 people, 8 months apart ↑</HandNote>`
- A11y: numbers are real text. Wrap 60 / 85.6 group in an element with `aria-label="SUS rose from 60 to 85.6"` and hide the arrow.

**Acceptance:** card never overlaps the title at 1024–1440px; at 390px it stacks with no horizontal scroll.

### 3.1 Stats strip (`stats-strip`)

Keep as is (CountUp × 4 + facts). No change except: facts line `Participants` value → `4 power users, one per role, 3.5 to 20+ years with ABTools`.

### 3.2 The short version (`overview`)

Replace the overview paragraphs with `TldrCard` (already in `CaseStudyExtras`).

- `summary`: `A redesign that looked better needed proof that it worked better. I measured the same four experts before and after launch.`
- `tldr`:
  - problem: `A redesign that looks newer isn’t proof it works better, especially for experts with up to 20 years of habits.`
  - role: `UX Researcher. Planned the study with the JDF product team, ran both waves, analysed and presented the results.`
  - team: `JDF UX team, ABTools product team`
  - timeline: `January to August 2021`
  - methods: `Two-wave within-subjects study · SUS · six-dimension questionnaire · interviews · thematic analysis`
  - outcome: `SUS 60 → 85.6. All six dimensions improved. 35 remaining issues, 16 of them about Notes.`
  - decision: `Notes became a high-priority backlog item, and the team moved toward continuous research after launch.`

Add a `tldr` export to `johnDeere.ts` with these fields.

### 3.3 Prologue (`context`) — moved up

**Heading:** `Prologue` eyebrow + H2 `A UX team people liked, but didn’t yet <script>rely on for evidence</script>`

**Lead:** `While this study was running, the JDF UX team surveyed 40 product team members about working with UX (June 28 to July 6, 2021). The answers showed a gap this study could help close.`

**Layout:** two columns ≥ 900px (chart 60%, stickies 40%); stacked below.

**Left — `SurveyBars`** (new, `src/components/casestudy/SurveyBars.tsx`) inside `ChartFigure`.
```tsx
type SurveyBar = { label: string; count: number; highlight?: boolean };
type SurveyBarsProps = { title: string; total: number; rows: SurveyBar[]; circleHighlight?: boolean };
```
- Title: `What benefits have you experienced from UX? (multi-select, 40 respondents)`
- Rows: `Helps me think with a user-centred mindset` 33 · `Helps me plan product development efficiently` 22 · `Helps me plan the roadmap` 19 · **`Helps me make evidence-based decisions` 11 (highlight)**
- Each row: label left, count right (tabular nums), track 14px high `--color-border` background, fill width `count / total * 100%`. Fill `--color-before` normally, `--color-accent-text` when highlighted. Highlighted label bold.
- `circleHighlight`: render `SketchCircle` absolutely around the highlighted row (decorative).
- `ChartFigure` summary: `Of 40 respondents, 33 valued UX for a user-centred mindset but only 11 for evidence-based decisions.` Columns `Benefit`, `Count (of 40)`.
- Caption: `Counts out of 40, drawn to scale. Source: JDF UX Engagement Survey, 2021. Directional only.`

**Right — stickies + note**
- `StickyNote rotate={1.5}`: `**35 of 40** had worked with a UX practitioner, and **27** were very satisfied.`
- `StickyNote rotate={-1}`: `Top asks: **more dedicated UX resources (22)** and **UX coaching (14)**.`
- `HandNote rotate={-1.5}`: `liked for mindset… rarely for evidence. This study had to show the numbers.`

**Keep from old `org`:** move the recommendations table and caveat to Impact (3.12). Remove `org.stats` cards (replaced by bars + stickies).

**Data:** add `prologue` export: `{ lead, survey: { title, total: 40, rows }, stickies: [...], note, caption }`.

**Accessibility:** the chart data table is in `ShowDetails`; sticky text is real text; don't use the circle as the only highlight (label is bold and bar is accent).

### 3.4 01 · The problem (`problem`) — merges Background

**Heading:** `Chapter 01 · The problem` eyebrow + H2 `Experts don’t forgive <script>a pretty slowdown</script>`

**Lead:** `Credit analysts make same-day decisions, sometimes in a 15-minute review, while taking 10 to 20 calls a day. Some had used the desktop ABTools for over 20 years. A post-launch survey alone couldn’t tell real improvement apart from novelty or change aversion.`

**Content, in order**
1. Keep `background.context` stat cards (Same day / 15 min / 10 to 20 / 136 items).
2. `BeforeAfter` with the **Agreement-tab pair** (section 5 images).
   - caption: `Fig. 1. The same Agreement tab, before and after. Real screens, customer data blurred.`
   - before: title `Before · desktop app`, text `Ten tabs and dozens of fields, many never used in underwriting.`
   - after: title `After · web app`, text `Same tab names, fewer fields, grouped into four sections.`
   - Add two `HandNote`s under the images (inside `BeforeAfter` via new optional `beforeNote` / `afterNote` props):
     - before: `“There are 10 tabs in front of me, which one do I need?”`
     - after: `“It is cleaned up, it is easier to find quickly.”`
3. Keep `problem.forces` (Novelty effect / Change aversion / Genuine usability change).
4. Research questions card (H3 `The questions I set out to answer`), ordered list:
   1. `Did usability actually improve across the six dimensions the team cared about?`
   2. `Which dimensions improved most, and which barely moved?`
   3. `Where does friction remain in the daily workflow?`

Remove `background.p1/p2/p3` and `systems` chips unless the text is needed; keep anything that isn’t repeated elsewhere as one short paragraph.

### 3.5 02 · The plan (`design`)

**Heading:** `Chapter 02 · The plan` + H2 `Measure the same people <script>before and after</script>`

**Lead:** `I planned the study with the JDF product team inside our usual discover → define → develop → deliver process. The key choice was timing: capture a baseline before launch, then wait until people had really used the new tool.`

**Content, in order**
1. **Timeline** — keep the existing timeline figure. Add under it: `<HandNote>waiting = fewer “it’s new, I hate it” answers</HandNote>`. Caption: `Fig. 2. Two waves, eight months apart, with a familiarity window in between.`
2. **`ProcessDiagram`** (new) — from `FigProcess.dc.html`.
   - Desktop (≥ 900px): row of Discovery diamond → Delivery diamond → Measure card, with a loop line from Measure back to Discovery labelled `findings feed the backlog and the next round`. Three pinned stickies above: `Wave 1 · Jan 2021 — Baseline on the old desktop tool` (over Discovery), `May–Jun 2021 — New web tool in real daily use` (over Delivery), `Wave 2 · Aug 2021 — Same people, same questions, new tool` (over Measure).
   - Diamonds: `clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%)`; Discovery fill `#e1dcea`, Delivery fill `#dcd0fb` (add as `--color-diamond-1/2`); labels `Discovery / Discover → Define`, `Delivery / Develop → Deliver`; Measure card white with 2.5px `--color-accent-text` border: `Measure / Did it actually work?`.
   - Phone (< 900px): vertical stack: sticky → diamond → arrow down, repeated; loop shown as a final line `↺ findings feed the backlog and the next round`.
   - Structure: build as an `<ol>` of three steps (each step = sticky + shape) so screen readers read it in order. Arrows and loop lines are decorative SVGs (`aria-hidden`).
   - `HandNote`: `baseline = part of discovery · wave 2 = measuring the delivery`.
   - Caption: `Fig. 3. Where the study sat in the UX team’s process. Redrawn from the team’s “Ideal Future State” board.`
3. **SUS sheet image** — `sus-questionnaire.png` in a `Figure`, max-width 760px, white card padding 12px.
   - Caption: `Fig. 4. The SUS sheet as used in both waves, with a comment column beside every rating.`
   - Under it, a short “Session flow” list (from `FigQuestionnaire.dc.html`): `1 Intro, role, years with ABTools, hours a day` · `2 Six JDF dimensions, each rated, then “why?”` · `3 Improvement opportunities, open-ended` · `4 SUS, the 10 items`. Plus `StickyNote`: `Ratings show **how much**. The “why?” after each one shows **what to fix**.`
4. **Instruments** — keep the three mini cards.
5. **Decision cards** — replace the trade-offs `<table>` with six cards (grid: 3 cols ≥ 1100px, 2 cols ≥ 700px, 1 col below). Each card: eyebrow `Decision N`, H3, `**Why:**` line, `**Cost:**` line in secondary text. Use `design.tradeoffs` data (same text). Keep the table inside `ShowDetails summary="Show as a table"` for scanning.

### 3.6 03 · The people (`participants`)

**Heading:** `Chapter 03 · The people` + H2 `Four roles, <script>decades of muscle memory</script>`
**Lead:** `One daily power user per role, from 3.5 to more than 20 years with ABTools.`

- Keep the profile cards and tenure bars.
- Add `DoodleAvatar` at the top of each card (4 tints: lavender, yellow, green, peach — all decorative).
- Card eyebrow `P1`…`P4` before the role. Never show a person’s name. Check `participants.profiles[].name` — it currently holds role words like “Manager”; keep or remove, but no real names.
- **Fix:** the credit admin analyst’s tenure is not in the source deck. Show `Long-time user` and keep the `unverified` hatch style, or fill in the real number.

### 3.7 04 · The workflow (`workflow`)

**Heading:** `Chapter 04 · The workflow` + H2 `Following one credit decision <script>from queue to handoff</script>`
**Lead:** `I mapped what participants told me onto their daily workflow. Most remaining friction clustered around reading history and moving through queues.`

1. Workflow figure: keep the five steps, but render each finding as a `StickyNote size="sm"` (rotate alternating −1 / 1deg). Step 3 (`Read the history`) gets a 2.5px `--color-accent-text` outline and eyebrow `Step 3 · hotspot`. Layout: 5 columns ≥ 1100px, horizontal scroll-free wrap below (flex-wrap, min 180px each).
   - Caption: `Fig. 5. A simplified workflow, left to right, with the friction participants described pinned to each step. Step 3 is the hotspot.`
2. **New:** second `BeforeAfter` for the **Involved Parties pair**.
   - caption: `Fig. 6. Step 1 starts on the Involved Parties tab. Real screens, customer data blurred.`
   - before: `Before · desktop app` / `List and form squeezed side by side.`
   - after: `After · web app` / `One clear table, details open on demand. Customer summary stays visible.`

### 3.8 05 · The numbers (`results`)

**Heading:** `Chapter 05 · The numbers` + H2 `Usability went up. <script>Satisfaction barely moved.</script>`
**Lead:** `SUS rose from below every benchmark to above all of them. Every dimension improved, but by very different amounts. With four people, these are descriptive results, not statistical proof.`

- Keep `BarRow` SUS figure. Wrap in `ChartFigure` with summary `SUS rose from 60.0 to 85.6, passing the Global IT average (63), the FY21 target (67) and the industry average (68). n = 4.` and data columns `Measure`, `Score`.
- Keep `DimensionRow` figure; rows are already sorted by gain. Wrap in `ChartFigure` with summary `All six dimensions improved. System performance gained most (+35.0); satisfaction least (+3.8).` and columns `Dimension`, `Before %`, `After %`, `Change`.
- Legend must show **shape and label** for before/after, not colour alone (e.g. outlined pill “Previous”, filled pill “Current”).
- Add `HandNote` after the dimension chart: `performance was the big win · satisfaction lagged → why? see chapter 06`.
- Keep `results.stories` cards.

### 3.9 06 · What people said (`findings`)

**Heading:** `Chapter 06 · What people said` + H2 `The scores said how much. <script>The words said why.</script>`
**Lead:** `Interviews explained every number. Here is what the same people said before and after.`

1. **Quote pairs** (new `QuotePair` component: two `blockquote`s side by side ≥ 760px; before = dashed border, after = 2px `--color-accent-text` border; eyebrow `Before` / `After`):
   - System performance: `“It will spin and it will close out.”` → `“It hasn’t been down, and it is quicker than old ABTools.”`
   - Ease of use: `“Intimidating and overwhelming.”` → `“They got away from a lot of information we never looked at. It is cleaned up.”`
   - Satisfaction, the one that lagged: `“It is not great, but it is what we have.”` → `“I don’t feel the notes, they are not convenient.”`
2. **`AffinityBoard`** (new) from `FigAffinity.dc.html`.
   - H3 `35 issues, one loud theme`.
   - Five columns, each a `<section>` with H4 `Theme` + count, and a `<ul>` of stickies. Notes column 1.5× wider, white background, 2.5px `--color-accent-text` border, stickies in `#e6ddfd` (add `--color-sticky-accent`); other columns dashed border, yellow stickies.
   - Content (shortened quotes, no names):
     - **Notes · 16**: “It shows us a big chunk, it is hard to read.” · “Make the comments box bigger.” · “View all comments: too much at once.” · “Too small to see.” · “Would be nice to fix a typo in someone else’s comment.” · “The previous ABTools was better with the comments.” · `+ 10 more notes`
     - **Usability · 6**: Zoom doesn’t make Notes text bigger · Overlay only closes with the X · No default comment type · `+ 3 more`
     - **Efficiency · 5**: Search doesn’t find my own name · Lose my place in a 136-item queue · Route-to-bottom became a detour · `+ 2 more`
     - **New features · 5**: Refresh button for new deals · Pin my name to the top · Export queues to Excel · `+ 2 more`
     - **Defects · 3**: “Create new credit request” does nothing · Employee search skips me · Scary “don’t touch” cursor on a loan number I need to copy
   - Layout: 5 columns ≥ 1200px; 2–3 columns with wrap below; 1 column on phones.
   - `HandNote`: `every participant raised Notes without being asked ↑`
   - Caption: `Fig. 7. The synthesis board, redrawn. Quotes shortened, no names.`
3. Keep `ThemeStack` (Fig. 8, `35 issues by theme`). Label stays “Defects” (consistent with the board).
4. Keep `qualitative.more` cards (“Beyond the headline”).
5. **Move** `qualitative.notes` (title, p, mock, gestalt) to section 3.10.

### 3.10 07 · The Notes problem (`notes`) — new

**Heading:** `Chapter 07 · Design deep dive` + H2 `The Notes problem: <script>formatting is information</script>`
**Lead:** `Analysts typed comments with careful spacing so others could scan them quickly. The new tool squeezed every note into one paragraph, in a small box, with text that didn’t grow when they zoomed.`

1. Pull quote (use existing `Blockquote` or a large `blockquote`, 22px): `“The comments are all together. I typed in very well layout with spaces, but it shows us as a big chunk. It is hard to read.”` — cite `Participant, wave 2`.
2. **`NotesMock`** (new) from `FigNotes.dc.html`, replacing the current notes grid.
   - Two panels side by side ≥ 1000px, stacked below.
   - **As shipped** (dashed border): app bar `ABTools · Credit request · Comments`, tabs with Comments active, a 74px-high box with one run-on paragraph (overflow hidden), a “View all comments” button, then a taller run-on box. Chips: `one run-on paragraph` · `fixed 12px text` · `closes only with X`.
   - **Recommended pattern** (2.5px accent border): two comment cards with author role + date label (`Credit analyst · Today, general`, `Processing specialist · Yesterday, bank`), body with preserved line breaks (`white-space: pre-line`, `font-size: 1rem`), a `Show full note` button; a side panel (`Side panel — Open notes next to the application, so analysts can read and compare without losing their place.` + `Close (Esc)` button). Chips: `keeps line breaks` · `rem text scales with zoom` · `expand or side panel` · `Esc or outside click closes`.
   - Use the existing invented mock text from `qualitative.notes.mock` for the run-on paragraph and the formatted card, so all note text is fictional.
   - Label top right: `Illustrative mock · made-up text, not customer data`.
   - `HandNote`: `analysts type spacing on purpose →`
   - Buttons in the mock are **not interactive**: render as `<span>` styled like buttons with `aria-hidden="true"` on the decorative chrome, or put the whole mock in a `role="img"` wrapper with an `aria-label` describing both panels. Pick one; don’t ship fake focusable buttons.
   - Caption: `Fig. 9. Notes as shipped, and the recommended pattern. Illustrative mock with made-up text.`
3. Keep the Gestalt paragraph (`qualitative.notes.gestalt`) under the mock.

### 3.11 08 · The verdict (`decisions`) — dark section

**Heading:** `Chapter 08 · The verdict` + H2 `What the redesign got right, <script>and what it missed</script>`

- Keep two columns. Headers: `Keep · 4` and `Fix · 10`.
- **Fix the data bug:** `rightWrong.wrong` currently has 9 rows and mixes in design-system pattern text (e.g. “Errors give no next step / One error pattern…”, “Search misses users… / List patterns…”). Replace with exactly these 10 rows `[finding, principle]`:
  1. `Notes shown as one block in a small box` · `Proximity · similarity · common region`
  2. `Notes text doesn’t scale with zoom` · `WCAG 1.4.4 Resize text`
  3. `Overlays that close only with X` · `Modes · modal design`
  4. `Error messages with no next step` · `Error recovery`
  5. `Split employee and application queues, lost queue position` · `State persistence`
  6. `Route-to-bottom option removed` · `Workflow regression`
  7. `“Don’t touch” cursor on a loan number people need to copy` · `Affordance · signifiers`
  8. `Buttons that fail silently` · `Visibility of system status`
  9. `No default comment type` · `Sensible defaults`
  10. `FileNet in a separate browser tab` · `Context switching`
- `HandNote` under Keep (light text variant for dark bg; must still meet 4.5:1 — use `#d9cfff` or similar, check contrast): `continuity is a feature for experts`.

### 3.12 09 · Design system (`patterns`)

**Heading:** `Chapter 09 · From findings to patterns` + H2 `Fix it once, <script>in the design system</script>`
**Lead:** `Instead of a list of bugs, I framed the findings as six reusable patterns, so other JDF tools wouldn’t repeat them.`

**`PatternTiles`** (new) from `FigPatterns.dc.html`. Grid 3×2 ≥ 1100px, 2 cols ≥ 700px, 1 col below. Each tile: H3 `N · Name`, then a before (dashed) / after (solid accent) pair with an eyebrow each.

| # | Name | Before | After |
|---|---|---|---|
| 1 | Comment display | Run-on paragraph | Same text with line breaks and dashes |
| 2 | Relative type | `200% zoom: Notes text stays 12px, other UI grows` | `200% zoom: Notes text grows too, everything in rem` |
| 3 | Modal standard | `Only the X closes it. Can’t see the page behind.` | Main area + side panel. `Esc or outside click closes. Compare side by side.` |
| 4 | One error pattern | `Error. Operation failed.` / `No reason, no next step.` | `We couldn’t save this note.` / `The connection dropped.` / [Try again] / `What happened · why · what to do.` |
| 5 | List patterns | `Search: my name → no results` / `Leave and come back: back to the top of 136 items` | chips `Pinned: My worklist` `Refresh` `Export` / `Search includes you, even with 0 items. Your place is kept.` |
| 6 | Clear states | Filled button `Create credit request` / `Looks active, does nothing.` | Disabled-style button / `Disabled look, plus the reason: “Available after the application is saved.”` |

- Label: `Illustrative sketches · dashed = before, solid = after`.
- `HandNote`: `10 bugs in one tool → 6 patterns every JDF tool can reuse`.
- Keep the old findings → pattern table inside `ShowDetails summary="Show findings and patterns as a table"`.
- Sketch “buttons” are not interactive (same rule as 3.10).

### 3.13 10 · Impact (`impact`)

**Heading:** `Chapter 10 · Impact` + H2 `Evidence, <script>not just a launch</script>`

1. Keep the three impact cards. Retitle: `Leadership got proof` · `Notes went to the top` · `Research kept going`. Body (short):
   - `A benchmarked before/after result instead of “users seem to like it”.`
   - `The Notes issue became a high-priority backlog item, with a specific fix: keep formatting, enlarge the box, let text scale with zoom.`
   - `I recommended a feedback loop, behavioural analytics and research before each release.`
2. Move the old `org.rows` recommendations table here inside `ShowDetails summary="See the survey evidence behind each recommendation"`, with `org.caveat` under it.
3. **“Where it led”** (new): H3 `Where it led` + paragraph: `Later, the UX team’s FY24 objective was to “pave the path for Elite Product UX”. Two of its strategic initiatives were defining UX metrics and building research operations. Studies like this one were the kind of evidence those goals asked for.`
4. **`OkrBoard`** (new) from `FigOKR.dc.html`:
   - Objective banner (dark, `--color-text` bg, white text): `Pave the path for Elite Product UX with entry points, growth potential, and high-performing expectations.`
   - Key results (numbered): `Each BCA adds one new UX behaviour` · `5% growth in recognised products that use the Fuel design system` · `Consolidate UX documentation from 19 BCA solutions into 1`
   - Initiatives (2-col grid): Digital Mastery · UX Foundations · **Productivity Gains — Define UX metrics: definition, adoption, governance** · **Research Operations — Repository for research standards, personas, journey maps** · Shift Left · Transformation Portal. The two bold ones get a 2.5px accent border.
   - Optional strip: NN/g’s six stages of UX maturity (no stage highlighted).
   - `HandNote`: `ABTools (2021) was an early example of the metrics + research ops these goals asked for`.
   - Caption: `Fig. 10. UX team OKRs, FY24 Q2, redrawn without names.`
   - **Do not** say the study was designed from these OKRs; they came later.
5. Keep `impact.quote` blockquote if it fits; otherwise drop it.

### 3.14 11 · Looking back (`lessons`)

**Heading:** `Chapter 11 · Looking back` + H2 `What I’d keep, <script>and what I’d add</script>`

Three cards side by side ≥ 1000px:
- **Limitations** — from `limitations.rows` (titles as bullets): four participants, no control group · old tool always rated first · embedded researcher may bias answers · self-reported attitudes, not observed behaviour · one coder.
- **Next time** — from `nextTime` (titles + `when` as eyebrow).
- **What this taught me** (tinted card, `#f4f0ff` / `--color-sticky-accent`) — from `lessons` titles; keep each lesson’s text as a second line.

### 3.15 Pager

Keep `CaseStudyPager` (prev/next from `caseStudyBriefs`).

---

## 4. New and changed components (summary)

| Component | File | Type | Notes |
|---|---|---|---|
| `HandNote`, `StickyNote`, `SketchArrow`, `SketchUnderline`, `SketchCircle`, `DoodleAvatar` | `casestudy/doodles/` | new | §2.3 |
| `SusScoreCard` | `casestudy/SusScoreCard.tsx` | new | §3.0 |
| `SurveyBars` | `casestudy/SurveyBars.tsx` | new | §3.3 |
| `ProcessDiagram` | `casestudy/ProcessDiagram.tsx` | new | §3.5 |
| `QuotePair` | `casestudy/QuotePair.tsx` | new | §3.9 |
| `AffinityBoard` | `casestudy/AffinityBoard.tsx` | new | §3.9 |
| `NotesMock` | `casestudy/NotesMock.tsx` | new | §3.10 |
| `PatternTiles` | `casestudy/PatternTiles.tsx` | new | §3.12 |
| `OkrBoard` | `casestudy/OkrBoard.tsx` | new | §3.13 |
| `BeforeAfter` | existing | change | add optional `beforeNote`, `afterNote` (render `HandNote`), allow per-image `width`/`height` |
| `CaseStudyHero` | existing | change | accept an `aside` slot for `SusScoreCard`; add method chips |

Rules for every new component:
- Data comes from `johnDeere.ts` via props; no hard-coded copy inside components except UI labels.
- CSS modules only; colours from tokens.
- No `onClick` on non-interactive elements; no fake buttons.
- Works at 320px with no horizontal page scroll.

---

## 5. Images

All already in `public/work/john-deere/`, redacted. Use `next/image` with `width`/`height` and `sizes="(min-width: 1100px) 50vw, 100vw"`.

| File | Size | Section | Alt |
|---|---|---|---|
| `abtools-before-agreement.jpg` | 906×696 | 01 before | Previous ABTools desktop app on the Agreement tab: ten tabs across the top and dozens of loan fields packed into three columns. Customer details are blurred. |
| `abtools-after-agreement.png` | 1098×845 | 01 after | Current ABTools web app on the Agreement tab: customer summary at the top, five tabs, and merchant details grouped under a side menu of four sections. Customer details are blurred. |
| `abtools-before-parties.jpg` | 908×699 | 04 before | Previous ABTools desktop app on the Involved Parties tab: a small parties table on the left and a long form of party details on the right. Names, tax ID, address and phone are blurred. |
| `abtools-after-parties.png` | 898×846 | 04 after | Current ABTools web app on the Involved Parties tab: customer summary at the top and a clear table of parties with name, role and CIP status, with paging. Names and IDs are blurred. |
| `sus-questionnaire.png` | 843×674 | 02 | The SUS questionnaire as used in the sessions: ten statements rated from 1, strongly disagree, to 5, strongly agree, with a comment column to understand each rating. |

Cover: `public/assets/covers/john-deere-sus.jpg` and `JohnDeereSusCover.tsx` already exist. Optionally restyle the cover to match `FigCover.dc.html` (old/new screen sketches + 60 → 85.6 card). Not required for this spec.

Old `abtools-before.png` / `abtools-after.png`: delete only after the new page ships.

---

## 6. `src/content/johnDeere.ts` changes

| Export | Change |
|---|---|
| `hero` | new `subtitle` (§3.0); add `chips: string[]` |
| `facts` | Participants wording (§3.1) |
| `tldr` | **new** (§3.2) |
| `overview` | remove or keep one sentence as `tldr.summary` |
| `prologue` | **new** (§3.3) |
| `org` | keep `rows` + `caveat` (used in Impact); remove `stats` |
| `background` | keep `context`; drop paragraphs that repeat the new lead |
| `beforeAfter` | Agreement pair + `beforeNote` / `afterNote` (§3.4) |
| `beforeAfterParties` | **new** (§3.7) |
| `problem` | add `rqs` text from §3.4 if different |
| `design` | add `process` (stickies, labels, loop label, note), `questionnaire` (image, flow, sticky) |
| `participants` | add `pid: "P1".."P4"`, `avatarTint`; fix P2 tenure |
| `workflow` | add `hotspotIndex: 2` |
| `results` | add `note` (hand note), chart summaries |
| `quotes` | **new** — 3 before/after pairs (§3.9) |
| `affinity` | **new** — 5 columns (§3.9) |
| `qualitative.notes` | moved to a new `notesChapter` export with the pull quote, mock labels and chips (§3.10) |
| `rightWrong.wrong` | **replace with the 10 rows in §3.11** |
| `designSystem` | add `tiles` (§3.12) |
| `impact` | new card titles/bodies; add `whereItLed` + `okr` (§3.13) |
| `limitations`, `nextTime`, `lessons` | unchanged data, new layout |

---

## 7. Accessibility checklist (do before merging)

Structure
- [ ] One `<h1>` (hero). Each chapter is `<h2>` via `CaseStudySection`; cards `<h3>`; affinity columns `<h4>`. No skipped levels.
- [ ] TOC labels match section headings closely enough to be understood.
- [ ] Eyebrows (“Chapter 01 · …”) are `<p>`, not headings.

Colour and text
- [ ] All text ≥ 4.5:1 (large ≥ 3:1). Check: accent text on tint sections and on `--color-sticky`; hand notes on dark section; chip text.
- [ ] Before/after differ by shape or label as well as colour (dashed vs solid borders, “Before/After” eyebrows, hollow vs filled marks).
- [ ] Text in `rem`/`px` that scales; page works at 200% zoom and 320px width with no horizontal scroll (rotated stickies included).

Images and figures
- [ ] Every screenshot has the alt text from §5.
- [ ] Charts: `ChartFigure` summary + data table in `ShowDetails`.
- [ ] Diagrams: `ProcessDiagram` is an ordered list; decorative SVGs `aria-hidden="true" focusable="false"`.
- [ ] Mocks (`NotesMock`, `PatternTiles`) contain no focusable fake controls.

Motion
- [ ] No new animation. `BeeTrail` and `CountUp` respect `prefers-reduced-motion` and the site’s motion toggle.

Keyboard
- [ ] Tab order follows reading order; `ShowDetails` toggles with keyboard; focus ring visible (`--focus-ring`).

Automated
- [ ] `npm run lint` clean (jsx-a11y).
- [ ] `npm run test:a11y` passes with no serious/critical issues on `/work/john-deere-sus`.

---

## 8. Content and accuracy rules

- Numbers: SUS 60.0 → 85.6; benchmarks 63 / 67 / 68; n = 4. Dimensions: Performance 62.5 → 97.5 (+35.0), Error support 56.6 → 75.0 (+18.4), Ease 75.0 → 88.7 (+13.7), Learnability 80.0 → 92.5 (+12.5), Productivity 71.2 → 82.5 (+11.3), Satisfaction 71.2 → 75.0 (+3.8).
- Issues: Notes 16, Usability 6, Efficiency 5, New features 5, Defects 3 = 35.
- Survey: June 28 – July 6, 2021; 40 respondents; 35 worked with UX; 27 very satisfied; benefits 33 / 22 / 19 / 11; asks 22 resources / 14 coaching. Directional only.
- Timeline: the survey ran **during** the study; the FY24 OKRs came **after**. Never say the study was based on either.
- People: P1–P4 by role only. No names in quotes, figures or alt text.
- Mocks and sketches use made-up text and say so on the figure.
- Use counts (“16 of 35”), not percentages, for small samples.

---

## 9. Phases and Cursor prompts

**Phase 1 — Tokens, font, doodle kit**
> Do Phase 1 of CASE-STUDY-SPEC.md: add the tokens and Caveat font from §2.2 and build the doodle kit in §2.3. Render each doodle once in a temporary block at the top of the page so I can check them, then remove the block.

Done when: tokens exist; Caveat loads via `next/font`; doodles render; lint passes.

**Phase 2 — Content file**
> Do Phase 2: update `src/content/johnDeere.ts` exactly as §6 says, including the `rightWrong.wrong` fix in §3.11. Don’t change page layout yet. Keep TypeScript types strict.

Done when: build passes; no unused exports; data matches §8.

**Phase 3 — Reorder and existing components**
> Do Phase 3: reorder `page.tsx` to §1.1, apply §1.2 backgrounds, and update existing sections that only need copy/layout changes (§3.1, 3.2, 3.4, 3.6, 3.8, 3.11, 3.14). Update `BeforeAfter` and `CaseStudyHero` as in §4. Wire the five images from §5.

Done when: TOC matches §1.1; images load with no layout shift.

**Phase 4 — New figures, part 1**
> Do Phase 4: build `SusScoreCard`, `SurveyBars`, `ProcessDiagram`, `QuotePair` and place them per §3.0, §3.3, §3.5, §3.9.

**Phase 5 — New figures, part 2**
> Do Phase 5: build `AffinityBoard`, `NotesMock`, `PatternTiles`, `OkrBoard` and place them per §3.9, §3.10, §3.12, §3.13.

Done when (4 and 5): each figure matches its `Fig*.dc.html` at 1440px and stacks cleanly at 390px.

**Phase 6 — Accessibility and QA**
> Do Phase 6: run the checklist in §7, fix every failure, run `npm run lint` and `npm run test:a11y`, and give me a short report of what you checked and changed.

Final check by you: read the page top to bottom on desktop and phone; confirm the story in §1 comes through, and that nothing in §8 was changed.
