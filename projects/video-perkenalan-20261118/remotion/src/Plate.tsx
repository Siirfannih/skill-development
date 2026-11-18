// Plate.tsx · footage TH + cutout (RVM) dengan kamera keyframe. Teks yang "di dunia" ikut skala kamera (punch bukan cut).
import React from 'react';
import {OffthreadVideo, Sequence, staticFile} from 'remotion';
import {Key, track} from './anim';
import {useG} from './kt/KT';

export type Cam = {s: Key[]; x?: Key[]; y?: Key[]; ox?: number; oy?: number};

export const camStyle = (g: number, cam: Cam): React.CSSProperties => {
  const s = track(g, cam.s), x = cam.x ? track(g, cam.x) : 0, y = cam.y ? track(g, cam.y) : 0;
  return {position: 'absolute', inset: 0, transformOrigin: `${cam.ox ?? 540}px ${cam.oy ?? 900}px`, transform: `translate(${x}px, ${y}px) scale(${s})`};
};

/** Titik dunia (footage) → titik layar di frame g. Untuk meletakkan narasi layar dekat kepala. */
export const keLayar = (g: number, cam: Cam, x: number, y: number) => {
  const s = track(g, cam.s), tx = cam.x ? track(g, cam.x) : 0, ty = cam.y ? track(g, cam.y) : 0;
  const ox = cam.ox ?? 540, oy = cam.oy ?? 900;
  return {x: ox + (x - ox) * s + tx, y: oy + (y - oy) * s + ty, s};
};

export const Kamera: React.FC<{cam: Cam; children: React.ReactNode}> = ({cam, children}) => {
  const g = useG();
  return <div style={camStyle(g, cam)}>{children}</div>;
};

/** Footage gabungan_v6 (frame timeline = frame file). */
export const Footage: React.FC<{dari: number; grade?: string}> = ({dari, grade}) => (
  <OffthreadVideo src={staticFile('footage.mp4')} trimBefore={dari} muted style={{position: 'absolute', inset: 0, width: 1080, height: 1920, filter: grade}}/>
);

/** Cutout subjek (VP9 alpha dari RVM). fg.webm = frame 0–1659; fg_b.webm = frame 1640–1799 (matte kedua setelah disk penuh). */
const FG_B = 1640, FG_SAMBUNG = 1660;
export const Cutout: React.FC<{dari: number; style?: React.CSSProperties}> = ({dari, style}) => {
  const st: React.CSSProperties = {position: 'absolute', inset: 0, width: 1080, height: 1920, ...style};
  if (dari >= FG_SAMBUNG) return <OffthreadVideo src={staticFile('fg_b.webm')} trimBefore={dari - FG_B} transparent muted style={st}/>;
  const n = FG_SAMBUNG - dari;
  return (
    <>
      <Sequence durationInFrames={n} layout="none"><OffthreadVideo src={staticFile('fg.webm')} trimBefore={dari} transparent muted style={st}/></Sequence>
      <Sequence from={n} layout="none"><OffthreadVideo src={staticFile('fg_b.webm')} trimBefore={FG_SAMBUNG - FG_B} transparent muted style={st}/></Sequence>
    </>
  );
};

export const GRADE_TH = 'contrast(1.06) saturate(1.04) sepia(0.05)';
export const GRADE_TITIK = 'brightness(1.08) contrast(1.05) saturate(1.06) sepia(0.10)';

/** Satu shot TH: footage → teks belakang → cutout → teks depan, semua dalam kamera. */
export const TH: React.FC<{a: number; b: number; cam: Cam; belakang?: React.ReactNode; depan?: React.ReactNode; atas?: React.ReactNode; grade?: string; cut?: boolean}> =
  ({a, b, cam, belakang, depan, atas, grade = GRADE_TH, cut = true}) => (
    <Sequence from={a} durationInFrames={b - a} layout="none">
      <Kamera cam={cam}>
        <Footage dari={a} grade={grade}/>
        {belakang}
        {cut && belakang ? <Cutout dari={a} style={{filter: grade}}/> : null}
        {depan}
      </Kamera>
      {atas}
    </Sequence>
  );
