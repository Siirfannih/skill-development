import React, {useEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender, staticFile} from 'remotion';
import {F} from './tema';

const face = (family: string, file: string, weight: number, style = 'normal') =>
  `@font-face{font-family:${family};src:url('${staticFile(`fonts/${file}`)}') format('woff2');font-weight:${weight};font-style:${style}}`;

/** Anton, Poppins 600/700/800, Inter 400–800 + 900 italic, JetBrains Mono. Render ditahan sampai semua termuat (build gagal bila hilang). */
export const Fonts: React.FC = () => {
  const [handle] = useState(() => delayRender('fonts'));
  useEffect(() => {
    const specs = [`400 100px ${F.anton}`, `600 40px ${F.poppins}`, `700 40px ${F.poppins}`, `800 40px ${F.poppins}`,
      ...[400, 500, 600, 700, 800].map((w) => `${w} 24px ${F.inter}`), `italic 900 60px ${F.inter}`, `400 24px ${F.mono}`, `700 24px ${F.mono}`];
    Promise.all(specs.map((s) => document.fonts.load(s))).then((r) => {
      if (r.some((x) => x.length === 0)) throw new Error('font hilang');
      continueRender(handle);
    }).catch(cancelRender);
  }, [handle]);
  return <style>{[
    face(F.anton, 'anton-latin-400-normal.woff2', 400),
    ...[600, 700, 800].map((w) => face(F.poppins, `poppins-latin-${w}-normal.woff2`, w)),
    ...[400, 500, 600, 700, 800].map((w) => face(F.inter, `inter-latin-${w}-normal.woff2`, w)),
    face(F.inter, 'inter-latin-900-italic.woff2', 900, 'italic'),
    ...[400, 700].map((w) => face(F.mono, `jetbrains-mono-latin-${w}-normal.woff2`, w)),
  ].join('\n')}</style>;
};
