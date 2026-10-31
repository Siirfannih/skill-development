// Komposisi utama «Pengganti Kita Sendiri» — audio master v11 + adegan per panel storyboard.
// Panel yang belum punya adegan animasi tampil sebagai panel storyboard statis (animatic) supaya durasi selalu utuh.
import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { Panel2x, Scene } from "./lib/anim";
import { PANELS } from "./lib/time";
import * as Static from "./panels/all";
import { SCENES } from "./scenes";

export const PKS: React.FC = () => (
  <AbsoluteFill style={{ background: "#101216" }}>
    {PANELS.filter((p) => !SCENES.covered.has(p.panel)).map((p) => {
      const C = (Static as any)["P" + p.panel.replace("-", "_")];
      return C ? (
        <Scene key={p.panel} code={p.panel} name={`[statis] ${p.panel}`}>
          <Panel2x><C /></Panel2x>
        </Scene>
      ) : null;
    })}
    {SCENES.list.map((S, i) => <S key={i} />)}
    <Audio src={staticFile("audio/mix_v11.wav")} />
  </AbsoluteFill>
);
