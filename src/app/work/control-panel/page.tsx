"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import {
  hero,
  sectionNav,
  problem,
  structure,
  dashboards,
  pricing,
  records,
  components,
  accessibility,
  reflection,
  footer,
  type Screen,
  type Severity,
  type Stat,
} from "@/content/controlPanel";
import styles from "./controlPanel.module.css";

/* The app's typeface. It is applied to the calculator and the specimens only, through the --font-poppins variable. */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
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

/* A desktop screen in a laptop frame. */
function Laptop({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className={styles.laptop}>
      <div className={styles.bezel}>
        <div className={styles.screen}>
          <Image src={src} alt={alt} width={1512} height={977} unoptimized />
        </div>
      </div>
      <div className={styles.base} aria-hidden="true" />
    </figure>
  );
}

/* A captioned screen in a rounded frame, placed in a grid. */
function Shot({ screen }: { screen: Screen }) {
  return (
    <figure className={styles.shot}>
      <div className={styles.frame}>
        <Image src={screen.src} alt={screen.alt} width={1512} height={977} unoptimized />
      </div>
      <figcaption>
        <b>{screen.name}</b>
        {screen.caption}
      </figcaption>
    </figure>
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

/* The calculator is the one interactive part of the page. Values are clamped to 0 and up, and percentages to the
   design's 90% maximum. Each price is the MRP less its percentage, as the design's own rule says. */
function clamp(value: string, max?: number) {
  const n = Number.parseFloat(value);
  if (Number.isNaN(n) || n < 0) return 0;
  return max === undefined ? n : Math.min(n, max);
}

const priceAfter = (mrp: number, percent: number) =>
  Math.round(mrp * (1 - percent / 100)).toLocaleString("en-IN");

const CHANNELS = [
  { key: "online", label: "Online %", output: "Online price" },
  { key: "retail", label: "Retail %", output: "Retail price" },
  { key: "gym", label: "Gym %", output: "Gym / trainer price" },
] as const;

function PriceCalculator({
  defaults,
  max,
}: {
  defaults: { mrp: number; online: number; retail: number; gym: number };
  max: number;
}) {
  const [mrp, setMrp] = useState(defaults.mrp);
  const [rates, setRates] = useState({ online: defaults.online, retail: defaults.retail, gym: defaults.gym });

  return (
    <form className={styles.calc} aria-labelledby="calc-h" onSubmit={(e) => e.preventDefault()}>
      <fieldset className={styles.calcFields}>
        <legend id="calc-h">Price calculator</legend>
        <label>
          MRP in rupees
          <input
            type="number"
            inputMode="numeric"
            min={0}
            step={10}
            value={mrp}
            onChange={(e) => setMrp(clamp(e.target.value))}
          />
        </label>
        <div className={styles.row}>
          {CHANNELS.map((c) => (
            <label key={c.key}>
              {c.label}
              <input
                type="number"
                min={0}
                max={max}
                value={rates[c.key]}
                onChange={(e) => setRates((r) => ({ ...r, [c.key]: clamp(e.target.value, max) }))}
              />
            </label>
          ))}
        </div>
      </fieldset>
      <div className={styles.out} aria-live="polite">
        <div className={`${styles.o} ${styles.main}`}>
          <span>MRP</span>
          <b>₹{mrp.toLocaleString("en-IN")}</b>
        </div>
        {CHANNELS.map((c) => (
          <div key={c.key} className={styles.o}>
            <span>{c.output}</span>
            <b>₹{priceAfter(mrp, rates[c.key])}</b>
          </div>
        ))}
      </div>
    </form>
  );
}

export default function ControlPanelCaseStudy() {
  const label = (id: string) => sectionNav.find((s) => s.id === id)?.label ?? "";
  const TILT = [styles.r1, styles.r2, styles.r3];

  return (
    <CaseStudyLayout sections={sectionNav} hideBrief>
      <div className={`${styles.page} ${poppins.variable}`}>
        {/* ── Hero ── */}
        <header className={styles.hero} aria-labelledby="cp-title">
          <ul className={styles.chipsDark} aria-label="About this case study">
            {hero.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <h1 id="cp-title" className={styles.heroTitle}>
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
          <div className={styles.heroLaptop}>
            <Laptop src={hero.laptop.src} alt={hero.laptop.alt} />
          </div>
        </header>

        {/* ── 01 Problem ── */}
        <Chapter id="problem" kicker={label("problem")} title={problem.title} first>
          <p className={styles.lead}>{problem.lead}</p>
          <ul className={styles.stickies} aria-label="What the tool had to solve">
            {problem.stickies.map((s, i) => (
              <li
                key={s.title}
                className={`${styles.sticky} ${i === 1 ? styles.lilac : ""} ${TILT[i]}`}
              >
                <b>{s.title}</b>
                {s.body}
              </li>
            ))}
          </ul>
        </Chapter>

        {/* ── 02 Structure ── */}
        <Chapter id="structure" kicker={label("structure")} title={structure.title} tone="dark">
          <p className={styles.body}>{structure.body}</p>
          <ol className={styles.flow} aria-label={structure.pathLabel}>
            {structure.path.map((step, i) => (
              <React.Fragment key={step}>
                {i > 0 ? (
                  <li className={styles.arrow} aria-hidden="true">
                    →
                  </li>
                ) : null}
                <li className={step === structure.pathHighlight ? styles.hot : undefined}>{step}</li>
              </React.Fragment>
            ))}
          </ol>
          <Stats label="Prototype in numbers" items={structure.stats} />
        </Chapter>

        {/* ── 03 Role-based dashboards ── */}
        <Chapter id="dashboards" kicker={label("dashboards")} title={dashboards.title}>
          <p className={styles.body}>{dashboards.body}</p>
          <div className={styles.shots}>
            {dashboards.screens.map((s) => (
              <Shot key={s.name} screen={s} />
            ))}
          </div>
        </Chapter>

        {/* ── 04 Stock and pricing ── */}
        <Chapter id="pricing" kicker={label("pricing")} title={pricing.title} tone="tint">
          <p className={styles.body}>{pricing.body}</p>
          <div className={styles.shots}>
            {pricing.screens.map((s) => (
              <Shot key={s.name} screen={s} />
            ))}
          </div>
          <h3 className={styles.h3}>{pricing.calculator.title}</h3>
          <p className={styles.body}>{pricing.calculator.body}</p>
          <PriceCalculator defaults={pricing.calculator.defaults} max={pricing.calculator.max} />
          <p className={styles.small} style={{ marginTop: 14 }}>
            {pricing.calculator.note}
          </p>
        </Chapter>

        {/* ── 05 Records, quotes and access ── */}
        <Chapter id="records" kicker={label("records")} title={records.title}>
          <p className={styles.body}>{records.body}</p>
          <div className={styles.shots}>
            {records.screens.map((s) => (
              <Shot key={s.name} screen={s} />
            ))}
          </div>
        </Chapter>

        {/* ── 06 Components ── */}
        <Chapter id="components" kicker={label("components")} title={components.title} tone="tint">
          <p className={styles.body}>{components.body}</p>
          <div className={styles.specs}>
            <Spec
              {...components.specs.status}
              stage={
                <>
                  <div>
                    <span className={styles.swatchGreen} />
                    <span className={styles.swatchOrange} />
                    <span className={styles.stateL}>
                      As designed · <span className={styles.fail}>1.69:1</span> · <span className={styles.fail}>2.63:1</span>
                    </span>
                  </div>
                  <div className={styles.chips}>
                    <span className={`${styles.chip} ${styles.chipIn}`}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12l5 5 9-10" />
                      </svg>
                      Available · 03/09/2022
                    </span>
                    <span className={`${styles.chip} ${styles.chipEx}`}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 7v6M12 17h.01" />
                        <circle cx="12" cy="12" r="9" />
                      </svg>
                      Expired · 03/09/2022
                    </span>
                    <span className={styles.stateL}>
                      Suggested · <span className={styles.pass}>5.75:1 and 6.48:1</span>
                    </span>
                  </div>
                </>
              }
            />
            <Spec
              {...components.specs.sidebar}
              stage={
                <>
                  <div>
                    <span className={styles.swatchRail} />
                    <span className={styles.stateL}>
                      As designed · white on teal · <span className={styles.fail}>1.65:1</span>
                    </span>
                  </div>
                  <div>
                    <div className={styles.side}>
                      <span className={`${styles.sideItem} ${styles.sideActive}`}>Dashboard</span>
                      <span className={styles.sideItem}>Inventory Management</span>
                      <span className={styles.sideItem}>Account Reports</span>
                    </div>
                    <span className={styles.stateL}>
                      Suggested · <span className={styles.pass}>10.3:1 and up</span>
                    </span>
                  </div>
                </>
              }
            />
            <Spec
              {...components.specs.toolbar}
              stage={
                <div className={styles.tbtools}>
                  <span className={styles.tbBtn}>Copy</span>
                  <span className={styles.tbBtn}>CSV</span>
                  <span className={styles.tbBtn}>Excel</span>
                  <span className={styles.tbBtn}>PDF</span>
                  <span className={styles.tbBtn}>Print</span>
                  <span className={`${styles.tbBtn} ${styles.primary}`}>Download report</span>
                </div>
              }
            />
          </div>
        </Chapter>

        {/* ── 07 Accessibility audit ── */}
        <Chapter id="accessibility" kicker={label("accessibility")} title={accessibility.title}>
          <p className={styles.body}>{accessibility.body}</p>
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
        </Chapter>

        {/* ── 08 Reflection ── */}
        <Chapter id="reflection" kicker={label("reflection")} title={reflection.title} tone="tint">
          <div className={styles.grid3}>
            {reflection.cards.map((c) => (
              <div key={c.title} className={`${styles.card} ${c.accent ? styles.cardAccent : ""}`}>
                <span className={styles.k}>{c.kicker}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
          <div className={styles.next}>
            <h3>{reflection.validateTitle}</h3>
            <ol>
              {reflection.validate.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
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
