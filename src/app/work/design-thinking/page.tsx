"use client";

import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import {
  CaseStudySection,
  CaseStudyImage,
  Blockquote,
  SkillConstellation,
  UXEnablementImpact,
  SUSTestTable,
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
        title="No UX, No Problem? A Qualitative Study into How Product Managers Navigate UX Without UX Support"
        category=""
        role="UX Advocate & Researcher · Strategy & Transformation"
        team="Strategy & Transformation Team · UX Coaches · Product Coaches · Agile Coaches"
        timeline="12 Weeks"
      />

      {/* --- OVERVIEW & BACKGROUND --- */}
      <CaseStudySection
        id="overview"
      >
        <h3>Overview</h3>
        <p>
          John Deere India runs 250+ internal products. Most don&apos;t have a dedicated UX professional. Some teams could afford to hire for it most couldn&apos;t. So Product Managers absorbed the gap, running their own research, designing their own flows, and making calls from intuition. Not by choice. Because the system left them no alternative.
        </p>
        <p>
          This was a qualitative exploratory research study using contextual inquiry and co-design methods. The goal: understand exactly where that system was breaking down, and design a pathway to fix it.
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
            I was part of John Deere&apos;s Strategy &amp; Transformation team a cross-functional pod of product coaches, agile coaches, and UX coaches. My role was UX Advocate: the person PMs came to when they had a research question and no researcher to ask.
          </p>
          <p>
            The structural reality was stark. Across 250 internal products, UX coverage was uneven by design. Teams with budget hired UX professionals. Teams without handed the work to their PMs who were already managing specs, stakeholders, planning ceremonies, and commercial priorities. Layering research and synthesis on top was unsustainable, and the quality of product decisions showed it.
          </p>
          <p>
            My mandate was two-pronged. First, bridge the gap and provide ad hoc UX support to teams with no dedicated UX resource. Second, build UX literacy like running workshops, advocate for research, and shift how PMs approached user-centred decision-making over time.
          </p>
          <p>
            This study was one of the qualitative research initiatives I led to answer one question: what are PMs actually struggling with, and what would genuinely help them? Not assumptions. Evidence.
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
          caption="Framing the Problem: Mapping user lenses, forming statement drafts, and refining structural infrastructure for team-wide UX support."
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
          caption="Insights plugged into a formula: Outlining the hypothesis (Outcome, User, Benefit, Feature) and the core metrics used to measure success: Workshop attendance rate, Tool adoption rate (% of PMs independently using Figma/Mural post-session), NPS from post-programme survey, Buddy-Up retention beyond pilot, and inbound collaboration requests per month."
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

        <CaseStudyImage
          src="/assets/rajesh_persona.png"
          alt="Persona Card: Rajesh, The Product Manager"
          caption="Meet Rajesh: A composite persona built from behavioral patterns, demographics, and key pain points gathered across 15 interviews."
        />
      </CaseStudySection>

      {/* --- VALIDATION & RESULTS --- */}
      <CaseStudySection
        id="results"
        label="Validation & Results"
        heading="Testing, Launching & Measurable Impact"
      >
        <h3>Validating the Designs</h3>
        <p>
          I ran a before/after SUS test with PMs inside their actual planning sessions (the real context, not a lab) specifically measuring confidence and ease of using Figma&apos;s Fuel Design System to sketch solutions independently.
        </p>
        <p>
          <strong>Method:</strong> Moderated observation during live planning sessions + SUS scoring before and after the onboarding intervention, across 11 participants.
        </p>

        <SUSTestTable />

        <p>
          A score below 68 indicates usability issues. Starting at 52, PMs found Figma inaccessible without support. After structured onboarding, the score rose to 78 (a +26 point improvement), crossing from poor into excellent.
        </p>
        <p>
          <strong>What I observed:</strong> 9 of 11 participants completed the task independently after onboarding. The 2 who stalled hit the same friction point: locating the right component for their use case without knowing Figma terminology.
        </p>
        <p>
          <strong>Change that followed:</strong> We added a use-case index to the Fuel Design System onboarding guide, mapping common PM tasks to relevant components, so PMs could find what they needed without needing to think like a designer.
        </p>

        <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", margin: "48px 0" }} />

        <h3>Delivery</h3>
        <p>
          The research pointed to one clear truth: PMs didn&apos;t need more documentation. They needed access to the right tools, the confidence to use them, and a community to learn alongside.
        </p>

        <h4 style={{ marginTop: "24px" }}>Tool Enablement</h4>
        <p>
          I introduced PMs to the infrastructure that already existed but wasn&apos;t reaching them. This meant hands-on workshops, 1:1 sessions, and drop-in clinics covering:
        </p>
        <ul style={{ marginTop: "12px", marginBottom: "24px" }}>
          <li style={{ marginBottom: "8px" }}>
            <strong>Fuel Design System (Figma):</strong> so PMs could prototype and test ideas quickly without waiting for a designer
          </li>
          <li style={{ marginBottom: "8px" }}>
            <strong>Mural templates:</strong> structured brainstorming frameworks they could run themselves
          </li>
          <li style={{ marginBottom: "8px" }}>
            <strong>DeereUX website:</strong> the internal source of truth for branding, typography, and design decisions, making it easier to justify design choices with evidence rather than instinct
          </li>
        </ul>

        <h4 style={{ marginTop: "24px" }}>Buddy-Up Programme</h4>
        <p>
          PMs were paired with UX coaches or peer PMs depending on their need: some needed structured guidance, others just a thinking partner. 10 of 12 pairs continued collaborating beyond the pilot voluntarily.
        </p>

        <h4 style={{ marginTop: "24px" }}>Community Forum (MS Teams)</h4>
        <p>
          A dedicated shared space with monthly structured meetings gave PMs a place to ask questions, share wins, and get peer critique on decisions. It seeded itself to 120 threads started in the first month, entirely organically.
        </p>

        <h3 style={{ marginTop: "40px" }}>What happened after 12 weeks</h3>
        <p>
          There was no formal handoff because none was needed. By the end of the engagement, PMs across teams were proactively reaching out to the P&C team for UX collaboration. The appetite kept growing as literacy increased, which was exactly the point.
        </p>

        <h3 style={{ marginTop: "40px" }}>Impact</h3>
        <UXEnablementImpact />


        <h3 style={{ marginTop: "40px" }}>Next Steps</h3>
        <ul style={{ paddingLeft: "20px" }}>
          <li style={{ marginBottom: "8px", lineHeight: "1.4" }}>
            <strong>Scale Coverage:</strong> Expand the programme to the remaining 86% of product teams not reached in the pilot.
          </li>
          <li style={{ marginBottom: "8px", lineHeight: "1.4" }}>
            <strong>Quarterly Tracking:</strong> Track UX literacy quarterly by running a pulse survey every 3 months to see if adoption is holding.
          </li>
          <li style={{ marginBottom: "8px", lineHeight: "1.4" }}>
            <strong>Link to Outcomes:</strong> Close the ROI loop by mapping tool usage to product outcomes to prove downstream impact.
          </li>
          <li style={{ marginBottom: "8px", lineHeight: "1.4" }}>
            <strong>Buddy-Up Support:</strong> Formalise Buddy-Up to track structured goals and check-ins to build on the 83% who continued voluntarily.
          </li>
        </ul>


      </CaseStudySection>
    </CaseStudyLayout>
  );
}
