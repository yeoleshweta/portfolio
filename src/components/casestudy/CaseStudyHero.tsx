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
  image: string;
}

export default function CaseStudyHero({
  title,
  category,
  role,
  team,
  timeline,
  image,
}: CaseStudyHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.header}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={styles.category}
        >
          {category}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={styles.title}
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
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
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Timeline</span>
            <span className={styles.metaValue}>{timeline}</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={styles.mockupContainer}
      >
        <img src={image} alt={title} className={styles.mockup} />
      </motion.div>
    </section>
  );
}
