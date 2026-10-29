import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import {
  hero,
  sectionNav,
  problem,
  approach,
  good,
  agreement,
  trust,
  decision,
  governance,
  limits,
  owned,
  type Stat,
} from "@/content/abim";
import styles from "./abim.module.css";

/* Renders *word* as an italic accent inside a heading. */
function Marked({ text }: { text: string }) {
  return (
    <>
      {text.split("*").map((part, i) =>
        i % 2 === 1 ? (
          <em key={i} className={styles.script}>{part}</em>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

type Tone = "tint" | "dark";

function Chapter({
  id,
  kicker,
  title,
  tone,
  first,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  tone?: Tone;
  first?: boolean;
  children: React.ReactNode;
}) {
  const headingId = `h-${id}`;
  const classes = [styles.section, tone ? styles[tone] : "", first ? styles.afterHero : ""].join(" ");
  return (
    <section id={id} className={classes} aria-labelledby={headingId}>
      <div className={styles.container}>
        <span className={styles.label}>{kicker}</span>
        <h2 id={headingId} className={styles.heading}>
          <Marked text={title} />
        </h2>
        {children}
      </div>
    </section>
  );
}

function Stats({ label, items }: { label: string; items: Stat[] }) {
  return (
    <ul className={styles.stats} aria-label={label}>
      {items.map((s) => (
        <li key={s.label} className={styles.statCard}>
          <span className={styles.sV}>{s.value}</span>
          <span className={styles.sL}>{s.label}</span>
        </li>
      ))}
    </ul>
  );
}

/* A horizontal bar per behavior, sorted high to low. Each value is written as text, and the threshold is a
   labelled line, so colour is never the only cue. Bars at or above the threshold are purple; the rest amber. */
function AgreementChart() {
  const pct = (v: number) => `${Math.round(v * 100)}%`;
  return (
    <div className={styles.chart}>
      <h3 className={styles.chartTitle}>{agreement.chartTitle}</h3>
      <ul className={styles.legend} aria-label="Chart key">
        <li><span className={`${styles.key} ${styles.keyHigh}`} aria-hidden="true" />At or above .61: substantial agreement</li>
        <li><span className={`${styles.key} ${styles.keyLow}`} aria-hidden="true" />Below .61: needs human review</li>
        <li><span className={styles.keyLine} aria-hidden="true" />.61 threshold</li>
      </ul>
      <ul className={styles.bars} aria-label="Cohen's kappa by behavior, from highest to lowest">
        {agreement.behaviors.map((b) => {
          const high = b.kappa >= agreement.threshold;
          return (
            <li key={b.name} className={styles.bar}>
              <span className={styles.barName}>{b.name}</span>
              <span className={styles.track} aria-hidden="true">
                <span
                  className={`${styles.fill} ${high ? styles.fillHigh : styles.fillLow}`}
                  style={{ width: pct(b.kappa) }}
                />
                <span className={styles.threshold} style={{ left: pct(agreement.threshold) }} />
              </span>
              <span className={`${styles.barValue} ${high ? styles.valueHigh : styles.valueLow}`}>
                {b.kappa.toFixed(2).replace(/^0/, "")}
              </span>
            </li>
          );
        })}
      </ul>
      <details className={styles.details}>
        <summary>{agreement.showData}</summary>
        {/* The table scrolls inside its own box at narrow widths; it is focusable so keyboard users can reach it. */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div className={styles.tblWrap} role="region" aria-label="Agreement and classifier scores" tabIndex={0}>
          <table>
            <caption>Cohen&apos;s kappa and classifier scores for each behavior</caption>
            <thead>
              <tr>
                <th scope="col">Behavior</th>
                <th scope="col">Kappa</th>
                <th scope="col">F1</th>
                <th scope="col">Precision</th>
                <th scope="col">Recall</th>
              </tr>
            </thead>
            <tbody>
              {agreement.behaviors.map((b) => (
                <tr key={b.name}>
                  <th scope="row">{b.name}</th>
                  <td className={styles.num}>{b.kappa.toFixed(2)}</td>
                  <td className={styles.num}>{b.f1.toFixed(2)}</td>
                  <td className={styles.num}>{b.precision.toFixed(2)}</td>
                  <td className={styles.num}>{b.recall.toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <th scope="row">Macro-F1 (unweighted mean)</th>
                <td className={styles.num}>—</td>
                <td className={styles.num}>{agreement.macroF1}</td>
                <td className={styles.num}>—</td>
                <td className={styles.num}>—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

export default function ABIMCaseStudy() {
  const label = (id: string) => sectionNav.find((s) => s.id === id)?.label ?? "";

  return (
    <CaseStudyLayout sections={sectionNav} hideBrief>
      <div className={styles.page}>
        {/* ── Hero ── */}
        <header className={styles.hero}>
          <span className={styles.category}>{hero.category}</span>
          <h1 className={styles.heroTitle}>{hero.title}</h1>
          <p className={styles.heroSub}>{hero.subtitle}</p>
          <ul className={styles.meta}>
            {hero.meta.map((m) => (
              <li key={m.label}>
                <span className={styles.mL}>{m.label}</span>
                <span className={styles.mV}>{m.value}</span>
              </li>
            ))}
          </ul>
          <p className={styles.scope}>{hero.scope}</p>

          <section className={styles.tldr} aria-labelledby="h-tldr">
            <h2 id="h-tldr" className={styles.tldrTitle}>TL;DR</h2>
            <div className={styles.tldrGrid}>
              {hero.tldr.map((t) => (
                <div key={t.title}>
                  <h3 className={styles.tldrLabel}>{t.title}</h3>
                  <p>{t.body}</p>
                </div>
              ))}
            </div>
          </section>

          <Stats label="Key numbers" items={hero.stats} />
        </header>

        {/* ── 01 Problem ── */}
        <Chapter id="problem" kicker={label("problem")} title={problem.title} first>
          <div className={styles.columns}>
            {problem.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className={styles.body}>{p}</p>
            ))}
          </div>
          <h3 className={styles.h3}>{problem.peopleTitle}</h3>
          <div className={styles.grid3}>
            {problem.people.map((p) => (
              <div key={p.title} className={styles.card}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
          <h3 className={styles.h3}>{problem.questionsTitle}</h3>
          <ol className={styles.questions}>
            {problem.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
        </Chapter>

        {/* ── 02 Approach ── */}
        <Chapter id="approach" kicker={label("approach")} title={approach.title}>
          <p className={styles.lead}>{approach.lead}</p>
          <div className={styles.grid4}>
            {approach.steps.map((s) => (
              <div key={s.step} className={styles.card}>
                <span className={styles.k}>{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </Chapter>

        {/* ── 03 Defining good ── */}
        <Chapter id="good" kicker={label("good")} title={good.title}>
          <p className={styles.lead}>{good.lead}</p>
          <div className={styles.grid2}>
            <div className={styles.card}>
              <div className={styles.bigLine}>
                <span className={styles.bigNum}>{good.detectable.count}</span>
                <h3 className={styles.inlineH3}>{good.detectable.title}</h3>
              </div>
              <p className={styles.note}>{good.detectable.note}</p>
              <ul className={styles.twoCol}>
                {good.detectable.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
            <div className={`${styles.card} ${styles.cardWarm}`}>
              <div className={styles.bigLine}>
                <span className={`${styles.bigNum} ${styles.bigNumWarm}`}>{good.left.count}</span>
                <h3 className={styles.inlineH3}>{good.left.title}</h3>
              </div>
              <p className={styles.note}>{good.left.note}</p>
              <ul className={styles.plain}>
                {good.left.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <p className={styles.small}>{good.left.body}</p>
            </div>
          </div>
        </Chapter>

        {/* ── 04 Agreement ── */}
        <Chapter id="agreement" kicker={label("agreement")} title={agreement.title}>
          <p className={styles.lead}>{agreement.lead}</p>
          <AgreementChart />
          <div className={styles.insight}>
            <span className={styles.insightLabel}>Insight for the product</span>
            <p className={styles.insightText}>{agreement.insight}</p>
          </div>
        </Chapter>

        {/* ── 05 Trust ── */}
        <Chapter id="trust" kicker={label("trust")} title={trust.title}>
          <p className={styles.lead}>{trust.lead}</p>
          <div className={styles.trustGrid}>
            <div className={styles.card}>
              <h3>{trust.judgment.title}</h3>
              <p>{trust.judgment.body}</p>
            </div>
            <span className={styles.arrow} aria-hidden="true">→</span>
            {/* The table scrolls inside its own box at narrow widths; it is focusable so keyboard users can reach it. */}
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
            <div className={styles.tblWrap} role="region" aria-label={trust.tableCaption} tabIndex={0}>
              <table>
                <caption>{trust.tableCaption}</caption>
                <thead>
                  <tr>
                    {trust.headers.map((h) => (
                      <th key={h} scope="col">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {trust.tiers.map((t) => (
                    <tr key={t.confidence}>
                      <th scope="row">{t.confidence}</th>
                      <td>{t.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Chapter>

        {/* ── 06 Decision ── */}
        <Chapter id="decision" kicker={label("decision")} title={decision.title}>
          <div className={styles.decisionRow}>
            <div className={styles.card}>
              <span className={styles.k}>{decision.original.label}</span>
              <h3>{decision.original.title}</h3>
              <p>{decision.original.body}</p>
            </div>
            <span className={styles.arrow} aria-hidden="true">→</span>
            <div className={`${styles.card} ${styles.cardPicked}`}>
              <span className={styles.k}>{decision.pushed.label}</span>
              <h3>{decision.pushed.title}</h3>
              <p>{decision.pushed.body}</p>
            </div>
          </div>
        </Chapter>

        {/* ── 07 Governance ── */}
        <Chapter id="governance" kicker={label("governance")} title={governance.title}>
          <div className={styles.grid3}>
            {governance.cards.map((c) => (
              <div key={c.title} className={styles.card}>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </Chapter>

        {/* ── 08 Limits ── */}
        <Chapter id="limits" kicker={label("limits")} title={limits.title}>
          <p className={styles.lead}>{limits.lead}</p>
          <p className={styles.body}>{limits.next}</p>
          <div className={styles.study}>
            <div className={styles.studyHead}>
              <h3>{limits.study.title}</h3>
              <span className={styles.pill}>{limits.study.status}</span>
            </div>
            {/* The table scrolls inside its own box at narrow widths; it is focusable so keyboard users can reach it. */}
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
            <div className={styles.tblWrap} role="region" aria-label={limits.study.title} tabIndex={0}>
              <table>
                <caption>{limits.study.title}: the plan</caption>
                <tbody>
                  {limits.study.rows.map((r) => (
                    <tr key={r.label}>
                      <th scope="row">{r.label}</th>
                      <td>{r.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Chapter>

        {/* ── 09 What I owned ── */}
        <Chapter id="owned" kicker={label("owned")} title={owned.title}>
          <div className={styles.ownedGrid}>
            <ul className={styles.owned}>
              {owned.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <div className={styles.lesson}>
              <h3>{owned.lesson.title}</h3>
              <p>{owned.lesson.body}</p>
            </div>
          </div>
          <ul className={styles.skills} aria-label="Skills shown">
            {owned.skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Chapter>
      </div>
    </CaseStudyLayout>
  );
}
