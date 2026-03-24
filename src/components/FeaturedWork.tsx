"use client";

import Link from "next/link";
import styles from "./FeaturedWork.module.css";

const featuredProjects = [
  {
    title: "Measuring Patient-Centered Communication",
    tag: "NLP & UX Research",
    ref: "ABIM-2025 · fig. 01",
    description:
      "Building a scalable, rubric-grounded NLP pipeline that measures patient-centered communication behaviors across real clinical transcripts. Operationalized frameworks like Calgary-Cambridge and NURSE into measurable constructs for ABIM.",
    pills: ["985_conversations", "bert_classifier", "11_constructs"],
    href: "/work/abim",
  },
  {
    title: "PM Design Thinking @ John Deere",
    tag: "UX Research",
    ref: "John-Deere · fig. 02",
    description:
      "Led product design thinking workshops and UX research sprints inside a Fortune 500 enterprise. Embedded mixed-methods research into the PM workflow to validate product decisions and reduce assumption-driven development.",
    pills: ["80%_ux_confidence_lift", "design_thinking", "enterprise_ux"],
    href: "/work/design-thinking",
  },
] as const;

const moreProjects = [
  {
    idx: "03",
    emoji: "🧬",
    tag: "Data Science & ML",
    title: "Healthcare Bias — NLP Detection",
    metric: "4-label bias framework",
    href: "/work/healthcare-bias",
  },
  {
    idx: "04",
    emoji: "📖",
    tag: "UX Research & Design",
    title: "Stories by Children",
    metric: "50% → 85% task success",
    href: "/work/stories-by-children",
  },
  {
    idx: "05",
    emoji: "🛍️",
    tag: "UX Personalization",
    title: "E-Commerce Personalization at Scale",
    metric: "11% conversion lift",
    href: "/work/personalization",
  },
  {
    idx: "06",
    emoji: "📊",
    tag: "Product Design",
    title: "Enterprise Survey Logic & Analytics",
    metric: "60% faster build time",
    href: "/work/john-deere",
  },
  {
    idx: "07",
    emoji: "🤟",
    tag: "AI / Accessibility",
    title: "GesturePro — Sign Language Translation",
    metric: "Real-time, zero hardware",
    href: "/work/gesturepro",
  },
  {
    idx: "08",
    emoji: "🔐",
    tag: "Blockchain / ML",
    title: "CryptoSecure: Smart Contract Security",
    metric: "$10k audit → 30 seconds",
    href: "/work/crypto-secure",
  },
] as const;

export default function FeaturedWork() {
  return (
    <section id="work" className={styles.section}>
      <div className={styles.container}>

        {/* ── Header ── */}
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

        {/* ── Featured 2-col cards ── */}
        <div className={styles.featuredGrid}>
          {featuredProjects.map((p) => (
            <Link key={p.href} href={p.href} className={styles.featuredCard}>
              <span className={styles.cornerTL} />
              <span className={styles.cornerTR} />
              <span className={styles.cornerBL} />
              <span className={styles.cornerBR} />

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

        {/* ── Divider ── */}
        <div className={styles.divider} />

        {/* ── More projects 3-col ── */}
        <div className={styles.moreGrid}>
          {moreProjects.map((p) => (
            <Link key={p.href} href={p.href} className={styles.miniCard}>
              <div className={styles.miniTop}>
                <span className={styles.miniIdx}>{p.idx}</span>
                <span className={styles.miniEmoji}>{p.emoji}</span>
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
