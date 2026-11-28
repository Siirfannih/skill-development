// timing.ts — stagger, pegas berlintasan, van Wijk, timeline. Semua murni terhadap `frame`:
// tanpa state, tanpa Math.random/Date, aman di-scrub dan dirender paralel. Tanpa dependency `remotion`.
// Salin berdampingan dengan curves.ts dan ae-primitives/inti/acak.ts ke remotion/src/lib/.
//
// Atribusi:
// - stagger: gagasan jarak-ke-asal + ease + jitter dari anime.js (MIT) src/utils/stagger.js.
// - dampTrack: solusi analitik pegas teredam (kritis/under/over) seperti maath (MIT) src/time/spring-core.ts,
//   disusun ulang per segmen kunci tanpa state.
// - vanWijk: port d3-interpolate src/zoom.js (interpolateZoom), ISC License,
//   Copyright 2010-2021 Mike Bostock; rumus van Wijk & Nuij, "Smooth and efficient zooming and panning" (2003).
// - timeline: sintaks posisi dari anime.js (MIT) src/timeline/position.js.
import { acakIndeks } from "./ae-primitives/inti/acak";

export type StaggerOpts = {
  from?: "first" | "last" | "center" | "random" | number; // number = indeks asal
  grid?: [number, number];            // [kolom, baris]; default deret 1D
  axis?: "x" | "y";                   // jarak hanya sepanjang satu sumbu (grid); default euclid
  ease?: (t: number) => number;       // easing pada sebaran 0..1 (mis. CURVE.reveal)
  gap: number;                        // frame per satu satuan jarak (jarak terjauh = max * gap)
  jitter?: number;                    // +/- frame, tumbuh menurut progres sebaran, berbiji
  seed?: number;
  start?: number;                     // frame awal
};

/** Jeda (frame) elemen ke-i dari n. Pengganti `i * konstanta` yang tidak rata dan bisa dari tengah/kolom/acak. */
export const stagger = (i: number, n: number, o: StaggerOpts): number => {
  const [cols, rows] = o.grid ?? [Math.max(1, n), 1];
  const f = o.from ?? "first", seed = o.seed ?? 1;
  const pos = (k: number): [number, number] => [k % cols, Math.floor(k / cols) % rows];
  const org: [number, number] =
    f === "center" ? [(cols - 1) / 2, (rows - 1) / 2] : f === "last" ? pos(n - 1) : typeof f === "number" ? pos(f) : [0, 0];
  const dist = (k: number) => {
    if (f === "random") return acakIndeks(seed, k) * Math.max(0, n - 1);
    const [x, y] = pos(k), dx = x - org[0], dy = y - org[1];
    return o.axis === "x" ? Math.abs(dx) : o.axis === "y" ? Math.abs(dy) : Math.hypot(dx, dy);
  };
  let max = 0;
  for (let k = 0; k < n; k++) max = Math.max(max, dist(k));
  const start = o.start ?? 0;
  if (max === 0) return Math.round(start);
  const p = dist(i) / max; // 0..1
  const jit = o.jitter ? (acakIndeks(seed + 17, i) * 2 - 1) * o.jitter * p : 0;
  return Math.round(start + (o.ease ? o.ease(p) : p) * max * o.gap + jit);
};

export type Key = { at: number; v: number }; // at = frame, urut menaik

/** Posisi pegas teredam yang mengejar kunci berikut; posisi dan kecepatan terbawa antar kunci (tanpa henti-mulai).
 *  response = periode alami (detik), zeta = rasio redaman (1 kritis, <1 memantul, >1 lambat). */
export const dampTrack = (keys: Key[], frame: number, fps: number, response = 0.5, zeta = 1): number => {
  const w = (2 * Math.PI) / response;
  const step = (d: number, vel: number, t: number): [number, number] => {
    if (Math.abs(zeta - 1) < 1e-4) {
      const e = Math.exp(-w * t), b = vel + w * d;
      return [e * (d + b * t), e * (vel - b * w * t)];
    }
    if (zeta < 1) {
      const a = zeta * w, wd = w * Math.sqrt(1 - zeta * zeta), e = Math.exp(-a * t), c = Math.cos(wd * t), s = Math.sin(wd * t);
      return [e * (d * c + ((vel + a * d) / wd) * s), e * (vel * c - ((a * vel + w * w * d) / wd) * s)];
    }
    const q = w * Math.sqrt(zeta * zeta - 1), r1 = -zeta * w + q, r2 = -zeta * w - q;
    const B = (vel - r1 * d) / (r2 - r1), A = d - B, e1 = Math.exp(r1 * t), e2 = Math.exp(r2 * t);
    return [A * e1 + B * e2, A * r1 * e1 + B * r2 * e2];
  };
  let x = keys[0].v, vel = 0;
  for (let i = 0; i < keys.length && frame >= keys[i].at; i++) {
    const end = Math.min(frame, keys[i + 1]?.at ?? frame);
    const [d, nv] = step(x - keys[i].v, vel, (end - keys[i].at) / fps);
    x = keys[i].v + d;
    vel = nv; // kecepatan terbawa ke kunci berikut
  }
  return x;
};

const cosh = (x: number) => { const e = Math.exp(x); return (e + 1 / e) / 2; };
const sinh = (x: number) => { const e = Math.exp(x); return (e - 1 / e) / 2; };
const tanh = (x: number) => { const e = Math.exp(2 * x); return (e - 1) / (e + 1); };

/** Pan+zoom van Wijk (d3 interpolateZoom). Titik = [x, y, lebarViewport]; t 0..1 (beri easing/pegas dari luar).
 *  rho ~ seberapa kuat busur zoom-out (default sqrt2). Lebar viewport w = 1 / skala. */
export const vanWijk = (p0: readonly number[], p1: readonly number[], t: number, rho = Math.SQRT2): [number, number, number] => {
  const [ux0, uy0, w0] = p0, [ux1, uy1, w1] = p1;
  const r = Math.max(1e-3, rho), rho2 = r * r, rho4 = rho2 * rho2;
  const dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy;
  if (d2 < 1e-12) return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(t * Math.log(w1 / w0))];
  const d1 = Math.sqrt(d2);
  const b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1);
  const b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1);
  const r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
  const s = (t * (r1 - r0)) / r;
  const u = (w0 / (rho2 * d1)) * (cosh(r0) * tanh(r * s + r0) - sinh(r0));
  return [ux0 + u * dx, uy0 + u * dy, (w0 * cosh(r0)) / cosh(r * s + r0)];
};

/** Timeline relatif, dihitung SEKALI di level modul (tidak membaca frame); hasil dalam frame.
 *  Posisi: undefined = akhir timeline · angka = absolut · "<" akhir anak sebelumnya · "<<" awal anak sebelumnya ·
 *  "label" · "+=N" / "-=N" (dari akhir timeline) · gabungan, mis. "<+=4", "hero-=6". */
export const timeline = () => {
  const L: Record<string, number> = {}, D: Record<string, number> = {};
  let end = 0, prevStart = 0, prevEnd = 0;
  const pos = (p?: string | number): number => {
    if (p === undefined) return end;
    if (typeof p === "number") return p;
    const m = /^(<<|<|[A-Za-z_][\w-]*?)?(?:([+-])=(\d+(?:\.\d+)?))?$/.exec(p);
    if (!m) throw new Error(`posisi timeline tidak valid: ${p}`);
    let base = end;
    if (m[1] === "<<") base = prevStart;
    else if (m[1] === "<") base = prevEnd;
    else if (m[1]) {
      if (!(m[1] in L)) throw new Error(`label timeline belum ada: ${m[1]}`);
      base = L[m[1]];
    }
    return base + (m[2] ? (m[2] === "+" ? 1 : -1) * Number(m[3]) : 0);
  };
  return {
    add(label: string, dur: number, p?: string | number) {
      if (label in L) throw new Error(`label timeline ganda: ${label}`);
      const s = pos(p);
      L[label] = s; D[label] = dur;
      prevStart = s; prevEnd = s + dur; end = Math.max(end, prevEnd);
      return s;
    },
    at: (label: string) => { if (!(label in L)) throw new Error(`label timeline tidak ada: ${label}`); return L[label]; },
    end: (label: string) => L[label] + D[label],
    get total() { return end; },
  };
};
