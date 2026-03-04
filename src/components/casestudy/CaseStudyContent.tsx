"use client";

import React from "react";
import styles from "./CaseStudyContent.module.css";
import { motion, AnimatePresence } from "framer-motion";

interface SectionProps {
  id?: string;
  label?: string;
  heading?: string;
  children: React.ReactNode;
}

export function CaseStudySection({
  id,
  label,
  heading,
  children,
}: SectionProps) {
  return (
    <section id={id} className={styles.section}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className={styles.container}
      >
        {label && <span className={styles.label}>{label}</span>}
        {heading && <h2 className={styles.heading}>{heading}</h2>}
        <div className={styles.content}>{children}</div>
      </motion.div>
    </section>
  );
}

export function ContextCard({ title, text }: { title: string; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={styles.card}
    >
      <span className={styles.cardTitle}>{title}</span>
      <p className={styles.cardText}>{text}</p>
    </motion.div>
  );
}

export function ResultsGrid({
  items,
}: {
  items: { label: string; value: string; description: string }[];
}) {
  return (
    <div className={styles.resultsGrid}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className={styles.resultItem}
        >
          <span className={styles.resultValue}>{item.value}</span>
          <span className={styles.resultLabel}>{item.label}</span>
          <p className={styles.resultDescription}>{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function CaseStudyImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={styles.imageContainer}
    >
      <img src={src} alt={alt} className={styles.image} />
      {caption && <div className={styles.imageCaption}>{caption}</div>}
    </motion.div>
  );
}

export interface PersonaProps {
  name?: string;
  role?: string;
  photoSrc?: string;
  demographics?: string[];
  behaviors?: string[];
  frustrations?: string[];
  goals?: string[];
}

export function PersonaCardActual({
  name = "Rajesh",
  role = "The Product Manager",
  photoSrc = "/rajesh_portrait_hd.png",
  demographics = [
    "38 yrs. old",
    "4 Years as product manager",
    "Loves to read, travel and play cricket.",
    "Extrovert",
    "Married – 2 kids",
  ],
  behaviors = [
    "Willing to Learn/Upskill",
    "Workaholic",
    "Seeks advice from other PMs or GPMs",
    "Keen on leadership",
  ],
  frustrations = [
    "Benchmarking/ repository of best practices",
    "No PM forums",
    "Don't know how to utilize P&C team",
    "Need help with research",
    "Do not know how to analyze data",
    "Do not know how to proceed in career/aim",
    "Technical challenges when not from tech background",
    "Right Courses for PM",
  ],
  goals = [
    "Wants to understand career options for PM",
    "UX Support",
    "Set path and direction for new PMs in the role",
    "Gain better understanding on the technical side",
  ],
}: PersonaProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={styles.personaCardWrapper}
    >
      <div className={styles.personaSidebar}>
        <div className={styles.personaHeader}>
          <h3 className={styles.personaName}>{name}</h3>
          <p className={styles.personaRole}>{role}</p>
        </div>
        <div className={styles.personaImageWrapper}>
          <img
            src={photoSrc}
            alt={`${name} Portrait`}
            className={styles.personaPhoto}
          />
        </div>
        <div className={styles.personaSectionBottom}>
          <h4 className={styles.personaSectionTitleSide}>
            Demographics &<br />
            Personality / Lifestyle
          </h4>
          <ul className={styles.personaListSide}>
            {demographics.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.personaMainContent}>
        <div className={styles.personaColLeft}>
          <div className={styles.personaBox}>
            <h4 className={styles.personaBoxTitle}>Behaviors & Actions</h4>
            <ul className={styles.personaListMain}>
              {behaviors.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.personaBox}>
            <h4 className={styles.personaBoxTitle}>Expectations / Gains</h4>
            <ul className={styles.personaListMain}>
              {goals.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.personaColRight}>
          <div className={styles.personaBox} style={{ height: "100%" }}>
            <h4 className={styles.personaBoxTitle}>Pain Points/Challenges</h4>
            <ul className={styles.personaListMain}>
              {frustrations.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function PersonaProgress({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "14px",
        }}
      >
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className={styles.personaBarContainer}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className={styles.personaBarFill}
        />
      </div>
    </div>
  );
}
export function DoubleDiamondCarousel({
  stages,
}: {
  stages: {
    title: string;
    label: string;
    activities: string[];
    icon?: string;
  }[];
}) {
  const [[index, direction], setTuple] = React.useState([0, 1]);
  const [isPaused, setIsPaused] = React.useState(false);

  const paginate = React.useCallback(
    (newDirection: number) => {
      setTuple((prev) => {
        const nextIndex =
          (prev[0] + newDirection + stages.length) % stages.length;
        return [nextIndex, newDirection];
      });
    },
    [stages.length],
  );

  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, paginate]);

  const stage = stages[index];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div
      className={styles.carouselWrapper}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.watermark}>
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className={styles.carouselContent}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={styles.slideCard}
          >
            <span className={styles.slideLabel}>{stage.label}</span>
            <h3 className={styles.slideTitle}>{stage.title}</h3>
            <div className={styles.slideList}>
              {stage.activities.map((activity, j) => (
                <div key={j} className={styles.slideListItem}>
                  <svg
                    className={styles.slideListItemIcon}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>{activity}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.controls}>
        <div className={styles.dots}>
          {stages.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
              onClick={() => {
                const dir = i > index ? 1 : i < index ? -1 : 0;
                if (dir !== 0) setTuple([i, dir]);
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <div className={styles.navButtons}>
          <button
            onClick={() => paginate(-1)}
            className={styles.navBtn}
            aria-label="Previous slide"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </button>
          <button
            onClick={() => paginate(1)}
            className={styles.navBtn}
            aria-label="Next slide"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function Blockquote({
  text,
  author,
}: {
  text: string;
  author?: string;
}) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={styles.blockquote}
    >
      <p>{text}</p>
      {author && <cite>— {author}</cite>}
    </motion.blockquote>
  );
}

export function InteractiveBarChart({
  data,
}: {
  data: { label: string; value: number; color?: string }[];
}) {
  return (
    <div className={styles.chartContainer}>
      {data.map((item, i) => (
        <div key={i} className={styles.chartRow}>
          <div className={styles.chartInfo}>
            <span className={styles.chartLabel}>{item.label}</span>
            <span className={styles.chartValue}>{item.value}%</span>
          </div>
          <div className={styles.chartBarBg}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${item.value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
              className={styles.chartBarFill}
              style={{ background: item.color || "var(--color-accent)" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ----- NEW: Figma Analytics Mockup Components -----
export function AnimatedLineChart() {
  const points =
    "0,150 50,50 100,120 150,40 200,90 250,50 300,140 350,40 400,100";
  const points2 =
    "0,90 50,110 100,60 150,140 200,80 250,110 300,60 350,130 400,80";

  return (
    <div className={styles.analyticsCard}>
      <h5 className={styles.analyticsTitle}>
        Surveys received and abandons over time
      </h5>
      <svg viewBox="-10 -10 420 180" className={styles.analyticsSvg}>
        {/* Grid Lines */}
        {[0, 40, 80, 120, 160].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="400"
            y2={y}
            stroke="#e0e0e0"
            strokeWidth="1"
          />
        ))}
        {/* Vertical Lines */}
        {[0, 50, 100, 150, 200, 250, 300, 350, 400].map((x) => (
          <line
            key={x}
            x1={x}
            y1="0"
            x2={x}
            y2="160"
            stroke="#f5f5f5"
            strokeWidth="1"
          />
        ))}
        {/* Axes Labels */}
        <text
          x="-15"
          y="80"
          transform="rotate(-90 -15,80)"
          fontSize="10"
          fill="#666"
          textAnchor="middle"
          fontWeight="bold"
        >
          # of surveys
        </text>
        <text
          x="200"
          y="175"
          fontSize="10"
          fill="#666"
          textAnchor="middle"
          fontWeight="bold"
        >
          Surveys received / abandons
        </text>

        {/* Data Line 1 (Emerald) */}
        <motion.polyline
          points={points}
          fill="none"
          stroke="#11a961"
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        {/* Data Points for Line 1 */}
        {points.split(" ").map((pt, i) => (
          <motion.circle
            key={`c1-${i}`}
            cx={pt.split(",")[0]}
            cy={pt.split(",")[1]}
            r="4"
            fill="white"
            stroke="#11a961"
            strokeWidth="2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 + i * 0.05 }}
          />
        ))}

        {/* Data Line 2 (Slate/Mint) */}
        <motion.polyline
          points={points2}
          fill="none"
          stroke="#85e0af"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        />
        {/* Data Points for Line 2 */}
        {points2.split(" ").map((pt, i) => (
          <motion.circle
            key={`c2-${i}`}
            cx={pt.split(",")[0]}
            cy={pt.split(",")[1]}
            r="3"
            fill="white"
            stroke="#85e0af"
            strokeWidth="1.5"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.7 + i * 0.05 }}
          />
        ))}
      </svg>
    </div>
  );
}

export function AnimatedAnalyticsBarChart() {
  const data = [
    { height: 80, color: "#11a961" },
    { height: 30, color: "#2cc97e" },
    { height: 40, color: "#61e0a2" },
    { height: 80, color: "#aef5d1" },
    { height: 60, color: "#1a1c20" },
    { height: 50, color: "#323740" },
    { height: 110, color: "#545c6a" },
    { height: 150, color: "#8a94a6" },
    { height: 30, color: "#b9c2ce" },
  ];

  return (
    <div className={styles.analyticsCard}>
      <h5 className={styles.analyticsTitle} style={{ color: "#1a1c20" }}>
        Placeholder
      </h5>
      <svg viewBox="-10 -10 420 180" className={styles.analyticsSvg}>
        {/* Grid Lines */}
        {[0, 40, 80, 120, 160].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="400"
            y2={y}
            stroke="#e0e0e0"
            strokeWidth="1"
          />
        ))}
        {/* Vertical Lines */}
        {[0, 44, 88, 132, 176, 220, 264, 308, 352, 396].map((x) => (
          <line
            key={x}
            x1={x}
            y1="0"
            x2={x}
            y2="160"
            stroke="#f5f5f5"
            strokeWidth="1"
          />
        ))}

        {/* Y Axis Labels */}
        <text x="-5" y="5" fontSize="10" fill="#1a1c20" textAnchor="end">
          1000
        </text>
        <text x="-5" y="45" fontSize="10" fill="#1a1c20" textAnchor="end">
          750
        </text>
        <text x="-5" y="85" fontSize="10" fill="#1a1c20" textAnchor="end">
          500
        </text>
        <text x="-5" y="125" fontSize="10" fill="#1a1c20" textAnchor="end">
          250
        </text>
        <text x="-5" y="160" fontSize="10" fill="#1a1c20" textAnchor="end">
          0
        </text>

        {/* Bars */}
        {data.map((bar, i) => {
          const x = i * 44 + 5;
          const y = 160 - bar.height;
          return (
            <motion.rect
              key={i}
              x={x}
              y={y}
              width="34"
              height={bar.height}
              fill={bar.color}
              initial={{ height: 0, y: 160 }}
              whileInView={{ height: bar.height, y: y }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                type: "spring",
                bounce: 0.2,
              }}
            />
          );
        })}
        {/* X Axis Labels */}
        {data.map((_, i) => (
          <text
            key={`xl-${i}`}
            x={i * 44 + 22}
            y="175"
            fontSize="10"
            fill="#1a1c20"
            textAnchor="middle"
          >
            {i}
          </text>
        ))}
      </svg>
    </div>
  );
}

export function ExpandableSurveyRow() {
  const [expanded, setExpanded] = React.useState(true); // Open by default for demo
  return (
    <motion.div
      className={styles.surveyRowWrapper}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div
        className={styles.surveyRowHeader}
        onClick={() => setExpanded(!expanded)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            width: "160px",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
              color: "#1a1c20",
            }}
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
          <span style={{ fontWeight: 700, color: "#1a1c20" }}>
            Customer Exp
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "40px",
            flex: 1,
            color: "#1a1c20",
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          <span style={{ color: "#1a1c20" }}>345</span>
          <span style={{ color: "#11a961", fontWeight: 700 }}>59</span>
          <span style={{ color: "#1a1c20", fontWeight: 700 }}>72.5%</span>
          <span
            style={{
              color: "rgba(26,28,32,0.6)",
              fontSize: "12px",
              width: "120px",
              fontWeight: 600,
            }}
          >
            01.12.2024 20:00PM
          </span>
          <span
            style={{
              color: "rgba(26,28,32,0.6)",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            Internal
          </span>
          <span
            style={{
              color: "rgba(26,28,32,0.6)",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            DP14539
          </span>
          <span
            style={{
              color: "rgba(26,28,32,0.6)",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            AP12684
          </span>
        </div>
        <div
          style={{ display: "flex", gap: "12px", color: "rgba(26,28,32,0.4)" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          <div
            style={{
              width: "28px",
              height: "16px",
              background: "#ccc",
              borderRadius: "12px",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                background: "white",
                borderRadius: "50%",
                position: "absolute",
                top: "2px",
                left: "2px",
              }}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: "hidden" }}
          >
            <div className={styles.surveyRowBody}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "24px",
                }}
              >
                <AnimatedLineChart />
                <AnimatedAnalyticsBarChart />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function AnimatedComparison({
  metric,
  baseline,
  baselineLabel,
  target,
  targetLabel,
  inverse = false,
}: {
  metric: string;
  baseline: number;
  baselineLabel: string;
  target: number;
  targetLabel: string;
  inverse?: boolean;
}) {
  const max = Math.max(baseline, target);
  return (
    <div
      style={{
        marginBottom: "24px",
        background: "var(--color-bg)",
        padding: "24px",
        borderRadius: "12px",
        border: "1px solid var(--color-border)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
      }}
    >
      <h4
        style={{
          margin: "0 0 20px 0",
          fontSize: "16px",
          color: "var(--color-text)",
        }}
      >
        {metric}
      </h4>

      {/* Baseline */}
      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
            marginBottom: "8px",
          }}
        >
          <span
            style={{ color: "var(--color-text-secondary)", fontWeight: 500 }}
          >
            Baseline
          </span>
          <span
            style={{
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
            }}
          >
            {baselineLabel}
          </span>
        </div>
        <div
          style={{
            height: "16px",
            background: "rgba(0,0,0,0.04)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${(baseline / max) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              height: "100%",
              background: inverse ? "#ff6b6b" : "#ccc",
              borderRadius: "8px",
            }}
          />
        </div>
      </div>

      {/* Target */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontWeight: 600, color: "var(--color-text)" }}>
            Target
          </span>
          <span
            style={{
              fontWeight: 800,
              color: inverse ? "#11a961" : "var(--color-accent)",
              fontFamily: "var(--font-display)",
            }}
          >
            {targetLabel}
          </span>
        </div>
        <div
          style={{
            height: "16px",
            background: "rgba(0,0,0,0.04)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${(target / max) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            style={{
              height: "100%",
              background: inverse ? "#11a961" : "var(--color-accent)",
              borderRadius: "8px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// --- NEW COMPONENT: Baseline vs Target Metrics ---
interface BaselineTargetItem {
  label: string;
  baseline: string;
  target: string;
  fillPercentage: number; // 0 to 100 for the visual bar length
}

export function BaselineTargetMetrics({
  items,
}: {
  items: BaselineTargetItem[];
}) {
  return (
    <div className={styles.metricsModal}>
      {items.map((item, index) => (
        <div key={index} className={styles.metricRow}>
          <div className={styles.metricHeader}>
            <h4 className={styles.metricTitle}>{item.label}</h4>
            <div className={styles.metricValues}>
              <div className={styles.metricStat}>
                <span className={styles.statLabel}>Baseline</span>
                <span className={styles.statValue}>{item.baseline}</span>
              </div>
              <div className={styles.metricArrow}>→</div>
              <div className={styles.metricStat}>
                <span className={styles.statLabel}>Target</span>
                <span
                  className={styles.statValue}
                  style={{ color: "#11a961", fontWeight: 700 }}
                >
                  {item.target}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.metricTrack}>
            <motion.div
              className={styles.metricFill}
              initial={{ width: 0 }}
              whileInView={{ width: `${item.fillPercentage}%` }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// --- NEW COMPONENT: Old vs New Workflow Comparison ---
const oldWorkflowNodes = [
  { title: "Create Question 1", desc: null as string | null, alert: false },
  { title: "Save & Switch to 'Logic' Tab", desc: "Context switch", alert: true },
  { title: "Lookup Question ID (Q1)", desc: "High cognitive load", alert: true },
  { title: "Write Rule: If Q1 = Yes, goto Q4", desc: null as string | null, alert: false },
];

const newWorkflowNodes = [
  { title: "Create Question 1", desc: null as string | null, success: false },
  { title: "Click 'Add Branch' Inline", desc: "Zero context switch", success: true },
  { title: "Select Target (Q4) from Dropdown", desc: "Visual mapping", success: true },
];

export function WorkflowComparison() {
  return (
    <div className={styles.workflowComparison}>
      <div className={styles.workflowColumnOld}>
        <div className={styles.workflowTagOld}>Before (Legacy Workflow)</div>
        <div className={styles.workflowFlow}>
          {oldWorkflowNodes.map((node, i) => (
            <React.Fragment key={i}>
              <motion.div
                className={`${styles.workflowNode} ${node.alert ? styles.nodeAlert : styles.nodeStandardOld}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className={styles.workflowNodeTitle}>{node.title}</div>
                {node.desc && <div className={styles.workflowNodeDescAlert}>{node.desc}</div>}
              </motion.div>
              {i < oldWorkflowNodes.length - 1 && (
                <div className={styles.workflowArrowOld}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4L12 20M12 20L6 14M12 20L18 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <p className={styles.workflowCaption}>
          Fragmented cognitive load: Users had to memorize question IDs and navigate across multiple disconnected tabs to link logic paths.
        </p>
      </div>

      <div className={styles.workflowColumnNew}>
        <div className={styles.workflowTagNew}>After (Redesigned Workflow)</div>
        <div className={styles.workflowFlow}>
          {newWorkflowNodes.map((node, i) => (
            <React.Fragment key={i}>
              <motion.div
                className={`${styles.workflowNode} ${node.success ? styles.nodeSuccess : styles.nodeStandardNew}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
              >
                <div className={styles.workflowNodeTitle}>{node.title}</div>
                {node.desc && <div className={styles.workflowNodeDescSuccess}>{node.desc}</div>}
              </motion.div>
              {i < newWorkflowNodes.length - 1 && (
                <div className={styles.workflowArrowNew}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4L12 20M12 20L6 14M12 20L18 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <p className={styles.workflowCaption}>
          Contextual execution: Branching rules are defined directly inline with the question, dropping cognitive load entirely.
        </p>
      </div>
    </div>
  );
}
