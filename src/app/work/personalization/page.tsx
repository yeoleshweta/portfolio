"use client";

import React from "react";
import { motion } from "framer-motion";
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
<<<<<<< HEAD
  { id: "brands", label: "The Brands" },
=======
>>>>>>> v2
  { id: "diagnosis", label: "The Diagnosis" },
  { id: "framework", label: "The Framework" },
  { id: "implementation", label: "Implementation" },
  { id: "results", label: "Results & Impact" },
  { id: "reflections", label: "Reflections" },
];

<<<<<<< HEAD
/* ─────── Brand Card Component ─────── */
function BrandCard({
  name,
  description,
  audience,
  color,
}: {
  name: string;
  description: string;
  audience: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "24px",
        border: `1px solid ${color}22`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        flex: "1 1 300px",
      }}
    >
      <h4
        style={{
          margin: "0 0 8px 0",
          color,
          fontSize: "18px",
          fontWeight: 700,
        }}
      >
        {name}
      </h4>
      <p style={{ fontSize: "14px", fontWeight: 600, margin: "0 0 12px 0" }}>
        {description}
      </p>
      <p
        style={{
          fontSize: "13px",
          color: "var(--color-text-secondary)",
          margin: 0,
          lineHeight: "1.5",
        }}
      >
        <strong>Audience:</strong> {audience}
      </p>
    </motion.div>
  );
}

=======
>>>>>>> v2
/* ─────── Framework Layer Component ─────── */
function FrameworkLayer({
  title,
  principle,
  details,
  color,
  index,
}: {
  title: string;
  principle: string;
  details: string[];
  color: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "32px",
        border: `1px solid ${color}33`,
        marginBottom: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "6px",
          height: "100%",
          background: color,
        }}
      />
      <h4
        style={{
          color,
          margin: "0 0 8px 0",
          fontSize: "20px",
          fontWeight: 800,
        }}
      >
        {title}
      </h4>
      <p
        style={{
          fontSize: "14px",
          fontStyle: "italic",
          marginBottom: "20px",
          color: "var(--color-text-secondary)",
        }}
      >
        <strong>Principle:</strong> {principle}
      </p>
<<<<<<< HEAD
      <ul
=======
      <div
>>>>>>> v2
        style={{
          padding: 0,
          margin: 0,
          listStyle: "none",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {details.map((detail, i) => (
<<<<<<< HEAD
          <li
=======
          <div
>>>>>>> v2
            key={i}
            style={{
              fontSize: "14px",
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <span style={{ color, fontSize: "18px" }}>→</span>
            {detail}
<<<<<<< HEAD
          </li>
        ))}
      </ul>
=======
          </div>
        ))}
      </div>
>>>>>>> v2
    </motion.div>
  );
}

export default function PersonalizationCaseStudy() {
  return (
    <main>
      <CaseStudyHero
        title="E-Commerce Personalization at Scale"
        category="UX Personalization & Data Strategy"
        role="UX Personalization Specialist"
<<<<<<< HEAD
        team="Capita, Qubit, Arcadia Group"
=======
        team="Capita, Qubit, Wallis"
>>>>>>> v2
        timeline="Jan 2018 – Oct 2022"
        image="/assets/personalization-hero.png"
      />

      <CaseStudyLayout sections={sections}>
        <CaseStudySection
          id="overview"
          label="Overview"
<<<<<<< HEAD
          heading="Designing Conversion Strategies Across Seven Retail Brands"
        >
          <p>
            The project focused on bridging the gap between high-volume
            marketing and generic website experiences. For Britain's largest
            fashion retailers, the challenge wasn't a lack of traffic; it was
            that 50 million shoppers saw exactly the same experience, leading to
            significant revenue leakage.
=======
          heading="Designing Conversion Strategies for Wallis"
        >
          <p>
            The project focused on bridging the gap between high-volume
            marketing and generic website experiences. For Wallis, the challenge
            wasn't a lack of traffic; it was that a vast number of shoppers saw
            exactly the same experience, leading to significant revenue leakage.
>>>>>>> v2
          </p>
          <p>
            As a Personalization Specialist embedded within Qubit's London team,
            I designed and implemented real-time behavioral interventions for
<<<<<<< HEAD
            the entire Arcadia portfolio, turning generic sessions into
            contextually relevant journeys.
=======
            the Wallis website, turning generic sessions into contextually
            relevant journeys.
>>>>>>> v2
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginTop: "32px",
            }}
          >
            <ContextCard
              title="Scale"
<<<<<<< HEAD
              text="50M+ annual shoppers across 7 distinct global fashion brands."
=======
              text="Significant annual traffic across the entire online store."
>>>>>>> v2
            />
            <ContextCard
              title="Impact"
              text="Direct revenue growth via systematic behavioral triggers and campaign mirroring."
            />
          </div>
        </CaseStudySection>

        <CaseStudySection
<<<<<<< HEAD
          id="brands"
          label="The Brands"
          heading="Seven Brands, Seven Audiences"
        >
          <p>
            Arcadia Group consisted of seven distinct brands, each serving a
            unique customer segment. The strategy required a framework that
            could adapt to these varied behaviors while maintaining shared
            technical efficiency.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginTop: "32px",
            }}
          >
            <BrandCard
              name="Topshop / Topman"
              description="Trend-driven fashion."
              audience="Students, fast-moving inventory, global growth."
              color="#1a1c20"
            />
            <BrandCard
              name="Dorothy Perkins"
              description="Affordable womenswear."
              audience="Broad demographic, heavy email promotion."
              color="#8b69fa"
            />
            <BrandCard
              name="Evans"
              description="Plus-size womenswear."
              audience="Older, less digitally native, high need for simplicity."
              color="#11a961"
            />
            <BrandCard
              name="Miss Selfridge"
              description="Young, trend-conscious."
              audience="Highly active promotional calendars (Black Friday, etc.)."
              color="#ec4899"
            />
            <BrandCard
              name="Burton"
              description="Omnichannel menswear."
              audience="Content-driven, consistent in-store/online story."
              color="#f59e0b"
            />
            <BrandCard
              name="Wallis & Wallis"
              description="Sophisticated womenswear."
              audience="Older, style-conscious professionals."
              color="#6366f1"
            />
          </div>
        </CaseStudySection>

        <CaseStudySection
=======
>>>>>>> v2
          id="diagnosis"
          label="The Diagnosis"
          heading="What the Data Revealed"
        >
          <p>
            Before designing interventions, I mapped behavioral data across the
            portfolio. Three critical friction points emerged as the primary
            sources of conversion loss.
          </p>

          <div style={{ marginTop: "40px" }}>
            <h3 style={{ fontSize: "20px", marginBottom: "16px" }}>
              1. The Disconnected Journey
            </h3>
            <p>
              Email campaigns drove massive spikes, but the website remained
              "unaware" of why the visitor was there. We found that discount
              code usage was significantly lower than open rates because the
              site failed to remind customers of the offers they'd clicked on.
            </p>

            <h3
              style={{
                fontSize: "20px",
                marginBottom: "16px",
                marginTop: "32px",
              }}
            >
              2. Dead Ends
            </h3>
            <p>
              Empty bags and zero-results search pages functioned as exits.
              Instead of recovering the session, the site simply displayed a
              "Sorry" message, abandoning thousands of daily visitors at the
              point of intent.
            </p>

            <h3
              style={{
                fontSize: "20px",
                marginBottom: "16px",
                marginTop: "32px",
              }}
            >
              3. One Size Fit Nobody
            </h3>
            <p>
              First-time international visitors saw the same homepage as loyal
              UK customers. Despite having the data, the sites provided no
              acknowledgement of history or context.
            </p>
          </div>

          <Blockquote text="The diagnosis was clear: these websites weren't broken. They were generic. And in e-commerce, generic is broken — it just breaks quietly, one lost session at a time." />
        </CaseStudySection>

        <CaseStudySection
          id="framework"
          label="The Framework"
          heading="Building a Systematic Approach"
        >
          <p>
            To move beyond scattered A/B testing, I developed a four-layer
            framework that addressed friction at every stage of the funnel. This
<<<<<<< HEAD
            allowed us to replicate success across all seven brands with speed
            and rigour.
=======
            allowed us to deploy interventions systematically with speed and
            rigour.
>>>>>>> v2
          </p>

          <div style={{ marginTop: "40px" }}>
            <FrameworkLayer
              index={0}
              title="1. Campaign Mirroring"
              principle="The website should know what brought the customer there."
              color="#8b69fa"
              details={[
                "Dynamic banners on product pages reinforcing email offers.",
                "In-bag reminders of active discount codes.",
                "Pre-populated codes at checkout to reduce friction.",
              ]}
            />
            <FrameworkLayer
              index={1}
              title="2. Behavioural Triggers"
              principle="Real-time data should power moments of urgency and proof."
              color="#11a961"
              details={[
                "Urgency messaging grounded in real inventory velocity.",
                "Geo-specific social proof (e.g., 'Trending in Chicago').",
                "Threshold nudges for free shipping qualification.",
              ]}
            />
            <FrameworkLayer
              index={2}
              title="3. Recovery & Re-engagement"
              principle="Turn dead ends into opportunities."
              color="#f59e0b"
              details={[
                "Personalized product carousels on empty bag pages.",
                "Recommendation engine backup for zero-results search.",
                "Checkout simplification for high-friction segments.",
              ]}
            />
            <FrameworkLayer
              index={3}
              title="4. Segmented Experiences"
              principle="Different customers deserve fundamentally different journeys."
              color="#ec4899"
              details={[
                "Orienting onboarding for non-digitally native audiences.",
<<<<<<< HEAD
                "Student price toggles for trend-driven brands.",
=======
                "Tailored promotions based on user segments.",
>>>>>>> v2
                "Product prioritization based on IP detected location.",
              ]}
            />
          </div>
        </CaseStudySection>

        <CaseStudySection
          id="implementation"
          label="Implementation"
          heading="Rigorous Execution"
        >
          <p>
            Implementation wasn't just about UI changes—it was about{" "}
            <strong>statistical rigour</strong>. We introduced 10% blank-ad
            control groups (placebos) to calculate true incremental ROI, moving
            from correlation to causation.
          </p>
          <p>
<<<<<<< HEAD
            For brands like <strong>Miss Selfridge</strong>, we synchronized
            on-site messaging with a relentless daily promotional calendar,
            ensuring creative was always aligned with the trade plan.
=======
            We synchronized on-site messaging with a relentless daily
            promotional calendar, ensuring creative was always aligned with the
            trade plan.
>>>>>>> v2
          </p>
        </CaseStudySection>

        <CaseStudySection
          id="results"
          label="Results"
          heading="Measuring the Lift"
        >
          <ResultsGrid
            items={[
              {
<<<<<<< HEAD
                label: "Topshop Conversion",
                value: "11% ↑",
                description:
                  "Significant revenue lift driven by student pricing and geo-social proof.",
              },
              {
                label: "Dorothy Perkins",
                value: "Campaign ROI",
=======
                label: "Conversion Lift",
                value: "11% ↑",
                description:
                  "Significant revenue lift driven by targeted segments and geo-social proof.",
              },
              {
                label: "Campaign ROI",
                value: "Increased",
>>>>>>> v2
                description:
                  "Vast reduction in leaked conversion via mirroring.",
              },
              {
<<<<<<< HEAD
                label: "Evans",
                value: "UX Simplicity",
=======
                label: "UX Simplicity",
                value: "Improved",
>>>>>>> v2
                description:
                  "Increased engagement through orienting onboarding.",
              },
              {
<<<<<<< HEAD
                label: "Portfolio Scale",
                value: "50M shoppers",
                description:
                  "Systematic deployment across the entire Arcadia group.",
=======
                label: "Deployment Scale",
                value: "Site-wide",
                description: "Systematic deployment across all key funnels.",
>>>>>>> v2
              },
            ]}
          />

          <div style={{ marginTop: "48px" }}>
            <Blockquote
              text="Personalization is helping us build relationships with our customers that translate into increased engagement, loyalty and revenue."
              author="Simon Pritchard, Arcadia Group Digital Director"
            />
          </div>
        </CaseStudySection>

        <CaseStudySection
          id="reflections"
          label="Reflections"
<<<<<<< HEAD
          heading="Key Learnings Across Seven Brands"
=======
          heading="Key Learnings"
>>>>>>> v2
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "32px",
              marginTop: "32px",
            }}
          >
            <div>
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                Complexity ≠ Impact
              </h4>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                The most impactful interventions were often the simplest: code
                reminders and dead-end recovery. Clarity consistently beat
                sophisticated algorithms in driving immediate ROI.
              </p>
            </div>
            <div>
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                Honest Scarcity Wins
              </h4>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Fake countdowns erode trust. Grounding urgency in real inventory
                data ensured that our signals remained useful and respected over
                the long term.
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: "64px",
              padding: "40px",
              background: "rgba(17, 169, 97, 0.04)",
              borderRadius: "24px",
              border: "1px solid rgba(17, 169, 97, 0.1)",
            }}
          >
            <h4
              style={{
                margin: "0 0 16px 0",
                color: "#11a961",
                fontSize: "20px",
                fontWeight: 800,
              }}
            >
<<<<<<< HEAD
              The Evans Lesson
            </h4>
            <p style={{ fontSize: "15px", lineHeight: 1.7, margin: 0 }}>
              The Evans project taught me that personalization isn't just about
              adding more—it's about adding the right thing. For an older, less
              digitally native audience, "good personalization" meant restraint
              and orientation. It shifted my perspective from extracting value
              to genuinely helping the user, making "Is this better for the
              person?" my primary design filter.
=======
              The Audience Lesson
            </h4>
            <p style={{ fontSize: "15px", lineHeight: 1.7, margin: 0 }}>
              This project taught me that personalization isn't just about
              adding more—it's about adding the right thing. For various
              segments, particularly less digitally native users, "good
              personalization" meant restraint and orientation. It shifted my
              perspective from extracting value to genuinely helping the user,
              making "Is this better for the person?" my primary design filter.
>>>>>>> v2
            </p>
          </div>

          <div style={{ padding: "40px 0", textAlign: "center" }}>
            <p
              style={{
                fontSize: "14px",
                color: "var(--color-text-secondary)",
                fontStyle: "italic",
              }}
            >
              This case study documents personalization design conducted with
<<<<<<< HEAD
              Qubit for Arcadia Group. Proprietary metrics have been generalized
              for confidentiality.
=======
              Qubit for Wallis. Proprietary metrics have been generalized for
              confidentiality.
>>>>>>> v2
            </p>
          </div>
        </CaseStudySection>
      </CaseStudyLayout>
    </main>
  );
}
