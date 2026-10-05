"use client";

import Image from "next/image";
import BeeTrail, { BEE_PATHS } from "./BeeTrail";
import Figure from "./Figure";
import styles from "./BeforeAfter.module.css";

type Shot = {
  img: string;
  alt: string;
  title: string;
  text: string;
};

type BeforeAfterProps = {
  caption: string;
  before: Shot;
  after: Shot;
};

export default function BeforeAfter({ caption, before, after }: BeforeAfterProps) {
  return (
    <Figure caption={caption}>
      <BeeTrail
        {...BEE_PATHS.beforeAfter}
        arrow={BEE_PATHS.beforeAfter.arrow}
        label="Bee flying from before screenshot to after screenshot"
      />
      <div className={styles.grid}>
        <ShotColumn shot={before} variant="before" />
        <ShotColumn shot={after} variant="after" />
      </div>
    </Figure>
  );
}

function ShotColumn({
  shot,
  variant,
}: {
  shot: Shot;
  variant: "before" | "after";
}) {
  return (
    <div className={styles.col}>
      <div className={`${styles.frame} ${styles.hasImage}`}>
        <Image
          src={shot.img}
          alt={shot.alt}
          width={1600}
          height={1000}
          className={styles.img}
          sizes="(max-width: 768px) 100vw, 420px"
        />
      </div>
      <div className={styles.meta}>
        <span
          className={`${styles.swatch} ${variant === "before" ? styles.prev : styles.current}`}
        />
        <h3 className={styles.title}>{shot.title}</h3>
      </div>
      <p className={styles.text}>{shot.text}</p>
    </div>
  );
}
