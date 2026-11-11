import React from 'react';
import { random } from 'remotion';
import { PERSP, useCam } from './Stage';

// Flat-design characters (Irfan 11 Nov: "visualise cartoon 2d dengan konsep flat design"), same family as the
// night-scene silhouette: rounded shapes, linear fills only, idle sway so nobody is a frozen sticker.
export const C = { bg: '#F6F5F1', ink: '#282723', acc: '#1A3AD0', acc2: '#2B47FF', soft: '#DCE4FF', navy: '#0A1A4A', grey: '#C4C2BB', grey2: '#A9A7A0' };

// a world-space object anchored at its bottom-centre; perspective comes from the Stage, so far rows shrink
// naturally. It fades as it reaches the lens instead of flipping through it.
export const World: React.FC<{ x: number; y: number; z: number; w: number; h: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ x, y, z, w, h, children, style }) => {
  const cam = useCam();
  const near = PERSP - (z + cam.z);
  const op = near < 140 ? 0 : near < 620 ? (near - 140) / 480 : 1;
  if (op <= 0) return null;
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: w, height: h, transform: `translate3d(${x - w / 2}px, ${y - h}px, ${z}px)`, opacity: op * (style?.opacity as number ?? 1), ...style }}>
      {children}
    </div>
  );
};

// standing figure, 120 × 300; lit = 0..1 grey → brand blue with a white rim
export const Stand: React.FC<{ id: string; t: number; lit?: number; tone?: number }> = ({ id, t, lit = 0, tone = 0 }) => {
  const ph = random('st' + id) * 6.28;
  const sway = Math.sin(t * 1.4 + ph) * 1.6;
  const g = tone > 0.5 ? C.grey2 : C.grey;
  const mix = (a: string, b: string, k: number) => {
    const p = (s: string) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
    const A = p(a), B = p(b);
    return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(',')})`;
  };
  const top = mix(g, C.acc2, lit), bot = mix(g, C.navy, lit);
  return (
    <svg width="120" height="300" viewBox="0 0 120 300" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={'sg' + id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={top} /><stop offset="1" stopColor={bot} /></linearGradient>
      </defs>
      <ellipse cx="60" cy="296" rx="52" ry="9" fill="rgba(40,39,35,0.10)" />
      <g transform={`rotate(${sway} 60 296)`} stroke={lit > 0.05 ? `rgba(255,255,255,${lit})` : 'none'} strokeWidth={3}>
        <rect x="34" y="190" width="22" height="106" rx="11" fill={`url(#sg${id})`} />
        <rect x="64" y="190" width="22" height="106" rx="11" fill={`url(#sg${id})`} />
        <path d="M22 96 Q60 70 98 96 L104 196 Q60 210 16 196 Z" fill={`url(#sg${id})`} />
        <rect x="6" y="98" width="20" height="96" rx="10" fill={`url(#sg${id})`} transform={`rotate(${4 + Math.sin(t * 1.1 + ph) * 2} 16 100)`} />
        <rect x="94" y="98" width="20" height="96" rx="10" fill={`url(#sg${id})`} transform={`rotate(${-4 - Math.sin(t * 1.1 + ph) * 2} 104 100)`} />
        <ellipse cx="60" cy="40" rx="24" ry="27" fill={`url(#sg${id})`} />
      </g>
    </svg>
  );
};

// seated builder at a laptop, side view facing right, 260 × 230.
// on = screen light 0..1 · app = small app window popping above the laptop · post = arm raises a blue Post card · fly = paper plane leaves
export const Seat: React.FC<{ id: string; t: number; on?: number; app?: number; post?: number; fly?: number; dim?: number }> = ({ id, t, on = 0, app = 0, post = 0, fly = 0, dim = 0 }) => {
  const ph = random('se' + id) * 6.28;
  const type = on > 0.5 && post < 0.05 ? Math.sin(t * 14 + ph) * 3 : 0;
  const body = dim > 0 ? '#9C9A93' : C.navy;
  const screen = `rgba(43,71,255,${0.15 + on * 0.85 * (1 - dim * 0.8)})`;
  return (
    <svg width="260" height="230" viewBox="0 0 260 230" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={'sb' + id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={dim > 0 ? '#B2B0A9' : '#24346F'} /><stop offset="1" stopColor={body} /></linearGradient>
        <linearGradient id={'sl' + id} x1="1" y1="0" x2="0" y2="0"><stop offset="0" stopColor="#6F8DFF" stopOpacity={0.55 * on * (1 - dim)} /><stop offset="1" stopColor="#6F8DFF" stopOpacity="0" /></linearGradient>
      </defs>
      <rect x="30" y="222" width="230" height="10" rx="5" fill="rgba(40,39,35,0.09)" />
      {/* desk + stool */}
      <rect x="128" y="138" width="124" height="9" rx="4" fill="#3A3935" />
      <rect x="236" y="147" width="7" height="80" fill="#3A3935" />
      <rect x="40" y="160" width="70" height="9" rx="4" fill="#3A3935" />
      <rect x="71" y="169" width="7" height="58" fill="#3A3935" />
      {/* screen light falling on the face (linear, never radial) */}
      <polygon points="200,78 210,134 118,74 118,52" fill={`url(#sl${id})`} />
      {/* laptop: base + lid seen from the side, screen side toward the builder */}
      <rect x="156" y="131" width="68" height="7" rx="2" fill="#2E2D2A" />
      <path d="M222 134 L208 76 L214 75 L228 133 Z" fill="#2E2D2A" />
      <path d="M220 132 L207 79 L209.5 78.5 L222.5 131.5 Z" fill={screen} />
      {/* builder */}
      <g transform={`translate(0 ${Math.sin(t * 1.3 + ph) * 1.2})`}>
        <path d="M66 162 Q62 110 92 82 Q112 78 118 98 L112 162 Z" fill={`url(#sb${id})`} />
        <rect x="70" y="150" width="70" height="17" rx="8" fill={`url(#sb${id})`} />
        <rect x="118" y="160" width="16" height="64" rx="8" fill={`url(#sb${id})`} />
        <circle cx="114" cy="58" r="21" fill={`url(#sb${id})`} />
        {post < 0.02
          ? <path d={`M104 96 L150 ${126 + type} L160 ${122 + type}`} stroke={`url(#sb${id})`} strokeWidth="13" strokeLinecap="round" fill="none" />
          : <path d={`M104 96 L${110 + post * 8} ${96 - post * 52} L${114 + post * 10} ${88 - post * 92}`} stroke={`url(#sb${id})`} strokeWidth="13" strokeLinecap="round" fill="none" />}
      </g>
      {/* app window born from the screen */}
      {app > 0.01 && post < 0.05 && (
        <g transform={`translate(${176 - app * 20} ${60 - app * 70}) scale(${0.3 + app * 0.7})`} opacity={Math.min(1, app * 1.6) * (1 - dim * 0.75)}>
          <rect x="0" y="0" width="92" height="60" rx="8" fill="#FFFFFF" stroke="rgba(40,39,35,0.12)" />
          <rect x="0" y="0" width="92" height="13" rx="6" fill="#EEF1FF" />
          {[0, 1, 2].map((k) => <circle key={k} cx={9 + k * 8} cy={6.5} r={2.4} fill={['#FF5F57', '#FEBC2E', '#28C840'][k]} />)}
          <rect x="9" y="22" width={44 + random('w1' + id) * 30} height="6" rx="3" fill={C.acc} opacity={0.75} />
          <rect x="9" y="34" width={30 + random('w2' + id) * 40} height="6" rx="3" fill="#C9C7C0" />
          <rect x="9" y="46" width={20 + random('w3' + id) * 30} height="6" rx="3" fill="#C9C7C0" />
        </g>
      )}
      {/* Post card held up */}
      {post > 0.02 && (
        <g transform={`translate(${78 + post * 10} ${-30 - post * 40}) rotate(${-6 + post * 6})`} opacity={Math.min(1, post * 2)}>
          <rect x="0" y="0" width="124" height="72" rx="16" fill={C.acc} stroke="#FFFFFF" strokeWidth="3" />
          <text x="62" y="46" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={700} fontSize="30" fill="#FFFFFF">Post</text>
        </g>
      )}
      {fly > 0.01 && fly < 0.999 && (
        <g transform={`translate(${150 + fly * 260} ${-20 - fly * 300}) rotate(${-25 + fly * 10})`} opacity={1 - fly * 0.6}>
          <path d="M0 14 L34 0 L22 30 L16 19 Z" fill="#FFFFFF" stroke={C.acc} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M16 19 L34 0" stroke={C.acc} strokeWidth="2" />
        </g>
      )}
    </svg>
  );
};
