# REPORT r3a · Editor A · mesin + babak 1–2 (B01–B13)

Still: `qc/stills_r3a/r3a_<label>.png` (skala 0,5; 40 still) · lembar: `qc/r3a_sheet.jpg`.
Label → frame: B01a 30 · B01b 52 · B02 90 · B03 150 · B04a 175 · B04b 224 · B05a 240 · B05b 266 · B05c 281 · B06a 306 · B06b 335 · B06c 395 · B06d 440 · B07a 456 · B07b 475 · B08a 500 · B08b 545 · B09a 582 · B09b 606 · B10a 770 · B10b 795 · B10c 830 · B10d 868 · B11a 900 · B11b 925 · B12a 975 · B12b 1030 · B12c 1047 · B12d 1058 · B13a 1085 · B13c 1095 · B13b 1150 · B14a 1250 · B14b 1300 · B14c 1380 · B15a 1420 · B15b 1460 · B17 1540 · B20a 1760 · B20b 1890.
Ukuran px LAYAR di bawah dibaca dari render debug `--props='{"fitDebug":true}'` (label per blok, frame 1:1, bundle sementara di scratchpad), bukan dari still resmi.
Perubahan mesin rinci: `ENGINE-CHANGES.md` (r3a). Tidak ada render penuh; `out/`, file Act3*/Act4*, BRIEF, PLAN tidak diubah.

| ID / Beat | Dikerjakan | Bukti (still) | Angka / gate | Menyimpang dari TASK? alasan |
|---|---|---|---|---|
| F-v1-01 · mesin, babak 3 | `theme.ts`: `dark0 #0E0E10` → `dark1 #1B1B1F` (DarkWall linear), `accentDark #F4F4F5`, token `inkDarkDim #8E8E96`, `freshDark #B4B4BB`, `threadDark #C9CBD1`. `Print.Pin` gradien diturunkan dari `color` (tanpa #6F8DFF/#102480 tetap). `Wall` gelap: benang #C9CBD1, pin #6E6E76. K3 mesin nada gelap: kepala abu, kunci putih. | B15a, B15b, B17, B20a, B20b | Biru (hue 200–250°, S > 25 %, V > 0,15): B15a 0,00 % · B15b 0,00 % · B17 0,00 % · B20a 4,17 % · B20b 3,72 % (sisa = UI GitHub gelap + sorot `hiColor #6F8DFF` di `ui/GitHub.tsx`, bukan file r3a). | N dan K4 kecil nada gelap tetap putih (kontras di atas sisipan wajah). Q-r3a-03, Q-r3a-05. |
| F-v1-02 · mesin, ukuran | `TextLayer`: lantai px LAYAR (N/H/K4 kecil ≥ 56, K3/J/K4 besar ≥ 96) dari skala layar terkecil selama blok tampil (kamera Stage + z Layer, hook `useScreenScale`); ukuran dunia konstan. Terlalu lebar → N dipecah/diseimbangkan 2 baris, kunci K3 turun ke baris 2. | semua | B01-K3 97 · B04-N 56 · B04-K4 118/59 · B05-J 182, B05-N 57 · B06-N1 59 · B06-N2a 72 (min 59) · B06-N2b 76 (min 73) · B07-K4 177/68 · B08-N 58–73 · B09-N 58 · B10-N1 64 · B10-N2a/N2b 57 · B11-K4 141/61 · B12-Na 56 · B12-Nb 76–78 (min 65) · B13-N1 66 · B13-N2 ≥ 57 (tidak berubah) · B14-N2 ≤ 86 dan dalam safe frame setelah kamera B14 disetel (sebelumnya 103 px, keluar kanan). | B01: triad kini 2 baris (kunci di baris 2), PLAN "satu baris" (Q-r3a-01). K4 rasio turun bila kecil kena lantai (Q-r3a-02). |
| F-v1-03 · mesin + B04, B07, B09, B10, B11, B13 | `Face`: preset `M` mata (s 2,7), `T` mulut + tangan (s 2,2), `P` sisi (s 1,9), unsharp 3×3 untuk skala ≥ 2, grade `terang` kontras 1,16 / sepia 0,13 (hitam tidak abu). Urutan crop: B04 P (s 1,55) · B07 M · B09 T · B10 M · B11 P (s 1,8) · B13 T (cy 840). Pita teks: B04 tengah · B07 tengah-atas · B09 atas · B10 bawah · B11 atas-tengah · B13 atas. Teks di dinding kosong kanan yang dibuka crop, 20–40 px dari tepi kepala terjauh. Push B04/B11 berjangkar di teks (teks diam, wajah membesar menjauh). | B04a/b, B07a/b, B09a/b, B10a/b, B11a/b, B13a/c | Tidak ada dua sisipan berurutan dengan crop sama; tidak ada 3 pita sama berturut. B11 ujung kanan baris kecil 1747 px pada punch 1,09 (≤ 1755). B04 ujung kanan "gak semua orang" ≤ 1755 sepanjang push. | B04 memakai P longgar s 1,55 (bukan ≈ 1,9): kepala bergerak x 540→1200 di sumber dan K4 112 px butuh ±840 px dinding. Di B04a (5,8 dtk) kepala miring di tepi kiri sedikit terpotong (rambut/tangan). B13 T: mulut di tepi atas, hidung terpotong (mata keluar frame penuh). |
| F-v1-04 · B12 | Kamera mengikuti riwayat (f930–994) lalu push 1,9× ke kotak prompt (f994–1016, sebelum "investasi" f1015), tahan 1,96×; narasi "investasi waktu / pada AI." menempel di bawah kotak, rata kiri tepi kotak (celah ±38 px layar); logo OpenAI dicap di kanan judul (tidak menimpa judul), lalu terbang ke kepala sidebar saat kamera mundur ke 1,45×. | B12a–d | Kotak prompt 54 px desain × 1,9–1,96 = 103–106 px layar (9,5–9,8 % tinggi) saat "investasi waktu pada AI." (f1015–1056); teks di dalam kotak 34–35 px. | — |
| F-v1-05 · B06 | Kamera berpusat di pasangan foto + teks (x 872→880, zoom 1,15→1,5). "Memasuki usia" di samping foto; kalimat berikut dibagi dua tampil 2 baris di tempat yang sama. | B06a–d | Celah teks–tepi kanan foto 26 px dunia = 30–39 px layar (batas 0,15 W = 288 px); ujung kanan teks ≤ 1734 px di akhir push. | Kalimat N2 dipecah jadi dua tampil berurutan (Q-r3a-04). |
| F-v1-06 | B06: `PixelMosaic` ambang ≤ 0,85, pecah penuh 1 frame sebelum akhir → tidak ada kotak sisa. B05: kursor masuk setelah judul utuh (f250), berhenti di ujung kanan huruf terakhir (1688, 532), ragu, keluar frame tanpa klik (f271–287). B10: tepi atas frame selalu di atas bilah browser (y dunia −110), kamera bergerak linear sampai cut; halaman digulir 250 px f842–866 dengan frasa "banyak orang coba." ikut hasilnya. | B06a, B05a–c, B10b–d | B06a (f306): 0 kotak mosaik. B05b: kursor di ujung "…kan", tidak di tengah judul; hilang sejak f288. B10c/d: tidak ada thumbnail terpotong tepi atas frame (thumbnail 1 terpotong oleh header YouTube saat digulir). | Gulir halaman B10 tidak ada di PLAN (Q-r3a-06). |
| B14 (efek mesin, file sendiri) | Lantai membuat narasi B14 membesar saat kamera mundur ke 0,545×: pull mundur digeser f1300→1315 (selesai f1358, dulu 1345; benang ikut); foto Irfan di `WALL` x 2200→2120 dan B14-N3 x 2440→2362 supaya "Dan apa yang / sudah aku buat." (56 px) muat di kanan foto. Pose akhir B14 sama (1608, 875, 0,535) → sambungan ke B15 utuh. | B14a–c | B14-N3 56 px dalam safe frame; B14-N2 ujung kanan ±1620 px. | Di luar daftar F-v1, perlu karena mesin. |

## Babak 3–4 setelah mesin (dicek B15, B17, B20; angka debug juga B19, B21, B22)
- B15: gelap netral, benang abu terang, teks putih 66 px; tidak rusak.
- B17: palet netral OK, tetapi triad K3 (renderer lokal `K3Triad` di Act3.tsx) kini putih semua karena `C.accentDark` putih → "mempublikasikan" tidak lagi dibedakan. **Perlu Editor B: kepala pakai `C.inkDarkDim`.**
- B20: tata letak tidak rusak; K4 "atau" naik ke 56 px (96/56, rasio 1,7); "Dan gak pernah" (B20-N3, 66 px, tidak kena lantai) duduk tepat di garis bawah safe frame seperti sebelumnya. Sorot "Releases" masih biru `#6F8DFF` dari `ui/GitHub.tsx`.
- Lantai juga menaikkan B19-N1 (62 px), B21-K4a 105/58, B21-K4b 104/59, B22-N2 56: still-nya belum dicek (di luar cek r3a). Babak 4 (B23–B26) tidak dicek; K4 kecil di sana ikut naik ke 56 px.
- `Face` unsharp juga mengenai crop F1 (s 2,1) di babak 3.

## Gate (keluaran apa adanya)
`python3 claude/motion-graphic/scripts/juri/teks_cek.py projects/builder-trap-r2/qc/stills_r3a`
```
still dicek: 40
  GANDA  r3a_B10c.png                           kata 'dari' tampil di y 19%, 75%
  GANDA  r3a_B10c.png                           kata 'cara' tampil di y 32%, 75%
  GANDA  r3a_B10c.png                           kata 'kaya' tampil di y 33%, 75%
  TEPI   r3a_B10c.png                           'NEV' menyentuh tepi (x 0%–40%, y 32%)
  GANDA  r3a_B10d.png                           kata 'dari' tampil di y 19%, 40%
  GANDA  r3a_B10d.png                           kata 'cara' tampil di y 40%, 83%
  TEPI   r3a_B10d.png                           'tuk' menyentuh tepi (x 2%–7%, y 70%)
  GANDA  r3a_B17.png                            kata 'save' tampil di y 31%, 54%, 66%
ADA 8 TANDA: cek still-nya, perbaiki, atau tulis alasannya di qc/JURI.md
```
Semua tanda berasal dari teks UI asli (judul/thumbnail hasil YouTube, tombol dialog Threads "Save to drafts?"), bukan lapisan narasi.

`node scripts/cekkata.mjs 0 38.95` (dari `remotion/`): `kata dicek: 99 … SEMUA KATA TAMPIL TEPAT SEKALI DAN TERLIHAT SAAT DIUCAPKAN` (exit 0). Peringatan TAHAN: blok yang keluar di cut PLAN (bercatatan), B06-N2a (keluar f401, kata selesai f400; Q-r3a-04), B10-N2a (f854 vs f855, sudah ada sebelum r3a), B12-Na, B12-Nb (keluar di cut f1062, kata selesai f1056).

`npx tsc --noEmit`: bersih.

Catatan berkas: still r3a dipindah dari `qc/stills/` ke `qc/stills_r3a/` (hemat disk; gerbang `final` butuh still baru di `qc/stills/`, dibuat Sutradara). Disk kosong ±1,9 GB.

Pertanyaan terbuka: QUESTIONS.md Q-r3a-01 … Q-r3a-06 (6).
