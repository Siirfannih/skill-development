---
id: "64"
pola: Stepped Label Poster Loop
kategori: typography
kategori_lain: [texture, layout]
trigger: kutipan satu kalimat dengan punchline di baris terakhir; kartu pembuka atau penutup bab; poster bergerak tanpa VO
sumber: KDS (koushik_kds) "I'M THE OPPOSITE OF AI" · 3:4 · 8,3 dtk, tanpa trek audio
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 64 · Stepped Label Poster Loop

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: akun KDS, file `koushik_kds_ssspin.io_1794368193.mp4` · 3:4 (720×960, 30 fps), 8,3 dtk, **tanpa trek audio** · Frame: `../../guide/referensi/sheets/64-koushik-kds.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/64-k1…k6-*.jpg` (k1 latar hitam, k2 sapuan ke putih, k3 latar putih, k4 sapuan ke hitam, k5/k6 tumpukan teks, crop 520×420)
> Video sumber: `/home/irfan/work/pustaka-video/unggahan/koushik_kds_ssspin.io_1794368193.mp4`
> Dilihat bergerak: **tidak** (bedah dari frame diam dan pengukuran 249 frame; bedah geraknya sebelum dipakai)

**Inti mekanik (1 kalimat):** Teks diam (judul di label putih bersambung dan bertangga + kotak berwarna berisi kalimat kecil) berada di atas latar yang bernapas: pita-pita persegi berpiksel menyala satu warna bergantian seperti gelombang dari kotak teks, membalik latar hitam ↔ putih tiap ±1,67 dtk dalam loop.
**Narrative trigger:**
- Kutipan atau pengakuan satu kalimat dengan punchline di baris judul ("aku kebalikan dari X") → T1
- Kartu pembuka, penutup, atau judul bab yang harus bergerak tanpa memindahkan teks → T2
- Post satu kalimat berulang (loop) tanpa VO → T2
**Jangan dipakai untuk:** naskah panjang ber-VO, demo UI, klip wajah, kalimat > 5 baris kecil.
**Kata kunci gaya:** brutalist swiss, poster, piksel, biru elektrik, loop, kontras keras
**Diambil untuk:** nama file "koushik_kds": tidak menyebut bagian; bagian terkuat: **latar gelombang piksel biru (motion graphic) + tipografi label bertangga**. Tidak diambil: logo KDS, palet biru-hitam-putih.

## Kondisi footage asli
- 3:4 vertikal, 100 % grafis; tidak ada footage, wajah, bayangan, atau vignette. Kamera diam.
- Blok judul 60 × 25 % frame di tengah sedikit ke atas (pusat 45 %, 46 %); 20 % bawah frame kosong kecuali pita latar. Logo kecil di tengah atas (y 4–6 %), hilang di latar putih.
- Latar bergantian hitam `#010101` dan putih `#FAFAFA`; label putih hanya terbaca di latar putih karena pita biru lewat di belakangnya.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Tiga warna: hitam `#010101`, putih `#FAFAFA`, biru elektrik `#2713E9` (kotak teks; terukur ulang `#2905E3`). Tangga biru di sapuan `#090780` → `#2013D5` → `#887EE4` (melebur ke putih lewat lavender, ke hitam lewat navy). Grain halus (std 2/255) + garis buram horizontal di dalam tiap pita (gradien beruntun seperti scan).
### Teks
Grotesk display Bold rapat (mirip Helvetica Now Display Bold), kapital, tracking negatif kuat; kalimat kecil grotesk Medium huruf kecil, leading rapat, rata kiri. Tinggi kapital judul 4,4–4,6 % (terukur ulang 44 px = 4,58 %), rasio judul : teks kecil ±3 (terukur 2,93×). Teks diam penuh 8,3 dtk, tanpa animasi masuk/keluar. Penekanan = ukuran + label, bukan warna.
### Ritme
0 cut. Loop 3,33 dtk (100 f) diulang 2,5×: hitam diam ±0,4 dtk → sapuan ke putih 0,8 → putih diam ±1,2 → sapuan ke hitam 0,7. Event latar 36/menit.

## Pola

### T1 · Stepped White Label Stack · typography
- **Trigger:** satu kalimat kutipan yang dipecah 3 baris dengan punchline di baris terakhir; penekanan lewat susunan, bukan warna.
- **Yang terlihat (termasuk gerak):** tiap baris judul ("I'M THE / OPPOSITE / OF AI") berada di label putihnya sendiri, tinggi label 8,4 % (≈ satu sel grid 80 px), label bersambung tanpa celah dengan tepi bertangga: baris 1 x 44–74 %, baris 2 x 15–56 %, baris 3 x 33–56 % (rata kanan dengan baris 2). Kotak biru kalimat kecil (22 × 13 % frame, pusat 67 %, 65 %) menempel di sudut kanan-bawah tumpukan (tepi atas = tepi bawah label, tepi kiri = tepi kanan baris 3), inset kiri dan atas ±20 px (periksa). Tidak ada gerak teks. (k1, k5, k6)
- **Kenapa bekerja:** teks dan latar memakai satu grid (label 81 px ≈ pita 80 px); label putih memberi kontras konstan di atas latar yang berganti.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): latar → pita biru → label putih (`<div>` per baris, `background:#fff`, tanpa padding vertikal) → teks → kotak biru + teks kecil.
  - Gerak: tidak ada; bila ingin masuk, label muncul per baris `CURVE.reveal` 6 f, selisih `react()`.
  - Ruang: datar. Blur & blend: tanpa blur/blend; tidak ada bayangan.
- **SFX:** senyap (file memang tanpa audio); bila perlu satu `Katapertama.mp3` di frame pertama.
- **Pakai bila:** 1–3 kata per baris, kalimat pendek. · **Jangan pakai bila:** kalimat yang harus terbaca cepat dengan > 5 baris kecil.
- **Remix (anti-jiplak):**
  1. Poster pengumuman produk UMKM → pertahankan label putih bertangga + kotak aksen di sudut · ganti kata dan satu warna aksen merek.
  2. Latar terang penuh → pertahankan label bersambung · ganti label jadi hitam dengan teks putih.
  3. 16:9 → pertahankan tangga rata kanan · ganti tumpukan jadi 2 baris, kotak di sisi kanan.
- *Pengamatan di video asli, bukan target:* blok judul + kotak 454×369 px = 63 × 38 % frame (kartu lama 60 × 37 %); pusat blok judul (44,5 %, 46,3 %).

### T2 · Pixel Band Wave Flip · texture
- **Trigger:** latar yang harus hidup tanpa menggerakkan teks; pergantian gelap ↔ terang pada kartu loop.
- **Yang terlihat (termasuk gerak):** latar = cincin persegi bertangga (pita 80 px, 11 % lebar / 8,3 % tinggi) yang menyala biru bergiliran seperti gelombang; tiap pita bergradien horizontal buram. Titik berat biru mulai dekat kotak biru (60 %, 59 %) lalu bergerak ke (41 %, 30 %) kiri-atas, latar baru muncul di belakangnya, jadi kotak biru terbaca sebagai sumber. Liputan biru 41–49 % di tengah sapuan, 2,5 % saat diam (hanya kotak teks). Perbandingan urutan waktu (sapuan dari arah kotak) belum diverifikasi bergerak. (k2, k4; 0,7–0,8 dtk per sapuan)
- **Kenapa bekerja:** teks diam sehingga seluruh energi ada di latar; pemicu internal (loop) bukan kata, jadi cocok tanpa VO.
- **Mekanik Remotion (titik awal):**
  - Lapisan: latar solid → grid pita (sel 80 px) → label + teks.
  - Gerak: nyala tiap sel tertunda menurut jarak ke kotak biru (`react()`), gradien horizontal per sel; sapuan 21–24 f `CURVE.whip`; hold 12–36 f; loop 100 f dengan `frame % 100`.
  - Ruang: datar. Blur & blend: gradien buram horizontal di dalam sel (`linear-gradient` + `filter: blur(6px)` searah sapuan); tanpa blend.
- **SFX:** senyap (file tanpa audio). Bila diberi bunyi: `Scanning dan gerak kurva.mp3` pada tiap sapuan, bukan per sel.
- **Pakai bila:** teks harus diam dan terbaca. · **Jangan pakai bila:** ada VO yang mengikat kata ke visual.
- **Remix (anti-jiplak):**
  1. Penutup video SaaS → pertahankan gelombang dari satu sumber · ganti warna sel dari aksen produk.
  2. Latar tema terang saja → pertahankan sapuan sel · ganti pergantian hitam↔putih jadi dua warna latar dekat.
  3. Reel quote → pertahankan loop 3,33 dtk · ganti sel menjadi garis horizontal tipis.
- *Pengamatan di video asli, bukan target:* selisih piksel antar-frame puncak 13,9/255 saat sapuan, 0 saat diam.

## Audio (bila dibedah)
Tidak ada trek audio di file (ffprobe hanya stream video), jadi SFX dan musik tidak diukur karena sumbernya.

## Yang harus terasa sama saat disandingkan
- Palet hanya tiga warna, tangga biru hanya muncul di sapuan?
- Label putih bersambung, tepi kiri/kanan bertangga, dan satu sel latar ≈ tinggi satu label?
- Kotak aksen menempel di sudut tumpukan, bukan melayang terpisah?
- Sapuan terbaca berasal dari kotak aksen dan teks tidak bergerak sama sekali?
- Tanpa foto, bayangan, atau vignette; grain nyaris tak terlihat?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
