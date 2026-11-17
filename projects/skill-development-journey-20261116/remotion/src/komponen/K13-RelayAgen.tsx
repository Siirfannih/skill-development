import React, {useEffect, useState} from 'react';
import {AbsoluteFill, cancelRender, continueRender, delayRender, useCurrentFrame, useVideoConfig} from 'remotion';
import {move} from '../lib/curves';
import {PixelTokoh2D} from './PixelTokoh2D';
import {FONT_CSS} from './K13/fonts';
import {blurCepat, denyut, kameraK13, LOOP_CHECKS, loopPath, masuk, sinyalLoop, TOKOH_X} from './K13/gerak';
import {PanelChatGPT, PanelClaude} from './K13/Panel';

export type K13RelayAgenProps = {
  mulai: number;
  durasi: number;
  /** Semua jangkar adalah frame absolut di linimasa tuan rumah. */
  kKayak: number;
  kChatgptKeClaude: number;
  kSebaliknya: number;
  kSessionBeda: number;
  kLoop: number;
};

export const CONTOH_K13: K13RelayAgenProps = {mulai: 0, durasi: 420, kKayak: 0,
  kChatgptKeClaude: 90, kSebaliknya: 150, kSessionBeda: 220, kLoop: 330};

export const objekK13 = (p: K13RelayAgenProps): {nama: string; frame: number; peran: string}[] => [
  {nama: 'kanvas putih', frame: p.kKayak + 12, peran: 'transisi-dunia'},
  {nama: 'transkrip Claude Code', frame: p.kKayak + 18, peran: 'objek-mendarat'},
  {nama: 'chat ChatGPT', frame: p.kKayak + 68, peran: 'objek-mendarat'},
  {nama: 'Claude 2', frame: p.kKayak + 51, peran: 'objek-mendarat'},
  {nama: 'ChatGPT session A', frame: p.kKayak + 81, peran: 'objek-mendarat'},
  {nama: 'pesan ChatGPT ke Claude', frame: p.kChatgptKeClaude + 40, peran: 'sinyal'},
  {nama: 'pesan ChatGPT tiba di Claude', frame: p.kChatgptKeClaude + 64, peran: 'objek-mendarat'},
  {nama: 'pesan Claude ke ChatGPT', frame: p.kSebaliknya + 8, peran: 'sinyal'},
  {nama: 'pesan Claude tiba di ChatGPT', frame: p.kSebaliknya + 32, peran: 'objek-mendarat'},
  {nama: 'Claude 1', frame: p.kSebaliknya + 32, peran: 'objek-mendarat'},
  {nama: 'BUS_ME=claude2 bus send claude1', frame: p.kSebaliknya + 36, peran: 'sinyal'},
  {nama: 'ChatGPT session B', frame: p.kSessionBeda + 16, peran: 'objek-mendarat'},
  {nama: 'pesan session A ke session B', frame: p.kSessionBeda + 24, peran: 'sinyal'},
  {nama: 'pesan tiba di session B', frame: p.kSessionBeda + 48, peran: 'objek-mendarat'},
  {nama: 'loop pembelajaran', frame: p.kLoop - 28, peran: 'sinyal'},
  ...['Claude 1', 'Claude 2', 'session A', 'session B'].map((name, i) => ({
    nama: `centang ${name}`, frame: p.kLoop - 8 + LOOP_CHECKS[i], peran: 'terverifikasi'})),
];

const Envelope: React.FC<{f: number; start: number; from: number; to: number; coral?: boolean}> = ({f, start, from, to, coral}) => {
  const travel = move(f, start, 24, 'land');
  const rise = move(f, start, 11, 'land') - move(f, start + 11, 13, 'heavy');
  const appear = move(f, start, 4, 'land');
  const vanish = move(f, start + 24, 9, 'leave');
  return <div style={{position: 'absolute', left: from + (to - from) * travel - 31,
    top: 716 - 103 * rise, opacity: appear * (1 - vanish),
    transform: `scale(${.92 + .08 * appear - .12 * vanish}) rotate(${(to > from ? 1 : -1) * 8 * rise}deg)`,
    filter: `blur(${2.2 * blurCepat(f, start + 2)}px)`}}>
    <svg width="62" height="44" viewBox="0 0 62 44" fill="#FFFFFF">
      <rect x="1.5" y="1.5" width="59" height="41" rx="11" stroke={coral ? '#D97757' : '#1F2328'} strokeWidth="2.5" />
      <path d="M8 10 L31 26 L54 10" fill="none" stroke={coral ? '#D97757' : '#1F2328'} strokeWidth="2.5" />
    </svg>
  </div>;
};

const Tokoh: React.FC<{f: number; at: number; x: number; model: 'claude' | 'chatgpt'; label: string;
  receipt: number; verified: number}> = ({f, at, x, model, label, receipt, verified}) => {
  const hit = denyut(f, receipt);
  const check = move(f, verified, 12, 'land');
  return <div style={{position: 'absolute', left: x - 160, top: 690, width: 320, textAlign: 'center', ...masuk(f, at)}}>
    <div style={{transform: `translateY(${-7 * hit}px) scale(${1 + .025 * hit})`}}>
      <PixelTokoh2D model={model} tinggi={213} angkatLengan={hit} />
    </div>
    <svg width="320" height="32" style={{display: 'block'}}>
      <path d="M160 0 V17 H218" fill="none" stroke="#6B6F76" strokeWidth="1" />
      <circle cx="218" cy="17" r="3.5" fill="#D97757" />
    </svg>
    <div style={{fontFamily: 'K13Mono', fontSize: 26, whiteSpace: 'nowrap', color: '#1F2328'}}>{label}</div>
    <svg width="40" height="40" style={{position: 'absolute', top: -80, left: 140, opacity: check,
      transform: `scale(${.92 + .08 * check}) translateY(${12 * (1 - check)}px)`}}>
      <circle cx="20" cy="20" r="18" fill="#1A7F37" />
      <path d="M11 20 L17 26 L29 13" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  </div>;
};

export const K13RelayAgen: React.FC<K13RelayAgenProps> = (p) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const [fontHandle] = useState(() => delayRender('K13 local fonts'));
  useEffect(() => {
    Promise.all([document.fonts.load('26px K13Inter'), document.fonts.load('22px K13Mono')])
      .then(() => continueRender(fontHandle)).catch(cancelRender);
  }, [fontHandle]);
  const arrival = [p.kChatgptKeClaude + 64, p.kSebaliknya + 32, p.kSessionBeda + 48];
  const camera = kameraK13(f, p);
  const loopReveal = move(f, p.kLoop - 28, 20, 'heavy');
  const signalStart = p.kLoop - 8;
  const signal = sinyalLoop(f, signalStart);
  const signalOn = move(f, signalStart, 2, 'land') * (1 - move(f, signalStart + 26, 6, 'leave'));
  const portal = move(f, p.kKayak, 24, 'heavy');
  const portalOut = move(f, p.kKayak + 19, 5, 'leave');
  const busVisible = move(f, p.kSebaliknya + 22, 16, 'land') * (1 - move(f, p.kLoop - 17, 11, 'leave'));
  if (f < p.mulai || f >= p.mulai + p.durasi) return <style>{FONT_CSS}</style>;
  return <AbsoluteFill style={{background: '#F6F5F0', overflow: 'hidden'}}>
    <style>{FONT_CSS}</style>
    <AbsoluteFill style={{transformOrigin: '0 0', transform: `translate(960px, 540px) scale(${camera.scale}) translate(${-camera.x}px, ${-camera.y}px)`, filter: `blur(${camera.blur}px)`}}>
      <PanelClaude f={f} at={p.kKayak} fps={fps} />
      <PanelChatGPT f={f} at={p.kKayak + 52} />
      <svg width="1920" height="1080" style={{position: 'absolute', inset: 0}}>
        <defs><marker id="k13-loop-arrow" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="10" markerHeight="10" orient="auto-start-reverse">
          <path d="M2 1 L10 6 L2 11" fill="none" stroke="#6B6F76" strokeWidth="1.8" strokeLinejoin="round" />
        </marker></defs>
        <path markerEnd="url(#k13-loop-arrow)" d={loopPath} pathLength="1" stroke="#6B6F76" strokeWidth="2" strokeLinejoin="round" fill="none"
          strokeDasharray="1" strokeDashoffset={1 - loopReveal} opacity={loopReveal} />
        <circle cx={signal.x} cy={signal.y} r="7" fill="#1A7F37" opacity={signalOn} />
      </svg>
      <Tokoh f={f} at={p.kSebaliknya + 16} x={TOKOH_X[0]} model="claude" label="Claude 1"
        receipt={p.kSebaliknya + 60} verified={signalStart + LOOP_CHECKS[0]} />
      <Tokoh f={f} at={p.kKayak + 35} x={TOKOH_X[1]} model="claude" label="Claude 2"
        receipt={arrival[0]} verified={signalStart + LOOP_CHECKS[1]} />
      <Tokoh f={f} at={p.kKayak + 65} x={TOKOH_X[2]} model="chatgpt" label="ChatGPT · session A"
        receipt={arrival[1]} verified={signalStart + LOOP_CHECKS[2]} />
      <Tokoh f={f} at={p.kSessionBeda} x={TOKOH_X[3]} model="chatgpt" label="ChatGPT · session B"
        receipt={arrival[2]} verified={signalStart + LOOP_CHECKS[3]} />
      <Envelope f={f} start={p.kChatgptKeClaude + 40} from={TOKOH_X[2]} to={TOKOH_X[1]} />
      <Envelope f={f} start={p.kSebaliknya + 8} from={TOKOH_X[1]} to={TOKOH_X[2]} coral />
      <Envelope f={f} start={p.kSebaliknya + 36} from={TOKOH_X[1]} to={TOKOH_X[0]} coral />
      <Envelope f={f} start={p.kSessionBeda + 24} from={TOKOH_X[2]} to={TOKOH_X[3]} />
      <div style={{position: 'absolute', left: 206, top: 986, width: 1190, fontFamily: 'K13Mono', fontSize: 28,
        lineHeight: 1.5, color: '#1F2328', opacity: busVisible, transform: `translateY(${18 * (1 - busVisible)}px)`}}>
        <div>$ BUS_ME=claude2 bus send claude1 "skill-dev: potong B5"</div>
        <div>"Codex sedang memotong B5; jangan render, tunggu cut terkunci."</div>
        <div style={{color: '#6B6F76'}}>terkirim: …/to-claude1/20261116-201120-claude2.md</div>
      </div>
    </AbsoluteFill>
    <div style={{position: 'absolute', left: 615, top: 400, width: 690, height: 280,
      border: '42px solid #E4E2DA', borderRadius: 24, opacity: 1 - portalOut,
      transform: `scale(${1 + 2 * portal})`, filter: `blur(${3 * blurCepat(f, p.kKayak + 10)}px)`, pointerEvents: 'none'}} />
  </AbsoluteFill>;
};

export default K13RelayAgen;
