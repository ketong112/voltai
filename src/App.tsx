import { useEffect, useState } from "react";
import {
  aiAnalyze,
  checkNanoAvailability,
  getDeviceModelReady,
  isConfigured,
  prepareOnDeviceModel,
} from "./ai.js";
import { mockAnalyze, SAMPLES } from "./mock-engine.js";
import { formatIDR, t } from "./i18n.js";
import type { Analysis, HistoryEntry, Lang } from "./types.js";

const HISTORY_KEY = "voltai-history-v1";

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

function badgeClass(source: string): string {
  if (source === "ON_DEVICE") return "badge badge-on-device";
  if (source === "IN_CLOUD") return "badge badge-in-cloud";
  if (source === "DEMO") return "badge badge-demo";
  return "badge badge-unknown";
}

function badgeLabel(source: string, lang: Lang): string {
  if (source === "ON_DEVICE") return t(lang, "sourceOnDevice");
  if (source === "IN_CLOUD") return t(lang, "sourceInCloud");
  if (source === "DEMO") return t(lang, "sourceDemo");
  return t(lang, "sourceUnknown");
}

function likelihoodClass(l: string): string {
  if (l === "High") return "pill pill-high";
  if (l === "Medium") return "pill pill-medium";
  return "pill pill-low";
}

/** Schema enums are English; translate the pill text in ID mode. */
function pillText(value: string, lang: Lang): string {
  if (lang === "en") return value;
  const map: Record<string, string> = {
    High: "Tinggi",
    Medium: "Sedang",
    Low: "Rendah",
    Easy: "Mudah",
    Hard: "Sulit",
    "Pro only": "Tukang saja",
  };
  return map[value] ?? value;
}

function difficultyClass(d: string): string {
  if (d === "Easy") return "pill pill-easy";
  if (d === "Medium") return "pill pill-medium";
  if (d === "Hard") return "pill pill-hard";
  return "pill pill-pro";
}

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [problem, setProblem] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nanoStatus, setNanoStatus] = useState("unknown");
  const [modelState, setModelState] = useState<
    "idle" | "preparing" | "ready" | "failed"
  >("idle");
  const [history, setHistory] = useState<HistoryEntry[]>(() => loadHistory());

  useEffect(() => {
    if (!isConfigured) return;
    checkNanoAvailability().then((s) => setNanoStatus(s));
    if (getDeviceModelReady()) setModelState("ready");
  }, []);

  function saveHistory(entry: HistoryEntry) {
    setHistory((prev) => {
      const next = [entry, ...prev.filter((h) => h.problem !== entry.problem)].slice(0, 10);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      } catch {
        /* storage full or unavailable — history is best-effort */
      }
      return next;
    });
  }

  async function runAnalysis() {
    const text = problem.trim();
    if (!text) {
      setError(t(lang, "errorEmpty"));
      return;
    }
    setError("");
    setLoading(true);
    setAnalysis(null);
    try {
      let result: Analysis;
      if (!isConfigured) {
        result = {
          result: mockAnalyze(text, lang),
          source: "DEMO",
          isDemo: true,
        };
      } else {
        const ai = await aiAnalyze(text, lang);
        result = { result: ai.result, source: ai.source, isDemo: false };
      }
      setAnalysis(result);
      saveHistory({
        id: `${Date.now()}`,
        problem: text,
        lang,
        when: new Date().toISOString(),
        source: result.source,
        topCause: result.result.diagnosis[0]?.cause ?? "",
      });
    } catch (err) {
      setError(
        `${t(lang, "errorFailed")} (${err instanceof Error ? err.message : String(err)})`,
      );
    } finally {
      setLoading(false);
    }
  }

  async function handlePrepareModel() {
    setModelState("preparing");
    const res = await prepareOnDeviceModel();
    setModelState(res.ok ? "ready" : "failed");
    if (res.ok) setNanoStatus("available");
  }

  function useSample(sampleText: string) {
    setProblem(sampleText);
    setError("");
    setAnalysis(null);
  }

  const r = analysis?.result;
  const totalLow = r ? r.costEstimate.partsLow + r.costEstimate.laborLow : 0;
  const totalHigh = r ? r.costEstimate.partsHigh + r.costEstimate.laborHigh : 0;

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-top">
          <div>
            <h1>
              <span className="bolt" aria-hidden="true">
                ⚡
              </span>{" "}
              VoltAI
            </h1>
            <p className="tagline">{t(lang, "tagline")}</p>
          </div>
          <div className="lang-toggle" role="group" aria-label="Language">
            <button
              className={lang === "en" ? "active" : ""}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              className={lang === "id" ? "active" : ""}
              onClick={() => setLang("id")}
            >
              ID
            </button>
          </div>
        </div>
        <p className="subtitle">{t(lang, "subtitle")}</p>
        {!isConfigured ? (
          <div className="banner banner-demo">{t(lang, "demoBanner")}</div>
        ) : (
          <div className="banner banner-live">{t(lang, "configuredBanner")}</div>
        )}
        {isConfigured && (
          <div className="nano-row">
            <span className={`nano-pill nano-${nanoStatus}`}>
              {nanoStatus === "available" || modelState === "ready"
                ? t(lang, "nanoReady")
                : nanoStatus === "not-supported" || nanoStatus === "unavailable"
                  ? t(lang, "nanoNotAvailable")
                  : t(lang, "nanoUnknown")}
            </span>
            {modelState === "idle" && (
              <button className="btn-secondary" onClick={handlePrepareModel}>
                {t(lang, "prepareModel")}
              </button>
            )}
            {modelState === "preparing" && (
              <span className="muted">{t(lang, "preparingModel")}</span>
            )}
            {modelState === "ready" && (
              <span className="ok-text">{t(lang, "modelReady")}</span>
            )}
            {modelState === "failed" && (
              <span className="warn-text">{t(lang, "modelFailed")}</span>
            )}
          </div>
        )}
      </header>

      <main>
        <section className="card input-card">
          <label htmlFor="problem">{t(lang, "inputLabel")}</label>
          <textarea
            id="problem"
            rows={3}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder={t(lang, "inputPlaceholder")}
          />
          <div className="samples">
            <span>{t(lang, "samples")}</span>
            <div className="chips">
              {SAMPLES.map((s) => (
                <button
                  key={s.mockId}
                  className="chip"
                  onClick={() => useSample(lang === "id" ? s.id : s.en)}
                >
                  {lang === "id" ? s.id : s.en}
                </button>
              ))}
            </div>
          </div>
          <button
            className="btn-primary"
            onClick={runAnalysis}
            disabled={loading}
          >
            {loading ? t(lang, "analyzing") : t(lang, "analyze")}
          </button>
          {error && (
            <p className="error">
              {error}{" "}
              <button className="link-btn" onClick={runAnalysis}>
                {t(lang, "tryAgain")}
              </button>
            </p>
          )}
        </section>

        {analysis && r && (
          <div className="results">
            <div className="result-head">
              <h2>{t(lang, "yourProblem")}</h2>
              <span className={badgeClass(analysis.source)}>
                {badgeLabel(analysis.source, lang)}
              </span>
            </div>
            <p className="problem-quote">“{problem.trim()}”</p>

            <section className="card">
              <h2>1 · {t(lang, "diagnosis")}</h2>
              <ol className="diagnosis-list">
                {r.diagnosis.map((d, i) => (
                  <li key={i}>
                    <div className="diag-head">
                      <strong>{d.cause}</strong>
                      <span className={likelihoodClass(d.likelihood)}>
                        {pillText(d.likelihood, lang)}
                      </span>
                    </div>
                    <p>{d.explanation}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="card">
              <h2>2 · {t(lang, "fixSteps")}</h2>
              {r.fixSteps.map((f, i) => (
                <div key={i} className="fix-block">
                  <div className="fix-head">
                    <strong>{f.cause}</strong>
                    <span className={difficultyClass(f.difficulty)}>
                      {t(lang, "difficulty")}: {pillText(f.difficulty, lang)}
                    </span>
                  </div>
                  <p className="tools">
                    {t(lang, "tools")}: {f.tools.join(" · ")}
                  </p>
                  <ol className="steps-list">
                    {f.steps.map((s, j) => (
                      <li key={j}>{s}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </section>

            <section className="card">
              <h2>3 · {t(lang, "costEstimate")}</h2>
              <div className="cost-grid">
                <div>
                  <span className="cost-label">{t(lang, "parts")}</span>
                  <strong>
                    {formatIDR(r.costEstimate.partsLow)} –{" "}
                    {formatIDR(r.costEstimate.partsHigh)}
                  </strong>
                </div>
                <div>
                  <span className="cost-label">{t(lang, "labor")}</span>
                  <strong>
                    {formatIDR(r.costEstimate.laborLow)} –{" "}
                    {formatIDR(r.costEstimate.laborHigh)}
                  </strong>
                </div>
                <div className="cost-total">
                  <span className="cost-label">{t(lang, "total")}</span>
                  <strong>
                    {formatIDR(totalLow)} – {formatIDR(totalHigh)}
                  </strong>
                </div>
              </div>
              <p className="muted">{r.costEstimate.notes}</p>
              <p className="muted small">{t(lang, "costNote")}</p>
            </section>

            <section className="card card-safety">
              <h2>⚠ 4 · {t(lang, "safety")}</h2>
              <ul className="check-list">
                {r.safetyChecklist.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </section>

            <section className="card card-pro">
              <h2>🛑 5 · {t(lang, "callAPro")}</h2>
              <ul className="check-list">
                {r.callAPro.when.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
              <p>
                <strong>{t(lang, "whyPro")}: </strong>
                {r.callAPro.why}
              </p>
            </section>

            <button
              className="btn-secondary"
              onClick={() => {
                setAnalysis(null);
                setProblem("");
              }}
            >
              {t(lang, "newAnalysis")}
            </button>
          </div>
        )}

        <section className="card how">
          <h2>{t(lang, "howTitle")}</h2>
          <p>{t(lang, "howBody")}</p>
        </section>

        <section className="card">
          <h2>{t(lang, "history")}</h2>
          {history.length === 0 ? (
            <p className="muted">{t(lang, "historyEmpty")}</p>
          ) : (
            <>
              <ul className="history-list">
                {history.map((h) => (
                  <li key={h.id}>
                    <button
                      className="link-btn history-item"
                      onClick={() => useSample(h.problem)}
                    >
                      {h.problem}
                    </button>{" "}
                    <span className={badgeClass(h.source)}>{h.source}</span>
                  </li>
                ))}
              </ul>
              <button
                className="btn-secondary"
                onClick={() => {
                  setHistory([]);
                  try {
                    localStorage.removeItem(HISTORY_KEY);
                  } catch {
                    /* ignore */
                  }
                }}
              >
                {t(lang, "clearHistory")}
              </button>
            </>
          )}
        </section>
      </main>

      <footer>
        <p className="disclaimer">{t(lang, "disclaimer")}</p>
        <p className="muted small">{t(lang, "footer")}</p>
      </footer>
    </div>
  );
}
