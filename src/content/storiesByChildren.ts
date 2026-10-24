/* All copy for /work/stories-by-children lives here, not in components.
   Source: "Stories by Children — Case Study.pdf" (7 pages), the design this page follows.
   - Counts that the PDF gives from its Figma audit stay labelled as audit counts.
   - The homepage section table is the only real list of section names; it has no photos or names.
   - Venues, dates, school names and story titles on the mocks are placeholders.
   - Titles mark their italic words with *...*. */

export const hero = {
  tags: ["UX research", "Information architecture", "Component design", "Accessibility for kids"],
  titleLines: ["Stories by Children: a", "reading platform built", "for *two* audiences"],
  lead:
    "Young readers and writers aged 7–16 on one side, the parents, schools and reviewers who guide them on the other. One product, two very different needs.",
  meta: [
    { label: "My role", value: "Lead IA & UI designer" },
    { label: "Team", value: "1 designer · 1 developer · 1 stakeholder" },
    { label: "Timeline", value: "6 weeks" },
    { label: "Method", value: "Lean UX · family usability tests" },
  ],
  cover: {
    filename: "/assets/StoriesByChildren.jpg",
    width: 1588,
    height: 1588,
    alt: "Illustration of children, a lion, a giraffe and other animals reading together in a large open book on a dark blue background.",
  },
  siteLabel: "Visit the live platform at storiesbychildren.com",
  siteHref: "https://www.storiesbychildren.com/",
};

export const sectionNav = [
  { id: "problem", label: "01 · Problem" },
  { id: "design", label: "02 · Design" },
  { id: "components", label: "03 · Components" },
  { id: "tokens", label: "04 · Tokens" },
  { id: "interactions", label: "05 · Interactions" },
  { id: "access", label: "06 · Accessibility" },
  { id: "reflection", label: "07 · Reflection" },
];

/* ── 01 Problem & research ── */
export const problem = {
  title: "Families weren’t *reaching* a story",
  lead:
    "Analytics showed most visitors left before opening a single story. I tested with families, children and parents together, to see how they actually browse side by side.",
  body:
    "Sessions were adapted for children: shorter, with visual prompts, and with a parent in the room. Watching the pair together showed who drives which part: children choose, parents gatekeep and submit.",
  stats: [
    { value: "60%", label: "of visitors never reached a story (analytics, before)", accent: false },
    { value: "50% → 85%", label: "task success across two Lean UX rounds (moderated tests)", accent: true },
    { value: "4+ → 1–2", label: "clicks to reach a story", accent: false },
  ],
  stickies: [
    { tone: "yellow" as const, who: "Kids:", text: "plain white layouts felt “boring”. Colour and illustration made the site feel like it was for them." },
    { tone: "lilac" as const, who: "Kids:", text: "being featured, as a winner or on a profile, was the strongest reason to write." },
    { tone: "yellow" as const, who: "Kids:", text: "stories by children they knew or related to pulled them deeper." },
    { tone: "lilac" as const, who: "Parents:", text: "the old submission flow stopped them completely. Nobody could tell which stories suited which age." },
  ],
};

/* ── 02 Design breakdown ── */
export const design = {
  title: "A homepage that serves *both* readers",
  body:
    "The homepage is 9,022px of content, so its order was the main IA decision. Kid-facing sections that create pull (contests, picks, peers) come first. Parent-facing sections that build trust (news, schools, shop) follow. Each section was tagged by who it’s for.",
  audiences: ["Kids", "Parents", "Both"] as const,
  sections: [
    { n: "01", name: "Header: nav, search, login", who: "Both" as const },
    { n: "02", name: "Hero: “There is a story inside all of us”", who: "Kids" as const },
    { n: "03", name: "Writing contest banner: ages, dates", who: "Both" as const },
    { n: "04", name: "Editors’ pick of the week", who: "Kids" as const },
    { n: "05", name: "Discover our contests", who: "Kids" as const },
    { n: "06", name: "News & announcements", who: "Parents" as const },
    { n: "07", name: "Our authors club", who: "Kids" as const },
    { n: "08", name: "Our achievers", who: "Kids" as const },
    { n: "09", name: "Gallery", who: "Both" as const },
    { n: "10", name: "Our association: schools, universities", who: "Parents" as const },
    { n: "11", name: "New book collection: shop", who: "Parents" as const },
    { n: "12", name: "Instagram & YouTube", who: "Both" as const },
    { n: "13", name: "Top writer this month", who: "Kids" as const },
    { n: "14", name: "Footer: about, careers, contact", who: "Parents" as const },
  ],
  sectionsNote: "Section names as in the Figma file. The full homepage isn’t shown because it contains children’s photos and names.",
  listing: {
    caption:
      "Story listing. Genre chips, age filters and sorting all sit above the grid, so a parent can narrow it before a child starts browsing.",
    note: "Placeholder titles and genres.",
  },
  contest: {
    caption: "Contest cards. Illustration for the child, date, venue and one clear action for the parent.",
    note: "Placeholder dates and venues.",
  },
};

/* ── 03 Components ── */
export const components = {
  title: "8 component sets, *reused* 199 times",
  body:
    "Every screen was assembled from a small set of components with variants for their states. One nav component with 10 variants handles every page’s active and hover state. That made the 21 screens consistent and the prototype cheap to wire.",
  setsNote: "Six of the eight sets are described here.",
  sets: [
    { name: "Nav item", meta: "10 variants · 155 uses", body: "Home, About Us, Story, Book Store, Join Us, each with a default and an active (underlined) state." },
    { name: "Age group select", meta: "3 variants", body: "7–8, 10–12, 13–15 and 15–16 years. The one control both audiences use." },
    { name: "Filter by", meta: "4 variants", body: "Age, School, Category, Publication: how parents and schools narrow the grid." },
    { name: "Sort by", meta: "2 variants", body: "Newest, Oldest, Popular, A–Z, Ratings." },
    { name: "Date range", meta: "4 variants", body: "From and To month pickers for contests and archives." },
    { name: "Carousels", meta: "2 sets · 6 variants", body: "Contest banner and featured strip, advancing on a timer." },
  ],
  anatomy: {
    title: "Anatomy of a story card",
    body:
      "The card is where both audiences meet. A child reads the cover and title. A parent checks the age band and reading time before saying yes.",
    callouts: [
      { n: 1, name: "Age badge", body: "Always on the cover, so a parent can judge suitability without opening the story." },
      { n: 2, name: "Author avatar", body: "Peer visibility: kids engaged more with stories by children like them. In the file this is a photo; I’d use an initial or an illustrated avatar (see 06)." },
      { n: 3, name: "Genre and reading time", body: "“40 minute read” in the file. It tells a child how big a commitment the story is." },
      { n: 4, name: "Title in the display face", body: "Rounded and friendly for the child, in deep teal for strong contrast (10.5:1)." },
      { n: 5, name: "One primary action", body: "Read Now in gold, with Add to Reads as the quieter second choice." },
    ],
    caption: "Recreated with placeholder content, no real child’s work or photo.",
  },
};

/* ── 04 Variables & tokens ── */
export const tokens = {
  title: "From raw values to a token set",
  body:
    "The Figma file worked from raw values: no colour styles, no text styles and no variable collections, just 2 bound variables. I audited every screen to find the values actually in use, then grouped them into tokens. Counts are how often each value appears across the 21 screens.",
  layers: [
    {
      layer: "Global",
      note: "Raw values from the audit",
      items: [
        { name: "brand.teal", hex: "#214545", use: "Headings, panels", count: "383 uses · 10.5:1 on white" },
        { name: "surface.butter", hex: "#FEEDB5", use: "Highlights, menus", count: "24 uses" },
        { name: "text.faint", hex: "#B9B9B9", use: "Captions at 12–14px", count: "87 uses · 2.0:1, fails" },
      ],
    },
    {
      layer: "Semantic",
      note: "What a value means",
      items: [
        { name: "action.gold", hex: "#D4AC28", use: "Buttons, accents", count: "100 uses · fill only" },
        { name: "accent.lilac", hex: "#DEC4FF", use: "Playful accents", count: "5 uses" },
        { name: "accent.bronze", hex: "#8B752C", use: "Links, small accents", count: "96 uses · 4.49:1" },
        { name: "text.body", hex: "#464646", use: "Body copy", count: "135 uses · 9.4:1" },
        { name: "text.muted", hex: "#868686", use: "Secondary copy", count: "149 uses · 3.6:1, fails" },
      ],
    },
    {
      layer: "Component",
      note: "Where it’s used",
      items: [
        { name: "card.age-badge.bg", hex: "", use: "Age badge on the card", count: "" },
        { name: "button.primary.bg", hex: "#D4AC28", use: "Primary button", count: "" },
        { name: "surface.cream", hex: "#FFF8E6", use: "Card and section grounds", count: "27 uses" },
      ],
    },
  ],
  typeScale: [
    { name: "display.lg", spec: "Fredoka One 48", sample: "Reading" },
    { name: "display.md / sm", spec: "Fredoka One 32 · 20", sample: "Top Writer This Month" },
    { name: "body", spec: "Commissioner 20 · 16 · 14", sample: "Once upon a time, in a village by the sea…" },
  ],
  typeNote: "Fredoka for children’s moments, Commissioner for reading. 6 sizes in use, from 10 to 48px.",
  caption: "Illustrative names: the audit is real, the variables are the next step.",
};

/* ── 05 Interaction patterns ── */
export const interactions = {
  title: "254 prototype interactions, *four* patterns",
  body:
    "I built the interactions in the prototype first, then tested them with families. Grouping all 254 connections by trigger shows the system underneath.",
  rows: [
    { label: "Hover: nav and cards change state (Smart Animate, 300ms)", count: 110 },
    { label: "Click: go to a page (Move In, Dissolve or instant)", count: 68 },
    { label: "Click: change a component’s state (dropdowns, toggles)", count: 44 },
    { label: "Click: open an overlay (menus, sign-up, login)", count: 24 },
    { label: "Timer: carousel advances (every 0.8s)", count: 8 },
  ],
  decisions: [
    { title: "Two-step mega menu", body: "Pick a type on the left, then a genre. Two short choices instead of one long list, easier for a young reader to scan." },
    { title: "Role first, then login", body: "Student, Reviewer or School. Each role gets its own path from the first click." },
  ],
  cards: [
    { title: "Why hover changes state", body: "Children point and explore. A visible change on every hover confirmed “this is clickable” for readers still learning web patterns." },
    { title: "Why overlays, not pages", body: "Login and category menus open over the page, so a child never loses the story they were looking at." },
    { title: "What I’d change", body: "Hover-only changes need a focus equivalent. The 0.8s carousels need pause controls. The 2-second page dissolves should shorten and respect reduced motion." },
  ],
};

/* ── 06 Accessibility & content ── */
export const access = {
  title: "Designing for a 7-year-old and their parent",
  lead:
    "The same page has to work for a child who is still learning to read and for an adult deciding what that child sees. So content is written, labelled and gated differently for each.",
  kids: {
    title: "For kids (7–16)",
    items: [
      "Age bands everywhere: 7–8, 10–12, 13–15, 15–16 on every card, filter and contest (“Open for ages 7–10 only”).",
      "Reading time up front: “40 minute read” sets expectations before a child commits.",
      "Short labels, big targets: one or two words per button, large tappable cards.",
      "Pictures carry meaning: illustrated role cards and covers, so a pre-confident reader isn’t relying on text alone.",
      "A friendly display face for headings, with a plain, readable face for the story text itself.",
    ],
  },
  parents: {
    title: "For parents, schools & reviewers",
    items: [
      "Their own entry point: Reviewer and School roles at login, separate from the child’s path.",
      "Control through filters: narrow by age, school, category and publication before a child browses.",
      "Human review before publishing: a reviewer team (with its own About section and careers page) checks stories before they go live.",
      "The detail adults need: dates, venues, eligibility and itineraries live on contest cards, not in the child’s way.",
      "A linear submission flow with progress, preview and confirmation, rebuilt after every parent in testing got stuck.",
    ],
  },
  modelTitle: "Content model: what each story carries",
  model: {
    caption: "Story metadata and who it’s for",
    headers: ["Field", "Example from the file", "Serves", "Why"],
    rows: [
      { field: "Age band", example: "Age: 7–10 years old", serves: "Both", why: "Suitability at a glance; drives filtering" },
      { field: "Genre / type", example: "Adventure · Novel", serves: "Kids", why: "Browsing by interest via the two-step menu" },
      { field: "Reading time", example: "40 minute read", serves: "Kids", why: "Sets expectations for a young reader" },
      { field: "School", example: "[school name]", serves: "Parents", why: "Lets schools find and share their pupils’ work" },
      { field: "Review status", example: "Reviewed before publishing", serves: "Parents", why: "Trust that content is checked by an adult" },
    ],
  },
  wcagTitle: "WCAG 2.2 AA: what the audit found, and the fix",
  wcag: {
    caption: "Accessibility gaps found in the Figma file, with the WCAG criterion and the fix",
    headers: ["Gap", "WCAG", "Fix"],
    rows: [
      { gap: "Grey secondary text #868686 and #B9B9B9 (3.6:1 and 2.0:1)", criterion: "1.4.3 Contrast", fix: "text.muted → #6B6B6B (5.3:1); drop #B9B9B9 for text" },
      { gap: "White text on gold buttons (2.2:1)", criterion: "1.4.3 Contrast", fix: "Teal text on gold (4.9:1, as on the story card above), or near-black (about 8:1)" },
      { gap: "Bronze link text (4.49:1)", criterion: "1.4.3 Contrast", fix: "Darken to #6E5D22 (6.5:1)" },
      { gap: "10–12px text in 130+ text runs", criterion: "Readability for young readers", fix: "14px minimum, 16px for anything a child reads" },
      { gap: "Carousels advancing every 0.8s", criterion: "2.2.2 Pause, stop, hide", fix: "Advance only on click, or add a visible pause control" },
      { gap: "State changes on hover only", criterion: "2.1.1 Keyboard · 1.4.13", fix: "The same change on keyboard focus" },
    ],
  },
  privacy: {
    title: "Children’s privacy",
    body:
      "Peer visibility motivated kids, but the screens show children’s photos, full names and schools together. Today I’d show a first name and initial with an illustrated avatar, and only with a parent’s consent.",
    signup:
      "The sign-up overlay asks a child for email and password, with a marketing opt-in. I’d make accounts parent-held, with the opt-in off by default.",
  },
};

/* ── 07 Reflection ── */
export const reflection = {
  title: "What I’d tell the *next* designer",
  cards: [
    { title: "Design for the pair, not the person", body: "Testing children with their parents showed the real decision: a child picks, a parent approves. Every card had to answer both." },
    { title: "Components first paid off", body: "8 component sets carried 21 screens and 254 interactions. Changing the nav once changed it everywhere." },
    { title: "Formalise tokens early", body: "Raw values crept in: four greys for text where two would do. Variables from day one would have caught the contrast failures too." },
    { title: "Safety is a design problem", body: "For children, privacy and moderation aren’t policy add-ons. They shape the card, the sign-up and the login." },
  ],
  nextTitle: "Next steps",
  next: [
    "Turn the token audit into a Figma variables collection with Light mode, and bind every screen to it.",
    "Fix the contrast, text-size and motion gaps above, then test with children using a keyboard and a screen reader.",
    "Replace photos and full names with consented avatars and first-name credits.",
  ],
};
