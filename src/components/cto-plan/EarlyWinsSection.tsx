"use client";

import { useMemo, useState } from "react";
import type { EarlyWin } from "@/types/ctoPlan";
import styles from "./EarlyWinsSection.module.css";

type EarlyWinsSectionProps = {
  wins: EarlyWin[];
};

const visualSignals: Record<string, Array<{ label: string; score: number }>> = {
  "win-1": [
    { label: "Visibility", score: 96 },
    { label: "Confidence", score: 91 },
    { label: "Throughput", score: 72 },
  ],
  "win-2": [
    { label: "Revenue trust", score: 94 },
    { label: "Ownership", score: 88 },
    { label: "Manual effort", score: 66 },
  ],
  "win-3": [
    { label: "Time saved", score: 86 },
    { label: "Compliance evidence", score: 93 },
    { label: "Adviser adoption", score: 74 },
  ],
  "win-4": [
    { label: "Reliability", score: 89 },
    { label: "Risk reduction", score: 92 },
    { label: "Detection speed", score: 81 },
  ],
};

export function EarlyWinsSection({ wins }: EarlyWinsSectionProps) {
  const defaultWinId = wins[0]?.id ?? "";
  const [activeWinId, setActiveWinId] = useState(defaultWinId);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const activeWin = useMemo(
    () => wins.find((win) => win.id === activeWinId) ?? wins[0],
    [activeWinId, wins],
  );

  if (!activeWin) {
    return null;
  }

  const signalSet = visualSignals[activeWin.id] ?? [];

  return (
    <section className={styles.section} aria-labelledby="early-wins-heading">
      <div className={styles.headingRow}>
        <h2 id="early-wins-heading" className={styles.heading}>
          Daily-friction removers (first 30 days)
        </h2>
        <p className={styles.subtitle}>Use this section to punctuate concrete wins, not to repeat the script.</p>
      </div>

      <div className={styles.filterRow} role="tablist" aria-label="Quick wins">
        {wins.map((win) => {
          const isActive = win.id === activeWin.id;
          return (
            <button
              key={win.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.filterButton} ${isActive ? styles.filterButtonActive : ""}`}
              onClick={() => {
                setActiveWinId(win.id);
                setDetailsOpen(false);
              }}
            >
              {win.title}
            </button>
          );
        })}
      </div>

      <article className={styles.visualCard}>
        <div className={styles.visualGlow} aria-hidden="true" />

        <p className={styles.impact}>{activeWin.impact}</p>
        <h3 className={styles.title}>{activeWin.title}</h3>
        <p className={styles.summary}>{activeWin.summary}</p>
        <p className={styles.presenterNote}>Talk track carries depth; this panel anchors decisions and evidence.</p>

        <div className={styles.signalGrid}>
          {signalSet.map((signal) => (
            <div key={signal.label} className={styles.signalItem}>
              <div className={styles.signalMeta}>
                <span>{signal.label}</span>
                <span>{signal.score}</span>
              </div>
              <div className={styles.signalTrack}>
                <div className={styles.signalFill} style={{ width: `${signal.score}%` }} />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className={styles.detailButton}
          onClick={() => setDetailsOpen((current) => !current)}
          aria-expanded={detailsOpen}
          aria-controls="quick-wins-detail-panel"
          aria-label="Drill into quick-win details"
        >
          {detailsOpen ? "Hide details" : "Drill into details"}
        </button>
      </article>

      <div
        id="quick-wins-detail-panel"
        className={`${styles.detailPanel} ${detailsOpen ? styles.detailPanelOpen : styles.detailPanelClosed}`}
      >
        <div className={styles.detailGrid}>
          <div className={styles.detailCard}>
            <p className={styles.detailLabel}>Summary</p>
            <p>{activeWin.summary}</p>
          </div>
          <div className={styles.detailCard}>
            <p className={styles.detailLabel}>Scope</p>
            <p>{activeWin.scope}</p>
          </div>
          <div className={styles.detailCard}>
            <p className={styles.detailLabel}>Done when</p>
            <p>{activeWin.doneWhen}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
