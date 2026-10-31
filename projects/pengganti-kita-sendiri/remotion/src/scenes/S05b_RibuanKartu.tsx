// 05b · «di antara ribuan cerita gagal yang gak pernah kita dengar» — tanpa teks.
// Reveal-out (C06): kartu biru dari 05a jadi satu di tengah ribuan kartu abu; kamera mendarat di «gagal» lalu tahan.
// Di «gak» kartu abu lenyap bergelombang dari tengah ke luar; tersisa satu titik biru. Keluar X17 hard cut ke gelap (05c).
// Ribuan kartu digambar sebagai satu SVG <rect> sederhana (deterministik, di-cull di luar layar) supaya ringan.
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { EZ, prog, Scene, useT } from "../lib/anim";
import { panel, word } from "../lib/time";
import { ALTMAN_STILL, BLUE_CARD, cam05b, CARD05A_END, DRIFT05A, G_H, G_PX, G_PY, G_W, lerp, S05A_END } from "./_b4_shared";

const NI = 30;
const NJ = 24;
const hash = (i: number, j: number) => {
  const v = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

export const S05b_RibuanKartu: React.FC = () => {
  const t = useT();
  const P = panel("05b");
  const tGak = word("gak", "s5").s;
  // C01 zoom mikro di «gak»: fokus ke kartu biru yang akan tersisa
  const s = cam05b(t) * (1 + 0.07 * prog(t, word("gak", "s5").s, word("gak", "s5").s + 0.75, EZ.out));
  // pan: kartu biru dari posisi akhir 05a ke tengah layar
  const pan = 1 - prog(t, P.start, P.start + 0.6, EZ.inOut);
  const CX = 960 + (CARD05A_END.x - 960) * pan;
  const CY = 540 + (CARD05A_END.y - 540) * pan;

  // kartu biru: dari ukuran akhir 05a (foto bergaris biru) → kartu seukuran kartu abu → titik biru
  const k05 = (1 + DRIFT05A) * S05A_END;
  const morph = prog(t, P.start, P.start + 0.45, EZ.out);
  const dot = prog(t, tGak + 0.1, tGak + 0.7, EZ.inOut);
  const cw = lerp(lerp((BLUE_CARD.w * k05) / 1.5, G_W, morph) * s, 40, dot);
  const chh = lerp(lerp((BLUE_CARD.h * k05) / 1.5, G_H, morph) * s, 40, dot);
  const cr = lerp(lerp(BLUE_CARD.r * k05, 3 * s, morph), 20, dot);
  const photo = 1 - prog(t, P.start + 0.05, P.start + 0.4, EZ.out);

  const rects: React.ReactNode[] = [];
  const w = G_W * s;
  const h = G_H * s;
  for (let i = -NI; i <= NI; i++) {
    for (let j = -NJ; j <= NJ; j++) {
      if (i === 0 && j === 0) continue;
      const x = CX + i * G_PX * s;
      const y = CY + j * G_PY * s;
      if (x + w / 2 < 0 || x - w / 2 > 1920 || y + h / 2 < 0 || y - h / 2 > 1080) continue;
      // muncul (rustle) menyebar dari tengah
      const dw = Math.hypot(i * G_PX, j * G_PY);
      const a = P.start + Math.min(0.3, dw / 4500) + hash(i, j) * 0.05;
      const inP = prog(t, a, a + 0.16, EZ.out);
      // lenyap bergelombang dari tengah ke luar (jarak layar), sedikit acak agar organik
      const ds = Math.hypot(x - CX, y - CY);
      const v = tGak + 2 / 30 + ds / 1250 + (hash(j, i) - 0.5) * 0.08;
      const outP = prog(t, v, v + 0.22, EZ.acc);
      const sc = (0.9 + 0.1 * inP) * (1 - outP);
      if (sc <= 0.01 || inP <= 0) continue;
      rects.push(
        <rect key={i * 1000 + j} x={x - (w * sc) / 2} y={y - (h * sc) / 2} width={w * sc} height={h * sc} rx={3 * s * sc} fill="#d2d2d7" opacity={Math.min(1, inP * 1.5) * (1 - outP * 0.4)} />,
      );
    }
  }

  return (
    <Scene code="05b">
      <AbsoluteFill style={{ background: "linear-gradient(180deg, var(--sky-100) 0%, var(--sky-50) 55%, #fff 100%)", overflow: "hidden" }}>
        <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>{rects}</svg>
        <div style={{
          position: "absolute", left: CX - cw / 2, top: CY - chh / 2, width: cw, height: chh, borderRadius: cr, overflow: "hidden",
          background: "var(--sb-blue)", boxSizing: "border-box", padding: lerp(BLUE_CARD.r ? 6 * k05 : 0, 0, morph),
          boxShadow: `0 ${10 * (1 - dot)}px ${24 + 24 * dot}px ${6 * dot}px color-mix(in srgb, var(--sb-blue) ${30 + 10 * dot}%, transparent)`,
        }}>
          {photo > 0 && <Img src={staticFile(ALTMAN_STILL)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: photo }} />}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S05b_RibuanKartu, covers: ["05b"] };
