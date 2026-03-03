import type { EarlyWin } from "@/types/ctoPlan";
import styles from "./EarlyWinsSection.module.css";

type EarlyWinsSectionProps = {
  wins: EarlyWin[];
  onOpenDetail: (id: string, trigger: HTMLButtonElement) => void;
};

export function EarlyWinsSection({ wins, onOpenDetail }: EarlyWinsSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="early-wins-heading">
      <div className={styles.headingRow}>
        <h2 id="early-wins-heading" className={styles.heading}>
          Early wins (first 2-3 weeks)
        </h2>
        <p className={styles.subtitle}>Quick outcomes the team can feel immediately.</p>
      </div>

      <div className={styles.grid}>
        {wins.map((win) => (
          <article key={win.id} className={styles.card}>
            <p className={styles.impact}>{win.impact}</p>
            <h3 className={styles.title}>{win.title}</h3>
            <p className={styles.summary}>{win.summary}</p>
            <button
              type="button"
              className={styles.detailButton}
              onClick={(event) => onOpenDetail(win.id, event.currentTarget)}
              aria-label={`View details for ${win.title}`}
            >
              View details
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
