import React, {useEffect, useState} from 'react';
import {AbsoluteFill, cancelRender, continueRender, delayRender, useCurrentFrame} from 'remotion';
import {Fonts} from '../Fonts';
import {KT83} from '../tema';
import {Cincin} from './Cincin';
import {Tangga} from './Tangga';
import {KataDada} from './KataDada';
import {Pil} from './Pil';
import type {KT83Props} from './types';

export const KT83Layer: React.FC<KT83Props> = (p) => {
  const f = useCurrentFrame();
  const [ready, setReady] = useState(false);
  const [handle] = useState(() => delayRender('KT83: Poppins metrics'));
  useEffect(() => {
    document.fonts.load(`700 60px ${KT83.huruf}`).then(() => setReady(true)).catch(cancelRender);
  }, []);
  useEffect(() => {if (ready) continueRender(handle);}, [ready, handle]);
  const kepala = p.kepala[Math.min(f, p.kepala.length - 1)];
  return <AbsoluteFill style={{background: 'transparent'}}><Fonts/>
    {ready && kepala && p.blok.map((b) => {
      const Comp = b.bentuk === 'K1' ? Cincin : b.bentuk === 'K2' ? Tangga : b.bentuk === 'pil' ? Pil : KataDada;
      return <Comp key={b.id} blok={b} kepala={kepala} f={f}/>;
    })}
  </AbsoluteFill>;
};
