// GridFlashReveal.tsx — adegan baru terbuka per petak grid, tiap petak boleh menyala sesaat (kilat petak) saat
// membuka. Adegan lama tetap di bawah (dirender pemanggil atau SceneChain), jadi tidak ada frame kosong.
//
// Pola urutan petak:
//   "diagonal" : kiri-atas → kanan-bawah (gelombang tenang)
//   "random"   : acak berbiji, sentakan pendek (kartu 14.T1: tile acak ≤ 7 f)
//   "ring"     : memancar dari satu titik, mis. titik klik (kartu 63.T3)
//   "sweep"    : menyapu dari satu tepi (kartu 63.T3 varian sapuan)
// Isi terbuka lewat clip-path path() (gabungan persegi), kilat petak lewat satu <svg> di atasnya.
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { CURVE, DURASI, GRID, fr } from "../presets";
import { acakIndeks } from "../inti/acak";

export type GridPattern = "diagonal" | "random" | "ring" | "sweep";

export type GridFlashRevealProps = {
  durationInFrames?: number;
  /** frame lokal mulai */
  from?: number;
  cols?: number;
  /** bawaan: dari rasio frame supaya petak mendekati bujur sangkar */
  rows?: number;
  pattern?: GridPattern;
  /** titik pancar untuk "ring", 0..1 */
  origin?: { x: number; y: number };
  /** tepi awal untuk "sweep" */
  edge?: "left" | "right" | "top" | "bottom";
  seed?: number;
  /** porsi durasi yang dipakai untuk menyebar jeda antarpetak (0..0,95) */
  spread?: number;
  /** petak tumbuh dari tengahnya (true) atau muncul utuh (false) */
  grow?: boolean;
  /** warna kilat petak; kosong = tanpa kilat */
  flashColor?: string;
  /** frame petak menyala, tahan penuh, dan padam (@ fps komposisi). flashOut 0 = hilang seketika (kartu 14.T1) */
  flashIn?: number;
  flashHold?: number;
  flashOut?: number;
  /** celah antarpetak kilat (px) supaya kisi terbaca sebagai sel, bukan satu bidang */
  flashGap?: number;
  /** "screen" untuk kilat di atas adegan gelap (sel terbaca sebagai cahaya) */
  flashBlend?: React.CSSProperties["mixBlendMode"];
  children: React.ReactNode;
};

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

/** Kunci urutan 0..1 per petak. */
export const gridOrder = (
  i: number, j: number, C: number, R: number, pattern: GridPattern,
  o: { origin?: { x: number; y: number }; edge?: GridFlashRevealProps["edge"]; seed?: number } = {},
) => {
  switch (pattern) {
    case "random": return acakIndeks(o.seed ?? 1, i * R + j);
    case "ring": {
      const ox = (o.origin?.x ?? 0.5) * C, oy = (o.origin?.y ?? 0.5) * R;
      const d = Math.hypot(i + 0.5 - ox, j + 0.5 - oy);
      const m = Math.max(Math.hypot(ox, oy), Math.hypot(C - ox, oy), Math.hypot(ox, R - oy), Math.hypot(C - ox, R - oy));
      return clamp01(d / m);
    }
    case "sweep": {
      const e = o.edge ?? "right";
      return e === "left" ? i / Math.max(1, C - 1) : e === "right" ? 1 - i / Math.max(1, C - 1)
        : e === "top" ? j / Math.max(1, R - 1) : 1 - j / Math.max(1, R - 1);
    }
    default: return (i + j) / Math.max(1, C + R - 2);
  }
};

export const GridFlashReveal: React.FC<GridFlashRevealProps> = ({
  durationInFrames, from = 0, cols, rows, pattern = "diagonal", origin, edge, seed = 1, spread = GRID.sebaran,
  grow = true, flashColor, flashIn, flashHold = 0, flashOut, flashGap = 0, flashBlend, children,
}) => {
  const frame = useCurrentFrame() - from;
  const { fps, width: W, height: H } = useVideoConfig();
  const D = durationInFrames ?? fr(DURASI.grid, fps);
  const C = cols ?? (W >= H ? GRID.kolomLanskap : GRID.kolomPotret);
  const R = rows ?? Math.max(1, Math.round((C * H) / W));
  const w = W / C, h = H / R;
  const sp = Math.min(0.95, Math.max(0, spread));
  const tileDur = Math.max(1, D * (1 - sp));
  const fIn = flashColor ? flashIn ?? fr(2, fps) : 0;
  const fOut = flashOut ?? fr(5, fps);
  const full: React.CSSProperties = { position: "absolute", inset: 0 };

  if (frame < 0) return null;
  const selesaiIsi = frame >= D;
  const selesaiKilat = !flashColor || frame >= D + flashHold + fOut;
  if (selesaiIsi && selesaiKilat) return <div style={full}>{children}</div>;

  let path = "";
  const kilat: React.ReactNode[] = [];
  for (let i = 0; i < C; i++) {
    for (let j = 0; j < R; j++) {
      const delay = gridOrder(i, j, C, R, pattern, { origin, edge, seed }) * sp * D;
      const local = frame - delay;
      const revealDur = Math.max(1, tileDur - fIn);
      const q = selesaiIsi ? 1 : CURVE.reveal(clamp01((local - fIn) / revealDur));
      if (q > 0) {
        const tw = grow ? w * q : w, th = grow ? h * q : h;
        const x = i * w + (w - tw) / 2, y = j * h + (h - th) / 2;
        path += `M${x.toFixed(1)} ${y.toFixed(1)}h${(tw + 1).toFixed(1)}v${(th + 1).toFixed(1)}h${(-(tw + 1)).toFixed(1)}Z`;
      }
      if (flashColor && local >= 0) {
        const padam = local - fIn - flashHold;
        const a = local < fIn ? CURVE.reveal(clamp01((local + 1) / Math.max(1, fIn)))
          : padam < 0 ? 1
          : fOut <= 0 ? 0
          : 1 - CURVE.leave(clamp01((padam + 1) / fOut));
        const g = flashGap / 2;
        if (a > 0.004) kilat.push(<rect key={`${i}-${j}`} x={i * w + g} y={j * h + g} width={w + 0.5 - flashGap} height={h + 0.5 - flashGap} fill={flashColor} opacity={a} />);
      }
    }
  }
  return (
    <div style={full}>
      {path ? <div style={{ ...full, clipPath: selesaiIsi ? undefined : `path('${path}')` }}>{children}</div> : null}
      {kilat.length ? (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ ...full, mixBlendMode: flashBlend }} aria-hidden>{kilat}</svg>
      ) : null}
    </div>
  );
};
