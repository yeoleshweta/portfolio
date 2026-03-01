"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./BackgroundGrid.module.css";

export default function BackgroundGrid() {
  const { scrollYProgress } = useScroll();

  // Rotate the grid based on scroll for 3D perspective shift
  const rotateX = useTransform(scrollYProgress, [0, 1], [20, 45]);
  const skewX = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.grid}
        style={{
          rotateX,
          skewX,
        }}
      />

      {/* Floating parallax elements */}
      <ParallaxQuote
        scrollYProgress={scrollYProgress}
        delay={0.2}
        top="15%"
        left="85%"
      />
      <ParallaxQuote
        scrollYProgress={scrollYProgress}
        delay={0.8}
        top="45%"
        left="5%"
      />
      <ParallaxQuote
        scrollYProgress={scrollYProgress}
        delay={1.2}
        top="75%"
        left="80%"
      />
    </div>
  );
}

function ParallaxQuote({ scrollYProgress, delay, top, left }: any) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -200 * (Math.random() + 0.5)],
  );
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45 * Math.random()]);

  return (
    <motion.div
      className={styles.floatingElement}
      style={{
        top,
        left,
        y,
        rotate,
      }}
    >
      <div className={styles.cube}>
        <div className={styles.cubeFace} />
      </div>
    </motion.div>
  );
}
