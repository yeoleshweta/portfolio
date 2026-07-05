"use client";

import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import {
  CaseStudySection,
  ContextCard,
  ResultsGrid,
  PersonaProgress,
  DoubleDiamondCarousel,
  InteractiveBarChart,
  Blockquote,
  PersonaCardActual,
  SkillSpotlight,
  SkillConstellation,
} from "@/components/casestudy/CaseStudyContent";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "research", label: "Research & Insights" },
  { id: "solutions", label: "Solutions" },
  { id: "results", label: "Validation & Results" },
];

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

        <div style={{ marginTop: "32px", marginBottom: "32px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", margin: "24px 0" }}>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "12px 0", fontWeight: "bold" }}>Company</td>
                <td style={{ padding: "12px 0", textAlign: "right" }}>John Deere</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "12px 0", fontWeight: "bold" }}>Role</td>
                <td style={{ padding: "12px 0", textAlign: "right" }}>Lead UX Consultant</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "12px 0", fontWeight: "bold" }}>Team</td>
                <td style={{ padding: "12px 0", textAlign: "right" }}>2 UX Researchers · 1 Tech Lead · 1 PM</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "12px 0", fontWeight: "bold" }}>Timeline</td>
                <td style={{ padding: "12px 0", textAlign: "right" }}>12 Weeks</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "12px 0", fontWeight: "bold" }}>Type</td>
                <td style={{ padding: "12px 0", textAlign: "right" }}>Organizational UX Research · Culture Change</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "48px", margin: "40px 0", alignItems: "start" }}>
          <div>
            <h3>How the Problem Came to Be</h3>
            <p>
              In a massive enterprise like John Deere managing 250+ products, Product Managers are constantly under intense pressure to deliver features quickly. They sit at the high-stakes intersection of user needs, engineering timelines, and commercial strategy.
            </p>
            <p>
              But when we looked closely at the day-to-day workflow, we found PMs routinely struggling to make the right product decisions. It wasn't from a lack of user empathy or drive. It was a failure of infrastructure:
            </p>
            <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
              <li style={{ marginBottom: "12px", lineHeight: "1.5" }}>
                <strong>Lost Insights:</strong> Valuable UX research findings were delivered in heavy slide decks, which got read once and then buried in drive folders, never to be seen again.
              </li>
              <li style={{ marginBottom: "12px", lineHeight: "1.5" }}>
                <strong>Lagging Feedback:</strong> Usability validation reports were arriving after development decisions had already been locked and coded.
              </li>
              <li style={{ marginBottom: "12px", lineHeight: "1.5" }}>
                <strong>Isolated Design:</strong> Cut off from active design alignment, PMs were forced to guess—designing screen flows in spreadsheets and defining user interactions in isolation.
              </li>
            </ul>
          </div>

          <div style={{ background: "var(--color-bg-card)", padding: "28px", borderRadius: "16px", border: "1px solid var(--color-border)" }}>
            <h4 style={{ marginTop: 0, marginBottom: "16px", fontSize: "16px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-secondary)" }}>At a Glance</h4>
            <p style={{ fontSize: "15px", lineHeight: "1.6", marginBottom: "16px" }}>
              <strong>The Project:</strong> A 12-week embedded research and organizational design initiative to bridge the gap between Product Management and UX, establishing repeatable frameworks for user-centered decision making.
            </p>
            <p style={{ fontSize: "15px", lineHeight: "1.6", marginBottom: "0" }}>
              <strong>What I Did:</strong> Led end-to-end contextual research (shadowing planning meetings, PM interviews), facilitated cross-functional co-creation workshops, designed the PM-UX Playbook, and validated it through usability testing.
            </p>
          </div>
        </div>

        <ContextCard
          title="The Systems Trap"
          text="It was easy to mistake this friction for individual skill gaps, but it was structural. PMs were making assumption-driven decisions because they had no shared language, no mutual workflows, and no light-weight templates that fit into the actual speed of their workday."
        />

        <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", margin: "48px 0" }} />

        <h3>The Process</h3>
        <p>
          This engagement followed the <strong>Double Diamond framework</strong> — diverging
          to understand the full problem space before converging on solutions — augmented
          with contextual inquiry and collaborative co-creation methods.
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
                "Prototyped 'Product & UX Playbook' portal",
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
                "Organic growth: 120 forum threads started in month one",
              ],
            },
          ]}
        />

        <h3 style={{ marginTop: "40px" }}>Role Responsibilities Across the Diamond</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", margin: "24px 0" }}>
          <div>
            <p><strong>UX Lead (me):</strong> Active across all four phases — leading discovery, owning synthesis, facilitating design workshops, reviewing delivery</p>
            <p><strong>UX Researcher:</strong> Heavy in Discover and re-engaged at Deliver for usability validation</p>
          </div>
          <div>
            <p><strong>PM:</strong> Engaged from Define onward — critical for scoping and feasibility</p>
            <p><strong>Tech Lead:</strong> Joined at Design phase to assess technical constraints before commitments were made</p>
          </div>
        </div>

        <Blockquote
          text="Key principle from my process framework: UX Researchers are recruited back at the Deliver phase — not just to test, but to validate that the solution still maps to the original research findings."
        />
      </CaseStudySection>

      {/* --- RESEARCH & INSIGHTS --- */}
      <CaseStudySection
        id="research"
        label="Research & Insights"
        heading="Understanding the Shape of the Problem"
      >
        <p>
          Before any solution work, I needed to understand the actual shape of the
          problem — not the assumed one.
        </p>

        <h3>What I did</h3>
        <p>
          I conducted <strong>15 contextual interviews</strong> with mid-to-senior Product
          Managers across different product lines. Interviews alone weren't enough
          — I also <strong>shadowed real planning meetings and backlog refinement sessions</strong>.
        </p>
        <p>
          Alongside interviews, I ran <strong>stakeholder mapping</strong> across PMs, UX,
          Engineering, and Leadership to understand where information was flowing, where
          it was breaking down, and which nodes had the most influence over the system.
        </p>

        <ContextCard
          title="Why This Mattered"
          text="Surveys and interviews had been run before at John Deere. They hadn't produced change. I hypothesized that the gap was between reported behavior and actual behavior — and shadowing confirmed it. PMs are articulate professionals; in interviews they describe the polished version of their work. In context, you see the friction points they've normalized."
        />

        <SkillSpotlight
          skill="Contextual Inquiry"
          description="Shadowed real backlog refinement sessions to observe implicit pain points rather than relying solely on self-reported survey answers."
          evidence="Surfaced critical timing and coordination challenges that surveys missed."
        />

        <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", margin: "48px 0" }} />

        <h3>Gathering Insights</h3>
        <p>
          After fieldwork, my teammate and I ran <strong>affinity mapping in Miro</strong> to
          cluster raw observations into themes. We moved from 100+ individual data points
          to <strong>3 macro-clusters of friction:</strong>
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", margin: "24px 0" }}>
          <div style={{ background: "var(--color-bg-card)", padding: "24px", borderRadius: "12px", border: "1px solid var(--color-border)" }}>
            <h4 style={{ margin: "0 0 8px 0" }}>1. Language Gap</h4>
            <p style={{ margin: 0, fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: "1.4" }}>
              PMs and UX teams didn't share a vocabulary, making collaboration clunky and inconsistent.
            </p>
          </div>
          <div style={{ background: "var(--color-bg-card)", padding: "24px", borderRadius: "12px", border: "1px solid var(--color-border)" }}>
            <h4 style={{ margin: "0 0 8px 0" }}>2. Timing Gap</h4>
            <p style={{ margin: 0, fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: "1.4" }}>
              Research outputs reached PMs after key decisions were made, reducing their practical utility.
            </p>
          </div>
          <div style={{ background: "var(--color-bg-card)", padding: "24px", borderRadius: "12px", border: "1px solid var(--color-border)" }}>
            <h4 style={{ margin: "0 0 8px 0" }}>3. Support Gap</h4>
            <p style={{ margin: 0, fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: "1.4" }}>
              PMs had no peer community, no templates, no pathway to grow at the UX/PM intersection.
            </p>
          </div>
        </div>

        <h3 style={{ marginTop: "40px" }}>The Severity Framework</h3>
        <p>
          To move from <em>observations</em> to <em>priorities</em>, I applied a severity framework to each identified issue:
        </p>

        <div style={{ background: "var(--color-bg-card)", padding: "32px", borderRadius: "12px", textAlign: "center", border: "1px solid var(--color-border)", margin: "24px 0" }}>
          <code style={{ fontSize: "18px", fontWeight: "bold", color: "var(--color-accent)" }}>
            Severity Score = Task Criticality × Impact × Frequency
          </code>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginTop: "24px", fontSize: "14px" }}>
            <div>
              <strong>Task Criticality</strong>
              <p style={{ color: "var(--color-text-secondary)", margin: "4px 0 0" }}>How important is this to the PM's core job? (1–5)</p>
            </div>
            <div>
              <strong>Impact</strong>
              <p style={{ color: "var(--color-text-secondary)", margin: "4px 0 0" }}>How much does this friction affect their output? (1–5)</p>
            </div>
            <div>
              <strong>Frequency (%)</strong>
              <p style={{ color: "var(--color-text-secondary)", margin: "4px 0 0" }}>How often does it appear across participants?</p>
            </div>
          </div>
        </div>

        <h3 style={{ marginTop: "40px" }}>What the Research Revealed</h3>
        <p>
          Across 15 interviews, the findings were consistent and cross-cutting — these weren't
          individual struggles, they were structural:
        </p>

        <InteractiveBarChart
          data={[
            { label: "No shared UX language", value: 90, color: "#8b69fa" },
            { label: "Research arrived too late", value: 80, color: "#9f85f8" },
            { label: "PMs solving UX problems alone", value: 75, color: "#b4a1f7" },
            { label: "Low confidence interpreting/critiquing research", value: 65, color: "#c8bdf5" },
            { label: "No career pathway at intersection", value: 55, color: "#ddd8f4" },
          ]}
        />

        <p style={{ marginTop: "24px" }}>
          The data pointed toward one root cause: <strong>PMs didn't need UX education — they
          needed UX infrastructure.</strong> Frameworks, templates, and touchpoints that fit
          inside the workflows they already had.
        </p>

        <SkillSpotlight
          skill="Affinity Mapping"
          description="Synthesized 100+ observational data points into macro friction clusters, helping align stakeholders on structural patterns."
          evidence="The clusters directly formed the foundation of our solution roadmaps."
        />
      </CaseStudySection>

      {/* --- SOLUTIONS --- */}
      <CaseStudySection
        id="solutions"
        label="Solutions"
        heading="Prioritisation, Persona & Concepts"
      >
        <h3>Prioritisation</h3>
        <p>
          I categorized findings into Epics — not just for our team's use, but to give Product and
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
          first delivery — highest severity score, moderate engineering lift, and foundational to
          everything else. The Buddy-Up programme and Community Forum were sequenced to follow,
          since they depended on the Playbook existing first.
        </p>

        <h3 style={{ marginTop: "40px" }}>Narrowing the Scope: Meet Rajesh</h3>
        <p>
          With the problem defined and priorities set, I synthesized the research into <strong>&quot;Rajesh&quot;
          — a composite persona</strong> built from behavioral patterns and direct quotes across the
          15 interviews.
        </p>
        <p>
          Rajesh wasn't built to be decorative. He was built to anchor every solution decision:
        </p>

        <Blockquote
          text="If Rajesh can use this in the 5 minutes between his standup and his backlog review, it belongs in the solution. If he needs a 2-hour workshop, it doesn't."
        />

        <PersonaCardActual />

        <div style={{ maxWidth: "500px", margin: "32px auto" }}>
          <h4 style={{ textAlign: "center", marginBottom: "16px" }}>Rajesh&apos;s Baseline Proficiency</h4>
          <PersonaProgress label="Research Interpretation" value={20} />
          <PersonaProgress label="Design Critique" value={15} />
          <PersonaProgress label="UX Vocabulary" value={30} />
          <PersonaProgress label="User Empathy" value={45} />
        </div>

        <h3 style={{ marginTop: "40px" }}>Ideation — Four Solutions from Co-Creation</h3>
        <p>
          I designed and facilitated <strong>two co-creation workshops</strong> with PMs, UX leads,
          and stakeholders. The format was structured divergence followed by hard convergence: we
          generated <strong>40+ ideas</strong> and then evaluated them on a <strong>Value × Effort matrix</strong>
          against Rajesh's constraints. Four concepts survived:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", margin: "24px 0" }}>
          <div style={{ background: "var(--color-bg-card)", padding: "24px", borderRadius: "12px", border: "1px solid var(--color-border)" }}>
            <h4 style={{ margin: "0 0 8px 0" }}>1. PM-UX Playbook</h4>
            <p style={{ margin: 0, fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: "1.4" }}>
              Template-driven heuristic guides embedded in existing PM workflows (Jira, Confluence). Not a training course — a &quot;use this when you're in this situation&quot; reference.
            </p>
          </div>
          <div style={{ background: "var(--color-bg-card)", padding: "24px", borderRadius: "12px", border: "1px solid var(--color-border)" }}>
            <h4 style={{ margin: "0 0 8px 0" }}>2. Buddy-Up Programme</h4>
            <p style={{ margin: 0, fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: "1.4" }}>
              Quarterly UX/PM collaboration pairs. Structured to match PMs with a UX counterpart based on their current product area, not random assignment.
            </p>
          </div>
          <div style={{ background: "var(--color-bg-card)", padding: "24px", borderRadius: "12px", border: "1px solid var(--color-border)" }}>
            <h4 style={{ margin: "0 0 8px 0" }}>3. Community Forum</h4>
            <p style={{ margin: 0, fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: "1.4" }}>
              Internal platform for sharing templates, real wins, and peer Q&A. Designed to spread adoption organically rather than through mandate.
            </p>
          </div>
          <div style={{ background: "var(--color-bg-card)", padding: "24px", borderRadius: "12px", border: "1px solid var(--color-border)" }}>
            <h4 style={{ margin: "0 0 8px 0" }}>4. Micro-Learning Modules</h4>
            <p style={{ margin: 0, fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: "1.4" }}>
              5-minute UX concept drops via Slack and Jira integrations — meeting PMs where they already are, not pulling them out of their flow.
            </p>
          </div>
        </div>

        <p>
          Each solution was explicitly traceable back to a finding from research. The Playbook addressed the language gap. The Forum addressed the support gap. Timing was addressed by embedding touchpoints <em>into</em> existing workflows rather than creating new ones.
        </p>

        <SkillSpotlight
          skill="Workshop Facilitation & Co-creation"
          description="Designed and facilitated co-creation workshops using Value x Effort matrix with cross-functional PM-UX-Tech cohorts."
          evidence="Co-created and launched 4 solutions directly mapped to structural research insights."
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
          Rather than lab-based usability testing, I tested during <strong>actual monthly planning
          workshops</strong> — the real context where the tools would be used.
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
          organized by when in the PM process you'd reach for it — not by content category.
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
                <strong>Contextual research reveals what surveys cannot.</strong> Shadowing PMs in actual planning meetings surfaced friction that interview questions alone would never have found — because PMs had normalized it.
              </li>
            </ul>
          </div>
          <div>
            <h3>What I'd Do Differently</h3>
            <ul style={{ paddingLeft: "20px" }}>
              <li style={{ marginBottom: "12px", lineHeight: "1.5" }}>
                <strong>Start stakeholder mapping earlier.</strong> I mapped the ecosystem during Discover, but involving Engineering and Leadership in the synthesis phase — not just the findings readout — would have accelerated buy-in.
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
