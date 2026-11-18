import React from 'react';
import {AbsoluteFill, Freeze, Sequence, useCurrentFrame} from 'remotion';
import {move} from '../../lib/curves';
import {DuniaRepo} from '../../pinjam/b1';
import {CLAWD_GENGGAM, Clawd} from '../Clawd';
import {MEREK} from '../tema';
import {AppClaudeTerang} from './claude/AppClaudeTerang';
import {posisiPlayheadStudio, StudioRemotion, type TrackStudio} from './remotion/StudioRemotion';

const TRACK: TrackStudio[] = [
  {nama: '<Sequence>', mulai: 0, durasi: 96},
  {nama: '<Sequence>', mulai: 12, durasi: 24},
  {nama: '<Sequence>', mulai: 42, durasi: 42},
  {nama: '<Audio>', mulai: 0, durasi: 96, warna: 'audio'},
];

const StudioDenganClawd: React.FC = () => {
  const frame = useCurrentFrame();
  const playhead = 18 + Math.round(60 * move(frame, 0, 60, 'drift'));
  const skala = .8;
  // Sequence lokal 0 menghindari penambahan offset adegan oleh Freeze 4.0.380.
  const preview = <Sequence from={0} layout="none"><Freeze frame={playhead}><DuniaRepo durasi={3.2} kunci={{lift: .5, geser: .7, tekan: 1.3, selesai: 1.76, keluar: 2.72}}/></Freeze></Sequence>;
  return <AbsoluteFill>
    <StudioRemotion komposisi={['Karakter', 'DuniaRepo', 'Slop', 'AppClaude', 'DuniaIG', 'LembarPixel']} aktif="DuniaRepo" track={TRACK} playhead={playhead}
      preview={preview}/>
    <div data-clawd-timeline style={{position: 'absolute', left: posisiPlayheadStudio(playhead, 96) - CLAWD_GENGGAM.x * skala, top: 991}}><Clawd pose="depan" emosi="netral" skala={skala} pegangPlayhead/></div>
  </AbsoluteFill>;
};

export const UjiB: React.FC = () => <AbsoluteFill style={{background: MEREK.latar}}>
  <Sequence from={0} durationInFrames={60}>
    <AppClaudeTerang lampiran={{nama: 'video.mp4', jenis: 'video'}} ketik={{teks: 'Claude please help me edit this video like a professional video editor', mulai: 0, cps: 45}} kirimPada={54}/>
  </Sequence>
  <Sequence from={60} durationInFrames={60}><StudioDenganClawd/></Sequence>
</AbsoluteFill>;
