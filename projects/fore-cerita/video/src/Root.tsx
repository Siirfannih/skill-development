import React from "react";
import { Composition } from "remotion";
import { Fore, TOTAL } from "./Fore";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Fore" component={Fore} durationInFrames={TOTAL} fps={24} width={1920} height={1080} />
  </>
);
