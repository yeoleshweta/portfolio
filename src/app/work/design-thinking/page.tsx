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
        title="Empowering Product Managers with UX & Design Thinking"
        category="UX Research Case Study"
        role="UX Advocate & Research Lead"
        team="Cross-functional (PMs, UX, Eng)"
        timeline="6 Months"
        image="/ux_law_hero.png"
      />

      {/* --- OVERVIEW --- */}
      <CaseStudySection
        id="overview"
        label="The Starting Point"
        heading="A Systems Problem Nobody Was Naming"
      >
        <p>
          At John Deere, Product Managers are the connective tissue between
          users, engineering, and business strategy. They own roadmaps,
          negotiate priorities, and ship features across a portfolio of 250+
          products spanning agriculture, construction, and enterprise tooling.
        </p>
        <p>
          When I joined the UX team as the only UX researcher on the India team,
          I noticed a pattern in every sprint planning, backlog refinement, and
          stakeholder sync. PMs were making decisions about user-facing features
          without a shared language for talking about users. Research findings
          sat in slide decks nobody opened. Usability results arrived after
          features were already in development.
        </p>

        <Blockquote
          text="I know UX is important. I just don't know what to do with the research once I get it."
          author="Senior Product Manager, John Deere"
        />

        <ContextCard
          title="Research Question"
          text="How might we equip Product Managers with UX frameworks and collaborative workflows so they can confidently lead user-centred design and stop relying on ad-hoc practices?"
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
          The 15 contextual interviews revealed five structural gaps that showed
          up across product lines, seniority levels, and geographies.
        </p>

        <InteractiveBarChart
          data={[
            { label: "No shared UX language", value: 90, color: "#8b69fa" },
            { label: "Research arrived too late", value: 80, color: "#ff80ab" },
            {
              label: "PMs solving UX problems alone",
              value: 75,
              color: "#26c6da",
            },
            { label: "Technical confidence gap", value: 65, color: "#ffa726" },
            {
              label: "No career pathway at intersection",
              value: 55,
              color: "#66bb6a",
            },
          ]}
        />

        <h3>Rajesh, Senior Product Manager</h3>
        <p>
          From the research, I synthesised a primary persona that captured the
          composite behaviours, frustrations, and goals of the PMs I had
          interviewed. Every PM who reviewed this persona said: "That's me."
        </p>

        <CaseStudyImage
          src="/ux_user_persona.png"
          alt="User Persona: Rajesh the Product Manager"
          caption="Rajesh manages 3 engineering squads. Non-design background. 7 years in product."
        />

        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          <h4>Rajesh's Baseline Proficiency</h4>
          <PersonaProgress label="Research Interpretation" value={20} />
          <PersonaProgress label="Design Critique" value={15} />
          <PersonaProgress label="UX Vocabulary" value={30} />
          <PersonaProgress label="User Empathy" value={45} />
        </div>

        <Blockquote
          text="I don't need to run the research. I need to know what to do with it."
          author="Rajesh persona quote"
        />
      </CaseStudySection>

      {/* --- DEVELOP: SOLUTIONS --- */}
      <CaseStudySection
        id="develop"
        label="Phase 3: Develop"
        heading="Four Solutions From Co-Creation"
      >
        <p>
          Two 2-hour co-creation sessions using Crazy 8s and storyboarding
          generated 40+ ideas. After dot-voting and feasibility discussion, four
          solution concepts rose to the top.
        </p>

        <h3>1. PM-UX Playbook</h3>
        <p>
          A template-driven guide with ready-to-use journey map templates,
          usability heuristic checklists, and "how to read a research report"
          guides. Designed to be grabbed in the moment, not studied in advance.
        </p>

        <h3>2. Buddy-Up Programme</h3>
        <p>
          Structured mentorship pairing PMs with UX researchers for a quarter.
          Not a training relationship but a collaboration partnership.
        </p>

        <h3>3. Community Forum</h3>
        <p>
          A dedicated internal platform for sharing case studies, templates, and
          learning from each other's wins and failures.
        </p>

        <h3>4. Micro-Learning Modules</h3>
        <p>
          Bite-sized 5-10 minute lessons on core UX concepts, delivered via
          Slack and Jira rather than a separate LMS.
        </p>

        <CaseStudyImage
          src="/ux_wireframe_sketch.png"
          alt="Product & UX Hub Wireframes"
          caption="Low-fidelity prototype of the Product & UX Hub, restructured to use existing infrastructure."
        />
      </CaseStudySection>

      {/* --- DELIVER: TESTING --- */}
      <CaseStudySection
        id="deliver"
        label="Phase 4: Deliver"
        heading="Testing, Iterating, and Launching"
      >
        <p>
          Tested the prototype with 5 PMs during actual monthly planning
          workshops, not in a lab. What worked: template discovery was fast,
          micro-learning format resonated, and the community concept generated
          genuine enthusiasm.
        </p>

        <h3>Key Iterations</h3>
        <ul>
          <li>
            <strong>Simplified navigation:</strong> Merged "Learn" and
            "Templates" into a single "Resources" section organised by workflow
            stage.
          </li>
          <li>
            <strong>Added contextual tips:</strong> Every template now includes
            "Use this when..." prompts.
          </li>
          <li>
            <strong>Slack integration:</strong> Notifications for new content
            and replies pushed directly into existing channels.
          </li>
        </ul>

        <Blockquote
          text="Now I know when to use this, not just that it exists."
          author="PM participant, Round 2 testing"
        />
      </CaseStudySection>

      {/* --- IMPACT --- */}
      <CaseStudySection
        id="impact"
        label="Outcomes"
        heading="Measurable Cultural Shift"
      >
        <p>
          The pilot launched with a 50-person PM cohort across four product
          lines, tracked over 4 weeks.
        </p>

        <ResultsGrid
          items={[
            {
              value: "80%",
              label: "UX Confidence",
              description:
                "Pilot participants reported greater confidence interpreting research deliverables.",
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
                "Started in the first month with 300+ replies. Peer learning happened organically.",
            },
            {
              value: "10/12",
              label: "Buddy Retention",
              description:
                "Initial Buddy-Up pairs continued beyond the first quarter voluntarily.",
            },
          ]}
        />

        <Blockquote
          text="I'm not a UX researcher and I don't want to be. But now I know enough to ask the right questions, and that changes everything."
          author="Product Manager, pilot participant"
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
