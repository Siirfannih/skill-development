import React from 'react';
import {AbsoluteFill, Freeze, OffthreadVideo, Sequence, staticFile, useVideoConfig} from 'remotion';
import {Kanvas} from '../bersama/Kanvas';
import {CLAWD_GENGGAM, Clawd} from '../bersama/Clawd';
import {HURUF, JARAK, NETRAL} from '../bersama/tema';
import {AppClaudeTerang} from '../bersama/ui-asli/claude/AppClaudeTerang';
import {CLAUDE} from '../bersama/ui-asli/claude/warna';
import {IkonClaude} from '../bersama/ui-asli/claude/IkonClaude';
import {BidangUI} from '../bersama/ui-asli/BidangUI';
import {FONT_UI} from '../bersama/ui-asli/FontsUI';
import {posisiPlayheadStudio, STUDIO, StudioRemotion, type TrackStudio} from '../bersama/ui-asli/remotion/StudioRemotion';
import {dur, move, react} from '../lib/curves';
import {TeksW3, useWaktuW3} from './w3-waktu';

const PROMPT = 'Claude please help me edit this video like a professional video editor';
const BATAS_JENSEN = [0, 3.47, 6.07, 8, 9.03, 14];

// AppClaudeTerang belum punya state terkirim; composer kosong dan pesan pengguna ditaruh di area chat asli.
const ClaudeTerkirim: React.FC = () => <AbsoluteFill data-w3-claude-terkirim>
  <AppClaudeTerang ketik={{teks: '', mulai: 0, cps: 1}}/>
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    <BidangUI lebar={2000} tinggi={1228} nama="Prompt terkirim, Render preview sedang berjalan">
      <div style={{position: 'absolute', left: 675, top: 154, width: 808, padding: JARAK.m,
        boxSizing: 'border-box', borderRadius: JARAK.m, background: CLAUDE.tombol, color: CLAUDE.tinta,
        fontFamily: FONT_UI.claude, fontSize: HURUF.ukuran.label * .72, lineHeight: 1.5}}>
        <div style={{display: 'flex', alignItems: 'center', gap: JARAK.s, marginBottom: JARAK.s}}>
          <IkonClaude nama="play" size={HURUF.ukuran.label}/><span>video.mp4</span>
        </div>
        {PROMPT}
      </div>
    </BidangUI>
  </AbsoluteFill>
</AbsoluteFill>;

export const P08: React.FC = () => {
  const {frame, fps, pada, durasi} = useWaktuW3('P08');
  const {width, height} = useVideoConfig();
  const studioPada = pada('bikin');
  const batas = BATAS_JENSEN.map((s) => Math.round(s * fps));
  const panjang = batas[batas.length - 1];
  const akhirPlayhead = panjang - Math.round(fps * .7);
  const rakitDur = dur(width * .25, fps, .6);
  const reaksiRakit = (pada('sampai') - studioPada) * .8 / react(batas.length - 2, fps);
  const rakitPada = batas.slice(0, -1).map((_, n) => studioPada + react(n, fps, reaksiRakit));
  const playheadPada = (f: number) => {
    const rakit = rakitPada.slice(0, -1).reduce((total, awal, n) => total + (batas[n + 1] - batas[n])
      * move(f, awal, Math.max(1, rakitPada[n + 1] - awal), 'heavy'), 0);
    const hasil = move(f, pada('sampai'), Math.max(1, pada('jauh') - pada('sampai')), 'drift');
    const cepat = move(f, pada('jauh'), Math.max(1, pada('cepat.') - pada('jauh')), 'heavy');
    return Math.round(rakit + fps * 1.5 * hasil + (akhirPlayhead - batas[4] - fps * 1.5) * cepat);
  };
  const track: TrackStudio[] = batas.slice(0, -1).map((mulai, n) => ({
    nama: '<Sequence>', mulai,
    durasi: Math.round((batas[n + 1] - mulai) * move(frame, rakitPada[n], rakitDur, 'land')),
  }));
  track.push({nama: 'voice.wav', mulai: 0, durasi: panjang, warna: 'audio'},
    {nama: 'music.mp3', mulai: 0, durasi: panjang, warna: 'audio'});
  const playhead = playheadPada(frame);
  const lalu = playheadPada(frame - 1);
  const blurPlayhead = Math.min(3, Math.abs(posisiPlayheadStudio(playhead, panjang) - posisiPlayheadStudio(lalu, panjang)) * .06);
  const blurTrack = batas.slice(0, -1).map((mulai, n) => {
    const awal = rakitPada[n];
    const kecepatan = Math.abs(move(frame, awal, rakitDur, 'land') - move(frame - 1, awal, rakitDur, 'land'))
      * (batas[n + 1] - mulai) / panjang * width * .78;
    return `[data-adegan="P08"] [data-studio-track="${n}"] { filter: blur(${Math.min(4, kecepatan * .07)}px); }`;
  }).join('\n');
  const preview = <Sequence from={0} layout="none">
    <Freeze frame={0}>
      <OffthreadVideo muted trimBefore={playhead} src={staticFile('media/footage/jadi/jensen-v4-00-14.mp4')}
        style={{width: '100%', height: '100%', objectFit: 'contain', filter: 'saturate(.65) brightness(.44)'}}/>
    </Freeze>
  </Sequence>;
  const senangPada = pada('bagus');
  const reaksi = move(frame, senangPada, dur(height * .04, fps, .7), 'land');
  const skalaClawd = 1.2;
  const genggamX = CLAWD_GENGGAM.x * skalaClawd;
  const genggamY = CLAWD_GENGGAM.y * skalaClawd;
  const px = posisiPlayheadStudio(playhead, panjang);
  const kameraPada = (f: number) => {
    const dekat = move(f, studioPada, dur(height * .3, fps, .55), 'heavy');
    const skala = 1 + .65 * dekat + .01 * move(f, studioPada, durasi - studioPada - 1, 'drift');
    const fokus = posisiPlayheadStudio(playheadPada(f), panjang);
    const x = Math.max(width / (2 * skala), Math.min(width - width / (2 * skala), fokus));
    const y = height / 2 + (STUDIO.timelineY + STUDIO.header - height / 2) * dekat;
    return {skala, x: width / 2 - x * skala, y: height / 2 - y * skala};
  };
  const kamera = kameraPada(frame);
  const kameraLalu = kameraPada(frame - 1);
  const gerakLayar = Math.abs(px * kamera.skala + kamera.x
    - (posisiPlayheadStudio(lalu, panjang) * kameraLalu.skala + kameraLalu.x));
  const blurClawd = Math.min(1, gerakLayar * .025);
  const condong = -Math.min(1.5, Math.abs(playhead - lalu) * .12) - Math.sin(reaksi * Math.PI) * 2;
  // Zoom preview lokal menyisakan ruang UI kosong; narasi tidak pernah masuk bidang video.
  const lebarPreview = STUDIO.previewW * .68;
  const tinggiPreview = lebarPreview * height / width;
  const narasiY = kamera.y + (STUDIO.kontrolY - JARAK.l) * kamera.skala;
  const push = 1 + .012 * move(frame, 0, durasi - 1, 'drift');
  return <Kanvas>
    {frame < studioPada ? <AbsoluteFill data-adegan="P08" style={{transform: `scale(${push})`}}>
      <ClaudeTerkirim/>
      <TeksW3 id="P08" tekanKelompok={4} tekanPerKata/>
    </AbsoluteFill> : <AbsoluteFill data-adegan="P08" style={{background: NETRAL.tinta}}>
      <style>{`${blurTrack}
        [data-adegan="P08"] [data-studio-playhead] { filter: blur(${blurPlayhead}px); }
        [data-adegan="P08"] [data-studio-preview] {
          left: ${STUDIO.previewX + (STUDIO.previewW - lebarPreview) / 2}px !important;
          top: ${STUDIO.menu + JARAK.l}px !important;
          width: ${lebarPreview}px !important;
          height: ${tinggiPreview}px !important;
        }
        [data-adegan="P08"] [data-studio-preview] > div { transform: scale(${lebarPreview / width}) !important; }
        [data-w3-narasi-studio] [data-baris-kata] { top: ${narasiY}px !important; }
      `}</style>
      <AbsoluteFill data-w3-kamera style={{transformOrigin: '0 0',
        transform: `translate(${kamera.x}px, ${kamera.y}px) scale(${kamera.skala})`}}>
        <StudioRemotion komposisi={['JensenHuang', 'JensenHuang-Vertical', 'Thumbnail', 'Intro']}
          aktif="JensenHuang" track={track} playhead={playhead} preview={preview}/>
        <div data-w3-clawd style={{position: 'absolute', left: px - genggamX,
          top: STUDIO.timelineY + STUDIO.header / 2 - genggamY,
          transform: `rotate(${condong}deg)`, transformOrigin: `${genggamX}px ${genggamY}px`,
          filter: `blur(${blurClawd}px)`}}>
          <Clawd pose="depan" emosi="senang" skala={skalaClawd} pegangPlayhead/>
        </div>
      </AbsoluteFill>
      <AbsoluteFill data-w3-narasi-studio>
        <TeksW3 id="P08" tekanKelompok={4} tekanPerKata putih/>
      </AbsoluteFill>
    </AbsoluteFill>}
  </Kanvas>;
};
