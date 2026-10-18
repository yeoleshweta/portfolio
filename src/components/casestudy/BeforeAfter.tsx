"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import BeeTrail, { BEE_PATHS } from "./BeeTrail";
import Figure from "./Figure";
import HandNote from "./doodles/HandNote";
import styles from "./BeforeAfter.module.css";

type Shot = {
  img: string;
  alt: string;
  title: string;
  text: string;
  width?: number;
  height?: number;
};

type BeforeAfterProps = {
  caption: string;
  before: Shot;
  after: Shot;
  /** Hand-written aside under the before image, e.g. a participant quote. */
  beforeNote?: ReactNode;
  /** Hand-written aside under the after image. */
  afterNote?: ReactNode;
};

export default function BeforeAfter({
  caption,
  before,
  after,
  beforeNote,
  afterNote,
}: BeforeAfterProps) {
  return (
    <Figure caption={caption}>
      <BeeTrail
        {...BEE_PATHS.beforeAfter}
        arrow={BEE_PATHS.beforeAfter.arrow}
        label="Bee flying from before screenshot to after screenshot"
      />
      <div className={styles.grid}>
        <ShotColumn shot={before} variant="before" note={beforeNote} />
        <ShotColumn shot={after} variant="after" note={afterNote} />
      </div>
    </Figure>
  );
}

function ShotColumn({
  shot,
  variant,
  note,
}: {
  shot: Shot;
  variant: "before" | "after";
  note?: ReactNode;
}) {
  return (
    <div className={styles.col}>
      <div className={`${styles.frame} ${styles.hasImage}`}>
        <Image
          src={shot.img}
          alt={shot.alt}
          width={shot.width ?? 1600}
          height={shot.height ?? 1000}
          className={styles.img}
          sizes="(min-width: 1100px) 50vw, 100vw"
        />
      </div>
      <div className={styles.meta}>
        <span
          className={`${styles.swatch} ${variant === "before" ? styles.prev : styles.current}`}
        />
        <h3 className={styles.title}>{shot.title}</h3>
      </div>
      <p className={styles.text}>{shot.text}</p>
      {note ? (
        <HandNote rotate={variant === "before" ? -1.5 : 1.5} className={styles.note}>
          {note}
        </HandNote>
      ) : null}
    </div>
  );
}
