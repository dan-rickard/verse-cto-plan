import type { Outcome } from "@/types/ctoPlan";
import styles from "./NorthStarHeader.module.css";

type NorthStarHeaderProps = {
  planTitle: string;
  oneLineThesis: string;
  outcomes: Outcome[];
};

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

      <div className={styles.outcomeBlock}>
        <h2 className={styles.outcomeHeading}>Day-90 outcomes</h2>
        <ol className={styles.outcomeList}>
          {outcomes.map((outcome) => (
            <li key={outcome.id} className={styles.outcomeItem} data-testid="outcome-item">
              {outcome.text}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
