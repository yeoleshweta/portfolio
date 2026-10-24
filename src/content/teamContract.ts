/* All copy for /work/team-contract lives here, not in components.
   Source: "John Deere — Team Contract Redesign.pdf" (the design the page follows).
   - Figures are the ones the PDF shows. Anything the PDF marks as illustrative,
     test data or a proposal stays labelled that way.
   - Participants are P1 to P9 only. No names. */

export const hero = {
  tags: ["UX research", "Product design", "Fuel design system", "Accessibility"],
  titleLead: "Team Contract:",
  titleAccent: "making",
  titleRest: "program",
  titleLast: "metrics defensible",
  lead:
    "John Deere’s program-health tool was mandatory, monthly and widely resented. Nine people across five sessions showed why. Five design options, built from Fuel, turned that into a feature set the team validated.",
  meta: [
    { label: "Organisation", value: "John Deere · PDP" },
    { label: "Role", value: "UX Research & Product Design" },
    { label: "Research", value: "9 people · 5 sessions" },
    { label: "Design system", value: "Fuel v5" },
    { label: "Output", value: "5 options · validated set" },
  ],
  annotation: "≈ 25–30 hrs saved — reported by PMs + observed",
};

export const sectionNav = [
  { id: "context", label: "01 · Context" },
  { id: "people", label: "02 · People" },
  { id: "research", label: "03 · Research" },
  { id: "findings", label: "04 · Findings" },
  { id: "assumptions", label: "05 · Assumptions" },
  { id: "framing", label: "06 · Framing" },
  { id: "exploration", label: "07 · Exploration" },
  { id: "decisions", label: "08 · Decisions" },
  { id: "kept", label: "09 · What held up" },
  { id: "fuel-file", label: "Fuel" },
  { id: "next", label: "10 · Next" },
];

/* ── 01 Context ── */
export const context = {
  title: "What the Team Contract is *for*",
  paragraphs: [
    "Team Contract (TC) is where program managers and product owners record a product program’s metrics — financials, quality, reliability and complexity — across six development phases. Leadership reviews it monthly.",
    "It’s required for new products and large programs, and not used for small-scale or model-year projects.",
  ],
  phases: [
    { n: 1, name: "Establish goals", detail: "Scope; inherent reliability set here only" },
    { n: 2, name: "Detailed planning", detail: "Requirements and budget requests" },
    { n: 3, name: "Development", detail: "Build validation; where TC matters most", highlight: true },
    { n: 4, name: "Build validation", detail: "ACR testing at end of phase 3/4" },
    { n: 5, name: "Production", detail: "Deployment and release tracking" },
    { n: 6, name: "Closure", detail: "Summary and retrospective" },
  ],
  before: {
    filename: "00-before-legacy-grid.jpg",
    width: 1117,
    height: 602,
    alt: "The legacy Team Contract metrics grid: a dense table with columns for Title, Subprocess, Tolerance Calculation, AFE Target, Approved Deviation, Upper and Lower Bound, Current Status, Validation Date and Estimate at Full Production. Values are pixelated.",
    caption: "Before. Nine columns of manual entry per metric, a horizontal scroll, and validation that only ran on save.",
    redacted: "values redacted",
  },
};

export const fuelSystem = {
  band: "Fuel v5 · John Deere",
  title: "The system it *lived* in",
  body:
    "Team Contract sits inside Deere’s enterprise tools, so every screen had to look and behave like them. Before I sketched anything, I took stock of what Fuel v5 already gave me. These are the parts the research decisions were later built from.",
  note: "yellow = the one primary action per screen",
  caption: "Recreated from Fuel v5 values in the Figma file. Colours and type are approximations.",
};

/* ── 02 People & context ── */
export const people = {
  title: "Mandatory use *changes* the problem",
  paragraphs: [
    "Nobody can opt out of TC, so friction can’t be “solved” by people choosing another tool. They comply, then rebuild the same data elsewhere — in Power BI, Tableau, spreadsheets and SharePoint.",
    "The team’s own working list named 13 personas who touch TC. The interviews covered the four below.",
  ],
  roles: ["Product owner", "Program manager", "Metric owners", "Senior leadership"],
  quotes: [
    { text: "I would like Team Contract to disappear.", cite: "Program management group · P7–P9", tone: "yellow" as const },
    { text: "Doesn’t drive action.", cite: "Program manager · P3", tone: "lilac" as const },
    { text: "Difficulty in explaining red metrics to senior leadership without context.", cite: "Program management group · P7–P9", tone: "yellow" as const },
  ],
};

/* ── 03 Research ── */
export const research = {
  title: "From 233 notes to *twelve* insights",
  body:
    "Three one-to-one interviews (one product owner, two program managers) and two group sessions of three were recorded with consent, captured as atomic notes, clustered by affinity, then synthesized.",
  pipeline: [
    { label: "Sessions", value: "5 · P1–P9" },
    { label: "Notes", value: "233" },
    { label: "Clustered", value: "186 · 4 lenses" },
    { label: "Synthesis", value: "46 notes · 8 actions" },
    { label: "Insights", value: "12", highlight: true },
  ],
  rawNotes: {
    filename: "02b-interview-notes-p1.jpg",
    width: 1152,
    height: 1400,
    alt: "A grid of 46 blue sticky notes from the Product Owner interview, including: Feels like a heavy tool for just data filling; Too many validations; Error messages written for developers; Frustration in locating validation problems; Wants a feature to assign people to fill data in; Time stamps to see last updates.",
    caption:
      "Raw notes, P1 (product owner). “Error messages written for developers” and “Wants a feature to assign people to fill data in” both became design decisions.",
  },
  affinity: {
    filename: "03c-affinity-current-status.jpg",
    width: 784,
    height: 1600,
    alt: "Affinity cluster for Current Status: 77 sticky notes grouped by theme and colour-coded by session.",
    caption: "Affinity cluster: Current Status. 77 notes, colour-coded by session so cross-session patterns stand out.",
  },
};

/* ── 04 Findings ── */
export const findings = {
  title: "What came up, and *how often*",
  body:
    "Counts are sessions in which a theme appeared, coded from the 233 notes. Two sessions were groups of three, so this is not a head count. With five sessions, it shows breadth, not prevalence.",
  bars: [
    { label: "Manual entry & chasing owners", sessions: 5 },
    { label: "Reporting & visualization", sessions: 5 },
    { label: "Unclear fields & definitions", sessions: 4 },
    { label: "Validation & error messages", sessions: 3 },
    { label: "No history or trends", sessions: 2 },
    { label: "Alerts & notifications", sessions: 2 },
  ],
  cards: [
    {
      title: "A data-entry tool, not a management tool",
      quote: "“A heavy tool for just data filling.”",
      body: "It’s opened for monthly updates and reviews, not for running a program.",
      foot: "Manual entry · 5 of 5 sessions",
    },
    {
      title: "Reports leadership doesn’t use",
      body: "Exports were rarely valued. PMs screenshot TC for slides or rebuild it in Power BI. A red metric arrives with no context.",
      foot: "Reporting · 5 of 5 sessions",
    },
    {
      title: "Validation that hides the problem",
      body: "Errors appear on save, “written for developers”, and are hard to find in a long grid. Upper and lower bounds confused people.",
      foot: "Validation 3 of 5 · Definitions 4 of 5",
    },
  ],
  snapshot: {
    title: "A snapshot with no memory",
    body: "No record of what changed, when or why. Fields lock abruptly at phase gates. People asked for timestamps and trend lines.",
    foot: "History 2 of 5 · in every synthesis lens",
  },
  synthesis: {
    title: "Synthesis",
    body:
      "The clusters were rewritten as needs, then narrowed to eight actionable items. Red, yellow and green status was the one existing feature people clearly valued, so the redesign kept it.",
    actions: {
      filename: "03b-actionable-items.png",
      width: 1024,
      height: 957,
      alt: "FigJam board of eight actionable items, including improve the validation process, implement a poke or reminder feature, simplify data entry, enhance reporting and data visualization, integrate with other tools, improve guidance and support materials, improve data automation and integration, and incorporate alerts and notifications.",
      caption: "Actionable items (8), the bridge into design. Author names removed.",
    },
    themes: {
      filename: "03d-improvement-themes.jpg",
      width: 1504,
      height: 1312,
      alt: "Twelve green synthesis notes written as needs, such as allow for more customization, alerts and notifications, and introduce a poke or reminder feature.",
      caption: "Improvement themes (12), written as needs before any solution.",
    },
  },
};

export const textfieldError = {
  band: "Fuel · TextField error state",
  title: "Same finding, *answered* with a Fuel part",
  body:
    "“Error messages written for developers” didn’t need a new component. Fuel’s TextField already had an inline error state, with a red border, a message under the field and the required asterisk. The job was writing messages a program manager can act on, and showing them in place rather than after a failed save.",
  before: {
    label: "Before · on save",
    field: "Upper & Lower Bound",
    value: "1.2",
    message: "Validation failed.",
    code: "ERR_TOL_BOUND: value outside AFE rewrite level",
  },
  after: {
    label: "After · in place, plain language",
    field: "Upper & Lower Bound *",
    value: "1.2",
    message: "Enter a bound between 0 and 1 — the share of the AFE target you can move before a rewrite.",
    save: "Save stays disabled until fixed",
  },
  caption: "Both messages are illustrative. They show the pattern, not production copy.",
};

/* ── 05 Assumptions ── */
export const assumptions = {
  title: "What the design *still* had to bet on",
  body: "Ranked by importance and by how little evidence supports each one. The top row is the riskiest.",
  caption: "Assumptions ranked by risk, with type and current evidence",
  rows: [
    { n: 1, text: "Data can be pulled automatically from systems teams already use (CS, Power BI, finance tools)", type: "Feasibility", evidence: "None", detail: "CS integration only" },
    { n: 2, text: "Trends and change notes let leadership read a red metric without a PM explaining it", type: "Desirability", evidence: "Thin", detail: "2 of 5 sessions" },
    { n: 3, text: "Inline, plain-language validation reduces blocked saves", type: "Desirability", evidence: "Some", detail: "3 of 5 sessions" },
    { n: 4, text: "Owners update their metrics when prompted in-tool instead of by the PM", type: "Desirability", evidence: "Some", detail: "chasing raised 5 of 5" },
    { n: 5, text: "Program teams maintain their own custom views and metric sets", type: "Viability", evidence: "Validated", detail: "in review" },
  ],
};

/* ── 06 Problem framing ── */
export const framing = {
  title: "Two framings, *one* to design for",
  symptom: {
    label: "Symptom",
    body: "Program managers need clearer errors and field guidance because validation appears late and is written for developers.",
    leaves: "Leaves out: leadership readers, owners who never open TC, the missing history.",
  },
  root: {
    label: "Root cause · chosen",
    body: "PMs and product owners need TC to turn monthly entry into context leadership can act on, because today it records numbers without meaning, so PMs re-explain and rebuild them elsewhere.",
    leaves: "Leaves out: small-scale and model-year programs.",
  },
  howMightWe: [
    "let PMs attach context to a red metric, so leadership can read status without a separate conversation?",
    "show validation problems in place and in plain language, before the user tries to save?",
    "move the job of chasing owners from the PM into the tool?",
    "show how a metric has moved without overloading people who only need today’s value?",
    "cut manual entry by connecting TC to data teams already maintain?",
  ],
};

/* ── 07 Exploration ── */
export const exploration = {
  title: "Five options. Each review *removed* something.",
  body:
    "Each option covered the same core flow: program overview, monthly metric update, error state and reports. Features that tested badly were cut, not restyled.",
  options: [
    { n: 1, name: "Fix in place", detail: "Same accordion; My View / Global View, groups and a phase filter" },
    { n: 2, name: "Program overview", detail: "Layouts for the program page that holds TC" },
    { n: 3, name: "Full feature set", detail: "Custom views, phase tooltips, Add metric, Notifications tab" },
    { n: 4, name: "Notifications removed", detail: "Option 3’s flow without the Notifications tab" },
    { n: 5, name: "Focused set", detail: "Subprocess filter, saved views, trends in reports", highlight: true },
  ],
  option1: {
    filename: "04a-option1-metrics.jpg",
    width: 1440,
    height: 1250,
    alt: "Option 1 metrics screen: the Team Contract accordion opened inside the program page, with My View and Global View toggles, a Groups dropdown, an All Phases filter, and a table of metrics with status checkboxes.",
    caption: "Option 1. Views, groups and a phase filter on the old grid. Still too wide, still too long. User name redacted.",
  },
  option3: {
    filename: "04b-option3-notifications-cut.jpg",
    width: 1440,
    height: 890,
    alt: "Option 3 Notifications tab inside Program Metrics, with All and Unread columns of alert cards.",
    caption: "Option 3, cut in review. A Notifications tab, judged “not useful”. Alerts became pending-task status per owner. Owner names redacted.",
  },
};

/* ── 08 Design decisions ── */
export const decisions = {
  title: "Why the final screens *look* the way they do",
  body: "Each decision links a research finding to a change in the Option 5 screens.",
  items: [
    {
      n: "01",
      title: "Put TC inside the program, collapsed by default",
      evidence: "“Overwhelming number of metrics to track and update”. TC and Common Segmentation (CS) had grown up as separate tools. Insight #1: integrate with CS.",
      change: "TC now lives in the CS program page as two sections, Program Metrics and Reports, built from Fuel Accordion Items. Everything starts collapsed.",
      result: "CS integration was confirmed as a validated feature.",
      figure: {
        filename: "04c-option5-program-overview.jpg",
        width: 1440,
        height: 620,
        alt: "Option 5 program overview: collapsed accordion sections for Program Dates, Program Build Dates, Program Metrics (Team Contract), Reports (Team Contract), and other program sections.",
        caption: "Option 5 · Program overview. User name redacted.",
      },
    },
    {
      n: "02",
      title: "Make the grid readable before it’s editable",
      evidence: "Validation errors were hard to find and written for developers (3 of 5 sessions). Upper and lower bounds confused people (unclear fields raised in 4 of 5).",
      change: "Paired values share a column (AFE Target over Approved Deviation; Current Status over Validation Date), so the grid fits without horizontal scroll. Every metric has an info tooltip. In the error state, Save stays disabled until the row is fixed.",
      result: "A delete column was added at the start of each row after review.",
      figure: {
        filename: "04e-option5-metrics.jpg",
        width: 1377,
        height: 1200,
        alt: "Option 5 metrics grid with status colours, Tolerance Calculation, AFE Target and Current Status columns. Values and user name are pixelated.",
        caption: "Option 5 · Metrics. Red, yellow and green status kept. Name and values redacted.",
      },
    },
    {
      n: "03",
      title: "Filter by subprocess instead of forcing a sequence",
      evidence: "Review feedback: the default sequence by subprocess tag “is not needed — instead of tag we can filter metrics.”",
      change: "Tags shrank to Fuel Badges (PM, FMFA, FMTC). A Fuel Select (All Phases) and a Dropdown Menu (Filter Subprocess) narrow the grid to an owner’s metrics. Views are saveable, with a column picker.",
      result: "Default sequence dropped. Custom views validated: “User wants multiple views for grid.”",
      figure: {
        filename: "04d-option5-custom-view.jpg",
        width: 789,
        height: 497,
        alt: "Add/Edit Custom View dialog with a View Name field and checkboxes for the columns to show, with Cancel and Save buttons.",
        caption: "Custom view: a Fuel TextField, Checkboxes and Buttons, composed into a dialog Fuel didn’t have.",
      },
    },
    {
      n: "04",
      title: "Give reports a memory",
      evidence: "“No trend analysis”, “Static view, snapshot of current status”, screenshots pasted into slides (reporting raised in 5 of 5 sessions).",
      change: "A VP-level table with target, current value and a three-month trend, in the same red/yellow/green coding. Report shortcuts sit in a health-card row above.",
      stillOpen: "PM-written notes on why a metric changed were requested but not designed in this round (hypothesis 2).",
      figure: {
        filename: "04f-option5-reports.jpg",
        width: 1440,
        height: 1110,
        alt: "Option 5 reports: a health-card row of report shortcuts above a VP-level metrics table with target, current value and trend dots.",
        caption: "Option 5 · Reports. Trend dots are test data, and each status also shows a value, so meaning never relies on colour alone.",
      },
    },
  ],
};

/* ── Fuel: anatomy of the metric grid ── */
export const anatomy = {
  band: "Fuel · Anatomy of the metric grid",
  title: "Every part is Fuel. Every part *answers* a finding.",
  body: "The Option 5 grid, taken apart. Numbers on the screen match the list below, which is the readable version.",
  filename: "04e-option5-metrics.jpg",
  width: 1377,
  height: 1200,
  alt: "Option 5 metrics grid built from Fuel components, with numbered markers on the toolbar, filters, table header, a metric row and a status cell. Values and user name are pixelated.",
  caption: "Anatomy of the metric grid. Each part is Fuel, and most of them answer a research finding.",
};

export const anatomyItems = [
  { n: 1, x: 8, y: 23.3, component: "Accordion Item", role: "Program Metrics section, collapsed by default", finding: "overwhelming number of metrics" },
  { n: 2, x: 63, y: 27, component: "Search", role: "Find a metric by name" },
  { n: 3, x: 88, y: 27, component: "Button · primary (Fuel yellow)", role: "Save, disabled until every row is valid", finding: "validation failed at save" },
  { n: 4, x: 14, y: 31.4, component: "Select", role: "All Phases filter", finding: "different metrics matter in different phases" },
  { n: 5, x: 59, y: 31.4, component: "Dropdown Menu + Button", role: "Filter Subprocess and View", finding: "“instead of tag we can filter metrics”" },
  { n: 6, x: 86, y: 31.4, component: "Button · secondary", role: "Add New Metric", finding: "add or remove metrics per program" },
  { n: 7, x: 11, y: 41.7, component: "Badge", role: "Subprocess tag (PM, FMFA)" },
  { n: 8, x: 23, y: 41.7, component: "Tooltip trigger", role: "Metric definition at the point of entry", finding: "“what goes in this field?”" },
  { n: 9, x: 36, y: 41.4, component: "TextField (Input)", role: "Tolerance, with Fuel’s inline error state", finding: "error messages written for developers" },
  { n: 10, x: 46, y: 41.4, component: "TextField · date", role: "AFE target date, approved deviation beneath", finding: "grid too wide to scan" },
  { n: 11, x: 73, y: 58, component: "Status fill (Fuel colour tokens)", role: "Current status, red, yellow and green", finding: "the one feature people valued" },
];

/* ── 09 What held up ── */
export const kept = {
  title: "What the reviews *kept*, and what they cut",
  body: "After each round, outcomes were written onto the design board as validated features and failed solutions.",
  validated: [
    "Integrated with Common Segmentation",
    "Delete column at the start of the table",
    "Custom views with saved preferences",
    "Global filter at the top of the table",
    "Pending-task status per owner",
  ],
  cut: [
    "Notifications section: “not useful”",
    "Progress section: “not needed”",
    "Default sequence by tag, replaced by a filter",
  ],
  insights: {
    filename: "03e-insights-list.jpg",
    width: 1190,
    height: 704,
    alt: "The working insights list: integrate with CS for better alignment of data; incorporate alerts and notifications; implement a poke or reminder feature; add or remove metrics; correct the report format; archived reports; help link for terms and fields; input data so Team Contract can be automated; 13 personas who access Team Contract; better validation fields.",
    caption: "The working insights list used to scope each option.",
  },
  saved: {
    value: "25–30 hrs",
    title: "Time saved, reported by PMs and observed.",
    body: "The design board records about 25–30 hours of time and effort saved. The period and baseline weren’t recorded, so read it as indicative, not measured.",
  },
};

/* ── Fuel: what the file is made of ── */
export const fuelFile = {
  band: "Fuel · What the file is made of",
  title: "5,251 Fuel components, *and* the few I had to compose",
  body:
    "Counted from component instances across all five options in the Figma file. Fuel’s own descriptions label them “Fuel v5” (Button, TextField), built on Fuel’s 2021 input kernel.",
  note: "The largest groups are listed. The rows don’t add up to 5,251, because the smaller groups aren’t itemised.",
  rows: [
    { label: "TextField (Input)", count: 2801 },
    { label: "Badge", count: 378 },
    { label: "Button Icon (edit, delete)", count: 290 },
    { label: "Container / Sharp", count: 286 },
    { label: "Divider / Horizontal", count: 286 },
    { label: "Cell / Text", count: 268 },
    { label: "Button (primary, secondary)", count: 82 },
    { label: "Checkbox", count: 42 },
    { label: "Dropdown Menu + Button", count: 28 },
    { label: "Search · Toggle · Select · Accordion", count: 54 },
  ],
  composed: "Where Fuel had no answer, I composed one from Fuel parts instead of inventing new visuals: Phases, Custom View, Add New Metric and the advanced filter.",
  honest: "Honest note: these compositions stayed in the Team Contract file. I’m not claiming any of them went into Fuel itself.",
};

export const tokens = {
  title: "Fuel tokens bound in the metric grid",
  body:
    "Colours, spacing and radius in the screens are Figma variables, not hard-coded values. That’s why yellow means “primary action” and green means “on track” here, as in any other Deere tool.",
  groups: [
    {
      title: "Brand & action",
      items: [
        { name: "fuel/color/background/brand", value: "#367C2B" },
        { name: "fuel/color/action/primary/base", value: "#FFDE00" },
        { name: "fuel/color/brand/jd-charcoal", value: "#54585A" },
      ],
    },
    {
      title: "Messaging",
      items: [
        { name: "…/messaging/success/base", value: "#99BD93" },
        { name: "…/messaging/warning/base", value: "#FFBB52" },
        { name: "…/messaging/info/base", value: "#7AABD6" },
        { name: "…/messaging/danger/dark", value: "#C21020" },
      ],
    },
    {
      title: "Text, border, space",
      items: [
        { name: "fuel/color/text/primary", value: "#1B1B1B" },
        { name: "fuel/color/text/tertiary", value: "#666666" },
        { name: "fuel/color/border/dark", value: "#B3B3B3" },
        { name: "fuel/spacing/1 · 2", value: "4 · 8" },
        { name: "fuel/radius/sm", value: "4" },
      ],
    },
  ],
  type: [
    { name: "Heading 3", spec: "18 / 28 semibold" },
    { name: "Heading 5", spec: "14 / 20 semibold" },
    { name: "Body 2", spec: "14 / 20 regular" },
    { name: "Button", spec: "13 / 24 semibold" },
    { name: "Caption", spec: "12 / 16 regular" },
  ],
  caption: "Token names as they appeared in Figma — illustrative, not a published API.",
};

/* ── 10 What we'd test next ── */
export const next = {
  title: "Hypotheses the redesign *still* has to prove",
  hypotheses: [
    {
      id: "H1",
      name: "Inline validation",
      believe: "PMs complete a monthly update with fewer blocked saves if validation shows in place, in plain language.",
      knowWhen: "Blocked saves per update task are lower than in the legacy grid, with the same task and the same 5 PMs.",
      wrongIf: "Blocked saves don’t fall, or PMs say the messages slow them down.",
    },
    {
      id: "H2",
      name: "Change notes on trends",
      believe: "Leaders need fewer follow-ups on red metrics if each trend carries a short PM note.",
      knowWhen: "Leaders correctly explain why a metric is red for at least 4 of 5 metrics shown, with no PM present.",
      wrongIf: "Leaders ignore the notes, or PMs won’t write them.",
    },
    {
      id: "H3",
      name: "Owner reminders",
      believe: "PMs send fewer out-of-tool reminders if TC prompts each owner about pending metrics.",
      knowWhen: "Over two cycles, diary entries show fewer out-of-tool reminders than in a baseline cycle.",
      wrongIf: "Chasing moves to another channel, or owners mute the prompts.",
    },
  ],
  methodCaption: "Method for each hypothesis, its limit, and a cheaper fallback",
  methods: [
    { method: "Moderated usability test (H1)", answers: "Whether inline validation reduces blocked saves, and why", cant: "Whether it holds for every metric type over time", fallback: "Unmoderated test, no think-aloud" },
    { method: "Concept test with leaders (H2)", answers: "Whether notes make red metrics self-explanatory", cant: "Real meeting behaviour; note quality over time", fallback: "Printed screens in a review" },
    { method: "Two-cycle diary study (H3)", answers: "Whether chasing moves into the tool", cant: "Whether PM satisfaction improves", fallback: "Retro interviews after one cycle" },
    { method: "Technical spike (assumption 1)", answers: "Which sources can feed TC automatically", cant: "Whether users trust auto-filled values", fallback: "Interview with the platform team" },
  ],
  nextStep: {
    label: "Smallest next step",
    title: "Run H1 with 5 program managers on the Option 5 metrics prototype.",
    body: "Screen for at least 6 months of TC use. Run the same monthly-update task in the legacy grid and the prototype, count blocked saves, and decide go / refine / pivot within two weeks.",
    stats: [
      { label: "Timeline", value: "2 weeks" },
      { label: "Participants", value: "5 PMs" },
      { label: "Tests", value: "H1 · Inline validation" },
    ],
  },
};

export const footnote = "Participants are referred to as P1–P9 only. No names or personal details appear in shared outputs.";
