"use client";

/**
 * PhasedShowcase — steps a coded product mock through a fixed set of states,
 * with sticky notes explaining each one.
 *
 * Owns the shared behaviour: numbered step buttons, autoplay that starts once
 * the block scrolls into view, Pause / Play / Replay, a polite status for
 * screen readers, and no autoplay under prefers-reduced-motion. The caller
 * renders the mock for the current phase.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import StickyNote from "@/components/casestudy/doodles/StickyNote";
import styles from "./PhasedShowcase.module.css";

export type ShowcasePhase = { id: string; label: string; notes: string[] };

// Long enough for the mock's own entry animation plus reading two short notes.
const STEP_MS = 4000;
const NOTE_TILT = [-1.5, 1];

export default function PhasedShowcase<P extends ShowcasePhase>({
  phases,
  label,
  children,
}: {
  phases: P[];
  /** Accessible name for the group of step buttons. */
  label: string;
  /** Renders the mock for the current phase. */
  children: (phase: P) => ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const last = phases.length - 1;
  const phase = phases[index];

  // Start autoplay the first time the block is mostly on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPlaying(true);
        io.disconnect();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (index >= last) setPlaying(false);
      else setIndex(index + 1);
    }, STEP_MS);
    return () => window.clearTimeout(timer);
  }, [playing, index, last]);

  const choose = (i: number) => {
    setPlaying(false);
    setIndex(i);
  };

  const togglePlay = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (index >= last) setIndex(0);
    setPlaying(true);
  };

  const atEnd = index >= last;
  const playLabel = playing ? "Pause" : atEnd ? "Replay" : "Play";

  return (
    <div className={styles.showcase} ref={rootRef}>
      <div className={styles.controls}>
        <div className={styles.steps} role="group" aria-label={label}>
          {phases.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={styles.step}
              aria-pressed={i === index}
              onClick={() => choose(i)}
            >
              <span className={styles.stepNum} aria-hidden="true">{i + 1}</span>
              {p.label}
            </button>
          ))}
        </div>
        <button type="button" className={styles.play} onClick={togglePlay}>
          <span aria-hidden="true">{playing ? "❚❚" : atEnd ? "↺" : "▶"}</span> {playLabel}
        </button>
      </div>

      <p className="sr-only" aria-live="polite">Showing: {phase.label}</p>

      <div className={styles.stage}>
        <div className={styles.mock}>{children(phase)}</div>

        <ul className={styles.notes} key={phase.id}>
          {phase.notes.map((note, i) => (
            <li key={note} className={styles.noteIn} style={{ animationDelay: `${i * 150}ms` }}>
              <StickyNote size="sm" rotate={NOTE_TILT[i % NOTE_TILT.length]}>{note}</StickyNote>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
