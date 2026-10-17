"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMotionOff } from "@/components/MotionControl";
import styles from "./FeaturedWork.module.css";

type Accent = "violet" | "gold" | "green" | "coral";

type Study = {
  slug: string;
  title: string;
  category: string;
  metric: string;
  blurb: string;
  code: string;
  image?: string;
  imageAlt?: string;
  /** Width / height, so the card matches the file instead of cropping it. */
  ratio?: string;
  accent: Accent;
};

const STUDIES: Study[] = [
  {
    slug: "john-deere-sus",
    title: "When Did Better Actually Mean Better?",
    category: "Mixed Methods",
    metric: "SUS 60 → 85.6",
    blurb:
      "A two-wave usability study of ABTools raised SUS from 60 to 85.6.",
    code: "ABTOOLS",
    image: "/assets/abtools_usability_study.jpg",
    imageAlt:
      "Chart of the ABTools usability score rising from 60 to 85.6 over eight months",
    ratio: "1376 / 768",
    accent: "violet",
  },
  {
    slug: "fuel-design-system",
    title: "Fuel Design System",
    category: "Design Systems",
    metric: "100+ screens on one system",
    blurb:
      "A shared Fuel component system brought more than 100 John Deere screens onto one specification.",
    code: "FUEL",
    image: "/assets/fuel/hires-dashboard.jpg",
    imageAlt:
      "John Deere program dashboard showing project status, risks, and delivery",
    ratio: "3338 / 2160",
    accent: "green",
  },
  {
    slug: "personalization",
    title: "What Analytics Couldn't Tell Us",
    category: "Quantitative / Experimentation",
    metric: "+5.8% conversion",
    blurb:
      "Pairing exit intercepts with behavioral data at Topshop produced a 5.8% conversion lift.",
    code: "TOPSHOP",
    image: "/assets/personalization-hero.png",
    imageAlt: "Illustration of shoppers, products, and a conversion funnel",
    ratio: "1 / 1",
    accent: "coral",
  },
  {
    slug: "abim",
    title: "From Frameworks to F1 Scores",
    category: "AI / ML Research",
    metric: "985 conversations",
    blurb:
      "A rubric-grounded NLP pipeline that scores patient-centered communication in clinical transcripts.",
    code: "ABIM–2025",
    image: "/assets/abim-hero.png",
    imageAlt:
      "Illustration of a clinical transcript connected to a neural network, with a stethoscope",
    ratio: "1 / 1",
    accent: "violet",
  },
  {
    slug: "pm-ux-study",
    title: "No UX, No Problem?",
    category: "Qualitative Research",
    metric: "8 PM interviews",
    blurb:
      "Eight interviews with John Deere product managers led to a community forum and a monthly PM cohort.",
    code: "JOHN–DEERE",
    image: "/assets/pm-persona-board.jpg",
    imageAlt:
      "Research board for the product-manager study, with a persona card for Rajesh and clusters of needs and pain points",
    ratio: "1024 / 636",
    accent: "gold",
  },
  {
    slug: "healthcare-bias",
    title: "Detecting Healthcare Bias",
    category: "AI / ML Research",
    metric: "4-label framework",
    blurb:
      "An NLP model that flags biased language in clinical text using a four-label framework.",
    code: "HEALTH–AI",
    image: "/assets/healthcare-bias-hero.png",
    imageAlt: "Illustration of a brain and clinical charts in a glass laboratory",
    ratio: "1 / 1",
    accent: "green",
  },
  {
    slug: "gesturepro",
    title: "GesturePro",
    category: "AI / ML Research",
    metric: "Real-time, zero hardware",
    blurb:
      "A real-time sign-language translation prototype that runs on a camera, with no extra hardware.",
    code: "GESTUREPRO",
    image: "/assets/gesturepro-hero.png",
    imageAlt:
      "Illustration of hands forming signs, traced with a motion mesh, beside a speech bubble",
    accent: "gold",
  },
  {
    slug: "miss-selfridge",
    title: "Would They Have Bought Anyway?",
    category: "Quantitative / Experimentation",
    metric: "47% new customer rate",
    blurb:
      "An incrementality test found that 47% of campaign-driven Miss Selfridge purchases came from new customers.",
    code: "MISS SELFRIDGE",
    accent: "green",
  },
  {
    slug: "dorothy-perkins",
    title: "Why Were Students Not Saving?",
    category: "Quantitative / Experimentation",
    metric: "Segmented 50% of UK sales",
    blurb:
      "Segment-aware personalization made a student discount and regional ranking visible at Dorothy Perkins.",
    code: "DOROTHY PERKINS",
    accent: "coral",
  },
  {
    slug: "evans",
    title: "Do Small Wins Compound?",
    category: "Quantitative / Experimentation",
    metric: "2.5% to 8.43% RPV uplift",
    blurb:
      "Six measured experiments at Evans each lifted revenue per visitor under one commercial metric.",
    code: "EVANS",
    accent: "violet",
  },
  {
    slug: "burton",
    title: "Should the Homepage Check the Forecast?",
    category: "Quantitative / Experimentation",
    metric: "+11.6% conversion lift",
    blurb:
      "Weather and location personalization on Burton's homepage lifted conversion by 11.6%.",
    code: "BURTON",
    accent: "gold",
  },
  {
    slug: "team-contract",
    title: "Team Contract",
    category: "Qualitative Research",
    metric: "9 participants · ~230 observations",
    blurb:
      "Research with nine participants turned program metrics into numbers managers could defend.",
    code: "TEAM CONTRACT",
    image: "/assets/team-contract/01-hero-team-contract-overview.png",
    imageAlt:
      "Team Contract metrics screen with targets, bounds, and status for a John Deere program",
    accent: "coral",
  },
];

const FEATURED = STUDIES.slice(0, 4);

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

function ForwardArrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12h14m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function trackProps(study: Study, group: string, position: number) {
  return {
    "data-track": "project_card_click",
    "data-track-project-slug": study.slug,
    "data-track-project-title": study.title,
    "data-track-project-tag": study.category,
    "data-track-card-group": group,
    "data-track-card-position": position,
    "data-track-location": "featured_work",
  };
}

export default function FeaturedWork() {
  const motionOff = useMotionOff();
  const [activeSlide, setActiveSlide] = useState(0);
  const [preview, setPreview] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const update = () => {
      const cards = [...el.querySelectorAll<HTMLElement>("[data-slide]")];
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, index) => {
        const dist = Math.abs(card.offsetLeft - el.scrollLeft - 40);
        if (dist < bestDist) {
          bestDist = dist;
          best = index;
        }
      });
      setActiveSlide((current) => (current === best ? current : best));
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, []);

  const goToSlide = (index: number) => {
    const el = sliderRef.current;
    const card = el?.querySelectorAll<HTMLElement>("[data-slide]")[index];
    if (!el || !card) return;
    const left = card.offsetLeft - (el.clientWidth - card.clientWidth) / 2;
    el.scrollTo({ left, behavior: motionOff ? "auto" : "smooth" });
    setActiveSlide(index);
  };

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
          <div>
            <p className={styles.eyebrow}>// work archive · 4 stories</p>
            <h2 id="case-study-title" className={styles.title}>
              Case <span className={styles.titleItalic}>studies.</span>
            </h2>
            <p className={styles.lede}>
              Stories of curiosity, evidence, and design—turning complex human
              behavior into useful systems.
            </p>
          </div>
        </header>

        <div className={styles.sliderShell}>
              <div
                ref={sliderRef}
                className={styles.slider}
                data-lenis-prevent
              >
                {FEATURED.map((study, index) => (
                  <Link
                    key={study.slug}
                    href={`/work/${study.slug}`}
                    className={styles.slide}
                    data-slide
                    style={{ ["--slide-ratio" as string]: study.ratio ?? "1 / 1" }}
                    {...trackProps(study, "slider", index + 1)}
                  >
                    <div className={styles.media}>
                      <Image
                        src={study.image!}
                        alt={study.imageAlt!}
                        fill
                        sizes="(max-width: 979px) 88vw, 62vw"
                        className={styles.photo}
                      />
                    </div>
                    <div className={styles.slideBody}>
                      <p className={styles.slideKicker}>
                        <span className={styles.kickerDot} data-accent={study.accent} aria-hidden="true" />
                        {study.category}
                      </p>
                      <div>
                        <p className={styles.slideCode}>
                          {pad(index)} — {study.code}
                        </p>
                        <h3 className={styles.slideTitle}>{study.title}</h3>
                        <p className={styles.slideBlurb}>{study.blurb}</p>
                        <span className={styles.read}>
                          Read case study
                          <span className={styles.readIcon}>
                            <ForwardArrow />
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className={styles.sliderBar}>
                <div className={styles.dots} role="group" aria-label="Case study slides">
                  {FEATURED.map((study, index) => (
                    <button
                      key={study.slug}
                      type="button"
                      className={index === activeSlide ? styles.dotOn : styles.dot}
                      aria-label={`Go to case study ${index + 1}`}
                      aria-current={index === activeSlide ? "true" : undefined}
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </div>
                <div className={styles.sliderArrows}>
                  <button
                    type="button"
                    className={styles.arrow}
                    aria-label="Previous case study"
                    disabled={activeSlide === 0}
                    data-track="carousel_scroll"
                    data-track-direction="left"
                    data-track-location="featured_work"
                    onClick={() => goToSlide(activeSlide - 1)}
                  >
                    <span className={styles.arrowFlip}>
                      <ForwardArrow />
                    </span>
                  </button>
                  <button
                    type="button"
                    className={styles.arrow}
                    aria-label="Next case study"
                    disabled={activeSlide === FEATURED.length - 1}
                    data-track="carousel_scroll"
                    data-track-direction="right"
                    data-track-location="featured_work"
                    onClick={() => goToSlide(activeSlide + 1)}
                  >
                    <ForwardArrow />
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.index}>
              <div className={styles.previewColumn}>
                <div
                  className={styles.preview}
                  aria-hidden="true"
                  style={{ ["--preview-ratio" as string]: FEATURED[preview].ratio ?? "1 / 1" }}
                >
                  {FEATURED.map((study, index) => (
                    <div
                      key={study.slug}
                      className={styles.previewFrame}
                      data-active={index === preview ? "true" : "false"}
                      data-accent={study.accent}
                    >
                      {study.image ? (
                        <Image
                          src={study.image}
                          alt=""
                          fill
                          sizes="(max-width: 979px) 100vw, 46vw"
                          className={styles.photo}
                        />
                      ) : (
                        <div className={styles.fallback}>
                          <p className={styles.fallbackCode}>{study.code}</p>
                          <p className={styles.fallbackMetric}>{study.metric}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className={styles.previewCaption}>
                  Previewing — {FEATURED[preview].code}
                </p>
              </div>
              <div className={styles.rows}>
                {FEATURED.map((study, index) => (
                  <Link
                    key={study.slug}
                    href={`/work/${study.slug}`}
                    className={styles.row}
                    onMouseEnter={() => setPreview(index)}
                    onFocus={() => setPreview(index)}
                    {...trackProps(study, "index", index + 1)}
                  >
                    <span className={styles.num} data-accent={study.accent}>
                      {pad(index)}
                    </span>
                    <span className={styles.rowBody}>
                      <span className={styles.rowCat}>{study.category}</span>
                      <h3 className={styles.rowTitle}>{study.title}</h3>
                      <span className={styles.rowMetric}>{study.metric}</span>
                    </span>
                    <span className={styles.rowArrow}>
                      <ForwardArrow />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

        <div className={styles.footer}>
          <p className={styles.footerAccent}>UXR · AI/ML · Product</p>
        </div>
      </div>
    </section>
  );
}
