# Kartu C9: nama pemilik keluar dari jalur umum
Masalah: deskripsi SKILL berkata "video/motion Irfan", dan baris "Cocok:" enam tema serta satu contoh dunia-visual menyebut kanal dan produk pemilik. Model yang membacanya menganggap brief non-pemilik di luar sasaran, dan nama pemilik di dalam aturan menjadikan satu konteks tampak seperti hukum (steward §5).
- `SKILL.md` description: `video/motion Irfan (Jadisatu, Tuntunly, siirfan)` → `video/motion untuk merek apa pun (Jadisatu, Tuntunly, siirfan, klien)`; `atau Irfan hanya mengirim referensi video.` → `atau hanya berupa referensi video.` Deskripsi 243 karakter (batas 300), tanpa kata terlarang.
- Enam `references/tema/*.md` baris 9 ("Cocok:"): hanya kata nama pemilik yang diganti, persis seperti teks rencana (documentary-archive, editorial-metaphor-canvas, minimalist-dataviz-kinetic, tactile-paper-collage, talking-head-kinetic, ui-produk-datar). Tema sudah ada di `references/tema/` (Fase 3).
- `references/dunia-visual.md`: `Contoh buruk vs baik (reel opini @siirfannih):` → `(reel opini):`.
- `cookbook/README.md` §1 butir 2: satu kalimat ditambah di akhir (konteks "Remix"/"Catatan pakai" hanya contoh; profil merek mengalahkan kulit kartu).
Tidak diubah: contoh bernama pemilik di §8 tiap tema (A/B "Pertanyaan pembeda"/contoh kerja); rencana mengizinkan.
Ukuran: SKILL.md 12.271 (batas 12.288; +13 dari 12.258), dunia-visual.md 15.298 (15.360; −12 dari C8).
Bukti: `grep "@siirfannih|Soalnya Gini|Jadisatu" references/tema` hanya menyisakan baris contoh §8, tidak ada di "Cocok:". Tes L-06/L-21, `test_migrasi_lantai.py` (termasuk `test_mtd_hanya_penunjuk`), `sumber_cek.py` hijau.
Level: Behavior
Persetujuan: perlu ya pemilik sebelum merge ke main
Cara membatalkan: `git revert` commit ini.
