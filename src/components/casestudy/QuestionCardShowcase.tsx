"use client";

/**
 * QuestionCardShowcase — a coded mock of the Deere Survey question card in its
 * seven answer types. Each step plays collapsed → expanded → answered in CSS;
 * reduced motion shows the answered state straight away.
 *
 * The mock is a picture, not a control: plain text and tables, with no fake
 * radios, switches, inputs or buttons. Stepping, autoplay and the notes come
 * from PhasedShowcase.
 */

import PhasedShowcase, { type ShowcasePhase } from "@/components/casestudy/PhasedShowcase";
import styles from "./QuestionCardShowcase.module.css";

export type QuestionPhase = ShowcasePhase & { question: string };

/** A placeholder that gives way to a sample answer once the card is "answered". */
function Answer({ placeholder, value }: { placeholder: string; value: string }) {
  return (
    <span className={styles.swap}>
      <span className={styles.swapOut} aria-hidden="true">{placeholder}</span>
      <span className={styles.swapIn}>{value}</span>
    </span>
  );
}

function Matrix({ cols, rows, pick }: { cols: string[]; rows: string[]; pick: [number, number] }) {
  return (
    <table className={styles.matrix}>
      <thead>
        <tr>
          <td />
          {cols.map((c) => <th key={c} scope="col">{c}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={row}>
            <th scope="row">{row}</th>
            {cols.map((col, ci) => {
              const picked = ri === pick[0] && ci === pick[1];
              return (
                <td key={col}>
                  <span className={`${styles.radio} ${picked ? styles.radioPicked : ""}`} aria-hidden="true" />
                  {picked ? <span className="sr-only">selected</span> : null}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function AnswerArea({ id }: { id: string }) {
  switch (id) {
    case "likert-freq":
      return <Matrix cols={["Daily", "Weekly", "Monthly", "Less often"]} rows={["Feature A", "Feature B"]} pick={[0, 1]} />;
    case "likert-sat":
      return (
        <Matrix
          cols={["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"]}
          rows={["Overall"]}
          pick={[0, 1]}
        />
      );
    case "loop":
      return <Matrix cols={["Poor", "Fair", "Good", "Excellent"]} rows={["Product A", "Product B", "Product C"]} pick={[0, 2]} />;
    case "dropdown":
      return (
        <dl className={styles.fields}>
          {[["Country", "United States"], ["Business unit", "Agriculture"]].map(([label, value]) => (
            <div key={label} className={styles.fieldRow}>
              <dt>{label}</dt>
              <dd className={styles.field}>
                <Answer placeholder="Select…" value={value} />
                <span className={styles.caret} aria-hidden="true">▾</span>
              </dd>
            </div>
          ))}
        </dl>
      );
    case "contact":
      return (
        <dl className={styles.contact}>
          {[["Name", "P3"], ["Phone", "+1 555 ···"], ["Email", "p3@example.com"]].map(([label, value]) => (
            <div key={label}>
              <dt>
                {label} <span className={styles.optional}>optional</span>
              </dt>
              <dd className={styles.field}>
                <Answer placeholder={`${label.toLowerCase()}…`} value={value} />
              </dd>
            </div>
          ))}
        </dl>
      );
    default: {
      const text = "Better mobile layout — I mostly use this on a tablet.";
      return (
        <div className={styles.textarea}>
          <Answer placeholder="Type your answer…" value={text} />
          <span className={styles.count}>{text.length} / 250</span>
        </div>
      );
    }
  }
}

function LockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true" fill="currentColor">
      <rect x="2" y="5" width="7" height="5" rx="1" />
      <path d="M3.5 5V3.5a2 2 0 0 1 4 0V5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true">
      <circle cx="5.5" cy="5.5" r="1.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M5.5 1v1M5.5 9v1M1 5.5h1M9 5.5h1M2.4 2.4l.7.7M7.9 7.9l.7.7M2.4 8.6l.7-.7M7.9 3.1l.7-.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Badge({ id }: { id: string }) {
  const standard = (
    <span className={`${styles.badge} ${styles.badgeStd}`}>
      <LockIcon /> Standard
    </span>
  );
  const custom = (
    <span className={`${styles.badge} ${styles.badgeCus}`}>
      <GearIcon /> Custom
    </span>
  );
  if (id === "text-improve") return custom;
  if (id !== "custom-badge") return standard;
  // Starts Standard, flips to Custom as the PM edits it.
  return (
    <span className={styles.swap}>
      <span className={styles.swapOut} aria-hidden="true">{standard}</span>
      <span className={styles.swapIn}>{custom}</span>
    </span>
  );
}

function QuestionCardMock({ phase }: { phase: QuestionPhase }) {
  return (
    <div className={styles.cardWrap} key={phase.id}>
      {phase.id === "loop" ? (
        <span className={styles.loopBadge} role="img" aria-label="Repeats for 3 products">3</span>
      ) : null}
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.drag} aria-hidden="true">⠿</span>
          <span className={styles.num}>1</span>
          <span className={styles.title}>{phase.question}</span>
          <Badge id={phase.id} />
          <span className={styles.chevron} aria-hidden="true">›</span>
        </div>
        <div className={styles.body}>
          <AnswerArea id={phase.id} />
          <div className={styles.footer}>
            <span className={styles.move}>Move to page ▾</span>
            <span className={styles.required}>
              <span className={styles.toggle} aria-hidden="true" />
              Required<span className="sr-only">: on</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuestionCardShowcase({ phases }: { phases: QuestionPhase[] }) {
  return (
    <PhasedShowcase phases={phases} label="Answer types">
      {(phase) => <QuestionCardMock phase={phase} />}
    </PhasedShowcase>
  );
}
