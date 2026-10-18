"use client";

import StickyNote from "./doodles/StickyNote";
import SketchArrow from "./doodles/SketchArrow";
import styles from "./ProcessDiagram.module.css";

type ProcessStep = { label: string; sublabel: string };

type ProcessDiagramProps = {
  /** Exactly 3: pinned over Discovery, Delivery, Measure. */
  stickies: string[];
  /** Exactly 3: Discovery, Delivery, Measure. */
  steps: ProcessStep[];
  loopLabel: string;
};

const SHAPE_CLASS = ["diamond1", "diamond2", "measure"] as const;

/**
 * Where the study sat in the discover/define/develop/deliver process (§3.5).
 * An <ol> so the order survives regardless of layout; connectors are
 * decorative only.
 */
export default function ProcessDiagram({
  stickies,
  steps,
  loopLabel,
}: ProcessDiagramProps) {
  return (
    <div className={styles.wrap}>
      <ol className={styles.steps}>
        {steps.map((step, i) => (
          <li key={step.label} className={styles.step}>
            <StickyNote rotate={i % 2 === 0 ? -1.5 : 1.5} className={styles.sticky}>
              {stickies[i]}
            </StickyNote>
            <div className={`${styles.shape} ${styles[SHAPE_CLASS[i]]}`}>
              <span className={styles.shapeLabel}>{step.label}</span>
              <span className={styles.shapeSublabel}>{step.sublabel}</span>
            </div>
            {i < steps.length - 1 ? (
              <SketchArrow
                direction="down"
                tone="accent"
                className={styles.stepArrow}
              />
            ) : null}
          </li>
        ))}
      </ol>
      <p className={styles.loop}>{loopLabel}</p>
    </div>
  );
}
