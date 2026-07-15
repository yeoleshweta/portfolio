"use client";

import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import { CaseStudySection, Blockquote } from "@/components/casestudy/CaseStudyContent";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "01 · The Problem" },
  { id: "analysis", label: "02 · The Analysis" },
  { id: "decision", label: "03 · The Decision" },
  { id: "execution", label: "04 · The Execution" },
  { id: "impact", label: "05 · The Impact" },
];

function VariantSelector() {
  const [activeVariant, setActiveVariant] = React.useState("D");

  const variants = {
    A: {
      title: "Variant A (Control)",
      desc: "Original Topshop header search. Minimal contrast, plain text input without a clear boundary. Underperformed in discoverability and engagement.",
      border: "none",
      placeholder: "type here",
      placeholderColor: "#b5b0a3",
      isWinner: false
    },
    B: {
      title: "Variant B (Visual Affordance)",
      desc: "Added a clean, solid border around the search input. Solved the discoverability issue by signaling a clear interactive field boundary.",
      border: "1px solid var(--color-text)",
      placeholder: "type here",
      placeholderColor: "#b5b0a3",
      isWinner: false
    },
    C: {
      title: "Variant C (Affordance Copy)",
      desc: "Updated the placeholder text from 'type here' to a more action-oriented prompt. Increased discoverability slightly by clarifying intent.",
      border: "none",
      placeholder: "Search products...",
      placeholderColor: "var(--color-text-secondary)",
      isWinner: false
    },
    D: {
      title: "Variant D (Combined Treatment)",
      desc: "Combined the solid border with the updated 'Search products...' action placeholder. This winning treatment resolved both discoverability and copy affordance issues.",
      border: "1px solid var(--color-accent)",
      placeholder: "Search products...",
      placeholderColor: "var(--color-text-secondary)",
      isWinner: true
    }
  };

  const v = variants[activeVariant as keyof typeof variants];

  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "40px", borderRadius: "16px", margin: "32px 0" }}>
      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--color-border)", marginBottom: "32px", overflowX: "auto", paddingBottom: "12px" }}>
        {Object.keys(variants).map((key) => (
          <button
            key={key}
            onClick={() => setActiveVariant(key)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: activeVariant === key ? "1px solid var(--color-text)" : "1px solid transparent",
              background: activeVariant === key ? "var(--color-text)" : "transparent",
              color: activeVariant === key ? "var(--color-surface)" : "var(--color-text-secondary)",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Variant {key}
          </button>
        ))}
      </div>

      {/* Mock Browser/Header Preview */}
      <div style={{ background: "var(--color-bg)", borderRadius: "12px", border: "1px solid var(--color-border)", overflow: "hidden", marginBottom: "24px" }}>
        {/* Browser Top Bar */}
        <div style={{ background: "rgba(0,0,0,0.03)", padding: "10px 16px", display: "flex", gap: "6px", borderBottom: "1px solid var(--color-border)" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ff5f56" }} />
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#27c93f" }} />
        </div>

        {/* Mock Site Header */}
        <div style={{ background: "#ffffff", padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "80px", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "16px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text)" }}>RETAILER</div>
          
          {/* Search Field */}
          <div style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 14px",
            background: "#fff",
            borderRadius: "4px",
            border: v.border === "none" ? "none" : v.border,
            width: "300px",
            justifyContent: "space-between",
            transition: "all 0.3s ease",
            boxShadow: v.border === "none" ? "none" : "0 2px 8px rgba(0,0,0,0.02)"
          }}>
            <span style={{ fontSize: "13.5px", color: v.placeholderColor, transition: "all 0.3s ease" }}>{v.placeholder}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={v.placeholderColor} strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>
      </div>

      {/* Variant Details */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <h4 style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>{v.title}</h4>
          {v.isWinner && (
            <span style={{ background: "rgba(139, 105, 250, 0.15)", color: "var(--color-accent)", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              WINNER · +5.8% CONVERSION LIFT
            </span>
          )}
        </div>
        <p style={{ marginTop: "12px", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
          {v.desc}
        </p>
      </div>

      <div style={{ fontSize: "12.5px", color: "var(--color-text-secondary)", fontStyle: "italic", marginTop: "24px", borderTop: "1px solid var(--color-border)", paddingTop: "16px" }}>
        Illustrative reconstruction of the test cells — not actual Topshop UI. Traffic split evenly across all cells; run to statistical significance before rollout.
      </div>
    </div>
  );
}

export default function TopshopCaseStudy() {
  return (
    <main>
      <CaseStudyHero
        title="What Analytics Couldn't Tell Us: Pairing Exit Intercepts with Behavioral Data at Topshop"
        category="Quantitative UX Research · Feedback-Driven Optimization"
        role="Analyst / Optimization Specialist"
        team="Qubit · Topshop"
        timeline="A/B/n Testing Cycle"
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
            How intercept survey feedback and behavioral analytics were triangulated to find a hidden conversion lever — and how a four-variant experiment turned it into measurable revenue.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
            background: "var(--color-surface)",
            padding: "32px",
            borderRadius: "16px",
            border: "1px solid var(--color-border)",
            margin: "32px 0"
          }}>
            <div>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 700, letterSpacing: "0.05em" }}>Role</span>
              <p style={{ margin: "4px 0 0 0", fontWeight: 600, fontSize: "15px" }}>Analyst / Optimization Specialist</p>
            </div>
            <div>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 700, letterSpacing: "0.05em" }}>Team</span>
              <p style={{ margin: "4px 0 0 0", fontWeight: 600, fontSize: "15px" }}>Qubit · Topshop</p>
            </div>
            <div>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 700, letterSpacing: "0.05em" }}>Methods</span>
              <p style={{ margin: "4px 0 0 0", fontWeight: 600, fontSize: "15px" }}>Exit Intercepts · Funnel analysis · A/B/n testing</p>
            </div>
            <div>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 700, letterSpacing: "0.05em" }}>Outcome</span>
              <p style={{ margin: "4px 0 0 0", fontWeight: 600, fontSize: "15px", color: "var(--color-accent)" }}>+5.8% conversion uplift</p>
            </div>
          </div>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 01 · THE PROBLEM                    */}
        {/* ============================================ */}
        <CaseStudySection
          id="problem"
          heading="01 · The Problem"
        >
          <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>Numbers tell you the scale of a problem. Feedback tells you how to deal with it.</h3>
          <p>
            Topshop&apos;s search bar sat on every user&apos;s path to purchase — but it was underperforming. We knew something was wrong from the behavioral data alone: search adoption was low relative to comparable retailers, and sessions that never touched search converted at a fraction of those that did.
          </p>
          <p style={{ marginTop: "16px" }}>
            What the quantitative data couldn&apos;t tell us was why. Was it discoverability? Usability? Result quality? Pushing a sitewide redesign on a guess would have burned IT resources on an unvalidated hypothesis. We needed the user&apos;s voice before touching the interface.
          </p>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 02 · THE ANALYSIS                   */}
        {/* ============================================ */}
        <CaseStudySection
          id="analysis"
          heading="02 · The Analysis"
        >
          <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>Triangulating intercept feedback with behavioral data</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", margin: "24px 0" }}>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px" }}>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 700, letterSpacing: "0.05em" }}>Qualitative Signal — Exit Intercepts</span>
              <p style={{ margin: "14px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                Using Qubit&apos;s Visitor Opinion exit-feedback tool — an on-site intercept survey triggered as users left — we captured open-ended feedback at the moment of abandonment. A recurring theme emerged: <strong>users struggled to both find and use the search bar</strong>. It read as a low-contrast text element with no visual affordance signaling &quot;type here&quot;.
              </p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px" }}>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 700, letterSpacing: "0.05em" }}>Quantitative Signal — Analytics</span>
              <p style={{ margin: "14px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                Qubit&apos;s behavioral analytics quantified the stakes: visitors who used search converted <strong>roughly 10× higher</strong> than those who didn&apos;t. Search wasn&apos;t a convenience feature — it was the single highest-intent behavior on the site, and friction there was directly suppressing revenue.
              </p>
            </div>
          </div>

          <Blockquote text="The intercept feedback gave us the diagnostic; the analytics gave us the business case. Neither alone would have justified the work — together they made it the obvious next test." />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 03 · THE DECISION                   */}
        {/* ============================================ */}
        <CaseStudySection
          id="decision"
          heading="03 · The Decision"
        >
          <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>Test the hypotheses — don&apos;t ship the guess</h3>
          <p>
            The feedback pointed at two candidate fixes: <strong>visibility</strong> (the field didn&apos;t look like an input) and <strong>affordance copy</strong> (the placeholder didn&apos;t invite action). Rather than allocating expensive IT resources to push a full sitewide change based on either hypothesis, we designed four search variations testing both dimensions — changes in copy, and the addition of a border to the search box.
          </p>
          <p style={{ marginTop: "16px" }}>
            The test was split evenly across all users, with the existing design as control, so any change would carry statistical evidence into the IT prioritization conversation — not opinion.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "32px" }}>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "var(--color-accent)", fontWeight: 700 }}>H1</span>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", fontWeight: 600 }}>Visual affordance ➔ border</p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "var(--color-accent)", fontWeight: 700 }}>H2</span>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", fontWeight: 600 }}>Invitation ➔ copy change</p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "var(--color-accent)", fontWeight: 700 }}>H3</span>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", fontWeight: 600 }}>Combined effect</p>
            </div>
          </div>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 04 · THE EXECUTION                  */}
        {/* ============================================ */}
        <CaseStudySection
          id="execution"
          heading="04 · The Execution"
        >
          <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>Four variants, one control, evenly split</h3>
          <p>
            Explore the test cells below. Each variant isolates or combines the two hypotheses so the winning treatment could be attributed to a specific mechanism, not just &quot;the new one&quot;.
          </p>

          <VariantSelector />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 05 · THE IMPACT                     */}
        {/* ============================================ */}
        <CaseStudySection
          id="impact"
          heading="05 · The Impact"
        >
          <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>Evidence, not opinion, went to the roadmap</h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", margin: "24px 0" }}>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid var(--color-accent)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "var(--color-accent)" }}>+5.8%</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)" }}>conversion uplift from the winning search design.</p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid var(--color-accent)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "var(--color-accent)" }}>10x</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)" }}>higher conversion rate for search users — the metric that prioritized the work.</p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid var(--color-accent)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "var(--color-accent)" }}>9–11%</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)" }}>cumulative uplift once the same feedback method was applied to product pages.</p>
            </div>
          </div>

          <p>
            The winning variant shipped sitewide with a quantified business case attached. Just as importantly, the method stuck: the same intercept-feedback ➔ hypothesis ➔ controlled-test loop was applied to a series of product-page micro-changes — size selectors, delivery tabs, confirmation popups, add-to-bag buttons — which together added between 9 and 11% uplift in conversion rate, without committing IT resources to anything unproven.
          </p>

          <div style={{ borderTop: "2px solid var(--color-text)", marginTop: "48px", paddingTop: "40px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>What this project taught me</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Intercepts earn their place at the moment of intent</h4>
                <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)" }}>
                  Intercept feedback captured intent, not general attitude. Targeting logic — who sees the survey, when, and how often — determined whether the signal was usable at all.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Triangulation is what makes feedback actionable</h4>
                <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)" }}>
                  Qualitative feedback without behavioral data is a mystery. Joining them turned a vague complaint into a prioritized, sized, testable hypothesis.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Small tests protect big resources</h4>
                <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)" }}>
                  The business case required to settle an argument should always run before engineering commits. Evidence travels further with stakeholders than any deck of opinions.
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "64px",
              padding: "24px",
              background: "rgba(0,0,0,0.015)",
              borderRadius: "8px",
              border: "1px solid var(--color-border)",
              fontSize: "13px",
              color: "var(--color-text-secondary)",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            Case study conducted with Qubit for Arcadia Group. Metrics as publicly reported.
          </div>
        </CaseStudySection>
      </CaseStudyLayout>
    </main>
  );
}
