"use client";

import styles from "./PatternTiles.module.css";

type Tile = { name: string; before: string[]; after: string[] };

type PatternTilesProps = {
  tiles: Tile[];
};

/** Six reusable design-system patterns (§3.12). Sketch "buttons" are plain text. */
export default function PatternTiles({ tiles }: PatternTilesProps) {
  return (
    <div className={styles.grid}>
      {tiles.map((tile, i) => (
        <div key={tile.name} className={styles.tile}>
          <h3 className={styles.title}>
            {i + 1} · {tile.name}
          </h3>
          <div className={styles.pair}>
            <div className={`${styles.box} ${styles.before}`}>
              <span className={styles.boxLabel}>Before</span>
              {tile.before.map((line) => (
                <span key={line} className={styles.boxLine}>
                  {line}
                </span>
              ))}
            </div>
            <div className={`${styles.box} ${styles.after}`}>
              <span className={styles.boxLabel}>After</span>
              {tile.after.map((line) => (
                <span key={line} className={styles.boxLine}>
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
