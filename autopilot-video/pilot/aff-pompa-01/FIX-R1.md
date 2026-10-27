# Perbaikan ronde 1 (dari QC orchestrator, sudah lewat devil's advocate)

Render sudah dibuat orchestrator di `out/silent.mp4` (render per potongan, jadi kamu TIDAK perlu render penuh). Lembar QC: `out/qc/sheet.jpg`.
Ubah hanya beat yang disebut. Jangan mengubah beat lain, kontrak, atau audio.

| ID | Beat | Temuan | Perbaikan yang diminta |
|---|---|---|---|
| F1 | B1 (2,1-4,5 dtk) | Teks "Air sumurmu yang terlalu dalam." menabrak atap rumah saat kamera mundur (frame 105). | Saat teks itu tampil, posisikan kamera supaya atap rumah berada minimal 80 px di bawah baris teks terakhir (atau naikkan blok teks). Teks tidak boleh menimpa ilustrasi. |
| F2 | B4 (16,3-22,4 dtk) | Angka penggaris dan label "7-9 m" terlalu kecil untuk layar HP (frame 560). | Angka tick minimal 34 px, hanya tampilkan 0, 3, 7, 9, 11 m; label zona "7-9 m" minimal 44 px tebal, kontras tinggi, dengan latar pill putih. |
| F3 | B6 (26,8-30,4 dtk) | Label "ukur jaraknya" kecil. | Minimal 40 px, sejajar panah ukur, tidak menutupi pipa. |
| F4 | B7 (37,1-40 dtk) | Pertanyaan CTA hilang saat "Tulis di komentar" muncul; kontrak meminta subjudul, bukan pengganti. | Pertanyaan tetap tampil; "Tulis di komentar" muncul sebagai baris kedua lebih kecil (48-56 px) di bawahnya. |
| F5 | B6 kartu | Teks kartu kiri patah jelek ("9 m:" sendirian). | Kartu: baris 1 "Sampai 9 m" / "Lebih dari 9 m", baris 2 nama pompa. |

Setelah mengubah kode, verifikasi dengan still saja (bukan render penuh): `npx remotion still src/index.ts Main out/qc/r1_<frame>.png --frame=<f>` untuk frame 105, 560, 600, 860, 1170. Lapor dengan format BRIEF dan sebutkan frame yang sudah kamu periksa.
