import type {
  Ask,
  CadenceItem,
  CtoPlanContent,
  DrilldownItem,
  EarlyWin,
  Metric,
  Outcome,
  Risk,
  TimelinePhase,
} from "@/types/ctoPlan";

const day90Outcomes: Outcome[] = [
  {
    id: "outcome-1",
    text: "Workflow state is visible - no one asks where onboarding or reviews are at.",
  },
  {
    id: "outcome-2",
    text: "Data and revenue are trustworthy - client identifiers are consistent and fee exceptions surface weekly.",
  },
  {
    id: "outcome-3",
    text: "Identity and logging are real - SSO/MFA, least privilege, and auditable comms and uploads are enforced.",
  },
];

const metrics: Metric[] = [
  {
    id: "metric-onboarding-visibility",
    metric: "Onboarding stage visibility",
    target: "100% of active onboardings trackable by stage + owner",
    measuredBy: "Salesforce pipeline view or equivalent",
  },
  {
    id: "metric-rekeying",
    metric: "Rekeying incidents (critical fields)",
    target: "80% reduction on top 20 fields",
    measuredBy: "Paraplanner self-report + validation check pass rate",
  },
  {
    id: "metric-revenue-exceptions",
    metric: "Revenue exceptions surfaced",
    target: "Weekly automated exceptions queue live",
    measuredBy: "Count of unresolved fee mismatches with ownership",
  },
  {
    id: "metric-file-note-turnaround",
    metric: "Meeting to file note turnaround",
    target: "Same-day structured output (AI-assisted, human-in-loop)",
    measuredBy: "Sample audit of file note completeness + timing",
  },
  {
    id: "metric-integration-alerts",
    metric: "Integration failure alerts",
    target: "Monitored and alerted (not silent)",
    measuredBy: "Alert count + mean time to acknowledge",
  },
  {
    id: "metric-compliance-evidence",
    metric: "Compliance evidence logged",
    target: "Comms + uploads consistently captured in Salesforce",
    measuredBy: "Spot audit pass rate across 3 adviser pods",
  },
  {
    id: "metric-team-sentiment",
    metric: "Team sentiment (quick wins felt)",
    target: 'Positive shift in "is tech helping?" pulse',
    measuredBy: "Fortnightly one-question pulse to advisers + paraplanners",
  },
];

const timeline: TimelinePhase[] = [
  {
    id: "phase-30",
    range: "Days 1-30",
    title: "Protect delivery + map truth",
    assertion:
      "Before changing anything, I understand how the business actually runs - and the team sees the first friction removed.",
    focus: [
      "Follow one real client end-to-end and agree where each truth lives and where it breaks.",
      "Map pain + cost and rank work by ROI, not opinion.",
      "Identify the three constraints: adviser capacity bottleneck, compliance weak spot, and revenue/data integrity failure point.",
    ],
    milestones: [
      "Week 1-2: Client journey walkthrough complete. Source-of-truth map drafted for client, portfolio, fees, tasks, and documents.",
      "Week 3-4: Pilot team and journey selected. Stages, definition of done, and owners defined. Minimum monitoring live for integration failures and revenue exceptions.",
    ],
    detail: {
      deliverables: [
        "Source-of-truth map",
        "Pilot journey scope document",
        "Stage definitions",
        "Monitoring baseline",
      ],
      owners: ["CTO", "One adviser pod lead", "Ops/admin representative"],
      dependencies: [
        "Salesforce config access",
        "Revex data access",
        "Stripe billing records",
        "2-3 hours with each pod in the first fortnight",
      ],
      keyQuestions: [
        "How much is WealthConnect vs custom vs standard Salesforce?",
        "What is configured vs unused today?",
        "Do consistent client identifiers exist across Salesforce, Stripe, and Revex?",
      ],
    },
  },
  {
    id: "phase-60",
    range: "Days 31-60",
    title: "Make the pilot inevitable",
    assertion:
      "The new way is live for one team on one journey - and it is measurably faster than the old way.",
    focus: [
      "Auto-create tasks by stage with validation checks before doc generation.",
      "Lock down the 10-20 fields causing 80% of rework and remove rekeying for critical merge fields.",
      "Establish consistent identifiers across Salesforce, Stripe, and Revex, then stand up a revenue exceptions queue with clear ownership.",
    ],
    milestones: [
      "Week 5-6: Automated task creation by stage live for the pilot journey with critical validation rules active.",
      "Week 7-8: Revenue exceptions queue operational. Identifier mapping documented and first bridging keys in place.",
    ],
    detail: {
      deliverables: [
        "Pilot workflow live (onboarding)",
        "Field validation rules",
        "Exceptions queue",
        "Identifier mapping",
      ],
      owners: ["CTO", "Salesforce admin/config resource", "Pilot pod"],
      dependencies: [
        "Salesforce admin capacity (Cloudwerx or internal)",
        "Revex data export access",
        "Agreement on definition of done per stage",
      ],
      risks: [
        "If Salesforce configuration debt is deeper than expected, narrow scope to the 3 highest-friction stages first.",
      ],
    },
  },
  {
    id: "phase-90",
    range: "Days 61-90",
    title: "Scale + lock governance",
    assertion:
      "A second journey is running the same pattern. Operational metrics are live. Governance is explicit, not assumed.",
    focus: [
      "Scale the pattern to a second journey (reviews or advice production) with stage ownership and validation.",
      "Expose operational metrics for leadership: pipeline stage, workload, bottlenecks, compliance completeness, and revenue exceptions.",
      "Lock governance for permissions, audit trail expectations, and integration/config change control.",
    ],
    milestones: [
      "Week 9-10: Second journey live and operational dashboard available to leadership.",
      "Week 11-12: Identity uplift underway (SSO/MFA enforcement, least privilege review, and device posture baseline) with governance doc delivered.",
    ],
    detail: {
      deliverables: [
        "Second journey live",
        "Operational metrics dashboard",
        "Governance framework for permissions, audit trail, and change control",
        "Identity/security uplift plan",
      ],
      owners: ["CTO", "Ops lead", "Compliance lead"],
      dependencies: [
        "Leadership alignment on second journey priority",
        "Reporting tooling decision (Tableau or native Salesforce reports as interim)",
      ],
      notes: [
        "CXM exploration stays disciplined - no portal build until data contracts, sync direction, and security model are clear.",
        "AI starts with meeting-to-file-note and pre-meeting briefs with human approval. No autonomous updates in regulated workflows.",
      ],
    },
  },
];

const earlyWins: EarlyWin[] = [
  {
    id: "win-1",
    title: '"Where is this at?" view',
    impact: "Confidence and friction removal",
    summary:
      "A single visible onboarding pipeline with stage, owner, and next action to stop Slack chasing and spreadsheet cross-referencing.",
    scope: "Salesforce list view or lightweight dashboard - reconfiguration, not rebuild.",
    doneWhen: "Any team lead can answer where client X is without asking around.",
  },
  {
    id: "win-2",
    title: "Revenue exceptions queue",
    impact: "Time saved and anxiety reduced",
    summary:
      "Surface fee mismatches, missing fees, and delayed billing with ownership assigned every week.",
    scope: "Revex export into a structured exceptions list with owner and status.",
    doneWhen: "Exceptions are visible weekly, not discovered in biannual retrospective audits.",
  },
  {
    id: "win-3",
    title: "Meeting to file note (AI-assisted)",
    impact: "Time saved and compliance evidence",
    summary:
      "Meeting recordings produce structured file notes, actions, and tasks. Advisers review and approve before logging.",
    scope: "Copilot or equivalent with explicit human approval and no autonomous CRM updates.",
    doneWhen: "2-3 advisers use it routinely and file note turnaround becomes same-day.",
  },
  {
    id: "win-4",
    title: "Integration failure alerts",
    impact: "Confidence and risk reduction",
    summary:
      "Monitoring on critical automations so failures are alerted, not discovered days later.",
    scope: "Alerting for Salesforce-Stripe, Salesforce-Revex, and critical Zapier flows.",
    doneWhen: "No integration failure goes unnoticed for more than 24 hours.",
  },
];

const risks: Risk[] = [
  {
    id: "risk-1",
    title: "Salesforce config debt is deeper than visible",
    severity: "Medium-High",
    summary:
      "If the underlying data model is heavily customized in blocking ways, pilot timeline will compress.",
    mitigation:
      "Run a week-one Salesforce audit across objects, fields, flows, and permissions, then scope the pilot to what is achievable before rebuild proposals.",
  },
  {
    id: "risk-2",
    title: "Team capacity for change is constrained",
    severity: "Medium",
    summary:
      "Advisers and associates are already loaded with admin and paraplanning work, increasing change fatigue risk.",
    mitigation:
      "Ship only changes that make daily work easier. If the new path adds effort, it does not ship.",
  },
  {
    id: "risk-3",
    title: "Identifier inconsistency is worse than assumed",
    severity: "Medium",
    summary:
      "If matching is mostly name-based across Salesforce, Stripe, and Revex, revenue reporting depends on manual bridging first.",
    mitigation:
      "Assess identifier state in week one and ship bridging keys by week 3-4 if needed.",
  },
];

const asks: Ask[] = [
  {
    id: "ask-1",
    title: "Direct access to Salesforce admin config + Revex exports",
    why: "Truth mapping and config debt assessment cannot happen blind in week one.",
    decider: "Ed / Corey",
  },
  {
    id: "ask-2",
    title: "One pilot pod committed for 30 days",
    why: "The pilot must run through real work in an operating pod, not as a side project.",
    decider: "Ed + pod lead",
  },
  {
    id: "ask-3",
    title: "Decision on Salesforce direction before day 60",
    why: "Retain + uplift vs alternative path changes scope materially and needs early alignment.",
    decider: "Corey + Ed",
  },
];

const cadence: CadenceItem[] = [
  {
    id: "cadence-1",
    cadence: "Weekly",
    what: "Scoreboard update: metrics, shipped work, blockers",
    who: "CTO to leadership",
  },
  {
    id: "cadence-2",
    cadence: "Weekly",
    what: "Delivery review: pilot progress, next sprint, team feedback",
    who: "CTO + pilot pod",
  },
  {
    id: "cadence-3",
    cadence: "Fortnightly",
    what: "Roadmap review: 90-day arc check, scope adjustments, dependencies",
    who: "CTO + Ed",
  },
  {
    id: "cadence-4",
    cadence: "As needed",
    what: "Security/compliance lane: identity uplift, audit trail, incident response",
    who: "CTO + compliance lead",
  },
];

const phaseDrilldowns: DrilldownItem[] = timeline.map((phase) => {
  const content: string[] = [
    `Assertion: ${phase.assertion}`,
    "Focus:",
    ...phase.focus.map((item) => `- ${item}`),
    "Milestones:",
    ...phase.milestones.map((item) => `- ${item}`),
    "Deliverables:",
    ...phase.detail.deliverables.map((item) => `- ${item}`),
    "Owners:",
    ...phase.detail.owners.map((item) => `- ${item}`),
    "Dependencies:",
    ...phase.detail.dependencies.map((item) => `- ${item}`),
  ];

  if (phase.detail.keyQuestions?.length) {
    content.push("Key questions:", ...phase.detail.keyQuestions.map((item) => `- ${item}`));
  }

  if (phase.detail.risks?.length) {
    content.push("Risks:", ...phase.detail.risks.map((item) => `- ${item}`));
  }

  if (phase.detail.notes?.length) {
    content.push("Notes:", ...phase.detail.notes.map((item) => `- ${item}`));
  }

  return {
    id: phase.id,
    label: `${phase.range}: ${phase.title}`,
    kind: "phase",
    content,
  };
});

const winDrilldowns: DrilldownItem[] = earlyWins.map((win) => ({
  id: win.id,
  label: win.title,
  kind: "win",
  content: [
    `Impact: ${win.impact}`,
    `Summary: ${win.summary}`,
    `Scope: ${win.scope}`,
    `Done when: ${win.doneWhen}`,
  ],
}));

const riskDrilldowns: DrilldownItem[] = risks.map((risk) => ({
  id: risk.id,
  label: risk.title,
  kind: "risk",
  content: [
    `Severity: ${risk.severity}`,
    `Risk: ${risk.summary}`,
    `Mitigation: ${risk.mitigation}`,
  ],
}));

const askDrilldowns: DrilldownItem[] = asks.map((ask) => ({
  id: ask.id,
  label: ask.title,
  kind: "ask",
  content: [`Why: ${ask.why}`, `Who decides: ${ask.decider}`],
}));

export const ctoPlanContent: CtoPlanContent = {
  planTitle: "90-Day CTO Plan - Verse Wealth",
  oneLineThesis:
    "Stabilise what works, make one operating path the easiest path, and give the team wins they can feel - not a redesign they have to survive.",
  day90Outcomes,
  metrics,
  timeline,
  earlyWins,
  risks,
  asks,
  cadence,
  message:
    "I understand the business, respect what has been built, and will protect delivery while making the system structurally better - with wins the team can feel in weeks, not quarters.",
  drilldowns: [...phaseDrilldowns, ...winDrilldowns, ...riskDrilldowns, ...askDrilldowns],
};
