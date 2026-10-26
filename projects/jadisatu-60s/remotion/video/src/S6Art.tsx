import React from "react";
import { C, SANS, eIn, eIO, eOut, k, kk } from "./lib";
import { DESIGNS, DM, Fit, StorePage } from "./Designs";
import { INTER, RSERIF } from "./RealUI";

// "AI bisa …" (Irfan 14:41: too plain, not Apple style). Apple-ref pattern: one sentence with a real image
// chip inside the words ("Chief ◉ Marketing ◉ Officer"), and under it a real product moment for that phrase.
type Slot = { a: string; chip: string; b: string; at: number };

const ChipImg: React.FC<{ kind: string; f: number; at: number }> = ({ kind, f, at }) => {
  const p = k(f, [at + 2, at + 10], [0, 1], eOut);
  const w = 150;
  const h = 96;
  const inner =
    kind === "doc" ? (
      <div style={{ width: w, height: h, background: "#FFF", padding: 14, boxSizing: "border-box" }}>
        {[90, 70, 84, 50].map((x, i) => (
          <div key={i} style={{ height: 8, width: `${x}%`, borderRadius: 4, background: i ? "#D9DEE8" : "#2563EB", marginTop: i ? 10 : 0 }} />
        ))}
      </div>
    ) : (
      (() => {
        const d = DESIGNS.find((x) => x.id === kind)!;
        return (
          <Fit w={w} h={h} nw={d.nw} nh={d.nh}>
            <d.C />
          </Fit>
        );
      })()
    );
  return (
    <div style={{ width: w * p, height: h, borderRadius: 20, overflow: "hidden", boxShadow: "0 10px 30px rgba(15,23,42,0.18)", flexShrink: 0, opacity: p, translate: "0 6px" }}>
      <div style={{ width: w }}>{inner}</div>
    </div>
  );
};

export const AIBisa: React.FC<{ f: number; fAI: number; slots: Slot[]; end: number }> = ({ f, fAI, slots, end }) => {
  const cur = slots.reduce((acc, s, i) => (f >= s.at - 3 ? i : acc), -1);
  return (
    <>
      <div style={{ position: "absolute", left: 0, width: 1920, top: 96, textAlign: "center", fontFamily: SANS, fontWeight: 500, fontSize: 52, color: C.ink, opacity: k(f, [fAI, fAI + 8], [0, 1]), letterSpacing: "-0.02em" }}>
        AI bisa
      </div>
      {slots.map((s, i) => {
        const next = slots[i + 1]?.at ?? end + 4;
        if (f < s.at - 1 || f > next - 1) return null;
        const inP = k(f, [s.at - 1, s.at + 7], [0, 1], eOut);
        const outP = k(f, [next - 7, next - 1], [0, 1], eIn);
        return (
          <div key={i} style={{ position: "absolute", left: 0, width: 1920, top: 170, display: "flex", justifyContent: "center", alignItems: "center", gap: 26, opacity: inP * (1 - outP), translate: `0 ${(1 - inP) * 50 - outP * 50}px`, filter: `blur(${(1 - inP) * 8 + outP * 8}px)` }}>
            <span data-text={s.a} style={{ fontFamily: SANS, fontWeight: 600, fontSize: 92, letterSpacing: "-0.045em", color: C.ink, whiteSpace: "nowrap" }}>
              {s.a}
            </span>
            <ChipImg kind={s.chip} f={f} at={s.at} />
            <span data-text={s.b} style={{ fontFamily: SANS, fontWeight: 600, fontSize: 92, letterSpacing: "-0.045em", color: C.ink, whiteSpace: "nowrap" }}>
              {s.b}
            </span>
          </div>
        );
      })}
      {cur === 0 && <Fast f={f} at={slots[0].at} out={slots[1].at} />}
      {cur === 1 && <Overnight f={f} at={slots[1].at} out={slots[2].at} />}
      {cur === 2 && <Mirror f={f} at={slots[2].at} out={end} />}
    </>
  );
};

/** 1. Outputs dealt in fast, one after another, fanning out in perspective. */
const Fast: React.FC<{ f: number; at: number; out: number }> = ({ f, at, out }) => {
  const ids = ["landing", "poster", "app", "deck", "store", "ig", "plan"];
  const o = k(f, [out - 4, out + 2], [0, 1], eIn);
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, opacity: 1 - o }}>
      {ids.map((id, i) => {
        const t0 = at + 2 + i * 5;
        if (f < t0) return null;
        const p = k(f, [t0, t0 + 10], [0, 1], eOut);
        const d = DESIGNS.find((x) => x.id === id)!;
        const h = 400;
        const w = Math.min(560, (h * d.nw) / d.nh);
        const slot = i - (ids.length - 1) / 2;
        const x = 960 + slot * 190 - w / 2;
        return (
          <div key={id} style={{ position: "absolute", left: x + (1 - p) * 900, top: 460 + Math.abs(slot) * 22, transform: `perspective(1800px) rotateY(${-slot * 7 - (1 - p) * 40}deg) rotate(${slot * 2.5}deg)`, zIndex: 10 - Math.abs(Math.round(slot)), opacity: p }}>
            <Fit w={w} h={h} nw={d.nw} nh={d.nh} radius={18} shadow>
              <d.C />
            </Fit>
          </div>
        );
      })}
    </div>
  );
};

/** 2. A real store goes up while the sky turns from night to morning; orders arrive. */
const Overnight: React.FC<{ f: number; at: number; out: number }> = ({ f, at, out }) => {
  const day = k(f, [at + 6, out - 6], [0, 1], eIO);
  const o = k(f, [out - 4, out + 2], [0, 1], eIn);
  const p = k(f, [at, at + 12], [0, 1], eOut);
  const hour = Math.round(kk(f, [[at + 6, 23], [out - 6, 31]], eIO)) % 24;
  const sky = `linear-gradient(180deg, ${mix("#17213D", "#9CC2F0", day)} 0%, ${mix("#2B2D55", "#FDE3C2", day)} 100%)`;
  const orders = [
    ["Pesanan baru #1001", "Langit Low · 41", at + 22],
    ["Pesanan baru #1002", "Langit Low · 39", at + 34],
    ["Pesanan baru #1003", "Langit Low · 42", at + 46],
  ] as const;
  return (
    <div style={{ position: "absolute", left: 260, top: 330, width: 1400, height: 700, borderRadius: 40, overflow: "hidden", background: sky, opacity: p * (1 - o), scale: String(0.96 + 0.04 * p) }}>
      <div style={{ position: "absolute", right: 40, top: 30, fontFamily: INTER, fontSize: 30, fontWeight: 600, color: day > 0.5 ? "#1F2937" : "#FFFFFF", fontVariantNumeric: "tabular-nums" }}>{String(hour).padStart(2, "0")}.00</div>
      <div style={{ position: "absolute", left: 120, top: 90, transform: "perspective(1800px) rotateX(8deg)" }}>
        <Fit w={900} h={562} nw={1440} nh={900} radius={16} shadow>
          <StorePage />
        </Fit>
      </div>
      {orders.map(([t, d, a], i) =>
        f >= a ? (
          <div key={t} style={{ position: "absolute", right: 40, top: 110 + i * 112, width: 380, padding: "18px 22px", borderRadius: 22, background: "rgba(255,255,255,0.92)", boxShadow: "0 18px 40px rgba(0,0,0,0.18)", fontFamily: INTER, opacity: k(f, [a, a + 6], [0, 1]), translate: `${(1 - k(f, [a, a + 10], [0, 1], eOut)) * 60}px 0` }}>
            <div style={{ fontSize: 22, fontWeight: 600, color: "#111" }}>{t}</div>
            <div style={{ fontSize: 18, color: "#666", marginTop: 4 }}>{d} · Rp 649.000</div>
          </div>
        ) : null
      )}
    </div>
  );
};

/** 3. Your own writing on the left; the AI reproduces it line for line on the right. */
const Mirror: React.FC<{ f: number; at: number; out: number }> = ({ f, at, out }) => {
  const lines = ["Akhirnya buka juga.", "Satu tahun sangrai di garasi,", "sekarang kamu bisa duduk di sini.", "Sampai ketemu Sabtu ☕"];
  const p = k(f, [at, at + 10], [0, 1], eOut);
  const o = k(f, [out - 4, out + 2], [0, 1], eIn);
  const total = lines.join(" ").length;
  const n = Math.floor(k(f, [at + 10, out - 8], [0, total], (t) => t));
  let used = 0;
  const Doc: React.FC<{ who: string; ai?: boolean }> = ({ who, ai }) => (
    <div style={{ width: 640, height: 520, borderRadius: 24, background: "#FFFFFF", boxShadow: "0 30px 80px rgba(15,23,42,0.14), 0 0 0 1px rgba(15,23,42,0.05)", padding: 44, boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: INTER, fontSize: 20, color: "#6B6B6B" }}>
        <span style={{ width: 34, height: 34, borderRadius: 17, background: ai ? "#C6613F" : "#0A0A0A", color: "#FFF", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>{ai ? "AI" : "IR"}</span>
        {who}
      </div>
      <div style={{ marginTop: 34, fontFamily: RSERIF, fontSize: 34, lineHeight: 1.5, color: "#141413" }}>
        {lines.map((l, i) => {
          if (!ai) return <div key={i}>{l}</div>;
          const start = used;
          used += l.length + 1;
          const shown = l.slice(0, Math.max(0, Math.min(l.length, n - start)));
          return (
            <div key={i} style={{ minHeight: 51 }}>
              {shown}
              {n >= start && n < start + l.length && <span style={{ display: "inline-block", width: 3, height: 34, background: "#C6613F", verticalAlign: "-6px", marginLeft: 2 }} />}
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute" }} />
    </div>
  );
  return (
    <div style={{ position: "absolute", left: 0, width: 1920, top: 380, display: "flex", justifyContent: "center", gap: 60, opacity: p * (1 - o), translate: `0 ${(1 - p) * 60}px` }}>
      <Doc who="Caption · tulisan Irfan" />
      <Doc who="Caption · ditulis AI, gaya: Irfan" ai />
      <div style={{ position: "absolute", left: 960 - 30, top: 230, width: 60, height: 60, borderRadius: 30, background: C.white, boxShadow: "0 10px 30px rgba(15,23,42,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: DM, fontSize: 28, color: C.ink }}>→</div>
    </div>
  );
};

const mix = (a: string, b: string, t: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * t)).join(",")})`;
};

export const _s6a = [eIO];

// ---------------------------------------------------------------- Finale: "tapi tidak dengan seleramu."
// Irfan 15:15 ref sequence: (1) real works swirl around the viewer like a vortex (gofundme ref), (2) they settle into
// an orbit around the centred line on white (marketplace ref), (3) cut to black: one glass card holding "seleramu.",
// the AI cursors can only point at it from outside, only "Kamu" is inside (collab-cursor ref). Then the wordmark.
const RING = ["landing", "poster", "app", "deck", "ig", "store", "reel", "plan", "cv", "caption"];
const RING_LABEL = ["Landing page", "Poster", "Aplikasi", "Pitch deck", "Konten IG", "Toko online", "Reels", "Rencana bisnis", "CV", "Caption"];

export const Finale: React.FC<{ f: number; fTapi: number; fTidak: number; fDengan: number; fSel: number; total: number }> = ({ f, fTapi, fTidak, fDengan, fSel, total }) => {
  const tDark = fSel + 26;
  const tMark = total - 74; // v13: wordmark holds ~2.5 s
  if (f >= tDark) return <GlassFinale f={f} from={tDark} mark={tMark} total={total} />;
  const inP = k(f, [fTapi, fTapi + 8], [0, 1], eOut);
  const settle = k(f, [fTidak - 2, fDengan + 4], [0, 1], eIO); // vortex → ring
  const spread = k(f, [fSel + 10, tDark], [0, 1], eIn); // ring flies out before the cut
  const spin = kk(f, [[fTapi, 0], [fTidak, 1.2], [fDengan + 4, 1.55], [tDark, 1.62]], eOut) * Math.PI * 2;
  return (
    <div style={{ position: "absolute", inset: 0, background: C.white, overflow: "hidden" }}>
      {RING.map((id, i) => {
        const d = DESIGNS.find((x) => x.id === id)!;
        const phi = (i / RING.length) * Math.PI * 2 + spin * (1 - settle * 0.85);
        const rx = (900 - 170 * settle + 900 * spread) * (0.75 + 0.25 * inP);
        const ry = (600 - 220 * settle + 600 * spread) * (0.75 + 0.25 * inP);
        const x = 960 + Math.cos(phi) * rx;
        const y = 540 + Math.sin(phi) * ry;
        const base = 300;
        const sc = 1.45 - 0.75 * settle;
        const w = Math.min(base * 1.4, (base * d.nw) / d.nh) * sc;
        const h = Math.min(base, (base * d.nh) / d.nw) * sc;
        const tang = ((phi * 180) / Math.PI + 90) * (1 - settle);
        const tiltY = -Math.cos(phi) * 38 * (1 - settle);
        const tiltX = Math.sin(phi) * 26 * (1 - settle);
        return (
          <div key={id} style={{ position: "absolute", left: x - w / 2, top: y - h / 2, transform: `perspective(1400px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotate(${tang + (settle * (i % 2 ? 4 : -4))}deg)`, opacity: inP }}>
            <Fit w={w} h={h} nw={d.nw} nh={d.nh} radius={14 * sc} shadow>
              <d.C />
            </Fit>
            <div style={{ position: "absolute", left: 0, right: 0, top: h + 10, textAlign: "center", fontFamily: INTER, fontSize: 18, color: "#6B6B6B", opacity: settle * (1 - spread) }}>{RING_LABEL[i]}</div>
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 0, width: 1920, top: 540, translate: "0 -50%", textAlign: "center", fontFamily: SANS, color: C.ink }}>
        <div data-text="tapi tidak dengan" style={{ fontSize: 56, fontWeight: 500, letterSpacing: "-0.02em", opacity: k(f, [fTidak - 2, fTidak + 6], [0, 1]) * (1 - k(f, [fSel - 2, fSel + 4], [0, 0.45])), translate: `0 ${(1 - k(f, [fTidak - 2, fTidak + 8], [0, 1], eOut)) * 20}px` }}>
          tapi tidak dengan
        </div>
        <div data-text="seleramu." style={{ fontSize: 168, fontWeight: 600, letterSpacing: "-0.055em", lineHeight: 1.05, opacity: k(f, [fSel - 1, fSel + 5], [0, 1]), scale: String(k(f, [fSel - 1, fSel + 10], [0.86, 1], eOut) * (1 + 0.05 * spread)) }}>
          seleramu<span style={{ color: C.blue }}>.</span>
        </div>
      </div>
    </div>
  );
};

const Cursor: React.FC<{ name: string; glow: string; x: number; y: number; flip?: boolean; inside?: boolean }> = ({ name, glow, x, y, flip, inside }) => (
  <div style={{ position: "absolute", left: x, top: y }}>
    <svg width="34" height="34" viewBox="0 0 24 24" style={{ position: "absolute", left: flip ? -34 : 0, top: -34, rotate: flip ? "90deg" : "0deg" }} aria-hidden="true">
      <path d="M3 2 L21 11 L12 13 L9 22 Z" fill="#FFFFFF" />
    </svg>
    <div
      style={{
        position: "absolute",
        left: flip ? -34 - 20 : 24,
        top: 4,
        translate: flip ? "-100% 0" : "0 0",
        padding: "16px 26px",
        borderRadius: 18,
        background: inside ? "rgba(255,255,255,0.14)" : `linear-gradient(135deg, ${glow}33, rgba(20,20,20,0.85))`,
        boxShadow: `0 0 0 1.5px ${inside ? "rgba(255,255,255,0.45)" : glow + "AA"}, 0 0 40px ${glow}44`,
        backdropFilter: "blur(14px)",
        fontFamily: INTER,
        fontSize: 34,
        color: "#FFFFFF",
        whiteSpace: "nowrap",
      }}
    >
      {name}
    </div>
  </div>
);

const GlassFinale: React.FC<{ f: number; from: number; mark: number; total: number }> = ({ f, from, mark, total }) => {
  const p = k(f, [from, from + 14], [0, 1], eOut);
  const out = k(f, [mark - 10, mark], [0, 1], eIn);
  const CX = 960;
  const CY = 520;
  const W = 620;
  const H = 640;
  // AI cursors glide toward the card and stop at its edge; "Kamu" is inside.
  const ai = [
    { name: "ChatGPT", glow: "#34D399", sx: 1700, sy: 140, ex: CX + W / 2 - 10, ey: CY - H / 2 + 70 },
    { name: "Claude", glow: "#F59E0B", sx: 120, sy: 300, ex: CX - W / 2 + 6, ey: CY - 60, flip: true },
    { name: "Gemini", glow: "#C084FC", sx: 1800, sy: 980, ex: CX + W / 2 - 4, ey: CY + H / 2 - 120 },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: "#0A0A0A", overflow: "hidden" }}>
      {/* faint panels behind, like the ref */}
      {[
        [-120, -140, 520, 600],
        [1520, -100, 540, 420],
        [1520, 380, 540, 760],
        [-160, 520, 520, 640],
        [560, 920, 800, 300],
        [560, -280, 800, 300],
      ].map(([x, y, w, h], i) => (
        <div key={i} style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 28, border: "1.5px solid rgba(255,255,255,0.06)" }} />
      ))}
      <div style={{ position: "absolute", left: CX - 520, top: CY - 420, width: 1040, height: 840, background: "radial-gradient(closest-side, rgba(255,255,255,0.07), rgba(255,255,255,0))" }} />
      <div style={{ position: "absolute", inset: 0, opacity: p * (1 - out), scale: String(0.96 + 0.04 * p) }}>
        <div style={{ position: "absolute", left: CX - W / 2, top: CY - H / 2, width: W, height: H, borderRadius: 34, background: "linear-gradient(160deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))", boxShadow: "0 0 0 1.5px rgba(255,255,255,0.22), 0 40px 120px rgba(0,0,0,0.6)", backdropFilter: "blur(20px)" }}>
          <div style={{ position: "absolute", left: 30, right: 30, top: 30, height: 380, borderRadius: 22, background: "rgba(255,255,255,0.05)", boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div data-text="seleramu." style={{ fontFamily: SANS, fontWeight: 600, fontSize: 112, letterSpacing: "-0.055em", color: "#FFFFFF" }}>seleramu.</div>
          </div>
          <div style={{ position: "absolute", left: W / 2 - 80, top: 450, width: 160, height: 26, borderRadius: 8, background: "rgba(255,255,255,0.16)" }} />
          <div style={{ position: "absolute", left: 70, right: 70, top: 506, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.10)" }} />
          <div style={{ position: "absolute", left: 150, right: 150, top: 534, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.10)" }} />
        </div>
        {ai.map((c, i) => {
          const t = k(f, [from + 4 + i * 3, from + 30 + i * 3], [0, 1], eIO);
          return (
            <div key={c.name} style={{ position: "absolute", inset: 0, filter: `blur(${1.6 * t}px)`, opacity: 1 - 0.25 * t }}>
              <Cursor name={c.name} glow={c.glow} x={c.sx + (c.ex - c.sx) * t} y={c.sy + (c.ey - c.sy) * t} flip={c.flip} />
            </div>
          );
        })}
        <Cursor name="Kamu" glow="#FFFFFF" inside x={kk(f, [[from, CX - 120], [from + 40, CX - 150]], eIO)} y={kk(f, [[from, CY + 210], [from + 40, CY + 180]], eIO)} />
      </div>
      {f >= mark - 2 && (
        <div style={{ position: "absolute", left: 0, width: 1920, top: 540, translate: "0 -50%", display: "flex", justifyContent: "center", alignItems: "baseline", gap: 8, opacity: k(f, [mark, mark + 8], [0, 1]), scale: String(k(f, [mark, total], [0.97, 1.02])) }}>
          <span style={{ fontFamily: SANS, fontWeight: 600, fontSize: 96, letterSpacing: "-0.045em", color: "#FFFFFF" }}>jadisatu</span>
          <span style={{ width: 16, height: 16, borderRadius: 8, background: "#FFFFFF", marginBottom: 16, scale: String(k(f, [mark + 8, mark + 14], [0, 1], eOut)) }} />
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------- "Yang ia bawa ke studio hanya satu… ia tau apa yang bagus."
// Irfan 15:49: "bagus." was a text box. Visual: a real recording-session window (Logic-style comp of 8 vocal takes),
// the camera scans the takes, and on "bagus" exactly one take lights up; the rest go quiet.
const TAKES = 8;
const CHOSEN = 5; // "Take 6"
const wave = (seed: number, n: number) =>
  Array.from({ length: n }, (_, i) => {
    const t = i / n;
    const env = Math.sin(Math.PI * Math.min(1, t * 1.15)) * (0.55 + 0.45 * Math.sin(seed * 3.1 + i * 0.37));
    return Math.max(0.08, Math.abs(env) * (0.6 + 0.4 * Math.sin(i * (1.7 + seed * 0.13))));
  });

export const Studio: React.FC<{ f: number; from: number; hanya: number; bagus: number; out: number }> = ({ f, from, hanya, bagus, out }) => {
  const W = 1560;
  const H = 860;
  const inP = k(f, [from, from + 14], [0, 1], eOut);
  const o = k(f, [out - 6, out], [0, 1], eIn);
  const pick = k(f, [bagus - 2, bagus + 8], [0, 1], eOut);
  const scan = k(f, [hanya - 4, bagus - 4], [0, 1], (t) => t);
  const playX = 260 + scan * (W - 300);
  const rowH = 78;
  const top0 = 120;
  // camera inside the window: wide → push to the takes while scanning → lock on the chosen take
  const zScan = k(f, [hanya - 6, hanya + 8], [0, 1], eIO);
  const scanRow = Math.min(TAKES - 1, scan * TAKES);
  const fy = top0 + (zScan > 0 ? Math.min(5.2, Math.max(1.8, scanRow)) : 3.5) * rowH + rowH / 2;
  const fx = 260 + (W - 260) * (0.25 + 0.5 * scan);
  const focusY = fy + (top0 + CHOSEN * rowH + rowH / 2 - fy) * pick;
  const focusX = fx + (W * 0.62 - fx) * pick;
  const s = 1 + 0.35 * zScan + 0.45 * pick;
  const camX = (W / 2 - focusX) * s * Math.max(zScan, pick);
  const camY = (H / 2 - focusY) * s * Math.max(zScan, pick);
  const greens = ["#7ED957", "#F5C542", "#FF9F43", "#7ED957", "#F5C542", "#FF9F43", "#7ED957", "#F5C542"];
  return (
    <div style={{ position: "absolute", left: 960 - W / 2, top: 540 - H / 2 + (1 - inP) * 600 + o * -40, width: W, height: H, opacity: 1 - o }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 18, overflow: "hidden", background: "#1C1C1E", boxShadow: "0 50px 140px rgba(10,10,10,0.35), 0 0 0 1px rgba(10,10,10,0.2)" }}>
        <div style={{ position: "absolute", inset: 0, translate: `${camX}px ${camY}px`, scale: String(s), transformOrigin: `${W / 2}px ${H / 2}px` }}>
          {/* title bar + transport */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 44, background: "#2A2A2D", display: "flex", alignItems: "center", padding: "0 16px", gap: 8, fontFamily: INTER, fontSize: 14, color: "#BDBDC2" }}>
            {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
              <span key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />
            ))}
            <span style={{ flex: 1, textAlign: "center" }}>Hurt — Vocal Comp · Logic Pro</span>
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 44, height: 64, background: "#232326", borderBottom: "1px solid #333", display: "flex", alignItems: "center", gap: 18, padding: "0 24px", fontFamily: INTER, color: "#E5E5EA" }}>
            <span style={{ fontSize: 22 }}>⏮</span>
            <span style={{ fontSize: 22 }}>▶</span>
            <span style={{ width: 16, height: 16, borderRadius: 8, background: "#FF453A" }} />
            <div style={{ marginLeft: 30, padding: "8px 18px", borderRadius: 8, background: "#111", fontFamily: MONO_, fontSize: 20, color: "#7ED957" }}>
              {String(17 + Math.floor(scan * 8)).padStart(3, "0")} 1 1 · 96 BPM
            </div>
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 15, color: "#8E8E93" }}>Comping · 8 take</span>
          </div>
          {/* tracks */}
          {Array.from({ length: TAKES }, (_, i) => {
            const chosen = i === CHOSEN;
            const lit = chosen ? 1 : 1 - 0.75 * pick;
            const near = Math.max(0, 1 - Math.abs(scanRow - i)) * zScan * (1 - pick);
            const col = greens[i];
            const pts = wave(i + 1, 90);
            return (
              <div key={i} style={{ position: "absolute", left: 0, right: 0, top: top0 + i * rowH, height: rowH, borderBottom: "1px solid #2C2C2E", opacity: 0.35 + 0.65 * lit, filter: `blur(${pick * (chosen ? 0 : 2.5)}px)` }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: 240, height: rowH, background: chosen && pick > 0 ? "#2E3B26" : "#252528", display: "flex", alignItems: "center", padding: "0 18px", gap: 12, fontFamily: INTER, fontSize: 17, color: "#E5E5EA" }}>
                  <span style={{ width: 10, height: 10, borderRadius: 5, background: col }} />
                  Vokal · Take {i + 1}
                  <span style={{ marginLeft: "auto", fontSize: 13, color: chosen && pick > 0.5 ? "#7ED957" : "#636366", border: `1px solid ${chosen && pick > 0.5 ? "#7ED957" : "#48484A"}`, borderRadius: 4, padding: "1px 6px" }}>{chosen && pick > 0.5 ? "S" : "M"}</span>
                </div>
                <div style={{ position: "absolute", left: 260 + (i % 3) * 18, right: 40 + (i % 2) * 30, top: 10, height: rowH - 20, borderRadius: 8, background: `${col}${chosen && pick > 0 ? "55" : "26"}`, boxShadow: `inset 0 0 0 1.5px ${col}${chosen ? "" : "88"}${near > 0.5 ? "" : ""}, 0 0 ${30 * pick * (chosen ? 1 : 0)}px ${col}88`, overflow: "hidden" }}>
                  <svg width="100%" height="100%" viewBox="0 0 90 10" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }} aria-hidden="true">
                    {pts.map((a, j) => (
                      <rect key={j} x={j + 0.15} width={0.7} y={5 - a * 4.4} height={a * 8.8} fill={col} opacity={0.9} />
                    ))}
                  </svg>
                </div>
              </div>
            );
          })}
          {/* playhead */}
          <div style={{ position: "absolute", left: playX, top: 108, width: 2, height: H - 108, background: "#FFFFFF", opacity: 1 - pick }} />
          {/* verdict */}
          {pick > 0 && (
            <div style={{ position: "absolute", left: W * 0.62 + 60, top: top0 + CHOSEN * rowH + rowH / 2, translate: "0 -50%", padding: "14px 28px", borderRadius: 999, background: "#FFFFFF", color: "#0A0A0A", fontFamily: SANS, fontWeight: 600, fontSize: 46, letterSpacing: "-0.03em", boxShadow: "0 18px 50px rgba(0,0,0,0.5)", scale: String(k(f, [bagus, bagus + 8], [0.7, 1], eOut)), opacity: k(f, [bagus, bagus + 4], [0, 1]), display: "flex", alignItems: "center", gap: 12, whiteSpace: "nowrap" }}>
              <span style={{ width: 30, height: 30, borderRadius: 15, background: "#34C759", color: "#FFF", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span>
              bagus.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const MONO_ = "Geist Mono";

