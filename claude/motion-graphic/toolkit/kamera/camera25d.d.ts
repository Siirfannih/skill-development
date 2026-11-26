export type CurveKey = "land" | "heavy" | "whip" | "reveal" | "leave" | "wind" | "drift";
export type CamKey = { at: number; x?: number; y?: number; push?: number; rotate?: number; orbit?: number; focusZ?: number; curve?: CurveKey };
export type CamState = { x: number; y: number; push: number; rotate: number; orbit: number; focusZ: number };
export type CamOpts = { fps?: number; drift?: { amp: number; seed?: number }; orbitMaks?: number };
export type LayerOpts = {
  distance?: number; orbitRadius?: number; fill?: boolean; overscan?: number; sharp?: boolean; extraBlur?: number;
  focusBlur?: { perUnit?: number; max?: number }; dimPerUnit?: number; perspective?: number;
};
export const KAMERA: { jarak: number; orbitMaks: number };
export const cameraAt: (keys: CamKey[], frame: number, opts?: CamOpts) => CamState;
export const depthFactor: (z: number, push: number, D?: number) => number;
export const layerParams: (z: number, cam: CamState, o?: LayerOpts) => { tx: number; ty: number; scale: number; rotate: number; blur: number; dim: number };
export const layerStyle: (z: number, cam: CamState, o?: LayerOpts) => Record<string, string>;
export const stageStyle: (cam: CamState, o?: LayerOpts) => Record<string, string>;
export const applyCamera25D: (stageEl: HTMLElement, layers: Array<{ el: HTMLElement; z: number } & LayerOpts>, cam: CamState, o?: LayerOpts) => void;
