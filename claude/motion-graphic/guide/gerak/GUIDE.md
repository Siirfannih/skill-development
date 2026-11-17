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


## Cek cepat
- Putar 0,5×: ada lompatan, frame kosong, atau objek berhenti mendadak?
- Still 100 % di tepi cutout: ada halo/potongan kasar?
- Ada crossfade/fade polos sebagai transisi? Ganti dengan gerak.
- Still awal, tengah, akhir punya framing sama? Video datar: tambah push-in pelan, punch-in di kata kunci, kamera di dalam ilustrasi, cutout subjek (aturan 26).
- Overlay/gradien gelap nongol mendadak? Naik dari bawah ease-in-out, turun saat keluar (aturan 5).

## Bebas diputuskan
Kecepatan, gaya easing, jenis transisi, kamera, jumlah overshoot. Energi gerak mengikuti tempo video (lihat `../audio/`).

## Detail lanjut
`../../references/smooth-motion.md` · `motion-mechanics.md` · `camera-transition.md`
