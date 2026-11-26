// grain.js — butiran film deterministik per frame (kembaran Grain.tsx). OPT-IN: opacity bawaan 0 = mati.
// Murah: satu ubin butiran berbiji (tile x tile px) digenerate sekali per (seed, indeks), lalu diputar menurut frame
// (indeks = frame % jumlah ubin) dan digeser berbiji. Tanpa Math.random/Date.
// Rentang disarankan (blend overlay/soft-light): opacity 0.04-0.12 halus (memecah banding gradien), 0.12-0.2 jelas
// seperti film; > 0.25 terbaca sebagai noise kasar. Selalu cek `scripts/banding.py` dan mata di crop 100 %.
import { hash2 } from "./generative-bg.js";

export const GRAIN = { tile: 256, tiles: 6 };
const cache = new Map();

/** Kanvas ubin ke-`index` (abu-abu berpusat 128, amplitudo `contrast` 0..1). */
export const grainTile = (seed = 1, index = 0, size = GRAIN.tile, contrast = 1) => {
  const key = `${seed}:${index}:${size}:${contrast}`;
  if (cache.has(key)) return cache.get(key);
  const c = document.createElement("canvas"); c.width = c.height = size;
  const ctx = c.getContext("2d"), img = ctx.createImageData(size, size);
  for (let i = 0; i < size * size; i++) {
    const v = Math.round(128 + (hash2(seed * 131 + index, i % size, (i / size) | 0) - 0.5) * 255 * contrast);
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v; img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const url = c.toDataURL("image/png"); cache.set(key, url); return url;
};

/** Style CSS lapisan butiran pada `frame`. opacity 0 -> null (tidak digambar). */
export const grainStyle = (frame, o = {}) => {
  const { opacity = 0, seed = 1, tile = GRAIN.tile, tiles = GRAIN.tiles, scale = 1, blend = "overlay", contrast = 1 } = o;
  if (!(opacity > 0)) return null;
  const i = ((frame % tiles) + tiles) % tiles, ox = Math.floor(hash2(seed, i, 3) * tile), oy = Math.floor(hash2(seed, i, 5) * tile);
  return {
    position: "absolute", inset: "0", pointerEvents: "none", opacity, mixBlendMode: blend,
    backgroundImage: `url(${grainTile(seed, i, tile, contrast)})`, backgroundSize: `${tile * scale}px ${tile * scale}px`,
    backgroundPosition: `${-ox}px ${-oy}px`, imageRendering: scale > 1 ? "pixelated" : "auto",
  };
};

/** HTML: pasang/ubah lapisan butiran di `el` (dibuat sekali, id data-grain). */
export const applyGrain = (el, frame, o = {}) => {
  let g = el.querySelector(":scope > [data-grain]");
  const st = grainStyle(frame, o);
  if (!st) { if (g) g.remove(); return; }
  if (!g) { g = document.createElement("div"); g.dataset.grain = "1"; el.appendChild(g); }
  Object.assign(g.style, st);
};
