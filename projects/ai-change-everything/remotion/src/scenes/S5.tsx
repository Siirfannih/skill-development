import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {At, DEPTH, Layer, Stage} from '../lib/stage';
import {C, EASE_OUT, F} from '../lib/theme';
import {TOTAL, wf} from '../lib/timing';
import {Counter, KText, prog} from '../comp/text';
import {AppTile, Label, Photo} from '../comp/ui';
import {AnalyticsCard, RevenueChart} from '../comp/products';

const T = (w: string, n = 0) => wf('05_tidakterlihat', w, n);
const rp = (n: number) => '$' + Math.round(n).toLocaleString('id-ID');

/* grid builder: 1 kartu utama di tengah + 14 lainnya */
const GW = 560, GH = 360, GXS = 620, GYS = 420;
const GRID_SRC = ['night1', 'hack1', 'night3', 'night5', 'hack4', 'night2', 'hack3', 'hack2', 'sil2', 'night3', 'hack1', 'night5', 'night2', 'hack4'];

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
        {f: 0, x: 0, y: 0, s: 1.6},
        {f: di - 2, x: 0, y: 0, s: 1.66},
        {f: banyak + 12, x: 0, y: 0, s: 0.56, ease: EASE_OUT},
        {f: membangun, x: 0, y: 0, s: 0.54},
        {f: len, x: 0, y: 0, s: 0.52},
      ]}
    >
      <Layer depth={DEPTH.MID}>
        {/* grid builder lain */}
        {GRID_SRC.map((src, i) => {
          const idx = i >= 7 ? i + 1 : i; // lewati sel tengah
          const cx = (idx % 5) - 2;
          const cy = Math.floor(idx / 5) - 1;
          const d = Math.hypot(cx, cy);
          const p = prog(fr, di - 4 + d * 3, di + 8 + d * 3);
          const tileP = prog(fr, memakai + (i % 5), memakai + 6 + (i % 5));
          return (
            <At key={i} x={cx * GXS} y={cy * GYS} style={{opacity: p * gridIn * (1 - 0.8 * anaIn)}}>
              <div style={{position: 'relative'}}>
                <Photo src={src} w={GW} h={GH} radius={14} dim={0.25 + dimGrid * 0.7} />
                <div style={{position: 'absolute', left: 18, bottom: 18, display: 'flex', gap: 10, opacity: tileP * (1 - dimGrid * 0.7), transform: `scale(${0.85 + 0.15 * tileP})`, transformOrigin: '0 100%'}}>
                  <AppTile app="chatgptLight" size={64} />
                  <AppTile app="claude" size={64} />
                  <AppTile app="gemini" size={64} />
                </div>
              </div>
            </At>
          );
        })}
        {/* kartu builder utama */}
        <At x={0} y={0} style={{opacity: photoIn * (1 - 0.8 * anaIn), transform: `translate(-50%,-50%) scale(${0.94 + 0.06 * photoIn})`}}>
          <div style={{position: 'relative'}}>
            <Photo src="night4" w={GW} h={GH} radius={14} dim={0.05 + dimGrid * 0.9} />
            <div style={{position: 'absolute', left: 18, bottom: 18, display: 'flex', gap: 10, opacity: prog(fr, memakai, memakai + 6) * (1 - dimGrid * 0.7)}}>
              <AppTile app="chatgptLight" size={64} />
              <AppTile app="claude" size={64} />
              <AppTile app="gemini" size={64} />
            </div>
          </div>
        </At>
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
              <KText lines={[[{t: 'katanya,', f: katanya, k: 'serif'}, {t: 'sudah', f: sudah}, {t: 'lahir.', f: g(T('lahir'))}]]} size={64} color={C.white} />
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
    </Stage>
  );
};

/* 5d · Mereka juga satu orang */
const Them: React.FC<{start: number; len: number}> = ({start, len}) => {
  const g = (x: number) => x - start;
  return (
    <Stage len={len} bg={C.black} keys={[{f: 0, x: 0, y: 0, s: 1.08}, {f: len, x: 0, y: 0, s: 1.0}]}>
      <Layer depth={DEPTH.BG}>
        <At>
          <Photo src="sil1" w={2000} h={1200} pos="50% 40%" dim={0.15} />
        </At>
      </Layer>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 150}}>
        <KText
          lines={[[{t: 'Mereka', f: g(T('Mereka'))}, {t: 'juga', f: g(T('juga'))}, {t: 'satu', f: g(T('satu', 1))}, {t: 'orang.', f: g(T('orang', 2)), k: 'key'}]]}
          size={92}
          color={C.white}
          keyColor={C.white}
          weight={600}
          exitF={len - 6}
        />
      </AbsoluteFill>
    </Stage>
  );
};

/* 5e · apa perbedaan mereka? */
const Diff: React.FC<{start: number; len: number}> = ({start, len}) => {
  const fr = useCurrentFrame();
  const g = (x: number) => x - start;
  const apa = g(T('apa'));
  const beda = g(T('perbedaan'));
  const spot = prog(fr, 4, 20);
  return (
    <Stage
      len={len}
      bg={C.black}
      keys={[
        {f: 0, x: -520, y: 0, s: 1.25},
        {f: apa - 4, x: -520, y: 0, s: 1.28},
        {f: beda + 6, x: 0, y: 60, s: 0.92, ease: EASE_OUT},
        {f: len, x: 0, y: 60, s: 0.9},
      ]}
    >
      <Layer depth={DEPTH.MID}>
        {[
          {x: -520, src: 'night4', v: '$1.000.000.000', lit: true},
          {x: 520, src: 'night5', v: '$0', lit: false},
        ].map((c) => (
          <At key={c.x} x={c.x} y={60}>
            <div style={{position: 'relative'}}>
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: -260,
                  width: 700,
                  height: 900,
                  transform: 'translateX(-50%)',
                  background: c.lit ? `radial-gradient(ellipse at 50% 0%, rgba(255,255,255,${0.22 * spot}) 0%, rgba(255,255,255,0) 60%)` : 'none',
                }}
              />
              <Photo src={c.src} w={620} h={620} radius={18} pos="50% 40%" dim={c.lit ? 0.05 : 0.45} />
              <div style={{marginTop: 30, textAlign: 'center', fontFamily: F.sans, fontWeight: 600, fontSize: 56, letterSpacing: '-0.03em', color: c.lit ? C.white : 'rgba(255,255,255,0.5)'}}>
                {c.v}
              </div>
            </div>
          </At>
        ))}
      </Layer>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-start', paddingTop: 70}}>
        <KText
          lines={[[{t: 'Jadi,', f: g(T('jadi')), k: 'dim'}, {t: 'apa', f: apa}, {t: 'perbedaan', f: beda, k: 'keyserif'}, {t: 'mereka?', f: g(T('mereka', 1))}]]}
          size={84}
          color={C.white}
          keyColor={C.white}
          dimColor={C.whiteDim}
        />
      </AbsoluteFill>
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
