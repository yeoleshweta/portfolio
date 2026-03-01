"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import styles from "./Projects.module.css";

const projects = [
  {
    title: "Product Managers with UX & Design Thinking",
    category: "Design & Research",
    description:
      "Bridging the gap between product management and user-centered design through hands-on workshops and collaborative frameworks.",
    link: "https://shwetasharma.tech/work/designthinkingproject",
    color: "#7C5CFC",
  },
  {
    title: "Survey Design Platform",
    category: "Enterprise UX Platform",
    description:
      "Internal enterprise tool for building and deploying user research surveys with advanced logic and analytics.",
    link: "https://shwetasharma.tech/work/surveytooldesign",
    color: "#10B981",
  },
  {
    title: "Stories By Children",
    category: "Portfolio & Agency",
    description:
      "A creative platform empowering children to share their stories through an intuitive, playful digital experience.",
    link: "https://shweta.framer.ai/work/storiesbychildren",
    color: "#F59E0B",
  },
  {
    title: "Urbanfit Wellness",
    category: "Research & Design",
    description:
      "End-to-end redesign of a wellness platform driving 35% engagement increase and 28% drop in mobile bounce rate.",
    link: "https://shwetasharma.framer.website/work/lyne-copy",
    color: "#EF4444",
  },
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
  hidden: { opacity: 0, y: 30 },
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

export default function Projects() {
  return (
    <section id="work" className={styles.projects}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.span variants={itemVariants} className="section-label">
          ◈ Work
        </motion.span>
        <motion.h2 variants={itemVariants} className="section-title">
          Selected <span className="accent">projects</span>
        </motion.h2>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div
                className={styles.thumbnail}
                style={{
                  background: `linear-gradient(135deg, ${project.color}11, ${project.color}22)`,
                }}
              >
                <div
                  className={styles.thumbInner}
                  style={{ borderColor: `${project.color}44` }}
                >
                  <span
                    style={{
                      color: project.color,
                      fontSize: "2rem",
                      fontWeight: 700,
                    }}
                  >
                    {project.title.charAt(0)}
                  </span>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                  <span
                    className={styles.badge}
                    style={{
                      background: `${project.color}12`,
                      color: project.color,
                    }}
                  >
                    {project.category}
                  </span>
                  <ArrowUpRight size={20} className={styles.arrow} />
                </div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
