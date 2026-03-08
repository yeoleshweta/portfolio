"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties, type MouseEvent } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionTemplate,
  useTransform,
  type MotionValue,
} from "framer-motion";
import styles from "./HeroSection.module.css";

const CUBE_SIZE = 112;
const CUBE_STEP = 118;

const FACE_TRANSFORMS = {
  front: `translateZ(${CUBE_SIZE / 2}px)`,
  back: `rotateY(180deg) translateZ(${CUBE_SIZE / 2}px)`,
  right: `rotateY(90deg) translateZ(${CUBE_SIZE / 2}px)`,
  left: `rotateY(-90deg) translateZ(${CUBE_SIZE / 2}px)`,
  top: `rotateX(90deg) translateZ(${CUBE_SIZE / 2}px)`,
  bottom: `rotateX(-90deg) translateZ(${CUBE_SIZE / 2}px)`,
} as const;

const cubies = (() => {
  return Array.from({ length: 27 }, (_, index) => {
    const x = (index % 3) - 1;
    const y = (Math.floor(index / 3) % 3) - 1;
    const z = Math.floor(index / 9) - 1;
    const edgeWeight = (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 3;
    const layerWeight = (z + 1) / 2;

    return {
      id: index,
      x,
      y,
      z,
      edgeWeight,
      explosionX: x * (328 + Math.abs(y) * 82 + Math.abs(z) * 96) + z * 68,
      explosionY: y * (286 + Math.abs(x) * 74) - z * 94 + x * 32,
      explosionZ:
        z * (448 + Math.abs(x) * 84 + Math.abs(y) * 72) + edgeWeight * 88,
      spinX: y * 46 + z * 22,
      spinY: -x * 62 + z * 28,
      spinZ: (x - y) * 22 + layerWeight * 16,
      shrink: 0.8 - edgeWeight * 0.08,
    };
  });
})();

function Cubie({
  cubie,
  progress,
}: {
  cubie: (typeof cubies)[number];
  progress: MotionValue<number>;
}) {
  const baseX = cubie.x * CUBE_STEP;
  const baseY = cubie.y * CUBE_STEP;
  const baseZ = cubie.z * CUBE_STEP;
  const visibilityBias = cubie.z * -0.008 + cubie.y * 0.004;
  const explosionStart = Math.max(
    0.006,
    0.016 + (1 - cubie.edgeWeight) * 0.024 + visibilityBias,
  );
  const explosionMidpoint = Math.min(explosionStart + 0.19, 0.34);

  const x = useTransform(
    progress,
    [0, explosionStart, explosionMidpoint, 1],
    [baseX, baseX, baseX + cubie.explosionX * 0.52, baseX + cubie.explosionX],
  );
  const y = useTransform(
    progress,
    [0, explosionStart, explosionMidpoint, 1],
    [baseY, baseY, baseY + cubie.explosionY * 0.48, baseY + cubie.explosionY],
  );
  const z = useTransform(
    progress,
    [0, explosionStart, explosionMidpoint, 1],
    [baseZ, baseZ, baseZ + cubie.explosionZ * 0.52, baseZ + cubie.explosionZ],
  );
  const rotateX = useTransform(progress, [explosionStart, 1], [0, cubie.spinX]);
  const rotateY = useTransform(progress, [explosionStart, 1], [0, cubie.spinY]);
  const rotateZ = useTransform(progress, [explosionStart, 1], [0, cubie.spinZ]);
  const scale = useTransform(progress, [explosionStart, 1], [1, cubie.shrink]);

  return (
    <motion.div
      className={styles.cubie}
      style={{ x, y, z, rotateX, rotateY, rotateZ, scale }}
    >
      {Object.entries(FACE_TRANSFORMS).map(([face, transform]) => (
        <span
          key={face}
          className={`${styles.cubieFace} ${styles[face]}`}
          style={{ transform } as CSSProperties}
        />
      ))}
    </motion.div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hotspotRef = useRef<HTMLDivElement>(null);
  const [isCubeHovered, setIsCubeHovered] = useState(false);

  const { scrollYProgress: heroScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: pageScrollYProgress } = useScroll();

  const mouseX = useSpring(0, { stiffness: 130, damping: 20, mass: 0.55 });
  const mouseY = useSpring(0, { stiffness: 130, damping: 20, mass: 0.55 });

  const titleY = useTransform(heroScrollYProgress, [0, 1], [0, -68]);
  const titleOpacity = useTransform(
    heroScrollYProgress,
    [0, 0.92, 1],
    [1, 1, 0.8],
  );
  const scriptX = useTransform(heroScrollYProgress, [0, 1], [0, 130]);
  const scriptY = useTransform(heroScrollYProgress, [0, 1], [0, -34]);
  const scriptRotate = useTransform(heroScrollYProgress, [0, 1], [0, -7]);
  const bioY = useTransform(heroScrollYProgress, [0, 1], [0, 26]);
  const bioOpacity = useTransform(
    heroScrollYProgress,
    [0, 0.72, 1],
    [1, 1, 0.42],
  );
  const cubeProgressRaw = useTransform(
    pageScrollYProgress,
    [0, 0.03, 0.18, 0.48, 1],
    [0, 0.06, 0.28, 0.78, 1],
  );
  const cubeProgress = useSpring(cubeProgressRaw, {
    stiffness: 90,
    damping: 22,
    mass: 0.28,
  });

  const cubeScrollX = useTransform(
    cubeProgress,
    [0, 0.18, 0.52, 0.82, 1],
    [0, -58, -420, -612, -468],
  );
  const cubeScrollY = useTransform(
    cubeProgress,
    [0, 0.18, 0.52, 0.82, 1],
    [0, -18, 122, 338, 468],
  );
  const cubeRotateX = useTransform(
    cubeProgress,
    [0, 0.22, 0.58, 1],
    [-18, -10, 10, 24],
  );
  const cubeRotateY = useTransform(
    cubeProgress,
    [0, 0.16, 0.52, 0.82, 1],
    [-28, 18, 146, 276, 344],
  );
  const cubeRotateZ = useTransform(
    cubeProgress,
    [0, 0.22, 0.58, 1],
    [12, 4, -22, -40],
  );
  const cubeScale = useTransform(
    cubeProgress,
    [0, 0.12, 0.48, 1],
    [1, 1.02, 0.9, 0.68],
  );
  const cubeOpacity = useTransform(
    pageScrollYProgress,
    [0, 0.08, 0.14, 0.22, 0.34],
    [1, 0.94, 0.68, 0.28, 0.08],
  );
  const cubeBlur = useTransform(
    pageScrollYProgress,
    [0, 0.08, 0.18, 0.3],
    [0, 0.8, 2.4, 5.5],
  );
  const cubeFilter = useMotionTemplate`blur(${cubeBlur}px)`;
  const transitionFogOpacity = useTransform(
    pageScrollYProgress,
    [0.03, 0.08, 0.16, 0.26],
    [0, 0.12, 0.28, 0.38],
  );

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!hotspotRef.current) {
      return;
    }

    const bounds = hotspotRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    mouseX.set(x * 34);
    mouseY.set(y * 26);
  };

  const handleMouseLeave = () => {
    setIsCubeHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.backgroundLayer} aria-hidden="true">
        <motion.div
          className={styles.cubeVisual}
          style={{ opacity: cubeOpacity, filter: cubeFilter }}
        >
          <motion.div
            className={styles.cubeIntro}
            style={{ x: mouseX, y: mouseY }}
            initial={{ opacity: 0, scale: 0.88, rotate: 6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 1.15,
              delay: 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.div
              className={styles.cubeMotion}
              style={{
                x: cubeScrollX,
                y: cubeScrollY,
                rotateX: cubeRotateX,
                rotateY: cubeRotateY,
                rotateZ: cubeRotateZ,
                scale: cubeScale,
              }}
            >
              <motion.div
                className={styles.cubeSpin}
                animate={{ scale: isCubeHovered ? 1.01 : 1 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.cubeBase}>
                  {cubies.map((cubie) => (
                    <Cubie
                      key={cubie.id}
                      cubie={cubie}
                      progress={cubeProgress}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        aria-hidden="true"
        className={styles.transitionFog}
        style={{ opacity: transitionFogOpacity }}
      />

      <div className={styles.container}>
        <div className={styles.content}>
          <motion.div
            className={styles.textStack}
            style={{ y: titleY, opacity: titleOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 42 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className={styles.heading}>
                <motion.span
                  className={styles.line}
                  initial={{ y: 120 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  DESIGNING
                </motion.span>
                <motion.span
                  className={styles.line}
                  initial={{ y: 120 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  EXPERIENCES
                </motion.span>
                <motion.span
                  className={styles.script}
                  style={{ x: scriptX, y: scriptY, rotate: scriptRotate }}
                >
                  <motion.span
                    className={styles.scriptInner}
                    initial={{ opacity: 0, x: -48, y: 32, rotate: -5 }}
                    animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                    transition={{
                      duration: 1.1,
                      delay: 0.18,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    research
                  </motion.span>
                </motion.span>
              </h1>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.bioContainer}
            style={{ y: bioY, opacity: bioOpacity }}
          >
            <motion.div
              className={styles.bioInner}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.28,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className={styles.profilePic}>
                <Image
                  src="/assets/IMG_1191.JPG"
                  alt="Shweta Sharma"
                  width={112}
                  height={112}
                />
              </div>
              <p className={styles.description}>
                Hi! I&apos;m <strong>Shweta Sharma</strong>, a UX Researcher
                &amp; AI/ML Grad Student at Drexel — I design experiences people
                actually want to use, and lately, I&apos;ve been teaching
                machines to help.
              </p>
            </motion.div>
          </motion.div>
        </div>

        <div
          ref={hotspotRef}
          className={styles.cubeSlot}
          onMouseEnter={() => setIsCubeHovered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        ></div>
      </div>
    </section>
  );
}
