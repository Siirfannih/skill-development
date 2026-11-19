# Brief bersama putaran brief-r2 (D-476…D-484) — baca sebelum TASK-R7B2-*

Awal sesi sudah dikerjakan Sutradara (pull + doctor; satu-satunya GAGAL "PETA.md basi"). JANGAN `doctor.sh --fix`, jangan sentuh PETA.md, jangan commit. Jangan ubah file di `~/work/skill-development/claude/motion-graphic/` (sesi lain).

## Cara kerja (brief Irfan `handoff/BRIEF-PERBAIKAN-r7-r2.md` §1, wajib)
1. Sebelum mengubah adegan, buka frame footage-nya dan tulis kondisinya 2–3 kalimat di laporan (skala wajah, terang/gelap latar, ruang kosong, benda ramai). Contoh: `qc/r7/brief2/KONDISI-FOOTAGE.md`.
2. Lihat referensinya BERGERAK: potong strip semua frame berurutan dari video referensi dan buka gambarnya (`ffmpeg -ss <t> -t 1.2 -i <ref> -vf "scale=220:-1,tile=9x4" -frames:v 1 strip.jpg`). Referensi: `sumber/ref-r6/ref-zache.mp4`, `ref-samjohn.mp4`, `ref-kt-barsol.mp4`, `ref-grid.mp4`, `ref-chat-kaca.png`.
3. Jawab: kenapa teknik itu bekerja di referensi, dan apakah kondisinya ada di frame ini? Bila tidak, sesuaikan.
4. Angka di kartu/brief lama = catatan pengamatan, bukan target. Ukuran, jarak, posisi diputuskan dengan melihat frame hasilmu. Lantai tetap berlaku (kontras, margin aman, satu fokus).
5. Laporanmu tentang karyamu sendiri bukan QC; penilainya penilai mata terpisah.

## Yang sudah disetujui Irfan (sumber kebenaran visual) — `qc/r7/brief2/`
- `lembar_spine.jpg` + still 0–7: 0 jangkar FINALLY (benar), 1 narasi di wajah (Poppins 700 putih hangat, TANPA wadah, ditumpuk satu titik di dinding kosong), 3 narasi di meja 3D (datar, dinding gelap, tidak menimpa monitor), 4 slab WORKFLOW-NYA utuh di belakang kepala + label rapat, 5 PROFESIONAL & 6 SKILL GRATIS (fokus teks saja: kanvas satu warna, kata raksasa, garis titik, TANPA footage/UI), 7 cincin.
- `GERAK.md` + `lembar_gerak.jpg`: gerak per peran (narasi masuk gelombang huruf ala zache; slab & punchline masuk seperti FINALLY = potong masuk + skala membesar pelan; kata lama tetap di tempat; slab belakang diburamkan sedikit saat narasi depan tampil di atasnya).
- `2_UI_claude_kaca.jpg` + `papan_gerak_UI_claude.jpg` (adegan app Claude, lihat TASK-R7B2-claudekaca).
- Huruf: sama dengan yang sudah dipakai (Anton slab/punchline, Poppins narasi, SF Pro UI). Ukuran situasional (keputusan Irfan §7).

## Kamera & transisi
JANGAN membuat atau mengubah gerak kamera global atau transisi antar-adegan: itu dikerjakan Sutradara di fase finishing (D-470, D-484). Gerak di dalam adegan (elemen UI, teks) tetap tugasmu.

## Menyerahkan hasil
Lapisan ke `lego/cache/r7b2_<tugas>_<id>.mov|mp4` (`--concurrency=3`), daftarkan di `lego/r7_override_<tugas>.json` (format sama dengan override lain; boleh `ganti`/`tambah`/`buang` ID milikmu). Cek rakitan rentangmu: `python3 lego/r7_gabung.py && python3 ~/work/skill-development/claude/motion-graphic/scripts/lego/compose.py lego/lego_r7.json --rentang <a> <b>`. Laporan: kondisi footage, strip referensi yang kamu buka, still sebelum/sesudah berdampingan dengan still spine yang relevan, strip gerak 12–30 frame di tiap momen masuk.
