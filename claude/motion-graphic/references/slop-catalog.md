# Katalog slop (tanda yang pernah Irfan tolak)

Dipakai untuk **memindai**, bukan melarang teknik. Satu tanda dengan alasan tertulis boleh; beberapa tanda muncul bersamaan tanpa alasan = video terasa "AI". Kolom *Lantai* menunjuk butir di `LANTAI.md`. Pindai storyboard (tahap Storyboard/block out) dan render (preview + QA, tahap Mix → Deliver). Tanda baru dari revisi Irfan ditambah satu baris di sini.

## Audio

| ID | Tanda | Cara cek | Lantai |
|---|---|---|---|
| S-A1 | Suara sumber yang bersih jadi mendem, tipis udaranya, dinamikanya rata | `gate/voice_fidelity.py` | Lantai E25a, §14.6 |
| S-A2 | Musik tidak cocok suasana (tegang/build/drop di bawah klip tenang, melankolis padahal brief tidak) atau menutupi suara | `music_fit.py --category <k> --voice` | Lantai E25 |
| S-A3 | Backsound fade-in pelan atau hening total di tengah | RMS 0,5 dtk stem musik | Lantai E25 |
| S-A4 | Objek, teks, gerak, atau frasa subtitle tanpa SFX; video terasa sepi | `gate/sfx_density.py` | Lantai E24 |
| S-A9 | Satu track musik untuk semua klip/babak; kandidat hanya dari pustaka lama | `gate/music_batch.py` (sidik jari, bukan label); `music_fit.py` pada potongan yang dipakai: ≥ 20 kandidat, ≥ 2 sumber | Lantai E25, Lantai E24 |
| S-A11 | SFX spam: whoosh > 1 per detik atau terlalu keras, file sama diulang < 1 dtk; cue tanpa peran/alasan | `gate/sfx_density.py` | Lantai E24, §14.3 |
| S-A10 | Referensi atau SFX tidak didengar (tanpa label earshot) | log `earshot describe/timeline` | gerbang DENGAR |
| S-A5 | Ketukan kayu/woodblock, felt, sinus 8-bit, whoosh noise mentah | daftar file di cue sheet | §14.5, §14.8 |
| S-A6 | Dua bunyi berlapis untuk satu event | cue sheet: satu event satu file | §14.3 |
| S-A7 | VO dipercepat atau diberi reverb | tempo 1,0; `vo_echo.py` | Lantai E23, §14.0 |
| S-A8 | SFX ada di cue sheet tapi tidak terdengar di HP | `audio_phone.py`; gain cue −4…−10 dB setelah normalisasi puncak | Lantai E25a |
| S-A12 | Whoosh di cut/ganti frame tanpa gerak cepat yang terlihat | cue sheet: tiap whoosh menunjuk gerak (wipe, dash, sapuan, slide); cut = klik | Lantai E24, §14.3 |

## Teks

| ID | Tanda | Cara cek | Lantai |
|---|---|---|---|
| S-T1 | Caption lebih dari 2 baris, kata yatim di baris kedua, atau terpotong tepi | `gate/caption_lines.py` + still | Lantai A1 |
| S-T9 | Subtitle dihapus: ada ucapan tanpa teks di layar | transkrip vs still per frasa | Lantai A1 |
| S-T10 | Kata tersebar tanpa urutan baca yang jelas (lompat balik ke atas/kiri) | still per frasa: urutan kata satu arah | Lantai A8 |
| S-T11 | Kutipan ≥ 5 kata, 3 baris rata tengah di atas wajah pembicara | still; kutipan panjang → kanvas kosong, rata kiri | Lantai C14, Lantai A8 |
| S-T12 | Teks hilang sebelum selesai dibaca/diucapkan | durasi tiap frasa ≥ max(0,8; 0,30 + 0,06 × huruf) | Lantai A8 |
| S-T13 | Kinetic typography satu gaya sepanjang video: font, ukuran, posisi, dan animasi masuk sama untuk semua kata | daftar kata kinetik + kode T per kata: ≥ 4 teknik per 15 dtk, teknik sama ≤ 2× berturut, posisi ikut objek | `typography.md` §8 |
| S-T2 | Teks mengulang apa yang sudah jelas di visual ("GRAY" di atas ponsel abu) | squint test, devil's advocate | `decision-guide.md` §1 |
| S-T3 | Besar-kecil acak dalam satu baris; serif sejajar bold | still per frasa | Lantai A6 |
| S-T4 | Kotak di belakang teks yang sudah terbaca | kontras ≥ 4,5 : 1 tanpa kotak | Lantai A9 |
| S-T5 | Teks/aksen biru di latar gelap/navy | kontras luminansi | Lantai A7 |
| S-T6 | Headline di pojok kiri atas; label kecil + dua kata miring bertangga | still | Lantai D19c, Lantai C14 |
| S-T7 | Tiga gaya masuk yang sama diulang (fade, pop, melebar) | teknik sama ≤ 2× berturut | `three-segment-gate.md` |
| S-T8 | Kalimat/angka di layar yang tidak diucapkan | bandingkan dengan transkrip | Lantai A5 |

## Visual dan gerak

| ID | Tanda | Cara cek | Lantai |
|---|---|---|---|
| S-V1 | Crossfade atau fade sebagai transisi | daftar transisi | Lantai B13 |
| S-V2 | Grafik vivid mengambang di atas footage yang di-blur dan digelapkan | still | `decision-guide.md` §5 |
| S-V3 | Palet pelangi; aksen di luar palet brief | `palette_check.py` | Lantai C18a |
| S-V4 | Teks besar kiri + kartu/UI kanan dengan bobot sama | squint test | Lantai C14 |
| S-V5 | UI chat/app karangan, bukan UI asli | bandingkan dengan screenshot asli | Lantai D20 |
| S-V6 | Shape placeholder storyboard tampil di render | still | Lantai D19c, Lantai D22 |
| S-V7 | Efek negative/RGB split ditabur tanpa event | tabel beat: efek terikat event | Lantai C18b |
| S-V8 | Format grafik berulang dengan framing sama | still berdampingan | Lantai B13b |
| S-V9 | Gradien/gaya dari satu contoh Irfan disebar ke semua frame | daftar frame yang berubah | Lantai F28b |
| S-V10 | Objek ilustrasi bertabrakan dengan teks/kartu, ikon tidak cocok dengan kata atau keluar wadahnya | bounding box per frame sampel 10 fps; still | Lantai A8 |
| S-V11 | Video terasa datar: frame kamera identik dari awal sampai akhir, tanpa push-in pelan, punch-in/zoom-out, kamera menjelajah ilustrasi, cutout subjek (teks di belakang pembicara), motion blur di gerak cepat | still awal vs tengah vs akhir: skala/posisi harus berubah; daftar gerak kamera per kalimat | Lantai B13, Lantai B10 |
| S-V12 | Overlay/gradien gelap muncul atau hilang mendadak | putar 0,5×: overlay naik dari bawah (ease-in-out), turun saat keluar | Lantai B13 |
| S-V13 | Teks dan visual berjauhan/terpisah; jendela ilustrasi memotong sisi; teks diam di layar sementara footage/objek di-zoom; kamera tidak mengikuti objek fokus; logika akhir salah (kaca pembesar berhenti di X) | still per beat + cek: judul ≤ 40 px dari objeknya, teks ikut transform kamera, keyframe kamera = posisi objek fokus | Lantai B12 |
| S-V14 | Ilustrasi hanya bentuk generik yang tidak menggambarkan ucapan | tabel beat: kata → makna → 3 metafora → pilihan | Lantai D19 |
| S-V15 | Wajah Naval tampil saat host yang bicara | label pembicara per frasa vs shot | Lantai D21 |
| S-V16 | Logo/ikon buatan sendiri yang kasar (pesawat, simpul ChatGPT); glow/segitiga keluar dari kartu | still close-up tiap ikon dan sambungan | Lantai D20 |
| S-V17 | Gambar makin terlambat dari suara (lip-sync bergeser hingga ±0,5 dtk di akhir klip): tiap potongan video dibulatkan ke atas ke frame utuh sementara audio tepat, selisihnya menumpuk | bandingkan durasi base.mp4 vs voice.wav dan posisi cut di video vs map | potong video per bagian dengan jumlah frame pas (`-frames:v` dari grid 30 fps kumulatif), audio dipotong terpisah |
| S-V18 | Vignette/lingkaran gelap di atas latar putih/terang | still adegan terang: tepi tidak lebih gelap dari tengah | palette.md |
| S-V19 | Kombinasi coklat + hitam sebagai palet dasar terasa murah | `palette_check.py`, still | palette.md |
| S-V20 | Screenshot UI ditempel sebagai gambar diam, bukan UI kode yang dianimasikan | daftar aset: tidak ada PNG UI di adegan | Lantai D20 |
| S-V21 | Latar radial gradient / blob blur berwarna, atau gradient biru di banyak adegan | grep `radial-gradient` di kode; hitung adegan bergradient | palette.md, Lantai F28b |
| S-V22 | Palet dikarang dari referensi padahal brand/`palettes.json` sudah ada | brief menyebut palet dari `palettes.json` + bukti `palette_check.py` | palette.md §1 |
| S-V23 | Objek/teks di red zone tepi frame (luar x 165–1755, y 140–935 @1080p) tanpa alasan kamera | still per beat dengan overlay safe frame | storyboard.md §3 |
| S-V24 | Visual hanya simbol/kata besar, bukan aksi harfiah kalimat (contoh benar: "kecanduan" = terus membuat repo baru tanpa release; "tidak mempublikasikan" = ketik di Threads lalu simpan ke draft) | tabel beat: kalimat → aksi yang terlihat | Lantai D19 |
