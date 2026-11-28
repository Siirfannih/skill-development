// Rig tiga layer (Addendum 3 "Struktur layer"): Latar (paling bawah, parallax paling lambat), Aksi (tengah, kamera penuh), Atas (teks, maskot, panah).
// Satu gerak kamera per beat, satu arah (from → to, kurva drift), tanpa balik/overshoot (Addendum 4 butir 1a).
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {move} from '../lib/curves';
import {FPS} from './Kit';

export type Kam = {s: number; x: number; y: number};   // zoom, titik pusat (offset dari tengah frame dalam koordinat dunia)
export const PAR = {latar: 0.35, aksi: 1, atas: 0.12};

const layer = (k: Kam, p: number) => {
  const s = 1 + (k.s - 1) * p;
  return `translate(540px, 960px) scale(${s}) translate(${-540 - k.x * p}px, ${-960 - k.y * p}px)`;
};

export const Dunia: React.FC<{
  frames: number; dari: Kam; ke: Kam;
  latar: (f: number) => React.ReactNode;
  aksi: (f: number) => React.ReactNode;
  atas?: (f: number) => React.ReactNode;
}> = ({frames, dari, ke, latar, aksi, atas}) => {
  const f = useCurrentFrame();
  const t = move(f, 0, frames, 'drift');
  const k: Kam = {s: dari.s + (ke.s - dari.s) * t, x: dari.x + (ke.x - dari.x) * t, y: dari.y + (ke.y - dari.y) * t};
  const svgStyle: React.CSSProperties = {position: 'absolute', left: 0, top: 0, overflow: 'visible'};
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{transform: layer(k, PAR.latar), transformOrigin: '0 0'}}>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={svgStyle}>{latar(f)}</svg>
      </AbsoluteFill>
      <AbsoluteFill style={{transform: layer(k, PAR.aksi), transformOrigin: '0 0'}}>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={svgStyle}>{aksi(f)}</svg>
      </AbsoluteFill>
      <AbsoluteFill style={{transform: layer(k, PAR.atas), transformOrigin: '0 0'}}>{atas?.(f)}</AbsoluteFill>
    </AbsoluteFill>
  );
};
export const detik = (f: number) => f / FPS;
