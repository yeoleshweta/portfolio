"use client";

import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import {
  hero,
  sectionNav,
  question,
  experiment,
  budget,
  results,
  reflection,
} from "@/content/missSelfridge";
import styles from "./missSelfridge.module.css";

/* Renders *word* as an italic accent inside a heading. */
function Marked({ text }: { text: string }) {
  return (
    <>
      {text.split("*").map((part, i) =>
        i % 2 === 1 ? (
          <em key={i} className={styles.accent}>{part}</em>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

type Tone = "grey" | "lilac" | "white";

function Chapter({
  id,
  kicker,
  title,
  tone = "grey",
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  tone?: Tone;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`${styles.chapter} ${styles[tone]}`}>
      <div className={styles.inner}>
        <p className={styles.kicker}>{kicker}</p>
        <h2 className={styles.h2}>
          <Marked text={title} />
        </h2>
        {children}
      </div>
    </section>
  );
}

export default function MissSelfridgeCaseStudy() {
  const jobsTotal = budget.jobs.reduce((sum, j) => sum + j.share, 0);

  return (
    <CaseStudyLayout sections={sectionNav} hideBrief>
      {/* ── Hero ── */}
      <section className={styles.hero} aria-labelledby="ms-title">
        <div className={styles.heroInner}>
          <ul className={styles.tags}>
            {hero.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <h1 id="ms-title" className={styles.heroTitle}>
            {hero.titleLines.map((line) => (
              <span key={line} className={styles.heroLine}>
                <Marked text={line} />{" "}
              </span>
            ))}
          </h1>
          <p className={styles.heroLead}>{hero.lead}</p>
          <dl className={styles.heroMeta}>
            {hero.meta.map((item) => (
              <div key={item.label} className={styles.heroMetaItem}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
          <div className={styles.statBox}>
            <p className={styles.statValue}>{hero.stat.value}</p>
            <p className={styles.statLabel}>{hero.stat.label}</p>
          </div>
        </div>
      </section>

      {/* ── 01 The question ── */}
      <Chapter id="question" kicker="01 · The question" title={question.title} tone="grey">
        <p className={styles.lead}>{question.lead}</p>
        <p className={styles.body}>{question.body}</p>

        <ul className={styles.stickies}>
          {question.stickies.map((s) => (
            <li key={s.title} className={`${styles.sticky} ${s.tone === "yellow" ? styles.stickyYellow : styles.stickyLilac}`}>
              <p className={styles.stickyTitle}>{s.title}</p>
              <p className={styles.stickyBody}>{s.body}</p>
            </li>
          ))}
        </ul>
      </Chapter>

      {/* ── 02 Experiment design ── */}
      <Chapter id="experiment" kicker="02 · Experiment design" title={experiment.title} tone="lilac">
        <p className={styles.lead}>{experiment.lead}</p>

        <div className={styles.flow}>
          {experiment.steps.map((step) => (
            <React.Fragment key={step.label}>
              <div className={styles.flowStep}>
                <p className={styles.flowLabel}>{step.label}</p>
                <p className={styles.flowText}>{step.text}</p>
              </div>
              <span className={styles.flowArrow} aria-hidden="true">↓</span>
            </React.Fragment>
          ))}
        </div>

        <div className={styles.arms}>
          {experiment.arms.map((arm) => (
            <article key={arm.name} className={`${styles.arm} ${arm.tone === "treated" ? styles.armTreated : styles.armHoldout}`}>
              <div className={styles.armHead}>
                <h3 className={styles.armName}>{arm.name}</h3>
                <p className={styles.armShare}>{arm.share}</p>
              </div>
              <p className={`${styles.armCreative} ${arm.tone === "treated" ? styles.creativeTreated : styles.creativeHoldout}`}>
                {arm.creative}
              </p>
              <p className={styles.armNote}>{arm.note}</p>
            </article>
          ))}
        </div>

        <div className={styles.formula}>
          <p className={styles.formulaText}>{experiment.formula}</p>
          <p className={styles.formulaNote}>{experiment.formulaNote}</p>
        </div>

        <h3 className={styles.h3}>{experiment.decisionsTitle}</h3>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className={styles.tableCaption}>{experiment.decisionsCaption}</caption>
            <thead>
              <tr>
                <th scope="col">Decision</th>
                <th scope="col">Instead of</th>
                <th scope="col">Why</th>
              </tr>
            </thead>
            <tbody>
              {experiment.decisions.map((d) => (
                <tr key={d.decision}>
                  <td data-label="Decision" className={styles.strong}>{d.decision}</td>
                  <td data-label="Instead of">{d.instead}</td>
                  <td data-label="Why">{d.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Chapter>

      {/* ── 03 Budget by job ── */}
      <Chapter id="budget" kicker="03 · Budget by job" title={budget.title} tone="grey">
        <p className={styles.lead}>{budget.lead}</p>

        <div className={styles.split} role="img" aria-label={`Budget split: ${budget.jobs.map((j) => `${j.name} ${j.share}%`).join(", ")}`}>
          {budget.jobs.map((j) => (
            <span
              key={j.name}
              className={`${styles.splitPart} ${j.name === "Prospecting" ? styles.splitProspect : styles.splitOther}`}
              style={{ width: `${(j.share / jobsTotal) * 100}%` }}
            >
              {j.share}%
            </span>
          ))}
        </div>

        <div className={styles.jobGrid}>
          {budget.jobs.map((j) => (
            <article key={j.name} className={styles.card}>
              <p className={styles.jobShare}>{j.name} · {j.share}%</p>
              <p className={styles.cardBody}>{j.body}</p>
              {j.scored ? <p className={styles.cardFoot}>{j.scored}</p> : null}
            </article>
          ))}
        </div>
        <p className={styles.note}>{budget.footnote}</p>
      </Chapter>

      {/* ── 04 Results ── */}
      <Chapter id="results" kicker="04 · Results" title={results.title} tone="lilac">
        <div className={styles.resultGrid}>
          {results.cards.map((c) => (
            <article key={c.label} className={styles.resultCard}>
              <p className={styles.resultValue}>{c.value}</p>
              <p className={styles.resultLabel}>{c.label}</p>
              <p className={styles.cardBody}>{c.body}</p>
            </article>
          ))}
        </div>

        <div className={styles.twoCol}>
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>{results.meaning.title}</h3>
            <p className={styles.cardBody}>{results.meaning.body}</p>
          </article>
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>{results.changed.title}</h3>
            <p className={styles.cardBody}>{results.changed.body}</p>
          </article>
        </div>
        <p className={styles.footnoteBox}>{results.footnote}</p>
      </Chapter>

      {/* ── 05 Reflection ── */}
      <Chapter id="reflection" kicker="05 · Reflection" title={reflection.title} tone="lilac">
        <div className={styles.reflectionGrid}>
          {reflection.cards.map((c) => (
            <article key={c.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{c.title}</h3>
              <p className={styles.cardBody}>{c.body}</p>
            </article>
          ))}
        </div>

        <div className={styles.nextCard}>
          <h3 className={styles.nextTitle}>{reflection.nextTitle}</h3>
          <ol className={styles.nextList}>
            {reflection.next.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>

        <p className={styles.reading}>
          {reflection.reading.label}{" "}
          <a href={reflection.reading.href} target="_blank" rel="noreferrer">
            {reflection.reading.title}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>{" "}
          ({reflection.reading.source}).
        </p>
      </Chapter>
    </CaseStudyLayout>
  );
}
