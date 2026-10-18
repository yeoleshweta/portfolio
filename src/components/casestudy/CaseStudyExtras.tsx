import type { ReactNode } from "react";
import Link from "next/link";
import type { MicroBrief, StudyBrief, Tldr } from "@/content/caseStudyBriefs";
import styles from "./CaseStudyExtras.module.css";

const TLDR_FIELDS: { key: keyof Tldr; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "role", label: "My role" },
  { key: "team", label: "Team" },
  { key: "timeline", label: "Timeline" },
  { key: "methods", label: "Methods" },
  { key: "outcome", label: "Outcome" },
  { key: "decision", label: "Decision it informed" },
];

export function TldrCard({
  summary,
  tldr,
  title = "TL;DR",
  children,
}: {
  summary: string;
  tldr: Tldr;
  /** Card heading; defaults to "TL;DR". */
  title?: string;
  /** Optional block (e.g. a stats row) rendered between summary and fields. */
  children?: ReactNode;
}) {
  return (
    <section className={styles.tldr} aria-labelledby="tldr-title">
      <h2 id="tldr-title" className={styles.tldrTitle}>
        {title}
      </h2>
      <p className={styles.tldrSummary}>{summary}</p>
      {children}
      <dl className={styles.tldrList}>
        {TLDR_FIELDS.map((field) => (
          <div key={field.key}>
            <dt>{field.label}</dt>
            <dd>{tldr[field.key]}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const MICRO_FIELDS: { key: keyof MicroBrief; label: string }[] = [
  { key: "question", label: "Question" },
  { key: "method", label: "Method" },
  { key: "found", label: "What we found" },
  { key: "changed", label: "What changed" },
];

export function MicroTemplate({ micro }: { micro: MicroBrief }) {
  return (
    <section className={styles.micro} aria-label="Micro case study">
      <dl className={styles.microList}>
        {MICRO_FIELDS.map((field) => (
          <div key={field.key}>
            <dt>{field.label}</dt>
            <dd>{micro[field.key] as string}</dd>
          </div>
        ))}
      </dl>
      {micro.visual ? (
        <figure className={styles.microVisual}>
          <img src={micro.visual.src} alt={micro.visual.alt} />
        </figure>
      ) : null}
    </section>
  );
}

export function ShowDetails({
  summary,
  children,
}: {
  summary: string;
  children: ReactNode;
}) {
  return (
    <details className={styles.details}>
      <summary>{summary}</summary>
      <div className={styles.detailsBody}>{children}</div>
    </details>
  );
}

function DataTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: string[][];
}) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column} scope="col">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ChartFigure({
  summary,
  columns,
  rows,
  children,
}: {
  summary: string;
  columns: string[];
  rows: string[][];
  children: ReactNode;
}) {
  return (
    <figure className={styles.chart}>
      <div aria-hidden="true">{children}</div>
      <figcaption className={styles.chartSummary}>{summary}</figcaption>
      <div className="sr-only">
        <DataTable columns={columns} rows={rows} />
      </div>
      <ShowDetails summary="Show the data">
        <DataTable columns={columns} rows={rows} />
      </ShowDetails>
    </figure>
  );
}

/** Summary plus a data table, without hiding the visible chart text. */
export function ChartData({
  summary,
  columns,
  rows,
}: {
  summary: string;
  columns: string[];
  rows: string[][];
}) {
  return (
    <div className={styles.chart}>
      <p className={styles.chartSummary}>{summary}</p>
      <div className="sr-only">
        <DataTable columns={columns} rows={rows} />
      </div>
      <ShowDetails summary="Show the data">
        <DataTable columns={columns} rows={rows} />
      </ShowDetails>
    </div>
  );
}

export function CaseStudyPager({
  previous,
  next,
}: {
  previous?: StudyBrief;
  next?: StudyBrief;
}) {
  if (!previous && !next) return null;

  return (
    <nav className={styles.pager} aria-label="Previous and next case study">
      {previous ? (
        <Link className={styles.pagerLink} href={`/work/${previous.slug}`}>
          <span className={styles.pagerLabel}>Previous</span>
          <span className={styles.pagerTitle}>{previous.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          className={`${styles.pagerLink} ${styles.pagerNext}`}
          href={`/work/${next.slug}`}
        >
          <span className={styles.pagerLabel}>Next</span>
          <span className={styles.pagerTitle}>{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
