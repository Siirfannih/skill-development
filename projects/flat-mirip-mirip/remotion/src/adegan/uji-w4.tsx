import React from 'react';
import {Composition, Sequence} from 'remotion';
import {P07} from './P07';
import {P11} from './P11';
import {P12} from './P12';
import {P14} from './P14';
import {durasiW4} from './w4-shots';
import {QcW4} from './w4-waktu';

type UjiProps = {tanpaTeks: boolean};
const UjiP07: React.FC<UjiProps> = ({tanpaTeks}) => <QcW4.Provider value={tanpaTeks}><P07/></QcW4.Provider>;
const UjiP11: React.FC<UjiProps> = ({tanpaTeks}) => <QcW4.Provider value={tanpaTeks}><P11/></QcW4.Provider>;
const UjiP12: React.FC<UjiProps> = ({tanpaTeks}) => <QcW4.Provider value={tanpaTeks}><P12/></QcW4.Provider>;
const UjiP14: React.FC<UjiProps> = ({tanpaTeks}) => <QcW4.Provider value={tanpaTeks}><P14/></QcW4.Provider>;
const UjiSequence: React.FC<UjiProps> = ({tanpaTeks}) => <QcW4.Provider value={tanpaTeks}>
  <Sequence from={30} durationInFrames={durasiW4('P12', 30)}><P12/></Sequence>
</QcW4.Provider>;

export const UjiRoot: React.FC = () => <>
  <Composition id="P07" component={UjiP07} width={1920} height={1080} fps={30} durationInFrames={durasiW4('P07', 30)} defaultProps={{tanpaTeks: false}}/>
  <Composition id="P11" component={UjiP11} width={1920} height={1080} fps={30} durationInFrames={durasiW4('P11', 30)} defaultProps={{tanpaTeks: false}}/>
  <Composition id="P12" component={UjiP12} width={1920} height={1080} fps={30} durationInFrames={durasiW4('P12', 30)} defaultProps={{tanpaTeks: false}}/>
  <Composition id="P14" component={UjiP14} width={1920} height={1080} fps={30} durationInFrames={durasiW4('P14', 30)} defaultProps={{tanpaTeks: false}}/>
  <Composition id="W4-Sequence" component={UjiSequence} width={1920} height={1080} fps={30} durationInFrames={30 + durasiW4('P12', 30)} defaultProps={{tanpaTeks: false}}/>
</>;
