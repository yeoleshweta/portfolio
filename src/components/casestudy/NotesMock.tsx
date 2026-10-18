"use client";

import styles from "./NotesMock.module.css";

type NotesMockProps = {
  label: string;
  shipped: {
    title: string;
    appBar: string;
    paragraph: string;
    viewAllLabel: string;
    chips: string[];
  };
  recommended: {
    title: string;
    cards: { author: string; body: string }[];
    showFullLabel: string;
    sidePanel: { title: string; text: string; closeLabel: string };
    chips: string[];
  };
};

/**
 * Notes, as shipped vs. the recommended pattern (§3.10). Illustrative mock;
 * every "button" is a plain <span> — nothing here is interactive.
 */
export default function NotesMock({ label, shipped, recommended }: NotesMockProps) {
  return (
    <div className={styles.wrap}>
      <p className={styles.label}>{label}</p>
      <div className={styles.panels}>
        <div className={`${styles.panel} ${styles.shipped}`}>
          <p className={styles.panelTitle}>{shipped.title}</p>
          <div className={styles.window}>
            <div className={styles.bar}>{shipped.appBar}</div>
            <div className={styles.tabs}>
              <span className={styles.tab}>Involved Parties</span>
              <span className={styles.tab}>Agreement</span>
              <span className={styles.tab}>Status History</span>
              <span className={`${styles.tab} ${styles.tabOn}`}>Comments</span>
            </div>
            <div className={styles.shippedBody}>
              <p className={styles.runOn}>{shipped.paragraph}</p>
              <span className={styles.fakeButton}>{shipped.viewAllLabel}</span>
            </div>
          </div>
          <div className={styles.chips}>
            {shipped.chips.map((c) => (
              <span key={c} className={styles.chip}>
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className={`${styles.panel} ${styles.recommended}`}>
          <p className={styles.panelTitle}>{recommended.title}</p>
          <div className={styles.window}>
            <div className={styles.bar}>{shipped.appBar}</div>
            <div className={styles.tabs}>
              <span className={styles.tab}>Involved Parties</span>
              <span className={styles.tab}>Agreement</span>
              <span className={styles.tab}>Status History</span>
              <span className={`${styles.tab} ${styles.tabOn}`}>Comments</span>
            </div>
            <div className={styles.recBody}>
              <div className={styles.cards}>
                {recommended.cards.map((card) => (
                  <div key={card.author} className={styles.card}>
                    <span className={styles.cardAuthor}>{card.author}</span>
                    <p className={styles.cardBody}>{card.body}</p>
                  </div>
                ))}
                <span className={styles.fakeButton}>{recommended.showFullLabel}</span>
              </div>
              <div className={styles.side}>
                <span className={styles.sideLabel}>{recommended.sidePanel.title}</span>
                <p className={styles.sideText}>{recommended.sidePanel.text}</p>
                <span className={styles.fakeButton}>{recommended.sidePanel.closeLabel}</span>
              </div>
            </div>
          </div>
          <div className={styles.chips}>
            {recommended.chips.map((c) => (
              <span key={c} className={`${styles.chip} ${styles.chipAccent}`}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
