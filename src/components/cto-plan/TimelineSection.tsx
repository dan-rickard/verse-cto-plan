"use client";

import { useMemo, useState } from "react";
import type { TimelinePhase } from "@/types/ctoPlan";
import styles from "./TimelineSection.module.css";

type TimelineSectionProps = {
  phases: TimelinePhase[];
};

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

function compactLine(text: string) {
  const firstClause = text.split(".")[0] ?? text;
  return firstClause.length > 95 ? `${firstClause.slice(0, 92).trim()}...` : firstClause;
}

export function TimelineSection({ phases }: TimelineSectionProps) {
  const defaultPhaseId = phases[0]?.id ?? "";
  const [activePhaseId, setActivePhaseId] = useState(defaultPhaseId);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const activePhase = useMemo(
    () => phases.find((phase) => phase.id === activePhaseId) ?? phases[0],
    [activePhaseId, phases],
  );

  if (!activePhase) {
    return null;
  }

  const signals = confidenceSignals[activePhase.id] ?? [];

  return (
    <section className={styles.section} aria-labelledby="timeline-heading">
      <div className={styles.headingRow}>
        <h2 id="timeline-heading" className={styles.heading}>
          30/60/90 timeline
        </h2>
        <p className={styles.subtitle}>Minimal view for the room. Full detail on demand.</p>
      </div>

      <div className={styles.filterRow} role="tablist" aria-label="Timeline phases">
        {phases.map((phase) => {
          const isActive = phase.id === activePhase.id;
          return (
            <button
              key={phase.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.filterButton} ${isActive ? styles.filterButtonActive : ""}`}
              onClick={() => {
                setActivePhaseId(phase.id);
                setDetailsOpen(false);
              }}
            >
              <span className={styles.filterRange}>{phase.range}</span>
              <span className={styles.filterTitle}>{phase.title}</span>
            </button>
          );
        })}
      </div>

      <article className={styles.featureCard}>
        <p className={styles.range}>{activePhase.range}</p>
        <h3 className={styles.title}>{activePhase.title}</h3>
        <p className={styles.assertion}>{activePhase.assertion}</p>

        <div className={styles.signalRow}>
          {signals.map((signal) => (
            <div key={signal.label} className={styles.signalItem}>
              <span>{signal.label}</span>
              <strong>{signal.score}</strong>
            </div>
          ))}
        </div>

        <div className={styles.listGrid}>
          <div className={styles.listColumn}>
            <p className={styles.listLabel}>What matters now</p>
            <ul>
              {activePhase.focus.slice(0, 2).map((item) => (
                <li key={item}>{compactLine(item)}</li>
              ))}
            </ul>
          </div>

          <div className={styles.listColumn}>
            <p className={styles.listLabel}>Near-term proof points</p>
            <ul>
              {activePhase.milestones.slice(0, 2).map((item) => (
                <li key={item}>{compactLine(item)}</li>
              ))}
            </ul>
          </div>
        </div>

        <button
          type="button"
          className={styles.detailButton}
          onClick={() => setDetailsOpen((current) => !current)}
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
