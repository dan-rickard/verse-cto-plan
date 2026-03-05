import type { CadenceItem } from "@/types/ctoPlan";
import { WatchlistLauncher } from "./WatchlistLauncher";
import styles from "./CadenceTable.module.css";

type CadenceTableProps = {
  cadence: CadenceItem[];
  showWatchlist?: boolean;
};

export function CadenceTable({ cadence, showWatchlist = false }: CadenceTableProps) {
  return (
    <section className={styles.section} aria-labelledby="cadence-heading">
      <div className={styles.headingRow}>
        <h2 id="cadence-heading" className={styles.heading}>
          Operating rhythm
        </h2>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Cadence</th>
              <th scope="col">What</th>
              <th scope="col">Who</th>
            </tr>
          </thead>
          <tbody>
            {cadence.map((item) => (
              <tr key={item.id}>
                <td data-label="Cadence">{item.cadence}</td>
                <td data-label="What">{item.what}</td>
                <td data-label="Who">{item.who}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showWatchlist ? (
        <div className={styles.watchlistRow}>
          <WatchlistLauncher />
        </div>
      ) : null}
    </section>
  );
}
