import type { Tldr } from "./caseStudyBriefs";

/* All copy for /work/fuel-design-system lives here, not in components.
   Confidentiality rules for this study:
   - no dollar figures from the OKR board, no real names (owners are redacted in images)
   - time saving is always "reported by PMs and observed", never "measured"
   - token names are illustrative examples
   - components handed to Fuel: say plainly that merge status was never confirmed */

const IMG = "/work/fuel-survey";

export const hero = {
  category: "Case study · John Deere · IT Quality",
  subtitle:
    "John Deere's product managers wanted feedback from their users, but every survey had to go through a developer. I researched that process, designed Deere Survey (a self-serve survey builder made from the Fuel design system) and helped build Fuel itself along the way.",
  chips: ["UX research", "Product design", "Design systems", "Accessibility"],
  role: "UX Researcher and Designer",
  team: "IT Quality + Fuel design system",
  timeline: "Jan–Aug 2024",
};

export const timeCard = {
  label: "Time to build one survey",
  before: "~3 days",
  after: "~30",
  afterUnit: "min",
  body: "Used by 250 internal product teams. No developer needed to build or publish a survey.",
  note: "reported by PMs + what I observed",
};

export const tldr: Tldr & { summary: string } = {
  summary: "PMs stopped waiting on developers to hear from their users.",
  problem:
    "Each survey was a custom build. A PM asked IT Quality, a developer built it, and only then could it go to users.",
  role: "Researched the old process, designed the product end to end, and built its components from Fuel.",
  team: "IT Quality product team, working with the Fuel design system team.",
  timeline: "January to August 2024.",
  methods: "Contextual inquiry with PMs and IT Quality, process mapping, design critique, accessibility review.",
  outcome:
    "PMs build, translate, brand and publish surveys themselves, using standard questions so results compare across products.",
  decision:
    "Fund a self-serve builder on Fuel instead of more one-off developer builds, and feed its new components back into Fuel.",
};

export const stats = [
  { value: "250", label: "internal product teams used the tool" },
  { value: "~30 min", label: "to build a survey, down from ~3 days" },
  { value: "0", label: "developer hand-offs to build or publish", highlight: true },
  { value: "1", label: "design system behind every screen: Fuel" },
];

export const problem = {
  lead: "Product teams across John Deere wanted to ask their users how things were going. There was no tool for it. A PM wrote to the IT Quality team, a developer built that one survey by hand, and the PM waited. I sat in on that process and talked to the people living it.",
  before: [
    { who: "PM", what: "Needs feedback on a product" },
    { who: "IT Quality", what: "Takes the request", removed: true },
    { who: "Developer", what: "Builds a one-off survey", removed: true },
    { who: "PM + Dev", what: "Back-and-forth on changes", removed: true },
    { who: "Users", what: "Get a link to the survey" },
  ],
  after: [
    { who: "PM", what: "Needs feedback on a product" },
    {
      who: "Deere Survey",
      what: "Picks a template, products, questions and languages, then previews",
      hot: true,
    },
    { who: "Users", what: "Get the survey, in their language" },
  ],
  caption:
    "Dashed boxes are the steps the tool removed. Times are what PMs reported, checked against what I observed.",
  stickies: [
    "Every request went through IT Quality and a developer.",
    "Each survey was built by hand, for one product.",
    "~3 days from asking to a live link.",
    "PMs couldn't change their survey once it was live.",
  ],
  hmw: "How might we let a PM go from “I need feedback” to a live, on-brand survey on their own, without losing the standards IT Quality cared about?",
};

export const okr = {
  lead: "Fuel is John Deere's design system. The UX team's FY24 goals asked for more products to be built on it, and for UX guidance to live in one place. A survey tool that every product team would touch was a chance to prove Fuel worked in a product people actually used.",
  objective:
    "Pave the path for elite product UX, with clear entry points, room to grow and high expectations.",
  keyResults: [
    { title: "Products on Fuel.", text: "5% growth in recognised products that use the Fuel design system." },
    { title: "One source of truth.", text: "Bring UX documentation from 19 separate solutions into one enterprise source." },
    { title: "Shared tokens.", text: "Three products pull from one Foundations token source, in both Figma and React." },
  ],
  mapColumns: ["What I did", "Key result it supports", "Chapter"],
  mapRows: [
    ["Designed Deere Survey entirely from Fuel components", "Products on Fuel", "04–07"],
    ["Wrote component guideline pages for fuel.deere.com", "One source of truth", "03"],
    ["Helped restructure tokens into global, alias and mapped layers", "Shared tokens", "03"],
    ["Contributed to Fuel's FY24 accessibility plan", "Elite product UX", "08"],
    ["Ran component intake and trained designers on Fuel", "Products on Fuel", "03, 09"],
  ],
};

export const fuel = {
  lead: "Designers on any product team could ask Fuel for a new component through the Fuel Teams channel. I helped run that intake, so I saw both sides: what product teams needed, and what it took to make a component everyone could reuse.",
  quote: "“A designer uses the Fuel Teams channel so they can request a new component.”",
  stages: [
    { n: "1 · Request", text: "Teams channel, office hours or a ticket" },
    { n: "2 · Refine", text: "PM checks it isn't already in Fuel" },
    { n: "3 · Discover", text: "Research desirability and viability across teams", hot: true },
    { n: "4 · Prioritise", text: "Effort vs value, then into a sprint" },
    { n: "5 · Design + build", text: "Design huddle, then dev huddle" },
    { n: "6 · Publish", text: "Guideline page on fuel.deere.com" },
  ],
  stagesCaption:
    "Redrawn from the team's value-stream board. Step 3 is where research decided whether a request became a shared component or stayed product-specific.",
  tokensIntro:
    "I worked on restructuring Fuel's tokens so products could theme without breaking the system. Token names below are illustrative.",
  tokens: [
    { layer: "Global", role: "Raw values", examples: ["color.green.600", "space.16"] },
    { layer: "Alias", role: "Semantic meaning", examples: ["color-action", "space-inset-md"] },
    { layer: "Mapped", role: "Component use", examples: ["button-primary-bg", "card-padding"] },
  ],
  tokensNote: "one change in Global flows through every product",
  cards: [
    {
      title: "Guidelines, one place",
      text: "I wrote component guideline pages for fuel.deere.com: usage, anatomy, states, content notes, accessibility criteria, and links to the Figma component and React code.",
    },
    {
      title: "Accessibility plan",
      text: "I helped define who needed accessibility skills, what “done” meant by year end, and how it would be checked. Deere Survey was where I applied it first.",
    },
  ],
};

/* The animated prototype. Geometry for clicks and overlays lives in the
   component; copy, images and alt text live here. */
export type PrototypeStep = {
  id: string;
  src: string;
  alt: string;
  label: string;
  decision: string;
};

export const prototype = {
  lead: "PMs aren't survey experts and don't want to be. The builder walks them down one fixed path: one decision per screen, good defaults at every step, and a preview before anything goes live. Here's that path, clicked through.",
  note: "the real flow, clicked through",
  ariaLabel:
    "Animated prototype of the Deere Survey builder on a laptop. A cursor clicks through 13 screens, from the dashboard and template picker to products, questions, answer types, user info and the thank-you page. The design decisions are listed below it.",
  caption:
    "The Standard Flow Path from my Figma file, played as a prototype. Yellow boxes mark what the PM is looking at; purple rings mark each click.",
  decisionsTitle: "The 13 decisions in that flow",
  steps: [
    { id: "dashboard", src: `${IMG}/flow-s01.jpg`, alt: "Dashboard with surveys and a Create New Survey button", label: "Dashboard → Create new survey → pick a template", decision: "Standard template first, so results compare across products" },
    { id: "details", src: `${IMG}/flow-s02.jpg`, alt: "Survey details form", label: "Survey details · title, audience, languages", decision: "Two owners on every survey, so none get orphaned" },
    { id: "welcome", src: `${IMG}/flow-s03.jpg`, alt: "Welcome page editor", label: "Welcome page · copy is pre-written, swap the image", decision: "Copy arrives written and on brand. PMs edit, never start blank" },
    { id: "welcome-new", src: `${IMG}/flow-s05.jpg`, alt: "Welcome page with a new image", label: "New image in place → Next", decision: "Images only come from an approved library" },
    { id: "products", src: `${IMG}/flow-s06.jpg`, alt: "Select products checklist", label: "Select products · up to three per person", decision: "Max 3 products per person keeps the survey short" },
    { id: "questions", src: `${IMG}/flow-s07.jpg`, alt: "Review questions with standard badges", label: "Review questions · standard ones come pre-filled", decision: "Standard questions arrive locked, with a Standard badge" },
    { id: "expanded", src: `${IMG}/flow-s08.jpg`, alt: "Expanded question with Move to page menu", label: "Expand a question · move it with a menu, not just drag", decision: "“Move to page” gives a keyboard path, not only drag and drop" },
    { id: "custom", src: `${IMG}/flow-s09.jpg`, alt: "Edited question with a Custom badge", label: "Edit a standard question → badge flips to Custom", decision: "Edited? The badge says Custom, in words, not just colour" },
    { id: "type", src: `${IMG}/flow-s10.jpg`, alt: "Custom question choosing a response type", label: "Pick an answer type · 7 types, one card", decision: "7 answer types, 1 card. Switching keeps the question text" },
    { id: "loop", src: `${IMG}/flow-s11.jpg`, alt: "Page 2 with a loop notice", label: "Page 2 · this page loops once per product", decision: "A page loops per product, capped at 3 times" },
    { id: "open-text", src: `${IMG}/flow-s12.jpg`, alt: "Open-text question with a 250 character limit", label: "Open-text question · 250 characters → Next", decision: "Open text: 250 chars, and support issues pointed elsewhere" },
    { id: "user-info", src: `${IMG}/flow-s13.jpg`, alt: "User information with country and unit dropdowns", label: "User info · standard country and unit lists", decision: "Standard country and unit lists, so answers group cleanly" },
    { id: "thanks", src: `${IMG}/flow-s15.jpg`, alt: "Thank-you page with a Save button", label: "Thank-you page → Save, then preview and publish", decision: "Preview in every language before it goes live" },
  ] satisfies PrototypeStep[],
  fuelTitle: "Where Fuel shows up",
  fuelText:
    "Every control in that flow comes from the Fuel design system. The product added no one-off UI, so each fix in Fuel reached every survey screen.",
  fuelParts: ["Global header", "Side navigation", "Breadcrumb", "Pager", "Text field", "Dropdown", "Checkbox", "Radio", "Toggle", "Badge", "Button", "Modal"],
  fuelNote: "the gaps it exposed went back into Fuel → chapter 09",
};

export const components = {
  lead: "The heart of the tool is the question card: one Fuel-based component with clear states, so every question type behaves the same way whether a PM is using it for the first time or editing it live.",
  badgeNote: "edit a standard question → it becomes Custom, in words, not just colour",
  badgeCaption:
    "A standard question changes to Custom the moment a PM edits it. IT Quality can then tell which results compare across products and which don't.",
  typesTitle: "Seven answer types, one pattern",
  types: ["Choice", "Text", "Rating", "Ranking", "Likert", "NPS", "Date"],
  typesText:
    "Switching type keeps the question text and swaps only the answer area. Each card has four states: collapsed, disabled, expanded and editing.",
  figures: [
    { src: `${IMG}/c-question-builder.jpg`, w: 1600, h: 835, alt: "Question card in every answer type: choice, text, rating, ranking, Likert, NPS and date.", caption: "The question card across all seven answer types." },
    { src: `${IMG}/c-standard-questions.jpg`, w: 1600, h: 1288, alt: "Component states: collapsed, disabled, expanded, plus the language picker and locked standard questions.", caption: "States of the card, the language picker, and the two locked standard questions." },
  ],
};

export const reach = {
  lead: "John Deere's users are dealers, customers, staff and suppliers around the world. Before, a translated survey meant another developer build. Now a PM ticks the languages and previews each one.",
  main: { src: `${IMG}/c-modal-language.jpg`, w: 1600, h: 835, alt: "Survey preview in English and Spanish with the language menu open.", caption: "The live preview switches language in place. Shown here in English and Spanish." },
  small: [
    { src: `${IMG}/s14m-departments.jpg`, w: 760, h: 688, alt: "Standard department list.", caption: "A standard department list, so answers group the same way in every survey." },
    { src: `${IMG}/s06m-message.jpg`, w: 760, h: 471, alt: "Message dialog for people who don't use the products.", caption: "A polite exit for people who don't use the products being surveyed." },
    { src: `${IMG}/s06m-product-title.jpg`, w: 760, h: 688, alt: "Dialog to rename a product for the audience.", caption: "PMs can rename a product for their audience without changing its master record." },
  ],
};

export const results = {
  lead: "A survey only helps if the answers come back in a form people use. Each survey row opens into its numbers, its trends and its comments, without exporting anything.",
  figure: { src: `${IMG}/c-preview-results.jpg`, w: 1600, h: 835, alt: "Survey row expanded into details, a bar chart of responses by product, a line chart of responses and abandons over time, and comments.", caption: "The survey row: collapsed, then details, charts and comments. Owner names are blurred." },
  cards: [
    { title: "Responses vs abandons", text: "Shown together over time, so a PM sees when people start but don't finish." },
    { title: "Responses by product", text: "One bar per product, so PMs covering several tools can compare them." },
    { title: "Comments in context", text: "Each comment shows the product, product family and how it was submitted." },
  ],
};

export const accessibility = {
  lead: "I helped shape Fuel's FY24 internal accessibility plan: who needed accessibility skills, what “done” meant by year end, and how it would be checked. Deere Survey was where I applied it first. Building from Fuel meant fixes in the system reached every survey.",
  principles: [
    { label: "Perceivable", text: "Standard and Custom are labelled in words, not shown by colour alone. Buttons are dark text on Deere yellow." },
    { label: "Operable", text: "Questions can be reordered with “Move to page” as well as dragging, so it works by keyboard." },
    { label: "Understandable", text: "One decision per screen, a visible step count, and plain labels on every field." },
    { label: "Robust", text: "Built from Fuel components, so fixes in the system reach every survey automatically." },
  ],
  targetsTitle: "The plan's targets",
  targets: [
    "Every Fuel component spec includes accessibility criteria",
    "Designers and developers have a learning path for accessibility",
    "A shared checklist for teams to check their own work before launch",
  ],
};

export const givingBack = {
  lead: "Building a real product on Fuel showed where the system had gaps. I designed those pieces so other teams could reuse them, and I taught people how to use Fuel.",
  handedTitle: "Components handed to Fuel",
  handed: [
    "Question card, with all seven answer types and four states",
    "Standard and custom question templates",
    "Searchable multi-language picker",
    "Survey preview with language switching",
    "Expandable survey row with charts and comments",
  ],
  teachingTitle: "Teaching Fuel",
  teaching:
    "I ran training and knowledge-transfer sessions for designers who wanted to learn Fuel. That helped adoption and awareness, which is exactly what the “products on Fuel” key result needed.",
  honest:
    "An honest note: I handed the full component set to the Fuel team, but I left before I could confirm which pieces were merged into the system.",
};

export const impact = {
  cards: [
    { value: "250", text: "internal product teams used Deere Survey." },
    { value: "~3 days → ~30 min", text: "to build a survey. Reported by PMs, matched what I observed." },
    { value: "Self-serve", text: "PMs build and publish without a developer in the loop." },
  ],
  limitsTitle: "What the evidence can't tell us",
  limits:
    "The time saving is reported and observed, not measured in a controlled test. And I don't have a count of surveys run before the tool, so I can't say how much more feedback teams collected.",
  nextTitle: "What I'd add",
  next: [
    "Log time from “Create new” to “Publish” inside the tool",
    "Track completion and abandon rates by question type",
    "Usability-test the builder with first-time PMs",
  ],
};
