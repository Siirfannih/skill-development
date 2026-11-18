import React from 'react';
import {AbsoluteFill, OffthreadVideo, Sequence, staticFile} from 'remotion';
import {CLAWD_GENGGAM, Clawd} from '../bersama/Clawd';
import {KataTekan} from '../bersama/KataTekan';
import {JARAK, NETRAL} from '../bersama/tema';
import {frameDariDetik} from '../bersama/waktu';
import {posisiPlayheadStudio, STUDIO, StudioRemotion, type TrackStudio} from '../bersama/ui-asli/remotion/StudioRemotion';
import {move} from '../lib/curves';
import {useAdeganW1} from './w1-waktu';

export const P02: React.FC = () => {
  const {frame, fps, width, height, durasi, kata: daftarKata, keKomposisi} = useAdeganW1('P02');
  const kata = daftarKata[0];
  const awal = frameDariDetik(kata.mulai, fps);
  const selesai = Math.min(durasi - 1, frameDariDetik(kata.selesai, fps));
  // Batas shot berasal dari proxy Jensen, bukan waktu peristiwa narasi.
  const batas = [0, 3.47, 6.07, 8, 9.03, 14].map((t) => Math.round(t * fps));
  const durasiVideo = batas[batas.length - 1];
  const track: TrackStudio[] = [
    ...batas.slice(0, -1).map((mulai, i) => ({nama: '<Sequence>', mulai, durasi: batas[i + 1] - mulai})),
    {nama: 'voice.wav', mulai: 0, durasi: durasiVideo, warna: 'audio'},
    {nama: 'music.mp3', mulai: 0, durasi: durasiVideo, warna: 'audio'},
  ];
  const playheadPada = (waktu: number) => Math.round(6.5 * fps
    + (selesai - awal) * move(waktu, awal, Math.max(1, selesai - awal), 'heavy'));
  const playhead = playheadPada(frame);
  const posisiPlayhead = posisiPlayheadStudio(playhead, durasiVideo);
  const skala = 1.2;
  const zoom = 1.6 + 0.008 * move(frame, awal, Math.max(1, durasi - 1 - awal), 'drift');
  const akhirPlayhead = posisiPlayheadStudio(playheadPada(selesai), durasiVideo);
  const fokusX = (posisiPlayheadStudio(playheadPada(awal), durasiVideo) + akhirPlayhead) / 2 + JARAK.m;
  const fokusY = height * 0.545;
  const bawahPreview = STUDIO.menu + (STUDIO.panelH + STUDIO.previewW * height / width) / 2;
  const kataX = (akhirPlayhead + STUDIO.kananX) / 2;
  const kataY = (bawahPreview + STUDIO.kontrolY) / 2 + JARAK.s / 2;
  const lantaiTrack = STUDIO.timelineY + STUDIO.header + STUDIO.baris;
  // Pergeseran Sequence membuat frame media tepat sama dengan playhead, di preview tunggal maupun master.
  const preview = <Sequence from={frame - playhead} layout="none">
    <OffthreadVideo src={staticFile('media/footage/jadi/jensen-v4-00-14.mp4')} muted
      style={{width: '100%', height: '100%', objectFit: 'contain'}}/>
  </Sequence>;

  return <AbsoluteFill data-w1-p02 style={{overflow: 'hidden'}}>
    <style>{`
      [data-w1-p02] [data-w1-claude] [data-baris-kata] { color: ${NETRAL.putih} !important; }
      [data-w1-p02] [data-w1-claude] [data-kata] { clip-path: none !important; transform: none !important; }
    `}</style>
    <AbsoluteFill style={{transformOrigin: '0 0',
      transform: `translate(${width / 2 - fokusX * zoom}px, ${height / 2 - fokusY * zoom}px) scale(${zoom})`}}>
      <StudioRemotion komposisi={['JensenHuang', 'JensenHuang-Vertical', 'Thumbnail', 'Intro']}
        aktif="JensenHuang" track={track} playhead={playhead} preview={preview}/>
      <AbsoluteFill data-w1-claude style={{
        transform: `translate(${kataX - width / 2}px, ${kataY - height / 2}px) scale(0.44)`}}>
        <KataTekan kata={keKomposisi(daftarKata, durasi / fps)[0]}/>
      </AbsoluteFill>
      <div data-clawd-timeline style={{position: 'absolute',
        left: posisiPlayhead - CLAWD_GENGGAM.x * skala,
        top: lantaiTrack - (9 + 0.15) * 12 * skala}}>
        <Clawd pose="samping" emosi="netral" skala={skala} pegangPlayhead/>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>;
};
