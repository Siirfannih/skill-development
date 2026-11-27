---
name: preset-index
description: Indeks handmade mechanical presets untuk build gerak, transisi, kamera, kedalaman, teks kinetik, dan audio-sync setelah theme dan style frame terkunci.
---

# PRESET-INDEX · Peta Preset Mekanikal Buatan Sendiri (Dekopled dari Remotion)

Buka file ini **hanya pada tahap build** (setelah `SKILL.md` + `tema/<tema>.md` + *style frame* dikunci).  
**Aturan utama:** Cari preset yang sesuai niat adegan di bawah → ikat parameternya ke kondisi video (timestamp VO `words.json`, jarak layar via `dur()`, rasio `16:9`/`9:16`, zona aman subjek, palet tema `≥ 4,5:1`) → **hanya tulis kode gerak baru di atas Lapis 1** jika adegan menuntut mekanik khusus yang belum tersedia di katalog.

> **Lokasi Lapis Kode Saat Ini (Read-Only Reference):** `../scripts/remotion/`

---

## 1. Inti Matematika Bebas-Renderer (Lapis 1 — 0% Remotion / Siap Diport)

Gunakan fungsi murni berbasis `(frame, fps)` agar fisika tidak tergantung Remotion dan tidak memakai nilai linear/acak sembarang (`Lantai B10–B13a`):

| File & Simbol | Fungsi Fisika | Status Dekopling | Aturan Pemakaian |
|---|---|---|---|
| `timing.ts` (`timeline`, `stagger`, `dampTrack`, `vanWijk`) | Timeline relatif, jeda grid non-rata berbiji, pegas terbawa antar-kunci, kurva zoom-pan logaritmik | **0% Remotion (Murni TS)** | Wajib pakai `stagger()` ber-`ease`/`seed` untuk multi-item; dilarang `i * konstanta`. |
| `ae-primitives/inti/aeKeyframe.ts` (`aeValue`, `aeValueN`, `aeEase`, `overshootKeys`, `aeVelocity`) | Solver bezier Graph Editor AE (`influence %`, `speed`, `hold`, overshoot) | **0% Remotion (Murni TS)** | Pakai saat kartu memberi `influence %` (mis. `aeEase(18, 92)`) atau > 2 keyframe. |
| `curves.ts` (`CURVE`, `dur`, `exitDur`, `react`, `move`, `arc`, `drift`) | 7 kurva niat (`land/heavy/whip/reveal/leave/wind/drift`), durasi dari jarak (`dur`), jeda bertingkat (`REACT_MS`), drift hidup | **Minimal** (tinggal ganti 2 fungsi `remotion` dgn `aeKeyframe.ts`) | Hitung durasi masuk dari `dur(px, fps, bobot)` & keluar `exitDur()`; jangan kunci 0,5 dtk tetap. |
| `ae-primitives/inti/gerak.ts` & `acak.ts` | Velocity tengah ±0,5 f, blur setara shutter `200°`, chroma tipis, PRNG *mulberry32* | **0% Remotion (Murni TS)** | Dilarang `Math.random()`; semua variasi pakai `acakIndeks(seed, i)`. |
| `ae-primitives/presets.ts` (`fr`, `PEGAS`, `DURASI`, `WHIP`, `GRID`, `FLASH`, `KEDALAMAN`, `NETRAL`) | Skala frame `fr(n, fps)` + konstanta fisika awal dari kartu cookbook | **0% Remotion (Murni TS)** | Tidak pernah menyimpan warna merek/font (`NETRAL` wajib ditimpa token tema). |

---

## 2. Katalog Preset Siap Pakai & Celah Backlog (`TeksBlok` + `ae-primitives/`)

| Kategori & Niat | Komponen + Fungsi Murni Eksisting | Parameter Adaptasi ke Kondisi Video | Celah / Belum Ada (Tulis Kustom Berbasis Lapis 1 → Promosikan ke Preset) |
|---|---|---|---|
| **Teks Kinetik (`T*`, `typography.md §8a`)** | `TeksBlok.tsx` (**baru 6 kode + `FADE`**: `T19` word-pop, `T01` word-rise mask, `T02` blur-to-focus, `T03` slam, `T04` scale-down, `T11` typewriter UI), `LightSweep.tsx` (`G8`), `HighlighterSweep.tsx` (`sweepProgress`) | Onset `words.json`, `fontFamily`+`warna` dari tema, tinggi `≥ 56 px @1080` (keterbacaan, NEGATIF 6), `HighlighterSweep` `blend="multiply"` di atas kertas (`48`) atau solid di polos (`92`). | **26/32 kode `T*` belum ada di `TeksBlok`!** Prioritas bangun: **`T05`** marquee select (`ui-produk-datar`), **`T07`** slot swap & **`T24`** anchor word (`talking-head` / `doc`), **`T09`** sticker drop & **`T10`** card stack (`tactile`), **`T20`** color settle & **`T28`** flip-up X, **`T27`** angka naik dari bar (`dataviz`). |
| **Data & Kursor (`UI / Dataviz`)** | `Kursor.tsx` (`posisiKursor`: lengkung 15%, overshoot ≤ 6 px, ragu ber-drift), `Penghitung.tsx` (`nilaiPenghitung`: `CURVE.reveal`, `tabular-nums`, `cahaya` opsional) | Target `{x, y, tiba, klik, ragu}` disetel ke tombol/UI aktual (`94`: `6f` laju → `12f` diam → klik); angka disetel ke jeda `0,15–1,3 dtk`. | **Belum ada:** `datavizBarFill` + `ktBarLabelRise` (batang tumbuh tersinkron label menempel pangkal/ujung). |
| **Transisi Antar-Adegan** | `WhipPanTransition.tsx` (`WhipPanTransition`, `WhipPan`, `whipOffset`: `strip`/`tumpang`), `GridFlashReveal.tsx` (`gridOrder`: `diagonal/random/ring/sweep`), `FlashGrid.tsx` (`14.T1`), `SceneChain.tsx` (`overlapFrames`) | Arah `direction` ikut arah baca/alur argumen; `GridFlashReveal` `pattern="ring"` origin di koordinat klik (`63`), `pattern="random"` `≤ 7 f` & `≤ 3×/10 dtk` (`14`). | **Belum ada** (tercatat di `ae-primitives/README.md`): **`radialBurstWipe`** (`25.T1`), **`zoomThroughPortal`** (`19.T4`/`C05`), **`gridToHeroPush`** (`93.T6`), serta `fullBleedSlabCutaway` (`85`), `polarityHardFlip` (`96`/`33`), & `tapeWipeReveal` (`98`). |
| **Kamera 2D & Kedalaman 2.5D** | `SpatialAnchorCamera.tsx` (`anchorCamera`, `coverBox` — pegas `spring()` Remotion bisa ditukar `dampTrack`), `MotionBlurWrapper.tsx` (translasi), `SpatialDepthStage.tsx` (`DepthLayer`, `depthFactor`), `DirectionalBlur.tsx` | Ikat titik fokus `{fx, fy, s}` pada kotak subjek asli & drift `0,012/dtk`; `SpatialDepthStage` animasikan `focusZ` 6–8 f (`87.T3`), pastikan oklusi `≤ 20–30%`. | **Belum ada:** `rvmBgOnlyRegrade` (redup/dinginkan dinding belakang RVM tanpa menyentuh wajah depan `83/85`), `focusBlurBurst` (`40-k5`), blur rotasi/zoom murni tanpa `@remotion/motion-blur`. |
| **Aksen & Lapis Foto/Teks** | `FlashCut.tsx` (`flashEnvelope`: `potong` 2f / `exposure`), `InvertFlash.tsx` (`invertActive`: `solid/flicker/region`), `SelectiveColorSpotlight.tsx`, `Scrim.tsx` | Maks 1–2× kilat penuh/video (`X12`); `Scrim` hanya jika kontras p10 gagal `< 4,5:1`; `SelectiveColorSpotlight` pakai foto diam (hindari dual decoder video). | **Belum ada:** `materialShadowPreset` (3 rezim bayangan `98`: hard 0-blur stiker vs soft 3D vs 0-shadow scan), `reticleConnector1px` (`72`/`80`/`88`). |
| **Audio-Sync (`Remotion & Non-Remotion`)** | `SmoothAudioClip.tsx` (hanya adapter Remotion J/L-cut `<Audio>`) + logika `audio.md §14.9` | Seluruh cue tetap dikunci setelah visual terkunci (`F27`); whoosh memuncak di `v_max` (`camStart + round(0.28 * moveDur) - peakOffset`); jarak whoosh ≥ 1 dtk. | **Belum ada helper JS/TS murni:** `velocityPeakAudioSync()` & `vacuumPreHitCalc()` (`94` vakum `0,35–0,45 dtk`) pengekspor JSON cue universal. |

---

## 3. Pagar Anti-Preset-Slop (5 Aturan Wajib Sebelum Memakai Preset)

1. **Preset = Fisika & Proporsi, Bukan Warna/Font:** Jangan pernah membawa warna hex atau keluarga huruf dari kartu ke dalam preset; wajib ambil dari `tema.ts` proyek dan lulus uji kontras `≥ 4,5:1` pada piksel aktual.
2. **Durasi Hidup dari Jarak & VO:** Gunakan `dur(distancePx, fps, weight)` dan timestamp kata `words.json` (`exit ≈ 0,65× enter`). Jangan memakai preset berdurasi mati `0,5 s` di semua blok.
3. **Wajib Audit Kondisi Bahan (`dunia-visual.md` §1 butir 1, `../cookbook/README.md` §6) Sebelum Memanggil Preset:** Jika footage tidak punya headroom `≥ 20%` atau baju bermotif, **batalkan** pemanggilan preset `talking-head` dada/belakang kepala—alih ke *cutaway slab* / samping kepala.
4. **Satu *Hero Motion* per Adegan & Seed Berbeda:** Maksimal 1 gerakan hero aktif per shot; bila preset dipanggil ulang di klip yang sama, ubah `seed` (`acakIndeks`) dan arah agar tidak terasa seperti salinan template.
5. **Bebas Menulis Kode Kustom Jika Diperlukan:** Jika naskah menuntut metafora visual unik (diagram khusus, objek interaksi baru) yang tak ada di §2, tulis implementasi kustom bersih di atas Lapis 1 (`curves.ts` + `timing.ts` + `aeKeyframe.ts`), bukan memaksakan preset yang salah bentuk.
