import type {
  CadenceItem,
  CtoPlanContent,
  EarlyWin,
  Metric,
  Outcome,
  TimelinePhase,
} from "@/types/ctoPlan";

const day90Outcomes: Outcome[] = [
  {
    id: "outcome-1",
    text: "Two journeys run on one easiest path with stage, owner, and next action always visible.",
  },
  {
    id: "outcome-2",
    text: "Client interactions and revenue are reliably captured in Salesforce, with exceptions managed as queues.",
  },
  {
    id: "outcome-3",
    text: "Governance is enforceable: change control, minimum data standards, and a human-in-loop AI safe lane.",
  },
];

const timeline: TimelinePhase[] = [
  {
    id: "phase-30",
    range: "Days 1-30",
    title: "Stabilise delivery and pick the first path",
    assertion:
      "Validate reality on the ground, protect live delivery, and lock one pilot journey with clear rules.",
    focus: [
      "Build an end-to-end truth map from lead to revenue and confirm where each data truth lives today.",
      "Run a process-vs-reality week with advisers, associates, paraplanners, and admin; rank top friction by time, risk, and client impact.",
      "Choose one pilot journey (default onboarding) and define stages, owners, definition of done, and exception paths.",
    ],
    milestones: [
      "Week 2: truth map and friction ranking agreed with no disruption to active client delivery.",
      "Week 4: pilot journey and stage model live, plus 2-3 quick wins felt daily by the pilot team.",
    ],
    detail: {
      deliverables: [
        "End-to-end truth map (client details, tasks, docs, fees, comms, revenue)",
        "Top-10 friction backlog ranked by ROI",
        "Pilot blueprint (stages, owners, definition of done, exceptions)",
        "Salesforce go-live hygiene checklist (configured, unused, must-not-break)",
        "Data 360 checkpoint with minimum viable scope decision",
      ],
      owners: ["CTO", "Pilot pod lead", "Ops/admin representative"],
      dependencies: [
        "Salesforce configuration and workflow access",
        "Revex and billing data access for baseline checks",
        "Shadowing time with each role in the first fortnight",
        "Leadership alignment on 90-day priority lens",
      ],
      keyQuestions: [
        "Which outcome has priority in the next 90 days: client experience, adviser capacity, or risk reduction?",
        "What parts of the current Salesforce setup must not break while we simplify workflow?",
        "Do consistent client identifiers exist across Salesforce, billing, and revenue tools?",
      ],
      notes: [
        "Default to onboarding for pilot unless another journey has clearly higher relief and similar rollout risk.",
      ],
    },
  },
  {
    id: "phase-60",
    range: "Days 31-60",
    title: "Make the pilot the default way of working",
    assertion:
      "The new path is easier than old workarounds: less chasing, less rekeying, and clearer ownership.",
    focus: [
      "Automate the pilot stages with validation gates before downstream steps to stop missing data late.",
      "Use Slack as the command surface: status nudges, alerts, and approvals tied to Salesforce stage movement.",
      "Implement identifier strategy and first revenue ingestion run with an owned exceptions queue.",
    ],
    milestones: [
      "Week 6: stage automation and validation are live for pilot onboarding, with manual chasing materially reduced.",
      "Week 8: comms capture and revenue exception handling are predictable and visibly owned.",
    ],
    detail: {
      deliverables: [
        "Pilot workflow automation in Salesforce (stages, tasks, validation)",
        "Slack alerts/approvals/status nudges wired to stage transitions",
        "Comms and meeting capture pattern with human approval before logging",
        "Identifier mapping or bridging key across Salesforce, billing, and revenue systems",
        "Revenue object mapping + first import + exceptions queue",
        "Integration monitoring baseline (retries, alerts, owned error queue)",
      ],
      owners: ["CTO", "Salesforce admin/config resource", "Integration owner", "Pilot pod"],
      dependencies: [
        "Salesforce admin capacity",
        "Billing and revenue data access",
        "Agreement on required fields and definition of done",
        "Named owner for integration errors queue",
      ],
      notes: [
        "Reliability over elegance: batch ingestion is acceptable before real-time.",
        "No automation is complete without an exception queue and owner.",
      ],
    },
  },
  {
    id: "phase-90",
    range: "Days 61-90",
    title: "Scale the pattern and lock governance",
    assertion:
      "Scale to a second journey, run leadership on trusted metrics, and stage a disciplined CXM MVP plan.",
    focus: [
      "Apply the same stage/owner/validation pattern to a second journey (reviews or advice production).",
      "Operate on four trusted metrics: workload, bottlenecks, compliance completeness, and revenue exception trend.",
      "Define CXM MVP as one high-value client use case with explicit data contract and security controls.",
    ],
    milestones: [
      "Week 10: second journey is live under the same operating model.",
      "Week 12: governance controls are active and CXM MVP scope is build-ready.",
    ],
    detail: {
      deliverables: [
        "Second-journey rollout pack (stages, definitions of done, automation, validation)",
        "Operational dashboard for workload, bottlenecks, compliance completeness, revenue exceptions",
        "CXM MVP scope + data contract (objects, sync direction, conflicts, audit trail, security, rollout)",
        "Tool consolidation path (freeze one external tracker once trusted)",
        "Doc-gen readiness pack (key fields and validation rules)",
        "Governance pack (change control, minimum data standards, AI safe lane)",
      ],
      owners: ["CTO", "Ops lead", "Compliance lead", "Client experience lead"],
      dependencies: [
        "Leadership decision on second journey priority",
        "Agreement on CXM data contract boundaries",
        "Compliance sign-off on AI safe-lane policy",
        "Named owner for reporting cadence and quality",
      ],
      notes: [
        "Replace functions before retiring tools; avoid blanket bans.",
        "CXM MVP is a disciplined scope and contract first, not a giant build.",
      ],
    },
  },
];

const earlyWins: EarlyWin[] = [
  {
    id: "win-1",
    title: "Pilot command view",
    impact: "Daily operational clarity",
    summary:
      "A single onboarding board with stage, owner, and next action so the team stops hunting status across tools.",
    scope: "Salesforce list view/dashboard configured around pilot stages and ownership.",
    doneWhen:
      "Anyone can confirm current status in under 30 seconds from one Salesforce view.",
  },
  {
    id: "win-2",
    title: "Meeting -> file note + actions",
    impact: "Capacity + evidence quality",
    summary:
      "Meeting summaries generate structured file-note drafts and action lists, with adviser approval before anything is logged.",
    scope:
      "Human-in-loop summary template, client record attachment, and same-day workflow in pilot.",
    doneWhen:
      "Pilot advisers use it routinely and file-note turnaround is same-day.",
  },
  {
    id: "win-3",
    title: "Slack daily flow digest",
    impact: "Faster unblock and coordination",
    summary:
      "Daily digest shows what moved, what is stuck, and who is waiting on input in the pilot journey.",
    scope:
      "Automated summary from stage movement + stale-item checks, posted to a single pilot Slack channel.",
    doneWhen:
      "Blocked items are visible within 24 hours and manual chasing clearly drops.",
  },
];

const metrics: Metric[] = [
  {
    id: "metric-pilot-adoption",
    metric: "Pilot adoption",
    target: "At least 85% of active pilot cases run through the defined stage model",
    measuredBy:
      "Stage, owner, and next action completeness on active pilot records",
  },
  {
    id: "metric-data-reliability",
    metric: "Data reliability baseline",
    target: "Latest interaction and required fields are consistently present on active pilot records",
    measuredBy:
      "Daily completeness checks plus trend of data-quality exceptions",
  },
  {
    id: "metric-revenue-integrity",
    metric: "Revenue integrity flow",
    target: "Revenue import is live and exceptions are owned, aged, and resolved in queue",
    measuredBy:
      "Exception aging, ownership coverage, and weekly closure rate",
  },
  {
    id: "metric-leadership-visibility",
    metric: "Leadership visibility",
    target: "Leadership can run weekly operations from one dashboard without spreadsheet assembly",
    measuredBy:
      "Four-metric dashboard reviewed weekly with agreed bottlenecks and actions",
  },
];

const cadence: CadenceItem[] = [
  {
    id: "cadence-0",
    cadence: "Weekly",
    what: "Leadership scoreboard + delivery review + decisions. Metrics, what shipped, pilot progress, blockers, and any calls needed this week.",
    who: "Corey, Ed, Heather",
  },
  {
    id: "cadence-1",
    cadence: "Weekly",
    what: "Intake + prioritisation. New requests triaged, top 5 priorities set, trade-offs made explicit.",
    who: "CTO + Ed",
  },
  {
    id: "cadence-2",
    cadence: "Fortnightly",
    what: "Team ship update. What shipped, what's next, what changed.",
    who: "Whole team",
  },
  {
    id: "cadence-3",
    cadence: "Ongoing",
    what: "Decision journal. Every material decision + rationale (to avoid reopening settled calls).",
    who: "Decision owner",
  },
];

export const ctoPlanContent: CtoPlanContent = {
  planTitle: "90-Day CTO Plan - Verse Wealth",
  oneLineThesis:
    "This 90-day plan aligns decisions, execution priorities, and measurable proof points.",
  day90Outcomes,
  timeline,
  earlyWins,
  metrics,
  cadence,
  message:
    "Current tooling is rational for fast growth. The next phase is repeatability without disruption: one easiest operating path, reliable data, and governance that is enforceable.",
};
