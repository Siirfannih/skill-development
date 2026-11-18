CATATAN AWAL SESI (dari Sutradara): doctor.sh sudah dijalankan Sutradara dan LULUS. Bila saat kamu jalankan doctor gagal HANYA karena "PETA.md basi" (file baru dari pekerja paralel), lanjutkan tugas: jangan menjalankan --fix, jangan mengubah PETA.md, cukup catat di REPORT. Untuk kegagalan doctor jenis lain, berhenti dan laporkan.

TUJUAN
Bangun adegan P08,P09,P10 video flat-mirip-mirip sesuai desain Sutradara, dari komponen bersama yang sudah lulus, dengan still per kelompok kata untuk dinilai.

KONTEKS
Baca utuh dan ikuti: `projects/flat-mirip-mirip/handoff/BRIEF-ADEGAN.md` (kontrak teknis + aturan) dan baris P08,P09,P10 di `projects/flat-mirip-mirip/ADEGAN.md` (§Aturan seluruh video juga berlaku). Papan acuan yang disetujui Irfan: `/mnt/storage-projects/flat-mirip-mirip/render/papan-acuan-r1.jpg` (buka gambarnya; adeganmu harus sekeluarga dengan papan itu).
Catatan: P08 = AppClaudeTerang singkat (prompt sudah terkirim, balasan singkat 'On it.' TIDAK boleh: teks karangan; cukup indikator kerja/status asli) lalu StudioRemotion dengan Sequence muncul beruntun cepat (react) + preview video Jensen + Clawd senang. P09/P10 memakai header unggahan IG (avatar + nama akun fiktif berbeda, ikon dari ui-asli/instagram) + media gambar slop k1-01 yang SAMA di 8 kartu. Fade P10 = pengecualian disengaja (makna lupa), kurva leave.

KARTU (pekerja tidak membaca kartu; buka gambarnya)
| Acuan | Yang diambil | Gambar |
|---|---|---|
| kiblat 86 (reel Tesla) | kata kecil di garis tengah berjarak lebar; penekanan ±2,3×; ritme cut ±0,5 dtk; tanpa jeda | claude/motion-graphic/guide/referensi/sheets/keyframes/86-k1…k8-*.jpg, contact sheet claude/motion-graphic/guide/referensi/sheets/86-lumitris-tesla-montase.jpg |
| papan acuan r1 (disetujui) | tampilan komponen | /mnt/storage-projects/flat-mirip-mirip/render/papan-acuan-r1.jpg |
| contoh gagal | yang dihindari | claude/motion-graphic/pustaka/contoh-gagal/README.md (+ gambarnya) |

FILE BOLEH
- projects/flat-mirip-mirip/remotion/src/adegan/{P08,P09,P10}.tsx (satu file per adegan) + file bantu kecil `remotion/src/adegan/w3-*.ts(x)` bila perlu
- projects/flat-mirip-mirip/remotion/src/adegan/uji-w3.tsx, projects/flat-mirip-mirip/remotion/src/index-w3.ts
- projects/flat-mirip-mirip/media/acuan/adegan/{P08,P09,P10}-*.png
- projects/flat-mirip-mirip/handoff/REPORT-adegan-w3-r1.md

FILE JANGAN
Semua file lain (pekerja lain sedang menulis adegan lain di folder yang sama: jangan sentuh file mereka).

LULUS BILA
Sesuai BRIEF-ADEGAN.md §Lulus bila.

LAPORAN
REPORT-adegan-w3-r1.md: file, cara tiap gerak dikunci ke kata, hasil tsc/motion_lint/tema_cek, daftar still + satu kalimat apa yang terlihat, hal yang belum bisa (jujur).