/**
 * Essays published on Medium or LinkedIn.
 * Add a live post by appending one object. Leave the array empty until then.
 */
export type ArticleSource = "medium" | "linkedin";

export type Article = {
  title: string;
  source: ArticleSource;
  url: string;
  /** ISO date (YYYY-MM-DD). Omit when there is no date to show. */
  date?: string;
};

export const ARTICLES: Article[] = [];

export function articleSourceLabel(source: ArticleSource) {
  return source === "medium" ? "Medium" : "LinkedIn";
}
