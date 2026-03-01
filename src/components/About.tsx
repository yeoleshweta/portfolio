"use client";

import { motion } from "framer-motion";
import styles from "./About.module.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 120,
    },
  },
};

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.span variants={itemVariants} className="section-label">
          ✦ About
        </motion.span>
        <motion.h2 variants={itemVariants} className="section-title">
          A bit <span className="accent">about me</span>
        </motion.h2>

        <motion.div variants={itemVariants} className={styles.bio}>
          <p>
            Six+ years across UX, behavioral analytics, and now data science —
            with a thread that connects all of it: understanding how people
            actually behave, and building things that respond to that.
          </p>
          <p>
            I started in UX design and research, leading work for John
            Deere&apos;s enterprise platforms, shaping e-commerce
            personalization across Arcadia Group&apos;s fashion brands, and
            building consumer products from wellness apps to survey tools. That
            work taught me to obsess over user behaviour — where people drop
            off, what motivates them, how they make decisions under friction.
          </p>
          <p>
            Then I got curious about what happens when you go deeper. At John
            Deere, I was already running A/B tests, building Tableau dashboards,
            and applying segmentation to drive product decisions. Grad school at
            Drexel (M.S. in AI &amp; Machine Learning, June 2026) gave me the
            toolkit to take that further — predictive modelling, NLP pipelines,
            causal inference, the works.
          </p>
          <p>
            Right now, I&apos;m at the American Board of Internal Medicine,
            where I&apos;m engineering NLP pipelines to detect healthcare biases
            in clinical communication, fine-tuning transformer models
            (ClinicalBERT, RoBERTa), and building LLM evaluation frameworks.
            It&apos;s the most meaningful application of everything I&apos;ve
            learned: behavioural data, ML rigour, and a deep respect for the
            humans in the loop.
          </p>
          <p className={styles.closing}>
            When I&apos;m not training classifiers or annotating datasets,
            I&apos;m probably sketching wireframes — old habits die hard.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
