// VoltAI — UI strings, English + Bahasa Indonesia.

import type { Lang } from "./types.js";

export const STRINGS: Record<Lang, Record<string, string>> = {
  en: {
    tagline: "AI assistant for house electricians",
    subtitle:
      "Describe an electrical problem at home. VoltAI diagnoses the likely causes, gives step-by-step fix instructions, estimates the cost in Rupiah, and tells you exactly when to stop and call a licensed electrician.",
    inputLabel: "What is the problem?",
    inputPlaceholder:
      'e.g. "The MCB keeps tripping whenever I turn on the rice cooker"',
    analyze: "Analyse the problem",
    analyzing: "Analysing…",
    samples: "Try a sample problem:",
    diagnosis: "Diagnosis — likely causes",
    fixSteps: "Fix steps",
    costEstimate: "Cost estimate",
    safety: "Safety checklist — read this first",
    callAPro: "When to call a pro",
    tools: "Tools & materials",
    difficulty: "Difficulty",
    parts: "Parts",
    labor: "Labour (electrician)",
    total: "Total estimate",
    whyPro: "Why this is too dangerous for DIY",
    disclaimer:
      "VoltAI explains — it does not replace a licensed electrician. Never work on a live circuit. If you are unsure, stop and call a pro. Prices are rough 2026 estimates for Indonesia.",
    howTitle: "How the AI works",
    howBody:
      "VoltAI runs on Firebase AI Logic with Gemini. The analysis runs on-device with Gemini Nano 4 when your browser supports it (private and instant), and falls back to Gemini Flash in the cloud. Every answer shows a badge telling you where it actually ran.",
    history: "Recent analyses",
    historyEmpty: "No analyses yet — run one above.",
    clearHistory: "Clear history",
    demoBanner:
      "DEMO MODE — no Firebase project is configured yet, so answers come from a built-in rule engine, not the AI model. Connect Firebase to enable live AI.",
    configuredBanner:
      "Live AI connected — answers come from Gemini via Firebase AI Logic.",
    nanoReady: "Gemini Nano: ready on this device",
    nanoNotAvailable: "Gemini Nano: not available — cloud fallback will be used",
    nanoUnknown: "Gemini Nano: checking…",
    prepareModel: "Prepare on-device model",
    preparingModel: "Preparing model…",
    modelReady: "On-device model ready",
    modelFailed: "On-device model unavailable on this device",
    errorEmpty: "Please describe the problem first.",
    errorFailed: "Analysis failed. Please try again.",
    tryAgain: "Try again",
    yourProblem: "Your problem",
    newAnalysis: "New analysis",
    sourceDemo: "DEMO",
    sourceOnDevice: "ON_DEVICE · Gemini Nano (on-device)",
    sourceInCloud: "IN_CLOUD · Gemini Flash (cloud)",
    sourceUnknown: "SOURCE UNKNOWN",
    costNote: "Rough estimate — actual prices vary by brand and region.",
    footer:
      "VoltAI — built for SLAY HACKS 2026. For homeowners and electricians in Indonesia.",
  },
  id: {
    tagline: "Asisten AI untuk tukang listrik rumah",
    subtitle:
      "Jelaskan masalah listrik di rumah. VoltAI mendiagnosa kemungkinan penyebabnya, memberi langkah perbaikan, memperkirakan biaya dalam Rupiah, dan memberi tahu kapan harus berhenti dan memanggil tukang listrik berlisensi.",
    inputLabel: "Apa masalahnya?",
    inputPlaceholder:
      'contoh: "MCB sering trip setiap kali rice cooker dinyalakan"',
    analyze: "Analisa masalah",
    analyzing: "Menganalisa…",
    samples: "Coba contoh masalah:",
    diagnosis: "Diagnosa — kemungkinan penyebab",
    fixSteps: "Langkah perbaikan",
    costEstimate: "Perkiraan biaya",
    safety: "Checklist keselamatan — baca dulu",
    callAPro: "Kapan harus panggil tukang",
    tools: "Alat & bahan",
    difficulty: "Tingkat kesulitan",
    parts: "Suku cadang",
    labor: "Ongkos tukang listrik",
    total: "Total perkiraan",
    whyPro: "Kenapa ini terlalu berbahaya untuk DIY",
    disclaimer:
      "VoltAI hanya menjelaskan — bukan pengganti tukang listrik berlisensi. Jangan pernah kerjakan sirkuit yang masih berarus. Kalau ragu, berhenti dan panggil tukang. Harga adalah perkiraan kasar 2026 untuk Indonesia.",
    howTitle: "Cara kerja AI-nya",
    howBody:
      "VoltAI berjalan di Firebase AI Logic dengan Gemini. Analisa berjalan di perangkat dengan Gemini Nano 4 kalau browser mendukung (privat dan instan), dan beralih ke Gemini Flash di cloud kalau tidak. Setiap jawaban menampilkan badge yang menunjukkan di mana ia benar-benar berjalan.",
    history: "Analisa terakhir",
    historyEmpty: "Belum ada analisa — jalankan satu di atas.",
    clearHistory: "Hapus riwayat",
    demoBanner:
      "MODE DEMO — belum ada proyek Firebase yang terhubung, jadi jawaban berasal dari mesin aturan bawaan, bukan model AI. Hubungkan Firebase untuk mengaktifkan AI live.",
    configuredBanner:
      "AI live terhubung — jawaban berasal dari Gemini lewat Firebase AI Logic.",
    nanoReady: "Gemini Nano: siap di perangkat ini",
    nanoNotAvailable: "Gemini Nano: tidak tersedia — akan memakai cloud",
    nanoUnknown: "Gemini Nano: memeriksa…",
    prepareModel: "Siapkan model on-device",
    preparingModel: "Menyiapkan model…",
    modelReady: "Model on-device siap",
    modelFailed: "Model on-device tidak tersedia di perangkat ini",
    errorEmpty: "Jelaskan dulu masalahnya.",
    errorFailed: "Analisa gagal. Silakan coba lagi.",
    tryAgain: "Coba lagi",
    yourProblem: "Masalah Anda",
    newAnalysis: "Analisa baru",
    sourceDemo: "DEMO",
    sourceOnDevice: "ON_DEVICE · Gemini Nano (on-device)",
    sourceInCloud: "IN_CLOUD · Gemini Flash (cloud)",
    sourceUnknown: "SUMBER TIDAK DIKETAHUI",
    costNote: "Perkiraan kasar — harga asli bervariasi menurut merek dan daerah.",
    footer:
      "VoltAI — dibuat untuk SLAY HACKS 2026. Untuk pemilik rumah dan tukang listrik di Indonesia.",
  },
};

export function t(lang: Lang, key: string): string {
  return STRINGS[lang][key] ?? STRINGS.en[key] ?? key;
}

export function formatIDR(n: number): string {
  return "Rp " + n.toLocaleString("id-ID");
}
