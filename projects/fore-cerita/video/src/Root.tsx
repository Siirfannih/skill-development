import React from "react";
import { Composition } from "remotion";
import { Fore, TOTAL } from "./Fore";
import { Fore6 } from "./Fore6";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Fore" component={Fore} durationInFrames={TOTAL} fps={24} width={1920} height={1080} />
    <Composition id="Fore6" component={Fore6} durationInFrames={TOTAL} fps={24} width={1920} height={1080} />
  </>
);
