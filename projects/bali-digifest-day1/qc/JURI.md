# JURI · Recap Day 1–3 · v11

Snapshot **2026-11-16T15:17:57.297155+00:00**. Objek: MP4 R6 SHA256 `2ee2680ee0634189d7e14295c6401b748d9e1d3734e5c3b0fbec4a9ee3734929`, 123,600 detik/3708 frame. Codex memberi adjudikasi, Gemini/DeepSeek audit independen. Claude QC dilewati sesuai Irfan.

**Release belum lulus:** respons independen belum lengkap, belum uji HP fisik/fungsi semua aksen, dan Drive belum diserahkan. MP4/receipt/meter bukan kelulusan film. Seluruh 47 catatan isi mentah memiliki adjudikasi; raw GAGAL/EMPTY tidak diubah.

Audit mengambil seluruh frame dari encoded silent R6 dengan payload video identik final AV. Ada 25 potongan/124 sheet: Gemini 118 sheet/3528 frame valid (23 potongan lengkap,14 model GAGAL); DeepSeek 113 sheet/3378 frame valid (15 lengkap,19 model GAGAL).16 potongan berubah diperiksa ulang,9 reuse exact;5 target format pada4 potongan tetap. Gabungan scope gambar14 LULUS/11 GAGAL menurut kelengkapan kedua respons. s095/f2850–2879 tanpa respons valid keduanya;30 frame ditinjau langsung agen visual,3 dibuka root. Itu tidak menggantikan dua respons independen.

Bukti E00–E10 pada [EVIDENCE.json](v11/EVIDENCE.json) mencantumkan path PC absolut,SHA256,ukuran dan cakupan: E00 mandat/repo;E01 VO/J/cut;E02 display;E03 mapping;E04 gambar/non-P1/sumber;E05 P1;E06 frame/adjudikasi;E07 sound;E08 native/simulasi HP;E09 warna;E10 ekspor/delivery. Media/raw transkrip tidak dipublikasi.

| ID aktif | Penilaian | Bukti dan batas |
|---|---|---|
| D-001 | Terbukti struktur; release ditahan | E02/E06/E08: 16 bite dan 3 bagian native mencakup cerita pengalaman peserta. |
| D-002 | Terbukti baseline | E00: v10f, 3585 frame/119,500 s video, 119,552 s container; versi tanpa-f berbeda. |
| D-003 | Terbukti identitas | E00/E05/E07: kartu 55, SF OTF asli, 1920×1080/30, aksen, tema dan logo resmi. |
| D-004 | Terbukti lingkup | E00/E10: sumber read-only, worktree terisolasi; hanya dokumen/metadata dipublikasi. |
| D-005 | Terbukti urutan | E07: ORDER11/frozen support lock; VO→visual→SFX→musik. R6 tidak mengubah suara. |
| D-006 | Terbukti hitungan | E02: 16 bite dari 11 rekaman; bukan 11 orang. |
| D-007 | LULUS clock teknis | E01/E04/E06: 3708 frame/5932800 sample frames; P1 [2965,3247); 39 segmen fisik. |
| D-008 | Terbukti implementasi | E04/E05/E10: LEGO alpha/FFmpeg, native source/matte; nice 10/19, 2 thread. |
| D-009 | Terbukti model/scope | E06/E08: Gemini/DeepSeek, raw hasil disimpan; Claude QC dilewati sesuai Irfan. |
| D-010 | GAGAL kelengkapan juri | E06: semua frame encoded terikat AV; 6 sheet Gemini/11 DeepSeek belum valid. Receipt bukan PASS. |
| D-011 | Terbukti retensi | E04/E07/E08: wide 0619, pitching 5,1 s, batik 0744, sketsa→clay, grup/mosaic/logo/tema. |
| D-012 | Terbukti P1 terpilih | E05/E08: R5b margin, SHA 7a38316e…, 282 frame/25 kata; U tertutup penuh diakui. |
| D-013 | Terbukti EDL | E04: 0353–0357 tidak dipakai; instruktur 0426 dipakai. |
| D-014 | Terbukti pengecualian | E04: 60 main runs/31 paths, 0 main overlap; mosaic mengulang 82 cell-frame pairs pada 31 film frames; 2 asal cell belum terpetakan. |
| R-001 | Terbukti edit/alur | E01/E04/E08: cold open K1 dan ekspresi→terima kasih utuh; native part00 usable. |
| R-002 | Terbukti terbatas | E01/E08: handles/fidelity/native pikiran utuh; raw cut global FAIL tetap, bukan PASS setiap fonem. |
| R-003 | Terbukti gerak; fragmen dicatat | E04/E06: 60 T01/22 T07/24 T03/1 T04; mask/directional/punch berbeda; fragmen masuk singkat disengaja. |
| R-004 | Terbukti parsial | E02/E03/E04/E05: 251 kata/satu layer/safe 5%; 30 layout/728 frame. Mik/bordir insidental melintas; tanpa klaim semua glyph 4,5:1. |
| R-005 | Terbukti gambar | E04/E08: wajah pelajar K2 sampai akhir, aksi 0469 kontinu; J dipilih Irfan. |
| R-006 | Terbukti gambar | E04/E08: wajah K3/K4 sejak pikiran, 0619 dipertahankan; b-roll bukan penutur lain bermik. |
| R-007 | Terbukti native gambar | E04/E06/E08: instruktur 0426→sketsa 0486→clay 0530; bidang kanan skala 0,8; tangan/karya terbuka. |
| R-008 | Terbukti take; qualified flow | E01/E07/E08: 0530 berbeda dari 0531, T2 benar, duck tambahan 4 dB. Native bulk awal salah label, bukan PASS s/ng. |
| R-009 | Terbukti narasi/sumber | E02/E04/E08: C1 wajah/VR+Makepung, C3 harapan pribadi utuh; tanpa klaim isi headset. |
| R-011 | Terbukti gambar/source; HP terbatas | E01/E04/E06/E08: 8,5 di dinding gelap, kedua 10/deh terlihat; gap 4,602 frame; part02 usable. |
| R-012 | Terbukti seleksi; HP GAGAL | E07: 10 cue/184 senyap, satu fungsi satu file; simulasi HP 5/10 tetap. |
| R-014 | Pengecualian lokal; raw FAIL tetap | E01/E07: gain statis termasuk attenuasi, fidelity≤1 LSB; master−support=J, residual 0; tanpa VO compressor/limiter/loudnorm. |
| R-015 | Terbukti mapping; taste bersyarat | E03/E04/E05: 171 still proposal→locked EDL/objects R6; crop P1 dipetakan ulang; mik/bordir insidental dicatat. |
| R-016 | LULUS penggantian | E04: 0653 tidak aktif; 0661 source 7,5–9,0 s/global [2487,2532), VR/controller+Makepung. |
| R-017 | Terbukti hero | E05/E06/E08: NGATUR KITA satu baris CAPS, font 250, spasi 49,4375 px, per kata 255/259 lokal, tanpa shadow. |
| R-018 | Terbukti terbatas; pilihan human | E01/E02/E08: Festival/kayak/kita/Ini dipulihkan; J menutup konflik awal K2; flow qualified, bukan sertifikasi semua fonem. |
| R-019 | Terbukti compositing | E05/E08: seluruh 25 kata P1, footage asli, crop source/matte sama; tanpa background hitam/dim/shadow/scrim. |
| R-021 | LULUS konfirmasi | E02: display mengikuti Irfan “atau di daerah-daerah”; raw ASR/timing tidak dipalsukan. |
| R-022 | Terbukti komposisi terbaru | E03/E05/E06: axes/balance, AI kiri/manusia kanan, hero tengah bersih; f3023 hanya AI+tapi; kontur kondisional. |
| R-023 | Terbukti crop/oklusi | E05: crop [352,432,1504,1080], uniform 5/3, native 282 frame; langsung di belakang kepala, U tertutup penuh disengaja. |
| R-024 | LULUS gerbang dokumen; diperbarui | E00/E10: 4cde479 dipush sebelum edit; lima dokumen/49 ID/metadata kini, log Day1 tetap di bawah. Publikasi baru dibuktikan ref Git. |
| R-025 | Terbukti pilihan/retensi | E09: 3 A/B pairs+120 cut frames, 0 grade; pose tidak selalu identik; WB transient sumber f3255 dipertahankan. |
| R-026 | LULUS spacing; HP terbatas | E07/E08: minimum 29 frame, whoosh>1 s, 0 harsh SFX raw; native SFX qualified, friendly di luar packet, audibility 5/10 tetap. |
| R-027 | Terbukti logo/tail | E04/E07/E08: 90 frame logo resmi, satu impact peak3648, theme 114,2–123,6; part02 penutup usable. |
| R-028 | LULUS meter; qualified mix | E01/E07: VO −15,8…−15,5 LUFS, T2 tambahan −4 dB; PCM −15,8/TP−1,2; AAC −15,8/TP−1,3; native musik tidak masking. |
| R-029 | Terbukti bersyarat | E01/E07/E08: DFN raw blend/presence statis dipilih dari sumber; NR/HPF/EQ/de-esser bukan preset baru; native qualified dengan batas. |
| R-030 | Terbukti geometrik; clock dijelaskan | E02/E04/E05/E06: 251 kata hold≥6 settled frames; entry tidak dihitung hold. Beberapa P1 canonical berbeda 3–5 frame; native cue±2, bukan semua canonical PASS. |
| R-031 | Terbukti gap/source; qualified flow | E01/E06/E08: gap 4,602 frame; angka 10 visual+1,6 frame source clamp; deh utuh, tanpa memotong fonem demi EDL. |
| R-032 | GAGAL cakupan HP final | E08: empat sanding v10/R4 simulasi HP; tiga bagian native R6 usable. Belum exact R6 di speaker HP fisik; percobaan satu file gagal. |
| R-033 | PARSIAL; Drive tertahan | E10: MP4 lokal/laporan 16 bite/11 rentang gambar/known issues. HTTP413/403; belum link file Drive v11. |
| R-034 | Terbukti pendekatan bersyarat | E01: fonem dipulihkan dahulu; fade hanya handle aman, bukan preset wajib 3–5 frame setiap head; native edge qualified. |
| R-035 | LULUS J/clock | E01/E02: 3026 sample frames [1035200,1038226) menjadi nol; prefix/suffix identik, tanpa shift/fade/gain. J SHA ec015787…; K2 cut_check terbaru PASS. |


R-010/R-013/R-020 berstatus Diganti; riwayat tetap di DECISIONS, otoritasnya R-022/R-023. Seluruh 13 temuan dan 8 rentang timeline Revisi.md mempunyai ID aktif; pemetaan ada di E00/DECISIONS.

Batas yang dipertahankan: raw HP 5/10 cue,0 harsh; belum perangkat fisik. Raw voice_level FAIL attenuasi lokal R-014, cut_check global J FAIL/K2 PASS; tanpa canonical ORDER PASS. Native tiga bagian R6 usable mencakup semua frame, percobaan satu file gagal. Empat sanding memakai R4 simulasi HP sesudah J; R6 ditindaklanjuti 728 frame dan tiga bagian native. Tiga A/B warna tidak selalu pose identik. U hero tertutup penuh, fragmen masuk f1842 dan perubahan terang sumber f3255 dicatat; tanpa klaim semua glyph4,5:1/0 kedip.

Riwayat: [juri Day1/v2](archive/JURI-Day1-v2-legacy.md). Publikasi dokumen selesai; persetujuan video terpisah. Titik lanjut: respons independen valid, uji HP/fungsi aksen, upload exact MP4 saat rute Drive tersedia. Input terkunci yang berubah wajib diaudit ulang pada bagian terdampak.

PUTUSAN: GAGAL
