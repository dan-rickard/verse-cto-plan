"use client";

import { type FormEvent, useEffect, useState } from "react";
import styles from "./PasswordGate.module.css";

type PasswordGateProps = {
  children: React.ReactNode;
};

const UNLOCK_STORAGE_KEY = "verse-wealth-cto:unlocked";
const SITE_PASSWORD = "DRCTO";

export function PasswordGate({ children }: PasswordGateProps) {
  const [isReady, setIsReady] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordAttempt, setPasswordAttempt] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      setIsUnlocked(window.localStorage.getItem(UNLOCK_STORAGE_KEY) === "true");
    } finally {
      setIsReady(true);
    }
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (passwordAttempt.trim().toUpperCase() !== SITE_PASSWORD) {
      setErrorMessage("Incorrect password. Try again.");
      return;
    }

    try {
      window.localStorage.setItem(UNLOCK_STORAGE_KEY, "true");
    } catch {
      // Local storage may be blocked, but we can still unlock this session.
    }

    setIsUnlocked(true);
    setErrorMessage("");
    setPasswordAttempt("");
  };

  if (isReady && isUnlocked) {
    return <>{children}</>;
  }

  return (
    <main id="main-content" className={styles.shell}>
      <section className={styles.card} aria-live="polite">
        <p className={styles.kicker}>Restricted Access</p>
        <h1 className={styles.title}>Enter Password</h1>
        <p className={styles.copy}>
          Unlock once on this device to keep access between visits.
        </p>

        {isReady ? (
          <form className={styles.form} onSubmit={onSubmit}>
            <label htmlFor="site-password" className={styles.label}>
              Password
            </label>
            <input
              id="site-password"
              name="site-password"
              type="password"
              autoComplete="current-password"
              className={styles.input}
              value={passwordAttempt}
              onChange={(event) => {
                setPasswordAttempt(event.target.value);
                if (errorMessage) {
                  setErrorMessage("");
                }
              }}
            />
            {errorMessage ? (
              <p className={styles.error} role="status">
                {errorMessage}
              </p>
            ) : null}
            <button type="submit" className={styles.button}>
              Unlock Site
            </button>
          </form>
        ) : (
          <p className={styles.loading}>Checking saved access…</p>
        )}
      </section>
    </main>
  );
}
