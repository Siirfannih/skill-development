// MotionBlurWrapper.tsx — memindahkan isi menurut fungsi pose murni dan memberi blur searah yang dihitung otomatis
// dari kecepatannya. Diam = tajam; makin cepat = jejak makin panjang, searah gerak (setara shutter 200°).
//
// Beda dengan <CameraMotionBlur> (@remotion/motion-blur): tidak merender ulang subframe, jadi murah dan tidak
// meninggalkan gema salinan pada sampel rendah. Yang tidak dihitung: blur zoom (skala) dan rotasi; untuk snap zoom
// pakai <CameraMotionBlur> bila paket itu sudah terpasang di proyek.
import React from "react";
import { useCurrentFrame } from "remotion";
import { DirectionalBlur } from "../inti/DirectionalBlur";
import { blurDariKecepatan, chromaDariKecepatan, kecepatan, type PoseFn } from "../inti/gerak";

export type MotionBlurWrapperProps = {
  /** pose per frame (relatif ke Sequence): x, y px; scale; rotate derajat. Harus murni dari frame. */
  pose: PoseFn;
  /** sudut shutter (°). 200 = resep smooth-motion; 0 = tanpa blur */
  shutter?: number;
  /** batas blur σ (px) */
  maxBlur?: number;
  /** geser RGB per px/frame kecepatan (0 = mati) dan batasnya */
  chromaRatio?: number;
  maxChroma?: number;
  /** true: isi mengisi induk (adegan penuh). false: ikut ukuran isi (objek, kata) */
  fill?: boolean;
  /** isi buram penuh (adegan penuh, foto): tepi blur dinormalkan. Biarkan false untuk kata/objek ber-alpha */
  opaque?: boolean;
  /** asal transform, CSS transform-origin */
  origin?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export const MotionBlurWrapper: React.FC<MotionBlurWrapperProps> = ({
  pose, shutter = 200, maxBlur = 40, chromaRatio = 0, maxChroma = 4, fill = false, opaque = false, origin = "50% 50%", style, children,
}) => {
  const frame = useCurrentFrame();
  const p = pose(frame);
  const v = kecepatan(pose, frame);
  const amount = blurDariKecepatan(v.speed, shutter, maxBlur);
  const chroma = chromaRatio > 0 ? chromaDariKecepatan(v.speed, chromaRatio, maxChroma) : 0;
  const transform = `translate(${p.x}px, ${p.y}px) scale(${p.scale ?? 1}) rotate(${p.rotate ?? 0}deg)`;
  return (
    <div style={{ ...(fill ? { position: "absolute", inset: 0 } : { position: "relative", display: "inline-block" }), transform, transformOrigin: origin, ...style }}>
      {/* blur dihitung di ruang layar, filter bekerja di ruang lokal: kompensasi skala dan rotasi */}
      <DirectionalBlur angle={v.angle - (p.rotate ?? 0)} amount={amount / Math.max(0.05, p.scale ?? 1)} chroma={chroma / Math.max(0.05, p.scale ?? 1)} fill={fill} opaque={opaque}>{children}</DirectionalBlur>
    </div>
  );
};
