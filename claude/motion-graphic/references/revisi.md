# Revisi = diff, satu ronde

Dibuka saat ada pesan revisi atas video atau storyboard, sebelum edit pertama (langkah 8 alur `SKILL.md`). Butir lama LANTAI F27 dipindahkan ke sini; langkah rinci tiap ronde ada di `references/revision-log.md` §0, jangan diulang di sini.

## Aturan
- **Satu ronde.** Masukan atas render 1 dikumpulkan dan dikerjakan sekaligus jadi render 2. Pertanyaan atas masukan yang kabur diajukan sekali di awal ronde. Alasan: revisi bertahap membuat adegan yang sudah disetujui ikut berubah.
- **Adegan yang disetujui tidak disentuh.** Yang dirender ulang hanya rentang yang berubah. Dalam blok yang direvisi, hanya atribut yang diminta yang berubah (warna, huruf, ukuran, posisi, waktu, gerak). Cek: `scripts/juri/revisi_cek.py cek` membandingkan tiap blok teks dan lapisan dengan basis.
- **Storyboard juga diff.** "Terlalu polos, improve lagi" atas storyboard yang ada berarti diff dari kode versi terakhir: lihat dulu versi itu, lalu ubah warna atau latar, relayout, isi objek. Bukan generator baru dari nol. Alasan: generator baru membuang bagian yang Irfan sudah setuju.
- **Rakit per rentang.** Tiap ronde dirakit per rentang (`scripts/lego/compose.py --rentang`) dengan lembar sebelum/sesudah. Kunci ulang audio, audit semua frame, dan Devil's Advocate dijalankan sekali sebelum render final, bukan tiap ronde.
- **Revisi video yang dibuat sebelum aturan baru.** Tulis `qc/revisi.json` {"basis": "<commit versi yang disetujui>", "alasan": ...}. Aturan dan gerbang baru (B13a, A9a, E23/E24, lego) berlaku untuk bagian yang diubah saja; bagian yang disetujui tidak dimigrasi kecuali Irfan memintanya. `render.sh final` lalu memeriksa motion_lint hanya pada file yang berubah dan `audio_order.py check --warisan`.

## Arah revisi: ke tengah, bukan ke ekstrem lain
Masukan "terlalu berat", "terlalu ramai", "lebih lega", "lebih besar" meminta pergeseran ke tengah. Mengoreksi ke kutub seberangnya (berat → putih pucat dengan satu bercak di pojok, lega → objek mengecil sampai teks tak terbaca, frame jarang) hanya memindahkan keluhan. Sebelum menyerahkan revisi:
1. Pilih 3-5 frame wakil (terang, gelap, padat, paling kosong). Per frame: `python3 scripts/banding.py <baru.png> --sebelum <lama.png> [--target <ref.png>]`. Target = frame referensi atau gambaran yang disebut Irfan; tanpa target, tulis angka tujuan perkiraanmu dan alasannya.
2. Ukuran yang dikeluhkan (rentang luma, sat p95, luas fokus) bergerak ke arah yang diminta dengan langkah sedang: kira-kira 30-60 % dari jarak ke target (kolom "tutup"). Lebih dari ~60 % = curiga overkoreksi; kurang dari ~30 % = revisi tidak terasa.
3. Ukuran yang tidak disebut tidak boleh memburuk: keterbacaan dan ukuran teks (di HP, 360 px), luas fokus (jangan jatuh di bawah ~12 % tanpa pita teks, F3), saturasi, dan F1 tidak terpicu. Teks kecil karena objek mengecil = gagal.
4. Tulis angka sebelum/sesudah per frame wakil di `DECISIONS.md` (ukuran, lama → baru, % tutup). Seluruh storyboard tanpa referensi: `banding.py --seri <folder>`, frame jarang ≤ 10 %.

## Setelah revisi, tetap berlaku
NEGATIF dan hukum besi `SKILL.md` berlaku untuk bagian yang diubah: lihat frame yang diubah di resolusi penuh (`scripts/lihat.py`) sebelum menyerahkannya.
