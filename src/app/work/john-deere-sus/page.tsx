"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import {
  CaseStudySection,
  Accent,
  Blockquote,
} from "@/components/casestudy/CaseStudyContent";
import {
  TldrCard,
  ChartFigure,
  ShowDetails,
} from "@/components/casestudy/CaseStudyExtras";
import BeeTrail, { BEE_PATHS } from "@/components/casestudy/BeeTrail";
import CountUp from "@/components/casestudy/CountUp";
import Figure from "@/components/casestudy/Figure";
import BeforeAfter from "@/components/casestudy/BeforeAfter";
import HandNote from "@/components/casestudy/doodles/HandNote";
import StickyNote from "@/components/casestudy/doodles/StickyNote";
import DoodleAvatar from "@/components/casestudy/doodles/DoodleAvatar";
import type { DoodleAvatarTint } from "@/components/casestudy/doodles/DoodleAvatar";
import SusScoreCard from "@/components/casestudy/SusScoreCard";
import SurveyBars from "@/components/casestudy/SurveyBars";
import ProcessDiagram from "@/components/casestudy/ProcessDiagram";
import QuotePair from "@/components/casestudy/QuotePair";
import AffinityBoard from "@/components/casestudy/AffinityBoard";
import NotesMock from "@/components/casestudy/NotesMock";
import PatternTiles from "@/components/casestudy/PatternTiles";
import OkrBoard from "@/components/casestudy/OkrBoard";
import {
  BarRow,
  DimensionRow,
  ThemeStack,
} from "@/components/casestudy/AbtoolsCharts";
import {
  hero,
  susScoreCard,
  stats,
  facts,
  tldr,
  prologue,
  background,
  beforeAfter,
  beforeAfterParties,
  problem,
  design,
  participants,
  workflow,
  results,
  qualitative,
  quotes,
  affinity,
  notesChapter,
  rightWrong,
  designSystem,
  org,
  impact,
  limitations,
  nextTime,
  lessons,
} from "@/content/johnDeere";
import styles from "./johnDeere.module.css";

// Final section order, §1.1. stats-strip stays out of the TOC.
const sections = [
  { id: "overview", label: "The short version" },
  { id: "context", label: "Prologue: why evidence" },
  { id: "problem", label: "01 · The problem" },
  { id: "design", label: "02 · The plan" },
  { id: "participants", label: "03 · The people" },
  { id: "workflow", label: "04 · The workflow" },
  { id: "results", label: "05 · The numbers" },
  { id: "findings", label: "06 · What people said" },
  { id: "notes", label: "07 · The Notes problem" },
  { id: "decisions", label: "08 · The verdict" },
  { id: "patterns", label: "09 · Design system" },
  { id: "impact", label: "10 · Impact" },
  { id: "lessons", label: "11 · Looking back" },
];

function colStart(start: number) {
  return `${(start - 1) * 12.5}%`;
}
function colWidth(start: number, end: number) {
  return `${(end - start + 1) * 12.5}%`;
}

/** Renders `**bold**` markers in content strings as real <strong> text. */
function renderBold(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      part
    ),
  );
}

export default function JohnDeerePage() {
  const role = hero.meta.find((m) => m.label === "Role")?.value ?? "";
  const team = hero.meta.find((m) => m.label === "Team")?.value ?? "";
  const timeline = hero.meta.find((m) => m.label === "Timeline")?.value ?? "";

  return (
    <div className={styles.page}>
      <CaseStudyHero
        category={hero.category}
        title={
          <>
            When did <Accent>&lsquo;better&rsquo;</Accent> actually mean
            better?
          </>
        }
        subtitle={hero.subtitle}
        chips={hero.chips}
        role={role}
        team={team}
        timeline={timeline}
        variant="abtools"
        aside={<SusScoreCard {...susScoreCard} />}
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

        {/* The short version — TL;DR card, §3.2 */}
        <CaseStudySection id="overview" label="The short version">
          <TldrCard summary={tldr.summary} tldr={tldr} />
        </CaseStudySection>

        {/* Prologue — §3.3 */}
        <CaseStudySection
          id="context"
          label="Prologue"
          heading={
            <>
              A UX team people liked, but didn&rsquo;t yet{" "}
              <Accent>rely on for evidence</Accent>
            </>
          }
        >
          <p className={styles.lead}>{prologue.lead}</p>
          <div className={styles.prologueGrid}>
            <ChartFigure
              summary="Of 40 respondents, 33 valued UX for a user-centred mindset but only 11 for evidence-based decisions."
              columns={["Benefit", "Count (of 40)"]}
              rows={prologue.survey.rows.map((r) => [r.label, String(r.count)])}
            >
              <Figure caption={prologue.caption} className={styles.prologueChart}>
                <SurveyBars
                  title={prologue.survey.title}
                  total={prologue.survey.total}
                  rows={prologue.survey.rows}
                  circleHighlight
                />
              </Figure>
            </ChartFigure>
            <div className={styles.prologueStickies}>
              {prologue.stickies.map((s, i) => (
                <StickyNote key={s} rotate={i % 2 === 0 ? 1.5 : -1}>
                  {renderBold(s)}
                </StickyNote>
              ))}
              <HandNote rotate={-1.5}>{prologue.note}</HandNote>
            </div>
          </div>
        </CaseStudySection>

        {/* 01 · The problem — §3.4, merges the old Background section */}
        <div className={styles.tintSection}>
          <CaseStudySection
            id="problem"
            label="Chapter 01 · The problem"
            heading={
              <>
                Experts don&rsquo;t forgive{" "}
                <Accent>a pretty slowdown</Accent>
              </>
            }
          >
            <p className={styles.lead}>{problem.lead}</p>
            <p className={styles.body}>{problem.p}</p>

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

            <BeforeAfter
              caption={beforeAfter.caption}
              before={beforeAfter.before}
              after={beforeAfter.after}
              beforeNote={beforeAfter.beforeNote}
              afterNote={beforeAfter.afterNote}
            />

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

            <h3 className={styles.h3}>The questions I set out to answer</h3>
            {problem.rqs.map((rq, i) => (
              <div key={rq} className={styles.rq}>
                <span className={styles.rqLabel}>RQ. {i + 1}</span>
                <p className={styles.rqText}>{rq}</p>
              </div>
            ))}
          </CaseStudySection>
        </div>

        {/* 02 · The plan — §3.5. ProcessDiagram comes in Phase 4. */}
        <CaseStudySection
          id="design"
          label="Chapter 02 · The plan"
          heading={
            <>
              Measure the same people <Accent>before and after</Accent>
            </>
          }
        >
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
          <HandNote rotate={-1.5}>{design.timeline.note}</HandNote>

          <Figure caption={design.process.caption}>
            <ProcessDiagram
              stickies={design.process.stickies}
              steps={design.process.steps}
              loopLabel={design.process.loopLabel}
            />
          </Figure>
          <HandNote rotate={1}>{design.process.note}</HandNote>

          <h3 className={styles.h3}>Instruments</h3>
          <div className={styles.cardGrid}>
            {design.instruments.map((inst) => (
              <div key={inst.title} className={styles.miniCard}>
                <h3 className={styles.miniTitle}>{inst.title}</h3>
                <p className={styles.miniText}>{inst.text}</p>
              </div>
            ))}
          </div>

          <Figure
            caption={design.questionnaire.caption}
            className={styles.questionnaireFigure}
          >
            <Image
              src={design.questionnaire.image}
              alt={design.questionnaire.alt}
              width={design.questionnaire.imageWidth}
              height={design.questionnaire.imageHeight}
              className={styles.questionnaireImg}
              sizes="(min-width: 1100px) 50vw, 100vw"
            />
          </Figure>
          <div className={styles.questionnaireFlow}>
            <ol className={styles.flowList}>
              {design.questionnaire.flow.map((step, i) => (
                <li key={step}>
                  <span className={styles.flowNum}>{i + 1}</span> {step}
                </li>
              ))}
            </ol>
            <StickyNote rotate={-1}>
              {renderBold(design.questionnaire.sticky)}
            </StickyNote>
          </div>

          <h3 className={styles.h3}>Design decisions, and what each one cost</h3>
          <div className={styles.decisionGrid}>
            {design.tradeoffs.map((row, i) => (
              <div key={row[0]} className={styles.decisionCard}>
                <span className={styles.decisionEyebrow}>Decision {i + 1}</span>
                <h3 className={styles.miniTitle}>{row[0]}</h3>
                <p className={styles.miniText}>
                  <strong>Why:</strong> {row[1]}
                </p>
                <p className={`${styles.miniText} ${styles.decisionCost}`}>
                  <strong>Cost:</strong> {row[2]}
                </p>
              </div>
            ))}
          </div>
          <ShowDetails summary="Show as a table">
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Decision</th>
                    <th scope="col">Why</th>
                    <th scope="col">Cost</th>
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
          </ShowDetails>
        </CaseStudySection>

        {/* 03 · The people — §3.6 */}
        <div className={styles.tintSection}>
          <CaseStudySection
            id="participants"
            label="Chapter 03 · The people"
            heading={
              <>
                Four roles, <Accent>decades of muscle memory</Accent>
              </>
            }
          >
            <p className={styles.lead}>{participants.lead}</p>
            <p className={styles.body}>{participants.p}</p>
            <div className={styles.profileGrid}>
              {participants.profiles.map((p) => (
                <div key={p.role} className={styles.profile}>
                  <div className={styles.profileHead}>
                    <DoodleAvatar tint={p.avatarTint as DoodleAvatarTint} />
                    <span className={styles.profilePid}>{p.pid}</span>
                  </div>
                  <span className={styles.profileRole}>{p.role}</span>
                  <h3 className={styles.profileName}>{p.name}</h3>
                  <span className={styles.profileHours}>{p.hours}</span>
                  <div className={styles.tenureTrack}>
                    <div
                      className={`${styles.tenureFill}${p.unverified ? ` ${styles.tenureHatch}` : ""}`}
                      style={{ width: `${p.tenurePct}%` }}
                    />
                  </div>
                  <span className={styles.profileTenure}>{p.tenure}</span>
                  <p className={styles.profileText}>{p.text}</p>
                  <span className={styles.profileSystems}>{p.systems}</span>
                </div>
              ))}
            </div>
            <p className={styles.note}>{participants.note}</p>
          </CaseStudySection>
        </div>

        {/* 04 · The workflow — §3.7 */}
        <CaseStudySection
          id="workflow"
          label="Chapter 04 · The workflow"
          heading={
            <>
              Following one credit decision{" "}
              <Accent>from queue to handoff</Accent>
            </>
          }
        >
          <p className={styles.lead}>{workflow.lead}</p>
          <Figure caption={workflow.caption}>
            {workflow.steps.map((step, i) => {
              const isHotspot = i === workflow.hotspotIndex;
              return (
                <div
                  key={step.title}
                  className={`${styles.workflowStep}${isHotspot ? ` ${styles.workflowStepHot}` : ""}`}
                >
                  <div>
                    <span className={styles.stepMono}>
                      Step {i + 1}
                      {isHotspot ? " · hotspot" : ""}
                    </span>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                  </div>
                  <ul className={styles.findings}>
                    {step.findings.map((f, fi) => (
                      <StickyNote
                        key={f}
                        as="li"
                        size="sm"
                        rotate={fi % 2 === 0 ? -1 : 1}
                      >
                        {f}
                      </StickyNote>
                    ))}
                  </ul>
                </div>
              );
            })}
          </Figure>

          <BeforeAfter
            caption={beforeAfterParties.caption}
            before={beforeAfterParties.before}
            after={beforeAfterParties.after}
          />
        </CaseStudySection>

        {/* 05 · The numbers — §3.8 */}
        <div className={styles.tintSection}>
          <CaseStudySection
            id="results"
            label="Chapter 05 · What the numbers said"
            heading={
              <>
                Usability went up. <Accent>Satisfaction barely moved.</Accent>
              </>
            }
          >
            <p className={styles.lead}>{results.lead}</p>

            <ChartFigure
              summary={results.sus.summary}
              columns={["Measure", "Score"]}
              rows={results.sus.rows.map((r) => [r.label, String(r.value)])}
            >
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
            </ChartFigure>

            <ChartFigure
              summary={results.dimensions.summary}
              columns={["Dimension", "Before %", "After %", "Change"]}
              rows={results.dimensions.rows.map((r) => [
                r.label,
                `${r.before}%`,
                `${r.after}%`,
                `+${r.change}`,
              ])}
            >
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
            </ChartFigure>
            <HandNote rotate={1.5}>{results.note}</HandNote>

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

        {/* 06 · What people said — §3.9. Quote pairs + AffinityBoard come in Phase 4/5. */}
        <CaseStudySection
          id="findings"
          label="Chapter 06 · What people said"
          heading={
            <>
              The scores said how much. <Accent>The words said why.</Accent>
            </>
          }
        >
          <p className={styles.lead}>{qualitative.lead}</p>
          <p className={styles.body}>{qualitative.p}</p>

          <div className={styles.quotePairs}>
            {quotes.map((q) => (
              <QuotePair
                key={q.dimension}
                dimension={q.dimension}
                before={q.before}
                after={q.after}
              />
            ))}
          </div>

          <Figure caption={qualitative.themes.caption}>
            <ThemeStack rows={qualitative.themes.rows} />
          </Figure>
          <div className={styles.themeNoteRow}>
            <StickyNote rotate={-1.5}>{qualitative.note.sticky}</StickyNote>
            <HandNote rotate={1}>{qualitative.note.hand}</HandNote>
          </div>

          <h3 className={styles.h3}>{affinity.heading}</h3>
          <Figure caption={affinity.caption}>
            <AffinityBoard columns={affinity.columns} />
          </Figure>
          <HandNote rotate={-1}>{affinity.note}</HandNote>

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

        {/* 07 · The Notes problem — §3.10, new chapter */}
        <div className={styles.tintSection}>
          <CaseStudySection
            id="notes"
            label="Chapter 07 · Design deep dive"
            heading={
              <>
                The Notes problem: <Accent>formatting is information</Accent>
              </>
            }
          >
            <p className={styles.lead}>{notesChapter.lead}</p>

            <Blockquote
              text={notesChapter.pullQuote.text}
              author={notesChapter.pullQuote.cite}
            />

            <Figure caption={notesChapter.caption}>
              <NotesMock
                label={notesChapter.label}
                shipped={{
                  title: notesChapter.shipped.title,
                  appBar: notesChapter.shipped.appBar,
                  paragraph: qualitative.notes.mock
                    .flatMap((m) => m.lines)
                    .join(" "),
                  viewAllLabel: notesChapter.shipped.viewAllLabel,
                  chips: notesChapter.shipped.chips,
                }}
                recommended={{
                  title: notesChapter.recommended.title,
                  cards: [
                    {
                      author: notesChapter.recommended.cardAuthors[0],
                      body: qualitative.notes.mock
                        .slice(0, 2)
                        .map((m) => m.lines.join("\n"))
                        .join("\n\n"),
                    },
                    {
                      author: notesChapter.recommended.cardAuthors[1],
                      body: qualitative.notes.mock[2].lines.join(" "),
                    },
                  ],
                  showFullLabel: notesChapter.recommended.showFullLabel,
                  sidePanel: notesChapter.recommended.sidePanel,
                  chips: notesChapter.recommended.chips,
                }}
              />
            </Figure>
            <HandNote rotate={-2}>{notesChapter.note}</HandNote>

            <p className={styles.body}>{qualitative.notes.gestalt}</p>
          </CaseStudySection>
        </div>

        {/* 08 · The verdict — §3.11 */}
        <div className={styles.darkSection}>
          <CaseStudySection
            id="decisions"
            label="Chapter 08 · The verdict"
            heading={
              <>
                What the redesign got right, <Accent>and what it missed</Accent>
              </>
            }
          >
            <p className={styles.body}>{rightWrong.intro}</p>
            <div className={styles.twoCol}>
              <div>
                <h3 className={styles.colHead}>Keep · 4</h3>
                {rightWrong.right.map((item) => (
                  <div key={item.title} className={styles.rightItem}>
                    <h3 className={styles.rightTitle}>{item.title}</h3>
                    <p className={styles.rightText}>{item.text}</p>
                    <span className={styles.principle}>{item.principle}</span>
                  </div>
                ))}
                <HandNote rotate={-1.5}>{rightWrong.keepNote}</HandNote>
              </div>
              <div>
                <h3 className={`${styles.colHead} ${styles.colHeadWrong}`}>
                  Fix · 10
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

        {/* 09 · Design system — §3.12 */}
        <CaseStudySection
          id="patterns"
          label="Chapter 09 · From findings to patterns"
          heading={
            <>
              Fix it once, <Accent>in the design system</Accent>
            </>
          }
        >
          <p className={styles.lead}>{designSystem.lead}</p>

          <p className={styles.patternsLabel}>{designSystem.tilesLabel}</p>
          <PatternTiles tiles={designSystem.tiles} />
          <HandNote rotate={-1.5}>{designSystem.tilesNote}</HandNote>

          <ShowDetails summary="Show findings and patterns as a table">
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
          </ShowDetails>
        </CaseStudySection>

        {/* 10 · Impact — §3.13. "Where it led" + OkrBoard come in Phase 5. */}
        <div className={styles.tintSection}>
          <CaseStudySection
            id="impact"
            label="Chapter 10 · Impact"
            heading={
              <>
                Evidence, <Accent>not just a launch</Accent>
              </>
            }
          >
            <div className={styles.impactGrid}>
              {impact.cards.map((c) => (
                <div key={c.kicker} className={styles.impactCard}>
                  <span className={styles.impactKicker}>{c.kicker}</span>
                  <h3 className={styles.miniTitle}>{c.title}</h3>
                  {c.paras.map((para) => (
                    <p key={para.slice(0, 24)} className={styles.miniText}>
                      {para}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <blockquote className={styles.quote}>{impact.quote}</blockquote>

            <ShowDetails summary="See the survey evidence behind each recommendation">
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
            </ShowDetails>

            <h3 className={styles.h3}>{impact.whereItLed.heading}</h3>
            <p className={styles.body}>{impact.whereItLed.text}</p>
            <Figure caption={impact.okr.caption}>
              <OkrBoard
                objective={impact.okr.objective}
                keyResults={impact.okr.keyResults}
                initiatives={impact.okr.initiatives}
                note={impact.okr.note}
              />
            </Figure>
          </CaseStudySection>
        </div>

        {/* 11 · Looking back — §3.14, merges Limitations + Next time + Lessons */}
        <CaseStudySection
          id="lessons"
          label="Chapter 11 · Looking back"
          heading={
            <>
              What I&rsquo;d keep, <Accent>and what I&rsquo;d add</Accent>
            </>
          }
        >
          <div className={styles.lookingBackGrid}>
            <div className={styles.lookingBackCol}>
              <h3 className={styles.lookingBackTitle}>Limitations</h3>
              <ul className={styles.limitBullets}>
                {limitations.rows.map(([title]) => (
                  <li key={title}>{title}</li>
                ))}
              </ul>
            </div>
            <div className={styles.lookingBackCol}>
              <h3 className={styles.lookingBackTitle}>Next time</h3>
              {nextTime.map((n) => (
                <div key={n.title} className={styles.nextItem}>
                  <span className={styles.when}>{n.when}</span>
                  <h4 className={styles.miniTitle}>{n.title}</h4>
                  <p className={styles.miniText}>{n.text}</p>
                </div>
              ))}
            </div>
            <div className={`${styles.lookingBackCol} ${styles.lookingBackTint}`}>
              <h3 className={styles.lookingBackTitle}>What this taught me</h3>
              {lessons.map((l) => (
                <div key={l.title} className={styles.lessonItem}>
                  <h4 className={styles.miniTitle}>{l.title}</h4>
                  <p className={styles.miniText}>{l.text}</p>
                </div>
              ))}
            </div>
          </div>
        </CaseStudySection>
      </CaseStudyLayout>
    </div>
  );
}
