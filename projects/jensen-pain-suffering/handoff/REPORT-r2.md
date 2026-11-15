# REPORT r2 (+ r2b) · Editor · jensen-pain-suffering

Lapisan teks lama dihapus. Teks sekarang dibaca dari `remotion/src/data/teks.json`, salinan persis `handoff/TEKS.json`. Engine baru: `remotion/src/engine/Teks.tsx`. Saat bundel dimuat, engine mencocokkan setiap tampil dengan `audio/words.json` lewat indeks `kata`. "it's" @33,67 (indeks 129) dilewati sesuai BRIEF. Kalau ada yang tidak cocok, render gagal.
Visual, kamera, dan material di luar yang disebut TASK tidak berubah dari r1.

- **Jumlah tampil:** 66. Di kode ada 65 id `T..` di `shots.tsx` ditambah T26 (kartu judul, `data-teks="T26"`). Jumlah entri `teks.json` = 66.
- **Satu tampil di layar pada satu waktu:** tampil muncul di `muncul`, hilang di `hilang` atau di batas shot. T66 bertahan sampai akhir, lalu gelap ke hitam di f1406–1426.
- **Masuk:** setiap tampil naik ±30 px, fade, dan blur 10 px → tajam dalam 7 f. Pada modus `kata` dan `25d` setiap kata juga masuk sendiri di onset ucapannya (6 f).
- **Still:** `qc/stills/` (32 still, skala 0,5). Draft: `qc/draft.mp4` (960×540, 1428 frame, 47,600000 dtk).

## Perbaikan F-r1 dan r2b per beat
| Beat | Dikerjakan | Bukti | Angka/gate | Menyimpang? |
|---|---|---|---|---|
| B1 | T01/T03 `tenang` di dinding kanan sejajar mata. T02/T04 `tumpuk` rata lebar 720 px ('HIGH' raksasa di atas 'EXPECTATIONS'). | B01a/b/c | balance PERIKSA (atas) | – |
| B2 | Bingkai tumbuh 62 → 72 % lebar (kamera 1,0 → 1,161 pada bingkai luar 1190 px). Teks di tengah bingkai, menimpa foto yang diredupkan (brightness 0,7). T05/T07 `kata`. T06 `skala`: 'resilience' raksasa amber 250 px, 'matters' 130 px muncul di bawahnya. | B02a/b | B02a PERIKSA, B02b ok | Lebar bingkai di still f128 terukur ±65 %, di f150 ±68 % |
| B3 | `tenang` 92 px di samping kepala. T13 'suffering' `skala` 190 px amber setelah punch-in. | B03a/b/c | ok/PERIKSA | T13 cap 12,6 % (target r2b 14–20 %): ruang dinding antara kepala yang di-punch dan safe frame tidak cukup |
| B4 | Cetakan ±42–45 % lebar (isi 780 + bingkai 2×20 pada zoom 1,0–1,06). Satu cetakan dominan per tampil. T15–T22 `kata` di bawah cetakan, rata kiri bingkai. Meja kertas diperpanjang (tidak ada tepi hitam di akhir pan). | B04a/b/c | ok | – |
| B5 | Kepala pria terukur ulang di x 710–1150 sumber. Kiri atas tidak cukup untuk 'plenty of opportunities' satu baris pada 106 px (1.209 px). Teks `kata` satu baris tepat di atas rambut (tengah, y ±60–160), push 100 → 108 % ke titik itu. Kartu SUFFERING r1. | B05a/b | ok | Ya: posisi atas-tengah, bukan kiri atas r1 (alasan lebar di atas). Push 108 % (PLAN 112 %) |
| B6a | `25d` di tengah: rotateY −12°, rotateX 6°, persp 1400. T27/T28 130 px, T29 'pain and suffering' 150 px amber. Footage diredupkan rata 38 %. | B06a/b | ok | Ukuran 'pain and suffering' 150 px (170 px menyentuh batas kanan karena perspektif) |
| B6b | `kata` di area tanpa wajah. Crop dinaikkan (y dunia 0–886) dan teks diturunkan: jarak atas glyph ±108 px ≥ 8 %, wajah teratas ±300 px. | B06c | ok | – |
| B7a | `skala` di tengah: 'Boy,' → 'this is gonna cause' → 'a lot of' (130 px) → 'pain and suffering.' 175 px amber satu blok. | B07a/b | **FAIL** berat kiri (0,75 / 0,79) | Teks di tengah sesuai Irfan. FAIL karena sisi kiri keyboard lebih terang/berdetail. Cap 'pain and suffering.' 11,6 % (tiga kata harus muat lebar) |
| B8a | `kata` di atas batang membara (120 px). T42 'refine' `skala` 290 px amber. | B08a/b/c | ok/PERIKSA | – |
| B8b | `25d` di tengah atas api (rotateY 14°), 'greatness' 150 px amber. Footage diredupkan 62 %. | B08d | ok | – |
| B9a | `skala`: 'And' 130 → 'greatness' 250 px putih (bukan kunci di TEKS). T48 `kata` tengah. | B09a/b | ok | – |
| B9b | T49 `tenang`, T50 'from / character.' `tumpuk` rata lebar 640 px. Scrim kanan dinaikkan ke 0,82. | B09c | PERIKSA | – |
| B10 | `kata` bawah tengah di atas tubuh siluet, 116 px. | B10 | ok | – |
| B11 | `kata` 90 px di dinding kanan sejajar mata. T64 digeser ke x 1010 (kepala bergerak ke kanan di 43,6 dtk). | B11, B12a | PERIKSA | 90 px (cap 64,5) karena 'Stanford students,' harus muat sebelum batas kanan |
| B12 | Kartu tanpa logo. T65 `tumpuk` 'AMPLE / DOSES' rata lebar 1100 px, tengah. T66 dua baris rata lebar 1300 px, tengah (kedua baris sama lebar, tanpa rongga). Bertahan sampai akhir, gelap ke hitam 46,9–47,5 dtk. | B12b/c | ok | – |

## Tabel modus per tampil
| ID | Teks | Modus | Baris | Ukuran font (px layar saat muncul) → cap-height |
|---|---|---|---|---|
| T01 | people with very | tenang | 1 | 92 → cap 66 |
| T02 | HIGH / EXPECTATIONS | tumpuk | 2 | HIGH ±290 → cap ±208 / EXPECTATIONS ±97 → 69; lebar baris sama (720 px) |
| T03 | have very | tenang | 1 | 92 → cap 66 |
| T04 | LOW / RESILIENCE | tumpuk | 2 | LOW ±316 → cap ±226 / RESILIENCE ±134 → 96; lebar sama (720 px) |
| T05 | unfortunately, | kata | 1 | 130 → cap 93 |
| T06 | resilience matters | skala | 1 | 250 (resilience) → cap 179 = 16,6 %; matters 130 → 93 |
| T07 | in success. | kata | 1 | 130 → cap 93 |
| T08 | I don't know | tenang | 1 | 92 → cap 66 |
| T09 | how to teach | tenang | 1 | 92 → cap 66 |
| T10 | it to you | tenang | 1 | 92 → cap 66 |
| T11 | except for | tenang | 1 | 92 → cap 66 |
| T12 | I hope | tenang | 1 | 92 → cap 66 |
| T13 | suffering | skala | 1 | 190 → cap 136 = 12,6 % |
| T14 | happens to you. | tenang | 1 | 92 → cap 66 |
| T15 | And I was fortunate | kata | 1 | 106 → cap 76 |
| T16 | that I grew up | kata | 1 | 106 → cap 76 |
| T17 | with my parents | kata | 1 | 106 → cap 76 |
| T18 | providing | kata | 1 | 106 → cap 76 |
| T19 | a condition | kata | 1 | 106 → cap 76 |
| T20 | for us | kata | 1 | 106 → cap 76 |
| T21 | to be successful | kata | 1 | 106 → cap 76 |
| T22 | on the one hand, | kata | 1 | 106 → cap 76 |
| T23 | but there were | kata | 1 | 106 → cap 76 |
| T24 | plenty of opportunities | kata | 1 | 106 → cap 76 |
| T25 | for setbacks and | kata | 1 | 106 → cap 76 |
| T26 | SUFFERING | judul | 1 | kartu judul 300 → cap 215 (r1) |
| T27 | And to this day, | 25d | 1 | 130 → cap 93 |
| T28 | I used the phrase | 25d | 1 | 130 → cap 93 |
| T29 | pain and suffering | 25d | 1 | 150 → cap 107 |
| T30 | inside our company | kata | 1 | 106 → cap 76 |
| T31 | with great glee. | kata | 1 | 106 → cap 76 |
| T32 | And I mean that. | tenang | 1 | 92 → cap 66 |
| T33 | Boy, | skala | 1 | 130 → cap 93 |
| T34 | this is gonna cause | skala | 1 | 130 → cap 93 |
| T35 | a lot of | skala | 1 | 130 → cap 93 |
| T36 | pain and suffering. | skala | 1 | 175 → cap 125 = 11,6 % |
| T37 | And I mean that | tenang | 1 | 92 → cap 66 |
| T38 | in a happy way, | tenang | 1 | 92 → cap 66 |
| T39 | Because you want | kata | 1 | 120 → cap 86 |
| T40 | to train, | kata | 1 | 120 → cap 86 |
| T41 | you want to | kata | 1 | 120 → cap 86 |
| T42 | refine | skala | 1 | 290 → cap 208 = 19,3 % |
| T43 | the character | kata | 1 | 120 → cap 86 |
| T44 | of your company. | kata | 1 | 120 → cap 86 |
| T45 | You want greatness | 25d | 1 | 150 → cap 107 |
| T46 | out of them. | 25d | 1 | 130 → cap 93 |
| T47 | And greatness | skala | 1 | And 130 → 93; greatness 250 → cap 179 = 16,6 % |
| T48 | is not intelligence, | kata | 1 | 130 → cap 93 |
| T49 | Greatness comes | tenang | 1 | 92 → cap 66 |
| T50 | from character. | tumpuk | 2 | from / character. rata lebar 640 px |
| T51 | And character | kata | 1 | 116 → cap 83 |
| T52 | isn't formed | kata | 1 | 116 → cap 83 |
| T53 | out of smart people, | kata | 1 | 116 → cap 83 |
| T54 | it's formed | kata | 1 | 116 → cap 83 |
| T55 | out of people | kata | 1 | 116 → cap 83 |
| T56 | who suffered. | kata | 1 | 116 → cap 83 |
| T57 | And so if | kata | 1 | 90 → cap 64 |
| T58 | I could wish | kata | 1 | 90 → cap 64 |
| T59 | upon you, | kata | 1 | 90 → cap 64 |
| T60 | I don't know | kata | 1 | 90 → cap 64 |
| T61 | how to do it. | kata | 1 | 90 → cap 64 |
| T62 | For all of you | kata | 1 | 90 → cap 64 |
| T63 | Stanford students, | kata | 1 | 90 → cap 64 |
| T64 | I wish upon you | kata | 1 | 90 → cap 64 |
| T65 | AMPLE / DOSES | tumpuk | 2 | AMPLE / DOSES ±338 → cap ±242; lebar sama 1100 px |
| T66 | OF PAIN AND / SUFFERING. | tumpuk | 2 | OF PAIN AND ±204 → 146 / SUFFERING. ±232 → 166; lebar sama 1300 px |

Satu baris/satu kata: 61/66 = 92 %. (T06 skala: 'resilience' raksasa tetap, 'matters' muncul kecil di bawahnya ±0,6 dtk.)

## Cek sendiri: tinggi huruf dan rasio baris
- Rumus cap-height dicek pada still: Poppins cap = 0,717 × font. B06d 'A' (font 92) terukur 66 px; B11 'S' (font 90) terukur 64 px, keduanya pada 1080p.
- Narasi b-roll: minimal 106 px → cap 76 (B4, B5a, B6b). Lainnya 116–130 px → cap 83–93. Talking head: 92 px → cap 66; B11 90 px → cap 64,5. Semua ≥ lantai 76 / 64. Push kamera sesudah muncul hanya memperbesar.
- `tumpuk`/rata lebar (T02, T04, T50, T65, T66): ukuran tiap baris dihitung supaya lebarnya sama (ukur canvas Poppins 700). Rasio baris terpendek/terpanjang = 1,00 menurut konstruksi; di still B12c kedua baris T66 terlihat sama lebar.
- Kontras: scrim linear lokal atau peredupan footage rata, tanpa kotak (A9).

## Gate (keluaran apa adanya)
`python3 claude/motion-graphic/scripts/juri/teks_cek.py qc/stills`
```
still dicek: 32
TIDAK ADA TANDA
exit 0
```

`python3 claude/motion-graphic/scripts/juri/balance_check.py qc/stills`
```
PERIKSA B01a.png                     kiri 0.54 kanan 0.46 · atas 0.90 bawah 0.10 · pusat (0.45, 0.36)
PERIKSA B01b.png                     kiri 0.55 kanan 0.45 · atas 0.89 bawah 0.11 · pusat (0.44, 0.32)
PERIKSA B01c.png                     kiri 0.46 kanan 0.54 · atas 0.87 bawah 0.13 · pusat (0.48, 0.38)
PERIKSA B02a.png                     kiri 0.51 kanan 0.49 · atas 0.81 bawah 0.19 · pusat (0.50, 0.40)
ok      B02b.png                     kiri 0.40 kanan 0.60 · atas 0.38 bawah 0.62 · pusat (0.52, 0.48)
PERIKSA B03a.png                     kiri 0.57 kanan 0.43 · atas 0.89 bawah 0.11 · pusat (0.43, 0.36)
ok      B03b.png                     kiri 0.49 kanan 0.51 · atas 0.75 bawah 0.25 · pusat (0.49, 0.44)
ok      B03c.png                     kiri 0.48 kanan 0.52 · atas 0.77 bawah 0.23 · pusat (0.48, 0.45)
ok      B04a.png                     kiri 0.63 kanan 0.37 · atas 0.32 bawah 0.68 · pusat (0.46, 0.52)
ok      B04b.png                     kiri 0.57 kanan 0.43 · atas 0.41 bawah 0.59 · pusat (0.46, 0.51)
ok      B04c.png                     kiri 0.50 kanan 0.50 · atas 0.63 bawah 0.37 · pusat (0.50, 0.43)
ok      B05a.png                     kiri 0.38 kanan 0.62 · atas 0.32 bawah 0.68 · pusat (0.60, 0.59)
ok      B05b.png                     kiri 0.45 kanan 0.55 · atas 0.49 bawah 0.51 · pusat (0.53, 0.50)
ok      B06a.png                     kiri 0.61 kanan 0.39 · atas 0.43 bawah 0.57 · pusat (0.44, 0.52)
ok      B06b.png                     kiri 0.42 kanan 0.58 · atas 0.63 bawah 0.37 · pusat (0.53, 0.41)
ok      B06c.png                     kiri 0.51 kanan 0.49 · atas 0.62 bawah 0.38 · pusat (0.48, 0.40)
PERIKSA B06d.png                     kiri 0.58 kanan 0.42 · atas 0.84 bawah 0.16 · pusat (0.44, 0.37)
FAIL    B07a.png                     kiri 0.75 kanan 0.25 · atas 0.26 bawah 0.74 · pusat (0.32, 0.61)  ← berat kiri
FAIL    B07b.png                     kiri 0.79 kanan 0.21 · atas 0.38 bawah 0.62 · pusat (0.40, 0.54)  ← berat kiri
PERIKSA B07c.png                     kiri 0.45 kanan 0.55 · atas 0.90 bawah 0.10 · pusat (0.48, 0.36)
ok      B08a.png                     kiri 0.45 kanan 0.55 · atas 0.74 bawah 0.26 · pusat (0.51, 0.37)
PERIKSA B08b.png                     kiri 0.68 kanan 0.32 · atas 0.82 bawah 0.18 · pusat (0.47, 0.33)
ok      B08c.png                     kiri 0.70 kanan 0.30 · atas 0.78 bawah 0.22 · pusat (0.42, 0.36)
ok      B08d.png                     kiri 0.69 kanan 0.31 · atas 0.67 bawah 0.33 · pusat (0.40, 0.46)
ok      B09a.png                     kiri 0.48 kanan 0.52 · atas 0.64 bawah 0.36 · pusat (0.49, 0.36)
ok      B09b.png                     kiri 0.53 kanan 0.47 · atas 0.64 bawah 0.36 · pusat (0.46, 0.37)
PERIKSA B09c.png                     kiri 0.68 kanan 0.32 · atas 0.80 bawah 0.20 · pusat (0.37, 0.35)
ok      B10.png                      kiri 0.46 kanan 0.54 · atas 0.43 bawah 0.57 · pusat (0.51, 0.47)
PERIKSA B11.png                      kiri 0.43 kanan 0.57 · atas 0.93 bawah 0.07 · pusat (0.56, 0.30)
PERIKSA B12a.png                     kiri 0.45 kanan 0.55 · atas 0.93 bawah 0.07 · pusat (0.51, 0.31)
ok      B12b.png                     kiri 0.50 kanan 0.50 · atas 0.49 bawah 0.51 · pusat (0.50, 0.51)
ok      B12c.png                     kiri 0.50 kanan 0.50 · atas 0.50 bawah 0.50 · pusat (0.50, 0.48)
lembar 25 %/50 %: /home/irfan/work/skill-development/projects/jensen-pain-suffering/qc/stills/balance_sheet.jpg
FAIL: 2 frame berat sebelah
exit 1
```

Draft: `render.sh … draft Main` → `qc/draft.mp4`. ffprobe: 960×540, nb_frames 1428, durasi 47,600000 dtk. Satu render, jalan sendiri; proses lain tidak dihentikan.

## Catatan
- `stres.mp4` yang dipakai sumbernya sudah diskalakan ke 1920; push di B5 maksimal 108 %, jadi tidak terlalu lembek.
- Disk: `public` ±100 MB, `.bundle` ±106 MB.

## r3 kecil (B5 saja)
- T23–T25: `sy` 44 → 82 (px layar saat muncul), posisi lain tetap. Pada still B05a (f510), piksel teks teratas (puncak ascender 'l/t/f') ada di y 86 px; garis kapital ±y 90 px = 8,3 % tinggi frame (≥ 8 %). Descender terbawah di y 196 px. Teks sedikit menimpa ujung rambut.
- Still: `qc/stills/B05a.png`. Draft rentang: `qc/draft_458-560.mp4` (103 frame, 3,43 dtk).
- Beat lain tidak diubah. Karena `src` berubah, still selain B05a sekarang lebih tua dari src. Gerbang `final` render.sh meminta semua still dirender ulang dulu.
