// Lembar keluarga karakter (REVISI-2 R2-1): Claude / Codex / Gemini berdampingan, lima sudut kunci (depan, 3/4, samping, 3/4 belakang, belakang) + 3 emosi.
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Fonts} from './Fonts';
import {KarakterX} from './KarakterPixel';
import {VIEWS, type Model} from '../../papan/karakter2d/Karakter2D';

const MODELS: Model[] = ['claude', 'codex', 'gemini'];
const KOLOM: {v: (typeof VIEWS)[number]; e: string; label: string}[] = [...VIEWS.map((v) => ({v, e: 'neutral', label: v})), {v: 'front', e: 'happy', label: 'happy'}, {v: 'front', e: 'surprised', label: 'surprised'}];
export const LembarPixel: React.FC = () => <AbsoluteFill style={{background: '#EEE9DE'}}>
  <Fonts/>
  {MODELS.map((m, r) => <React.Fragment key={m}>
    {KOLOM.map((c, i) => {
      const cx = 140 + i * 235, base = 290 + r * 320;
      return <React.Fragment key={i}>
        <KarakterX model={m} id={`lp-${m}-${i}`} x={cx} y={base} u={m === 'claude' ? 19 : 19} t={1} sudut={c.v} emosi={[[0, c.e]]} seed={i}/>
        {r === 0 && <div style={{position: 'absolute', left: cx - 100, top: 18, width: 200, textAlign: 'center', fontFamily: 'PapanInter', fontWeight: 600, fontSize: 22, color: '#5B4A3E', letterSpacing: 1, textTransform: 'uppercase'}}>{c.label}</div>}
      </React.Fragment>;
    })}
  </React.Fragment>)}
</AbsoluteFill>;
