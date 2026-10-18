"use client";

import HandNote from "./doodles/HandNote";
import styles from "./OkrBoard.module.css";

type OkrInitiative = { title: string; text?: string; highlight?: boolean };

type OkrBoardProps = {
  objective: string;
  keyResults: string[];
  initiatives: OkrInitiative[];
  note: string;
};

const MATURITY_STAGES = [
  "1 Absent",
  "2 Limited",
  "3 Emergent",
  "4 Structured",
  "5 Integrated",
  "6 User-driven",
];

/** UX team OKRs, FY24 Q2, redrawn without names (§3.13). */
export default function OkrBoard({
  objective,
  keyResults,
  initiatives,
  note,
}: OkrBoardProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.objective}>
        <span className={styles.eyebrow}>Objective</span>
        <p className={styles.objectiveText}>{objective}</p>
      </div>
      <div className={styles.row}>
        <div className={styles.keyResults}>
          <span className={styles.eyebrow}>Key results</span>
          <ol className={styles.krList}>
            {keyResults.map((kr, i) => (
              <li key={kr} className={styles.kr}>
                <span className={styles.krNum}>{i + 1}</span>
                <span>{kr}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.initiatives}>
          <span className={styles.eyebrow}>Strategic initiatives</span>
          <div className={styles.iniGrid}>
            {initiatives.map((ini) => (
              <div
                key={ini.title}
                className={`${styles.ini}${ini.highlight ? ` ${styles.iniHot}` : ""}`}
              >
                <b>{ini.title}</b>
                {ini.text ? <span>{ini.text}</span> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.maturity}>
          <span className={styles.eyebrow}>Stages of UX maturity (NN/g)</span>
          <div className={styles.stages}>
            {MATURITY_STAGES.map((stage) => (
              <span key={stage} className={styles.stage}>
                {stage}
              </span>
            ))}
          </div>
        </div>
        <HandNote rotate={-1.5} className={styles.note}>
          {note}
        </HandNote>
      </div>
    </div>
  );
}
