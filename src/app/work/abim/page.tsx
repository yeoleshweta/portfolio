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
  { id: "overview", label: "Overview" },
  { id: "taxonomy", label: "2. Study Design" },
  { id: "pipeline", label: "3. Data Pipeline" },
  { id: "metrics", label: "4. Quantitative Metrics" },
  { id: "errors", label: "5. Error Analysis" },
  { id: "deidentification", label: "6. De-Identification" },
  { id: "governance", label: "7. Validity & Governance" },
  { id: "role", label: "8. Shweta's Role" },
  { id: "limitations", label: "9. Limitations" },
  { id: "impact", label: "10. Impact & Presentation" },
];





/* ─────── Dataset Source Table ─────── */
function DatasetTable() {
  const datasets = [
    {
      source: "VHA 4C Lineage",
      type: "Real recorded encounters",
      contribution: "Primary realism anchor: real-world primary care dynamics",
    },
    {
      source: "ACI-BENCH",
      type: "Mixed simulation / role-play",
      contribution: "Benchmark-style transcripts",
    },
    {
      source: "OSCE Simulated Interviews",
      type: "Simulated",
      contribution: "High-quality respiratory-focus transcripts; domain labels",
    },
    {
      source: "PriMock57",
      type: "Simulated mock primary care",
      contribution: "Multi-artifact benchmarking",
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
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", minWidth: "500px" }}>
          <thead>
            <tr style={{ background: "rgba(0,0,0,0.03)", textAlign: "left" }}>
              <th style={{ padding: "14px 18px", fontWeight: 700 }}>Source</th>
              <th style={{ padding: "14px 18px", fontWeight: 700 }}>Type</th>
              <th style={{ padding: "14px 18px", fontWeight: 700 }}>Contribution</th>
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
          ECE (Expected Calibration Error)
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
          Why It Matters (Tiered Routing)
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
                    <h5 style={{ margin: "0 0 4px 0", fontSize: "13px", fontWeight: 700 }}>1. Conversational Filler (Agreement)</h5>
                    <p style={{ margin: 0, fontSize: "12px", color: "var(--color-text-secondary)" }}>
                      Patient says &quot;yeah&quot;, &quot;right&quot;, or &quot;sure&quot; as passive conversational markers, which the model mislabels as collaborative agreement or active signposting.
                    </p>
                  </div>
                  <div>
                    <h5 style={{ margin: "0 0 4px 0", fontSize: "13px", fontWeight: 700 }}>2. General vs. Emotional Inquiry</h5>
                    <p style={{ margin: 0, fontSize: "12px", color: "var(--color-text-secondary)" }}>
                      General open-ended medical exploration (such as &quot;Tell me about your headache&quot;) is misclassified as emotional exploration (such as NURSE Explore).
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
                      Patients express distress indirectly (such as &quot;It has just been a lot lately&quot;) without using explicit emotion words, which the attention layer occasionally misses.
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
        title="From Frameworks to F1 Scores: Designing a Scalable Communication Assessment System"
        category="Quantitative UX Research · Measurement Design · Instrument Validation"
        role="Innovation Analyst (Data &amp; Research Focused)"
        team="I/O Psychologists · Data Scientist · AI/ML Engineer"
        timeline="Co-Op (6 months)"
      />

      <CaseStudyLayout sections={sections}>
        {/* ============================================ */}
        {/* SECTION 1: OVERVIEW                          */}
        {/* ============================================ */}
        <CaseStudySection
          id="overview"
        >
          <h3 style={{ color: "#8b69fa", fontWeight: 800, marginTop: "24px" }}>Overview</h3>
          <p style={{ fontSize: "16px", lineHeight: 1.6 }}>
            Physicians are rigorously tested on medical knowledge, but the communication skills that shape patient outcomes? Almost never measured at scale. At ABIM, I spent six months closing that gap: translating two validated clinical communication frameworks into 11 operationalized rubrics, then building and validating a scalable NLP pipeline that applies them reliably across 985 physician conversations.
          </p>


          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", margin: "24px 0", textAlign: "center" }}>
            <div style={{ padding: "20px", background: "rgba(139,105,250,0.03)", borderRadius: "12px", border: "1px solid rgba(139,105,250,0.08)" }}>
              <div style={{ fontSize: "24px", fontWeight: 900, color: "#8b69fa" }}>985</div>
              <div style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "4px" }}>Clinical transcripts labeled</div>
            </div>
            <div style={{ padding: "20px", background: "rgba(139,105,250,0.03)", borderRadius: "12px", border: "1px solid rgba(139,105,250,0.08)" }}>
              <div style={{ fontSize: "24px", fontWeight: 900, color: "#8b69fa" }}>11</div>
              <div style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "4px" }}>Behavioral constructs operationalized</div>
            </div>
            <div style={{ padding: "20px", background: "rgba(139,105,250,0.03)", borderRadius: "12px", border: "1px solid rgba(139,105,250,0.08)" }}>
              <div style={{ fontSize: "24px", fontWeight: 900, color: "#8b69fa" }}>12</div>
              <div style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "4px" }}>AI-detectable communication skills</div>
            </div>
            <div style={{ padding: "20px", background: "rgba(139,105,250,0.03)", borderRadius: "12px", border: "1px solid rgba(139,105,250,0.08)" }}>
              <div style={{ fontSize: "24px", fontWeight: 900, color: "#8b69fa" }}>9</div>
              <div style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "4px" }}>Label prefix families in the schema</div>
            </div>
          </div>

          <SkillConstellation
            primary={["NLP Pipeline Engineering", "Transformer Fine-Tuning (BERT)", "Rubric Design"]}
            supporting={["Prompt Engineering", "LLM-Assisted Labeling", "Data Curation"]}
            emerging={["Research Ethics & AI Governance", "PHI De-identification"]}
          />

          <h3 style={{ color: "#8b69fa", fontWeight: 800, marginTop: "40px" }}>Background</h3>
          <p>
            Medicine is changing fast. Ambient listening tools transcribe encounters in real time. AI scribes write clinical notes from spoken conversation. Telemedicine has moved care into video calls and async messaging. More physician-patient conversations are being captured than ever before, but the ability to measure what happens in them has not kept pace.
          </p>
          <p>
            Of all the competencies that determine patient outcomes, communication has the broadest reach: whether a patient understands their diagnosis, follows through on treatment, or feels safe enough to return. It almost always comes down to how the physician communicated. ACGME names Interpersonal and Communication Skills as a core competency alongside Medical Knowledge. Yet medical knowledge gets board exams and communication gets assumptions.
          </p>
          <p>
            The existing approach is such where trained human raters reviewing transcripts tops out at ~50 conversations per week, with documented reliability problems: rater bias, rater drift, order effects. As transcript volume grows, the gap between what exists and what can be evaluated widens.
          </p>
          <p>
            ABIM&apos;s Innovation team brought the question: can AI detect communication behaviors at scale without losing the measurement quality that makes the output meaningful? We reframed it immediately. This wasn&apos;t a model problem: it was a measurement design problem. The rubric, not the classifier, was the answer.
          </p>

          <h3 style={{ color: "#8b69fa", fontWeight: 800, marginTop: "40px" }}>1.1 The Verification Gap in Medicine</h3>
          <p>
            ABIM certifies physicians across six core competency domains. While medical knowledge is rigorously tested via formal board examinations, patient interaction is rarely measured at scale:
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
                  <td style={{ padding: "14px 16px", fontWeight: 600, color: "var(--color-text)" }}>Medical Knowledge</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(16, 185, 129, 0.06)", border: "1px solid rgba(16, 185, 129, 0.15)", borderRadius: "20px", padding: "4px 10px", fontSize: "12px", color: "#10b981", fontWeight: 700 }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
                      Rigorously tested (board exams)
                    </div>
                  </td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "14px 16px", fontWeight: 600, color: "var(--color-text)" }}>Patient Care &amp; Procedural Skills</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(245, 158, 11, 0.06)", border: "1px solid rgba(245, 158, 11, 0.15)", borderRadius: "20px", padding: "4px 10px", fontSize: "12px", color: "#d97706", fontWeight: 700 }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#d97706" }} />
                      Partially measured
                    </div>
                  </td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "14px 16px", fontWeight: 600, color: "var(--color-text)" }}>Practice-Based Learning &amp; Improvement</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(245, 158, 11, 0.06)", border: "1px solid rgba(245, 158, 11, 0.15)", borderRadius: "20px", padding: "4px 10px", fontSize: "12px", color: "#d97706", fontWeight: 700 }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#d97706" }} />
                      Self-reported
                    </div>
                  </td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "14px 16px", fontWeight: 600, color: "var(--color-text)" }}>Systems-Based Practice</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(245, 158, 11, 0.06)", border: "1px solid rgba(245, 158, 11, 0.15)", borderRadius: "20px", padding: "4px 10px", fontSize: "12px", color: "#d97706", fontWeight: 700 }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#d97706" }} />
                      Self-reported
                    </div>
                  </td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "14px 16px", fontWeight: 600, color: "var(--color-text)" }}>Interpersonal &amp; Communication Skills</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(239, 68, 68, 0.06)", border: "1px solid rgba(239, 68, 68, 0.15)", borderRadius: "20px", padding: "4px 10px", fontSize: "12px", color: "#ef4444", fontWeight: 700 }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444" }} />
                      Almost never measured at scale
                    </div>
                  </td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "14px 16px", fontWeight: 600, color: "var(--color-text)" }}>Professionalism</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(239, 68, 68, 0.06)", border: "1px solid rgba(239, 68, 68, 0.15)", borderRadius: "20px", padding: "4px 10px", fontSize: "12px", color: "#ef4444", fontWeight: 700 }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444" }} />
                      Almost never measured at scale
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            The result is a massive verification gap: physicians are certified via examination but assumed capable of proper human interaction. The only existing measure, patient satisfaction surveys, is rare, self-selected, and indirect.
          </p>


          <Blockquote
            text="Key phrase to use: &quot;We certify doctors via exam but assume they are capable of proper human interaction. This project tried to make that assumption testable.&quot;"
          />

          <h3 style={{ color: "#8b69fa", fontWeight: 800, marginTop: "40px" }}>1.2 Why Communication is Hard to Measure</h3>
          <p>
            Communication quality is difficult to quantify because:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "8px" }}><strong>Construct subjectivity:</strong> Concepts like empathy, rapport, and shared decision-making are expressed in many different linguistic forms and interpreted differently by different raters.</li>
            <li style={{ marginBottom: "8px" }}><strong>Context dependency:</strong> What counts as good communication in a routine encounter differs from what is required in serious illness discussions or cross-cultural consultations.</li>
            <li style={{ marginBottom: "8px" }}><strong>Invisibility of non-verbal behavior:</strong> Body language, eye contact, and tone are not present in transcripts, creating an inherent measurement gap.</li>
            <li style={{ marginBottom: "8px" }}><strong>Scale bottleneck:</strong> Manual expert review cannot scale beyond ~50 conversations/week without unacceptable quality degradation.</li>
          </ul>
          <p>
            The existing approach (human raters using validated frameworks) has documented reliability problems: rater bias, rater drift, and order effects. These are <strong>psychometric problems</strong>, reliability and validity issues, not just a technology gap.
          </p>

          <h3 style={{ color: "#8b69fa", fontWeight: 800, marginTop: "40px" }}>1.3 The Research Question</h3>
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
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 2: STUDY DESIGN                      */}
        {/* ============================================ */}
        <CaseStudySection
          id="taxonomy"
          label="2. Study Design"
        >

          <h3 style={{ color: "#8b69fa", fontWeight: 800 }}>2.1 Study Type: Mixed Methods, Quantitative Primary</h3>
          <p>
            The study used a two-strand structure (an enabling qualitative strand feeding into a primary quantitative strand):
          </p>

          <div style={{ overflowX: "auto", margin: "24px 0", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.06)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.02)", textAlign: "left" }}>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Strand</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Methods</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Purpose</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Output</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Qualitative (Enabling)</td>
                  <td style={{ padding: "12px 16px" }}>Expert framework operationalization, behavioral coding scheme design, thematic synthesis, exemplar annotation</td>
                  <td style={{ padding: "12px 16px" }}>Build a valid measurement instrument</td>
                  <td style={{ padding: "12px 16px" }}>11 rubrics with inclusion/exclusion criteria, 8–10 annotated exemplars per construct</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Quantitative (Primary)</td>
                  <td style={{ padding: "12px 16px" }}>Content analysis at scale, IRR, classifier performance evaluation, calibration metrics</td>
                  <td style={{ padding: "12px 16px" }}>Validate and deploy the measurement instrument</td>
                  <td style={{ padding: "12px 16px" }}>LLM agreement rates, per-construct F1/Precision/Recall, behavioral profiles across 985 conversations</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            <strong>Why qual enables quant here:</strong> The rubric design phase is the equivalent of instrument design in survey research: it is qual work, but its purpose is to enable the quant phase.
          </p>

          <h3 style={{ color: "#8b69fa", fontWeight: 800, marginTop: "40px" }}>2.2 Industry-Standard Methods Used</h3>

          <h4 style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-text-secondary)", textTransform: "uppercase", marginTop: "24px", marginBottom: "12px" }}>Qualitative Methods Map</h4>
          <div style={{ overflowX: "auto", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.06)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.02)", textAlign: "left" }}>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Method</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Where It Was Used</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Reference</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Expert Framework Operationalization</td>
                  <td style={{ padding: "12px 16px" }}>Translating Calgary-Cambridge &amp; NURSE into behavioral checklists</td>
                  <td style={{ padding: "12px 16px" }}>DeVellis (2016) (scale development in psychometrics)</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Thematic Synthesis</td>
                  <td style={{ padding: "12px 16px" }}>Synthesizing 5 frameworks to 16 nuanced skills, 12 AI-detectable</td>
                  <td style={{ padding: "12px 16px" }}>Thomas &amp; Harden (2008)</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Behavioral Coding Scheme Design</td>
                  <td style={{ padding: "12px 16px" }}>Creating presence/absence checklists per construct</td>
                  <td style={{ padding: "12px 16px" }}>Bakeman &amp; Gottman (1997)</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Exemplar Annotation (Few-Shot Grounding)</td>
                  <td style={{ padding: "12px 16px" }}>Manually coding 8–10 representative conversations per construct as seed labels</td>
                  <td style={{ padding: "12px 16px" }}>Expert annotation protocol</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-text-secondary)", textTransform: "uppercase", marginTop: "32px", marginBottom: "12px" }}>Quantitative Methods Map</h4>
          <div style={{ overflowX: "auto", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.06)", marginBottom: "32px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.02)", textAlign: "left" }}>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Method</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Where It Was Used</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Reference</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Content Analysis at Scale</td>
                  <td style={{ padding: "12px 16px" }}>Labeling ~985 conversations using LLM annotators constrained by rubric prompts</td>
                  <td style={{ padding: "12px 16px" }}>Krippendorff (2004)</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Inter-Rater Reliability (IRR)</td>
                  <td style={{ padding: "12px 16px" }}>Agreement between human graders and LLM labels (Cohen&apos;s &kappa;)</td>
                  <td style={{ padding: "12px 16px" }}>Landis &amp; Koch (1977)</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Classifier Performance Evaluation</td>
                  <td style={{ padding: "12px 16px" }}>Precision, Recall, F1; Macro-F1 as headline metric</td>
                  <td style={{ padding: "12px 16px" }}>Standard imbalanced classification evaluation</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Calibration Analysis</td>
                  <td style={{ padding: "12px 16px" }}>Expected Calibration Error (ECE) and Brier Score evaluation</td>
                  <td style={{ padding: "12px 16px" }}>Niculescu-Mizil &amp; Caruana (2005)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ color: "#8b69fa", fontWeight: 800 }}>2.3 Why This Is UX Research</h3>
          <p>
            The parallel to traditional user experience research is direct:
          </p>
          <div style={{ overflowX: "auto", margin: "24px 0", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.06)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.02)", textAlign: "left" }}>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Traditional UXR</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>This Study</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px" }}>Survey instrument design (scale items, anchors, pilot testing)</td>
                  <td style={{ padding: "12px 16px" }}>Rubric operationalization (construct definitions, inclusion/exclusion criteria, borderline examples)</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px" }}>Inter-rater reliability for coding schemes</td>
                  <td style={{ padding: "12px 16px" }}>LLM-human IRR per construct</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px" }}>Validated scales (SUS, SUPR-Q, NPS)</td>
                  <td style={{ padding: "12px 16px" }}>Calgary-Cambridge + NURSE (clinical communication equivalents)</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px" }}>Behavioral observation coding</td>
                  <td style={{ padding: "12px 16px" }}>Transcript-based presence/absence coding</td>
                </tr>
              </tbody>
            </table>
          </div>


          <h3 style={{ color: "#8b69fa", fontWeight: 800, marginTop: "40px" }}>3.1 Framework Selection</h3>
          <p>
            Five frameworks were evaluated. Two were selected as primary:
          </p>

          <FrameworkTaxonomy />

          <h3 style={{ color: "#8b69fa", fontWeight: 800, marginTop: "40px" }}>3.2 From 16 Skills to 12 AI-Detectable Constructs</h3>
          <p>
            Framework synthesis identified 16 nuanced medical communication skills. 4 were excluded as non-text-detectable:
          </p>

          <p>
            <strong>Why CCG + NURSE specifically:</strong> Together they cover all 12 AI-detectable skills with no gaps, have strong structural integration (NURSE empathy moves sit naturally inside CCG Phase IV), and are both validated, peer-reviewed, and widely used in clinical communication training.
          </p>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 3: PIPELINE                          */}
        {/* ============================================ */}
        <CaseStudySection
          id="pipeline"
          label="3. Data Pipeline"
        >

          <h3 style={{ color: "#8b69fa", fontWeight: 800 }}>4.1 The Five-Phase Pipeline</h3>
          <p>
            Each phase acts as a quality gate, preventing error propagation and construct drift:
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
              description="VHA 4C anchor + ACI-BENCH, OSCE, PriMock57. ~985 conversations."
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

          <h3 style={{ color: "#8b69fa", fontWeight: 800 }}>4.2 The Pivot to Real Clinical Transcripts</h3>
          <p>
            Initial work used synthetic data. We made a deliberate pivot toward real clinical encounters as the primary corpus anchor:
          </p>

          <DatasetTable />

          <p>
            <strong>Why this was a construct validity decision:</strong> Synthetic conversations contain overly explicit behavioral markers that real encounters lack. A model trained on synthetic data learns a distribution that does not generalize to actual clinical settings: a measurement validity problem, not a model problem.
          </p>


          <h3 style={{ color: "#8b69fa", fontWeight: 800, marginTop: "40px" }}>4.3 LLM-Assisted Labeling Strategy</h3>
          <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "8px" }}><strong>8–10 exemplar conversations</strong> manually curated per construct for few-shot grounding.</li>
            <li style={{ marginBottom: "8px" }}><strong>Rubric-grounded prompts</strong> encoded the full rubric: inclusion criteria, exclusion criteria, structured reasoning output.</li>
            <li style={{ marginBottom: "8px" }}><strong>One construct at a time</strong>: prevents cross-construct contamination.</li>
            <li style={{ marginBottom: "8px" }}><strong>Per-construct model selection</strong>: Qwen vs. Llama evaluated separately per construct.</li>
          </ul>


          <h3 style={{ color: "#8b69fa", fontWeight: 800, marginTop: "40px" }}>4.4 Label Schema (9 Prefix Families)</h3>
          <p>
            Every behavioral label maps upward: transcript label to ACGME competency domain, and finally to Milestones developmental level.
          </p>
          <LabelOntology />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 4: METRICS                           */}
        {/* ============================================ */}
        <CaseStudySection
          id="metrics"
          label="4. Quantitative Metrics"
        >
          <h3 style={{ color: "#8b69fa", fontWeight: 800 }}>5.1 Inter-Rater Reliability (IRR)</h3>
          <p>
            Cohen&apos;s &kappa; computed per construct against Landis &amp; Koch (1977) benchmark bands:
          </p>

          <IRRChart />

          <p style={{ marginTop: "16px", fontSize: "14px" }}>
            <strong>The pattern is itself a finding:</strong> Constructs with explicit linguistic markers (such as NURSE: Naming: directly labeling a patient&apos;s emotion) showed higher agreement. Constructs requiring inference from implicit behavior (such as NURSE: Explore: detecting open-ended emotional inquiry) showed lower agreement. That tells us which behaviors are text-detectable and which require additional signal.
          </p>

          <h3 style={{ color: "#8b69fa", fontWeight: 800, marginTop: "48px" }}>5.2 Classifier Performance (BERT: Per Construct)</h3>
          <p>
            Macro-F1 is the headline metric: it averages F1 across all constructs without weighting by class frequency, the right choice for an imbalanced label space.
          </p>

          <ClassifierPerformanceChart />

          <h3 style={{ color: "#8b69fa", fontWeight: 800, marginTop: "48px" }}>5.3 Calibration Metrics</h3>
          <p>
            A model that says &quot;75% confident&quot; should be right 75% of the time.
          </p>

          <CalibrationVisual />

          <p style={{ marginTop: "20px" }}>
            <strong>Why calibration enables formative feedback:</strong> Calibration scores power a tiered routing system: high confidence labels are auto-accepted, mid confidence are flagged for human review, low confidence are routed to expert review. The model knows when it is uncertain. That is the human-in-the-loop design.
          </p>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 5: ERRORS                            */}
        {/* ============================================ */}
        <CaseStudySection
          id="errors"
          label="5. Error Analysis"
        >
          <p>
            A qualitative and quantitative breakdown of Type I (False Positive) and Type II (False Negative) errors across the communication constructs.
          </p>

          <ConfusionMatrixAndErrorChart />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 6: DEIDENTIFICATION                  */}
        {/* ============================================ */}
        <CaseStudySection
          id="deidentification"
          label="6. De-Identification"
        >
          <p>
            Named Entity Recognition detects Protected Health Information spans, classifies them by type, and masks them before any transcript enters the labeling pipeline.
          </p>
          <p>
            <strong>Standard:</strong> i2b2/UTHealth 2014 de-identification corpus (HIPAA-compliant)
          </p>

          <NERDeIdentificationFlow />

          <p style={{ marginTop: "20px" }}>
            De-identification was built into the pipeline architecture from the start, not added as an afterthought. That reflects a governance-first design philosophy that shaped everything from output format to what claims the team would and would not make.
          </p>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 7: GOVERNANCE                        */}
        {/* ============================================ */}
        <CaseStudySection
          id="governance"
          label="7. Validity &amp; Governance"
        >
          <h3 style={{ color: "#8b69fa", fontWeight: 800 }}>7.1 Types of Validity Addressed</h3>
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
                  <td style={{ padding: "12px 16px" }}>Using peer-reviewed clinical communication frameworks (CCG, NURSE) validated in healthcare studies.</td>
                  <td style={{ padding: "12px 16px" }}>Published framework citations, ABMS/ACGME literature adoption.</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Construct Validity</td>
                  <td style={{ padding: "12px 16px" }}>11 operationalized rubrics with explicit inclusion/exclusion checklists before any labels were run.</td>
                  <td style={{ padding: "12px 16px" }}>Checklists, borderline examples, prompt-grounding documentation.</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Face Validity</td>
                  <td style={{ padding: "12px 16px" }}>I/O Psychologists and clinical educators reviewed checklist items against communication standards.</td>
                  <td style={{ padding: "12px 16px" }}>Adjudication and feedback records.</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Criterion Validity</td>
                  <td style={{ padding: "12px 16px" }}>Comparing automated scores against OSCE panel grades and patient satisfaction metrics.</td>
                  <td style={{ padding: "12px 16px" }}>In progress: criterion-matching dataset roadmap.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ color: "#8b69fa", fontWeight: 800, marginTop: "40px" }}>7.2 Known Threats to Validity</h3>
          <div style={{ overflowX: "auto", margin: "24px 0", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.06)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.02)", textAlign: "left" }}>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Threat</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Description</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Mitigation</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Label Noise Propagation</td>
                  <td style={{ padding: "12px 16px" }}>LLM labels are not gold standard; errors propagate to SLM training.</td>
                  <td style={{ padding: "12px 16px" }}>Seed label anchoring, entropy filtering, human review tier.</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Text-Only Signal Limit</td>
                  <td style={{ padding: "12px 16px" }}>Transcripts omit nonverbal, paraverbal, and physical exam behaviors.</td>
                  <td style={{ padding: "12px 16px" }}>Explicitly excluded 4 non-text-detectable skills from scope.</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Small Gold Set</td>
                  <td style={{ padding: "12px 16px" }}>8–10 exemplars per construct (sufficient for grounding, not formal ICC).</td>
                  <td style={{ padding: "12px 16px" }}>Expanding gold set is primary recommendation for next phase.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ color: "#8b69fa", fontWeight: 800, marginTop: "40px" }}>7.3 Governance: Built In From the Start</h3>
          <p>
            ACGME explicitly states that Milestones are formative educational tools, not designed for high-stakes external decisions. Every output format, framing choice, and constraint was shaped by this:
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginTop: "24px",
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

        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 8: SHWETA'S ROLE                     */}
        {/* ============================================ */}
        <CaseStudySection
          id="role"
          label="8. Shweta's Role"
        >

          <h3 style={{ color: "#8b69fa", fontWeight: 800 }}>What I Owned</h3>
          <p>
            As Innovation Analyst (Data &amp; Research Focused), I owned the data pipeline and labeling architecture:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "12px" }}><strong>Dataset architecture:</strong> Evaluating 4 transcript sources, structuring the corpus around real vs. simulated data, making the case for VHA 4C as the realism anchor.</li>
            <li style={{ marginBottom: "12px" }}><strong>Label schema design:</strong> The 9-prefix labeling ontology with full ACGME competency alignment.</li>
            <li style={{ marginBottom: "12px" }}><strong>LLM labeling strategy:</strong> The one-construct-at-a-time protocol, per-construct model selection (Qwen vs. Llama), exemplar conversation selection criteria.</li>
            <li style={{ marginBottom: "12px" }}><strong>CSV schema architecture:</strong> 5-section schema covering keys, outcomes, features, competency alignment, and weak-label covariates.</li>
            <li style={{ marginBottom: "12px" }}><strong>Simulated to real pivot documentation:</strong> Capturing the rationale with specific failure modes identified (distribution shift, model collapse).</li>
          </ul>

          <h3 style={{ color: "#8b69fa", fontWeight: 800, marginTop: "40px" }}>The Decision That Shows Research Judgment</h3>
          <p>
            <strong>The simulated to real pivot:</strong>
          </p>
          <p style={{ fontStyle: "italic", background: "rgba(139, 105, 250, 0.02)", padding: "16px", borderRadius: "8px", borderLeft: "4px solid #8b69fa" }}>
            &quot;The original plan was to use synthetic ChatNote-style transcripts. I pushed for pivoting toward real clinical encounters (VHA 4C) as the primary data anchor, because if the model learns to detect communication behaviors from synthetic conversations that are cleaner and more explicit than real encounters, the scores it produces won&apos;t generalize to actual clinical settings. That is not a model problem. It is a measurement validity problem. The pivot was a research quality decision.&quot;
          </p>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 9: LIMITATIONS                       */}
        {/* ============================================ */}
        <CaseStudySection
          id="limitations"
          label="9. Limitations"
        >
          <h3 style={{ color: "#8b69fa", fontWeight: 800 }}>Acknowledged Gaps</h3>
          <div style={{ overflowX: "auto", margin: "24px 0", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.06)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.02)", textAlign: "left" }}>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Gap</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Description</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>No Gold-Standard Validation</td>
                  <td style={{ padding: "12px 16px" }}>Pipeline not compared against a calibrated human rating panel or OSCE scores.</td>
                  <td style={{ padding: "12px 16px" }}>Cannot claim criterion validity: only content and construct validity.</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>SHARE Framework Scoped Out</td>
                  <td style={{ padding: "12px 16px" }}>Time constraints prevented implementing shared decision-making labeling.</td>
                  <td style={{ padding: "12px 16px" }}>4 constructs unmeasured.</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Small Exemplar Set</td>
                  <td style={{ padding: "12px 16px" }}>8–10 conversations per construct is enough for grounding, not formal ICC.</td>
                  <td style={{ padding: "12px 16px" }}>Agreement statistics are preliminary, not definitive.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ color: "#8b69fa", fontWeight: 800, marginTop: "40px" }}>Three Things I&apos;d Do Differently</h3>
          <ol style={{ paddingLeft: "20px", fontSize: "14px", lineHeight: 1.6 }}>
            <li style={{ marginBottom: "12px" }}><strong>Build the human validation set first:</strong> Double-code 100–150 conversations in month one to calculate construct baseline Cohen&apos;s &kappa; before running the model.</li>
            <li style={{ marginBottom: "12px" }}><strong>Report construct difficulty explicitly:</strong> Differentiate between linguistically explicit constructs (such as NURSE Name) and implicit ones (such as NURSE Explore): that distinction is as valuable as the F1 score.</li>
            <li style={{ marginBottom: "12px" }}><strong>Run feedback UX research in parallel:</strong> Test whether physicians actually interpret and reflect on the score probabilities and rationales in their everyday workflow.</li>
          </ol>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 10: IMPACT                           */}
        {/* ============================================ */}
        <CaseStudySection
          id="impact"
          label="10. Impact &amp; Presentation"
        >
          <h3 style={{ color: "#8b69fa", fontWeight: 800 }}>What the Project Produced</h3>
          <div style={{ overflowX: "auto", margin: "24px 0", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.06)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.02)", textAlign: "left" }}>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Deliverable</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>11 Operationalized Rubrics</td>
                  <td style={{ padding: "12px 16px" }}>Calgary-Cambridge (6) + NURSE (5): each with inclusion/exclusion criteria, behavioral indicators, borderline examples.</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Labeled Corpus</td>
                  <td style={{ padding: "12px 16px" }}>~985 conversations with construct-level behavioral labels.</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Reusable Pipeline Framework</td>
                  <td style={{ padding: "12px 16px" }}>End-to-end framework (rubric to seed labels to LLM annotation to SLM training).</td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Label Schema</td>
                  <td style={{ padding: "12px 16px" }}>9-prefix ontology mapping every label to ACGME competency domain and Milestones level.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ color: "#8b69fa", fontWeight: 800, marginTop: "40px" }}>Recommended Next Steps</h3>
          <ol style={{ paddingLeft: "20px", fontSize: "14px", lineHeight: 1.6 }}>
            <li style={{ marginBottom: "8px" }}>Expand gold standard dataset (100+ double-coded conversations for formal ICC).</li>
            <li style={{ marginBottom: "8px" }}>Reintegrate SHARE framework for shared decision-making constructs.</li>
            <li style={{ marginBottom: "8px" }}>Conduct the feedback UX study: how physicians interpret probability-based formative feedback.</li>
            <li style={{ marginBottom: "8px" }}>Run bias audit across demographics, cultural backgrounds, and data sources.</li>
          </ol>

          <h3 style={{ color: "#8b69fa", fontWeight: 800, marginTop: "48px" }}>Presentation Guide</h3>
          <h4 style={{ fontSize: "16px", fontWeight: 700, margin: "16px 0 8px 0" }}>Three-Sentence Opening</h4>
          <p style={{ fontStyle: "italic", background: "rgba(139, 105, 250, 0.02)", padding: "16px", borderRadius: "8px", borderLeft: "4px solid #8b69fa" }}>
            &quot;This project sits at the intersection of measurement design and NLP. ABIM certifies thousands of physicians every year on their medical knowledge: but the communication competencies that matter just as much to patient outcomes are almost never measured objectively at scale. I spent six months designing and building the measurement infrastructure that could change that.&quot;
          </p>

          <h4 style={{ fontSize: "16px", fontWeight: 700, margin: "24px 0 8px 0" }}>Answers to the Hardest Interview Questions</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "16px" }}>
            <div>
              <strong style={{ display: "block", color: "var(--color-text)", fontSize: "15px" }}>Q: &quot;Is this UX research or data science?&quot;</strong>
              <p style={{ margin: "4px 0 0 0", color: "var(--color-text-secondary)", fontSize: "14px", lineHeight: 1.5 }}>
                &quot;It is both: but the UXR framing is the right primary one. The core deliverable is a measurement instrument: 11 rubrics that operationalize what good physician communication looks like in observable, text-detectable terms. Instrument design is UX research work. The classifier is the delivery mechanism.&quot;
              </p>
            </div>
            <div>
              <strong style={{ display: "block", color: "var(--color-text)", fontSize: "15px" }}>Q: &quot;What is your specific contribution?&quot;</strong>
              <p style={{ margin: "4px 0 0 0", color: "var(--color-text-secondary)", fontSize: "14px", lineHeight: 1.5 }}>
                &quot;Data pipeline and label architecture. I owned dataset composition, labeling strategy, the label schema design, and the simulated-to-real pivot rationale. My contribution was everything between: turning validated rubrics into a scalable labeling infrastructure.&quot;
              </p>
            </div>
            <div>
              <strong style={{ display: "block", color: "var(--color-text)", fontSize: "15px" }}>Q: &quot;Why LLMs as annotators? Aren&apos;t they unreliable?&quot;</strong>
              <p style={{ margin: "4px 0 0 0", color: "var(--color-text-secondary)", fontSize: "14px", lineHeight: 1.5 }}>
                &quot;LLMs as annotators produce silver-grade labels, not gold. The rubric-grounded prompts constrain the LLM&apos;s interpretation space, which improves reliability. We validated against seed labels and ran IRR to quantify the gap. The pipeline doesn&apos;t trust LLM labels blindly: it routes low-confidence labels for human review.&quot;
              </p>
            </div>
            <div>
              <strong style={{ display: "block", color: "var(--color-text)", fontSize: "15px" }}>Q: &quot;What metrics did you use to evaluate the pipeline?&quot;</strong>
              <p style={{ margin: "4px 0 0 0", color: "var(--color-text-secondary)", fontSize: "14px", lineHeight: 1.5 }}>
                &quot;Per-construct Precision, Recall, and F1: not aggregate accuracy, which is misleading for sparse, imbalanced labels. Macro-F1 as the headline metric. Cohen&apos;s &kappa; for inter-rater reliability between LLM and human graders. Expected Calibration Error and Brier Score for confidence calibration: because in a formative feedback system, knowing when the model is uncertain is as important as when it is right.&quot;
              </p>
            </div>
          </div>

          <h4 style={{ fontSize: "16px", fontWeight: 700, margin: "24px 0 8px 0" }}>Closing Line</h4>
          <p style={{ fontStyle: "italic", background: "rgba(139, 105, 250, 0.02)", padding: "16px", borderRadius: "8px", borderLeft: "4px solid #8b69fa" }}>
            &quot;The rubric IS the product, not the classifier.&quot;
          </p>
        </CaseStudySection>
      </CaseStudyLayout>
    </main>
  );
}
