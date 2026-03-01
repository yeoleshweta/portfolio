"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CubeScene from "./CubeScene";
import styles from "./DevashishLanding.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const sections = [
  {
    id: "work",
    eyebrow: "Selected Work",
    title: "Interface systems shaped for clarity, speed, and emotional recall.",
    body: "A product design practice spanning fintech, AI tools, and ambitious digital experiences. Each project leans on motion and crisp hierarchy instead of visual noise.",
  },
  {
    id: "about",
    eyebrow: "Approach",
    title: "Research-backed storytelling with motion that earns attention.",
    body: "The page uses pinned perspective, staggered reveals, and layered typography to recreate the reference cadence while staying responsive and performant.",
  },
];

export default function DevashishLanding() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      const navItems = gsap.utils.toArray<HTMLElement>("[data-nav-item]", root);
      const revealItems = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
      const hero = root.querySelector<HTMLElement>("[data-hero]");
      const title = root.querySelector<HTMLElement>("[data-title]");
      const script = root.querySelector<HTMLElement>("[data-script]");
      const bio = root.querySelector<HTMLElement>("[data-bio]");

      gsap.fromTo(
        navItems,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.06,
        },
      );

      if (hero && title && script && bio) {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

        timeline
          .from(title.children, {
            yPercent: 110,
            opacity: 0,
            duration: 1.1,
            stagger: 0.12,
          })
          .from(
            script,
            {
              x: -80,
              y: 40,
              rotate: -8,
              opacity: 0,
              duration: 1,
            },
            0.3,
          )
          .from(
            bio,
            {
              y: 24,
              opacity: 0,
              duration: 0.9,
            },
            0.55,
          );

        gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
          .to(title, { yPercent: 16 }, 0)
          .to(script, { x: 140, y: -88, rotate: -10 }, 0)
          .to(bio, { y: 36, opacity: 0.4 }, 0);
      }

      revealItems.forEach((element) => {
        gsap.fromTo(
          element,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 78%",
            },
          },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <div className={styles.page} ref={rootRef}>
      <header className={styles.navbar}>
        <a href="#top" className={styles.brand} data-nav-item>
          shweta <span className={styles.brandDot}>.</span>
          <span className={styles.brandScript}>design</span>
        </a>
        <nav className={styles.navLinks}>
          <a href="#work" data-nav-item>
            Work
          </a>
          <a href="#about" data-nav-item>
            About
          </a>
          <a href="#notes" data-nav-item>
            Notes
          </a>
          <a href="#contact" data-nav-item>
            Contact
          </a>
        </nav>
      </header>

      <section className={styles.hero} id="top" data-hero>
        <div className={styles.heroCopy}>
          <div className={styles.titleWrap}>
            <h1 className={styles.title} data-title>
              <span className={styles.titleLine}>SOLVING</span>
              <span className={styles.titleLine}>PROBLEMS.</span>
            </h1>
            <span className={styles.script} data-script>
              design
            </span>
            <span className={styles.watermark}>design</span>
          </div>

          <div className={styles.bio} data-bio>
            <Image
              className={styles.avatar}
              src="https://framerusercontent.com/images/7xLqLqX0X6z4gYX9H6tQY.png"
              alt="Shweta Sharma"
              width={44}
              height={44}
            />
            <p>
              Hi! I&apos;m <strong>Shweta Sharma</strong>, a product designer based in
              Mumbai, currently streamlining fintech journeys at Navi.
            </p>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <CubeScene />
        </div>

        <div className={styles.scrollHint}>
          <span className={styles.scrollMouse}>
            <span className={styles.scrollWheel} />
          </span>
        </div>
      </section>

      <section className={styles.contentSection}>
        {sections.map((section) => (
          <article
            className={styles.statement}
            id={section.id}
            key={section.eyebrow}
            data-reveal
          >
            <span className={styles.eyebrow}>{section.eyebrow}</span>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      <section className={styles.docsSection} id="notes" data-reveal>
        <span className={styles.eyebrow}>Implementation Notes</span>
        <div className={styles.docsGrid}>
          <article>
            <h3>Animation logic</h3>
            <p>
              The cube uses CSS 3D transforms for each cubie face, a GSAP intro
              timeline for assembly, continuous idle rotation, pointer-driven tilt,
              and a scroll-scrubbed transform that shifts the object through the
              hero exit.
            </p>
          </article>
          <article>
            <h3>Library versions</h3>
            <p>
              `next@16.1.6`, `react@19.2.3`, `gsap@3.14.2`,
              `@gsap/react@2.1.2`, and `lenis@1.3.17`.
            </p>
          </article>
          <article>
            <h3>Build steps</h3>
            <p>
              Run `npm install`, then `npm run dev` for local work. Production
              builds use `npm run build` followed by `npm run start`.
            </p>
          </article>
        </div>
      </section>

      <footer className={styles.footer} id="contact" data-reveal>
        <p>Open to product design, motion systems, and interactive landing pages.</p>
        <a href="mailto:hello@shwetasharma.design">hello@shwetasharma.design</a>
      </footer>
    </div>
  );
}
