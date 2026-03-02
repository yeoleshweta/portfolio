"use client";

import { motion } from "framer-motion";
import styles from "./WorkExperience.module.css";

export default function WorkExperience() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.p
          className={styles.text}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          My 6 year long design journey began with mastering visual design,
          creating high-impact campaigns, expressive UI, and motion/3D work for
          brands like <span className={styles.highlight}>Myntra-Jabong</span>{" "}
          and <span className={styles.highlight}>Cult.fit</span>. Over time,
          that visual craft evolved into product thinking. In my recent role as
          a Product Designer at <span className={styles.highlight}>Navi</span>,
          I applied it to streamline fintech journeys for millions.
        </motion.p>
      </div>
    </section>
  );
}
