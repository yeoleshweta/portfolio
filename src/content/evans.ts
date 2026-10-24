/* All copy for /work/evans lives here, not in components.
   Source: "Design_evans.pdf" (one page), the design this page follows.
   - Uplifts are the design's RPV figures. Their sum is 26.55%, so the page says "about 27%", not the design's 26%.
   - "Several million pounds" is in the design without a source. It is kept as written and flagged for review.
   - The design expands only the top-200 card. The other five descriptions are carried over from the previous page.
   - Body text marks bold with **...**. */

export const hero = {
  kicker: "Experimentation portfolio · Metric design",
  title: "Do small wins compound? Six measured experiments, one revenue-per-visitor discipline at Evans",
  lead:
    "A portfolio of small bets across the full journey: each experience individually measured on RPV, each mechanic grounded in live behavioral data, together contributing several million pounds of top-line revenue.",
  meta: [
    { label: "Role", value: "Personalization & Experimentation Specialist" },
    { label: "Team", value: "Capita · Qubit ecosystem · Evans" },
    { label: "Methods", value: "Portfolio experimentation · RPV measurement · Behavioral urgency" },
    { label: "Outcome", value: "2.5%–8.43% RPV per experience · millions in revenue" },
  ],
};

export const sectionNav = [
  { id: "overview", label: "Overview" },
  { id: "tension", label: "01 · The tension" },
  { id: "craft", label: "02 · The craft" },
  { id: "implementation", label: "03 · Implementation" },
  { id: "evidence", label: "04 · Evidence" },
  { id: "learnings", label: "Key learnings" },
];

/* ── Overview ── */
export const overview = {
  title: "A portfolio of small bets, each one measured",
  paragraphs: [
    "Evans posed a different question than its sister brands: not “what’s the one big fix?” but “what do many small, individually-measured improvements add up to?” The program ran as a portfolio: six distinct experiences across the product page, basket, mobile, onboarding, and checkout. Each carried its own measured revenue-per-visitor uplift, and each was grounded in live behavioral data rather than marketing assertion.",
    "Embedded in the Arcadia ecosystem, I worked on experiences serving a customer base that was predominantly not digitally native, which made simplicity, honesty, and orientation design requirements, not niceties.",
  ],
};

/* ── 01 The tension ── */
export const tension = {
  title: "Three constraints that shaped the program",
  cards: [
    {
      title: "1 · Conversion rate wasn’t enough",
      body:
        "A conversion-only scorecard can flatter interventions that convert more people into smaller baskets. Revenue per visitor (conversion rate × average order value, collapsed into one number) holds every experience accountable for the whole commercial outcome. Choosing it was the program’s first analytical decision, made before any experience shipped.",
    },
    {
      title: "2 · An audience that punishes complexity",
      body:
        "Evans’ predominant customer base was not digitally native. Cluttered interfaces, aggressive pop-ups, and manipulative countdowns don’t just underperform with this audience; they break trust. Every urgency and proof mechanic had to be simple, legible, and factually true.",
    },
    {
      title: "3 · The big-bang temptation",
      body:
        "The alternative path, one dramatic redesign, concentrates risk and defies clean measurement. A portfolio of small experiences meant each idea could carry its own business case, its own test, and its own number. Small bets, honestly scored.",
    },
  ],
  quote:
    "This program’s edge wouldn’t come from one heroic change. It would come from many modest, measured, data-grounded improvements, and from a metric strict enough to keep them all honest.",
};

/* ── 02 The craft ── */
export const craft = {
  title: "The experiment portfolio",
  lead:
    "Six experiences across the journey. Every mechanic is grounded in live behavioral data, and every experience is individually scored on RPV. Select a bar to explore each experiment.",
  chartTitle: "RPV uplift per experience",
  chartNote: "Each measured in its own test; uplifts don’t sum",
};

/* Uplifts are the design's figures. `uplift` sets the bar height; `value` is the label shown. */
export const experiments = [
  {
    label: "Social proof",
    value: "+3.34%",
    uplift: 3.34,
    category: "TRUST LAYER · PRODUCT PAGE",
    title: "Social proof messaging",
    description:
      "Displaying real-time visitor counts on product pages to build confidence. Fact-based social proof increases confidence without creating artificial anxiety.",
    note: undefined,
  },
  {
    label: "'Selling Fast!'",
    value: "+3.47%",
    uplift: 3.47,
    category: "URGENCY LAYER · BUCKET/BASKET",
    title: "Urgency badge ('Selling Fast!')",
    description:
      "Showing the badge from trailing 24-hour add-to-bag data, so it appears only on products that are actually moving.",
    note: undefined,
  },
  {
    label: "Top-200 popularity",
    value: "+8.43%",
    uplift: 8.43,
    category: "URGENCY LAYER · PRODUCT PAGE",
    title: "Popularity messaging on top-200 products",
    description:
      "Popularity messaging on products in the top 200 added-to-bag of the previous 24 hours: the portfolio’s biggest single win.",
    note: "Behavioral data as persuasion: local, recent, true.",
  },
  {
    label: "Top-200 mobile",
    value: "+5.62%",
    uplift: 5.62,
    category: "MOBILE LAYER · PRODUCT LISTINGS",
    title: "Top-200 mobile optimization",
    description:
      "Simplifying product listings and filters for mobile users, with clean layout adjustments.",
    note: undefined,
  },
  {
    label: "Welcome message",
    value: "+2.5%",
    uplift: 2.5,
    category: "ONBOARDING LAYER · HOMEPAGE",
    title: "Welcome orientation message",
    description:
      "A clear, helpful onboarding banner explaining how the sizing structure works for new visitors. Clear orientation builds confidence from session start.",
    note: undefined,
  },
  {
    label: "Checkout friction",
    value: "+3.19%",
    uplift: 3.19,
    category: "CHECKOUT LAYER · FORMS",
    title: "Checkout form friction reduction",
    description:
      "Removing non-essential fields and clarifying input requirements during checkout. Minimizing form validation issues to keep purchase momentum.",
    note: undefined,
  },
];

/* ── 03 Implementation ── */
export const implementation = {
  title: "Rigorous execution",
  paragraphs: [
    "Every experience in the portfolio was **measured individually on RPV**: no blended program number hiding weak performers behind strong ones. An experience earned its place with its own uplift, or it didn’t stay.",
    "The urgency mechanics were **factual by construction**. “Selling fast” and popularity flags were computed from trailing 24-hour add-to-bag data. If a product wasn’t actually moving, it carried no badge. For an audience that punishes manipulation, honest scarcity wasn’t just ethics; it was retention strategy.",
    "And the portfolio math was treated with respect: **six uplifts don’t naively sum.** Experiences overlap in audience and surface, and effects interact. The program’s several-million-pound contribution was assessed at the revenue line, not by adding percentages, the kind of discipline that keeps a portfolio’s story credible.",
  ],
};

/* ── 04 Evidence ── */
export const evidence = {
  title: "Measuring the lift",
  stats: [
    { value: "8.43%", label: "best single experience (RPV): popularity messaging on the top-200 added-to-bag products" },
    { value: "6 / 6", label: "experiences individually measured: each carried its own RPV uplift, from 2.5% to 8.43%" },
    { value: "Millions", label: "several million pounds added to top-line performance across the personalization program" },
    { value: "Full journey", label: "product page, basket, mobile, first-visit onboarding, and checkout: persuasion where it helps, simplification where it counts" },
  ],
  quote: {
    text:
      "The Arcadia measurement standard applied here as everywhere: digital investments had to drive true, incremental value (engagement, loyalty, and revenue that would not have happened anyway).",
    attribution: "after Simon Pritchard, Group Digital Director, Arcadia",
  },
};

/* ── Key learnings ── */
export const learnings = {
  kicker: "The growth",
  title: "Key learnings",
  items: [
    {
      title: "Portfolios beat big bangs",
      body:
        "Six modest, individually-measured wins compounded into millions, with less risk, faster learning, and cleaner attribution than any single redesign could deliver. The deeper lesson: an experimentation program is itself a designed system, with its own metric, governance, and cadence.",
    },
    {
      title: "The metric is the strategy",
      body:
        "Choosing RPV over conversion rate changed what “winning” meant for every experience. Conversion can rise while revenue falls; RPV catches it. Metric choice isn’t a reporting detail made after the fact. It is the first design decision, and it disciplines every one that follows.",
    },
    {
      title: "Uplifts don’t sum",
      body:
        "The naive read of this portfolio, which adds six percentages to claim about 27%, is wrong. Knowing why it is wrong (overlapping audiences, interacting effects, different exposure denominators) matters more than any single result. Honest aggregation is where analytical credibility is won or lost.",
    },
  ],
};

export const credit = {
  name: "Shweta Sharma · Quantitative UX Researcher",
  note: "Experimentation within the Arcadia Group ecosystem for Evans. Proprietary metrics generalized for confidentiality.",
};
