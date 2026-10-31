// Komponen bersama montase cepat Babak 5 «Kenyataan» (05c–05h).
import React from "react";
import cues from "../../public/data/cues11.json";

/** Grid 1/8 ostinato 117,5 BPM. */
export const GRID = 60 / 117.5 / 2; // 0,2553 dtk

/** Micro-tick zona 3 di mix (05c–05g). `label` dicocokkan dengan kolom `why` cue. */
export const z3tick = (label: string) => {
  const c = (cues as any[]).find((x) => x.id.startsWith("tick_z3") && x.why.includes(label));
  if (!c) throw new Error("tick z3 " + label);
  return c.t as number;
};

/** Titik grid ke-k relatif ke anchor (k boleh negatif). */
export const gridAt = (anchor: number, k: number, div = 1) => anchor + (k * GRID) / div;
/** Indeks langkah grid terakhir yang sudah lewat, terkunci ke anchor. */
export const gridIdx = (t: number, anchor: number, div = 1) => Math.floor(((t - anchor) * div) / GRID + 1e-6);

export const C = {
  ink: "#1d1d1f", muted: "#6e6e73", line: "#d2d2d7", paper: "#f5f5f7", white: "#ffffff",
  charcoal: "#101216", raised: "#1c1f25", placeholder: "#2a2d33",
  sky300: "#c4dafd", sky100: "#e1f5fd", sky50: "#f4f9fd", electric: "#1d36eb",
  violet400: "#a48bf3", violet200: "#cbaff3", violet50: "#ebe0f2",
};
export const SKY_BG = `linear-gradient(180deg, ${C.sky300} 0%, ${C.sky100} 38%, ${C.sky50} 70%, ${C.white} 100%)`;

// ── ikon garis tipis (24×24, stroke) untuk aplikasi AI buatan "semua orang"
const G: Record<string, React.ReactNode> = {
  habit: <><path d="M20 6 9 17l-5-5" /></>,
  resume: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></>,
  caption: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M8 9h8M8 13h5" /></>,
  invoice: <><path d="M6 2h12v20l-3-2-3 2-3-2-3 2z" /><path d="M9 7h6M9 11h6M9 15h3" /></>,
  notes: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></>,
  recipe: <><path d="M7 2v20M4 2v6a3 3 0 0 0 6 0V2M17 2c-2 2-3 5-3 8h3v12" /></>,
  travel: <><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" /></>,
  budget: <><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 6-7" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  study: <><path d="M2 7l10-4 10 4-10 4z" /><path d="M6 9v5c0 1.5 3 3 6 3s6-1.5 6-3V9" /></>,
  fitness: <><path d="M6 7v10M18 7v10M3 10v4M21 10v4M6 12h12" /></>,
  podcast: <><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v4" /></>,
};
export type App = { name: string; tag: string; g: keyof typeof G | string; a: string; b: string };
export const APPS: App[] = [
  { name: "Habit AI", tag: "Build better habits with AI", g: "habit", a: "#34d399", b: "#059669" },
  { name: "Resume AI", tag: "Your resume, rewritten in seconds", g: "resume", a: "#60a5fa", b: "#2563eb" },
  { name: "Caption AI", tag: "Captions that sound like you", g: "caption", a: "#f472b6", b: "#db2777" },
  { name: "Invoice AI", tag: "Send invoices on autopilot", g: "invoice", a: "#fbbf24", b: "#ea580c" },
  { name: "Notes AI", tag: "Meeting notes, done for you", g: "notes", a: "#a78bfa", b: "#7c3aed" },
  { name: "Recipe AI", tag: "Dinner ideas from your fridge", g: "recipe", a: "#fb923c", b: "#dc2626" },
  { name: "Trip AI", tag: "Plan any trip in one chat", g: "travel", a: "#22d3ee", b: "#0284c7" },
  { name: "Budget AI", tag: "Know where your money goes", g: "budget", a: "#4ade80", b: "#16a34a" },
  { name: "Inbox AI", tag: "Zero inbox, every morning", g: "mail", a: "#818cf8", b: "#4f46e5" },
  { name: "Study AI", tag: "Flashcards from any PDF", g: "study", a: "#facc15", b: "#ca8a04" },
  { name: "Fit AI", tag: "Workouts that adapt to you", g: "fitness", a: "#f87171", b: "#b91c1c" },
  { name: "Pod AI", tag: "Turn notes into a podcast", g: "podcast", a: "#c084fc", b: "#9333ea" },
];

/** Ikon aplikasi (squircle gradien + glyph garis putih). */
export const AppIcon: React.FC<{ app: App; size: number }> = ({ app, size }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.27, background: `linear-gradient(145deg, ${app.a}, ${app.b})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `inset 0 ${size * 0.02}px 0 rgba(255,255,255,0.35)` }}>
    <svg width={size * 0.52} height={size * 0.52} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      {G[app.g]}
    </svg>
  </div>
);

/** Kartu aplikasi (05g): 480×300 di ruang 1920. */
export const AppCard: React.FC<{ app: App; style?: React.CSSProperties }> = ({ app, style }) => (
  <div style={{ position: "absolute", width: 480, height: 300, boxSizing: "border-box", background: C.white, border: `2px solid ${C.line}`, borderRadius: 40, padding: 36, display: "flex", flexDirection: "column", boxShadow: "0 24px 60px rgba(29,29,31,0.10)", fontFamily: "Inter", ...style }}>
    <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
      <AppIcon app={app} size={84} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: -0.8, color: C.ink, lineHeight: 1.1 }}>{app.name}</span>
        <span style={{ fontSize: 22, fontWeight: 500, color: C.muted, marginTop: 6 }}>Launched today</span>
      </div>
    </div>
    <span style={{ fontSize: 25, color: C.ink, opacity: 0.78, marginTop: 26, lineHeight: 1.3, letterSpacing: -0.2 }}>{app.tag}</span>
    <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 21, color: C.muted, fontWeight: 500 }}>Free · Web &amp; iOS</span>
      <span style={{ fontSize: 21, fontWeight: 600, color: C.white, background: C.ink, borderRadius: 999, padding: "9px 22px" }}>Try free</span>
    </div>
  </div>
);

/** Piktogram pengguna (gaya panel 05h/06a: charcoal + rim light), kaki berayun saat `phase` berjalan. */
export const Pictogram: React.FC<{ x: number; floor: number; h?: number; phase: number; walking?: number }> = ({ x, floor, h = 400, phase, walking = 1 }) => {
  const k = h / 400;
  const swing = Math.sin(phase * Math.PI * 2) * 24 * walking;
  const bob = -Math.abs(Math.sin(phase * Math.PI * 2)) * 8 * k * walking;
  const fill = `linear-gradient(100deg, ${C.raised} 0%, ${C.charcoal} 70%)`;
  const rim = "inset 6px 3px 4px -2px rgba(255,255,255,0.7)";
  const leg = (rot: number, back: boolean) => (
    <div style={{ position: "absolute", left: 92 * k, top: 236 * k, width: 46 * k, height: 164 * k, borderRadius: 23 * k, background: fill, boxShadow: back ? "inset 4px 2px 3px -2px rgba(255,255,255,0.35)" : rim, transform: `rotate(${rot}deg)`, transformOrigin: "50% 8%", opacity: back ? 0.9 : 1 }} />
  );
  return (
    <div style={{ position: "absolute", left: x - 115 * k, top: floor - h + bob, width: 230 * k, height: h }}>
      {leg(-swing, true)}
      <div style={{ position: "absolute", left: 20 * k, top: 116 * k, width: 190 * k, height: 150 * k, borderRadius: `${95 * k}px ${95 * k}px ${30 * k}px ${30 * k}px`, background: fill, boxShadow: rim }} />
      {leg(swing, false)}
      <div style={{ position: "absolute", left: 63 * k, top: 0, width: 104 * k, height: 104 * k, borderRadius: "50%", background: fill, boxShadow: "inset 6px 0 3px -2px rgba(255,255,255,0.8)" }} />
    </div>
  );
};
