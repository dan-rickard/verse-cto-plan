"use client";

import * as Dialog from "@radix-ui/react-dialog";
import type { DrilldownItem } from "@/types/ctoPlan";
import styles from "./DrilldownDrawer.module.css";

type DrilldownDrawerProps = {
  open: boolean;
  item: DrilldownItem | null;
  onOpenChange: (open: boolean) => void;
};

export function DrilldownDrawer({ open, item, onOpenChange }: DrilldownDrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <header className={styles.header}>
            <div>
              <p className={styles.eyebrow}>Drill-down</p>
              <Dialog.Title className={styles.title}>{item?.label ?? "Details"}</Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button type="button" className={styles.closeButton} aria-label="Close details panel">
                Close
              </button>
            </Dialog.Close>
          </header>

          <Dialog.Description className={styles.description}>
            Evidence and implementation details for this item.
          </Dialog.Description>

          <div className={styles.body}>
            {item?.content.map((line) => {
              const isHeading = line.endsWith(":");
              const isBullet = line.startsWith("- ");

              if (isHeading) {
                return (
                  <p key={line} className={styles.subheading}>
                    {line}
                  </p>
                );
              }

              if (isBullet) {
                return (
                  <p key={line} className={styles.bullet}>
                    {line.slice(2)}
                  </p>
                );
              }

              return (
                <p key={line} className={styles.line}>
                  {line}
                </p>
              );
            })}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
