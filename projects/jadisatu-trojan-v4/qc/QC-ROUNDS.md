# QC berulang · Trojan v4

## Putaran 1 (pada v1)
Metode: contact sheet 2 dtk (`qc/v1sheet/sheet.png`), still per beat vs ref 08/09 (`qc/v1/compare_refs.png`), skrip gerbang, Devil's Advocate per beat.

| # | Temuan | Bukti | Perbaikan |
|---|---|---|---|
| 1 | Kalimat hook (beat 1) & kredit (beat 10) tumbuh dari kiri: kata yang belum muncul tetap memakan ruang, jadi baris tidak di tengah | sheet 0:00, 0:02, 1:18 | kata belum muncul lebarnya 0 → grup selalu di tengah, mengembang halus (BK01) |
| 2 | Palet: 3 keluarga, biru dominan 54 % (ref 09: 96 %) | `palette_check.py` v1 | gradien tile makanan & hero website → keluarga biru; kuning tersisa hanya ikon buku/emoji |
| 3 | Saat mengetik, HP zoom tapi 2/3 layar wallpaper kosong, teks composer kecil | sheet 0:26–0:30 | zoom lebih dekat ke composer & bubble (1,5 → 1,75) |
| 4 | Dasbor lahir: 4–5 frame kanvas abu kosong (terlihat seperti layar putih) | sheet 0:40 | tahap BK07 dipercepat, sidebar & judul muncul bersamaan kerangka |
| 5 | Kartu akun cabang kecil di tengah, banyak ruang kosong | sheet 0:46–0:50 | kartu diperbesar 1,3× |
| 6 | Beat 3 mundur: kartu terlalu kecil/tinggi; kalender beat 6 kalah besar dari ref 09 | compare_refs b03, b06 | zoom 0,88 + turun; kalender 1,25× + baris minggu redup-blur (kedalaman ala 09) |
| 7 | Devil's Advocate audio: SFX "kata" (ipad_click) tak terdengar di speaker HP | `audio_phone.py` 44→81/111 | sudah diganti `Kinetictypography` (SFXIrfan), gain per cue dibatasi rentang Modul 5 |
| 8 | Devil's Advocate kejujuran: "Rp99.000" di slider = harga karangan | still b07 awal | sudah diganti "Rp …" → Rp0 (sebelum v1) |
Tidak diubah (sengaja): durasi 83 dtk (VO tidak dipercepat, D3); angka UI demo diegetik (D8).
