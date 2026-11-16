// B2 · AI slop digambarkan: tumpukan desain murahan (parodi, sengaja norak tapi terbaca) menutupi kamar satu per satu.
// Tiap elemen = satu lapisan lego. Muncul (pop), bergoyang tiap 2 frame, BEKU 2 f saat "slop" + guncangan ≤ 12 px 6 f,
// lalu runtuh TERSENDAT (tahan 3–4 f, lompat, tahan) keluar bawah frame di B2b. Tanpa teks yang tidak diucapkan.
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {move} from '../lib/curves';
import {getar, hash} from './bersama/fit';

export type SlopProps = {
  jenis: 'gradien' | 'api' | 'kaget' | 'panah' | 'bingkai' | 'stiker' | 'flare' | 'glow' | 'kilau' | 'grade';
  seed: number; w: number; h: number; durasi: number; rot: number;
  /** tinggi badan (px); kanvas h = badan + jatuh + margin supaya runtuh tidak terpotong kotak */
  hb: number;
  /** detik relatif lapisan */
  bekuAt: number; runtuhAt: number;
  /** jarak jatuh (px) dan jumlah langkah tersendat */
  jatuh: number;
  warna?: string;
};

const Api: React.FC = () => (
  <svg viewBox="0 0 100 120" width="100%" height="100%">
    <defs><linearGradient id="api1" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#FFE14A"/><stop offset=".5" stopColor="#FF9A1F"/><stop offset="1" stopColor="#FF3B1F"/></linearGradient></defs>
    <path d="M52 4C58 28 86 42 86 76C86 100 68 116 50 116C30 116 14 102 14 80C14 62 26 54 30 38C38 48 40 54 40 54C42 34 44 18 52 4Z" fill="url(#api1)" stroke="#8A1B0A" strokeWidth="4" strokeLinejoin="round"/>
    <path d="M50 116C38 116 30 106 32 94C34 84 44 78 46 66C56 78 66 84 66 98C66 108 60 116 50 116Z" fill="#FFF1A8"/>
  </svg>
);
const Kaget: React.FC = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <circle cx="50" cy="50" r="46" fill="#FFD43B" stroke="#7A4B00" strokeWidth="4"/>
    <ellipse cx="34" cy="40" rx="8" ry="11" fill="#FFF"/><ellipse cx="66" cy="40" rx="8" ry="11" fill="#FFF"/>
    <circle cx="34" cy="42" r="4" fill="#222"/><circle cx="66" cy="42" r="4" fill="#222"/>
    <path d="M22 24Q34 14 44 24M56 24Q66 14 78 24" fill="none" stroke="#7A4B00" strokeWidth="4" strokeLinecap="round"/>
    <ellipse cx="50" cy="72" rx="12" ry="15" fill="#5A1A00"/>
  </svg>
);
const Panah: React.FC = () => (
  <svg viewBox="0 0 200 110" width="100%" height="100%" style={{filter: 'drop-shadow(0 8px 0 rgba(120,0,0,.55))'}}>
    <path d="M6 40H120V8L196 55L120 102V70H6Z" fill="#FF1F2D" stroke="#FFFFFF" strokeWidth="6" strokeLinejoin="round"/>
  </svg>
);
const Stiker: React.FC = () => {
  const pts = Array.from({length: 24}, (_, i) => { const a = (i / 24) * Math.PI * 2, r = i % 2 ? 40 : 49; return `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`; }).join(' ');
  return <svg viewBox="0 0 100 100" width="100%" height="100%" style={{filter: 'drop-shadow(0 6px 0 rgba(90,0,90,.6))'}}>
    <polygon points={pts} fill="#FFE600" stroke="#FF1F8E" strokeWidth="4" strokeLinejoin="round"/>
    <text x="50" y="66" textAnchor="middle" fontFamily="VAnton" fontSize="52" fill="#FF1F8E" transform="rotate(-8 50 50)">!!</text>
  </svg>;
};
const Kilau: React.FC<{c: string}> = ({c}) => (
  <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M50 2C54 30 70 46 98 50C70 54 54 70 50 98C46 70 30 54 2 50C30 46 46 30 50 2Z" fill={c} style={{filter: 'drop-shadow(0 0 12px #fff)'}}/></svg>
);

const Badan: React.FC<SlopProps> = (p) => {
  switch (p.jenis) {
    case 'gradien': return <div style={{width: '100%', height: '100%', borderRadius: 60, background: 'linear-gradient(120deg,#8E2DE2,#FF3CAC 55%,#FF9A3C)', boxShadow: '0 0 60px rgba(255,60,172,.8), inset 0 0 0 10px rgba(255,255,255,.55)'}}/>;
    case 'api': return <Api/>;
    case 'kaget': return <Kaget/>;
    case 'panah': return <Panah/>;
    case 'stiker': return <Stiker/>;
    case 'kilau': return <Kilau c={p.warna ?? '#FFF6A8'}/>;
    case 'flare': return <div style={{width: '100%', height: '100%', borderRadius: '50%',
      background: 'radial-gradient(circle,rgba(255,255,255,.95) 0%,rgba(255,236,150,.8) 18%,rgba(255,120,200,.45) 42%,rgba(120,80,255,0) 70%)', mixBlendMode: 'screen'}}/>;
    case 'glow': return <div style={{width: '100%', height: '100%', borderRadius: '50%', background: `radial-gradient(circle,${p.warna ?? 'rgba(0,255,230,.8)'} 0%,rgba(0,0,0,0) 68%)`}}/>;
    case 'bingkai': return <div style={{position: 'absolute', inset: 22, borderRadius: 30, border: '12px solid #35F2FF',
      boxShadow: '0 0 28px #35F2FF, 0 0 70px #35F2FF, inset 0 0 28px #FF2FD0, inset 0 0 70px #FF2FD0'}}/>;
    case 'grade': return <div style={{width: '100%', height: '100%', background: 'rgba(0,0,0,.15)'}}/>;
  }
};

/** langkah tersendat: tahan 3–4 f lalu lompat; total `n` langkah, makin cepat (jatuh makin jauh per langkah) */
export const PAD = 60;
const tersendat = (k: number, n: number, seed: number) => {
  const tahan = 3 + (seed % 2);
  const step = Math.floor(k / tahan);
  const r = Math.min(1, step / n);
  return r * r;
};

export const Slop: React.FC<SlopProps> = (p) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pad = p.jenis === 'bingkai' || p.jenis === 'grade' ? 0 : PAD;
  const bekuF = Math.round(p.bekuAt * fps), runtuhF = Math.round(p.runtuhAt * fps);
  const pop = move(f, 0, 9, 'land');
  const lewat = move(f, 0, 5, 'heavy') - move(f, 5, 7, 'heavy') * 0.18;     // pop lewat 1,0 lalu turun ke 1
  const ff = Math.min(f, bekuF);                                              // beku saat "slop"
  const tick = Math.floor(ff / 2);
  const wob = p.jenis === 'bingkai' || p.jenis === 'grade' ? 0 : 1;
  const rot = p.rot + wob * (hash(tick * 3 + p.seed) - 0.5) * 6;
  const sc = (0.7 + 0.5 * lewat) * (1 + wob * (hash(tick * 5 + p.seed) - 0.5) * 0.06);
  const g = getar(f, bekuF, 6, 12, p.seed);
  const k = f - runtuhF;
  const jatuh = k > 0 ? tersendat(k, 7, p.seed) * p.jatuh : 0;
  const miring = k > 0 ? Math.floor(k / 4) * (p.seed % 2 ? 3 : -3) : 0;
  const retak = k > -6 && k <= 0 ? getar(f, runtuhF - 6, 6, 5, p.seed + 3) : {x: 0, y: 0};
  return <AbsoluteFill style={{background: 'transparent'}}>
    <div style={{position: 'absolute', left: pad, top: pad, width: p.w - 2 * pad, height: p.hb, opacity: pop > 0.02 ? 1 : 0,
      transform: `translate(${g.x + retak.x}px, ${g.y + retak.y + jatuh + (1 - pop) * 60}px) rotate(${rot + miring}deg) scale(${sc})`}}>
      <Badan {...p}/>
    </div>
  </AbsoluteFill>;
};
