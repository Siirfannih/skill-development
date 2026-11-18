import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {CURVE, move} from '../../lib/curves';
import {Fonts} from './Fonts';
import {FONT, MEREK, NETRAL, RADIUS} from './tema';

export type Seg = {t: string; warna?: string};
export type BubbleProps = {
  baris: Seg[][];
  ekor: 'kiri' | 'kanan' | 'bawah';
  bw: number; bh: number; size: number; w: number; h: number; durasi: number;
  k?: number; kecilAt?: number; keluarAt?: number; mengetik?: boolean; v?: number;
};
export const BM = 56;
export const EKOR = 48;
export const ujungEkor = (p: Pick<BubbleProps, 'ekor' | 'bw' | 'bh'>): [number, number] =>
  p.ekor === 'kiri' ? [BM - EKOR + 6, BM + p.bh - 22]
    : p.ekor === 'kanan' ? [BM + p.bw + EKOR - 6, BM + p.bh - 22]
      : [BM + p.bw - 54, BM + p.bh + EKOR];

export const BubbleSapa: React.FC<BubbleProps> = (p) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = f <= 5 ? 0.6 + 0.435 * CURVE.land(f / 5) : 1.035 - 0.035 * CURVE.land(Math.min(1, (f - 5) / 3));
  const kecil = p.kecilAt === undefined ? 0 : move(f, Math.round(p.kecilAt * fps), 5, 'land');
  const out = p.keluarAt === undefined ? 0 : move(f, Math.round(p.keluarAt * fps), 4, 'leave');
  const s = pop * (1 - 0.1 * kecil) * (1 - out);
  const k = p.k ?? 1;
  const [tx, ty] = ujungEkor(p);
  const typing = p.mengetik || p.baris.flat().map((g) => g.t).join('') === '…';
  const tail = p.ekor === 'bawah'
    ? `M${p.bw - 92} ${p.bh - 10} Q${p.bw - 78} ${p.bh + 20} ${p.bw - 54} ${p.bh + EKOR} Q${p.bw - 54} ${p.bh + 15} ${p.bw - 36} ${p.bh - 10}Z`
    : `M12 ${p.bh - 54} Q-8 ${p.bh - 24} ${-EKOR + 6} ${p.bh - 22} Q-14 ${p.bh - 12} 22 ${p.bh - 18}Z`;
  return <AbsoluteFill style={{background: 'transparent'}}><Fonts/>
    <div style={{position: 'absolute', width: p.w, height: p.h, transformOrigin: `${tx * k}px ${ty * k}px`,
      transform: `scale(${s})`, visibility: s < 0.001 ? 'hidden' : 'visible', filter: `drop-shadow(0 ${8 * k}px ${16 * k}px rgba(0,0,0,.19))`}}>
      <div style={{position: 'absolute', width: p.w / k, height: p.h / k, transformOrigin: '0 0', transform: `scale(${k})`}}>
        <svg width={p.w / k} height={p.h / k} style={{position: 'absolute', overflow: 'visible'}}>
          <g transform={`translate(${BM} ${BM})`} fill={NETRAL.putih}>
            <path d={tail} transform={p.ekor === 'kanan' ? `translate(${p.bw} 0) scale(-1 1)` : undefined}/>
            <rect width={p.bw} height={p.bh} rx={RADIUS.bubble}/>
          </g>
        </svg>
        <div style={{position: 'absolute', left: BM, top: BM, width: p.bw, height: p.bh, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', fontFamily: FONT.poppins, fontWeight: 600, fontSize: p.size,
          lineHeight: 1.15, color: NETRAL.hitam, letterSpacing: '-0.02em', whiteSpace: 'pre'}}>
          {typing ? <div aria-label="Gemini sedang mengetik" style={{display: 'flex', gap: 13}}>
            {[0, 1, 2].map((i) => {
              const wave = Math.max(0, Math.sin(f / fps * Math.PI * 2 / 1.1 - i * 0.8));
              return <div key={i} style={{width: 13, height: 13, borderRadius: '50%', background: NETRAL.hitam,
                transform: `translateY(${-6 * wave}px)`, opacity: 0.45 + 0.55 * wave}}/>;
            })}
          </div> : p.baris.map((row, i) => <div key={i}>{row.map((g, j) => <span key={j} style={{color: g.warna ? MEREK.sekunder : NETRAL.hitam}}>{g.t}</span>)}</div>)}
        </div>
      </div>
    </div>
  </AbsoluteFill>;
};
