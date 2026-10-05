"use client";

import type { ReactNode } from "react";
import styles from "./Figure.module.css";

type FigureProps = {
  caption?: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

export default function Figure({
  caption,
  children,
  className,
  ariaLabel,
}: FigureProps) {
  return (
    <figure
      className={`${styles.figure}${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel}
    >
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
      <div className={styles.body}>{children}</div>
    </figure>
  );
}
