"use client";

import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import {
  CaseStudySection,
  ResultsGrid,
  Blockquote,
  ExpandableSurveyRow,
  BaselineTargetMetrics,
  WorkflowComparison,
} from "@/components/casestudy/CaseStudyContent";

const sections = [
  { id: "problem", label: "The Problem" },
  { id: "ux-story", label: "The UX Story" },
  { id: "ui", label: "The UI" },
  { id: "impact", label: "Impact" },
];

export default function JohnDeereCaseStudy() {
  return (
    <main>
      <CaseStudyHero
        title="Enterprise Survey Logic & Analytics Reimagined"
        category="UX/UI Case Study"
        role="Product Designer"
        team="1 PM, 2 Developers, 1 Designer"
        timeline="8 Weeks"
        isVideo={true}
        videoUrl="/assets/Screen Recording 2026-03-02 at 00.58.26.mov"
      />

      <CaseStudyLayout sections={sections}>
        {/* ============================================ */}
        {/* SECTION 1: THE PROBLEM                       */}
        {/* ============================================ */}
        <CaseStudySection
          id="problem"
          label="Overview"
          heading="The 2-Hour Survey Tax"
        >
          <p>
            John Deere's 250+ products all need user feedback. But building a
            single survey took <strong>~120 minutes</strong> of back-and-forth
            between a Product Manager and an engineer — filing tickets,
            reviewing builds, requesting changes. For an organisation that needs
            feedback constantly, this wasn't just inefficient. It was a
            bottleneck slowing down product decisions across the entire company.
          </p>
          <p>
            <strong>I was asked to fix it.</strong> Before touching a pixel, I
            set three baseline metrics with the product owner so we'd know
            whether we actually succeeded:
          </p>

          <BaselineTargetMetrics
            items={[
              {
                label: "Time to build a survey",
                baseline: "~120 mins",
                target: "< 48 mins",
                fillPercentage: 60,
              },
              {
                label: "User satisfaction (CSAT)",
                baseline: "3.8 / 5",
                target: "> 4.25 / 5",
                fillPercentage: 85,
              },
              {
                label: "Survey completion rate",
                baseline: "50%",
                target: "> 62.5%",
                fillPercentage: 75,
              },
            ]}
          />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 2: THE UX STORY                      */}
        {/* ============================================ */}
        <CaseStudySection
          id="ux-story"
          label="Research → Design"
          heading="How UX Research Reshaped the Entire Workflow"
        >
          <p>
            I started with 45-minute semi-structured interviews across product
            owners, engineers, and UX researchers — everyone who touched a
            survey. The finding that changed the entire project came from
            observing users building <strong>branching logic</strong>: they had
            to save their question, switch to a separate "Logic Rules" tab,
            manually look up question IDs, and write conditional rules by hand.
            This cognitively heavy process led to a{" "}
            <strong>60% drop-off rate</strong> when building complex surveys.
          </p>
          <p>
            <strong>The Solution:</strong> I fundamentally restructured the
            mental model. By introducing an <strong>Inline Branching UI</strong>{" "}
            directly on the Question Card, users could define rules contextually
            without ever leaving the builder canvas.
          </p>

          <WorkflowComparison />

          <p style={{ marginTop: "48px" }}>
            This single design decision eliminated the biggest usability
            barrier. Round 2 testing confirmed that hesitation around branching
            dropped to zero — users no longer had to hold question IDs in their
            head while switching between disconnected tabs.
          </p>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 3: THE UI                            */}
        {/* ============================================ */}
        <CaseStudySection
          id="ui"
          label="The Interface"
          heading="Designing a Self-Serve Platform"
        >
          <p>
            Research revealed four core capabilities the platform needed: a
            drag-and-drop question builder, inline branching logic, real-time
            preview with John Deere branding, and an analytics dashboard that
            eliminated the manual CSV-to-Excel pipeline entirely.
          </p>

          <h3 style={{ marginTop: "64px" }}>Solving the Analytics Dead Zone</h3>
          <p>
            The old process: export a CSV, open Excel, build a chart, share it
            in an email. By the time insights reached decision makers, the data
            was stale. I designed an expandable data table — expanding a survey
            row reveals interactive analytics right where PMs track their
            surveys. No separate reports page. No context switch.
          </p>

          <div style={{ marginTop: "48px", marginBottom: "48px" }}>
            <ExpandableSurveyRow />
          </div>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 4: IMPACT                            */}
        {/* ============================================ */}
        <CaseStudySection
          id="impact"
          label="Outcomes"
          heading="Every Baseline Target Was Exceeded"
        >
          <p>
            The pilot launched with a 50-person PM cohort across four product
            lines, tracked over 4 weeks.
          </p>

          <ResultsGrid
            items={[
              {
                value: "-60%",
                label: "Creation Time",
                description:
                  "Survey build time dropped from ~120 minutes to just 48 minutes.",
              },
              {
                value: "+25%",
                label: "Completion Rate",
                description:
                  "Survey completion jumped from 50% to 62.5% due to better logic and branding.",
              },
              {
                value: "+16%",
                label: "User CSAT",
                description:
                  "Platform satisfaction score hit 4.4 / 5, easily beating the target.",
              },
              {
                value: "100%",
                label: "Self-Serve",
                description:
                  "Completely eliminated engineering dependency for routine surveys.",
              },
            ]}
          />

          <Blockquote
            text="I can spin up a survey in under five minutes — no coding needed."
            author="Product Manager, Pilot Participant"
          />

          <h3>What Came Next</h3>
          <p>
            The pilot's success led directly to funding for Multi-Language
            Support, Advanced Cross-Tabulation Analytics, a permanent Template
            Library, and full CRM integrations. A tool meant to solve a 2-hour
            bottleneck became the foundation for how John Deere listens to its
            users.
          </p>

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
            This case study documents design and research work conducted at John
            Deere. Metrics and details have been shared with permission. Visual
            assets have been omitted to respect internal confidentiality.
          </div>
        </CaseStudySection>
      </CaseStudyLayout>
    </main>
  );
}
