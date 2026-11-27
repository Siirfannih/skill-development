# Build — Remotion, rakit lego, dan engine kode

Baca saat mulai build.

## Isi

- 3. Alat & pipeline produksi (Remotion, engine kode, rakit lego)
- 3a. Toolkit mekanik (mulai proyek)
- 4. Gerbang render R1–R5 · 5. Batas kerja · 6. Ritme dan keragaman mode visual · 7. Primitif netral

## 3. Alat & pipeline produksi

**Versi Remotion (dicek 25 Okt 2026):** proyek baru memakai Remotion ≥ 4.0.475 (terbaru 4.0.538). Sejak 4.0.475 Studio bisa mengedit keyframe dan props langsung, jadi Irfan bisa menyetel timing sendiri. Proyek Jadisatu lama masih 4.0.380. Saat upgrade, pakai skill `external/remotion-skills/skills/remotion-upgrade`. Resep motion blur, teks, dan kamera ada di `smooth-motion.md`.

**UI produk sendiri (Jadisatu)**: salin komponen asli dari repo produk (mis. `jadisatu-partner/apps/portal`, React) ke proyek Remotion lalu animasikan per elemen; jangan menggambar ulang UI dari screenshot bila kodenya ada.

**Jalur utama: Remotion, dan rakit lego untuk video berfootage** (di bawah). Semua langkah, gerbang, dan contoh di file ini mengacu ke jalur itu. After Effects bukan jalur bawaan: ia dipakai hanya bila user memintanya secara eksplisit, dan petunjuknya terpisah di `tools/AFTER-EFFECTS.md` (akar repo).

**Engine kode (canvas + three.js, `window.seek(t)` deterministik)** dipakai untuk dunia 3D (ruang pixel Irfan, kamera 3D, low-poly) dan plate dunia yang tidak praktis dibangun sebagai komponen Remotion 2D.
- Render: Playwright → JPEG → ffmpeg; di Mac pakai Chrome for Testing + metal.
- **Hibrida**: engine merender plate dunia tanpa teks naratif; teks, UI, kamera 2D, dan transisi dibangun di atasnya dengan Remotion.
- Semua aturan desain di file ini berlaku untuk kedua jalur.
- Kontrak render deterministik:
  - tidak ada `Math.random` (pakai seed)
  - tidak ada state antar frame
  - font dimuat eksplisit sebelum render (`document.fonts.load`); kalau tidak, teks hilang di frame pertama worker
  - cek determinisme sekali per proyek: dua render frame yang sama harus identik
- Rincian engine yang terbukti jalan:
  - WebGL headless: `--enable-unsafe-swiftshader --use-gl=angle --use-angle=swiftshader`, `preserveDrawingBuffer:true`
  - timing digerakkan timestamp kata VO (`words.js`)
  - motion blur: 5–6 subframe dalam shutter 180°, dirata-rata di linear light
  - **teks di belakang tokoh**: gambar teks di kanvas 2D, lalu potong dengan siluet sprite (`globalCompositeOperation='destination-out'`)
  - **teks di dunia 3D**: posisi dihitung dari titik layar yang dipilih (unproject di kamera tengah-shot) supaya pasti terlihat dan tidak saling tumpuk; skala slam diputar di pusat kata
- Perakitan/edit akhir boleh di invideo (MCP) atau ekspor ke Premiere/DaVinci. Kredit AI invideo hanya untuk generate.

**Rakit lego (jalur utama video berfootage, Lantai F26).** Render Remotion penuh menggambar ulang semua lapisan di setiap frame (decode footage di Chrome, blur, glow) dan diulang tiap revisi; itulah yang membuat render di PC lama. Pecah jadi lapisan:
1. **Dasar** (footage, b-roll, kamera footage push/pull): tidak dirender di Remotion; `compose.py` memotong, mengisi frame, dan menggerakkan kamera dengan ffmpeg (dihitung 2× lalu diperkecil supaya zoom pelan tidak bergetar).
2. **Teks/KT**: `scripts/lego/teks_plan.py words.json teks.json` menghitung waktu dan durasi dari transkrip; model mengisi peran/kode/gaya/pos/alasan (`typography.md` §8a), `kt_check.py` PASS. Setiap blok dirender sebagai komposisi transparan seukuran kotaknya (`TeksBlok` dengan props isi + gaya; waktu dan posisi tidak masuk props).
3. **Visual/MG** per beat: komposisi transparan seukuran objeknya. Lapisan yang ikut gerak kamera 2.5D atau berubah skala dirender dengan gerak itu di dalamnya (frame penuh ber-alpha).
4. `scripts/lego/lapisan.py <proyek> lapisan.json` merender lapisan yang berubah saja (cache sha1 isi+gaya) ke ProRes 4444 ber-alpha.
5. `lego/lego.json` menyusun dasar + lapisan (t, x, y, gerak x/y) + mix audio; `compose.py lego.json --rentang a b` untuk QC cepat dan audit frame, lalu `render.sh <proyek> lego lego/lego.json` sekali di akhir (gerbang sama dengan `final`).
Lapisan yang harus tahu letak orang atau wajah (teks di belakang kepala lewat cutout `subjek.mov`, glow tepi badan, teks mengapit wajah): `scripts/lego/persepsi.py` → `matte.mp4` + `wajah.json`, cara pakai di `persepsi.md`.
Glow/blend dirender di dalam lapisan; compose hanya overlay alpha di RGB lalu satu konversi bt709, supaya warna tidak bergeser. Terukur: 4 dtk 1080×1920, kamera footage + 1 lapisan + audio dirakit dalam ±6 dtk di VM cloud.

**Audio:** mixer Python. Peta audio dibuat dengan librosa + Demucs (§2). Di Remotion, hasil mix (satu WAV) diputar oleh **satu** komponen di root komposisi berpenanda `// audio-bus`; tidak ada `<Audio>` di dalam `<Sequence>` adegan, karena audio di situ berhenti saat adegan selesai dan ekor kata/SFX terpotong (`scripts/juri/audio_bus_check.py`, dijalankan `render.sh final`). Opsional: ekspor sesi REAPER `.RPP` dari `cues.json` supaya Irfan bisa menggeser SFX sendiri.

**Transfer cloud ↔ Mac:**
- Pakai nama file baru setiap kirim; nama yang sama bisa terkirim versi lama.
- Verifikasi `shasum`. Untuk FLAC: `ffmpeg -f md5`.
- Ekstrak lewat shell host, karena VM tidak bisa menghapus/menimpa.
- Kirim patch kecil bila hanya beberapa file berubah.
- Simpan proyek di `~/Documents/<Proyek>` + `PROJECT_STATE.md`.

Aset gambar: objek yang bergerak dibangun sebagai SVG/kode/lapisan terpisah supaya tiap bagiannya bisa dianimasikan. Foto mentah dan gambar generator hanya referensi atau plate ("dinding saja, tanpa objek utama, tanpa teks"); sprite raster (latar hijau `#00FF00`, di-key) pengecualian yang mahal.

---

## 3a. Toolkit mekanik (mulai proyek)

Proyek Remotion dan storyboard HTML dimulai dari `toolkit/` (`toolkit/mulai.sh <folder> remotion|storyboard`), bukan dari file kosong atau scaffold proyek lain. Isinya mekanik tanpa gaya: kurva dan timing (`gerak/`), kamera 2,5D dengan orbit (`kamera/Camera25D.tsx`, `camera25d.js`), latar shader dan generatif serta grain (`latar/`, opt-in, mati bawaan), transisi yang sudah ada (`transisi/`), kerangka `starter/` dan `starter-storyboard/`. Aturan pakai:
- Tulis hanya yang belum ada di toolkit; jangan menulis ulang easing atau kamera (`motion_lint.py` menolak easing buatan sendiri tanpa impor kurva toolkit).
- Semua nilai visual dari `tema.ts` (`tema.js`) dan REF-SPEC; komponen toolkit tidak membawa warna atau huruf. Latar/grain dipakai hanya bila REF-SPEC/brief memintanya; ukur dengan `scripts/banding.py`.
- Latar punya preset (`toolkit/latar/presets/*.json`) yang bisa ditimpa per props (`saturation`, `intensity`, `glow`) dan disimpan (`simpan_preset.py`). Cara pakai dan contoh: `toolkit/README.md`.
- **Mesin motion graphic = Remotion.** Layout, kamera, transisi, timeline, kinetic typography, dan latar dibangun di Remotion (React/TypeScript per frame) dengan toolkit; frame storyboard dirender sebagai still dari kode yang sama. Three.js (atau `@remotion/three`) hanya untuk ilustrasi/objek di DALAM satu elemen (mis. gambar di dalam kartu postingan, satu objek 3D), dipasang sebagai lapisan di komposisi Remotion; tidak pernah sebagai mesin seluruh adegan atau kamera dunia. Alasan: adegan yang dirakit di Three.js kehilangan tipografi, layout, dan transisi yang presisi, sehingga desainnya tidak profesional.

## 4. Gerbang render R1–R5 (wajib sebelum render final)

Dari `claude/motion-graphic/scripts/`, berurutan (Python audio: venv ber-numpy, soundfile, scipy).

| Urut | Perintah | Lulus bila |
|---|---|---|
| R1 | `python3 gate/cek_komposisi.py <episode.json> --public <proyek>/remotion/public` | keluar 0; **sebelum build** |
| R2 | `python3 gate/audio_order.py check --dir <proyek>/audio` | keluar 0 |
| R3 | `python3 audio/sfx_potong.py --laporan <proyek>/audio/sfx_potong.json` | keluar 0 |
| R4 | `python3 audio/audio_phone.py --root <folder stem> --gate` | keluar 0: SFX harsh 0, median VO clarity ≥ 8 dB |
| R5 | `bash juri/render.sh <proyek> final <Comp> <keluaran.mp4>` (berfootage: `lego lego/lego.json`) | keluar 0; mengulang R1–R4 (`gerbang_produksi.sh`) + juri |

R1 selalu memblokir empat tanda netral gaya: `WAJAH`, `INSET`, `TEPI`, `ASET`. Tanda lain (`JEDA`, `KARTU`, `PITA`, `LOGO`, …) hanya peringatan, kecuali proyek memilih ketat: flag `--ketat`, atau file `projects/<proyek>/qc/ketat` (kosong = semua tanda memblokir; berisi nama tanda = tanda itu ikut memblokir). Itu keputusan proyek (`DECISIONS.md`), bukan bawaan gaya.

File proyek yang menyalakan R1, R3, R4 di `render.sh` (ada dan gagal = render ditolak): data episode `remotion/src/data/*.json` + `remotion/public/<aset>/aset.json`; `audio/sfx_potong.json`; `stem_vo.wav`, `stem_music.wav`, `stem_sfx.wav`, `mix.wav`, `cues.json` di `audio/` atau `qc/`.

Gerbang yang gagal diperbaiki pada penyebabnya, lalu dijalankan ulang; keluaran terakhirnya disalin ke `TAHAP.md` sebagai bukti. Gerbang yang tidak bisa dijalankan di lingkungan ini dilaporkan **NOT RUN** di laporan kirim, tidak pernah PASS; "PASS tanpa bukti = FAIL" (`delivery-gate.md`) tetap berlaku.

## 5. Batas kerja (alasan dan penjagaannya)

- **Render final lewat `render.sh final`** (atau `lego`). Gerbang yang tidak bisa jalan di lingkungan ini: render langsung boleh dengan daftar gerbang itu di laporan kirim (NOT RUN, §4). Melewati gerbang yang bisa jalan: invarian 4 `AGENTS.md`. Tenggat bukan alasan melewati gerbang yang bisa jalan: tenggat tidak terkejar = kirim laporan gerbang yang belum lulus.
- **Jangan mengedit `scripts/gate/*` atau `scripts/juri/*` di sesi produksi video** (invarian 4 `AGENTS.md`), termasuk menyalinnya ke proyek lalu mengubahnya.
- Jangan mematikan gerbang dengan menghapus atau mengganti nama file pemicunya (`qc/ketat`, `aset.json`, `sfx_potong.json`, stem).
- **Satu video = satu sesi terpisah.** Jangan menyalin `RESEP.md`, racikan, atau kode adegan dari episode lain; yang dipakai ulang hanya blok netral `scripts/remotion/`.
- Dilarang menambah elemen di luar tabel racikan, storyboard, dan brief.

## 6. Ritme dan keragaman mode visual (retensi short-form / IG, tanpa merombak naskah atau membuat ulang VO)

- **Padatkan jeda suara, bukan kecepatan bicara** (`TEMPO = 1.0`, NEGATIF 9): `scripts/gate/cut_check.py --suggest --max-inner 0.12 --max-sentence 0.22`, lalu `scripts/audio/recut.py` untuk memangkas jeda mati; petakan ulang titik waktu ke `vo_words.json`/`vo_beats.json` tanpa memotong kata.
- **Ritme ganti visual dan teks** diambil dari REF-SPEC/kiblat; tanpa referensi untuk short-form, mulai dari perubahan visual ±2 dtk (kebiasaan referensi: ≤ 2,2 dtk) lalu ukur terhadap VO. Variasikan mode (jangan hanya `[zoom B-roll + KT]` bergantian dengan `[kartu teks polos]`). Pecah kalimat panjang menjadi micro-beat (geser titik fokus kamera 2D, insert arsip/UI, `HighlighterSweep`, `SelectiveColorSpotlight`) dan buat frame 0 langsung bergerak dan berteks.
- **Kunci gaya aset:** ikuti `BRAND.md`/`EDITING.md`; untuk proyek bergaya 2D flat, editorial, atau photo-cutout, bangun komponen vektor 2D SVG/HTML atau cutout foto nyata; 3D lolos tiga pertanyaan NEGATIF dan alasannya ditulis di `RESEP.md`.

## 7. Primitif netral (mulai dari `toolkit/`, lalu ini)

Tulis hanya yang belum ada. Tersedia: `scripts/remotion/ae-primitives/` (`SpatialAnchorCamera`, `SpatialDepthStage`, `MotionBlurWrapper`, `WhipPanTransition`, `GridFlashReveal` (pembungkus kompatibilitas: `scripts/remotion/FlashGrid.tsx`), `SceneChain`, `FlashCut`, `InvertFlash`, `HighlighterSweep`, `SelectiveColorSpotlight`, `Scrim`) dan `toolkit/gerak/curves.ts`. Jangan menambal scaffold episode proyek lain. Selesai hanya bila `render.sh final` lulus, termasuk `gerbang_produksi.sh` (§4); gerbang yang tidak bisa jalan di lingkungan ini dilaporkan NOT RUN (§5), tidak pernah PASS.
