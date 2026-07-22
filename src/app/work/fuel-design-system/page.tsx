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
  { id: "screens", label: "04: Screen Composition" },
  { id: "impact", label: "05: Impact & Metrics" },
];

function MetricsStrip() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", borderTop: "2px solid var(--color-text)", borderBottom: "1px solid var(--color-border)", margin: "32px 0" }}>
      <div style={{ padding: "28px 24px 32px 0", borderRight: "1px solid var(--color-border)" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, letterSpacing: "-0.02em", color: "#367C2B" }}>100+</div>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-secondary)", marginTop: "8px" }}>Screens on one system</div>
      </div>
      <div style={{ padding: "28px 24px 32px 24px", borderRight: "1px solid var(--color-border)" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, letterSpacing: "-0.02em" }}>6+</div>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-secondary)", marginTop: "8px" }}>Product teams aligned</div>
      </div>
      <div style={{ padding: "28px 0 32px 24px" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, letterSpacing: "-0.02em", color: "#367C2B" }}>-25%</div>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-secondary)", marginTop: "8px" }}>Time to specification</div>
      </div>
    </div>
  );
}

function InteractiveSpecExplorer() {
  const [activeTab, setActiveTab] = React.useState("button");
  const [showRedlines, setShowRedlines] = React.useState(true);
  const [stateMode, setStateMode] = React.useState("default"); // default, hover, active, disabled

  const specs = {
    button: {
      name: "Primary Button",
      description: "Main call to action component. Uses brand green with sharp corners and high contrast text.",
      padding: "10px 24px",
      fontSize: "14px",
      fontWeight: "700",
      height: "36px",
      css: {
        background: stateMode === "hover" ? "#2d6624" : stateMode === "active" ? "#1e4418" : stateMode === "disabled" ? "#e3e0d6" : "#367C2B",
        color: stateMode === "disabled" ? "#9a968a" : "#ffffff",
        border: "none",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        padding: "10px 24px",
        cursor: stateMode === "disabled" ? "not-allowed" : "pointer",
        fontSize: "13px",
        transition: "all 0.15s ease",
        height: "36px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }
    },
    tab: {
      name: "Tabs Component",
      description: "Organizes content layout. Features an active indicator line mapped to the brand color scheme.",
      padding: "12px 16px",
      fontSize: "13px",
      fontWeight: "600",
      height: "44px",
      css: {
        borderBottom: stateMode === "active" ? "3px solid #367C2B" : "3px solid transparent",
        color: stateMode === "active" ? "#1c1b17" : stateMode === "disabled" ? "#9a968a" : "#6e6b60",
        padding: "12px 16px",
        cursor: stateMode === "disabled" ? "not-allowed" : "pointer",
        fontWeight: stateMode === "active" ? 700 : 500,
        fontSize: "13.5px",
        background: stateMode === "hover" ? "#f5f5f3" : "transparent",
        height: "44px",
        display: "inline-flex",
        alignItems: "center",
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
      }
    },
    form: {
      name: "Input Field",
      description: "Standard data entry component. Uses clear states and validation indicator outlines.",
      padding: "8px 12px",
      fontSize: "14px",
      fontWeight: "400",
      height: "36px",
      css: {
        border: stateMode === "active" ? "2px solid #367C2B" : stateMode === "disabled" ? "1px solid #e3e0d6" : "1px solid #b5b0a3",
        background: stateMode === "disabled" ? "#f5f5f3" : "#ffffff",
        color: stateMode === "disabled" ? "#9a968a" : "#1c1b17",
        padding: "8px 12px",
        width: "240px",
        height: "36px",
        outline: "none",
        fontSize: "13.5px",
      }
    }
  };

  const activeSpec = specs[activeTab as keyof typeof specs];

  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "40px", borderRadius: "16px", margin: "32px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--color-border)", paddingBottom: "16px", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Interactive Specification</span>
          <h4 style={{ margin: "4px 0 0 0", fontSize: "16px", fontWeight: 700 }}>Fuel Component Playground</h4>
        </div>
        <button
          onClick={() => setShowRedlines(!showRedlines)}
          style={{
            padding: "8px 16px",
            background: showRedlines ? "#367C2B" : "transparent",
            color: showRedlines ? "#fff" : "var(--color-text)",
            border: "1px solid " + (showRedlines ? "#367C2B" : "var(--color-text)"),
            borderRadius: "20px",
            fontWeight: 600,
            fontSize: "13px",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
        >
          {showRedlines ? "Hide Redline Guides" : "Show Redline Guides"}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        {Object.keys(specs).map((key) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                setStateMode("default");
              }}
              style={{
                padding: "8px 16px",
                border: "none",
                background: isActive ? "var(--color-text)" : "rgba(0,0,0,0.04)",
                color: isActive ? "var(--color-surface)" : "var(--color-text)",
                borderRadius: "20px",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer"
              }}
            >
              {specs[key as keyof typeof specs].name}
            </button>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "32px", alignItems: "start" }}>
        {/* Visual Preview */}
        <div style={{ border: "1px solid var(--color-border)", borderRadius: "8px", background: "var(--color-bg)", padding: "48px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "180px", position: "relative", overflow: "hidden" }}>
          
          {/* Component Container */}
          <div style={{ position: "relative" }}>
            {activeTab === "button" && (
              <button style={activeSpec.css as React.CSSProperties}>
                Save Changes
              </button>
            )}

            {activeTab === "tab" && (
              <div style={{ display: "flex", borderBottom: "1px solid #e3e0d6" }}>
                <button style={activeSpec.css as React.CSSProperties}>
                  Overview Details
                </button>
              </div>
            )}

            {activeTab === "form" && (
              <input
                type="text"
                value={stateMode === "disabled" ? "Locked value" : "Enter program code..."}
                readOnly
                style={activeSpec.css as React.CSSProperties}
              />
            )}

            {/* Redlines overlay */}
            {showRedlines && (
              <div style={{ position: "absolute", inset: "-8px", border: "1px dashed #ef4444", pointerEvents: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ position: "absolute", top: "-18px", left: "0", fontSize: "10px", color: "#ef4444", background: "var(--color-bg)", padding: "0 4px", fontFamily: "JetBrains Mono, monospace" }}>
                  H: {activeSpec.height}
                </span>
                <span style={{ position: "absolute", bottom: "-18px", right: "0", fontSize: "10px", color: "#ef4444", background: "var(--color-bg)", padding: "0 4px", fontFamily: "JetBrains Mono, monospace" }}>
                  Pad: {activeSpec.padding}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* State / Control Panel */}
        <div style={{ border: "1px solid var(--color-border)", padding: "24px", borderRadius: "8px", background: "var(--color-bg)" }}>
          <h5 style={{ margin: "0 0 16px 0", fontSize: "15px", fontWeight: 700 }}>Interactive States</h5>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { id: "default", label: "Default state" },
              { id: "hover", label: "Hover / Focus state" },
              { id: "active", label: "Active / Selected state" },
              { id: "disabled", label: "Disabled state" }
            ].map((st) => (
              <label key={st.id} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="state"
                  checked={stateMode === st.id}
                  onChange={() => setStateMode(st.id)}
                  style={{ accentColor: "#367C2B" }}
                />
                <span style={{ color: stateMode === st.id ? "var(--color-text)" : "var(--color-text-secondary)" }}>{st.label}</span>
              </label>
            ))}
          </div>

          <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--color-border)", fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>
            <strong>Spec Rule:</strong> {activeSpec.description}
          </div>
        </div>
      </div>
    </div>
  );
}

function SemanticTokenMapper() {
  const [selectedStatus, setSelectedStatus] = React.useState("Warning");

  const tokens = {
    Success: {
      bg: "#eaf5e9",
      border: "#bce0b8",
      text: "#2d6624",
      desc: "Success token. Mapped to status values like 'Approved' and 'Complete' across releases.",
      variable: "var(--color-fuel-success-background)",
      hex: "#2D6624"
    },
    Info: {
      bg: "#eef2ff",
      border: "#c7d2fe",
      text: "#3730a3",
      desc: "Information token. Mapped to status values like 'Draft' and 'In Progress' during release setup.",
      variable: "var(--color-fuel-info-background)",
      hex: "#3730A3"
    },
    Warning: {
      bg: "#fef9c3",
      border: "#fef08a",
      text: "#854d0e",
      desc: "Warning token. Mapped to status values like 'Pending' or 'Tooling Blocked' to flag process risks.",
      variable: "var(--color-fuel-warning-background)",
      hex: "#854D0E"
    },
    Error: {
      bg: "#fee2e2",
      border: "#fca5a5",
      text: "#991b1b",
      desc: "Error token. Mapped to status values like 'Failed Phase' or 'Delayed Release' for critical blockages.",
      variable: "var(--color-fuel-error-background)",
      hex: "#991B1B"
    }
  };

  const current = tokens[selectedStatus as keyof typeof tokens];

  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "40px", borderRadius: "16px", margin: "32px 0" }}>
      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Semantic Architecture</span>
      <h4 style={{ margin: "4px 0 20px 0", fontSize: "16px", fontWeight: 700 }}>Color Token Mapping</h4>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "32px", alignItems: "center" }}>
        {/* Token Selector */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {Object.keys(tokens).map((name) => {
            const isSelected = selectedStatus === name;
            return (
              <button
                key={name}
                onClick={() => setSelectedStatus(name)}
                style={{
                  padding: "16px 20px",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  background: isSelected ? "var(--color-text)" : "var(--color-bg)",
                  color: isSelected ? "var(--color-surface)" : "var(--color-text)",
                  textAlign: "left",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {name} State Token
              </button>
            );
          })}
        </div>

        {/* Visual Mapping Details */}
        <div style={{ border: "1px solid var(--color-border)", padding: "32px", borderRadius: "12px", background: "var(--color-bg)" }}>
          <div style={{
            background: current.bg,
            border: "1px solid " + current.border,
            color: current.text,
            padding: "12px 24px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: 700,
            display: "inline-block",
            marginBottom: "20px"
          }}>
            Status: {selectedStatus} Alert
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13.5px" }}>
            <div>
              <span style={{ color: "var(--color-text-secondary)", display: "block", fontSize: "11px", textTransform: "uppercase", fontWeight: 700 }}>Token CSS Variable</span>
              <code style={{ background: "var(--color-surface)", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", color: "var(--color-accent)", display: "inline-block", marginTop: "4px" }}>
                {current.variable}
              </code>
            </div>
            <div>
              <span style={{ color: "var(--color-text-secondary)", display: "block", fontSize: "11px", textTransform: "uppercase", fontWeight: 700 }}>Value Inherited</span>
              <span style={{ fontWeight: 700, color: current.text }}>{current.hex}</span>
            </div>
            <div>
              <span style={{ color: "var(--color-text-secondary)", display: "block", fontSize: "11px", textTransform: "uppercase", fontWeight: 700 }}>Mapping Rule</span>
              <p style={{ margin: "4px 0 0 0", color: "var(--color-text-secondary)", lineHeight: "1.4" }}>{current.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenCompositionExplorer() {
  const [activeScreen, setActiveScreen] = React.useState("dashboard");

  const screens = {
    dashboard: {
      name: "Program Dashboard",
      src: "/assets/fuel/screen-dashboard.jpg",
      desc: "The program dashboard displays health metrics, status cards, and linked details tables, all constructed from Fuel's semantic tokens."
    },
    create: {
      name: "Create Project Flow",
      src: "/assets/fuel/screen-createproject.jpg",
      desc: "A multi-section input structure built exclusively from standard form fields, navigation steps, and button layouts from the shared library."
    },
    reports: {
      name: "Reports & Metrics View",
      src: "/assets/fuel/screen-reports.jpg",
      desc: "VP level metric reports showing targets, current figures, and trends utilizing the library's graph indicators and standard table rows."
    },
    compare: {
      name: "Release Comparison",
      src: "/assets/fuel/screen-compare.jpg",
      desc: "Side by side release analysis. A complex structure created by repeating standard table rows, input elements, and status chips."
    }
  };

  const current = screens[activeScreen as keyof typeof screens];

  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "40px", borderRadius: "16px", margin: "32px 0" }}>
      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Interactive Composition</span>
      <h4 style={{ margin: "4px 0 20px 0", fontSize: "16px", fontWeight: 700 }}>Assembled Screens Explorer</h4>

      {/* Selector Tabs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", borderBottom: "1px solid var(--color-border)", paddingBottom: "16px", marginBottom: "24px" }}>
        {Object.keys(screens).map((key) => {
          const isActive = activeScreen === key;
          return (
            <button
              key={key}
              onClick={() => setActiveScreen(key)}
              style={{
                padding: "10px 6px",
                border: "none",
                background: isActive ? "var(--color-text)" : "transparent",
                color: isActive ? "var(--color-surface)" : "var(--color-text-secondary)",
                borderRadius: "20px",
                fontWeight: isActive ? 700 : 500,
                fontSize: "13px",
                cursor: "pointer",
                textAlign: "center"
              }}
            >
              {screens[key as keyof typeof screens].name}
            </button>
          );
        })}
      </div>

      <div>
        <p style={{ margin: "0 0 20px 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
          {current.desc}
        </p>

        {/* Image Container */}
        <div style={{ border: "1px solid var(--color-border)", borderRadius: "8px", overflow: "hidden", background: "#111", display: "flex", justifyContent: "center" }}>
          <img
            src={current.src}
            alt={current.name}
            style={{ width: "100%", height: "auto", display: "block", maxHeight: "500px", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function FuelDesignSystemCaseStudy() {
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
            How I worked within Fuel, John Deere&apos;s enterprise design system, assembling 100+ screens from shared components, contributing to tokens and documentation, and building components to keep a complex B2B platform consistent.
          </p>

          <MetricsStrip />

          <Blockquote text="My contribution, precisely. I was not the original author of Fuel. I worked within it as a practitioner, assembling screens from existing components, building and extending several components, and contributing to tokens and documentation." />

          <h3 style={{ fontSize: "20px", fontWeight: 700, marginTop: "40px", marginBottom: "16px" }}>Proving design patterns at scale</h3>
          <p>
            John Deere&apos;s manufacturing organization runs a large internal platform for program planning, scheduling, and release management, the tool teams use to create programs, map production tools, track phase health, and compare releases. It is exactly the kind of data dense B2B product where visual and behavioral consistency is hard to hold across dozens of complex screens.
          </p>
          <p style={{ marginTop: "16px" }}>
            That consistency came from <strong>Fuel</strong>, John Deere&apos;s enterprise design system. My work lived inside Fuel: I assembled product screens from its shared library, built and extended components where the product needed patterns the library did not yet cover, and contributed back to its tokens and documentation so those additions stayed part of the system rather than drifting from it.
          </p>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 01: THE CHALLENGE                   */}
        {/* ============================================ */}
        <CaseStudySection
          id="challenge"
          heading="01: The Challenge"
        >
          <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>Holding consistency across complex paths</h3>
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
          heading="02: The Foundation"
        >
          <p>
            Fuel is specified at the foundational level, color, type, and a component library with defined states and redlined measurements for developer handoff. The system specification covers colors, type ramp (Source Sans Pro), buttons, tabs, forms, selection controls, notifications, breadcrumb, cards, graphs, tables, and date pickers.
          </p>

          <InteractiveSpecExplorer />

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "32px", margin: "40px 0", alignItems: "center" }}>
            <div style={{ border: "1px solid var(--color-border)", borderRadius: "8px", overflow: "hidden", background: "#111" }}>
              <img
                src="/assets/fuel/spec-sheet.jpg"
                alt="Fuel design system specification details"
                style={{ width: "100%", height: "auto", display: "block", maxHeight: "350px", objectFit: "contain" }}
              />
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Why redlines matter</h4>
              <p style={{ margin: "10px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                Each component carries pixel dimensions and every state (default, active, disabled, error, success). That is what makes a component <em>developer ready</em>, the spec, not just the picture, is the deliverable. Working within this discipline is the core of design system practice.
              </p>
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

          <SemanticTokenMapper />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "32px", margin: "40px 0", alignItems: "center" }}>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Systemic color decisions</h4>
              <p style={{ margin: "10px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                Tokens turn a visual decision into a systemic one. When warning is a token rather than a hex value copied into forty screens, changing it is one edit, and every screen stays correct. Contributing at this layer is where design system work stops being styling and becomes architecture.
              </p>
            </div>
            <div style={{ border: "1px solid var(--color-border)", borderRadius: "8px", overflow: "hidden", background: "#111" }}>
              <img
                src="/assets/fuel/tokens-colours.jpg"
                alt="Fuel color tokens mapping values"
                style={{ width: "100%", height: "auto", display: "block", maxHeight: "250px", objectFit: "contain" }}
              />
            </div>
          </div>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 04: SCREEN COMPOSITION              */}
        {/* ============================================ */}
        <CaseStudySection
          id="screens"
          heading="04: Building Within the System"
        >
          <p>
            Every product screen below is composed from Fuel components, cards, tables, tabs, forms, status chips, buttons, and breadcrumbs. The value of the system shows in how different these screens are in function yet how consistent they are in execution.
          </p>

          <ScreenCompositionExplorer />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginTop: "32px" }}>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "24px", borderRadius: "12px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Create Flow Screens</h4>
              <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginTop: "8px", lineHeight: "1.5" }}>
                Creating projects and program configurations is built on strict form alignment, using the form validation styles and spacing rules of the shared design system.
              </p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "24px", borderRadius: "12px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>My Part in Library Extension</h4>
              <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginTop: "8px", lineHeight: "1.5" }}>
                Assembling the screens from existing components, and building or extending several components where the product needed patterns Fuel did not yet cover, then bringing those additions back into the library.
              </p>
            </div>
          </div>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 05: IMPACT & METRICS                */}
        {/* ============================================ */}
        <CaseStudySection
          id="impact"
          heading="05: Impact"
        >
          <p>
            Working within Fuel rather than around it kept a large, multi team platform coherent and shipped faster.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", margin: "24px 0" }}>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid #367C2B" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "#367C2B" }}>100+</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>screens held to one consistent system, preventing design fragmentation.</p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid #367C2B" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "#367C2B" }}>6+</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>product teams aligned on shared component usage, scaling layout practices.</p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid #367C2B" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "#367C2B" }}>-25%</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>time to specification via developer ready components, speeding up release planning.</p>
            </div>
          </div>

          <div style={{ borderTop: "2px solid var(--color-text)", marginTop: "48px", paddingTop: "40px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>Key reflections</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Design system is a discipline of restraint</h4>
                <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                  The instinct as a designer is to make each screen its best self; the systems mindset is to make each screen consistent, and to invest the creativity into the components and tokens that every screen inherits. The leverage is not in the screen, it is in the library.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Contributing back keeps the system alive</h4>
                <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                  I learned that contributing back is what separates using a system from strengthening one. Building a component the product needed, then documenting it and returning it to Fuel so the next designer composes with it, is how a system stays alive instead of fragmenting. That governance instinct, build within constraints, extend deliberately, document always, is what I bring to an enterprise systems team.
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
