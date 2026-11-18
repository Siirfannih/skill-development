TUJUAN
Bangun adegan P04,P05,P06 video flat-mirip-mirip sesuai desain Sutradara, dari komponen bersama yang sudah lulus, dengan still per kelompok kata untuk dinilai.

KONTEKS
Baca utuh dan ikuti: `projects/flat-mirip-mirip/handoff/BRIEF-ADEGAN.md` (kontrak teknis + aturan) dan baris P04,P05,P06 di `projects/flat-mirip-mirip/ADEGAN.md` (§Aturan seluruh video juga berlaku). Papan acuan yang disetujui Irfan: `/mnt/storage-projects/flat-mirip-mirip/render/papan-acuan-r1.jpg` (buka gambarnya; adeganmu harus sekeluarga dengan papan itu).
Catatan: P04 ketik persis 'Claude please help me edit this video like a professional video editor' (D-11), cps diatur supaya selesai sebelum kata 'hitungan menit' berakhir; Flash pada akhir adegan. P05 scroll memakai kurva (bukan linear), makin cepat; isi feed gambar slop k1-* berulang dengan beberapa k2/k3 terselip. P06 gambar slop (raster) dan KartuSlop (SVG) sama-sama ilustrasi; tidak ada footage di P06.

KARTU (pekerja tidak membaca kartu; buka gambarnya)
| Acuan | Yang diambil | Gambar |
|---|---|---|
| kiblat 86 (reel Tesla) | kata kecil di garis tengah berjarak lebar; penekanan ±2,3×; ritme cut ±0,5 dtk; tanpa jeda | claude/motion-graphic/guide/referensi/sheets/keyframes/86-k1…k8-*.jpg, contact sheet claude/motion-graphic/guide/referensi/sheets/86-lumitris-tesla-montase.jpg |
| papan acuan r1 (disetujui) | tampilan komponen | /mnt/storage-projects/flat-mirip-mirip/render/papan-acuan-r1.jpg |
| contoh gagal | yang dihindari | claude/motion-graphic/pustaka/contoh-gagal/README.md (+ gambarnya) |

FILE BOLEH
- projects/flat-mirip-mirip/remotion/src/adegan/{P04,P05,P06}.tsx (satu file per adegan) + file bantu kecil `remotion/src/adegan/w2-*.ts(x)` bila perlu
- projects/flat-mirip-mirip/remotion/src/adegan/uji-w2.tsx, projects/flat-mirip-mirip/remotion/src/index-w2.ts
- projects/flat-mirip-mirip/media/acuan/adegan/{P04,P05,P06}-*.png
- projects/flat-mirip-mirip/handoff/REPORT-adegan-w2-r1.md

FILE JANGAN
Semua file lain (pekerja lain sedang menulis adegan lain di folder yang sama: jangan sentuh file mereka).

LULUS BILA
Sesuai BRIEF-ADEGAN.md §Lulus bila.

LAPORAN
REPORT-adegan-w2-r1.md: file, cara tiap gerak dikunci ke kata, hasil tsc/motion_lint/tema_cek, daftar still + satu kalimat apa yang terlihat, hal yang belum bisa (jujur).
