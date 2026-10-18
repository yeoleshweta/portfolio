"use client";

import SketchCircle from "./doodles/SketchCircle";
import styles from "./SurveyBars.module.css";

type SurveyBar = { label: string; count: number; highlight?: boolean };

type SurveyBarsProps = {
  title: string;
  total: number;
  rows: SurveyBar[];
  circleHighlight?: boolean;
};

/** Horizontal bar rows for the Prologue survey chart (§3.3). */
export default function SurveyBars({
  title,
  total,
  rows,
  circleHighlight,
}: SurveyBarsProps) {
  const highlightIndex = rows.findIndex((r) => r.highlight);

  return (
    <div className={styles.wrap}>
      <p className={styles.title}>{title}</p>
      <div className={styles.rows}>
        {rows.map((row, i) => (
          <div key={row.label} className={styles.row}>
            <div className={styles.labelRow}>
              <span
                className={row.highlight ? styles.labelHighlight : styles.label}
              >
                {row.label}
              </span>
              <span className={styles.count}>{row.count}</span>
            </div>
            <div className={styles.track}>
              <div
                className={row.highlight ? styles.fillHighlight : styles.fill}
                style={{ width: `${(row.count / total) * 100}%` }}
              />
            </div>
            {circleHighlight && i === highlightIndex ? (
              <SketchCircle
                width={330}
                height={110}
                className={styles.circle}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
