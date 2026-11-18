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

## E. Pakai ulang dari skill-development-journey (D-07, basis `f054dec`)

Disalin ke `remotion/src/pinjam/` (+ `src/lib`, `src/komponen/K01`, `src/papan/karakter2d`, `src/papan/kit.tsx`, `public/fonts`). Folder asal tidak diubah. Still uji: `media/acuan/pinjam/*.png` (semua render tanpa galat, tsc lulus).

| Asal | Isi | Dipakai untuk | Penyesuaian |
|---|---|---|---|
| `b1.tsx` DuniaRepo | panel timeline editor + Clawd membawa klip, playhead jalan | P02, P08 | kulit timeline diganti Remotion Studio asli (acuan U4); lantai repo GitHub dibuang; di atas kanvas putih |
| `b3.tsx` AppClaude + `bersama/chat/*`, `bersama/ui-asli/claude/*` | aplikasi Claude desktop, sidebar, composer, ketik, status model | P04, P08 (U1) | tema terang sesuai acuan `sumber/ref/claude-code-slash-irfan.png` (2000×1228); judul sesi netral (bukan nama proyek pribadi); tambah chip lampiran `video.mp4`, ketik prompt persis, flash saat kirim |
| `b6.tsx` DuniaIG | UI Instagram terang (header, ikon, baris komentar, avatar) | P05, P06, P09 (U2) | tata letak diubah ke beranda iOS (feed vertikal, tab bar, status bar); isi media = kartu slop SVG, bukan wajah |
| `bersama/LembarPixel`, `KarakterPixel`, `KarakterLayer` | Clawd piksel dengan pose dan emosi (depan, samping, belakang, senang, kaget) | P02, P08 (G1) | ukuran dan posisi di kanvas putih |
| `b2.tsx` Slop | stiker parodi "slop" (api, VIRAL, emoji) | P01, P05 (G2, ragam neon-thumbnail) | dicampur dengan kartu slop krem-siluet |
| `lego/blender/` + `/mnt/storage-projects/skill-dev-journey/b10a/b10a.blend` | Clawd 3D voxel di meja depan monitor (Blender 5.2, runtime `/dev/shm/b10a-blender-5.2-runtime/`) | kandidat P08 | isi monitor diganti timeline proyek ini; render ulang shot pendek |

## F. Pilihan footage (D-12, Sutradara 18 Nov)
| Adegan | File | Alasan |
|---|---|---|
| P07–P08 isi monitor editor | F6-b (Coverr, 1080p) | sinematik netral, terbaca kecil di monitor |
| P11 | F1-a (Mixkit, 720p) | layanan hangat di meja; tangan dan cangkir jadi fokus |
| P12 | F2-b (Mixkit, 1080p) | potret menatap kamera, cahaya hangat, 1080p |
| P14 ceritamu | F3-a (Commons, domain publik) | foto keluarga 1910 |
| P14 sudut pandangmu | F4-a (Mixkit, 1080p) | jendela bidik kamera tua |
| P14 hal yang cuma kamu alami | F5-b (Mixkit, 720p) | tulisan tangan di buku harian |
Footage dipakai sebagai video/foto (Remotion `OffthreadVideo`/`Img` dari `media/`), bukan dikonversi ke SVG; semua grafik di sekitarnya SVG.

## G. Pilihan footage ronde 2 (Sutradara 19 Nov; detail di media/footage/LOG.md)
| Adegan | File | Catatan lisensi |
|---|---|---|
| P07 | G4-c (Homer, murid menyalin di Louvre), G4-b (Béroud, Les copistes 1909) | domain publik (metadata Commons) |
| P11 | G1-a, G1-b, F1-a, F1-b | Mixkit Free / Restricted per LOG |
| P12 | G2-a, G2-c, G2-b, F2-b (≤ 0,5 dtk), G3-c | **G2-b, G2-c, G3-c: Mixkit Restricted (personal/nonkomersial)** — perlu diurus Irfan sebelum publikasi |
| P14 | F3-a / G5-a, F4-a, G6-a, F5-b | domain publik / Mixkit |
