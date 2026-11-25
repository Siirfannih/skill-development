> **Invarian kerja** (berlaku di atas isi lain di file ini; ringkasannya menjaga penalaran mekanikal dan gerbang mutu):
> 1. **Cookbook = perpustakaan mekanik, bukan template.** Konsep user + 2–4 kartu mekanik cookbook = output baru. Jangan membuat template gaya tetap atau menyalin gaya antar proyek.
> 2. **Promosi aturan hanya lewat `SARINGAN.md`** (S = proyek, P = pertimbangan, H = hukum netral-gaya terukur). Selera satu proyek tidak naik ke aturan global.
> 3. **Gerbang pemilik tidak dilewati.** Konsep/topik, naskah final, serta storyboard + tabel racikan cookbook disetujui pemilik sebelum produksi atau pemakaian kredit.
> 4. **Gerbang mekanis Kelas H tidak dilewati atau diedit selama sesi produksi video:** `render.sh final`, `gerbang_produksi.sh`, `scripts/gate/*`.
> 5. **Baca dulu, jangan menebak.** Bahan sumber dan outbox/proyek terkait dibaca sebelum menyimpulkan atau memberi perintah.
# MOTION-CORE: pintu masuk sesi produksi video

Sesi produksi memuat **file ini** + `cookbook/00-core-invariants.md`, lalu `projects/<proyek>/` (`DECISIONS.md`, `RESEP.md`, `TAHAP.md`). Jalankan `python3 scripts/juri/tahap.py projects/<proyek>`. Kartu dimuat per kartu lewat `pilih_kartu.py` (Langkah 1); `cookbook/INDEX.md` hanya memberi filter `--pack`. Tidak dimuat di awal sesi: pack utuh, `PETA.md`, `RETRO.md`, `SUMBER.md`, `cookbook/INDEX.md` penuh, `cookbook/CATALOG.md`, dan `_vault/`. `references/` dan `guide/` dibuka saat gerbang menyebutnya. Rute & Lantai utuh: `SKILL.md`.

Urutan otoritas: kalimat kanonik `AGENTS.md` §Cara membaca repo ini butir 2 (Lantai di atas kartu; pengecualian Lantai hanya atas instruksi user, dicatat di `RESEP.md`).

## 1. Tahap kanonik: Brief → Naskah → Storyboard/block out → Animate → Effects & grade → Mix → Deliver

File lain menyebut tahap dengan nama ini, bukan nomor. Butir dan buktinya: `templates/TAHAP.md` (ditegakkan `tahap.py`, `render.sh`).

| Tahap | Pintu | Gerbang/alat | Bukti |
|---|---|---|---|
| Brief | `../irfan-creative-workflow/SKILL.md` §2; profil merek; bahan user | `profil_cek.py`, `resep_check.py`; tanya pengunci | LULUS |
| Naskah | `references/copywriting.md` | uji storyteller; **pemilik setuju** | ID `DECISIONS.md` |
| Storyboard/block out (+ racikan) | `references/storyboard.md` §5, §7; Langkah 1 | `board.py`, `lock suara`, preview; **pemilik setuju** | ID `DECISIONS.md` |
| Animate | bangun dari nol (bawah) | `tema_cek.py`, `motion_lint.py` | REPORT |
| Effects & grade | Lantai C18a–C18b, `references/grade.md` | `grade_ukur.py`, `frame_audit.py`, `lock visual` | VERDICT |
| Mix | `references/audio.md` §14.3–14.10 | `lock sfx`, `lock musik`, `audio_phone.py --gate` | `mix.wav` |
| Deliver | §3, `references/delivery-gate.md` | R1–R5; unggah Drive + caption | MP4, link |

Belum ada kode, generate, atau pemakaian kredit sebelum persetujuan storyboard.

**Tanya sebelum meracik (wajib bila brief belum mengunci arah visual):** bila brief user belum menetapkan (a) porsi mode visual (arsip/B-roll vs diagram/explainer 2D vs metafora cutout vs UI nyata), (b) target platform dan ritme potong (IG/short-form vs YouTube), atau (c) referensi gaya target, **berhenti dan ajukan 3–5 pertanyaan konkret dulu** sebelum menulis racikan atau kode.

**Keragaman mode visual & retensi short-form / IG (tanpa merombak naskah atau membuat ulang VO):**
- **Padatkan jeda suara, bukan kecepatan bicara:** `TEMPO = 1.0` wajib (Lantai E23). Pakai `scripts/gate/cut_check.py` (`--suggest --max-inner 0.12 --max-sentence 0.22`) lalu `scripts/audio/recut.py` untuk memangkas jeda mati, dan petakan ulang titik waktu ke `vo_words.json`/`vo_beats.json` tanpa memotong kata.
- **Perubahan visual ≤ 2,2 dtk & variasi mode:** video > 30 dtk tidak boleh berisi `[zoom B-roll + KT]` bergantian dengan `[kartu teks polos]`. Pecah kalimat panjang menjadi micro-beat (geser titik fokus kamera 2D, insert arsip/UI, `HighlighterSweep`, `SelectiveColorSpotlight`), frame 0 langsung bergerak dan berteks, dan KT 1–3 kata berganti setiap 0,25–0,6 dtk.
- **Kunci gaya aset & larangan 3D AI:** ikuti `BRAND.md`/`EDITING.md`; untuk proyek bergaya 2D flat, editorial Vox, atau photo-cutout, bangun komponen vektor 2D SVG/HTML atau cutout foto nyata, bukan render gambar 3D AI tanpa persetujuan eksplisit user di `RESEP.md`.

**Langkah 1 · Racik mekanik** (di tahap Storyboard/block out; rinci: `cookbook/README.md` §2):

1. Tulis fungsi cerita tiap beat.
2. Cari kartu per beat, dari `claude/motion-graphic/scripts/`:
   `python3 cookbook/pilih_kartu.py --cari "<kata kunci fungsi cerita>" [--pack 01..06] [--kategori camera|typography|layout|texture|sfx|script|qc] [--bergerak] [--limit 4]`
   Keluaran: `ID | Nama | Bergerak/Diukur | Path kartu | Keyframes`. Kartu `bergerak:tidak` dibaca dari still: hipotesis. Detail `_vault/` dibuka setelah tabel racikan disetujui.
3. Buka **hanya 2–4 kartu** untuk seluruh video, beserta frame kuncinya. Yang diambil mekaniknya (gerak, ritme, hierarki teks, bunyi); warna, huruf, aset, dan tema tetap milik user.
4. Tulis tabel racikan dan remix per beat, minta persetujuan user, lalu salin ke `RESEP.md` proyek dan storyboard:

   | Beat | Fungsi cerita | Pola (ID.Tn) | Remix: dipertahankan → diganti | SFX |
   |---|---|---|---|---|

**Langkah 2 · Bangun Remotion dari nol.** Kode ditulis baru dari tabel racikan dan `TRANSITION-SHEET` dengan gaya `BRAND.md`: wajib impor `scripts/remotion/ae-primitives/` (`SpatialAnchorCamera`, `SpatialDepthStage`, `MotionBlurWrapper`, `WhipPanTransition`, `GridFlashReveal` (pembungkus kompatibilitas: `scripts/remotion/FlashGrid.tsx`), `SceneChain`, `FlashCut`, `InvertFlash`, `HighlighterSweep`, `SelectiveColorSpotlight`, `Scrim`), `scripts/remotion/curves.ts`, dan pola kamera dunia 2D di `projects/skill-development-journey-20261116/remotion/src/papan/Papan.tsx`. Dilarang menambal scaffold episode proyek lain. Selesai hanya bila `render.sh final` lulus, termasuk `gerbang_produksi.sh` (§3).

## 2. Lantai: 10 aturan yang tidak ditawar

Kode dalam kurung = butir `LANTAI.md` (bunyi lengkap).

| # | Invarian | Cara cek |
|---|---|---|
| 1 | **Satu lapisan teks.** Ucapan tampil sebagai tipografi kinetik; tidak ada pita subtitle terpisah saat KT tampil (A1). | tanda `PITA` nol |
| 2 | **Teks tidak menutup wajah, tidak keluar zona aman, dan dekat subjeknya** (≤ ±8 % tinggi frame) (A2, C16). | tanda `WAJAH`, `TEPI`, `JAUH` nol |
| 3 | **Terbaca di HP.** Kontras ≥ 4,5 : 1, kata sambung ≥ 56 px @1080, 1–3 kata per tampil, maks 2 baris, tidak di atas logo atau area ramai (A4, A7, A9). | still 360 px; `scripts/lego/kt_check.py` |
| 4 | **Teks hanya dari ucapan; satu kata tidak tampil dua kali** sekaligus (A3, A5). | KT dibandingkan tabel kata VO |
| 5 | **Satu fokus per momen**; yang sedang bicara tampil di frame (C14, D21). | still per beat |
| 6 | **Tidak ada pergantian malas.** Nol crossfade; ≥ 4 tipe transisi per 30 dtk tanpa tipe sama berturut-turut (`SceneChain`); gerak memakai `scripts/remotion/curves.ts`; hold > 1 dtk tetap hidup (B13, B13a). | `scripts/juri/motion_lint.py` PASS |
| 7 | **Tidak ada layar kosong atau placeholder.** Frame 0 berisi visual dan bunyi; setelah potong, isi tampil ≤ 0,3 dtk (D22, D22c). | tanda `JEDA` nol; frame tahan tiap detik |
| 8 | **Suara utuh.** Tidak dipercepat, fonem tidak digunting, level suara asli tidak diturunkan (E23). | `gate/cut_check.py`, `gate/voice_level.py` PASS |
| 9 | **Bunyi punya alasan, alami, dan nyaman.** 1 SFX = 1 gerakan/objek (`objects.json`, prioritas `~/sfx/SFXIrfan`); SFX dimulai di level alami (`0 dB` dasar) dan baru diturunkan bila mengalahkan VO, bukan tenggelam di bawah musik keras; ujung SFX di jeda sunyi atau fade 150–300 ms; nol SFX harsh; musik sejak frame 0 sebagai bed di bawah VO (E24, E25, E25a). | `gate/sfx_density.py` PASS; R3–R4 di §3 |
| 10 | **Visual lulus dulu, audio sesudahnya, render penuh paling akhir.** Revisi hanya mengubah atribut yang diminta (F26, F27). | `scripts/juri/revisi_cek.py cek` |

Yang tidak dijawab brief, proyek, profil merek, maupun kartu: tanya user, spesifik (F28).

## 3. Gerbang render R1–R5 (wajib sebelum render final)

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

Gerbang yang gagal diperbaiki pada penyebabnya, lalu dijalankan ulang; keluaran terakhirnya disalin ke `TAHAP.md` sebagai bukti.

## 4. Batas kerja (alasan dan penjagaannya)

- **Jangan melewati `render.sh final`** (atau `lego`), termasuk karena tenggat: tidak ada `npx remotion render` langsung, tidak ada video dikirim tanpa `render.sh final` PASS. Tenggat tidak terkejar = kirim laporan gerbang yang belum lulus.
- **Jangan mengedit `scripts/gate/*` atau `scripts/juri/*` di sesi produksi video**, termasuk menyalinnya ke proyek lalu mengubahnya. Gerbang yang dianggap salah dilaporkan ke user, diperbaiki di sesi perubahan skill.
- Jangan mematikan gerbang dengan menghapus atau mengganti nama file pemicunya (`qc/ketat`, `aset.json`, `sfx_potong.json`, stem).
- **Satu video = satu sesi terpisah.** Satu sesi produksi hanya mengerjakan satu episode dan tidak menyalin `RESEP.md`, racikan, atau kode adegan dari episode lain (termasuk dalam batch yang sama); yang dipakai ulang hanya blok netral `scripts/remotion/`.
- Dilarang menambah elemen di luar tabel racikan, storyboard, dan brief.