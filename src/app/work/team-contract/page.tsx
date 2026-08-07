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

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontFamily: "var(--font-display)",
      fontSize: "20px",
      fontWeight: 700,
      letterSpacing: "-0.01em",
      color: T.text,
      margin: "48px 0 16px 0",
    }}>
      {children}
    </h3>
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

function PullQuote({ children, cite }: { children: React.ReactNode; cite?: string }) {
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
      {cite && (
        <cite style={{
          display: "block",
          marginTop: "10px",
          fontStyle: "normal",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "11.5px",
          letterSpacing: "0.08em",
          color: T.muted,
        }}>
          — {cite}
        </cite>
      )}
    </blockquote>
  );
}

/* Cluster of short verbatims from the research board */
function QuoteList({ quotes }: { quotes: string[] }) {
  return (
    <div style={{
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderLeft: `3px solid ${T.green}`,
      borderRadius: "0 6px 6px 0",
      padding: "20px 26px",
      margin: "28px 0",
    }}>
      {quotes.map((q, i) => (
        <div key={i} style={{
          fontStyle: "italic",
          fontSize: "15.5px",
          lineHeight: 1.6,
          color: T.text,
          fontWeight: 500,
          padding: "7px 0",
          borderBottom: i < quotes.length - 1 ? `1px solid ${T.border}` : "none",
        }}>
          &ldquo;{q}&rdquo;
        </div>
      ))}
    </div>
  );
}

/* ─────────── Images ───────────
   Every asset is rendered through Figure. While an export is missing,
   pass pending — a clearly-styled placeholder shows the expected
   filename and intended content so gaps stay visible. Once the file
   exists in /public/assets/team-contract/, remove `pending`. */
function Figure({
  filename,
  alt,
  caption,
  intent,
  pending = false,
  width = 1600,
  height = 1000,
}: {
  filename: string;
  alt: string;
  caption: string;
  intent?: string;
  pending?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    <figure style={{ margin: "36px 0" }}>
      {pending ? (
        <div style={{
          border: `2px dashed ${T.border}`,
          borderRadius: "8px",
          background: T.surface,
          aspectRatio: `${width} / ${height}`,
          display: "flex",
          flexDirection: "column" as const,
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "32px",
          textAlign: "center" as const,
          boxSizing: "border-box" as const,
        }}>
          <div style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase" as const,
            color: T.green,
            fontWeight: 700,
          }}>
            Image pending
          </div>
          <div style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "13px",
            color: T.text,
            fontWeight: 600,
            wordBreak: "break-all" as const,
          }}>
            {filename}
          </div>
          {intent && (
            <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: T.muted, margin: 0, maxWidth: "480px" }}>
              {intent}
            </p>
          )}
        </div>
      ) : (
        <img
          src={`/assets/team-contract/${filename}`}
          alt={alt}
          loading="lazy"
          width={width}
          height={height}
          style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px" }}
        />
      )}
      <figcaption style={{ fontSize: "13px", color: T.muted, marginTop: "10px", fontStyle: "italic", lineHeight: 1.5 }}>
        {caption}
      </figcaption>
    </figure>
  );
}

/* ─────────── Tables ───────────
   Horizontal-scroll container so wide tables never overflow the
   viewport; the scroll hint is only shown below the breakpoint. */
function TableStyles() {
  return (
    <style>{`
      .tc-table-wrap {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        border: 1px solid ${T.border};
        border-radius: 8px;
      }
      .tc-table-wrap:focus-visible {
        outline: 2px solid ${T.green};
        outline-offset: 2px;
      }
      .tc-scroll-hint { display: none; }
      @media (max-width: 720px) {
        .tc-scroll-hint {
          display: block;
          font-family: "JetBrains Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: ${T.muted};
          margin-bottom: 8px;
        }
      }
    `}</style>
  );
}

function ScrollTable({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ margin: "32px 0" }}>
      <div className="tc-scroll-hint" aria-hidden="true">← swipe to scroll →</div>
      <div className="tc-table-wrap" role="region" aria-label={label} tabIndex={0}>
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: "620px", background: T.white }}>
          {children}
        </table>
      </div>
    </div>
  );
}

function Th({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <th scope="col" style={{
      fontFamily: "JetBrains Mono, monospace",
      fontSize: "10.5px",
      letterSpacing: "0.14em",
      textTransform: "uppercase" as const,
      color: T.muted,
      fontWeight: 700,
      textAlign: "left" as const,
      padding: "14px 18px",
      background: T.surface,
      borderBottom: `2px solid ${T.border}`,
      ...style,
    }}>
      {children}
    </th>
  );
}

function Td({ children, strong = false }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <td style={{
      fontSize: "14.5px",
      lineHeight: 1.6,
      color: strong ? T.text : T.muted,
      fontWeight: strong ? 600 : 400,
      padding: "14px 18px",
      borderBottom: `1px solid ${T.border}`,
      verticalAlign: "top" as const,
    }}>
      {children}
    </td>
  );
}

/* ─────────── Section divider ─────────── */
function SectionDivider() {
  return <div style={{ borderTop: `1px solid ${T.border}` }} />;
}

/* ─────────── Sections nav ─────────── */
const sections = [
  { id: "overview", label: "Summary" },
  { id: "problem", label: "The Problem" },
  { id: "research", label: "Research" },
  { id: "findings", label: "What We Learned" },
  { id: "decisions", label: "Findings to Decisions" },
  { id: "design", label: "The Design" },
  { id: "fuel", label: "Fuel Design System" },
  { id: "reflection", label: "Reflection" },
];

/* ─────────── Password gate ─────────── */
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "deere2026") {
      localStorage.setItem("team_contract_access", "deere2026");
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
          <div style={{ fontSize: "11px", marginTop: "5px", opacity: 0.75, fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.1em" }}>TEAM CONTRACT</div>
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
export default function TeamContractCaseStudy() {
  const [unlocked, setUnlocked] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("team_contract_access") === "deere2026") {
      setUnlocked(true);
    }
  }, []);

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <CaseStudyLayout sections={sections}>
      <TableStyles />

      {/* ════════════════════════════════════════════════════ */}
      {/*  HERO                                               */}
      {/* ════════════════════════════════════════════════════ */}
      <section style={{ paddingTop: "120px", paddingBottom: "0", background: T.white, borderBottom: `1px solid ${T.border}` }}>
        <Wrap>
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
            margin: "0 0 20px 0",
          }}>
            Team Contract — Making Program Metrics Defensible
          </h1>

          <p style={{ fontSize: "17px", lineHeight: 1.7, color: T.muted, margin: "0 0 36px 0", maxWidth: "680px" }}>
            Research-led redesign of John Deere&apos;s program metrics tool — making numbers defensible to leadership.
          </p>

          {/* Meta strip */}
          <div style={{ display: "flex", gap: "0", borderTop: `1px solid ${T.border}`, flexWrap: "wrap" as const }}>
            {[
              { label: "Organisation", value: "John Deere · Manufacturing / PDP" },
              { label: "Role", value: "UX Research & Product Design" },
              { label: "Design System", value: "Fuel (John Deere)" },
              { label: "Product", value: "Team Contract" },
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
      {/*  SUMMARY                                            */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="overview" style={{ padding: "72px 0 64px", background: T.white }}>
        <Wrap>
          <SectionLabel>Summary</SectionLabel>
          <SectionTitle>Used, but not trusted.</SectionTitle>

          <BodyText>
            Team Contract is the internal application John Deere program managers use to record and report the metrics a product development program is accountable for — cost, schedule, quality, reliability, and risk — across six PDP phases.
          </BodyText>
          <BodyText>
            It was being used, but not trusted. Program managers described it as <em>&ldquo;a tedious data entry tool&rdquo;</em> that produced a static snapshot with no history and no explanation of where numbers came from. The most telling workaround: PMs were <strong>screenshotting the tool and pasting it into PowerPoint</strong> because the tool itself couldn&apos;t produce something they were willing to show leadership.
          </BodyText>
          <BodyText>
            I ran the research that reframed the problem — from &ldquo;add more features&rdquo; to &ldquo;make the numbers defensible&rdquo; — and designed the changes that followed.
          </BodyText>

          <Figure
            filename="01-hero-team-contract-overview.png"
            alt="Team Contract program overview screen showing program health cards, metric status indicators, and reporting entry points"
            caption="Team Contract — final program overview."
            intent="Hero shot — the finished program overview screen. The most polished single screen from the design file."
            pending
          />
        </Wrap>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  THE PROBLEM                                        */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="problem" style={{ padding: "64px 0", background: T.white }}>
        <Wrap>
          <SectionDivider />
          <div style={{ paddingTop: "56px" }}>
            <SectionLabel>The Problem</SectionLabel>
            <SectionTitle>Friction at both ends of its own workflow.</SectionTitle>

            <BodyText>
              Team Contract sat at the centre of program reporting but generated friction at both ends of its own workflow.
            </BodyText>
            <BodyText>
              <strong>Entering data was expensive.</strong> Metrics were numerous, validation was aggressive and unclear, and much of the input was manual. One participant described chasing colleagues for numbers: <em>&ldquo;Tedious to go and ask people to add data.&rdquo;</em>
            </BodyText>
            <BodyText>
              <strong>The output wasn&apos;t usable.</strong> What came out was a point-in-time snapshot — no trends, no change history, no context for why a number looked the way it did. A red metric on a dashboard, with no history and no provenance, is not a conversation a PM can win.
            </BodyText>

            <PullQuote cite="Program Management Group (P7–P9) session">
              &ldquo;Difficulty in explaining red metrics to senior leadership without context.&rdquo;
            </PullQuote>

            <PullQuote>
              &ldquo;Program managers don&apos;t know how calculations are done or where they come from.&rdquo;
            </PullQuote>

            <BodyText>
              The consequence: effort went in, but the artefact leadership actually saw was a screenshot in a slide deck. The tool was doing the work and getting none of the credit — and PMs carried the risk.
            </BodyText>

            <PullQuote>
              &ldquo;Program manager takes blame for issues.&rdquo;
            </PullQuote>
          </div>
        </Wrap>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  RESEARCH                                           */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="research" style={{ padding: "64px 0", background: T.white }}>
        <Wrap>
          <SectionDivider />
          <div style={{ paddingTop: "56px" }}>
            <SectionLabel>Research</SectionLabel>
            <SectionTitle>Five sessions, nine participants, one shared board.</SectionTitle>

            <BodyText>
              <strong>Method:</strong> 5 semi-structured interview sessions with 9 participants across the roles that touch a team contract — Product Owner, Program Managers, and engineering/corporate stakeholders. Sessions were recorded, transcribed, and synthesised on a shared FigJam board.
            </BodyText>

            <SubHeading>Participants</SubHeading>

            <ScrollTable label="Research participants by session and role">
              <thead>
                <tr>
                  <Th style={{ width: "90px" }}>Session</Th>
                  <Th>Participants</Th>
                  <Th>Role perspective</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td strong>1</Td>
                  <Td>Product Owner (P1)</Td>
                  <Td>Product Owner</Td>
                </tr>
                <tr>
                  <Td strong>2</Td>
                  <Td>Program Manager (P2)</Td>
                  <Td>Program Manager</Td>
                </tr>
                <tr>
                  <Td strong>3</Td>
                  <Td>Program Manager (P3)</Td>
                  <Td>Program Manager (6–8 yrs using TC)</Td>
                </tr>
                <tr>
                  <Td strong>4</Td>
                  <Td>Engineering &amp; Corporate Stakeholders (P4–P6)</Td>
                  <Td>Engineering / corporate monitoring</Td>
                </tr>
                <tr>
                  <Td strong>5</Td>
                  <Td>Program Management Group (P7–P9)</Td>
                  <Td>Program management group</Td>
                </tr>
              </tbody>
            </ScrollTable>

            <Figure
              filename="02-research-board-sessions.png"
              alt="Zoomed-out FigJam research board showing five interview session sections filled with sticky-note observations"
              caption="Research board — 5 interview sessions."
              intent="Zoomed-out view of the 5 interview sections on the FigJam board, showing the scale of the research."
              pending
            />

            <SubHeading>Synthesis</SubHeading>
            <BodyText>
              ~230 observations were affinity-mapped into four lenses — <strong>Current Status</strong> (what the tool does today), <strong>Confusion</strong> (where understanding breaks), <strong>Reaction</strong> (how users feel about it), and <strong>Improvement</strong> (what they ask for) — then reduced to a prioritised set of actionable items.
            </BodyText>

            <Figure
              filename="03-affinity-clusters.png"
              alt="Affinity map with four labelled columns of clustered sticky notes: Confusion, Reaction, Improvement, and Current Status"
              caption="Affinity mapping — Confusion, Reaction, Improvement, Current Status."
              intent="The four affinity columns: Confusion / Reaction / Improvement / Current Status."
              pending
            />

            <BodyText>
              Splitting <em>Confusion</em> from <em>Reaction</em> mattered. Confusion pointed at interface and information problems I could design against. Reaction pointed at a credibility problem — users disliked the tool not because it was hard, but because the effort didn&apos;t come back to them as value. Those needed different responses.
            </BodyText>
          </div>
        </Wrap>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  WHAT WE LEARNED                                    */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="findings" style={{ padding: "64px 0", background: T.white }}>
        <Wrap>
          <SectionDivider />
          <div style={{ paddingTop: "56px" }}>
            <SectionLabel>What We Learned</SectionLabel>
            <SectionTitle>Five findings, in the participants&apos; own words.</SectionTitle>

            <SubHeading>1. The tool captured state, not change</SubHeading>
            <BodyText>
              The single most repeated gap. Team Contract showed where a metric stood, never how it got there.
            </BodyText>
            <QuoteList quotes={[
              "Static view, snapshot of current status.",
              "No historical data.",
              "Difficulty tracking value changes.",
              "Missing historical context.",
            ]} />
            <BodyText>
              Without history, a metric turning red is an accusation rather than information. Participants asked repeatedly for trends, change history, and — notably — the <em>reason</em> a value changed, not just the value.
            </BodyText>
            <PullQuote>
              &ldquo;Desire for change comments feature.&rdquo;
            </PullQuote>

            <SubHeading>2. Validation obstructed instead of guiding</SubHeading>
            <BodyText>
              Validation was experienced as an obstacle course: errors surfaced late, were hard to locate, and were written in language that didn&apos;t explain the fix.
            </BodyText>
            <QuoteList quotes={[
              "Validations causing errors when saving.",
              "Challenges in finding validation problems in Team Contract.",
              "Confusion in error message interpretation.",
              "Too many validations.",
            ]} />

            <SubHeading>3. Users didn&apos;t know what a field wanted</SubHeading>
            <BodyText>
              Metric definitions were inconsistent across the organisation, so the same field was filled differently by different teams — which quietly undermined every roll-up report built on top of it.
            </BodyText>
            <PullQuote cite="Program Manager (P2)">
              &ldquo;What is meant by upper &amp; lower bounds, and what data should be added there.&rdquo;
            </PullQuote>
            <QuoteList quotes={[
              "Need for better metric definitions.",
              "Metrics without context create confusion.",
            ]} />

            <SubHeading>4. One structure didn&apos;t fit every program</SubHeading>
            <BodyText>
              Programs differ by product line, scale, and season. A fixed metric set forced irrelevant fields on some programs and omitted what others needed.
            </BodyText>
            <QuoteList quotes={[
              "Not a one tool fits all.",
              "Inflexible team contract structure.",
              "Customizable metric selection for specific programs.",
              "Effort for entering data might not benefit all programs equally.",
            ]} />

            <SubHeading>5. The workarounds told us what was missing</SubHeading>
            <BodyText>
              Where a tool fails, people build around it — and the workaround is a specification.
            </BodyText>

            <ScrollTable label="Workarounds observed and what each revealed">
              <thead>
                <tr>
                  <Th>Workaround observed</Th>
                  <Th>What it revealed</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td strong>Screenshotting TC into presentations</Td>
                  <Td>Reporting output wasn&apos;t presentation-ready</Td>
                </tr>
                <tr>
                  <Td strong>Parallel tracking in Power BI, Tableau, spreadsheets, SharePoint</Td>
                  <Td>Visualisation and flexibility gaps</Td>
                </tr>
                <tr>
                  <Td strong>Manually chasing colleagues for updates</Td>
                  <Td>No nudge or reminder mechanism</Td>
                </tr>
                <tr>
                  <Td strong>Separate personal scorecards</Td>
                  <Td>Metric set didn&apos;t match real accountability</Td>
                </tr>
              </tbody>
            </ScrollTable>
          </div>
        </Wrap>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  FROM FINDINGS TO DESIGN DECISIONS                  */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="decisions" style={{ padding: "64px 0", background: T.white }}>
        <Wrap>
          <SectionDivider />
          <div style={{ paddingTop: "56px" }}>
            <SectionLabel>From Findings to Design Decisions</SectionLabel>
            <SectionTitle>Each design move traces to a specific finding.</SectionTitle>

            <BodyText>
              Each design move traces to a specific finding rather than a feature request.
            </BodyText>

            <ScrollTable label="Design decisions traced to research findings">
              <thead>
                <tr>
                  <Th style={{ minWidth: "170px" }}>Finding</Th>
                  <Th style={{ minWidth: "200px" }}>Design response</Th>
                  <Th style={{ minWidth: "240px" }}>Rationale</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td strong>No history; can&apos;t explain a red metric</Td>
                  <Td>Historical tracking + <strong>change-reason capture</strong></Td>
                  <Td>A value change is only defensible with its justification attached. Capturing <em>why</em> at the moment of edit is what makes the later conversation survivable.</Td>
                </tr>
                <tr>
                  <Td strong>Validation blocks and confuses</Td>
                  <Td>Inline, contextual validation with plain-language messages and direct links to the offending field</Td>
                  <Td>Move error handling from save-time gate to in-context guidance</Td>
                </tr>
                <tr>
                  <Td strong>Users unsure what a field wants</Td>
                  <Td>Field-level definitions and guidance surfaced at point of entry</Td>
                  <Td>Standardises input, which protects every downstream roll-up</Td>
                </tr>
                <tr>
                  <Td strong>One structure doesn&apos;t fit all programs</Td>
                  <Td>Configurable metric selection; toggleable metrics per program</Td>
                  <Td>Relevance is what makes the effort feel worth it</Td>
                </tr>
                <tr>
                  <Td strong>Snapshot output isn&apos;t presentable</Td>
                  <Td>Improved reporting and data visualisation; export that isn&apos;t a screenshot</Td>
                  <Td>Replace the workaround rather than tolerate it</Td>
                </tr>
                <tr>
                  <Td strong>Chasing people for updates</Td>
                  <Td>Reminder / &ldquo;poke&rdquo; mechanism</Td>
                  <Td>Removes the manual social overhead PMs were absorbing</Td>
                </tr>
                <tr>
                  <Td strong>Parallel tracking in other tools</Td>
                  <Td>Import/export and integration paths</Td>
                  <Td>Meet users where their data already lives</Td>
                </tr>
                <tr>
                  <Td strong>Red/yellow/green found genuinely useful</Td>
                  <Td>Kept and extended the indicator system</Td>
                  <Td>One of the few things users volunteered as working — preserve it</Td>
                </tr>
              </tbody>
            </ScrollTable>

            <Figure
              filename="04-findings-to-decisions.png"
              alt="Diagram connecting each research finding to its corresponding design decision"
              caption="Design decisions traced to research findings."
              intent="Optional — a simple findings-to-decisions diagram. Can be built from the table above if no artefact exists."
              pending
            />
          </div>
        </Wrap>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  THE DESIGN                                         */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="design" style={{ padding: "64px 0", background: T.white }}>
        <Wrap>
          <SectionDivider />
          <div style={{ paddingTop: "56px" }}>
            <SectionLabel>The Design</SectionLabel>
            <SectionTitle>From data dump to defensible numbers.</SectionTitle>

            <SubHeading>Program overview — from data dump to program health</SubHeading>
            <BodyText>
              The overview was rebuilt around a modular card system: each block of program information is self-contained and rearrangeable, so a program manager can foreground what their program is actually judged on.
            </BodyText>
            <PullQuote>
              &ldquo;One-stop shop for program health overview.&rdquo;
            </PullQuote>
            <Figure
              filename="05-program-overview-modular-cards.png"
              alt="Redesigned program overview composed of self-contained, rearrangeable cards for each block of program information"
              caption="Program overview — modular cards."
              intent="Program overview with modular / rearrangeable cards."
              pending
            />

            <BodyText>
              Status indicators were retained and strengthened — the red/yellow/green language was the one element participants consistently reported as useful.
            </BodyText>
            <Figure
              filename="06-status-indicators.png"
              alt="Close-up of metric cards with red, yellow, and green status indicators"
              caption="Status indicators and metric cards."
              intent="Close-up of red/yellow/green indicators and metric cards."
              pending
            />

            <SubHeading>Metric entry — guidance at the point of decision</SubHeading>
            <BodyText>
              Entry screens carry definitions and expected-value guidance inline, so the question <em>&ldquo;what goes in this field?&rdquo;</em> is answered where it&apos;s asked rather than in a separate document.
            </BodyText>
            <Figure
              filename="07-metric-entry-guidance.png"
              alt="Metric entry form showing inline field definitions and expected-value guidance beside each input"
              caption="Metric entry with inline guidance."
              intent="Metric entry screen showing inline field guidance and definitions."
              pending
            />

            <SubHeading>Validation — corrective, not obstructive</SubHeading>
            <BodyText>
              Errors are surfaced in context with plain-language explanation and a path to the specific field, replacing the save-time failure that participants found hardest to resolve.
            </BodyText>
            <Figure
              filename="08-validation-states.png"
              alt="Form validation states showing in-context, plain-language error messages linked to the specific fields that need fixing"
              caption="Validation states."
              intent="Validation error states — ideally before/after, or the improved inline version."
              pending
            />

            <SubHeading>History and change reasons — the defensibility layer</SubHeading>
            <BodyText>
              The change most directly tied to the core finding: metric history alongside the reason recorded at the time of change. This is what converts a red metric from an accusation into an explainable position.
            </BodyText>
            <Figure
              filename="09-history-change-reasons.png"
              alt="Metric history view listing past values alongside the reason captured at the time of each change"
              caption="Historical tracking and change reasons."
              intent="Historical tracking view and/or the change-reason capture field."
              pending
            />

            <SubHeading>Reporting — replacing the screenshot</SubHeading>
            <BodyText>
              Reporting output was reworked so the artefact leaving the tool is the artefact shown to leadership.
            </BodyText>
            <Figure
              filename="10-reporting-visualisation.png"
              alt="Reporting output with data visualisations designed to be shown to leadership directly, without screenshotting"
              caption="Reporting and data visualisation."
              intent="Reporting / data visualisation output."
              pending
            />
          </div>
        </Wrap>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  WORKING IN THE FUEL DESIGN SYSTEM                  */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="fuel" style={{ padding: "64px 0", background: T.white }}>
        <Wrap>
          <SectionDivider />
          <div style={{ paddingTop: "56px" }}>
            <SectionLabel>Working in the Fuel Design System</SectionLabel>
            <SectionTitle>Native Fuel, not bolted on.</SectionTitle>

            <BodyText>
              The work was built in <strong>Fuel</strong>, John Deere&apos;s enterprise design system. I composed screens from existing Fuel Kernel components — navigation, tables, form fields, buttons, status indicators — and extended new variants where the domain required patterns Fuel didn&apos;t yet cover, keeping token, state, and interaction conventions consistent so they read as native Fuel rather than bolted on.
            </BodyText>
            <BodyText>
              Extended components were documented with full state coverage (default, focus, filled, error, disabled) and delivered as developer-ready specs.
            </BodyText>

            <Figure
              filename="11-fuel-components-variants.png"
              alt="Fuel design system components used in Team Contract alongside the extended variants, documented with full state coverage"
              caption="Fuel components and extended variants."
              intent="Fuel components used + extended variants, with state coverage (default, focus, filled, error, disabled)."
              pending
            />
          </div>
        </Wrap>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  REFLECTION + CREDITS                               */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="reflection" style={{ padding: "64px 0 96px", background: T.white }}>
        <Wrap>
          <SectionDivider />
          <div style={{ paddingTop: "56px" }}>
            <SectionLabel>Reflection</SectionLabel>
            <SectionTitle>What the work taught me.</SectionTitle>

            <BodyText>
              <strong>Research reframed the brief.</strong> The work arrived as a list of feature requests. The interviews showed the requests shared one root: users couldn&apos;t explain their own numbers. Solving for explainability addressed most of the list at once — and made it clear which requests could wait.
            </BodyText>
            <BodyText>
              <strong>Workarounds were the most useful data.</strong> The PowerPoint screenshot was worth more than any feature request, because it showed precisely where the tool stopped being trusted, and what &ldquo;good&rdquo; looked like to the user.
            </BodyText>
            <BodyText>
              <strong>Separating confusion from reaction changed what I designed.</strong> Confusion was an interface problem. Reaction was a value problem. Only fixing the first would have produced a clearer tool that people still resented filling in.
            </BodyText>

            {/* Credits */}
            <div style={{ borderTop: `1px solid ${T.border}`, marginTop: "56px", paddingTop: "32px" }}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: T.green, fontWeight: 600, marginBottom: "14px" }}>
                Credits
              </div>
              <BodyText style={{ margin: 0 }}>
                Research, synthesis, and design — Shweta Sharma. Participant quotes are attributed to anonymised role labels (P1–P9).
              </BodyText>
            </div>
          </div>
        </Wrap>
      </section>
    </CaseStudyLayout>
  );
}
