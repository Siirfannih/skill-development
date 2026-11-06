# Katalog slop (tanda yang pernah Irfan tolak)

Dipakai untuk **memindai**, bukan melarang teknik. Satu tanda dengan alasan tertulis boleh; beberapa tanda muncul bersamaan tanpa alasan = video terasa "AI". Kolom *Aturan* menunjuk teks penuh di `core-rules.md`. Pindai storyboard (gerbang 4) dan render (gerbang 9). Tanda baru dari revisi Irfan ditambah satu baris di sini.

## Audio

| ID | Tanda | Cara cek | Aturan |
|---|---|---|---|
| S-A1 | Suara pembicara asli mendem, tipis udaranya, dinamikanya rata | `gate/voice_fidelity.py` | 43, 38 |
| S-A2 | Musik tegang/build/drop di bawah klip yang tenang | dengar bed di jeda; bandingkan dengan nada klip | `formats.md` |
| S-A3 | Backsound fade-in pelan atau hening total di tengah | RMS 0,5 dtk stem musik | 32 |
| S-A4 | SFX di setiap caption/kata biasa | cue sheet: caption tidak berbunyi | §14.3 |
| S-A5 | Ketukan kayu/woodblock, felt, sinus 8-bit, whoosh noise mentah | daftar file di cue sheet | §14.5, §14.8 |
| S-A6 | Dua bunyi berlapis untuk satu event | cue sheet: satu event satu file | §14.3 |
| S-A7 | VO dipercepat atau diberi reverb | tempo 1,0; `vo_echo.py` | 33, §14.0 |
| S-A8 | SFX ada di cue sheet tapi tidak terdengar di HP | `audio_phone.py` | 30, 35 |

## Teks

| ID | Tanda | Cara cek | Aturan |
|---|---|---|---|
| S-T1 | Caption dua baris, kata yatim di baris kedua, atau terpotong tepi | `gate/caption_lines.py` + still | 44 |
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
