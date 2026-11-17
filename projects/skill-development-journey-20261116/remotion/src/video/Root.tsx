import React from 'react';
import {Composition} from 'remotion';
import {KT, type KTProps} from './bersama/KT';
import {KarakterLayer, type KarakterProps, kotak} from './bersama/KarakterLayer';
import {Lingkar, type LingkarProps} from './bersama/Lingkar';
import {DuniaRepo, type DuniaRepoProps} from './b1';
import {Slop, type SlopProps} from './b2';
import {AppClaude, type AppProps} from './b3';
import {Kartu, type KartuProps, KARTU} from './b4';
import {RelayDunia, type RelayProps} from './b5';
import {Komentar, type KomentarProps, DuniaIG, type IGProps, Tanda} from './b6';

type Dim = {w?: number; h?: number; durasi?: number};
const meta = ({props}: {props: Dim}) => ({width: props.w ?? 1920, height: props.h ?? 1080, durationInFrames: Math.max(1, Math.round((props.durasi ?? 1) * 30))});

export const VideoRoot: React.FC = () => <>
  <Composition id="KT" component={KT as React.FC<any>} fps={30} width={1000} height={200} durationInFrames={45}
    defaultProps={{teks: 'finally', kode: 'T19', gaya: 'r1', w: 1000, h: 200, durasi: 1.5} satisfies KTProps} calculateMetadata={meta as never}/>
  <Composition id="Karakter" component={KarakterLayer as React.FC<any>} fps={30} width={kotak(24).w} height={kotak(24).h} durationInFrames={90}
    defaultProps={{model: 'claude', u: 24, durasi: 3, seed: 1, emosi: [[0, 'neutral']], sudut: [[0, 0.125]]} satisfies KarakterProps}
    calculateMetadata={(({props}: {props: KarakterProps}) => ({width: kotak(props.u).w, height: kotak(props.u).h, durationInFrames: Math.round(props.durasi * 30)})) as never}/>
  <Composition id="Lingkar" component={Lingkar as React.FC<any>} fps={30} width={1920} height={1080} durationInFrames={90}
    defaultProps={{t0: 0, durasi: 3} satisfies LingkarProps} calculateMetadata={meta as never}/>
  <Composition id="DuniaRepo" component={DuniaRepo as React.FC<any>} fps={30} width={1920} height={1080} durationInFrames={96}
    defaultProps={{durasi: 3.2, kunci: {lift: 0.5, geser: 0.7, tekan: 1.3, selesai: 1.76, keluar: 2.72}} satisfies DuniaRepoProps} calculateMetadata={meta as never}/>
  <Composition id="Slop" component={Slop as React.FC<any>} fps={30} width={300} height={300} durationInFrames={90}
    defaultProps={{jenis: 'api', seed: 1, w: 300, h: 300, hb: 180, durasi: 3, rot: 0, bekuAt: 2, runtuhAt: 2.5, jatuh: 900} satisfies SlopProps} calculateMetadata={meta as never}/>
  <Composition id="AppClaude" component={AppClaude as React.FC<any>} fps={30} width={1920} height={1080} durationInFrames={345}
    defaultProps={{durasi: 11.5, kunci: {klik: 1.0, slash: 1.38, apple: 5.06, aKlik: 5.9, bs: 6.2, cine: 6.7, cKlik: 7.9, hapus: 9.24, keluar: 11.1}} satisfies AppProps} calculateMetadata={meta as never}/>
  <Composition id="Kartu" component={Kartu as React.FC<any>} fps={30} width={KARTU.w + 2 * KARTU.margin} height={KARTU.h + 2 * KARTU.margin} durationInFrames={150}
    defaultProps={{model: 'chatgpt', label: 'ChatGPT Pro', angka: 20, durasi: 5, terbang: 0.45, jarak: 900} satisfies KartuProps}
    calculateMetadata={meta as never}/>
  <Composition id="RelayDunia" component={RelayDunia as React.FC<any>} fps={30} width={1920} height={1080} durationInFrames={400}
    defaultProps={{pre: 8, post: 8, preT0: 59.2, postT0: 72.65, zPre: 1.04, durasi: 13.7, kunci: {ketik1: 0.7, pesan1: 1.42, amplop1: 1.98, ketik2: 2.7, pesan2: 3.5, amplop2: 3.74, pesan3: 5.9, catat: 8.56, loop: 10.8, selesai: 11.4, keluar: 12.8}} satisfies RelayProps} calculateMetadata={meta as never}/>
  <Composition id="Komentar" component={Komentar as React.FC<any>} fps={30} width={700} height={260} durationInFrames={90}
    defaultProps={{nama: '@pengguna', teks: 'Lumayan nih', sisi: 'kiri', warna: '#9AA3B2', durasi: 3, w: 700, h: 260, size: 56} satisfies KomentarProps} calculateMetadata={meta as never}/>
  <Composition id="DuniaIG" component={DuniaIG as React.FC<any>} fps={30} width={1920} height={1080} durationInFrames={225}
    defaultProps={{durasi: 7.5, t0: 75.9, z0: 1.04, kunci: {k1: 3.1, k2: 4.1, field: 4.4}} satisfies IGProps} calculateMetadata={meta as never}/>
  <Composition id="Tanda" component={Tanda as React.FC<any>} fps={30} width={230} height={230} durationInFrames={40}
    defaultProps={{durasi: 1.3, w: 230, h: 230}} calculateMetadata={meta as never}/>
</>;
