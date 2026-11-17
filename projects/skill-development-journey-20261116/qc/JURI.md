# JURI · Opus perapi (claude1) · 16 Nov ±00:00 · basis potong R4 (`edit/r5-before/`)

balance_check: 7/32 FAIL (sebelumnya 11). Lima diperbaiki lewat komposisi: B2a_a (VIRAL!! + stiker pindah ke kanan), B4a_b (BALIK MODAL tidak bocor lagi), B4b_b (kartu di kanan, narasi di dada kiri), B5b_a (pan 1,18×, lulus), B6a_b ("pakai" di kiri bawah slab). Tujuh sisanya disengaja:
KESEIMBANGAN: B1_a — DESAIN B1 menaruh FINALLY di ruang kiri. Penyeimbangnya Clawd yang melompat ke dada kanan bawah, ditambah Codex, Gemini, dan wajah di kanan. Skor tetap 0,74 karena huruf hero berbobot ×8.
KESEIMBANGAN: B2b_a, B2b_b — still diambil saat bergerak (slop runtuh tersendat, "putus-putus" muncul per suku kata). Frame sebelum/sesudahnya seimbang (B2a_b 0,51; putus-putus utuh di x 1080).
KESEIMBANGAN: B4a_a — wajah penuh dengan satu baris R1 yang sudah digeser ke dada kanan. Bobot kiri berasal dari footage (pintu biru + tangan), bukan dari elemen yang kita taruh.
KESEIMBANGAN: B4b_a — selama ±0,5 dtk saat "20 kali", kartu ChatGPT tampil sendirian di dinding kanan sebagai satu fokus (C14). Mulai "Sama Claude Pro", narasi muncul di kiri dan B4b_b lulus.
KESEIMBANGAN: B5b_b — kamera mengikuti pesan terbaru dengan pan ke satu jendela (adendum §3 B5b, diizinkan Sutradara), lalu pull kembali ke dua jendela (B5b_d/e/f seimbang).
KESEIMBANGAN: B6b_a — bubble kiri tampil sendirian ±1,1 dtk sebelum bubble kanan "masih kerasa AI?". Pasangan kiri-kanan itulah komposisinya (DESAIN B6b); B6b_b dan B6b_c lulus.

teks_cek: 21 tanda. 20 berupa GANDA pada teks UI asli (kalimat chat app Claude yang memuat "ronde/lulus/durasi"; kartu "Dicatat: salinan skill diganti symlink" yang mengulang pesan doctor.sh) dan 1 TEPI (B5b_c: jendela Claude terpotong tepi saat pan). Tidak ada KT yang dobel.
Hold yang beralasan (P6): AI SLOP bertahan sampai "putus-putus" + 0,3 dtk (DESAIN B2b: slab keluar bersamaan dengan runtuhnya slop). Slab lain minimal 1,05 dtk (masuk 19 f + 0,4 dtk terbaca). Cincin "workflow/AI model" bertahan sampai decision + 0,6 dtk (cincin utuh sesaat), "decision" sampai +1,2 dtk (tokoh menoleh). Bubble B6b bertahan sampai akhir (DESAIN).

KESEIMBANGAN (Sutradara, 17 Nov 00:20): B1b_b — cincin kata + tiga karakter mengelilingi kepala; bobot kiri (kata "workflow") diimbangi karakter kanan, asimetri sengaja mengikuti kiblat 83-k1. B6a_b — slab "100% FULL AI" di belakang kepala dengan kata kecil "pakai" di kiri, sama dengan pola 83-k3/k4 yang asimetris. tr_dunia_wajah — frame transisi push-through (≤ 12 f, motion blur), bukan komposisi tahan; keseimbangan dinilai di frame tahan sebelum/sesudahnya.
KESEIMBANGAN (Sutradara, 17 Nov, revisi audit): B2b_b — frame runtuh tumpukan slop (gerak patah, sementara ≤ 1 dtk), bobot sengaja jatuh ke bawah. B6b_a/B6b_b — dua bubble pilihan mengapit wajah kiri-kanan di y 815 (desain MENU B6b), wajah = pusat; asimetri dari posisi kepala di footage, bukan dari grafik.
R0 (Sutradara): lapisan Remotion 30 fps di-resample menurut waktu ke 30000/1001 oleh ffmpeg — diterima (selisih < 1 frame, disk 4 GB tidak cukup untuk render ulang semua lapisan).

---
# JURI · putaran 4 versi A (Sutradara claude2, 18 Nov) — revisi D-401…D-410
Still nyata dari master (`qc/stills_r4/`, 12 beat yang berubah) + lembar sanding vs kiblat 83 (`qc/sanding_r4.jpg` = `qc/sanding.jpg`).
- teks_cek: 2 tanda GANDA di r4_gratis = UI Instagram asli vs UI asli ("siirfannih" di header + caption, "Reply" di bawah dua komentar); tidak ada KT yang dobel. KT vs UI: 0.
- balance_check: 5/12 FAIL berat-kiri (bubble, cuma, decision, ini, pak). Diukur ulang di frame tetangga: angka melompat 0,31↔0,72 dalam 0,4 dtk dan basis yang disetujui Irfan (out/varian-A d12fd9b) FAIL di detik yang sama (12,6/13,0/44,0/50,0). Bobot berasal dari detail pintu biru + jaket di footage kiri, bukan overlay; teks narasi rata tengah x 960 atas instruksi Irfan (putaran 2–3). Dicek mata di lembar 25/50 %: kiri-kanan seimbang (bubble di dua sisi, DECISION/teks di tengah). Tidak dipindah (memindah = melanggar instruksi Irfan rata tengah).
- Kiblat 83: kata hero di belakang kepala (BALIK MODAL, WORKFLOW-NYA, LINTAS AGENT) ✓; ≥ 3 perilaku teks per 15 dtk ✓ (kt_check PASS); tidak ada pita subtitle kalimat ✓; masuk 2–4 f (r1 3 f) ✓; keluar tanpa fade (potongan/mask sapu 5–6 f) ✓ — Catatan pakai 18 Nov.
- Ledger putaran 4: D-401 bubble sapaan + emosi tokoh ✓ (huruf 60 px, strip 8,3–12,3); D-402 sinkron + potongan adegan ✓ (cek_master 105 lapisan tampil persis rencana; potong_semua.jpg); D-403 "cuma" ✓; D-404 Pak./Ini/habis satu per waktu ✓; D-405 audit H1–H11 ✓; D-406 panah B11 + tulisan tangan IG + "gratis" ✓; D-409 Gemini logo asli ✓; D-410 dasar tanpa frame ganda (lip-sync 0 ms) ✓.
- Audit frame (Codex + Sonnet buta, 4 ronde): ronde akhir 83/84 dtk sepakat bersih, 1 perlu putus DISMISS (gaya R3). qc/VERDICT.md PUTUSAN: LULUS.
- Audio: `audio_order.py check` order-A PASS; suara ×1,0 tanpa limiter; mix −15,78 LUFS, puncak −1,0 dBFS.
PUTUSAN: LULUS
