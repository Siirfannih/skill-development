# TASK r3a · Mesin + Babak 1–2 (B01–B13): perbaikan visual dari REVIEW-v1-self

Editor A. P = `projects/builder-trap-r2`, R = root repo `skill-development`. Versi v1 sudah dilihat Irfan: jangan menimpa `out/builder-trap-r2_v1.mp4`.

## Cakupan
- File kamu: `P/remotion/src/engine/*`, `P/remotion/src/scenes/Act1*`, `Act2*`, `Act2b*`. Babak 3–4 (Act3*, Act4*) milik Editor B (ronde berikutnya): perubahan mesinmu harus tetap bekerja untuk adegan mereka tanpa mengubah file mereka.
- Catat setiap perubahan perilaku mesin di `P/handoff/ENGINE-CHANGES.md` (awalan `r3a`).

## Perbaiki (ID dari `P/handoff/REVIEW-v1-self.md`)
1. **F-v1-01 (mesin, palet babak 3):** di `engine/theme.ts` dan `Surfaces.tsx` ganti gelap navy jadi gelap netral: `dark0 #0E0E10` → `dark1 #1B1B1F` (linear, tanpa radial). `accentDark` jadi putih penuh `#F4F4F5`; hierarki di gelap = putih penuh (kunci) vs abu `#8E8E96` (kepala/sambung), bukan biru. `Print.tsx` gradien biru → netral. Benang dinding mode gelap → abu terang `#C9CBD1`. Biru `#1A3AD0` tetap boleh di latar terang (babak 1–2, 4) sebagai satu aksen.
2. **F-v1-02 (mesin, ukuran teks):** di `TextLayer` beri lantai ukuran: narasi/sambung ≥ 56 px, kata kunci/besar ≥ 96 px (aturan inti 8), tanpa melebihi lebar aman (safe frame x 165–1755). Bila kalimat jadi terlalu lebar, pecah ke 2 baris (Lantai A4), jangan kecilkan di bawah lantai.
3. **F-v1-03 (mesin + B04, B07, B09, B10, B11, B13):** tambah preset crop wajah sinematik di `Face.tsx`, mis. `M` mata (s ≈ 2,6–2,8, mata di sepertiga atas), `T` mulut + tangan (s ≈ 2,2, cy bawah), `P` sisi (s ≈ 1,9, wajah di sepertiga kiri/kanan, ruang kosong untuk teks di sisi lain), plus `unsharp` ringan untuk crop besar. Grade `terang`: kontras sedikit naik, hangat, hitam tidak abu. Tiap sisipan wajah di babak 1–2 memakai crop berbeda dari sisipan sebelumnya; teks berada di ruang kosong yang diciptakan crop itu, dekat wajah, tidak 3× berturut di pita yang sama.
4. **F-v1-04 (B12):** kamera push ke kotak prompt ChatGPT saat "investasi waktu pada AI" sehingga kotak prompt + teks di dalamnya ≥ 6 % tinggi; narasi menempel kotak itu.
5. **F-v1-05 (B06):** "Memasuki usia 20-an…" menempel cetakan foto (jarak ≤ 0,15 lebar frame dari tepi foto).
6. **F-v1-06:** B06 — sisa blok mosaik biru di tepi kiri harus hilang sepenuhnya saat transisi selesai; B05 — kursor tidak diam di tengah judul (hapus atau gerakkan keluar sebelum judul terbaca); B10 — thumbnail tidak terpotong tepi atas tanpa alasan gerak kamera.

## Jangan berubah
Naskah/teks yang tampil (hanya ukuran/posisi), urutan beat, timing ucapan, audio. Babak 3–4 kecuali efek otomatis perubahan mesin (palet gelap, lantai ukuran) — periksa still B15, B17, B20 setelah perubahan mesin dan laporkan bila ada yang rusak.

## Boleh dibaca
`P/handoff/BRIEF.md`, `PLAN.json`, `REVIEW-v1-self.md`, file ini, `ENGINE-CHANGES.md`, `R/claude/motion-graphic/LANTAI.md`, `P/RESEP.md`, kartu `R/claude/motion-graphic/pustaka/kartu/55-*.md` dan `63-*.md`, `pustaka/contoh-gagal/`, kode `P/remotion/src`, skill Remotion.

## Render
`flock P/qc/.render.lock R/claude/motion-graphic/scripts/juri/render.sh P still …` dari root repo `R` (render.sh mencari kartu relatif ke root). Still minimal 2 per beat yang diubah + B15, B17, B20 (cek mesin). Disk PC tinggal ±2,8 GB: hapus still lama milikmu bila perlu, jangan menyentuh `out/`.

## Keluaran wajib
- Lembar still `P/qc/r3a_sheet.jpg`
- `python3 R/claude/motion-graphic/scripts/juri/teks_cek.py` pada still baru (keluaran apa adanya)
- `node P/remotion/scripts/cekkata.mjs 0 38.95` (semua kata tetap tampil sekali)
- `P/handoff/REPORT-r3a.md` (format `R/claude/motion-graphic/templates/roles/handoff.md`): per ID temuan apa yang diubah + path still bukti + angka (ukuran px teks, tinggi elemen UI)

Selesai bila: semua kriteria F-v1-01…06 untuk B01–B13 terpenuhi di still, mesin tidak merusak babak 3–4, cekkata lulus.
