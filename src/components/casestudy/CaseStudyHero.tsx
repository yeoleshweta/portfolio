"use client";

import React from "react";
import styles from "./CaseStudyHero.module.css";
import { motion } from "framer-motion";

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
  return (
    <section
      className={`${styles.hero}${variant === "abtools" ? ` ${styles.abtools}` : ""}`}
      id="top"
    >
      <div className={styles.header}>
        {category && (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={styles.category}
          >
            {category}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className={`${styles.title}${variant === "abtools" ? ` ${styles.titleGlow}` : ""}`}
        >
          {title}
        </motion.h1>

        {subtitle ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: "easeOut" }}
            className={styles.subtitle}
          >
            {subtitle}
          </motion.p>
        ) : null}

        {children ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: "easeOut" }}
            className={styles.heroExtra}
          >
            {children}
          </motion.div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
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
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`${styles.mockupContainer} ${isSmallImage ? styles.smallMockup : ""}`}
        >
          {isVideo && videoUrl ? (
            <div className={styles.laptopMockup}>
              <div className={styles.laptopScreen}>
                <div className={styles.webcam}></div>
                <video
                  src={videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={styles.videoPlayer}
                />
              </div>
              <div className={styles.laptopBase}>
                <div className={styles.laptopNotch}></div>
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
