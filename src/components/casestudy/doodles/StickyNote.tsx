"use client";

import type { ReactNode } from "react";
import styles from "./doodles.module.css";

type StickyNoteProps = {
  children: ReactNode;
  rotate?: number;
  size?: "sm" | "md";
  className?: string;
  /** Render as <li> when the parent is a <ul> (default: <div>). */
  as?: "div" | "li";
};

function clampRotate(rotate: number) {
  return Math.min(2, Math.max(-2, rotate));
}

export default function StickyNote({
  children,
  rotate = 0,
  size = "md",
  className,
  as = "div",
}: StickyNoteProps) {
  const Tag = as;
  const sizeClass = size === "sm" ? styles.stickySm : styles.stickyMd;

  return (
    <Tag
      className={`${styles.stickyNote} ${sizeClass}${className ? ` ${className}` : ""}`}
      style={{ transform: `rotate(${clampRotate(rotate)}deg)` }}
    >
      {children}
    </Tag>
  );
}
