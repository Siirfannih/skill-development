// Komposisi utama «Pengganti Kita Sendiri» — dialog + SFX v8 (SoundLayer) + adegan per panel storyboard.
// Panel yang belum punya adegan animasi tampil sebagai panel storyboard statis (animatic) supaya durasi selalu utuh.
import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SoundLayer, soundSchema, SoundProps } from "./SoundLayer";
import { Panel2x, Scene } from "./lib/anim";
import { PANELS } from "./lib/time";
import * as Static from "./panels/all";
import { SCENES } from "./scenes";
import { CaptionTrack } from "./lib/CaptionTrack";

export const pksSchema = soundSchema;

// Tanpa props (komposisi Preview): hanya visual, tanpa suara.
export const PKS: React.FC<Partial<SoundProps>> = (p) => (
  <>
    <Sequence name="🎬 Visual (semua adegan)">
      <AbsoluteFill style={{ background: "#101216" }}>
        {PANELS.filter((pn) => !SCENES.covered.has(pn.panel)).map((pn) => {
          const C = (Static as any)["P" + pn.panel.replace("-", "_")];
          return C ? (
            <Scene key={pn.panel} code={pn.panel} name={`[statis] ${pn.panel}`}>
              <Panel2x><C /></Panel2x>
            </Scene>
          ) : null;
        })}
        {SCENES.list.map((S, i) => <S key={i} />)}
        {/* v11 · running text VO (Worker T): lapisan teratas, disembunyikan otomatis saat ada teks penekanan */}
        <CaptionTrack />
      </AbsoluteFill>
    </Sequence>
    {p.cues && p.lanes ? <SoundLayer dialogMuted={p.dialogMuted ?? false} dialogGainDb={p.dialogGainDb ?? 0} solo={p.solo ?? "none"} lanes={p.lanes} cues={p.cues} /> : null}
  </>
);
