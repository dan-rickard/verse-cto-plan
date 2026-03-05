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
