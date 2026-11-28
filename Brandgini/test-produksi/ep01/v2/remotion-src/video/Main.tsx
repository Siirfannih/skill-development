// Main.tsx · Soalnya Gini sg001 v2. Tiga layer terpisah (ADDENDUM-3): background · karakter/aksi · atas. Kamera per layer di kamera.ts.
import React, { useEffect, useState } from 'react';
import { AbsoluteFill, Audio, continueRender, delayRender, staticFile, useCurrentFrame } from 'remotion';
import { HURUF } from './bersama/tema';
import { LayerBG } from './LayerBG';
import { LayerAksi } from './LayerAksi';
import { LayerAtas } from './LayerAtas';
import { FPS, mv } from './waktu';

const HITS: [number, number][] = [[9.1, 0.04], [15.7, 0.035], [22.8, 0.035], [30.3, 0.04], [33.9, 0.03], [35.7, 0.04], [40.1, 0.1], [44.3, 0.035], [49.6, 0.035], [53.0, 0.07]];
const hit = (t: number) => {
  let s = 1;
  for (const [b, k] of HITS) {
    if (t >= b - 0.2 && t < b) s *= 1 + k * mv(t, b - 0.2, 0.2, 'leave');
    else if (t >= b && t < b + 0.3) s *= 1 + k * (1 - mv(t, b, 0.3, 'land'));
  }
  return s;
};

const useFonts = () => {
  const [h] = useState(() => delayRender('fonts'));
  useEffect(() => {
    const fs = (document.fonts as unknown as { add: (f: FontFace) => void });
    const a = new FontFace(HURUF.keluarga.isi, `url(${staticFile('fonts/PlusJakartaSans-VF.ttf')})`, { weight: '200 800' });
    const b = new FontFace(HURUF.keluarga.isi, `url(${staticFile('fonts/PlusJakartaSans-Italic-VF.ttf')})`, { weight: '200 800', style: 'italic' });
    Promise.all([a.load(), b.load()]).then(() => { fs.add(a); fs.add(b); continueRender(h); }).catch((e) => { throw e; });
  }, [h]);
};

export const Main: React.FC = () => {
  useFonts();
  const f = useCurrentFrame();
  const t = f / FPS;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: `scale(${hit(t)})`, transformOrigin: '540px 960px' }}>
        <LayerBG t={t} />
        <LayerAksi t={t} f={f} />
      </AbsoluteFill>
      <LayerAtas t={t} />
      {/* audio-bus */}
      <Audio src={staticFile('audio/mix.wav')} />
    </AbsoluteFill>
  );
};
