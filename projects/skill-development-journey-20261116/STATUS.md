# STATUS · Skill Development journey (siirfan) · titik lanjut sesi baru

Diperbarui 18 Nov 2026 sore oleh Sutradara (claude2), main 3795b31. Audit sesi baru: `evaluation.md` §Audit mandiri sesi baru. Keputusan baru: D-428 (aturan sistem desain penuh, tanpa ubah piksel), D-429 (profil merek siirfan), D-430 (satu tema gelap-glow). Langkah berikutnya: `tahap.py` + §5. Riwayat putaran 1–4: `STATUS-arsip.md`.

## 0. Mulai di sini (sesi baru)
1. Ikuti `~/work/skill-development/AGENTS.md` §Awal sesi: `git pull` main, `CLAUDE_CONFIG_DIR=~/.claude-2 ./tools/doctor.sh`. Bila doctor GAGAL hanya karena "PETA.md basi" akibat folder lokal `projects/uji-builder-trap-12nov/` milik sesi lain, itu bukan masalah repo. Setelah `tools/peta.py`, hapus baris itu dari PETA.md sebelum commit.
2. Rute: **Revisi dari Irfan** (PETA). Baca utuh: `claude/motion-graphic/references/revision-log.md`, `LANTAI.md`, `pustaka/README.md` §Juri, `pustaka/contoh-gagal/README.md` (09–11 dari video ini), `guide/visual/GUIDE.md` + `guide/teks/GUIDE.md` §Cara memutuskan.
3. Di folder ini, baca: `DECISIONS.md` **D-401…D-427** (putaran 4–5), `RESEP.md` (arah putaran 5), `evaluation.md` §Putaran 5 + §QC Sutradara R5, `handoff/TASK-R5-visual.md`, `handoff/TASK-R5b-visual.md`, `handoff/REPORT-R5-visual.md`.
4. Lanjutkan dari §5 "Langkah berikutnya" dan `TAHAP.md` (`python3 claude/motion-graphic/scripts/juri/tahap.py projects/skill-development-journey-20261116`). Jangan bangun ulang dari nol (D-425).

## 1. Proyek
- **Video:** talking head Irfan, "di balik skill-development" (workflow AI sebagai pengambil keputusan editing), akun personal siirfan. 16:9 1920×1080, 29,97 fps, **2512 frame = 83,817 dtk**. **Hanya versi A** (Irfan: "kita pakai versi A only").
- **Suara terkunci:** `edit/suara.wav` + `edit/words.json` (cut map terkunci). Jangan dipotong ulang. Suara ×1,0, tanpa limiter/kompresor (audio.md §14.6; limiter hanya untuk musik/SFX).
- **Pipeline lego:** `lego/teks.py` → `teks.json`; `lego/bangun.py` → `lego/lapisan.json`, `lapisan_opaque.json`, `lego.json`, `objects.json`; lapisan dirender `scripts/lego/lapisan.py` + `lego/lapisan_opaque.py` (cache `lego/cache/`, kunci = stamp bundle); dirakit `scripts/lego/compose.py` → `qc/master_gambar.mp4`. Waktu potong/wipe: `lego/waktu.py` (POTONG, WIPE, SLOT_T).
- **Bundle entry:** `src/video/index.ts` (file `remotion/.entry`; `render.sh` membacanya). Jangan bundle `src/index.ts` (komposisi uji; stamp cache rusak).
- **Remotion:** `remotion/src/video/` (b1…b7, `bersama/`). Font: Poppins/Anton (KT wajah), SF Pro Display Medium/Bold (UI putaran 5; `remotion/public/fonts/sfpro-display-*.otf`, sumber `~/fonts-lokal/sf-pro-display/`, berlisensi lokal, jangan di-commit).
- **Blender (adegan meja 100%):** `lego/blender/scene.py` (+ `run_full.sh`, `render_full.py`, `verify_full.py`), file `/mnt/storage-projects/skill-dev-journey/b10a/b10a.blend`, binari `/dev/shm/b10a-blender-5.2-runtime/blender` (tmpfs; hilang bila PC reboot). Keluaran slot `/mnt/storage-projects/skill-dev-journey/b10a/out/b10a.mov` (versi 17 Nov, Claude masih menatap kamera).
- **Gerbang** (log contoh `qc/r5/log/`): `cek_master --ulang`, `lego/cek_sinkron.py`, `lego/cek_tumpuk.py`, `kt_check.py --w 1920 --h 1080`, `motion_lint`, `tsc`, `revisi_cek.py cek` (cakupan `qc/cakupan-revisi.json`, basis `d12fd9b`, `qc/revisi.json`), `scripts/lego/base_pts.py lego/lego.json`. Perintah persis: `handoff/REPORT-R4-visual.md`.
- **Audio:** `audio/sfx_build.py` (peran → file SFX), `audio/music_build.py` (mix_A), kunci `audio/order-A/ORDER.json` (`audio_order.py lock visual|sfx|musik`, `check`). Render memakai `VARIAN=A`.
- **Render final:** `ENTRY=src/video/index.ts VARIAN=A claude/motion-graphic/scripts/juri/render.sh <proyek> lego lego/lego_final_A2.json`. Salin `lego/lego.json` → `lego_final_A2.json` dengan `audio='../audio/mix_A.wav'` dan `keluar='../out/varian-A_r4-final-2.mp4'`. Gerbang render.sh: revisi_cek, audio check, resep, motion_lint, still/sanding/JURI (`qc/stills/`, `qc/sanding.jpg`, `qc/JURI.md` berakhir `PUTUSAN: LULUS` dan menyebut semua D-/R- Aktif), draft (`qc/draft.mp4`), audit frame (`qc/frame_audit/*/VERDICT.md` dengan HASH), base_pts + cek_master.
- **Drive:** remote rclone `gdrive:`, folder "Claude edit/2026-11-16 — Siirfan — Di Balik Skill Development/". Unggah dengan `rclone copy`, **tanpa** `rclone link`/tautan publik.

## 2. Hitungan render final (D-407, D-423)
- Final 1: `out/varian-A_r4-final-1.mp4`, sudah di Drive. Kesalahan terlewat K1 (tulisan tangan "Comment di bawah." bersamaan dengan "Nanti") dicatat di `evaluation.md`.
- Sisa **2 render final** untuk arah baru: `varian-A_r4-final-2.mp4` lalu `-final-3.mp4`. Final 3 hanya bila final 2 ternyata punya kesalahan terlewat (catat apa + kenapa QC meloloskannya). Jangan mengarang kesalahan.

## 3. Arah putaran 5 (ledger D-414…D-427; ringkas, verbatim di DECISIONS.md)
- **D-415/D-425:** arah premium Apple-style. Pengikat kartu **07 Baikov**; punch-in/ketik dari **49 Krea**; UI gaya **63 invideo**; IG gaya **65**; bagian tertentu **02 Dimensi** dengan palet premium. Kartu **83** hanya bentuk KT. Ini **PERBAIKAN, bukan bangun ulang**: hanya adegan UI/layar penuh dan tokoh yang belum premium. KT di atas wajah (slab, cincin, label, narasi, huruf Poppins/Anton) **tidak diubah** (keputusan Sutradara sudah disampaikan ke Irfan, belum dibantah).
- **D-426:** keluarga UI **gelap-glow**: hitam #05060A–#0C090D + glow merek (Claude oranye #E4550F), jendela app gelap, muncul dengan **glitch/mosaik piksel**. Narasi di adegan UI putih. IG tetap terang (UI IG asli).
- **D-417:** bubble perkenalan dengan watak: Claude bete "Aku yang ngedit loh.", ChatGPT senang "Hi! Aku nemenin Claude.", Gemini diam "…".
- **D-418:** tokoh pixel tetap (dihaluskan + emosi); papan voxel/pixel B11 → desktop app asli gaya invideo.
- **D-414 / D-419:** tulisan tangan + panah IG dihapus; panah goresan B11 dihapus.
- **D-420:** adegan 100%: Claude menghadap monitor, setengah terlihat, kamera fokus ke wajah Irfan di timeline + zoom pelan.
- **D-416/D-421:** tiap adegan yang disentuh punya satu emosi lewat satu gerak + bunyi (tabel bedah di `evaluation.md` §Putaran 5).
- **D-424:** musik dipilih ulang ke rasa premium (house/tech ringan ala 07, stop-down sebelum momen besar) dengan `music_fit.py`.
- **D-427:** dua PENDING dijawab "Ya" dan sudah masuk skill (`metafora.gerak_pembawa` wajib; `render.sh` ENTRY + VARIAN).

## 4. Kondisi kerja saat dihentikan
**Master terverifikasi terakhir:** `qc/master_gambar.mp4` (18 Nov 12:08) = R5 ronde 2. Gerbang PASS (cek_master 106 lapisan, cek_sinkron, cek_tumpuk 0, kt_check, motion_lint, tsc, revisi_cek, base_pts).

| Adegan (TASK-R5) | Rentang | Status | Bukti |
|---|---|---|---|
| A · repo "selesai" | 2,1–4,3 | **DITERIMA** (gelap-glow, timeline, "selesai." + centang, Clawd proud) | `qc/r5/f75,f110,f125.png` |
| B · app Claude, cara kerja dibalik | 23,59–36,32 (f707–1089) | **DITERIMA**, kecuali narasi 33,3–36,3 menimpa tepi jendela/placeholder (f1035–1060) | `qc/r5/sheet_B2.png` |
| C · bubble watak | 8,3–12,3 | **DITERIMA** | `qc/r5/f290,f320,f345.png` |
| G · kartu angka 20×/5× | 45,3–53,8 | **DITERIMA** | `qc/r5/f1500.png` |
| D · desktop agen (B7) | 57,6–72,2 | **BELUM di master**. Pekerja R5b sedang membangun `remotion/src/video/b7.tsx` (tiga jendela gelap ChatGPT A / Claude / ChatGPT B + panel dok skill-development, avatar pixel); still komponen di `qc/r5b/D_*.png` menjanjikan, tapi belum dirakit, belum diaudit; panah goresan putih masih ada di master | `qc/r5b/D_*.png` |
| E · meja 100% Blender | 72,2–76,4 | **BELUM**. `lego/blender/scene.py` sudah diedit pekerja R5b, render penuh dihentikan di tengah. `b10a.mov` masih versi lama | — |
| F · IG | 76,5–83,8 | **SEBAGIAN**: tulisan tangan hilang, latar #ECECEC, "Udah" di dalam video. GAGAL: "profesional" (f2360) dan "skill" (f2470) di pita hitam; "Comment" (f2428) di bawah kartu menyentuh batas bawah | `qc/r5/f2310…f2470.png` |

**Perubahan belum diverifikasi (pekerja R5b dihentikan di tengah, 12:15–12:40):** `lego/bangun.py`, `lego/teks.py`, `lego/blender/scene.py`, `remotion/src/video/{Root.tsx,b3.tsx,b6.tsx,b7.tsx}`, plus turunan `lego/*.json`, `teks.json`, `objects.json`, cache lapisan baru. Master **belum** dirakit ulang dari perubahan ini. Langkah pertama sesi baru: baca `git diff` file itu (dibanding commit WIP STATUS ini), jalankan pipeline, nilai hasilnya. Commit `f19fcf1` berisi R5 ronde 1–2 (A/B/C/G diterima) DAN perubahan R5b yang belum diverifikasi sekaligus; versi sebelum putaran 5 = `6444ad4`. Bila perubahan R5b merusak A/B/C/G, perbaiki di tempat (bukan pulihkan ke 6444ad4, karena itu membuang A/B/C/G); acuan visual A/B/C/G = `qc/master_gambar.mp4` 18 Nov 12:08 + still `qc/r5/`.

**Audio:** dihentikan sebelum relock. `audio/order-A` masih kunci putaran 4 (visual lama). Semua langkah audio harus diulang setelah visual selesai.

## 5. Langkah berikutnya (urut)
Selesai 18 Nov sore (evaluation §Putaran 5c): D satu sesi Claude, latar A/B polos, E Blender D-437, F + "habis banget", kt_ocr. Draft suara-saja di Drive `draft-r5c/`, menunggu tanggapan Irfan.
0. **Tanggapan Irfan atas draft R5c** → rute Revisi bila ada koreksi.
0b. **Refactor token b1–b6** (D-428): pekerja Codex baru, identik piksel A/B(kecuali latar)/C/G; `tema_cek` LULUS (gerbang render.sh aktif karena tema.ts sudah ber-MEREK).
1. (Visual R5b) selesai kecuali refactor di atas.
2. **QC Sutradara** tiap still resolusi penuh di atas footage (5 cek: massa kiri-kanan, satu fokus, urutan baca, satu permukaan, ruang dekat subjek + sekeluarga dengan kiblat) dan strip transisi masuk/keluar tiap adegan yang diubah. Bandingkan dengan frame kunci 07/49/63/65 dan contoh gagal 09–11. Catat di `evaluation.md`.
3. **Audit frame semua detik** (penilai satu: Sutradara, `templates/roles/pemeriksa-frame.md`, `frame_audit.py`) → `qc/frame_audit/*/VERDICT.md` dengan HASH.
4. **Audio** (pekerja audio, `handoff/TASK-R4-audio.md` sebagai pola):
   - `audio_order.py lock visual` (order-A) atas master baru.
   - SFX: hapus peran `coretan` (tulisan tangan/panah sudah dihapus). Tambah bunyi per tokoh sesuai watak di bubble (Claude gerutu pendek, ChatGPT bloop riang, Gemini kilau sangat tipis; satu peran satu file), mosaik glitch, pesan kirim/terima di D, centang/loop, pop komentar IG. Lalu `sfx_density` PASS, `lock sfx`.
   - **Musik baru (D-424):** kandidat ≥ 8 dari ≥ 2 sumber, `music_fit.py`, per babak, stop-down sebelum momen besar. Perbarui `musik/KREDIT.md`. `music_build.py`: suara ×1,0, puncak ≤ −1 dBFS hanya lewat stem musik/SFX. `lock musik`, `check` PASS.
   - Uji HP (`audio_phone.py`), lalu `frame_audit.py --fase audio`.
5. **Still/sanding/JURI/draft** baru (`qc/stills/` dari master, `sandingkan.py` vs keyframe 07/63/65, `qc/JURI.md` per still + semua D-414…D-427 + `PUTUSAN: LULUS`, `qc/draft.mp4`).
6. **Render final 2** (perintah di §1), verifikasi (2512 frame, lag audio 0, PSNR vs master), `rclone copy` ke folder Drive, tinjau pasca-render, update `evaluation.md` + STATUS, commit/push (footer `Agent: Claude` + Co-Authored-By).

## 6. Jebakan yang sudah ketemu
- `render.sh still` tanpa entry yang benar membangun bundle `src/index.ts`. Sekarang ditangani `remotion/.entry` + `qc/.bundle_entry`.
- Klip dasar 1 frame menggandakan pts sehingga lip-sync telat 1–2 f. compose menolak klip < 2 f; `base_pts.py` dan `cek_master.py` menjaga ini.
- Teks jangan menyeberang potongan adegan; satu blok narasi per waktu; keluar = potongan, bukan pudar (kartu 83 Catatan pakai).
- `rclone link` ditolak classifier. Cukup `rclone copy`.
- `git add` folder proyek ikut menyeret file besar tak ter-track (frame/video). Pakai `git add -u` + file spesifik.
- Disk ±6,7 GB bebas (95 %). Bersihkan cache/frames lama sebelum render besar.
- Proses Blender lewat `xvfb-run`. Pastikan tidak ada render yatim sebelum mulai (`pgrep -af b10a`).
- Fokus proyek sendiri: jangan menyentuh `projects/jensen-pain-suffering`, `.gitignore`, atau proyek lain.
