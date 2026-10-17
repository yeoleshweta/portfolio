---
title: "Fuel Design System — Building at Scale Inside John Deere's Enterprise Design System"
meta-description: "How I worked within Fuel, John Deere's enterprise design system — assembling 100+ screens from shared components, contributing to tokens and documentation, and building components to keep a complex B2B platform consistent."
slug: fuel-design-system
category: Design Systems
ref: John-Deere · fig. 12
role: UI/UX Designer
system: Fuel (John Deere)
tools: Figma
duration: "[dates]"
doc: portfolio/work
version: 2026.1
status: protected
access: password
metrics:
  - label: screens on one system
    value: 100+
  - label: product teams aligned
    value: 6+
  - label: time to specification
    value: −25%
hero_subtitle: "Working within a component-based design system to keep a sprawling B2B manufacturing-planning platform consistent — where I assembled screens, contributed to tokens and documentation, and built and extended components."
---

<!--
════════════════════════════════════════════════════════════════════
IMPLEMENTATION INSTRUCTIONS — read before publishing, then delete
════════════════════════════════════════════════════════════════════

1) ASSETS
   Copy the entire assets/fuel/ folder into your Next.js /public directory:
     public/assets/fuel/  →  spec-01…spec-13 sections, screens, tokens,
                             fuel-component-anatomy.html + .gif
   All image paths below assume /assets/fuel/… — adjust if your setup differs.

2) PASSWORD-PROTECT THIS ROUTE (choose ONE)

   Option A — Vercel Deployment Protection (simplest, no code)
     Vercel dashboard → Project → Settings → Deployment Protection →
     Password Protection. NOTE: this locks the WHOLE site, not one page.
     Fine if you want the entire portfolio gated; skip if only this page.

   Option B — Next.js middleware for this route only (recommended)
     Create middleware.ts at your project root:

       import { NextResponse } from 'next/server'
       import type { NextRequest } from 'next/server'

       export function middleware(req: NextRequest) {
         const auth = req.cookies.get('fuel_access')?.value
         if (auth === process.env.FUEL_PAGE_KEY) return NextResponse.next()
         const url = req.nextUrl.clone()
         url.pathname = '/work/fuel-design-system/unlock'
         return NextResponse.redirect(url)
       }
       export const config = { matcher: '/work/fuel-design-system' }

     Then add a small /work/fuel-design-system/unlock page with a
     password form that POSTs to an API route which sets the
     fuel_access cookie when the entered phrase matches
     process.env.FUEL_PAGE_KEY (set the key in .env.local and in
     Vercel env vars). This keeps the phrase server-side — real
     protection, unlike a client-side gate.

   Option C — quick client gate (weakest; casual protection only)
     Reuse the gate pattern from fuel_design_system_case_study.html.
     Anyone can bypass via view-source; do NOT rely on it for NDA data.

3) THE INTERACTIVE COMPONENT-ANATOMY EMBED
   The <iframe> below points at /assets/fuel/fuel-component-anatomy.html.
   If your markdown renderer strips iframes, either allow raw HTML in
   your MDX config, or swap in the GIF fallback line provided beside it.

4) HOMEPAGE INDEX CARD (add to your featured-work list)
     12 · Design Systems · Fuel Design System — Building at Scale
     Inside John Deere · 100+_screens · 6+_teams · −25%_time_to_spec
     → /work/fuel-design-system

5) NDA REMINDER
   These are real John Deere screens. Confirm clearance before this
   page goes live, even gated. Blur data values if uncertain.
════════════════════════════════════════════════════════════════════
-->

# Fuel Design System — Building at Scale Inside John Deere's Enterprise Design System

> **Working within Fuel, John Deere's enterprise design system**, to keep a data-dense B2B manufacturing-planning platform consistent across 100+ screens and 6+ product teams — assembling screens from the shared library, contributing to tokens and documentation, and building and extending components where the product needed them.

`role: UI/UX Designer` · `system: Fuel (John Deere)` · `tools: Figma` · `focus: components · tokens · handoff`

---

## 01 — overview

John Deere's manufacturing organization runs a large internal platform for program planning, scheduling, and release management — the tool teams use to create programs, map production tools, track phase health, and compare releases. It is exactly the kind of data-dense B2B product where visual and behavioral consistency is hard to hold across dozens of complex screens.

That consistency came from **Fuel**, John Deere's enterprise design system. My work lived inside Fuel: I assembled product screens from its shared library, built and extended components where the product needed patterns the library didn't yet cover, and contributed back to its tokens and documentation so those additions stayed part of the system rather than drifting from it.

> **My contribution, precisely.** I was not the original author of Fuel. I worked within it as a practitioner — assembling screens from existing components, building and extending several components, and contributing to tokens and documentation.

---

## 02 — the challenge

The platform spans create-flows (Program, Project, System), dashboards, health cards, comparison views, reports, and modals — well over a hundred screens, each dense with tables, forms, status indicators, and charts. Without a shared system, three failure modes appear fast:

- **Visual drift** — every team styles buttons, tables, and forms slightly differently, and the product stops feeling like one tool.
- **Redesign debt** — new features get designed from scratch instead of composed, multiplying work and inconsistency.
- **Slow, ambiguous handoff** — without documented components and specs, engineering re-interprets the same patterns repeatedly.

The job inside Fuel was to make the right pattern the easy pattern — so a new screen was an act of assembly, not invention.

---

## 03 — the foundation, section by section

Fuel is specified at the foundational level — color, type, and a component library with defined states and redlined measurements for developer handoff. Below is the full system specification as applied to this platform, shown at scale.

### foundations

![Fuel color palette — brand greens, construction yellow, semantic messaging colors, neutrals](/assets/fuel/spec-01-colors.jpg)
*Color — the brand and semantic palette that the token layer names and every component inherits.*

![Fuel type ramp — Source Sans Pro from H1 72px bold through small 14px](/assets/fuel/spec-02-typography.jpg)
*Typography — one family, Source Sans Pro, in a documented ramp. Every text style in the product maps to one of these levels.*

### core controls

![Fuel buttons — primary, secondary, and value with active and disabled states, redlined at 158×48](/assets/fuel/spec-03-buttons.jpg)
*Buttons — three types, each with states, each redlined. The 158×48 primary is the exact component rebuilt in the interactive below.*

![Fuel tabs — active and inactive states with redlined widths](/assets/fuel/spec-04-tabs.jpg)
*Tabs — active/inactive states with specified dimensions.*

![Fuel form fields — label, filled, success, error states, dropdowns and date picker inputs](/assets/fuel/spec-05-forms.jpg)
*Forms — inputs specified across every validation state, so error and success behavior is inherited, never improvised.*

![Fuel selection controls — checkboxes and radio buttons in default, checked, selected, disabled states](/assets/fuel/spec-06-selection.jpg)
*Selection — checkboxes and radios with their full state matrix.*

### feedback & navigation

![Fuel notifications — error, success, and notification message components](/assets/fuel/spec-07-notifications.jpg)
*Notifications — the messaging tokens (error / success / info) expressed as dismissible components.*

![Fuel breadcrumb navigation component](/assets/fuel/spec-08-breadcrumb.jpg)
*Breadcrumb — wayfinding for a deep, multi-level tool.*

### composed components

![Fuel launchpad card with image and title, redlined](/assets/fuel/spec-09-launchpad.jpg)
*Launchpad card — a first composed component: frame, image, type styles, dimensions.*

![Fuel dashboard cards — daily delivery table card, KPI cards, sequence details](/assets/fuel/spec-10a-dashboard-cards.jpg)
![Fuel dashboard cards continued — order response time, delivery performance chart, linearity cards, reports table](/assets/fuel/spec-10b-dashboard-cards.jpg)
*Dashboard cards — the workhorse family: KPI cards, tabbed metric cards, chart cards, report tables. Each is a composition of the primitives above — which is the entire point.*

### data & inputs

![Fuel graph components — bar chart variants in brand colors](/assets/fuel/spec-11-graphs.jpg)
*Graphs — chart components in the system palette, so data-viz stays on-brand without per-screen styling.*

![Fuel table component with header and row styles](/assets/fuel/spec-12-table.jpg)
*Table — the single most reused component in a data-dense product.*

![Fuel date picker component with selected-day state](/assets/fuel/spec-13-datepicker.jpg)
*Date picker — calendar input with selection states in the brand green.*

> **Why redlines matter.** Each component carries pixel dimensions and every state (default, active, disabled, error, success). That is what makes a component *developer-ready* — the spec, not just the picture, is the deliverable.

---

## 04 — working at the token layer

Beneath the visible components sits a tokenized color system — semantic names mapped to values, so a status color is defined once and inherited everywhere. I contributed to this layer: mapping process and status colors to Fuel's messaging tokens (success, info, warning, error) so state was expressed consistently across dashboards, health cards, and comparison views rather than hand-picked per screen.

![Sub-process color tokens mapped to Fuel messaging color names](/assets/fuel/tokens-colours.jpg)

Tokens turn a visual decision into a systemic one. When "warning" is a token rather than a hex value copied into forty screens, changing it is one edit — and every screen stays correct.

> **My part:** mapping sub-process and status colors to semantic tokens, and documenting the mapping so other designers applied state colors the same way.

---

## 05 — component anatomy, interactive

How does a Fuel component actually get built? The interactive below reconstructs the workflow in Figma's own visual language — watch a button go from **variables → frame → auto layout → token binding → variants → composition → screens**, using Fuel's real values: the 158×48 redline, Source Sans Pro, and `fuel-color-background-action-primary`.

<iframe src="/assets/fuel/fuel-component-anatomy.html"
        width="100%" height="640"
        style="border:1px solid #E1E8E3; border-radius:12px;"
        title="How a Fuel component is built — from variables to screens"
        loading="lazy"></iframe>

<!-- If your renderer strips iframes, use the GIF fallback instead:
![How a Fuel component is built — from variables to screens](/assets/fuel/fuel-component-anatomy.gif)
-->

*Interactive walkthrough — press play, or step through the seven stages. Built to illustrate the component workflow; the key beat is stage 4, where the fill stops being a hex value and becomes a bound variable.*

---

## 06 — building within the system

Every product screen below is composed from Fuel components — cards, tables, tabs, forms, status chips, buttons, breadcrumbs. The value of the system shows in how different these screens are in function yet how consistent they are in execution.

![Program dashboard built from Fuel cards, status indicators, and tables](/assets/fuel/screen-dashboard.jpg)
*Program dashboard — health cards, status indicators (the messaging tokens in action), linked data tables, and toolbar actions, all composed from library components.*

![Create Project flow built from Fuel forms, dropdowns, tabs, and buttons](/assets/fuel/screen-createproject.jpg)
*Create Project flow — a dense multi-section form assembled entirely from Fuel form fields, dropdowns, section cards, side navigation, and primary/secondary buttons.*

![Reports and metrics view with Fuel tables, trend graphs, and icon set](/assets/fuel/screen-reports.jpg)
*Reports & metrics — the Fuel table, trend-graph components, and 24px icon set composed into a VP-level metrics view.*

![Release comparison view built from repeated Fuel table and form components](/assets/fuel/screen-compare.jpg)
*Release comparison — one of the most complex screens in the product, built by repeating the same Fuel table, form, and status components in a side-by-side structure. Complexity handled through composition, not new UI.*

> **My part across these:** assembling the screens from existing components, and building or extending several components where the product needed patterns Fuel didn't yet cover — then bringing those additions back into the library with documentation so they became reusable, not one-offs.

---

## 07 — impact

| metric | outcome |
|---|---|
| **100+** | screens held to one consistent system |
| **6+** | product teams aligned on shared components |
| **−25%** | time to specification via developer-ready components |

- **Consistency at scale** — dashboards, create-flows, reports, and comparisons all read as one product because they share components and tokens.
- **Faster handoff** — redlined, documented components let engineering implement without re-interpreting each pattern.
- **Less redesign debt** — new screens were composed from the library; additions were contributed back rather than left as one-offs.

---

## 08 — reflection

Design-system work is a discipline of restraint. The instinct as a designer is to make each screen its best self; the systems mindset is to make each screen *consistent*, and to invest the creativity into the components and tokens that every screen inherits. The leverage isn't in the screen — it's in the library.

I also learned that contributing *back* is what separates using a system from strengthening one. Building a component the product needed, then documenting it and returning it to Fuel so the next designer composes with it, is how a system stays alive instead of fragmenting. That governance instinct — build within constraints, extend deliberately, document always — is what I bring to an enterprise systems team.

---

*Fuel Design System · John Deere — confidential work shared under access control. Prepared as a portfolio case study.*
