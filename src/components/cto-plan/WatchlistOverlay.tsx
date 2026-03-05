import styles from "./WatchlistLauncher.module.css";

type WatchlistOverlayProps = {
  onClose: () => void;
};

const planWatchList = [
  "Do we have a clean who-can-access-what model (SSO/MFA, roles, joiner/mover/leaver), and is it actually enforced?",
  "Where does client data live across the stack, and what is the shortest sensible vendor risk map we can keep current?",
  "What is logged today (emails, meetings, Salesforce changes), and what evidence gaps are we currently tolerating?",
  "Are devices and endpoints at a good-enough baseline (encryption, patching, local admin rights), or are we relying on luck?",
  "For each core object (client details, tasks, documents, fees/revenue), what is the source of truth, and what happens when systems disagree?",
  "Do we have a reliable way to prevent duplicates and merge records without creating chaos?",
  "What are the minimum required fields per stage, and where do we put validation gates so bad data does not travel downstream?",
  "Do we have consistent identifiers across Salesforce and billing/revenue tools, or are we still doing name-matching in disguise?",
  "For the pilot workflow, what does done mean at each stage, including exceptions, so handoffs stop being interpretive?",
  "Can we make the next action and owner visible at all times (where is it at becomes a screen, not a question)?",
  "Can we turn recurring misses into an exception queue with an owner (revenue exceptions, compliance completeness), rather than spreadsheet archaeology?",
  "What is the smallest automation set that removes daily chasing without making the system fragile?",
  "Is there a simple, reliable email logging pattern we can get consistent, even if it is not perfect?",
  "Can meeting capture to summary to actions be attached to the client record with a human in loop, so the evidence trail strengthens while admin drops?",
  "When automations fail, do we notice and do we have a visible queue/alert, or do failures stay silent until a client calls?",
  "Who can change automations, and what is the minimum change control so we do not break delivery mid-week?",
  "Do website leads land in Salesforce with the fields we actually need (source, campaign, intent, owner), or do we lose context on entry?",
  "Can speed-to-lead be made automatic (acknowledgement, booking link, task) so response time is not dependent on someone's inbox?",
  "Can qualification notes become structured fields so the next adviser does not start from scratch?",
  "What is the weekly operating cadence that keeps this alive (30 minutes, small group, bottlenecks + queues + workload)?",
  "What is the lightest documentation that prevents re-keying and reinvention (how we do onboarding here in 1-2 pages)?",
  "Are we training the pilot team to excellence first (so the pattern spreads), rather than trying to train everyone at once?",
];

const otherWatchList = [
  "What is the full software sprawl picture, and which tools exist because Salesforce did not do the thing?",
  "Where are we paying twice (licenses, overlapping workflow tools), and what can be removed without disrupting delivery?",
  "If we had to pick one home for workflow state, one for docs/knowledge, and one for automations, what would that look like in practice?",
  "Do we have one ranked backlog that the business trusts (time saved, risk reduced, revenue impact), or multiple competing lists?",
  "What is the support intake model so requests do not arrive as DMs and drive-by conversations?",
  "What is the line between Phase 1: stabilise and integrate and Phase 2: nicer-to-have platform upgrades?",
  "What is the minimum AI usage policy that feels empowering, not restrictive, and clearly defines what data is off-limits?",
  "Where do AI outputs live (and how are they audited), so they do not become a new shadow system?",
  "What is the repeatable human-in-loop-by-default pattern so trust grows without accidental automation risk?",
  "If we wanted to improve marketing attribution, what is the smallest measurement set that is actually reliable (and does not become dashboard theatre)?",
  "What is the longer-term CXM vision, and what is the one client-facing use case that would genuinely change the client experience (not just mirror the portal)?",
  "What is the simplest way to keep security and compliance evidence always on without turning the team into a ticket factory?",
];

export default function WatchlistOverlay({ onClose }: WatchlistOverlayProps) {
  return (
    <section className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="watchlist-heading">
      <article className={styles.page}>
        <header className={styles.header}>
          <button type="button" className={styles.backButton} onClick={onClose}>
            Back to 90-Day Plan
          </button>
          <h2 id="watchlist-heading" className={styles.pageTitle}>
            CTO Watchlist
          </h2>
          <p className={styles.pageCopy}>
            Questions to pressure-test execution quality and reduce avoidable risk.
          </p>
        </header>

        <div className={styles.columns}>
          <section className={styles.card} aria-labelledby="watchlist-plan-heading">
            <h3 id="watchlist-plan-heading" className={styles.cardTitle}>
              90 Day Plan - Watch List (covered within the plan)
            </h3>
            <ul className={styles.list}>
              {planWatchList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className={styles.card} aria-labelledby="watchlist-other-heading">
            <h3 id="watchlist-other-heading" className={styles.cardTitle}>
              Other Items - Watch List (kept deliberately out of the 90 days)
            </h3>
            <ul className={styles.list}>
              {otherWatchList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.backButton} onClick={onClose}>
            Back to 90-Day Plan
          </button>
        </div>
      </article>
    </section>
  );
}
