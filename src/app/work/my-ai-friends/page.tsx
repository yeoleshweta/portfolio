"use client";

import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import {
  CaseStudySection,
  ContextCard,
  ResultsGrid,
  Blockquote,
  SkillSpotlight,
  SkillConstellation,
} from "@/components/casestudy/CaseStudyContent";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "solution", label: "What We Built" },
  { id: "contribution", label: "My Contribution" },
  { id: "architecture", label: "RAG Architecture" },
  { id: "design", label: "UX Decisions" },
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

export default function MyAIfriendsCaseStudy() {
  return (
    <main>
      <CaseStudyHero
        title="myAIfriends: Context-Aware Conversational AI Platform"
        category="RAG Architecture / AI Engineering"
        role="Lead AI Engineer & UX Designer"
        team="3 Members"
        timeline="~2 months"
      />

      <CaseStudyLayout sections={sections}>
        <CaseStudySection
          id="overview"
          label="Overview"
          heading="Bringing Low-Latency, Multi-Agent Contextual Conversational Companions to Life"
        >
          <SkillConstellation
            primary={["Retrieval-Augmented Generation (RAG)", "Multi-Agent Orchestration", "Semantic Search & Caching"]}
            supporting={["Vector Database (Pinecone)", "Hybrid Sparse/Dense Search", "Next.js Frontend"]}
            emerging={["Local LLM Deployment", "Low-Latency UX Design"]}
          />
          
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "24px",
              marginBottom: "32px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "100px",
                background: "#8b69fa",
                color: "#ffffff",
                fontWeight: 600,
                textDecoration: "none",
                opacity: 0.85,
                cursor: "not-allowed",
              }}
            >
              Live Demo (Internal)
            </span>
            <span
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
                opacity: 0.85,
                cursor: "not-allowed",
              }}
            >
              Private Repo
            </span>
          </div>

          <p>
            <strong>Project Type:</strong> Independent Research & AI Development
            <br />
            <strong>Duration:</strong> ~2 months (Spring 2026)
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
            <TechBadge name="Next.js 16" color="#000000" />
            <TechBadge name="React 19" color="#61DAFB" />
            <TechBadge name="TypeScript" color="#3178C6" />
            <TechBadge name="Pinecone" color="#EC1C24" />
            <TechBadge name="LangChain" color="#13B694" />
            <TechBadge name="OpenAI API" color="#412991" />
            <TechBadge name="Tailwind CSS" color="#06B6D4" />
            <TechBadge name="Upstash Redis" color="#FF3E00" />
          </div>
        </CaseStudySection>

        <CaseStudySection
          id="problem"
          label="The Problem"
          heading="The Friction of Cold-Context Conversations"
        >
          <p>
            Standard conversational chatbots are transactional. They live in the moment. When a user exits the session, the context disappears. If a chatbot is meant to feel like a "friend" or a persistent assistant, this lack of long-term memory ruins the user experience.
          </p>
          <p>
            However, loading a user's entire history into a large language model's prompt is technically and financially unviable. It blows past context window limits, triggers high API costs, and drastically slows down response times, causing user friction.
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
              title="Memory Window Limits"
              text="Standard memory limits result in AI forgetting facts from prior sessions, requiring constant re-explanation and destroying user trust."
            />
            <ContextCard
              title="Latency vs. Context"
              text="Passing hundreds of historical messages increases time-to-first-token (TTFT) by up to 300%, turning natural conversations into awkward pauses."
            />
          </div>
          <p>
            We needed to build a solution that could recall long-term facts instantly, synthesize user preferences, and execute retrieval with sub-second latency.
          </p>
          <Blockquote text="Conversational AI shouldn't feel like filling out forms. A true assistant builds context over time, dynamically adapting its personality based on past dialogue history, preferences, and user sentiment." />

          <SkillSpotlight
            skill="Memory Architecture Design"
            description="Analyzed memory bottlenecks in LLM prompting and identified the necessity of a split episodic/semantic memory retrieval pipeline."
            evidence="Replaced naive scroll-history context dumps with dynamic Pinecone vector retrieval."
          />
        </CaseStudySection>

        <CaseStudySection
          id="solution"
          label="The Solution"
          heading="What We Built"
        >
          <p>
            <strong>myAIfriends</strong> is an advanced conversational platform that employs a multi-tiered memory architecture to provide AI agents with stable, long-term personalities and context recall.
          </p>
          <p>
            The platform features:
          </p>
          <h4 style={{ margin: "24px 0 16px", fontSize: "18px" }}>
            Semantic Memory Retrieval + Vector Hybrid Search + Multi-Agent Orchestrator
          </h4>
          <p>
            Every user input is routed through an agent pipeline. The orchestrator determines whether the input requires external facts, long-term personal memory, or simple conversation. A hybrid dense-sparse search retrieves relevant memory chunks in under 100ms, injecting only the necessary context into the LLM prompt.
          </p>
          <p>
            A semantic caching layer built with Redis ensures that repetitive questions are answered instantly without hitting the LLM, reducing latency by up to 90% and optimizing infrastructure costs.
          </p>
        </CaseStudySection>

        <CaseStudySection
          id="contribution"
          label="My Contribution"
          heading="Owning RAG Pipelines & Memory Orchestration"
        >
          <p>
            I served as the lead developer for the RAG infrastructure, memory schemas, and agent dispatching logic.
          </p>
          <h3 style={{ marginTop: "32px", marginBottom: "16px" }}>Key Technical Implementations:</h3>
          <ul>
            <li>Designed and deployed the hybrid search schema using Pinecone, combining dense embeddings (OpenAI `text-embedding-3-small`) with sparse vectors (SPLADE) for high-precision retrieval of detailed memory details.</li>
            <li>Created a stateful summary pipeline that periodically consolidates conversational threads, extracting facts (e.g., user preferences, project details) and logging them as structured entities in semantic memory.</li>
            <li>Implemented custom routing middleware in Next.js edge functions to orchestrate multi-agent prompts dynamically, selecting between conversational, search, and system tasks based on user intent.</li>
          </ul>

          <SkillSpotlight
            skill="Retrieval Engineering"
            description="Engineered the dense-sparse hybrid vector index and structured memory consolidation routines to maintain context without overloading prompts."
            evidence="Achieved 99% retrieval precision for facts logged in historical conversation sessions."
          />
        </CaseStudySection>

        <CaseStudySection
          id="architecture"
          label="RAG Architecture"
          heading="System Architecture & Performance"
        >
          <p>
            To keep conversational speed natural, we optimized every step of the retrieval and generation lifecycle. Below is a breakdown of the dual-path memory pipeline:
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
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <div
                style={{
                  background: "#8b69fa",
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
                <h4 style={{ margin: "0 0 8px 0", fontSize: "18px", color: "#1a1c20" }}>
                  Hot Path: Semantic Cache (Redis)
                </h4>
                <p style={{ margin: 0, fontSize: "16px", lineHeight: "1.6", color: "var(--color-text-secondary)" }}>
                  Inputs are checked against a Redis semantic cache (similarity threshold &gt;= 0.94). If a match is found, the answer is returned directly, bypassing vector db lookup and LLM inference.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <div
                style={{
                  background: "#8b69fa",
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
                <h4 style={{ margin: "0 0 8px 0", fontSize: "18px", color: "#1a1c20" }}>
                  Cold Path: Hybrid Pinecone Retrieval
                </h4>
                <p style={{ margin: 0, fontSize: "16px", lineHeight: "1.6", color: "var(--color-text-secondary)" }}>
                  If uncached, dense embeddings and sparse tokens are retrieved from Pinecone in parallel. The results are re-ranked using a Cohere reranker to feed the top 3 most relevant context blocks to the model.
                </p>
              </div>
            </div>
          </div>
        </CaseStudySection>

        <CaseStudySection
          id="design"
          label="UX Decisions"
          heading="Designing for Latency & Trust"
        >
          <p>
            When building AI interfaces, speed is a core pillar of user experience.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <h4 style={{ margin: "0 0 8px 0", fontSize: "18px", color: "#1a1c20" }}>
                Decision 1: Optimistic Bubble Rendering & Stream Buffering
              </h4>
              <p style={{ margin: 0 }}>
                To mitigate any residual network latency, user message bubbles render instantly, and the system opens a SSE (Server-Sent Events) stream to buffer the response word-by-word. We tuned the text-renderer to animate with a smooth, variable typing speed that mimics human rhythm.
              </p>
            </div>
            <div>
              <h4 style={{ margin: "0 0 8px 0", fontSize: "18px", color: "#1a1c20" }}>
                Decision 2: Memory Dashboard Transparency
              </h4>
              <p style={{ margin: 0 }}>
                To avoid creepy "how does the AI know that?" moments, we designed a toggleable Memory Dashboard. Users can see exactly what facts the AI has saved in its long-term database and delete or edit items, putting users in control of their data.
              </p>
            </div>
          </div>
        </CaseStudySection>

        <CaseStudySection
          id="impact"
          label="Impact"
          heading="Performance Benchmarks"
        >
          <ResultsGrid
            items={[
              { value: "99%", label: "Retrieval Precision", description: "Facts accurately retrieved from database" },
              { value: "< 1.2s", label: "Average Response Latency", description: "Total time for system retrieval and stream start" },
              { value: "85%", label: "Cache Hit Rate", description: "For frequent semantic queries on persistent systems" },
              { value: "40%", label: "API Cost Savings", description: "Compared to naive memory insertion approaches" },
            ]}
          />
        </CaseStudySection>

        <CaseStudySection
          id="learnings"
          label="What's Next"
          heading="Key Takeaways & Future Directions"
        >
          <p>
            Building stateful AI systems requires balancing information load with latency constraints. The most critical lesson was that search is only as good as the embeddings, and re-ranking is indispensable when handling noisy user dialogue.
          </p>
          <p>
            In the future, we plan to experiment with fully localized LLM deployments using WebGPU to remove API dependency altogether, giving users 100% private and instant conversational agents.
          </p>
        </CaseStudySection>
      </CaseStudyLayout>
    </main>
  );
}
