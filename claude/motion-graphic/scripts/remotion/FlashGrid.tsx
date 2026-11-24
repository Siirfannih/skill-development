// FlashGrid.tsx — pembungkus kompatibilitas ke komponen kanonik ae-primitives/transisi/GridFlashReveal.tsx.
// Proyek baru langsung mengimpor GridFlashReveal dari ae-primitives/.
import React from "react";
import { GridFlashReveal } from "./ae-primitives/transisi/GridFlashReveal";

type Props = {
  durationFrames?: number;
  cols?: number;
  rows?: number;
  flashColor?: string;
  accentColor?: string;
  seed?: number;
};

export const FlashGrid: React.FC<Props> = ({
  durationFrames = 6,
  cols = 5,
  rows = 3,
  flashColor = "#FFFFFF",
  seed = 14,
}) => (
  <GridFlashReveal
    pattern="random"
    durationInFrames={durationFrames}
    cols={cols}
    rows={rows}
    grow={false}
    flashColor={flashColor}
    flashIn={1}
    flashHold={2}
    flashOut={0}
    spread={0.6}
    seed={seed}
  >
    <div style={{ width: "100%", height: "100%" }} />
  </GridFlashReveal>
);
