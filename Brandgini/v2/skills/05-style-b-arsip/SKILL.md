---
name: sg-style-b-arsip
description: Pakai saat shotlist Soalnya Gini bergaya B-arsip; menerapkan mekanik dokumenter arsip (permukaan taktil, stabilo, spidol, polaroid, stempel, keyhole) dengan token Soalnya Gini, tanpa orang foto-realistis AI dan tanpa palet pelangi.
---
# 05 · Gaya B: arsip taktil (pengganti v1 "Vox Investigative Documentary")

Referensi `vox.mp4` dan `vox2.mp4` **bukan Vox Media**: keduanya iklan penjual template After Effects (EarnEdits, akhir video). Yang diambil hanya mekaniknya. Kartu skill-development terdekat: **M09 Archive Essay Caption & Highlighter**, **M10 Selective-Color Archive Spotlight**, **M11 Essay Archive Intercut & Spotlight** (`cookbook/03-documentary-story-narrative/`); primitif `ae-primitives/teks/HighlighterSweep.tsx`, `tekstur/SelectiveColorSpotlight.tsx`. Bukti: `BEDAH-REFERENSI.md` §2. Usulan kartu baru dari dua video ini: `USULAN-SKILL-DEVELOPMENT.md` U-04.

## 1. Mekanik yang dipakai
| Kode | Mekanik | Bukti | Token v2 |
|---|---|---|---|
| B1 | 2–3 permukaan berganti antar-babak: kertas grafik, cetak biru, papan arang | vox 18–20, 29–33; vox2 15–16, 7–8 | `kertas`, `cetakBiru`, `arang` (arang maks satu babak: S-V19) |
| B2 | Stabilo menyapu kalimat kunci di dokumen miring | vox2 12–13 (kuning), 18–20 (hijau) | `stabilo` #9DB8FF multiply, 10 frame, `HighlighterSweep`. Bukan kuning: kuning = ciri Kita Bedah (plan §2.3) |
| B3 | Lingkaran spidol pada angka/klaim | vox2 19–20 ("200") | `spidolMerah` (PENGECUALIAN tema.ts, maks 2×/video, K-04) |
| B4 | Polaroid/foto bukti jatuh dengan pegas + rotasi tipis | vox 6–8, 30–32 | pegas damping 14 / stiffness 180 (titik awal v1; tidak terukur), rotasi −4…3° |
| B5 | Stempel tanggal diketik + kursor + garis bawah memanjang | vox2 7–8 | Plus Jakarta Sans 600, **bukan monospace** (referensi pun condensed sans; anti-slop §1) |
| B6 | Pita transparan melintas dengan teks miring | vox 18–20 | pita `tekan` 80 %, teks putih miring ≥ 56 px |
| B7 | Keyhole/iris untuk pengungkapan | vox2 36 | `transisi_masuk.tipe: keyhole` |
| B8 | Dokumen dan benda difoto dari atas (top-down) di atas permukaan | vox 12–16; vox2 12–20 | cutout benda nyata berlisensi; tangan generik tanpa wajah |

## 2. Yang tidak dipakai
| Di referensi | Alasan | Ganti |
|---|---|---|
| Orang/adegan foto-realistis yang tampak AI (vox 0–4, 9–11, 27–28; vox2 0–6, 21–23, 29–36) | kebijakan sintetis YouTube (realistis wajib diungkap), "AI personas" di topik sensitif (klarifikasi YPP Jul 2026), MOTION-CORE larangan 3D AI, janji "dirakit sendiri" | ilustrasi/diagram, foto benda berlisensi, piktogram untuk manusia (Lantai D19b) |
| Logo media asli (NBC News vox2 18–20) dan koran nyata | plan §3 tanpa logo merek; hak cipta | dokumen tiruan generik bertanda jelas, isi = kutipan fakta F dari fakta.md |
| Tipografi bertumpuk 5 warna + glow neon (vox 22–25), teks 3D ekstrusi (vox2 37–38) | S-V3 palet pelangi, anti-slop §1 glow, `palette_check.py` maks 2 keluarga | tumpuk 3–5 baris satu ukuran per baris, tinta/putih + satu kata `tekan`/putih penuh (Lantai A6–A7) |
| Kata serif miring tunggal kecil, teks bertangga (vox 12–16, 33) | Lantai A7 (≥ 56 px), S-T6 | KT Plus Jakarta Sans per peran |
| Kayu sebagai permukaan dominan | cokelat + hitam = S-V19 | kertas/cetak biru dominan; kayu hanya bila bendanya memang di meja kayu |

## 3. Kamera dan transisi
- Tiap shot > 2 dtk punya gerak disengaja (Lantai B10): dorong pelan 1,00→1,07 (`CURVE.drift`) atau parallax `SpatialDepthStage`.
- Transisi dari hubungan ruang (Lantai B13): dokumen ke detail = push-through; ganti babak = whip dengan `MotionBlurWrapper`; pengungkapan = keyhole.
- SFX foley kertas/polaroid/spidol dari `~/sfx/SFXIrfan` lewat `guide/sfx/GUIDE.md`; famili terlarang Lantai E24.

## 4. Gerbang gaya B
Sama dengan gaya A (§4 skill 04) + `palette_check.py` lulus dengan spidol merah (uji satu still sebelum build penuh) + golden frame B-arsip disetujui.
