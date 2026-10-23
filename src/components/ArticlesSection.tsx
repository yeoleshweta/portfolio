import {
  ARTICLES,
  articleSourceLabel,
  type Article,
} from "@/content/articles";
import styles from "./ArticlesSection.module.css";

function ArticleItem({ article }: { article: Article }) {
  const source = articleSourceLabel(article.source);
  return (
    <li className={styles.item}>
      <a
        className={styles.link}
        href={article.url}
        target="_blank"
        rel="noreferrer"
      >
        {article.title}
        <span className="sr-only"> ({source}, opens in a new tab)</span>
      </a>
      <p className={styles.meta}>
        <span>{source}</span>
        {article.date ? <time dateTime={article.date}>{article.date}</time> : null}
      </p>
    </li>
  );
}

export default function ArticlesSection() {
  return (
    <section
      id="articles"
      className={styles.section}
      aria-labelledby="articles-title"
    >
      <div className={styles.inner}>
        <p className={styles.eyebrow}>// medium, linkedin and substack</p>
        <h2 id="articles-title" className={styles.title}>
          Articles <span className={styles.titleAccent}>and essays.</span>
        </h2>
        <p className={styles.intro}>
          Essays I publish on Medium, LinkedIn and Substack. Each one here links to the
          original post.
        </p>
        {ARTICLES.length === 0 ? (
          <p className={styles.empty} role="status">
            No essays published yet. When a piece goes up on Medium,
            LinkedIn or Substack, it will be added here.
          </p>
        ) : (
          <ul className={styles.list}>
            {ARTICLES.map((article) => (
              <ArticleItem key={article.url} article={article} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
