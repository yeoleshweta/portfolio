"use client";

import StickyNote from "./doodles/StickyNote";
import styles from "./AffinityBoard.module.css";

type AffinityColumn = {
  theme: string;
  count: number;
  /** Notes column: 1.5× wider, white background, accent border. */
  wide?: boolean;
  items: string[];
};

type AffinityBoardProps = {
  columns: AffinityColumn[];
};

/** Synthesis board: 35 issues sorted into 5 themes (§3.9). */
export default function AffinityBoard({ columns }: AffinityBoardProps) {
  return (
    <div className={styles.board}>
      {columns.map((col) => (
        <section
          key={col.theme}
          className={`${styles.column}${col.wide ? ` ${styles.wide}` : ""}`}
          aria-label={`${col.theme}, ${col.count} issues`}
        >
          <h4 className={styles.heading}>
            {col.theme} <span className={styles.count}>{col.count}</span>
          </h4>
          <ul className={styles.items}>
            {col.items.map((item, i) =>
              item.startsWith("+") ? (
                <li key={item} className={styles.more}>
                  {item}
                </li>
              ) : (
                <StickyNote
                  key={item}
                  as="li"
                  size="sm"
                  rotate={i % 2 === 0 ? -1 : 1}
                  className={col.wide ? styles.notesSticky : undefined}
                >
                  {item}
                </StickyNote>
              ),
            )}
          </ul>
        </section>
      ))}
    </div>
  );
}
