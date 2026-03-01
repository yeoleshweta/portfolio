"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Building2 } from "lucide-react";
import styles from "./Experience.module.css";

const experiences = [
  {
    company: "American Board Of Internal Medicine",
    role: "Data Analyst CO-OP (Data Science)",
    period: "Sep 2025 – Present",
    location: "Philadelphia, US",
    bullets: [
      "Building NLP pipelines and ML models in a healthcare data environment. Engineering bias detection frameworks using fine-tuned transformer models (ClinicalBERT, RoBERTa) on 3,500+ clinical records.",
      "Built a supervised NLP model to detect communication behaviours (Calgary–Cambridge, NURSE, SHARE frameworks) in doctor–patient dialogues, using Label Studio for gold-standard annotation.",
      "Developed an end-to-end LLM evaluation framework benchmarking model performance on SQL generation tasks, quantifying hallucination rates and logic errors across multi-table joins.",
      "Designed a synthetic data generation loop using LLMs with rigid JSON validation and rationale-based leakage detection.",
    ],
  },
  {
    company: "Drexel University",
    role: "Course Assistant CCI",
    period: "Sep 2025 – Present",
    location: "Philadelphia, PA",
    bullets: [
      "Supporting graduate instruction in AI/ML coursework while completing an M.S. in Artificial Intelligence and Machine Learning (expected June 2026).",
    ],
  },
  {
    company: "John Deere",
    role: "UX Researcher | Senior Technical Lead",
    period: "Nov 2022 – Aug 2024",
    location: "Pune, IN",
    bullets: [
      "Led UX and behavioural research across 6+ product teams — translating qualitative interviews, quantitative analytics, and A/B test results into insights that shaped quarterly roadmaps.",
      "Designed and ran hypothesis-driven experiments (A/B tests, usability studies, multivariate analyses) to validate AI-driven product features used by thousands of users.",
      "Built automated analytics pipelines and Tableau dashboards giving leadership real-time visibility into adoption curves and feature-level impact.",
      "Applied segmentation and clustering techniques to identify behavioural user patterns, enabling personalization strategies and AI-assisted recommendation systems.",
    ],
  },
  {
    company: "Urbanfit",
    role: "UI/UX Designer",
    period: "Jan 2021 – Nov 2022",
    location: "Pune, IN",
    bullets: [
      "Led end-to-end UX/UI redesign of Urbanfit's wellness platform, driving 35% increase in engagement, 28% drop in mobile bounce rate, and 2.5× lift in newsletter sign-ups.",
      "Designed and shipped Poshmera, a mobile fashion app, from concept to launch — 8,000 installs (60% above target), 4.3-star rating.",
      "Built a modular Figma component library that halved design-to-dev handoff time.",
    ],
  },
  {
    company: "Capita (Next)",
    role: "Senior Web Designer",
    period: "Jan 2018 – Aug 2019",
    location: "Pune, IN",
    bullets: [
      "Delivered 20+ high-impact email campaigns, securing click-through rate gains up to 18% and a 2.5% lift in conversion.",
      "Managed full cycle from stakeholder brief through responsive build to live deployment for rapid website updates and campaign microsites.",
    ],
  },
  {
    company: "Capita (Arcadia)",
    role: "UI/UX Design",
    period: "Jan 2018 – Aug 2019",
    location: "Pune, IN",
    bullets: [
      "Spearheaded data-driven personalization strategy with Qubit across seven Arcadia brands (Topshop, Topman, Dorothy Perkins, etc.) — 11% conversion rate increase for Topshop.",
      "Migrating 300+ legacy pages to Magento/React/Redux, cutting page load times by one-third and lifting SEO scores from 65 to 85.",
      "Developed storyboards and high-fidelity prototypes that resolved 40% of critical UI issues pre-launch, contributing to 15% reduction in cart abandonment.",
    ],
  },
  {
    company: "Vodafone",
    role: "Technical Executive",
    period: "Jan 2016 – Jan 2018",
    location: "Pune, IN",
    bullets: [
      "Managed defect lifecycle in Siebel CRM across multiple product releases — logging, triaging, and tracking fixes to resolution.",
      "Built weekly bug-status dashboards and presented trend analysis to stakeholders.",
    ],
  },
  {
    company: "TomTom",
    role: "Technical Executive",
    period: "Jun 2014 – Aug 2015",
    location: "Pune, IN",
    bullets: [
      "Provided first-line defect management and root-cause analysis within TomTom's Siebel CRM environment.",
      "Built reporting dashboards and delivered weekly stakeholder presentations translating technical defect data into actionable guidance.",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 120,
    },
  },
};

export default function Experience() {
  return (
    <section id="experience" className={styles.experience}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.span variants={itemVariants} className="section-label">
          ◉ Experience
        </motion.span>
        <motion.h2 variants={itemVariants} className="section-title">
          Where I&apos;ve <span className="accent">worked</span>
        </motion.h2>

        <div className={styles.timeline}>
          {experiences.map((exp, i) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              className={styles.entry}
              variants={itemVariants}
            >
              <div className={styles.dot} />
              <div className={styles.card}>
                <div className={styles.cardTop}>
                  <div>
                    <h3 className={styles.company}>
                      <Building2 size={16} />
                      {exp.company}
                    </h3>
                    <p className={styles.role}>{exp.role}</p>
                  </div>
                  <div className={styles.meta}>
                    <span className={styles.period}>
                      <Calendar size={13} />
                      {exp.period}
                    </span>
                    <span className={styles.location}>
                      <MapPin size={13} />
                      {exp.location}
                    </span>
                  </div>
                </div>
                <ul className={styles.bullets}>
                  {exp.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
