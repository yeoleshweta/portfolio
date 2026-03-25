"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useEffect, RefObject } from "react";
import styles from "./ContactSection.module.css";
import GlassCube from "./GlassCube";

// ── Physics constants ──────────────────────────────────────────────────────
const GRAVITY        = 0.55;  // px / frame²  — pulls everything down
const BOUNCE         = 0.62;  // energy fraction kept on wall / floor hit
const AIR_FRICTION   = 0.991; // multiplied to vx each frame
const FLOOR_FRICTION = 0.82;  // extra x damping when bouncing off floor
const MIN_V          = 0.35;  // stop simulating below this velocity

// ── PhysicsTile ────────────────────────────────────────────────────────────
function PhysicsTile({
  children,
  className,
  containerRef,
}: {
  children: React.ReactNode;
  className?: string;
  containerRef: RefObject<HTMLDivElement>;
}) {
  const elRef  = useRef<HTMLDivElement>(null);
  const x      = useMotionValue(0);
  const y      = useMotionValue(0);
  const vx     = useRef(0);
  const vy     = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);
  const active = useRef(false);

  const stopLoop = () => {
    if (rafRef.current !== undefined) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = undefined;
    }
  };

  // One physics step — called via rAF
  function tick() {
    if (active.current) return;

    const container = containerRef.current;
    const el        = elRef.current;
    if (!container || !el) return;

    const cr = container.getBoundingClientRect();
    const er = el.getBoundingClientRect();

    // Element's natural (CSS) position within container, cancelling current transform
    const natLeft = er.left - cr.left - x.get();
    const natTop  = er.top  - cr.top  - y.get();

    // Allowed offset range before hitting walls
    const minX = -natLeft;
    const maxX =  cr.width  - natLeft - er.width;
    const minY = -natTop;
    const maxY =  cr.height - natTop  - er.height;

    // Integrate
    vy.current += GRAVITY;
    vx.current *= AIR_FRICTION;

    let nx = x.get() + vx.current;
    let ny = y.get() + vy.current;

    // Left / right
    if (nx < minX) { nx = minX; vx.current =  Math.abs(vx.current) * BOUNCE; }
    else if (nx > maxX) { nx = maxX; vx.current = -Math.abs(vx.current) * BOUNCE; }

    // Ceiling
    if (ny < minY) { ny = minY; vy.current = Math.abs(vy.current) * BOUNCE; }

    // Floor
    if (ny > maxY) {
      ny = maxY;
      vy.current  = -Math.abs(vy.current) * BOUNCE;
      vx.current *= FLOOR_FRICTION;
      if (Math.abs(vy.current) < MIN_V) vy.current = 0;
    }

    x.set(nx);
    y.set(ny);

    if (Math.abs(vx.current) > MIN_V || Math.abs(vy.current) > MIN_V) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }

  useEffect(() => () => stopLoop(), []);

  return (
    <motion.div
      ref={elRef}
      drag
      dragMomentum={false}
      dragElastic={0}
      style={{ x, y, cursor: "grab", touchAction: "none" }}
      onDragStart={() => { active.current = true; stopLoop(); }}
      onDragEnd={(_, info) => {
        active.current = false;
        // framer-motion velocity is px/s → convert to px/frame at ~60 fps
        vx.current = info.velocity.x / 72;
        vy.current = info.velocity.y / 72;
        rafRef.current = requestAnimationFrame(tick);
      }}
      whileDrag={{ scale: 1.13, zIndex: 300, cursor: "grabbing" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Static data ────────────────────────────────────────────────────────────
const contactItems = [
  { type: "linkedin" as const, label: "Linkedin",                   href: "https://www.linkedin.com/in/sharmashweta08" },
  { type: "gmail"    as const, label: "shwetayeolesharma@gmail.com", href: "mailto:shwetayeolesharma@gmail.com" },
  { type: "cv"       as const, label: "Download CV",                 href: "/assets/UX_Researcher_Resume.pdf" },
];

const CUBES = [
  { size: 30, x: "10%", y: "15%", duration: 45, delay: 0 },
  { size: 45, x: "85%", y: "10%", duration: 60, delay: 2 },
  { size: 25, x: "75%", y: "65%", duration: 50, delay: 4 },
  { size: 40, x: "20%", y: "80%", duration: 55, delay: 1 },
];

// ── Contact badge icon ─────────────────────────────────────────────────────
function ContactBadge({ type }: { type: "linkedin" | "gmail" | "cv" }) {
  const base = { background: "#e7d6ff", borderRadius: "18px", padding: "14px", boxSizing: "border-box" as const };

  if (type === "linkedin") return (
    <svg viewBox="0 0 24 24" className={styles.contactSvg} aria-hidden="true" style={base}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0A66C2" />
    </svg>
  );

  if (type === "gmail") return (
    <svg viewBox="0 0 24 24" className={styles.contactSvg} aria-hidden="true" style={base}>
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 10.468l8.073-6.975C21.691 2.279 24 3.434 24 5.457Z" fill="#EA4335" />
    </svg>
  );

  return (
    <svg viewBox="0 0 71 69" className={styles.contactSvg} aria-hidden="true">
      <rect x="1" y="1" width="69" height="67" rx="18" fill="#e7d6ff" />
      <rect x="18" y="13" width="35" height="42" rx="7" fill="#f7f1ff" stroke="#8b69fa" strokeWidth="2" />
      <circle cx="35.5" cy="24" r="4.5" fill="#8b69fa" />
      <path d="M26.5 37C26.5 32.86 30.08 29.5 34.5 29.5H36.5C40.92 29.5 44.5 32.86 44.5 37V39H26.5V37Z" fill="#8b69fa" />
      <path d="M25 45H46" stroke="#8b69fa" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M25 50H46" stroke="#8b69fa" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

// ── Page component ─────────────────────────────────────────────────────────
export default function ContactSection() {
  const contactRef   = useRef<HTMLElement>(null);
  const panelRef     = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({ target: contactRef, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 88, damping: 22, mass: 0.42 });
  const panelY   = useTransform(progress, [0, 1], [60, 0]);

  return (
    <section ref={contactRef} className={styles.section}>
      <motion.div
        id="contact"
        ref={panelRef}
        className={styles.contactPanel}
        style={reduceMotion ? undefined : { y: panelY }}
      >
        {/* Ambient background cubes */}
        <div className={styles.backgroundDecoration} aria-hidden="true">
          {CUBES.map((cube, i) => <GlassCube key={i} {...cube} />)}
        </div>

        {/* ── Left panel ── */}
        <div className={styles.panelLeft}>
          <div className={styles.workBadge}>
            <span className={styles.badgeGlow} />
            OPEN TO WORK
          </div>

          <div className={styles.headlineWrap}>
            <h2 className={styles.contactTitle}>Looking for a</h2>
            <p className={styles.contactScript}>UX Researcher?</p>
          </div>

          <div className={styles.toolsBoard}>
            <PhysicsTile containerRef={panelRef} className={`${styles.toolTile} ${styles.figmaTile}`}>
              <div className={styles.figmaMark} aria-hidden="true">
                <span className={styles.figmaRed} /><span className={styles.figmaPurple} />
                <span className={styles.figmaBlue} /><span className={styles.figmaGreen} />
                <span className={styles.figmaPink} />
              </div>
            </PhysicsTile>

            <PhysicsTile containerRef={panelRef} className={styles.boltTile}>
              <svg viewBox="0 0 74 52" className={styles.boardSvg} aria-hidden="true">
                <path d="M8 10L35 22L35 8L66 35L35 27L35 42L8 10Z" fill="#8b69fa" stroke="#000" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </PhysicsTile>

            <PhysicsTile containerRef={panelRef} className={`${styles.toolTile} ${styles.aeTile}`}>
              <span>Py</span>
            </PhysicsTile>

            <PhysicsTile containerRef={panelRef} className={`${styles.toolTile} ${styles.psTile}`}>
              <span>Ps</span>
            </PhysicsTile>

            <PhysicsTile containerRef={panelRef} className={`${styles.toolTile} ${styles.aiTile}`}>
              <span>Xd</span>
            </PhysicsTile>

            <PhysicsTile containerRef={panelRef} className={`${styles.toolTile} ${styles.starTile}`}>
              <svg viewBox="0 0 58 58" className={styles.boardSvg} aria-hidden="true">
                <path d="M29 11L33.8 22.8L46 24.4L36.9 32.2L39.6 44L29 37.7L18.4 44L21.1 32.2L12 24.4L24.2 22.8L29 11Z" fill="#8b69fa" stroke="#000" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </PhysicsTile>

            <PhysicsTile containerRef={panelRef} className={`${styles.toolTile} ${styles.smileTile}`}>
              <svg viewBox="0 0 62 62" className={styles.boardSvg} aria-hidden="true">
                <circle cx="31" cy="31" r="20" fill="none" stroke="#8b69fa" strokeWidth="2.4" />
                <circle cx="24" cy="25" r="2.6" fill="#8b69fa" />
                <circle cx="38" cy="25" r="2.6" fill="#8b69fa" />
                <path d="M22 35C24.5 39 28 41 31 41C34 41 37.5 39 40 35" fill="none" stroke="#8b69fa" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </PhysicsTile>

            <PhysicsTile containerRef={panelRef} className={`${styles.toolTile} ${styles.gearTile}`}>
              <svg viewBox="0 0 74 74" className={styles.boardSvg} aria-hidden="true">
                <path d="M37 13L43 20L53 18L55 28L64 33L59 42L64 51L55 56L53 66L43 64L37 71L31 64L21 66L19 56L10 51L15 42L10 33L19 28L21 18L31 20L37 13Z" fill="#b493ff" stroke="#000" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="37" cy="42" r="8" fill="#8b69fa" />
              </svg>
            </PhysicsTile>

            <PhysicsTile containerRef={panelRef} className={styles.dragTile}>
              <span className={styles.dragDot} />
              Toss me!
            </PhysicsTile>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className={styles.panelRight}>
          <div className={styles.cta}>
            <h2 className={styles.ctaMain}>
              Let&apos;s <span className={styles.italic}>talk</span>
            </h2>
          </div>
          <div className={styles.contactList}>
            {contactItems.map((item) => (
              <a key={item.label} href={item.href}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className={styles.contactItem}
              >
                <span className={styles.contactIcon}><ContactBadge type={item.type} /></span>
                <span className={styles.contactText}>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
