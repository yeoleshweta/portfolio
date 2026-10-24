"use client";

import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import {
  hero,
  sectionNav,
  overview,
  tension,
  craft,
  experiments,
  implementation,
  evidence,
  learnings,
  credit,
} from "@/content/evans";
import styles from "./evans.module.css";

/* Renders **word** as bold inside a paragraph. */
function Bold({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i}>{part}</strong>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

type Tone = "paper" | "cream" | "ink";

function Chapter({
  id,
  kicker,
  title,
  tone = "paper",
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
        <h2 className={styles.h2}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

const maxUplift = Math.max(...experiments.map((e) => e.uplift));

/* The bars are real buttons with aria-pressed, and the selected experiment's detail is text,
   so the selection does not rely on colour. Heights leave 15% headroom for the value labels. */
function ExperimentChart() {
  // Index 2 is top-200 popularity, the design's default selection.
  const [selected, setSelected] = React.useState(2);
  const active = experiments[selected];

  return (
    <div className={styles.chart}>
      <div className={styles.chartHead}>
        <p className={styles.chartTitle}>{craft.chartTitle}</p>
        <p className={styles.chartNote}>{craft.chartNote}</p>
      </div>

      <div className={styles.bars} role="group" aria-label={craft.chartTitle}>
        {experiments.map((e, i) => (
          <button
            key={e.label}
            type="button"
            className={styles.bar}
            aria-pressed={i === selected}
            aria-label={`${e.label}, ${e.value} RPV`}
            onClick={() => setSelected(i)}
            style={{ "--h": `${(e.uplift / maxUplift) * 85}%` } as React.CSSProperties}
          >
            <span className={styles.track} aria-hidden="true">
              <span className={styles.value}>{e.value}</span>
              <span className={styles.fill} />
            </span>
            <span className={styles.label} aria-hidden="true">{e.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.detail} aria-live="polite">
        <div className={styles.detailHead}>
          <div>
            <p className={styles.detailCategory}>{active.category}</p>
            <h3 className={styles.detailTitle}>{active.title}</h3>
          </div>
          <p className={styles.detailUplift}>{active.value} RPV</p>
        </div>
        <p className={styles.detailBody}>{active.description}</p>
        {active.note ? <p className={styles.detailNote}>{active.note}</p> : null}
      </div>
    </div>
  );
}

export default function EvansCaseStudy() {
  return (
    <CaseStudyLayout sections={sectionNav} hideBrief>
      <div className={styles.page}>
        {/* ── Hero ── */}
        <section className={styles.hero} aria-labelledby="ev-title">
          <div className={styles.heroInner}>
            <p className={styles.kicker}>{hero.kicker}</p>
            <h1 id="ev-title" className={styles.heroTitle}>
              {hero.title}
            </h1>
            <p className={styles.heroLead}>{hero.lead}</p>
            <dl className={styles.meta}>
              {hero.meta.map((item) => (
                <div key={item.label} className={styles.metaItem}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Overview ── */}
        <Chapter id="overview" kicker="Overview" title={overview.title}>
          {overview.paragraphs.map((p) => (
            <p key={p} className={styles.body}>{p}</p>
          ))}
        </Chapter>

        {/* ── 01 The tension ── */}
        <Chapter id="tension" kicker="01 · The tension" title={tension.title} tone="cream">
          <ol className={styles.cards}>
            {tension.cards.map((c) => (
              <li key={c.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardBody}>{c.body}</p>
              </li>
            ))}
          </ol>
          <figure className={styles.pull}>
            <p>{tension.quote}</p>
          </figure>
        </Chapter>

        {/* ── 02 The craft ── */}
        <Chapter id="craft" kicker="02 · The craft" title={craft.title}>
          <p className={styles.body}>{craft.lead}</p>
          <ExperimentChart />
        </Chapter>

        {/* ── 03 Implementation ── */}
        <Chapter id="implementation" kicker="03 · Implementation" title={implementation.title} tone="cream">
          {implementation.paragraphs.map((p) => (
            <p key={p} className={styles.body}>
              <Bold text={p} />
            </p>
          ))}
        </Chapter>

        {/* ── 04 Evidence ── */}
        <Chapter id="evidence" kicker="04 · Evidence" title={evidence.title}>
          <div className={styles.stats}>
            {evidence.stats.map((s) => (
              <div key={s.value} className={styles.stat}>
                <p className={styles.statValue}>{s.value}</p>
                <p className={styles.statLabel}>{s.label}</p>
              </div>
            ))}
          </div>
          <figure className={styles.quote}>
            <p>{evidence.quote.text}</p>
            <figcaption className={styles.cite}>— {evidence.quote.attribution}</figcaption>
          </figure>
        </Chapter>

        {/* ── Key learnings ── */}
        <Chapter id="learnings" kicker={learnings.kicker} title={learnings.title} tone="ink">
          <div className={styles.learningList}>
            {learnings.items.map((item) => (
              <div key={item.title}>
                <h3 className={styles.learningTitle}>{item.title}</h3>
                <p className={styles.learningBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </Chapter>

        <div className={styles.credit}>
          <p>{credit.name}</p>
          <p>{credit.note}</p>
        </div>
      </div>
    </CaseStudyLayout>
  );
}
