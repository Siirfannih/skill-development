# Soalnya Gini Studio v2: konfigurasi merek + skill khusus di atas skill-development

Shorts/Reels explainer Indonesia 45–60 dtk, 1080x1920, 30 fps. Revisi v1 (Gemini) per 25 Nov 2026. Perubahan dan buktinya: `CHANGELOG-v2.md`. Pertanyaan terbuka: `KEPUTUSAN-IRFAN.md`. Verifikasi video referensi: `BEDAH-REFERENSI.md`. Hasil uji skrip: `uji/HASIL-UJI.md`.

**"24 jam" = sistem produksinya yang bekerja sepanjang waktu, bukan posting nonstop.** v1 membagi satu video ke jam-jam satu hari (00:00 riset … 07:00 QC). v2 memakai **antrean bersama** yang menarik pekerjaan kapan pun mesin dan gerbang mengizinkan, untuk 5 konten/hari lintas tiga akun (§4). Upload selalu menunggu persetujuan Irfan.

---

## 1. Arsitektur lapisan

```
 Lapisan 0 · skill-development (OTAK, read-only dari sini)            ~/work/skill-development  (PC)
   motion-graphic: MOTION-CORE (tahap kanonik + gerbang pemilik), LANTAI (mutu), references/slop-catalog,
   references/delivery-spec, cookbook (kartu 95, M09–M11, 17 …), scripts/gate|juri|audio|lego,
   scripts/remotion (curves.ts, timing.ts, ae-primitives/), render.sh, frame_audit.py, sandingkan.py
   vibedesign: engine/cast/cast.js (maskot KLIK untuk uji), guide/karakter (KRK-01), guide/tipografi
        ▲ dipanggil, tidak disalin
 Lapisan 1 · Soalnya Gini Studio (KONFIGURASI + skill brand)          folder ini
   merek/soalnya-gini/  BRAND.md · EDITING.md · aset/ (font OFL, maskot slot) · contoh/bagus (golden frame)
   kit/                 tema.ts (token) · shotlist.schema.json · antrean.config.json · contoh/sg001.shotlist.json
   skills/01–07         hanya keputusan khusus merek; tiap langkah menunjuk file skill-development yang dipakai
   tools/               pembungkus + gerbang khusus merek (memanggil $MG/…; gagal keras bila gerbang induk tidak ada)
        ▲
 Lapisan 2 · Antrean bersama 5/hari (Soalnya Gini 2 · siirfan 2 · Behindwork 1)
   tools/antrean.py + kit/antrean.config.json: prioritas, batas WIP, kapasitas PC, antrean review Irfan
   akun siirfan dan Behindwork memakai motion-graphic langsung; mereka hanya berbagi antrean dan mesin
```

### 1.1 Memanggil, bukan menyalin

| Kebutuhan | v1 | v2 memanggil |
|---|---|---|
| Tahap produksi + gerbang pemilik | jam tetap satu hari | `MOTION-CORE.md` §1 + `templates/TAHAP.md` (`juri/tahap.py`) |
| Mutu teks/kamera/komposisi/audio | aturan ditulis ulang per skill | `LANTAI.md` (dibaca saat juri, revisi, sebelum render) |
| Mekanik Style A | dideskripsikan ulang | kartu cookbook **95 Cutout-Collage Metaphor** (sumbernya file yang sama: `editing.mp4` = `95-rt2rj.mp4`) |
| Mekanik Style B | dideskripsikan ulang | kartu **M09/M10/M11** (arsip, stabilo, sorot warna) + `ae-primitives/teks/HighlighterSweep.tsx` |
| Kurva/gerak | `Easing.bezier` ditulis di skill | `scripts/remotion/curves.ts` (`CURVE`, `dur`, `react`), `timing.ts` |
| Render | `npx remotion render` langsung | `juri/render.sh <proyek> still|frames|final` (kunci render global, ledger `qc/jobs.jsonl`) |
| Gerbang komposisi | tidak ada | `gate/cek_komposisi.py` (R1), `juri/motion_lint.py`, `juri/tema_cek.py`, `lego/kt_check.py` |
| Pengiriman | `run_qc.sh` cetak LUFS `|| true` | `gate/delivery_probe.py` (6 cek, exit 0/1) lewat `tools/sg_qc.sh` |
| VO | `loudnorm` satu pass LRA 7 | `gate/voice_level.py` (lewat `tools/vo_master.sh`), mix akhir `audio/loudness_2pass.sh --mix-akhir` |
| Audit visual | 6 detik tetap, skor model ≥ 8/10 | keyframe per beat vs golden (`tools/golden_cek.py`) + `juri/frame_audit.py` + `juri/sandingkan.py` |
| Slop | 4 pola teks | `references/slop-catalog.md` + `tools/slop-grep.sh` (bagian mekanis) + gerbang induk di atas |

### 1.2 Lokasi dan prasyarat mesin (diperiksa 25 Nov 2026)

- `SKILLDEV` dicari otomatis oleh `tools/_env.sh`: `~/work/skill-development` (PC) lalu `~/wonder/repos/skill-development` (Mac).
- **Salinan skill-development di PC tertinggal**: PC di commit `42a94a51`, Mac di `5e9d781`. Di PC belum ada `gate/delivery_probe.py` dan `audio/loudness_2pass.sh`, dan working tree PC punya perubahan lokal (`PENDING.md`, `RETRO.md`, `projects/behindwork-batch-1/DECISIONS.md`). `tools/sg_qc.sh` dan `vo_master.sh` akan berhenti dengan `GAGAL-ALAT` sampai PC di-pull. Uji v2 dijalankan dengan salinan baca-saja Mac `5e9d781` di `~/work/soalnya-gini-studio/_uji/skilldev-snap/`. Keputusan K-08.
- **`npx` tidak ada di PATH sesi non-interaktif PC** (node `/usr/bin/node` v18 tanpa npm). Node 22 ada di `~/.local/opt/node-v22.20.0-linux-x64/bin`. Worker otomatis wajib `export PATH="$HOME/.local/opt/node-v22.20.0-linux-x64/bin:$PATH"` sebelum `render.sh` (yang memanggil `npx remotion`).
- Python: `~/work/mg-venv/bin/python` (numpy, cv2, soundfile, scipy, faster-whisper; model small/medium sudah di cache). `jsonschema` hanya ada di python3 sistem.

## 2. Alur satu episode (tahap kanonik MOTION-CORE)

| Tahap kanonik | Skill v2 | Keluaran | Gerbang mekanis | Gerbang pemilik |
|---|---|---|---|---|
| Brief | 01 topik & fakta | `fakta.md` (F1…Fn bersumber) | slop-grep (placeholder), cek sumber ≥ 2 untuk angka | topik masuk paket mingguan |
| Naskah | 02 naskah & shotlist | `script.md`, `shotlist.json` | slop-grep, `variasi_cek.py`, `beat_frames.py cek`, skema | **Irfan setuju naskah** (paket mingguan) |
| Storyboard/block out | 03 suara, 06 (still) | `vo.wav`, `words.json`, still per beat, `STORYBOARD.md` | `vo_master.sh` (voice_level), `words_align.py --shotlist`, `render.sh still`, `golden_cek.py` | **Irfan setuju storyboard** (satu lembar sanding per episode) |
| Animate | 06 + gaya 04/05 | `remotion/src` | `tema_cek`, `motion_lint`, `cek_komposisi` | — |
| Effects & grade | 06 | — | `frame_audit.py` VERDICT semua potongan | — |
| Mix | 06 | stem + `mix.wav` | `audio_order`, `sfx_density`, `audio_phone --gate`, `loudness_2pass --mix-akhir` | — |
| Deliver | 07 QC | `render.mp4`, `qc-report.json`, lembar sanding | `render.sh final` (R1–R5), `tools/sg_qc.sh` (G0–G6) | **Irfan setuju tayang**; upload manual/terjadwal sesudahnya |

Satu episode = satu sesi produksi terpisah (MOTION-CORE §4); yang dipakai ulang antar-episode hanya `kit/`, `merek/`, dan blok netral `scripts/remotion/`.

## 3. Suara (sudah diputuskan Irfan, 25 Nov 2026)

Gemini Voice Design `gemini-3.8-flash-tts` (id-ID), dua suara rancangan di `kit/suara.json` (sg-perempuan `voice_58jatqol9qwd`, sg-laki `voice_wbxo7x53a5kc`, TTL 1 tahun), **bergantian per episode** (ganjil perempuan, genap laki; menggantikan "satu narator konsisten" di plan), tanpa anotasi style, naskah ditulis sebagai omongan lisan (±2,9 kata/dtk). Kunci API hanya di PC `~/.config/soalnya-gini/gemini.env` (600). Mastering tanpa loudnorm (`vo_master.sh --sumber tts`). Detail: skill 02 §2, skill 03, KEPUTUSAN-IRFAN D-01…D-05.

## 3a. Konsistensi visual (padanan Soul ID)

Yang tetap dan tidak dibuat ulang per episode, disimpan di `merek/soalnya-gini/`:
1. **Token** `kit/tema.ts`: satu keluarga huruf (Plus Jakarta Sans, file OFL di `aset/font/`), satu skala, satu aksen Biru Gini.
2. **Maskot** lewat slot `aset/maskot/MASKOT.json`: shotlist hanya menyebut `karakter: "maskot_utama"`; isinya bisa kardus Gini atau KLIK (cast.js, untuk uji episode 1). Tiap kemunculan wajib kata kerja + fungsi (KRK-01, dicek `beat_frames.py`).
3. **Golden frame** `contoh/bagus/golden.json`: style frame per gaya × visual_type yang disetujui Irfan (ID DECISIONS). Tanpa golden yang disetujui, `golden_cek.py` gagal (`TANPA-GOLDEN`), jadi gaya baru tidak bisa diproduksi sebelum ada acuan.
4. **Kunci adegan** yang sudah disetujui: `$MG/baseline_lock.py approve/check` untuk revisi.

## 4. Antrean bersama 5 konten/hari

### 4.1 Kapasitas PC yang terukur (25 Nov 2026)

| Ukuran | Nilai | Sumber |
|---|---|---|
| CPU / RAM / swap | 8 core · 29 GiB (±17 GiB tersedia saat diukur) · swap 7/7 GiB **penuh** | `nproc; free -g` |
| Disk | 17 GiB bebas dari 127 GiB (87 % terpakai) | `df -h ~` |
| Render 1080p (bench 17 Nov) | 0,371 dtk/frame, konkurensi 6 → 56 dtk video ≈ 10,4 mnt | `~/work/render-profile.json` |
| Ledger semua proyek | still median 20 dtk (p90 58, n=325) · draft median 76 dtk (p90 587) · frames median 583 dtk (n=11) · **final median 2248 dtk, hanya 1 dari 3 berhasil** · lego 218 dtk (1 dari 5 berhasil) | `projects/*/qc/jobs.jsonl` |
| RAM render (komposisi "Berat" 90 frame) | konkurensi 6: +1,44 GiB, 50 dtk · konkurensi 2: +1,07 GiB, 48 dtk | `analisis/skrip/ukur_ram.sh` |
| Disk render final | ±2 MB/frame di /tmp → ±3,4 GB per episode 56 dtk | komentar `render.sh` (insiden 15 Nov) |

Perkiraan per episode Remotion: kunci render berat ±20–50 mnt (frames ±10 + final 11–37), dua kali bila ada render 2. Lima konten/hari ≈ 3–7 jam kunci render per hari: muat di 24 jam, **asal render tidak gagal**. Tingkat gagal final/lego di ledger tinggi, jadi antrean menyisakan buffer 2 hari stok siap tayang. RAM komposisi bercutout PNG besar belum terukur.

### 4.2 Aturan antrean (`tools/antrean.py`, angka di `kit/antrean.config.json`)

1. **Tahap**: ide → fakta → naskah → *review_naskah* → suara → storyboard → *review_storyboard* → build → render → qc → *review_final* → *siap_unggah* → tayang (+ `tertahan`). Keluar dari tahap miring hanya `--oleh irfan`; tidak boleh melompati tahap.
2. **Selesaikan dulu, baru mulai**: pekerjaan paling hilir didahulukan; lalu akun dengan defisit stok terbesar (target stok = per_hari × 2 hari).
3. **Batas WIP**: per akun ≤ per_hari × 2 item di fakta..qc; sesi LLM paralel ≤ 2; kerja ringan (still, whisper, ffmpeg) ≤ 2; render berat = 1 (kunci global `/tmp/remotion-heavy-render.lock` yang sama dengan `render.sh`), dan hanya bila RAM tersedia ≥ 6 GiB dan disk ≥ 10 GiB (aturan disk CLAUDE.md).
4. **Stop-the-line**: bila antrean review Irfan > 10 item, tidak ada ide/fakta baru yang ditarik; mesin hanya menyelesaikan yang sudah lewat review.
5. **Review Irfan dibatch** (default, K-01): naskah sekali seminggu (7–14 naskah per akun, plan topik §5d), storyboard dan render final di dua sesi harian 08:00 dan 20:00 WITA, maks 8 item per sesi. Perkiraan beban: ±30–45 mnt/hari + ±60–90 mnt/minggu (**perkiraan, belum diuji**).

Ritme minggu (default): Senin ide+fakta Soalnya Gini 14 topik (Sonnet) → Selasa paket naskah ke Irfan → setelah setuju, mesin menarik terus: suara, storyboard, build, render. Tiap episode butuh ±2–3 hari dari setuju naskah ke siap_unggah karena dua titik review harian.

## 5. Routing model per tahap

| Tahap | Default | Eskalasi | Tanpa LLM |
|---|---|---|---|
| 01 topik + fakta | Sonnet (riset web, kutip sumber) | — | lint placeholder/sumber |
| 02 naskah + shotlist | Sonnet | Opus hanya setelah 2× gagal gerbang mekanis yang sama, atau 2× ditolak Irfan | slop-grep, variasi_cek, beat_frames cek, jsonschema |
| 03 suara | — | — | Gemini Voice Design `gemini-3.8-flash-tts` dengan suara rancangan Irfan, bergantian per episode (D-01, D-02; berbayar, `--izin-biaya`); vo_master, words_align (faster-whisper lokal) |
| 04/05 spesifikasi gaya | — (dokumen acuan) | — | — |
| 06 build Remotion | Sonnet | Opus sekali untuk membangun komponen bersama gaya A/B + port maskot (plan topik §5d: "Opus boleh untuk merancang kit dasar") | tema_cek, motion_lint, cek_komposisi, render.sh |
| 07 QC tahap 1 | — | — | sg_qc.sh (G0–G6) |
| 07 QC tahap 2 (mata) | Sonnet vision, satu penilai per potongan, dengan lembar sanding golden | Opus bila angka golden dan putusan Sonnet bertentangan, atau setelah 2× ditolak | — |
| Caption YT/FB | Sonnet | — | slop-grep |
| Penjadwalan | — | — | antrean.py |

Fable tidak dipakai (plan topik §5d).

## 6. Kebijakan platform yang mengubah rancangan (dicek 25 Nov 2026)

- **YouTube YPP, "inauthentic content"** (nama baru "repetitious content" sejak 15 Jul 2025): tidak dimonetisasi bila "similar or repetitive content with low educational value … or minimal variation across videos", "templated storylines", dan "AI-generated content made with generic or unoriginal templates giving the impression of mass production"; boleh: intro/outro sama bila isi tiap video berbeda, seri dengan format sama asal tiap video punya storyline/fokus sendiri. https://support.google.com/youtube/answer/1311392 (dibaca 25 Nov 2026). Klarifikasi 16 Jul 2026 menyebut tiga kategori, termasuk konten generik/berulang/berbasis template "whether made with AI, CGI, or templates": https://techcrunch.com/2026/07/20/youtube-clarifies-policies-around-ai-slop-and-upsetting-videos/ (sumber sekunder).
  → v2: `variasi_cek.py` (kemiripan naskah, pembuka, rotasi cap/gaya/pilar), dua gaya + rotasi, dua suara bergantian (D-02), golden frame untuk mutu bukan untuk menyamakan, topik/naskah/storyboard/final disetujui manusia.
- **YouTube konten sintetis**: wajib diungkap bila realistis (orang nyata tampak berkata/berbuat, rekaman tempat nyata buatan AI); animasi tidak realistis tidak wajib; mengkloning suara sendiri untuk VO dianggap minor. https://support.google.com/youtube/answer/14328491 (dibaca 25 Nov 2026). → v2 melarang orang foto-realistis AI di gaya B. VO memakai suara sintetis rancangan (bukan tiruan orang nyata) di atas animasi; halaman YouTube tidak memberi contoh persis kasus ini, jadi default v2 tetap mencentang pengungkapan AI (K-02).
- **Meta, konten tidak orisinal** (13 Mar 2026): konten yang diproduksi sendiri = orisinal; duplikat/sedikit edit (bingkai, caption, kecepatan) = tidak orisinal, diturunkan distribusinya, akun bisa tidak direkomendasikan dan didemonetisasi. https://about.fb.com/news/2026/03/rewarding-original-creators-on-facebook/ → file yang sama ke Reels boleh karena milik sendiri; caption ditulis ulang (plan sudah).
- **Afiliasi**: YouTube mewajibkan centang "paid promotion/branded content" untuk "branded content, sponsorships, endorsements, or other commercial relationships" https://support.google.com/youtube/answer/154235 ; YouTube Shopping affiliate Indonesia hanya untuk anggota YPP (partner Shopee, Lazada) https://blog.google/intl/id-id/products/explore-get-answers/satu-tahun-youtube-shopping-waktu-menonton-konten-belanja-melonjak-400-di-indonesia/ (5 Nov 2025); tautan di deskripsi/komentar Shorts tidak bisa diklik sejak Agustus 2023 https://support.google.com/youtube/answer/13748639 . Di Indonesia, pengungkapan iklan di media sosial bersandar pada Etika Pariwara Indonesia (swaregulasi); aturan pemerintah yang mewajibkan label afiliasi **belum ditemukan** (pencarian 25 Nov 2026). → episode afiliasi (rice cooker) tidak bisa mengandalkan tautan Shorts sebelum YPP; label "link afiliasi"/"#afiliasi" tetap dipakai (K-06).

## 7. Titik integrasi Bang Motion (menunggu analisis)

Irfan meminta Bang Motion (MIT, HTML + GSAP; fork `Siirfannih/bang-motion`, salinan `bang-motion-src/`) dianalisis untuk dikombinasikan. Analisisnya dikerjakan agen lain di `bang-motion-analisis/`; v2 tidak menilainya. Titik yang bisa terdampak, untuk diisi setelah analisis:
- **Mesin render** (tahap Animate): Remotion (`render.sh`, still = output) vs HTML+GSAP. Semua gerbang v2 yang membaca MP4/still (sg_qc G1–G6, golden_cek, frame_audit) tidak bergantung mesin; yang bergantung Remotion: `tema_cek`, `motion_lint`, `cek_komposisi`, `render.sh` (ledger G0).
- **Storyboard = still dari kode yang sama**: syarat ini harus tetap terpenuhi bila mesin lain dipakai.
- Keputusan K-09.

## 8. Yang belum teruji

- Belum ada satu pun episode Remotion nyata; komponen gaya A/B dan port maskot belum dibangun (skill 06 menjelaskan caranya).
- `tts_gemini.py` v2 hanya diuji dry-run; panggilan API nyata tidak dijalankan di uji ini (struktur request sama dengan skrip uji A/B yang berhasil 25 Nov). Mastering diuji pada 6 keluaran Gemini yang sudah ada (T10): 1 take sg-laki gagal karena puncak −0,7 dBFS (K-07).
- `golden_cek.py` diuji pada golden sintetis; ambang (luma 0,15, tepi 1,8×/0,45×, luar token 3 %) belum dikalibrasi dengan golden yang disetujui Irfan.
- RAM render komposisi bercutout PNG dan waktu sesi LLM per tahap belum terukur; angka antrean adalah default awal.
- `palette_check.py` dengan pendukung maskot NOTE (lime) kemungkinan gagal: belum diuji.
