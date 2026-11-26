// generative-bg.js — latar generatif RINGAN (CSS gradient / kanvas kecil) untuk storyboard HTML dan GenerativeBG.tsx.
// OPT-IN: dipakai hanya bila REF-SPEC/brief meminta latar bergradien. Tanpa warna bawaan: `colors` (keluarga warna dari
// tema.ts / REF-SPEC) wajib. Deterministik: semua dari (frame, seed); tanpa Math.random/Date. Untuk cahaya mengalir
// berkualitas shader (sinus + simplex, arah cahaya, grain di shader) pakai light-wave-bg.js.
//
// Mode:
//   zona  satu atau lebih zona cahaya lembut; posisi mengikuti komposisi (zones: [{x,y,r,color?,strength?}], x/y/r 0..1).
//   mesh  gradien multi-titik dari warna token (points: [{x,y,color?}]; tanpa points: disebar berbiji dari colors).
//   noise value-noise berbiji (halus), warna dipetakan dari colors; kanvas kecil yang diperbesar mulus.
// Catatan terukur: jaga luma dan saturasi dalam toleransi REF-SPEC: `python3 scripts/banding.py <frame.png> <REF-SPEC.json>`;
// tanpa referensi `banding.py <frame.png>` harus lolos F1 (rentang luma >= 35 atau sat p95 >= 0,15). Gradien harus
// berkomitmen: zona pekat tegas atau latar polos, bukan satu nada ragu-ragu; naikkan `intensity` bila F1 menyala.

import { parseColor } from "./warna.js";
import { resolveOptions } from "./preset.js";

export const hash2 = (seed, ix, iy) => {
  let h = (Math.imul(ix | 0, 374761393) + Math.imul(iy | 0, 668265263) + Math.imul(seed | 0, 2147483647 & 1274126177)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return (((h ^ (h >>> 16)) >>> 0) / 4294967296);
};
const smooth = (t) => t * t * (3 - 2 * t);
export const valueNoise = (seed, x, y) => {
  const ix = Math.floor(x), iy = Math.floor(y), fx = smooth(x - ix), fy = smooth(y - iy);
  const a = hash2(seed, ix, iy), b = hash2(seed, ix + 1, iy), c = hash2(seed, ix, iy + 1), d = hash2(seed, ix + 1, iy + 1);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
};

const rgba = (c, a) => { const [r, g, b] = parseColor(c); return `rgba(${r},${g},${b},${+a.toFixed(4)})`; };
const need = (o) => { if (!o || !Array.isArray(o.colors) || !o.colors.length) throw new Error("GenerativeBG: `colors` wajib (keluarga warna dari tema.ts/REF-SPEC)"); };

// gerak pelan frame-driven: posisi titik/zona melayang (fraksi frame). drift = kecepatan (0 = diam), driftAmp = jarak.
const wobble = (frame, fps, seed, i, speed, amp) => {
  const t = (frame / fps) * speed, ph = hash2(seed, i, 7) * 6.2832;
  return [amp * Math.sin(t * 0.9 + ph), amp * Math.cos(t * 0.7 + ph * 1.3)];
};

// jatuh-cahaya halus: alpha tiap stop mengikuti (1-s)^2 supaya tepi zona lembut.
const FALL = [0, 0.2, 0.4, 0.6, 0.8, 1];
const radial = (x, y, r, color, a) =>
  `radial-gradient(circle at ${(x * 100).toFixed(2)}% ${(y * 100).toFixed(2)}%, ` +
  FALL.map((s) => `${rgba(color, a * (1 - s) * (1 - s))} ${(s * r * 100).toFixed(1)}%`).join(", ") + `, ${rgba(color, 0)} ${(r * 100).toFixed(1)}%)`;

/** CSS `background` untuk mode zona/mesh. Zona/titik di atas `base` (opsional; tanpa base = transparan). */
export const bgCSS = (o, frame = 0, fps = 30) => {
  o = resolveOptions("generative", o); need(o);
  const { mode = "zona", colors, base, intensity = 1, seed = 1, drift = 0, driftAmp = 0.03 } = o;
  const layers = [];
  if (mode === "zona") {
    const zones = o.zones && o.zones.length ? o.zones : [{ x: 0.5, y: 0.5, r: 0.6 }];
    zones.forEach((z, i) => {
      const [dx, dy] = wobble(frame, fps, seed, i, drift, driftAmp);
      layers.push(radial(z.x + dx, z.y + dy, z.r ?? 0.6, z.color ?? colors[i % colors.length], Math.min(1, (z.strength ?? 1) * intensity)));
    });
  } else if (mode === "mesh") {
    const pts = o.points && o.points.length ? o.points
      : colors.map((_, i) => ({ x: 0.15 + 0.7 * hash2(seed, i, 1), y: 0.15 + 0.7 * hash2(seed, i, 2) }));
    pts.forEach((p, i) => {
      const [dx, dy] = wobble(frame, fps, seed, i, drift, driftAmp);
      layers.push(radial(p.x + dx, p.y + dy, p.r ?? 0.75, p.color ?? colors[i % colors.length], Math.min(1, intensity)));
    });
  } else throw new Error(`bgCSS: mode ${mode} bukan zona/mesh`);
  if (base) layers.push(`linear-gradient(${base}, ${base})`);
  return layers.join(", ");
};

/** Gambar mode noise ke kanvas kecil (mis. 96x54) lalu biarkan CSS memperbesar. colors dipetakan merata menurut nilai noise. */
export const drawNoise = (canvas, o, frame = 0, fps = 30) => {
  o = resolveOptions("generative", o); need(o);
  const { colors, intensity = 1, seed = 1, drift = 0.2, scale = 2.2, base } = o;
  const w = canvas.width, h = canvas.height, ctx = canvas.getContext("2d");
  const img = ctx.createImageData(w, h), cs = colors.map(parseColor), b = base ? parseColor(base) : null;
  const t = (frame / fps) * drift;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const u = (x / w) * scale * (w / h) + t * 0.6, v = (y / h) * scale + t * 0.4;
    const n = 0.65 * valueNoise(seed, u, v) + 0.35 * valueNoise(seed + 11, u * 2.1, v * 2.1);
    const f = Math.min(0.9999, Math.max(0, n)) * (cs.length - 1), i = Math.floor(f), k = f - i;
    const c = cs[i].map((q, j) => q + (cs[i + 1] ? (cs[i + 1][j] - q) * smooth(k) : 0));
    const a = Math.min(1, intensity), o4 = (y * w + x) * 4;
    for (let j = 0; j < 3; j++) img.data[o4 + j] = b ? b[j] + (c[j] - b[j]) * a : c[j];
    img.data[o4 + 3] = b ? 255 : Math.round(255 * a);
  }
  ctx.putImageData(img, 0, 0);
};

/** HTML: terapkan latar ke elemen div `el` (noise membuat/memakai <canvas> anak). */
export const renderBG = (el, o, frame = 0, fps = 30) => {
  o = resolveOptions("generative", o);
  if ((o.mode ?? "zona") === "noise") {
    let c = el.querySelector(":scope > canvas[data-bg]");
    if (!c) { c = document.createElement("canvas"); c.dataset.bg = "1"; c.width = 96; c.height = 54; Object.assign(c.style, { position: "absolute", inset: "0", width: "100%", height: "100%" }); el.prepend(c); }
    drawNoise(c, o, frame, fps);
  } else el.style.background = bgCSS(o, frame, fps);
};

/** generativeBg(el, frame, { preset, ...override }, fps): pola sama dengan lightWaveBg. */
export const generativeBg = (el, frame, o, fps = 30) => renderBG(el, o, frame, fps);
