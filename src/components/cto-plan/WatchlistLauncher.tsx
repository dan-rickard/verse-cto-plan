"use client";

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import styles from "./WatchlistLauncher.module.css";

const WatchlistOverlay = lazy(() => import("./WatchlistOverlay"));

export function WatchlistLauncher() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeWatchlist = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeWatchlist();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeWatchlist, open]);

  const prefetchWatchlist = useCallback(() => {
    void import("./WatchlistOverlay");
  }, []);

  return (
    <>
      <section className={styles.launcherSection} aria-labelledby="watchlist-launcher-heading">
        <p className={styles.kicker}>Deep dive appendix</p>
        <h2 id="watchlist-launcher-heading" className={styles.heading}>
          Need the full question set for execution pressure-testing?
        </h2>
        <p className={styles.copy}>
          Open the watchlist page for detailed prompts across security, data governance, workflow,
          automation, and operating model design.
        </p>
        <button
          ref={triggerRef}
          type="button"
          className={styles.launchButton}
          onPointerEnter={prefetchWatchlist}
          onFocus={prefetchWatchlist}
          onClick={() => setOpen(true)}
        >
          CTO Watchlist
        </button>
      </section>

      {open ? (
        <Suspense
          fallback={
            <section className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="watchlist-loading">
              <article className={styles.page}>
                <p id="watchlist-loading" className={styles.pageCopy}>
                  Loading watchlist...
                </p>
              </article>
            </section>
          }
        >
          <WatchlistOverlay onClose={closeWatchlist} />
        </Suspense>
      ) : null}
    </>
  );
}
