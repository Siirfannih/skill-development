## Catatan (v3)
- v3 (keputusan Irfan 26 Nov 01:18): subtitle pelat K-05 dihapus (teks layar = teks kinetik per kata), maskot KLIK dihapus, kalimat tanya tampil dengan tanda tanya. v2 ada di `v2/`. Dari v2: interior tong/kaleng digambar sebagai POTONGAN MELINTANG DARI SAMPING (`bersama/Tong.tsx`). v1 ada di `v1/`. VO, timing (54,03 dtk), mix, musik bed (pad orisinal), warna benda asli, 3 layer, aturan ADDENDUM-4 dipertahankan.
- Merek ini tidak memakai aturan skill-development (KEPUTUSAN-IRFAN 00:57): G4 dimatikan, render lewat kunci global tanpa render.sh final sah.
- Cek visual: `qc/cek/sheet1-3.png` (awal/tengah/akhir tiap beat dari draft v2), `qc/cek/transisi1-2.png`, dan `qc/beats_final_sheet.png` (keyframe render final). Kandidat golden: `qc/golden-kandidat/` (b03, b09, b14).

## POV per adegan
| Beat | POV | Alasan |
|---|---|---|
| b01 | samping, eye-level sedikit di atas meja | mangkuk, es, kaleng santan, termometer benda nyata di meja |
| b02 | dekat (mangkuk dan kaleng) | kamera mendekat ke mangkuk dan kaleng ("Kok bisa?") |
| b03 | samping eye-level (gerobak di lantai) lalu naik ke panel potongan melintang dari samping | pan satu arah meja→gerobak, tahan, naik ke panel yang dihubungkan garis putus dari tong |
| b04–b13 | potongan melintang dari samping, kamera menyusuri bagian yang dijelaskan | isi tong: es-garam, panas dari dinding kaleng, kerak beku dari dinding dalam, kristal, pengerok |
| b14 | samping eye-level lebar (pull-back) | gerobak di lantai, tiang tanpa kabel ke gerobak |
| b15 | samping eye-level di meja | kembali ke mangkuk dan kaleng (loop) |

## Isi layer per beat (LayerBackground / LayerAksi / LayerAtas di `adegan/Dunia.tsx`; caption pelat di atasnya)
Layer 1 Background (statis): dinding krem bergaris papan, panel cahaya, lantai.
| Beat | Layer 2 Karakter/Aksi | Layer 3 Atas |
|---|---|---|
| b01 | meja kayu, mangkuk baja + es, kaleng santan, termometer | tanpa |
| b02 | meja, mangkuk | tanpa (teks kinetik hero "Soalnya gini") |
| b03 | gerobak di lantai + tiang; panel potongan melintang tong dari samping; kartu termometer | tanpa |
| b04 | karung garam menuang, garam jatuh dan menumpuk di atas es | label GARAM |
| b05 | kubus es dekat dinding mulai membulat, air leleh naik | tanpa |
| b06 | kartu termometer, merkuri turun di bawah garis nol | tanpa |
| b07 | kubus es mencair | tiga panah panas jingga dari dinding kaleng ke es |
| b08 | tong terpotong utuh, es meleleh | panah panas dari dalam kaleng menembus dinding ke es  |
| b09 | dinding dalam kaleng: kerak beku putih tumbuh dari dinding ke tengah | tanpa |
| b10 | tong terpotong, engkol di tutup kaleng berputar | panah putar  |
| b11 | dinding dalam kaleng: kristal besar runcing tumbuh dari kerak | tanpa |
| b12 | dinding dalam kaleng: kristal kecil bulat, pengerok baja mengikis naik-turun | tanpa |
| b13 | garam dan dua es baru jatuh ke atas campuran | label GARAM tetap |
| b14 | pull-back: gerobak di lantai, tiang tanpa kabel ke gerobak, panel di atas | label kimia SMA |
| b15 | roti tawar + cone di meja; mangkuk + kaleng (loop) | tanpa |
