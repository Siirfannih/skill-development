# TASK r6 · Keseimbangan + B12 jendela besar + B17/B18 (setelah review buta r5)

Editor KT (lanjutan r5). Review Sutradara atas `qc/r5_sheet.jpg`: re-time, triad, B01–B03, B04, wallpaper B12–B13 diterima. Sisa:

1. **Q-r5-01 B12–B13 jendela ChatGPT**: ikuti gambar referensi Irfan — jendela BESAR yang terpotong di tepi kanan frame (tidak harus utuh), sehingga kotak prompt ≥ 6 % tinggi saat kata kuncinya; KT tetap di wallpaper kiri (±35 % lebar frame kiri), tidak menimpa UI.
2. **B17–B18 (dan B16e/B18e)**: tumpukan kata kiri dipertahankan; UI Threads/GitHub diperbesar mengisi separuh kanan (boleh terpotong tepi kanan/bawah), sehingga sisi kanan tidak kosong (balance_check di frame frasa utuh ≥ 0,30 tiap sisi).
3. **Q-r5-02 cara menilai keseimbangan**: still diambil di frame **frasa utuh** (kata terakhir tampilan sudah muncul), satu per tampilan teks + satu per beat tanpa teks. Frame tengah frasa tidak dinilai. Jalankan `balance_check.py` pada set itu; setiap FAIL diperbaiki dengan POSISI (teks berseberangan dengan subjek, mendekat ke subjek, atau UI/objek diperbesar), bukan ukuran huruf. Bila FAIL tetap ada dan kamu menilai seimbang di mata, tulis alasannya per still di laporan (Sutradara yang memutuskan).
4. **Q-r5-03 B22**: teks "kemana-mana." ditahan sampai wipe menutupinya (seperti v2, 1–3 frame), memakai frame adegan untuk blok itu saja.
5. Q-r5-04 diterima.

Cek: cekkata (exit 0), tsc, lembar `qc/r6_sheet.jpg` (still frasa utuh), keluaran balance_check apa adanya. Laporan sebagai balasan. Disk ±3 GB: bersihkan still lama r4/r5 setelah sheet dibuat; jangan render final.
