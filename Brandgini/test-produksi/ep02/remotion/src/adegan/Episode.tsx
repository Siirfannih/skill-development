import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {C} from '../bersama/Benda';
import {Masuk, useFont, FPS} from '../bersama/Kit';
import {ADEGAN2 as ADEGAN, Beat} from '../v2/Adegan2';
import shot from '../data/shotlist.json';

const BEATS = (shot as {beats: (Beat & {transisi_masuk: {frames?: number}})[]}).beats;
export const TOTAL = Math.round((shot as {target_duration_sec: number}).target_duration_sec * FPS);

// audio-bus: satu-satunya pemutar audio di root (stem final di-mux dari audio/mix.wav oleh langkah Mix)
export const Episode: React.FC<{suara?: string}> = ({suara = 'vo.wav'}) => {
  useFont();
  return (
    <AbsoluteFill>
      <Audio src={staticFile(suara)} />
      <AbsoluteFill style={{backgroundColor: C.netral}} />
      {BEATS.map((b, i) => {
        const Sc = ADEGAN[(b as unknown as {adegan: string}).adegan]; const from = Math.round(b.start_sec * FPS);
        const len = Math.round((b.end_sec - b.start_sec) * FPS) + (i < BEATS.length - 1 ? 10 : 0);
        return <Sequence key={b.beat_id} from={from} durationInFrames={len}><Masuk frames={i === 0 ? 0 : b.transisi_masuk.frames ?? 10}><Sc b={b} /></Masuk></Sequence>;
      })}
    </AbsoluteFill>
  );
};
