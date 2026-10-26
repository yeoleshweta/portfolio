"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import {
  BadgePercent,
  Book,
  ChevronLeft,
  ChevronRight,
  CloudSun,
  Hand,
  MessageCircle,
  MessageSquare,
  Shield,
  Shirt,
  ShoppingBag,
  Stethoscope,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useMotionOff } from "@/components/MotionControl";
import { HIDDEN_STUDIES } from "@/content/caseStudyBriefs";
import { CASE_STUDIES, type CaseStudyMeta } from "@/lib/caseStudyMeta";
import styles from "./AboutMeSection.module.css";

const FEATURED_SLUGS = new Set([
  "john-deere-sus",
  "fuel-design-system",
  "personalization",
  "abim",
]);

/** Studies that are not in the featured four, in slider order. Hidden ones (HIDDEN_STUDIES) are filtered out below. */
const SLUGS = [
  "poshmera",
  "pm-ux-study",
  "team-contract",
  "gesturepro",
  "crypto-secure",
  "stories-by-children",
  "miss-selfridge",
  "dorothy-perkins",
  "evans",
  "burton",
  "healthcare-bias",
  "my-ai-friends",
] as const;

const ICONS: Record<(typeof SLUGS)[number], LucideIcon> = {
  poshmera: Shirt,
  "pm-ux-study": MessageSquare,
  "healthcare-bias": Stethoscope,
  gesturepro: Hand,
  "miss-selfridge": ShoppingBag,
  "dorothy-perkins": BadgePercent,
  evans: TrendingUp,
  burton: CloudSun,
  "team-contract": Users,
  "crypto-secure": Shield,
  "my-ai-friends": MessageCircle,
  "stories-by-children": Book,
};

/** Short outcomes already used on the site. Studies without one fall back to the description. */
const METRICS: Partial<Record<(typeof SLUGS)[number], string>> = {
  poshmera: "8,000 installs in month one (as reported)",
  "pm-ux-study": "8 PM interviews",
  "healthcare-bias": "4-label framework",
  gesturepro: "Real-time, zero hardware",
  "miss-selfridge": "47% new customer rate",
  "dorothy-perkins": "Segmented 50% of UK sales (as reported)",
  evans: "2.5% to 8.43% RPV uplift",
  burton: "+11.6% conversion lift",
  "team-contract": "9 participants · ~230 observations",
};

type StudyCard = CaseStudyMeta & {
  slug: (typeof SLUGS)[number];
  outcome: string;
};

function firstClause(description: string) {
  const sentence = description.replace(/\.\s*$/, "");
  const purpose = sentence.search(/\s+so\s+/i);
  if (purpose > 24) return sentence.slice(0, purpose);
  const comma = sentence.indexOf(",");
  if (comma > 24) return sentence.slice(0, comma);
  return sentence;
}

const STUDIES: StudyCard[] = SLUGS.filter(
  (slug) => !FEATURED_SLUGS.has(slug) && !HIDDEN_STUDIES.has(slug),
).map((slug) => {
  const study = CASE_STUDIES[slug];
  return {
    ...study,
    slug,
    outcome: METRICS[slug] ?? firstClause(study.description),
  };
});

export default function AboutMeSection() {
  const motionOff = useMotionOff();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(max <= 1 || el.scrollLeft >= max - 1);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      observer.disconnect();
    };
  }, [updateEdges]);

  const scrollByCard = useCallback(
    (direction: -1 | 1) => {
      const el = scrollerRef.current;
      if (!el) return;
      const card = el.querySelector<HTMLElement>("[data-card]");
      const gap = Number.parseFloat(getComputedStyle(el).columnGap || "16") || 16;
      const distance = (card?.getBoundingClientRect().width ?? 280) + gap;
      el.scrollBy({
        left: direction * distance,
        behavior: motionOff ? "auto" : "smooth",
      });
    },
    [motionOff],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByCard(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCard(-1);
    }
  };

  return (
    <section
      id="about"
      className={styles.section}
      aria-labelledby="micro-studies-title"
      data-motion={motionOff ? "off" : "on"}
    >
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.inner}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>// micro case studies</p>
            <h2 id="micro-studies-title" className={styles.title}>
              Micro case <span className={styles.titleAccent}>studies.</span>
            </h2>
          </div>
          <div className={styles.controls} role="group" aria-label="Micro case studies">
            <button
              type="button"
              className={styles.navButton}
              aria-label="Previous study"
              disabled={atStart}
              onClick={() => scrollByCard(-1)}
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              className={styles.navButton}
              aria-label="Next study"
              disabled={atEnd}
              onClick={() => scrollByCard(1)}
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </header>

        <div
          ref={scrollerRef}
          className={styles.scroller}
          data-lenis-prevent
          onKeyDown={onKeyDown}
        >
          {STUDIES.map((study) => {
            const Icon = ICONS[study.slug];
            return (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className={styles.card}
                data-card
                aria-label={study.title}
                data-track="project_card_click"
                data-track-project-slug={study.slug}
                data-track-project-title={study.title}
                data-track-project-tag={study.category}
                data-track-card-group="slider"
                data-track-card-position={SLUGS.indexOf(study.slug) + 1}
                data-track-location="micro_case_studies"
              >
                <span className={styles.icon}>
                  <Icon aria-hidden="true" strokeWidth={1.75} />
                </span>
                <p className={styles.category}>{study.category}</p>
                <h3 className={styles.cardTitle}>{study.title}</h3>
                <p className={styles.outcome}>{study.outcome}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
