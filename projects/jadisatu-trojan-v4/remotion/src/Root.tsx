import React from 'react';
import { Composition } from 'remotion';
import './style.css';
import { Main } from './Main';
import { TOTAL_F } from './lib/time';
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Trojan" component={Main} durationInFrames={TOTAL_F} fps={30} width={1920} height={1080} defaultProps={{ audio: true }} />
    <Composition id="TrojanSilent" component={Main} durationInFrames={TOTAL_F} fps={30} width={1920} height={1080} defaultProps={{ audio: false }} />
  </>
);
