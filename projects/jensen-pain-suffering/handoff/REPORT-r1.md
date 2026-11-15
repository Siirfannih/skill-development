# REPORT r1 · Editor · jensen-pain-suffering

Cakupan: B1–B12 visual (tanpa SFX/musik). Komposisi `Main` 1920×1080, 30 fps, 1428 f; audio hanya `suara.wav`.
Kode: `remotion/src/` (engine: `engine/{theme,camera,Cam,Text,media,fonts,words}.ts(x)`, shot per beat: `shots.tsx`, rangkai: `Main.tsx`). Media terpotong: `remotion/public/v/` (H.264 CRF 16, 30 fps, tanpa audio), Poppins 600/700 dari `claude/motion-graphic/fonts/poppins/` (dimuat lewat FontFace + delayRender; gagal muat = galat render).
Still: `qc/stills/*.png` (22 still, skala 0,5). Draft: `qc/draft.mp4` (960×540, 1428 frame, 47,600 dtk).
Pertanyaan terbuka: 7 (`handoff/QUESTIONS.md`, Q1–Q7; semuanya sudah dikerjakan dengan default yang tertulis).

## Rentang arsip 60 Minutes yang dipakai (dicek frame + deteksi cut)
| File | Rentang TASK | Dipakai | Alasan |
|---|---|---|---|
| nv_hq.mp4 | 467,0–471,0 | 467,8–470,8 | 467,0–467,7 masih wawancara; cut ke aerial di 467,73 |
| arsip_dennys.mp4 | 473,5–476,5 | 473,9–476,7 | 473,5 masih papan NVIDIA; Denny's 473,81–476,78 (disiapkan, tidak dipakai, Q7) |
| arsip_meja.mp4 | 487,5–490,0 | 487,5–492,7 | shot sama sampai 492,76; lebih panjang untuk durasi cetakan |
| arsip_komputer.mp4 | 513,0–519,0 | 514,6–520,6 | 513 masih wawancara; shot 514,51–521,99 |
| arsip_logo.mp4 | 521,5–527,5 | 522,1–526,6 | 527,5 sudah wawancara |
| nv_tim.mp4 | 551,5–556,5 | 552,1–557,1 | cut di 552,02 |
grad_clap: sumber ternyata 720×1280; crop 720×450 (y 218) = tangan bertepuk + wajah, skala 1152×720.

## Tabel beat
| Beat | Dikerjakan | Bukti | Angka/gate | Menyimpang? |
|---|---|---|---|---|
| B1 0–99 | Talking head crop tanpa garis putih (jendela sumber x 0,332–0,992, y 0,052–0,712), push linear 100→103 %. Teks tumpuk k4 di dinding kanan: 'people with very' / 'HIGH EXPECTATIONS' (amber), 'have very' / 'LOW RESILIENCE' (LOW putih → amber saat 'resilience'). | B01.png | balance PERIKSA (atas 0,87); teks_cek GANDA 'very' (diucapkan dua kali) | Ya: push 103 % (PLAN 106 %) agar teks tidak keluar safe frame; ukuran k4 6 % / 3 % (PLAN ±10 / 4,3 %), Q4 |
| B2 99–182 | Bingkai putih #F4F1EA di meja kertas gelap, push linear 100→112 % terus; grad_pose → grad_clap tepat di 'success' (f164). Teks di bawah bingkai rata kiri bingkai: 'unfortunately,' lalu 'resilience matters in success.' (resilience amber). | B02.png | ok | Kecil: 'resilience' digabung satu baris dengan 'matters in success.' (tampil sendiri hanya 0,12 dtk, tak terbaca) |
| B3 182–275 | Push 100→103 % (182–232), punch-in 103→135 % dalam 8 f ease-out (232–240) dengan motion blur subframe (rana 200°), flash putih 1 f di f240. 'I don't know' / 'how to teach it to you' keluar f226; 'I hope suffering' / 'happens to you.' (suffering amber) dikunci dunia pada pose f240. | B03a, B03b (tepat setelah punch), B03c | ok | Ya: D1 84 px (cap ±60) karena lebar, Q5 |
| B4 275–458 | Babak II: 3 cetakan (meja, komputer, logo) bingkai putih + bayangan jatuh di meja kertas #0E0D0C bertekstur, vignette; masuk blur 16→0 px dalam 6 f + kilatan hangat 1 f. Satu gerak kamera ke kanan (pan + pull 120→102 %), tidak kembali; teks di bawah foto yang difokus. | B04a/b/c | B04b FAIL berat kiri (0,75): cetakan berikut masuk dari kanan saat kamera bergerak | Q7 (tanpa Denny's) |
| B5 458–561 | Babak III: monokrom kontras + grain, push 100→112 % ke kepala; scrim linear kiri atas; 'but there were' / 'plenty of' lalu 'opportunities' / 'for setbacks' (amber). Kartu judul SUFFERING f543–561, percikan api monokrom di dalam huruf (multiply), dicat amber, pull 104→100 %. | B05a, B05b | B05a FAIL berat kiri (0,87): teks kiri atas sesuai PLAN, subjek kanan | Ya: tinggi kartu judul ±20 % (bukan ±50 %), Q3 |
| B6 561–716 | nv_hq (zoom 122 %, pan ikut ke kanan; bug 60 Minutes di luar crop) 'to this day,' / 'pain and suffering' kiri bawah; nv_tim (zoom 122 %) 'inside our company' lalu 'with great glee.' tengah atas; Jensen di 'And I mean that.' (f686). Grade gelap kontras. | B06a/b/c | ok | – |
| B7 716–816 | ketik (push 100→108 % ke tangan) 'Boy,' / 'this is gonna cause' lalu 'a lot of' / 'pain and suffering.' (amber); Jensen f777 'in a happy way,'. | B07a, B07b | B07a FAIL berat kiri (0,96): footage gelap, bobot hanya teks | Q1 ("gonna") |
| B8 816–967 | tempa push 100→112 % ke batang membara; teks tengah atas 'you want to train,' / 'to refine' lalu 'the character' / 'of your company.'; percik f923 push 100→106 %, 'You want greatness' / 'out of them.' kiri atas. | B08a, B08b | ok | Push tempa 112 % (PLAN 115 %) |
| B9 967–1053 | PCB gelap, pan cepat 200 px; 'greatness' / 'is not intelligence' (putih, intelligence Bold). Cut tegas f1010 ke Jensen close (crop ±120 % dari A), 'Greatness comes from' / 'character.' (amber). 'it's' @33,67 tidak ditampilkan. | B09a, B09b | B09b PERIKSA (atas 0,85) | – |
| B10 1053–1170 | Siluet, push 100→110 %; teks tengah bawah di atas tubuh siluet: "character isn't formed" / "out of smart people," lalu "it's formed out of" / "people who suffered." (amber). | B10 | ok | Teks di tengah bawah (bukan sisi) agar seimbang |
| B11 1170–1307 | Jensen lebar (jendela x 0,26–1,0), push 100→103 % kontinu sampai f1330; 4 tampil di dinding kanan. | B11 | PERIKSA (atas 0,92) | Ya: push 103 % (PLAN 108 %), teks 84 px, Q5 |
| B12 1307–1428 | 'I wish upon you' di Jensen sampai f1330; kartu #0E0D0C bertekstur, push 100→104 %: 'AMPLE DOSES' (170 px) / 'OF PAIN AND SUFFERING.' (120 px, pain and suffering amber), kata muncul di onset; teks keluar f1398, gelap ke hitam f1406–1426. Tanpa logo/wordmark. | B12 | ok | – |

## Gate (keluaran apa adanya)
`python3 claude/motion-graphic/scripts/juri/teks_cek.py qc/stills`
```
still dicek: 22
  GANDA  B01.png                                kata 'very' tampil di y 16%, 34%
ADA 1 TANDA: cek still-nya, perbaiki, atau tulis alasannya di qc/JURI.md
exit 1
```

`python3 claude/motion-graphic/scripts/juri/balance_check.py qc/stills`
```
PERIKSA B01.png                      kiri 0.55 kanan 0.45 · atas 0.87 bawah 0.13 · pusat (0.45, 0.32)
ok      B02.png                      kiri 0.39 kanan 0.61 · atas 0.32 bawah 0.68 · pusat (0.57, 0.62)
PERIKSA B03a.png                     kiri 0.52 kanan 0.48 · atas 0.89 bawah 0.11 · pusat (0.46, 0.29)
ok      B03b.png                     kiri 0.48 kanan 0.52 · atas 0.78 bawah 0.22 · pusat (0.42, 0.35)
ok      B03c.png                     kiri 0.48 kanan 0.52 · atas 0.77 bawah 0.23 · pusat (0.47, 0.37)
ok      B04a.png                     kiri 0.56 kanan 0.44 · atas 0.33 bawah 0.67 · pusat (0.47, 0.60)
FAIL    B04b.png                     kiri 0.75 kanan 0.25 · atas 0.36 bawah 0.64 · pusat (0.41, 0.60)  ← berat kiri
ok      B04c.png                     kiri 0.52 kanan 0.48 · atas 0.66 bawah 0.34 · pusat (0.50, 0.43)
FAIL    B05a.png                     kiri 0.87 kanan 0.13 · atas 0.69 bawah 0.31 · pusat (0.30, 0.42)  ← berat kiri
ok      B05b.png                     kiri 0.48 kanan 0.52 · atas 0.48 bawah 0.52 · pusat (0.52, 0.50)
ok      B06a.png                     kiri 0.53 kanan 0.47 · atas 0.59 bawah 0.41 · pusat (0.46, 0.41)
ok      B06b.png                     kiri 0.65 kanan 0.35 · atas 0.36 bawah 0.64 · pusat (0.43, 0.61)
PERIKSA B06c.png                     kiri 0.51 kanan 0.49 · atas 0.90 bawah 0.10 · pusat (0.47, 0.29)
FAIL    B07a.png                     kiri 0.96 kanan 0.04 · atas 0.11 bawah 0.89 · pusat (0.20, 0.68)  ← berat kiri
PERIKSA B07b.png                     kiri 0.57 kanan 0.43 · atas 0.82 bawah 0.18 · pusat (0.43, 0.35)
ok      B08a.png                     kiri 0.57 kanan 0.43 · atas 0.76 bawah 0.24 · pusat (0.48, 0.34)
ok      B08b.png                     kiri 0.69 kanan 0.31 · atas 0.70 bawah 0.30 · pusat (0.36, 0.40)
ok      B09a.png                     kiri 0.70 kanan 0.30 · atas 0.35 bawah 0.65 · pusat (0.42, 0.47)
PERIKSA B09b.png                     kiri 0.66 kanan 0.34 · atas 0.85 bawah 0.15 · pusat (0.40, 0.30)
ok      B10.png                      kiri 0.47 kanan 0.53 · atas 0.43 bawah 0.57 · pusat (0.50, 0.51)
PERIKSA B11.png                      kiri 0.46 kanan 0.54 · atas 0.92 bawah 0.08 · pusat (0.48, 0.26)
ok      B12.png                      kiri 0.57 kanan 0.43 · atas 0.51 bawah 0.49 · pusat (0.45, 0.52)
lembar 25 %/50 %: /home/irfan/work/skill-development/projects/jensen-pain-suffering/qc/stills/balance_sheet.jpg
FAIL: 3 frame berat sebelah
exit 1
```

Draft: `render.sh … draft Main` → `qc/draft.mp4`, ffprobe: 960×540, 30 fps, nb_frames 1428, durasi 47,600000 dtk.

## Catatan lain (angka, bukan penilaian rasa)
- Safe frame 5 %: semua 22 still dicek mata dengan kotak safe frame; tidak ada teks di luar. Objek di tepi hanya cetakan B4 yang masuk saat kamera bergerak.
- Kontras (taksiran piksel, persentil-75 latar di sekitar huruf): amber di dinding hijau B1 4,6 · B3c 4,6 · B5a 4,4 · B9b 3,8 · B12 7,5; putih di talking head 6,7–8,1, B9a 11,0. B7a (2,6) dan B8b terukur rendah karena kotak ukur ikut menangkap percikan/latar oranye; dicek mata terbaca. Scrim = gradien linear lokal di sisi teks + bayangan teks lembut, tanpa kotak.
- Font: Poppins termuat dari file (`remotion/public/fonts`), terlihat di semua still (bukan fallback).
- Motion blur: subframe dalam rana 200°, 8 sampel (draft) saat kecepatan layar > 7 px/f (punch B3, perjalanan B4).
- Gaya kamera B4 = diam-geser-diam ke satu arah (gaussian σ 0,12 dtk), bukan pan berkecepatan rata.
- Disk: `public` 100 MB, `.bundle` 106 MB; tidak ada salinan antara lain. Bebas ±6,4 GB.
- Saat bekerja saya sempat menjalankan `pkill -f "remotion render"` untuk menghentikan draft pertama. Render builder-trap-r2 milik sesi lain (PID 3461889, mulai 18:32) masih hidup setelahnya; perlu dicek apakah tetap selesai normal.
