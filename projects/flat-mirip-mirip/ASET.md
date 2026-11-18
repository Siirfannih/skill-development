# ASET · flat-mirip-mirip

Aturan: UI dan grafik dibangun ulang sebagai SVG/komponen Remotion (D-01, D-02). Yang diunduh hanya footage/foto nyata (D-03). Media disimpan di `/mnt/storage-projects/flat-mirip-mirip/` (bukan di git, bukan di root). Tiap file unduhan dicatat: URL, situs, resolusi, durasi, sha1.

Status: `acuan?` = butuh gambar acuan resolusi tinggi · `siap-bangun` · `dibangun` · `lulus-sanding` (still berdampingan dengan acuan, dinilai mata).

## A. UI dibangun ulang (harus sama persis dengan aslinya)

| ID | UI | Adegan | Acuan yang dipakai | Font | Status |
|---|---|---|---|---|---|
| U1 | Claude desktop/web: area chat, composer dengan chip lampiran `video.mp4`, prompt diketik, tombol kirim | P04, P08 | **belum ada acuan resolusi tinggi** (frame kartu 79-k5 hanya 480 px) | font UI Claude tidak tersedia; pengganti diputuskan setelah membandingkan acuan | acuan? |
| U2 | Instagram iOS beranda: status bar, header wordmark, unggahan (avatar, nama, ⋯, media, ikon suka/komentar/kirim/simpan, caption), tab bar | P05, P06, P09 | screenshot Irfan = halaman Cari dan profil, **bukan beranda**; ikon tab bar dan status bar dari screenshot itu | SF Pro (lokal berlisensi) | acuan? (beranda) |
| U3 | Premiere Pro: panel Project, Program Monitor, Timeline V1–V3/A1–A3, playhead | P07 | screenshot Irfan 750 px (terlalu kecil untuk "sama persis") | Adobe Clean tidak tersedia → Source Sans 3 (OFL, buatan Adobe) | acuan? |
| U4 | Remotion Studio: daftar komposisi, preview, kontrol, timeline sequence | P08 (dan P02 bila dipilih) | Remotion Studio asli dari proyek ini dijalankan di PC → screenshot 2× sebagai acuan | font sistem Studio | siap-bangun |
| U5 | Bingkai iPhone (fisik) untuk P05 | P05 | bingkai iPhone dari screenshot Irfan | – | siap-bangun |

## B. Grafik dibangun (SVG)

| ID | Grafik | Adegan | Catatan | Status |
|---|---|---|---|---|
| G1 | Clawd piksel (grid persegi), pose: diam, memegang playhead, mendorong, senang | P02, P08 | bentuk mengikuti maskot di kartu 79 (k7) | siap-bangun |
| G2 | Kartu konten "AI slop" berpola: latar krem, siluet orang, matahari bulat, gunung pastel, gradien warna-warni, garis teks kecil; generator dengan ≥ 12 varian | P01, P05, P06, P09, P10 | pola diambil dari screenshot profil yang Irfan kirim (siluet "I'm Lu…", stick figure, krem), tanpa menyalin akun asli | siap-bangun |
| G3 | Avatar akun fiktif (8 warna/bentuk) + nama akun fiktif | P05, P09 | – | siap-bangun |
| G4 | Klip "referensi profesional" di preview Premiere/Remotion | P07, P08 | usul: pakai satu B-roll nyata (F5) supaya terasa video sungguhan; alternatif: poster geometris merah-hitam seperti storyboard | keputusan |
| G5 | Kartu "karya khas" + tanda kreator | P11–P12 (bila tetap 2D) | tergantung keputusan nada P07–P12 | keputusan |

## C. Footage dan foto nyata (diunduh)

| ID | Kebutuhan | Adegan | Sumber kandidat | Status |
|---|---|---|---|---|
| F1 | Dua orang berjabat tangan di meja toko / founder melayani pelanggan, wajah tidak dominan | P11 | Pixabay, Pexels, Mixkit, Coverr | belum dicari |
| F2 | Potret orang menatap kamera, natural, cahaya hangat | P12 | Pixabay, Pexels, Mixkit | belum dicari |
| F3 | Foto keluarga lama / arsip (sepia) | P14 "ceritamu" | Wikimedia Commons, Internet Archive (domain publik) | belum dicari |
| F4 | POV melihat lewat jendela bidik kamera / tangan memegang kamera | P14 "sudut pandangmu" | Pixabay, Mixkit, Coverr | belum dicari |
| F5 | Detail benda pribadi: buku catatan lusuh, polaroid, pensil di meja | P14 "hal yang cuma kamu alami" | Pixabay, Pexels, Mixkit | belum dicari |
| F6 | Klip "video profesional" yang ditiru (untuk G4) | P07–P08 | Mixkit/Coverr | belum dicari |

Catatan akses (dicek 18 Nov 2026): `curl` ke Pixabay dan Pexels dijawab HTTP 403. Mixkit, Coverr, dan Wikimedia Commons bisa diakses (200). Jalur resmi untuk Pixabay/Pexels: API key (gratis). Browser otomatis tidak dipakai untuk menembus blokir bot.

## D. Aset OpenBot
`~/work/assets-script-final-3/` milik user `openbot` (izin 700). Irfan sudah mengizinkan sesi ini membacanya; akses baca perlu satu perintah sudo dari Irfan (lihat chat). Isinya dicek dulu sebelum dipakai.
