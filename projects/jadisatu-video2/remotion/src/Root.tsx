import React from "react";
import { Composition, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { Main, TOTAL } from "./Video";
import { FPS, OFF } from "./lib";

const WithAudio: React.FC = () => (
  <>
    <Main />
    <Sequence from={Math.round(OFF * FPS)} name="Dialog (VO + klip Irfan)">
      <Audio src={staticFile("vo/dialog.wav")} />
    </Sequence>
  </>
);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Jadisatu2" component={WithAudio} durationInFrames={TOTAL} fps={FPS} width={1920} height={1080} />
    <Composition id="Jadisatu2Muted" component={Main} durationInFrames={TOTAL} fps={FPS} width={1920} height={1080} />
  </>
);
