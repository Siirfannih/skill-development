# Dunia visual: tema, terjemahan kata gaya, dan gerbang style frame

Dibuka di langkah 3-5 alur `SKILL.md`: memilih tema bersama user, lalu menuntun cara berpikir desain, kinetic typography, dan sound design supaya storyboard terasa dibuat editor manusia. Isinya dipindahkan dari skill `motion-theme-director` (kini hanya penunjuk ke sini). NEGATIF di `SKILL.md` berlaku penuh dan menang bila ada bentrok. Isi diturunkan dari 80+ kartu referensi eksternal yang sudah diaudit; kamu tidak perlu membuka kartunya, buka hanya keyframe yang ditunjuk.

## 1. Urutan kerja (langkah 1 dan 3-5 alur `SKILL.md`)

0. **Ada referensi dari user: bedah dulu.** Jalankan `../../motion-theme-director/BEDAH-REFERENSI.md` (5 lapis: state machine naratif, mekanisme vs properti permukaan, kontrak dominasi per frame, rantai sebab-akibat kamera, peta upgrade) dan isi `REFERENCE-BRIEF.md` sebelum storyboard dibuat atau di-upgrade. Yang dipindahkan dari referensi adalah alasan dan mekanismenya, bukan kulitnya (NEGATIF 7).
1. **Periksa bahan dulu.** Lihat footage, naskah, dan aset nyata user sebelum memilih teknik. Catat:
   - warna dan motif baju serta dinding di tempat teks akan jatuh;
   - terang-gelap piksel tepat di bawah huruf (bukan rata-rata frame);
   - ruang kosong di atas kepala dan di sekitar subjek;
   - rasio dan resolusi aset.

   Niatnya: teknik referensi yang bagus rusak bila dipakai di kondisi yang berlawanan, misalnya pil kaca di dinding terang, teks tipis di arsip bertekstur, atau KT yang menutup wajah. Bila syarat teknik tidak terpenuhi, ganti tekniknya, jangan dipaksa.
2. **Pilih tema** (§2). Bila belum jelas dari bahan, tanya (§3).
3. **Buka `../../motion-theme-director/tema/<tema>.md`** dan 2-3 keyframe wajib di dalamnya. Lihat gambarnya, jangan hanya membaca deskripsinya.
4. **Tiga style frame dulu** (gerbang di §7), baru storyboard.
5. **Storyboard dengan lingkaran still:**
   1. render 1 still per beat kunci (hook + bukti utama dulu) dengan materi asli, bukan teks dummy, per lapis dan dengan komponen yang sudah lulus di butir 4;
   2. taruh berdampingan dengan keyframe tema di zoom 25 % (ukuran HP) dan 100 %;
   3. coret setiap elemen yang tidak menambah pemahaman;
   4. perbaiki, lalu ulangi sampai still tidak kalah rasa dengan keyframe.

   Skor yang kamu tulis sendiri bukan bukti. Bukti adalah perbandingan dengan gambar.
6. **Audio disusun setelah visual lulus**, lalu menyesuaikan gerak final.
7. **Build**: buka `../../motion-theme-director/PRESET-INDEX.md` hanya di tahap ini.

## 2. Router tema

Pilih dari **wujud bukti yang dituntut naskah**, bukan dari kata sifat di brief.

| Bila sebagian besar kalimat menuntut… | Tema | Keyframe contoh untuk ditunjukkan |
|---|---|---|
| aksi software nyata (ketik, klik, pindah tab, hasil AI) | `ui-produk-datar` | `63-k4-kartu-ui-gelap.jpg` |
| pembicara di kamera memimpin argumen | `talking-head-kinetic` | `83-k1.jpg` |
| bukti masa lalu: foto, berita, kutipan, profil tokoh | `documentary-archive` | `92-k1-judul-tahun-wipe-blueprint.jpg` |
| daftar benda/kebiasaan nyata, nuansa buatan tangan | `tactile-paper-collage` | `98-k2-satu-objek-per-item.jpg` |
| ide abstrak, sebab-akibat, metafora | `editorial-metaphor-canvas` | `88-k6-lingkaran-satu-dial.jpg` |
| perbandingan angka, persen, biaya | `minimalist-dataviz-kinetic` | `57-k4-bar-persen.jpg` |

Folder keyframe: `../guide/referensi/sheets/keyframes/`.

**Kata gaya di brief diterjemahkan, tidak dieksekusi harfiah.** Model hampir selalu menerjemahkan "Apple", "premium", "kedalaman" jadi kaca biru-ungu, gradien blur, bayangan berlapis, kartu 3D, dan satu kata serif italic (`../cookbook/contoh-gagal/03`, `04`; audit 26 Nov: identik lintas model dan sesi). Terjemahan wajib, tulis di REFERENCE-BRIEF/RESEP:

| Kata di brief | Artinya di frame |
|---|---|
| Apple, premium, mewah, elegan | ruang kosong luas, satu fokus, hierarki lewat bobot + ukuran satu keluarga sans, perataan presisi, palet sedikit, gerak kamera tenang |
| kedalaman, depth, 3D | kedalaman dari susunan dan kamera: skala, benda menapak yang saling menutup, parallax lapis datar; bukan shadow, blur, atau 3D |
| gradient halus | latar polos dua nada, atau linear 2 warna berdekatan; bukan radial, mesh, aurora |
| glass, modern, futuristik, neon | panel solid datar + garis tepi tipis; aksen satu warna |

NEGATIF 1-2 hanya terbuka bila user menulis teknik terlarangnya secara eksplisit di sesi itu ("pakai serif", "pakai efek kaca"); kata sifat tidak membukanya.

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
   - Gagal bila: frame penuh sesak, atau objek mini di kanvas kosong (`../cookbook/contoh-gagal/02`, `20`).
2. **Ukuran teks dua kutub.**
   - Keputusan: dalam satu adegan, ukuran teks seragam (rasio 1,0–1,3×, penekanan lewat warna/terang/bobot) atau melompat ≥ 1,8×. Lompatan ≥ 4× disimpan untuk titik balik. Tidak ada ukuran tanggung 1,3–1,8×.
   - Ukuran ditulis dalam px pada kanvas 1080 (lebar untuk 9:16, tinggi untuk 16:9); kata sambung ≥ 56 px.
   - Niat: hierarki terbaca sekali lirik; ukuran tanggung terbaca sebagai salah ketik.
3. **Kedalaman dari dunia nyata, bukan drop shadow presentasi.**
   - Keputusan: pakai salah satu, sesuai bahan:
     - oklusi: subjek atau benda menutup ≤ 20 % huruf;
     - skala dan susunan: benda dekat besar, benda jauh kecil, benda menapak di permukaan yang sama;
     - satu bayangan kontak tajam (blur ≤ 24 px, opasitas ≤ 0,2) hanya untuk menunjukkan benda menapak.
   - Gagal bila: semua kartu diberi `box-shadow` atau glow biru-ungu ambient (`../cookbook/contoh-gagal/04`).
4. **Teks diam saat latar berlari.**
   - Keputusan: bila latar berganti cepat (< 1,5 dtk per shot), kunci teks di satu poros tetap, di lapisan terpisah dari gerak shot. Bila shot bertahan lama, teks boleh pindah ke ruang kosong shot itu.
   - Niat: mata tidak sanggup mengejar kata yang melompat tiap 0,5 dtk.
5. **Bunyi menempel peristiwa, bukan kata.**
   - Keputusan: SFX nyata (taktil, klik UI, sub, whoosh) hanya saat keadaan visual berubah atau objek mendarat.
   - Whoosh hanya untuk gerak cepat yang terlihat. Cut keras = klik atau diam (S-A12: whoosh di cut tanpa gerak = slop).
   - Sebelum puncak non-VO, stem musik dikosongkan sebentar. Bed ambien tetap ada; tidak ada hening digital.
   - Tick per kata: ikut mode di RESEP/EDITING (`LANTAI.md` E24, level −12…−18 dB relatif VO). Tema hanya merekomendasikan mode.
6. **Bukti tetap utuh.**
   - Keputusan: dokumen dan kutipan tetap tajam dengan stabilo baris, jangan diburamkan demi caption (`../cookbook/contoh-gagal/21`).
   - Narasi VO tidak pernah diketik ke kolom prompt UI (`../cookbook/contoh-gagal/13`).
   - Screenshot kecil mengambang di kanvas kosong dilarang (`../cookbook/contoh-gagal/20`). Pilih full-bleed, inset yang tumbuh ke penuh, atau UI yang dibangun ulang.
7. **Permukaan datar: tanpa glow, halo, kaca, gradien radial, dan blur dekoratif** (NEGATIF 2).
   - "Memancar" atau "menyala" digambar lewat perubahan warna datar, garis sinar, atau skala; bukan halo/glow (halo di `88-k6` dan neon di `83-k7` = kulit referensi).
   - Motion blur hanya saat gerak cepat. Blur kabur→jelas sah hanya bila naskah berkata "menjadi jelas", sekali per video.

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
| Kata VO tidak muat di jendela beat | VO tidak dipercepat (NEGATIF 9); jendela beat yang digeser |
| Tuturan > 2,5 kata/dtk vs durasi baca per kata | Tampilkan frasa 2–3 kata; durasi baca dihitung per frasa |
| Semua ucapan tampil (A1) vs demo UI butuh perhatian | Teks ucapan di pita terpisah di atas UI, tidak menumpuk di UI. Bila aksi butuh 100 % mata: KT jeda ≤ 2 dtk, dicatat di RESEP |
| Kartu referensi campur gaya huruf dalam satu frasa vs A6 | A6 menang; pengecualian hanya bila tertulis di RESEP |
| Tick per kata vs referensi senyap | Mode di RESEP/EDITING menang (E24); default tema hanya saran |
| Vakum pra-klimaks vs larangan celah sunyi (S-A3) | Vakum hanya di stem musik; bed ambien tetap |
| Teknik kartu vs kondisi footage user | Kondisi footage menang; ganti teknik (§1.1) |
| Video produksi internal lama sebagai contoh | Hanya boleh sebagai contoh salah; pembanding positif hanya keyframe eksternal |

## 7. Gerbang 3 style frame

Ada referensi atau tema baru: buat **3 style frame** 1920x1080 (atau 1080x1920) dari kode yang sama dengan render, satu per mode fokus: TYPO_HERO, SYSTEM_FLOW, UI_PROOF. Tanpa anotasi, supaya rasa visualnya dinilai murni.

1. **Bangun per lapis**, satu lapis baru per render, lalu lihat hasilnya di resolusi penuh: `python3 scripts/lihat.py <frame.html> --lapis 0` dst. L0 latar (warna pas, tanpa efek permukaan) → L1 satu objek utama (bentuk nyata, menapak, terbaca tanpa teks) → L2 teks (lahir dari komposisi, tidak menimpa objek) → L3 label kecil bila perlu.
2. `scripts/gate/negatif_cek.py <folder kode>` dan `scripts/gate/tabrakan_cek.py <frame.html>` hijau.
3. Nilai dengan mata memakai 5 uji biner (§8).
4. Storyboard penuh baru ditulis setelah ketiga frame lulus, memakai token dan komponen dari frame itu. Alasan: bug di satu komponen tersalin ke puluhan panel.

## 8. Lima uji biner (jalankan pada setiap frame storyboard)

Satu jawaban "gagal" = frame dirombak, bukan dipoles. Tulis hasilnya per frame di `REFERENCE-BRIEF.md` §3 atau `STORYBOARD.md`.

1. **Hapus objek.** Bila sebuah bentuk dihapus dan pesan frame tidak berkurang, hapus bentuk itu.
2. **Clip-art.** Bila visualnya hanya terjemahan harfiah satu kata ("louder" jadi gelombang suara), ganti dengan tipografi kinetik murni atau bukti UI/produk nyata.
3. **Fokus tunggal.** Bila teks dan objek terpisah di dua area, leburkan atau pecah jadi dua beat berurutan.
4. **Kontinuitas.** Tiap frame menjelaskan dari mana ia masuk dan ke mana ia keluar; hanya "fade in / pop up" masih slide statis.
5. **Placeholder.** Objek harus lengkap dan bermakna; kotak kosong, garis abu pengganti teks, atau border putus-putus diisi konten nyata atau disederhanakan jadi TYPO_HERO murni (NEGATIF 4).
