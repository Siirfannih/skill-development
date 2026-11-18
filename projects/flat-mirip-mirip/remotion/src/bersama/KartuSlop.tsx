import React from 'react';
import {random} from 'remotion';
import {NETRAL, PENGECUALIAN} from './tema';

export type BagianSlop = 'latar' | 'matahari' | 'gunung' | 'siluet' | 'teks';
export type RasioSlop = '4:5' | '9:16';
export type KartuSlopProps = {
  seed: number;
  rasio?: RasioSlop;
  bagian?: BagianSlop;
  style?: React.CSSProperties;
};

export const KartuSlop: React.FC<KartuSlopProps> = ({seed, rasio = '4:5', bagian, style}) => {
  if (!Number.isFinite(seed)) throw new Error('KartuSlop.seed harus angka finite.');
  const h = rasio === '4:5' ? 5 / 4 : 16 / 9;
  const acak = (nama: string) => random(`slop-${seed}-${nama}`);
  const tampil = (lapisan: BagianSlop) => bagian === undefined || bagian === lapisan;
  const matahari = {x: 0.48 + acak('sun-x') * 0.27, y: (0.29 + acak('sun-y') * 0.16) * h, r: 0.17 + acak('sun-r') * 0.07};
  const orang = {x: 0.34 + acak('orang-x') * 0.32, y: (0.63 + acak('orang-y') * 0.07) * h, r: 0.082 + acak('orang-r') * 0.023};
  const bahu = 0.21 + acak('bahu') * 0.07;
  const leher = orang.r * 0.45;
  const bawahLeher = orang.y + orang.r * 1.7;
  const nGunung = 2 + Math.floor(acak('jumlah-gunung') * 2);
  const nTeks = 2 + Math.floor(acak('jumlah-teks') * 2);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 1 ${h}`} role="img"
      aria-label={`Kartu AI slop ${seed}, ${rasio}${bagian ? `, lapisan ${bagian}` : ''}`}
      data-slop-seed={seed} data-slop-rasio={rasio}
      style={{display: 'block', width: '100%', aspectRatio: rasio.replace(':', ' / '), overflow: 'hidden', ...style}}>
      {tampil('latar') && <rect data-lapisan="latar" width={1} height={h} fill={PENGECUALIAN.slopKrem.warna} />}
      {tampil('matahari') && <circle data-lapisan="matahari" cx={matahari.x} cy={matahari.y} r={matahari.r}
        fill={acak('sun-warna') < 0.5 ? PENGECUALIAN.slopPeach.warna : PENGECUALIAN.slopMawar.warna} />}
      {tampil('gunung') && <g data-lapisan="gunung" fill={PENGECUALIAN.slopGunung.warna}>
        {Array.from({length: nGunung}, (_, i) => {
          const x = (i + 0.35 + acak(`puncak-x-${i}`) * 0.25) / nGunung;
          const y = (0.48 + acak(`puncak-y-${i}`) * 0.17) * h;
          const alas = 0.47 + acak(`alas-${i}`) * 0.24;
          return <path key={i} d={`M ${x - alas} ${h} L ${x - 0.035} ${y + 0.045} Q ${x} ${y} ${x + 0.035} ${y + 0.045} L ${x + alas} ${h} Z`} />;
        })}
      </g>}
      {tampil('siluet') && <g data-lapisan="siluet" fill={PENGECUALIAN.slopSiluet.warna}>
        <ellipse cx={orang.x} cy={orang.y} rx={orang.r} ry={orang.r * 1.17} />
        <path d={`M ${orang.x - leher} ${orang.y + orang.r * 0.6}
          L ${orang.x - leher} ${bawahLeher}
          Q ${orang.x - bahu} ${bawahLeher + 0.035} ${orang.x - bahu} ${bawahLeher + 0.22}
          L ${orang.x - bahu * 1.16} ${h} L ${orang.x + bahu * 1.16} ${h}
          L ${orang.x + bahu} ${bawahLeher + 0.22}
          Q ${orang.x + bahu} ${bawahLeher + 0.035} ${orang.x + leher} ${bawahLeher}
          L ${orang.x + leher} ${orang.y + orang.r * 0.6} Z`} />
      </g>}
      {tampil('teks') && <g data-lapisan="teks" fill={NETRAL.redup}>
        {Array.from({length: nTeks}, (_, i) => <rect key={i} x={0.09} y={(0.095 + i * 0.025) * h}
          width={0.22 + acak(`baris-${i}`) * 0.19} height={0.008 * h} />)}
      </g>}
    </svg>
  );
};
