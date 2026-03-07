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
} from "@/components/casestudy/CaseStudyContent";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "features", label: "Features" },
  { id: "impact", label: "Impact" },
];

/* ─────── Tech Badge ─────── */
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

/* ─────── Architecture Layer Card ─────── */
function ArchitectureLayer({
  icon,
  title,
  tech,
  description,
  index,
}: {
  icon: string;
  title: string;
  tech: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.12 }}
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        border: "1px solid rgba(0,0,0,0.05)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
      }}
    >
      <div style={{ fontSize: "28px", marginBottom: "12px" }}>{icon}</div>
      <h4 style={{ margin: "0 0 4px 0", fontSize: "15px" }}>{title}</h4>
      <p
        style={{
          margin: "0 0 10px 0",
          fontSize: "12px",
          color: "#8b5cf6",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {tech}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: "13px",
          color: "var(--color-text-secondary)",
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>
    </motion.div>
  );
}

export default function GestureProCaseStudy() {
  return (
    <main>
      <CaseStudyHero
        title="GesturePro — Real-Time Sign Language Translation"
        category="AI / Accessibility"
        role="Full-Stack Developer & ML Engineer"
        team="4 Engineers"
        timeline="Ongoing"
        image="/assets/gesturepro-hero.png"
      />

      <div
        style={{
          display: "flex",
          gap: "16px",
          justifyContent: "center",
          padding: "0 24px 48px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <a
          href="https://gesturepro-dev.vercel.app/signin"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 28px",
            borderRadius: "12px",
            background: "#8b5cf6",
            color: "#ffffff",
            fontWeight: 600,
            fontSize: "15px",
            textDecoration: "none",
          }}
        >
          🚀 Live Demo
        </a>
        <a
          href="https://github.com/khushboohpatel/gesturepro"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 28px",
            borderRadius: "12px",
            background: "rgba(0,0,0,0.05)",
            color: "var(--color-text-primary)",
            fontWeight: 600,
            fontSize: "15px",
            textDecoration: "none",
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          ⭐ GitHub Repository
        </a>
      </div>

      <CaseStudyLayout sections={sections}>
        {/* ============================================ */}
        {/* SECTION 1: OVERVIEW                          */}
        {/* ============================================ */}
        <CaseStudySection
          id="overview"
          label="Overview"
          heading="Breaking the Communication Barrier"
        >
          <p>
            <strong>GesturePro</strong> is an interactive sign language
            translator that empowers hearing-impaired and aphonic individuals by
            using advanced AI to instantly translate sign language gestures into{" "}
            <strong>real-time text and speech</strong>. The platform uses
            computer vision and deep learning to recognize hand gestures through
            a webcam feed and convert them into readable text — bridging the
            communication gap in real time.
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
            <TechBadge name="FastAPI" color="#009688" />
            <TechBadge name="Python" color="#3776AB" />
            <TechBadge name="TensorFlow" color="#FF6F00" />
            <TechBadge name="MediaPipe" color="#0097A7" />
            <TechBadge name="PostgreSQL" color="#336791" />
            <TechBadge name="Docker" color="#2496ED" />
            <TechBadge name="Vercel" color="#000000" />
          </div>

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
              title="Problem"
              text="Hearing-impaired individuals face daily communication barriers. Existing translation tools are either expensive, non-real-time, or require specialized hardware."
            />
            <ContextCard
              title="Solution"
              text="A browser-based, real-time sign language translator using just a webcam — no special hardware needed. Powered by ML hand-tracking and gesture recognition."
            />
          </div>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 2: ARCHITECTURE                      */}
        {/* ============================================ */}
        <CaseStudySection
          id="architecture"
          label="System Design"
          heading="Full-Stack AI Architecture"
        >
          <p>
            GesturePro is built as a three-tier architecture — a Next.js
            frontend for real-time video capture, a FastAPI backend for
            authentication and data management, and an ML pipeline for gesture
            recognition. The entire system is containerized with Docker for
            consistent deployment.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
              marginTop: "32px",
              marginBottom: "32px",
            }}
          >
            <ArchitectureLayer
              index={0}
              icon="🖥️"
              title="Frontend"
              tech="Next.js + TailwindCSS"
              description="Real-time webcam capture, video streaming UI, authentication flow (sign-in/sign-up), and responsive gesture translation display."
            />
            <ArchitectureLayer
              index={1}
              icon="⚡"
              title="Backend"
              tech="FastAPI + PostgreSQL"
              description="RESTful API with user authentication, session management, translation history storage, and health-checked Docker services."
            />
            <ArchitectureLayer
              index={2}
              icon="🧠"
              title="ML Pipeline"
              tech="Python + TensorFlow"
              description="Hand landmark detection via MediaPipe, processed training data, Jupyter notebooks for experimentation, and saved models for inference."
            />
          </div>

          <h3 style={{ marginTop: "48px" }}>Project Structure</h3>
          <div
            style={{
              marginTop: "16px",
              padding: "24px",
              background: "rgba(0,0,0,0.02)",
              borderRadius: "12px",
              border: "1px solid rgba(0,0,0,0.06)",
              fontFamily: "monospace",
              fontSize: "13px",
              lineHeight: 1.8,
              color: "var(--color-text-secondary)",
            }}
          >
            <div>
              <strong style={{ color: "var(--color-text-primary)" }}>
                gesturepro/
              </strong>
            </div>
            <div style={{ paddingLeft: "20px" }}>
              ├── <strong>client/</strong> — Next.js frontend (signin, signup,
              video capture)
            </div>
            <div style={{ paddingLeft: "20px" }}>
              ├── <strong>server/</strong> — FastAPI backend (auth, API, models,
              services)
            </div>
            <div style={{ paddingLeft: "20px" }}>
              ├── <strong>ml/</strong> — ML pipeline (notebooks, saved models,
              processed data)
            </div>
            <div style={{ paddingLeft: "20px" }}>
              ├── <strong>data/</strong> — Training datasets
            </div>
            <div style={{ paddingLeft: "20px" }}>
              └── <strong>docker-compose.yml</strong> — Full-stack orchestration
            </div>
          </div>

          <BaselineTargetMetrics
            items={[
              {
                label: "Languages",
                baseline: "JavaScript 51.5%",
                target: "Python 31.9%",
                fillPercentage: 52,
              },
              {
                label: "Codebase",
                baseline: "56 commits",
                target: "3 services",
                fillPercentage: 80,
              },
              {
                label: "Deployment",
                baseline: "Docker Compose",
                target: "Vercel + Cloud",
                fillPercentage: 90,
              },
            ]}
          />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 3: FEATURES                          */}
        {/* ============================================ */}
        <CaseStudySection
          id="features"
          label="Key Features"
          heading="What GesturePro Does"
        >
          <p>
            The platform combines real-time computer vision with a clean,
            accessible interface to create a seamless translation experience.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
              marginTop: "32px",
            }}
          >
            {[
              {
                icon: "📹",
                title: "Real-Time Video Capture",
                desc: "Browser-based webcam access streams hand gestures directly to the ML model — no downloads or special hardware required.",
              },
              {
                icon: "✋",
                title: "Hand Landmark Detection",
                desc: "MediaPipe extracts 21 hand landmarks per frame, creating a skeleton representation of hand position and finger orientation.",
              },
              {
                icon: "🤖",
                title: "AI Gesture Classification",
                desc: "TensorFlow model classifies hand landmarks into sign language letters and words with real-time inference.",
              },
              {
                icon: "💬",
                title: "Instant Text Translation",
                desc: "Recognized gestures are immediately converted to on-screen text, enabling fluid conversation without delays.",
              },
              {
                icon: "🔐",
                title: "User Authentication",
                desc: "Secure sign-in/sign-up flow with session management, enabling personalized translation history and preferences.",
              },
              {
                icon: "🐳",
                title: "Containerized Deployment",
                desc: "Docker Compose orchestrates all services (frontend, backend, database) with health checks for reliable deployment.",
              },
            ].map((item, i) => (
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
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION 4: IMPACT                            */}
        {/* ============================================ */}
        <CaseStudySection
          id="impact"
          label="Impact & Vision"
          heading="Accessibility Through Technology"
        >
          <p>
            GesturePro represents a step toward making communication universally
            accessible. By combining browser-based computer vision with deep
            learning, the platform removes the cost and hardware barriers that
            have historically limited sign language translation tools.
          </p>

          <ResultsGrid
            items={[
              {
                value: "Real-Time",
                label: "Translation Speed",
                description:
                  "Gestures are recognized and displayed as text within milliseconds of capture.",
              },
              {
                value: "Zero",
                label: "Hardware Cost",
                description:
                  "Works with any standard webcam — no specialized sensors or gloves needed.",
              },
              {
                value: "Full-Stack",
                label: "Production Architecture",
                description:
                  "Containerized 3-tier system with auth, persistence, and ML inference.",
              },
              {
                value: "Open",
                label: "Source Code",
                description:
                  "Fully open-source on GitHub for community contribution and extension.",
              },
            ]}
          />

          <h3 style={{ marginTop: "48px" }}>Future Roadmap</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            {[
              {
                icon: "🌍",
                title: "Multi-Language ASL Support",
                desc: "Expand beyond ASL to include BSL, ISL, and other sign language systems for global accessibility.",
              },
              {
                icon: "🗣️",
                title: "Text-to-Speech Output",
                desc: "Add voice synthesis so translated text can be spoken aloud for two-way communication.",
              },
              {
                icon: "📱",
                title: "Mobile-First PWA",
                desc: "Progressive Web App for on-the-go translation using smartphone cameras.",
              },
              {
                icon: "📊",
                title: "Learning Analytics",
                desc: "Track user progress in learning sign language with personalized practice recommendations.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  background: "rgba(139, 92, 246, 0.04)",
                  border: "1px solid rgba(139, 92, 246, 0.15)",
                  borderRadius: "16px",
                  padding: "24px",
                }}
              >
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>
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

          <div
            style={{
              marginTop: "48px",
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
            GesturePro is an open-source project. Contributions, feedback, and
            feature requests are welcome on{" "}
            <a
              href="https://github.com/khushboohpatel/gesturepro"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#8b5cf6" }}
            >
              GitHub
            </a>
            .
          </div>
        </CaseStudySection>
      </CaseStudyLayout>
    </main>
  );
}
