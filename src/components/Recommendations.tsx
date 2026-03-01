"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import styles from "./Recommendations.module.css";

const recommendations = [
  {
    text: "Shweta was always great and had an exceptional understanding and passion for customer centricity, innovation and dedication during her time in my team. She was the only UX team member on my India team and did a great job in helping set up the UX awareness; orientation for many teams. I've always put a premium on her communication among my team members and our customers and Shweta never failed to deliver. An example was when we all had to prove ourselves on UX capability she leveraged her previous Product Engineering UX experience to create a case study for others to refer to and instill confidence in the new customers.",
    author: "Md Rehan Akhtar",
    title: "Group Engineering Manager, Global IT | John Deere India",
  },
  {
    text: "I am delighted to recommend Shweta Sharma for any UX design role or leadership opportunity. Since joining Urbanfit, Shweta has proven herself to be an exceptional cultural and strategic fit. She champions collaboration across teams, frequently jumping in to support product managers, engineers, and marketing colleagues alike. In our weekly design critiques and cross-functional planning sessions, Shweta's insights consistently elevate the conversation—whether she's refining a user journey, suggesting micro-interaction improvements, or helping the team reframe a feature from the user's perspective.",
    author: "Amol Auti",
    title: "Head Of Software Development | UrbanFit",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 120,
    },
  },
};

export default function Recommendations() {
  return (
    <section className={styles.recommendations}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.span variants={itemVariants} className="section-label">
          💬 Testimonials
        </motion.span>
        <motion.h2 variants={itemVariants} className="section-title">
          What people <span className="accent">say</span>
        </motion.h2>

        <div className={styles.grid}>
          {recommendations.map((rec, i) => (
            <motion.div
              key={rec.author}
              className={styles.card}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <Quote size={28} className={styles.quoteIcon} />
              <p className={styles.text}>{rec.text}</p>
              <div className={styles.author}>
                <div className={styles.authorAvatar}>
                  {rec.author
                    .split(" ")
                    .map((n) => n.charAt(0))
                    .join("")}
                </div>
                <div>
                  <p className={styles.authorName}>{rec.author}</p>
                  <p className={styles.authorTitle}>{rec.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
