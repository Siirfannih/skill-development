import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {Cues, cluster} from '../comp/sound';
import {At, DEPTH, Layer, Stage} from '../lib/stage';
import {C, EASE_OUT, F} from '../lib/theme';
import {seg, wf} from '../lib/timing';
import {KText, prog} from '../comp/text';
import {AppTile, Label, Photo} from '../comp/ui';
import {TweetCard} from '../comp/products';
import {Quote} from './S3';
import {PhraseKey} from '../comp/ktype';
import {measureText} from '@remotion/layout-utils';

const V = (w: string, n = 0) => wf('04_visi', w, n);

/* 4a–4c */
const SIZE = 210;
const LINE = 'Teknologi ini tidak peduli apakah kita skeptis atau tidak.'.split(' ');
// posisi pusat tiap kata diukur dari font sungguhan (bukan perkiraan)
const getWordX = () => {
  const xs: number[] = [];
  let x = 0;
  for (const w of LINE) {
    const {width} = measureText({text: w, fontFamily: 'Inter', fontSize: SIZE, fontWeight: '650', letterSpacing: `${-0.03 * SIZE}px`});
    xs.push(x + width / 2);
    x += width + SIZE * 0.26;
  }
  return xs;
};

const EVO = [
  {src: 'abacus2', label: 'Sempoa'},
  {src: 'apple2', label: 'Apple II · 1977'},
  {src: 'crt', label: 'Macintosh · 1984'},
  {src: 'imac', label: 'iMac · 1998'},
  {src: 'nokia', label: 'Nokia 3310 · 2000'},
  {src: '', label: 'ChatGPT · 2022'},
];
const EW = 640, EH = 440, EG = 720;

const Vision: React.FC<{start: number; len: number}> = ({start, len}) => {
  const fr = useCurrentFrame();
  const g = (x: number) => x - start;
  const onsets = [V('Teknologi'), V('ini'), V('tidak'), V('peduli'), V('Apakah'), V('kita'), V('skeptis'), V('atau'), V('tidak', 1)].map(g);
  const ia = g(V('Ia'));
  const evo = g(V('berevolusi'));
  const lalu = g(V('Lalu'));
  const dulu = g(V('dulu'));
  const masih = g(V('masih'));
  const skr = g(V('sekarang'));
  const wordX = getWordX();
  const LX0 = -wordX[0];
  const camLine = onsets.map((o, i) => ({f: o, x: LX0 + wordX[i], y: 0, s: 0.6, ease: [0.4, 0, 0.6, 1] as const}));
  const EY = 1400;
  const TY = 2900;
  return (
    <Stage
      len={len}
      bg={C.paper}
      keys={[
        {f: 0, x: LX0 + wordX[0] + 300, y: 0, s: 0.6},
        ...camLine,
        {f: ia - 4, x: LX0 + wordX[7], y: 0, s: 0.6},
        {f: ia + 8, x: 0, y: EY, s: 1.25, ease: EASE_OUT},
        {f: evo + 26, x: EG * 5, y: EY, s: 1.0, ease: [0.45, 0, 0.55, 1]},
        {f: lalu + 6, x: EG * 5, y: EY, s: 1.0},
        {f: lalu + 20, x: -380, y: TY - 60, s: 1.18, ease: EASE_OUT},
        {f: masih - 8, x: -380, y: TY - 60, s: 1.22},
        {f: masih + 8, x: 1000, y: TY, s: 0.94, ease: EASE_OUT},
        {f: len, x: 1020, y: TY, s: 0.96},
      ]}
    >
      <Layer depth={DEPTH.MID}>
        {/* 4a: satu baris raksasa sebagai objek */}
        <At x={LX0} y={0} anchor="left">
          <KText
            lines={[LINE.map((t, i) => ({t, f: onsets[i], k: t === 'skeptis' ? ('key' as const) : undefined}))]}
            size={SIZE}
            color={C.ink}
            keyColor={C.blue}
            weight={650}
            align="left"
          />
        </At>
        {/* 4b: evolusi */}
        {EVO.map((e, i) => (
          <At key={i} x={i * EG} y={EY} style={{opacity: prog(fr, ia - 6 + i * 2, ia + 4 + i * 2)}}>
            {e.src ? (
              <Photo src={e.src} w={EW} h={EH} radius={18} />
            ) : (
              <div style={{width: EW, height: EH, borderRadius: 18, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 1px rgba(0,0,0,0.06)'}}>
                <AppTile app="chatgpt" size={200} />
              </div>
            )}
            <Label color="rgba(17,17,17,0.55)" size={22} style={{marginTop: 22, textAlign: 'center'}}>
              {e.label}
            </Label>
          </At>
        ))}
        {/* 4c: dulu vs sekarang */}
        <At x={-380} y={TY + 40}>
          <TweetCard w={860} />
        </At>
        <At x={-380} y={TY - 330} style={{opacity: prog(fr, dulu - 4, dulu + 6)}}>
          <Label color="rgba(17,17,17,0.5)" size={26}>
            2023
          </Label>
        </At>
      </Layer>
      {/* teks berevolusi: terkunci ke layar, di bawah barisan */}
      <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 90}}>
        <KText lines={[[{t: 'Ia', f: ia}, {t: 'akan', f: g(V('akan'))}, {t: 'terus', f: g(V('terus'))}, {t: 'berevolusi.', f: evo, k: 'key'}]]} size={78} color={C.ink} keyColor={C.ink} exitF={lalu - 2} />
      </AbsoluteFill>
      <Layer depth={DEPTH.TXT}>
        <At x={-380 * DEPTH.TXT} y={TY * DEPTH.TXT - 330}>
          <KText
            lines={[[{t: 'apakah', f: g(V('apakah', 1))}, {t: 'visi', f: g(V('visi'))}, {t: 'AI', f: g(V('AI'))}, {t: 'yang', f: g(V('yang'))}, {t: 'dulu', f: dulu, k: 'key'}]]}
            size={70}
            color={C.ink}
            keyColor={C.ink}
            dimColor={C.inkSoft}
          />
        </At>
      </Layer>
      <PhraseKey
        phrase={[{t: 'masih', f: masih}, {t: 'sama', f: g(V('sama'))}, {t: 'dengan', f: g(V('dengan'))}, {t: 'yang', f: g(V('yang', 1))}]}
        keyText="SEKARANG?"
        keyAt={skr}
        dark={false}
        keySize={200}
      />
      <Cues list={[{at: 0, s: 'thin', db: -12}, {at: onsets[6], s: 'thock', db: -10}, {at: ia - 4, s: 'move1', db: -10}, ...cluster(ia - 6, 6, 2, -19), {at: evo, s: 'move2', db: -14}, {at: lalu + 6, s: 'move3', db: -10}, {at: dulu, s: 'thock2', db: -12}, {at: masih + 2, s: 'move1', db: -10}, {at: skr - 7, s: 'thin', db: -12}, {at: skr, s: 'thock', db: -8}]} />
    </Stage>
  );
};

const ALTMAN: [string, number][] = [
  ['Ini', 0.05], ['benar-benar', 0.5], ['perusahaan', 0.95], ['satu', 1.3], ['orang', 1.45], ['bernilai', 1.65], ['satu', 1.85], ['miliar', 1.95], ['dolar,', 2.1],
  ['sejauh', 2.95], ['yang', 3.15], ['saya', 3.3], ['tahu.', 3.45],
];

export const S4: React.FC<{start: number; end: number}> = ({start, end}) => {
  const a = seg('altman');
  return (
    <>
      <Sequence from={0} durationInFrames={a.s - start}>
        <Vision start={start} len={a.s - start} />
      </Sequence>
      <Sequence from={a.s - start} durationInFrames={end - a.s}>
        <Quote
          len={end - a.s}
          src="altman_crop.mp4"
          startFrom={2}
          w={600}
          h={750}
          label="Sam Altman"
          sub="CEO OpenAI · Mostly Human, Laurie Segall"
          words={ALTMAN}
          split={9}
          bg={C.paper}
          dark={false}
        />
      </Sequence>
    </>
  );
};
