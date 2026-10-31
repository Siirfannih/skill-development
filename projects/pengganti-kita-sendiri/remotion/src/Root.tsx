import "./index.css";
import React from "react";
import { Composition } from "remotion";
import { PKS } from "./Video";
import { Preview } from "./Preview";
import { f, TOTAL_S } from "./lib/time";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="PenggantiKitaSendiri" component={PKS} durationInFrames={f(TOTAL_S)} fps={30} width={1920} height={1080} />
    <Composition id="Preview" component={Preview} durationInFrames={f(TOTAL_S)} fps={30} width={1920} height={1080} defaultProps={{ from: 0 }} />
  </>
);
