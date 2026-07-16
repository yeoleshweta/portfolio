"use client";

import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import { CaseStudySection, Blockquote } from "@/components/casestudy/CaseStudyContent";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "tension", label: "01: The Tension" },
  { id: "craft", label: "02: The Craft" },
  { id: "implementation", label: "03: Rigorous Execution" },
  { id: "evidence", label: "04: Measuring the Lift" },
];

function WeatherPersonalizationDemo() {
  const [weather, setWeather] = React.useState("sunny");
  const [framing, setFraming] = React.useState("data");

  const options = {
    sunny: {
      temp: "24°C",
      condition: "SUNNY",
      bg: "linear-gradient(135deg, #fef08a 0%, #fde047 100%)",
      color: "#854d0e",
      data: {
        text: "Made for a day like today. Short sleeves and lightweight chinos, just a click away.",
        cta: "Shop sunglasses"
      },
      brand: {
        text: "Sunny intervals? B Prepared with our summer wardrobe collection.",
        cta: "Shop summer collection"
      },
      aspiration: {
        text: "Chase the sun. Discover fresh, breezy linen styles for warm afternoons.",
        cta: "Explore sunglasses"
      }
    },
    rain: {
      temp: "11°C",
      condition: "RAIN",
      bg: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
      color: "#334155",
      data: {
        text: "Made for a day like today. Double breasted trenches and waterproof jackets, just a click away.",
        cta: "Shop raincoats"
      },
      brand: {
        text: "Rainy intervals? B Prepared with our water repellent collection.",
        cta: "Shop rainwear"
      },
      aspiration: {
        text: "Chase the rain. Discover heavy knit sweaters and protective layers for damp afternoons.",
        cta: "Explore rainwear"
      }
    }
  };

  const current = options[weather as keyof typeof options];
  const content = current[framing as "data" | "brand" | "aspiration"];

  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "40px", borderRadius: "16px", margin: "32px 0" }}>
      <div style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "16px", marginBottom: "24px" }}>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Interactive Prototype</span>
        <h4 style={{ margin: "4px 0 0 0", fontSize: "16px", fontWeight: 700 }}>Weather & Geolocation Homepage Tile</h4>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginBottom: "24px" }}>
        {/* Weather Selector */}
        <div style={{ flex: 1, minWidth: "160px" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-text-secondary)", textTransform: "uppercase" }}>1: Current Weather</span>
          <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
            <button
              onClick={() => setWeather("sunny")}
              style={{
                flex: 1,
                padding: "8px 12px",
                border: "none",
                background: weather === "sunny" ? "var(--color-text)" : "rgba(0,0,0,0.04)",
                color: weather === "sunny" ? "var(--color-surface)" : "var(--color-text)",
                borderRadius: "20px",
                fontWeight: 600,
                fontSize: "12.5px",
                cursor: "pointer"
              }}
            >
              Sunny · 24°C
            </button>
            <button
              onClick={() => setWeather("rain")}
              style={{
                flex: 1,
                padding: "8px 12px",
                border: "none",
                background: weather === "rain" ? "var(--color-text)" : "rgba(0,0,0,0.04)",
                color: weather === "rain" ? "var(--color-surface)" : "var(--color-text)",
                borderRadius: "20px",
                fontWeight: 600,
                fontSize: "12.5px",
                cursor: "pointer"
              }}
            >
              Rain · 11°C
            </button>
          </div>
        </div>

        {/* Framing Selector */}
        <div style={{ flex: 1.5, minWidth: "220px" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-text-secondary)", textTransform: "uppercase" }}>2: Creative Framing</span>
          <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
            {[
              { id: "data", label: "Data-led" },
              { id: "brand", label: "Brand-led" },
              { id: "aspiration", label: "Aspiration-led" }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFraming(f.id)}
                style={{
                  padding: "8px 14px",
                  border: "none",
                  background: framing === f.id ? "var(--color-text)" : "rgba(0,0,0,0.04)",
                  color: framing === f.id ? "var(--color-surface)" : "var(--color-text)",
                  borderRadius: "20px",
                  fontWeight: 600,
                  fontSize: "12.5px",
                  cursor: "pointer"
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mock Homepage Tile */}
      <div style={{ border: "1px solid var(--color-border)", borderRadius: "12px", overflow: "hidden", background: "var(--color-bg)" }}>
        <div style={{ padding: "16px 24px", background: current.bg, color: current.color, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 800, fontSize: "13px", fontFamily: "JetBrains Mono, monospace" }}>
            BURTON RETAILER
          </div>
          <div style={{ fontWeight: 800, fontSize: "12px", fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase" }}>
            LONDON · {current.temp} · {current.condition}
          </div>
        </div>
        <div style={{ padding: "32px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "var(--color-text)", maxWidth: "500px", lineHeight: "1.5" }}>
            {content.text}
          </p>
          <button style={{ marginTop: "20px", padding: "10px 24px", background: "var(--color-text)", color: "var(--color-surface)", border: "none", borderRadius: "4px", fontWeight: 700, fontSize: "13.5px", cursor: "pointer" }}>
            {content.cta}
          </button>
        </div>
      </div>

      <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "24px", lineHeight: "1.5", margin: "24px 0 0 0" }}>
        Illustrative reconstructions: not actual Burton UI. City and temperature shown are examples of the live local render based on IP geolocation and real time weather APIs.
      </p>
    </div>
  );
}

export default function BurtonCaseStudy() {
  return (
    <main>
      <CaseStudyHero
        title="Should the homepage check the forecast? Weather and geolocation at Burton"
        category="Contextual Data Integration"
        role="Personalization Specialist"
        team="Capita · Qubit ecosystem: Burton"
        timeline="Integration Lifecycle"
      />

      <CaseStudyLayout sections={sections}>
        {/* ============================================ */}
        {/* SECTION: OVERVIEW                            */}
        {/* ============================================ */}
        <CaseStudySection
          id="overview"
          heading="Overview"
        >
          <p>
            Real-time local weather joined to visitor geolocation, expressed as one contained homepage mechanic, and tested to an 11.6% conversion uplift across all users.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "24px",
            background: "var(--color-surface)",
            padding: "32px",
            borderRadius: "16px",
            border: "1px solid var(--color-border)",
            margin: "32px 0"
          }}>
            <div>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 700, letterSpacing: "0.05em" }}>Role</span>
              <p style={{ margin: "4px 0 0 0", fontWeight: 600, fontSize: "15px" }}>Personalization Specialist</p>
            </div>
            <div>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 700, letterSpacing: "0.05em" }}>Team</span>
              <p style={{ margin: "4px 0 0 0", fontWeight: 600, fontSize: "15px" }}>Capita · Burton</p>
            </div>
            <div>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 700, letterSpacing: "0.05em" }}>Methods</span>
              <p style={{ margin: "4px 0 0 0", fontWeight: 600, fontSize: "15px" }}>External data integration, dynamic design, lifecycle rotation</p>
            </div>
            <div>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 700, letterSpacing: "0.05em" }}>Outcome</span>
              <p style={{ margin: "4px 0 0 0", fontWeight: 600, fontSize: "15px", color: "var(--color-accent)" }}>11.6% conversion lift</p>
            </div>
          </div>

          <h3 style={{ fontSize: "20px", fontWeight: 700, marginTop: "40px", marginBottom: "16px" }}>Making the site aware of the visitor&apos;s actual moment</h3>
          <p>
            Every physical Burton store adjusts to the world outside. Window displays change with the seasons, raincoats emerge for the showers, and sweaters dominate number one spots. Yet digital store windows remained blind to the storm. The project asked a simple integration question: what if the homepage checked the forecast? It answered it by creating a data driven local weather joined to visitor geolocation, driving an 11.6% conversion uplift.
          </p>
          <p style={{ marginTop: "16px" }}>
            Embedded in the Arcadia ecosystem, I worked on contextual experiences under the program&apos;s simplicity philosophy: one contained mechanic, real data, a clean test.
          </p>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 01: THE TENSION                     */}
        {/* ============================================ */}
        <CaseStudySection
          id="tension"
          heading="01: The Tension"
        >
          <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>Three gaps between retail instinct and digital experience</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>1: Context blindness</h4>
              <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                Digital stores expect users to run telling about their moment. Customers respond to weather in predictable, commercially meaningful ways: rain sells umbrellas, and warm weather calls for t-shirts, but commerce systems ignore the context. Without context, a storm is an opportunity lost. An obvious reference signal unused.
              </p>
            </div>
            <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "24px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>2: The data lived outside</h4>
              <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                This was not a collection problem: no surveys, no new tracking. Weather data existed externally; visitor location existed internally via IP geolocation. The entire opportunity was an integration task: data join, dynamic key direction, and the freshness to make the join meaningful.
              </p>
            </div>
            <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "24px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>3: The gimmick risk</h4>
              <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                Contextual personalization fails when it is clever instead of useful. The counter-design is a contained mechanic: a single homepage tile, genuinely useful, routing a weather appropriate product range. It worked because the code was restricted to one place, with a number, not a demo.
              </p>
            </div>
          </div>

          <Blockquote text="The brand's oldest retail instinct — dress the window for the weather — was missing from its biggest store. The fix wasn't more data about the customer; it was better use of data about their world." />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 02: THE CRAFT                       */}
        {/* ============================================ */}
        <CaseStudySection
          id="craft"
          heading="02: The Craft"
        >
          <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>Building the weather-aware experience</h3>
          <p>
            From data join to storewindow logic. Try the demo change the visitor&apos;s local weather, then switch between the three creative framings the tile rotated.
          </p>

          <WeatherPersonalizationDemo />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px", marginTop: "32px" }}>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "24px", borderRadius: "12px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Signal Integration</h4>
              <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginTop: "8px", lineHeight: "1.5" }}>
                IP geolocation maps connection parameters to locate the user in-session, which is then paired dynamically with external weather API data representing temperature and rainfall.
              </p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "24px", borderRadius: "12px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Freshness Governance</h4>
              <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginTop: "8px", lineHeight: "1.5" }}>
                Data freshness is the quality bar. Live API checks ensure local alignment, preventing outdated conditions or inaccurate geography from breaking relevance.
              </p>
            </div>
          </div>

          <Blockquote text="Our number one store is our website. Our number two store is our mobile site." />
          <div style={{ textAlign: "right", marginTop: "-16px", marginBottom: "32px", fontSize: "14px", color: "var(--color-text-secondary)", fontFamily: "JetBrains Mono, monospace" }}>
            — Richard Wilson, Digital Director, Burton
          </div>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 03: RIGOROUS EXECUTION              */}
        {/* ============================================ */}
        <CaseStudySection
          id="implementation"
          heading="03: Rigorous Execution"
        >
          <p>
            The experience ran as a test, and the result was decisive: an 11.6% conversion uplift across all users. For a single contained homepage mechanic, that is an unusually large return, and we trust it because contextual relevance on the highest traffic surface moves the entire funnel behind it.
          </p>
          <p style={{ marginTop: "16px" }}>
            The integration joined standard package components, rather than each city&apos;s weather and temperature warm decoration: it was proof of freshness. A stale join (yesterday&apos;s weather, or a city index 200 miles away) underperforms a real-time localized match. Freshness and join accuracy were the quality bars.
          </p>
          <p style={{ marginTop: "16px" }}>
            And the mechanics honored the program&apos;s simplicity discipline: one tile, three creatives, one measurable outcome. No sitewide over-architecture, no speculative complexity, the simplest possible expression of the idea, tested properly.
          </p>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 04: MEASURING THE LIFT              */}
        {/* ============================================ */}
        <CaseStudySection
          id="evidence"
          heading="04: Measuring the Lift"
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "24px", margin: "24px 0" }}>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid var(--color-accent)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "var(--color-accent)" }}>11.6%</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>conversion lift: across all users, from the weather-matching tile on the homepage.</p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid var(--color-accent)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "var(--color-accent)" }}>Real-time</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>weather join: local weather and temperature joined in IP-geolocation.</p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid var(--color-accent)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "var(--color-accent)" }}>3</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>creative framings: rotated data-led (local weather), brand-led (B Prepared), and aspiration-led (photography).</p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid var(--color-accent)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "var(--color-accent)" }}>No. 1 store</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>the surface: deployed on the website, the brand&apos;s highest-volume 'store,' with no sitewide clutter.</p>
            </div>
          </div>

          <div style={{ borderTop: "2px solid var(--color-text)", marginTop: "48px", paddingTop: "40px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>Key learnings</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Context is a dataset</h4>
                <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                  Personalization in this project was not collect more data from all users; it was the world around them, joined to them. Merging first party location logic with external APIs created a powerful, useful experience out of what was already there. What else are we missing that is already in the browser?
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>The shop window principle</h4>
                <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                  You should not personalize the content for a century, display changes with weather, season, and street. Digital contextual relevance is not a gimmick; it is the oldest merchandising instinct. Simple, targeted interventions that change key elements are what makes a site feel alive, not algorithmic soul dressing.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Contain the mechanic</h4>
                <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                  Keeping the code to one homepage tile made everything else possible: a clean test, a safe launch. Restricting execution to one high impact surface is how you find the signal in the noise: the best experiments are the ones whose surface area matches its questions.
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "64px",
              padding: "24px",
              background: "rgba(0,0,0,0.015)",
              borderRadius: "8px",
              border: "1px solid var(--color-border)",
              fontSize: "13px",
              color: "var(--color-text-secondary)",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            Contextual personalization within the Arcadia Group ecosystem for Burton. Proprietary metrics generalized for confidentiality.
          </div>
        </CaseStudySection>
      </CaseStudyLayout>
    </main>
  );
}
