import type { Metric } from "@/types/ctoPlan";
import styles from "./ScoreboardStrip.module.css";

type ScoreboardStripProps = {
  metrics: Metric[];
};

function compact(text: string, max = 96) {
  return text.length > max ? `${text.slice(0, max - 1).trim()}...` : text;
}

export function ScoreboardStrip({ metrics }: ScoreboardStripProps) {
  return (
    <section className={styles.section} aria-labelledby="scoreboard-heading">
      <div className={styles.headingRow}>
        <h2 id="scoreboard-heading" className={styles.heading}>
          Scoreboard
        </h2>
        <p className={styles.subtitle}>4 indicators that prove confidence and delivery.</p>
      </div>

      <div className={styles.grid}>
        {metrics.map((metric) => (
          <article key={metric.id} className={styles.card} data-testid="metric-card">
            <h3 className={styles.metric}>{metric.metric}</h3>
            <p className={styles.label}>Signal</p>
            <p className={styles.copy}>{compact(metric.target)}</p>
            <p className={styles.label}>Proof</p>
            <p className={styles.copy}>{compact(metric.measuredBy)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
