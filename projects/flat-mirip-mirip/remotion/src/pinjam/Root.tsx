// Komposisi PINJAMAN apa adanya dari skill-development-journey (basis f054dec, D-07).
// Hanya untuk melihat titik awal sebelum disesuaikan; adegan video ini dibangun di src/adegan/.
import React from 'react';
import {Composition} from 'remotion';
import {KarakterLayer, type KarakterProps, kotak} from './bersama/KarakterLayer';
import {LembarPixel} from './bersama/LembarPixel';
import {DuniaRepo, type DuniaRepoProps} from './b1';
import {Slop, type SlopProps} from './b2';
import {AppClaude, type AppProps} from './b3';
import {DuniaIG, type IGProps} from './b6';

type Dim = {w?: number; h?: number; durasi?: number};
const meta = ({props}: {props: Dim}) => ({width: props.w ?? 1920, height: props.h ?? 1080, durationInFrames: Math.max(1, Math.round((props.durasi ?? 1) * 30))});

export const PinjamRoot: React.FC = () => <>
  <Composition id="Karakter" component={KarakterLayer as React.FC<any>} fps={30} width={kotak(24).w} height={kotak(24).h} durationInFrames={90}
    defaultProps={{model: 'claude', u: 24, durasi: 3, seed: 1, emosi: [[0, 'neutral']], sudut: [[0, 0.125]]} satisfies KarakterProps}
    calculateMetadata={(({props}: {props: KarakterProps}) => ({width: kotak(props.u).w, height: kotak(props.u).h, durationInFrames: Math.round(props.durasi * 30)})) as never}/>
  <Composition id="DuniaRepo" component={DuniaRepo as React.FC<any>} fps={30} width={1920} height={1080} durationInFrames={96}
    defaultProps={{durasi: 3.2, kunci: {lift: 0.5, geser: 0.7, tekan: 1.3, selesai: 1.76, keluar: 2.72}} satisfies DuniaRepoProps} calculateMetadata={meta as never}/>
  <Composition id="Slop" component={Slop as React.FC<any>} fps={30} width={300} height={300} durationInFrames={90}
    defaultProps={{jenis: 'api', seed: 1, w: 300, h: 300, hb: 180, durasi: 3, rot: 0, bekuAt: 2, runtuhAt: 2.5, jatuh: 900} satisfies SlopProps} calculateMetadata={meta as never}/>
  <Composition id="AppClaude" component={AppClaude as React.FC<any>} fps={30} width={1920} height={1080} durationInFrames={345}
    defaultProps={{durasi: 11.5, kunci: {klik: 1.0, slash: 1.38, apple: 5.06, aKlik: 5.9, bs: 6.2, cine: 6.7, cKlik: 7.9, hapus: 9.24, keluar: 11.1}} satisfies AppProps} calculateMetadata={meta as never}/>
  <Composition id="DuniaIG" component={DuniaIG as React.FC<any>} fps={30} width={1920} height={1080} durationInFrames={225}
    defaultProps={{durasi: 7.5, t0: 75.9, z0: 1.04, kunci: {k1: 3.1, k2: 4.1, field: 4.4}} satisfies IGProps} calculateMetadata={meta as never}/>
  <Composition id="LembarPixel" component={LembarPixel} fps={30} width={1740} height={980} durationInFrames={30}/>
</>;
