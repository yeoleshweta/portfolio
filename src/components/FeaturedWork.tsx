"use client";

import Image from "next/image";
import Link from "next/link";
<<<<<<< HEAD
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
=======
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
>>>>>>> v2
import { useRef } from "react";
import styles from "./FeaturedWork.module.css";

const caseStudies = [
  {
    title: "Measuring Patient-Centered Communication",
    description:
      "Building a scalable, rubric-grounded NLP pipeline that measures patient-centered communication behaviors across real clinical transcripts. Operationalized frameworks like Calgary-Cambridge and NURSE into measurable constructs for ABIM.",
    image: "/assets/abim-hero.png",
    href: "/work/abim",
    cta: "View Case Study",
  },
  {
    title: "Healthcare Bias — NLP Detection",
    description:
      "Machine learning pipelines surfacing implicit clinician bias at scale. Developed NLP models to analyze clinical notes and identify patterns of differential language use across patient demographics, aiming to improve equitable healthcare outcomes.",
    image: "/assets/healthcare-bias-hero.png",
    href: "/work/healthcare-bias",
    cta: "View Case Study",
  },
  {
    title: "Product Managers with UX & Design Thinking",
    description:
<<<<<<< HEAD
      "Design research initiative bridging product management and UX",
    image:
      "https://framerusercontent.com/images/jzfSUI7bevQam4vxuI7w91xWZI.png?width=1372&height=968",
=======
      "Equipping Product Managers at John Deere with UX frameworks and collaborative workflows. Moving from ad-hoc practices to systematic execution across a 250+ product portfolio through a 12-week design thinking initiative.",
    image: "/jd_abstract_ui.png",
>>>>>>> v2
    href: "/work/design-thinking",
    cta: "View Case Study",
  },
  {
<<<<<<< HEAD
    title: "Survey Design Platform — Enterprise UX",
    description: "Internal enterprise UX platform for survey creation",
    image:
      "https://framerusercontent.com/images/cRVg4Sq0wW8rh829k0LII56TsvQ.png?width=1372&height=968",
=======
    title: "Enterprise Survey Logic & Analytics",
    description:
      "Redesigning John Deere's survey tools to eliminate the '2-hour survey tax'. Reduced build time by 60% through a fundamentally restructured mental model featuring inline branching UI and interactive analytics.",
    image: "/micro_learning_ui.png",
>>>>>>> v2
    href: "/work/john-deere",
    cta: "View Case Study",
  },
  {
<<<<<<< HEAD
    title: "Stories by Children — Research & Design",
    description: "Redesigning a children's storytelling platform",
    image:
      "https://framerusercontent.com/images/jzfSUI7bevQam4vxuI7w91xWZI.png?width=1372&height=968",
=======
    title: "Stories by Children — Redesigning for Young Creators",
    description:
      "Increased task success from 50% to 85% for a global storytelling platform. Rebuilt the upload workflow for parents and introduced age-appropriate visual cues to nurture creativity for children aged 6–17.",
    image: "/assets/Reading Challenge.png",
>>>>>>> v2
    href: "/work/stories-by-children",
    cta: "View Case Study",
  },
  {
    title: "E-Commerce Personalization at Scale",
    description:
      "Designing conversion strategies for 50M+ shoppers across seven retail brands. Built personalized recommendation engines and A/B testing frameworks that increased conversion rates and customer engagement for Arcadia Group.",
    image: "/assets/personalization-hero.png",
    href: "/work/personalization",
    cta: "View Case Study",
  },
  {
    title: "GesturePro — Real-Time Sign Language Translation",
    description:
      "An AI-powered sign language translation platform that bridges communication between sign language users and non-signers. Using computer vision and deep learning, it converts hand gestures into text and speech in real-time.",
    image: "/assets/gesturepro-hero.png",
    href: "/work/gesturepro",
    cta: "View Case Study",
  },
  {
    title: "CryptoSecure: AI-Powered Smart Contract Security",
    description:
      "An AI-powered security scanner that analyzes TON smart contracts in seconds, identifying vulnerabilities and auto-generating patched code. Replaces expensive manual audits with accessible, plain-English security insights for any developer.",
    image: "/assets/crypto_secure_hero.png",
    href: "/work/crypto-secure",
    cta: "View Case Study",
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
  {
    title: "Healthcare Bias — NLP Detection",
    description:
      "Machine learning pipelines surfacing implicit clinician bias at scale",
    image: "/assets/healthcare-bias-hero.png",
    href: "/work/healthcare-bias",
  },
  {
    title: "E-Commerce Personalization at Scale",
    description:
      "Designing conversion strategies for 50M+ shoppers across seven retail brands",
    image: "/assets/personalization-hero.png",
    href: "/work/personalization",
  },
] as const;

<<<<<<< HEAD
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
=======
/**
 * Vertical stacking card that responds to scroll.
 *
 * Approach: Each card "owns" its segment of the scroll [i/N, (i+1)/N].
 * - It sits at y=0 (centered) during its segment.
 * - It enters from below (y=100%) at the end of the previous segment.
 * - It exits upward (y=-100%) during the next card's entering phase.
 * - Cards overlap during transitions for a smooth hand-off.
 *
 * No useSpring — direct useTransform for instant 1:1 scroll tracking.
 */
function StackCard({
  study,
  index,
  scrollYProgress,
  total,
}: {
  study: (typeof caseStudies)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
  total: number;
}) {
  const seg = 1 / total;

  // Transition zone: how much of a segment is used for in/out
  const t = seg * 0.45;

  // Key progress points
  const holdStart = index * seg; // this card enters center
  const holdEnd = (index + 1) * seg; // this card leaves center
  const enterStart = holdStart - t; // this card begins entering
  const exitEnd = holdEnd + t; // this card finishes exiting

  // Build arrays for useTransform
  const buildInputOutput = () => {
    const input: number[] = [];
    const yOut: number[] = [];
    const sOut: number[] = [];
    const oOut: number[] = [];

    const stackOffset = index * 24; // Fixed pixel offset for consistent "bands" at the top
    const entryY = 800; // Slide up from 800px below

    if (index === 0) {
      // First card: enters from below, then stacks at the top
      input.push(0, seg * 0.4, seg * 0.6, seg);
      yOut.push(entryY, 0, 0, stackOffset);
      oOut.push(0, 1, 1, 0.7);
    } else if (index === total - 1) {
      // Last card: enters, then stays
      input.push(holdStart - t, holdStart, 1);
      yOut.push(entryY, stackOffset, stackOffset);
      oOut.push(0, 1, 1);
    } else {
      // Middle cards: enter, hold, then stack
      input.push(Math.max(0, holdStart - t), holdStart, holdEnd - t, holdEnd);
      yOut.push(entryY, stackOffset, stackOffset, stackOffset);
      oOut.push(0, 1, 1, 0.7);
    }

    return { input, yOut, oOut };
  };

  const { input, yOut, oOut } = buildInputOutput();

  const y = useTransform(scrollYProgress, input, yOut);
  const opacity = useTransform(scrollYProgress, input, oOut);

  return (
    <motion.div
      className={styles.card}
      style={{
        y: useTransform(y, (v: number) => `${v}px`),
        opacity,
        // Entering cards should appear ABOVE exiting ones
        zIndex: index + 1,
      }}
    >
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{study.title}</h3>
        <p className={styles.cardDescription}>{study.description}</p>
        <Link href={study.href} className={styles.cardCta}>
          {study.cta}
        </Link>
      </div>

      <div className={styles.cardImageContainer}>
        <div className={styles.cardImage}>
          <Image
            fill
            src={study.image}
            alt={study.title}
            sizes="(max-width: 810px) 90vw, 50vw"
            priority={index < 2}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
>>>>>>> v2
    </motion.div>
  );
}

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
<<<<<<< HEAD

  // Track vertical scroll of the entire 500vh section
=======
  const total = caseStudies.length;

>>>>>>> v2
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

<<<<<<< HEAD
  // Vertical scroll drives horizontal translation
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);
  const x = useSpring(xTransform, { stiffness: 45, damping: 18 });

  return (
    <section ref={sectionRef} id="work" className={styles.section}>
      <div className={styles.glowTop} aria-hidden="true" />
      <div className={styles.glowBottom} aria-hidden="true" />
=======
  return (
    <section
      ref={sectionRef}
      id="work"
      className={styles.section}
      // total+1 gives each card ~100vh of scroll + 100vh tail
      style={{ height: `${(total + 1) * 100}vh` }}
    >
>>>>>>> v2
      <div className={styles.stickyContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            featured <span className={styles.italic}>work</span>
          </h2>
<<<<<<< HEAD
=======
        </div>

        <div className={styles.cardStack}>
          {caseStudies.map((study, i) => (
            <StackCard
              key={study.href}
              study={study}
              index={i}
              scrollYProgress={scrollYProgress}
              total={total}
            />
          ))}
>>>>>>> v2
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
