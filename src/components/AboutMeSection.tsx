"use client";

import { motion } from "framer-motion";
import { useMotionOff } from "@/components/MotionControl";
import styles from "./AboutMeSection.module.css";

export default function AboutMeSection() {
  const motionOff = useMotionOff();

  return (
    <section id="about" className={styles.section}>
      <motion.div
        className={styles.content}
        initial={motionOff ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: motionOff ? 0 : 0.4, ease: "easeOut" }}
      >
        <h2 className={styles.heading}>
          about <span className={styles.italicSerif}>me</span>
        </h2>
        <p className={styles.paragraph}>
          My 6+ year journey started with a simple obsession: figuring out why
          people do what they do, and caring about what happens when they
          can&apos;t. I began in UX design, shaping e-commerce at Arcadia, building
          wellness platforms, and redesigning enterprise tools at John Deere.
          Behavioral analytics pulled me deeper. Not just tracking clicks, but
          understanding the why behind every hesitation. With a Masters in
          AI/ML from Drexel and my current work at ABIM building NLP models
          that detect bias in clinical communication, the mission got sharper:
          how a doctor talks to a patient shouldn&apos;t depend on who that patient
          is. Whether I&apos;m in a user interview or fine-tuning a transformer,
          I&apos;m still just trying to understand people. I just have better tools
          now.
        </p>
      </motion.div>
    </section>
  );
}
