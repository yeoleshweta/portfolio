import styles from "./covers.module.css";

export function AbimCover() {
  return (
    <div className={`${styles.board} ${styles.c4}`}>
      <div className={styles.visual}>
        <div className={styles.visualTop}>
          <span className={styles.kicker}>
            {"// CASE STUDY 05  ·  BEHAVIOR ANALYSIS MODEL"}
          </span>
          <span className={styles.brand}>ABIM–2025</span>
        </div>

        <div className={styles.c4Stage}>
          <div className={styles.c4Talk}>
            <div className={styles.c4Stack}>
              <span />
              <span />
              <div className={styles.c4Card}>
                <b className={styles.c4Clinician} />
                <b className={styles.c4Patient} />
                <em>clinician</em>
                <strong>patient</strong>
              </div>
            </div>
            <p className={styles.c4Stat}>
              <span>985</span>
              conversations
            </p>
          </div>

          <div className={styles.c4Nlp}>
            <span>NLP</span>
            <svg viewBox="0 0 72 28" aria-hidden="true">
              <path d="M4 14 H 58" />
              <path d="M48 6 L60 14 L48 22" />
            </svg>
          </div>

          <div className={styles.c4Rubric}>
            <span className={styles.c4Clip} />
            <p>rubric</p>
            <ul>
              {["Initiating", "Gathering", "Explaining", "Closing"].map((stage, i) => (
                <li key={stage} style={{ animationDelay: `${i * 0.35}s` }}>
                  <i />
                  <b />
                </li>
              ))}
            </ul>
            <p className={styles.c4Stages}>Initiating · Gathering · Explaining · Closing</p>
          </div>

          <div className={styles.c4To}>
            <svg viewBox="0 0 72 28" aria-hidden="true">
              <path d="M4 14 H 58" />
              <path d="M48 6 L60 14 L48 22" />
            </svg>
          </div>

          <div className={styles.c4Gauge}>
            <svg viewBox="0 0 180 120" aria-hidden="true">
              <path className={styles.c4Arc} d="M18 102 A 72 72 0 0 1 162 102" />
              <g className={styles.c4NeedleWrap}>
                <line className={styles.c4Needle} x1="90" y1="102" x2="148" y2="48" />
                <circle cx="90" cy="102" r="7" />
              </g>
            </svg>
            <strong>F1</strong>
            <em>score the model</em>
          </div>
        </div>

        <svg className={styles.c4Loop} viewBox="0 0 280 70" aria-hidden="true">
          <path d="M250 8 C 180 62, 90 62, 20 18" />
          <path d="M36 30 L18 16 L40 10" />
        </svg>
        <p className={styles.c4LoopLabel}>refine the framework</p>
        <span className={`${styles.spark} ${styles.c4Spark}`} />
      </div>

      <div className={styles.info}>
        <div className={styles.infoTop}>
          <p className={styles.badgeRow}>
            <span className={`${styles.badge} ${styles.badgeLav}`}>05</span>
            AI / ML RESEARCH · ABIM–2025
          </p>
          <span className={styles.go} aria-hidden="true">
            →
          </span>
        </div>
        <h3 className={styles.title}>
          From Frameworks to <em>F1 Scores</em>
        </h3>
        <p className={styles.meta}>985 CONVERSATIONS · BEHAVIOR ANALYSIS MODEL</p>
        <p className={styles.lede}>
          A rubric-grounded NLP pipeline that scores patient-centered
          communication in clinical transcripts.
        </p>
        <div className={styles.pills}>
          <span>NLP</span>
          <span>Behavioral coding</span>
          <span>Rubric design</span>
          <span>Model evaluation</span>
        </div>
      </div>
    </div>
  );
}
