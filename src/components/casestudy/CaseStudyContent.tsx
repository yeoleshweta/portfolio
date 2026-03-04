"use client";

import React from "react";
import styles from "./CaseStudyContent.module.css";
import { motion } from "framer-motion";

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
  const [index, setIndex] = React.useState(0);
  const trackRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % stages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [stages.length]);

  React.useEffect(() => {
    if (trackRef.current) {
      const card = trackRef.current.children[index] as HTMLElement;
      if (card) {
        trackRef.current.scrollTo({
          left: card.offsetLeft - 24,
          behavior: "smooth",
        });
      }
    }
  }, [index]);

  return (
    <div className={styles.hCarouselContainer}>
      <div className={styles.hCarouselTrack} ref={trackRef}>
        {stages.map((stage, i) => (
          <motion.div
            key={stage.title}
            className={`${styles.hCarouselCard} ${i === index ? styles.hCarouselCardActive : ""}`}
            onClick={() => setIndex(i)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <span className={styles.hCarouselPhase}>{stage.label}</span>
            <h3 className={styles.hCarouselTitle}>{stage.title}</h3>
            <ul className={styles.hCarouselList}>
              {stage.activities.map((activity, j) => (
                <li key={j}>{activity}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <div className={styles.hCarouselProgress}>
        {stages.map((_, i) => (
          <button
            key={i}
            className={`${styles.hCarouselDot} ${i === index ? styles.hCarouselDotActive : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
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
