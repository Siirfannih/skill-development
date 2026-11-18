import {useEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender} from 'remotion';
import {SF_PRO_DATA} from './sf-pro-data';

export const HURUF_IG = 'Instagram SF Pro';
let siap: Promise<void> | undefined;

export const useHurufIG = () => {
  const [handle] = useState(() => delayRender('Memuat SF Pro Display untuk UI iOS'));
  useEffect(() => {
    siap ??= Promise.all(SF_PRO_DATA.map(async ([data, weight]) => {
      const font = new FontFace(HURUF_IG, `url("data:font/woff2;base64,${data}")`, {weight});
      (document.fonts as FontFaceSet & Set<FontFace>).add(await font.load());
    })).then(() => undefined);
    siap.then(() => continueRender(handle)).catch(cancelRender);
  }, [handle]);
};
