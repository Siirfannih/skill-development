---
name: motion-theme-director
description: Memilih tema visual (bersama user) dan menuntun cara berpikir desain, kinetic typography, dan sound design untuk storyboard motion graphic Irfan supaya terasa dibuat editor manusia, bukan AI slop; pakai sebelum menggambar storyboard atau still pertama.
---

# Motion Theme Director

Skill ini mengatur **cara berpikir sebelum dan saat mendesain frame**. LANTAI.md tetap berlaku penuh, dan bila ada bentrok, LANTAI menang. Isi skill ini diturunkan dari 80+ kartu referensi eksternal yang sudah diaudit (F1–F6). Kamu tidak perlu membuka kartunya; buka hanya keyframe yang ditunjuk.

## 1. Urutan kerja

1. **Periksa bahan dulu.** Lihat footage, naskah, dan aset nyata user sebelum memilih teknik. Catat:
   - warna dan motif baju serta dinding di tempat teks akan jatuh;
   - terang-gelap piksel tepat di bawah huruf (bukan rata-rata frame);
   - ruang kosong di atas kepala dan di sekitar subjek;
   - rasio dan resolusi aset.

   Niatnya: teknik referensi yang bagus rusak bila dipakai di kondisi yang berlawanan. Contohnya pil kaca di dinding terang (`contoh-gagal/14`), teks tipis di arsip bertekstur (`contoh-gagal/18`), atau KT yang menutup wajah (`contoh-gagal/19`). Bila syarat teknik tidak terpenuhi, ganti tekniknya, jangan dipaksa.
2. **Pilih tema** (§2). Bila belum jelas dari bahan, tanya (§3).
3. **Buka `tema/<tema>.md`** dan 2–3 keyframe wajib di dalamnya. Lihat gambarnya, jangan hanya membaca deskripsinya.
4. **Storyboard dengan lingkaran still:**
   1. render 1 still per beat kunci (hook + bukti utama dulu) dengan materi asli, bukan teks dummy;
   2. taruh berdampingan dengan keyframe tema di zoom 25 % (ukuran HP) dan 100 %;
   3. coret setiap elemen yang tidak menambah pemahaman;
   4. perbaiki, lalu ulangi sampai still tidak kalah rasa dengan keyframe.

   Skor yang kamu tulis sendiri bukan bukti. Bukti adalah perbandingan dengan gambar.
5. **Audio disusun setelah visual lulus**, lalu menyesuaikan gerak final (LANTAI F26).
6. **Build**: buka `PRESET-INDEX.md` hanya di tahap ini.

## 2. Router tema

Pilih dari **wujud bukti yang dituntut naskah**, bukan dari kata sifat di brief.

| Bila sebagian besar kalimat menuntut… | Tema | Keyframe contoh untuk ditunjukkan |
|---|---|---|
| aksi software nyata (ketik, klik, pindah tab, hasil AI) | `apple-saas-ui` | `63-k4-kartu-ui-gelap.jpg` |
| pembicara di kamera memimpin argumen | `talking-head-kinetic` | `83-k1.jpg` |
| bukti masa lalu: foto, berita, kutipan, profil tokoh | `documentary-archive` | `92-k1-judul-tahun-wipe-blueprint.jpg` |
| daftar benda/kebiasaan nyata, nuansa buatan tangan | `tactile-paper-collage` | `98-k2-satu-objek-per-item.jpg` |
| ide abstrak, sebab-akibat, metafora | `editorial-metaphor-canvas` | `88-k6-lingkaran-satu-dial.jpg` |
| perbandingan angka, persen, biaya | `minimalist-dataviz-kinetic` | `57-k4-bar-persen.jpg` |

Folder keyframe: `./../motion-graphic/guide/referensi/sheets/keyframes/`.

**Brief berisi kata pemicu slop** ("premium", "futuristik", "glass + neon", "penuhi layar dengan kartu"): jangan langsung dieksekusi. Tunjukkan 2 opsi tema dengan keyframe, karena model hampir selalu menerjemahkan kata-kata itu jadi kaca biru-ungu dan grid kartu (`contoh-gagal/03`, `04`).

**Campur tema:** satu tema jangkar menguasai ≥ 70 % durasi dan mengunci keluarga huruf serta aksen. Sisipan maksimal satu tema dan harus punya alasan fungsional, misalnya talking head yang memotong ke demo UI, atau dokumenter yang menyisipkan 1–2 beat statistik. Dilarang:
- 3 tema dalam video ≤ 60 dtk;
- pindah material (kertas → kaca neon) tanpa pergantian babak;
- sistem teks berganti saat tema berganti.

## 3. Bertanya (maksimal 3 pertanyaan, sekali, di awal)

- Jangan bertanya kata sifat ("mau modern atau elegan?"). Setiap pertanyaan berisi pilihan konkret dan satu **(Rekomendasi)** yang diturunkan dari naskah.
- Tanpa referensi visual: tunjukkan 2–3 keyframe tema kandidat, supaya user memilih dengan mata.
- Tiga hal yang ikut menentukan tema dan boleh digabung ke dalam 3 pertanyaan itu:
  1. **Dunia visual**: tunjuk gambar.
  2. **Rasa suara**: VO memimpin dengan bed tipis, atau musik memimpin dengan cut ikut ketukan; SFX hanya di peristiwa, atau tick lembut per kata.
  3. **Peran teks**: teks sebagai narasi (semua ucapan tampil 1–3 kata), atau teks sebagai penekanan (kata kunci, angka, kutipan).
- Jangan tanyakan yang sudah jelas dari bahan. Contohnya: rekaman wajah ada berarti talking head sudah jelas; rasio sudah disebut berarti tidak perlu ditanya lagi.

Contoh buruk vs baik (reel opini @siirfannih):
- Buruk: "Mau style teks aesthetic, serif atau bold, B-roll banyak efek?"
- Baik: "Di rekamanmu ruang di atas kepala polos dan gelap. Aku sarankan kata kunci melengkung di ruang atas kepala seperti `83-k1.jpg` **(Rekomendasi)**. Kalau ruangannya ramai, pilihannya potong ke kartu warna penuh seperti `85-k5-slab-warna-kata-hero.jpg`. Bagian bukti video slop mau ditampilkan berurutan selebar layar, atau dibanding atas-bawah?"

## 4. Inti lintas tema (berlaku di semua tema)

Tiap butir ditulis sebagai rantai: keputusan → niat → kapan dilanggar.

1. **Satu jangkar, sisanya napas.**
   - Keputusan: satu objek atau wadah fokus. Default lebarnya 50–60 % lebar frame (UI/data boleh sampai 75 %). Sisa frame polos atau bertekstur tenang, tanpa elemen kecil pengisi.
   - Niat: mata langsung tahu harus melihat ke mana dalam 1 detik di HP.
   - Kapan dilanggar: talking head (wajah sebagai jangkar) dan kolase (kertas bertekstur memenuhi frame).
   - Gagal bila: frame penuh sesak, atau objek mini di kanvas kosong (`contoh-gagal/02`, `20`).
2. **Ukuran teks dua kutub.**
   - Keputusan: dalam satu adegan, ukuran teks seragam (rasio 1,0–1,3×, penekanan lewat warna/terang/bobot) atau melompat ≥ 1,8×. Lompatan ≥ 4× disimpan untuk titik balik. Tidak ada ukuran tanggung 1,3–1,8×.
   - Ukuran ditulis dalam px pada kanvas 1080 (lebar untuk 9:16, tinggi untuk 16:9); kata sambung ≥ 56 px.
   - Niat: hierarki terbaca sekali lirik; ukuran tanggung terbaca sebagai salah ketik.
3. **Kedalaman dari dunia nyata, bukan drop shadow presentasi.**
   - Keputusan: pakai salah satu, sesuai bahan:
     - oklusi: subjek atau benda menutup ≤ 20 % huruf;
     - blur selektif yang menjaga bukti tetap tajam;
     - bayangan yang mengikuti kelas material (stiker datar = bayangan keras tipis, benda 3D/foto = lembut).
   - Gagal bila: semua kartu diberi `box-shadow` atau glow biru-ungu ambient (`contoh-gagal/04`).
4. **Teks diam saat latar berlari.**
   - Keputusan: bila latar berganti cepat (< 1,5 dtk per shot), kunci teks di satu poros tetap, di lapisan terpisah dari gerak shot. Bila shot bertahan lama, teks boleh pindah ke ruang kosong shot itu.
   - Niat: mata tidak sanggup mengejar kata yang melompat tiap 0,5 dtk.
5. **Bunyi menempel peristiwa, bukan kata.**
   - Keputusan: SFX nyata (taktil, klik UI, sub, whoosh) hanya saat keadaan visual berubah atau objek mendarat.
   - Whoosh hanya untuk gerak cepat yang terlihat. Cut keras = klik atau diam (S-A12: whoosh di cut tanpa gerak = slop).
   - Sebelum puncak non-VO, stem musik dikosongkan sebentar. Bed ambien tetap ada; tidak ada hening digital.
   - Tick per kata: ikut mode di RESEP/EDITING (LANTAI E24, level −12…−18 dB relatif VO). Tema hanya merekomendasikan mode.
6. **Bukti tetap utuh.**
   - Keputusan: dokumen dan kutipan tetap tajam dengan stabilo baris, jangan diburamkan demi caption (`contoh-gagal/21`).
   - Narasi VO tidak pernah diketik ke kolom prompt UI (`contoh-gagal/13`).
   - Screenshot kecil mengambang di kanvas kosong dilarang (`contoh-gagal/20`). Pilih full-bleed, inset yang tumbuh ke penuh, atau UI yang dibangun ulang.
7. **Glow dan blur hanya sebagai makna.**
   - Halo di sekitar objek yang "memancar" (`88-k6`) atau neon yang menyala bersama kata (`83-k7`) sah.
   - Blur kabur→jelas untuk makna "menjadi jelas" sah.
   - Glow ambient dan blur-in sebagai gaya masuk bawaan tidak sah.

Catatan, belum prinsip karena hanya terbukti di 2 tema dan sebagian hipotesis: kontras tempo terasa manusiawi. Ledakan gerak singkat diselingi hold yang cukup untuk dibaca, dan rentetan B-roll padat diputus jeda kanvas polos.

## 5. Anggaran per frame (hasil uji transfer)

Uji transfer menunjukkan model cenderung memakai semua opsi sekaligus. Batasnya:
- maks **1 jenis penanda** (kotak seleksi, label ukur, kursor, stabilo: pilih satu);
- maks **1 cara penekanan per frasa** (warna, atau terang, atau skala, atau bobot);
- **satu keluarga aksen per video**, satu kemunculan aksen aktif per frasa;
- **gerak bersamaan boleh bila satu sumber** (kamera, satu objek yang mendorong lainnya). Hindari ≥ 2 animasi independen yang mulai di frame sama dan berebut mata. Ini hipotesis; kartu bergerak memadukan beberapa gerak dari satu sumber.

## 6. Bila aturan bentrok

| Bentrok | Yang menang |
|---|---|
| Kata VO tidak muat di jendela beat | VO tidak dipercepat (E23); jendela beat yang digeser |
| Tuturan > 2,5 kata/dtk vs durasi baca per kata | Tampilkan frasa 2–3 kata; durasi baca dihitung per frasa |
| Semua ucapan tampil (A1) vs demo UI butuh perhatian | Teks ucapan di pita terpisah di atas UI, tidak menumpuk di UI. Bila aksi butuh 100 % mata: KT jeda ≤ 2 dtk, dicatat di RESEP |
| Kartu referensi campur gaya huruf dalam satu frasa vs A6 | A6 menang; pengecualian hanya bila tertulis di RESEP |
| Tick per kata vs referensi senyap | Mode di RESEP/EDITING menang (E24); default tema hanya saran |
| Vakum pra-klimaks vs larangan celah sunyi (S-A3) | Vakum hanya di stem musik; bed ambien tetap |
| Teknik kartu vs kondisi footage user | Kondisi footage menang; ganti teknik (§1.1) |
| Video produksi internal lama sebagai contoh | Hanya boleh sebagai contoh salah; pembanding positif hanya keyframe eksternal |
