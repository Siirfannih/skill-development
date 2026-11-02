// Babak 6 «Cermin» — komponen bersama: piktogram (kepala bola + badan) dan bidang cahaya.
// Geometri diambil persis dari panel Wonder 06a–06g (unit sel 06b = 164×200, unit belakang 06f = 160×260).
// Semua komponen murni (tanpa state), dipakai ulang lewat map supaya ringan dirender.
import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { parallelogram, SourceBloom } from "./parts/NaturalLight";

export const C6 = {
  charcoal: "#101216",
  raised: "#1c1f25",
  white: "#ffffff",
  paper: "#f5f5f7",
  ink: "#1d1d1f",
  line: "#d2d2d7",
};
export const wa = (a: number) => `rgba(255,255,255,${Math.max(0, Math.min(1, a))})`;
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

type Box = { x: number; y: number; w: number; h: number };

// v21 (Irfan 2 Nov 22.25 «objek terlalu rapi → AI slop»): variasi organik per piktogram kerumunan — ukuran kepala/badan, condong,
// dan napas idle (periode & fase berbeda). seed = indeks sel; tanpa seed → geometri asli persis (hero/piktogram tunggal).
const h01 = (n: number) => { const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
export const useOrganic = (seed?: number) => {
  const fr = useCurrentFrame();
  if (seed === undefined) return { hs: 1, tw: 1, th: 1, lean: 0, bob: 0, hx: 0, dx: 0, dy: 0, sc: 1, pw: 1, ps: 0 };
  const r = (k: number) => h01(seed * 7 + k);
  const t = fr / 30;
  return {
    hs: 1 + (r(1) - 0.5) * 0.16, // kepala ±8 %
    tw: 1 + (r(2) - 0.5) * 0.14, // bahu ±7 %
    th: 1 + (r(3) - 0.5) * 0.1,
    lean: (r(4) - 0.5) * 6, // derajat (v21 QC reviewer: ±2° masih terbaca klon → ±3°)
    bob: Math.sin((2 * Math.PI * t) / (2.4 + 1.6 * r(5)) + 6.283 * r(6)) * (0.8 + 0.8 * r(7)),
    hx: (r(8) - 0.5) * 4,
    // v21 QC (reviewer segar: «figur identik berjajar di grid sempurna» = AI slop): tiap unit sedikit keluar dari grid —
    // geser ±7/±5 px unit, skala 0,93–1,07 (kedalaman), bidang cahaya lebar ±13 % dan miring berbeda (perangkat tidak seragam)
    dx: (r(9) - 0.5) * 14,
    dy: (r(10) - 0.5) * 10,
    sc: 0.93 + 0.14 * r(11),
    pw: 0.87 + 0.26 * r(12),
    ps: (r(13) - 0.5) * 0.08,
  };
};
const abs = (b: Box): React.CSSProperties => ({ position: "absolute", left: b.x, top: b.y, width: b.w, height: b.h });

/** Kepala bola. dir side = cahaya dari kanan (menghadap bidang), down = cahaya dari atas (tampak belakang), front = 06g. */
export const Ball: React.FC<{ b: Box; rim: number; r: number; dir?: "side" | "down"; flat?: boolean; style?: React.CSSProperties }> = ({ b, rim, r, dir = "side", flat, style }) => {
  const bg = flat
    ? C6.raised
    : dir === "down"
      ? `linear-gradient(180deg, ${C6.raised} 0%, ${C6.charcoal} 70%)`
      : `linear-gradient(100deg, ${C6.charcoal} 40%, ${C6.raised} 100%)`;
  const sh = dir === "down" ? `inset 0px ${r}px ${r * 0.6}px ${-r * 0.4}px ${wa(rim)}` : `inset ${-r}px 0px ${r * 0.66}px ${-r * 0.33}px ${wa(rim)}`;
  return <div style={{ ...abs(b), borderRadius: "50%", background: bg, boxShadow: rim > 0.004 ? sh : undefined, ...style }} />;
};

/** Badan (setengah kapsul). */
export const Torso: React.FC<{ b: Box; rim: number; r: number; dir?: "side" | "down"; flat?: boolean; style?: React.CSSProperties }> = ({ b, rim, r, dir = "side", flat, style }) => {
  const bg = flat
    ? C6.raised
    : dir === "down"
      ? `linear-gradient(180deg, ${C6.raised} 0%, ${C6.charcoal} 70%)`
      : `linear-gradient(100deg, ${C6.charcoal} 35%, ${C6.raised} 100%)`;
  const sh = dir === "down" ? `inset 0px ${r}px ${r * 0.8}px ${-r * 0.4}px ${wa(rim)}` : `inset ${-r}px ${r * 0.66}px ${r}px ${-r * 0.33}px ${wa(rim)}`;
  return <div style={{ ...abs(b), borderTopLeftRadius: b.w / 2, borderTopRightRadius: b.w / 2, background: bg, boxShadow: rim > 0.004 ? sh : undefined, ...style }} />;
};

/**
 * Bidang cahaya (jajar genjang). on 0..1 = nyala; padam → charcoal-raised.
 * glow = pendar di belakang bidang (box-shadow seperti panel).
 */
export const Plane: React.FC<{
  b: Box; on: number; slant?: number; glow?: { b: Box; blur: number; spread: number; a: number; radius: number };
  grad?: string; children?: React.ReactNode; boost?: number;
  /** pendar besar (blur ≥ 100): box-shadow sebesar itu dipotong Chrome jadi tepi kotak keras → pakai gradien radial */
  softGlow?: boolean;
}> = ({ b, on, slant = 0.1, glow, grad, children, boost = 0, softGlow }) => {
  const s = slant * 100;
  const clip = `polygon(${s}% 0%, 100% 0%, ${100 - s}% 100%, 0% 100%)`;
  const ga = glow ? glow.a * on * (1 + boost) : 0;
  return (
    <>
      {/* v11 (Irfan gambar 3): pendar = bentuk bidang itu sendiri di-blur (parts/NaturalLight), bukan elips radial («balon putih»).
          id dari geometri → filter userSpaceOnUse tiap instance unik. */}
      {glow && on > 0.01 && softGlow && (
        <SourceBloom id={`pb${[b.x, b.y, b.w, b.h, glow.blur].map((v) => Math.round(v * 10)).join("_")}`} poly={parallelogram(b, slant)} a={Math.min(1, ga * 2.2)}
          near={Math.max(3, glow.blur * 0.12)} far={glow.blur * 0.55} />
      )}
      {glow && on > 0.01 && !softGlow && (
        <div style={{ ...abs(glow.b), borderRadius: glow.radius, background: wa(glow.a * on * (1 + boost)), boxShadow: `0px 0px ${glow.blur}px ${glow.spread}px ${wa(glow.a * on * (1 + boost))}` }} />
      )}
      <div style={{ ...abs(b), clipPath: clip, background: C6.raised }} />
      <div style={{ ...abs(b), clipPath: clip, background: grad ?? `linear-gradient(90deg, ${C6.white} 55%, ${C6.paper} 100%)`, opacity: on, display: "flex", justifyContent: "center", alignItems: "center" }}>
        {children}
      </div>
    </>
  );
};

/** Unit sel 06b (164×200): piktogram menghadap kanan + bidang cahaya. Koordinat dalam unit sel. */
export const SideUnit: React.FC<{ on: number; rim?: number; flat?: boolean; boost?: number; glyph?: boolean; seed?: number }> = ({ on, rim, flat, boost, glyph, seed }) => {
  const rr = rim ?? on;
  const o = useOrganic(seed);
  const hw = 40 * o.hs, tw = 72 * o.tw, th = 90 * o.th;
  const pw = 86 * o.pw;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 164, height: 200, transform: seed === undefined ? undefined : `translate(${o.dx.toFixed(2)}px, ${o.dy.toFixed(2)}px) scale(${o.sc.toFixed(4)})`, transformOrigin: "42px 176px" }}>
      <Plane b={{ x: 74, y: 66, w: pw, h: 30 }} on={on} boost={boost} slant={0.1 + o.ps} glow={{ b: { x: 78, y: 70, w: pw - 10, h: 24 }, blur: 40, spread: 12, a: 0.18, radius: 12 }} grad={C6.white} softGlow>
        {glyph && <AIGlyph size={22} />}
      </Plane>
      <div style={{ position: "absolute", inset: 0, transform: seed === undefined ? undefined : `translateY(${o.bob.toFixed(2)}px) rotate(${o.lean.toFixed(2)}deg)`, transformOrigin: "42px 176px" }}>
        <Ball b={{ x: 42 - hw / 2 + o.hx, y: 80 - hw + o.bob * 0.4, w: hw, h: hw }} rim={0.9 * rr} r={3} flat={flat} />
        <Torso b={{ x: 42 - tw / 2, y: 176 - th, w: tw, h: th }} rim={0.7 * rr} r={3} flat={flat} />
      </div>
    </div>
  );
};

/** Glyph AI (ikon asli OpenAI) di bidang. */
export const AIGlyph: React.FC<{ size: number; style?: React.CSSProperties }> = ({ size, style }) => (
  <Img src={staticFile("icons/openai.svg")} style={{ width: size, height: size, ...style }} />
);

/** Unit tampak belakang 06f (160×260): bidang cahaya di atas kepala + glyph. */
export const BackUnit: React.FC<{ on: number; glyph: number; glyphScale?: number; boost?: number; flatY?: number; seed?: number }> = ({ on, glyph, glyphScale = 1, boost = 0, flatY = 1, seed }) => {
  const o = useOrganic(seed);
  const hw = 56 * o.hs, tw = 100 * o.tw;
  const pw = 132 * o.pw, px = 80 - pw / 2;
  return (
  <div style={{ position: "absolute", left: 0, top: 0, width: 160, height: 260, transform: seed === undefined ? undefined : `translate(${o.dx.toFixed(2)}px, ${o.dy.toFixed(2)}px) scale(${o.sc.toFixed(4)})`, transformOrigin: "80px 268px" }}>
    <div style={{ position: "absolute", left: 0, top: -4, width: 160, height: 88, transform: `scaleY(${flatY})`, transformOrigin: "50% 100%" }}>
      {/* v10 (#43): pendar radial lembut (≤ 0,14; tanpa tepi kotak) dan layar tidak putih kosong sebelum glyph — kerangka UI chat tipis (abu), glyph menggantikannya serentak */}
      <Plane b={{ x: px, y: 0, w: pw, h: 88 }} on={on} boost={boost} slant={0.1 + o.ps} grad={`linear-gradient(90deg, ${C6.white} 55%, ${C6.paper} 100%)`} softGlow
        glow={{ b: { x: px + 6, y: 4, w: pw - 12, h: 80 }, blur: 50, spread: 14, a: 0.12, radius: 16 }}>
        {glyph <= 0.01 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 7, width: 70 }}>
            <div style={{ height: 8, width: 46, borderRadius: 4, background: "#d8d8dd" }} />
            <div style={{ height: 8, width: 62, borderRadius: 4, background: "#e4e4e8", alignSelf: "flex-end" }} />
            <div style={{ height: 12, width: 70, borderRadius: 6, background: "#ececf0" }} />
          </div>
        )}
        {glyph > 0.01 && <AIGlyph size={36} style={{ opacity: glyph, transform: `scale(${glyphScale})` }} />}
      </Plane>
    </div>
    <div style={{ position: "absolute", inset: 0, transform: seed === undefined ? undefined : `translateY(${o.bob.toFixed(2)}px) rotate(${(o.lean * 0.5).toFixed(2)}deg)`, transformOrigin: "80px 268px" }}>
      <Ball b={{ x: 80 - hw / 2 + o.hx, y: 162 - hw, w: hw, h: hw }} rim={0.85 * on} r={5} dir="down" />
      <Torso b={{ x: 80 - tw / 2, y: 168, w: tw, h: 100 }} rim={0.65 * on} r={5} dir="down" />
    </div>
  </div>
  );
};

/** Relay lampu: 1 → kedip singkat → 0 di t0 (klik relay). */
export const relay = (t: number, t0: number): number => {
  const fr = Math.round((t - t0) * 30);
  if (fr < 0) return 1;
  if (fr === 0) return 0;
  if (fr === 1) return 0.45;
  return 0;
};

/** Teks gradien abu di bidang cahaya (gaya KREATIF 02d). */
export const PLANE_TEXT: React.CSSProperties = {
  fontFamily: "Inter", fontWeight: 900, fontStyle: "italic", lineHeight: 1, whiteSpace: "nowrap",
  color: "transparent", backgroundImage: "linear-gradient(90deg, rgb(110,110,115) 0%, rgb(210,210,215) 100%)",
  WebkitBackgroundClip: "text", backgroundClip: "text",
};
