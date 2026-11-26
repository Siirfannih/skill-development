export type LightWaveCore = { x?: number; y?: number; radius?: number; ratio?: number; intensity?: number; falloff?: number };
export type LightWaveAmbient = { x?: number; y?: number; width?: number; ratio?: number; angle?: number; intensity?: number; falloff?: number };
export type LightWaveOptions = {
  preset?: string; saturation?: number; intensity?: number; colors?: string[] | "brand"; base?: string; mode?: "dark" | "light";
  core?: LightWaveCore; ambient?: LightWaveAmbient;
  waveSpeed?: number; drift?: number; grain?: number; quality?: number; width?: number; height?: number;
};
export const GRAIN_MAKS: number;
export const DEFAULT_CORE: Required<LightWaveCore>;
export const DEFAULT_AMBIENT: Required<LightWaveAmbient>;
export const renderLightWave: (canvas: HTMLCanvasElement, o: LightWaveOptions, frame?: number, fps?: number) => void;
export const lightWaveBg: (canvas: HTMLCanvasElement, frame: number, o: LightWaveOptions, fps?: number) => void;
