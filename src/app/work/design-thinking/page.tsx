"use client";

import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import {
  CaseStudySection,
  ResultsGrid,
  CaseStudyImage,
  PersonaProgress,
  Blockquote,
  PersonaCardActual,
  SkillSpotlight,
  SkillConstellation,
} from "@/components/casestudy/CaseStudyContent";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "research", label: "Research & Insights" },
  { id: "solutions", label: "Prioritisation & Persona" },
  { id: "results", label: "Validation & Results" },
];

function DoubleDiamondDiagram() {
  return (
    <div style={{
      margin: "48px 0",
      background: "#fdfdfd",
      padding: "40px 24px",
      borderRadius: "16px",
      border: "1px solid var(--color-border)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflowX: "auto"
    }}>
      <svg viewBox="0 0 880 380" width="100%" height="auto" style={{ minWidth: "850px", display: "block" }}>
        <defs>
          <linearGradient id="discoverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2f5f1" />
            <stop offset="100%" stopColor="#bde7e0" />
          </linearGradient>
          <linearGradient id="defineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#009688" />
            <stop offset="100%" stopColor="#00675b" />
          </linearGradient>
          <linearGradient id="developGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffedea" />
            <stop offset="100%" stopColor="#ffdbd3" />
          </linearGradient>
          <linearGradient id="deliverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e07765" />
            <stop offset="100%" stopColor="#b34937" />
          </linearGradient>
          
          <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.06" />
          </filter>
        </defs>

        <text x="260" y="25" textAnchor="middle" fill="#00675b" fontSize="11" fontWeight="700" letterSpacing="0.08em" fontFamily="var(--font-primary)">PROBLEM SPACE · DESIGN THE RIGHT THING</text>
        <text x="600" y="25" textAnchor="middle" fill="#b34937" fontSize="11" fontWeight="700" letterSpacing="0.08em" fontFamily="var(--font-primary)">SOLUTION SPACE · DESIGN THINGS RIGHT</text>

        <g filter="url(#shadow)">
          <circle cx="50" cy="110" r="26" fill="#e8f5f3" stroke="#bfe7e0" strokeWidth="1" />
          <text x="50" y="108" textAnchor="middle" fill="#1c5249" fontSize="9.5" fontWeight="700" fontFamily="var(--font-primary)">Stake-</text>
          <text x="50" y="119" textAnchor="middle" fill="#1c5249" fontSize="9.5" fontWeight="700" fontFamily="var(--font-primary)">holders</text>
          
          <circle cx="104" cy="110" r="26" fill="#ffedea" stroke="#ffd9d1" strokeWidth="1" />
          <text x="104" y="113" textAnchor="middle" fill="#802e21" fontSize="9.5" fontWeight="700" fontFamily="var(--font-primary)">Customers</text>
        </g>
        <text x="77" y="152" textAnchor="middle" fill="#6c7a7e" fontSize="9" fontWeight="600" fontFamily="var(--font-primary)">Inputs feed research</text>
        
        <path d="M 134 110 L 152 110" stroke="#a0afb3" strokeWidth="1.5" fill="none" />
        <polygon points="152,107 158,110 152,113" fill="#a0afb3" />

        <g filter="url(#shadow)">
          <polygon points="164,110 264,30 264,190" fill="url(#discoverGrad)" stroke="#bde7e0" strokeWidth="0.5" />
          <text x="222" y="115" textAnchor="middle" fill="#004d40" fontSize="17" fontWeight="800" fontFamily="var(--font-display)">Discover</text>
          
          <polygon points="264,30 364,110 264,190" fill="url(#defineGrad)" />
          <text x="306" y="115" textAnchor="middle" fill="#ffffff" fontSize="17" fontWeight="800" fontFamily="var(--font-display)">Define</text>
        </g>

        {/* Multi-line labels to prevent overlaps */}
        <text x="214" y="210" textAnchor="middle" fill="#404c4f" fontSize="9.5" fontWeight="600" fontFamily="var(--font-primary)">
          <tspan x="214" dy="0">Explore needs</tspan>
          <tspan x="214" dy="13">&amp; opportunities</tspan>
        </text>
        <text x="314" y="210" textAnchor="middle" fill="#404c4f" fontSize="9.5" fontWeight="600" fontFamily="var(--font-primary)">
          <tspan x="314" dy="0">Prioritize &amp; frame</tspan>
          <tspan x="314" dy="13">the problem</tspan>
        </text>

        <line x1="432" x2="432" y1="40" y2="180" stroke="#78888c" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="432" cy="40" r="4" fill="#505c60" />
        <rect x="402" y="98" width="60" height="24" rx="4" fill="#ffffff" stroke="#78888c" strokeWidth="1" />
        <text x="432" y="108" textAnchor="middle" fill="#404c4f" fontSize="7.5" fontWeight="700" letterSpacing="0.04em" fontFamily="var(--font-primary)">INTERNAL</text>
        <text x="432" y="116" textAnchor="middle" fill="#404c4f" fontSize="7.5" fontWeight="700" letterSpacing="0.04em" fontFamily="var(--font-primary)">GATE</text>

        <g filter="url(#shadow)">
          <polygon points="500,110 600,30 600,190" fill="url(#developGrad)" stroke="#ffdbd3" strokeWidth="0.5" />
          <text x="558" y="115" textAnchor="middle" fill="#802e21" fontSize="17" fontWeight="800" fontFamily="var(--font-display)">Develop</text>
          
          <polygon points="600,30 700,110 600,190" fill="url(#deliverGrad)" />
          <text x="642" y="115" textAnchor="middle" fill="#ffffff" fontSize="17" fontWeight="800" fontFamily="var(--font-display)">Deliver</text>
        </g>
        
        <text x="550" y="210" textAnchor="middle" fill="#404c4f" fontSize="9.5" fontWeight="600" fontFamily="var(--font-primary)">
          <tspan x="550" dy="0">Sprint, prototype</tspan>
          <tspan x="550" dy="13">&amp; test</tspan>
        </text>
        <text x="650" y="210" textAnchor="middle" fill="#404c4f" fontSize="9.5" fontWeight="600" fontFamily="var(--font-primary)">
          <tspan x="650" dy="0">Build, QA &amp;</tspan>
          <tspan x="650" dy="13">launch the MVP</tspan>
        </text>

        <path d="M 708 110 L 726 110" stroke="#a0afb3" strokeWidth="1.5" fill="none" />
        <polygon points="726,107 732,110 726,113" fill="#a0afb3" />

        <g filter="url(#shadow)">
          <rect x="738" y="75" width="112" height="70" rx="8" fill="#f5f7f8" stroke="#d5dcde" strokeWidth="1" />
          <text x="794" y="93" textAnchor="middle" fill="#1d2629" fontSize="9.5" fontWeight="700" fontFamily="var(--font-primary)">Support &</text>
          <text x="794" y="105" textAnchor="middle" fill="#1d2629" fontSize="9.5" fontWeight="700" fontFamily="var(--font-primary)">Knowledge</text>
          <text x="794" y="121" textAnchor="middle" fill="#606d71" fontSize="8" fontWeight="600" fontFamily="var(--font-primary)">Docs & enablement for</text>
          <text x="794" y="131" textAnchor="middle" fill="#606d71" fontSize="8" fontWeight="600" fontFamily="var(--font-primary)">lasting adoption</text>
        </g>

        <g>
          <circle cx="403" cy="256" r="16" fill="#758285" />
          <text x="403" y="259" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700" fontFamily="var(--font-primary)">PM</text>
          
          <circle cx="432" cy="256" r="16" fill="#1b7a70" />
          <text x="432" y="259" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700" fontFamily="var(--font-primary)">UX</text>
          
          <circle cx="461" cy="256" r="16" fill="#d26b59" />
          <text x="461" y="259" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700" fontFamily="var(--font-primary)">Tech</text>

          <text x="432" y="288" textAnchor="middle" fill="#505c60" fontSize="10" fontWeight="600" fontFamily="var(--font-primary)">Cross-functional pod runs the sprint & feasibility calls</text>
        </g>

        <path d="M 800 152 Q 800 326 432 326 T 77 152" fill="none" stroke="#78888c" strokeWidth="1.5" />
        <polygon points="73,158 77,148 81,158" fill="#78888c" />

        <rect x="362" y="316" width="140" height="20" rx="10" fill="#ffffff" stroke="#78888c" strokeWidth="1" />
        <text x="432" y="329" textAnchor="middle" fill="#1c2527" fontSize="9" fontWeight="700" fontFamily="var(--font-primary)">Adoption · Value · Speed</text>
        <text x="432" y="352" textAnchor="middle" fill="#505c60" fontSize="9.5" fontWeight="600" fontFamily="var(--font-primary)">Continuous feedback loop ➔ fuels the next Discovery (&quot;UX Mastery&quot;)</text>
      </svg>
    </div>
  );
}

export default function DesignThinkingCaseStudy() {
  return (
    <CaseStudyLayout sections={sections}>
      <CaseStudyHero
        title="Product Managers with UX & Design Thinking"
        category="Embedding a UX culture inside a 250+ product portfolio at John Deere"
        role="Lead UX Consultant"
        team="2 UX Researchers · 1 Tech Lead · 1 PM"
        timeline="12 Weeks"
      />

      {/* --- OVERVIEW & BACKGROUND --- */}
      <CaseStudySection
        id="overview"
        label="Overview"
        heading="A Systems Problem Nobody Was Naming"
      >
        <h3>Overview</h3>
        <p>
          John Deere manages a portfolio of 250+ products, with Product Managers sitting at the intersection of user needs, engineering timelines, and commercial strategy. The goal of this project was to understand why PMs were consistently making assumption-driven decisions and design a system that gave them the infrastructure to do better.
        </p>

        <SkillConstellation
          primary={[
            "Contextual Inquiry",
            "Workshop Facilitation",
            "Organizational Change Management",
          ]}
          supporting={[
            "Persona Development",
            "Affinity Mapping",
            "Usability Testing (SUS)",
          ]}
          emerging={["Stakeholder Mapping", "Co-creation Methods"]}
        />

        <div style={{ marginTop: "40px", marginBottom: "40px" }}>
          <h3>Background</h3>
          <p>
            I was brought in as Lead UX Consultant on a team of two UX researchers, a Tech Lead, and a PM. Our mandate was broad: close the gap between Product Management and UX across one of the world's largest equipment manufacturers.
          </p>
          <p>
            What we found wasn't what anyone expected. The problem wasn't skill. PMs at John Deere were experienced, motivated, and genuinely user-empathetic. The problem was structural and they had no shared vocabulary with UX, no lightweight templates that fit their pace, and no peer community to learn from.
          </p>
          <p>
            Research reports were being delivered in 40-slide decks after key decisions had already been locked. Insights were getting buried. PMs were filling the gaps themselves, designing interaction flows in spreadsheets and making calls from intuition not because they wanted to, but because the system left them no other choice.
          </p>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", margin: "48px 0" }} />

        <h3>The Process</h3>
        <p>
          This engagement followed the <strong>Double Diamond framework</strong> diverging to understand the full problem space before converging on solutions augmented with contextual inquiry and collaborative co-creation methods.
        </p>

        <DoubleDiamondDiagram />

        <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", margin: "48px 0" }} />

        <h3>Framing the Problem</h3>
        <p>
          Problem Framing sits at the transition from Discover &rarr; Define. Before any solution work began, I needed a locked, shared understanding of what we were actually solving and for whom.
        </p>

        <CaseStudyImage
          src="/assets/problem-framing.png"
          alt="Framing the Problem diagram"
          caption="Framing the Problem: Mapping user lenses, forming statement drafts, and refining to structural infrastructure rather than individual education."
        />
      </CaseStudySection>

      {/* --- RESEARCH & INSIGHTS --- */}
      <CaseStudySection
        id="research"
        label="Research & Insights"
        heading="Gathering Insights"
      >
        <p>
          To understand the actual shape of the problem, I conducted 15 contextual interviews
          and shadowed planning meetings across John Deere&apos;s product lines. We clustered
          raw observations into thematic areas using Miro to identify critical friction points.
        </p>

        <CaseStudyImage
          src="/assets/gathering-insights.png"
          alt="Affinity mapping of research observations in Miro"
          caption="Gathering Insights: Mapping 100+ raw observations from PM interviews and shadowing sessions into thematic clusters (Confusion, Reaction, Improvement, Current Status)."
        />

        <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", margin: "48px 0" }} />

        <h3>Insights &amp; Prioritisation Formula</h3>
        <p>
          To transition from qualitative insights to a structured prioritisation model, I plugged our
          research findings into a core hypothesis formula, defining clear outcomes, target users,
          benefits, and feature priorities alongside measurable UX metrics.
        </p>

        <CaseStudyImage
          src="/assets/hypothesis-formula.png"
          alt="Prioritisation and hypothesis formula flowchart"
          caption="Insights plugged into a formula: Outlining the hypothesis (Outcome, User, Benefit, Feature) and the core metrics used to measure success (DAU/MAU, Retention Rate, Session Length)."
        />
      </CaseStudySection>

      {/* --- SOLUTIONS --- */}
      <CaseStudySection
        id="solutions"
        label="Prioritisation & Persona"
        heading="Prioritisation & Persona"
      >
        <h3>Prioritisation</h3>
        <p>
          I categorized findings into Epics not just for our team's use, but to give Product and
          Engineering leadership visibility into what needed fixing and in what order.
        </p>
        <p>
          <strong>Prioritisation criteria:</strong>
        </p>
        <ul>
          <li>Severity score (from the framework above)</li>
          <li>Effort to implement (UX + Engineering)</li>
          <li>Dependencies between solutions</li>
        </ul>
        <p>
          From this, we established that the <strong>PM-UX Playbook</strong> was the highest-priority
          first delivery, highest severity score, moderate engineering lift, and foundational to
          everything else. The Buddy-Up programme and Community Forum were sequenced to follow,
          since they depended on the Playbook existing first.
        </p>

        <h3 style={{ marginTop: "40px" }}>Narrowing the Scope: Meet Rajesh</h3>
        <p>
          With the problem defined and priorities set, I synthesized the research into <strong>&quot;Rajesh&quot;
          , a composite persona</strong> built from behavioral patterns and direct quotes across the
          15 interviews.
        </p>
        <p>
          Rajesh wasn't built to be decorative. He was built to anchor every solution decision.
        </p>

        <PersonaCardActual />

        <div style={{ maxWidth: "500px", margin: "32px auto" }}>
          <h4 style={{ textAlign: "center", marginBottom: "16px" }}>Rajesh&apos;s Baseline Proficiency</h4>
          <PersonaProgress label="Research Interpretation" value={20} />
          <PersonaProgress label="Design Critique" value={15} />
          <PersonaProgress label="UX Vocabulary" value={30} />
          <PersonaProgress label="User Empathy" value={45} />
        </div>
      </CaseStudySection>

      {/* --- VALIDATION & RESULTS --- */}
      <CaseStudySection
        id="results"
        label="Validation & Results"
        heading="Testing, Launching & Measurable Impact"
      >
        <h3>Validating the Designs</h3>
        <p>
          Rather than lab-based usability testing, I tested during <strong>actual monthly planning
          workshops</strong>, the real context where the tools would be used.
        </p>

        <p><strong>What we tested:</strong> The PM-UX Playbook prototype (navigation, contextual prompts, template accessibility)</p>
        <p><strong>Method:</strong> Moderated observation during live planning sessions + post-session SUS scoring</p>
        
        <div style={{ background: "var(--color-bg-card)", padding: "20px", borderRadius: "12px", margin: "20px 0", borderLeft: "4px solid var(--color-accent)", borderRight: "1px solid var(--color-border)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", maxWidth: "500px" }}>
          <h4 style={{ margin: 0, fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-secondary)" }}>System Usability Scale (SUS)</h4>
          <p style={{ fontSize: "32px", fontWeight: "bold", margin: "8px 0 4px 0", color: "var(--color-accent)", fontFamily: "var(--font-display)" }}>78 / 100</p>
          <p style={{ fontSize: "13px", margin: 0, color: "var(--color-text-secondary)", lineHeight: "1.4" }}>Scores above 68 are considered good. A score of 78 validates baseline usability as excellent.</p>
        </div>

        <Blockquote
          text="Now I know when to use this, not just that it exists."
          author="PM Participant, Round 2 Usability Testing"
        />

        <p>
          That single insight drove the most important design change: we merged the &quot;Learn&quot;
          and &quot;Templates&quot; sections into a single <strong>workflow-staged &quot;Resources&quot; hub</strong>,
          organized by when in the PM process you'd reach for it, not by content category.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", margin: "24px 0" }}>
          <div style={{ background: "var(--color-bg-card)", padding: "20px", borderRadius: "12px", border: "1px solid var(--color-border)" }}>
            <strong style={{ color: "var(--color-text-secondary)", fontSize: "12px", textTransform: "uppercase" }}>Before</strong>
            <p style={{ margin: "8px 0 0", fontSize: "15px", fontWeight: "600", lineHeight: "1.4" }}>Navigation organized by content type (Learn / Templates / Examples)</p>
          </div>
          <div style={{ background: "var(--color-bg-card)", padding: "20px", borderRadius: "12px", border: "1px solid var(--color-accent)" }}>
            <strong style={{ color: "var(--color-accent)", fontSize: "12px", textTransform: "uppercase" }}>After (Iterated)</strong>
            <p style={{ margin: "8px 0 0", fontSize: "15px", fontWeight: "600", lineHeight: "1.4" }}>Navigation organized by workflow stage (Scoping / Research / Spec Writing / Review)</p>
          </div>
        </div>

        <SkillSpotlight
          skill="Usability Testing & SUS Scoring"
          description="Conducted testing of the Playbook inside active PM planning sessions, combining quantitative SUS and qualitative observation."
          evidence="Achieved SUS score of 78 and restructured navigation into workflow stages."
        />

        <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", margin: "48px 0" }} />

        <h3>Delivery</h3>
        <p>
          The PM-UX Playbook launched to a pilot cohort of <strong>50 PMs over 4 weeks</strong>.
          The Buddy-Up Programme and Community Forum followed in subsequent sprints.
        </p>
        <p>
          I conducted a <strong>UX review of each front-end implementation ticket</strong> before
          it went live, checking fidelity to the tested designs and flagging regressions before
          users saw them.
        </p>

        <h3 style={{ marginTop: "40px" }}>Impact</h3>
        <ResultsGrid
          items={[
            {
              value: "80%",
              label: "UX Confidence",
              description: "Participants felt more confident interpreting research deliverables.",
            },
            {
              value: "25%",
              label: "Feature Spec Speed",
              description: "Faster average time to complete specifications.",
            },
            {
              value: "120",
              label: "Forum Threads",
              description: "Threads started in month one, growing organically and unsolicited.",
            },
            {
              value: "10/12",
              label: "Buddy-Up Retention",
              description: "Pairs voluntarily continued collaborating beyond the pilot.",
            },
          ]}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginTop: "40px" }}>
          <div>
            <h3>What Worked</h3>
            <ul style={{ paddingLeft: "20px" }}>
              <li style={{ marginBottom: "12px", lineHeight: "1.5" }}>
                <strong>Embedded learning beats standalone training.</strong> PMs have time for a 5-minute module between meetings, not a 2-hour workshop. Every solution had to fit existing workflows, not create new ones.
              </li>
              <li style={{ marginBottom: "12px", lineHeight: "1.5" }}>
                <strong>Community drives adoption faster than mandates.</strong> The forum scaled because PMs shared real wins with peers who understood their context. No campaign required.
              </li>
              <li style={{ marginBottom: "12px", lineHeight: "1.5" }}>
                <strong>Contextual research reveals what surveys cannot.</strong> Shadowing PMs in active planning meetings surfaced friction that interview questions alone would never have found because PMs had normalized it.
              </li>
            </ul>
          </div>
          <div>
            <h3>What I'd Do Differently</h3>
            <ul style={{ paddingLeft: "20px" }}>
              <li style={{ marginBottom: "12px", lineHeight: "1.5" }}>
                <strong>Start stakeholder mapping earlier.</strong> I mapped the ecosystem during Discover, but involving Engineering and Leadership in the synthesis phase, not just the findings readout, would have accelerated buy-in.
              </li>
              <li style={{ marginBottom: "12px", lineHeight: "1.5" }}>
                <strong>Quantify the severity framework in real time.</strong> I scored issues after fieldwork. Scoring during synthesis sessions with the team would have made prioritisation faster and more collaborative.
              </li>
              <li style={{ marginBottom: "12px", lineHeight: "1.5" }}>
                <strong>Plan for the Deliver phase in Discovery.</strong> The UX review process at delivery was reactive. Building a formal QA checkpoint into the process from the start would have reduced late-stage rework.
              </li>
            </ul>
          </div>
        </div>

        <h3 style={{ marginTop: "40px" }}>Next Steps</h3>
        <ul style={{ paddingLeft: "20px" }}>
          <li style={{ marginBottom: "8px", lineHeight: "1.4" }}><strong>Scale & Personalise:</strong> Role-based learning tracks for data-driven PMs vs. platform PMs</li>
          <li style={{ marginBottom: "8px", lineHeight: "1.4" }}><strong>Measure Downstream ROI:</strong> Connect UX literacy improvements to business metrics (conversion lift, support ticket reduction)</li>
          <li style={{ marginBottom: "8px", lineHeight: "1.4" }}><strong>Extend to Product Ops:</strong> Fold in analytics playbooks and A/B testing frameworks</li>
        </ul>

        <p style={{ marginTop: "64px", fontStyle: "italic", textAlign: "center", color: "var(--color-text-secondary)" }}>
          Lead UX Consultant · John Deere · 12 Weeks
        </p>
      </CaseStudySection>
    </CaseStudyLayout>
  );
}
