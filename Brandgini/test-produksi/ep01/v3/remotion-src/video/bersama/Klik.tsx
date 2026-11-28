// Klik.tsx · port setia KLIK dari skill-development claude/vibedesign/engine/cast/cast.js (papercut sticker, SVG deterministik).
// Desain tidak diubah: badan/anggota/mata/filter sama dengan cast.js; opsi eyes/brow/arms/tilt/squash/look jadi props.
// Literal warna diizinkan di bersama/ (warna KLIK = milik karakter, MASKOT.json).
import React from 'react';

export type KlikProps = {
  lebar: number;
  eyes?: 'dot' | 'wide' | 'happy' | 'line' | 'squeeze' | 'tiny';
  brow?: number;
  look?: [number, number];
  arms?: [number, number];
  tilt?: number;
  squash?: [number, number];
  flip?: boolean;
  sweat?: boolean;
};

const INK = '#141518';
const WHITE = '#FFFFFF';
const P = { base: '#2563EB', dark: '#163E9E', light: '#4F86F5' };

const Rr = (x: number, y: number, w: number, h: number, r: number, f: string, k?: string) => (
  <rect key={k} x={x} y={y} width={w} height={h} rx={r} fill={f} />
);
const Limb = (px: number, py: number, w: number, h: number, ang: number, f: string, k: string) => (
  <g key={k} transform={`rotate(${ang} ${px} ${py})`}>{Rr(px - w / 2, py - w / 2, w, h, 3, f)}</g>
);

const Mata: React.FC<{ o: KlikProps; pts: [number, number][] }> = ({ o, pts }) => {
  const st = o.eyes ?? 'dot';
  const [dx, dy] = o.look ?? [0, 0];
  return (
    <>
      {pts.map(([x, y], i) => {
        const side = i === 0 ? -1 : 1;
        const px = x + dx, py = y + dy;
        const putih = !['happy', 'line', 'squeeze'].includes(st);
        const r = st === 'wide' ? 15 : st === 'tiny' ? 12 : 13;
        return (
          <g key={i}>
            {putih && <ellipse cx={x} cy={y} rx={r - 2} ry={r + 1} fill={WHITE} />}
            {st === 'dot' && <ellipse cx={px} cy={py} rx={6} ry={8} fill={INK} />}
            {st === 'wide' && (
              <>
                <ellipse cx={px} cy={py} rx={7} ry={9.5} fill={INK} />
                <rect x={px + side - 1.5} y={py - 6} width={3.4} height={3.4} fill="#fff" />
              </>
            )}
            {st === 'tiny' && <rect x={px - 3} y={py - 3} width={6} height={6} fill={INK} />}
            {st === 'happy' && <path d={`M${x - 10} ${y + 4} L${x} ${y - 6} L${x + 10} ${y + 4}`} fill="none" stroke={WHITE} strokeWidth={5.5} strokeLinecap="square" />}
            {st === 'line' && Rr(x - 11, y - 2.5, 22, 5, 0, WHITE)}
            {st === 'squeeze' && <path d={`M${x - 8 * side} ${y - 8} L${x + 6 * side} ${y} L${x - 8 * side} ${y + 8}`} fill="none" stroke={WHITE} strokeWidth={5} strokeLinecap="square" />}
            {o.brow != null && (
              <g transform={`rotate(${o.brow * (i === 0 ? 1 : -1)} ${x} ${y - 22})`}>{Rr(x - 12, y - 25, 24, 6, 0, WHITE)}</g>
            )}
          </g>
        );
      })}
    </>
  );
};

export const Klik: React.FC<KlikProps> = (o) => {
  const [aL, aR] = o.arms ?? [20, 20];
  const body = 'M62 18 L62 196 L104 160 L132 222 L166 207 L139 148 L196 148 Z';
  const sil = (u: boolean) => (
    <g key={u ? 'u' : 'f'}>
      {Limb(58, 120, 18, 44, aL, u ? P.dark : P.base, 'l')}
      {Limb(150, 124, 18, 44, -aR, u ? P.dark : P.base, 'r')}
      {Rr(66, 190, 20, 40, 3, P.dark, 'k1')}
      {Rr(134, 212, 20, 22, 3, P.dark, 'k2')}
      <path d={body} fill={u ? P.dark : P.base} />
      {!u && <path d="M62 18 L196 148 L170 148 L62 44 Z" fill={P.light} />}
    </g>
  );
  let inner = (
    <>
      <g transform="translate(0 7)">{sil(true)}</g>
      {sil(false)}
      <Mata o={o} pts={[[88, 118], [118, 128]]} />
    </>
  );
  if (o.squash) inner = <g transform={`translate(120 236) scale(${o.squash[0]} ${o.squash[1]}) translate(-120 -236)`}>{inner}</g>;
  const flip = o.flip ? 'translate(240 0) scale(-1 1)' : '';
  return (
    <svg viewBox="0 0 240 260" width={o.lebar} height={(o.lebar * 260) / 240} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <filter id="klik-paper" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="1.15" numOctaves="3" seed="4" result="t" />
          <feColorMatrix in="t" type="matrix" values="0 0 0 0 0.1  0 0 0 0 0.08  0 0 0 0 0.06  0 0 -0.8 0 0.36" result="g" />
          <feComposite in="g" in2="SourceAlpha" operator="in" result="gi" />
          <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="gi" /></feMerge>
        </filter>
        <filter id="klik-sticker" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
          <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="d" />
          <feFlood floodColor="#FFFFFF" /><feComposite in2="d" operator="in" result="outline" />
          <feGaussianBlur in="d" stdDeviation="7" result="b" /><feOffset in="b" dy="9" result="bo" />
          <feFlood floodColor="#2A1C0E" floodOpacity=".22" /><feComposite in2="bo" operator="in" result="sh" />
          <feMerge><feMergeNode in="sh" /><feMergeNode in="outline" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g filter="url(#klik-sticker)">
        <g filter="url(#klik-paper)">
          <g transform={`${flip} rotate(${o.tilt ?? 0} 120 200)`}>{inner}</g>
        </g>
      </g>
    </svg>
  );
};
