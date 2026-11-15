# TASK r2 · lapisan teks diganti ke TEKS.json (semua ucapan, 1–3 kata, besar, seimbang) + perbaikan F-r1

Cakupan: lapisan teks semua beat; bingkai B2/B4; B6b; B9b; B12. Visual/kamera/material lain dari r1 tidak diubah kecuali disebut.

Boleh dibaca: yang sama dengan TASK-r1, ditambah `handoff/TEKS.json`, `handoff/REVIEW-r1.md`. Lantai sudah diperbarui di main (A2, A4, A9): baca ulang `claude/motion-graphic/LANTAI.md` bagian A.

## Jawaban pertanyaan r1
Q1 a) "gonna" · Q2 a) huruf kecil + amber, KAPITAL hanya untuk gaya `t`/`d` di B1, B12 dan judul · Q3 a) · Q4 diganti oleh TEKS.json gaya `t` · Q5 dihapus: teks besar 1–3 kata muat · Q6 b) semua ucapan tampil, sumber = TEKS.json · Q7 a).

## Perbaikan
1. **Teks (F-r1-01/02/03/07)**: hapus semua teks lama; tampilkan persis `handoff/TEKS.json` (66 tampil). Satu tampil di layar pada satu waktu: muncul di `muncul`, hilang/berganti di `hilang` (tampil terakhir bertahan sampai akhir lalu fade bersama frame). Kata `kunci` = amber `#E8A33D`, sisanya `#F4F1EA`.
   - Gaya `s`: satu baris. Tinggi huruf kapital ≥ 7 % tinggi frame (≈ 76 px, font ±105 px) di b-roll dan kartu; ≥ 6 % (font ±92 px) di talking head. Poppins 600, kata kunci 700, ukuran sama.
   - Gaya `t`: tumpuk 1 kata per baris, **rata lebar** (ukuran tiap baris diatur supaya lebarnya sama, mis. "HIGH" besar di atas "EXPECTATIONS"). Kapital, 700.
   - Gaya `d` (T66 "OF PAIN AND" / "SUFFERING."): dua baris seimbang, kapital, 700, ±9 % tinggi.
   - Gaya `judul` (T26): kartu SUFFERING r1 dipakai.
   - Posisi: menempel subjek (Lantai A2 baru: jarak ke subjek yang dirujuk ≤ 8 % tinggi frame, tidak lebih dekat ke tepi daripada ke subjek). Talking head: dinding kosong di seberang wajah, sejajar mata/dagu. Posisi boleh bergeser antar-tampil mengikuti komposisi; dalam satu beat jangan lompat acak (maks 2 posisi per beat).
   - Kontras ≥ 4,5 : 1 lewat bayangan lembut / gelap lokal, tanpa kotak (A9) (F-r1-06).
   - Masuk tiap tampil: gerak singkat 6–8 frame (naik + fade/blur ke tajam), bukan muncul mendadak.
2. **Bingkai (F-r1-04)**: B2 bingkai putih tumbuh 62 → 72 % lebar frame selama beat; teks di bawahnya rata kiri bingkai. B4 setiap cetakan ±40–45 % lebar (satu cetakan dominan per tampil kamera), kamera menyusuri cetakan.
3. **B6b (F-r1-05)**: teks foto tim di area tanpa wajah (atas foto digelapkan/vignette, atau crop/pan supaya ada ruang); tidak menutupi wajah.
4. **B12**: T64 "I wish upon you" di Jensen; kartu hitam mulai T65 "AMPLE" / "DOSES" (gaya t), lalu T66 menggantikan, bertahan sampai 46,1 dtk, ekor sampai 47,6 fade ke hitam. Tanpa logo.

## Keluaran wajib
- Still ulang semua beat (satu still per beat minimal + satu per gaya `t`/`d`/judul) lewat `render.sh still`.
- Gate: `teks_cek.py`, `balance_check.py` (salin apa adanya). Tambahan cek sendiri: tiap still, ukur tinggi huruf kapital (px) dan rasio baris (untuk `t`/`d`) — tulis di REPORT.
- Draft 0,5 baru: `render.sh draft Main` (jalankan sendiri, satu render saja; JANGAN `pkill` pola umum — hanya PID milikmu).
- `handoff/REPORT-r2.md`.

Selesai bila: 66 tampil sesuai TEKS.json (cek dari kode, sebut jumlah), teks_cek tanpa FAIL, tinggi huruf narasi ≥ 76 px b-roll / ≥ 64 px talking head, draft 47,6 dtk.
