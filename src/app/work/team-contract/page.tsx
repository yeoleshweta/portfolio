"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import FuelAnatomy, { type AnatomyItem } from "@/components/casestudy/FuelAnatomy";

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
              <div style={{ fontSize: "13px", fontWeight: 600, color: T.text, marginBottom: "8px" }}>Validation date</div>
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
                28-Feb-2025
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
    status: "#B45309",
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
  const reduce = useReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = React.useState(true);
  const [onScreen, setOnScreen] = React.useState(true);
  const [phase, setPhase] = React.useState<"before" | "after">("before");
  const [visibleRows, setVisibleRows] = React.useState(0);

  // Stop the loop while the animation is scrolled out of view.
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Loop every 9 seconds. Reduced motion never starts the loop.
  React.useEffect(() => {
    if (reduce || !playing || !onScreen) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

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
  }, [reduce, playing, onScreen]);

  // Reduced motion shows the finished "after" state. Wait for mount so the server
  // and the first client render match; reduced-motion users see the static state right after.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const staticView = mounted && !!reduce;
  const currentPhase = staticView ? "after" : phase;
  const rowsShown = staticView ? HISTORY_ROWS.length : visibleRows;

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
        ref={rootRef}
        role="group"
        aria-label="Concept animation, illustrative only: a red number with no explanation, then the same number with a history and a reason for each change"
      >
        {/* The visual is decorative for assistive tech; the text below carries the same content. */}
        <div
          aria-hidden="true"
          style={{
            border: `1px solid ${T.border}`,
            borderRadius: "10px",
            background: T.white,
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(28, 27, 23, 0.04)",
          }}
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
                key={currentPhase}
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
                  color: currentPhase === "before" ? "#B91C1C" : T.green,
                }}
              >
                {currentPhase === "before" ? "Hard to explain" : "Easy to explain"}
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
              {currentPhase === "before" ? (
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
                      animate={rowsShown > i ? { opacity: 1, y: 0 } : { opacity: 0.15, y: 8 }}
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
                    {rowsShown >= HISTORY_ROWS.length && (
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

        {mounted && !reduce && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              style={{
                minWidth: "44px",
                minHeight: "44px",
                padding: "0 16px",
                border: `1px solid ${T.border}`,
                borderRadius: "6px",
                background: T.white,
                color: T.text,
                fontFamily: "inherit",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {playing ? "Pause animation" : "Play animation"}
            </button>
          </div>
        )}

        <p className="sr-only">
          Before: only a red number, 41% against a 96% goal, with no past trail and no reason for the drop. After: each change is listed with its date and the reason for it.
        </p>
        <ul className="sr-only">
          {HISTORY_ROWS.map((row) => (
            <li key={row.when}>
              {row.when}: {row.from} to {row.to}. {row.reason}
            </li>
          ))}
        </ul>
      </div>
      <figcaption style={{ fontSize: "13px", color: T.muted, marginTop: "14px", fontStyle: "italic", lineHeight: 1.5 }}>
        Illustrative example, not real Team Contract data. Outcome: a red number stops being a blame moment. It becomes something you can explain.
      </figcaption>
    </figure>
  );
}

/* ─────────── Hero meta strip ─────────── */
const meta = [
  { label: "Organisation", value: "John Deere · Manufacturing / PDP" },
  { label: "Role", value: "UX Research & Product Design" },
  { label: "Research", value: "9 people · 5 sessions" },
  { label: "Design System", value: "Fuel v5 (John Deere)" },
  { label: "Product", value: "Team Contract" },
];

/* ─────────── Fuel anatomy: markers on the Option 5 metric grid ─────────── */
const fuelAnatomy: AnatomyItem[] = [
  { n: 1, x: 8, y: 23.3, component: "Accordion Item", role: "Program Metrics section, collapsed by default", finding: "Overwhelming number of metrics" },
  { n: 2, x: 63, y: 27, component: "Search", role: "Find a metric by name" },
  { n: 3, x: 88, y: 27, component: "Button · primary (Fuel yellow)", role: "Save, disabled until every row is valid", finding: "Validation failed at save" },
  { n: 4, x: 14, y: 31.4, component: "Select", role: "All Phases filter", finding: "Different metrics matter in different phases" },
  { n: 5, x: 59, y: 31.4, component: "Dropdown Menu + Button", role: "Filter Subprocess and View", finding: "Sequence by tag wasn't needed; a filter was" },
  { n: 6, x: 86, y: 31.4, component: "Button · secondary", role: "Add New Metric", finding: "Add or remove metrics per program" },
  { n: 7, x: 11, y: 41.7, component: "Badge", role: "Subprocess tag (PM, FMFA)" },
  { n: 8, x: 23, y: 41.7, component: "Tooltip trigger", role: "Metric definition at the point of entry", finding: "What goes in this field?" },
  { n: 9, x: 36, y: 41.4, component: "TextField (Input)", role: "Tolerance; shows Fuel's error state inline", finding: "Error messages written for developers" },
  { n: 10, x: 46, y: 41.4, component: "TextField · date", role: "AFE target date, with approved deviation beneath", finding: "Grid too wide to scan" },
  { n: 11, x: 73, y: 58, component: "Status fill (Fuel colour tokens)", role: "Current status, red, yellow and green", finding: "The one feature people valued" },
];

/* Token names and values as they appeared in the Figma file. Illustrative, not a published API. */
const fuelTokens: { group: string; name: string; value: string }[] = [
  { group: "Brand and action", name: "fuel/color/background/brand", value: "#367C2B" },
  { group: "Brand and action", name: "fuel/color/brand/secondary", value: "#FFDE00" },
  { group: "Brand and action", name: "fuel/color/brand/jd-charcoal", value: "#54585A" },
  { group: "Brand and action", name: "fuel/color/action/primary/base", value: "#FFDE00" },
  { group: "Text", name: "fuel/color/text/primary", value: "#1B1B1B" },
  { group: "Text", name: "fuel/color/text/tertiary", value: "#666666" },
  { group: "Text", name: "fuel/color/text/disabled", value: "#B3B3B3" },
  { group: "Text", name: "fuel/color/text/inverse", value: "#FFFFFF" },
  { group: "Border", name: "fuel/color/border/light", value: "#DDDDDD" },
  { group: "Border", name: "fuel/color/border/base", value: "#CCCCCC" },
  { group: "Border", name: "fuel/color/border/dark", value: "#B3B3B3" },
  { group: "Messaging", name: "messaging/success/base", value: "#99BD93" },
  { group: "Messaging", name: "messaging/warning/base", value: "#FFBB52" },
  { group: "Messaging", name: "messaging/info/base", value: "#7AABD6" },
  { group: "Messaging", name: "messaging/danger/dark", value: "#C21020" },
  { group: "Space and radius", name: "fuel/spacing/1", value: "4px" },
  { group: "Space and radius", name: "fuel/spacing/2", value: "8px" },
  { group: "Space and radius", name: "fuel/radius/sm", value: "4px" },
];

/* ─────────── Sections nav ─────────── */
const sections = [
  { id: "overview", label: "Summary" },
  { id: "problem", label: "The Problem" },
  { id: "research", label: "Research" },
  { id: "findings", label: "What We Learned" },
  { id: "actions", label: "Actionable Items" },
  { id: "decisions", label: "Findings to Decisions" },
  { id: "exploration", label: "Exploration" },
  { id: "design", label: "The Design" },
  { id: "validation", label: "What Held Up" },
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
    <div role="region" aria-label="Password protected case study" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f3", padding: "24px" }}>
      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: "12px", width: "100%", maxWidth: "440px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
        <div style={{ height: "6px", background: T.yellow }} />
        <div style={{ background: T.green, padding: "28px 24px", textAlign: "center" as const, color: T.white }}>
          <div style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" as const }}>John Deere</div>
          <div style={{ fontSize: "11px", marginTop: "5px", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.1em" }}>TEAM CONTRACT</div>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: "36px 32px", display: "flex", flexDirection: "column" as const, gap: "20px" }}>
          <div style={{ textAlign: "center" as const }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: T.text, margin: "0 0 8px 0" }}>Protected Case Study</h3>
            <p style={{ fontSize: "13.5px", color: T.muted, margin: 0, lineHeight: 1.55 }}>
              This case study contains proprietary materials under NDA. Please enter the password to view.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "6px" }}>
            <label htmlFor="team-contract-password" style={{ fontSize: "12px", fontWeight: 600, color: T.text }}>
              Password
            </label>
            <input
              id="team-contract-password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "team-contract-password-error" : undefined}
              style={{ padding: "12px 16px", border: `1px solid ${T.border}`, borderRadius: "4px", fontSize: "14px", width: "100%", color: T.text, boxSizing: "border-box" as const }}
              onFocus={(e) => { e.target.style.borderColor = T.green; }}
              onBlur={(e) => { e.target.style.borderColor = T.border; }}
            />
            {error && (
              <span id="team-contract-password-error" role="alert" style={{ fontSize: "12.5px", color: "#b91c1c", fontWeight: 600 }}>
                {error}
              </span>
            )}
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
    </div>
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
            Qualitative Research
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
            {/* Dividers only make sense in one row; on phones the items stack, so drop them. */}
            <style>{`
              @media (max-width: 640px) {
                .tc-meta-item { border-right: none !important; padding-right: 0 !important; margin-right: 24px !important; }
              }
            `}</style>
            {meta.map((m, i) => (
              <div key={m.label} className="tc-meta-item" style={{ padding: "18px 32px 18px 0", marginRight: "32px", borderRight: i < meta.length - 1 ? `1px solid ${T.border}` : "none", paddingRight: i < meta.length - 1 ? "32px" : "0" }}>
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

            <Figure
              filename="00-before-legacy-grid.jpg"
              alt="The legacy Team Contract metrics grid: a dense table with columns for Title, Subprocess, Tolerance Calculation, AFE Target, Approved Deviation, Upper and Lower Bound, Current Status, Validation Date and Estimate at Full Production. Values are pixelated."
              caption="Before: nine columns of manual entry per metric, a horizontal scroll, and validation that only ran on save. Values redacted."
              width={1117}
              height={602}
            />
            <BodyText>
              <strong>Getting data in took too much effort.</strong> There were many metrics. Validation was strict and unclear. A lot of the input was still manual. One participant described chasing colleagues for numbers: <em>&ldquo;Tedious to go and ask people to add data.&rdquo;</em>
            </BodyText>
            <BodyText>
              <strong>What came out was hard to use.</strong> The tool showed a snapshot in time. There were no trends, no change history, and no context for why a number looked the way it did. A red metric with no history and no source is not a conversation a program manager can win.
            </BodyText>

            <PullQuote cite="Program Management Group (P7 to P9) session">
              &ldquo;Difficulty in explaining red metrics to senior leadership without context.&rdquo;
            </PullQuote>

            <PullQuote cite="Program Manager (P3)">
              &ldquo;Doesn&apos;t drive action.&rdquo;
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
              filename="02b-interview-notes-p1.jpg"
              alt="A grid of 46 blue sticky notes from the Product Owner interview, including: Feels like a heavy tool for just data filling; Too many validations; Error messages written for developers; Frustration in locating validation problems; Wants a feature to assign people to fill data in; Time stamps to see last updates."
              caption="Raw notes from one session (P1, Product Owner). Two of these, &ldquo;Error messages written for developers&rdquo; and &ldquo;Wants a feature to assign people to fill data in&rdquo;, became design decisions."
              width={1152}
              height={1400}
            />

            <Figure
              filename="02-research-board-sessions.png"
              alt="FigJam research board with a summary section and three colour coded columns of sticky note observations from interview sessions"
              caption="Research board with interview sessions captured as sticky notes."
              width={1024}
              height={630}
            />

            <SubHeading>Synthesis</SubHeading>
            <BodyText>
              I captured 233 notes across the five sessions, one observation per note. I affinity-mapped 186 of them into four lenses: <strong>Current Status</strong> (what the tool does today), <strong>Confusion</strong> (where understanding breaks), <strong>Reaction</strong> (how users feel about it), and <strong>Improvement</strong> (what they ask for). From there, 46 synthesis notes became 8 actionable items and a working list of 12 insights.
            </BodyText>

            <ScrollTable label="Research synthesis, from sessions to insights">
              <thead>
                <tr>
                  <Th>Step</Th>
                  <Th>Count</Th>
                  <Th>What it is</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td strong>Sessions</Td>
                  <Td>5</Td>
                  <Td>3 one-to-one, 2 group sessions (P1 to P9)</Td>
                </tr>
                <tr>
                  <Td strong>Interview notes</Td>
                  <Td>233</Td>
                  <Td>One observation per note, kept per session</Td>
                </tr>
                <tr>
                  <Td strong>Clustered notes</Td>
                  <Td>186</Td>
                  <Td>Current Status 77 · Improvement 44 · Confusion 40 · Reaction 25</Td>
                </tr>
                <tr>
                  <Td strong>Synthesis notes</Td>
                  <Td>46</Td>
                  <Td>Themes per lens, plus 8 actionable items</Td>
                </tr>
                <tr>
                  <Td strong>Insights</Td>
                  <Td>12</Td>
                  <Td>The working list used to scope each design option</Td>
                </tr>
              </tbody>
            </ScrollTable>

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

            <Figure
              filename="03d-improvement-themes.jpg"
              alt="Twelve green synthesis notes: Allow for more customization; Provide data visualization and better metrics guidance; Alerts and notifications; Introduce a poke or reminder feature; Improve the validation system; Improve error messages and validations; Enhance the reporting and data presentation; Visual indicators for goal tracking; Incorporate historical data and trends; Categorize releases; Enhance support for different phases; Integration with other tools."
              caption="The Improvement lens rewritten as twelve needs, before any solution was chosen."
              width={1504}
              height={1312}
            />
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

            <BodyText>
              Before the findings, a sense of breadth. Counts are sessions in which a theme came up, coded from the 233 notes. Two sessions were groups of three, so this is not a head count, and with five sessions it shows spread, not prevalence.
            </BodyText>

            <ScrollTable label="Themes by number of sessions in which they appeared, out of five">
              <thead>
                <tr>
                  <Th>Theme</Th>
                  <Th>Sessions</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td strong>Manual entry and chasing people for data</Td>
                  <Td>5 of 5</Td>
                </tr>
                <tr>
                  <Td strong>Reporting and visualisation</Td>
                  <Td>5 of 5</Td>
                </tr>
                <tr>
                  <Td strong>Unclear fields and definitions</Td>
                  <Td>4 of 5</Td>
                </tr>
                <tr>
                  <Td strong>Validation and error messages</Td>
                  <Td>3 of 5</Td>
                </tr>
                <tr>
                  <Td strong>No history or trends</Td>
                  <Td>2 of 5</Td>
                </tr>
                <tr>
                  <Td strong>Alerts and notifications</Td>
                  <Td>2 of 5</Td>
                </tr>
              </tbody>
            </ScrollTable>

            <SubHeading>1. The tool captured state, not change</SubHeading>
            <BodyText>
              This was the gap that ran through every lens of the synthesis. Team Contract showed where a metric stood. It never showed how it got there.
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
                  <Td>Trend history in reports. Capturing the reason for each change is still open</Td>
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
      {/*  EXPLORATION: five options, each review cut something */}
      <section id="exploration" style={{ padding: "64px 0", background: T.white }}>
        <Wrap>
          <SectionDivider />
          <div style={{ paddingTop: "56px" }}>
            <SectionLabel>Exploration</SectionLabel>
            <SectionTitle>Five options. Each review removed something.</SectionTitle>

            <BodyText>
              I explored five options for the same core flow: program overview, monthly metric update, error state, and reports. Each round was reviewed, and features that didn&apos;t earn their place were cut, not restyled.
            </BodyText>

            <ScrollTable label="The five design options and what each changed">
              <thead>
                <tr>
                  <Th>Option</Th>
                  <Th>What it tried</Th>
                  <Th>What happened</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td strong>1 · Fix in place</Td>
                  <Td>Kept the existing accordion; added My View / Global View, groups and a phase filter to the grid</Td>
                  <Td>The grid was still too wide and too long</Td>
                </tr>
                <tr>
                  <Td strong>2 · Program overview</Td>
                  <Td>Layouts for the Common Segmentation program page that holds Team Contract</Td>
                  <Td>Set the shell the later options sit in</Td>
                </tr>
                <tr>
                  <Td strong>3 · Full feature set</Td>
                  <Td>Custom views, phase tooltips, Add metric, and a Notifications tab</Td>
                  <Td>Notifications tab judged &ldquo;not useful&rdquo;</Td>
                </tr>
                <tr>
                  <Td strong>4 · Notifications removed</Td>
                  <Td>Option 3&apos;s flow without the Notifications tab</Td>
                  <Td>Carried into Option 5</Td>
                </tr>
                <tr>
                  <Td strong>5 · Focused set</Td>
                  <Td>Subprocess filter, saved custom views, trends in reports</Td>
                  <Td>Taken forward</Td>
                </tr>
              </tbody>
            </ScrollTable>

            <Figure
              filename="04a-option1-metrics.jpg"
              alt="Option 1 metrics screen: the Team Contract accordion opened inside the program page, with My View and Global View toggles, a Groups dropdown, an All Phases filter, a Help link, and a table listing metrics such as Gate 17 Ship Release, SOP and Weighted Net Sales Per Unit with status checkboxes."
              caption="Option 1: views, groups and a phase filter added to the existing grid. User name redacted."
              width={1440}
              height={1250}
            />
            <Figure
              filename="04b-option3-notifications-cut.jpg"
              alt="Option 3 Notifications tab inside Program Metrics, with All and Unread columns of alert cards such as: Trend X is degrading and will not meet goal at the current rate for Metric Gate 17 Ship Release, each with a date and an owner."
              caption="Option 3: a Notifications tab. Cut in review as &ldquo;not useful&rdquo;; alerts became pending-task status per owner instead. Owner names redacted."
              width={1440}
              height={890}
            />
          </div>
        </Wrap>
      </section>

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
              We rebuilt the overview around modular cards. Each block of program information stands on its own.
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

            <SubHeading>Inside the program, collapsed by default</SubHeading>
            <BodyText>
              Team Contract moved inside the Common Segmentation program page as two sections, Program Metrics and Reports. Everything starts collapsed, so a program manager opens only the section they came for. Integration with Common Segmentation was the first item on the insights list, and it held up in review.
            </BodyText>
            <Figure
              filename="04c-option5-program-overview.jpg"
              alt="Program page with collapsed accordion sections: Program Dates, Program Build Dates, Program Metrics (Team Contract), Reports (Team Contract), Associated Common Segmentation Programs, SAP Mapping Details, Mapped Tools, One Pager - Summary, and Retrospective (Lessons Learned)."
              caption="Program overview with Team Contract as two collapsed sections. User name redacted."
              width={1440}
              height={620}
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

            <SubHeading>Filter by subprocess, save your own view</SubHeading>
            <BodyText>
              An early option sequenced metrics by subprocess tag. Review feedback was blunt: the sequence wasn&apos;t needed, a filter was. Tags shrank to small labels (PM, FMFA, FMTC), and a Filter Subprocess control lets each owner narrow the grid to their own metrics. Users also asked for more than one way to see the grid, so views became saveable, with a column picker.
            </BodyText>
            <Figure
              filename="04d-option5-custom-view.jpg"
              alt="Add/Edit Custom View dialog with a required View Name field and checkboxes for columns: Tolerance Calculation, Target as of AFE, Upper and Lower Bound, Current Status, Estimate at Full Production, Owner, Progress Update and Comments, with Cancel and Save buttons."
              caption="Custom view: pick the columns, name the view, save it."
              width={789}
              height={497}
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

            <SubHeading>Concept: history and change reasons</SubHeading>
            <BodyText>
              A concept, not a shipped feature. The idea is that every updated metric keeps a short history and a note for why it changed. It came from the finding that people could not explain a red number. PM-written notes on why a metric changed were requested but not designed in this round. The animation below shows the concept.
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
      {/*  WHAT HELD UP: what the reviews kept and cut */}
      <section id="validation" style={{ padding: "64px 0", background: T.white }}>
        <Wrap>
          <SectionDivider />
          <div style={{ paddingTop: "56px" }}>
            <SectionLabel>What Held Up</SectionLabel>
            <SectionTitle>What the reviews kept, and what they cut.</SectionTitle>

            <BodyText>
              After each round, outcomes were written onto the design board as validated features and failed solutions.
            </BodyText>

            <ScrollTable label="Review outcomes: validated features and failed solutions">
              <thead>
                <tr>
                  <Th>Validated</Th>
                  <Th>Cut</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>Team Contract integrated with Common Segmentation</Td>
                  <Td>Notifications section (&ldquo;not useful&rdquo;)</Td>
                </tr>
                <tr>
                  <Td>Delete column at the start of the table</Td>
                  <Td>Progress section (&ldquo;not needed&rdquo;)</Td>
                </tr>
                <tr>
                  <Td>Custom views with saved preferences</Td>
                  <Td>Default sequence by subprocess tag, replaced by a filter</Td>
                </tr>
                <tr>
                  <Td>Global filter at the top of the table</Td>
                  <Td>&mdash;</Td>
                </tr>
                <tr>
                  <Td>Pending-task status shown per owner</Td>
                  <Td>&mdash;</Td>
                </tr>
              </tbody>
            </ScrollTable>

            <div style={{ background: T.text, borderRadius: "8px", padding: "28px 32px", margin: "32px 0" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "40px", fontWeight: 800, color: T.yellow, lineHeight: 1 }}>
                25&ndash;30 hours
              </div>
              <p style={{ color: T.white, fontSize: "15px", lineHeight: 1.6, margin: "12px 0 0" }}>
                <strong>Time saved, reported by PMs and observed.</strong> The design board records about 25&ndash;30 hours of time and effort saved. The period and baseline weren&apos;t recorded, so read it as indicative, not measured.
              </p>
            </div>

            <Figure
              filename="03e-insights-list.jpg"
              alt="Insights list: integrate with CS; incorporate alerts and notifications; implement a poke or reminder feature; add or remove metrics; correct the report format; archived reports; help link for all terms and fields; separate help for tooltip content; input data so Team Contract can be automated; 13 personas who access Team Contract; better validation fields."
              caption="The working insights list used to scope each option."
              width={1190}
              height={704}
            />
          </div>
        </Wrap>
      </section>

      {/*  WORKING IN THE FUEL DESIGN SYSTEM                  */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="fuel" style={{ padding: "64px 0", background: T.white }}>
        <Wrap>
          <SectionDivider />
          <div style={{ paddingTop: "56px" }}>
            <SectionLabel>Working in the Fuel Design System</SectionLabel>
            <SectionTitle>Built from Fuel, extended where it ran out.</SectionTitle>

            <BodyText>
              Team Contract lives inside John Deere&apos;s enterprise tools, so it had to look and behave like them. I built every option from <strong>Fuel v5</strong> components: text fields, buttons, badges, selects, toggles, accordions, tabs and table cells. Counted across the five options, that came to 5,251 component instances.
            </BodyText>
            <BodyText>
              Using Fuel wasn&apos;t just about consistency. It made the research decisions cheaper to build. Inline validation is Fuel&apos;s TextField error state. Subprocess tags are Fuel badges. Saving a view uses Fuel&apos;s checkboxes and buttons inside a dialog I composed, because Fuel had no dialog for it. Status colours come from Fuel&apos;s colour tokens, so red, yellow and green mean the same thing here as in other Deere tools.
            </BodyText>
            <BodyText>
              Where Fuel had no answer, I composed one from Fuel parts instead of inventing new visuals: the phase picker, the Add New Metric and Custom View dialogs, and the advanced filter.
            </BodyText>

            <SubHeading>Component use across the five options</SubHeading>
            <BodyText>
              The largest Fuel groups, counted from component instances in the Figma file. The file has smaller groups that aren&apos;t listed, so these rows don&apos;t add up to the 5,251 total.
            </BodyText>

            <ScrollTable label="Fuel component instances by type, across the five options">
              <thead>
                <tr>
                  <Th>Fuel component</Th>
                  <Th>Instances</Th>
                  <Th>Where it shows up in Team Contract</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td strong>TextField (Input)</Td>
                  <Td>2,801</Td>
                  <Td>Every editable metric cell; View Name in Custom View</Td>
                </tr>
                <tr>
                  <Td strong>Badge</Td>
                  <Td>378</Td>
                  <Td>Subprocess tags (PM, FMFA, FMTC); status chips</Td>
                </tr>
                <tr>
                  <Td strong>Button Icon (edit, delete)</Td>
                  <Td>290</Td>
                  <Td>Row edit and delete actions</Td>
                </tr>
                <tr>
                  <Td strong>Container / Sharp</Td>
                  <Td>286</Td>
                  <Td>Grid and panel containers</Td>
                </tr>
                <tr>
                  <Td strong>Divider / Horizontal</Td>
                  <Td>286</Td>
                  <Td>Table row and header rules</Td>
                </tr>
                <tr>
                  <Td strong>Cell / Text, default</Td>
                  <Td>268</Td>
                  <Td>Read-only table cells</Td>
                </tr>
                <tr>
                  <Td strong>Button (primary, secondary)</Td>
                  <Td>82</Td>
                  <Td>Save (primary, Fuel yellow), Cancel, Reset, Add New Metric</Td>
                </tr>
                <tr>
                  <Td strong>Checkbox</Td>
                  <Td>42</Td>
                  <Td>Row selection; Custom View column picker</Td>
                </tr>
                <tr>
                  <Td strong>Dropdown Menu + Button</Td>
                  <Td>28</Td>
                  <Td>View, Filter Subprocess</Td>
                </tr>
                <tr>
                  <Td strong>Search, Toggle, Select, Accordion</Td>
                  <Td>54</Td>
                  <Td>Grid search; My View / Global View; All Phases; program page sections</Td>
                </tr>
              </tbody>
            </ScrollTable>

            <SubHeading>Anatomy of the metric grid</SubHeading>
            <BodyText>
              The Option 5 grid, taken apart. Numbers on the screen match the list below, which is the readable version.
            </BodyText>
            <FuelAnatomy
              src="/assets/team-contract/04e-option5-metrics.jpg"
              width={1377}
              height={1200}
              alt="Option 5 metrics grid built from Fuel components, with numbered markers on the toolbar, filters, table header, a metric row and a status cell. Values and user name are pixelated."
              caption="Anatomy of the metric grid. Each part is Fuel, and most of them answer a research finding."
              items={fuelAnatomy}
            />

            <SubHeading>Fuel building blocks, as used here</SubHeading>
            <FuelComponentsSample />

            <SubHeading>Fuel tokens bound in the metric grid</SubHeading>
            <BodyText>
              Colours, spacing and radius in the screens are Figma variables, not hard-coded values. That is why yellow means primary action and green means on track here, as in other Deere tools.
            </BodyText>

            <ScrollTable label="Fuel token names and values used in the metric grid">
              <thead>
                <tr>
                  <Th>Group</Th>
                  <Th>Token</Th>
                  <Th>Value</Th>
                </tr>
              </thead>
              <tbody>
                {fuelTokens.map((token) => (
                  <tr key={token.name}>
                    <Td strong>{token.group}</Td>
                    <Td>{token.name}</Td>
                    <Td>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                        {token.value.startsWith("#") ? (
                          <span
                            aria-hidden="true"
                            style={{
                              display: "inline-block",
                              width: "16px",
                              height: "16px",
                              borderRadius: "3px",
                              border: `1px solid ${T.border}`,
                              background: token.value,
                            }}
                          />
                        ) : null}
                        {token.value}
                      </span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </ScrollTable>
            <BodyText style={{ fontSize: "13px" }}>
              Token names are shown as they appeared in the Figma file, to illustrate how the screens were wired. They aren&apos;t a published API.
            </BodyText>

            <BodyText>
              <strong>Contrast.</strong> Fuel&apos;s tertiary text (#666666) is 5.7:1 on white, so it is used for helper text. The disabled grey (#B3B3B3) is about 2.1:1. That is allowed only because inactive controls are excluded from WCAG 1.4.3, and it is never used for content.
            </BodyText>
            <BodyText>
              Status fills (success #99BD93, warning #FFBB52) carry dark text, and every status also shows its value. Colour is never the only signal.
            </BodyText>
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
            <BodyText>
              <strong>Cutting was part of the design.</strong> Alerts came up in the research, yet the Notifications tab was the first thing reviewers cut. The need was real, but it belonged next to each owner&apos;s work, not on a page of its own.
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
