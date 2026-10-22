"use client";

import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import { CaseStudySection, Blockquote } from "@/components/casestudy/CaseStudyContent";
import {
  personalizationMeta,
  overview,
  myContributions,
  problem,
  searchConversion,
  analysis,
  interceptInsights,
  decision,
  variantMatrix,
  execution,
  designDecisions,
  impact,
  lessonsLearned,
  type Rich,
} from "@/content/personalization";
import styles from "./personalization.module.css";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "01: The Problem" },
  { id: "analysis", label: "02: The Analysis" },
  { id: "decision", label: "03: The Decision" },
  { id: "execution", label: "04: The Execution" },
  { id: "impact", label: "05: The Impact" },
];

/* Topshop mock colours used only inside VariantSelector, approximating the
   retailer's header: #ffffff (#fff) page, #1c1b17 ink, #f5f5f3 utility bar,
   #e3e0d6 rules, plus the greys #6e6b60, #b5b0a3, #d3d1c7, #e8e7e3 and #555.
   No other component on this page uses a hex value. */
function VariantSelector() {
  const [activeVariant, setActiveVariant] = React.useState("D");

  const variants = {
    A: {
      title: "Variant A",
      desc: "No border around the search field, with placeholder text 'Enter product name or code'. Without a visible border, users struggled to identify it as an interactive search input.",
      border: "none",
      placeholder: "Enter product name or code",
      isWinner: false
    },
    B: {
      title: "Variant B",
      desc: "Light shade border around the search field with conversational placeholder 'I'm looking for...'. The subtle border improved input visibility, but copy framing was tested further.",
      border: "1px solid #d3d1c7",
      placeholder: "I'm looking for...",
      isWinner: false
    },
    C: {
      title: "Variant C",
      desc: "No border around the search field, with placeholder text 'Search for an item'. While the copy clarified intent, the lack of a visual border still limited input affordance.",
      border: "none",
      placeholder: "Search for an item",
      isWinner: false
    },
    D: {
      title: "Variant D (Winner)",
      desc: "Dark border around the search field with concise 'Search' placeholder text. The crisp visual boundary provided strong input affordance, making the search bar immediately recognizable. Rolled out sitewide after reaching statistical significance.",
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
              WINNER: +5.8% CONVERSIONS
            </div>
          )}
        </div>
      </div>

      {/* Footer Caption */}
      <div style={{ background: "rgba(0,0,0,0.015)", padding: "16px 40px", borderTop: "1px solid var(--color-border)", fontSize: "12px", color: "var(--color-text-secondary)", fontFamily: "JetBrains Mono, monospace" }}>
        Illustrative reconstruction of the test cells, not actual Topshop UI. Traffic split evenly across all cells; run to statistical significance before rollout.
      </div>
    </div>
  );
}

function RichText({ parts }: { parts: Rich }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <React.Fragment key={i}>{part}</React.Fragment>
        ) : (
          <strong key={i}>{part.strong}</strong>
        ),
      )}
    </>
  );
}

function MyRoleCallout() {
  return (
    <div className={styles.callout}>
      <h3 className={styles.eyebrow}>{overview.contributionsTitle}</h3>
      <dl className={styles.contributions}>
        {myContributions.map((item) => (
          <div key={item.area} className={styles.contribution}>
            <dt>{item.area}</dt>
            <dd>{item.detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function SearchConversionChart() {
  const max = Math.max(...searchConversion.bars.map((bar) => bar.value));
  return (
    <figure className={styles.chart}>
      <figcaption className={styles.eyebrow}>{searchConversion.title}</figcaption>
      <div className={styles.bars}>
        {searchConversion.bars.map((bar) => (
          <div key={bar.label} className={styles.barRow}>
            <span className={styles.barLabel}>{bar.label}</span>
            <span className={styles.barTrack} aria-hidden="true">
              <span
                className={bar.highlight ? `${styles.bar} ${styles.barHighlight}` : styles.bar}
                style={{ width: `${(bar.value / max) * 100}%` }}
              />
            </span>
            <span className={styles.barValue}>{bar.display}</span>
          </div>
        ))}
      </div>
      <p className={styles.note}>{searchConversion.caption}</p>
    </figure>
  );
}

function InterceptInsights() {
  return (
    <div className={styles.block}>
      <h3 className={styles.eyebrow}>{analysis.themesTitle}</h3>
      <ul className={styles.themes}>
        {interceptInsights.map((item) => (
          <li key={item.theme} className={styles.theme}>
            <h4 className={styles.themeTitle}>{item.theme}</h4>
            <p className={styles.themeDetail}>{item.detail}</p>
            {item.paraphrase ? (
              <figure className={styles.paraphrase}>
                <figcaption className={styles.paraphraseLabel}>Paraphrased response</figcaption>
                <blockquote>
                  <p>&ldquo;{item.paraphrase}&rdquo;</p>
                </blockquote>
              </figure>
            ) : null}
            <p className={styles.action}>
              <strong>Action taken:</strong> {item.action}
            </p>
          </li>
        ))}
      </ul>
      <p className={styles.note}>{analysis.themesNote}</p>
    </div>
  );
}

function VariantMatrix2x2() {
  return (
    <div className={styles.block}>
      <table className={styles.matrix}>
        <caption className={styles.eyebrow}>{variantMatrix.title}</caption>
        <thead>
          <tr>
            {variantMatrix.columnHeads.map((head) => (
              <th key={head} scope="col">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        {/* Each row label sits on its own row, so the cells keep the full width on phones. */}
        {variantMatrix.rows.map((row) => (
          <tbody key={row.head}>
            <tr>
              <th scope="rowgroup" colSpan={2}>
                {row.head}
              </th>
            </tr>
            <tr>
              {row.cells.map((cell) => (
                <td key={cell.name} className={cell.winner ? styles.winner : undefined}>
                  <span className={styles.cellName}>{cell.name}</span>
                  <span className={styles.cellDetail}>{cell.detail}</span>
                  {cell.result ? <span className={styles.cellResult}>{cell.result}</span> : null}
                </td>
              ))}
            </tr>
          </tbody>
        ))}
      </table>
      <p className={styles.note}>{variantMatrix.note}</p>
    </div>
  );
}

function DesignDecisionsSection() {
  return (
    <div className={styles.block}>
      <h3 className={styles.subhead}>{execution.decisionsTitle}</h3>
      <p className={styles.body}>{execution.decisionsIntro}</p>
      <ol className={styles.decisions}>
        {designDecisions.map((item, i) => (
          <li key={item.decision} className={styles.decision}>
            <span className={styles.decisionNumber} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h4 className={styles.cardTitle}>{item.decision}</h4>
              <p className={styles.cardBody}>{item.reasoning}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ImpactGrid() {
  return (
    <ul className={styles.impact}>
      {impact.metrics.map((metric) => (
        <li key={metric.value} className={styles.metric}>
          <span className={styles.metricValue}>{metric.value}</span>
          <span className={styles.metricLabel}>{metric.label}</span>
          <span className={styles.metricDetail}>{metric.detail}</span>
        </li>
      ))}
    </ul>
  );
}

export default function TopshopCaseStudy() {
  return (
    <div className={styles.page}>
      <CaseStudyHero
        title={personalizationMeta.title}
        category={personalizationMeta.category}
        role={personalizationMeta.role}
        team={personalizationMeta.team}
        timeline={personalizationMeta.timeline}
      />

      <CaseStudyLayout sections={sections}>
        <CaseStudySection id="overview" heading="Overview">
          <p>{overview.lead}</p>

          <dl className={styles.stats}>
            {overview.stats.map((stat) => (
              <div key={stat.label}>
                <dt className={styles.eyebrow}>{stat.label}</dt>
                <dd className={stat.highlight ? `${styles.statValue} ${styles.statHighlight}` : styles.statValue}>
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <MyRoleCallout />
        </CaseStudySection>

        <CaseStudySection id="problem" heading="01: The Problem">
          <h3 className={styles.subhead}>{problem.heading}</h3>
          <p>{problem.lead}</p>
          <SearchConversionChart />
          <p>{problem.why}</p>
        </CaseStudySection>

        <CaseStudySection id="analysis" heading="02: The Analysis">
          <h3 className={styles.subhead}>{analysis.heading}</h3>

          <div className={styles.signals}>
            {analysis.signals.map((signal) => (
              <div key={signal.label} className={styles.card}>
                <h4 className={styles.eyebrow}>{signal.label}</h4>
                <p className={styles.cardBody}>
                  <RichText parts={signal.body} />
                </p>
              </div>
            ))}
          </div>

          <Blockquote text={analysis.quote} />

          <InterceptInsights />

          <p>{analysis.setup}</p>
        </CaseStudySection>

        <CaseStudySection id="decision" heading="03: The Decision">
          <h3 className={styles.subhead}>{decision.heading}</h3>
          {decision.body.map((parts, i) => (
            <p key={i}>
              <RichText parts={parts} />
            </p>
          ))}

          <ul className={styles.hypotheses}>
            {decision.hypotheses.map((hypothesis) => (
              <li key={hypothesis.id} className={styles.hypothesis}>
                <span className={styles.hypothesisId}>{hypothesis.id}</span>
                <span className={styles.hypothesisLabel}>{hypothesis.label}</span>
              </li>
            ))}
          </ul>

          <VariantMatrix2x2 />

          <p>{decision.build}</p>
        </CaseStudySection>

        <CaseStudySection id="execution" heading="04: The Execution">
          <h3 className={styles.subhead}>{execution.heading}</h3>
          <p>{execution.intro}</p>

          <VariantSelector />

          <DesignDecisionsSection />
        </CaseStudySection>

        <CaseStudySection id="impact" heading="05: The Impact">
          <h3 className={styles.subhead}>{impact.heading}</h3>

          <ImpactGrid />

          <p>{impact.body}</p>

          <div className={styles.lessons}>
            <h3 className={styles.subhead}>{impact.lessonsTitle}</h3>
            <ul className={styles.lessonList}>
              {lessonsLearned.map((lesson) => (
                <li key={lesson.title}>
                  <h4 className={styles.cardTitle}>{lesson.title}</h4>
                  <p className={styles.cardBody}>{lesson.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <p className={styles.footnote}>{impact.footnote}</p>
        </CaseStudySection>
      </CaseStudyLayout>
    </div>
  );
}
