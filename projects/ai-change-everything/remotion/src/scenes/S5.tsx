import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {Cues, cluster} from '../comp/sound';
import {At, DEPTH, Layer, Stage} from '../lib/stage';
import {C, EASE_OUT, F} from '../lib/theme';
import {TOTAL, wf} from '../lib/timing';
import {Counter, KText, prog} from '../comp/text';
import {AppTile, Label, Photo} from '../comp/ui';
import {Figure} from '../comp/figure';
import {PhraseKey} from '../comp/ktype';
import {AnalyticsCard, RevenueChart} from '../comp/products';

const T = (w: string, n = 0) => wf('05_tidakterlihat', w, n);
const rp = (n: number) => '$' + Math.round(n).toLocaleString('id-ID');

/* barisan builder (stickman 2,5D): baris depan → belakang, skala & redup = kedalaman */
const FW = 560;
const ROWS = [
  {y: 230, s: 1, dim: 0, xs: [-1240, -620, 0, 620, 1240]},
  {y: -10, s: 0.74, dim: 0.35, xs: [-1550, -930, -310, 310, 930, 1550]},
  {y: -190, s: 0.55, dim: 0.6, xs: [-1860, -1240, -620, 0, 620, 1240, 1860]},
];

const Claim: React.FC<{start: number; len: number}> = ({start, len}) => {
  const fr = useCurrentFrame();
  const g = (x: number) => x - start;
  const satu = g(T('1'));
  const katanya = g(T('katanya'));
  const sudah = g(T('sudah'));
  const di = g(T('Bisaat'));
  const banyak = g(T('banyak'));
  const memakai = g(T('memakai'));
  const membangun = g(T('membangun'));
  const dan = g(T('dan'));
  const dipakai = g(T('dipakai'));
  const lahirEnd = g(T('lahir')) + 12;
  const photoIn = prog(fr, lahirEnd - 2, lahirEnd + 10);
  const gridIn = prog(fr, di - 4, banyak + 4);
  const dimGrid = interpolate(fr, [membangun - 6, membangun + 4, dan - 4, dan + 4], [0, 0.86, 0.86, 0.97], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const statIn = prog(fr, membangun - 2, membangun + 10);
  const statOut = prog(fr, dan - 6, dan + 2, 'in');
  const anaIn = prog(fr, dan, dan + 10);
  const anaOut = prog(fr, dipakai - 6, dipakai + 2, 'in');
  const chartIn = prog(fr, dipakai, dipakai + 6);
  return (
    <Stage
      len={len}
      bg={C.black}
      keys={[
        {f: 0, x: 40, y: 230, s: 1.7},
        {f: di - 2, x: 40, y: 230, s: 1.78},
        {f: banyak + 14, x: 0, y: 40, s: 0.62, ease: EASE_OUT},
        {f: membangun, x: 0, y: 40, s: 0.6},
        {f: len, x: 0, y: 40, s: 0.58},
      ]}
    >
      <Layer depth={DEPTH.MID}>
        {/* builder lain: barisan meja yang menjauh (2,5D), semua mengetik dengan tools yang sama */}
        {ROWS.flatMap((r, ri) =>
          r.xs.map((x, xi) => {
            const isMain = ri === 0 && x === 0;
            const d = Math.abs(xi - (r.xs.length - 1) / 2) + ri;
            const p = isMain ? photoIn : prog(fr, di - 4 + d * 3, di + 8 + d * 3) * gridIn;
            const tileP = prog(fr, memakai + ((xi + ri) % 5), memakai + 6 + ((xi + ri) % 5));
            return (
              <At key={`${ri}-${xi}`} x={x * r.s} y={r.y} style={{opacity: p * (1 - 0.85 * anaIn), zIndex: 10 - ri}}>
                <Figure
                  w={FW * r.s}
                  seed={ri * 7 + xi}
                  lit={isMain ? 1 - dimGrid * 0.8 : 0}
                  dim={Math.min(1, r.dim + dimGrid * 0.85)}
                  screen="ai"
                  badge={tileP * (1 - dimGrid * 0.8)}
                />
              </At>
            );
          }),
        )}
      </Layer>
      {/* klaim $1 miliar */}
        {/* klaim $1 miliar: di atas kartu */}
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: 1 - prog(fr, lahirEnd - 6, lahirEnd + 2, 'in'), transform: `translateY(${-prog(fr, lahirEnd - 6, lahirEnd + 2, 'in') * 60}px)`}}>
          <div style={{textAlign: 'center'}}>
            <KText
              lines={[[{t: 'Perusahaan', f: 0, k: 'dim'}, {t: 'satu', f: g(T('satu'))}, {t: 'orang', f: g(T('orang'))}, {t: 'bernilai', f: g(T('bernilai')), k: 'dim'}]]}
              size={58}
              color={C.white}
              dimColor={C.whiteDim}
              weight={500}
            />
            <div
              style={{
                marginTop: 10,
                fontFamily: F.sans,
                fontWeight: 700,
                fontSize: 176,
                letterSpacing: '-0.04em',
                color: C.white,
                fontVariantNumeric: 'tabular-nums',
                opacity: fr >= satu ? 1 : 0,
                transform: `scale(${interpolate(fr, [satu, satu + 4, satu + 8], [1.5, 0.97, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})})`,
              }}
            >
              <Counter from={0} to={1e9} f={satu} dur={24} fmt={rp} />
            </div>
            <div style={{marginTop: -6}}>
              <KText lines={[[{t: 'katanya,', f: katanya, k: 'dim'}, {t: 'sudah', f: sudah}, {t: 'lahir.', f: g(T('lahir'))}]]} size={64} color={C.white} />
            </div>
          </div>
        </AbsoluteFill>
      {/* bukti: layar terkunci di atas grid yang diredupkan */}
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div style={{opacity: statIn * (1 - statOut), transform: `translateY(${(1 - statIn) * 40 - statOut * 40}px)`, textAlign: 'center'}}>
          <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 260, letterSpacing: '-0.05em', color: C.white, lineHeight: 1}}>
            +<Counter from={0} to={84} f={membangun} dur={18} fmt={(n) => `${Math.round(n)}%`} />
          </div>
          <div style={{fontFamily: F.sans, fontSize: 40, color: C.white, marginTop: 18, fontWeight: 500}}>app baru diajukan ke App Store dalam satu kuartal</div>
          <Label color="rgba(255,255,255,0.5)" size={20} style={{marginTop: 22}}>
            Q1 2026 · The Information via The Next Web
          </Label>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div style={{opacity: anaIn * (1 - anaOut), transform: `scale(${0.94 + 0.06 * anaIn})`}}>
          <AnalyticsCard w={980} h={460} f0={dan} />
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: chartIn}}>
        <RevenueChart w={1400} h={640} f0={dipakai} />
      </AbsoluteFill>
      <Cues list={[{at: 0, s: 'thud', db: -6}, ...cluster(satu, 7, 3, -16, 'tick'), {at: satu + 22, s: 'thock', db: -8}, {at: lahirEnd, s: 'click', db: -12}, {at: lahirEnd, s: 'pop', db: -16}, {at: di - 2, s: 'move3', db: -8}, ...cluster(di + 2, 8, 2, -23), ...cluster(memakai, 6, 2, -18), {at: membangun - 2, s: 'impact', db: -8}, ...cluster(membangun, 5, 3, -20, 'tick'), {at: dan, s: 'pop', db: -12}, ...cluster(dipakai, 6, 3, -16)]} />
    </Stage>
  );
};

/* 5d · Mereka juga satu orang */
const Them: React.FC<{start: number; len: number}> = ({start, len}) => {
  const g = (x: number) => x - start;
  return (
    <Stage len={len} bg={C.black} keys={[{f: 0, x: 70, y: 60, s: 0.98}, {f: len, x: 70, y: 50, s: 1.06}]}>
      <Layer depth={DEPTH.MID}>
        <At x={0} y={-60}>
          <Figure w={820} pose="slump" screen="zero" seed={3} />
        </At>
      </Layer>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 70}}>
        <KText
          lines={[[{t: 'Mereka', f: g(T('Mereka'))}, {t: 'juga', f: g(T('juga'))}, {t: 'satu', f: g(T('satu', 1))}, {t: 'orang.', f: g(T('orang', 2)), k: 'key'}]]}
          size={84}
          color={C.white}
          keyColor={C.white}
          weight={600}
          exitF={len - 6}
        />
      </AbsoluteFill>
      <Cues list={[{at: 0, s: 'swell', db: -12}, {at: 2, s: 'heart', db: -12}, {at: 24, s: 'heart', db: -15}]} />
    </Stage>
  );
};

/* 5e · apa perbedaan mereka? — teks dulu, lalu dua sosok identik: satu di bawah lampu, satu di gelap */
const Diff: React.FC<{start: number; len: number}> = ({start, len}) => {
  const fr = useCurrentFrame();
  const g = (x: number) => x - start;
  const beda = g(T('perbedaan'));
  const reveal = g(T('mereka', 1)) + 14;
  const vis = prog(fr, reveal - 4, reveal + 10);
  const lamp = prog(fr, reveal + 6, reveal + 22);
  return (
    <Stage
      len={len}
      bg={C.black}
      keys={[
        {f: 0, x: 0, y: 40, s: 1.4},
        {f: reveal - 4, x: 0, y: 40, s: 1.4},
        {f: reveal + 16, x: 0, y: 40, s: 0.86, ease: EASE_OUT},
        {f: len, x: 0, y: 40, s: 0.9},
      ]}
    >
      <Layer depth={DEPTH.MID}>
        {[
          {x: -560, v: '$1.000.000.000', lit: true},
          {x: 560, v: '$0', lit: false},
        ].map((c) => (
          <At key={c.x} x={c.x} y={40} style={{opacity: vis}}>
            <Figure w={760} seed={c.lit ? 1 : 4} lit={c.lit ? lamp : 0} dim={c.lit ? 0 : 0.45} screen={c.lit ? 'ai' : 'zero'} />
            <div style={{marginTop: -30, textAlign: 'center', fontFamily: F.sans, fontWeight: 700, fontSize: 64, letterSpacing: '-0.035em', color: c.lit ? C.white : 'rgba(255,255,255,0.45)', opacity: prog(fr, reveal + 10, reveal + 20)}}>
              {c.v}
            </div>
          </At>
        ))}
      </Layer>
      <PhraseKey
        phrase={[{t: 'Jadi,', f: g(T('jadi'))}, {t: 'apa', f: g(T('apa'))}]}
        keyText="PERBEDAAN MEREKA?"
        keyAt={beda}
        dark
        keySize={170}
        exitF={reveal - 8}
      />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-start', paddingTop: 80, opacity: prog(fr, reveal + 14, reveal + 26)}}>
        <div style={{fontFamily: F.sans, fontWeight: 600, fontSize: 54, letterSpacing: '-0.025em', color: C.white}}>Jadi, apa perbedaan mereka?</div>
      </AbsoluteFill>
      <Cues list={[{at: g(T('jadi')), s: 'pop', db: -18}, {at: beda - 7, s: 'thin', db: -12}, {at: beda, s: 'thock', db: -8}, {at: reveal - 4, s: 'move3', db: -10}, {at: reveal + 6, s: 'click', db: -12}, {at: reveal + 10, s: 'pop', db: -16}, {at: reveal + 13, s: 'pop', db: -18}]} />
    </Stage>
  );
};

export const S5: React.FC<{start: number}> = ({start}) => {
  const them = T('Mereka') - 4;
  const diff = T('jadi') - 4;
  return (
    <>
      <Sequence from={0} durationInFrames={them - start}>
        <Claim start={start} len={them - start} />
      </Sequence>
      <Sequence from={them - start} durationInFrames={diff - them}>
        <Them start={them} len={diff - them} />
      </Sequence>
      <Sequence from={diff - start} durationInFrames={TOTAL - diff}>
        <Diff start={diff} len={TOTAL - diff} />
      </Sequence>
    </>
  );
};
