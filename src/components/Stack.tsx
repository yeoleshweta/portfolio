"use client";

import { motion } from "framer-motion";
import styles from "./Stack.module.css";

const tools = [
  { name: "Figma", desc: "Design", color: "#F24E1E" },
  { name: "Python", desc: "Programming", color: "#3776AB" },
  { name: "JavaScript", desc: "Programming", color: "#F7DF1E" },
  { name: "PyTorch", desc: "ML Framework", color: "#EE4C2C" },
  { name: "NumPy", desc: "Data Library", color: "#013243" },
  { name: "Matplotlib", desc: "Visualization", color: "#11557C" },
  { name: "MySQL", desc: "Database", color: "#4479A1" },
  { name: "Git", desc: "Version Control", color: "#F05032" },
  { name: "Photoshop", desc: "Design", color: "#31A8FF" },
  { name: "Illustrator", desc: "Design", color: "#FF9A00" },
  { name: "Adobe XD", desc: "Prototyping", color: "#FF61F6" },
  { name: "Canva", desc: "Design", color: "#00C4CC" },
  { name: "VS Code", desc: "IDE", color: "#007ACC" },
  { name: "Jira", desc: "Project Mgmt", color: "#0052CC" },
  { name: "Magento", desc: "E-commerce", color: "#EE672F" },
  { name: "Dreamweaver", desc: "Web Dev", color: "#35FA00" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 120,
    },
  },
};

export default function Stack() {
  const doubled = [...tools, ...tools];

  return (
    <section id="stack" className={styles.stack}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className={styles.header}>
          <motion.span variants={itemVariants} className="section-label">
            ⚡ Stack
          </motion.span>
          <motion.h2 variants={itemVariants} className="section-title">
            Tools &amp; <span className="accent">technologies</span>
          </motion.h2>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.marqueeWrapper}>
          <div className={styles.marquee}>
            {doubled.map((tool, i) => (
              <div key={`${tool.name}-${i}`} className={styles.toolCard}>
                <div
                  className={styles.toolIcon}
                  style={{ background: `${tool.color}15`, color: tool.color }}
                >
                  <span className={styles.toolInitial}>
                    {tool.name.charAt(0)}
                  </span>
                </div>
                <div className={styles.toolInfo}>
                  <span className={styles.toolName}>{tool.name}</span>
                  <span className={styles.toolDesc}>{tool.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.marqueeWrapper}>
          <div className={`${styles.marquee} ${styles.marqueeReverse}`}>
            {[...doubled].reverse().map((tool, i) => (
              <div key={`${tool.name}-r-${i}`} className={styles.toolCard}>
                <div
                  className={styles.toolIcon}
                  style={{ background: `${tool.color}15`, color: tool.color }}
                >
                  <span className={styles.toolInitial}>
                    {tool.name.charAt(0)}
                  </span>
                </div>
                <div className={styles.toolInfo}>
                  <span className={styles.toolName}>{tool.name}</span>
                  <span className={styles.toolDesc}>{tool.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
