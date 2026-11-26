// Camera25D.tsx — panggung 2,5D berlapis dengan kamera berkeyframe (push/pull, pan, putar, orbit sederhana).
// Lapis dekat bergeser lebih banyak, berlawanan arah (parallax); orbit = geser samping + rotateY perspektif <= ±8°.
// Blur fokus OPT-IN (prop focusBlur) dan hanya untuk lapis di belakang bidang fokus. Gerak dari kurva bernama (curves.ts).
// Mekanik saja: tanpa warna/gaya bawaan; `background` datang dari pemanggil. Matematika di camera25d.js (satu sumber dengan HTML).
import React, { createContext, useContext } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { cameraAt, layerStyle, stageStyle, KAMERA, type CamKey, type CamState, type CamOpts, type LayerOpts } from "./camera25d.js";

type Ctx = { cam: CamState; opts: LayerOpts };
const C = createContext<Ctx | null>(null);

export type Camera25DProps = LayerOpts & {
  /** keyframe kamera; gerak ke key memakai `curve` key itu (bawaan "heavy") */
  keys: CamKey[];
  /** napas kamera saat hold (px, berbiji) */
  drift?: CamOpts["drift"];
  orbitMaks?: number;
  background?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export const Camera25D: React.FC<Camera25DProps> = ({ keys, drift, orbitMaks, background, style, children, ...opts }) => {
  const frame = useCurrentFrame(), { fps } = useVideoConfig();
  const cam = cameraAt(keys, frame, { fps, drift, orbitMaks });
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background, ...style }}>
      <div style={stageStyle(cam, opts) as React.CSSProperties}>
        <C.Provider value={{ cam, opts: { distance: KAMERA.jarak, ...opts } }}>{children}</C.Provider>
      </div>
    </div>
  );
};

export type Layer25DProps = LayerOpts & { z: number; style?: React.CSSProperties; children: React.ReactNode };

/** z negatif = jauh, 0 = bidang hero, positif = dekat kamera. fill = lapis latar yang harus menutup frame. */
export const Layer25D: React.FC<Layer25DProps> = ({ z, style, children, ...o }) => {
  const ctx = useContext(C);
  if (!ctx) throw new Error("Layer25D harus berada di dalam <Camera25D>");
  return <div style={{ ...(layerStyle(z, ctx.cam, { ...ctx.opts, ...o }) as React.CSSProperties), ...style }}>{children}</div>;
};

export { cameraAt };
