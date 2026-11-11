# Kartu 18 · Tambahan ukuran: proporsi teks, skala subjek, kedalaman

Sumber: `~/work/_downloads/g9xoKm5DEeU/video.mp4` (1280×720, 30 fps), 17:56–18:53, frame tiap 0,5 dtk (114 frame, `frames/f_NNN.jpg`; ts = 17:56 + (NNN−1)×0,5 dtk).
Panel 9:16 dalam video: x 442–837, y 8–711 → **396×704 px** (tepat 9:16). Semua % terhadap panel. 1 px = 0,14 % tinggi; ×19,2 = px di 1080×1920.
Tinggi huruf = puncak huruf tertinggi sampai garis dasar (descender g/y/p tidak dihitung). Kata tanpa ascender (careers, secure) = tinggi-x, ditandai ˣ.
Skrip: `scripts/measure_text.py`, `scripts/measure_scene.py`; data kotak teks: `text_boxes.json`; overlay cek: `crops/ov*.png`.

## Tabel per jenis adegan

| Jenis · frame kunci (ts) | Kata kunci % tinggi | Kata sambung % | Rasio | Lebar blok % · pusat (x,y) | Posisi teks thd subjek | Subjek utama (t × l % panel) | Kedalaman (lapisan, buram/redup, tekstur) | Latar / aksen (hex) |
|---|---|---|---|---|---|---|---|---|
| Wajah + caption · `18-k1-wajah-caption.jpg` f016 (18:03,5) | "transitories" 6,0 · "four" 8,8 (f003, 17:57,0) · serif "brutal." 4,7 (f071) | 1,6–1,9 ("There are" 1,85) | 3,2 (sans) · 5,2 ("four") · 2,5 (serif) | 69 · (50,58); rapat f071: 33 · (49,69) | Di bawah dagu, menumpuk di dada/mik; sambung kecil di kiri-atas kata kunci | Lebar: kepala 36×34 (grid ±5 px), satu orang; rapat f071: kepala ±60 t, >85 l | 2 lapis + teks. Latar tidak lebih buram dari wajah (Laplace 103 vs 106); tepi gelap: sudut L 58 vs tengah 109 | jendela #92989A; teks putih |
| Lukisan + teks · `18-k2-lukisan-teks.jpg` f027 (18:09,0) | serif italic "San" 7,1, "Diego." 5,4 · sans "Same job" 3,3 + kotak biru "42 years" 4,3 (f037) | 1,4–1,6 | 4,5 (f027) · 2,3 (f037) | 37 · (74,35); f037: 40 · (72,29) | Di samping: kolom kanan di dinding kosong, setinggi kepala tokoh; f037 + panah tipis ke tokoh | Pasangan 81×59 (grid); f037 tokoh 76×68. Satu subjek besar, terpotong tepi | Lukisan full-bleed; dinding latar halus (Laplace 9 vs wajah 70); sudut L 36/19 vs tengah 48 (vignette); tekstur cat std 2,5 | dinding #615543; kotak #2C79DD |
| Garis + teks · `18-k3-garis-teks.jpg` f106 (18:48,5) | "agility" 9,8 · serif "steady." 4,7 (f033, latar gelap) | 1,6–1,85 | 5,3 · 3,0 (f033) | 63 · (51,50); f033: 51 · (48,51) | Garis biru datang dari bawah, berhenti di bawah kata kunci; sambung kiri-kanan di garis tinggi-x atas | Tidak ada subjek; garis biru stroke 27 px = 6,8 % lebar; f033 garis putih 2 px + bola Ø 1,7 % t | 2 lapis (kertas + garis/teks). Kertas: tengah L 251 vs sudut 233; grid titik halftone (std 6,2) | kertas #F4F2F5; garis #0F69DF; gelap #111111 |
| Grafik · `18-k4-grafik.jpg` f010 (18:00,5) | "careers." 3,1ˣ (≈4,2 setara cap) | 1,6 ("go up and up") | 2,0ˣ | 38 · (69,34) | Kanan-atas ujung kurva, dihubungkan garis callout lengkung tipis | Kurva tangga 45×37, bola biru Ø 2,6 % t (4,5 % l); objek kecil, banyak ruang kosong | 2 lapis; latar hitam hampir rata (std 0,7), garis horizontal samar; sudut 10–27 vs tengah 20 | #121212; bola #3A71AD |
| Ilustrasi tengah · `18-k5-ilustrasi-tengah.jpg` f046 (18:18,5) | "secure" 3,7ˣ (≈4,9) · "spirals" 5,7, "7 to 12" 6,25 (f055) | 1,6 · "Because it was" 2,6 | ±2,3–3,6 | 86 · (50,31); f055 atas 40 · (50,24) + bawah 76 · (50,87) | Mengelilingi kepala figur (kiri-kanan bahu, judul di atas); spiral: atas & bawah | Figur biru 62×61, pusat (45,68), separuh bawah; spiral 36×61 di tengah. Satu subjek besar | 3 lapis: kertas + halo biru muda buram di belakang kepala + figur bertepi kasar; kata kedua buram saat masuk | kertas #E2E1F0–#F4F2F5; figur #132CBD; spiral #7682D4 |
| Ilustrasi samping · `18-k6-ilustrasi-samping.jpg` f093 (18:42,0) | "10" 7,2 ("10 years,") | 1,3–1,7 | 4,3 | judul 50 · (49,24); label di cincin | Judul di atas; 3 label pilihan mengelilingi cincin orbit (kiri, atas, kanan) | Potret pembicara 57 t, terpotong kiri-bawah; cincin ±50 % l. Satu subjek besar | 2 lapis + cincin tipis; potret halftone biru; latar biru tengah L 89 vs sudut 67 | #193ECE |
| Objek + teks · `18-k7-objek-teks.jpg` f075 (18:33,0) | "PhD" biru 8,1 · "scientist," 5,5 · serif "French horn" 3,4 (f069) | 1,85–2,3 | 3,6 · 3,0 | 62 · (50,52) | Mengapit: kalimat di atas foto, kata kunci di bawah | Foto 31×60 di tengah; f069 dua foto 34×41 dan 26×56, bertumpuk silang | Kertas + foto bertepi lurus sedikit miring; kertas halftone (std 10,5); sudut 242 vs tengah 245 (hampir tanpa vignette) | #F0F0F2; PhD #6988EA (tepi di-anti-alias) |
| Teks biru · `18-k8-teks-biru.jpg` f100 (18:45,5) | "entrepreneurial" 4,8 · serif "life" 7,7 (buram) | 2,0 | 2,4 · 3,9 | 82 · (48,52) | Tanpa subjek; kalimat di tengah dengan tanda kutip | — | 1 lapis + teks; vignette radial kuat: tengah L 60 vs sudut 25; datar (std 0,5) | tengah #233993, sudut #0C1644 |
| (B-roll, di luar 8 jenis) f058 (18:24,5) | "their" 6,0 | 1,6 | 3,8 | 72 · (51,76) | Di bawah, di lantai/area gelap | Sosok kecil ±21×18 | Sudut hitam L 5, sosok tajam (Laplace 174 vs tepi 7) | #060505 |

## Cek kemiripan (baru, dari still)
- Kata kunci sans bold 6–10 % tinggi panel (serif italic 4,5–7,5 %); kata sambung 1,5–2,3 %; rasio kunci:sambung **≥ 3** (A-roll sans 3–5, serif 2,5–4,5).
- Kata sambung semuanya satu ukuran (±1,6–1,9 %), tidak ada ukuran tengah antara sambung dan kunci.
- A-roll: blok caption di 55–70 % tinggi (di bawah dagu, di atas tepi bawah 25 %), pusat x ±50 %.
- Lukisan/foto tokoh: blok teks lebar ≤ 40 %, ditaruh di ruang kosong samping kepala (pusat x 70–75 %, y 30–35 %), bukan di tengah.
- Ilustrasi/objek: satu subjek 55–62 % lebar panel; ilustrasi duduk di separuh bawah (pusat y 65–70 %), teks memakai sepertiga atas.
- Garis biru tebal ±7 % lebar panel (bukan garis rambut), selalu berhenti tepat di bawah kata kunci; di latar gelap garisnya putih 2 px + bola biru Ø ±2 %.
- Latar kertas: putih dingin #F0F0F2–#F4F2F5 dengan titik halftone terlihat dan sudut sedikit lebih gelap (±7 %); latar gelap #111111–#121212 nyaris rata.
- Adegan biru penuh: vignette radial kuat (sudut ±40 % kecerahan tengah); biru jenuh #193ECE untuk ilustrasi, biru tua #233993→#0C1644 untuk teks penutup.

## Tidak terukur dan sebabnya
- Ukuran font dalam pt/px asli: sumber 720p dan panel hanya 704 px tinggi; ±1 px = ±0,14 %. Kata kecil (9–15 px) error relatif ±10 %.
- Tinggi-x → tinggi cap untuk "careers"/"secure": dikonversi dengan rasio Inter ±0,75 (asumsi, bukan ukur).
- Batas kepala/tokoh di A-roll dan lukisan: tidak tersegmentasi otomatis (latar mirip warna kulit/cat), dibaca dari grid 50 px (±5 px).
- Blur latar A-roll: nilai Laplace tergantung isi latar (jendela bergaris), jadi "tidak lebih buram" hanya untuk f016.
- Beberapa frame sedang dalam animasi masuk (panel sedikit mengecil, kata kedua buram), sehingga ukuran bisa ±3 % lebih kecil dari keadaan diam.
- Hex aksen biru bervariasi (#0F69DF–#2C79DD untuk garis/kotak, #6988EA untuk teks tipis) karena kompresi YouTube dan anti-alias tepi huruf.
- Ilustrasi samping murni (tokoh di satu sisi, teks di sisi lain) tidak ada di potongan ini; k6 memakai potret + cincin orbit (paling dekat).
