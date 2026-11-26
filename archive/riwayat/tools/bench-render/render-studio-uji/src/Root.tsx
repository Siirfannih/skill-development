import React from "react";
import { Composition } from "remotion";
import { BeratComp } from "./Berat";
import { Kepiting3D } from "./Kepiting3D";
import { InfoGL } from "./InfoGL";
export const Root: React.FC = () => (
  <>
    <BeratComp />
    <Composition id="Kepiting3D" component={Kepiting3D} fps={29.97} width={1920} height={1080} durationInFrames={77} />
    <Composition id="InfoGL" component={InfoGL} fps={30} width={1600} height={200} durationInFrames={1} />
  </>
);
