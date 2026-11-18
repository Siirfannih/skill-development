import React from 'react';
import {IkonPremiere} from './ikon';
import {PP} from './warna';

const berkas = [
  ['01_Referensi', 0, true], ['referensi_01.mp4', 1, false], ['referensi_02.mp4', 1, false],
  ['02_B-roll', 0, true], ['jalan_01.mp4', 1, false], ['studio_01.mp4', 1, false],
  ['03_Grafis', 0, true], ['komposisi_01', 1, false], ['Adjustment Layer', 1, false],
  ['04_Audio', 0, true], ['suara.wav', 1, false], ['musik.wav', 1, false],
  ['05_Sequence', 0, true], ['Konten Utama', 1, false], ['Referensi', 1, false],
] as const;

export const ProjectPanel: React.FC = () => <g>
  <rect x="0" y="65" width="254" height="539" fill={PP.panel}/>
  <text x="14" y="87" fontSize="14">Project: Konten</text>
  <text x="143" y="87" fontSize="13" fill={PP.redup}>Effects</text>
  <path d="M14 94h109" stroke={PP.teks}/>
  <text x="14" y="112" fontSize="11.5" fill={PP.redup}>KONTEN / Media</text>
  <rect x="13" y="122" width="225" height="25" rx="2" fill={PP.panelDalam}/>
  <IkonPremiere nama="search" x={20} y={127} ukuran={14}/>
  <text x="38" y="141" fontSize="12" fill={PP.nonaktif}>Search</text>
  <text x="32" y="170" fontSize="12">Name</text><path d="m65 163 4 4 4-4" fill="none" stroke={PP.redup}/>
  <path d="M9 179h234" stroke={PP.garis}/>
  {berkas.map(([label, depth, bin], i) => <g key={label} transform={`translate(0 ${188 + i * 23.5})`}>
    <rect x="15" y="1" width="10" height="12" fill={bin ? PP.videoUngu : i > 9 && i < 12 ? PP.audio : PP.videoTerang}/>
    {bin && <path d={`m${37 + depth * 13} 4 5 4-5 4Z`} fill={PP.redup}/>} 
    <IkonPremiere nama={bin ? 'bin' : 'file'} x={47 + depth * 15} y={1} ukuran={14}/>
    <text x={67 + depth * 15} y="12" fontSize="12">{label}</text>
  </g>)}
  <text x="15" y="577" fontSize="11.5" fill={PP.redup}>15 items</text>
  {(['list', 'grid', 'search', 'bin', 'file', 'trash'] as const).map((nama, i) => <IkonPremiere key={nama} nama={nama} x={14 + i * 38} y={585} ukuran={14}/>)}
  <rect x="0" y="610" width="254" height="451" fill={PP.panel}/>
  <text x="14" y="635" fontSize="14">Bins: SCENES</text>
  <text x="14" y="665" fontSize="11.5" fill={PP.redup}>KONTEN / SCENES / Toutes</text>
  <rect x="13" y="678" width="225" height="25" rx="2" fill={PP.panelDalam}/>
  <IkonPremiere nama="search" x={20} y={683} ukuran={14}/>
  <text x="32" y="727" fontSize="12">Name</text>
  {['Shot 01', 'Shot 02', 'B-roll', 'Intros', 'Selects', 'Audio', 'Versions', 'Sequences', 'Archive'].map((s, i) => <g key={s} transform={`translate(0 ${742 + i * 27})`}>
    <rect x="15" y="1" width="10" height="12" fill={i % 3 === 0 ? PP.labelEfek : PP.target}/>
    <path d="m38 4 5 4-5 4Z" fill={PP.redup}/>
    <IkonPremiere nama="bin" x={51} y={1} ukuran={14}/><text x="72" y="12" fontSize="12">{s}</text>
  </g>)}
  {(['list', 'grid', 'bin', 'file', 'trash'] as const).map((nama, i) => <IkonPremiere key={nama} nama={nama} x={16 + i * 46} y={1031} ukuran={14}/>)}
</g>;
