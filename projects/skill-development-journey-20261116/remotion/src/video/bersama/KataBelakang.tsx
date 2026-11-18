import React, {useCallback, useRef} from 'react';
import {OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {move} from '../../lib/curves';
import {HURUF, IG_R7, MEREK, PENGECUALIAN} from './tema';
import {IG_EVENT} from './ig/waktu';

const W = 1920, H = 1080;

export const KataBelakang: React.FC<{t0: number; gratis?: boolean}> = ({t0, gratis = false}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const canvas = useRef<HTMLCanvasElement>(null);
  const buffers = useRef<{wajah?: HTMLCanvasElement; matte?: HTMLCanvasElement}>({});
  const ready = useRef({wajah: -1, matte: -1});

  const terima = useCallback((jenis: 'wajah' | 'matte', gambar: CanvasImageSource) => {
    const buffer = buffers.current[jenis] ?? document.createElement('canvas');
    buffers.current[jenis] = buffer;
    buffer.width = W;
    buffer.height = H;
    const ctx = buffer.getContext('2d', {willReadFrequently: true});
    if (!ctx) throw new Error(`Canvas ${jenis} tidak tersedia`);
    ctx.drawImage(gambar, 0, 0, W, H);
    ready.current[jenis] = f;
    // Kedua decoder harus menyelesaikan frame yang sama sebelum luminans menjadi alpha.
    if (ready.current.wajah !== f || ready.current.matte !== f) return;
    const wajah = buffers.current.wajah!.getContext('2d')!.getImageData(0, 0, W, H);
    const matte = buffers.current.matte!.getContext('2d')!.getImageData(0, 0, W, H);
    for (let i = 0; i < wajah.data.length; i += 4) wajah.data[i + 3] = matte.data[i];
    const hasil = canvas.current?.getContext('2d');
    if (!hasil) throw new Error('Canvas pembicara tidak tersedia');
    hasil.putImageData(wajah, 0, 0);
  }, [f]);

  const wajah = useCallback((gambar: CanvasImageSource) => terima('wajah', gambar), [terima]);
  const matte = useCallback((gambar: CanvasImageSource) => terima('matte', gambar), [terima]);
  const skala = gratis ? 1 : 1.1 - 0.1 * move(f, 67, 6, 'land');
  const tersembunyi: React.CSSProperties = {position: 'absolute', width: W, height: H, opacity: 0};

  return <div style={{position: 'absolute', inset: 0, background: gratis ? IG_R7.gratis.latar : PENGECUALIAN.hijauProfesional.warna}}>
    <OffthreadVideo src={staticFile('video/wajah-proxy.mp4')} startFrom={Math.round(t0 * fps)} muted
      style={tersembunyi} onVideoFrame={wajah}/>
    {/* Klip matte dimulai pada 78,5 dtk sumber, yaitu frame lokal 63 dunia IG. */}
    <Sequence from={gratis ? IG_EVENT.matte : 63} layout="none">
      <OffthreadVideo src={staticFile(gratis ? 'video/matte-ig-gratis-r7.webm' : 'video/matte-ig-r6.webm')} muted style={tersembunyi} onVideoFrame={matte}/>
    </Sequence>
    <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
      <g transform={`translate(${W / 2} ${H * 0.42}) scale(${skala})`}>
        <text x={0} y={0} textAnchor="middle" dominantBaseline="central" textLength={W * (gratis ? 0.86 : 0.92)}
          lengthAdjust="spacingAndGlyphs" fill={gratis ? IG_R7.gratis.tinta : MEREK.latar} fontFamily={HURUF.keluarga.hero}
          fontWeight={800} fontSize={gratis ? IG_R7.gratis.ukuran : 248} letterSpacing="-0.02em">{gratis ? 'GRATIS' : 'PROFESIONAL'}</text>
      </g>
      {gratis && <text x={120} y={244} dominantBaseline="central" fill={IG_R7.gratis.tinta}
        fontFamily={HURUF.keluarga.hero} fontWeight={700} fontSize={IG_R7.gratis.label}>SKILL</text>}
    </svg>
    <canvas ref={canvas} width={W} height={H} style={{position: 'absolute', inset: 0}}/>
  </div>;
};
