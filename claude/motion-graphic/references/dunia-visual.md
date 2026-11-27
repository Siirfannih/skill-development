# Dunia visual: tema, terjemahan kata gaya, dan arah gaya

Dibuka di langkah 3-5 alur `SKILL.md`: memilih tema bersama user, lalu menuntun cara berpikir desain, kinetic typography, dan sound design supaya storyboard terasa dibuat editor manusia. NEGATIF v2 di `SKILL.md` berlaku penuh: butir [mutlak] menang bila ada bentrok, teknik lain dinilai dengan tiga pertanyaan makna, sistem, takaran. Tema memutuskan kulit (warna, huruf, komposisi); mekanik gerak per beat diambil di storyboard lewat `pilih_kartu.py`, dicari menurut tugas beat (hook, angka, langkah), bukan industri klien; 2-4 kartu.

## 1. Urutan kerja (langkah 1 dan 3-5 alur `SKILL.md`)

0. **Ada referensi dari user: bedah dulu.** Jalankan `bedah-referensi.md` (5 lapis: state machine naratif, mekanisme vs properti permukaan, kontrak dominasi per frame, rantai sebab-akibat kamera, peta upgrade) dan isi `REF-SPEC.md` (ukur dengan `scripts/ref_spec.py`, alasan per pilihan dengan mata) sebelum storyboard dibuat atau di-upgrade. Referensi adalah kebenaran pilihan user: yang dipindahkan adalah alasan dan sistemnya; bentuknya dipakai bila alasannya berlaku di proyek ini (NEGATIF 7).
1. **Periksa bahan dulu.** Lihat footage, naskah, dan aset nyata user sebelum memilih teknik. Catat:
   - warna dan motif baju serta dinding di tempat teks akan jatuh;
   - terang-gelap piksel tepat di bawah huruf (bukan rata-rata frame);
   - ruang kosong di atas kepala dan di sekitar subjek;
   - rasio dan resolusi aset.

   Niatnya: teknik referensi rusak di kondisi yang berlawanan (pil kaca di dinding terang, teks tipis di arsip bertekstur, KT menutup wajah); bila syaratnya tak terpenuhi, ganti tekniknya.
2. **Pilih tema** (§2) hanya bila user tidak memberi referensi atau storyboard; bila belum jelas dari bahan, tanya (§3).
3. **Buka `tema/<tema>.md`** dan 2-3 keyframe contoh di dalamnya. Lihat gambarnya, jangan hanya membaca deskripsinya.
4. **Arah gaya** (§7): pahami maunya user; tanya bila arahnya lemah.
5. **Storyboard per putaran kecil** (§7): still dengan materi asli, bukan teks dummy, berdampingan dengan keyframe pada 25 % (ukuran HP) dan 100 %; coret elemen yang tidak menambah pemahaman; perbaiki sampai tidak kalah rasa. Skor yang kamu tulis sendiri bukan bukti; perbandingan dengan gambar adalah bukti.
6. **Audio disusun setelah visual lulus**, lalu menyesuaikan gerak final.
7. **Build**: buka `preset-index.md` hanya di tahap ini.

## 2. Router tema

Dipakai hanya bila user tidak memberi referensi atau storyboard; tema adalah inspirasi, bukan templat. Pilih dari **wujud bukti yang dituntut naskah**, bukan dari kata sifat di brief.

| Bila sebagian besar kalimat menuntut… | Tema | Keyframe contoh untuk ditunjukkan |
|---|---|---|
| aksi software nyata (ketik, klik, pindah tab, hasil AI) | `ui-produk-datar` | `63-k4-kartu-ui-gelap.jpg` |
| pembicara di kamera memimpin argumen | `talking-head-kinetic` | `83-k1.jpg` |
| bukti masa lalu: foto, berita, kutipan, profil tokoh | `documentary-archive` | `92-k1-judul-tahun-wipe-blueprint.jpg` |
| daftar benda/kebiasaan nyata, nuansa buatan tangan | `tactile-paper-collage` | `98-k2-satu-objek-per-item.jpg` |
| ide abstrak, sebab-akibat, metafora | `editorial-metaphor-canvas` | `88-k6-lingkaran-satu-dial.jpg` |
| perbandingan angka, persen, biaya | `minimalist-dataviz-kinetic` | `57-k4-bar-persen.jpg` |

Folder keyframe: `../guide/referensi/sheets/keyframes/`.

**Kata gaya di brief diterjemahkan, tidak dieksekusi harfiah.** Tanpa terjemahan, "Apple", "premium", "kedalaman" menjadi tumpukan efek tanpa sistem (kaca biru-ungu di semua kartu, bayangan berlapis, kartu miring; `../cookbook/contoh-gagal/03`, `04`, SLOP-W01 di `pola-salah.md`), atau sebaliknya bidang datar tanpa bahan. Terjemahan wajib, tulis di DECISIONS/RESEP. **Ada referensi: terjemahan diambil dari REF-SPEC (angka dan alasannya); tabel ini hanya titik awal bila tidak ada referensi.**

| Kata di brief | Artinya di frame |
|---|---|
| Apple, premium, mewah, elegan | ruang kosong luas, satu fokus, hierarki lewat bobot + ukuran, perataan presisi, palet sedikit, gerak kamera tenang |
| kedalaman, depth, 3D | skala, oklusi, parallax, lalu cahaya dan bayangan sebagai satu sistem (`bahan.md`: kedalaman lapis, studio terang) |
| gradient halus | gradien berkomitmen (`bahan.md`): dua hue memiliki frame, ruang oklab, cahaya dari satu sudut; bukan satu nada (F1 `banding.py`) atau SLOP-W01/W02 |
| glass, modern, futuristik, neon | satu pemancar cahaya, sisanya diterangi olehnya (`bahan.md`: kaca, kolam cahaya); bukan kaca di semua kartu (S-V25) |

Tidak ada teknik yang dikunci oleh namanya. Kata sifat ("premium") bukan izin untuk efek; yang membuka teknik adalah REF-SPEC atau alasan tertulis yang lolos makna, sistem, takaran (NEGATIF 1-2).

**Campur tema:** satu tema jangkar menguasai ≥ 70 % durasi dan mengunci keluarga huruf serta aksen. Sisipan maksimal satu tema dan harus punya alasan fungsional, misalnya talking head yang memotong ke demo UI, atau dokumenter yang menyisipkan 1–2 beat statistik. Tidak sah:
- 3 tema dalam video ≤ 60 dtk;
- pindah material (kertas → kaca neon) tanpa pergantian babak;
- sistem teks berganti saat tema berganti.

## 3. Bertanya (default 3 pertanyaan berpilihan di awal; tanya lagi bila arah masih lemah)

- Jangan bertanya kata sifat ("mau modern atau elegan?"). Setiap pertanyaan berisi pilihan konkret dan satu **(Rekomendasi)** yang diturunkan dari naskah.
- Tanpa referensi visual: tunjukkan 2–3 keyframe tema kandidat, supaya user memilih dengan mata.
- Tiga hal yang ikut menentukan tema dan boleh digabung ke dalam 3 pertanyaan itu:
  1. **Dunia visual**: tunjuk gambar.
  2. **Rasa suara**: VO memimpin dengan bed tipis, atau musik memimpin dengan cut ikut ketukan; SFX hanya di peristiwa, atau tick lembut per kata (`per-word`).
  3. **Peran teks**: porsi teks dari REF-SPEC, atau default VISUAL + kondisi a–d NEGATIF 6.
- Jangan tanyakan yang sudah jelas dari bahan. Contohnya: rekaman wajah ada berarti talking head sudah jelas; rasio sudah disebut berarti tidak perlu ditanya lagi.

Contoh buruk vs baik (reel opini):
- Buruk: "Mau style teks aesthetic, serif atau bold, B-roll banyak efek?"
- Baik: "Di rekamanmu ruang di atas kepala polos dan gelap. Aku sarankan kata kunci melengkung di ruang atas kepala seperti `83-k1.jpg` **(Rekomendasi)**. Kalau ruangannya ramai, pilihannya potong ke kartu warna penuh seperti `85-k5-slab-warna-kata-hero.jpg`."

## 4. Inti lintas tema (berlaku di semua tema)

Tiap butir ditulis sebagai rantai: keputusan → niat → kapan dilanggar.

1. **Satu jangkar, sisanya napas.**
   - Keputusan: satu objek atau wadah fokus. Default tanpa referensi: lebar 50–60 % frame (UI/data sampai 75 %), sisa frame polos atau bertekstur tenang. Dengan referensi, ukuran shot, skala, dan bleed mengikuti REF-SPEC §3 (distribusi macro/close/medium/wide; objek yang sengaja terpotong tepi sah). Satu fokus tetap mutlak; semua frame medium di tengah dengan skala seragam saat referensi bervariasi = sidik jari slop (presentasi slide).
   - Niat: mata langsung tahu harus melihat ke mana dalam 1 detik di HP.
   - Kapan dilanggar: talking head (wajah sebagai jangkar) dan kolase (kertas bertekstur memenuhi frame).
   - Gagal bila: frame penuh sesak, atau objek mini di kanvas kosong (`../cookbook/contoh-gagal/02`, `20`).
2. **Ukuran teks dua kutub.**
   - Keputusan: dalam satu adegan, ukuran teks seragam (rasio 1,0–1,3×, penekanan lewat warna/terang/bobot) atau melompat ≥ 1,8×. Lompatan ≥ 4× disimpan untuk titik balik. Tidak ada ukuran tanggung 1,3–1,8×.
   - Ukuran ditulis dalam px pada kanvas 1080 (lebar untuk 9:16, tinggi untuk 16:9); kata sambung ≥ 56 px; teks yang harus dibaca tidak di bawah ~24 px saat tampil (lantai keterbacaan, `teks.md`).
   - Niat: hierarki terbaca sekali lirik; ukuran tanggung terbaca sebagai salah ketik.
3. **Kedalaman dari susunan dulu, material sebagai sistem.**
   - Keputusan: oklusi (subjek menutup ≤ 20 % huruf), skala dan susunan (dekat besar, jauh kecil, menapak di permukaan sama), atau bayangan sebagai sistem (satu arah cahaya, satu jenis bayangan untuk benda sejenis, kontras teks tetap). Cara membuatnya: `bahan.md`.
   - Gagal bila: tiap panel punya bayangan/glow berbeda, atau glow biru-ungu ambient di semua kartu tanpa alasan (`../cookbook/contoh-gagal/04`).
4. **Teks diam saat latar berlari.**
   - Keputusan: bila latar berganti cepat (< 1,5 dtk per shot), kunci teks di satu poros tetap, di lapisan terpisah dari gerak shot. Bila shot bertahan lama, teks boleh pindah ke ruang kosong shot itu.
   - Niat: mata tidak sanggup mengejar kata yang melompat tiap 0,5 dtk.
5. **Bunyi menempel peristiwa, bukan kata.**
   - Keputusan: SFX nyata (taktil, klik UI, sub, whoosh) hanya saat keadaan visual berubah atau objek mendarat.
   - Whoosh hanya untuk gerak cepat yang terlihat. Cut keras = klik atau diam (S-A12: whoosh di cut tanpa gerak = slop).
   - Sebelum puncak non-VO, stem musik dikosongkan sebentar. Bed ambien tetap ada; tidak ada hening digital.
   - Tick per kata: ikut mode di RESEP/EDITING (`audio.md` E24, level −12…−18 dB relatif VO). Tema hanya merekomendasikan mode.
6. **Bukti tetap utuh.**
   - Keputusan: dokumen dan kutipan tetap tajam dengan stabilo baris, jangan diburamkan demi caption (`../cookbook/contoh-gagal/21`).
   - Narasi VO tidak pernah diketik ke kolom prompt UI (`../cookbook/contoh-gagal/13`).
   - Screenshot kecil mengambang di kanvas kosong gagal (`../cookbook/contoh-gagal/20`). Pilih full-bleed, inset yang tumbuh ke penuh, atau UI yang dibangun ulang.
7. **Satu dunia material: gradien, kilau, kaca sah sebagai sistem; halo dan blur dekoratif tanpa sebab tidak** (NEGATIF 2, 10).
   - "Memancar" digambar lewat sumber cahaya yang terlihat, perubahan warna, garis sinar, atau skala (`bahan.md`); glow di belakang teks yang menurunkan kontras = sidik jari slop.
   - Blur: transisi, depth-of-field di belakang fokus tajam, atau motion blur; tak pernah pada isi yang dibaca atau sebagai pengisi (S-V32). Kabur→jelas hanya bila naskah berkata "menjadi jelas", sekali per video.
   - Tilt/3D: tulis di REF-SPEC/DECISIONS di mana dan kenapa; tilt acak = sup material (S-V33).

Hipotesis (2 tema): kontras tempo terasa manusiawi; ledakan gerak singkat diselingi hold yang cukup untuk dibaca, rentetan B-roll padat diputus jeda kanvas polos.

## 5. Anggaran per frame (hasil uji transfer)

Batas per frame:
- maks **1 jenis penanda** (seleksi, label ukur, kursor, atau stabilo);
- maks **1 cara penekanan per frasa** (warna, atau terang, atau skala, atau bobot);
- **satu keluarga aksen per video**, satu kemunculan aksen aktif per frasa;
- **gerak bersamaan boleh bila satu sumber** (kamera, satu objek yang mendorong lainnya). Hindari ≥ 2 animasi independen yang mulai di frame sama dan berebut mata. Ini hipotesis; kartu bergerak memadukan beberapa gerak dari satu sumber.

## 6. Bila aturan bentrok

| Bentrok | Yang menang |
|---|---|
| Kata VO tidak muat di jendela beat | VO tidak dipercepat (NEGATIF 9); jendela beat yang digeser |
| Tuturan > 2,5 kata/dtk vs durasi baca per kata | Tampilkan frasa 2–3 kata; durasi baca dihitung per frasa |
| Teks ucapan vs demo UI butuh perhatian | Beat dimodekan VISUAL (NEGATIF 6); teks hanya bila isi UI-nya sendiri. Tidak menumpuk di UI |
| Kartu referensi campur gaya huruf dalam satu frasa vs A6 | A6 menang; pengecualian hanya bila tertulis di RESEP |
| Tick per kata vs referensi senyap | Mode di RESEP/EDITING menang (E24); default tema hanya saran |
| Vakum pra-klimaks vs larangan celah sunyi (S-A3) | Vakum hanya di stem musik; bed ambien tetap |
| Teknik kartu vs kondisi footage user | Kondisi footage menang; ganti teknik (§1.1) |
| Video produksi internal lama sebagai contoh | Hanya boleh sebagai contoh salah; pembanding positif hanya keyframe eksternal |

## 7. Arah gaya: pahami maunya user dulu

Ini pertimbangan, bukan urutan wajib; sesuaikan dengan kondisi. Tujuannya satu: kamu punya gambaran visual yang jelas tentang yang user mau sebelum menggambar banyak panel.

- **Sumber arah, dari yang paling kuat**: storyboard, panel, atau referensi user; lalu jawaban user saat ditanya; lalu merek dan naskah. Bank referensi repo (keyframe tema, kartu) hanya pendukung: dipakai untuk mencocokkan ("dari jawabanmu, ini mirip video X; yang bagus di sana bagian ini, maksudmu begini?") dan untuk mengambil mekanik yang sudah jadi supaya kode tidak dibangun dari nol. Ia tidak pernah menggantikan arah user.
- **Arah user sudah jelas**: kerjakan. Storyboard user digambar ulang (struktur, urutan, metafora, gayanya dihormati; rupanya dirapikan), lalu dilengkapi yang kurang. Tidak perlu menawarkan pilihan gaya.
- **Arah belum ada atau masih lemah**: tanya. Wawancara singkat (§3) adalah alat utamanya; tunjukkan gambar, bukan kata sifat. Bila gambar lebih cepat dari kata, render satu beat dalam 2-3 arah yang berbeda bahan (`bahan.md`, `scripts/jelajah_gaya.py`) sebagai bahan bicara.
- **User tidak bisa ditanya**: pilih dengan alasan, catat di `DECISIONS.md`, lanjut.
- **Storyboard dalam putaran kecil** (±6 panel), dilihat sebelum lanjut; tata letak tiap beat dirancang sendiri. Model bekerja lebih baik pada sedikit tugas daripada tugas massal.

Yang tetap dilihat pada hasilnya (informasi, bukan putusan): `scripts/gate/negatif_cek.py`, `tabrakan_cek.py`, 5 uji biner (§8); `banding.py` terhadap referensi user bila ada.

**UI_PROOF tanpa referensi** (NEGATIF 5): bagian UI yang berubah memenuhi frame (kamera masuk panel, ≥ ~60 % tinggi, tepi boleh bleed), bukan jendela kecil di kanvas kosong; jendela utuh hanya establishing, maks sekali per babak; teks UI terbaca di lebar 360 px. Dengan referensi, ikuti REF-SPEC §3.

## 8. Lima uji biner (jalankan pada setiap frame storyboard)

Jawaban "gagal" biasanya berarti frame dirancang ulang, bukan dipoles; bila kamu menilai itu bukan masalah, tulis alasannya. Tulis hasilnya per frame di `REFERENCE-BRIEF.md` §3 atau `STORYBOARD.md`.

1. **Hapus objek.** Bila sebuah bentuk dihapus dan pesan frame tidak berkurang, hapus bentuk itu.
2. **Clip-art.** Bila visualnya hanya terjemahan harfiah satu kata ("louder" jadi gelombang suara), ganti dengan tipografi kinetik murni atau bukti UI/produk nyata.
3. **Fokus tunggal.** Bila teks dan objek terpisah di dua area, leburkan atau pecah jadi dua beat berurutan.
4. **Kontinuitas.** Tiap frame menjelaskan dari mana ia masuk dan ke mana ia keluar; hanya "fade in / pop up" masih slide statis.
5. **Placeholder.** Objek harus lengkap dan bermakna; kotak kosong, garis abu pengganti teks, atau border putus-putus diisi konten nyata atau disederhanakan jadi TYPO_HERO murni (NEGATIF 4).

Seri berdampingan: layout sama (mis. satu benda kecil di tengah gradien) di > ~25 % frame atau 3+ berurutan = sidik jari (S-V31). `banding.py --seri <folder>` melaporkan % frame berpola itu (peringatan); sisanya dengan mata.

## 9. Gerbang warna

Palet dari `cek-warna.mjs masuk`; sebelum diserahkan `keluar` hijau. Rinci: `references/warna.md`.
