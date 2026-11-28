import {CURVE, dur} from '../lib/curves';
import {MEREK, NETRAL} from './bersama/tema';
const s = interpolate(f, [0, dur(400, 30)], [0.9, 1], {easing: CURVE.land});
const sfx = staticFile('sfx/paper_slide_02.wav');
