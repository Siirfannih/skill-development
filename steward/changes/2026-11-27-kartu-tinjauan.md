# Tinjauan kartu: pemilih menimbang fungsi lebih dulu, kartu audio dan 95 bergerbang, cta tanpa kartu dijawab jujur, render final berbatas lebih longgar
Masalah: sesudah C1-C13 masih ada tiga kelemahan. (1) Peringkat `pilih_kartu.py` berisik: teks kartu yang kebetulan memuat kata fungsi ("pembuka" di kartu bunyi, "sesudah jeda", "hasil") ikut menghitung fungsi, sehingga kartu audio mengisi slot visual dan kartu berfungsi lain menang. Satu kata umum di nama pola ("aplikasi" lewat sinonim ui) juga membawa 96 ke "langkah alur aplikasi". (2) Tiga tes penerimaan memakai `expectedFailure`, dan kartu 95 muncul untuk "jelaskan konsep". (3) M05 dicatat `cta` padahal sumbernya punchline/cutaway. Di render, batas final sama dengan draft (2700 dtk), padahal render final terlama yang tercatat 2248 dtk, dan anak render mewarisi stdout pemanggil (fd 7) dan kunci proyek (fd 8).

Perubahan:
- `pilih_kartu.py`, peringkat: jumlah fungsi query yang ada di `fungsi:` kartu adalah sinyal utama. Teks (trigger 3, nama 2, kategori 1) hanya memecah seri, lalu fungsi utama kartu, lalu status dilihat bergerak, lalu urutan CATALOG. Kata fungsi tidak lagi dicocokkan ke teks kartu bila sumbu fungsi ada. Bila ada kartu yang cocok menurut fungsi, kartu lain hanya ikut bila query menyebut nama polanya: dua kata harfiah di nama, atau satu kata khas (5 huruf atau lebih). Satu kata umum ("ui", "aplikasi" lewat sinonim) tidak cukup.
- SINONIM: "kata", "hasil", "result" keluar dari bentuk fungsi. Masuk: audio (audio sfx suara bunyi sound musik music lagu), metaphor/metafora, collage/kolase. NIAT: "fitur"/"feature" keluar, karena itu benda yang ditunjukkan, bukan tugas beat.
- Kartu berfungsi audio hanya muncul bila query menyebut bunyi, atau `--kategori`/`--pack` dipakai.
- Frontmatter baru `hanya_bila_kata:` (dibaca `baca_index`). Dipasang di 95: cutout, kolase, collage, metafora, metaphor, halftone. Akibatnya 95 tidak lagi muncul untuk "jelaskan konsep".
- Fungsi tanpa kartu (kini hanya cta) dicetak "Belum ada kartu untuk fungsi cta (…)". Bila ada hasil, kalimat itu menambah "(kartu di atas menjawab fungsi lain di query ini)", supaya tidak terbaca seperti larangan yang dilanggar tabelnya sendiri. Kalimat itu juga menunjuk cara merangkai: pacing-map.md baris Penutup / CTA, copywriting.md, dan letak CTA di kartu naskah M16 dan M17. Panduan fungsi menulis "tanpa kartu: cta (fungsi ini belum punya kartu di pustaka; …)".
- Baris "Dicocokkan lewat fungsi beat" kini hanya menyebut kartu yang `fungsi:`-nya memuat fungsi itu.
- `fungsi:` diubah (frontmatter saja):
  - M05 `penekanan, transisi, penutup`. Tanpa cta: sumber 85, 03 dan 38 menolak iklan dan instruksi panjang. Penutup ditambahkan karena sumber 64 menyebut "kartu pembuka atau penutup bab" dan sumber 79 menyebut "kalimat penutup".
  - M11 `bukti, penekanan`: intercut bukti dan sorot kata, tidak membandingkan.
  - M12 `penekanan`: montase arsip latar, bukan bukti.
  - M15 `balik`: busur pengakuan, bukan suasana.
- 40 penugasan lain diperiksa terhadap trigger dan Invariant kartu, dan tidak diubah.
- Eval mg-060, mg-064, mg-065: harapan cta dan penutup disesuaikan.
- `render.sh`:
  - `FINAL_MAKS_DTK` (bawaan 10800) untuk `final`. `RENDER_MAKS_DTK` 2700 tetap untuk bundle, frames dan draft.
  - Anak `jalankan` jalan dengan `7>&-`, sehingga proses yang lolos dari grup tidak menahan stdout pemanggil dan render.sh tetap selesai. Kunci proyek (fd 8) dan global (fd 9) sengaja tetap diwarisi. Selama ada proses render hidup, juga bila render.sh sendiri di-SIGKILL, kunci tetap tertahan. Menunggu lebih aman daripada dua render menulis `.bundle` yang sama (kelas insiden EISDIR). Versi awal tinjauan juga menutup fd 8; itu dibatalkan sesudah bacaan Qwen (c) menunjukkan celah SIGKILL.
  - Komentar kepala render.sh kini menyebut bahwa lego tanpa kunci, seperti di main.
  - Pesan TIMEOUT menyebut ketiga variabel batas.
  - Baris gerbang dan baris kunci global identik dengan main.
- `tools/tunggu.sh`: `MAKS_JOB_DTK` bawaan 14400, dan baris TIMEOUT di log menyebut cara menaikkannya.

Tes yang diubah dengan sengaja:
- `test_pilih_kartu.py`:
  - Urutan seri fixture "demo fitur produk" kini 63, 93, 65, 14 (yang dilihat bergerak lebih dulu).
  - `test_fungsi_menang`: kartu yang hanya menyebut angka di trigger tidak ikut.
  - `test_sinonim_inggris` memakai berkas fungsi.
  - Fixture qc memakai kata biasa.
- `test_pilih_kartu_brief.py`:
  - Tidak ada `expectedFailure` lagi.
  - "cta booking"/"cta pesan" tidak lagi mengharapkan M05 (alasan di atas).
  - "penutup" mengharapkan 25 atau M05.
  - Tes baru: tiap kartu hasil memuat fungsi yang diminta, 95 hanya muncul bila query menyebut pola 95, dan kartu audio hanya muncul bila bunyi disebut.
- `test_pilih_kartu_intent.py`: niat tanpa kartu, baris Dicocokkan yang tepat, dan "cta"/"daftar sekarang" yang kosong.

Tes baru:
- `test_pilih_kartu_peringkat.py`: 13 tes untuk sinonim fungsi di teks, banding palsu, saringan fungsi, nama mekanik yang disebut, kata umum di nama, audio, seri, gerbang kata dan cta jujur.
- `test_render_guard.py` (+3): anak yang lolos tidak menahan pemanggil tetapi menahan kunci sampai mati, batas final bawaan, dan batas job bawaan.
- Tes `tunggu` kini menunggu berkas rc, bukan tidur tetap: 42 dtk menjadi 22 dtk.

Bukti:
- Seluruh query dari delapan brief penerimaan diperiksa. Hasil 4 teratas setelah perubahan tercatat di laporan tinjauan.
- Contoh query:

  | Query | Hasil |
  |---|---|
  | hook takut | M08 27 M03 M14 |
  | harga promo | M20 |
  | cta booking | kosong, dengan kalimat cta jujur |
  | langkah alur aplikasi | M19 M18 65 M17 |
  | penutup | M05 25 |
  | jelaskan konsep | 17 88 96 18 |
  | cutout metaphor | 95 88 96 |
  | penutup bunyi | M22 M21 A01 A02 |
- `resep_check` (C6) lama vs baru pada 12 proyek nyata memberi putusan identik.
- Bacaan Qwen tersimpan di `reports/qwen-raw/kartu/` milik run steward: pemilih (a), template dan bingkai (b), render dan tunggu (c). Klaim Qwen yang benar dan masih terbuka menjadi baris backlog 31-38.

Hasil cek:
- `unittest discover -s claude/motion-graphic/scripts/tests`: 482 tes OK, 64 dilewati, sekitar 89 dtk.
- `cookbook.py cek --ketat`: 44 kartu, 0 GAGAL, 0 PERINGATAN.
- `peta.py --check`: terbaru.
- `sumber_cek`: bersih.
- `sync_lantai` dan `sync_negatif`: OK.
- `steward_check`: 0 error, 52 peringatan. Main punya 53.
- Ukuran: SKILL.md 12.271 B, dunia-visual.md 15.298 B, storyboard.md 15.257 B. 00-core dan INDEX.md di bawah batas token `cek`.
- Diff `_vault/` terhadap main kosong.

Dampak:
- Model yang mencari kartu per beat kini mendapat kartu dengan fungsi yang diminta, dan diberi tahu terus terang bila cta belum punya kartu.
- Kartu audio dan 95 tidak lagi mengisi slot visual tanpa diminta.
- Render final panjang tidak dibunuh oleh batas draft.

Belum diverifikasi:
- Render Remotion sungguhan: perilaku Chrome yatim saat node di-SIGKILL (backlog 37) dan pesan galat remotion saat dibunuh.
- Sumbu medium/subjek, cakupan busur vs beat, dan M20 satu angka vs deret masih terbuka (backlog 33-35).

Level: Behavior
Persetujuan: perubahan pemilih dan skrip render ini mengikuti rencana perbaikan kartu yang sudah disetujui. Batas final dan job bisa dinaikkan lewat variabel lingkungan.
Cara membatalkan: `git revert` commit tinjauan (db448ef8, 90a55ac8, 22a1de39 dan commit laporan ini).

Tinjauan akhir 27 Nov (Opus): baris penutup `pilih_kartu.py` disamakan dengan `cookbook/README.md` §4 (sumber vault dibuka sesudah racikan disetujui, untuk sanding); `cookbook/README.md` §7.6 menyebut cadangan satu model untuk Devil's Advocate (kritik sendiri dari brief steril, seperti Tahap 6 `templates/TAHAP.md`). Temuan Qwen lain yang terbukti masuk `steward/backlog.md` baris 49–55; klaim "audio dikunci sesudah visual padahal waktu dari audio" ditolak (suara dikunci di Tahap 3 sebelum visual; SFX dan musik sesudahnya). Tes pemilih kartu dan `test_audit_dokumen.py` lulus.
