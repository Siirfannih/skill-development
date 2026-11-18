TUJUAN
Bangun adegan P07, P11, P12, P14 video flat-mirip-mirip: bagian dokumenter dengan footage dan kartu foto arsip, potong rapat ala reel Tesla, teks sebagai poin.

KONTEKS
Baca utuh: `projects/flat-mirip-mirip/handoff/BRIEF-ADEGAN.md` (catatan doctor/PETA di atasnya berlaku) dan baris P07, P11, P12, P14 + §Aturan seluruh video di `projects/flat-mirip-mirip/ADEGAN.md`. Pola footage bermaterial yang sudah DISETUJUI Irfan: `remotion/src/uji/PapanFootage.tsx` (P11/P12 r3: teks putih, TekanFootage putih, gelap secukupnya, teks menjauhi wajah; P14: kartu foto bertepi putih miring di atas latar blur gelap). Pakai ulang polanya (salin ke file adeganmu atau ke `adegan/w4-*.tsx`), jangan ubah PapanFootage.tsx.
Koreksi Irfan yang harus terlihat (D-22, D-23): footage BUKAN video murni → latar bermaterial (grade saturasi 0,55–0,7, hitam terangkat, grain halus, bloom tipis, aberasi kromatik kecil di tepi, gelap LINEAR di area teks, tanpa vignette radial); potong rapat 0,4–0,8 dtk per shot, banyak shot per frasa, tanpa jeda; wajah tidak jadi poin utama (wajah frontal maksimal 0,5 dtk); tambah gambar dokumenter (kartu foto arsip).
Pilihan footage (lihat `media/footage/LOG.md` untuk path file):
- P07: kartu foto arsip G4-c lalu G4-b (bergantian ±0,6 dtk, di kanvas putih, kartu bertepi putih + bayangan token, sedikit miring, masuk dari bawah) pada "Buat belajar"…"cara belajar terbaik"; lalu PremierePro: Source = `media/footage/jadi/jensen-v4-00-14.mp4` (referensi), Program = salinan yang terbentuk (video jadi yang sama, tertinggal beberapa potongan), klip V1 dipotong manual satu per satu mengikuti kata, playhead jalan; narasi KataKecil di kanvas di luar jendela UI bila UI tidak penuh layar, atau di ruang kosong yang tidak menutup monitor.
- P11: montase G1-a, G1-b, F1-a, F1-b (urut bebas, 0,4–0,8 dtk per shot) + teks putih; "kepercayaan," penekanan putih.
- P12: montase G2-a, G2-c, G2-b, F2-b (F2-b ≤ 0,5 dtk) pada "dan kita seringkali"…"ingat orangnya,", "orangnya," penekanan putih besar; "bukan videonya." di atas G3-c (dan/atau G3-a) yang makin blur. Teks tidak menutup wajah.
- P14: tiga kartu foto berurutan hard cut: "ceritamu," = F3-a atau G5-a; "sudut pandangmu," = F4-a (video di dalam kartu foto); "hal yang cuma kamu alami." = G6-a lalu F5-b (video dalam kartu). Latar tiap kartu = gambar yang sama blur gelap.

KARTU
| Acuan | Yang diambil | Gambar |
|---|---|---|
| papan acuan r1 (disetujui) | perlakuan footage P11/P12/P14 | /mnt/storage-projects/flat-mirip-mirip/render/papan-acuan-r1.jpg |
| kiblat 86 | ritme cut ±0,5 dtk, teks kecil tengah | claude/motion-graphic/guide/referensi/sheets/86-lumitris-tesla-montase.jpg |
| video Jensen Behindwork (latar footage + teks dominan) | footage gelap + teks putih + kartu foto | /tmp/claude-1000/-home-irfan-work/4940a6b7-bec5-59dd-ab2f-54ead03d408f/scratchpad/jensen.jpg |

FILE BOLEH
- projects/flat-mirip-mirip/remotion/src/adegan/{P07,P11,P12,P14}.tsx, remotion/src/adegan/w4-*.ts(x), remotion/src/adegan/uji-w4.tsx, remotion/src/index-w4.ts
- projects/flat-mirip-mirip/media/acuan/adegan/{P07,P11,P12,P14}-*.png
- projects/flat-mirip-mirip/handoff/REPORT-adegan-w4-r1.md

FILE JANGAN
Semua file lain (pekerja lain aktif di folder adegan; jangan sentuh file mereka). PapanFootage.tsx, komponen bersama, tema.ts, naskah.ts, Root/index.

LULUS BILA
BRIEF-ADEGAN §Lulus bila + REPORT memuat: daftar shot per adegan (file, detik sumber, durasi), kontras teks minimum per still, dan untuk P12 bbox wajah vs teks (tidak beririsan).

LAPORAN
REPORT-adegan-w4-r1.md.
