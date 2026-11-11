# 57 · Motion with text: morph data-viz fintech (lime di atas hitam)

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> Sumber: unggahan Irfan, file `Motionwithtext.mp4` (kreator tidak diketahui; reference_id: belum ada) · 3:4 (720×960, 60 fps), 4,73 dtk, **tanpa trek audio** · Frame: `../../guide/referensi/sheets/57-motion-with-text.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/57-k*.jpg` · Bedah lengkap: `ukuran.md` (data ukur mentah)
> Kedalaman bedah: **dalam** (visual dan gerak diukur per frame 60 fps; SFX/musik tidak ada karena file tidak punya trek audio)

**DNA (satu kalimat):** Satu bentuk garis tipis yang terus berubah wujud (lingkaran → kotak → bar persen → dial) di tengah latar hitam hangat, dengan satu aksen lime yang mengisi bentuk saat angkanya bertambah.
**Cocok untuk:** angka produk fintech/SaaS (persen, saldo, match, APY), penjelas fitur, reel data 3–6 dtk · **Tidak cocok untuk:** cerita emosional, wajah/podcast, konten yang butuh foto/footage
**Kata kunci gaya:** minimal, data-viz, presisi, morph, flat, lime-on-black
**Diambil untuk:** "Motionwithtext.mp4" → motion graphic dan teks (dibedah paling dalam: morph bentuk, easing, ukuran teks, posisi label)

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Latar `#110E09` (hitam hangat kecokelatan, bukan hitam netral), rata dari sudut ke tengah: tanpa vignette, tanpa gradien.
- Panel isi `#1E1B16` (satu tingkat lebih terang dari latar). Track dial `#28251C`.
- Satu aksen: lime `#CEFF0A` (sampel 720p; tepi garis tipis terbaca `#91B714` karena anti-alias).
- Garis bentuk putih hangat redup (±`#D0CCC8` pada inti, 2–3 px = 0,3–0,4 % lebar).
- Teks: label utama `#D6D2D0`, nilai sekunder abu `#7B7873`–`#888481`, angka besar `#FEFCF9`; teks di atas lime gelap (hitam latar yang dicampur lime).
- Tekstur: tidak ada grain atau noise yang terlihat (simpangan piksel latar 3,3 = noise kompresi). Flat vektor murni.

### 2. Teks
- Font: neo-grotesk netral, paling mirip **Inter / Neue Haas Grotesk**, bobot **Regular** di semua ukuran (tidak ada bold, tidak ada serif).
- Dua ukuran saja: angka besar (kata kunci) 4,1–4,7 % tinggi frame ("53%" 45 px, "$67.00" 39 px) dan label 1,25–1,6 % ("Match", "2023", "APY", "$4,200"). Rasio **±3**.
- Tiap tampilan = pasangan label + nilai (1–2 kata), bertumpuk dua baris: label terang di atas, nilai abu di bawah.
- Posisi: label MENEMPEL bentuk, tidak pernah di luar susunan. Label total di pojok kanan-atas di dalam panel (x 76 %, y 24 %). Label bagian di pojok kanan-atas bentuk dalam. Persen di kiri-bawah tiap bidang, rata kiri dengan tepi panel (x 14 %): "65%" tepat di atas garis batas, "35%" di dasar bidang lime.
- Dial: label "Ira Match" kecil abu di atas nilai, nilai besar di pusat (x 50 %, y 51 %), angka skala 0/25/50/75 di empat arah di dalam cincin, pil tahun di bawah (y 82 %).
- Penekanan: hanya lewat warna (lime pada bidang dan pil tahun aktif) dan ukuran; tidak ada kotak sorot, garis bawah, atau bobot.
- Watak: teks muncul **sekaligus** bersama bentuknya, tidak per huruf/per kata. Angka **menghitung** (counter roll): 35→50 %, $0,00→$67,00. Label ikut bentuk saat morph (bergeser, tidak pudar).

### 3. Ritme
- 2 shot dalam 4,73 dtk (3,03 + 1,70 dtk), satu transisi geser. Cut/menit tidak bermakna untuk klip sependek ini.
- ±11 event gerak = ±140 event/menit. Pola: gerak cepat 0,1–0,4 dtk → diam 0,15–0,5 dtk → gerak berikutnya. Setiap tahap ditahan cukup lama untuk dibaca.
- Diam terukur: 0,35–0,55; 0,95–1,05; 1,95–2,25; 3,55–3,65; 4,2–4,45 dtk.

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- Tidak ada. 100 % grafik vektor.

### 5. Motion graphic
- Satu objek yang berubah wujud menggambarkan logika angka: total (cincin luar $42.000) dan bagian (cincin dalam $4.200) → jadi kotak bersarang (bagian di pojok kiri-bawah) → bagian diisi lime → bidang lime melebar penuh jadi bar persen 35/65 → naik ke 50/50 → geser keluar → dial "Ira Match" mengisi busur per tahun (2022→2023→2024), $0→$50→$67.
- Morph lingkaran → rounded square → kotak tajam (0,55–1,1 dtk), dua bentuk morph bersamaan.
- Easing sangat tajam (ease-in-out kuat): bidang lime melebar dari 45 % ke 82 % lebar dalam 0,1 dtk (1,65–1,75), ekor pelan sampai 1,95. Pola sama saat naik (2,35–2,6).
- Isi lime muncul tiba-tiba dalam 1 frame (1,23 dtk), bukan fade.
- Pil tahun aktif melompat seketika; busur dial tumbuh mengikuti counter.
- **Skala subjek:** SATU subjek besar di tengah. Panel 75 × 56 % frame (persegi 540 px, pusat 50/50). Cincin awal 72 % lebar. Dial 64 % lebar × 48 % tinggi, pusat y 55 %. Margin kiri-kanan ±12 %.
- **Kedalaman:** 2 lapis datar (latar + panel/garis) + teks. Tanpa bayangan, blur, glow, atau paralaks.

### 6. Kamera & transisi
- Shot 1: kamera diam. Pembesaran awal 0–0,3 dtk (+4 % lebar, ease-out) adalah skala objek, karena label hampir tidak bergeser.
- Transisi 2,7–3,55 dtk: **geser horizontal (push)**. Panel keluar ke kiri dengan percepatan (ease-in, ±5 % dalam 0,3 dtk), lalu dial masuk dari kanan (offset +10 % → 0) dengan perlambatan 0,5 dtk. Tanpa motion blur, tanpa whoosh, tidak dipicu kata.
- Akhir 4,45–4,73 dtk: **push-in kamera** ±+9 % yang makin cepat, terpotong di akhir. Kemungkinan zoom-through ke klip berikut.

### 7. SFX
- Tidak terukur: file tidak punya trek audio (ffprobe hanya menemukan stream video).

### 8. Musik
- Tidak terukur: tidak ada trek audio.

## Proporsi terukur (11 Nov 2026, dari video sumber 720×960; % terhadap frame)
Rinci per frame kunci: `ukuran.md` (folder ini). Frame kunci: `keyframes/57-k1…k7-*.jpg`.

| Jenis adegan | Kata kunci (% tinggi) | Kata sambung/label | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| Cincin bersarang (k1) | tidak ada angka besar | 1,25–1,56 % | label di kanan-atas tiap cincin, menempel garis | cincin 72–75 % lebar | latar + garis 2–3 px |
| Morph bentuk (k2) | tidak ada | 1,35–1,56 % | label ikut bentuk | 75 × 56 % | latar + garis |
| Kotak bersarang (k3) | tidak ada | 1,25–1,56 % | pojok kanan-atas panel (x 76, y 24) dan pojok bentuk dalam | panel 75 × 56 %, bagian 28 × 21 % kiri-bawah | latar + panel `#1E1B16` |
| Bar persen (k4) | 4,6–4,7 % ("65%", "35%") | 1,25 % | kiri-bawah tiap bidang, rata kiri x 14 % | bidang lime 75 × 21 → 28 % | panel + bidang lime |
| Transisi geser (k5) | 4,7 % | 1,25 % | ikut panel | panel geser ke kiri ±5 % | sama |
| Dial (k6) | 4,1 % ("$67.00") | 1,46–1,67 % | nilai di pusat, label di atasnya, skala di 4 arah, pil di bawah (y 82) | cincin 64 × 48 %, pusat y 55 | latar + track `#28251C` + busur lime 3 px |
| Push akhir (k7) | 4,4 % (membesar) | ±1,6 % | sama | ±70 % lebar dan terus membesar | sama |

- Rasio angka besar : label **±3**; hanya dua ukuran huruf di seluruh video.
- Batas ukur: sumber 720p (1 px = 0,10 % tinggi); label kecil bisa meleset ±1 px (±8 %).

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Latar hitam hangat ±`#110E09`, rata tanpa vignette/grain; panel satu tingkat lebih terang (±`#1E1B16`).
- Hanya satu aksen: lime ±`#CEFF0A`, dipakai untuk bidang terisi, busur progres, dan pil aktif. Tidak ada warna lain.
- Satu subjek di tengah selebar 64–75 % frame, margin samping ±12 %. Bukan banyak objek kecil.
- Garis bentuk tipis 2–3 px per 720 (±0,35 % lebar), putih hangat redup, bukan putih murni.
- Satu keluarga neo-grotesk Regular; angka besar 4–5 % tinggi, label 1,25–1,6 %, rasio ±3, tanpa ukuran perantara.
- Label menempel di pojok bentuk (kanan-atas untuk nama/nilai, kiri-bawah untuk persen), bukan melayang di luar subjek.
- Flat: tanpa bayangan, glow, blur, atau tekstur.
- Gerak: bentuk berubah wujud (morph), bukan diganti cut. Easing tajam dengan diam 0,15–0,5 dtk di antaranya; angka menghitung.

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
