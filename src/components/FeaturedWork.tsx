"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import styles from "./FeaturedWork.module.css";

const caseStudies = [
  {
    title: "EcoMed AI",
    description:
      "An intelligent AI system developed for Philly {Codefest} '25, creating practical solutions for greener healthcare systems. EcoMed analyzes hospital inventories to recommend affordable, high-quality sustainable supplies using a 'BOM Processing System' and leverages 'Image Classification' using ResNet50 to accurately sort waste, preventing costly hazardous-waste disposal.",
    image:
      "https://framerusercontent.com/images/jzfSUI7bevQam4vxuI7w91xWZI.png?width=1372&height=968",
    href: "/work/design-thinking",
    cta: "View Case Study",
  },
  {
    title: "Fact-checker Tool",
    description:
      "Factchecker is a modular pipeline that extracts claims from LLM-generated text, retrieves supporting evidence, and verifies accuracy using both LLM-based checks and tools like Factool achieving an F1-score of 0.87. The platform addresses the growing challenge of misinformation by providing users with an intuitive interface to verify claims while ensuring transparency through detailed analysis reports.",
    image:
      "https://framerusercontent.com/images/cRVg4Sq0wW8rh829k0LII56TsvQ.png?width=1372&height=968",
    href: "/work/john-deere",
    cta: "View on GitHub",
  },
  {
    title: "GesturePro — An Interactive Sign Language Translator",
    description:
      "GesturePro is an AI-powered sign language translation platform that bridges communication between sign language users and non-signers. Using computer vision and deep learning, it converts real-time hand gestures into text and speech, enabling seamless two-way communication.",
    image: "/assets/gesturepro-hero.png",
    href: "/work/gesturepro",
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
    title: "E-Commerce Personalization at Scale",
    description:
      "Designing conversion strategies for 50M+ shoppers across seven retail brands. Built personalized recommendation engines and A/B testing frameworks to deliver tailored shopping experiences that increased conversion rates and customer engagement.",
    image: "/assets/personalization-hero.png",
    href: "/work/personalization",
    cta: "View Case Study",
  },
] as const;

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

    if (index === 0) {
      // First card: start visible, then exit
      input.push(0, holdEnd - t, holdEnd, holdEnd + t * 0.4);
      yOut.push(0, 0, -40, -100);
      sOut.push(1, 1, 0.95, 0.88);
      oOut.push(1, 1, 0.7, 0);
    } else if (index === total - 1) {
      // Last card: enter, then stay
      input.push(Math.max(0, holdStart - t), holdStart, 1);
      yOut.push(100, 0, 0);
      sOut.push(0.88, 1, 1);
      oOut.push(0, 1, 1);
    } else {
      // Middle cards: enter, hold, exit
      const eStart = Math.max(0, holdStart - t);
      input.push(
        eStart,
        holdStart,
        holdEnd - t,
        holdEnd,
        Math.min(1, holdEnd + t * 0.4),
      );
      yOut.push(100, 0, 0, -40, -100);
      sOut.push(0.88, 1, 1, 0.95, 0.88);
      oOut.push(0, 1, 1, 0.7, 0);
    }

    return { input, yOut, sOut, oOut };
  };

  const { input, yOut, sOut, oOut } = buildInputOutput();

  const y = useTransform(scrollYProgress, input, yOut);
  const scale = useTransform(scrollYProgress, input, sOut);
  const opacity = useTransform(scrollYProgress, input, oOut);

  return (
    <motion.div
      className={styles.card}
      style={{
        y: useTransform(y, (v: number) => `${v}%`),
        scale,
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
    </motion.div>
  );
}

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const total = caseStudies.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      id="work"
      className={styles.section}
      // total+1 gives each card ~100vh of scroll + 100vh tail
      style={{ height: `${(total + 1) * 100}vh` }}
    >
      <div className={styles.stickyContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            featured <span className={styles.italic}>work</span>
          </h2>
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
        </div>
      </div>
    </section>
  );
}
