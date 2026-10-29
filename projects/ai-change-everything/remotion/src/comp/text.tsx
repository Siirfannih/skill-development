import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {EASE_IN, EASE_OUT, F} from '../lib/theme';

const eo = Easing.bezier(...EASE_OUT);
const ei = Easing.bezier(...EASE_IN);

export type Wd = {t: string; f: number; k?: 'key' | 'serif' | 'dim' | 'keyserif'};

type Props = {
  lines: Wd[][];
  size: number;
  color: string;
  keyColor?: string;
  dimColor?: string;
  exitF?: number; // frame mulai keluar (blok, naik melewati mask)
  weight?: number;
  lineGap?: number;
  align?: 'center' | 'left';
  tracking?: number; // em
  style?: React.CSSProperties;
};

/**
 * R1 narasi: tiap kata naik dari balik garis dasar (mask), mulai penuh di bawah mask,
 * 10 f, ease-out kuat. R2 kata kunci: masuk dengan skala 1.15→0.98→1.
 * Keluar: blok naik melewati mask dalam 6 f (ease-in).
 */
export const KText: React.FC<Props> = ({
  lines,
  size,
  color,
  keyColor,
  dimColor,
  exitF,
  weight = 600,
  lineGap = 1.08,
  align = 'center',
  tracking = -0.03,
  style,
}) => {
  const fr = useCurrentFrame();
  const exitT = exitF === undefined ? 0 : interpolate(fr, [exitF, exitF + 7], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ei});
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: align === 'center' ? 'center' : 'flex-start', ...style}}>
      {lines.map((ln, li) => (
        <div
          key={li}
          style={{
            display: 'flex',
            gap: `0 ${size * 0.26}px`,
            flexWrap: 'nowrap',
            justifyContent: align === 'center' ? 'center' : 'flex-start',
            overflow: 'hidden',
            padding: `${size * 0.06}px ${size * 0.08}px ${size * 0.16}px`,
            margin: `-${size * 0.06}px -${size * 0.08}px -${size * 0.16}px`,
            lineHeight: lineGap,
            whiteSpace: 'nowrap',
          }}
        >
          {ln.map((w, wi) => {
            const p = interpolate(fr, [w.f, w.f + 11], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: eo});
            const isKey = w.k === 'key' || w.k === 'keyserif';
            const serif = w.k === 'serif' || w.k === 'keyserif';
            const pop = isKey
              ? interpolate(fr, [w.f, w.f + 6, w.f + 10], [1.15, 0.98, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: eo})
              : 1;
            const y = (1 - p) * (size * 1.05 + 24) - exitT * (size * 1.3);
            const c = isKey ? keyColor ?? color : w.k === 'dim' ? dimColor ?? color : color;
            return (
              <span
                key={wi}
                style={{
                  display: 'inline-block',
                  transform: `translateY(${y}px) scale(${pop})`,
                  transformOrigin: '50% 80%',
                  fontFamily: F.sans,
                  fontWeight: serif ? Math.max(weight, 700) : weight,
                  fontSize: size,
                  letterSpacing: `${tracking}em`,
                  color: c,
                  opacity: fr < w.f ? 0 : 1,
                }}
              >
                {w.t}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

/** Ketikan di UI (T11): 1–2 karakter per frame + caret. */
export const Typed: React.FC<{text: string; f: number; cps?: number; caret?: boolean; style?: React.CSSProperties}> = ({
  text,
  f,
  cps = 45,
  caret = true,
  style,
}) => {
  const fr = useCurrentFrame();
  const n = Math.max(0, Math.floor(((fr - f) / 30) * cps));
  const done = n >= text.length;
  return (
    <span style={style}>
      {text.slice(0, n)}
      {caret && fr >= f && !done ? <span style={{opacity: Math.floor(fr / 8) % 2 ? 0.2 : 1}}>|</span> : null}
    </span>
  );
};

/** Angka berjalan (T16) dengan ease-out expo. */
export const Counter: React.FC<{from: number; to: number; f: number; dur: number; fmt: (n: number) => string; style?: React.CSSProperties}> = ({
  from,
  to,
  f,
  dur,
  fmt,
  style,
}) => {
  const fr = useCurrentFrame();
  const t = interpolate(fr, [f, f + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.exp)});
  return <span style={style}>{fmt(t >= 0.985 ? to : from + (to - from) * t)}</span>;
};

/** helper: nilai 0→1 ease-out antara dua frame */
export const prog = (fr: number, a: number, b: number, e: 'out' | 'in' | 'inout' = 'out') =>
  interpolate(fr, [a, b], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: e === 'out' ? eo : e === 'in' ? ei : Easing.bezier(0.65, 0, 0.35, 1),
  });
