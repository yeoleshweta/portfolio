import { useState } from "react";

const projects = {
  featured: [
    {
      title: "Measuring Patient-Centered Communication",
      tag: "NLP & UX Research",
      desc: "Building a scalable, rubric-grounded NLP pipeline that measures patient-centered communication behaviors across real clinical transcripts.",
      metrics: ["985 conversations labeled", "11 constructs", "BERT classifier"],
      color: "#f0eeff",
      accent: "#7c5cbf",
      emoji: "🏥",
    },
    {
      title: "Healthcare Bias — NLP Detection",
      tag: "Data Science & ML",
      desc: "ML pipelines surfacing implicit clinician bias at scale across patient demographics, aiming to improve equitable healthcare outcomes.",
      metrics: ["ClinicalBERT + RoBERTa", "4-label classification", "HIPAA-compliant"],
      color: "#fff0f5",
      accent: "#bf5c8c",
      emoji: "⚕️",
    },
  ],
  rest: [
    { title: "PM Design Thinking @ John Deere", tag: "UX Research", emoji: "🌱", metric: "80% UX confidence lift" },
    { title: "Enterprise Survey Logic & Analytics", tag: "Product Design", emoji: "📊", metric: "60% faster build time" },
    { title: "Stories by Children", tag: "UX Research & Design", emoji: "📖", metric: "50% → 85% task success" },
    { title: "E-Commerce Personalization at Scale", tag: "UX Personalization", emoji: "🛍️", metric: "11% conversion lift" },
    { title: "GesturePro — Sign Language Translation", tag: "AI / Accessibility", emoji: "🤟", metric: "Real-time, zero hardware" },
    { title: "CryptoSecure: Smart Contract Security", tag: "Blockchain / ML", emoji: "🔐", metric: "$10K audit → 30 seconds" },
  ],
};

/* ─── OPTION A: Editorial Split ─── */
function OptionA() {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#f5f4f0", padding: "60px 40px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <span style={{ fontSize: 13, letterSpacing: 4, textTransform: "uppercase", color: "#888", fontFamily: "sans-serif" }}>Featured Work</span>
        <h2 style={{ fontSize: 42, fontWeight: 800, margin: "8px 0 0", fontFamily: "sans-serif", color: "#111" }}>
          Selected <em style={{ fontWeight: 400, color: "#7c5cbf" }}>Projects</em>
        </h2>
      </div>

      {/* Two hero featured cards side by side */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {projects.featured.map((p, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(`a-${i}`)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === `a-${i}` ? p.accent : "#fff",
              borderRadius: 20,
              padding: "40px 36px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              border: `2px solid ${hovered === `a-${i}` ? p.accent : "#eee"}`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{
              position: "absolute", top: 20, right: 24,
              fontSize: 48, opacity: hovered === `a-${i}` ? 0.25 : 0.08,
              transition: "opacity 0.3s"
            }}>{p.emoji}</div>
            <span style={{
              fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
              color: hovered === `a-${i}` ? "rgba(255,255,255,0.7)" : p.accent,
              fontFamily: "sans-serif", fontWeight: 600
            }}>{p.tag}</span>
            <h3 style={{
              fontSize: 22, margin: "12px 0 14px", lineHeight: 1.3,
              color: hovered === `a-${i}` ? "#fff" : "#111",
              fontFamily: "sans-serif", fontWeight: 700, transition: "color 0.3s"
            }}>{p.title}</h3>
            <p style={{
              fontSize: 14, lineHeight: 1.65,
              color: hovered === `a-${i}` ? "rgba(255,255,255,0.85)" : "#555",
              fontFamily: "sans-serif", marginBottom: 24, transition: "color 0.3s"
            }}>{p.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {p.metrics.map((m, mi) => (
                <span key={mi} style={{
                  fontSize: 12, padding: "4px 12px", borderRadius: 20,
                  background: hovered === `a-${i}` ? "rgba(255,255,255,0.2)" : p.color,
                  color: hovered === `a-${i}` ? "#fff" : p.accent,
                  fontFamily: "sans-serif"
                }}>{m}</span>
              ))}
            </div>
            <div style={{
              marginTop: 28, fontSize: 13, fontWeight: 600,
              color: hovered === `a-${i}` ? "#fff" : p.accent,
              fontFamily: "sans-serif", display: "flex", alignItems: "center", gap: 6
            }}>View Case Study <span>→</span></div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "36px 0 28px" }}>
        <div style={{ flex: 1, height: 1, background: "#ddd" }} />
        <span style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "#aaa", fontFamily: "sans-serif" }}>More Work</span>
        <div style={{ flex: 1, height: 1, background: "#ddd" }} />
      </div>

      {/* Rest: compact 3-column grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {projects.rest.map((p, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(`ar-${i}`)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === `ar-${i}` ? "#111" : "#fff",
              borderRadius: 14,
              padding: "22px 24px",
              cursor: "pointer",
              transition: "all 0.25s",
              border: "1.5px solid #eee",
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 10 }}>{p.emoji}</div>
            <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: hovered === `ar-${i}` ? "#888" : "#aaa", fontFamily: "sans-serif" }}>{p.tag}</span>
            <h4 style={{ fontSize: 15, margin: "6px 0 8px", color: hovered === `ar-${i}` ? "#fff" : "#111", fontFamily: "sans-serif", fontWeight: 600, lineHeight: 1.4, transition: "color 0.25s" }}>{p.title}</h4>
            <p style={{ fontSize: 12, color: hovered === `ar-${i}` ? "#aaa" : "#888", fontFamily: "sans-serif", transition: "color 0.25s" }}>{p.metric}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── OPTION B: Magazine / Asymmetric ─── */
function OptionB() {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ fontFamily: "sans-serif", background: "#0d0d0d", padding: "60px 40px", color: "#fff" }}>
      <div style={{ marginBottom: 48 }}>
        <span style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#666" }}>Featured Work</span>
        <h2 style={{ fontSize: 44, fontWeight: 900, margin: "8px 0 0", lineHeight: 1 }}>
          Best of <span style={{ color: "#a78bfa" }}>my work.</span>
        </h2>
      </div>

      {/* Big + small asymmetric layout */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 16, marginBottom: 16 }}>
        {/* Primary featured - large */}
        <div
          onMouseEnter={() => setHovered("b0")}
          onMouseLeave={() => setHovered(null)}
          style={{
            background: hovered === "b0" ? "#a78bfa" : "#1a1a1a",
            borderRadius: 24,
            padding: "48px 44px",
            cursor: "pointer",
            transition: "background 0.3s",
            position: "relative", overflow: "hidden",
          }}
        >
          <div style={{ fontSize: 72, position: "absolute", right: 32, bottom: 24, opacity: 0.1 }}>🏥</div>
          <span style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: hovered === "b0" ? "rgba(255,255,255,0.6)" : "#a78bfa" }}>NLP & UX Research</span>
          <h3 style={{ fontSize: 28, fontWeight: 800, margin: "14px 0 16px", lineHeight: 1.25, color: "#fff" }}>Measuring Patient-Centered Communication</h3>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: 380 }}>
            Building a scalable, rubric-grounded NLP pipeline that measures patient-centered communication behaviors across real clinical transcripts.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
            {["985 conversations", "BERT classifier", "11 constructs"].map(m => (
              <span key={m} style={{ fontSize: 12, padding: "5px 14px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}>{m}</span>
            ))}
          </div>
          <div style={{ marginTop: 32, fontSize: 13, fontWeight: 700, color: hovered === "b0" ? "#fff" : "#a78bfa" }}>View Case Study →</div>
        </div>

        {/* Secondary featured */}
        <div
          onMouseEnter={() => setHovered("b1")}
          onMouseLeave={() => setHovered(null)}
          style={{
            background: hovered === "b1" ? "#ec4899" : "#1a1a1a",
            borderRadius: 24,
            padding: "40px 36px",
            cursor: "pointer",
            transition: "background 0.3s",
            position: "relative", overflow: "hidden",
          }}
        >
          <div style={{ fontSize: 64, position: "absolute", right: 24, bottom: 20, opacity: 0.1 }}>⚕️</div>
          <span style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: hovered === "b1" ? "rgba(255,255,255,0.6)" : "#f9a8d4" }}>Data Science & ML</span>
          <h3 style={{ fontSize: 22, fontWeight: 800, margin: "14px 0 16px", lineHeight: 1.3, color: "#fff" }}>Healthcare Bias — NLP Detection</h3>
          <p style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.65)" }}>
            ML pipelines surfacing implicit clinician bias at scale across patient demographics.
          </p>
          <div style={{ marginTop: 24, fontSize: 13, fontWeight: 700, color: hovered === "b1" ? "#fff" : "#f9a8d4" }}>View Case Study →</div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "40px 0 28px" }}>
        <div style={{ flex: 1, height: 1, background: "#2a2a2a" }} />
        <span style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#555" }}>All Projects</span>
        <div style={{ flex: 1, height: 1, background: "#2a2a2a" }} />
      </div>

      {/* Rest: horizontal scrollable list */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {projects.rest.map((p, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(`br-${i}`)}
            onMouseLeave={() => setHovered(null)}
            style={{
              padding: "20px 24px",
              borderRadius: 14,
              border: "1px solid",
              borderColor: hovered === `br-${i}` ? "#a78bfa" : "#2a2a2a",
              cursor: "pointer",
              transition: "border-color 0.25s",
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            }}
          >
            <div>
              <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#555" }}>{p.tag}</span>
              <h4 style={{ fontSize: 14, margin: "6px 0 6px", color: hovered === `br-${i}` ? "#a78bfa" : "#ccc", lineHeight: 1.4, fontWeight: 600, transition: "color 0.25s" }}>{p.title}</h4>
              <p style={{ fontSize: 12, color: "#555" }}>{p.metric}</p>
            </div>
            <div style={{ fontSize: 22, marginLeft: 12 }}>{p.emoji}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── OPTION C: Bento Grid ─── */
function OptionC() {
  const [hovered, setHovered] = useState(null);
  const accentPurple = "#7c5cbf";
  const accentLavender = "#ede9ff";

  return (
    <div style={{ fontFamily: "sans-serif", background: "#f8f7fc", padding: "60px 40px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <span style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#aaa" }}>Featured Work</span>
        <h2 style={{ fontSize: 40, fontWeight: 900, margin: "8px 0 0", color: "#111" }}>
          Things I've <span style={{ color: accentPurple, fontStyle: "italic", fontWeight: 400 }}>built.</span>
        </h2>
      </div>

      {/* Bento featured row */}
      <div style={{ display: "grid", gridTemplateColumns: "5fr 4fr", gap: 16, marginBottom: 16 }}>
        {/* Featured 1 — wide */}
        <div
          onMouseEnter={() => setHovered("c0")}
          onMouseLeave={() => setHovered(null)}
          style={{
            background: hovered === "c0" ? accentPurple : "#fff",
            borderRadius: 24,
            padding: "44px 40px",
            cursor: "pointer",
            transition: "background 0.3s",
            border: `2px solid ${hovered === "c0" ? accentPurple : "#ebe8f5"}`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: hovered === "c0" ? "rgba(255,255,255,0.6)" : accentPurple, fontWeight: 600 }}>
              NLP & UX Research · ABIM
            </span>
            <span style={{
              fontSize: 11, padding: "4px 12px", borderRadius: 20,
              background: hovered === "c0" ? "rgba(255,255,255,0.15)" : accentLavender,
              color: hovered === "c0" ? "#fff" : accentPurple
            }}>⭐ Featured</span>
          </div>
          <h3 style={{ fontSize: 26, fontWeight: 800, margin: "16px 0 14px", lineHeight: 1.25, color: hovered === "c0" ? "#fff" : "#111", transition: "color 0.3s" }}>
            Measuring Patient-Centered Communication
          </h3>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: hovered === "c0" ? "rgba(255,255,255,0.8)" : "#666", transition: "color 0.3s" }}>
            Building a scalable, rubric-grounded NLP pipeline that measures patient-centered communication behaviors across real clinical transcripts.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
            {["985 conversations", "BERT", "11 constructs"].map(m => (
              <span key={m} style={{
                fontSize: 12, padding: "5px 14px", borderRadius: 20,
                background: hovered === "c0" ? "rgba(255,255,255,0.15)" : accentLavender,
                color: hovered === "c0" ? "#fff" : accentPurple,
                transition: "all 0.3s"
              }}>{m}</span>
            ))}
          </div>
          <div style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              fontSize: 13, fontWeight: 700,
              color: hovered === "c0" ? "#fff" : accentPurple,
              transition: "color 0.3s"
            }}>View Case Study</span>
            <span style={{ fontSize: 16, color: hovered === "c0" ? "#fff" : accentPurple, transition: "color 0.3s" }}>→</span>
          </div>
        </div>

        {/* Featured 2 — right side, tall */}
        <div
          onMouseEnter={() => setHovered("c1")}
          onMouseLeave={() => setHovered(null)}
          style={{
            background: hovered === "c1" ? "#bf5c8c" : "#fff0f6",
            borderRadius: 24,
            padding: "40px 36px",
            cursor: "pointer",
            transition: "background 0.3s",
            border: `2px solid ${hovered === "c1" ? "#bf5c8c" : "#fce7f3"}`,
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: hovered === "c1" ? "rgba(255,255,255,0.6)" : "#bf5c8c", fontWeight: 600 }}>Data Science & ML</span>
              <span style={{ fontSize: 22 }}>⚕️</span>
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: "16px 0 14px", lineHeight: 1.3, color: hovered === "c1" ? "#fff" : "#111", transition: "color 0.3s" }}>
              Healthcare Bias Detection
            </h3>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: hovered === "c1" ? "rgba(255,255,255,0.8)" : "#777", transition: "color 0.3s" }}>
              ML pipelines surfacing implicit clinician bias at scale. ClinicalBERT + RoBERTa ensemble.
            </p>
          </div>
          <div style={{ marginTop: 24 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {["ClinicalBERT", "RoBERTa", "HIPAA-safe"].map(m => (
                <span key={m} style={{
                  fontSize: 11, padding: "4px 10px", borderRadius: 16,
                  background: hovered === "c1" ? "rgba(255,255,255,0.15)" : "#fce7f3",
                  color: hovered === "c1" ? "#fff" : "#bf5c8c"
                }}>{m}</span>
              ))}
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: hovered === "c1" ? "#fff" : "#bf5c8c", transition: "color 0.3s" }}>View Case Study →</span>
          </div>
        </div>
      </div>

      {/* Divider with label */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "36px 0 24px" }}>
        <div style={{ flex: 1, height: 1, background: "#e5e0f0" }} />
        <span style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#bbb" }}>More Projects</span>
        <div style={{ flex: 1, height: 1, background: "#e5e0f0" }} />
      </div>

      {/* Rest: 3-col bento compact */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {projects.rest.map((p, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(`cr-${i}`)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === `cr-${i}` ? "#111" : "#fff",
              borderRadius: 16,
              padding: "22px 22px",
              cursor: "pointer",
              transition: "background 0.25s",
              border: "1.5px solid #ebe8f5",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: hovered === `cr-${i}` ? "#666" : "#bbb" }}>{p.tag}</span>
              <span style={{ fontSize: 20 }}>{p.emoji}</span>
            </div>
            <h4 style={{ fontSize: 14, margin: "0 0 8px", color: hovered === `cr-${i}` ? "#fff" : "#111", fontWeight: 700, lineHeight: 1.4, transition: "color 0.25s" }}>{p.title}</h4>
            <p style={{ fontSize: 12, color: hovered === `cr-${i}` ? "#666" : "#999", transition: "color 0.25s" }}>{p.metric}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Tabs ─── */
export default function App() {
  const [active, setActive] = useState("A");
  const options = [
    { id: "A", label: "Option A", sub: "Editorial Split", desc: "Clean white cards, hover-fill in your purple. Featured 2-col, rest in 3-col grid." },
    { id: "B", label: "Option B", sub: "Dark Magazine", desc: "Dark background with asymmetric big/small featured cards. Dramatic & bold." },
    { id: "C", label: "Option C", sub: "Bento Grid", desc: "Lavender-tinted, asymmetric featured (5:4 split), compact bento for the rest." },
  ];

  return (
    <div style={{ fontFamily: "sans-serif", background: "#1a1a2e", minHeight: "100vh" }}>
      {/* Tab header */}
      <div style={{ padding: "28px 40px 0", display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ color: "#888", fontSize: 13, marginRight: 8 }}>Choose a layout:</span>
        {options.map(o => (
          <button
            key={o.id}
            onClick={() => setActive(o.id)}
            style={{
              padding: "10px 22px",
              borderRadius: 24,
              border: "none",
              background: active === o.id ? "#a78bfa" : "#2a2a3e",
              color: active === o.id ? "#fff" : "#888",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {o.label}: {o.sub}
          </button>
        ))}
      </div>

      {/* Description */}
      <div style={{ padding: "12px 40px 0" }}>
        {options.filter(o => o.id === active).map(o => (
          <p key={o.id} style={{ color: "#666", fontSize: 13, margin: 0 }}>{o.desc}</p>
        ))}
      </div>

      {/* Preview */}
      <div style={{ margin: "20px 40px 40px", borderRadius: 20, overflow: "hidden", border: "1px solid #2a2a3e" }}>
        {active === "A" && <OptionA />}
        {active === "B" && <OptionB />}
        {active === "C" && <OptionC />}
      </div>
    </div>
  );
}
