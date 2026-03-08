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

// Generate deterministic pseudo-random tornado cubes
const tornadoCubes = Array.from({ length: 80 }).map((_, i) => {
  const pseudoRandom1 = ((i * 13) % 100) / 100;
  const pseudoRandom2 = ((i * 29) % 100) / 100;
  const pseudoRandom3 = ((i * 47) % 100) / 100;

  // Distribute vertically (higher Y = bottom of tornado, lower Y = top)
  const yOffset = (pseudoRandom1 - 0.5) * 1600;

  // Radius based on Y position (wider at top, very narrow at bottom)
  const normalizedY = (yOffset + 800) / 1600; // 0 to 1
  const baseRadius = 100 + (1 - normalizedY) * 600;
  const radius = baseRadius + (pseudoRandom2 - 0.5) * 150;

  const initialAngle = pseudoRandom3 * 360;
  const speed = 2 + (1 - normalizedY) * 3; // faster near the bottom
  const scale = 0.3 + pseudoRandom2 * 0.6;

  return { id: i, yOffset, radius, initialAngle, speed, scale };
});

function TornadoCube({
  cube,
  progress,
}: {
  cube: (typeof tornadoCubes)[0];
  progress: MotionValue<number>;
}) {
  // Rotate around the Y axis
  const rotateY = useTransform(
    progress,
    [0, 1],
    [cube.initialAngle, cube.initialAngle + cube.speed * 360],
  );

  // Drift vertically
  const dynamicY = useTransform(
    progress,
    [0, 1],
    [cube.yOffset + 400, cube.yOffset - 400],
  );

  return (
    <motion.div
      className={styles.orbitWrapper}
      style={{ rotateY, y: dynamicY }}
    >
      <div
        className={styles.cubeWrapper}
        style={{
          transform: `translateZ(${cube.radius}px) scale(${cube.scale})`,
        }}
      >
        <div className={styles.cube}>
          <span className={`${styles.cubeFace} ${styles.front}`} />
          <span className={`${styles.cubeFace} ${styles.back}`} />
          <span className={`${styles.cubeFace} ${styles.right}`} />
          <span className={`${styles.cubeFace} ${styles.left}`} />
          <span className={`${styles.cubeFace} ${styles.top}`} />
          <span className={`${styles.cubeFace} ${styles.bottom}`} />
        </div>
      </div>
    </motion.div>
  );
}

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
        <div className={styles.cycloneViewport}>
          {tornadoCubes.map((cube) => (
            <TornadoCube key={cube.id} cube={cube} progress={smoothProgress} />
          ))}
        </div>

        <motion.div
          className={styles.content}
          style={{ opacity: containerOpacity, scale: containerScale }}
        >
          <AnimatedHeading progress={smoothProgress}>About me</AnimatedHeading>

          <AnimatedParagraph progress={smoothProgress} index={0}>
            Six+ years blending UX, behavioral analytics, and data science. What
            started as obsessing over user friction at places like John Deere is
            now a quest to understand not just what people do, but{" "}
            <span style={{ fontStyle: "italic" }}>why</span>—and how to model
            it.
          </AnimatedParagraph>

          <AnimatedParagraph progress={smoothProgress} index={1}>
            That led me to my M.S. in AI &amp; ML at Drexel. Instead of just
            observing behavior, I&apos;m now engineering NLP pipelines and
            fine-tuning LLMs at the American Board of Internal Medicine to
            detect healthcare biases in clinical communication.
          </AnimatedParagraph>

          <AnimatedParagraph progress={smoothProgress} index={2}>
            It&apos;s the perfect sweet spot where human-centered design meets
            ML rigor. And when I&apos;m not training classifiers or evaluating
            models? I&apos;m probably still sketching wireframes. Old habits die
            hard!
          </AnimatedParagraph>
        </motion.div>
      </div>
    </section>
  );
}
