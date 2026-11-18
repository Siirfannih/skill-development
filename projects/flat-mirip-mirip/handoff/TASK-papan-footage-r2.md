TUJUAN
Perbaiki dua temuan pada PapanFootage (P11, P12); P14 sudah LULUS dan tidak disentuh.

KONTEKS
Ronde 1: REPORT-papan-footage-r1.md + still D-p11-f040.png, D-p12-f140.png, D-p14-f190.png. Dinilai Sutradara.
TEMUAN
- D2-1 (P12, f48–155) TEKS MENUTUP WAJAH: "bukan videonya." (dan kelompok kata lain di P12) jatuh di atas mulut/wajah pria di F2-b. Perbaikan: reframe footage supaya wajah berada di sepertiga kanan (pusat wajah x ±66–70 % lebar frame, skala footage ≥ 1,12 agar tidak ada tepi kosong, push pelan tetap), lalu semua teks P12 (KataKecil, "orangnya,", "bukan videonya.") berada di ruang kosong kiri: pusat blok x ±28–32 %, y garis tengah 0,5, tidak ada piksel teks di dalam kotak wajah+kepala (laporkan bbox wajah dan bbox teks, keduanya tidak boleh beririsan, jarak ≥ 40 px). Tiga KartuSlop yang memudar dipindah ke kiri bawah di bawah blok teks (bukan di wajah), ukuran tetap ±12 % lebar, tetap memudar 100→15 % pada f135–155.
- D2-2 (P11, f0–47) KONTRAS AKSEN: "kepercayaan," (#E8505A) < 4,5:1 di atas area footage terang. Perbaikan tanpa mengubah warna token: naikkan overlay hitam P11 sampai kontras minimum aksen ≥ 4,5:1 (diukur seperti r1), atau tambah gradien LINEAR hitam dari kiri (bukan radial/vignette) di bawah blok teks. Pilih yang paling sedikit menggelapkan footage; laporkan nilai.

FILE BOLEH
- projects/flat-mirip-mirip/remotion/src/uji/PapanFootage.tsx
- projects/flat-mirip-mirip/media/acuan/komponen/D2-*.png
- projects/flat-mirip-mirip/handoff/REPORT-papan-footage-r2.md

FILE JANGAN
Semua file lain (komponen bersama, tema.ts, Root.tsx, P14 di file yang sama tidak boleh berubah: hash render f190 harus identik dengan r1).

LARANGAN
Tidak mengubah ukuran/warna/font teks; tidak menambah elemen; hard cut tetap; tidak ada radial/vignette.

LULUS BILA
- tsc lulus; still D2-p11-f040.png, D2-p12-f100.png, D2-p12-f140.png dibuat; still f190 identik piksel dengan D-p14-f190.png.
- REPORT: kontras minimum aksen P11 ≥ 4,5:1; bbox wajah vs bbox teks P12 tidak beririsan (angka).

JANGAN
Commit, render video penuh.

LAPORAN
REPORT-papan-footage-r2.md.
