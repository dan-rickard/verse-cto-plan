import styles from "./ImageBreakSection.module.css";

export function ImageBreakSection() {
  return (
    <section className={styles.section} aria-hidden="true">
      <div className={styles.media} />
    </section>
  );
}
