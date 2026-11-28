# CHANGELOG v1 → v2

Format: perubahan → alasan → bukti. Singkatan: `SD` = `~/wonder/repos/skill-development/claude/motion-graphic/` (commit `5e9d781`), `plan` = `plan/soalnya-gini-10-plan.md`, `topik` = `plan/topik-dan-skema-shorts-id.md`, `BR` = `BEDAH-REFERENSI.md`, `T..` = uji di `uji/HASIL-UJI.md`. Nomor baris v1 mengacu ke `v1/`.

## Sistem dan arsitektur

| ID | Perubahan | Alasan | Bukti |
|---|---|---|---|
| C-01 | Jadwal jam 00:00–07:00 untuk satu video diganti antrean bersama 5 konten/hari (`tools/antrean.py`, `kit/antrean.config.json`) | "24 jam" = sistem bekerja terus (F-1); 5/hari lintas 3 akun (F-2) | `v1/README.md:10–18`; uji T8a–g |
| C-02 | Skill brand memanggil skill-development, tidak menyalin: tahap kanonik, Lantai, kartu cookbook, gerbang, render.sh | Keputusan F-3; v1 menulis ulang mekanik yang sudah ada sebagai kartu 95 | `editing.mp4` md5 `ec9b3dea…` = `~/work/pustaka-video/unggahan/95-rt2rj.mp4`; `SD/cookbook/04-ui-cutout-dataviz-visuals/95-cutout-collage-metaphor.md` |
| C-03 | Retry otomatis "skor < 8/10, 2×, lalu needs-human" diganti: gagal gerbang mekanis yang sama 2× → Opus sekali → `tertahan` | Skor absolut model sendiri tidak terkalibrasi; frame yang lulus juri catatan tetap ditolak saat dilihat | `v1/README.md:20`; `SD/cookbook/contoh-gagal/README.md` §09–11 |
| C-04 | Upload approval dikunci mesin: keluar `review_*`/`siap_unggah` hanya `--oleh irfan` | F-4; v1 hanya menulisnya sebagai kalimat | `v1/skills/07-sg-qc-auditor/SKILL.md:29`; uji T8a, T8g |
| C-05 | Routing model eksplisit per tahap (Sonnet default, Opus eskalasi, tahap tanpa LLM ditandai) | Permintaan tugas; v1 mencampur Manda/Codex/Gemini tanpa aturan eskalasi | `v1/README.md:13–17`; README §5 |
| C-06 | Prasyarat mesin dicatat: PC skill-development tertinggal, `npx` tidak ada di PATH non-interaktif, Whisper CLI tidak terpasang | v1 mengandalkan `whisper` CLI dan `npx remotion` | `ssh pc-server`: `which whisper` kosong; `git log` PC `42a94a51`; README §1.2 |
| C-07 | Profil merek dalam format skill-development (`merek/soalnya-gini/BRAND.md`, `EDITING.md`, font OFL di `aset/font/`) | Brand profile dibaca `profil_cek.py` dan dipakai lintas episode | `SD/templates/merek/README.md`; `profil_cek.py` GAGAL hanya 2 butir logo (K-03) |

## Gaya visual

| ID | Perubahan | Alasan | Bukti |
|---|---|---|---|
| C-08 | Kanvas gaya A: radial gradien periwinkle → Kabut `#E9EDF2` datar + jaring halus | plan melarang gradasi ungu/biru; anti-slop §1; S-V21 radial gradient; tepi gelap di latar terang S-V18 | `v1/kit/design-tokens.ts:47–55`, `v1/skills/04…/SKILL.md:10`; `plan:87`; `SD/references/slop-catalog.md:61,64`; uji T1e |
| C-09 | Kata sambung "Instrument Serif Italic 36–44 px sebaris" → Plus Jakarta Sans 500 Italic 56 px di baris sendiri (tumpuk baris) | Referensi memakai sans condensed miring, bukan serif; sebaris beda ukuran = Lantai A6; < 56 px = A7; serif tipis di antara sans tebal = anti-pola vibedesign | `BR` §1 (4,3 dtk; 35,8 dtk "When the / SHORTCUT"); `v1/skills/04…:23`; `SD/LANTAI.md:13–14`; `skill-development/claude/vibedesign/guide/tipografi/GUIDE.md:12` |
| C-10 | Font Oswald/Anton/JetBrains Mono/Instrument Serif dihapus; satu keluarga Plus Jakarta Sans (file OFL disertakan) | plan 1-1-1; anti-slop "monospace sebagai kostum"; Lantai A7 font dimuat dari file | `v1/kit/design-tokens.ts:31–36`; `plan:84` |
| C-11 | Klaim "scale punch 0,92→1,04→1,0" dan "whip-slide 6 frame" dihapus; diganti potong di kanvas yang sama + benda datang + teks diketik per huruf | Tidak terlihat di referensi | `v1/skills/04…:18,28`; `BR` §1 (21,0–21,3; 4,7–5,0; 8,8–9,1 dtk) |
| C-12 | Gaya B diberi nama "arsip"; dicatat bahwa vox.mp4/vox2.mp4 adalah iklan EarnEdits, bukan Vox | Asal gaya salah di v1; gaya template jual meningkatkan risiko "template-based" | `v1/skills/05…:7`; vox 38–39 dtk, vox2 39–42 dtk; https://support.google.com/youtube/answer/1311392 |
| C-13 | Gaya B: dilarang orang foto-realistis AI, logo media asli, tipografi pelangi + glow, teks 3D ekstrusi | Kebijakan konten sintetis YouTube; plan tanpa logo; S-V3; anti-slop glow | `BR` §2 (vox 0–4, 22–25; vox2 0–6, 18–20, 37–38 dtk); https://support.google.com/youtube/answer/14328491 ; `plan:106` |
| C-14 | Stabilo kuning `#E8C547` → turunan Biru Gini `#9DB8FF`; spidol merah jadi PENGECUALIAN tertulis (maks 2×) | plan: kuning = ciri Kita Bedah; Lantai C18a satu keluarga aksen | `v1/kit/design-tokens.ts:83`; `plan:85`; `kit/tema.ts` PENGECUALIAN; uji T7a |
| C-15 | Stempel tanggal monospace → Plus Jakarta Sans 600 | Referensi pun condensed sans; anti-slop monospace | `v1/skills/05…:23–24`; vox2 7–8 dtk |
| C-16 | `design-tokens.ts` → `kit/tema.ts` format skill-development + tabel kontras | `tema_cek.py` hanya membaca format ini; Biru Gini sebagai teks gagal kontras di Kabut (3,83:1) dan cetak biru (2,44:1) | uji T7a/b; perhitungan WCAG di `kit/tema.ts` L41–44 |
| C-17 | Maskot kardus terkunci → slot generik `aset/maskot/MASKOT.json` + aturan KRK-01 (aksi + fungsi) | Arahan Irfan: uji episode 1 memakai KLIK (D-06); final ditunda (K-03) | `v1/skills/04…:30`, `v1/skills/05…:33`, `v1/kit/design-tokens.ts:26–30`; `skill-development/claude/vibedesign/guide/karakter/GUIDE.md:10`; uji T6f |
| C-18 | Klaim "Belum ada channel explainer Indonesia yang memakai gaya ini" dihapus | Tidak ada bukti yang dicek | `v1/skills/04…:7` |

## Naskah, shotlist, storyboard

| ID | Perubahan | Alasan | Bukti |
|---|---|---|---|
| C-19 | Naskah ditulis sebagai omongan lisan, ±145–165 kata pada 2,9 kata/dtk, tanpa HURUF KAPITAL penekanan dan tanpa anotasi gaya | Keputusan Irfan D-04; kapital ikut terbaca sebagai teks di ASR | `v1/skills/02…:18,24`; `vo-uji/ab-*-lisan.wav` |
| C-20 | Skema shotlist v2: `metafora`, `kt` (peran/kode), `transisi_masuk` enum tanpa fade, `perubahan_sec`, `fakta_ids`, `keyframe_sec`, `maskot` (slot), `kartu_kiblat`, `gaya` | Lantai D19a, A4/A5, B13; MOTION-CORE §1 perubahan ≤ 2,2 dtk; v1 hanya `display_keywords`/`motion_primitive` bebas | `v1/kit/shotlist.schema.json:47–104`; `SD/MOTION-CORE.md:33`; uji T6b, T6e |
| C-21 | Lint shotlist mekanis (`beat_frames.py cek`) | Shot list plan Hari 1 sendiri melanggar: beat 6–7 dtk, satu tipe transisi, teks 4–5 kata, "dekatmu" tidak diucapkan | uji T6a; `kit/contoh/sg001.shotlist.json` lolos (T6b) |
| C-22 | Storyboard = still Remotion dari kode final per beat + tabel transisi/timing (`beat_frames.py label/storyboard`, `render.sh still`) | Keyframe = output; still yang disetujui dibandingkan dengan frame MP4 yang sama | `v1/skills/06…:26–30` (6 still uji di detik tetap) |
| C-23 | Penjaga variasi mekanis `variasi_cek.py` (kemiripan 3-gram, pembuka, rotasi cap/gaya/pilar) | YouTube: "minimal variation across videos", "templated storylines" tidak dimonetisasi | https://support.google.com/youtube/answer/1311392 ; uji T5a–c (10 naskah plan: maks 0,004; daur ulang 0,81 gagal) |

## Suara

| ID | Perubahan | Alasan | Bukti |
|---|---|---|---|
| C-24 | Engine VO: preset Gemini (Aoede/Kore/…) → Gemini Voice Design dengan dua suara rancangan Irfan, bergantian per episode; `tts_gemini.py` ditulis ulang (endpoint `interactions`, dry-run bawaan, `--izin-biaya`, kunci hanya dari berkas 600 di PC, peringatan kedaluwarsa suara) | Keputusan D-01…D-03; biaya = Tier 2 | `v1/skills/03…:17–20`; `v1/tools/tts_gemini.py:123`; `kit/suara.json`; uji T9a–c |
| C-25 | `loudnorm=I=-14:TP=-1:LRA=7` pada VO → `vo_master.sh` (gain linear naik saja, batas −1 dBTP, tanpa HPF untuk TTS) + `voice_level.py`; mix akhir `loudness_2pass.sh --mix-akhir` | Lantai E23; audio.md "tanpa kompresor, limiter, atau loudnorm pada suara asli"; loudness_2pass hanya untuk mix akhir | `v1/skills/03…:39`; `SD/LANTAI.md:49`; `SD/references/audio.md:231,320`; `SD/scripts/audio/loudness_2pass.sh:2–5`; uji T2e (v1 menurunkan suara 2,1 dB → FAIL), T2b2, T10a/b |
| C-26 | Whisper CLI → `words_align.py` (faster-whisper lokal mg-venv, decode ffmpeg); cakupan 95 % → 85 % + wajib semua kata KT tertangkap | CLI tidak terpasang; 95 % gagal pada suara manusia bersih; kata KT yang salah dengar merusak timing | `v1/skills/03…:43,50`; uji T4a–e, T10c/d |
| C-27 | Klaim suara edubizz dikoreksi: jeda setelah "Kok bisa?" 0,72 dtk (bukan 0,25–0,4), sapaan lo/gue, jenis suara belum diketahui; tempo 154 WPM terbukti | Diukur | `BR` §3; `v1/skills/03…:13,19` |

## QC dan pengiriman

| ID | Perubahan | Alasan | Bukti |
|---|---|---|---|
| C-28 | `run_qc.sh` → `sg_qc.sh` G0–G6; loudness jadi gerbang lewat `delivery_probe.py` | v1 hanya mencetak LUFS (`|| true`), tidak memeriksa warna/faststart/codec, tidak menolak render di luar `render.sh` | `v1/tools/run_qc.sh:37`; `SD/references/delivery-spec.md`; uji T3a–e |
| C-29 | 6 frame di detik tetap + skor model ≥ 8/10 → keyframe per beat vs golden frame yang disetujui (`golden_cek.py`, lembar sanding) + gerbang deterministik + `frame_audit.py` | Detik tetap tidak sejajar dengan beat; skor absolut tidak terkalibrasi | `v1/tools/run_qc.sh:41`; `v1/skills/07…:16–25`; uji T3c–g |
| C-30 | `slop-grep.sh`: 4 pola teks → teks + kode visual + nama file SFX; daftar yang didelegasikan ke gerbang induk dan yang masih manual ditulis di kepala skrip | slop visual dari slop-catalog bisa sebagian mekanis | `v1/tools/slop-grep.sh:23–33`; `SD/references/slop-catalog.md`; uji T1a–e |
| C-31 | Pengungkapan AI dan afiliasi masuk daftar periksa review final | YouTube synthetic disclosure, paid promotion, Shorts link tidak bisa diklik, Shopping affiliate ID hanya YPP | https://support.google.com/youtube/answer/14328491 · https://support.google.com/youtube/answer/154235 · https://support.google.com/youtube/answer/13748639 · https://blog.google/intl/id-id/products/explore-get-answers/satu-tahun-youtube-shopping-waktu-menonton-konten-belanja-melonjak-400-di-indonesia/ (semua dibaca 25 Nov 2026) |
| C-32 | Meta: file yang sama boleh ke Reels (produksi sendiri), caption ditulis ulang | Meta 13 Mar 2026: konten diproduksi sendiri = orisinal; edit kecil = tidak orisinal | https://about.fb.com/news/2026/03/rewarding-original-creators-on-facebook/ |
