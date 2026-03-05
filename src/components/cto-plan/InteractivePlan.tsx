"use client";

import { useEffect, useState } from "react";
import type { CtoPlanContent } from "@/types/ctoPlan";
import { CadenceTable } from "./CadenceTable";
import { EarlyWinsSection } from "./EarlyWinsSection";
import { MessageBar } from "./MessageBar";
import { NorthStarHeader } from "./NorthStarHeader";
import { ScoreboardStrip } from "./ScoreboardStrip";
import { TimelineSection } from "./TimelineSection";
import styles from "./InteractivePlan.module.css";

type InteractivePlanProps = {
  content: CtoPlanContent;
};

export function InteractivePlan({ content }: InteractivePlanProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 760px)");
    const syncMatch = () => {
      setIsMobile(mediaQuery.matches);
    };

    syncMatch();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncMatch);
      return () => {
        mediaQuery.removeEventListener("change", syncMatch);
      };
    }

    mediaQuery.addListener(syncMatch);
    return () => {
      mediaQuery.removeListener(syncMatch);
    };
  }, []);

  return (
    <main id="main-content" className={styles.page}>
      <div className={`${styles.canvas} ${styles.reveal}`}>
        <NorthStarHeader
          planTitle={content.planTitle}
          oneLineThesis={content.oneLineThesis}
          outcomes={content.day90Outcomes}
          showWatchlist={!isMobile}
        />
        <TimelineSection phases={content.timeline} />
        <EarlyWinsSection wins={content.earlyWins} />
        <MessageBar message={content.message} />
        <ScoreboardStrip metrics={content.metrics} />
        <CadenceTable cadence={content.cadence} showWatchlist={isMobile} />
      </div>
    </main>
  );
}
