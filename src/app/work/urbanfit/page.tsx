"use client";

import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
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
  type Screen,
} from "@/content/urbanfit";
import styles from "./urbanfit.module.css";

/* The app's typeface. It is applied to the specimens only, through the --font-poppins variable. */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

type Tone = "tint" | "dark" | undefined;

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

/* A phone frame around a design screen. A scrolling screen is a labelled region that keyboard users
   can reach. A screen with an overlay shows a sheet over it, as the goal sheet does. */
function Phone({
  src,
  alt,
  label,
  scroll,
  overlay,
}: {
  src: string;
  alt: string;
  label?: string;
  scroll?: boolean;
  overlay?: { src: string; alt: string };
}) {
  const region = scroll ? { tabIndex: 0, role: "region" as const, "aria-label": `${label ?? "Screen"}, scrollable` } : {};
  return (
    <div className={styles.phone}>
      <div className={`${styles.screen} ${scroll ? styles.screenScroll : ""}`} {...region}>
        <Image src={src} alt={alt} width={856} height={1852} unoptimized />
        {overlay ? (
          <>
            <div className={styles.scrim} />
            <div className={styles.sheet}>
              <Image src={overlay.src} alt={overlay.alt} width={856} height={396} unoptimized />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

/* A row of captioned screens, scrolled sideways, as in the design. */
function Strip({
  label,
  screens,
  numbered,
}: {
  label: string;
  screens: Screen[];
  numbered?: boolean;
}) {
  return (
    // A scrolling strip must be focusable so keyboard users can scroll it (axe: scrollable-region-focusable).
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div className={styles.strip} role="region" aria-label={label} tabIndex={0}>
      {screens.map((s, i) => (
        <figure key={s.name}>
          <Phone src={s.src} alt={s.alt} label={s.name} scroll={s.scroll} overlay={s.overlay} />
          <figcaption>
            {numbered ? <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span> : null}
            <b>{s.name}</b>
            {s.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

const RING_R = 50;
const RING_CIRC = 2 * Math.PI * RING_R;
const RING_DASH = `${RING_CIRC * 0.286} ${RING_CIRC}`;

/* The four bottom-bar icons, as the design draws them. */
const NAV_ICONS = [
  <path key="home" d="M3 11l9-8 9 8v10H3z" />,
  <path key="food" d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M16 3c-2 2-2 6 0 8v10" />,
  <g key="profile"><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></g>,
  <path key="fit" d="M2 12h3M19 12h3M5 8v8M19 8v8M8 6v12M16 6v12M8 12h8" />,
];

function BottomBar({ variant }: { variant: "designed" | "suggested" }) {
  const designed = variant === "designed";
  return (
    <nav className={`${styles.nav} ${designed ? "" : styles.navFix}`} aria-label={designed ? "Bottom bar as designed" : "Bottom bar, suggested fix"}>
      {components.barTabs.map((tab, i) => {
        const active = i === components.barTabs.length - 1;
        return (
          <span
            key={tab}
            data-current={active ? "true" : undefined}
            className={designed && active ? styles.navActiveDesigned : undefined}
            aria-hidden={designed && active ? true : undefined}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">{NAV_ICONS[i]}</svg>
            {designed && active ? null : tab}
          </span>
        );
      })}
    </nav>
  );
}

export default function UrbanfitCaseStudy() {
  const label = (id: string) => sectionNav.find((s) => s.id === id)?.label ?? "";

  return (
    <CaseStudyLayout sections={sectionNav} hideBrief>
      <div className={`${styles.page} ${poppins.variable}`}>
        {/* ── Hero ── */}
        <section className={styles.hero} aria-labelledby="ua-title">
          <ul className={styles.chipsDark} aria-label="About this chapter">
            {hero.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <h1 id="ua-title" className={styles.heroTitle}>
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

        {/* ── 00 Where this fits ── */}
        <Chapter id="fits" kicker={label("fits")} title={fits.title} first>
          <p className={styles.body}>{fits.lead}</p>
          <div className={styles.grid3}>
            {fits.cards.map((c) => (
              <div key={c.title} className={`${styles.card} ${c.here ? styles.cardHere : ""}`}>
                <span className={styles.k}>{c.tag}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </Chapter>

        {/* ── 01 The brief ── */}
        <Chapter id="brief" kicker={label("brief")} title={brief.title} tone="tint">
          <p className={styles.lead}>{brief.lead}</p>
          <ul className={styles.stickies} aria-label="Design bets">
            {brief.stickies.map((s, i) => (
              <li
                key={s.title}
                className={`${styles.sticky} ${s.tone === "lilac" ? styles.stickyLilac : ""} ${[styles.r1, styles.r2, styles.r3][i]}`}
              >
                <b>{s.title}</b>
                {s.body}
              </li>
            ))}
          </ul>
          <ul className={styles.stats} aria-label="The design file in numbers">
            {brief.stats.map((s) => (
              <li key={s.label}>
                <span className={`${styles.sV} ${s.hot ? styles.hot : ""}`}>{s.value}</span>
                <span className={styles.sL}>{s.label}</span>
              </li>
            ))}
          </ul>
        </Chapter>

        {/* ── 02 Information architecture ── */}
        <Chapter id="architecture" kicker={label("architecture")} title={architecture.title}>
          <p className={styles.body}>{architecture.lead}</p>
          <div className={styles.ia} role="group" aria-label="App structure">
            <div className={styles.iaNav}>
              {architecture.tabs.map((t, i) => (
                <div key={t} className={styles.iaTab}>
                  <span>Tab {i + 1}</span>
                  {t}
                </div>
              ))}
            </div>
            <div className={styles.iaGroups}>
              {architecture.groups.map((g) => (
                <div key={g.name} className={styles.iaG}>
                  <h4>{g.name}</h4>
                  <p>{g.body}</p>
                  <span className={styles.from}>{g.from}</span>
                </div>
              ))}
            </div>
          </div>
        </Chapter>

        {/* ── 03 Flow 1: plan setup ── */}
        <Chapter id="setup" kicker={label("setup")} title={setup.title} tone="tint">
          <p className={styles.body}>{setup.lead}</p>
          <Strip label={setup.stripLabel} screens={setup.screens} numbered />
          <h3 className={styles.h3}>{setup.decisionsTitle}</h3>
          <ul className={styles.notes}>
            {setup.decisions.map((d) => (
              <li key={d.title}>
                <b>{d.title}</b>
                {d.body}
              </li>
            ))}
          </ul>
        </Chapter>

        {/* ── 04 Flow 2: home ── */}
        <Chapter id="home" kicker={label("home")} title={home.title}>
          <p className={styles.body}>{home.lead}</p>
          <div className={styles.compare}>
            {home.screens.map((s) => (
              <figure key={s.name}>
                <Phone src={s.src} alt={s.alt} label={s.name} scroll={s.scroll} />
                <figcaption>
                  <b>{s.name}</b>
                  {s.caption}
                </figcaption>
              </figure>
            ))}
            <div className={styles.side}>
              <div className={`${styles.tblWrap} ${styles.tblCompact}`}>
                <table>
                  <caption>{home.caption}</caption>
                  <thead>
                    <tr>
                      <th scope="col">State</th>
                      <th scope="col">My Plan block</th>
                    </tr>
                  </thead>
                  <tbody>
                    {home.rows.map((r) => (
                      <tr key={r.state}>
                        <td>{r.state}</td>
                        <td>{r.block}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={styles.hand} aria-hidden="true" style={{ marginTop: 22 }}>
                {home.hand}
              </p>
            </div>
          </div>
        </Chapter>

        {/* ── 05 Flow 3: trackers ── */}
        <Chapter id="trackers" kicker={label("trackers")} title={trackers.title} tone="tint">
          <p className={styles.body}>{trackers.lead}</p>
          <Strip label={trackers.stripLabel} screens={trackers.screens} />
          <div className={styles.grid2}>
            <div className={styles.card}>
              <h3>{trackers.anatomyTitle}</h3>
              <ol className={styles.anat} aria-label="Tracker parts">
                {trackers.anatomy.map((a) => (
                  <li key={a.label}>
                    <span>
                      <b>{a.label}</b> {a.text}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className={`${styles.card} ${styles.cardAccent}`}>
              <h3>{trackers.whyTitle}</h3>
              <p>{trackers.whyBody}</p>
            </div>
          </div>
        </Chapter>

        {/* ── 06 Flow 4: experts, meals and workouts ── */}
        <Chapter id="experts" kicker={label("experts")} title={experts.title}>
          <p className={styles.body}>{experts.lead}</p>
          <Strip label={experts.stripLabel} screens={experts.screens} />
          <p className={styles.small}>{experts.note}</p>
        </Chapter>

        {/* ── 07 Interaction model (dark) ── */}
        <Chapter id="interaction" kicker={label("interaction")} title={interaction.title} tone="dark">
          <p className={styles.body}>{interaction.lead}</p>
          <ul className={styles.stats} aria-label="Prototype interaction counts">
            {interaction.stats.map((s) => (
              <li key={s.label}>
                <span className={`${styles.sV} ${s.hot ? styles.hot : ""}`}>{s.value}</span>
                <span className={styles.sL}>{s.label}</span>
              </li>
            ))}
          </ul>
          <ol className={styles.flow} aria-label="The main prototype path">
            {interaction.chain.map((step, i) => (
              <React.Fragment key={step}>
                <li className={step === interaction.chainHot ? styles.hot : undefined}>{step}</li>
                {i < interaction.chain.length - 1 ? (
                  <li className={styles.arrow} aria-hidden="true">→</li>
                ) : null}
              </React.Fragment>
            ))}
          </ol>
          <div className={`${styles.tblWrap} ${styles.tblWhite}`}>
            <table>
              <caption>{interaction.caption}</caption>
              <thead>
                <tr>
                  <th scope="col">In the prototype</th>
                  <th scope="col">Used for</th>
                  <th scope="col">iOS</th>
                  <th scope="col">Android</th>
                </tr>
              </thead>
              <tbody>
                {interaction.rows.map((r) => (
                  <tr key={r.kind}>
                    <td>{r.kind}</td>
                    <td>{r.use}</td>
                    <td>{r.ios}</td>
                    <td>{r.android}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Chapter>

        {/* ── 08 Components ── */}
        <Chapter id="components" kicker={label("components")} title={components.title} tone="tint">
          <p className={styles.body}>{components.lead}</p>
          <div className={styles.grid2}>
            <div className={styles.spec}>
              <div className={styles.specStage}>
                {[
                  { n: "23", state: "Today", cls: styles.dayToday },
                  { n: "24", state: "On", cls: "" },
                  { n: "25", state: "Off", cls: styles.dayOff },
                ].map((d) => (
                  <div key={d.state} className={styles.dayCell}>
                    <span className={`${styles.day} ${d.cls}`}>{d.n}</span>
                    <span className={styles.stateL}>{d.state}</span>
                  </div>
                ))}
              </div>
              <div className={styles.specBody}>
                <h3>Day</h3>
                <code>{components.dayCaption}</code>
                <p>{components.dayBody}</p>
              </div>
            </div>
            <div className={styles.spec}>
              <div className={styles.specStage}>
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Phone / Email</span>
                  <span className={styles.fieldInput}>Enter phone or email</span>
                </div>
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Password</span>
                  <span className={`${styles.fieldInput} ${styles.inputFocus}`}>••••••••</span>
                </div>
              </div>
              <div className={styles.specBody}>
                <h3>Text field</h3>
                <code>{components.fieldCaption}</code>
                <p>{components.fieldBody}</p>
              </div>
            </div>
            <div className={styles.spec}>
              <div className={styles.specStage}>
                <div className={styles.seg} role="group" aria-label="Height unit">
                  <span>Feet</span>
                  <span className={styles.segOn}>Centimetre</span>
                </div>
                <div className={styles.stepper}>
                  <span className={styles.stepperBtn} aria-hidden="true">−</span>
                  <span className={styles.stepperValue}>10000</span>
                  <span className={styles.stepperBtn} aria-hidden="true">+</span>
                </div>
              </div>
              <div className={styles.specBody}>
                <h3>Unit toggle and stepper</h3>
                <code>{components.stepperCaption}</code>
                <p>{components.stepperBody}</p>
              </div>
            </div>
            <div className={styles.spec}>
              <div className={styles.specStage}>
                <div className={styles.ring} role="img" aria-label={components.ringLabel}>
                  <svg viewBox="0 0 120 120" aria-hidden="true">
                    <circle cx="60" cy="60" r={RING_R} fill="none" stroke="#ece5ff" strokeWidth="12" />
                    <circle
                      cx="60"
                      cy="60"
                      r={RING_R}
                      fill="none"
                      stroke="#6323fe"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={RING_DASH}
                    />
                  </svg>
                  <div className={styles.ringValue} aria-hidden="true">
                    <b>2860</b>
                    <span>steps</span>
                  </div>
                </div>
                <p className={styles.ringSentence}>{components.ringSentence}</p>
              </div>
              <div className={styles.specBody}>
                <h3>Progress ring</h3>
                <code>{components.ringCaption}</code>
                <p>{components.ringBody}</p>
              </div>
            </div>
            <div className={`${styles.spec} ${styles.specWide}`}>
              <div className={`${styles.specStage} ${styles.specStageWide}`}>
                <div>
                  <BottomBar variant="designed" />
                  <span className={styles.stateL}>{components.barAsDesigned}</span>
                </div>
                <div>
                  <BottomBar variant="suggested" />
                  <span className={styles.stateL}>{components.barSuggested}</span>
                </div>
              </div>
              <div className={styles.specBody}>
                <h3>Bottom bar</h3>
                <code>{components.barCaption}</code>
                <p>{components.barBody}</p>
              </div>
            </div>
          </div>
        </Chapter>

        {/* ── 09 Tokens ── */}
        <Chapter id="tokens" kicker={label("tokens")} title={tokens.title} tone="tint">
          <p className={styles.body}>{tokens.lead}</p>
          <div className={styles.tblWrap}>
            <table>
              <caption>{tokens.collectionsCaption}</caption>
              <thead>
                <tr>
                  <th scope="col">Collection</th>
                  <th scope="col" className={styles.num}>Variables</th>
                  <th scope="col">Examples</th>
                </tr>
              </thead>
              <tbody>
                {tokens.collections.map((c) => (
                  <tr key={c.name}>
                    <td>{c.name}</td>
                    <td className={styles.num}>{c.count}</td>
                    <td>{c.examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className={styles.h3}>{tokens.findingsTitle}</h3>
          <div className={styles.grid3}>
            {tokens.findings.map((f) => (
              <div key={f.n} className={styles.card}>
                <span className={styles.k}>{f.n}</span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
          <div className={styles.tblWrap}>
            <table>
              <caption>{tokens.modeCaption}</caption>
              <thead>
                <tr>
                  <th scope="col">Semantic token</th>
                  <th scope="col">Default mode (today)</th>
                  <th scope="col">Studio mode (proposed)</th>
                  <th scope="col">Check on white</th>
                </tr>
              </thead>
              <tbody>
                {tokens.modeRows.map((r) => (
                  <tr key={r.token}>
                    <td><code>{r.token}</code></td>
                    <td>
                      <span className={styles.sw} style={{ background: r.todayHex }} aria-hidden="true" />
                      {r.today}
                      {r.todayFail ? <span className={styles.fail}>{r.todayFail}</span> : null}
                    </td>
                    <td>
                      {r.proposedHex ? (
                        <span className={styles.sw} style={{ background: r.proposedHex }} aria-hidden="true" />
                      ) : null}
                      {r.proposed}
                    </td>
                    <td>
                      {r.check ? `${r.check} ` : null}
                      <span className={styles.pass}>{r.pass}</span>
                      {r.suffix ?? ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.small} style={{ marginTop: 14 }}>{tokens.footnote}</p>
        </Chapter>

        {/* ── 10 iOS and Android ── */}
        <Chapter id="platforms" kicker={label("platforms")} title={platforms.title}>
          <p className={styles.body}>{platforms.lead}</p>
          <div className={styles.tblWrap}>
            <table>
              <caption>{platforms.caption}</caption>
              <thead>
                <tr>
                  <th scope="col">Element</th>
                  <th scope="col">In the design</th>
                  <th scope="col">iOS</th>
                  <th scope="col">Android</th>
                </tr>
              </thead>
              <tbody>
                {platforms.rows.map((r) => (
                  <tr key={r.element}>
                    <td>{r.element}</td>
                    <td>{r.design}</td>
                    <td>{r.ios}</td>
                    <td>{r.android}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.small} style={{ marginTop: 14 }}>{platforms.note}</p>
        </Chapter>

        {/* ── 11 Accessibility audit ── */}
        <Chapter id="accessibility" kicker={label("accessibility")} title={accessibility.title} tone="tint">
          <p className={styles.body}>{accessibility.lead}</p>
          <ul className={styles.stats} aria-label="Audit numbers">
            {accessibility.stats.map((s) => (
              <li key={s.label}>
                <span className={`${styles.sV} ${s.hot ? styles.hot : ""}`}>{s.value}</span>
                <span className={styles.sL}>{s.label}</span>
              </li>
            ))}
          </ul>
          <div className={styles.tblWrap}>
            <table>
              <caption>{accessibility.caption}</caption>
              <thead>
                <tr>
                  <th scope="col">Finding</th>
                  <th scope="col">WCAG 2.2</th>
                  <th scope="col">Severity</th>
                  <th scope="col">Fix</th>
                </tr>
              </thead>
              <tbody>
                {accessibility.rows.map((r) => (
                  <tr key={r.finding}>
                    <td>{r.finding}</td>
                    <td>{r.criterion}</td>
                    <td>
                      <span
                        className={`${styles.sev} ${
                          r.severity === "High" ? styles.sevHi : r.severity === "Medium" ? styles.sevMd : styles.sevLo
                        }`}
                      >
                        {r.severity}
                      </span>
                    </td>
                    <td>{r.fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className={styles.h3}>{accessibility.worksTitle}</h3>
          <ul className={styles.notes}>
            {accessibility.works.map((w) => (
              <li key={w.title}>
                <b>{w.title}</b>
                {w.body}
              </li>
            ))}
          </ul>
        </Chapter>

        {/* ── 12 Reflection ── */}
        <Chapter id="reflection" kicker={label("reflection")} title={reflection.title}>
          <div className={styles.grid2}>
            {reflection.cards.map((c) => (
              <div key={c.title} className={`${styles.card} ${c.accent ? styles.cardAccent : ""}`}>
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
            <p className={styles.small}>{reflection.credit}</p>
          </div>
        </div>
      </div>
    </CaseStudyLayout>
  );
}
