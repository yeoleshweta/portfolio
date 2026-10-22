/* All copy for /work/personalization lives here, not in components.
   Accuracy rules for this study. Sources: the earlier version of this page,
   caseStudyBriefs.ts and the Topshop deck in Portfolio Assets.
   - The only reported figures are +5.8% (Variant D, shipped sitewide), ~10×
     (sessions with search vs without; a correlation) and 9–11% (cumulative,
     product-page loop). Add no other number until its source is confirmed.
   - The deck's per-cell conversion table is reconstructed, so no cell shows a
     result except Variant D's +5.8%.
   - No funnel percentages, IT-sprint counts, mobile results, quotes or theme
     frequencies until real figures are confirmed.
   - Intercept responses are paraphrased. No participant names. */

/** Text in which some phrases are bold. */
export type Rich = (string | { strong: string })[];

export const personalizationMeta = {
  title:
    "What Analytics Couldn't Tell Us: Pairing Exit Intercepts with Behavioral Data at Topshop",
  category: "Quantitative / Experimentation",
  role: "UX Analyst & Experimentation Designer",
  team: "Qubit · Topshop",
  timeline: "A/B/n Testing Cycle",
};

export const overview = {
  lead: "How intercept survey feedback and behavioral analytics were triangulated to find a hidden conversion lever, and how a four variant experiment turned it into measurable revenue.",
  stats: [
    { label: "Role", value: personalizationMeta.role },
    { label: "Platform", value: "Qubit" },
    {
      label: "Methods",
      value: "Exit intercepts, funnel analysis, and A/B/n testing",
    },
    {
      label: "Outcome",
      value: "+5.8% conversion from search; 9–11% cumulative on product pages",
      highlight: true,
    },
  ],
  contributionsTitle: "My contributions on this project",
};

export const myContributions = [
  {
    area: "Variant UI Design",
    detail:
      "Designed the search-field treatments, a border and new placeholder copy, as variations that ran in Qubit. Each cell isolated or combined one hypothesis, so a win could be traced to its mechanism.",
  },
  {
    area: "Test Architecture",
    detail:
      "Set up the test in Qubit: the existing design as control, cells that isolated or combined border and copy, an even split across all cells, conversion as the primary metric, and a rule to reach statistical significance before any rollout.",
  },
  {
    area: "Visitor Opinion Survey",
    detail:
      "Configured the exit intercept in Qubit's Visitor Opinion tool: open-ended, fired in-session at points of friction and on exit intent, with frequency caps on who saw it and how often.",
  },
  {
    area: "Product Page Micro-Changes",
    detail:
      "Ran the same intercept, hypothesis and controlled-test loop on size selectors, delivery tabs, confirmation pop-ups and add-to-bag buttons, without committing IT resources to anything unproven.",
  },
  {
    area: "Analysis & Reporting",
    detail:
      "Read each variant against control, then took the winner and its business case into IT prioritization for the sitewide rollout.",
  },
];

export const problem = {
  heading:
    "Numbers tell you the scale of a problem. Feedback tells you how to deal with it.",
  lead: "Topshop's search bar sat on every user's path to purchase, but it was underperforming. We knew something was wrong from the behavioral data alone: search adoption was low relative to comparable retailers, and sessions that never touched search converted at a fraction of those that did.",
  why: "What the quantitative data couldn't tell us was why search adoption was low. Was it discoverability? Usability? Result quality? Pushing a sitewide redesign on a guess would have burned IT resources on an unvalidated hypothesis. We needed the user's voice before touching the interface.",
};

/* Replaces the plan's five-stage funnel: no stage percentages exist in any
   source. The ~10× ratio is the reported figure; the bars only index it. */
export const searchConversion = {
  title: "Conversion rate, indexed",
  bars: [
    { label: "Sessions without search", value: 1, display: "1×" },
    {
      label: "Sessions that used search",
      value: 10,
      display: "~10×",
      highlight: true,
    },
  ],
  caption:
    "Indexed so that sessions without search equal 1. Sessions were segmented by whether they used search, so the gap is a correlation: it priced the problem but could not explain it.",
};

export const analysis = {
  heading: "Triangulating intercept feedback with behavioral data",
  signals: [
    {
      label: "Qualitative Signal: Exit Intercepts",
      body: [
        "Using Qubit's Visitor Opinion exit feedback tool, which was an on site intercept survey triggered as users left, we captured open ended feedback at the moment of abandonment. A recurring theme emerged: ",
        { strong: "users struggled to both find and use the search bar" },
        '. It read as a low contrast text element with no visual affordance signaling "type here".',
      ] satisfies Rich,
    },
    {
      label: "Quantitative Signal: Analytics",
      body: [
        "Qubit's behavioral analytics quantified the stakes: visitors who used search converted ",
        { strong: "roughly 10 times higher" },
        " than those who did not. Search was not a convenience feature; it was the single highest intent behavior on the site, and friction there was directly suppressing revenue.",
      ] satisfies Rich,
    },
  ],
  quote:
    "The intercept feedback gave us the diagnostic; the analytics gave us the business case. Neither alone would have justified the work, but together they made it the obvious next test.",
  themesTitle: "What the intercept responses pointed to",
  themesNote: "Responses are paraphrased. No names or identifying details are kept.",
  setup:
    "I configured the intercept in Qubit's Visitor Opinion tool. It fired in-session, at points of friction and on exit intent, and it was open-ended: we didn't yet know the hypothesis space, and fixed answer options would only have echoed our own guesses. Targeting mattered as much as the question. Frequency caps decided who saw it and how often, so heavy visitors weren't oversampled.",
};

/* Two themes, not the plan's three: "navigation used as a search substitute"
   has no source. Only the first theme has a recorded paraphrase. */
export const interceptInsights: {
  theme: string;
  detail: string;
  paraphrase?: string;
  action: string;
}[] = [
  {
    theme: "The search bar didn't look like something to type into",
    detail:
      'It read as a low-contrast text element, with no visual cue saying "type here".',
    paraphrase: "I can't find the search bar.",
    action: "It became H1, visibility: test a border around the field.",
  },
  {
    theme: "The placeholder copy didn't invite a search",
    detail:
      "The second cause the feedback pointed to: the placeholder text did not invite action.",
    action: "It became H2, invitation: test new placeholder copy.",
  },
];

export const decision = {
  heading: "Test the hypotheses, do not ship the guess",
  body: [
    [
      "The feedback pointed at two candidate fixes: ",
      { strong: "visibility" },
      " (the field did not look like an input) and ",
      { strong: "affordance copy" },
      " (the placeholder did not invite action). Rather than allocating expensive IT resources to push a full sitewide change based on either hypothesis, we designed four search variations testing both dimensions: changes in copy, and the addition of a border to the search box.",
    ],
    [
      "The test was split evenly across all users, with the existing design as control, so any change would carry statistical evidence into the IT prioritization conversation, not opinion.",
    ],
  ] satisfies Rich[],
  hypotheses: [
    { id: "H1", label: "Visual affordance to border" },
    { id: "H2", label: "Invitation to copy change" },
    { id: "H3", label: "Combined effect" },
  ],
  build:
    "The variants ran in Qubit as JS/CSS variations on the live site, so testing the hypotheses didn't need IT to build a sitewide change first. IT came into the conversation afterwards, with a winner and the evidence for it.",
};

export type MatrixCell = {
  name: string;
  detail: string;
  result?: string;
  winner?: boolean;
};

/* Cells are named by mechanism, not letter: the deck, the plan and the
   VariantSelector disagree on which letter was which. Only D is consistent. */
export const variantMatrix: {
  title: string;
  columnHeads: [string, string];
  rows: { head: string; cells: [MatrixCell, MatrixCell] }[];
  note: string;
} = {
  title: "The test design: border × placeholder copy",
  columnHeads: ["Existing copy", "New copy"],
  rows: [
    {
      head: "No border",
      cells: [
        {
          name: "Control",
          detail: "The existing design. Every variant was measured against it.",
        },
        { name: "Copy only", detail: "Tests H2, invitation, on its own." },
      ],
    },
    {
      head: "Border added",
      cells: [
        { name: "Border only", detail: "Tests H1, visibility, on its own." },
        {
          name: "Border + copy",
          detail:
            "Tests H3, the combined effect, with a longer and a concise placeholder.",
          result: "Variant D, the concise one: +5.8% conversion, shipped sitewide.",
          winner: true,
        },
      ],
    },
  ],
  note: "Traffic split evenly across all cells, with the existing design as control. Run to statistical significance before rollout.",
};

export const execution = {
  heading: "Four variants, one control, evenly split",
  intro:
    "Explore the test cells below. Each variant isolates or combines the two hypotheses so the winning treatment could be attributed to a specific mechanism, not just the new one.",
  decisionsTitle: "Design decisions I made",
  decisionsIntro: "The calls that shaped the test, and the reasoning behind each.",
};

export const designDecisions = [
  {
    decision: "Why four variants, not two",
    reasoning:
      "A single A/B test of a new search bar would only have shown that something changed, not which element drove it. Isolating border and copy in their own cells, and combining them in others, meant a win could be traced to its mechanism rather than to novelty.",
  },
  {
    decision: "Why an in-session exit intercept",
    reasoning:
      "We needed to hear from people at the moment search let them down. So the survey fired in-session, at points of friction and on exit intent, and stayed open-ended, because fixed options would only have echoed our own guesses.",
  },
  {
    decision: "Why an even traffic split",
    reasoning:
      "Every cell, control included, got an equal share of traffic. Visitors were assigned at random and kept in the same cell for the session, so each variant was compared with control on equal terms.",
  },
  {
    decision: "Why test in Qubit before asking IT",
    reasoning:
      "Qubit ran the variants as JS/CSS variations on the live site, so we could show which change worked before asking for IT time. The sitewide build came after, with a measured result attached.",
  },
];

export const impact = {
  heading: "Evidence, not opinion, went to the roadmap",
  /* Three tiles, not the plan's four: "0 IT sprints consumed" has no source. */
  metrics: [
    {
      value: "+5.8%",
      label: "conversion uplift",
      detail:
        "Variant D against control. It reached statistical significance before rolling out sitewide.",
    },
    {
      value: "~10×",
      label: "higher conversion for search users",
      detail: "The behavioral signal that made search worth testing.",
    },
    {
      value: "9–11%",
      label: "cumulative uplift on product pages",
      detail:
        "The same intercept-to-test loop, applied to size selectors, delivery tabs, confirmation pop-ups and add-to-bag buttons.",
    },
  ],
  body: "The winning variant shipped sitewide with a quantified business case attached. Just as importantly, the method stuck: the same intercept feedback to hypothesis to controlled test loop was applied to a series of product page micro changes, size selectors, delivery tabs, confirmation popups, and add to bag buttons, which together added a cumulative 9 to 11% uplift, without committing IT resources to anything unproven.",
  lessonsTitle: "What this project taught me",
  footnote:
    "Case study conducted with Qubit for Arcadia Group. Metrics as publicly reported.",
};

export const lessonsLearned = [
  {
    title: "Intercepts earn their place at the moment of intent",
    body: "Intercept feedback captured intent, not general attitude. Targeting logic, who sees the survey, when, and how often, determined whether the signal was usable at all.",
  },
  {
    title: "Triangulation is what makes feedback actionable",
    body: "Qualitative feedback without behavioral data is a mystery. Joining exit responses with behavioral analytics turned a vague complaint into a prioritized, sized, testable hypothesis.",
  },
  {
    title: "Test both factors at once, not one after the other",
    body: "Putting border and copy into one test, each isolated and then combined, showed which mechanism mattered. Testing them in turn would have taken two rounds and still left the combination untested.",
  },
  {
    title: "Small tests protect big resources",
    body: "The business case required to settle an argument should always run before engineering commits. Evidence travels further with stakeholders than any deck of opinions.",
  },
];
