"use client";

import { EVENTS, CONSENT_EVENT, track } from "@/lib/analytics";

import React from "react";
import Image from "next/image";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import FuelAnatomy from "@/components/casestudy/FuelAnatomy";
import {
  hero,
  sectionNav,
  context,
  fuelSystem,
  people,
  research,
  findings,
  textfieldError,
  assumptions,
  framing,
  exploration,
  decisions,
  anatomy,
  anatomyItems,
  kept,
  fuelFile,
  tokens,
  next,
  footnote,
} from "@/content/teamContract";
import styles from "./teamContract.module.css";

/* Colours for the password gate only. The case study itself uses globals.css tokens. */
const T = {
  green: "#367C2B",
  yellow: "#FFDE00",
  text: "#1c1b17",
  muted: "#6e6b60",
  border: "#e3e0d6",
  white: "#ffffff",
};

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
        <p className={styles.kicker}>{number ? `${number} · ${label}` : label}</p>
        <h2 className={styles.h2}>
          <Marked text={title} />
        </h2>
        {children}
      </div>
    </section>
  );
}

/* A Fuel sub-section inside a chapter: kicker band, heading, body. */
function FuelBand({ label, title, children }: { label: string; title: string; children?: React.ReactNode }) {
  return (
    <div className={styles.fuelBand}>
      <p className={styles.fuelKicker}>{label}</p>
      <h3 className={styles.h3}>
        <Marked text={title} />
      </h3>
      {children}
    </div>
  );
}

function Figure({
  filename,
  width,
  height,
  alt,
  caption,
  redacted,
  className,
}: {
  filename: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  redacted?: string;
  className?: string;
}) {
  return (
    <figure className={`${styles.figure} ${className ?? ""}`}>
      <div className={styles.figureFrame}>
        <Image
          src={`/assets/team-contract/${filename}`}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 900px) 50vw, 100vw"
          unoptimized
          className={styles.figureImage}
        />
      </div>
      <figcaption className={styles.figcaption}>
        {caption}
        {redacted ? <span className={styles.redacted}> {redacted}</span> : null}
      </figcaption>
    </figure>
  );
}

/* The Fuel building blocks as the design shows them. Plain elements, not buttons: this is a mock. */
function FuelSystemMock() {
  return (
    <div className={styles.fuelMock}>
      <div className={styles.fuelMockHead}>
        <span>Program #1289 · Team Contract</span>
        <span>Fuel v5</span>
      </div>
      <div className={styles.fuelMockBody}>
        <div className={styles.mockBlock}>
          <p className={styles.mockLabel}>Button</p>
          <div className={styles.btnRow}>
            <span className={`${styles.btn} ${styles.btnPrimary}`}>Save</span>
            <span className={`${styles.btn} ${styles.btnSecondary}`}>Cancel</span>
            <span className={`${styles.btn} ${styles.btnDisabled}`}>Save</span>
          </div>
        </div>
        <div className={styles.mockBlock}>
          <p className={styles.mockLabel}>TextField (Input)</p>
          <p className={styles.fieldLabel}>
            View Name <span className={styles.req}>*</span>
          </p>
          <span className={styles.field}>Phase 3 view</span>
        </div>
        <div className={styles.mockBlock}>
          <p className={styles.mockLabel}>Badge</p>
          <div className={styles.badgeRow}>
            <span className={`${styles.badge} ${styles.badgePm}`}>PM</span>
            <span className={`${styles.badge} ${styles.badgeFmfa}`}>FMFA</span>
            <span className={`${styles.badge} ${styles.badgeFmtc}`}>FMTC</span>
          </div>
        </div>
        <div className={styles.mockBlock}>
          <p className={styles.mockLabel}>Status</p>
          <div className={styles.statusRow}>
            <span className={`${styles.status} ${styles.statusOn}`}>On track</span>
            <span className={`${styles.status} ${styles.statusRisk}`}>At risk</span>
            <span className={`${styles.status} ${styles.statusOff}`}>Off track</span>
          </div>
        </div>
      </div>
      <p className={styles.mockNote}>{fuelSystem.note}</p>
    </div>
  );
}

function FuelErrorMock() {
  const b = textfieldError.before;
  const a = textfieldError.after;
  return (
    <div className={styles.errorGrid}>
      <div className={styles.errorCard}>
        <p className={styles.errorLabel}>{b.label}</p>
        <p className={styles.fieldLabel}>{b.field}</p>
        <span className={styles.field}>{b.value}</span>
        <div className={styles.codeBox}>
          <p>{b.message}</p>
          <p>{b.code}</p>
        </div>
      </div>
      <div className={`${styles.errorCard} ${styles.errorCardAfter}`}>
        <p className={styles.errorLabel}>{a.label}</p>
        <p className={styles.fieldLabel}>{a.field}</p>
        <span className={`${styles.field} ${styles.fieldError}`}>{a.value}</span>
        <p className={styles.fieldMessage}>{a.message}</p>
        <div className={styles.saveRow}>
          <span className={`${styles.btn} ${styles.btnDisabled}`}>Save</span>
          <span className={styles.saveNote}>{a.save}</span>
        </div>
      </div>
    </div>
  );
}

function TableWrap({ children }: { children: React.ReactNode }) {
  return <div className={styles.tableWrap}>{children}</div>;
}

const EVIDENCE_TONE: Record<string, string> = {
  None: styles.evNone,
  Thin: styles.evThin,
  Some: styles.evSome,
  Validated: styles.evValidated,
};

const TYPE_TONE: Record<string, string> = {
  Feasibility: styles.typeFeasibility,
  Desirability: styles.typeDesirability,
  Viability: styles.typeViability,
};

const sections = sectionNav;

/* ─────────── Password gate (unchanged) ─────────── */
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "deere2026") {
      localStorage.setItem("team_contract_access", "deere2026");
      track(EVENTS.CASE_STUDY_UNLOCK, {project_slug:"team-contract"});
      onUnlock();
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div role="region" aria-label="Password protected case study" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f3", padding: "24px" }}>
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: "12px", width: "100%", maxWidth: "440px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
        <div style={{ height: "6px", background: T.yellow }} />
        <div style={{ background: T.green, padding: "28px 24px", textAlign: "center" as const, color: T.white }}>
          <div style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" as const }}>John Deere</div>
          <div style={{ fontSize: "11px", marginTop: "5px", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.1em" }}>TEAM CONTRACT</div>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: "36px 32px", display: "flex", flexDirection: "column" as const, gap: "20px" }}>
          <div style={{ textAlign: "center" as const }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: T.text, margin: "0 0 8px 0" }}>Protected Case Study</h3>
            <p style={{ fontSize: "13.5px", color: T.muted, margin: 0, lineHeight: 1.55 }}>
              This case study contains proprietary materials under NDA. Please enter the password to view.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "6px" }}>
            <label htmlFor="team-contract-password" style={{ fontSize: "12px", fontWeight: 600, color: T.text }}>
              Password
            </label>
            <input
              id="team-contract-password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "team-contract-password-error" : undefined}
              style={{ padding: "12px 16px", border: `1px solid ${T.border}`, borderRadius: "4px", fontSize: "14px", width: "100%", color: T.text, boxSizing: "border-box" as const }}
              onFocus={(e) => { e.target.style.borderColor = T.green; }}
              onBlur={(e) => { e.target.style.borderColor = T.border; }}
            />
            {error && (
              <span id="team-contract-password-error" role="alert" style={{ fontSize: "12.5px", color: "#b91c1c", fontWeight: 600 }}>
                {error}
              </span>
            )}
          </div>
          <button
            type="submit"
            style={{ background: T.yellow, color: T.text, border: "none", padding: "14px", borderRadius: "4px", fontWeight: 700, fontSize: "13px", textTransform: "uppercase" as const, letterSpacing: "0.1em", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#e5c800"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = T.yellow; }}
          >
            Unlock Case Study
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─────────── Main page ─────────── */
export default function TeamContractCaseStudy() {
  const [unlocked, setUnlocked] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("team_contract_access") === "deere2026") {
      setUnlocked(true);
    }
  }, []);

  React.useEffect(() => {
    const report = () => track(unlocked ? EVENTS.CASE_STUDY_VIEW : EVENTS.CASE_STUDY_GATE_VIEW, {project_slug:"team-contract"});
    report(); window.addEventListener(CONSENT_EVENT, report);
    return () => window.removeEventListener(CONSENT_EVENT, report);
  }, [unlocked]);

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <CaseStudyLayout sections={sections} hideBrief>
      {/* ── Hero ── */}
      <section className={styles.hero} aria-labelledby="tc-title">
        <div className={styles.heroInner}>
          <ul className={styles.tags}>
            {hero.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <h1 id="tc-title" className={styles.heroTitle}>
            <span>{hero.titleLead}</span>{" "}
            <span className={styles.heroLine}>
              <em className={styles.heroAccent}>{hero.titleAccent}</em> {hero.titleRest}
            </span>{" "}
            <span>{hero.titleLast}</span>
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
          <p className={styles.annotation}>{hero.annotation}</p>
        </div>
      </section>

      {/* ── 01 Context ── */}
      <Chapter id="context" number="01" label="Context" title={context.title} tone="grey">
        {context.paragraphs.map((p) => (
          <p key={p} className={styles.lead}>
            {p}
          </p>
        ))}

        <ol className={styles.phases}>
          {context.phases.map((phase) => (
            <li key={phase.n} className={`${styles.phase} ${phase.highlight ? styles.phaseHighlight : ""}`}>
              <p className={styles.phaseNum}>Phase {phase.n}</p>
              <p className={styles.phaseName}>{phase.name}</p>
              <p className={styles.phaseDetail}>{phase.detail}</p>
            </li>
          ))}
        </ol>

        <Figure
          filename={context.before.filename}
          width={context.before.width}
          height={context.before.height}
          alt={context.before.alt}
          caption={context.before.caption}
          redacted={context.before.redacted}
        />

        <FuelBand label={fuelSystem.band} title={fuelSystem.title}>
          <p className={styles.lead}>{fuelSystem.body}</p>
          <FuelSystemMock />
          <p className={styles.figcaption}>{fuelSystem.caption}</p>
        </FuelBand>
      </Chapter>

      {/* ── 02 People & context ── */}
      <Chapter id="people" number="02" label="People & context" title={people.title} tone="lilac">
        {people.paragraphs.map((p) => (
          <p key={p} className={styles.lead}>
            {p}
          </p>
        ))}

        <ul className={styles.roles}>
          {people.roles.map((role) => (
            <li key={role}>{role}</li>
          ))}
        </ul>

        <ul className={styles.stickies}>
          {people.quotes.map((q) => (
            <li key={q.text} className={`${styles.sticky} ${q.tone === "lilac" ? styles.stickyLilac : styles.stickyYellow}`}>
              <p className={styles.stickyText}>“{q.text}”</p>
              <p className={styles.stickyCite}>{q.cite}</p>
            </li>
          ))}
        </ul>
      </Chapter>

      {/* ── 03 Research ── */}
      <Chapter id="research" number="03" label="Research" title={research.title} tone="grey">
        <p className={styles.lead}>{research.body}</p>

        <ul className={styles.pipeline}>
          {research.pipeline.map((step) => (
            <li key={step.label} className={`${styles.pipelineStep} ${step.highlight ? styles.pipelineHighlight : ""}`}>
              <p className={styles.pipelineLabel}>{step.label}</p>
              <p className={styles.pipelineValue}>{step.value}</p>
            </li>
          ))}
        </ul>

        <div className={styles.twoUp}>
          <Figure
            filename={research.rawNotes.filename}
            width={research.rawNotes.width}
            height={research.rawNotes.height}
            alt={research.rawNotes.alt}
            caption={research.rawNotes.caption}
          />
          <Figure
            filename={research.affinity.filename}
            width={research.affinity.width}
            height={research.affinity.height}
            alt={research.affinity.alt}
            caption={research.affinity.caption}
          />
        </div>
      </Chapter>

      {/* ── 04 Findings ── */}
      <Chapter id="findings" number="04" label="Findings" title={findings.title} tone="lilac">
        <p className={styles.lead}>{findings.body}</p>

        <ul className={styles.bars}>
          {findings.bars.map((bar) => (
            <li key={bar.label} className={styles.bar}>
              <span className={styles.barLabel}>{bar.label}</span>
              <span className={styles.barTrack} aria-hidden="true">
                <span className={styles.barFill} style={{ width: `${(bar.sessions / 5) * 100}%` }} />
              </span>
              <span className={styles.barValue}>{bar.sessions} of 5</span>
            </li>
          ))}
        </ul>

        <div className={styles.cards}>
          {findings.cards.map((card) => (
            <article key={card.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              {"quote" in card && card.quote ? <p className={styles.cardQuote}>{card.quote}</p> : null}
              <p className={styles.cardBody}>{card.body}</p>
              <p className={styles.cardFoot}>{card.foot}</p>
            </article>
          ))}
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>{findings.snapshot.title}</h3>
            <p className={styles.cardBody}>{findings.snapshot.body}</p>
            <p className={styles.cardFoot}>{findings.snapshot.foot}</p>
          </article>
        </div>

        <h3 className={styles.h3}>{findings.synthesis.title}</h3>
        <p className={styles.lead}>{findings.synthesis.body}</p>
        <div className={styles.twoUp}>
          <Figure
            filename={findings.synthesis.actions.filename}
            width={findings.synthesis.actions.width}
            height={findings.synthesis.actions.height}
            alt={findings.synthesis.actions.alt}
            caption={findings.synthesis.actions.caption}
          />
          <Figure
            filename={findings.synthesis.themes.filename}
            width={findings.synthesis.themes.width}
            height={findings.synthesis.themes.height}
            alt={findings.synthesis.themes.alt}
            caption={findings.synthesis.themes.caption}
          />
        </div>

        <FuelBand label={textfieldError.band} title={textfieldError.title}>
          <p className={styles.lead}>{textfieldError.body}</p>
          <FuelErrorMock />
          <p className={styles.figcaption}>{textfieldError.caption}</p>
        </FuelBand>
      </Chapter>

      {/* ── 05 Assumptions ── */}
      <Chapter id="assumptions" number="05" label="Assumptions" title={assumptions.title} tone="grey">
        <p className={styles.lead}>{assumptions.body}</p>
        <TableWrap>
          <table className={styles.table}>
            <caption className={styles.tableCaption}>{assumptions.caption}</caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Assumption</th>
                <th scope="col">Type</th>
                <th scope="col">Evidence so far</th>
              </tr>
            </thead>
            <tbody>
              {assumptions.rows.map((row) => (
                <tr key={row.n}>
                  <td data-label="#">{row.n}</td>
                  <td data-label="Assumption">{row.text}</td>
                  <td data-label="Type">
                    <span className={`${styles.pill} ${TYPE_TONE[row.type] ?? ""}`}>{row.type}</span>
                  </td>
                  <td data-label="Evidence so far">
                    <span className={`${styles.pill} ${EVIDENCE_TONE[row.evidence] ?? ""}`}>{row.evidence}</span>{" "}
                    <span className={styles.evidenceDetail}>{row.detail}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Chapter>

      {/* ── 06 Problem framing ── */}
      <Chapter id="framing" number="06" label="Problem framing" title={framing.title} tone="lilac">
        <div className={styles.framings}>
          <article className={styles.card}>
            <p className={styles.kickerSmall}>{framing.symptom.label}</p>
            <p className={styles.cardBody}>{framing.symptom.body}</p>
            <p className={styles.cardFoot}>{framing.symptom.leaves}</p>
          </article>
          <article className={`${styles.card} ${styles.cardChosen}`}>
            <p className={styles.kickerSmall}>{framing.root.label}</p>
            <p className={styles.cardBody}>{framing.root.body}</p>
            <p className={styles.cardFoot}>{framing.root.leaves}</p>
          </article>
        </div>

        <div className={styles.hmw}>
          <p className={styles.hmwTitle}>How might we…</p>
          <ol className={styles.hmwList}>
            {framing.howMightWe.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </Chapter>

      {/* ── 07 Exploration ── */}
      <Chapter id="exploration" number="07" label="Exploration" title={exploration.title} tone="grey">
        <p className={styles.lead}>{exploration.body}</p>

        <ol className={styles.options}>
          {exploration.options.map((option) => (
            <li key={option.n} className={`${styles.option} ${option.highlight ? styles.optionHighlight : ""}`}>
              <p className={styles.optionNum}>
                Option {option.n}
                {option.highlight ? " · taken forward" : ""}
              </p>
              <p className={styles.optionName}>{option.name}</p>
              <p className={styles.optionDetail}>{option.detail}</p>
            </li>
          ))}
        </ol>

        <div className={styles.twoUp}>
          <Figure
            filename={exploration.option1.filename}
            width={exploration.option1.width}
            height={exploration.option1.height}
            alt={exploration.option1.alt}
            caption={exploration.option1.caption}
          />
          <Figure
            filename={exploration.option3.filename}
            width={exploration.option3.width}
            height={exploration.option3.height}
            alt={exploration.option3.alt}
            caption={exploration.option3.caption}
          />
        </div>
      </Chapter>

      {/* ── 08 Design decisions ── */}
      <Chapter id="decisions" number="08" label="Design decisions" title={decisions.title} tone="lilac">
        <p className={styles.lead}>{decisions.body}</p>

        <div className={styles.decisionList}>
          {decisions.items.map((item, i) => (
            <article key={item.n} className={`${styles.decision} ${i % 2 === 1 ? styles.decisionReverse : ""}`}>
              <div className={styles.decisionText}>
                <p className={styles.decisionNum}>{item.n}</p>
                <h3 className={styles.h3}>{item.title}</h3>
                <dl className={styles.decisionDl}>
                  <div>
                    <dt>Evidence</dt>
                    <dd>{item.evidence}</dd>
                  </div>
                  <div>
                    <dt>Change</dt>
                    <dd>{item.change}</dd>
                  </div>
                  {"result" in item && item.result ? (
                    <div>
                      <dt>Result</dt>
                      <dd>{item.result}</dd>
                    </div>
                  ) : null}
                  {"stillOpen" in item && item.stillOpen ? (
                    <div>
                      <dt>Still open</dt>
                      <dd>{item.stillOpen}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
              <div className={styles.decisionFigure}>
                <Figure
                  filename={item.figure.filename}
                  width={item.figure.width}
                  height={item.figure.height}
                  alt={item.figure.alt}
                  caption={item.figure.caption}
                />
              </div>
            </article>
          ))}
        </div>

        <FuelBand label={anatomy.band} title={anatomy.title}>
          <p className={styles.lead}>{anatomy.body}</p>
          <FuelAnatomy
            src={`/assets/team-contract/${anatomy.filename}`}
            width={anatomy.width}
            height={anatomy.height}
            alt={anatomy.alt}
            caption={anatomy.caption}
            items={anatomyItems}
          />
        </FuelBand>
      </Chapter>

      {/* ── 09 What held up ── */}
      <Chapter id="kept" number="09" label="What held up" title={kept.title} tone="grey">
        <p className={styles.lead}>{kept.body}</p>

        <div className={styles.keptGrid}>
          <div className={styles.keptCards}>
            <article className={`${styles.card} ${styles.cardValidated}`}>
              <h3 className={styles.cardTitle}>Validated</h3>
              <ul className={styles.checkList}>
                {kept.validated.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className={styles.card}>
              <h3 className={styles.cardTitle}>Cut</h3>
              <ul className={styles.crossList}>
                {kept.cut.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
          <Figure
            filename={kept.insights.filename}
            width={kept.insights.width}
            height={kept.insights.height}
            alt={kept.insights.alt}
            caption={kept.insights.caption}
          />
        </div>

        <div className={styles.savedCard}>
          <p className={styles.savedValue}>{kept.saved.value}</p>
          <div>
            <p className={styles.savedTitle}>{kept.saved.title}</p>
            <p className={styles.savedBody}>{kept.saved.body}</p>
          </div>
        </div>
      </Chapter>

      {/* ── Fuel: what the file is made of, and the tokens ── */}
      <Chapter id="fuel-file" number="" label={fuelFile.band} title={fuelFile.title} tone="white">
        <p className={styles.lead}>{fuelFile.body}</p>

        <ul className={styles.fuelBars}>
          {fuelFile.rows.map((row) => (
            <li key={row.label} className={styles.fuelBar}>
              <span className={styles.barLabel}>{row.label}</span>
              <span className={styles.barTrack} aria-hidden="true">
                <span className={styles.barFillGreen} style={{ width: `${(row.count / 2801) * 100}%` }} />
              </span>
              <span className={styles.barValue}>{row.count.toLocaleString("en-GB")}</span>
            </li>
          ))}
        </ul>
        <p className={styles.note}>{fuelFile.note}</p>

        <div className={styles.twoUp}>
          <div className={styles.stickyYellowWide}>
            <p className={styles.stickyText}>{fuelFile.composed}</p>
          </div>
          <div className={styles.stickyLilacWide}>
            <p className={styles.stickyText}>{fuelFile.honest}</p>
          </div>
        </div>

        <div className={styles.tokenPanel}>
          <p className={styles.fuelKicker}>Fuel · Tokens</p>
          <h3 className={styles.tokenTitle}>{tokens.title}</h3>
          <p className={styles.tokenBody}>{tokens.body}</p>
          <div className={styles.tokenGroups}>
            {tokens.groups.map((group) => (
              <div key={group.title}>
                <p className={styles.tokenGroupTitle}>{group.title}</p>
                <ul className={styles.tokenList}>
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <span className={styles.tokenName}>{item.name}</span>
                      <span className={styles.tokenValue}>
                        {item.value.startsWith("#") ? (
                          <span aria-hidden="true" className={styles.swatch} style={{ background: item.value }} />
                        ) : null}
                        {item.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <dl className={styles.typeScale}>
            {tokens.type.map((t) => (
              <div key={t.name}>
                <dt>{t.name}</dt>
                <dd>{t.spec}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.tokenCaption}>{tokens.caption}</p>
        </div>
      </Chapter>

      {/* ── 10 What we'd test next ── */}
      <Chapter id="next" number="10" label="What we’d test next" title={next.title} tone="lilac">
        <div className={styles.hypotheses}>
          {next.hypotheses.map((h) => (
            <article key={h.id} className={styles.card}>
              <p className={styles.kickerSmall}>{h.id}</p>
              <h3 className={styles.cardTitle}>{h.name}</h3>
              <p className={styles.blockLabel}>We believe</p>
              <p className={styles.cardBody}>{h.believe}</p>
              <p className={styles.blockLabel}>We’ll know when</p>
              <p className={styles.cardBody}>{h.knowWhen}</p>
              <p className={styles.blockLabel}>We’re wrong if</p>
              <p className={styles.cardBody}>{h.wrongIf}</p>
            </article>
          ))}
        </div>

        <TableWrap>
          <table className={styles.table}>
            <caption className={styles.tableCaption}>{next.methodCaption}</caption>
            <thead>
              <tr>
                <th scope="col">Method</th>
                <th scope="col">Answers</th>
                <th scope="col">Can’t tell us</th>
                <th scope="col">Cheaper fallback</th>
              </tr>
            </thead>
            <tbody>
              {next.methods.map((m) => (
                <tr key={m.method}>
                  <td data-label="Method" className={styles.strong}>
                    {m.method}
                  </td>
                  <td data-label="Answers">{m.answers}</td>
                  <td data-label="Can’t tell us">{m.cant}</td>
                  <td data-label="Cheaper fallback">{m.fallback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>

        <div className={styles.nextStep}>
          <div>
            <p className={styles.kickerSmall}>{next.nextStep.label}</p>
            <h3 className={styles.nextTitle}>{next.nextStep.title}</h3>
            <p className={styles.cardBody}>{next.nextStep.body}</p>
          </div>
          <dl className={styles.nextStats}>
            {next.nextStep.stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className={styles.footnote}>{footnote}</p>
      </Chapter>
    </CaseStudyLayout>
  );
}
