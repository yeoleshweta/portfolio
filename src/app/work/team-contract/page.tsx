"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
          {cite}
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
function LaptopFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" as const, alignItems: "center" }}>
      <div style={{
        width: "92%",
        aspectRatio: "16 / 10",
        background: "#1a1c20",
        border: "4px solid #1a1c20",
        borderRadius: "16px 16px 0 0",
        position: "relative" as const,
        overflow: "hidden",
        boxShadow: "0 28px 60px -20px rgba(28, 27, 23, 0.28), inset 0 0 0 1px rgba(255,255,255,0.08)",
        paddingTop: "14px",
        boxSizing: "border-box" as const,
      }}>
        <div style={{
          position: "absolute" as const,
          top: "6px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "6px",
          height: "6px",
          background: "#000",
          borderRadius: "50%",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.12)",
          zIndex: 2,
        }} />
        <div style={{
          position: "absolute" as const,
          top: "14px",
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "4px",
          overflow: "hidden",
          background: "#fff",
        }}>
          {children}
        </div>
      </div>
      <div style={{
        width: "100%",
        height: "22px",
        background: "linear-gradient(180deg, #d3d5d9 0%, #b8bac0 100%)",
        borderRadius: "6px 6px 22px 22px",
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.8), 0 14px 28px rgba(0,0,0,0.12)",
        display: "flex",
        justifyContent: "center",
      }}>
        <div style={{
          width: "110px",
          height: "7px",
          background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.04) 100%)",
          borderRadius: "0 0 8px 8px",
        }} />
      </div>
    </div>
  );
}

function Figure({
  filename,
  alt,
  caption,
  intent,
  pending = false,
  laptop = false,
  width = 1600,
  height = 1000,
}: {
  filename: string;
  alt: string;
  caption: string;
  intent?: string;
  pending?: boolean;
  laptop?: boolean;
  width?: number;
  height?: number;
}) {
  const media = pending ? (
    <div style={{
      border: laptop ? "none" : `2px dashed ${T.border}`,
      borderRadius: laptop ? 0 : "8px",
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
      style={laptop ? {
        width: "100%",
        height: "100%",
        objectFit: "cover" as const,
        objectPosition: "top center",
        display: "block",
      } : {
        width: "100%",
        height: "auto",
        display: "block",
        borderRadius: "6px",
      }}
    />
  );

  return (
    <figure style={{ margin: "36px 0" }}>
      {laptop ? <LaptopFrame>{media}</LaptopFrame> : media}
      <figcaption style={{ fontSize: "13px", color: T.muted, marginTop: "14px", fontStyle: "italic", lineHeight: 1.5 }}>
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

/* A few Fuel-style components, kept sparse and sharp */
function FuelComponentsSample() {
  const labelStyle: React.CSSProperties = {
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "10px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: T.muted,
    fontWeight: 700,
    marginBottom: "16px",
  };

  const stateLabel: React.CSSProperties = {
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "10px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: T.muted,
    marginTop: "8px",
    textAlign: "center",
  };

  return (
    <figure style={{ margin: "40px 0 8px" }}>
      <div style={{
        background: T.white,
        border: `1px solid ${T.border}`,
        borderRadius: "12px",
        padding: "40px 36px",
      }}>
        {/* Buttons */}
        <div style={{ marginBottom: "48px" }}>
          <div style={labelStyle}>Buttons</div>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "28px", alignItems: "flex-start" }}>
            <div>
              <button type="button" style={{
                minWidth: "140px",
                height: "44px",
                padding: "0 20px",
                background: T.yellow,
                color: T.text,
                border: "none",
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "default",
              }}>
                Primary
              </button>
              <div style={stateLabel}>Default</div>
            </div>
            <div>
              <button type="button" style={{
                minWidth: "140px",
                height: "44px",
                padding: "0 20px",
                background: T.white,
                color: T.green,
                border: `1.5px solid ${T.green}`,
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "default",
              }}>
                Secondary
              </button>
              <div style={stateLabel}>Default</div>
            </div>
            <div>
              <button type="button" disabled style={{
                minWidth: "140px",
                height: "44px",
                padding: "0 20px",
                background: "#E8E6DF",
                color: "#A8A59A",
                border: "none",
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "not-allowed",
              }}>
                Disabled
              </button>
              <div style={stateLabel}>Disabled</div>
            </div>
          </div>
        </div>

        {/* Form field */}
        <div style={{ marginBottom: "48px" }}>
          <div style={labelStyle}>Form field</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "28px", maxWidth: "520px" }}>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: T.text, marginBottom: "8px" }}>Current status</div>
              <div style={{
                height: "44px",
                border: `1px solid ${T.border}`,
                borderRadius: "4px",
                padding: "0 14px",
                display: "flex",
                alignItems: "center",
                color: T.text,
                fontSize: "14px",
                background: T.white,
              }}>
                $100
              </div>
              <div style={{ ...stateLabel, textAlign: "left" }}>Filled</div>
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: T.text, marginBottom: "8px" }}>Current status</div>
              <div style={{
                height: "44px",
                border: "1.5px solid #B91C1C",
                borderRadius: "4px",
                padding: "0 14px",
                display: "flex",
                alignItems: "center",
                color: T.muted,
                fontSize: "14px",
                background: T.white,
              }}>
                Enter value
              </div>
              <div style={{ fontSize: "12px", color: "#B91C1C", marginTop: "8px" }}>Required</div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div>
          <div style={labelStyle}>Status</div>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "16px" }}>
            {[
              { label: "On track", bg: "#E8F5E4", color: T.green },
              { label: "At risk", bg: "#FFF4D6", color: "#B45309" },
              { label: "Off track", bg: "#FEE2E2", color: "#B91C1C" },
            ].map((s) => (
              <span key={s.label} style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                borderRadius: "999px",
                background: s.bg,
                color: s.color,
                fontSize: "13px",
                fontWeight: 700,
              }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: s.color }} />
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>
      <figcaption style={{ fontSize: "13px", color: T.muted, marginTop: "14px", fontStyle: "italic", lineHeight: 1.5 }}>
        A few Fuel building blocks used in Team Contract: buttons, form fields, and status.
      </figcaption>
    </figure>
  );
}

/* ─────────── History + change reason animation ───────────
   Short loop: a red metric with no context → the same metric
   with history and the reason captured at each change. */
const HISTORY_ROWS = [
  {
    when: "Dec 2024",
    from: "96%",
    to: "90%",
    status: "#367C2B",
    reason: "We updated the numbers for the new forecast.",
  },
  {
    when: "Jan 2025",
    from: "90%",
    to: "72%",
    status: "#D97706",
    reason: "Parts arrived late, so two builds moved to later.",
  },
  {
    when: "Feb 2025",
    from: "72%",
    to: "41%",
    status: "#B91C1C",
    reason: "Three tests were removed from this release.",
  },
] as const;

function HistoryChangeAnimation() {
  const [phase, setPhase] = React.useState<"before" | "after">("before");
  const [visibleRows, setVisibleRows] = React.useState(0);

  React.useEffect(() => {
    let cancelled = false;
    let timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      if (cancelled) return;
      setPhase("before");
      setVisibleRows(0);

      timers.push(setTimeout(() => {
        if (cancelled) return;
        setPhase("after");
        HISTORY_ROWS.forEach((_, i) => {
          timers.push(setTimeout(() => {
            if (!cancelled) setVisibleRows(i + 1);
          }, 450 + i * 520));
        });
      }, 2400));

      timers.push(setTimeout(() => {
        if (!cancelled) run();
      }, 9000));
    };

    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <figure style={{ margin: "36px 0" }}>
      <style>{`
        .tc-history-grid {
          display: grid;
          grid-template-columns: 88px 70px 70px 1fr;
          gap: 8px;
        }
        @media (max-width: 640px) {
          .tc-history-grid {
            grid-template-columns: 1fr;
            gap: 4px;
          }
          .tc-history-head { display: none !important; }
          .tc-history-meta {
            grid-template-columns: 1fr 1fr 1fr !important;
          }
        }
      `}</style>
      <div
        style={{
          border: `1px solid ${T.border}`,
          borderRadius: "10px",
          background: T.white,
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(28, 27, 23, 0.04)",
        }}
        aria-label="Animation showing before and after: a red number with no explanation, then the same number with history and reasons"
      >
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          padding: "14px 20px",
          background: T.surface,
          borderBottom: `1px solid ${T.border}`,
        }}>
          <div style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "10px",
            letterSpacing: "0.16em",
            textTransform: "uppercase" as const,
            color: T.muted,
            fontWeight: 700,
          }}>
            Before and after
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase" as const,
                fontWeight: 700,
                color: phase === "before" ? "#B91C1C" : T.green,
              }}
            >
              {phase === "before" ? "Hard to explain" : "Easy to explain"}
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{ padding: "22px 20px 20px" }}>
          <div className="tc-history-meta" style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 0.7fr 0.7fr",
            gap: "12px",
            alignItems: "end",
            marginBottom: "18px",
          }}>
            <div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: T.muted, marginBottom: "6px" }}>
                What we track
              </div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: T.text }}>
                Forecast on track
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: T.muted, marginBottom: "6px" }}>
                Goal
              </div>
              <div style={{ fontSize: "15px", fontWeight: 600, color: T.text }}>96%</div>
            </div>
            <div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: T.muted, marginBottom: "6px" }}>
                Today
              </div>
              <motion.div
                animate={{ color: "#B91C1C" }}
                style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em" }}
              >
                41%
              </motion.div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {phase === "before" ? (
              <motion.div
                key="before"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                style={{
                  border: "1px solid #FECACA",
                  background: "#FEF2F2",
                  borderRadius: "8px",
                  padding: "18px 16px",
                  minHeight: "168px",
                  display: "flex",
                  flexDirection: "column" as const,
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#991B1B" }}>
                  Before: only a red number
                </div>
                <div style={{ fontSize: "14px", lineHeight: 1.6, color: "#7F1D1D" }}>
                  Leaders see 41% against a 96% goal. There is no past trail and no note for why it dropped. The program manager has to explain it from memory.
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="after"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                style={{
                  border: `1px solid ${T.border}`,
                  borderRadius: "8px",
                  overflow: "hidden",
                  minHeight: "168px",
                  background: T.surface,
                }}
              >
                <div className="tc-history-grid tc-history-head" style={{
                  padding: "10px 14px",
                  borderBottom: `1px solid ${T.border}`,
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "9.5px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  color: T.muted,
                  fontWeight: 700,
                }}>
                  <span>When</span>
                  <span>Was</span>
                  <span>Now</span>
                  <span>Why it changed</span>
                </div>

                {HISTORY_ROWS.map((row, i) => (
                  <motion.div
                    key={row.when}
                    className="tc-history-grid"
                    initial={{ opacity: 0, y: 8 }}
                    animate={visibleRows > i ? { opacity: 1, y: 0 } : { opacity: 0.15, y: 8 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{
                      padding: "12px 14px",
                      borderBottom: i < HISTORY_ROWS.length - 1 ? `1px solid ${T.border}` : "none",
                      background: T.white,
                      alignItems: "start",
                    }}
                  >
                    <span style={{ fontSize: "13px", color: T.muted, fontWeight: 600 }}>{row.when}</span>
                    <span style={{ fontSize: "13px", color: T.muted }}>{row.from}</span>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: row.status }}>{row.to}</span>
                    <span style={{ fontSize: "13px", color: T.text, lineHeight: 1.45 }}>{row.reason}</span>
                  </motion.div>
                ))}

                <AnimatePresence>
                  {visibleRows >= HISTORY_ROWS.length && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      style={{
                        padding: "14px 14px 16px",
                        background: "#F0F7EE",
                        borderTop: `1px solid ${T.border}`,
                      }}
                    >
                      <div style={{ fontSize: "14px", fontWeight: 700, color: T.green, marginBottom: "4px" }}>
                        After: the story travels with the number
                      </div>
                      <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: T.text }}>
                        Program managers can show leaders what changed and why, in one place. No more digging through memory or pasting screenshots into slides.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <figcaption style={{ fontSize: "13px", color: T.muted, marginTop: "14px", fontStyle: "italic", lineHeight: 1.5 }}>
        Outcome: a red number stops being a blame moment. It becomes something you can explain.
      </figcaption>
    </figure>
  );
}

/* ─────────── Sections nav ─────────── */
const sections = [
  { id: "overview", label: "Summary" },
  { id: "problem", label: "The Problem" },
  { id: "research", label: "Research" },
  { id: "findings", label: "What We Learned" },
  { id: "actions", label: "Actionable Items" },
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
            Team Contract: Making Program Metrics Defensible
          </h1>

          <p style={{ fontSize: "17px", lineHeight: 1.7, color: T.muted, margin: "0 0 36px 0", maxWidth: "680px" }}>
            How research shifted John Deere&apos;s program metrics tool from busy data entry to numbers program managers could stand behind.
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
          <SectionTitle>People used it. They did not trust it.</SectionTitle>

          <BodyText>
            Team Contract is the internal tool John Deere program managers use to record and report the metrics a product development program is accountable for. That covers cost, schedule, quality, reliability, and risk across six PDP phases.
          </BodyText>
          <BodyText>
            The tool was in use, but it was not trusted. Program managers called it <em>&ldquo;a tedious data entry tool.&rdquo;</em> It showed a static snapshot with no history and no clear story for where the numbers came from. The strongest signal sat in the workaround: PMs were <strong>screenshotting the tool and pasting it into PowerPoint</strong> because the tool itself could not produce something they were willing to show leadership.
          </BodyText>
          <BodyText>
            I ran the research that shifted the brief. The question was no longer &ldquo;what features should we add?&rdquo; It became &ldquo;how do we make the numbers defensible?&rdquo; The design work followed from that.
          </BodyText>

          <Figure
            filename="01-hero-team-contract-overview.png"
            alt="Common Segmentation Program Metrics (Team Contract) screen showing a metrics table with title, tolerance, AFE target, upper and lower bounds, current status, and estimate at full production columns"
            caption="Team Contract program metrics overview inside Common Segmentation."
            width={1024}
            height={621}
            laptop
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
            <SectionTitle>Hard to fill in. Harder to stand behind.</SectionTitle>

            <BodyText>
              Team Contract sat at the centre of program reporting, and it created friction on both sides of the job.
            </BodyText>
            <BodyText>
              <strong>Getting data in took too much effort.</strong> There were many metrics. Validation was strict and unclear. A lot of the input was still manual. One participant described chasing colleagues for numbers: <em>&ldquo;Tedious to go and ask people to add data.&rdquo;</em>
            </BodyText>
            <BodyText>
              <strong>What came out was hard to use.</strong> The tool showed a snapshot in time. There were no trends, no change history, and no context for why a number looked the way it did. A red metric with no history and no source is not a conversation a program manager can win.
            </BodyText>

            <PullQuote cite="Program Management Group (P7 to P9) session">
              &ldquo;Difficulty in explaining red metrics to senior leadership without context.&rdquo;
            </PullQuote>

            <PullQuote>
              &ldquo;Program managers don&apos;t know how calculations are done or where they come from.&rdquo;
            </PullQuote>

            <BodyText>
              So the effort went into the tool, and leadership still saw a screenshot in a slide deck. The product did the work and got none of the credit. Program managers carried the risk.
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
            <SectionTitle>Five sessions. Nine people. One shared board.</SectionTitle>

            <BodyText>
              I ran five interview sessions with nine participants across the roles that touch a team contract: the Product Owner, program managers, and engineering and corporate stakeholders. We recorded the sessions, transcribed them, and synthesised everything on a shared FigJam board.
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
                  <Td>Program Manager (6 to 8 years using Team Contract)</Td>
                </tr>
                <tr>
                  <Td strong>4</Td>
                  <Td>Engineering and Corporate Stakeholders (P4 to P6)</Td>
                  <Td>Engineering and corporate monitoring</Td>
                </tr>
                <tr>
                  <Td strong>5</Td>
                  <Td>Program Management Group (P7 to P9)</Td>
                  <Td>Program management group</Td>
                </tr>
              </tbody>
            </ScrollTable>

            <Figure
              filename="02-research-board-sessions.png"
              alt="FigJam research board with a summary section and three colour coded columns of sticky note observations from interview sessions"
              caption="Research board with interview sessions captured as sticky notes."
              width={1024}
              height={630}
            />

            <SubHeading>Synthesis</SubHeading>
            <BodyText>
              Roughly 230 observations were affinity mapped into four lenses: <strong>Current Status</strong> (what the tool does today), <strong>Confusion</strong> (where understanding breaks), <strong>Reaction</strong> (how users feel about it), and <strong>Improvement</strong> (what they ask for). From there, we reduced the board to a prioritised set of actions.
            </BodyText>

            <Figure
              filename="03-affinity-clusters.png"
              alt="Affinity map with four labelled clusters of sticky notes: Confusion, Reaction, Improvement, and Current Status"
              caption="Affinity mapping across Confusion, Reaction, Improvement, and Current Status."
              width={1024}
              height={826}
            />

            <BodyText>
              Splitting <em>Confusion</em> from <em>Reaction</em> mattered. Confusion pointed at interface and information problems I could design against. Reaction pointed at a credibility problem. People disliked the tool not because it was hard, but because the effort did not come back to them as value. Those two problems needed different responses.
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
              This was the gap we heard most often. Team Contract showed where a metric stood. It never showed how it got there.
            </BodyText>
            <QuoteList quotes={[
              "Static view, snapshot of current status.",
              "No historical data.",
              "Difficulty tracking value changes.",
              "Missing historical context.",
            ]} />
            <BodyText>
              Without history, a metric turning red feels like an accusation, not information. Participants asked again and again for trends, change history, and especially the <em>reason</em> a value changed, not just the value itself.
            </BodyText>
            <PullQuote>
              &ldquo;Desire for change comments feature.&rdquo;
            </PullQuote>

            <SubHeading>2. Validation got in the way instead of helping</SubHeading>
            <BodyText>
              People experienced validation like an obstacle course. Errors showed up late, were hard to find, and were written in language that did not explain the fix.
            </BodyText>
            <QuoteList quotes={[
              "Validations causing errors when saving.",
              "Challenges in finding validation problems in Team Contract.",
              "Confusion in error message interpretation.",
              "Too many validations.",
            ]} />

            <SubHeading>3. Users did not know what a field wanted</SubHeading>
            <BodyText>
              Metric definitions were inconsistent across the organisation. The same field got filled differently by different teams. That quietly weakened every roll up report built on top of it.
            </BodyText>
            <PullQuote cite="Program Manager (P2)">
              &ldquo;What is meant by upper &amp; lower bounds, and what data should be added there.&rdquo;
            </PullQuote>
            <QuoteList quotes={[
              "Need for better metric definitions.",
              "Metrics without context create confusion.",
            ]} />

            <SubHeading>4. One structure did not fit every program</SubHeading>
            <BodyText>
              Programs differ by product line, scale, and season. A fixed metric set forced irrelevant fields on some programs and left out what others actually needed.
            </BodyText>
            <QuoteList quotes={[
              "Not a one tool fits all.",
              "Inflexible team contract structure.",
              "Customizable metric selection for specific programs.",
              "Effort for entering data might not benefit all programs equally.",
            ]} />

            <SubHeading>5. The workarounds told us what was missing</SubHeading>
            <BodyText>
              When a tool fails, people build around it. That workaround is often the clearest specification of what they need.
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
                  <Td strong>Screenshotting Team Contract into presentations</Td>
                  <Td>Reporting output was not ready to show leadership</Td>
                </tr>
                <tr>
                  <Td strong>Parallel tracking in Power BI, Tableau, spreadsheets, SharePoint</Td>
                  <Td>Gaps in visualisation and flexibility</Td>
                </tr>
                <tr>
                  <Td strong>Manually chasing colleagues for updates</Td>
                  <Td>No nudge or reminder in the product</Td>
                </tr>
                <tr>
                  <Td strong>Separate personal scorecards</Td>
                  <Td>The metric set did not match real accountability</Td>
                </tr>
              </tbody>
            </ScrollTable>
          </div>
        </Wrap>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  ACTIONABLE ITEMS                                   */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="actions" style={{ padding: "64px 0", background: T.white }}>
        <Wrap>
          <SectionDivider />
          <div style={{ paddingTop: "56px" }}>
            <SectionLabel>Actionable Items</SectionLabel>
            <SectionTitle>From insights to a clear list of what to design next.</SectionTitle>

            <BodyText>
              After the findings settled, we turned them into a short list of actions. This board sat between research and design. It kept the team focused on what to build first: better validation, clearer guidance, stronger reporting, reminders, and easier ways to move data in and out of the tool.
            </BodyText>

            <Figure
              filename="03b-actionable-items.png"
              alt="FigJam board of actionable items including improve validation, reminder poke feature, simplify data entry, enhance reporting, integrate with other tools, and improve field guidance"
              caption="Actionable items distilled from the research, used to prioritise what went into design."
              width={1024}
              height={957}
            />
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
            <SectionTitle>Each design move came from a finding, not a feature request.</SectionTitle>

            <BodyText>
              Once the research settled, the design work was not a wish list. Each change traced back to something people had shown us or said out loud.
            </BodyText>

            <ScrollTable label="Design decisions traced to research findings">
              <thead>
                <tr>
                  <Th style={{ minWidth: "170px" }}>Finding</Th>
                  <Th style={{ minWidth: "200px" }}>Design response</Th>
                  <Th style={{ minWidth: "240px" }}>Why it mattered</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td strong>No history, so a red metric could not be explained</Td>
                  <Td>Historical tracking plus capturing the reason for a change</Td>
                  <Td>A changed value only holds up later if the &ldquo;why&rdquo; was recorded when it was edited.</Td>
                </tr>
                <tr>
                  <Td strong>Validation blocked people and confused them</Td>
                  <Td>Inline validation with plain language messages and a link to the field</Td>
                  <Td>Move help to the moment of editing instead of failing at save.</Td>
                </tr>
                <tr>
                  <Td strong>Users were unsure what a field wanted</Td>
                  <Td>Field definitions and guidance shown at the point of entry</Td>
                  <Td>Clearer input protects every report that rolls up from it.</Td>
                </tr>
                <tr>
                  <Td strong>One structure did not fit all programs</Td>
                  <Td>Configurable metric selection per program</Td>
                  <Td>People will put in the effort when the fields feel relevant.</Td>
                </tr>
                <tr>
                  <Td strong>Snapshot output was not ready to present</Td>
                  <Td>Stronger reporting and visualisation, with export that is not a screenshot</Td>
                  <Td>Replace the workaround instead of living with it.</Td>
                </tr>
                <tr>
                  <Td strong>People were chasing colleagues for updates</Td>
                  <Td>Reminder or &ldquo;poke&rdquo; mechanism</Td>
                  <Td>Remove the manual chasing program managers had been absorbing.</Td>
                </tr>
                <tr>
                  <Td strong>Parallel tracking lived in other tools</Td>
                  <Td>Import, export, and integration paths</Td>
                  <Td>Meet users where their data already lives.</Td>
                </tr>
                <tr>
                  <Td strong>Red, yellow, and green status was genuinely useful</Td>
                  <Td>Kept and extended the indicator system</Td>
                  <Td>One of the few things users volunteered as working. Keep it.</Td>
                </tr>
              </tbody>
            </ScrollTable>

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
            <SectionTitle>From a pile of data to numbers people could defend.</SectionTitle>

            <SubHeading>Program overview: from a pile of data to program health</SubHeading>
            <BodyText>
              We rebuilt the overview around modular cards. Each block of program information can stand on its own and be rearranged, so a program manager can put what they are judged on up front.
            </BodyText>
            <PullQuote>
              &ldquo;One-stop shop for program health overview.&rdquo;
            </PullQuote>
            <Figure
              filename="05-program-overview-modular-cards.png"
              alt="Reports (Team Contract) section showing a Detailed Program Health Card with modular report icons including Risk Dashboard, Phase Activity Dashboard, Portfolio Schedule, and Score Card"
              caption="Program overview with modular report cards for program health."
              width={1024}
              height={179}
            />

            <BodyText>
              Status indicators stayed and got stronger. Red, yellow, and green was the one part of the interface participants consistently said was useful.
            </BodyText>
            <Figure
              filename="06-status-indicators.png"
              alt="Metrics table with Title, Target, Current, and Trends columns, using red, orange, and green status colours plus sparklines for Dec to Feb"
              caption="Status indicators with colour coded current values and trend history."
              width={1024}
              height={549}
            />

            <SubHeading>Metric entry: guidance when it matters</SubHeading>
            <BodyText>
              Entry screens now carry definitions and guidance inline. The question <em>&ldquo;what goes in this field?&rdquo;</em> gets answered where it is asked, not in a separate document.
            </BodyText>
            <Figure
              filename="07-metric-entry-guidance.png"
              alt="Metric row for Weighted Net Sales Per Unit with an info tooltip explaining green, yellow, and red status meanings for metric completion"
              caption="Metric entry with info guidance at the moment of decision."
              width={1024}
              height={125}
            />

            <SubHeading>Validation that helps, instead of blocking</SubHeading>
            <BodyText>
              Errors now show up in context with a short plain language explanation and a clear path to the field. That replaces the save time failure participants found hardest to resolve.
            </BodyText>
            <Figure
              filename="08-validation-states.png"
              alt="Metric row with red bordered fields and short inline messages under empty value and date inputs"
              caption="Validation states with short inline messages at the field."
              width={1024}
              height={79}
            />

            <SubHeading>What we designed: history and change reasons in the tool</SubHeading>
            <BodyText>
              In Team Contract, every updated metric now keeps a short history and a note for why it changed. That product change came from the research finding that people could not explain a red number. The animation below shows what that looks like in the tool.
            </BodyText>
            <HistoryChangeAnimation />

            <SubHeading>Reporting that replaces the screenshot</SubHeading>
            <BodyText>
              We reworked reporting so the thing that leaves the tool is the thing shown to leadership.
            </BodyText>
            <Figure
              filename="10-reporting-visualisation.png"
              alt="Reports Team Contract screen with program health report cards, VP Level Metrics table, colour status, trend lines, and Excel and PowerPoint export"
              caption="Reporting output in Team Contract: metrics, trends, and export ready for leadership."
              width={1440}
              height={900}
              laptop
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
            <SectionTitle>Built to feel like native Fuel.</SectionTitle>

            <BodyText>
              The work lived inside <strong>Fuel</strong>, John Deere&apos;s enterprise design system. Screens were built from shared components so Team Contract felt like part of the same product family, not a one off tool.
            </BodyText>

            <FuelComponentsSample />
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
              <strong>Research reframed the brief.</strong> The work arrived as a list of feature requests. The interviews showed those requests shared one root: users could not explain their own numbers. Solving for that addressed most of the list at once, and made it clear which requests could wait.
            </BodyText>
            <BodyText>
              <strong>Workarounds were the most useful data.</strong> The PowerPoint screenshot was worth more than any feature request. It showed exactly where the tool stopped being trusted, and what &ldquo;good&rdquo; looked like to the user.
            </BodyText>
            <BodyText>
              <strong>Separating confusion from reaction changed what I designed.</strong> Confusion was an interface problem. Reaction was a value problem. Fixing only the first would have produced a clearer tool that people still resented filling in.
            </BodyText>

            {/* Credits */}
            <div style={{ borderTop: `1px solid ${T.border}`, marginTop: "56px", paddingTop: "32px" }}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: T.green, fontWeight: 600, marginBottom: "14px" }}>
                Credits
              </div>
              <BodyText style={{ margin: 0 }}>
                Research, synthesis, and design by Shweta Sharma. Participant quotes are attributed to anonymised role labels (P1 to P9).
              </BodyText>
            </div>
          </div>
        </Wrap>
      </section>
    </CaseStudyLayout>
  );
}
