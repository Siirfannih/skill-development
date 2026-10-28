/** Peta id klip → file di public/ai (tanpa .mp4) dan posisi overlay teks (disetel ke klip). */
export const CLIPS: Record<string, string> = {};
export const OV = {
  v03rate: 2.5,
  v16rate: 1.6,
  v16from: 1.9,
  v21rate: 0.87,
  popAt: 0.85,
  bump: 0.45,
  page08: "matrix3d(0.84322184,-0.11030074,0,0.00014911,0.23578272,0.43139596,0,-0.00028289,0,0,1,0,260,500,0,1)",
  v03from: 1.5,
  screen01: "matrix3d(0.26687521,-0.01990049,0,-0.00010925,-0.12283811,0.46390596,0,0.00006583,0,0,1,0,703,397,0,1)",
  planner: { x: 250, y: 260, w: 700, rot: -3, size: 40, ox: 600, oy: 500 },
  phone: { x: 836, y: 120, w: 328, h: 668, r: 26, rot: 0 },
  spill: { x: 300, y: 400, rot: -21, size: 34 },
  planners: { l: { x: 772, y: 583, w: 236, rot: 0 }, r: { x: 1132, y: 583, w: 250, rot: 0 }, size: 20.5, ox: 1075, oy: 720 },
};
