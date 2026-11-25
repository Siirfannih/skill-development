# Revisi = diff, satu ronde

Dibuka saat ada pesan revisi atas video atau storyboard, sebelum edit pertama (langkah 8 alur `SKILL.md`). Butir lama LANTAI F27 dipindahkan ke sini; langkah rinci tiap ronde ada di `references/revision-log.md` §0, jangan diulang di sini.

## Aturan
- **Satu ronde.** Masukan atas render 1 dikumpulkan dan dikerjakan sekaligus jadi render 2. Pertanyaan atas masukan yang kabur diajukan sekali di awal ronde. Alasan: revisi bertahap membuat adegan yang sudah disetujui ikut berubah.
- **Adegan yang disetujui tidak disentuh.** Yang dirender ulang hanya rentang yang berubah. Dalam blok yang direvisi, hanya atribut yang diminta yang berubah (warna, huruf, ukuran, posisi, waktu, gerak). Cek: `scripts/juri/revisi_cek.py cek` membandingkan tiap blok teks dan lapisan dengan basis.
- **Storyboard juga diff.** "Terlalu polos, improve lagi" atas storyboard yang ada berarti diff dari kode versi terakhir: lihat dulu versi itu, lalu ubah warna atau latar, relayout, isi objek. Bukan generator baru dari nol. Alasan: generator baru membuang bagian yang Irfan sudah setuju.
- **Rakit per rentang.** Tiap ronde dirakit per rentang (`scripts/lego/compose.py --rentang`) dengan lembar sebelum/sesudah. Kunci ulang audio, audit semua frame, dan Devil's Advocate dijalankan sekali sebelum render final, bukan tiap ronde.
- **Revisi video yang dibuat sebelum aturan baru.** Tulis `qc/revisi.json` {"basis": "<commit versi yang disetujui>", "alasan": ...}. Aturan dan gerbang baru (B13a, A9a, E23/E24, lego) berlaku untuk bagian yang diubah saja; bagian yang disetujui tidak dimigrasi kecuali Irfan memintanya. `render.sh final` lalu memeriksa motion_lint hanya pada file yang berubah dan `audio_order.py check --warisan`.

## Setelah revisi, tetap berlaku
NEGATIF dan hukum besi `SKILL.md` berlaku untuk bagian yang diubah: lihat frame yang diubah di resolusi penuh (`scripts/lihat.py`) sebelum menyerahkannya.
