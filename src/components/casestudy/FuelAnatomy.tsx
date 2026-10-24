"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./FuelAnatomy.module.css";

export type AnatomyItem = {
  n: number;
  /** Marker centre, as a percentage of the image width. */
  x: number;
  /** Marker centre, as a percentage of the image height. */
  y: number;
  component: string;
  role: string;
  finding?: string;
};

type Props = {
  src: string;
  width: number;
  height: number;
  /** Describes the screen, not the markers. */
  alt: string;
  caption: string;
  items: AnatomyItem[];
};

/* A screenshot with numbered markers, and an ordered list that is the readable
   version. Markers are decorative; the list carries the content. */
export default function FuelAnatomy({ src, width, height, alt, caption, items }: Props) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 900px) 900px, 100vw"
          className={styles.image}
        />
        {items.map((item) => (
          <span
            key={item.n}
            aria-hidden="true"
            className={item.n === active ? `${styles.marker} ${styles.markerActive}` : styles.marker}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
          >
            {item.n}
          </span>
        ))}
      </div>
      <figcaption className={styles.caption}>{caption}</figcaption>

      <ul className={styles.list}>
        {items.map((item) => (
          <li
            key={item.n}
            className={styles.item}
            onMouseEnter={() => setActive(item.n)}
            onMouseLeave={() => setActive(null)}
          >
            <span className={styles.num}>{item.n}</span>
            <div>
              <p className={styles.component}>{item.component}</p>
              <p className={styles.role}>{item.role}</p>
              {item.finding ? <p className={styles.finding}>Answers: {item.finding}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}
