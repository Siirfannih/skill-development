# REPORT r1 (Editor; disalin Sutradara dari balasan Editor karena subagen tidak bisa menulis .md)

Still `qc/stills/B01a…B06c.png` · lembar `qc/r1_sheet.jpg` · draft `qc/draft_0-330.mp4` · pertanyaan `handoff/QUESTIONS.md` (dijawab di `REVIEW-r1.md`).
Remotion 4.0.380, `node_modules` symlink ke `projects/jadisatu-trojan-v4/remotion/node_modules`. Audio `public/face_edit.mp4` (hardlink).

## Subklip arsip (`remotion/public/footage/`)
| Subklip | Sumber | Detik sumber | Dipakai |
|---|---|---|---|
| jensen_a | 1EXtvwTNAeE | 3,2 | 0,00–0,73 |
| replit_a | LrahKbwVZwg | 23,9 | 0,73–1,27 |
| karpathy | LCEmiRjPEtQ | 58,0 | 1,27–1,87 |
| teen | 5u08zrnLvMI | 43,0 | 1,87–2,33 |
| suarez | Fkd9TWUtFm0 | 75,5 | 2,33–2,87 |
| replit_ui | IYiVPrxY8-Y | 71,5 | 2,87–3,37 |
| dohmke | nv9WwHpOKEg | 67,4 | 3,37–4,23 |
| jensen_b | 1EXtvwTNAeE | 47,0 | 4,23–5,47 |

## Gate
`teks_cek.py`: 15 still, TIDAK ADA TANDA. `node remotion/scripts/cekkata.mjs 0 14.92`: SEMUA KATA TAMPIL TEPAT SEKALI (3 TAHAN = peringatan, cut PLAN). `grep radial-gradient`: kosong. Font dimuat FontFace + delayRender, gagal = cancelRender.

## API mesin (untuk Editor lain)
- **Menambah adegan:** file sendiri `src/scenes/<File>.tsx` (export `SceneEntry[]`) + `<File>.text.ts` (blok teks). Main.tsx sudah memuat ACT1, ACT2, ACT2B, ACT3A, ACT3, ACT4. Pengecek kata membaca semua `src/scenes/*.text.ts`.
- **Adegan** (`engine/scenes.ts`): `SceneEntry {id, beats, from, to, Comp, over?}` frame absolut [from,to); tanpa `<Sequence>` (useCurrentFrame() = frame timeline); `over:true` = transisi di atas; `beatF('B07')` → [f0,f1] dari PLAN.
- **Kamera** (`engine/Stage.tsx`, `engine/camera.ts`): `Stage {pose?:(f)=>Pose, fov=32, bg, blurAbove=9, samples=10, shutter=200, overlay}` kamera CSS 3D di dunia 1920×1080, motion blur subframe otomatis. `Layer {z, blur?}` (L1 −260/−300, L2 0, L3 30, L4 80+). `Place {x,y,w,h,rot,scale,z}`. `camPath(keys,{sigma=3.6,cuts})`, `Key {f,x?,y?,zoom?,rx?,ry?,rz?,ease?}` ((x,y) = titik dunia di tengah layar; ease `out|in|inOut|smooth|linear`).
- **Teks** (`text/types.ts`, `engine/TextLayer.tsx`): `T(phrase, afterT, display?, accent?)` (galat bila kata tak diucapkan), `merge(...)`, `joinTok(toks,'20-an')`. Blok `N {size, lines, x, y, until, exit:'rise'|'cut', tone:'light'|'dark'}` · `K3 {size, head, keys, tail?, label?}` · `K4 {big, small, bigSize, ratio=2.3, order, bigAccent?}` · `J {size, toks, font}` · `H {size, toks, ink, rot, arrow}` · `UI {toks, at?}` (dirender adegan sendiri; di sini untuk pengecek). Render `<TextBlocks blocks/>` di `Layer z={30}` atau `<TextBlockView block/>` di dalam benda. `measure(text,size)`.
- **Komponen:** `Face {preset F1–F4, crop?, w, h, grade:'terang'|'gelap'|'gelapHangat'|'bersih'}` · `Print {x,y,w,h,rot,border=16,pin,aberration}` · `Pin` · `Cursor {x,y,size=64,click,rot,opacity}` · `PixelMosaic {build,brk,cell=86,from,colors}` · `WipeLinear {progress,dir,feather=160}` · `Paper`, `Linen`, `DarkWall {angle}` · `Logo {name:'github'|'threads'|'youtube'}` (OpenAI: `public/logos/openai.svg`).
- **Token** (`engine/theme.ts`): `C`, `FONT`, `SAFE`, `EASE`, `prog(f,a,b,ease)`, `fr(t)`.
- Cek kata: `node scripts/cekkata.mjs <t0> <t1>`.
