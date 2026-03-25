"use client";

import React from "react";
import { motion } from "framer-motion";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import {
  CaseStudySection,
  ContextCard,
  ResultsGrid,
  BaselineTargetMetrics,
  SkillSpotlight,
  SkillConstellation,
} from "@/components/casestudy/CaseStudyContent";

const sections = [
  { id: "challenge", label: "The Challenge" },
  { id: "research", label: "Research" },
  { id: "design", label: "Design" },
  { id: "impact", label: "Impact" },
];

/* ─────── Insight → Design Decision Card ─────── */
function InsightToDesign({
  insight,
  insightSource,
  designDecision,
  designDetail,
  index,
}: {
  insight: string;
  insightSource: string;
  designDecision: string;
  designDetail: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        gap: "24px",
        alignItems: "center",
        marginBottom: "24px",
      }}
    >
      {/* Research Insight */}
      <div
        style={{
          background: "rgba(220, 53, 69, 0.03)",
          border: "1px solid rgba(220, 53, 69, 0.12)",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#dc3545",
            fontWeight: 700,
            marginBottom: "10px",
          }}
        >
          🔍 Research Insight
        </div>
        <p style={{ margin: "0 0 8px 0", fontWeight: 600, fontSize: "15px" }}>
          {insight}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "var(--color-text-secondary)",
            fontStyle: "italic",
          }}
        >
          — {insightSource}
        </p>
      </div>

      {/* Arrow */}
      <div style={{ color: "#11a961", fontSize: "24px", fontWeight: 700 }}>
        →
      </div>

      {/* Design Decision */}
      <div
        style={{
          background: "rgba(17, 169, 97, 0.04)",
          border: "1px solid rgba(17, 169, 97, 0.15)",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#11a961",
            fontWeight: 700,
            marginBottom: "10px",
          }}
        >
          ✅ Design Decision
        </div>
        <p style={{ margin: "0 0 8px 0", fontWeight: 600, fontSize: "15px" }}>
          {designDecision}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "var(--color-text-secondary)",
          }}
        >
          {designDetail}
        </p>
      </div>
    </motion.div>
  );
}

/* ─────── Feature Walkthrough Strip ─────── */
function FeatureStrip({
  items,
}: {
  items: { icon: string; title: string; desc: string }[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${items.length}, 1fr)`,
        gap: "16px",
        marginTop: "32px",
        marginBottom: "32px",
      }}
    >
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "28px", marginBottom: "12px" }}>
            {item.icon}
          </div>
          <h4 style={{ margin: "0 0 6px 0", fontSize: "15px" }}>
            {item.title}
          </h4>
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "var(--color-text-secondary)",
              lineHeight: 1.5,
            }}
          >
            {item.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

export default function StoriesByChildrenCaseStudy() {
  return (
    <main>
      <CaseStudyHero
        title="Redesigning a Storytelling Platform for Young Creators"
        category="UX Research & Design"
        role="Lead IA & UI Designer"
        team="1 Designer, 1 Developer, 1 Stakeholder"
        timeline="6 Weeks"
        image="/assets/StoriesByChildren.jpg"
      />

      <CaseStudyLayout sections={sections}>
        {/* ============================================ */}
        {/* SECTION 1: THE CHALLENGE                     */}
        {/* ============================================ */}
        <CaseStudySection
          id="challenge"
          label="Overview"
          heading="60% of Users Never Reached a Story"
        >
          <SkillConstellation
            primary={["Information Architecture", "Usability Testing", "User Research with Families"]}
            supporting={["Lean UX", "Rapid Prototyping"]}
            emerging={["Design for Children", "Accessibility"]}
          />

          <p>
            <a
              href="https://www.storiesbychildren.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#11a961", fontWeight: 600 }}
            >
              Stories by Children
            </a>{" "}
            is an online platform where young readers aged 6–12 discover stories
            and budding writers aged 7–17 share original work. It&apos;s a space
            families and educators rely on to nurture creativity — but the
            platform was quietly failing its users.
          </p>
          <p>
            Analytics told the story: <strong>60% of users dropped off</strong>{" "}
            before reaching a story listing. Parents trying to upload work got
            lost. Styling varied wildly. There were no visual cues for
            age-appropriate content. The platform had heart — its UX was the
            problem.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginTop: "32px",
              marginBottom: "16px",
            }}
          >
            <ContextCard
              title="Approach"
              text="Lean UX sprints + Double Diamond framework — research with real families, rapid prototyping, two validation cycles."
            />
            <ContextCard
              title="Audience"
              text="Young readers (6–12), aspiring writers (7–17), parents & educators managing content and uploads."
            />
          </div>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 2: RESEARCH                          */}
        {/* ============================================ */}
        <CaseStudySection
          id="research"
          label="The Craft"
          heading="Testing with Real Families"
        >
          <p>
            I recruited family units — children alongside their parents — for
            moderated usability testing followed by contextual interviews.
            Testing with families together was deliberate: it revealed the
            natural dynamics of how children and adults collaborate when
            browsing and submitting content.
          </p>

          <SkillSpotlight
            skill="User Research with Children & Families"
            description="Conducted sessions with real families, adapting methods for child participants (shorter sessions, visual prompts, parent co-participation)."
            evidence="5 distinct insights each mapped directly to a design decision."
          />

          <h3 style={{ marginTop: "48px" }}>Three Signals from Children</h3>

          <FeatureStrip
            items={[
              {
                icon: "🎨",
                title: "Colour = Fun",
                desc: "Kids responded positively to vibrant layouts. White = boring. Visual richness drove perceived fun.",
              },
              {
                icon: "🏆",
                title: "Recognition = Motivation",
                desc: "Being featured as a 'winner' or seeing their profile displayed was a powerful motivator.",
              },
              {
                icon: "👫",
                title: "Peers = Trust",
                desc: "Kids engaged far more with content from children they knew. Familiarity drove discovery.",
              },
            ]}
          />

          <h3>The Critical Parent Finding</h3>
          <p>
            Parents consistently broke down at the upload workflow. They
            couldn&apos;t place their child&apos;s submission in the right section, didn&apos;t
            understand the review process, and frequently abandoned the flow
            entirely. This wasn&apos;t friction — it was a{" "}
            <strong>complete barrier to contribution</strong>.
          </p>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 3: DESIGN                            */}
        {/* ============================================ */}
        <CaseStudySection
          id="design"
          label="Research → Design"
          heading="How Every Insight Became a Design Decision"
        >
          <p>
            Insights were synthesised into three themes:{" "}
            <strong>quick access</strong>,{" "}
            <strong>age-appropriate visual cues</strong>, and{" "}
            <strong>social proof through peer visibility</strong>. The design
            section below maps each research finding directly to the interface
            decision it produced.
          </p>

          <SkillSpotlight
            skill="Information Architecture"
            description="Restructured platform IA to reduce cognitive load for young users, simplifying navigation and making submission flows intuitive."
            evidence="Task success 50% → 85%, navigation depth 4+ clicks → 1-2 clicks."
          />

          <div style={{ marginTop: "48px" }}>
            <InsightToDesign
              index={0}
              insight="Children called plain white layouts 'boring' and engaged 3× more with colourful interfaces."
              insightSource="Usability sessions with children aged 7–11"
              designDecision="Vibrant, illustration-rich visual system"
              designDetail="Replaced the minimal white aesthetic with bold colour blocks, playful illustrations, and gradient accents across every page."
            />

            <InsightToDesign
              index={1}
              insight="Kids lit up when asked 'What if your picture was on the website?' — being seen was the strongest motivator."
              insightSource="Contextual interviews, post-task"
              designDecision="Contributor Spotlights & Winner Sections"
              designDetail="Introduced prominent 'Winners' and 'Featured Authors' sections with children's photos and names on the homepage."
            />

            <InsightToDesign
              index={2}
              insight="Children explored 4× more content when it was created by someone they recognised or related to."
              insightSource="Behavioral observation during testing"
              designDecision="Peer-based content feeds"
              designDetail="Added 'Stories by Kids Like You' and age-matching recommendation surfaces to leverage social trust."
            />

            <InsightToDesign
              index={3}
              insight="100% of parents failed to complete the upload flow. They got lost between sections and abandoned."
              insightSource="Task failure analysis, all parent participants"
              designDecision="Guided step-by-step upload wizard"
              designDetail="Rebuilt submission as a linear wizard with progress bar, category picker, preview, and clear confirmation at every step."
            />

            <InsightToDesign
              index={4}
              insight="No visual cues helped parents or children identify age-appropriate content at a glance."
              insightSource="Heuristic analysis + parent interviews"
              designDecision="Colour-coded age-group badges"
              designDetail="Every story card and section header displays a colour-coded age badge, providing instant clarity without deep navigation."
            />
          </div>

          <SkillSpotlight
            skill="Rapid Prototyping"
            description="Produced testable prototypes within 6-week constraint, enabling multiple rounds of validation with real users."
            evidence="Two rapid Lean UX sprint cycles completed."
          />

          <h3 style={{ marginTop: "48px" }}>
            The Platform Experience: Key Screens
          </h3>
          <p>
            The final design system was built around these five core experiences
            — each shaped directly by what families told us:
          </p>

          <FeatureStrip
            items={[
              {
                icon: "🏠",
                title: "Homepage",
                desc: "Featured stories, winner spotlights, and age-filtered browsing within one scroll.",
              },
              {
                icon: "📖",
                title: "Reading Page",
                desc: "Large type, playful accents, minimal chrome. Designed for immersion, not navigation.",
              },
              {
                icon: "📚",
                title: "Bookstore",
                desc: "Cover-forward grid with author photos. Peer discovery through visual browsing.",
              },
              {
                icon: "🏅",
                title: "Reading Challenges",
                desc: "Progress tracking, milestone badges, and leaderboards that gamify engagement.",
              },
              {
                icon: "ℹ️",
                title: "About & Trust",
                desc: "Warm, transparent page explaining safety, editorial review, and community values.",
              },
            ]}
          />

          <h3 style={{ marginTop: "48px" }}>
            Validation: 50% → 85% Task Success
          </h3>
          <p>
            Prototypes were tested through moderated sessions with real
            families. Two rapid Lean UX sprint cycles improved task success from
            50% to 85%.
          </p>

          <SkillSpotlight
            skill="Usability Testing"
            description="Tested redesigned flows with target users (children + parents)."
            evidence="50%→85% task success, verified across both audience segments."
          />

          <BaselineTargetMetrics
            items={[
              {
                label: "Task success rate",
                baseline: "50%",
                target: "85%",
                fillPercentage: 85,
              },
              {
                label: "Navigation depth to stories",
                baseline: "4+ clicks",
                target: "1–2 clicks",
                fillPercentage: 75,
              },
              {
                label: "Upload completion (parents)",
                baseline: "Broken",
                target: "End-to-end",
                fillPercentage: 100,
              },
            ]}
          />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 4: IMPACT                            */}
        {/* ============================================ */}
        <CaseStudySection
          id="impact"
          label="The Evidence & Growth"
          heading="The Numbers After Launch"
        >
          <p>
            The redesigned platform launched and was tracked over the first
            month.
          </p>

          <ResultsGrid
            items={[
              {
                value: "+40%",
                label: "Page Views",
                description: "Increase in first month post-launch.",
              },
              {
                value: "+25%",
                label: "Story Submissions",
                description: "Upload volume from young contributors.",
              },
              {
                value: "70%",
                label: "Category Exploration",
                description: "New users exploring 2+ categories per session.",
              },
              {
                value: "50→85%",
                label: "Task Success",
                description: "Improvement across moderated usability testing.",
              },
            ]}
          />

          <h3 style={{ marginTop: "48px" }}>What Came Next</h3>
          <p>
            Post-launch heatmaps confirmed contributor spotlights and peer
            content feeds are the most-interacted elements. The roadmap now
            includes multi-language support, educator-focused reading-level
            filters, peer feedback features, and enhanced accessibility.
          </p>

          <div
            style={{
              marginTop: "48px",
              padding: "32px",
              background: "rgba(139, 105, 250, 0.04)",
              borderRadius: "16px",
              border: "1px solid rgba(139, 105, 250, 0.1)",
            }}
          >
            <h4 style={{ margin: "0 0 12px 0", fontSize: "16px", color: "#8b69fa", fontWeight: 700 }}>
              Key Growth Learnings
            </h4>
            <p style={{ fontSize: "15px", lineHeight: 1.7, margin: "0 0 8px 0" }}>
              Designing for children requires fundamentally different IA thinking. Lean UX works when committed to real users, not just fast timelines.
            </p>
            <p style={{ fontSize: "14px", lineHeight: 1.6, margin: 0, color: "var(--color-text-secondary)", fontStyle: "italic" }}>
              Insight-to-decision mapping makes design rationale transparent and defensible.
            </p>
          </div>

          <div
            style={{
              marginTop: "64px",
              padding: "24px",
              background: "rgba(0,0,0,0.02)",
              borderRadius: "8px",
              border: "1px solid rgba(0,0,0,0.05)",
              fontSize: "14px",
              color: "var(--color-text-secondary)",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            Visit the live platform at{" "}
            <a
              href="https://www.storiesbychildren.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#11a961" }}
            >
              storiesbychildren.com
            </a>
            .
          </div>
        </CaseStudySection>
      </CaseStudyLayout>
    </main>
  );
}
