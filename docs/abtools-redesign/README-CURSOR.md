# ABTools case study redesign — instructions for Cursor

Page: `/work/john-deere-sus`
Goal: turn the current 13-section page into a long-form story with real screens, doodle figures, and the same portfolio theme. Target WCAG 2.2 AA.

This folder holds everything Cursor needs:

| Path | What it is |
| --- | --- |
| `docs/abtools-redesign/README-CURSOR.md` | This brief |
| `docs/abtools-redesign/design/Main.dc.html` | The full redesigned page as static HTML. **Reference for structure, copy and layout only.** Do not copy its CSS colours or fonts; use the repo tokens (see "Theme") |
| `docs/abtools-redesign/design/Fig*.dc.html` | One file per figure (16:10 boards). Rebuild each as a React component, not as an image |
| `docs/abtools-redesign/design/Assets.dc.html` | Shot list: which visual goes where |
| `public/work/john-deere/*.{jpg,png}` | Five real screenshots, already redacted (customer data blurred) |

The `.dc.html` files are from a design canvas. Ignore `<x-dc>`, `<helmet>`, `support.js` and the `<script type="text/x-dc">` block; read only the markup inside.

---

## How to run this in Cursor

Paste this as the first prompt, with this file attached:

> Read `docs/abtools-redesign/README-CURSOR.md` and `docs/abtools-redesign/design/Main.dc.html`. Then read `src/app/work/john-deere-sus/page.tsx`, `src/app/work/john-deere-sus/johnDeere.module.css`, `src/content/johnDeere.ts` and the components in `src/components/casestudy/`. Tell me which existing components you will reuse for each chapter in the brief's "Section map", and which new components you will create. Do not change code yet.

Then run one phase per prompt: "Do Phase 1 from the brief." Commit after each phase.

---

## Theme (use these, not the hex values in the design files)

The design files approximate the site. In code, always use the tokens in `src/app/globals.css`:

| Design file used | Use in code |
| --- | --- |
| `#F3F2F5` page background | `var(--color-bg)` |
| `#FFFFFF` cards | `var(--color-surface)` |
| `#141218` text | `var(--color-text)` |
| `#57525F` secondary text | `var(--color-text-secondary)` |
| `#5B3FBF` lavender for text, lines, filled marks | `var(--color-accent-text)` |
| `#A78BFA` lavender for decoration only | `var(--color-accent)` (never for text) |
| `#DCD6E6` borders | `var(--color-border)` |
| Hanken Grotesk headings | `var(--font-display)` |
| Instrument Serif italic accent words | `var(--font-script)` with `var(--color-lilac)` |
| JetBrains Mono eyebrows | JetBrains Mono (already loaded) |
| Caveat handwritten notes | **New.** Add Caveat 700 via `next/font/google`, expose as `--font-hand`. Use only for margin notes, at 22px or larger, colour `var(--color-accent-text)` |
| Sticky-note yellow `#FFF3B8` | **New token** `--color-sticky: #fff3b8`, text on it stays `var(--color-text)` |

Keep the existing `BeeTrail` doodles. The handwritten notes, sketch arrows and sticky notes add to them; they don't replace them.

---

## Section map (old → new)

The new order follows a story: why it mattered → plan → people → evidence → the big finding → what changed.

| New chapter | Title in design | From current section | What changes |
| --- | --- | --- | --- |
| Hero | When did ‘better’ actually mean better? | Hero + stats strip | Add the SUS doodle card (60 → 85.6 with sketch arrow and underline) beside the title. Keep `CountUp` stats below |
| TL;DR | The short version | Overview | Use `TldrCard`: Problem · My role · What changed · Decision it informed, plus Team · Participants · Timeline |
| Prologue | A UX team people liked, but didn’t yet rely on for evidence | `context` (09) | **Move to the top.** Survey bars (33 / 22 / 19 / 11 of 40) with the 11 bar in accent, plus two sticky notes. Build from `FigSurvey.dc.html` |
| 01 | Experts don’t forgive a pretty slowdown | `background` + `problem` | Swap `beforeAfter` images to the Agreement-tab pair (below). Keep the three research questions |
| 02 | Measure the same people before and after | `design` | Timeline (exists) + new **process diagram** (`FigProcess`) + **real SUS sheet image** + six decision cards (decision / why / cost) |
| 03 | Four roles, decades of muscle memory | `participants` | Keep data. Use P1–P4 and doodle avatars; no names |
| 04 | Following one credit decision from queue to handoff | `workflow` | Keep the five steps, show findings as sticky notes, mark step 3 as the hotspot. Add the **Involved Parties before/after** pair below |
| 05 | Usability went up. Satisfaction barely moved. | `results` | Keep `BarRow` and `DimensionRow`. Sort dimensions by gain. Add a data table in `ShowDetails` |
| 06 | The scores said how much. The words said why. | `findings` | Before/after quote pairs for 3 dimensions, then the **affinity board** (`FigAffinity`), then `ThemeStack` |
| 07 | The Notes problem: formatting is information | New, from `findings` | **New chapter.** Pull quote + Notes before/after mock (`FigNotes`) |
| 08 | What the redesign got right, and what it missed | `decisions` | Keep (4) / Fix (10) two columns |
| 09 | Fix it once, in the design system | `patterns` | Six pattern tiles, each a small before/after sketch (`FigPatterns`) |
| 10 | Evidence, not just a launch | `impact` | Three impact cards + new **“Where it led”** block with the OKR figure (`FigOKR`) |
| 11 | What I’d keep, and what I’d add | `limitations` + `next` + `lessons` | Merge into three cards side by side |

Update the `sections` array in `page.tsx` to match, so the table of contents follows the new order.

---

## Images to wire in

All five are already redacted. Use `next/image` with explicit width and height and the alt text below.

| File | Size | Where | Alt text |
| --- | --- | --- | --- |
| `abtools-before-agreement.jpg` | 906×696 | Ch 01 before | Previous ABTools desktop app on the Agreement tab: ten tabs across the top and dozens of loan fields packed into three columns. Customer details are blurred. |
| `abtools-after-agreement.png` | 1098×845 | Ch 01 after | Current ABTools web app on the Agreement tab: customer summary at the top, five tabs, and merchant details grouped under a side menu of four sections. Customer details are blurred. |
| `abtools-before-parties.jpg` | 908×699 | Ch 04 before | Previous ABTools desktop app on the Involved Parties tab: a small parties table on the left and a long form of party details on the right. Names, tax ID, address and phone are blurred. |
| `abtools-after-parties.png` | 898×846 | Ch 04 after | Current ABTools web app on the Involved Parties tab: customer summary at the top and a clear table of parties with name, role and CIP status, with paging. Names and IDs are blurred. |
| `sus-questionnaire.png` | 843×674 | Ch 02 | The SUS questionnaire as used in the sessions: ten statements rated from 1, strongly disagree, to 5, strongly agree, with a comment column to understand each rating. |

In `src/content/johnDeere.ts`, change `beforeAfter.before.img` / `after.img` to the Agreement pair, and add a second object `beforeAfterParties` for the Involved Parties pair. Reuse the existing `BeforeAfter` component for both.

The old `abtools-before.png` / `abtools-after.png` can stay in the repo until the new page ships.

---

## New components

Create these in `src/components/casestudy/`, each with a CSS module. Build them from the matching `Fig*.dc.html`. All text must be real text, not an image.

| Component | Source | Notes |
| --- | --- | --- |
| `HandNote` | handwritten notes everywhere | `<p>` with `--font-hand`, optional `rotate` prop (−3° to 3°). Real text, never `aria-hidden` |
| `StickyNote` | stickies everywhere | `<div>` with `--color-sticky`, slight rotation, small shadow |
| `SketchArrow`, `SketchUnderline` | hero, timeline | Inline SVG, `aria-hidden="true"`, `focusable="false"` |
| `SurveyBars` | `FigSurvey` | Bars as `<div>`s with widths = count / 40. Each row shows label and count as text |
| `ProcessDiagram` | `FigProcess` | Discovery and Delivery diamonds (CSS `clip-path`), Measure card, loop arrow, three pinned stickies. On phones, stack vertically. Give the wrapper `role="img"` and an `aria-label` summarising it, or render it as an ordered list for screen readers |
| `AffinityBoard` | `FigAffinity` | Five theme columns as a `<ul>` per column; Notes column wider and outlined in accent |
| `NotesMock` | `FigNotes` | Two panels: “As shipped” and “Recommended pattern”. Label as “Illustrative mock · made-up text”. Text in `rem` |
| `PatternTiles` | `FigPatterns` | 3×2 grid on desktop, 1 column on phones |
| `OkrBoard` | `FigOKR` | Objective banner, 3 key results, 6 initiative tiles (2 highlighted). No people’s names |
| `SusScoreCard` | hero card in `Main.dc.html` | 60 → 85.6 with `SketchArrow` and `SketchUnderline` |

---

## Phases

**Phase 1 — Theme and primitives**
Add Caveat via `next/font`, `--font-hand` and `--color-sticky` tokens, then `HandNote`, `StickyNote`, `SketchArrow`, `SketchUnderline`.
Done when: they render on a test section; `npm run lint` passes.

**Phase 2 — Reorder and rewrite content**
Reorder `page.tsx` to the section map. Move content into `johnDeere.ts` (Prologue, Notes chapter, decision cards, before/after quotes). Copy wording from `Main.dc.html`.
Done when: TOC matches the new order; no copy lost from the old page unless the brief says so.

**Phase 3 — Real images**
Wire the five images (table above). Add `beforeAfterParties` and render it in Ch 04.
Done when: images load with width/height set, no layout shift, alt text matches.

**Phase 4 — Figures**
Build `SurveyBars`, `ProcessDiagram`, `AffinityBoard`, `NotesMock`, `PatternTiles`, `OkrBoard`, `SusScoreCard`.
Done when: each matches its `Fig*.dc.html` at 1440px and stacks cleanly at 390px.

**Phase 5 — Accessibility and QA**
Run the checks below, `npm run test:a11y`, and Lighthouse on the page.

---

## Accessibility checks (WCAG 2.2 AA)

- One `<h1>`; chapters are `<h2>`, cards `<h3>`.
- Text contrast ≥ 4.5:1; check `--color-accent-text` on `--color-bg` and on `--color-sticky`. `--color-accent` is decoration only.
- Charts: keep the `role="img"` + `aria-label` summaries, and a data table in `ShowDetails` for the dimension chart.
- Before/after is shown by shape and label (hollow vs filled, “Before” / “After”), not colour alone.
- All decorative SVGs (`BeeTrail`, arrows, underlines, avatars) `aria-hidden="true"`.
- Rotated stickies and notes stay readable at 200% zoom and at 320px width, with no horizontal scroll.
- Respect `prefers-reduced-motion` and the site’s motion toggle: no rotation animation, `BeeTrail` static.
- Links and buttons ≥ 24×24px.

---

## Content rules (do not change these facts)

- SUS 60.0 → 85.6; benchmarks Global IT 63, FY21 target 67, industry 68. n = 4.
- Dimensions (before → after): Performance 62.5 → 97.5; Error support 56.6 → 75.0; Ease 75.0 → 88.7; Learnability 80.0 → 92.5; Productivity 71.2 → 82.5; Satisfaction 71.2 → 75.0.
- Issues: Notes 16, Usability 6, Efficiency 5, New features 5, Not working 3 (35 total).
- Survey: June 28 – July 6, 2021, 40 respondents. 35 worked with UX, 27 very satisfied; benefits 33 / 22 / 19 / 11; asks: resources 22, coaching 14.
- The survey ran **during** the study, and the FY24 OKRs came **after** it. Don’t write that the study was based on either.
- Participants are P1–P4 by role only. Quotes have no names.
- The Notes mock and pattern sketches use made-up text and must say so.
