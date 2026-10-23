/**
 * Essays published on Medium, LinkedIn or Substack, newest first.
 * Add a live post by adding one object at the top. Leave the array empty until then.
 */
export type ArticleSource = "medium" | "linkedin" | "substack";

export type Article = {
  title: string;
  source: ArticleSource;
  url: string;
  /** ISO date (YYYY-MM-DD). Omit when there is no date to show. */
  date?: string;
};

export const ARTICLES: Article[] = [
  {
    title: "From Calculators to Collaborators: How AI-First Products Are Rewiring UX",
    source: "substack",
    url: "https://shweta969612.substack.com/p/from-calculators-to-collaborators",
    date: "2026-10-23",
  },
  {
    title: "Should AI be Used for Job Recruitment?",
    source: "linkedin",
    url: "https://www.linkedin.com/pulse/should-ai-used-job-recruitment-shweta-sharma-osdrf/",
    date: "2024-10-30",
  },
];

const SOURCE_LABELS: Record<ArticleSource, string> = {
  medium: "Medium",
  linkedin: "LinkedIn",
  substack: "Substack",
};

export function articleSourceLabel(source: ArticleSource) {
  return SOURCE_LABELS[source];
}
