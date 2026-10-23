import { CASE_STUDIES } from "@/lib/caseStudyMeta";

/** Previous and next links on each case study follow this order. */
export const CASE_STUDY_ORDER = [
  "fuel-design-system",
  "john-deere-sus",
  "abim",
  "pm-ux-study",
  "healthcare-bias",
  "personalization",
  "gesturepro",
  "miss-selfridge",
  "dorothy-perkins",
  "evans",
  "burton",
  "team-contract",
  "crypto-secure",
  "my-ai-friends",
  "stories-by-children",
] as const;

export type CaseStudySlug = (typeof CASE_STUDY_ORDER)[number];

/**
 * Studies kept off the homepage cards and out of the previous/next links.
 * Their pages still load by URL; remove a slug here to show it again.
 */
export const HIDDEN_STUDIES: ReadonlySet<CaseStudySlug> = new Set([
  "healthcare-bias",
  "my-ai-friends",
]);

export type Tldr = {
  problem: string;
  role: string;
  team: string;
  timeline: string;
  methods: string;
  outcome: string;
  decision: string;
};

export type MicroBrief = {
  question: string;
  method: string;
  found: string;
  changed: string;
  visual?: { src: string; alt: string };
};

export type StudyBrief = {
  slug: CaseStudySlug;
  title: string;
  summary: string;
  kind: "featured" | "micro";
  tldr?: Tldr;
  micro?: MicroBrief;
};

const FEATURED = new Set<CaseStudySlug>([
  "abim",
  "pm-ux-study",
  "healthcare-bias",
  "personalization",
]);

function cover(slug: CaseStudySlug, alt: string): MicroBrief["visual"] {
  const src = CASE_STUDIES[slug]?.cover;
  return src ? { src, alt } : undefined;
}

const MICRO: Record<string, MicroBrief> = {
  "john-deere-sus": {
    question: "When did better actually mean better?",
    method:
      "Two-wave SUS and a six-dimension questionnaire with the same 4 power users, January to August 2021.",
    found: "SUS rose from 60 to 85.6, and all six measured dimensions improved.",
    changed: "The remaining friction was put on the backlog.",
    visual: cover(
      "john-deere-sus",
      "ABTools usability study, SUS moving from 60 to 85.6",
    ),
  },
  "miss-selfridge": {
    question: "Would they have bought anyway?",
    method: "Incrementality test with Qubit for Miss Selfridge.",
    found:
      "47% of campaign-driven purchases came from customers new to the brand.",
    changed:
      "The test separated new customers from people who would have bought anyway.",
  },
  "dorothy-perkins": {
    question: "Why were students not saving?",
    method: "Segment-aware personalization at Dorothy Perkins.",
    found:
      "A student discount and regional ranking were not visible to the people they were for.",
    changed:
      "Making them visible covered about half of Dorothy Perkins' UK sales.",
  },
  evans: {
    question: "Do small wins compound?",
    method: "Six measured experiments under one revenue-per-visitor metric.",
    found: "Each experiment lifted revenue per visitor, from 2.5% to 8.43%.",
    changed: "The team kept one commercial metric across the set of tests.",
  },
  burton: {
    question: "Should the homepage check the forecast?",
    method: "Weather and location personalization on Burton's homepage.",
    found: "Conversion lifted by 11.6%.",
    changed:
      "Weather and location personalization shipped without adding sitewide clutter.",
  },
  "fuel-design-system": {
    question: "Could PMs build their own surveys without a developer?",
    method: "Process research, then a survey builder made from the Fuel design system. Role: UX researcher and designer.",
    found:
      "Every survey needed a developer. Deere Survey, built from Fuel, let 250 internal product teams do it themselves.",
    changed: "A survey took about 30 minutes instead of about 3 days (reported by PMs and observed).",
    visual: cover("fuel-design-system", "Fuel design system dashboard"),
  },
  "team-contract": {
    question: "What would make program metrics worth using?",
    method: "Research with 9 participants and about 230 observations.",
    found:
      "John Deere's program-metrics tool was unused data entry.",
    changed: "It became numbers managers could defend.",
    visual: cover("team-contract", "Team Contract program metrics overview"),
  },
  "crypto-secure": {
    question: "Can a developer check a TON smart contract before it ships?",
    method:
      "Static analysis paired with a language model. Team of 4, about 3 months.",
    found:
      "An AI security tool that pairs static analysis with a language model so developers on the TON network can check smart contracts before they ship.",
    changed: "Developers can run that check before a contract ships.",
    visual: cover("crypto-secure", "CryptoSecure smart-contract security tool"),
  },
  "my-ai-friends": {
    question: "What does a low-latency, context-aware chat need?",
    method:
      "Retrieval-augmented, multi-agent platform. Team of 3, about 2 months.",
    found:
      "A retrieval-augmented, multi-agent chat platform built for low-latency, context-aware conversations.",
    changed: "The platform is built around those conversations.",
    visual: cover("my-ai-friends", "myAIfriends conversational platform"),
  },
  "stories-by-children": {
    question: "Why were families not reaching a story?",
    method:
      "Qualitative research and an information-architecture redesign over 6 weeks.",
    found: "Research showed 60% of visitors never reached a story.",
    changed: "A redesigned storytelling flow cut that drop-off.",
    visual: cover("stories-by-children", "Stories by Children storytelling platform"),
  },
};

const TLDR: Record<string, Tldr> = {
  abim: {
    problem:
      "Physicians are tested on medical knowledge, but the communication skills that shape patient outcomes are almost never measured at scale.",
    role: "Innovation Analyst (Data & Research Focused)",
    team: "I/O Psychologists, Data Scientist, AI/ML Engineer",
    timeline: "Co-op, 6 months",
    methods:
      "Rubric design from Calgary-Cambridge and NURSE, mixed methods, NLP labeling, inter-rater reliability, and classifier evaluation.",
    outcome:
      "11 operationalized rubrics and an NLP pipeline applied across 985 physician conversations. Macro-F1 was 0.76.",
    decision:
      "Pivot the primary corpus from synthetic transcripts to real clinical encounters (VHA 4C), so scores would generalize to actual visits.",
  },
  "pm-ux-study": {
    problem:
      "PM personas drifted from reality between annual refreshes, reducing their usefulness for roadmap planning",
    role: "UX Coach and Researcher",
    team: "Product and Customer (P&C), Foundry, John Deere",
    timeline: "12 weeks, Q3 2023",
    methods: "Usage log analysis, 8 structured interviews, community forum scan",
    outcome: "Updated persona deck, interview synthesis, Q4 input brief",
    decision: "Quarterly persona refresh formalised as a standing team practice",
  },
  "healthcare-bias": {
    problem:
      "Bias in clinical communication is nearly invisible one record at a time, and manual review is subjective, slow, and inconsistent.",
    role: "Data Scientist Co-op",
    team: "1 Data Scientist Co-op, 1 Advisor",
    timeline: "Sept 2025 – Present",
    methods:
      "A 4-label bias framework, ClinicalBERT and RoBERTa fine-tuning, and gold-standard annotation.",
    outcome:
      "A pipeline that flags biased language in clinical text and can process thousands of records instead of about 50 by hand.",
    decision:
      "Use the system to surface patterns for human review, not as a black-box decision maker.",
  },
  personalization: {
    problem:
      "Analytics showed a conversion gap in Topshop search, but could not explain why people were not using it.",
    role: "Analyst / Optimization Specialist",
    team: "Qubit · Topshop",
    timeline: "A/B/n testing cycle",
    methods: "Exit intercepts, funnel analysis, and A/B/n testing.",
    outcome:
      "+5.8% conversion from the winning search design. Search users converted about 10 times higher, which prioritized the work.",
    decision:
      "Test visibility and affordance copy in four variants against the existing design, then ship the winner with a quantified case.",
  },
};

export const STUDY_BRIEFS: StudyBrief[] = CASE_STUDY_ORDER.map((slug) => {
  const study = CASE_STUDIES[slug];
  const kind = FEATURED.has(slug) ? "featured" : "micro";
  return {
    slug,
    title: study.title,
    summary: study.description,
    kind,
    tldr: kind === "featured" ? TLDR[slug] : undefined,
    micro: kind === "micro" ? MICRO[slug] : undefined,
  };
});

export function studyFromPath(pathname: string) {
  const slug = pathname.split("/").filter(Boolean).pop();
  return STUDY_BRIEFS.find((study) => study.slug === slug);
}

export function studyNeighbors(slug: string) {
  const index = CASE_STUDY_ORDER.indexOf(slug as CaseStudySlug);
  if (index === -1) return { previous: undefined, next: undefined };
  const shown = (study: StudyBrief) => !HIDDEN_STUDIES.has(study.slug);
  const previous = STUDY_BRIEFS.slice(0, index).reverse().find(shown);
  const next = STUDY_BRIEFS.slice(index + 1).find(shown);
  return { previous, next };
}
