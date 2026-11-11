# 20 · Calendar & travel "Merantau" (kertas, waktu, keberangkatan)

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> Sumber: `siirfannih_Dd6SAbAp5JP.mp4` (folder asal: Motion; kredit di layar: Motion Design "Dyanee", musik "Ian post – Arisaig") · 16:9 (1280×720), 24 fps, 47,1 dtk · analisis asal: canvas-skill-library, reference_id LOC-1c4957b3c919 · Frame: `../../guide/referensi/sheets/20-calendar-travel.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/20-k*.jpg` · Bedah lengkap: `canvas-skill-library: skills/canvas-reference-director/references/cards.json (reference_id LOC-1c4957b3c919)`; data ukur: `ukuran.md`
> Kedalaman bedah: **dalam** (frame tiap 0,5 dtk, ukur piksel, kamera ORB, ebur128 + earshot + librosa; batas: 720p, SFX tidak dipisah dari musik)

**DNA (satu kalimat):** Cerita merantau tanpa satu kata narasi: halaman kalender 3D bersih berganti tahun, tanggal dilingkari merah, jam, pintu, lalu kertas yang sama terlipat jadi pesawat kertas yang berubah menjadi pesawat sungguhan, ditutup judul tulisan sambung di langit biru-abu.
**Cocok untuk:** pembuka/teaser cerita perjalanan, pindah kota, pergantian tahun, metafora waktu tanpa VO · **Tidak cocok untuk:** info dengan tanggal literal wajib, video penjelas padat kata, talking head
**Kata kunci gaya:** 3D bersih, metafora benda, kertas, cahaya hangat, puitis, tanpa narasi
**Diambil untuk:** `siirfannih_Dd6SAbAp5JP.mp4`: nama tidak menyebut bagian; lihat bagian terkuat (5. motion graphic: rantai metafora kertas → pesawat; 6. transisi lewat benda; 2. tipografi angka tahun raksasa). Folder asalnya "Motion".

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Kalender: kertas ±`#E4E4E4` dengan gradien cahaya hangat dari kanan-atas, angka arang `#373737`, satu aksen merah `#B33E44`–`#B73A43` (Minggu + lingkaran tanggal); merah kembali sebagai koper `#9F5142`.
- Babak rumah (0–15 dtk) gelap-hangat: dinding `#18181B`–`#25262B`, sorot cahaya kuning `#D1D09E`, pintu kayu `#4E493D` di dinding wajik `#867648`.
- Babak berangkat (17–30 dtk) terang berkabut: langit `#E9E1D6`–`#FAF6DF`, lens flare di cakrawala, partikel debu.
- Babak judul: biru-abu `#60708A` di kiri, sinar diagonal `#A8AEBD`–`#D1D3DD` di kanan.
- Epilog: pintu yang sama dibuat abu `#393939` (tanpa warna) = rumah ditinggal.
- Tanpa grain (std high-pass area rata 1,3); render 3D bersih, cahaya bersudut dan vignette dari pencahayaan, bukan filter. k1 luma pusat 166 vs sudut 37; k4 242 vs 103.

### 2. Teks
- Hampir tanpa teks: teks hanya isi kalender dan judul + kredit di akhir. Tidak ada caption, tidak ada narasi.
- Angka tahun: sans geometris tebal (paling mirip Poppins Bold/SemiBold), digit 35–38 % tinggi frame, dua baris "20/26" bertumpuk mengisi kiri (x 1–39 %). Kisi tanggal sans geometris regular 4,3 % → rasio ±8,5×. Nama bulan kecil di atas kisi.
- Close-up kisi: angka 9–10 % tinggi, miring mengikuti kertas; penekanan = lingkaran merah coretan tangan di "20" (bukan bold, bukan kotak).
- Judul "Merantau": script tipis gaya pena (paling mirip Great Vibes/Allura), putih, tinggi badan 12,4 %, lebar 32,7 %, pusat (25, 41) % = kolom kiri, sisi kanan dibiarkan untuk langit dan pesawat kecil.
- Kredit di bawah judul: mono light (label, 1,9 %) + mono bold (nama, 1,4–1,7 %), rata tengah terhadap judul. Rasio judul : kredit 6,5–9×.
- Watak masuk/keluar judul: fade + sedikit naik dari blur di bawah (31,5–33 dtk), tampil di tengah-bawah lalu pindah ke kiri-tengah (36–37 dtk), keluar fade (41,5). Pelan.

### 3. Ritme
- ±15 pergantian isi / 45 dtk ≈ 20/menit (cut keras 8 = 10,2/menit menurut `pace_read`), shot median ±2,6 dtk; event visual 28/menit.
- Babak 1 waktu (0–15,6 dtk): cepat, 8 pergantian (kalender 1–4 dtk per shot).
- Babak 2 berangkat (15,6–30 dtk): 7 pergantian lewat benda, beat masuk.
- Babak 3 judul (30–41,5 dtk): satu shot 11,5 dtk, paling lambat. Epilog pintu abu 3 dtk, hitam 2 dtk.

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- Tidak ada footage asli; semua adegan render 3D/ilustrasi bergaya low-poly bersih (kota siluet, gedung low-angle, jam, pintu, koper, pesawat).
- Benda menggantikan kalimat: kalender = waktu berlalu, tanggal dilingkari = hari berangkat, jam = menunggu, pintu = meninggalkan rumah, koper = berangkat, kota/pesawat = perjalanan.

### 5. Motion graphic
- Rantai metafora satu bahan: halaman kalender terlepas → kertas menyapu layar → terlipat jadi pesawat kertas → terbang di antara gedung → berganti pesawat sungguhan → jendela pesawat → awan + judul.
- Halaman kalender membalik diagonal berlapis (2,5–4,5 dtk), tahun 2025 → 2026.
- **Skala subjek:** satu subjek besar per adegan: tahun 35–38 % tinggi per digit (blok ±75 %), jam 40 % lebar × 70 % tinggi di tengah, koper 83 % lebar di sepertiga bawah, pesawat ±32 % lebar. Di judul subjek justru kecil: pesawat ±2 % + contrail.
- **Kedalaman:** 3 lapis tetap: depan gelap/bingkai (dinding jendela, bingkai jendela pesawat, badan koper), subjek, latar cahaya (langit senja, sinar diagonal). Latar sering diburamkan atau ditenggelamkan cahaya; lens flare dan partikel di depan. Lembar kalender berikut melayang di atas lembar aktif.

### 6. Kamera & transisi
- Kalender close: push +45 % sambil miring ±7° menuju "20" (7,0→8,5), lalu putar cepat +81° dan tarik −27 % keluar ke jam (8,5→9,3).
- Kota jendela: tarik pelan −7 % + geser vertikal. Kota low-angle: dolly maju ±5 %, putar −3°. Pintu dan awan: nyaris diam, cahaya yang bergerak.
- Transisi dipicu benda, bukan kata (tidak ada narasi): sapuan halaman, spin, kertas menyapu, lipatan, morph pesawat kertas → pesawat, bingkai jendela pesawat masuk, larut ke awan, fade ke hitam.

### 7. SFX
- Sedikit dan menempel transisi: swish kertas 2,7 dtk (+15 dB di atas musik), gemerisik kertas 3,7, tick-tock 9,6 (jam), ding/glockenspiel 12,1 dan 12,5, whoosh/reverse cymbal 15,4.
- Energi > 4 kHz naik 18–30 dB tepat di 2,5 / 4,5 / 12,9 / 15,5 / 17,0 / 20,2 dtk (transisi kertas).
- Level SFX relatif musik: Tidak terukur: SFX tidak dipisah dari musik.

### 8. Musik
- "Arisaig" (Ian Post): electric piano + glockenspiel/celesta + petikan senar, hangat; ±136 bpm (atau 68 setengah), G/C mayor (perkiraan chroma).
- Babak: 0–15,6 piano lembut tanpa beat; 15,6–41,9 beat lo-fi masuk (bersamaan kertas lepas); 41,9–47 pizzicato + tick-tock, lalu ekor 1,3 dtk.
- Mix −14,3 LUFS, true peak −0,7 dBFS, LRA 3,8 LU. Musik adalah satu-satunya suara utama.

## Proporsi terukur (11 Nov, dari video sumber; % terhadap frame 16:9)
| Jenis adegan | Kata kunci % | Kata sambung % | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| Kota di jendela (k1) | tanpa teks | – | – | jendela ±70 % lebar (perkiraan dari sheet, tidak diukur) | dinding gelap depan + kota + langit senja |
| Kalender tahun (k2) | digit 35–38 | tanggal 4,3 (±8,5×) | tahun kiri x 1–39 %, kisi kanan | angka tahun = subjek | kertas + cahaya hangat + lembar berikut di atas |
| Tanggal dilingkari (k3) | 9–10 | – | memenuhi frame, miring | kisi close-up | satu lapis kertas, gradien cahaya |
| Jam (k4) | tanpa teks | – | – | 40 × 70 %, tengah | gelap + sorot diagonal + jam |
| Pintu (k5) | tanpa teks | – | – | pintu ±20 % lebar kanan-tengah (perkiraan sheet) | dinding wajik + cahaya bersudut |
| Koper merah (k6) | tanpa teks | – | – | 83 × 28 % di bawah, gagang ke tengah | koper depan + flare + langit kabut |
| Pesawat (k7) | tanpa teks | – | – | ±32 % lebar, tengah | langit terang berkabut, bayangan |
| Judul script (k8) | 12,4 (script) | kredit 1,4–1,9 (6,5–9×) | kolom kiri, pusat (25, 41) % | pesawat ±2 % di kanan | latar biru-abu + sinar diagonal blur |

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Angka tahun sans geometris tebal setinggi 35–38 % frame per digit, ±8× tinggi angka tanggal di sebelahnya.
- Palet kalender: kertas abu-terang, angka arang, satu merah (`#B3–B7 3A–3E 43–44`) untuk Minggu dan lingkaran coretan tangan; merah yang sama muncul lagi sebagai benda (koper).
- Satu subjek besar per adegan (jam ±70 % tinggi, koper ±83 % lebar), bukan banyak objek kecil; kecuali adegan judul (pesawat ±2 %).
- Setiap adegan punya 3 lapis: depan gelap/bingkai, subjek, latar cahaya; cahaya bersudut/flare, tanpa grain.
- Pergantian adegan lewat benda (halaman, kertas terlipat, pesawat, bingkai jendela), bukan cut biasa ke teks.
- Hampir tanpa teks; judul satu kata script tipis ±12 % tinggi di kolom kiri, kredit mono 1,4–1,9 %.
- Babak gelap-hangat di rumah, terang berkabut saat berangkat, biru-abu di judul; epilog benda rumah jadi abu.
- Musik piano/glockenspiel hangat tanpa narasi; beat masuk saat benda mulai bergerak keluar rumah.

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
