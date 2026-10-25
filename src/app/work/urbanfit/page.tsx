"use client";

import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import {
  hero,
  sectionNav,
  fits,
  brief,
  architecture,
  setup,
  home,
  trackers,
  experts,
  interaction,
  components,
  tokens,
  platforms,
  accessibility,
  reflection,
} from "@/content/urbanfit";
import styles from "./urbanfit.module.css";

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

type Tone = "grey" | "lilac" | "ink";

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

/* A table whose first column is strong. Each cell is labelled for the stacked layout below 640 px. */
function DataTable({
  caption,
  head,
  rows,
  firstClass = styles.strong,
}: {
  caption: string;
  head: string[];
  rows: React.ReactNode[][];
  firstClass?: string;
}) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <caption className={styles.caption}>{caption}</caption>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, r) => (
            <tr key={r}>
              {cells.map((cell, c) => (
                <td key={c} data-label={head[c]} className={c === 0 ? firstClass : undefined}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Captioned screens. The design's screens are not reproduced; each is described by its caption. */
function Screens({ items }: { items: { n?: string; name: string; caption: string }[] }) {
  return (
    <ul className={styles.screens}>
      {items.map((s) => (
        <li key={s.name} className={styles.screen}>
          {s.n ? <p className={styles.screenNum}>{s.n}</p> : null}
          <h3 className={styles.screenName}>{s.name}</h3>
          <p className={styles.screenCaption}>{s.caption}</p>
        </li>
      ))}
    </ul>
  );
}

/* The specimens are static recreations. Their switch, field, stepper and bar are styled to match the
   design but are not focusable, so no fake controls reach the accessibility tree. */
function SpecimenCard({
  title,
  tag,
  body,
  children,
}: {
  title: string;
  tag: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <article className={styles.specimen}>
      <div className={styles.specimenStage}>{children}</div>
      <div className={styles.specimenBody}>
        <h3 className={styles.specimenTitle}>{title}</h3>
        <p className={styles.specimenTag}>{tag}</p>
        <p className={styles.specimenText}>{body}</p>
      </div>
    </article>
  );
}

const RING_RADIUS = 48;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const RING_SHARE = 2860 / 10000;

function SpecimenStage({ kind }: { kind: "day" | "field" | "stepper" | "ring" }) {
  switch (kind) {
    case "day":
      return (
        <div className={styles.stateRow}>
          {[
            { n: "23", cls: styles.dayToday, caption: "TODAY" },
            { n: "24", cls: "", caption: "ON" },
            { n: "25", cls: styles.dayOff, caption: "OFF" },
          ].map((d) => (
            <div key={d.caption} className={styles.dayCell}>
              <span className={`${styles.dayChip} ${d.cls}`}>{d.n}</span>
              <p className={styles.stateCaption}>{d.caption}</p>
            </div>
          ))}
        </div>
      );
    case "field":
      return (
        <div className={styles.fieldBox}>
          <p className={styles.fieldLabel}>Phone / Email</p>
          <span className={styles.fieldInput}>Enter phone or email</span>
          <p className={styles.fieldLabel}>Password</p>
          <span className={`${styles.fieldInput} ${styles.fieldFocus}`}>••••••••</span>
        </div>
      );
    case "stepper":
      return (
        <>
          <div className={styles.segment}>
            <span>Feet</span>
            <span className={styles.segmentOn}>Centimetre</span>
          </div>
          <div className={styles.stepper}>
            <span className={styles.stepperBtn} aria-hidden="true">−</span>
            <span>10000</span>
            <span className={styles.stepperBtn} aria-hidden="true">+</span>
          </div>
        </>
      );
    case "ring":
      return (
        <>
          <svg className={styles.ring} viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r={RING_RADIUS} fill="none" stroke="var(--color-bg)" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r={RING_RADIUS}
              fill="none"
              stroke="var(--color-accent-text)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${RING_CIRCUMFERENCE * RING_SHARE} ${RING_CIRCUMFERENCE}`}
              transform="rotate(-90 60 60)"
            />
            <text x="60" y="66" textAnchor="middle" fontSize="20" fontWeight="800" fill="var(--color-text)">2860</text>
          </svg>
          <p className={styles.ringText}>{components.ringText}</p>
        </>
      );
  }
}

export default function UrbanfitCaseStudy() {
  const label = (id: string) => sectionNav.find((s) => s.id === id)?.label ?? "";
  const bar = components.bottomBar;

  return (
    <CaseStudyLayout sections={sectionNav} hideBrief>
      <div className={styles.page}>
        {/* ── Hero ── */}
        <section className={styles.hero} aria-labelledby="ua-title">
          <div className={styles.heroInner}>
            <ul className={styles.tags}>
              {hero.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <h1 id="ua-title" className={styles.heroTitle}>
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
          </div>
        </section>

        {/* ── 00 Where this fits ── */}
        <Chapter id="fits" kicker={label("fits")} title={fits.title}>
          <p className={styles.lead}>{fits.lead}</p>
          <ul className={styles.grid4}>
            {fits.cards.map((c) => (
              <li key={c.title} className={`${styles.card} ${c.current ? styles.cardCurrent : ""}`}>
                <p className={`${styles.tag} ${c.current ? styles.tagCurrent : ""}`}>{c.tag}</p>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardBody}>{c.body}</p>
              </li>
            ))}
          </ul>
        </Chapter>

        {/* ── 01 The brief ── */}
        <Chapter id="brief" kicker={label("brief")} title={brief.title} tone="lilac">
          <p className={styles.lead}>{brief.lead}</p>
          <ul className={styles.stickies}>
            {brief.stickies.map((s) => (
              <li
                key={s.title}
                className={`${styles.sticky} ${s.tone === "yellow" ? styles.stickyYellow : styles.stickyLilac}`}
              >
                <h3 className={styles.stickyTitle}>{s.title}</h3>
                <p className={styles.stickyBody}>{s.body}</p>
              </li>
            ))}
          </ul>
          <div className={styles.stats}>
            {brief.stats.map((s) => (
              <div key={s.label}>
                <p className={styles.statValue}>{s.value}</p>
                <p className={styles.statLabel}>{s.label}</p>
              </div>
            ))}
          </div>
        </Chapter>

        {/* ── 02 Information architecture ── */}
        <Chapter id="architecture" kicker={label("architecture")} title={architecture.title}>
          <p className={styles.lead}>{architecture.lead}</p>
          <ul className={`${styles.grid4} ${styles.tabRow}`}>
            {architecture.tabs.map((name, i) => (
              <li key={name} className={styles.tab}>
                <p className={styles.tabLabel}>Tab {i + 1}</p>
                <p className={styles.tabName}>{name}</p>
              </li>
            ))}
          </ul>
          <ul className={styles.grid4}>
            {architecture.flows.map((f) => (
              <li key={f.name} className={`${styles.card} ${styles.flowCard}`}>
                <h3 className={styles.flowName}>{f.name}</h3>
                <p className={styles.flowBody}>{f.body}</p>
                <p className={styles.flowNote}>{f.note}</p>
              </li>
            ))}
          </ul>
        </Chapter>

        {/* ── 03 Flow 1: plan setup ── */}
        <Chapter id="setup" kicker={label("setup")} title={setup.title} tone="lilac">
          <p className={styles.lead}>{setup.lead}</p>
          <Screens items={setup.screens} />
          <h3 className={styles.subhead}>{setup.decisionsTitle}</h3>
          <ul className={styles.grid3}>
            {setup.decisions.map((d) => (
              <li key={d.title} className={styles.card}>
                <h4 className={styles.cardTitle}>{d.title}</h4>
                <p className={styles.cardBody}>{d.body}</p>
              </li>
            ))}
          </ul>
        </Chapter>

        {/* ── 04 Flow 2: home ── */}
        <Chapter id="home" kicker={label("home")} title={home.title}>
          <p className={styles.lead}>{home.lead}</p>
          <DataTable caption={home.caption} head={["State", "My Plan block"]} rows={home.rows.map((r) => [r.state, r.block])} />
          <p className={styles.note}>{home.note}</p>
          <Screens items={home.screens} />
        </Chapter>

        {/* ── 05 Flow 3: trackers ── */}
        <Chapter id="trackers" kicker={label("trackers")} title={trackers.title} tone="lilac">
          <p className={styles.lead}>{trackers.lead}</p>
          <Screens items={trackers.screens} />
          <div className={styles.twoCol}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>{trackers.anatomyTitle}</h3>
              <ol className={styles.anatomy}>
                {trackers.anatomy.map((a) => (
                  <li key={a.label}>
                    <strong>{a.label}</strong> {a.text}
                  </li>
                ))}
              </ol>
            </div>
            <div className={`${styles.card} ${styles.quiet}`}>
              <h3 className={styles.cardTitle}>{trackers.whyTitle}</h3>
              <p className={styles.cardBody}>{trackers.whyBody}</p>
            </div>
          </div>
        </Chapter>

        {/* ── 06 Flow 4: experts, meals and workouts ── */}
        <Chapter id="experts" kicker={label("experts")} title={experts.title}>
          <p className={styles.lead}>{experts.lead}</p>
          <Screens items={experts.screens} />
          <p className={styles.note}>{experts.note}</p>
        </Chapter>

        {/* ── 07 Interaction model (dark band) ── */}
        <Chapter id="interaction" kicker={label("interaction")} title={interaction.title} tone="ink">
          <p className={styles.lead}>{interaction.lead}</p>
          <div className={styles.stats}>
            {interaction.stats.map((s) => (
              <div key={s.label}>
                <p className={styles.statValue}>{s.value}</p>
                <p className={styles.statLabel}>{s.label}</p>
              </div>
            ))}
          </div>
          <ol className={styles.chain}>
            {interaction.chain.map((step, i) => (
              <React.Fragment key={step}>
                <li>{step}</li>
                {i < interaction.chain.length - 1 ? (
                  <span className={styles.chainArrow} aria-hidden="true">→</span>
                ) : null}
              </React.Fragment>
            ))}
          </ol>
          <DataTable
            caption={interaction.caption}
            head={["In the prototype", "Used for", "iOS", "Android"]}
            rows={interaction.rows.map((r) => [r.kind, r.use, r.ios, r.android])}
          />
        </Chapter>

        {/* ── 08 Components ── */}
        <Chapter id="components" kicker={label("components")} title={components.title} tone="lilac">
          <p className={styles.lead}>{components.lead}</p>
          <div className={styles.specimens}>
            {components.specimens.map((s) => (
              <SpecimenCard key={s.title} title={s.title} tag={s.tag} body={s.body}>
                <SpecimenStage kind={s.kind} />
              </SpecimenCard>
            ))}
          </div>
          <section className={styles.bottomBar} aria-labelledby="bottom-bar">
            <div className={styles.bottomBarStage}>
              {[
                { label: bar.asDesigned, designed: true },
                { label: bar.suggested, designed: false },
              ].map((row) => (
                <div key={row.label} className={styles.barRow} aria-hidden={row.designed ? true : undefined}>
                  <p className={styles.barLabel}>{row.label}</p>
                  <div className={styles.bar}>
                    {bar.tabs.map((tab, i) => {
                      if (i !== bar.activeIndex) {
                        return (
                          <span key={tab} className={styles.barItem}>
                            {tab}
                          </span>
                        );
                      }
                      // As designed, the active tab is a black label. It is drawn as a block with no word,
                      // so the contrast of 3.2:1 is described in the text rather than measured as a failure.
                      return row.designed ? (
                        <span key={tab} className={styles.barSwatch} />
                      ) : (
                        <span key={tab} className={`${styles.barItem} ${styles.barActiveWhite}`}>
                          {tab}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.specimenBody}>
              <h3 id="bottom-bar" className={styles.specimenTitle}>{bar.title}</h3>
              <p className={styles.specimenTag}>{bar.tag}</p>
              <p className={styles.specimenText}>{bar.body}</p>
            </div>
          </section>
        </Chapter>

        {/* ── 09 Variables and tokens ── */}
        <Chapter id="tokens" kicker={label("tokens")} title={tokens.title} tone="lilac">
          <p className={styles.lead}>{tokens.lead}</p>
          <DataTable
            caption={tokens.collectionsCaption}
            head={["Collection", "Variables", "Examples"]}
            rows={tokens.collections.map((c) => [c.name, c.count, <span key="e" className={styles.mono}>{c.examples}</span>])}
          />
          <h3 className={styles.subhead}>{tokens.findingsTitle}</h3>
          <ul className={styles.grid3}>
            {tokens.findings.map((f) => (
              <li key={f.n} className={styles.card}>
                <p className={styles.screenNum}>{f.n}</p>
                <h4 className={styles.cardTitle}>{f.title}</h4>
                <p className={styles.cardBody}>{f.body}</p>
              </li>
            ))}
          </ul>
          <div className={styles.modeTable}>
            <DataTable
              caption={tokens.modeCaption}
              head={["Semantic token", "Default mode (today)", "Studio mode (proposed)", "Check on white"]}
              rows={tokens.modeRows.map((r) => [
                <span key="t" className={styles.mono}>{r.token}</span>,
                r.today,
                r.proposed,
                r.check,
              ])}
              firstClass=""
            />
          </div>
          <p className={styles.note}>{tokens.footnote}</p>
        </Chapter>

        {/* ── 10 iOS and Android ── */}
        <Chapter id="platforms" kicker={label("platforms")} title={platforms.title}>
          <p className={styles.lead}>{platforms.lead}</p>
          <DataTable
            caption={platforms.caption}
            head={["Element", "In the design", "iOS", "Android"]}
            rows={platforms.rows.map((r) => [r.element, r.design, r.ios, r.android])}
          />
          <p className={styles.note}>{platforms.footnote}</p>
        </Chapter>

        {/* ── 11 Accessibility audit ── */}
        <Chapter id="accessibility" kicker={label("accessibility")} title={accessibility.title} tone="lilac">
          <p className={styles.lead}>{accessibility.lead}</p>
          <div className={styles.stats}>
            {accessibility.stats.map((s) => (
              <div key={s.label}>
                <p className={styles.statValue}>{s.value}</p>
                <p className={styles.statLabel}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className={styles.findings}>
            <DataTable
              caption={accessibility.caption}
              head={["Finding", "WCAG 2.2", "Severity", "Fix"]}
              rows={accessibility.rows.map((r) => [
                r.finding,
                r.criterion,
                <span
                  key="s"
                  className={`${styles.pill} ${
                    r.severity === "High" ? styles.pillHigh : r.severity === "Medium" ? styles.pillMedium : styles.pillLow
                  }`}
                >
                  {r.severity}
                </span>,
                r.fix,
              ])}
              firstClass=""
            />
          </div>
          <h3 className={styles.subhead}>{accessibility.worksTitle}</h3>
          <ul className={styles.grid4}>
            {accessibility.works.map((w) => (
              <li key={w.title} className={styles.card}>
                <h4 className={styles.cardTitle}>{w.title}</h4>
                <p className={styles.cardBody}>{w.body}</p>
              </li>
            ))}
          </ul>
        </Chapter>

        {/* ── 12 Reflection ── */}
        <Chapter id="reflection" kicker={label("reflection")} title={reflection.title}>
          <ul className={styles.grid3}>
            {reflection.cards.map((c) => (
              <li key={c.title} className={`${styles.card} ${c.tone === "lilac" ? styles.cardLilac : ""}`}>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardBody}>{c.body}</p>
              </li>
            ))}
          </ul>
          <div className={styles.validate}>
            <h3 className={styles.validateTitle}>{reflection.validateTitle}</h3>
            <ol className={styles.validateList}>
              {reflection.validate.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
          <p className={styles.note}>{reflection.credit}</p>
        </Chapter>
      </div>
    </CaseStudyLayout>
  );
}
