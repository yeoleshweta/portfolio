/* All copy for /work/abim lives here, not in components. It follows the design PDF ("ABIM case study page")
   and the copy in the rewrite doc ("ABIM Case Study: Rewrite for AI-Product UXR Roles"). Bracketed items such
   as [N] are placeholders the doc asks to confirm before publishing; they stay visible until then.
   - Titles mark their italic words with *...*. */

export type Stat = {
  value: string;
  label: string;
};

export const hero = {
  category: "Case study · UX research for AI products · Human-AI research",
  title: "Teaching an AI what good doctor communication looks like",
  subtitle:
    "How I defined, measured and governed an AI system that reads physician-patient conversations, so its judgments could support human educators instead of replacing them.",
  meta: [
    { label: "Role", value: "Innovation Analyst, Data & Research · ABIM" },
    { label: "Team", value: "I/O psychologists, data scientist, AI/ML engineer" },
    { label: "Timeline", value: "6 months, Sep 2025 – Mar 2026" },
    { label: "Methods", value: "Expert interviews, expert review, human-AI agreement, calibration" },
  ],
  scope:
    "Scope: this phase researched the AI system before any interface existed. Research with people was with internal experts and human graders; testing with physicians is the planned next study.",
  tldr: [
    {
      title: "Problem",
      body: "Physicians are tested on medical knowledge, but communication is almost never measured at scale. Human raters top out at about 50 conversations a week.",
    },
    {
      title: "Who it's for",
      body: "Clinical educators and assessment staff who give physicians feedback, and the physicians who receive it.",
    },
    {
      title: "What I found",
      body: "The AI agreed with human graders on behaviors with clear wording (κ .78) and struggled with ones that need inference (κ .47). 4 of 16 skills can't be seen in text at all.",
    },
    {
      title: "What it changed",
      body: "Real clinical encounters replaced synthetic data, uncertain judgments go to a human, and outputs are formative feedback only, never a credentialing score.",
    },
  ],
  stats: [
    { value: "985", label: "clinical conversations" },
    { value: "12 of 16", label: "skills an AI can detect in text" },
    { value: "11", label: "rubrics built with experts" },
    { value: ".47–.78", label: "human-AI agreement (Cohen's κ)" },
    { value: "0.08", label: "calibration error (target < 0.10)" },
  ] as Stat[],
};

export const sectionNav = [
  { id: "problem", label: "01 · The problem and who it's for" },
  { id: "approach", label: "02 · How I worked with people" },
  { id: "good", label: "03 · Defining good before training" },
  { id: "agreement", label: "04 · Where the AI agrees with people" },
  { id: "trust", label: "05 · When a human must step in" },
  { id: "decision", label: "06 · The decision that mattered" },
  { id: "governance", label: "07 · Governance and privacy" },
  { id: "limits", label: "08 · Limits and the next study" },
  { id: "owned", label: "09 · What I owned" },
];

export const problem = {
  title: "The problem and who it's *for*",
  paragraphs: [
    "More physician-patient conversations are recorded than ever, through ambient listening, AI scribes and telehealth. Yet the skill that most shapes whether patients understand and follow their care, communication, is rarely measured. ABIM certifies physicians on six competencies, and medical knowledge is the only one tested rigorously. The only routine measure of communication is the patient satisfaction survey, which is rare, self-selected and indirect.",
    "Human experts can grade communication well, but they top out at about 50 conversations a week and drift over time. ABIM's Innovation team asked whether AI could help. We reframed the question early: this wasn't a model problem but a measurement problem. If we couldn't define \"good communication\" in a way people agreed on, no model could learn it.",
  ],
  peopleTitle: "The people the system would serve",
  people: [
    { title: "Clinical educators", body: "Need specific, credible moments to coach on, without reviewing every recording." },
    { title: "Physicians and trainees", body: "Need feedback they can act on, framed as development, not judgment." },
    { title: "Assessment staff", body: "Need evidence the measure is valid, fair and safe to use." },
  ],
  questionsTitle: "Research questions",
  questions: [
    "What does a correct judgment look like, in terms clinical experts already use?",
    "Where does the AI agree with human graders, and where does it fail?",
    "Which communication behaviors can an AI see in a transcript, and which can't it?",
    "When should a human review the AI's judgment instead of accepting it?",
  ],
};

export const approach = {
  title: "How I worked with *people*",
  lead:
    "The AI could only be as good as the human judgment it learned from, so most of the research was with experts.",
  steps: [
    {
      step: "Step 1",
      title: "Expert interviews",
      body: "I interviewed [N] internal experts ([roles]) on how communication is judged today, where raters disagree, and what a defensible AI judgment needs to show.",
    },
    {
      step: "Step 2",
      title: "Rubrics from validated frameworks",
      body: "Calgary-Cambridge and NURSE turned into 11 rubrics with explicit inclusion and exclusion rules.",
    },
    {
      step: "Step 3",
      title: "Expert review",
      body: "I/O psychologists and clinical educators [N] checked every item against communication standards. [One change their review caused.]",
    },
    {
      step: "Step 4",
      title: "Human graders as the benchmark",
      body: "[N] graders hand-coded [N] conversations, the gold set the AI was compared against.",
    },
  ],
};

export const good = {
  title: "Defining \"good\" *before* training anything",
  lead:
    "The two frameworks together cover 16 nuanced skills. For each one I asked: can an AI actually see this in a transcript? Four live in tone, body language or a doctor's inner state, so we left them out rather than let the AI guess.",
  detectable: {
    count: "12",
    title: "skills the AI can detect",
    note: "Explicit verbal behaviors, visible in text",
    items: [
      "Empathy and compassion",
      "Relationship and trust building",
      "Bridging relational gaps",
      "Active listening",
      "Open-ended questioning",
      "Patient-centered interviewing",
      "Complex clinical reasoning",
      "Eliciting context",
      "Shared decision-making",
      "Collaborative phrasing",
      "Strategic agenda setting",
      "Indirect emotional inquiry",
    ],
  },
  left: {
    count: "4",
    title: "skills left out on purpose",
    note: "Need audio, video or a view of internal state",
    items: [
      "Nonverbal facilitation",
      "Bedside manner",
      "Emotional regulation",
      "Behavioral adaptability",
    ],
    body:
      "Scoping these out was a product decision: an AI that guesses at what it can't see produces feedback nobody should trust.",
  },
};

/* Kappa per behavior, sorted high to low, as the design shows. F1, precision and recall are the per-construct
   figures from the model evaluation; macro-F1 is their unweighted mean. */
export const agreement = {
  title: "Where the AI agrees with people, *and where it doesn't*",
  lead:
    "Agreement between the AI and human graders ranged from κ .47 to .78 across 11 behaviors. The pattern mattered more than the average: clear wording scored high, inference scored low.",
  chartTitle: "Human-AI agreement by behavior (Cohen's κ, 0 to 1)",
  threshold: 0.61,
  behaviors: [
    { name: "NURSE: Name", kappa: 0.78, f1: 0.87, precision: 0.89, recall: 0.85 },
    { name: "Closing / next steps", kappa: 0.76, f1: 0.85, precision: 0.86, recall: 0.84 },
    { name: "Build rapport", kappa: 0.74, f1: 0.86, precision: 0.84, recall: 0.87 },
    { name: "Summary / check-back", kappa: 0.71, f1: 0.81, precision: 0.83, recall: 0.8 },
    { name: "Signposting", kappa: 0.68, f1: 0.79, precision: 0.82, recall: 0.78 },
    { name: "NURSE: Support", kappa: 0.66, f1: 0.78, precision: 0.76, recall: 0.81 },
    { name: "Agenda setting", kappa: 0.62, f1: 0.74, precision: 0.71, recall: 0.76 },
    { name: "NURSE: Respect", kappa: 0.61, f1: 0.72, precision: 0.74, recall: 0.71 },
    { name: "NURSE: Understand", kappa: 0.58, f1: 0.69, precision: 0.71, recall: 0.68 },
    { name: "Patient narrative", kappa: 0.55, f1: 0.66, precision: 0.68, recall: 0.64 },
    { name: "NURSE: Explore", kappa: 0.47, f1: 0.61, precision: 0.65, recall: 0.58 },
  ],
  macroF1: "0.76",
  showData: "Show the data: agreement and classifier scores for all 11 behaviors",
  insight:
    "The AI is most reliable on the behaviors educators need least help with, and weakest on empathy, where feedback matters most. Any experience built on it has to make that difference visible.",
};

export const trust = {
  title: "Designing for trust: when a *human* must step in",
  lead:
    "A model that says it's 75% sure should be right about 75% of the time. Ours was well calibrated: expected calibration error (ECE) 0.08 (target under 0.10) and Brier score 0.12 (target under 0.15). Because its confidence could be trusted, confidence could decide who reviews each judgment.",
  judgment: {
    title: "AI judgment",
    body: "Each output carries a label, a calibrated probability and a written rationale a reviewer can check.",
  },
  tiers: [
    { confidence: "High", action: "Accepted automatically, low-risk behaviors only" },
    { confidence: "Medium", action: "Flagged for a reviewer, with the AI's reasoning" },
    { confidence: "Low", action: "Sent to an expert for full human review" },
  ],
  tableCaption: "What happens at each AI confidence level",
  headers: ["AI confidence", "What happens"],
};

export const decision = {
  title: "The decision that *mattered*",
  original: {
    label: "The original plan",
    title: "Train on synthetic conversations",
    body: "Fast and cheap, but cleaner and more explicit than real visits. An AI trained on them would score real doctors against behavior that doesn't look like real practice.",
  },
  pushed: {
    label: "What I pushed for",
    title: "Anchor on real clinical encounters",
    body: "VHA 4C real visits as the anchor, with ACI-BENCH, OSCE and PriMock57 in support: about 985 conversations. A validity problem for the people being judged, not just a model problem.",
  },
};

export const governance = {
  title: "Governance and privacy, *built in* from the start",
  cards: [
    {
      title: "Formative only",
      body: "Feedback for development, never a score for advancement or certification. ACGME Milestones aren't designed for high-stakes use.",
    },
    {
      title: "Privacy first",
      body: "Names, dates, places and contact details are masked before any transcript enters the pipeline, to the i2b2/UTHealth 2014 standard.",
    },
    {
      title: "Honest reporting",
      body: "Results per behavior, never one accuracy number that hides where the AI fails.",
    },
  ],
};

export const limits = {
  title: "Limits, and the study I'd *run next*",
  lead:
    "This phase had no interface and no research with physicians receiving feedback. Validity work is also unfinished: no comparison yet against OSCE scores or a calibrated rating panel, and the gold set is small.",
  next:
    "The next study is the one that matters for the product: how do educators and physicians read and act on probability-based feedback?",
  study: {
    title: "Feedback concept study",
    status: "Planned, not yet run",
    rows: [
      { label: "Participants", value: "6–8 clinical educators and 6–8 residents" },
      {
        label: "Method",
        value: "Moderated concept tests of 3 feedback formats: score only; score plus quoted transcript moments; moments only, with no score",
      },
      {
        label: "Questions",
        value: "Which format do people trust, and why? Do they notice when the AI is wrong? What would they change in their next visit?",
      },
      { label: "Planted errors", value: "Two wrong labels per session, to see whether people catch them" },
      {
        label: "Success signal",
        value: "Participants catch most planted errors and name a specific change to their communication",
      },
    ],
  },
};

export const owned = {
  title: "What I *owned*",
  items: [
    "Dataset research: evaluating 4 transcript sources and making the case for real encounters",
    "The labeling scheme: a 9-family label structure mapped to ACGME competencies",
    "The AI labeling protocol: one behavior at a time, 8–10 hand-picked examples per behavior, and model choice (Qwen or Llama) per behavior",
    "Documenting the synthetic-to-real decision and its failure modes",
  ],
  lesson: {
    title: "What this taught me about researching AI",
    body:
      "Accuracy and usefulness are different questions. The AI's best scores were on the behaviors that matter least for coaching, and one aggregate number hid that. Researching an AI system means deciding what people need it to get right, measuring it there, and designing for the moments it will be wrong.",
  },
  skills: [
    "Human-AI agreement research",
    "Rubric and instrument design",
    "Human-in-the-loop design",
    "Responsible AI and privacy",
    "Working with ML teams",
  ],
};
