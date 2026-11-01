// SAFE ZONE horizontal 1920×1080 (aturan Irfan 2 Nov, mengikuti zona aman thumbnail YouTube ~900×430 dari 1280×720,
// dilonggarkan ke 70 % × 60 % untuk video): teks, wajah, logo wajib di dalam kotak ini sepanjang hidupnya.
export const SAFE = { x0: 288, x1: 1632, y0: 216, y1: 864 } as const;
/** jepit titik/kotak ke safe zone */
export const clampX = (x: number, w = 0) => Math.max(SAFE.x0, Math.min(SAFE.x1 - w, x));
export const clampY = (y: number, h = 0) => Math.max(SAFE.y0, Math.min(SAFE.y1 - h, y));
