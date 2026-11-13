// Renderer satu lapisan teks kinetik (BRIEF §Sistem teks; Lantai A1–A9).
// Pakai: <TextBlocks blocks={TEXT_ACT1.filter(b => b.beat === 'B04')} /> di dalam <Layer z={30}> pada Stage,
// atau <TextBlockView block={b}/> di dalam benda (mis. label H di dalam Print).
import React from 'react';
import { useCurrentFrame, interpolateColors, getInputProps } from 'remotion';
import { C, FONT, prog, lerp, SAFE, TEXT_FLOOR } from './theme';
import { useScreenScale } from './Stage';
import { fontsReady } from './fonts';
import { wordIn, wordOut } from './words';
import type { TextBlock, Tok, NBlock, K3Block, K4Block, JBlock, HBlock, Tone } from '../text/types';

const TRACK = '-0.02em';

const tone = (t: Tone | undefined) =>
  t === 'dark'
    ? { ink: C.inkDark, fresh: C.freshDark, accent: C.accentDark, dim: C.inkDarkDim } // r3a: netral, hierarki putih vs abu
    : { ink: C.ink, fresh: C.inkNew, accent: C.accent, dim: C.ink };

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
const Word: React.FC<{ tok: Tok; f: number; tn: Tone | undefined; kind?: 'n' | 'big' | 'key'; ink?: string }> = ({ tok, f, tn, kind = 'n', ink }) => {
  const a = tokIn(tok);
  const pal = { ...tone(tn), ...(ink ? { ink } : {}) };
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

const words = (toks: Tok[], f: number, tn: Tone | undefined, kind?: 'n' | 'big' | 'key', ink?: string) =>
  toks.map((t, k) => (
    <React.Fragment key={k}>
      {k > 0 ? ' ' : null}
      <Word tok={t} f={f} tn={tn} kind={kind} ink={ink} />
    </React.Fragment>
  ));

const exitStyle = (b: TextBlock, f: number): React.CSSProperties => {
  if ((b.exit ?? 'rise') === 'cut') return {};
  const e = prog(f, b.until - 5, b.until, 'in');
  if (e <= 0) return {};
  return { transform: `translateY(${-16 * e}px)`, filter: `blur(${6 * e}px)`, opacity: 1 - e };
};

const NView: React.FC<{ b: NBlock; f: number; fit: Fit }> = ({ b, f, fit }) => (
  <div
    style={{
      position: 'absolute', left: b.x, top: b.y, whiteSpace: 'nowrap',
      transform: b.align === 'center' ? 'translateX(-50%)' : undefined,
      textAlign: b.align ?? 'left',
      fontFamily: FONT.sf, fontWeight: b.weight ?? 700, fontSize: fit.size, lineHeight: 1.14, letterSpacing: TRACK,
    }}
  >
    <div style={exitStyle(b, f)}>
      {(fit.lines ?? b.lines).map((ln, k) => (
        <div key={k}>{words(ln, f, b.tone)}</div>
      ))}
    </div>
  </div>
);

/** K3: kepala tetap, kata kunci di slot (lama keluar ke atas, baru masuk dari bawah), lebar slot beranimasi.
 *  r3a: bila kepala + kunci terpanjang melewati lebar aman pada ukuran lantai, kunci pindah ke baris 2 (rata kiri,
 *  ukuran sama). Nada gelap: kepala abu C.inkDarkDim, kunci putih penuh. */
const K3View: React.FC<{ b: K3Block; f: number; fit: Fit }> = ({ b, f, fit }) => {
  const pal = tone(b.tone);
  const size = fit.size;
  const stacked = !!fit.stacked;
  const headInk = b.tone === 'dark' ? pal.dim : undefined;
  const starts = b.keys.map((k) => tokIn(k[0]));
  let cur = -1;
  starts.forEach((s, k) => { if (f >= s - 4) cur = k; });
  const txt = (k: Tok[]) => k.map((t) => t.t).join(' ');
  const wKey = (k: number) => (k < 0 ? 0 : measure(txt(b.keys[k]), size));
  const prevW = wKey(cur - 1), curW = wKey(cur);
  const sw = cur < 0 ? 0 : lerp(prevW, curW, prog(f, starts[cur] - 4, starts[cur] + 5, 'out'));
  const space = stacked ? 0 : measure(' ', size);
  const pad = b.label ? [0.16 * size, 0.34 * size] : [0, 0];
  const headIn = tokIn(b.head[0]);
  const labelP = prog(f, headIn - 2, headIn + 6, 'out');
  // lebar kepala yang sudah tampil (label tumbuh mengikuti kata, bukan kotak kosong di depan)
  let headW = 0;
  b.head.forEach((t, k) => {
    const full = measure(b.head.slice(0, k + 1).map((x) => x.t).join(' '), size);
    const prev = k === 0 ? 0 : measure(b.head.slice(0, k).map((x) => x.t).join(' '), size);
    headW += (full - prev) * prog(f, tokIn(t) - 1, tokIn(t) + 5, 'out');
  });
  const lh = 1.22;
  const keyH = stacked ? prog(f, starts[0] - 4, starts[0] + 5, 'out') : 0; // tinggi baris 2 tumbuh saat kunci pertama masuk
  const labelW = stacked ? Math.max(headW, sw) : headW + (sw > 0 ? space + sw : 0);
  const slot = (
    <span style={{ display: 'inline-block', position: 'relative', width: sw > 0 ? space + sw : 0, height: `${lh}em`, verticalAlign: 'top' }}>
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
              position: 'absolute', left: space, top: 0, lineHeight: lh, whiteSpace: 'nowrap',
              transform: `translateY(${-0.42 * e}em)`, opacity: 1 - e, filter: e > 0 ? `blur(${8 * e}px)` : undefined,
            }}
          >
            {words(k, f, b.tone, 'key')}
          </span>
        );
      })}
    </span>
  );
  return (
    <div style={{ position: 'absolute', left: b.x, top: b.y, ...exitStyle(b, f) }}>
      {b.label ? (
        <div
          style={{
            position: 'absolute', left: 0, top: 0,
            width: pad[1] * 2 + labelW,
            height: size * lh * (1 + keyH) + pad[0] * 2,
            background: '#FFFFFF', borderRadius: 4,
            boxShadow: '0 10px 24px rgba(40,39,35,0.22), 0 2px 4px rgba(40,39,35,0.16)',
            transform: `scaleY(${labelP})`, transformOrigin: 'center bottom', opacity: labelP,
          }}
        />
      ) : null}
      <div
        style={{
          position: 'relative', padding: `${pad[0]}px ${pad[1]}px`, whiteSpace: 'nowrap',
          fontFamily: FONT.sf, fontWeight: 700, fontSize: size, lineHeight: lh, letterSpacing: TRACK, color: headInk ?? pal.ink,
        }}
      >
        {words(b.head, f, b.tone, undefined, headInk)}
        {stacked ? (
          <>
            <br />
            {slot}
            {b.tail ? <> {words(b.tail, f, b.tone, undefined, headInk)}</> : null}
          </>
        ) : (
          <>
            {slot}
            {b.tail ? <> {words(b.tail, f, b.tone, undefined, headInk)}</> : null}
          </>
        )}
      </div>
    </div>
  );
};

/** K4: kata besar + kata kecil (rasio ≈ 2,3), rata kiri. */
const K4View: React.FC<{ b: K4Block; f: number; fit: Fit }> = ({ b, f, fit }) => {
  const small = fit.small ?? b.bigSize / (b.ratio ?? 2.3);
  const bigLine = (
    <div style={{ fontSize: fit.size, fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.03em' }}>
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
const JView: React.FC<{ b: JBlock; f: number; fit: Fit }> = ({ b, f, fit }) => {
  const pal = tone(b.tone);
  const a = tokIn(b.toks[0]);
  const letters = b.toks.map((t) => t.t).join(' ').split('');
  const fam = b.font === 'sf' ? FONT.sf : FONT.playfair;
  return (
    <div style={{ position: 'absolute', left: b.x, top: b.y, transform: 'translateX(-50%)', whiteSpace: 'nowrap', ...exitStyle(b, f) }}>
      <div style={{ fontFamily: fam, fontWeight: 800, fontSize: fit.size, lineHeight: 1.18, letterSpacing: '-0.01em', color: pal.ink, overflow: 'hidden', paddingBottom: '0.06em' }}>
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
const HView: React.FC<{ b: HBlock; f: number; fit: Fit }> = ({ b, f, fit }) => {
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
          fontFamily: FONT.caveat, fontWeight: 700, fontSize: fit.size, lineHeight: 1, color: ink, whiteSpace: 'nowrap',
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
          <path d={b.arrow.d} fill="none" stroke={ink} strokeWidth={fit.size * 0.075} strokeLinecap="round" strokeLinejoin="round"
            pathLength={1} strokeDasharray={1} strokeDashoffset={1 - pa} />
        </svg>
      ) : null}
    </div>
  );
};

// ---------- r3a · lantai ukuran (REVIEW-v1-self F-v1-02) ----------
// Ukuran blok di data = px dunia. Lantai berlaku di px LAYAR: narasi/sambung ≥ TEXT_FLOOR.n, kata kunci/besar ≥ TEXT_FLOOR.key,
// dihitung dengan skala layar TERKECIL selama blok tampil (ukuran dunia tetap; kamera yang memperbesar). Bila baris jadi
// lebih lebar dari ruang aman (tepi kiri blok → SAFE.x1, pada frame semua kata sudah tampil), N dipecah/diseimbangkan
// ke 2 baris dan kunci K3 turun ke baris 2. Tidak pernah dikecilkan di bawah lantai.
type Fit = { size: number; small?: number; lines?: Tok[][]; stacked?: boolean; sMin?: number };
const FIT_CACHE = new Map<string, Fit>();
const lineW = (toks: Tok[], size: number, weight = 700) => measure(toks.map((t) => t.t).join(' '), size, weight);

/** pecah token jadi 2 baris dengan lebar maksimum terkecil */
function balance2(toks: Tok[], size: number, weight: number): Tok[][] {
  let best: Tok[][] = [toks], bw = Infinity;
  for (let k = 1; k < toks.length; k++) {
    const a = toks.slice(0, k), c = toks.slice(k);
    const w = Math.max(lineW(a, size, weight), lineW(c, size, weight));
    if (w < bw) { bw = w; best = [a, c]; }
  }
  return best;
}

function computeFit(b: TextBlock, sc: ReturnType<typeof useScreenScale>): Fit {
  const base = b.code === 'K4' ? b.bigSize : b.code === 'UI' ? 0 : b.size;
  if (!sc || b.code === 'UI') return { size: base, small: b.code === 'K4' ? b.bigSize / (b.ratio ?? 2.3) : undefined };
  // seluruh masa tampil blok (kalimat bisa berlanjut di blok lain, jadi tidak dipotong di kata terakhir blok ini)
  const a = blockIn(b);
  const z = Math.max(a + 1, b.until);
  let sMin = Infinity;
  for (let t = a; t < z; t += 2) sMin = Math.min(sMin, sc(t).s);
  sMin = Math.min(sMin, sc(z - 1).s);
  const nMin = TEXT_FLOOR.n / sMin, kMin = TEXT_FLOOR.key / sMin;
  // ruang aman pada frame kata terakhir masuk
  const ref = Math.min(z - 1, Math.max(...allIn(b)));
  const r = sc(ref);
  const sx = r.x(b.x);
  const center = b.code === 'N' && b.align === 'center';
  const availScreen = center ? 2 * Math.min(sx - SAFE.x0, SAFE.x1 - sx) : SAFE.x1 - sx;
  const maxW = Math.max(120, Math.min(availScreen, SAFE.x1 - SAFE.x0)) / r.s;
  const f0 = computeFit0(b, sMin, nMin, kMin, maxW);
  return { ...f0, sMin };
}
function computeFit0(b: TextBlock, sMin: number, nMin: number, kMin: number, maxW: number): Fit {
  switch (b.code) {
    case 'N': {
      const size = Math.max(b.size, nMin);
      const wt = b.weight ?? 700;
      const over = b.lines.some((ln) => lineW(ln, size, wt) > maxW);
      if (!over) return { size };
      const lines = balance2(b.lines.flat(), size, wt);
      if (lines.some((ln) => lineW(ln, size, wt) > maxW)) console.warn(`[lantai] ${b.id}: 2 baris pada ${size.toFixed(0)} px masih melewati lebar aman`);
      return { size, lines };
    }
    case 'K3': {
      const size = Math.max(b.size, kMin);
      const pad = b.label ? 0.68 * size : 0;
      const head = lineW(b.head, size);
      const key = Math.max(...b.keys.map((k) => lineW(k, size))) + (b.tail ? lineW(b.tail, size) + measure(' ', size) : 0);
      return { size, stacked: head + measure(' ', size) + key + pad > maxW };
    }
    case 'K4': {
      const size = Math.max(b.bigSize, kMin);
      const small = Math.max(size / (b.ratio ?? 2.3), nMin);
      if (Math.max(lineW(b.big, size), lineW(b.small, small)) > maxW) console.warn(`[lantai] ${b.id}: K4 melewati lebar aman`);
      return { size, small };
    }
    case 'J': return { size: Math.max(b.size, kMin) };
    case 'H': return { size: Math.max(b.size, nMin) };
  }
  return { size: 0 };
}

export const TextBlockView: React.FC<{ block: TextBlock }> = ({ block }) => {
  const f = useCurrentFrame();
  const sc = useScreenScale();
  if (f < blockIn(block) - 2) return null;
  if (f >= block.until) return null;
  let fit = FIT_CACHE.get(block.id);
  if (!fit) {
    fit = computeFit(block, sc);
    // simpan hanya bila font sudah dimuat (ukuran dari canvas); sebelum itu hitung ulang tiap render
    if (fontsReady()) FIT_CACHE.set(block.id, fit);
  }
  const view = viewOf(block, f, fit);
  if (!FIT_DEBUG || !view || !sc) return view;
  // --props='{"fitDebug":true}': label ukuran LAYAR (px) blok di frame ini, untuk QC lantai ukuran
  const s = sc(f).s;
  const scr = (v: number) => (v * s).toFixed(0);
  const tag = `${block.id} ${scr(fit.size)}${fit.small ? '/' + scr(fit.small) : ''}px min ${(fit.size * (fit.sMin ?? 1)).toFixed(0)}`;
  return (
    <>
      {view}
      <div style={{ position: 'absolute', left: block.x, top: block.y - 40 / s, fontSize: 34 / s, fontFamily: 'monospace', color: '#FF00AA', background: '#000', zIndex: 99, whiteSpace: 'nowrap' }}>{tag}</div>
    </>
  );
};

const FIT_DEBUG = !!(getInputProps() as { fitDebug?: boolean }).fitDebug;
const viewOf = (block: TextBlock, f: number, fit: Fit) => {
  switch (block.code) {
    case 'N': return <NView b={block} f={f} fit={fit} />;
    case 'K3': return <K3View b={block} f={f} fit={fit} />;
    case 'K4': return <K4View b={block} f={f} fit={fit} />;
    case 'J': return <JView b={block} f={f} fit={fit} />;
    case 'H': return <HView b={block} f={f} fit={fit} />;
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
