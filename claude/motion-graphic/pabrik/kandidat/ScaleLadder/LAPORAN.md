# Laporan uji ScaleLadder

Spec: `46-T1` (tipografi). Lulus = nol dosa (skrip + vision + jangkar) DAN metrik keras dalam ambang (`uji.py` AMBANG).

## Putaran 1: GAGAL

Dosa terpicu: tidak ada

Temuan:
- gerak: hanya 0.20 pasangan frame berubah (< 0.25)

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 0 / 0 |
| fokus kecil-tengah, sampel berturut maks | 0 dari 60 |
| probe: teks kecil / tabrakan / terpotong | 0 / 0 / 0 (frame [10, 40, 75, 119]) |
| warna luar palet | tidak ada |
| struktur vs referensi (terbaik; rata-rata per ref; n ref) | 0.3533 (ssim 0.6244, edge 0.0822; frame 10 vs `guide/referensi/sheets/keyframes/46-k8-penutup.jpg`); 0.1824; 8 |
| gerak (tipografi) | frame berubah 0.202 |
| dua token (edge / ssim / selisih piksel) | 0.8797 / 0.3771 / 154.01 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Frame 10 menampilkan 'Ber' yang terpotong kasar: huruf 'r' terpotong di tepi blok oranye, dan sisi atas 'Ber' menabrak batas krem/oranye. Pecah kata di tengah huruf tanpa pendaratan geser terlihat seperti bug render. Perbaiki dengan menahan kata raksasa sampai semua huruf masuk, atau beri geser horizontal 0,08 lebar dan jeda 2 frame yang terbaca.
2. 'Berubah' di frame 40, 75, dan 119 terpotong di tepi kanan: huruf 'h' menempel atau melewati batas frame, padahal mekaniknya menyentuh tepi, bukan terpotong. Kecilkan ukuran sekitar 3–4% atau geser pusat ke x 0,5 supaya margin kiri dan kanan seimbang.
3. Panel 'footage' di bawah tengah hanya kotak kuning dengan balok putih, jadi terbaca sebagai ikon placeholder, bukan footage. Isinya tidak punya detail, tekstur, atau gerak yang berarti, sehingga 'footage terbaca di sela huruf' tidak terpenuhi. Ganti dengan klip nyata atau ilustrasi beradegan, dan beri kontras terhadap latar.
4. Blok warna latar (krem atas, oranye tengah, cokelat gelap kiri/kanan) berpindah posisi antar frame tanpa alasan terbaca. Di frame 75 dan 119 blok cokelat pindah ke kanan di belakang 'bah', sehingga huruf hitam di atas cokelat gelap hampir hilang. Kunci pembagian blok dan jangan menaruh huruf hitam di atas cokelat tua: pakai krem atau oranye di bawah kata raksasa.
5. Kata kecil ('yang kamu kerjakan hari ini') terlalu kecil dan lemah dibanding kata raksasa, dan jaraknya hampir rata. Tidak ada garis baseline bersama dengan kata raksasa dan tidak ada hubungan spasial. Rasionya kira-kira lebih dari 8x, di luar kisaran 3,5–8x. Naikkan ukuran sekitar 30%, rapatkan ke kata raksasa, dan beri jeda yang bervariasi.

Lembar side-by-side (referensi kiri | kandidat kanan): `pabrik/kandidat/ScaleLadder/lembar-r1.jpg`

## Putaran 2: GAGAL

Dosa terpicu: g, j

Temuan:
- DOSA g: vision: Kotak 'footage' di bawah tengah (kira-kira x 642–771 di tiap baris) hanya blok kuning/cokelat tua datar dengan garis tipis dan satu bar hitam kecil. Itu bukan footage, tampak seperti kotak pengganti. Persegi krem/kuning yang berserakan di pita oranye (baris 1 kiri-bawah, baris 2 dan 4 kanan-bawah) juga kotak kosong tanpa isi.
- DOSA j: f40: 'B' x 'yang'; f40: 'u' x 'kerjakan'; f75: 'B' x 'yang'; f75: 'u' x 'kerjakan'

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 0 / 0 |
| fokus kecil-tengah, sampel berturut maks | 0 dari 60 |
| probe: teks kecil / tabrakan / terpotong | 0 / 10 / 0 (frame [10, 40, 75, 119]) |
| warna luar palet | tidak ada |
| struktur vs referensi (terbaik; rata-rata per ref; n ref) | 0.3471 (ssim 0.5981, edge 0.0962; frame 10 vs `guide/referensi/sheets/keyframes/46-k8-penutup.jpg`); 0.1739; 8 |
| gerak (tipografi) | frame berubah 1.0 |
| dua token (edge / ssim / selisih piksel) | 0.9913 / 0.31 / 165.98 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Kata kecil 'yang' (kiri atas 'Berubah', baris 2–4, kira-kira x 508–567) menempel pada ascender 'B'. Descender 'g' hampir menyentuh bagian atas huruf raksasa. Baselinenya juga lebih rendah dari 'kamu', 'kerjakan', dan 'hari ini', jadi satu baris kata kecil tidak sejajar. Naikkan seluruh baris kata kecil dan kunci baseline-nya sama, dengan celah jelas di atas ascender.
2. Kata raksasa 'Berubah' (baris 3–4) hampir terpotong di kanan: 'h' berakhir sekitar x 948 dari 966, sedangkan margin kiri sekitar 25 px. Margin kiri dan kanan tidak seimbang dan terasa sesak. Skalakan lebar kata agar margin simetris, atau sengaja biarkan terpotong tegas.
3. Pita oranye dengan tepi horizontal keras memotong huruf hitam tepat di tinggi x-height. Di baris 2 ada garis tipis dan serpihan kuning di kanan 'h' (sekitar y 400). Huruf jadi tampak terbelah dua latar dan ada artefak tepi. Pindahkan tepi pita ke baseline atau ke belakang seluruh kata, dan bersihkan serpihan.
4. Kotak footage bawah-tengah hanya persegi kuning/cokelat dengan garis 1 px dan bar hitam kecil, identik di keempat frame. Ia tidak memuat gambar yang terbaca lewat sela huruf, jadi lapisan footage tidak terlihat bekerja. Isi dengan footage nyata atau gerak, dan beri ia peran terhadap kata (ditutup sebagian dari atas, seperti di mekanik).
5. Persegi krem dan kuning acak di pita oranye (kiri-bawah, kanan-bawah, di dalam counter 'e' dan 'b') tampak dihambur tanpa logika. Posisinya berpindah antar frame, terpotong di tepi (kira-kira x 485–505 dan 933–966), dan menambah noise di balik huruf. Kurangi jadi beberapa elemen dengan grid atau ritme yang jelas, atau hapus.

Lembar side-by-side (referensi kiri | kandidat kanan): `pabrik/kandidat/ScaleLadder/lembar-r2.jpg`

## Putaran 3: LULUS

Dosa terpicu: tidak ada

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 0 / 0 |
| fokus kecil-tengah, sampel berturut maks | 0 dari 60 |
| probe: teks kecil / tabrakan / terpotong | 0 / 0 / 0 (frame [10, 40, 75, 119]) |
| warna luar palet | tidak ada |
| struktur vs referensi (terbaik; rata-rata per ref; n ref) | 0.2324 (ssim 0.3531, edge 0.1117; frame 119 vs `guide/referensi/sheets/keyframes/46-k8-penutup.jpg`); 0.1211; 8 |
| gerak (tipografi) | frame berubah 1.0 |
| dua token (edge / ssim / selisih piksel) | 0.9875 / 0.3841 / 138.33 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Footage diganti ilustrasi vektor datar (siluet kota, jendela kuning, kotak matahari terbenam). Di KIRI footage nyata terbaca lewat dan di sela huruf raksasa. Di KANAN huruf 'Berubah' duduk di atas oranye polos, jadi tidak ada lapisan footage di bawah huruf. Perbaikan: taruh footage atau tekstur nyata di bawah kata raksasa dan buang latar oranye datar.
2. Kata raksasa terkurung di pita oranye. Lebarnya sekitar 0,8 lebar frame, ada margin kiri-kanan, dan huruf tidak menyentuh tepi horizontal. Di KIRI 'life' menembus tinggi frame. Strip krem di atas dibiarkan kosong dan tidak ikut skala. Perbaikan: perbesar kata sampai hampir menyentuh kedua tepi kiri-kanan dan hapus pembagian band atas/bawah.
3. Baris kecil 'yang kamu kerjakan hari ini' ada di strip krem terpisah di atas, dengan empat kata rata bergaris dan jarak yang tidak sama (jarak 'yang'-'kamu' lebih sempit daripada 'kamu'-'kerjakan'). Kata-kata itu terbaca sebagai kalimat caption, bukan pendamping yang menempel pada baseline kata raksasa seperti 'you' dan 'call' di KIRI. Perbaikan: sebar 1–2 kata di kiri dan kanan kata raksasa pada satu garis baseline dengan jarak lebar.
4. Di frame 10 kata 'Ber' bertabrakan dengan elemen lain. Huruf 'e' dan 'r' menempel karena tracking terlalu rapat. Bagian bawah 'Ber' menumpuk di atap gedung dan jendela kuning, dan bagian atas 'B' nyaris menyentuh tepi pita oranye. Kotak matahari terbenam berbingkai tipis 1px terlihat seperti thumbnail yang ditempel di tengah bawah dan menutupi area baseline. Perbaikan: beri jarak aman antara kata dan siluet kota, longgarkan tracking 'er', dan buang bingkai tipis atau jadikan kotak itu inset yang jelas.
5. Frame 40, 75, dan 119 hampir identik: kata, baris kecil, dan band tidak berubah, hanya kotak matahari dan sedikit siluet gedung yang bergeser. Masuk per huruf dengan geser horizontal tidak terlihat sebagai adegan, dan tidak ada cut atau lompatan skala yang membuat kata raksasa 'bertahan'. Di KIRI kata raksasa muncul di tengah footage yang berganti. Perbaikan: beri tiap adegan perubahan latar atau footage di belakang kata raksasa dan buat jeda per huruf terlihat jelas pada frame awal.

Lembar side-by-side (referensi kiri | kandidat kanan): `pabrik/kandidat/ScaleLadder/lembar-r3.jpg`
