import React from 'react';
import {AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Kanvas} from '../bersama/Kanvas';
import {JARAK, NETRAL, RADIUS} from '../bersama/tema';
import {PremierePro, type KlipPremiere} from '../bersama/ui-asli/premiere/PremierePro';
import {move} from '../lib/curves';
import {KartuArsipW4} from './w4-footage';
import {rencanaW4} from './w4-shots';
import {KataW4, useWaktuW4} from './w4-waktu';

const EditorP07: React.FC<{onset: number[]; durasi: number}> = ({onset, durasi}) => {
  const frame = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();
  const aktif = onset.filter((f) => frame >= f);
  const awalProgram = 4.7;
  const potong = aktif.map((f) => awalProgram + f / fps);
  const batas = [0, ...potong, 14];
  const klip: KlipPremiere[] = batas.slice(0, -1).map((mulai, n) => ({
    track: 'V1', mulai, durasi: batas[n + 1] - mulai, label: 'jensen-v4.mp4',
  }));
  klip.push({track: 'A1', mulai: 0, durasi: 14, label: 'jensen-v4.mp4 [A]'});
  const playhead = awalProgram + frame / fps;
  const video = (sumber: number) => <OffthreadVideo muted src={staticFile('media/footage/jadi/jensen-v4-00-14.mp4')}
    startFrom={Math.round(sumber * fps)} style={{width: '100%', height: '100%', objectFit: 'contain'}}/>;
  const skala = height * 0.76 / 1080;
  const push = 1 + 0.015 * move(frame, 0, Math.max(1, durasi - 1), 'drift');
  const posisiPotong = 258 + 236 + (potong.slice(-1)[0] ?? awalProgram) / 24 * 836;
  return <AbsoluteFill>
    <div data-w4-premiere style={{position: 'absolute', left: (width - 1920 * skala) / 2, top: JARAK.l,
      transform: `scale(${push})`, transformOrigin: '50% 50%'}}>
      <PremierePro skala={skala} source={video(6.1)} program={video(awalProgram)} klip={klip} playhead={playhead}/>
      <svg viewBox="0 0 1920 1080" width={1920 * skala} height={1080 * skala} style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
        <path d="M0 0v24l6-6 5 10 5-3-5-10 9-1Z" fill={NETRAL.putih} stroke={NETRAL.tinta} strokeWidth="1.5"
          transform={`translate(${posisiPotong + 5}, ${65 + 92 + 10 * 27 + 10})`}/>
      </svg>
    </div>
  </AbsoluteFill>;
};

export const P07: React.FC = () => {
  const {frame, fps, kata, pada, durasi, kelompok, aktif} = useWaktuW4('P07');
  const {height} = useVideoConfig();
  const awalEditor = pada(11);
  const tinggiFoto = height * 0.5;
  const atasFoto = JARAK.aman + RADIUS.kartu;
  return <Kanvas>
    {frame < awalEditor ? <>
      <AbsoluteFill style={{height: atasFoto + tinggiFoto + JARAK.l, overflow: 'hidden'}}>
        {rencanaW4('P07', fps).map((shot, n) => <Sequence key={`${shot.id}-${n}`} from={shot.from} durationInFrames={shot.to - shot.from} premountFor={fps}>
          <KartuArsipW4 shot={shot} tinggi={tinggiFoto} atas={atasFoto} miring={n % 2 ? 2.5 : -3} umur={frame - shot.from}/>
        </Sequence>)}
      </AbsoluteFill>
      <KataW4 kata={kelompok(aktif)} y={(atasFoto + tinggiFoto + JARAK.l * 2) / height}/>
    </> : <>
      <Sequence from={awalEditor} durationInFrames={durasi - awalEditor} premountFor={fps}>
        <EditorP07 onset={kata.slice(11).map((_, n) => pada(n + 11) - awalEditor)} durasi={durasi - awalEditor}/>
      </Sequence>
      <KataW4 kata={kelompok(aktif)} y={(height - JARAK.aman - JARAK.s) / height}/>
    </>}
  </Kanvas>;
};
