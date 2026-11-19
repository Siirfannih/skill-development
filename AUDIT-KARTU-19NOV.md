# Audit kartu 19 Nov: kartu sebagai contoh mutu, bukan template angka

## 1. Branch, path, commit
- Worktree: `/home/irfan/work/skill-development-wt-kartu`, branch `perbaikan/kartu-kondisi`, dibuat dari origin/main `05c7acd`. Belum di-push dan belum di-merge.
- Repo utama `/home/irfan/work/skill-development` hanya dibaca, tidak diubah.
- Gambar kerja (strip semua frame, ikhtisar) ada di `/home/irfan/work/kartu-kerja/` dan tidak di-commit.

| Commit | Isi |
|---|---|
| `b441947` | Format kartu kondisi-teknik: `KARTU-TEMPLATE.md`, `pustaka/README.md` (§Alur 6–7 kondisi footage + spine, §Referensi strip semua frame), `pustaka/PETA.md`, `SKILL.md` §0a/§0b, `guide/README.md`, `templates/TAHAP.md`, `scripts/juri/sandingkan.py` |
| `f42873e` | Kartu 83 dan 85 ditulis ulang, kartu baru 87 Zache (frame kunci k1–k9, sheet, baris PETA), gambar contoh gagal 13–17 |
| `7f7c317` | Kartu 63, 65, 26 ditulis ulang setelah dilihat bergerak, ditambah 8 frame kunci urutan gerak |
| `ecaff90` | 78 kartu lain diberi status baru, peringatan format lama, path video sumber, dan status "Dilihat bergerak" (lewat skrip sekali jalan) |
| `c51b25c` | Brief bergambar (orkestrasi §3, handoff-fase, editor), kalibrasi penilai + 3 hal paling amatir + `SELURUH.jpg` (pemeriksa-frame), `frame_audit.py --akhir`, 2 tes baru |
| `b7ff3db` | 5 pelajaran di `guide/teks/GUIDE.md`, contoh gagal 13–17 di README, RETRO 19 Nov, SUMBER, 2 usul LANTAI di `PENDING.md`, PETA dibuat ulang |
| (commit ini) | Laporan ini |

## 2. Inventaris kartu (84 file kartu)
**Ditulis ulang penuh dan dilihat bergerak (6):** 83, 85, 87 (baru), 63, 65, 26.
- Tiap kartu memuat Kondisi footage asli, blok T dengan syarat pakai, angka berlabel pengamatan, "Yang harus terasa sama", dan Catatan pakai yang dipertahankan.
- Salah baca yang dikoreksi dari bedah lama:
  - 83: peredupan ruang ternyata pergantian latar dalam 1 frame lewat matte, bukan lampu syuting.
  - 83: b-roll belah ada di kiri dan wajah di kanan (bedah lama terbalik).
  - 63: judul dipotong, bukan menyusut.
- Kartu 26 ternyata dari kreator yang sama dengan kartu 87 (name tag "Zache" di 0:46).
- Bagian yang ditulis "belum dibedah": 83 T5, 85 T5, 87 T5, 65 T4/T5 (sebagian), 26 T6 (sebagian), dan gerak push 65 T3 antara 9,3 dan 11 dtk.

**Format lama, video sumber ada di mesin ini (53).** Video sudah dipastikan lewat nama file. Status: Dilihat bergerak **belum**.
- 02–05, 07, 08, 14–17, 19–25, 27–31, 49, 51, 52, 54–62, 64, 66–82, 86.
- Catatan:
  - 08 memakai video yang sama dengan 65.
  - 51 = 78 dan 52 = 77.
  - 19–31 dan 66 ada di `canvas-skill-library-20261102/data/...`.

**Format lama, video kemungkinan ada (19).** Dicocokkan lewat dimensi dan durasi dan ditandai "belum dipastikan" di kartu.
- 32–40, 42–48: folder `canvas-skill-library-20261102/data/online-2026110{2,3}/data/instagram/<id>/video.mp4`.
- 09: kemungkinan sama dengan 42.
- 50: mungkin sama dengan 68.
- 53: kemungkinan sama dengan 23.

**Tanpa video, ditandai "gerak belum dilihat" (6):** 01, 06, 10–13 dan 41 (keduanya gambar diam), 18, 84 (`talkinghead.mp4` tidak ditemukan).

## 3. File yang diubah dan hasil tes
- Pustaka:
  - `pustaka/KARTU-TEMPLATE.md`, `pustaka/README.md`, `pustaka/PETA.md`.
  - 84 kartu di `pustaka/kartu/`.
  - `pustaka/contoh-gagal/README.md` + `13…17-*.jpg`.
- Frame kunci dan sheet:
  - `guide/referensi/sheets/keyframes/`: 83-k7…k9, 85-k9…k11, 87-k1…k9, 63-k9…k10, 65-k9…k10, 26-k9…k12.
  - `guide/referensi/sheets/87-zache-kt-25d.jpg`.
- Alur dan peran:
  - `SKILL.md`, `guide/README.md`, `guide/teks/GUIDE.md`.
  - `references/orkestrasi.md`.
  - `templates/TAHAP.md`, `templates/handoff-fase.md`, `templates/roles/editor.md`, `templates/roles/pemeriksa-frame.md`.
- Skrip dan tes:
  - `scripts/juri/frame_audit.py`, `scripts/juri/sandingkan.py`.
  - `scripts/tests/test_frame_audit_hash.py`.
- Catatan repo: `RETRO.md`, `SUMBER.md`, `PENDING.md` (root), `PETA.md` (root).

Perubahan di `frame_audit.py`:
- `SELURUH.jpg`: lembar 1 fps seluruh video, 10 kolom, hanya di fase visual.
- `--akhir`: potongan yang sudah diputus dipindah ke `VERDICT.prev.md`, statusnya menjadi `perlu periksa (akhir)`, dan dihitung "dipakai ulang 0".
- VERDICT baru berisi templat "3 hal paling amatir".
- Teks INDEX ditambah langkah kalibrasi dan SELURUH.

Hasil tes apa adanya:
- `python3 -m unittest discover -s tests` (di `claude/motion-graphic/scripts`): **Ran 94 tests, OK**. Termasuk dua tes baru: `test_akhir_reassesses_every_chunk_even_with_same_hash` dan `test_whole_video_sheet_and_ranked_findings_prompt`. Ada ResourceWarning dari `test_tema_cek.py` (sudah ada sebelumnya).
- `python3 tools/sumber_cek.py`: 0 tanda sumber di 225 file instruksi (bersih).
- `python3 tools/peta.py`: PETA.md ditulis (221 baris). Baris `projects/uji-builder-trap-12nov/` hilang karena folder itu tidak ada di branch ini; folder itu hanya ada di working tree utama yang kotor.
- `tools/doctor.sh` tanpa `--fix`: semua cek OK. Pesan "PERBAIKI" hanya soal pemasangan skill dan tidak dijalankan.

## 4. Tabrakan aturan yang tidak diputuskan
1. **LANTAI masih berangka.** Contohnya: "Setiap butir bisa dicek dari still atau angka", A4 85 %, A7 56 px @1080, A2 tiga tampilan, C16 margin 5 %. Ini bertabrakan dengan kartu yang kini bukan ukuran. LANTAI tidak diubah; usulnya ada di `PENDING.md` (dua baris 19 Nov).
2. **`guide/referensi/ukuran/*-periksa.md` masih memakai "Cek kemiripan" berangka.** Kartu format lama juga masih memuat bagian itu; peringatan di kartu menyuruh membacanya sebagai "Yang harus terasa sama". `sandingkan.py` masih menerima judul lama.
3. **Pelajaran GUIDE teks "teks ikut masuk ke bidang video dalam tampilan"** (butir terakhir §Posisi) diberi pengecualian untuk punchline. Batas antara "punchline" dan "narasi biasa" belum ditentukan Irfan.
4. **Kartu 86 tidak punya baris di `pustaka/PETA.md`** sejak sebelum perubahan ini. Tidak ditambah karena kartunya tidak dibedah ulang.
5. **AGENTS.md meminta merge ke main di sesi yang sama**, sedangkan brief tugas ini melarang push dan merge. Brief yang diikuti.
6. **Catatan pakai kartu 83 yang lama memuat angka waktu yang dipaksakan (2–4 f).** Catatan itu tidak boleh dihapus, jadi dibiarkan. Kartu kini menyebut angka sebagai pengamatan, sedangkan Catatan pakai masih terbaca seperti target.
7. **Handoff proyek lama masih memakai pola lama**: `projects/flat-mirip-mirip/handoff/TASK-*.md` dan `projects/skill-development-journey-20261116/handoff/R7-BERSAMA.md`, `TASK-R5*-visual.md` berbunyi "pekerja tidak membaca kartu" / "Ringkasan kartu". `projects/` tidak boleh disentuh, jadi sesi proyek berikutnya perlu menulis ulang brief-nya.
8. **Templat VERDICT kini memuat bagian "3 hal paling amatir" setelah "(belum diperiksa)".** `render.sh final` hanya membaca 3 baris terakhir untuk `PUTUSAN: LULUS`, jadi penilai harus menulis PUTUSAN paling akhir. Gerbang yang memeriksa keberadaan tiga temuan belum ada, karena brief melarang gerbang berangka untuk gaya. Perlu diputuskan apakah cek format sederhana boleh ditambahkan.
9. **Kalibrasi penilai** ditulis sebagai langkah prosedur, bukan gerbang skrip. Belum ada bukti di file bahwa kalibrasi dilakukan.

## 5. Sisa pekerjaan
- Bedah gerak dan tulis ulang kartu lain yang videonya ada, dimulai dari yang paling sering dipakai: 23, 53, 54, 59, 69, 75, 07/49, 02, 05, 08.
- Pastikan 19 kartu yang videonya baru "kemungkinan" (32–48, 09, 50, 53) dengan melihat isinya.
- Lengkapi bagian "belum dibedah" di kartu yang sudah ditulis ulang (lihat §2).
- Tambah baris PETA untuk kartu 86.
- Ubah `guide/referensi/ukuran/*-periksa.md` ke "Yang harus terasa sama", atau tandai sebagai format lama.
- Keputusan Irfan atas dua usul LANTAI di `PENDING.md`.
- Uji alur baru di satu video sampai kirim: lembar kondisi, spine, brief bergambar, `SELURUH.jpg`, `--akhir`. Uji ini belum dilakukan.
- Push dan merge branch `perbaikan/kartu-kondisi` menunggu persetujuan.
