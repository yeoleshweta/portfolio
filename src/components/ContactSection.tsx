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
import { useRef } from "react";
import styles from "./ContactSection.module.css";

const galleryImages = [
  {
    src: "https://framerusercontent.com/images/334qmjMjoOVKDPHnfedV0ajsTHA.jpeg?width=1280&height=1280",
    alt: "Group selfie",
    x: -510,
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
    x: 552,
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

const contactItems = [
  {
    type: "linkedin",
    label: "LinkedIN",
    href: "https://linkedin.com/in/dev-ashish-dewangan-38144a50/",
  },
  {
    type: "gmail",
    label: "devashish020@gmail.com",
    href: "mailto:devashish020@gmail.com",
  },
  {
    type: "cv",
    label: "Download CV",
    href: "https://drive.google.com/file/d/1oLVImum8mBiIrh1nR1b5Fc_r3DLyQVZU/view?usp=sharing",
  },
] as const;

function ContactBadge({ type }: { type: (typeof contactItems)[number]["type"] }) {
  if (type === "linkedin") {
    return (
      <svg viewBox="0 0 71 69" className={styles.contactSvg} aria-hidden="true">
        <rect x="1" y="1" width="69" height="67" rx="18" fill="#e7d6ff" />
        <path
          d="M20 25.5C23.04 25.5 25.5 23.04 25.5 20C25.5 16.96 23.04 14.5 20 14.5C16.96 14.5 14.5 16.96 14.5 20C14.5 23.04 16.96 25.5 20 25.5ZM15.2 29.4H24.8V54.4H15.2V29.4ZM30.4 29.4H39.6V32.8H39.73C41.01 30.37 44.15 27.8 48.82 27.8C58.53 27.8 60.3 34.19 60.3 42.5V54.4H50.7V43.85C50.7 41.33 50.65 38.09 47.18 38.09C43.66 38.09 43.12 40.84 43.12 43.66V54.4H33.52V29.4H30.4Z"
          fill="#3691ff"
          stroke="#000"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "gmail") {
    return (
      <svg viewBox="0 0 71 69" className={styles.contactSvg} aria-hidden="true">
        <rect x="1" y="1" width="69" height="67" rx="18" fill="#e7d6ff" />
        <path
          d="M14 23.5L35.5 39.8L57 23.5V48.5C57 51.26 54.76 53.5 52 53.5H19C16.24 53.5 14 51.26 14 48.5V23.5Z"
          fill="#fff"
          stroke="#000"
          strokeWidth="1.4"
        />
        <path d="M14 23.5L35.5 39.8L57 23.5" fill="none" stroke="#ea4335" strokeWidth="6" />
        <path d="M14 23.5V48.5L27 38.8V28.9L14 23.5Z" fill="#c5221f" />
        <path d="M57 23.5V48.5L44 38.8V28.9L57 23.5Z" fill="#4285f4" />
        <path d="M27 38.8L35.5 45.1L44 38.8" fill="none" stroke="#34a853" strokeWidth="5.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 71 69" className={styles.contactSvg} aria-hidden="true">
      <rect x="1" y="1" width="69" height="67" rx="18" fill="#e7d6ff" />
      <rect
        x="18"
        y="13"
        width="35"
        height="42"
        rx="7"
        fill="#f7f1ff"
        stroke="#8b69fa"
        strokeWidth="2"
      />
      <circle cx="35.5" cy="24" r="4.5" fill="#8b69fa" />
      <path
        d="M26.5 37C26.5 32.86 30.08 29.5 34.5 29.5H36.5C40.92 29.5 44.5 32.86 44.5 37V39H26.5V37Z"
        fill="#8b69fa"
      />
      <path d="M25 45H46" stroke="#8b69fa" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M25 50H46" stroke="#8b69fa" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
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
  const x = useTransform(progress, [0.28, 0.48, 1], [0, image.x * 0.5, image.x]);
  const y = useTransform(progress, [0.28, 0.48, 1], [0, image.y + 24, image.y]);
  const rotate = useTransform(progress, [0.28, 0.48, 1], [0, image.rotate * 0.4, image.rotate]);
  const scale = useTransform(progress, [0.28, 0.48, 1], [0.74, 0.88, image.scale]);

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
  const rotate = useTransform(progress, [0.2, 1], [rotateOrigin - 12, rotateOrigin]);
  const opacity = useTransform(progress, [0.12, 0.28, 1], [0, 1, 0.82]);

  return (
    <motion.span
      className={styles.stageScatterCube}
      style={
        reduceMotion
          ? { width: size, height: size, left: `calc(50% + ${xOrigin}px)`, top: `calc(50% + ${yOrigin}px)` }
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

export default function ContactSection() {
  const hobbiesRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: hobbiesRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 88,
    damping: 22,
    mass: 0.42,
  });

  const titleY = useTransform(progress, [0, 0.18], [74, 0]);
  const titleOpacity = useTransform(progress, [0.06, 0.22], [0, 1]);
  const heartOpacity = useTransform(progress, [0.12, 0.26, 0.42], [0, 1, 0]);
  const heartScale = useTransform(progress, [0.12, 0.28, 0.42], [0.72, 1, 0.82]);
  const galleryOpacity = useTransform(progress, [0.28, 0.46, 0.88], [0, 1, 1]);
  const galleryY = useTransform(progress, [0.28, 0.56, 1], [82, 0, -52]);
  const panelY = useTransform(progress, [0, 1], [60, 0]);

  return (
    <section className={styles.section}>
      <div ref={hobbiesRef} className={styles.hobbiesScene}>
        <div className={styles.hobbiesSticky}>
          <motion.div
            className={styles.hobbiesHeader}
            style={reduceMotion ? undefined : { y: titleY, opacity: titleOpacity }}
          >
            <h2 className={styles.title}>
              When I&apos;m not <span className={styles.italic}>designing</span>
            </h2>
            <p className={styles.description}>
              I&apos;m drawn to mountains, adventure, dance, and shared moments
              that spark joy.
            </p>
          </motion.div>

          <div className={styles.stage}>
            <motion.div
              className={styles.heartStage}
              style={reduceMotion ? undefined : { opacity: heartOpacity, scale: heartScale }}
            >
              <div className={styles.heartGrid}>
                {heartPixels.map(([x, y], index) => (
                  <span
                    key={`${x}-${y}-${index}`}
                    className={styles.pixel}
                    style={{ gridColumn: x + 1, gridRow: y + 1 }}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              className={styles.galleryTrack}
              style={reduceMotion ? undefined : { opacity: galleryOpacity, y: galleryY }}
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

            <span className={`${styles.stageDot} ${styles.stageDotLeft}`}></span>
            <span className={`${styles.stageDot} ${styles.stageDotRight}`}></span>
            <span className={`${styles.stageCube} ${styles.stageCubeLeft}`}></span>
            <span className={`${styles.stageCube} ${styles.stageCubeRight}`}></span>
          </div>
        </div>
      </div>

      <motion.div
        id="contact"
        className={styles.contactPanel}
        style={reduceMotion ? undefined : { y: panelY }}
      >
        <div className={styles.panelLeft}>
          <div className={styles.workBadge}>
            <span className={styles.badgeGlow}></span>
            OPEN TO WORK
          </div>

          <div className={styles.headlineWrap}>
            <h2 className={styles.contactTitle}>Looking for a</h2>
            <p className={styles.contactScript}>Product Designer?</p>
          </div>

          <div className={styles.toolsBoard}>
            <div className={`${styles.toolTile} ${styles.figmaTile}`}>
              <div className={styles.figmaMark} aria-hidden="true">
                <span className={styles.figmaRed}></span>
                <span className={styles.figmaPurple}></span>
                <span className={styles.figmaBlue}></span>
                <span className={styles.figmaGreen}></span>
                <span className={styles.figmaPink}></span>
              </div>
            </div>

            <div className={styles.boltTile} aria-hidden="true">
              <svg viewBox="0 0 74 52" className={styles.boardSvg}>
                <path
                  d="M8 10L35 22L35 8L66 35L35 27L35 42L8 10Z"
                  fill="#8b69fa"
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className={`${styles.toolTile} ${styles.aeTile}`}>
              <span>Ae</span>
            </div>
            <div className={`${styles.toolTile} ${styles.psTile}`}>
              <span>Ps</span>
            </div>
            <div className={`${styles.toolTile} ${styles.aiTile}`}>
              <span>Ai</span>
            </div>

            <div className={`${styles.toolTile} ${styles.starTile}`} aria-hidden="true">
              <svg viewBox="0 0 58 58" className={styles.boardSvg}>
                <path
                  d="M29 11L33.8 22.8L46 24.4L36.9 32.2L39.6 44L29 37.7L18.4 44L21.1 32.2L12 24.4L24.2 22.8L29 11Z"
                  fill="#8b69fa"
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className={`${styles.toolTile} ${styles.smileTile}`} aria-hidden="true">
              <svg viewBox="0 0 62 62" className={styles.boardSvg}>
                <circle cx="31" cy="31" r="20" fill="none" stroke="#8b69fa" strokeWidth="2.4" />
                <circle cx="24" cy="25" r="2.6" fill="#8b69fa" />
                <circle cx="38" cy="25" r="2.6" fill="#8b69fa" />
                <path
                  d="M22 35C24.5 39 28 41 31 41C34 41 37.5 39 40 35"
                  fill="none"
                  stroke="#8b69fa"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className={`${styles.toolTile} ${styles.gearTile}`} aria-hidden="true">
              <svg viewBox="0 0 74 74" className={styles.boardSvg}>
                <path
                  d="M37 13L43 20L53 18L55 28L64 33L59 42L64 51L55 56L53 66L43 64L37 71L31 64L21 66L19 56L10 51L15 42L10 33L19 28L21 18L31 20L37 13Z"
                  fill="#b493ff"
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle cx="37" cy="42" r="8" fill="#8b69fa" />
              </svg>
            </div>

            <div className={styles.dragTile}>
              <span className={styles.dragDot}></span>
              Drag me!
            </div>
          </div>
        </div>

        <div className={styles.panelRight}>
          <p className={styles.letsTalk}>
            Let&apos;s <span>talk</span>
          </p>

          <div className={styles.contactList}>
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className={styles.contactItem}
              >
                <span className={styles.contactIcon}>
                  <ContactBadge type={item.type} />
                </span>
                <span className={styles.contactText}>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
