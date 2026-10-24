"use client";

import React from "react";
import Image from "next/image";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import {
  hero,
  sectionNav,
  problem,
  design,
  components,
  tokens,
  interactions,
  access,
  reflection,
} from "@/content/storiesByChildren";
import styles from "./storiesByChildren.module.css";

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

const audienceClass: Record<"Kids" | "Parents" | "Both", string> = {
  Kids: styles.audKids,
  Parents: styles.audParents,
  Both: styles.audBoth,
};

/* Placeholder story listing: genre chips, age filters and sorting above a grid. No photos, no names. */
function ListingMock() {
  return (
    <div className={styles.mock} aria-hidden="true">
      <p className={styles.mockTitle}>Adventure Stories</p>
      <div className={styles.chipRow}>
        {["Adventure", "Fantasy", "Animals", "Mystery"].map((g) => (
          <span key={g} className={styles.chip}>{g}</span>
        ))}
      </div>
      <div className={styles.filterRow}>
        <span className={styles.filterPill}>Age ▾</span>
        <span className={styles.filterPill}>Sort ▾</span>
      </div>
      <div className={styles.storyGrid}>
        {[
          { age: "Age 7–8", title: "[Story title]" },
          { age: "Age 10–12", title: "[Story title]" },
          { age: "Age 13–15", title: "[Story title]" },
        ].map((card) => (
          <div key={card.age} className={styles.storyCard}>
            <div className={styles.storyArt} />
            <span className={styles.storyBadge}>{card.age}</span>
            <p className={styles.storyName}>{card.title}</p>
            <p className={styles.storyBy}>by [first name]</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Placeholder contest cards: a child-facing art panel, and one dark panel with a single clear action. */
function ContestMock() {
  return (
    <div className={styles.mock} aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div key={i} className={styles.contestCard}>
          <div className={styles.contestArt} />
          <div className={styles.contestPanel}>
            <p className={styles.contestTitle}>Story Writing Contest</p>
            <p className={styles.contestMeta}>[date] · [venue]</p>
            <span className={styles.contestBtn}>Enrol Now</span>
            <p className={styles.contestLink}>View brief</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function StoriesByChildrenCaseStudy() {
  const counts = design.audiences.map((a) => ({
    label: a,
    n: design.sections.filter((s) => s.who === a).length,
  }));

  return (
    <CaseStudyLayout sections={sectionNav} hideBrief>
      {/* ── Hero ── */}
      <section className={styles.hero} aria-labelledby="sbc-title">
        <div className={styles.heroInner}>
          <ul className={styles.tags}>
            {hero.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <h1 id="sbc-title" className={styles.heroTitle}>
            {hero.titleLines.map((line) => (
              <span key={line} className={styles.heroLine}>
                <Marked text={line} />
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

          <div className={styles.frame}>
            <div className={styles.frameBar} aria-hidden="true">
              <span className={styles.frameDot} />
              <span className={styles.frameDot} />
              <span className={styles.frameDot} />
              <span className={styles.frameSite}>Stories by Children</span>
            </div>
            <div className={styles.frameBody}>
              <div className={styles.frameArt}>
                <Image
                  src={hero.cover.filename}
                  alt={hero.cover.alt}
                  width={hero.cover.width}
                  height={hero.cover.height}
                  sizes="(min-width: 800px) 360px, 70vw"
                  unoptimized
                  className={styles.frameImage}
                />
              </div>
              <div className={styles.frameText}>
                <p className={styles.frameHeading}>There Is A Story Inside All Of Us</p>
                <p className={styles.frameLead}>Placeholder text, shown for layout only.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 01 Problem & research ── */}
      <Chapter id="problem" kicker="01 · Problem & research" title={problem.title} tone="grey">
        <p className={styles.lead}>{problem.lead}</p>
        <p className={styles.body}>{problem.body}</p>

        <dl className={styles.stats}>
          {problem.stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <dt className={styles.statLabel}>{stat.label}</dt>
              <dd className={`${styles.statValue} ${stat.accent ? styles.statValueAccent : ""}`}>{stat.value}</dd>
            </div>
          ))}
        </dl>

        <ul className={styles.stickies}>
          {problem.stickies.map((s) => (
            <li key={s.text} className={`${styles.sticky} ${s.tone === "yellow" ? styles.stickyYellow : styles.stickyLilac}`}>
              <span className={styles.stickyWho}>{s.who}</span> {s.text}
            </li>
          ))}
        </ul>
      </Chapter>

      {/* ── 02 Design breakdown ── */}
      <Chapter id="design" kicker="02 · Design breakdown" title={design.title} tone="lilac">
        <p className={styles.lead}>{design.body}</p>

        <p className={styles.audienceCount}>
          {counts.map((c) => (
            <span key={c.label} className={`${styles.audienceChip} ${audienceClass[c.label]}`}>
              {c.label}: {c.n}
            </span>
          ))}
        </p>

        <ul className={styles.sectionGrid}>
          {design.sections.map((s) => (
            <li key={s.n} className={styles.sectionItem}>
              <span className={styles.sectionNum}>{s.n}</span>
              <span className={styles.sectionName}>{s.name}</span>
              <span className={`${styles.audience} ${audienceClass[s.who]}`}>{s.who}</span>
            </li>
          ))}
        </ul>
        <p className={styles.note}>{design.sectionsNote}</p>

        <div className={styles.twoUp}>
          <figure className={styles.figure}>
            <ListingMock />
            <figcaption className={styles.caption}>
              {design.listing.caption} <span className={styles.redacted}>{design.listing.note}</span>
            </figcaption>
          </figure>
          <figure className={styles.figure}>
            <ContestMock />
            <figcaption className={styles.caption}>
              {design.contest.caption} <span className={styles.redacted}>{design.contest.note}</span>
            </figcaption>
          </figure>
        </div>
      </Chapter>

      {/* ── 03 Components ── */}
      <Chapter id="components" kicker="03 · Components" title={components.title} tone="grey">
        <p className={styles.lead}>{components.body}</p>
        <p className={styles.note}>{components.setsNote}</p>

        <ul className={styles.setGrid}>
          {components.sets.map((set) => (
            <li key={set.name} className={styles.card}>
              <h3 className={styles.cardTitle}>{set.name}</h3>
              <p className={styles.setMeta}>{set.meta}</p>
              <p className={styles.cardBody}>{set.body}</p>
            </li>
          ))}
        </ul>

        <div className={styles.anatomy}>
          <h3 className={styles.h3}>{components.anatomy.title}</h3>
          <p className={styles.body}>{components.anatomy.body}</p>
          <div className={styles.anatomyLayout}>
            <figure className={styles.figure}>
              <div className={styles.storyCardBig} aria-hidden="true">
                <span className={`${styles.marker} ${styles.m1}`}>1</span>
                <span className={`${styles.marker} ${styles.m2}`}>2</span>
                <span className={`${styles.marker} ${styles.m3}`}>3</span>
                <span className={`${styles.marker} ${styles.m4}`}>4</span>
                <span className={`${styles.marker} ${styles.m5}`}>5</span>
                <div className={styles.bigArt}>
                  <span className={styles.bigBadge}>Age 7–8</span>
                </div>
                <div className={styles.bigAvatar}>AB</div>
                <p className={styles.bigGenre}>Adventure · 12 min read</p>
                <p className={styles.bigTitle}>[Story title]</p>
                <p className={styles.bigBy}>by [first name + initial]</p>
                <div className={styles.bigActions}>
                  <span className={styles.bigPrimary}>Read Now</span>
                  <span className={styles.bigSecondary}>Add to Reads</span>
                </div>
              </div>
              <figcaption className={styles.caption}>{components.anatomy.caption}</figcaption>
            </figure>
            <ol className={styles.callouts}>
              {components.anatomy.callouts.map((c) => (
                <li key={c.n} className={styles.callout}>
                  <span className={styles.calloutNum}>{c.n}</span>
                  <div>
                    <p className={styles.calloutName}>{c.name}</p>
                    <p className={styles.cardBody}>{c.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Chapter>

      {/* ── 04 Variables & tokens ── */}
      <Chapter id="tokens" kicker="04 · Variables & tokens" title={tokens.title} tone="white">
        <p className={styles.lead}>{tokens.body}</p>

        <div className={styles.layerGrid}>
          {tokens.layers.map((layer) => (
            <section key={layer.layer} className={styles.layer} aria-labelledby={`layer-${layer.layer}`}>
              <h3 id={`layer-${layer.layer}`} className={styles.layerTitle}>{layer.layer}</h3>
              <p className={styles.layerNote}>{layer.note}</p>
              <ul className={styles.tokenList}>
                {layer.items.map((t) => (
                  <li key={t.name} className={styles.tokenItem}>
                    <p className={styles.tokenName}>
                      {t.hex ? <span aria-hidden="true" className={styles.swatch} style={{ background: t.hex }} /> : null}
                      {t.name}
                      {t.hex ? <span className={styles.tokenHex}> {t.hex}</span> : null}
                    </p>
                    <p className={styles.tokenUse}>{t.use}</p>
                    {t.count ? <p className={styles.tokenCount}>{t.count}</p> : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <h3 className={styles.h3}>Type scale</h3>
        <dl className={styles.typeList}>
          {tokens.typeScale.map((t) => (
            <div key={t.name} className={styles.typeItem}>
              <dt className={styles.typeName}>{t.name}</dt>
              <dd className={styles.typeSpec}>{t.spec}</dd>
              <dd className={styles.typeSample}>{t.sample}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.note}>{tokens.typeNote}</p>
        <p className={styles.caption}>{tokens.caption}</p>
      </Chapter>

      {/* ── 05 Interaction patterns ── */}
      <Chapter id="interactions" kicker="05 · Interaction patterns" title={interactions.title} tone="lilac">
        <p className={styles.lead}>{interactions.body}</p>

        <ul className={styles.bars}>
          {interactions.rows.map((row) => (
            <li key={row.label} className={styles.bar}>
              <span className={styles.barLabel}>{row.label}</span>
              <span className={styles.barTrack} aria-hidden="true">
                <span className={styles.barFill} style={{ width: `${(row.count / 110) * 100}%` }} />
              </span>
              <span className={styles.barCount}>{row.count}</span>
            </li>
          ))}
        </ul>
        <p className={styles.barTotal}>
          Total: {interactions.rows.reduce((sum, r) => sum + r.count, 0)} interactions.
        </p>

        <div className={styles.decisionGrid}>
          {interactions.decisions.map((d) => (
            <article key={d.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{d.title}</h3>
              <p className={styles.cardBody}>{d.body}</p>
            </article>
          ))}
        </div>

        <div className={styles.threeCards}>
          {interactions.cards.map((c) => (
            <article key={c.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{c.title}</h3>
              <p className={styles.cardBody}>{c.body}</p>
            </article>
          ))}
        </div>
      </Chapter>

      {/* ── 06 Accessibility & content ── */}
      <Chapter id="access" kicker="06 · Accessibility & content" title={access.title} tone="grey">
        <p className={styles.lead}>{access.lead}</p>

        <div className={styles.twoCol}>
          {[access.kids, access.parents].map((group) => (
            <article key={group.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{group.title}</h3>
              <ul className={styles.bullets}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <h3 className={styles.h3}>{access.modelTitle}</h3>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className={styles.tableCaption}>{access.model.caption}</caption>
            <thead>
              <tr>
                {access.model.headers.map((h) => (
                  <th key={h} scope="col">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {access.model.rows.map((r) => (
                <tr key={r.field}>
                  <td data-label="Field" className={styles.strong}>{r.field}</td>
                  <td data-label="Example from the file">{r.example}</td>
                  <td data-label="Serves">{r.serves}</td>
                  <td data-label="Why">{r.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className={styles.h3}>{access.wcagTitle}</h3>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className={styles.tableCaption}>{access.wcag.caption}</caption>
            <thead>
              <tr>
                {access.wcag.headers.map((h) => (
                  <th key={h} scope="col">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {access.wcag.rows.map((r) => (
                <tr key={r.gap}>
                  <td data-label="Gap" className={styles.strong}>{r.gap}</td>
                  <td data-label="WCAG">{r.criterion}</td>
                  <td data-label="Fix">{r.fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.privacy}>
          <h3 className={styles.cardTitle}>{access.privacy.title}</h3>
          <p className={styles.cardBody}>{access.privacy.body}</p>
          <p className={styles.cardBody}>{access.privacy.signup}</p>
        </div>
      </Chapter>

      {/* ── 07 Reflection ── */}
      <Chapter id="reflection" kicker="07 · Outcome & reflection" title={reflection.title} tone="lilac">
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

        <p className={styles.siteLink}>
          <a href={hero.siteHref} target="_blank" rel="noreferrer">
            {hero.siteLabel}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </Chapter>
    </CaseStudyLayout>
  );
}
