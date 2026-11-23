// SpatialDepthStage.tsx — panggung 2,5D berlapis: latar jauh buram, hero di bidang fokus, teks di depan.
// Satu kamera (geser x/y, dorong maju, putar) menggerakkan semua lapis dengan parallax lubang-jarum:
//   faktor lapis k = D / (D − z − push)   (z positif = lebih dekat ke kamera)
// Lapis dekat bergeser dan membesar lebih banyak dari lapis jauh. Blur kedalaman = |z − focusZ| × blurPerUnit,
// jadi tarik fokus cukup dengan menganimasikan `focusZ` (kartu 87.T3).
import React, { createContext, useContext } from "react";
import { KEDALAMAN } from "../presets";

export type DepthCamera = {
  /** geser kamera (px di bidang z = 0) */
  x?: number;
  y?: number;
  /** dorong kamera maju (px). Harus < D − z lapis terdekat */
  push?: number;
  /** putar (derajat), sama untuk semua lapis */
  rotate?: number;
};

type Ctx = { cam: Required<DepthCamera>; D: number; focusZ: number; blurPerUnit: number; maxBlur: number; dimPerUnit: number };
const DepthCtx = createContext<Ctx | null>(null);

export type SpatialDepthStageProps = {
  camera?: DepthCamera;
  /** z bidang yang tajam; animasikan untuk tarik fokus */
  focusZ?: number;
  /** jarak kamera ke bidang z = 0 (px) */
  distance?: number;
  blurPerUnit?: number;
  maxBlur?: number;
  /** redup per unit jarak dari bidang fokus (0 = mati); 0,0004 → lapis 800 unit jauh ±32 % lebih gelap */
  dimPerUnit?: number;
  background?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export const SpatialDepthStage: React.FC<SpatialDepthStageProps> = ({
  camera = {}, focusZ = 0, distance = KEDALAMAN.jarak, blurPerUnit = KEDALAMAN.blurPerUnit, maxBlur = KEDALAMAN.maxBlur,
  dimPerUnit = 0, background, style, children,
}) => {
  const cam = { x: camera.x ?? 0, y: camera.y ?? 0, push: camera.push ?? 0, rotate: camera.rotate ?? 0 };
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background, ...style }}>
      <DepthCtx.Provider value={{ cam, D: distance, focusZ, blurPerUnit, maxBlur, dimPerUnit }}>{children}</DepthCtx.Provider>
    </div>
  );
};

export type DepthLayerProps = {
  /** kedalaman: negatif = jauh (latar), 0 = bidang hero, positif = dekat (teks depan) */
  z: number;
  /**
   * true: lapis diskalakan ulang supaya pada kamera diam ukurannya tetap seukuran frame (latar yang harus menutup
   * frame), plus `overscan` untuk ruang geser. false: ukuran ikut perspektif (benda jauh tampak lebih kecil).
   */
  fill?: boolean;
  overscan?: number;
  /** blur tambahan tetap (px), di luar blur kedalaman */
  extraBlur?: number;
  /** abaikan blur kedalaman (mis. teks yang harus selalu tajam) */
  sharp?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

/** Faktor parallax lapis z untuk kamera tertentu; dipakai juga bila perlu menghitung posisi layar sebuah titik. */
export const depthFactor = (z: number, push: number, D: number) => D / Math.max(1, D - z - push);

export const DepthLayer: React.FC<DepthLayerProps> = ({ z, fill = false, overscan = 1.12, extraBlur = 0, sharp = false, style, children }) => {
  const ctx = useContext(DepthCtx);
  if (!ctx) throw new Error("DepthLayer harus berada di dalam <SpatialDepthStage>");
  const { cam, D, focusZ, blurPerUnit, maxBlur, dimPerUnit } = ctx;
  const k = depthFactor(z, cam.push, D);
  const k0 = depthFactor(z, 0, D);
  const s = fill ? (k / k0) * overscan : k;
  const jarak = Math.abs(z - focusZ);
  const blur = (sharp ? 0 : Math.min(maxBlur, jarak * blurPerUnit)) + extraBlur;
  const dim = Math.max(0, 1 - jarak * dimPerUnit);
  const f = [blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "", dim < 0.999 ? `brightness(${dim.toFixed(3)})` : ""].join(" ").trim();
  return (
    <div style={{ position: "absolute", inset: 0, transformOrigin: "50% 50%",
      transform: `rotate(${cam.rotate}deg) translate(${-cam.x * k}px, ${-cam.y * k}px) scale(${s})`,
      filter: f || undefined, ...style }}>
      {children}
    </div>
  );
};
