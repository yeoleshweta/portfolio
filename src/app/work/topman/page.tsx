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

function StudentPricingVisual() {
  const [studentPricesActive, setStudentPricesActive] = React.useState(false);

  const products = [
    { name: "Classic Harrington Jacket", original: 50, student: 45 },
    { name: "Slim Fit Stretch Chinos", original: 35, student: 31.5 },
    { name: "Premium Wool Blend Overcoat", original: 120, student: 108 },
  ];

  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "40px", borderRadius: "16px", margin: "32px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--color-border)", paddingBottom: "16px", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h4 style={{ margin: "4px 0 0 0", fontSize: "16px", fontWeight: 700 }}>Student Pricing Toggle</h4>
        </div>
        <button
          onClick={() => setStudentPricesActive(!studentPricesActive)}
          style={{
            padding: "8px 16px",
            background: studentPricesActive ? "var(--color-accent)" : "transparent",
            color: studentPricesActive ? "#fff" : "var(--color-text)",
            border: "1px solid " + (studentPricesActive ? "var(--color-accent)" : "var(--color-text)"),
            borderRadius: "20px",
            fontWeight: 600,
            fontSize: "13px",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
        >
          {studentPricesActive ? "Student Prices: Active (10% off)" : "Enable Student Prices"}
        </button>
      </div>

      {/* Mock Product Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        {products.map((p, i) => (
          <div key={i} style={{ border: "1px solid var(--color-border)", borderRadius: "8px", overflow: "hidden", background: "var(--color-bg)" }}>
            <div style={{ height: "120px", background: "rgba(0,0,0,0.02)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7" y2="7"></line></svg>
            </div>
            <div style={{ padding: "16px" }}>
              <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-text)" }}>{p.name}</div>
              <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
                {studentPricesActive ? (
                  <>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-accent)" }}>£{p.student.toFixed(2)}</span>
                    <span style={{ fontSize: "13px", color: "var(--color-text-secondary)", textDecoration: "line-through" }}>£{p.original.toFixed(2)}</span>
                  </>
                ) : (
                  <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text)" }}>£{p.original.toFixed(2)}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "24px", lineHeight: "1.5", margin: "24px 0 0 0" }}>
        A Student Prices toggle in the header. When activated, the student price versions instantly render. This persists across both the product listing page and the product details page, framing the whole journey with the discount.
      </p>
    </div>
  );
}

function GeoBehavioralVisual() {
  const [activeCity, setActiveCity] = React.useState("New York");

  const cities = {
    "New York": [
      { name: "Winter Wool Coat", desc: "Top added to bag product in New York" },
      { name: "Black Leather Boots", desc: "Popular local trend" },
      { name: "Chelsea Trenchcoat", desc: "High conversion rating" },
    ],
    "LA": [
      { name: "Linen Short Sleeve Shirt", desc: "Top added to bag product in LA" },
      { name: "Retro Wayfarer Sunglasses", desc: "Popular local trend" },
      { name: "Beach Swim Shorts", desc: "High conversion rating" },
    ],
    "Atlanta": [
      { name: "Peach Tone Polo Shirt", desc: "Top added to bag product in Atlanta" },
      { name: "Light Wash Denim Jacket", desc: "Popular local trend" },
      { name: "Canvas Low Top Sneakers", desc: "High conversion rating" },
    ],
    "Houston": [
      { name: "Cotton Utility Vest", desc: "Top added to bag product in Houston" },
      { name: "Wide Brim Straw Hat", desc: "Popular local trend" },
      { name: "Light Cargo Shorts", desc: "High conversion rating" },
    ],
    "Chicago": [
      { name: "Windbreaker Pullover", desc: "Top added to bag product in Chicago" },
      { name: "Thermolite Knit Scarf", desc: "Popular local trend" },
      { name: "High Top Leather Sneakers", desc: "High conversion rating" },
    ]
  };

  const trending = cities[activeCity as keyof typeof cities];

  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "40px", borderRadius: "16px", margin: "32px 0" }}>
      <h4 style={{ margin: "4px 0 16px 0", fontSize: "16px", fontWeight: 700 }}>Geo Behavioral Merchandising</h4>
      
      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--color-border)", paddingBottom: "12px", marginBottom: "24px", overflowX: "auto" }}>
        {Object.keys(cities).map((name) => {
          const isActive = activeCity === name;
          return (
            <button
              key={name}
              onClick={() => setActiveCity(name)}
              style={{
                padding: "8px 16px",
                border: "none",
                background: isActive ? "var(--color-text)" : "transparent",
                color: isActive ? "var(--color-surface)" : "var(--color-text-secondary)",
                borderRadius: "20px",
                fontWeight: isActive ? 700 : 500,
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              {name}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        {trending.map((t, i) => (
          <div key={i} style={{ border: "1px solid var(--color-border)", borderRadius: "8px", overflow: "hidden", background: "var(--color-bg)", padding: "20px" }}>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "var(--color-accent)", fontWeight: 700 }}>#{i+1} Trending</span>
            <h5 style={{ margin: "8px 0 4px 0", fontSize: "15px", fontWeight: 700 }}>{t.name}</h5>
            <p style={{ margin: 0, fontSize: "12.5px", color: "var(--color-text-secondary)", lineHeight: "1.4" }}>{t.desc}</p>
          </div>
        ))}
      </div>

      <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "24px", lineHeight: "1.5", margin: "24px 0 0 0" }}>
        IP lookup checks the location, serving a carousel of the most added to bag products from the user&apos;s region. It replaces the generic, one size fits all product display, ranking products prioritized by local popularity.
      </p>
    </div>
  );
}

export default function TopmanCaseStudy() {
  return (
    <main>
      <CaseStudyHero
        title="Why Were Students Not Saving? Segment Aware Personalization at Topman"
        category="Segmentation · Personalization Governance"
        role="Personalization Specialist"
        team="Capita · Qubit ecosystem: Topman"
        timeline="Personalization Lifecycle"
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
            From a hidden discount to board level strategy, how segment signals that the data could already see became visible and useful experiences, governed by simplicity and a business case per deployment.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
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
              <p style={{ margin: "4px 0 0 0", fontWeight: 600, fontSize: "15px" }}>Capita · Topman</p>
            </div>
            <div>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 700, letterSpacing: "0.05em" }}>Methods</span>
              <p style={{ margin: "4px 0 0 0", fontWeight: 600, fontSize: "15px" }}>Segment analytics, rule based logic, merchandising</p>
            </div>
            <div>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 700, letterSpacing: "0.05em" }}>Outcome</span>
              <p style={{ margin: "4px 0 0 0", fontWeight: 600, fontSize: "15px", color: "var(--color-accent)" }}>Segmented 50% of UK sales</p>
            </div>
          </div>

          <h3 style={{ fontSize: "20px", fontWeight: 700, marginTop: "40px", marginBottom: "16px" }}>Making the data&apos;s segments visible in the experience</h3>
          <p>
            Topman&apos;s data kept describing audiences that its website refused to acknowledge. Students, one of the brand&apos;s most important demographics who were entitled to a 10% discount, had to hunt to make the system know who they were. Regional customers browsed a product list ranked for a national average that described nobody. The challenge was not finding data; it was getting that data to show up in the web, become visible and useful experiences, and doing it with a discipline the board could trust.
          </p>
          <p style={{ marginTop: "16px" }}>
            At Capita and Qubit, we designed, tested, and scaled segment personalization delivered through Qubit&apos;s platform, under a program philosophy of simplicity and business cases behind every deployed experience.
          </p>
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 01: THE TENSION                     */}
        {/* ============================================ */}
        <CaseStudySection
          id="tension"
          heading="01: The Tension"
        >
          <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>Three gaps between what the data knew and what the experience showed</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>1: The offer nobody saw</h4>
              <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                The student discount excited a 10% usage, meaningful for the demographic, but availability was hiding at the end of the journey, far after the conversion choice. The offer did little work in the moment of browsing, when it could actually influence. The ecommerce team was glad to see it and correct it.
              </p>
            </div>
            <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "24px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>2: A national site for regional tastes</h4>
              <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                Product performance showed strong geographic patterns: certain products rank indexed in certain cities. The product display ignored all of it, serving one national average for everyone. The average described the typical user; the regional intent was going unused.
              </p>
            </div>
            <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "24px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>3: The legacy mindset</h4>
              <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                Personalization was a buzzword, meaning it was organizational fat. Personalization stalls when it is treated as an abstract capability. The program&apos;s code governance kept personalization focused on concrete, size tested treatments, so that personalization stayed legible to customers and credible to the board.
              </p>
            </div>
          </div>

          <Blockquote text="The data already knew who was shopping. The experience just kept acting as if it was day one, and every user was a discount unclaimed and a relevant product unranked." />
        </CaseStudySection>

        {/* ============================================ */}
        {/* SECTION: 02: THE CRAFT                       */}
        {/* ============================================ */}
        <CaseStudySection
          id="craft"
          heading="02: The Craft"
        >
          <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>Building segment aware experiences</h3>
          <p>
            Four layers, each converting a known segment signal into a visible experience without adding lag to page loads. Try the two live prototypes below.
          </p>

          <StudentPricingVisual />

          <GeoBehavioralVisual />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px", marginTop: "32px" }}>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "24px", borderRadius: "12px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>3: Momentum & Orientation</h4>
              <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginTop: "8px", lineHeight: "1.5" }}>
                Supporting new visitors. Banners explaining urgency on product pages, and welcome popups greeting first time visitors.
              </p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "24px", borderRadius: "12px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>4: Experience Governance</h4>
              <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginTop: "8px", lineHeight: "1.5" }}>
                Simplicity and a business case per experience. Every treatment was built individually, with no personalization for its own sake, keeping results readable enough to be discussed at board level.
              </p>
            </div>
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
            The student toggle is a deliberate design choice: user controlled personalization. Rather than inferring who might be a student, which is a fragile and assumptions heavy approach, we let users identify themselves with one tap, then rewarded that identification instantly. Price is a sensitive surface: transparency beats inference on sensitive surfaces.
          </p>
          <p style={{ marginTop: "16px" }}>
            The geo-merchandising relied on fresh behavioral data, not static assumptions: aggregate clicks over the trailing 24 hours of local shopping activity, so trending in Chicago was a statement of fact about yesterday, not a merchandiser&apos;s guess about the region.
          </p>
          <p style={{ marginTop: "16px" }}>
            Each experience had to pass the governance check: a control holdout, a clear discount mechanic, a measurable outcome, a discipline that kept things simple enough to scale and credible enough for the board.
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
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "var(--color-accent)" }}>50%</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>of UK sales segmented at peak, the personalization experiences contributing to this share.</p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid var(--color-accent)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "var(--color-accent)" }}>Instant</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>student price feedback delivered in session without a reload, unifying checkout and retail experience.</p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid var(--color-accent)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "var(--color-accent)" }}>5 cities</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>behavioral geo-merchandising: metro-level trends replacing the national average ranking.</p>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "12px", borderTop: "3px solid var(--color-accent)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 700, color: "var(--color-accent)" }}>Board level</div>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>strategic standing: personalization discussed at board level, integrated directly into the brand&apos;s growth strategy.</p>
            </div>
          </div>

          <Blockquote text="The key has been to keep things simple and build a business case for each and every experience we want to deploy." />
          <div style={{ textAlign: "right", marginTop: "-16px", marginBottom: "32px", fontSize: "14px", color: "var(--color-text-secondary)", fontFamily: "JetBrains Mono, monospace" }}>
            — Gareth Rees-John, Digital Director, Topman
          </div>

          <div style={{ borderTop: "2px solid var(--color-text)", marginTop: "48px", paddingTop: "40px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>Key learnings</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Let users direct personalization</h4>
                <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                  Price is a sensitive surface: price control is the best segmentation. Rather than guessing, a simple self selection toggle is direct, respectful, and visually rewarding. Personalization under control beats that personalization done to the user. Make them feel in charge.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Behavioral beats demographic</h4>
                <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                  The national best seller list describes nobody. Disaggregating by metro level rankings on the trailing 24 hours of local activity keeps the merchandising relevant, reflective of regional trends, and highly converting.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Governance is a feature</h4>
                <p style={{ margin: "8px 0 0 0", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                  The control holdout should not be the bureaucracy; it should be the quality control. It forced every idea to state its mechanism and its metric before launch, which is why the program built long term credibility instead of accumulating clutter. Simplicity scales; complexity collapses.
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
            Segment personalization within the Arcadia Group ecosystem. Proprietary metrics generalized for confidentiality.
          </div>
        </CaseStudySection>
      </CaseStudyLayout>
    </main>
  );
}
