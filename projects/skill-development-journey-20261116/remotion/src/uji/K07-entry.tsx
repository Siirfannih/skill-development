import React from "react";
import { AbsoluteFill, Composition, registerRoot } from "remotion";
import { K07TemplateKeWorkflow, PropsK07 } from "../komponen/K07-TemplateKeWorkflow";

const UjiK07: React.FC<PropsK07> = (p) => (
  <AbsoluteFill style={{ background: "#6C787C" }}>
    <K07TemplateKeWorkflow {...p} />
  </AbsoluteFill>
);

registerRoot(() => (
  <Composition id="UjiK07" component={UjiK07} width={1920} height={1080} fps={30000 / 1001} durationInFrames={360}
    defaultProps={{ mulai: 0, kTemplate: 20, kBalik: 120, kWorkflow: 200 }} />
));
