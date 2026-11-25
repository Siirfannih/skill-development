# Mekanik gerak: kamera, transisi, cutout (logika dan cara kerja)

Dibaca saat memilih gerak kamera atau transisi, bersama `camera-transition.md`. Setiap mekanik ditulis sebagai: **kapan dipakai → cara kerja → angka awal → cek**. Angka frame diukur per frame (30 fps) dari referensi yang Irfan setujui dan adalah titik awal, bukan hukum; ubah bila tempo VO menuntut.

Prinsip: transisi adalah **logika ruang** (dari mana adegan berikutnya datang), bukan efek. Pilih mekanik dari hubungan dua adegan.

| Hubungan adegan A → B | Mekanik |
|---|---|
| B ada "di dalam" A (layar, jendela, dokumen, foto) | Push-through |
| A ternyata bagian dari B (konten ternyata di dalam produk) | Pull-back reveal |
| Pindah topik atau energi naik | Whip |
| Pembuka/penutup, masuk ke dunia | Depth fly-through |
| Banyak hal → satu gagasan | Orbit gather |
| Akumulasi, "begitu banyak", hook/penutup cepat | Flash montage |
| Ganti pernyataan di dunia yang sama | Ganti di tempat (kata/objek bertukar, kamera tetap) |

## Push-through
- **Kapan:** adegan berikutnya adalah isi dari objek di layar.
- **Cara kerja:** kamera mendorong masuk ke permukaan objek dengan percepatan (ease-in). Saat isi objek memenuhi frame, cut ke adegan B pada framing yang cocok. Motion blur hanya di frame terakhir sebelum cut.
- **Angka awal:** dorongan ±12–14 f, cut di puncak kecepatan; 2–3 f terakhir ber-blur.
- **Cek:** framing akhir A dan framing awal B harus segaris (isi layar = frame B).

## Pull-back reveal
- **Kapan:** menunjukkan bahwa yang barusan dilihat adalah layar/produk.
- **Cara kerja:** footage penuh mengecil (ease-out), lalu bingkai perangkat dan latar palet muncul di sekelilingnya.
- **Angka awal:** ±10–12 f mengecil, bingkai mendarat 4–6 f sesudahnya.
- **Cek:** footage tetap tajam selama mengecil; latar baru adalah latar palet.

## Whip
- **Kapan:** pindah topik atau menaikkan energi.
- **Cara kerja:** blur arah kuat selama 2–4 f, lalu mendarat keras di adegan B tanpa easing panjang.
- **Angka awal:** 3 f blur.
- **Cek:** arah whip konsisten dengan arah baca atau arah gerak sebelumnya; SFX whoosh memuncak di frame blur tengah.

## Depth fly-through
- **Kapan:** pembuka, penutup, atau masuk ke dunia produk.
- **Cara kerja:** objek ditata di beberapa lapisan kedalaman. Kamera bergerak maju; lapisan depan bergerak lebih cepat daripada belakang (parallax). Depth of field menyempit sampai gambar larut ke latar palet.
- **Angka awal:** ±20–25 f; blur naik di 6 f terakhir.
- **Cek:** minimal 3 lapisan kedalaman dengan kecepatan berbeda; tidak ada flash putih yang menutup frame.

## Orbit gather
- **Kapan:** "banyak masalah/alat → satu solusi".
- **Cara kerja:** kartu/foto masuk dari tepi frame dan berkumpul membentuk cincin di sekitar teks kecil di tengah, lalu cincin berputar pelan selama ditahan.
- **Cek:** teks tengah tetap kecil dan terbaca; cincin tidak menutupinya.

## Flash montage
- **Kapan:** akumulasi atau ritme hook/penutup.
- **Cara kerja:** foto berganti tiap 2–3 f, dalam satu grade warna yang sama.
- **Cek:** maksimal ±1 detik per rangkaian; grade seragam, kalau tidak terasa acak.

## Tahan dengan drift
- Saat ditahan, frame tidak pernah benar-benar diam: skala 1–3 % atau rotasi/orbit pelan, linear boleh.
- Alasan: frame mati terasa seperti slide. Pengecualian: momen informasional yang harus dibaca tepat.

## Teks yang muncul bertahap
- Kata masuk satu per satu, jeda 2–4 f, mengikuti onset VO.
- Kata baru masuk dengan warna tipis (tint aksen) lalu mengendap ke warna teks dalam 4–6 f. Ini penekanan tanpa memperbesar huruf.
- Mengetik dengan kursor dipakai untuk pernyataan tenang dan CTA.

## Cutout
Memisahkan subjek dari latarnya (rotoscope/matte). Dipakai karena fungsi, bukan hiasan.
- **Subjek ke dunia palet:** bila latar asli footage bertabrakan dengan palet atau mengganggu, potong subjek (tangan + ponsel, orang) dan taruh di latar palet. Footage pun menyatu dengan dunia video.
- **Teks di belakang subjek:** bila kata adalah pahlawan dan subjek cukup diam. Kata ditaruh di antara latar dan subjek. Syarat: matte bersih di tepi rambut/tangan, kata tetap terbaca ≥ 70 % hurufnya.
- **Cek:** tepi matte dicek di still 100 % pada frame tercepat; tidak ada halo.

## Kamera mengikuti makna
- Kamera dekat dan mengikuti saat satu objek bergerak; dipatahkan ke wide saat penekanan atau pergantian makna.
- Gerak besar hanya di pergantian makna; di dalam satu makna, drift saja.

## Timing helper (`scripts/remotion/timing.ts`)
Fungsi murni terhadap `frame` (tanpa state/Math.random/Date), aman render paralel. Impor berdampingan dengan `curves.ts`.
Uji: `npx tsx claude/motion-graphic/scripts/tests/test_timing.ts`.

**Block out: satu `T = timeline()` di level modul.** Semua waktu ditulis relatif di sini, bukan angka frame tersebar.
Revisi satu durasi menggeser turunannya otomatis. Hasil dalam frame; jangan panggil di dalam komponen per frame.
- Posisi: kosong = akhir timeline · angka = absolut · `"<"` akhir anak sebelumnya · `"<<"` awal anak sebelumnya · `"label"` · `"+=N"`/`"-=N"` · gabungan `"<+=4"`, `"hero-=6"`.
- Label tidak dikenal atau ganda melempar error (bukan diam-diam salah).
```ts
const T = timeline(); T.add("hero", 18); T.add("sub", 14, "<+=4"); T.add("cta", 20, "sub-=6");
const heroIn = move(frame, T.at("hero"), 18, "land"); // T.total = durasi adegan
```

**Animate: tiga fungsi.**
- `stagger(i, n, {from, grid, axis, ease, gap, jitter, seed, start})` -> jeda frame elemen ke-i. `from`: first|last|center|random|indeks. `grid: [kolom, baris]` dari props, `axis: "x"|"y"` untuk per kolom/baris. `ease` di-apply pada sebaran 0..1 (mis. `CURVE.reveal`). `jitter` berbiji (`seed`), tumbuh menurut progres.
  Pengganti `i * konstanta` yang ditolak `motion_lint.py` (stagger rata): `stagger` lolos karena sebaran dari titik asal + ease, bukan kelipatan tetap.
```ts
const d = stagger(i, 12, { from: "center", grid: [4, 3], gap: 3, ease: CURVE.reveal, jitter: 1, seed: 7 });
const p = move(frame, T.at("grid") + d, 16, "land");
```
- `dampTrack(keys, frame, fps, response, zeta)` -> nilai pegas yang mengejar kunci `{at, v}` (urut). Posisi dan kecepatan terbawa antar kunci, jadi ganti target tidak henti-mulai. `response` = periode (detik), `zeta` 1 kritis, <1 memantul, >1 lambat. Untuk kamera ikut-objek, parallax, counter. Biaya O(jumlah kunci) per panggilan.
```ts
const x = dampTrack([{ at: 0, v: 0 }, { at: 40, v: 300 }, { at: 90, v: 120 }], frame, fps, 0.5, 0.85);
```
- `vanWijk([x0, y0, w0], [x1, y1, w1], t, rho?)` -> `[x, y, w]` (port d3 `interpolateZoom`). `w` = lebar viewport = 1/skala. Lompatan jauh: zoom-out dulu lalu masuk, laju persepsi konstan. `t` 0..1 diberi easing/pegas dari luar.
```ts
const [cx, cy, w] = vanWijk(a, b, move(frame, T.at("jump"), 40, "heavy")); const scale = W / w;
```

**Batasan**
- `vanWijk`: bila kamera memakai `coverBox` yang menjepit skala >= 1, busur zoom-out terpotong dan lintasan jadi pan biasa. Manfaat penuh hanya di kamera dunia 2D tanpa jepit cover. `rho` besar = busur lebih kuat.
- `dampTrack`: kunci harus urut menaik; `frame` sebelum kunci pertama = nilai kunci pertama.
- `stagger`: hasil dibulatkan ke frame; `jitter` bisa membuat urutan dua elemen bertetangga bertukar bila `jitter` > `gap`/2.
- `timeline` hanya menghitung posisi; tidak merender apa pun dan tidak membaca VO (waktu VO tetap masuk sebagai angka/`beats.json`).
- Belum divalidasi di render nyata; hanya diuji numerik.

