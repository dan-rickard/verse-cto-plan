"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { lazy, Suspense, useCallback, useState } from "react";
import styles from "./WatchlistLauncher.module.css";

const WatchlistOverlay = lazy(() => import("./WatchlistOverlay"));

export function WatchlistLauncher() {
  const [open, setOpen] = useState(false);

  const prefetchWatchlist = useCallback(() => {
    void import("./WatchlistOverlay");
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <section className={styles.launcherSection} aria-labelledby="watchlist-launcher-heading">
        <p className={styles.kicker}>Execution watchlist</p>
        <h2 id="watchlist-launcher-heading" className={styles.heading}>
          Need the full question set to pressure-test execution?
        </h2>
        <p className={styles.copy}>
          Open the watchlist page for detailed prompts across security, data governance, workflow,
          automation, and operating model design.
        </p>
        <Dialog.Trigger asChild>
          <button
            type="button"
            className={styles.launchButton}
            onPointerEnter={prefetchWatchlist}
            onFocus={prefetchWatchlist}
          >
            CTO Watchlist
          </button>
        </Dialog.Trigger>
      </section>

      {open ? (
        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content className={styles.page} aria-label="CTO Watchlist">
            <Suspense
              fallback={
                <>
                  <Dialog.Title className={styles.visuallyHidden}>CTO Watchlist</Dialog.Title>
                  <Dialog.Description className={styles.visuallyHidden}>
                    Loading the CTO watchlist content.
                  </Dialog.Description>
                  <p className={styles.loadingState} aria-live="polite">
                    Loading watchlist…
                  </p>
                </>
              }
            >
              <WatchlistOverlay />
            </Suspense>
          </Dialog.Content>
        </Dialog.Portal>
      ) : null}
    </Dialog.Root>
  );
}
