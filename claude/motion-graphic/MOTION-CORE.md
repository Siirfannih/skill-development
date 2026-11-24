> **Invarian kerja** (berlaku di atas isi lain di file ini; ringkasannya menjaga penalaran mekanikal dan gerbang mutu):
> 1. **Cookbook = perpustakaan mekanik, bukan template.** Konsep user + 2–4 kartu mekanik cookbook = output baru. Jangan membuat template gaya tetap atau menyalin gaya antar proyek.
> 2. **Promosi aturan hanya lewat `SARINGAN.md`** (S = proyek, P = pertimbangan, H = hukum netral-gaya terukur). Selera satu proyek tidak naik ke aturan global.
> 3. **Gerbang pemilik tidak dilewati.** Konsep/topik, naskah final, serta storyboard + tabel racikan cookbook disetujui pemilik sebelum produksi atau pemakaian kredit.
> 4. **Gerbang mekanis Kelas H tidak dilewati atau diedit selama sesi produksi video:** `render.sh final`, `gerbang_produksi.sh`, `scripts/gate/*`.
> 5. **Baca dulu, jangan menebak.** Bahan sumber dan outbox/proyek terkait dibaca sebelum menyimpulkan atau memberi perintah.

# MOTION-CORE: pintu masuk sesi produksi video

Sesi produksi memuat **file ini**, lalu `projects/<proyek>/` (`DECISIONS.md`, `RESEP.md`, `TAHAP.md`). Tidak dimuat di awal sesi: `PETA.md`, `RETRO.md`, `SUMBER.md`, `cookbook/INDEX.md` utuh. `references/` dan `guide/` dibuka saat langkah atau pesan gagal gerbang menyebut bagiannya. Rute lengkap dan Lantai utuh: `SKILL.md`.

Urutan menang: instruksi user → `DECISIONS.md` dan `RESEP.md` proyek → profil merek (`BRAND.md`, `EDITING.md`) → kartu terpilih → file ini. Lantai tidak dikalahkan kartu; pengecualian hanya atas instruksi user, dicatat di `RESEP.md`.

## 1. Alur: tiga gerbang pemilik, lalu dua langkah

**Gerbang 1–3** (`../irfan-creative-workflow/SKILL.md` §2): bedah bahan user dan konsep → naskah final → storyboard, masing-masing disetujui user. Belum ada kode, generate, atau pemakaian kredit sebelum gerbang 3 lolos.

**Tanya sebelum meracik (wajib bila brief belum mengunci arah visual):** bila brief user belum menetapkan (a) porsi mode visual (B-roll vs diagram/explainer motion graphic vs metafora cutout vs UI nyata), (b) karakter pacing dan transisi, atau (c) referensi gaya target, **berhenti dan ajukan 3–5 pertanyaan konkret dulu** sebelum menulis racikan atau kode.

**Keragaman mode visual & aset baru:** video > 45 dtk tidak boleh hanya berisi `[zoom B-roll + KT]` bergantian dengan `[kartu teks polos]`. Padukan minimal 2–3 mode visual sesuai fungsi cerita (rekaman/arsip, diagram/isometrik explainer, metafora cutout, UI nyata); bila aset visual metafora/diagram tidak ada di stok foto, buat atau generate aset baru (komponen SVG/Remotion, cutout transparan, gambar AI, atau render 3D). Untuk transisi grid di kartu 14, gunakan `scripts/remotion/FlashGrid.tsx` (kilatan petak acak 5–6 frame), bukan wipe diagonal lambat.

**Langkah 1 · Racik mekanik** (di gerbang storyboard; rinci: `cookbook/README.md` §2):

1. Tulis fungsi cerita tiap beat.
2. Cari kartu per beat, dari `claude/motion-graphic/scripts/`:
   `python3 cookbook/pilih_kartu.py --cari "<kata kunci fungsi cerita>" [--kategori camera|typography|layout|texture|sfx|script] [--bergerak] [--limit 4]`
   Keluaran: `ID | Nama | Bergerak/Diukur | Path kartu | Keyframes`. Kartu `bergerak:tidak` dibaca dari still: hipotesis.
3. Buka **hanya 2–4 kartu** untuk seluruh video, beserta frame kuncinya. Yang diambil mekaniknya (gerak, ritme, hierarki teks, bunyi); warna, huruf, aset, dan tema tetap milik user.
4. Tulis tabel racikan dan remix per beat, minta persetujuan user, lalu salin ke `RESEP.md` proyek dan storyboard:

   | Beat | Fungsi cerita | Pola (ID.Tn) | Remix: dipertahankan → diganti | SFX |
   |---|---|---|---|---|

**Langkah 2 · Bangun Remotion dari nol.** Kode ditulis baru dari tabel itu (Mekanik Remotion kartu, `scripts/remotion/curves.ts`), dengan gaya user dan waktu dari audio video ini. Selesai hanya bila `render.sh final` lulus, termasuk `gerbang_produksi.sh` (§3).

## 2. Lantai: 10 aturan yang tidak ditawar

Kode dalam kurung = butir `LANTAI.md` (bunyi lengkap).

| # | Invarian | Cara cek |
|---|---|---|
| 1 | **Satu lapisan teks.** Ucapan tampil sebagai tipografi kinetik; tidak ada pita subtitle terpisah saat KT tampil (A1). | tanda `PITA` nol |
| 2 | **Teks tidak menutup wajah, tidak keluar zona aman, dan dekat subjeknya** (≤ ±8 % tinggi frame) (A2, C16). | tanda `WAJAH`, `TEPI`, `JAUH` nol |
| 3 | **Terbaca di HP.** Kontras ≥ 4,5 : 1, kata sambung ≥ 56 px @1080, 1–3 kata per tampil, maks 2 baris, tidak di atas logo atau area ramai (A4, A7, A9). | still 360 px; `scripts/lego/kt_check.py` |
| 4 | **Teks hanya dari ucapan; satu kata tidak tampil dua kali** sekaligus (A3, A5). | KT dibandingkan tabel kata VO |
| 5 | **Satu fokus per momen**; yang sedang bicara tampil di frame (C14, D21). | still per beat |
| 6 | **Tidak ada pergantian malas.** Nol crossfade; gerak memakai `scripts/remotion/curves.ts`; hold > 1 dtk tetap hidup (B13, B13a). | `scripts/juri/motion_lint.py` PASS |
| 7 | **Tidak ada layar kosong atau placeholder.** Frame 0 berisi visual dan bunyi; setelah potong, isi tampil ≤ 0,3 dtk (D22, D22c). | tanda `JEDA` nol; frame tahan tiap detik |
| 8 | **Suara utuh.** Tidak dipercepat, fonem tidak digunting, level suara asli tidak diturunkan (E23). | `gate/cut_check.py`, `gate/voice_level.py` PASS |
| 9 | **Bunyi punya alasan, alami, dan nyaman.** 1 SFX = 1 gerakan/objek (`objects.json`, prioritas `~/sfx/SFXIrfan`); SFX dimulai di level alami (`0 dB` dasar) dan baru diturunkan bila mengalahkan VO, bukan tenggelam di bawah musik keras; ujung SFX di jeda sunyi atau fade 150–300 ms; nol SFX harsh; musik sejak frame 0 sebagai bed di bawah VO (E24, E25, E25a). | `gate/sfx_density.py` PASS; gerbang 3–4 di §3 |
| 10 | **Visual lulus dulu, audio sesudahnya, render penuh paling akhir.** Revisi hanya mengubah atribut yang diminta (F26, F27). | `scripts/juri/revisi_cek.py cek` |

Yang tidak dijawab brief, proyek, profil merek, maupun kartu: tanya user, spesifik (F28).

## 3. Gerbang wajib sebelum render final

Dari `claude/motion-graphic/scripts/`, berurutan (Python audio: venv ber-numpy, soundfile, scipy).

| Urut | Perintah | Lulus bila |
|---|---|---|
| 1 | `python3 gate/cek_komposisi.py <episode.json> --public <proyek>/remotion/public` | keluar 0; **sebelum build** |
| 2 | `python3 gate/audio_order.py check --dir <proyek>/audio` | keluar 0 |
| 3 | `python3 audio/sfx_potong.py --laporan <proyek>/audio/sfx_potong.json` | keluar 0 |
| 4 | `python3 audio/audio_phone.py --root <folder stem> --gate` | keluar 0: SFX harsh 0, median VO clarity ≥ 8 dB |
| 5 | `bash juri/render.sh <proyek> final <Comp> <keluaran.mp4>` (berfootage: `lego lego/lego.json`) | keluar 0; mengulang gerbang 1–4 (`gerbang_produksi.sh`) + juri |

Gerbang 1 selalu memblokir empat tanda netral gaya: `WAJAH`, `INSET`, `TEPI`, `ASET`. Tanda lain (`JEDA`, `KARTU`, `PITA`, `LOGO`, …) hanya peringatan, kecuali proyek memilih ketat: flag `--ketat`, atau file `projects/<proyek>/qc/ketat` (kosong = semua tanda memblokir; berisi nama tanda = tanda itu ikut memblokir). Itu keputusan proyek (`DECISIONS.md`), bukan bawaan gaya.

File proyek yang menyalakan gerbang 1, 3, 4 di `render.sh` (ada dan gagal = render ditolak): data episode `remotion/src/data/*.json` + `remotion/public/<aset>/aset.json`; `audio/sfx_potong.json`; `stem_vo.wav`, `stem_music.wav`, `stem_sfx.wav`, `mix.wav`, `cues.json` di `audio/` atau `qc/`.

Gerbang yang gagal diperbaiki pada penyebabnya, lalu dijalankan ulang; keluaran terakhirnya disalin ke `TAHAP.md` sebagai bukti.

## 4. Batas kerja (alasan dan penjagaannya)

- **Jangan melewati `render.sh final`** (atau `lego`), termasuk karena tenggat: tidak ada `npx remotion render` langsung, tidak ada video dikirim tanpa `render.sh final` PASS. Tenggat tidak terkejar = kirim laporan gerbang yang belum lulus.
- **Jangan mengedit `scripts/gate/*` atau `scripts/juri/*` di sesi produksi video**, termasuk menyalinnya ke proyek lalu mengubahnya. Gerbang yang dianggap salah dilaporkan ke user, diperbaiki di sesi perubahan skill.
- Jangan mematikan gerbang dengan menghapus atau mengganti nama file pemicunya (`qc/ketat`, `aset.json`, `sfx_potong.json`, stem).
- **Satu video = satu sesi terpisah.** Satu sesi produksi hanya mengerjakan satu episode dan tidak menyalin `RESEP.md`, racikan, atau kode adegan dari episode lain (termasuk dalam batch yang sama); yang dipakai ulang hanya blok netral `scripts/remotion/`.
- Dilarang menambah elemen di luar tabel racikan, storyboard, dan brief.
