import styles from "./MessageBar.module.css";

type MessageBarProps = {
  message: string;
};

export function MessageBar({ message }: MessageBarProps) {
  return (
    <section className={styles.section} aria-label="Delivery confidence">
      <p className={styles.kicker}>Delivery confidence</p>
      <h2 className={styles.heading}>Understands the business. Protects delivery. Ships measurable change.</h2>
      <p className={styles.copy}>{message}</p>
      <div className={styles.chips}>
        <span>Operationally grounded</span>
        <span>Execution-first</span>
        <span>Governance-ready</span>
      </div>
    </section>
  );
}
