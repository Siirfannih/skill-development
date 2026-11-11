# Pelajaran yang menunggu keputusan Irfan

Dibaca di awal setiap sesi (lihat `AGENTS.md`). Satu baris per pelajaran. Irfan menjawab **ya** (pindahkan ke skill tujuan lalu hapus barisnya), **tidak** (hapus barisnya), atau membiarkannya. Model tidak memakai baris di sini sebagai aturan.

Sumber: `[I]` = ada kata Irfan, `[A]` = analisis AI.

- [A] Pilot raea (raea.io) **hanya** sebagai renderer cepat proyek HyperFrames di Mac, setelah satu uji berdampingan (SSIM + waktu) melawan CLI HyperFrames. Tidak dipakai sebagai engine ketiga: raea tidak menjalankan kode Remotion, statusnya canary, dan render HTML-nya 108 dtk vs 50 dtk CLI HyperFrames (PR #3 raea, 6 Nov). Preview hemat sudah ada lewat still per beat + audio saja (`delivery-gate.md` §0).
- [A] Profil `music-profiles.json` selain `energi` (fokus, slowdown, tegang, hangat) masih hipotesis. Usul: pisahkan stem musik (demucs di PC server) dari video referensi yang suasananya cocok, minimal 3 per kategori, lalu `music_fit.py --calibrate`.
- [A] Unduh YouTube: yt-dlp tanpa JS runtime kadang hanya memberi audio atau HLS lambat; pakai `--js-runtimes node --remote-components ejs:github` (doac5 7 Nov).
- [A] `music_fit.py` segfault (numba/librosa) bila beberapa proses jalan paralel; jalankan berurutan dengan `NUMBA_CACHE_DIR` per proyek (doac5 7 Nov).
- [A] Dari storyboard Wonder Trojan v4 (Irfan 7 Nov): "hindari ikon 3D, pakai ikon 2D; hindari gradien merah serta putih bergradien biru". Berlaku untuk semua video atau hanya Trojan v4?
- [A] Dari Uji C 8 Nov (skor 24): (1) temuan yang melanggar gerbang keras (aturan 43, track sama) otomatis berdampak "tinggi" dan masuk 5 teratas; (2) audit audio wajib menilai perubahan musik per babak. Tulis ke `analysis-qa.md`?
- [A] Dari ref 18 (11 Nov): aturan 15 melarang biru di latar gelap; gaya Arthur Brooks memakai garis/bola biru bercahaya di hitam (teks tetap putih). Pengecualian untuk aksen non-teks di hitam murni, atau tetap dilarang?
- [A] Dari ref 18 (11 Nov): `pace_read.py` membaca hasil akhir Arthur Brooks (27 cut/menit) sebagai "energi 100–140 bpm"; musiknya string pizzicato ±108 bpm tanpa drum, jauh di bawah suara. Kandidat profil "premium-edukatif" untuk kalibrasi baris profil musik di atas.
- [A] Engine `talking-head-reels` di Linux: matte (cut-out, siluet, kata di belakang kepala) masih butuh Apple Vision. Port ke MediaPipe/rembg di PC, atau cukup dikerjakan di Mac? (11 Nov)
- [A] Usul Lantai (12 Nov, dari uji rekonstruksi 18 + Builder Trap): "Teks menempel pada subjeknya: jarak teks ke subjek yang dirujuk paling jauh ±8 % tinggi frame, dan tidak lebih dekat ke tepi frame daripada ke subjek." Menunggu Irfan menyetujui bunyinya.
- [A] Usul Lantai (12 Nov, dari uji rekonstruksi 30): "Objek 3D tidak tampil mentah: material halus, cahaya lembut, tepi tanpa gerigi; bila tidak bisa dihaluskan, pakai 2D." Baru muncul di satu kartu; menunggu video kedua dan persetujuan Irfan.
- [A] Belum diputuskan Irfan (12 Nov): "gradient pink" dan "biru + putih" ditolak di semua video atau hanya di video tertentu? Sampai dijawab, disimpan sebagai contoh bersyarat, bukan larangan.


_Riwayat:_ 11 Nov: 4 usulan ref 18 (tabel penempatan, menu 3 opsi per beat, paket gaya, tekstur + daftar aset) diterapkan ke `templates/gaya/`, `analysis-qa.md` §2, `storyboard.md` §1 atas permintaan Irfan membuat template dari bedah itu. Daftar 4 Nov (16 pelajaran dari proyek Fore, kartu usulan 30 Okt, dan RETRO 2 Nov) ditolak Irfan 4 Nov: proyek Fore tidak selesai dan pelajarannya bersifat kasus.
