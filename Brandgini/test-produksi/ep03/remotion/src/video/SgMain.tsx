import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, staticFile, delayRender, continueRender} from 'remotion';
import {Caption, KtItem} from './bersama/Caption';
import {Dunia} from './adegan/Dunia';
import {NETRAL} from './bersama/tema';
import {CURVE} from '../lib/curves';
import data from '../data/ep03.json';

type B = {id: string; dari: number; sampai: number; tr: string};
const beats = data.beats as B[];

// Buka-maskot (aksen K-05): lingkaran Biru Gini keluar dari KLIK menutup layar, dunia pindah ke dalam tong, lingkaran menyusut.
const BukaMaskot: React.FC<{at: number}> = ({at}) => {
  const f = useCurrentFrame();
  const grow = f >= at - 14 && f < at;
  const shrink = f >= at && f < at + 12;
  if (!grow && !shrink) return null;
  const r = grow ? 1700 * CURVE.heavy((f - (at - 14)) / 14) : 1700 * (1 - CURVE.land((f - at) / 12));
  return <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}><circle cx={540} cy={700} r={r} fill={NETRAL.putih} /></svg>;
};

// Font dimuat dari file (Lantai A7): build gagal bila file tidak ada.
const useFont = () => {
  const [h] = useState(() => delayRender('font Plus Jakarta Sans'));
  useEffect(() => {
    const ff = new FontFace('Plus Jakarta Sans', `url(${staticFile('fonts/PlusJakartaSans[wght].ttf')})`, {weight: '200 800'});
    ff.load().then((x) => { document.fonts.add(x); continueRender(h); }).catch((e) => { throw e; });
  }, [h]);
};

export const SgMain: React.FC = () => {
  useFont();
  const f = useCurrentFrame();
  const buka = beats.find((b) => b.tr === 'buka-maskot');
  return (
    <AbsoluteFill>
      <Dunia f={f} />
      <Sequence from={0}><Caption kt={data.kt as KtItem[]} /></Sequence>
    </AbsoluteFill>
  );
};
