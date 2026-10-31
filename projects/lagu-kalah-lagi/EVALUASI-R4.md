Kartu review · loris-storyboard-r4

Berubah: Seluruh 25 panel storyboard diselaraskan menjadi satu set R4, ditambah panduan tokoh dan produksi. Sebanyak 32 artboard lama yang tergantikan dihapus setelah cadangan dan pemeriksaan.
Coba: [Buka panel pertama di Loris](https://app.wonder.so/igede-irfan-kusuma-putra/files/01a190b5-6326-7caf-b9d0-fef94f3a8c71/branches/main/pages/a435035e-128c-531c-8013-34810338b0c9?nodeId=e5540b04-8bb8-5dae-afea-9ff1fd469308), lalu ikuti grid 5×5 dari kiri ke kanan.
Bukti: `qa-r4/` memuat 27 screenshot native Wonder; pemeriksaan inventaris, nomor, posisi, caption dan whitespace Git lulus. Screenshot adalah artboard storyboard, bukan tes UI pada viewport 390/1440.
Butuh keputusanmu: File lagu diperlukan ketika masuk produksi animatic; durasi sekarang estimasi 142 detik. Tidak menghalangi penuntasan storyboard diam.
Jawab: ✅ loris-storyboard-r4 | 🔁 loris-storyboard-r4: <catatan> | ❓ loris-storyboard-r4

## Hasil dan batas

- Satu versi aktif untuk masing-masing beat 01–25. Tokoh, tangan/pantulan, skala properti, bookend dan caption diperiksa. Acuan ACC diteruskan; lingkungan 07 terpilih dan 20 diperiksa lewat perbandingan source.
- `canvas-before-r4.json`: cadangan source 32 artboard sebelum pembersihan. `canvas-r4.json`: source dan geometri 27 artboard sesudah. Cadangan memungkinkan rekonstruksi; fitur Undo Wonder tidak diuji.
- Pemeriksaan Node: jumlah 32/27, tepat 25 nomor unik, tidak ada ID lama, grid 5×5, tidak bertumpuk, viewBox 1920×1080 dan caption lirik/kamera/SFX/estimasi tersedia. Semua lulus.
- Tidak ada perubahan kode Remotion, render video, mix audio atau tes timing lagu. Disk Mac di bawah 10 GiB; pekerjaan lokal dibatasi dokumentasi dan ekstraksi screenshot kecil.
- Bukan persetujuan kreatif final. Montase kalender dan perpindahan dunia nyata/batin masih harus diuji saat animatic.

## Audit independen

Claude R3: **PASS_WITH_NOTES**, permintaan `REQ-20261031-2300-loris-storyboard-r4-r3`. Laporan: [AUDIT-R4-R3.md](AUDIT-R4-R3.md). R1 FAIL dan R2 PASS_WITH_NOTES tetap disimpan sebagai riwayat, bukan versi canvas aktif.

- Catatan minor terbuka: pose lari 21 masih lemah pada still; pemisahan senyum embun dari mulut murung 17 perlu diperiksa pada ukuran kecil/animatic. Tidak mengulang koreksi visual tanpa batas; uji gerak merupakan tahap berbeda.
- Auditor memeriksa snapshot/source/JPEG, tidak dapat mengakses canvas live. Pemeriksaan live dilakukan pembuat lewat Wonder: 27 akar aktif, tidak ada ID lama tersisa. Ini bukan klaim audit live independen.
- Cadangan source dan layout lama sudah disalin ke `AI-Cloud/Projects/lagu-kalah-lagi/Archive/20261031-codex-loris-before-r4-{source,layout}.json`; metadata native kedua berkas menunjukkan `isUploaded=1`, `isUploading=0`. Web Internxt tidak diperiksa.
