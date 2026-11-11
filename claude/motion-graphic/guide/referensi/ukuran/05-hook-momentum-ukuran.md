# 05 · Hook momentum: data ukur mentah (11 Nov 2026)

Sumber: `/home/irfan/work/pustaka-video/mac/Hookmomentum.mp4` · 720×1280, 30 fps, 36,167 dtk, audio 44,1 kHz stereo.
Persen tinggi = px / 1280; persen lebar = px / 720. Tinggi teks = tinta baris (kapital/ascender sampai descender bila ada).

## Per frame kunci (keyframes/)
| File | t (dtk) | Ukur |
|---|---|---|
| 05-k1-poster-3d | 0,5 | poster oranye `#D76730` 10,2 % piksel; poster ±46×36 % (dari frame gabungan); luma pusat 55 / sudut 12; teks tidak terukur (miring, blur) |
| 05-k2-ui-post-neon | 6,0 | latar `#E8E8E8`/`#EEEEEE`; neon hijau `#5DB903`, merah `#C04E1E`; chrome IG baris 4,45 % (blok akun+like) dan 2,1 %, 1,6 % |
| 05-k3-iphone-meja | 8,0 | iPhone bbox 83×82 % pusat (42 %, 59 %) (gelap < 70); 7,4 dtk ±66×66 %; balon 3 baris blok 21,9 %; kayu `#F3B578`; luma pusat 113 / sudut 139 |
| (jam) t11.8 | 11,8 | "They can't" y337–463 (9,9 % blok), "steal" y477–583 = 8,36 %, "can't" y433–463 = 2,42 %; teks `#654B44`; latar `#151619`; luma 48/25; meja+buku y742–940 |
| 05-k4-notes-putih | 14,6 | "Idea" y485–548 = 5,00 % x 13 %; "You woke up to write d" 3,05 %; status bar 1,33 %; latar `#FFFFFF` |
| 05-k5-kartu-daftar | 18,5 | 3 baris y316/512/709, tiap 3,67 %, jarak 15,4 %; kartu 77×50 % pusat (62 %, 42 %); ikon biru `#0C8FFF`; latar `#EEEEEE` |
| (kalimat) t21.0 / t26.5 | 21 / 26,5 | "But brands can't" y619–660 = 3,28 %, lebar 54,7 %, pusat (49, 50); "You'll keep moving." 5,16 % (dgn descender), lebar 81,5 %; bintang `#00FD6C` 12,7 % piksel |
| 05-k6-kinetik-tumpuk | 23,0 | baris hijau 9,22 / 9,06 / 9,22 % (satu run 20,6 % = 2 baris menyatu); jarak ±140 px = 11 %; hijau `#0C5B29` 10,1 % piksel, abu `#BABABA`, latar `#ABABAB`; luma 178/161 |
| 05-k7-judul-gelap-tebal | 25,0 | "THEM" y626–830 = 16,0 %, lebar 56 %; garis tipis y600–609 (tepi INNOVATING); latar `#101A21`; luma 183 (teks) / 15 |
| 05-k8-clapper-cta | 35,5 | "Visit now" y526–617 = 7,19 % lebar 66 %; "download it" 4,30 %; "&" 0,55 %; x mulai 88–90 px (12 %); clapper 77×28 % pusat (50 %, 25 %); latar `#181612`; luma 96/11 |
| (drafts) t28.5 | 28,5 | latar `#001013`, letterbox `#000000`; judul di footage 3,12 % + 5,31 % |

## Cut & kamera
- Hard cut (diff piksel > 90 atau Bhattacharyya > 0,5): 4,93 · 7,33 · 11,27 · 13,20 · 23,73 · 24,83 · 25,93 · 26,93 · 30,30 (+1,60 whip). Transisi lunak: 5,3 · 15,27 · 20,57 · 22,33 · 30,3–31,1 (dissolve).
- `pace_read.py`: 11 cut = 18,2/menit, median 2,2 dtk, gerak layar 9,2, event 66/menit, 3,4 suku kata/dtk.
- Kamera (ORB + estimateAffinePartial2D tiap 3 frame, diakumulasi): 0–1,57 ×2,01 rot +22° · 1,6–4,93 ×1,60 rot −46° · 4,97–7,33 ×1,64 (pull lalu push; neto) · 7,37–11,27 ×1,05 tx −111 %W · 11,3–13,2 ×1,06 · 13,23–16,3 GAGAL (UI putih, fitur sedikit) · 16,3–20,3 ×1,26 tx −80 %W · 20,3–22,3 ×1,88 · 22,33–23,7 ×1,53 · 23,73–24,83 ×1,13 · 24,9–25,93 ×0,99 · 25,97–26,93 ×0,89 · 26,97–30,3 ×0,54 tx −97 %W · 30,43–36,1 ×0,62.

## Audio
- ebur128: −14,4 LUFS, LRA 1,6 LU, true peak −2,1 dBFS. RMS per 3 dtk −16,3 s.d. −18,5 dB.
- librosa: 136 bpm (beat_track), 183 onset (5,06/dtk), centroid median 1828 Hz, harmonik/perkusif −1,1 dB.
- earshot `timeline --detail high`: lengkap di `skrip/earshot-timeline.txt` (217 event, 96 berlabel, pulse clarity 0,06, sinkron cut 93 % dalam 100 ms).

## Skrip (salinan di `skrip/`)
- `cuts.py` (diff piksel + histogram per frame), `cam.py` (gerak kamera per shot), `txt.py` (run baris teks per mode warna dalam kotak), `col.py` (hex median 12×12 px, luma pusat vs sudut 80 px).
- ffmpeg: fps=2 → `frames/`, scene detect 0,25, ebur128; `pace_read.py`; earshot; librosa.

## Batas ketelitian
- 720p: 1 px = 0,078 % tinggi; kata kecil (< 2 %) bisa meleset ±10–15 %.
- Ukuran teks bergantung saat kamera push: angka adalah nilai di frame kunci, bukan ukuran tetap. Teks miring (poster, playlist, judul tebal) diukur sebagai tinggi bbox, bukan tinggi huruf asli.
- Gerak kamera dari akumulasi antar-frame: drift besar pada adegan putih/teks; pakai sebagai arah dan orde besaran.
- Skala poster, gambar post IG, "Let", balon: perkiraan visual dari frame gabungan (ditandai ±).
- Label earshot = tebakan CLAP; level SFX terhadap VO/musik tidak terpisah (tanpa stem).
