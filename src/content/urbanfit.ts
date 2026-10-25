/* All copy for /work/urbanfit lives here, not in components. It follows the design artboard
   (project/Main.dc.html in the Urbanfit design canvas). Screens are the design's own exports, in
   public/assets/urbanfit, with the artboard's alt text.
   - Counts are the design's. 75 frames = 68 screens + 7 sheets; 131 interactions; 84 variables = 35 + 18 + 21 + 10.
   - Titles mark their italic words with *...*. */

export const hero = {
  tags: ["Mobile app · iOS and Android", "Health and fitness", "Interaction design", "Design system", "Accessibility"],
  title: "Urbanfit Studio: a coach, a dietitian and a tracker in *one pocket*",
  lead:
    "The mobile chapter of the Urbanfit case study. One design that sets up a personal plan, tracks the day, and connects people to paid experts, built for both app stores.",
  meta: [
    { label: "My role", value: "UI/UX designer" },
    { label: "Company", value: "Urbanfit Wellness · Pune, India" },
    { label: "Timeline", value: "2021 – 2022" },
    { label: "Platforms", value: "iOS and Android" },
    { label: "In Figma", value: "68 screens · 7 sheets" },
  ],
  phones: [
    { src: "/assets/urbanfit/hero-splash.jpg", alt: "Splash screen: a man training with weights, the Urbanfit logo and a Get Started button." },
    { src: "/assets/urbanfit/hero-home.jpg", alt: "Home screen: a welcome greeting, five tracker tiles for walk, workouts, sleep, water and calories, and a My Plan section." },
    { src: "/assets/urbanfit/hero-calories.jpg", alt: "Calories tracker: a ring showing 1268 kcal, a Health App sync card and meal logging rows." },
  ],
};

export const sectionNav = [
  { id: "fits", label: "00 · Where this fits" },
  { id: "brief", label: "01 · The brief" },
  { id: "architecture", label: "02 · Information architecture" },
  { id: "setup", label: "03 · Flow 1 · Plan setup" },
  { id: "home", label: "04 · Flow 2 · Home" },
  { id: "trackers", label: "05 · Flow 3 · Trackers" },
  { id: "experts", label: "06 · Flow 4 · Experts, meals and workouts" },
  { id: "interaction", label: "07 · Interaction model" },
  { id: "components", label: "08 · Components" },
  { id: "tokens", label: "09 · Variables and tokens" },
  { id: "platforms", label: "10 · iOS and Android" },
  { id: "accessibility", label: "11 · Accessibility audit" },
  { id: "reflection", label: "12 · Reflection" },
];

/* ── 00 Where this fits ── */
export const fits = {
  title: "One chapter of a bigger *system*",
  lead:
    "Urbanfit ran several connected products. This chapter covers the member-facing mobile app, called Studio in the design file. The other products appear as their own chapters.",
  cards: [
    { tag: "Web", title: "Wellness platform", body: "The marketing and membership website, plus landing pages.", here: false },
    { tag: "This chapter", title: "Studio mobile app", body: "Plans, daily tracking, workouts, meals and expert consultations.", here: true },
    { tag: "Commerce", title: "Store app and web store", body: "Shopping for products, with its own mobile and desktop flows.", here: false },
    { tag: "Internal", title: "Control panel", body: "The admin side for managing content, members and plans.", here: false },
  ],
};

/* ── 01 The brief ── */
export const brief = {
  title: "Four jobs, one *bottom bar*",
  lead:
    "The app had to do four jobs without feeling like four apps: set up a personal plan, track the day, train and eat to that plan, and put people in touch with real experts.",
  stickies: [
    { title: "Bet 1 · Ask little, give a plan", body: "Onboarding collects only what a plan needs (goal, body, activity) and ends with a plan, not a blank dashboard.", tone: "yellow" as const },
    { title: "Bet 2 · Trackers should look alike", body: "Steps, water, sleep and calories share one template, so learning one teaches them all.", tone: "lilac" as const },
    { title: "Bet 3 · Upsell in context", body: "Without a plan, the expert offer appears exactly where that expert would help, not in a separate store.", tone: "yellow" as const },
  ],
  stats: [
    { value: "75", label: "Frames in the Studio mobile page: 68 screens and 7 bottom sheets", hot: true },
    { value: "131", label: "Prototype interactions wired from one starting flow", hot: false },
    { value: "4", label: "Tabs: Home, Nutrition, Profile, Fitness", hot: false },
    { value: "4", label: "Home states, one per plan type", hot: false },
  ],
};

/* ── 02 Information architecture ── */
export const architecture = {
  title: "Four tabs on top of seven *flows*",
  lead:
    "The Figma page is organised into the same groups the app uses. The bottom bar holds four destinations, a count that fits both an iOS tab bar and an Android navigation bar.",
  tabs: ["Home", "Nutrition", "Profile", "Fitness"],
  groups: [
    { name: "Start", body: "Splash, sign in, sign up, phone verification, then an 8-step plan setup.", from: "Before the tabs" },
    { name: "Home", body: "Greeting, tracker tiles, My Plan, activity graph, suggested workouts, blogs.", from: "Tab: Home" },
    { name: "Trackers", body: "Steps, water, sleep, calories eaten and burnt, each with a goal sheet.", from: "From Home tiles" },
    { name: "Nutrition", body: "Food log by meal, macros, BMI, today's meals from a dietitian.", from: "Tab: Nutrition" },
    { name: "Fitness", body: "Workout library by body part, video player, workout tracker.", from: "Tab: Fitness" },
    { name: "Experts", body: "Pick a coach, book a slot, chat or call.", from: "From plans and tabs" },
    { name: "Profile", body: "Account, six reminder types, saved items, notifications, legal.", from: "Tab: Profile" },
    { name: "Plans and checkout", body: "Plan list, durations, summary with promo codes, payment.", from: "From upsells and Profile" },
  ],
};

/* A captioned screen. `overlay` puts a sheet over the screen, as the goal sheet does. */
export type Screen = {
  name: string;
  caption: string;
  src: string;
  alt: string;
  scroll?: boolean;
  overlay?: { src: string; alt: string };
};

/* ── 03 Flow 1: plan setup ── */
export const setup = {
  title: "Eight short questions, then a *plan*",
  lead:
    "Each step asks one thing on one screen, shows \"Step x of 8\" and offers Skip. The flow ends on a progress screen that turns answers into a training plan.",
  stripLabel: "Plan setup screens, scroll sideways",
  screens: [
    { name: "Sign in", caption: "Phone or email, plus Apple, Google and Facebook.", src: "/assets/urbanfit/flow1-sign-in.jpg", alt: "Sign in screen with phone or email, password, and sign-in options for Apple, Facebook and Google." },
    { name: "Verify phone", caption: "One-time code with a numeric keypad, Resend and Change number.", src: "/assets/urbanfit/flow1-verify.jpg", alt: "Phone verification screen with a four-digit code entry and a numeric keypad." },
    { name: "Gender", caption: "Includes a gender-neutral option.", src: "/assets/urbanfit/flow1-gender.jpg", alt: "Choose gender screen with Woman, Man and Gender neutral options." },
    { name: "Main goal", caption: "Four goals drive the plan.", src: "/assets/urbanfit/flow1-goal.jpg", alt: "Choose main goal screen: lose weight, keep fit, get stronger, gain muscle mass." },
    { name: "Height, weight, goal weight", caption: "Typed on a keypad, with a unit toggle. No drag ruler.", src: "/assets/urbanfit/flow1-height.jpg", alt: "Select height screen with a Feet or Centimetre toggle and a number field above a numeric keypad." },
    { name: "Activities", caption: "Multi-select list with a clear selected state.", src: "/assets/urbanfit/flow1-activities.jpg", alt: "Choose activities screen listing stretch, cardio, yoga, power training and dancing, with Cardio selected." },
    { name: "Plan building", caption: "A progress ring explains the wait.", src: "/assets/urbanfit/flow1-plan.jpg", alt: "Progress screen reading We create your training plan, with a ring at 78 percent." },
  ] as Screen[],
  decisionsTitle: "How the interactions were worked out",
  decisions: [
    { title: "Type, don't drag", body: "Height and weight use a number field and keypad instead of a scroll ruler. It's faster, more precise and needs no dragging (WCAG 2.5.7)." },
    { title: "One screen, two jobs", body: "The same height and weight screens come back from Profile with \"Save\" instead of \"Continue\". One component, two contexts." },
    { title: "Units are a choice", body: "A Feet and Centimetre toggle sits above the field, so nobody converts in their head." },
    { title: "Always a way out", body: "Every step has Back and Skip, so the plan never blocks people who don't want to share a number." },
  ],
};

/* ── 04 Flow 2: home ── */
export const home = {
  title: "One home, four *states*",
  lead:
    "Home is designed in four versions: no plan, dietitian only, coach only, and both. Only the My Plan block changes. Everything people learn about the rest of the screen stays true. Scroll inside each phone to see the full screen.",
  caption: "What the My Plan block shows in each state",
  rows: [
    { state: "No plan", block: "Two discounted consultations and View All Plans" },
    { state: "Dietitian", block: "Book your dietitian, plus 10% off a coach consultation and View All Plans" },
    { state: "Fitness coach", block: "Book your trainer, plus 10% off a dietitian consultation and View All Plans" },
    { state: "Both", block: "Refer a friend, and book either expert" },
  ],
  hand: "each state offers only the expert you don't have yet",
  screens: [
    { name: "No plan", caption: "My Plan becomes an offer: 10% off a first consultation, and all plans.", src: "/assets/urbanfit/hero-home.jpg", alt: "Home with no plan: My Plan shows discounted fitness and dietitian consultations with Get Now buttons, and a View All Plans link, followed by the activity graph, daily steps, calories, exercise, suggested workouts and blogs.", scroll: true },
    { name: "Coach and dietitian", caption: "My Plan becomes a shortcut to book either expert.", src: "/assets/urbanfit/home-both.jpg", alt: "Home with both a coach and a dietitian: My Plan shows Refer a Friend and two rows to connect to your coach and dietitian with Schedule Appointment buttons, followed by the same activity sections.", scroll: true },
  ] as Screen[],
};

/* ── 05 Flow 3: trackers ── */
export const trackers = {
  title: "One template, *five* metrics",
  lead:
    "Steps, water, sleep, calories eaten and calories burnt share one layout. Learning one tracker teaches all of them.",
  stripLabel: "Tracker screens, scroll sideways",
  screens: [
    { name: "Steps", caption: "Ring and a plain sentence.", src: "/assets/urbanfit/track-steps.jpg", alt: "Steps tracker: ring reading 2860 steps and the sentence 2860 steps walked out of 10,000." },
    { name: "Water", caption: "Log with a − / + stepper.", src: "/assets/urbanfit/track-water.jpg", alt: "Water tracker: 9 glasses ring, a minus and plus stepper for glasses, and a Health App sync card." },
    { name: "Sleep", caption: "Synced from the health app.", src: "/assets/urbanfit/track-sleep.jpg", alt: "Sleep tracker: ring reading 8 sleep and the sentence 6 hours of sleep acquired out of 8 hours." },
    { name: "Calories eaten", caption: "Logged by meal.", src: "/assets/urbanfit/hero-calories.jpg", alt: "Calories tracker with meal rows for breakfast, lunch and dinner, each with an add button." },
    { name: "Goal sheet", caption: "The pencil opens a sheet over the tracker.", src: "/assets/urbanfit/track-steps.jpg", alt: "", overlay: { src: "/assets/urbanfit/track-goal-sheet.jpg", alt: "Bottom sheet titled Set Steps Goal with a minus and plus stepper set to 10000, a Recommended label and a Done button." } },
    { name: "Log food", caption: "Amount and unit, then macros update.", src: "/assets/urbanfit/track-log-food.jpg", alt: "Track Breakfast screen: search, Salad selected, quantity 2.75 with a Grams unit dropdown, and macro rings." },
    { name: "Log workout", caption: "Same pattern: amount, unit, result.", src: "/assets/urbanfit/track-log-workout.jpg", alt: "Track Workout screen: Triceps selected, reps and minutes fields, and 56 kcal lost." },
  ] as Screen[],
  anatomyTitle: "Anatomy of a tracker",
  anatomy: [
    { label: "Date stepper.", text: "\"Today, Aug 23\" with previous and next arrows." },
    { label: "Progress ring.", text: "Value and unit inside, for example 2860 steps." },
    { label: "Sentence summary.", text: "\"2860 steps walked out of 10,000\" says what the ring shows, in words." },
    { label: "Edit goal.", text: "A pencil opens a bottom sheet with a stepper and a recommended value." },
    { label: "Sync status.", text: "\"You are connected to Health App · Last synced Today, 11:23\"." },
    { label: "Log list.", text: "Meals or workouts to add to, where the metric is logged by hand." },
  ],
  whyTitle: "Why one template",
  whyBody:
    "Five metrics with five layouts would mean five things to learn. One layout lets the metric change while position, gestures and wording stay the same. The sentence summary also makes each ring readable without seeing it, which matters for screen-reader users.",
};

/* ── 06 Flow 4: experts, meals and workouts ── */
export const experts = {
  title: "From a plan to a *person*",
  lead:
    "The paid side of the app is people. Members pick a coach or dietitian, book a slot, then chat or call. Plans arrive as today's meals and workouts, each with Skip, Change and Done.",
  stripLabel: "Expert and fitness screens, scroll sideways",
  screens: [
    { name: "Pick a coach", caption: "Role and experience before the name.", src: "/assets/urbanfit/experts-pick.jpg", alt: "Pick a coach screen listing a dietitian and a trainer, each with a photo, a role and a radio button. Names are blurred." },
    { name: "Book", caption: "Month calendar, then time slots.", src: "/assets/urbanfit/experts-book.jpg", alt: "Book Your Appointment screen with a January calendar and time-slot buttons. The expert's name is blurred." },
    { name: "Chat or call", caption: "Call Now is always one tap away.", src: "/assets/urbanfit/experts-chat.jpg", alt: "Chat screen with an expert fitness coach, a Call Now button and a message field with Send. The name is blurred." },
    { name: "Today's meals", caption: "Skip, Change, Done on every card.", src: "/assets/urbanfit/experts-meals.jpg", alt: "Meals screen: tabs for breakfast, lunch, snack and dinner, a Quinoa Fruits Bowl card with Skip, Change and Done, and a breakfast summary." },
    { name: "Workout library", caption: "Filter by body part. Scroll inside.", src: "/assets/urbanfit/experts-library.jpg", alt: "Fitness tab: body-part filter chips (arms, back, chest, core, abs, legs, triceps, all), an expert trainer card, and a grid of workout videos.", scroll: true },
    { name: "Workout video", caption: "Player, targeted muscles, suggestions.", src: "/assets/urbanfit/experts-video.jpg", alt: "Workout video player for a pushup workout, with targeted muscles and suggested exercises below." },
    { name: "Upsell in context", caption: "No plan: the dietitian offer sits on the food log.", src: "/assets/urbanfit/experts-upsell.jpg", alt: "Nutrition tab without a plan: a 10% discount dietitian consultation banner with Get Now, above the food log." },
  ] as Screen[],
  note: "Expert and member names in these screens are blurred.",
};

/* ── 07 Interaction model (dark) ── */
export const interaction = {
  title: "Four kinds of *movement*",
  lead:
    "The prototype uses four interaction types, and each maps to a native pattern on both platforms. Counts come from the Figma prototype.",
  stats: [
    { value: "131", label: "Interactions in total", hot: true },
    { value: "6", label: "Open a bottom sheet as an overlay: goals and reminders", hot: false },
    { value: "31", label: "Swap a component state in place: calendar days", hot: false },
    { value: "1", label: "Timed: splash to welcome", hot: false },
  ],
  chain: ["Splash", "Welcome", "Sign in", "Sign up", "Verify", "8 setup steps", "Plan ready", "Home", "Trackers · Nutrition · Fitness"],
  chainHot: "Home",
  caption: "Each prototype interaction and its native equivalent",
  rows: [
    { kind: "Navigate", use: "Moving deeper: Home to a tracker, a step to the next step", ios: "Push in a navigation stack, with a back chevron and edge swipe", android: "New destination. System back gesture or button returns." },
    { kind: "Overlay", use: "Set a goal, pick a reminder day and time", ios: "Sheet with a grabber, dismissed by swipe or Done", android: "Modal bottom sheet, dismissed by back, scrim tap or Done" },
    { kind: "Change to", use: "Selecting a day in the calendar", ios: "Selected state, announced as \"selected\"", android: "Selected state, announced as \"selected\"" },
    { kind: "After delay", use: "Splash to welcome", ios: "Launch screen, then the first view", android: "Splash screen API, then the first view" },
  ],
};

/* ── 08 Components ── */
export const components = {
  title: "The parts that *repeat*",
  lead:
    "The screens are built from a shared library: calendar days, week and month views, text fields, primary buttons, checkboxes and icons. The day chip alone is used 35 times. These are recreated specimens with their states; the bottom bar shows the original next to a suggested fix.",
  dayCaption: "Days · Variant = Today | On | Off",
  dayBody: "35 instances across trackers and booking. Each state differs in fill and border, not just colour hue.",
  fieldCaption: "Text Field / Ordinary · Inactive | Focused",
  fieldBody: "In the original, the label sits inside the field and disappears on typing. The specimen keeps a visible label above it (WCAG 3.3.2).",
  stepperCaption: "Segmented · Stepper",
  stepperBody: "The two controls behind every number in the app. The steppers use 44pt targets and announce the new value.",
  ringCaption: "Tracker header",
  ringBody: "Always paired with the sentence summary, so the ring's meaning never depends on seeing it.",
  ringLabel: "2,860 of 10,000 steps, 29 percent of goal",
  ringSentence: "2860 steps walked out of 10,000",
  barCaption: "Tab bar · 4 destinations",
  barBody:
    "As designed, the active tab is shown only by a black label on purple, which is 3.2:1 and below the 4.5:1 needed for text this small. The fix adds a shape change and bolder text, and exposes the state to screen readers.",
  barTabs: ["Home", "Nutrition", "Profile", "Fitness"],
  barAsDesigned: "As designed · active = black label",
  barSuggested: "Suggested · white pill + bold, exposed as selected",
};

/* ── 09 Variables and tokens ── */
export const tokens = {
  title: "A token library, and the gap to *close*",
  lead:
    "The Figma file holds a token library: 84 variables in four collections, plus 14 text styles in Poppins. The table shows real names and values from the file.",
  collectionsCaption: "Variable collections in the Urbanfit Figma file",
  collections: [
    { name: "Color Primitives", count: "35", examples: "brand/lime #99FF35 · brand/teal #1CE1CF · purple/violet-deep #6323FE · neutral/gray-600 #5C5C5C" },
    { name: "Color Semantic", count: "18", examples: "bg/default → white · text/default → black · action/primary → lime · text/muted → gray-400" },
    { name: "Typography", count: "21", examples: "font/family/primary Poppins · sizes 11 to 96 · line heights 110, 125, 150%" },
    { name: "Spacing and Radius", count: "10", examples: "spacing/xs 4 to spacing/2xl 32 · radius/sm 4 to radius/full 999" },
  ],
  findingsTitle: "What the audit of the tokens found",
  findings: [
    { n: "Finding 1", title: "Screens aren't bound yet", body: "No layer on the Studio mobile page is bound to a variable. Colours like the Studio purple are typed in as raw values in hundreds of places." },
    { n: "Finding 2", title: "Two brands in one semantic layer", body: "action/primary points to lime, the wider Urbanfit brand. Studio's purple exists only as a primitive (purple/violet-deep), so the app's main colour has no semantic name." },
    { n: "Finding 3", title: "A muted token that fails", body: "text/muted resolves to #8D8D8D, which is 3.32:1 on white. It fails for body text." },
  ],
  modeCaption: "Proposed \"Studio\" mode for the Color Semantic collection",
  modeRows: [
    { token: "action/primary", today: "brand/lime", todayHex: "#99ff35", proposed: "purple/violet-deep", proposedHex: "#6323fe", check: "White label on it", pass: "6.56:1" },
    { token: "text/on-primary", today: "brand/green-deep", todayHex: "#004500", proposed: "neutral/white", proposedHex: "#ffffff", check: "", pass: "6.56:1", suffix: "on violet-deep" },
    { token: "text/muted", today: "gray-400 · ", todayFail: "3.32:1", todayHex: "#8d8d8d", proposed: "gray-600", proposedHex: "#5c5c5c", check: "", pass: "6.69:1" },
    { token: "text/secondary", today: "gray-500", todayHex: "#747474", proposed: "No change", proposedHex: "", check: "", pass: "4.67:1", suffix: ", just passes" },
  ],
  footnote:
    "Adding a mode keeps one library for every Urbanfit product while letting the app keep its own colour. Binding the screens to these tokens is the step that makes the fixes apply everywhere at once.",
};

/* ── 10 iOS and Android ── */
export const platforms = {
  title: "One design, two *platforms*",
  lead:
    "The Figma file holds one set of iPhone-sized frames (428 × 926). The table shows how that shared design maps to each platform's conventions.",
  caption: "How the shared design maps to iOS and Android",
  rows: [
    { element: "Bottom bar", design: "4 tabs with icon and label", ios: "Tab bar", android: "Navigation bar (3 to 5 destinations)" },
    { element: "Back", design: "Top-left back arrow", ios: "Back chevron plus edge swipe", android: "System back must work too, not only the arrow" },
    { element: "Health data", design: "\"You are connected to Health App\"", ios: "Apple Health (HealthKit)", android: "Health Connect. Google Fit's APIs are deprecated in 2026." },
    { element: "Social sign-in", design: "Apple, Facebook, Google", ios: "Sign in with Apple shown first", android: "Google sign-in shown first" },
    { element: "One-time code", design: "4 boxes and a numeric keypad", ios: "Code autofill from Messages", android: "SMS code autofill" },
    { element: "Numbers", design: "Typed on a keypad, with units", ios: "Number pad keyboard", android: "Numeric keyboard" },
    { element: "Goal sheets", design: "Overlay from the bottom", ios: "Sheet", android: "Modal bottom sheet" },
    { element: "Touch targets", design: "Mixed sizes", ios: "At least 44 × 44 pt", android: "At least 48 × 48 dp" },
    { element: "Text size", design: "Fixed sizes, from 8pt up", ios: "Dynamic Type", android: "Font scale (sp units)" },
  ],
  note:
    "The generic \"Health App\" label is a quiet strength: one string works on both platforms, and only the connection behind it changes.",
};

/* ── 11 Accessibility audit ── */
export const accessibility = {
  title: "Checked against WCAG 2.2 *AA*",
  lead:
    "The audit applies WCAG 2.2 AA to the native app, using W3C's draft guidance for mobile apps. Counts come from the text layers inside the 75 screen frames.",
  stats: [
    { value: "454", label: "Of 1,832 text layers are smaller than 12pt", hot: true },
    { value: "380", label: "Text layers in greys below 4.5:1 on white", hot: false },
    { value: "1.15:1", label: "Lowest contrast: white values on the pastel Home tiles", hot: false },
    { value: "0", label: "Drag-only inputs. Every number can be typed or stepped.", hot: false },
  ],
  caption: "Findings, highest impact first",
  rows: [
    { finding: "White 10pt values on the pastel Home tiles (Walk, Workouts, Sleep, Water, Calories)", criterion: "1.4.3 Contrast", severity: "High", fix: "1.15 to 1.76:1, and the grey tile labels fail too. Use dark text (#0A0615) at 12pt or more." },
    { finding: "Grey body text: #898A8D (220 layers), #979797 (79), #787878 (81)", criterion: "1.4.3 Contrast", severity: "High", fix: "3.45, 2.92 and 4.42:1. Bind to a passing token such as gray-600 (6.69:1)." },
    { finding: "Fixed text sizes, many under 12pt and some at 8pt", criterion: "1.4.4 Resize text", severity: "High", fix: "Map text styles to Dynamic Type and sp. Set 12pt as the floor, and test at the largest setting." },
    { finding: "Active tab shown only by a black label on purple", criterion: "1.4.1 · 1.4.3 · 4.1.2", severity: "Medium", fix: "3.2:1. Add a shape indicator and expose the selected state." },
    { finding: "Activity graph uses red and green bars to mean low and on-target", criterion: "1.4.1 Use of colour", severity: "Medium", fix: "Add a goal line and value labels. Green text #4CAF50 is also 2.78:1." },
    { finding: "Labels inside text fields disappear on typing", criterion: "3.3.2 Labels or instructions", severity: "Medium", fix: "Keep a visible label above each field." },
    { finding: "Icon-only buttons: social sign-in, edit pencil, play, favourite", criterion: "4.1.2 Name, role, value", severity: "Medium", fix: "Give each an accessible name, for example \"Edit steps goal\"." },
    { finding: "Emoji as option icons in setup steps", criterion: "1.1.1 Non-text content", severity: "Low", fix: "Hide them from screen readers, so \"Woman\" isn't read twice." },
    { finding: "One-time code entry", criterion: "3.3.8 Accessible authentication", severity: "Low", fix: "Allow paste and platform code autofill into the four boxes." },
    { finding: "Placeholder copy in workout and blog descriptions", criterion: "Content quality, not WCAG", severity: "Low", fix: "Replace before release. A screen reader reads placeholder text out loud." },
  ],
  worksTitle: "What already works",
  works: [
    { title: "No dragging required", body: "Height, weight and goals are typed or stepped, never dragged (2.5.7)." },
    { title: "Words next to rings", body: "Each tracker says its value in a sentence, not only in a graphic (1.1.1)." },
    { title: "Labelled navigation", body: "Every tab has a text label, not just an icon." },
    { title: "Inclusive choices", body: "A gender-neutral option, a unit toggle, and Skip on every setup step." },
  ],
};

/* ── 12 Reflection ── */
export const reflection = {
  title: "What I'd tell the *next* team",
  cards: [
    { title: "Patterns beat screens", body: "Seventy-five frames came down to a handful of patterns: the tracker template, the goal sheet, the state-driven Home. The patterns are the real deliverable.", accent: false },
    { title: "State is design work", body: "Designing four Home states up front made the upsell honest. People only see offers for what they don't have yet.", accent: false },
    { title: "Tokens only help when bound", body: "A good token library sat beside screens that didn't use it. Binding them is what turns an audit finding into a one-line fix.", accent: true },
  ],
  validateTitle: "To validate next",
  validate: [
    "Usability-test plan setup and food logging with 5 to 8 people per platform, including VoiceOver and TalkBack users. Report results as counts.",
    "Measure setup completion (people who finish step 8, out of those who start step 1) and time to first logged meal.",
    "Compare plan uptake between the in-context offer and the plans list, using a control group before calling either one better.",
  ],
  credit:
    "Screens are exported from the Urbanfit Studio Figma file. Member and expert names, and phone numbers, are blurred. Specimens in section 08 are recreations. Platform guidance: W3C Guidance on Applying WCAG 2.2 to Mobile Applications (Group Draft Note, May 2025); Android Developers, Google Fit migration FAQ.",
};
