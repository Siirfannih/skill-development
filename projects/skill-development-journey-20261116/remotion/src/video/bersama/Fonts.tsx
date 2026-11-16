import React, {useEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender, staticFile} from 'remotion';
import {FONT} from './tema';

const face = (family: string, file: string, weight: number) =>
  `@font-face{font-family:${family};src:url('${staticFile(`fonts/${file}`)}') format('woff2');font-weight:${weight}}`;

/** Memuat Anton, Poppins, Inter, JetBrains Mono dari public/fonts dan menahan render sampai siap. */
export const Fonts: React.FC = () => {
  const [handle] = useState(() => delayRender('video: fonts'));
  useEffect(() => {
    const specs = [`400 100px ${FONT.anton}`, `600 40px ${FONT.poppins}`, `700 40px ${FONT.poppins}`, `800 40px ${FONT.poppins}`,
      ...[400, 500, 600, 700].map((w) => `${w} 24px ${FONT.inter}`), `400 24px ${FONT.mono}`, `700 24px ${FONT.mono}`];
    Promise.all(specs.map((s) => document.fonts.load(s))).then(() => continueRender(handle)).catch(cancelRender);
  }, [handle]);
  return <style>{[
    face(FONT.anton, 'anton-latin-400-normal.woff2', 400),
    ...[600, 700, 800].map((w) => face(FONT.poppins, `poppins-latin-${w}-normal.woff2`, w)),
    ...[400, 500, 600, 700].map((w) => face(FONT.inter, `inter-latin-${w}-normal.woff2`, w)),
    ...[400, 700].map((w) => face(FONT.mono, `jetbrains-mono-latin-${w}-normal.woff2`, w)),
  ].join('\n')}</style>;
};
