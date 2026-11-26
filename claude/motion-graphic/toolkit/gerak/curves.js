// curves.js — kembaran ESM dari curves.ts untuk storyboard/animatic HTML (tanpa Remotion, tanpa build).
// Nama dan nilai SAMA dengan curves.ts; dijaga toolkit/tests/parity.mjs. Jangan menulis ulang easing di storyboard: impor dari sini.
// Semua fungsi murni dari `frame` (atau t); tanpa Math.random, tanpa state.

// Kurva bezier kubik gaya CSS (algoritma bezier-easing: Newton + bagi dua), sama dengan Easing.bezier Remotion.
const SPLINE = 11, STEP = 1 / (SPLINE - 1);
const A = (a1, a2) => 1 - 3 * a2 + 3 * a1, B = (a1, a2) => 3 * a2 - 6 * a1, C = (a1) => 3 * a1;
const calc = (t, a1, a2) => ((A(a1, a2) * t + B(a1, a2)) * t + C(a1)) * t;
const slope = (t, a1, a2) => 3 * A(a1, a2) * t * t + 2 * B(a1, a2) * t + C(a1);
export const bezier = (x1, y1, x2, y2) => {
  if (x1 === y1 && x2 === y2) return (x) => x;
  const tbl = new Float32Array(SPLINE);
  for (let i = 0; i < SPLINE; i++) tbl[i] = calc(i * STEP, x1, x2);
  const tFor = (x) => {
    let start = 0, i = 1;
    for (; i !== SPLINE - 1 && tbl[i] <= x; i++) start += STEP;
    i--;
    let t = start + ((x - tbl[i]) / (tbl[i + 1] - tbl[i])) * STEP;
    const s = slope(t, x1, x2);
    if (s >= 0.001) {
      for (let k = 0; k < 4; k++) { const cs = slope(t, x1, x2); if (cs === 0) return t; t -= (calc(t, x1, x2) - x) / cs; }
      return t;
    }
    if (s === 0) return t;
    let lo = start, hi = start + STEP, cx, ct, n = 0;
    do { ct = lo + (hi - lo) / 2; cx = calc(ct, x1, x2) - x; if (cx > 0) hi = ct; else lo = ct; } while (Math.abs(cx) > 1e-7 && ++n < 10);
    return ct;
  };
  return (x) => (x === 0 || x === 1 ? x : calc(tFor(x), y1, y2));
};

/** Kurva = karakter gerak. Pilih menurut APA geraknya, bukan seberapa kuat. */
export const CURVE = {
  land: bezier(0.1, 0.75, 0.15, 1),
  heavy: bezier(0.75, 0, 0.18, 1),
  whip: bezier(0.85, 0, 0.15, 1),
  reveal: bezier(0.22, 1, 0.36, 1),
  leave: bezier(0.55, 0, 0.9, 0.35),
  wind: bezier(0.45, 0, 0.55, 1),
  drift: bezier(0.4, 0, 0.6, 1),
};

export const clamp01 = (x) => Math.min(1, Math.max(0, x));

/** Durasi (frame) dari jarak (px) dan bobot: 0,7 ringan, 1 normal, 1,35 berat. */
export const dur = (distancePx, fps, weight = 1) =>
  Math.max(2, Math.round(((9 + 1.15 * Math.sqrt(Math.abs(distancePx))) * weight / 60) * fps));

/** Gerak keluar ±0,65x masuk. */
export const exitDur = (entranceFrames) => Math.max(2, Math.round(entranceFrames * 0.65));

/** Jeda reaksi TIDAK rata (0, 67, 150, 250, 367, 500 ms), bukan stagger i x konstanta. Hasil dalam frame. */
const REACT_MS = [0, 67, 150, 250, 367, 500];
export const react = (i, fps, scale = 1) => {
  const ms = i < REACT_MS.length ? REACT_MS[i] : REACT_MS[REACT_MS.length - 1] + 133 * (i - REACT_MS.length + 1);
  return Math.round((ms / 1000) * fps * scale);
};

/** Nilai 0..1 untuk satu gerak: mulai di `start`, sepanjang `frames`, kurva bernama. */
export const move = (frame, start, frames, curve = "land") =>
  frames <= 0 ? (frame >= start ? 1 : 0) : CURVE[curve](clamp01((frame - start) / frames));

/** Busur: x dan y memakai kurva berbeda supaya lintasan melengkung. */
export const arc = (frame, start, frames, from, to) => ({
  x: from.x + (to.x - from.x) * move(frame, start, frames, "land"),
  y: from.y + (to.y - from.y) * move(frame, start, frames, "heavy"),
});

/** Hold tetap hidup: drift pelan berbiji (deterministik). amp dalam px. */
export const drift = (frame, fps, amp = 6, seed = 1) => {
  const t = frame / fps;
  return { x: amp * Math.sin(t * 0.37 + seed), y: amp * 0.6 * Math.sin(t * 0.23 + seed * 2.1) };
};

/** Interpolasi linear a->b pada p (0..1). */
export const lerp = (a, b, p) => a + (b - a) * p;
