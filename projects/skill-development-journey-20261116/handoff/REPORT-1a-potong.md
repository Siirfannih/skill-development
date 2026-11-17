# REPORT-1a-potong · Codex · 16 Nov 2026
Status: TERTAHAN; kandidat tersedia, suara belum dikunci dan belum memenuhi kriteria lulus TASK.
Durasi akhir: 93,593500 dtk (1:33,594); wajah 2.805 frame, 30000/1001 fps, H.264 CRF 16 tanpa audio; WAV mono 48 kHz PCM float.
Babak: B1 4,071 · B1b 10,344 · B2 10,744 · B3 17,651 · B4 18,252 · B5 19,753 · B6 12,779 dtk.
Pangkas: B3 25,39–34,75 karena mengulang B1b; 61,81–69,63 opsional tidak muat; pengantar riset B4 dan pengulangan session B5 dibuang.
Jeda berpikir B3/B5 dirapatkan; jeda klausa pendek dipertahankan. Delapan “tuh” dan “Progress di baliknya” tetap ada karena cut percobaan menyisakan fonem / membutuhkan pelanggaran guard.
PUTUSAN cut_check.py (--source-words / --map): GAGAL; validator full take menolak penghapusan kalimat editorial, dan audit menemukan 12 span ASR parsial, termasuk jadi/Ini. Belum ada bukti guard/fonem lulus.
cut_check tanpa map: GAGAL — sampah 8, diam_kata 9, diam_kal 14, antar_kal 3; aturan tengah kalimat ≥0,15 dtk berbenturan dengan jeda klausa ≤0,5 dtk yang harus dipertahankan.
PUTUSAN audio_order.py lock suara: GAGAL pada gerbang potong; tidak ada lock suara yang sah.
Diagnostik tambahan: jeda −34,9 dBFS + 2 transien; level hasil −19,4 LUFS, puncak 0,0 dBFS → pause_clean dan voice_level GAGAL. Gain/loudness/limiter tidak diterapkan.
Media/sinkronisasi LULUS: durasi wajah = WAV tepat; sampel ucapan di luar fade 2 ms identik sumber; 26 frame awal/akhir segmen cocok (PSNR minimum 47,06 dB).
ASR tanpa prompt: sambungan “ngebaliknya”/“buat ini” sudah diperbaiki; finally hilang di dua ASR terakhir, terbaca pada large-v3 prefix identik sebelum revisi. Penutup terbaca “AI slop?”, berbeda dari transkrip kasar.
Bukti: edit/gate-results.json, edit/gate-*.log, edit/selection-audit.json, edit/media-verification.json; kalimat/babak/kata kunci di transkrip-hasil.md.
ORDER.json ditempatkan di edit/ agar tetap dalam daftar file boleh; kolom Mode/Visual/Bunyi dipertahankan persis. Tidak commit/push atau mengubah skill.
Risiko: batas kata masih perlu alignment/dengar dan konflik gerbang perlu keputusan Sutradara; kandidat ini belum boleh dipakai sebagai suara terkunci.

## Ronde 2
Status: TERTAHAN / BELUM DIKUNCI. PCM 84,217458 dtk; 2.524 frame 29,97 fps. Gain tetap; sampel di luar ±6 ms sambungan identik sumber.
Delapan cut buang-“tuh” diterapkan dengan equal-power 10 ms pada zero-crossing; empat kandidat gumam P5 dipertahankan sebagai bagian/ekor ucapan (bukti waveform/spektrum di edit/r2-gumam*).
PUTUSAN cut_check tanpa map (`--max-sentence 0.45`): CLI GAGAL; 0 sampah, 0 diam_kata; hanya P2 bernama CGPT→Claude 0,23 dtk, Dan→bahkan 0,20 dtk, sama.→Sehingga tepat 0,45 dtk (DECISIONS; CLI memakai >=).
PUTUSAN cut_check dengan --source-words/--map: GAGAL, 981 temuan; 501 token terhitung dan cut editorial eksplisit, tetapi validator mengharuskan kata editorial tetap muncul; 36 span raw ASR tersisa <85%, retensi fonem belum tersertifikasi.
PUTUSAN audio_order.py lock suara: GAGAL pada cut_check; ORDER tetap kosong. Alat belum menerima pengecualian P2/editorial dan tetap mewajibkan pause_clean/level fase 2; tidak dilewati.
PUTUSAN ASR tanpa prompt: LULUS seluruh kata kunci termasuk finally, CGPT/ChatGPT, Cloud→Claude, Gemini; large-v3 VAD, bukti PCM awal identik + tail hasil ditranskrip ulang (r2-asr-final-composite.json, r2-keyword-gate.json, r2-b1-proof.json).
PUTUSAN sinkron wajah–suara: LULUS; 84,217467 vs 84,217458 dtk, selisih <1 sampel; wajah tanpa audio, potong memakai map yang sama. 92 batas frame cocok sumber (PSNR minimum 46,84 dB); bukti r2-media-verification.json dan r2-pcm-audit.json.
PUTUSAN durasi 1:28–1:35: GAGAL (1:24,217; kurang 3,783 dtk). Pertanyaan pemulihan riset B4 belum dijawab; kini kalimat itu sendiri belum cukup. Seleksi ronde 1 dipertahankan sambil menunggu putusan isi/durasi.
Titik lanjut: edit/r2-NEXT.md; perlu dukungan validator editorial/retensi fonem/P2 dan putusan durasi. Mode/Visual/Bunyi tidak berubah; gain/loudness tidak diubah; tidak render visual, commit, atau push.

## Ronde 3
PUTUSAN durasi: LULUS 83,850438 dtk / 1:23,850 (GUIDELINE 80–92 dtk); seleksi isi tetap, riset B4 tidak ditambah.
PUTUSAN cut_check tanpa map (--max-sentence 0.45, words.json selaras waveform): LULUS; 0 sampah/diam_kata/diam_kal/antar_kal; CGPT→Claude 0,13, Dan→bahkan 0,13, sama.→Sehingga 0,35 dtk; sambungan baru microfade 2 ms.
PUTUSAN alat/tes: LULUS 31 tes (7 editorial baru, termasuk CLI→audio_order pada fixture); kata editorial utuh boleh hilang, kata teriris/guard tetap ditolak; r3-tests.log + r3-tool-before-after.json.
PUTUSAN cut_check --source-words/--map: GAGAL 232 temuan; 501 token terhitung. D4: 22 kata isi konservatif <85% dilaporkan per kata di edit/r3-retention-audit.md; 6 batas editorial parsial tetap ditolak, raw sumber tidak diubah.
PUTUSAN audio_order lock suara: GAGAL pada gerbang sumber; BELUM DIKUNCI, ORDER kosong. Diagnosis mandiri pause_clean GAGAL (−42,9 dBFS/23,3 dB), voice_level GAGAL (−19,2 LUFS/puncak 0 dBFS); gain/loudness tetap.
PUTUSAN ASR kata kunci: LULUS 16/16 dari transkripsi ulang seluruh PCM final large-v3 tanpa prompt, termasuk finally/CGPT/Claude/Gemini; edit/r3-asr-final.json + r3-keyword-gate.json.
PUTUSAN sinkron wajah=suara: LULUS 2513 frame, selisih 4.50 µs; 102 batas frame PSNR ≥46.84 dB, PCM inti identik sumber. Transkrip/CUT-SHEET diperbarui; lanjut edit/r3-NEXT.md; tanpa render visual/commit/push.

## Ronde 4
PUTUSAN durasi + cut_check tanpa map: LULUS 84,150729 dtk (1:24,151); 0 sampah/diam_kata/diam_kal/antar_kal, ambang tetap.
PUTUSAN sumber --source-words/--map: GAGAL 221 temuan; 20/22 target raw <85%; 4/6 batas editorial lama masih parsial, raw tetangga Ini #447 juga 47,04%. Semua 501 token terhitung; raw tidak diubah.
T1–T2: dua percobaan 84,651/85,419 dtk ditolak karena regresi jeda; tambahan T1 ≤66,733 ms/sambungan. Kandidat dipilih hanya geser/handle yang menjaga jeda lulus; catatan pengukuran 22 kata + 8 spektrum di DECISIONS dan edit/r4-retention-audit.md; guard belum tersertifikasi.
PUTUSAN audio_order lock suara: GAGAL pada sumber, ORDER kosong. Mandiri pause_clean −47,7 dBFS; voice_level −19,3 LUFS/puncak 0 dBFS juga gagal; gain/loudness tetap dilarang dan tidak diubah.
PUTUSAN ASR ulang tanpa prompt: GAGAL 15/16; finally terlewat pada VAD aktif/nonaktif dan crop B1. B1 PCM identik R3/sumber; bukti historis finally tidak diklaim sebagai ASR ulang lulus. edit/r4-keyword-gate.json.
PUTUSAN sinkron: LULUS 2.522 frame, selisih 3,83 µs, 102 batas PSNR ≥46,71 dB; 4.009.859 sampel inti identik sumber. BELUM DIKUNCI; lanjut edit/r4-NEXT.md. Tanpa ubah alat/gain, render visual, commit/push.

## Ronde 5 (Sonnet, forced alignment)
Metode: torchaudio MMS_FA (karakter) pada stem 16 kHz DJI (`edit/r5-source-words.json`) dan pada suara.wav (silang-periksa; selisih rerata 12 ms), batas kata dirapikan energi 5 ms; kata hasil = kata sumber dipetakan lewat segmen (PCM identik). Temuan: rentang Whisper meleset 0,1–0,4 dtk, jadi cut R2–R4 memotong 3,58 dtk ucapan kata isi (tuh bocor jadi “itu”); tiga token “Gimana caranya biar” adalah hantu Whisper (ASR jendela 54,5–56,4 tidak membacanya).
PUTUSAN durasi: LULUS 83,283 dtk (1:23,283; kandidat lama 84,151). PUTUSAN cut_check tanpa map (--max-sentence 0.45): LULUS, 0 sampah/diam_kata/diam_kal/antar_kal.
PUTUSAN cut_check --source-words/--map: GAGAL hanya `guard` 14 kata (7 sambungan tuh): jeda <50 ms di sekitar tuh (kurang 0–30 ms, setara galat alignment ±20 ms); 0 overlap >20 ms, 0 retensi <85 %, retensi minimum 96,7 %, rasio durasi hasil ≥85 % pada 228 kata isi (`edit/r5-retention-audit.md`).
PUTUSAN audio_order lock suara: GAGAL, pesan alat “peta potong menyentuh kata isi, guard 50 ms, atau urutan kata sumber” (hanya guard di atas); pause_clean GAGAL (lantai jeda −34,4 dBFS, selisih 15,7 dB); voice_level GAGAL (−19,3 LUFS, puncak 0,0 dBFS); level tidak diubah, ORDER kosong.
PUTUSAN ASR no-prompt: LULUS 16/16 komposit; seluruh-file 15/16, “finally” terbaca di jendela pendek 0,5–2,4 dan 0,7–1,7 dtk suara hasil dan 1,1–1,9 dtk sumber; seluruh-file juga tidak membacanya pada sumber (`edit/r5-finally-evidence.json`, onset/offset alignment 1,32–1,72 dtk sumber, energi −15 dBFS vs lantai −53). ASR hasil masih memberi “aku tuh ngebalik” (sisa belum terjelaskan).
PUTUSAN sinkron: LULUS 2496 frame, selisih 8 µs, PSNR ≥46,7 dB, PCM inti identik sumber; cut pada grid 59,94 fps dengan paritas frame per segmen dan offset audio per segmen ≤8,3 mdtk (rerata 1,9 mdtk) agar jeda dapat dipangkas halus. Tidak commit, gain/ambang tidak diubah. Titik lanjut: `edit/r5-NEXT.md`.

## Ronde 6 + Fase 2
D1: sinkron grid 59,94 fps offset ≤8,3 ms dicatat di DECISIONS. D2: `cut_check.py` + `audio_order.py lock suara` menerima `--guard-exceptions`; entri tanpa bukti lengkap tetap GAGAL, alat mengukur sendiri retensi ≥0,95/irisan ≤20 ms, setiap pengecualian dicetak; 5 tes baru `GuardExceptionTests` (44 tes OK); `edit/guard-exceptions.json` 7 sambungan dengan bukti `r5-retention-audit.json`; baris [A] di PENDING.md.
D3: “aku tuh ngebalik” = salah baca ASR: likelihood alignment tanpa tuh −0,854 vs dengan tuh −0,932 per karakter, energi 32,09–32,13 sunyi −43 dBFS (`edit/r6-aku-tuh-evidence.json`); tidak ada yang dibuang lagi.
PUTUSAN cut_check tanpa map: LULUS. PUTUSAN cut_check --source-words/--map --guard-exceptions: LULUS (7 pengecualian tercetak, 14 kata, retensi terukur ≥96,7 %, irisan ≤11,3 ms).
PUTUSAN pause_clean: LULUS −61,1 dBFS / selisih 42,4 dB (jeda diredam −36 dB pada 2 jeda, resep §14.6; suara tidak disentuh; `r6_clean.py`). PUTUSAN voice_fidelity: LULUS (udara >9 kHz 1,00, LRA +0,0).
PUTUSAN voice_level: GAGAL “pelan −19,3 LUFS < −17”; klip sudah lulus: puncak 0,0 dBFS = tiga puncak suku kata terpotong saat rekam (3,07/18,31/42,20 dtk), bukan klik, diredam lokal −1,3 dB Hann ±15 ms (`r6_declip.py`) → −1,24 dBFS.
Mengapa pelan tak bisa lulus: puncak ucapan wajar −1,2…−2,5 dBFS, gain bersih maksimum +0,24 dB (−19,1 LUFS) vs perlu +2,3 dB; tanpa limiter/kompresor (dilarang) mustahil. Opsi: (1) Sutradara melonggarkan batas pelan untuk sumber ini (sumber sendiri −19,9 LUFS), (2) limiter/declip global dengan putusan Irfan, (3) rekam ulang lebih pelan-bersih; musik/SFX menyesuaikan ke suara.
PUTUSAN lock suara dengan `--guard-exceptions`: GAGAL hanya pada voice_level (“FAIL: suara asli diturunkan, ditekan, atau terlalu pelan (Lantai E23)”); cut_check, guard, pause_clean lulus; ORDER kosong. Sinkron/durasi tetap LULUS (83,283 dtk, 2496 frame). Bukti `edit/r6-gate-results.json`, `r6-pcm-audit.json` (PCM berubah hanya di 5 wilayah). Tanpa commit.
Putusan opsi (1): `voice_level.py --terima-pelan "<alasan>"` (diteruskan lewat `audio_order.py lock suara`) membebaskan HANYA "pelan" bila alasan ada, hasil ≥ sumber −0,5 LUFS, tanpa clipping, dan headroom < gain dibutuhkan; 3 tes baru (47 tes OK). PUTUSAN voice_level dengan `--terima-pelan`: LULUS (baris TERIMA-PELAN: sumber −19,9, hasil −19,3 LUFS, puncak −1,24 dBFS, headroom 0,24 dB vs butuh 2,3 dB). PUTUSAN lock suara final: LULUS, `OK suara terkunci (1ee4baa34bf86ee9)`; `edit/ORDER.json` ditulis dengan evidence + `terima_pelan` + `guard_exceptions`. Tanpa commit.

## Revisi-1 A1 (17 Nov)
Penyebab: aturan tambahan R5 (tuh diperpanjang sampai lembah energi berikutnya) membuat potongan masuk ke kata tetangga: skor forced alignment karakter kata kanan pada audio tersambung turun, “bukan” 0,50→0,30, “masih” 0,35→0,11 (hasilnya|tuh|masih) dan 0,37→0,04 (bagian|tuh|masih), “bisa” 0,47→0,08; ukuran lama memakai batas kata hasil refine yang ikut bergeser sehingga retensi tampak 100 %.
Perbaikan: batas 7 sambungan tuh dipilih per sambungan dengan skor FA + ASR jendela-sambung (tuh tidak terbaca, kata kanan terbaca; `edit/r7-overrides.json`, `r7_tune.py`, `r7_asr_pick.py`). PUTUSAN integritas semua 47 cut (`r7_integrity.py`, skor kata kiri/kanan sambung vs sumber): sebelum 5 ditandai (turun >0,15), sesudah 1 (pause CGPT|Claude 9,94–10,06, 50 ms sebelum Claude; derau skor, ASR jendela 10,00–10,08 tetap terbaca).
PUTUSAN ASR no-prompt: “Dan ini bukan sebuah template” terbaca utuh, tanpa “tuh” tersisa; kata kunci 16/16 komposit (`edit/r7-asr-final.txt`). PUTUSAN cut_check tanpa map: LULUS; dengan --source-words/--map --guard-exceptions: LULUS (7 pengecualian, retensi terukur ≥96,5 %, irisan ≤11,3 ms); pause_clean LULUS; voice_level dengan --terima-pelan LULUS (−19,2 LUFS); sinkron LULUS (2512 frame, PSNR ≥46,7 dB).
PUTUSAN lock suara: LULUS (c23e53d9; sfx dan visual BASI, menunggu). Durasi 83,817 dtk (2512 frame, +0,534 dtk). Pergeseran timeline lama→baru: +0,13 dtk di 20,4 dtk; +0,33 di 22,7; +0,47 di 24,7 (setelah “bagian itu masih”); ≈+0,43–0,46 di 31–55 dtk; +0,40 di 56–59; +0,53 di 64–end. Batas babak baru: B3 23,557, B4 38,105, B5 53,754, B6 72,172 (B1/B1b/B2 tetap). Tanpa commit.
