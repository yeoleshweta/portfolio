"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./ExperienceSnippet.module.css";

const experienceData = [
  {
    role: "UX Researcher & Engineer",
    company: "American Board of Internal Medicine",
    period: "2023 - Present",
    description:
      "Engineering NLP pipelines and researching user behavior to improve medical assessment platforms.",
  },
  {
    role: "Lead UX Researcher",
    company: "John Deere",
    period: "2021 - 2023",
    description:
      "Led enterprise UX research for internal tools and survey platforms.",
  },
  {
    role: "UX Data Analyst",
    company: "Arcadia Group",
    period: "2018 - 2021",
    description:
      "Shaped e-commerce personalization across global fashion brands using behavioral analytics.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.12,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function ExperienceSnippet() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.p
          className={styles.introText}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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

        <div className={styles.cardsLayout}>
          {experienceData.map((exp, i) => (
            <motion.div
              key={i}
              className={styles.expCard}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={i}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.role}>{exp.role}</h3>
                <span className={styles.period}>{exp.period}</span>
              </div>
              <h4 className={styles.company}>{exp.company}</h4>
              <p className={styles.description}>{exp.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/experience" className={styles.viewLink}>
            View Full Experience
            <span className={styles.arrow}>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
