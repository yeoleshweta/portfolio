"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMotionOff } from "@/components/MotionControl";
import styles from "./AboutSection.module.css";

const photos = [
  { src: "/assets/SelfImages/IMG_5383.jpg", alt: "Shweta holding a white and grey cat" },
  {
    src: "/assets/SelfImages/IMG_6857.jpg",
    alt: "Shweta standing in front of a large floral mural",
  },
  {
    src: "/assets/SelfImages/IMG_9702.jpg",
    alt: "Shweta at the Grace Hopper Celebration 2025",
  },
  {
    src: "/assets/SelfImages/af88938a-795e-4ee4-b92f-435eb48be0af.jpg",
    alt: "Shweta on a ski slope in a helmet, holding skis",
  },
  {
    src: "/assets/SelfImages/IMG_9547_2.jpg",
    alt: "Shweta posing on a staircase covered in colorful murals",
  },
  {
    src: "/assets/SelfImages/IMG_8208.jpg",
    alt: "Shweta looking through binoculars from a ship bridge",
  },
  {
    src: "/assets/SelfImages/IMG_8783.jpg",
    alt: "Shweta holding a Philadelphia Labor Day race medal",
  },
] as const;

export default function AboutSection() {
  const motionOff = useMotionOff();

  return (
    <section id="outside" className={styles.section}>
      <motion.div
        className={styles.inner}
        initial={motionOff ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: motionOff ? 0 : 0.4, ease: "easeOut" }}
      >
        <h2 className={styles.title}>
          When I&apos;m not{" "}
          <span className={styles.italic}>researching</span>
        </h2>
        <p className={styles.description}>
          I work hard and then I go find something that has nothing to do with
          work. Slopes, cities, finish lines, ship decks — whatever gets me out
          of my head and into the world.
        </p>
        <ul className={styles.grid}>
          {photos.map((photo) => (
            <li key={photo.src} className={styles.cell}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={styles.photo}
              />
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
