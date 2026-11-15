// B09 (Editor B, TASK r2b): wajah F2 "Dan aku termakan kata-kata motivasi." lalu post kutipan di Threads web terang,
// kamera punch-in ke teks post (kartu 63 k7) sampai teks ±9–10 % tinggi frame; like ditekan di akhir (termakan).
import React from 'react';
import { Img, interpolateColors, staticFile, useCurrentFrame } from 'remotion';
import { Stage, Layer } from '../engine/Stage';
import { camPath } from '../engine/camera';
import { TextBlocks } from '../engine/TextLayer';
import { Face } from '../engine/Face';
import { Linen } from '../engine/Surfaces';
import { Cursor } from '../engine/Cursor';
import { C, prog, lerp } from '../engine/theme';
import { wordIn } from '../engine/words';
import { useRealFrame } from '../engine/realframe';
import type { SceneEntry } from '../engine/scenes';
import { ThreadsWindow, ThComposeRow, ThPost, thTheme } from '../ui/Threads';
import { TEXT_ACT2B, F_B09, F_B09_CUT, B09_QUOTE } from './Act2b.text';

const txt = (...beats: string[]) => TEXT_ACT2B.filter((b) => beats.includes(b.beat) && b.code !== 'UI');

// ---------- B09a: wajah T (mulut + tangan, r3a), teks di dinding kanan atas ----------
const faceCam = camPath([{ f: F_B09[0], zoom: 1 }, { f: F_B09_CUT, zoom: 1.04, ease: 'smooth' }], { sigma: 0 });
const B09Face: React.FC = () => (
  <Stage pose={faceCam} bg="#000">
    <Layer z={0} name="L1-L2">
      <Face preset="T" grade="terang" />
    </Layer>
    <Layer z={30} name="L3">
      <TextBlocks blocks={txt('B09')} />
    </Layer>
  </Stage>
);

// ---------- B09b: Threads terang, feed bergulir → post kutipan → punch-in → like ----------
const UI = 1.2;
const WIN = { x: 370, y: 120, w: 1180, h: 880 };
const COLW = 720;
// posisi post kutipan di dunia (diukur dari still B09c): pusat teks kutipan
const QUOTE = { x: 890, y: 514 };
const HEART = { x: 764, y: 569 };
const SCROLL_END = 410; // px isi kolom digulir sampai post kutipan di atas tengah jendela
const F0 = F_B09_CUT;
const LIKE = 717; // 23,9 dtk

const threadsCam = camPath(
  [
    // r8d (audit c02): punch ke post langsung dari frame cut (nyata f535) dan selesai nyata f540–541 (lama 610 → 617,
    // 6 f nyata, ease-out, motion blur Stage) sebelum "mau" (18,08); feed sudah tergulir, post di tengah frame dengan
    // avatar utuh (zoom 4,7, pusat digeser ke kiri dari pusat kutipan)
    { f: F0, x: 960, y: 560, zoom: 1.0, ry: -4 },
    { f: F0 + 7, x: QUOTE.x - 28, y: QUOTE.y + 10, zoom: 4.7, ry: 0, ease: 'out' },
    { f: 664, x: QUOTE.x - 24, y: QUOTE.y + 14, zoom: 4.82, ease: 'smooth' },
    { f: F_B09[1], x: QUOTE.x - 22, y: QUOTE.y + 16, zoom: 4.9, ease: 'smooth' },
  ],
  { sigma: 2 },
);

/** Kata kutipan menyala dari abu ke hitam saat diucapkan. */
const QuoteBody: React.FC<{ f: number }> = () => {
  const f = useRealFrame(); // r5: kata menyala di frame nyata (words_v3), bukan frame adegan yang di-warp
  const t = thTheme('light');
  const words = B09_QUOTE.map((tok, k) => {
    const a = wordIn(tok.i[0]);
    // r8d: sorotan maju 3 f (dulu rata-rata telat 0,15 dtk); kata belum diucapkan #8A8A8A (3,4:1 di putih; dulu ±1,5:1)
    const col = interpolateColors(f, [a - 4, a + 1], ['#8A8A8A', t.text]);
    return (
      <span key={k} style={{ color: col }}>
        {tok.t}
        {k === 4 ? '\n' : k < B09_QUOTE.length - 1 ? ' ' : ''}
      </span>
    );
  });
  return <>{words}</>;
};

const thumbs = ['KBPsHcsl1aY', 'yhC8RcAr9RY'];

const B09Threads: React.FC = () => {
  const f = useCurrentFrame();
  const scroll = SCROLL_END; // r8d: tanpa gulir feed; post kutipan sudah di posisi saat cut
  const likeP = prog(f, LIKE, LIKE + 8, 'out');
  // kursor masuk dari kanan bawah (di dunia, ukuran mengikuti zoom supaya tampak ±70 px)
  const cIn = prog(f, 696, LIKE - 2, 'out');
  const cx = lerp(HEART.x + 70, HEART.x + 4, cIn);
  const cy = lerp(HEART.y + 46, HEART.y + 6, cIn);
  const press = f >= LIKE - 1 && f <= LIKE + 5 ? (f - (LIKE - 1)) / 6 : 0;
  return (
    <Stage pose={threadsCam} bg={C.linen}>
      <Layer z={-300} name="L1">
        <Linen />
      </Layer>
      <Layer z={0} name="L2">
        <div style={{ position: 'absolute', left: WIN.x, top: WIN.y }}>
          <ThreadsWindow mode="light" ui={UI} w={WIN.w} h={WIN.h} colW={COLW} header="For you" scroll={scroll}>
            <ThComposeRow mode="light" ui={UI} />
            <ThPost
              mode="light" ui={UI} w={COLW} user="cuan.ai.id" time="4h"
              media={<Img src={staticFile('yt/mXluYosHxX4.jpg')} style={{ width: 268 * UI * 0.88, height: 151 * UI * 0.88, objectFit: 'cover', borderRadius: 8 * UI }} />}
            />
            <ThPost
              mode="light" ui={UI} w={COLW} user="growth.daily" time="2h"
              media={
                <div style={{ display: 'flex', gap: 6 * UI }}>
                  {thumbs.map((id) => (
                    <Img key={id} src={staticFile(`yt/${id}.jpg`)} style={{ width: 268 * UI * 0.88, height: 151 * UI * 0.88, objectFit: 'cover', borderRadius: 8 * UI }} />
                  ))}
                </div>
              }
            />
            <ThPost mode="light" ui={UI} w={COLW} user="mindset.notes" time="1h" body={<QuoteBody f={f} />} like={likeP} />
            <ThPost
              mode="light" ui={UI} w={COLW} user="buildinpublic.id" time="3h"
              media={<Img src={staticFile('yt/8Lz530r09WU.jpg')} style={{ width: 400 * UI, height: 225 * UI, objectFit: 'cover', borderRadius: 8 * UI }} />}
            />
          </ThreadsWindow>
        </div>
        {/* r8e: kursor masuk dengan fade 4 f (dulu muncul mendadak di nyata f610) */}
        {f >= 696 ? <Cursor x={cx} y={cy} size={16} click={press} opacity={prog(f, 696, 700, 'out')} /> : null}
      </Layer>
    </Stage>
  );
};

export const ACT2B: SceneEntry[] = [
  { id: 'S-B09a', beats: 'B09', from: F_B09[0], to: F_B09_CUT, Comp: B09Face },
  { id: 'S-B09b', beats: 'B09', from: F_B09_CUT, to: F_B09[1], Comp: B09Threads },
];
