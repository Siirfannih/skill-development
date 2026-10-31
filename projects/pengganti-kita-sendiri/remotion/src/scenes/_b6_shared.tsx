// Babak 6 «Cermin» — komponen bersama: piktogram (kepala bola + badan) dan bidang cahaya.
// Geometri diambil persis dari panel Wonder 06a–06g (unit sel 06b = 164×200, unit belakang 06f = 160×260).
// Semua komponen murni (tanpa state), dipakai ulang lewat map supaya ringan dirender.
import React from "react";
import { Img, staticFile } from "remotion";

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
}> = ({ b, on, slant = 0.1, glow, grad, children, boost = 0 }) => {
  const s = slant * 100;
  const clip = `polygon(${s}% 0%, 100% 0%, ${100 - s}% 100%, 0% 100%)`;
  return (
    <>
      {glow && on > 0.01 && (
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
export const SideUnit: React.FC<{ on: number; rim?: number; flat?: boolean; boost?: number }> = ({ on, rim, flat, boost }) => {
  const rr = rim ?? on;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 164, height: 200 }}>
      <Plane b={{ x: 74, y: 66, w: 86, h: 30 }} on={on} boost={boost} glow={{ b: { x: 78, y: 70, w: 76, h: 24 }, blur: 40, spread: 12, a: 0.18, radius: 12 }} grad={C6.white} />
      <Ball b={{ x: 22, y: 40, w: 40, h: 40 }} rim={0.9 * rr} r={3} flat={flat} />
      <Torso b={{ x: 6, y: 86, w: 72, h: 90 }} rim={0.7 * rr} r={3} flat={flat} />
    </div>
  );
};

/** Glyph AI (ikon asli OpenAI) di bidang. */
export const AIGlyph: React.FC<{ size: number; style?: React.CSSProperties }> = ({ size, style }) => (
  <Img src={staticFile("icons/openai.svg")} style={{ width: size, height: size, ...style }} />
);

/** Unit tampak belakang 06f (160×260): bidang cahaya di atas kepala + glyph. */
export const BackUnit: React.FC<{ on: number; glyph: number; glyphScale?: number; boost?: number; flatY?: number }> = ({ on, glyph, glyphScale = 1, boost = 0, flatY = 1 }) => (
  <div style={{ position: "absolute", left: 0, top: 0, width: 160, height: 260 }}>
    <div style={{ position: "absolute", left: 0, top: -4, width: 160, height: 88, transform: `scaleY(${flatY})`, transformOrigin: "50% 100%" }}>
      <Plane b={{ x: 14, y: 0, w: 132, h: 88 }} on={on} boost={boost} grad={C6.white}
        glow={{ b: { x: 20, y: 4, w: 120, h: 80 }, blur: 50, spread: 14, a: 0.18, radius: 16 }}>
        {glyph > 0.01 && <AIGlyph size={36} style={{ opacity: glyph, transform: `scale(${glyphScale})` }} />}
      </Plane>
    </div>
    <Ball b={{ x: 52, y: 106, w: 56, h: 56 }} rim={0.85 * on} r={5} dir="down" />
    <Torso b={{ x: 30, y: 168, w: 100, h: 100 }} rim={0.65 * on} r={5} dir="down" />
  </div>
);

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
