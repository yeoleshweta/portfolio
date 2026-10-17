"use client";

import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import Link from "next/link";
import { motion, type Transition, type Variants } from "framer-motion";
import { useMotionOff } from "@/components/MotionControl";
import { CASE_STUDIES } from "@/lib/caseStudyMeta";
import {
  AbimCover,
  CoverFrame,
  FuelCover,
  JohnDeereSusCover,
  PersonalizationCover,
} from "@/components/covers";
import styles from "./FeaturedWork.module.css";

type FeaturedStudy = {
  slug: keyof typeof CASE_STUDIES;
  outcome: string;
  coverLabel: string;
  Cover: ComponentType;
};

const FEATURED: FeaturedStudy[] = [
  {
    slug: "john-deere-sus",
    outcome: CASE_STUDIES["john-deere-sus"].description,
    coverLabel:
      "Animated cover: When Did Better Actually Mean Better? A lilac SUS chart from 60 to 85.6 over eight months.",
    Cover: JohnDeereSusCover,
  },
  {
    slug: "fuel-design-system",
    outcome: CASE_STUDIES["fuel-design-system"].description,
    coverLabel:
      "Animated cover: Fuel Design System times Survey Platform. Tokens and components feed a survey card.",
    Cover: FuelCover,
  },
  {
    slug: "personalization",
    outcome: CASE_STUDIES.personalization.description,
    coverLabel:
      "Animated cover: What Analytics Couldn't Tell Us. An exit intercept plus a conversion chart lifting 5.8 percent.",
    Cover: PersonalizationCover,
  },
  {
    slug: "abim",
    outcome:
      "11 operationalized rubrics and an NLP pipeline applied across 985 physician conversations. Macro-F1 was 0.76.",
    coverLabel:
      "Animated cover: From Frameworks to F1 Scores. Conversations become a Calgary-Cambridge rubric and an F1 gauge.",
    Cover: AbimCover,
  },
];

const COUNT = FEATURED.length;
const EASE = [0.22, 1, 0.36, 1] as const;

function wrap(index: number) {
  return (index + COUNT) % COUNT;
}

function Arrow({ flip }: { flip?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d={flip ? "M19 12H5m5-5-5 5 5 5" : "M5 12h14m-5-5 5 5-5 5"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

/**
 * Next: the current card peels up and tucks away, revealing the full-size
 * card already underneath.
 * Back: that hinge-down was a broken reverse (the front card swung off the
 * deck). Instead the card that becomes current pops in front, above the
 * deck, then floats down into place. Same duration and ease as the peel.
 */
const stack: Variants = {
  rest: {
    y: "0%",
    rotateX: 0,
    scale: 1,
    transformOrigin: "50% 100%",
  },
  flipUp: {
    y: ["0%", "-38%", "-112%"],
    rotateX: [0, -16, -40],
    scale: [1, 0.98, 0.93],
    transformOrigin: "50% 100%",
  },
};

const arrive: Variants = {
  popped: {
    y: "-108%",
    scale: 0.98,
    x: 0,
    rotateX: 0,
    transformOrigin: "50% 50%",
  },
  floatDown: {
    y: ["-108%", "-96%", "0%"],
    scale: [0.98, 1.04, 1],
    x: [0, 0, 0],
    rotateX: [0, 0, 0],
    transformOrigin: "50% 50%",
  },
};

const instant: Transition = { duration: 0 };

function CoverLink({
  study,
  position,
  motionOff,
}: {
  study: FeaturedStudy;
  position: number;
  motionOff: boolean;
}) {
  const meta = CASE_STUDIES[study.slug];
  return (
    <Link
      href={`/work/${study.slug}`}
      className={styles.cardLink}
      data-track="project_card_click"
      data-track-project-slug={study.slug}
      data-track-project-title={meta.title}
      data-track-project-tag={meta.category}
      data-track-card-group="slider"
      data-track-card-position={position}
      data-track-location="featured_work"
    >
      <CoverFrame label={study.coverLabel} motionOff={motionOff}>
        <study.Cover />
      </CoverFrame>
    </Link>
  );
}

export default function FeaturedWork() {
  const motionOff = useMotionOff();
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [target, setTarget] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "out">("idle");
  const [interacted, setInteracted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<number | null>(null);

  const study = FEATURED[active];
  const incomingIndex = target ?? wrap(active + dir);
  const incoming = FEATURED[incomingIndex];
  const meta = CASE_STUDIES[study.slug];
  const goingNext = phase === "out" && dir > 0;
  const goingBack = phase === "out" && dir < 0;

  const transition: Transition = motionOff
    ? instant
    : { duration: 1.15, times: [0, 0.42, 1], ease: EASE };

  const floatTransition: Transition = motionOff
    ? instant
    : { duration: 1.15, times: [0, 0.18, 1], ease: EASE };

  const finish = useCallback(() => {
    const next = targetRef.current;
    targetRef.current = null;
    if (next !== null) setActive(next);
    setTarget(null);
    setPhase("idle");
  }, []);

  const announcement = interacted
    ? `Case study ${active + 1} of ${COUNT}: ${meta.title}`
    : "";

  const goTo = useCallback(
    (index: number, step: number) => {
      if (phase !== "idle" || index === active) return;
      setInteracted(true);
      if (motionOff) {
        setDir(step);
        setActive(index);
        return;
      }
      setDir(step);
      targetRef.current = index;
      setTarget(index);
      setPhase("out");
    },
    [active, motionOff, phase],
  );

  const go = useCallback(
    (step: number) => {
      goTo(wrap(active + step), step);
    },
    [active, goTo],
  );

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      go(event.key === "ArrowRight" ? 1 : -1);
    };
    el.addEventListener("keydown", onKeyDown);
    return () => el.removeEventListener("keydown", onKeyDown);
  }, [go]);

  return (
    <section
      id="work"
      className={styles.section}
      aria-labelledby="case-study-title"
      data-motion={motionOff ? "off" : "on"}
    >
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.orb} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{"// work archive · 4 stories"}</p>
          <h2 id="case-study-title" className={styles.title}>
            Case <span className={styles.titleItalic}>studies.</span>
          </h2>
          <p className={styles.lede}>
            Stories of curiosity, evidence, and design—turning complex human
            behavior into useful systems.
          </p>
        </header>

        <div
          ref={panelRef}
          className={styles.slider}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured case studies"
          tabIndex={0}
          data-study={study.slug}
        >
          <p className={styles.srOnly} aria-live="polite" aria-atomic="true">
            {announcement}
          </p>

          <div className={styles.deck} data-phase={phase} data-dir={dir}>
            <div className={styles.under} aria-hidden={phase === "idle"}>
              <CoverLink
                study={incoming}
                position={incomingIndex + 1}
                motionOff={motionOff}
              />
            </div>
            <motion.div
              key={study.slug}
              className={styles.front}
              variants={stack}
              initial={false}
              animate={goingNext ? "flipUp" : "rest"}
              transition={transition}
              style={{ transformPerspective: 1600 }}
              onAnimationComplete={(definition) => {
                if (definition !== "flipUp") return;
                finish();
              }}
            >
              <CoverLink
                study={study}
                position={active + 1}
                motionOff={motionOff}
              />
            </motion.div>
            {goingBack ? (
              <motion.div
                className={`${styles.front} ${styles.arriving}`}
                variants={arrive}
                initial="popped"
                animate="floatDown"
                transition={floatTransition}
                style={{ transformPerspective: 1600, x: 0 }}
                onAnimationComplete={(definition) => {
                  if (definition !== "floatDown") return;
                  finish();
                }}
              >
                <CoverLink
                  study={incoming}
                  position={incomingIndex + 1}
                  motionOff={motionOff}
                />
              </motion.div>
            ) : null}
          </div>

          <div className={styles.nav}>
            <button
              type="button"
              className={styles.arrow}
              aria-label="Previous case study"
              data-track="carousel_scroll"
              data-track-direction="left"
              data-track-location="featured_work"
              onClick={() => go(-1)}
            >
              <Arrow flip />
            </button>
            <div className={styles.dots} role="tablist" aria-label="Case studies">
              {FEATURED.map((item, index) => (
                <button
                  key={item.slug}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-label={`${CASE_STUDIES[item.slug].title}, ${index + 1} of ${COUNT}`}
                  className={styles.dot}
                  data-active={index === active ? "true" : "false"}
                  data-track="carousel_scroll"
                  data-track-direction="dot"
                  data-track-location="featured_work"
                  onClick={() => goTo(index, index > active ? 1 : -1)}
                />
              ))}
            </div>
            <button
              type="button"
              className={styles.arrow}
              aria-label="Next case study"
              data-track="carousel_scroll"
              data-track-direction="right"
              data-track-location="featured_work"
              onClick={() => go(1)}
            >
              <Arrow />
            </button>
          </div>

          <div className={styles.mobileCopy}>
            <h3 className={styles.studyTitle}>{meta.title}</h3>
            <p className={styles.outcome}>{study.outcome}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
