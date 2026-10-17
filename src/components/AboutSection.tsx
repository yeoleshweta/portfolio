"use client";

import Image from "next/image";
import {
  animate,
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import { useRef, useState, useEffect, type ReactNode } from "react";
import { useMotionOff } from "@/components/MotionControl";
import styles from "./AboutSection.module.css";

const galleryImages = [
  { src: "/assets/SelfImages/IMG_5383.jpg", alt: "Group selfie" },
  { src: "/assets/SelfImages/IMG_6857.jpg", alt: "Jumping portrait" },
  {
    src: "/assets/SelfImages/IMG_9702.jpg",
    alt: "Motorcycle in the mountains",
  },
  {
    src: "/assets/SelfImages/af88938a-795e-4ee4-b92f-435eb48be0af.jpg",
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
/* 6px cubes on an 8px grid — a smaller heart, centered on the stage origin. */
const HEART_STEP = 8;

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
  // The heart is assembled from the moment the section is in view.
  // Filler cubes stay out of the ring so they cannot cover it.
  const settled = Boolean(cube.heartTarget);

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
    settled ? [0, 0, 0] : [cube.radius, cube.radius, 0],
  );

  const xOrbit = useTransform(
    [tornadoRadius, angle],
    ([r, a]) => Math.cos((a as number) * (Math.PI / 180)) * (r as number),
  );
  const zOrbit = useTransform(
    [tornadoRadius, angle],
    ([r, a]) => Math.sin((a as number) * (Math.PI / 180)) * (r as number),
  );

  // Target heart coordinates, centered on the stage origin
  const heartX = cube.heartTarget ? (cube.heartTarget[0] - 4) * HEART_STEP : 0;
  const heartY = cube.heartTarget
    ? (cube.heartTarget[1] - 2.5) * HEART_STEP
    : 0;

  // Vertical drift transitions to heart Y
  const y = useTransform(
    progress,
    [0, 0.35, 0.5],
    settled ? [heartY, heartY, heartY] : [cube.yOffset + 100, cube.yOffset, heartY],
  );

  // Horizontal drift transitions to heart X
  const xOffset = useTransform(
    progress,
    [0, 0.35, 0.5],
    settled ? [heartX, heartX, heartX] : [0, 0, heartX],
  );

  // Rotations - cubes settle into flat faces as they hit the heart
  const rotateX = useTransform(
    progress,
    [0.35, 0.5],
    settled ? [0, 0] : [cube.initialAngle, 0],
  );
  const rotateY = useTransform(
    progress,
    [0.35, 0.5],
    settled ? [0, 0] : [cube.initialAngle * 1.5, 0],
  );

  // Scale - cubes settle into a consistent size as they hit the heart
  const finalScale = useTransform(
    progress,
    [0.35, 0.5],
    settled ? [1, 1] : [cube.scale, 1.0],
  );

  // Opacity & Color Blending
  const opacity = useTransform(
    progress,
    [0, 0.1, 0.85, 0.95],
    settled ? [1, 1, 1, 1] : [0, 0, 0, 0],
  );

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
  const xCombined = useTransform(
    [xOrbit, xOffset],
    ([xo, xf]) => (xo as number) + (xf as number),
  );

  if (!cube.heartTarget) return null;

  if (reduceMotion && cube.heartTarget) {
    return (
      <div
        className={styles.heartCube}
        style={{
          left: `calc(50% + ${heartX}px)`,
          top: `${heartY}px`,
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
        x: xCombined,
        y,
        z: zOrbit,
        rotateX,
        rotateY,
        opacity: finalOpacity,
        scale: finalScale,
        left: "50%",
        top: 0,
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
  galleryRotation,
  onCenter,
}: {
  src: string;
  alt: string;
  index: number;
  total: number;
  galleryRotation: MotionValue<number>;
  onCenter: (index: number) => void;
}) {
  const angleStep = 360 / total;
  // Use useMotionValue to ensure 0 is correctly rendered as '0deg' in templates
  const startAngle = useMotionValue(index * angleStep);
  const currentRadius = useMotionValue(900);
  const entryY = useMotionValue(0);
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
    [0.48, 0.68, 1.22, 0.68, 0.48],
  );
  const cardOpacity = useTransform(
    currentAngle,
    [-180, -70, -24, 0, 24, 70, 180],
    [0.2, 0.45, 1, 1, 1, 0.45, 0.2],
  );

  // High-end adjustment: Stronger counter-rotate for wide 1100px radius
  const faceForward = useTransform(currentAngle, (a: number) => -a * 0.85);
  const zIndex = useTransform(currentAngle, (a: number) =>
    Math.round(100 - Math.abs(a)),
  );

  // Parallax: Shift image horizontally inside frame based on ring angle
  const imageX = useTransform(currentAngle, [-60, 60], ["15%", "-15%"]);

  const transform = useMotionTemplate`rotateY(${startAngle}deg) translateZ(${currentRadius}px) rotateY(${faceForward}deg) scale(${cardScale})`;

  return (
    <motion.button
      type="button"
      className={styles.galleryCard}
      onClick={() => onCenter(index)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onCenter(index);
        }
      }}
      style={{
        y: entryY,
        zIndex,
        transform,
        opacity: cardOpacity,
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
    </motion.button>
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
  const reduceMotion = useMotionOff();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.42,
  });

  const titleY = useTransform(scrollYProgress, [0, 0.04], [16, 0]);
  const titleOpacity = useMotionValue(1);
  // One full turn while the section is pinned, so all 14 ring photos
  // (7 unique images, doubled) pass through the center.
  const scrollRotation = useTransform(scrollYProgress, [0.02, 0.98], [0, -360]);
  const clickOffset = useMotionValue(0);
  const clickAnim = useRef<ReturnType<typeof animate> | null>(null);
  const galleryRotation = useTransform(
    [scrollRotation, clickOffset],
    ([scroll, offset]) => (scroll as number) + (offset as number),
  );

  const galleryTilt = useMotionValue(12);
  const galleryDepth = useMotionValue(-960);

  // We double the images to create a denser, more professional ring with fewer gaps
  const denseGallery = [...galleryImages, ...galleryImages];

  const centerCard = (index: number) => {
    const start = index * (360 / denseGallery.length);
    const current = scrollRotation.get() + clickOffset.get();
    let angle = (start + current) % 360;
    if (angle > 180) angle -= 360;
    if (angle < -180) angle += 360;
    clickAnim.current?.stop();
    clickAnim.current = animate(clickOffset, clickOffset.get() - angle, {
      duration: reduceMotion ? 0 : 0.65,
      ease: [0.16, 1, 0.3, 1],
    });
  };

  return (
    <section
      id="outside"
      ref={sectionRef}
      className={styles.section}
      data-motion={reduceMotion ? "off" : "on"}
    >
      <div className={styles.scene}>
        <motion.div className={styles.sticky}>
          <div className={styles.backdropWash} aria-hidden="true"></div>

          <motion.div
            className={styles.header}
            style={
              reduceMotion ? undefined : { y: titleY, opacity: titleOpacity }
            }
          >
            <h2 className={styles.title}>
              <span>When I&apos;m not</span>
              <span className={styles.italic}>researching</span>
            </h2>
            <p className={styles.description}>
              <span className={styles.descriptionLine}>
                I work hard and then I go find something that has nothing to do with work.
              </span>
              <span className={styles.descriptionLine}>
                Slopes, cities, finish lines, ship decks — whatever gets me out of my head and into the world.
              </span>
            </p>
          </motion.div>

          <div className={styles.heartSlot}>
          <div className={styles.heartStage} aria-hidden="true">
            {mounted &&
              tornadoCubesLogic.map((cube) => (
                <TransitionCube
                  key={cube.id}
                  cube={cube}
                  progress={progress}
                  reduceMotion={reduceMotion}
                />
              ))}
          </div>
          </div>

          {reduceMotion ? (
            <div className={styles.stillRow} data-lenis-prevent>
              {galleryImages.map((image) => (
                <button
                  key={image.src}
                  type="button"
                  className={styles.stillCard}
                  onClick={(event) => {
                    event.currentTarget.scrollIntoView({
                      inline: "center",
                      block: "nearest",
                      behavior: "auto",
                    });
                  }}
                >
                  <Image
                    fill
                    src={image.src}
                    alt={image.alt}
                    sizes="240px"
                    className={styles.cardCover}
                  />
                </button>
              ))}
            </div>
          ) : (
            <div className={styles.carouselContainer}>
              <motion.div
                className={styles.galleryTrack}
                style={{
                  rotateY: galleryRotation,
                  rotateX: galleryTilt,
                  translateZ: galleryDepth,
                  y: 70,
                  z: 10,
                }}
              >
                {denseGallery.map(
                  (image: { src: string; alt: string }, i: number) => (
                    <GalleryCard
                      key={`${image.src}-${i}`}
                      src={image.src}
                      alt={image.alt}
                      index={i}
                      total={denseGallery.length}
                      galleryRotation={galleryRotation}
                      onCenter={centerCard}
                    />
                  ),
                )}
              </motion.div>
            </div>
          )}

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
