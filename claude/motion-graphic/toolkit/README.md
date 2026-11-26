# Motion Toolkit

Primitif **mekanik** untuk video Remotion dan storyboard HTML. Bukan gaya: tidak ada warna, huruf, atau tampilan bawaan di komponen. Semua nilai visual datang dari props atau `tema.ts` (`tema.js` di storyboard), yang diisi dari BRAND.md / REF-SPEC.md. Gaya proyek lain tidak disalin; mekaniknya dipakai ulang.

Mulai: `toolkit/mulai.sh <folder-proyek> [remotion|storyboard]` (menyalin kerangka + modul, tidak menimpa berkas yang ada; `--perbarui` menyegarkan modul saja). Tulis hanya yang belum ada.

| Modul | Isi | Pakai bila |
|---|---|---|
| `gerak/curves.ts` + `curves.js` | 7 kurva bernama (land, heavy, whip, reveal, leave, wind, drift), `dur`, `exitDur`, `react`, `move`, `arc`, `drift`. `.js` = kembaran ESM, nilai sama (diuji `tests/parity.mjs`). | selalu; jangan menulis easing sendiri (`motion_lint.py` menolaknya) |
| `gerak/timing.ts` | `stagger`, `dampTrack`, `vanWijk`, `timeline` (ekspor ulang) | jeda tidak rata, pegas, zoom van Wijk |
| `kamera/Camera25D.tsx` + `camera25d.js` | panggung berlapis: dorong/tarik, geser, putar, orbit (rotateY ≤ ±8°), parallax menurut kedalaman, blur fokus opsional hanya di belakang bidang fokus | kedalaman 2,5D dengan kamera berkeyframe |
| `latar/LightWaveBg.tsx` + `light-wave-bg.js` | shader GLSL v3 (port patokan Irfan): AMBIENT WASH lebar + CORE di luar frame, falloff Gaussian `exp(-dot(d,d)*k)` (tanpa smoothstep/step/clamp pada cahaya), drift pelan, grain hash <= 0.02 satu-satunya acak. `colors = [dasar, ambient, core]`. `u_time = frame / fps` | REF-SPEC meminta latar cahaya/gradien hidup |
| `latar/GenerativeBG.tsx` + `generative-bg.js` | `zona`, `mesh` (usang) berbasis CSS ringan; mode `noise` dihapus dan ditolak; aturan sama: pusat zona di luar frame | latar bergradien tanpa WebGL |
| `latar/Grain.tsx` + `grain.js` | butiran per frame berbiji, `opacity` 0 = mati; disarankan 0.04-0.12 | REF-SPEC meminta tekstur film |
| `transisi/` | ekspor ulang WhipPan, GridFlashReveal, SceneChain, FlashCut, InvertFlash | pergantian adegan |
| `starter/`, `starter-storyboard/` | kerangka Remotion 4.0.380 dan kerangka `frame.html` (dibuka lewat `lihat.py`) | proyek baru |

## Aturan

1. **Mekanik, bukan gaya.** Komponen tidak punya warna/huruf bawaan; `colors` wajib dikirim. Preset berisi nilai bernama, bukan bawaan komponen.
2. **Latar dan grain opt-in.** Hanya dipakai bila REF-SPEC/brief memintanya (tulis alasannya di DECISIONS.md). Bawaan: mati.
3. **Deterministik.** Waktu hanya dari frame (`useCurrentFrame`, atau parameter `frame` di JS); tanpa `Math.random`, `Date.now`, `requestAnimationFrame`.
4. **Ukur latar.** `python3 scripts/banding.py <frame.png> [REF-SPEC.json]`: tanpa referensi tidak boleh menyalakan F1 (gradien ragu-ragu); dengan referensi, luma dan saturasi dalam toleransi REF-SPEC.

## Latar: aturan cahaya

1. **Dua lapis cahaya Gaussian.** AMBIENT WASH (sapuan lebar, melintasi area teks, angka kecil) + CORE (sumber utama, pusat di luar frame, radius lebar). Intensitas = `exp(-dot(d,d)*k)`, `d = (posisi - pusat) / radius`: tidak ada titik henti, jadi tidak ada tepi. Dilarang smoothstep/step/clamp yang membentuk tepi cahaya. Bawaan `core`/`ambient` = patokan Irfan (`latar/patokan-irfan.glsl`); `colors = [dasar, ambient, core]`.
2. **Tanpa noise pembentuk warna.** Dilarang simplex, perlin, FBM, value noise, turbulence. Satu-satunya acak: hash per piksel untuk grain film, amplitudo <= 0.02 (dibatasi di shader dan di JS) supaya tidak banding.
3. **Core di luar layar.** `core.x`/`core.y` di luar 0..1 pada >= 1 sumbu; hanya ekor lebar yang masuk frame. Props: `core {x, y, radius, ratio, intensity, falloff}`, `ambient {x, y, width, ratio, angle, intensity, falloff}`; pusat keduanya melayang pelan (`waveSpeed`, `drift`).
4. **Kalem.** Minimal 50 % piksel hanya selisih <= 15 poin L* dari warna dasar (wash memang mengangkat latar tipis, jadi ukurannya kenaikan kecerahan, bukan dE). Warna dasar = token: `colors[0]` atau prop `base`.
5. **Deterministik.** `u_time = frame / fps`; preset + varian + override (`core`/`ambient` digabung per kunci), `colors="brand"`, `saturation`/`intensity`.

Diuji otomatis: `scripts/tests/test_latar_v3.py` (pindai sumber, core di luar frame, area kalem >= 50 %, gradien tepi Sobel < 0,5x v2 (v2 dipakai sebagai kalibrasi tepi, diambil dari git), kontras teks APCA 0.0.98G-4g Lc >= 60 (putih di gelap, navy di terang), grain <= 0.02, gerak antar frame 1 dtk, paritas dengan patokan <= 2/255). Bagian render jalan di PC (`~/work/mg-venv/bin/python`). Lembar v2 | patokan | v3 + banding vs still referensi: `toolkit/tests/kontak_latar.py <keluar> [folder-still]`. `simpan_preset.py` menolak core/zona di dalam frame, grain > 0.02, dan mode noise. `Grain.tsx` (overlay butiran terpisah, opt-in) tidak termasuk aturan ini.

## Preset latar

`latar/presets/*.json` menyimpan SEMUA parameter bawaan sebuah latar (colors, mode, core, ambient, waveSpeed, drift, grain, intensity, saturation); varian `dark`/`light` di dalam berkas yang sama. Preset: `researchly-glow`, `editorial-polos`, `hangat-netral` (LightWaveBg) dan `zona-lembut` (GenerativeBG).

- **Pilih**: `<LightWaveBg preset="researchly-glow" />`; terang: `mode="light"`.
- **Timpa**: props eksplisit selalu menang (`core`/`ambient` digabung per kunci): `<LightWaveBg preset="researchly-glow" saturation={1.3} core={{ x: 1.2, y: 0.3, radius: 1.1 }} ambient={{ intensity: 0.4, angle: -15 }} />`. `saturation` dan `intensity` pengali (1 = tetap); `base` menimpa warna dasar; `colors="brand"` mengambil token dari `setMerek`. Bawaan `core`/`ambient` = nilai patokan Irfan.
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
