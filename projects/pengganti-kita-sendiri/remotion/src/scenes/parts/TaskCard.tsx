// Kartu tugas (tampilan sama dengan 02c: kartu putih membulat 680×152, ikon garis + nama) + kotak centang yang dicentang agent AI.
import React from "react";

export const CARD = { w: 680, h: 152 };
export type TaskIcon = "grid" | "mail" | "db" | "doc" | "pen" | "bulb" | "scale" | "chat" | "compass" | "users";

const INK = "#1d1d1f";
const ACCENT = "#1d36eb"; // biru hanya sebagai aksen solusi (lencana ✓), bukan teks

const Icon: React.FC<{ k: TaskIcon }> = ({ k }) => (
  <svg width={44} height={44} viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    {k === "grid" && (<><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>)}
    {k === "mail" && (<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>)}
    {k === "db" && (<><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></>)}
    {k === "doc" && (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></>)}
    {k === "pen" && (<><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></>)}
    {k === "bulb" && (<><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z" /></>)}
    {k === "scale" && (<><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="M7 21h10" /><path d="M12 3v18" /><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" /></>)}
    {k === "chat" && <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />}
    {k === "compass" && (<><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></>)}
    {k === "users" && (<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>)}
  </svg>
);

/** done 0..1 = progres ✓ (snap 3 f dari pemanggil); ring 0..1 = denyut cincin saat dicentang. */
export const TaskCard: React.FC<{ name: string; icon: TaskIcon; done?: number; ring?: number; style?: React.CSSProperties }> = ({ name, icon, done = 0, ring = 0, style }) => (
  <div
    style={{
      position: "absolute", width: CARD.w, height: CARD.h, display: "flex", alignItems: "center", gap: 28, padding: "0 40px",
      boxSizing: "border-box", borderRadius: 32, background: "rgba(255,255,255,0.95)", border: "2px solid #fff",
      boxShadow: "0 24px 60px rgba(255,255,255,0.05), 0 0 0 1px rgba(255,255,255,0.08)",
      fontFamily: "Inter", fontWeight: 600, fontSize: 36, color: INK, whiteSpace: "nowrap", ...style,
    }}
  >
    <Icon k={icon} />
    {name}
    {/* kotak centang di kanan: pusat (kanan 34 + 30) → x kartu + 616, y kartu + 76 */}
    <div style={{ position: "absolute", right: 34, top: 46, width: 60, height: 60 }}>
      {ring > 0 && ring < 1 && (
        <div style={{ position: "absolute", inset: 0, borderRadius: 30, border: `3px solid ${ACCENT}`, transform: `scale(${1 + 0.9 * ring})`, opacity: 1 - ring }} />
      )}
      <svg width={60} height={60} viewBox="0 0 60 60" style={{ position: "absolute", inset: 0 }}>
        <circle cx={30} cy={30} r={27} fill="none" stroke="rgba(29,29,31,0.22)" strokeWidth={3} />
        {done > 0 && (
          <g transform={`translate(30 30) scale(${0.55 + 0.45 * done}) translate(-30 -30)`}>
            <circle cx={30} cy={30} r={30} fill={ACCENT} />
            <polyline points="17,31 26,40 43,21" fill="none" stroke="#fff" strokeWidth={5.5} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, done * 1.4)} />
          </g>
        )}
      </svg>
    </div>
  </div>
);
