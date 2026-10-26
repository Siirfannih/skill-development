import React from "react";
import { C, MONO, SANS, eOut, k } from "./lib";

// Neutral AI-chat UI (no brand): composer typing, user bubbles, AI replies with live workflow steps.
export type Msg = { role: "user" | "ai"; text: string; at: number; steps?: { label: string; at: number }[]; result?: { at: number; badge?: string; badgeAt?: number } };

export const Caret: React.FC<{ f: number }> = ({ f }) => (
  <span style={{ display: "inline-block", width: 4, height: "1em", background: C.blue, marginLeft: 4, verticalAlign: "-0.12em", opacity: Math.floor(f / 8) % 2 ? 0 : 1 }} />
);

export const typed = (f: number, text: string, from: number, to: number) => {
  const n = Math.round(k(f, [from, to], [0, text.length], (t) => t));
  return text.slice(0, n);
};

export const Composer: React.FC<{ f: number; text: string; from: number; to: number; sendAt: number; w?: number }> = ({ f, text, from, to, sendAt, w = 1040 }) => {
  const sent = f >= sendAt;
  const press = f >= sendAt - 3 && f < sendAt + 3 ? 0.88 : 1;
  const shown = sent ? "" : typed(f, text, from, to);
  return (
    <div style={{ width: w, height: 104, borderRadius: 52, background: C.white, border: `2px solid ${C.g3}`, display: "flex", alignItems: "center", padding: "0 18px 0 40px", boxSizing: "border-box", boxShadow: "0 24px 60px rgba(15,23,42,0.08)" }}>
      <div data-text={shown || undefined} style={{ flex: 1, fontFamily: SANS, fontSize: 44, fontWeight: 400, color: shown ? C.ink : "rgba(10,10,10,0.35)", whiteSpace: "nowrap", overflow: "hidden", letterSpacing: "-0.01em" }}>
        {shown || (sent ? "" : "Tanya apa saja…")}
        {!sent && f >= from && <Caret f={f} />}
      </div>
      <div style={{ width: 72, height: 72, borderRadius: 36, background: shown ? C.blue : C.g3, display: "flex", alignItems: "center", justifyContent: "center", scale: String(press) }}>
        <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" stroke="#FFFFFF" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    </div>
  );
};

const Spinner: React.FC<{ f: number }> = ({ f }) => (
  <svg width="34" height="34" viewBox="0 0 34 34" style={{ rotate: `${(f * 18) % 360}deg` }} aria-hidden="true">
    <circle cx="17" cy="17" r="13" stroke={C.g3} strokeWidth="4" fill="none" />
    <path d="M17 4 A13 13 0 0 1 30 17" stroke={C.blue} strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);

export const Bubble: React.FC<{ f: number; m: Msg }> = ({ f, m }) => {
  const p = k(f, [m.at, m.at + 8], [0, 1], eOut);
  if (f < m.at) return null;
  const user = m.role === "user";
  return (
    <div style={{ display: "flex", justifyContent: user ? "flex-end" : "flex-start", translate: `0 ${(1 - p) * 30}px`, opacity: p }}>
      <div
        data-text={m.text}
        style={{
          maxWidth: 860,
          padding: "22px 34px",
          borderRadius: 34,
          borderBottomRightRadius: user ? 10 : 34,
          borderBottomLeftRadius: user ? 34 : 10,
          background: user ? C.blue : C.g4,
          color: user ? C.white : C.ink,
          fontFamily: SANS,
          fontSize: 42,
          fontWeight: user ? 500 : 400,
          letterSpacing: "-0.01em",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {!user && m.steps && f < (m.result?.at ?? 1e9) && <Spinner f={f} />}
          <span>{m.text}</span>
        </div>
        {m.steps && (
          <div style={{ display: "flex", gap: 14, marginTop: 18, flexWrap: "wrap" }}>
            {m.steps.map((s, i) => {
              const on = f >= s.at;
              const done = f >= s.at + 8;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 18px", borderRadius: 999, background: done ? C.white : "transparent", border: `2px solid ${on ? C.blue : C.g3}`, fontFamily: MONO, fontSize: 26, color: C.ink, opacity: on ? 1 : 0.4 }}>
                  <span style={{ width: 14, height: 14, borderRadius: 7, background: done ? C.blue : "transparent", border: `2px solid ${C.blue}` }} />
                  {s.label}
                </div>
              );
            })}
          </div>
        )}
        {m.result && f >= m.result.at && (
          <div style={{ marginTop: 20, display: "flex", alignItems: "flex-end", gap: 18 }}>
            <ResultArt f={f} at={m.result.at} />
            {m.result.badge && f >= (m.result.badgeAt ?? m.result.at) && (
              <div style={{ padding: "10px 22px", borderRadius: 999, background: C.ink, color: C.white, fontFamily: MONO, fontSize: 30, scale: String(k(f, [m.result.badgeAt ?? m.result.at, (m.result.badgeAt ?? m.result.at) + 6], [0.6, 1], eOut)) }}>
                {m.result.badge}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/** A generated "karya": abstract poster thumbnail built from vectors. */
export const ResultArt: React.FC<{ f: number; at: number; w?: number; h?: number; seed?: number }> = ({ f, at, w = 300, h = 220, seed = 0 }) => {
  const p = k(f, [at, at + 10], [0, 1], eOut);
  const hue = seed % 3;
  return (
    <div style={{ width: w, height: h, borderRadius: 20, overflow: "hidden", position: "relative", background: hue === 0 ? C.ink : hue === 1 ? C.blue : "#DCE6FB", scale: String(0.9 + 0.1 * p), opacity: p }}>
      <div style={{ position: "absolute", left: w * 0.12, top: h * 0.16, width: w * 0.42, height: w * 0.42, borderRadius: "50%", background: hue === 2 ? C.blue : C.white, opacity: 0.9 }} />
      <div style={{ position: "absolute", left: w * 0.12, bottom: h * 0.14, width: w * 0.7, height: 12, borderRadius: 6, background: hue === 2 ? C.ink : C.white, opacity: 0.85 }} />
      <div style={{ position: "absolute", left: w * 0.12, bottom: h * 0.14 + 24, width: w * 0.45, height: 12, borderRadius: 6, background: hue === 2 ? C.ink : C.white, opacity: 0.6 }} />
    </div>
  );
};

export const ChatWindow: React.FC<{ children: React.ReactNode; w?: number; h?: number }> = ({ children, w = 1180, h = 820 }) => (
  <div data-subject="1" style={{ width: w, height: h, borderRadius: 40, background: C.white, boxShadow: "0 50px 120px rgba(15,23,42,0.14)", border: `2px solid ${C.g4}`, position: "relative", overflow: "hidden" }}>
    <div style={{ height: 70, display: "flex", alignItems: "center", gap: 12, padding: "0 32px", borderBottom: `2px solid ${C.g4}` }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ width: 16, height: 16, borderRadius: 8, background: C.g3 }} />
      ))}
    </div>
    {children}
  </div>
);
