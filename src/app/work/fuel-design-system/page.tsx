"use client";

import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import { CaseStudySection, Blockquote } from "@/components/casestudy/CaseStudyContent";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "01: The Challenge" },
  { id: "foundation", label: "02: The Foundation" },
  { id: "tokens", label: "03: Token Layer" },
  { id: "anatomy", label: "04: Component Anatomy" },
  { id: "screens", label: "05: Building within the System" },
  { id: "impact", label: "06: Impact & Metrics" },
];

export default function FuelDesignSystemCaseStudy() {
  const [password, setPassword] = React.useState("");
  const [unlocked, setUnlocked] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (localStorage.getItem("fuel_access") === "deere2026") {
      setUnlocked(true);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "deere2026") {
      localStorage.setItem("fuel_access", "deere2026");
      setUnlocked(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  if (!unlocked) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f3", padding: "24px" }}>
        <div style={{ background: "#ffffff", border: "1px solid #e3e0d6", borderRadius: "12px", width: "100%", maxWidth: "440px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
          {/* John Deere Top Stripe */}
          <div style={{ height: "6px", background: "#FFDE00" }}></div>
          <div style={{ background: "#367C2B", padding: "24px", textAlign: "center", color: "#ffffff" }}>
            <div style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>John Deere</div>
            <div style={{ fontSize: "12px", marginTop: "4px", opacity: 0.85, fontFamily: "JetBrains Mono, monospace" }}>FUEL DESIGN SYSTEM</div>
          </div>
          
          <form onSubmit={handleUnlock} style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1c1b17", margin: "0 0 8px 0" }}>Protected Case Study</h3>
              <p style={{ fontSize: "13.5px", color: "#6e6b60", margin: 0, lineHeight: 1.5 }}>
                This case study contains proprietary materials under non disclosure agreements. Please enter the password to view.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <input
                type="password"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  padding: "12px 16px",
                  border: "1px solid #c8c5bc",
                  borderRadius: "4px",
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.2s ease",
                  width: "100%",
                  color: "#1c1b17"
                }}
                onFocus={(e) => e.target.style.borderColor = "#367C2B"}
                onBlur={(e) => e.target.style.borderColor = "#c8c5bc"}
              />
              {error && (
                <span style={{ fontSize: "12.5px", color: "#b91c1c", fontWeight: 600 }}>{error}</span>
              )}
            </div>

            <button
              type="submit"
              style={{
                background: "#FFDE00",
                color: "#1c1b17",
                border: "none",
                padding: "14px",
                borderRadius: "4px",
                fontWeight: 700,
                fontSize: "13.5px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                cursor: "pointer",
                transition: "background 0.2s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#e5c800"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#FFDE00"}
            >
              Unlock Case Study
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main>
      <CaseStudyHero
        title="Fuel Design System: Building at Scale Inside John Deere's Enterprise Design System"
        category="Design Systems"
        role="UI/UX Designer"
        team="Fuel (John Deere)"
        timeline="Protected Access"
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
            Working within Fuel, John Deere&apos;s enterprise design system, to keep a data dense B2B manufacturing planning platform consistent across 100+ screens and 6+ product teams, assembling screens from the shared library, contributing to tokens and documentation, and building and extending components where the product needed them.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", borderTop: "2px solid var(--color-text)", borderBottom: "1px solid var(--color-border)", margin: "32px 0" }}>
            <div style={{ padding: "28px 24px 32px 0", borderRight: "1px solid var(--color-border)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, letterSpacing: "-0.02em", color: "#367C2B" }}>100+</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-secondary)", marginTop: "8px" }}>screens on one system</div>
            </div>
            <div style={{ padding: "28px 24px 32px 24px", borderRight: "1px solid var(--color-border)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, letterSpacing: "-0.02em" }}>6+</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-secondary)", marginTop: "8px" }}>product teams aligned</div>
            </div>
            <div style={{ padding: "28px 0 32px 24px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, letterSpacing: "-0.02em", color: "#367C2B" }}>-25%</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-secondary)", marginTop: "8px" }}>time to specification</div>
            </div>
          </div>

          <h3 style={{ fontSize: "20px", fontWeight: 700, marginTop: "40px", marginBottom: "16px" }}>Proving design patterns at scale</h3>
          <p>
            John Deere&apos;s manufacturing organization runs a large internal platform for program planning, scheduling, and release management, the tool teams use to create programs, map production tools, track phase health, and compare releases. It is exactly the kind of data dense B2B product where visual and behavioral consistency is hard to hold across dozens of complex screens.
          </p>
          <p style={{ marginTop: "16px" }}>
            That consistency came from <strong>Fuel</strong>, John Deere&apos;s enterprise design system. My work lived inside Fuel: I assembled product screens from its shared library, built and extended components where the product needed patterns the library did not yet cover, and contributed back to its tokens and documentation so those additions stayed part of the system rather than drifting from it.
          </p>

          <Blockquote text="My contribution, precisely. I was not the original author of Fuel. I worked within it as a practitioner, assembling screens from existing components, building and extending several components, and contributing to tokens and documentation." />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 01: THE CHALLENGE                   */}
        {/* ============================================ */}
        <CaseStudySection
          id="challenge"
          heading="01: The Challenge"
        >
          <p>
            The platform spans creation flows (Program, Project, System), dashboards, health cards, comparison views, reports, and modals, well over a hundred screens, each dense with tables, forms, status indicators, and charts. Without a shared system, three failure modes appear fast:
          </p>
          <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px", fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
            <li><strong>Visual drift:</strong> Every team styles buttons, tables, and forms slightly differently, and the product stops feeling like one tool.</li>
            <li><strong>Redesign debt:</strong> New features get designed from scratch instead of composed, multiplying work and inconsistency.</li>
            <li><strong>Slow, ambiguous handoff:</strong> Without documented components and specs, engineering reinterprets the same patterns repeatedly.</li>
          </ul>
          <p style={{ marginTop: "16px" }}>
            The job inside Fuel was to make the right pattern the easy pattern, so a new screen was an act of assembly, not invention.
          </p>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 02: THE FOUNDATION                  */}
        {/* ============================================ */}
        <CaseStudySection
          id="foundation"
          heading="02: The Foundation, Section by Section"
        >
          <p>
            Fuel is specified at the foundational level, color, type, and a component library with defined states and redlined measurements for developer handoff. Below is the full system specification as applied to this platform, shown at scale.
          </p>

          {/* Full spec sheet — clean scrollable strip */}
          <div style={{ margin: "32px 0" }}>
            <div style={{ border: "1px solid var(--color-border)", borderRadius: "12px", overflow: "hidden", background: "#f8f8f6" }}>
              {/* Buttons — high res, displayed first as standalone feature */}
              <div style={{ padding: "24px", borderBottom: "1px solid var(--color-border)" }}>
                <img
                  src="/assets/fuel/spec-03-buttons.jpg"
                  alt="Fuel buttons specification with redlines"
                  style={{ width: "100%", height: "auto", display: "block", borderRadius: "4px" }}
                />
                <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "12px", fontStyle: "italic" }}>Buttons: primary, secondary, and value types, each with active and disabled states and pixel-level redlines. The primary button is 150×48, the secondary 150×48, the value button 88×33.</div>
              </div>

              {/* Dashboard Cards — high res from uploaded asset */}
              <div style={{ padding: "24px" }}>
                <img
                  src="/assets/fuel/media__1784760985282.jpg"
                  alt="Fuel dashboard cards specification"
                  style={{ width: "100%", height: "auto", display: "block", borderRadius: "4px" }}
                />
                <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "12px", fontStyle: "italic" }}>Dashboard cards: the workhorse family — KPI cards, tabbed metric cards (Daily Delivery, OpsX, Sequence Details, Order Response Time), and chart cards. Each is a composition of the primitive components above, which is the entire point of the system.</div>
              </div>
            </div>
          </div>

          {/* Spec note */}
          <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "8px", padding: "20px 24px", margin: "24px 0" }}>
            <p style={{ margin: 0, fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
              <strong>Why redlines matter.</strong> Each component carries pixel dimensions and every state (default, active, disabled, error, success). That is what makes a component developer ready — the spec, not just the picture, is the deliverable. Working within this discipline is the core of design system practice.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", margin: "20px 0" }}>
            <div style={{ border: "1px solid var(--color-border)", borderRadius: "8px", overflow: "hidden", background: "#f8f8f6", padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <img src="/assets/fuel/spec-11-graphs.jpg" alt="Graphs spec" style={{ width: "100%", height: "140px", objectFit: "contain", objectPosition: "center", display: "block" }} />
              <div style={{ fontSize: "11.5px", color: "var(--color-text-secondary)", fontStyle: "italic" }}>Graphs: chart components in the system palette, so data-viz stays on-brand.</div>
            </div>
            <div style={{ border: "1px solid var(--color-border)", borderRadius: "8px", overflow: "hidden", background: "#f8f8f6", padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <img src="/assets/fuel/spec-12-table.jpg" alt="Tables spec" style={{ width: "100%", height: "140px", objectFit: "contain", objectPosition: "center", display: "block" }} />
              <div style={{ fontSize: "11.5px", color: "var(--color-text-secondary)", fontStyle: "italic" }}>Table: the single most reused component in a data dense product.</div>
            </div>
            <div style={{ border: "1px solid var(--color-border)", borderRadius: "8px", overflow: "hidden", background: "#f8f8f6", padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <img src="/assets/fuel/spec-13-datepicker.jpg" alt="DatePicker spec" style={{ width: "100%", height: "140px", objectFit: "contain", objectPosition: "center", display: "block" }} />
              <div style={{ fontSize: "11.5px", color: "var(--color-text-secondary)", fontStyle: "italic" }}>Date picker: calendar input with selection states in the brand green.</div>
            </div>
          </div>
        </CaseStudySection>



        {/* ============================================ */}
        {/* SECTION: 03: TOKEN LAYER                     */}
        {/* ============================================ */}
        <CaseStudySection
          id="tokens"
          heading="03: Working at the Token Layer"
        >
          <p>
            Beneath the visible components sits a tokenized color system, semantic names mapped to values, so a status color is defined once and inherited everywhere. I contributed to this layer: mapping process and status colors to Fuel&apos;s messaging tokens (success, info, warning, error) so state was expressed consistently across dashboards, health cards, and comparison views rather than hand picked per screen.
          </p>
          <div style={{ border: "1px solid var(--color-border)", borderRadius: "12px", overflow: "hidden", background: "#f8f8f6", padding: "24px", margin: "24px 0" }}>
            <img src="/assets/fuel/tokens-colours.jpg" alt="Color tokens spec" style={{ width: "100%", height: "auto", display: "block", borderRadius: "4px" }} />
            <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "12px", fontStyle: "italic" }}>Sub-process color tokens mapped to Fuel messaging color names.</div>
          </div>
          <p style={{ marginTop: "16px" }}>
            Tokens turn a visual decision into a systemic one. When warning is a token rather than a hex value copied into forty screens, changing it is one edit, and every screen stays correct.
          </p>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 04: COMPONENT ANATOMY               */}
        {/* ============================================ */}
        <CaseStudySection
          id="anatomy"
          heading="04: Component Anatomy, Interactive"
        >
          <p>
            How does a Fuel component actually get built? The interactive below reconstructs the workflow in Figma&apos;s own visual language, watch a button go from variables to frame, auto layout, token binding, variants, composition, and screens, using Fuel&apos;s real values: the 150x48 redline, Source Sans Pro, and <code>fuel-color-background-action-primary</code>.
          </p>

          <iframe
            src="/assets/fuel/fuel-component-anatomy.html"
            width="100%"
            height="640"
            style={{ border: "1px solid var(--color-border)", borderRadius: "12px", background: "#fff", margin: "32px 0" }}
            title="How a Fuel component is built — from variables to screens"
            loading="lazy"
          />

          <div style={{ fontSize: "13.5px", color: "var(--color-text-secondary)", marginTop: "-16px", fontStyle: "italic", textAlign: "center", marginBottom: "32px" }}>
            Interactive walkthrough: press play, or step through the seven stages. Built to illustrate the component workflow; the key beat is stage 4, where the fill stops being a hex value and becomes a bound variable.
          </div>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 05: BUILDING WITHIN THE SYSTEM      */}
        {/* ============================================ */}
        <CaseStudySection
          id="screens"
          heading="05: Building within the System"
        >
          <p>
            Every product screen below is composed from Fuel components, cards, tables, tabs, forms, status chips, buttons, breadcrumbs. The value of the system shows in how different these screens are in function yet how consistent they are in execution.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", margin: "32px 0" }}>
            <div style={{ border: "1px solid var(--color-border)", borderRadius: "8px", overflow: "hidden", background: "#f8f8f6" }}>
              <img src="/assets/fuel/screen-dashboard.jpg" alt="Program dashboard" style={{ width: "100%", height: "auto", display: "block" }} />
              <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", padding: "12px 16px 16px", fontStyle: "italic" }}>Program dashboard: health cards, status indicators (the messaging tokens in action), linked data tables, and toolbar actions, all composed from library components.</div>
            </div>
            <div style={{ border: "1px solid var(--color-border)", borderRadius: "8px", overflow: "hidden", background: "#f8f8f6" }}>
              <img src="/assets/fuel/screen-createproject.jpg" alt="Create project flow" style={{ width: "100%", height: "auto", display: "block" }} />
              <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", padding: "12px 16px 16px", fontStyle: "italic" }}>Create Project flow: a dense multi section form assembled entirely from Fuel form fields, dropdowns, section cards, side navigation, and primary/secondary buttons.</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", margin: "32px 0" }}>
            <div style={{ border: "1px solid var(--color-border)", borderRadius: "8px", overflow: "hidden", background: "#f8f8f6" }}>
              <img src="/assets/fuel/screen-reports.jpg" alt="Reports and metrics view" style={{ width: "100%", height: "auto", display: "block" }} />
              <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", padding: "12px 16px 16px", fontStyle: "italic" }}>Reports and metrics: the Fuel table, trend graph components, and 24px icon set composed into a VP level metrics view.</div>
            </div>
            <div style={{ border: "1px solid var(--color-border)", borderRadius: "8px", overflow: "hidden", background: "#f8f8f6" }}>
              <img src="/assets/fuel/screen-compare.jpg" alt="Release comparison view" style={{ width: "100%", height: "auto", display: "block" }} />
              <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", padding: "12px 16px 16px", fontStyle: "italic" }}>Release comparison: one of the most complex screens in the product, built by repeating the same Fuel table, form, and status components in a side by side structure. Complexity handled through composition, not new UI.</div>
            </div>
          </div>

          <Blockquote text="My part across these: assembling the screens from existing components, and building or extending several components where the product needed patterns Fuel did not yet cover, then bringing those additions back into the library with documentation so they became reusable, not one offs." />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 06: IMPACT                          */}
        {/* ============================================ */}
        <CaseStudySection
          id="impact"
          heading="06: Impact"
        >
          <p>
            Working within Fuel rather than around it kept a large, multi team platform coherent and shipped faster.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", margin: "24px 0" }}>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid #367C2B" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "#367C2B" }}>100+</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>screens held to one consistent system.</p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid #367C2B" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "#367C2B" }}>6+</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>product teams aligned on shared components.</p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid #367C2B" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "#367C2B" }}>-25%</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>time to specification via developer ready components.</p>
            </div>
          </div>

          <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px", marginTop: "32px", fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
            <li><strong>Consistency at scale:</strong> Dashboards, create flows, reports, and comparisons all read as one product because they share components and tokens.</li>
            <li><strong>Faster handoff:</strong> Redlined, documented components let engineering implement without reinterpreting each pattern.</li>
            <li><strong>Less redesign debt:</strong> New screens were composed from the library; additions were contributed back rather than left as one offs.</li>
          </ul>

          <div style={{ borderTop: "2px solid var(--color-text)", marginTop: "48px", paddingTop: "40px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>Reflections</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Design system work is a discipline of restraint</h4>
                <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                  The instinct as a designer is to make each screen its best self; the systems mindset is to make each screen consistent, and to invest the creativity into the components and tokens that every screen inherits. The leverage is not in the screen, it is in the library.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Contributing back separates users from strengtheners</h4>
                <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                  I also learned that contributing back is what separates using a system from strengthening one. Building a component the product needed, then documenting it and returning it to Fuel so the next designer composes with it, is how a system stays alive instead of fragmenting. That governance instinct, build within constraints, extend deliberately, document always, is what I bring to an enterprise systems team.
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
            Fuel Design System · John Deere — confidential work shared under access control. Prepared as a portfolio case study.
          </div>
        </CaseStudySection>
      </CaseStudyLayout>
    </main>
  );
}
