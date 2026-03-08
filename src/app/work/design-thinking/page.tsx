"use client";

import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import {
  CaseStudySection,
  ContextCard,
  ResultsGrid,
  CaseStudyImage,
  PersonaProgress,
  DoubleDiamondCarousel,
  InteractiveBarChart,
  Blockquote,
  PersonaCardActual,
} from "@/components/casestudy/CaseStudyContent";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "discover", label: "Discover" },
  { id: "define", label: "Define" },
  { id: "develop", label: "Develop" },
  { id: "deliver", label: "Deliver" },
  { id: "impact", label: "Impact" },
  { id: "learnings", label: "Learnings" },
];

export default function DesignThinkingCaseStudy() {
  return (
    <CaseStudyLayout sections={sections}>
      <CaseStudyHero
        title="Product Managers with UX & Design Thinking"
        category="UX Research Case Study"
        role="Lead UX Consultant"
        team="2 UX Researchers, 1 Tech Lead, 1 PM"
        timeline="12 Weeks"
        image="/hicks_law_hero.png"
      />

      {/* --- OVERVIEW --- */}
      <CaseStudySection
        id="overview"
        label="The Starting Point"
        heading="A Systems Problem Nobody Was Naming"
      >
        <p>
          At John Deere, Product Managers are the connective tissue between
          users, engineering, and business strategy across a 250+ product
          portfolio. But observations revealed a critical gap: PMs were making
          decisions about user-facing features without a shared UX language.
          Research findings sat in slide decks, and usability results arrived
          too late to impact development.
        </p>

        <ContextCard
          title="The Challenge"
          text="Equip PMs with UX frameworks and collaborative workflows so they can confidently lead user-centred design, moving from ad-hoc practices to systematic execution."
        />
      </CaseStudySection>

      {/* --- IMMEDIATE IMPACT (Moved UP for punchiness) --- */}
      <CaseStudySection
        id="impact"
        label="Outcomes"
        heading="Measurable Cultural Shift"
      >
        <p style={{ marginBottom: "32px" }}>
          Before diving into the methodology, here is the tangible impact of
          deploying the "PM-UX Playbook" pilot to a 50-person cohort over 4
          weeks:
        </p>

        <ResultsGrid
          items={[
            {
              value: "80%",
              label: "UX Confidence",
              description:
                "Participants reported greater confidence interpreting research deliverables.",
            },
            {
              value: "25%",
              label: "Faster Specs",
              description:
                "Reduction in average time to complete feature specifications.",
            },
            {
              value: "120",
              label: "Forum Threads",
              description:
                "Started in month one. Peer learning happened organically.",
            },
            {
              value: "10/12",
              label: "Buddy Retention",
              description:
                "Mentorship pairs voluntarily continued beyond the pilot.",
            },
          ]}
        />
      </CaseStudySection>

      {/* --- METHODOLOGY CAROUSEL --- */}
      <CaseStudySection
        id="discover"
        label="Methodology"
        heading="Double Diamond Framework"
      >
        <p>
          We applied the Double Diamond framework augmented by contextual
          interviews and collaborative design thinking workshops.
        </p>

        <DoubleDiamondCarousel
          stages={[
            {
              label: "Discover (Diverge)",
              title: "Going Wide",
              activities: [
                "15 contextual interviews with mid-to-senior PMs",
                "Shadowed planning meetings & backlog refinements",
                "Stakeholder mapping across PMs, UX, Eng, Leadership",
                "Affinity mapping in Miro (3 macro-clusters emerged)",
              ],
            },
            {
              label: "Define (Converge)",
              title: "Converging on the Core",
              activities: [
                "Synthesised 'Rajesh, the PM' persona",
                "Mapped end-to-end experience journey",
                "Identified 3 critical friction points",
                "Reframed: PMs want to collaborate, not become UX experts",
              ],
            },
            {
              label: "Develop (Diverge)",
              title: "Co-Creating Solutions",
              activities: [
                "2 co-creation workshops (Crazy 8s + Storyboarding)",
                "40+ ideas generated, 4 solutions selected",
                "Prototyped 'Product & UX Hub' portal",
                "Restructured to use existing tools (SharePoint, Slack, Jira)",
              ],
            },
            {
              label: "Deliver (Converge)",
              title: "Testing & Launching",
              activities: [
                "Usability testing with 5 PMs in real workflow contexts",
                "SUS Score: 78 (above 68 benchmark)",
                "MVP pilot with 50-person PM cohort for 4 weeks",
                "Organic growth: 3 new PMs joined in week 1",
              ],
            },
          ]}
        />
      </CaseStudySection>

      {/* --- DEFINE: PERSONA & FINDINGS --- */}
      <CaseStudySection
        id="define"
        label="Phase 2: Define"
        heading="What The Research Revealed"
      >
        <p>
          15 contextual interviews revealed structural gaps that showed up
          consistently across product lines, driving the need for a practical,
          low-friction solution.
        </p>

        <InteractiveBarChart
          data={[
            { label: "No shared UX language", value: 90, color: "#8b69fa" },
            { label: "Research arrived too late", value: 80, color: "#9f85f8" },
            {
              label: "PMs solving UX problems alone",
              value: 75,
              color: "#b4a1f7",
            },
            { label: "Technical confidence gap", value: 65, color: "#c8bdf5" },
            {
              label: "No career pathway at intersection",
              value: 55,
              color: "#ddd8f4",
            },
          ]}
        />

        <h3>Rajesh, Senior Product Manager</h3>
        <p>
          Research synthesised into "Rajesh," capturing the composite behaviours
          and frustrations of our target PMs. Identifying his true baseline was
          critical: they needed collaboration templates, not UX encyclopedias.
        </p>

        <PersonaCardActual />

        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          <h4>Rajesh's Baseline Proficiency</h4>
          <PersonaProgress label="Research Interpretation" value={20} />
          <PersonaProgress label="Design Critique" value={15} />
          <PersonaProgress label="UX Vocabulary" value={30} />
          <PersonaProgress label="User Empathy" value={45} />
        </div>
      </CaseStudySection>

      {/* --- DEVELOP: SOLUTIONS --- */}
      <CaseStudySection
        id="develop"
        label="Phase 3: Develop"
        heading="Four Solutions From Co-Creation"
      >
        <p>
          Co-creation sessions generated 40+ ideas, which we whittled down to
          four highly feasible, high-impact concepts designed to integrate into
          existing workflows.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            marginTop: "32px",
            marginBottom: "48px",
          }}
        >
          <div>
            <h3>
              1. PM-UX Playbook <br />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "normal",
                  color: "var(--color-text-secondary)",
                }}
              >
                Template-driven heuristic guides.
              </span>
            </h3>
          </div>
          <div>
            <h3>
              2. Buddy-Up Programme <br />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "normal",
                  color: "var(--color-text-secondary)",
                }}
              >
                Quarterly UX/PM collaboration pairs.
              </span>
            </h3>
          </div>
          <div>
            <h3>
              3. Community Forum <br />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "normal",
                  color: "var(--color-text-secondary)",
                }}
              >
                Internal platform for sharing templates & wins.
              </span>
            </h3>
          </div>
          <div>
            <h3>
              4. Micro-Learning <br />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "normal",
                  color: "var(--color-text-secondary)",
                }}
              >
                5min UX concepts via Slack & Jira.
              </span>
            </h3>
          </div>
        </div>

        <CaseStudyImage
          src="/assets/aUPlkh0IoNtafdCvbQjivxXT4hY.webp"
          alt="Design Thinking Conceptual Process"
          caption="Strategizing UX integration into the Product Management lifecycle."
        />

        <div style={{ marginTop: "48px" }}>
          <CaseStudyImage
            src="/assets/2uthT7OtMnIEGFrcGYTGbSq8iyQ.webp"
            alt="Collaborative Action Map"
            caption="Transforming ad-hoc decisions into a structured, trackable UX collaboration network."
          />
        </div>
      </CaseStudySection>

      {/* --- DELIVER: TESTING --- */}
      <CaseStudySection
        id="deliver"
        label="Phase 4: Deliver"
        heading="Testing in the Real World"
      >
        <p>
          Tested directly during actual monthly planning workshops. The key
          insight: <strong>Contextual timing is everything.</strong>
        </p>
        <ul>
          <li>
            <strong>Simplified Navigation:</strong> Merged "Learn" and
            "Templates" into a workflow-staged "Resources" hub.
          </li>
          <li>
            <strong>Contextual Prompts:</strong> Added "Use this when..." tips
            to all UX Playbooks.
          </li>
        </ul>

        <Blockquote
          text="Now I know when to use this, not just that it exists."
          author="PM participant, Round 2 testing"
        />
      </CaseStudySection>

      {/* --- LEARNINGS --- */}
      <CaseStudySection
        id="learnings"
        label="Reflections"
        heading="Key Learnings & Next Steps"
      >
        <h3>What Worked</h3>
        <ul>
          <li>
            <strong>Embedded learning beats standalone training.</strong> PMs
            have time for a 5-minute module between meetings but not a 2-hour
            workshop.
          </li>
          <li>
            <strong>Community drives adoption faster than mandates.</strong> The
            forum took off because PMs shared real wins with peers who
            understood their context.
          </li>
          <li>
            <strong>Contextual research reveals what surveys cannot.</strong>{" "}
            Shadowing PMs in their actual meetings surfaced friction points
            interview questions alone would never have found.
          </li>
        </ul>

        <h3>What Happened Next</h3>
        <ul>
          <li>
            <strong>Scale & Personalise:</strong> Role-based learning tracks for
            data-driven PMs versus platform PMs.
          </li>
          <li>
            <strong>Measure ROI:</strong> Connecting UX literacy to downstream
            business metrics like conversion lift and support tickets.
          </li>
          <li>
            <strong>Extend to Product Ops:</strong> Folding in analytics
            playbooks and A/B testing frameworks.
          </li>
        </ul>

        <p>
          The community forum is still active. The Buddy-Up programme is in its
          third cohort. And the phrase "What does the research say?" is now
          heard in sprint planning meetings across the organisation.
        </p>
      </CaseStudySection>
    </CaseStudyLayout>
  );
}
