"use client";

import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import {
  hero,
  sectionNav,
  problem,
  flow,
  analysis,
  decisions,
  accessibility,
  reflection,
} from "@/content/cryptoSecure";
import styles from "./cryptoSecure.module.css";

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
  number,
  label,
  title,
  tone = "grey",
  children,
}: {
  id: string;
  number: string;
  label: string;
  title: string;
  tone?: Tone;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`${styles.chapter} ${styles[tone]}`}>
      <div className={styles.inner}>
        <p className={styles.kicker}>{number} · {label}</p>
        <h2 className={styles.h2}>
          <Marked text={title} />
        </h2>
        {children}
      </div>
    </section>
  );
}

/* A code panel with numbered lines. Lines wrap, so there is no horizontal scroll region. */
function CodePanel({
  file,
  badge,
  tone,
  lines,
}: {
  file: string;
  badge: string;
  tone: "critical" | "fixed";
  lines: { n: number; text: string; mark?: "bad" | "good" }[];
}) {
  return (
    <figure className={styles.codePanel}>
      <div className={styles.codeHead}>
        <span className={styles.codeFile}>{file}</span>
        <span className={`${styles.codeBadge} ${tone === "critical" ? styles.badgeCritical : styles.badgeFixed}`}>
          {badge}
        </span>
      </div>
      <ol className={styles.codeList}>
        {lines.map((line) => (
          <li
            key={line.n}
            value={line.n}
            className={line.mark === "bad" ? styles.codeBad : line.mark === "good" ? styles.codeGood : undefined}
          >
            {line.text}
          </li>
        ))}
      </ol>
    </figure>
  );
}

const sections = sectionNav;

export default function CryptoSecureCaseStudy() {
  return (
    <CaseStudyLayout sections={sections} hideBrief>
      {/* ── Hero ── */}
      <section className={styles.hero} aria-labelledby="cs-title">
        <div className={styles.heroInner}>
          <ul className={styles.tags}>
            {hero.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <h1 id="cs-title" className={styles.heroTitle}>
            {hero.titleLines.map((line) => (
              <span key={line} className={styles.heroLine}>
                <Marked text={line} />
                {line.endsWith("-") ? null : " "}
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
          <a className={styles.cta} href={hero.cta.href} target="_blank" rel="noreferrer">
            {hero.cta.label} <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </section>

      {/* ── 01 The problem ── */}
      <Chapter id="problem" number="01" label="The problem" title={problem.title} tone="grey">
        <p className={styles.lead}>{problem.lead}</p>
        <p className={styles.body}>{problem.body}</p>

        <dl className={styles.stats}>
          {problem.stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <dt className={styles.statLabel}>{stat.label}</dt>
              <dd className={styles.statValue}>{stat.value}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.source}>
          {problem.source.text},{" "}
          <a href={problem.source.href} target="_blank" rel="noreferrer">
            {problem.source.linkText}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>

        <ul className={styles.stickies}>
          {problem.stickies.map((s) => (
            <li key={s.label} className={`${styles.sticky} ${s.tone === "yellow" ? styles.stickyYellow : styles.stickyLilac}`}>
              <span className={styles.stickyLabel}>{s.label}</span> {s.body}
            </li>
          ))}
        </ul>
      </Chapter>

      {/* ── 02 The flow ── */}
      <Chapter id="flow" number="02" label="The flow" title={flow.title} tone="lilac">
        <p className={styles.lead}>
          {flow.lead}{" "}
          {flow.extensions.map((ext, i) => (
            <React.Fragment key={ext}>
              <code className={styles.chip}>{ext}</code>
              {i < flow.extensions.length - 2 ? ", " : i === flow.extensions.length - 2 ? " and " : " "}
            </React.Fragment>
          ))}
          files.
        </p>

        <ol className={styles.flow}>
          {flow.steps.map((step) => (
            <li key={step.label} className={`${styles.flowStep} ${step.highlight ? styles.flowHighlight : ""}`}>
              <p className={styles.flowLabel}>{step.label}</p>
              <p className={styles.flowText}>{step.text}</p>
            </li>
          ))}
        </ol>
      </Chapter>

      {/* ── 03 Under the hood ── */}
      <Chapter id="analysis" number="03" label="Under the hood" title={analysis.title} tone="grey">
        <p className={styles.lead}>{analysis.lead}</p>

        <div className={styles.analysisGrid}>
          {analysis.cards.map((card) => (
            <article key={card.title} className={`${styles.card} ${card.tone === "lilac" ? styles.cardLilac : ""}`}>
              <p className={`${styles.tag} ${card.tone === "lilac" ? styles.tagLive : styles.tagPartial}`}>{card.tag}</p>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <ul className={styles.bullets}>
                {card.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              {"closing" in card && card.closing ? <p className={styles.cardFoot}>{card.closing}</p> : null}
              {"models" in card && card.models ? (
                <ul className={styles.models}>
                  {card.models.map((m) => (
                    <li key={m} className={styles.model}>{m}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>

        <p className={styles.note}>{analysis.note}</p>
      </Chapter>

      {/* ── 04 Design decisions ── */}
      <Chapter id="decisions" number="04" label="Design decisions" title={decisions.title} tone="lilac">
        <div className={styles.decisionGrid}>
          {decisions.items.map((item) => (
            <article key={item.n} className={styles.card}>
              <p className={styles.decisionNum}>{item.n}</p>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardBody}>{item.body}</p>
            </article>
          ))}
        </div>

        <div className={styles.codeCompare}>
          <CodePanel file={decisions.vulnerable.file} badge={decisions.vulnerable.badge} tone="critical" lines={decisions.vulnerable.lines} />
          <CodePanel file={decisions.secure.file} badge={decisions.secure.badge} tone="fixed" lines={decisions.secure.lines} />
        </div>
        <p className={styles.caption}>{decisions.caption}</p>
      </Chapter>

      {/* ── 05 Accessibility ── */}
      <Chapter id="accessibility" number="05" label="Accessibility" title={accessibility.title} tone="grey">
        <p className={styles.lead}>{accessibility.lead}</p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className={styles.tableCaption}>{accessibility.caption}</caption>
            <thead>
              <tr>
                <th scope="col">Gap</th>
                <th scope="col">WCAG 2.2</th>
                <th scope="col">Fix</th>
              </tr>
            </thead>
            <tbody>
              {accessibility.rows.map((row) => (
                <tr key={row.gap}>
                  <td data-label="Gap" className={styles.strong}>{row.gap}</td>
                  <td data-label="WCAG 2.2">{row.criterion}</td>
                  <td data-label="Fix">{row.fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Chapter>

      {/* ── 06 Reflection ── */}
      <Chapter id="reflection" number="06" label="Reflection" title={reflection.title} tone="lilac">
        <div className={styles.reflectionGrid}>
          {reflection.cards.map((card) => (
            <article key={card.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardBody}>{card.body}</p>
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
      </Chapter>
    </CaseStudyLayout>
  );
}
