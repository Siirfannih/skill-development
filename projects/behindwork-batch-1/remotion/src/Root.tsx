import React from 'react';
import { Composition, continueRender, delayRender, staticFile } from 'remotion';
import { EpisodeView } from './Episode';
import { FPS, H, W } from './tema';
import type { Episode } from './tipe';
import ep01 from './data/ep01.json';

// Helvetica Neue berlisensi lokal (BRAND Behindwork) dimuat dari file; tanpa font cadangan sistem (Lantai A7).
const muatHuruf = () => {
  if (typeof document === 'undefined') return;
  const h = delayRender('muat huruf');
  const faces = [
    new FontFace('BW Helvetica', `url(${staticFile('fonts/HelveticaNeueMedium.otf')})`, { weight: '500' }),
    new FontFace('BW Helvetica', `url(${staticFile('fonts/HelveticaNeueBold.otf')})`, { weight: '700' }),
  ];
  Promise.all(faces.map((x) => x.load())).then((ls) => { ls.forEach((x) => document.fonts.add(x)); continueRender(h); })
    .catch((e) => { throw new Error('Huruf gagal dimuat: ' + e); });
};
muatHuruf();

const daftar: Episode[] = [ep01 as unknown as Episode];

export const Root: React.FC = () => (
  <>
    {daftar.map((ep) => (
      <Composition key={ep.id} id={ep.id} component={EpisodeView} durationInFrames={Math.round(ep.durasi * FPS)} fps={FPS} width={W} height={H} defaultProps={{ ep }} />
    ))}
  </>
);
