import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { S1, S1_END } from "./S1";
import { S2, S2_START, S2_END } from "./S2";
import { S3, S3_START, S3_END } from "./S3";
import { S4, S4_START, S4_END } from "./S4";
import { S5, S5_START, S5_END } from "./S5";
import { S6, S6_START } from "./S6";
import { Probe } from "./Probe";
import { FX, FxEvent } from "./FX";
import { wf } from "./lib";
import FXJ from "./fx.json";

// Effect family (negative / RGB split / exposure flash). Each event gets a bound SFX in audio_build (FX_EVENTS).
// Single source for effects; audio_build.py reads the same file to bind an SFX to every event.
export const fxEvents = (): FxEvent[] =>
  (FXJ as { abs?: number; c?: string; w?: string; nth?: number; off?: number; kind: FxEvent["kind"]; dur?: number; amt?: number }[]).map((e) => ({
    at: e.abs ?? wf(e.c!, e.w!, e.nth ?? 1) + (e.off ?? 0),
    kind: e.kind,
    dur: e.dur,
    amt: e.amt,
  }));

export const Main: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#0A0A0A" }}>
      <FX events={fxEvents()}>
        {f >= S6_START() && <S6 />}
        {f >= S5_START() && f <= S5_END() && <S5 />}
        {f >= S4_START() && f <= S4_END() && <S4 />}
        {f >= S3_START() && f <= S3_END() && <S3 />}
        {f >= S2_START() && f <= S2_END() && <S2 />}
        {f <= S1_END() && <S1 />}
      </FX>
      <Probe />
    </AbsoluteFill>
  );
};
