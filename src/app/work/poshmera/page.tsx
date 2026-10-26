"use client";

import React from "react";
import Image from "next/image";
import { Lato } from "next/font/google";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import {
  hero,
  sectionNav,
  snapshot,
  shopping,
  find,
  decide,
  checkout,
  growth,
  components,
  platforms,
  accessibility,
  footer,
  type Screen,
  type Severity,
  type Stat,
} from "@/content/poshmera";
import styles from "./poshmera.module.css";

/* The app's typeface. It is applied to the specimens only, through the --font-lato variable. */
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

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

/* A phone frame around a design screen. */
function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className={styles.phone}>
      <div className={styles.screen}>
        <Image src={src} alt={alt} width={856} height={1852} unoptimized />
      </div>
    </div>
  );
}

/* A captioned screen, as used in the strips and the decision blocks. */
function Shot({ screen }: { screen: Screen }) {
  return (
    <figure>
      <Phone src={screen.src} alt={screen.alt} />
      <figcaption>
        <b>{screen.name}</b>
        {screen.caption}
      </figcaption>
    </figure>
  );
}

/* A row of captioned screens, scrolled sideways, as in the design. */
function Strip({ label, screens }: { label: string; screens: Screen[] }) {
  return (
    // A scrolling strip must be focusable so keyboard users can scroll it (axe: scrollable-region-focusable).
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div className={styles.strip} role="region" aria-label={label} tabIndex={0}>
      {screens.map((s) => (
        <Shot key={s.name} screen={s} />
      ))}
    </div>
  );
}

type Option = { tag: string; title: string; body: string; chosen: boolean };

/* Screens on the left, the options that led to the choice on the right. */
function Decision({ screens, options, hand }: { screens: Screen[]; options: Option[]; hand?: string }) {
  return (
    <div className={styles.decision}>
      <div className={styles.phones}>
        {screens.map((s) => (
          <Shot key={s.name} screen={s} />
        ))}
      </div>
      <div className={styles.why}>
        {options.map((o) => (
          <div key={o.title} className={`${styles.opt} ${o.chosen ? styles.pick : ""}`}>
            <span className={styles.tag}>{o.tag}</span>
            <h3>{o.title}</h3>
            <p>{o.body}</p>
          </div>
        ))}
        {hand ? <p className={styles.hand} aria-hidden="true">{hand}</p> : null}
      </div>
    </div>
  );
}

function Stats({ label, items }: { label: string; items: Stat[] }) {
  return (
    <ul className={styles.stats} aria-label={label}>
      {items.map((s) => (
        <li key={s.label}>
          <span className={`${styles.sV} ${s.hot ? styles.hot : ""}`}>{s.value}</span>
          <span className={styles.sL}>{s.label}</span>
        </li>
      ))}
    </ul>
  );
}

/* Below 640px each row stacks, and every cell is labelled with its column heading. */
function DataTable({
  caption,
  headers,
  rows,
}: {
  caption: string;
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className={styles.tblWrap}>
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td key={c} data-label={headers[c]}>
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

const SEVERITY_CLASS: Record<Severity, string> = {
  High: styles.sevHi,
  Medium: styles.sevMd,
  Low: styles.sevLo,
};

/* A specimen card. The stage is decorative: its ratios are stated in the text beside it, so it is hidden
   from assistive technology along with its static controls. */
function Spec({
  title,
  code,
  body,
  stage,
}: {
  title: string;
  code: string;
  body: string;
  stage: React.ReactNode;
}) {
  return (
    <div className={styles.spec}>
      <div className={styles.specStage} aria-hidden="true">
        {stage}
      </div>
      <div className={styles.specBody}>
        <h3>{title}</h3>
        <code>{code}</code>
        <p>{body}</p>
      </div>
    </div>
  );
}

export default function PoshmeraCaseStudy() {
  const label = (id: string) => sectionNav.find((s) => s.id === id)?.label ?? "";
  const [price, chip, notify] = components.specs;

  return (
    <CaseStudyLayout sections={sectionNav} hideBrief>
      <div className={`${styles.page} ${lato.variable}`}>
        {/* ── Hero ── */}
        <section className={styles.hero} aria-labelledby="pm-title">
          <ul className={styles.chipsDark} aria-label="About this case study">
            {hero.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <h1 id="pm-title" className={styles.heroTitle}>
            <Marked text={hero.title} />
          </h1>
          <p className={styles.heroSub}>{hero.lead}</p>
          <ul className={styles.meta}>
            {hero.meta.map((m) => (
              <li key={m.label}>
                <span className={styles.mL}>{m.label}</span>
                <span className={styles.mV}>{m.value}</span>
              </li>
            ))}
          </ul>
          <div className={styles.heroPhones}>
            {hero.phones.map((p) => (
              <Phone key={p.src} src={p.src} alt={p.alt} />
            ))}
          </div>
        </section>

        {/* ── 01 Snapshot ── */}
        <Chapter id="snapshot" kicker={label("snapshot")} title={snapshot.title} first>
          <p className={styles.body}>{snapshot.lead}</p>
          <Stats label="Research and results, as reported" items={snapshot.stats} />
          <p className={styles.small} style={{ marginTop: 14 }}>
            {snapshot.note}
          </p>
        </Chapter>

        {/* ── 02 Shopping path ── */}
        <Chapter id="shopping" kicker={label("shopping")} title={shopping.title} tone="dark">
          <p className={styles.body}>{shopping.lead}</p>
          <ol className={styles.flow} aria-label={shopping.pathLabel}>
            {shopping.path.map((step, i) => (
              <React.Fragment key={step}>
                {i > 0 ? (
                  <li className={styles.arrow} aria-hidden="true">
                    →
                  </li>
                ) : null}
                <li className={step === shopping.pathHighlight ? styles.hot : undefined}>{step}</li>
              </React.Fragment>
            ))}
          </ol>
          <Stats label="Prototype in numbers" items={shopping.stats} />
        </Chapter>

        {/* ── 03 Decision 1 ── */}
        <Chapter id="find" kicker={label("find")} title={find.title}>
          <Decision screens={find.screens} options={find.options} hand={find.hand} />
        </Chapter>

        {/* ── 04 Decision 2 ── */}
        <Chapter id="decide" kicker={label("decide")} title={decide.title} tone="tint">
          <p className={styles.body}>{decide.lead}</p>
          <Decision screens={decide.screens} options={decide.options} />
        </Chapter>

        {/* ── 05 Decision 3 ── */}
        <Chapter id="checkout" kicker={label("checkout")} title={checkout.title}>
          <p className={styles.body}>{checkout.lead}</p>
          <Strip label={checkout.stripLabel} screens={checkout.screens} />
          <div className={styles.grid2}>
            {checkout.cards.map((c) => (
              <div key={c.title} className={styles.card}>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </Chapter>

        {/* ── 06 Growth loops ── */}
        <Chapter id="growth" kicker={label("growth")} title={growth.title} tone="tint">
          <p className={styles.body}>{growth.lead}</p>
          <Strip label={growth.stripLabel} screens={growth.screens} />
        </Chapter>

        {/* ── 07 Components and tokens ── */}
        <Chapter id="components" kicker={label("components")} title={components.title}>
          <p className={styles.body}>{components.lead}</p>
          <div className={styles.specs}>
            <Spec
              {...price}
              stage={
                <>
                  <div>
                    <span className={styles.swatchPrice} />
                    <span className={styles.stateL}>
                      As designed · #FF0052 · <span className={styles.fail}>3.91:1</span>
                    </span>
                  </div>
                  <div>
                    <div className={styles.price}>
                      <span className={`${styles.now} ${styles.sale}`}>₹530</span>
                      <s>₹870</s>
                      <span className={styles.off}>39% OFF</span>
                    </div>
                    <span className={styles.stateL}>
                      Proposed · <span className={styles.pass}>5.22:1</span>
                    </span>
                  </div>
                </>
              }
            />
            <Spec
              {...chip}
              stage={
                <div className={styles.size}>
                  <span className={styles.chip}>S</span>
                  <span className={`${styles.chip} ${styles.chipOn}`}>M</span>
                  <span className={`${styles.chip} ${styles.chipOos}`}>L</span>
                </div>
              }
            />
            <Spec
              {...notify}
              stage={
                <>
                  <div>
                    <span className={`${styles.swatchBtn} ${styles.oOrange}`} />
                    <span className={styles.stateL}>
                      Orange, white label · <span className={styles.fail}>1.89:1</span>
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.swatchBtn} ${styles.oGreen}`} />
                    <span className={styles.stateL}>
                      Green, white label · <span className={styles.fail}>3.56:1</span>
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.btn} ${styles.black}`}>NOTIFY ME</span>
                    <span className={styles.stateL}>
                      Proposed · <span className={styles.pass}>21:1</span>
                    </span>
                  </div>
                </>
              }
            />
          </div>
          <DataTable
            caption={components.tokens.caption}
            headers={components.tokens.headers}
            rows={components.tokens.rows.map((r) => [
              <code key="token">{r.token}</code>,
              <React.Fragment key="value">
                {r.swatch ? <span className={styles.sw} aria-hidden="true" style={{ background: r.swatch }} /> : null}
                {r.value}
              </React.Fragment>,
              r.replaces,
              r.check,
            ])}
          />
        </Chapter>

        {/* ── 08 iOS and Android ── */}
        <Chapter id="platforms" kicker={label("platforms")} title={platforms.title} tone="tint">
          <p className={styles.body}>{platforms.lead}</p>
          <DataTable caption={platforms.caption} headers={platforms.headers} rows={platforms.rows} />
        </Chapter>

        {/* ── 09 Accessibility audit ── */}
        <Chapter id="accessibility" kicker={label("accessibility")} title={accessibility.title}>
          <Stats label="Audit numbers" items={accessibility.stats} />
          <DataTable
            caption={accessibility.caption}
            headers={accessibility.headers}
            rows={accessibility.rows.map((r) => [
              r.finding,
              r.criterion,
              <span key="severity" className={`${styles.sev} ${SEVERITY_CLASS[r.severity]}`}>
                {r.severity}
              </span>,
              r.fix,
            ])}
          />
          <div className={styles.grid2}>
            {accessibility.cards.map((c) => (
              <div key={c.title} className={`${styles.card} ${c.accent ? styles.cardAccent : ""}`}>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </Chapter>

        <div className={styles.foot}>
          <div className={styles.container}>
            <p className={styles.small}>{footer}</p>
          </div>
        </div>
      </div>
    </CaseStudyLayout>
  );
}
