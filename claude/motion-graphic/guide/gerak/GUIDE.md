# Gerak: smooth, tidak kaku, cutout rapi

**Tujuan.** Setiap perpindahan terasa punya arah dan alasan; tidak ada yang "nongol" atau patah.

## Bagus itu seperti apa
- 04: foto berganti cepat (±0,7 dtk) tapi tidak terasa kasar: tiap cut jatuh di ketukan + ada gerak kecil (drift/zoom) di foto.
- 02: stiker masuk bouncy dengan overshoot, miring, lalu diam: hidup tanpa ribut.
- 06: transisi lembut panjang antar kartu, easing ease-out, tidak linear.
- 03: cutout wajah bersih di latar warna, tepi rapi, ada outline/bayangan tipis.

## Cara (pilih yang cocok)
- Cut di ketukan: kata, beat musik, atau puncak gerak.
- Easing ekspresif (spring / ease-out kuat); linear hanya untuk drift dan loop. Kurvanya dipilih per gerak dari `scripts/remotion/curves.ts` (Lantai B13a): tentukan dulu geraknya apa (dilempar masuk, mendarat berat, ganti keadaan, keluar), baru kurvanya; satu gerak utama + reaksi berjeda tidak rata.
- Motion blur di gerak cepat. Teks masuk dengan blur→tajam atau mask, bukan fade polos.
- Footage diam terlalu lama → beri drift/zoom kecil.
- Cutout: matte bersih (rambut, tepi), feather 1–2 px, warna & cahaya disamakan, atau beri outline sebagai gaya. Cek di 100 %.
- Transisi dari logika ruang: masuk ke dalam = push-through; mundur = pull-back; ganti topik = whip.
## Cara memutuskan (alasan dari koreksi Irfan; rujukan menimbang, bukan aturan)
- **Bila kamera pindah dari satu objek ke objek berikut sementara teksnya masih diucapkan, pilih teks tetap di posisi dunianya dan biarkan kamera melewatinya**, bukan menjepit teks di tepi layar supaya tidak keluar: teks yang ikut bergeser terbaca "melayang" dan memutus ilusi satu dunia.
- **Bila efek kilat cahaya diminta melintas pada kartu judul yang pendek (< 20 frame), pilih sapuan berkurva rata (`drift`) sepanjang hampir seluruh kartu dengan pita yang menyeberang dari pojok ke pojok**, bukan kurva `land`: `land` menghabiskan sapuan dalam 3 frame lalu pita mengendap di luar huruf, sehingga kilatnya tidak terlihat bergerak.
- **[GRK-01] Kata kerja masuk/transisi = definisi per frame** · kelas P · cek: lembar per frame sebelum render penuh
  - Pemicu: brief, storyboard, atau revisi menamai cara elemen masuk atau berpindah (ditulis/writing, diketik, pop, terbang, cut, flash, whip).
  - Anti-pola: mengganti dengan varian yang terasa lebih hidup, atau menambah peralihan (pudar, ease) yang tidak dikandung kata kerjanya.
  - Invarian: sebelum membangun, tulis definisi per frame kata kerja itu lalu ikuti: ditulis = glif terungkap berurutan di posisi akhirnya mengikuti ucapan per kata, frame pertama belum utuh; cut = 0 frame peralihan; flash = N frame intensitas penuh tanpa naik/turun, lalu shot baru. Event diskret dihitung dari indeks frame bulat `round((t − t0) × fps)` dan batas adegan dibanding setengah frame, bukan perbandingan detik float. Bunyi mengikuti kata kerja yang sama (ditulis → ketukan per kata, bukan whoosh).
  - Karena: kata kerja itu spesifikasi pemilik; varian lain terbaca sebagai salah eksekusi walau rapi, dan perbandingan float diam-diam membuat 1 frame menjadi 2.
  - Boleh: kata kerja tidak disebut atau ambigu → ambil dari kartu kiblat dan catat pilihannya di ledger.
  - Gerbang: lembar per frame ±3 f di sekitar tiap event: jumlah frame peralihan dan keadaan frame pertama cocok dengan definisi tertulis.


## Cek cepat
- Putar 0,5×: ada lompatan, frame kosong, atau objek berhenti mendadak?
- Still 100 % di tepi cutout: ada halo/potongan kasar?
- Ada crossfade/fade polos sebagai transisi? Ganti dengan gerak.
- Still awal, tengah, akhir punya framing sama? Video datar: tambah push-in pelan, punch-in di kata kunci, kamera di dalam ilustrasi, cutout subjek (Lantai B10).
- Overlay/gradien gelap nongol mendadak? Naik dari bawah ease-in-out, turun saat keluar (Lantai B13).

## Bebas diputuskan
Kecepatan, gaya easing, jenis transisi, kamera, jumlah overshoot. Energi gerak mengikuti tempo video (lihat `../audio/`).

## Detail lanjut
`../../references/smooth-motion.md` · `motion-mechanics.md` · `camera-transition.md`
