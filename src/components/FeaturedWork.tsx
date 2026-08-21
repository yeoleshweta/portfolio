"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import styles from "./FeaturedWork.module.css";

const featuredProjects = [
  {
    title: "From Frameworks to F1 Scores: Designing a Scalable Communication Assessment System",
    tag: "NLP & UX Research",
    ref: "ABIM-2025 · fig. 01",
    description:
      "Building a scalable, rubric-grounded NLP pipeline that measures patient-centered communication behaviors across real clinical transcripts. Operationalized frameworks like Calgary-Cambridge and NURSE into measurable constructs for ABIM.",
    pills: ["985_conversations", "bert_classifier", "11_constructs"],
    href: "/work/abim",
  },
  {
    title: "No UX, No Problem? A Qualitative Study into How Product Managers Navigate UX Without UX Support",
    tag: "UX Research",
    ref: "John-Deere · fig. 02",
    description:
      "A qualitative study into how Product Managers at John Deere navigate product design and UX decisions without dedicated support. Co-designed a systemic programme scaling UX literacy and tool adoption.",
    pills: ["100%_tool_adoption", "86_nps", "83%_buddy_retention"],
    href: "/work/design-thinking",
  },
] as const;

const moreProjects = [
  {
    idx: "03",
    tag: "Data Science & ML",
    title: "Healthcare Bias — NLP Detection",
    metric: "4-label bias framework",
    href: "/work/healthcare-bias",
  },
  {
    idx: "04",
    tag: "Quantitative UXR",
    title: "What Analytics Couldn't Tell Us: Pairing Exit Intercepts with Behavioral Data at Topshop",
    metric: "+5.8% conversion lift",
    href: "/work/personalization",
  },
  {
    idx: "05",
    tag: "Quantitative UXR",
    title: "When Did Better Actually Mean Better? A Longitudinal Usability Study",
    metric: "SUS Score: 60 → 85.6 (+25.6)",
    href: "/work/john-deere",
  },
  {
    idx: "06",
    tag: "AI / Accessibility",
    title: "GesturePro — Sign Language Translation",
    metric: "Real-time, zero hardware",
    href: "/work/gesturepro",
  },
  {
    idx: "07",
    tag: "Quantitative UXR",
    title: "Would they have bought anyway? Measuring true incrementality for Miss Selfridge",
    metric: "47% new customer rate",
    href: "/work/miss-selfridge",
  },
  {
    idx: "08",
    tag: "Quantitative UXR",
    title: "Why Were Students Not Saving? Segment Aware Personalization at Dorothy Perkins",
    metric: "Segmented 50% of UK sales",
    href: "/work/dorothy-perkins",
  },
  {
    idx: "09",
    tag: "Quantitative UXR",
    title: "Do Small Wins Compound? Six Measured Experiments, One Revenue Per Visitor Discipline at Evans",
    metric: "2.5% to 8.43% RPV uplift",
    href: "/work/evans",
  },
  {
    idx: "10",
    tag: "Quantitative UXR",
    title: "Should the Homepage Check the Forecast? Weather and Geolocation at Burton",
    metric: "+11.6% conversion lift",
    href: "/work/burton",
  },
  {
    idx: "11",
    tag: "Design Systems",
    title: "Fuel Design System: Building at Scale Inside John Deere's Enterprise Design System",
    metric: "100+ screens on one system",
    href: "/work/fuel-design-system",
  },
  {
    idx: "12",
    tag: "UX Research · Product Design",
    title: "Team Contract: Making Program Metrics Defensible",
    metric: "9 participants · ~230 observations",
    href: "/work/team-contract",
  },
] as const;

const CARD_GAP = 14;
/** Ignore sub-pixel / snap residual so edge arrows hide cleanly. */
const SCROLL_EDGE_EPS = 8;

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === "left" ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 18 15 12 9 6" />
      )}
    </svg>
  );
}

export default function FeaturedWork() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateScrollState = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScroll = Math.max(0, scrollWidth - clientWidth);
      setCanScrollLeft(scrollLeft > SCROLL_EDGE_EPS);
      setCanScrollRight(maxScroll > SCROLL_EDGE_EPS && scrollLeft < maxScroll - SCROLL_EDGE_EPS);
    };

    const normalizeStart = () => {
      // Clear tiny residual offset from snap/layout so left arrow stays hidden at start.
      if (el.scrollLeft > 0 && el.scrollLeft < SCROLL_EDGE_EPS) {
        el.scrollLeft = 0;
      }
      updateScrollState();
    };

    normalizeStart();
    // Re-measure after layout settles (flex card widths can lag first paint).
    const raf = requestAnimationFrame(normalizeStart);

    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    window.addEventListener("resize", updateScrollState);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;

    const card = el.querySelector<HTMLElement>("[data-mini-card]");
    const amount = card
      ? card.offsetWidth + CARD_GAP
      : Math.max(el.clientWidth / 3, 240);
    el.scrollTo({ left: el.scrollLeft + direction * amount, behavior: "smooth" });
  };

  const handleArrowClick = (
    event: MouseEvent<HTMLButtonElement>,
    direction: -1 | 1,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    scrollByCard(direction);
  };

  return (
    <section id="work" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <p className={styles.eyebrow}>// featured_work.index</p>
            <h2 className={styles.title}>
              Selected<br />
              <em className={styles.titleItalic}>research &<br />design.</em>
            </h2>
          </div>
          <div className={styles.headerMeta}>
            doc: portfolio/work<br />
            version: 2026.1<br />
            status: open_to_work<br />
            <span className={styles.metaDash}>──────────────────</span>
          </div>
        </div>

        <div className={styles.featuredGrid}>
          {featuredProjects.map((p, i) => (
            <Link
              key={p.href}
              href={p.href}
              className={styles.featuredCard}
              data-track="project_card_click"
              data-track-project-slug={p.href.replace("/work/", "")}
              data-track-project-title={p.title}
              data-track-project-tag={p.tag}
              data-track-card-group="featured"
              data-track-card-position={i + 1}
              data-track-location="featured_work"
            >
              <span className={styles.cardTag}>{p.tag}</span>
              <span className={styles.cardRef}>[ref: {p.ref}]</span>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.description}</p>

              <div className={styles.pills}>
                {p.pills.map((pill) => (
                  <span key={pill} className={styles.pill}>{pill}</span>
                ))}
              </div>

              <span className={styles.cta}>→ view case study</span>
            </Link>
          ))}
        </div>

        <div className={styles.divider} />

        <div className={styles.moreHeader}>
          <span className={styles.moreLabel}>// more work</span>
          <div className={styles.scrollControls} aria-hidden={!canScrollLeft && !canScrollRight}>
            {/* Fixed two-slot grid reserves space so appearing/disappearing arrows don't shift layout */}
            <div className={styles.scrollSlot}>
              {canScrollLeft ? (
                <button
                  type="button"
                  className={styles.scrollArrow}
                  onClick={(e) => handleArrowClick(e, -1)}
                  onPointerDown={(e) => e.stopPropagation()}
                  aria-label="Scroll more work left"
                  data-track="carousel_scroll"
                  data-track-direction="left"
                  data-track-location="featured_work"
                >
                  <ArrowIcon direction="left" />
                </button>
              ) : null}
            </div>
            <div className={styles.scrollSlot}>
              {canScrollRight ? (
                <button
                  type="button"
                  className={styles.scrollArrow}
                  onClick={(e) => handleArrowClick(e, 1)}
                  onPointerDown={(e) => e.stopPropagation()}
                  aria-label="Scroll more work right"
                  data-track="carousel_scroll"
                  data-track-direction="right"
                  data-track-location="featured_work"
                >
                  <ArrowIcon direction="right" />
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className={styles.moreScroll}
          role="list"
          aria-label="More case studies"
          data-lenis-prevent
        >
          {moreProjects.map((p, i) => (
            <Link
              key={p.href}
              href={p.href}
              className={styles.miniCard}
              role="listitem"
              data-mini-card
              data-track="project_card_click"
              data-track-project-slug={p.href.replace("/work/", "")}
              data-track-project-title={p.title}
              data-track-project-tag={p.tag}
              data-track-card-group="more_work"
              data-track-card-position={i + 1}
              data-track-location="featured_work"
            >
              <div className={styles.miniTop}>
                <span className={styles.miniIdx}>{p.idx}</span>
              </div>
              <span className={styles.miniTag}>{p.tag}</span>
              <h4 className={styles.miniTitle}>{p.title}</h4>
              <p className={styles.miniMetric}>{p.metric}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
