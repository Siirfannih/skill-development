import React from 'react';
import {AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {CLAWD_GENGGAM, Clawd} from '../Clawd';
import {MEREK} from '../tema';
import {AppClaudeTerang} from './claude/AppClaudeTerang';
import {posisiPlayheadStudio, StudioRemotion, type TrackStudio} from './remotion/StudioRemotion';

// Batas cut proxy pada timeline 30 fps, dibulatkan ke frame terdekat.
const BATAS_KLIP = [0, 3.47, 6.07, 8, 9.03, 14].map((detik) => Math.round(detik * 30));
const DURASI = BATAS_KLIP[BATAS_KLIP.length - 1];
const MULAI_PREVIEW = 165;
const TRACK: TrackStudio[] = [
  ...BATAS_KLIP.slice(0, -1).map((mulai, i) => ({nama: '<Sequence>', mulai, durasi: BATAS_KLIP[i + 1] - mulai})),
  {nama: 'voice.wav', mulai: 0, durasi: DURASI, warna: 'audio'},
  {nama: 'music.mp3', mulai: 0, durasi: DURASI, warna: 'audio'},
];

const StudioDenganClawd: React.FC = () => {
  const frame = useCurrentFrame();
  const playhead = MULAI_PREVIEW + frame;
  const skala = .8;
  const preview = <OffthreadVideo src={staticFile('media/footage/jadi/jensen-v4-00-14.mp4')} trimBefore={MULAI_PREVIEW} muted style={{width: '100%', height: '100%', objectFit: 'contain'}}/>;
  return <AbsoluteFill>
    <StudioRemotion komposisi={['JensenHuang', 'JensenHuang-Vertical', 'Thumbnail', 'Intro']} aktif="JensenHuang" track={TRACK} playhead={playhead}
      preview={preview}/>
    <div data-clawd-timeline style={{position: 'absolute', left: posisiPlayheadStudio(playhead, DURASI) - CLAWD_GENGGAM.x * skala, top: 991}}><Clawd pose="depan" emosi="netral" skala={skala} pegangPlayhead/></div>
  </AbsoluteFill>;
};

export const UjiB: React.FC = () => <AbsoluteFill style={{background: MEREK.latar}}>
  <Sequence from={0} durationInFrames={60}>
    <AppClaudeTerang lampiran={{nama: 'video.mp4', jenis: 'video'}} ketik={{teks: 'Claude please help me edit this video like a professional video editor', mulai: 0, cps: 45}} kirimPada={54}/>
  </Sequence>
  <Sequence from={60} durationInFrames={60}><StudioDenganClawd/></Sequence>
</AbsoluteFill>;
