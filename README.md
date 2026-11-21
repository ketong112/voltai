# VoltAI — AI Assistant for House Electricians

[![SLAY HACKS 2026](https://img.shields.io/badge/SLAY%20HACKS-2026-orange)](https://slayy-hacks.devpost.com/)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Live demo](https://img.shields.io/badge/Live%20demo-GitHub%20Pages-brightgreen)](https://ketong112.github.io/voltai/)
[![Firebase AI Logic](https://img.shields.io/badge/AI-Firebase%20AI%20Logic%20%7C%20Gemini-ffca28)](https://firebase.google.com/docs/ai-logic)

**Live demo:** https://ketong112.github.io/voltai/

Describe an electrical problem at home — "The MCB keeps tripping", "lights flicker",
"outlet is dead" — and VoltAI returns a full analysis:

1. **Diagnosis** — ranked likely causes with a likelihood (High / Medium / Low) and a plain explanation.
2. **Fix steps** — step-by-step repair instructions per cause, with a difficulty level (Easy / Medium / Hard / Pro only) and the tools needed.
3. **Cost estimate** — parts + electrician labour in Indonesian Rupiah (IDR), with a breakdown.
4. **Safety checklist** — safety precautions specific to the problem (turn off the MCB, test with a test pen, insulated tools, never work live).
5. **When to call a pro** — clear guidance on when the problem is too dangerous for DIY and a licensed electrician must be called.

Built for **SLAY HACKS 2026** (Devpost). English is the primary language; an **EN/ID toggle**
switches the whole app — including 6 sample problems — into Bahasa Indonesia.

## Why this exists

Homeowners and small electricians in Indonesia face the same problems every day —
a tripping MCB, a flickering lamp, a dead socket — and the usual answers are a
random forum post or a costly call-out for a five-minute fix. VoltAI gives a
structured, safety-first answer in seconds: what it probably is, what to try,
what it should cost, and — most importantly — when to stop and call a pro.
The safety checklist and the "when to call a pro" section are not an
afterthought: they are the responsible-AI core of the app.

## How the AI works

VoltAI runs on **Firebase AI Logic** with **Gemini**. One analysis is **one model
call** returning the whole structured result as JSON (diagnosis + fix steps +
cost + safety + call-a-pro), which keeps free-tier quota use to 1 request per
analysis.

- **Inference mode:** `PREFER_ON_DEVICE` — Gemini Nano 4 runs on-device when the
  browser supports it (private and instant), with Gemini Flash in the cloud as
  fallback. Cloud model is pinned to `gemini-3.8-flash`.
- **Transparency:** every answer shows a badge telling you where it actually
  ran — `ON_DEVICE`, `IN_CLOUD`, or `DEMO`.
- **Demo mode:** until a real Firebase config is pasted in, the app works
  end-to-end with a built-in rule-based engine (6 common problems, bilingual,
  written from a real house electrician's playbook). Demo answers are clearly
  badged `DEMO` and never presented as AI. No data leaves the browser in demo
  mode.
- **Resilience:** cloud calls retry with exponential backoff on 503 / 429 / 500
  ("high demand") errors.

## Tech stack

- Vite 8 + React 19 + TypeScript
- Firebase AI Logic (`firebase` npm package, SDK 13.4.0) — `GoogleAIBackend`,
  `InferenceMode.PREFER_ON_DEVICE`, structured output via `responseSchema` /
  `responseConstraint`
- CSS only — no AI-generated images
- GitHub Pages hosting

## Run it locally

```bash
npm install
npm run build
npm run preview   # serves dist/ on http://localhost:4173
```

The app works out of the box in **demo mode** (no config needed).

## Enable live AI (Firebase)

1. Sign in to the [Firebase console](https://console.firebase.google.com) and
   create a project (e.g. `voltai`).
2. Open **AI Services > AI Logic**, click **Get started**, choose the
   **Gemini Developer API** provider.
3. **Important:** in the Firebase console, open **App Check** and set
   enforcement for "Firebase AI Logic" to **Unenforced (monitoring only)** —
   the app does not initialise App Check, and enforcement blocks cloud calls
   with a 401 error.
4. Register a **Web app** in the project and copy the `firebaseConfig` object.
5. Paste the values into `src/firebase-config.ts` (replacing the
   `PASTE_YOUR_…` placeholders).
6. Rebuild and redeploy: `npm run build && npx gh-pages -d dist`.

## Deploy

```bash
npm run build
npx gh-pages -d dist   # publishes dist/ to the gh-pages branch
```

Then in the repo **Settings → Pages**, set the source to the `gh-pages` branch.
The site lands at `https://ketong112.github.io/voltai/` (relative `base: "./"` is
already set in `vite.config.ts`).

## Disclaimer

VoltAI explains — it does not replace a licensed electrician. Never work on a
live circuit. If you are unsure, stop and call a pro. Cost estimates are rough
2026 estimates for Indonesia and vary by brand and region.

## License

Apache License 2.0 — see [LICENSE](LICENSE).
