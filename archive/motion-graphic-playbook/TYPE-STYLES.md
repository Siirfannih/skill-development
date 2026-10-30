---
status: archive
scope: archive
how_to_use: "Jangan dimuat. Digantikan skill yang masih aktif."
---

# Kamus Gaya Teks · Irfan Motion (draft v0 · 13 Okt 2026)

Berlaku untuk semua video motion Irfan (launch Tuntunly dan video edukasi 30–60 detik). Kamus ini mengatur TAMPILAN teks. GERAK teks tetap memakai kode T01–T17 di SKILL.md §3. Satu beat = satu gaya utama + paling banyak satu gaya pendamping.

Cara pakai di spec beat: tulis kode gaya di kolom Teks, contoh `G2 + G3 "belajar?"`, `G1 + G4`.

## Font (dikunci)

| Peran | Font (PostScript) | Dipakai untuk |
|---|---|---|
| Slam | NHaasGroteskDSPro-95Blk (fallback: Poppins-Black) | G1, satu kata atau dua kata pendek yang menghantam |
| Headline | NHaasGroteskDSPro-65Md | G2, kalimat utama |
| Body | NHaasGroteskDSPro-45Lt | kalimat penjelas kecil |
| Aksen | InstrumentSerif-Italic | G3, satu kata kunci per kalimat |
| Label / UI ilustrasi | Inter-SemiBold, Inter-Medium | G7, pil, tombol, teks di layar laptop ilustrasi |
| Kode | JetBrainsMono-Regular | hanya kode di layar laptop |

Build wajib gagal kalau font tidak ditemukan AE (fungsi `fontOK` di jsx v11).

## Warna teks

- Di latar hitam: putih #FFFFFF. Di latar putih/krem: tinta #0A0A0A.
- Teks tidak pernah diberi blok warna di belakangnya (stabilo dihapus).
- Warna mengikuti token website Tuntunly: hutan #1F4D2E, stabilo #D4EC5A, data-a (ungu) #7B5CE0, data-b (hijau) #7DBB3C, tinta #1E2A22, kartu #FFFEFB, kertas #FAF8F3.
- Tombol / CTA: isi hutan #1F4D2E, teks putih Inter-SemiBold (sama dengan tombol "Coba gratis" di website).
- Color flash (G4): lihat bagian G4.
- Latar adegan UI: kertas #FAF8F3 boleh dipakai sebagai latar Babak 3 kalau putih #FFFFFF membuat kartu (#FFFEFB) tenggelam; pilih satu dan pakai konsisten di seluruh Babak 3.

## Gaya

### G1 · Slam
- Font Slam, ukuran L–XL (14–40% H), tracking −20, satu baris.
- Masuk dengan T03 slam + C07 shake. Keluar T15 smear atau T14 scatter.
- Contoh: "Masih sama.", "Lupakan." → "LUPAKAN" (beat 08–09 memakai G1 dari awal sampai pecah; tidak ganti font di tengah, supaya transisi dari Lupakan. ke LUPAKAN mulus), "Learn".

### G2 · Headline
- Font Headline, ukuran M (7–10% H), tracking 0, maksimal 2 baris, patah di jeda makna.
- Hampir selalu dipasangkan dengan G3 pada kata kuncinya.

### G3 · Aksen serif
- InstrumentSerif-Italic, 1,5–2× ukuran G2 di baris yang sama, baseline sejajar.
- Hanya SATU kata per kalimat, dan kata itu masuk terakhir.
- Contoh: "Tapi cara kita *belajar?*", "Jadi *langkah* kecil.", "Sesuai *tujuanmu.*", "Mulai dari *mana?*".

### G4 · Color flash (masuk & keluar kata)
Acuan: video baikovphilipp (ssspin.io), "What makes your company unique?". BUKAN outline, BUKAN glow, BUKAN neon menetap.
- Masuk: kata masuk per kata (T01 naik + motion blur dari geraknya sendiri) dengan ISI huruf berwarna aksen solid. Setelah mendarat, warna aksen ditahan ±6 f, lalu berganti ke warna dasar (putih di latar hitam, tinta di latar terang) dalam 2–3 f.
- Keluar: kebalikannya. 3–4 f sebelum keluar, kata kembali ke warna aksen, lalu keluar dengan T15 smear/blur gerak.
- Tiap kata yang kena flash memakai warna aksen berbeda, bergiliran dari token website: latar hitam → stabilo #D4EC5A, data-a #7B5CE0, data-b #7DBB3C; latar terang → hutan #1F4D2E, data-a #7B5CE0, data-b #7DBB3C.
- Hanya pada kata yang ditekankan: "setiap minggu.", "Masih sama.", "Tuntunly". Kata lain di kalimat yang sama masuk biasa dengan warna dasar.
- Tidak ada stroke, outline, glow, atau bayangan di sekitar huruf.
- SFX: satu tick/pop kecil per kata saat mendarat, bukan shimmer.

### G5 · Teks berperspektif
- Layer 3D yang menempel bidang ruang (contoh: jalur cahaya), rotasi X 55–70° sesuai kemiringan bidang. Font sama dengan G2 + G3, tracking normal (T13 tracking spread dilarang untuk makna "jauh").
- Kamera mengikuti tokoh; blur hanya dari gerak zoom kamera (Camera depth of field / motion blur), tidak ada blur statis.
- Contoh: "Jaraknya *makin jauh.*".

### G6 · Teks dalam adegan
- Teks diletakkan di lapisan antara latar dan objek depan (meja, tokoh, laptop) supaya terasa satu ruang.
- Objek boleh menutup paling banyak 10% huruf, tidak boleh menutup huruf pertama, dan tidak boleh menutup apa pun selama jeda baca.
- Contoh: "Baca.", "Catat.", "praktik.".

### G7 · Label / pil
- Inter-SemiBold, XS–S (2–4% H), pil putih rounded, garis tinta 2 px. Uppercase + tracking +150 hanya untuk kategori ("CARA KONVENSIONAL", "CARA BARU").
- Tidak pernah berdiri sejajar dengan headline di frame yang sama sebagai fokus kedua.

## Larangan (berlaku di semua gaya)

- Tidak ada blur/scrim/bayangan hitam di belakang teks. Keterbacaan diselesaikan dengan komposisi atau menggelapkan latar.
- Tidak ada stabilo/blok warna di belakang kata.
- Tidak ada coretan aksen (garis kejut, garis semangat di kepala Buddy, benang kusut). Itu bias gambar AI di storyboard, bukan bagian gaya.
- Tidak ada pergantian font di tengah satu kata/adegan yang sama.
- Satu frame boleh berisi banyak objek, tetapi hanya SATU yang sedang difokuskan. Jangan pernah menyorot atau menganimasikan beberapa bagian bersamaan. Pilih salah satu: (1) sorot bergantian, satu per satu; (2) kamera zoom/fokus ke bagian yang disorot, satu per satu; (3) sorot hanya bagian yang benar-benar penting. Contoh salah: v11 "Ditandai untukmu", dua baris disorot sekaligus sementara headline masuk di sisi kanan.

## Lembar uji (gerbang sebelum build video)

Sebelum membangun video, buat komposisi `TYPE-TEST` berisi satu still per gaya (G1–G7), masing-masing diletakkan berdampingan dengan potongan panel storyboard acuannya. Render jadi satu PNG `docs/qa/TYPE-TEST.png` + video 4 detik khusus G4 (color flash). Irfan menyetujui lembar ini dulu. Setelah disetujui, setiap gaya dijadikan fungsi jsx (`gayaSlam`, `gayaHeadline`, `gayaAksen`, `gayaFlash`, `gayaPerspektif`, `gayaLabel`) dan video hanya memanggil fungsi tersebut.
