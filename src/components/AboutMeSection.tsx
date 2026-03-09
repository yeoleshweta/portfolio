"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import styles from "./AboutMeSection.module.css";

function AnimatedHeading({
  children,
  progress,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
}) {
  const scale = useTransform(
    progress,
    [0.05, 0.2, 0.7, 0.85],
    [0.85, 1, 1, 1.15],
  );
  const y = useTransform(progress, [0.05, 0.2, 0.7, 0.85], [40, 0, 0, -40]);
  const opacity = useTransform(progress, [0.05, 0.2, 0.7, 0.85], [0, 1, 1, 0]);
  const blurValue = useTransform(
    progress,
    [0.05, 0.2, 0.7, 0.85],
    [12, 0, 0, 12],
  );
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  return (
    <motion.h2 className={styles.heading} style={{ y, scale, opacity, filter }}>
      {children}
    </motion.h2>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <motion.span style={{ opacity }} className={styles.word}>
      {children}{" "}
    </motion.span>
  );
}

function WordHighlight({
  children,
  progress,
}: {
  children: string;
  progress: MotionValue<number>;
}) {
  const words = children.split(" ");
  const stepSize = 2; // Chunk size

  return (
    <p className={styles.paragraph}>
      {words.map((word, i) => {
        const groupIndex = Math.floor(i / stepSize);
        const totalGroups = Math.ceil(words.length / stepSize);

        // Use a very tight range for each group to make it feel like "chunks" of text
        const start = 0.2 + (groupIndex / totalGroups) * 0.6;
        const end = start + 0.01;

        return (
          <Word key={i} progress={progress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

import GlassCube from "./GlassCube";

const CUBES = [
  { size: 30, x: "10%", y: "20%", duration: 40, delay: 0 },
  { size: 50, x: "85%", y: "15%", duration: 55, delay: 2 },
  { size: 20, x: "75%", y: "70%", duration: 45, delay: 4 },
  { size: 40, x: "20%", y: "75%", duration: 50, delay: 1 },
  { size: 35, x: "5%", y: "50%", duration: 48, delay: 3 },
];

export default function AboutMeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    mass: 0.5,
  });

  // Fade text container out at the very ends of the scroll range
  const containerOpacity = useTransform(
    smoothProgress,
    [0.05, 0.1, 0.9, 0.95],
    [0, 1, 1, 0],
  );

  // Overall zoom effect for the whole section container
  const containerScale = useTransform(
    smoothProgress,
    [0.05, 0.5, 0.95],
    [0.9, 1, 1.1],
  );

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.stickyContainer}>
        {/* Focused Gradient Blur Behind Text */}
        <div className={styles.blurLayer} aria-hidden="true" />

        {/* Background Animation */}
        <div className={styles.backgroundDecoration} aria-hidden="true">
          {CUBES.map((cube, i) => (
            <GlassCube key={i} {...cube} />
          ))}
        </div>

        <motion.div
          className={styles.content}
          style={{ opacity: containerOpacity, scale: containerScale }}
        >
          <AnimatedHeading progress={smoothProgress}>
            about <span className={styles.italicSerif}>me</span>
          </AnimatedHeading>

          <WordHighlight progress={smoothProgress}>
            My 6+ year journey started with a simple obsession: figuring out why
            people do what they do, and caring about what happens when they
            can't. I began in UX design, shaping e-commerce at Arcadia, building
            wellness platforms, and redesigning enterprise tools at John Deere.
            Behavioral analytics pulled me deeper. Not just tracking clicks, but
            understanding the why behind every hesitation. With a Masters in
            AI/ML from Drexel and my current work at ABIM building NLP models
            that detect bias in clinical communication, the mission got sharper:
            how a doctor talks to a patient shouldn't depend on who that patient
            is. Whether I'm in a user interview or fine-tuning a transformer,
            I'm still just trying to understand people. I just have better tools
            now.
          </WordHighlight>
        </motion.div>
      </div>
    </section>
  );
}
