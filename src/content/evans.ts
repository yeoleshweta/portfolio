/* All copy for /work/evans lives here, not in components.
   Source: "Case Study.pdf" (four pages), the design this page follows.
   - Uplifts are the design's RPV figures. Their sum is 25.58%, shown as 25.6%.
   - "Several million pounds" is in the design marked "(reported)" with no source here. Kept and flagged.
   - Specimens use placeholder products and illustrative wording, as the design says.
   - Titles mark their italic words with *...*. */

export const hero = {
  tags: ["Experimentation", "Personalization", "Interaction patterns", "Accessibility"],
  titleLines: ["Evans: do small wins", "*compound?*"],
  lead:
    "Six small experiences across the shopping journey, each tested on its own and judged on one metric: revenue per visitor.",
  meta: [
    { label: "My role", value: "Personalization & experimentation specialist" },
    { label: "Team", value: "Capita · Qubit, for Evans (Arcadia)" },
    { label: "Methods", value: "A/B testing · behavioural data · RPV" },
    { label: "Audience", value: "Mostly mobile, not digitally native" },
  ],
  stat: {
    value: "+2.5% to +8.43%",
    label: "revenue-per-visitor uplift, each experience in its own test",
  },
};

export const sectionNav = [
  { id: "question", label: "01 · The question" },
  { id: "portfolio", label: "02 · The portfolio" },
  { id: "patterns", label: "03 · Interaction patterns" },
  { id: "honest", label: "04 · Honest by design" },
  { id: "results", label: "05 · Results" },
  { id: "reflection", label: "06 · Reflection" },
];

/* ── 01 The question ── */
export const question = {
  title: "Many small bets, or *one* big redesign?",
  lead:
    "Evans didn’t need one dramatic fix. The question was what many small, honestly measured improvements would add up to.",
  stickies: [
    {
      title: "1 · Conversion rate wasn’t enough",
      body: "More orders can still mean less money if baskets shrink. Revenue per visitor (RPV) catches both.",
      tone: "yellow" as const,
    },
    {
      title: "2 · An audience that punishes complexity",
      body: "Most Evans shoppers weren’t digitally native. Clutter, pop-ups and fake countdowns don’t just underperform here; they break trust.",
      tone: "lilac" as const,
    },
    {
      title: "3 · The big-bang temptation",
      body: "One redesign concentrates risk and muddies measurement. Small experiences each carry their own case, test and number.",
      tone: "yellow" as const,
    },
  ],
};

/* ── 02 The portfolio ── */
export const portfolio = {
  title: "Six experiences, each *scored* on its own",
  lead:
    "Every experience ran as its own test against a control and kept its place only if it earned an RPV uplift. There was no blended number to hide weak ideas behind strong ones.",
  /* `uplift` sets the bar length, relative to the largest. `value` is the label shown. */
  bars: [
    { category: "Product page", label: "Social proof", value: "+2.50%", uplift: 2.5, best: false },
    { category: "Product page", label: "“Selling fast” badge", value: "+3.34%", uplift: 3.34, best: false },
    { category: "Product page", label: "Top-200 popularity", value: "+8.43%", uplift: 8.43, best: true },
    { category: "Mobile", label: "Mobile experience", value: "+5.62%", uplift: 5.62, best: false },
    { category: "Home page", label: "Sizing welcome banner", value: "+2.50%", uplift: 2.5, best: false },
    { category: "Checkout", label: "Form friction removed", value: "+3.19%", uplift: 3.19, best: false },
  ],
  note: "each bar is its own test — these don’t add up",
};

/* ── 03 Interaction patterns ── */
export type SpecimenVisual = {
  badge?: string;
  meta?: string;
  line?: string;
  chips?: string[];
  heading?: string;
  lines?: string[];
  label?: string;
  value?: string;
  helper?: string;
};

export const specimenPlaceholders = {
  productName: "[Product name]",
  productPrice: "[price]",
};

export const patterns = {
  title: "Each pattern has a *rule*, not just a look",
  lead:
    "Every experience is a small, reusable component with three parts: a trigger, what it shows, and when it stays hidden. The last part mattered most. If a signal isn’t true, the component doesn’t render.",
  specimens: [
    {
      kind: "proof" as const,
      title: "Social proof",
      rpv: "+2.50% RPV",
      visual: { line: "12 people are viewing this now" } as SpecimenVisual,
      rows: [
        { label: "Trigger", text: "Real-time visitor count on the product page" },
        { label: "Shows", text: "One plain line of text near the price" },
        { label: "Hidden", text: "When the count is low enough to be meaningless" },
      ],
    },
    {
      kind: "badge" as const,
      title: "“Selling fast” badge",
      rpv: "+3.34% RPV",
      visual: { badge: "Selling fast", meta: "Size 18 selected" } as SpecimenVisual,
      rows: [
        { label: "Trigger", text: "Stock in the selected size falls below a threshold" },
        { label: "Shows", text: "A text badge, no timer, no flashing" },
        { label: "Hidden", text: "When stock is healthy" },
      ],
    },
    {
      kind: "popular" as const,
      title: "Top-200 popularity",
      rpv: "+8.43% RPV · best result",
      visual: { badge: "Popular · top 200 today" } as SpecimenVisual,
      rows: [
        { label: "Trigger", text: "Item is in the top 200 added to bag over the last 24 hours" },
        { label: "Shows", text: "A popularity label: local, recent and true" },
        { label: "Hidden", text: "When the item drops out of the top 200" },
      ],
    },
    {
      kind: "mobile" as const,
      title: "Mobile experience",
      rpv: "+5.62% RPV",
      visual: { chips: ["Size 18", "Dresses", "Under 50"] } as SpecimenVisual,
      rows: [
        { label: "Trigger", text: "Visitor on a mobile device" },
        { label: "Shows", text: "Simpler listings and filters, with large tap targets" },
        { label: "Hidden", text: "On desktop, where the full layout fits" },
      ],
    },
    {
      kind: "welcome" as const,
      title: "Sizing welcome banner",
      rpv: "+2.50% RPV",
      visual: {
        heading: "New here?",
        lines: ["Here’s how our sizing works.", "Find your fit in two steps."],
      } as SpecimenVisual,
      rows: [
        { label: "Trigger", text: "First visit to the home page" },
        { label: "Shows", text: "A short banner explaining how sizing works" },
        { label: "Hidden", text: "For returning visitors, and once dismissed" },
      ],
    },
    {
      kind: "checkout" as const,
      title: "Checkout friction removed",
      rpv: "+3.19% RPV",
      visual: {
        label: "Postcode",
        value: "SW1A",
        helper: "Enter a full UK postcode, like SW1A 1AA",
      } as SpecimenVisual,
      rows: [
        { label: "Trigger", text: "Every checkout session" },
        { label: "Shows", text: "Fewer fields, clear input rules, errors next to the field" },
        { label: "Removed", text: "Non-essential fields" },
      ],
    },
  ],
  footnote:
    "Recreated specimens with placeholder products, built to show each rule. They are not the original Evans screens, and message wording is illustrative.",
};

/* ── 04 Honest by design ── */
export const honest = {
  title: "Persuasion that’s *true*, and readable",
  lead:
    "For an audience that isn’t digitally native, manipulation doesn’t just fail; it costs trust. So the rules doubled as accessibility rules, checked against WCAG 2.2 AA.",
  caption: "Pattern rules and the WCAG 2.2 criteria they support",
  rows: [
    { rule: "No countdown timers", criterion: "2.2.1 Timing adjustable", practice: "Urgency comes from real stock and demand, never a clock that pressures a slower shopper." },
    { rule: "Badges are words, not colour", criterion: "1.4.1 Use of colour", practice: "“Selling fast” and “Popular” carry meaning in text; colour only supports it." },
    { rule: "Live counts aren’t announced on every change", criterion: "4.1.3 Status messages", practice: "The visitor line updates quietly instead of interrupting a screen-reader user." },
    { rule: "Errors next to the field, in plain words", criterion: "3.3.1 · 3.3.3 Error identification and suggestion", practice: "The checkout says what’s wrong and how to fix it, with an example." },
    { rule: "Don’t ask twice", criterion: "3.3.7 Redundant entry", practice: "Removing non-essential fields also cut repeated information at checkout." },
    { rule: "Big tap targets on mobile", criterion: "2.5.8 Target size (minimum)", practice: "Filter chips sized well above the 24px minimum." },
  ],
};

/* ── 05 Results ── */
export const results = {
  title: "Small wins, *honestly* counted",
  stats: [
    { value: "+8.43%", label: "Best single uplift: top-200 popularity messaging", tone: "accent" as const },
    { value: "6", label: "Experiences, each measured on RPV in its own test", tone: "accent" as const },
    { value: "Millions", label: "Several million pounds of added revenue, assessed at the revenue line (reported)", tone: "ink" as const },
  ],
  sum: {
    formula: "2.5 + 3.34 + 8.43 + 5.62 + 2.5 + 3.19 = 25.6%",
    verdict: "→ not the program’s lift",
    body:
      "The uplifts don’t add up. The experiences overlap in audience and page, their effects interact, and each was measured on a different group of visitors. The program’s contribution was measured at the revenue line instead.",
  },
  footnote:
    "Experimentation within the Arcadia Group for Evans. Proprietary metrics generalised for confidentiality. Arcadia’s measurement standard applied: investments are judged on incremental value, meaning revenue that wouldn’t have happened anyway.",
};

/* ── 06 Reflection ── */
export const reflection = {
  title: "What I’d tell the *next* team",
  cards: [
    {
      title: "Portfolios beat big bangs",
      body: "Many modest, measured wins added up, with less risk and faster learning than one redesign. It took team alignment, governance and a steady cadence, not just code.",
      tone: "white" as const,
    },
    {
      title: "The metric is the strategy",
      body: "Choosing RPV early changed what winning meant for every experience. Conversion can rise while revenue falls; RPV catches both.",
      tone: "white" as const,
    },
    {
      title: "Honest signals win twice",
      body: "The best result came from the most truthful pattern: real, recent popularity. For this audience, truth was also the best persuasion.",
      tone: "white" as const,
    },
    {
      title: "Uplifts don’t sum",
      body: "Knowing why you can’t add them up matters more than any single result.",
      tone: "lilac" as const,
    },
  ],
  nextTitle: "If I ran it again",
  next: [
    "Report each uplift with its confidence interval and sample size, not just the point estimate.",
    "Keep a global holdout, a small group who see none of the six, to measure the combined effect directly.",
    "Test the patterns with screen-reader and keyboard users, not just on revenue.",
  ],
};
