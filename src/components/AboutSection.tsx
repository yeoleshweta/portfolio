"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import styles from "./AboutSection.module.css";

const smallCubes = [
  { size: 18, x: -442, y: 250, rotate: -18 },
  { size: 22, x: -338, y: 214, rotate: 10 },
  { size: 20, x: 402, y: 186, rotate: 14 },
  { size: 16, x: 492, y: 118, rotate: -8 },
  { size: 12, x: 556, y: -16, rotate: 4 },
  { size: 14, x: -526, y: -58, rotate: -10 },
] as const;

function LogoCube({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <div className={`${styles.logoCube} ${className}`}>
      <div className={styles.logoCubeFront}>{children}</div>
      <div className={styles.logoCubeRight}></div>
      <div className={styles.logoCubeTop}></div>
    </div>
  );
}

function FloatingLogoCube({
  className,
  progress,
  reduceMotion,
  xRange,
  yRange,
  rotateRange,
  children,
}: {
  className: string;
  progress: MotionValue<number>;
  reduceMotion: boolean;
  xRange: [number, number];
  yRange: [number, number];
  rotateRange: [number, number];
  children: ReactNode;
}) {
  const x = useTransform(progress, [0, 1], xRange);
  const y = useTransform(progress, [0, 1], yRange);
  const rotate = useTransform(progress, [0, 1], rotateRange);

  return (
    <motion.div
      className={className}
      style={reduceMotion ? undefined : { x, y, rotate }}
    >
      {children}
    </motion.div>
  );
}

function FloatingSmallCube({
  progress,
  reduceMotion,
  size,
  xOrigin,
  yOrigin,
  rotateOrigin,
}: {
  progress: MotionValue<number>;
  reduceMotion: boolean;
  size: number;
  xOrigin: number;
  yOrigin: number;
  rotateOrigin: number;
}) {
  const x = useTransform(progress, [0, 1], [xOrigin, xOrigin * 0.86]);
  const y = useTransform(progress, [0, 1], [yOrigin, yOrigin - 24]);
  const rotate = useTransform(progress, [0, 1], [rotateOrigin, rotateOrigin + 18]);
  const opacity = useTransform(progress, [0, 0.18, 1], [0, 1, 0.68]);

  return (
    <motion.span
      className={styles.smallCube}
      style={
        reduceMotion
          ? { width: size, height: size }
          : { width: size, height: size, x, y, rotate, opacity }
      }
    />
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.42,
  });

  const sceneOpacity = useTransform(progress, [0, 0.12, 0.86, 1], [0, 1, 1, 0.58]);
  const titleY = useTransform(progress, [0, 0.24], [72, 0]);
  const copyOpacity = useTransform(progress, [0.12, 0.28], [0, 1]);
  const carryCubeX = useTransform(progress, [0, 1], [184, 470]);
  const carryCubeY = useTransform(progress, [0, 1], [-198, -336]);
  const carryCubeRotate = useTransform(progress, [0, 1], [10, 22]);
  const carryCubeScale = useTransform(progress, [0, 1], [1.08, 1.26]);
  const carryCubeOpacity = useTransform(progress, [0, 0.16, 1], [0.22, 0.48, 0.14]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.scene}>
        <motion.div
          className={styles.sticky}
          style={reduceMotion ? undefined : { opacity: sceneOpacity }}
        >
          <div className={styles.backdropWash} aria-hidden="true"></div>

          <motion.div
            aria-hidden="true"
            className={styles.carryCube}
            style={
              reduceMotion
                ? undefined
                : {
                    x: carryCubeX,
                    y: carryCubeY,
                    rotate: carryCubeRotate,
                    scale: carryCubeScale,
                    opacity: carryCubeOpacity,
                  }
            }
          >
            <span className={styles.carryFace}></span>
          </motion.div>

          <motion.div
            className={styles.header}
            style={reduceMotion ? undefined : { y: titleY }}
          >
            <h2 className={styles.title}>
              Work <span className={styles.italic}>experience</span>
            </h2>
            <motion.p
              className={styles.description}
              style={reduceMotion ? undefined : { opacity: copyOpacity }}
            >
              My 6 year long design journey began with mastering visual
              design, creating high-impact campaigns, expressive UI, and
              motion/3D work for brands like Myntra-Jabong and Cult.fit. Over
              time, that visual craft evolved into product thinking. In my
              recent role as a Product Designer at Navi, I applied it to
              streamline fintech journeys for millions.
            </motion.p>
          </motion.div>

          <div className={styles.logoField}>
            <FloatingLogoCube
              className={styles.topCube}
              progress={progress}
              reduceMotion={reduceMotion}
              xRange={[0, 14]}
              yRange={[0, -28]}
              rotateRange={[0, 6]}
            >
              <LogoCube className={styles.myntraCube}>
                <div className={styles.myntraMark} aria-hidden="true">
                  <span className={styles.myntraPink}></span>
                  <span className={styles.myntraOrange}></span>
                  <span className={styles.myntraPurple}></span>
                </div>
              </LogoCube>
            </FloatingLogoCube>

            <FloatingLogoCube
              className={styles.leftCube}
              progress={progress}
              reduceMotion={reduceMotion}
              xRange={[-18, 8]}
              yRange={[18, -16]}
              rotateRange={[-6, 5]}
            >
              <LogoCube className={styles.cultCube}>
                <div className={styles.cultMark} aria-hidden="true">
                  <span className={styles.cultDot}></span>
                  <span className={styles.cultBarOne}></span>
                  <span className={styles.cultBarTwo}></span>
                  <span className={styles.cultBarThree}></span>
                  <span className={styles.cultBarFour}></span>
                </div>
              </LogoCube>
            </FloatingLogoCube>

            <FloatingLogoCube
              className={styles.rightCube}
              progress={progress}
              reduceMotion={reduceMotion}
              xRange={[18, -10]}
              yRange={[12, -14]}
              rotateRange={[4, -4]}
            >
              <LogoCube className={styles.naviCube}>
                <div className={styles.naviMark} aria-hidden="true">
                  <span className={styles.naviStem}></span>
                  <span className={styles.naviArc}></span>
                </div>
              </LogoCube>
            </FloatingLogoCube>
          </div>

          <div className={styles.smallCubeField} aria-hidden="true">
            {smallCubes.map((cube) => (
              <FloatingSmallCube
                key={`${cube.x}-${cube.y}`}
                progress={progress}
                reduceMotion={reduceMotion}
                size={cube.size}
                xOrigin={cube.x}
                yOrigin={cube.y}
                rotateOrigin={cube.rotate}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
