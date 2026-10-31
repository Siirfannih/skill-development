// SmoothAudioClip.tsx — audio motion-graphic §14.7 (Modul 2, audit 31 Okt 2026).
// Wajib untuk klip narasumber/VO/SFX panjang bila audio ditaruh di Remotion (bukan pre-mix):
// pre-roll (J-cut) + post-roll (L-cut) + envelope fade, sehingga <Sequence> tidak memenggal ekor/room tone.
import React from "react";
import { Audio, Easing, interpolate, Sequence, useCurrentFrame } from "remotion";

interface SmoothAudioProps {
  src: string;
  visualStartFrame: number;
  visualDurationFrames: number;
  /** detik di file sumber yang sejajar dengan visualStartFrame */
  sourceStartSec?: number;
  preRollFrames?: number;   // 4 f = 133 ms @30
  postRollFrames?: number;  // 8 f = 266 ms @30
  fadeInFrames?: number;    // 5 f
  fadeOutFrames?: number;   // 10 f
  baseVolume?: number;
  fps?: number;
}

export const SmoothAudioClip: React.FC<SmoothAudioProps> = ({
  src, visualStartFrame, visualDurationFrames, sourceStartSec = 0, preRollFrames = 4, postRollFrames = 8,
  fadeInFrames = 5, fadeOutFrames = 10, baseVolume = 1, fps = 30,
}) => {
  const pre = Math.min(preRollFrames, visualStartFrame, Math.floor(sourceStartSec * fps));
  const total = visualDurationFrames + pre + postRollFrames;
  return (
    <Sequence from={visualStartFrame - pre} durationInFrames={total} layout="none">
      <Env src={src} total={total} fadeIn={fadeInFrames} fadeOut={fadeOutFrames} base={baseVolume}
        trimBefore={Math.round(sourceStartSec * fps) - pre} />
    </Sequence>
  );
};

const Env: React.FC<{ src: string; total: number; fadeIn: number; fadeOut: number; base: number; trimBefore: number }> = ({
  src, total, fadeIn, fadeOut, base, trimBefore,
}) => {
  const frame = useCurrentFrame();
  const vin = interpolate(frame, [0, fadeIn], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
  const vout = interpolate(frame, [total - fadeOut, total], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  return <Audio src={src} trimBefore={Math.max(0, trimBefore)} volume={base * vin * vout} />;
};
