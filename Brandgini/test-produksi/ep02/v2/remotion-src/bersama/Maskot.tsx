// Port KLIK dari skill-development claude/vibedesign/engine/cast/cast.js (SVG papercut sticker), desain tidak diubah.
// Warna KLIK = nilai cast.js (komponen bersama boleh memakai literal; tema_cek hanya melaporkan).
import React from 'react';

const INK = '#141518', WHITE = '#FFFFFF';
const P = {base: '#2563EB', dark: '#163E9E', light: '#4F86F5'};

export type KlikOpt = {eyes?: 'dot' | 'wide' | 'happy' | 'line' | 'tiny' | 'dizzy' | 'squeeze'; brow?: number; look?: [number, number]; arms?: [number, number]; tilt?: number; squash?: [number, number]; flip?: boolean; sweat?: boolean};

const Rr = ({x, y, w, h, r, f}: {x: number; y: number; w: number; h: number; r: number; f: string}) => <rect x={x} y={y} width={w} height={h} rx={r} fill={f} />;
const Limb = ({px, py, w, h, ang, f}: {px: number; py: number; w: number; h: number; ang: number; f: string}) => (
  <g transform={`rotate(${ang} ${px} ${py})`}><Rr x={px - w / 2} y={py - w / 2} w={w} h={h} r={3} f={f} /></g>
);

const Eyes = ({o, pts}: {o: KlikOpt; pts: [number, number][]}) => {
  const st = o.eyes || 'dot', [dx, dy] = o.look || [0, 0];
  return <g>{pts.map(([x, y], i) => {
    const side = i === 0 ? -1 : 1, px = x + dx, py = y + dy;
    const sclera = !['happy', 'line', 'dizzy', 'squeeze'].includes(st);
    const r = st === 'wide' ? 15 : st === 'tiny' ? 12 : 13;
    return <g key={i}>
      {sclera && <ellipse cx={x} cy={y} rx={r - 2} ry={r + 1} fill={WHITE} />}
      {st === 'dot' && <ellipse cx={px} cy={py} rx={6} ry={8} fill={INK} />}
      {st === 'wide' && <><ellipse cx={px} cy={py} rx={7} ry={9.5} fill={INK} /><rect x={px + side - 1.5} y={py - 6} width={3.4} height={3.4} fill="#fff" /></>}
      {st === 'tiny' && <rect x={px - 3} y={py - 3} width={6} height={6} fill={INK} />}
      {st === 'happy' && <path d={`M${x - 10} ${y + 4} L${x} ${y - 6} L${x + 10} ${y + 4}`} fill="none" stroke={WHITE} strokeWidth={5.5} strokeLinecap="square" />}
      {st === 'line' && <rect x={x - 11} y={y - 2.5} width={22} height={5} fill={WHITE} />}
      {st === 'dizzy' && (i === 0
        ? <><circle cx={x} cy={y} r={8} fill="none" stroke={WHITE} strokeWidth={4} /><circle cx={x} cy={y} r={2.5} fill={WHITE} /></>
        : <path d={`M${x - 8} ${y - 8} L${x + 8} ${y + 8} M${x + 8} ${y - 8} L${x - 8} ${y + 8}`} stroke={WHITE} strokeWidth={4.5} strokeLinecap="square" />)}
      {o.brow != null && <g transform={`rotate(${o.brow * (i === 0 ? 1 : -1)} ${x} ${y - 22})`}><Rr x={x - 12} y={y - 25} w={24} h={6} r={0} f={WHITE} /></g>}
    </g>;
  })}</g>;
};

const body = 'M62 18 L62 196 L104 160 L132 222 L166 207 L139 148 L196 148 Z';

export const Klik: React.FC<{opt?: KlikOpt; width: number}> = ({opt = {}, width}) => {
  const [aL, aR] = opt.arms || [20, 20];
  const sil = (u: boolean) => <>
    <Limb px={58} py={120} w={18} h={44} ang={aL} f={u ? P.dark : P.base} />
    <Limb px={150} py={124} w={18} h={44} ang={-aR} f={u ? P.dark : P.base} />
    <Rr x={66} y={190} w={20} h={40} r={3} f={P.dark} /><Rr x={134} y={212} w={20} h={22} r={3} f={P.dark} />
    <path d={body} fill={u ? P.dark : P.base} />
    {!u && <path d="M62 18 L196 148 L170 148 L62 44 Z" fill={P.light} />}
  </>;
  const sq = opt.squash ? `translate(120 236) scale(${opt.squash[0]} ${opt.squash[1]}) translate(-120 -236)` : '';
  const flip = opt.flip ? 'translate(240 0) scale(-1 1)' : '';
  return (
    <svg viewBox="0 0 240 260" width={width} style={{display: 'block', overflow: 'visible'}}>
      <defs>
        <filter id="cast-sticker" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
          <feMorphology in="SourceAlpha" operator="dilate" radius={5} result="d" />
          <feFlood floodColor="#FFFFFF" /><feComposite in2="d" operator="in" result="outline" />
          <feGaussianBlur in="d" stdDeviation={7} result="b" /><feOffset in="b" dy={9} result="bo" />
          <feFlood floodColor="#2A1C0E" floodOpacity={0.22} /><feComposite in2="bo" operator="in" result="sh" />
          <feMerge><feMergeNode in="sh" /><feMergeNode in="outline" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g filter="url(#cast-sticker)"><g transform={`${flip} rotate(${opt.tilt || 0} 120 200)`}><g transform={sq}>
        <g transform="translate(0 7)">{sil(true)}</g>{sil(false)}
        <Eyes o={opt} pts={[[88, 118], [118, 128]]} />
      </g></g></g>
    </svg>
  );
};
