// BubbleSapa.tsx — bubble chat pixel tokoh yang memperkenalkan diri (D-401). Sekeluarga tokoh pixel: badan putih, garis tepi tinta bertangga, ekor tangga 4 anak,
// bayangan lembut di bawah. Pop 4 f (0,6 -> 1,06 -> 1,0), tanpa pudar. Mengecil ke 0,9 saat bubble berikut muncul; keluar pop-out 4 f ke arah ekor.
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {CURVE, move} from '../../lib/curves';
import {Fonts} from './Fonts';
import {FONT} from './tema';

export type Seg = {t: string; warna?: string};
export type BubbleProps = {
  /** baris teks, tiap baris = potongan berwarna */
  baris: Seg[][];
  /** sisi ekor: kiri = ekor di tepi kiri bubble (bubble di KANAN tokoh); kanan = tepi kanan; bawah = ekor di bawah dekat sudut kanan (bubble di KIRI-ATAS tokoh) */
  ekor: 'kiri' | 'kanan' | 'bawah';
  bw: number; bh: number; size: number; w: number; h: number; durasi: number;
  /** skala seluruh bubble (huruf, tepi, ekor ikut); w/h = ukuran lapisan SETELAH skala, bw/bh/size = ukuran dasar */
  k?: number;
  /** detik relatif: mengecil ke 0,9 (bubble berikut muncul) dan mulai pop-out */
  kecilAt?: number; keluarAt?: number;
  v?: number;
};
export const BM = 56;          // margin kotak lapisan (bayangan)
export const EKOR = 48;        // panjang ekor
const INK = '#1F2328', S = 12;

/** posisi ujung ekor di koordinat lapisan */
export const ujungEkor = (p: Pick<BubbleProps, 'ekor' | 'bw' | 'bh'>): [number, number] =>
  p.ekor === 'kiri' ? [BM - EKOR + 6, BM + p.bh - 22] : p.ekor === 'kanan' ? [BM + p.bw + EKOR - 6, BM + p.bh - 22] : [BM + p.bw - 96 + 42, BM + p.bh + EKOR];

const rects = (p: BubbleProps): [number, number, number, number][] => {
  const {bw, bh} = p, r: [number, number, number, number][] = [[12, 0, bw - 24, bh], [6, 6, bw - 12, bh - 12], [0, 12, bw, bh - 24]];
  const yb = bh - 28;
  if (p.ekor === 'kiri') for (let k = 0; k < 4; k++) r.push([-S * (k + 1), yb - 12 * (3 - k) - 0, S * (k + 1) + 6, 12 * (3 - k) + 12 + 0]);
  else if (p.ekor === 'kanan') for (let k = 0; k < 4; k++) r.push([bw - 6, yb - 12 * (3 - k), S * (k + 1) + 6, 12 * (3 - k) + 12]);
  else { const x0 = bw - 96; for (let k = 0; k < 4; k++) r.push([x0 + 12 * k, bh - 6, 48 - 12 * k, 6 + 12 * (k + 1)]); }
  return r;
};

export const BubbleSapa: React.FC<BubbleProps> = (p) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  // pop 4 f
  const a = Math.min(f, 4);
  const sPop = a < 2 ? 0.6 + 0.46 * CURVE.land(a / 2) : 1.06 - 0.06 * CURVE.drift((a - 2) / 2);
  const pk = Math.sin(Math.PI * a / 4);
  const kecil = p.kecilAt !== undefined ? move(f, Math.round(p.kecilAt * fps), 4, 'land') : 0;
  const out = p.keluarAt !== undefined ? CURVE.leave(Math.min(1, Math.max(0, (f - Math.round(p.keluarAt * fps) + 1) / 5))) : 0;      // pop-out: 4 frame terlihat sebelum frame akhir lapisan (tidak tampil)
  const s = sPop * (1 - 0.1 * kecil) * (1 - out);
  const k = p.k ?? 1;
  const [tx, ty] = ujungEkor(p);
  const bx = BM + (p.ekor === 'kiri' ? 0 : 0), by = BM;
  const R = rects(p);
  const pad = 28;
  return <AbsoluteFill style={{background: 'transparent'}}><Fonts/>
    <div style={{position: 'absolute', left: 0, top: 0, width: p.w, height: p.h, transformOrigin: `${tx * k}px ${ty * k}px`,
      transform: `scale(${s * (1 + 0.06 * pk)}, ${s * (1 - 0.06 * pk)})`, opacity: s > 0.01 ? 1 : 0, filter: `drop-shadow(0 ${10 * k}px ${20 * k}px rgba(0,0,0,.25))`}}>
     <div style={{position: 'absolute', left: 0, top: 0, width: p.w / k, height: p.h / k, transformOrigin: '0 0', transform: `scale(${k})`}}>
      <svg width={p.w / k} height={p.h / k} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} shapeRendering="crispEdges">
        <g transform={`translate(${bx} ${by})`}>
          {R.map(([x, y, w, h], i) => <rect key={`i${i}`} x={x - 4} y={y - 4} width={w + 8} height={h + 8} fill={INK}/>)}
          {R.map(([x, y, w, h], i) => <rect key={`w${i}`} x={x} y={y} width={w} height={h} fill="#FFFFFF"/>)}
        </g>
      </svg>
      <div style={{position: 'absolute', left: bx, top: by, width: p.bw, height: p.bh, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: FONT.poppins, fontWeight: 700, fontSize: p.size, lineHeight: 1.18, color: INK, letterSpacing: '-0.01em', whiteSpace: 'pre', padding: `0 ${pad}px`}}>
        {p.baris.map((row, i) => <div key={i}>{row.map((g, j) => <span key={j} style={{color: g.warna ?? INK}}>{g.t}</span>)}</div>)}
      </div>
     </div>
    </div>
  </AbsoluteFill>;
};
