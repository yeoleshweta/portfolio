"use client";

import { motion } from "framer-motion";
import styles from "./GlassCube.module.css";
import { CSSProperties } from "react";

interface GlassCubeProps {
  size: number;
  x: string;
  y: string;
  duration: number;
  delay: number;
  color?: string;
  className?: string;
}

export default function GlassCube({
  size,
  x,
  y,
  duration,
  delay,
  color = "rgba(139, 105, 250, 0.4)",
}: GlassCubeProps) {
  const halfSize = size / 2;

  const cubeStyle = {
    "--translate-z": `${halfSize}px`,
    width: `${size}px`,
    height: `${size}px`,
  } as CSSProperties;

  const faceStyle = {
    borderColor: color,
  };

  return (
    <div
      className={styles.cubeContainer}
      style={{ left: x, top: y, width: size, height: size }}
    >
      <motion.div
        className={styles.cube}
        style={cubeStyle}
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
          rotateZ: [0, 360],
          y: [0, -20, 0],
          x: [0, 10, 0],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: duration * 1.5,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
        }}
      >
        <div className={`${styles.face} ${styles.front}`} style={faceStyle} />
        <div className={`${styles.face} ${styles.back}`} style={faceStyle} />
        <div className={`${styles.face} ${styles.right}`} style={faceStyle} />
        <div className={`${styles.face} ${styles.left}`} style={faceStyle} />
        <div className={`${styles.face} ${styles.top}`} style={faceStyle} />
        <div className={`${styles.face} ${styles.bottom}`} style={faceStyle} />
      </motion.div>
    </div>
  );
}
