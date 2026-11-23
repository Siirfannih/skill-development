// SpatialAnchorCamera.tsx — satu aset (foto, halaman, kanvas HTML), kamera virtual berpindah antar titik fokus.
// Tiap titik: pegas ketat (cepat datang, mengendap tanpa pantul), lalu drift zoom pelan di ruang log sampai titik
// berikutnya. Geometri cover menjepit posisi sehingga tepi aset tidak pernah terlihat (tanpa pinggiran hitam).
// Isi (teks yang ditaruh di dalam aset) ikut transform yang sama, jadi teks dunia tidak bergeser sendiri (GRK-02).
import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { PEGAS, type PegasConfig } from "../presets";
import { DirectionalBlur } from "../inti/DirectionalBlur";
import { blurDariKecepatan } from "../inti/gerak";

export type FocalKey = {
  /** frame mulai pindah ke titik ini (relatif ke Sequence) */
  at: number;
  /** titik fokus di aset, 0..1 dari lebar dan tinggi aset */
  fx: number;
  fy: number;
  /** zoom relatif terhadap cover (1 = aset pas menutup frame) */
  s?: number;
  /** posisi layar tempat titik fokus diletakkan, 0..1 (0,5 = tengah) */
  ax?: number;
  ay?: number;
  /** drift zoom per detik setelah titik ini (0,012 = +1,2 %/dtk; 0 = diam) */
  drift?: number;
  /** pegas khusus untuk perpindahan ke titik ini */
  pegas?: PegasConfig;
};

export type CameraState = { fx: number; fy: number; s: number; ax: number; ay: number };

const DRIFT = 0.012;
const target = (k: FocalKey): CameraState => ({ fx: k.fx, fy: k.fy, s: k.s ?? 1, ax: k.ax ?? 0.5, ay: k.ay ?? 0.5 });
const lerp = (a: CameraState, b: CameraState, p: number): CameraState => ({
  fx: a.fx + (b.fx - a.fx) * p, fy: a.fy + (b.fy - a.fy) * p,
  // zoom diinterpolasi di ruang log supaya laju zoom terasa rata
  s: Math.exp(Math.log(a.s) + (Math.log(b.s) - Math.log(a.s)) * p),
  ax: a.ax + (b.ax - a.ax) * p, ay: a.ay + (b.ay - a.ay) * p,
});

/**
 * Keadaan kamera di `frame`. Titik awal tiap perpindahan = posisi kamera yang sebenarnya saat itu (termasuk drift
 * dan pegas yang belum selesai), jadi tidak ada lompatan bila titik berikutnya datang sebelum pegas mengendap.
 */
export const anchorCamera = (path: FocalKey[], frame: number, fps: number, pegas: PegasConfig = PEGAS.jangkar): CameraState => {
  if (path.length === 0) return { fx: 0.5, fy: 0.5, s: 1, ax: 0.5, ay: 0.5 };
  const keys = [...path].sort((a, b) => a.at - b.at);
  let start = target(keys[0]);
  const seg = (k: number, f: number, from: CameraState): CameraState => {
    const key = keys[k];
    const p = k === 0 ? 1 : spring({ frame: Math.max(0, f - key.at), fps, config: key.pegas ?? pegas });
    const c = lerp(from, target(key), p);
    const d = Math.exp((key.drift ?? DRIFT) * (Math.max(0, f - key.at) / fps));
    return { ...c, s: c.s * d };
  };
  let i = 0;
  for (let k = 1; k < keys.length; k++) {
    if (keys[k].at > frame) break;
    start = seg(k - 1, keys[k].at, start);
    i = k;
  }
  if (i === 0) return seg(0, frame, target(keys[0]));
  return seg(i, frame, start);
};

/** Kotak aset di layar: cover × zoom, titik fokus ditaruh di (ax, ay), lalu dijepit supaya tepi aset tidak terlihat. */
export const coverBox = (iw: number, ih: number, W: number, H: number, k: CameraState) => {
  const c = Math.max(W / iw, H / ih) * Math.max(1, k.s);
  const dw = iw * c, dh = ih * c;
  const left = Math.min(0, Math.max(W - dw, k.ax * W - k.fx * dw));
  const top = Math.min(0, Math.max(H - dh, k.ay * H - k.fy * dh));
  return { left, top, dw, dh, scale: c };
};

export type SpatialAnchorCameraProps = {
  path: FocalKey[];
  /** ukuran asli aset (px). Isi dirender di kotak ini lalu diskalakan, jadi teks HTML tetap tajam di setiap zoom. */
  contentWidth: number;
  contentHeight: number;
  pegas?: PegasConfig;
  /** blur searah saat kamera berpindah cepat (dari kecepatan kotak); 0 = mati */
  shutter?: number;
  maxBlur?: number;
  /** warna di belakang aset (tidak pernah terlihat bila aset tidak transparan) */
  background?: string;
  /** aset buram penuh (foto, halaman): tepi blur dinormalkan. false untuk aset ber-alpha */
  opaque?: boolean;
  children: React.ReactNode;
};

export const SpatialAnchorCamera: React.FC<SpatialAnchorCameraProps> = ({
  path, contentWidth, contentHeight, pegas, shutter = 200, maxBlur = 24, background, opaque = true, children,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const box = (f: number) => coverBox(contentWidth, contentHeight, width, height, anchorCamera(path, f, fps, pegas));
  const b = box(frame);
  const a = box(frame - 0.5), c = box(frame + 0.5);
  const vx = c.left - a.left, vy = c.top - a.top;
  const amount = shutter > 0 ? blurDariKecepatan(Math.hypot(vx, vy), shutter, maxBlur) : 0;
  const angle = (Math.atan2(vy, vx) * 180) / Math.PI;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background }}>
      <DirectionalBlur angle={angle} amount={amount} opaque={opaque}>
        <div style={{ position: "absolute", left: 0, top: 0, width: contentWidth, height: contentHeight,
          transform: `translate(${b.left}px, ${b.top}px) scale(${b.scale})`, transformOrigin: "0 0" }}>
          {children}
        </div>
      </DirectionalBlur>
    </div>
  );
};
