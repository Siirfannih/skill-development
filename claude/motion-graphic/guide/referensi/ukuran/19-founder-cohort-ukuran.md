# 19-founder-cohort · data ukur mentah (11 Nov 2026)

Sumber: `siirfannih_Db8r7cxhSQh.mp4` · 1276×718 (±16:9), 29,97 fps, 33,27 dtk, audio 44,1 kHz stereo.
Frame: `frames/fNNN.jpg` tiap 0,5 dtk (fNNN = dtk (N−1)×0,5). 1 piksel = 0,14 % tinggi, 0,08 % lebar.

## Teks (scripts/ukur_teks.py, scripts/xheight.py; ambang luminans >200–235, teks gelap <100)
| Frame | Teks | Tinggi penuh %H | Inti (x-height/kapital) %H | Lebar %W | Pusat x,y % |
|---|---|---|---|---|---|
| f006 (k1) | "class photos in" italic | 6,1 | 3,2 | 18,5 | 19,0 · 49,9 |
| f006 (k1) | "startup history" italic | 6,3 | – | 18,9 | 80,7 · 50,0 |
| f011 | "BUILT" / "CHATGPT" kapital | 11,6 | 10,7 | 16,8 / 27,9 | 24,6 / 72,4 · 56,7 |
| f015 (k2) | "HE" / "BUILT" / "REDDIT" | 12,1 / 13,2 / 11,7 | – | 8,5 / 16,8 / 22,7 | 18,7 / 50,1 / 80,8 · 56,5 |
| f021 | "one cohort" italic | 8,1 | ±5 (partikel ikut terukur) | 22,9 | 51,5 · 51,9 |
| f024 (k4) | "right time" roman | 11,4 | 6,4 | 24,3 | 50,4 · 52,4 |
| f036 (k5) | "28 days" hitam di putih | 11,6 | 8,1 (angka) | 17,2 | 51,1 · 51,3 |
| f033 | "we built the next one" italic | 5,3 | 3,3 | 29,1 | 49,1 · 42,4 |
| f041 (k6) | "no distractions" italic | 5,2 | 3,3 | 21,1 | 53,2 · 51,0 |
| f051 | "This is the next cohort" italic | 6,5 | 3,3 | 30,2 | 50,9 · 50,3 |
Warna inti teks `#FEFCFE` + glow putih lembut (radius tidak terukur pasti).

## Subjek / inset
- f006 inset foto kelompok: 36,1 %W × 36,6 %H, pusat 50,0 · 46,7; bingkai putih tipis (±0,6 %W, taksiran mata).
- f024 inset lukisan: 53,4 %W × 49,6 %H (akhir), tumbuh dari ±7 %W dalam ±0,5 dtk (strip 10 fps, /tmp/d1).
- f015 wajah tersorot: ±16 %W × ±31 %H (taksiran dari montase, bukan bbox otomatis).
- f052 (k7) narasumber: tinggi tubuh terlihat ±85 %H, lebar ±31 %W, di tengah.

## Warna (scripts/warna.py; patch 30×30 px, std = noise)
- Latar inset/teks: `#000000` std 0,0 (tanpa grain); "one cohort" `#0C0A0D` di tengah, partikel putih kecil.
- Latar putih (f024, f036): `#FFFFFF` std 0,0.
- Foto tersorot redup: `#201E21`–`#312F32` (abu netral sedikit ungu), saturasi rata 5.
- Vignette (luminans tengah/sudut): f006 121/0 · f011 95/35 · f015 122/44 · f021 31/1 · f041 42/21 · f052 58/60 (tanpa vignette) · f059 213/177.
- Footage interior f052 rata `#53372D`, saturasi 40 (hangat oranye-cokelat); monitor f041 `#282223`.

## Kamera (scripts/cut_kamera.py: hist+selisih, LK flow, affine parsial; lalu ORB+RANSAC f-awal→f-akhir)
- 39 batas shot terdeteksi (9 di antaranya kilat 4–5 frame: flash/inversi). Shot median 0,54 dtk.
- ORB: f001→f003 pull −9,2 % (1 dtk) · f008→f011 pull ±−3 %/dtk · f029→f032 panggung pull −16 % (1,5 dtk) · f052→f057 wawancara push +28 % (2,5 dtk, 229 inlier) · f033→f035, f041→f043, f050→f051 diam (<0,1 %).
- Angka "dx/dy" di `kamera.txt` adalah efek skala di titik asal (0,0), bukan pan; abaikan.

## Audio
- ebur128: −14,2 LUFS integrated, true peak −0,7 dBFS, LRA 4,0 LU.
- librosa: tempo 117,5 bpm; 140 onset (252/menit); 25 onset kuat (persentil 97); rasio energi perkusif/harmonik 0,64.
- RMS per 2 dtk (dBFS): 0:−15,7 · 2:−19,3 · 4:−19,8 · 6:−18,8 · 8:−18,5 · 10:−15,8 · 12:−15,1 · 14:−14,9 · 16:−17,8 · 18:−17,6 · 20:−17,8 · 22:−22,2 · 24:−18,6 · 26:−18,0 · 28:−13,0 · 30:−23,8 · 32:−46,2.
- pace_read.py: cut 64 (terlalu tinggi, glitch dihitung), event visual 51/menit, bicara 3,6 suku kata/dtk (proxy).
- earshot timeline (wav mono): −14,7 LUFS, 149 event, 4 babak musik; lengkap di `earshot.txt`.

## Batas ketelitian
- Sumber 718 px tinggi; huruf kecil ±0,3 %H. Glow menambah ±0,5 %H pada bbox teks putih.
- Pemisahan SFX dari musik tanpa stem: hanya onset dan label earshot; level SFX relatif tidak terukur.
- Font ditebak dari bentuk huruf, bukan metadata.
