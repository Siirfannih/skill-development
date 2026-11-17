// Lembar model maskot Gemini (D-409): depan / q / samping x neutral / happy / surprised, di latar footage dan latar gelap B11.
import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile} from 'remotion';
import {KarakterX} from './KarakterPixel';
import {Fonts} from './Fonts';

const SUDUT: [string, number][] = [['depan', 0], ['q', 0.125], ['samping', 0.25]];
const EMO = ['neutral', 'happy', 'surprised'];
const Panel: React.FC<{x: number; judul: string; latar: React.ReactNode; nama: string}> = ({x, judul, latar, nama}) => <div style={{position: 'absolute', left: x, top: 0, width: 960, height: 1080, overflow: 'hidden'}}>
  {latar}
  <div style={{position: 'absolute', left: 24, top: 14, fontFamily: 'monospace', fontSize: 26, color: '#fff', textShadow: '0 1px 4px #000'}}>{judul}</div>
  {EMO.map((e, r) => SUDUT.map(([sn, sd], c) => <React.Fragment key={`${r}${c}`}>
    <KarakterX model="gemini" id={`${nama}-${r}-${c}`} x={160 + c * 320} y={370 + r * 300} u={12} t={1.0} seed={3} sudut={sd} emosi={[[0, e]]} kamar={nama === 'f'}/>
    <div style={{position: 'absolute', left: 160 + c * 320 - 100, top: 380 + r * 300, width: 200, textAlign: 'center', fontFamily: 'monospace', fontSize: 20, color: '#fff', textShadow: '0 1px 3px #000'}}>{sn} · {e}</div>
  </React.Fragment>))}
</div>;
export const ModelGemini: React.FC = () => <AbsoluteFill style={{background: '#000'}}><Fonts/>
  <Panel x={0} nama="f" judul="latar footage (kamar)" latar={<OffthreadVideo src={staticFile('video/wajah-proxy.mp4')} startFrom={300} muted style={{width: 960, height: 1080, objectFit: 'cover'}}/>}/>
  <Panel x={960} nama="g" judul="latar gelap B11" latar={<div style={{position: 'absolute', inset: 0, background: '#161616'}}/>}/>
</AbsoluteFill>;
