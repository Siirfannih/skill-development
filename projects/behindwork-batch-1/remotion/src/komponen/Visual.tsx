import React from 'react';
import { AbsoluteFill, Img, OffthreadVideo, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { CURVE } from '../lib/curves';
import { grade, warna } from '../tema';
import type { KB, Lapisan } from '../tipe';

// Kamera = transform pada lapisan dunia (push/pan) sepanjang adegan; kurva heavy/drift dari curves.ts (Lantai B13a).
export const kamera = (kb: KB | undefined, frame: number, total: number) => {
  const k = kb ?? {};
  const c = CURVE[k.kurva ?? 'drift'];
  const p = c(Math.min(1, Math.max(0, frame / Math.max(1, total))));
  const s = interpolate(p, [0, 1], [k.s0 ?? 1.0, k.s1 ?? 1.04]);
  const x = interpolate(p, [0, 1], [k.x0 ?? 0, k.x1 ?? 0]);
  const y = interpolate(p, [0, 1], [k.y0 ?? 0, k.y1 ?? 0]);
  return `translate(${x}px, ${y}px) scale(${s})`;
};

const isi: React.CSSProperties = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' };

export const SatuLapisan: React.FC<{ l: Lapisan; total: number; detikAdegan: number }> = ({ l, total, detikAdegan }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  switch (l.k) {
    case 'kartu':
      return <AbsoluteFill style={{ background: l.warna === 'kertas' ? warna.kertas : warna.malam }} />;
    case 'video':
      return (
        <AbsoluteFill style={{ transform: kamera(l.kb, frame, total), transformOrigin: '50% 50%' }}>
          <OffthreadVideo src={staticFile(l.src)} startFrom={Math.round((l.mulaiSumber ?? 0) * fps)} playbackRate={l.laju ?? 1} muted
            style={{ ...isi, objectPosition: l.pos ?? 'center', filter: grade[l.grade ?? 'nat'] }} />
        </AbsoluteFill>
      );
    case 'gambar':
    case 'potong':
      return (
        <AbsoluteFill style={{ transform: kamera(l.kb, frame, total), transformOrigin: '50% 50%' }}>
          <Img src={staticFile(l.src)} style={{ ...isi, objectPosition: l.pos ?? 'center', filter: l.k === 'gambar' ? grade[l.grade ?? 'nat'] : 'none' }} />
        </AbsoluteFill>
      );
    case 'inset': {
      const masuk = 12;
      const p = CURVE.land(Math.min(1, frame / masuk));
      const dx = l.masuk === 'kanan' ? interpolate(p, [0, 1], [380, 0]) : 0;
      const dy = l.masuk === 'bawah' ? interpolate(p, [0, 1], [260, 0]) : 0;
      const sc = l.masuk === 'tumbuh' ? interpolate(p, [0, 1], [0.86, 1]) : 1;
      const tr = `translate(${dx}px, ${dy}px) rotate(${l.rot ?? 0}deg) scale(${sc})`;
      const inner: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'cover', objectPosition: l.pos ?? 'center', filter: grade[l.grade ?? 'nat'] };
      return (
        <AbsoluteFill style={{ transform: kamera(l.kb, frame, total) }}>
          <div style={{ position: 'absolute', left: l.x, top: l.y, width: l.w, height: l.h, transform: tr, boxShadow: '0 30px 80px rgba(0,0,0,0.55)', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', transform: l.zoom ? `scale(${l.zoom})` : undefined, transformOrigin: '50% 50%' }}>
              {l.video ? <OffthreadVideo src={staticFile(l.src)} startFrom={Math.round((l.mulaiSumber ?? 0) * fps)} playbackRate={l.laju ?? 1} muted style={inner} /> : <Img src={staticFile(l.src)} style={inner} />}
            </div>
          </div>
        </AbsoluteFill>
      );
    }
    case 'irisan': {
      // potongan footage di balok sempit (kartu 92 T2: tekstur menyelinap di tepi), bergeser sedikit tiap detik
      const g = (l.geser ?? 0) * Math.sin(frame / 3);
      const st: React.CSSProperties = { ...isi, filter: grade[l.grade ?? 'nat'] };
      return (
        <AbsoluteFill style={{ clipPath: l.clip, transform: `translateX(${g}px)` }}>
          {l.video ? <OffthreadVideo src={staticFile(l.src)} startFrom={Math.round((l.mulaiSumber ?? 0) * fps)} muted style={st} /> : <Img src={staticFile(l.src)} style={st} />}
        </AbsoluteFill>
      );
    }
    case 'tracking': {
      // garis tracking pita yang bergulir: tanda gambar sedang diputar mundur
      const off = (frame * 37) % 300;
      return (
        <AbsoluteFill style={{ background: `repeating-linear-gradient(0deg, transparent 0px, transparent ${140 + (off % 40)}px, rgba(255,255,255,0.14) ${140 + (off % 40)}px, rgba(255,255,255,0.14) ${146 + (off % 40)}px, transparent ${146 + (off % 40)}px, transparent 300px)`, backgroundPositionY: `${off}px`, mixBlendMode: 'screen' }} />
      );
    }
    case 'belah':
      return (
        <AbsoluteFill>
          <AbsoluteFill style={{ clipPath: 'inset(0 50% 0 0)' }}>{l.kiri.map((x, i) => <SatuLapisan key={i} l={x} total={total} detikAdegan={detikAdegan} />)}</AbsoluteFill>
          <AbsoluteFill style={{ clipPath: 'inset(0 0 0 50%)' }}>{l.kanan.map((x, i) => <SatuLapisan key={i} l={x} total={total} detikAdegan={detikAdegan} />)}</AbsoluteFill>
        </AbsoluteFill>
      );
  }
};
