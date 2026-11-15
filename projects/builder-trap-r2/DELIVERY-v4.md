# Delivery · Builder trap r2 v4 (15 Nov 2026)

File: `out/builder-trap-r2_v4.mp4` (PC) · Drive: `Claude edit/builder-trap-r2/builder-trap-r2_v4.mp4` · 1920×1080, 30 fps, 2501 frame (83,37 dtk), H.264 CRF 14 + AAC 256k, −14,9 LUFS, puncak −1,1 dBFS. v1–v3 tidak ditimpa. Lembar 1 frame / 2 dtk: `out/builder-trap-r2_v4_sheet.jpg`.

Alasan versi: Irfan 15 Nov — "video ini banyak patahannya dan bagian yang hilang", "pengecekannya tidak lagi menggunakan sampling … semua data sebelum proses rendering … per detik … oleh model agent yang berbeda", "SFX juga belum merata … saat kejatuhan konten lain tidak ada sfx".

## Yang berubah dari v3
- **Patahan**: peta waktu v3b — lompatan hanya di balik potong keras (4), 35 titik lain dikejar halus; jump cut wajah di 10 titik potong suara ditutup ganti crop (punch-in/out, lanjut masuk bila berdekatan); glitch 1 frame f2066 dibuang; rampa zoom-out B22; tidak ada frame kosong teks (f193, f1280, f1356, f2108, f2447); fade akhir 0,47 dtk.
- **Teks**: "tapi"/"bisa"/"dan aku termakan…" diperbesar dan kontras penuh; B06 seimbang (kiri/kanan 0,50); post Threads terbaca saat diucapkan (punch dari cut, f541); "sesuatu" sebagai chip satu kata di dinding thumbnail; "apa" kontras penuh di modal gelap.
- **SFX merata** (75 cue, 0,90/dtk): setiap potong adegan dan momen jatuh/mendarat punya bunyi (19 transisi halus, thumbnail jatuh, rentetan 15 klik kertas untuk kartu repo B20, swipe GitHub, zoom-out B22, wipe), whoosh/ketik B13b sinkron dengan visual, ekor drop/impact dipendekkan supaya suara jelas, fade musik akhir. sfx_density PASS, pause_clean PASS, cut_check PASS.

## Bukti
- Audit frame per frame tanpa sampling: semua 2501 frame dirender sebagai gambar, 9 potongan × 10 dtk, tiap detik (30 frame + strip audio) diperiksa subagen lain; putaran v3 → r8 → r8b → r8c → r8d → r8e, akhir 9/9 `PUTUSAN: LULUS` (`qc/frame_audit/c*/VERDICT.md`).
- Video final dibandingkan dengan semua frame yang diaudit: isi sama; beda hanya intensitas motion blur saat gerak cepat (render audit skala 0,5 vs final 1080p).
- `qc/JURI.md` PUTUSAN: LULUS dengan bukti tiap catatan Irfan aktif R-001…R-023; draft gerak penuh terbaru; sanding still 26 beat.

## Catatan
1. Wajah tidak muncul ±11,5 dtk di B14–B15 (dinding bukti), sama seperti v2/v3 (R-007).
2. Render final per 3 rentang (disk sempit; render penuh menulis ±2 MB/frame ke /tmp) lalu disambung dengan filter concat + encode ulang CRF 14; sambung `-c copy` kehilangan 2–4 frame.
3. Pemeriksa audit v4 = subagen Sonnet (orkestrasi.md datang setelah audit selesai); revisi berikutnya: Gemini + ChatGPT paralel, builder Codex.
