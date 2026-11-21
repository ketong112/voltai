// VoltAI — shared types for one electrical-problem analysis.
//
// One AI call returns this whole structure as JSON (cloud: responseSchema,
// on-device: responseConstraint). The mock engine returns the same shape.

export type Likelihood = "High" | "Medium" | "Low";
export type Difficulty = "Easy" | "Medium" | "Hard" | "Pro only";

export interface DiagnosisCause {
  cause: string;
  likelihood: Likelihood;
  explanation: string;
}

export interface FixStepSet {
  cause: string;
  difficulty: Difficulty;
  tools: string[];
  steps: string[];
}

export interface CostEstimate {
  currency: string;
  partsLow: number;
  partsHigh: number;
  laborLow: number;
  laborHigh: number;
  notes: string;
}

export interface AnalysisResult {
  diagnosis: DiagnosisCause[];
  fixSteps: FixStepSet[];
  costEstimate: CostEstimate;
  safetyChecklist: string[];
  callAPro: {
    when: string[];
    why: string;
  };
}

export interface Analysis {
  result: AnalysisResult;
  /** Where the answer actually ran: ON_DEVICE | IN_CLOUD | DEMO | UNKNOWN */
  source: string;
  /** True when the answer came from the built-in rule engine, not the model. */
  isDemo: boolean;
}

export type Lang = "en" | "id";

export interface HistoryEntry {
  id: string;
  problem: string;
  lang: Lang;
  when: string;
  source: string;
  topCause: string;
}
