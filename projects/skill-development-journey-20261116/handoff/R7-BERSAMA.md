# R7 · brief bersama untuk semua pekerja putaran 7 (dibaca sebelum TASK-R7-*)

## Awal sesi sudah dikerjakan Sutradara
`git pull` + `tools/doctor.sh` sudah jalan; satu-satunya GAGAL "PETA.md basi" (file lokal). JANGAN `doctor.sh --fix`, jangan sentuh PETA.md, jangan commit/push (Sutradara yang commit).

## Video
Talking head Irfan 16:9 1920×1080, 29,97 fps (30000/1001), 2512 frame = 83,817 dtk. Suara terkunci. Basis visual sekarang: `qc/r6/visual_r6.mp4` (lihat untuk konteks) dari resep `lego/lego_r6.json`. Resep putaran 7: `lego/r7_gabung.py` → `lego/lego_r7.json` → `qc/r7/visual_r7.mp4` (Sutradara yang merakit).

## Cara menyerahkan hasil (WAJIB, supaya pekerja paralel tidak bentrok)
- Lapisan baru dirender ke `lego/cache/r7_<tugas>_<id>.mov` (ProRes 4444 alpha, `--codec=prores --prores-profile=4444 --pixel-format=yuva444p10le --image-format=png`) atau `.mp4` bila opak. Pakai `--concurrency=3` (lima pekerja jalan bersamaan di PC yang sama).
- Daftarkan di `lego/r7_override_<tugas>.json`: `{"ganti": [ {id, src, t, x, y, (gerak)} … ], "tambah": [ {id, src, t, x, y, "sebelum": "<id lapisan di atasnya>"} … ], "buang": ["id", …]}`. Format lapisan sama dengan `lego/lego_r6.json`. Hanya ID milik tugasmu.
- Cek rakitan rentangmu sendiri: `python3 lego/r7_gabung.py && python3 ~/work/skill-development/claude/motion-graphic/scripts/lego/compose.py lego/lego_r7.json --rentang <a> <b>` (keluaran `qc/r7/visual_r7_<a>-<b>.mp4`); still dan lembar dari situ.

## Kamera wajah (D-464) — kebenaran tunggal
`lego/lego_r7_kamera.json` (`dasar`: klip, `kamera.zoom` [awal, akhir], `pusat`, `kurva`). Zoom tidak pernah diam lagi, jadi semua yang menempel ke wajah (lubang matte, cincin, tangga, tokoh) dihitung dengan kamera ini, bukan lego_r6. Matte pembicara: `qc/matte/wajah-matte.mkv` (dipakai `lego/lubang.py`, fungsi `potong_zoom` menerima fungsi zoom) dan `qc/matte/wajah-matte-r6.mkv` (2496 frame; cocok dengan proxy pada offset −16 frame sumber, lihat `qc/r6/profesional/provenance.json`). Cek keselarasan matte di still sebelum dipakai (tepi rambut menutupi huruf di tempat yang benar).

## Pengikat merek (D-446) — warna/huruf dari merek, BENTUK dari referensi
- Putih hangat `#FAF8EC` teks utama; hitam `#080608`; biru startup `#2E5BFF` aksen (isi pil/tag, bukan huruf biru di latar gelap); hijau merek chartreuse `#C8E64A` (D-463); oranye `#E4550F` hanya UI Claude asli. Tidak ada merah, glow lebar, atau gradien hiasan. Token di `remotion/src/video/bersama/tema.ts` (tambah token baru hanya di sana, dengan komentar D-nya).
- Huruf: Poppins 700–800 (KT di wajah), SF Pro Display Medium/Bold (teks yang hidup di UI), Anton hanya slab yang sudah ada.
- Gaya Apple minimalis: tag kaca (putih 14–18 % + blur latar 18 px + garis 1 px putih 30 %), bayangan lembut.

## Kartu (pekerja tidak membaca kartu; ini ringkasannya)
| Kartu | Dipakai untuk | Bentuk yang diambil | Frame kunci |
|---|---|---|---|
| 83 Barsol | KT di wajah | K1 cincin kata mengelilingi kepala (bagian belakang lewat di belakang kepala, ≤ 3 kata terlihat, ukuran seragam ±4–5 % tinggi frame); K2 tangga tag (satu kata per baris, turun diagonal di sisi wajah, tag membulat semi-transparan, kata klimaks di pil lebih besar); K3 slab raksasa di belakang kepala (sudah ada); K4 kata tunggal kecil di dada (±4 % tinggi), ganti per kata; masuk sigap 2–4 f, keluar potongan/mask | `~/work/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/83-k1…k6.jpg` |
| 63 invideo | teks di adegan UI | teks dan UI satu dunia: ikut push/pull kamera UI, duduk di elemen yang dirujuk | `…/keyframes/63-*.jpg` |
| 85 Sam John | kata punchline | kata raksasa satu baris di atas latar satu warna, subjek di depan | `sumber` gambar Irfan (adegan PROFESIONAL sudah memakainya) |

## Lantai yang berlaku untuk semua teks
- Semua ucapan tampil (A1), teks = ucapan persis (`teks.json`, waktu kata `edit/words.json`), 1–3 kata per tampil, maks 2 baris, tidak terpotong tepi, kontras ≥ 4,5:1, kata sambung ≥ 56 px, teks kunci tidak di 8 % bawah frame.
- Tahan sampai kata selesai diucapkan; keluar = potongan atau mask, tanpa fade; ≥ 3 gerak berbeda per 15 dtk; satu peran = satu gerak di seluruh video; satu fokus per momen; teks tidak menutupi wajah.
- Kurva dari `remotion/src/lib/curves.ts` (`land`, `heavy`, `whip`, `reveal`, `leave`), bukan `Easing.ease`; durasi dari jarak (`dur`).
- Tokoh (Clawd/ChatGPT/Gemini) tidak pernah melayang: selalu berdiri/duduk di benda (bahu, slab, lantai) (D-459).

## Rumus visual (D-466) — wajib sebelum merancang tiap blok
Untuk tiap kalimat yang kamu ubah: (1) **pesan** yang diucapkan → (2) **maksudnya** (apa yang harus dipahami penonton) → (3) **alasannya** → (4) **bentuk visual** yang paling menyampaikan maksud itu (contoh: "AI slop" = gradien abu + objek ramai, karena itu ciri konten AI slop). Tulis tabel 4 kolom ini di laporanmu. Boleh membuat aset (ikon, ilustrasi, UI, foto bebas lisensi) bila membantu; sebut sumbernya.

## Satu fokus per frame (D-465)
Di tiap frame hanya ada satu hal yang paling kuat: wajah, ATAU teks kunci, ATAU elemen UI. Frasa satu makna tidak dipecah berjauhan; dua teks kecil yang sama kuat di sisi yang sama = gagal. Nilai massa kiri-kanan tiap still. Tidak ada tulisan tangan.
