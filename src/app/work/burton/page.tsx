"use client";

import React from "react";
import { CloudRain, Sun } from "lucide-react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import {
  hero,
  sectionNav,
  gaps,
  pattern,
  logic,
  component,
  tokens,
  accessibility,
  results,
  reflection,
  type TileSpec,
} from "@/content/burton";
import styles from "./burton.module.css";

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

/* A tile is static. Its bar, message and call to action are styled to match the design, and the
   call to action is a span, not a link, so no fake controls reach the accessibility tree. */
function TileArt({ tile }: { tile: TileSpec }) {
  const sun = tile.state === "sun";
  const Icon = sun ? Sun : CloudRain;
  return (
    <article className={styles.tile}>
      <p className={`${styles.tileBar} ${sun ? styles.tileBarSun : styles.tileBarRain}`}>
        <Icon size={16} aria-hidden="true" />
        {tile.bar}
      </p>
      <div className={styles.tileBody}>
        {tile.photo ? <p className={styles.tilePhoto}>{tile.photo}</p> : null}
        {tile.message ? <p className={styles.tileMessage}>{tile.message}</p> : null}
        <span className={styles.cta}>{tile.cta}</span>
      </div>
    </article>
  );
}

export default function BurtonCaseStudy() {
  const label = (id: string) => sectionNav.find((s) => s.id === id)?.label ?? "";

  return (
    <CaseStudyLayout sections={sectionNav} hideBrief>
      <div className={styles.page}>
        {/* ── Hero ── */}
        <section className={styles.hero} aria-labelledby="bu-title">
          <div className={styles.heroInner}>
            <ul className={styles.tags}>
              {hero.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <h1 id="bu-title" className={styles.heroTitle}>
              {hero.titleLines.map((line) => (
                <React.Fragment key={line}>
                  <span className={styles.heroLine}>
                    <Marked text={line} />
                  </span>{" "}
                </React.Fragment>
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

        {/* ── 01 The gaps ── */}
        <Chapter id="gaps" kicker={label("gaps")} title={gaps.title}>
          <p className={styles.lead}>{gaps.lead}</p>
          <ul className={styles.stickies}>
            {gaps.stickies.map((s) => (
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

        {/* ── 02 Working out the pattern ── */}
        <Chapter id="pattern" kicker={label("pattern")} title={pattern.title} tone="lilac">
          <p className={styles.lead}>{pattern.lead}</p>
          {pattern.decisions.map((d) => (
            <div key={d.question} className={styles.group}>
              <h3 className={styles.groupTitle}>{d.question}</h3>
              <ul className={styles.options}>
                {d.options.map((o) => (
                  <li key={o.title} className={`${styles.option} ${o.chosen ? styles.optionChosen : ""}`}>
                    <p className={`${styles.tag} ${o.chosen ? styles.tagChosen : ""}`}>{o.tag}</p>
                    <h4 className={styles.optionTitle}>{o.title}</h4>
                    <p className={styles.optionBody}>{o.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className={styles.handNote}>{pattern.rotated}</p>
        </Chapter>

        {/* ── 03 Interaction logic ── */}
        <Chapter id="logic" kicker={label("logic")} title={logic.title}>
          <p className={styles.lead}>{logic.lead}</p>
          <ol className={styles.chain}>
            {logic.steps.map((s) => (
              <li key={s.name} className={styles.step}>
                <span className={styles.stepIndex} aria-hidden="true" />
                <h3 className={styles.stepName}>{s.name}</h3>
                <p className={styles.stepText}>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className={styles.fallbacks}>
            <h3 className={styles.fallbacksTitle}>{logic.fallbacksTitle}</h3>
            <ul className={styles.fallbackList}>
              {logic.fallbacks.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <p className={styles.note}>{logic.footnote}</p>
        </Chapter>

        {/* ── 04 The component ── */}
        <Chapter id="component" kicker={label("component")} title={component.title} tone="lilac">
          <p className={styles.lead}>{component.lead}</p>
          <section className={styles.specimen} aria-labelledby="spec-tile">
            <div className={styles.specimenHead}>
              <h3 id="spec-tile" className={styles.specimenTitle}>{component.cardTitle}</h3>
              <p className={styles.specimenTag}>{component.cardTag}</p>
            </div>
            <div className={styles.tiles}>
              {component.tiles.map((t) => (
                <div key={t.label} className={styles.tileCell}>
                  <p className={styles.cellLabel}>{t.label}</p>
                  <TileArt tile={t} />
                </div>
              ))}
            </div>
            <dl className={styles.specRows}>
              {component.spec.map((r) => (
                <div key={r.label} className={styles.specRow}>
                  <dt>{r.label}</dt>
                  <dd>{r.text}</dd>
                </div>
              ))}
            </dl>
          </section>
        </Chapter>

        {/* ── 05 Tokens ── */}
        <Chapter id="tokens" kicker={label("tokens")} title={tokens.title}>
          <p className={styles.lead}>{tokens.lead}</p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <caption className={styles.caption}>{tokens.caption}</caption>
              <thead>
                <tr>
                  <th scope="col">Token</th>
                  <th scope="col">Value</th>
                  <th scope="col">Used by</th>
                  <th scope="col">Check</th>
                </tr>
              </thead>
              <tbody>
                {tokens.rows.map((r) => (
                  <tr key={r.token}>
                    <td data-label="Token" className={styles.token}>{r.token}</td>
                    <td data-label="Value">
                      {r.swatch ? (
                        <span className={styles.swatch} style={{ background: r.swatch }} aria-hidden="true" />
                      ) : null}
                      {r.value}
                    </td>
                    <td data-label="Used by">{r.usedBy}</td>
                    <td data-label="Check">{r.check}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.note}>{tokens.footnote}</p>
        </Chapter>

        {/* ── 06 Accessibility ── */}
        <Chapter id="accessibility" kicker={label("accessibility")} title={accessibility.title} tone="lilac">
          <p className={styles.lead}>{accessibility.lead}</p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <caption className={styles.caption}>{accessibility.caption}</caption>
              <thead>
                <tr>
                  <th scope="col">Rule</th>
                  <th scope="col">WCAG 2.2</th>
                  <th scope="col">In practice</th>
                </tr>
              </thead>
              <tbody>
                {accessibility.rows.map((r) => (
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

        {/* ── 07 Results ── */}
        <Chapter id="results" kicker={label("results")} title={results.title}>
          <div className={styles.statGrid}>
            {results.stats.map((s) => (
              <div key={s.value}>
                <p className={styles.resultValue}>{s.value}</p>
                <p className={styles.resultLabel}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className={styles.reading}>
            <p className={styles.readingKicker}>{results.reading.kicker}</p>
            <p className={styles.readingBody}>{results.reading.body}</p>
          </div>
          <p className={styles.note}>{results.footnote}</p>
        </Chapter>

        {/* ── 08 Reflection ── */}
        <Chapter id="reflection" kicker={label("reflection")} title={reflection.title} tone="lilac">
          <div className={styles.reflectionGrid}>
            {reflection.cards.map((c) => (
              <article key={c.title} className={`${styles.card} ${c.tone === "lilac" ? styles.cardLilac : ""}`}>
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
