import React from 'react';
import {Composition} from 'remotion';
import {UjiC} from './bersama/ui-asli/UjiC';

export const UjiCRoot: React.FC = () => <Composition id="UjiC" component={UjiC} width={1920} height={1080} fps={30} durationInFrames={90}/>;
