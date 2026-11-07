# Storyboard v4 · Motion "Semudah chat sama ayang" (Trojan horse, 60 dtk)

Status: STORYBOARD v4 · disetujui untuk build setelah review Irfan 7 Nov ("ayang" sesuai; naskah teks layar = naskah VO, sudah disesuaikan Irfan agar mengalir dibaca VO) · menggantikan v3
Arah Irfan 7 Nov: 60 dtk; hook kembali ke masalah pencatatan administrasi bisnis tapi dibuat relate untuk non-UMKM; **struktur Baikov** (pembuka pertanyaan "gimana kalau…" yang dibalik ke penonton → realita → produk → UI → selesai → logo); **gaya visual & motion dari 08 (Mosycreate) dan 09 (thekrishray)**: komponen UI datar, kata diketik, transisi; warna dan ikon ikut brand (lihat Standar visual), bukan shape Baikov.

## Trojan horse
| Bagian | Beat | Untuk siapa |
|---|---|---|
| Hook analogi chat sama ayang + realita ribet nyatet | 1–3 | semua orang yang pernah jualan / mau jualan, termasuk mahasiswa dan teman |
| Produk, laporan, stok & cabang, gratis | 4–7 | yang baru mulai sampai pemilik usaha |
| Jasa kreatif + portofolio | 8 | pemilik usaha (sumber uang) |
| CTA dua jalur + kredit | 9–10 | akses gratis / paket kreatif |

Format A motion · master 1920×1080 30 fps (versi 9:16 reframe) · 183 kata; VO alami ±83 dtk (DECISIONS D3, VO tidak dipercepat) · **VO = suara narator Jadisatu yang sama dengan The Gap (`jadisatu-60s`) dan video personal kedua (`ai-change-everything`)**: ElevenLabs voice `1I8tElkHzrblGqkJtwn3` ("Jadisatu Narrator V3"), model `eleven_v4` (`tools/ELEVENLABS.md`, `el_tts.py` kedua proyek). Tanpa baris subtitle (Irfan 7 Nov): teks hanya bagian visual (kata besar, isi chat, label UI), VO membawa kalimatnya. VO tidak pernah dipercepat; jeda dipadatkan lewat `tighten.py`. Kata Inggris ditulis dalam kutip agar dibaca Inggris ("Workspace", "Excel", "Google") (aturan inti 21) · audio kategori `energi`, musik ±110–120 bpm, satu bunyi per aksi UI (ala 09) · latar putih + biru brand sebagai satu-satunya aksen (lihat Standar visual) · UI produk dari `jadisatu-partner/apps/portal` di Remotion · WhatsApp dibangun mengikuti tampilan asli (gelembung hijau, wallpaper krem, centang biru; pengecualian palet brand, Irfan 7 Nov) · ikon garis datar satu set, biru atau tinta.

| # | Waktu | Bagian | Teks layar / VO (persis) | Visual | SFX |
|---|---|---|---|---|---|
| 1 | 0:00–0:04 | Hook | Gimana kalau nyatet keuangan usaha itu semudah chattingan sama ayang di WhatsApp? | **Struktur Baikov (pertanyaan dibalik ke penonton), visual ala 09**: kalimat dibangun kata per kata di tengah; di "semudah chattingan" hanya dua kata itu; di "sama ayang" frame langsung jadi ruang chat WhatsApp layar penuh, kamu mengirim "udah makan belum? 🥺", ayang menjawab "udah dong" di kata "WhatsApp". Hook murni obrolan, tanpa transaksi (Irfan 7 Nov) | pop per kata kunci, ding notif chat |
| 2 | 0:04–0:12 | Realita | Soalnya selama ini nyatet itu ribet, ada yang di buku, di Excel, ujung-ujungnya uang di laci nggak cocok sama catatannya. | **Orbit ikon ala 09**: ikon buku, Excel, laci uang berputar mengelilingi satu kata kecil di tengah ("ribet"); di "nggak cocok" angka di catatan yang berbeda dengan angka di laci menyala beda warna lalu bergetar | rustle kertas, klik, tick tiap ikon, satu buzz di "nggak cocok" |
| 3 | 0:12–0:17 | Semua orang | Mau baru jualan kecil-kecilan atau udah punya toko, masalahnya sama, dan karena ribet, akhirnya nggak dicatat. | **Kartu karakter ala referensi pilihan avatar (Irfan 7 Nov)**: tiga ilustrasi orang, lapak kecil, titip jualan, punya toko; kartu bergeser kiri ke kanan, ketiganya berakhir dengan ikon buku yang sama | whoosh antar kartu, pop di tiap ikon buku |
| 4 | 0:17–0:29 | Produk | Makanya di Jadisatu Workspace kamu cukup chat kayak biasa, misalnya jual dua belas risol enam puluh ribu atau beli gas dua puluh lima ribu, dan itu langsung kecatat jadi pemasukan dan pengeluaran. | **Ruang chat yang sama dengan hook, kontaknya Jadisatu (Irfan 7 Nov)**: pesan diketik mengikuti VO dan terkirim, balasan "tercatat"; pesan kedua "beli gas 25rb" → label kategori; dua bubble terbang ke dua kolom Pemasukan/Pengeluaran | ketik iPhone per kata, kirim, notif, pop label |
| 5 | 0:29–0:33 | Laporan | Terus semua catatan itu otomatis jadi laporan dan dikirim langsung ke WhatsApp-mu. | **Urutan mengikuti VO (Irfan 7 Nov)**: baris catatan menyatu jadi satu kartu laporan di kata "laporan" → di "dikirim" kartu mendarat di thread WhatsApp yang sama, jam 18.00 → link diketuk, **dasbor UI asli Workspace lahir bertahap (BK07)** tepat saat VO menyebut "Workspace" di awal beat 6 | jam tick, notif WA, tap, pop per widget |
| 6 | 0:33–0:43 | Stok & cabang | Workspace juga bisa ngitung kapan stokmu habis dan berapa yang perlu dibeli, kalau nanti buka cabang tinggal tambahin cabangnya biar bisa dipantau dari satu akun. | **Kalender ala 09** menyorot tanggal stok habis, kartu saran belanja muncul; lalu **chip ala 09**: kursor menekan "+ Tambah cabang", chip Cabang 1 · 2 · 3 muncul berderet di satu akun yang sama | tick tanggal, ding saran, klik per chip |
| 7 | 0:43–0:47 | Gratis | Buat kamu yang baru mulai usaha kecil-kecilan, bisa cobain Workspace ini secara gratis. | **Slider harga ala 09** "− Rp … +" digeser ke Rp0, kartu "Gratis" biru solid, teks putih | tick slider, lock |
| 8 | 0:47–0:59 | Jasa kreatif | Kalau bisnismu udah jalan tapi belum maksimal, kami bisa bantu turun tangan untuk kelola sosial media, bikinin kamu website usaha, optimasi Google Bisnis, sampai bantuin kamu set up Workspace biar tinggal pakai. | **Carousel platform ala 09**: Instagram → website → Google Bisnis → Workspace; tiap klik panah membuka **peragaan layanan** layar penuh 2–3 dtk untuk satu usaha contoh fiktif yang sama (lihat "Beat 8: peragaan layanan" di bawah); kartu terakhir: dasbor Workspace usaha itu, sudah terisi, label "siap pakai" | klik panah per platform, whoosh antar layanan, pop tiap foto, ding di "siap pakai" |
| 9 | 0:59–1:04 | CTA | Jadi, komen workspace buat dapet akses gratis, atau DM kami buat paket kreatifnya. | **Kolom komentar lalu DM Instagram (Irfan 7 Nov)**: komen "workspace" terkirim, DM dari Jadisatu langsung masuk sampai link akses; di "DM kami" user bertanya soal paket kreatif di DM yang sama | klik chip |
| 10 | 1:04–1:07 | Kredit | Oh iya, video ini juga kami yang bikin. | **Kredit ala 08** (MADE BY A HUMAN): layar gelap, kalimat kecil, logo Jadisatu; bubble "udah makan belum? 🥺" dari pembuka kembali kecil di samping logo (BK10) | resolve musik, satu ding |

## Catatan alur laporan
User mencatat lewat WhatsApp, dan laporan dikirim balik ke chat yang sama: laporan harian otomatis pukul 18.00 (bisa diubah owner) dan link laporan kapan diminta (`jadisatu-partner/agents/account-manager/SOUL.md`, `WS3-portal.md`). Perlu konfirmasi Irfan: laporan harian otomatis juga berlaku untuk akun gratis?

## Mandat jalan otomatis sampai final (Irfan 7 Nov 01:46)
Irfan: "Aku akan biarkan worker bekerja sampai pagi dan aku periksa hasil finalnya nanti, pastikan tidak ada kesalahan atau memerlukan persetujuanku lagi ditengah tengah pekerjaan, terkait biaya API elevenlabs udah aku hitung dan sudah dibudgeting."
- **Naskah dan storyboard sudah final.** Gerbang 2 dan 4 dianggap lolos; tidak menunggu kata "final" lagi.
- **Biaya ElevenLabs (VO, musik, SFX) sudah disetujui dan dibudgetkan.** Catat kredit yang terpakai di laporan, tanpa berhenti untuk minta izin.
- **Keputusan yang sudah diambil untuk hal yang masih terbuka**, catat di laporan, jangan berhenti:
  - beat 5: laporan harian otomatis pukul 18.00 (dokumen `jadisatu-partner/agents/account-manager/SOUL.md`);
  - beat 8: belum ada karya klien nyata (Irfan 7 Nov), jadi tampil sebagai peragaan layanan untuk usaha contoh fiktif, mengikuti bagian "Beat 8: peragaan layanan";
  - SFX: urutan sumber `SFXIrfan` di mesin kerja → `projects/jadisatu-60s/remotion/sfx-el` (palet The Gap yang sudah lulus) → ElevenLabs SFX; tidak berhenti untuk menanyakan path;
  - musik: ElevenLabs Music atau stok, dipilih dengan `music_fit.py` kategori `energi`.
- **Yang tetap berhenti** (aturan mutlak): akses repo/kredensial benar-benar tidak tersedia, atau sesuatu yang tidak bisa dibatalkan di luar proyek (posting ke akun, deploy). Selain itu putuskan sendiri lewat skill, tulis alasannya satu baris.
- Proses panjang (render, earshot) dijalankan di latar belakang; simpan progres dan commit ke `main` berkala.
- Hasil akhir: MP4 1920×1080 + laporan Delivery Gate berbukti + daftar keputusan yang diambil sendiri + kredit terpakai.

## Standar visual & build (Irfan 7 Nov: "kualitas atau style yang mirip referensi, bukan renderan three.js mentah"; revisi 09:56: "collor Brand video kita adalah White, Biru sebagai icon dan beberapa tampilan dan kita ga punya permintaan 3d ke semua bagian termasuk efek glasses berwarna biru")
- **Palet brand**: putih `#FFFFFF` / stage `#F4F5F7` sebagai latar, tinta `#0F172A` untuk teks, biru `#2563EB` (gelap `#1D4ED8`) satu-satunya aksen untuk ikon, tombol, dan sebagian tampilan; garis `#E6E8EC`, teks redup `#5B6475` (token `jadisatu-partner/apps/portal/src/index.css`). Hijau/merah hanya di angka naik/turun dashboard. Variasi latar yang boleh: putih polos, biru solid layar penuh (07 Baikov), hitam untuk kredit (08).
- **Flat 2D**: ikon garis/solid satu warna (biru atau tinta), bukan emoji 3D; tidak ada glassmorphism, blur latar, gumpalan gradien biru, atau kartu bercahaya. Bayangan cukup tipis abu netral. Emoji hanya sebagai isi teks chat (🥺 di bubble pembuka).
- Acuan rasa yang diambil dari referensi: 07 Baikov (blok biru solid, UI produk sebagai pahlawan, foto kecil persegi), 08 Mosycreate (UI asli di latar putih/abu, kalimat kecil, kredit hitam), 09 thekrishray (komponen UI datar gaya iOS, kata diketik, blur gerak hanya saat perpindahan). Bukan diambil: emoji 3D, bintang, gradien warna-warni.
- **Tidak ada render three.js mentah** sebagai visual akhir. Semua dibangun di Remotion dengan React/CSS/SVG: komponen UI asli dari `jadisatu-partner/apps/portal`, tampilan WhatsApp dibangun ulang per elemen, motion blur di gerak cepat.
- Logo platform asli hanya untuk platform yang disebut (Instagram, WhatsApp, Google), dalam warna resminya dan ukuran kecil.
- Gerbang sebelum build penuh (`motion-graphic/references/delivery-gate.md` §0): still per beat diletakkan berdampingan dengan frame referensi 08/09 setara; bila still kalah rapi, perbaiki dulu, baru render.
- Delivery Gate + `music_fit.py` (kategori `energi`).

## Beat 8: peragaan layanan (Irfan 7 Nov: "Kita belum ada karya nyata jadi … bikin visual animationnya juga kayak dumy … kalau Google Bisnis kan tinggal dibikin Visual tampilan Google bisnis asli terus bikin seolah olah kita lagi manage akun bisnisnya")
- **Satu usaha contoh fiktif sepanjang beat**: "Risol Bu Sari" (menyambung contoh risol di beat 4). Instagram, website, Google Bisnis, dan dasbor Workspace semuanya milik usaha ini, jadi penonton melihat satu usaha dirapikan dari ujung ke ujung, bukan empat potongan acak.
- **Gaya komposisi**: acuan `claude/motion-graphic/guide/referensi/sheets/10–13` (kartu UI di tengah, foto-foto berbingkai membulat melayang di sekeliling dengan ukuran berbeda sebagai kedalaman, latar putih polos, banyak ruang kosong). Foto masuk dengan pop berurutan, kamera drift pelan, bukan semua sekaligus.
- **Instagram**: profil IG dibangun ulang per elemen (header, highlight, grid 3 kolom); grid terisi postingan satu per satu seperti sedang dijadwalkan; satu postingan dibuka, caption diketik.
- **Website**: website F&B yang terlihat jadi, mengikuti rasa referensi Irfan 7 Nov: hero gelap, menu pre-order dengan foto dan harga contoh, tombol "Pesan via WhatsApp"; halaman digulir, bukan section kosong.
- **Google Bisnis**: panel profil bisnis Google dibangun ulang per elemen (tata letak dan warna mengikuti tampilan asli, logo Google boleh karena platform disebut). Aksi "sedang dikelola": kursor mengubah jam buka, mengunggah foto, menulis postingan update, mengetik balasan ulasan.
- **Foto**: foto stok berlisensi bebas (Unsplash/Pexels license) bertema usaha makanan rumahan dan UMKM lain (kopi, laundry, kelontong) untuk tile yang melayang; tanpa logo merek nyata dan tanpa wajah yang jadi fokus. Catat sumber tiap foto di `CREDITS.md` proyek. Bila unduhan tidak bisa, pakai tile putih/abu muda dengan ikon garis biru per industri.
- **Batas kejujuran**: nama usaha, ulasan, dan isi postingan fiktif; tidak ada angka hasil (rating naik, followers bertambah, omzet), tidak ada bintang/jumlah ulasan sebagai pencapaian, tidak ada nama usaha atau klien nyata. VO menawarkan bantuan ("kami bisa bantu"), visual memperagakan pekerjaannya, bukan membuktikan hasil.

## Syarat
- Beat 8 = peragaan layanan dengan usaha contoh fiktif (bagian di atas); begitu ada karya klien nyata, ganti dengan karya itu. Orang di beat 3 berupa karakter ilustrasi datar, bukan foto orang sungguhan.
- Fakta: catat lewat WA + kategori, laporan via WA, forecast stok + saran beli, akun per cabang, gratis untuk yang baru mulai, bundling (`script-workshop/guide/produk/FAKTA.md`).

## Terbuka untuk Irfan
1. Laporan harian otomatis 18.00 untuk akun gratis (beat 5); bila belum, visual diganti user meminta "laporan hari ini".
