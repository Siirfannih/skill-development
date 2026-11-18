// Main.tsx · rakitan 2006 frame. Urutan lapis: shot → efek global (negative, flash, burn) → grain.
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Fonts} from './Fonts';
import {GF} from './kt/KT';
import {FilmBurn, Flash, Grain} from './fx/FX';
import {H1, H2, S3, S4, S5} from './shot/Hook';
import {S6, S7, S8} from './shot/Produk';
import * as Trap from './shot/Trap';
import * as Jembatan from './shot/Jembatan';
import * as Bukti from './shot/Bukti';
import {S23} from './shot/Penutup';

// negative 1 f (§4.0): 192, 585, 904
const NEG = [192, 585, 904];

export const Main: React.FC = () => {
  const g = useCurrentFrame();
  const neg = NEG.includes(g);
  return (
    <GF.Provider value={g}>
      <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
        <Fonts/>
        <AbsoluteFill style={{filter: neg ? 'invert(1) hue-rotate(180deg)' : undefined}}>
          <H1/><H2/><S3/><S4/><S5/>
          <S6/><S7/><S8/>
          <Trap.S9/><Trap.S10/><Trap.S11/><Trap.S12/>
          <Jembatan.S13/><Jembatan.S14/><Jembatan.S15/><Jembatan.S16/>
          <Bukti.S17/><Bukti.S18/><Bukti.S19/><Bukti.S20/><Bukti.S21/><Bukti.S22/>
          <S23/>
        </AbsoluteFill>
        {/* pembuka: flash naik 1 f turun 3 f + film burn 5 f */}
        <Flash at={0} turun={3}/>
        <FilmBurn mulai={0} puncak={2} selesai={6} seed={1}/>
        {/* film burn transisi */}
        <FilmBurn mulai={282} puncak={286} selesai={291} seed={2}/>
        <FilmBurn mulai={636} puncak={640} selesai={645} seed={3}/>
        <FilmBurn mulai={1072} puncak={1076} selesai={1080} seed={4}/>
        <FilmBurn mulai={1481} puncak={1485} selesai={1490} seed={5}/>
        {/* flash aksen */}
        <Flash at={586} turun={3}/>
        <Flash at={904} turun={2} kuat={0.5}/>
        <Flash at={1472} turun={3} kuat={0.6}/>
        <Grain/>
      </AbsoluteFill>
    </GF.Provider>
  );
};
