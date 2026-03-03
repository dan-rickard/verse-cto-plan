export type Outcome = { id: string; text: string };

export type Metric = {
  id: string;
  metric: string;
  target: string;
  measuredBy: string;
};

export type TimelinePhase = {
  id: string;
  range: string;
  title: string;
  assertion: string;
  focus: string[];
  milestones: string[];
  detail: {
    deliverables: string[];
    owners: string[];
    dependencies: string[];
    keyQuestions?: string[];
    notes?: string[];
  };
};

export type EarlyWin = {
  id: string;
  title: string;
  impact: string;
  summary: string;
  scope: string;
  doneWhen: string;
};

export type Risk = {
  id: string;
  title: string;
  severity: "Medium" | "Medium-High" | "High";
  summary: string;
  mitigation: string;
};

export type Ask = {
  id: string;
  title: string;
  why: string;
  decider: string;
};

export type DrilldownItem = {
  id: string;
  label: string;
  kind: "phase" | "win" | "risk" | "ask";
  content: string[];
};

export type CadenceItem = {
  id: string;
  cadence: string;
  what: string;
  who: string;
};

export type CtoPlanContent = {
  planTitle: string;
  oneLineThesis: string;
  day90Outcomes: Outcome[];
  timeline: TimelinePhase[];
  earlyWins: EarlyWin[];
  metrics: Metric[];
  cadence: CadenceItem[];
  message: string;
};
