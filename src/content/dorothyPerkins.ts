/* All copy for /work/dorothy-perkins lives here, not in components.
   Source: "Case Study.pdf" (five pages), the design this page follows.
   - The 50% is the programme's segmentation share, labelled "as reported" as the design gives it.
   - Specimens use "[Product]" placeholders, as the design does. No real product, city or person names appear.
   - Titles mark their italic words with *...*. */

export const hero = {
  tags: ["Personalization", "Segmentation", "Interaction patterns", "Accessibility"],
  titleLines: ["Dorothy Perkins: why", "weren’t students *saving?*"],
  lead:
    "The data already knew who was shopping. I helped the website show it, with experiences that were simple, under the shopper’s control, and backed by a business case each.",
  meta: [
    { label: "My role", value: "Personalization specialist" },
    { label: "Team", value: "Capita · Qubit, for Dorothy Perkins (Arcadia)" },
    { label: "Methods", value: "Segment analytics · rule-based logic · merchandising" },
    { label: "Platform", value: "Qubit" },
  ],
  stat: {
    value: "50%",
    label: "of UK sales segmented at peak (as reported)",
  },
};

export const sectionNav = [
  { id: "gaps", label: "01 · The gaps" },
  { id: "patterns", label: "02 · The patterns" },
  { id: "components", label: "03 · Components and states" },
  { id: "tokens", label: "04 · Tokens" },
  { id: "accessibility", label: "05 · Accessibility" },
  { id: "results", label: "06 · Results" },
  { id: "reflection", label: "07 · Reflection" },
];

/* ── 01 The gaps ── */
export const gaps = {
  kicker: "01 · The gaps",
  title: "What the data knew, and the site *ignored*",
  lead:
    "Finding data wasn’t the problem. Getting it to show up as something useful, in a way the board could trust, was.",
  stickies: [
    {
      title: "1 · The offer nobody saw",
      body:
        "Students got 10% off, but the discount surfaced at the end of the journey, long after the choice to buy was made.",
      tone: "yellow" as const,
    },
    {
      title: "2 · A national site for regional tastes",
      body:
        "Product performance varied strongly by place. The site still ranked products for one national average that described nobody.",
      tone: "lilac" as const,
    },
    {
      title: "3 · “Personalization” as a buzzword",
      body:
        "Treated as an abstract capability, it stalls. It needed to become concrete, tested treatments the board could read.",
      tone: "yellow" as const,
    },
  ],
};

/* ── 02 The patterns ── */
export const patterns = {
  kicker: "02 · The patterns",
  title: "Two signals, *two decisions*",
  lead:
    "Each gap had more than one possible fix. The choice came down to one question: which option is most honest and most in the shopper’s control?",
  groups: [
    {
      title: "Student pricing: who decides you’re a student?",
      options: [
        {
          tag: "Status quo",
          title: "Discount at checkout",
          body: "Correct, but too late. The offer did no work while people were browsing and deciding.",
          chosen: false,
        },
        {
          tag: "Rejected",
          title: "Infer student status",
          body: "Fragile and full of assumptions. Guessing wrong on price feels intrusive, both ways.",
          chosen: false,
        },
        {
          tag: "Chosen",
          title: "One-tap self-select",
          body: "A toggle in the header. The shopper says who they are, and is rewarded instantly.",
          chosen: true,
        },
      ],
    },
    {
      title: "Merchandising: whose idea of “popular”?",
      options: [
        {
          tag: "Status quo",
          title: "National best-sellers",
          body: "One average ranking for everyone. It described the typical shopper and fitted nobody.",
          chosen: false,
        },
        {
          tag: "Rejected",
          title: "Curated regional picks",
          body: "A merchandiser’s guess about a region, and stale by next week.",
          chosen: false,
        },
        {
          tag: "Chosen",
          title: "Local, last 24 hours",
          body: "Ranked by what people in the area added to their bags yesterday. A fact, not a guess.",
          chosen: true,
        },
      ],
    },
  ],
  note: "on price, being open beats guessing",
};

/* ── 03 Components and states ── */
export const components = {
  kicker: "03 · Components and states",
  title: "Every pattern, broken into *states*",
  lead:
    "Each experience became a small component with defined states and one rule for when it shows. These are recreated specimens with placeholder products, not the original Dorothy Perkins screens.",
  toggle: {
    title: "Student price toggle",
    tag: "StudentToggle · header",
    states: [
      { label: "Off (default)", text: "Student prices", on: false, focus: false },
      { label: "On", text: "Student prices on · 10% off", on: true, focus: false },
      { label: "Keyboard focus", text: "Student prices", on: false, focus: true },
    ],
    spec: [
      { label: "Trigger", text: "The shopper taps it. Nothing is inferred." },
      { label: "Effect", text: "Every price switches straight away, with no reload." },
      { label: "Persists", text: "Across product listings and product pages, so the whole journey is framed by the discount." },
      { label: "State", text: "Shown in words (“on · 10% off”), not just by colour or knob position." },
    ],
  },
  price: {
    title: "Price",
    tag: "Price · regular | student",
    regular: { label: "Regular", name: "[Product name]", price: "£50.00" },
    student: { label: "Student", name: "[Product name]", price: "£45.00", was: "£50.00", note: "Student" },
    spec: [
      {
        label: "Rule",
        text: "The new price comes first. The old price is struck through and also says “was” for screen readers, because strikethrough alone isn’t read out.",
      },
      { label: "Announce", text: "One polite message when the toggle changes (“Showing student prices”), not one per product." },
    ],
  },
  trending: {
    title: "Trending near you",
    tag: "LocalTrending · located | fallback",
    known: {
      label: "Location known",
      heading: "Trending in [your area]",
      link: "Change area",
      items: ["#1 added to bag", "#2", "#3"],
    },
    unknown: {
      label: "Location unknown",
      heading: "Popular across the UK",
      items: ["#1", "#2", "#3"],
    },
    spec: [
      { label: "Trigger", text: "An IP lookup finds the shopper’s region." },
      { label: "Ranking", text: "Most added to bag in that region over the trailing 24 hours." },
      { label: "Fallback", text: "No region found: show the national list rather than a wrong local one." },
      { label: "Open", text: "The heading says where the list comes from. “Change area” is the version I’d add today." },
    ],
  },
  welcome: {
    title: "Welcome and orientation",
    tag: "WelcomeBanner · first visit",
    first: {
      label: "First visit",
      heading: "Welcome to Dorothy Perkins",
      body: "[One line on what’s new or how to get started]",
      close: "Close",
    },
    returning: { label: "Returning or dismissed", text: "Not shown." },
    spec: [
      { label: "Then", text: "Urgency banners on product pages and a welcome popup for first-time visitors." },
      { label: "Now", text: "I’d make it an inline banner, not a popup, so it never covers focus or traps the keyboard." },
    ],
  },
};

/* ── 04 Tokens ── */
export const tokens = {
  kicker: "04 · Tokens",
  title: "The variables behind the *components*",
  lead:
    "A small token set keeps the student state consistent wherever it appears. The token names are illustrative, reconstructed for this case study, and every value is checked against WCAG 2.2 AA.",
  caption: "Illustrative tokens for the student pricing components",
  rows: [
    { token: "color.price.student", value: "#5B3FD4", swatch: "#5B3FD4", usedBy: "Student price, “Student” note", check: "6.76:1 on white" },
    { token: "color.price.was", value: "#5C5C5C", swatch: "#5C5C5C", usedBy: "Struck-through old price", check: "6.0:1 on the card ground" },
    {
      token: "color.toggle.on.bg",
      value: "#5B3FD4 + white text",
      swatch: "#5B3FD4",
      usedBy: "Toggle, on state",
      check: "6.76:1. The live page uses #8B69FA, which is 3.82:1 and ",
      fail: "fails",
    },
    { token: "color.toggle.off.border", value: "#1F1F1F", swatch: "#1F1F1F", usedBy: "Toggle outline, off state", check: "Above 3:1 for 1.4.11 non-text contrast" },
    { token: "size.target.min", value: "44px", swatch: null, usedBy: "Toggle, banner close, “Change area”", check: "Above the 24px minimum in 2.5.8" },
    { token: "radius.toggle", value: "999px (pill)", swatch: null, usedBy: "Toggle", check: "Matches the portfolio pill radius" },
    { token: "motion.price.swap", value: "150ms fade", swatch: null, usedBy: "Price change", check: "Switched off under reduced motion" },
  ],
};

/* ── 05 Accessibility ── */
export const accessibility = {
  kicker: "05 · Accessibility",
  title: "Personalization the shopper *can see* and steer",
  lead:
    "A personalized page is only fair if everyone can tell what changed and why. These rules map the patterns to WCAG 2.2 AA.",
  caption: "Pattern rules and the WCAG 2.2 criteria they support",
  rows: [
    { rule: "The toggle is a real button with its state exposed", criterion: "4.1.2 Name, role, value", practice: "aria-pressed plus visible “on” text, so the state isn’t carried by colour." },
    { rule: "Price changes are announced once", criterion: "4.1.3 Status messages", practice: "One polite message, not one for every price on the page." },
    { rule: "“Was” prices are readable, not just struck through", criterion: "1.3.1 Info and relationships", practice: "Hidden “was” and “student price” text tells screen readers which price is which." },
    { rule: "Student mode stays on across pages", criterion: "3.2.3 Consistent navigation", practice: "Same toggle, same place, same state on listings and product pages." },
    { rule: "Area filters work by keyboard", criterion: "2.1.1 Keyboard", practice: "If areas appear as tabs, use a proper tab list with arrow keys. Otherwise, a plain “Change area” link." },
    { rule: "The welcome never hides focus", criterion: "2.4.11 Focus not obscured", practice: "An inline banner instead of a popup, with a 44px close button." },
  ],
};

/* ── 06 Results ── */
export const results = {
  kicker: "06 · Results",
  title: "From hidden discount to board-level *strategy*",
  stats: [
    { value: "50%", label: "Of UK sales segmented at peak, with these experiences contributing (reported)" },
    { value: "10%", label: "Student discount moved from checkout to the first page a student sees" },
    { value: "Board", label: "Personalization became part of the brand’s growth strategy, discussed at board level" },
  ],
  principleKicker: "Program principle",
  principle: "Keep it simple, and build a business case for every experience before it ships.",
  footnote:
    "Each experience passed a governance check before launch: a control holdout, a clear mechanic and a measurable outcome. Per-experience uplift figures aren’t published here. Segment personalization within the Arcadia Group; proprietary metrics generalised for confidentiality.",
};

/* ── 07 Reflection ── */
export const reflection = {
  kicker: "07 · Reflection",
  title: "What I *learned*",
  cards: [
    {
      title: "Let shoppers steer",
      body: "On a sensitive surface like price, letting people say who they are beats guessing. It’s direct, respectful and immediately rewarding.",
      tone: "white" as const,
    },
    {
      title: "Behaviour beats demographics",
      body: "A national best-seller list describes nobody. Recent local behaviour kept the merchandising relevant without anyone guessing.",
      tone: "white" as const,
    },
    {
      title: "Governance is a feature",
      body: "The control holdout wasn’t red tape. It made every idea state its mechanism and metric before launch, and that’s what earned the board’s trust.",
      tone: "lilac" as const,
    },
  ],
  nextTitle: "If I ran it again",
  next: [
    "Publish each experience’s lift against its control, with sample size and confidence interval.",
    "Design the eligibility check with students, so self-select stays easy and the discount is still fair.",
    "Test the toggle and the price announcements with screen-reader and keyboard users.",
  ],
};
