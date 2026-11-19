import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {AbsoluteFill, cancelRender, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {drawScene, loadAssets, type Assets} from './draw';
import {FRAMES, T0} from './timeline';

export type ClaudeKacaProps = {t0?: number; frames?: number; layerOnly?: boolean; audit?: boolean};

export const ClaudeKaca: React.FC<ClaudeKacaProps> = ({t0 = T0, frames = FRAMES, layerOnly = false, audit = false}) => {
  const frame = useCurrentFrame(), {fps} = useVideoConfig();
  const ref = useRef<HTMLCanvasElement>(null), released = useRef(false);
  const [handle] = useState(() => delayRender('Claude glass: local SF Pro and landscape'));
  const [assets, setAssets] = useState<Assets | null>(null);
  useEffect(() => {loadAssets(staticFile).then(setAssets).catch(cancelRender);}, []);
  useLayoutEffect(() => {
    if (!assets || !ref.current) return;
    try {
      if (audit && !released.current) {
        const records = [];
        for (let f = 0; f < frames; f++) records.push(drawScene(ref.current, assets, t0 + f / fps));
        console.log('CLAUDEKACA_AUDIT:' + JSON.stringify(records));
      }
      drawScene(ref.current, assets, t0 + frame / fps, layerOnly);
      if (!released.current) {released.current = true; continueRender(handle);}
    } catch (error) {cancelRender(error instanceof Error ? error : new Error(String(error)));}
  }, [assets, audit, fps, frame, frames, handle, layerOnly, t0]);
  return <AbsoluteFill><canvas ref={ref} width={1920} height={1080} style={{width: '100%', height: '100%'}}/></AbsoluteFill>;
};
