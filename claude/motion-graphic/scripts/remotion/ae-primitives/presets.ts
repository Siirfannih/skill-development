// presets.ts — titik awal angka untuk semua primitive: kurva, pegas, durasi, intensitas, token warna netral.
// Angka di sini titik awal dari kartu cookbook, bukan target; sesuaikan lewat sanding terhadap kiblat proyek.
// Durasi ditulis dalam frame @30 fps; pakai `fr(n, fps)` supaya tetap sama panjang di 24/25/60 fps.
import { CURVE, type CurveName } from "../curves";

export { CURVE };
export type { CurveName };

/** Frame @30 fps → frame di fps komposisi (minimal 1). */
export const fr = (frames30: number, fps: number) => Math.max(1, Math.round((frames30 * fps) / 30));

/** Konfigurasi `spring()` Remotion. */
export type PegasConfig = { damping: number; stiffness: number; mass: number };

export const PEGAS = {
  /** kamera jangkar: cepat masuk, sedikit mengendap, tanpa pantul terlihat */
  jangkar: { damping: 26, stiffness: 150, mass: 1 },
  /** lebih sigap untuk punch-in pendek */
  sigap: { damping: 30, stiffness: 260, mass: 1 },
  /** lembut untuk pindah fokus panjang di adegan tenang */
  lembut: { damping: 28, stiffness: 80, mass: 1 },
} as const satisfies Record<string, PegasConfig>;

/** Durasi bawaan (frame @30 fps). Sumber angka: kolom Mekanik Remotion pada kartu yang disebut di README. */
export const DURASI = {
  whip: 8,          // 6–8 f (kartu 19.T3), C07 3–10 f
  grid: 14,         // gelombang grid 0,3–0,5 dtk (kartu 63.T3)
  gridCepat: 7,     // tile cut ≤ 7 f (kartu 14.T1)
  flashTahan: 2,    // kilat 1–2 f intensitas penuh (kartu 19.T3, 66.T2)
  invert: 2,        // inversi 2 f (kartu 19.T3); 3 f untuk logo (86.T5)
  sorot: 12,        // sapuan stabilo 8 f (kartu 48.T1) – 0,45 dtk
  tarikFokus: 7,    // tarik fokus 6–8 f (kartu 87.T3)
  sorotSpot: 9,     // sorot warna selektif menyala 8–10 f (kartu 19.T1)
} as const;

/**
 * Intensitas whip: blur maksimum (px σ), shutter (°), geser RGB maksimum (px), regang searah gerak di puncak
 * kecepatan (0,3 = scaleX 1,3; kartu 19.T3), dan jarak lempar adegan lama pada gaya "tumpang" (× lebar frame).
 */
export const WHIP = {
  lembut: { maxBlur: 24, shutter: 180, maxChroma: 2, stretch: 0.12, throw: 0.35 },
  normal: { maxBlur: 40, shutter: 200, maxChroma: 4, stretch: 0.2, throw: 0.45 },
  keras: { maxBlur: 64, shutter: 270, maxChroma: 6, stretch: 0.3, throw: 0.6 },
} as const;
export type WhipIntensity = keyof typeof WHIP;

/** Grid: kolom bawaan per orientasi (kartu 14.T1 remix: 16:9 ±12 kolom, 9:16 3–5 kolom). */
export const GRID = { kolomLanskap: 12, kolomPotret: 5, sebaran: 0.7 } as const;

/** Kilat: tahan N frame penuh tanpa naik/turun (GRK-01); `exposure` = varian naik 1 f turun 3 f (X12, kartu 66.T2). */
export const FLASH = {
  potong: { hold: 2, decay: 0 },
  exposure: { hold: 1, decay: 3 },
} as const;

/** Kedalaman: jarak kamera ke bidang z=0 (px), blur per unit jarak dari bidang fokus, batas blur. */
export const KEDALAMAN = { jarak: 1000, blurPerUnit: 0.012, maxBlur: 14 } as const;

/**
 * Token warna NETRAL. Bukan warna merek: warna merek datang dari props atau dari objek token proyek
 * (`tema.ts`) yang diteruskan ke komponen. Komponen yang butuh warna aksen tidak punya bawaan aksen.
 */
export type AeTokens = { terang: string; gelap: string };
export const NETRAL: AeTokens = { terang: "#FFFFFF", gelap: "#000000" };
