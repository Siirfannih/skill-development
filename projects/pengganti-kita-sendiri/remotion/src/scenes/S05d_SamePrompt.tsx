// 05d · «Prompt yang sama.» — composer ChatGPT asli, prompt identik di tiga perangkat.
// C20 cut zoom: laptop → HP → tablet, tiap cut di grid 1/8 (2 langkah); tiap perangkat: ketik singkat ekor prompt lalu klik kirim.
// Klik kirim laptop mendarat di micro-tick 87.16. Masuk dari dorongan cut-on-motion 05c (kamera mendarat dari 1,12×).
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { EZ, Grain, prog, Scene, useT } from "../lib/anim";
import { FPS, panel } from "../lib/time";
import { C, GRID, SKY_BG, z3tick } from "./_b5_shared";

const P = panel("05d");
const T_SEND1 = z3tick("05d prompt"); // 87.16
const CUT2 = T_SEND1 + GRID; // HP
const CUT3 = T_SEND1 + 3 * GRID; // tablet
const SEND2 = CUT2 + GRID;
const SEND3 = CUT3 + GRID;
const PROMPT = "Buatkan ide startup AI yang bisa cepat dapat pengguna";

// ── ikon UI ChatGPT (garis 2 px, gaya produk asli)
const Ico: React.FC<{ d: React.ReactNode; s: number; c?: string; w?: number }> = ({ d, s, c = C.ink, w = 2 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const I = {
  plus: <><path d="M12 5v14M5 12h14" /></>,
  up: <><path d="M12 19V5M5 12l7-7 7 7" /></>,
  mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></>,
  newChat: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  lib: <><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="9" cy="9" r="2" /><path d="m21 15-5-5L5 21" /></>,
  menu: <><path d="M4 8h16M4 16h10" /></>,
  chev: <><path d="m6 9 6 6 6-6" /></>,
  side: <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M9 4v16" /></>,
  wave: <><path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4" /></>,
};

/** Isi ChatGPT (light mode). `typed` 0..1 = ekor prompt terketik, `press` 0..1 = klik kirim. */
const ChatGPT: React.FC<{ w: number; h: number; mode: "desktop" | "mobile" | "tablet"; typed: number; press: number; u: number }> = ({ w, h, mode, typed, press, u }) => {
  const n = Math.round(PROMPT.length * (0.72 + 0.28 * typed));
  const text = PROMPT.slice(0, n);
  const caret = typed < 1;
  const side = mode === "desktop" ? 260 * u : 0;
  const composerW = mode === "mobile" ? w - 28 * u : Math.min(760 * u, w - side - 80 * u);
  const pressS = 1 - 0.12 * Math.sin(Math.PI * press);
  return (
    <div style={{ position: "absolute", inset: 0, width: w, height: h, background: "#ffffff", fontFamily: "Inter", color: C.ink, overflow: "hidden", display: "flex" }}>
      {mode === "desktop" && (
        <div style={{ width: side, height: "100%", background: "#f9f9f9", borderRight: "1px solid #ececec", padding: `${16 * u}px ${12 * u}px`, boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 6 * u }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: `0 ${8 * u}px`, marginBottom: 14 * u }}>
            <Img src={staticFile("icons/openai.svg")} style={{ width: 26 * u, height: 26 * u }} />
            <Ico d={I.side} s={22 * u} c="#5d5d5d" />
          </div>
          {[["newChat", "Obrolan baru"], ["search", "Cari obrolan"], ["lib", "Pustaka"]].map(([k, l]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 12 * u, padding: `${8 * u}px`, fontSize: 15 * u }}>
              <Ico d={(I as any)[k]} s={18 * u} />{l}
            </div>
          ))}
          <div style={{ fontSize: 13 * u, color: "#8f8f8f", padding: `${18 * u}px ${8 * u}px ${6 * u}px` }}>Obrolan</div>
          {["Ide konten minggu ini", "Rencana belajar Python", "Balas email klien"].map((l) => (
            <div key={l} style={{ fontSize: 15 * u, padding: `${7 * u}px ${8 * u}px`, whiteSpace: "nowrap" }}>{l}</div>
          ))}
        </div>
      )}
      <div style={{ flex: 1, position: "relative", height: "100%" }}>
        {/* header */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 60 * u, display: "flex", alignItems: "center", justifyContent: mode === "mobile" ? "space-between" : "space-between", padding: `0 ${18 * u}px` }}>
          {mode === "mobile" ? <Ico d={I.menu} s={26 * u} /> : <span style={{ fontSize: 19 * u, fontWeight: 500, display: "flex", alignItems: "center", gap: 4 * u }}>ChatGPT <Ico d={I.chev} s={16 * u} c="#8f8f8f" /></span>}
          {mode === "mobile" && <span style={{ fontSize: 19 * u, fontWeight: 500, display: "flex", alignItems: "center", gap: 4 * u }}>ChatGPT <Ico d={I.chev} s={16 * u} c="#8f8f8f" /></span>}
          {mode === "mobile" ? <Ico d={I.newChat} s={24 * u} /> : <div style={{ width: 34 * u, height: 34 * u, borderRadius: "50%", background: "linear-gradient(135deg,#f59e0b,#ef4444)", color: "#fff", fontSize: 15 * u, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>R</div>}
        </div>
        {/* sapaan + composer */}
        <div style={{ position: "absolute", left: 0, right: 0, top: mode === "mobile" ? h * 0.36 : h * 0.3, display: "flex", flexDirection: "column", alignItems: "center", gap: 30 * u }}>
          <span style={{ fontSize: (mode === "mobile" ? 26 : 30) * u, fontWeight: 500, letterSpacing: -0.4 * u }}>Apa yang bisa saya bantu?</span>
          {mode !== "mobile" && <Composer w={composerW} u={u} text={text} caret={caret} pressS={pressS} />}
        </div>
        {mode === "mobile" && (
          <div style={{ position: "absolute", left: 14 * u, bottom: 30 * u }}>
            <Composer w={composerW} u={u} text={text} caret={caret} pressS={pressS} />
          </div>
        )}
      </div>
    </div>
  );
};

const Composer: React.FC<{ w: number; u: number; text: string; caret: boolean; pressS: number }> = ({ w, u, text, caret, pressS }) => (
  <div style={{ width: w, boxSizing: "border-box", borderRadius: 28 * u, background: "#ffffff", border: "1px solid #e3e3e3", boxShadow: `0 ${4 * u}px ${18 * u}px rgba(0,0,0,0.07)`, padding: `${16 * u}px ${18 * u}px ${12 * u}px` }}>
    <div style={{ fontSize: 18 * u, lineHeight: 1.45, minHeight: 26 * u, padding: `0 ${4 * u}px ${14 * u}px` }}>
      {text}
      {caret && <span style={{ display: "inline-block", width: 2 * u, height: 22 * u, background: C.ink, marginLeft: 2 * u, verticalAlign: "-4px" }} />}
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ width: 36 * u, height: 36 * u, borderRadius: "50%", border: "1px solid #e3e3e3", display: "flex", alignItems: "center", justifyContent: "center" }}><Ico d={I.plus} s={20 * u} /></div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 * u }}>
        <Ico d={I.mic} s={20 * u} c="#5d5d5d" />
        <div style={{ width: 36 * u, height: 36 * u, borderRadius: "50%", background: C.ink, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${pressS})` }}>
          <Ico d={I.up} s={20 * u} c="#fff" w={2.4} />
        </div>
      </div>
    </div>
  </div>
);

export const S05d_SamePrompt: React.FC = () => {
  const t = useT();
  const seg = t < CUT2 ? 0 : t < CUT3 ? 1 : 2;
  const a = [P.start, CUT2, CUT3][seg];
  const send = [T_SEND1, SEND2, SEND3][seg];
  const typed = prog(t, a, send - 2 / FPS, EZ.inOut);
  const press = prog(t, send, send + 5 / FPS, EZ.out);
  // kamera: tiap cut mendarat dari dorongan kecil (C20), lalu drift mikro
  const land = seg === 0 ? 1 + 0.12 * (1 - prog(t, a, a + 7 / FPS, EZ.out)) : 1 + 0.05 * (1 - prog(t, a, a + 5 / FPS, EZ.out));
  const drift = 1 + 0.02 * prog(t, a, a + 0.6, EZ.inOut);
  const s = land * drift;
  let device: React.ReactNode = null;
  if (seg === 0) {
    // MacBook: layar 1560×975, kamera agak dekat
    const W = 1560, H = 975;
    device = (
      <div style={{ position: "absolute", left: 960 - W / 2 - 22, top: 120, transform: `scale(${s})`, transformOrigin: `${W / 2 + 22}px 420px` }}>
        <div style={{ width: W + 44, height: H + 44, background: "#0d0d0f", borderRadius: 36, padding: 22, boxSizing: "border-box", boxShadow: "0 40px 90px rgba(29,54,235,0.16)" }}>
          <div style={{ position: "relative", width: W, height: H, borderRadius: 14, overflow: "hidden" }}>
            <ChatGPT w={W} h={H} mode="desktop" typed={typed} press={press} u={1.45} />
          </div>
        </div>
        <div style={{ width: W + 220, height: 30, marginLeft: -88, background: "linear-gradient(180deg,#d9dbe0,#a9adb5)", borderRadius: "0 0 24px 24px" }} />
      </div>
    );
  } else if (seg === 1) {
    // iPhone: potret, kamera dekat ke composer
    const W = 640, H = 1386;
    device = (
      <div style={{ position: "absolute", left: 960 - W / 2 - 18, top: -400, transform: `scale(${s})`, transformOrigin: `${W / 2}px 1150px` }}>
        <div style={{ width: W + 36, height: H + 36, background: "#0d0d0f", borderRadius: 104, padding: 18, boxSizing: "border-box", boxShadow: "0 40px 90px rgba(29,54,235,0.18)" }}>
          <div style={{ position: "relative", width: W, height: H, borderRadius: 88, overflow: "hidden" }}>
            <ChatGPT w={W} h={H} mode="mobile" typed={typed} press={press} u={1.62} />
            <div style={{ position: "absolute", left: W / 2 - 90, top: 22, width: 180, height: 52, borderRadius: 26, background: "#000" }} />
          </div>
        </div>
      </div>
    );
  } else {
    // iPad landscape
    const W = 1800, H = 1250;
    device = (
      <div style={{ position: "absolute", left: 960 - W / 2 - 30, top: -40, transform: `scale(${s})`, transformOrigin: `${W / 2}px 700px` }}>
        <div style={{ width: W + 60, height: H + 60, background: "#0d0d0f", borderRadius: 70, padding: 30, boxSizing: "border-box", boxShadow: "0 40px 90px rgba(29,54,235,0.16)" }}>
          <div style={{ position: "relative", width: W, height: H, borderRadius: 40, overflow: "hidden" }}>
            <ChatGPT w={W} h={H} mode="tablet" typed={typed} press={press} u={1.75} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <Scene code="05d">
      <AbsoluteFill style={{ background: SKY_BG, overflow: "hidden" }}>
        {device}
        <Grain opacity={0.035} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S05d_SamePrompt, covers: ["05d"] };
