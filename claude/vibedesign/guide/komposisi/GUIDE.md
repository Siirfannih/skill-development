# Komposisi: ruang kosong punya kerja

## Cara
- Teks utama dan fokus ditaruh dulu. Setelah itu baru isi ruang kosong yang terasa sepi dengan elemen sekunder.
- Elemen sekunder (thumbnail, chip, stiker, teks blur foreground, label) diletakkan di tepi kanvas, dirotasi kecil berbeda, sebagian boleh keluar tepi; opasitas atau blur lebih rendah dari teks utama.
- Kedalaman dibuat lewat lapisan: latar bertekstur → konten → foreground blur.

## Cara memutuskan
- **[KMP-01] Elemen sekunder mengisi tepi, tidak bersaing** · kelas P (kandidat H) · cek: sketsa + juri teks
  - Pemicu: ada ruang kosong besar di tepi, atau ada strip/baris elemen pendukung yang menyita satu area sendiri.
  - Anti-pola: elemen pendukung disusun rapi di satu area (strip thumbnail di bawah, kolom ikon) sehingga ikut bersaing dengan judul, atau menyentuh teks utama.
  - Invarian: sebar elemen sekunder di ≥ 2 sisi kanvas; bounding box-nya tidak menyentuh bbox teks urutan 1–3 (jarak ≥ 16 px); kontras atau opasitasnya di bawah teks utama (contoh: opasitas ≤ 0,85 atau blur ≥ 2 px untuk yang di belakang).
  - Karena: tepi yang terisi membuat slide terasa hidup, tetapi mata tetap jatuh ke judul.
  - Boleh: satu elemen pendukung yang sengaja jadi bukti visual (lihat PSN-01) boleh lebih menonjol.
  - Gerbang: juri teks (tabrakan) + still.
- **[KMP-02] Kelompok yang dibaca berurutan berjarak rapat dan konsisten** · kelas P · cek: sketsa + juri hierarki
  - Pemicu: dua blok yang dibaca berturut-turut di BRIEF (teks → bubble, judul → subjudul) ditaruh dengan jarak bebas.
  - Anti-pola: celah besar antara satu blok dan blok yang harus dibaca berikutnya, sehingga keduanya terasa milik kelompok berbeda dan mata kehilangan alur.
  - Invarian: jarak vertikal antar blok yang berurutan dalam satu kelompok ≤ 1× tinggi huruf blok yang lebih kecil dan seragam (selisih ≤ 25 %) di satu slide; jarak antar kelompok berbeda ≥ 2× jarak dalam kelompok.
  - Karena: kedekatan (Gestalt proximity) adalah sinyal paling kuat bahwa dua hal dibaca bersama.
  - Boleh: jeda sengaja sebagai ritme dramatis bila ditulis di RESEP.
  - Gerbang: still + jarak terukur ditulis di TAHAP (juri hierarki bila tersedia).

- **[KMP-03] Objek besar berpijak pada bidang, tidak melayang** · kelas P · cek: still + lembar sanding
  - Pemicu: ada kata raksasa, objek, atau karakter yang duduk di atas latar bergradien, lantai, atau grid.
  - Anti-pola: baseline objek jauh dari garis horizon/lantai, dan jarak di antaranya hanya bidang warna rata tanpa tekstur atau perspektif, sehingga objek terasa mengambang dan mata kehilangan titik pijak. Grid perspektif dibuat lewat `rotateX` + mask sehingga horizonnya jatuh di tempat yang tidak dihitung.
  - Invarian: horizon lantai (garis atas grid perspektif) = baseline objek (selisih ≤ 1 % tinggi kanvas); ada isyarat kontak di baseline (bayangan kontak lembut atau garis horizon lebih terang); perpindahan warna terang→gelap terbesar jatuh di sekitar baseline, bukan di tengah objek atau jauh di bawahnya. Ukur posisi baseline dari render, bukan perkiraan.
  - Karena: otak membaca objek "berdiri" bila ada bidang yang ia sentuh; celah tanpa isyarat kedalaman dibaca sebagai jarak, jadi objek terasa jauh dan melayang.
  - Boleh: objek yang memang sengaja melayang (mis. kartu atau karakter yang terbang) asal ada bayangan jatuh yang terpisah untuk menunjukkan ketinggiannya.
  - Gerbang: still di TAHAP + catat posisi baseline dan horizon (px) di RESEP.

- **[KMP-04] Ruang kosong di antara kelompok baca punya tugas** · kelas P · cek: still 300 px + jarak terukur di TAHAP
  - Pemicu: ada pita kosong yang lebih lebar dari jarak antar-kelompok di antara dua kelompok yang dibaca berurutan, atau di atas blok utama.
  - Anti-pola: blok utama atau objek menunggu jauh di bawah, sehingga mata turun melewati ruang mati; margin atas konten berbeda-beda antar slide sejenis.
  - Invarian: pita kosong tanpa tugas tertulis di RESEP ≤ 2× jarak antar-kelompok slide itu; margin atas konten sama (selisih ≤ 1 % tinggi kanvas) di slide dengan header yang sama. Ukur dari render (px), tulis di TAHAP.
  - Karena: mata membaca ruang kosong lebar sebagai akhir; konten sesudahnya terasa terpisah atau terlewat.
  - Boleh: ruang kosong sebagai jeda dramatis atau napas sebelum punchline, bila tugasnya ditulis satu kalimat di RESEP.
  - Gerbang: still + angka di TAHAP; lembar sanding.
