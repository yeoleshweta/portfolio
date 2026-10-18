"use client";

import SketchArrow from "./doodles/SketchArrow";
import SketchUnderline from "./doodles/SketchUnderline";
import HandNote from "./doodles/HandNote";
import styles from "./SusScoreCard.module.css";

type SusScoreCardProps = {
  eyebrow: string;
  before: { label: string; value: string };
  after: { label: string; value: string };
  body: string;
  note: string;
  srLabel: string;
};

/** Hero aside (§3.0): the SUS 60 → 85.6 headline, as a tilted white card. */
export default function SusScoreCard({
  eyebrow,
  before,
  after,
  body,
  note,
  srLabel,
}: SusScoreCardProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <div className={styles.row} role="img" aria-label={srLabel}>
          <div aria-hidden="true">
            <p className={styles.label}>{before.label}</p>
            <p className={styles.before}>{before.value}</p>
          </div>
          <SketchArrow tone="accent" className={styles.arrow} />
          <div aria-hidden="true">
            <p className={styles.label}>{after.label}</p>
            <p className={styles.after}>{after.value}</p>
            <SketchUnderline className={styles.underline} />
          </div>
        </div>
        <p className={styles.body}>{body}</p>
      </div>
      <HandNote rotate={-2} className={styles.note}>
        {note}
      </HandNote>
    </div>
  );
}
