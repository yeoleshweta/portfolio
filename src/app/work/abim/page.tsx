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
  BaselineTargetMetrics,
} from "@/components/casestudy/CaseStudyContent";

const sections = [
  { id: "challenge", label: "The Challenge" },
  { id: "methodology", label: "Methodology" },
  { id: "results", label: "Results" },
  { id: "governance", label: "Governance" },
];

/* ─────── Pipeline Step Visual ─────── */
function PipelineStep({
  step,
  label,
  description,
  color,
  index,
}: {
  step: string;
  label: string;
  description: string;
  color: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.12 }}
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        border: "1px solid rgba(0,0,0,0.05)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: color,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: "14px",
          margin: "0 auto 14px",
        }}
      >
        {step}
      </div>
      <h4 style={{ margin: "0 0 6px 0", fontSize: "15px" }}>{label}</h4>
      <p
        style={{
          margin: 0,
          fontSize: "13px",
          color: "var(--color-text-secondary)",
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>
    </motion.div>
  );
}

/* ─────── Dataset Source Table ─────── */
function DatasetTable() {
  const datasets = [
    {
      source: "ACI-BENCH",
      type: "Mixed simulation / role-play",
      contribution:
        "Benchmark-style transcripts with clinical documentation behaviors",
      note: 'Can introduce "dictation" language that confounds Calgary constructs',
    },
    {
      source: "VHA 4C Lineage",
      type: "Real recorded encounters",
      contribution:
        "Real-world primary care dynamics and patient context clues",
      note: "Strongest realism anchor; supports patient-centered measurement framing",
    },
    {
      source: "OSCE Simulated Interviews",
      type: "Simulated (audio + transcripts)",
      contribution:
        "High-quality respiratory-focus transcripts, domain-labeled",
      note: "Good for NER and general NLP; limited vs real-world nuance",
    },
    {
      source: "PriMock57",
      type: "Simulated mock primary care",
      contribution: "Multi-artifact dataset (audio, transcripts, notes, eval)",
      note: "Useful for benchmarking communication-to-note pipelines",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        marginTop: "32px",
        marginBottom: "32px",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ overflowX: "auto", width: "100%" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
            minWidth: "600px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "rgba(0,0,0,0.03)",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "14px 18px", fontWeight: 700 }}>Source</th>
              <th style={{ padding: "14px 18px", fontWeight: 700 }}>
                Real vs Simulated
              </th>
              <th style={{ padding: "14px 18px", fontWeight: 700 }}>
                Contribution
              </th>
              <th style={{ padding: "14px 18px", fontWeight: 700 }}>
                Labeling Implication
              </th>
            </tr>
          </thead>
          <tbody>
            {datasets.map((d, i) => (
              <tr
                key={d.source}
                style={{
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                  background: i % 2 === 1 ? "rgba(0,0,0,0.015)" : "transparent",
                }}
              >
                <td
                  style={{
                    padding: "14px 18px",
                    fontWeight: 600,
                    minWidth: 120,
                  }}
                >
                  {d.source}
                </td>
                <td style={{ padding: "14px 18px" }}>{d.type}</td>
                <td style={{ padding: "14px 18px" }}>{d.contribution}</td>
                <td
                  style={{
                    padding: "14px 18px",
                    color: "var(--color-text-secondary)",
                    fontStyle: "italic",
                  }}
                >
                  {d.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

/* ─────── Governance "Don't" Card ─────── */
function GovernanceCard({
  icon,
  title,
  description,
  index,
}: {
  icon: string;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      style={{
        background: "rgba(220, 53, 69, 0.03)",
        border: "1px solid rgba(220, 53, 69, 0.12)",
        borderRadius: "16px",
        padding: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "12px",
        }}
      >
        <span style={{ fontSize: "20px" }}>{icon}</span>
        <h4 style={{ margin: 0, fontSize: "15px", fontWeight: 700 }}>
          {title}
        </h4>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: "14px",
          color: "var(--color-text-secondary)",
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
    </motion.div>
  );
}

export default function ABIMCaseStudy() {
  return (
    <main>
      <CaseStudyHero
        title="Measuring Patient-Centered Communication with NLP"
        category="NLP & UX Research"
<<<<<<< HEAD
        role="NLP Researcher & Data Annotator"
        team="3 Researchers, 1 Advisor"
=======
        role="Data Scientist Co-op"
        team="I/O Psychologists, Data Scientist, and AI/ML Engineer"
>>>>>>> v2
        timeline="Co-Op (6 months)"
        image="/assets/abim-hero.png"
      />

      <CaseStudyLayout sections={sections}>
        {/* ============================================ */}
        {/* SECTION 1: THE CHALLENGE                     */}
        {/* ============================================ */}
        <CaseStudySection
          id="challenge"
          label="Overview"
          heading="Why Communication Measurement Matters — and Why It's Hard"
        >
          <p>
            The{" "}
            <a
              href="https://www.abim.org/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#11a961", fontWeight: 600 }}
            >
              American Board of Internal Medicine (ABIM)
            </a>{" "}
            exists to certify physicians who demonstrate{" "}
            <strong>knowledge, skills, and attitudes</strong> essential for
            excellent patient care. Communication behaviors — the &quot;skills
            and attitudes in action&quot; — are the hardest competency to
            quantify at scale.
          </p>
          <p>
            ABMS standards require boards to assess{" "}
            <strong>Interpersonal & Communication Skills</strong> and{" "}
            <strong>Professionalism</strong> as core competencies. But even
            &quot;gold standard&quot; human rating systems derived from
            Calgary-Cambridge show measurable rater bias, drift, and order
            effects. Manual measurement simply doesn&apos;t scale — and it
            isn&apos;t purely objective.
          </p>
          <p>
            <strong>Our mission:</strong> build a scalable, rubric-grounded NLP
            pipeline that measures patient-centered communication behaviors
            across real clinical transcripts — framed as{" "}
            <strong>formative feedback</strong>, never as deterministic scoring.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginTop: "32px",
              marginBottom: "16px",
            }}
          >
            <ContextCard
              title="Approach"
              text="Rubric-grounded annotation → LLM-assisted labeling → BERT classifier training, aligned to Calgary-Cambridge and NURSE frameworks."
            />
            <ContextCard
              title="Frameworks"
              text="Calgary-Cambridge Guide (6-step consultation model) and NURSE (Naming, Understanding, Respecting, Supporting, Exploring) for empathic communication."
            />
          </div>

          <BaselineTargetMetrics
            items={[
              {
                label: "Manual annotation consistency",
                baseline: "Variable ICC",
                target: "Rubric-anchored",
                fillPercentage: 70,
              },
              {
                label: "Labeling scalability",
                baseline: "~50 convos/week",
                target: "985 convos labeled",
                fillPercentage: 90,
              },
              {
                label: "Cost per inference",
                baseline: "LLM API costs",
                target: "BERT (near-zero)",
                fillPercentage: 85,
              },
            ]}
          />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 2: METHODOLOGY                       */}
        {/* ============================================ */}
        <CaseStudySection
          id="methodology"
          label="Approach"
          heading="From Rubric to Scalable Classifier"
        >
          <p>
            We started with simulated and role-play transcript sources because
            they&apos;re accessible and commonly used in clinical NLP
            benchmarking. But we{" "}
            <strong>pivoted toward real clinical encounters</strong> to improve
            ground truth realism and reduce &quot;too-clean&quot; synthetic
            behavior patterns.
          </p>

          <h3 style={{ marginTop: "48px" }}>The Pipeline</h3>
          <p>
            Each step protects a specific standard: the rubric protects{" "}
            <strong>construct validity</strong>, seed labels protect{" "}
            <strong>interpretability</strong>, LLM pass provides{" "}
            <strong>scale</strong>, and BERT provides{" "}
            <strong>reproducibility at near-zero cost</strong>.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "16px",
              marginTop: "32px",
              marginBottom: "32px",
            }}
          >
            <PipelineStep
              step="1"
              label="Rubric Design"
              description="Construct-specific scoring criteria aligned to Calgary-Cambridge and NURSE frameworks."
              color="#6366f1"
              index={0}
            />
            <PipelineStep
              step="2"
              label="Seed Labels"
              description="8–10 exemplar excerpts per construct, manually annotated in Label Studio."
              color="#8b5cf6"
              index={1}
            />
            <PipelineStep
              step="3"
              label="Prompt Engineering"
              description="Construct-specific prompts with rubric definition, inclusion/exclusion criteria, and structured output."
              color="#a855f7"
              index={2}
            />
            <PipelineStep
              step="4"
              label="LLM Labeling"
              description="Scale annotation across ~985 conversations, one construct at a time to reduce contamination."
              color="#c084fc"
              index={3}
            />
            <PipelineStep
              step="5"
              label="BERT Training"
              description="Fine-tuned encoder for cheap, scalable inference with audit-friendly probability outputs."
              color="#d946ef"
              index={4}
            />
          </div>

          <h3 style={{ marginTop: "48px" }}>Dataset Sources</h3>
          <p>
            We aggregated ~985 conversations from four complementary sources,
            balancing real-world realism with benchmark coverage:
          </p>

          <DatasetTable />

          <h3 style={{ marginTop: "48px" }}>Key Methodological Decisions</h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            {[
              {
                icon: "🎯",
                title: "One Construct at a Time",
                desc: "We labeled each Calgary or NURSE construct independently across all encounters — simpler prompts, less cross-construct contamination.",
              },
              {
                icon: "📐",
                title: "Prompts as Measurement Tools",
                desc: "Each prompt included: rubric definition, inclusion criteria, exclusion criteria, borderline examples, and required structured output (score + rationale).",
              },
              {
                icon: "🔒",
                title: "PHI De-identification First",
                desc: "NER-style PHI masking applied before scaling to real transcripts — a prerequisite to reuse and ethical scaling.",
              },
              {
                icon: "🔄",
                title: "Simulated → Real Pivot",
                desc: "Synthetic scripts contain explicit structure that real encounters lack. We incorporated VHA 4C real encounters as the realism anchor.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "24px",
                  border: "1px solid rgba(0,0,0,0.05)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    marginBottom: "10px",
                  }}
                >
                  {item.icon}
                </div>
                <h4 style={{ margin: "0 0 6px 0", fontSize: "15px" }}>
                  {item.title}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                  }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 3: RESULTS                           */}
        {/* ============================================ */}
        <CaseStudySection
          id="results"
          label="Outcomes"
          heading="What We Built and Learned"
        >
          <p>
            The project produced a reusable labeling pipeline, a construct-wise
            labeled dataset, and a trained classifier — while surfacing critical
            lessons about the limits of LLM-assisted annotation.
          </p>

          <ResultsGrid
            items={[
              {
                value: "985",
                label: "Conversations Labeled",
                description:
                  "Construct-wise labels (Calgary 6-step + NURSE 5-step) across aggregated corpus.",
              },
              {
                value: "11",
                label: "Communication Constructs",
                description:
                  "Each with explicit scoring criteria, rubric boundaries, and exemplar annotations.",
              },
              {
                value: "Pipeline",
                label: "Reusable Framework",
                description:
                  "End-to-end rubric → seed → LLM → BERT pipeline transferable to other domains.",
              },
              {
                value: "BERT",
                label: "Trained Classifier",
                description:
                  "Per-construct probabilities enabling audit-friendly formative feedback.",
              },
            ]}
          />

          <h3 style={{ marginTop: "48px" }}>Successes</h3>
          <Blockquote
            text="We operationalized two widely used communication frameworks into measurable constructs with explicit scoring criteria — reducing subjectivity and enabling scalable, reusable labeling."
            author="Engineering + Measurement Achievement"
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            {[
              {
                icon: "✅",
                title: "Rubric Operationalization",
                desc: "Translated Calgary-Cambridge and NURSE into construct-level scoring rubrics with borderline examples — reducing subjective interpretation.",
              },
              {
                icon: "🔁",
                title: "Scalable Pipeline",
                desc: "Created a labeling pipeline that can be reused by future co-ops and extended to other communication domains beyond internal medicine.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  background: "rgba(17, 169, 97, 0.04)",
                  border: "1px solid rgba(17, 169, 97, 0.15)",
                  borderRadius: "16px",
                  padding: "24px",
                }}
              >
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>
                  {item.icon}
                </div>
                <h4 style={{ margin: "0 0 6px 0", fontSize: "15px" }}>
                  {item.title}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                  }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <h3 style={{ marginTop: "48px" }}>Known Gaps</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            {[
              {
                icon: "🔍",
                title: "Gold-Standard Validation",
                desc: "Stronger human-annotation validation sets and slice-based fairness checks are needed before any higher-stakes use.",
              },
              {
                icon: "📊",
                title: "Cross-Source Generalization",
                desc: "Per-construct performance across simulated vs. real data sources needs explicit evaluation and reporting.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  background: "rgba(245, 158, 11, 0.04)",
                  border: "1px solid rgba(245, 158, 11, 0.15)",
                  borderRadius: "16px",
                  padding: "24px",
                }}
              >
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>
                  {item.icon}
                </div>
                <h4 style={{ margin: "0 0 6px 0", fontSize: "15px" }}>
                  {item.title}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                  }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 4: GOVERNANCE & LIMITATIONS           */}
        {/* ============================================ */}
        <CaseStudySection
          id="governance"
          label="Ethics & Governance"
          heading="What We Recommend Not Doing"
        >
          <p>
            ACGME explicitly warns that Milestones are an{" "}
            <strong>educational, formative assessment tool</strong> and were{" "}
            <strong>not designed for high-stakes external decisions</strong>{" "}
            (credentialing / licensing). Automation can introduce{" "}
            <strong>
              false precision, biased measurement, and misuse risks
            </strong>
            . These governance constraints shaped our entire framing.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginTop: "32px",
              marginBottom: "32px",
            }}
          >
            <GovernanceCard
              index={0}
              icon="🚫"
              title={`Don't Present Output as a "Milestone Score"`}
              description="Never make automated output determinative for advancement or credentialing without full governance review and validation. ACGME Milestones were not designed for external high-stakes use."
            />
            <GovernanceCard
              index={1}
              icon="⚠️"
              title="Don't Rely Only on Simulated Data"
              description="Simulated/roleplay corpora cannot fully represent clinical realism — the datasets themselves acknowledge this limitation. Real-encounter data is essential for validity."
            />
            <GovernanceCard
              index={2}
              icon="🔬"
              title="Don't Skip Label Quality Monitoring"
              description="Training BERT on raw LLM labels can cause instability and training plateaus. Monitor training variance and consider entropy filtering, ensembling, or human fallback for ambiguous samples."
            />
            <GovernanceCard
              index={3}
              icon="📉"
              title={`Don't Report Only "Overall Accuracy"`}
              description="Communication constructs are sparse and imbalanced. Report per-construct precision/recall/F1, calibration metrics (ECE), and run-to-run variance to detect instability."
            />
          </div>

          <h3 style={{ marginTop: "48px" }}>Core Limitations</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            {[
              {
                icon: "🎙️",
                title: "Text-Only Signal",
                desc: "Transcripts omit nonverbal cues, physical examination actions, and many contextual behaviors critical to communication quality.",
              },
              {
                icon: "⚖️",
                title: "Fairness Risks",
                desc: "Language style varies across cultures, dialects, and literacy levels. Automated scoring must be audited by demographic slices and clinical context.",
              },
              {
                icon: "🔄",
                title: "Label Noise Propagation",
                desc: "LLM labels are not gold. Error propagation from LLM→BERT can cause instability; mitigation only partially closes the performance gap.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "24px",
                  border: "1px solid rgba(0,0,0,0.05)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>
                  {item.icon}
                </div>
                <h4 style={{ margin: "0 0 6px 0", fontSize: "15px" }}>
                  {item.title}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                  }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div
            style={{
              marginTop: "64px",
              padding: "24px",
              background: "rgba(0,0,0,0.02)",
              borderRadius: "8px",
              border: "1px solid rgba(0,0,0,0.05)",
              fontSize: "14px",
              color: "var(--color-text-secondary)",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            This case study documents NLP research conducted during an ABIM
            Co-Op. The project is framed as formative, developmental research —
            not as a validated clinical assessment tool. All governance
            recommendations follow ACGME Milestone usage guidelines.
          </div>
        </CaseStudySection>
      </CaseStudyLayout>
    </main>
  );
}
