# Motion Toolkit

Primitif **mekanik** untuk video Remotion dan storyboard HTML. Bukan gaya: tidak ada warna, huruf, atau tampilan bawaan di komponen. Semua nilai visual datang dari props atau `tema.ts` (`tema.js` di storyboard), yang diisi dari BRAND.md / REF-SPEC.md. Gaya proyek lain tidak disalin; mekaniknya dipakai ulang.

Mulai: `toolkit/mulai.sh <folder-proyek> [remotion|storyboard]` (menyalin kerangka + modul, tidak menimpa berkas yang ada; `--perbarui` menyegarkan modul saja). Tulis hanya yang belum ada.

| Modul | Isi | Pakai bila |
|---|---|---|
| `gerak/curves.ts` + `curves.js` | 7 kurva bernama (land, heavy, whip, reveal, leave, wind, drift), `dur`, `exitDur`, `react`, `move`, `arc`, `drift`. `.js` = kembaran ESM, nilai sama (diuji `tests/parity.mjs`). | selalu; jangan menulis easing sendiri (`motion_lint.py` menolaknya) |
| `gerak/timing.ts` | `stagger`, `dampTrack`, `vanWijk`, `timeline` (ekspor ulang) | jeda tidak rata, pegas, zoom van Wijk |
| `kamera/Camera25D.tsx` + `camera25d.js` | panggung berlapis: dorong/tarik, geser, putar, orbit (rotateY ≤ ±8°), parallax menurut kedalaman, blur fokus opsional hanya di belakang bidang fokus | kedalaman 2,5D dengan kamera berkeyframe |
| `latar/LightWaveBg.tsx` + `light-wave-bg.js` | shader GLSL: cahaya mengalir (sinus + simplex), arah cahaya, glow berposisi, 2-3 warna satu keluarga, grain di shader. `u_time = frame / fps` | REF-SPEC meminta latar cahaya/gradien hidup |
| `latar/GenerativeBG.tsx` + `generative-bg.js` | `zona`, `mesh`, `noise` (CSS/kanvas ringan, berbiji) | latar bergradien tanpa WebGL |
| `latar/Grain.tsx` + `grain.js` | butiran per frame berbiji, `opacity` 0 = mati; disarankan 0.04-0.12 | REF-SPEC meminta tekstur film |
| `transisi/` | ekspor ulang WhipPan, GridFlashReveal, SceneChain, FlashCut, InvertFlash | pergantian adegan |
| `starter/`, `starter-storyboard/` | kerangka Remotion 4.0.380 dan kerangka `frame.html` (dibuka lewat `lihat.py`) | proyek baru |

## Aturan

1. **Mekanik, bukan gaya.** Komponen tidak punya warna/huruf bawaan; `colors` wajib dikirim. Preset berisi nilai bernama, bukan bawaan komponen.
2. **Latar dan grain opt-in.** Hanya dipakai bila REF-SPEC/brief memintanya (tulis alasannya di DECISIONS.md). Bawaan: mati.
3. **Deterministik.** Waktu hanya dari frame (`useCurrentFrame`, atau parameter `frame` di JS); tanpa `Math.random`, `Date.now`, `requestAnimationFrame`.
4. **Ukur latar.** `python3 scripts/banding.py <frame.png> [REF-SPEC.json]`: tanpa referensi tidak boleh menyalakan F1 (gradien ragu-ragu); dengan referensi, luma dan saturasi dalam toleransi REF-SPEC.

## Preset latar

`latar/presets/*.json` menyimpan SEMUA parameter bawaan sebuah latar (colors, mode, glow, dir, waveSpeed, amp, grain, seed, intensity, saturation); varian `dark`/`light` di dalam berkas yang sama. Preset: `researchly-glow`, `editorial-polos`, `hangat-netral` (LightWaveBg) dan `zona-lembut` (GenerativeBG).

- **Pilih**: `<LightWaveBg preset="researchly-glow" />`; terang: `mode="light"`.
- **Timpa**: props eksplisit selalu menang: `<LightWaveBg preset="researchly-glow" saturation={1.3} glow={{ x: 0.2, y: 0.8, r: 0.4 }} />`. `saturation` dan `intensity` pengali (1 = tetap), jadi "pertajam warnanya" = `saturation={1.3}`.
- **Warna merek**: `colors="brand"` setelah `setMerek([TEMA.gelap, TEMA.primer, TEMA.terang])` (dari `latar/preset.js`).
- **Simpan revisi yang disukai**: tulis parameternya ke `params.json`, lalu `python3 toolkit/latar/simpan_preset.py <nama> params.json` (`--varian light` menambah varian; `--timpa` mengganti). Salin manual juga bisa: gandakan satu `presets/*.json`, ubah, jalankan `simpan_preset.py --bangun`.

## Pemakaian

Remotion (`mulai.sh proyek remotion`, lalu `npm install`; di PC boleh symlink `node_modules`):
```tsx
<Camera25D keys={[{ at: 0 }, { at: 80, push: 120, orbit: 6, curve: "heavy" }]} drift={{ amp: 4 }}>
  <Layer25D z={-400} fill><LightWaveBg preset="researchly-glow" saturation={1.2} /></Layer25D>
  <Layer25D z={0}>{/* objek */}</Layer25D>
</Camera25D>
<Grain opacity={0.06} />   {/* opsional; 0 = mati */}
```
Storyboard (`mulai.sh proyek storyboard`; `frame.html` memuat `toolkit/toolkit.js` = `window.TK`, jalan lewat file://):
```js
const frame = Math.round(t * 30);                                   // window.seek(t): waktu hanya dari t
const p = TK.move(frame, 10, TK.dur(300, 30), "land");              // 0..1 dengan kurva bernama
TK.lightWaveBg(canvas, frame, { preset: "researchly-glow", saturation: 1.3 }, 30);
TK.applyCamera25D(stage, layers, TK.cameraAt([{ at: 0 }, { at: 60, push: 120, orbit: 6 }], frame));
TK.applyGrain(frameEl, frame, { opacity: 0.06 });
```
Uji: `node toolkit/tests/parity.mjs` (dari folder yang punya `node_modules` dengan remotion + esbuild; di PC server) dan `python3 -m unittest scripts/tests/test_motion_toolkit.py`.
