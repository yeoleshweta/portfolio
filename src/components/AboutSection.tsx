"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import { useRef, useState, useEffect, type ReactNode } from "react";
import styles from "./AboutSection.module.css";

const galleryImages = [
  { src: "/assets/SelfImages/IMG_5383.jpg", alt: "Group selfie" },
  { src: "/assets/SelfImages/IMG_6857.jpg", alt: "Jumping portrait" },
  {
    src: "/assets/SelfImages/IMG_9702.jpg",
    alt: "Motorcycle in the mountains",
  },
  {
    src: "/assets/SelfImages/af88938a-795e-4ee4-b92f-435eb48be0af.JPG",
    alt: "Handstand in the mountains",
  },
  { src: "/assets/SelfImages/IMG_9547_2.jpg", alt: "Scuba diving" },
  { src: "/assets/SelfImages/IMG_8208.jpg", alt: "Travel exploring" },
  { src: "/assets/SelfImages/IMG_8783.jpg", alt: "Fun trip" },
] as const;

/* ... staging and debris logic omitted from top snippet, preserved below ... */
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

const TOTAL_CUBES = 80;

const tornadoCubesLogic = Array.from({ length: TOTAL_CUBES }).map((_, i) => {
  const pseudoRandom1 = ((i * 13) % 100) / 100;
  const pseudoRandom2 = ((i * 29) % 100) / 100;
  const pseudoRandom3 = ((i * 47) % 100) / 100;

  const yOffset = (pseudoRandom1 - 0.5) * 1200;
  const normalizedY = (yOffset + 600) / 1200;
  const baseRadius = 150 + (1 - normalizedY) * 500;
  const radius = baseRadius + (pseudoRandom2 - 0.5) * 100;

  const initialAngle = pseudoRandom3 * 360;
  const speed = 2 + (1 - normalizedY) * 2;
  const scale = 0.4 + pseudoRandom2 * 0.4;

  // Assign a heart target to the first 27 cubes
  const heartTarget = i < heartPixels.length ? heartPixels[i] : null;

  return { id: i, yOffset, radius, initialAngle, speed, scale, heartTarget };
});

function TransitionCube({
  cube,
  progress,
  reduceMotion,
}: {
  cube: (typeof tornadoCubesLogic)[0];
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  // Phase 1: Tornado (0.0 - 0.35)
  // Phase 2: Assembly (0.35 - 0.5)
  // Phase 3: Heart (0.5 - 0.85)

  // Continuous rotation for the cyclone vibe
  const angle = useTransform(
    progress,
    [0, 1],
    [cube.initialAngle, cube.initialAngle + cube.speed * 360],
  );

  // Shrink orbit to zero during assembly
  const tornadoRadius = useTransform(
    progress,
    [0, 0.35, 0.5],
    [cube.radius, cube.radius, 0],
  );

  const xOrbit = useTransform(
    [tornadoRadius, angle],
    ([r, a]) => Math.cos((a as number) * (Math.PI / 180)) * (r as number),
  );
  const zOrbit = useTransform(
    [tornadoRadius, angle],
    ([r, a]) => Math.sin((a as number) * (Math.PI / 180)) * (r as number),
  );

  // Target heart coordinates
  const heartX = cube.heartTarget ? (cube.heartTarget[0] - 4) * 24 : 0;
  // Shift the heart center down by 5px as requested
  const heartY = cube.heartTarget ? ((cube.heartTarget[1] - 2.5) * 24) + 5 : 0;

  // Vertical drift transitions to heart Y
  const y = useTransform(
    progress,
    [0, 0.35, 0.5],
    [cube.yOffset + 100, cube.yOffset, heartY],
  );

  // Horizontal drift transitions to heart X
  const xOffset = useTransform(progress, [0, 0.35, 0.5], [0, 0, heartX]);

  // Rotations - cubes settle into flat faces as they hit the heart
  const rotateX = useTransform(progress, [0.35, 0.5], [cube.initialAngle, 0]);
  const rotateY = useTransform(
    progress,
    [0.35, 0.5],
    [cube.initialAngle * 1.5, 0],
  );

  // Scale - cubes settle into a consistent size as they hit the heart
  const finalScale = useTransform(progress, [0.35, 0.5], [cube.scale, 1.0]);

  // Opacity & Color Blending
  const opacity = useTransform(progress, [0, 0.1, 0.85, 0.95], [0, 1, 1, 0]);

  // Non-heart cubes dissipate
  const fillerFade = useTransform(progress, [0.35, 0.5], [1, 0]);
  const finalOpacity = cube.heartTarget
    ? opacity
    : useTransform(
        [opacity, fillerFade],
        ([o, f]) => (o as number) * (f as number),
      );

  const colorBlend = useTransform(progress, [0.35, 0.5], [0, 1]);
  const color = useTransform(
    colorBlend,
    [0, 1],
    ["var(--color-lilac)", "var(--color-lilac)"],
  );
  const borderColor = useTransform(
    colorBlend,
    [0, 1],
    ["rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 0.2)"],
  );

  if (reduceMotion && cube.heartTarget) {
    return (
      <div
        className={styles.heartCube}
        style={{
          left: `calc(50% + ${heartX}px)`,
          top: `calc(50% + ${heartY}px)`,
        }}
      >
        <span className={`${styles.heartCubeFace} ${styles.heartFront}`} />
      </div>
    );
  }

  if (reduceMotion && !cube.heartTarget) return null;

  return (
    <motion.div
      className={styles.heartCube}
      style={{
        x: useTransform(
          [xOrbit, xOffset],
          ([xo, xf]) => (xo as number) + (xf as number),
        ),
        y,
        z: zOrbit,
        rotateX,
        rotateY,
        opacity: finalOpacity,
        scale: finalScale,
        left: "50%",
        top: "30%",
      }}
    >
      {[
        styles.heartFront,
        styles.heartBack,
        styles.heartRight,
        styles.heartLeft,
        styles.heartTop,
        styles.heartBottom,
      ].map((faceClass) => (
        <motion.span
          key={faceClass}
          className={`${styles.heartCubeFace} ${faceClass}`}
          style={{ backgroundColor: color, borderColor }}
        />
      ))}
    </motion.div>
  );
}

function GalleryCard({
  src,
  alt,
  index,
  total,
  progress,
  galleryRotation,
}: {
  src: string;
  alt: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  galleryRotation: MotionValue<number>;
}) {
  const angleStep = 360 / total;
  // Use useMotionValue to ensure 0 is correctly rendered as '0deg' in templates
  const startAngle = useMotionValue(index * angleStep);
  const radius = 1100; // Expanded radius to widen the cover across the screen

  // Entry: Cards rise and fan out from the center depth
  const entryY = useTransform(progress, [0.25, 0.45], [400, 0]);
  const entryOpacity = useTransform(progress, [0.25, 0.4], [0, 1]);
  // Dynamic radius: start from a visible 3D shape (600px) instead of a flat point
  const currentRadius = useTransform(progress, [0.25, 0.5], [600, radius]);
  // Current angle relative to the center camera
  const currentAngle = useTransform(galleryRotation, (rot: number) => {
    let a = (startAngle.get() + rot) % 360;
    if (a > 180) a -= 360;
    if (a < -180) a += 360;
    return a;
  });

  // Highlight front cards and dim/fade back cards
  // Highlight front cards (1.4x) and drastically shrink/dim back cards (0.5x)
  const cardScale = useTransform(
    currentAngle,
    [-180, -60, 0, 60, 180],
    [0.5, 0.7, 1.4, 0.7, 0.5],
  );
  const cardOpacity = useTransform(
    currentAngle,
    [-150, -90, 0, 90, 150],
    [0, 0.6, 1, 0.6, 0],
  );

  // High-end adjustment: Stronger counter-rotate for wide 1100px radius
  const faceForward = useTransform(currentAngle, (a: number) => -a * 0.85);

  // Parallax: Shift image horizontally inside frame based on ring angle
  const imageX = useTransform(currentAngle, [-60, 60], ["15%", "-15%"]);

  const transform = useMotionTemplate`rotateY(${startAngle}deg) translateZ(${currentRadius}px) rotateY(${faceForward}deg) scale(${cardScale})`;

  return (
    <motion.div
      className={styles.galleryCard}
      style={{
        y: entryY,
        transform,
        opacity: useTransform(
          [entryOpacity, cardOpacity],
          ([e, c]) => (e as number) * (c as number),
        ),
      }}
    >
      <div className={styles.cardImageInner}>
        <motion.div
          style={{
            x: imageX,
            width: "130%",
            height: "100%",
            position: "relative",
            left: "-15%",
          }}
        >
          <Image
            fill
            src={src}
            alt={alt}
            sizes="400px"
            priority
            className={styles.cardCover}
          />
        </motion.div>
      </div>
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
              top: `calc(25% + ${yOrigin}px)`,
            }
          : {
              width: size,
              height: size,
              left: "50%",
              top: "30%",
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
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
  const galleryOpacity = useTransform(
    progress,
    [0.25, 0.45, 0.92, 0.98],
    [0, 1, 1, 0],
  );
  // Exteneded rotation to show all images in the front focus
  const galleryRotation = useTransform(progress, [0.3, 0.98], [0, -540]);

  // Cinematic transformations: start from a visible depth to avoid the "flat" line feel
  const galleryTilt = useTransform(progress, [0.25, 0.5], [45, 12]);
  const galleryDepth = useTransform(progress, [0.25, 0.5], [-2000, -1100]);
  const galleryY = useTransform(progress, [0.25, 0.5], [600, 440]);

  // We double the images to create a denser, more professional ring with fewer gaps
  const denseGallery = [...galleryImages, ...galleryImages];

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
              When I&apos;m not{" "}
              <span className={styles.italic}>researching</span>
            </h2>
            <p className={styles.description}>
              I work hard and then I go find something that has nothing to do with work.<br />
              Slopes, cities, finish lines, ship decks — whatever gets me out of my head and into the world.
            </p>
          </motion.div>

          {/* Decorative floating heart pixels in the background */}
          <div className={styles.smallCubeField} aria-hidden="true">
            {mounted && tornadoCubesLogic.map((cube) => (
              <TransitionCube
                key={cube.id}
                cube={cube}
                progress={progress}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>

          <div className={styles.carouselContainer}>
            <motion.div
              className={styles.galleryTrack}
              style={
                reduceMotion
                  ? undefined
                  : {
                      opacity: galleryOpacity,
                      rotateY: galleryRotation,
                      rotateX: galleryTilt, // Cinematic tilt
                      translateZ: galleryDepth, // Depth calibration
                      y: galleryY, // Anchored much lower to avoid header/heart overlap
                      z: 10,
                    }
              }
            >
              {denseGallery.map(
                (image: { src: string; alt: string }, i: number) => (
                  <GalleryCard
                    key={`${image.src}-${i}`}
                    src={image.src}
                    alt={image.alt}
                    index={i}
                    total={denseGallery.length}
                    progress={progress}
                    galleryRotation={galleryRotation}
                  />
                ),
              )}
            </motion.div>
          </div>

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
