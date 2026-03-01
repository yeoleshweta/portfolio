"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import styles from "./Education.module.css";

const education = [
  {
    degree:
      "Master of Computer Sciences in Artificial Intelligence and Machine Learning",
    institution: "Drexel University, College of Computing & Informatics",
    period: "2024 – 2026",
    location: "Philadelphia, US",
  },
  {
    degree: "Diploma in Business Management",
    institution: "SVKM's Narsee Monjee Institute of Management Studies (NMIMS)",
    period: "2020 – 2021",
    location: "Pune, IN",
  },
  {
    degree: "Bachelor of Computer Science",
    institution: "G.H Raisoni College of Engineering and Management",
    period: "2010 – 2015",
    location: "Pune, IN",
  },
];

const certifications = [
  { name: "Google UX Design Specialization", issuer: "Google" },
  { name: "Understanding Research Methods", issuer: "University of London" },
  { name: "Journey Mapping for Users", issuer: "Nielsen Norman Group" },
  { name: "Foundations of User Experience (UX) Design", issuer: "Google" },
  { name: "Conduct UX Research and Test Early Concepts", issuer: "Google" },
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

export default function Education() {
  return (
    <section id="education" className={styles.education}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.span variants={itemVariants} className="section-label">
          🎓 Education
        </motion.span>
        <motion.h2 variants={itemVariants} className="section-title">
          Education &amp; <span className="accent">certifications</span>
        </motion.h2>

        <div className={styles.grid}>
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              className={styles.card}
              variants={itemVariants}
            >
              <div className={styles.icon}>
                <GraduationCap size={22} />
              </div>
              <h3 className={styles.degree}>{edu.degree}</h3>
              <p className={styles.institution}>{edu.institution}</p>
              <div className={styles.cardMeta}>
                <span>
                  <Calendar size={13} />
                  {edu.period}
                </span>
                <span>
                  <MapPin size={13} />
                  {edu.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div className={styles.certSection} variants={itemVariants}>
          <h3 className={styles.certTitle}>Certifications</h3>
          <div className={styles.certGrid}>
            {certifications.map((cert) => (
              <motion.div
                key={cert.name}
                className={styles.certCard}
                whileHover={{
                  y: -4,
                  backgroundColor: "rgba(124, 92, 252, 0.05)",
                }}
              >
                <span className={styles.certName}>{cert.name}</span>
                <span className={styles.certIssuer}>{cert.issuer}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
