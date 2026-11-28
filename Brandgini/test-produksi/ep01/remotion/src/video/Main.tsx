// Main.tsx · Soalnya Gini sg001 v2. Tiga layer terpisah (ADDENDUM-3): background · karakter/aksi · atas. Kamera per layer di kamera.ts.
import React, { useEffect, useState } from 'react';
import { AbsoluteFill, Audio, continueRender, delayRender, staticFile, useCurrentFrame } from 'remotion';
import { HURUF } from './bersama/tema';
import { LayerBG } from './LayerBG';
import { LayerAksi } from './LayerAksi';
import { LayerAtas } from './LayerAtas';
import { FPS } from './waktu';

/** v3: tidak ada 'hit' zoom-lalu-kembali (itu terbaca sebagai kamera tertarik balik). Transisi = gerak kamera satu arah (kamera.ts). */

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
      <AbsoluteFill>
        <LayerBG t={t} />
        <LayerAksi t={t} f={f} />
      </AbsoluteFill>
      <LayerAtas t={t} />
      {/* audio-bus */}
      <Audio src={staticFile('audio/mix.wav')} />
    </AbsoluteFill>
  );
};
