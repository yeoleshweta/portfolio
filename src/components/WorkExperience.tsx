"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import styles from "./WorkExperience.module.css";

// Placeholder Data
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

const educationData = [
  {
    degree: "Master of Science in Human-Computer Interaction",
    school: "University of Technology",
    year: "2018",
  },
  {
    degree: "Bachelor of Science in Computer Science",
    school: "State University",
    year: "2016",
  },
];

const techStack = [
  "Python",
  "React",
  "TypeScript",
  "Next.js",
  "Framer Motion",
  "SQL",
  "Figma",
  "Qualtrics",
  "NLP",
  "Machine Learning",
  "R",
  "Tableau",
];

export default function WorkExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  // Phase 1: Intro (0 - 0.2)
  const introOpacity = useTransform(progress, [0, 0.1, 0.2], [1, 1, 0]);
  const introY = useTransform(progress, [0.1, 0.2], [0, -50]);
  const introPointer = useTransform(progress, (v) =>
    v < 0.2 ? "auto" : "none",
  ) as any;

  // Phase 2: Experience Cards (0.15 - 0.45)
  const expOpacity = useTransform(
    progress,
    [0.15, 0.25, 0.4, 0.45],
    [0, 1, 1, 0],
  );
  const expY = useTransform(progress, [0.15, 0.25, 0.4, 0.45], [50, 0, 0, -50]);
  const expPointer = useTransform(progress, (v) =>
    v >= 0.15 && v <= 0.45 ? "auto" : "none",
  ) as any;

  // Phase 3: Education (0.4 - 0.7)
  const eduOpacity = useTransform(
    progress,
    [0.4, 0.5, 0.65, 0.7],
    [0, 1, 1, 0],
  );
  const eduY = useTransform(progress, [0.4, 0.5, 0.65, 0.7], [50, 0, 0, -50]);
  const eduPointer = useTransform(progress, (v) =>
    v >= 0.4 && v <= 0.7 ? "auto" : "none",
  ) as any;

  // Phase 4: Tech Stack (0.65 - 1)
  const stackOpacity = useTransform(progress, [0.65, 0.75, 1], [0, 1, 1]);
  const stackY = useTransform(progress, [0.65, 0.75, 1], [50, 0, 0]);
  const stackPointer = useTransform(progress, (v) =>
    v >= 0.65 ? "auto" : "none",
  ) as any;

  return (
    <section id="experience" ref={sectionRef} className={styles.section}>
      <div className={styles.stickyContainer}>
        <div className={styles.scene}>
          {/* Phase 1: Intro */}
          <motion.div
            className={styles.introContainer}
            style={
              reduceMotion
                ? undefined
                : {
                    opacity: introOpacity,
                    y: introY,
                    pointerEvents: introPointer,
                  }
            }
          >
            <p className={styles.text}>
              My 6+ year journey spans UX research, behavioral analytics, and
              data science — with a thread that connects all of it:
              understanding how people actually behave. From leading UX for{" "}
              <span className={styles.highlight}>John Deere</span>&apos;s
              enterprise platforms, to shaping e-commerce personalization across{" "}
              <span className={styles.highlight}>Arcadia Group</span>&apos;s
              fashion brands, to now engineering NLP pipelines at the{" "}
              <span className={styles.highlight}>
                American Board of Internal Medicine
              </span>
              , I build things that respond to real human behavior.
            </p>
          </motion.div>

          {/* Phase 2: Experience */}
          <motion.div
            className={styles.experienceContainer}
            style={
              reduceMotion
                ? undefined
                : { opacity: expOpacity, y: expY, pointerEvents: expPointer }
            }
          >
            <h2 className={styles.sectionTitle}>Experience</h2>
            <div className={styles.cardsLayout}>
              {experienceData.map((exp, i) => (
                <div key={i} className={styles.expCard}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.role}>{exp.role}</h3>
                    <span className={styles.period}>{exp.period}</span>
                  </div>
                  <h4 className={styles.company}>{exp.company}</h4>
                  <p className={styles.description}>{exp.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Phase 3: Education */}
          <motion.div
            className={styles.educationContainer}
            style={
              reduceMotion
                ? undefined
                : { opacity: eduOpacity, y: eduY, pointerEvents: eduPointer }
            }
          >
            <h2 className={styles.sectionTitle}>Education</h2>
            <div className={styles.eduLayout}>
              {educationData.map((edu, i) => (
                <div key={i} className={styles.eduCard}>
                  <h3 className={styles.degree}>{edu.degree}</h3>
                  <div className={styles.schoolInfo}>
                    <span className={styles.school}>{edu.school}</span>
                    <span className={styles.year}>{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Phase 4: Tech Stack */}
          <motion.div
            className={styles.stackContainer}
            style={
              reduceMotion
                ? undefined
                : {
                    opacity: stackOpacity,
                    y: stackY,
                    pointerEvents: stackPointer,
                  }
            }
          >
            <h2 className={styles.sectionTitle}>Tech Stack</h2>
            <div className={styles.gridContainer}>
              {techStack.map((tech, i) => (
                <motion.div
                  key={i}
                  className={styles.techBadge}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "var(--color-lilac)",
                    color: "#000",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
