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
    { f: F0, x: 960, y: 560, zoom: 1.0, ry: -7 },
    { f: F0 + 26, x: 960, y: 548, zoom: 1.06, ry: 0, ease: 'out' },
    { f: 664, x: QUOTE.x + 8, y: QUOTE.y + 16, zoom: 5.3, ease: 'inOut' },
    { f: F_B09[1], x: QUOTE.x + 6, y: QUOTE.y + 19, zoom: 5.42, ease: 'smooth' },
  ],
  { sigma: 2 },
);

/** Kata kutipan menyala dari abu ke hitam saat diucapkan. */
const QuoteBody: React.FC<{ f: number }> = ({ f }) => {
  const t = thTheme('light');
  const words = B09_QUOTE.map((tok, k) => {
    const a = wordIn(tok.i[0]);
    const col = interpolateColors(f, [a - 1, a + 4], [t.wordDim, t.text]);
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
  const scroll = lerp(0, SCROLL_END, prog(f, F0, F0 + 24, 'out'));
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
        {f >= 696 ? <Cursor x={cx} y={cy} size={16} click={press} /> : null}
      </Layer>
    </Stage>
  );
};

export const ACT2B: SceneEntry[] = [
  { id: 'S-B09a', beats: 'B09', from: F_B09[0], to: F_B09_CUT, Comp: B09Face },
  { id: 'S-B09b', beats: 'B09', from: F_B09_CUT, to: F_B09[1], Comp: B09Threads },
];
