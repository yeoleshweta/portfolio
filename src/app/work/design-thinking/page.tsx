"use client";

import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import {
  CaseStudySection,
  CaseStudyImage,
} from "@/components/casestudy/CaseStudyContent";
import BeeTrail, { BEE_PATHS } from "@/components/casestudy/BeeTrail";
import {
  hero,
  overview,
  process,
  gathering,
  interviews,
  persona,
  decisionFlow,
  delivery,
  impact,
  limitations,
  lessons,
  nextSteps,
} from "@/content/designThinking";
import styles from "./designThinking.module.css";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "process", label: "The Process" },
  { id: "gathering", label: "Gathering Insights" },
  { id: "interviews", label: "What the Interviews Showed" },
  { id: "persona", label: "Persona" },
  { id: "decision-flow", label: "Where Insight Is Lost" },
  { id: "delivery", label: "Delivery" },
  { id: "impact", label: "Impact" },
  { id: "limitations", label: "Limitations" },
  { id: "lessons", label: "What This Project Taught Me" },
  { id: "next", label: "Next Steps" },
];

function ModeIcon({ mode }: { mode: "diverge" | "converge" }) {
  if (mode === "diverge") {
    return (
      <span className={styles.modeIcon} aria-hidden>
        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
          <path
            d="M16 1L2 8l14 7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  return (
    <span className={styles.modeIcon} aria-hidden>
      <svg width="18" height="16" viewBox="0 0 18 16" fill="currentColor">
        <path d="M2 1l14 7-14 7V1z" />
      </svg>
    </span>
  );
}

export default function DesignThinkingPage() {
  const role = hero.meta.find((m) => m.label === "Role")?.value ?? "";
  const team = hero.meta.find((m) => m.label === "Team")?.value ?? "";
  const method = hero.meta.find((m) => m.label === "Method")?.value ?? "";
  const timeline = hero.meta.find((m) => m.label === "Timeline")?.value ?? "";

  return (
    <div className={styles.page}>
      <CaseStudyHero
        category=""
        title={hero.title}
        role={role}
        team={team}
        method={method}
        timeline={timeline}
      />

      <CaseStudyLayout sections={sections}>
        <CaseStudySection id="overview">
          <h2 className={styles.heading}>Overview</h2>
          {overview.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className={styles.lead}>
              {p}
            </p>
          ))}
          <div className={styles.stats}>
            {overview.stats.map((stat) => (
              <div
                key={stat.label}
                className={`${styles.statCard}${stat.dark ? ` ${styles.statCardDark}` : ""}`}
              >
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.callout}>
            <strong>Research goal:</strong> {overview.researchGoal}
          </div>
        </CaseStudySection>

        <CaseStudySection id="process">
          <h2 className={styles.heading}>The Process</h2>
          <p className={styles.lead}>
            The work followed the <strong>Double Diamond</strong>: open up to
            understand the problem, narrow to define it, then open and narrow
            again on what to build.
          </p>
          <div className={styles.processGrid}>
            {process.cards.map((card) => (
              <div key={card.label} className={styles.processCard}>
                <ModeIcon mode={card.mode} />
                <span className={styles.smallLabel}>{card.label}</span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardText}>{card.text}</p>
              </div>
            ))}
          </div>
        </CaseStudySection>

        <div className={styles.beeWrap}>
          <BeeTrail
            {...BEE_PATHS.timeline}
            decorative
            label="Bee flying from process into gathering insights"
          />
        </div>

        <CaseStudySection id="gathering">
          <h2 className={styles.heading}>Gathering Insights</h2>
          {gathering.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className={styles.lead}>
              {p}
            </p>
          ))}
          <div className={styles.blockGrid}>
            {gathering.blocks.map((block) => (
              <div key={block.label} className={styles.blockCard}>
                <span className={styles.smallLabel}>{block.label}</span>
                <h3 className={styles.cardTitle}>{block.title}</h3>
                <p className={styles.cardText}>{block.text}</p>
              </div>
            ))}
          </div>
          <CaseStudyImage
            src={gathering.image.src}
            alt={gathering.image.alt}
            caption={gathering.image.caption}
          />
        </CaseStudySection>

        <CaseStudySection id="interviews">
          <h2 className={styles.heading}>What the Interviews Showed</h2>
          <p className={styles.lead}>{interviews.intro}</p>
          <div className={styles.themeTable}>
            {interviews.themes.map((row) => (
              <div key={row.theme} className={styles.themeRow}>
                <span className={styles.themeName}>{row.theme}</span>
                <div className={styles.themeBarWrap}>
                  <span className={styles.themeCount}>{row.count}</span>
                  <div className={styles.reachTrack}>
                    <div
                      className={styles.reachFill}
                      style={{ width: `${row.fill}%` }}
                    />
                  </div>
                </div>
                <p className={styles.themeNote}>&ldquo;{row.note}&rdquo;</p>
              </div>
            ))}
          </div>
          <p className={styles.caption}>{interviews.themeCaption}</p>

          <h3 className={styles.subheading}>Framing the problem</h3>
          <CaseStudyImage
            src={interviews.problemFraming.src}
            alt={interviews.problemFraming.alt}
            caption={interviews.problemFraming.caption}
          />

          <div className={styles.reframe}>
            <span className={styles.reframeLabel}>
              {interviews.reframe.label}
            </span>
            <p className={styles.reframeStatement}>
              {interviews.reframe.statement}
            </p>
            <p className={styles.reframeText}>{interviews.reframe.text}</p>
          </div>

          <h3 className={styles.subheading}>From insight to hypothesis</h3>
          <div className={styles.hypothesisWrap}>
            <CaseStudyImage
              src={interviews.hypothesis.src}
              alt={interviews.hypothesis.alt}
              caption={interviews.hypothesis.caption}
            />
          </div>
        </CaseStudySection>

        <div className={styles.beeWrap}>
          <BeeTrail
            {...BEE_PATHS.homeFeatured}
            decorative
            label="Bee flying from insights into persona"
          />
        </div>

        <CaseStudySection id="persona">
          <h2 className={styles.heading}>Persona</h2>
          <p className={styles.lead}>{persona.intro}</p>
          <CaseStudyImage
            src={persona.image.src}
            alt={persona.image.alt}
            caption={persona.image.caption}
          />
          <h3 className={styles.subheading}>
            Three profiles behind the persona
          </h3>
          <p className={styles.lead}>{persona.profilesIntro}</p>
          <div className={styles.profileGrid}>
            {persona.profiles.map((profile) => (
              <div key={profile.title} className={styles.profileCard}>
                <span className={styles.smallLabel}>{profile.label}</span>
                <h4 className={styles.profileTitle}>{profile.title}</h4>
                <p className={styles.profileText}>{profile.text}</p>
                <span className={styles.pill}>{profile.pill}</span>
              </div>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection id="decision-flow">
          <h2 className={styles.heading}>Where a Product Decision Loses User Insight</h2>
          <p className={styles.lead}>{decisionFlow.intro}</p>
          <div className={styles.flow}>
            {decisionFlow.rows.map((row) => (
              <div key={row.n} className={styles.flowRow}>
                <div className={styles.flowStep}>
                  <span className={styles.flowNum}>{row.n}</span>
                  <span className={styles.flowName}>{row.step}</span>
                </div>
                <div className={styles.flowPain}>{row.pain}</div>
                <div
                  className={`${styles.flowAdd}${row.dashed ? ` ${styles.flowAddDashed}` : ""}`}
                >
                  {row.add}
                </div>
              </div>
            ))}
          </div>
          <p className={styles.caption}>{decisionFlow.caption}</p>
        </CaseStudySection>

        <CaseStudySection id="delivery">
          <h2 className={styles.heading}>Delivery</h2>
          <p className={styles.lead}>{delivery.intro}</p>
          <div className={styles.deliveryGrid}>
            {delivery.cards.map((card) => (
              <div
                key={card.title}
                className={`${styles.deliveryCard}${card.dark ? ` ${styles.deliveryCardDark}` : ""}`}
              >
                <span className={styles.smallLabel}>{card.label}</span>
                <h3 className={styles.cardTitleLg}>{card.title}</h3>
                <p className={styles.cardText}>{card.text}</p>
              </div>
            ))}
          </div>
          <p className={styles.closing}>
            <strong>Eight workshops</strong> brought PMs to the forum, their
            buddies and the templates. One finding needed nothing new: the
            DeereUX site already existed, but few PMs knew it was there, so the
            programme pointed them to it.
          </p>
        </CaseStudySection>

        <div className={styles.beeWrap}>
          <BeeTrail
            {...BEE_PATHS.homeBridge}
            decorative
            label="Bee flying from delivery into impact"
          />
        </div>

        <CaseStudySection id="impact">
          <h2 className={styles.heading}>Impact</h2>
          <p className={styles.lead}>{impact.intro}</p>
          <div className={styles.impactTable}>
            {impact.rows.map((row) => (
              <div key={row.level} className={styles.impactRow}>
                <span className={styles.impactLevel}>{row.level}</span>
                <span className={styles.impactQuestion}>{row.question}</span>
                <p className={styles.impactEvidence}>{row.evidence}</p>
              </div>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection id="limitations">
          <h2 className={styles.heading}>Limitations</h2>
          <ul className={styles.bulletList}>
            {limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection id="lessons">
          <h2 className={styles.heading}>What This Project Taught Me</h2>
          <div className={styles.lessonGrid}>
            {lessons.map((lesson) => (
              <div key={lesson.title} className={styles.lessonCard}>
                <h3 className={styles.lessonTitle}>{lesson.title}</h3>
                <p className={styles.lessonText}>{lesson.text}</p>
              </div>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection id="next">
          <h2 className={styles.heading}>Next Steps</h2>
          <ul className={styles.bulletList}>
            {nextSteps.map((item) => (
              <li key={item.strong}>
                <strong>{item.strong}</strong> {item.text}
              </li>
            ))}
          </ul>
        </CaseStudySection>
      </CaseStudyLayout>
    </div>
  );
}
