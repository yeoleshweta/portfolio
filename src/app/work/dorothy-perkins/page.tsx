"use client";

import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import {
  hero,
  sectionNav,
  gaps,
  patterns,
  components,
  tokens,
  accessibility,
  results,
  reflection,
} from "@/content/dorothyPerkins";
import styles from "./dorothyPerkins.module.css";

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

function SpecList({ rows }: { rows: { label: string; text: string }[] }) {
  return (
    <dl className={styles.spec}>
      {rows.map((r) => (
        <div key={r.label} className={styles.specRow}>
          <dt>{r.label}</dt>
          <dd>{r.text}</dd>
        </div>
      ))}
    </dl>
  );
}

function SpecimenHead({ id, title, tag }: { id: string; title: string; tag: string }) {
  return (
    <div className={styles.specimenHead}>
      <h3 id={id} className={styles.specimenTitle}>{title}</h3>
      <p className={styles.specimenTag}>{tag}</p>
    </div>
  );
}

/* The specimens are static recreations. The switch, the link and the close control are styled
   to match the design but are not focusable, so no fake controls reach the accessibility tree. */
function ToggleSpecimen() {
  const t = components.toggle;
  return (
    <section className={styles.specimen} aria-labelledby="spec-toggle">
      <SpecimenHead id="spec-toggle" title={t.title} tag={t.tag} />
      <div className={styles.states}>
        {t.states.map((s) => (
          <div key={s.label} className={styles.state}>
            <p className={styles.stateLabel}>{s.label}</p>
            <span
              className={[
                styles.switch,
                s.on ? styles.switchOn : "",
                s.focus ? styles.switchFocus : "",
              ].join(" ")}
            >
              <span className={styles.knob} aria-hidden="true" />
              {s.text}
            </span>
          </div>
        ))}
      </div>
      <SpecList rows={t.spec} />
    </section>
  );
}

function PriceSpecimen() {
  const p = components.price;
  return (
    <section className={styles.specimen} aria-labelledby="spec-price">
      <SpecimenHead id="spec-price" title={p.title} tag={p.tag} />
      <div className={styles.priceGrid}>
        <div className={styles.priceCell}>
          <p className={styles.stateLabel}>{p.regular.label}</p>
          <p className={styles.priceName}>{p.regular.name}</p>
          <p className={styles.priceValue}>{p.regular.price}</p>
        </div>
        <div className={styles.priceCell}>
          <p className={styles.stateLabel}>{p.student.label}</p>
          <p className={styles.priceName}>{p.student.name}</p>
          <p className={styles.priceRow}>
            <span className={styles.priceStudent}>
              <span className="sr-only">Student price </span>
              {p.student.price}
            </span>
            <s className={styles.was}>
              <span className="sr-only">was </span>
              {p.student.was}
            </s>
            <span className={styles.studentNote}>{p.student.note}</span>
          </p>
        </div>
      </div>
      <SpecList rows={p.spec} />
    </section>
  );
}

function ProductRow({ ranks }: { ranks: string[] }) {
  return (
    <ul className={styles.productRow}>
      {ranks.map((rank) => (
        <li key={rank} className={styles.productCard}>
          <span className={styles.productImg} aria-hidden="true" />
          <span className={styles.productName}>[Product]</span>
          <span className={styles.productRank}>{rank}</span>
        </li>
      ))}
    </ul>
  );
}

function TrendingSpecimen() {
  const t = components.trending;
  return (
    <section className={styles.specimen} aria-labelledby="spec-trending">
      <SpecimenHead id="spec-trending" title={t.title} tag={t.tag} />
      <div className={styles.trendGrid}>
        <div className={styles.trendCell}>
          <p className={styles.stateLabel}>{t.known.label}</p>
          <div className={styles.trendHead}>
            <p className={styles.trendHeading}>{t.known.heading}</p>
            <span className={styles.link}>{t.known.link}</span>
          </div>
          <ProductRow ranks={t.known.items} />
        </div>
        <div className={styles.trendCell}>
          <p className={styles.stateLabel}>{t.unknown.label}</p>
          <p className={styles.trendHeading}>{t.unknown.heading}</p>
          <ProductRow ranks={t.unknown.items} />
        </div>
      </div>
      <SpecList rows={t.spec} />
    </section>
  );
}

function WelcomeSpecimen() {
  const w = components.welcome;
  return (
    <section className={styles.specimen} aria-labelledby="spec-welcome">
      <SpecimenHead id="spec-welcome" title={w.title} tag={w.tag} />
      <div className={styles.welcomeGrid}>
        <div className={styles.state}>
          <p className={styles.stateLabel}>{w.first.label}</p>
          <div className={styles.banner}>
            <div>
              <p className={styles.bannerTitle}>{w.first.heading}</p>
              <p className={styles.bannerBody}>{w.first.body}</p>
            </div>
            <span className={styles.close}>{w.first.close}</span>
          </div>
        </div>
        <div className={styles.state}>
          <p className={styles.stateLabel}>{w.returning.label}</p>
          <p className={styles.bannerBody}>{w.returning.text}</p>
        </div>
      </div>
      <SpecList rows={w.spec} />
    </section>
  );
}

export default function DorothyPerkinsCaseStudy() {
  return (
    <CaseStudyLayout sections={sectionNav} hideBrief>
      <div className={styles.page}>
        {/* ── Hero ── */}
        <section className={styles.hero} aria-labelledby="dp-title">
          <div className={styles.heroInner}>
            <ul className={styles.tags}>
              {hero.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <h1 id="dp-title" className={styles.heroTitle}>
              {hero.titleLines.map((line) => (
                <span key={line} className={styles.heroLine}>
                  <Marked text={line} />{" "}
                </span>
              ))}
            </h1>
            <p className={styles.heroLead}>{hero.lead}</p>
            <dl className={styles.heroMeta}>
              {hero.meta.map((item) => (
                <div key={item.label}>
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

        {/* ── 01 The gaps ── */}
        <Chapter id="gaps" kicker={gaps.kicker} title={gaps.title}>
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

        {/* ── 02 The patterns ── */}
        <Chapter id="patterns" kicker={patterns.kicker} title={patterns.title} tone="lilac">
          <p className={styles.lead}>{patterns.lead}</p>
          {patterns.groups.map((g) => (
            <div key={g.title} className={styles.group}>
              <h3 className={styles.groupTitle}>{g.title}</h3>
              <ul className={styles.options}>
                {g.options.map((o) => (
                  <li
                    key={o.title}
                    className={`${styles.option} ${o.chosen ? styles.optionChosen : ""}`}
                  >
                    <p className={`${styles.tag} ${o.chosen ? styles.tagChosen : ""}`}>{o.tag}</p>
                    <h4 className={styles.optionTitle}>{o.title}</h4>
                    <p className={styles.optionBody}>{o.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className={styles.note}>{patterns.note}</p>
        </Chapter>

        {/* ── 03 Components and states ── */}
        <Chapter id="components" kicker={components.kicker} title={components.title}>
          <p className={styles.lead}>{components.lead}</p>
          <div className={styles.specimens}>
            <ToggleSpecimen />
            <PriceSpecimen />
            <TrendingSpecimen />
            <WelcomeSpecimen />
          </div>
        </Chapter>

        {/* ── 04 Tokens ── */}
        <Chapter id="tokens" kicker={tokens.kicker} title={tokens.title} tone="lilac">
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
                    <td data-label="Check">
                      {r.check}
                      {r.fail ? <span className={styles.fail}>{r.fail}</span> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Chapter>

        {/* ── 05 Accessibility ── */}
        <Chapter id="accessibility" kicker={accessibility.kicker} title={accessibility.title}>
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

        {/* ── 06 Results ── */}
        <Chapter id="results" kicker={results.kicker} title={results.title} tone="lilac">
          <div className={styles.resultGrid}>
            {results.stats.map((s, i) => (
              <div key={s.value}>
                <p className={`${styles.resultValue} ${i === 2 ? styles.resultInk : ""}`}>{s.value}</p>
                <p className={styles.resultLabel}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className={styles.principle}>
            <p className={styles.principleKicker}>{results.principleKicker}</p>
            <p className={styles.principleText}>{results.principle}</p>
          </div>
          <p className={styles.footnote}>{results.footnote}</p>
        </Chapter>

        {/* ── 07 Reflection ── */}
        <Chapter id="reflection" kicker={reflection.kicker} title={reflection.title}>
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
          <div className={styles.nextCard}>
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
