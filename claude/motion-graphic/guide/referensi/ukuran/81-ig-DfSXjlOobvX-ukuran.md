# 81 · ukuran mentah (siirfannih_DfSXjlOobvX.mp4)

Sumber: 1276×718, 25 fps, 54,36 dtk, ada audio. Frame tiap 0,5 dtk di `frames/` (108). Sheet: `sheet.jpg` (tiap 2 dtk, 8 kolom, sel 300 px), `sheet1s.jpg`, `q*.jpg` (tiap 0,25 dtk).
Skrip: `skrip/ukur_teks_warna.py`, `skrip/ukur_skala.py` (PIL+numpy+cv2 connectedComponents), `skrip/kamera.py` (ORB + estimateAffinePartial2D awal vs akhir shot), `pace_read.py`, `earshot timeline --detail high` (→ `earshot.txt`), librosa, ffmpeg ebur128 + scene>0,25.

## Per frame kunci (% tinggi/lebar frame)
- k1 3,0 dtk benda di hitam: bg `#000000`; bbox semua benda x 2,0–97,5 %, y 38,3–63,5 %; 19 komponen, tinggi 25,3 (struk) / 17,8 / 13,8 / 12,4 / 12,1 / 9,9 / 9,3 / 8,5 %; lebar 4,9–8,5 %.
- k2 krem (6,5 dtk): bg tengah `#DFC8BC`, atas `#E8D4C9`, sudut `#DFC9BB`; grain std 4,1/255. Teks "Org" biru `#80A0D6` h 2,5 %, pusat (35, 77). Orang+kursi x 42–57 %, y 32–64 % (h 32 %, w 15 %). 4,8 dtk: figur 27,7 %; 8,6 dtk: 2 figur 31–33 %; 10,6 dtk: 18 komponen 18–35 % (termasuk bayangan menyatu, terlalu besar).
- k3 11,2 dtk: bg `#FBF8FC`, teks raksasa `#C6DBF6`; baris atas y 0–225 px (terpotong), bawah y 491–717 (31,6 %, terpotong); 4 foto x 23,7–79,5 %, y 37,3–62,7 %.
- k4 17,0–17,5 dtk: oranye `#F88A12`, latar ukiran median `#4A463B`. Diameter bola tidak terukur (mask oranye bercampur angka "100").
- k5 21,6 dtk: teks putih (min RGB>225) "Build … mode for t", cap "B" y 98–159 px = 8,6 %; blok x 15,4–72,8 %, pusat (44, 17); kepala subjek menutupi "d" dan kata kedua. Footage median `#8F655B`.
- k6 37,6 dtk: bg `#000000`, teks `#555557`; 4 baris, tinggi baris (asc–desc) 8,4–9,2 %, cap "R" 6,5 %, jarak baris ±9,8 %; blok x 11,7–87,4 %, y 32–70 %.
- k7 40,0 dtk: kotak sorot `#629AD8` x 27,5–72,5 %, y 44,6–55,2 %; cap teks ±6,6 % (cek visual dari komposit), pita ukur 7,4 / 4,7 / 7,0 % (termasuk ikon).
- k8 47,5 dtk: kolase, sudut `#7A8E99`, median `#010E12`.
- Lain: panel koin biru `#5D8BBD`/median `#709BCB` (26,5 dtk); hijau `#2C7359` (43,5 dtk), `#1F6D54` (44 dtk); sage `#E9EBDD` (32 dtk); logo `#E8E6E8` x 37–57 %, y 47,2–54,2 %.

## Kamera (skala, tx, ty awal→akhir shot; inlier)
- Andal (inlier >500): 11–22,6 dtk dan 28–31 dtk diam (|skala| ≤0,6 %, |t| ≤3,7 %); 41,8–46,7 dtk skala −1 s/d −4,9 % (tarik mundur pelan); 46,7–50,8 dtk tx −8,2 / −8,5 / −11,2 % (pan kiri).
- Tidak andal (inlier <100, isi berubah): 0–4,6 (benda bergerak sendiri), 4,6–11 (−40 %, pull-back terlihat di sheet), 25,6–28,1, 31,2–33,4, 35–39 (zoom-through teks), 50,8–54,3 (logo).
- 38,96–41,84: ty −57 % (scroll daftar model, bukan kamera).

## Ritme
- pace_read: 26 cut, 28,7/menit, median 1,6 dtk, event visual 45/menit, bicara ±4,6 suku kata/dtk (proxy), usulan musik 100–140 bpm.
- Scene>0,25: 4,64 11 11,84 12,64 13,88 15,52 16,76 17,68 19,12 20,24 22,6 25,64 28,12 29,16 30,32 31,24 33,44 35 38,96 41,84 43,4 44,32 44,96 45,4 45,88 46,72 48,36 49,6 50,8.

## Audio
- ebur128: −14,1 LUFS, LRA 3,2 LU, true peak −0,8 dBFS. earshot: −14,5 LUFS, TP −1,1 dBTP, LRA 3,0; terkeras 19–22 dtk; celah 0,3 dtk di 18,5 dtk; ekor sunyi 0,7 dtk.
- earshot: 281 event (5,2/dtk); 54 ui, 14 hit, 13 voice, 12 note, 2 riser, 1 foley. Aksen: 19,30 dtk +32 dB (stab), 0,11 dtk +29 dB (pop), 42,70 dtk +25 dB (suara).
- Bagian: 0–2,4 house/vocal chop; 2,4–54,3 inspirational corporate strings. librosa 112,3 bpm, onset 4,4/dtk; pulse clarity 0,06 (tanpa grid).

## Batas ketelitian
- 1 px = 0,14 % tinggi, 0,08 % lebar; huruf kecil bisa meleset ±10 %. Kompresi IG melunakkan tepi teks tipis.
- Mask warna/ambang bisa menyatukan bayangan dengan figur (angka 10,6 dtk terlalu besar).
- Estimasi kamera gagal saat isi berganti dalam shot; dipakai hanya yang inliernya tinggi.
- Label earshot hasil tebakan CLAP; SFX dan musik tidak dipisah (tidak ada stem).
- Font tidak terukur pasti: kemiripan dari bentuk huruf (G, R, a, t), bukan dari metadata.
