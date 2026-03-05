import styles from "./MessageBar.module.css";

type MessageBarProps = {
  message: string;
};

export function MessageBar({ message }: MessageBarProps) {
  return (
    <section className={styles.section} aria-label="Delivery confidence">
      <h2 className={styles.heading}>One easiest path. No day-one disruption.</h2>
      <p className={styles.copy}>{message}</p>
      <div className={styles.chips}>
        <span>Operationally grounded</span>
        <span>Evidence-led</span>
        <span>Governance-ready</span>
      </div>
    </section>
  );
}
