import React from 'react';
import {IkonPremiere} from './ikon';
import {timecodePremiere} from './Timeline';
import {PP} from './warna';

export const Monitor: React.FC<{jenis: 'Program' | 'Source'; isi?: React.ReactNode; waktu: number; y: number}> = ({jenis, isi, waktu, y}) => <svg x="1354" y={y} width="500" height="493" viewBox="0 0 500 493">
  <rect width="500" height="493" fill={PP.panel}/>
  <text x="15" y="22" fontSize="13">{jenis}: {jenis === 'Program' ? 'Konten Utama' : isi == null ? '(no clips)' : 'referensi_01.mp4'}</text>
  {jenis === 'Program' && <text x="295" y="22" fontSize="12" fill={PP.redup}>Effect Controls</text>}
  <path d="M15 29h193" stroke={PP.teks} strokeWidth=".8"/>
  <rect x="15" y="41" width="468" height="347" fill={PP.hitam}/>
  <foreignObject x="15" y="41" width="468" height="347">
    <div style={{position: 'relative', width: 468, height: 347, overflow: 'hidden'}}>{isi}</div>
  </foreignObject>
  <text x="15" y="409" fontSize="14" fill={PP.biru} fontVariant="tabular-nums">{timecodePremiere(waktu)}</text>
  <text x="147" y="409" fontSize="12" fill={PP.redup}>Fit</text><path d="m166 402 4 4 4-4" fill="none" stroke={PP.redup}/>
  <text x="292" y="409" fontSize="12" fill={PP.redup}>1/2</text><path d="m319 402 4 4 4-4" fill="none" stroke={PP.redup}/>
  <IkonPremiere nama="wrench" x={346} y={397} ukuran={15}/>
  <text x="378" y="409" fontSize="13" fill={PP.redup}>00:00:24:00</text>
  <rect x="17" y="425" width="464" height="14" fill={PP.panelDalam}/>
  {Array.from({length: 39}, (_, i) => <path key={i} d={`M${24 + i * 11.6} 425v${i % 5 ? 5 : 9}`} stroke={PP.nonaktif} strokeWidth=".6"/>)}
  <path d={`M${24 + Math.min(24, Math.max(0, waktu)) / 24 * 448} 425v12`} stroke={PP.biru} strokeWidth="3"/>
  <path d="M25 447h446" stroke={PP.nonaktif} strokeWidth=".7"/>
  <circle cx="25" cy="447" r="3.4" fill={PP.panel} stroke={PP.redup}/>
  <circle cx="471" cy="447" r="3.4" fill={PP.panel} stroke={PP.redup}/>
  {(['in', 'out', 'prev', 'play', 'next', 'loop', 'audio', 'export', 'plus'] as const).map((nama, i) => <IkonPremiere key={nama} nama={nama} x={73 + i * 39} y={463} ukuran={16} warna={nama === 'play' ? PP.teks : PP.redup}/>)}
</svg>;
