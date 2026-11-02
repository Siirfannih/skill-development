// AnchorWord · kata-jangkar hybrid motion (B13, hybrid-motion-standard.md).
// Gerak "Cepat–Hantam–Lambat": masuk 3 f (snap skala 1,35→1 atau whip geser + motion blur searah), lalu drift ease-out
// ekstrem (100→104 % ±1,5 dtk), keluar hard cut atau snap 3 f. Tanpa linear, tanpa fade opasitas.
// Posterize time 12 fps HANYA untuk grup teks ini (frame dikuantisasi), sisa video tetap 30 fps.
// Tekstur kertas/grain di glyph (feTurbulence, deterministik per langkah 12 fps). Satu baris, Inter Black.
// Lapisan: <AnchorStage bg fg> menaruh teks di ANTARA latar dan cutout subjek (teks di belakang subjek).
import { useProbe } from "./probe";
import React, { useId } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { useSceneFrom, sfxMark, type SfxKind } from "./anim";
import { FPS, PANELS } from "./time";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const STEP = FPS / 12; // 2,5 f per langkah posterize
const IN_F = 3; // durasi masuk (frame 30 fps)
const OUT_F = 3;
const SNAP = Easing.bezier(0.16, 1, 0.3, 1); // hantam: ease-out sangat tajam
const SLOW = Easing.bezier(0.05, 0.9, 0.1, 1); // drift: ease-out ekstrem
const ACC = Easing.bezier(0.7, 0, 0.84, 0);

/**
 * v11 (Irfan 2 Nov 14.18 «mekanismemu selalu sama … explore per kata»): teknik masuk dipilih per PERAN kata (AUDIT-2NOV-B):
 *   blur    → blur→tajam 3 f di tempat (ucapan, kesadaran/fokus)
 *   mask    → naik dari balik mask 4 f (pernyataan tegas)
 *   type    → diketik huruf per huruf 1,5 f/huruf + caret tipis yang hilang 8 f setelah selesai (kata personal: «kita», «kamu»).
 *             Memancarkan sfxMark "type" <scene>:type:<teks>:start|end (tanpa klik word:).
 *   letters → tiap huruf naik + blur, stagger 1 f (kata kreatif/ekspresif)
 *   scale   → blur + pop kecil 1,05→1 (HANYA angka/hero)
 *   left/right → geser pendek 48 px + blur searah (pasangan kata yang bergerak berlawanan)
 * Dalam satu urutan, teknik yang sama ≤ 2× berturut-turut (lihat REVIEW-V11-T.md).
 */
export type AnchorEnter = "scale" | "left" | "right" | "blur" | "mask" | "type" | "letters";
/** shadow halus standar v11 (Irfan: shadow gelap lebar terlihat seperti pita di belakang teks) */
export const SOFT_SHADOW = "0 1px 2px rgba(0,0,0,.45), 0 2px 10px rgba(0,0,0,.30)";
/** shadow yang diberikan adegan dijinakkan: radius blur > 10 px → SOFT_SHADOW (tanpa pita gelap). "none" = tanpa shadow. */
export const softenShadow = (sh: string | undefined, color: string): string | undefined => {
  if (sh === "none") return undefined;
  if (sh) {
    const blurs = [...sh.matchAll(/(-?\d+(?:\.\d+)?)(?:px)?\s+(-?\d+(?:\.\d+)?)(?:px)?\s+(\d+(?:\.\d+)?)px/g)].map((m) => +m[3]);
    return blurs.some((b) => b > 10) ? SOFT_SHADOW : sh;
  }
  // default: teks terang (di footage/gelap) → shadow halus; teks gelap di latar terang → tanpa shadow
  const m = /^#([0-9a-f]{6})$/i.exec(color.trim());
  if (!m) return /^(#fff|white)/i.test(color.trim()) ? SOFT_SHADOW : undefined;
  const v = parseInt(m[1], 16);
  const l = (0.2126 * ((v >> 16) & 255) + 0.7152 * ((v >> 8) & 255) + 0.0722 * (v & 255)) / 255;
  return l > 0.55 ? SOFT_SHADOW : undefined;
};
const TYPE_F = 1.5; // frame per huruf (ketik)
const CARET_HOLD = 16; // caret bertahan sesudah huruf terakhir lalu hilang
/** kode panel (00a…06g) yang memuat frame absolut f — untuk id penanda SFX */
const panelAt = (absF: number) => {
  const t = absF / FPS;
  let code = "xx";
  for (const p of PANELS) if (t + 1e-6 >= p.t) code = p.panel;
  return code;
};
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
  /** ketebalan Geist Sans (default 600 SemiBold) */
  weight?: 500 | 600;
  /** letter-spacing (em), default −0,02 */
  track?: number;
};

/** detik absolut video → frame ABSOLUT (prop `at`/`until` AnchorWord selalu absolut). */
// v10 (Irfan 06.48): pembeda estetika = huruf kapital di AWAL kata, bukan seluruh huruf kapital. Akronim tetap.
const ACR = new Set(["AI", "CEO", "OK", "AGI"]);
export const displayCase = (t: string) =>
  t.split(" ").map((w) => (ACR.has(w) || /[0-9]/.test(w) || w !== w.toUpperCase() ? w : w.charAt(0) + w.slice(1).toLowerCase())).join(" ");

export const useAnchorAt = (absSeconds: number) => Math.round(absSeconds * FPS);

/** frame ABSOLUT video (kolom "f terukur" ANCHORS-V9.md) → dipakai langsung sebagai prop `at`/`until`. */
export const useFrameAt = (absFrame: number) => absFrame;

export const AnchorWord: React.FC<AnchorProps> = ({
  text, at: atAbs, until: untilAbs, x, y, size, color, align = "center", enter = "scale", exit = "cut", maskSrc, maskNode, trackFn, sfx, grain = 0.5, shadow, italic, weight = 600, track = -0.02,
}) => {
  const frame = useCurrentFrame();
  const sceneFrom = useSceneFrom();
  // v9 fix: `at`/`until` SELALU frame ABSOLUT video (kolom "f terukur"); konversi ke lokal di sini, sehingga benar
  // baik hook dipanggil di dalam maupun di luar <Scene> (bug 2 Nov: anchor di 15 adegan tidak pernah muncul).
  const at = atAbs - sceneFrom;
  const until = untilAbs === undefined ? undefined : untilAbs - sceneFrom;
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const probe = useProbe(`anchor:${text}`, "text", frame + sceneFrom, color);
  const shown = displayCase(text);
  const nTyped = [...shown].length;
  const typeEnd = atAbs + Math.round((nTyped - 1) * TYPE_F); // frame absolut huruf terakhir
  if (sfx) sfxMark((frame + sceneFrom) / FPS, sfx.kind, (at + sceneFrom) / FPS, sfx.id, sfx.pan);
  if (enter === "type") {
    // v11: ketikan = penanda "type" awal & akhir (tanpa klik word:, Irfan: typing hanya bunyi ketik/enter)
    const id = `${panelAt(atAbs)}:type:${text.replace(/\s+/g, "_")}`;
    sfxMark((frame + sceneFrom) / FPS, "type", atAbs / FPS, `${id}:start`);
    sfxMark((frame + sceneFrom) / FPS, "type", typeEnd / FPS, `${id}:end`);
  } else if (!sfx) {
    // setiap kata kinetik yang muncul = satu klik (Irfan 2 Nov 12.41); mapper membuang klik ini bila event lain jatuh ≤2 f
    sfxMark((frame + sceneFrom) / FPS, "word", (at + sceneFrom) / FPS, `word:${text.replace(/\s+/g, "_")}:${atAbs}`);
  }
  if (frame < at || (until !== undefined && exit === "cut" && frame >= until)) return null;
  if (until !== undefined && exit === "snap" && frame >= until + OUT_F) return null;

  // posterize 12 fps: kuantisasi frame untuk grup teks ini saja (teknik per huruf/mask memakai frame asli supaya stagger 1 f terasa)
  const q = Math.floor(frame / STEP) * STEP;
  const lf = Math.max(0, q - at);
  const lfRaw = frame - at;
  const stepIdx = Math.floor(frame / STEP);

  // CEPAT + HANTAM: 0..IN_F
  const kIn = interpolate(lf, [0, IN_F], [0, 1], { ...clamp, easing: SNAP });
  // LAMBAT: drift 100→104 % selama ±1,5 dtk setelah mendarat
  const drift = interpolate(lf, [IN_F, IN_F + 45], [0, 1], { ...clamp, easing: SLOW });
  const nf = Math.min(1, size / 160); // jarak whip & blur ikut ukuran huruf (adegan yang memakai satuan unit/panel, bukan px)
  // v10 (Irfan 2 Nov 07.09 + audit referensi): masuk = BLUR → TAJAM 3 f (tanpa pop membesar). left/right hanya geser pendek
  // 48 px ke posisi. Drift sangat halus (100→101,5 %) supaya kata tetap hidup tanpa terasa "pop and drift".
  const perLetter = enter === "type" || enter === "letters" || enter === "mask";
  let scale = 1 + 0.015 * drift;
  let dx = 0;
  let blurX = perLetter ? 0 : 16 * nf * (1 - kIn);
  if (enter === "left" || enter === "right") dx = (enter === "left" ? -1 : 1) * 48 * nf * (1 - kIn);
  else if (enter === "scale") scale *= 1 + 0.05 * (1 - kIn);
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
  const sh = softenShadow(shadow, color);

  // isi glyph per teknik
  let body: React.ReactNode = shown;
  if (enter === "type") {
    // huruf yang belum terketik tetap memegang tempat (transparan) → kotak & posisi tidak bergeser selama mengetik
    const n = Math.min(nTyped, Math.floor(lfRaw / TYPE_F) + 1);
    const chars = [...shown];
    // caret: menyala selama mengetik, lalu berkedip 4 f nyala/padam sampai CARET_HOLD habis
    const doneF = (nTyped - 1) * TYPE_F;
    const caretOn = lfRaw <= doneF || (lfRaw <= doneF + CARET_HOLD && Math.floor((lfRaw - doneF) / 4) % 2 === 1);
    body = (
      <>
        <span>{chars.slice(0, n).join("")}</span>
        {caretOn && (
          <span style={{ display: "inline-block", width: 0, height: "1em", verticalAlign: "top", position: "relative" }}>
            {/* garis vertikal tipis setinggi cap-height (Geist ±0,70 em), duduk di baseline — bukan titik/koma */}
            <span style={{ position: "absolute", left: 0.04 * size, top: 0.13 * size, width: Math.max(2, 0.035 * size), height: 0.72 * size, background: color, borderRadius: 1 }} />
          </span>
        )}
        <span style={{ color: "transparent", textShadow: "none" }}>{chars.slice(n).join("")}</span>
      </>
    );
  } else if (enter === "letters") {
    body = [...shown].map((ch, i) => {
      const p = interpolate(lfRaw - i, [0, 4], [0, 1], { ...clamp, easing: SNAP });
      return (
        <span key={i} style={{ display: "inline-block", whiteSpace: "pre", transform: `translateY(${(1 - p) * 0.42}em)`, opacity: p > 0 ? 0.25 + 0.75 * p : 0, filter: p < 1 ? `blur(${(1 - p) * 0.06 * size}px)` : undefined }}>
          {ch}
        </span>
      );
    });
  } else if (enter === "mask") {
    const p = interpolate(lfRaw, [0, 4], [0, 1], { ...clamp, easing: SNAP });
    body = (
      <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", padding: "0.12em 0.06em", margin: "-0.12em -0.06em" }}>
        <span style={{ display: "inline-block", transform: `translateY(${(1 - p) * 115}%)` }}>{shown}</span>
      </span>
    );
  }

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
        ref={probe}
        data-emph={shown}
        style={{
          position: "absolute", left: x + tr.x + dx, top: y + tr.y,
          transform: `translate(${tx}, -50%) scale(${scale})`, transformOrigin: align === "left" ? "0% 50%" : align === "right" ? "100% 50%" : "50% 50%",
          fontFamily: "Geist Sans", fontWeight: weight, fontStyle: italic ? "italic" : undefined, fontSize: size, letterSpacing: size * track, lineHeight: 1, color, whiteSpace: "nowrap", textShadow: sh,
          filter: g > 0 ? `url(#ag${uid})` : undefined,
        }}
      >
        {body}
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
