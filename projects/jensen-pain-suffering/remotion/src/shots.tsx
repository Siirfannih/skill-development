// Shot per beat (PLAN.json). Frame absolut (30 fps). r2: lapisan teks = handoff/TEKS.json (engine/Teks.tsx).
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, W, H, prog, lerp } from './engine/theme';
import { Cam, zoomAt, path } from './engine/Cam';
import { TeksSet, Place } from './engine/Teks';
import { Clip, Wajah, Crop, Vignette, Scrim, Paper, Print } from './engine/media';

// Crop wajah (sumber 1280×720 ternormal). Garis putih diagonal kiri atas sumber (tepi x ≈ 0,26·(1 − y/0,6)) di luar jendela.
const CROP_A: Crop = { left: 0.332, top: 0.052, cw: 0.66 };
const CROP_CLOSE: Crop = { left: 0.3825, top: 0.075, cw: 0.55 };
const CROP_WIDE: Crop = { left: 0.24, top: 0.06, cw: 0.74 };
const FACE_A = { x: 547, y: 308 }, FACE_CLOSE = { x: 480, y: 324 }, FACE_WIDE = { x: 675, y: 263 };

// Penempatan teks. TH = talking head (dinding di seberang wajah, sejajar mata–dagu), BR = b-roll (font 106, cap ±76 px).
const TH: Place = { sy: 380, size: 92, head: true }; // r6: sx dari tepi kanan kepala per tampil
const BR = 106;
const ids = (list: string[], pl: Place) => list.map((id) => [id, pl] as [string, Place]);

const push = (fc: { x: number; y: number }, f0: number, f1: number, z0: number, z1: number, ease: 'smooth' | 'linear' | 'inOut' = 'smooth') =>
  path([{ f: f0, ...zoomAt(fc.x, fc.y, z0) }, { f: f1, ease, ...zoomAt(fc.x, fc.y, z1) }], { sigma: 0 });

const Flash: React.FC<{ at: number; color?: string; len?: number }> = ({ at, color = '#FFFFFF', len = 1 }) => {
  const f = useCurrentFrame();
  return f >= at && f < at + len ? <AbsoluteFill style={{ background: color }} /> : null;
};

// ---------- B1 0–104 · hook: T01–T04 ----------
const P1 = push(FACE_A, 0, 104, 1.0, 1.03, 'linear'); // r6: cut ke B2 di onset 'unfortunately' (f104)
const P1Close = push(FACE_A, 0, 104, 1.12, 1.1536, 'linear');
export const B1: React.FC = () => {
  const f = useCurrentFrame();
  // Pilih seluruh jalur per frame agar sampling motion blur tidak melintasi cut f10.
  const pose = f < 10 ? P1Close : P1;
  return (
    <Cam pose={pose} film="ringan" text={<TeksSet pose={P1} until={104} start={0} items={[
        ['T01', { ...TH, mode: 'kata' }], ['T02', { sy: 175, width: 720, head: true }], ['T03', TH], ['T04', { sy: 165, width: 720, head: true }],
      ]} />}>
      <Wajah crop={CROP_A} />
      <Scrim dir="270deg" a={0.6} to={58} />
    </Cam>
  );
};

// ---------- B2 99–182 · bingkai putih tumbuh 62 → 72 % lebar: T05–T07 ----------
const FR = { cx: 960, cy: 465, w: 1154, h: 649 }; // luar 1190 = 62 % lebar pada zoom 1; 72 % pada zoom 1,161
const P2 = path([{ f: 99, ...zoomAt(FR.cx, FR.cy, 1.0) }, { f: 182, ease: 'linear', ...zoomAt(FR.cx, FR.cy, 1.161) }], { sigma: 0 });
export const B2: React.FC = () => {
  const f = useCurrentFrame();
  const mid: Place = { wx: FR.cx, wy: FR.cy - 75, size: 130, align: 'center', anchor: 99, mode: 'kata' };
  return (
    <Cam pose={P2} bg={C.hitam} film="penuh" text={<TeksSet pose={P2} until={182} start={104} items={[['T05', mid], ['T06', { ...mid, wy: FR.cy - 150, mode: 'skala', big: 250 }], ['T07', mid]]} />}>
      <Paper x={-200} y={-200} w={W + 400} h={H + 400} />
      <Print cx={FR.cx} cy={FR.cy} w={FR.w} h={FR.h} border={18}>
        {f < 164 ? <Clip src="grad_pose.mp4" start={99} dur={4} filter="contrast(1.06) saturate(0.9) sepia(0.08) brightness(0.7)" /> : <Clip src="grad_clap.mp4" start={164} dur={3} filter="contrast(1.06) saturate(0.9) sepia(0.08) brightness(0.7)" />}
      </Print>
      <Vignette strength={0.55} />
    </Cam>
  );
};

// ---------- B3 182–275 · push pelan, punch-in 135 % di "I hope" + flash: T08–T14 ----------
const P3 = path([
  { f: 182, ...zoomAt(FACE_A.x, FACE_A.y, 1.0) },
  { f: 232, ease: 'smooth', ...zoomAt(FACE_A.x, FACE_A.y, 1.03) },
  { f: 240, ease: 'out', ...zoomAt(FACE_A.x, FACE_A.y + 4, 1.35) },
  { f: 275, ease: 'linear', ...zoomAt(FACE_A.x, FACE_A.y + 4, 1.38) },
], { sigma: 0 });
export const B3: React.FC = () => (
  <AbsoluteFill>
    <Cam pose={P3} film="ringan" text={<TeksSet pose={P3} until={271} start={182} items={[
        ...ids(['T08', 'T09', 'T10', 'T11'], TH),
        ['T12', { sy: 400, size: 92, anchor: 240, head: true }], ['T13', { sy: 330, size: 92, big: 160, anchor: 240, mode: 'skala', head: true, dx: 56 }], ['T14', { sy: 400, size: 92, anchor: 240, head: true, mode: 'kata' }],
      ]} />}>
      <Wajah crop={CROP_A} />
      <Scrim dir="270deg" a={0.6} to={58} />
    </Cam>
    <Flash at={240} />
  </AbsoluteFill>
);

// ---------- B4 275–458 · babak II: cetakan ±42–45 % lebar, satu gerak menyusuri: T15–T22 ----------
const PW = 780, PH = 439, PB = 20; // isi cetakan; luar 820
const PR = [
  { cx: 900, cy: 470, rot: -2.5, src: 'arsip_meja.mp4', start: 271, dur: 5.2 },
  { cx: 2350, cy: 560, rot: 2, src: 'arsip_komputer.mp4', start: 345, dur: 6.0 },
  { cx: 3800, cy: 480, rot: -1.5, src: 'arsip_logo.mp4', start: 405, dur: 4.5 },
];
const P4 = path([
  { f: 271, x: 830, y: 600, zoom: 1.06 },
  { f: 368, ease: 'smooth', x: 1000, y: 600, zoom: 1.03 },
  { f: 386, ease: 'inOut', x: 2290, y: 690, zoom: 1.04 },
  { f: 428, ease: 'smooth', x: 2430, y: 690, zoom: 1.02 },
  { f: 442, ease: 'inOut', x: 3730, y: 610, zoom: 1.02 },
  { f: 458, ease: 'smooth', x: 3800, y: 605, zoom: 1.0 },
], { sigma: 3.6 });
const under = (i: number): Place => ({ wx: PR[i].cx - PW / 2 - PB, wy: PR[i].cy + PH / 2 + PB + 28, size: BR, mode: 'kata', keepLeft: 140 });
export const B4: React.FC = () => {
  const f = useCurrentFrame();
  const blur = lerp(16, 0, prog(f, 271, 277, 'out'));
  return (
    <AbsoluteFill style={{ filter: blur > 0.1 ? `blur(${blur}px)` : undefined }}>
      <Cam pose={P4} bg={C.hitam} film="sedang" textSharp text={<TeksSet pose={P4} until={458} start={271} items={[
          ['T14', under(0)], ...ids(['T15', 'T16', 'T17', 'T18'], under(0)), ...ids(['T19', 'T20', 'T21'], under(1)), ['T22', under(2)],
        ]} />}>
        <Paper x={-400} y={-300} w={5600} h={1700} />
        {PR.map((p, i) => (
          <Print key={i} cx={p.cx} cy={p.cy} w={PW} h={PH} rot={p.rot} border={PB}>
            <Clip src={p.src} start={p.start} dur={p.dur} filter="contrast(1.05) saturate(0.85) sepia(0.12)" />
          </Print>
        ))}
      </Cam>
      <Vignette strength={0.75} />
      <Flash at={271} color="#FFE2B8" />
    </AbsoluteFill>
  );
};

// ---------- B5 458–561 · babak III monokrom (kepala di sepertiga kanan) + kartu judul: T23–T26 ----------
const MONO = 'grayscale(1) contrast(1.55) brightness(0.62)';
// kepala pria di sumber x 710–1150, y 160–560; dinding kosong di atas kepala → teks satu baris tepat di atas rambut.
const P5 = path([{ f: 458, ...zoomAt(930, 100, 1.0) }, { f: 543, ease: 'linear', ...zoomAt(930, 100, 1.08) }], { sigma: 0 });
const P5t = path([{ f: 543, x: 960, y: 540, zoom: 1.04 }, { f: 561, ease: 'out', x: 960, y: 540, zoom: 1.0 }], { sigma: 0 });
export const B5: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 543)
    return (
      <AbsoluteFill>
        <Cam pose={P5} film="penuh" text={<TeksSet pose={P5} until={543} start={458} items={[
            ...ids(['T23', 'T24'], { sx: 960, sy: 466, size: 146, align: 'center', mode: 'kata' }),
            ['T25', { sx: 960, sy: 380, size: 146, big: 260, align: 'center', mode: 'skala', giant: ['setbacks'] }],
          ]} />}>
          <Clip src="stres.mp4" start={458} dur={5} filter={MONO} />
          <AbsoluteFill style={{ background: 'rgba(14,13,12,0.55)' }} />
        </Cam>
        <Vignette strength={0.7} />
      </AbsoluteFill>
    );
  // T26 'SUFFERING' (gaya judul): huruf berisi percikan api monokrom, dicat amber
  return (
    <AbsoluteFill style={{ background: C.hitam }}>
      <Cam pose={P5t} bg={C.hitam} film="kartu">
        <AbsoluteFill style={{ isolation: 'isolate', background: '#000' }}>
          <Clip src="percik.mp4" start={540} dur={3} filter="grayscale(1) brightness(1.75) contrast(1.1)" style={{ transform: 'scale(1.15)' }} />
          <AbsoluteFill data-teks="T26" style={{ mixBlendMode: 'multiply', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 300, letterSpacing: '-0.03em', color: C.amber, lineHeight: 1 }}>SUFFERING</div>
          </AbsoluteFill>
          <AbsoluteFill style={{ mixBlendMode: 'lighten', background: C.hitam }} />
        </AbsoluteFill>
        {/* r5: glow judul */}
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mixBlendMode: 'screen', opacity: 0.32, filter: 'blur(26px)' }}>
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 300, letterSpacing: '-0.03em', color: C.amber, lineHeight: 1 }}>SUFFERING</div>
        </AbsoluteFill>
      </Cam>
    </AbsoluteFill>
  );
};

// ---------- B6 561–716 · NVIDIA (bug 60 Minutes di luar crop), lalu Jensen: T27–T32 ----------
const NV = 'contrast(1.25) brightness(0.66) saturate(0.7)';
const P6a = path([{ f: 561, x: 1085, y: 560, zoom: 1.22 }, { f: 623, ease: 'linear', x: 1130, y: 555, zoom: 1.23 }], { sigma: 0 });
const P6b = path([{ f: 623, x: 1085, y: 445, zoom: 1.22 }, { f: 686, ease: 'linear', x: 1130, y: 445, zoom: 1.23 }], { sigma: 0 });
const P6c = push(FACE_A, 686, 709, 1.0, 1.03, 'linear');
export const B6: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 623)
    return (
      <AbsoluteFill>
        <Cam pose={P6a} film="penuh" text={<TeksSet pose={P6a} until={623} start={561} items={[...ids(['T27', 'T28'], { sx: 960, sy: 470, size: 130, align: 'center', mode: '25d', tilt: [-12, 6] }), ['T29', { sx: 960, sy: 450, size: 150, align: 'center', mode: '25d', tilt: [-12, 6] }]]} />}>
          <Clip src="nv_hq.mp4" start={561} dur={3} filter={NV} />
          <AbsoluteFill style={{ background: 'rgba(14,13,12,0.38)' }} />
        </Cam>
        <Vignette strength={0.55} />
      </AbsoluteFill>
    );
  if (f < 686)
    return (
      <AbsoluteFill>
        <Cam pose={P6b} film="sedang" text={<TeksSet pose={P6b} until={686} start={623} items={ids(['T30', 'T31'], { sx: 960, sy: 100, size: BR, align: 'center', mode: 'kata' })} />}>
          <Clip src="nv_tim.mp4" start={623} dur={5} filter={NV} />
          <Scrim dir="180deg" a={0.85} to={34} />
        </Cam>
        <Vignette strength={0.55} />
      </AbsoluteFill>
    );
  return (
    <Cam pose={P6c} film="ringan" text={<TeksSet pose={P6c} until={709} start={686} items={[['T32', { ...TH, mode: 'kata' }]]} />}>
      <Wajah crop={CROP_A} />
      <Scrim dir="270deg" a={0.6} to={58} />
    </Cam>
  );
};

// ---------- B7 716–816 · ketik di gelap, lalu Jensen: T33–T38 ----------
const P7a = path([{ f: 709, ...zoomAt(1300, 260, 1.0) }, { f: 777, ease: 'linear', ...zoomAt(1300, 260, 1.08) }], { sigma: 0 });
const P7b = push(FACE_A, 777, 813, 1.0, 1.03, 'linear');
export const B7: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 777)
    return (
      <AbsoluteFill>
        <Cam pose={P7a} film="penuh" text={<TeksSet pose={P7a} until={777} start={709} items={[['T32', { sx: 960, sy: 470, size: 130, align: 'center' }], ...ids(['T33', 'T35'], { sx: 960, sy: 470, size: 130, align: 'center', mode: 'skala' }), ['T34', { sx: 960, sy: 470, size: 130, align: 'center', mode: 'kata' }], ['T36', { sx: 960, sy: 440, size: 175, align: 'center', mode: 'kata' }]]} />}>
          <Clip src="ketik.mp4" start={709} dur={3} filter="contrast(1.2) brightness(1.05) saturate(0.7)" />
          <Scrim dir="90deg" a={0.7} to={60} />
        </Cam>
        <Vignette strength={0.5} />
      </AbsoluteFill>
    );
  return (
    <Cam pose={P7b} film="ringan" text={<TeksSet pose={P7b} until={813} start={777} items={ids(['T37', 'T38'], { ...TH, mode: 'kata' })} />}>
      <Wajah crop={CROP_A} />
      <Scrim dir="270deg" a={0.6} to={58} />
    </Cam>
  );
};

// ---------- B8 816–967 · tempa lalu percikan: T39–T46 ----------
const P8a = path([{ f: 813, ...zoomAt(1150, 450, 1.0) }, { f: 923, ease: 'linear', ...zoomAt(1150, 450, 1.12) }], { sigma: 0 });
const P8b = path([{ f: 923, x: 960, y: 540, zoom: 1.0 }, { f: 967, ease: 'out', x: 960, y: 540, zoom: 1.06 }], { sigma: 0 });
export const B8: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 923)
    return (
      <AbsoluteFill>
        <Cam pose={P8a} film="penuh" text={<TeksSet pose={P8a} until={923} start={813} items={[['T38', { sx: 960, sy: 250, size: 120, align: 'center', mode: 'kata' }], ...ids(['T39', 'T40', 'T41', 'T43', 'T44'], { sx: 960, sy: 250, size: 120, align: 'center', mode: 'kata' }), ['T42', { sx: 960, sy: 140, size: 120, big: 290, align: 'center', mode: 'skala' }]]} />}>
          <Clip src="tempa.mp4" start={813} dur={5} filter="contrast(1.2) brightness(0.85) saturate(1.1)" />
          <Scrim dir="180deg" a={0.9} to={55} />
        </Cam>
        <Vignette strength={0.6} />
      </AbsoluteFill>
    );
  return (
    <AbsoluteFill>
      <Cam pose={P8b} film="penuh" text={<TeksSet pose={P8b} until={967} start={923} items={[['T45', { sx: 960, sy: 470, size: 132, align: 'center', mode: '25d', tilt: [14, 6] }], ['T46', { sx: 960, sy: 475, size: 130, align: 'center', mode: '25d', tilt: [14, 6] }]]} />}>
        <Clip src="percik.mp4" start={923} dur={3} filter="contrast(1.15) brightness(0.8)" />
        <AbsoluteFill style={{ background: 'rgba(14,13,12,0.62)' }} />
        <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(14,13,12,0) 28%, rgba(14,13,12,0.6) 42%, rgba(14,13,12,0.6) 60%, rgba(14,13,12,0) 74%)' }} />
      </Cam>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

// ---------- B9 967–1053 · PCB, cut tegas ke Jensen close: T47–T50 ----------
const P9a = path([{ f: 967, x: 860, y: 540, zoom: 1.1 }, { f: 1010, ease: 'linear', x: 1060, y: 540, zoom: 1.1 }], { sigma: 0 });
const P9b = push(FACE_CLOSE, 1010, 1053, 1.0, 1.04, 'linear');
export const B9: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 1010)
    return (
      <AbsoluteFill>
        <Cam pose={P9a} film="penuh" text={<TeksSet pose={P9a} until={1010} start={967} items={[['T47', { sx: 960, sy: 400, size: 130, big: 250, align: 'center', mode: 'skala', giant: ['greatness'] }], ['T48', { sx: 960, sy: 470, size: 130, align: 'center', mode: 'kata', hold: 1013 }]]} />}>
          <Clip src="pcb.mp4" start={967} dur={2} filter="contrast(1.35) brightness(0.5) saturate(0.55)" />
          <Scrim dir="20deg" a={0.8} to={60} />
        </Cam>
        <Vignette strength={0.55} />
      </AbsoluteFill>
    );
  return (
    <Cam pose={P9b} film="ringan" text={<TeksSet pose={P9b} until={1053} start={1010} items={[['T48', { sy: 400, size: 92, head: true, mode: 'kata', hold: 1013 }], ['T49', { sy: 400, size: 92, head: true, mode: 'kata' }], ['T50', { sy: 250, width: 640, mode: 'tumpuk', head: true }]]} />}>
      <Wajah crop={CROP_CLOSE} />
      <Scrim dir="270deg" a={0.82} to={62} />
    </Cam>
  );
};

// ---------- B10 1053–1170 · siluet gelap: T51–T56 ----------
const P10 = path([{ f: 1053, ...zoomAt(900, 270, 1.0) }, { f: 1170, ease: 'linear', ...zoomAt(900, 270, 1.1) }], { sigma: 0 });
export const B10: React.FC = () => (
  <AbsoluteFill>
    <Cam pose={P10} film="penuh" text={<TeksSet pose={P10} until={1170} start={1053} items={ids(['T51', 'T52', 'T53', 'T54', 'T55', 'T56'], { sx: 960, sy: 700, size: 116, align: 'center', mode: 'kata' })} />}>
      <Clip src="gelap.mp4" start={1053} dur={5} filter="contrast(1.15) brightness(0.9)" />
    </Cam>
    <Vignette strength={0.5} />
  </AbsoluteFill>
);

// ---------- B11 + awal B12 1170–1330 · Jensen lebar: T57–T64 ----------
const P11 = path([{ f: 1170, ...zoomAt(FACE_WIDE.x, FACE_WIDE.y, 1.0) }, { f: 1330, ease: 'linear', ...zoomAt(FACE_WIDE.x, FACE_WIDE.y, 1.03) }], { sigma: 0 });
export const B11: React.FC = () => (
  <Cam pose={P11} film="ringan" text={<TeksSet pose={P11} until={1330} start={1170} items={[...ids(['T57', 'T58', 'T59', 'T60', 'T61', 'T62', 'T64'], { sy: 300, size: 90, mode: 'kata', head: true }), ['T63', { sy: 260, size: 90, mode: 'kata', head: true, br: 1 }]]} />}>
    <Wajah crop={CROP_WIDE} />
    <Scrim dir="270deg" a={0.6} to={58} />
  </Cam>
);

// ---------- B12 1330–1428 · kartu hitam, tanpa logo: T65 (t) lalu T66 (d) sampai akhir ----------
const P12 = path([{ f: 1330, x: 960, y: 540, zoom: 1.0 }, { f: 1428, ease: 'linear', x: 960, y: 540, zoom: 1.04 }], { sigma: 0 });
export const B12: React.FC = () => {
  const f = useCurrentFrame();
  const dark = prog(f, 1406, 1426, 'smooth');
  return (
    <AbsoluteFill style={{ background: C.hitam }}>
      <Cam pose={P12} bg={C.hitam} film="kartu" text={<TeksSet pose={P12} until={1428} start={1330} items={[
          ['T65', { sx: 960, sy: 250, width: 1100, align: 'center' }],
          ['T66', { sx: 960, sy: 330, width: 1300, align: 'center', mode: 'tumpuk' }],
        ]} />}>
        <Paper x={-100} y={-100} w={W + 200} h={H + 200} />
      </Cam>
      <AbsoluteFill style={{ background: '#000', opacity: dark }} />
    </AbsoluteFill>
  );
};
