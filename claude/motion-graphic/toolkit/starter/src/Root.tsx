import React from "react";
import { Composition } from "remotion";
import { Video } from "./Video";

export const FPS = 30;

export const Root: React.FC = () => (
  <Composition
    id="Utama" component={Video} width={1080} height={1920} fps={FPS} durationInFrames={180}
    defaultProps={{ judul: "Adegan", orbit: 0 }}
  />
);
