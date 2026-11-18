import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {WARNA_CLAWD as C} from './ui-asli/claude/warna';

export type ClawdProps = {
  pose: 'depan' | 'samping' | 'belakang';
  emosi: 'netral' | 'senang' | 'kaget';
  /** Pengali ukuran; skala 1 = 12 px per satuan rig pinjaman. */
  skala: number;
  pegangPlayhead?: boolean;
};

type Sudut = {L: number; R: number; face: {cx: number; fw: number; sides: number[]} | null; legs: [number, number][]; arms: [number, number][]};
// KarakterPixel -> KarakterX(model='claude') -> Karakter2D. Tabel dan urutan lapis rig dipertahankan.
// Rig turunan ClaudeAnimationBase, MIT, Copyright (c) 2026 John Heibel.
// Lisensi lengkap: ../papan/karakter2d/LICENSE-ClaudeAnimationBase.
const SUDUT: Record<ClawdProps['pose'], Sudut> = {
  depan: {L: -5, R: 5, face: {cx: 0, fw: 1, sides: [-1, 1]}, legs: [[-4, 0], [-2, 0], [1, 0], [3, 0]], arms: [[-4.9, -1], [4.9, 1]]},
  samping: {L: -3.1, R: 3.1, face: {cx: 1.35, fw: .55, sides: [1]}, legs: [[-2.1, 1], [1.3, 1], [-2.6, 0], [.9, 0]], arms: [[1.6, 0]]},
  belakang: {L: -5, R: 5, face: null, legs: [[-4, 0], [-2, 0], [1, 0], [3, 0]], arms: [[-4.9, -1], [4.9, 1]]},
};

// Titik genggam dalam px terhadap sudut kiri atas SVG, sebelum dikali skala.
export const CLAWD_GENGGAM = {x: (8.1 + 9) * 12, y: (-4.5 + 9) * 12};

export const Clawd: React.FC<ClawdProps> = ({pose, emosi, skala, pegangPlayhead = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const v = SUDUT[pose];
  const kedip = frame % Math.round(fps * 3.7) >= Math.round(fps * 3.7) - 3;
  return <svg data-clawd-pose={pose} data-clawd-emosi={emosi} width={216 * skala} height={120 * skala} viewBox="-9 -9 18 10" role="img" aria-label={`Clawd ${pose}, ${emosi}`} style={{display: 'block', overflow: 'visible'}}>
    <g fill={C.badan} shapeRendering="crispEdges">
      {v.arms.map(([x, arah], i) => pegangPlayhead && i === v.arms.length - 1
        ? <g key={i} data-clawd-grip><rect x={x} y={-5} width={8.1 - x} height={1}/><rect x={7.6} y={-5.35} width={1} height={1.7}/></g>
        : <g key={i} transform={`translate(${x} -4.5) rotate(${-arah * 8})`}><rect x={arah < 0 ? -2.2 : 0} y={-.5} width={2.2} height={1}/></g>)}
      {v.legs.filter(([, jauh]) => jauh).map(([x], i) => <rect key={`jauh-${i}`} x={x} y={-2.1} width={1} height={2.25} fill={C.kakiJauh}/>)}
      {v.legs.filter(([, jauh]) => !jauh).map(([x], i) => <rect key={`dekat-${i}`} x={x} y={-2.1} width={1} height={2.25}/>)}
      <rect x={v.L} y={-8} width={v.R - v.L} height={6}/>
    </g>
    {v.face && <g fill={C.mata} shapeRendering="crispEdges">{v.face.sides.map((s) => {
      const {cx, fw} = v.face!;
      const x = cx + s * 2.5 * fw;
      if (emosi === 'senang' && !kedip) return <g key={s}>{[[-1, 1], [0, 0], [1, 1]].map(([dx, dy], i) => <rect key={i} x={x + dx * fw * .5 - fw * .25} y={-6.8 + dy * .5} width={fw * .5} height={.5}/>)}</g>;
      const h = kedip ? .28 : emosi === 'kaget' ? 2.5 : 2;
      const w = fw * (emosi === 'kaget' ? 1.25 : 1);
      return <rect key={s} x={x - w / 2} y={-6 - h / 2} width={w} height={h}/>;
    })}</g>}
  </svg>;
};
