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

const contactItems = [
  {
    type: "linkedin",
    label: "Linkedin",
    href: "https://www.linkedin.com/in/sharmashweta08",
  },
  {
    type: "gmail",
    label: "shwetayeolesharma@gmail.com",
    href: "mailto:shwetayeolesharma@gmail.com",
  },
  {
    type: "cv",
    label: "Download CV",
    href: "/assets/UX_Researcher_Resume.pdf",
  },
] as const;

import GlassCube from "./GlassCube";

const CUBES = [
  { size: 30, x: "10%", y: "15%", duration: 45, delay: 0 },
  { size: 45, x: "85%", y: "10%", duration: 60, delay: 2 },
  { size: 25, x: "75%", y: "65%", duration: 50, delay: 4 },
  { size: 40, x: "20%", y: "80%", duration: 55, delay: 1 },
];

function ContactBadge({
  type,
}: {
  type: (typeof contactItems)[number]["type"];
}) {
  if (type === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className={styles.contactSvg} aria-hidden="true">
        <path
          d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
          fill="#0077b5"
        />
      </svg>
    );
  }

  if (type === "gmail") {
    return (
      <svg viewBox="0 0 24 24" className={styles.contactSvg} aria-hidden="true">
        <path
          d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.38l-9 6.62-9-6.62V21H1.5C.65 21 0 20.35 0 19.5v-15c0-.42.17-.8.45-1.1.28-.3.65-.4 1.05-.4L12 11l10.5-8c.4 0 .77.1 1.05.4.28.3.45.68.45 1.1z"
          fill="#EA4335"
        />
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
      <path
        d="M25 45H46"
        stroke="#8b69fa"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M25 50H46"
        stroke="#8b69fa"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ContactSection() {
  const contactRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: contactRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 88,
    damping: 22,
    mass: 0.42,
  });

  const panelY = useTransform(progress, [0, 1], [60, 0]);

  return (
    <section ref={contactRef} className={styles.section}>
      <motion.div
        id="contact"
        className={styles.contactPanel}
        style={reduceMotion ? undefined : { y: panelY }}
      >
        {/* Background Animation */}
        <div className={styles.backgroundDecoration} aria-hidden="true">
          {CUBES.map((cube, i) => (
            <GlassCube key={i} {...cube} />
          ))}
        </div>
        <div className={styles.panelLeft}>
          <div className={styles.workBadge}>
            <span className={styles.badgeGlow}></span>
            OPEN TO WORK
          </div>

          <div className={styles.headlineWrap}>
            <h2 className={styles.contactTitle}>Looking for a</h2>
            <p className={styles.contactScript}>UX Researcher?</p>
          </div>

          <div className={styles.toolsBoard}>
            <motion.div
              drag
              dragConstraints={{
                left: -100,
                right: 100,
                top: -100,
                bottom: 100,
              }}
              dragElastic={0.06}
              whileDrag={{ scale: 1.1, zIndex: 10 }}
              className={`${styles.toolTile} ${styles.figmaTile}`}
            >
              <div className={styles.figmaMark} aria-hidden="true">
                <span className={styles.figmaRed}></span>
                <span className={styles.figmaPurple}></span>
                <span className={styles.figmaBlue}></span>
                <span className={styles.figmaGreen}></span>
                <span className={styles.figmaPink}></span>
              </div>
            </motion.div>

            <motion.div
              drag
              dragConstraints={{
                left: -100,
                right: 100,
                top: -100,
                bottom: 100,
              }}
              dragElastic={0.06}
              whileDrag={{ scale: 1.1, zIndex: 10 }}
              className={styles.boltTile}
              aria-hidden="true"
            >
              <svg viewBox="0 0 74 52" className={styles.boardSvg}>
                <path
                  d="M8 10L35 22L35 8L66 35L35 27L35 42L8 10Z"
                  fill="#8b69fa"
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            <motion.div
              drag
              dragConstraints={{
                left: -100,
                right: 100,
                top: -100,
                bottom: 100,
              }}
              dragElastic={0.06}
              whileDrag={{ scale: 1.1, zIndex: 10 }}
              className={`${styles.toolTile} ${styles.aeTile}`}
            >
              <span>Py</span>
            </motion.div>
            <motion.div
              drag
              dragConstraints={{
                left: -100,
                right: 100,
                top: -100,
                bottom: 100,
              }}
              dragElastic={0.06}
              whileDrag={{ scale: 1.1, zIndex: 10 }}
              className={`${styles.toolTile} ${styles.psTile}`}
            >
              <span>Ps</span>
            </motion.div>
            <motion.div
              drag
              dragConstraints={{
                left: -100,
                right: 100,
                top: -100,
                bottom: 100,
              }}
              dragElastic={0.06}
              whileDrag={{ scale: 1.1, zIndex: 10 }}
              className={`${styles.toolTile} ${styles.aiTile}`}
            >
              <span>Xd</span>
            </motion.div>

            <div
              className={`${styles.toolTile} ${styles.starTile}`}
              aria-hidden="true"
            >
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

            <div
              className={`${styles.toolTile} ${styles.smileTile}`}
              aria-hidden="true"
            >
              <svg viewBox="0 0 62 62" className={styles.boardSvg}>
                <circle
                  cx="31"
                  cy="31"
                  r="20"
                  fill="none"
                  stroke="#8b69fa"
                  strokeWidth="2.4"
                />
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

            <div
              className={`${styles.toolTile} ${styles.gearTile}`}
              aria-hidden="true"
            >
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
          <div className={styles.cta}>
            <h2 className={styles.ctaMain}>
              Let&apos;s <span className={styles.italic}>talk</span>
            </h2>
          </div>
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
