# 08 · Mosycreate "Motion.mp4": data ukur mentah (11 Nov 2026)

Sumber: `/home/irfan/work/pustaka-video/mac/Motion.mp4` · 960×720 (4:3) · 30 fps · 38,97 dtk · audio 48 kHz.
Semua % terhadap frame penuh 960×720 (tinggi 1 % = 7,2 px; lebar 1 % = 9,6 px). Frame konten berubah-ubah (kadang kartu ber-letterbox hitam 8–9 % atas/bawah, t 6,2 dan 13,4), jadi frame penuh dipakai sebagai acuan.

## Teks dan subjek per frame kunci (`scripts/ukur.py`, bbox piksel ber-ambang)
| Kunci | t | Elemen | x % | y % | tinggi % | lebar % |
|---|---|---|---|---|---|---|
| k2 | 4,0 | "You" bold putih / "lose" | 15–29 / 39–55 | 48–56 | 7,9 / 7,9 | 39,6 (blok) |
| k2 | 4,0 | thumbnail post inline (bingkai putus-putus) | 61–85 | 42–64 | 22,4 | 24,0 |
| k2 | 4,0 | panah putih kecil di bawah "You lose" | 31–36 | 64–69 | 4,6 | 5,2 |
| k3 | 4,7 | hero "IN YOUR" (pink gradien, blur gerak) | 0–100 | 28–72 | **44,6** | 100 (full-bleed) |
| — | 6,2 | "COLLECTION" hitam heavy | 15–93 | 45–55 | 10,3 | 77,7 |
| k4 | 7,6 | "But," bold / "what if" regular | 27–38 / 39–60 | 47–55 | 8,5 / 8,3 | 33,3 (blok) |
| k4 | 7,6 | ikon IG inline | 63–70 | 45–55 | 10,6 | 7,9 |
| — | 9,0 | "…had Save Reminders?" abu + bold | 2–51 | 50–55 | 4,9 | 49,6 |
| — | 9,0 | ikon bookmark+jam (garis) | 56–68 | 25–42 | 17,5 | 11,8 |
| k5 | 11,0 | kartu "Reminder" putih | 43–91 | 33–94 | 61,1 | 47,9 |
| — | 11,6 | bookmark 3D hitam | 10–62 | 6–61 | 55,8 | 52,1 |
| — | 11,6 | "And" (abu tua) / "done..!" (abu muda, blur) | 48–58 / 60–87 | 56–66 | 6,5 / ±6,5 (bbox 10,4 kena bayangan) | — |
| k6 | 13,4 | "Instagram's gonna" / "you" | 11–43 / 84–90 | 46–49 | **3,75** | 32,2 |
| k6 | 13,4 | notifikasi inline (dua kartu bertumpuk) | 43–83 | 42–52 | 10,4 | 39,4 |
| — | 14,5 | notifikasi besar (push dari k6) | 9–100 | 42–77 | 34,9 | 90,9 |
| — | 16,5 | kartu post feed (scroll) | 5,5–94,5 | 0–100 | 100 | 89,1 |
| k7 | 20,0 | foto "her" berbingkai membulat | 16–84 | 1,5–97 | 96,0 | 68,4 |
| k7 | 20,0 | caption "[that photo of her?]" | ±40–64 | ±93–96 | ±1,8 (huruf) | ±24 |
| k8 | 28,5 | "imher_" putih | 27–42 | 39–47 | ±3,5 (huruf; bbox 8,3 ikut avatar) | 14,8 |
| k8 | 28,5 | "Forever?" tulisan tangan kuning | 10–33 | 57–75 | 17,5 | 22,6 |
| — | 34 | "MADE BY A HUMAN" / "@mosycreate" / "An unofficial…" | 33–67 | 48–51 / 54–55 / 84–86 | 3,5 / 1,4 / 2,2 | 33 |
| k1 | 1,6 | coretan merah "Save it…" + panah | 44–71 | 69–85 | 16,7 | 26,8 |

## Warna (median potongan piksel)
Latar UI `#EDEDED` (t 6,2 / 9,0 / 13,4 identik) · teks UI `#363636` · gelap atas `#1D1D1D` → bawah `#713137` (gradien maroon, t 4,0) · celah "But," `#3A0411` + titik halftone magenta/ungu · hero pink `#F36C90`–`#EF5FB3`–`#F4799D` · biru tombol `#256CC7` · hijau toggle `#4EDC5F` · coretan merah `#C41321` · kuning "Forever?" `#DBCB31` · foto "her" `#C37A27` (terang) / `#63441A` (tepi) · vinyet t 28,5: tengah atas `#EEECE7` → bawah `#030302` · end card `#000000`.

## Kamera (`scripts/kamera.py`: ORB + estimateAffinePartial2D antar-frame 0,5 dtk; hanya pasangan inlier > 80 dipercaya)
- 1,0–2,0: push ×1,22 lalu ×1,07 ke tombol simpan, geser kiri-atas. 2,0–3,0: whip/blur (inlier 0).
- 7,0–8,0: pull ×0,66 lalu ×0,89 ("But, what if").
- 8,5–9,5: push ×1,20 → ×1,48 (total ±×1,77 dalam 1 dtk) ke ikon bookmark sambil pan kiri 16–37 %/0,5 dtk; 10,0–10,5 pull ×0,62.
- 13,0: diam (diff 2,8). 15,5–19,0: scroll vertikal murni (ty −6 … −59 %/0,5 dtk, skala 1,000).
- 19,0–23,5: foto nyaris diam (skala 0,98–1,01). 24,0–28,0: push kumulatif ±×1,64 ease-out (1,048→1,130 puncak 25,5 → 1,009).
- 31,5–39,0: diam total (diff 0,0).

## Cut dan ritme
- `ffmpeg scene>0,25`: 4 cut; `>0,10`: 11 kandidat (0,6 · 2,2 · 4,5 · 6,6 · 8,0 …). Banyak pergantian memakai blur/zoom sehingga skor scene rendah; daftar shot di kartu disusun dari sheet 0,5 dtk + diff antar-frame > 80.
- `pace_read.py`: cut 4 = 6,2/menit · median 2,1 dtk · gerak layar 7,2 · event visual 32/menit · usul musik 70–100 bpm.

## Audio
- ebur128: I −14,3 LUFS · true peak +0,3 dBFS · LRA 15,6 LU (low −28,5, high −12,9).
- librosa: 198,8 bpm (ganda → ±99) · 144 onset, 112 di 0–18 dtk · RMS/0,5 dtk −12…−20 dB (0–18 dtk) lalu −29…−41 dB.
- earshot (`earshot.txt`): −13,7 LUFS, TP −0,2 dBTP, LRA 19,3; 140 event 3,6/dtk (36 UI, 25 hit, 20 nada, 10 suara, 3 foley); seksi 0–5 tech house + vocal chop, 5–19,35 funk + VO, 19,35–38,9 piano elektrik sedih (−30/−27 LUFS); pulse clarity 0,11.

## Batas ketelitian
- Sumber 720p: 1 px = 0,14 % tinggi; tinggi huruf kecil (< 3 %) bisa meleset ±10 %. Bbox mengukur dari puncak ascender ke dasar (kata tanpa descender ≈ tinggi huruf kapital).
- Hero "IN YOUR" diukur di frame ber-blur gerak: tepi melebar ±1–2 %.
- Kamera: estimasi afin global; di adegan berisi objek bergerak sendiri (zoom-through, whip) angka skala tidak berlaku (inlier < 30).
- Font: perkiraan visual, tidak terukur dengan pencocok font.
