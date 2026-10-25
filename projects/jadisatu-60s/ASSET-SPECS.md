# The Gap: spesifikasi aset (v2, mode 2D)

Pembagian kerja (D-026), dengan arah visual D-027 (Irfan, 25 Okt 14:29):
- **Mode 2D seperti Baikov, kamera 2D.**
- Visual dibangun sebagai **vektor/SVG atau animasi 2D** oleh sesi cloud.
- Foto dan footage asli **hanya untuk orang/karakter**, atau bagian yang memang perlu bukti nyata.
- Motif vas fotorealistik dari frame ChatGPT **tidak dipakai**, karena sulit dianimasikan.

Sumber kebenaran per beat: `storyboard.html` (v2.1).

## 1. Siapa membuat apa

| Siapa | Apa |
|---|---|
| **Cloud** | Semua visual non-manusia sebagai SVG/vektor: halaman diagram (B01), kartu "karya" (B03, B11–B18), UI prompt (B05, B09, B10), garis pertumbuhan (B07), ubin (B16), lensa dan grid (B19), kursor (B22), dan semua kinetic type. Lalu layout, kamera 2D, compositing, dan render. |
| **Lokal (Mac, ChatGPT/Codex)** | Hanya aset **orang**. Daftarnya ada di §2. |

## 2. Aset orang (tugas sesi lokal)

| ID | Beat | Aset | Format | Catatan |
|---|---|---|---|---|
| P01 | B02, B13 | Foto **asli** Ira Glass, wajah dan bahu, menghadap kamera atau 3/4 | PNG transparan (latar dihapus), sisi panjang ≥ 3000 px | Sumber: foto editorial berlisensi atau tangkapan layar wawancara "Ira Glass on Storytelling". Catat sumbernya di `assets/SOURCES.md`. |
| P02 | B20, B21 | Foto **asli** Rick Rubin, wajah dan bahu | sama | Sumber: foto editorial berlisensi atau tangkapan 60 Minutes (CBS, 2023). Catat sumbernya. |
| P03 | B20 | Sampul album asli Johnny Cash (American Recordings) dan Adele (21 atau 25) | PNG persegi ≥ 1500 px | Hanya untuk kutipan/komentar. Catat sumbernya. |
| P04 | B04 | 5 klip manusia, 2–3 dtk, 1080p+: mata menatap layar lalu menyipit · tangan menyeret file ke tempat sampah · tangan mencoret sketsa · creator bersandar dengan tangan di kepala lalu maju lagi · membuka dokumen kosong baru | MP4 | Stok berlisensi atau rekaman sendiri. ChatGPT/Codex tidak membuat video. Kalau memakai generator video, hindari wajah yang mirip orang terkenal. |

**Aturan untuk P01–P03:**
- Wajah tokoh nyata **tidak boleh dibuat atau diubah AI**. ChatGPT hanya boleh menghapus latar, merapikan tepi, dan memperluas kanvas putih.
- Grade hangat, tidak pudar, tanpa nuansa abu-abu.
- Latar putih polos atau transparan.

## 3. Serah terima

1. Simpan di `projects/jadisatu-60s/assets/` dengan nama `P01-ira-glass.png` dan seterusnya. Tambahkan `assets/SOURCES.md` (ID, sumber, lisensi atau dasar fair use).
2. Commit + push ke branch `claude/project-thread-742xsr`.
3. Kabari sesi cloud lewat koordinator. Sesi cloud akan memasangnya ke frame dan memberi umpan balik per aset.

## 4. Catatan kinerja Mac (instruksi Irfan: "jaga performa mac")

- Satu proses berat sekali jalan. Jangan render, generate, dan unduh besar secara bersamaan.
- Pemrosesan video dan render dilakukan di cloud, bukan di Mac.
