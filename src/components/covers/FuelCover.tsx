import styles from "./covers.module.css";

export function FuelCover() {
  return (
    <div className={`${styles.board} ${styles.c2}`}>
      <div className={styles.visual}>
        <div className={styles.visualTop}>
          <span className={styles.kicker}>
            {"// CASE STUDY 02  ·  SYSTEM × PLATFORM"}
          </span>
          <span className={styles.brand}>JOHN DEERE</span>
        </div>

        <div className={styles.c2Stage}>
          <div className={styles.c2Tokens}>
            <div className={styles.c2Row}>
              <span className={styles.c2Button}>Button</span>
              <span className={styles.c2Toggle}>
                <span />
              </span>
            </div>
            <div className={styles.c2Radios}>
              <span className={styles.c2On} />
              <span />
              <span />
            </div>
            <div className={styles.c2TypeRow}>
              <span className={styles.c2Swatch} data-tone="lilac" />
              <span className={styles.c2Swatch} data-tone="mint" />
              <span className={styles.c2Swatch} data-tone="ink" />
              <strong>Aa</strong>
            </div>
            <p className={styles.c2Label}>Fuel components</p>
          </div>

          <div className={styles.c2Flow}>
            <span>one spec</span>
            <svg viewBox="0 0 88 36" aria-hidden="true">
              <path d="M4 28 C 28 28, 40 8, 78 12" />
              <path d="M66 4 L80 12 L68 22" />
            </svg>
          </div>

          <div className={styles.c2SurveyWrap}>
            <div className={styles.c2Sheet} />
            <div className={styles.c2Sheet} data-mid="true" />
            <div className={styles.c2Survey}>
              <span className={styles.c2Dots}>
                <i />
                <i />
                <i />
              </span>
              <span className={styles.c2Progress}>
                <b />
              </span>
              <p>
                How easy was it to find
                <br />
                what you needed?
              </p>
              <div className={styles.c2Rating}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    data-on={n === 3 ? "true" : "false"}
                    style={{ animationDelay: `${(n - 1) * 0.9}s` }}
                  >
                    {n}
                  </span>
                ))}
              </div>
              <div className={styles.c2Scale}>
                <span>very hard</span>
                <span>very easy</span>
              </div>
              <span className={styles.c2Next}>Next →</span>
            </div>
          </div>

          <div className={styles.c2Screens}>
            <span>100+ screens</span>
            <svg viewBox="0 0 72 36" aria-hidden="true">
              <path d="M64 8 C 40 6, 28 28, 8 24" />
              <path d="M18 16 L8 24 L20 28" />
            </svg>
          </div>
        </div>
        <span className={`${styles.spark} ${styles.c2Spark}`} />
        <p className={styles.caption}>survey design platform</p>
      </div>

      <div className={styles.info}>
        <div className={styles.infoTop}>
          <p className={styles.badgeRow}>
            <span className={`${styles.badge} ${styles.badgeMint}`}>02</span>
            DESIGN SYSTEMS · PRODUCT DESIGN
          </p>
          <span className={styles.go} aria-hidden="true">
            →
          </span>
        </div>
        <h3 className={styles.title}>
          Fuel Design System <em>× Survey Platform</em>
        </h3>
        <p className={styles.meta}>100+ SCREENS ON ONE SYSTEM</p>
        <p className={styles.lede}>
          A shared component system that brought 100+ John Deere screens onto
          one specification, and the survey design platform built from those
          components.
        </p>
        <div className={styles.pills}>
          <span>Design systems</span>
          <span>Component library</span>
          <span>Design tokens</span>
          <span>Survey platform</span>
        </div>
      </div>
    </div>
  );
}
