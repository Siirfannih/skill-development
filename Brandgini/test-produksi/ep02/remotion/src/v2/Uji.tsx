import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, MobilSamping, LatarJalanSamping, LatarNetral, PenumpangDuduk} from '../bersama/Benda';
import {KepalaPotong, TelingaDalam} from '../bersama/Kepala';
export const UjiA: React.FC = () => <AbsoluteFill><svg width={1080} height={1920}><LatarNetral /><g transform="translate(540 760) scale(1.35)"><KepalaPotong cut={1} t={10} telinga={1} mata={1} mood="pucat" /></g></svg></AbsoluteFill>;
export const UjiB: React.FC = () => <AbsoluteFill><svg width={1080} height={1920}><LatarJalanSamping scroll={100} jalanY={1100} /><MobilSamping x={540} y={1130} L={820} roda={20} /></svg></AbsoluteFill>;
export const UjiC: React.FC = () => <AbsoluteFill><svg width={1080} height={1920}><LatarNetral /><g transform="translate(150 500) scale(3)"><TelingaDalam aliran={5} /></g><PenumpangDuduk x={540} y={1250} s={0.9} mood="pucat" tangan="mulut" /></svg></AbsoluteFill>;
