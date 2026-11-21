// VoltAI — Firebase configuration.
//
// >>> SETUP REQUIRED: paste your Firebase web app config here. <<<
// 1. Go to the Firebase console (https://console.firebase.google.com)
//    and sign in as ketong.ardi@gmail.com.
// 2. Create a project (e.g. "voltai"), open AI Services > AI Logic,
//    click "Get started", choose the Gemini Developer API provider.
//    IMPORTANT: in the Firebase console, open App Check and set enforcement
//    for "Firebase AI Logic" to Unenforced (monitoring only) — the app does
//    not initialise App Check, and enforcement blocks cloud calls with 401.
// 3. Register a Web app in the project, copy the firebaseConfig object,
//    and paste it below, replacing the placeholder values.
// 4. Rebuild (`npm run build`) and redeploy.
//
// Until real values are pasted, `CONFIGURED` stays false and VoltAI runs in
// DEMO MODE: the full analysis works end-to-end using a built-in rule-based
// local engine, clearly badged DEMO (never presented as AI). No data leaves
// the browser in demo mode.
export const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY_HERE",
  authDomain: "PASTE_YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "PASTE_YOUR_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID",
};

// True only when a real config has been pasted in.
export const CONFIGURED =
  firebaseConfig.apiKey !== "PASTE_YOUR_API_KEY_HERE" &&
  firebaseConfig.projectId !== "PASTE_YOUR_PROJECT_ID";
