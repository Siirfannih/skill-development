# REVIEW-V11-V · Worker V · kualitas render adegan (2 Nov)

Lingkup: `src/scenes/**` saja (tidak menyentuh prop `enter`, `src/lib/*`, audio). `npx tsc --noEmit` bersih.
Still sebelum/sesudah 480 px: `/home/claude/pks/v11v/{before,after}/fNNNNN.jpg`; lembar banding `/home/claude/pks/v11v/cmp_*.jpg`.

## 1 · Cahaya «balon putih» → cahaya natural (Tingkat 1, mini proposal + diterapkan)
- **Masalah.** Berkas dan pendar dibuat dari elips radial (`closest-side`). Hasilnya gumpalan bulat dengan ujung membulat: berkas 02d di 0:30, pendar di sekitar bidang 02d/06a–06d, aura piktogram 06g, halo produk 05h. Kerucut 01c/01d/03c tepinya sudah lurus, tetapi genangan lantainya elips terang bertepi tegas.
- **Usulan (diterapkan).** Komponen baru `scenes/parts/NaturalLight.tsx`:
  - `LightShaft` adalah trapesium dari sumber (sempit, boleh di luar frame) ke arah jatuh (melebar). Intensitas turun sepanjang sumbu, kira-kira 1/(1+k·s), dan ujungnya habis tanpa bentuk bulat. Ada penumbra blur, lapis hamburan lebar yang redup, dan grain statis untuk memecah banding.
  - `SourceBloom` adalah bentuk sumber itu sendiri (jajar genjang bidang/layar) yang di-blur tiga lapis. Falloff-nya mengikuti tepi sumber, bukan elips.
  - `FloorPool` adalah genangan lantai pipih dengan falloff gaussian 12 stop. Puncaknya rendah.
  - Rim light piktogram tidak diubah.
- **Penerapan.**
  - `_b2_shared LightPlane` (02d): berkas dari kanan-atas ±24°, sama arah dengan versi lama, plus pendar berbentuk bidang. Aksen keluar 02d juga memakai pendar berbentuk bidang (sebelumnya lingkaran radial).
  - `_b6_shared Plane softGlow` (06a–06g): pendar berbentuk bidang.
  - `S06g`: aura bulat diganti berkas dari layar di atas kepala ke bawah, menimpa piktogram. Sumber cahayanya terlihat di layar.
  - `_b1/_b3 LightCone` (01c/01d, 03c–03d): geometri dan animasi «garis finis → kerucut» sama; falloff lebih panjang, ditambah grain dan genangan gaussian.
  - `S05h`: halo produk diganti pendar berbentuk kartu dan genangan di lantai.
- **Still.**
  - `cmp_light_A.jpg`: 405, 540, 915, 939.
  - `cmp_light_B.jpg`: 1530, 1620, 3000, 3180.
  - `cmp_light_C.jpg`: 3360, 3450, 3930.
  - Detail 960 px: `/home/claude/pks/v11v/t1/f00939.jpg`.
- **Prinsip.** Visual realistis; tidak ada elemen tanpa makna (setiap cahaya punya sumber dan arah); intensitas puncak lebih rendah; tanpa tepi bulat atau tepi kotak.
- **Urutan mata.**
  - 02d: piktogram, lalu berkas dari kanan-atas, lalu bidang KREATIF yang paling terang di jalur berkas.
  - 06g: layar menyala di atas, cahaya turun, piktogram «kamu» tersinari, lalu PERAN KAMU.
- **Catatan untuk Claude utama.** 06a (berkas dari bidang ke atas) sudah berupa trapesium dan tidak diubah. Bloom transisi 06c→06d (≤ 0,35 dtk) masih radial; saya biarkan karena berupa kilat transisi.

## 2 · Crop footage S05f (1:32, 1:35)
- **Penyebab.** Foto potret (#2 pembicara podium, #9 pria bersweter) di-crop `cover` 16:9 dari tengah, lalu di-zoom di titik 50 % 42 %. Hasilnya close-up sweater tanpa wajah. Foto cek (#0/#6) juga memotong kepala saat zoom.
- **Perbaikan.** Tabel `FRAMING` per foto, berisi `objectPosition` ke wajah dan titik zoom di wajah/kepala. Foto lanskap tidak berubah.
- **Still.** `cmp_crop.jpg` dan `cmp05f.jpg` (seluruh montase 2765–2888). Wajah kini selalu tampak; teks tengah tidak menutup wajah.

## 3 · Frame kosong
| Waktu | Penyebab | Perbaikan |
|---|---|---|
| 0:23 (02b awal) | Grid biru ±0,5 dtk hanya berisi sumbu tipis; pena baru mulai di «janji» | Pena garis janji mulai di awal panel (+0,1 dtk). Teks/layout terkunci tidak disentuh, penanda `02b:line:draw` ikut maju. Lihat `cmp_empty.jpg` |
| 1:21–1:22 (05b) | Kartu abu lenyap total, tersisa satu titik biru di layar putih ±1,3 dtk | Kartu memudar menjadi «hantu» (opasitas 30 %, skala 0,82), tidak lenyap. Maknanya: cerita yang tak terdengar tetap ada. Titik biru tetap satu-satunya yang jelas |
| 1:38 (05g→05h) | Siluet wipe X10 menutupi layar | Diukur: gelap penuh ±5 f (2953–2957), jadi ≤ 6 f dan diizinkan. Tidak diubah |
| 0:46 (03a-2→03b) | Tilt naik melewati langit | Agent berwarna terbang di frame (objek bermakna, ±0,7 dtk gerak). Tidak diubah |
| 2:12 | Fade akhir | Diizinkan |

## 4 · «Tempat Kita» 0:54
- Di v10c2, KITA masuk dengan `enter="right"`, yaitu motion blur horizontal 3 f. Karena itu kata terbaca buram/tercoret.
- Efek ini tidak disengaja. Di pohon kerja sekarang, Worker T sudah mengganti `enter` menjadi ketikan, dan frame 1634–1660 terbaca bersih (`/home/claude/pks/v11v/kita.jpg`).
- Catatan untuk T: caret ketikan tampil sebagai tick kecil di baseline, mirip koma (melanggar aturan tanpa tanda baca). Sebaiknya caret tegak setinggi huruf.

## 5 · Penanda SFX ketikan (terverifikasi dari log SFXEV, render tiap frame)
Penanda `key` per huruf dihapus, sesuai Irfan: ketikan tanpa SFX, hanya enter/klik.

| id | detik |
|---|---|
| 03a:type:prompt:start / end | 41.833 / 44.733 |
| 03a:enter (klik kirim, dulu `03a:send:click`) | 45.441 |
| 03b:enter (dulu `03b:sendceo:click`) | 46.865 |
| 03b:type:stream:start / end (laporan CEO, dulu `03b:key:stream:0`) | 47.400 / 48.233 |
| 05d:type:laptop:start / end · 05d:enter:laptop | 87.000 / 87.100 · 87.161 |
| 05d:type:hp:start / end · 05d:enter:hp | 87.467 / 87.600 · 87.672 |
| 05d:type:tablet:start / end · 05d:enter:tablet | 87.967 / 88.100 · 88.183 |
| 06d:type:prompt:start / end | 113.700 / 116.367 |
| 06d:enter (BARU: tombol kirim ditekan 5 f setelah huruf terakhir, caret berhenti) | 116.600 |

Catatan: `tools/sfxev_to_cues_v10c.py` belum memetakan kind `type` (hasilnya `None`, tanpa bunyi), dan itu sesuai keinginan. Id enter berubah; alat cue memetakan menurut kind `click`, jadi aman.

## 6 · Audit sendiri (contact sheet v10c2)
| Temuan | Status |
|---|---|
| 0:35 (02e) judul kalender «Oktober 2026» terpotong tepi kiri saat kamera | Dicatat (02e: latar/grid terkunci; perlu keputusan Claude utama) |
| 1:40–1:42 (05h) deretan kartu produk menempel tepi atas frame | Dicatat (komposisi v10 #37 disengaja; kartu utuh) |
| 1:57–2:00 (06e) unit kecil di pita atas, 2/3 bawah gelap | Dicatat (makna «tertinggal» di gelap; bukan kosong) |
| Caption T (pohon kerja): putih di latar terang 05b/03a (kontras rendah), menimpa bidang 06c («menyerahkan cara berpikir») dan composer 06d («sebenarnya») | Untuk Worker T / Claude utama (lib, bukan milik saya) |
| S05f AnchorWord memakai shadow `0 6px 50px rgba(0,0,0,0.5)` | Tugas T #4; tidak saya ubah |

## Verifikasi
- `npx tsc --noEmit`: bersih.
- `seg2_layout_check`: probe tiap 12 f di rentang adegan yang saya ubah (12,7–19,5 · 23,2–32 · 50–55,9 · 78,9–104 · 111–117,1 · 126,3–132,8), direktori `/home/claude/pks/v11v/probe_*`.
  - 23,2–32, 111–117 dan 126–133: LOLOS.
  - Semua temuan lain CONTR berasal dari **caption baru Worker T** (putih di latar terang 05b/05c/05e/05g, 1,5–4:1), plus satu `anchor:LEBIH` 18,7 dtk (4,1:1). LEBIH berada di frame masuk berblur gerak di latar gelap, bukan di area cahaya.
  - Tidak ada SAFE/CLASH. Tidak ada temuan yang disebabkan perubahan cahaya/latar saya.
- Tidak di-commit oleh saya: hunk `enter=` (milik T) di S02d/S05f/S05h/S06g dan semua file lib. Commit saya memakai kind `type` di `SfxKind`, yang ditambahkan T di `lib/anim.tsx` (pohon kerja). tsc di main baru hijau setelah commit lib T masuk.
