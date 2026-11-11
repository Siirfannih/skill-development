# 27 · Story video — data ukur mentah (11 Nov 2026)

Sumber: `Story video.mp4` · 960×720 (4:3) · 30 fps · 111,2 dtk · AAC 44,1 kHz stereo. Semua % terhadap frame 960×720.

## Skrip
- `ffmpeg fps=1` → `frames/f%03d.jpg` (f001 = 0 dtk); sheet 1 dtk `work/sheet1s.jpg`; `sheet.jpg` (1 per 2 dtk, 8 kolom, sel 400×300).
- `work/measure.py`: masker kuning (R>170, G>200, B<140, G−B>90) → proyeksi baris = tinggi baris teks, bbox x, median warna.
- Proyeksi kolom pada 4–6 kolom per frame (run vertikal kuning) untuk tinggi huruf per kata saat baris saling tumpuk.
- `work/cam.py`: ORB 1500 titik + `estimateAffinePartial2D` (RANSAC 3 px) antara frame awal dan akhir tiap shot → skala, dx, dy.
- Bbox isi vs warna tepi (selisih RGB > 70, opening 9 px); luma tengah vs sudut; std high-pass (σ 3) = grain.
- Hitung piksel kuning per frame 30 fps → cara teks masuk (lompatan per frame).
- `ffmpeg scene` 0,25 (38 titik) dan 0,12 (77 titik), dikurasi manual ke 34 shot; `pace_read.py`; `ebur128`; librosa beat_track per babak; earshot timeline; ears.py.

## Frame kunci
| Frame | t (dtk) | Ukuran |
|---|---|---|
| k1 wajah-teks | 5,3 | blok teks x 49–98 %, y 14,6–83,9 % (tinggi blok 69 %), pusat (73, 49); AKU ±14,5 %, JUDI 15,4 %, ONLINE 15,6 %, PENGEN/NYOBA ±9–13 % saling tumpuk (leading negatif, baris menimpa 20–40 %); kuning `#D7FF0C`; latar footage median `#2C230B`. Wajah: x 0–55 %, terpotong atas-bawah (lebih dari 100 % tinggi). |
| f004 | 3 | AKULAGI/NGANGGUR/& blok x 45–100 %, y 33–65 %, tiap kata ±7–9 % |
| k2 kartu-judul (f010) | 9 | MENCOBA ±30 % (condensed), JUAL 15,4 %, DIRI 8,9 %, ON-LINE 34,1 %; tepi ±1,5 %; latar `#124817`–`#21561A`, kuning `#D4F42A`; grain std 2,4 |
| f014 / f016 kartu merah | 13 / 15 | ON- 24,2 %, LINE 23,3 %, YA. 15,7 %, ONLINE 24,4 % · JUDI ONLINE 14,6 %, ≠ 16,7 %, JUAL DIRI DI 11,9 %, MEDIA SOSIAL 12,1 %; latar `#E44C20`–`#E45622` |
| k3 cutout-hijau | 23,3 | foto 59 % lebar × 98 % tinggi (x 24–83), miring ±3°; latar `#095E03` rata (grain std 0,09 = bersih); subtitle y 85,3–88,6 %, pusat (50, 86,5), lebar 29 % |
| k4 dialog-biru (f034) | 33,5 | letterbox: isi y 13–88 % (16:9 di 4:3); latar `#061D51`; baris 4,4 % (dengan glow; inti huruf ±3,6 %), jarak baris 6,3 %; tanya rata kiri x 4,9 %, jawab rata kanan x 94,7 %; lebar baris 25–55 %; kuning lebih redup `#B3D844` |
| k5 foto-kata (f039) | 38 | foto x 9–92 %, y 8–91 % di hitam; FRESH 13,9 %, GRADUATE 13,8 % (lebar 47 % / 82 %), pusat (50, 42–57); subtitle 3,5 % di y 86 % |
| f056 fisheye-teks | 55 | MEMBUKA DIRI 10,0 %, UNTUK MENERIMA 8,4 %, blok lebar ±92 %, y 32–69 % (menimpa wajah); vignette bulat: luma tengah 188, sudut 22 |
| k6 poster | 57,5 | poster x 16–84 %, y 4–95 % di hijau `#095C02`, tepi bercahaya |
| k7 broll | 77 | full-bleed, figur ±15 % lebar × 40 % tinggi, lensa lebar sudut rendah; latar `#3D5833`; luma tengah 105, sudut 91 |
| k8 ui-hp | 92 | layar HP miring 3D ±62 × 72 %, latar hitam `#020200`, luma sudut 9 |
| f095 profil | 94 | kartu putih-biru muda `#BBEFFB`, teks hitam, ikon IG/YT/WA |

## Teks masuk (piksel kuning per frame)
- Kartu: kata muncul dalam 1–2 frame (6,63→6,67; 7,30→7,33; 8,07→8,10), tanpa ease.
- FRESH GRADUATE: 1 frame (37,10). MEMBUKA DIRI / UNTUK MENERIMA / PEKERJ*AN: 52,50 · 53,17 · 53,53 · 53,87 · 55,03 per frasa.
- Dialog biru: naik tiap 2–3 frame (mesin ketik) dengan kedip ± tiap frame (glow/kursor berkedip).

## Gerak kamera per shot (skala %, dx %, dy %)
0–5,6 wajah: 0/0/0 (genggam, nyaris diam) · 17,0 b-roll +24,7 / +13 / +13 (dorong cepat 0,5 dtk) · 17,5 −17,4 (tarik) · 19,6 jalan setapak +20,7 (dorong) · 21,2 −5,3 · 23,8 cutout −21 / +11 / −6 (foto mengecil-geser) · 40,5 −11,3 · 58,5 poster ubin −33,1 (tarik) · 60,9 cermin −9 / +12 · 64,7 ruang gelap +6,2 / +3 / +6 · 71,7 −0,9 · 75,7 hutan +2,2 / +5,8 · 80,5 0 · 85,5 HP +4,9 / −7,9 / −4,2 · 96,2 kredit 0. Kartu, dialog, fisheye: "lemah" (bidang rata / fisheye, ORB gagal).

## Ritme
34 shot (kurasi), 32 cut gambar = 17,8/menit, shot median 2,1 dtk. `pace_read.py`: 36 cut = 19,4/menit, median 1,6 dtk, event visual 39/menit, bicara ±4,2 suku kata/dtk, kategori "energi", musik 100–140 bpm. Ledakan glitch 22,13–23,73 (10 titik scene dalam 1,6 dtk). Ledakan UI 89,1–94,8 (14 titik).

## Audio
ebur128: I −14,3 LUFS, LRA 5,5 LU (−17,4…−11,9), true peak +0,7 dBFS (clip). RMS per 3 dtk −15…−23 dB, paling pelan 27–36 (dialog biru 1) dan 90–96 (CTA). earshot low: I −14,5 LUFS, TP −0,3 dBTP, 756 onset (6,8/dtk), pulse clarity 0,05; bagian chiptune 0–5,65 · funk 5,65–14,25 · lo-fi 14,25–17 · funk 17–111; aksen: 5,57 hit/sub drop · 14,87 pop · 35,57 whoosh · 49,16 pop · 52,03 hit · 73,77 pop · 86,73/86,94 pop (+36 dB) · 96,28 cork pop · 98,60 snare. librosa bpm: babak buka 112, diri 118, tawaran 103, kredit 103 (campur suara, ±5 %). Onset 4,5–5,8/dtk.

## Batas ketelitian
- Sumber 960×720: 1 px = 0,14 % tinggi. Tinggi baris berasal dari masker kuning termasuk glow (+0,5–1 % dari tinggi inti huruf). Kata yang saling tumpuk dibaca per kolom: ±1,5 %.
- Font hanya dicocokkan mata; tidak ada metadata.
- Kamera: ORB gagal di bidang warna rata, fisheye, dan layar teks; angka affine pada shot pendek (<0,6 dtk) bisa tercampur gerak objek.
- bpm dari campuran suara+musik. `earshot --detail high` habis waktu (400 dtk, CPU dipakai sesi lain); dipakai `--detail low` (12 tag CLAP = tebakan). `ears.py` dihentikan setelah ±15 menit tanpa keluaran: instrumen per stem tidak terukur.
