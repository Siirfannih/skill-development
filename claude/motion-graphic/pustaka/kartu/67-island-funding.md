# 67 · Island "Series F $400M" (life.at.island)

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> Sumber: akun Instagram life.at.island (Island, perusahaan enterprise browser), file `pustaka-video/mac/life.at.island_Ddq_MPiIuKB.mp4` · 16:9 (1276×720, 24 fps), 21,1 dtk · Frame: `../../guide/referensi/sheets/67-island-funding.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/67-k*.jpg` · Bedah lengkap: `ukuran.md` (data ukur mentah)
> Kedalaman bedah: **dalam** (sumber 720p, tanpa suara narator; semua angka diukur dari piksel/audio, lihat `ukuran.md`)

**DNA (satu kalimat):** Pengumuman pendanaan tanpa narator: angka raksasa dan kata pendek di dalam SATU kartu bersudut bulat yang terus berubah ukuran, warna, dan isi, dengan sans tipis dan satu kata serif italic hijau, dipotong ketat ke beat glitch-hop 108 bpm.
**Cocok untuk:** pengumuman angka/milestone, launch produk, recap brand 15–30 dtk, intro video perusahaan · **Tidak cocok untuk:** talking head, edukasi bernarasi panjang, konten yang butuh banyak kalimat
**Kata kunci gaya:** editorial, premium, tenang-tapi-cepat, kartu, angka besar, Swiss
**Diambil untuk:** nama file "life.at.island": nama tidak menyebut bagian; lihat bagian terkuat. Bagian terkuat: **teks kinetik + gerak tata letak** (kartu yang berubah bentuk, angka raksasa, kata diulang), lalu ritme cut-ke-beat.

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Hanya dua warna dasar yang bertukar peran: hijau-hitam `#061613` dan putih hangat `#F9F3F3`. Babak 1 (0–5,9 dtk): kartu putih di bingkai gelap. Babak 2 (6–21 dtk): bingkai putih, kartu gelap atau footage.
- Satu aksen: hijau mint `#60DDB2`–`#67E6AE`, hanya untuk satu kata/angka per tampilan ("$6.4B", "agentic", angka statistik aktif).
- Kartu: inset 33 px di semua sisi (2,6 % lebar, 4,6 % tinggi), radius ±17 px (±2,4 % tinggi). Tidak ada bayangan, grain, atau gradien pada kartu.
- Footage: render padang rumput + meja kerja kosong, grade pudar dan sejuk. Langit `#7C97A2` di tengah, tepi `#64808B` (vignette ringan ±10 % lebih gelap), kabut `#ACB0B3` di cakrawala, rumput `#162418`.
- Garis rambut 1 px abu-abu sebagai pemisah baris dan garis penunjuk label.

### 2. Teks
- Font: sans grotesk geometris bobot **Regular** (mirip Aeonik/Suisse Int'l; pengganti gratis: Inter Display Regular), tidak pernah bold. Kata istimewa memakai serif italic sempit (mirip Instrument Serif Italic) dengan tinggi yang sama.
- Penekanan lewat **ukuran dan warna**, tidak lewat bobot: angka 15–42 % tinggi, label 1,5–4 %; kata istimewa diganti serif italic dan/atau hijau.
- Per tampilan: 1–2 kata ("$400M", "Series F", "$6.4B valuation") atau satu kalimat 5–6 kata dalam 2 baris ("The future of / work is on Island").
- Logo "◐ Island" kecil selalu menempel di atas atau di kanan kata kunci (2,9–6 % tinggi), seperti tanda tangan.
- Teks selalu di tengah horizontal (x 50 %), di tengah vertikal kartu atau sedikit di atasnya (y 40–55 %).
- Watak masuk: sigap. Angka berputar seperti counter dengan motion blur ($397M→$398M→$400M); kata muncul per kata dengan kalimat bergeser ke kiri supaya tetap di tengah ("The" → "The future" → "The future of"); angka muncul dulu sebagai titik halftone lalu padat. Keluar: zoom-through atau morph kartu, bukan fade.
- Kata diulang sebagai tekstur: "Series F" 5 baris, baris luar diburamkan, posisi bergeser diagonal.

### 3. Ritme
- `pace_read.py`: 7 cut = 19,9/menit, shot median 1,5 dtk, event visual 46/menit (gerak tata letak lebih banyak dari cut). ffmpeg scene ≥ 0,25: 9 perubahan.
- Babak: angka (0–5,9) → valuasi (5,9–7,6) → kalimat misi + statistik (7,6–15,8, satu-satunya bagian panjang 6 dtk dengan scroll bertahap) → tagline (15,8–18,3) → logo diam 2,7 dtk dalam hening.
- 65 % perubahan jatuh dalam 1 frame dari onset musik, 100 % dalam 100 ms (earshot).

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- Satu dunia footage saja: padang rumput tenang (render), muncul 3 kali: strip horizontal di belakang "Series F", langit polos di belakang "The future of", panel besar dengan meja kerja kosong.
- Selalu di dalam kartu/panel bersudut, tidak pernah full-bleed. Foto lain hanya di tumpukan kartu kecil ($400M) dan di kartu statistik aktif.
- Hubungan dengan teks: suasana ("future of work"), bukan ilustrasi harfiah.

### 5. Motion graphic
- Counter angka raksasa; tumpukan kartu foto di atas dan bawah angka (seperti dek, tepi buram); kata diulang + strip footage; grafik grid dengan label tahun 2022–2026 dan angka terpotong tepi kartu; kolom kartu statistik yang menggulir bertahap, kartu aktif berlatar foto + angka hijau, kartu lain pucat.
- Gambar menggambarkan kata secara tipografis: "Series F" (seri) jadi baris berulang; "valuation" jadi grafik; "largest companies" jadi daftar yang terus bergulir.
- **Skala subjek:** subjek = angka/kata. Satu subjek besar per tampilan: angka 17–42 % tinggi, "Series F" 20 %, "The future of" 20 %. Footage panel 62 % lebar × 91 % tinggi. Bukan banyak objek kecil, kecuali kolom statistik (tiap kartu 30 % lebar × ±25 % tinggi).
- **Kedalaman:** dua lapis datar (bingkai + kartu) di hampir semua adegan. Kedalaman palsu hanya lewat blur: baris "Series F" luar dan tepi tumpukan foto diburamkan. Tanpa bayangan, tanpa paralaks terukur.

### 6. Kamera & transisi
- Tidak ada gerak kamera pada footage (skala 1,000–1,005 per 0,5 dtk). Semua gerak berasal dari tata letak (ORB + affine antar-frame 0,5 dtk):
- Pull-back reveal: angka raksasa mengecil ×0,45 jadi "$400M" (0,5→1,0); "The future of" mengecil ×0,33 masuk ke panel footage (8,5→9,0).
- Push-in: "$400M" membesar ×1,72 (2,0→2,5); "$6.4B valuation" ×1,25 (6,5→7,0); zoom-through tagline ke logo ×2,6 (18,0→18,5).
- Morph kartu: kartu menyusut dari 95 % ke 55 % lebar (4,5→5,0), lalu warna terbalik (5,5→6,0).
- Geser: panel footage +16,6 % ke kanan saat kolom statistik masuk (9,5→10,0); ke tagline −16,7 % (15,5→16,0). Kolom statistik naik bertahap 2,6–8,3 % tinggi per langkah.
- Pemicu: beat musik, bukan kata (tidak ada narator).

### 7. SFX
- Menyatu dengan musik (tidak ada lapisan SFX terpisah yang jelas). earshot: 117 event (5,6/dtk), label: 42 drum, 13 foley/pop, 9 note/stab, 8 UI, 7 riser, 6 whoosh.
- Whoosh di transisi ke "Series F" (3,60–3,74) dan scroll statistik (12,39); riser/swell di 1,01 (masuk $400M) dan 17,98–18,56 (ke logo, −15 dBFS); stab kuat +30 dB di morph kartu (4,56) dan 13,29.
- Logo berdiri dalam hening 2,3 dtk (−61 LUFS).

### 8. Musik
- Glitch hop / elektronik dengan vocal chop, 108–109 bpm (librosa 107,7; earshot 109, pulse clarity 0,35), satu babak tanpa perubahan instrumen, berhenti di 18,75 dtk.
- Mix −14,0 LUFS, true peak −2,9 dBTP, LRA 6,1–7,7 LU. Tanpa narator, jadi musik mengisi penuh.

## Proporsi terukur (11 Nov 2026, dari video sumber 720p; % terhadap tinggi frame 720 px)

| Jenis adegan | Kata kunci (% tinggi) | Kata sambung / label | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| Angka raksasa (k1) | digit > 42 (terpotong tepi bawah kartu) | logo 4,9–6,1 (rasio ≥ 7) | logo y 43 %, angka y 53–95 % | angka lebih lebar dari kartu | 2 lapis + motion blur |
| Tumpukan foto (k2) | "$" 19, digit 16,9 | "Island Announcing" 1,9 (rasio ±9) | tengah, di antara tumpukan foto atas/bawah | angka 45 % lebar | kartu foto bertumpuk, tepi buram |
| Kata diulang + strip (k3) | cap 19,7 | logo 4,2 di kanan (rasio 4,7) | baris tengah y 40–60 %, strip footage y 37–63 % | 5 baris, bergeser diagonal | baris luar buram, strip footage |
| Grafik angka (k4) | "$" 37,6, digit 30–33 | label kecil di luar kartu + garis penunjuk | angka di kiri, terpotong tepi kanan kartu | kartu 55 % lebar | grid tipis + angka |
| Kartu gelap (k5) | cap 9,0 (saat push-in; ±7 sebelum) | x-height 6,9; logo 2,9 | tengah y 46–55 % | teks 48 % lebar | datar |
| Serif besar di langit (k6) | cap 20,0; serif italic 28,7 (asc+desc) | x-height 15,4 | tengah, y 39–68 % | teks 79 % lebar | langit polos |
| Footage + statistik (k7) | kalimat cap 6,7; angka statistik 15,0 | x 5,1; label statistik 1,5–2,2 (rasio ±7); logo 3,1 | judul di tengah panel y 42–60 %; kolom kiri 2,5–33 % lebar | panel 62×91 %, kolom 30 % | 2 panel + footage |
| Tagline (k8) | cap 6,8 | x 5,2; logo ±2,9 | 2 baris tengah y 43–61 % | teks 58 % lebar | datar gelap |
| Logo akhir | wordmark cap 8,1, simbol 10,6 | x 5,8 | tengah | 25 % lebar | datar gelap |

- Dua tingkat saja: **angka/kata pahlawan 15–42 %** dan **label 1,5–4 %** (rasio 5–9). Kalimat utuh duduk di tengah 6,7–6,8 % cap.
- Batas ukur: 720p (±0,14 % per piksel); frame diambil tiap 0,5 dtk sehingga ukuran pada adegan yang sedang zoom adalah sesaat.

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Ada kartu bersudut bulat (radius ±2,4 % tinggi) dengan inset sama di empat sisi (±4,6 % tinggi); latar di luarnya polos.
- Hanya dua warna dasar (hijau-hitam ±`#061613`, putih hangat ±`#F9F3F3`) yang bertukar peran; satu aksen mint ±`#60DDB2`, maksimal satu kata per still.
- Tidak ada teks bold; penekanan lewat ukuran, serif italic, atau hijau.
- Still angka: angka 15–42 % tinggi frame, label ≤ 4 %, rasio ≥ 5.
- Still kalimat: maksimal 2 baris di tengah, cap 6–7 % tinggi, satu kata serif italic.
- Logo kecil menempel di atas atau kanan kata kunci di hampir setiap still.
- Footage selalu di dalam panel bersudut (bukan full-bleed), grade pudar sejuk dengan tepi sedikit lebih gelap.
- Kedalaman hanya dari blur (baris ulang/tumpukan), tanpa bayangan jatuh.

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
