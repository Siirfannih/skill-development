// Satu sistem kinetic typography untuk semua kata penekanan (rule 43 · R4-02/R4-05 jadisatu-video2).
// Diturunkan dari templates/remotion/src/ktype.tsx di repo skill-development: Inter saja, huruf masuk dari
// balik mask per huruf dengan blur yang menajam, isi gradien putih→es di latar gelap, Bloom ultramarine.
import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {EASE_IN, EASE_OUT, F, W} from '../lib/theme';
import {KText, Wd} from './text';

const eOut = Easing.bezier(...EASE_OUT);
const eIn = Easing.bezier(...EASE_IN);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const ICE = 'linear-gradient(180deg,#ffffff 40%,#d6ecff 100%)';

export const KWord: React.FC<{
  text: string;
  at: number;
  size: number;
  out?: number;
  weight?: number;
  fill?: string; // gradien, atau "solid:#hex"
  stagger?: number;
  len?: number;
  style?: React.CSSProperties;
}> = ({text, at, size, out, weight = 800, fill = ICE, stagger = 1.2, len = 13, style}) => {
  const f = useCurrentFrame();
  const letters = [...text];
  const solid = fill.startsWith('solid:') ? fill.slice(6) : null;
  const ex = out !== undefined ? interpolate(f, [out, out + 8], [0, 1], {...clamp, easing: eIn}) : 0;
  return (
    <div style={{display: 'flex', justifyContent: 'center', fontFamily: F.sans, fontWeight: weight, fontSize: size, lineHeight: 1, letterSpacing: '-0.045em', whiteSpace: 'pre', ...style}}>
      <div style={{display: 'flex', overflow: 'hidden', padding: `${size * 0.08}px ${size * 0.06}px ${size * 0.32}px`, margin: `${-size * 0.08}px ${-size * 0.06}px ${-size * 0.32}px`}}>
        {letters.map((ch, i) => {
          const p = interpolate(f, [at + i * stagger, at + i * stagger + len], [0, 1], {...clamp, easing: eOut});
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                padding: '0.12em 0.1em 0.3em',
                margin: '-0.12em -0.1em -0.3em',
                transform: `translateY(${(1 - p) * 62 - ex * 110}%)`,
                opacity: Math.min(1, p * 1.6),
                filter: p < 1 ? `blur(${(1 - p) * 12}px)` : undefined,
                backgroundImage: solid ? undefined : fill,
                backgroundSize: `${letters.length * 100}% 100%`,
                backgroundPosition: `${letters.length > 1 ? (i / (letters.length - 1)) * 100 : 0}% 0`,
                WebkitBackgroundClip: solid ? undefined : 'text',
                backgroundClip: solid ? undefined : 'text',
                color: solid ?? 'transparent',
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>
    </div>
  );
};

/** Cahaya yang mengembang di belakang kata saat masuk: satu ellipse ultramarine, cepat redup (D-030). */
export const Bloom: React.FC<{at: number; tint?: string; w?: number; h?: number; strength?: number}> = ({at, tint = '18,44,235', w = 1300, h = 460, strength = 0.75}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at - 2, at + 10, at + 40], [0, 1, 0.42], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: w,
        height: h,
        transform: 'translate(-50%,-50%)',
        borderRadius: '50%',
        background: `radial-gradient(closest-side, rgba(${tint},${strength * p}), rgba(${tint},0))`,
        filter: 'blur(30px)',
      }}
    />
  );
};

/**
 * R4-05: frasa satu baris, lalu kata kunci di "kanvas baru" sebelah kanan — KAPITAL, lebih besar — dan
 * kamera teks melakukan truck kiri→kanan + zoom kecil tepat di onset kata kunci. Dipakai identik di semua adegan.
 */
export const PhraseKey: React.FC<{
  phrase: Wd[];
  keyText: string;
  keyAt: number;
  dark: boolean;
  size?: number;
  keySize?: number;
  exitF?: number;
  dimPhrase?: boolean;
}> = ({phrase, keyText, keyAt, dark, size = 92, keySize = 210, exitF, dimPhrase = true}) => {
  const f = useCurrentFrame();
  const GAP = W * 0.78;
  const t = interpolate(f, [keyAt - 7, keyAt + 9], [0, 1], {...clamp, easing: Easing.bezier(0.65, 0, 0.35, 1)});
  const blur = Math.sin(Math.PI * t) * 10; // blur searah gerak, hanya selama truck
  const ink = dark ? '#FFFFFF' : '#101216';
  const dim = dark ? 'rgba(255,255,255,0.46)' : 'rgba(16,18,22,0.42)';
  const ex = exitF === undefined ? 0 : interpolate(f, [exitF, exitF + 7], [0, 1], {...clamp, easing: eIn});
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - ex}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateX(${-GAP * t}px) scale(${1 + 0.1 * t})`,
          transformOrigin: `${50 + 78 * t}% 50%`,
          filter: blur > 0.3 ? `blur(${blur}px)` : undefined,
        }}
      >
        <div style={{position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)'}}>
          <KText lines={[phrase]} size={size} color={dimPhrase ? dim : ink} keyColor={ink} weight={600} />
        </div>
        <div style={{position: 'absolute', left: GAP, right: -GAP, top: '50%', transform: 'translateY(-50%)'}}>
          {dark ? <Bloom at={keyAt} strength={0.45} w={1000} h={360} /> : null}
          <KWord text={keyText} at={keyAt} size={keySize} fill={dark ? ICE : 'solid:#101216'} />
        </div>
      </div>
    </div>
  );
};
