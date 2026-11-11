# 32 · Data ukur mentah (11 Nov 2026)
Sumber: `video.mp4` IG DbDyLzSRqMI · 960×720 (4:3), 24 fps, 90,72 dtk. Frame tiap 1 dtk → `frames/f001…f091` (fNNN = detik NNN−1).
% = terhadap tinggi (720) atau lebar (960) frame penuh; video tanpa bingkai, frame konten = frame penuh.

## Teks (work/textmeasure.py: mask putih V>225 S<40 / gelap V<50 / merah, dilasi horizontal 2,2 % lebar → kotak per kata/baris)
Tinggi = kotak tinta (termasuk ascender/descender), bukan cap height.
| Frame | Isi | Tinggi | Lebar | Pusat (x,y) |
|---|---|---|---|---|
| f003 k1 | "of a" / "new" | 7,1 / 5,3 | 12,8 / 14,5 | (23,50) / (77,51) |
| f003 k1 | "renaissance" (kata kunci) | 11,0 (x-height ±9) | 80,8 | (50,78) |
| f006 | "We all know" | 6,9 | 37,7 | (50,73) |
| f024 / f046 / f064 | caption presenter | 7,1 / 6,9 / 8,8* | 30,3 / 20,2 / 22,6 | (50,72) / (50,73) / (59,28) |
| f035 k7 | "was given" di lukisan | 7,2 | 31,7 | (25,73) |
| f072 | "second." di b-roll | 6,9 | 25,8 | (50,51) |
| f090 | "what … part" (penutup menyebar) | 7,1 / 8,1 | 17,2 / 14,4 | (32,54) / (70,55) |
| f018 k3 | "The year is" | 8,8 | 34,1 | (50,25) |
| f018 k3 | "1440" isi lukisan | ±54 (visual, mask gagal: isi bertekstur) | ±90 | (50,57) |
| f020 k4 | "invents" / "the" / "printing" (merah) / "press." | 7,1 / 7,1 / 8,9 / 7,1 | 20,0–25,0 | kolom x 45–73, y 47–68 |
| f030 k5 | "30,000" / "books" / "turned into" / "200,000,000" vertikal | 5,0 / 4,2 / 7,1 / 82,6 tinggi × 13,8 lebar | – | (19,63) / (20,68) / (50,70) / (85,50) |
| f042 k6 | "this guy" / "decided" (hitam di kertas UI) | 9,0 / 7,1 | 26,0 / 26,6 | (37,54) / (36,63) |
| f048 k8 | "the Renaissance" script putih | ±18 (dengan lengkung) | ±72 | (50,52) |
*f064: caption naik ke atas (y 28 %) saat bagian bawah terisi objek.
Batas: 1 px = 0,14 % tinggi; kotak termasuk bayangan/anti-alias ±0,3 %; frame JPEG dari ekstraksi 1 dtk, teks yang sedang animasi masuk bisa terukur kecil.

## Warna (median potongan piksel, work/ cmd inline)
Dinding presenter `#563522`/`#53321F` · baju marun `#78414B` · kulit `#9C7069` · kertas gravir `#D8D6DB` · latar 1440 `#10132F` · halaman artikel `#FDFBFE` · pembuka `#1F1E22` · merah "printing" `#C91F29` · sorotan teks artikel `#1E5A95`.
Vignette presenter: luminans sudut atas / tengah = 0,73–0,77 (f006, f012, f024). Saturasi rata-rata HSV 102–107.

## Cut & ritme (ffmpeg select gt(scene,0.3) → work/cuts03.txt; pace_read.py)
105 cut, 106 shot, 69,4 cut/menit, shot median 0,71 dtk, rata 0,86; 23 shot < 0,3 dtk, 8 shot > 2 dtk.
Per segmen (cut/menit): 0–16 dtk 90 · 16–33 dtk 56 · 33–50 dtk 78 · 50–72 dtk 65 · 72–91 dtk 60.
pace_read: gerak layar 5,9 · event visual 73/menit · 3,8 suku kata/dtk · kategori "energi".

## Kamera (work/cam.py: ORB + estimateAffinePartial2D antara frame awal+0,06 dtk dan akhir−0,08 dtk tiap shot)
76 shot terukur (30 n/a: < 0,35 dtk atau fitur kurang). diam 50 · push 10 · pull 10 · pan 6.
Terbesar: 21,96 dtk push +69 % (zoom-through gambar mesin cetak) · 71,79 push +28 % · 0,00 push +13 % (globe) · 69,50 pull −11 % · 42,79 pull −8 % (dokumen) · 64,00 pan −16 % x (Spongebob) · 35,96 pan +20 % y (foto arsip kantor).
Presenter: drift lambat ±2–7 % per shot (11,29 +2,2 %; 23,38 −3,6 %; 76,83 −7,0 % dalam 3 dtk) = punch/scale digital pelan, bukan kamera fisik.
Framing presenter (visual, grid 10 %): sedang = kepala 2–47 % tinggi; rapat = 2–55 %; lebar wajah ±25 % frame, pusat x 45–50 %.
Batas: estimasi rigid (skala+translasi); teks animasi dan potongan berlapis mengganggu; angka pada shot < 1 dtk kasar.

## Audio (ffmpeg ebur128; librosa; earshot)
−14,4 LUFS · true peak +0,1 dBTP · LRA 4,3 LU. librosa beat_track 117,5 bpm (165 beat), onset 5,45/dtk.
earshot --detail high: −14,4 LUFS, TP −0,1; pulse clarity 0,10 (tanpa grid tegas); 7 seksi chiptune→funk→house→funk/disco, −12…−16 LUFS; 599 event 6,6/dtk; 96 berlabel (31 hit, 25 ui, 23 voice, 9 drum, 3 riser, 3 note, 1 foley, 1 whoosh). Batas: mix tanpa stem, label = petunjuk.
