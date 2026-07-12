"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import {
  CaseStudySection,
  ContextCard,
  ResultsGrid,
  Blockquote,
  BaselineTargetMetrics,
  SkillSpotlight,
  SkillConstellation,
} from "@/components/casestudy/CaseStudyContent";

const sections = [
  { id: "challenge", label: "The Challenge" },
  { id: "taxonomy", label: "Taxonomy & Skills" },
  { id: "pipeline", label: "Data Pipeline" },
  { id: "metrics", label: "Performance & IRR" },
  { id: "errors", label: "Error Analysis" },
  { id: "deidentification", label: "De-Identification" },
  { id: "governance", label: "Governance" },
];

/* ─────── Dataset Source Table ─────── */
function DatasetTable() {
  const datasets = [
    {
      source: "ACI-BENCH",
      type: "Mixed simulation / role-play",
      contribution: "Benchmark-style transcripts with clinical documentation behaviors",
      note: "Can introduce dictation language that confounds Calgary constructs",
    },
    {
      source: "VHA 4C Lineage",
      type: "Real recorded encounters",
      contribution: "Real-world primary care dynamics and patient context clues",
      note: "Strongest realism anchor; supports patient-centered measurement framing",
    },
    {
      source: "OSCE Simulated Interviews",
      type: "Simulated (audio + transcripts)",
      contribution: "High-quality respiratory-focus transcripts, domain-labeled",
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
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", minWidth: "600px" }}>
          <thead>
            <tr style={{ background: "rgba(0,0,0,0.03)", textAlign: "left" }}>
              <th style={{ padding: "14px 18px", fontWeight: 700 }}>Source</th>
              <th style={{ padding: "14px 18px", fontWeight: 700 }}>Real vs Simulated</th>
              <th style={{ padding: "14px 18px", fontWeight: 700 }}>Contribution</th>
              <th style={{ padding: "14px 18px", fontWeight: 700 }}>Labeling Implication</th>
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
                <td style={{ padding: "14px 18px", fontWeight: 600, minWidth: 120 }}>{d.source}</td>
                <td style={{ padding: "14px 18px" }}>{d.type}</td>
                <td style={{ padding: "14px 18px" }}>{d.contribution}</td>
                <td style={{ padding: "14px 18px", color: "var(--color-text-secondary)", fontStyle: "italic" }}>
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
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
        <span style={{ fontSize: "20px" }}>{icon}</span>
        <h4 style={{ margin: 0, fontSize: "15px", fontWeight: 700 }}>{title}</h4>
      </div>
      <p style={{ margin: 0, fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
        {description}
      </p>
    </motion.div>
  );
}

/* ─────── Framework Taxonomy Map ─────── */
function FrameworkTaxonomy() {
  const frameworks = [
    { name: "Calgary–Cambridge", desc: "6 phases, 70+ behaviors", status: "PRIMARY", active: true },
    { name: "NURSE", desc: "Empathy micro-skills", status: "PRIMARY", active: true },
    { name: "SHARE", desc: "Shared decision-making", status: "SCOPED OUT", active: false },
    { name: "SPIKES", desc: "Bad news delivery", status: "REFERENCE", active: false },
    { name: "McLaughlin 6-Step", desc: "Assessment framework", status: "REFERENCE", active: false },
  ];

  const skillCategories = [
    {
      title: "The Emotional Core",
      skills: [
        { name: "Empathy & Compassion", active: true },
        { name: "Emotional Regulation", active: false },
      ],
    },
    {
      title: "Relational Mechanics",
      skills: [
        { name: "Relationship & Trust Building", active: true },
        { name: "Bridging Relational Gaps", active: true },
        { name: "Bedside Manner", active: false },
        { name: "Behavioral Adaptability", active: false },
      ],
    },
    {
      title: "Information Gathering",
      skills: [
        { name: "Active Listening", active: true },
        { name: "Open-Ended Questioning", active: true },
        { name: "Patient-Centered Interviewing", active: true },
        { name: "Nonverbal Facilitation", active: false },
      ],
    },
    {
      title: "Cognitive Integration",
      skills: [
        { name: "Complex Clinical Reasoning", active: true },
        { name: "Eliciting & Navigating Context", active: true },
      ],
    },
    {
      title: "The Collaborative Plan",
      skills: [
        { name: "Shared Decision Making", active: true },
        { name: "Collaborative Phrasing", active: true },
        { name: "Strategic Agenda Setting", active: true },
        { name: "Indirect Emotional Inquiry", active: true },
      ],
    },
  ];

  return (
    <div style={{ marginTop: "32px", marginBottom: "40px" }}>
      <h4 style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-text-secondary)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "16px" }}>
        Tier 1: Frameworks Evaluated
      </h4>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        {frameworks.map((f) => (
          <div
            key={f.name}
            style={{
              padding: "20px",
              borderRadius: "12px",
              background: f.active ? "rgba(139, 105, 250, 0.03)" : "rgba(0, 0, 0, 0.015)",
              border: f.active ? "2px solid #8b69fa" : "1px solid rgba(0, 0, 0, 0.05)",
              opacity: f.status === "SCOPED OUT" ? 0.6 : 1,
            }}
          >
            <h5 style={{ margin: "0 0 6px 0", fontSize: "15px", fontWeight: 700 }}>{f.name}</h5>
            <p style={{ margin: "0 0 12px 0", fontSize: "12px", color: "var(--color-text-secondary)" }}>{f.desc}</p>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 800,
                padding: "4px 8px",
                borderRadius: "4px",
                background: f.active
                  ? "rgba(139, 105, 250, 0.1)"
                  : f.status === "SCOPED OUT"
                  ? "rgba(220, 53, 69, 0.08)"
                  : "rgba(0, 0, 0, 0.05)",
                color: f.active ? "#8b69fa" : f.status === "SCOPED OUT" ? "#dc3545" : "var(--color-text-secondary)",
              }}
            >
              {f.status}
            </span>
          </div>
        ))}
      </div>

      <h4 style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-text-secondary)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "16px" }}>
        Tier 2: 16 Nuanced Medical Skills, 5 Categories
      </h4>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        {skillCategories.map((cat) => (
          <div
            key={cat.title}
            style={{
              padding: "20px",
              borderRadius: "12px",
              background: "#ffffff",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.01)",
            }}
          >
            <h5 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: 700, color: "#8b69fa" }}>{cat.title}</h5>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {cat.skills.map((s) => (
                <div key={s.name} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ color: s.active ? "#11a961" : "#dc3545", fontSize: "12px" }}>
                    {s.active ? "✓" : "✗"}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      textDecoration: s.active ? "none" : "line-through",
                      color: s.active ? "var(--color-text)" : "var(--color-text-secondary)",
                    }}
                  >
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginTop: "24px" }}>
        <div style={{ padding: "20px", borderRadius: "12px", border: "1px solid rgba(17, 169, 97, 0.15)", background: "rgba(17, 169, 97, 0.02)" }}>
          <h5 style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: 700, color: "#11a961" }}>12 AI-Detectable Skills</h5>
          <p style={{ margin: 0, fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
            Fully covered by Calgary-Cambridge + NURSE together: explicit verbal behaviors, detectable in text transcripts.
          </p>
        </div>
        <div style={{ padding: "20px", borderRadius: "12px", border: "1px solid rgba(220, 53, 69, 0.15)", background: "rgba(220, 53, 69, 0.02)" }}>
          <h5 style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: 700, color: "#dc3545" }}>4 Excluded (Not Text-Detectable)</h5>
          <p style={{ margin: 0, fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
            Nonverbal Facilitation, Bedside Manner, Emotional Regulation, and Behavioral Adaptability. These require audio, video, or observation of internal state.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────── Pipeline Step Visual ─────── */
function PipelineStepCard({
  step,
  label,
  description,
  gate,
  color,
  index,
}: {
  step: string;
  label: string;
  description: string;
  gate: string;
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
        boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <div>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: color,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "13px",
            marginBottom: "14px",
          }}
        >
          {step}
        </div>
        <h4 style={{ margin: "0 0 8px 0", fontSize: "15px", fontWeight: 700 }}>{label}</h4>
        <p style={{ margin: "0 0 20px 0", fontSize: "12px", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
          {description}
        </p>
      </div>
      <div style={{ borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "12px", marginTop: "auto" }}>
        <span style={{ fontSize: "10px", fontWeight: 800, color: color, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          GATE: {gate}
        </span>
      </div>
    </motion.div>
  );
}

/* ─────── Label Ontology 9 Prefix Families ─────── */
function LabelOntology() {
  const families = [
    { prefix: "cc_", name: "Calgary–Cambridge", desc: "Interview structure, 6 steps" },
    { prefix: "nurse_", name: "NURSE", desc: "Empathy micro-skills" },
    { prefix: "sh_", name: "SHARE", desc: "Shared decision-making (reference)" },
    { prefix: "sp_", name: "SPIKES", desc: "Bad news delivery (reference)" },
    { prefix: "cr_", name: "Clinical Reasoning", desc: "Diagnostic parsimony, stop rules" },
    { prefix: "ml_", name: "McLaughlin", desc: "Teach-back, closing confirmation" },
    { prefix: "exam_", name: "Physical Exam", desc: "Exam quality indicators" },
    { prefix: "comp_", name: "ABMS/ACGME Competency", desc: "Domain scores 1–5" },
    { prefix: "ksao_", name: "KSAO", desc: "Knowledge, Skills, Abilities, Other" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginTop: "24px" }}>
      {families.map((f) => (
        <div
          key={f.prefix}
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            border: "1px solid rgba(0,0,0,0.05)",
            padding: "20px",
            display: "flex",
            alignItems: "flex-start",
            gap: "14px",
          }}
        >
          <div
            style={{
              background: "rgba(139, 105, 250, 0.08)",
              color: "#8b69fa",
              fontWeight: 800,
              fontSize: "12px",
              padding: "6px 10px",
              borderRadius: "6px",
              fontFamily: "monospace",
            }}
          >
            {f.prefix}
          </div>
          <div>
            <h4 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: 700 }}>{f.name}</h4>
            <p style={{ margin: 0, fontSize: "12px", color: "var(--color-text-secondary)" }}>{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────── Classifier Performance Bar Chart ─────── */
function ClassifierPerformanceChart() {
  const metrics = [
    { construct: "Build Rapport", tag: "cc_opening", f1: 0.86, p: 0.84, r: 0.87 },
    { construct: "Agenda Setting", tag: "cc_agenda_set", f1: 0.74, p: 0.71, r: 0.76 },
    { construct: "Patient Narrative", tag: "cc_patient_narrative_supported", f1: 0.66, p: 0.68, r: 0.64 },
    { construct: "Signposting", tag: "cc_structure_signposting", f1: 0.79, p: 0.82, r: 0.78 },
    { construct: "Summary / Check-Back", tag: "cc_summary_checkback", f1: 0.81, p: 0.83, r: 0.80 },
    { construct: "Closing / Next Steps", tag: "cc_closing_next_steps", f1: 0.85, p: 0.86, r: 0.84 },
    { construct: "NURSE: Name", tag: "nurse_name", f1: 0.87, p: 0.89, r: 0.85 },
    { construct: "NURSE: Understand", tag: "nurse_understand", f1: 0.69, p: 0.71, r: 0.68 },
    { construct: "NURSE: Respect", tag: "nurse_respect", f1: 0.72, p: 0.74, r: 0.71 },
    { construct: "NURSE: Support", tag: "nurse_support", f1: 0.78, p: 0.76, r: 0.81 },
    { construct: "NURSE: Explore", tag: "nurse_explore", f1: 0.61, p: 0.65, r: 0.58 },
  ];

  return (
    <div style={{ marginTop: "32px", padding: "24px", background: "#ffffff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)" }}>
      {/* Legend */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px", fontSize: "12px", fontWeight: 600 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "12px", height: "12px", background: "#4f46e5", borderRadius: "2px" }} />
          <span>F1 Score</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "12px", height: "12px", background: "#a5b4fc", borderRadius: "2px" }} />
          <span>Precision</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "12px", height: "12px", background: "#f59e0b", opacity: 0.6, borderRadius: "2px" }} />
          <span>Recall</span>
        </div>
      </div>

      {/* Chart Rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {metrics.map((m) => (
          <div key={m.tag} style={{ display: "grid", gridTemplateColumns: "1fr 2fr 40px", alignItems: "center", gap: "16px" }}>
            <div>
              <h5 style={{ margin: 0, fontSize: "13px", fontWeight: 700 }}>{m.construct}</h5>
              <span style={{ fontSize: "11px", color: "var(--color-text-secondary)", fontFamily: "monospace" }}>{m.tag}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {/* F1 Bar */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "100%", height: "8px", background: "#f3f4f6", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ width: `${m.f1 * 100}%`, height: "100%", background: "#4f46e5", borderRadius: "4px" }} />
                </div>
              </div>
              {/* Precision Bar */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "100%", height: "4px", background: "#f3f4f6", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ width: `${m.p * 100}%`, height: "100%", background: "#a5b4fc", borderRadius: "2px" }} />
                </div>
              </div>
              {/* Recall Bar */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "100%", height: "4px", background: "#f3f4f6", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ width: `${m.r * 100}%`, height: "100%", background: "#f59e0b", opacity: 0.6, borderRadius: "2px" }} />
                </div>
              </div>
            </div>
            <div style={{ fontSize: "14px", fontWeight: 800, textAlign: "right", color: "var(--color-text)" }}>
              .{Math.round(m.f1 * 100)}
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "2px solid rgba(0,0,0,0.08)", marginTop: "24px", paddingTop: "16px", display: "grid", gridTemplateColumns: "1fr 2fr 40px", alignItems: "center", gap: "16px" }}>
        <h5 style={{ margin: 0, fontSize: "14px", fontWeight: 800 }}>Macro-F1 (unweighted mean)</h5>
        <div style={{ height: "10px", background: "#f3f4f6", borderRadius: "5px", overflow: "hidden" }}>
          <div style={{ width: "76%", height: "100%", background: "var(--color-accent)", borderRadius: "5px" }} />
        </div>
        <div style={{ fontSize: "16px", fontWeight: 900, textAlign: "right", color: "var(--color-accent)" }}>
          .76
        </div>
      </div>
    </div>
  );
}

/* ─────── Inter-Rater Reliability Dot Plot ─────── */
function IRRChart() {
  const kappaScores = [
    { construct: "Build Rapport", tag: "cc_opening", val: 0.74 },
    { construct: "Agenda Setting", tag: "cc_agenda_set", val: 0.62 },
    { construct: "Patient Narrative", tag: "cc_patient_narrative_supported", val: 0.55 },
    { construct: "Signposting", tag: "cc_structure_signposting", val: 0.68 },
    { construct: "Summary / Check-Back", tag: "cc_summary_checkback", val: 0.71 },
    { construct: "Closing / Next Steps", tag: "cc_closing_next_steps", val: 0.76 },
    { construct: "NURSE: Name", tag: "nurse_name", val: 0.78 },
    { construct: "NURSE: Understand", tag: "nurse_understand", val: 0.58 },
    { construct: "NURSE: Respect", tag: "nurse_respect", val: 0.61 },
    { construct: "NURSE: Support", tag: "nurse_support", val: 0.66 },
    { construct: "NURSE: Explore", tag: "nurse_explore", val: 0.47 },
  ];

  const getColor = (v: number) => {
    if (v >= 0.61) return "#3b82f6"; // reliable
    if (v >= 0.41) return "#eab308"; // moderate
    return "#ef4444"; // review required
  };

  return (
    <div style={{ marginTop: "32px", padding: "24px", background: "#ffffff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)" }}>
      {/* Legend */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "28px", fontSize: "12px", fontWeight: 600 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "10px", height: "10px", background: "#3b82f6", borderRadius: "50%" }} />
          <span>&gt;= 0.61 substantial (reliable)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "10px", height: "10px", background: "#eab308", borderRadius: "50%" }} />
          <span>0.41–0.60 moderate (formative use)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "10px", height: "10px", background: "#ef4444", borderRadius: "50%" }} />
          <span>&lt; 0.41 human review required</span>
        </div>
      </div>

      <div style={{ position: "relative", marginBottom: "8px", borderBottom: "1px solid rgba(0,0,0,0.05)", paddingBottom: "16px", display: "grid", gridTemplateColumns: "1fr 2fr 40px", gap: "16px", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-secondary)" }}>
        <span>Construct</span>
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between" }}>
          <span>0</span>
          <span>.20 slight</span>
          <span>.40 fair</span>
          <span>.60 moderate</span>
          <span>.80 substantial</span>
          <span>1.0</span>
        </div>
        <span style={{ textAlign: "right" }}>Kappa</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {kappaScores.map((k) => (
          <div key={k.tag} style={{ display: "grid", gridTemplateColumns: "1fr 2fr 40px", alignItems: "center", gap: "16px" }}>
            <div>
              <h5 style={{ margin: 0, fontSize: "13px", fontWeight: 700 }}>{k.construct}</h5>
            </div>
            <div style={{ position: "relative", height: "16px", display: "flex", alignItems: "center" }}>
              <div style={{ width: "100%", height: "2px", background: "#e5e7eb" }} />
              <div
                style={{
                  position: "absolute",
                  left: `${k.val * 100}%`,
                  transform: "translateX(-50%)",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: getColor(k.val),
                  boxShadow: `0 0 8px ${getColor(k.val)}80`,
                }}
              />
            </div>
            <div style={{ fontSize: "14px", fontWeight: 800, textAlign: "right", color: getColor(k.val) }}>
              .{Math.round(k.val * 100)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────── Calibration View ─────── */
function CalibrationVisual() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginTop: "24px" }}>
      <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.05)", borderRadius: "16px", padding: "24px" }}>
        <span style={{ fontSize: "10px", fontWeight: 800, color: "var(--color-text-secondary)", textTransform: "uppercase" }}>
          ECE — Expected Calibration Error
        </span>
        <h4 style={{ fontSize: "36px", fontWeight: 900, color: "#8b69fa", margin: "8px 0" }}>
          0.08 <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-text-secondary)" }}>target &lt; 0.10</span>
        </h4>
        <p style={{ margin: 0, fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
          Average gap between predicted confidence and actual accuracy. Model confidence strongly matches actual accuracy.
        </p>
      </div>

      <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.05)", borderRadius: "16px", padding: "24px" }}>
        <span style={{ fontSize: "10px", fontWeight: 800, color: "var(--color-text-secondary)", textTransform: "uppercase" }}>
          Brier Score
        </span>
        <h4 style={{ fontSize: "36px", fontWeight: 900, color: "#8b69fa", margin: "8px 0" }}>
          0.12 <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-text-secondary)" }}>target &lt; 0.15</span>
        </h4>
        <p style={{ margin: 0, fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
          Mean squared error between predicted probabilities and actual labels.
        </p>
      </div>

      <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.05)", borderRadius: "16px", padding: "24px" }}>
        <span style={{ fontSize: "10px", fontWeight: 800, color: "var(--color-text-secondary)", textTransform: "uppercase" }}>
          Why It Matters — Tiered Routing
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px" }}>
          <div style={{ display: "flex", gap: "8px", fontSize: "12px" }}>
            <strong style={{ color: "#11a961", minWidth: "80px" }}>HIGH CONF:</strong>
            <span style={{ color: "var(--color-text-secondary)" }}>Auto-accept (low-risk constructs only)</span>
          </div>
          <div style={{ display: "flex", gap: "8px", fontSize: "12px" }}>
            <strong style={{ color: "#eab308", minWidth: "80px" }}>MID CONF:</strong>
            <span style={{ color: "var(--color-text-secondary)" }}>Flag with rationale for reviewer</span>
          </div>
          <div style={{ display: "flex", gap: "8px", fontSize: "12px" }}>
            <strong style={{ color: "#ef4444", minWidth: "80px" }}>LOW CONF:</strong>
            <span style={{ color: "var(--color-text-secondary)" }}>Route to expert human review</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────── Interactive Confusion Matrix & Error Chart ─────── */
function ConfusionMatrixAndErrorChart() {
  const [activeTab, setActiveTab] = useState<"matrix" | "errors">("matrix");

  return (
    <div style={{ marginTop: "32px", padding: "24px", background: "#ffffff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)" }}>
      {/* Selector */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
        <button
          onClick={() => setActiveTab("matrix")}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            background: activeTab === "matrix" ? "#8b69fa" : "rgba(0,0,0,0.03)",
            color: activeTab === "matrix" ? "#ffffff" : "var(--color-text)",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Confusion Matrix
        </button>
        <button
          onClick={() => setActiveTab("errors")}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            background: activeTab === "errors" ? "#8b69fa" : "rgba(0,0,0,0.03)",
            color: activeTab === "errors" ? "#ffffff" : "var(--color-text)",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Error Breakdown (FP vs. FN)
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "matrix" ? (
          <motion.div
            key="matrix"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginBottom: "20px" }}>
              Representative confusion matrix demonstrating the average classification distribution across sparse communication constructs (such as <code>nurse_explore</code>):
            </p>
            <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
              <div style={{ display: "grid", gridTemplateColumns: "60px 140px 140px", gridTemplateRows: "30px 100px 100px", gap: "8px", textAlign: "center", fontSize: "13px" }}>
                {/* Empty corner */}
                <div />
                <div style={{ fontWeight: 800, alignSelf: "end" }}>Predicted Present</div>
                <div style={{ fontWeight: 800, alignSelf: "end" }}>Predicted Absent</div>

                <div style={{ fontWeight: 800, alignSelf: "center", textAlign: "right", paddingRight: "10px" }}>Actual Present</div>
                {/* True Positive */}
                <div style={{ background: "rgba(17, 169, 97, 0.08)", border: "2px dashed #11a961", borderRadius: "8px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "10px" }}>
                  <span style={{ fontSize: "20px", fontWeight: 900, color: "#11a961" }}>72%</span>
                  <span style={{ fontSize: "11px", fontWeight: 700, marginTop: "4px" }}>True Positive</span>
                </div>
                {/* False Negative */}
                <div style={{ background: "rgba(220, 53, 69, 0.08)", border: "2px dashed #dc3545", borderRadius: "8px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "10px" }}>
                  <span style={{ fontSize: "20px", fontWeight: 900, color: "#dc3545" }}>12%</span>
                  <span style={{ fontSize: "11px", fontWeight: 700, marginTop: "4px" }}>False Negative</span>
                </div>

                <div style={{ fontWeight: 800, alignSelf: "center", textAlign: "right", paddingRight: "10px" }}>Actual Absent</div>
                {/* False Positive */}
                <div style={{ background: "rgba(220, 53, 69, 0.08)", border: "2px dashed #dc3545", borderRadius: "8px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "10px" }}>
                  <span style={{ fontSize: "20px", fontWeight: 900, color: "#dc3545" }}>11%</span>
                  <span style={{ fontSize: "11px", fontWeight: 700, marginTop: "4px" }}>False Positive</span>
                </div>
                {/* True Negative */}
                <div style={{ background: "rgba(17, 169, 97, 0.08)", border: "2px dashed #11a961", borderRadius: "8px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "10px" }}>
                  <span style={{ fontSize: "20px", fontWeight: 900, color: "#11a961" }}>88%</span>
                  <span style={{ fontSize: "11px", fontWeight: 700, marginTop: "4px" }}>True Negative</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="errors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginBottom: "20px" }}>
              Qualitative mapping of why False Positives and False Negatives occur, based on error audits:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              {/* False Positives */}
              <div style={{ background: "rgba(220, 53, 69, 0.02)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(220, 53, 69, 0.1)" }}>
                <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: 800, color: "#dc3545" }}>False Positives (11% Error Rate)</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div>
                    <h5 style={{ margin: "0 0 4px 0", fontSize: "13px", fontWeight: 700 }}>1. Conversational Filler / Agreement</h5>
                    <p style={{ margin: 0, fontSize: "12px", color: "var(--color-text-secondary)" }}>
                      Patient says &quot;yeah&quot;, &quot;right&quot;, or &quot;sure&quot; as passive conversational markers, which the model mislabels as collaborative agreement or active signposting.
                    </p>
                  </div>
                  <div>
                    <h5 style={{ margin: "0 0 4px 0", fontSize: "13px", fontWeight: 700 }}>2. General vs. Emotional Inquiry</h5>
                    <p style={{ margin: 0, fontSize: "12px", color: "var(--color-text-secondary)" }}>
                      General open-ended medical exploration (e.g., &quot;Tell me about your headache&quot;) is misclassified as emotional exploration (e.g., NURSE Explore).
                    </p>
                  </div>
                </div>
              </div>

              {/* False Negatives */}
              <div style={{ background: "rgba(220, 53, 69, 0.02)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(220, 53, 69, 0.1)" }}>
                <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: 800, color: "#dc3545" }}>False Negatives (12% Error Rate)</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div>
                    <h5 style={{ margin: "0 0 4px 0", fontSize: "13px", fontWeight: 700 }}>1. Subtle or Indirect Cues</h5>
                    <p style={{ margin: 0, fontSize: "12px", color: "var(--color-text-secondary)" }}>
                      Patients express distress indirectly (e.g., &quot;It has just been a lot lately&quot;) without using explicit emotion words, which the attention layer occasionally misses.
                    </p>
                  </div>
                  <div>
                    <h5 style={{ margin: "0 0 4px 0", fontSize: "13px", fontWeight: 700 }}>2. Sarcasm / Tone Instability</h5>
                    <p style={{ margin: 0, fontSize: "12px", color: "var(--color-text-secondary)" }}>
                      Statements like &quot;Oh that is just wonderful&quot; (sarcastic) are misconstrued as support by the text-only classifier due to lack of vocal tone context.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────── Interactive PHI De-identification Step Visual ─────── */
function NERDeIdentificationFlow() {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

  const steps = [
    { num: 1, label: "1 RAW INPUT", desc: "Original transcript containing Protected Health Information (PHI)." },
    { num: 2, label: "2 SCAN ENTITIES", desc: "NER model scans text to detect dates, names, locations, ages, and contact info." },
    { num: 3, label: "3 CLASSIFY PHI", desc: "System classifies identified spans into categories based on i2b2 benchmarks." },
    { num: 4, label: "4 MASK & RELEASE", desc: "Sensitive spans replaced with typed tokens; behaviors intact, identity removed." },
  ];

  return (
    <div style={{ marginTop: "32px", padding: "24px", background: "#ffffff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)" }}>
      {/* Steps Menu */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "20px" }}>
        {steps.map((s) => (
          <button
            key={s.num}
            onClick={() => setActiveStep(s.num as any)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              background: activeStep === s.num ? "#8b69fa" : "rgba(0,0,0,0.03)",
              color: activeStep === s.num ? "#ffffff" : "var(--color-text)",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "24px" }}>
        {steps[activeStep - 1].desc}
      </p>

      {/* Transcript Box */}
      <div
        style={{
          background: "var(--color-bg-card)",
          border: "1px solid rgba(0,0,0,0.05)",
          borderRadius: "12px",
          padding: "24px",
          fontFamily: "monospace",
          fontSize: "13px",
          lineHeight: 1.7,
        }}
      >
        <div>
          <strong>DR:</strong> Good morning, Mr.{" "}
          {activeStep === 1 && <strong>Alvarez</strong>}
          {activeStep === 2 && <span style={{ background: "rgba(139, 105, 250, 0.15)", padding: "2px 4px", borderRadius: "4px", border: "1px solid #8b69fa" }}>Alvarez</span>}
          {activeStep === 3 && <span style={{ background: "#8b69fa", color: "#fff", padding: "2px 4px", borderRadius: "4px", fontSize: "11px" }}>NAME: Alvarez</span>}
          {activeStep === 4 && <span style={{ background: "rgba(0,0,0,0.8)", color: "#fff", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold" }}>[NAME]</span>}
          . I see you visited{" "}
          {activeStep === 1 && <strong>Riverside Clinic</strong>}
          {activeStep === 2 && <span style={{ background: "rgba(139, 105, 250, 0.15)", padding: "2px 4px", borderRadius: "4px", border: "1px solid #8b69fa" }}>Riverside Clinic</span>}
          {activeStep === 3 && <span style={{ background: "#8b69fa", color: "#fff", padding: "2px 4px", borderRadius: "4px", fontSize: "11px" }}>LOCATION: Riverside Clinic</span>}
          {activeStep === 4 && <span style={{ background: "rgba(0,0,0,0.8)", color: "#fff", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold" }}>[LOCATION]</span>}
          {" "}on{" "}
          {activeStep === 1 && <strong>March 3rd</strong>}
          {activeStep === 2 && <span style={{ background: "rgba(139, 105, 250, 0.15)", padding: "2px 4px", borderRadius: "4px", border: "1px solid #8b69fa" }}>March 3rd</span>}
          {activeStep === 3 && <span style={{ background: "#8b69fa", color: "#fff", padding: "2px 4px", borderRadius: "4px", fontSize: "11px" }}>DATE: March 3rd</span>}
          {activeStep === 4 && <span style={{ background: "rgba(0,0,0,0.8)", color: "#fff", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold" }}>[DATE]</span>}
          {" "}for the chest pain.
        </div>
        <div style={{ marginTop: "12px" }}>
          <strong>PT:</strong> Yes, Dr.{" "}
          {activeStep === 1 && <strong>Chen</strong>}
          {activeStep === 2 && <span style={{ background: "rgba(139, 105, 250, 0.15)", padding: "2px 4px", borderRadius: "4px", border: "1px solid #8b69fa" }}>Chen</span>}
          {activeStep === 3 && <span style={{ background: "#8b69fa", color: "#fff", padding: "2px 4px", borderRadius: "4px", fontSize: "11px" }}>NAME: Chen</span>}
          {activeStep === 4 && <span style={{ background: "rgba(0,0,0,0.8)", color: "#fff", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold" }}>[NAME]</span>}
          {" "}referred me. I turned{" "}
          {activeStep === 1 && <strong>58</strong>}
          {activeStep === 2 && <span style={{ background: "rgba(139, 105, 250, 0.15)", padding: "2px 4px", borderRadius: "4px", border: "1px solid #8b69fa" }}>58</span>}
          {activeStep === 3 && <span style={{ background: "#8b69fa", color: "#fff", padding: "2px 4px", borderRadius: "4px", fontSize: "11px" }}>AGE: 58</span>}
          {activeStep === 4 && <span style={{ background: "rgba(0,0,0,0.8)", color: "#fff", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold" }}>[AGE]</span>}
          {" "}last month. You can reach me at{" "}
          {activeStep === 1 && <strong>610-555-0142</strong>}
          {activeStep === 2 && <span style={{ background: "rgba(139, 105, 250, 0.15)", padding: "2px 4px", borderRadius: "4px", border: "1px solid #8b69fa" }}>610-555-0142</span>}
          {activeStep === 3 && <span style={{ background: "#8b69fa", color: "#fff", padding: "2px 4px", borderRadius: "4px", fontSize: "11px" }}>CONTACT: 610-555-0142</span>}
          {activeStep === 4 && <span style={{ background: "rgba(0,0,0,0.8)", color: "#fff", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold" }}>[CONTACT]</span>}
          .
        </div>
      </div>
    </div>
  );
}

export default function ABIMCaseStudy() {
  return (
    <main>
      <CaseStudyHero
        title="Measuring Physician Communication at Scale"
        category="NLP &amp; UX Research"
        role="Data Scientist Co-op (Shweta: Data &amp; Labels)"
        team="I/O Psychologists, Data Scientist, and AI/ML Engineer"
        timeline="Co-Op (6 months)"
        image="/assets/personalization.jpg"
      />

      <CaseStudyLayout sections={sections}>
        {/* ============================================ */}
        {/* SECTION 1: THE CHALLENGE                     */}
        {/* ============================================ */}
        <CaseStudySection
          id="challenge"
          label="Overview"
          heading="Why Patient Communication Measurement Matters (and Why It's Hard)"
        >
          <SkillConstellation
            primary={["NLP Pipeline Engineering", "Transformer Fine-Tuning (BERT)", "Rubric Design"]}
            supporting={["Prompt Engineering", "LLM-Assisted Labeling", "Data Curation"]}
            emerging={["Research Ethics & AI Governance", "PHI De-identification"]}
          />

          <p style={{ fontSize: "17px", fontStyle: "italic", color: "var(--color-text-secondary)", marginBottom: "32px" }}>
            How to open: Start here before showing any slides or data. This is your hook. Say: &quot;Physicians are certified on medical knowledge, but the other five ACGME competencies, especially how they communicate with patients, are almost never measured rigorously. That is the gap this project tried to close.&quot;
          </p>

          <h3 style={{ color: "#8b69fa", fontWeight: 800 }}>The Verification Gap in Medicine</h3>
          <p>
            The American Board of Internal Medicine (ABIM) certifies physicians across six core competency domains. While medical knowledge is rigorously tested via formal board examinations, patient interaction is rarely measured at scale:
          </p>

          <div style={{ overflowX: "auto", margin: "24px 0", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.06)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.02)", textAlign: "left" }}>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Competency Domain</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Measurement Status</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Medical Knowledge</td>
                  <td style={{ padding: "12px 16px", color: "#11a961", fontWeight: 600 }}>✅ Rigorously tested (board exams)</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Patient Care &amp; Procedural Skills</td>
                  <td style={{ padding: "12px 16px", color: "#d97706", fontWeight: 600 }}>⚠️ Partially measured</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Practice-Based Learning &amp; Improvement</td>
                  <td style={{ padding: "12px 16px", color: "#d97706", fontWeight: 600 }}>⚠️ Self-reported</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Systems-Based Practice</td>
                  <td style={{ padding: "12px 16px", color: "#d97706", fontWeight: 600 }}>⚠️ Self-reported</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Interpersonal &amp; Communication Skills</td>
                  <td style={{ padding: "12px 16px", color: "#dc3545", fontWeight: 600 }}>❌ Almost never measured at scale</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Professionalism</td>
                  <td style={{ padding: "12px 16px", color: "#dc3545", fontWeight: 600 }}>❌ Almost never measured at scale</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            The result is a <strong>massive verification gap</strong>: physicians are certified via examination but assumed to be capable of proper human interaction. The only existing measure of communication quality (patient satisfaction surveys) is rare, self-selected, and indirect.
          </p>

          <p style={{ margin: "20px 0", padding: "16px", background: "var(--color-bg-card)", borderLeft: "4px solid var(--color-accent)", borderRadius: "0 8px 8px 0" }}>
            <strong>The Problem in Numbers:</strong> Expert human grading of communication is the gold standard but tops out at ~50 conversations per week. Rater bias, drift, and order effects make even gold standard human rating inconsistent, leaving trainees with limited, sporadic communication feedback.
          </p>

          <h3 style={{ color: "#8b69fa", fontWeight: 800 }}>Why Communication is Hard to Measure</h3>
          <p>
            Communication quality is difficult to quantify because:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "8px" }}><strong>Construct subjectivity:</strong> Concepts like empathy and shared decision-making are expressed in many different linguistic forms.</li>
            <li style={{ marginBottom: "8px" }}><strong>Context dependency:</strong> What counts as good communication in a routine encounter differs from a serious illness discussion.</li>
            <li style={{ marginBottom: "8px" }}><strong>Invisibility of non-verbal behavior:</strong> Body language, eye contact, and tone are not present in transcripts.</li>
            <li style={{ marginBottom: "8px" }}><strong>Scale bottleneck:</strong> Manual expert review cannot scale beyond ~50 conversations/week without unacceptable quality degradation.</li>
          </ul>

          <h3 style={{ color: "#8b69fa", fontWeight: 800 }}>The Research Question</h3>
          <p style={{ fontSize: "18px", fontWeight: 600, color: "var(--color-accent)", margin: "24px 0" }}>
            &quot;Can AI-driven pattern recognition achieve the same level of nuance and accuracy as human expert evaluation of clinical communication?&quot;
          </p>
          <p>
            Three subsidiary questions shaped the study design:
          </p>
          <ol style={{ paddingLeft: "20px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "8px" }}>Can rubric-grounded annotation reduce rater subjectivity to a reliable, replicable standard?</li>
            <li style={{ marginBottom: "8px" }}>Can LLM-assisted labeling scale annotation without sacrificing construct validity?</li>
            <li style={{ marginBottom: "8px" }}>Can a downstream classifier achieve sufficient per-construct precision/recall to support formative (not deterministic) feedback?</li>
          </ol>

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
              text="Rubric-grounded annotation, LLM-assisted labeling, and BERT classifier training, aligned to Calgary-Cambridge and NURSE frameworks."
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
        {/* SECTION 2: TAXONOMY                          */}
        {/* ============================================ */}
        <CaseStudySection
          id="taxonomy"
          label="The Taxonomy"
          heading="Framework Taxonomy &amp; 16 Nuanced Medical Skills"
        >
          <p>
            To address physician communication competencies, we reviewed five established clinical communication frameworks and co-designed a structured curriculum. 
            We identified sixteen nuanced communication skills across five categories. Out of these, twelve were mapped to text-detectable verbal behaviors, while four were excluded because they require audio, video, or physical observation.
          </p>

          <FrameworkTaxonomy />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 3: PIPELINE                          */}
        {/* ============================================ */}
        <CaseStudySection
          id="pipeline"
          label="The Pipeline"
          heading="The Five-Phase Data Pipeline &amp; Label Ontology"
        >
          <p>
            To scale measurement reliably, we constructed an end-to-end labeling and model training pipeline. Each phase acts as a strict quality gate, preventing error propagation and construct drift.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "16px",
              marginTop: "24px",
              marginBottom: "32px",
            }}
          >
            <PipelineStepCard
              step="1"
              label="Synthetic Bootstrap"
              description="ChatNote-style data + Label Studio. Useful for rubric testing; invalid as primary corpus."
              gate="rubric operationalized"
              color="#6366f1"
              index={0}
            />
            <PipelineStepCard
              step="2"
              label="Real Transcript Pivot"
              description="VHA 4C anchor + ACI-BENCH, OSCE, PriMock57 supplements. ~985 conversations."
              gate="construct validity"
              color="#8b5cf6"
              index={1}
            />
            <PipelineStepCard
              step="3"
              label="LLM Labeling at Scale"
              description="Rubric-grounded prompts; one construct at a time; Qwen vs. Llama selected per construct."
              gate="no cross-contamination"
              color="#a855f7"
              index={2}
            />
            <PipelineStepCard
              step="4"
              label="PHI De-Identification"
              description="NER-based masking to i2b2/UTHealth 2014 standard. HIPAA prerequisite for real data."
              gate="ethical + legal"
              color="#c084fc"
              index={3}
            />
            <PipelineStepCard
              step="5"
              label="SLM Training"
              description="Multi-label + ordinal 1–5 scoring. Probability outputs with audit rationale text."
              gate="formative use only"
              color="#d946ef"
              index={4}
            />
          </div>

          <p style={{ margin: "20px 0", padding: "16px", background: "rgba(139, 105, 250, 0.03)", borderLeft: "4px solid #8b69fa", borderRadius: "0 8px 8px 0", fontSize: "14px" }}>
            <strong>The Pivot — Synthetic to Real:</strong> Synthetic ChatNote-style data carried distribution-shift and model-collapse risk. The corpus was re-anchored on real VHA 4C encounters, with ACI-BENCH, OSCE, and PriMock57 as supplements. This was a construct-validity decision, not a data-availability one.
          </p>

          <h3 style={{ color: "#8b69fa", fontWeight: 800 }}>Label Ontology — 9 Prefix Families</h3>
          <p>
            Every behavioral label maps upward: transcript label to ACGME competency domain, and finally to Milestones developmental level. The schema is modular and composable.
          </p>

          <LabelOntology />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 4: METRICS                           */}
        {/* ============================================ */}
        <CaseStudySection
          id="metrics"
          label="The Evidence"
          heading="Per-Construct Classifier Performance &amp; IRR"
        >
          <p>
            Precision, Recall, and F1 per construct were evaluated. Because communication behaviors are sparse and imbalanced in clinical transcripts, aggregate accuracy is highly misleading. Macro-F1 serves as our primary headline metric.
          </p>

          <ClassifierPerformanceChart />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginTop: "24px" }}>
            <div style={{ padding: "20px", borderRadius: "12px", border: "1px solid rgba(139, 105, 250, 0.15)", background: "rgba(139, 105, 250, 0.02)" }}>
              <h5 style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: 700, color: "#8b69fa" }}>Best Detected</h5>
              <p style={{ margin: 0, fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                Constructs with explicit verbal markers (such as NURSE: Name, which requires specific emotion words) are detected highly reliably by the model.
              </p>
            </div>
            <div style={{ padding: "20px", borderRadius: "12px", border: "1px solid rgba(139, 105, 250, 0.15)", background: "rgba(139, 105, 250, 0.02)" }}>
              <h5 style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: 700, color: "#8b69fa" }}>Hardest</h5>
              <p style={{ margin: 0, fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                Constructs requiring deep pragmatic inference (such as NURSE: Explore, which is difficult to distinguish from general open-ended questioning) highlight text-only signal limits.
              </p>
            </div>
          </div>

          <h3 style={{ color: "#8b69fa", fontWeight: 800, marginTop: "48px" }}>Inter-Rater Reliability — LLM vs. Human Graders</h3>
          <p>
            Cohen&apos;s &kappa; was computed per construct against Landis &amp; Koch (1977) benchmark bands. Low-agreement constructs are automatically flagged and routed to human review, enabling the pipeline to identify its own uncertainty.
          </p>

          <IRRChart />

          <h3 style={{ color: "#8b69fa", fontWeight: 800, marginTop: "48px" }}>Calibration — Does the Model Know When It&apos;s Unsure?</h3>
          <p>
            A model that output says &quot;75% confident&quot; should be right 75% of the time. Expected Calibration Error (ECE) and Brier Score drive our tiered, human-in-the-loop routing:
          </p>

          <CalibrationVisual />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 5: ERRORS                            */}
        {/* ============================================ */}
        <CaseStudySection
          id="errors"
          label="Error Analysis"
          heading="False Positive &amp; False Negative Analysis"
        >
          <p>
            A qualitative and quantitative breakdown of Type I (False Positive) and Type II (False Negative) errors across the communication constructs. Audit audits were conducted to map failure modes and improve prompt grounding.
          </p>

          <ConfusionMatrixAndErrorChart />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 6: DEIDENTIFICATION                  */}
        {/* ============================================ */}
        <CaseStudySection
          id="deidentification"
          label="Privacy Protection"
          heading="PHI De-Identification — How NER Works"
        >
          <p>
            Named Entity Recognition detects Protected Health Information spans, classifies them by type, and masks them before any transcript enters the labeling pipeline. Standard: i2b2/UTHealth 2014 de-identification corpus.
          </p>

          <NERDeIdentificationFlow />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 7: GOVERNANCE                        */}
        {/* ============================================ */}
        <CaseStudySection
          id="governance"
          label="The Policy"
          heading="Measurement Validity, Governance &amp; Honest Assessment"
        >
          <p>
            ACGME explicitly warns that Milestones are an educational, formative assessment tool and were not designed for high-stakes external decisions. Automation can introduce false precision and bias, which shaped our formative-use framing.
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
              title="Don't Present Output as a Milestone Score"
              description="Never make automated output determinative for advancement or credentialing without full human review. ACGME Milestones were not designed for external high-stakes use."
            />
            <GovernanceCard
              index={1}
              icon="⚠️"
              title="Don't Rely Only on Simulated Data"
              description="Simulated roleplay transcripts contain explicit structure that real encounters lack. Real clinical encounter anchoring is essential for valid measurement."
            />
            <GovernanceCard
              index={2}
              icon="🔬"
              title="Don't Skip Label Quality Monitoring"
              description="Training classifiers on noisy silver labels causes training plateaus. Monitor label entropy and implement a human validation fallback tier."
            />
            <GovernanceCard
              index={3}
              icon="📉"
              title="Don't Report Only Overall Accuracy"
              description="Communication behaviors are sparse. Report per-construct F1, calibration metrics (ECE), and slice-based performance to detect bias."
            />
          </div>

          <h3 style={{ color: "#8b69fa", fontWeight: 800 }}>Types of Validity Addressed</h3>
          <div style={{ overflowX: "auto", margin: "24px 0", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.06)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.02)", textAlign: "left" }}>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Validity Type</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>How Established</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Evidence</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Content Validity</td>
                  <td style={{ padding: "12px 16px" }}>Using peer-reviewed clinical communication guides (CCG, NURSE) validated in past healthcare studies.</td>
                  <td style={{ padding: "12px 16px" }}>Published framework citations, ABMS/ACGME literature adoption.</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Construct Validity</td>
                  <td style={{ padding: "12px 16px" }}>Developing 11 operationalized rubrics with explicit inclusion/exclusion checklist points before running labels.</td>
                  <td style={{ padding: "12px 16px" }}>Checklists, borderline examples, and prompt-grounding documentation.</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Face Validity</td>
                  <td style={{ padding: "12px 16px" }}>I/O Psychologists and clinical educators reviewed the checklist items against communication standards.</td>
                  <td style={{ padding: "12px 16px" }}>Adjudication and feedback records.</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Criterion Validity</td>
                  <td style={{ padding: "12px 16px" }}>Comparing automated scores against OSCE panel grades and patient satisfaction outcome metrics (In Progress).</td>
                  <td style={{ padding: "12px 16px" }}>Criterion-matching dataset roadmap.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ color: "#8b69fa", fontWeight: 800 }}>Honest Assessment &amp; Limitations</h3>
          <p>
            We acknowledge critical limitations: this study measured tool adoption and communication sentiment, not downstream clinical quality. Because physical examination actions, body language, and voice tone are invisible in text, our measurements remain fundamentally partial. Additionally, with 15 participants across a 250+ product portfolio, the findings reflect P&amp;C team patterns and may not generalize to all lines.
          </p>

          <div
            style={{
              marginTop: "48px",
              padding: "32px",
              background: "rgba(139, 105, 250, 0.04)",
              borderRadius: "16px",
              border: "1px solid rgba(139, 105, 250, 0.1)",
            }}
          >
            <h4 style={{ margin: "0 0 12px 0", fontSize: "16px", color: "#8b69fa", fontWeight: 700 }}>
              What I&apos;d Do Differently
            </h4>
            <ul style={{ paddingLeft: "20px", fontSize: "14px", lineHeight: 1.6 }}>
              <li style={{ marginBottom: "8px" }}><strong>Build human validation sets earlier:</strong> Double-code 100 to 150 conversations in month one to calculate construct-level Cohen&apos;s &kappa; before running the model.</li>
              <li style={{ marginBottom: "8px" }}><strong>Report construct difficulty explicitly:</strong> Differentiate between linguistically explicit constructs (e.g., NURSE Name) and implicit ones (e.g., NURSE Explore).</li>
              <li style={{ marginBottom: "8px" }}><strong>Run feedback UX research in parallel:</strong> Test whether physicians actually interpret and reflect on the score probabilities and rationales in their everyday workflow.</li>
            </ul>
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
            This case study documents NLP research conducted during an ABIM Co-Op. The project is framed as formative, developmental research, not as a validated clinical assessment tool. All governance recommendations follow ACGME Milestone usage guidelines.
          </div>
        </CaseStudySection>
      </CaseStudyLayout>
    </main>
  );
}
