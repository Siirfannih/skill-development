# Gerak: smooth, tidak kaku, cutout rapi

**Tujuan.** Setiap perpindahan terasa punya arah dan alasan; tidak ada yang "nongol" atau patah.

## Bagus itu seperti apa
- 04: foto berganti cepat (±0,7 dtk) tapi tidak terasa kasar: tiap cut jatuh di ketukan + ada gerak kecil (drift/zoom) di foto.
- 02: stiker masuk bouncy dengan overshoot, miring, lalu diam: hidup tanpa ribut.
- 06: transisi lembut panjang antar kartu, easing ease-out, tidak linear.
- 03: cutout wajah bersih di latar warna, tepi rapi, ada outline/bayangan tipis.

## Cara (pilih yang cocok)
- Cut di ketukan: kata, beat musik, atau puncak gerak.
- Easing ekspresif (spring / ease-out kuat); linear hanya untuk drift dan loop.
- Motion blur di gerak cepat. Teks masuk dengan blur→tajam atau mask, bukan fade polos.
- Footage diam terlalu lama → beri drift/zoom kecil.
- Cutout: matte bersih (rambut, tepi), feather 1–2 px, warna & cahaya disamakan, atau beri outline sebagai gaya. Cek di 100 %.
- Transisi dari logika ruang: masuk ke dalam = push-through; mundur = pull-back; ganti topik = whip.

## Cek cepat
- Putar 0,5×: ada lompatan, frame kosong, atau objek berhenti mendadak?
- Still 100 % di tepi cutout: ada halo/potongan kasar?
- Ada crossfade/fade polos sebagai transisi? Ganti dengan gerak.

## Bebas diputuskan
Kecepatan, gaya easing, jenis transisi, kamera, jumlah overshoot. Energi gerak mengikuti tempo video (lihat `../audio/`).

## Detail lanjut
`../../references/smooth-motion.md` · `motion-mechanics.md` · `camera-transition.md`
