"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import styles from "./FeaturedWork.module.css";

const caseStudies = [
  {
    title: "Product Managers with UX & Design Thinking",
    description:
      "Design research initiative bridging product management and UX",
    image:
      "https://framerusercontent.com/images/jzfSUI7bevQam4vxuI7w91xWZI.png?width=1372&height=968",
    href: "/work/design-thinking",
  },
  {
    title: "Survey Design Platform — Enterprise UX",
    description: "Internal enterprise UX platform for survey creation",
    image:
      "https://framerusercontent.com/images/cRVg4Sq0wW8rh829k0LII56TsvQ.png?width=1372&height=968",
    href: "/work/john-deere",
  },
  {
    title: "Stories by Children — Research & Design",
    description: "Redesigning a children's storytelling platform",
    image:
      "https://framerusercontent.com/images/jzfSUI7bevQam4vxuI7w91xWZI.png?width=1372&height=968",
    href: "/work/stories-by-children",
  },
  {
    title: "GesturePro — Sign Language Translator",
    description: "AI-powered sign language to text translation",
    image: "/assets/gesturepro-hero.png",
    href: "/work/gesturepro",
  },
  {
    title: "ABIM — Patient Communication NLP",
    description: "NLP pipeline measuring physician communication behaviors",
    image: "/assets/abim-hero.png",
    href: "/work/abim",
  },
] as const;

/* ── Project Card ── */
function CarouselCard({
  study,
  index,
  scrollProgress,
}: {
  study: (typeof caseStudies)[number];
  index: number;
  scrollProgress: any;
}) {
  // Map card position relative to the scroll progress
  // Pacing adjusted for forensic video match (Mar 4 signature)
  const startOffset = index * 0.18;
  const peakOffset = startOffset + 0.1;
  const endOffset = startOffset + 0.2;

  // Forensic Scale (1.5x peak) and Opacity
  const rawScale = useTransform(
    scrollProgress,
    [startOffset, peakOffset, endOffset],
    [0.8, 1.5, 0.8],
  );
  const rawOpacity = useTransform(
    scrollProgress,
    [startOffset, peakOffset, endOffset],
    [0.3, 1, 0.3],
  );
  const labelOpacity = useTransform(
    scrollProgress,
    [peakOffset - 0.05, peakOffset, peakOffset + 0.05],
    [0, 1, 0],
  );

  // Spring for luxurious but responsive feel
  const scale = useSpring(rawScale, { stiffness: 60, damping: 20 });
  const opacity = useSpring(rawOpacity, { stiffness: 60, damping: 20 });

  return (
    <motion.div
      className={styles.cardWrapper}
      style={{
        scale,
        opacity,
      }}
    >
      <span className={styles.indexNumber}>0{index + 1}</span>

      <Link
        href={study.href}
        className={styles.cardLink}
        style={{ width: "100%" }}
      >
        <article className={styles.card}>
          <div className={styles.cardImage}>
            <Image
              fill
              src={study.image}
              alt={study.title}
              sizes="600px"
              priority={index < 2}
              style={{ objectFit: "cover" }}
            />
          </div>
        </article>
      </Link>

      <motion.span
        className={styles.exploreLabel}
        style={{ opacity: labelOpacity }}
      >
        Download now
      </motion.span>
    </motion.div>
  );
}

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);

  // Track vertical scroll of the entire 500vh section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Vertical scroll drives horizontal translation
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);
  const x = useSpring(xTransform, { stiffness: 45, damping: 18 });

  return (
    <section ref={sectionRef} id="work" className={styles.section}>
      <div className={styles.stickyContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            featured <span className={styles.italic}>work</span>
          </h2>
        </div>

        <motion.div className={styles.carouselTrack} style={{ x }}>
          {caseStudies.map((study, i) => (
            <CarouselCard
              key={study.href}
              study={study}
              index={i}
              scrollProgress={scrollYProgress}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
