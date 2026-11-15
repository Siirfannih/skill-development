import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import phrases from './phrases6.json';
import extra from './kt6.json';
import heads from './heads.json';
import { BigWord, ChapterBar, FONT_FACE, PlayerTag } from './Style6';

// v6: (1) frasa kata per kata, posisi terkunci per adegan (mesin layout v5, ukuran adaptif close-up);
// (2) kata kunci tampil SENDIRIAN (frasa sudah hilang), warna padat; (3) player tag sekolah di atas kepala;
// (4) label bab statis pojok kanan atas.
const FPS = 30;
const ORANGE = '#F7922E';
type W_ = { w: string; t: number; k: boolean; q?: boolean };
type Track = { v0: number; v1: number; t: number[][] };
const TR = heads as Record<string, Track>;

const Word: React.FC<{ w: W_; fr: number }> = ({ w, fr }) => {
  const s = Math.round(w.t * FPS) - 1;
  const p = interpolate(fr, [s, s + 7], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  return (
    <span style={{ display: 'inline-block', marginRight: '0.24em', color: w.k ? ORANGE : (w.q ? '#BDBDBD' : '#FFFFFF'), opacity: p,   // q = pertanyaan pewawancara
      transform: `translateY(${(1 - p) * 26}px)`, filter: `blur(${(1 - p) * 8}px)` }}>{w.w}</span>
  );
};

const headAt = (fr: number): number[] | null => {
  for (const tr of Object.values(TR)) {
    const a = Math.round(tr.v0 * FPS), b = Math.round(tr.v1 * FPS);
    if (fr >= a && fr < b) return tr.t[Math.min(tr.t.length - 1, fr - a)];
  }
  return null;
};

export const Kinetic6: React.FC = () => {
  const fr = useCurrentFrame(); const t = fr / FPS;
  const ex = extra as any;
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <style>{FONT_FACE}</style>
      {(phrases as any[]).map((c, i) => {
        const a = Math.round(c.start * FPS), b = Math.round(c.end * FPS);
        if (fr < a || fr > b) return null;
        const q = interpolate(fr, [b - 6, b], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic) });
        return (
          <div key={i} style={{ position: 'absolute', left: c.x, top: c.y, fontFamily: 'SFDisplay', fontWeight: 700, fontSize: c.size ?? 64,
            lineHeight: 1.1, letterSpacing: '-0.01em', whiteSpace: 'nowrap', opacity: q, filter: `blur(${(1 - q) * 6}px)`,
            textAlign: c.align === 'c' ? 'center' : 'left',                                   // v8: rata tengah
            transform: `${c.align === 'c' ? 'translateX(-50%) ' : ''}translateY(${-(1 - q) * 10}px)`, textShadow: '0 1px 2px rgba(0,0,0,0.6), 0 0 10px rgba(0,0,0,0.55), 0 2px 18px rgba(0,0,0,0.6), 0 6px 36px rgba(0,0,0,0.7)' }}>   {/* v9: glow lebih tebal, terbaca di latar ramai */}
            {c.lines.map((ln: W_[], j: number) => <div key={j}>{ln.map((w, k) => <Word key={k} w={w} fr={fr} />)}</div>)}
          </div>
        );
      })}
      {(ex.big as any[]).map((d, i) => (t >= d.start && t <= d.end) ? (
        <BigWord key={`b${i}`} t={t - d.start} dur={d.end - d.start} text={d.text} x={d.cx} y={d.cy} size={d.size} color={d.color} />
      ) : null)}
      {(ex.tags as any[]).map((g, i) => {
        if (t < g.start || t >= g.end) return null;
        const h = headAt(fr); if (!h) return null;
        const first = ex.tags.findIndex((x: any) => x.scene === g.scene);       // muncul sekali per adegan (tidak berkedip tiap sub-shot)
        const s0 = ex.tags[first].start; const e0 = Math.max(...ex.tags.filter((x: any) => x.scene === g.scene).map((x: any) => x.end));
        return <PlayerTag key={`g${i}`} t={t - s0} dur={e0 - s0} head={h} label={g.label} sub={g.sub} side={g.side} pos={g.pos} />;
      })}
      {(ex.chapters as any[]).map((c, i) => (t >= c.start && t < c.end) ? (
        <ChapterBar key={`c${i}`} t={t - c.start} dur={c.end - c.start} title={c.title} />
      ) : null)}
    </AbsoluteFill>
  );
};
