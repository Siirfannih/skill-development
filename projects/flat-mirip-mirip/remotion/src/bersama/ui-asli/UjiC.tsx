import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {move} from '../../lib/curves';
import {BerandaIG} from './instagram/BerandaIG';
import {BingkaiIPhone} from './instagram/BingkaiIPhone';
import {MediaUji} from './instagram/MediaUji';
import {KlipPremiere, PremierePro} from './premiere/PremierePro';

const AKUN_UJI = ['kreatif.harian', 'studio.konten', 'ide.visual', 'ruang.kreasi', 'visual.harian', 'catatan.studio'];

const KLIP_UJI: KlipPremiere[] = [
  {track: 'V9', mulai: 0, durasi: 24, label: 'Adjustment Layer'},
  {track: 'V3', mulai: .4, durasi: 2.1, label: 'Judul'},
  {track: 'V3', mulai: 21.3, durasi: 1.4, label: 'Judul'},
  {track: 'V2', mulai: 2.6, durasi: 6.3, label: 'referensi_01.mp4'},
  {track: 'V2', mulai: 8.9, durasi: 3.9, label: 'referensi_02.mp4'},
  {track: 'V2', mulai: 12.8, durasi: 4.8, label: 'studio_01.mp4'},
  {track: 'V2', mulai: 17.6, durasi: 6.4, label: 'jalan_01.mp4'},
  {track: 'V1', mulai: .1, durasi: 2.5, label: 'Intro'},
  {track: 'V1', mulai: 2.6, durasi: 8.6, label: 'Komposisi 01'},
  {track: 'V1', mulai: 20, durasi: 3.1, label: 'Komposisi 03'},
  {track: 'A1', mulai: 3, durasi: 7.1, label: 'suara.wav'},
  {track: 'A1', mulai: 11.2, durasi: 6, label: 'suara.wav'},
  {track: 'A1', mulai: 17.5, durasi: 6, label: 'suara.wav'},
  {track: 'A2', mulai: 3, durasi: 17.5, label: 'musik.wav'},
  {track: 'A3', mulai: 0, durasi: 3, label: 'ruang.wav'},
  {track: 'A3', mulai: 8, durasi: 3, label: 'ruang.wav'},
  {track: 'A3', mulai: 16.5, durasi: 7.5, label: 'ruang.wav'},
  ...Array.from({length: 10}, (_, i) => ({track: `A${4 + i % 5}`, mulai: 4 + (i * 1.73) % 18, durasi: .65 + i % 3 * .45, label: `sfx_${String(i + 1).padStart(2, '0')}.wav`})),
  {track: 'A10', mulai: 17, durasi: 7, label: 'musik_fin.wav'},
  {track: 'A11', mulai: 17, durasi: 4.8, label: 'ambience.wav'},
  {track: 'A13', mulai: .2, durasi: 2, label: 'sfx_intro.wav'},
];

export const UjiC: React.FC = () => {
  const frame = useCurrentFrame();
  const potongan: KlipPremiere[] = frame < 64 ? [
    {track: 'V1', mulai: 11.2, durasi: 8.8, label: 'Komposisi 02'},
  ] : [
    {track: 'V1', mulai: 11.2, durasi: 4.2, label: 'Komposisi 02'},
    {track: 'V1', mulai: 15.4, durasi: 4.6, label: 'Komposisi 02'},
  ];
  if (frame >= 45) return <AbsoluteFill><PremierePro program={<MediaUji lebar={468} tinggi={347} seed={0}/>} source={<MediaUji lebar={468} tinggi={347} seed={1}/>} klip={[...KLIP_UJI, ...potongan]} playhead={14.8 + (frame - 45) / 30}/></AbsoluteFill>;
  return <AbsoluteFill style={{background: '#FFFFFF', justifyContent: 'center', alignItems: 'center'}}>
    <BingkaiIPhone skala={1.12}>
      <BerandaIG skala={1} scrollY={1600 * move(frame, 0, 44, 'leave')} unggahan={AKUN_UJI.map((akun, i) => ({akun, avatarSeed: i + 1, suka: ['1,2 rb', '864', '2,1 rb'][i % 3], caption: 'Satu ide, banyak kemungkinan. Simpan untuk inspirasi berikutnya.', media: <MediaUji seed={i}/>}))}/>
    </BingkaiIPhone>
  </AbsoluteFill>;
};
