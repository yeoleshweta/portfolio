"use client";

import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import { CaseStudySection, Blockquote } from "@/components/casestudy/CaseStudyContent";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "tension", label: "01: The Tension" },
  { id: "craft", label: "02: The Craft" },
  { id: "implementation", label: "03: Implementation" },
  { id: "evidence", label: "04: The Evidence" },
];

function FunnelJobVisual() {
  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "40px", borderRadius: "16px", margin: "32px 0" }}>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        Budget fenced by funnel job, not by channel habit
      </div>
      
      {/* Stacked bar */}
      <div style={{ display: "flex", height: "48px", borderRadius: "8px", overflow: "hidden", marginTop: "24px" }}>
        <div style={{ width: "50%", background: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "15px" }}>
          50%
        </div>
        <div style={{ width: "25%", background: "rgba(139, 105, 250, 0.5)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text)", fontWeight: 700, fontSize: "15px" }}>
          25%
        </div>
        <div style={{ width: "25%", background: "var(--color-text)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-surface)", fontWeight: 700, fontSize: "15px" }}>
          25%
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "16px", marginTop: "20px" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: "14px" }}>New Customers</div>
          <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "4px" }}>Prospecting focused allocation</div>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: "14px" }}>Prospects</div>
          <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "4px" }}>Conversion focused allocation</div>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: "14px" }}>Lifetime Value</div>
          <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "4px" }}>Retention focused allocation</div>
        </div>
      </div>
      
      <div style={{ borderTop: "1px solid var(--color-border)", marginTop: "24px", paddingTop: "16px", fontSize: "13px", color: "var(--color-text-secondary)", fontStyle: "italic" }}>
        Each job kept its own scorecard. There was no blended ROI reporting that lets retargeting subsidize the optics of acquisition.
      </div>
    </div>
  );
}

function CraftLayerSelector() {
  const [activeLayer, setActiveLayer] = React.useState("audience");

  const layers = {
    audience: {
      title: "1: Audience",
      desc: "Ensuring clean user segmentation so that acquisition campaigns target only genuinely new visitors, ignoring those already familiar with the brand."
    },
    investment: {
      title: "2: Investment",
      desc: "Fencing budget allocations so that low funnel retargeting cannot devour prospecting resources. Spend is locked to the strategic value of the segment."
    },
    creative: {
      title: "3: Creative",
      desc: "Aligning display visuals dynamically to the live retail calendar without freezing campaigns or interrupting ongoing measurements."
    },
    measurement: {
      title: "4: Measurement",
      desc: "Holding all display activities to a randomized control holdout standard, isolating pure incrementality from organic demand."
    }
  };

  const l = layers[activeLayer as keyof typeof layers];

  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "40px", borderRadius: "16px", margin: "32px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", borderBottom: "1px solid var(--color-border)", paddingBottom: "16px", marginBottom: "24px" }}>
        {Object.keys(layers).map((key) => {
          const isActive = activeLayer === key;
          return (
            <button
              key={key}
              onClick={() => setActiveLayer(key)}
              style={{
                padding: "12px 8px",
                border: "none",
                background: isActive ? "var(--color-text)" : "transparent",
                color: isActive ? "var(--color-surface)" : "var(--color-text-secondary)",
                borderRadius: "20px",
                fontWeight: isActive ? 700 : 500,
                fontSize: "13.5px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                textAlign: "center"
              }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          );
        })}
      </div>
      <div>
        <h4 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "var(--color-text)" }}>{l.title}</h4>
        <p style={{ marginTop: "10px", margin: 0, fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
          {l.desc}
        </p>
      </div>
    </div>
  );
}

function ArchitectureVisual() {
  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "40px", borderRadius: "16px", margin: "32px 0" }}>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "28px" }}>
        Measurement architecture: randomized holdout design
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
        <div style={{ border: "1px solid var(--color-border)", padding: "24px", borderRadius: "12px", background: "var(--color-bg)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: "15px" }}>Treated Arm</span>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "14px", fontWeight: 700 }}>90%</span>
          </div>
          <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginTop: "12px", lineHeight: "1.5" }}>
            Audience intelligence and investment logic with a live creative, measured against the holdout arm.
          </p>
        </div>

        <div style={{ border: "1px solid var(--color-border)", padding: "24px", borderRadius: "12px", background: "var(--color-bg)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: "15px" }}>Holdout Arm</span>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "14px", fontWeight: 700, color: "var(--color-accent)" }}>10%</span>
          </div>
          <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginTop: "12px", lineHeight: "1.5" }}>
            Same audience and investment logic, but served a blank ad representing a true placebo.
          </p>
        </div>
      </div>

      <div style={{ marginTop: "32px", padding: "24px", background: "var(--color-text)", color: "var(--color-surface)", borderRadius: "12px" }}>
        <div style={{ fontWeight: 700, fontSize: "16px" }}>Incrementality</div>
        <p style={{ fontSize: "14px", marginTop: "8px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
          Treated conversion rate minus holdout conversion rate. Validated by a two tailed significance test.
        </p>
        <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", padding: "4px 10px", borderRadius: "4px", fontSize: "11px", fontWeight: 700, fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", marginTop: "12px", letterSpacing: "0.05em" }}>
          Measured against the counterfactual, not against zero
        </div>
      </div>
    </div>
  );
}

export default function MissSelfridgeCaseStudy() {
  return (
    <main>
      <CaseStudyHero
        title="Would they have bought anyway? Measuring true incrementality for Miss Selfridge"
        category="Quantitative Measurement · Experimentation"
        role="Measurement & Personalization Specialist"
        team="Qubit · Client ecosystem: Miss Selfridge"
        timeline="Experimentation Period"
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
            How a lifecycle display program was held to a causal standard: randomized holdouts, two tailed significance testing, and a metric deliberately matched to the mission, delivering a 47% new customer rate that could actually be defended.
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
              <p style={{ margin: "4px 0 0 0", fontWeight: 600, fontSize: "15px" }}>Measurement & Personalization Specialist</p>
            </div>
            <div>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 700, letterSpacing: "0.05em" }}>Team</span>
              <p style={{ margin: "4px 0 0 0", fontWeight: 600, fontSize: "15px" }}>Qubit · Miss Selfridge</p>
            </div>
            <div>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 700, letterSpacing: "0.05em" }}>Methods</span>
              <p style={{ margin: "4px 0 0 0", fontWeight: 600, fontSize: "15px" }}>Experiment design, segmenting, significance testing</p>
            </div>
            <div>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 700, letterSpacing: "0.05em" }}>Outcome</span>
              <p style={{ margin: "4px 0 0 0", fontWeight: 600, fontSize: "15px", color: "var(--color-accent)" }}>47% New Customer Rate</p>
            </div>
          </div>

          <h3 style={{ fontSize: "20px", fontWeight: 700, marginTop: "40px", marginBottom: "16px" }}>Proving what marketing actually causes</h3>
          <p>
            This project centered on a question most marketing programs never honestly answer: of all the conversions a campaign claims, how many would have bought anyway? For Miss Selfridge, a lifecycle display program was building to handle three tasks: find new customers, convert prospects, and grow lifetime value. Against a relentless daily trade calendar, we introduced an intervention: a holdout structure that proved causality, not attribution artifact.
          </p>
          <p style={{ marginTop: "16px" }}>
            Embedded in the Arcadia ecosystem, we relied on the measurement and audience architecture behind a creative led, data driven display strategy, one designed specifically to drive New Customer Rate rather than recycle existing demand.
          </p>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 01: THE TENSION                     */}
        {/* ============================================ */}
        <CaseStudySection
          id="tension"
          heading="01: The Tension"
        >
          <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>Three ways the numbers could have lied</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>1: The attribution trap</h4>
              <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                Retargeting is a customer acquisition trap. It shows ads to people already deep in the funnel, then claims credit when they convert. Incremental ROI is usually an illusion. Some fractions of those customers would have purchased with no ad at all. The dashboard was success, but the counterfactual was revealing.
              </p>
            </div>
            <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "24px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>2: One budget, three jobs</h4>
              <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                Acquisition, prospecting, conversion, and retention budgets compete for the same spend, and they do not share a success metric. Optimizing the blended number quietly starves acquisition. Proving genuinely new customers to feed the overall line meant converting the book.
              </p>
            </div>
            <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "24px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>3: A calendar that never sleeps</h4>
              <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                Miss Selfridge&apos;s trade plan changed daily: Black Friday, Cyber Monday, and the Christmas run up, with creative refreshed to match offline promotions. Analysis had to accommodate this volatility. Any framework that required a frozen campaign to produce a clean read was useless here.
              </p>
            </div>
          </div>

          <Blockquote text="The risk was not a failing campaign. It was a campaign that looked successful: one whose numbers could flatter without informing. The most dangerous dashboard is the one that is always green." />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 02: THE CRAFT                       */}
        {/* ============================================ */}
        <CaseStudySection
          id="craft"
          heading="02: The Craft"
        >
          <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>A measurement first framework</h3>
          <p>
            Budget, audience, and metric were matched deliberately by funnel job, and everything was measured against a control holdout. Explore the four intelligence layers below.
          </p>

          <FunnelJobVisual />

          <CraftLayerSelector />

          <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "36px", borderRadius: "12px", borderLeft: "4px solid var(--color-accent)" }}>
            <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 700, letterSpacing: "0.05em" }}>Core Principle</span>
            <h4 style={{ margin: "8px 0 12px 0", fontSize: "17px", fontWeight: 700 }}>Every claim of impact must survive a comparison against what if we did nothing.</h4>
            <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "14.5px", color: "var(--color-text-secondary)", display: "flex", flexDirection: "column", gap: "8px", lineHeight: "1.5" }}>
              <li>A 10% randomized holdout receives the audience and investment loop, but is served a blank ad.</li>
              <li>Incrementality is calculated as treated conversion minus holdout conversion.</li>
            </ul>
          </div>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 03: IMPLEMENTATION                  */}
        {/* ============================================ */}
        <CaseStudySection
          id="implementation"
          heading="03: Implementation"
        >
          <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>Rigorous execution: the placebo arm</h3>
          <p>
            We delivered a 10% control group in a true placebo arm: same audience intelligence, same investment logic, but a blank creative, so that the difference between arms could only be attributed to the advertising itself.
          </p>
          <p style={{ marginTop: "16px" }}>
            The lift was validated as statistically significant by a two tailed test. We chose a two tailed test because a campaign can plausibly hurt as well as help, and an honest test checks both directions. We held a hard reporting line: incremental ROI was never reported on its own. It was always paired with New Customer Rate, so the program was judged on its mission, not on recycled demand.
          </p>

          <ArchitectureVisual />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 04: THE EVIDENCE                    */}
        {/* ============================================ */}
        <CaseStudySection
          id="evidence"
          heading="04: The Evidence"
        >
          <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>Measuring the lift</h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", margin: "24px 0" }}>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid var(--color-accent)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "var(--color-accent)" }}>47%</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>New Customer Rate: nearly half of campaign driven purchases came from customers entirely new to the brand.</p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid var(--color-accent)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "var(--color-accent)" }}>10%</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>randomized holdout: incrementality confirmed by a two tailed significance test.</p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid var(--color-accent)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "var(--color-accent)" }}>50/25/25</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>disciplined allocation: budget fenced by funnel job, preventing retargeting from swallowing the budget.</p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid var(--color-accent)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "var(--color-accent)" }}>Daily</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>creative alignment: displays refreshed against the trade calendar through peak season.</p>
            </div>
          </div>

          <Blockquote text="Our campaign was creative led, but data driven, and designed specifically to find completely new customers and increase existing customer lifetime value." />

          <div style={{ borderTop: "2px solid var(--color-text)", marginTop: "48px", paddingTop: "40px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>Key learnings</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>ROI can lie</h4>
                <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                  The most targeted number in the program was not ROI; it was the holdout&apos;s conversion rate. Without the counterfactual, retargeting flatters itself. With it, we claim only what we cause. This is the study that made measured against the counterfactual, not against zero my operating standard for data decisions.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>The metric must match the mission</h4>
                <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                  A program whose mission is new customers cannot be judged on blended ROI. Liberating New Customer Rate from organic search changed what the program optimized for, and gave the team the courage to make hard decisions.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Two tailed humility</h4>
                <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                  Testing both directions is a statement of intellectual honesty: an intervention can hurt as well as help. Building that risk into the design makes the result, when positive, that much more defensible.
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
            Lifecycle display measurement within the Arcadia Group ecosystem. Proprietary metrics generalized for confidentiality.
          </div>
        </CaseStudySection>
      </CaseStudyLayout>
    </main>
  );
}
