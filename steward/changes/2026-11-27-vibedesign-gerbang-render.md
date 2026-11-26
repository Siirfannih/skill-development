# vibedesign: gerbang pada slide yang dirender (V6, V7, V8)
Masalah: juri vibedesign hanya menghitung teks, jadi panel warna di belakang headline tidak terhitung (`juri/README.md` "Batas yang diketahui", `TAHAP.md:7` meta-carousel menerima dua temuan hierarki dengan tangan); tabrakan teks↔objek tidak dicek; tidak ada cek anti-generik pada render. motion-graphic sudah punya `negatif_cek.py` dan `tabrakan_cek.py` untuk frame HTML.
Perubahan: (diisi per komit di bawah)
- V7 (komit pertama): `claude/motion-graphic/scripts/gate/tabrakan_cek.py`: `[data-dekor]` (elemen atau leluhur) dikecualikan seperti `data-sengaja="tumpuk"`; satu kondisi + satu kalimat docstring. Tes baru `claude/motion-graphic/scripts/tests/test_tabrakan_dekor.py` (6 tes; dilewati tanpa Playwright di python sistem, dijalankan dengan `~/work/mg-venv/bin/python`).
Bukti: probe sebelum: `2026-11-27-vibedesign-gerbang-render/probe-before.txt` (tabrakan_cek 93 temuan: 79 TEPI, 9 TEKS-OBJEK, 5 TEKS-TEKS). Sesudah V7: `probe-sesudah-v7.txt` (32 temuan: 28 TEPI, 4 TEKS-OBJEK, 2 TEKS-TEKS; 4 TEKS-OBJEK lain dan 2 TEKS-TEKS sisanya diuraikan di bagian V6 di bawah).
Cara menjalankan probe tanpa instalasi (mesin ini): lihat bagian "Cara menjalankan" di bawah.
Level: Behavior
Persetujuan: permintaan langsung (Irfan 27 Nov, "vibedesign … perlu dilatih lagi", terjemahan) · diterapkan [A]
Cara membatalkan: `git revert` komit yang bersangkutan.
