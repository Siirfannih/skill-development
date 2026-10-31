import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Video } from "@remotion/media";
import { f, FPS } from "./time";
import { useSceneFrom } from "./anim";

/**
 * Potongan video sumber (tanpa suara; audio datang dari mix master).
 * `at` = detik absolut mulai di video, `inS`/`outS` = detik di file sumber.
 * Harus dipakai di level komposisi utama atau di dalam <Scene> dengan `sceneFrom` (frame awal adegan).
 */
export const Clip: React.FC<{
  src: string; at: number; inS: number; outS: number; style?: React.CSSProperties; grade?: string;
}> = ({ src, at, inS, outS, style, grade }) => {
  const sceneFrom = useSceneFrom();
  return (
  <Sequence from={f(at) - sceneFrom} durationInFrames={Math.max(1, Math.round((outS - inS) * FPS))} layout="none">
    <AbsoluteFill style={style}>
      <Video src={staticFile(src)} trimBefore={Math.round(inS * FPS)} muted objectFit="cover"
        style={{ width: "100%", height: "100%", filter: grade }} />
    </AbsoluteFill>
  </Sequence>
  );
};

/** Grade dokumenter (desaturasi, kontras, sedikit gelap). */
export const DOC_GRADE = "saturate(0.55) contrast(1.12) brightness(0.82)";
