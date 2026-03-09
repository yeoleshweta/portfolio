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

function AnimatedParagraph({
  children,
  progress,
  index,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  index: number;
}) {
  const startIn = 0.1 + index * 0.05;
  const endIn = startIn + 0.15;
  const startOut = 0.75 + index * 0.02;
  const endOut = startOut + 0.15;

  const scale = useTransform(
    progress,
    [startIn, endIn, startOut, endOut],
    [0.9, 1, 1, 1.1],
  );
  const y = useTransform(
    progress,
    [startIn, endIn, startOut, endOut],
    [30, 0, 0, -30],
  );
  const opacity = useTransform(
    progress,
    [startIn, endIn, startOut, endOut],
    [0, 1, 1, 0],
  );
  const blurValue = useTransform(
    progress,
    [startIn, endIn, startOut, endOut],
    [8, 0, 0, 8],
  );
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  return (
    <motion.p
      className={styles.paragraph}
      style={{ y, scale, opacity, filter }}
    >
      {children}
    </motion.p>
  );
}

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
        <motion.div
          className={styles.content}
          style={{ opacity: containerOpacity, scale: containerScale }}
        >
          <AnimatedHeading progress={smoothProgress}>
            Work <span className={styles.italicSerif}>experience</span>
          </AnimatedHeading>

          <AnimatedParagraph progress={smoothProgress} index={0}>
            My 6 year long design journey began with mastering visual
            design—creating high-impact campaigns, expressive UI, and motion/3D
            work for brands like Myntra-Jabong and Cult.fit. Over time, that
            visual craft evolved into product thinking. In my recent role as a
            Product Designer at Navi, I applied it to streamline financial
            journey for millions.
          </AnimatedParagraph>
        </motion.div>
      </div>
    </section>
  );
}
