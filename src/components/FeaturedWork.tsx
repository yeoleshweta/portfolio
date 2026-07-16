"use client";

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
    tag: "UX Research & Design",
    title: "Stories by Children",
    metric: "50% → 85% task success",
    href: "/work/stories-by-children",
  },
  {
    idx: "05",
    tag: "Quantitative UXR",
    title: "What Analytics Couldn't Tell Us: Pairing Exit Intercepts with Behavioral Data at Topshop",
    metric: "+5.8% conversion lift",
    href: "/work/personalization",
  },
  {
    idx: "06",
    tag: "Quantitative UXR",
    title: "When Did Better Actually Mean Better? A Longitudinal Usability Study",
    metric: "SUS Score: 60 → 85.6 (+25.6)",
    href: "/work/john-deere",
  },
  {
    idx: "07",
    tag: "AI / Accessibility",
    title: "GesturePro — Sign Language Translation",
    metric: "Real-time, zero hardware",
    href: "/work/gesturepro",
  },
  {
    idx: "08",
    tag: "Quantitative UXR",
    title: "Would they have bought anyway? Measuring true incrementality for Miss Selfridge",
    metric: "47% new customer rate",
    href: "/work/miss-selfridge",
  },
  {
    idx: "09",
    tag: "Quantitative UXR",
    title: "Why Were Students Not Saving? Segment Aware Personalization at Topman",
    metric: "Segmented 50% of UK sales",
    href: "/work/topman",
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
