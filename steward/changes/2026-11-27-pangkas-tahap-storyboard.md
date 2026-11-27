# Pangkasan tahap storyboard

Tanggal: 27 Nov 2026. Tingkat: perilaku (pemilik: "Ya usulkan dan pangkas").

Alasan pemilik: workflow terlalu ketat sehingga model sibuk pada aturan, bukan mutu; hasil storyboard uji terakhir lebih lemah dari versi `8969cad6` (uji Qwen dan Level 1).

## Yang dipangkas

- `SKILL.md` §Sebelum mulai: satu baris pembuka bahwa skill ini cara kerja dan bahan pertimbangan; yang tetap hanya maunya user, butir [mutlak], gerbang pemilik.
- `SKILL.md` Hukum besi: dipendekkan menjadi "lihat, bandingkan, jalankan cek yang tersedia". Syarat `cek-warna.mjs keluar` dan `banding.py --seri` hijau tidak lagi disebut sebagai syarat serah.
- `storyboard.md` §2 langkah 4: kerangka (`--skeleton`) menjadi pilihan.
- `storyboard.md` §5: tabel kritik sutradara 10 kolom per beat dihapus (kriteria di atasnya sudah memuat isinya; tabel lengkap masih ada di `analysis-qa.md` §16.3).
- `storyboard.md` §7: TYPE-TEST dan TRANSITION-SHEET menjadi pilihan.
- `storyboard.md` §1 dan `dunia-visual.md` §7: "gambar ulang setia" diselaraskan dengan §9 D19c (storyboard pemilik = struktur; rupa dirapikan).
- `test_audit_dokumen.py`: satu asersi yang mengunci tabel kritik dihapus.

Tidak disentuh: NEGATIF, skrip gerbang, `director-pass`, `bahan.md`.

## Belum dibuktikan

Tidak ada storyboard yang dijalankan sesudah pangkasan ini. Usulan pangkasan yang butuh keputusan pemilik ada di laporan chat (kertas kerja per beat di `beats.json`, larangan lama di empat berkas, ambang F1).
