"use client";

import { motion } from "framer-motion";
import styles from "./Hero.module.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
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

export default function Hero() {
  return (
    <section id="intro" className={styles.hero}>
      {/* Visual side - Moved 3D cube here for better layout balance */}
      <div className={styles.visual}>
        <motion.div
          className={styles.cubeContainer}
          initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
        >
          <div className={styles.cube}>
            <div className={`${styles.face} ${styles.front}`}>UX</div>
            <div className={`${styles.face} ${styles.back}`}>AI</div>
            <div className={`${styles.face} ${styles.right}`}>ML</div>
            <div className={`${styles.face} ${styles.left}`}>DS</div>
            <div className={`${styles.face} ${styles.top}`}>UXR</div>
            <div className={`${styles.face} ${styles.bottom}`}>CV</div>
          </div>

          <div className={styles.floatingTag}>
            <span>Hover to play</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className={styles.typography}>
          <motion.h1 variants={itemVariants} className={styles.line1}>
            CRAFTING
          </motion.h1>
          <motion.div variants={itemVariants} className={styles.line2}>
            <span className={styles.serif}>user</span>
          </motion.div>
          <motion.h1 variants={itemVariants} className={styles.line3}>
            EXPERIENCES
          </motion.h1>
        </div>

        <motion.div variants={itemVariants} className={styles.introCard}>
          <div className={styles.introAvatar}>
            <span>SS</span>
          </div>
          <p className={styles.introText}>
            I design experiences people actually want to use — and lately,
            I&apos;ve been teaching machines to help.
          </p>
        </motion.div>
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        className={styles.floatingDot1}
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={styles.floatingDot2}
        animate={{ y: [15, -15, 15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}
