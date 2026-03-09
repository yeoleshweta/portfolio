"use client";

import React from "react";
import { motion } from "framer-motion";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import {
  CaseStudySection,
  ContextCard,
  ResultsGrid,
  Blockquote,
} from "@/components/casestudy/CaseStudyContent";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem Space" },
  { id: "research", label: "The Research" },
  { id: "architecture", label: "Technical Architecture" },
  { id: "ethics", label: "Ethics & Privacy" },
  { id: "results", label: "Impact & Results" },
  { id: "reflections", label: "Reflections" },
];

/* ─────── Custom Taxonomy Table ─────── */
function BiasTaxonomyTable() {
  const data = [
    {
      label: "Structural Bias",
      capt: "Systemic patterns reflecting institutional or socioeconomic inequities",
      signal:
        "Assumptions about treatment adherence based on patient demographics",
    },
    {
      label: "Clinical Stigma",
      capt: "Language or framing that reflects prejudice toward specific diagnoses or patient populations",
      signal:
        "Dismissive tone toward patients with substance use disorders or mental health conditions",
    },
    {
      label: "Diagnostic Framing Bias",
      capt: "Asymmetric language when describing similar clinical presentations across different patient groups",
      signal:
        "Different urgency or thoroughness in workup descriptions based on patient characteristics",
    },
    {
      label: "No Bias Detected",
      capt: "Communication that meets equitable standards",
      signal: "Consistent, patient-centred language regardless of demographics",
    },
  ];

  return (
    <div
      style={{
        marginTop: "32px",
        overflowX: "auto",
        borderRadius: "16px",
        border: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
          fontSize: "14px",
        }}
      >
        <thead style={{ background: "rgba(0,0,0,0.03)" }}>
          <tr>
            <th style={{ padding: "16px", fontWeight: 700 }}>Label</th>
            <th style={{ padding: "16px", fontWeight: 700 }}>
              What It Captures
            </th>
            <th style={{ padding: "16px", fontWeight: 700 }}>Example Signal</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <td style={{ padding: "16px", fontWeight: 600 }}>{row.label}</td>
              <td style={{ padding: "16px" }}>{row.capt}</td>
              <td
                style={{
                  padding: "16px",
                  color: "var(--color-text-secondary)",
                  fontStyle: "italic",
                }}
              >
                {row.signal}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────── Architecture Node ─────── */
function ArchitectureBox({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "24px",
        border: `1px solid ${color}44`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        flex: 1,
        minWidth: "250px",
      }}
    >
      <h4
        style={{
          margin: "0 0 12px 0",
          color,
          fontSize: "16px",
          fontWeight: 700,
        }}
      >
        {title}
      </h4>
      <div
        style={{
          padding: 0,
          margin: 0,
          listStyle: "none",
          fontSize: "13px",
          color: "var(--color-text-secondary)",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              marginBottom: "6px",
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
            }}
          >
            <span style={{ color, fontSize: "18px", lineHeight: "1" }}>•</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HealthcareBiasCaseStudy() {
  return (
    <main>
      <CaseStudyHero
        title="Detecting Healthcare Bias with NLP"
        category="Data Science & ML Engineering"
        role="Data Scientist Co-op"
        team="1 Data Scientist Co-op, 1 Advisor"
        timeline="Sept 2025 – Present"
        image="/assets/BiasDetection.jpg"
      />

      <CaseStudyLayout sections={sections}>
        <CaseStudySection
          id="overview"
          label="Overview"
          heading="Building Machine Learning Pipelines to Surface What Clinicians Can't See at Scale"
        >
          <p>
            The American Board of Internal Medicine certifies over 300,000
            physicians. Part of their mission involves evaluating how physicians
            communicate, reason, and make decisions. However, humans are
            susceptible to unconscious biases—structural biases, clinical
            stigma, and assumptions baked into medical training.
          </p>
          <p>
            The challenge is that these biases are nearly invisible at an
            individual level. It's only by analyzing thousands of records across
            hundreds of clinicians that patterns emerge. I built a system to
            detect these patterns reliably, automatically, and at scale.
          </p>

          <div style={{ marginTop: "24px", marginBottom: "32px" }}>
            <a
              href="https://bias-checker-healthcare.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--color-accent)",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "100px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Live Demo →
            </a>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginTop: "32px",
            }}
          >
            <ContextCard
              title="Methods"
              text="NLP Pipeline Engineering, Transformer Fine-Tuning, Gold-Standard Annotation, LLM Evaluation, Synthetic Data Generation"
            />
            <ContextCard
              title="Tools"
              text="Python, PyTorch, Hugging Face, Label Studio, ClinicalBERT, RoBERTa, GPT-family LLMs"
            />
          </div>
        </CaseStudySection>

        <CaseStudySection
          id="problem"
          label="Problem Space"
          heading="Why This Project Exists"
        >
          <p>
            Assessment of clinical communication quality previously relied on
            manual review. This process was <strong>subjective</strong>,{" "}
            <strong>slow</strong>, and <strong>inconsistent</strong>. Without a
            shared classification system, tracking patterns or measuring the
            prevalence of bias was nearly impossible.
          </p>
          <Blockquote text="The question wasn't whether bias exists in healthcare communication—it was: can we build a system that detects it reliably, automatically, and at the scale ABIM needs to act on it?" />
        </CaseStudySection>

        <CaseStudySection
          id="research"
          label="The Research"
          heading="What I Built and Why"
        >
          <h3>Experiment 1: NLP Bias Detection</h3>
          <p>
            We defined a 4-label classification framework developed iteratively
            with domain experts and validated against clinical literature.
          </p>
          <BiasTaxonomyTable />

          <h3 style={{ marginTop: "48px" }}>
            Model Selection: ClinicalBERT vs. RoBERTa
          </h3>
          <p>
            I fine-tuned and compared <strong>ClinicalBERT</strong> and{" "}
            <strong>RoBERTa</strong>. While both performed well on binary tasks,
            the differentiation appeared in granular classification.
            ClinicalBERT excelled with dense medical terminology, while RoBERTa
            provided consistent robustness.
          </p>

          <h3 style={{ marginTop: "48px" }}>
            Experiment 2: Communication Behaviour Detection
          </h3>
          <p>
            Beyond bias, we needed to detect evidence-based behaviors like the{" "}
            <strong>Calgary-Cambridge Framework</strong>,{" "}
            <strong>NURSE Protocol</strong>, and <strong>SHARE Approach</strong>
            . I built supervised models to identify these structural patterns in
            doctor-patient dialogues.
          </p>

          <h3 style={{ marginTop: "48px" }}>
            Experiment 3: LLM Evaluation Framework
          </h3>
          <p>
            Before trusting LLMs with internal tasks like SQL generation, we
            needed to quantify their accuracy. I built a pipeline measuring{" "}
            <strong>hallucination rates</strong>, <strong>logic errors</strong>,
            and <strong>schema fidelity</strong> across varying query
            complexities.
          </p>

          <h3 style={{ marginTop: "48px" }}>
            Experiment 4: Synthetic Data Engineering
          </h3>
          <p>
            To solve healthcare data privacy (HIPAA), I designed an automated
            synthetic data loop creating high-quality dialogues for training
            without touching real PHI.
          </p>
        </CaseStudySection>

        <CaseStudySection
          id="architecture"
          label="Technical Architecture"
          heading="The Interconnected Infrastructure"
        >
          <div
            style={{
              display: "flex",
              gap: "24px",
              flexWrap: "wrap",
              marginTop: "32px",
            }}
          >
            <ArchitectureBox
              title="Bias Detection"
              color="#8b69fa"
              items={[
                "ClinicalBERT + RoBERTa ensemble",
                "4-class bias classification",
                "Confidence scores",
              ]}
            />
            <ArchitectureBox
              title="Behaviour Classifier"
              color="#11a961"
              items={["Supervised NLP model", "Turn-level detection"]}
            />
            <ArchitectureBox
              title="Evaluation Engine"
              color="#f59e0b"
              items={[
                "SQL generation benchmarks",
                "Hallucination metrics",
                "Deployment confidence",
              ]}
            />
            <ArchitectureBox
              title="Synthetic Loop"
              color="#ec4899"
              items={[
                "LLM generation + validation",
                "PHI-free training data",
                "Reproducibility datasets",
              ]}
            />
          </div>
        </CaseStudySection>

        <CaseStudySection
          id="ethics"
          label="Ethics & Privacy"
          heading="Trust Through Transparency"
        >
          <p>
            Every design decision adhered to <strong>HIPAA Compliance</strong>,{" "}
            <strong>Common Rule/IRB</strong> standards, and{" "}
            <strong>Belmont Principles</strong>. The system is designed to
            recommend and surface patterns for human review, not to act as a
            black-box decision maker.
          </p>
        </CaseStudySection>

        <CaseStudySection
          id="results"
          label="Outcomes"
          heading="Evidence-Based Impact"
        >
          <ResultsGrid
            items={[
              {
                label: "Throughput",
                value: "Scalable",
                description:
                  "Thousands of records processed automatically versus ~50 manually.",
              },
              {
                label: "Consistency",
                value: "Deterministic",
                description: "Reproducible classifications across all cohorts.",
              },
              {
                label: "Data Pipeline",
                value: "Privacy-First",
                description:
                  "Unlimited iteration via synthetic data engineering.",
              },
              {
                label: "Accuracy",
                value: "Quantified",
                description:
                  "Documented error and hallucination rates for LLMs.",
              },
            ]}
          />
        </CaseStudySection>

        <CaseStudySection
          id="reflections"
          label="Reflections"
          heading="Key Learnings"
        >
          <p>
            <strong>Taxonomy design is the hardest part.</strong> Weeks of
            iteration with domain experts on the framework paid off more than
            model tuning did.
          </p>
          <p>
            <strong>Healthcare AI must earn trust.</strong> Confidence scores
            and human-in-the-loop review are not optional features; they are
            foundational requirements for clinical adoption.
          </p>

          <div style={{ padding: "40px 0", textAlign: "center" }}>
            <p
              style={{
                fontSize: "14px",
                color: "var(--color-text-secondary)",
                fontStyle: "italic",
              }}
            >
              This project documents research conducted at ABIM. All publicly
              shared artifacts use synthetic data.
            </p>
          </div>
        </CaseStudySection>
      </CaseStudyLayout>
    </main>
  );
}
