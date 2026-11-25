// Kursor.tsx — blok lego: kursor yang bergerak seperti tangan manusia (cookbook/04-ui-cutout-dataviz-visuals/M18-ui-staged-cursor-and-component-morph.md).
// Kursor diperlakukan sebagai KARAKTER: berjalan melengkung, sedikit lewat lalu kembali saat tiba, menekan saat klik,
// dan boleh ragu (diam dengan goyang kecil) bila adegan butuh kesan lelah/bingung. Waktu tiba diambil dari storyboard/
// audio proyek, bukan dari blok ini. Warna dan ukuran ikut pengikat proyek (kiblat), bukan default di sini.
//
// Pakai:
//   <Kursor mulai={{ x: 400, y: 300 }} titik={[
//     { x: 900, y: 520, tiba: 40, klik: true },          // tiba di frame 40 lalu menekan
//     { x: 1300, y: 480, tiba: 110, ragu: 30 },           // tiba di 110, ragu 30 frame sebelum boleh berangkat lagi
//   ]} />
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { dur, drift, move } from "./curves";

export type TitikKursor = { x: number; y: number; tiba: number; klik?: boolean; ragu?: number; bobot?: number };
export type KursorProps = { mulai: { x: number; y: number }; titik: TitikKursor[]; ukuran?: number; warna?: string; garis?: string };

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Posisi + skala kursor pada `frame`. Murni dari frame (aman di-scrub dan dirender paralel). */
export const posisiKursor = (frame: number, fps: number, mulai: { x: number; y: number }, titik: TitikKursor[]) => {
  let from = mulai, x = mulai.x, y = mulai.y, skala = 1, prevBebas = 0;
  for (const p of titik) {
    const dx = p.x - from.x, dy = p.y - from.y, jarak = Math.hypot(dx, dy);
    const jalan = dur(jarak, fps, p.bobot ?? 1);
    const start = Math.max(prevBebas, p.tiba - jalan);           // tidak berangkat sebelum ragu sebelumnya selesai
    const len = Math.max(2, p.tiba - start);
    if (frame >= start) {
      const k = move(frame, start, len, "land");
      // lengkung: titik kontrol digeser tegak lurus 15 % jarak (tangan tidak bergerak lurus)
      const nx = jarak ? -dy / jarak : 0, ny = jarak ? dx / jarak : 0, off = 0.15 * jarak;
      const cx = (from.x + p.x) / 2 + nx * off, cy = (from.y + p.y) / 2 + ny * off;
      x = (1 - k) ** 2 * from.x + 2 * (1 - k) * k * cx + k * k * p.x;
      y = (1 - k) ** 2 * from.y + 2 * (1 - k) * k * cy + k * k * p.y;
      // tiba: lewat sedikit searah gerak lalu kembali (maks 6 px, 6 frame)
      const s = clamp01((frame - p.tiba) / 6), lewat = Math.min(6, 0.02 * jarak) * Math.sin(Math.PI * s);
      if (frame >= p.tiba && s < 1 && jarak) { x += (dx / jarak) * lewat; y += (dy / jarak) * lewat; }
      if (p.ragu && frame > p.tiba + 6 && frame < p.tiba + p.ragu) {   // ragu: goyang kecil, bukan diam mati
        const d = drift(frame - p.tiba, fps, 2.5, p.tiba);
        x += d.x; y += d.y;
      }
      if (p.klik && frame >= p.tiba) skala = 1 - 0.04 * Math.sin(Math.PI * clamp01((frame - p.tiba) / 8));
    }
    from = p; prevBebas = p.tiba + (p.ragu ?? 0);
    if (frame < p.tiba + (p.ragu ?? 0)) break;
  }
  return { x, y, skala };
};

export const Kursor: React.FC<KursorProps> = ({ mulai, titik, ukuran = 34, warna = "#FFFFFF", garis = "#111111" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { x, y, skala } = posisiKursor(frame, fps, mulai, titik);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg width={ukuran} height={ukuran * 1.3} viewBox="0 0 20 26"
        style={{ position: "absolute", left: x, top: y, transform: `scale(${skala})`, transformOrigin: "0 0", overflow: "visible" }}>
        <path d="M1 1 L1 20 L6 15.5 L9.5 24 L13 22.5 L9.6 14.2 L16 14.2 Z" fill={warna} stroke={garis} strokeWidth={1.4} strokeLinejoin="round" />
      </svg>
    </AbsoluteFill>
  );
};
