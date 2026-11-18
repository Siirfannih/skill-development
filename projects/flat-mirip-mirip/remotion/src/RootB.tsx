import React from 'react';
import {Composition} from 'remotion';
import {UjiB} from './bersama/ui-asli/UjiB';

export const UjiBRoot: React.FC = () => <Composition id="UjiB" component={UjiB} width={1920} height={1080} fps={30} durationInFrames={120}/>;
