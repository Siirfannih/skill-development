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
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnchorWord, SOFT_SHADOW, softenShadow, type AnchorEnter } from "./AnchorWord";
import { EZ, sfxMark, useSceneFrom, type SfxKind } from "./anim";
import { FPS, word as timelineWord } from "./time";
import { SAFE } from "./safe";
import { useProbe } from "./probe";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// advance glyph Geist Sans (satuan 1/1000 em), ASCII 32..126; fontTools dari @fontsource/geist-sans 500/600 (v10: Inter Black diganti — Irfan 07.23 «terlalu tebal»)
export const DISPLAY_FONT = "Geist Sans";
const ADV500 = [243, 230, 369, 515, 659, 794, 651, 192, 325, 325, 433, 565, 215, 425, 215, 496, 680, 406, 630, 626, 651, 641, 636, 589, 625, 638, 298, 298, 545, 648, 549, 577, 930, 695, 688, 711, 708, 610, 596, 718, 709, 282, 608, 670, 584, 890, 742, 756, 658, 750, 681, 659, 596, 695, 694, 938, 659, 652, 561, 352, 492, 352, 408, 564, 256, 590, 611, 569, 611, 582, 416, 611, 592, 258, 284, 610, 299, 885, 592, 594, 611, 611, 398, 546, 414, 587, 562, 830, 608, 555, 565, 426, 275, 426, 532];
const ADV600 = [236, 243, 378, 552, 669, 817, 680, 195, 336, 336, 429, 559, 227, 423, 227, 510, 689, 428, 642, 640, 665, 656, 648, 592, 646, 651, 304, 304, 541, 636, 545, 586, 945, 719, 696, 720, 714, 616, 600, 727, 713, 291, 617, 688, 586, 903, 745, 765, 665, 759, 689, 669, 614, 699, 717, 965, 689, 674, 579, 368, 506, 368, 414, 565, 261, 605, 624, 586, 624, 596, 432, 623, 601, 270, 308, 629, 313, 893, 601, 608, 624, 624, 412, 562, 431, 597, 586, 840, 630, 571, 581, 429, 285, 429, 527];

/** lebar teks (px) untuk Inter `weight` 800/900 pada `size` px dengan letter-spacing `trackEm` (em, tiap huruf). */
export const textWidth = (text: string, size: number, weight: 500 | 600 = 600, trackEm = -0.02) => {
  const T = weight === 500 ? ADV500 : ADV600;
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

const trackOf = (_k: SpeakerKind) => -0.01; // v10: tanpa tracking-out «melebar» (tidak ada di referensi)
const weightOf = (_k: SpeakerKind): 500 | 600 => 500; // ucapan Medium 500; penekanan lewat warna, bukan ketebalan
const widthOf = (w: SpeakerWordSpec) => {
  const k = w.kind ?? "normal";
  return textWidth(w.text, w.size, weightOf(k), trackOf(k));
};

/**
 * Susun satu baris: kata berurutan dengan baseline sama, hierarki ukuran per kata. align = sisi baris yang menempel di `x`.
 * Lebar dihitung untuk keadaan AKHIR (kata `last` sudah tracking-out), sehingga baris tidak bergeser saat kata muncul.
 */
// Aturan Irfan 2 Nov 06.48: ukuran font SERAGAM dalam satu urutan; pembeda = huruf kapital di awal (bukan ukuran).
// Teks = penekanan (prioritas 2) → ukuran sedang. Semua baris dijepit ke SAFE ZONE x 15–85 %, y 20–80 % (lib/safe.ts).
export const LINE_SIZE = 76;
/** warna aksen kata kunci narasumber (satu peran = satu gaya di seluruh video) */
export const ACCENT = "#FFD25A";
const ACRONYM = new Set(["AI", "CEO", "OK", "AGI"]);
const caseWord = (text: string, i: number, kind: SpeakerKind) =>
  text.split(" ").map((t, j) => {
    if (ACRONYM.has(t.toUpperCase()) && t === t.toUpperCase()) return t;
    if (/^[0-9]/.test(t)) return t;
    const low = t.toLowerCase();
    return (i === 0 && j === 0) || kind === "emph" || kind === "number" ? low.charAt(0).toUpperCase() + low.slice(1) : low;
  }).join(" ");

export const flowLine = (
  wordsIn: SpeakerWordSpec[], opts: { x: number; baseline: number; align?: "left" | "center" | "right"; gap?: number; size?: number },
): PlacedWord[] => {
  // satu ukuran untuk seluruh baris; diperkecil bila baris tak muat di lebar safe zone
  const want = opts.size ?? LINE_SIZE;
  const norm = wordsIn.map((w, i) => ({ ...w, text: caseWord(w.text, i, w.kind ?? "normal"), size: want }));
  const raw = norm.map(widthOf).reduce((a, b) => a + b, 0) + 0.26 * want * (norm.length - 1);
  const k = Math.min(1, (SAFE.x1 - SAFE.x0) / raw);
  const words = norm.map((w) => ({ ...w, size: Math.round(w.size * k) }));
  const widths = words.map(widthOf);
  const gaps = words.map((w, i) => (i === 0 ? 0 : opts.gap ?? 0.26 * Math.min(words[i - 1].size, w.size)));
  const total = widths.reduce((a, b) => a + b, 0) + gaps.reduce((a, b) => a + b, 0);
  const align = opts.align ?? "left";
  let cx = align === "left" ? opts.x : align === "center" ? opts.x - total / 2 : opts.x - total;
  cx = Math.max(SAFE.x0, Math.min(SAFE.x1 - total, cx)); // jepit ke safe zone
  const s0 = words[0]?.size ?? want;
  const baseline = Math.max(SAFE.y0 + 0.75 * s0, Math.min(SAFE.y1 - 0.2 * s0, opts.baseline));
  return words.map((w, i) => {
    cx += gaps[i];
    const p: PlacedWord = { ...w, x: cx, baseline, align: "left" };
    cx += widths[i];
    return p;
  });
};

const ASC = 0.85; // baseline Geist dari tepi atas kotak line-height 1 (em)
const BL_FROM_CENTER = 0.35; // baseline − pusat vertikal kotak (em)

const NormalLike: React.FC<{ w: PlacedWord; absF: number; shadow: string; color: string; dim?: boolean }> = ({ w, absF, shadow, color, dim }) => {
  const kind = w.kind ?? "normal";
  const probe = useProbe(`speaker:${w.text}`, "speaker", absF, color);
  const lf = absF - w.at;
  const s = w.size;
  const pad = 0.16 * s;
  let tr = 0; // translateY (em) untuk reveal
  const blur = 0;
  const track = trackOf(kind);
  // v10: SEMUA kata ucapan masuk sama — naik dari balik mask 3 f (tanpa slam/pop, tanpa tracking-out)
  tr = interpolate(lf, [0, 3], [1.15, 0], { ...clamp, easing: EZ.out });
  const inner = (
    <div
      ref={probe}
      data-emph={w.text}
      style={{
        fontFamily: DISPLAY_FONT, fontWeight: weightOf(kind), fontSize: s, letterSpacing: `${track}em`, lineHeight: 1, color, whiteSpace: "nowrap",
        textShadow: shadow, transform: `translateY(${tr * 100}%)`, opacity: dim ? 0.6 : 1,
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
}> = ({ words, until, color = "#FAF8EC", shadow: shadowIn = SOFT_SHADOW }) => {
  // v11 (Irfan, Bloomberg 0:08): shadow gelap lebar = pita di belakang teks → shadow halus saja
  const shadow = softenShadow(shadowIn, color) ?? "none";
  const frame = useCurrentFrame();
  const sf = useSceneFrom();
  const absF = frame + sf;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {words.map((w, i) => {
        const kind = w.kind ?? "normal";
        const end = w.until ?? until;
        // penekanan = warna aksen (bukan ukuran); kata sebelum kata kunci yang sudah mendarat diredupkan (pola Krea)
        const col = w.color ?? (kind === "emph" ? ACCENT : color);
        const lastEmph = words.filter((v) => (v.kind ?? "normal") === "emph" && v.at <= absF).reduce((m, v) => Math.max(m, v.at), -1);
        const dim = kind !== "emph" && lastEmph > w.at;
        if (kind === "emph") {
          // AnchorWord: frame lokal; titik jangkar = kiri-tengah kotak → y = baseline − 0,364 em
          if (w.sfx) sfxMark(absF / FPS, w.sfx.kind, w.at / FPS, w.sfx.id, w.sfx.pan);
          return (
            <AnchorWord key={i} text={w.text} at={w.at} until={end} x={w.x} y={w.baseline - BL_FROM_CENTER * w.size}
              size={w.size} color={col} align="left" enter={w.enter ?? "blur"} shadow={shadow} grain={w.grain} weight={500} track={-0.01} />
          );
        }
        sfxMark(absF / FPS, w.sfx?.kind ?? "word", w.at / FPS, w.sfx?.id ?? `word:${w.text.replace(/\s+/g, "_")}:${w.at}`, w.sfx?.pan);
        if (absF < w.at || (end !== undefined && absF >= end)) return null;
        return <NormalLike key={i} w={w} absF={absF} shadow={shadow} color={col} dim={dim} />;
      })}
    </AbsoluteFill>
  );
};

/** Satu baris kata berhierarki: flowLine + SpeakerWords. */
export const SpeakerLine: React.FC<{
  words: SpeakerWordSpec[]; x: number; baseline: number; align?: "left" | "center" | "right"; gap?: number;
  until?: number; color?: string; shadow?: string;
}> = ({ words, x, baseline, align, gap, until, color, shadow }) => {
  const absF = useCurrentFrame() + useSceneFrom();
  // baris rata tengah di-TENGAHKAN ULANG seketika setiap kata baru masuk (pola referensi), ukuran tetap
  const n = words.filter((w) => w.at <= absF).length;
  const placed = align === "center" && n > 0 && n < words.length
    ? [...flowLine(words.slice(0, n), { x, baseline, align, gap }), ...flowLine(words, { x, baseline, align, gap }).slice(n)]
    : flowLine(words, { x, baseline, align, gap });
  return <SpeakerWords words={placed} until={until} color={color} shadow={shadow} />;
};

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
