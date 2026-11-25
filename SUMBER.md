# Asal-usul aturan · file tingkat repo

Bukan instruksi. Jangan dibuka saat mengerjakan tugas: aturan yang berlaku ada di file yang disebut, dan bunyinya sudah lengkap tanpa file ini.

Dibuka hanya saat mengubah skill, menilai cakupan sebuah aturan, atau memeriksa syarat masuk Lantai (muncul di dua video berbeda). Aturan baru atau yang diubah dicatat di sini, di bawah nama filenya: jangkar aturan (nomor butir atau kata pembuka), siapa yang meminta dan kapan, serta kejadian yang melahirkannya.

## `AGENTS.md`

| Aturan | Asal-usul |
|---|---|
| §Awal sesi (wajib, sebelum bekerja) · "Jalankan ./tools/doctor.sh (hanya mengecek). Bila GAGAL,…" | Irfan 8, 16 Nov |
| butir 1 | Irfan 15 Nov · gagal: "tanpa serif" 4 Nov, caption 9 Nov |
| butir 2 | Irfan 4 Nov · Irfan oke 4 Nov, dari ref X · gagal: proyek vN |
| §Menyimpan kemajuan · "Mesin atau akun baru wajib lolos…" | gagal: PC server 8 Nov, akun claude2 tanpa skill video |
| Akhir sesi butir 2 | Bunyi lama: "Setiap aturan baru diakhiri tanda sumber singkat: (Irfan 4 Nov), (Irfan oke 4 Nov, dari ref X), atau (gagal: proyek vN)". Diganti atas keputusan Irfan 18 Nov: file yang dibaca pertama oleh model berisi instruksi kerja, bukan riwayat; 325 tanda sumber dipindah ke SUMBER.md |
| Menyimpan kemajuan · "commit dan push" | Bunyi lama memuat izin satu sesi: "Irfan mengizinkan kemajuan dalam tugas ini diperbarui ke GitHub" (sesi scriptwriter, 27 Okt) |
- Invarian/§Cara membaca · urutan otoritas kanonik brief → proyek → merek → Lantai/Kelas H → kartu → guide (Lantai di atas kartu); muat cookbook per kartu lewat pilih_kartu.py; rute tugas video lewat MOTION-CORE; PENDING > 7 hari ke PENDING-ARSIP.md: Irfan 25 Nov 2026 (audit skill-development, D-audit). Gagal: 5 file bertentangan soal otoritas; rute video memuat ±19.300 tok sebelum kerja pertama

## `INDEX.md`

| Aturan | Asal-usul |
|---|---|
| baris "Siirfannih/canvas-skill-library" | Irfan 6 Nov: library belum stabil |

## `README.md`

| Aturan | Asal-usul |
|---|---|
| §Skill Development · "Pasang di setiap mesin kerja: Mac…" | gagal: PC server 7–8 Nov akun claude2 tanpa skill video; Codex Mac 16 Nov memakai salinan beku 27 Okt · Irfan 8, 16 Nov |

## `tools/codex-pc.sh`

| Aturan | Asal-usul |
|---|---|
| "Keputusanku: di PC,…" | Irfan, 16 Nov |

## `tools/peta.py`

| Aturan | Asal-usul |
|---|---|
| """"Tulis PETA.md: peta repo supaya model…" | Irfan 16 Nov |
- argparse `--check`/`--help`; rujukan §Alur setiap video: Irfan 25 Nov 2026 (audit skill-development, D-audit). Gagal: `--help` langsung menulis ulang PETA.md

## `tools/sync.sh`

| Aturan | Asal-usul |
|---|---|
| "merujuk repo ini untuk tugas video/konten/skill…" | Irfan 8 Nov |
| komentar pembuka | Salinan lama membeku: Mac masih 27 Okt, PC server tidak punya sama sekali; gagal: V5 8 Nov |

## `content-ops/README.md`

| Aturan | Asal-usul |
|---|---|
| pembuka | Dibuat 27 Okt 2026 dari arahan Irfan |

## `scriptwriter/README.md`

| Aturan | Asal-usul |
|---|---|
| §1 Mandat Irfan | Mandat diberikan 27 Oktober 2026 |

## `AGENTS.md` · Cara membaca butir 2 dan 6, Akhir sesi butir 1

| Aturan | Asal-usul |
|---|---|
| empat lapis (brief → proyek ini → kartu → pelajaran global); koreksi bawaan di proyek | Irfan 18 Nov: "aturan global adalah pembelajaran… bukan aturan kaku… Aturan perproject adalah aturan situasional" |
| Awal sesi butir 2 · cek profil merek; Cara membaca butir 2 · lapis profil merek | Irfan 18 Nov: brand guideline + editing guideline di awal, preview di percakapan sebelum produksi, masukan hanya setelah render 1, dua render; repo = perpustakaan cara kerja, data user disimpan di folder yang user pilih |
| Cara membaca butir 1 dan 4 · bacaan awal kecil, bacaan per langkah TAHAP.md | Irfan 18 Nov: evaluasi token sesi skill-dev-journey (Editor dipakai ulang lintas ronde sampai 968 ribu token, Sutradara 678 ribu, 82 gambar menumpuk, bacaan awal 168 ribu di giliran 17) dan model sering melewatkan tahap |

## `claude/motion-graphic/cookbook/` (README §1–3, KARTU-TEMPLATE, NASKAH-TEMPLATE, INDEX/POLA/SFX) · `motion-graphic/SKILL.md` §Mulai di sini · rute video di `AGENTS.md` dan `tools/peta.py`

| Aturan | Asal-usul |
|---|---|
| cookbook = lapisan penaik mutu; konsep user dulu; mekanik dipindah, gaya tidak; draf user = mode audit | Irfan 21 Nov: prinsip open-source "Quality Adjustment Layer (Bukan Pembajak Konsep)" |
| alur dua langkah (racik pola lewat narrative trigger + persetujuan, lalu Remotion dari nol); INDEX bertingkat; format Pattern Card + Remix; kategori 01–06 | Irfan 21 Nov: restrukturisasi repo jadi Reference Cookbook & Motion Design Brainstorming Library |
| 1 kartu pengikat + 1–3 kartu mekanik; 1 kartu per video dengan pola di dalam; pola naskah di `06-script-and-story` | jawaban Irfan 21 Nov atas tiga pertanyaan awal sesi restrukturisasi |
| rute video mulai dari gerbang `irfan-creative-workflow` (bedah bahan user → naskah → storyboard → persetujuan) sebelum skill teknis | Irfan 21 Nov: sesi Newediting yang memuat skill gerbang lebih dulu membuat kesalahan minim dibanding sesi yang langsung memuat skill teknis |

## `SARINGAN.md` · `AGENTS.md` (Cara membaca butir 6; Akhir sesi butir 1 dan 6)
- Irfan 22 Nov 2026, penutupan kegagalan_eps01: catatan khas proyek di skill membuat overfitting dan beban konteks, aturan terlalu umum tidak bisa dijalankan; tiap kesalahan disaring menjadi hukum mekanis + pemicu sebelum masuk repo; diminta deep research ke sumber tepercaya. Dasar riset: `reports/Pelajaran agen tanpa overfitting.md` (Anthropic context engineering, skill authoring, Claude Code memory, evals; ACE, ExpeL, Dynamic Cheatsheet, AWM, Context Rot; Husain/Shankar, Google SRE).

## `claude/motion-graphic/MOTION-CORE.md` · blok Invarian Anti-Sok-Tahu (`AGENTS.md`, `MOTION-CORE.md`)

| Aturan | Asal-usul |
|---|---|
| Pintu produksi tipis (MOTION-CORE lalu folder proyek); PETA, RETRO, SUMBER, dan INDEX utuh tidak dimuat di awal sesi | Misi sprint malam Irfan 23 Nov 2026 (branch `feat/core-gates-format-locks`), untuk diaudit Auditor Eksternal 24 Nov 2026 |
| §4 Larangan keras · "Dilarang melewati render.sh final" | gagal: behindwork-batch-1 ep01–05, 23 Nov 2026: gerbang `render.sh final` lengkap tidak dijalankan karena tenggat (`projects/behindwork-batch-1/STATUS.md`) |
| `formats/` (Format Bible `story-doc-16x9`, `journey-talkinghead`) dan file `projects/<proyek>/FORMAT` dihapus; tidak ada template gaya tetap | Koreksi bedah branch, Irfan 23 Nov 2026: `formats/` bertentangan dengan `cookbook/README.md` §1 (konsep user + mekanik cookbook = output baru) dan `SARINGAN.md` (anti-overfitting; selera tinggal di `projects/<proyek>/`, hanya Kelas H dan P yang naik ke skill). Isi kedua format adalah kodifikasi satu proyek masing-masing (`projects/behindwork-batch-1/` D-24..D-32; `projects/kegagalan-eps01/DECISIONS.md` K-01..K-21) dan tetap tinggal di proyeknya |
| Lima Invarian Anti-Sok-Tahu di byte 0 `AGENTS.md` dan `MOTION-CORE.md` | Koreksi bedah branch, Irfan 23 Nov 2026 (bunyi kelima butir dari Irfan) |
| §1 alur: gerbang 1–3 → Langkah 1 cookbook lewat `pilih_kartu.py` (2–4 kartu + tabel racikan & remix per beat) → Langkah 2 Remotion dari nol + `render.sh final` / `gerbang_produksi.sh`; rute `SKILL.md` dan `cookbook/README.md` §2 butir 3 mengikuti | Koreksi bedah branch, Irfan 23 Nov 2026: pintu produksi tetap ramping tetapi alur mekanikal dua langkah dipertahankan |
| `scripts/cookbook/pilih_kartu.py` (`--cari`, `--kategori`, `--bergerak`, `--limit`; keluaran ID, nama, status, path, keyframes) | Koreksi bedah branch, Irfan 23 Nov 2026: `cookbook/INDEX.md` tidak perlu dibaca utuh di awal sesi; cukup dipanggil per fungsi cerita tiap beat |

## `claude/motion-graphic/scripts/gate/cek_komposisi.py`, `scripts/juri/gerbang_produksi.sh`, `scripts/juri/render.sh`

| Aturan | Asal-usul |
|---|---|
| Gerbang komposisi umum (WAJAH, INSET, TEPI, ASET memblokir) | Promosi dari `projects/behindwork-batch-1/remotion/bangun/cek_komposisi.py` (D-24..D-28, D-31, D-32), misi sprint Irfan 23 Nov 2026 |
| Tanda JEDA, KARTU, PITA, LOGO | 4 cacat teramati di `Behindwork_EP01_JensenHuang_EN_r3.mp4` (pita subtitle di semua frame; jeda gelap di 0:06, 0:18, 0:46; teks di atas logo papan nama 0:44; kartu putih polos berderet), audit visual 23 Nov 2026. Dijalankan pada data r2 `ep01.json`: JEDA menandai 6,74 dtk (0,38), 18,41 dtk (0,71), 52,58 dtk (0,34) |
| Gerbang produksi di `render.sh final` (komposisi, potong SFX, speaker HP), bersyarat pada adanya file | Misi sprint Irfan 23 Nov 2026: proyek lama tidak pecah, tetapi file yang ada dan gagal menolak render |
| Gerbang dilepas dari `projects/<proyek>/FORMAT` dan slug format; WAJAH, INSET, TEPI, ASET tetap bawaan; mode ketat jadi pilihan proyek (flag `--ketat`, file `qc/ketat` kosong = semua tanda, berisi nama tanda = tanda itu saja); `--blok` menolak nama tanda tak dikenal | Koreksi bedah branch, Irfan 23 Nov 2026: gerbang Kelas H netral gaya aktif bawaan, `--ketat` opt-in dan tidak terikat template gaya. Daftar tanda di `qc/ketat` adalah tambahan pelaksana (Claude) supaya proyek bisa memilih sebagian tanda, mis. tanpa PITA untuk video bersubtitle terjemahan |

## `claude/motion-graphic/scripts/audio/audio_phone.py`, `sfx_comfort.py`, `sfx_potong.py`

| Aturan | Asal-usul |
|---|---|
| `--gate` (harsh > 0 atau median VO clarity < 8 dB = keluar 1), `--min-comfort`, `--laporan` | Misi sprint Irfan 23 Nov 2026; ambang 8 dB dari laporan "windows < 8 dB" yang sudah ada di skrip; gerbang potong dari kegagalan-eps01 K-19 |

## `claude/motion-graphic/references/build.md`, `claude/motion-graphic/references/orkestrasi.md`, `claude/irfan-creative-workflow/SKILL.md`, `tools/peta.py`

| Aturan | Asal-usul |
|---|---|
| build.md "Jalur utama: Remotion, dan rakit lego"; sisa rujukan AE sebagai pilihan setara dihapus | Temuan audit W4/W6 ("Default: After Effects"). Di basis `424f2313` kalimat itu sudah tidak ada; yang dibersihkan dua sisa ("plate yang sulit dibuat di AE", "atau AE bila diminta") |
| orkestrasi.md tanpa "tidak membuka gambarnya"; rujukan `storyboard.md §16.3` | Temuan audit W6. Di basis `424f2313` keduanya sudah benar (orkestrasi §0 "bukan dengan tidak melihat"; workflow merujuk `storyboard.md` §5); ditambah tes regresi `scripts/tests/test_audit_dokumen.py` |
| `tools/peta.py` `jaga_rute()`: baris Fase 3 wajib memuat guide teks, visual, gerak | Temuan audit W6: baris Fase 3 PETA kehilangan `guide/visual/GUIDE.md` saat regenerasi |

## `tools/sync_lantai.py`

- dari salin penuh Lantai ke SKILL.md menjadi cek bahwa tiap ID LANTAI muncul di tabel ringkas: Irfan 25 Nov 2026 (audit skill-development, D-audit). Gagal: salinan Lantai = 64,7 % badan SKILL.md (±5.100 tok)

## `ENGINEERING-STACK.md`

- tumpukan skill engineering terkurasi + tools/engineering-stack.sh: Irfan 25 Nov 2026 (minta pasang superpowers, claude-plugins-official, agentskills, skill-validator, trailofbits, wshobson, vercel-labs, mattpocock, remotion-dev, tstack). pr-review-toolkit tidak dipasang: 2.035 tok/sesi, tumpang-tindih

## `AGENTS.md` invarian 4 · LANTAI.md pembuka · MOTION-CORE.md invarian 4

- Aturan = praktik terbaik, penyesuaian kondisi video/suara/frame menang, gerbang boleh tidak dijalankan dengan satu baris alasan: Irfan 25 Nov 2026 (memilih "penuh fleksibel" setelah K-05/K-07 test Soalnya Gini menunjukkan aturan mutlak membuat jalan buntu). Bunyi lama invarian 4: "Gerbang mekanis Kelas H tidak dilewati atau diedit selama sesi produksi video".

## `AGENTS.md` §Cara membaca butir 2(a) · `claude/motion-graphic/LANTAI.md` E24 tick

- Permintaan eksplisit user selalu menang atas aturan repo, jangan menolak dengan alasan aturan; tick per-word = default yang bisa diganti user/konteks: Irfan 25 Nov 2026 ("user always win", khawatir model menolak permintaan user karena aturan repo).

## `claude/motion-theme-director/`

- Skill tema hasil reverse-engineering 80+ kartu (F1–F5 sesi Gemini, F6–F7 Claude; jejak di `research_notes/reverse-engineering-kartu-20261125/`). Dipindah dari `experimental/` ke `claude/` atas keputusan Irfan 25 Nov 2026 ("itu skill pentingnya"), mendahului hasil uji A/B buta.

## `claude/motion-theme-director/BEDAH-REFERENSI.md` · SKILL.md §1 butir 0 · `irfan-creative-workflow` tahap Brief

- SOP Bedah Referensi 5 Lapis (Phase 0) dari Irfan 26 Nov 2026, setelah storyboard Behindwork v4 menyalin kulit referensi (bola biru, blob gradien, garis acak) karena bedah hanya mencatat "apa terlihat". Contoh nama file referensi diganti deskripsi umum.
- 4 uji biner penutup (hapus objek, clip-art, fokus tunggal, kontinuitas): Irfan 26 Nov 2026.

## `claude/motion-graphic/MOTION-CORE.md` §1 · `SKILL.md` alur butir 1

- Rujukan wajib ke `motion-theme-director` (Phase 0 bila ada referensi, tema, 4 uji biner) dari pintu `motion-graphic`: Irfan 26 Nov 2026 (opsi A), setelah sesi uji v5 memanggil motion-graphic saja sehingga Phase 0 tidak terpicu.
