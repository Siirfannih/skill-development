// Renderer satu lapisan teks kinetik (BRIEF §Sistem teks; Lantai A1–A9).
// Pakai: <TextBlocks blocks={TEXT_ACT1.filter(b => b.beat === 'B04')} /> di dalam <Layer z={30}> pada Stage,
// atau <TextBlockView block={b}/> di dalam benda (mis. label H di dalam Print).
import React from 'react';
import { interpolateColors, getInputProps, useCurrentFrame } from 'remotion';
import { C, FONT, prog, lerp, clamp01, SAFE, TEXT_FLOOR } from './theme';
import { useScreenScale } from './Stage';
import { fontsReady } from './fonts';
import { useRealFrame } from './realframe';
import { W, keBaru } from './timewarp';
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
const Word: React.FC<{ tok: Tok; f: number; tn: Tone | undefined; kind?: 'n' | 'big' | 'key'; ink?: string; lead?: number }> = ({ tok, f, tn, kind = 'n', ink, lead = 0 }) => {
  const a = tokIn(tok) - lead; // r7f: lead = mulai masuk lebih awal (frame), hanya kartu kunci K3 kanan
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

/** r4: kartu kertas di belakang N satu baris; lebar tumbuh per kata yang sudah tampil (seperti label K3). */
const NCard: React.FC<{ b: NBlock; f: number; size: number }> = ({ b, f, size }) => {
  const toks = b.lines[0];
  const pad = [0.16 * size, 0.34 * size];
  let w = 0;
  toks.forEach((t, k) => {
    const full = measure(toks.slice(0, k + 1).map((x) => x.t).join(' '), size);
    const prev = k === 0 ? 0 : measure(toks.slice(0, k).map((x) => x.t).join(' '), size);
    w += (full - prev) * prog(f, tokIn(t) - 1, tokIn(t) + 5, 'out');
  });
  const a = tokIn(toks[0]);
  const p = prog(f, a - 2, a + 6, 'out');
  return (
    <div
      style={{
        position: 'absolute', left: -pad[1], top: -pad[0], width: w + 2 * pad[1], height: size * 1.14 + 2 * pad[0],
        background: '#FFFFFF', borderRadius: 4,
        boxShadow: '0 10px 24px rgba(40,39,35,0.22), 0 2px 4px rgba(40,39,35,0.16)',
        transform: `scaleY(${p})`, transformOrigin: 'center bottom', opacity: p,
      }}
    />
  );
};

const NView: React.FC<{ b: NBlock; f: number; fit: Fit }> = ({ b, f, fit }) => {
  const dim = b.dimHead ? tone(b.tone).dim : undefined;
  const lineToks = (ln: Tok[]) =>
    ln.map((t, k) => (
      <React.Fragment key={k}>
        {k > 0 ? ' ' : null}
        <Word tok={t} f={f} tn={b.tone} kind={t.accent && b.dimHead ? 'key' : 'n'} ink={t.accent ? undefined : dim} />
      </React.Fragment>
    ));
  return (
    <div
      style={{
        position: 'absolute', left: b.x, top: b.y, whiteSpace: 'nowrap',
        transform: b.align === 'center' ? 'translateX(-50%)' : b.align === 'right' ? 'translateX(-100%)' : undefined,
        textAlign: b.align ?? 'left',
        fontFamily: FONT.sf, fontWeight: b.weight ?? 700, fontSize: fit.size, lineHeight: 1.14, letterSpacing: TRACK,
      }}
    >
      <div style={exitStyle(b, f)}>
        {b.card ? <NCard b={b} f={f} size={fit.size} /> : null}
        {(fit.lines ?? b.lines).map((ln, k) =>
          fit.sizes ? (
            <div key={k} style={{ fontSize: fit.sizes[k], lineHeight: b.lh ?? 1.0, letterSpacing: fit.sizes[k] > 140 ? '-0.03em' : TRACK }}>
              {lineToks(ln)}
            </div>
          ) : (
            <div key={k} style={{ position: 'relative' }}>{lineToks(ln)}</div>
          ),
        )}
      </div>
    </div>
  );
};

/** r4 K3 seimbang (KT-1/KT-3): kepala baris 1 (ukuran fit.size), kunci baris 2 dengan ukuran per kunci (fit.keySizes) supaya
 *  lebarnya = lebar kepala; kunci lama keluar naik + blur, kunci baru masuk dari bawah di tempat yang sama. Tanpa kotak. */
const K3EvenView: React.FC<{ b: K3Block; f: number; fit: Fit }> = ({ b, f, fit }) => {
  const pal = tone(b.tone);
  const headInk = b.tone === 'dark' ? pal.dim : undefined;
  const ks = fit.keySizes ?? b.keys.map(() => fit.size);
  const kH = Math.max(...ks);
  const starts = b.keys.map((k) => tokIn(k[0]));
  return (
    <div style={{ position: 'absolute', left: b.x, top: b.y, ...exitStyle(b, f) }}>
      <div style={{ whiteSpace: 'nowrap', fontFamily: FONT.sf, fontWeight: 700, fontSize: fit.size, lineHeight: 1.12, letterSpacing: TRACK, color: headInk ?? pal.ink }}>
        {words(b.head, f, b.tone, undefined, headInk)}
      </div>
      <div style={{ position: 'relative', height: kH * 1.02, marginTop: fit.size * 0.04 }}>
        {b.keys.map((k, idx) => {
          const s0 = starts[idx];
          const next = starts[idx + 1];
          if (f < s0 - 1) return null;
          const e = next !== undefined ? prog(f, next - 4, next, 'in') : 0;
          if (e >= 1) return null;
          return (
            <div
              key={idx}
              style={{
                position: 'absolute', left: 0, bottom: 0, whiteSpace: 'nowrap', fontFamily: FONT.sf, fontWeight: 700,
                fontSize: ks[idx], lineHeight: 1.0, letterSpacing: '-0.03em',
                transform: `translateY(${-0.42 * e}em)`, opacity: 1 - e, filter: e > 0 ? `blur(${8 * e}px)` : undefined,
              }}
            >
              {words(k, f, b.tone, 'key')}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** r7f (B01–B03, review Sutradara): kartu kunci K3 rata kanan tanpa kepala (`alignRight`, `label`, `head: []`).
 *  - Pergantian kunci: kunci lama mulai keluar (naik + blur + pudar) 2 f sebelum kunci baru; kunci baru mulai masuk
 *    1 f lebih awal dari biasanya (= frame awal ucapan), sehingga di tiap frame paling banyak satu kata tajam > 50 % dan
 *    selalu ada satu kata ≥ 50 % terlihat (tidak ada kartu kosong).
 *  - Dalam satu frasa ("bikin" → "bikin software."): tepi kiri teks dikunci di posisi frasa lengkap yang rata kanan di
 *    b.x; kartu tumbuh ke kanan mengikuti kata yang sudah tampil (ease-out 6 f). Kata yang sudah tampil tidak bergeser.
 *  - Antar-frasa: kartu berpindah dari geometri frasa lama ke frasa baru (sisi yang melebar: f−2…f+1; sisi yang menyempit
 *    setelah kata lama habis: f+1…f+6). */
const K3CardRight: React.FC<{ b: K3Block; f: number; fit: Fit }> = ({ b, f, fit }) => {
  const size = fit.size;
  const lh = 1.22;
  const pad = [0.16 * size, 0.34 * size];
  const txt = (k: Tok[]) => k.map((t) => t.t).join(' ');
  const starts = b.keys.map((k) => tokIn(k[0]));
  const fullW = (k: number) => measure(txt(b.keys[k]), size);
  const leftOf = (k: number) => b.x - 2 * pad[1] - fullW(k);
  const inc = (k: number) => b.keys[k].map((_, j) => measure(txt(b.keys[k].slice(0, j + 1)), size) - (j ? measure(txt(b.keys[k].slice(0, j)), size) : 0));
  const curW = (k: number) => inc(k).reduce((acc, w, j) => acc + w * (j === 0 ? (k === 0 ? prog(f, starts[0] - 1, starts[0] + 5, 'out') : 1) : prog(f, tokIn(b.keys[k][j]) - 1, tokIn(b.keys[k][j]) + 5, 'out')), 0);
  let cur = -1;
  starts.forEach((s, k) => { if (f >= s - 2) cur = k; });
  if (cur < 0) return null;
  let left = leftOf(cur), right = left + 2 * pad[1] + curW(cur);
  if (cur > 0) {
    const a = starts[cur];
    const lO = leftOf(cur - 1), rO = b.x;
    const tG = prog(f, a - 2, a + 1, 'out'), tS = prog(f, a + 1, a + 6, 'out');
    left = left < lO ? lerp(lO, left, tG) : lerp(lO, left, tS);
    right = right > rO ? lerp(rO, right, tG) : lerp(rO, right, tS);
  }
  const labelP = prog(f, starts[0] - 2, starts[0] + 6, 'out');
  const ex = exitStyle(b, f);
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, ...ex }}>
      <div
        style={{
          position: 'absolute', left, top: b.y, width: right - left, height: size * lh + 2 * pad[0],
          background: '#FFFFFF', borderRadius: 4, boxShadow: '0 10px 24px rgba(40,39,35,0.22), 0 2px 4px rgba(40,39,35,0.16)',
          transform: `scaleY(${labelP})`, transformOrigin: 'center bottom', opacity: labelP,
        }}
      />
      {b.keys.map((k, idx) => {
        const s = starts[idx];
        const next = starts[idx + 1];
        if (f < s - 2) return null;
        const e = next !== undefined ? clamp01((f - (next - 2)) / 2.5) : 0;
        if (e >= 1) return null;
        return (
          <div
            key={idx}
            style={{
              position: 'absolute', left: leftOf(idx) + pad[1], top: b.y + pad[0], whiteSpace: 'nowrap', fontFamily: FONT.sf, fontWeight: 700,
              fontSize: size, lineHeight: lh, letterSpacing: TRACK,
              transform: `translateY(${-0.42 * e}em)`, opacity: 1 - e, filter: e > 0 ? `blur(${8 * e}px)` : undefined,
            }}
          >
            {k.map((t, j) => (
              <React.Fragment key={j}>
                {j > 0 ? ' ' : null}
                <Word tok={t} f={f} tn={b.tone} kind="key" lead={idx > 0 && j === 0 ? 1 : 0} />
              </React.Fragment>
            ))}
          </div>
        );
      })}
    </div>
  );
};

/** K3: kepala tetap, kata kunci di slot (lama keluar ke atas, baru masuk dari bawah), lebar slot beranimasi.
 *  r3a: bila kepala + kunci terpanjang melewati lebar aman pada ukuran lantai, kunci pindah ke baris 2 (rata kiri,
 *  ukuran sama). Nada gelap: kepala abu C.inkDarkDim, kunci putih penuh. */
const K3View: React.FC<{ b: K3Block; f: number; fit: Fit }> = ({ b, f, fit }) => {
  const pal = tone(b.tone);
  const size = fit.size;
  const stacked = !!fit.stacked;
  const headInk = b.tone === 'dark' ? pal.dim : undefined;
  const starts = b.keys.map((k) => tokIn(k[0]));
  const txt = (k: Tok[]) => k.map((t) => t.t).join(' ');
  // r7e (B03, review draft): lebar slot mengikuti kata yang SUDAH tampil, bukan seluruh kunci. Tiap token menambah
  // lebarnya dengan ease-out 6 f mulai 1 f sebelum kata masuk; saat kunci berganti, lebar bertahan selebar kunci lama
  // sampai kunci lama habis keluar (3 f), lalu bergerak ke lebar token pertama kunci baru (6 f) — kata lama tidak
  // menjulur keluar kartu. Sebelumnya "bikin software." langsung selebar penuh saat "bikin".
  const inc = (k: number) => b.keys[k].map((_, j) => measure(txt(b.keys[k].slice(0, j + 1)), size) - (j ? measure(txt(b.keys[k].slice(0, j)), size) : 0));
  let cur = -1;
  starts.forEach((s, k) => { if (f >= s - 1) cur = k; });
  let sw = 0;
  if (cur >= 0) {
    const w = inc(cur);
    const prevW = cur > 0 ? measure(txt(b.keys[cur - 1]), size) : 0;
    sw = cur > 0 ? lerp(prevW, w[0], prog(f, starts[cur] + 3, starts[cur] + 9, 'out')) : w[0] * prog(f, starts[cur] - 1, starts[cur] + 5, 'out');
    for (let j = 1; j < w.length; j++) sw += w[j] * prog(f, tokIn(b.keys[cur][j]) - 1, tokIn(b.keys[cur][j]) + 5, 'out');
  }
  const space = stacked || !b.head.length ? 0 : measure(' ', size);
  const pad = b.label ? [0.16 * size, 0.34 * size] : [0, 0];
  const headIn = b.head.length ? tokIn(b.head[0]) : starts[0];
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
        // r7e: kunci lama baru keluar SAAT kunci baru masuk (tumpang-tindih 3 f), bukan habis sebelum kata baru tampil —
        // dulu f119–121 kartu kosong (kata baru opasitas 0 di frame masuknya, kata lama sudah hilang)
        const e = next !== undefined ? prog(f, next, next + 3, 'inOut') : 0;
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
  const ex = exitStyle(b, f);
  return (
    <div style={{ position: 'absolute', left: b.x, top: b.y, ...ex, transform: b.alignRight ? `translateX(-100%) ${ex.transform ?? ''}` : ex.transform }}>
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
  // r4 (KT-1): lebar baris kecil = lebar kata besar, rata sisi yang sama (tanpa geser 0,06em)
  const smallLine = b.small.length ? (
    <div style={{ fontSize: small, fontWeight: 700, lineHeight: 1.15, letterSpacing: TRACK, margin: b.order === 'small-big' ? '0 0 0.06em 0' : '0.16em 0 0 0' }}>
      {words(b.small, f, b.tone)}
    </div>
  ) : null;
  return (
    <div style={{ position: 'absolute', left: b.x, top: b.y, whiteSpace: 'nowrap', fontFamily: FONT.sf, textAlign: b.align ?? 'left', transform: b.align === 'right' ? 'translateX(-100%)' : undefined }}>
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
type Fit = {
  size: number; small?: number; lines?: Tok[][]; stacked?: boolean; sMin?: number;
  /** r4: ukuran per baris (N seimbang) / per kunci (K3 seimbang) */
  sizes?: number[]; keySizes?: number[];
  /** r4: rasio lebar baris terpendek / terpanjang (KT-1), untuk label debug dan laporan */
  ratio?: number;
  /** r5: lebar aman dunia (debug) */
  maxW?: number;
};
const FIT_CACHE = new Map<string, Fit>();
const lineW = (toks: Tok[], size: number, weight = 700, tracking = -0.02) => measure(toks.map((t) => t.t).join(' '), size, weight, FONT.sf, tracking);
/** lebar per 1 px ukuran (tracking ikut ukuran besar ≥ 140 px seperti renderer) */
const w1 = (toks: Tok[], weight = 700, tracking = -0.02) => lineW(toks, 100, weight, tracking) / 100;

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

/** r4 (KT-1) blok seimbang: tiap baris diberi ukuran sendiri sampai lebarnya = W (baris terlebar pada lantainya).
 *  Batas: maxSize (px dunia) dan maxH (tinggi blok, px dunia; cari batas ukuran c dengan bagi dua), lebar aman maxW. */
function evenFit(b: NBlock, nMin: number, kMin: number, maxW: number): Fit {
  const lines = b.lines;
  const lh = b.lh ?? 1.0;
  const ws = lines.map((ln) => w1(ln));
  const floor = lines.map((ln) => Math.max(ln.some((t) => t.accent) ? kMin : nMin, b.size));
  let W = Math.max(...ws.map((w, k) => w * floor[k]));
  if (W > maxW) { console.warn(`[r4] ${b.id}: blok seimbang ${Math.round(W)} > lebar aman ${Math.round(maxW)}`); }
  const sz = (c: number) => ws.map((w, k) => Math.max(floor[k], Math.min(W / w, c, b.maxSize ?? Infinity)));
  let sizes = sz(Infinity);
  const hOf = (ss: number[]) => ss.reduce((a, v) => a + v * lh, 0);
  if (b.maxH && hOf(sizes) > b.maxH) {
    let lo = Math.min(...floor), hi = Math.max(...sizes);
    for (let it = 0; it < 40; it++) { const mid = (lo + hi) / 2; if (hOf(sz(mid)) > b.maxH) hi = mid; else lo = mid; }
    sizes = sz(lo);
  }
  const widths = ws.map((w, k) => w * sizes[k]);
  return { size: Math.max(...sizes), sizes, ratio: Math.min(...widths) / Math.max(...widths) };
}

function computeFit(b: TextBlock, sc: ReturnType<typeof useScreenScale>): Fit {
  const base = b.code === 'K4' ? b.bigSize : b.code === 'UI' ? 0 : b.size;
  if (b.code === 'UI') return { size: base };
  // r4: blok terkunci layar (di luar Stage) = skala 1, supaya lantai + blok seimbang tetap dihitung
  if (!sc) return computeFit0(b, 1, TEXT_FLOOR.n, TEXT_FLOOR.key, b.code === 'N' && b.align === 'right' ? b.x - SAFE.x0 : SAFE.x1 - b.x);
  // seluruh masa tampil blok (kalimat bisa berlanjut di blok lain, jadi tidak dipotong di kata terakhir blok ini)
  const a = blockIn(b);
  const z = Math.max(a + 1, b.until);
  let sMin = Infinity;
  for (let t = a; t < z; t += 2) sMin = Math.min(sMin, sc(t).s);
  sMin = Math.min(sMin, sc(z - 1).s);
  const nMin = TEXT_FLOOR.n / sMin, kMin = TEXT_FLOOR.key / sMin;
  // ruang aman: r5 — lebar dunia terkecil yang muat di safe frame SELAMA blok tampil sesudah kata terakhir masuk
  // (dulu hanya di frame kata terakhir; kamera yang terus mendorong bisa membawa ujung kanan keluar safe frame, B25)
  const ref = Math.min(z - 1, Math.max(...allIn(b)));
  const center = b.code === 'N' && b.align === 'center';
  const right = ((b.code === 'N' || b.code === 'K4') && b.align === 'right') || (b.code === 'K3' && !!b.alignRight);
  let maxW = Infinity;
  for (let t = ref; t < z; t += 2) {
    const r = sc(t);
    const sx = r.x(b.x);
    if (t > ref && (sx < SAFE.x0 || sx > SAFE.x1 - 100)) continue; // jangkar sudah keluar frame (kamera pindah objek)
    const availScreen = center ? 2 * Math.min(sx - SAFE.x0, SAFE.x1 - sx) : right ? sx - SAFE.x0 : SAFE.x1 - sx;
    maxW = Math.min(maxW, Math.max(120, Math.min(availScreen, SAFE.x1 - SAFE.x0)) / r.s);
  }
  if (!Number.isFinite(maxW)) maxW = (SAFE.x1 - SAFE.x0) / sc(ref).s;
  const f0 = computeFit0(b, sMin, nMin, kMin, maxW);
  return { ...f0, sMin, maxW };
}
function computeFit0(b: TextBlock, sMin: number, nMin: number, kMin: number, maxW: number): Fit {
  switch (b.code) {
    case 'N': {
      if (b.lineSizes) {
        const sizes = b.lineSizes.map((v, k) => Math.max(v, b.lines[k].some((t) => t.accent) ? kMin : nMin));
        return { size: Math.max(...sizes), sizes };
      }
      if (b.even) return evenFit(b, nMin, kMin, maxW);
      const size = Math.max(b.size, nMin);
      const wt = b.weight ?? 700;
      const over = b.lines.some((ln) => lineW(ln, size, wt) > maxW);
      if (!over) return { size };
      const lines = balance2(b.lines.flat(), size, wt);
      if (lines.some((ln) => lineW(ln, size, wt) > maxW)) console.warn(`[lantai] ${b.id}: 2 baris pada ${size.toFixed(0)} px masih melewati lebar aman`);
      return { size, lines };
    }
    case 'K3': {
      if (b.even) {
        // kepala ≥ lantai narasi; tiap kunci ≥ lantai kunci → kepala dinaikkan sampai kunci terlebar muat di lebarnya
        const hw = w1(b.head);
        const kw = b.keys.map((k) => w1(k, 700, -0.03));
        let sH = Math.max(b.size, nMin, ...kw.map((w) => (kMin * w) / hw));
        if (hw * sH > maxW) { console.warn(`[r4] ${b.id}: kepala ${Math.round(hw * sH)} > lebar aman ${Math.round(maxW)}`); }
        const W = hw * sH;
        const cap = b.keyMax ?? Infinity;
        const keySizes = kw.map((w) => Math.max(kMin, Math.min(W / w, cap)));
        const ratio = Math.min(...kw.map((w, k) => (w * keySizes[k]) / W));
        return { size: sH, keySizes, ratio };
      }
      const size = Math.max(b.size, kMin);
      const pad = b.label ? 0.68 * size : 0;
      const head = lineW(b.head, size);
      const key = Math.max(...b.keys.map((k) => lineW(k, size))) + (b.tail ? lineW(b.tail, size) + measure(' ', size) : 0);
      return { size, stacked: head + measure(' ', size) + key + pad > maxW };
    }
    case 'K4': {
      // r4 (KT-1): kata besar diskalakan sampai lebarnya = lebar baris kecil; bila kata besar pada lantai 96 sudah lebih
      // lebar, baris kecil yang dinaikkan sampai sama lebar. Keduanya dibatasi lebar aman (tidak di bawah lantai).
      const bw = w1(b.big, 700, -0.03);
      if (!b.small.length) return { size: Math.min(Math.max(b.bigSize, kMin), Math.max(kMin, maxW / bw)) };
      const sw = w1(b.small);
      let small = Math.max(b.bigSize / (b.ratio ?? 2.3), nMin);
      if (b.free) { const sz = Math.max(b.bigSize, kMin); return { size: sz, small: Math.max(sz / (b.ratio ?? 2.3), nMin), ratio: Math.min(sw * small, bw * sz) / Math.max(sw * small, bw * sz) }; }
      // ×1,02: kata besar sedikit lebih lebar dari baris kecil (KT-5 "≥"), sisi bearing huruf besar memakan ±1 %
      let size = (1.02 * sw * small) / bw;
      if (size < kMin) { size = kMin; small = (bw * size) / (1.02 * sw); }
      if (bw * size > maxW) {
        const k = Math.max(maxW / (bw * size), kMin / size, nMin / small);
        if (k > maxW / (bw * size)) console.warn(`[r4] ${b.id}: K4 melewati lebar aman pada lantai`);
        size *= k; small *= k;
      }
      return { size, small, ratio: Math.min(bw * size, sw * small) / Math.max(bw * size, sw * small) };
    }
    case 'J': return { size: Math.max(b.size, kMin) };
    case 'H': return { size: Math.max(b.size, nMin) };
  }
  return { size: 0 };
}

export const TextBlockView: React.FC<{ block: TextBlock }> = ({ block }) => {
  // r5: teks hidup di frame NYATA (words_v3, until timeline baru); kamera adegan dibaca di frame lama W(f)
  const fr = useRealFrame();
  const fs = useCurrentFrame();
  const f = block.sceneTime ? keBaru(fs) : fr;
  const sc0 = useScreenScale();
  const sc = sc0 ? (t: number) => sc0(W(t)) : null;
  if (f < blockIn(block) - 2) return null;
  if (f >= block.until) return null;
  let fit = FIT_CACHE.get(block.id);
  if (!fit) {
    fit = computeFit(block, sc);
    // simpan hanya bila font sudah dimuat (ukuran dari canvas); sebelum itu hitung ulang tiap render
    if (fontsReady()) {
      FIT_CACHE.set(block.id, fit);
      if (FIT_DEBUG) {
        const m = fit.sMin ?? 1;
        const r = (v: number) => Math.round(v * m);
        console.warn(`[fit] ${block.id} size=${r(fit.size)}${fit.sizes ? ' lines=' + fit.sizes.map(r).join('/') : ''}${fit.keySizes ? ' keys=' + fit.keySizes.map(r).join('/') : ''}${fit.small ? ' small=' + r(fit.small) : ''} ratio=${fit.ratio?.toFixed(3) ?? '-'}`);
      }
    }
  }
  const view = viewOf(block, f, fit);
  if (!FIT_DEBUG || !view || !sc) return view;
  // --props='{"fitDebug":true}': label ukuran LAYAR (px) blok di frame ini, untuk QC lantai ukuran
  const s = sc(f).s;
  const scr = (v: number) => (v * s).toFixed(0);
  const tag = `${block.id} ${fit.sizes ? fit.sizes.map(scr).join('/') : scr(fit.size)}${fit.keySizes ? ' k' + fit.keySizes.map(scr).join('/') : ''}${fit.small ? '/' + scr(fit.small) : ''}px min ${(fit.size * (fit.sMin ?? 1)).toFixed(0)}${fit.ratio ? ' r' + fit.ratio.toFixed(2) : ''} w${Math.round(fit.maxW ?? 0)}`;
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
    case 'K3': return block.even ? <K3EvenView b={block} f={f} fit={fit} /> : block.alignRight && block.label && !block.head.length ? <K3CardRight b={block} f={f} fit={fit} /> : <K3View b={block} f={f} fit={fit} />;
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
