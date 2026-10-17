# Team Contract — Making Program Metrics Defensible

**John Deere · Manufacturing / Product Development Platform**
Role: UX Research & Product Design · Design system: Fuel (John Deere enterprise DS)

---

## Summary

Team Contract is the internal application John Deere program managers use to record and report the metrics a product development program is accountable for — cost, schedule, quality, reliability, and risk — across six PDP phases.

It was being used, but not trusted. Program managers described it as *"a tedious data entry tool"* that produced a static snapshot with no history and no explanation of where numbers came from. The most telling workaround: PMs were **screenshotting the tool and pasting it into PowerPoint** because the tool itself couldn't produce something they were willing to show leadership.

I ran the research that reframed the problem — from "add more features" to "make the numbers defensible" — and designed the changes that followed.

![Team Contract — final program overview](./assets/01-hero-team-contract-overview.png)

---

## The Problem

Team Contract sat at the centre of program reporting but generated friction at both ends of its own workflow.

**Entering data was expensive.** Metrics were numerous, validation was aggressive and unclear, and much of the input was manual. One participant described chasing colleagues for numbers: *"Tedious to go and ask people to add data."*

**The output wasn't usable.** What came out was a point-in-time snapshot — no trends, no change history, no context for why a number looked the way it did. A red metric on a dashboard, with no history and no provenance, is not a conversation a PM can win.

> *"Difficulty in explaining red metrics to senior leadership without context."*
> — Brian Mahoney / Aaron Phelps / Keith Schrader session

> *"Program managers don't know how calculations are done or where they come from."*

The consequence: effort went in, but the artefact leadership actually saw was a screenshot in a slide deck. The tool was doing the work and getting none of the credit — and PMs carried the risk.

> *"Program manager takes blame for issues."*

---

## Research

**Method:** 5 semi-structured interview sessions with 9 participants across the roles that touch a team contract — Product Owner, Program Managers, and engineering/corporate stakeholders. Sessions were recorded, transcribed, and synthesised on a shared FigJam board.

**Participants**

| Session | Participants | Role perspective |
|---|---|---|
| 1 | David Dean | Product Owner |
| 2 | Brad Friest | Program Manager |
| 3 | Bryan Anfinsion | Program Manager (6–8 yrs using TC) |
| 4 | Jan Barendt, Alexander Leuchs, Karl Hoffmann | Engineering / corporate monitoring |
| 5 | Brian Mahoney, Aaron Phelps, Keith Schrader | Program management group |

![Research board — 5 interview sessions](./assets/02-research-board-sessions.png)

**Synthesis:** ~230 observations were affinity-mapped into four lenses — **Current Status** (what the tool does today), **Confusion** (where understanding breaks), **Reaction** (how users feel about it), and **Improvement** (what they ask for) — then reduced to a prioritised set of actionable items.

![Affinity mapping — Confusion, Reaction, Improvement, Current Status](./assets/03-affinity-clusters.png)

Splitting *Confusion* from *Reaction* mattered. Confusion pointed at interface and information problems I could design against. Reaction pointed at a credibility problem — users disliked the tool not because it was hard, but because the effort didn't come back to them as value. Those needed different responses.

---

## What We Learned

### 1. The tool captured state, not change

The single most repeated gap. Team Contract showed where a metric stood, never how it got there.

> *"Static view, snapshot of current status."*
> *"No historical data."*
> *"Difficulty tracking value changes."*
> *"Missing historical context."*

Without history, a metric turning red is an accusation rather than information. Participants asked repeatedly for trends, change history, and — notably — the *reason* a value changed, not just the value.

> *"Desire for change comments feature."*

### 2. Validation obstructed instead of guiding

Validation was experienced as an obstacle course: errors surfaced late, were hard to locate, and were written in language that didn't explain the fix.

> *"Validations causing errors when saving."*
> *"Challenges in finding validation problems in Team Contract."*
> *"Confusion in error message interpretation."*
> *"Too many validations."*

### 3. Users didn't know what a field wanted

Metric definitions were inconsistent across the organisation, so the same field was filled differently by different teams — which quietly undermined every roll-up report built on top of it.

> *"What is meant by upper & lower bounds, and what data should be added there."*
> — Brad Friest

> *"Need for better metric definitions."*
> *"Metrics without context create confusion."*

### 4. One structure didn't fit every program

Programs differ by product line, scale, and season. A fixed metric set forced irrelevant fields on some programs and omitted what others needed.

> *"Not a one tool fits all."*
> *"Inflexible team contract structure."*
> *"Customizable metric selection for specific programs."*
> *"Effort for entering data might not benefit all programs equally."*

### 5. The workarounds told us what was missing

Where a tool fails, people build around it — and the workaround is a specification.

| Workaround observed | What it revealed |
|---|---|
| Screenshotting TC into presentations | Reporting output wasn't presentation-ready |
| Parallel tracking in Power BI, Tableau, spreadsheets, SharePoint | Visualisation and flexibility gaps |
| Manually chasing colleagues for updates | No nudge or reminder mechanism |
| Separate personal scorecards | Metric set didn't match real accountability |

---

## From Findings to Design Decisions

Each design move traces to a specific finding rather than a feature request.

| Finding | Design response | Rationale |
|---|---|---|
| No history; can't explain a red metric | Historical tracking + **change-reason capture** | A value change is only defensible with its justification attached. Capturing *why* at the moment of edit is what makes the later conversation survivable. |
| Validation blocks and confuses | Inline, contextual validation with plain-language messages and direct links to the offending field | Move error handling from save-time gate to in-context guidance |
| Users unsure what a field wants | Field-level definitions and guidance surfaced at point of entry | Standardises input, which protects every downstream roll-up |
| One structure doesn't fit all programs | Configurable metric selection; toggleable metrics per program | Relevance is what makes the effort feel worth it |
| Snapshot output isn't presentable | Improved reporting and data visualisation; export that isn't a screenshot | Replace the workaround rather than tolerate it |
| Chasing people for updates | Reminder / "poke" mechanism | Removes the manual social overhead PMs were absorbing |
| Parallel tracking in other tools | Import/export and integration paths | Meet users where their data already lives |
| Red/yellow/green found genuinely useful | Kept and extended the indicator system | One of the few things users volunteered as working — preserve it |

![Design decisions traced to research findings](./assets/04-findings-to-decisions.png)

---

## The Design

### Program overview — from data dump to program health

The overview was rebuilt around a modular card system: each block of program information is self-contained and rearrangeable, so a program manager can foreground what their program is actually judged on.

> *"One-stop shop for program health overview."*

![Program overview — modular cards](./assets/05-program-overview-modular-cards.png)

Status indicators were retained and strengthened — the red/yellow/green language was the one element participants consistently reported as useful.

![Status indicators and metric cards](./assets/06-status-indicators.png)

### Metric entry — guidance at the point of decision

Entry screens carry definitions and expected-value guidance inline, so the question *"what goes in this field?"* is answered where it's asked rather than in a separate document.

![Metric entry with inline guidance](./assets/07-metric-entry-guidance.png)

### Validation — corrective, not obstructive

Errors are surfaced in context with plain-language explanation and a path to the specific field, replacing the save-time failure that participants found hardest to resolve.

![Validation states](./assets/08-validation-states.png)

### History and change reasons — the defensibility layer

The change most directly tied to the core finding: metric history alongside the reason recorded at the time of change. This is what converts a red metric from an accusation into an explainable position.

![Historical tracking and change reasons](./assets/09-history-change-reasons.png)

### Reporting — replacing the screenshot

Reporting output was reworked so the artefact leaving the tool is the artefact shown to leadership.

![Reporting and data visualisation](./assets/10-reporting-visualisation.png)

---

## Working in the Fuel Design System

The work was built in **Fuel**, John Deere's enterprise design system. I composed screens from existing Fuel Kernel components — navigation, tables, form fields, buttons, status indicators — and extended new variants where the domain required patterns Fuel didn't yet cover, keeping token, state, and interaction conventions consistent so they read as native Fuel rather than bolted on.

Extended components were documented with full state coverage (default, focus, filled, error, disabled) and delivered as developer-ready specs.

![Fuel components and extended variants](./assets/11-fuel-components-variants.png)

---

## Reflection

**Research reframed the brief.** The work arrived as a list of feature requests. The interviews showed the requests shared one root: users couldn't explain their own numbers. Solving for explainability addressed most of the list at once — and made it clear which requests could wait.

**Workarounds were the most useful data.** The PowerPoint screenshot was worth more than any feature request, because it showed precisely where the tool stopped being trusted, and what "good" looked like to the user.

**Separating confusion from reaction changed what I designed.** Confusion was an interface problem. Reaction was a value problem. Only fixing the first would have produced a clearer tool that people still resented filling in.

---

## Credits

Research, synthesis, and design — Shweta Sharma
Product Owner — David Dean
Program Management participants — Brad Friest, Bryan Anfinsion, Brian Mahoney, Aaron Phelps, Keith Schrader
Engineering / corporate stakeholders — Jan Barendt, Alexander Leuchs, Karl Hoffmann

*Participant names appear as recorded on the internal research board. Confirm with John Deere before publishing externally — see Publishing Notes.*
