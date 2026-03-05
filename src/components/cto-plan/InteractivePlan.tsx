import type { CtoPlanContent } from "@/types/ctoPlan";
import { CadenceTable } from "./CadenceTable";
import { EarlyWinsSection } from "./EarlyWinsSection";
import { ImageBreakSection } from "./ImageBreakSection";
import { MessageBar } from "./MessageBar";
import { NorthStarHeader } from "./NorthStarHeader";
import { ScoreboardStrip } from "./ScoreboardStrip";
import { TimelineSection } from "./TimelineSection";
import { WatchlistLauncher } from "./WatchlistLauncher";
import styles from "./InteractivePlan.module.css";

type InteractivePlanProps = {
  content: CtoPlanContent;
};

export function InteractivePlan({ content }: InteractivePlanProps) {
  return (
    <main id="main-content" className={styles.page}>
      <div className={`${styles.canvas} ${styles.reveal}`}>
        <NorthStarHeader
          planTitle={content.planTitle}
          oneLineThesis={content.oneLineThesis}
          outcomes={content.day90Outcomes}
        />
        <TimelineSection phases={content.timeline} />
        <EarlyWinsSection wins={content.earlyWins} />
        <MessageBar message={content.message} />
        <ImageBreakSection />
        <ScoreboardStrip metrics={content.metrics} />
        <CadenceTable cadence={content.cadence} />
        <WatchlistLauncher />
      </div>
    </main>
  );
}
