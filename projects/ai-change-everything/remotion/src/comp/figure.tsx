// Figur "stickman" 2,5D gaya Apple: anggota badan kapsul membulat dengan gradien cahaya dari atas,
// kepala bola bergradien, bayangan kontak lembut di lantai, meja/laptop/kursi dengan sisi depan lebih gelap.
// Bukan stickman garis mentah storyboard: bentuk tebal, halus, satu sumber cahaya, tanpa outline.
import React, {useId} from 'react';
import {useCurrentFrame} from 'remotion';
import {AppTile} from './ui';

type Pose = 'type' | 'slump';

const P = {
  // sendi (viewBox 600×600, lantai y=520, menghadap kanan)
  hip: [232, 352],
  knee: [334, 356],
  foot: [338, 514],
  shoulder: [250, 222],
  head: [268, 166],
};

export const Figure: React.FC<{
  w: number;
  pose?: Pose;
  seed?: number;
  lit?: number; // 0..1 cahaya lampu meja (sosok "berhasil")
  dim?: number; // 0..1 meredupkan seluruh figur (latar jauh)
  screen?: 'ai' | 'zero' | 'blank';
  badge?: number; // 0..1 tile AI melayang di atas laptop
  style?: React.CSSProperties;
}> = ({w, pose = 'type', seed = 0, lit = 0, dim = 0, screen = 'blank', badge = 0, style}) => {
  const fr = useCurrentFrame();
  const id = useId().replace(/:/g, '');
  const t = fr + seed * 7;
  // mengetik: tangan naik-turun kecil, berselang-seling, sedikit napas di badan
  const tapA = pose === 'type' ? Math.max(0, Math.sin(t * 0.9)) * 5 : 0;
  const tapB = pose === 'type' ? Math.max(0, Math.sin(t * 0.9 + 2.1)) * 5 : 0;
  const breath = Math.sin(t * 0.12) * 1.5;
  const slump = pose === 'slump' ? 1 : 0;
  const sh: [number, number] = [P.shoulder[0] - slump * 6, P.shoulder[1] + breath + slump * 22];
  const hd: [number, number] = [P.head[0] + slump * 26, P.head[1] + breath + slump * 50];
  const elbow: [number, number] = [sh[0] + 58 - slump * 10, sh[1] + 66];
  const handA: [number, number] = [elbow[0] + 68 - slump * 18, elbow[1] - 6 - tapA + slump * 8];
  const handB: [number, number] = [elbow[0] + 60 - slump * 18, elbow[1] - 2 - tapB + slump * 8];
  const body = `url(#b${id})`;
  const bodyBack = `url(#bb${id})`;
  const glow = screen === 'blank' ? 0.25 : 0.9;
  const limb = (a: number[], b: number[], wdt: number, fill: string) => (
    <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={fill} strokeWidth={wdt} strokeLinecap="round" />
  );
  return (
    <div style={{width: w, height: w, position: 'relative', filter: dim > 0 ? `brightness(${1 - dim * 0.75})` : undefined, ...style}}>
      <svg viewBox="0 0 600 600" width={w} height={w} style={{overflow: 'visible'}}>
        <defs>
          <linearGradient id={`b${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F5F5F7" />
            <stop offset="1" stopColor="#B9BFCC" />
          </linearGradient>
          <linearGradient id={`bb${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#B7BDCA" />
            <stop offset="1" stopColor="#7F8796" />
          </linearGradient>
          <radialGradient id={`h${id}`} cx="0.38" cy="0.32" r="0.75">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="0.6" stopColor="#DADDE4" />
            <stop offset="1" stopColor="#A3AAB8" />
          </radialGradient>
          <linearGradient id={`d${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3A3F4B" />
            <stop offset="1" stopColor="#262A33" />
          </linearGradient>
          <linearGradient id={`s${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={screen === 'zero' ? '#F5F5F7' : '#E8EEF8'} stopOpacity={glow} />
            <stop offset="1" stopColor={screen === 'zero' ? '#C9CDD6' : '#9AACC9'} stopOpacity={glow} />
          </linearGradient>
          <radialGradient id={`l${id}`} cx="0.5" cy="0" r="1">
            <stop offset="0" stopColor="#FFE7C2" stopOpacity={0.55 * lit} />
            <stop offset="0.7" stopColor="#FFD9A0" stopOpacity={0.08 * lit} />
            <stop offset="1" stopColor="#FFD9A0" stopOpacity={0} />
          </radialGradient>
          <filter id={`bl${id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          <radialGradient id={`sh${id}`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#000" stopOpacity="0.5" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* kerucut cahaya lampu */}
        {lit > 0 ? (
          <g filter={`url(#bl${id})`}>
            <path d="M 488 118 L 300 520 L 700 520 Z" fill={`url(#l${id})`} />
            <ellipse cx="470" cy="304" rx="150" ry="18" fill="#FFE2B0" opacity={0.22 * lit} />
          </g>
        ) : null}
        {/* bayangan kontak */}
        <ellipse cx="380" cy="522" rx="230" ry="16" fill={`url(#sh${id})`} />
        {/* kursi */}
        <rect x="186" y="358" width="96" height="16" rx="8" fill={`url(#d${id})`} />
        <rect x="226" y="372" width="10" height="140" rx="5" fill="#22262E" />
        <rect x="196" y="508" width="70" height="8" rx="4" fill="#22262E" />
        {/* kaki & lengan belakang (lebih gelap = kedalaman) */}
        {limb(P.hip, [P.knee[0] - 6, P.knee[1] + 4], 30, bodyBack)}
        {limb([P.knee[0] - 6, P.knee[1] + 4], [P.foot[0] - 12, P.foot[1]], 26, bodyBack)}
        {limb([sh[0] + 4, sh[1] + 6], [elbow[0] - 4, elbow[1] + 4], 22, bodyBack)}
        {limb([elbow[0] - 4, elbow[1] + 4], handB, 20, bodyBack)}
        {/* meja */}
        <path d="M 300 300 L 560 300 L 548 314 L 288 314 Z" fill="#4A505D" />
        <rect x="288" y="314" width="260" height="12" rx="3" fill={`url(#d${id})`} />
        <rect x="514" y="326" width="12" height="190" rx="4" fill="#22262E" />
        <rect x="310" y="326" width="12" height="190" rx="4" fill="#2A2E37" />
        {/* lampu meja */}
        <rect x="528" y="292" width="34" height="8" rx="4" fill="#3A3F4B" />
        <line x1="545" y1="292" x2="526" y2="168" stroke="#3A3F4B" strokeWidth="7" strokeLinecap="round" />
        <line x1="526" y1="168" x2="488" y2="120" stroke="#3A3F4B" strokeWidth="7" strokeLinecap="round" />
        <path d="M 470 106 L 506 104 L 512 128 L 466 132 Z" fill="#4A505D" />
        {lit > 0 ? <ellipse cx="489" cy="131" rx="20" ry="5" fill="#FFF1D6" opacity={lit} /> : null}
        {/* laptop: alas + layar menghadap kamera sedikit */}
        <path d="M 360 298 L 470 298 L 476 304 L 356 304 Z" fill="#9AA1AE" />
        <path d="M 468 300 L 492 186 L 512 190 L 488 302 Z" fill="#7B8291" />
        <path d="M 472 296 L 494 192 L 552 206 L 528 306 Z" fill={`url(#s${id})`} opacity={0.95} />
        {screen === 'zero' ? (
          <text x="506" y="262" fontFamily="Inter" fontWeight={700} fontSize="34" fill="#101216" transform="skewY(12) translate(-52,-100)">
            0
          </text>
        ) : null}
        {/* badan */}
        {limb(P.hip, sh, 46, body)}
        {limb(P.hip, P.knee, 32, body)}
        {limb(P.knee, P.foot, 28, body)}
        <ellipse cx={P.foot[0] + 14} cy={P.foot[1]} rx="24" ry="9" fill="#C9CED8" />
        {/* lengan depan */}
        {limb(sh, elbow, 24, body)}
        {limb(elbow, handA, 22, body)}
        {/* kepala */}
        <circle cx={hd[0]} cy={hd[1]} r="36" fill={`url(#h${id})`} />
      </svg>
      {badge > 0 ? (
        <div style={{position: 'absolute', left: (510 / 600) * w, top: (128 / 600) * w, transform: `translate(-50%,-50%) scale(${0.7 + 0.3 * badge})`, opacity: badge, display: 'flex', gap: w * 0.012}}>
          <AppTile app="chatgptLight" size={w * 0.075} />
          <AppTile app="claude" size={w * 0.075} />
          <AppTile app="gemini" size={w * 0.075} />
        </div>
      ) : null}
    </div>
  );
};

/** Lantai panggung gelap dengan gradien halus dan satu sumber ultramarine di tepi (D-030). */
export const Floor: React.FC<{w: number; h: number}> = ({w, h}) => (
  <div
    style={{
      width: w,
      height: h,
      background:
        'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(18,44,235,0.10), rgba(18,44,235,0) 70%), linear-gradient(180deg, #101216 0%, #14171D 55%, #191C23 100%)',
    }}
  />
);
