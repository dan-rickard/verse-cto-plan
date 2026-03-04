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
    text: 'No one asks "where is this at?" - onboarding, reviews, and advice production have visible stage, owner, and next action.',
  },
  {
    id: "outcome-2",
    text: "Client identifiers, fees, and revenue match across Salesforce, Stripe, and Revex - exceptions are surfaced weekly, not discovered biannually.",
  },
  {
    id: "outcome-3",
    text: "Identity, permissions, and comms logging are real - not assumed.",
  },
];

const timeline: TimelinePhase[] = [
  {
    id: "phase-30",
    range: "Days 1-30",
    title: "Understand the business + remove first friction",
    assertion:
      "Before changing anything, I understand how Verse actually runs - revenue, delivery, handoffs, and where the real bottlenecks are. And the team sees the first pain removed.",
    focus: [
      "Follow one real client end-to-end - lead through onboarding, advice production, implementation, review, and revenue recognition - and agree where each truth lives and where it breaks.",
      "Map pain and cost across pods. Rank work by ROI, not opinion.",
      "Identify three constraints: the bottleneck limiting adviser capacity (70-80% admin time), the compliance evidence gap (comms logging, file notes), and the revenue/data integrity failure point (Revex-Stripe-Salesforce mismatch).",
    ],
    milestones: [
      "Week 1-2: Client journey walkthrough complete across at least two pods. Source-of-truth map drafted for client records, portfolio data, fees, tasks, and documents - including what lives in Salesforce vs spreadsheets vs SharePoint vs Slack today.",
      "Week 3-4: Pilot team and journey selected (onboarding is the default - highest volume, sets data quality foundation). Stages, definition of done, and owners defined. Minimum monitoring live for integration failures and revenue exceptions.",
    ],
    detail: {
      deliverables: [
        "Source-of-truth map (Salesforce, Revex, Stripe, SharePoint, spreadsheets - what's canonical, what's duplicate)",
        "Pilot journey scope document (onboarding)",
        "Stage definitions with owners and definition of done",
        "Monitoring baseline (integration failures, revenue exceptions)",
      ],
      owners: ["CTO", "One adviser pod lead", "Ops/admin representative"],
      dependencies: [
        "Salesforce config access (current WealthConnect/FSC state)",
        "Revex data access + Stripe billing records",
        "2-3 hours with each pod in the first fortnight",
        "Clarity on what is Cloudwerx-supported vs internally configurable",
      ],
      keyQuestions: [
        "How much of the current Salesforce build is WealthConnect vs custom vs standard FSC?",
        "What is configured vs unused today - and what did the team stop using because it was clunky?",
        "Do consistent client identifiers exist across Salesforce, Stripe, and Revex - or is it mostly name matching?",
      ],
    },
  },
  {
    id: "phase-60",
    range: "Days 31-60",
    title: "Make the pilot inevitable",
    assertion:
      "The new way is live for one pod on onboarding - and it is measurably faster than Slack-chasing and spreadsheet cross-referencing.",
    focus: [
      "Auto-create tasks by stage in Salesforce with validation checks before doc generation - so paraplanners stop chasing missing inputs.",
      "Lock down the 10-20 fields that drive 80% of SOA merges and remove rekeying between Salesforce, spreadsheets, and Conga templates.",
      "Establish consistent identifiers across Salesforce, Stripe, and Revex - then stand up a revenue exceptions queue with clear weekly ownership.",
    ],
    milestones: [
      "Week 5-6: Automated task creation by stage live for onboarding in the pilot pod. Critical field validation active - missing data caught before SOA generation, not after.",
      "Week 7-8: Revenue exceptions queue operational. Identifier mapping documented and first bridging keys in place. Fee mismatches surfaced weekly instead of discovered in biannual audits.",
    ],
    detail: {
      deliverables: [
        "Pilot workflow live in Salesforce (onboarding - stages, tasks, validation)",
        "Field validation rules on critical SOA merge fields",
        "Revenue exceptions queue with owner and status",
        "Identifier mapping across Salesforce, Stripe, Revex",
      ],
      owners: ["CTO", "Salesforce admin/config resource (Cloudwerx or internal)", "Pilot pod"],
      dependencies: [
        "Salesforce admin capacity",
        "Revex data export access and naming convention agreement",
        "Agreement on definition of done per onboarding stage",
      ],
      notes: [
        "Scope narrows to top 3 friction stages first if Salesforce config debt is deeper than expected - protect delivery over scope.",
        "Conga value increases as Salesforce data gets richer. Don't rebuild templates until the data feeding them is clean.",
      ],
    },
  },
  {
    id: "phase-90",
    range: "Days 61-90",
    title: "Scale the pattern + lock governance",
    assertion:
      "A second journey is running the same pattern. Leadership has live operational metrics. Governance is documented, not assumed.",
    focus: [
      "Scale the workflow pattern to reviews or advice production - whichever the team ranks as highest-relief - with stage ownership and validation.",
      "Expose operational metrics for leadership: pipeline stage, workload by owner, bottlenecks, compliance completeness, and revenue exceptions.",
      "Lock governance: permissions aligned to least privilege, audit trail expectations documented for comms and client uploads, and change control for Salesforce config and integrations.",
    ],
    milestones: [
      "Week 9-10: Second journey live. Operational dashboard available to leadership - built in native Salesforce reports or Tableau depending on licensing decision.",
      "Week 11-12: Identity uplift underway - SSO/MFA enforcement, least privilege review across Salesforce and ShareFile, device posture baseline. Governance document delivered.",
    ],
    detail: {
      deliverables: [
        "Second journey live (reviews or advice production)",
        "Operational metrics dashboard (pipeline stage, workload, bottlenecks, compliance completeness, revenue exceptions)",
        "Governance framework: permissions, audit trail expectations, integration and config change control",
        "Identity and security uplift plan",
      ],
      owners: ["CTO", "Ops lead", "Compliance lead"],
      dependencies: [
        "Leadership alignment on second journey priority",
        "Reporting tooling decision (Tableau vs native Salesforce reports as interim)",
        "Compliance lead input on audit trail requirements for regulated advice artefacts",
      ],
      notes: [
        "CXM exploration stays disciplined - no portal build until data contracts, sync direction, conflict handling, and security model are clear. The Lovable wireframes are thoughtful; the risk is building on messy data.",
        "AI stays grounded: meeting-to-file-note and pre-meeting briefs (last interactions, stage, open actions, key client facts) with human approval. No autonomous CRM updates in regulated workflows.",
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
      "A single visible onboarding pipeline in Salesforce with stage, owner, and next action - so pod leads stop cross-referencing Slack, Trello, Smartsheet, and spreadsheets to answer one question.",
    scope: "Salesforce list view or lightweight dashboard - reconfiguration of what exists, not a rebuild.",
    doneWhen:
      'Any pod lead can answer "where is client X up to?" in one view without asking around or opening a spreadsheet.',
  },
  {
    id: "win-2",
    title: "Revenue exceptions queue",
    impact: "Revenue trust and anxiety reduction",
    summary:
      "Surface fee mismatches, missing fees, and delayed billing between Revex, Stripe, and Salesforce - with ownership assigned weekly instead of discovered in biannual retrospective audits.",
    scope:
      "Revex export into a structured exceptions list with owner, status, and resolution tracking. Naming mismatch handling documented.",
    doneWhen:
      "Revenue exceptions are visible weekly with a named owner. No fee discrepancy sits unnoticed for more than 7 days.",
  },
  {
    id: "win-3",
    title: "Meeting to file note (AI-assisted)",
    impact: "Time saved and compliance evidence",
    summary:
      "Meeting recordings produce structured file notes, actions, and tasks. Advisers review and approve before anything is logged - human-in-loop, no autonomous CRM updates.",
    scope:
      "Copilot (already in use for summaries) extended to structured output with explicit adviser sign-off. Compliance evidence improves as a byproduct.",
    doneWhen:
      "2-3 advisers use it routinely. File note turnaround drops to same-day. Compliance team can see logged evidence without chasing.",
  },
  {
    id: "win-4",
    title: "Integration failure alerts",
    impact: "Confidence and risk reduction",
    summary:
      "Monitoring on critical automations - Salesforce<->Stripe, Salesforce<->Revex, and high-value Zapier flows - so failures are alerted, not discovered days later by someone chasing a missing record.",
    scope:
      "Alerting and basic error logging for the integrations that touch revenue and client data. Not a full observability build - just enough to stop silent failures.",
    doneWhen:
      "No critical integration failure goes unnoticed for more than 24 hours. Failures have a named owner and documented resolution path.",
  },
];

const metrics: Metric[] = [
  {
    id: "metric-team-sentiment",
    metric: "Team sentiment (are the wins felt)",
    target: "Clear positive trend in fortnightly pulse",
    measuredBy:
      'One-question pulse to advisers, paraplanners, and ops: "Is tech making your day-to-day work easier this fortnight?"',
  },
  {
    id: "metric-business-understanding",
    metric: "Deep business understanding",
    target:
      "CTO can map Verse's client journey, revenue model, and operational bottlenecks as well as any pod lead",
    measuredBy:
      "Validated end-to-end walkthroughs across onboarding, advice production, implementation, reviews, and revenue recognition - with source-of-truth agreed per data domain",
  },
  {
    id: "metric-data-salesforce",
    metric: "Data + Salesforce foundations live",
    target:
      "Canonical source-of-truth map complete. Pilot workflow live in Salesforce - not in Trello, Smartsheet, or a spreadsheet.",
    measuredBy:
      "Signed data map across Salesforce, Revex, Stripe, and SharePoint. Active stage automation running in the pilot pod with tasks, validation, and definition of done.",
  },
  {
    id: "metric-workflow-visibility",
    metric: "Workflow visibility across the business",
    target: "Stage, owner, and next action visible for active client work",
    measuredBy:
      'Leadership and pod leads can answer "where is this at?" in one Salesforce view - no Slack chase, no spreadsheet lookup.',
  },
];

const cadence: CadenceItem[] = [
  {
    id: "cadence-1",
    cadence: "Weekly",
    what: "Scoreboard update: metrics, shipped work, blockers",
    who: "CTO -> Ed + leadership",
  },
  {
    id: "cadence-2",
    cadence: "Weekly",
    what: "Delivery review: pilot progress, next sprint scope, team feedback",
    who: "CTO + pilot pod",
  },
  {
    id: "cadence-3",
    cadence: "Fortnightly",
    what: "Roadmap review: 90-day arc check, scope adjustments, dependency flags",
    who: "CTO + Ed",
  },
  {
    id: "cadence-4",
    cadence: "As needed",
    what: "Security and compliance lane: identity uplift, audit trail, incident response",
    who: "CTO + compliance lead",
  },
];

export const ctoPlanContent: CtoPlanContent = {
  planTitle: "90-Day CTO Plan - Verse Wealth",
  oneLineThesis:
    "Stabilise delivery, make Salesforce the easiest path - not the avoided one - and give advisers and paraplanners wins they feel in weeks, not quarters.",
  day90Outcomes,
  timeline,
  earlyWins,
  metrics,
  cadence,
  message:
    "I understand how Verse runs, respect what's been built to protect delivery at 45% growth, and will make the system structurally better - with wins advisers, paraplanners, and ops feel in weeks, not quarters. If the new way isn't easier for staff, it doesn't ship.",
};
