"use client";

import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import {
  CaseStudySection,
  ContextCard,
  ResultsGrid,
  Blockquote,
} from "@/components/casestudy/CaseStudyContent";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "solution", label: "What We Built" },
  { id: "contribution", label: "My Contribution" },
  { id: "design", label: "Design Decisions" },
  { id: "architecture", label: "Architecture" },
  { id: "positioning", label: "Positioning" },
  { id: "impact", label: "Impact & Results" },
  { id: "learnings", label: "What's Next" },
];

function TechBadge({ name, color }: { name: string; color: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 14px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: 600,
        background: `${color}12`,
        color: color,
        border: `1px solid ${color}30`,
        marginRight: "8px",
        marginBottom: "8px",
      }}
    >
      {name}
    </span>
  );
}

export default function CryptoSecureCaseStudy() {
  return (
    <main>
      <CaseStudyHero
        title="CryptoSecure: AI-Powered Smart Contract Security"
        category="Blockchain Security / ML Engineering"
        role="ML/AI Engineering & Frontend"
        team="4 Members"
        timeline="~3 months"
        image="/assets/Cryptosecure.jpg"
      />

      <CaseStudyLayout sections={sections}>
        <CaseStudySection
          id="overview"
          label="Overview"
          heading="Making Blockchain Security Accessible to Every Developer on the TON Network"
        >
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "24px",
              marginBottom: "32px",
            }}
          >
            <a
              href="https://crypto-secure-dev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "100px",
                background: "#0098EA",
                color: "#ffffff",
                fontWeight: 600,
                textDecoration: "none",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Live App →
            </a>
            <a
              href="https://github.com/the-sniper/crypto_secure"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "100px",
                background: "rgba(0,0,0,0.05)",
                color: "var(--color-text-primary)",
                fontWeight: 600,
                textDecoration: "none",
                border: "1px solid rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              GitHub →
            </a>
          </div>

          <p>
            <strong>Project Type:</strong> Graduate Team Project — Drexel
            University
            <br />
            <strong>Duration:</strong> ~3 months
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "4px",
              marginTop: "24px",
              marginBottom: "24px",
            }}
          >
            <TechBadge name="Next.js" color="#000000" />
            <TechBadge name="React" color="#61DAFB" />
            <TechBadge name="TypeScript" color="#3178C6" />
            <TechBadge name="Tailwind CSS" color="#06B6D4" />
            <TechBadge name="Shadcn UI" color="#000000" />
            <TechBadge name="OpenAI GPT-4o" color="#412991" />
            <TechBadge name="Recharts" color="#FF7300" />
            <TechBadge name="Vercel" color="#000000" />
          </div>
        </CaseStudySection>

        <CaseStudySection
          id="problem"
          label="The Problem"
          heading="The Problem Nobody Was Solving"
        >
          <p>
            Here's a number that should worry anyone building on the TON
            blockchain: <strong>14,995 vulnerabilities</strong> were recently
            discovered across just 1,640 smart contracts. That's more than 9
            bugs per contract on average. And these aren't cosmetic bugs —
            they're security holes that let hackers drain wallets, steal funds,
            and exploit users.
          </p>
          <p>
            The TON blockchain is exploding. Telegram's 900+ million users are
            being funnelled into a crypto ecosystem that's growing faster than
            the security infrastructure can keep up. Developers — many of them
            building their first smart contracts — are deploying code that
            handles real money. And the safety net doesn't exist.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginTop: "16px",
              marginBottom: "16px",
            }}
          >
            <ContextCard
              title="Traditional Option"
              text="A professional security audit costs $10,000 to $50,000 and takes 2 to 4 weeks. Impossible for independent developers, students, or small NFT teams."
            />
            <ContextCard
              title="Automated Option"
              text="Existing tools catch syntax errors—like spell-checking a legal document. They miss semantic vulnerabilities and logic flaws that get exploited."
            />
          </div>
          <p>
            So developers are left with a choice: spend money they don't have on
            a manual audit, or launch and hope for the best. We built
            CryptoSecure to eliminate that choice.
          </p>
          <Blockquote text="Smart contract vulnerabilities aren't just technical bugs. They're real money at risk. A reentrancy flaw in a DeFi contract doesn't just cause an error — it lets someone drain the entire liquidity pool. The stakes aren't theoretical." />
        </CaseStudySection>

        <CaseStudySection
          id="solution"
          label="The Solution"
          heading="What We Built"
        >
          <p>
            <strong>CryptoSecure (also called TON Guardian)</strong> is an
            AI-powered security scanner that analyses TON smart contracts in
            seconds, identifies vulnerabilities across 8+ categories, explains
            them in plain English, and generates the actual code fixes — not
            just warnings, but working patches.
          </p>
          <p>
            The experience is designed for developer velocity, not security
            theatre:
          </p>
          <h4 style={{ margin: "24px 0 16px", fontSize: "18px" }}>
            Upload → Analyse → Fix → Export. That's it.
          </h4>
          <p>
            A developer drags in their FunC or Tact smart contract file (or
            pastes a code snippet directly). The AI engine scans it in under 30
            seconds. A security score from 0 to 100 appears, with
            vulnerabilities broken down by severity — Critical, High, Medium,
            Low. Each finding comes with a plain-language explanation of what's
            wrong, what could happen if it's exploited, the specific lines of
            code affected, and a recommended fix with working replacement code.
          </p>
          <p>
            The developer reviews the fixes in an interactive diff viewer —
            side-by-side comparison, colour-coded changes, the ability to
            accept, reject, or manually edit each suggestion. When they're
            satisfied, they export a professional PDF audit report with severity
            scoring, impact analysis, and an executive summary suitable for
            sharing with investors or partners.
          </p>
          <p>
            <strong>
              What used to cost $10,000 and take a month now takes 30 seconds
              and costs nothing.
            </strong>
          </p>
        </CaseStudySection>

        <CaseStudySection
          id="contribution"
          label="My Contribution"
          heading="Owning the Engine & Interface"
        >
          <p>
            In a team of four, I owned two areas: the{" "}
            <strong>AI/ML analysis pipeline</strong> and portions of the{" "}
            <strong>frontend interface</strong>.
          </p>

          <h3 style={{ marginTop: "32px", marginBottom: "16px" }}>
            The AI Engine
          </h3>
          <p>
            The core technical challenge was this: how do you get an AI system
            to understand smart contract security deeply enough to catch real
            vulnerabilities — not just pattern-match against a list of known bad
            code snippets? The approach combined two layers:
          </p>

          <div
            style={{
              padding: "24px",
              margin: "32px 0",
              background: "rgba(0,0,0,0.02)",
              border: "1px solid rgba(0,0,0,0.05)",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "32px",
            }}
          >
            <div
              style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}
            >
              <div
                style={{
                  background: "#0098EA",
                  color: "#fff",
                  minWidth: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                1
              </div>
              <div style={{ flex: 1 }}>
                <h4
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "18px",
                    color: "#1a1c20",
                  }}
                >
                  Layer 1: Static Analysis & Heuristic Engine
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    lineHeight: "1.6",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  A custom vulnerability database built from TONScanner research
                  and known exploit patterns specific to the TON blockchain.
                  This catches the deterministic issues—the patterns we know are
                  dangerous based on historical exploits and documented
                  vulnerability classes. This layer works without any API
                  dependency and provides baseline detection.
                </p>
              </div>
            </div>
            <div
              style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}
            >
              <div
                style={{
                  background: "#0098EA",
                  color: "#fff",
                  minWidth: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                2
              </div>
              <div style={{ flex: 1 }}>
                <h4
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "18px",
                    color: "#1a1c20",
                  }}
                >
                  Layer 2: AI-Powered Semantic Analysis
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    lineHeight: "1.6",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Using OpenAI's GPT-4o model to perform deeper semantic
                  reasoning about the contract's logic. This is where
                  CryptoSecure goes beyond what traditional automated tools can
                  do—the AI can understand the intent of the code, spot logical
                  flaws that aren't captured by pattern matching, and reason
                  about how different functions interact in ways that create
                  emergent vulnerabilities.
                </p>
              </div>
            </div>
          </div>

          <p>
            The combination matters. Static analysis is fast and deterministic
            but limited to known patterns. AI semantic analysis can catch novel
            vulnerabilities but can hallucinate or miss deterministic issues.
            Together, they're more reliable than either alone.
          </p>

          <h4 style={{ margin: "24px 0 16px" }}>
            The vulnerability categories the engine detects:
          </h4>
          <div
            style={{
              overflowX: "auto",
              marginBottom: "32px",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
                textAlign: "left",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "rgba(0,0,0,0.05)",
                    borderBottom: "2px solid rgba(0,0,0,0.1)",
                  }}
                >
                  <th
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Category
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    What It Catches
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Why It Matters on TON
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                      fontWeight: "bold",
                    }}
                  >
                    Reentrancy
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Functions called recursively before state updates complete
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    The #1 exploit vector in DeFi — the classic "drain" attack
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                      fontWeight: "bold",
                    }}
                  >
                    Access Control
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Missing permission checks on privileged functions
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Allows unauthorised users to execute admin operations
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                      fontWeight: "bold",
                    }}
                  >
                    Integer Overflow
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Arithmetic operations that exceed data type bounds
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Can manipulate balances, mint tokens, or bypass limits
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                      fontWeight: "bold",
                    }}
                  >
                    Unchecked Returns
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    External calls whose return values aren't validated
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Failed operations that proceed as if they succeeded
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                      fontWeight: "bold",
                    }}
                  >
                    Gas Limit Issues
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Operations that could exceed gas limits mid-execution
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Transactions that revert after partial state changes
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                      fontWeight: "bold",
                    }}
                  >
                    TON Defects
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Vulnerabilities unique to FunC/Tact and TON
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Issues not caught by tools designed for Ethereum/Solidity
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                      fontWeight: "bold",
                    }}
                  >
                    Input Validation
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Missing or insufficient validation of external inputs
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Allows attackers to pass malicious data
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                      fontWeight: "bold",
                    }}
                  >
                    Logic Errors
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Semantic flaws in business logic
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Requires understanding what the code is supposed to do
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ marginTop: "32px", marginBottom: "16px" }}>
            The "Hacker Mode" Feature
          </h3>
          <p>
            We built an advanced analysis mode (powered by GPT-4o with a
            dedicated API key) that goes beyond detection into adversarial
            thinking. Hacker Mode doesn't just identify vulnerabilities — it
            describes how an attacker would exploit them, step by step. This was
            designed for developers who want to understand the threat model, not
            just the fix list.
          </p>
          <p>
            Think of it as the difference between a doctor saying "you have high
            blood pressure" and a doctor explaining "here's what will happen to
            your cardiovascular system over the next 10 years if this isn't
            addressed." The second version creates urgency and understanding.
            Hacker Mode does the same for smart contract security.
          </p>

          <h3 style={{ marginTop: "32px", marginBottom: "16px" }}>
            Frontend Contributions
          </h3>
          <p>
            I worked on portions of the React frontend, specifically around the
            security score visualisation (built with Recharts), the
            vulnerability report display, and the integration between the
            analysis engine output and the UI components. The interface uses
            Shadcn UI components styled with Tailwind CSS, with a dark-mode
            aesthetic that matches the developer tooling context.
          </p>
        </CaseStudySection>

        <CaseStudySection
          id="design"
          label="Design"
          heading="The Design Decisions That Mattered"
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <div>
              <h4
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "18px",
                  color: "#1a1c20",
                }}
              >
                Decision 1: Plain English Over Error Codes
              </h4>
              <p style={{ margin: 0 }}>
                Most security tools speak in jargon: "CVE-2024-XXXX detected at
                line 47." Technically accurate. Practically useless to a
                developer who isn't a security specialist. We made a deliberate
                choice: every finding would be explained in language a developer
                with no security background could understand. Not dumbed down —
                just translated.
              </p>
            </div>
            <div>
              <h4
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "18px",
                  color: "#1a1c20",
                }}
              >
                Decision 2: Fix It, Don't Just Flag It
              </h4>
              <p style={{ margin: 0 }}>
                Identifying a vulnerability is only half the value. Every
                finding includes a remediation section with working replacement
                code. The interactive diff viewer shows the vulnerable code on
                the left and the patched code on the right. This transforms the
                tool from a diagnostic into a solution.
              </p>
            </div>
            <div>
              <h4
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "18px",
                  color: "#1a1c20",
                }}
              >
                Decision 3: The Security Score as a Trust Signal
              </h4>
              <p style={{ margin: 0 }}>
                The 0–100 security score isn't just a vanity metric. It's
                designed to be shareable — a signal that a project can show to
                investors, partners, and users to demonstrate that their
                contract has been analysed and meets a minimum security
                threshold.
              </p>
            </div>
            <div>
              <h4
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "18px",
                  color: "#1a1c20",
                }}
              >
                Decision 4: Sample Contracts for Education
              </h4>
              <p style={{ margin: 0 }}>
                We included pre-loaded vulnerable contracts so developers can
                see the tool in action immediately. This serves two purposes: it
                removes the "cold start" barrier, and it educates developers
                about common vulnerability patterns before they encounter them
                in their own work.
              </p>
            </div>
          </div>

          <Blockquote text="The best security tool is one that makes developers better at security — not just one that catches their mistakes. If a developer uses CryptoSecure ten times and starts writing more secure code on the eleventh, that's a bigger win than catching ten bugs." />
        </CaseStudySection>

        <CaseStudySection
          id="architecture"
          label="Architecture"
          heading="Technical Architecture"
        >
          <div
            style={{
              padding: "24px",
              background: "rgba(0,0,0,0.02)",
              borderRadius: "12px",
              border: "1px solid rgba(0,0,0,0.06)",
              fontFamily: "monospace",
              fontSize: "13px",
              lineHeight: 1.8,
              color: "var(--color-text-secondary)",
              whiteSpace: "pre-wrap",
            }}
          >
            {`Developer Input
    │
    ├── File Upload (.fc, .tact)
    └── Code Paste (inline editor)
           │
           ▼
    ┌──────────────────────┐
    │  Static Analysis     │  Layer 1: Pattern matching against
    │  Engine              │  known vulnerability database
    │  (Custom heuristics) │  (TONScanner research + known exploits)
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │  AI Semantic Analysis│  Layer 2: GPT-4o deep reasoning
    │  (OpenAI API)        │  about logic, intent, and emergent
    │                      │  vulnerability patterns
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │  Results Aggregation │  Merge findings, deduplicate,
    │  & Scoring           │  calculate severity-weighted
    │                      │  security score (0–100)
    └──────────┬───────────┘
               │
               ├──→ Security Score Dashboard (Recharts)
               ├──→ Vulnerability Report (detailed findings)
               ├──→ Auto-Fix Engine (patched code generation)
               ├──→ Diff Viewer (side-by-side comparison)
               └──→ PDF Report Export (audit-ready document)`}
          </div>
        </CaseStudySection>

        <CaseStudySection
          id="positioning"
          label="Positioning"
          heading="Competitive Positioning"
        >
          <p>
            We built CryptoSecure to fill a specific gap that no existing tool
            addresses:
          </p>
          <div
            style={{
              overflowX: "auto",
              marginTop: "24px",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
                textAlign: "left",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "rgba(0,0,0,0.05)",
                    borderBottom: "2px solid rgba(0,0,0,0.1)",
                  }}
                >
                  <th
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Capability
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                      background: "rgba(0,152,234,0.1)",
                      color: "#0098EA",
                    }}
                  >
                    CryptoSecure
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Manual Audits
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Existing Tools
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                      fontWeight: "bold",
                    }}
                  >
                    Speed
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    30 seconds
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    2–4 weeks
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Minutes
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                      fontWeight: "bold",
                    }}
                  >
                    Cost
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Free
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    $10k–$50k
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Free–$1k
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                      fontWeight: "bold",
                    }}
                  >
                    Explanation
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Plain English with fixes
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Technical reports
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Error codes
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                      fontWeight: "bold",
                    }}
                  >
                    Understanding
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    AI-powered reasoning
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Human expertise
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Pattern match
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                      fontWeight: "bold",
                    }}
                  >
                    Accessibility
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Any developer
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Enterprise only
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Sec-minded
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                      fontWeight: "bold",
                    }}
                  >
                    TON support
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Built for FunC/Tact
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Varies
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Almost none
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                      fontWeight: "bold",
                    }}
                  >
                    Fix gen
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Automatic patched code
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Manual advice
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    None
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                      fontWeight: "bold",
                    }}
                  >
                    Learning
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Adapts to new exploits
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Manual updates
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Fixed rules
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CaseStudySection>

        <CaseStudySection
          id="impact"
          label="Impact & Results"
          heading="What We Compressed"
        >
          <p>
            The value proposition is a compression ratio: $10,000–$50,000 and
            2–4 weeks of manual audit → 30 seconds and $0. That's not a marginal
            improvement. It's a category shift in who can afford to write secure
            smart contracts.
          </p>

          <ResultsGrid
            items={[
              {
                value: "< 30s",
                label: "Analysis speed",
                description:
                  "Under 30 seconds to scan a smart contract natively.",
              },
              {
                value: "8+",
                label: "Vulnerability Types",
                description:
                  "Detects various categories including TON-specific defects.",
              },
              {
                value: "19",
                label: "Deployments",
                description:
                  "Production deployments on Vercel ensuring continuous availability.",
              },
              {
                value: "Auto",
                label: "Fix Generation",
                description:
                  "Provides working patched code for detected issues.",
              },
            ]}
          />

          <p style={{ marginTop: "32px", marginBottom: "80px" }}>
            <strong>Why it matters at scale:</strong> TON aims to onboard 500
            million users by 2027. That growth will be built on smart contracts
            written by thousands of developers — most of whom won't have
            security budgets. CryptoSecure makes the difference between those
            contracts being audited or being deployed blind.
          </p>
        </CaseStudySection>

        <CaseStudySection
          id="learnings"
          label="What I Learned"
          heading="Reflections & Next Steps"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              marginBottom: "48px",
            }}
          >
            <div>
              <p style={{ margin: 0 }}>
                <strong>AI is a tool, not an oracle.</strong> The most important
                design decision we made was layering static analysis under the
                AI engine rather than relying on AI alone. GPT-4o is remarkably
                good at semantic reasoning about code — but it can hallucinate
                or produce overconfident assessments. Together, they're
                genuinely useful.
              </p>
            </div>
            <div>
              <p style={{ margin: 0 }}>
                <strong>Explanation is a feature, not a nice-to-have.</strong> A
                security tool that says "reentrancy vulnerability detected" is
                technically correct but practically useless to 80% of its target
                audience. Making security knowledge accessible isn't a UX polish
                item — it's the core value proposition.
              </p>
            </div>
            <div>
              <p style={{ margin: 0 }}>
                <strong>
                  Developer experience drives adoption for developer tools.
                </strong>{" "}
                The diff viewer, the auto-fix engine, the one-click export —
                these aren't the "smart" parts of the tool. But they're why
                developers actually use it rather than looking at the
                vulnerability list and closing the tab.
              </p>
            </div>
            <div>
              <p style={{ margin: 0 }}>
                <strong>My UX instincts shaped the ML output design.</strong>{" "}
                Eight years of thinking about how users consume information
                directly influenced how the analysis engine presents its
                findings. The severity hierarchy, the progressive disclosure,
                the visual score dashboard — these are UX patterns applied to ML
                output.
              </p>
            </div>
          </div>

          <h3>What's Next</h3>
          <div
            style={{
              padding: 0,
              margin: "24px 0 0 0",
              fontSize: "16px",
              color: "var(--color-text-secondary)",
              lineHeight: "1.6",
            }}
          >
            <div style={{ marginBottom: "16px", display: "flex", gap: "12px" }}>
              <span
                style={{
                  color: "var(--color-accent)",
                  fontSize: "20px",
                  lineHeight: "1.2",
                }}
              >
                →
              </span>
              <div>
                <strong style={{ color: "#1a1c20" }}>
                  Expanded language support
                </strong>{" "}
                — Extending beyond FunC and Tact to cover Solidity (Ethereum)
                and Move (Aptos/Sui).
              </div>
            </div>
            <div style={{ marginBottom: "16px", display: "flex", gap: "12px" }}>
              <span
                style={{
                  color: "var(--color-accent)",
                  fontSize: "20px",
                  lineHeight: "1.2",
                }}
              >
                →
              </span>
              <div>
                <strong style={{ color: "#1a1c20" }}>CI/CD integration</strong>{" "}
                — A GitHub Action / CLI tool that runs CryptoSecure as part of
                the deployment pipeline.
              </div>
            </div>
            <div style={{ marginBottom: "16px", display: "flex", gap: "12px" }}>
              <span
                style={{
                  color: "var(--color-accent)",
                  fontSize: "20px",
                  lineHeight: "1.2",
                }}
              >
                →
              </span>
              <div>
                <strong style={{ color: "#1a1c20" }}>
                  Vulnerability knowledge base
                </strong>{" "}
                — A public, searchable database of TON vulnerability patterns
                that feeds back into the analysis engine.
              </div>
            </div>
            <div style={{ marginBottom: "16px", display: "flex", gap: "12px" }}>
              <span
                style={{
                  color: "var(--color-accent)",
                  fontSize: "20px",
                  lineHeight: "1.2",
                }}
              >
                →
              </span>
              <div>
                <strong style={{ color: "#1a1c20" }}>
                  Community-driven rule sets
                </strong>{" "}
                — Allowing security researchers to contribute custom detection
                rules.
              </div>
            </div>
          </div>
        </CaseStudySection>
      </CaseStudyLayout>
    </main>
  );
}
