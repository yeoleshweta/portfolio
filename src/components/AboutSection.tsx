"use client";

import Image from "next/image";
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

const galleryImages = [
  {
    src: "https://framerusercontent.com/images/334qmjMjoOVKDPHnfedV0ajsTHA.jpeg?width=1280&height=1280",
    alt: "Group selfie",
    x: -390,
    y: 6,
    rotate: -1,
    scale: 0.92,
  },
  {
    src: "https://framerusercontent.com/images/Vnp4EZEQ5VOH1LIXEZoLMVtGWo.jpeg?width=1080&height=1080",
    alt: "Jumping portrait",
    x: -254,
    y: 16,
    rotate: -1.5,
    scale: 1,
  },
  {
    src: "https://framerusercontent.com/images/7HbPgCtljtALVEjk8Xk7Qw55rh4.jpeg?width=720&height=1280",
    alt: "Motorcycle in the mountains",
    x: 20,
    y: 8,
    rotate: 0.8,
    scale: 1.02,
  },
  {
    src: "https://framerusercontent.com/images/3WOXIBnqCAarjKWP5te8xpwzs.jpeg?width=720&height=1280",
    alt: "Handstand in the mountains",
    x: 290,
    y: 12,
    rotate: 1.4,
    scale: 0.98,
  },
  {
    src: "https://framerusercontent.com/images/kCfId1TEbqFB2KM41hEddQYQ.jpeg?width=720&height=1280",
    alt: "Scuba diving",
    x: 430,
    y: 2,
    rotate: 3,
    scale: 0.94,
  },
] as const;

const stageDebris = [
  { size: 18, x: 214, y: -62, rotate: 6 },
  { size: 16, x: 332, y: 46, rotate: 10 },
  { size: 20, x: 152, y: 160, rotate: 8 },
  { size: 15, x: 186, y: 218, rotate: -10 },
] as const;

const heartPixels = [
  [2, 0],
  [3, 0],
  [5, 0],
  [6, 0],
  [1, 1],
  [2, 1],
  [3, 1],
  [4, 1],
  [5, 1],
  [6, 1],
  [7, 1],
  [1, 2],
  [2, 2],
  [3, 2],
  [4, 2],
  [5, 2],
  [6, 2],
  [7, 2],
  [2, 3],
  [3, 3],
  [4, 3],
  [5, 3],
  [6, 3],
  [3, 4],
  [4, 4],
  [5, 4],
  [4, 5],
] as const;

function HeartCube({
  x,
  y,
  progress,
  reduceMotion,
}: {
  x: number;
  y: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const xOffset = (x - 4) * 22;
  const yOffset = (y - 2.5) * 22;

  const initialX = useTransform(
    progress,
    [0, 0.3],
    [xOffset * 5 + (Math.random() - 0.5) * 400, xOffset],
  );
  const initialY = useTransform(
    progress,
    [0, 0.3],
    [yOffset * 5 + (Math.random() - 0.5) * 400, yOffset],
  );
  const rotateX = useTransform(progress, [0, 0.3], [Math.random() * 360, 0]);
  const rotateY = useTransform(progress, [0, 0.3], [Math.random() * 360, 0]);
  const opacity = useTransform(progress, [0, 0.15, 0.38, 0.42], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0, 0.3, 0.42], [0.5, 1, 1.2]);

  return (
    <motion.div
      className={styles.heartCube}
      style={
        reduceMotion
          ? {
              left: `calc(50% + ${xOffset}px)`,
              top: `calc(50% + ${yOffset}px)`,
            }
          : {
              x: initialX,
              y: initialY,
              rotateX,
              rotateY,
              opacity,
              scale,
              left: "50%",
              top: "50%",
            }
      }
    >
      <span className={`${styles.heartCubeFace} ${styles.heartFront}`} />
      <span className={`${styles.heartCubeFace} ${styles.heartBack}`} />
      <span className={`${styles.heartCubeFace} ${styles.heartRight}`} />
      <span className={`${styles.heartCubeFace} ${styles.heartLeft}`} />
      <span className={`${styles.heartCubeFace} ${styles.heartTop}`} />
      <span className={`${styles.heartCubeFace} ${styles.heartBottom}`} />
    </motion.div>
  );
}

function GalleryCard({
  image,
  progress,
  reduceMotion,
}: {
  image: (typeof galleryImages)[number];
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const x = useTransform(
    progress,
    [0.28, 0.48, 1],
    [0, image.x * 0.5, image.x],
  );
  const y = useTransform(progress, [0.28, 0.48, 1], [0, image.y + 24, image.y]);
  const rotate = useTransform(
    progress,
    [0.28, 0.48, 1],
    [0, image.rotate * 0.4, image.rotate],
  );
  const scale = useTransform(
    progress,
    [0.28, 0.48, 1],
    [0.74, 0.88, image.scale],
  );

  return (
    <motion.div
      className={styles.galleryCard}
      style={reduceMotion ? undefined : { x, y, rotate, scale }}
    >
      <Image fill src={image.src} alt={image.alt} sizes="240px" />
    </motion.div>
  );
}

function StageDebris({
  size,
  xOrigin,
  yOrigin,
  rotateOrigin,
  progress,
  reduceMotion,
}: {
  size: number;
  xOrigin: number;
  yOrigin: number;
  rotateOrigin: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const x = useTransform(progress, [0.2, 1], [xOrigin - 46, xOrigin]);
  const y = useTransform(progress, [0.2, 1], [yOrigin + 24, yOrigin]);
  const rotate = useTransform(
    progress,
    [0.2, 1],
    [rotateOrigin - 12, rotateOrigin],
  );
  const opacity = useTransform(progress, [0.12, 0.28, 1], [0, 1, 0.82]);

  return (
    <motion.span
      className={styles.stageScatterCube}
      style={
        reduceMotion
          ? {
              width: size,
              height: size,
              left: `calc(50% + ${xOrigin}px)`,
              top: `calc(50% + ${yOrigin}px)`,
            }
          : {
              width: size,
              height: size,
              left: "50%",
              top: "50%",
              x,
              y,
              rotate,
              opacity,
            }
      }
    />
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.42,
  });

  const sceneOpacity = useTransform(
    progress,
    [0, 0.12, 0.86, 1],
    [0, 1, 1, 0.58],
  );
  const titleY = useTransform(progress, [0, 0.18], [72, 0]);
  const titleOpacity = useTransform(progress, [0.06, 0.22], [0, 1]);

  const galleryOpacity = useTransform(progress, [0.42, 0.52, 0.88], [0, 1, 1]);
  const galleryY = useTransform(progress, [0.28, 0.56, 1], [82, 0, -52]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.scene}>
        <motion.div
          className={styles.sticky}
          style={reduceMotion ? undefined : { opacity: sceneOpacity }}
        >
          <div className={styles.backdropWash} aria-hidden="true"></div>

          <motion.div
            className={styles.header}
            style={
              reduceMotion ? undefined : { y: titleY, opacity: titleOpacity }
            }
          >
            <h2 className={styles.title}>
              When I&apos;m not <span className={styles.italic}>designing</span>
            </h2>
            <p className={styles.description}>
              I&apos;m drawn to mountains, adventure, dance, and shared moments
              that spark joy.
            </p>
          </motion.div>

          <div className={styles.smallCubeField} aria-hidden="true">
            {heartPixels.map(([x, y], index) => (
              <HeartCube
                key={`${x}-${y}-${index}`}
                x={x}
                y={y}
                progress={progress}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>

          <motion.div
            className={styles.galleryTrack}
            style={
              reduceMotion
                ? undefined
                : { opacity: galleryOpacity, y: galleryY }
            }
          >
            {galleryImages.map((image) => (
              <GalleryCard
                key={image.src}
                image={image}
                progress={progress}
                reduceMotion={reduceMotion}
              />
            ))}
          </motion.div>

          {stageDebris.map((piece) => (
            <StageDebris
              key={`${piece.x}-${piece.y}`}
              size={piece.size}
              xOrigin={piece.x}
              yOrigin={piece.y}
              rotateOrigin={piece.rotate}
              progress={progress}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
