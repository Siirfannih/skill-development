import React from 'react';
import {HURUF_PREMIERE, useHurufPremiere} from './huruf';
import {IkonPremiere} from './ikon';
import {Monitor} from './Monitor';
import {ProjectPanel} from './ProjectPanel';
import {KlipPremiere, Timeline} from './Timeline';
import {PP} from './warna';

export type PremiereProProps = {
  program: React.ReactNode;
  source?: React.ReactNode;
  klip: KlipPremiere[];
  playhead: number;
  skala?: number;
};
export type {KlipPremiere} from './Timeline';

const Menu: React.FC = () => <g>
  <rect width="1920" height="25" fill={PP.menu}/>
  <svg x="16" y="3" width="15" height="19" viewBox="0 0 20 24" fill={PP.menuTeks}>
    <path d="M14 1c.3 2-1 4-3 4.4-.4-2 1.1-4 3-4.4ZM10.1 7c2.6-1.8 6.5-1.2 7.5 1-3.8 2.1-3.7 6.1.5 8-1.3 3.1-2.9 5.5-5 5.5-1.1 0-2-1-3.5-1s-2.1 1-3.4 1C3.8 21.5.4 16.7.4 12c0-5.1 4.6-7.7 8.3-5.3Z"/>
  </svg>
  {[
    ['Premiere Pro', 51], ['File', 172], ['Edit', 214], ['Clip', 256], ['Sequence', 299], ['Markers', 388],
    ['Graphics and Titles', 467], ['View', 623], ['Window', 672], ['Help', 750],
  ].map(([s, x], i) => <text key={s} x={x} y="17" fontSize="14" fontWeight={i === 0 ? 600 : 400} fill={PP.menuTeks}>{s}</text>)}
  <IkonPremiere nama="audio" x={1696} y={6} ukuran={14} warna={PP.menuTeks}/>
  <path d="M1730 8q8-7 16 0m-13 3q5-5 10 0m-6 4h2" fill="none" stroke={PP.menuTeks} strokeWidth="1.5"/>
  <rect x="1762" y="6" width="22" height="12" rx="2" fill="none" stroke={PP.menuTeks}/>
  <rect x="1764" y="8" width="15" height="8" fill={PP.menuTeks}/>
  <text x="1875" y="17" textAnchor="end" fontSize="14" fill={PP.menuTeks}>19:51</text>
  <rect y="25" width="1920" height="37" fill={PP.appBar}/>
  {[PP.tutup, PP.kecilkan, PP.besarkan].map((warna, i) => <circle key={warna} cx={17 + i * 19} cy="43" r="5.6" fill={warna}/>)}
  <IkonPremiere nama="home" x={115} y={35} ukuran={17} warna={PP.teks}/>
  <text x="174" y="48" fontSize="14" fill={PP.redup}>Import</text>
  <text x="240" y="48" fontSize="14" fontWeight="600">Edit</text>
  <text x="287" y="48" fontSize="14" fill={PP.redup}>Export</text>
  <path d="M238 56h24" stroke={PP.teks} strokeWidth="2"/>
  <text x="960" y="47" textAnchor="middle" fontSize="13" fill={PP.redup}>Konten - Edited</text>
  <IkonPremiere nama="grid" x={1788} y={35} ukuran={17}/>
  <IkonPremiere nama="export" x={1837} y={35} ukuran={17}/>
  <IkonPremiere nama="wrench" x={1884} y={35} ukuran={17}/>
</g>;

const AudioMeter: React.FC = () => <g>
  <rect x="1859" y="65" width="61" height="996" fill={PP.panel}/>
  <rect x="1870" y="90" width="19" height="931" fill={PP.panelDalam} stroke={PP.garisGelap}/>
  <path d="M1880 90v931" stroke={PP.garisGelap}/>
  {Array.from({length: 19}, (_, i) => <g key={i}>
    <path d={`M1871 ${105 + i * 48}h17`} stroke={PP.garis} strokeWidth=".7"/>
    <text x="1894" y={109 + i * 48} fontSize="9.5" fill={PP.redup}>{i === 0 ? '0' : `−${i * 3}`}</text>
  </g>)}
  <rect x="1872" y="943" width="6" height="76" fill={PP.meter}/>
  <rect x="1882" y="963" width="5" height="56" fill={PP.meter}/>
  <text x="1879" y="1045" textAnchor="middle" fontSize="10" fill={PP.redup}>L R</text>
</g>;

export const PremierePro: React.FC<PremiereProProps> = ({program, source, klip, playhead, skala = 1}) => {
  useHurufPremiere();
  return <svg width={1920 * skala} height={1080 * skala} viewBox="0 0 1920 1080" fill={PP.teks} fontFamily={HURUF_PREMIERE} style={{display: 'block', background: PP.latar}} role="img" aria-label="Rekonstruksi Premiere Pro, workspace Edit dengan dua monitor dan timeline">
    <rect width="1920" height="1080" fill={PP.latar}/>
    <Menu/>
    <ProjectPanel/>
    <Timeline klip={klip} playhead={playhead}/>
    <Monitor jenis="Program" isi={program} waktu={playhead} y={65}/>
    <Monitor jenis="Source" isi={source} waktu={9.5} y={568}/>
    <AudioMeter/>
    <rect y="1065" width="1920" height="15" fill={PP.bidang}/>
    <text x="14" y="1076" fontSize="10.5" fill={PP.redup}>All media present</text>
  </svg>;
};
