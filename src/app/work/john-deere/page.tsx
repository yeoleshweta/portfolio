"use client";

import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import { CaseStudySection, Blockquote } from "@/components/casestudy/CaseStudyContent";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "background", label: "Background" },
  { id: "problem", label: "01: The Research Problem" },
  { id: "design", label: "02: Study Design" },
  { id: "results", label: "03: Results" },
  { id: "qualitative", label: "04: Qualitative Findings" },
  { id: "org-context", label: "05: Organizational Context" },
  { id: "impact", label: "06: Impact" },
];

function StatStrip() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", borderTop: "2px solid var(--color-text)", borderBottom: "1px solid var(--color-border)", margin: "32px 0" }}>
      <div style={{ padding: "28px 24px 32px 0", borderRight: "1px solid var(--color-border)" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, letterSpacing: "-0.02em" }}>60 → 85.6</div>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-secondary)", marginTop: "8px" }}>SUS, before → after</div>
      </div>
      <div style={{ padding: "28px 24px 32px 24px", borderRight: "1px solid var(--color-border)" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--color-accent)" }}>+35 pts</div>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-secondary)", marginTop: "8px" }}>System Performance gain</div>
      </div>
      <div style={{ padding: "28px 24px 32px 24px", borderRight: "1px solid var(--color-border)" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, letterSpacing: "-0.02em" }}>6</div>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-secondary)", marginTop: "8px" }}>Dimensions measured</div>
      </div>
      <div style={{ padding: "28px 0 32px 24px" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, letterSpacing: "-0.02em" }}>35</div>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-secondary)", marginTop: "8px" }}>Issues surfaced</div>
      </div>
    </div>
  );
}

function TimelineVisual() {
  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "48px", borderRadius: "16px", margin: "32px 0" }}>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Fig. 1: Study timeline, January to August 2021</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "32px" }}>
        <div>Jan</div><div>Feb</div><div>Mar</div><div>Apr</div><div>May</div><div>Jun</div><div>Jul</div><div>Aug</div>
      </div>
      <div style={{ height: "12px", marginTop: "12px", background: "var(--color-bg)", borderRadius: "6px", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, width: "12.5%", top: 0, bottom: 0, background: "var(--color-text)" }}></div>
        <div style={{ position: "absolute", left: "50%", width: "25%", top: 0, bottom: 0, background: "repeating-linear-gradient(-45deg, rgba(139, 105, 250, 0.3) 0 6px, rgba(139, 105, 250, 0.1) 6px 12px)" }}></div>
        <div style={{ position: "absolute", left: "87.5%", width: "12.5%", top: 0, bottom: 0, background: "var(--color-accent)" }}></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", marginTop: "28px" }}>
        <div>
          <div style={{ width: "12px", height: "12px", background: "var(--color-text)", marginBottom: "12px", borderRadius: "2px" }}></div>
          <div style={{ fontWeight: 600, fontSize: "15px" }}>Baseline evaluation</div>
          <div style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginTop: "6px", lineHeight: "1.4" }}>Structured interviews + SUS + questionnaire on <em>previous</em> ABTools.</div>
        </div>
        <div>
          <div style={{ width: "12px", height: "12px", background: "rgba(139, 105, 250, 0.5)", marginBottom: "12px", borderRadius: "2px" }}></div>
          <div style={{ fontWeight: 600, fontSize: "15px" }}>Familiarization</div>
          <div style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginTop: "6px", lineHeight: "1.4" }}>Participants use new ABTools in their actual jobs. Novelty dissipates.</div>
        </div>
        <div>
          <div style={{ width: "12px", height: "12px", background: "var(--color-accent)", marginBottom: "12px", borderRadius: "2px" }}></div>
          <div style={{ fontWeight: 600, fontSize: "15px" }}>Post evaluation</div>
          <div style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginTop: "6px", lineHeight: "1.4" }}>Identical instruments administered on <em>current</em> ABTools.</div>
        </div>
      </div>
    </div>
  );
}

function ParticipantVisual() {
  const participants = [
    { name: "Senior Credit Analyst", time: "4 to 6 hrs / day", exp: "3.5 yrs experience", fill: 18 },
    { name: "Credit Analyst", time: "Full day", exp: "10+ yrs experience", fill: 50 },
    { name: "Credit Processing Specialist", time: "2 to 3 hrs / day", exp: "15+ yrs experience", fill: 75 },
    { name: "Manager, Retail Credit Delivery", time: "2 to 4 hrs / day", exp: "20+ yrs experience", fill: 100 },
  ];

  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "48px", borderRadius: "16px", margin: "32px 0" }}>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Fig. 2: Participants: 4 power users, within subject</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", marginTop: "28px" }}>
        {participants.map((p, i) => (
          <div key={i} style={{ borderTop: "2px solid var(--color-text)", paddingTop: "16px" }}>
            <div style={{ fontWeight: 600, fontSize: "15px" }}>{p.name}</div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "10px" }}>{p.time}</div>
            <div style={{ height: "8px", background: "var(--color-bg)", marginTop: "14px", position: "relative", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, background: "var(--color-accent)", width: `${p.fill}%` }}></div>
            </div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "13px", marginTop: "8px" }}>{p.exp}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginTop: "28px", maxWidth: "720px", lineHeight: "1.6" }}>
        For these users, usability friction has a direct, calculable productivity cost. A 15 minute delay in credit decision making compounds across hundreds of daily applications.
      </div>
    </div>
  );
}

function SUSHero() {
  return (
    <div style={{ background: "var(--color-text)", color: "var(--color-surface)", padding: "56px", borderRadius: "24px", margin: "32px 0" }}>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>Fig. 3: System Usability Scale, previous vs. current ABTools</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "24px", marginTop: "28px", flexWrap: "wrap" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "96px", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", color: "rgba(255,255,255,0.5)" }}>60</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "56px", color: "rgba(255,255,255,0.3)" }}>→</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "96px", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", color: "var(--color-lilac)" }}>85.6</div>
        <div style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", maxWidth: "300px", lineHeight: "1.5" }}>
          +25.6 points. From below the global IT average to firmly in &quot;excellent&quot; territory.
        </div>
      </div>

      <div style={{ position: "relative", height: "8px", background: "rgba(255,255,255,0.1)", marginTop: "72px", borderRadius: "4px" }}>
        <div style={{ position: "absolute", left: "20%", width: "51.2%", top: 0, bottom: 0, background: "linear-gradient(90deg, rgba(255,255,255,0.3), var(--color-accent))", borderRadius: "4px" }}></div>
        {/* Markers */}
        <div style={{ position: "absolute", left: "20%", top: "-16px", bottom: "-16px", width: "2px", background: "rgba(255,255,255,0.8)" }}></div>
        <div style={{ position: "absolute", left: "20%", transform: "translateX(-50%)", fontFamily: "JetBrains Mono, monospace", fontSize: "13px", color: "rgba(255,255,255,0.9)", whiteSpace: "nowrap", top: "-48px" }}>Previous · 60</div>

        <div style={{ position: "absolute", left: "26%", top: "-8px", bottom: "-8px", width: "1px", background: "rgba(255,255,255,0.4)" }}></div>
        <div style={{ position: "absolute", left: "26%", transform: "translateX(-50%)", fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "rgba(255,255,255,0.6)", whiteSpace: "nowrap", top: "20px" }}>Global IT · 63</div>

        <div style={{ position: "absolute", left: "34%", top: "-8px", bottom: "-8px", width: "1px", background: "rgba(255,255,255,0.4)" }}></div>
        <div style={{ position: "absolute", left: "34%", transform: "translateX(-50%)", fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "rgba(255,255,255,0.6)", whiteSpace: "nowrap", top: "44px" }}>FY21 target · 67</div>

        <div style={{ position: "absolute", left: "36%", top: "-8px", bottom: "-8px", width: "1px", background: "rgba(255,255,255,0.4)" }}></div>
        <div style={{ position: "absolute", left: "36%", transform: "translateX(-50%)", fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "rgba(255,255,255,0.6)", whiteSpace: "nowrap", top: "-36px" }}>Industry · 68</div>

        <div style={{ position: "absolute", left: "60%", top: "-8px", bottom: "-8px", width: "1px", background: "rgba(255,255,255,0.4)" }}></div>
        <div style={{ position: "absolute", left: "60%", transform: "translateX(-50%)", fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "rgba(255,255,255,0.6)", whiteSpace: "nowrap", top: "20px" }}>&quot;Excellent&quot; · 80</div>

        <div style={{ position: "absolute", left: "71.2%", top: "-18px", bottom: "-18px", width: "3px", background: "var(--color-lilac)" }}></div>
        <div style={{ position: "absolute", left: "71.2%", transform: "translateX(-50%)", fontFamily: "JetBrains Mono, monospace", fontSize: "13px", color: "var(--color-lilac)", fontWeight: 700, whiteSpace: "nowrap", top: "-50px" }}>Current · 85.6</div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "56px" }}>
        <span>50</span><span>60</span><span>70</span><span>80</span><span>90</span><span>100</span>
      </div>
    </div>
  );
}

function DumbbellChart() {
  const dimensions = [
    { name: "System Performance", before: 62.5, after: 97.5, delta: "+35 pts" },
    { name: "Human Error Support", before: 56.6, after: 75.0, delta: "+18.4 pts" },
    { name: "Ease of Use", before: 75.0, after: 88.7, delta: "+13.7 pts" },
    { name: "Learnability", before: 80.0, after: 92.5, delta: "+12.5 pts" },
    { name: "Productivity", before: 71.2, after: 82.5, delta: "+11.3 pts" },
    { name: "Satisfaction", before: 71.2, after: 75.0, delta: "+3.8 pts" },
  ];

  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "48px", borderRadius: "16px", margin: "32px 0" }}>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Fig. 4: All six dimensions improved · % favorable, before → after</div>

      <div style={{ marginTop: "32px", display: "flex", flexDirection: "column" }}>
        {dimensions.map((d, i) => {
          const leftPercent = ((d.before - 50) / 50) * 100;
          const widthPercent = ((d.after - d.before) / 50) * 100;
          const rightPercent = ((d.after - 50) / 50) * 100;

          return (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "220px 1fr 90px", gap: "24px", alignItems: "center", padding: "18px 0", borderBottom: i < dimensions.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
              <div style={{ fontWeight: 600, fontSize: "15px", textAlign: "right" }}>{d.name}</div>
              <div style={{ position: "relative", height: "28px" }}>
                <div style={{ position: "absolute", left: 0, right: 0, top: "13px", height: "2px", background: "var(--color-bg)" }}></div>
                <div style={{ position: "absolute", top: "13px", height: "2px", background: "var(--color-accent)", left: `${leftPercent}%`, width: `${widthPercent}%` }}></div>
                <div style={{ position: "absolute", top: "8px", width: "12px", height: "12px", borderRadius: "50%", background: "#FFFFFF", border: "2px solid var(--color-text-secondary)", transform: "translateX(-50%)", left: `${leftPercent}%` }}></div>
                <div style={{ position: "absolute", top: "7px", width: "14px", height: "14px", borderRadius: "50%", background: "var(--color-accent)", transform: "translateX(-50%)", left: `${rightPercent}%` }}></div>
                <div style={{ position: "absolute", transform: "translateX(-50%)", fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "var(--color-text-secondary)", left: `${leftPercent}%`, top: "26px" }}>{d.before}%</div>
                <div style={{ position: "absolute", top: "-14px", transform: "translateX(-50%)", fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "var(--color-accent)", fontWeight: 700, left: `${rightPercent}%` }}>{d.after}%</div>
              </div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "14px", fontWeight: 700, color: "var(--color-accent)", paddingLeft: "12px" }}>{d.delta}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: "28px", marginTop: "24px", fontSize: "13px", color: "var(--color-text-secondary)", alignItems: "center" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FFFFFF", border: "2px solid var(--color-text-secondary)" }}></span> Previous ABTools
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "14px", height: "14px", borderRadius: "50%", background: "var(--color-accent)" }}></span> Current ABTools
        </span>
        <span style={{ marginLeft: "auto", fontFamily: "JetBrains Mono, monospace", fontSize: "12px" }}>Scale: 50 to 100% favorable</span>
      </div>
    </div>
  );
}

function VerbatimsComparison() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", margin: "24px 0" }}>
      <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "40px", borderRadius: "16px" }}>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-text-secondary)" }}>Before: previous ABTools</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "24px" }}>
          <div style={{ fontFamily: "var(--font-primary)", fontSize: "18px", fontStyle: "italic", lineHeight: "1.5", color: "var(--color-text)" }}>&quot;It times out if you&apos;re not active for an hour.&quot;</div>
          <div style={{ fontFamily: "var(--font-primary)", fontSize: "18px", fontStyle: "italic", lineHeight: "1.5", color: "var(--color-text)" }}>&quot;Cryptic error messages. The system just self closes.&quot;</div>
          <div style={{ fontFamily: "var(--font-primary)", fontSize: "18px", fontStyle: "italic", lineHeight: "1.5", color: "var(--color-text)" }}>&quot;VPN conflicts constantly.&quot;</div>
        </div>
      </div>
      <div style={{ background: "var(--color-text)", color: "var(--color-surface)", padding: "40px", borderRadius: "16px" }}>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>After: current ABTools</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "24px" }}>
          <div style={{ fontFamily: "var(--font-primary)", fontSize: "18px", fontStyle: "italic", lineHeight: "1.5", color: "var(--color-surface)" }}>&quot;Consistent speed, always available when I need it.&quot;</div>
          <div style={{ fontFamily: "var(--font-primary)", fontSize: "18px", fontStyle: "italic", lineHeight: "1.5", color: "var(--color-surface)" }}>&quot;It hasn&apos;t been down, and it&apos;s quicker than the old ABTools.&quot;</div>
        </div>
      </div>
    </div>
  );
}

function ThemesBarChart() {
  const themes = [
    { name: "Notes feature", desc: "Every participant mentioned it", value: 16, max: 16, primary: true },
    { name: "Usability", desc: "Zoom, overlay dismiss, worklist nav", value: 6, max: 16 },
    { name: "Efficiency", desc: "Name search, modals, routing workarounds", value: 5, max: 16 },
    { name: "New feature requests", desc: "Auto refresh, pin to top, Excel export", value: 5, max: 16 },
  ];

  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "48px", borderRadius: "16px", margin: "32px 0" }}>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Fig. 5: Issues surfaced by theme (thematic analysis, N=35 issues)</div>

      <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
        {themes.map((t, i) => {
          const widthPct = (t.value / t.max) * 100;
          return (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "24px", alignItems: "center" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 600, fontSize: "15px" }}>{t.name}</div>
                <div style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>{t.desc}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", flexGrow: 1 }}>
                <div style={{ height: "36px", background: t.primary ? "var(--color-accent)" : "rgba(139, 105, 250, 0.2)", width: `${widthPct}%`, borderRadius: "4px" }}></div>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "15px", fontWeight: t.primary ? 700 : 400 }}>{t.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ borderTop: "1px solid var(--color-border)", marginTop: "36px", paddingTop: "28px", display: "grid", gridTemplateColumns: "auto 1fr", gap: "24px", alignItems: "start" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "52px", fontWeight: 700, color: "var(--color-accent)", lineHeight: 1 }}>
          16 <span style={{ fontSize: "20px", color: "var(--color-text-secondary)", fontWeight: 400 }}> mentions</span>
        </div>
        <div style={{ fontSize: "15px", color: "var(--color-text-secondary)", maxWidth: "640px", lineHeight: "1.6" }}>
          <strong style={{ fontWeight: 600, color: "var(--color-text)" }}>The Notes feature is the single most important finding of the study.</strong> A finding that does not show up in a quant survey. It takes depth, the right users, and enough session time for them to articulate precisely what frustrates them.
        </div>
      </div>
    </div>
  );
}

function EngagementSurveyGrid() {
  const metrics = [
    { value: "87.5%", desc: "had collaborated with a UX practitioner (35/40)" },
    { value: "67.5%", desc: "\"Very satisfied\" with JDF UX support (27/40)" },
    { value: "33/40", desc: "top benefit: \"UX helps me work with a user centered mindset\"" },
    { value: "22/40", desc: "\"more dedicated UX resources\" as top request" },
  ];

  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "48px", borderRadius: "16px", margin: "32px 0" }}>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Fig. 6: JDF UX engagement survey, N=40 product team members, June to July 2021</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", marginTop: "32px" }}>
        {metrics.map((m, i) => {
          let fillPct = 100;
          if (m.value.includes("%")) {
            fillPct = parseFloat(m.value);
          } else if (m.value.includes("/")) {
            const [num, den] = m.value.split("/").map(Number);
            fillPct = (num / den) * 100;
          }

          return (
            <div key={i}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 700, lineHeight: 1 }}>{m.value}</div>
              <div style={{ height: "8px", background: "var(--color-bg)", marginTop: "16px", position: "relative", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, background: "var(--color-accent)", width: `${fillPct}%` }}></div>
              </div>
              <div style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginTop: "12px", lineHeight: "1.5" }}>{m.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ImpactCards() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", margin: "32px 0" }}>
      <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderTop: "3px solid var(--color-accent)", padding: "32px", borderRadius: "8px" }}>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 600 }}>Validated the investment</div>
        <div style={{ marginTop: "14px", fontSize: "15px", lineHeight: "1.6", color: "var(--color-text-secondary)" }}>
          Evidence based confirmation the redesign worked. Measured improvement across every dimension, SUS from below average to excellent.
        </div>
      </div>
      <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderTop: "3px solid var(--color-accent)", padding: "32px", borderRadius: "8px" }}>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 600 }}>Directed what comes next</div>
        <div style={{ marginTop: "14px", fontSize: "15px", lineHeight: "1.6", color: "var(--color-text-secondary)" }}>
          The Notes issue entered the backlog with specificity: the exact workflow, the exact cognitive load problem, the exact fix.
        </div>
      </div>
      <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderTop: "3px solid var(--color-accent)", padding: "32px", borderRadius: "8px" }}>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 600 }}>Shifted the model</div>
        <div style={{ marginTop: "14px", fontSize: "15px", lineHeight: "1.6", color: "var(--color-text-secondary)" }}>
          Three structural recommendations: an ongoing feedback loop, passive behavioral analytics, and proactive research ahead of releases.
        </div>
      </div>
    </div>
  );
}

export default function JohnDeereCaseStudy() {
  return (
    <main>
      <CaseStudyHero
        title="When did 'better' actually mean better?"
        category="Quantitative UX Research · Longitudinal Study · Within Subject Design"
        role="UX Researcher"
        team="UX Researcher (Self), Embedded Product Team"
        timeline="8 Months"
      />

      <CaseStudyLayout sections={sections}>
        {/* ============================================ */}
        {/* SECTION: OVERVIEW                            */}
        {/* ============================================ */}
        <CaseStudySection
          id="overview"
          heading="Overview"
        >
          <p>
            John Deere Financial was migrating ABTools, its core credit processing system, from a legacy desktop application to a modern web platform. Credit analysts used it 2 to 6 hours a day. Some had been using the old version for 20 years. The team needed more than &quot;it looks cleaner.&quot; They needed evidence.
          </p>
          <p style={{ marginTop: "16px" }}>
            I designed and ran an 8 month longitudinal study to answer two questions: did the redesign genuinely improve usability, and where should the team focus next?
          </p>

          <StatStrip />

          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", marginTop: "20px", fontSize: "14px", color: "var(--color-text-secondary)" }}>
            <div><strong>Organization</strong>&nbsp;&nbsp;John Deere Financial (JDF)</div>
            <div><strong>Role</strong>&nbsp;&nbsp;UX Researcher</div>
            <div><strong>Timeline</strong>&nbsp;&nbsp;Jan to Aug 2021 · 8 months</div>
            <div><strong>Methods</strong>&nbsp;&nbsp;SUS · Likert questionnaire · Verbatims</div>
            <div><strong>Participants</strong>&nbsp;&nbsp;4 power users · 3.5 to 20 yrs experience</div>
          </div>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: BACKGROUND                          */}
        {/* ============================================ */}
        <CaseStudySection
          id="background"
          heading="Background"
        >
          <p>
            Credit decisions at John Deere Financial are not slow, deliberate processes. Analysts process hundreds of applications a day. Every extra click, every session timeout, every moment spent decoding a cryptic error message compounds across users, teams, and quarters.
          </p>
          <p style={{ marginTop: "16px" }}>
            ABTools sits at the center of all of it. These were users with 15 to 20 years of muscle memory in the old system. A redesign that looked cleaner but disrupted deep workflow patterns would be worse, not better.
          </p>
          <p style={{ marginTop: "16px" }}>
            The business was confident the new product was an improvement. But before the team could stand behind the redesign in front of leadership, in roadmap decisions, and in backlog prioritization, they needed data. That is what this study was built to produce.
          </p>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 01: THE RESEARCH PROBLEM            */}
        {/* ============================================ */}
        <CaseStudySection
          id="problem"
          heading="01: The Research Problem"
        >
          <p>
            A generic post launch survey would not work. Satisfaction ratings taken immediately after a migration absorb novelty bias, familiarity loss, and genuine usability change all at once, making it impossible to isolate what improved and what did not.
          </p>
          <p style={{ marginTop: "16px" }}>
            When users have 20 years of muscle memory, evaluating them on day one of a migration tells you about the learning curve, not the product. That is the central methodological challenge of any post migration evaluation. A one shot study cannot answer it. A longitudinal study with a deliberate familiarization window can.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginTop: "36px" }}>
            <div style={{ borderTop: "2px solid var(--color-text)", paddingTop: "16px" }}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", letterSpacing: "0.15em", color: "var(--color-text-secondary)" }}>RQ 1</div>
              <div style={{ fontWeight: 600, marginTop: "8px", fontSize: "15px" }}>Did the redesign improve usability across the six measured dimensions?</div>
            </div>
            <div style={{ borderTop: "2px solid var(--color-text)", paddingTop: "16px" }}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", letterSpacing: "0.15em", color: "var(--color-text-secondary)" }}>RQ 2</div>
              <div style={{ fontWeight: 600, marginTop: "8px", fontSize: "15px" }}>Which dimensions improved most, and what drove those gains?</div>
            </div>
            <div style={{ borderTop: "2px solid var(--color-text)", paddingTop: "16px" }}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", letterSpacing: "0.15em", color: "var(--color-text-secondary)" }}>RQ 3</div>
              <div style={{ fontWeight: 600, marginTop: "8px", fontSize: "15px" }}>Where does meaningful friction remain for daily power users?</div>
            </div>
          </div>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 02: STUDY DESIGN                    */}
        {/* ============================================ */}
        <CaseStudySection
          id="design"
          heading="02: Study Design"
        >
          <p>
            <strong>Longitudinal.</strong> A deliberate familiarization gap between the two evaluation points gave participants real working exposure to the new system before evaluating it, dissipating novelty effects so scores reflect genuine usability, not adjustment pain.
          </p>
          <p style={{ marginTop: "16px" }}>
            <strong>Within subject.</strong> The same participants evaluated both systems with the same instruments. Any score change is attributable to the system itself, not to differences in who was asked.
          </p>

          <TimelineVisual />

          <h3 style={{ marginTop: "32px", fontSize: "20px", fontWeight: 700 }}>Instruments</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginTop: "24px" }}>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "24px", borderRadius: "12px" }}>
              <div style={{ fontWeight: 600 }}>System Usability Scale</div>
              <div style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginTop: "8px", lineHeight: "1.4" }}>
                Validated 10 item scale, 1,300+ publications. Industry avg 68 · Global IT avg 63 · 80+ is &quot;excellent.&quot;
              </div>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "24px", borderRadius: "12px" }}>
              <div style={{ fontWeight: 600 }}>Custom Likert questionnaire</div>
              <div style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginTop: "8px", lineHeight: "1.4" }}>
                6 sections mapped to research objectives: Satisfaction, Ease of Use, Learnability, System Performance, Human Error Support, Productivity.
              </div>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "24px", borderRadius: "12px" }}>
              <div style={{ fontWeight: 600 }}>Open ended probes</div>
              <div style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginTop: "8px", lineHeight: "1.4" }}>
                Verbatims explain <em>why</em> scores moved. The quant tells how much changed; the qual tells what to do about it.
              </div>
            </div>
          </div>

          <ParticipantVisual />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 03: RESULTS                         */}
        {/* ============================================ */}
        <CaseStudySection
          id="results"
          heading="03: Results"
        >
          <p>
            A 25.6 point SUS gain. The new system cleared every benchmark: industry average, global IT average, and the team&apos;s own FY21 target, all in a single study cycle.
          </p>

          <SUSHero />

          <DumbbellChart />

          <h3 style={{ marginTop: "32px", fontSize: "20px", fontWeight: 700 }}>The System Performance story</h3>
          <p>
            The biggest delta, 35 points, came from System Performance, and the verbatims explain exactly why. Session reliability failures in a mission critical credit system are not minor annoyances. They are workflow breaks with measurable downstream cost. The new system eliminated virtually all of them.
          </p>

          <VerbatimsComparison />

          <h3 style={{ marginTop: "40px", fontSize: "20px", fontWeight: 700 }}>The satisfaction nuance</h3>
          <p>
            The smallest gain, 3.8 points, was in Satisfaction. This is expected, not alarming. With 20 years of muscle memory, emotional familiarity moderates satisfaction even for a system with real usability problems. The new interface removed information fields analysts had referenced for years, creating a temporary dip independent of whether the system is objectively better.
          </p>
          <p style={{ marginTop: "16px" }}>
            The pattern is well documented in longitudinal UXR: objective metrics improve faster than subjective satisfaction scores post migration. Satisfaction catches up as familiarity deepens, especially if the one friction point every participant named gets addressed.
          </p>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 04: QUALITATIVE FINDINGS            */}
        {/* ============================================ */}
        <CaseStudySection
          id="qualitative"
          heading="04: Qualitative Findings"
        >
          <p>
            In the legacy system, analysts could format their comments: spacing, structure, and visual layout. The new system collapses all notes into unformatted paragraphs. For users rapidly scanning application history to make credit decisions, that is real cognitive load. It went directly into the backlog as a high priority item.
          </p>

          <ThemesBarChart />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 05: ORGANIZATIONAL CONTEXT          */}
        {/* ============================================ */}
        <CaseStudySection
          id="org-context"
          heading="05: Organizational Context"
        >
          <p>
            In parallel, the JDF UX team ran a broader engagement survey (N=40) across product team members to assess UX practice health. Where UX was engaged, teams saw success, and the ABTools study was a direct product of that embedded model.
          </p>

          <EngagementSurveyGrid />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 06: IMPACT                          */}
        {/* ============================================ */}
        <CaseStudySection
          id="impact"
          heading="06: Impact"
        >
          <ImpactCards />

          <div style={{ borderTop: "2px solid var(--color-text)", paddingTop: "40px", marginTop: "60px" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "30px", lineHeight: "1.4", fontWeight: 400, letterSpacing: "-0.005em", maxWidth: "780px", color: "var(--color-text)" }}>
              &quot;This study wasn&apos;t designed to show that the redesign worked. It was designed so that if the redesign <em>didn&apos;t</em> work, we&apos;d know.&quot;
            </div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "24px" }}>
              Study conducted at John Deere Financial · January to August 2021
            </div>
          </div>
        </CaseStudySection>
      </CaseStudyLayout>
    </main>
  );
}
