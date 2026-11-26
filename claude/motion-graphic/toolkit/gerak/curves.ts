// curves.ts — gerak dirancang per gerak, bukan preset (Lantai B13a, 16 Nov 2026).
// Diadaptasi dari hughminhphan/motion-kit (MIT, skills/motion-designer/LIBRARY.md) untuk Remotion.
// Kanonik di toolkit/gerak/ (kembaran ESM untuk storyboard HTML: curves.js; nilai sama, diuji toolkit/tests/parity.mjs).
// scripts/remotion/curves.ts hanya mengekspor ulang file ini. Semua fungsi murni dari frame: aman di-scrub dan dirender paralel.
import { Easing, interpolate } from "remotion";

/** Kurva = karakter gerak. Pilih menurut APA geraknya, bukan seberapa kuat. */
export const CURVE = {
  land: Easing.bezier(0.1, 0.75, 0.15, 1),   // masuk dari luar frame, datang cepat, mendarat panjang dan yakin
  heavy: Easing.bezier(0.75, 0, 0.18, 1),    // objek besar, gerak kamera: lambat mulai, tiba tegas
  whip: Easing.bezier(0.85, 0, 0.15, 1),     // ganti keadaan, transisi: tahan, sentak, tahan
  reveal: Easing.bezier(0.22, 1, 0.36, 1),   // teks keluar dari mask: hampir semua jarak di sepertiga awal
  leave: Easing.bezier(0.55, 0, 0.9, 0.35),  // keluar: makin cepat, tidak pernah mengendap
  wind: Easing.bezier(0.45, 0, 0.55, 1),     // antisipasi: gerak balik kecil sebelum gerak besar
  drift: Easing.bezier(0.4, 0, 0.6, 1),      // napas kamera saat hold
} as const;
export type CurveName = keyof typeof CURVE;

/** Durasi dari jarak dan bobot, bukan kebiasaan 0,4–0,6 dtk. bobot 0,7 ringan · 1 normal · 1,35 berat. Hasil dalam frame. */
export const dur = (distancePx: number, fps: number, weight = 1) =>
  Math.max(2, Math.round(((9 + 1.15 * Math.sqrt(Math.abs(distancePx))) * weight / 60) * fps));

/** Gerak keluar ±0,65× masuk dan makin cepat (pakai CURVE.leave). */
export const exitDur = (entranceFrames: number) => Math.max(2, Math.round(entranceFrames * 0.65));

/** Reaksi mengikuti satu gerak utama dengan jeda TIDAK rata (0, 67, 150, 250, 367, 500 ms), bukan stagger i × konstanta. */
const REACT_MS = [0, 67, 150, 250, 367, 500];
export const react = (i: number, fps: number, scale = 1) => {
  const ms = i < REACT_MS.length ? REACT_MS[i] : REACT_MS[REACT_MS.length - 1] + 133 * (i - REACT_MS.length + 1);
  return Math.round((ms / 1000) * fps * scale);
};

/** Nilai 0→1 untuk satu gerak: mulai di `start`, sepanjang `frames`, dengan kurva bernama. */
export const move = (frame: number, start: number, frames: number, curve: CurveName = "land") =>
  interpolate(frame, [start, start + frames], [0, 1], { easing: CURVE[curve], extrapolateLeft: "clamp", extrapolateRight: "clamp" });

/** Busur: x dan y memakai kurva berbeda supaya lintasan melengkung seperti benda dilempar. */
export const arc = (frame: number, start: number, frames: number, from: { x: number; y: number }, to: { x: number; y: number }) => ({
  x: from.x + (to.x - from.x) * move(frame, start, frames, "land"),
  y: from.y + (to.y - from.y) * move(frame, start, frames, "heavy"),
});

/** Hold tetap hidup: drift pelan berbiji (deterministik), bukan diam mati > 1 dtk. amp dalam px. */
export const drift = (frame: number, fps: number, amp = 6, seed = 1) => {
  const t = frame / fps;
  return { x: amp * Math.sin(t * 0.37 + seed), y: amp * 0.6 * Math.sin(t * 0.23 + seed * 2.1) };
};

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
/** Interpolasi linear a→b pada p (0..1). */
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
