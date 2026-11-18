import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Flash} from '../bersama/Flash';
import {AppClaudeTerang} from '../bersama/ui-asli/claude/AppClaudeTerang';
import {move} from '../lib/curves';
import {KanvasW2 as Kanvas, TeksW2, useW2} from './w2-kata';

export const PROMPT_P04 = 'Claude please help me edit this video like a professional video editor';

export const P04: React.FC = () => {
  const {frame, fps, kata, f, durasi, offset} = useW2('P04');
  const kameraMulai = f(kata[2].mulai);
  const kameraDurasi = Math.max(1, f(kata[4].mulai) - kameraMulai);
  const kamera = (pada: number) => move(pada, kameraMulai, kameraDurasi, 'heavy');
  const p = kamera(frame);
  const napas = move(frame, 0, durasi - 1, 'drift');
  const skala = 0.82 + 0.68 * p + 0.008 * napas;
  const tx = 140 - 641 * p - 8 * napas;
  const ty = 36 - 808 * p - 6 * napas;
  const seretMulai = f(kata[3].mulai);
  const seretDurasi = Math.max(1, f(kata[4].mulai) - seretMulai);
  const seret = (pada: number) => move(pada, seretMulai, seretDurasi, 'land');
  const q = seret(frame);
  const blurSeret = Math.abs(seret(frame) - seret(frame - 1)) * 30;
  const blurKamera = Math.abs(kamera(frame) - kamera(frame - 1)) * 9;
  const ketikMulai = f(kata[4].mulai);
  const akhirKata = kata[kata.length - 1];
  const ketikSelesai = Math.max(ketikMulai + 1, Math.floor(akhirKata.selesai * fps) - Math.max(1, Math.round((akhirKata.selesai - akhirKata.mulai) * fps * 0.3)));
  const cps = (Array.from(PROMPT_P04).length * fps) / (ketikSelesai - ketikMulai) + 0.001;
  const kirimPada = durasi - 3;

  return <Kanvas>
    <svg width={0} height={0} aria-hidden><defs>
      <filter id="w2-p04-seret" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation={`${blurSeret} ${blurSeret * 0.5}`}/></filter>
    </defs></svg>
    <AbsoluteFill data-w2-p04>
      <style>{`[data-w2-p04] [data-claude-attachment] { transform: translate(${(1 - q) * 330}px, ${-(1 - q) * 190}px) rotate(${(1 - q) * 7}deg); filter: url(#w2-p04-seret); }`}</style>
      <div style={{position: 'absolute', left: 0, top: 0, width: 2000, height: 1228, transformOrigin: '0 0', transform: `translate(${tx}px, ${ty}px) scale(${skala})`, filter: `blur(${blurKamera}px)`}}>
        <AppClaudeTerang lampiran={frame >= seretMulai ? {nama: 'video.mp4', jenis: 'video'} : undefined}
          ketik={{teks: PROMPT_P04, mulai: ketikMulai, cps}} kirimPada={kirimPada}/>
      </div>
    </AbsoluteFill>
    <TeksW2 id="P04"/>
    <Flash mulai={Math.round(offset * fps) + durasi - 2}/>
  </Kanvas>;
};
