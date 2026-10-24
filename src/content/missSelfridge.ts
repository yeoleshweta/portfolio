/* All copy for /work/miss-selfridge lives here, not in components.
   Source: "Miss Selfridge — Case Study.pdf" (4 pages), the design this page follows.
   - The 47%, 90 / 10 and 50 / 25 / 25 figures are the programme's, as the PDF gives them.
   - The size of the lift is confidential and is never shown.
   - Titles mark their italic words with *...*. */

export const hero = {
  tags: ["Experimentation", "Measurement", "Personalization"],
  titleLines: ["Miss Selfridge: would", "they have bought", "*anyway?*"],
  lead:
    "A display program built to find new customers, held to a causal standard: a randomized placebo holdout, a two-tailed test, and a success metric matched to the mission.",
  meta: [
    { label: "My role", value: "Measurement & personalization specialist" },
    { label: "Team", value: "Qubit · for Miss Selfridge (Arcadia)" },
    { label: "Methods", value: "Holdout design · segmentation · significance testing" },
    { label: "Season", value: "Black Friday to Christmas" },
  ],
  stat: {
    value: "47%",
    label: "of campaign-driven purchases came from customers new to the brand",
  },
};

export const sectionNav = [
  { id: "question", label: "01 · The question" },
  { id: "experiment", label: "02 · Experiment design" },
  { id: "budget", label: "03 · Budget by job" },
  { id: "results", label: "04 · Results" },
  { id: "reflection", label: "05 · Reflection" },
];

/* ── 01 The question ── */
export const question = {
  title: "The dashboard that’s *always* green",
  lead: "Every campaign claims the sales that follow it. The honest question is how many of those people would have bought with no ad at all.",
  body:
    "Miss Selfridge’s display program had three jobs: find new customers, convert prospects, and grow the value of existing ones. The risk wasn’t a failing campaign. It was one that looked successful while mostly recycling demand that already existed.",
  stickies: [
    { title: "1 · The attribution trap", body: "Retargeting reaches people already close to buying, then takes credit when they do. Some would have bought anyway.", tone: "yellow" as const },
    { title: "2 · One budget, three jobs", body: "Acquisition, conversion and retention compete for the same spend. Optimising a blended number quietly starves acquisition.", tone: "lilac" as const },
    { title: "3 · A calendar that never stops", body: "Black Friday, Cyber Monday and the Christmas run-up changed the trade plan daily. The measurement couldn’t need a frozen campaign.", tone: "yellow" as const },
  ],
};

/* ── 02 Experiment design ── */
export const experiment = {
  title: "Measured against doing *nothing*, not against zero",
  lead:
    "Every eligible person was randomly assigned to one of two arms before seeing anything. Both arms got the same targeting and the same spend logic. The only difference was the creative.",
  steps: [
    { label: "Step 1 · Audience", text: "Eligible shoppers, segmented by funnel job" },
    { label: "Step 2 · Random assignment", text: "Each person is randomly placed in one arm" },
  ],
  arms: [
    {
      name: "Treated arm",
      share: "90%",
      creative: "Live Miss Selfridge creative",
      note: "Same audience and investment logic, with the real ad.",
      tone: "treated" as const,
    },
    {
      name: "Holdout arm",
      share: "10%",
      creative: "Blank placebo ad",
      note: "Same audience and investment logic, but a blank ad. Any difference is caused by the advertising itself.",
      tone: "holdout" as const,
    },
  ],
  formula: "incremental lift = treated conversion rate − holdout conversion rate",
  formulaNote: "Checked with a two-tailed significance test, because an ad can hurt as well as help.",
  decisionsTitle: "The decisions behind the test",
  decisionsCaption: "Each design choice, the alternative, and why",
  decisions: [
    { decision: "Blank-ad placebo holdout", instead: "Comparing exposed vs unexposed people", why: "Exposed people differ from unexposed ones. A placebo keeps both arms alike, so only the creative differs." },
    { decision: "10% holdout", instead: "A 50/50 split", why: "Keeps 90% of spend working through peak season while still giving a clean comparison." },
    { decision: "Two-tailed test", instead: "One-tailed (only looking for a gain)", why: "A campaign can reduce sales. Testing both directions makes a positive result harder to fake." },
    { decision: "New Customer Rate as the headline metric", instead: "Blended ROI", why: "The mission was new customers. ROI alone rewards retargeting people who’d buy anyway." },
    { decision: "ROI never reported alone", instead: "A single ROI figure", why: "Incremental ROI was always shown with New Customer Rate, so the program was judged on its job." },
    { decision: "Creative refreshed without pausing", instead: "Freezing the campaign for a clean read", why: "Randomization holds even as creative changes daily, because both arms see the same calendar." },
  ],
};

/* ── 03 Budget by job ── */
export const budget = {
  title: "Fenced by funnel job, *not* by channel habit",
  lead:
    "Each job got its own share of spend and its own scorecard, so cheap retargeting conversions couldn’t quietly absorb the acquisition budget.",
  jobs: [
    { name: "Prospecting", share: 50, body: "Reach shoppers new to the brand. Segments exclude anyone already familiar with it.", scored: "Scored on: New Customer Rate" },
    { name: "Conversion", share: 25, body: "Help engaged prospects buy, with its own scorecard.", scored: "" },
    { name: "Retention", share: 25, body: "Grow lifetime value from existing customers, with its own scorecard.", scored: "" },
  ],
  footnote: "No blended number — each job kept its own scorecard.",
};

/* ── 04 Results ── */
export const results = {
  title: "What we could *defend*",
  cards: [
    { value: "47%", label: "New Customer Rate", body: "Nearly half of campaign-driven purchases came from people new to the brand." },
    { value: "Significant", label: "Incremental lift", body: "Incremental lift over the placebo holdout, on a two-tailed test." },
    { value: "50 / 25 / 25", label: "Budget by job", body: "Budget held by job through the peak trading season." },
  ],
  meaning: {
    title: "What 47% means",
    body:
      "It describes who the campaign’s buyers were: 47% hadn’t bought from Miss Selfridge before. It is not the size of the lift. The lift itself was significant against the holdout; its size is confidential.",
  },
  changed: {
    title: "What changed",
    body:
      "The program was judged on finding new customers, not on recycled demand. That made it possible to defend acquisition spend through peak season.",
  },
  footnote: "Proprietary metrics are generalised for confidentiality.",
};

/* ── 05 Reflection ── */
export const reflection = {
  title: "What I’d tell the *next* team",
  cards: [
    { title: "The metric must match the mission", body: "A program meant to find new customers can’t be judged on blended ROI. Choosing the metric was the most important design decision in the study." },
    { title: "Test both directions", body: "Admitting an ad could hurt, and testing for it, is what makes a positive result believable." },
    { title: "The holdout is the product", body: "The most important number wasn’t ROI. It was the holdout’s conversion rate. Without it, retargeting flatters itself." },
    { title: "Placebos cost money", body: "Blank ads are bought impressions. Today I’d look at ghost-ad methods, which log who would have seen an ad instead of paying to show a blank one." },
  ],
  nextTitle: "If I ran it again",
  next: [
    "Agree the minimum detectable lift and the sample size before launch, and write them down.",
    "Report the lift with a confidence interval, not just “significant”.",
    "Keep a small always-on holdout, so every season has its own baseline.",
  ],
  reading: {
    label: "Further reading:",
    title: "Incrementality tests 101: intent-to-treat, PSA, ghost ads and ghost bids",
    source: "Remerge",
    href: "https://www.remerge.io/blog/incrementality-tests-101-intent-to-treat-psa-ghost-ads-and-ghost-bids/",
  },
};
