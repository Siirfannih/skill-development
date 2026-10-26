import React from "react";
import { loadFont } from "@remotion/fonts";
import { Img, staticFile } from "remotion";
import { eOut, k } from "./lib";

// Real-product UI (Irfan 26 Okt 14:06): ChatGPT and Claude drawn after their actual web layouts,
// so the viewer recognises the tool instantly (Apple-style ref uses real Gmail/IG/Google UI).
// Built at native CSS size; the camera does the zooming. No logo marks, product names only.
export const INTER = "Inter";
export const RSERIF = "Source Serif 4";
for (const w of ["400", "500", "600"]) loadFont({ family: INTER, url: staticFile(`fonts/inter-latin-${w}-normal.woff2`), weight: w, format: "woff2" });
for (const w of ["300", "400"]) loadFont({ family: RSERIF, url: staticFile(`fonts/source-serif-4-latin-${w}-normal.woff2`), weight: w, format: "woff2" });

export type RMsg = {
  role: "user" | "ai";
  text: string;
  at: number; // appears
  think?: number; // ai: frames of "Thinking" before streaming
  cps?: number; // ai: chars per frame while streaming
  note?: string; // ai: line above the answer, e.g. "Thought for 3s"
  noteAt?: number;
  attach?: React.ReactNode;
  attachAt?: number;
  file?: FileChip;
};
export type FileChip = { name: string; meta: string; thumb?: string };

export type Typing = { text: string; from: number; to: number; sendAt: number; file?: FileChip; fileAt?: number };

const typed = (f: number, t: Typing | undefined) => {
  if (!t || f >= t.sendAt || f < t.from) return "";
  const n = Math.round(k(f, [t.from, t.to], [0, t.text.length], (x) => x));
  return t.text.slice(0, n);
};

const Caret: React.FC<{ f: number; color?: string }> = ({ f, color = "#0D0D0D" }) => (
  <span style={{ display: "inline-block", width: 2, height: "1.15em", background: color, marginLeft: 1, verticalAlign: "-0.2em", opacity: Math.floor(f / 8) % 2 ? 0 : 1 }} />
);

const Shimmer: React.FC<{ f: number; text: string; color: string; font: string }> = ({ f, text, color, font }) => {
  const x = ((f * 6) % 220) - 60;
  return (
    <span
      style={{
        fontFamily: font,
        backgroundImage: `linear-gradient(90deg, ${color} 0%, ${color} ${x}%, #D6D3C9 ${x + 12}%, ${color} ${x + 26}%, ${color} 100%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {text}
    </span>
  );
};

const Browser: React.FC<{ url: string; w: number; h: number; bar: string; children: React.ReactNode }> = ({ url, w, h, bar, children }) => (
  <div data-subject="1" style={{ width: w, height: h, borderRadius: 14, overflow: "hidden", background: "#FFFFFF", boxShadow: "0 40px 120px rgba(10,10,10,0.18), 0 0 0 1px rgba(10,10,10,0.06)", display: "flex", flexDirection: "column" }}>
    <div style={{ height: 44, background: bar, display: "flex", alignItems: "center", padding: "0 16px", gap: 8, flexShrink: 0, borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
        <span key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />
      ))}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <div style={{ width: 360, height: 28, borderRadius: 8, background: "rgba(0,0,0,0.05)", fontFamily: INTER, fontSize: 13, color: "#5D5D5D", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2" fill="#8F8F8F" /><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="#8F8F8F" strokeWidth="2.4" fill="none" /></svg>
          {url}
        </div>
      </div>
      <div style={{ width: 52 }} />
    </div>
    <div style={{ flex: 1, position: "relative", display: "flex", minHeight: 0 }}>{children}</div>
  </div>
);

const Ico: React.FC<{ d: string; c?: string; s?: number }> = ({ d, c = "#0D0D0D", s = 18 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d={d} stroke={c} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const I = {
  edit: "M4 20h4l10-10-4-4L4 16v4zM13.5 6.5l4 4",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4",
  book: "M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 1-4-4V4zM5 16a4 4 0 0 1 4-4h10",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  play: "M6 4l14 8-14 8V4z",
  plus: "M12 5v14M5 12h14",
  mic: "M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zM6 11a6 6 0 0 0 12 0M12 17v3",
  up: "M12 19V5M5 12l7-7 7 7",
  chev: "M6 9l6 6 6-6",
  chat: "M4 5h16v11H8l-4 4V5z",
  folder: "M3 6h6l2 2h10v11H3z",
  code: "M8 8l-4 4 4 4M16 8l4 4-4 4",
  side: "M4 4h16v16H4zM9 4v16",
  slider: "M4 7h10M18 7h2M4 17h2M10 17h10M14 5v4M6 15v4",
};

// ---------------------------------------------------------------- ChatGPT
export const ChatGPTApp: React.FC<{ f: number; msgs: RMsg[]; typing?: Typing; w?: number; h?: number; sidebar?: boolean }> = ({ f, msgs, typing, w = 1440, h = 900, sidebar = true }) => {
  const shown = msgs.filter((m) => f >= m.at);
  const t = typed(f, typing);
  const empty = shown.length === 0;
  const composer = (
    <div style={{ width: 768, minHeight: 60, borderRadius: 30, background: "#FFFFFF", boxShadow: "0 4px 18px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", padding: "0 10px 0 16px", gap: 12, boxSizing: "border-box" }}>
      <Ico d={I.plus} s={22} />
      <div data-text={t || undefined} style={{ flex: 1, fontFamily: INTER, fontSize: 18, color: t ? "#0D0D0D" : "#8F8F8F", whiteSpace: "nowrap", overflow: "hidden" }}>
        {t || "Tanya apa saja"}
        {typing && f >= typing.from && f < typing.sendAt && <Caret f={f} />}
      </div>
      <Ico d={I.mic} s={22} c="#5D5D5D" />
      <div style={{ width: 40, height: 40, borderRadius: 20, background: t ? "#0D0D0D" : "#E3E3E3", display: "flex", alignItems: "center", justifyContent: "center", scale: typing && f >= typing.sendAt - 2 && f < typing.sendAt + 2 ? "0.86" : "1" }}>
        <Ico d={I.up} c="#FFFFFF" s={20} />
      </div>
    </div>
  );
  return (
    <Browser url="chatgpt.com" w={w} h={h} bar="#F9F9F9">
      {sidebar && (
        <div style={{ width: 260, background: "#F9F9F9", borderRight: "1px solid rgba(0,0,0,0.05)", padding: "14px 10px", boxSizing: "border-box", fontFamily: INTER, fontSize: 14.5, color: "#0D0D0D", display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ height: 36, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px", marginBottom: 8 }}>
            <span style={{ fontWeight: 600, fontSize: 16 }}>ChatGPT</span>
            <Ico d={I.side} c="#5D5D5D" />
          </div>
          {[
            [I.edit, "Obrolan baru"],
            [I.search, "Cari obrolan"],
            [I.book, "Pustaka"],
            [I.play, "Sora"],
            [I.grid, "GPT"],
          ].map(([d, l]) => (
            <div key={l} style={{ height: 36, display: "flex", alignItems: "center", gap: 10, padding: "0 8px", borderRadius: 8 }}>
              <Ico d={d} s={17} />
              {l}
            </div>
          ))}
          <div style={{ padding: "18px 8px 6px", color: "#8F8F8F", fontSize: 13.5 }}>Obrolan</div>
          {["Landing page kopi", "Ide konten minggu ini", "Caption launching", "Revisi CV desain", "Rencana bisnis kecil"].map((l, i) => (
            <div key={l} style={{ height: 34, display: "flex", alignItems: "center", padding: "0 8px", borderRadius: 8, background: i === 0 && !empty ? "#ECECEC" : "transparent", whiteSpace: "nowrap", overflow: "hidden" }}>
              {l}
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px" }}>
            <div style={{ width: 30, height: 30, borderRadius: 15, background: "#0D0D0D", color: "#FFF", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>IR</div>
            <div>
              <div style={{ fontSize: 14 }}>Irfan</div>
              <div style={{ fontSize: 12, color: "#8F8F8F" }}>Plus</div>
            </div>
          </div>
        </div>
      )}
      <div style={{ flex: 1, position: "relative", background: "#FFFFFF" }}>
        <div style={{ height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px", fontFamily: INTER }}>
          <span style={{ fontSize: 18, fontWeight: 500, color: "#0D0D0D", display: "flex", alignItems: "center", gap: 4 }}>
            ChatGPT <Ico d={I.chev} s={16} c="#8F8F8F" />
          </span>
          <span style={{ fontSize: 14, border: "1px solid #E3E3E3", borderRadius: 999, padding: "6px 14px", color: "#0D0D0D" }}>Bagikan</span>
        </div>
        {empty ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: "38%", display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
            <div style={{ fontFamily: INTER, fontSize: 30, color: "#0D0D0D", letterSpacing: "-0.01em" }}>Apa yang bisa saya bantu?</div>
            {composer}
          </div>
        ) : (
          <>
            <div style={{ position: "absolute", left: 0, right: 0, top: 56, bottom: 110, display: "flex", justifyContent: "center", overflow: "hidden" }}>
              <div style={{ width: 768, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 26, paddingBottom: 10 }}>
                {shown.map((m, i) => (
                  <GPTMsg key={i} f={f} m={m} />
                ))}
              </div>
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 30, display: "flex", justifyContent: "center" }}>{composer}</div>
          </>
        )}
      </div>
    </Browser>
  );
};

const stream = (f: number, m: RMsg) => {
  const s = m.at + (m.think ?? 0);
  if (f < s) return null;
  return m.text.slice(0, Math.floor((f - s) * (m.cps ?? 4)));
};

const GPTMsg: React.FC<{ f: number; m: RMsg }> = ({ f, m }) => {
  const p = k(f, [m.at, m.at + 6], [0, 1], eOut);
  if (m.role === "user")
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", opacity: p, translate: `0 ${(1 - p) * 16}px` }}>
        <div data-text={m.text} style={{ maxWidth: 520, background: "#F4F4F4", borderRadius: 24, padding: "12px 20px", fontFamily: INTER, fontSize: 18, lineHeight: 1.5, color: "#0D0D0D" }}>
          {m.text}
        </div>
      </div>
    );
  const s = stream(f, m);
  return (
    <div style={{ fontFamily: INTER, fontSize: 18, lineHeight: 1.65, color: "#0D0D0D" }}>
      {m.note && f >= (m.noteAt ?? m.at) && <div style={{ color: "#8F8F8F", fontSize: 16, marginBottom: 6 }}>{m.note}</div>}
      {s === null ? (
        <Shimmer f={f} text="Berpikir" color="#8F8F8F" font={INTER} />
      ) : (
        <span>
          {s}
          {s.length < m.text.length && <span style={{ display: "inline-block", width: 12, height: 12, borderRadius: 6, background: "#0D0D0D", marginLeft: 6, verticalAlign: "middle" }} />}
        </span>
      )}
      {m.attach && f >= (m.attachAt ?? 1e9) && <div style={{ marginTop: 14, opacity: k(f, [m.attachAt ?? 0, (m.attachAt ?? 0) + 6], [0, 1]), scale: String(k(f, [m.attachAt ?? 0, (m.attachAt ?? 0) + 10], [0.96, 1], eOut)), transformOrigin: "0 0" }}>{m.attach}</div>}
    </div>
  );
};

const Chip: React.FC<{ c: FileChip }> = ({ c }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: 8, paddingRight: 18, borderRadius: 12, background: "#FFFFFF", boxShadow: "0 0 0 1px rgba(31,30,29,0.13)", fontFamily: INTER }}>
    {c.thumb ? (
      <Img src={staticFile(`assets/${c.thumb}`)} style={{ width: 52, height: 52, borderRadius: 8, objectFit: "cover" }} />
    ) : (
      <div style={{ width: 52, height: 52, borderRadius: 8, background: "#C6613F", color: "#FFF", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>PDF</div>
    )}
    <div>
      <div style={{ fontSize: 16, fontWeight: 500, color: "#141413" }}>{c.name}</div>
      <div style={{ fontSize: 13, color: "#73726C" }}>{c.meta}</div>
    </div>
  </div>
);

// ---------------------------------------------------------------- Claude
const CL = { bg: "#FAF9F5", side: "#F5F4EE", user: "#F0EEE6", ink: "#141413", mute: "#73726C", line: "rgba(31,30,29,0.13)", accent: "#C6613F" };

export const ClaudeApp: React.FC<{ f: number; msgs: RMsg[]; typing?: Typing; w?: number; h?: number; title?: string; fs?: number; greeting?: string }> = ({ f, msgs, typing, w = 1100, h = 780, title = "Obrolan baru", fs = 19, greeting = "Selamat sore, Irfan" }) => {
  const shown = msgs.filter((m) => f >= m.at);
  const t = typed(f, typing);
  const empty = shown.length === 0;
  const chip = typing?.file && f >= (typing.fileAt ?? typing.from) && f < typing.sendAt ? typing.file : undefined;
  const composer = (
    <div style={{ width: 720, borderRadius: 20, background: "#FFFFFF", boxShadow: `0 4px 20px rgba(0,0,0,0.04), 0 0 0 1px ${CL.line}`, padding: "16px 16px 12px 20px", boxSizing: "border-box" }}>
      {chip && (
        <div style={{ marginBottom: 12, scale: String(k(f, [typing!.fileAt ?? typing!.from, (typing!.fileAt ?? typing!.from) + 6], [0.8, 1], eOut)), transformOrigin: "0 50%" }}>
          <Chip c={chip} />
        </div>
      )}
      <div data-text={t || undefined} style={{ fontFamily: INTER, fontSize: fs, lineHeight: 1.4, color: t ? CL.ink : CL.mute, minHeight: 30 }}>
        {t || (empty ? "Bagaimana aku bisa membantu hari ini?" : "Balas ke Claude…")}
        {typing && f >= typing.from && f < typing.sendAt && <Caret f={f} color={CL.ink} />}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${CL.line}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ico d={I.plus} c={CL.mute} s={16} />
        </div>
        <div style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${CL.line}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ico d={I.slider} c={CL.mute} s={16} />
        </div>
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: INTER, fontSize: 14, color: CL.ink, display: "flex", alignItems: "center", gap: 2 }}>
          Opus 5.5 <Ico d={I.chev} s={14} c={CL.mute} />
        </span>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: t ? CL.accent : "#E9C7B9", display: "flex", alignItems: "center", justifyContent: "center", scale: typing && f >= typing.sendAt - 2 && f < typing.sendAt + 2 ? "0.86" : "1" }}>
          <Ico d={I.up} c="#FFFFFF" s={18} />
        </div>
      </div>
    </div>
  );
  return (
    <Browser url="claude.ai" w={w} h={h} bar="#F0EEE6">
      <div style={{ width: 56, background: CL.side, borderRight: `1px solid ${CL.line}`, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 16, gap: 18 }}>
        <Ico d={I.side} c={CL.mute} />
        <div style={{ width: 30, height: 30, borderRadius: 15, background: CL.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ico d={I.plus} c="#FFFFFF" s={18} />
        </div>
        <Ico d={I.chat} c={CL.mute} />
        <Ico d={I.folder} c={CL.mute} />
        <Ico d={I.grid} c={CL.mute} />
        <Ico d={I.code} c={CL.mute} />
        <div style={{ flex: 1 }} />
        <div style={{ width: 30, height: 30, borderRadius: 15, background: "#3D3D3A", color: "#FFF", fontFamily: INTER, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>IR</div>
      </div>
      <div style={{ flex: 1, position: "relative", background: CL.bg }}>
        {empty ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: "30%", display: "flex", flexDirection: "column", alignItems: "center", gap: 34 }}>
            <div style={{ fontFamily: RSERIF, fontWeight: 300, fontSize: 46, color: CL.ink, letterSpacing: "-0.01em" }}>{greeting}</div>
            {composer}
          </div>
        ) : (
          <>
            <div style={{ height: 52, display: "flex", alignItems: "center", padding: "0 20px", fontFamily: INTER, fontSize: 15, color: CL.ink, gap: 4 }}>
              {title} <Ico d={I.chev} s={14} c={CL.mute} />
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, top: 52, bottom: 170, display: "flex", justifyContent: "center", overflow: "hidden" }}>
              <div style={{ width: 720, display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: 24, paddingTop: 30 }}>
                {shown.map((m, i) => (
                  <ClaudeMsg key={i} f={f} m={m} fs={fs} />
                ))}
              </div>
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 24, display: "flex", justifyContent: "center" }}>{composer}</div>
          </>
        )}
      </div>
    </Browser>
  );
};

const ClaudeMsg: React.FC<{ f: number; m: RMsg; fs: number }> = ({ f, m, fs }) => {
  const p = k(f, [m.at, m.at + 6], [0, 1], eOut);
  if (m.role === "user")
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, opacity: p, translate: `0 ${(1 - p) * 16}px` }}>
        {m.file && <Chip c={m.file} />}
        <div data-text={m.text} style={{ maxWidth: 560, background: CL.user, borderRadius: 14, padding: "12px 18px", fontFamily: INTER, fontSize: fs, lineHeight: 1.45, color: CL.ink }}>
          {m.text}
        </div>
      </div>
    );
  const s = stream(f, m);
  return (
    <div style={{ fontFamily: RSERIF, fontSize: fs + 1, lineHeight: 1.6, color: CL.ink }}>
      {s === null ? <Shimmer f={f} text="Berpikir…" color={CL.mute} font={INTER} /> : <span>{s}</span>}
      {m.attach && f >= (m.attachAt ?? 1e9) && <div style={{ marginTop: 12, opacity: k(f, [m.attachAt ?? 0, (m.attachAt ?? 0) + 6], [0, 1]) }}>{m.attach}</div>}
    </div>
  );
};

/** Claude-style artifact card attached to a reply. */
export const ArtifactCard: React.FC<{ title: string; kind: string }> = ({ title, kind }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "12px 18px 12px 12px", borderRadius: 12, background: "#FFFFFF", boxShadow: `0 0 0 1px ${CL.line}` }}>
    <div style={{ width: 44, height: 52, borderRadius: 8, background: CL.user, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Ico d={I.code} c={CL.mute} />
    </div>
    <div>
      <div style={{ fontFamily: INTER, fontSize: 16, color: CL.ink, fontWeight: 500 }}>{title}</div>
      <div style={{ fontFamily: INTER, fontSize: 13, color: CL.mute }}>{kind}</div>
    </div>
  </div>
);

/** ChatGPT-generated website preview (landing page thumbnail). */
export const SitePreview: React.FC<{ w?: number }> = ({ w = 460 }) => (
  <div style={{ width: w, height: w * 0.58, borderRadius: 14, overflow: "hidden", boxShadow: "0 0 0 1px rgba(0,0,0,0.08)", background: "#1C1714", position: "relative", fontFamily: INTER }}>
    <div style={{ position: "absolute", left: 22, top: 18, right: 22, display: "flex", justifyContent: "space-between", color: "#E9DCCB", fontSize: 11 }}>
      <b>Kopi Senja</b>
      <span>Menu · Lokasi · Pesan</span>
    </div>
    <div style={{ position: "absolute", left: 22, top: 70, color: "#F6EFE6", fontSize: 30, fontWeight: 600, lineHeight: 1.05, width: w * 0.5 }}>Seduhan sore yang pelan.</div>
    <div style={{ position: "absolute", left: 22, bottom: 26, padding: "8px 14px", borderRadius: 999, background: "#D9A066", color: "#1C1714", fontSize: 12, fontWeight: 600 }}>Pesan sekarang</div>
    <div style={{ position: "absolute", right: 22, top: 60, width: w * 0.36, height: w * 0.36, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%, #8A5A3B, #3A2518 70%)" }} />
  </div>
);
