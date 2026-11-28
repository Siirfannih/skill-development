// Main.tsx · Soalnya Gini sg001. Satu komposisi untuk still storyboard, draft, dan final (kode yang sama).
import React, { useEffect, useState } from 'react';
import { AbsoluteFill, Audio, continueRender, delayRender, staticFile, useCurrentFrame } from 'remotion';
import { MEREK, NETRAL, HURUF, TURUNAN } from './bersama/tema';
import { Klik } from './bersama/Klik';
import { Dunia, kamera } from './Dunia';
import { Gang } from './Gang';
import { Kartu } from './Kartu';
import { Caption } from './Caption';
import { FPS, kf, mv, DURASI_S } from './waktu';
import { drift } from '../lib/curves';

const HITS: [number, number][] = [[9.1, 0.07], [15.7, 0.06], [22.8, 0.06], [30.3, 0.07], [33.9, 0.05], [35.7, 0.07], [40.1, 0.16], [44.3, 0.06], [49.6, 0.06], [53.0, 0.12]];
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
    const a = new FontFace(HURUF.keluarga.isi, `url(${staticFile('fonts/PlusJakartaSans-VF.ttf')})`, { weight: '200 800' });
    const b = new FontFace(HURUF.keluarga.isi, `url(${staticFile('fonts/PlusJakartaSans-Italic-VF.ttf')})`, { weight: '200 800', style: 'italic' });
    Promise.all([a.load(), b.load()]).then(() => { (document.fonts as unknown as { add: (f: FontFace) => void }).add(a); (document.fonts as unknown as { add: (f: FontFace) => void }).add(b); continueRender(h); }).catch((e) => { throw e; });
  }, [h]);
};

const Latar: React.FC = () => (
  <AbsoluteFill style={{ background: MEREK.latar }}>
    <svg width={1080} height={1920} style={{ position: 'absolute' }}>
      {Array.from({ length: 33 }).map((_, i) => <line key={`v${i}`} x1={i * 60} y1={0} x2={i * 60} y2={1920} stroke={NETRAL.tinta} strokeOpacity={0.06} strokeWidth={2} />)}
      {Array.from({ length: 19 }).map((_, i) => <line key={`h${i}`} x1={0} y1={i * 120 + 60} x2={1080} y2={i * 120 + 60} stroke={NETRAL.tinta} strokeOpacity={0.06} strokeWidth={2} />)}
    </svg>
  </AbsoluteFill>
);

const Cap: React.FC<{ t: number }> = ({ t }) => {
  if (t > 2.7) return null;
  const masuk = 0.88 + 0.12 * mv(t, 0, 0.2, 'land');
  const keluar = t > 2.4 ? mv(t, 2.4, 0.3, 'leave') : 0;
  return (
    <div style={{ position: 'absolute', left: 0, top: 290 - keluar * 400, width: 1080, textAlign: 'center', transform: `scale(${masuk}) rotate(${-2 + 2 * mv(t, 0, 0.25, 'land')}deg)`,
      fontFamily: HURUF.keluarga.judul, fontWeight: HURUF.bobot.kunci, fontSize: HURUF.ukuran.hero, color: TURUNAN.primer.tekan }}>
      Kalau…
    </div>
  );
};

const Maskot: React.FC<{ t: number }> = ({ t }) => {
  const ada = (t >= 4.7 && t < 35.7) || t >= 53.0;
  if (!ada) return null;
  let left = kf(t, [[4.7, 270], [5.9, 270], [6.6, 60, 'land']]);
  let top = kf(t, [[4.7, 560], [5.9, 560], [6.6, 1475, 'heavy']]);
  let w = kf(t, [[4.7, 540], [5.9, 540], [6.6, 170, 'heavy']]) * (0.9 + 0.1 * mv(t, 4.7, 0.2, 'land'));
  if (t >= 35.4 && t < 35.7) top += 260 * mv(t, 35.4, 0.3, 'leave');
  if (t >= 53.0) { left = 60; top = 1475; w = 170; }
  let eyes: 'dot' | 'wide' | 'happy' | 'line' = 'dot';
  let arms: [number, number] = [20, 20];
  let tilt = 0;
  let look: [number, number] = [14, -6];
  let sq: [number, number] = [1, 1];
  if (t < 6.6) { eyes = 'wide'; arms = [150, 150]; look = [0, 0]; }                    // buka-maskot: flap terbuka (membuka diri)
  else if (t >= 15.7 && t < 18.9) { arms = [10, 130]; tilt = 5; look = [18, -14]; }     // menunjuk gerobak kiri yang bergeser
  else if (t >= 22.8 && t < 25.4) { arms = [10, 112]; tilt = 7; look = [22, -12]; }     // menunjuk gerobak kanan
  else if (t >= 25.4 && t < 29.6) { eyes = 'wide'; arms = [35, 35]; }
  else if (t >= 29.6 && t < 31.6) { eyes = 'happy'; arms = [165, 165]; look = [0, 0]; const h = mv(t, 29.6, 0.5, 'land'); top -= Math.sin(h * Math.PI) * 46; sq = [1 - 0.05 * Math.sin(h * Math.PI), 1 + 0.06 * Math.sin(h * Math.PI)]; } // "oh gitu"
  else if (t >= 53.0) { eyes = t >= 54.1 ? 'line' : 'dot'; arms = [kf(t, [[53.0, 90], [54.1, 0, 'heavy']]), kf(t, [[53.0, 90], [54.1, 0, 'heavy']])]; look = [0, 0]; } // menutup flap
  const d = drift(Math.round(t * FPS), FPS, 2, 3);
  return (
    <div style={{ position: 'absolute', left: left + d.x, top: top + d.y }}>
      <Klik lebar={w} eyes={eyes} arms={arms} tilt={tilt} look={look} squash={sq} />
    </div>
  );
};

export const Main: React.FC = () => {
  useFonts();
  const f = useCurrentFrame();
  const t = f / FPS;
  const dunia = t < 40.1 || t >= 53.0;
  const cam = kamera(t);
  const d = drift(f, FPS, 5, 2);
  const h = hit(t);
  const gs = kf(t, [[40.1, 1.25], [40.55, 1.0, 'land'], [52.99, 1.06, 'drift']]);
  return (
    <AbsoluteFill>
      <Latar />
      <AbsoluteFill style={{ transform: `scale(${h})`, transformOrigin: '540px 960px' }}>
        <svg width={1080} height={1920} style={{ position: 'absolute' }}>
          {dunia ? (
            <g transform={`translate(${540 + d.x} ${900 + d.y}) scale(${cam.s}) translate(${-cam.fx} ${-820})`}>
              <Dunia t={t} f={f} />
            </g>
          ) : (
            <g transform={`translate(0 90) translate(540 960) scale(${gs}) translate(-540 -960)`}>
              <Gang t={t} />
            </g>
          )}
          <Kartu t={t} />
        </svg>
      </AbsoluteFill>
      <Cap t={t} />
      <Maskot t={t} />
      <Caption t={t} />
      {/* audio-bus */}
      <Audio src={staticFile('audio/mix.wav')} />
    </AbsoluteFill>
  );
};
export const _ = DURASI_S;
