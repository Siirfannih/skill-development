---
name: sg-scene-composer
description: Merakit file Scene.tsx di Remotion dari shotlist.json + words.json menggunakan Shared Kit, AE-Primitives, dan Style A/B, lalu menjalankan Playwright visual gate sebelum render penuh.
---
# Skill 06: Remotion Scene Composer & SFX Mapper

## Trigger
Dijalankan oleh Worker PC (Codex effort medium atau Claude Sonnet) setelah `shotlist.json`, `vo.wav`, dan `words.json` tersedia di `episodes/epXX/`.

## Anti-Pattern
- Menulis ulang token warna/font secara *hardcoded* di dalam file episode (wajib import dari `kit/design-tokens.ts`).
- Langsung menjalankan `npx remotion render` penuh tanpa memeriksa `npx remotion still` terlebih dahulu.
- Memasukkan file SFX bertema kayu (`wood`, `knock`, `plank`, `marimba`).
- Membiarkan caption kata-per-kata menabrak UI YouTube Shorts / Reels (zona terlarang: 250px atas, 400px bawah, 60px tepi kiri/kanan).

## Invariant
1. **Import Wajib**:
   - Import `BRAND_TOKENS`, `STYLE_A_EINSTEIN`, atau `STYLE_B_VOX` dari `kit/design-tokens.ts` sesuai field `style_preset` di `shotlist.json`.
   - Gunakan `AE-Primitives` (`aeKeyframe`, `SpatialDepthStage`, `MotionBlurWrapper`, `WhipPanTransition`) dari repo `skill-development`.
2. **Sinkronisasi Audio & Motion**:
   - Semua timing kemunculan teks dan *beat switch* wajib dikunci ke timestamp `words.json` (`Math.round(word.start * 30)` untuk 30fps).
   - Root `<Audio>` spine:
     - `vo.wav` di `volume={1.0}`.
     - Musik latar instrumental (beat ritmis halus untuk Style A, pulse dokumenter tipis untuk Style B) di `volume={0.12}` (`~-18 hingga -20 dB` di bawah VO), dengan *silence ducking* 0,3 detik sebelum *punchline*.
     - SFX diambil dari cache lokal `~/sfx/SFXIrfan` sesuai whitelist (whoosh, paper slide, marker sweep, pop, camera click, mechanical hum). **Hard filter**: tolak path yang mengandung `wood|kayu|knock|bamboo`.
3. **HTML-First / Still Visual Gate (Wajib Sebelum Render Penuh)**:
   - Render 6 frame uji dengan `npx remotion still`:
     - Frame `0` (0s), `90` (3s), `450` (15s), `900` (30s), `1350` (45s), dan `totalFrames - 30` (akhir).
   - Simpan ke `episodes/epXX/qc-stills/`.
   - Setelah validasi visual lolos, baru render `episodes/epXX/render.mp4` (`1080x1920`, `30fps`, `crf 18`, `yuv420p`).

## Gate (Wajib Lulus)
- Kompilasi TypeScript (`tsc --noEmit`) bebas error.
- 6 frame still berhasil dirender tanpa missing asset / broken image.
- `render.mp4` selesai dirender dan diserahkan ke `07-sg-qc-auditor`.
