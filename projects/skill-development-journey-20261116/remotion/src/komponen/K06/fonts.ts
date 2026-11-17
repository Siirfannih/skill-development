import {useEffect, useState} from 'react';
import {continueRender, delayRender, staticFile} from 'remotion';

export type FontDef = {family: string; file: string; weight: string};

export const FONTS_K06: FontDef[] = [
  {family: 'Inter', file: 'fonts/inter-latin-400-normal.woff2', weight: '400'},
  {family: 'Inter', file: 'fonts/inter-latin-500-normal.woff2', weight: '500'},
  {family: 'Inter', file: 'fonts/inter-latin-600-normal.woff2', weight: '600'},
  {family: 'Inter', file: 'fonts/inter-latin-700-normal.woff2', weight: '700'},
];

/** Muat huruf lokal dari public/fonts; frame ditahan sampai siap (aman untuk render paralel). */
export const useFontsReady = (defs: FontDef[]): boolean => {
  const [ready, setReady] = useState(false);
  const [handle] = useState(() => delayRender('font K06'));
  useEffect(() => {
    Promise.all(defs.map((d) => {
      const ff = new FontFace(d.family, `url(${staticFile(d.file)}) format('woff2')`, {weight: d.weight});
      return ff.load().then((f) => { (document.fonts as unknown as {add(f: FontFace): void}).add(f); });
    })).then(() => { setReady(true); continueRender(handle); })
      .catch((e) => { console.error(e); setReady(true); continueRender(handle); });
  }, [defs, handle]);
  return ready;
};
