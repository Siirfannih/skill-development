import React from 'react';
import {Composition} from 'remotion';
import {Episode, TOTAL} from './adegan/Episode';
import {W, H, FPS} from './bersama/Kit';

import {UjiA, UjiB, UjiC} from './v2/Uji';
export const Root: React.FC = () => <><Composition id="UjiA" component={UjiA} durationInFrames={30} fps={30} width={1080} height={1920} /><Composition id="UjiB" component={UjiB} durationInFrames={30} fps={30} width={1080} height={1920} /><Composition id="UjiC" component={UjiC} durationInFrames={30} fps={30} width={1080} height={1920} /><Composition id="SgMain" component={Episode} durationInFrames={TOTAL} fps={FPS} width={W} height={H} /></>;
