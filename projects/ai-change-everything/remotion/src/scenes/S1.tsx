import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {At, DEPTH, Layer, Stage} from '../lib/stage';
import {C, EASE_IN, EASE_OUT} from '../lib/theme';
import {wf} from '../lib/timing';
import {KText, prog} from '../comp/text';
import {AppTile, Photo} from '../comp/ui';
import {ChatGPTUI} from '../comp/products';

/* 1a–1b · roket → grid perlombaan → zoom-through ke tile AI */
const TW = 600, TH = 338, GX = 640, GY = 189;
const TILES: {x: number; y: number; kind: 'photo' | 'ai'; src?: string; pos?: string}[] = [
  {x: -GX, y: -GY, kind: 'photo', src: 'hack1'},
  {x: 0, y: -GY, kind: 'photo', src: 'rocket3', pos: '62% 60%'},
  {x: GX, y: -GY, kind: 'photo', src: 'night3'},
  {x: -GX, y: GY, kind: 'photo', src: 'night4'},
  {x: 0, y: GY, kind: 'photo', src: 'hack2', pos: '50% 30%'},
  {x: GX, y: GY, kind: 'ai'},
];

const Race: React.FC<{zoomIn: number}> = ({zoomIn}) => {
  const fr = useCurrentFrame();
  const b1 = wf('01_hook', 'kita', 1); // "kita sedang"
  const kunci = wf('01_hook', 'berlomba');
  const pullA = kunci - 9, pullB = Math.min(kunci + 9, zoomIn - 2);
  const len = zoomIn + 14;
  const ignite = prog(fr, 0, 10);
  const dimGrid = interpolate(fr, [pullA, pullB, zoomIn - 1, zoomIn + 5], [0, 0.74, 0.74, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Stage
      len={len}
      bg={C.black}
      keys={[
        {f: 0, x: 0, y: -GY, s: 3.3},
        {f: pullA, x: 0, y: -GY, s: 3.45, ease: [0.3, 0, 0.7, 1]},
        {f: pullB, x: 0, y: 0, s: 0.93, ease: EASE_OUT},
        {f: zoomIn, x: GX * 0.2, y: GY * 0.2, s: 0.95},
        {f: zoomIn + 13, x: GX - 138, y: GY, s: 26, ease: EASE_IN},
      ]}
    >
      <Layer depth={DEPTH.MID}>
        {TILES.map((t, i) => (
          <At key={i} x={t.x} y={t.y}>
            {t.kind === 'photo' ? (
              <Photo
                src={t.src!}
                w={TW}
                h={TH}
                radius={10}
                pos={t.pos}
                dim={t.src === 'rocket3' ? Math.max(dimGrid, 0.3 + (1 - ignite) * 0.7) : dimGrid}
              />
            ) : (
              <div style={{width: TW, height: TH, borderRadius: 10, background: C.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 34, position: 'relative'}}>
                <div style={{position: 'absolute', inset: 0, borderRadius: 10, background: `rgba(10,10,10,${dimGrid})`, zIndex: 2}} />
                <AppTile app="chatgptLight" size={104} />
                <AppTile app="claude" size={104} />
                <AppTile app="gemini" size={104} />
              </div>
            )}
          </At>
        ))}
      </Layer>
      {/* teks hampir terkunci ke layar: ikut sedikit saat kamera mundur */}
      <Layer depth={0.06}>
        <At y={0}>
          <KText lines={[[{t: 'Tanpa', f: wf('01_hook', 'Tanpa')}, {t: 'kita', f: wf('01_hook', 'kita')}, {t: 'sadari,', f: wf('01_hook', 'sadari')}]]} size={92} color={C.white} exitF={b1 - 8} />
        </At>
        <At y={0}>
          <KText
            lines={[[{t: 'kita', f: b1}, {t: 'sedang', f: wf('01_hook', 'sedang')}], [{t: 'berlomba-lomba.', f: kunci, k: 'key'}]]}
            size={116}
            color={C.whiteDim}
            keyColor={C.white}
            weight={650}
            exitF={zoomIn - 2}
          />
        </At>
      </Layer>
    </Stage>
  );
};

/* 1c–1d · UI ChatGPT → banyak orang membuat agent yang sama */
const OTHERS = [
  'Buatkan agent CS untuk toko online-ku, balas chat 24 jam.',
  'Buat agent yang mengedit video reels otomatis dari footage mentah.',
  'Agent untuk rekap order dan kirim invoice tiap minggu.',
  'Agent yang menulis caption dan menjadwalkan posting.',
  'Buatkan agent admin klinik: jadwal, pengingat, pembayaran.',
  'Agent untuk follow-up leads dari form website.',
  'Agent yang membalas email klien dan menyusun penawaran.',
  'Buatkan agent riset kompetitor setiap pagi.',
];

const Agent: React.FC<{start: number}> = ({start}) => {
  const fr = useCurrentFrame();
  const g = (x: number) => x - start; // global → lokal
  const tapi = g(wf('01_hook', 'Tapi'));
  const kita2 = g(wf('01_hook', 'kita', 3));
  const len = g(wf('02_janji', 'Janjinya'));
  const WW = 1500, WH = 860, SP = 1640, SPY = 960;
  const blur = interpolate(fr, [tapi - 8, tapi + 6], [0, 14], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const textIn = prog(fr, tapi, tapi + 1);
  return (
    <Stage
      len={len}
      bg={C.paper}
      keys={[
        {f: 0, x: 0, y: -640, s: 1.0},
        {f: 22, x: 0, y: -640, s: 1.0},
        {f: 38, x: 0, y: 30, s: 1.12, ease: EASE_OUT},
        {f: tapi - 2, x: 0, y: 40, s: 1.15},
        {f: tapi + 22, x: 0, y: 0, s: 0.36, ease: EASE_OUT},
        {f: len, x: 0, y: 0, s: 0.34},
      ]}
    >
      <Layer depth={DEPTH.MID} style={{filter: blur > 0.2 ? `blur(${blur}px)` : undefined}}>
        <At x={0} y={0}>
          <ChatGPTUI
            w={WW}
            h={WH}
            f0={26}
            prompt="Buatkan aku agent yang bisa membalas tamu villa dan mengatur booking 24 jam."
            reply="Siap. Aku siapkan agent untuk reservasi villa-mu: membalas pesan tamu, cek ketersediaan kamar, dan kirim link pembayaran."
            status="Membuat agent…"
          />
        </At>
        {fr >= tapi - 14 && OTHERS.map((p, i) => {
          const pos = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]][i];
          return (
            <At key={i} x={pos[0] * SP} y={pos[1] * SPY} style={{opacity: prog(fr, tapi - 14 + i, tapi - 2 + i)}}>
              <ChatGPTUI w={WW} h={WH} f0={-400} prompt={p} reply="Siap. Aku siapkan agent-nya sekarang." status="Membuat agent…" />
            </At>
          );
        })}
      </Layer>
      <Layer depth={DEPTH.TXT}>
        <At x={0} y={-640 * DEPTH.TXT}>
          <KText
            lines={[[{t: 'membangun', f: 0}, {t: 'pengganti', f: g(wf('01_hook', 'pengganti')), k: 'key'}, {t: 'kita', f: g(wf('01_hook', 'kita', 2))}, {t: 'sendiri.', f: g(wf('01_hook', 'sendiri'))}]]}
            size={96}
            color={C.ink}
            keyColor={C.blue}
            exitF={26}
          />
        </At>
      </Layer>
      {/* teks paradoks: di atas jendela yang di-blur (rack focus), terkunci ke layar */}
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: textIn}}>
        <KText lines={[[{t: 'Tapi', f: tapi}, {t: 'anehnya,', f: g(wf('01_hook', 'anehnya'))}]]} size={64} color={C.inkSoft} style={{marginBottom: 18}} />
        <KText
          lines={[[{t: 'kita', f: kita2}, {t: 'menginginkan', f: g(wf('01_hook', 'menginginkan')), k: 'keyserif'}, {t: 'hal', f: g(wf('01_hook', 'hal'))}, {t: 'tersebut.', f: g(wf('01_hook', 'tersebut'))}]]}
          size={104}
          color={C.ink}
          keyColor={C.ink}
          weight={650}
        />
      </AbsoluteFill>
    </Stage>
  );
};

export const S1: React.FC = () => {
  const zoomIn = wf('01_hook', 'membangun') - 12;
  const agentStart = zoomIn + 13;
  return (
    <>
      <Sequence from={0} durationInFrames={agentStart}>
        <Race zoomIn={zoomIn} />
      </Sequence>
      <Sequence from={agentStart} durationInFrames={wf('02_janji', 'Janjinya') - agentStart}>
        <Agent start={agentStart} />
      </Sequence>
    </>
  );
};
