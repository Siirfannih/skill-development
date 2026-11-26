// generative-bg.js — latar generatif RINGAN (CSS gradient) untuk storyboard HTML dan GenerativeBG.tsx.
// OPT-IN: dipakai hanya bila REF-SPEC/brief meminta latar bergradien tanpa WebGL. Tanpa warna bawaan: `colors` wajib.
// Deterministik: semua dari (frame, seed); tanpa Math.random/Date. Untuk cahaya berkualitas shader: light-wave-bg.js.
//
// Aturan sama dengan LightWaveBg: tanpa noise untuk membentuk pola warna (mode noise DIHAPUS dan
// ditolak), pusat cahaya di luar frame, ruang negatif >= 50 % tetap warna dasar. Hash hanya untuk menyebar posisi/fase.
//
// Mode:
//   zona  satu atau lebih zona cahaya lembut; pusat DI LUAR frame (zones: [{x,y,r,color?,strength?}], x/y 0..1, di luar 0..1 pada
//         salah satu sumbu), jadi hanya ekor yang masuk. Zona yang pusatnya di dalam frame ditolak.
//   mesh  (usang: pakai zona/LightWaveBg) gradien titik dari warna token; titik bawaan disebar berbiji DI LUAR tepi frame.
// Ukur: `python3 scripts/banding.py <frame.png>` tanpa referensi harus lolos F1; dengan REF-SPEC luma/saturasi dalam toleransi.

import { parseColor } from "./warna.js";
import { resolveOptions } from "./preset.js";

export const hash2 = (seed, ix, iy) => {
  let h = (Math.imul(ix | 0, 374761393) + Math.imul(iy | 0, 668265263) + Math.imul(seed | 0, 2147483647 & 1274126177)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return (((h ^ (h >>> 16)) >>> 0) / 4294967296);
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
    const zones = o.zones && o.zones.length ? o.zones : [{ x: 1.2, y: 0.25, r: 0.6 }];
    zones.forEach((z, i) => {
      if (!(z.x < 0 || z.x > 1 || z.y < 0 || z.y > 1)) throw new Error(`bgCSS: pusat zona ${i} (x=${z.x}, y=${z.y}) harus di luar frame (x atau y di luar 0..1); hanya ekor cahaya yang masuk`);
      const [dx, dy] = wobble(frame, fps, seed, i, drift, driftAmp);
      layers.push(radial(z.x + dx, z.y + dy, z.r ?? 0.6, z.color ?? colors[i % colors.length], Math.min(1, (z.strength ?? 1) * intensity)));
    });
  } else if (mode === "mesh") {
    const pts = o.points && o.points.length ? o.points
      : colors.map((_, i) => (hash2(seed, i, 3) < 0.5
        ? { x: hash2(seed, i, 1) < 0.5 ? -0.2 : 1.2, y: hash2(seed, i, 2) }      // di luar tepi kiri/kanan
        : { x: hash2(seed, i, 1), y: hash2(seed, i, 2) < 0.5 ? -0.2 : 1.2 }));    // di luar tepi atas/bawah
    pts.forEach((p, i) => {
      const [dx, dy] = wobble(frame, fps, seed, i, drift, driftAmp);
      layers.push(radial(p.x + dx, p.y + dy, p.r ?? 0.75, p.color ?? colors[i % colors.length], Math.min(1, intensity)));
    });
  } else throw new Error(`bgCSS: mode ${mode} tidak didukung (zona/mesh); mode noise dihapus: dilarang membentuk pola warna dari noise`);
  if (base) layers.push(`linear-gradient(${base}, ${base})`);
  return layers.join(", ");
};

/** HTML: terapkan latar ke elemen div `el`. */
export const renderBG = (el, o, frame = 0, fps = 30) => {
  o = resolveOptions("generative", o);
  el.style.background = bgCSS(o, frame, fps);
};

/** generativeBg(el, frame, { preset, ...override }, fps): pola sama dengan lightWaveBg. */
export const generativeBg = (el, frame, o, fps = 30) => renderBG(el, o, frame, fps);
