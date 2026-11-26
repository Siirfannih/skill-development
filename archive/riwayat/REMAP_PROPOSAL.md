# Proposal Restrukturisasi Cookbook & Referensi (`REMAP_PROPOSAL.md`)

> **Status Dokumen:** **Disetujui (v2 · Two-Tier Architecture + Forensik Sesi `behindwork-launch`)**, siap dieksekusi di branch `refactor/cookbook-domain-packs`.  
> **Basis Audit:** `~/Proyek/skill-development` commit `cf279d7` (sinkron dengan PC `/home/irfan/work/skill-development`).  
> **Cakupan Terukur:** 97 kartu aktif (`claude/motion-graphic/cookbook/01..06`), 12 file pendamping `cookbook/` (`INDEX.md`, `POLA.md`, `SFX.md`, `README.md`, 3 template, 3 `teknik/`, 2 `contoh-gagal/`), ditambah `LANTAI.md`, `MOTION-CORE.md`, `guide/`, `references/`, dan 6 kartu `claude/vibedesign/cookbook/`.

---

## 1. Executive Metrics

### A. Hasil Inventarisasi Saat Ini
Audit langsung pada seluruh berkas Markdown di repositori menemukan pemborosan konteks yang sangat besar akibat kartu referensi disusun sebagai catatan bedah panjang (rata-rata ~132 baris / ~3.555 token per kartu) dan indeksnya sendiri membengkak:

| Ruang Lingkup Terukur | Jumlah File | Baris | Kata | Karakter | Estimasi Token (`chars/4`) |
|---|---:|---:|---:|---:|---:|
| Kartu aktif `cookbook/01..06` | 97 | 12.832 | 211.585 | 1.379.554 | **~344.888** |
| Indeks lama (`cookbook/INDEX.md`) | 1 | 119 | 3.984 | 29.942 | **~7.485** |
| Peta T-blok (`cookbook/POLA.md`) | 1 | 461 | 9.377 | 76.257 | **~19.064** |
| Peta SFX (`cookbook/SFX.md`) + `README.md` + template + `teknik/` + `contoh-gagal/` | 10 | 710 | 10.832 | 77.207 | **~19.302** |
| **Total folder `claude/motion-graphic/cookbook/`** | **109** | **14.122** | **235.778** | **1.562.960** | **~390.740** |
| Konteks video tambahan (`references/` 25 file + `guide/` 151 file + `LANTAI`/`MOTION-CORE`) | 178 | — | 148.906+ | 908.857+ | **~227.214+** |
| Kartu statis `claude/vibedesign/cookbook/` (6 kartu + `INDEX`) | 7 | — | — | ~12.732 | **~3.183** |

Distribusi 97 kartu aktif sebelum pemetaan ulang:
- `01-camera-and-transitions`: **11 kartu** · ~40.093 token (`dilihat_bergerak` ya/sebagian/tidak = 2/1/8 · `diukur` = 11)
- `02-typography-and-captions`: **43 kartu** · ~151.186 token (`dilihat_bergerak` ya/sebagian/tidak = 9/1/33 · `diukur` = 43)
- `03-spatial-and-ui-layouts`: **21 kartu** · ~73.471 token (`dilihat_bergerak` ya/sebagian/tidak = 5/0/16 · `diukur` = 17; kartu `01`, `06`, `10-13`, `41` belum diukur)
- `04-tactile-textures-and-grading`: **2 kartu** · ~6.137 token (`dilihat_bergerak` = 0/0/2 · `diukur` = 2)
- `05-sfx-and-audio-mapping`: **4 kartu** · ~18.315 token (`dilihat_bergerak` = 2/0/2 · `diukur` = 4)
- `06-script-and-story`: **16 kartu** · ~55.684 token (`dilihat_bergerak` = 11/1/4 · `diukur` = 16)

### B. Pemilahan Aturan Mekanik Universal vs. Catatan Spesifik Proyek
1. **Aturan mekanik universal yang teruji:** Hanya **29 dari 97 kartu (29,9%)** yang berstatus `dilihat_bergerak: ya` (ditambah 3 `sebagian`). Sebanyak **65 kartu (67,0%)** masih berstatus `dilihat_bergerak: tidak` (dibaca dari frame diam/hipotesis), dan **4 kartu** (`01`, `06`, `10-13`, `41`) berstatus `diukur: tidak` tanpa video sumber.
2. **Kebocoran catatan spesifik proyek di dalam kartu:** Lima kartu memuat riwayat/koreksi proyek lama di bagian `Catatan pakai`:
   - `18-sentence-role-scene-matching.md` (rujukan kasus *Builder Trap* 11 Nov)
   - `83-head-space-word-staging.md` (5 entri *skill-development-journey* 16–22 Nov & *bdf26*, termasuk aturan waktu masuk `2–4 f` yang bertabrakan dengan `curves.ts`)
   - `85-full-bleed-slab-word-cuts.md` (catatan *skill-development-journey r7* 19 Nov & *perkenalan*)
   - `86-midline-word-growth-montage.md` (secara eksplisit mencatat dirinya duplikat pola `46`)
   - `87-focus-pull-word-stack.md` (catatan *skill-development-journey* `D-475` 19 Nov)
3. **File kandidat di `cookbook/teknik/` (3 file, ~6.796 token):** `animasi-karakter-clawd.md`, `kinetic-typography.md`, dan `launch-motion.md` berstatus "kandidat belum teruji di video kita" dan banyak mengulang mekanik yang sudah ada di kartu `25`, `26`, `41`, atau di `ae-primitives/`.

### C. Perbandingan Sebelum vs. Sesudah Grouping & Compression

| Metrik | Sebelum (Saat Ini) | Sesudah (Grouped Domain Packs) | Penghematan |
|---|---:|---:|---:|
| **Jumlah kartu aktif** | 97 kartu (+ 3 `teknik/` + 2 `contoh-gagal/`) | **44 Invariant Cards + 1 Core Pack (`00`)** *(13 KEEP + 22 MERGE + 2 Audio + 7 QC `Q01–Q07`; seluruh 97 kartu lama disimpan utuh di `cookbook/_vault/`; 5 kartu non-terukur & 3 `teknik/` diarsipkan ke `archive/cookbook-legacy/`)* | **−54,6% unit** |
| **Rata-rata ukuran per kartu** | ~132 baris (~3.555 token) | **10–15 baris (~220 token)** | **−93,8% / kartu** |
| **Ukuran `INDEX.md`** | ~7.485 token (29.942 C) | **~485 token (~1.940 C, target < 600)** | **−93,5%** |
| **Total seluruh korpus kartu** | ~344.888 token (97 kartu) / ~390.740 token (`cookbook/`) | **~10.800 token** *(INDEX + seluruh 7 Domain Packs)* | **−96,9% s.d. −97,2%** |
| **Beban rata-rata per sesi produksi** | ~344.888 tok *(full)* / ~30.877 tok *(alur saat ini: `MOTION-CORE` + `INDEX` + 3–4 kartu penuh + `LANTAI`/`GUIDE`/`contoh-gagal`)* | **~4.970 token** *(Build rata-rata)* / **~5.960 token** *(Build + QC)* | **−98,6% vs full** / **−83,9% vs sesi saat ini** |

#### Estimasi Token per Tipe Konten (Progressive Loading)

| Tipe Konten | Paket Dimuat Saat Build | Token Build | Paket QC Saat Finishing | Token Total (Build+QC) | Hemat vs Sesi Saat Ini (~30.877 tok) |
|---|---|---:|---|---:|---:|
| **Motion Graphics Explainer** | `INDEX` (485) + `00-core` (820) + `01-motion` (1.540) + `04-ui-cutout` (1.980) + `05-audio` (880) | **~5.705** | `+06-qc` (1.320) | **~7.025** | **77,2% – 81,5%** |
| **Documentary / Behindwork Storytelling** | `INDEX` (485) + `00-core` (820) + `03-doc-story` (2.420) + `01-motion` (1.540) + `05-audio` (880) | **~6.145** | `+06-qc` (1.320) | **~7.465** | **75,8% – 80,1%** |
| **Talking-Head Reels** | `INDEX` (485) + `00-core` (820) + `02-typo-th` (1.320) + `05-audio` (880) | **~3.505** | `+06-qc` (1.320) | **~4.825** | **84,4% – 88,6%** |
| **Coded Carousel (`vibedesign`)** | `INDEX` (485) + `00-core` (820) + `04-ui-cutout` *(atau 6 kartu `vibedesign` ~1.100 tok)* + `Q06` (220) | **~2.625 – 4.605** | *(sudah termasuk `Q06`)* | **~2.625 – 4.605** | **85,1% – 91,5%** |
| **Rata-rata 4 Format** | — | **~4.970** *(jika carousel pakai `04` penuh)* | — | **~5.960** | **80,7% – 83,9%** |

---

## 2. Proposed Domain Packs

Struktur baru memisahkan konteks berdasarkan jenis produksi dan tahap kerja menjadi **7 Domain Packs** (`00` s.d. `06`), sehingga agent produksi hanya memuat aturan inti + pak domain yang relevan dengan format kontennya.

### Ringkasan 7 Domain Packs Baru

| Pack | Ruang Lingkup & Isi | Komposisi | Estimasi Token |
|---|---|---|---:|
| **`00-core-invariants`** | Aturan mekanik universal lintas semua format (video & statis). Disarikan dari 10 butir inti `MOTION-CORE.md` & `LANTAI.md` Kelas H tanpa contoh proyek atau selera gaya: (1) satu lapisan teks kinetik tanpa pita subtitle; (2) zona aman teks (≤ 8% dari subjek, bebas wajah/logo); (3) keterbacaan HP ≥ 4,5:1 & 1–3 kata/blok; (4) teks hanya dari ucapan tanpa duplikasi; (5) satu fokus per momen; (6) nol crossfade, `curves.ts` + `SceneChain` ≥ 4 tipe/30 dtk; (7) frame 0 langsung hidup tanpa placeholder; (8) VO `TEMPO=1.0`, tanpa potong fonem atau limit suara; (9) 5 Pilar SFX baseline alami `0 dB` + musik per babak; (10) visual lulus sebelum audio, render lewat `render.sh final`, revisi diff per atribut. | 1 file ringkas (10 invarian Kelas H + hirarki otoritas) | **~820** *(target < 1.000)* |
| **`01-motion-camera-transitions`** | Gerak kamera 2D (`Papan.tsx`, `SpatialAnchorCamera`), virtual desktop stage, dive into UI, radial burst, dan transisi antar-shot/montase. | **7 Invariant Cards** (`14`, `63`, `65`, `80`, `25` + `M01`, `M02`) dari 10 kartu lama | **~1.540** |
| **`02-typography-talking-head`** | Kinetic typography di sekitar pembicara: slab di belakang kepala (`RVM`/`persepsi.py`), word orbit/contour, full-bleed cutaway slab, caption jangkar (dada/mulut/atas kepala), focus-pull relay, dan letter path/gloss. | **6 Invariant Cards** (`M03`–`M08`) dari 32 kartu lama | **~1.320** |
| **`03-documentary-story-narrative`** | Visual esai arsip & dokumenter (caption arsip, highlighter, selective-color spotlight, intercut esai, midline montage, narrative grading/desaturation) serta seluruh pola struktur naskah (`18`, `27`, `29`, `55`, `S01`–`S12`). | **11 Invariant Cards** (`18`, `27` + `M09`–`M17`) dari 28 kartu lama | **~2.420** |
| **`04-ui-cutout-dataviz-visuals`** | Visual produk/SaaS, UI-staged props, cutout halftone/kolase 2D, stiker/kertas scan, piktogram/diagram metafora (`17`, `88`, `95`–`98`), dan dataviz/counter/ticker (`M18`–`M20`). Untuk *Coded Carousel*, terhubung ke 6 kartu statis `claude/vibedesign/cookbook/` (`01`–`06`). | **9 Invariant Cards** (`17`, `88`, `95`–`98` + `M18`–`M20`) dari 18 kartu aktif *(5 diarsipkan)* | **~1.980** |
| **`05-audio-sfx-pacing`** | Pemetaan bunyi berbasis perubahan visual, vacuum-before-hit sting, 5 Pilar Sound Design + level alami `0 dB` (`A01`), serta VO tightening `TEMPO=1.0` + `pace_read`/`music_fit` (`A02`). | **4 Invariant Cards** (`M21`, `M22`, `A01`, `A02`) dari 4 kartu lama + `guide/sfx` & `guide/audio` | **~880** |
| **`06-qc-and-verification`** | Gerbang verifikasi lintas tahap yang sebelumnya tersebar di `MOTION-CORE.md` §3, `cookbook/contoh-gagal/`, `guide/hindari/`, dan `vibedesign/juri/`: (`Q01`) Brand lock & pre-build (`profil_cek`, `resep_check`, `cek_komposisi`, `TYPE-TEST`); (`Q02`) 6 kelas anti-pola visual dari 21 `contoh-gagal`; (`Q03`) `frame_audit.py` 100% + `kt_ocr` + `motion_lint`; (`Q04`) `audio_order`, `sfx_potong`, `audio_phone` + `sfx_density`; (`Q05`) revisi diff & `revisi_cek.py`; (`Q06`) 4 juri `vibedesign` carousel; (`Q07`) disiplin token & subagen (contact-sheet batch read + batas turns/gambar). | **7 Invariant Cards** (`Q01`–`Q07`) | **~1.540** |
| **`_vault/` (Tier 2 On-Demand)** | Seluruh 97 kartu bedahan penuh + strip gerak tetap disimpan utuh di `cookbook/_vault/` (tidak dimuat di awal sesi; dibuka hanya setelah tabel racikan 2–4 kartu disetujui untuk sanding visual). | 97 file asli utuh | **0 saat routing/build** |
| **`ARCHIVE / DEMOTE`** | Dipindahkan ke `archive/cookbook-legacy/` (tidak dimuat agen produksi harian): 5 kartu non-terukur/obsolete (`01`, `06`, `10-13`, `37`, `41`), 3 catatan `cookbook/teknik/` yang belum teruji (`animasi-karakter-clawd`, `kinetic-typography`, `launch-motion`), serta riwayat proyek lama dari `18`, `83`, `85`, `86`, `87`. | 5 kartu + 3 `teknik/` *(tidak dimuat di runtime)* | **0** *(di luar konteks produksi)* |

---

### Standar Format Invariant Card (10–15 Baris per Kartu)

Setiap kartu di Pack `01`–`06` wajib ditulis ulang ke format seragam 4-bagian maksimal **10–15 baris** (~180–230 token), memakai prinsip `SARINGAN.md` tanpa cerita proyek atau angka tebakan still:

```markdown
---
id: M03 | alias: [83, 59, 69, 78, 16, 43, 61] | pack: 02-typography-talking-head | verified: ya
---
### M03 · Behind-Head Slab & Scale Ladder
- **Trigger:** Talking head butuh penekanan kata kunci/klaim 1–2 kata (slab di belakang kepala atau tangga skala dada) tanpa meninggalkan wajah pembicara.
- **Anti-Pattern:** Menaruh slab di atas wajah tanpa matte, meletakkan kata pengantar jauh dari sudut slab, memasang kata dada di pakaian bermotif, atau membiarkan KT tampil tanpa Tick SFX (Pilar 3).
- **Invariant:** Pisahkan lapis `latar → slab → matte RVM (persepsi.py) → teks depan`; pakai huruf condensed tinggi (35–55% tinggi frame) dengan kata pengantar menempel sudut slab (`≤ 0,5×` tinggi hero); jika latar terang/pakaian bermotif, beralih ke full-bleed slab (`M05`) atau dinding samping polos.
- **Primitives/Ref:** `SpatialDepthStage.tsx`, `curves.ts` (`CURVE.land`/`whip`), `scripts/lego/persepsi.py`, keyframes `83-k1..k6`.
- **Gate:** `kt_ocr.py` PASS + `sfx_density.py` (Pilar 3 `tick`) PASS + still komposit bebas tabrakan wajah/motif (`QC-Q02`).
```

Contoh 2 — Pemadatan kartu `KEEP (Tighten)` (`14-tile-grid-cut-wipe.md`, dari 138 baris / ~2.764 token → 11 baris / ~195 token):

```markdown
---
id: "14" | alias: [] | pack: 01-motion-camera-transitions | verified: ya
---
### 14 · Tile-Grid Cut Wipe & Face-Orbit Build
- **Trigger:** Transisi cepat antar-B-roll/demo berenergi tinggi atau presenter memandu tutorial dengan kata kunci beruntun di sekitar kepala.
- **Anti-Pattern:** Memanjangkan wipe grid > 7 frame hingga terasa lambat, mengulang > 3× per 10 dtk, memakai fade-in polos, atau memakai face-orbit saat kamera genggam bergerak.
- **Invariant:** Gunakan `GridFlashReveal.tsx` 5–7 frame dengan puncak kilat putih/brand di f3 (tanpa blur tepi tile); untuk kata orbit di sekitar kepala pastikan tripod statis dan ruang kiri-kanan kepala polos; pasangan angka/istilah memakai rasio tinggi hero ≥ 5× pengantar.
- **Primitives/Ref:** `GridFlashReveal.tsx`, `FlashCut.tsx`, `curves.ts` (`CURVE.land`/`whip`), keyframes `14-flash-grid-urutan.jpg`.
- **Gate:** `motion_lint.py` PASS + transisi ≤ 7 frame tanpa frame kosong + `sfx_density.py` (Pilar 2 `transisi` & Pilar 3 `tick`) PASS.
```

---

### Tabel Pemetaan Penuh 97 Kartu Lama → Domain Packs Baru

Seluruh 97 kartu aktif dalam `claude/motion-graphic/cookbook/` terpetakan 100% di bawah ini (`KEEP`: 13 kartu, `MERGE`: 79 kartu, `ARCHIVE`: 5 kartu):

| ID | Kartu Lama (Path & Nama) | Status | Token Lama | Domain Pack Baru | Kartu Target Baru | Rekomendasi & Flag |
|---|---|---|---:|---|---|---|
| `14` | `01-camera-and-transitions/14-tile-grid-cut-wipe.md` (Tile-Grid Cut Wipe) | g:ya · m:ya | ~2,764 | `01-motion-camera-transitions` | `14-tile-grid-cut-wipe.md` | **KEEP** — Flag C-01 (SFX KT senyap -> tick) |
| `20` | `01-camera-and-transitions/20-object-match-transition-chain.md` (Object-Match Transition Chain) | g:tidak · m:ya | ~3,763 | `01-motion-camera-transitions` | `M01-zoom-and-match-transition-chain.md` | **MERGE** — Gabung 20+34+35; Flag C-02 (crossfade -> whip/mask) |
| `21` | `01-camera-and-transitions/21-beat-locked-day-montage.md` (Beat-Locked Day Montage) | g:tidak · m:ya | ~4,071 | `01-motion-camera-transitions` | `M02-beat-montage-and-flicker-cut.md` | **MERGE** — Gabung 21+66; Flag C-02, C-04 |
| `25` | `01-camera-and-transitions/25-radial-burst-world-bridge.md` (Radial Burst World Bridge) | g:tidak · m:ya | ~4,467 | `01-motion-camera-transitions` | `25-radial-burst-world-bridge.md` | **KEEP** — Flag C-05 (3D cam -> 2D stage), C-06 |
| `32` | `01-camera-and-transitions/32-presenter-archive-intercut.md` (Presenter Archive Intercut) | g:tidak · m:ya | ~3,529 | `03-documentary-story-narrative` | `M11-essay-archive-intercut-and-spotlight.md` | **MERGE** — Gabung ke M11; Flag C-01 |
| `34` | `01-camera-and-transitions/34-receding-zoom-out-chain.md` (Receding Zoom-Out Chain) | g:tidak · m:ya | ~4,141 | `01-motion-camera-transitions` | `M01-zoom-and-match-transition-chain.md` | **MERGE** — Gabung 20+34+35; Flag C-05 |
| `35` | `01-camera-and-transitions/35-object-zoom-through-chain.md` (Object Zoom-Through Chain) | g:tidak · m:ya | ~4,126 | `01-motion-camera-transitions` | `M01-zoom-and-match-transition-chain.md` | **MERGE** — Gabung 20+34+35; Flag C-02 |
| `63` | `01-camera-and-transitions/63-virtual-camera-desktop-stage.md` (Virtual Camera Desktop Stage) | g:ya · m:ya | ~3,966 | `01-motion-camera-transitions` | `63-virtual-camera-desktop-stage.md` | **KEEP** — Flag C-01, C-06 (crop tepi) |
| `65` | `01-camera-and-transitions/65-camera-dive-into-ui.md` (Camera Dive Into UI) | g:sebagian · m:ya | ~3,553 | `01-motion-camera-transitions` | `65-camera-dive-into-ui.md` | **KEEP** — Lengkapi T4/T5 parsial |
| `66` | `01-camera-and-transitions/66-silhouette-flicker-cut.md` (Silhouette Flicker Cut) | g:tidak · m:ya | ~2,428 | `01-motion-camera-transitions` | `M02-beat-montage-and-flicker-cut.md` | **MERGE** — Gabung 21+66; verifikasi strip gerak |
| `80` | `01-camera-and-transitions/80-camera-walk-word-canvas.md` (Camera-Walk Word Canvas) | g:tidak · m:ya | ~3,281 | `01-motion-camera-transitions` | `80-camera-walk-word-canvas.md` | **KEEP** — Flag C-02 (fade-in 6f -> mask/reveal) |
| `02` | `02-typography-and-captions/02-subject-bracketing-sticker-words.md` (Subject-Bracketing Sticker Words) | g:tidak · m:ya | ~4,065 | `02-typography-talking-head` | `M04-subject-bracketing-and-contour-type.md` | **MERGE** — Gabung ke M04; Flag C-01, C-02 |
| `03` | `02-typography-and-captions/03-flat-color-giant-type-cards.md` (Flat-Color Giant Type Cards) | g:tidak · m:ya | ~3,745 | `02-typography-talking-head` | `M05-full-bleed-slab-cutaway-cards.md` | **MERGE** — Gabung ke M05; Flag C-01, C-04 (subtitle pita bawah) |
| `04` | `02-typography-and-captions/04-centerline-weight-contrast-caption.md` (Centerline Weight-Contrast Caption) | g:tidak · m:ya | ~3,699 | `03-documentary-story-narrative` | `M09-archive-essay-caption-and-highlighter.md` | **MERGE** — Gabung ke M09; Flag C-01, C-02 (opacity 0->1) |
| `07` | `02-typography-and-captions/07-word-per-beat-color-build.md` (Word-Per-Beat Color Build) | g:tidak · m:ya | ~3,859 | `02-typography-talking-head` | `M07-focus-pull-and-word-beat-relay.md` | **MERGE** — Gabung ke M07; Flag C-01, C-02 |
| `15` | `02-typography-and-captions/15-light-fill-caption-card.md` (Light-Fill Caption Card) | g:tidak · m:ya | ~2,054 | `02-typography-talking-head` | `M06-talking-head-anchored-captions.md` | **MERGE** — Gabung ke M06; Flag C-02, C-04 |
| `16` | `02-typography-and-captions/16-silhouette-backed-verdict-word.md` (Silhouette-Backed Verdict Word) | g:tidak · m:ya | ~2,456 | `02-typography-talking-head` | `M03-behind-head-and-scale-ladder.md` | **MERGE** — Gabung ke M03; Flag C-02 (crossfade), C-04 (lower third) |
| `22` | `02-typography-and-captions/22-subject-contour-text-wrap.md` (Subject-Contour Text Wrap) | g:tidak · m:ya | ~4,292 | `02-typography-talking-head` | `M04-subject-bracketing-and-contour-type.md` | **MERGE** — Gabung ke M04; Flag C-01, C-04 |
| `26` | `02-typography-and-captions/26-per-scene-type-treatment-set.md` (Per-Scene Type Treatment Set) | g:ya · m:ya | ~4,135 | `02-typography-talking-head` | `M04-subject-bracketing-and-contour-type.md` | **MERGE** — Induk (g:ya); Flag C-01, C-05 (3D CTA drop -> 2D/decal) |
| `31` | `02-typography-and-captions/31-paper-cutout-annotation.md` (Paper Cutout Annotation) | g:tidak · m:ya | ~4,251 | `02-typography-talking-head` | `M04-subject-bracketing-and-contour-type.md` | **MERGE** — Gabung ke M04; Flag C-01 |
| `37` | `02-typography-and-captions/37-guide-side-perspective-text.md` (Guide-Side Perspective Text) | g:tidak · m:ya | ~3,990 | `ARCHIVE` | `archive/cookbook-legacy/37-guide-side-perspective-text.md` | **ARCHIVE** — g:tidak; pola voxel/3D screen tertutup M03/M04 & melanggar C-05 |
| `38` | `02-typography-and-captions/38-giant-word-mouth-cover.md` (Giant-Word Mouth Cover) | g:tidak · m:ya | ~3,425 | `02-typography-talking-head` | `M05-full-bleed-slab-cutaway-cards.md` | **MERGE** — Gabung ke M05; Flag C-01, C-04 |
| `40` | `02-typography-and-captions/40-fixed-center-sentence-relay.md` (Fixed-Center Sentence Relay) | g:tidak · m:ya | ~3,468 | `02-typography-talking-head` | `M07-focus-pull-and-word-beat-relay.md` | **MERGE** — Gabung ke M07; Flag C-01 |
| `43` | `02-typography-and-captions/43-size-ladder-chest-words.md` (Size-Ladder Chest Words) | g:tidak · m:ya | ~3,470 | `02-typography-talking-head` | `M03-behind-head-and-scale-ladder.md` | **MERGE** — Gabung ke M03; Flag C-01 |
| `44` | `02-typography-and-captions/44-curved-path-letter-arrival.md` (Curved-Path Letter Arrival) | g:tidak · m:ya | ~3,270 | `02-typography-talking-head` | `M08-expressive-letter-path-and-gloss.md` | **MERGE** — Gabung 44+62+74+47; Flag C-01, C-04 (bottom-strip T5) |
| `45` | `02-typography-and-captions/45-ceiling-headline-stack.md` (Ceiling Headline Stack) | g:tidak · m:ya | ~2,947 | `02-typography-talking-head` | `M06-talking-head-anchored-captions.md` | **MERGE** — Gabung ke M06; Flag C-01 |
| `46` | `02-typography-and-captions/46-giant-word-scale-jump.md` (Giant-Word Scale Jump) | g:tidak · m:ya | ~3,347 | `03-documentary-story-narrative` | `M12-midline-scale-jump-archive-montage.md` | **MERGE** — Gabung ke M12 (Flag C-06, C-08) |
| `47` | `02-typography-and-captions/47-camera-flown-type-objects.md` (Camera-Flown Type Objects) | g:tidak · m:ya | ~3,723 | `02-typography-talking-head` | `M08-expressive-letter-path-and-gloss.md` | **MERGE** — Gabung ke M08; Flag C-01, C-05 (extruded 3D) |
| `48` | `02-typography-and-captions/48-highlighter-caption-box.md` (Highlighter Caption Box) | g:tidak · m:ya | ~3,397 | `03-documentary-story-narrative` | `M09-archive-essay-caption-and-highlighter.md` | **MERGE** — Gabung ke M09; Flag C-02 |
| `49` | `02-typography-and-captions/49-typed-sentence-punch-in.md` (Typed Sentence Punch-In) | g:tidak · m:ya | ~3,255 | `02-typography-talking-head` | `M07-focus-pull-and-word-beat-relay.md` | **MERGE** — Gabung ke M07; Flag C-01, C-02 (linear) |
| `59` | `02-typography-and-captions/59-occluded-giant-keyword-slam.md` (Occluded Giant Keyword Slam) | g:tidak · m:ya | ~3,495 | `02-typography-talking-head` | `M03-behind-head-and-scale-ladder.md` | **MERGE** — Gabung ke M03; Flag C-01, C-02 |
| `60` | `02-typography-and-captions/60-mouth-level-word-flank.md` (Mouth-Level Word Flank) | g:tidak · m:ya | ~3,178 | `02-typography-talking-head` | `M06-talking-head-anchored-captions.md` | **MERGE** — Gabung ke M06; Flag C-01, C-02 |
| `61` | `02-typography-and-captions/61-chest-caption-keyword-backdrop.md` (Chest Caption Keyword Backdrop) | g:tidak · m:ya | ~3,475 | `02-typography-talking-head` | `M03-behind-head-and-scale-ladder.md` | **MERGE** — Gabung ke M03; Flag C-01, C-02 |
| `62` | `02-typography-and-captions/62-per-letter-gloss-headline.md` (Per-Letter Gloss Headline) | g:tidak · m:ya | ~3,357 | `02-typography-talking-head` | `M08-expressive-letter-path-and-gloss.md` | **MERGE** — Gabung ke M08; Flag C-01, C-02 |
| `64` | `02-typography-and-captions/64-stepped-label-poster-loop.md` (Stepped Label Poster Loop) | g:tidak · m:ya | ~2,054 | `02-typography-talking-head` | `M05-full-bleed-slab-cutaway-cards.md` | **MERGE** — Gabung ke M05; Flag C-01 |
| `67` | `02-typography-and-captions/67-morphing-card-number-counter.md` (Morphing Card Number Counter) | g:tidak · m:ya | ~3,932 | `04-ui-cutout-dataviz-visuals` | `M20-dataviz-bars-counters-and-tickers.md` | **MERGE** — Gabung ke M20; Flag C-01 |
| `68` | `02-typography-and-captions/68-design-tool-text-edit-sentences.md` (Design-Tool Text Edit Sentences) | g:tidak · m:ya | ~4,575 | `04-ui-cutout-dataviz-visuals` | `M18-ui-staged-cursor-and-component-morph.md` | **MERGE** — Gabung ke M18; Flag C-01 |
| `69` | `02-typography-and-captions/69-behind-head-scale-ladder.md` (Behind-Head Scale Ladder) | g:tidak · m:ya | ~3,054 | `02-typography-talking-head` | `M03-behind-head-and-scale-ladder.md` | **MERGE** — Gabung ke M03; Flag C-01 |
| `72` | `02-typography-and-captions/72-soft-gradient-word-stage.md` (Soft Gradient Word Stage) | g:tidak · m:ya | ~2,867 | `02-typography-talking-head` | `M07-focus-pull-and-word-beat-relay.md` | **MERGE** — Gabung ke M07; Flag C-01 |
| `73` | `02-typography-and-captions/73-beat-locked-word-build.md` (Beat-Locked Word Build) | g:tidak · m:ya | ~2,444 | `02-typography-talking-head` | `M07-focus-pull-and-word-beat-relay.md` | **MERGE** — Gabung ke M07; Flag C-05 |
| `74` | `02-typography-and-captions/74-scripted-keyword-overhang.md` (Scripted Keyword Overhang) | g:tidak · m:ya | ~3,703 | `02-typography-talking-head` | `M08-expressive-letter-path-and-gloss.md` | **MERGE** — Gabung ke M08; Flag C-01 |
| `75` | `02-typography-and-captions/75-single-word-center-beat.md` (Single-Word Center Beat) | g:tidak · m:ya | ~3,543 | `02-typography-talking-head` | `M07-focus-pull-and-word-beat-relay.md` | **MERGE** — Gabung ke M07; Flag C-01 |
| `77` | `02-typography-and-captions/77-brightness-spotlight-caption.md` (Brightness-Spotlight Caption) | g:tidak · m:ya | ~3,771 | `03-documentary-story-narrative` | `M11-essay-archive-intercut-and-spotlight.md` | **MERGE** — Gabung ke M11; Flag C-01 |
| `78` | `02-typography-and-captions/78-roto-sandwiched-giant-word.md` (Roto-Sandwiched Giant Word) | g:tidak · m:ya | ~3,688 | `02-typography-talking-head` | `M03-behind-head-and-scale-ladder.md` | **MERGE** — Gabung ke M03; Flag C-06 |
| `79` | `02-typography-and-captions/79-keyword-cutaway-card.md` (Keyword Cutaway Card) | g:tidak · m:ya | ~3,356 | `02-typography-talking-head` | `M05-full-bleed-slab-cutaway-cards.md` | **MERGE** — Gabung ke M05; Flag C-01, C-04 |
| `83` | `02-typography-and-captions/83-head-space-word-staging.md` (Head-Space Word Staging) | g:ya · m:ya | ~4,030 | `02-typography-talking-head` | `M03-behind-head-and-scale-ladder.md` | **MERGE** — Induk (g:ya); pindahkan catatan proyek 16-22 Nov; Flag C-01, C-07 |
| `85` | `02-typography-and-captions/85-full-bleed-slab-word-cuts.md` (Full-Bleed Slab Word Cuts) | g:ya · m:ya | ~3,943 | `02-typography-talking-head` | `M05-full-bleed-slab-cutaway-cards.md` | **MERGE** — Induk (g:ya); pindahkan catatan proyek 19 Nov; Flag C-01, C-04 (lower-third T2) |
| `86` | `02-typography-and-captions/86-midline-word-growth-montage.md` (Midline Word-Growth Montage) | g:sebagian · m:ya | ~3,496 | `03-documentary-story-narrative` | `M12-midline-scale-jump-archive-montage.md` | **MERGE** — Induk parsial (g:sebagian); duplikat 46 (Flag C-08) |
| `87` | `02-typography-and-captions/87-focus-pull-word-stack.md` (Focus-Pull Word Stack) | g:ya · m:ya | ~3,863 | `02-typography-talking-head` | `M07-focus-pull-and-word-beat-relay.md` | **MERGE** — Induk (g:ya); pindahkan catatan proyek 19 Nov; Flag C-01, C-06 |
| `89` | `02-typography-and-captions/89-block-reveal-essay-montage.md` (Block-Reveal Essay Montage) | g:ya · m:ya | ~3,837 | `03-documentary-story-narrative` | `M11-essay-archive-intercut-and-spotlight.md` | **MERGE** — Induk (g:ya); Flag C-01 |
| `90` | `02-typography-and-captions/90-caption-anchored-shot-swap.md` (Caption-Anchored Shot Swap) | g:ya · m:ya | ~3,318 | `02-typography-talking-head` | `M06-talking-head-anchored-captions.md` | **MERGE** — Induk (g:ya); Flag C-01 |
| `91` | `02-typography-and-captions/91-headroom-phrase-swap-caption.md` (Headroom Phrase-Swap Caption) | g:ya · m:ya | ~2,980 | `02-typography-talking-head` | `M06-talking-head-anchored-captions.md` | **MERGE** — Gabung ke M06 (g:ya); Flag C-01 |
| `92` | `02-typography-and-captions/92-negative-space-cumulative-caption.md` (Negative-Space Cumulative Caption) | g:ya · m:ya | ~3,167 | `03-documentary-story-narrative` | `M09-archive-essay-caption-and-highlighter.md` | **MERGE** — Induk (g:ya); Flag C-01 |
| `97` | `02-typography-and-captions/97-scanned-paper-word-swap.md` (Scanned-Paper Word Swap) | g:ya · m:ya | ~5,193 | `04-ui-cutout-dataviz-visuals` | `97-scanned-paper-word-swap.md` | **KEEP** — Terverifikasi g:ya; padatkan 145L -> 15L; Flag C-01 |
| `01` | `03-spatial-and-ui-layouts/01-single-object-red-cutaway.md` (Single-Object Neon Cutaway) | g:tidak · m:tidak | ~2,717 | `ARCHIVE` | `archive/cookbook-legacy/01-single-object-red-cutaway.md` | **ARCHIVE** — g:tidak, m:tidak; tanpa video sumber; tertutup M05 |
| `05` | `03-spatial-and-ui-layouts/05-ui-staged-sentence-props.md` (UI-Staged Sentence Props) | g:tidak · m:ya | ~4,067 | `04-ui-cutout-dataviz-visuals` | `M18-ui-staged-cursor-and-component-morph.md` | **MERGE** — Gabung 05+28+68+71; Flag C-01, C-02 |
| `06` | `03-spatial-and-ui-layouts/06-rounded-card-chapter-chips.md` (Rounded Card Chapter Chips) | g:tidak · m:tidak | ~2,583 | `ARCHIVE` | `archive/cookbook-legacy/06-rounded-card-chapter-chips.md` | **ARCHIVE** — g:tidak, m:tidak; cross-dissolve 24-36f melanggar B13 (C-02) |
| `10-13` | `03-spatial-and-ui-layouts/10-13-floating-photo-satellites.md` (Floating Photo Satellites) | g:tidak · m:tidak | ~2,569 | `ARCHIVE` | `archive/cookbook-legacy/10-13-floating-photo-satellites.md` | **ARCHIVE** — g:tidak, m:tidak; gambar diam saja; tertutup SpatialDepthStage |
| `17` | `03-spatial-and-ui-layouts/17-diegetic-tag-explainer.md` (Diegetic Tag Explainer) | g:ya · m:ya | ~4,585 | `04-ui-cutout-dataviz-visuals` | `17-diegetic-tag-explainer.md` | **KEEP** — Terverifikasi g:ya; Flag C-01, C-06 |
| `19` | `03-spatial-and-ui-layouts/19-archive-photo-spotlight.md` (Archive Photo Spotlight) | g:tidak · m:ya | ~4,482 | `03-documentary-story-narrative` | `M10-selective-color-archive-spotlight.md` | **MERGE** — Gabung 19+39 (satu keluarga dengan SelectiveColorSpotlight.tsx); Flag C-01 |
| `28` | `03-spatial-and-ui-layouts/28-cursor-threaded-ui-showreel.md` (Cursor-Threaded UI Showreel) | g:tidak · m:ya | ~3,124 | `04-ui-cutout-dataviz-visuals` | `M18-ui-staged-cursor-and-component-morph.md` | **MERGE** — Gabung ke M18; Flag C-02 (crossfade) |
| `30` | `03-spatial-and-ui-layouts/30-gradient-word-to-object-morph.md` (Gradient Word-to-Object Morph) | g:tidak · m:ya | ~3,170 | `04-ui-cutout-dataviz-visuals` | `M19-saas-flow-scaffold-and-state-morph.md` | **MERGE** — Gabung 30+33+36+84; Flag C-02 |
| `33` | `03-spatial-and-ui-layouts/33-dot-field-world-shift.md` (Dot Field World Shift) | g:tidak · m:ya | ~4,193 | `04-ui-cutout-dataviz-visuals` | `M19-saas-flow-scaffold-and-state-morph.md` | **MERGE** — Gabung ke M19; Flag C-06 |
| `36` | `03-spatial-and-ui-layouts/36-one-object-approval-sequence.md` (One-Object Approval Sequence) | g:tidak · m:ya | ~3,875 | `04-ui-cutout-dataviz-visuals` | `M19-saas-flow-scaffold-and-state-morph.md` | **MERGE** — Gabung ke M19 |
| `39` | `03-spatial-and-ui-layouts/39-selective-color-group-index.md` (Selective-Color Group Index) | g:tidak · m:ya | ~3,307 | `03-documentary-story-narrative` | `M10-selective-color-archive-spotlight.md` | **MERGE** — Gabung 19+39; Flag C-01 |
| `41` | `03-spatial-and-ui-layouts/41-layered-still-hierarchy.md` (Layered Still Hierarchy) | g:tidak · m:tidak | ~3,235 | `ARCHIVE` | `archive/cookbook-legacy/41-layered-still-hierarchy.md` | **ARCHIVE** — g:tidak, m:tidak; still-only tanpa gerak terbukti |
| `56` | `03-spatial-and-ui-layouts/56-bouncing-ball-bar-build.md` (Bouncing-Ball Bar Build) | g:tidak · m:ya | ~2,428 | `04-ui-cutout-dataviz-visuals` | `M20-dataviz-bars-counters-and-tickers.md` | **MERGE** — Gabung 56+57+67+81; Flag C-01 |
| `57` | `03-spatial-and-ui-layouts/57-nested-shape-morph-dataviz.md` (Nested Shape-Morph Dataviz) | g:tidak · m:ya | ~2,229 | `04-ui-cutout-dataviz-visuals` | `M20-dataviz-bars-counters-and-tickers.md` | **MERGE** — Gabung ke M20 |
| `71` | `03-spatial-and-ui-layouts/71-ui-component-morph-chain.md` (UI Component Morph Chain) | g:tidak · m:ya | ~4,196 | `04-ui-cutout-dataviz-visuals` | `M18-ui-staged-cursor-and-component-morph.md` | **MERGE** — Gabung ke M18; Flag C-02 (crossfade) |
| `81` | `03-spatial-and-ui-layouts/81-object-ticker-burst.md` (Object Ticker Burst) | g:tidak · m:ya | ~3,321 | `04-ui-cutout-dataviz-visuals` | `M20-dataviz-bars-counters-and-tickers.md` | **MERGE** — Gabung ke M20; Flag C-02 (linear marquee) |
| `84` | `03-spatial-and-ui-layouts/84-single-take-ui-scaffold.md` (Single-Take UI Scaffold) | g:tidak · m:ya | ~2,960 | `04-ui-cutout-dataviz-visuals` | `M19-saas-flow-scaffold-and-state-morph.md` | **MERGE** — Gabung ke M19; Flag C-04 |
| `88` | `03-spatial-and-ui-layouts/88-metaphor-object-scene-chain.md` (Metaphor-Object Scene Chain) | g:ya · m:ya | ~3,590 | `04-ui-cutout-dataviz-visuals` | `88-metaphor-object-scene-chain.md` | **KEEP** — Terverifikasi g:ya; pasangan S01; Flag C-01 |
| `95` | `03-spatial-and-ui-layouts/95-cutout-collage-metaphor.md` (Cutout-Collage Metaphor) | g:ya · m:ya | ~873 | `04-ui-cutout-dataviz-visuals` | `95-cutout-collage-metaphor.md` | **KEEP** — Terverifikasi g:ya; sudah sangat ringkas (43L) |
| `96` | `03-spatial-and-ui-layouts/96-familiar-ui-line-metaphor.md` (Familiar-UI Line Metaphor) | g:ya · m:ya | ~5,788 | `04-ui-cutout-dataviz-visuals` | `96-familiar-ui-line-metaphor.md` | **KEEP** — Terverifikasi g:ya; padatkan 166L -> 15L; Flag C-01 |
| `98` | `03-spatial-and-ui-layouts/98-grid-paper-sticker-list.md` (Three-Constant Sticker List) | g:ya · m:ya | ~6,171 | `04-ui-cutout-dataviz-visuals` | `98-three-constant-sticker-list.md` | **KEEP** — Terverifikasi g:ya; padatkan 163L -> 15L; Flag C-01, C-05 |
| `58` | `04-tactile-textures-and-grading/58-single-hue-act-lighting.md` (Single-Hue Act Lighting) | g:tidak · m:ya | ~3,099 | `03-documentary-story-narrative` | `M13-meaning-driven-color-and-act-lighting.md` | **MERGE** — Gabung 58+76; Flag C-05 (3D stage) |
| `76` | `04-tactile-textures-and-grading/76-meaning-triggered-desaturation.md` (Meaning-Triggered Desaturation) | g:tidak · m:ya | ~3,038 | `03-documentary-story-narrative` | `M13-meaning-driven-color-and-act-lighting.md` | **MERGE** — Gabung 58+76; Flag C-02 (linear), C-04 (karaoke bottom) |
| `23` | `05-sfx-and-audio-mapping/23-sonic-event-hierarchy.md` (Sonic Event Hierarchy) | g:tidak · m:ya | ~3,262 | `05-audio-sfx-pacing` | `M22-vacuum-hit-sting-and-sonic-bed.md` | **MERGE** — Gabung ke M22; Flag C-02 (crossfade) |
| `24` | `05-sfx-and-audio-mapping/24-visual-event-pop-mapping.md` (Visual-Event Pop Mapping) | g:tidak · m:ya | ~4,523 | `05-audio-sfx-pacing` | `M21-change-marked-sfx-and-pop-mapping.md` | **MERGE** — Gabung ke M21; Flag C-01, C-02 (blur-dissolve) |
| `93` | `05-sfx-and-audio-mapping/93-change-marked-sound-hierarchy.md` (Change-Marked Sound Hierarchy) | g:ya · m:ya | ~5,748 | `05-audio-sfx-pacing` | `M21-change-marked-sfx-and-pop-mapping.md` | **MERGE** — Induk (g:ya); gabung 93+24; Flag C-01 |
| `94` | `05-sfx-and-audio-mapping/94-vacuum-before-hit-logo-sting.md` (Vacuum-Before-Hit Logo Sting) | g:ya · m:ya | ~4,782 | `05-audio-sfx-pacing` | `M22-vacuum-hit-sting-and-sonic-bed.md` | **MERGE** — Induk (g:ya); gabung 94+23 |
| `18` | `06-script-and-story/18-sentence-role-scene-matching.md` (Sentence-Role Scene Matching) | g:tidak · m:ya | ~5,085 | `03-documentary-story-narrative` | `18-sentence-role-scene-matching.md` | **KEEP** — Pindahkan catatan Builder Trap 11 Nov; Flag C-01 |
| `27` | `06-script-and-story/27-claim-then-joke-beat-ladder.md` (Claim-Then-Joke Beat Ladder) | g:tidak · m:ya | ~3,417 | `03-documentary-story-narrative` | `27-claim-then-joke-beat-ladder.md` | **KEEP** — Tighten pola false-hook + chat punchline; Flag C-01 |
| `29` | `06-script-and-story/29-wager-plant-and-payoff-arc.md` (Wager Plant and Payoff Arc) | g:tidak · m:ya | ~3,380 | `03-documentary-story-narrative` | `M16-origin-profile-and-case-study-arcs.md` | **MERGE** — Gabung ke M16 |
| `55` | `06-script-and-story/55-material-shift-story-arc.md` (Material-Shift Story Arc) | g:tidak · m:ya | ~3,810 | `03-documentary-story-narrative` | `M15-personal-confession-and-essay-arcs.md` | **MERGE** — Gabung ke M15; Flag C-01 |
| `S01` | `06-script-and-story/S01-misconception-flip-argument.md` (Misconception-Flip Argument) | g:ya · m:ya | ~2,182 | `03-documentary-story-narrative` | `M14-contrarian-reframe-and-debate-scripts.md` | **MERGE** — Induk naskah argumentatif (g:ya) |
| `S02` | `06-script-and-story/S02-insult-concede-reframe-essay.md` (Insult-Concede-Reframe Essay) | g:ya · m:ya | ~1,679 | `03-documentary-story-narrative` | `M15-personal-confession-and-essay-arcs.md` | **MERGE** — Induk esai personal (g:ya) |
| `S03` | `06-script-and-story/S03-demonstrate-the-claim-tip-ladder.md` (Demonstrate-the-Claim Tip Ladder) | g:ya · m:ya | ~1,974 | `03-documentary-story-narrative` | `M17-tutorial-proof-loop-and-tip-ladders.md` | **MERGE** — Gabung S03+S08+S09+S10 (g:ya) |
| `S04` | `06-script-and-story/S04-outsider-verifies-then-joins-arc.md` (Outsider-Verifies-Then-Joins Arc) | g:ya · m:ya | ~2,041 | `03-documentary-story-narrative` | `M16-origin-profile-and-case-study-arcs.md` | **MERGE** — Gabung S04+S05+29 (g:ya) |
| `S05` | `06-script-and-story/S05-peak-then-pivot-origin-profile.md` (Peak-Then-Pivot Origin Profile) | g:ya · m:ya | ~2,146 | `03-documentary-story-narrative` | `M16-origin-profile-and-case-study-arcs.md` | **MERGE** — Gabung ke M16 (g:ya) |
| `S06` | `06-script-and-story/S06-steelman-story-concede-debate.md` (Steelman-Story-Concede Debate) | g:ya · m:ya | ~4,250 | `03-documentary-story-narrative` | `M14-contrarian-reframe-and-debate-scripts.md` | **MERGE** — Gabung ke M14 (g:ya) |
| `S07` | `06-script-and-story/S07-refuse-inoculate-simplify-callout.md` (Refuse-Inoculate-Simplify Stance) | g:sebagian · m:ya | ~4,419 | `03-documentary-story-narrative` | `M14-contrarian-reframe-and-debate-scripts.md` | **MERGE** — Gabung ke M14 (g:sebagian) |
| `S08` | `06-script-and-story/S08-result-first-barrier-removal-recipe.md` (Result-First Barrier-Removal Recipe) | g:ya · m:ya | ~4,500 | `03-documentary-story-narrative` | `M17-tutorial-proof-loop-and-tip-ladders.md` | **MERGE** — Gabung ke M17 (g:ya) |
| `S09` | `06-script-and-story/S09-category-problem-meta-proof-loop.md` (Show-First Category-Flip Proof Loop) | g:ya · m:ya | ~4,740 | `03-documentary-story-narrative` | `M17-tutorial-proof-loop-and-tip-ladders.md` | **MERGE** — Gabung ke M17 (g:ya) |
| `S10` | `06-script-and-story/S10-countable-command-cascade.md` (Countable Command Cascade) | g:ya · m:ya | ~4,016 | `03-documentary-story-narrative` | `M17-tutorial-proof-loop-and-tip-ladders.md` | **MERGE** — Gabung ke M17 (g:ya) |
| `S11` | `06-script-and-story/S11-two-pressure-confession-reframe.md` (Two-Pressure Confession, Proof-Before-Reframe) | g:ya · m:ya | ~3,869 | `03-documentary-story-narrative` | `M15-personal-confession-and-essay-arcs.md` | **MERGE** — Gabung ke M15 (g:ya) |
| `S12` | `06-script-and-story/S12-mirror-triplet-definition-flip.md` (Mirror-Triplet Definition Flip) | g:ya · m:ya | ~4,172 | `03-documentary-story-narrative` | `M14-contrarian-reframe-and-debate-scripts.md` | **MERGE** — Gabung ke M14 (g:ya) |

#### Pemetaan File Pendamping `cookbook/` & `vibedesign/`

| Kelompok / File | Jumlah | Token Lama | Tujuan Baru | Rekomendasi |
|---|---:|---:|---|---|
| `cookbook/teknik/animasi-karakter-clawd.md`, `kinetic-typography.md`, `launch-motion.md` | 3 | ~6.796 | `archive/cookbook-legacy/teknik/` | **ARCHIVE / DEMOTE** — kandidat belum teruji; pola yang relevan sudah diserap `ae-primitives/` (`Kursor`, `Penghitung`, `curves.ts`) |
| `cookbook/contoh-gagal/README.md` + `08-bdf26-p1-kontras-balance.md` | 2 | ~3.620 | `06-qc-and-verification/Q02-visual-balance-and-anti-slop.md` *(gambar tetap sebagai arsip referensi)* | **MERGE & COMPRESS** — 21 kasus dipadatkan menjadi 6 kelas anti-pola cek still |
| `cookbook/INDEX.md`, `POLA.md`, `SFX.md` | 3 | ~29.334 | `INDEX.md` (< 600 tok) + `CATALOG.md` (mesin CLI `pilih_kartu.py`) | **SPLIT** — `INDEX.md` untuk LLM routing; `CATALOG.md` khusus script lookup |
| `claude/vibedesign/cookbook/01..06` | 6 | ~2.881 | Tetap di `claude/vibedesign/cookbook/` *(ditautkan dari `INDEX.md` khusus format Coded Carousel)* | **KEEP (Isolated)** — hanya dimuat untuk *Coded Carousel*, tidak dimuat agen video |

---

## 3. Daftar Merge & Konflik

### A. Daftar 22 Grup Merge (`M01`–`M22`)

| ID Target | Domain Pack | Kartu Lama yang Digabung | Kartu Induk | Token Sebelum | Target Token | Alasan Mekanis Penggabungan |
|---|---|---|---:|---:|---:|---|
| `M01` | `01-motion` | `20`, `34`, `35` | `20` *(semua `g:tidak`)* | ~12.030 | ~220 | Ketiganya membahas rantai transisi zoom/object-match lintas dunia (push-through / pull-back) dengan mekanik kamera kontinu yang sama |
| `M02` | `01-motion` | `21`, `66` | `21` *(keduanya `g:tidak`)* | ~6.499 | ~220 | Sama-sama montase B-roll terkunci beat musik (cut ramp + silhouette flicker cut) tanpa narasi padat |
| `M03` | `02-typo-th` | `83`, `59`, `69`, `78`, `16`, `43`, `61` | **`83`** (`g:ya`) | ~23.438 | ~220 | Semuanya menempatkan kata hero raksasa di belakang kepala/siluet (`persepsi.py` RVM) atau scale ladder dada pada talking head |
| `M04` | `02-typo-th` | `26`, `02`, `22`, `31` | **`26`** (`g:ya`) | ~16.743 | ~220 | Sama-sama teknik stiker/cutout/kontur kata yang mengorbit atau mengapit subjek pembicara |
| `M05` | `02-typo-th` | `85`, `03`, `38`, `79`, `64` | **`85`** (`g:ya`) | ~16.523 | ~220 | Semuanya memotong keluar dari footage ke kartu slab tipografi layar penuh (flat-color cutaway cards) |
| `M06` | `02-typo-th` | `90`, `91`, `45`, `60`, `15` | **`90`** (`g:ya`) | ~14.475 | ~220 | Caption jangkar statis/semi-statis di area tetap talking head (atas kepala, mulut, dada) saat shot atau frasa berganti |
| `M07` | `02-typo-th` | `87`, `07`, `40`, `49`, `72`, `73`, `75` | **`87`** (`g:ya`) | ~23.297 | ~220 | Relay kata per beat di pusat frame: word-by-word build, focus-pull stack, dan single-word center beat |
| `M08` | `02-typo-th` | `44`, `62`, `74`, `47` | `62` / `44` | ~14.053 | ~220 | Tipografi ekspresif berbasis lintasan/per-huruf (curved path, gloss sweep, overhang script, flow object) |
| `M09` | `03-doc-story` | `92`, `04`, `48` | **`92`** (`g:ya`) | ~10.263 | ~220 | Caption narasi di atas foto arsip menggunakan ruang negatif, bobot centerline, dan stabilo (`HighlighterSweep.tsx`) |
| `M10` | `03-doc-story` | `19`, `39` | `39` *(dirujuk `SelectiveColorSpotlight.tsx`)* | ~7.789 | ~220 | Mekanik identik: menyorot satu tokoh/subjek berwarna di tengah foto kerumunan arsip yang didesaturasi |
| `M11` | `03-doc-story` | `89`, `32`, `77` | **`89`** (`g:ya`) | ~11.137 | ~220 | Esai/opini ber-intercut arsip: presenter/VO bergantian cepat dengan bukti foto, klip, dan spotlight kutipan |
| `M12` | `03-doc-story` | `86`, `46` | `86` (`g:sebagian`) | ~6.843 | ~220 | Kartu `86` secara eksplisit mencatat dirinya duplikat pola `46` (kata kecil midline + scale jump + kolase arsip) |
| `M13` | `03-doc-story` | `58`, `76` | `58` / `76` | ~6.137 | ~220 | Seluruh isi folder `04-tactile-textures-and-grading`: pergeseran hue cahaya per babak & desaturasi bermakna |
| `M14` | `03-doc-story` | `S01`, `S06`, `S07`, `S12` | **`S01`** (`g:ya`) | ~15.023 | ~220 | Empat struktur naskah debat/kontra-arus: mematahkan anggapan umum, steelman, dan definisi ulang |
| `M15` | `03-doc-story` | `S02`, `S11`, `55` | **`S02`** (`g:ya`) | ~9.358 | ~220 | Tiga struktur esai/pengakuan personal: pengakuan tekanan → bukti → reframe & twist |
| `M16` | `03-doc-story` | `S04`, `S05`, `29` | **`S04`** (`g:ya`) | ~7.567 | ~220 | Tiga struktur profil asal-usul & studi kasus klien (*origin pivot*, verifikasi pihak luar, *wager payoff*) |
| `M17` | `03-doc-story` | `S03`, `S08`, `S09`, `S10` | **`S03`** (`g:ya`) | ~15.230 | ~220 | Empat struktur tutorial/demo berbasis bukti nyata di layar & *tip ladder* yang bisa dihitung |
| `M18` | `04-ui-cutout` | `05`, `28`, `68`, `71` | `68` / `71` | ~15.962 | ~220 | Panggung UI produk dengan kursor aktif (`Kursor.tsx`), pengetikan prompt, dan morph antar-komponen UI |
| `M19` | `04-ui-cutout` | `30`, `33`, `36`, `84` | `33` / `84` | ~14.195 | ~220 | Alur SaaS multi-langkah, approval card, scaffold framework bertingkat, dan morph dot-field ke state solusi |
| `M20` | `04-ui-cutout` | `56`, `57`, `67`, `81` | `56` / `67` | ~11.910 | ~220 | Visualisasi data dan angka: bar chart memantul, nested shape dataviz, counter roll (`Penghitung.tsx`), dan ticker burst |
| `M21` | `05-audio` | `93`, `24` | **`93`** (`g:ya`) | ~10.271 | ~220 | Pemetaan SFX berbasis perubahan visual/gestur dan kepadatan invers terhadap ucapan |
| `M22` | `05-audio` | `94`, `23` | **`94`** (`g:ya`) | ~8.044 | ~220 | Arsitektur sound design logo sting/puncak (squash → vacuum → single hit) + filter-swept ambient bed |

---

### B. Daftar Konflik Aturan yang Ditemukan (`FLAG CONFLICT`)

Audit mendeteksi **8 konflik aturan lintas-dokumen dan antar-kartu** yang saat ini berpotensi membuat agent salah eksekusi atau gagal gerbang otomatis:

| Kode | Tingkat | Sumber yang Bertabrakan | Deskripsi Konflik Nyata | Resolusi yang Diusulkan |
|---|---|---|---|---|
| **C-01** | **Kritis** | **59 kartu cookbook** (`14`, `83`, `85`, `87`, `89`–`92`, `96`–`98`, dll.) vs. **`LANTAI.md` E24, `guide/sfx/FAMILI.md` §0, `sfx_density.py`** | 59 kartu menulis `SFX: senyap (kata KT per kata)` karena ditulis sebelum aturan **5 Pilar Sound Design** (21 Nov), sedangkan Pilar 3 & `sfx_density.py` mewajibkan satu klik impuls `pilar: tick` (2–4 varian, −14…−20 dB) per kata KT yang muncul. | Saat migrasi ke Invariant Card, hapus label `SFX: senyap` untuk KT; rujuk seragam ke `05-audio/A01` (Pilar 3 `tick`). |
| **C-02** | **Kritis** | **32 kartu cookbook** (eksplisit: `04`, `06`, `16`, `20`, `21`, `24`, `28`, `30`, `60`, `71`, `80`, `81`, `96`) vs. **`LANTAI.md` B13 & B13a, `motion_lint.py`** | Mekanik Remotion di kartu lama masih menyarankan `crossfade 4 f`, `cross-dissolve 24–36 f`, `fade-in 6 f`, dan `interpolate` `linear`, yang langsung ditolak oleh B13 ("nol crossfade, fade bukan gerak") dan `motion_lint.py`. | Ganti semua transisi `crossfade`/`fade-in`/`linear` pada Invariant Card dengan `WhipPanTransition`, `GridFlashReveal`, mask wipe, dan kurva `curves.ts`. Kartu `06` diarsipkan. |
| **C-03** | **Tinggi** | **`LANTAI.md` E24** vs. **`MOTION-CORE.md` #9 & `guide/sfx/GUIDE.md` §Cara 8** | `LANTAI.md` E24 (baris 50) menulis gain SFX transisi/aksen `−4…−10 dB` dan tick `−14…−20 dB`; sementara `MOTION-CORE.md` #9 (baris 52) & `GUIDE.md` §Cara 8 menulis **baseline SFX alami `0 dB`** (diturunkan `−2…−6 dB` hanya jika menutup VO) dan tick `−12…−18 dB`. | Minta keputusan Irfan di Fase 1: jadikan **`0 dB` baseline alami (diturunkan hanya saat bertabrakan dengan VO)** sebagai satu-satunya angka di `00-core-invariants` & `05-audio/A01`, lalu sinkronkan `LANTAI.md` E24. |
| **C-04** | **Tinggi** | **21 kartu + `guide/teks/GUIDE.md` L7** (`03`, `16` T3, `44` T5, `76` T2, `85` T2) vs. **`LANTAI.md` A1 & A7** | Beberapa kartu (dan catatan contoh bagus kartu `03` di `guide/teks/GUIDE.md`) mempertahankan *lower-third* atau *subtitle* terpisah di pita bawah, bertabrakan dengan A1 (satu lapisan teks, nol pita subtitle) dan A7 (teks kunci tidak di 8% bawah frame). | Putuskan di Invariant Card: semua ucapan menyatu di 1 lapisan KT; T-blok *lower-third/bottom strip* pada `16`, `44`, `85` dibuang saat merge. |
| **C-05** | **Tinggi** | **30 kartu** (eksplisit: `25` T4, `26` T5, `37` T3, `47` T1, `58`, `98`) vs. **`MOTION-CORE.md` §1 & `teknik/animasi-karakter-clawd.md`** | Sebagian kartu menyebut `Always-Moving 3D Camera`, `3D CTA`, atau voxel/3D extruded, sedangkan `MOTION-CORE.md` §1 melarang render/aset 3D pada proyek 2D flat/Vox/cutout tanpa persetujuan eksplisit di `RESEP.md`. | Pisahkan tegas: proyek 2D/cutout wajib memakai `SpatialDepthStage` (2,5D lapisan-z) atau `Papan.tsx` 2D; efek 3D murni hanya boleh jika disetujui eksplisit di `RESEP.md`. |
| **C-06** | **Sedang** | **4 kartu + `vibedesign/05`** (`25` T2, `33` T2, `46` T1, `63`, `vibedesign/05`) vs. **`LANTAI.md` A4, C16 & `teks_cek.py`** | Pola *cropped giant word* sengaja memotong tepi kata raksasa ke pinggir kanvas, sedangkan `LANTAI.md` A4/C16 dan `teks_cek.py` (`TEPI`) menandai kata terpotong tepi sebagai pelanggaran margin aman 5%. | Di Invariant Card, tegaskan bahwa kata isi/ucapan wajib berada di dalam margin aman 5%; pemotongan tepi hanya sah untuk teks dekoratif non-ucapan (dengan pengecualian tertulis di `RESEP.md`). |
| **C-07** | **Sedang** | **Kartu `83` Catatan Pakai (18 Nov)** vs. **`LANTAI.md` B13a & `PENDING.md` (19 Nov)** | Catatan pakai kartu `83` mengunci durasi masuk `2–4 f` saat kartu dipakai, bertabrakan dengan rumus jarak-bobot `dur(px, fps, bobot)` di `B13a` (`curves.ts`) dan status kartu sebagai "contoh mutu, bukan target angka" (`AUDIT-KARTU-19NOV.md` §4). | Pindahkan catatan historis `83` ke `SUMBER.md`/`DECISIONS.md`; gunakan kurva `curves.ts` dengan parameter awal yang disesuaikan lewat sanding visual. |
| **C-08** | **Sedang** | **Kartu `86` vs `46`, plus 65 kartu `g:tidak` & 4 kartu `m:tidak`** | Kartu `86` menduplikasi mekanik `46`; 65 kartu masih berstatus hipotesis still-only; `01`, `06`, `10-13`, `41` belum diukur sama sekali. | Gabungkan `86+46` (`M12`), arsipkan `01`, `06`, `10-13`, `41`, dan beri tag `verified: hipotesis` pada kartu yang belum dilihat bergerak agar agen tidak memperlakukannya sebagai hukum mutlak. |

---

## 4. Draft `INDEX.md` & Loading Matrix

Draf di bawah ini dirancang langsung untuk menggantikan `claude/motion-graphic/cookbook/INDEX.md` saat ini (~7.485 token) menjadi peta routing ringkas (**~485 token (chars/4) / ~380 token (words×1,33)**, di bawah batas 600 token pada kedua metode hitung). Tabel lengkap 43 kartu dipindahkan ke `CATALOG.md` agar hanya dibaca oleh CLI `pilih_kartu.py`.

```markdown
# Cookbook · INDEX (Router)

> **Protokol:** Muat `00-core-invariants.md`, lalu **hanya** pack sesuai Loading Matrix di bawah. Dilarang memuat folder lain. Lookup per beat via `pilih_kartu.py` (`CATALOG.md`).

## 1. Domain Packs
| Pack | Path | Cakupan | Tok |
|---|---|---|---:|
| **Core** | `00-core-invariants.md` | 10 invarian universal Kelas H (wajib) | ~820 |
| **P01** | `01-motion-camera-transitions/` | Kamera 2D, UI stage, burst, zoom-chain, montase | ~1.540 |
| **P02** | `02-typography-talking-head/` | KT wajah, slab belakang kepala, orbit, cutaway | ~1.320 |
| **P03** | `03-documentary-story-narrative/` | Arsip, spotlight, grading, naskah `S01–S12` | ~2.420 |
| **P04** | `04-ui-cutout-dataviz-visuals/` | UI SaaS, cutout kolase, stiker, diagram, dataviz | ~1.980 |
| **P05** | `05-audio-sfx-pacing/` | 5 Pilar SFX (`0 dB`), tick, sting, VO, musik | ~880 |
| **P06** | `06-qc-and-verification/` | Pre-build, anti-slop, frame audit, audio HP, diff | ~1.320 |
| **Static** | `../../vibedesign/cookbook/` | 6 kartu statis carousel/poster PNG 2× | ~1.100 |

## 2. Loading Matrix
| Tipe Konten | WAJIB Build | Finishing | WAJIB Skip | Tok |
|---|---|---|---|---:|
| **Motion Graphics Explainer** | `Core`, `P01`, `P04`, `P05` | `P06` | `P02`, `P03`, `Static` | ~5.705 / 7.025 |
| **Documentary / Behindwork** | `Core`, `P03`, `P01`, `P05` | `P06` | `P02`, `P04`, `Static` | ~6.145 / 7.465 |
| **Talking-Head Reels** | `Core`, `P02`, `P05` | `P06` | `P01`*, `P03`, `P04`, `Static` | ~3.505 / 4.825 |
| **Coded Carousel (`vibedesign`)** | `Core`, `Static`, `P06/Q06` | `P06/Q06` | `P01`, `P02`, `P03`, `P05` | ~2.625 |

*\*Talking-Head:* jika beat butuh demo UI/whip, ambil 1 kartu `P01` via `pilih_kartu.py`.

## 3. Lookup CLI
- Per beat: `python3 claude/motion-graphic/scripts/cookbook/pilih_kartu.py --pack <P01..P05> --cari "<trigger>"`
- ID lama: `python3 tools/cookbook.py cari <id_lama>`
```

---

## 5. Rencana Migrasi Bertahap

Migrasi dijalankan hanya setelah `REMAP_PROPOSAL.md` disetujui Irfan, melalui 6 fase aman tanpa memutus proyek aktif (`behindwork-v3-ep01` & `behindwork-v3-ep03`) maupun 183 unit test yang sudah berjalan:

1. **Fase 0 · Bekukan Baseline di Branch Terpisah**
   - Buat branch `refactor/cookbook-domain-packs` dari `main` (`cf279d7`).
   - Catat hasil baseline wajib: `./tools/doctor.sh`, `python3 tools/cookbook.py cek`, `python3 tools/sumber_cek.py`, dan `python3 -m unittest discover -s claude/motion-graphic/scripts/tests`.

2. **Fase 1 · Keputusan Irfan atas Konflik Aturan (C-01 s.d. C-08)**
   - Selesaikan kontradiksi sebelum menulis ulang satu kartu pun: terutama **C-01** (ganti `SFX: senyap` KT → Pilar 3 `tick`), **C-02** (hapus saran `crossfade`/`fade-in`/`linear` → `curves.ts` + `SceneChain`), dan **C-03** (sinkronkan angka `LANTAI.md` E24 dengan `MOTION-CORE.md` #9 `0 dB` baseline alami).
   - Konfirmasi apakah 5 kartu legacy (`01`, `06`, `10-13`, `37`, `41`) + 3 file `cookbook/teknik/` disetujui masuk `archive/cookbook-legacy/`.

3. **Fase 2 · Penulisan Domain Packs & Isolasi Catatan Proyek**
   - Buat `claude/motion-graphic/cookbook/00-core-invariants.md` (< 1.000 token) dan 6 direktori pack (`01-motion-camera-transitions/` s.d. `06-qc-and-verification/`).
   - Konversi 13 kartu `KEEP`, gabungkan 79 kartu ke 22 file `M01`–`M22`, dan buat `A01–A02` serta `Q01–Q06` memakai format standar Invariant Card (10–15 baris).
   - Simpan seluruh ID lama di field `alias: [...]` pada frontmatter kartu target agar `resep_check.py` dan `RESEP.md` proyek aktif tetap resolve otomatis.
   - Pindahkan riwayat proyek dari kartu `18`, `83`, `85`, `86`, `87` ke `claude/motion-graphic/SUMBER.md` sesuai `SARINGAN.md` agar lolos `sumber_cek.py`.
   - Pindahkan 5 kartu non-terukur + 3 file `teknik/` ke `archive/cookbook-legacy/` (frame kunci di `guide/referensi/sheets/keyframes/` tetap dipertahankan).

4. **Fase 3 · Pemisahan `INDEX.md` (Router) & `CATALOG.md` (Mesin Pencari)**
   - Perbarui `tools/cookbook.py`:
     - Ubah daftar `FOLDERS` menjadi 6 pack aktif (`01`..`06`).
     - Ganti generator `INDEX.md` yang lama menjadi generator `CATALOG.md` (berisi tabel penuh 43 kartu + alias lama), sementara `INDEX.md` tetap berupa router ringkas < 600 token (divalidasi otomatis panjang tokennya di `cookbook.py cek`).
     - Tambahkan validasi skema Invariant Card (`Trigger`, `Anti-Pattern`, `Invariant`, `Gate`) dan cek batas token (`INDEX.md < 600`, `00-core-invariants.md < 1.000`).
   - Perbarui `claude/motion-graphic/scripts/cookbook/pilih_kartu.py` agar default membaca `CATALOG.md` dan mendukung argumen `--pack` (`01..05` atau `P01..P05`).

5. **Fase 4 · Pembaruan Pintu Masuk, Rute & Skrip Terkait**
   File yang terdeteksi merujuk struktur `cookbook/01..06` atau `cookbook/INDEX.md` dan harus diperbarui serempak:
   - Dokumentasi & gerbang masuk: `AGENTS.md`, `tools/peta.py` (lalu regenerasi `PETA.md`), `claude/motion-graphic/MOTION-CORE.md`, `claude/motion-graphic/SKILL.md`, `claude/motion-graphic/cookbook/README.md`, `claude/irfan-creative-workflow/SKILL.md`, `claude/vibedesign/DESIGN-CORE.md`, `claude/motion-graphic/templates/TAHAP.md`, `claude/motion-graphic/templates/roles/pemeriksa-frame.md`.
   - Skrip & unit test: `claude/motion-graphic/scripts/juri/resep_check.py`, `claude/motion-graphic/scripts/tests/test_pilih_kartu.py`, `claude/motion-graphic/scripts/tests/test_audit_dokumen.py`, `tools/sync_lantai.py`, `tools/doctor.sh`.

6. **Fase 5 · Verifikasi Gerbang Penuh & Uji A/B (`EVALS-DESIGN.md`)**
   - Jalankan seluruh suite pengecekan: `./tools/doctor.sh`, `python3 tools/sumber_cek.py`, `python3 tools/cookbook.py cek --ketat`, `python3 tools/peta.py`, dan `python3 -m unittest discover -s claude/motion-graphic/scripts/tests`.
   - Lakukan uji A/B pada 1 episode nyata (mis. `siirfan` reel atau `behindwork-v3` sandbox) dengan DeepSeek dan Claude untuk memverifikasi pengurangan token prompt aktual (target ≤ 7.500 token konteks cookbook per sesi) serta memastikan tidak ada penurunan kepatuhan terhadap `render.sh final` dan `gerbang_produksi.sh`.
   - Setelah lulus, merge ke `main` dan sinkronkan ke PC server `/home/irfan/work/skill-development`.
---

## 6. Keputusan Jalan Tengah (v2) & Audit Forensik Sesi `Professional motion graphics video editing`

### A. Keputusan Jalan Tengah yang Dikunci (Default Aman + Motivated Editorial Override)
1. **Two-Tier Cookbook:** Seluruh 97 kartu lama tetap dipertahankan utuh di `cookbook/_vault/` (*on-demand* untuk sanding setelah racikan 2–4 kartu disetujui), sedangkan 5 kartu non-terukur (`01`, `06`, `10-13`, `37`, `41`) + 3 file `cookbook/teknik/` diarsipkan ke `archive/cookbook-legacy/`.
2. **Enam Resolusi Konflik (`C-01` s.d. `C-06`):**
   - `C-01`: `kt_tick` mendukung 2 mode resmi di `EDITING.md`/`RESEP.md`: `per-word` (explainer/UI/listicle) dan `accent-only` (dokumenter/talking-head tenang).
   - `C-02`: Default tetap nol crossfade & nol linear easing; pengecualian bermotivasi untuk *micro-blend ≤ 4 frame* di puncak *match-cut/zoom-through* (`scale ≥ 3×` atau objek ≥ 80% frame) dan *blur-to-sharp* yang dipadu gerak `curves.ts`.
   - `C-03`: Level SFX relatif terhadap VO (`0 dB` pre-fader agar tidak melemah sebelum mix; impact/transisi `−2…−6 dB` relatif VO; tick/foley `−12…−18 dB`).
   - `C-04`: Ucapan 100% satu lapisan KT; *lower-third* bawah hanya untuk label identitas non-ucapan (1× saat tokoh diperkenalkan).
   - `C-05`: `render_mode: 2d-flat | 2.5d-hybrid` dikunci di `BRAND.md`/`EDITING.md` (mencegah aset 3D nyasar ke proyek 2D flat tanpa melarang kedalaman 2.5D).
   - `C-06`: Ucapan tetap di dalam margin aman 5%; *editorial bleed* tepi hanya sah untuk teks grafis non-ucapan bertanda `role: bleed-display` di `RESEP.md`.

### B. Audit Forensik Sesi `"Professional motion graphics video editing"` (`behindwork-launch`, 25 Nov 2026)
- **Telemetri Nyata (`3f922582-8992-439d-bbe0-923864f2cf13.jsonl` + 29 subagen):**
  - **1.518.276.702 token terproses** (`1.474.872.213` cache_read, `34.737.647` cache_creation, `8.652.566` output, `14.276` input) di **6.622 assistant turns** (`1.076` main + `5.546` subagen), **487,3 MB** log JSONL, **981 image reads**, seluruhnya pada model **`claude-opus-5-5`** (worker terberat `W8`: 88,36M token / 406 turns / 66 gambar; `W2 r2`: 81,30M token / 331 turns / 85 gambar).
  - **Pemanfaatan Cookbook:** hanya membaca 2 file `contoh-gagal/` + 15 file keyframe + `LANTAI.md`, dan **tidak membaca `BRAND.md`/`EDITING.md` maupun `INDEX.md` cookbook** pada trace `Read` langsung.
- **Akar Masalah Desain #1 (Mockup iPhone & UI Web Generator Fiktif):**
  - `Ponsel.tsx` (bezel iPhone 15 Pro + Dynamic Island) masuk lewat `STORYBOARD.md` B13 & `BRIEF-V2.md` §3B/§3G; UI generator fiktif `"Create post / Generate"` (`Postmint AI`) masuk lewat `STORYBOARD.md` B12 karena larangan *"nol mockup SaaS fiktif"* di `BEHINDWORK-LAUNCH-SCRIPT.md` tidak terbawa ke `BRIEF.md`/`RESEP.md`.
- **Akar Masalah Desain #2 (Tipografi 3-Perlakuan + Serif + Tabrakan Lapisan):**
  - Pencabutan parsial larangan `BRIEF.md` aturan 8 oleh `BRIEF-V2.md` §4B.4 + `D-026` membuka `Instrument Serif Italic` di `KataBlurTajam.tsx`, yang kemudian digabungkan worker dalam satu baris bersama `Helvetica Medium` + `Helvetica Bold` (`the engine behind your best` dan `quality quietly gets left behind`), melanggar `LANTAI.md` A6, serta menempatkan wordmark `Behindwork` menimpa strip thumbnail & kartu UI (melanggar `LANTAI.md` C14).
- **Tiga Invarian Baru yang Langsung Dipasang dalam Migrasi Ini:**
  1. **Frameless UI (`D20` & `00-core-invariants`):** di gaya 2D/2.5D editorial, tampilkan isi UI/feed/DM sebagai kartu bersih tanpa bezel hardware iPhone fisik dan tanpa mockup SaaS fiktif kecuali diminta eksplisit oleh brief.
  2. **Single-Emphasis Typography (`A6` & `00-core-invariants`):** maksimal satu sistem penekanan per frasa (dilarang menggabungkan regular + bold + serif italic dalam satu baris), dan kata hero wajib berada di ruang bersih tanpa menimpa thumbnail/kartu UI.
  3. **Subagent & Image-Read Budget (`Q07` & `00-core-invariants`):** gabungkan still ke dalam 1 *contact sheet* per audit (dilarang membaca 25–85 gambar satuan berulang), batasi worker adegan `≤ 60 turns` & `≤ 10 gambar`, dan pisahkan model Sutradara vs Worker.
