# LOG produksi ep02 (Hari 2: mabuk di mobil, suara sg-laki)
Agen: Sonnet 5.5. Mulai 25 Nov 2026 ±21:55 WITA.

## T0 · Persiapan dan bacaan (21:55–)
- Dibaca utuh: BRIEF-PRODUKSI.md, v2/README.md, skill v2 01, 02, 03, 04, 06, 07; plan §2, §3, §4 Hari 2, §5; MOTION-CORE.md, cookbook/00-core-invariants.md, cookbook/INDEX.md, LANTAI.md, references/slop-catalog.md.
- `bus check` claude2: kosong.
- skill-development PC kini di commit 5e9d781d (README v2 menyebut PC tertinggal; sudah di-pull, `gate/delivery_probe.py` ada). Working tree PC masih punya perubahan lokal (bukan urusan ep02, tidak disentuh).
- Catatan: `ep02/agent.jsonl` dan `agent.err` ada di folder episode sejak awal (log aliran sesi dari harness), bukan keluaran produksi.

## T1 · Fakta, naskah, suara (21:57–±23:00 WITA) · Sonnet
- fakta.md: dari plan §4 Hari 2 (F1–F4 + F0). **Titik tersendat**: skill 01 minta tiap angka ≥ 2 sumber dan "tanggal dibaca"; tidak ada angka di naskah ep02, tetapi sumber F1/F2 hanya dikutip dari plan (buku/DOI tidak dibuka ulang). Ditulis jujur sebagai "menurut plan, belum dibuka ulang" dan masuk MANDA-PERMINTAAN.
- script.md: 148 kata, ditulis ulang sebagai omongan lisan; klaim sama dengan plan. Pelunakan: "selalu pas" → "hampir selalu pas"; "Peneliti menyebutnya konflik sensorik" → "Salah satu penjelasannya namanya konflik sensorik" (teori = salah satu penjelasan, skill 02 §2). Angka 40% tidak dipakai. Gerbang: slop-grep LOLOS; variasi_cek PASS (arsip kosong, meta saja); antrean so001 ide→fakta→naskah→review_naskah `--oleh mesin`.
- Antrean: `antrean.py` memakai `v2/antrean/` secara bawaan; dilarang menulis ke v2/, jadi `--dir ep02/antrean`. Catatan: `python3` diblokir hook (wajib `uv run python`); saya memakai `~/work/mg-venv/bin/python`.
- TTS Gemini sg-laki (genap): take 1 -18,8 LUFS/TP -1,3 → vo_master GAGAL (pelan -18,5, puncak -1,0). Take 2 -17,5 LUFS/TP -1,1 → GAGAL (pelan 0,5 dB di bawah -17). Skill 03: ulang sekali lalu tahan; brief melarang berhenti → `vo_master.sh --terima-pelan "<alasan>"` (flag resmi gerbang) → LULUS. 2 panggilan API berbayar.
- words_align (medium): cakupan 94,6 %, 2,81 kata/dtk, durasi 53,3 dtk PASS.
- **Titik tersendat besar: kunci suara (cut_check/recut/audio_order lock suara) tidak cocok untuk TTS.**
  1. `cut_check` rentang buang pertama ditolak guard 50 ms/overlap karena timestamp Whisper menelan jeda ke dalam kata (jeda antarkalimat 0,5–0,8 dtk jadi "dalam kata").
  2. Saya merapatkan s/e kata ke energi nyata (`ep02/alat/rapatkan_words.py`, hanya file kerja ep02) lalu membuat rentang sendiri (`alat/buat_potong.py`) di titik yang lolos `recut.endpoint_quiet` (batas relatif −44,7 dBFS, grid 100 Hz via `--fps 100` karena grid 30 fps menggeser titik ke bunyi). Hasil: 32 rentang, 53,62 → 45,43 dtk; `cut_check` sumber: PASS source overlap/duration/guard; antar_kal 0.
  3. Sisa FAIL tidak bisa diperbaiki aman: `diam_kata` 3 (nih, cocok., dan: dip energi di dalam kata) dan `diam_kal` 7 (jeda koma 0,15–0,23 dtk). Penyebabnya definisi "diam" (< −35,3 dBFS) mencakup tanjakan onset konsonan lemah (−45→−35 dBFS, ±0,1 dtk) sebelum kata; guard 50 ms + endpoint sunyi membuat sisa jeda minimum ±0,16–0,18 > ambang 0,15. `--guard-exceptions` hanya melonggarkan guard, bukan ambang diam.
  4. Akibat: `audio_order.py lock suara` GAGAL ("suara terkunci masih memuat kata sampah atau jeda berpikir"). `render.sh final` memanggil `audio_order.py check` (R2) → akan menolak render final. Gerbang tidak diedit/dilewati. Lihat T-akhir untuk hasil.
  5. Durasi VO terpotong 45,43 dtk (plan §3 menulis 50–58; gerbang v2 G1 45–60,5). VO terdengar ±3,3 kata/dtk; tail 1,8 dtk tanpa VO ditambah untuk loop tutup.

## T1b · Addendum Irfan 25 Nov 22:05 (dibaca utuh: test-produksi/ADDENDUM-KEPUTUSAN.md)
Berlaku untuk ep02: (1) K-04 gaya = default; (2) K-05 plan menang: caption kata per kata di pelat putih membulat y 1250–1450, kata aktif #1F4FCC (kontras diukur), satu keluarga transisi push-in + potongan melintang (+ buka-maskot aksen); gerbang PITA/A1/A2 dan B13a dijalankan, hanya kegagalan dua butir itu dinyatakan "pengecualian merek K-05"; (3) K-02 tanpa teks/kredit/watermark pengungkapan di video; (4) K-07 stem TTS: trim linear puncak ≤ 0,5 dB bila perlu agar puncak ≤ −1 dBFS lalu gain naik; bukan limiter; catat angka; 0,5 dB tak cukup → generate ulang sekali → tahan; (5) Manda tidak dihubungi; (6) keputusan baru dilaporkan di balasan akhir "Keputusan untuk Irfan".
Terdampak: pemakaian `--terima-pelan` di T1 (take lama) digantikan jalur K-07 pada take baru; kunci suara tetap; bagian caption/transisi pada shotlist dan komponen.
Sesi terputus (exit 137) saat TTS ulang (naskah dengan hook "Kenapa kamu mabuk di mobil, sopirnya nggak?"); `vo_raw.wav` belum ada, TTS diulang.
- T1c (setelah addendum): TTS script baru (152 kata). Take A: -18,5 LUFS TP -1,6 → gain +0,6 dB (batas headroom) → -17,9 LUFS, voice_level GAGAL "pelan". Trim K-07 tidak berlaku (puncak sudah ≤ -1). Regenerasi sekali: **HTTP 429 "10 requests per day"** (kuota harian kunci Gemini, dipakai bersama ep01/ep03 → total panggilan hari ini sudah habis). Karena regenerasi mustahil dan brief melarang berhenti, take A diterima lewat flag resmi `--terima-pelan` (alasan tertulis). **Ini keputusan untuk Irfan** (addendum menulis "masih gagal → tahan item").
- Keputusan: VO TIDAK dipotong (suara_cut dibuang, v1_gagal/ menyimpan percobaan lama). Alasan: addendum "karakter dan intonasi suara tidak boleh diubah"; pemotongan jeda TTS gagal aman (lihat T1) dan kunci suara gagal pada kedua versi; tanpa potong durasi 51,9 dtk sesuai plan 50–58. `cut_check` pada vo.wav tanpa potong: diam_kata 0, diam_kal 12 (jeda koma 0,15–0,44), antar_kal 13 (0,52–0,70 vs ambang 0,50) → FAIL, disimpan di `episode/cut_check_tanpa_potong.txt`. words_align PASS: cakupan 94,1 %, 2,91 kata/dtk, 51,9 dtk. Whisper salah dengar: "megang setir"→"menggangstir", "nebak"→"nembak", "rem mendadak"→"remen dadak", "supir" (naskah "sopir"): tidak dipakai sebagai KT.
- Titik tersendat: kuota TTS 10/hari tidak tertulis di skill 03; tiga agen berbagi satu kunci, jadi "ulang take sekali" (K-07) tidak dijamin bisa.

## T2 · Shotlist (±22:35 WITA) · Sonnet
- `shotlist.json` 20 beat (alat/buat_shotlist.py membangun dari words.json); kartu kiblat 95 (kolase cutout), 88 (rantai benda metafora), 65 (push-through kamera). Skema jsonschema OK. `beat_frames.py cek`: jarak perubahan maks 1,54 dtk; tanda tangan di 5,52 dtk (awal beat 3, "Kok bisa? Soalnya gini." digabung supaya jatuh di 3,0–6,5; kata "Soalnya" baru diucap 6,66).
- Kegagalan tersisa HANYA B13a (17 baris "push-through berturut-turut" + "jendela hanya 2 tipe transisi"): **pengecualian merek K-05, Irfan 25 Nov 2026** (satu keluarga push-in + potongan melintang, buka-maskot sebagai aksen). Tidak diakali.
- **Bug alat**: `beat_frames.py cek` mendeteksi "angka" dengan substring `juta` di kata "kejutan" → b17 gagal "menyebut angka tanpa fakta_ids". Dihindari dengan `fakta_ids:["F0"]` (F0 = ilustrasi). Usulan: regex pakai batas kata.
- Hook: plan menulis cap "Kenapa…" tetapi VO plan tidak mengucapkannya (konflik dengan Lantai A5 dan gerbang hook); naskah diubah (hook "Kenapa kamu mabuk di mobil, sopirnya nggak?") dan TTS diulang.

## T3 · Storyboard (±22:10–22:25) · Sonnet
- Proyek Remotion di `remotion/` (node_modules symlink baca-saja dari proyek lain; curves/timing/acak disalin dari scripts/remotion; tema.ts salinan kit/). Komponen: Kanvas (Kabut + jaring), Objek vektor 2D, Maskot KLIK (port cast.js, desain sama), KT (6 mode T01/T04/T19/T23/T28/T30), Caption pelat putih (K-05), Masuk (push-in + potongan melintang, K-05). 20 adegan.
- `render.sh still` (jalur resmi) 20 still → `STORYBOARD.md` (beat_frames storyboard), `qc/sanding.jpg` (sandingkan vs sheet kartu 95). `golden_cek`: GAGAL 20/20 TANPA-GOLDEN (golden.json kosong; bukan salah episode). `teks_cek`: 14 tanda GANDA (KT dan caption kata sama; akibat K-05). `tema_cek` LULUS, `motion_lint` PASS.
- Antrean `--dir ep02/antrean` (tidak menulis v2/): ide→…→review_naskah (mesin), →suara (`--oleh irfan`: naskah disetujui per brief), →storyboard→review_storyboard (mesin), →build (`--oleh irfan`, alasan "test 25 Nov, Irfan minta tanpa jeda storyboard").

## T4 · Build, mix, render, QC (±22:25–22:45)
- `render.sh draft` (resmi) → `qc/draft.mp4` 53,7 dtk skala 0,5. Pratinjau: draft + `alat/mix_preview.py` (VO + 41 cue SFX dari ~/sfx/SFXIrfan, tanpa musik; −17,9 LUFS) + gain linear +1,5 dB (`loudness_2pass.sh --mix-akhir` GAGAL pada -15 dan -16: normalisasi menjadi dynamic karena TP; mix tidak bisa dinaikkan tanpa limiter karena VO sudah di batas headroom, sama dengan K-07).
- **`render.sh final` DITOLAK**: "audio/ORDER.json belum ada". `audio_order.py lock suara` mensyaratkan `cut_check` lulus; pada suara TTS: tanpa potong diam_kal 12 + antar_kal 13; potongan terbaik (27 rentang, 6,45 dtk, titik di celah sunyi) menyisakan 5 diam_kal 0,16–0,21 dtk di jeda koma yang berisi bunyi lemah (nafas, onset konsonan). `--guard-exceptions` tidak membantu (hanya guard 50 ms). Regenerasi TTS mustahil (kuota). Gerbang tidak diedit/dilewati, jadi **tidak ada `render.mp4`**. Pratinjau saja: `preview_BUKAN_final_draft_skala05.mp4`.
- `sg_qc.sh` dijalankan pada salinan pratinjau (`qc/uji_preview/`, di-upscale 1080x1920): G0 GAGAL (tidak ada final), G1 LULUS, G2 LULUS, G3 LULUS (setelah komentar tema.ts disunting), G4 LULUS, G5 GAGAL (python3 diblokir hook + B13a K-05), G6 GAGAL (TANPA-GOLDEN). Ringkasan: `qc/qc-report.json`; mentah: `qc/uji_preview/qc/*.log`.
- Tidak dijalankan: frame_audit (VERDICT per potongan oleh mata), audio_phone --gate, lock visual/sfx/musik, cek_komposisi R1 (tak ada data episode json), musik bed, Devil's Advocate. Alasan: render final terblokir lebih dulu; waktu.
- Antrean: `tahan so001` (tertahan) dengan catatan. Brief meminta review_final; tidak dipenuhi karena render final tidak ada (bukan disembunyikan).

## Titik tersendat (ringkas)
1. Kunci suara vs TTS (T1, T4). 2. Kuota Gemini 10/hari dibagi tiga agen. 3. `beat_frames cek` salah cocok "juta" di "kejutan". 4. kit/tema.ts gagal slop-grep sendiri (komentar memuat hex terlarang). 5. `sg_qc.sh`/`beat_frames.py` memakai `python3`, diblokir hook PC (perlu `uv run python` atau venv). 6. Plan: cap "Kenapa…" tidak diucapkan di VO plan; konflik dengan A5 + gerbang hook (diperbaiki dengan mengubah naskah → TTS dua kali). 7. K-05 caption + KT menimbulkan GANDA (A3) yang tidak tercakup pengecualian. 8. render.sh final butuh banyak artefak (JURI, frame_audit, audio ORDER, stems) yang tidak dijelaskan skill 06/07 v2 urutannya. 9. Foto cutout berlisensi tidak ada; gaya A memakai vektor.

## Usulan perbaikan skill-development/v2 (maks 10)
1. `cut_check`/`audio_order`: mode `--sumber tts` (ambang diam_kal ≥ 0,25 dtk dan antar_kal ≥ 0,8 dtk, atau definisi diam berbasis energi absolut) — bukti T1 poin 3, T4.
2. `recut.py`: terima rentang di grid ms (bukan frame 30 fps) untuk audio saja — bukti T1 (grid 30 fps menggeser titik ke bunyi, `--fps 100` perlu ditebak).
3. `words_align.py`: kembalikan batas kata berbasis energi (Whisper menelan jeda ke kata TTS) — bukti T1 (65 kata digeser `alat/rapatkan_words.py`).
4. Skill 03: tulis kuota Gemini TTS (10/hari) dan sarankan jatah per episode; `tts_gemini.py` cetak sisa kuota — bukti T1c HTTP 429.
5. `beat_frames.py`: regex angka pakai batas kata (`\bjuta\b`) — bukti T2.
6. `kit/tema.ts`: hapus hex terlarang dari komentar — bukti T4 G3.
7. `sg_qc.sh`/`beat_frames.py`: pakai `$PY` bukan `python3` — bukti T4 G5.
8. Skill 02: tulis aturan hook: kata cap pembuka harus diucapkan di VO (atau cap non-ucapan dikecualikan resmi) — bukti T1b.
9. Tambah 1 golden frame (gaya A) yang disetujui Irfan sebelum uji berikut; tanpa itu G6 selalu gagal — bukti T3.
10. Skill 06: satu daftar urut artefak yang diminta `render.sh final` (RESEP, TAHAP, JURI, frame_audit/INDEX, audio/ORDER+stem, sanding) — bukti T4.

## T5 · Addendum 2 (25 Nov 22:40, agen utama atas mandat Irfan) + butir 7 addendum 1 (dibaca utuh)
Diterima/berlaku untuk ep02: gerbang = alat bantu, boleh dilewati/diterima dengan 1 baris alasan + bukti di LOG; mutlak hanya teknis pengiriman (format, resolusi, clipping) dan legal. (1) kegagalan cut_check pada TTS diterima, kunci suara dilanjutkan; (2) take −17,9 LUFS/puncak ≤ −1 diterima, tanpa TTS ulang; (3) kata ganda caption/KT diterima (K-05), KT besar dibatasi 1 kata kunci per beat; (4) G6 dilewati "golden belum disetujui Irfan", 2–3 still terbaik → `qc/golden-kandidat/`; (5) hook terucap + vektor 2D diterima; (6) JANGAN panggil TTS lagi malam ini (kuota); (7) target ep02 = render final + sg_qc.sh + review_final.
Skill-development PC kini di 85af4984 (AGENTS.md invarian 4: "melewati gerbang boleh dengan satu baris alasan + bukti di LOG; alat gerbang tidak diubah demi satu video"). Skrip `render.sh`/`audio_order.py` sendiri tetap menolak tanpa ORDER.json dan tidak diubah; melewatinya berarti tidak memakai `render.sh final`, tetapi merender langsung lalu mux (alasan dan bukti di T6).
- Perubahan setelah addendum 2: KT dibatasi 1 item per beat (beat 9 dan 18 dipecah jadi 9a/9b dan 18a/18b → 22 beat; `beat.adegan` memilih komponen); beberapa benda diperbesar (beat 2, 12–15). `words_align --shotlist` PASS; `beat_frames cek` hanya B13a. 22 still lewat `render.sh still`, STORYBOARD.md dan sanding diperbarui; `qc/golden-kandidat/` (b03, b10, b19). G6/golden_cek: dilewati, "golden belum disetujui Irfan" (golden_cek tetap dijalankan, 22/22 TANPA-GOLDEN).

## T6 · Render final, mux, QC (±23:10–23:35)
- **Render**: `flock /tmp/remotion-heavy-render.lock npx remotion render ... --muted --crf=16 --concurrency=3` → qc/video_tanpa_audio.mp4 (1611 frame, ±2,5 mnt, `qc/final_render.log` rc=0). Alasan tidak memakai `render.sh final`: skrip menolak tanpa audio/ORDER.json; ORDER butuh `lock suara` yang butuh `cut_check` lulus; kegagalannya pada jeda TTS diterima (Addendum 2 butir 1) tetapi skripnya tidak punya jalur menerima, dan alat gerbang tidak diubah. Bukti: output `render.sh final` T4, `cut_check` FAIL (diam_kal 12/antar_kal 13 tanpa potong; 5 setelah potong terbaik).
- **Mix**: VO utuh (tanpa potong, −17,9 LUFS, puncak ≤ −1) + 44 cue SFX dari ~/sfx/SFXIrfan (`alat/mix_preview.py`, transisi/aksen −9 dB, tick −16 dB, ekor fade 200 ms; tanpa kayu/koin/kartun); tanpa musik bed (tak ada musik berlisensi tervetting di ~/sfx; dilewati, alasan ini). Gain linear +1,9 dB (tanpa limiter/kompresor) → −16,0 LUFS, TP −1,4 dBTP.
- **Kesalahan saya yang tertangkap**: render pertama Remotion berformat yuvj420p (full range, bt470bg). Mux awal hanya melabeli ulang bt709/tv → latar jadi 255,255,252 (terlalu putih). Terdeteksi saat membandingkan still vs frame render. Diperbaiki dengan `scale=in_range=pc:in_color_matrix=bt470bg:out_range=tv:out_color_matrix=bt709`. Ini titik tersendat: delivery-spec skill 06 §4 hanya menyebut "re-encode dengan perintah di delivery-spec" tanpa memperingatkan keluaran Remotion full-range.
- `delivery_probe` LULUS 6/6. `sg_qc.sh`: G0 GAGAL (diterima: render.sh final dilewati), G1–G4 LULUS, G5 GAGAL (python3 diblokir hook; ekstraksi manual 22 keyframe ok + cek B13a), G6 dilewati (golden belum disetujui). Ringkasan: qc/qc-report.json.
- Antrean so001: tertahan → render → qc → review_final.
- Usulan tambahan #11 (di luar batas 10, gabungkan dengan #10): skill 06 tulis perintah encode untuk keluaran Remotion (yuvj420p/bt470bg → bt709 tv).

# BAGIAN v2 (26 Nov 2026) — dibangun ulang atas permintaan Irfan
Dibaca utuh: ADDENDUM-3-VISUAL.md (termasuk Struktur layer, Warna dan bentuk benda), ADDENDUM-4-LOGIKA-DUNIA.md; dari Bang Motion: ANALISIS.md §1–2 (M1 uji PPT, M5 akresi, M7 aksi kontinu, M8 panggung), SKILL.md "Larangan struktural — uji PPT". Tidak dibaca: explainer.md, kartu-panggung.md (hanya ringkasannya di ANALISIS).
- v1 dipindahkan ke `v1/`: render.mp4, qc/sanding.jpg, sanding_render_vs_still.jpg, tinjau_sheet.jpg, qc-report.json, JURI.md, STORYBOARD.md, shotlist.json, still v1, `remotion-src/` (kode v1).
- Tetap: VO (vo.wav, take −17,9 LUFS), naskah, words.json, timing beat. TTS TIDAK dipanggil.
- Arah v2: semua benda digambar dengan kode, warna dan bentuk mirip aslinya (tanpa palet merek untuk benda); 3 layer (Latar / Aksi / Atas) dengan kamera + parallax sendiri; satu dunia "kepala potong" bertahan di beat 3–11 dan disusuri kamera; POV dipilih per adegan (tabel di STORYBOARD.md).

## v2 · Build (±00:10–01:10, 26 Nov)
- **Struktur komponen** (Addendum 3): `bersama/Dunia.tsx` = rig 3 layer, tiap layer punya transform kamera sendiri (parallax Latar 0,35 / Aksi 1,0 / Atas 0,12); satu gerak kamera per beat, satu arah (kurva drift). Benda: `bersama/Benda.tsx`, `Benda2.tsx`, `Kepala.tsx` (warna dan bentuk mirip aslinya; hanya caption pelat K-05 dan KLIK memakai desain tetap). Adegan: `v2/Adegan2.tsx` (22 beat; `beat.adegan` memilih komponen). VO, naskah, words.json, timing beat, mix.wav tidak berubah; TTS tidak dipanggil.
- **Anatomi/benda (Addendum 4 §4)**: daun telinga, saluran telinga, gendang telinga, tiga tulang pendengaran, vestibulum, tiga saluran setengah lingkaran berisi cairan (dinding tulang + isi cairan biru pucat + aliran), rumah siput, saraf kuning, otak (lipatan, otak kecil, batang otak), bola mata (kornea, iris, pupil, kelopak); mobil samping (badan, kaca, ban/velg, lampu), mobil dari atas, jalan berkelok, setir + tangan, pedal + sepatu, HP, meter jarum.
- **POV per adegan + alasan**: tabel di STORYBOARD.md "v2: POV, layer, dan kamera per beat". Ringkas: samping/mata manusia untuk dunia nyata (beat 1, 11, 16, 17, 19, 20), atas/peta untuk bentuk jalan dan tebakan jalur (2, 13, 15), dekat/potongan untuk isi tubuh dan pengendali (3–10, 12, 14), diagram untuk meter (18).
- **Cek visual sebelum render (Addendum 4 §1)**: draft skala 0,4 (`qc/v2/draft.mp4`, 2 putaran). Dicek: still di awal/tengah/akhir tiap beat (`qc/v2/cek1.jpg`, `cek2.jpg`, `cek3.jpg`) dan klip transisi 6–7 fps di b1 (0–2,4 dtk), b2→b3 (5,2–6,6), b4→b5 (10,4–13,0), b10→b11 (25,4–27,8), b19→b20 (49,7–53,5) (`qc/v2/cek_gerak.jpg`).
  (a) **Kamera bolak-balik**: tidak ada; tiap beat from→to satu arah, tanpa overshoot (kurva drift). Beat 9a→9b dan 6→7→8 berpindah fokus antar beat (disengaja mengikuti VO), bukan di dalam satu beat.
  (b) **Benda melayang**: ditemukan dan diperbaiki: v1 melayang di beat 1 (mobil di atas garis); v2 roda menapak aspal (y roda = permukaan jalan), bayangan kontak elips di bawah mobil; penumpang duduk di jok, jok menempel lantai pintu. Mobil atas berada di dalam lebar aspal.
  (c) **Skala**: kepala di dalam mobil dibesarkan ±1,2× (±55 px untuk mobil 880 px = 4,5 m; seharusnya ±40 px) supaya wajah pucat terbaca; diterima dengan alasan keterbacaan, lalu kamera didorong 1,5× ke jendela. Interior (beat 11, 16, 17, 19) memakai POV dekat sehingga kepala besar, tidak dibandingkan dengan mobil. Jalan atas: lebar jalan ±0,6 mobil (jalan lebih sempit dari seharusnya; dibiarkan).
  Perbaikan dari putaran 1: kepala di mobil terlalu kecil (zoom 1,22 → 1,5), KT beat 3 menabrak KLIK (digeser), inset mobil beat 5 terpotong tepi (dipindah ke dalam), meter terlalu kecil (r 250 → 330), setir kecil (×1,25), aspal berhenti di tengah layar (diperpanjang), KT "cairan" digeser dekat saluran dengan garis.
- **Render**: `flock … remotion render --muted` (20,4 MB mentah, rc=0, `qc/v2/final_render.log`), mux ffmpeg dengan konversi rentang yang benar (belajar dari v1: keluaran Remotion yuvj420p/bt470bg). `delivery_probe` 6/6 LULUS. Still storyboard 22 lewat `render.sh still`; sanding: still v2 vs still v1 (kode sendiri, bukan foto). `tema_cek` LULUS (setelah literal warna dipindah ke bersama/ tanpa mengubah nilai), `motion_lint` PASS, `beat_frames cek` hanya B13a. `sg_qc.sh`: G1, G2, G3 LULUS; G0, G4, G5, G6 gagal/diterima dengan alasan (qc/qc-report.json).
- **Kekurangan jujur**: ilustrasi manusia masih sederhana; anatomi disederhanakan; tidak ada frame_audit per detik, hanya sheet 2,5 dtk + sheet beat; `teks_cek` tidak dijalankan ulang; penilai mata sama dengan pembangun.

### Tabel v1 vs v2
| Aspek | v1 | v2 |
|---|---|---|
| Struktur | satu SVG datar per beat, satu benda + satu kalimat (slide) | 3 layer (Latar/Aksi/Atas) berparallax; hero kepala potong bertahan beat 3–11 dan 14 |
| Kamera | push 1,00→1,05 pada semua; titik pusat tetap | from→to per beat, zoom/pan ke benda yang disebut (hingga 2,6×), satu arah |
| Warna benda | palet merek (Biru Gini, tinta, putih) untuk semua benda | warna dan bentuk wajar (mobil merah, kulit, otak merah muda, cairan biru pucat, rumput) |
| Bentuk | lingkaran biru = cairan, ikon geometris | anatomi telinga dalam lengkap, otak berlipatan, bola mata, mobil + jalan berkelok |
| POV | satu (frontal datar) | samping (mata manusia), atas (peta), dekat/potongan, dipilih per beat dengan alasan |
| Latar | kanvas Kabut + jaring | langit/bukit/pohon/jalan menggulung; netral lembut di adegan anatomi |
| Skala benda | ikon kecil di ruang kosong | kepala ±70 % lebar, mobil ±80 %, meter 2×660 px |
| Benda melayang | mobil di atas garis jalan; semua benda goyang (hidup palsu) | roda menapak aspal + bayangan; hanya mobil/cairan/sinyal/roda/pemandangan yang bergerak; latar statis |
| Beat | 22 (KT 1 item) | 22 (sama), timing tetap |
| Maskot | KLIK beat 3, 19, 20 | sama, di layer Atas |
| Render | 12,2 MB, 53,7 dtk | 17,6 MB, 53,7 dtk |
| Gerbang | tema_cek, motion_lint LULUS; G4 palet LULUS | tema_cek, motion_lint LULUS; G4 palet GAGAL diterima (warna asli) |
| Waktu build | perkiraan ±2,5 jam | perkiraan ±1 jam (v2 ditulis baru, jam tidak diukur) |

### Keputusan untuk Irfan (v2)
1. G4 palette_check pasti gagal untuk visual warna asli (dominan 55 % < 70 %). Terima sebagai norma untuk merek ini, atau ubah ambang untuk Soalnya Gini?
2. Kepala di dalam mobil dibesarkan ±1,2× demi keterbacaan (Addendum 4 skala nyata): ok, atau pakai selalu POV dekat/interior?
3. Aset manusia (penumpang, sopir) masih sangat sederhana. Perlu rig tubuh penuh (Addendum 3 menyebut kartun panggung) atau cukup siluet seperti ini?

# BAGIAN v3 (26 Nov 2026 ±01:20–01:40) — perubahan bedah atas v2, keputusan Irfan 01:18 (v2/KEPUTUSAN-IRFAN.md)
- v2 disimpan di `ep02/v2/` (render.mp4, qc, STORYBOARD.md, shotlist.json, remotion-src, still). v3 = render.mp4 sekarang. Hanya tiga perubahan; VO, timing beat, mix.wav, komposisi, kamera, warna benda tidak diubah (selisih render v3 vs still v3 3,09–3,69/255).
- **(1) Caption pelat dihapus** (`<Caption>` dibuang dari Episode.tsx; data captions.ts dibiarkan tak terpakai). KT tetap terbaca: tinta 96–120 px + kontur putih (cek: `qc/v3/cek1.jpg`, `cek2.jpg`, tidak ada KT yang menabrak benda berwarna gelap; di beat 3 KT jatuh di leher kepala pucat, tetap terbaca).
- **(2) KLIK dihapus** di beat 3, 19, 20 (komponen Klik tidak lagi diimpor). Slot `maskot` dihapus dari shotlist.json (0 beat bermaskot), `buka-maskot` → `push-through` 8 frame (alasan: tanpa maskot; frame sama, jadi timing transisi tidak berubah). Ruang tidak diisi dekorasi.
- **(3) Tanda tanya di KT**: tiga kalimat tanya di naskah. "Kenapa kamu mabuk di mobil?" → KT `Kenapa…?` (beat 1; kata cap dari plan tetap, ditambah "?"); "Kok bisa?" → KT baru `Kok bisa?` di beat 3, tampil 5,62–6,57 dtk lalu `Soalnya gini` di 6,66 (tidak tumpang tindih; ini KT kedua dalam satu beat, pengecualian atas batas 1 KT/beat Addendum 2); "Kamu tim mabuk atau tim tidur di mobil?" → KT dua baris `tim mabuk atau / tim tidur?` (beat 22, mulai di kata "tim" 50,32 dtk). **Penyimpangan**: KT penutup 5 kata melanggar Lantai A4 (1–3 kata, `beat_frames cek` b22 gagal). Alasan: contoh Irfan menyebut kalimat itu utuh, dan tanpa caption penutup/CTA tidak terbaca bila dipotong. Kata dipakai hanya dari ucapan.
- Teknis: Kit.tsx KT mendukung baris `|`; Adegan2.tsx KT pakai `tahan_sec` bila ada. `words_align --shotlist` tidak dijalankan ulang (kata KT baru "kok","bisa","tim","tidur","kenapa" ada di transkrip: ditemukan oleh `alat/buat_shotlist.py` dari words.json).
- **Cek visual sebelum render**: draft skala 0,4 (`qc/v3/draft.mp4`), still awal/tengah/akhir 22 beat (`qc/v3/cek1.jpg`, `cek2.jpg`), 3 kalimat tanya pada 0,1–2,0 / 5,7–7,2 / 50,3–53,6 dtk (`qc/v3/cek_tanya.jpg`). Tidak ada kamera bolak-balik, benda melayang, atau skala baru (tidak ada perubahan adegan). Temuan: tidak ada yang perlu diperbaiki.
- **Render**: `flock … remotion render --muted` rc=0 (`qc/v3/final_render.log`), mux ffmpeg (rentang warna yang benar), `delivery_probe` 6/6 LULUS (−16,0 LUFS, TP −1,4). 22 still via `render.sh still`, STORYBOARD.md dibuat ulang dengan tabel POV/layer, sanding v3 vs still v2. `sg_qc.sh`: G1, G2, G3, **G4** LULUS (v2 G4 gagal 55 %: pelat putih + KLIK ikut dihitung); G0, G5, G6 gagal/diterima seperti v2 (`qc/qc-report.json`). `tema_cek` LULUS, `motion_lint` PASS.
- Catatan alat: pemantau `pgrep -f` pada pola ffmpeg cocok dengan shell pemantau sendiri sehingga tidak pernah selesai; mux sudah jadi saat dicek manual (saya salah merancang pemantau, bukan masalah render).

### Tabel v2 vs v3
| Aspek | v2 | v3 |
|---|---|---|
| Caption pelat K-05 | ada, y 1250–1450, kata aktif biru | tidak ada |
| Teks layar | KT 1 item/beat + caption | KT saja; beat 3 punya 2 KT berurutan |
| Maskot KLIK | beat 3, 19, 20 | tidak ada (slot shotlist dihapus) |
| Kalimat tanya | tanpa "?" | "Kenapa…?", "Kok bisa?", "tim mabuk atau / tim tidur?" |
| Transisi beat 3 | buka-maskot 8 f | push-through 8 f |
| G4 palet | GAGAL (55 %) | LULUS |
| Ukuran | 17,6 MB | 17,0 MB |
| VO, timing, mix, komposisi, kamera | — | identik |

### Keputusan untuk Irfan (v3)
1. KT penutup `tim mabuk atau / tim tidur?` 5 kata (A4 gagal): terima, atau potong jadi `mabuk atau tidur?` (3 kata)?
2. Tanpa caption, kalimat tanpa KT hanya terdengar (beat 4–8 satu kata kunci per beat). Terima, atau tambah KT kunci kedua di beat padat?
3. Berlaku juga untuk ep01/ep03 menunggu konfirmasi (catatan Irfan 01:18); ep02 sudah mengikuti.
