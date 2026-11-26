# Perbaikan ronde 2 (QC orchestrator atas render r1, lembar `out/qc/sheet_r1.jpg`)

F1 dan label 7-9 m sudah lulus: JANGAN diubah. Render tetap dikerjakan orchestrator; kamu cukup ubah kode dan jalankan typecheck.

| ID | Beat | Temuan r1 | Perbaikan |
|---|---|---|---|
| F4b | B7 (37,1-40 dtk) | "Tulis di komentar" muncul kecil dan menumpuk di atas atap rumah yang di-blur, tepat di bawah pertanyaan. Tidak terbaca. | Susun blok CTA vertikal di tengah layar (bukan di atas ilustrasi): pertanyaan 88 px tebal hitam, jarak 28 px, lalu "Tulis di komentar" 52 px tebal warna #E8590C. Taruh panel putih semi-solid (opacity 0.85, radius 32, padding 48) di belakang blok supaya latar blur tidak mengganggu. Blok di tengah vertikal layar (sekitar y 820-1100). |
| F5b | B6 kartu (30,5-34,5 dtk) | Teks kartu jadi terlalu kecil (baris 2 kira-kira 22 px). | Baris 1 ("Sampai 9 m" / "Lebih dari 9 m") 44 px tebal; baris 2 (nama pompa) 36 px, boleh 2 baris. Kartu kiri redup tetap terbaca (warna teks #555, bukan abu sangat muda). |
| F3b | B6 (26,8-30,4 dtk) | Label "ukur jaraknya" masih kecil. | 44 px tebal, pill putih dengan border oranye tipis, sejajar tengah panah ukur. |
| F2b | B4 | Angka tick (0, 3, 7, 9, 11 m) masih kecil. | Angka tick 36 px tebal, warna #111, pill putih kecil di belakangnya. |

Lapor BRIEF singkat.
