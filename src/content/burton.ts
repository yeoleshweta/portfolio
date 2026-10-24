/* All copy for /work/burton lives here, not in components.
   Source: "Burton — Case Study.pdf" (five pages), the design this page follows.
   - The +11.6% is the design's figure, matching the brief and the homepage metric.
   - Tile specimens use placeholder locations and illustrative copy, as the design says.
   - Titles mark their italic words with *...*. */

export const hero = {
  tags: ["Contextual personalization", "Data integration", "Interaction patterns", "Accessibility"],
  titleLines: ["Burton: should the", "homepage check the", "*forecast?*"],
  lead:
    "Stores dress their windows for the weather. The website didn’t. One contained homepage tile joined local weather to visitor location, and was tested properly.",
  meta: [
    { label: "My role", value: "Personalization specialist" },
    { label: "Team", value: "Capita · Qubit, for Burton (Arcadia)" },
    { label: "Methods", value: "Data integration · dynamic content · A/B test" },
    { label: "Surface", value: "Homepage, one tile" },
  ],
  stat: {
    value: "+11.6%",
    label: "conversion uplift across all users, against a control",
  },
};

export const sectionNav = [
  { id: "gaps", label: "01 · The gaps" },
  { id: "pattern", label: "02 · Working out the pattern" },
  { id: "logic", label: "03 · Interaction logic" },
  { id: "component", label: "04 · The component" },
  { id: "tokens", label: "05 · Tokens" },
  { id: "accessibility", label: "06 · Accessibility" },
  { id: "results", label: "07 · Results" },
  { id: "reflection", label: "08 · Reflection" },
];

/* ── 01 The gaps ── */
export const gaps = {
  title: "A shop window that couldn’t see the *weather*",
  lead: "The fix wasn’t more data about the customer. It was better use of data about their world.",
  stickies: [
    {
      title: "1 · Context blindness",
      body: "Shoppers react to weather in predictable ways: rain sells raincoats, sun sells T-shirts. The homepage ignored all of it.",
      tone: "yellow" as const,
    },
    {
      title: "2 · The data lived outside",
      body: "No surveys or new tracking needed. Weather came from an external service; location came from the visitor’s IP. The work was the join.",
      tone: "lilac" as const,
    },
    {
      title: "3 · The gimmick risk",
      body: "Context-aware design fails when it’s clever instead of useful. It had to be one useful thing in one place, with a number attached.",
      tone: "yellow" as const,
    },
  ],
};

/* ── 02 Working out the pattern ── */
export type Option = { tag: string; title: string; body: string; chosen: boolean };

export const pattern = {
  title: "How big, how fresh, and how to *say it*",
  lead:
    "Three decisions shaped the experience. Each time, the simpler option was also the one that could be measured cleanly.",
  decisions: [
    {
      question: "Scope: how much of the site reacts to weather?",
      options: [
        { tag: "Status quo", title: "Nothing changes", body: "The same homepage in a heatwave and a downpour.", chosen: false },
        { tag: "Rejected", title: "Weather-aware sitewide", body: "Over-built and hard to test. Too many moving parts to know what caused what.", chosen: false },
        { tag: "Chosen", title: "One homepage tile", body: "The highest-traffic surface, one mechanic, one measurable outcome.", chosen: true },
      ] as Option[],
    },
    {
      question: "Freshness: when is the weather looked up?",
      options: [
        { tag: "Rejected", title: "Stale or approximate", body: "Yesterday’s weather, or a city 200 miles away. A wrong forecast is worse than none.", chosen: false },
        { tag: "Chosen", title: "Live lookup per session", body: "The visitor’s area and current conditions, checked live. Freshness and accuracy were the quality bar.", chosen: true },
      ] as Option[],
    },
    {
      question: "Voice: how does the tile talk about the weather?",
      options: [
        { tag: "Framing A", title: "Data-led", body: "States the local weather plainly and offers the matching range.", chosen: false },
        { tag: "Framing B", title: "Brand-led", body: "Uses the brand’s own voice and its “B Prepared” line.", chosen: false },
        { tag: "Framing C", title: "Aspiration-led", body: "Leads with photography and mood rather than facts.", chosen: false },
      ] as Option[],
    },
  ],
  rotated: "all three rotated: keep the tile fresh, keep the test clean",
};

/* ── 03 Interaction logic ── */
export const logic = {
  title: "From IP address to *raincoat*",
  lead:
    "The pattern is a short chain of decisions. Every step has a fallback, so a failed lookup never shows a broken or wrong tile.",
  steps: [
    { name: "Locate", text: "IP lookup finds the visitor’s area, in session." },
    { name: "Look up", text: "A live weather service returns temperature and rainfall for that area." },
    { name: "Classify", text: "Conditions map to a weather state, such as sunny or rain." },
    { name: "Match", text: "The state picks a product range and a creative framing." },
    { name: "Render", text: "The tile shows the condition in words, a message and one call to action." },
  ],
  fallbacksTitle: "Fallbacks",
  fallbacks: [
    "No location found: show the default seasonal tile, not a guess.",
    "Weather service slow or down: show the default tile, so the page never waits on the weather.",
    "Conditions don’t fit a defined state: show the default tile.",
  ],
  footnote:
    "The live page describes sunny and rain states. Other states and the exact fallback rules are my reconstruction of the pattern.",
};

/* ── 04 The component ── */
export type Framing = "data" | "brand" | "aspiration";
export type WeatherState = "rain" | "sun";

export type TileSpec = {
  state: WeatherState;
  framing: Framing;
  label: string;
  bar: string;
  message?: string;
  photo?: string;
  cta: string;
};

export const component = {
  title: "One tile, two weathers, three *voices*",
  lead:
    "The tile is one component with two inputs: weather state and framing. These are recreated specimens, not the original Burton UI. Location is a placeholder and the copy is illustrative.",
  cardTitle: "Weather tile",
  cardTag: "WeatherTile · state × framing",
  tiles: [
    {
      state: "rain" as const,
      framing: "data" as const,
      label: "Rain × data-led",
      bar: "[Your area] · 11°C · Rain",
      message: "Made for a day like today. Trench coats and waterproof jackets, a click away.",
      cta: "Shop raincoats",
    },
    {
      state: "sun" as const,
      framing: "data" as const,
      label: "Sun × data-led",
      bar: "[Your area] · 24°C · Sunny",
      message: "Made for a day like today. Short sleeves and lightweight chinos, a click away.",
      cta: "Shop summer essentials",
    },
    {
      state: "rain" as const,
      framing: "brand" as const,
      label: "Rain × brand-led",
      bar: "[Your area] · Rain",
      message: "Showers on the way? B Prepared with our water-repellent range.",
      cta: "Shop rainwear",
    },
    {
      state: "rain" as const,
      framing: "aspiration" as const,
      label: "Rain × aspiration-led",
      bar: "[Your area] · Rain",
      photo: "[Photo · alt text describes the look]",
      message: "Heavy knits and protective layers for damp afternoons.",
      cta: "Explore rainwear",
    },
  ] as TileSpec[],
  spec: [
    { label: "Inputs", text: "Weather state (sunny, rain, default) and framing (data, brand, aspiration)." },
    { label: "Always", text: "The condition is written out in words. The icon and colour only support it." },
    { label: "One CTA", text: "The button names the range it opens, and it matches the weather." },
    { label: "Stable", text: "The tile is set at page load and doesn’t change while someone is reading it." },
  ],
};

/* ── 05 Tokens ── */
export const tokens = {
  title: "Weather as a *theme*, not a reskin",
  lead:
    "Only the tile’s top bar changes with the weather. Body text and buttons stay the same in every state, so contrast is checked once. These are the site’s own tokens, with the design’s weather colours mapped onto them; the ratios are recomputed on those tokens.",
  caption: "Tokens for the weather tile, on the portfolio theme",
  rows: [
    { token: "--color-sticky", value: "#FFF3B8", swatch: "#FFF3B8", usedBy: "Sunny top bar", check: "Body ink on it 15.2:1" },
    { token: "--color-text-secondary", value: "#595959", swatch: "#595959", usedBy: "Sunny and rain location and condition line", check: "6.3:1 on the sunny bar and on the rain ground" },
    { token: "--color-bg", value: "#F2F2F2", swatch: "#F2F2F2", usedBy: "Rain top bar, photo ground", check: "Body ink on it 15.2:1" },
    { token: "--color-text", value: "#1C1C1C", swatch: "#1C1C1C", usedBy: "Message text, CTA background", check: "White CTA text 17.0:1" },
    { token: "--color-surface", value: "#FFFFFF", swatch: "#FFFFFF", usedBy: "Tile container, CTA text", check: "Body ink on it 17.0:1" },
    { token: "tile.cta.height", value: "44px", swatch: null, usedBy: "Call-to-action button", check: "Above the 24px minimum in 2.5.8" },
    { token: "--radius-sm", value: "18px", swatch: null, usedBy: "Tile container", check: "Same in every state" },
  ],
  footnote:
    "The live demo uses yellow and slate gradients behind the bar. Flat tokens are simpler to check and keep consistent.",
};

/* ── 06 Accessibility ── */
export const accessibility = {
  title: "Contextual, and still *predictable*",
  lead:
    "A page that changes with the weather must still make sense to every visitor. These rules map the tile to WCAG 2.2 AA.",
  caption: "Weather tile rules and the WCAG 2.2 criteria they support",
  rows: [
    { rule: "Condition in words, not just an icon or colour", criterion: "1.4.1 Use of colour · 1.1.1 Non-text content", practice: "“11°C · Rain” is text. The icon is decorative and hidden from screen readers." },
    { rule: "Aspiration photos describe the look", criterion: "1.1.1 Non-text content", practice: "Alt text names the outfit and the weather, so the framing still works without the image." },
    { rule: "No auto-rotating carousel", criterion: "2.2.2 Pause, stop, hide", practice: "Framings vary between visitors or visits, never on a timer in front of someone. If they ever auto-rotate, add a pause button." },
    { rule: "The tile doesn’t change while being read", criterion: "3.2.5 Change on request (AAA, used as a guide)", practice: "Weather is checked once at page load. No live update mid-session." },
    { rule: "CTA names its destination", criterion: "2.4.4 Link purpose", practice: "“Shop raincoats”, not “Shop now”, so the link makes sense out of context." },
    { rule: "The page never waits on the weather", criterion: "Performance, not WCAG", practice: "A default tile renders if the lookup is slow, so assistive tech users don’t meet an empty slot." },
  ],
};

/* ── 07 Results ── */
export const results = {
  title: "One tile, *one* number",
  stats: [
    { value: "+11.6%", label: "Conversion uplift across all users, from the weather tile tested against a control" },
    { value: "1", label: "Contained mechanic on the homepage, with no sitewide changes" },
    { value: "3", label: "Creative framings rotated within the tile: data, brand and aspiration" },
  ],
  reading: {
    kicker: "Reading the number",
    body:
      "The controlled test supports saying the tile caused the uplift. Because the three framings rotated, it can’t say which framing did the most work. Sample size and confidence interval aren’t published here.",
  },
  footnote:
    "Contextual personalization within the Arcadia Group for Burton. Proprietary metrics generalised for confidentiality.",
};

/* ── 08 Reflection ── */
export const reflection = {
  title: "What I *learned*",
  cards: [
    {
      title: "Context is a dataset",
      body: "Personalization here wasn’t about collecting more on the customer. It joined the world around them to the moment they arrived.",
      tone: "white" as const,
    },
    {
      title: "The shop-window principle",
      body: "Dressing the window for the weather is the oldest merchandising instinct. Online, it only needs to be simple and correct.",
      tone: "white" as const,
    },
    {
      title: "Contain the mechanic",
      body: "Keeping it to one tile made the test clean and the launch safe. The best experiments match their surface area to their question.",
      tone: "lilac" as const,
    },
  ],
  nextTitle: "If I ran it again",
  next: [
    "Test the three framings against each other, not just together against control.",
    "Report the uplift with its sample size and confidence interval.",
    "Check the tile with screen-reader users, especially the aspiration framing with photos.",
  ],
};
