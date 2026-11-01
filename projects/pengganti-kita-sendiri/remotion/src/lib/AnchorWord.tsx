// AnchorWord · kata-jangkar hybrid motion (B13, hybrid-motion-standard.md).
// Gerak "Cepat–Hantam–Lambat": masuk 3 f (snap skala 1,35→1 atau whip geser + motion blur searah), lalu drift ease-out
// ekstrem (100→104 % ±1,5 dtk), keluar hard cut atau snap 3 f. Tanpa linear, tanpa fade opasitas.
// Posterize time 12 fps HANYA untuk grup teks ini (frame dikuantisasi), sisa video tetap 30 fps.
// Tekstur kertas/grain di glyph (feTurbulence, deterministik per langkah 12 fps). Satu baris, Inter Black.
// Lapisan: <AnchorStage bg fg> menaruh teks di ANTARA latar dan cutout subjek (teks di belakang subjek).
import React, { useId } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { useSceneFrom, sfxMark, type SfxKind } from "./anim";
import { FPS } from "./time";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const STEP = FPS / 12; // 2,5 f per langkah posterize
const IN_F = 3; // durasi masuk (frame 30 fps)
const OUT_F = 3;
const SNAP = Easing.bezier(0.16, 1, 0.3, 1); // hantam: ease-out sangat tajam
const SLOW = Easing.bezier(0.05, 0.9, 0.1, 1); // drift: ease-out ekstrem
const ACC = Easing.bezier(0.7, 0, 0.84, 0);

export type AnchorEnter = "scale" | "left" | "right";
export type AnchorProps = {
  text: string;
  /** frame LOKAL (di dalam <Scene>/Sequence) tempat kata masuk. Pakai useAnchorAt(detikAbsolut) untuk mengonversi. */
  at: number;
  /** frame lokal keluar (opsional). Tanpa ini kata bertahan. */
  until?: number;
  x: number; y: number; // titik jangkar di layar 1920×1080
  size: number;
  color: string;
  align?: "left" | "center" | "right"; // sisi teks yang menempel di (x,y)
  enter?: AnchorEnter; // default "scale"
  exit?: "cut" | "snap"; // default "cut"
  /** URL cutout subjek (PNG alfa 1920×1080). Kata disembunyikan di area subjek. Alternatif: pakai <AnchorStage fg>. */
  maskSrc?: string;
  /** node cutout subjek (mis. <Img/> alfa 1920×1080) sebagai alternatif maskSrc. Dirender di atas teks di dalam wrapper ini. */
  maskNode?: React.ReactNode;
  /** offset pelacakan per frame (dipakai untuk kata yang mengikuti objek bergerak); ditambahkan ke (x,y). */
  trackFn?: (frame: number) => { x: number; y: number };
  /** cue SFX untuk metronom sfxMark (jatuh tepat di frame masuk). */
  sfx?: { kind: SfxKind; id: string; pan?: number };
  /** kekuatan tekstur 0..1 (default 0,5). Tetap rendah supaya teks kontras tinggi. */
  grain?: number;
  /** bayangan teks CSS untuk keterbacaan di footage terang (mis. "0 4px 36px rgba(0,0,0,.55)"). */
  shadow?: string;
  /** miring (dipakai KREATIF di parallelogram). */
  italic?: boolean;
};

/** detik absolut video → frame lokal di dalam <Scene> (untuk prop `at`/`until`). */
export const useAnchorAt = (absSeconds: number) => Math.round(absSeconds * FPS) - useSceneFrom();

/** frame ABSOLUT video → frame lokal di dalam <Scene> (untuk prop `at`/`until`; dipakai dengan kolom "f terukur" ANCHORS-V9.md). */
export const useFrameAt = (absFrame: number) => absFrame - useSceneFrom();

export const AnchorWord: React.FC<AnchorProps> = ({
  text, at, until, x, y, size, color, align = "center", enter = "scale", exit = "cut", maskSrc, maskNode, trackFn, sfx, grain = 0.5, shadow, italic,
}) => {
  const frame = useCurrentFrame();
  const sceneFrom = useSceneFrom();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  if (sfx) sfxMark((frame + sceneFrom) / FPS, sfx.kind, (at + sceneFrom) / FPS, sfx.id, sfx.pan);
  if (frame < at || (until !== undefined && exit === "cut" && frame >= until)) return null;
  if (until !== undefined && exit === "snap" && frame >= until + OUT_F) return null;

  // posterize 12 fps: kuantisasi frame untuk grup teks ini saja
  const q = Math.floor(frame / STEP) * STEP;
  const lf = Math.max(0, q - at);
  const stepIdx = Math.floor(frame / STEP);

  // CEPAT + HANTAM: 0..IN_F
  const kIn = interpolate(lf, [0, IN_F], [0, 1], { ...clamp, easing: SNAP });
  // LAMBAT: drift 100→104 % selama ±1,5 dtk setelah mendarat
  const drift = interpolate(lf, [IN_F, IN_F + 45], [0, 1], { ...clamp, easing: SLOW });
  const nf = Math.min(1, size / 160); // jarak whip & blur ikut ukuran huruf (adegan yang memakai satuan unit/panel, bukan px)
  let scale = 1 + 0.04 * drift;
  let dx = 0;
  let blurX = 0;
  if (enter === "scale") {
    scale *= 1 + 0.35 * (1 - kIn);
    blurX = 10 * nf * (1 - kIn);
  } else {
    const dir = enter === "left" ? -1 : 1;
    dx = dir * 260 * nf * (1 - kIn);
    blurX = 34 * nf * (1 - kIn);
  }
  // keluar snap 3 f (geser + blur searah, tanpa fade)
  if (until !== undefined && exit === "snap" && frame >= until) {
    const ko = interpolate(Math.max(0, q - until), [0, OUT_F], [0, 1], { ...clamp, easing: ACC });
    dx += (enter === "left" ? -1 : 1) * 320 * nf * ko;
    blurX = Math.max(blurX, 34 * nf * ko);
  }
  const tr = trackFn ? trackFn(q) : { x: 0, y: 0 };
  const tx = align === "left" ? "0%" : align === "right" ? "-100%" : "-50%";
  const seed = stepIdx % 8;
  const g = Math.max(0, Math.min(1, grain));
  const k = (1.2 * g).toFixed(3); // pengali noise → lubang alfa; kecil = teks tetap terbaca
  const off = (1 + 0.55 * 1.2 * g).toFixed(3);

  const textLayer = (
    <AbsoluteFill style={{ filter: blurX > 0.4 ? `url(#ab${uid})` : undefined, pointerEvents: "none" }}>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id={`ab${uid}`} x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation={`${blurX.toFixed(2)} 0`} />
        </filter>
        <filter id={`ag${uid}`} x="-5%" y="-10%" width="110%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85 0.6" numOctaves={2} seed={seed + 1} result="n" />
          <feColorMatrix in="n" type="matrix" values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${(-k)} 0 0 0 ${off}`} result="m" />
          <feComposite in="SourceGraphic" in2="m" operator="in" />
        </filter>
      </svg>
      <div
        style={{
          position: "absolute", left: x + tr.x + dx, top: y + tr.y,
          transform: `translate(${tx}, -50%) scale(${scale})`, transformOrigin: align === "left" ? "0% 50%" : align === "right" ? "100% 50%" : "50% 50%",
          fontFamily: "Inter", fontWeight: 900, fontStyle: italic ? "italic" : undefined, fontSize: size, letterSpacing: -size * 0.03, lineHeight: 1, color, whiteSpace: "nowrap", textShadow: shadow,
          filter: g > 0 ? `url(#ag${uid})` : undefined,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );

  if (!maskSrc && !maskNode) return textLayer;
  // teks disembunyikan di area subjek: mask statis di ruang layar (komposit exclude = isi layar MINUS alfa subjek)
  const maskStyle: React.CSSProperties = maskSrc
    ? {
        WebkitMaskImage: `linear-gradient(#000,#000), url(${maskSrc})`,
        maskImage: `linear-gradient(#000,#000), url(${maskSrc})`,
        WebkitMaskSize: "100% 100%, 100% 100%", maskSize: "100% 100%, 100% 100%",
        WebkitMaskComposite: "xor", maskComposite: "exclude",
      }
    : {};
  return (
    <AbsoluteFill style={maskStyle}>
      {textLayer}
      {maskNode && <AbsoluteFill style={{ pointerEvents: "none" }}>{maskNode}</AbsoluteFill>}
    </AbsoluteFill>
  );
};

/**
 * Susunan lapisan z: bg (paling belakang) → teks (children = <AnchorWord/>) → fg (cutout subjek, di depan teks).
 * Dengan begitu kata tampak berada DI BELAKANG subjek tanpa mask per kata. fg = elemen PNG/WebP alfa 1920×1080
 * (atau video alfa) yang sama persis dengan subjek di bg (dipotong dari frame yang sama).
 */
export const AnchorStage: React.FC<{ bg: React.ReactNode; fg?: React.ReactNode; children: React.ReactNode }> = ({ bg, fg, children }) => (
  <AbsoluteFill>
    <AbsoluteFill>{bg}</AbsoluteFill>
    <AbsoluteFill>{children}</AbsoluteFill>
    {fg && <AbsoluteFill style={{ pointerEvents: "none" }}>{fg}</AbsoluteFill>}
  </AbsoluteFill>
);
