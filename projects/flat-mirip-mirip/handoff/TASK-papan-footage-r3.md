TUJUAN
Perbaiki PapanFootage P11 dan P12 sesuai koreksi Irfan (D-18, D-19, D-20); P14 sudah lulus dan tidak disentuh.

KONTEKS
Ronde 1: REPORT-papan-footage-r1.md + still D-p11-f040.png, D-p12-f140.png (ronde 2 dibatalkan sebelum selesai; bila ada perubahan sisa ronde 2 di PapanFootage.tsx, periksa dan rapikan agar sesuai TASK ini).
Koreksi Irfan (verbatim inti): "jualan kepercayaan, background di belakangnya itu kan hitam, sedangkan kamu pakai kepercayaannya merah. Kontrasnya nabrak... sulit kebaca." · "bukan videonya ... harusnya digeser ke kiri lagi dikit biar nggak nabrak wajah orangnya. Videonya juga digeser ke kanan." · "gak perlu ada illustration vector kayak gini lagi karena udah pakai real footage. Jadi, kamu harus pilih salah satu."
TEMUAN
- D3-1 P11: "kepercayaan," TIDAK merah. Semua teks P11 putih (NETRAL.putih). Penekanan "kepercayaan," = KataTekan warna putih bila komponen mendukung; bila KataTekan hanya 'tinta'|'primer', pakai KataKecil putih dengan bobot tekan lewat token HURUF.bobot.tekan dan ukuran HURUF.ukuran.tekan melalui wrapper lokal di file uji (bukan mengubah komponen) — laporkan cara yang dipakai. Overlay hitam P11 kembali secukupnya agar teks putih ≥ 4,5:1 (r1: 50 % sudah ≥ 9:1).
- D3-2 P12: footage F2-b digeser ke kanan (pusat wajah x ±66–70 % lebar, skala ≥ 1,12 tanpa tepi kosong, push pelan tetap); semua teks P12 di ruang kosong kiri (pusat blok x ±28–32 %), bbox teks tidak beririsan dengan bbox kepala+wajah, jarak ≥ 40 px (laporkan angka per still). "orangnya," = penekanan putih (bukan merah, bukan #E8505A). "bukan videonya." boleh memudar ke NETRAL.redup (makna "lupa").
- D3-3 P12: HAPUS ketiga KartuSlop (tidak ada ilustrasi vektor di atas footage).

FILE BOLEH
- projects/flat-mirip-mirip/remotion/src/uji/PapanFootage.tsx
- projects/flat-mirip-mirip/media/acuan/komponen/D3-*.png
- projects/flat-mirip-mirip/handoff/REPORT-papan-footage-r3.md

FILE JANGAN
Semua file lain (src/bersama/**, tema.ts, Root.tsx, UjiB/UjiC yang sedang dikerjakan pekerja lain).

LARANGAN
Tidak ada warna merah/aksen pada teks di atas footage; tidak ada elemen vektor/ilustrasi di adegan footage; hard cut; P14 render f190 identik piksel dengan D-p14-f190.png.

LULUS BILA
tsc lulus; still D3-p11-f040.png, D3-p12-f100.png, D3-p12-f140.png; REPORT berisi kontras minimum teks per still dan bbox wajah vs teks P12 (angka); f190 identik.

JANGAN
Commit, render video penuh.

LAPORAN
REPORT-papan-footage-r3.md.
