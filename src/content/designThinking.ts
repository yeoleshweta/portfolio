/**
 * PM persona refinement case study content.
 * Source: PM Persona Study.md — do not reword.
 */

import type { Rich } from "@/components/casestudy/RichText";

export const hero = {
  title: "Keeping the PM Persona Current: A Quarterly Refinement Study",
  subtitle:
    "A standing quarterly practice at John Deere India — this Q3 2023 cycle updated the PM persona and fed directly into Q4 roadmap planning.",
  role: "UX Coach and Researcher",
  team: "Product and Customer (P&C), Foundry, John Deere",
  method: "Usage logs + 8 structured interviews",
  timeline: "12 weeks, Q3 2023",
};

export const overview = {
  paragraphs: [
    "John Deere India runs 250+ internal products, most without a dedicated UX professional. Product managers absorb the gap — they run their own research, shape their own flows, and make calls on instinct.",
    "The Q3 2023 study is one cycle in a standing quarterly refinement practice. Each cycle updates the PM persona artifact that feeds roadmap planning, keeping it grounded in how PMs are actually working right now.",
    "The cycle ran for 12 weeks: two weeks of desk research into usage logs, a synthesis sprint, then structured interviews, ending in a delivered persona deck and a Q4 input brief.",
  ],
  stats: [
    { number: "8", label: "PMs interviewed", dark: true },
    { number: "45", label: "Minutes per session" },
    { number: "6", label: "Need clusters" },
    { number: "8", label: "Workshops delivered" },
  ],
};

export const rhythm = {
  intro:
    "Each quarter follows a compressed Double Diamond. Q3 is this study — highlighted below. Q4 is the planned validation cycle.",
  caption:
    "Quarterly persona refinement cycle — Q1 to Q4 2023, with Q3 as the current study",
  heads: ["Quarter", "Focus", "Method", "Outcome"],
  quarters: [
    {
      quarter: "Q1 2023",
      focus: "Baseline persona creation",
      method: "12 in-depth interviews, card sorting",
      outcome: "First PM persona artifact",
    },
    {
      quarter: "Q2 2023",
      focus: "Feature-adoption delta check",
      method: "Usage log analysis, 6 interviews",
      outcome: "Revised pain-point hierarchy",
    },
    {
      quarter: "Q3 2023",
      tag: "This study",
      current: true,
      focus: "Role-scope & tooling shift",
      method: "Usage logs, structured interviews, forum scan",
      outcome: "Updated persona + Q4 roadmap input",
    },
    {
      quarter: "Q4 2023",
      tag: "Planned",
      focus: "Post-roadmap validation",
      method: "Survey + 4 concept tests",
      outcome: "Validate Q3 updates against shipped features",
    },
  ],
};

export const process = {
  intro: [
    "The work followed the ",
    { strong: "Double Diamond" },
    ": open up to understand what changed, narrow to define the sharpest updates, then open and narrow again on what to build.",
  ] satisfies Rich,
  cards: [
    {
      label: "01 · Diverge",
      title: "Discover",
      text: "Usage log analysis, desk research on feature adoption, community forum scan. Two weeks before any recruiting.",
      mode: "diverge" as const,
    },
    {
      label: "02 · Converge",
      title: "Define",
      text: "Affinity mapping, updating hypothesis themes, narrowing to 3 interview focus areas.",
      mode: "converge" as const,
    },
    {
      label: "03 · Diverge",
      title: "Develop",
      text: "8 structured interviews, theme extraction, updated journey touchpoints.",
      mode: "diverge" as const,
    },
    {
      label: "04 · Converge",
      title: "Deliver",
      text: "Updated persona deck, interview synthesis, Q4 input brief for product leadership.",
      mode: "converge" as const,
    },
  ],
};

export const gathering = {
  paragraphs: [
    "Eight semi-structured interviews in June and July 2023, each 45 minutes, with one or two note-takers in each session. Every session opened with the same script: no right or wrong answers, confidentiality, and consent to record.",
    "The interview guide ran in six thematic blocks, moving from the whole person to the specific friction points:",
  ],
  blocks: [
    {
      label: "Block 1",
      title: "Life outside work",
      text: "Spare time and non-professional goals.",
    },
    {
      label: "Block 2",
      title: "Role",
      text: "A typical workday, the values they track, where decision data comes from.",
    },
    {
      label: "Block 3",
      title: "Support",
      text: "Last contact with the P&C team, time management, tools, team motivation.",
    },
    {
      label: "Block 4",
      title: "Growth",
      text: "Time with their GPM, what success looks like, who they turn to.",
    },
    {
      label: "Block 5",
      title: "Frustrations",
      text: "Their biggest frustrations, the magic-wand question, a moment they were blocked.",
    },
    {
      label: "Block 6",
      title: "Strategy & community",
      text: "Product versus org strategy, PM groups, topics for coaching.",
    },
  ],
  board: {
    title: "Mural · PM Research Board — Q3 2023",
    columns: [
      {
        title: "No forum or peer community",
        count: "6 of 8",
        notes: [
          "No active forums for PMs to connect",
          "No way to ask questions outside my team",
          "Isolated when facing a new problem",
          "No senior PM to look up to",
        ],
      },
      {
        title: "Career path unclear",
        count: "5 of 8",
        notes: [
          "No way to gauge personal growth",
          "Unclear what next level looks like",
          "No benchmark of best practises",
          "Growth feels invisible",
        ],
      },
      {
        title: "UX & data support missing",
        count: "4 of 8",
        notes: [
          "Need UX and data analytics resource",
          "Doing research alone, no training",
          "Technical side of aspect is weak",
          "Struggling to manage time as PM",
        ],
      },
    ],
    footnote:
      "Board notes reproduced as written. Names and owner IDs redacted per portfolio guidelines.",
    caption:
      "Gathering Insights: notes from eight PM interviews on the Mural board, grouped into needs and pain points.",
  },
};

export const interviews = {
  intro:
    "Notes from each session went onto the Mural board — one row per participant, then into clusters of needs. Seven distinct themes emerged, ranked by how many participants raised them:",
  total: 8,
  caption:
    "Interview findings — themes ranked by number of participants who raised each one, with representative quotes",
  heads: ["Theme", "Count", "Representative note"],
  themes: [
    {
      theme: "No forum or peer community",
      count: 6,
      note: "No active forums for PMs",
    },
    {
      theme: "Career path and growth unclear",
      count: 5,
      note: "No way to gauge personal growth",
    },
    {
      theme: "UX, research and data support missing",
      count: 4,
      note: "UX and data analytics person/resource — need",
    },
    {
      theme: "No best practices or benchmarks",
      count: 2,
      note: "No benchmark of best practises",
    },
    {
      theme: "Technical grounding weak",
      count: 2,
      note: "Technical side of aspect is weak",
    },
    {
      theme: "Time management",
      count: 2,
      note: "Struggling to manage time as PM",
    },
    {
      theme: "Unsure how to use the P&C team",
      count: 1,
      note: "Don't know how to utilise P&C services",
    },
  ],
  note:
    "Participants who raised each theme. Lines in quotes are notes from the board as written, not verbatim participant quotes.",
  framing: {
    title: "Framing the problem",
    steps: [
      {
        label: "Step 1",
        title: "Three lenses",
        text: "Behaviour, context, and emotion mapped across all 8 participants.",
      },
      {
        label: "Step 2",
        title: "Statement drafts",
        text: "Three problem statement candidates written from the lens clusters.",
      },
      {
        label: "Step 3",
        title: "Root cause",
        text: "Narrowed to the structural cause: missing infrastructure, not missing skill.",
      },
    ],
  },
  reframe: {
    label: "The Reframe",
    statement: "Infrastructure, not education.",
    text: "PMs did not need more training. They needed a place to ask, people to ask, and practices within reach.",
  },
  hypothesis: {
    title: "From insight to hypothesis",
    statement: [
      { strong: "We believe" },
      " that PMs will feel less isolated and make better product decisions ",
      { strong: "for" },
      " John Deere India product teams ",
      { strong: "if" },
      " we give them a community forum, a standing cohort, and buddy pairs.",
    ] satisfies Rich,
    success: {
      label: "We'll know when:",
      text: "forum joins, cohort attendance, and self-reported confidence improve within 3 months.",
    },
    failure: {
      label: "We're wrong if:",
      text: "fewer than 10 PMs engage in the first month, or forum threads drop after week 4.",
    },
  },
};

export const persona = {
  intro: [
    "The clusters became ",
    { strong: "Rajesh" },
    ", a composite Product Manager built from all eight interviews. One persona hides real differences — the notes point to three kinds of PM, each needing a different weight of support.",
  ] satisfies Rich,
  profiles: [
    {
      icon: "🌱",
      title: "The new PM from the business",
      who: "3 of 8 · Recently moved into the role",
      quote: "Plans on own judgement. Needs role clarity and structured support.",
    },
    {
      icon: "📊",
      title: "The data-hungry veteran",
      who: "3 of 8 · Years in the company",
      quote:
        "Already digs into data or sketches ideas alone. Needs a UX and analytics partner.",
    },
    {
      icon: "🔩",
      title: "The settled specialist",
      who: "2 of 8 · Deep technical niche",
      quote:
        "Content in the role, few goals set. Needs a reason to engage and to know a community exists.",
    },
  ],
  status:
    "Persona last updated Q3 2023. Tracked quarterly — next refresh scheduled Q4 2023 post-roadmap validation cycle.",
};

export const decisionFlow = {
  intro:
    "Following one product decision from start to finish shows where each pain point lands, and where the programme adds something.",
  caption:
    "Decision flow — each step of a product decision, the pain PMs described, and what the programme adds",
  heads: ["Step", "Pain PMs described", "Programme intervention"],
  rows: [
    {
      step: "Strategy & OKRs",
      pain: "Goals arrive top-down each quarter. Org strategy outweighs product strategy.",
      add: "Not addressed by the programme",
      none: true,
    },
    {
      step: "Spot a need",
      pain: "Customer polls and opportunity documents. Feedback from customers is hard to get.",
      add: "Mural templates for self-run discovery sessions",
    },
    {
      step: "Gather evidence",
      pain: "Data is missing or unreliable. PMs dig alone, with no set method.",
      add: "Buddy-Up with a UX coach or a peer PM",
    },
    {
      step: "Shape a solution",
      pain: "Stories, slides and spreadsheets — made on own judgement with no UX support.",
      add: "Monthly PM cohort with the UX topics PMs asked for",
    },
    {
      step: "Ask for help",
      pain: "No forum and no mentor. Unsure how to reach the right support team.",
      add: "Community forum and Buddy-Up pairs",
    },
    {
      step: "Decide and build",
      pain: "Value against effort. No benchmark or best practice to check a decision against.",
      add: "DeereUX site awareness raised in workshops",
    },
  ],
};

export const delivery = {
  intro:
    "The most frequent need got the first answer. Each piece gives PMs somewhere to turn that did not exist before.",
  cards: [
    {
      label: "Answers 6 of 8",
      title: "Community forum",
      text: "A shared space where PMs ask questions and trade practice, so no one works a problem alone.",
      dark: true,
    },
    {
      label: "Answers 5 of 8",
      title: "Monthly PM cohort",
      text: "A standing monthly session giving career growth and the UX courses PMs asked for.",
    },
    {
      title: "Buddy-Up pairs",
      text: "Each PM paired with a UX coach or a peer PM as a guide or thinking partner.",
    },
    {
      title: "Mural templates",
      text: "Structured frameworks PMs can run themselves in discovery and brainstorming sessions.",
    },
  ],
  closing: [
    { strong: "Eight workshops" },
    " brought PMs to the forum, their buddies, and the templates. One finding needed nothing new: the DeereUX site already existed — PMs just didn't know it.",
  ] satisfies Rich,
};

export const impact = {
  intro:
    "The forum and the cohort launched. What they changed is reported at four levels, stated plainly where the evidence is thin.",
  caption:
    "Impact of the PM support programme at four levels — reaction, learning, behaviour, and results",
  heads: ["Level", "Change", "Signal"],
  rows: [
    {
      level: "1 · Reaction",
      change: "Average 12 PMs per monthly cohort",
      signal: "Attendance records",
    },
    {
      level: "2 · Learning",
      change:
        "Eight workshops on forum use, Buddy-Up, Mural discovery templates, and UX fundamentals",
      signal: "Workshop completion logs",
    },
    {
      level: "3 · Behaviour",
      change: "24 forum members and 38 threads in the first three months",
      signal: "Forum analytics",
    },
    {
      level: "4 · Results",
      change: "Product quality improvement — not yet measured",
      signal: "No comparison group; outcome measurement planned for Q4",
      open: true,
    },
  ],
};

export const nextSteps = {
  intro:
    "The Q4 cycle validates Q3 persona updates against features that shipped. Focus shifts from discovery to confirmation.",
  items: [
    {
      strong: "Diary study:",
      text: "PMs log real product decisions for two weeks",
    },
    {
      strong: "Monthly tracking:",
      text: "cohort attendance and forum activity, month by month",
    },
    {
      strong: "Comparison group:",
      text: "PMs outside the programme, measured on the same things",
    },
  ],
};
