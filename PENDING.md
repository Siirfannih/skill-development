# Pelajaran yang menunggu keputusan Irfan

Dibaca di awal setiap sesi (lihat `AGENTS.md`). Satu baris per pelajaran. Irfan menjawab **ya** (pindahkan ke skill tujuan lalu hapus barisnya), **tidak** (hapus barisnya), atau membiarkannya. Model tidak memakai baris di sini sebagai aturan.

Sumber: `[I]` = ada kata Irfan, `[A]` = analisis AI.

- [A] Pilot raea (raea.io) **hanya** sebagai renderer cepat proyek HyperFrames di Mac, setelah satu uji berdampingan (SSIM + waktu) melawan CLI HyperFrames. Tidak dipakai sebagai engine ketiga: raea tidak menjalankan kode Remotion, statusnya canary, dan render HTML-nya 108 dtk vs 50 dtk CLI HyperFrames (PR #3 raea, 6 Nov). Preview hemat sudah ada lewat still per beat + audio saja (`delivery-gate.md` §0).
- [A] Profil `music-profiles.json` selain `energi` (fokus, slowdown, tegang, hangat) masih hipotesis. Usul: pisahkan stem musik (demucs di PC server) dari video referensi yang suasananya cocok, minimal 3 per kategori, lalu `music_fit.py --calibrate`.
- [A] Unduh YouTube: yt-dlp tanpa JS runtime kadang hanya memberi audio atau HLS lambat; pakai `--js-runtimes node --remote-components ejs:github` (doac5 7 Nov).
- [A] `music_fit.py` segfault (numba/librosa) bila beberapa proses jalan paralel; jalankan berurutan dengan `NUMBA_CACHE_DIR` per proyek (doac5 7 Nov).
- [A] Dari storyboard Wonder Trojan v4 (Irfan 7 Nov): "hindari ikon 3D, pakai ikon 2D; hindari gradien merah serta putih bergradien biru". Berlaku untuk semua video atau hanya Trojan v4?
- [A] Dari Uji C 8 Nov (skor 24): (1) temuan yang melanggar gerbang keras (aturan 43, track sama) otomatis berdampak "tinggi" dan masuk 5 teratas; (2) audit audio wajib menilai perubahan musik per babak. Tulis ke `analysis-qa.md`?
- [A] Dari ref 18 Joseph/Arthur Brooks (11 Nov): bedah referensi (`analysis-qa.md` §2) wajib menghasilkan tabel "kalimat pemicu → jenis adegan → peran kalimat (umumkan/jelaskan/sebut orang/cerita/lelucon/angka/penutup)", bukan hanya metrik cut/teks/SFX.
- [A] Dari ref 18 (11 Nov): untuk klip/talking head, gerbang 4 berupa rencana edit menu: 3 opsi per beat, tiap opsi mengutip ID adegan referensi, Irfan memilih ±15 menit sebelum build (sekarang agent memilih sendiri tanpa titik pilih Irfan).
- [A] Dari ref 18 (11 Nov): gaya yang dipakai berulang disimpan sebagai paket gaya `guide/gaya/<nama>/`: taksonomi adegan bernama + pustaka animasi ber-ID (still awal/tengah/akhir + lembar keyframe), dibangun dari ≥ 10 video kreator yang sama.
- [A] Dari ref 18 (11 Nov): tekstur/material (kertas, tepi gelap + blur B-roll, cat di lukisan, kain di ilustrasi) jadi token di `beats.json → arah` + cek QA "tekstur menempel ke layer, kekuatan terkalibrasi"; daftar aset visual + lisensi (`CREDITS.md`: lukisan Wikimedia, stok Pexels, foto tokoh) sebelum gerbang 7.
- [A] Dari ref 18 (11 Nov): aturan 15 melarang biru di latar gelap; gaya Arthur Brooks memakai garis/bola biru bercahaya di hitam (teks tetap putih). Pengecualian untuk aksen non-teks di hitam murni, atau tetap dilarang?
- [A] Dari ref 18 (11 Nov): `pace_read.py` membaca hasil akhir Arthur Brooks (27 cut/menit) sebagai "energi 100–140 bpm"; musiknya string pizzicato ±108 bpm tanpa drum, jauh di bawah suara. Kandidat profil "premium-edukatif" untuk kalibrasi baris profil musik di atas.

_Riwayat:_ Daftar 4 Nov (16 pelajaran dari proyek Fore, kartu usulan 30 Okt, dan RETRO 2 Nov) ditolak Irfan 4 Nov: proyek Fore tidak selesai dan pelajarannya bersifat kasus.
