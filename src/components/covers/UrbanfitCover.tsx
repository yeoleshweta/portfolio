import styles from "./covers.module.css";

/* A phone with a tracker ring. Three expert chips slide in and merge into one plan card,
   and a tab indicator steps across the four bottom tabs. The loop runs about six seconds. */
export function UrbanfitCover() {
  return (
    <div className={`${styles.board} ${styles.c5}`}>
      <div className={styles.visual}>
        <div className={styles.visualTop}>
          <span className={styles.kicker}>
            {"// CASE STUDY 03  ·  MOBILE APP"}
          </span>
          <span className={styles.brand}>URBANFIT–2022</span>
        </div>

        <div className={styles.uStage}>
          <div className={`${styles.uChip} ${styles.uChipCoach}`}>Coach</div>
          <div className={`${styles.uChip} ${styles.uChipDiet}`}>Dietitian</div>
          <div className={`${styles.uChip} ${styles.uChipTrack}`}>Tracker</div>

          <div className={styles.uPhone}>
            <div className={styles.uScreen}>
              <div className={styles.uHead}>
                <svg className={styles.uRing} viewBox="0 0 120 120" aria-hidden="true">
                  <circle cx="60" cy="60" r="48" className={styles.uRingTrack} />
                  <circle cx="60" cy="60" r="48" className={styles.uRingFill} />
                </svg>
                <div className={styles.uRingText}>
                  <strong>2860</strong>
                  <span>steps</span>
                </div>
              </div>
              <p className={styles.uSentence}>2860 steps walked out of 10,000</p>
              <div className={styles.uPlan}>
                <p className={styles.uPlanTitle}>My Plan</p>
                <p className={styles.uPlanRow}>Today&apos;s meals</p>
                <p className={styles.uPlanRow}>Suggested workouts</p>
              </div>
              <div className={styles.uTabs}>
                <span className={styles.uIndicator} />
                <span>Home</span>
                <span>Nutrition</span>
                <span>Profile</span>
                <span>Fitness</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.infoTop}>
          <p className={styles.badgeRow}>
            <span className={`${styles.badge} ${styles.badgeSand}`}>03</span>
            MOBILE APP · IOS AND ANDROID
          </p>
          <span className={styles.go} aria-hidden="true">
            →
          </span>
        </div>
        <h3 className={styles.title}>
          A coach, a dietitian and a <em>tracker</em>
        </h3>
        <p className={styles.meta}>68 SCREENS · 7 SHEETS · 2021 – 2022</p>
        <p className={styles.lede}>
          One mobile app that sets up a personal plan, tracks the day and connects members to paid experts.
        </p>
        <div className={styles.pills}>
          <span>Mobile app</span>
          <span>Interaction design</span>
          <span>Design system</span>
          <span>Accessibility</span>
        </div>
      </div>
    </div>
  );
}
