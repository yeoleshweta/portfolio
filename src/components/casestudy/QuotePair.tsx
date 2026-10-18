"use client";

import styles from "./QuotePair.module.css";

type QuotePairProps = {
  dimension: string;
  before: string;
  after: string;
};

/** Before/after verbatim pair, one per dimension (§3.9). */
export default function QuotePair({ dimension, before, after }: QuotePairProps) {
  return (
    <div className={styles.wrap}>
      <p className={styles.dimension}>{dimension}</p>
      <div className={styles.grid}>
        <blockquote className={`${styles.quote} ${styles.before}`}>
          <p className={styles.eyebrow}>Before</p>
          <p className={styles.text}>&ldquo;{before}&rdquo;</p>
        </blockquote>
        <blockquote className={`${styles.quote} ${styles.after}`}>
          <p className={styles.eyebrow}>After</p>
          <p className={styles.text}>&ldquo;{after}&rdquo;</p>
        </blockquote>
      </div>
    </div>
  );
}
