"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, ArrowUpRight } from "lucide-react";
import styles from "./Contact.module.css";

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

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className={styles.contact}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.span variants={itemVariants} className="section-label">
          📬 Contact
        </motion.span>
        <motion.h2 variants={itemVariants} className="section-title">
          Let&apos;s <span className="accent">talk</span>
        </motion.h2>
        <motion.p variants={itemVariants} className={styles.subtitle}>
          Have a project in mind, a question, or just want to connect? Drop me a
          line.
        </motion.p>

        <div className={styles.grid}>
          {/* Contact info */}
          <motion.div className={styles.info} variants={itemVariants}>
            <a
              href="mailto:shwetayeolesharma@gmail.com"
              className={styles.infoCard}
            >
              <div className={styles.infoIcon}>
                <Mail size={20} />
              </div>
              <div>
                <p className={styles.infoLabel}>Email</p>
                <p className={styles.infoValue}>shwetayeolesharma@gmail.com</p>
              </div>
              <ArrowUpRight size={16} className={styles.infoArrow} />
            </a>
            <a
              href="https://github.com/yeoleshweta"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.infoCard}
            >
              <div className={styles.infoIcon}>
                <Github size={20} />
              </div>
              <div>
                <p className={styles.infoLabel}>GitHub</p>
                <p className={styles.infoValue}>yeoleshweta</p>
              </div>
              <ArrowUpRight size={16} className={styles.infoArrow} />
            </a>
            <a
              href="https://www.linkedin.com/in/sharmashweta08"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.infoCard}
            >
              <div className={styles.infoIcon}>
                <Linkedin size={20} />
              </div>
              <div>
                <p className={styles.infoLabel}>LinkedIn</p>
                <p className={styles.infoValue}>sharmashweta08</p>
              </div>
              <ArrowUpRight size={16} className={styles.infoArrow} />
            </a>
          </motion.div>

          {/* Contact form */}
          <motion.form
            className={styles.form}
            variants={itemVariants}
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `mailto:shwetayeolesharma@gmail.com?subject=Portfolio Contact from ${form.name}&body=${form.message}%0A%0AFrom: ${form.email}`;
            }}
          >
            <div className={styles.fieldGroup}>
              <label htmlFor="contact-name" className={styles.label}>
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                className={styles.input}
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="contact-email" className={styles.label}>
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                className={styles.input}
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="contact-message" className={styles.label}>
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                className={styles.textarea}
                placeholder="Tell me about your project..."
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className={styles.submitBtn}>
              <Send size={16} />
              Send Message
            </button>
          </motion.form>
        </div>

        {/* Footer */}
        <motion.div variants={itemVariants} className={styles.footer}>
          <p>© {new Date().getFullYear()} Shweta Sharma. Built with ♥</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
