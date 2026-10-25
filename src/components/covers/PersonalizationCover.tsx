import styles from "./covers.module.css";

const BARS = [42, 54, 78, 100] as const;

export function PersonalizationCover() {
  return (
    <div className={`${styles.board} ${styles.c3}`}>
      <div className={styles.visual}>
        <div className={styles.visualTop}>
          <span className={styles.kicker}>
            {"// CASE STUDY 04  ·  QUANTITATIVE ANALYSIS"}
          </span>
          <span className={styles.brand}>TOPSHOP</span>
        </div>

        <div className={styles.c3Stage}>
          <div className={styles.c3Exit}>
            <svg viewBox="0 0 280 220" aria-hidden="true">
              <path d="M38 198 H 250" />
              <path d="M52 198 V 62 H 118 V 198" />
              <path d="M118 62 Q 86 28 52 62" />
              <circle cx="96" cy="128" r="5" />
              <text x="62" y="52">
                EXIT
              </text>
              <circle cx="168" cy="86" r="16" />
              <line x1="168" y1="102" x2="168" y2="150" />
              <line x1="168" y1="118" x2="148" y2="140" />
              <line x1="168" y1="118" x2="186" y2="136" />
              <line x1="168" y1="150" x2="156" y2="188" />
              <line x1="168" y1="150" x2="182" y2="188" />
              <rect className={styles.c3Bag} x="186" y="124" width="22" height="26" rx="4" />
              <line x1="197" y1="124" x2="197" y2="116" />
              <path d="M190 116 Q 197 108 204 116" />
            </svg>
            <div className={styles.c3Bubble}>why are you leaving?</div>
            <p className={styles.c3Cap}>exit intercepts</p>
          </div>

          <span className={styles.c3Plus}>+</span>

          <div className={styles.c3Chart}>
            <svg viewBox="0 0 260 220" aria-hidden="true">
              <line x1="28" y1="18" x2="28" y2="176" />
              <line x1="28" y1="176" x2="236" y2="176" />
              {BARS.map((h, i) => {
                const x = 48 + i * 46;
                const y = 176 - h * 1.28;
                return (
                  <rect
                    key={h}
                    className={i === 3 ? styles.c3BarHi : i === 2 ? styles.c3BarMid : styles.c3Bar}
                    x={x}
                    y={y}
                    width="32"
                    height={h * 1.28}
                    style={{ animationDelay: `${i * 0.18}s` }}
                  />
                );
              })}
              <path className={styles.c3Cursor} d="M148 92 L148 118 L160 114 L170 140 L176 138 L164 110 L178 108 Z" />
            </svg>
            <div className={styles.c3Callout}>
              <span>conversion</span>
              <strong>+5.8%</strong>
            </div>
            <p className={styles.c3Cap}>behavioral data</p>
          </div>
        </div>
        <span className={`${styles.spark} ${styles.c3Spark}`} />
      </div>

      <div className={styles.info}>
        <div className={styles.infoTop}>
          <p className={styles.badgeRow}>
            <span className={`${styles.badge} ${styles.badgePink}`}>04</span>
            QUANTITATIVE / EXPERIMENTATION
          </p>
          <span className={styles.go} aria-hidden="true">
            →
          </span>
        </div>
        <h3 className={styles.title}>
          Topshop: What Analytics <em>Couldn&apos;t Tell Us</em>
        </h3>
        <p className={styles.meta}>+5.8% CONVERSION</p>
        <p className={styles.lede}>
          Pairing exit intercepts with behavioral data to learn why shoppers
          left, turning those answers into a 5.8% conversion lift.
        </p>
        <div className={styles.pills}>
          <span>Exit intercepts</span>
          <span>Behavioral analytics</span>
          <span>Experimentation</span>
          <span>E-commerce</span>
        </div>
      </div>
    </div>
  );
}
