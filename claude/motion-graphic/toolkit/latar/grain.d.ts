export type GrainOptions = { opacity?: number; seed?: number; tile?: number; tiles?: number; scale?: number; blend?: string; contrast?: number };
export const GRAIN: { tile: number; tiles: number };
export const grainTile: (seed?: number, index?: number, size?: number, contrast?: number) => string;
export const grainStyle: (frame: number, o?: GrainOptions) => Record<string, string | number> | null;
export const applyGrain: (el: HTMLElement, frame: number, o?: GrainOptions) => void;
