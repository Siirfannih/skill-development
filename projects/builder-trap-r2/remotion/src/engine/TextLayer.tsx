// Renderer satu lapisan teks kinetik (BRIEF §Sistem teks; Lantai A1–A9).
// Pakai: <TextBlocks blocks={TEXT_ACT1.filter(b => b.beat === 'B04')} /> di dalam <Layer z={30}> pada Stage,
// atau <TextBlockView block={b}/> di dalam benda (mis. label H di dalam Print).
import React from 'react';
import { useCurrentFrame, interpolateColors } from 'remotion';
import { C, FONT, prog, lerp } from './theme';
import { wordIn, wordOut } from './words';
import type { TextBlock, Tok, NBlock, K3Block, K4Block, JBlock, HBlock, Tone } from '../text/types';

const TRACK = '-0.02em';

const tone = (t: Tone | undefined) =>
  t === 'dark'
    ? { ink: C.inkDark, fresh: '#B9BEC8', accent: C.accentDark } // REVIEW-r1 F-r1-02: kata terbaru tetap terbaca di gelap
    : { ink: C.ink, fresh: C.inkNew, accent: C.accent };

export const tokIn = (tok: Tok) => wordIn(tok.i[0]);
export const blockIn = (b: TextBlock) => Math.min(...(b.code === 'UI' && b.at ? b.at : allIn(b)));
const allIn = (b: TextBlock) => {
  switch (b.code) {
    case 'N': return b.lines.flat().map(tokIn);
    case 'K3': return [...b.head, ...b.keys.flat()].map(tokIn);
    case 'K4': return [...b.small, ...b.big].map(tokIn);
    default: return b.toks.map(tokIn);
  }
};

/** Ukur lebar teks dengan font yang sudah dimuat (canvas). */
let ctx: CanvasRenderingContext2D | null = null;
export function measure(text: string, size: number, weight = 700, family = FONT.sf, tracking = -0.02) {
  if (typeof document === 'undefined') return text.length * size * 0.5;
  if (!ctx) ctx = document.createElement('canvas').getContext('2d');
  ctx!.font = `${weight} ${size}px ${family}`;
  (ctx as any).letterSpacing = `${tracking * size}px`;
  return ctx!.measureText(text).width;
}

/** Satu kata narasi: blur 6→0 + naik 8 px dalam 6 f; abu lalu menghitam dalam 8 f. */
const Word: React.FC<{ tok: Tok; f: number; tn: Tone | undefined; kind?: 'n' | 'big' | 'key' }> = ({ tok, f, tn, kind = 'n' }) => {
  const a = tokIn(tok);
  const pal = tone(tn);
  const dur = kind === 'big' ? 8 : kind === 'key' ? 5 : 6;
  const p = prog(f, a, a + dur, 'out');
  const rise = kind === 'big' ? 0 : kind === 'key' ? 0.42 : 8; // key: em
  const blur = (kind === 'big' ? 10 : kind === 'key' ? 8 : 6) * (1 - p);
  const scale = kind === 'big' ? lerp(1.06, 1, p) : 1;
  const col = tok.accent
    ? pal.accent
    : kind === 'n'
      ? interpolateColors(f, [a + 3, a + 11], [pal.fresh, pal.ink])
      : pal.ink;
  return (
    <span
      style={{
        display: 'inline-block',
        color: col,
        opacity: f < a ? 0 : Math.min(1, p * 1.6),
        transform: kind === 'key' ? `translateY(${rise * (1 - p)}em)` : `translateY(${rise * (1 - p)}px) scale(${scale})`,
        transformOrigin: 'left bottom',
        filter: blur > 0.05 ? `blur(${blur}px)` : undefined,
      }}
    >
      {tok.t}
    </span>
  );
};

const words = (toks: Tok[], f: number, tn: Tone | undefined, kind?: 'n' | 'big' | 'key') =>
  toks.map((t, k) => (
    <React.Fragment key={k}>
      {k > 0 ? ' ' : null}
      <Word tok={t} f={f} tn={tn} kind={kind} />
    </React.Fragment>
  ));

const exitStyle = (b: TextBlock, f: number): React.CSSProperties => {
  if ((b.exit ?? 'rise') === 'cut') return {};
  const e = prog(f, b.until - 5, b.until, 'in');
  if (e <= 0) return {};
  return { transform: `translateY(${-16 * e}px)`, filter: `blur(${6 * e}px)`, opacity: 1 - e };
};

const NView: React.FC<{ b: NBlock; f: number }> = ({ b, f }) => (
  <div
    style={{
      position: 'absolute', left: b.x, top: b.y, whiteSpace: 'nowrap',
      transform: b.align === 'center' ? 'translateX(-50%)' : undefined,
      textAlign: b.align ?? 'left',
      fontFamily: FONT.sf, fontWeight: b.weight ?? 700, fontSize: b.size, lineHeight: 1.14, letterSpacing: TRACK,
    }}
  >
    <div style={exitStyle(b, f)}>
      {b.lines.map((ln, k) => (
        <div key={k}>{words(ln, f, b.tone)}</div>
      ))}
    </div>
  </div>
);

/** K3: kepala tetap, kata kunci di slot (lama keluar ke atas, baru masuk dari bawah), lebar slot beranimasi. */
const K3View: React.FC<{ b: K3Block; f: number }> = ({ b, f }) => {
  const pal = tone(b.tone);
  const starts = b.keys.map((k) => tokIn(k[0]));
  let cur = -1;
  starts.forEach((s, k) => { if (f >= s - 4) cur = k; });
  const txt = (k: Tok[]) => k.map((t) => t.t).join(' ');
  const wKey = (k: number) => (k < 0 ? 0 : measure(txt(b.keys[k]), b.size));
  const prevW = wKey(cur - 1), curW = wKey(cur);
  const sw = cur < 0 ? 0 : lerp(prevW, curW, prog(f, starts[cur] - 4, starts[cur] + 5, 'out'));
  const space = measure(' ', b.size);
  const pad = b.label ? [0.16 * b.size, 0.34 * b.size] : [0, 0];
  const headIn = tokIn(b.head[0]);
  const labelP = prog(f, headIn - 2, headIn + 6, 'out');
  // lebar kepala yang sudah tampil (label tumbuh mengikuti kata, bukan kotak kosong di depan)
  let headW = 0;
  b.head.forEach((t, k) => {
    const full = measure(b.head.slice(0, k + 1).map((x) => x.t).join(' '), b.size);
    const prev = k === 0 ? 0 : measure(b.head.slice(0, k).map((x) => x.t).join(' '), b.size);
    headW += (full - prev) * prog(f, tokIn(t) - 1, tokIn(t) + 5, 'out');
  });
  return (
    <div style={{ position: 'absolute', left: b.x, top: b.y, ...exitStyle(b, f) }}>
      {b.label ? (
        <div
          style={{
            position: 'absolute', left: 0, top: 0,
            width: pad[1] * 2 + headW + (sw > 0 ? space + sw : 0),
            height: b.size * 1.22 + pad[0] * 2,
            background: '#FFFFFF', borderRadius: 4,
            boxShadow: '0 10px 24px rgba(40,39,35,0.22), 0 2px 4px rgba(40,39,35,0.16)',
            transform: `scaleY(${labelP})`, transformOrigin: 'center bottom', opacity: labelP,
          }}
        />
      ) : null}
      <div
        style={{
          position: 'relative', padding: `${pad[0]}px ${pad[1]}px`, whiteSpace: 'nowrap',
          fontFamily: FONT.sf, fontWeight: 700, fontSize: b.size, lineHeight: 1.22, letterSpacing: TRACK, color: pal.ink,
        }}
      >
        {words(b.head, f, b.tone)}
        <span style={{ display: 'inline-block', position: 'relative', width: sw > 0 ? space + sw : 0, height: '1.22em', verticalAlign: 'top' }}>
          {b.keys.map((k, idx) => {
            const s = starts[idx];
            const next = starts[idx + 1];
            if (f < s - 1) return null;
            const e = next !== undefined ? prog(f, next - 4, next, 'in') : 0;
            if (e >= 1) return null;
            return (
              <span
                key={idx}
                style={{
                  position: 'absolute', left: space, top: 0, lineHeight: 1.22, whiteSpace: 'nowrap',
                  transform: `translateY(${-0.42 * e}em)`, opacity: 1 - e, filter: e > 0 ? `blur(${8 * e}px)` : undefined,
                }}
              >
                {words(k, f, b.tone, 'key')}
              </span>
            );
          })}
        </span>
        {b.tail ? <> {words(b.tail, f, b.tone)}</> : null}
      </div>
    </div>
  );
};

/** K4: kata besar + kata kecil (rasio ≈ 2,3), rata kiri. */
const K4View: React.FC<{ b: K4Block; f: number }> = ({ b, f }) => {
  const small = b.bigSize / (b.ratio ?? 2.3);
  const bigLine = (
    <div style={{ fontSize: b.bigSize, fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.03em' }}>
      {words(b.bigAccent ? b.big.map((t) => ({ ...t, accent: true })) : b.big, f, b.tone, 'big')}
    </div>
  );
  const smallLine = b.small.length ? (
    <div style={{ fontSize: small, fontWeight: 700, lineHeight: 1.15, letterSpacing: TRACK, margin: b.order === 'small-big' ? '0 0 0.12em 0.06em' : '0.22em 0 0 0.06em' }}>
      {words(b.small, f, b.tone)}
    </div>
  ) : null;
  return (
    <div style={{ position: 'absolute', left: b.x, top: b.y, whiteSpace: 'nowrap', fontFamily: FONT.sf }}>
      <div style={exitStyle(b, f)}>
        {b.order === 'small-big' ? <>{smallLine}{bigLine}</> : <>{bigLine}{smallLine}</>}
      </div>
    </div>
  );
};

/** J: kartu judul satu kata; huruf naik dari balik garis dasar (mask), total ±10 f. */
const JView: React.FC<{ b: JBlock; f: number }> = ({ b, f }) => {
  const pal = tone(b.tone);
  const a = tokIn(b.toks[0]);
  const letters = b.toks.map((t) => t.t).join(' ').split('');
  const fam = b.font === 'sf' ? FONT.sf : FONT.playfair;
  return (
    <div style={{ position: 'absolute', left: b.x, top: b.y, transform: 'translateX(-50%)', whiteSpace: 'nowrap', ...exitStyle(b, f) }}>
      <div style={{ fontFamily: fam, fontWeight: 800, fontSize: b.size, lineHeight: 1.18, letterSpacing: '-0.01em', color: pal.ink, overflow: 'hidden', paddingBottom: '0.06em' }}>
        {letters.map((ch, k) => {
          const s = a + (k * 6) / Math.max(1, letters.length - 1);
          const p = prog(f, s, s + 6, 'out');
          return (
            <span key={k} style={{ display: 'inline-block', transform: `translateY(${(1 - p) * 112}%)`, whiteSpace: 'pre' }}>
              {ch}
            </span>
          );
        })}
      </div>
    </div>
  );
};

/** H: tulisan tangan (Caveat) tergambar kiri→kanan selama kata diucapkan, lalu panah. */
const HView: React.FC<{ b: HBlock; f: number }> = ({ b, f }) => {
  const toks = b.toks;
  const a = tokIn(toks[0]);
  const lastI = Math.max(...toks.flatMap((t) => t.i));
  const z = Math.max(a + 10, wordOut(lastI));
  const p = prog(f, a, z, 'smooth');
  const pa = prog(f, z, z + 8, 'out');
  const ink = b.ink ?? C.accent;
  return (
    <div style={{ position: 'absolute', left: b.x, top: b.y, transform: `rotate(${b.rot ?? -4}deg)`, transformOrigin: 'left center', ...exitStyle(b, f) }}>
      <div
        style={{
          fontFamily: FONT.caveat, fontWeight: 700, fontSize: b.size, lineHeight: 1, color: ink, whiteSpace: 'nowrap',
          clipPath: `inset(-20% ${100 - p * 100}% -20% -5%)`,
        }}
      >
        {toks.map((t) => t.t).join(' ')}
      </div>
      {b.arrow ? (
        <svg
          style={{ position: 'absolute', left: b.arrow.box[0], top: b.arrow.box[1], overflow: 'visible' }}
          width={b.arrow.box[2]} height={b.arrow.box[3]}
        >
          <path d={b.arrow.d} fill="none" stroke={ink} strokeWidth={b.size * 0.075} strokeLinecap="round" strokeLinejoin="round"
            pathLength={1} strokeDasharray={1} strokeDashoffset={1 - pa} />
        </svg>
      ) : null}
    </div>
  );
};

export const TextBlockView: React.FC<{ block: TextBlock }> = ({ block }) => {
  const f = useCurrentFrame();
  if (f < blockIn(block) - 2) return null;
  if (f >= block.until) return null;
  switch (block.code) {
    case 'N': return <NView b={block} f={f} />;
    case 'K3': return <K3View b={block} f={f} />;
    case 'K4': return <K4View b={block} f={f} />;
    case 'J': return <JView b={block} f={f} />;
    case 'H': return <HView b={block} f={f} />;
    default: return null; // UI dirender adegannya
  }
};

export const TextBlocks: React.FC<{ blocks: TextBlock[] }> = ({ blocks }) => (
  <>
    {blocks.map((b) => (
      <TextBlockView key={b.id} block={b} />
    ))}
  </>
);
