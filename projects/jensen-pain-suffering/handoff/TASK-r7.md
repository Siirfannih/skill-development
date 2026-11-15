# TASK r7 · perbaikan audit frame ulang r6 (qc/frame_audit/*/VERDICT.md) — diff, beat lain tidak disentuh

1. **c02 GAGAL, B4 f376–382** (`qc/cek_c02.jpg`): "providing" ikut terseret keluar layar bersama cetakan lama, lalu 4 frame tanpa teks sampai "a" (f383). Perbaikan: saat kamera berpindah antar-cetakan, teks tidak ikut keluar frame. Tahan tampil lama di posisi layar yang terbaca sampai tampil berikutnya masuk dengan silang 3 frame. Berlaku untuk semua perpindahan cetakan di B4.
2. **Kotak bertepi tegas di belakang teks (Lantai A9)**: B5 "plenty of"/"setbacks" (f498–541) dan B8a "Because"/"to" (f817–843). Ganti scrim persegi dengan penggelap lembut tanpa tepi (radial/elips besar atau gradien, tepi feather ≥ 150 px @1080). Tidak boleh ada tepi persegi yang terlihat.
3. **Teks utuh mendahului ucapan > 0,25 dtk** → modus `kata` (kata muncul berurutan di tempat):
   - T32 "And I mean that." (f686)
   - T36 "pain and suffering." (B7a f757)
   - T37 "And I mean that" (f777)
   - T38 "in a happy way," (f797)
   - T50 "Greatness comes": mulai di onset "greatness" 33,79, bukan 33,67 ("it's" salah dengar).
4. **Jarak teks ke kepala di semua talking head** (data kepala per frame seperti `head.json` B11, diperluas ke B1, B3, B6c, B7b, B9b): jarak ≥ 4 % lebar frame dari tepi kepala selama tampil.
   - T13 "suffering" saat punch-in B3 (f246–251): sekarang hampir nol.
   - T32/T37/T38: jaraknya 5–10 px dari pipi/kacamata.
5. **B8b T45 "You want"** mepet tepi kiri (±5 %). Geser supaya ≥ 8 % dari tepi.
6. **Artefak blur silang** f796–797: blok piksel kasar di tepi kanan teks saat silang. Haluskan, misalnya blur pakai filter CSS di elemen teks, bukan di salinan berskala kecil.

Keluaran: still beat yang berubah, draft penuh, `handoff/REPORT-r7.md`. Sesudahnya Sutradara menjalankan audit frame ulang.
