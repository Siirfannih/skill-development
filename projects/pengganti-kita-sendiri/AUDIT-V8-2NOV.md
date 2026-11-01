# Audit PKS v8 — 2 Nov 2026 (Claude)

Bahan: `PKS_v8.mp4` (132,8 s, 1080p30), contact sheet 1 frame/2 s, pengukuran RMS 50 ms + EBU R128.
Acuan: `AUTORUN-2NOV.md`, `SOUND-PLAN-IRFAN-2NOV.md`, `GrokAgent/reference-videos/STYLE-SYNTHESIS.md`.

## A. Audio (terukur)

| # | Temuan | Bukti | Prioritas |
|---|---|---|---|
| A1 | **Nol digital** di sela kalimat — dead air yang Irfan dengar | −100 s/d −143 dBFS di 34,2 · 36,4 · 40,5 · 70,1 · 82,3 · 103,3 · 116,7 · 125,3 (0,95 s) · 129,7 · 132,1 s | P0 |
| A2 | Tidak ada BGM, room tone, ambient | p10 lantai per babak −31 → −39 dBFS, turun makin sepi menuju akhir (kebalikan rencana) | P0 |
| A3 | Loudness salah lapor | Terukur **−17,0 LUFS** (STATUS bilang −14). LRA 2,9 LU = datar, tanpa dinamika babak | P0 |
| A4 | Lompatan lantai cold open → grafis | Cold open p10 −31 dBFS (bising klip) → 10 s+ lantai VO kering tanpa bed | P0 |
| A5 | SFX tipis tanpa low-end/ruang; sumber v16–v18 dari earshot + stok sintetis | AUDIO-AUDIT-1NOV §2; brief Irfan | P0 |
| A6 | Tidak ada pemisahan entitas agent (pitch/pan) di 0:44–0:50 | rencana Irfan | P1 |

## B. Visual & tipografi

| # | t | Temuan | Arah fix |
|---|---|---|---|
| B1 | 0:00–0:09 | Teks cold open = potongan transkrip kecil ("AI is the", "ever in my", "raised over a") — subtitle, bukan anchor | Anchor Inggris 1–3 kata raksasa (mis. "AI", "EVER", "LAUNCHED", "RAISED"), di belakang kepala narsum (mask) |
| B2 | 0:20–0:22 | "Padahal waktu AI pertama kali ramai dibicarakan" kalimat penuh, rata kiri bawah | Anchor "PADAHAL" → "AI"; kalimat dihapus |
| B3 | 0:24 | "janji sederhana" dalam kotak outline — murah, highlight box dilarang | Anchor "JANJI" menempel di titik ujung kurva (tracking) |
| B4 | 0:26 | Kartu UI kecil, separuh frame kosong | Zoom ke kartu, kamera mengikuti aliran file |
| B5 | 0:28, 1:58 | Frame gelap kosong dengan bidang abu (beat mati) | Isi dengan anchor atau potong |
| B6 | 0:32–0:39 | Grafik biru ~8 s nyaris statis, label "DITEPATI" kecil | Kamera close-up ikut ujung garis, anchor "DITEPATI" di jalur garis, break ke wide di akhir |
| B7 | 0:56–1:01 | Subtitle Jensen kalimat penuh 2 baris ("…karena AI / tapi") — melanggar aturan dua baris | Anchor Inggris dari ucapan Jensen ("JOB", "AI", "SOMEBODY WHO USES AI") |
| B8 | 1:04 | Kartu linimasa terpotong di kiri frame | Reframe |
| B9 | 1:10 | Grafik kecil di dalam kotak, frame kosong | Isi frame atau potong |
| B10 | 1:12–1:14 | "SINGLE-PERSON BILLION-DOLLAR COMPANY" menindih Altman, tidak di belakang subjek | Mask Altman, teks di belakang kepala |
| B11 | 1:18–1:20 | Hampir seluruh frame kosong (grid putih, elemen 1 % frame) | Kamera dekat, transisi lebih cepat |
| B12 | 1:22–1:24 | Foto stok tanpa perlakuan 2.5D, beda tone dengan sistem visual | Parallax + grade gelap konsisten |
| B13 | semua teks | Animasi masuk lembut/fade; tidak ada Cepat–Hantam–Lambat, tidak ada posterize/tekstur | Komponen `AnchorWord` baru (snap 2–3 frame, ease-out ekstrem, 12 fps, tekstur kertas) |

Yang tidak dikomentari dan sudah kuat → **dipertahankan**: piktogram spotlight gelap, UI agent 0:40–0:50, "KREATIF"/"MEMBANGUN" parallelogram, penutup kursi teater.

## C. Rencana fix (urut)
1. Audio v9 di atas v8 (diff): bed babak + room tone + SFX dari library + mix (§3 TODO).
2. `AnchorWord` + ganti teks B1, B2, B3, B7, B10, B13.
3. Reframe/kamera B4, B6, B8, B9, B11, B12; potong/isi B5.
