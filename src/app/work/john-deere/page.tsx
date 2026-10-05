"use client";

import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import { CaseStudySection } from "@/components/casestudy/CaseStudyContent";
import BeeTrail, { BEE_PATHS } from "@/components/casestudy/BeeTrail";
import CountUp from "@/components/casestudy/CountUp";
import Figure from "@/components/casestudy/Figure";
import BeforeAfter from "@/components/casestudy/BeforeAfter";
import {
  BarRow,
  DimensionRow,
  ThemeStack,
} from "@/components/casestudy/AbtoolsCharts";
import {
  hero,
  stats,
  facts,
  overview,
  background,
  beforeAfter,
  problem,
  design,
  participants,
  workflow,
  results,
  qualitative,
  rightWrong,
  designSystem,
  org,
  impact,
  limitations,
  nextTime,
  lessons,
} from "@/content/johnDeere";
import styles from "./johnDeere.module.css";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "background", label: "Background" },
  { id: "problem", label: "01: The Research Problem" },
  { id: "design", label: "02: Study Design" },
  { id: "participants", label: "03: Participants" },
  { id: "workflow", label: "04: The Workflow" },
  { id: "results", label: "05: Results" },
  { id: "findings", label: "06: Qualitative Findings" },
  { id: "decisions", label: "07: Right and Wrong" },
  { id: "patterns", label: "08: Design System" },
  { id: "context", label: "09: Org Context" },
  { id: "impact", label: "10: Impact" },
  { id: "limitations", label: "11: Limitations" },
  { id: "next", label: "12: Next Time" },
  { id: "lessons", label: "13: Lessons" },
];

/** Render copy that may include visible [PLACEHOLDER] tokens. */
function withPlaceholders(text: string) {
  // TODO(shweta): resolve [SQUARE BRACKETS] placeholders listed in the ABTools spec §9
  const parts = text.split(/(\[[^\]]+\])/g);
  return parts.map((part, i) =>
    part.startsWith("[") && part.endsWith("]") ? (
      <span key={i} className={styles.placeholderMark}>
        {part}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
}

function colStart(start: number) {
  return `${(start - 1) * 12.5}%`;
}
function colWidth(start: number, end: number) {
  return `${(end - start + 1) * 12.5}%`;
}

export default function JohnDeerePage() {
  const role = hero.meta.find((m) => m.label === "Role")?.value ?? "";
  const team = hero.meta.find((m) => m.label === "Team")?.value ?? "";
  const timeline = hero.meta.find((m) => m.label === "Timeline")?.value ?? "";

  return (
    <div className={styles.page}>
      <CaseStudyHero
        category={hero.category}
        title={hero.title}
        subtitle={hero.subtitle}
        role={role}
        team={team}
        timeline={timeline}
        variant="abtools"
      >
        <BeeTrail
          {...BEE_PATHS.hero}
          onDark
          label="Decorative bee trail under the case study subtitle"
        />
      </CaseStudyHero>

      <CaseStudyLayout sections={sections}>
        {/* Stats + facts */}
        <CaseStudySection id="stats-strip">
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statValue}>
                <CountUp
                  display="60 → 85.6"
                  ariaLabel="SUS sixty to eighty-five point six"
                  from={60}
                  to={85.6}
                  decimals={1}
                  prefix="60 → "
                />
              </div>
              <div className={styles.statLabel}>{stats[0].label}</div>
            </div>
            <div className={styles.stat}>
              <div className={`${styles.statValue} ${styles.statValueHot}`}>
                <CountUp
                  display="+35 pts"
                  ariaLabel="Plus thirty-five points"
                  from={0}
                  to={35}
                  prefix="+"
                  suffix=" pts"
                  highlight
                />
              </div>
              <div className={styles.statLabel}>{stats[1].label}</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>
                <CountUp
                  display="6 of 6"
                  ariaLabel="Six of six dimensions improved"
                  from={0}
                  to={6}
                  suffix=" of 6"
                />
              </div>
              <div className={styles.statLabel}>{stats[2].label}</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>
                <CountUp
                  display="35"
                  ariaLabel="Thirty-five issues surfaced"
                  from={0}
                  to={35}
                />
              </div>
              <div className={styles.statLabel}>{stats[3].label}</div>
            </div>
          </div>
          <div className={styles.facts}>
            {facts.map((f) => (
              <span key={f.label}>
                <span className={styles.factLabel}>{f.label}:</span> {f.value}
              </span>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection id="overview" heading="Overview">
          {overview.map((p) => (
            <p key={p.slice(0, 24)} className={styles.body}>
              {p}
            </p>
          ))}
        </CaseStudySection>

        <CaseStudySection id="background" heading="Background">
          <p className={styles.lead}>{background.lead}</p>
          <p className={styles.body}>{background.p1}</p>
          <div className={styles.contextGrid}>
            {background.context.map((c) => (
              <div key={c.label} className={styles.contextCard}>
                <div
                  className={`${styles.contextValue}${c.highlight ? ` ${styles.contextValueHot}` : ""}`}
                >
                  {c.value}
                </div>
                <div className={styles.contextLabel}>{c.label}</div>
              </div>
            ))}
          </div>
          <p className={styles.body}>{background.p2}</p>
          <div className={styles.chips}>
            {background.systems.map((s, i) => (
              <span
                key={s}
                className={`${styles.chip}${i === 0 ? ` ${styles.chipHot}` : ""}`}
              >
                {s}
              </span>
            ))}
          </div>
          <p className={styles.body}>{background.p3}</p>
          <BeforeAfter
            caption={beforeAfter.caption}
            before={beforeAfter.before}
            after={beforeAfter.after}
          />
        </CaseStudySection>

        <div className={styles.tintSection}>
          <CaseStudySection id="problem" heading="01: The Research Problem">
            <p className={styles.lead}>{problem.lead}</p>
            <p className={styles.body}>{problem.p}</p>
            <div className={styles.forceGrid}>
              {problem.forces.map((f) => (
                <div
                  key={f.title}
                  className={`${styles.forceCard}${f.solid ? ` ${styles.forceSolid}` : ""}`}
                >
                  <span className={styles.forceKind}>{f.kind}</span>
                  <h3 className={styles.forceTitle}>{f.title}</h3>
                  <p className={styles.forceText}>{f.text}</p>
                </div>
              ))}
            </div>
            {problem.rqs.map((rq, i) => (
              <div key={rq} className={styles.rq}>
                <span className={styles.rqLabel}>RQ. {i + 1}</span>
                <p className={styles.rqText}>{rq}</p>
              </div>
            ))}
          </CaseStudySection>
        </div>

        <CaseStudySection id="design" heading="02: Study Design">
          <p className={styles.lead}>{design.lead}</p>
          {design.paras.map((p) => (
            <p key={p.strong} className={styles.body}>
              <span className={styles.strongLead}>{p.strong}</span> {p.text}
            </p>
          ))}

          <Figure caption={design.timeline.caption}>
            <BeeTrail
              {...BEE_PATHS.timeline}
              label="Bee trail along the study timeline"
            />
            <div className={styles.months}>
              {design.timeline.months.map((m) => (
                <div key={m}>{m}</div>
              ))}
            </div>
            <div className={styles.track} aria-hidden>
              {design.timeline.spans.map((s) => (
                <div
                  key={`${s.start}-${s.style}`}
                  className={
                    s.style === "prev"
                      ? styles.spanPrev
                      : s.style === "hatch"
                        ? styles.spanHatch
                        : styles.spanCurrent
                  }
                  style={{
                    left: colStart(s.start),
                    width: colWidth(s.start, s.end),
                  }}
                />
              ))}
            </div>
            <div className={styles.legend}>
              {design.timeline.legend.map((l) => (
                <div key={l.title}>
                  <div
                    className={styles.legendSwatch}
                    style={{
                      background:
                        l.style === "prev"
                          ? "#8a8a8a"
                          : l.style === "current"
                            ? "#8b69fa"
                            : undefined,
                      backgroundImage:
                        l.style === "hatch"
                          ? "repeating-linear-gradient(-45deg, rgba(139,105,250,.35) 0 6px, rgba(139,105,250,.12) 6px 12px)"
                          : undefined,
                    }}
                  />
                  <h3 className={styles.legendTitle}>{l.title}</h3>
                  <p className={styles.legendText}>{l.text}</p>
                </div>
              ))}
            </div>
          </Figure>

          <h3 className={styles.h3}>Instruments</h3>
          <div className={styles.cardGrid}>
            {design.instruments.map((inst) => (
              <div key={inst.title} className={styles.miniCard}>
                <h3 className={styles.miniTitle}>{inst.title}</h3>
                <p className={styles.miniText}>{withPlaceholders(inst.text)}</p>
              </div>
            ))}
          </div>

          <h3 className={styles.h3}>Research decisions and trade-offs</h3>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Decision</th>
                  <th scope="col">Why</th>
                  <th scope="col">Trade-off</th>
                </tr>
              </thead>
              <tbody>
                {design.tradeoffs.map((row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CaseStudySection>

        <div className={styles.tintSection}>
          <CaseStudySection id="participants" heading="03: Participants">
            <p className={styles.lead}>{participants.lead}</p>
            <p className={styles.body}>{participants.p}</p>
            <div className={styles.profileGrid}>
              {participants.profiles.map((p) => (
                <div key={p.role} className={styles.profile}>
                  <span className={styles.profileRole}>{p.role}</span>
                  <h3 className={styles.profileName}>{p.name}</h3>
                  <span className={styles.profileHours}>{p.hours}</span>
                  <div className={styles.tenureTrack}>
                    <div
                      className={`${styles.tenureFill}${p.unverified ? ` ${styles.tenureHatch}` : ""}`}
                      style={{ width: `${p.tenurePct}%` }}
                    />
                  </div>
                  {/* TODO(shweta): verify [TENURE] for credit admin profile */}
                  <span className={styles.profileTenure}>
                    {withPlaceholders(p.tenure)}
                  </span>
                  <p className={styles.profileText}>{p.text}</p>
                  <span className={styles.profileSystems}>{p.systems}</span>
                </div>
              ))}
            </div>
            <p className={styles.note}>{participants.note}</p>
          </CaseStudySection>
        </div>

        <CaseStudySection id="workflow" heading="04: The Workflow">
          <p className={styles.lead}>{workflow.lead}</p>
          <p className={styles.body}>{workflow.p}</p>
          <Figure
            caption={
              // TODO(shweta): confirm step order vs deck, then remove [VERIFY STEP ORDER]
              workflow.caption
            }
          >
            {workflow.steps.map((step, i) => (
              <div key={step.title} className={styles.workflowStep}>
                <div>
                  <span className={styles.stepMono}>Step {i + 1}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                </div>
                <div className={styles.findings}>
                  {step.findings.map((f, fi) => (
                    <span
                      key={f}
                      className={`${styles.findChip}${
                        step.emphasis === fi ? ` ${styles.findChipHot}` : ""
                      }`}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Figure>
        </CaseStudySection>

        <div className={styles.tintSection}>
          <CaseStudySection id="results" heading="05: Results">
            <p className={styles.lead}>{results.lead}</p>
            <p className={styles.body}>{results.p}</p>

            <Figure
              caption={results.sus.caption}
              ariaLabel="SUS scores: previous 60, current 85.6"
            >
              {results.sus.rows.map((r) => (
                <BarRow
                  key={r.label}
                  label={r.label}
                  value={r.value}
                  kind={r.kind as "prev" | "bench" | "current"}
                />
              ))}
            </Figure>

            <Figure caption={results.dimensions.caption}>
              <div className={styles.dimLegend}>
                <span className={styles.legPrev}>Previous</span>
                <span className={styles.legCurrent}>Current</span>
              </div>
              {results.dimensions.rows.map((r) => (
                <DimensionRow
                  key={r.label}
                  label={r.label}
                  before={r.before}
                  after={r.after}
                  change={r.change}
                  highlight={r.highlight}
                  muted={r.muted}
                  delayCurrent
                />
              ))}
            </Figure>

            <div className={styles.storyGrid}>
              {results.stories.map((s) => (
                <div
                  key={s.title}
                  className={`${styles.storyCard}${s.accent ? ` ${styles.storyAccent}` : ""}`}
                >
                  <span className={styles.storyKicker}>{s.kicker}</span>
                  <h3 className={styles.miniTitle}>{s.title}</h3>
                  {s.paras.map((para) => (
                    <p key={para.slice(0, 20)} className={styles.miniText}>
                      {para}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </CaseStudySection>
        </div>

        <CaseStudySection id="findings" heading="06: Qualitative Findings">
          <p className={styles.lead}>{qualitative.lead}</p>
          <p className={styles.body}>{qualitative.p}</p>

          <Figure caption={qualitative.themes.caption}>
            <ThemeStack rows={qualitative.themes.rows} />
          </Figure>

          <h3 className={styles.notesTitle}>{qualitative.notes.title}</h3>
          <p className={styles.body}>{qualitative.notes.p}</p>

          <Figure caption={qualitative.notes.caption}>
            <div className={styles.notesGrid}>
              <div className={styles.notesBefore}>
                <span className={styles.notesMono}>
                  {qualitative.notes.beforeTitle}
                </span>
                {qualitative.notes.mock.map((m) => (
                  <div key={m.head} className={styles.noteBlock}>
                    <div className={styles.noteHead}>{m.head}</div>
                    {m.lines.map((line) => (
                      <div key={line} className={styles.noteLine}>
                        {line}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className={styles.notesAfter}>
                <span className={styles.notesMono}>
                  {qualitative.notes.afterTitle}
                </span>
                <div className={styles.afterBox}>
                  {qualitative.notes.mock
                    .flatMap((m) => m.lines)
                    .join(" ")}
                </div>
                <p className={styles.miniText} style={{ marginTop: 12 }}>
                  {qualitative.notes.afterNote}
                </p>
              </div>
            </div>
          </Figure>

          <p className={styles.body}>{qualitative.notes.gestalt}</p>

          <h3 className={styles.h3}>Beyond the headline</h3>
          <div className={styles.cardGrid}>
            {qualitative.more.map((m) => (
              <div key={m.title} className={styles.miniCard}>
                <h3 className={styles.miniTitle}>{m.title}</h3>
                <p className={styles.miniText}>{m.text}</p>
              </div>
            ))}
          </div>
        </CaseStudySection>

        <div className={styles.darkSection}>
          <CaseStudySection
            id="decisions"
            heading="07: What the Redesign Got Right and Wrong"
          >
            <p className={styles.body}>{rightWrong.intro}</p>
            <div className={styles.twoCol}>
              <div>
                <h3 className={styles.colHead}>Got right · 4</h3>
                {rightWrong.right.map((item) => (
                  <div key={item.title} className={styles.rightItem}>
                    <h3 className={styles.rightTitle}>{item.title}</h3>
                    <p className={styles.rightText}>{item.text}</p>
                    <span className={styles.principle}>{item.principle}</span>
                  </div>
                ))}
              </div>
              <div>
                <h3 className={`${styles.colHead} ${styles.colHeadWrong}`}>
                  Got wrong · 10
                </h3>
                {rightWrong.wrong.map(([title, principle]) => (
                  <div key={title} className={styles.wrongItem}>
                    <h3 className={styles.wrongTitle}>{title}</h3>
                    <span className={styles.principle}>{principle}</span>
                  </div>
                ))}
              </div>
            </div>
          </CaseStudySection>
        </div>

        <CaseStudySection id="patterns" heading="08: Design System Implications">
          <p className={styles.lead}>{designSystem.lead}</p>
          <p className={styles.body}>{designSystem.p}</p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col" style={{ width: "40%" }}>
                    Finding
                  </th>
                  <th scope="col">Pattern to fix it once</th>
                </tr>
              </thead>
              <tbody>
                {designSystem.rows.map((row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CaseStudySection>

        <div className={styles.tintSection}>
          <CaseStudySection id="context" heading="09: Organizational Context">
            <p className={styles.lead}>{org.lead}</p>
            <p className={styles.body}>{org.p}</p>
            <div className={styles.orgStats}>
              {org.stats.map((s) => (
                <div
                  key={s.value}
                  className={`${styles.orgStat}${s.solid ? ` ${styles.orgStatSolid}` : ""}`}
                >
                  <div className={styles.orgStatValue}>{s.value}</div>
                  <div className={styles.orgStatText}>{s.text}</div>
                </div>
              ))}
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Recommendation</th>
                    <th scope="col">Survey evidence</th>
                    <th scope="col">Of 40</th>
                  </tr>
                </thead>
                <tbody>
                  {org.rows.map((row) => (
                    <tr key={`${row[0]}-${row[1]}`}>
                      <td>{row[0]}</td>
                      <td>{row[1]}</td>
                      <td className={styles.countCell}>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={styles.caveat}>{org.caveat}</p>
          </CaseStudySection>
        </div>

        <CaseStudySection id="impact" heading="10: Impact and Recommendations">
          <div className={styles.impactGrid}>
            {impact.cards.map((c) => (
              <div key={c.kicker} className={styles.impactCard}>
                <span className={styles.impactKicker}>{c.kicker}</span>
                <h3 className={styles.miniTitle}>{c.title}</h3>
                {c.paras.map((para) => (
                  <p key={para.slice(0, 24)} className={styles.miniText}>
                    {withPlaceholders(para)}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <blockquote className={styles.quote}>{impact.quote}</blockquote>
        </CaseStudySection>

        <CaseStudySection
          id="limitations"
          heading="11: Limitations"
          // no top padding so quote sits directly above
        >
          <div className={styles.noTopPad}>
            <p className={styles.lead}>{limitations.lead}</p>
            {limitations.rows.map(([title, text]) => (
              <div key={title} className={styles.limitRow}>
                <h3 className={styles.limitTitle}>{title}</h3>
                <p className={styles.limitText}>{text}</p>
              </div>
            ))}
          </div>
        </CaseStudySection>

        <div className={styles.tintSection}>
          <CaseStudySection id="next" heading="12: What I'd Add Next Time">
            <div className={styles.cardGrid}>
              {nextTime.map((n) => (
                <div key={n.title} className={styles.miniCard}>
                  <span className={styles.when}>{n.when}</span>
                  <h3 className={styles.miniTitle}>{n.title}</h3>
                  <p className={styles.miniText}>{n.text}</p>
                </div>
              ))}
            </div>
          </CaseStudySection>
        </div>

        <CaseStudySection id="lessons" heading="13: What This Project Taught Me">
          <div className={styles.lessonsGrid}>
            {lessons.map((l) => (
              <div key={l.title} className={styles.lesson}>
                <h3 className={styles.lessonTitle}>{l.title}</h3>
                <p className={styles.lessonText}>{l.text}</p>
              </div>
            ))}
          </div>
        </CaseStudySection>
      </CaseStudyLayout>
    </div>
  );
}
