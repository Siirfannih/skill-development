export type BGMode = "zona" | "mesh";
export type BGZone = { x: number; y: number; r?: number; color?: string; strength?: number };
export type BGPoint = { x: number; y: number; r?: number; color?: string };
export type BGOptions = {
  preset?: string; saturation?: number; mode?: BGMode; colors?: string[] | "brand"; base?: string; intensity?: number; seed?: number;
  drift?: number; driftAmp?: number; zones?: BGZone[]; points?: BGPoint[];
};
export const hash2: (seed: number, ix: number, iy: number) => number;
export const bgCSS: (o: BGOptions, frame?: number, fps?: number) => string;
export const renderBG: (el: HTMLElement, o: BGOptions, frame?: number, fps?: number) => void;
export const generativeBg: (el: HTMLElement, frame: number, o: BGOptions, fps?: number) => void;
