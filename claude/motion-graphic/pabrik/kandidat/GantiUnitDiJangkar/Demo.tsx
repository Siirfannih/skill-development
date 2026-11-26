import React from "react";
import { useVideoConfig } from "remotion";
import { GantiUnitDiJangkar } from "./GantiUnitDiJangkar";
import { ISIAN, IdIsian, PanggungNetral, WadahUji, KataUji } from "../../demo-netral/Netral";

const ONSET = [2, 12, 17, 32];
const TINGGI_HURUF = 79;

export const Demo: React.FC<{ isian: IdIsian }> = ({ isian }) => {
  const { width, height, durationInFrames } = useVideoConfig();
  const kata = ISIAN[isian].kata;
  const pakaiWadah = isian === "B";

  return (
    <PanggungNetral isian={isian}>
      {ONSET.map((mulai, i) => {
        const sampai = i + 1 < ONSET.length ? ONSET[i + 1] - 1 : durationInFrames - 1;
        const unit = (
          <KataUji isian={isian} ukuran={TINGGI_HURUF}>
            {kata[i]}
          </KataUji>
        );
        return (
          <GantiUnitDiJangkar key={i} mulai={mulai} sampai={sampai} jangkarX={0.5} jangkarY={0.5}>
            {pakaiWadah ? (
              <WadahUji
                isian={isian}
                lebar={Math.round(width * 0.7)}
                tinggi={Math.round(height * 0.12)}
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {unit}
              </WadahUji>
            ) : (
              unit
            )}
          </GantiUnitDiJangkar>
        );
      })}
    </PanggungNetral>
  );
};
