"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import styles from "./WorkExperience.module.css";

const experienceData = [
  {
    company: "American Board of Internal Medicine",
    role: "Data Analyst CO-OP (Data Science)",
    location: "Philadelphia, PA",
    period: "Sep 2025 – Present",
    status: "Currently here",
    overview:
      "Working within ABIM's data science team to build NLP and machine learning systems that bring rigour and scale to how clinical communication quality is assessed. My work sits at the intersection of healthcare data, transformer models, and responsible AI — building pipelines that a medical certifying body can trust.",
    achievements: [
      {
        title: "Bias Detection at Scale",
        description:
          "ABIM needed to move beyond subjective, manual review of clinical communication for bias. I engineered a 4-label NLP classification pipeline by fine-tuning ClinicalBERT and RoBERTa on 3,500+ annotated records, replacing inconsistent human review with a structured, scalable system that classifies structural bias, clinical stigma, and diagnostic framing bias with documented confidence scores.",
      },
      {
        title: "Automating Communication Assessment",
        description:
          "Trained clinicians were manually coding doctor–patient dialogues against established frameworks (Calgary–Cambridge, NURSE, SHARE) — a process too slow for ABIM's assessment volume. I built a supervised NLP model using Label Studio for gold-standard annotation, creating a system that detects these communication behaviours automatically while meeting the evidentiary standards required for clinical audit.",
      },
      {
        title: "Making LLM Deployment Trustworthy",
        description:
          "Before ABIM could deploy large language models for internal SQL generation tasks, the team needed to know how often the models get it wrong. I developed an end-to-end evaluation framework that quantifies hallucination rates, logic errors, and schema fidelity across increasing query complexity — giving the organisation measurable confidence metrics rather than anecdotal trust.",
      },
      {
        title: "Protecting Patient Privacy by Design",
        description:
          "Real clinical data can't leave ABIM's secure environment, but ML models need training data at volume. I designed an automated synthetic data generation loop using LLMs with rigid JSON validation and rationale-based leakage detection, creating audit-friendly datasets that keep real patient information entirely out of model workflows while supporting rapid iteration.",
      },
    ],
    tags: [
      "NLP",
      "ClinicalBERT",
      "RoBERTa",
      "Python",
      "Label Studio",
      "LLM Evaluation",
      "Synthetic Data",
      "PyTorch",
    ],
  },
  {
    company: "Drexel University — College of Computing & Informatics",
    role: "Course Assistant",
    location: "Philadelphia, PA",
    period: "Sep 2025 – Present",
    status: "Currently here",
    overview:
      "Supporting graduate instruction in AI and machine learning coursework while completing my own M.S. in AI & ML. Helping students navigate core concepts in deep learning, NLP, and applied machine learning through office hours, assignment guidance, and lab support.",
    achievements: [],
    tags: ["Teaching", "AI/ML", "Deep Learning", "Graduate Studies"],
  },
  {
    company: "John Deere",
    role: "Senior Technical Lead — Research",
    location: "Pune, India",
    period: "Nov 2022 – Aug 2024",
    overview:
      "Joined as the only UX researcher on John Deere's India team and built the research practice from the ground up. Over two years, I led behavioural research and experimentation across six product teams, turning user data into the decisions that shaped enterprise product roadmaps. The role evolved from pure UX research into a hybrid position bridging research, analytics, and data-driven product strategy.",
    achievements: [
      {
        title: "Building UX Research from Zero",
        description:
          "John Deere's India team had engineering depth but no dedicated UX research capability. I established the function from scratch — creating research protocols, reference case studies, and orientation materials that built confidence across multiple engineering teams. Within six months, product teams were proactively requesting research rather than treating it as an afterthought.",
      },
      {
        title: "Experiments That Drove Launch Decisions",
        description:
          "Product teams needed evidence before committing AI-driven features to production. I designed and ran hypothesis-driven experiments — A/B tests, usability studies, multivariate analyses — that validated features used by thousands of users. These experiments directly informed go/no-go decisions within sprint cycles, replacing opinion-based arguments with data.",
      },
      {
        title: "Replacing Manual Reporting with Self-Serve Analytics",
        description:
          "Leadership and product teams needed visibility into adoption curves and feature impact, but the existing process relied on analysts manually pulling data and building slide decks — a cycle that took days. I built automated Tableau dashboards and analytics pipelines that provided real-time, self-serve access to the metrics that mattered, freeing up analyst hours for deeper work.",
      },
      {
        title: "Behavioural Patterns That Enabled Personalization",
        description:
          "Across the product portfolio, user behaviour varied significantly by role, region, and workflow. I applied segmentation and clustering techniques to surface these patterns, identifying distinct user cohorts that enabled personalization strategies and AI-assisted recommendation systems — improving engagement and task completion rates.",
      },
    ],
    tags: [
      "UX Research",
      "A/B Testing",
      "Tableau",
      "Behavioural Analytics",
      "Segmentation",
      "Figma",
      "Jira",
      "Design Systems",
    ],
  },
  {
    company: "Urbanfit Wellness Private Limited",
    role: "UI/UX Designer",
    location: "Pune, India",
    period: "Jan 2021 – Nov 2022",
    overview:
      "Owned end-to-end design across two products — the Urbanfit wellness web platform and Poshmera, a new mobile fashion app built from scratch. The work spanned research, prototyping, testing, and design system management, with direct accountability for engagement and conversion metrics.",
    achievements: [
      {
        title: "Redesigning a Wellness Platform That Wasn't Converting",
        description:
          "Urbanfit's website had strong traffic but weak engagement — high mobile bounce rates and users abandoning multi-step flows before completing them. I conducted behavioural analysis using Hotjar heatmaps and session recordings to pinpoint the exact drop-off moments, then redesigned the core flows (meal logging, membership signup) with fewer steps, smarter defaults, and clear progress indicators. The result: a 35% increase in on-page engagement, a 28% drop in mobile bounce rate, and a 2.5× lift in newsletter sign-ups.",
      },
      {
        title: "Shipping a Fashion App from Concept to 8,000 Installs",
        description:
          "Urbanfit wanted to expand into fashion with a new mobile app called Poshmera. I led the UX from research through launch over 24 weeks — interviewing 15 target shoppers, surveying 250 more, running three rounds of usability testing, and iterating through rapid prototyping cycles. The app launched to 8,000 installs in the first month (60% above the 5,000 target), earned a 4.3-star App Store rating, and achieved a 13% checkout completion rate.",
      },
      {
        title: "A Component Library That Halved Handoff Time",
        description:
          "Design-to-dev handoff was creating friction — engineers were interpreting designs inconsistently, and every new screen required custom specification. I built a modular Figma component library covering both the Urbanfit web platform and the Poshmera mobile app, with documented tokens, interaction states, and responsive rules. Design-to-dev handoff time dropped by roughly 50%, and interface consistency improved across both products.",
      },
    ],
    tags: [
      "Figma",
      "Hotjar",
      "Usability Testing",
      "React",
      "Mobile Design",
      "Component Libraries",
      "User Interviews",
    ],
  },
  {
    company: "Capita (for Arcadia Group)",
    role: "UX Personalization Designer",
    location: "Pune, India",
    period: "Jan 2018 – Oct 2022",
    overview:
      "Embedded with Qubit's London team as the personalization specialist for Arcadia Group's entire retail portfolio — seven brands (Topshop, Topman, Dorothy Perkins, Miss Selfridge, Evans, Burton, Wallis), each with distinct audiences and shopping behaviours. The work combined behavioural data analysis, conversion psychology, and UX design to create personalized shopping experiences at scale.",
    achievements: [
      {
        title: "11% Conversion Lift Through Personalization",
        description:
          "Arcadia's online experiences were generic — every visitor saw the same homepage, the same product listings, the same checkout flow regardless of how they arrived or who they were. I designed a four-layer personalization framework (campaign mirroring, behavioural triggers, recovery experiences, and segmented journeys) implemented across all seven brands through Qubit's platform. For Topshop alone, personalization drove an 11% increase in overall conversion rate.",
      },
      {
        title: "Measurement That Proved Real Impact",
        description:
          "The standard approach to measuring display campaign ROI was to count all conversions from people who saw an ad — a method that inflates results by including people who would have bought anyway. I implemented a 10% control group methodology (served blank ads, validated as statistically significant via two-tailed test) that calculated true incremental ROI, giving Arcadia's board defensible numbers rather than vanity metrics.",
      },
      {
        title: "300+ Page Migration That Cut Load Times by a Third",
        description:
          "The legacy codebase was slow, SEO-unfriendly, and difficult to maintain. I led the migration of 300+ pages to a Magento/React/Redux stack, cutting page load times by one-third and lifting SEO scores from 65 to 85 — directly improving organic traffic and discoverability across brand properties.",
      },
      {
        title: "Prototyping That Prevented Cart Abandonment",
        description:
          "Before launch, I developed storyboards, sitemaps, and high-fidelity prototypes that caught and resolved 40% of critical UI issues in review — issues that would have surfaced as friction in the live checkout flow. This contributed to a 15% reduction in cart abandonment across brand sites after launch.",
      },
    ],
    tags: [
      "Qubit",
      "Google Analytics",
      "A/B Testing",
      "Personalization",
      "Magento",
      "React",
      "Conversion Optimization",
      "Behavioural Segmentation",
    ],
  },
  {
    company: "Capita (for NEXT)",
    role: "Senior Web Designer",
    location: "Pune, India",
    period: "Jan 2018 – Oct 2022",
    overview:
      "Delivered rapid-turnaround web and email campaigns for NEXT, one of the UK's largest fashion retailers. The work was execution-heavy and fast-paced — same-day website updates, hand-coded email templates, and pixel-perfect creative production under tight deadlines.",
    achievements: [
      {
        title: "Email Campaigns That Moved the Needle",
        description:
          "NEXT needed email campaigns that performed, not just looked good. I hand-coded 20+ responsive HTML5/CSS3/jQuery templates, segmented audiences of 50,000+ in IBM Silverpop, and rigorously QA-tested across Outlook, Gmail, and mobile clients. The campaigns secured click-through rate improvements up to 18% and a 2.5% lift in conversion — strong numbers for a mature retail brand with an already-optimized email programme.",
      },
      {
        title: "Same-Day Delivery Under Pressure",
        description:
          "Retail moves fast, and NEXT's promotional calendar didn't wait. I managed the full cycle from stakeholder brief to live deployment within same-day windows — building responsive microsites, updating campaign pages, and ensuring everything was on-brand and functional before the promotion went live. This required a combination of technical speed (clean code under pressure) and design judgment (making quick decisions that held up).",
      },
      {
        title: "Visual Consistency Across Every Touchpoint",
        description:
          "I directed all visual design decisions — colour, typography, illustration, layout — ensuring brand consistency across campaigns while producing pixel-perfect creatives in Photoshop, InDesign, and Adobe XD. Every asset, from a banner ad to a landing page, met NEXT's brand standards without requiring design review cycles that the timeline didn't allow.",
      },
    ],
    tags: [
      "HTML/CSS",
      "jQuery",
      "Email Marketing",
      "Adobe XD",
      "Photoshop",
      "InDesign",
      "IBM Silverpop",
      "Responsive Design",
    ],
  },
  {
    company: "Vodafone",
    role: "Technical Executive",
    location: "Pune, India",
    period: "Jan 2016 – Jan 2018",
    overview:
      "My first role working with large-scale enterprise systems. Managed defect lifecycles in Siebel CRM across multiple product releases, building the structured analytical thinking and stakeholder communication skills that became foundational to everything that followed.",
    achievements: [
      {
        title: "Reducing Defect Recurrence Through Root-Cause Analysis",
        description:
          "Contract-change failures were recurring across releases without clear understanding of why. I performed systematic root-cause analysis on each failure pattern and applied targeted patches, reducing recurrence rates and shortening turnaround time for fixes. The approach shifted the team from reactive patching to preventive debugging.",
      },
      {
        title: "Making Technical Data Actionable for Stakeholders",
        description:
          "Engineering teams had the data but stakeholders didn't have the visibility. I built weekly bug-status dashboards in Excel and delivered trend analysis presentations that translated technical defect data into prioritisation guidance. Stakeholders could see release health at a glance and make faster, better-informed decisions about where to focus resources.",
      },
      {
        title: "Safeguarding Production Through Disciplined Validation",
        description:
          "Every patch needed validation in an Oracle Citrix environment before reaching production. I managed this validation process across releases, ensuring service-level targets were consistently met and production stability was maintained during periods of active iteration.",
      },
    ],
    tags: [
      "Siebel CRM",
      "Oracle Citrix",
      "Excel Dashboards",
      "Root-Cause Analysis",
      "Defect Management",
      "QA",
    ],
  },
  {
    company: "TomTom",
    role: "Marketing Intern",
    location: "Pune, India",
    period: "Jun 2014 – Aug 2015",
    overview:
      "My first professional role — providing defect management and technical analysis within TomTom's Siebel CRM environment. Built the foundations of structured problem-solving, stakeholder communication, and systematic quality assurance that I've carried through every role since.",
    achievements: [
      {
        title: "Building Triage Processes from Scratch",
        description:
          "Incoming defect reports didn't have a consistent triage structure. I developed a standardised triage process for incoming reports across product releases, creating a framework that helped the team prioritise effectively and reduce time-to-resolution for critical issues.",
      },
      {
        title: "Translating Technical Complexity for Decision-Makers",
        description:
          "Built reporting dashboards in Excel and delivered weekly stakeholder presentations that took raw defect data and turned it into clear prioritisation guidance. The focus was always on making technical information useful for people who needed to make business decisions, not just engineering decisions.",
      },
    ],
    tags: [
      "Siebel CRM",
      "Oracle Citrix",
      "Excel",
      "Defect Triage",
      "Stakeholder Reporting",
    ],
  },
];

const educationData = [
  {
    degree: "M.S. in Artificial Intelligence and Machine Learning",
    school: "Drexel University — College of Computing & Informatics",
    location: "Philadelphia, PA",
    year: "2024 – Mar 2026",
  },
  {
    degree: "Postgraduate Degree, Artificial Intelligence and Machine Learning",
    school: "IIT Jodhpur",
    location: "Online",
    year: "2024 – Present",
  },
  {
    degree: "Diploma in Business Management",
    school: "NMIMS — Narsee Monjee Institute of Management Studies",
    location: "Pune, India",
    year: "2020 – 2021",
  },
  {
    degree: "Bachelor of Computer Science",
    school: "G.H. Raisoni College of Engineering and Management",
    location: "Pune, India",
    year: "2010 – 2015",
  },
];

const certificationData = [
  {
    title: "Google UX Design Specialization",
    issuer: "Google",
    year: "2024",
  },
  {
    title: "Understanding Research Methods",
    issuer: "University of London (Online Course) / SOAS",
    year: "2024",
  },
  {
    title: "Journey Mapping for Users",
    issuer: "Nielsen Norman Group",
    year: "—",
  },
  {
    title: "Foundations of UX Design",
    issuer: "Google",
    year: "—",
  },
  {
    title: "Conduct UX Research and Test Early Concepts",
    issuer: "Google",
    year: "—",
  },
];

const techStack = [
  {
    category: "Data Science & ML",
    skills: [
      "Python",
      "R",
      "SQL",
      "scikit-learn",
      "TensorFlow",
      "PyTorch",
      "pandas",
      "NumPy",
      "Matplotlib",
    ],
  },
  {
    category: "NLP & LLMs",
    skills: [
      "NLP",
      "Hugging Face Transformers",
      "ClinicalBERT",
      "RoBERTa",
      "Label Studio",
      "LLM Evaluation",
    ],
  },
  {
    category: "Analytics & Experimentation",
    skills: [
      "Tableau",
      "Qualtrics",
      "Google Analytics",
      "Hotjar",
      "A/B Testing",
      "Hypothesis Testing",
      "Behavioural Segmentation",
      "Multivariate Testing",
      "Surveys",
      "Behavioral Analytics",
      "Heatmaps",
      "Session Analysis",
      "Clustering",
    ],
  },
  {
    category: "UX Research & Design",
    skills: [
      "Figma",
      "Adobe XD",
      "Illustrator",
      "Photoshop",
      "Canva",
      "Usability Testing",
      "Journey Mapping",
      "Contextual Inquiry",
      "Interviews",
      "Guerrilla Testing",
      "Diary Studies",
      "Card Sorting",
      "Affinity Mapping",
      "Synthesis",
      "Persona",
    ],
  },
  {
    category: "Frameworks & Ops",
    skills: [
      "Double Diamond",
      "HCD",
      "Design Thinking",
      "Lean UX",
      "Research Ops & Practice Building",
    ],
  },
  {
    category: "Engineering & Tools",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "HTML/CSS",
      "Framer Motion",
      "Git",
      "MongoDB",
      "Magento",
      "Dreamweaver",
      "VS Code",
    ],
  },
  {
    category: "Project Management",
    skills: ["Jira", "Agile / Scrum", "Confluence", "Stakeholder Management"],
  },
];

function ExperienceCard({ exp }: { exp: (typeof experienceData)[0] }) {
  const [expanded, setExpanded] = useState(false);
  const hasDetails =
    exp.achievements.length > 0 || (exp.tags && exp.tags.length > 0);

  return (
    <div className={styles.expCard}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.role}>{exp.role}</h3>
          <div className={styles.companyMeta}>
            <h4 className={styles.company}>{exp.company}</h4>
            <span className={styles.location}>{exp.location}</span>
          </div>
        </div>
        <div className={styles.periodBlock}>
          {exp.status && (
            <span className={styles.statusBadge}>
              <span className={styles.statusDot}></span>
              {exp.status.replace("● ", "")}
            </span>
          )}
          <span className={styles.period}>{exp.period}</span>
        </div>
      </div>

      <div className={styles.overviewBlock}>
        <p className={styles.description}>{exp.overview}</p>
      </div>

      {hasDetails && (
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.expandedContent}
            >
              {exp.achievements.length > 0 && (
                <div className={styles.achievementsBlock}>
                  {exp.achievements.map((achievement, idx) => (
                    <div key={idx} className={styles.achievementItem}>
                      <h5 className={styles.achievementTitle}>
                        {achievement.title}
                      </h5>
                      <p className={styles.achievementDesc}>
                        {achievement.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {exp.tags && exp.tags.length > 0 && (
                <div className={styles.tagsBlock}>
                  {exp.tags.map((tag, idx) => (
                    <span key={idx} className={styles.tagItem}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {hasDetails && (
        <button
          className={styles.readMoreBtn}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Read Less" : "Read More"}
          <span
            className={`${styles.chevron} ${expanded ? styles.rotated : ""}`}
          >
            ↓
          </span>
        </button>
      )}
    </div>
  );
}

export default function WorkExperience() {
  const reduceMotion = useReducedMotion() ?? false;

  const animationProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6 },
      };

  return (
    <section id="experience" className={styles.section}>
      <div className={styles.stickyContainer}>
        <div className={styles.scene}>
          {/* Intro Section */}
          <motion.div className={styles.introContainer} {...animationProps}>
            <h4 className={styles.introHeading}>
              Where I've worked — and what I shipped.
            </h4>
            <p className={styles.text}>
              6+ years across data science, UX research, and design — from
              healthcare NLP pipelines to fashion personalization at scale.
              Here's the full story.
            </p>

            <div className={styles.statsBar}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>6+</span>
                <span className={styles.statLabel}>Years of experience</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>15+</span>
                <span className={styles.statLabel}>Products shipped</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>250K+</span>
                <span className={styles.statLabel}>Users impacted</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>4</span>
                <span className={styles.statLabel}>Industries</span>
              </div>
            </div>
          </motion.div>

          {/* Experience Section */}
          <motion.div
            className={styles.experienceContainer}
            {...animationProps}
          >
            <h2 className={styles.sectionTitle}>Experience</h2>
            <div className={styles.cardsLayout}>
              {experienceData.map((exp, i) => (
                <ExperienceCard key={i} exp={exp} />
              ))}
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div className={styles.educationContainer} {...animationProps}>
            <h2 className={styles.sectionTitle}>Education</h2>
            <div className={styles.eduLayout}>
              {educationData.map((edu, i) => (
                <div key={i} className={styles.eduCard}>
                  <h3 className={styles.degree}>{edu.degree}</h3>
                  <div className={styles.schoolInfo}>
                    <div className={styles.schoolMeta}>
                      <span className={styles.school}>{edu.school}</span>
                      {edu.location && edu.location !== "Online" && (
                        <>
                          <span className={styles.metaDot}>·</span>
                          <span className={styles.location}>
                            {edu.location}
                          </span>
                        </>
                      )}
                    </div>
                    <span className={styles.year}>{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications Section */}
          <motion.div className={styles.educationContainer} {...animationProps}>
            <h2 className={styles.sectionTitle}>Certifications</h2>
            <div className={styles.certGrid}>
              {certificationData.map((cert, i) => (
                <div key={i} className={styles.certMinimalItem}>
                  <h3 className={styles.certMinimalTitle}>{cert.title}</h3>
                  <div className={styles.certMinimalMeta}>
                    <span className={styles.certMinimalIssuer}>
                      {cert.issuer}
                    </span>
                    {cert.year && cert.year !== "—" && (
                      <>
                        <span className={styles.certDot}>•</span>
                        <span className={styles.certMinimalYear}>
                          {cert.year}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack Section */}
          <motion.div className={styles.stackContainer} {...animationProps}>
            <h2 className={styles.sectionTitle}>Tech Stack</h2>
            <div className={styles.stackLayout}>
              {techStack.map((group, index) => (
                <div key={index} className={styles.stackCategoryGroup}>
                  <h3 className={styles.stackCategoryTitle}>
                    {group.category}
                  </h3>
                  <div className={styles.gridContainer}>
                    {group.skills.map((tech, i) => (
                      <motion.div
                        key={i}
                        className={styles.techBadge}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "var(--color-lilac)",
                          color: "#000",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        {tech}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
