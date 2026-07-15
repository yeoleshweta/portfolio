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
      desc: "Control: The original Topshop header design. No border around the search field, and standard 'Search' placeholder text. Users struggled to identify it as an interactive input.",
      border: "none",
      placeholder: "Search",
      isWinner: false
    },
    B: {
      title: "Variant B (Descriptive Copy Only)",
      desc: "Descriptive copy only: Replaced the standard placeholder with action-oriented copy, but kept the borderless input. While copy helped, the lack of visual boundaries still limited engagement.",
      border: "none",
      placeholder: "Search for items",
      isWinner: false
    },
    C: {
      title: "Variant C (Descriptive Copy + Border)",
      desc: "Descriptive framing: plain-language action copy that clarifies what the field does without adding length. Border adds input affordance.",
      border: "1px solid #1c1b17",
      placeholder: "Search for items",
      isWinner: false
    },
    D: {
      title: "Variant D (Winner — Border + Concise Copy)",
      desc: "Minimal copy with the border treatment: the visible field boundary alone carried the affordance, and concise copy kept the header clean. The winning design — rolled out sitewide after reaching significance.",
      border: "1px solid #1c1b17",
      placeholder: "Search",
      isWinner: true
    }
  };

  const v = variants[activeVariant as keyof typeof variants];

  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "16px", overflow: "hidden", margin: "32px 0", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
      {/* Tabs - Horizontal equal-width columns */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderBottom: "1px solid var(--color-border)", background: "rgba(0,0,0,0.01)" }}>
        {Object.keys(variants).map((key) => {
          const isActive = activeVariant === key;
          return (
            <button
              key={key}
              onClick={() => setActiveVariant(key)}
              style={{
                padding: "20px 8px",
                border: "none",
                borderBottom: isActive ? "3px solid var(--color-text)" : "3px solid transparent",
                background: "transparent",
                color: isActive ? "var(--color-text)" : "var(--color-text-secondary)",
                fontWeight: isActive ? 700 : 500,
                fontSize: "14px",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s ease"
              }}
            >
              Variant {key}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div style={{ padding: "40px" }}>
        {/* Mock Browser/Header Preview */}
        <div style={{ background: "var(--color-bg)", borderRadius: "12px", border: "1px solid var(--color-border)", overflow: "hidden", marginBottom: "32px" }}>
          
          {/* Topshop Utility Bar */}
          <div style={{ background: "#f5f5f3", borderBottom: "1px solid #e3e0d6", padding: "10px 32px", display: "flex", justifyContent: "flex-end", alignItems: "center", fontSize: "11px", fontFamily: "var(--font-primary)", color: "#1c1b17", letterSpacing: "0.05em" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              <span>MY BAG &nbsp;<span style={{ color: "#6e6b60" }}>0 item(s): £0.00</span></span>
            </div>
          </div>

          {/* Topshop Main Header */}
          <div style={{ background: "#ffffff", padding: "20px 32px 14px 32px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", minHeight: "90px", borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
            {/* Logo */}
            <div style={{ fontFamily: "var(--font-primary)", fontWeight: 300, fontSize: "36px", letterSpacing: "0.15em", color: "#1c1b17", lineHeight: 1, paddingBottom: "4px" }}>TOPSHOP</div>
            
            {/* Right Side: Welcome message + Search Bar */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
              <div style={{ fontSize: "11px", color: "#6e6b60" }}>
                Welcome to Topshop, <span style={{ textDecoration: "underline", cursor: "pointer" }}>Sign in or register</span>
              </div>
              
              {/* Search input field */}
              <div style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 12px",
                background: "#fff",
                borderRadius: "0px", // sharp corners
                border: v.border === "none" ? "1px solid transparent" : v.border,
                width: "280px",
                justifyContent: "space-between",
                height: "36px",
                transition: "all 0.2s ease"
              }}>
                <span style={{ fontSize: "13px", color: v.border === "none" ? "#b5b0a3" : "#6e6b60" }}>{v.placeholder}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1c1b17" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
            </div>
          </div>

          {/* Topshop Navigation Bar */}
          <div style={{ background: "#ffffff", borderTop: "1px solid #e3e0d6", borderBottom: "1px solid #e3e0d6", padding: "12px 32px", display: "flex", gap: "24px", alignItems: "center", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#1c1b17" }}>
            <span style={{ cursor: "pointer" }}>BAGS & ACCESSORIES</span>
            <span style={{ color: "#e3e0d6" }}>|</span>
            <span style={{ cursor: "pointer" }}>MAKE-UP</span>
            <span style={{ color: "#e3e0d6" }}>|</span>
            <span style={{ cursor: "pointer" }}>SALE & OFFERS</span>
            <span style={{ color: "#e3e0d6" }}>|</span>
            <span style={{ cursor: "pointer" }}>WE LOVE</span>
          </div>

          {/* Simulated Webpage Content (Mock Hero Banner with play overlay) */}
          <div style={{ height: "240px", background: "#e8e7e3", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            {/* Clean fashion-style catalog placeholder background */}
            <div style={{ position: "absolute", inset: 0, opacity: 0.15, background: "radial-gradient(circle, #555 10%, transparent 11%)", backgroundSize: "12px 12px" }}></div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", zIndex: 1 }}>
              {/* Play controls overlay */}
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(28,27,23,0.5)" strokeWidth="2"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(28,27,23,0.6)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ marginLeft: "2px" }}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(28,27,23,0.5)" strokeWidth="2"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
              </div>
              <span style={{ fontSize: "11px", fontFamily: "JetBrains Mono, monospace", color: "#6e6b60" }}>[MOCK CATALOG BANNER PLAYBACK]</span>
            </div>
          </div>
        </div>

        {/* Variant Info Details */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "16px" }}>
          <h4 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "var(--color-text)" }}>{v.title}</h4>
          
          <p style={{ margin: 0, fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
            {v.desc}
          </p>

          {v.isWinner && (
            <div style={{ display: "inline-block", background: "var(--color-text)", color: "var(--color-surface)", padding: "8px 16px", borderRadius: "4px", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
              WINNER · +5.8% CONVERSIONS
            </div>
          )}
        </div>
      </div>

      {/* Footer Caption */}
      <div style={{ background: "rgba(0,0,0,0.015)", padding: "16px 40px", borderTop: "1px solid var(--color-border)", fontSize: "12px", color: "var(--color-text-secondary)", fontFamily: "JetBrains Mono, monospace" }}>
        Illustrative reconstruction of the test cells – not actual Topshop UI. Traffic split evenly across all cells; run to statistical significance before rollout.
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
