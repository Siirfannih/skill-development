// Grain.tsx — butiran film deterministik per frame. OPT-IN: opacity bawaan 0 = tidak menggambar apa pun.
// Rentang disarankan (blend overlay): 0.04-0.12 halus (memecah banding), 0.12-0.2 jelas; > 0.25 kasar.
// Taruh di lapis paling atas komposisi. Logika di grain.js (satu sumber dengan storyboard HTML).
import React from "react";
import { useCurrentFrame } from "remotion";
import { grainStyle, type GrainOptions } from "./grain.js";

export type GrainProps = GrainOptions;

export const Grain: React.FC<GrainProps> = (o) => {
  const st = grainStyle(useCurrentFrame(), o);
  return st ? <div style={st as React.CSSProperties} /> : null;
};
