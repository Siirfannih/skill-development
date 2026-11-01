// SpeakerWords · teks per kata untuk NARASUMBER (berita, Jensen, Altman) — F2 FEEDBACK-2NOV-0016.
// Keluarga font satu (Inter), tetapi EMPAT teknik masuk dipilih per fungsi kata (bukan satu gaya untuk semua):
//   normal → mask-reveal naik 3 f (kata dipotong kotaknya sendiri, naik dari bawah; tanpa fade)
//   emph   → AnchorWord (snap 3 f + drift, posterize 12 fps, grain kertas, lebih besar)
//   number → scale-slam (1,9→1,25→1 dalam 3 f + blur) + tracking rapat (angka/uang)
//   last   → kata penutup kalimat: mask-reveal lalu tracking-out pelan (−0,03 → +0,14 em ±1,7 dtk, ease-out ekstrem)
// Tata letak: `flowLine` menghitung posisi x tiap kata dari lebar glyph Inter asli (tabel advance Inter ExtraBold/Black,
// kerning diabaikan), baseline sejajar, hierarki ukuran per kata. Kata masuk TEPAT di frame `at` (selalu ceil dari onset,
// tidak pernah lebih awal). VO tidak memakai komponen ini (VO tetap anchor saja).
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { AnchorWord, type AnchorEnter } from "./AnchorWord";
import { EZ, sfxMark, useSceneFrom, type SfxKind } from "./anim";
import { FPS, word as timelineWord } from "./time";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const TRACK_OUT = Easing.bezier(0.05, 0.9, 0.1, 1);

// advance glyph Inter (satuan 1/1000 em), ASCII 32..126; hasil fontTools dari Inter-ExtraBold/Black.otf
const ADV800 = [219, 358, 586, 655, 660, 1029, 683, 354, 382, 382, 583, 686, 353, 471, 353, 400, 692, 441, 638, 657, 688, 652, 662, 588, 664, 662, 353, 360, 686, 686, 686, 579, 1036, 770, 665, 744, 723, 610, 585, 752, 749, 286, 590, 738, 565, 943, 766, 773, 652, 782, 662, 660, 677, 727, 770, 1059, 761, 752, 679, 382, 400, 382, 493, 484, 382, 588, 638, 595, 638, 601, 410, 639, 635, 283, 283, 593, 283, 927, 635, 619, 638, 638, 420, 573, 382, 635, 615, 863, 594, 618, 581, 486, 388, 486, 686];
const ADV900 = [199, 381, 625, 662, 666, 1044, 695, 372, 388, 388, 608, 693, 373, 475, 373, 412, 711, 452, 646, 669, 702, 666, 675, 595, 679, 675, 373, 378, 693, 693, 693, 601, 1059, 795, 668, 748, 723, 613, 584, 754, 750, 291, 596, 759, 565, 956, 770, 775, 656, 787, 668, 666, 687, 722, 795, 1082, 786, 775, 694, 388, 412, 388, 500, 493, 401, 597, 646, 603, 646, 606, 422, 647, 649, 296, 296, 606, 296, 943, 649, 625, 646, 646, 434, 588, 399, 649, 632, 877, 609, 636, 590, 505, 405, 505, 693];

/** lebar teks (px) untuk Inter `weight` 800/900 pada `size` px dengan letter-spacing `trackEm` (em, tiap huruf). */
export const textWidth = (text: string, size: number, weight: 800 | 900 = 900, trackEm = -0.03) => {
  const T = weight === 800 ? ADV800 : ADV900;
  let w = 0;
  for (const ch of text) {
    const c = ch.charCodeAt(0);
    w += ((c >= 32 && c <= 126 ? T[c - 32] : 640) / 1000) * size + trackEm * size;
  }
  return w;
};

/** frame ABSOLUT masuk sebuah kata dari timeline.json: ceil(onset × 30), tidak pernah sebelum kata diucapkan. */
export const wordAt = (src: string, w: string, n = 1) => Math.ceil(timelineWord(w, src, n).s * FPS - 1e-6);

export type SpeakerKind = "normal" | "emph" | "number" | "last";
export type SpeakerWordSpec = {
  /** teks tampil (tanpa tanda baca). normal/last ditulis huruf kecil, emph/number biasanya KAPITAL. */
  text: string;
  /** frame ABSOLUT video tempat kata masuk (pakai wordAt, atau f terukur ANCHORS-V9 untuk anchor). */
  at: number;
  size: number;
  kind?: SpeakerKind; // default "normal"
  /** frame ABSOLUT keluar (hard cut). Default: `until` milik SpeakerWords. */
  until?: number;
  color?: string;
  enter?: AnchorEnter; // khusus emph
  sfx?: { kind: SfxKind; id: string; pan?: number };
  grain?: number; // khusus emph
  /** miring/rotasi derajat (dipakai orbit) */
  rot?: number;
};
export type PlacedWord = SpeakerWordSpec & { x: number; baseline: number; align?: "left" | "center" | "right" };

const trackOf = (k: SpeakerKind) => (k === "number" ? -0.07 : k === "last" ? 0.14 : k === "emph" ? -0.03 : -0.02);
const weightOf = (k: SpeakerKind): 800 | 900 => (k === "normal" || k === "last" ? 800 : 900);
const widthOf = (w: SpeakerWordSpec) => {
  const k = w.kind ?? "normal";
  return textWidth(w.text, w.size, weightOf(k), trackOf(k));
};

/**
 * Susun satu baris: kata berurutan dengan baseline sama, hierarki ukuran per kata. align = sisi baris yang menempel di `x`.
 * Lebar dihitung untuk keadaan AKHIR (kata `last` sudah tracking-out), sehingga baris tidak bergeser saat kata muncul.
 */
export const flowLine = (
  words: SpeakerWordSpec[], opts: { x: number; baseline: number; align?: "left" | "center" | "right"; gap?: number },
): PlacedWord[] => {
  const widths = words.map(widthOf);
  const gaps = words.map((w, i) => (i === 0 ? 0 : opts.gap ?? 0.26 * Math.min(words[i - 1].size, w.size)));
  const total = widths.reduce((a, b) => a + b, 0) + gaps.reduce((a, b) => a + b, 0);
  const align = opts.align ?? "left";
  let cx = align === "left" ? opts.x : align === "center" ? opts.x - total / 2 : opts.x - total;
  return words.map((w, i) => {
    cx += gaps[i];
    const p: PlacedWord = { ...w, x: cx, baseline: opts.baseline, align: "left" };
    cx += widths[i];
    return p;
  });
};

const ASC = 0.864; // baseline Inter dari tepi atas kotak line-height 1 (em)
const BL_FROM_CENTER = 0.364; // baseline − pusat vertikal kotak (em)

const NormalLike: React.FC<{ w: PlacedWord; absF: number; shadow: string; color: string }> = ({ w, absF, shadow, color }) => {
  const kind = w.kind ?? "normal";
  const lf = absF - w.at;
  const s = w.size;
  const pad = 0.16 * s;
  let tr = 0; // translateY (em) untuk reveal
  let scale = 1;
  let blur = 0;
  let track = trackOf(kind);
  if (kind === "number") {
    scale = lf <= 0 ? 1.9 : lf === 1 ? 1.25 : 1;
    blur = lf <= 0 ? 8 : lf === 1 ? 2.5 : 0;
  } else {
    tr = interpolate(lf, [0, 3], [1.15, 0], { ...clamp, easing: EZ.out });
    if (kind === "last") track = -0.03 + 0.17 * interpolate(lf, [3, 55], [0, 1], { ...clamp, easing: TRACK_OUT });
  }
  const inner = (
    <div
      style={{
        fontFamily: "Inter", fontWeight: weightOf(kind), fontSize: s, letterSpacing: `${track}em`, lineHeight: 1, color, whiteSpace: "nowrap",
        textShadow: shadow, transform: kind === "number" ? `scale(${scale})` : `translateY(${tr * 100}%)`,
        transformOrigin: "0% 60%", filter: blur ? `blur(${blur}px)` : undefined,
      }}
    >
      {w.text}
    </div>
  );
  return (
    <div
      style={{
        position: "absolute", left: w.x, top: w.baseline - ASC * s - pad, paddingTop: pad, paddingBottom: pad, lineHeight: 1,
        overflow: kind === "number" ? "visible" : "hidden", transform: w.rot ? `rotate(${w.rot}deg)` : undefined,
        transformOrigin: `0% ${(pad + ASC * s) / (s + 2 * pad) * 100}%`,
      }}
    >
      {inner}
    </div>
  );
};

/** Render kata yang sudah punya posisi (x, baseline). Dipakai langsung untuk orbit/komposisi bebas, atau lewat <SpeakerLine>. */
export const SpeakerWords: React.FC<{
  words: PlacedWord[];
  /** frame ABSOLUT keluar bersama untuk semua kata yang tidak punya `until` sendiri. */
  until?: number;
  color?: string;
  shadow?: string;
}> = ({ words, until, color = "#FAF8EC", shadow = "0 2px 6px rgba(0,0,0,0.35), 0 4px 36px rgba(0,0,0,0.6)" }) => {
  const frame = useCurrentFrame();
  const sf = useSceneFrom();
  const absF = frame + sf;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {words.map((w, i) => {
        const kind = w.kind ?? "normal";
        const end = w.until ?? until;
        const col = w.color ?? color;
        if (kind === "emph") {
          // AnchorWord: frame lokal; titik jangkar = kiri-tengah kotak → y = baseline − 0,364 em
          if (w.sfx) sfxMark(absF / FPS, w.sfx.kind, w.at / FPS, w.sfx.id, w.sfx.pan);
          return (
            <AnchorWord key={i} text={w.text} at={w.at} until={end} x={w.x} y={w.baseline - BL_FROM_CENTER * w.size}
              size={w.size} color={col} align="left" enter={w.enter ?? "scale"} shadow={shadow} grain={w.grain} />
          );
        }
        if (absF < w.at || (end !== undefined && absF >= end)) return null;
        return <NormalLike key={i} w={w} absF={absF} shadow={shadow} color={col} />;
      })}
    </AbsoluteFill>
  );
};

/** Satu baris kata berhierarki: flowLine + SpeakerWords. */
export const SpeakerLine: React.FC<{
  words: SpeakerWordSpec[]; x: number; baseline: number; align?: "left" | "center" | "right"; gap?: number;
  until?: number; color?: string; shadow?: string;
}> = ({ words, x, baseline, align, gap, until, color, shadow }) => (
  <SpeakerWords words={flowLine(words, { x, baseline, align, gap })} until={until} color={color} shadow={shadow} />
);

/**
 * Posisi kata di sepanjang busur elips (orbit): kata berurutan mengisi busur bawah (depan) kiri→kanan sesuai lebar tiap kata.
 * `gapsAfter[i]` = ruang kosong (px) sesudah kata i (mis. tempat anchor di belakang kepala). Ukuran dikecilkan otomatis bila tak muat.
 */
export const orbitLine = (
  words: SpeakerWordSpec[], ring: { x: number; y: number; rx: number; ry: number },
  opts: { gapsAfter?: Record<number, number>; fill?: number; rotK?: number; maxRot?: number } = {},
): PlacedWord[] => {
  const fill = opts.fill ?? 0.9;
  const rotK = opts.rotK ?? 0.5;
  const maxRot = opts.maxRot ?? 26;
  // tabel panjang busur bawah (θ: π → 0)
  const N = 400;
  const pts: { th: number; s: number }[] = [];
  let acc = 0;
  let px = ring.x - ring.rx;
  let py = ring.y;
  for (let i = 0; i <= N; i++) {
    const th = Math.PI - (Math.PI * i) / N;
    const x = ring.x + ring.rx * Math.cos(th);
    const y = ring.y + ring.ry * Math.sin(th);
    acc += Math.hypot(x - px, y - py);
    pts.push({ th, s: acc });
    px = x; py = y;
  }
  const arcLen = acc;
  const gapSp = (i: number) => (i === 0 ? 0 : 0.26 * Math.min(words[i - 1].size, words[i].size));
  const lens = (k: number) => words.map((w) => widthOf({ ...w, size: w.size * k }));
  const need = (k: number) =>
    lens(k).reduce((a, b) => a + b, 0) + words.reduce((a, _w, i) => a + gapSp(i) * k, 0) + Object.values(opts.gapsAfter ?? {}).reduce((a, b) => a + b, 0);
  const k = Math.min(1, (fill * arcLen) / need(1));
  const L = lens(k);
  let cursor = ((1 - fill) / 2) * arcLen + (fill * arcLen - need(k)) / 2; // pusatkan di busur
  return words.map((w, i) => {
    cursor += gapSp(i) * k;
    const mid = cursor + L[i] / 2;
    cursor += L[i] + (opts.gapsAfter?.[i] ?? 0);
    const p = pts.find((q) => q.s >= mid) ?? pts[pts.length - 1];
    const cx = ring.x + ring.rx * Math.cos(p.th);
    const cy = ring.y + ring.ry * Math.sin(p.th);
    // singgung busur: dx/dθ = −rx sinθ, dy/dθ = ry cosθ (θ menurun → arah kiri→kanan)
    const tang = (Math.atan2(-ring.ry * Math.cos(p.th), ring.rx * Math.sin(p.th)) * 180) / Math.PI;
    const rot = Math.max(-maxRot, Math.min(maxRot, tang * rotK));
    const size = w.size * k;
    return { ...w, size, x: cx - L[i] / 2, baseline: cy + 0.3 * size, rot, align: "left" };
  });
};
