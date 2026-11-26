// preset.js — registri preset latar. Preset = kumpulan SEMUA parameter bawaan sebuah latar (warna, mode, glow, kecepatan,
// grain, seed, intensity, saturation), disimpan sebagai presets/*.json; presets/index.js dihasilkan simpan_preset.py.
// Urutan nilai: preset -> varian mode (dark/light) -> props eksplisit. Props eksplisit SELALU menang.
// `colors: "brand"` mengambil warna dari token proyek: panggil setMerek([...warna dari tema.ts]) sekali.
// `saturation` dan `intensity` pengali (1 = tetap): "pertajam warnanya" = saturation 1.3.
import { PRESETS } from "./presets/index.js";
import { saturate } from "./warna.js";

let MEREK = null;
export const setMerek = (colors) => { MEREK = colors; };
export const daftarPreset = () => Object.keys(PRESETS);

const bersih = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined));

/** Gabungkan preset + varian + override. kind: "lightwave" | "generative". Mengembalikan opsi akhir (colors sudah ber-saturation). */
export const resolveOptions = (kind, o = {}) => {
  const { preset, ...own } = o;
  let base = {};
  if (preset) {
    const p = PRESETS[preset];
    if (!p) throw new Error(`preset tidak ada: ${preset} (ada: ${daftarPreset().join(", ")})`);
    if (p.komponen && p.komponen !== kind) throw new Error(`preset ${preset} untuk ${p.komponen}, bukan ${kind}`);
    const mode = own.mode ?? p.params.mode;
    base = { ...p.params, ...((p.varian && p.varian[mode]) || {}) };
  }
  const out = { ...base, ...bersih(own) };
  if (out.colors === "brand") {
    if (!MEREK) throw new Error('colors="brand": panggil setMerek([...]) dengan warna dari tema.ts dulu');
    out.colors = MEREK;
  }
  const sat = out.saturation ?? 1;
  if (sat !== 1) {
    if (Array.isArray(out.colors)) out.colors = out.colors.map((c) => saturate(c, sat));
    if (out.base) out.base = saturate(out.base, sat);
  }
  return out;
};
