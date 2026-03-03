import styles from "./MessageBar.module.css";

type MessageBarProps = {
  message: string;
};

export function MessageBar({ message }: MessageBarProps) {
  return (
    <section className={styles.section} aria-label="Closing message">
      <p className={styles.copy}>{message}</p>
    </section>
  );
}
