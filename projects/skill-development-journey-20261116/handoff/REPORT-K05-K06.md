# REPORT K05 + K06 (Builder)
- File dibuat: remotion/src/komponen/K05-TimelinePutus.tsx (+ K05/fonts.ts), K06-TabelKeputusan.tsx (+ K06/fonts.ts), uji/K05-entry.tsx, uji/K06-entry.tsx.
- Di luar folder komponen: remotion/public/fonts/ (6 woff2 salinan dari claude/motion-graphic/fonts: Anton 400, Poppins 800, Inter 400/500/600/700) dimuat lewat FontFace + delayRender. Tidak ada paket baru, package.json/Root.tsx/index.ts tidak disentuh.
- K05 props: mulai, kSlop, kPutus, keluar? (bawaan kPutus+80). objekK05: panel timeline (objek-mendarat), klip putus (putus), AI slop (kata-hero), putus-putus (putus). "AI slop" kanan atas panel, wajah di tengah/kiri bebas.
- K06 props: mulai, kPilih. objekK06: tabel keputusan (objek-mendarat), "Kata yang membawa emosi (kata hero)" (sinyal). Baris yang menyala = baris ke-2.
- Baris asli dipakai (typography.md §8a, tabel pertama, apa adanya, 5 kolom + kepala "Situasi kalimat | Peran | Pilih A/B/C bila…"):
  Narasi berjalan (R1) · Kata yang membawa emosi (kata hero) (R6) · Kata kunci di tengah narasi (R2) · Klaim keras / peringatan (R3).
- Gerak: semua lewat CURVE/move/react/arc/dur dari src/lib/curves.ts; guncangan K05 11 px/8 f (dan 8 px/7 f di kPutus), blur arah ≤ 2,5 px.
- REVISI ronde 2 K05: track 126 px/klip 90 px, 5 klip pastel (#8AB4F8 #F6C26B #9FD8B5 #C3A6F2 #F49E8C) + strip thumbnail gradien, celah merah 38 dan 30 px, klip kanan turun 16/18 px + miring 2,6°/-2,4°; suku kata putus-putus berlatar warna, huruf 128 px, masuk bergantian jeda 4/3/4 f.
- REVISI ronde 2 K06: push pelan 1,0→1,08 sebelum kPilih; heavy →1,7× 28 f berpusat di baris menyala (fokus x 630, centang margin >= 48 px supaya kolom label + A terbaca), drift →1,78; baris lain opacity 0,45. Still tambahan f160.
- Catatan K05 (ronde 1): lajur klip 5 buah + 2 celah merah; celah memotong huruf suku kata (inset 24 px); kamera push +4% dan hentak +9%/+6%. Lajur klip pakai bentuk saja, tanpa label teks.
- `npx tsc --noEmit`: LULUS (tanpa error). grep raster di file komponen: kosong.
- Still (lebar 960): handoff/stills-K05/f030,f115,f130,f230,f280.jpg ; handoff/stills-K06/f020,f080,f130,f200.jpg
- Uji K05: mulai=6, kSlop=110, kPutus=220 (UjiK05, 300 f). Uji K06: mulai=6, kPilih=120 (UjiK06, 240 f). Tanpa render video, tanpa commit.
