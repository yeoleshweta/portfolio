import type { Tldr } from "./caseStudyBriefs";

/**
 * ABTools / John Deere Financial case study content.
 * Source of truth: docs/abtools-redesign/CASE-STUDY-SPEC.md — do not rewrite copy.
 * Numbers and dates are fixed; see spec §8 before changing any of them.
 */

export const hero = {
  category: 'Case study · John Deere Financial · Jan–Aug 2021',
  title: "When did 'better' actually mean better?",
  subtitle: "A new web version of ABTools, a credit tool used all day by John Deere Financial analysts, looked cleaner. I ran a two-wave study with the same four power users to find out whether it was actually easier to use, and where it still got in the way.",
  chips: [
    'Longitudinal study',
    'Within-subjects',
    'SUS benchmark',
    'Interviews',
    'Thematic analysis',
  ],
  meta: [
    { label: 'Role', value: 'UX Researcher' },
    { label: 'Team', value: 'UX Researcher (self), embedded product team' },
    { label: 'Timeline', value: 'Jan to Aug 2021' },
  ],
};

/** SusScoreCard, hero aside (§3.0). */
export const susScoreCard = {
  eyebrow: 'System Usability Scale (SUS)',
  before: { label: 'Old desktop', value: '60' },
  after: { label: 'New web app', value: '85.6' },
  body: '+25.6 points, above the Global IT average (63), the FY21 target (67) and the industry average (68). Four participants, so read it as direction, not proof.',
  note: 'same 4 people, 8 months apart ↑',
  srLabel: 'SUS rose from 60 to 85.6',
};

export const stats = [
  { value: '60 → 85.6', label: 'SUS, before → after' },
  { value: '+35 pts', label: 'System Performance, % favorable', highlight: true },
  { value: '6 of 6', label: 'Dimensions improved' },
  { value: '35', label: 'Issues surfaced' },
];

export const facts = [
  { label: 'Organization', value: 'John Deere Financial (JDF)' },
  { label: 'Exposure', value: 'About 2 to 3 months on the new system before the post-test' },
  { label: 'Methods', value: 'SUS · six-dimension Likert questionnaire · open-ended probes · thematic analysis' },
  { label: 'Participants', value: '4 power users, one per role, 3.5 to 20+ years with ABTools' },
];

/** New TL;DR card (§3.2), rendered via the shared TldrCard. */
export const tldr: Tldr & { summary: string } = {
  summary: 'A redesign that looked better needed proof that it worked better. I measured the same four experts before and after launch.',
  problem: "A redesign that looks newer isn't proof it works better, especially for experts with up to 20 years of habits.",
  role: 'UX Researcher. Planned the study with the JDF product team, ran both waves, analysed and presented the results.',
  team: 'JDF UX team, ABTools product team',
  timeline: 'January to August 2021',
  methods: 'Two-wave within-subjects study · SUS · six-dimension questionnaire · interviews · thematic analysis',
  outcome: 'SUS 60 → 85.6. All six usability dimensions improved. 35 remaining issues found, 16 of them about Notes.',
  decision: 'Notes became a high-priority backlog item, and the team moved toward continuous research after launch.',
};

/** Prologue chapter (§3.3) — moved up in the final section order (§1.1). */
export const prologue = {
  lead: 'While this study was running, the JDF UX team surveyed 40 product team members about working with UX (June 28 to July 6, 2021). The answers showed a gap this study could help close.',
  survey: {
    title: 'What benefits have you experienced from UX? (multi-select, 40 respondents)',
    total: 40,
    rows: [
      { label: 'Helps me think with a user-centred mindset', count: 33 },
      { label: 'Helps me plan product development efficiently', count: 22 },
      { label: 'Helps me plan the roadmap', count: 19 },
      { label: 'Helps me make evidence-based decisions', count: 11, highlight: true },
    ],
  },
  // Bold spans marked with **…**; rendered as <strong> by the component, not parsed as markdown.
  stickies: [
    '**35 of 40** had worked with a UX practitioner, and **27** were very satisfied.',
    'Top asks: **more dedicated UX resources (22)** and **UX coaching (14)**.',
  ],
  note: 'liked for mindset… rarely for evidence. This study had to show the numbers.',
  caption: 'Counts out of 40, drawn to scale. Source: JDF UX Engagement Survey, 2021. Directional only.',
};

/**
 * Chapter 01 stat cards (§3.4). The old lead/p1/p2/p3/systems paragraphs are
 * gone — their content is now covered by problem.lead and problem.p, so
 * keeping them would just repeat the chapter's opening paragraphs.
 */
export const background = {
  context: [
    { value: 'Same day', label: 'Typical decision window' },
    { value: '15 min', label: 'Shortest application review' },
    { value: '10 to 20', label: 'Calls a day' },
    { value: '136 items', label: "In one participant's queue", highlight: true },
  ],
};

/** Agreement-tab pair (§3.4, §5). Replaces the old generic desktop/web screenshots. */
export const beforeAfter = {
  caption: 'Fig. 1. The same Agreement tab, before and after. Real screens, customer data blurred.',
  before: {
    img: '/work/john-deere/abtools-before-agreement.jpg',
    alt: 'Previous ABTools desktop app on the Agreement tab: ten tabs across the top and dozens of loan fields packed into three columns. Customer details are blurred.',
    title: 'Before · desktop app',
    text: 'Ten tabs and dozens of fields, many never used in underwriting.',
    width: 906,
    height: 696,
  },
  after: {
    img: '/work/john-deere/abtools-after-agreement.png',
    alt: 'Current ABTools web app on the Agreement tab: customer summary at the top, five tabs, and merchant details grouped under a side menu of four sections. Customer details are blurred.',
    title: 'After · web app',
    text: 'Same tab names, fewer fields, grouped into four sections.',
    width: 1098,
    height: 845,
  },
  beforeNote: '“There are 10 tabs in front of me, which one do I need?”',
  afterNote: '“It is cleaned up, it is easier to find quickly.”',
};

/** Involved Parties pair (§3.7, §5), step 1 of the workflow. */
export const beforeAfterParties = {
  caption: 'Fig. 6. Step 1 starts on the Involved Parties tab. Real screens, customer data blurred.',
  before: {
    img: '/work/john-deere/abtools-before-parties.jpg',
    alt: 'Previous ABTools desktop app on the Involved Parties tab: a small parties table on the left and a long form of party details on the right. Names, tax ID, address and phone are blurred.',
    title: 'Before · desktop app',
    text: 'List and form squeezed side by side.',
    width: 908,
    height: 699,
  },
  after: {
    img: '/work/john-deere/abtools-after-parties.png',
    alt: 'Current ABTools web app on the Involved Parties tab: customer summary at the top and a clear table of parties with name, role and CIP status, with paging. Names and IDs are blurred.',
    title: 'After · web app',
    text: 'One clear table, details open on demand. Customer summary stays visible.',
    width: 898,
    height: 846,
  },
};

export const problem = {
  // Merged lead for Chapter 01 (§3.4) — covers what background's old lead/p1/p3 said.
  lead: "Credit analysts make same-day decisions, sometimes in a 15-minute review, while taking 10 to 20 calls a day. Some had used the desktop ABTools for over 20 years. A post-launch survey alone couldn't tell real improvement apart from novelty or change aversion.",
  p: 'That was the decision to inform, and a generic post-launch survey could not answer it. Ratings taken right after a migration mix three things together. A one-shot study tells you about the learning curve, not the product. A two-wave study with a deliberate familiarization window can separate them.',
  forces: [
    { kind: 'Bias', title: 'Novelty effect', text: 'New feels good, simply because it is new.' },
    { kind: 'Bias', title: 'Change aversion', text: 'New feels wrong, simply because it is unfamiliar.' },
    { kind: 'Signal', title: 'Genuine usability change', text: 'What is left once the first two have faded.', solid: true },
  ],
  rqs: [
    'Did usability actually improve across the six dimensions the team cared about?',
    'Which dimensions improved most, and which barely moved?',
    'Where does friction remain in the daily workflow?',
  ],
};

export const design = {
  lead: 'I planned the study with the JDF product team inside our usual discover → define → develop → deliver process. The key choice was timing: capture a baseline before launch, then wait until people had really used the new tool.',
  paras: [
    { strong: 'Two waves, same people.', text: 'The same four participants evaluated both systems with identical instruments, in January (old ABTools) and August (new ABTools). Using the same people removes differences between groups as an explanation for any change.' },
    { strong: 'A familiarization window.', text: 'Participants began using the new ABTools in their real jobs in May and June. By the August evaluation they had about 2 to 3 months of working experience with it, enough for novelty and change aversion to fade.' },
  ],
  timeline: {
    caption: 'Fig. 2. Two waves, eight months apart, with a familiarity window in between.',
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    spans: [ // 8-column grid, 1-indexed
      { start: 1, end: 1, style: 'prev' },
      { start: 5, end: 6, style: 'hatch' },
      { start: 8, end: 8, style: 'current' },
    ],
    legend: [
      { style: 'prev', title: 'Baseline evaluation', text: 'January. Structured interviews, SUS and questionnaire on the previous ABTools.' },
      { style: 'hatch', title: 'Familiarization', text: 'May to June. Participants start using the new ABTools in their real jobs.' },
      { style: 'current', title: 'Post evaluation', text: 'August. Identical instruments on the current ABTools.' },
    ],
    note: 'waiting = fewer "it\'s new, I hate it" answers',
  },
  instruments: [
    { title: 'System Usability Scale', text: 'Standardized 10-item scale (Lewis and Sauro, 2009), benchmarkable against industry (68), Global IT (63) and the FY21 target (67).' },
    { title: 'Custom Likert questionnaire', text: 'Six sections: Satisfaction, Ease of Use, Learnability, System Performance, Human Error Support, Productivity. Reported as % favorable.' },
    { title: 'Open-ended probes', text: 'Verbatims explain why scores moved, and surface what no rating scale asks about.' },
  ],
  // Matches the "Design decisions, and what each one cost" table on the design canvas exactly.
  tradeoffs: [
    ['Within-subjects', 'Each person is their own comparison, so role and tenure don’t muddy the change.', 'Fixed order. The old tool was always rated first.'],
    ['Familiarity window', 'Lets novelty and change aversion fade before wave 2.', 'Other things change over months, too.'],
    ['One power user per role', 'Depth and full role coverage from people who live in the tool.', 'Four people can’t be generalised.'],
    ['SUS + custom dimensions', 'SUS gives a benchmark; six JDF dimensions show where it changed.', 'The custom scale isn’t validated.'],
    ['% favourable reporting', 'Easy for leadership to read at a glance.', 'Hides the spread of answers.'],
    ['Interviews alongside scores', 'Scores say how much; open probes say why.', 'One coder, no second check.'],
  ], // columns: Decision, Why, Cost
  /** ProcessDiagram (§3.5) — where the study sat in the team's discover/define/develop/deliver process. */
  process: {
    stickies: [
      'Wave 1 · Jan 2021 — Baseline on the old desktop tool',
      'May–Jun 2021 — New web tool in real daily use',
      'Wave 2 · Aug 2021 — Same people, same questions, new tool',
    ],
    steps: [
      { label: 'Discovery', sublabel: 'Discover → Define' },
      { label: 'Delivery', sublabel: 'Develop → Deliver' },
      { label: 'Measure', sublabel: 'Did it actually work?' },
    ],
    loopLabel: 'findings feed the backlog and the next round',
    note: 'baseline = part of discovery · wave 2 = measuring the delivery',
    caption: 'Fig. 3. Where the study sat in the UX team’s process. Redrawn from the team’s “Ideal Future State” board.',
  },
  /** SUS sheet figure + session flow (§3.5). */
  questionnaire: {
    image: '/work/john-deere/sus-questionnaire.png',
    imageWidth: 843,
    imageHeight: 674,
    alt: 'The SUS questionnaire as used in the sessions: ten statements rated from 1, strongly disagree, to 5, strongly agree, with a comment column to understand each rating.',
    caption: 'Fig. 4. The SUS sheet as used in both waves, with a comment column beside every rating.',
    flow: [
      'Intro, role, years with ABTools, hours a day',
      'Six JDF dimensions, each rated, then "why?"',
      'Improvement opportunities, open-ended',
      'SUS, the 10 items',
    ],
    sticky: 'Ratings show **how much**. The “why?” after each one shows **what to fix**.',
  },
};

export const participants = {
  lead: 'One daily power user per role, from 3.5 to more than 20 years with ABTools.',
  p: "ABTools is part of their job, so they can't leave when something frustrates them. Their friction stays in the system, which is exactly why it's worth studying. Reviews can take as little as 15 minutes, so minutes of friction are a large share of each decision.",
  profiles: [
    { pid: 'P1', avatarTint: 'lavender', role: 'Senior Credit Analyst', name: 'Decision-maker analyst', hours: '4 to 6 hrs / day', tenure: '3.5 yrs experience', tenurePct: 18, text: 'Reviews applications, makes same-day decisions, spreads financials. Needs scannable notes and a fast personal worklist.', systems: 'ABTools · MARS · CreditPath' },
    { pid: 'P2', avatarTint: 'yellow', role: 'Credit Analyst, credit admin', name: 'High-volume admin analyst', hours: 'All day', tenure: 'Long-time user', tenurePct: 50, unverified: true, text: 'Admin work that differs from normal analysts; dealer and customer calls. Needs speed and no routing detours.', systems: 'ABTools · ACAPS' },
    { pid: 'P3', avatarTint: 'green', role: 'Credit Processing Specialist', name: 'Processing specialist', hours: '2 to 3 hrs / day', tenure: '15+ yrs experience', tenurePct: 75, text: 'Turndown and counteroffer letters, bank rating, FileNet import. Needs reliable handoffs and errors that say what to do.', systems: 'ABTools' },
    { pid: 'P4', avatarTint: 'peach', role: 'Manager, Retail Credit Delivery Admin', name: 'Manager', hours: '2 to 4 hrs / day', tenure: '20+ yrs experience', tenurePct: 100, text: 'Sets up worklists, sets priority order, trains staff. Needs queue visibility, search that finds everyone, and export.', systems: 'ABTools · ACAPS' },
  ], // unverified: render the tenure bar with the hatch, not solid; tenure for P2 isn't in the source deck
  note: 'User profiles, not personas: one person per role. Bars show tenure with ABTools.',
};

export const workflow = {
  lead: 'I mapped what participants told me onto their daily workflow. Most remaining friction clustered around reading history and moving through queues.',
  caption: 'Fig. 5. A simplified workflow, left to right, with the friction participants described pinned to each step. Step 3 is the hotspot.',
  // Findings and their step match the design canvas exactly.
  steps: [
    { title: 'Work the queue', findings: ["Can't find own name in employee search", 'Queue position lost after leaving'] },
    { title: 'Open an application', findings: ['"Create new credit request" button didn’t work'] },
    { title: 'Read the history', findings: ['Notes squashed into one paragraph', "Notes text doesn't scale with zoom"] },
    { title: 'Decide and route', findings: ['Route-to-bottom option removed', 'Overlays close only with X'] },
    { title: 'Letters and handoff', findings: ['FileNet opens in a separate tab'] },
  ],
  /** Index into `steps` that is the friction hotspot (§3.7: "Step 3 · hotspot"). */
  hotspotIndex: 2,
};

export const results = {
  lead: 'SUS rose from below every benchmark to above all of them. Every dimension improved, but by very different amounts. With four people, these are descriptive results, not statistical proof.',
  sus: {
    caption: 'Fig. 7. SUS score, n = 4. Benchmarks: Global IT average and FY21 target (internal), industry average 68 (usability.gov).',
    summary: 'SUS rose from 60.0 to 85.6, passing the Global IT average (63), the FY21 target (67) and the industry average (68). n = 4.',
    rows: [
      { label: 'Previous ABTools', value: 60.0, kind: 'prev' },
      { label: 'Global IT average', value: 63, kind: 'bench' },
      { label: 'FY21 target', value: 67, kind: 'bench' },
      { label: 'Industry average', value: 68, kind: 'bench' },
      { label: 'Current ABTools', value: 85.6, kind: 'current' },
    ], // bar width = value%
  },
  dimensions: {
    caption: 'Fig. 8. Percent favorable on the custom six-dimension questionnaire, n = 4.',
    summary: 'All six dimensions improved. System performance gained most (+35.0); satisfaction least (+3.8).',
    rows: [ // sorted by change, largest first
      { label: 'System Performance', before: 62.5, after: 97.5, change: 35.0, highlight: true },
      { label: 'Human Error Support', before: 56.6, after: 75.0, change: 18.4 },
      { label: 'Ease of Use', before: 75.0, after: 88.7, change: 13.7 },
      { label: 'Learnability', before: 80.0, after: 92.5, change: 12.5 },
      { label: 'Productivity', before: 71.2, after: 82.5, change: 11.3 },
      { label: 'Satisfaction', before: 71.2, after: 75.0, change: 3.8, muted: true },
    ], // bar width = value * 0.88 %, leaving room for the value label
  },
  /** HandNote after the dimension chart (§3.8). */
  note: 'performance was the big win · satisfaction lagged → why? see chapter 06',
  stories: [
    { kicker: 'Biggest gain · +35.0 pts', title: 'System Performance: the kick-outs stopped.', paras: ['Before, sessions timed out after an hour of inactivity, cryptic pop-ups closed the system, and VPN conflicts forced re-logins. After, participants reported consistent speed, no kick-outs and no downtime.', 'One participant added that a few buttons still didn\'t work and gave no sign of it, and said that once those worked the score "could be 100."'], accent: true },
    { kicker: 'Smallest gain · +3.8 pts', title: 'Satisfaction: specific irritants, not lost familiarity.', paras: ['The verbatims name concrete problems: jumping between fields, an export workaround, repeated confirmation dialogs and, above all, the Notes feature.', 'With four participants, a change this small may also reflect a single answer, so I treat it as a signal to watch, not a finding.'] },
  ],
};

export const qualitative = {
  lead: 'Interviews explained every number. Here is what the same people said before and after.',
  p: 'Thematic analysis of the open-ended probes produced 35 issues in five themes. Nearly half were about one feature that no score pointed to.',
  themes: {
    caption: 'Fig. 9. Issues from thematic analysis of both waves. Frequency, not severity.',
    rows: [ // counts must sum to 35; segment width = count / 35; labels match the design canvas
      { label: 'Notes', count: 16, color: '#7952F5', text: 'Comments collapse into one block; small box; "view all" breaks the layout; can\'t fix a colleague\'s typo.' },
      { label: 'Usability', count: 6, color: '#A58CFB', text: 'Zoom ignores Notes text size; no default comment type; worklist navigation; overlay closes only with X.' },
      { label: 'Efficiency', count: 5, color: '#C9B8FF', text: "Own name not found in search; can't compare status history and view log; place lost in the queue; routing detour." },
      { label: 'New features', count: 5, color: '#E7DFFF', text: 'Auto-refresh, pin to top, Excel export, a call counter, a FileNet link.' },
      { label: 'Not working as expected', count: 3, color: '#1C1C1C', text: 'A dead "Create new credit request" button; employee search missed a user; a "don\'t touch" cursor on a copyable field.' },
    ], // white count text on the first and last segments, ink on the middle three
  },
  /** Sticky + hand note pinned next to the Fig. 5 bar chart on the canvas. */
  note: { sticky: 'Every participant raised Notes, unprompted.', hand: '16 of 35 → the clearest signal in the whole study' },
  // title/p/caption/beforeTitle/afterTitle/afterNote moved into notesChapter (Chapter 07);
  // mock/gestalt stay here since notesChapter.shipped/.recommended reuse this same invented text.
  notes: {
    mock: [ // invented for illustration; the mock figure's caption says so
      { head: '03/02 · GENERAL', lines: ['Spoke with dealer. Customer adding second unit.'] },
      { head: '03/04 · FINANCIALS', lines: ['Requested 2020 statements.', 'Received balance sheet only.'] },
      { head: '03/05 · DECISION', lines: ['Counteroffer: shorter term.', 'Letter sent to dealer.'] },
    ],
    gestalt: 'The Gestalt principles explain why this matters. Spacing created grouping by proximity, consistent formatting created grouping by similarity, and separate blocks created common regions. Removing those cues turned scanning into reading, which is the cognitive load participants described. It is a finding that does not show up in a quant survey.',
  },
  more: [
    { title: 'Accessibility', text: 'Browser zoom enlarges the rest of the interface but not the Notes text. That fails the intent of WCAG 1.4.4 (Resize text).' },
    { title: 'Overlays', text: "Notes, status history and the view log open as overlays that close only with X and can't be moved, so users can't compare them with the page behind." },
    { title: 'Queue state', text: 'Leaving an item in a long queue loses your place, so users go back to the list to find what they were working on.' },
    { title: 'Routing regression', text: 'The old "route to bottom of the list" option is gone, replaced by a detour through another queue.' },
  ],
};

/** Before/after quote pairs (§3.9), one per dimension. */
export const quotes = [
  {
    dimension: 'System performance',
    before: 'It will spin and it will close out.',
    after: 'It hasn’t been down, and it is quicker than old ABTools.',
  },
  {
    dimension: 'Ease of use',
    before: 'Intimidating and overwhelming.',
    after: 'They got away from a lot of information we never looked at. It is cleaned up.',
  },
  {
    dimension: 'Satisfaction, the one that lagged',
    before: 'It is not great, but it is what we have.',
    after: 'I don’t feel the notes, they are not convenient.',
  },
];

/** AffinityBoard columns (§3.9). Counts must sum to 35 (matches qualitative.themes). */
export const affinity = {
  heading: '35 issues, one loud theme',
  note: 'every participant raised Notes without being asked ↑',
  caption: 'Fig. 10. The synthesis board, redrawn. Quotes shortened, no names.',
  columns: [
    {
      theme: 'Notes',
      count: 16,
      wide: true,
      items: [
        'It shows us a big chunk, it is hard to read.',
        'Make the comments box bigger.',
        'View all comments: too much at once.',
        'Too small to see.',
        'Would be nice to fix a typo in someone else’s comment.',
        'The previous ABTools was better with the comments.',
        '+ 10 more notes',
      ],
    },
    {
      theme: 'Usability',
      count: 6,
      items: [
        'Zoom doesn’t make Notes text bigger',
        'Overlay only closes with the X',
        'No default comment type',
        '+ 3 more',
      ],
    },
    {
      theme: 'Efficiency',
      count: 5,
      items: [
        'Search doesn’t find my own name',
        'Lose my place in a 136-item queue',
        'Route-to-bottom became a detour',
        '+ 2 more',
      ],
    },
    {
      theme: 'New features',
      count: 5,
      items: [
        'Refresh button for new deals',
        'Pin my name to the top',
        'Export queues to Excel',
        '+ 2 more',
      ],
    },
    {
      theme: 'Not working',
      count: 3,
      items: [
        '“Create new credit request” does nothing',
        'Employee search skips me',
        'Scary “don’t touch” cursor on a loan number I need to copy',
      ],
    },
  ],
};

/**
 * Chapter 07 · The Notes problem (§3.10). The run-on paragraph and the
 * formatted card reuse the invented text in qualitative.notes.mock, so all
 * note text stays fictional in one place.
 */
export const notesChapter = {
  lead: 'Analysts typed comments with careful spacing so others could scan them quickly. The new tool squeezed every note into one paragraph, in a small box, with text that didn’t grow when they zoomed.',
  pullQuote: {
    text: 'The comments are all together. I typed in very well layout with spaces, but it shows us as a big chunk. It is hard to read.',
    cite: 'Participant, wave 2',
  },
  label: 'Illustrative mock · made-up text, not customer data',
  shipped: {
    title: 'As shipped',
    appBar: 'ABTools · Credit request · Comments',
    viewAllLabel: 'View all comments',
    chips: ['one run-on paragraph', 'fixed 12px text', 'closes only with X'],
  },
  recommended: {
    title: 'Recommended pattern',
    cardAuthors: ['Credit analyst · Today, general', 'Processing specialist · Yesterday, bank'],
    showFullLabel: 'Show full note',
    sidePanel: {
      title: 'Side panel',
      text: 'Open notes next to the application, so analysts can read and compare without losing their place.',
      closeLabel: 'Close (Esc)',
    },
    chips: ['keeps line breaks', 'rem text scales with zoom', 'expand or side panel', 'Esc or outside click closes'],
  },
  note: 'analysts type spacing on purpose →',
  caption: 'Fig. 11. Notes as shipped, and the recommended pattern. Illustrative mock with made-up text.',
};

export const rightWrong = {
  intro: "I didn't design the new ABTools, but the data shows which of its design decisions worked and which didn't.",
  right: [
    { title: 'Kept the legacy tab layout and labels', text: 'Experts transferred their muscle memory with little or no training. Learnability +12.5 pts.', principle: 'Consistency · recognition over recall' },
    { title: 'Removed unused fields', text: 'Information nobody looked at was cleaned up, and fields now fit underwriting. Ease of Use +13.7 pts.', principle: 'Signal-to-noise · figure/ground' },
    { title: 'Moved from desktop to web', text: 'Quicker, no kick-outs, no forced password changes. System Performance +35 pts.', principle: 'Reliability · system feedback' },
    { title: 'Simplified error messages', text: 'Clearer than before. Human Error Support +18.4 pts.', principle: 'Error recovery' },
  ],
  /** HandNote under Keep, §3.11. */
  keepNote: 'continuity is a feature for experts',
  // Replaced per spec §3.11 — exactly these 10 rows, not the old 9.
  wrong: [
    ['Notes shown as one block in a small box', 'Proximity · similarity · common region'],
    ["Notes text doesn't scale with zoom", 'WCAG 1.4.4 Resize text'],
    ['Overlays that close only with X', 'Modes · modal design'],
    ['Error messages with no next step', 'Error recovery'],
    ['Split employee and application queues, lost queue position', 'State persistence'],
    ['Route-to-bottom option removed', 'Workflow regression'],
    ['"Don\'t touch" cursor on a loan number people need to copy', 'Affordance · signifiers'],
    ['Buttons that fail silently', 'Visibility of system status'],
    ['No default comment type', 'Sensible defaults'],
    ['FileNet in a separate browser tab', 'Context switching'],
  ],
};

export const designSystem = {
  lead: 'Instead of a list of bugs, I framed the findings as six reusable patterns, so other JDF tools wouldn’t repeat them.',
  rows: [
    ['Notes lose their formatting', 'A comment display that keeps line breaks and spacing, in an expandable text area'],
    ["Zoom doesn't enlarge Notes", 'Type sized in relative units, so all text scales'],
    ["Overlays close only with X and can't move", 'A modal standard: dismiss on outside click; a side panel when users must compare'],
    ['Errors give no next step', 'One error pattern: what happened, why, what to do'],
    ['Search misses users; queues lose your place', 'List patterns: inclusive search, retained state, pin, refresh, export'],
    ['"Don\'t touch" cursor, silent buttons', 'Clear disabled and read-only states'],
  ], // columns: Finding, Pattern to fix it once
  /** PatternTiles (§3.12): 6 reusable patterns, before (dashed) vs after (solid accent). */
  tilesLabel: 'Illustrative sketches · dashed = before, solid = after',
  tilesNote: '10 bugs in one tool → 6 patterns every JDF tool can reuse',
  tiles: [
    {
      name: 'Comment display',
      before: ['Run-on paragraph'],
      after: ['Same text with line breaks and dashes'],
    },
    {
      name: 'Relative type',
      before: ['200% zoom: Notes text stays 12px, other UI grows'],
      after: ['200% zoom: Notes text grows too, everything in rem'],
    },
    {
      name: 'Modal standard',
      before: ['Only the X closes it.', 'Can’t see the page behind.'],
      after: ['Main area + side panel.', 'Esc or outside click closes. Compare side by side.'],
    },
    {
      name: 'One error pattern',
      before: ['Error. Operation failed.', 'No reason, no next step.'],
      after: ['We couldn’t save this note.', 'The connection dropped.', '[Try again]', 'What happened · why · what to do.'],
    },
    {
      name: 'List patterns',
      before: ['Search: my name → no results', 'Leave and come back: back to the top of 136 items'],
      after: ['Pinned: My worklist', 'Refresh', 'Export', 'Search includes you, even with 0 items. Your place is kept.'],
    },
    {
      name: 'Clear states',
      before: ['Filled button "Create credit request"', 'Looks active, does nothing.'],
      after: ['Disabled-style button', 'Disabled look, plus the reason: “Available after the application is saved.”'],
    },
  ],
};

/**
 * Recommendations table, moved to Impact (§3.13); the old lead/p/stats are
 * gone, replaced by prologue (SurveyBars + stickies) in the Prologue chapter.
 */
export const org = {
  rows: [
    ['Ongoing feedback loop', 'Want UX support at launch (feedback loops, live testing)', 26],
    ['Passive behavioral analytics', 'Cited evidence-based decision making as a benefit of UX', 11],
    ['Passive behavioral analytics', 'Want UX support on metrics', 5],
    ['Proactive research before releases', 'Want UX support in discovery', 29],
    ['More UX capacity', 'Asked for more dedicated UX resources', 22],
  ], // columns: Recommendation, Survey evidence, Of 40
  caveat: 'Directional only: anonymous, multi-select, no stated response rate, and the UX team surveyed its own support.',
};

export const impact = {
  cards: [
    { kicker: 'Impact 1', title: 'Leadership got proof', paras: ['A benchmarked before/after result instead of “users seem to like it”.'] },
    { kicker: 'Impact 2', title: 'Notes went to the top', paras: ['The Notes issue became a high-priority backlog item, with a specific fix: keep formatting, enlarge the box, let text scale with zoom.'] },
    { kicker: 'Impact 3', title: 'Research kept going', paras: ['I recommended a feedback loop, behavioural analytics and research before each release.'] },
  ],
  quote: "This study wasn't designed to show that the redesign worked. It was designed so that if the redesign didn't work, we'd know.",
  /** "Where it led" (§3.13) — the FY24 OKRs came after this study; never implied the reverse. */
  whereItLed: {
    heading: 'Where it led',
    text: 'Later, the UX team’s FY24 objective was to “pave the path for Elite Product UX”. Two of its strategic initiatives were defining UX metrics and building research operations. Studies like this one were the kind of evidence those goals asked for.',
  },
  /** OkrBoard (§3.13), redrawn without names. */
  okr: {
    objective: 'Pave the path for Elite Product UX with entry points, growth potential, and high-performing expectations.',
    keyResults: [
      'Each BCA adds one new UX behaviour',
      '5% growth in recognised products that use the Fuel design system',
      'Consolidate UX documentation from 19 BCA solutions into 1',
    ],
    initiatives: [
      { title: 'Digital Mastery', text: 'Growth in no-regret skills' },
      { title: 'UX Foundations', text: 'One enterprise UX design system' },
      { title: 'Productivity Gains', text: 'Define UX metrics: definition, adoption, governance', highlight: true },
      { title: 'Research Operations', text: 'Repository for research standards, personas, journey maps', highlight: true },
      { title: 'Shift Left', text: 'Cost, delivery and risk insights to drive action' },
      { title: 'Transformation Portal', text: 'UX roles and paths for success' },
    ],
    note: 'ABTools (2021) was an early example of the metrics + research ops these goals asked for',
    caption: 'Fig. 12. UX team OKRs, FY24 Q2, redrawn without names.',
  },
};

export const limitations = {
  lead: "What this study can and can't claim.",
  rows: [
    ['Four participants', 'Results are descriptive. Percentages from four people can shift with a single answer, so I report direction and size, not statistical significance.'],
    ['No control group', 'Using the same people rules out group differences, but not changes over time (new processes, growing skill) or order effects (the old system was always rated first).'],
    ['Embedded researcher', 'I worked inside the product team, which can nudge participants toward positive answers.'],
    ['Attitudes, not behavior', 'The data is what people said, not what they did. Task timing and analytics would test the productivity gains directly, which is why I recommended them.'],
    ['Single coder', 'One person grouped the 35 issues into themes.'],
  ],
};

export const nextTime = [
  { when: 'During the familiarization window', title: 'Diary study', text: 'Shows the adaptation curve between the two waves: how ratings change as people settle in, not just where they end up.' },
  { when: 'Both waves', title: 'Task metrics', text: 'Time on task, error rate and SEQ give behavioral evidence for the productivity claim, to set beside what people said.' },
  { when: 'Analysis', title: 'Severity ratings', text: 'An impact and effort rating for each of the 35 issues, so the backlog is prioritized by harm, not just frequency.' },
];

export const lessons = [
  { title: 'Timing is a method decision.', text: 'Asking the same question on day one and after two months of real use gives different answers. Choosing when to measure mattered as much as choosing what to measure.' },
  { title: 'Small samples buy depth, not proof.', text: 'Four power users gave rich, specific feedback, but not statistical certainty. Saying so plainly makes the findings more credible, not less.' },
  { title: "The most important finding wasn't in the numbers.", text: 'Every participant raised the Notes feature, yet no score pointed to it. The scores told us how much changed; the verbatims told us what to fix.' },
  { title: 'Continuity is a design decision too.', text: 'Keeping the old layout and labels protected 20 years of muscle memory. Good redesigns for expert users change what hurts and leave what works.' },
];