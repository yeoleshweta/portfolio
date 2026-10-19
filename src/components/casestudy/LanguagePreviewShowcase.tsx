"use client";

/**
 * LanguagePreviewShowcase — a coded mock of the Deere Survey language flow:
 * pick languages → preview in English → open the language menu → Spanish.
 *
 * The mock is a picture, not a control: plain text, a real table for the
 * answer scale, and lang attributes on translated copy. Stepping, autoplay and
 * the notes come from PhasedShowcase.
 */

import PhasedShowcase, { type ShowcasePhase } from "@/components/casestudy/PhasedShowcase";
import styles from "./LanguagePreviewShowcase.module.css";

type Copy = {
  lang: string;
  title: string;
  question: string;
  scale: string[];
  close: string;
  next: string;
};

export type LanguagePreviewData = {
  languages: { code: string; name: string }[];
  picked: string[];
  rows: string[];
  copy: { EN: Copy; ES: Copy };
};

function Picker({ data }: { data: LanguagePreviewData }) {
  const picked = data.languages.filter((l) => data.picked.includes(l.code));
  return (
    <div className={styles.picker}>
      <span className={styles.label}>Survey languages</span>
      <span className={styles.search} aria-hidden="true">Search language</span>
      <ul className={styles.checklist}>
        {data.languages.map((l, i) => {
          const on = data.picked.includes(l.code);
          return (
            <li key={l.code} className={on ? styles.checked : undefined} style={{ animationDelay: `${i * 60}ms` }}>
              <span className={styles.box} aria-hidden="true">{on ? "✓" : ""}</span>
              <span>{l.code} · {l.name}</span>
              <span className="sr-only">{on ? ", selected" : ", not selected"}</span>
            </li>
          );
        })}
      </ul>
      <ul className={styles.chips} aria-label="Selected languages">
        {picked.map((l) => <li key={l.code}>{l.code} · {l.name}</li>)}
      </ul>
    </div>
  );
}

function Preview({ data, code, menuOpen }: { data: LanguagePreviewData; code: "EN" | "ES"; menuOpen: boolean }) {
  const copy = data.copy[code];
  const current = data.languages.find((l) => l.code === code);
  const menu = data.languages.filter((l) => data.picked.includes(l.code));
  return (
    <div className={styles.frame}>
      <div className={styles.toolbar}>
        <span className={`${styles.select} ${menuOpen ? styles.selectOpen : ""}`}>
          {current?.name} · {code}
          <span aria-hidden="true" className={styles.caret}>▾</span>
        </span>
        <span className={styles.close} lang={copy.lang}><span aria-hidden="true">✕</span> {copy.close}</span>
        {menuOpen ? (
          <ul className={styles.menu} aria-label="Language menu">
            {menu.map((l) => (
              <li key={l.code} className={l.code === "ES" ? styles.menuHit : undefined}>
                {l.name} · {l.code}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className={styles.survey} lang={copy.lang} key={code}>
        <div className={styles.surveyHead}>
          <span className={styles.surveyTitle}>{copy.title}</span>
          <span className={styles.brand}>John Deere</span>
        </div>
        <p className={styles.question}>{copy.question}</p>
        <table className={styles.scale}>
          <thead>
            <tr>
              <td />
              {copy.scale.map((s) => <th key={s} scope="col">{s}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row}>
                <th scope="row">{row}</th>
                {copy.scale.map((s) => <td key={s}><span className={styles.radio} aria-hidden="true" /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.surveyFoot}>
          <span className={styles.pager}>1 / 3</span>
          <span className={styles.next}>{copy.next}</span>
        </div>
      </div>
    </div>
  );
}

function LanguageMock({ phase, data }: { phase: string; data: LanguagePreviewData }) {
  if (phase === "pick") return <Picker data={data} />;
  return <Preview data={data} code={phase === "spanish" ? "ES" : "EN"} menuOpen={phase === "menu"} />;
}

export default function LanguagePreviewShowcase({
  preview,
  phases,
}: {
  preview: LanguagePreviewData;
  phases: ShowcasePhase[];
}) {
  return (
    <PhasedShowcase phases={phases} label="Language preview steps">
      {(phase) => <LanguageMock phase={phase.id} data={preview} />}
    </PhasedShowcase>
  );
}
