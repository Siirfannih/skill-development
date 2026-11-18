import React, {useId} from 'react';
import {AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {BAYANGAN, JARAK, NETRAL, RADIUS} from '../bersama/tema';
import {dur, move} from '../lib/curves';
import type {ShotW4} from './w4-shots';

const MediaW4: React.FC<{shot: ShotW4; style?: React.CSSProperties}> = ({shot, style}) => {
  const {fps} = useVideoConfig();
  return shot.foto
    ? <Img src={staticFile(shot.src)} style={style}/>
    : <OffthreadVideo muted src={staticFile(shot.src)} startFrom={Math.round(shot.sumber * fps)} style={style}/>;
};

const GrainW4: React.FC = () => {
  const frame = useCurrentFrame();
  const id = `grain-w4-${useId().replace(/:/g, '')}`;
  return <svg width="100%" height="100%" style={{position: 'absolute', inset: 0, opacity: 0.045, mixBlendMode: 'soft-light', pointerEvents: 'none'}}>
    <filter id={id} x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="2" stitchTiles="stitch" seed={1 + Math.floor(frame / 2) % 13}/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <rect width="100%" height="100%" fill={NETRAL.putih} filter={`url(#${id})`}/>
  </svg>;
};

// Pola LatarVideo PapanFootage: push + grade + gelap, material hanya pada lapisan gambar.
export const LatarW4: React.FC<{shot: ShotW4; blur?: number; xTeks?: number}> = ({shot, blur = 0, xTeks = 0.5}) => {
  const frame = useCurrentFrame();
  const {width} = useVideoConfig();
  const id = `film-w4-${useId().replace(/:/g, '')}`;
  const skala = (shot.skala ?? 1) + 0.06 * move(frame, 0, Math.max(1, shot.to - shot.from - 1), 'drift');
  const style: React.CSSProperties = {position: 'absolute', width: '100%', height: '100%', objectFit: 'cover',
    transform: `translateX(${(shot.geserX ?? 0) * width}px) scale(${skala})`, transformOrigin: shot.asal ?? '50% 50%'};
  const url = (suffix: string) => `url(#${id}-${suffix})`;
  return <AbsoluteFill data-w4-shot={shot.id} style={{overflow: 'hidden', backgroundColor: NETRAL.tinta}}>
    <svg width="0" height="0" style={{position: 'absolute'}}>
      <defs>
        <filter id={`${id}-bloom`} colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="halation"/>
          <feComponentTransfer in="halation"><feFuncA type="linear" slope="0.075"/></feComponentTransfer>
          <feBlend in="SourceGraphic" mode="screen"/>
        </filter>
        <filter id={`${id}-edge`} colorInterpolationFilters="sRGB">
          <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red"/>
          <feOffset in="red" dx="1.2" result="redEdge"/>
          <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="cyan"/>
          <feOffset in="cyan" dx="-1.2" result="cyanEdge"/>
          <feBlend in="redEdge" in2="cyanEdge" mode="screen"/>
        </filter>
      </defs>
    </svg>
    <AbsoluteFill style={{filter: `saturate(0.62) contrast(0.88) brightness(1.03) blur(${blur}px)`}}>
      <AbsoluteFill style={{filter: url('bloom')}}><MediaW4 shot={shot} style={style}/></AbsoluteFill>
      <AbsoluteFill style={{filter: url('edge'), maskImage: 'linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0) 14%, rgba(0,0,0,0) 86%, rgba(0,0,0,1))'}}>
        <MediaW4 shot={shot} style={style}/>
      </AbsoluteFill>
    </AbsoluteFill>
    <GrainW4/>
    <AbsoluteFill style={{backgroundColor: 'rgba(0,0,0,0.20)'}}/>
    <AbsoluteFill style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0) 5%, rgba(0,0,0,0.49) 32%, rgba(0,0,0,0.49) 68%, rgba(0,0,0,0) 95%)'}}/>
    {xTeks < 0.4 && <AbsoluteFill style={{background: 'linear-gradient(to right, rgba(0,0,0,0.12), rgba(0,0,0,0) 72%)'}}/>}
  </AbsoluteFill>;
};

export const MontaseW4: React.FC<{shots: ShotW4[]; blurDari?: number; blurSampai?: number; xTeks?: number}> =
  ({shots, blurDari, blurSampai, xTeks}) => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();
    const kabur = blurDari === undefined ? 0 : RADIUS.kartu * 0.6 * move(frame, blurDari, Math.max(1, (blurSampai ?? blurDari + fps) - blurDari), 'heavy');
    return <AbsoluteFill>{shots.map((shot, n) => <Sequence key={`${shot.id}-${n}`} from={shot.from} durationInFrames={shot.to - shot.from} premountFor={fps}>
      <LatarW4 shot={shot} blur={kabur} xTeks={xTeks}/>
    </Sequence>)}</AbsoluteFill>;
  };

export const KartuArsipW4: React.FC<{
  shot: ShotW4;
  tinggi: number;
  atas: number;
  miring: number;
  umur: number;
}> = ({shot, tinggi, atas, miring, umur}) => {
  const frame = useCurrentFrame();
  const {width, fps} = useVideoConfig();
  const bingkai = RADIUS.kartu;
  const lebar = (tinggi - bingkai * 2) * (shot.rasio ?? 16 / 9) + bingkai * 2;
  const jarak = JARAK.aman * 2;
  const masuk = dur(jarak, fps, 0.6);
  const y = (f: number) => jarak * (1 - move(f, 0, masuk, 'land'));
  const blurGerak = Math.abs(y(umur) - y(umur - 1)) * 0.085;
  const push = 1 + 0.025 * move(umur, 0, Math.max(1, umur + shot.to - shot.from - frame), 'drift');
  return <div data-w4-kartu style={{position: 'absolute', left: (width - lebar) / 2, top: atas,
    width: lebar, height: tinggi, padding: bingkai, boxSizing: 'border-box', backgroundColor: NETRAL.putih,
    boxShadow: BAYANGAN.kartu, transform: `translateY(${y(umur)}px) rotate(${miring}deg) scale(${push})`,
    filter: `blur(${blurGerak}px)`}}>
    <div style={{width: '100%', height: '100%', overflow: 'hidden'}}>
      <MediaW4 shot={shot} style={{width: '100%', height: '100%', display: 'block', objectFit: 'cover',
        filter: 'saturate(0.65) contrast(0.92) brightness(1.02)', transform: `scale(${1 + 0.035 * move(frame, 0, Math.max(1, shot.to - shot.from - 1), 'drift')})`}}/>
    </div>
  </div>;
};
