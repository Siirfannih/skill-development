import React from "react";
import { AbsoluteFill } from "remotion";
import { UnitMasukMeluncur } from "./UnitMasukMeluncur";
import { ISIAN, IdIsian, PanggungNetral, WadahUji, KataUji } from "../../demo-netral/Netral";

const ONSET = [3, 15, 27, 39];
const TINGGI_HURUF = 79;

export const Demo: React.FC<{ isian: IdIsian }> = ({ isian }) => {
  const kata = ISIAN[isian].kata.slice(0, ONSET.length);

  const baris = (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: TINGGI_HURUF * 0.4,
        width: "100%",
        height: "100%",
      }}
    >
      {kata.map((k, i) => (
        <UnitMasukMeluncur key={`${i}-${k}`} mulai={ONSET[i]}>
          <KataUji isian={isian} ukuran={TINGGI_HURUF}>
            {k}
          </KataUji>
        </UnitMasukMeluncur>
      ))}
    </div>
  );

  return (
    <PanggungNetral isian={isian}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        {ISIAN[isian].bentukWadah === "kartu" ? (
          <WadahUji isian={isian} lebar={1040} tinggi={360}>
            {baris}
          </WadahUji>
        ) : (
          <div style={{ width: 1040, height: 360 }}>{baris}</div>
        )}
      </AbsoluteFill>
    </PanggungNetral>
  );
};
