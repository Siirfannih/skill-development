// gerak.ts — kecepatan dari fungsi pose murni (frame → pose) dan blur yang setara shutter kamera.
// Blur berasal dari gerak, bukan blur di tempat: besar dan arahnya dihitung dari selisih pose dalam jendela shutter.

export type Pose = { x: number; y: number; scale?: number; rotate?: number };
export type PoseFn = (frame: number) => Pose;

export type Kecepatan = { vx: number; vy: number; speed: number; angle: number };

/** Kecepatan px/frame di `frame`, diferensi tengah ±0,5 f (shutter phase = −angle/2, jendela di tengah frame). */
export const kecepatan = (pose: PoseFn, frame: number): Kecepatan => {
  const a = pose(frame - 0.5), b = pose(frame + 0.5);
  const vx = b.x - a.x, vy = b.y - a.y;
  return { vx, vy, speed: Math.hypot(vx, vy), angle: (Math.atan2(vy, vx) * 180) / Math.PI };
};

/**
 * Simpangan baku blur searah gerak dari kecepatan. Panjang jejak = kecepatan × shutter/360 (shutter 200° = resep
 * kamera-gerak.md); gaussian dengan σ ≈ panjang/2,5 terbaca setara jejak itu. Dibatasi `max` supaya frame puncak
 * whip tidak menjadi bidang rata.
 */
export const blurDariKecepatan = (speed: number, shutter = 200, max = 48) =>
  Math.min(max, (Math.abs(speed) * (shutter / 360)) / 2.5);

/** Geser kanal RGB (px) dari kecepatan: tipis, hanya terasa di puncak gerak. */
export const chromaDariKecepatan = (speed: number, rasio = 0.01, max = 6) => Math.min(max, Math.abs(speed) * rasio);
