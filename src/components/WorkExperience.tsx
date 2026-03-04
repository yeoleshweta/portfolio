"use client";

import { motion } from "framer-motion";
import styles from "./WorkExperience.module.css";

export default function WorkExperience() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.p
          className={styles.text}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          My 6+ year journey spans UX research, behavioral analytics, and data
          science — with a thread that connects all of it: understanding how
          people actually behave. From leading UX for{" "}
          <span className={styles.highlight}>John Deere</span>&apos;s enterprise
          platforms, to shaping e-commerce personalization across{" "}
          <span className={styles.highlight}>Arcadia Group</span>&apos;s fashion
          brands, to now engineering NLP pipelines at the{" "}
          <span className={styles.highlight}>
            American Board of Internal Medicine
          </span>
          , I build things that respond to real human behavior.
        </motion.p>
      </div>
    </section>
  );
}
