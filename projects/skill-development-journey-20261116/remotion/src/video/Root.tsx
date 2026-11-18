import React from 'react';
import {DuniaRepoUI, type DuniaRepoProps as RepoUIProps} from './r4/DuniaRepoUI';
import {AppClaudeUI, type AppProps as AppUIProps} from './r4/AppClaudeUI';
import {KartuUI} from './r4/KartuUI';
import {SurfaceText} from './r4/SurfaceText';
import {DuniaRepoR4, type DuniaRepoProps as DuniaRepoR4Props} from './r4/DuniaRepoR4';
import {AppClaudeR4, type AppProps as AppClaudeR4Props} from './r4/AppClaudeR4';
import {Composition} from 'remotion';
import {KT, type KTProps} from './bersama/KT';
import {KarakterLayer, type KarakterProps, kotak} from './bersama/KarakterLayer';
import {LembarPixel} from './bersama/LembarPixel';
import {Lingkar, type LingkarProps} from './bersama/Lingkar';
import {DuniaRepo, type DuniaRepoProps} from './b1';
import {Slop, type SlopProps} from './b2';
import {AppClaude, type AppProps} from './b3';
import {Kartu, type KartuProps, KARTU} from './b4';
import {DesktopAgen, type DesktopProps} from './b7';
import {BubbleSapa, type BubbleProps} from './bersama/BubbleSapa';
import {ModelGemini} from './bersama/BubbleModelGemini';
import {Coretan, type CoretanProps} from './bersama/Coretan';
import {Komentar, type KomentarProps, DuniaIG, type IGProps, Tanda} from './b6';
import {TokohR7, type TokohR7Props} from './bersama/tokoh/TokohR7';
import {KT83Layer} from './bersama/kt83';
import type {KT83Props} from './bersama/kt83/types';

type Dim = {w?: number; h?: number; durasi?: number};
const meta = ({props}: {props: Dim}) => ({width: props.w ?? 1920, height: props.h ?? 1080, durationInFrames: Math.max(1, Math.round((props.durasi ?? 1) * 30))});

export const VideoRoot: React.FC = () => <>
  <Composition id="R7Tokoh" component={TokohR7 as React.FC<any>} fps={30000 / 1001} width={1920} height={1080} durationInFrames={1}
    defaultProps={{jenis: 'tokoh', w: 1920, h: 1080, durasi: 1, frames: [{x: 650, y: 760, s: 1}]} satisfies TokohR7Props}
    calculateMetadata={(({props}: {props: TokohR7Props}) => ({width: props.w, height: props.h, durationInFrames: props.frames.length})) as never}/>
  <Composition id="R7KTWajah" component={KT83Layer} fps={30000 / 1001} width={1920} height={1080} durationInFrames={30}
    defaultProps={{w: 1920, h: 1080, frames: 30, kepala: [], blok: []} satisfies KT83Props}
    calculateMetadata={({props}) => ({width: props.w, height: props.h, durationInFrames: props.frames})}/>
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
  <Composition id="RelayDunia" component={DesktopAgen as React.FC<any>} fps={30} width={1920} height={1080} durationInFrames={440}
    defaultProps={{pre: 8, post: 8, preT0: 57.66, postT0: 72.07, zPre: 1.06, durasi: 14.67, kunci: {ketik1: 1.5, kirim1: 3.1, tiba1: 3.7, ketik2: 4.0, kirim2: 4.9, tiba2: 5.5, masukB: 5.7, ketikN: 6.8, kirimN: 9.7, tibaN: 10.5, loop: 10.9, ok: 12.9, keluar: 13.7}} satisfies DesktopProps} calculateMetadata={meta as never}/>
  <Composition id="Komentar" component={Komentar as React.FC<any>} fps={30} width={700} height={260} durationInFrames={90}
    defaultProps={{nama: '@pengguna', teks: 'Lumayan nih', sisi: 'kiri', warna: '#9AA3B2', durasi: 3, w: 700, h: 260, size: 56} satisfies KomentarProps} calculateMetadata={meta as never}/>
  <Composition id="DuniaIG" component={DuniaIG as React.FC<any>} fps={30} width={1920} height={1080} durationInFrames={225}
    defaultProps={{durasi: 7.5, t0: 75.9, z0: 1.04, kunci: {k1: 3.1, k2: 4.1, field: 4.4}} satisfies IGProps} calculateMetadata={meta as never}/>
  <Composition id="Tanda" component={Tanda as React.FC<any>} fps={30} width={230} height={230} durationInFrames={40}
    defaultProps={{durasi: 1.3, w: 230, h: 230}} calculateMetadata={meta as never}/>
  <Composition id="Bubble" component={BubbleSapa as React.FC<any>} fps={30} width={500} height={300} durationInFrames={90}
    defaultProps={{baris: [[{t: 'Hi, aku'}], [{t: 'Claude', warna: '#D97757'}, {t: '!'}]], ekor: 'kiri', bw: 300, bh: 150, size: 48, w: 460, h: 262, durasi: 3} satisfies BubbleProps} calculateMetadata={meta as never}/>
  <Composition id="Coretan" component={Coretan as React.FC<any>} fps={30} width={800} height={300} durationInFrames={90}
    defaultProps={{w: 800, h: 300, durasi: 3} satisfies CoretanProps} calculateMetadata={meta as never}/>
  <Composition id="ModelGemini" component={ModelGemini} fps={30} width={1920} height={1080} durationInFrames={30}/>
  <Composition id="LembarPixel" component={LembarPixel} fps={30} width={1740} height={980} durationInFrames={30}/>
  <Composition id="DuniaRepoR4" component={DuniaRepoR4 as React.FC<any>} fps={30} width={1920} height={1080} durationInFrames={88}
    defaultProps={{durasi: 88/30, kunci: {lift: .5, geser: .7, tekan: 1.122, selesai: 1.582, keluar: 2.42}} satisfies DuniaRepoR4Props} calculateMetadata={meta as never}/>
  <Composition id="AppClaudeR4" component={AppClaudeR4 as React.FC<any>} fps={30} width={1920} height={1080} durationInFrames={345}
    defaultProps={{durasi: 11.5, kunci: {klik: 1, slash: 1.425, apple: 5.329, aKlik: 6.279, bs: 6.529, cine: 6.954, cKlik: 8.304, hapus: 8.968, keluar: 10.756}} satisfies AppClaudeR4Props} calculateMetadata={meta as never}/>
  <Composition id="DuniaRepoUI" component={DuniaRepoUI as React.FC<any>} fps={30} width={1920} height={1080} durationInFrames={88}
    defaultProps={{durasi: 88/30, t0: 1.53821, cues: [], kunci: {lift: .5, geser: .7, tekan: 1.122, selesai: 1.582, keluar: 2.42}} satisfies RepoUIProps} calculateMetadata={meta as never}/>
  <Composition id="AppClaudeUI" component={AppClaudeUI as React.FC<any>} fps={30} width={1920} height={1080} durationInFrames={345}
    defaultProps={{durasi: 11.5, t0: 23.59354, cues: [], kunci: {klik: 1, slash: 1.425, apple: 5.329, aKlik: 6.279, bs: 6.529, cine: 6.954, cKlik: 8.304, hapus: 8.968, keluar: 10.756}} satisfies AppUIProps} calculateMetadata={meta as never}/>
  <Composition id="KartuUI" component={KartuUI as React.FC<any>} fps={30} width={640} height={580} durationInFrames={180}
    defaultProps={{durasi: 6, w: 640, h: 580, t0: 0, numberT0: 1, model: 'chatgpt', label: 'ChatGPT Pro', angka: 20, terbang: .45, jarak: 900, cue: {id: 'T065', start: 0, end: 6, words: []}}} calculateMetadata={meta as never}/>
  <Composition id="SurfaceTextUI" component={SurfaceText as React.FC<any>} fps={30} width={1920} height={1080} durationInFrames={130}
    defaultProps={{durasi: 4.33, t0: 72.07534, cues: [], kind: 'blender'}} calculateMetadata={meta as never}/>
</>;
