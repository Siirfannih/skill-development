# DECISIONS · video perkenalan v6

Keputusan Irfan (19 Nov 2026) yang menimpa `sumber/EDITING-GUIDELINE-FINAL.md` ada di `kerja/AUDIO-KEPUTUSAN.md`. Di bawah ini keputusan kerja agen (Claude) saat menyusun draf, beserta alasannya.

| # | Keputusan | Alasan |
|---|---|---|
| D1 | Shot STUDIO (H1, H2, #6, #11, #15, #21) = cutout RVM dari footage TH di dunia MG (Blue Void / White Studio), bukan plate Omni. | Omni batal (Irfan). |
| D2 | Matte RVM di setengah resolusi, alpha di-upscale. | CPU dipakai bersama agen lain (load ±29); resolusi penuh terlalu lambat. |
| D3 | `fg.webm` (0–1659) + `fg_b.webm` (1640–1799), disambung di f1660. | Disk bersama penuh saat matte pertama; file terpotong di-remux, sisa dibuat ulang. Tidak ada file milik orang lain yang dihapus. |
| D4 | Cutout di dunia studio diberi mask tepi (kiri/kanan 10 %, bawah 72→96 %). | Saat diskalakan <1, potongan lurus frame footage terlihat (lengan, kursi). |
| D5 | Narasi memakai slot bergantian (maks 2 blok di layar, blok i keluar saat blok i+2 masuk). | Audit still: narasi menumpuk dan terpotong tepi. |
| D6 | Hero yang lebar (JADI-JADI, BUILDER, PENYAKIT, 100%, BERBEDA) dipusatkan di x 540 dan diperkecil. | Tepi kanan/kiri terpotong saat punch kamera. |
| D7 | #10 PENYAKIT di pita atas kepala (kamera berporos di puncak kepala). | Wajah memenuhi frame; di belakang kepala hero tidak terbaca. |
| D8 | #21 BUILDER TRAP: orbit mengelilingi badan lalu mendarat sebagai **baris** di atas kepala (bukan cincin), diam f1778–1783, sobek f1783. | Versi cincin tidak terbaca (huruf merah tersebar di dada). |
| D9 | #14 jendela Claude = tangkapan Claude Code dari `skill-development-journey/sumber/ref` (bukan sesi proyek ini). | Sesuai acuan guideline; tangkapan sesi baru butuh UI desktop yang tidak tersedia di mesin render. |
| D10 | #23 polaroid = avatar asli (`avatar_raw.png`), jadi satu objek yang berubah bentuk ke avatar profil. Menyelam memakai tile "Ini Irfan" 623×834. | Reel asli resolusi penuh tidak bisa diunduh (IG memblokir pengunjung tanpa login). Perlu diganti bila Irfan memberi file reel. |
| D11 | Profil IG dibangun ulang dari `referensi_gambar/ig_profil` (11 posts, 2,842 followers, 1,098 following, bio, highlight asli). | instagram.com memunculkan modal login untuk pengunjung. |
| D12 | Peran SFX baru: `tick-hero`, `riser-slam`, `hantam-sub-hp` (di `kerja/sfx_extra/`). | Keputusan Irfan "lebih padat, tetap rapi"; hantam-sub asli hampir tak terdengar di speaker HP (energi < 320 Hz). |
| D13 | Pelindung puncak −1 dBFS per cue, bukan per stem. | Penurunan seluruh stem SFX memotong 10 dB dari semua cue hanya karena 3 cue. |
