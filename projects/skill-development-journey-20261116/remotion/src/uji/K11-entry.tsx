import React from "react";
import { AbsoluteFill, Composition, registerRoot } from "remotion";
import { K11KapsulVoting, PropsK11 } from "../komponen/K11-KapsulVoting";

const UjiK11: React.FC<PropsK11> = (p) => (
  <AbsoluteFill style={{ background: "#6C787C" }}>
    <K11KapsulVoting {...p} />
  </AbsoluteFill>
);

registerRoot(() => (
  <Composition id="UjiK11" component={UjiK11} width={1920} height={1080} fps={30000 / 1001} durationInFrames={360}
    defaultProps={{ mulai: 0, k100: 0, kProfesional: 150, kAI: 200, kComment: 250 }} />
));
