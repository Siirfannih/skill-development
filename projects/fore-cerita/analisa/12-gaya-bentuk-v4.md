# Analisa 12 — Referensi gaya tahap 2 + kritik Irfan pada storyboard v3 (28 Okt 02:09)

Referensi baru (`img/style_ref_5..8.jpg`):
5. Pria pirang bertopang dagu di tengah keramaian (grain berat, bidang warna kasar)
6. Pria menunduk di bawah lampu meja ungu, dikelilingi siluet gelap tanpa wajah
7. Wajah di spion mobil malam, bokeh lampu jalan
8. Tiga panel koridor/kelas sekolah (@dikeakbar92), cahaya pudar dan bloom

## Kritik Irfan (verbatim inti)
1. "Pada bagian tidur dan kamera pov dari atas ada jam dinding dan beberapa icon yang melayang, ini ga menggambarkan imajinasi, imajinasi itu ya dimensi yang berbeda dan biasanya berbentuk icon dream buat transisinya"
2. "Collor tone di gambar storyboard ini masih terlalu AI slop, contras gambarnya terlalu tinggi, texture dan bentuk tubuhnya terlalu rapi dan generik, warnanya terlalu tajam"
3. "yang perlu dipelajari dari refferensi itu ga cuma collor, Tone, Vibes, tapi juga bentuk character" dan "storyboard yang kamu buat lulus logic devil's advocatenya aja engga"

## Ukuran (640 px, PIL)
| Gambar | Saturasi rata-rata | Energi tepi (detail halus) |
|---|---|---|
| Ref 5 (pirang) | 153 | 9,8 |
| Ref 6 (lampu ungu) | 205 | 7,2 |
| Ref 7 (spion) | 95 | **3,3** |
| Ref 8 (dikeakbar) | 24 | 6,6 |
| **Storyboard v3** | 84 | **26,3** |

Saturasi bukan masalah utama (beberapa referensi justru jenuh). Masalahnya ada di **detail halus 3–8× lebih padat** daripada referensi: setiap benda digambar tajam, tepinya rapi, teksturnya merata. Itulah rasa "AI slop", "terlalu rapi", "terlalu tajam". **Target build: energi tepi ≤ 10 di 640 px** (dicek dengan skrip, bukan dengan perasaan).

## Bentuk tokoh
| | Ref 5 | Ref 7 | Ref 8 | v3 kita |
|---|---|---|---|---|
| Bentuk | Bidang besar bersudut, rambut 3–4 bongkah | Wajah dibangun 2–3 bidang datar bersudut tajam (cel), hidung/bibir satu garis cahaya | Bentuk lembut sederhana, tangan disederhanakan | Anatomi rapi realistis, lipatan baju detail |
| Nilai | 3–4 nilai, bayangan dominan | 2–3 nilai | 3 nilai, tinggi | gradasi halus banyak |
| Tepi | Kasar, sapuan kering | Tegas tapi sedikit | Lembut, bloom | Rapi semua |
| Ekspresi | Bosan lewat mata setengah dan topangan | Lirikan | Senyum tipis, menunduk | Generik |

**Aturan bentuk baru:** tokoh dibangun dari **bidang datar besar bersudut** (posterized cel 2–3 nilai), **bukan** anatomi halus; rambut 3–5 bongkah; tangan sederhana; baju tanpa lipatan detail; tubuh sedikit tidak proporsional/miring (lelah, membungkuk), tidak berdiri tegak sempurna.

## Tone dan tekstur
- **Kontras rendah, hitam diangkat** (ref 5, 7: hitam tidak pernah 0, ada kabut gelap); highlight diredam, tidak ada putih tajam kecuali sumber cahaya.
- **Grain film berat** di semua gambar (ref 5 paling jelas), sedikit chromatic aberration di tepi (ref 8).
- **Halation/bloom** di sekitar sumber cahaya (ref 7 lampu jalan, ref 8 jendela).
- Satu atau dua warna dominan per frame; bayangan berwarna (ungu ref 6, teal/hijau tua ref 7).

## Logika dua dunia (jawaban kritik 1)
Referensi sendiri memberi dua bahasa yang pas:
| Dunia | Bahasa visual | Ref |
|---|---|---|
| **Kenyataan** (meja Fore malam ini) | Low-key gelap hangat, bidang bersudut, grain berat, bokeh lampu | 5, 7 |
| **Bayangan / imajinasi** (dimensi lain) | Pudar terang, bloom, kontras sangat rendah, debu cahaya melayang, tepi frame memutih, sedikit chromatic aberration | 8 |
| **Rasa takut di dalam bayangan** | **Siluet gelap tanpa wajah** yang berdiri di sekeliling dan menatap (bukan ikon, bukan coretan kapur) | 6 |

**Transisi = ikon mimpi**: masuk ke bayangan lewat **gelembung mimpi** (tetes embun di gelas Fore membesar jadi gelembung, di dalamnya pagi hari) + bloom putih; keluar lewat **gelembung pecah** saat disenggol. Ikon jam dan simbol melayang dihapus.

## Devil's advocate per beat (v3 → v5)
| Beat | Serangan | Putusan v5 |
|---|---|---|
| B01 | Kenapa dia tiba-tiba melamun? | Story teman (perbandingan) memicu: jempol berhenti, matanya kosong → tetes embun gelas membesar jadi gelembung mimpi |
| B02–B03 | Kilas balik rutinitas = ingatan, apakah "dimensi lain"? | Ya, ditandai bahasa bayangan (pudar, bloom, debu cahaya) di seluruh bagian bayangan, konsisten |
| B04 | Ikon melayang bukan imajinasi (Irfan) | Langit-langit larut, kasurnya melayang di ruang kosong pudar; siluet-siluet tanpa wajah berdiri di tepi, menatap ke bawah |
| B05 | Planner + kalender: logis? | Ya: waktu berlalu, resolusi tak dicoret. Lembar kalender beterbangan di dimensi bayangan |
| B06 | Teman berlari: siapa mereka tanpa wajah? | Siluet gelap dengan atribut yang terbaca bentuknya (toga, lanyard, pasangan bergandeng) |
| B07 | Awan coretan di kepala = ikon lagi | Diganti: dua siluet mengikuti di ujung gang |
| B08–B09 | Meja pojok versi bayangan = komposisi B01 | Dipertahankan; siluet merapat mengelilingi meja |
| B10 | Senggolan: kenapa ini memecah bayangan? | Sentuhan fisik orang sungguhan → gelembung pecah → kenyataan gelap hangat; kopi tumpah ke planner |
| B11 | Kenapa perempuan itu menunjukkan planner-nya? | Ia melihat daftar yang basah, tertawa, lalu membuka planner-nya sendiri: baris yang sama. Mereka mencoretnya bersama |
| B12 | Payoff "yang ditakutkan tidak terjadi" | Orang-orang yang ikut duduk berdiri **di posisi yang sama** dengan siluet di B09: siluet takut ternyata orang hangat |

## Keputusan default (Irfan tidak di tempat)
- Perempuan: **varian rambut sebahu** (siluet lebih jelas di gaya bidang bersudut; berkerudung tetap tersedia di sheet v3 untuk versi lain).
- AI video (opsi C) **tidak dipakai**: semua gerak dari pose-to-pose 12 fps + kamera 2.5D/Three.js, karena Irfan menyebut "AI loop" masih terasa.
