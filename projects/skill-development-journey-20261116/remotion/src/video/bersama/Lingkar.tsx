// Lingkar — wajah Irfan di dalam lingkaran dunia (B1, B3a). Video = salinan proxy wajah.mp4 (public/video/wajah-proxy.mp4).
// Masuk: wajah penuh menyusut ke lingkaran kanan bawah (heavy, 18 f) + motion blur; keluar: lingkaran tumbuh jadi wajah penuh.
import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {move} from '../../lib/curves';
import {LINGKAR} from './tema';

export type LingkarProps = {
  /** detik absolut di wajah.mp4 untuk frame 0 lapisan */
  t0: number; durasi: number;
  /** detik relatif: kapan lingkaran tumbuh kembali jadi wajah penuh (kosong = tetap lingkaran) */
  tumbuhAt?: number;
  /** tanpa menyusut di awal (mulai sebagai lingkaran) */
  langsung?: boolean;
  /** zoom kamera dasar saat lapisan mulai (dan saat berakhir) supaya tidak ada loncatan */
  z0?: number; z1?: number;
};

const MENYUSUT = 18, TUMBUH = 14;
const Isi: React.FC<LingkarProps & {fr: number}> = ({t0, tumbuhAt, langsung, fr, z0 = 1, z1 = 1}) => {
  const {fps} = useVideoConfig();
  const {cx, cy, d, fx, fy, s} = LINGKAR;
  const shrink = langsung ? 1 : move(fr, 0, MENYUSUT, 'heavy');
  const grow = tumbuhAt !== undefined ? move(fr, Math.round(tumbuhAt * fps), TUMBUH, 'heavy') : 0;
  const p = shrink * (1 - grow);                    // 0 = wajah penuh, 1 = lingkaran
  const R = Math.hypot(960, 540) * (1 - p) + (d / 2) * p;
  const zAwal = z0 + (z1 - z0) * grow;                 // zoom dasar: awal (menyusut) -> akhir (tumbuh)
  const sc = zAwal + (s - zAwal) * p;
  const ox = 960 * (1 - zAwal) * (1 - p) + (cx - fx * s) * p, oy = 540 * (1 - zAwal) * (1 - p) + (cy - fy * s) * p;
  const cxp = 960 + (cx - 960) * p, cyp = 540 + (cy - 540) * p;
  const penuh = p < 0.02;
  return <AbsoluteFill style={{background: 'transparent'}}>
    {!penuh && <div style={{position: 'absolute', left: cxp - R - 7, top: cyp - R - 7, width: 2 * R + 14, height: 2 * R + 14, borderRadius: '50%',
      background: '#FFFFFF', boxShadow: '0 28px 60px rgba(10,20,50,.34), 0 8px 16px rgba(10,20,50,.2)'}}/>}
    <div style={{position: 'absolute', inset: 0, clipPath: `circle(${R}px at ${cxp}px ${cyp}px)`}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '0 0', transform: `translate(${ox}px, ${oy}px) scale(${sc})`}}>
        <OffthreadVideo src={staticFile('video/wajah-proxy.mp4')} startFrom={Math.round(t0 * fps)} muted style={{width: 1920, height: 1080}}/>
      </div>
    </div>
  </AbsoluteFill>;
};

export const Lingkar: React.FC<LingkarProps> = (p) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const bergerak = (!p.langsung && f <= MENYUSUT + 1) || (p.tumbuhAt !== undefined && f >= Math.round(p.tumbuhAt * fps) - 1);
  return bergerak
    ? <CameraMotionBlur shutterAngle={200} samples={8}><Isi {...p} fr={f}/></CameraMotionBlur>
    : <Isi {...p} fr={f}/>;
};
