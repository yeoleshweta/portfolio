"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import styles from "./FeaturedWork.module.css";

const caseStudies = [
  {
    title: "How we reduced mutual fund support tickets by 12% at Navi",
    description:
      "By fixing expectation gaps and reducing post-purchase anxiety in the unit allotment journey",
    image:
      "https://framerusercontent.com/images/jzfSUI7bevQam4vxuI7w91xWZI.png?width=1372&height=968",
    href: "https://www.devashish.design/navi-mutual-fund-support",
  },
  {
    title: "Increased 4% conversion by revamping investment landing page",
    description:
      "Improving discoverability, clarity, and accessibility to drive a significant conversion increase",
    image:
      "https://framerusercontent.com/images/cRVg4Sq0wW8rh829k0LII56TsvQ.png?width=1372&height=968",
    href: "https://www.devashish.design/",
  },
] as const;

const debris = [
  { size: 82, side: "left", rotate: -16 },
  { size: 82, side: "right", rotate: 18 },
  { size: 18, x: -548, y: 118, rotate: 8 },
  { size: 14, x: -252, y: 186, rotate: -12 },
  { size: 16, x: 506, y: 118, rotate: 12 },
  { size: 12, x: 472, y: 194, rotate: -8 },
] as const;

function FloatingDebris({
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
  const x = useTransform(progress, [0, 1], [xOrigin, xOrigin * 0.72]);
  const y = useTransform(progress, [0, 1], [yOrigin, yOrigin - 28]);
  const rotate = useTransform(progress, [0, 1], [rotateOrigin, rotateOrigin + 24]);
  const opacity = useTransform(progress, [0, 0.14, 1], [0, 1, 0.62]);

  return (
    <motion.span
      className={styles.smallDebris}
      style={
        reduceMotion
          ? { width: size, height: size }
          : { width: size, height: size, x, y, rotate, opacity }
      }
    />
  );
}

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 88,
    damping: 22,
    mass: 0.4,
  });

  const titleY = useTransform(progress, [0, 0.26], [64, 0]);
  const titleOpacity = useTransform(progress, [0.06, 0.24], [0, 1]);
  const cardsOpacity = useTransform(progress, [0.12, 0.3], [0, 1]);
  const floorOpacity = useTransform(progress, [0.1, 0.3, 0.86], [0, 1, 0.62]);

  const leftCardX = useTransform(progress, [0, 0.42, 1], [-132, 0, -24]);
  const leftCardY = useTransform(progress, [0, 0.42, 1], [116, 0, -18]);
  const leftCardRotateX = useTransform(progress, [0, 0.42, 1], [70, 0, -4]);
  const leftCardRotateY = useTransform(progress, [0, 0.42, 1], [70, 0, -3]);
  const leftCardScale = useTransform(progress, [0, 0.42, 1], [0.8, 1, 0.99]);

  const rightCardX = useTransform(progress, [0, 0.42, 1], [132, 0, 24]);
  const rightCardY = useTransform(progress, [0, 0.42, 1], [116, 0, -18]);
  const rightCardRotateX = useTransform(progress, [0, 0.42, 1], [70, 0, -4]);
  const rightCardRotateY = useTransform(progress, [0, 0.42, 1], [-70, 0, 3]);
  const rightCardScale = useTransform(progress, [0, 0.42, 1], [0.8, 1, 0.99]);

  return (
    <section id="work" ref={sectionRef} className={styles.section}>
      <div className={styles.scene}>
        <div className={styles.sticky}>
          <div className={styles.debrisLayer} aria-hidden="true">
            {debris.map((piece) =>
              "side" in piece ? (
                <span
                  key={`${piece.side}-${piece.rotate}`}
                  className={`${styles.edgeCube} ${piece.side === "left" ? styles.edgeCubeLeft : styles.edgeCubeRight}`}
                />
              ) : (
                <FloatingDebris
                  key={`${piece.x}-${piece.y}`}
                  progress={progress}
                  reduceMotion={reduceMotion}
                  size={piece.size}
                  xOrigin={piece.x}
                  yOrigin={piece.y}
                  rotateOrigin={piece.rotate}
                />
              ),
            )}
          </div>

          <div className={styles.sceneStack}>
            <motion.div
              className={styles.header}
              style={
                reduceMotion ? undefined : { y: titleY, opacity: titleOpacity }
              }
            >
              <h2 className={styles.title}>
                Case <span className={styles.italic}>studies</span>
              </h2>
            </motion.div>

            <motion.div
              className={styles.cardsStage}
              style={reduceMotion ? undefined : { opacity: cardsOpacity }}
            >
              <motion.article
                className={styles.card}
                style={
                  reduceMotion
                    ? undefined
                    : {
                        x: leftCardX,
                        y: leftCardY,
                        rotateX: leftCardRotateX,
                        rotateY: leftCardRotateY,
                        scale: leftCardScale,
                      }
                }
              >
                <div className={styles.cardImage}>
                  <Image
                    fill
                    src={caseStudies[0].image}
                    alt={caseStudies[0].title}
                    sizes="432px"
                  />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <span className={styles.badge}>CASE STUDY</span>
                    <a
                      href={caseStudies[0].href}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.arrow}
                      aria-label={caseStudies[0].title}
                    >
                      <ArrowUpRight size={36} strokeWidth={1.8} />
                    </a>
                  </div>
                  <h3 className={styles.cardTitle}>{caseStudies[0].title}</h3>
                  <p className={styles.cardDescription}>
                    {caseStudies[0].description}
                  </p>
                </div>
              </motion.article>

              <motion.article
                className={styles.card}
                style={
                  reduceMotion
                    ? undefined
                    : {
                        x: rightCardX,
                        y: rightCardY,
                        rotateX: rightCardRotateX,
                        rotateY: rightCardRotateY,
                        scale: rightCardScale,
                      }
                }
              >
                <div className={styles.cardImage}>
                  <Image
                    fill
                    src={caseStudies[1].image}
                    alt={caseStudies[1].title}
                    sizes="432px"
                  />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <span className={styles.badge}>CASE STUDY</span>
                    <a
                      href={caseStudies[1].href}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.arrow}
                      aria-label={caseStudies[1].title}
                    >
                      <ArrowUpRight size={36} strokeWidth={1.8} />
                    </a>
                  </div>
                  <h3 className={styles.cardTitle}>{caseStudies[1].title}</h3>
                  <p className={styles.cardDescription}>
                    {caseStudies[1].description}
                  </p>
                </div>
              </motion.article>
            </motion.div>
          </div>

          <motion.div
            aria-hidden="true"
            className={styles.floor}
            style={reduceMotion ? undefined : { opacity: floorOpacity }}
          />
        </div>
      </div>
    </section>
  );
}
