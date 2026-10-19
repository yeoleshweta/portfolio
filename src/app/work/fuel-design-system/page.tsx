"use client";

import Image from "next/image";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import { CaseStudySection, Accent } from "@/components/casestudy/CaseStudyContent";
import { TldrCard } from "@/components/casestudy/CaseStudyExtras";
import Figure from "@/components/casestudy/Figure";
import StickyNote from "@/components/casestudy/doodles/StickyNote";
import HandNote from "@/components/casestudy/doodles/HandNote";
import LaptopPrototype from "@/components/casestudy/LaptopPrototype";
import QuestionCardShowcase from "@/components/casestudy/QuestionCardShowcase";
import SurveyRowShowcase from "@/components/casestudy/SurveyRowShowcase";
import LanguagePreviewShowcase from "@/components/casestudy/LanguagePreviewShowcase";
import {
  hero,
  timeCard,
  tldr,
  stats,
  problem,
  okr,
  fuel,
  prototype,
  components,
  reach,
  results,
  accessibility,
  givingBack,
  impact,
} from "@/content/fuelSurvey";
import styles from "./fuelSurvey.module.css";

const sections = [
  { id: "overview", label: "The short version" },
  { id: "problem", label: "01 · The problem" },
  { id: "bet", label: "02 · The Fuel bet" },
  { id: "fuel", label: "03 · Inside Fuel" },
  { id: "product", label: "04 · The product" },
  { id: "components", label: "05 · The components" },
  { id: "reach", label: "06 · Reach" },
  { id: "results", label: "07 · Closing the loop" },
  { id: "accessibility", label: "08 · Accessibility" },
  { id: "giving-back", label: "09 · Giving it back" },
  { id: "impact", label: "10 · Impact" },
];

const Arrow = () => (
  <svg className={styles.laneArrow} width="26" height="16" viewBox="0 0 26 16" aria-hidden="true">
    <path d="M2 8h20M16 2l6 6-6 6" />
  </svg>
);

function TimeCard() {
  return (
    <div className={styles.timeCard}>
      <p className={styles.eyebrow}>{timeCard.label}</p>
      <div className={styles.timeRow}>
        <div>
          <span className={styles.timeSmall}>Before</span>
          <span className={styles.timeBefore}>{timeCard.before}</span>
        </div>
        <svg className={styles.timeArrow} width="56" height="34" viewBox="0 0 56 34" aria-hidden="true">
          <path d="M3 24 C 18 6,34 30,50 12" />
          <path d="M41 10 L 51 11 L 49 21" />
        </svg>
        <div>
          <span className={styles.timeSmall}>After</span>
          <span className={styles.timeAfter}>
            {timeCard.after}
            <small> {timeCard.afterUnit}</small>
          </span>
        </div>
      </div>
      <p className={styles.timeBody}>{timeCard.body}</p>
      <HandNote rotate={-1.5}>{timeCard.note}</HandNote>
    </div>
  );
}

function Lane({ label, items }: { label: string; items: { who: string; what: string; removed?: boolean; hot?: boolean }[] }) {
  return (
    <div className={styles.laneBlock}>
      <p className={styles.eyebrow}>{label}</p>
      <ol className={styles.lane}>
        {items.map((n, i) => (
          <li key={n.who + i} className={styles.laneItem}>
            {i > 0 ? <Arrow /> : null}
            <span className={`${styles.node}${n.removed ? ` ${styles.nodeDead}` : ""}${n.hot ? ` ${styles.nodeHot}` : ""}`}>
              <b>{n.who}</b>
              {n.what}
              {n.removed ? <span className={styles.srOnly}> (removed by the new tool)</span> : null}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function FuelSurveyPage() {
  return (
    <div className={styles.page}>
      <CaseStudyHero
        category={hero.category}
        title={
          <>
            From a 3-day ticket to a <Accent>30-minute</Accent> survey
          </>
        }
        subtitle={hero.subtitle}
        chips={hero.chips}
        role={hero.role}
        team={hero.team}
        timeline={hero.timeline}
        aside={<TimeCard />}
      />

      <CaseStudyLayout sections={sections} hideBrief>
        <CaseStudySection id="overview">
          <TldrCard title="The short version" summary={tldr.summary} tldr={tldr}>
            <ul className={styles.stats} aria-label="Key results">
              {stats.map((s) => (
                <li key={s.label} className={styles.stat}>
                  <span className={`${styles.statValue}${s.highlight ? ` ${styles.statHot}` : ""}`}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </li>
              ))}
            </ul>
          </TldrCard>
        </CaseStudySection>

        {/* 01 · Problem */}
        <div className={styles.tint}>
          <CaseStudySection
            id="problem"
            label="Chapter 01 · The problem"
            heading={<>Every survey <Accent>needed a developer</Accent></>}
          >
            <p className={styles.lead}>{problem.lead}</p>
            <Figure caption={problem.caption} className={styles.card}>
              <Lane label="Before · about 3 days per survey" items={problem.before} />
              <Lane label="After · about 30 minutes per survey" items={problem.after} />
            </Figure>
            <ul className={styles.stickyRow} aria-label="What I heard">
              {problem.stickies.map((s, i) => (
                <StickyNote key={s} as="li" rotate={[-1.5, 1, -0.5, 1.5][i % 4]}>
                  {s}
                </StickyNote>
              ))}
            </ul>
            <div className={styles.hmw}>
              <h3>The question I designed for</h3>
              <p>{problem.hmw}</p>
            </div>
          </CaseStudySection>
        </div>

        {/* 02 · The Fuel bet */}
        <CaseStudySection
          id="bet"
          label="Chapter 02 · Why it mattered beyond one tool"
          heading={<>The team&rsquo;s bet: <Accent>more products on Fuel</Accent></>}
        >
          <p className={styles.lead}>{okr.lead}</p>
          <div className={styles.okr}>
            <div className={styles.objective}>
              <p className={styles.eyebrowOnDark}>FY24 Q2 objective</p>
              <p>{okr.objective}</p>
            </div>
            <div className={styles.card}>
              <p className={styles.eyebrow}>Key results this work fed</p>
              <ul className={styles.krList}>
                {okr.keyResults.map((k) => (
                  <li key={k.title}>
                    <strong>{k.title}</strong> {k.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <caption className={styles.eyebrow}>Where my work landed</caption>
              <thead>
                <tr>{okr.mapColumns.map((c) => <th key={c} scope="col">{c}</th>)}</tr>
              </thead>
              <tbody>
                {okr.mapRows.map((r) => (
                  <tr key={r[0]}>{r.map((c) => <td key={c}>{c}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </CaseStudySection>

        {/* 03 · Inside Fuel */}
        <div className={styles.tint}>
          <CaseStudySection
            id="fuel"
            label="Chapter 03 · Inside Fuel"
            heading={<>How a component <Accent>gets to production</Accent></>}
          >
            <p className={styles.lead}>{fuel.lead}</p>
            <Figure caption={fuel.stagesCaption} className={styles.card}>
              <HandNote rotate={-1}>{fuel.quote}</HandNote>
              <ol className={styles.stages}>
                {fuel.stages.map((s) => (
                  <li key={s.n} className={`${styles.node}${s.hot ? ` ${styles.nodeHot}` : ""}`}>
                    <b>{s.n}</b>
                    {s.text}
                  </li>
                ))}
              </ol>
            </Figure>
            <div className={styles.tokens}>
              <p className={styles.eyebrowOnDark}>Token architecture · three layers</p>
              <p className={styles.tokensIntro}>{fuel.tokensIntro}</p>
              <ol className={styles.tokenRow}>
                {fuel.tokens.map((t, i) => (
                  <li key={t.layer} className={styles.token} data-level={i}>
                    <b>{t.layer}</b>
                    <span>{t.role}</span>
                    {t.examples.map((e) => <code key={e}>{e}</code>)}
                  </li>
                ))}
              </ol>
              <p className={styles.tokensNote} aria-hidden="true">{fuel.tokensNote} →</p>
              <div className={styles.tokenCards}>
                {fuel.cards.map((c) => (
                  <div key={c.title}>
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </CaseStudySection>
        </div>

        {/* 04 · The product — animated prototype */}
        <CaseStudySection
          id="product"
          label="Chapter 04 · The product"
          heading={<>Designing for PMs, <Accent>not developers</Accent></>}
        >
          <p className={styles.lead}>{prototype.lead}</p>
          <div className={styles.protoBleed}>
            <LaptopPrototype steps={prototype.steps} ariaLabel={prototype.ariaLabel} note={prototype.note} />
          </div>
          <p className={styles.caption}>{prototype.caption}</p>
          <h3 className={styles.h3}>{prototype.decisionsTitle}</h3>
          <ol className={styles.decisions}>
            {prototype.steps.map((s, i) => (
              <li key={s.id}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <span>{s.decision}</span>
              </li>
            ))}
          </ol>
          <div className={styles.fuelCallout}>
            <p className={styles.eyebrow}>{prototype.fuelTitle}</p>
            <p>{prototype.fuelText}</p>
            <ul className={styles.chips} aria-label="Fuel components used">
              {prototype.fuelParts.map((p) => <li key={p}>{p}</li>)}
            </ul>
            <HandNote rotate={-1}>{prototype.fuelNote}</HandNote>
          </div>
        </CaseStudySection>

        {/* 05 · Components */}
        <div className={styles.tint}>
          <CaseStudySection
            id="components"
            label="Chapter 05 · The components"
            heading={<>One question card, <Accent>many jobs</Accent></>}
          >
            <p className={styles.lead}>{components.lead}</p>
            <Figure caption={components.caption}>
              <QuestionCardShowcase phases={components.phases} />
            </Figure>
          </CaseStudySection>
        </div>

        {/* 06 · Reach */}
        <CaseStudySection
          id="reach"
          label="Chapter 06 · Reach"
          heading={<>One survey, <Accent>any audience, any language</Accent></>}
        >
          <p className={styles.lead}>{reach.lead}</p>
          <Figure caption={reach.caption}>
            <LanguagePreviewShowcase preview={reach.preview} phases={reach.phases} />
          </Figure>
          <div className={styles.grid3}>
            {reach.small.map((f) => (
              <Figure key={f.src} caption={f.caption}>
                <Image src={f.src} alt={f.alt} width={f.w} height={f.h} className={styles.shot} sizes="(max-width: 900px) 100vw, 300px" />
              </Figure>
            ))}
          </div>
        </CaseStudySection>

        {/* 07 · Results */}
        <div className={styles.tint}>
          <CaseStudySection
            id="results"
            label="Chapter 07 · Closing the loop"
            heading={<>Results a PM <Accent>can actually read</Accent></>}
          >
            <p className={styles.lead}>{results.lead}</p>
            <Figure caption={results.caption}>
              <SurveyRowShowcase survey={results.survey} phases={results.phases} />
            </Figure>
          </CaseStudySection>
        </div>

        {/* 08 · Accessibility */}
        <CaseStudySection
          id="accessibility"
          label="Chapter 08 · Accessibility"
          heading={<>Accessible <Accent>by default</Accent></>}
        >
          <p className={styles.lead}>{accessibility.lead}</p>
          <div className={styles.grid2}>
            {accessibility.principles.map((p) => (
              <div key={p.label} className={styles.card}>
                <h3 className={styles.eyebrow}>{p.label}</h3>
                <p className={styles.body}>{p.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.hmw}>
            <h3>{accessibility.targetsTitle}</h3>
            <ul>
              {accessibility.targets.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </CaseStudySection>

        {/* 09 · Giving back */}
        <div className={styles.tint}>
          <CaseStudySection
            id="giving-back"
            label="Chapter 09 · Giving it back"
            heading={<>From one product <Accent>back into the system</Accent></>}
          >
            <p className={styles.lead}>{givingBack.lead}</p>
            <div className={styles.grid2}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>{givingBack.handedTitle}</h3>
                <ul className={styles.list}>
                  {givingBack.handed.map((h) => <li key={h}>{h}</li>)}
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>{givingBack.teachingTitle}</h3>
                <p className={styles.body}>{givingBack.teaching}</p>
              </div>
            </div>
            <StickyNote rotate={-1}>{givingBack.honest}</StickyNote>
          </CaseStudySection>
        </div>

        {/* 10 · Impact */}
        <CaseStudySection
          id="impact"
          label="Chapter 10 · Impact, and what I'd do next"
          heading={<>What changed, <Accent>and what I&rsquo;d measure next</Accent></>}
        >
          <div className={styles.grid3}>
            {impact.cards.map((c) => (
              <div key={c.value} className={styles.card}>
                <span className={styles.impactValue}>{c.value}</span>
                <p className={styles.body}>{c.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.grid2}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>{impact.limitsTitle}</h3>
              <p className={styles.body}>{impact.limits}</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>{impact.nextTitle}</h3>
              <ul className={styles.list}>
                {impact.next.map((n) => <li key={n}>{n}</li>)}
              </ul>
            </div>
          </div>
        </CaseStudySection>
      </CaseStudyLayout>
    </div>
  );
}
