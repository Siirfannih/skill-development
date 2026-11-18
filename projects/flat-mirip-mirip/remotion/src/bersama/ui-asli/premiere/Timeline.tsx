import React, {useId} from 'react';
import {IkonPremiere} from './ikon';
import {PP} from './warna';

export type KlipPremiere = {track: string; mulai: number; durasi: number; label: string};
const TRACK = [...Array.from({length: 11}, (_, i) => `V${11 - i}`), ...Array.from({length: 18}, (_, i) => `A${i + 1}`)];
const X_ISI = 236;
const LEBAR_ISI = 836;
const ATAS_TRACK = 92;
const TINGGI_TRACK = 27;
const DETIK_TAMPIL = 24;
const posisiWaktu = (detik: number) => X_ISI + detik / DETIK_TAMPIL * LEBAR_ISI;

export const timecodePremiere = (detik: number) => {
  const f = Math.max(0, Math.floor(detik * 30 + .00001));
  return [Math.floor(f / 108000), Math.floor(f / 1800) % 60, Math.floor(f / 30) % 60, f % 30].map((n) => String(n).padStart(2, '0')).join(':');
};

const Gelombang: React.FC<{lebar: number; seed: number}> = ({lebar, seed}) => {
  let garis = '';
  for (let x = 1; x < lebar; x += 2.6) {
    const envelope = .3 + .7 * Math.abs(Math.sin(x * .013 + seed));
    const amp = (.7 + 5.5 * Math.abs(Math.sin(x * .31 + seed) * Math.cos(x * .17 + seed * .9))) * envelope;
    garis += `M${x.toFixed(2)} ${(16 - amp).toFixed(2)}v${(amp * 2).toFixed(2)}`;
  }
  return <path d={garis} fill="none" stroke={PP.gelombang} strokeWidth=".9"/>;
};

const PotonganKlip: React.FC<{data: KlipPremiere; dipilih: boolean}> = ({data, dipilih}) => {
  const index = TRACK.indexOf(data.track);
  if (index < 0 || data.durasi <= 0) return null;
  const audio = data.track.startsWith('A');
  const x = posisiWaktu(data.mulai);
  const y = ATAS_TRACK + index * TINGGI_TRACK + 2;
  const lebar = data.durasi / DETIK_TAMPIL * LEBAR_ISI;
  const warna = audio ? PP.audio : data.track === 'V9' ? PP.videoTerang : data.track === 'V3' ? PP.videoUngu : PP.video;
  const seed = [...data.label].reduce((total, ch) => total + ch.charCodeAt(0), 0);
  return <svg x={x} y={y} width={lebar} height="24" viewBox={`0 0 ${lebar} 24`} overflow="hidden">
    <rect x=".5" y=".5" width={Math.max(0, lebar - 1)} height="23" fill={warna} stroke={dipilih ? PP.putih : PP.garisGelap} strokeWidth={dipilih ? 1.4 : .7}/>
    {audio && <Gelombang lebar={lebar} seed={seed}/>}
    {lebar > 27 && <>
      <rect x="4" y="4" width="8" height="8" fill={PP.labelEfek} opacity=".85"/>
      <text x="5" y="10" fontSize="6.5" fill={PP.videoTeks}>fx</text>
      <text x="17" y="11.5" fontSize="10.5" fill={audio ? PP.teks : PP.videoTeks}>{data.label}</text>
    </>}
    {audio && <path d={`M1 19h${Math.max(0, lebar - 2)}`} stroke={PP.gelombang} strokeWidth=".5"/>}
  </svg>;
};

export const Timeline: React.FC<{klip: KlipPremiere[]; playhead: number}> = ({klip, playhead}) => {
  const id = `timeline-${useId().replace(/:/g, '')}`;
  const playX = posisiWaktu(Math.max(0, Math.min(playhead, DETIK_TAMPIL)));
  return <svg x="258" y="65" width="1090" height="996" viewBox="0 0 1090 996" overflow="hidden">
    <defs><clipPath id={id}><rect x={X_ISI} y={ATAS_TRACK} width={LEBAR_ISI} height="868"/></clipPath></defs>
    <rect width="1090" height="996" fill={PP.panel}/>
    <rect x=".6" y=".6" width="1088.8" height="994.8" fill="none" stroke={PP.batasAktif} strokeWidth="1.2"/>
    <text x="16" y="22" fontSize="13">Konten Utama</text>
    <text x="158" y="22" fontSize="12" fill={PP.redup}>Referensi</text>
    <text x="285" y="22" fontSize="12" fill={PP.redup}>Sequence 02</text>
    <path d="M16 28h111" stroke={PP.teks}/>
    <text x="17" y="54" fontSize="20" fill={PP.biru} fontVariant="tabular-nums">{timecodePremiere(playhead)}</text>
    {(['snap', 'magnet', 'link', 'wrench'] as const).map((nama, i) => <IkonPremiere key={nama} nama={nama} x={18 + i * 39} y={66} ukuran={16} warna={i < 3 ? PP.biru : PP.redup}/>)}
    <text x="190" y="78" fontSize="10.5" fill={PP.redup}>30 fps</text>
    <rect x={X_ISI} y="34" width={LEBAR_ISI} height="52" fill={PP.panelDalam}/>
    {Array.from({length: 25}, (_, i) => <g key={i}>
      <path d={`M${posisiWaktu(i)} ${i % 2 ? 66 : 60}v13`} stroke={PP.nonaktif} strokeWidth=".65"/>
      {i % 2 === 0 && i < 24 && <text x={posisiWaktu(i) + 3} y="53" fontSize="10.3" fill={PP.redup}>00:00:{String(i).padStart(2, '0')}:00</text>}
    </g>)}
    <path d={`M${X_ISI} 79h${LEBAR_ISI}`} stroke={PP.render} strokeWidth="2"/>
    {TRACK.map((track, i) => {
      const y = ATAS_TRACK + i * TINGGI_TRACK;
      const audio = track.startsWith('A');
      const cible = ['V1', 'V2', 'V3', 'A1', 'A2', 'A3'].includes(track);
      return <g key={track}>
        <rect x="36" y={y} width="1037" height={TINGGI_TRACK} fill={i % 2 ? PP.panel : PP.baris}/>
        <path d={`M36 ${y + TINGGI_TRACK - .5}h1037`} stroke={PP.garisRedup} strokeWidth=".65"/>
        {['V1', 'A1'].includes(track) && <rect x="41" y={y + 2} width="24" height="23" rx="1" fill={PP.target}/>}
        {cible && <rect x="77" y={y + 2} width="29" height="23" rx="1" fill={PP.target}/>}
        <text x="91.5" y={y + 17.3} textAnchor="middle" fontSize="12" fill={cible ? PP.teks : PP.redup}>{track}</text>
        <IkonPremiere nama="lock" x={117} y={y + 7} ukuran={12}/>
        {audio ? <>
          <text x="151" y={y + 18} fontSize="11" textAnchor="middle">M</text>
          <text x="178" y={y + 18} fontSize="11" textAnchor="middle">S</text>
          <IkonPremiere nama="audio" x={202} y={y + 7} ukuran={12}/>
        </> : <>
          <IkonPremiere nama="eye" x={145} y={y + 7} ukuran={13}/>
          <IkonPremiere nama="link" x={173} y={y + 8} ukuran={11}/>
          <IkonPremiere nama="snap" x={203} y={y + 8} ukuran={11}/>
        </>}
      </g>;
    })}
    <path d={`M${X_ISI - 1} 87v879`} stroke={PP.garisGelap}/>
    <g clipPath={`url(#${id})`}>
      {klip.map((k, i) => <PotonganKlip key={`${k.track}-${k.mulai}-${i}`} data={k} dipilih={k.track === 'V1' && playhead >= k.mulai && playhead < k.mulai + k.durasi}/>)}
      <path d={`M${playX} ${ATAS_TRACK}V963`} stroke={PP.biru} strokeWidth="1.4"/>
    </g>
    <path d={`M${playX - 6} 61h12v8l-6 7-6-7Z`} fill={PP.biru}/>
    <path d={`M${playX} 75v17`} stroke={PP.biru} strokeWidth="1.4"/>
    <rect x="3" y="91" width="30" height="872" fill={PP.panelDalam}/>
    {(['cursor', 'snap', 'razor', 'link', 'in', 'out', 'plus'] as const).map((nama, i) => <IkonPremiere key={nama} nama={nama} x={9} y={106 + i * 34} ukuran={16} warna={nama === 'razor' ? PP.biru : PP.redup}/>)}
    <path d="M37 965h1035" stroke={PP.garisGelap}/>
    <rect x="55" y="977" width="960" height="6" rx="3" fill={PP.panelDalam} stroke={PP.garis}/>
    <rect x="56" y="978" width="374" height="4" rx="2" fill={PP.nonaktif}/>
    <circle cx="56" cy="980" r="4" fill={PP.panel} stroke={PP.redup}/>
    <circle cx="430" cy="980" r="4" fill={PP.panel} stroke={PP.redup}/>
    <text x="1041" y="986" fontSize="16" fill={PP.redup}>− +</text>
  </svg>;
};
