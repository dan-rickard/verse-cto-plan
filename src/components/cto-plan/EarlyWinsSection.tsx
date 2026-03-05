"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { EarlyWin } from "@/types/ctoPlan";
import styles from "./EarlyWinsSection.module.css";

type EarlyWinsSectionProps = {
  wins: EarlyWin[];
};

const WIN_PARAM = "win";
const DETAILS_PARAM = "winDetails";

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
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeWinId, setActiveWinId] = useState(defaultWinId);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const resolveWinId = useCallback(
    (searchParams: URLSearchParams) => {
      const requestedWin = searchParams.get(WIN_PARAM);
      return wins.some((win) => win.id === requestedWin) ? requestedWin ?? defaultWinId : defaultWinId;
    },
    [defaultWinId, wins],
  );

  const syncUrl = useCallback((winId: string, showDetails: boolean) => {
    if (typeof window === "undefined") {
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(WIN_PARAM, winId);
    if (showDetails) {
      searchParams.set(DETAILS_PARAM, "1");
    } else {
      searchParams.delete(DETAILS_PARAM);
    }

    const query = searchParams.toString();
    const nextPath = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    window.history.replaceState(null, "", nextPath);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const applyFromUrl = () => {
      const searchParams = new URLSearchParams(window.location.search);
      setActiveWinId(resolveWinId(searchParams));
      setDetailsOpen(searchParams.get(DETAILS_PARAM) === "1");
    };

    applyFromUrl();
    window.addEventListener("popstate", applyFromUrl);
    return () => {
      window.removeEventListener("popstate", applyFromUrl);
    };
  }, [resolveWinId]);

  const activeWin = useMemo(
    () => wins.find((win) => win.id === activeWinId) ?? wins[0],
    [activeWinId, wins],
  );

  const activateWin = useCallback(
    (winId: string) => {
      setActiveWinId(winId);
      setDetailsOpen(false);
      syncUrl(winId, false);
    },
    [syncUrl],
  );

  const onTabKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (!wins.length) {
        return;
      }

      let nextIndex: number | null = null;
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          nextIndex = (index + 1) % wins.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          nextIndex = (index - 1 + wins.length) % wins.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = wins.length - 1;
          break;
        default:
          break;
      }

      if (nextIndex === null) {
        return;
      }

      event.preventDefault();
      const nextWin = wins[nextIndex];
      if (!nextWin) {
        return;
      }

      activateWin(nextWin.id);
      tabRefs.current[nextIndex]?.focus();
    },
    [activateWin, wins],
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
        <p className={styles.subtitle}>Early wins reduce daily friction and make progress visible in the first month.</p>
      </div>

      <div className={styles.filterRow} role="tablist" aria-label="Quick wins">
        {wins.map((win, index) => {
          const isActive = win.id === activeWin.id;
          return (
            <button
              key={win.id}
              id={`quick-win-tab-${win.id}`}
              ref={(button) => {
                tabRefs.current[index] = button;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`quick-win-panel-${win.id}`}
              tabIndex={isActive ? 0 : -1}
              className={`${styles.filterButton} ${isActive ? styles.filterButtonActive : ""}`}
              onClick={() => activateWin(win.id)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
            >
              {win.title}
            </button>
          );
        })}
      </div>

      <article
        id={`quick-win-panel-${activeWin.id}`}
        role="tabpanel"
        aria-labelledby={`quick-win-tab-${activeWin.id}`}
        className={styles.visualCard}
      >
        <div className={styles.visualGlow} aria-hidden="true" />

        <p className={styles.impact}>{activeWin.impact}</p>
        <h3 className={styles.title}>{activeWin.title}</h3>
        <p className={styles.summary}>{activeWin.summary}</p>
        <p className={styles.presenterNote}>Each win ties to clear ownership, measurable impact, and visible evidence.</p>

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
          onClick={() => {
            const nextOpenState = !detailsOpen;
            setDetailsOpen(nextOpenState);
            syncUrl(activeWin.id, nextOpenState);
          }}
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
