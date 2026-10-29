import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {At, DEPTH, Layer, Stage} from '../lib/stage';
import {C, EASE_OUT, F} from '../lib/theme';
import {seg, wf} from '../lib/timing';
import {KText, Wd, prog} from '../comp/text';
import {AppTile, Label, Photo} from '../comp/ui';
import {BookingForm, ClaudeUI, ClipCard, EditorUI, WhatsAppUI} from '../comp/products';

/* 3a–3c · agent bekerja sendiri → klon → tiga pekerjaan */
const Reality: React.FC<{start: number; len: number}> = ({start, len}) => {
  const fr = useCurrentFrame();
  const g = (x: number) => x - start;
  const k = (w: string, n = 0) => g(wf('03_kenyataan', w, n));
  const tapi = 0;
  const sek = k('sekedar');
  const cepat = k('cepat');
  const mk = k('mengkloning');
  const cs = k('customer');
  const ve = k('video');
  const eb = k('sampai');
  const ROW = 1760;
  return (
    <Stage
      len={len}
      bg={C.black}
      keys={[
        {f: 0, x: 0, y: 0, s: 1},
        {f: k('kita') - 4, x: 0, y: 0, s: 1},
        {f: k('kita') + 12, x: 0, y: 120, s: 1.0, ease: EASE_OUT},
        {f: mk - 10, x: 0, y: 150, s: 1.05},
        {f: mk + 2, x: 0, y: 1900, s: 1.0, ease: EASE_OUT},
        {f: cs - 10, x: 0, y: 1920, s: 1.04},
        {f: cs + 4, x: 0, y: 3000, s: 0.9, ease: EASE_OUT},
        {f: ve - 4, x: 0, y: 3000, s: 0.92},
        {f: ve + 8, x: ROW, y: 3000, s: 0.9, ease: EASE_OUT},
        {f: eb - 2, x: ROW, y: 3000, s: 0.92},
        {f: eb + 10, x: ROW * 2, y: 3000, s: 0.9, ease: EASE_OUT},
        {f: len, x: ROW * 2, y: 3000, s: 0.95},
      ]}
    >
      <Layer depth={DEPTH.MID}>
        {/* formulir diisi agent */}
        <At x={0} y={420} style={{opacity: prog(fr, k('kita') - 2, k('kita') + 8)}}>
          <BookingForm w={1080} h={640} f0={k('memakai')} />
        </At>
        {/* klon: foto builder + dua salinan tembus pandang dengan tile AI */}
        {[-1, 1, 0].map((d) => {
          const p = d === 0 ? 1 : prog(fr, mk + 2, mk + 16);
          return (
            <At key={d} x={d * 420 * p} y={1960} style={{opacity: d === 0 ? 1 : 0.38 * p, zIndex: d === 0 ? 3 : 1}}>
              <Photo src="night5" w={560} h={700} radius={18} pos="50% 30%" />
            </At>
          );
        })}
        {[
          {d: -1, app: 'chatgptLight'},
          {d: 1, app: 'claude'},
        ].map((o, i) => {
          const p = prog(fr, mk + 10 + i * 4, mk + 20 + i * 4);
          return (
            <At key={o.app} x={o.d * 420} y={1960 + 300} style={{opacity: p, transform: `translate(-50%,-50%) scale(${0.8 + 0.2 * p})`, zIndex: 4}}>
              <AppTile app={o.app as any} size={104} />
            </At>
          );
        })}
        {/* tiga pekerjaan */}
        <At x={0} y={3000}>
          <WhatsAppUI
            w={760}
            h={900}
            f0={cs - 4}
            msgs={[
              {me: false, t: 'Kak, masih ada kamar untuk tanggal 12?', time: '21.04'},
              {me: true, t: 'Masih ada, Kak. Untuk berapa orang dan berapa malam?', time: '21.04', auto: true},
              {me: false, t: '2 orang, 1 malam ya', time: '21.05'},
              {me: true, t: 'Siap. Totalnya Rp850.000, link pembayaran saya kirim ya.', time: '21.05', auto: true},
            ]}
          />
        </At>
        <At x={ROW} y={3000}>
          <EditorUI w={1440} h={860} f0={ve} />
        </At>
        <At x={ROW * 2} y={3000}>
          <ClaudeUI
            w={1300}
            h={860}
            f0={eb}
            prompt="Rekap order minggu ini, kirim invoice ke semua pelanggan, lalu update stok."
            steps={['Rekap 48 order minggu ini', 'Invoice terkirim ke 31 pelanggan', 'Stok diperbarui di spreadsheet']}
          />
        </At>
        {[
          {x: 0, t: 'Customer service', f: cs},
          {x: ROW, t: 'Video editor', f: ve},
          {x: ROW * 2, t: 'Eksekutor bisnis', f: eb},
        ].map((l) => (
          <At key={l.t} x={l.x} y={3000 + 500} style={{opacity: prog(fr, l.f, l.f + 8)}}>
            <Label color="rgba(255,255,255,0.75)" size={30}>
              {l.t}
            </Label>
          </At>
        ))}
      </Layer>
      <Layer depth={DEPTH.TXT}>
        <At x={0} y={0}>
          <KText lines={[[{t: 'Tapi', f: tapi}, {t: 'hari', f: k('hari')}, {t: 'ini,', f: k('ini')}]]} size={64} color={C.whiteDim} style={{marginBottom: 150}} exitF={k('kita') - 4} />
        </At>
        <At x={0} y={-110}>
          <KText
            lines={[
              [{t: 'tidak', f: k('tidak')}, {t: 'lagi', f: k('lagi')}, {t: 'sekedar', f: sek, k: 'keyserif'}],
              [{t: 'lebih', f: k('lebih')}, {t: 'cepat.', f: cepat, k: 'key'}],
            ]}
            size={96}
            color={C.whiteDim}
            keyColor={C.white}
            weight={650}
            exitF={mk - 12}
          />
        </At>
        <At x={0} y={1900 * DEPTH.TXT - 400}>
          <KText
            lines={[[{t: 'mengkloning', f: mk, k: 'keyserif'}, {t: 'diri', f: k('diri')}, {t: 'kita', f: k('kita', 2)}, {t: 'sendiri.', f: k('sendiri')}]]}
            size={84}
            color={C.white}
            keyColor={C.white}
            exitF={cs - 6}
          />
        </At>
      </Layer>
    </Stage>
  );
};

/* 3d · klip Jensen Huang */
const JENSEN: [string, number][] = [
  ['Kamu', 0.1], ['tidak', 0.35], ['akan', 0.55], ['kehilangan', 0.75], ['pekerjaan', 1.2], ['karena', 1.7], ['AI,', 2.05],
  ['tetapi', 2.45], ['karena', 2.75], ['orang', 3.4], ['yang', 3.6], ['memakai', 3.75], ['AI.', 4.05],
];
export const Quote: React.FC<{
  len: number;
  src: string;
  startFrom: number;
  w: number;
  h: number;
  label: string;
  sub: string;
  words: [string, number][];
  split: number;
  bg: string;
  dark: boolean;
}> = ({len, src, startFrom, w, h, label, sub, words, split, bg, dark}) => {
  const fr = useCurrentFrame();
  const inP = prog(fr, 0, 12);
  const toWd = (arr: [string, number][]): Wd[] => arr.map(([t, s]) => ({t, f: Math.round(s * 30)}));
  return (
    <Stage len={len} bg={bg} keys={[{f: 0, x: 0, y: 0, s: 1.04}, {f: 12, x: 0, y: 0, s: 1.0, ease: EASE_OUT}, {f: len, x: 0, y: 0, s: 1.03}]}>
      <Layer depth={DEPTH.MID}>
        <At x={0} y={-90} style={{filter: `blur(${(1 - inP) * 14}px)`, transform: `translate(-50%,-50%) scale(${1.06 - 0.06 * inP})`}}>
          <ClipCard src={src} w={w} h={h} startFrom={startFrom} />
        </At>
        <At x={0} y={-90 + h / 2 + 44} style={{opacity: prog(fr, 6, 16), textAlign: 'center'}}>
          <div style={{fontFamily: F.sans, fontWeight: 600, fontSize: 30, color: dark ? '#fff' : C.ink}}>{label}</div>
          <Label color={dark ? 'rgba(255,255,255,0.5)' : 'rgba(17,17,17,0.5)'} size={19} style={{marginTop: 8}}>
            {sub}
          </Label>
        </At>
      </Layer>
      <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 70}}>
        <KText lines={[toWd(words.slice(0, split)), toWd(words.slice(split))]} size={40} color={dark ? '#fff' : C.ink} weight={500} tracking={-0.01} lineGap={1.25} />
      </AbsoluteFill>
    </Stage>
  );
};

export const S3: React.FC<{start: number}> = ({start}) => {
  const j = seg('jensen');
  const end = wf('04_visi', 'Teknologi') - 3;
  return (
    <>
      <Sequence from={0} durationInFrames={j.s - start}>
        <Reality start={start} len={j.s - start} />
      </Sequence>
      <Sequence from={j.s - start} durationInFrames={end - j.s}>
        <Quote
          len={end - j.s}
          src="jensen_v.mp4"
          startFrom={2}
          w={1180}
          h={664}
          label="Jensen Huang"
          sub="CEO NVIDIA · Milken Institute Global Conference 2025"
          words={JENSEN}
          split={7}
          bg={C.black}
          dark
        />
      </Sequence>
    </>
  );
};
