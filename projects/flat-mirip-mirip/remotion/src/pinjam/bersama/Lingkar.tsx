// Lingkar — wajah Irfan di dalam lingkaran dunia (B1, B3a). Video = salinan proxy wajah.mp4 (public/video/wajah-proxy.mp4).
// Masuk: wajah penuh menyusut ke lingkaran kanan bawah (heavy, 18 f) + motion blur; keluar: lingkaran tumbuh jadi wajah penuh.
import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {move} from '../../lib/curves';
import {LINGKAR} from './tema';
import {KarakterLayer, kotak} from './KarakterLayer';

export type LingkarProps = {
  /** detik absolut di wajah.mp4 untuk frame 0 lapisan */
  t0: number; durasi: number;
  /** detik relatif: kapan lingkaran tumbuh kembali jadi wajah penuh (kosong = tetap lingkaran) */
  tumbuhAt?: number;
  /** tanpa menyusut di awal (mulai sebagai lingkaran) */
  langsung?: boolean;
  /** zoom kamera dasar saat lapisan mulai (dan saat berakhir) supaya tidak ada loncatan */
  z0?: number; z1?: number;
  /** Clawd ikut masuk lingkaran (Irfan 17 Nov): koordinat FOOTAGE; dari bahu (x0,y0) melompat ke rambut (x1,y1) selama menyusut; tampil sampai `sampai` dtk */
  clawd?: {u: number; x0: number; y0: number; x1: number; y1: number; sampai: number; besar?: number; proud?: number};
  v?: number;
};

const MENYUSUT = 18, TUMBUH = 14;
const Isi: React.FC<LingkarProps & {fr: number}> = ({t0, tumbuhAt, langsung, fr, z0 = 1, z1 = 1, clawd: clawdProps}) => {
  const {fps} = useVideoConfig();
  const {cx, cy, d, fx, fy, s} = LINGKAR;
  const shrink = langsung ? 1 : move(fr, 0, MENYUSUT, 'heavy');
  const grow = tumbuhAt !== undefined ? move(fr, Math.round(tumbuhAt * fps), TUMBUH, 'heavy') : 0;
  const p = shrink * (1 - grow);                    // 0 = wajah penuh, 1 = lingkaran
  const R = Math.hypot(960, 540) * (1 - p) + (d / 2) * p;
  const zAwal = z0 + (z1 - z0) * grow;                 // zoom dasar: awal (menyusut) -> akhir (tumbuh)
  const cxp = 960 + (cx - 960) * p, cyp = 540 + (cy - 540) * p;
  // titik wajah (fx,fy) berjalan dari posisinya di bingkai penuh (dengan zoom dasar) ke pusat lingkaran
  const tx = (fx * zAwal + 960 * (1 - zAwal)) * (1 - p) + cx * p, ty = (fy * zAwal + 540 * (1 - zAwal)) * (1 - p) + cy * p;
  // skala minimum supaya gambar wajah SELALU menutup seluruh lingkaran di dalam bingkai (audit V5: tidak ada bidang putih di dalam masker)
  const perlu = Math.max((tx - Math.max(0, cxp - R)) / fx, (Math.min(1920, cxp + R) - tx) / (1920 - fx), (ty - Math.max(0, cyp - R)) / fy, (Math.min(1080, cyp + R) - ty) / (1080 - fy));
  const sc = Math.max(zAwal + (s - zAwal) * p, perlu * 1.01);
  const ox = tx - fx * sc, oy = ty - fy * sc;
  const penuh = p < 0.02;
  const c = clawdProps;
  let clawdEl: React.ReactNode = null;
  if (c && fr <= Math.round(c.sampai * fps)) {
    const k = move(fr, 2, 16, 'heavy');                      // pindah bahu -> rambut bersamaan lingkaran menyusut
    const X = c.x0 + (c.x1 - c.x0) * k, Y = c.y0 + (c.y1 - c.y0) * k;
    const {w, h} = kotak(c.u);
    const b = 1 + ((c.besar ?? 1) - 1) * k * (1 - grow);               // membesar sedikit saat di dalam lingkaran supaya terbaca (skala footage 0,62)
    clawdEl = <div style={{position: 'absolute', left: X - w / 2, top: Y - (17 * c.u + 40), width: w, height: h, transformOrigin: `${w / 2}px ${17 * c.u + 40}px`, transform: `scale(${b})`}}>
      <KarakterLayer model="claude" u={c.u} durasi={c.sampai + 0.1} seed={1} kamar
        emosi={([[0, 'happy'], [0.6, 'excited'], [1.2, 'happy'], ...(c.proud !== undefined ? [[c.proud, 'proud']] : [])]) as never} sudut={[[0, -0.125], [0.5, -0.125], [0.9, 0.125]]}
        lompat={[[0.07, 0.6, 3.2]]} emote={[[999, 'seru', 0.1]]}/>
    </div>;
  }
  return <AbsoluteFill style={{background: 'transparent'}}>
    {!penuh && <div style={{position: 'absolute', left: cxp - R - 7, top: cyp - R - 7, width: 2 * R + 14, height: 2 * R + 14, borderRadius: '50%',
      background: '#FFFFFF', boxShadow: '0 28px 60px rgba(10,20,50,.34), 0 8px 16px rgba(10,20,50,.2)'}}/>}
    <div style={{position: 'absolute', inset: 0, clipPath: `circle(${R}px at ${cxp}px ${cyp}px)`}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '0 0', transform: `translate(${ox}px, ${oy}px) scale(${sc})`}}>
        <OffthreadVideo src={staticFile('video/wajah-proxy.mp4')} startFrom={Math.round(t0 * fps)} muted style={{width: 1920, height: 1080}}/>
      </div>
    </div>
    {clawdEl && <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '0 0', transform: `translate(${ox}px, ${oy}px) scale(${sc})`,
      filter: 'drop-shadow(0 6px 10px rgba(10,20,50,.35))'}}>{clawdEl}</div>}
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
