// camera25d.js — kamera 2,5D berlapis: dorong/tarik, geser, putar, orbit sederhana, fokus-blur hanya di belakang bidang fokus.
// Matematika sama dengan scripts/remotion/ae-primitives/kedalaman/SpatialDepthStage (parallax lubang-jarum:
//   faktor lapis k = D / (D - z - push)); dipakai oleh Camera25D.tsx (Remotion) dan storyboard HTML (applyCamera25D).
// Mekanik saja: tanpa warna, huruf, atau gaya bawaan. Nilai gaya datang dari pemanggil / tema.
import { CURVE, drift, lerp, clamp01 } from "../gerak/curves.js";

export const KAMERA = { jarak: 1000, orbitMaks: 8 }; // jarak kamera ke bidang z = 0 (px); batas orbit (derajat)

const NOL = { x: 0, y: 0, push: 0, rotate: 0, orbit: 0, focusZ: 0 };
const CH = Object.keys(NOL);

/**
 * Keadaan kamera pada `frame` dari keyframe. key = { at, x?, y?, push?, rotate?, orbit?, focusZ?, curve? }.
 * Gerak dari key[i] ke key[i+1] memakai `curve` milik key[i+1] (nama dari CURVE; bawaan "heavy" untuk kamera).
 * Channel yang tidak ditulis ikut nilai key sebelumnya. Sebelum key pertama / sesudah terakhir: tertahan.
 * opts.drift = { amp (px), seed }: napas kamera saat hold (frame-driven, berbiji); opts.fps dipakai drift.
 */
export const cameraAt = (keys, frame, opts = {}) => {
  const ks = [...keys].sort((a, b) => a.at - b.at);
  const val = ks.reduce((acc, k) => { acc.push({ ...(acc.length ? acc[acc.length - 1] : NOL), ...strip(k), at: k.at, curve: k.curve }); return acc; }, []);
  let cam = { ...NOL };
  if (val.length) {
    if (frame <= val[0].at) cam = pick(val[0]);
    else if (frame >= val[val.length - 1].at) cam = pick(val[val.length - 1]);
    else {
      const i = val.findIndex((k, n) => frame >= k.at && frame < val[n + 1].at);
      const a = val[i], b = val[i + 1];
      const p = CURVE[b.curve || "heavy"](clamp01((frame - a.at) / (b.at - a.at)));
      for (const c of CH) cam[c] = lerp(a[c], b[c], p);
    }
  }
  const m = opts.orbitMaks ?? KAMERA.orbitMaks;
  cam.orbit = Math.max(-m, Math.min(m, cam.orbit));
  if (opts.drift && opts.drift.amp) {
    const d = drift(frame, opts.fps ?? 30, opts.drift.amp, opts.drift.seed ?? 1);
    cam.x += d.x; cam.y += d.y;
  }
  return cam;
};
const strip = (k) => { const o = {}; for (const c of CH) if (k[c] !== undefined) o[c] = k[c]; return o; };
const pick = (k) => { const o = {}; for (const c of CH) o[c] = k[c]; return o; };

/** Faktor parallax lapis z. */
export const depthFactor = (z, push, D = KAMERA.jarak) => D / Math.max(1, D - z - push);

/**
 * Parameter satu lapis. Orbit: kamera bergeser menyamping sebesar sin(orbit) * orbitRadius (lapis dekat bergeser
 * lebih banyak, berlawanan arah), ditambah kemiringan perspektif rotateY(orbit) pada seluruh panggung (di stageStyle).
 * Blur fokus (opt-in, o.focusBlur = { perUnit, max }): hanya lapis DI BELAKANG bidang fokus (z < focusZ) yang buram;
 * bidang fokus dan lapis di depannya tetap tajam. o.dimPerUnit (opt-in) meredupkan menurut jarak ke fokus.
 */
export const layerParams = (z, cam, o = {}) => {
  const D = o.distance ?? KAMERA.jarak;
  const rad = (cam.orbit * Math.PI) / 180, radius = o.orbitRadius ?? D * 0.5;
  const camX = cam.x + Math.sin(rad) * radius;
  const k = depthFactor(z, cam.push, D), k0 = depthFactor(z, 0, D);
  const scale = o.fill ? (k / k0) * (o.overscan ?? 1.12) : k;
  const behind = Math.max(0, cam.focusZ - z);
  const fb = o.focusBlur;
  const blur = (fb && !o.sharp ? Math.min(fb.max ?? 14, behind * (fb.perUnit ?? 0.012)) : 0) + (o.extraBlur ?? 0);
  const dim = o.dimPerUnit ? Math.max(0, 1 - Math.abs(z - cam.focusZ) * o.dimPerUnit) : 1;
  return { tx: -camX * k, ty: -cam.y * k, scale, rotate: cam.rotate, blur, dim };
};

const px = (n) => `${+n.toFixed(3)}px`;
/** Style CSS (objek string) untuk satu lapis. */
export const layerStyle = (z, cam, o = {}) => {
  const p = layerParams(z, cam, o);
  const f = [p.blur > 0.05 ? `blur(${p.blur.toFixed(2)}px)` : "", p.dim < 0.999 ? `brightness(${p.dim.toFixed(3)})` : ""].join(" ").trim();
  return {
    position: "absolute", inset: "0", transformOrigin: "50% 50%",
    transform: `rotate(${+p.rotate.toFixed(4)}deg) translate(${px(p.tx)}, ${px(p.ty)}) scale(${+p.scale.toFixed(5)})`,
    filter: f || "none",
  };
};

/** Style panggung (elemen yang berputar): perspektif + rotateY orbit (±orbitMaks) + overscan kecil supaya tepi tidak terbuka.
 *  Pembungkus luar harus overflow:hidden (di Remotion: Camera25D; di HTML: elemen frame). */
export const stageStyle = (cam, o = {}) => ({
  position: "absolute", inset: "0",
  transform: cam.orbit
    ? `perspective(${o.perspective ?? KAMERA.jarak * 1.6}px) rotateY(${+cam.orbit.toFixed(4)}deg) scale(${+(1 + Math.abs(cam.orbit) * 0.008).toFixed(5)})`
    : "none",
  transformOrigin: "50% 50%",
});

/** Untuk HTML: terapkan kamera ke panggung dan lapisnya. layers = [{ el, z, fill?, sharp?, ... }]. */
export const applyCamera25D = (stageEl, layers, cam, o = {}) => {
  Object.assign(stageEl.style, stageStyle(cam, o));
  for (const l of layers) Object.assign(l.el.style, layerStyle(l.z, cam, { ...o, ...l }));
};
