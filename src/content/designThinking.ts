/**
 * Design Thinking / PM persona case study content.
 * Source: design-thinking-case-study-implementation.md — do not reword.
 */

export const hero = {
  title:
    "No UX, No Problem? A Qualitative Study into How Product Managers Navigate UX Without UX Support",
  meta: [
    { label: "Role", value: "UX Coach and Researcher" },
    { label: "Team", value: "Product and Customer (P&C), Foundry, John Deere" },
    { label: "Method", value: "8 semi-structured interviews" },
    { label: "Timeline", value: "12 weeks, 2023" },
  ],
};

export const overview = {
  paragraphs: [
    "John Deere India runs 250+ internal products, and most have no dedicated UX professional. Product Managers absorb the gap. They run their own research, shape their own flows and make calls on judgement.",
    "As UX coach on the Product and Customer (P&C) team, part of Foundry in John Deere's Strategy and Transformation pillar, I interviewed eight Product Managers to refine the PM persona and learn what support would fit the way they already work. The study led to a community forum and a monthly PM cohort.",
  ],
  stats: [
    { number: "8", label: "Product Managers interviewed", dark: true },
    { number: "45", label: "minutes per session" },
    { number: "6", label: "need clusters" },
    { number: "8", label: "workshops delivered" },
  ],
  researchGoal:
    "refine the persona for Product Managers, and find the support that would realistically fit their existing workflow.",
};

export const process = {
  intro:
    "The work followed the Double Diamond: open up to understand the problem, narrow to define it, then open and narrow again on what to build.",
  cards: [
    {
      label: "01 · Diverge",
      title: "Discover",
      text: "Interview guide in six blocks. Eight interviews with note-takers.",
      mode: "diverge" as const,
    },
    {
      label: "02 · Converge",
      title: "Define",
      text: "Per-participant grid, six need clusters, the Rajesh persona and a reframed problem statement.",
      mode: "converge" as const,
    },
    {
      label: "03 · Diverge",
      title: "Develop",
      text: "Discussion-led sessions on ways to answer each need: a forum, a cohort, buddies, templates.",
      mode: "diverge" as const,
    },
    {
      label: "04 · Converge",
      title: "Deliver",
      text: "Community forum, monthly PM cohort, Buddy-Up pairs, Mural templates and eight workshops.",
      mode: "converge" as const,
    },
  ],
};

export const gathering = {
  paragraphs: [
    "I ran eight semi-structured interviews in June and July 2023, each 45 minutes, with one or two note-takers in the room. Participants ranged from ten months to six years in the PM role, with backgrounds in infrastructure, security, engineering, SAP and cloud.",
    "Every session opened with the same script: no right or wrong answers, confidentiality, and consent to record. The guide then moved through six blocks.",
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
      title: "Strategy and community",
      text: "Product versus org strategy, PM groups, topics for coaching.",
    },
  ],
  image: {
    src: "/assets/mural-pm-interviews.jpg",
    alt: "Mural board for the Product Manager persona interviews, with notes from each session grouped into need and pain point clusters",
    caption:
      "Gathering Insights: notes from eight PM interviews on the Mural board, grouped into needs and pain points.",
  },
};

export const interviews = {
  intro:
    "Notes from each session went onto a Mural board, one row per participant, then into clusters of needs and pain points. Isolation came through most strongly: six of eight PMs had no peer community to turn to.",
  themes: [
    {
      theme: "No forum or peer community",
      count: "6 of 8",
      fill: 75,
      note: "No active forums for PMs",
    },
    {
      theme: "Career path and growth unclear",
      count: "5 of 8",
      fill: 62.5,
      note: "No way to gauge personal growth",
    },
    {
      theme: "UX, research and data support missing",
      count: "4 of 8",
      fill: 50,
      note: "UX and data analytics person/resource - need",
    },
    {
      theme: "No best practices or benchmarks",
      count: "2 of 8",
      fill: 25,
      note: "No benchmark of best practises",
    },
    {
      theme: "Technical grounding weak",
      count: "2 of 8",
      fill: 25,
      note: "Technical side of aspect is weak",
    },
    {
      theme: "Time management",
      count: "2 of 8",
      fill: 25,
      note: "Struggling to manage time as PM",
    },
    {
      theme: "Unsure how to use the P&C team",
      count: "1 of 8",
      fill: 12.5,
      note: "Process side dont know how to utilize P&C services",
    },
  ],
  themeCaption:
    "Participants who raised each theme. Lines in quotes are notes from the board as written, not verbatim quotes.",
  problemFraming: {
    src: "/assets/problem-framing.png",
    alt: "Problem framing in three steps: three lenses, the statement, and three drafts ending in infrastructure, not education",
    caption:
      "Framing the Problem: mapping user lenses, forming statement drafts, and refining to the root cause.",
  },
  reframe: {
    label: "THE REFRAME",
    statement: "Infrastructure, not education.",
    text: "PMs did not need more training. They needed a place to ask, people to ask, and practices within reach. Workshops stayed in the plan as the way people reach that infrastructure, not as the answer itself.",
  },
  hypothesis: {
    src: "/assets/hypothesis-formula.png",
    alt: "Hypothesis formula: outcome, user, benefit and feature, with adoption, value and speed as measures",
    caption:
      "Insights plugged into a formula: the hypothesis and how we would know it worked.",
  },
};

export const persona = {
  intro:
    "The clusters became Rajesh, a composite Product Manager built from all eight interviews.",
  image: {
    src: "/assets/rajesh_persona.png",
    alt: "Persona card for Rajesh, the Product Manager: behaviours, expectations and pain points",
    caption:
      "Meet Rajesh: a composite persona built from 8 interviews, June to July 2023.",
  },
  profilesIntro:
    "One persona hides real differences. The notes point to three kinds of PM, each needing a different way in.",
  profiles: [
    {
      label: "3 of 8",
      title: "The new PM from the business",
      text: "Recently moved into the role with no IT background. Plans on own judgement. Needs role clarity and someone to ask.",
      pill: "Buddy-Up first",
    },
    {
      label: "3 of 8",
      title: "The data-hungry veteran",
      text: "Years in the company. Already digs into data or sketches ideas alone. Needs a UX and analytics partner and a growth path.",
      pill: "A route to UX collaboration",
    },
    {
      label: "2 of 8",
      title: "The settled specialist",
      text: "Deep technical niche, content in the role, few goals set. Needs a reason to engage and to know a community exists.",
      pill: "Forum, light touch",
    },
  ],
};

export const decisionFlow = {
  intro:
    "Following one product decision from start to finish shows where each pain point lands, and where the programme steps in. The six steps are reconstructed from the interview notes.",
  rows: [
    {
      n: "1",
      step: "Strategy and OKRs",
      pain: "Goals arrive top-down each quarter. Org strategy outweighs product strategy.",
      add: "Not addressed by the programme",
      dashed: true,
    },
    {
      n: "2",
      step: "Spot a need",
      pain: "Customer polls and opportunity documents. Feedback from customers is hard to get.",
      add: "Mural templates for self-run discovery sessions",
    },
    {
      n: "3",
      step: "Gather evidence",
      pain: "Data is missing or unreliable. PMs dig alone, with no set method for using it.",
      add: "Buddy-Up with a UX coach or a peer PM",
    },
    {
      n: "4",
      step: "Shape a solution",
      pain: "Stories, slides and spreadsheets, made on own judgement with no UX support.",
      add: "Monthly PM cohort, with the UX topics PMs asked for",
    },
    {
      n: "5",
      step: "Ask for help",
      pain: "No forum and no mentor. Unsure how to reach the right support team.",
      add: "Community forum and Buddy-Up pairs",
    },
    {
      n: "6",
      step: "Decide and build",
      pain: "Value against effort. No benchmark or best practice to check a decision against.",
      add: "Awareness of the existing DeereUX site",
    },
  ],
  caption:
    "Left to right: the step, the pain PMs described, and what the programme adds.",
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
      text: "A standing monthly session that gives career growth, and the UX courses PMs asked for, a regular home.",
    },
    {
      label: "Someone to ask",
      title: "Buddy-Up pairs",
      text: "Each PM paired with a UX coach or a peer PM, as a guide or simply a thinking partner.",
    },
    {
      label: "Practices within reach",
      title: "Mural templates",
      text: "Structured frameworks PMs can run themselves in discovery and brainstorming sessions.",
    },
  ],
  closing:
    "Eight workshops brought PMs to the forum, their buddies and the templates. One finding needed nothing new: the DeereUX site already existed, but few PMs knew it was there, so the programme pointed them to it.",
};

export const impact = {
  intro:
    "The forum and the cohort launched. What they changed is reported at four levels, and stated plainly where it was not measured.",
  rows: [
    {
      level: "1 · Reaction",
      question: "Did PMs value it?",
      evidence: "Average 12 PMs per monthly cohort",
    },
    {
      level: "2 · Learning",
      question: "Did they gain anything?",
      evidence:
        "Eight workshops on forum use, Buddy-Up, Mural discovery templates, and UX fundamentals",
    },
    {
      level: "3 · Behaviour",
      question: "Did they act differently?",
      evidence: "24 forum members and 38 threads in the first three months",
    },
    {
      level: "4 · Results",
      question: "Did products improve?",
      evidence: "Not measured",
    },
  ],
};

export const limitations = [
  "Eight participants from one organisation. The patterns may not hold across every product line.",
  "One analyst clustered the notes. No second coder checked the themes.",
  "The debrief after each interview was skipped, so early surprises were not captured while fresh.",
  "Outcomes were not measured against a comparison group.",
];

export const lessons = [
  {
    title: "Debrief while it is fresh",
    text: "Five minutes of takeaways after each interview would have made synthesis faster and sharper.",
  },
  {
    title: "The guide shapes the findings",
    text: "A guide built to profile the PM surfaced career and community first. The questions decide what you hear.",
  },
  {
    title: "Plan the measure before launch",
    text: "Deciding how success would be counted on day one would have turned a launch into evidence.",
  },
];

export const nextSteps = [
  {
    strong: "Diary study:",
    text: "PMs log real product decisions for two weeks.",
  },
  {
    strong: "Monthly tracking:",
    text: "cohort attendance and forum activity, month by month.",
  },
  {
    strong: "Comparison group:",
    text: "PMs outside the programme, measured on the same things.",
  },
];
