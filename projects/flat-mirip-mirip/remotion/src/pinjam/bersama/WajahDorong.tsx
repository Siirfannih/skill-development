// WajahDorong — wajah penuh (proxy) didorong masuk atau ditarik keluar dengan motion blur: separuh "transisi khas" push-through
// (kartu 83) yang tidak bisa dikerjakan ffmpeg pada footage dasar. Dipakai di awal/akhir dunia layar penuh (B5b).
import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile, useVideoConfig} from 'remotion';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {move} from '../../lib/curves';

export const WajahDorong: React.FC<{f: number; t0: number; dari: number; ke: number; frames: number}> = ({f, t0, dari, ke, frames}) => {
  const {fps} = useVideoConfig();
  const k = move(f, 0, frames, 'heavy');
  const sc = dari + (ke - dari) * k;
  const isi = <AbsoluteFill style={{background: '#000'}}>
    <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '50% 50%', transform: `scale(${sc})`}}>
      <OffthreadVideo src={staticFile('video/wajah-proxy.mp4')} startFrom={Math.round(t0 * fps)} muted style={{width: 1920, height: 1080}}/>
    </div></AbsoluteFill>;
  return <CameraMotionBlur shutterAngle={240} samples={8}>{isi}</CameraMotionBlur>;
};
