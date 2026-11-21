// VoltAI — Firebase AI Logic (hybrid inference) wrapper.
//
// API verified against the official docs (read live 2026-11-21) and against
// the installed SDK (firebase 13.4.0: getAI, getGenerativeModel,
// GoogleAIBackend, InferenceMode, Schema, response.inferenceSource).
// Same proven pattern as ClauseCheck (~/workspace/firebase-hybrid-ai/app/).
//
// One analysis = ONE model call returning the whole structured result
// (diagnosis + fix steps + cost estimate + safety checklist + call-a-pro).
// That keeps free-tier quota use to 1 request per analysis (20/day/project).
//
// Model: PREFER_ON_DEVICE — Gemini Nano 4 on-device first (private + fast),
// Gemini Flash in the cloud as fallback. Cloud model pinned explicitly to
// gemini-3.8-flash: gemini-2.5-flash / 2.0-flash are deprecated for new users
// (404), and 3.8-flash is Google's recommended replacement. 3.8-flash is
// flaky under load (500 "high demand", 503 "Deadline expired") — cloud calls
// retry with exponential backoff.
//
// On-device web inference is single-turn text generation only (no chat) —
// the analysis below is a single generateContent() call.
// initializeDeviceModel() MUST be called after a user gesture and before
// any generateContent() on a hybrid/on-device model (docs Step 6).

import { initializeApp } from "firebase/app";
import {
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
  InferenceMode,
  Schema,
} from "firebase/ai";
import { firebaseConfig, CONFIGURED } from "./firebase-config.js";
import type { AnalysisResult, Lang } from "./types.js";

export const isConfigured = CONFIGURED;

export const CLOUD_MODEL = "gemini-3.8-flash";

let ai: ReturnType<typeof getAI> | null = null;
let deviceModelReady = false;

export function initFirebase() {
  if (!CONFIGURED) return null;
  if (ai) return ai;
  const app = initializeApp(firebaseConfig);
  ai = getAI(app, { backend: new GoogleAIBackend() });
  return ai;
}

// ---- Structured-output schema (JSON in cloud, responseConstraint on-device)
const analysisSchema = Schema.object({
  properties: {
    diagnosis: Schema.array({
      items: Schema.object({
        properties: {
          cause: Schema.string({
            description: "Short name of the likely cause.",
          }),
          likelihood: Schema.enumString({
            enum: ["High", "Medium", "Low"],
            description: "How likely this cause is, given the symptoms.",
          }),
          explanation: Schema.string({
            description:
              "One or two plain sentences: why this cause fits the symptoms.",
          }),
        },
      }),
    }),
    fixSteps: Schema.array({
      items: Schema.object({
        properties: {
          cause: Schema.string({
            description: "The cause these fix steps address.",
          }),
          difficulty: Schema.enumString({
            enum: ["Easy", "Medium", "Hard", "Pro only"],
            description:
              "Easy = safe for a careful homeowner; Medium = needs basic tools and care; Hard = experienced DIY only; Pro only = do not attempt, call an electrician.",
          }),
          tools: Schema.array({
            items: Schema.string({
              description: "One tool or material needed for this fix.",
            }),
          }),
          steps: Schema.array({
            items: Schema.string({
              description: "One numbered repair step, in order.",
            }),
          }),
        },
      }),
    }),
    costEstimate: Schema.object({
      properties: {
        currency: Schema.string({ description: 'Currency code, "IDR".' }),
        partsLow: Schema.integer({
          description: "Low end of parts/materials cost in IDR.",
        }),
        partsHigh: Schema.integer({
          description: "High end of parts/materials cost in IDR.",
        }),
        laborLow: Schema.integer({
          description: "Low end of electrician labour cost in IDR, 0 if DIY.",
        }),
        laborHigh: Schema.integer({
          description: "High end of electrician labour cost in IDR.",
        }),
        notes: Schema.string({
          description:
            "One or two sentences: what drives the cost up or down, and that prices are rough estimates for Indonesia.",
        }),
      },
    }),
    safetyChecklist: Schema.array({
      items: Schema.string({
        description:
          "One specific safety precaution for this problem (turn off the MCB, test with a tester, insulated tools, never work live, dry hands, etc.).",
      }),
    }),
    callAPro: Schema.object({
      properties: {
        when: Schema.array({
          items: Schema.string({
            description:
              "One specific situation where the user must stop and call a licensed electrician.",
          }),
        }),
        why: Schema.string({
          description:
            "One or two sentences: why these situations are too dangerous for DIY.",
        }),
      },
    }),
  },
});

function analysisModel() {
  const backend = initFirebase();
  if (!backend) throw new Error("Firebase is not configured.");
  return getGenerativeModel(backend, {
    mode: InferenceMode.PREFER_ON_DEVICE,
    inCloudParams: {
      model: CLOUD_MODEL,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    },
    onDeviceParams: { promptOptions: { responseConstraint: analysisSchema } },
  });
}

/** Call from a user gesture (button click) before on-device use. */
export async function prepareOnDeviceModel(
  onProgress?: (p: number) => void,
): Promise<{ ok: boolean; reason?: string }> {
  if (!CONFIGURED) return { ok: false, reason: "not-configured" };
  try {
    await analysisModel().initializeDeviceModel((p) => {
      if (onProgress) onProgress(p);
    });
    deviceModelReady = true;
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : String(err) };
  }
}

export function getDeviceModelReady(): boolean {
  return deviceModelReady;
}

// ---- Prompt API availability (Chrome built-in AI status indicator)
export async function checkNanoAvailability(): Promise<string> {
  if (typeof window === "undefined" || !("LanguageModel" in window)) {
    return "not-supported"; // not Chrome desktop 139+, or API absent
  }
  try {
    return await (
      window as unknown as {
        LanguageModel: { availability: () => Promise<string> };
      }
    ).LanguageModel.availability();
  } catch {
    return "unavailable";
  }
}

// ---- Retry helper: cloud calls get exponential backoff on 503/429/500.
// The model also returns HTTP 500 "high demand" when overloaded; that is
// transient too, so it is retried as well.
function isRetryable(err: unknown): boolean {
  const msg = String((err as { message?: string })?.message || err);
  return /503|429|500|overloaded|high demand|quota|rate limit/i.test(msg);
}

async function withRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let delay = 1000;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      if (!isRetryable(err) || i === attempts - 1) throw err;
      await new Promise((r) => setTimeout(r, delay));
      delay *= 2;
    }
  }
  throw new Error("Retry loop ended unexpectedly.");
}

function parseJson(text: string): unknown {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Model did not return JSON.");
  return JSON.parse(text.slice(start, end + 1));
}

function sourceOf(response: { inferenceSource?: unknown }): string {
  // The SDK returns 'on_device' / 'in_cloud' (lowercase values); the badge
  // map uses the uppercase keys, so normalise here. Unknown -> "UNKNOWN".
  const s = response?.inferenceSource;
  if (typeof s === "string") return s.toUpperCase();
  return "UNKNOWN";
}

function buildPrompt(problem: string, lang: Lang): string {
  const language = lang === "id" ? "Bahasa Indonesia" : "English";
  return `You are VoltAI, an AI assistant for house electricians and homeowners in Indonesia. A user describes an electrical problem at home. Analyse it and return a structured JSON answer with exactly these parts:

1. diagnosis — the 2-4 most likely causes, ranked, each with a likelihood (High/Medium/Low) and a plain explanation of why it fits the symptoms.
2. fixSteps — for the top 2 causes, step-by-step repair instructions in order, a difficulty (Easy/Medium/Hard/Pro only), and the tools/materials needed. "Pro only" means the user must NOT attempt it.
3. costEstimate — estimated cost in Indonesian Rupiah (IDR): parts low/high and electrician labour low/high, plus one or two sentences on what drives the cost. Use realistic Indonesian prices (e.g. MCB 6A-16A Rp 35.000-120.000, stopkontak Rp 25.000-80.000, kabel NYM 2x1.5mm per meter Rp 8.000-15.000, electrician visit Rp 100.000-300.000).
4. safetyChecklist — 4-6 specific safety precautions for THIS problem: always turn off the MCB first, test that the circuit is dead with a test pen, use insulated tools, dry hands and dry floor, never work on a live circuit, keep water away.
5. callAPro — specific situations where the user must stop and call a licensed electrician (burning smell, sparks, hot breaker, buzzing panel, water near the panel, repeated tripping after a fix), plus one or two sentences on why these are too dangerous for DIY.

Write the whole answer in ${language}. Be concrete and practical, like a real electrician talking to a homeowner. Never advise working on a live circuit. Do not give advice that violates electrical safety codes.

PROBLEM:
${problem}`;
}

/** Full analysis — ONE model call, PREFER_ON_DEVICE (Nano first, cloud fallback). */
export async function aiAnalyze(
  problem: string,
  lang: Lang,
): Promise<{ result: AnalysisResult; source: string }> {
  const prompt = buildPrompt(problem, lang);
  const result = await withRetry(() =>
    analysisModel().generateContent(prompt),
  );
  const data = parseJson(result.response.text()) as AnalysisResult;
  return { result: data, source: sourceOf(result.response) };
}
