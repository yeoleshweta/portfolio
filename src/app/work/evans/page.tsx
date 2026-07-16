"use client";

import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import { CaseStudySection, Blockquote } from "@/components/casestudy/CaseStudyContent";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "tension", label: "01: The Tension" },
  { id: "craft", label: "02: The Craft" },
  { id: "implementation", label: "03: Rigorous Execution" },
  { id: "evidence", label: "04: Measuring the Lift" },
];

function ExperimentBarChart() {
  const [selectedIdx, setSelectedIdx] = React.useState(2); // Top-200 popularity selected by default

  const experiments = [
    {
      label: "Social proof",
      value: "+2.5%",
      height: "30%",
      title: "Social proof messaging",
      category: "TRUST LAYER · PRODUCT PAGE",
      uplift: "+2.50% RPV",
      description: "Displaying real-time visitor counts on product pages to build confidence. Fact-based social proof increases confidence without creating artificial anxiety."
    },
    {
      label: "Selling Fast!",
      value: "+3.34%",
      height: "40%",
      title: "Urgency badge ('Selling Fast!')",
      category: "URGENCY LAYER · BUCKET/BASKET",
      uplift: "+3.34% RPV",
      description: "Triggering a clean badge when stock levels for a selected size drop below a critical threshold. Simple, honest, and helpful."
    },
    {
      label: "Top-200 popularity",
      value: "+8.43%",
      height: "100%",
      title: "Popularity messaging on top-200 products",
      category: "URGENCY LAYER · PRODUCT PAGE",
      uplift: "+8.43% RPV",
      description: "Popularity messaging on products in the top 200 added to bag over the previous 24 hours. Behavioral data is persuasive: local, recent, and true."
    },
    {
      label: "Top-200 mobile",
      value: "+5.62%",
      height: "67%",
      title: "Top-200 mobile optimization",
      category: "MOBILE LAYER · PRODUCT LISTINGS",
      uplift: "+5.62% RPV",
      description: "Simplifying product listings and filters for mobile users. Clean layout adjustments targeted at a predominantly mobile user base."
    },
    {
      label: "Welcome message",
      value: "+2.5%",
      height: "30%",
      title: "Welcome orientation message",
      category: "ONBOARDING LAYER · HOMEPAGE",
      uplift: "+2.50% RPV",
      description: "A clear, helpful onboarding banner explaining how the sizing structure works for new visitors. Clear orientation builds confidence from session start."
    },
    {
      label: "Checkout friction",
      value: "+3.19%",
      height: "38%",
      title: "Checkout form friction reduction",
      category: "CHECKOUT LAYER · FORMS",
      uplift: "+3.19% RPV",
      description: "Removing non-essential fields and clarifying input requirements during checkout. Minimizing form validation issues to keep purchase momentum."
    }
  ];

  const active = experiments[selectedIdx];

  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "40px", borderRadius: "16px", margin: "32px 0" }}>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "28px" }}>
        RPV UPLIFT PER EXPERIENCE (Each measured in its own test; uplifts don&apos;t sum)
      </div>

      {/* Bar chart container */}
      <div style={{ display: "flex", height: "240px", alignItems: "flex-end", gap: "16px", borderBottom: "1px solid var(--color-border)", paddingBottom: "16px", marginBottom: "28px" }}>
        {experiments.map((e, idx) => {
          const isSelected = selectedIdx === idx;
          return (
            <div
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                height: "100%",
                justifyContent: "flex-end"
              }}
            >
              <div style={{
                width: "100%",
                height: e.height,
                background: isSelected ? "var(--color-accent)" : "rgba(139, 105, 250, 0.2)",
                borderRadius: "4px 4px 0 0",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                paddingTop: "8px"
              }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: isSelected ? "#fff" : "var(--color-text)" }}>
                  {e.value}
                </span>
              </div>
              <div style={{
                marginTop: "12px",
                fontSize: "11px",
                fontWeight: isSelected ? 700 : 500,
                color: isSelected ? "var(--color-text)" : "var(--color-text-secondary)",
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%"
              }}>
                {e.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected details card */}
      <div style={{ border: "1px solid var(--color-border)", padding: "24px", borderRadius: "12px", background: "var(--color-bg)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", borderBottom: "1px solid var(--color-border)", paddingBottom: "12px", marginBottom: "16px" }}>
          <div>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "var(--color-accent)", fontWeight: 700 }}>{active.category}</span>
            <h5 style={{ margin: "4px 0 0 0", fontSize: "16px", fontWeight: 700 }}>{active.title}</h5>
          </div>
          <div style={{ fontSize: "18px", fontWeight: 800, color: "var(--color-accent)" }}>{active.uplift}</div>
        </div>
        <p style={{ margin: 0, fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
          {active.description}
        </p>
      </div>
    </div>
  );
}

export default function EvansCaseStudy() {
  return (
    <main>
      <CaseStudyHero
        title="Do small wins compound? Six measured experiments, one revenue per visitor discipline at Evans"
        category="Experimentation Portfolio · Metric Design"
        role="Personalization & Experimentation Specialist"
        team="Capita · Qubit ecosystem: Evans"
        timeline="Experimentation Lifecycle"
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
            A portfolio of small bets across the full journey, with each experience individually measured on RPV and each mapping regional and behavioral data, together contributing several million pounds of top line revenue.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "24px",
            background: "var(--color-surface)",
            padding: "32px",
            borderRadius: "16px",
            border: "1px solid var(--color-border)",
            margin: "32px 0"
          }}>
            <div>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 700, letterSpacing: "0.05em" }}>Role</span>
              <p style={{ margin: "4px 0 0 0", fontWeight: 600, fontSize: "15px" }}>Personalization & Experimentation Specialist</p>
            </div>
            <div>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 700, letterSpacing: "0.05em" }}>Team</span>
              <p style={{ margin: "4px 0 0 0", fontWeight: 600, fontSize: "15px" }}>Capita · Evans</p>
            </div>
            <div>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 700, letterSpacing: "0.05em" }}>Methods</span>
              <p style={{ margin: "4px 0 0 0", fontWeight: 600, fontSize: "15px" }}>Portfolio testing, RPV validation, behavioral urgency</p>
            </div>
            <div>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 700, letterSpacing: "0.05em" }}>Outcome</span>
              <p style={{ margin: "4px 0 0 0", fontWeight: 600, fontSize: "15px", color: "var(--color-accent)" }}>2.5% to 8.43% RPV uplift</p>
            </div>
          </div>

          <h3 style={{ fontSize: "20px", fontWeight: 700, marginTop: "40px", marginBottom: "16px" }}>A portfolio of small bets, each one measured</h3>
          <p>
            Evans posed a different question than its sister brands: not &apos;what is the one big fix?&apos; but &apos;what do many small, individually measured improvements add up to?&apos; The program ran a portfolio of six distinct experiences across the product page, basket, mobile, onboarding, and checkout, each proving its own revenue per visitor uplift, and each grounded in behavioral data rather than marketing assertion.
          </p>
          <p style={{ marginTop: "16px" }}>
            Embedded in the Arcadia ecosystem, I worked on experiences serving a customer base that was predominantly mobile, which made simplicity, honesty, and orientation design requirements, not niceties.
          </p>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 01: THE TENSION                     */}
        {/* ============================================ */}
        <CaseStudySection
          id="tension"
          heading="01: The Tension"
        >
          <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>Three constraints that shaped the program</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>1: Conversion rate was not enough</h4>
              <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                A conversion only scorecard can flatter interventions that convert more people into smaller baskets. For a brand like Evans, a single clear metric was needed: revenue per visitor, a single number that holds every experience accountable for the whole commercial outcome. Choosing it was the program&apos;s first analytical decision, made before any experience shipped.
              </p>
            </div>
            <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "24px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>2: An audience that punishes complexity</h4>
              <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                Evans&apos; predominant customer base was not digitally native. Cluttered interfaces, aggressive popups, and manipulative countdowns do not just underperform with this audience; they break trust. Every urgency and proof mechanic had to be simple, legible, and factually true.
              </p>
            </div>
            <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "24px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>3: The big bang temptation</h4>
              <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                The alternative path, which is one dramatic redesign, concentrates risk and defines clean measurement. A portfolio of small experiences meant each idea could carry its own business case, its own test, and its own numbers. Small, safe, honestly scored.
              </p>
            </div>
          </div>

          <Blockquote text="This program's key wouldn't come from one heroic change. It would come from many modest, measured, data grounded improvements — and from a metric strict enough to keep them all honest." />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 02: THE CRAFT                       */}
        {/* ============================================ */}
        <CaseStudySection
          id="craft"
          heading="02: The Craft"
        >
          <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>The experiment portfolio</h3>
          <p>
            Six experiences across four layers of the journey: every mechanic grounded in live behavioral data, every experience individually scored on RPV. Click a bar to explore each experiment.
          </p>

          <ExperimentBarChart />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 03: RIGOROUS EXECUTION              */}
        {/* ============================================ */}
        <CaseStudySection
          id="implementation"
          heading="03: Rigorous Execution"
        >
          <p>
            Every experience in the portfolio was measured individually on RPV. There was no blended program number hiding weak performers behind strong ones. An experience earned its place with its own uplift or it did not stay.
          </p>
          <p style={{ marginTop: "16px" }}>
            The urgency mechanics were factual by construction: &apos;selling fast&apos; and popularity flags derived from the trailing 24 hour added to bag data. If a product was not actually moving, it carried no badge. For an audience that punishes manipulation, honest scarcity was not just ethics; it was a retention strategy.
          </p>
          <p style={{ marginTop: "16px" }}>
            And the portfolio math was treated with respect: RPV uplifts do not naively sum. Experiences overlap in audience and surface, and effects interact. The program&apos;s several million pound contribution was assessed at the revenue line, not by adding percentages, a discipline that keeps a portfolio&apos;s story credible.
          </p>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 04: MEASURING THE LIFT              */}
        {/* ============================================ */}
        <CaseStudySection
          id="evidence"
          heading="04: Measuring the Lift"
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "24px", margin: "24px 0" }}>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid var(--color-accent)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "var(--color-accent)" }}>8.43%</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>best single uplift: popularity messaging on the top-200 added to bag items.</p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid var(--color-accent)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "var(--color-accent)" }}>6 / 6</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>experiences individually measured: each carried its own RPV uplift, from 2.5% to 8.43%.</p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid var(--color-accent)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "var(--color-accent)" }}>Millions</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>several million pounds added to top line performance across the personalization program.</p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid var(--color-accent)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "var(--color-accent)" }}>Full journey</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>product page, basket, mobile, home page onboarding, and checkout: persuasion where it helps, simplification where it counts.</p>
            </div>
          </div>

          <Blockquote text="The Arcadia measurement standard applied here as everywhere: digital investments are evaluated on incremental value — engagement, loyalty, and revenue that would not have happened anyway." />
          <div style={{ textAlign: "right", marginTop: "-16px", marginBottom: "32px", fontSize: "14px", color: "var(--color-text-secondary)", fontFamily: "JetBrains Mono, monospace" }}>
            — Simon Pritchard, Group Digital Director, Arcadia
          </div>

          <div style={{ borderTop: "2px solid var(--color-text)", marginTop: "48px", paddingTop: "40px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>Key learnings</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Portfolios beat big bangs</h4>
                <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                  Many modest, measured wins compounded into millions, with less risk, faster learning, and cleaner attribution than any single redesign could deliver. The deeper lesson: an experimentation program is not just about code; it is about team alignment, governance, and cadence.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>The metric is the strategy</h4>
                <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                  Focusing on a single metric (RPV) changed what winning meant for every experience. Conversion rate can rise while revenue falls; RPV catches both. Metric selection is reporting detail; made early, it shapes design thinking and keeps execution honest.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Uplifts do not sum</h4>
                <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                  The naive math of this portfolio, which is to add up percentages and claim a 25% total lift, is wrong. Knowing why it is wrong, due to overlapping audiences, interacting effects, and different exposure denominators, matters more than any single result. Honest aggregation is where analytical credibility is won or lost.
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
            Experimentation within the Arcadia Group ecosystem for Evans. Proprietary metrics generalized for confidentiality.
          </div>
        </CaseStudySection>
      </CaseStudyLayout>
    </main>
  );
}
