/**
 * GesturePro: "Designing an AI that knows what it doesn't know".
 * Source: GesturePro — UX for AI Case Study.pdf — do not reword.
 */

import type { Rich } from "@/components/casestudy/RichText";

/** A bold lead-in followed by plain text. */
export type LeadIn = { lead: string; text: string };

export const hero = {
  category: "Capstone · UX for AI · Human-centred AI",
  title: "Designing an AI that knows what it doesn't know",
  subtitle:
    "GesturePro reads sign language through a laptop camera and turns it into text. This case study is about the harder half of the work: deciding how a signer and an imperfect model should share control of their words.",
  role: "UX lead and ML engineer",
  team: "4 people, capstone",
  method: "Desk research, prototype usability tests",
  stack: "MediaPipe, TensorFlow, Next.js, FastAPI",
};

export const tldr = {
  summary: [
    "We set out to build a sign-language translator that needs nothing but a webcam. Desk research changed the question. Deaf people have watched hearing teams build “translators” for years, and their main worries are accuracy, being spoken for, and tools that let hearing people skip learning sign. So the design goal moved from ",
    { strong: "translate automatically" },
    " to ",
    {
      strong:
        "help a signer be understood, with the signer in charge of every word that leaves the screen",
    },
    ".",
  ] satisfies Rich,
  fields: [
    {
      label: "Question",
      value:
        "How might a camera-based model help a Deaf signer communicate a short message to a hearing person, without speaking for them?",
    },
    {
      label: "My role",
      value:
        "Led research and interaction design; built the landmark pipeline and the classifier",
    },
    {
      label: "What shipped",
      value:
        "A browser prototype: webcam in, 21 hand landmarks per frame, sign classified to on-screen text, with sign-in and history",
    },
    {
      label: "Design stance",
      value:
        "A communication aid for short, low-stakes moments. Never a replacement for an interpreter.",
    },
  ],
};

export const overview = {
  label: "Overview",
  heading: "An AI product where being wrong has a cost to someone's voice",
  paragraphs: [
    "Most AI features fail quietly: a bad recommendation is ignored. A sign-recognition model fails out loud. If it outputs the wrong word, a hearing person reads words the signer never said. That makes GesturePro a useful study in UX for AI: the model is the easy part to demo and the hard part to trust.",
    "This page walks through the project in design-thinking stages. Each stage ends with the human-AI interaction decision it led to. Where the evidence is thin, it says so.",
  ],
  stats: [
    { value: "21", label: "hand landmarks read per frame" },
    { value: "0", label: "extra hardware: a standard webcam" },
    { value: "3", label: "independently deployed services" },
    { value: "6", label: "usability-test participants" },
  ],
};

export const reframe = {
  label: "Starting point",
  heading: "The brief arrived as a solution",
  body: "The capstone brief was “a real-time sign-language translator with no extra hardware.” That is a solution. It assumes three things nobody had checked: that Deaf people want a translator, that translation is the right job, and that a hand-only model can carry a language that also lives in the face and body.",
  before: {
    label: "Before",
    question: "Can sign language be translated in real time without extra hardware?",
    note: "A feasibility question. It measures the model and says nothing about the person signing.",
  },
  after: {
    label: "After",
    question:
      "How might a signer use a camera model to be understood in short exchanges, while staying the author of every word?",
    note: "A desirability question. It puts the signer's control at the centre and limits the scope to moments where an interpreter isn't there.",
  },
};

export const empathize = {
  label: "01 · Empathize",
  heading: "What the Deaf community has already said about sign-language tech",
  intro:
    "Before building screens, I read what Deaf people and their organisations have published about tools like this one. Three sources shaped the project most.",
  sources: [
    {
      kicker: "Global survey · 2025",
      title: "“Nothing about us without us”",
      body: "42 respondents across five continents: 21 Deaf, 12 hard of hearing, 9 hearing. Most supported the tech, but Deaf respondents often gave conditional answers, and Deaf-led development was a repeated condition.",
      cite: "Atwell, Imai, Bragg, Alikhani, arXiv 2025",
    },
    {
      kicker: "Press critique · 2016",
      title: "The sign-language gloves",
      body: "A student glove that turned signs into speech drew pushback. Critics said the “bridge” ran one way, toward hearing people, and that it missed grammar carried by the face and body. A head shake can negate a sign.",
      cite: "KQED, May 2016",
    },
    {
      kicker: "WFD and WASLI · 2018",
      title: "Statement on signing avatars",
      body: "Sign languages are full languages, so word-for-word conversion doesn't work. Machine translation can't yet match a qualified interpreter, live or culturally.",
      cite: "World Federation of the Deaf, World Association of Sign Language Interpreters",
    },
  ],
  survey: {
    title: "What the survey numbers say",
    intro: "The survey is small, so these are counts, not population rates.",
    caption: "Survey counts by respondent group",
    heads: ["Finding", "Deaf (21)", "Hard of hearing (12)", "Hearing (9)"],
    rows: [
      ["Values translation as a use", "about 12 of 21", "6 of 12", "6 of 9"],
      ["Names system accuracy as a concern", "about 11 of 21", "3 of 12", "not reported"],
    ],
    note: "Counts derived from the paper's reported percentages and group sizes. The two most-named concerns overall, each chosen by 28 of 42, were hearing people profiting from the tech and few Deaf people leading it.",
  },
  changed: {
    label: "What this changed",
    title: "The people this tool is “for” value translation less than the people building it.",
    body: "Translation was valued by fewer Deaf and hard-of-hearing respondents than hearing ones. That meant we couldn't assume demand. We had to design for a narrow job, be honest about limits, and keep the signer in control.",
  },
};

export const define = {
  label: "02 · Define",
  heading: "Three ways to frame the problem",
  intro:
    "I wrote three point-of-view statements and tagged each as a symptom or a root cause. The third became the frame for design.",
  statements: [
    {
      tag: "Symptom",
      chosen: false,
      statement:
        "Hearing people need to understand sign language because they can't follow a signer.",
      note: "This is the framing the gloves used. It centres the hearing person and treats the signer as the problem. Leaves out: the Deaf person's agency entirely.",
    },
    {
      tag: "Symptom",
      chosen: false,
      statement:
        "A Deaf signer needs a cheaper translator because interpreters and special hardware cost too much.",
      note: "Cost is real, but this framing quietly positions an AI as a cheaper interpreter, which the WFD statement warns against. Leaves out: contexts where an interpreter is the right answer.",
    },
    {
      tag: "Root cause · chosen",
      chosen: true,
      statement:
        "A Deaf signer in a short, unplanned exchange (a counter, a front desk, a classroom aside) needs a quick way to be understood without handing over their voice, because no interpreter is there and writing back and forth is slow.",
      note: "Scopes the tool to low-stakes moments, keeps the signer as author, and makes accuracy a shared problem rather than a hidden one. Leaves out: people who sign mainly with facial grammar the model can't read, and long conversations.",
    },
  ],
  hmw: {
    title: "How might we",
    items: [
      "HMW let a signer see what the model saw before anyone else reads it?",
      "HMW make fixing a wrong guess faster than signing it again?",
      "HMW be clear up front about what the model can't read, like facial grammar?",
    ],
  },
};

export const principles = {
  label: "03 · Ideate",
  heading: "Four human-AI interaction principles we designed against",
  intro:
    "Rather than invent rules, I mapped ideas to published human-AI interaction guidance. Every design decision on this page traces back to one of these.",
  items: [
    {
      id: "P1",
      source: "Shneiderman, HCAI",
      title: "High automation and high human control",
      body: "Automation and control aren't a trade-off on one dial. The model can do the heavy lifting while the person keeps the final say.",
    },
    {
      id: "P2",
      source: "Microsoft HAX, G1 and G2",
      title: "Make clear what the system can do, and how well",
      body: "Set expectations before first use, not after the first failure.",
    },
    {
      id: "P3",
      source: "Microsoft HAX, G9 and G10",
      title: "Support efficient correction; scope when in doubt",
      body: "When confidence is low, offer options instead of committing to one answer.",
    },
    {
      id: "P4",
      source: "Google PAIR",
      title: "Errors and graceful failure; explainability and trust",
      body: "Show enough of the model's reasoning for people to calibrate trust, and give every error a way forward.",
    },
  ],
};

export const decisions = {
  label: "Design decisions",
  heading: "Eight decisions, and what each one costs",
  caption: "Design decisions with their rationale, principle, trade-off and build status",
  heads: ["Decision", "Why", "Principle", "Trade-off", "Status"],
  rows: [
    {
      decision: "1. Camera only, in the browser",
      why: "Removes cost and install barriers. Avoids wearables, which drew the strongest community pushback.",
      principle: "Access",
      tradeoff: "Webcam quality and lighting limit accuracy",
      status: "In prototype",
      built: true,
    },
    {
      decision: "2. Show the hand skeleton live",
      why: "The 21-landmark overlay tells the signer what the model actually sees, so they can fix framing before blaming themselves.",
      principle: "P4",
      tradeoff: "Visual noise over the video",
      status: "In prototype",
      built: true,
    },
    {
      decision: "3. Show top 3 guesses with confidence, not one answer",
      why: "A single answer hides uncertainty. Options let the signer pick, and teach them when the model is unsure.",
      principle: "P2, P3",
      tradeoff: "One extra glance per sign",
      status: "Designed",
      built: false,
    },
    {
      decision: "4. Signer confirms before text is shown to the other person",
      why: "Nothing leaves the signer's side unapproved. This is the core control decision.",
      principle: "P1",
      tradeoff: "Slower than fully automatic output",
      status: "Designed",
      built: false,
    },
    {
      decision: "5. Scope statement before first use",
      why: "Says plainly: fingerspelling and isolated signs only; no facial grammar; not for medical, legal or emergency use.",
      principle: "P2",
      tradeoff: "Less impressive first impression",
      status: "Designed",
      built: false,
    },
    {
      decision: "6. Fix by tap, re-sign or type",
      why: "Three ways out of every error. Typing is always available, so the model is never a dead end.",
      principle: "P3, P4",
      tradeoff: "More controls on a small screen",
      status: "Designed",
      built: false,
    },
    {
      decision: "7. History the user owns",
      why: "Sign-in enables history; it should be private by default and deletable by the user.",
      principle: "Trust",
      tradeoff: "Account step before use",
      status: "History in prototype",
      built: true,
    },
    {
      decision: "8. Two-way by default: reply as text",
      why: "Answers the “one-way bridge” critique: the hearing person types back, so both sides do work.",
      principle: "Equity",
      tradeoff: "Needs a shared screen or second device",
      status: "Designed",
      built: false,
    },
  ],
  /* The source note said "Designed" decisions were implemented and "Proposed" ones
     scoped out, which contradicts the intro above the table and the Evidence section.
     This follows the intro: "Designed" means specified but not built. */
  note: "Status tags reflect the state of the prototype at time of submission. Decisions marked “Designed” were specified but scoped out of the build due to time constraints.",
};

export const loop = {
  label: "Human-AI interaction",
  heading: "Who decides at each step",
  intro:
    "The interaction loop separates what the model does from what the signer decides. Purple steps are the model. Dark steps are the person.",
  steps: [
    { actor: "Person", title: "1. Sign", text: "In view of the camera" },
    { actor: "Model", title: "2. See", text: "21 landmarks drawn live" },
    { actor: "Model", title: "3. Guess", text: "Top 3 with confidence" },
    { actor: "Person", title: "4. Confirm or fix", text: "Tap, re-sign, or type" },
    { actor: "Person", title: "5. Share", text: "Hearing partner reads, replies in text" },
  ],
  note: "The model never writes directly to the other person. Step 4 is the gate.",
  hypothesis: {
    title: "Hypothesis behind the gate",
    believe:
      "We believe signers will trust the output enough to use it in a real exchange if they confirm each word before it is shown, even though it is slower.",
    know: {
      label: "We'll know when",
      text: "signers in testing choose to keep confirmation on when offered an automatic mode, and rate their confidence that the shown text matches what they signed higher than without it.",
    },
    wrong: {
      label: "We're wrong if",
      text: "most signers switch confirmation off, or the extra step makes them abandon the message for typing.",
    },
  },
};

export const test = {
  label: "04 · Prototype and 05 · Test",
  heading: "What usability testing showed",
  intro:
    "We ran moderated usability tests on the working prototype. Participants signed a set of short messages while thinking aloud, then we asked how much they trusted the text on screen.",
  setup: [
    {
      label: "Participants",
      text: "6 people: hearing ASL learners and team members familiar with the vocabulary set. Labelled P1 to P6.",
    },
    {
      label: "Tasks",
      text: "Sign each of the 28 trained words; attempt a short sequence; recover if the model returned a wrong guess.",
    },
    {
      label: "Measures",
      text: "Task success, errors noticed vs missed, time to recover, self-rated trust via free observation and think-aloud.",
    },
  ],
  caption: "Usability findings with how many of the 6 participants showed each and the decision it led to",
  heads: ["Finding", "Count", "Led to"],
  rows: [
    {
      finding:
        "ASL grammar differed from what the model expected; sentence formation was hard to match to the trained vocabulary",
      count: "All 6 of 6",
      ledTo: "Decision 3, 4",
    },
    {
      finding:
        "Real-time server response had noticeable delay; participants paused mid-sign waiting for confirmation",
      count: "5 of 6",
      ledTo: "Decision 2",
    },
    {
      finding:
        "Vocabulary felt too narrow; participants wanted to sign words not in the 28-word set and had no recovery path",
      count: "4 of 6",
      ledTo: "Decision 6",
    },
  ],
  note: "Small sample: counts only, no percentages, no claims beyond the 6 people we tested with. Model: YOLOv8n trained for 50 epochs on a custom 28-class ASL dataset (img_size 640). Training outputs were not saved to the repo; evaluation metrics were not recovered. YOLOv8n on datasets of this scale typically reaches mAP50 in the 0.70–0.85 range — treat that as a rough benchmark, not a measured result from this training run.",
};

export const community = {
  label: "Community",
  heading: "Who benefits, and who could be harmed",
  intro:
    "A human-centred AI project has to account for both. These are potential benefits, not measured outcomes.",
  help: {
    title: "Could help",
    items: [
      {
        lead: "Short, unplanned exchanges.",
        text: "Moments where booking an interpreter isn't possible.",
      },
      { lead: "No cost, no gear.", text: "A webcam and a browser, nothing to buy." },
      {
        lead: "Open source.",
        text: "Deaf developers and researchers can inspect, fork and lead it.",
      },
    ] satisfies LeadIn[],
  },
  harm: {
    title: "Could harm",
    items: [
      {
        lead: "Replacing interpreters.",
        text: "An organisation might point to the tool instead of booking one. The scope statement and copy argue against this.",
      },
      {
        lead: "Misquoting the signer.",
        text: "Wrong output read as their words. The confirmation gate is the guard.",
      },
      {
        lead: "Hearing-led design.",
        text: "Our team was not Deaf-led. That is the biggest gap in this project.",
      },
    ] satisfies LeadIn[],
  },
};

export const accessibility = {
  label: "Accessibility",
  heading: "An accessibility tool has to be accessible itself",
  intro: "WCAG 2.2 AA requirements we set for the interface around the camera.",
  caption: "Accessibility requirements and why each matters for this tool",
  heads: ["Requirement", "Why it matters here"],
  rows: [
    {
      requirement: "Text output at 4.5:1 contrast, resizable to 200%",
      why: "Output is read at a glance across a counter, often by someone older.",
    },
    {
      requirement: "Full keyboard path for confirm, fix and type",
      why: "Not every user can tap precisely while signing.",
    },
    {
      requirement: "No sound-only signals",
      why: "Every status (hand lost, low confidence) is visual and in text.",
    },
    {
      requirement: "Plain-language camera permission",
      why: "Says what is captured: MediaPipe extracts landmarks locally and draws the skeleton overlay in-browser; only a cropped image frame goes to the server — raw video never leaves the device. Permission copy explains this and links to revoke.",
    },
    {
      requirement: "Reduced motion respected",
      why: "The skeleton overlay can be switched to a static outline.",
    },
  ],
};

export const evidence = {
  label: "Evidence",
  heading: "What we can claim, and what we can't",
  supported: {
    title: "Supported",
    items: [
      "The prototype classifies signs from a standard webcam in real time, with no extra hardware.",
      "It runs as three containerised services with sign-in and history.",
      "Usability findings for the 6 people we tested with.",
    ],
  },
  unsupported: {
    title: "Not yet supported",
    items: [
      "That it helps in real conversations. We tested set tasks, not live exchanges.",
      "That Deaf signers broadly want it. Our sample can't show that.",
      "Accuracy across signers, skin tones, lighting and signing styles. Not measured.",
    ],
  },
};

export const next = {
  label: "Next steps and lessons",
  heading: "What I would do with another semester",
  steps: [
    {
      title: "Deaf co-design partners, paid",
      text: "Move from testing on Deaf people to designing with them, starting with the scope statement.",
    },
    {
      title: "Test the confirmation gate",
      text: "A/B the gate against automatic output in live, low-stakes exchanges. Only a controlled test can show it causes higher trust.",
    },
    {
      title: "Measure fairness of accuracy",
      text: "Report accuracy per sign and per signer group, with the denominator, before adding vocabulary.",
    },
  ],
  lessons: {
    title: "What the project taught me",
    items: [
      {
        lead: "The model is not the product.",
        text: "The product is the moment when a person decides whether to trust what the model said. Designing that moment took more thought than training the classifier.",
      },
      {
        lead: "Read the community before writing the brief.",
        text: "Ten years of public Deaf critique would have saved our first framing.",
      },
    ] satisfies LeadIn[],
  },
};

export const sources = {
  title: "Sources",
  items: [
    {
      text: "Atwell, Imai, Bragg and Alikhani, “Nothing about us without us,” arXiv, 2025",
      href: "https://arxiv.org/abs/2512.08839v1",
    },
    {
      text: "KQED, “Invention translates sign language into speech; some in Deaf community unimpressed,” 2016",
      href: "https://www.kqed.org/futureofyou/165394/invention-translates-sign-language-into-speech-some-in-deaf-community-unimpressed",
    },
    {
      text: "WFD and WASLI, statement on signing avatars, 2018",
      href: "https://wfdeaf.org/?p=7496",
    },
    {
      text: "Amershi et al., Guidelines for Human-AI Interaction, Microsoft Research",
      href: "https://www.microsoft.com/en-us/research/publication/guidelines-for-human-ai-interaction/",
    },
    {
      text: "Google PAIR, People + AI Guidebook: Errors and Graceful Failure",
      href: "https://pair.withgoogle.com/chapter/People%20+%20AI%20Guidebook%20-%20Errors%20+%20Graceful%20Failure.pdf",
    },
    {
      text: "Google PAIR, People + AI Guidebook: Explainability and Trust",
      href: "https://pair.withgoogle.com/chapter/People%20+%20AI%20Guidebook%20-%20Explainability%20+%20Trust.pdf",
    },
    {
      text: "Shneiderman, Human-Centered Artificial Intelligence: Reliable, Safe and Trustworthy, 2020",
      href: "https://arxiv.org/pdf/2002.04087",
    },
  ],
};
