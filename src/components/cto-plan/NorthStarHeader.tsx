import type { Outcome } from "@/types/ctoPlan";
import styles from "./NorthStarHeader.module.css";

type NorthStarHeaderProps = {
  planTitle: string;
  oneLineThesis: string;
  outcomes: Outcome[];
};

const outcomeTitles = ["Workflow visibility", "Data integrity", "Secure operations"];

function compactOutcome(text: string) {
  const [lead] = text.split(" - ");
  return lead;
}

export function NorthStarHeader({
  planTitle,
  oneLineThesis,
  outcomes,
}: NorthStarHeaderProps) {
  return (
    <section className={styles.section} aria-labelledby="north-star-heading">
      <p className={styles.kicker}>North star header</p>
      <h1 id="north-star-heading" className={styles.title}>
        {planTitle}
      </h1>
      <p className={styles.thesis}>{oneLineThesis}</p>

      <div className={styles.confidenceRow} aria-label="Confidence signals">
        <span>Business depth</span>
        <span>Delivery rhythm</span>
        <span>Operational control</span>
      </div>

      <div className={styles.outcomeBlock}>
        <h2 className={styles.outcomeHeading}>Day-90 outcomes at a glance</h2>
        <ol className={styles.outcomeList}>
          {outcomes.map((outcome, index) => (
            <li key={outcome.id} className={styles.outcomeItem} data-testid="outcome-item">
              <p className={styles.outcomeMeta}>Outcome 0{index + 1}</p>
              <h3 className={styles.outcomeTitle}>{outcomeTitles[index] ?? `Outcome ${index + 1}`}</h3>
              <p className={styles.outcomeCopy}>{compactOutcome(outcome.text)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
