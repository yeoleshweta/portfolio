import type { Metadata } from "next";

/** The only category labels used on cards and case study pages. */
export const CATEGORIES = [
  "Qualitative Research",
  "Mixed Methods",
  "Quantitative / Experimentation",
  "AI / ML Research",
  "Design Systems",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type CaseStudyMeta = {
  /** Browser-tab title. The root template appends " · Shweta Sharma". */
  title: string;
  /** One sentence, outcome-led. */
  description: string;
  category: Category;
  /** Public path shown on the social image, when the study has a cover. */
  cover?: string;
};

export const CASE_STUDIES: Record<string, CaseStudyMeta> = {
  abim: {
    title: "From Frameworks to F1 Scores",
    description:
      "A rubric-grounded NLP pipeline that scores patient-centered communication in clinical transcripts, turning frameworks like Calgary-Cambridge into measurable constructs.",
    category: "AI / ML Research",
    cover: "/assets/abim-hero.png",
  },
  burton: {
    title: "Should the Homepage Check the Forecast?",
    description:
      "Weather and location personalization on Burton's homepage lifted conversion by 11.6% without adding sitewide clutter.",
    category: "Quantitative / Experimentation",
  },
  "crypto-secure": {
    title: "CryptoSecure",
    description:
      "An AI security tool that pairs static analysis with a language model so developers on the TON network can check smart contracts before they ship.",
    category: "AI / ML Research",
    cover: "/assets/crypto_secure_hero.png",
  },
  "pm-ux-study": {
    title: "No UX, No Problem?",
    description:
      "Eight interviews with John Deere product managers led to a community forum and a monthly PM cohort for teams working without dedicated UX support.",
    category: "Qualitative Research",
    cover: "/assets/mural-pm-interviews.jpg",
  },
  "dorothy-perkins": {
    title: "Why Were Students Not Saving?",
    description:
      "Segment-aware personalization made a student discount and regional ranking visible, covering about half of Dorothy Perkins' UK sales.",
    category: "Quantitative / Experimentation",
  },
  evans: {
    title: "Do Small Wins Compound?",
    description:
      "Six measured experiments at Evans each lifted revenue per visitor, from 2.5% to 8.43%, under one commercial metric.",
    category: "Quantitative / Experimentation",
  },
  "fuel-design-system": {
    title: "Fuel Design System",
    description:
      "A shared Fuel component system brought more than 100 John Deere screens onto one specification and cut time to spec by about 25%.",
    category: "Design Systems",
    cover: "/assets/fuel/hires-dashboard.jpg",
  },
  gesturepro: {
    title: "GesturePro",
    description:
      "A real-time sign-language translation prototype that runs on a camera, with no extra hardware.",
    category: "AI / ML Research",
    cover: "/assets/gesturepro-hero.png",
  },
  "healthcare-bias": {
    title: "Detecting Healthcare Bias",
    description:
      "An NLP model that flags biased language in clinical text using a four-label framework.",
    category: "AI / ML Research",
    cover: "/assets/healthcare-bias-hero.png",
  },
  "john-deere-sus": {
    title: "When Did Better Actually Mean Better?",
    description:
      "A two-wave usability study of ABTools raised SUS from 60 to 85.6 and put the remaining friction on the backlog.",
    category: "Mixed Methods",
    cover: "/assets/abtools_usability_study.jpg",
  },
  "miss-selfridge": {
    title: "Would They Have Bought Anyway?",
    description:
      "An incrementality test found that 47% of campaign-driven Miss Selfridge purchases came from customers new to the brand.",
    category: "Quantitative / Experimentation",
  },
  "my-ai-friends": {
    title: "myAIfriends",
    description:
      "A retrieval-augmented, multi-agent chat platform built for low-latency, context-aware conversations.",
    category: "AI / ML Research",
    cover: "/assets/myaifriends-hero.png",
  },
  personalization: {
    title: "What Analytics Couldn't Tell Us",
    description:
      "Pairing exit intercepts with behavioral data at Topshop produced a 5.8% conversion lift that analytics alone could not explain.",
    category: "Quantitative / Experimentation",
    cover: "/assets/personalization-hero.png",
  },
  "stories-by-children": {
    title: "Stories by Children",
    description:
      "A redesigned storytelling flow for families cut the share of visitors who never reached a story, after research showed 60% dropped off.",
    category: "Qualitative Research",
    cover: "/assets/StoriesByChildren.jpg",
  },
  "team-contract": {
    title: "Team Contract",
    description:
      "Research with nine participants turned John Deere's program-metrics tool from unused data entry into numbers managers could defend.",
    category: "Qualitative Research",
    cover: "/assets/team-contract/01-hero-team-contract-overview.png",
  },
};

export function caseStudyMetadata(slug: string): Metadata {
  const study = CASE_STUDIES[slug];
  if (!study) throw new Error(`Unknown case study slug: ${slug}`);
  return {
    title: study.title,
    description: study.description,
  };
}
