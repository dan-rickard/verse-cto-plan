import type { Ask, Risk } from "@/types/ctoPlan";
import styles from "./RisksAsksSection.module.css";

type RisksAsksSectionProps = {
  risks: Risk[];
  asks: Ask[];
  onOpenDetail: (id: string, trigger: HTMLButtonElement) => void;
};

export function RisksAsksSection({ risks, asks, onOpenDetail }: RisksAsksSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="risks-asks-heading">
      <h2 id="risks-asks-heading" className={styles.heading}>
        Risks and asks
      </h2>

      <div className={styles.columns}>
        <div className={styles.column}>
          <h3 className={styles.columnHeading}>Top risks</h3>
          <div className={styles.stack}>
            {risks.map((risk) => (
              <article key={risk.id} className={styles.card}>
                <p className={styles.severity}>{risk.severity}</p>
                <h4 className={styles.title}>{risk.title}</h4>
                <p className={styles.summary}>{risk.summary}</p>
                <button
                  type="button"
                  className={styles.detailButton}
                  onClick={(event) => onOpenDetail(risk.id, event.currentTarget)}
                  aria-label={`View details for ${risk.title}`}
                >
                  View details
                </button>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnHeading}>Top asks</h3>
          <div className={styles.stack}>
            {asks.map((ask) => (
              <article key={ask.id} className={styles.card}>
                <h4 className={styles.title}>{ask.title}</h4>
                <p className={styles.summary}>{ask.why}</p>
                <p className={styles.decider}>Who decides: {ask.decider}</p>
                <button
                  type="button"
                  className={styles.detailButton}
                  onClick={(event) => onOpenDetail(ask.id, event.currentTarget)}
                  aria-label={`View details for ${ask.title}`}
                >
                  View details
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
