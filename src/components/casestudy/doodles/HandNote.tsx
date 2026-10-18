"use client";

import type { ElementType, ReactNode } from "react";
import styles from "./doodles.module.css";

type HandNoteProps = {
  children: ReactNode;
  rotate?: number;
  as?: "p" | "span";
  className?: string;
};

function clampRotate(rotate: number) {
  return Math.min(3, Math.max(-3, rotate));
}

/**
 * A hand-written-style aside. Real text (never aria-hidden) — if it only
 * repeats nearby text, wrap it in a hidden span at the call site instead.
 */
export default function HandNote({
  children,
  rotate = -1.5,
  as = "p",
  className,
}: HandNoteProps) {
  const Tag = as as ElementType;

  return (
    <Tag
      className={`${styles.handNote}${className ? ` ${className}` : ""}`}
      style={{ transform: `rotate(${clampRotate(rotate)}deg)` }}
    >
      {children}
    </Tag>
  );
}
