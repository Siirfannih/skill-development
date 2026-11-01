# Feedback Irfan 2 Nov 06.05 atas PKS_v9 + akar masalah + rencana

## Akar masalah (jujur)
1. **SFX tak terdengar**: gain dihitung relatif PUNCAK dialog (−20 dB) → bunyi pendek 17–26 dB di bawah VO. QA hanya mengukur LUFS total, dead air, dan pita 2–6 kHz — tidak pernah mengukur keterdengaran per cue. Fix v19b: gain dari RMS jendela 300 ms terkeras relatif RMS ucapan + gerbang keterdengaran (≥ 85 % cue ≥ −10 dB terhadap dialog+bed). Hasil: 85 %.
2. **QC visual dangkal**: contact sheet 240 px; gerbang `analysis-qa.md` §16 (Karpathy, R1–R7, reviewer segar R6, loop kritik 3 putaran sampai SHIP) tidak dijalankan; video dikirim tanpa verdict SHIP.
3. **Tambal tanpa devil's advocate**: Altman ditambal 4× dengan memindah koordinat, bukan menguji ulang komposisinya.

## 9 poin Irfan → keputusan perbaikan
| # | t | Masalah | Perbaikan |
|---|---|---|---|
| 1 | 1:46 MEMBANGUN | Cahaya kotak kasar (tepi persegi glow terlihat) | Bidang cahaya pakai falloff radial/feather halus (mask gradien elips), tanpa tepi persegi |
| 2 | 0:00 Gates | Lapisan matte tidak sinkron → 2 orang | Matte memakai transform/zoom berbeda dari klip dasar. Samakan transform persis; bila tidak bisa dijamin, matte Gates dimatikan |
| 3 | 0:03 montase | Ruang kosong di tengah tapi teks di bawah (baseline 930) | Teks ke tengah frame (boleh menutup wajah), baseline ~560 |
| 4 | 0:09 progress | Teks menimpa kartu di posisi tak estetis padahal banyak ruang kosong | Teks di ruang kosong besar di bawah kartu (pusat), atau tengah atas kartu lewat zoom; tidak menimpa presenter |
| 5 | 0:22 Wikipedia | "AI" hitam besar di belakang kartu, tanpa alasan | Hapus. Visual Wikipedia sudah kuat (strong visual needs no text) |
| 6 | 0:24 JANJI | Hanya "JANJI"; v8 dua kata sudah bagus | Kembalikan dua kata "janji sederhana" (gaya anchor, tanpa kotak), dekat ujung kurva |
| 7 | 0:35 8 jam | Visual downgrade, cuma shape | Ganti UI nyata: kalender hari kerja (gaya Apple Calendar) — blok "Input data · Invoice · Rekap" 09.00–17.00 menyusut jadi 09.00–09.45 |
| 8 | 0:57 Jensen | Kartu kecil, bisa full frame | Klip Jensen full frame (cover), teks per kata di ruang kosong kiri |
| 9 | 1:14 Altman | Teks tumpuk dipaksakan, tabrakan dengan cincin orbit | Altman full frame, cincin orbit dibuang; "SINGLE PERSON BILLION DOLLAR COMPANY" per kata satu baris besar di tengah (boleh menutup wajah), BILLION penekanan |
Ditambah semua temuan `AUDIT-V9-INDEPENDEN.md` (reviewer segar).

## Gerbang sebelum kirim (wajib, tidak ditawar)
- Per segmen: strip 4 fps 960 px + checker layout + angka audio.
- Reviewer segar (R6) per putaran; loop minimal 3 putaran sampai SHIP; catat di `review_log.md`.
- Baru render final setelah SHIP; laporan memuat skor apa adanya.
