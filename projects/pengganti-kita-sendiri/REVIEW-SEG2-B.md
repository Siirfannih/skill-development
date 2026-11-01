# REVIEW SEG2 · worker B (65–133 s)

Probe: remotion/seg2_probe.mjs, jendela temuan, tiap 2 frame, skala 0,25, setelah pull c8149b9 (Geist Sans). Checker per jendela, LOLOS hanya untuk yang mekanis.

## Perbaikan mekanis (diterapkan)
| temuan | perubahan | status |
|---|---|---|
| JANJINYA 69,3 y 210 | y 245 → 268 (S04c) | lolos |
| BILLION×DOLLAR CLASH | celah kata 0,3 → 0,55 em, lebar total 1290 → 1260 (S04d); aksen #FFD25A sesuai koordinator; atribusi pindah ke Geist Sans | CLASH lolos |
| SUKSES 78,1 | SATU/SUKSES 170 → 150 (seragam) | SAFE lolos; CONTR 1 frame masuk lolos |
| SAMA 86,4 | 360 → 300 (seragam dengan SEMUA) | SAFE lolos |
| FOUNDER 92,5 | FOUNDER/CEO/SEMALAM seragam 224 | SAFE lolos |
| SUSAH 102,7 | anchor y 866 → 610 (ruang tenang di antara kartu dan lantai, pictogram sudah keluar) | SAFE lolos |
| MEMBANGUN / MERENCANAKAN | ukuran 15,6 → 11,8 dan 12,2 → 10,8 (S06a) | SAFE lolos |
| PERAN / KAMU 128–132 | pindah dari lapisan kamera (y 826 → layar 940) ke ruang layar y 548, ukuran seragam 124 | SAFE + CONTR lolos |

Sisa CONTR hanya 1 frame (frame masuk blur 3 f): SUSAH 4,1, SAMA 4,1, FOUNDER 4,0, CEO 3,9. Masih di dalam toleransi 1–3 frame masuk.

## Dikembalikan (perubahan desain tanpa persetujuan)
Scrim radial di belakang kutipan Altman (dibuang), SENDIRI ke bidang putih dengan tinta gelap, dunia 06e naik 130 px + badan lebih panjang, grain 0 pada anchor. Semua kembali ke kondisi sebelumnya.

## Usulan (keputusan koordinator)
Still pratinjau 480 px belum dirender: CPU dibagi dengan worker A, probe satu jendela ± 3 menit. Bisa dirender begitu usulan dipilih.

### U1 · BILLION CONTR 2,2:1 (72,7–74,9, 34 sampel)
- Masalah: aksen kuning #FFD25A di atas footage Altman terang, gelap tidak cukup.
- Usulan A: gelapkan grade klip di bawah kutipan (brightness 1 → 0,62 mulai kata pertama, kembali saat kartu menyusut). Tanpa elemen baru, teks tetap warna aksen.
- Usulan B: BILLION putih, penekanan lewat textShadow lembut bawaan dan drift; aksen dihapus.
- Usulan C: kutipan dipindah ke area klip yang lebih gelap (kiri bawah, x 288–1100, y 700–820) di ruang tenang.
- Prinsip: teks prioritas 2, kontras ≥ 4,5:1, tanpa scrim. Mata: wajah Altman lebih dulu, lalu kutipan terbaca per kata, BILLION menutup lewat aksen. Rekomendasi: A.

### U2 · SENDIRI 116,4–117,0 (y 1063–1196, di luar layar)
- Masalah: setelah zoom C20 kepala piktogram keluar frame; tak ada ruang kosong di kiri composer. Teks ditulis dalam satuan lapisan 960×540 dengan skala 2, lalu zoom 1,4.
- Usulan A: di ruang layar, tinta gelap #101216 di area putih bidang, di bawah composer, x 1066 y 806 ukuran 92. Teks di dalam benda yang dibicarakan.
- Usulan B: hapus SENDIRI; prompt yang diketik sudah menjelaskan "hal sepele".
- Usulan C: putih di charcoal di atas bidang (y 150), tepi kiri 288.
- Prinsip: teks ikut subjek, kontras 18:1 (A). Mata: composer, prompt diketik, SENDIRI di bawahnya. Rekomendasi: A.

### U3 · TERTINGGAL 119,7–120,3 (y 900–1031)
- Masalah: kata duduk di y 962 di bawah kelompok, di luar safe zone y 864.
- Usulan A: seluruh dunia 06e naik 130 px (translateY), badan figur diperpanjang 80 unit supaya alas tidak tampak, kata di y 800. Teks di bawah, figur dan kelompok tetap utuh.
- Usulan B: kata di y 330 di atas kelompok (melanggar "teks tidak di atas visual").
- Usulan C: hapus teks; jarak figur ke kelompok dan truck sudah bercerita.
- Prinsip: teks di bawah atau di tengah, tidak di atas visual. Mata: figur padam, kelompok menjauh, lalu kata. Rekomendasi: A.

## Laporan checker rentang 65–133 s
Sisa: BILLION (U1), SENDIRI (U2), TERTINGGAL (U3) menunggu keputusan; tidak ada SAFE/CLASH lain; 4 CONTR masuk 1 frame. Belum LOLOS penuh.

## Keputusan koordinator (diterapkan)
- U1 BILLION: **diterima** tanpa perubahan (teks narasumber di footage dengan shadow lembut, keputusan Irfan 07.30). Aksen kuning tetap.
- U2 SENDIRI: opsi A diterapkan (x 1066, y 806, 92, tinta #101216). Checker 116,3–117,1: LOLOS. Tidak menimpa composer. Still: /home/claude/pks/v10/u2_1..3.png.
- U3 TERTINGGAL: opsi A diterapkan (dunia naik 130 px, badan 330, kata y 800, di kanan figur). Checker 119,5–121: hanya CONTR 4,1:1 di 1 frame masuk. Figur dan kelompok utuh. Still: /home/claude/pks/v10/u3_1..3.png.
