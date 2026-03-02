"use client";

import styles from "./BackgroundScene.module.css";

export default function BackgroundScene() {
  return (
    <div className={styles.scene} aria-hidden="true">
      <div className={styles.floor}>
        <div className={styles.grid} />
      </div>
      <div className={styles.floatingObjects}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`${styles.floatObject} ${styles[`obj${i}`]}`}>
            <div className={styles.face} />
            <div className={styles.face} />
            <div className={styles.face} />
            <div className={styles.face} />
            <div className={styles.face} />
            <div className={styles.face} />
          </div>
        ))}
      </div>
    </div>
  );
}
