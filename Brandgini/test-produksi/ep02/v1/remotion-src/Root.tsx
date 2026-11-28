import React from 'react';
import {Composition} from 'remotion';
import {Episode, TOTAL} from './adegan/Episode';
import {W, H, FPS} from './bersama/Kit';

export const Root: React.FC = () => <Composition id="SgMain" component={Episode} durationInFrames={TOTAL} fps={FPS} width={W} height={H} />;
