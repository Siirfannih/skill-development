import {Internals} from 'remotion';

// Remotion 4.0.380: onset props tetap relatif komposisi saat komponen berada dalam Sequence.
export const useFrameKomposisi = () => Internals.useTimelinePosition();
