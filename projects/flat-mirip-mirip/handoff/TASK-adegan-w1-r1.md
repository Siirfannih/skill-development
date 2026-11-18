TUJUAN
Bangun adegan P01,P02,P03,P13,P15 video flat-mirip-mirip sesuai desain Sutradara, dari komponen bersama yang sudah lulus, dengan still per kelompok kata untuk dinilai.

KONTEKS
Baca utuh dan ikuti: `projects/flat-mirip-mirip/handoff/BRIEF-ADEGAN.md` (kontrak teknis + aturan) dan baris P01,P02,P03,P13,P15 di `projects/flat-mirip-mirip/ADEGAN.md` (§Aturan seluruh video juga berlaku). Papan acuan yang disetujui Irfan: `/mnt/storage-projects/flat-mirip-mirip/render/papan-acuan-r1.jpg` (buka gambarnya; adeganmu harus sekeluarga dengan papan itu).
Catatan: Orbit P01 dibangun di file adegan (bukan komponen bersama). Kartu orbit = gambar slop (raster, D-16) dibingkai tepi putih + bayangan token. Pusaran keluar P01: kartu terdekat membesar menyapu layar (motion blur) tepat di akhir adegan. P02 memakai pola UjiB (Studio + video Jensen + Clawd pegang playhead). P13 memakai sumbu dan garis elips tipis yang sama dengan orbit P01 (garis = NETRAL.garis).

KARTU (pekerja tidak membaca kartu; buka gambarnya)
| Acuan | Yang diambil | Gambar |
|---|---|---|
| kiblat 86 (reel Tesla) | kata kecil di garis tengah berjarak lebar; penekanan ±2,3×; ritme cut ±0,5 dtk; tanpa jeda | claude/motion-graphic/guide/referensi/sheets/keyframes/86-k1…k8-*.jpg, contact sheet claude/motion-graphic/guide/referensi/sheets/86-lumitris-tesla-montase.jpg |
| papan acuan r1 (disetujui) | tampilan komponen | /mnt/storage-projects/flat-mirip-mirip/render/papan-acuan-r1.jpg |
| contoh gagal | yang dihindari | claude/motion-graphic/pustaka/contoh-gagal/README.md (+ gambarnya) |

FILE BOLEH
- projects/flat-mirip-mirip/remotion/src/adegan/{P01,P02,P03,P13,P15}.tsx (satu file per adegan) + file bantu kecil `remotion/src/adegan/w1-*.ts(x)` bila perlu
- projects/flat-mirip-mirip/remotion/src/adegan/uji-w1.tsx, projects/flat-mirip-mirip/remotion/src/index-w1.ts
- projects/flat-mirip-mirip/media/acuan/adegan/{P01,P02,P03,P13,P15}-*.png
- projects/flat-mirip-mirip/handoff/REPORT-adegan-w1-r1.md

FILE JANGAN
Semua file lain (pekerja lain sedang menulis adegan lain di folder yang sama: jangan sentuh file mereka).

LULUS BILA
Sesuai BRIEF-ADEGAN.md §Lulus bila.

LAPORAN
REPORT-adegan-w1-r1.md: file, cara tiap gerak dikunci ke kata, hasil tsc/motion_lint/tema_cek, daftar still + satu kalimat apa yang terlihat, hal yang belum bisa (jujur).
