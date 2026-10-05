/**
 * ABTools / John Deere Financial case study content.
 * Source of truth: abtools-case-study-cursor-spec.md §5 — do not rewrite copy.
 * Placeholders in [SQUARE BRACKETS] stay visible until resolved.
 */

export const hero = {
  category: 'Mixed-methods UX benchmark · Two-wave within-subjects study',
  title: "When did 'better' actually mean better?",
  subtitle: "Measuring whether the redesign of a 20-year-old credit processing system genuinely improved usability for the people who can't walk away from it.",
  meta: [
    { label: 'Role', value: 'UX Researcher' },
    { label: 'Team', value: 'UX Researcher (self), embedded product team' },
    { label: 'Timeline', value: 'Jan to Aug 2021' },
  ],
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
  { label: 'Participants', value: '4 power users, one per role, 3.5 to 20+ yrs with ABTools' },
];

export const overview = [
  'John Deere Financial was migrating ABTools, its core credit processing system, from a legacy desktop application to a web platform. Its users spend anywhere from 2 hours to a full working day in it, and some had used the old version for 20 years. The team needed more than "it looks cleaner." They needed evidence.',
  'I designed and ran an eight-month, two-wave study with the same four power users to answer two questions: did the redesign genuinely improve usability, and where should the team focus next?',
];

export const background = {
  lead: 'Credit decisions move fast. Friction compounds.',
  p1: 'Analysts often decide on an application the same day, sometimes in a 15-minute review, while taking 10 to 20 calls a day from dealers and customers. Every extra click, session timeout or cryptic error compounds across users, teams and quarters.',
  context: [
    { value: 'Same day', label: 'Typical decision window' },
    { value: '15 min', label: 'Shortest application review' },
    { value: '10 to 20', label: 'Calls a day' },
    { value: '136 items', label: "In one participant's queue", highlight: true },
  ],
  p2: "ABTools sits at the center of that work, but not alone. A redesign is judged inside a workflow it doesn't fully own.",
  systems: ['ABTools', 'MARS', 'CreditPath', 'ACAPS', 'FileNet', 'SharePoint', 'Word', 'Excel'], // first is the emphasis chip
  p3: 'These users had up to 20 years of muscle memory in the old system. A redesign that looked cleaner but disrupted those patterns would be worse, not better. The business was confident the new product was an improvement. Before the team stood behind it with leadership and in the roadmap, they needed data.',
};

export const beforeAfter = {
  caption: 'The migration at a glance: desktop to web',
  before: { img: '/work/john-deere/abtools-before.png', alt: 'Previous ABTools desktop application, redacted', title: 'Before · January 2021', text: 'Timeouts after an hour, cryptic pop-ups, VPN re-logins. SUS 60.' },
  after: { img: '/work/john-deere/abtools-after.png', alt: 'Current ABTools web application, redacted', title: 'After · August 2021', text: 'Same tab layout and labels, fewer unused fields, no kick-outs. SUS 85.6.' },
};

export const problem = {
  lead: 'Did the redesign work, and what should the team fix next?',
  p: 'That was the decision to inform, and a generic post-launch survey could not answer it. Ratings taken right after a migration mix three things together. A one-shot study tells you about the learning curve, not the product. A two-wave study with a deliberate familiarization window can separate them.',
  forces: [
    { kind: 'Bias', title: 'Novelty effect', text: 'New feels good, simply because it is new.' },
    { kind: 'Bias', title: 'Change aversion', text: 'New feels wrong, simply because it is unfamiliar.' },
    { kind: 'Signal', title: 'Genuine usability change', text: 'What is left once the first two have faded.', solid: true },
  ],
  rqs: [
    'Did the redesign improve usability across the six measured dimensions?',
    'Which dimensions improved most, and what drove those gains?',
    'Where does meaningful friction remain for daily power users?',
  ],
};

export const design = {
  lead: 'Two waves, the same people, and time to settle in.',
  paras: [
    { strong: 'Two waves, same people.', text: 'The same four participants evaluated both systems with identical instruments, in January (old ABTools) and August (new ABTools). Using the same people removes differences between groups as an explanation for any change.' },
    { strong: 'A familiarization window.', text: 'Participants began using the new ABTools in their real jobs in May and June. By the August evaluation they had about 2 to 3 months of working experience with it, enough for novelty and change aversion to fade.' },
  ],
  timeline: {
    caption: 'Fig. 1: Study timeline, January to August 2021',
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
  },
  instruments: [
    { title: 'System Usability Scale', text: 'Standardized 10-item scale (Lewis and Sauro, 2009), benchmarkable against industry (68), Global IT (63) and the FY21 target (67).' },
    { title: 'Custom Likert questionnaire', text: 'Six sections: Satisfaction, Ease of Use, Learnability, System Performance, Human Error Support, Productivity. Reported as % favorable. [SCORING RULE] · [ITEMS PER DIMENSION]' },
    { title: 'Open-ended probes', text: 'Verbatims explain why scores moved, and surface what no rating scale asks about.' },
  ],
  tradeoffs: [
    ['Within-subjects, same four people', 'Small expert population; each person is their own control', 'Fixed order (old always first); carryover'],
    ['Familiarization window before wave 2', 'Let novelty and change aversion fade', 'Time-based effects (history, maturation) creep in'],
    ['Purposive sample, one person per role', 'Depth and role coverage', 'Not generalizable'],
    ['SUS plus custom Likert', 'Benchmark plus JDF-specific dimensions', 'Custom scale is unvalidated'],
    ['Report % favorable, not means', 'Easy for stakeholders to read', 'Hides the spread of answers'],
    ['Rank issues by frequency', 'Simple backlog priority', 'Frequency is not severity'],
  ], // columns: Decision, Why, Trade-off
};

export const participants = {
  lead: "Four mandatory users. They can't walk away.",
  p: "ABTools is part of their job, so they can't leave when something frustrates them. Their friction stays in the system, which is exactly why it's worth studying. Reviews can take as little as 15 minutes, so minutes of friction are a large share of each decision.",
  profiles: [
    { role: 'Senior Credit Analyst', name: 'Decision-maker analyst', hours: '4 to 6 hrs / day', tenure: '3.5 yrs experience', tenurePct: 18, text: 'Reviews applications, makes same-day decisions, spreads financials. Needs scannable notes and a fast personal worklist.', systems: 'ABTools · MARS · CreditPath' },
    { role: 'Credit Analyst, credit admin', name: 'High-volume admin analyst', hours: 'All day', tenure: '[TENURE] experience', tenurePct: 50, unverified: true, text: 'Admin work that differs from normal analysts; dealer and customer calls. Needs speed and no routing detours.', systems: 'ABTools · ACAPS' },
    { role: 'Credit Processing Specialist', name: 'Processing specialist', hours: '2 to 3 hrs / day', tenure: '15+ yrs experience', tenurePct: 75, text: 'Turndown and counteroffer letters, bank rating, FileNet import. Needs reliable handoffs and errors that say what to do.', systems: 'ABTools' },
    { role: 'Manager, Retail Credit Delivery Admin', name: 'Manager', hours: '2 to 4 hrs / day', tenure: '20+ yrs experience', tenurePct: 100, text: 'Sets up worklists, sets priority order, trains staff. Needs queue visibility, search that finds everyone, and export.', systems: 'ABTools · ACAPS' },
  ], // unverified: render the tenure bar with the hatch, not solid
  note: 'User profiles, not personas: one person per role. Bars show tenure with ABTools.',
};

export const workflow = {
  lead: 'Where the friction sits in a working day.',
  p: 'Pinning each finding to the step where it happens shows that the remaining problems cluster around reading history and moving through queues, not around the decision itself.',
  caption: 'Fig. 2: Simplified workflow with findings pinned to steps [VERIFY STEP ORDER]',
  steps: [
    { title: 'Work the queue', findings: ['Own name not found in employee search', 'No auto-refresh, pin or Excel export'] },
    { title: 'Open an application', findings: ['Place lost in a long queue', '"Create new credit request" failed silently'] },
    { title: 'Read the history', findings: ['Notes collapse into one unformatted block', 'Zoom does not enlarge Notes text', 'Overlays close only with X'], emphasis: 0 },
    { title: 'Decide and route', findings: ['"Route to bottom" removed', 'Errors give no next step'] },
    { title: 'Letters and handoff', findings: ['No direct link to FileNet', 'Separate browser tab adds context switching'] },
  ],
};

export const results = {
  lead: 'SUS rose 25.6 points and cleared every benchmark.',
  p: 'The previous ABTools sat below the Global IT average. The new one scored 85.6, above the FY21 target and the industry average. These are descriptive results from four people: direction and size, not statistical significance.',
  sus: {
    caption: 'Fig. 3: SUS score against benchmarks, 0 to 100, n=4',
    rows: [
      { label: 'Previous ABTools', value: 60.0, kind: 'prev' },
      { label: 'Global IT average', value: 63, kind: 'bench' },
      { label: 'FY21 target', value: 67, kind: 'bench' },
      { label: 'Industry average', value: 68, kind: 'bench' },
      { label: 'Current ABTools', value: 85.6, kind: 'current' },
    ], // bar width = value%
  },
  dimensions: {
    caption: 'Fig. 4: % favorable by dimension, n=4',
    rows: [ // sorted by change, largest first
      { label: 'System Performance', before: 62.5, after: 97.5, change: 35.0, highlight: true },
      { label: 'Human Error Support', before: 56.6, after: 75.0, change: 18.4 },
      { label: 'Ease of Use', before: 75.0, after: 88.7, change: 13.7 },
      { label: 'Learnability', before: 80.0, after: 92.5, change: 12.5 },
      { label: 'Productivity', before: 71.2, after: 82.5, change: 11.3 },
      { label: 'Satisfaction', before: 71.2, after: 75.0, change: 3.8, muted: true },
    ], // bar width = value * 0.88 %, leaving room for the value label
  },
  stories: [
    { kicker: 'Biggest gain · +35.0 pts', title: 'System Performance: the kick-outs stopped.', paras: ['Before, sessions timed out after an hour of inactivity, cryptic pop-ups closed the system, and VPN conflicts forced re-logins. After, participants reported consistent speed, no kick-outs and no downtime.', 'One participant added that a few buttons still didn\'t work and gave no sign of it, and said that once those worked the score "could be 100."'], accent: true },
    { kicker: 'Smallest gain · +3.8 pts', title: 'Satisfaction: specific irritants, not lost familiarity.', paras: ['The verbatims name concrete problems: jumping between fields, an export workaround, repeated confirmation dialogs and, above all, the Notes feature.', 'With four participants, a change this small may also reflect a single answer, so I treat it as a signal to watch, not a finding.'] },
  ],
};

export const qualitative = {
  lead: "The most important finding wasn't in the numbers.",
  p: 'Thematic analysis of the open-ended probes produced 35 issues in five themes. Nearly half were about one feature that no score pointed to.',
  themes: {
    caption: 'Fig. 5: 35 issues by theme',
    rows: [ // counts must sum to 35; segment width = count / 35
      { label: 'Notes', count: 16, color: '#7952F5', text: 'Comments collapse into one block; small box; "view all" breaks the layout; can\'t fix a colleague\'s typo.' },
      { label: 'Usability', count: 6, color: '#A58CFB', text: 'Zoom ignores Notes text size; no default comment type; worklist navigation; overlay closes only with X.' },
      { label: 'Efficiency', count: 5, color: '#C9B8FF', text: "Own name not found in search; can't compare status history and view log; place lost in the queue; routing detour." },
      { label: 'New features', count: 5, color: '#E7DFFF', text: 'Auto-refresh, pin to top, Excel export, a call counter, a FileNet link.' },
      { label: 'Defects', count: 3, color: '#1C1C1C', text: 'Bugs, not usability issues: a dead "Create new credit request" button; employee search missed a user; a "don\'t touch" cursor on a copyable field.' },
    ], // white count text on the first and last segments, ink on the middle three
  },
  notes: {
    title: 'Every participant raised the Notes feature.',
    p: 'In the old system, analysts laid out their comments with spacing and structure so they could scan an application\'s history quickly. The new system collapses all notes into one unformatted block in a small box. In their words, comments are "squeezed together" and show up as "a big chunk."',
    caption: 'Fig. 6: Notes, before and after. Illustrative mock, not real customer data',
    beforeTitle: 'Before: formatted, scannable',
    afterTitle: 'After: one block in a small box',
    mock: [ // invented for illustration; keep the caption that says so
      { head: '03/02 · GENERAL', lines: ['Spoke with dealer. Customer adding second unit.'] },
      { head: '03/04 · FINANCIALS', lines: ['Requested 2020 statements.', 'Received balance sheet only.'] },
      { head: '03/05 · DECISION', lines: ['Counteroffer: shorter term.', 'Letter sent to dealer.'] },
    ], // "after" = the same text joined into one paragraph, in a 96px-high box with overflow hidden
    afterNote: 'Same content. Grouping by proximity, similarity and common region is gone, so scanning becomes reading.',
    gestalt: 'The Gestalt principles explain why this matters. Spacing created grouping by proximity, consistent formatting created grouping by similarity, and separate blocks created common regions. Removing those cues turned scanning into reading, which is the cognitive load participants described. It is a finding that does not show up in a quant survey.',
  },
  more: [
    { title: 'Accessibility', text: 'Browser zoom enlarges the rest of the interface but not the Notes text. That fails the intent of WCAG 1.4.4 (Resize text).' },
    { title: 'Overlays', text: "Notes, status history and the view log open as overlays that close only with X and can't be moved, so users can't compare them with the page behind." },
    { title: 'Queue state', text: 'Leaving an item in a long queue loses your place, so users go back to the list to find what they were working on.' },
    { title: 'Routing regression', text: 'The old "route to bottom of the list" option is gone, replaced by a detour through another queue.' },
  ],
};

export const rightWrong = {
  intro: "I didn't design the new ABTools, but the data shows which of its design decisions worked and which didn't.",
  right: [
    { title: 'Kept the legacy tab layout and labels', text: 'Experts transferred their muscle memory with little or no training. Learnability +12.5 pts.', principle: 'Consistency · recognition over recall' },
    { title: 'Removed unused fields', text: 'Information nobody looked at was cleaned up, and fields now fit underwriting. Ease of Use +13.7 pts.', principle: 'Signal-to-noise · figure/ground' },
    { title: 'Moved from desktop to web', text: 'Quicker, no kick-outs, no forced password changes. System Performance +35 pts.', principle: 'Reliability · system feedback' },
    { title: 'Simplified error messages', text: 'Clearer than before. Human Error Support +18.4 pts.', principle: 'Error recovery' },
  ],
  wrong: [
    ['Notes shown as one block in a small box', 'Proximity · similarity · common region'],
    ["Notes text doesn't scale with zoom", 'WCAG 1.4.4 Resize text'],
    ['Overlays for notes, history and log', 'Modes · modal design'],
    ['Error messages with no next step', 'Errors are a design problem'],
    ['Split employee and application queues', 'State persistence'],
    ['Removed route-to-bottom', 'Workflow regression'],
    ['"Don\'t touch" cursor on a copyable loan number', 'Signifiers'],
    ['Unfinished buttons that fail silently', 'Visibility of system status'],
    ['No default comment type', 'Sensible defaults'],
    ['Separate browser tab with its own icon', 'Integration'],
  ],
};

export const designSystem = {
  lead: 'Fix it once, and every internal tool benefits.',
  p: 'The findings translate into reusable patterns. As recommendations, each one turns a single ABTools issue into a standard other products could inherit.',
  rows: [
    ['Notes lose their formatting', 'A comment display that keeps line breaks and spacing, in an expandable text area'],
    ["Zoom doesn't enlarge Notes", 'Type sized in relative units, so all text scales'],
    ["Overlays close only with X and can't move", 'A modal standard: dismiss on outside click; a side panel when users must compare'],
    ['Errors give no next step', 'One error pattern: what happened, why, what to do'],
    ['Search misses users; queues lose your place', 'List patterns: inclusive search, retained state, pin, refresh, export'],
    ['"Don\'t touch" cursor, silent buttons', 'Clear disabled and read-only states'],
  ], // columns: Finding, Pattern to fix it once
};

export const org = {
  lead: 'Teams valued UX. They underused it for evidence.',
  p: 'In parallel, the JDF UX team surveyed 40 product team members (June 28 to July 6, 2021) about working with UX. The survey showed where UX was underused, and those gaps shaped my recommendations.',
  stats: [
    { value: '35 of 40', text: 'had collaborated with a UX practitioner' },
    { value: '27 of 40', text: 'were very satisfied' },
    { value: '33 of 40', text: 'valued UX for a user-centered mindset' },
    { value: '11 of 40', text: 'cited evidence-based decisions. That gap is the case for analytics.', solid: true },
  ],
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
    { kicker: 'Impact 1', title: 'Gave leadership evidence, not opinion.', paras: ['SUS moved from below the Global IT average to "excellent", with gains on every dimension the team cared about.'] },
    { kicker: 'Impact 2', title: 'Directed what comes next.', paras: ['The Notes issue entered the backlog as a high-priority item with a specific fix: keep comment formatting, enlarge the comment box, and let text scale with zoom.', '[WHAT HAPPENED NEXT: did the Notes fix ship?]'] },
    { kicker: 'Impact 3', title: 'Shifted the model.', paras: ['Three recommendations, each backed by the engagement survey: an ongoing feedback loop, passive behavioral analytics, and proactive research ahead of releases.'] },
  ],
  quote: "This study wasn't designed to show that the redesign worked. It was designed so that if the redesign didn't work, we'd know.",
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