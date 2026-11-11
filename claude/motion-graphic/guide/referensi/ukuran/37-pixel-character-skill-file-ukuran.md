# 37 · ukuran mentah (11 Nov 2026)

Sumber: `video.mp4` IG Deiz38JJvmv · 1280×720 (16:9) · 30 fps · 119,96 dtk. Frame tiap 1 dtk di `frames/` (fNNN ≈ t = NNN − 0,5 dtk).
Skrip: `scripts/ukur.py` (kotak teks + hex median), `scripts/kamera.py` (cut + affine ORB per shot), `scripts/gerak_detik.py` (skala antar-frame tiap 1 dtk), `pace_read.py`, ffmpeg ebur128, librosa (bpm, onset, pita frekuensi).

## Teks (tinggi = ujung atas–bawah piksel teks, % tinggi frame; posisi = pusat blok)
| Frame | Kata | Tinggi | Lebar | Pusat x,y |
|---|---|---|---|---|
| k1 f002 | This / video (putih) | 13,8 / 13,5 | 16 / 25 | 27,27 / 72,31 |
| k1 f002 | VIRAL (pink, 3D miring) | 24,7 | 46 | 47,79 |
| k2 f008 | WRONG (krem, condensed) | 27,1 | 38 | 68,32 |
| k2 f008 | QUESTION. | 12,4 | 23 | 67,51 |
| k2 f008 | prompt? (merah, dicoret) | 23,5 | 41 | 36,73 |
| k3 f019 | MIFTAHUL (merah) | 11,5 | 48 | 73,56 |
| k3 f019 | His name's | 6,0 | 26 | 62,36 |
| k4 f022 | skill file. | 11,8 | 18 | 20,46 |
| k4 f022 | as a | 4,7 | 11 | 17,25 |
| f053 | NO / MAGIC (merah) | ±14 / ±11,5 (dibaca dari gambar; mask gagal) | ±16 | 66,24 |
| f053 | There is | ±5–7,6 | — | 66,12 |
| k8 f113 | SKILL (hijau) | 11,0 | 24 | 61,38 |
| k8 f113 | Comment | 6,7 | 25 | 62,25 |
| k8 f113 | Get the skill file | 2,2 | 12 | 56,46 |
| f036 | And this (judul di atas video) | 5,0 | 16 | 39,16 |

## Subjek (dibaca dari frame penuh, ±3 %)
- k3 close-up kepala tokoh pixel: tinggi ±76 % (kulit saja terukur 40 %), lebar ±30 %, pusat x 22 %.
- f053 panggung: detektif 53 % tinggi, robot oranye 21 %. k8 CTA: detektif 62 %, robot ±20 %.
- k6 grid teal: robot 35 % tinggi × 19,5 % lebar, di x ±58 %.
- k7 ikon alur: detektif ±25 %, ikon kotak ±10 % tinggi; banyak objek kecil berjajar diagonal.

## Warna (median potongan piksel)
merah tengah `#AF071B`, sudut `#520005` · teks MIFTAHUL `#ED2F3D` · NO MAGIC `#930007` (sisi gelap 3D) · karpet `#8C0306` · dinding `#5E0205` · hitam `#030200`/`#010101` · lantai grid `#031211` · hijau CTA `#78FCD1` · krem WRONG `#FDE3CC` · meja voxel `#B63B14` · langit pembuka `#0E74A4`.
Vignette (luma tengah / sudut): f008 84/17, f113 43/18, f022 77/35, f053 101/89.
Ketajaman Laplacian atas/tengah/bawah: f113 515/661/26, f090 115/392/17, f013 101/167/41 → depan dan belakang buram, subjek tajam.

## Kamera
- Scene detect 0,3: 20 cut; 0,12: 37 cut → 18,5/menit, shot median 2,1 dtk. 0–43 dtk: 23 cut (32/menit); 43–120 dtk: 14 cut (11/menit).
- Affine per shot: hampir semua push (skala +5,7 … +55 %); pengecualian 87,9–96,3 dtk pull −27 %.
- Per detik: push tenang +2…+4 %/dtk; hentakan +11…+30 %/dtk (46–47, 56–57, 76–77, 91, 96–97 dtk); pull cepat −28 % (32 dtk), −48 % (98 dtk); 111–119 dtk diam (0 %).
- pace_read: event visual 45/menit, laju bicara 5,8 suku kata/dtk.

## Audio
- ebur128: −14,1 LUFS, peak −0,4 dBFS (true peak), LRA 2,4 LU.
- librosa: 112 bpm, onset 205/menit, chroma A#–B–A. Pita <150 Hz +10…+15 dB di atas 300–3000 Hz (sub bass drop + suara, bukan musik: earshot AST music 0,00–0,02 setelah 42,6 dtk).
- earshot timeline --detail high: 752 event (6,3/dtk), 96 berlabel (20 note, 10 ui, 8 hit, 8 foley, 7 whoosh, 3 key, 2 step, 1 riser); musik glitch hop + vocal chop 0–42,6 dtk; 88 % dari 69 cut punya onset ≤ 100 ms; aksen terkuat sub bass drop 1:34,7 (+48 dB).
- RMS per detik: hening total di 89–90 dtk (−48/−79 dB) dan 109 dtk (digital silence).

## Batas ketelitian
- Sumber 720p; 1 piksel = 0,14 % tinggi. Tinggi teks termasuk ascender/descender dan miring 3D; kata miring bisa meleset ±15 %.
- Ukuran subjek dibaca dari gambar, bukan segmentasi.
- Affine global tercampur gerak objek/teks; di adegan gelap (inlier < 25) tidak terukur.
- Cut dalam satu set 3D sering berupa lompatan kamera; ambang 0,12 bisa menghitung kilat/glitch sebagai cut.
- Level SFX vs musik vs suara tidak bisa dipisah tanpa stem; angka pita frekuensi hanya proxy.
