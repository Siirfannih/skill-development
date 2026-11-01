// Lapisan suara untuk Remotion Studio: 1 track dialog + 1 grup per jenis SFX, tiap cue = 1 Sequence di timeline.
import React from "react";
import { Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { z } from "zod";
import { SFX_DUR, SFX_KINDS, PREVIEW_TRIM_DB } from "./audio_sfx_meta";

const FPS = 30;
const kindEnum = z.enum(SFX_KINDS);
export const soundSchema = z.object({
  dialogMuted: z.boolean(),
  dialogGainDb: z.number().min(-24).max(12).step(0.5),
  solo: z.enum(["none", ...SFX_KINDS]),
  lanes: z.array(z.object({ kind: kindEnum, muted: z.boolean(), gainDb: z.number().min(-24).max(12).step(0.5) })),
  cues: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      kind: kindEnum,
      sample: z.string(),
      at: z.number().min(0).step(1 / FPS),
      codeAt: z.number(),
      gainDb: z.number().min(-36).max(12).step(0.5),
      muted: z.boolean(),
    }),
  ),
});
export type SoundProps = z.infer<typeof soundSchema>;

const lin = (db: number) => Math.min(1, Math.pow(10, db / 20));

export const SoundLayer: React.FC<SoundProps> = ({ dialogMuted, dialogGainDb, solo, lanes, cues }) => (
  <>
    {dialogMuted ? null : (
      <Sequence name="🎙 Dialog (VO + klip, suara asli)" layout="none">
        <Audio src={staticFile("audio/v8/dialog.wav")} volume={lin(dialogGainDb)} />
      </Sequence>
    )}
    {SFX_KINDS.map((k) => {
      const lane = lanes.find((l) => l.kind === k);
      if (!lane || lane.muted || (solo !== "none" && solo !== k)) return null;
      const list = cues.filter((c) => c.kind === k && !c.muted);
      if (!list.length) return null;
      return (
        <Sequence key={k} name={`SFX · ${k} (${list.length})`} layout="none">
          {list.map((c) => (
            <Sequence
              key={c.id}
              name={`${c.label} · ${c.at.toFixed(2)}s`}
              from={Math.max(0, Math.round(c.at * FPS))}
              durationInFrames={Math.ceil((SFX_DUR[c.sample] ?? 1) * FPS) + 1}
              layout="none"
            >
              <Audio src={staticFile(`audio/v8/sfx/${c.sample}.wav`)} volume={lin(PREVIEW_TRIM_DB + lane.gainDb + c.gainDb)} />
            </Sequence>
          ))}
        </Sequence>
      );
    })}
  </>
);
