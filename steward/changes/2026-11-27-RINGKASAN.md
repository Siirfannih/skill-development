# Ringkasan 27 Nov 2026: pembersihan dan perbaikan skill-development

Mulai `0c4e4aa9` (tag `pra-bersih`), akhir di `main` sesudah commit ringkasan ini. 106 commit. Laporan per langkah ada di `steward/changes/2026-11-27-*.md`.

## Yang berubah, per tahap
- **Fase 0–1, bersih file** (`823874d2`..`d8b4154a`, `671225e9`): skill-steward dipasang; 620 file cache/hasil generate dihapus; laporan lama, `research_notes/`, GrokAgent ke `archive/riwayat/`; `PETA.md` tanpa `node_modules`.
- **Terjemahan batch 01** (`bce09b1e`, `409bf1b3`): 16 file instruksi + brief-gate + video-reference-deconstructor ke Inggris; `konsul.md` ikut diterjemahkan lalu diarsipkan bersama jalur Codex.
- **Fase 2, aturan dirampingkan** (`07c1474f`..`b8b8be54`): AGENTS.md jadi pintu ±3 KB; awal sesi tidak bisa lagi menghentikan kerja; `LANTAI.md` dan `MOTION-CORE.md` pensiun, gerbang R1–R5 pindah ke `references/build.md` §4; satu model sebagai bawaan, alat lain opsional dengan cadangan; kuota jadi bawaan dari REF-SPEC; lingkaran kerja dikurangi; SARINGAN/EVALS-DESIGN/PENDING diserap skill-steward.
- **Fase 3, pensiun** (`5167b473`..`74a0b810`): jalur Codex diarsipkan; audio berlisensi (19 berkas, 40 MB) dan media proyek selesai (688 berkas, 284 MB) keluar dari git, cadangan di Drive `Claude edit/skill-development/backup-20261127/`; `templates/gaya` dan `INDEX.md` akar diarsipkan; motion-theme-director digabung ke `claude/motion-graphic/references/tema/`; submodule hyperframes dan gsap-skills dicabut.
- **Rombak kartu + penjaga render** (`ec1ffaf3`..`7fceb9ea`): pemilih kartu per fungsi cerita dan kata niat, alasan vault di keluarannya, `cookbook.py baca` menyembunyikan kulit sumber, user tanpa gaya mendapat pengikat dari REF-SPEC, nama pemilik keluar dari jalur umum, delapan eval; `render.sh`/`tunggu.sh` berbatas waktu dan berkunci (C12).
- **vibedesign dilatih** (`ae527f66`..`4ac2cd35`): `baca` juga menyembunyikan "Kata kunci gaya" dan hex footage; eval vd-006…011; KMP-04 (ruang kosong punya tugas), catatan sketsa, uji tukar; profil merek satu rumah dengan motion-graphic; `data-dekor` dikecualikan di `tabrakan_cek.py`.
- **Penerimaan akhir** (`2692ff78`..commit ini): pengecualian `data-dekor`/`data-sengaja` kini dicetak (tidak diam); 10 celah penjaga render dicatat; empat rujukan mati di jalur produksi diperbaiki; pemilih kartu dan README §4 disamakan (vault dibuka sesudah racikan disetujui); Devil's Advocate punya cadangan satu model; backlog 49–55 dari tinjauan Qwen.

## Angka sebelum dan sesudah (diukur hari ini)
| Ukuran | Sebelum | Target | Sekarang |
|---|---|---|---|
| Bacaan awal sesi video | ±24k token (byte/3,5) | ±8k | 8,3k (byte/3,5) · 7,3k (karakter/4); + ±1k deskripsi skill |
| Bacaan satu video penuh, semua penunjuk diikuti | ±93k (file utuh, byte/3,5) | ±44k | 60k bagian yang ditunjuk TAHAP (52k karakter/4); 79k bila tiap file dibaca utuh. **Target belum tercapai** |
| Carousel vibedesign, semua penunjuk | belum diukur | – | 20k (byte/3,5) · 17,6k (karakter/4) |
| File terlacak git | 5.905 file, 464 MB | – | 4.622 file, 114 MB (pohon aktif 2.225 → 2.056 file) |
| Tes unit | 344 (64 dilewati) | lulus | 494 lulus (71 dilewati tanpa Playwright; 9 dilewati dengan venv + Chrome) |
| steward_check | 2 galat, 81 peringatan | 0 galat | 0 galat, 49 peringatan |
| `peta.py --check`, `cookbook.py cek --ketat`, `sumber_cek`, `sync_lantai`, `sync_negatif` | lulus | lulus | lulus |
| Jumlah aturan | 312 | – | tidak diaudit ulang |

46 butir wajib-selamat diuji ulang: 46 lulus. 46 kelompok literal: tetap, atau kode dan literalnya berubah bersama (LANTAI/MOTION-CORE ke arsip, invarian 2 ke skill-steward, `music_fit.py` tanpa earshot).

## Cara membatalkan
- Satu langkah: `git revert <hash>` (merge terjemahan: `git revert -m 1 bce09b1e`).
- Seluruh hari: `git revert --no-commit pra-bersih..HEAD`, atau buka tag `pra-bersih`. Media dan audio: dari tag atau dari cadangan Drive.

## Yang BELUM selesai atau BELUM terbukti
- **Proses render yatim tidak tertangani.** Uji render nyata: jalur biasa, batas waktu, Ctrl-C/TERM, `tunggu hentikan` benar. Tetapi bila node mati keras (SIGKILL/OOM), pohon Chrome yatim ke PID 1 dan tidak ada yang memanennya, kelas insiden 606 proses. Sepuluh celah di `steward/backlog.md` baris 39–48 (bukti `2026-11-27-render-tanpa-yatim/bukti-render-guard.md`). Percobaan perbaikan tidak selesai.
- Tidak ada satu video produksi pun yang dirender ujung ke ujung dengan aturan baru; mode `final`, `frames`, `lego` belum diuji dengan Chrome nyata.
- `sync.sh` dan `doctor.sh` tidak pernah dijalankan hari ini.
- Aturan vibedesign baru (KMP-04, uji tukar, draf profil merek) belum diuji pada model.
- Audio berlisensi masih ada di riwayat git (dan di tag `pra-bersih`).
- Pemilih kartu condong ke kartu talking head (brief tanpa wajah tetap mendapat M03/M08; baris 33, 50).
- Belum ada kartu CTA (baris 23).
- Bacaan satu video ±52–60k, bukan ±44k.
- `data-dekor` tetap bisa dipasang pada teks pesan; alat kini mencetaknya, tetapi tidak menolaknya.
- Laporan kartu C1–C11 masih bertulisan "perlu ya pemilik"; semuanya sudah di `main` di bawah delegasimu.

## Keputusan yang menunggu (dengan rekomendasi)
1. **Perbaikan Chrome yatim** (baris 40, lalu 39, 41–43; skrip gerbang = Risky). Rekomendasi: ya. Sapu Chrome berinduk 1 yang path-nya milik proyek itu sesudah render gagal, ditambah `setpriv --pdeathsig`; diuji dengan render nyata yang di-SIGKILL.
2. **Hapus audio berlisensi dari riwayat git** (filter-repo + force push, semua clone harus diambil ulang). Rekomendasi: ya, sebelum repo dibuka untuk orang lain atau dijual; sampai itu, biarkan.
3. **Kartu `dilihat_bergerak: tidak`** tidak bisa dipakai user lain karena video sumber tidak ikut repo (baris 49). Rekomendasi: boleh dipakai sebagai mekanik dengan catatan "sumber belum dilihat bergerak" di RESEP, tanpa menyalin angka waktu.
4. **Nama "Irfan" di urutan otoritas dan gerbang** (baris 24, Risky). Rekomendasi: ganti jadi "pemilik/user" di satu perubahan terpisah, karena repo akan dipakai orang lain.
5. **Zona aman statis untuk `tabrakan_cek.py` di vibedesign** (V6 tidak diterapkan). Rekomendasi: biarkan tidak diterapkan sampai ada zona aman slide yang kamu setujui.
6. **Aturan "kata ganda teks kinetik vs UI = GAGAL tanpa alasan"** (baris 51). Rekomendasi: persempit ke kata yang berebut fokus di beat yang sama.
7. **Jalankan `./tools/doctor.sh` sekali** di PC (hanya memeriksa). Rekomendasi: ya, sebelum sesi produksi berikutnya.
8. **Pecah `cinedance-block-library/SKILL.md`** (476 baris, ±11k token; baris 10). Rekomendasi: ya, satu perubahan Behavior tersendiri.
