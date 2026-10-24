"use client";

import React from "react";
import { Eye } from "lucide-react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import {
  hero,
  sectionNav,
  question,
  portfolio,
  patterns,
  specimenPlaceholders,
  honest,
  results,
  reflection,
  type SpecimenVisual,
} from "@/content/evans";
import styles from "./evans.module.css";

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

type Tone = "grey" | "lilac";

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

const maxUplift = Math.max(...portfolio.bars.map((b) => b.uplift));

type Specimen = (typeof patterns.specimens)[number];

function Product({ meta }: { meta: string }) {
  return (
    <div className={styles.product}>
      <span className={styles.thumb} aria-hidden="true" />
      <div>
        <p className={styles.productName}>{specimenPlaceholders.productName}</p>
        <p className={styles.productMeta}>{meta}</p>
      </div>
    </div>
  );
}

/* The specimens are static recreations. Their chips, input and banner are styled to match the
   design but are not focusable, so no fake controls reach the accessibility tree. */
function SpecimenArt({ kind, visual }: { kind: Specimen["kind"]; visual: SpecimenVisual }) {
  switch (kind) {
    case "proof":
      return (
        <>
          <Product meta={specimenPlaceholders.productPrice} />
          <p className={styles.proofLine}>
            <Eye size={16} aria-hidden="true" />
            {visual.line}
          </p>
        </>
      );
    case "badge":
      return (
        <>
          <span className={`${styles.badge} ${styles.badgeDark}`}>{visual.badge}</span>
          <Product meta={visual.meta ?? ""} />
        </>
      );
    case "popular":
      return (
        <>
          <span className={styles.badge}>{visual.badge}</span>
          <Product meta={specimenPlaceholders.productPrice} />
        </>
      );
    case "mobile":
      return (
        <>
          <div className={styles.chipRow}>
            {(visual.chips ?? []).map((chip, i) => (
              <span key={chip} className={`${styles.chip} ${i === 0 ? styles.chipOn : ""}`}>
                {chip}
              </span>
            ))}
          </div>
          <Product meta={specimenPlaceholders.productPrice} />
        </>
      );
    case "welcome":
      return (
        <div className={styles.banner}>
          <p className={styles.bannerHeading}>{visual.heading}</p>
          {(visual.lines ?? []).map((line) => (
            <p key={line} className={styles.bannerLine}>{line}</p>
          ))}
        </div>
      );
    case "checkout":
      return (
        <div className={styles.field}>
          <p className={styles.fieldLabel}>{visual.label}</p>
          <span className={styles.fieldInput}>{visual.value}</span>
          <p className={styles.fieldHelper}>
            <span className={styles.fieldIcon} aria-hidden="true">!</span>
            {visual.helper}
          </p>
        </div>
      );
  }
}

function SpecimenCard({ spec }: { spec: Specimen }) {
  return (
    <article className={styles.specimen}>
      <div className={styles.visual}>
        <SpecimenArt kind={spec.kind} visual={spec.visual} />
      </div>
      <div className={styles.specBody}>
        <h3 className={styles.specTitle}>{spec.title}</h3>
        <p className={styles.specRpv}>{spec.rpv}</p>
        <dl className={styles.specRows}>
          {spec.rows.map((r) => (
            <div key={r.label} className={styles.specRow}>
              <dt>{r.label}</dt>
              <dd>{r.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

export default function EvansCaseStudy() {
  const label = (id: string) => sectionNav.find((s) => s.id === id)?.label ?? "";

  return (
    <CaseStudyLayout sections={sectionNav} hideBrief>
      <div className={styles.page}>
        {/* ── Hero ── */}
        <section className={styles.hero} aria-labelledby="ev-title">
          <div className={styles.heroInner}>
            <ul className={styles.tags}>
              {hero.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <h1 id="ev-title" className={styles.heroTitle}>
              {hero.titleLines.map((line) => (
                <span key={line} className={styles.heroLine}>
                  <Marked text={line} />
                </span>
              ))}
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
            <div className={styles.stat}>
              <p className={styles.statValue}>{hero.stat.value}</p>
              <p className={styles.statLabel}>{hero.stat.label}</p>
            </div>
          </div>
        </section>

        {/* ── 01 The question ── */}
        <Chapter id="question" kicker={label("question")} title={question.title}>
          <p className={styles.lead}>{question.lead}</p>
          <ul className={styles.stickies}>
            {question.stickies.map((s) => (
              <li
                key={s.title}
                className={`${styles.sticky} ${s.tone === "yellow" ? styles.stickyYellow : styles.stickyLilac}`}
              >
                <h3 className={styles.stickyTitle}>{s.title}</h3>
                <p className={styles.stickyBody}>{s.body}</p>
              </li>
            ))}
          </ul>
        </Chapter>

        {/* ── 02 The portfolio ── */}
        <Chapter id="portfolio" kicker={label("portfolio")} title={portfolio.title} tone="lilac">
          <p className={styles.lead}>{portfolio.lead}</p>
          <div className={styles.barsCard}>
            <ol className={styles.bars}>
              {portfolio.bars.map((b) => (
                <li key={b.label} className={styles.bar}>
                  <div className={styles.barLabel}>
                    <p className={styles.barCategory}>{b.category}</p>
                    <p className={styles.barName}>{b.label}</p>
                  </div>
                  <div className={styles.track} aria-hidden="true">
                    <span
                      className={`${styles.fill} ${b.best ? styles.fillBest : ""}`}
                      style={{ width: `${(b.uplift / maxUplift) * 100}%` }}
                    />
                  </div>
                  <p className={styles.barValue}>{b.value}</p>
                </li>
              ))}
            </ol>
          </div>
          <p className={styles.handNote}>{portfolio.note}</p>
        </Chapter>

        {/* ── 03 Interaction patterns ── */}
        <Chapter id="patterns" kicker={label("patterns")} title={patterns.title}>
          <p className={styles.lead}>{patterns.lead}</p>
          <div className={styles.specimens}>
            {patterns.specimens.map((spec) => (
              <SpecimenCard key={spec.title} spec={spec} />
            ))}
          </div>
          <p className={styles.note}>{patterns.footnote}</p>
        </Chapter>

        {/* ── 04 Honest by design ── */}
        <Chapter id="honest" kicker={label("honest")} title={honest.title} tone="lilac">
          <p className={styles.lead}>{honest.lead}</p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <caption className={styles.caption}>{honest.caption}</caption>
              <thead>
                <tr>
                  <th scope="col">Rule</th>
                  <th scope="col">WCAG 2.2</th>
                  <th scope="col">In practice</th>
                </tr>
              </thead>
              <tbody>
                {honest.rows.map((r) => (
                  <tr key={r.rule}>
                    <td data-label="Rule" className={styles.strong}>{r.rule}</td>
                    <td data-label="WCAG 2.2">{r.criterion}</td>
                    <td data-label="In practice">{r.practice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Chapter>

        {/* ── 05 Results ── */}
        <Chapter id="results" kicker={label("results")} title={results.title}>
          <div className={styles.statGrid}>
            {results.stats.map((s) => (
              <div key={s.value}>
                <p className={`${styles.resultValue} ${s.tone === "ink" ? styles.resultInk : ""}`}>{s.value}</p>
                <p className={styles.resultLabel}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className={styles.sum}>
            <p className={styles.sumFormula}>
              <s className={styles.sumStruck}>{results.sum.formula}</s>{" "}
              <span className={styles.sumVerdict}>{results.sum.verdict}</span>
            </p>
            <p className={styles.sumBody}>{results.sum.body}</p>
          </div>
          <p className={styles.note}>{results.footnote}</p>
        </Chapter>

        {/* ── 06 Reflection ── */}
        <Chapter id="reflection" kicker={label("reflection")} title={reflection.title} tone="lilac">
          <div className={styles.reflectionGrid}>
            {reflection.cards.map((c) => (
              <article
                key={c.title}
                className={`${styles.card} ${c.tone === "lilac" ? styles.cardLilac : ""}`}
              >
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardBody}>{c.body}</p>
              </article>
            ))}
          </div>
          <div className={styles.next}>
            <h3 className={styles.nextTitle}>{reflection.nextTitle}</h3>
            <ol className={styles.nextList}>
              {reflection.next.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </Chapter>
      </div>
    </CaseStudyLayout>
  );
}
