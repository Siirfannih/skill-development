# REPORT r6 · Editor · jensen-pain-suffering (perbaikan audit frame, diff)

Draft: `qc/draft.mp4`, 960×540, 1428 frame, 47,600 dtk. Still: `qc/stills/` (38 still). Selain set r5, ada B06e f596 'phrase', B08e f822 'Because', B08f f935 percik, dan B11b f1290 sub-shot kepala kanan.

## 1. Jangkar teks talking head mengikuti kepala
- `wajah.mp4` (sumber) ternyata tidak punya pergantian kamera. Scene detect: skor maksimum 0,068; beda frame maksimum 10,8 (p99 4,1). "Framing lebih ketat" di f1283–1298 adalah Jensen yang mencondongkan badan ke kanan, sehingga tepi kanan kepala bergeser dari 0,578 ke 0,637 lebar sumber.
- Karena itu sub-shot ditentukan per tampil. Kepala dilacak di setiap frame (bbox rambut + kulit pada bagian atas frame, garis putih diagonal dibuang; OpenCV di mg-venv). Untuk setiap tampil diambil tepi kanan kepala **maksimum** selama tampil itu ada (termasuk 2 f masuk dan 2 f keluar). Hasilnya di `remotion/src/data/head.json`.
- Teks mulai di tepi kanan kepala (di layar, pada pose kamera saat muncul) **+ 80 px**: ≥ 4 % lebar (77 px) dan ≤ 8 % tinggi (86 px). Teks tetap terkunci di dunia selama tampil.

| Tampil | Frame | Tepi kanan kepala sumber (min–maks) | Jangkar dunia (px) | Crop |
|---|---|---|---|---|
| T01 people with very | 0–38 | 0.588–0.609 | 807 | A |
| T02 HIGH / EXPECTATIONS | 34–57 | 0.584–0.600 | 780 | A |
| T03 have very | 53–73 | 0.584–0.594 | 762 | A |
| T04 LOW / RESILIENCE | 69–104 | 0.575–0.594 | 762 | A |
| T08 I don't know | 183–197 | 0.591–0.600 | 780 | A |
| T09 how to teach | 193–210 | 0.591–0.600 | 780 | A |
| T10 it to you | 206–222 | 0.591–0.597 | 770 | A |
| T11 except for | 218–236 | 0.584–0.594 | 762 | A |
| T12 I hope | 232–247 | 0.584–0.597 | 770 | A |
| T13 suffering | 243–257 | 0.591–0.594 | 762 | A |
| T14 happens to you. | 253–275 | 0.588–0.597 | 770 | A |
| T32 And I mean that. | 686–716 | 0.581–0.597 | 770 | A |
| T37 And I mean that | 777–801 | 0.581–0.597 | 770 | A |
| T38 in a happy way, | 797–816 | 0.581–0.588 | 743 | A |
| T49 Greatness comes | 1010–1033 | 0.559–0.584 | 705 | close |
| T50 from character. | 1029–1053 | 0.559–0.581 | 694 | close |
| T57 And so if | 1171–1187 | 0.588–0.619 | 983 | wide |
| T58 I could wish | 1183–1201 | 0.562–0.597 | 926 | wide |
| T59 upon you, | 1197–1222 | 0.556–0.572 | 861 | wide |
| T60 I don't know | 1218–1231 | 0.566–0.569 | 853 | wide |
| T61 how to do it. | 1227–1255 | 0.559–0.578 | 877 | wide |
| T62 For all of you | 1251–1279 | 0.559–0.578 | 877 | wide |
| T63 Stanford students, | 1275–1312 | 0.562–0.637 | 1031 | wide |
| T64 I wish upon you | 1308–1330 | 0.597–0.603 | 942 | wide |
- T12–T14 memakai pose setelah punch-in (f240, zoom 1,35). Kepala di layar ±849 px, teks mulai ±929 px.
- B11 T63 'Stanford students,': kepala sampai 0,637 → teks mulai ±1120 px. Satu baris (834 px) melewati safe frame, jadi tampil ini dipecah dua baris seimbang 'Stanford' / 'students,' (modus kata, Lantai A4 ≥ 85 %). **Menyimpang** dari r2b ("dua baris hanya tumpuk/d"), alasannya batas safe frame.

## 2. Tidak ada frame tanpa teks (silang)
- Silang linear 3 f. Tampil baru mulai masuk 2 f sebelum onset kata pertamanya: opasitas 0 → 1 di f a−2…a+1, gerak naik + blur → tajam sampai a+5. Di modus kata/skala, tiap kata juga −2 f. Tampil lama mulai keluar di frame yang sama (b−2): opasitas 1 → 0 sampai b+1, blur naik sampai 14 px. Dicek di still f52/53/54 (HIGH EXPECTATIONS → have very) dan f600 (phrase → pain): di setiap frame hanya satu teks yang tajam.
- Tampil yang dipotong batas shot hilang di cut. Agar tidak ada lubang 5 f di f99–103 (T04 bertahan sampai 3,473 dtk, cut B1→B2 di 3,3 dtk), **cut B1→B2 digeser ke f104** (onset 'unfortunately', cut di suku kata seperti kartu 55). PLAN B2 menulis 3,3 dtk, jadi ini **menyimpang**.
- Simulasi dari data (TEKS + batas shot): **0 frame tanpa tampil**; 192 frame silang. Kartu B12 f1330 sudah berisi T65 yang mulai masuk.

## 3. 'phrase' (T28)
- `remotion/src/data/words.json` dan `teks.json` disalin ulang dari `audio/words.json` dan `handoff/TEKS.json` yang sudah dikoreksi. 'phrase' 19,80–19,95 tampil di f594–601 (±0,2 dtk sebelum memudar), bukti still B06e f596: "I used the phrase".

## 4. Teks tidak mendahului ucapan
- T34 'this is gonna cause' → modus `kata` (posisi tetap di tengah). Di f725 hanya 'this' yang tampil, 'cause' muncul di onset 24,60.
- T50 'from / character.' (tumpuk) dan semua tumpuk lain (T02, T04, T65, T66): tiap baris masuk di onset kata pertamanya. 'character.' di f1036–1038 (onset 34,59).

## 5. Kontras
- B8a: scrim atas 0,7 → 0,9 (sampai 55 % tinggi). 'Because' (B08e) di atas panel gelap.
- B8b: penggelap rata 0,62 ditambah pita gradien linear lembut (0 → 0,6 → 0, y 28–74 %, bukan kotak) di tinggi teks (B08f).
- Pengukuran otomatis kontras di still r5/r6 tidak dapat diandalkan: lapisan film menggeser warna huruf sehingga mask warna tidak menemukan teks. Nilai di atas dicek dengan mata.

## Gate (keluaran apa adanya)
`teks_cek.py qc/stills`
```
still dicek: 38
TIDAK ADA TANDA
exit 0
```
`balance_check.py qc/stills`
```
PERIKSA B01a.png                     kiri 0.53 kanan 0.47 · atas 0.90 bawah 0.10 · pusat (0.45, 0.36)
PERIKSA B01b.png                     kiri 0.55 kanan 0.45 · atas 0.89 bawah 0.11 · pusat (0.44, 0.32)
FAIL    B01c.png                     kiri 0.75 kanan 0.25 · atas 0.83 bawah 0.17 · pusat (0.35, 0.33)  ← berat kiri
FAIL    B02a.png                     kiri 0.28 kanan 0.72 · atas 0.77 bawah 0.23 · pusat (0.58, 0.41)  ← berat kanan
ok      B02b.png                     kiri 0.56 kanan 0.44 · atas 0.36 bawah 0.64 · pusat (0.48, 0.49)
PERIKSA B03a.png                     kiri 0.56 kanan 0.44 · atas 0.89 bawah 0.11 · pusat (0.43, 0.36)
ok      B03b.png                     kiri 0.51 kanan 0.49 · atas 0.77 bawah 0.23 · pusat (0.48, 0.43)
PERIKSA B03c.png                     kiri 0.50 kanan 0.50 · atas 0.79 bawah 0.21 · pusat (0.46, 0.44)
ok      B04a.png                     kiri 0.35 kanan 0.65 · atas 0.35 bawah 0.65 · pusat (0.56, 0.53)
ok      B04b.png                     kiri 0.59 kanan 0.41 · atas 0.48 bawah 0.52 · pusat (0.46, 0.48)
ok      B04c.png                     kiri 0.45 kanan 0.55 · atas 0.48 bawah 0.52 · pusat (0.52, 0.49)
ok      B05a.png                     kiri 0.50 kanan 0.50 · atas 0.34 bawah 0.66 · pusat (0.51, 0.57)
ok      B05b.png                     kiri 0.49 kanan 0.51 · atas 0.50 bawah 0.50 · pusat (0.50, 0.50)
FAIL    B05c.png                     kiri 0.80 kanan 0.20 · atas 0.27 bawah 0.73 · pusat (0.45, 0.53)  ← berat kiri
ok      B05d.png                     kiri 0.58 kanan 0.42 · atas 0.29 bawah 0.71 · pusat (0.49, 0.62)
ok      B06a.png                     kiri 0.52 kanan 0.48 · atas 0.56 bawah 0.44 · pusat (0.52, 0.44)
ok      B06b.png                     kiri 0.37 kanan 0.63 · atas 0.68 bawah 0.32 · pusat (0.53, 0.38)
ok      B06c.png                     kiri 0.54 kanan 0.46 · atas 0.57 bawah 0.43 · pusat (0.46, 0.42)
PERIKSA B06d.png                     kiri 0.55 kanan 0.45 · atas 0.89 bawah 0.11 · pusat (0.46, 0.36)
FAIL    B06e.png                     kiri 0.27 kanan 0.73 · atas 0.62 bawah 0.38 · pusat (0.58, 0.40)  ← berat kanan
FAIL    B07a.png                     kiri 0.72 kanan 0.28 · atas 0.25 bawah 0.75 · pusat (0.34, 0.60)  ← berat kiri
ok      B07b.png                     kiri 0.54 kanan 0.46 · atas 0.42 bawah 0.58 · pusat (0.44, 0.54)
PERIKSA B07c.png                     kiri 0.59 kanan 0.41 · atas 0.89 bawah 0.11 · pusat (0.43, 0.36)
ok      B08a.png                     kiri 0.40 kanan 0.60 · atas 0.72 bawah 0.28 · pusat (0.54, 0.37)
PERIKSA B08b.png                     kiri 0.37 kanan 0.63 · atas 0.79 bawah 0.21 · pusat (0.49, 0.34)
ok      B08c.png                     kiri 0.48 kanan 0.52 · atas 0.67 bawah 0.33 · pusat (0.50, 0.39)
FAIL    B08d.png                     kiri 0.83 kanan 0.17 · atas 0.26 bawah 0.74 · pusat (0.30, 0.62)  ← berat kiri
FAIL    B08e.png                     kiri 0.80 kanan 0.20 · atas 0.73 bawah 0.27 · pusat (0.41, 0.36)  ← berat kiri
ok      B08f.png                     kiri 0.65 kanan 0.35 · atas 0.32 bawah 0.68 · pusat (0.43, 0.58)
ok      B09a.png                     kiri 0.52 kanan 0.48 · atas 0.77 bawah 0.23 · pusat (0.47, 0.29)
FAIL    B09b.png                     kiri 0.72 kanan 0.28 · atas 0.64 bawah 0.36 · pusat (0.39, 0.38)  ← berat kiri
PERIKSA B09c.png                     kiri 0.63 kanan 0.37 · atas 0.78 bawah 0.22 · pusat (0.40, 0.36)
ok      B10.png                      kiri 0.44 kanan 0.56 · atas 0.44 bawah 0.56 · pusat (0.51, 0.46)
PERIKSA B11.png                      kiri 0.47 kanan 0.53 · atas 0.92 bawah 0.08 · pusat (0.48, 0.31)
PERIKSA B11b.png                     kiri 0.46 kanan 0.54 · atas 0.92 bawah 0.08 · pusat (0.49, 0.31)
PERIKSA B12a.png                     kiri 0.57 kanan 0.43 · atas 0.85 bawah 0.15 · pusat (0.45, 0.35)
ok      B12b.png                     kiri 0.50 kanan 0.50 · atas 0.50 bawah 0.50 · pusat (0.50, 0.50)
ok      B12c.png                     kiri 0.50 kanan 0.50 · atas 0.50 bawah 0.50 · pusat (0.50, 0.48)
lembar 25 %/50 %: /home/irfan/work/skill-development/projects/jensen-pain-suffering/qc/stills/balance_sheet.jpg
FAIL: 8 frame berat sebelah
exit 1
```

## Lain
- Draft penuh: `qc/draft.mp4`, 1428 frame, 47,600 dtk. Waktu render 1010 dtk (16 mnt 50 dtk, KONKURENSI=2).
- Draft pertama r6 gagal di tengah: Chrome menolak memuat video karena disk hampir penuh (sisa 3,1 GB, dipakai sesi lain). Percobaan kedua (KONKURENSI=2) berhasil. Selama percobaan itu `render.sh` diubah di main (commit 6971faa, kunci render global), sehingga skrip berhenti dengan syntax error setelah draft selesai ditulis. Sesudah itu saya memperhalus silang (lihat §2), lalu merender ulang semua still dan satu draft penuh lagi. Draft terakhir ini yang dipakai.
- Untuk mengecek silang (f51–54, f723–726) dan frame audit, saya merender beberapa still cek langsung dengan `npx remotion still` dari bundle yang sama ke folder scratch, bukan ke `qc/`. Semua still dan draft di `qc/` lewat `render.sh`.
