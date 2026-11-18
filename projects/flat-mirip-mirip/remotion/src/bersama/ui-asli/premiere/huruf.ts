import {useEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender, staticFile} from 'remotion';

export const HURUF_PREMIERE = 'Premiere Source Sans 3';
let siap: Promise<void> | undefined;

export const useHurufPremiere = () => {
  const [handle] = useState(() => delayRender('Memuat Source Sans 3 untuk Premiere Pro'));
  useEffect(() => {
    siap ??= Promise.all([
      ['regular', '400'], ['semibold', '600'],
    ].map(async ([nama, weight]) => {
      const font = new FontFace(HURUF_PREMIERE, `url("${staticFile(`fonts/source-sans-3-${nama}.otf`)}")`, {weight});
      (document.fonts as FontFaceSet & Set<FontFace>).add(await font.load());
    })).then(() => undefined);
    siap.then(() => continueRender(handle)).catch(cancelRender);
  }, [handle]);
};
