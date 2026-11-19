TUJUAN
Perkuat pembuka P01 (tiga detik pertama) dan isi P13 supaya tidak ada rentang kosong, tanpa mengubah arahan Irfan; adegan lain tidak disentuh.

KONTEKS
Baca BRIEF-ADEGAN.md + REPORT-adegan-w1-r1.md. Draft video utuh (`qc/draft.mp4`, lembar 2 fps dilihat Sutradara) menunjukkan: P01 0–3,4 dtk hanya kata kecil di kanvas putih kosong (Lantai 22c: tiga detik pertama menentukan; D-23: tanpa waktu mati, semuanya "dimainkan"). Arahan Irfan P01 (tetap berlaku): "saat bagian <flat dan mirip-mirip?> ada beberapa gambar atau video konten sosial media yang memutari kata kata ditengah tengah ... berputar perlahan lalu cepat dan langsung transisi ke frame selanjutnya (seperti pusaran air)".
TEMUAN / PERUBAHAN
- W1-3a P01: kartu orbit (gambar slop yang sama) mulai MASUK satu per satu ke lintasan elips sejak kata "di" (kelompok "di sosial media") — makna: konten sosial media mulai berdatangan — dengan react(i) per kata berikutnya, orbit masih pelan dan renggang; pada "flat" sudah 8 kartu; "mirip-mirip?" orbit merapat dan makin cepat (seperti sekarang), lalu pusaran keluar (tetap). Frame 0 tetap kanvas + kata "Kenapa", tetapi kamera mulai push pelan 1,00→1,04 sejak frame 0 dan garis elips orbit tergambar (draw-on) selama kelompok pertama, supaya frame 0–1 dtk sudah bergerak.
- W1-3b P13: jejak orbit P01 berisi 8 bayangan kartu kosong (bingkai tepi putih + bayangan token, tanpa isi gambar) yang mengorbit sangat pelan di lintasan yang sama — makna: tempat konten yang mirip-mirip kini kosong; tidak menutup teks.
- Waktu tetap dikunci ke kata/kelompok (waktu VO menyusul).

FILE BOLEH
- projects/flat-mirip-mirip/remotion/src/adegan/P01.tsx, P13.tsx, remotion/src/adegan/w1-*.tsx (bagian P01/P13)
- projects/flat-mirip-mirip/media/acuan/adegan/P01-r3-*.png, P13-r3-*.png
- projects/flat-mirip-mirip/handoff/REPORT-adegan-w1-r3.md

FILE JANGAN
P02/P03/P15 dan file lain.

LULUS BILA
tsc + motion_lint PASS; still P01-r3 di f000, f015, f030, tengah tiap kelompok, dan 3 frame terakhir; P13-r3 tengah tiap kelompok; tidak ada rentang > 0,5 dtk tanpa perubahan visual di P01 (sebut frame bukti).

LAPORAN
REPORT-adegan-w1-r3.md.
