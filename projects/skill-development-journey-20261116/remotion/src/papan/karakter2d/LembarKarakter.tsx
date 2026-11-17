// Lembar model Karakter2D: 3 tokoh × 5 sudut kunci + 4 emosi (sanding dengan docs/views.jpg & emotions.jpg ClaudeAnimationBase, MIT).
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Fonts} from '../kit';
import {Karakter2D, type Model, VIEWS} from './Karakter2D';

const MODELS: Model[] = ['claude', 'codex', 'gemini'];
const EMO = ['neutral', 'happy', 'surprised', 'thinking'];
export const LembarKarakter: React.FC = () => <AbsoluteFill style={{background: '#EEE9DE'}}>
  <Fonts/>
  {MODELS.map((m, r) => <React.Fragment key={m}>
    <div style={{position: 'absolute', left: 0, top: 30 + r * 440, width: 1920, height: 1, background: 'rgba(36,25,19,.18)'}}/>
    {[...VIEWS.map(v => ({v, e: 'neutral', label: v})), ...EMO.map(e => ({v: 'front' as const, e, label: e}))].map((c, i) => {
      const cx = 107 + i * 213, base = 330 + r * 440;
      return <React.Fragment key={i}>
        <Karakter2D model={m} id={`sheet-${m}-${i}`} x={cx} y={base} u={m === 'claude' ? 13.5 : 17} t={1} sudut={c.v} emosi={[[0, c.e]]} seed={i}/>
        <div style={{position: 'absolute', left: cx - 100, top: base + 26, width: 200, textAlign: 'center', fontFamily: 'PapanInter',
          fontWeight: 600, fontSize: 24, color: '#5B4A3E', letterSpacing: 1, textTransform: 'uppercase'}}>{c.label}</div>
      </React.Fragment>;
    })}
  </React.Fragment>)}
</AbsoluteFill>;
