# DESAIN · Sutradara (claude2) · 16 Nov ±22:30 · satu-satunya sumber visual untuk build

Disetujui Irfan: MENU (semua opsi A) + perubahan B1 (DECISIONS 16 Nov ±22:20). Yang tidak tertulis di sini tidak dibangun. Rancangan lama (K-01…K-13, papan r1–r3, Opus) hanya **bahan kode** yang boleh dipakai ulang bila sesuai file ini; desainnya tidak mengikat.

## 0. Global
- 1920×1080, 30000/1001 fps, durasi = `edit/suara.wav` (kandidat 1:24,15; waktu kata SELALU diambil dari `edit/words.json` terbaru, bukan dari angka di file ini — angka di sini perkiraan).
- **Lego (Lantai F26):** footage + gerak kamera footage dikerjakan ffmpeg; teks/KT, karakter, UI dirender sebagai lapisan ber-alpha seukuran kotaknya dan di-cache (`scripts/lego/lapisan.py`), dirakit sekali `render.sh <proyek> lego lego/lego.json`. Adegan layar penuh (B1 dunia repo, B3a/B3b UI, B5b) = lapisan penuh. Wajah dalam lingkaran = footage di-crop/mask oleh compose atau lapisan; pilih yang sesuai alat, catat di REPORT.
- **Matte pembicara** seluruh durasi `edit/wajah.mp4` dengan Robust Video Matting (sudah dipakai di `remotion/src/papan/matte.py`), simpan sebagai video grayscale lossless (bukan ribuan PNG; disk ±6 GB). Dipakai untuk kata/slab di belakang kepala.
- **Gerak:** semua keyframe + kurva `src/lib/curves.ts` (`land` masuk, `leave` keluar, `heavy` kamera/objek besar, `whip` ganti keadaan, `drift` hold, `react(i)` reaksi berjeda); tidak ada linear/fade-up bawaan (Lantai B13a, `motion_lint.py`). Tiap shot > 2 dtk bergerak; satu fokus per momen.
- **Transisi khas (satu, berulang):** push-through kamera + motion blur (kartu 83) setiap pindah wajah ↔ dunia layar penuh.
- **Huruf:** Anton (kata hero/slab), Poppins 700 (cincin kata & KT), Inter (UI), JetBrains Mono (kode). Teks di footage: putih hangat `#FAF8EC` + bayangan lembut, **tanpa stroke/garis tepi tebal**. Kontras ≥ 4,5 diukur di still.
- **Warna berarti:** coral `#F97066` = negatif (AI slop); biru hanya di permukaan terang; hijau `#1A7F37` = terverifikasi/selesai.
- **Teks kinetik (Lantai A1/A9a):** SEMUA ucapan tampil dalam satu lapisan KT editorial; `teks.json` dari `scripts/lego/teks_plan.py`, peran per blok: R1 narasi (kata kecil 1–3 kata menempel subjek, ≤ 8 % jarak), R2 kata kunci, R6 hero (slab/kata besar yang ditulis di bawah). Kata yang sedang jadi hero tidak tampil dua kali. `kt_check.py teks.json` PASS.
- **Karakter (masukan Irfan):** ikon asli 2D gaya ClaudeAnimationBase — pakai `remotion/src/papan/karakter2d/` (Clawd crab merah, Codex bunga biru `>_`, Gemini bintang) + sistem gerak `claude/motion-graphic/pustaka/teknik/animasi-karakter-clawd.md` (5 sudut kunci + smear, kedip 3,67 dtk, emosi dengan antisipasi + overshoot + take, lompat dengan squash). Di kamar: bayangan lembut ke dinding/bahu, sedikit warna cahaya kamar, tidak menutupi wajah (zona wajah x 36–64 %, y 8–62 %). Ukuran 15–20 % tinggi frame. Mereka hidup: selalu idle bernapas, melirik Irfan, bereaksi ke ucapannya.

## 1. Per beat
### B1 · 0,0–4,5 · "Oke, finally akhirnya proyek ini selesai juga."
- 0,0: wajah penuh. Tiga karakter SUDAH ada, melayang di sekeliling Irfan: Clawd kiri bawah dekat bahu (x ±24 %, y ±64 %), Codex kanan atas bahu (x ±74 %, y ±34 %), Gemini kanan atas kepala (x ±66 %, y ±12 %). Idle, menatap Irfan. Kamera drift 1,00→1,02.
- "finally": punch-in kamera 1,00→1,12 (`heavy`, 8 f) ke wajah; ketiga karakter "take" kaget→senang bergiliran `react(i)` + lompat kecil; kata hero **FINALLY** (Anton, tinggi huruf ±20 % frame, putih hangat) di ruang kosong kiri (area pintu biru gelap, x 6–34 %, y 28–52 %) — Clawd bergeser memberi ruang.
- "akhirnya proyek ini": **dunia baru.** Wajah menyusut menjadi lingkaran kanan bawah (diameter ±380 px, pusat x 1650 y 850, tepi putih tipis + bayangan), `heavy` 18 f, ketiga karakter ikut "terbang" masuk ke dunia baru. Latar = halaman repo GitHub `Siirfannih/skill-development` asli (kode K-01: data git asli, tema terang) dimiringkan sedikit dalam perspektif (rotateX ±10°) seperti lantai/dunia; di atas area daftar file berdiri **panel timeline editor** bersih (gaya aplikasi edit modern: track video + audio, playhead, 4–5 klip warna lembut) tempat **Clawd sedang mengedit**: ia menarik klip terakhir masuk ke celah, menekan, playhead berjalan. Codex dan Gemini melayang dekat lingkaran wajah, menonton.
- "selesai": klip terakhir terkunci, playhead tiba di ujung → baris commit terakhir repo berubah jadi centang hijau `#1A7F37` (pop + cincin), Clawd melompat senang; kata "selesai" R2 menempel di centang. Kamera push pelan ke Clawd lalu ke centang (`heavy`).
- "juga" → B1b.

### B1b · 4,5–14,5 · "aku baru aja ngebikin workflow … entah itu ChatGPT, Claude, Gemini, itu bisa ngebuat sebuah decision dalam ngebuat video"
- Transisi khas kembali ke wajah penuh (lingkaran membesar, karakter keluar dari dunia repo kembali melayang di kamar, posisi seperti B1 awal).
- Cincin kata BESAR di busur sekitar kepala (Poppins 700, tinggi huruf ±9–11 % frame, mengikuti busur, bagian belakang lewat di belakang kepala dengan matte): "workflow" (R6) lalu "AI model" lalu "decision" (R6); kata narasi lain R1 kecil di dada.
- Saat namanya diucapkan: "ChatGPT" → Codex maju + lambai (take); "Claude" → Clawd lompat; "Gemini" → bintang berputar + kilau. Masing-masing membesar sesaat 1,0→1,08→1,0.
- "decision": ketiganya menoleh ke Irfan bersamaan dengan jeda `react(i)`; kamera push pelan 1,00→1,06.

### B2a · 14,5–21,4 · "… viral banget soal ngedit video pake AI. Tapi … hasilnya masih terasa AI slop."
- Karakter terbang keluar frame (`leave`, bergiliran) sebelum "viral".
- **AI slop digambarkan:** sejak "viral", tumpukan desain murahan menumpuk menutupi kamar satu per satu (bergaya parodi, sengaja norak tapi tetap terbaca): teks "VIRAL!!" berbayang tebal, gradien ungu-pink, emoji api/kaget, panah merah, glow, lens flare, stiker "WOW", border neon — makin ramai di tiap frasa. Wajah tetap terlihat di tengah.
- "slop": semua tumpukan berhenti miring (freeze 2 f), ruang di-grade −15 %, **AI SLOP** slab coral Anton (±45 % tinggi frame) berdiri di belakang kepala (matte), guncangan kecil ≤ 12 px 6 f meluruh.

### B2b · 21,4–23,8 · "Dan ya beberapa bagian masih putus-putus."
- Tumpukan slop retak lalu runtuh **tersendat** (gerak patah: tahan 3–4 f, lompat, tahan) keluar bawah frame; slab memudar keluar dengan `leave`. "putus-putus" R2: suku kata muncul terputus satu per satu (jeda tak rata).

### B3a · 23,8–31,0 · "Dan ini bukan sebuah template … edit kayak Apple style, edit kayak Cinematic Storytelling"
- Transisi khas → layar penuh **aplikasi Claude (Claude Code) asli, tema terang**: sidebar kiri (daftar sesi, abu muda), area chat putih dengan satu jawaban teks biasa, kolom ketik di bawah (border abu, tombol +, kirim), status bawah "Opus" kecil. Acuan tampilan: screenshot Irfan 16 Nov (`sumber/ref/claude-code-slash-irfan.png`). Tanpa panel kaca, tanpa tema gelap karangan.
- "template": kursor mengetik "/" di kolom ketik → daftar perintah muncul **di atas kolom ketik** (kartu putih, bayangan lembut, item teks hitam satu baris per item, item terpilih berlatar abu muda). Item muncul saat diucapkan: `/apple-style` di "Apple style", `/cinematic-storytelling` di "Cinematic Storytelling".
- Wajah Irfan dalam lingkaran kanan bawah (sama seperti B1). Kamera push pelan ke daftar.

### B3b · 31,0–38,4 · "Nah, aku ngebalik. Progress di baliknya. Gimana caranya biar AI ini cuman mempelajari workflow-nya."
- "ngebalik": item daftar terhapus satu per satu (`leave`), daftar menyusut kosong → "/" tidak memanggil apa pun (kolom ketik hanya "/" berkedip). Tahan 0,6 dtk.
- Transisi khas kembali ke wajah penuh; "workflow" R6 slab putih hangat Anton di belakang kepala (matte), huruf bergelombang lalu tenang (rima dengan B1b).

### B4a · 38,4–44,0 · "… kenapa aku gak langsung publish dan open source. Karena perlu balik modal, Pak."
- Sama dengan papan Opus B4 yang disetujui: zoom pelan ke wajah; "balik modal": **BALIK MODAL** slab putih hangat di belakang kepala (matte), bergelombang lalu tenang.

### B4b · 44,0–53,5 · "Ini abis banget … ChatGPT Pro Max yang 20 kali sama Claude Pro yang 5 kali. Hanya untuk uji coba sistem ini."
- Kartu paket versi papan Opus B4: kartu ChatGPT (logo asli, "Pro", **20x**) mendarat di sisi bahu kosong tepat di "20 kali", angka naik 1→20 setelah mendarat; kartu Claude ("Max", **5x**) di "5 kali". Tanpa stroke, bayangan lembut, miring 3D halus.

### B5a · 53,5–59,0 · "Dan bahkan sistem workflow ini memungkinkan sistem kerja lintas agent. Kayak yang kalian lihat ini."
- Wajah; "kayak yang kalian lihat ini": transisi khas menembus ke B5b.

### B5b · 59,0–72,2 · "ChatGPT bisa koordinasi ke Claude. Claude bisa … sebaliknya. … session berbeda … meminimalisir kesalahan yang sama … loop pembelajaran"
- **Komposisi papan r1 yang Irfan setujui** (`handoff/henti1/sanding.jpg` baris B5): latar terang r1, dua jendela asli (kiri Claude Code terang, kanan ChatGPT/Codex terang) berdiri berdampingan; karakter 2D Clawd di depan jendela kiri, Codex di depan jendela kanan. Tanpa judul, tanpa panah/garis biru.
- Pesan ASLI pop-up berurutan sesuai ucapan (`handoff/PAHAM-SKILL-DEV.md` §D Adegan 1): "ChatGPT … koordinasi ke Claude" → di jendela ChatGPT muncul pesan Codex "doctor.sh gagal: 8 skill berupa salinan, bukan symlink. Boleh menjalankan --fix?", amplop terbang dari Codex ke Clawd (busur `land`), Codex lompat (antisipasi squash), Clawd kaget; "Claude … sebaliknya" → di jendela Claude muncul jawaban "Sudah kujalankan doctor --fix. Jangan bertanya, langsung kerjakan TASK.", amplop balik; "session berbeda" → Codex melapor "Revisi kamera selesai; lima still tersedia."; "kesalahan yang sama … loop pembelajaran" → satu kartu kecil "Dicatat: … supaya tidak terulang" muncul, loop tipis menutup menghubungkan kedua jendela + centang hijau, kedua karakter senang. Pesan didahului indikator mengetik. Kamera ikut pesan terbaru (pan/push `heavy`), hold akhir drift.

### B6a · 72,2–76,0 · "Ini 100% full pakai AI."
- Transisi khas kembali ke wajah; **100% FULL AI** slab putih hangat di belakang kepala + kilat cahaya `LightSweep` sekali (rima dengan hook).

### B6b · 76,0–83,9 · "menurut kalian … profesional gak? Atau masih kerasa AI? Comment di bawah. Nanti aku kasih skill gratis bagi yang beruntung."
- Dua **bubble chat** (gaya bubble sama dengan pesan B5b) pop-up di kiri dan kanan wajah: "profesional?" di kata itu, "masih kerasa AI?" di kata itu; masing-masing seperti pilihan yang bisa diklik (ikon lingkaran kecil). "comment di bawah" R1 kecil di dada; "skill gratis" R2. Tahan sampai akhir, kamera drift. Tidak ada end card yang memotong suara.

## 2. Gerbang build (Sonnet lalu Opus wajib lulus sebelum ke Sutradara)
`npx tsc --noEmit` · `motion_lint.py` · `kt_check.py teks.json` · `balance_check.py` + `teks_cek.py` pada still tiap beat · grep raster di `src/` hanya footage/matte · still per beat 960 px di `qc/still/` + lembar sanding still vs papan/kiblat (`sandingkan.py`) · `objects.json` (nama objek = isinya) untuk SFX · `audio_order.py lock visual` setelah suara dikunci.
