"use client";

import { useMemo, useRef, useState } from "react";
import type { CtoPlanContent, DrilldownItem } from "@/types/ctoPlan";
import { CadenceTable } from "./CadenceTable";
import { DrilldownDrawer } from "./DrilldownDrawer";
import { EarlyWinsSection } from "./EarlyWinsSection";
import { MessageBar } from "./MessageBar";
import { NorthStarHeader } from "./NorthStarHeader";
import { RisksAsksSection } from "./RisksAsksSection";
import { ScoreboardStrip } from "./ScoreboardStrip";
import { TimelineSection } from "./TimelineSection";
import styles from "./InteractivePlan.module.css";

type InteractivePlanProps = {
  content: CtoPlanContent;
};

export function InteractivePlan({ content }: InteractivePlanProps) {
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const drilldownById = useMemo(() => {
    const index: Record<string, DrilldownItem> = {};
    for (const item of content.drilldowns) {
      index[item.id] = item;
    }
    return index;
  }, [content.drilldowns]);

  const openItem = openItemId ? drilldownById[openItemId] ?? null : null;

  const handleOpenDetail = (id: string, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setOpenItemId(id);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      return;
    }

    setOpenItemId(null);

    if (lastTriggerRef.current) {
      requestAnimationFrame(() => {
        lastTriggerRef.current?.focus();
      });
    }
  };

  return (
    <main className={styles.page}>
      <div className={`${styles.canvas} ${styles.reveal}`}>
        <NorthStarHeader
          planTitle={content.planTitle}
          oneLineThesis={content.oneLineThesis}
          outcomes={content.day90Outcomes}
        />
        <ScoreboardStrip metrics={content.metrics} />
        <TimelineSection phases={content.timeline} onOpenDetail={handleOpenDetail} />
        <EarlyWinsSection wins={content.earlyWins} onOpenDetail={handleOpenDetail} />
        <RisksAsksSection risks={content.risks} asks={content.asks} onOpenDetail={handleOpenDetail} />
        <CadenceTable cadence={content.cadence} />
        <MessageBar message={content.message} />
      </div>

      <DrilldownDrawer open={Boolean(openItem)} item={openItem} onOpenChange={handleOpenChange} />
    </main>
  );
}
