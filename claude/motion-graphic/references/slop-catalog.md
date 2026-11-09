# Katalog slop (tanda yang pernah Irfan tolak)

Dipakai untuk **memindai**, bukan melarang teknik. Satu tanda dengan alasan tertulis boleh; beberapa tanda muncul bersamaan tanpa alasan = video terasa "AI". Kolom *Aturan* menunjuk teks penuh di `core-rules.md`. Pindai storyboard (gerbang 4) dan render (gerbang 11). Tanda baru dari revisi Irfan ditambah satu baris di sini.

## Audio

| ID | Tanda | Cara cek | Aturan |
|---|---|---|---|
| S-A1 | Suara sumber yang bersih jadi mendem, tipis udaranya, dinamikanya rata | `gate/voice_fidelity.py` | 38, §14.6 |
| S-A2 | Musik tidak cocok suasana (tegang/build/drop di bawah klip tenang, melankolis padahal brief tidak) atau menutupi suara (gagal: Behindwork 9 Nov) | `music_fit.py --category <k> --voice` | 45 |
| S-A3 | Backsound fade-in pelan atau hening total di tengah | RMS 0,5 dtk stem musik | 32 |
| S-A4 | Objek, teks, gerak, atau frasa subtitle tanpa SFX; video terasa sepi (gagal: V5 8 Nov, 0,15–0,27 SFX/dtk) | `gate/sfx_density.py` | 43 |
| S-A9 | Satu track musik untuk semua klip/babak; kandidat hanya dari pustaka lama | `gate/music_batch.py` (sidik jari, bukan label); `music_fit.py` pada potongan yang dipakai: ≥ 20 kandidat, ≥ 2 sumber | 25, 34 |
| S-A11 | SFX spam: whoosh > 1 per detik atau terlalu keras, file sama diulang < 1 dtk; cue tanpa peran/alasan | `gate/sfx_density.py` | 43, §14.3 |
| S-A10 | Referensi atau SFX tidak didengar (tanpa label earshot) | log `earshot describe/timeline` | gerbang DENGAR |
| S-A5 | Ketukan kayu/woodblock, felt, sinus 8-bit, whoosh noise mentah | daftar file di cue sheet | §14.5, §14.8 |
| S-A6 | Dua bunyi berlapis untuk satu event | cue sheet: satu event satu file | §14.3 |
| S-A7 | VO dipercepat atau diberi reverb | tempo 1,0; `vo_echo.py` | 33, §14.0 |
| S-A8 | SFX ada di cue sheet tapi tidak terdengar di HP (gagal: Behindwork 9 Nov, gain −33 dB) | `audio_phone.py`; gain cue −4…−10 dB setelah normalisasi puncak | 30, 35 |
| S-A12 | Whoosh di cut/ganti frame tanpa gerak cepat yang terlihat (gagal: Behindwork 9 Nov) | cue sheet: tiap whoosh menunjuk gerak (wipe, dash, sapuan, slide); cut = klik | 43, §14.3 |

## Teks

| ID | Tanda | Cara cek | Aturan |
|---|---|---|---|
| S-T1 | Caption lebih dari 2 baris, kata yatim di baris kedua, atau terpotong tepi | `gate/caption_lines.py` + still | 44 |
| S-T9 | Subtitle dihapus: ada ucapan tanpa teks di layar (gagal: Behindwork 9 Nov) | transkrip vs still per frasa | 44 |
| S-T10 | Kata tersebar tanpa urutan baca yang jelas (lompat balik ke atas/kiri) (gagal: Behindwork 9 Nov) | still per frasa: urutan kata satu arah | 46 |
| S-T11 | Kutipan ≥ 5 kata, 3 baris rata tengah di atas wajah pembicara (gagal: Behindwork 9 Nov) | still; kutipan panjang → kanvas kosong, rata kiri | 1, 46 |
| S-T12 | Teks hilang sebelum selesai dibaca/diucapkan (gagal: Behindwork 9 Nov) | durasi tiap frasa ≥ max(0,8; 0,30 + 0,06 × huruf) | 46 |
| S-T2 | Teks mengulang apa yang sudah jelas di visual ("GRAY" di atas ponsel abu) | squint test, devil's advocate | `decision-guide.md` §1 |
| S-T3 | Besar-kecil acak dalam satu baris; serif sejajar bold | still per frasa | 39 |
| S-T4 | Kotak di belakang teks yang sudah terbaca | kontras ≥ 4,5 : 1 tanpa kotak | 6 |
| S-T5 | Teks/aksen biru di latar gelap/navy | kontras luminansi | 15 |
| S-T6 | Headline di pojok kiri atas; label kecil + dua kata miring bertangga | still | 16, 20 |
| S-T7 | Tiga gaya masuk yang sama diulang (fade, pop, melebar) | teknik sama ≤ 2× berturut | `three-segment-gate.md` |
| S-T8 | Kalimat/angka di layar yang tidak diucapkan | bandingkan dengan transkrip | 2 |

## Visual dan gerak

| ID | Tanda | Cara cek | Aturan |
|---|---|---|---|
| S-V1 | Crossfade atau fade sebagai transisi | daftar transisi | 5 |
| S-V2 | Grafik vivid mengambang di atas footage yang di-blur dan digelapkan | still | `decision-guide.md` §5 |
| S-V3 | Palet pelangi; aksen di luar palet brief | `palette_check.py` | 41 |
| S-V4 | Teks besar kiri + kartu/UI kanan dengan bobot sama | squint test | 1 |
| S-V5 | UI chat/app karangan, bukan UI asli | bandingkan dengan screenshot asli | 4, 19 |
| S-V6 | Shape placeholder storyboard tampil di render | still | 16, 22 |
| S-V7 | Efek negative/RGB split ditabur tanpa event | tabel beat: efek terikat event | 24 |
| S-V8 | Format grafik berulang dengan framing sama | still berdampingan | 21 |
| S-V9 | Gradien/gaya dari satu contoh Irfan disebar ke semua frame | daftar frame yang berubah | 40 |
| S-V10 | Objek ilustrasi bertabrakan dengan teks/kartu, ikon tidak cocok dengan kata atau keluar wadahnya (gagal: Behindwork 9 Nov) | bounding box per frame sampel 10 fps; still | 46 |
| S-V11 | Video terasa datar: frame kamera identik dari awal sampai akhir, tanpa push-in pelan, punch-in/zoom-out, kamera menjelajah ilustrasi, cutout subjek (teks di belakang pembicara), motion blur di gerak cepat (Irfan Behindwork 9 Nov; perbaikan berjalan: CardClip v4 lapisan kamera + cutout RVM) | still awal vs tengah vs akhir: skala/posisi harus berubah; daftar gerak kamera per kalimat | 9, 26 |
| S-V12 | Overlay/gradien gelap muncul atau hilang mendadak (Irfan Behindwork 9 Nov) | putar 0,5×: overlay naik dari bawah (ease-in-out), turun saat keluar | 5 |
| S-V13 | Teks dan visual berjauhan/terpisah; jendela ilustrasi memotong sisi; teks diam di layar sementara footage/objek di-zoom; kamera tidak mengikuti objek fokus; logika akhir salah (kaca pembesar berhenti di X) (Irfan 9 Nov) | still per beat + cek: judul ≤ 40 px dari objeknya, teks ikut transform kamera, keyframe kamera = posisi objek fokus | aturan 47 |
| S-V14 | Ilustrasi hanya bentuk generik yang tidak menggambarkan ucapan (Irfan 9 Nov) | tabel beat: kata → makna → 3 metafora → pilihan | aturan 48 |
| S-V15 | Wajah Naval tampil saat host yang bicara (Irfan 9 Nov) | label pembicara per frasa vs shot | aturan 49 |
| S-V16 | Logo/ikon buatan sendiri yang kasar (pesawat, simpul ChatGPT); glow/segitiga keluar dari kartu (Irfan 9 Nov) | still close-up tiap ikon dan sambungan | aturan 50 |
| S-V17 | Gambar makin terlambat dari suara (lip-sync bergeser hingga ±0,5 dtk di akhir klip): tiap potongan video dibulatkan ke atas ke frame utuh sementara audio tepat, selisihnya menumpuk (Behindwork 9 Nov) | bandingkan durasi base.mp4 vs voice.wav dan posisi cut di video vs map | potong video per bagian dengan jumlah frame pas (`-frames:v` dari grid 30 fps kumulatif), audio dipotong terpisah |
