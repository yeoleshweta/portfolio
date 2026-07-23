"use client";

import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";

/* ─────────── Design tokens ─────────── */
const T = {
  green: "#367C2B",
  yellow: "#FFDE00",
  text: "#1c1b17",
  muted: "#6e6b60",
  border: "#e3e0d6",
  surface: "#f8f7f4",
  white: "#ffffff",
};

/* ─────────── Layout wrapper — constrains all content to readable max-width ─────────── */
function Wrap({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      maxWidth: "860px",
      margin: "0 auto",
      padding: "0 40px",
      width: "100%",
      boxSizing: "border-box" as const,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─────────── Shared primitives ─────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "JetBrains Mono, monospace",
      fontSize: "11px",
      letterSpacing: "0.18em",
      textTransform: "uppercase" as const,
      color: T.green,
      fontWeight: 600,
      marginBottom: "14px",
    }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: "var(--font-display)",
      fontSize: "clamp(24px, 3vw, 36px)",
      fontWeight: 800,
      lineHeight: 1.15,
      letterSpacing: "-0.02em",
      color: T.text,
      margin: "0 0 24px 0",
    }}>
      {children}
    </h2>
  );
}

function BodyText({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{
      fontSize: "16px",
      lineHeight: 1.75,
      color: T.muted,
      margin: "0 0 18px 0",
      ...style,
    }}>
      {children}
    </p>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote style={{
      borderLeft: `3px solid ${T.green}`,
      paddingLeft: "24px",
      margin: "32px 0",
      fontStyle: "italic",
      fontSize: "17px",
      lineHeight: 1.65,
      color: T.text,
      fontWeight: 500,
    }}>
      {children}
    </blockquote>
  );
}

function InsightItem({ num, title, text }: { num: string; title: string; text: string }) {
  return (
    <div style={{
      display: "flex",
      gap: "24px",
      alignItems: "flex-start",
      padding: "24px 0",
      borderBottom: `1px solid ${T.border}`,
    }}>
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: "32px",
        fontWeight: 900,
        color: T.border,
        lineHeight: 1,
        flexShrink: 0,
        width: "44px",
      }}>
        {num}
      </div>
      <div>
        <div style={{ fontSize: "15px", fontWeight: 700, color: T.text, marginBottom: "6px" }}>{title}</div>
        <p style={{ fontSize: "14.5px", lineHeight: 1.65, color: T.muted, margin: 0 }}>{text}</p>
      </div>
    </div>
  );
}

function KeyDecision({ title, rationale, text }: { title: string; rationale: string; text: string }) {
  return (
    <div style={{
      background: T.surface,
      borderLeft: `4px solid ${T.yellow}`,
      padding: "22px 26px",
      borderRadius: "0 6px 6px 0",
      margin: "28px 0",
    }}>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: T.green, fontWeight: 700, marginBottom: "8px" }}>Key Decision</div>
      <div style={{ fontSize: "15px", fontWeight: 700, color: T.text, marginBottom: "5px" }}>{title}</div>
      <div style={{ fontSize: "13px", color: T.muted, fontStyle: "italic", marginBottom: "10px" }}>Rationale: {rationale}</div>
      <p style={{ fontSize: "14.5px", lineHeight: 1.65, color: T.muted, margin: 0 }}>{text}</p>
    </div>
  );
}

/* Images — always full-width within their Wrap container */
function CsImage({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  const isSlice = src.includes("slice-");
  return (
    <div style={{ margin: "32px 0" }}>
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px", clipPath: isSlice ? "inset(1.5px)" : "none" }}
      />
      <div style={{ fontSize: "13px", color: T.muted, marginTop: "10px", fontStyle: "italic", lineHeight: 1.5 }}>
        {caption}
      </div>
    </div>
  );
}

function CsImageGrid2({ items }: { items: { src: string; alt: string; caption: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", margin: "32px 0" }}>
      {items.map((item, i) => {
        const isSlice = item.src.includes("slice-");
        return (
          <div key={i}>
            <img src={item.src} alt={item.alt} style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px", clipPath: isSlice ? "inset(1.5px)" : "none" }} />
            <div style={{ fontSize: "12.5px", color: T.muted, marginTop: "9px", fontStyle: "italic", lineHeight: 1.5 }}>{item.caption}</div>
          </div>
        );
      })}
    </div>
  );
}

function CsImageGrid3({ items }: { items: { src: string; alt: string; caption: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", margin: "32px 0" }}>
      {items.map((item, i) => {
        const isSlice = item.src.includes("slice-");
        return (
          <div key={i}>
            <img src={item.src} alt={item.alt} style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px", clipPath: isSlice ? "inset(1.5px)" : "none" }} />
            <div style={{ fontSize: "12px", color: T.muted, marginTop: "8px", fontStyle: "italic", lineHeight: 1.5 }}>{item.caption}</div>
          </div>
        );
      })}
    </div>
  );
}

function ImpactGrid() {
  const items = [
    { val: "100+", label: "Screens held to one consistent system" },
    { val: "6+", label: "Product teams aligned on shared components" },
    { val: "−25%", label: "Time to specification via developer-ready components" },
  ];
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "1px",
      background: T.border,
      border: `1px solid ${T.border}`,
      borderRadius: "8px",
      overflow: "hidden",
      margin: "32px 0",
    }}>
      {items.map((item, i) => (
        <div key={i} style={{ background: T.white, padding: "28px 24px" }}>
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "44px",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: T.green,
            lineHeight: 1,
            marginBottom: "10px",
          }}>
            {item.val}
          </div>
          <div style={{ fontSize: "13px", color: T.muted, lineHeight: 1.55 }}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ─────────── Section divider ─────────── */
function SectionDivider() {
  return <div style={{ borderTop: `1px solid ${T.border}` }} />;
}

/* ─────────── Sections nav ─────────── */
const sections = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "The Challenge" },
  { id: "userflow", label: "User Flows" },
  { id: "system", label: "The Design System" },
  { id: "tokens", label: "Token Layer" },
  { id: "anatomy", label: "Component Anatomy" },
  { id: "screens", label: "Screens" },
  { id: "impact", label: "Impact" },
];

/* ─────────── Password gate ─────────── */
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "deere2026") {
      localStorage.setItem("fuel_access", "deere2026");
      onUnlock();
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f3", padding: "24px" }}>
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: "12px", width: "100%", maxWidth: "440px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
        <div style={{ height: "6px", background: T.yellow }} />
        <div style={{ background: T.green, padding: "28px 24px", textAlign: "center" as const, color: T.white }}>
          <div style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" as const }}>John Deere</div>
          <div style={{ fontSize: "11px", marginTop: "5px", opacity: 0.75, fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.1em" }}>FUEL DESIGN SYSTEM</div>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: "36px 32px", display: "flex", flexDirection: "column" as const, gap: "20px" }}>
          <div style={{ textAlign: "center" as const }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: T.text, margin: "0 0 8px 0" }}>Protected Case Study</h3>
            <p style={{ fontSize: "13.5px", color: T.muted, margin: 0, lineHeight: 1.55 }}>
              This case study contains proprietary materials under NDA. Please enter the password to view.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "6px" }}>
            <input
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: "12px 16px", border: `1px solid ${T.border}`, borderRadius: "4px", fontSize: "14px", outline: "none", width: "100%", color: T.text, boxSizing: "border-box" as const }}
              onFocus={(e) => { e.target.style.borderColor = T.green; }}
              onBlur={(e) => { e.target.style.borderColor = T.border; }}
            />
            {error && <span style={{ fontSize: "12.5px", color: "#b91c1c", fontWeight: 600 }}>{error}</span>}
          </div>
          <button
            type="submit"
            style={{ background: T.yellow, color: T.text, border: "none", padding: "14px", borderRadius: "4px", fontWeight: 700, fontSize: "13px", textTransform: "uppercase" as const, letterSpacing: "0.1em", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#e5c800"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = T.yellow; }}
          >
            Unlock Case Study
          </button>
        </form>
      </div>
    </main>
  );
}

/* ─────────── Main page ─────────── */
export default function FuelDesignSystemCaseStudy() {
  const [unlocked, setUnlocked] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("fuel_access") === "deere2026") {
      setUnlocked(true);
    }
  }, []);

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <CaseStudyLayout sections={sections}>

      {/* ════════════════════════════════════════════════════ */}
      {/*  HERO                                               */}
      {/* ════════════════════════════════════════════════════ */}
      <section style={{ paddingTop: "56px", paddingBottom: "0", background: T.white, borderBottom: `1px solid ${T.border}` }}>
        <Wrap>
          {/* Company tag */}
          <div style={{ display: "inline-block", background: T.green, color: T.white, fontFamily: "JetBrains Mono, monospace", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" as const, padding: "5px 12px", borderRadius: "2px", marginBottom: "24px" }}>
            John Deere
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: T.text,
            margin: "0 0 36px 0",
          }}>
            Building at Scale Inside John Deere&apos;s Enterprise Design System
          </h1>

          {/* Meta strip */}
          <div style={{ display: "flex", gap: "0", borderTop: `1px solid ${T.border}`, flexWrap: "wrap" as const }}>
            {[
              { label: "Project", value: "B2B Enterprise Platform" },
              { label: "Role", value: "UI/UX Designer" },
              { label: "System", value: "Fuel (John Deere)" },
              { label: "Tools", value: "Figma" },
            ].map((m, i) => (
              <div key={m.label} style={{ padding: "18px 32px 18px 0", marginRight: "32px", borderRight: i < 3 ? `1px solid ${T.border}` : "none", paddingRight: i < 3 ? "32px" : "0" }}>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: T.muted, marginBottom: "4px" }}>{m.label}</div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: T.text }}>{m.value}</div>
              </div>
            ))}
          </div>
        </Wrap>

      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  OVERVIEW                                           */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="overview" style={{ padding: "72px 0 64px", background: T.white }}>
        <Wrap>
          <SectionLabel>Overview</SectionLabel>
          <SectionTitle>A sprawling B2B platform. One design system to hold it together.</SectionTitle>

          <BodyText>
            John Deere&apos;s internal manufacturing platform — Common Segmentation — spans program creation, scheduling, release management, system exports, and compliance documentation. Over 100 screens across 6+ product teams, each dense with tables, forms, status chips, Gantt charts, and comparison views.
          </BodyText>
          <BodyText>
            <strong>Fuel</strong> is John Deere&apos;s enterprise design system — the shared component library, token layer, and documentation that keeps the product consistent across all those teams. My role: design within Fuel, contribute to it, and extend it where the product needed patterns the library didn&apos;t yet cover.
          </BodyText>

          <PullQuote>
            &ldquo;My contribution, precisely. I was not the original author of Fuel. I worked within it — assembling screens from existing components, building and extending several, and contributing back to tokens and documentation so additions stayed part of the system.&rdquo;
          </PullQuote>

          <ImpactGrid />
        </Wrap>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  THE CHALLENGE                                      */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="challenge" style={{ padding: "64px 0", background: T.white }}>
        <Wrap>
          <SectionDivider />
          <div style={{ paddingTop: "56px" }}>
            <SectionLabel>The Challenge</SectionLabel>
            <SectionTitle>Without a shared system, three failure modes appear fast.</SectionTitle>

            <BodyText>
              The platform spans creation flows (Program, Project, System), dashboards, health cards, comparison views, reports, and modals — well over a hundred screens. Without a system anchoring every team, the product falls apart in predictable ways.
            </BodyText>

            <div style={{ marginTop: "8px" }}>
              <InsightItem
                num="01"
                title="Visual drift"
                text="Every team styles buttons, tables, and forms slightly differently. The product stops feeling like one tool — users navigate between micro-inconsistencies on every screen."
              />
              <InsightItem
                num="02"
                title="Redesign debt"
                text="New features get designed from scratch instead of composed from a library. Work multiplies, inconsistency compounds, and every sprint starts from zero rather than from a foundation."
              />
              <InsightItem
                num="03"
                title="Slow, ambiguous handoff"
                text="Without documented components with redlined measurements and defined states, engineering reinterprets the same patterns repeatedly — and specs become conversations instead of deliverables."
              />
            </div>

            <KeyDecision
              title="Make the right pattern the easy pattern"
              rationale="Fuel exists so a new screen is an act of assembly, not invention."
              text="The system defines components, tokens, and states so that the fastest way to build a screen is also the correct way. That constraint turns consistency from a discipline into a default."
            />
          </div>
        </Wrap>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  USER FLOWS                                         */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="userflow" style={{ padding: "64px 0", background: T.white }}>
        <Wrap>
          <SectionDivider />
          <div style={{ paddingTop: "56px" }}>
            <SectionLabel>User Flows &amp; Research</SectionLabel>
            <SectionTitle>Mapping 20+ jobs-to-be-done across the platform.</SectionTitle>

            <BodyText>
              Before assembling screens, we mapped the full scope of the product — every flow from log-in to action completion. The platform serves multiple roles: program managers uploading SDF files, engineers defining releases, administrators assigning EPH roles, and translators managing localisation. Each job has a distinct flow with different touchpoints.
            </BodyText>

            <CsImage
              src="/assets/fuel/hires-userflows.jpg?v=3"
              alt="User flow map for the Common Segmentation platform"
              caption="Fig: Complete user flow map — 20+ jobs-to-be-done across Upload, Release, Export, Translation, and Admin flows. Color-coded by complexity and EPH selection requirements."
            />

            <BodyText>
              The color-coding (red-yellow-green circles) indicates effort and complexity per task. EPH selection — the pivot point for most flows — is highlighted in yellow throughout, because it was the most common source of user error in early testing.
            </BodyText>

            <CsImageGrid2
              items={[
                {
                  src: "/assets/fuel/hires-program-details.jpg?v=3",
                  alt: "Program details screen",
                  caption: "Fig: Program Details — Organization, Team, Program, and Tool Mapping sections. Each field group is a Fuel card component with defined padding and section hierarchy.",
                },
                {
                  src: "/assets/fuel/hires-create-project.jpg?v=3",
                  alt: "Create project flow",
                  caption: "Fig: Create Project — dense multi-section form assembled entirely from Fuel form fields, dropdowns, section cards, and side navigation.",
                },
              ]}
            />
          </div>
        </Wrap>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  THE DESIGN SYSTEM                                  */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="system" style={{ padding: "64px 0", background: T.white }}>
        <Wrap>
          <SectionDivider />
          <div style={{ paddingTop: "56px" }}>
            <SectionLabel>The Design System</SectionLabel>
            <SectionTitle>Fuel is specified at every layer — from variables to screen.</SectionTitle>

            <BodyText>
              Fuel is a full-stack design system: design tokens (colors, spacing, type), a primitive component library (buttons, inputs, badges, tables), and higher-order compositions (cards, toolbars, sidebars). Every component is documented with states — default, active, disabled, error, success — and redlined with pixel measurements for developer handoff.
            </BodyText>
            <BodyText>
              Working within Fuel meant I was always composing, not inventing. My judgment was applied to which components assembled into a screen that served the user&apos;s job — not to re-specifying every pixel from scratch.
            </BodyText>

            <CsImageGrid2
              items={[
                {
                  src: "/assets/fuel/slice-11.jpg?v=3",
                  alt: "Color system",
                  caption: "Fig: Color System — Primary brand colors, semantic UI messaging (success, warning, error), and neutral scales mapped as tokens.",
                },
                {
                  src: "/assets/fuel/slice-12.jpg?v=3",
                  alt: "Typography scale",
                  caption: "Fig: Typography — Font families, heading scales, body sizes, and line-heights fully specified for developer handoff.",
                },
              ]}
            />

            <BodyText>
              <strong>2. Controls &amp; Inputs</strong>
            </BodyText>
            
            <CsImageGrid2
              items={[
                {
                  src: "/assets/fuel/slice-1.jpg?v=3",
                  alt: "Button components",
                  caption: "Fig: Buttons — Primary, secondary, and tertiary styles with active, disabled, and hover states defined.",
                },
                {
                  src: "/assets/fuel/slice-8.jpg?v=3",
                  alt: "Selection controls",
                  caption: "Fig: Selection Controls — Checkboxes, radio buttons, and toggles to handle boolean inputs consistently.",
                },
              ]}
            />

            <CsImageGrid2
              items={[
                {
                  src: "/assets/fuel/slice-9.jpg?v=3",
                  alt: "Form components",
                  caption: "Fig: Forms — Text inputs, dropdowns, and textareas showing focus, filled, and error states.",
                },
                {
                  src: "/assets/fuel/slice-2.jpg?v=3",
                  alt: "Date Picker",
                  caption: "Fig: Date Picker — Standardized calendar inputs for scheduling and phase planning.",
                },
              ]}
            />

            <BodyText>
              <strong>3. Navigation &amp; Feedback</strong>
            </BodyText>
            
            <CsImageGrid3
              items={[
                {
                  src: "/assets/fuel/slice-10.jpg?v=3",
                  alt: "Tab navigation",
                  caption: "Fig: Tabs — Used for switching contexts within complex dashboard views.",
                },
                {
                  src: "/assets/fuel/slice-6.jpg?v=3",
                  alt: "Breadcrumbs",
                  caption: "Fig: Breadcrumbs — Ensuring clear hierarchical navigation across multi-step flows.",
                },
                {
                  src: "/assets/fuel/slice-7.jpg?v=3",
                  alt: "Notifications",
                  caption: "Fig: Notifications — System alerts, toast messages, and inline feedback patterns.",
                },
              ]}
            />

            <BodyText>
              <strong>4. Data Display &amp; Layout</strong>
            </BodyText>

            <CsImageGrid2
              items={[
                {
                  src: "/assets/fuel/slice-0.jpg?v=3",
                  alt: "Table components",
                  caption: "Fig: Tables — The workhorse of the B2B platform. Handles sorting, selection, and dense data displays.",
                },
                {
                  src: "/assets/fuel/slice-3.jpg?v=3",
                  alt: "Graph components",
                  caption: "Fig: Graphs — Standardized data visualization components for reporting dashboards.",
                },
              ]}
            />

            <CsImage
              src="/assets/fuel/slice-5.jpg?v=3"
              alt="Launchpad Cards"
              caption="Fig: Launchpad Cards — Entry points for different system modules and applications."
            />

            <CsImage
              src="/assets/fuel/slice-4.jpg?v=3"
              alt="Dashboard Cards"
              caption="Fig: Dashboard Cards — Modular containers for KPIs and status summaries. Placed full-width to prevent uneven blank space."
            />

            <KeyDecision
              title="Developer-ready specs are the deliverable, not just the picture"
              rationale="A design without redlines is a conversation starter; a design with them is a handoff."
              text="Each component carries exact pixel dimensions, spacing values, font weights, and all states. That is what makes a component developer-ready — and what cut specification time by 25% across the project lifecycle."
            />
          </div>
        </Wrap>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  TOKEN LAYER                                        */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="tokens" style={{ padding: "64px 0", background: T.white }}>
        <Wrap>
          <SectionDivider />
          <div style={{ paddingTop: "56px" }}>
            <SectionLabel>Token Layer</SectionLabel>
            <SectionTitle>Status expressed once, inherited everywhere.</SectionTitle>

            <BodyText>
              Beneath the visible components sits a tokenized color system — semantic names mapped to values, so a status color is defined once and inherited everywhere. I contributed to this layer: mapping process and sub-process status colors to Fuel&apos;s messaging tokens (success, info, warning, error) so that state was expressed consistently across dashboards, health cards, and comparison views.
            </BodyText>

            <CsImage
              src="/assets/fuel/hires-tokens-colours.png"
              alt="Sub-process color tokens mapped to Fuel messaging color names"
              caption="Fig: Sub-process color tokens — each process phase mapped to a Fuel semantic messaging token. When warning changes, every screen inherits the update automatically."
            />

            <BodyText>
              Tokens turn a visual decision into a systemic one. When{" "}
              <code style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "13px", background: T.surface, padding: "2px 6px", borderRadius: "3px" }}>
                fuel-color-status-warning
              </code>{" "}
              is a token rather than a hex value copied into forty screens, changing it is one edit — and every table row, status chip, and health card stays correct automatically.
            </BodyText>

            <PullQuote>
              &ldquo;Tokens turn a visual decision into a systemic one. The leverage is not in the screen — it is in the library.&rdquo;
            </PullQuote>
          </div>
        </Wrap>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  COMPONENT ANATOMY                                  */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="anatomy" style={{ padding: "64px 0", background: T.white }}>
        <Wrap>
          <SectionDivider />
          <div style={{ paddingTop: "56px" }}>
            <SectionLabel>Component Anatomy</SectionLabel>
            <SectionTitle>How a Fuel component actually gets built.</SectionTitle>

            <BodyText>
              The interactive below reconstructs the full workflow in Figma&apos;s own visual language — watch a button go from variables to frame, auto layout, token binding, variants, composition, and finally into screens. It uses Fuel&apos;s real values: the 150×48 redline, Source Sans Pro, and{" "}
              <code style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "13px", background: T.surface, padding: "2px 6px", borderRadius: "3px" }}>
                fuel-color-background-action-primary
              </code>.
            </BodyText>

          </div>
        </Wrap>

        {/* Full-width container for interactive anatomy walkthrough */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
          <iframe
            src="/assets/fuel/fuel-component-anatomy.html"
            width="100%"
            height="720"
            style={{ border: `1px solid ${T.border}`, borderRadius: "8px", background: T.white, display: "block", margin: "28px 0 10px", boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }}
            title="How a Fuel component is built — from variables to screens"
            loading="lazy"
          />
          <div style={{ fontSize: "14px", color: T.muted, fontStyle: "italic", textAlign: "center" as const, marginBottom: "16px" }}>
            Interactive walkthrough — press play or step through the seven stages. Stage 4 is the key beat: the fill stops being a hex value and becomes a bound variable.
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  SCREENS                                            */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="screens" style={{ padding: "64px 0", background: T.white }}>
        <Wrap>
          <SectionDivider />
          <div style={{ paddingTop: "56px" }}>
            <SectionLabel>Building Within the System</SectionLabel>
            <SectionTitle>100+ screens composed from one shared library.</SectionTitle>

            <BodyText>
              Every screen below is assembled from Fuel components — cards, tables, tabs, forms, status chips, buttons, breadcrumbs. The value of the system shows in how different these screens are in function, yet how consistent they are in execution.
            </BodyText>

            <div style={{ margin: "48px -40px" }}>
              <CsImage
                src="/assets/fuel/hires-dashboard.jpg?v=3"
                alt="Common Segmentation program dashboard"
                caption="Fig: Program dashboard — health cards, status indicators (messaging tokens in action), linked data tables, and toolbar actions, all composed from library components."
              />
            </div>

            <CsImageGrid2
              items={[
                {
                  src: "/assets/fuel/hires-schedule.jpg?v=3",
                  alt: "Schedule view with Gantt chart",
                  caption: "Fig: Schedule — Gantt-style phase view showing program phases across 2022–2023. Phase bars use the sub-process color tokens.",
                },
                {
                  src: "/assets/fuel/hires-compare-releases.jpg?v=3",
                  alt: "Release comparison view",
                  caption: "Fig: Release comparison — two releases shown side by side using the same Fuel table, form, and status components.",
                },
              ]}
            />

            <div style={{ margin: "48px -40px" }}>
              <CsImage
                src="/assets/fuel/hires-userflows.jpg?v=3"
                alt="Figma board interactions and logic flows"
                caption="Fig: Figma Board Overview — showing how components, cards, and page modules link together across the platform with interaction flows."
              />
            </div>

            <PullQuote>
              &ldquo;My part across these screens: assembling from existing components, and building or extending several where the product needed patterns Fuel didn&apos;t yet cover — then contributing those additions back with documentation so they became reusable, not one-offs.&rdquo;
            </PullQuote>
          </div>
        </Wrap>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  IMPACT                                             */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="impact" style={{ padding: "64px 0 80px", background: T.white }}>
        <Wrap>
          <SectionDivider />
          <div style={{ paddingTop: "56px" }}>
            <SectionLabel>Outcome &amp; Impact</SectionLabel>
            <SectionTitle>Working within Fuel kept a large, multi-team platform coherent — and shipped faster.</SectionTitle>

            <ImpactGrid />

            <BodyText>
              The system approach meant new screens were acts of composition, not invention. Design decisions were made at the token and component level, so every screen inherited them automatically. Engineering handoff was faster because specs were complete — redlined components with defined states, not vague intent.
            </BodyText>

            <div style={{ marginTop: "8px" }}>
              <InsightItem
                num="01"
                title="Consistency at scale"
                text="Dashboards, creation flows, schedule views, reports, and comparison screens all read as one product because they share components and tokens. No screen is an island."
              />
              <InsightItem
                num="02"
                title="Faster engineering handoff"
                text="Redlined, state-documented components meant engineers could implement without reinterpreting every pattern. Specification became a deliverable, not a conversation."
              />
              <InsightItem
                num="03"
                title="A system that stays alive"
                text="Contributing extensions back to Fuel with documentation is what separates using a system from strengthening one. Each addition became reusable for the next designer — not a one-off."
              />
            </div>

            {/* Reflections */}
            <div style={{ marginTop: "56px", paddingTop: "48px", borderTop: `1px solid ${T.border}` }}>
              <SectionLabel>Reflections</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "28px", marginTop: "8px" }}>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: T.text, marginBottom: "8px" }}>Design system work is a discipline of restraint</div>
                  <BodyText>
                    The instinct as a designer is to make each screen its best self. The systems mindset is to make each screen consistent, and to invest creativity into the components and tokens that every screen inherits. The leverage is not in the screen — it is in the library.
                  </BodyText>
                </div>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: T.text, marginBottom: "8px" }}>Contributing back separates users from strengtheners</div>
                  <BodyText>
                    Building a component the product needed, then documenting it and returning it to Fuel so the next designer composes with it — that is how a system stays alive instead of fragmenting. That governance instinct: build within constraints, extend deliberately, document always.
                  </BodyText>
                </div>
              </div>
            </div>

            {/* Confidentiality note */}
            <div style={{ marginTop: "48px", padding: "18px 22px", background: T.surface, borderRadius: "6px", border: `1px solid ${T.border}`, fontSize: "12.5px", color: T.muted, fontStyle: "italic", textAlign: "center" as const, lineHeight: 1.6 }}>
              Fuel Design System · John Deere — confidential work shared under access control. Screen content uses prototype data. Prepared as a portfolio case study under NDA.
            </div>
          </div>
        </Wrap>
      </section>

    </CaseStudyLayout>
  );
}
