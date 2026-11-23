// WhipPanTransition.tsx — whip pan: adegan lama terlempar, adegan baru masuk, blur searah + regang + geser RGB tipis.
// Blur, regang, dan RGB dihitung dari kecepatan tiap lapis per frame, jadi puncaknya jatuh di tengah sentakan
// (cut tersembunyi di frame tercepat, X06/C04) dan nol saat diam di ujung.
//
// Dua gaya:
//   "strip"   : A dan B satu pita yang digeser satu kamera (CURVE.whip: tahan, sentak, tahan). Klasik AE.
//   "tumpang" : B meluncur di atas A dengan CURVE.land (cepat datang, mendarat panjang), A ikut terlempar sebagian.
// Pakai <WhipPan phase="out"|"in"> untuk membungkus satu adegan (dipakai SceneChain), atau
// <WhipPanTransition outgoing incoming> untuk dua adegan sekaligus.
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { CURVE, DURASI, WHIP, fr, type WhipIntensity } from "../presets";
import { DirectionalBlur } from "../inti/DirectionalBlur";
import { blurDariKecepatan, chromaDariKecepatan } from "../inti/gerak";

/** Arah konten bergeser. "left" = konten ke kiri, adegan baru datang dari kanan (maju di dunia 2D). */
export type WhipDirection = "left" | "right" | "up" | "down";
export type WhipStyle = "strip" | "tumpang";

export type WhipOptions = {
  durationInFrames?: number;
  direction?: WhipDirection;
  intensity?: WhipIntensity;
  gaya?: WhipStyle;
  /** matikan geser RGB */
  noChroma?: boolean;
};

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

/** Posisi lapis sebagai pecahan panjang sumbu (−1..1), tanda mengikuti arah. Murni dari frame. */
export const whipOffset = (f: number, dur: number, phase: "in" | "out", gaya: WhipStyle, throwFrac: number) => {
  const t = clamp01(f / dur);
  if (gaya === "strip") {
    const u = CURVE.whip(t);
    return phase === "out" ? -u : 1 - u;
  }
  const u = CURVE.land(t);
  return phase === "out" ? -throwFrac * u : 1 - u;
};

const sumbu = (d: WhipDirection) => (d === "left" || d === "right" ? "x" : "y");
const tanda = (d: WhipDirection) => (d === "left" || d === "up" ? 1 : -1);

/** Puncak kecepatan (pecahan sumbu per frame) untuk menormalkan regang. Dihitung numerik sekali per pemanggilan. */
const puncak = (dur: number, phase: "in" | "out", gaya: WhipStyle, th: number) => {
  let m = 1e-6;
  for (let i = 0; i <= 40; i++) {
    const f = (i / 40) * dur;
    m = Math.max(m, Math.abs(whipOffset(f + 0.5, dur, phase, gaya, th) - whipOffset(f - 0.5, dur, phase, gaya, th)));
  }
  return m;
};

export type WhipPanProps = WhipOptions & {
  phase: "in" | "out";
  /** frame lokal mulai transisi (fase out: biasanya = panjang adegan) */
  from?: number;
  children: React.ReactNode;
};

export const WhipPan: React.FC<WhipPanProps> = ({
  phase, from = 0, durationInFrames, direction = "left", intensity = "normal", gaya = "strip", noChroma = false, children,
}) => {
  const frame = useCurrentFrame() - from;
  const { fps, width, height } = useVideoConfig();
  const dur = durationInFrames ?? fr(DURASI.whip, fps);
  const I = WHIP[intensity];
  const ax = sumbu(direction);
  const L = ax === "x" ? width : height;
  const sgn = tanda(direction);
  const full: React.CSSProperties = { position: "absolute", inset: 0 };

  if (phase === "in" && frame < 0) return null;
  if (frame < 0 || (phase === "in" && frame >= dur)) return <div style={full}>{children}</div>;
  if (phase === "out" && frame >= dur && gaya === "strip") return null;

  const off = (f: number) => whipOffset(f, dur, phase, gaya, I.throw) * L * sgn;
  const pos = off(frame);
  const v = Math.abs(off(frame + 0.5) - off(frame - 0.5));
  const vn = v / (puncak(dur, phase, gaya, I.throw) * L);
  const amount = blurDariKecepatan(v, I.shutter, I.maxBlur);
  const chroma = noChroma ? 0 : chromaDariKecepatan(v, 0.01, I.maxChroma);
  const st = 1 + I.stretch * vn;
  const transform = ax === "x" ? `translateX(${pos}px) scaleX(${st})` : `translateY(${pos}px) scaleY(${st})`;
  return (
    <div style={{ ...full, transform }}>
      {/* lapis keluar dibuat buram penuh di tepinya; tepi depan lapis masuk tetap lembut dan berbaur di atas lapis keluar,
          jadi sambungan ikut tercoreng seperti satu pita kamera, tanpa pinggiran hitam */}
      <DirectionalBlur angle={ax === "x" ? 0 : 90} amount={amount} chroma={chroma} opaque={phase === "out"}>{children}</DirectionalBlur>
    </div>
  );
};

export type WhipPanTransitionProps = WhipOptions & {
  outgoing: React.ReactNode;
  incoming: React.ReactNode;
  /** frame lokal mulai transisi; sebelum itu hanya adegan lama, sesudah selesai hanya adegan baru */
  at?: number;
};

/** Dua adegan dalam satu komponen. Adegan lama di bawah, baru di atas (gaya tumpang butuh urutan ini). */
export const WhipPanTransition: React.FC<WhipPanTransitionProps> = ({ outgoing, incoming, at = 0, ...o }) => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
    <WhipPan phase="out" from={at} {...o}>{outgoing}</WhipPan>
    <WhipPan phase="in" from={at} {...o}>{incoming}</WhipPan>
  </div>
);
