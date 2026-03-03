import type { TimelinePhase } from "@/types/ctoPlan";
import styles from "./TimelineSection.module.css";

type TimelineSectionProps = {
  phases: TimelinePhase[];
  onOpenDetail: (id: string, trigger: HTMLButtonElement) => void;
};

export function TimelineSection({ phases, onOpenDetail }: TimelineSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="timeline-heading">
      <div className={styles.headingRow}>
        <h2 id="timeline-heading" className={styles.heading}>
          30/60/90 timeline
        </h2>
        <p className={styles.subtitle}>Assertions first. Details live in the drawer.</p>
      </div>

      <div className={styles.grid}>
        {phases.map((phase) => (
          <article key={phase.id} className={styles.card}>
            <p className={styles.range}>{phase.range}</p>
            <h3 className={styles.title}>{phase.title}</h3>
            <p className={styles.assertion}>{phase.assertion}</p>

            <ul className={styles.focusList}>
              {phase.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <button
              type="button"
              className={styles.detailButton}
              onClick={(event) => onOpenDetail(phase.id, event.currentTarget)}
              aria-label={`View details for ${phase.range}: ${phase.title}`}
            >
              View details
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
