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
  /** One or two sentences, outcome-led. */
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
  urbanfit: {
    title: "Urbanfit Studio: a Coach, a Dietitian and a Tracker in One Pocket",
    description:
      "One mobile app for iOS and Android that sets up a personal plan, tracks the day and connects members to paid experts, built from one shared design and audited against WCAG 2.2 AA across 75 screens.",
    category: "Design Systems",
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
    title: "Keeping the PM Persona Current",
    description:
      "Eight interviews with John Deere product managers led to a community forum and a monthly PM cohort. This Q3 2023 cycle is one instance of a standing quarterly practice that asks: what changed since last quarter?",
    category: "Qualitative Research",
    cover: "/assets/pm-persona-board.jpg",
  },
  "dorothy-perkins": {
    title: "Why Weren’t Students Saving?",
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
      "Deere Survey, built from the Fuel design system, let 250 internal product teams build their own surveys: about 30 minutes instead of about 3 days, as PMs reported.",
    category: "Design Systems",
    cover: "/work/fuel-survey/survey-prototype-poster.jpg",
  },
  gesturepro: {
    title: "GesturePro",
    description:
      "A camera-based sign-language prototype designed after reading what Deaf people have said about translation tools, so the signer stays in charge of every word that leaves the screen.",
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
  poshmera: {
    title: "Poshmera: a fashion app built for trust at checkout",
    description:
      "A women's fashion app designed from research to launch around the moments shoppers hesitate: size, delivery, price and payment. It reached 8,000 installs in its first month against a target of 5,000, as reported.",
    category: "Mixed Methods",
  },
  "stories-by-children": {
    title: "Stories by Children",
    description:
      "A reading platform for children and the parents who guide them. Task success rose from 50% to 85% across two Lean UX rounds of family testing.",
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
