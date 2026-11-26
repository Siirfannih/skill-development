// warna.js — utilitas warna kecil (tanpa gaya bawaan): parse #hex/rgb(), pengali saturasi di ruang HSL, keluaran #hex.
export const parseColor = (c) => {
  const s = String(c).trim();
  let m = /^#([0-9a-f]{3,8})$/i.exec(s);
  if (m) {
    let h = m[1]; if (h.length <= 4) h = [...h].map((x) => x + x).join("");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  m = /^rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)/i.exec(s);
  if (m) return [+m[1], +m[2], +m[3]];
  throw new Error(`warna tidak dikenal (pakai #hex atau rgb()): ${c}`);
};

const hex2 = (v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0");

/** Kalikan saturasi HSL warna dengan k (1 = tetap; 1,3 = 30 % lebih tajam; 0 = abu). Hue dan luma HSL tetap. Keluaran #rrggbb. */
export const saturate = (color, k = 1) => {
  const [r, g, b] = parseColor(color).map((v) => v / 255);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  let h = 0, s = 0;
  if (d > 1e-9) {
    s = d / (1 - Math.abs(2 * l - 1));
    h = mx === r ? ((g - b) / d + (g < b ? 6 : 0)) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h /= 6;
  }
  s = Math.min(1, Math.max(0, s * k));
  const f = (n) => { const kk = (n + h * 12) % 12, a = s * Math.min(l, 1 - l); return l - a * Math.max(-1, Math.min(kk - 3, 9 - kk, 1)); };
  return `#${hex2(f(0) * 255)}${hex2(f(8) * 255)}${hex2(f(4) * 255)}`;
};
