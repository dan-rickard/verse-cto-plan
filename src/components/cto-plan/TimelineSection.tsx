"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { TimelinePhase } from "@/types/ctoPlan";
import styles from "./TimelineSection.module.css";

type TimelineSectionProps = {
  phases: TimelinePhase[];
};

const PHASE_PARAM = "phase";
const DETAILS_PARAM = "timelineDetails";

const confidenceSignals: Record<string, Array<{ label: string; score: number }>> = {
  "phase-30": [
    { label: "Understanding", score: 92 },
    { label: "Clarity", score: 88 },
    { label: "Risk control", score: 80 },
  ],
  "phase-60": [
    { label: "Delivery speed", score: 90 },
    { label: "Adoption", score: 83 },
    { label: "Data trust", score: 86 },
  ],
  "phase-90": [
    { label: "Scale", score: 89 },
    { label: "Governance", score: 93 },
    { label: "Leadership confidence", score: 91 },
  ],
};

export function TimelineSection({ phases }: TimelineSectionProps) {
  const defaultPhaseId = phases[0]?.id ?? "";
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activePhaseId, setActivePhaseId] = useState(defaultPhaseId);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const resolvePhaseId = useCallback(
    (searchParams: URLSearchParams) => {
      const requestedPhase = searchParams.get(PHASE_PARAM);
      return phases.some((phase) => phase.id === requestedPhase) ? requestedPhase ?? defaultPhaseId : defaultPhaseId;
    },
    [defaultPhaseId, phases],
  );

  const syncUrl = useCallback((phaseId: string, showDetails: boolean) => {
    if (typeof window === "undefined") {
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(PHASE_PARAM, phaseId);
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
      setActivePhaseId(resolvePhaseId(searchParams));
      setDetailsOpen(searchParams.get(DETAILS_PARAM) === "1");
    };

    applyFromUrl();
    window.addEventListener("popstate", applyFromUrl);
    return () => {
      window.removeEventListener("popstate", applyFromUrl);
    };
  }, [resolvePhaseId]);

  const activePhase = useMemo(
    () => phases.find((phase) => phase.id === activePhaseId) ?? phases[0],
    [activePhaseId, phases],
  );

  const activatePhase = useCallback(
    (phaseId: string) => {
      setActivePhaseId(phaseId);
      setDetailsOpen(false);
      syncUrl(phaseId, false);
    },
    [syncUrl],
  );

  const onTabKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (!phases.length) {
        return;
      }

      let nextIndex: number | null = null;
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          nextIndex = (index + 1) % phases.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          nextIndex = (index - 1 + phases.length) % phases.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = phases.length - 1;
          break;
        default:
          break;
      }

      if (nextIndex === null) {
        return;
      }

      event.preventDefault();
      const nextPhase = phases[nextIndex];
      if (!nextPhase) {
        return;
      }

      activatePhase(nextPhase.id);
      tabRefs.current[nextIndex]?.focus();
    },
    [activatePhase, phases],
  );

  if (!activePhase) {
    return null;
  }

  const signals = confidenceSignals[activePhase.id] ?? [];

  return (
    <section className={styles.section} aria-labelledby="timeline-heading">
      <div className={styles.headingRow}>
        <h2 id="timeline-heading" className={styles.heading}>
          90-day operating path
        </h2>
        <p className={styles.subtitle}>Slides carry anchors; spoken track carries implementation depth.</p>
      </div>

      <div className={styles.filterRow} role="tablist" aria-label="Timeline phases">
        {phases.map((phase, index) => {
          const isActive = phase.id === activePhase.id;
          return (
            <button
              key={phase.id}
              id={`timeline-tab-${phase.id}`}
              ref={(button) => {
                tabRefs.current[index] = button;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`timeline-panel-${phase.id}`}
              tabIndex={isActive ? 0 : -1}
              className={`${styles.filterButton} ${isActive ? styles.filterButtonActive : ""}`}
              onClick={() => activatePhase(phase.id)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
            >
              <span className={styles.filterRange}>{phase.range}</span>
              <span className={styles.filterTitle}>{phase.title}</span>
            </button>
          );
        })}
      </div>

      <article
        id={`timeline-panel-${activePhase.id}`}
        role="tabpanel"
        aria-labelledby={`timeline-tab-${activePhase.id}`}
        className={styles.featureCard}
      >
        <p className={styles.range}>{activePhase.range}</p>
        <h3 className={styles.title}>{activePhase.title}</h3>
        <p className={styles.assertion}>{activePhase.assertion}</p>

        <div className={styles.signalRow}>
          {signals.map((signal) => (
            <div key={signal.label} className={styles.signalItem}>
              <div className={styles.signalMeta}>
                <span>{signal.label}</span>
                <strong>{signal.score}</strong>
              </div>
              <div className={styles.signalTrack}>
                <div className={styles.signalFill} style={{ width: `${signal.score}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.listGrid}>
          <div className={styles.listColumn}>
            <p className={styles.listLabel}>What matters now</p>
            <ul>
              {activePhase.focus.slice(0, 2).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.listColumn}>
            <p className={styles.listLabel}>Near-term proof points</p>
            <ul>
              {activePhase.milestones.slice(0, 2).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <button
          type="button"
          className={styles.detailButton}
          onClick={() => {
            const nextOpenState = !detailsOpen;
            setDetailsOpen(nextOpenState);
            syncUrl(activePhase.id, nextOpenState);
          }}
          aria-expanded={detailsOpen}
          aria-controls="timeline-detail-panel"
          aria-label="Drill into timeline details"
        >
          {detailsOpen ? "Hide details" : "Drill into details"}
        </button>
      </article>

      <div
        id="timeline-detail-panel"
        className={`${styles.detailPanel} ${detailsOpen ? styles.detailPanelOpen : styles.detailPanelClosed}`}
      >
        <div className={styles.detailGrid}>
          <div>
            <p className={styles.detailHeading}>Focus</p>
            <ul className={styles.detailList}>
              {activePhase.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className={styles.detailHeading}>Milestones</p>
            <ul className={styles.detailList}>
              {activePhase.milestones.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className={styles.detailHeading}>Deliverables</p>
            <ul className={styles.detailList}>
              {activePhase.detail.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className={styles.detailHeading}>Owners</p>
            <ul className={styles.detailList}>
              {activePhase.detail.owners.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className={styles.detailHeading}>Dependencies</p>
            <ul className={styles.detailList}>
              {activePhase.detail.dependencies.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {activePhase.detail.keyQuestions?.length ? (
            <div>
              <p className={styles.detailHeading}>Key questions</p>
              <ul className={styles.detailList}>
                {activePhase.detail.keyQuestions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {activePhase.detail.notes?.length ? (
            <div>
              <p className={styles.detailHeading}>Notes</p>
              <ul className={styles.detailList}>
                {activePhase.detail.notes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
