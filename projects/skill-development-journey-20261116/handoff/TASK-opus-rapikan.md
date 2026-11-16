# TASK-opus-rapikan · SATU Opus (claude1) · pemberi: Sutradara claude2
Peranmu (orkestrasi.md, Irfan 16 Nov): merapikan SELURUH kode Sonnet (`remotion/src/video/**`, `lego/**`) supaya sesuai DESAIN.md + handoff/MG63-ADENDUM.md dengan finishing Apple-style motion (bersih, modern, satu fokus per frame, ruang lega) SEBELUM diserahkan ke Sutradara. Kamu tidak merancang ulang; DESAIN.md adalah otoritas. Satu pandangan visual untuk semua beat.

BACA: DESAIN.md, handoff/MG63-ADENDUM.md, handoff/REPORT-build-sonnet.md, still di qc/still/ (lihat sendiri, maks 960 px), RESEP.md §7–§8, claude/motion-graphic/LANTAI.md (C14–C17, A1–A9a, B10–B13a, D19–D20).
PUTUSAN SUTRADARA atas laporan Sonnet:
 P1 balance_check FAIL 11 still (B1_a, B2a_a, B2b_a/b, B4a_a, B4b_a/b, B5b_a/b, B6a_b, B6b_a): perbaiki komposisinya (Lantai C17: pindah posisi/beri penyeimbang yang bermakna — mis. karakter/kata di sisi seberang), jangan menambal dengan baris KESEIMBANGAN kecuali benar-benar disengaja (B5b pan ke satu jendela boleh, tulis alasannya di qc/JURI.md).
 P2 FINALLY ke ±20 % tinggi frame (DESAIN).
 P3 "100% FULL AI": semua ucapan tetap tampil di lapisan KT (Lantai A1); "pakai" tampil sebagai R1 kecil bila slab tidak memuatnya; kata tidak dobel.
 P4 Label kartu paket = nama paket ASLI di UI (Lantai D20): ChatGPT "Pro" dan Claude "Max" dengan 20x / 5x besar; ucapan "Pro Max"/"Claude Pro" tetap tampil di KT bila belum.
 P5 Punch B3a sampai teks item ≥ 6 % tinggi dengan bingkai jendela masih terlihat (adendum §5.5).
 P6 Hero/cincin tidak hidup lebih lama dari slot teks.json kecuali hold yang beralasan; sinkronkan dengan teks.json.
 P7 teks_cek 22 tanda: periksa; tanda pada teks UI asli boleh, sisanya diperbaiki.
 P8 Karakter: hidup (idle, kedip, take, reaksi) di setiap beat tempat mereka ada; bayangan ke dinding/UI satu arah cahaya.
GERBANG ULANG: tsc, motion_lint, kt_check, teks_cek, balance_check (semua still), grep raster; render ulang still yang berubah lewat jalur cache yang sama (perhatikan peringatan qc/.bundle_stamp di REPORT Sonnet). Lalu buat lembar sanding `qc/sanding-opus.jpg` (still kita vs keyframe kiblat 83/63 setara, `scripts/juri/sandingkan.py`).
FILE BOLEH: remotion/src/video/**, remotion/src/lib/**, lego/**, teks.json, objects.json, qc/still/**, qc/sanding-opus.jpg, qc/JURI.md, handoff/REPORT-opus-rapikan.md. FILE JANGAN: edit/**, DESAIN.md, RESEP.md, skrip claude/**.
JANGAN: render final/lego penuh, commit/push. Cek `df -h /` sebelum render (berhenti bila < 2 GB).
LAPORAN: handoff/REPORT-opus-rapikan.md ≤ 20 baris (per P1–P8: apa yang diubah, hasil gerbang PUTUSAN, still path). Balas ≤ 8 baris.
