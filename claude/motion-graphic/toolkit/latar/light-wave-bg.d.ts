export type LightWaveOptions = {
  preset?: string; saturation?: number; intensity?: number; colors?: string[] | "brand"; mode?: "dark" | "light"; glow?: { x: number; y: number; r: number; strength?: number };
  dir?: number; waveSpeed?: number; amp?: number; grain?: number; seed?: number; quality?: number; width?: number; height?: number;
};
export const renderLightWave: (canvas: HTMLCanvasElement, o: LightWaveOptions, frame?: number, fps?: number) => void;
export const lightWaveBg: (canvas: HTMLCanvasElement, frame: number, o: LightWaveOptions, fps?: number) => void;
