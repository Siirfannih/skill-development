import React from 'react';
import {AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame, Img} from 'remotion';
import {move} from '../../lib/curves';
import {BerandaIG} from './instagram/BerandaIG';
import {BingkaiIPhone} from './instagram/BingkaiIPhone';
// Isi unggahan = gambar slop hasil image_gen (D-16); UI tetap SVG.
const SLOP = ['k1-01', 'k1-05', 'k2-01', 'k1-02', 'k3-03', 'k1-04'];
import {KlipPremiere, PremierePro} from './premiere/PremierePro';

const AKUN_UJI = ['kreatif.harian', 'studio.konten', 'ide.visual', 'ruang.kreasi', 'visual.harian', 'catatan.studio'];

// Batas cut yang sama dengan UjiB, dalam detik pada timeline 30 fps.
const BATAS_KLIP = [0, 3.47, 6.07, 8, 9.03, 14].map((detik) => Math.round(detik * 30) / 30);
const DURASI = BATAS_KLIP[BATAS_KLIP.length - 1];
const MULAI_PROGRAM = 15;
const KLIP_JENSEN: KlipPremiere[] = [
  ...['A001_jensen.mov', 'broll_kelulusan.mp4', 'A001_jensen.mov', 'A001_jensen_CU.mov', 'broll_arsip.mp4'].map((label, i) => ({
    track: 'V1', mulai: BATAS_KLIP[i], durasi: BATAS_KLIP[i + 1] - BATAS_KLIP[i], label,
  })),
  {track: 'A1', mulai: 0, durasi: DURASI, label: 'voice.wav'},
  {track: 'A2', mulai: 0, durasi: DURASI, label: 'music.mp3'},
];

export const UjiC: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame >= 45) return <AbsoluteFill>
    <Sequence from={45} durationInFrames={45} layout="none">
      <PremierePro
        program={<OffthreadVideo src={staticFile('media/footage/jadi/jensen-v4-00-14.mp4')} trimBefore={MULAI_PROGRAM} muted style={{width: '100%', height: '100%', objectFit: 'contain'}}/>}
        source={<OffthreadVideo src={staticFile('media/footage/F2/F2-b-mixkit-potret-pria-rumah.mp4')} muted style={{width: '100%', height: '100%', objectFit: 'contain'}}/>}
        klip={KLIP_JENSEN} playhead={(MULAI_PROGRAM + frame - 45) / 30}/>
    </Sequence>
  </AbsoluteFill>;
  return <AbsoluteFill style={{background: '#FFFFFF', justifyContent: 'center', alignItems: 'center'}}>
    <BingkaiIPhone skala={1.12}>
      <BerandaIG skala={1} scrollY={1600 * move(frame, 0, 44, 'leave')} unggahan={AKUN_UJI.map((akun, i) => ({akun, avatarSeed: i + 1, suka: ['1,2 rb', '864', '2,1 rb'][i % 3], caption: 'Satu ide, banyak kemungkinan. Simpan untuk inspirasi berikutnya.', media: <Img src={staticFile(`media/aset-slop/${SLOP[i % SLOP.length]}.png`)} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>}))}/>
    </BingkaiIPhone>
  </AbsoluteFill>;
};
