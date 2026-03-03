import type { Metric } from "@/types/ctoPlan";
import styles from "./ScoreboardStrip.module.css";

type ScoreboardStripProps = {
  metrics: Metric[];
};

export function ScoreboardStrip({ metrics }: ScoreboardStripProps) {
  return (
    <section className={styles.section} aria-labelledby="scoreboard-heading">
      <div className={styles.headingRow}>
        <h2 id="scoreboard-heading" className={styles.heading}>
          Scoreboard
        </h2>
        <p className={styles.subtitle}>4 key indicators to show if the plan is working.</p>
      </div>

      <div className={styles.grid}>
        {metrics.map((metric) => (
          <article key={metric.id} className={styles.card} data-testid="metric-card">
            <h3 className={styles.metric}>{metric.metric}</h3>
            <p className={styles.target}>
              <span>Target:</span> {metric.target}
            </p>
            <p className={styles.measure}>
              <span>How measured:</span> {metric.measuredBy}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
