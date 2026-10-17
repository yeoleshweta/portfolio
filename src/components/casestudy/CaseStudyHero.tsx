"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./CaseStudyHero.module.css";
import { motion, useReducedMotion } from "framer-motion";
import { studyFromPath } from "@/content/caseStudyBriefs";

interface CaseStudyHeroProps {
  title: string;
  category: string;
  role: string;
  team: string;
  timeline: string;
  method?: string;
  subtitle?: string;
  children?: React.ReactNode;
  image?: string;
  isVideo?: boolean;
  videoUrl?: string;
  isSmallImage?: boolean;
  /** Soft grid + purple glow used by ABTools hero */
  variant?: "default" | "abtools";
}

export default function CaseStudyHero({
  title,
  category,
  role,
  team,
  timeline,
  method,
  subtitle,
  children,
  image,
  isVideo = false,
  videoUrl,
  isSmallImage = false,
  variant = "default",
}: CaseStudyHeroProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const pathname = usePathname();
  const brief = studyFromPath(pathname);
  const summaryLine =
    subtitle ?? (brief?.kind === "featured" ? brief.summary : undefined);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(!reduceMotion);
  const [minutes, setMinutes] = useState<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion) {
      video.pause();
      setPlaying(false);
      return;
    }
    video.play().catch(() => setPlaying(false));
    setPlaying(true);
  }, [reduceMotion, videoUrl]);

  useEffect(() => {
    const measure = () => {
      const body = document.querySelector<HTMLElement>("[data-case-study-body]");
      const text = body?.innerText ?? "";
      const words = text.trim().split(/\s+/).filter(Boolean).length;
      setMinutes(words ? Math.max(1, Math.round(words / 220)) : null);
    };
    measure();
    const timer = window.setTimeout(measure, 400);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => undefined);
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      className={`${styles.hero}${variant === "abtools" ? ` ${styles.abtools}` : ""}`}
      id="top"
      data-case-study-hero
    >
      <div className={styles.header}>
        {category && (
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={styles.category}
          >
            {category}
          </motion.span>
        )}
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className={`${styles.title}${variant === "abtools" ? ` ${styles.titleGlow}` : ""}`}
        >
          {title}
        </motion.h1>

        {minutes ? (
          <p className={styles.readingTime}>{minutes} min read</p>
        ) : null}

        {summaryLine ? (
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: "easeOut" }}
            className={styles.subtitle}
          >
            {summaryLine}
          </motion.p>
        ) : null}

        {children ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: "easeOut" }}
            className={styles.heroExtra}
          >
            {children}
          </motion.div>
        ) : null}

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.44, ease: "easeOut" }}
          className={styles.meta}
        >
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Role</span>
            <span className={styles.metaValue}>{role}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Team</span>
            <span className={styles.metaValue}>{team}</span>
          </div>
          {method ? (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Method</span>
              <span className={styles.metaValue}>{method}</span>
            </div>
          ) : null}
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Timeline</span>
            <span className={styles.metaValue}>{timeline}</span>
          </div>
        </motion.div>
      </div>

      {(image || (isVideo && videoUrl)) && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`${styles.mockupContainer} ${isSmallImage ? styles.smallMockup : ""}`}
        >
          {isVideo && videoUrl ? (
            <div className={styles.laptopMockup}>
              <div className={styles.laptopScreen}>
                <div className={styles.webcam} aria-hidden />
                <video
                  ref={videoRef}
                  src={videoUrl}
                  autoPlay={!reduceMotion}
                  muted
                  loop
                  playsInline
                  className={styles.videoPlayer}
                  aria-label={`${title} product demo video`}
                />
                <button
                  type="button"
                  className={styles.videoToggle}
                  onClick={togglePlayback}
                  aria-pressed={playing}
                >
                  {playing ? "Pause video" : "Play video"}
                </button>
              </div>
              <div className={styles.laptopBase}>
                <div className={styles.laptopNotch} aria-hidden />
              </div>
            </div>
          ) : (
            <img src={image} alt={title} className={styles.mockup} />
          )}
        </motion.div>
      )}
    </section>
  );
}
