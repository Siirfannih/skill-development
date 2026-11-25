# F0 · Deep Research: Metodologi Reverse-Engineering & Arsitektur Handmade Mechanical Presets

Dokumen ini menjawab dua pertanyaan fondasional Irfan sebelum penutupan `F6` dan penyusunan draf akhir `F7`:
1. **Bagaimana metodologi reverse-engineering yang tepat** untuk menerjemahkan 80+ kartu referensi menjadi skill berpikir non-slop?
2. **Apakah Kinetic Typography, Transitions, Camera Movement, dan efek lain bisa disimpan sebagai handmade mechanical preset** (setara *After Effects preset `.ffx`* yang terlepas dari Remotion built-in) supaya model tidak menulis animasi dari nol, melainkan **memilih preset → menyesuaikan parameter ke kondisi video → hanya menulis kode baru bila preset belum ada**?

---

## 1. Metodologi Reverse-Engineering yang Tepat untuk Sistem Desain & Gerak

Berdasarkan riset literatur sistem token gerak (W3C Design Tokens / DTCG motion tokens, *choreography rules*, dan teknik evaluasi desain AI berbasis *exemplar* vs *LLM self-scoring*), proses reverse-engineering yang sehat memisahkan empat lapisan sekaligus menghindari perangkap evaluasi subjektif:

### A. Empat Lapisan Dekonstruksi Sistem Gerak (Audit → Token → Koreografi → Aksesibilitas)
1. **Inventaris Empiris per Adegan (Pemicu → Properti → Profil Waktu → Arah Ruang):** Bukan meniru *look* mentah ("elegan/dinamis"), melainkan mencatat (a) apa pemicu perubahan (onset kata VO, klik tombol, ganti topik), (b) properti mana yang berubah (`translate`, `scale`, `blur`, `clipPath`, luminansi latar), (c) profil akselerasi & durasi berbasis frame/jarak, dan (d) orientasi spasial (*masuk dari kanan → keluar meneruskan gerak*).
2. **Pemisahan Token 3-Tingkat (*W3C DTCG 3-Tier Architecture*):**
   - **Tier 1 · Primitives (Matematika Polos):** Kurva kubik-bezier (`0.1, 0.75, 0.15, 1`), konstanta pegas teredam (`damping`, `stiffness`), fungsi jarum waktu/frame murni—**bebas merek dan bebas konteks adegan**.
   - **Tier 2 · Semantic Intent (Peran Gerak):** Menghubungkan fisika ke makna (`CURVE.land` untuk masuk yakin, `CURVE.heavy` untuk kamera besar, `CURVE.leave` untuk keluar akseleratif, atau peran teks `R1–R6` di `typography.md §8a`), ditambah *choreography rules* (konsistensi arah masuk↔keluar, jeda reaksi non-linear `REACT_MS`, dan asimetri masuk vs keluar `exit ≈ 0,65× enter`).
   - **Tier 3 · Theme & Shot Binding:** Di sinilah warna tema, font proyek, ukuran piksel aktual (`≥ 56 px @1080`), koordinat ruang kosong subjek, dan timestamp VO disuntikkan saat membangun shot.
3. **Evaluasi Dekopled Berbasis *Exemplar* (Menolak *LLM Self-Scoring Bias*):**
   Riset evaluasi AI (*Self-Preference Bias*, *Variance Compression*, & *Form-over-Substance Bias* pada skema LLM-as-a-judge) membuktikan bahwa meminta model yang sama menilai kreasinya dengan skor rubrik `0–10` menghasilkan nilai menggumpal aman (`7–8/10`) yang buta terhadap kemonotonan mekanik (*"AI look"*). Penawar yang terbukti:
   - Jalankan **pengecekan programatik deterministik lebih dulu** (kontras piksel lokal, batas durasi, larangan linear/crossfade/`scale(0)`, tabrakan bounding-box wajah);
   - Gunakan **perbandingan berdampingan terhadap *golden exemplar*** (frame kunci dari kartu referensi + daftar perilaku terjangkar *semantic anchor*), bukan skor `0–10` yang diisi model sendiri;
   - Pisahkan peran **pembangun** vs **hakim silang / uji transfer buta** dengan manusia (`Irfan`) sebagai penentu akhir di still & preview.

### B. Audit Metodologi Pipeline F1–F6 Kita Saat Ini

| Aspek Metodologi Ideal | Status di Pipeline Reverse-Engineering Kita (`F1–F6`) | Celah / Langkah Perbaikan Lanjutan |
|---|---|---|
| Inventaris & Anomali Objektif | **Kuat:** `F1-inventaris.csv` (97 kartu, 682 keyframe) & `F1-anomali.md` mencatat kembar `03/27`, file orphan, & status `dilihat_bergerak`. | Perlu verifikasi fisik untuk `41-still-canvas.jpg` (tidak ada di disk) dan pemisahan keyframe orphan `08, 42, 50, 54, 70`. |
| Pemisahan *Raw Study* vs Aturan Eksekusi | **Kuat:** F3 memaksa fase belajar (`F3-*-belajar.md`) sebelum merumuskan prinsip, plus `≥ 2` kartu independen per prinsip (`Catatan 1 Kartu` untuk temuan tunggal). | **68 dari 97 kartu** masih `dilihat_bergerak: tidak/sebagian` (termasuk `0/4` di `minimalist-dataviz-kinetic` & `13/15` di `documentary-archive`)—semua gerak di kartu tersebut wajib berstatus *hipotesis diam*. |
| Audio Reverse-Engineering | **Baru dibuka di F3b:** `84/97` kartu vault punya `## Audio` + log koreksi `DECISIONS.md` & `audio.md`. | Hampir seluruh catatan suara dari kartu belum didengar langsung telinga di sesi ini `(belum didengar)`; baru `guide/sfx/SFXIRFAN.md` & log `ears.py` yang terukur fisik. |
| Evaluasi Anti-Self-Scoring | **Kuat:** `Lantai C17` (banding still `25% & 100%` ke keyframe tema), `F6A` auditor bukti terpisah, `F6B` uji transfer buta, & penolakan skor `§9 anti-slop-design`. | Untuk kartu video `tidak` di masa depan, jadwalkan ekstraksi kurva kecepatan (*optical flow* / `ffmpeg` *scene score*) di `pc-server` (bukan di Mac). |

---

## 2. Jawaban Tegas: Handmade Mechanical Presets (Gaya `.ffx` AE, Tanpa Ketergantungan Remotion)

**Kesimpulan langsung:** **Ya—preset mekanikal buatan sendiri (bukan bergantung pada paket transisi/teks bawaan Remotion) sangat layak, justru krusial untuk mematikan AI slop, dan sebagian fondasinya sebenarnya sudah lahir di repo ini.**

Alasan mendasarnya dua:
1. Di AE, `.ffx` yang terasa profesional bukan sekadar *keyframe statis*, melainkan **ekspresi parametrik + kurva fisika** (`sourceRectAtTime`, `linear/ease`, `seed`, *inertial decay*) yang menempel ke geometri & durasi konten secara otomatis. Preset semacam ini **mengemas fisika & koreografi yang sudah disetujui manusia**, sehingga LLM tidak lagi menulis angka easing acak atau fallback ke `fade-in` setiap kali membuat adegan baru.
2. Di sisi arsitektur software, mekanik gerak 2D/2.5D tidak membutuhkan Remotion sama sekali untuk perhitungannya—Remotion hanyalah *frame-clock HTML/Chrome renderer*. Memisahkan mesin matematika dari pembungkus JSX membuat preset bertahan selamanya walau kelak renderer berganti ke **Playwright + HTML Canvas**, **Motion Canvas**, **WebGL/Three.js**, atau pipeline **FFmpeg / AE JSX**.

### Arsitektur 3 Lapisan (*Decoupled Mechanical Preset System*)

```
┌──────────────────────────────────────────────────────────────────────┐
│ LAPIS 3 · Thin Renderer Adapter (Boleh Remotion hari ini, swappable) │
│ • Pembungkus tipis: Remotion TSX / Playwright Canvas / AE ExtendScript│
│ • Membaca useCurrentFrame() & meneruskan ke Lapis 1 + CSS/SVG filter │
└───────────────────────────────▲──────────────────────────────────────┘
                                │ memanggil pure math
┌───────────────────────────────┴──────────────────────────────────────┐
│ LAPIS 2 · Manifest Preset & Protokol Penyesuaian Kondisi Video       │
│ • Alur kerja model: Tentukan Niat → Cek Indeks Preset →              │
│   [ADA] Panggil preset + ikat ke kondisi video (VO, jarak, rasio, UI)│
│   [TIDAK ADA] Tulis kode baru di atas Lapis 1 → Promosi jika lulus   │
└───────────────────────────────▲──────────────────────────────────────┘
                                │ memanggil primitive murni
┌───────────────────────────────┴──────────────────────────────────────┐
│ LAPIS 1 · Pure Frame-Math Core (0% Ketergantungan Remotion / React)  │
│ • fn(frame, fps, params) → {x, y, scale, rotX, rotY, blur, clip, op} │
│ • 100% deterministik, stateless, bebas Math.random/Date, murni TS/JS │
└──────────────────────────────────────────────────────────────────────┘
```

#### Bukti dari Audit Kode `scripts/remotion/` Saat Ini
Pemeriksaan langsung terhadap seluruh 23 file kode di `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/scripts/remotion/` menunjukkan struktur yang **sudah setengah terpisah**:
- **Sudah 0% Remotion (100% Pure Math TS):** `timing.ts` (`stagger`, `dampTrack`, `vanWijk`, `timeline`), `ae-primitives/inti/aeKeyframe.ts` (`aeValue`, `aeValueN`, `aeEase`, `overshootKeys`, `aeVelocity`), `ae-primitives/inti/gerak.ts` (`kecepatan`, `blurDariKecepatan`, `chromaDariKecepatan`), dan `ae-primitives/inti/acak.ts` (`acakBerbiji`, `acakIndeks`, `idAman`).
- **Mudah Diputus dari Remotion (hanya 1 baris impor `Easing, interpolate`):** `curves.ts` (`CURVE`, `dur`, `exitDur`, `react`, `move`, `arc`, `drift`). Karena `aeKeyframe.ts` sudah mengimplementasikan solver kubik-bezier murni tanpa paket apa pun, mengganti `interpolate`/`Easing` di `curves.ts` dengan ~15 baris fungsi kubik-bezier + clamp murni membuat **seluruh inti matematika `0%` bergantung pada Remotion**.
- **Pure-Math Helpers Sudah Ada di Dalam File TSX (tinggal diekstrak ke folder `core/` murni):** Hampir semua komponen `ae-primitives/` sudah mengekspor fungsi matematika murni terpisah dari komponen React: `whipOffset` (`WhipPanTransition.tsx`), `gridOrder` (`GridFlashReveal.tsx`), `overlapFrames` (`SceneChain.tsx`), `anchorCamera` + `coverBox` (`SpatialAnchorCamera.tsx`, kecuali `spring()` Remotion yang dapat diganti `dampTrack()` dari `timing.ts`), `depthFactor` (`SpatialDepthStage.tsx`), `sweepProgress` (`HighlighterSweep.tsx`), `flashEnvelope` (`FlashCut.tsx`), `invertActive` (`InvertFlash.tsx`), `nilaiPenghitung` (`Penghitung.tsx`), `posisiKursor` (`Kursor.tsx`).

---

## 3. Audit Kode Eksisting & Backlog Preset Prioritas per Tema

### A. Inventaris Status File Gerak Saat Ini

| File di `scripts/remotion/` | Fungsi & Simbol Utama | Ketergantungan Remotion | Cakupan terhadap Kartu & `T01–T32` |
|---|---|---|---|
| `timing.ts`, `aeKeyframe.ts`, `gerak.ts`, `acak.ts` | Kurva AE, *stagger* non-linear, *dampTrack* pegas, *vanWijk* zoom, velocity blur, RNG berbiji | **0% (Murni TS/Math)** | Menopang hampir semua fisika gerak `Lantai B10–B13a` & `aeEase(18,92)`. |
| `curves.ts`, `ae-primitives/presets.ts` | 7 kurva bernama (`land/heavy/whip/reveal/leave/wind/drift`), `dur()`, `react()`, `DURASI`, `WHIP`, `FLASH` | **Minimal** (`Easing, interpolate` di `curves.ts` mudah diganti murni) | Tier 1 & Tier 2 motion tokens lintas tema. |
| `WhipPanTransition.tsx`, `GridFlashReveal.tsx`, `SceneChain.tsx` | Transisi whip strip/tumpang + blur arah, gelombang petak `14`/`63`, perakit tumpang | **Hybrid** (`whipOffset`, `gridOrder`, `overlapFrames` murni; React+SVG/CSS wrapper) | Menutup `19.T3, 65.T2, 71.T4, 14.T1, 63.T3`. Belum punya radial burst, zoom-through, & grid-to-hero. |
| `FlashCut.tsx`, `InvertFlash.tsx` | Kilat 1–2 f solid/overexpose & inversi negatif solid/flicker/region | **Hybrid** (`flashEnvelope`, `invertActive` murni) | Menutup `66.T2, 19.T3, 86.T5, 23.T4`. |
| `SpatialAnchorCamera.tsx`, `MotionBlurWrapper.tsx`, `SpatialDepthStage.tsx`, `DirectionalBlur.tsx` | Kamera jangkar `coverBox`, wrapper blur translasi, panggung Z + fokus `blurPerUnit`, filter SVG directional blur `opaque` | **Coupled `spring()`** di `SpatialAnchorCamera` (ganti ke `dampTrack`), lainnya TSX + pure math (`depthFactor`) | Menutup `39.T1, 63.T1, 87.T2, 87.T3, 10-13.T1, 94.T5`. **Celah:** blur zoom/rotasi di `MotionBlurWrapper` belum ada (masih melempar ke `@remotion/motion-blur`). |
| `HighlighterSweep.tsx`, `SelectiveColorSpotlight.tsx`, `Scrim.tsx` | Sapuan stabilo *inline* `multiply`, elips warna selektif, *scrim* geser | **Hybrid** (`sweepProgress` murni; wrapper CSS/SVG) | Menutup `48.T1, 92.T5, 19.T1, 39.T1`. |
| `TeksBlok.tsx` (+ `LightSweep.tsx`) | Render blok KT dari kode `T*` | **Remotion JSX** (tanpa pemisahan pure-math keluar) | **Celah besar:** hanya mengimplementasi **6 dari 32 kode** (`T19, T01, T02, T03, T04, T11` + `FADE`); 26 kode `typography.md §8` lainnya melempar `Error`! |
| `Kursor.tsx`, `Penghitung.tsx`, `FlashGrid.tsx`, `SmoothAudioClip.tsx` | Kursor lengkung manusia (`posisiKursor`), penghitung `tabular-nums` (`nilaiPenghitung`), wrapper grid `14`, J/L-cut `<Audio>` | **Hybrid** (`posisiKursor`/`nilaiPenghitung` murni) kecuali `SmoothAudioClip.tsx` (100% Remotion `<Audio>/<Sequence>`) | Menutup `M18`, `M20`, `14.T1`, `§14.7`. |

### B. Backlog Preset Prioritas yang Belum Ada (Dipetakan ke 6 Tema)

| Kategori Preset | Nama Preset yang Diusulkan | Tema Pemilik | Kartu / Resep Pemicu | Masalah yang Diselesaikan Tanpa Menulis Kode dari Nol |
|---|---|---|---|---|
| **Kinetic Typography** | `ktMarqueeSelect` (`T05`) | `apple-saas-ui`, `editorial-metaphor-canvas` | `96-k1`, `34-k2`, `72-k3` | Kotak seleksi siku/handle sudut + Trim Paths 8 f → fill 4 f → klik, ukuran otomatis mengikuti kotak teks. |
| **Kinetic Typography** | `ktSlotSwap` (`T07`) & `ktAnchorWord` (`T24`) | `talking-head-kinetic`, `documentary-archive`, `editorial` | `90`, `91`, `86`, `77` | Penggantian kata di poros tetap tanpa 2 kata tajam bertumpuk dalam 1 frame; durasi ikut onset VO. |
| **Kinetic Typography** | `ktStickerDrop` (`T09`) & `ktCardStack` (`T10`) | `tactile-paper-collage` | `98`, `31`, `02` | Kemiringan deterministik berbiji `±2–10°`, pegas *drop*, bayangan `0-blur` hard offset vs `soft 3D` terpisah kelas material. |
| **Kinetic Typography** | `ktColorSettle` (`T20`/`G4`) & `ktFlipUpX` (`T28`) | `talking-head-kinetic`, `editorial-metaphor-canvas` | `26-k9`, `typography.md §8` | Kata baru masuk cepat dengan *tint* aksen lalu mengendap ke netral dalam 4–6 f (atau rotasi baseline 3D X). |
| **Kinetic Typography** | `ktBarLabelRise` (`T27`) & `datavizBarFill` | `minimalist-dataviz-kinetic` | `56`, `57`, `58`, `67` *(hipotesis diam)* | Grafik batang tumbuh `CURVE.reveal` + angka `tabular-nums` naik bersamaan dan label terkunci otomatis ke ujung batang. |
| **Transisi** | `radialBurstWipe` (`25.T1`) & `zoomThroughPortal` (`19.T4`/`C05`) | `apple-saas-ui`, `documentary-archive` | `ae-primitives/README.md` §Belum Ada | Dua transisi terukur teratas yang disebut eksplisit di `README.md` tetapi belum dibuat primitifnya. |
| **Transisi** | `polarityHardFlip` & `fullBleedSlabCutaway` | `talking-head-kinetic`, `editorial-metaphor-canvas` | `85`, `33`, `96` | Potong keras 1 f ke kanvas warna penuh (`88–95% W`, sapuan 3 f optional `85-k10`) dengan pengecekan kontras otomatis. |
| **Transisi & UI** | `gridToHeroPush` (`93.T6`) & `tapeWipeReveal` (`98`) | `apple-saas-ui`, `tactile-paper-collage` | `93`, `98-k1` (`ae-primitives/README.md`) | Grid montase terisi lalu kamera langsung menyelam ke 1 sel hero (`93`), serta sapuan pita bertekstur kertas (`98`). |
| **Matte & Grade** | `rvmBgOnlyRegrade` & `focusBlurBurst` | `talking-head-kinetic`, `editorial-metaphor-canvas` | `83-k7`, `85-k10`, `40-k5` | Meredupkan/mendinginkan latar di belakang matte RVM tanpa menyentuh skin tone wajah depan, dan burst blur latar belakang kalimat tajam. |
| **Audio-Sync Math** | `velocityPeakAudioSync` & `vacuumPreHitCalc` | Semua tema (`E24`, `I7`) | `audio.md §14.9`, `94` (`M22`) | Menghitung frame mulai whoosh/pop/vakum tepat dari puncak kecepatan kurva `gerak.ts` (output JSON cue universal tanpa Remotion). |

---

## 4. Guardrail Anti-Preset-Slop: Kapan Preset Membantu vs Menjadi Template Murahan

Preset mekanikal gagal dan kembali menjadi AI slop jika menyimpan **selera visual statis**. Agar tetap terasa buatan manusia di After Effects, seluruh preset wajib tunduk pada 5 pagar keras:

1. **Simpan Fisika & Relasi, Dilarang Keras Menyimpan Selera Merek:** Preset hanya menyimpan kurva waktu, hukum oklusi, rasio jarak, atau filter blur/chroma. Warna aksen, keluarga huruf, padding kertas, dan teks dilarang punya nilai merek default (selalu diwajibkan lewat props `tema` seperti disiplin `ae-primitives/presets.ts`).
2. **Waktu Berasal dari Suara & Jarak Layar—Bukan Angka Tetap:** Jangan pernah mengunci durasi `0,5 dtk` di semua layar. Masuk gerak dihitung dari jarak piksel (`dur(distancePx, fps, weight)` di `curves.ts`) dan/atau jendela onset→offset kata VO (`words.json`), sementara keluar disetel `0,65×` masuk (`exitDur`).
3. **Jeda & Stagger Tidak Boleh Linear Seragam (`i * k`):** Seperti ditunjukkan temuan `.ffx` & `timing.ts`, jeda antar-elemen harus berasal dari jarak ke titik asal + kurva (`stagger({ ease, jitter, seed })` atau `REACT_MS`), ditambah pembeda *random seed* deterministik per adegan agar duplikasi komponen tidak tampak seperti klon mekanis.
4. **Adaptasi Kondisi Bahan Wajib Sebelum Panggil Preset (`F4 I4`):** Model dilarang membabi buta memanggil preset *talking head chest zone* kalau footage berbaju motif, atau preset *RVM behind-head* jika headroom `< 20%`. Konteks video memilih preset; jika syarat visual gagal, preset dialihkan ke alternatif aman (*cutaway slab* / samping kepala).
5. **Satu *Hero Motion* per Adegan & Hak Menulis Kode Kustom:** Maksimal satu preset *hero motion* aktif bersamaan agar adegan tidak penuh tabrakan efek (`anti-slop-design §4`). Dan jika sebuah konsep visual unik tidak terwakili di indeks preset (misalnya metafora diagram khusus seperti garis jarak `80-k1` atau busur penghubung `88-k11`), model tetap menulis kode kustom berbasis **Lapis 1 (`curves.ts` + `timing.ts` + `aeKeyframe.ts`)**—bukan memaksa preset yang tidak pas.

---

## 5. Daftar Sumber (Riset Web & Audit Repo)

### Sumber Web (`search_web`)
- Sistem Token Gerak 3-Tier & W3C DTCG (*uiuxatlas.com*, *designsystemproblems.com*, *medium.com*, *open-design.ai* — ringkasan via `search_web` query 1): [uiuxatlas redirect](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHgdjKEp4g_SghgC1xXEJU8X_WTa3atoi5nQe2xvlt_vjFzq_zcCjNNRgEX1p2_O2xEcJ_qFZHBwiVC4LS7fJFRMLr8xHqchvkahtBlXVTKvIklAbpitMsviMlSVY9G0OJ9PAeCvc_YuA6NcTH_puBOR3Jk), [designsystemproblems redirect](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGBMVBrqbFAfTB2GMrJTg1fXaFoK2CnLu_zw4MkwvHy8KdsJtr07pLdE9GnrzlH4L7GJh2oqr0b-jMNPOvnap5o0RBdUOqssGOJ9i2X-rqk6uQAkItwYWgUGDDnvULzmhhLnexHg-4al3d4Qj1qhjgbUlJk6fhvZnux9OV4k-2K0mQ-7bOnDg==).
- Bias LLM-as-a-Judge & Evaluasi Terpisah Berbasis *Exemplar* (*arxiv.org*, *aclanthology.org*, *labelstud.io*, *medium.com* — via `search_web` query 2): [arxiv SPB redirect](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHi9pGjr0LPQE3KKxKd7bYJ8_c66Me5snGz_oIdySkkWDpDrtN4he-yJd3vvGZiy6P5Dgpw180g_02ZzG40u1DFJnBJOvSDcWoujUEtsNYvHHjKYa1i), [arxiv variance/anchors redirect](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGdrJ4Z1_4Yhe43MJFjuT3d3WXp2hL7JuvtiCKdusLHhjE3DX7rLBHa8KdkAdIoka2ITy4sOC4xU-AkbwDiVFRHcQyOEpI61b77ECaa9lcWk3Z3w0H2).
- Primitif Animasi Prosedural Bebas-Framework (`f(frame)`, Remotion vs Motion Canvas vs GSAP — via `search_web` query 3): [remotion.dev redirect](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFaWZgsVAzZz0R-PX8wtQwsP1vgNbHj94DG6wZXwbKq0tChLeZiHJa5J6tVizG1xYDUFvyc-fcGDdC-KWsaNvMrwdsEzdJqHRc0u5tqV8eRnpDtZNHFcA2W), [rendercomp.com redirect](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHZ3k6HJwOHSAWKRt9dz5_hQDjKwgQWx6Bf0l6awjoGj_z9JeV28gF2ALi7PxG_9ekre4sUM4b3oqDcCDyOUeRt7etd_zYCwLRZjon5VBx8hB-o0A-qMXZErfZjo5y9RhNSn6SU3saYfhG5evRWDyzpnSpnsRyLXg==), [gsap.com redirect](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGsdP8kkE0BWxYbMbOoZlaf44-_LKf-P1rXNkhETld_tDA6fbWu5pOrvLHSqYgboeawqL7RzIlY-G1TEu1dw0Pzv2QzlvlRCtyUfjeZe9q68_nMVnDxgiwJ7GoZSVFpX6k=).
- Arsitektur `.ffx` Modular After Effects & *Responsive Rigging* (`sourceRectAtTime`, seed acak, tumpuk mikro-preset — via `search_web` query 4): [adobe.com redirect](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHhTgfm2In6Yg2ECUwSVeUMXVE2nlagnB-bEWcYBzSjMrVAMS_gSeDorVAMDhFwaSmfZVbcpoc7jyL1oqdAbDjGLjVJO-ekvuA3NgkFC0bWsmFEpD1hMw8c3-bF3lWXyTKAbgD3o6BGBVIYP-XRFdmeI2JEMxzpqnSJe8iKermYoxOrp8LGlcC0ItFYtP2L2aOjRBoq8UYZihTzPcJDyw9hbdrAU8ZyfKSuJgjRAMaJ3VDxTNPYNBdVVaUUAcK0GblE9c5ZLhNHjxwMq_OeZA==).

### Sumber Repo Terinspeksi Langsung
- [`scripts/remotion/ae-primitives/README.md`](/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/scripts/remotion/ae-primitives/README.md), [`presets.ts`](/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/scripts/remotion/ae-primitives/presets.ts), [`curves.ts`](/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/scripts/remotion/curves.ts), [`timing.ts`](/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/scripts/remotion/timing.ts), [`aeKeyframe.ts`](/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/scripts/remotion/ae-primitives/inti/aeKeyframe.ts), [`gerak.ts`](/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/scripts/remotion/ae-primitives/inti/gerak.ts), [`acak.ts`](/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/scripts/remotion/ae-primitives/inti/acak.ts), [`TeksBlok.tsx`](/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/scripts/remotion/TeksBlok.tsx), [`Kursor.tsx`](/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/scripts/remotion/Kursor.tsx), [`Penghitung.tsx`](/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/scripts/remotion/Penghitung.tsx), [`references/typography.md`](/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/references/typography.md), [`references/motion-mechanics.md`](/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/references/motion-mechanics.md), dan [`references/audio.md`](/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/references/audio.md).
