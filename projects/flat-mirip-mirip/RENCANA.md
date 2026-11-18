# RENCANA · "Kenapa konten terasa flat dan mirip-mirip" (Script final 3, untuk Behindwork)

Status: rencana, belum produksi. Belum ada VO, render, atau aset terunduh selain video referensi. Ditulis 18 Nov 2026.

Bahan yang dibaca: storyboard REVISI (PDF 18 hal.), BRIEF-STORYBOARD-SCRIPT-FINAL-3.md, script di chat, 4 gambar lampiran (Premiere, Remotion Studio, beranda IG, 6 profil IG), reel referensi IG DezFTyktEUp (diunduh dan dibedah), kartu pustaka 46, 77, 79, 85, LANTAI di `motion-graphic/SKILL.md`, `templates/TAHAP.md`.

## 1. Konsep dalam satu kalimat

Esai 60 detik bergaya dokumenter montase: teks kecil muncul kata per kata di garis tengah, kata penekanan merah raksasa, hard cut. Babak "masalah" sengaja tampil sintetis (krem, siluet, kartu kembar). Babak "jawaban" berganti ke hal yang hanya dimiliki manusia (foto asli, sudut pandang, benda pribadi). Visualnya ikut menjadi argumen.

## 2. Hasil bedah referensi (reel Tesla, IG DezFTyktEUp)

Diukur dari file 1280×720, ±24 fps, 58,0 dtk (`~/work/pustaka-video/lumitris-tesla-roadster_DezFTyktEUp.mp4`).

| Aspek | Angka / temuan | Bukti |
|---|---|---|
| Produser | Lumitris, sama dengan kartu 46 | watermark kanan atas |
| Isi vs outro | isi 0–54 dtk, kartu logo hitam 54–58 dtk | contact sheet 2 fps |
| Ritme | 53 cut = 54,8/menit, shot median 0,5 dtk; event visual 78/menit; flash beruntun 47–48 dtk | `pace_read.py`, scene detect 0,3 |
| Teks kecil | grotesk putih (hitam di kartu terang), tinggi baris ±5,1 % tinggi frame, garis tengah y ±50 %, jarak antarkata lebar (±1 lebar kata), 1–5 kata menumpuk lalu diganti | frame 7,6 dtk dan 22,6 dtk |
| Kata besar | sesekali satu kata jauh lebih besar ("start", "flies", "THE MONEY.") | 13, 25, 27, 51 dtk |
| Kartu terang | bukan putih murni: abu terang ±#E8E8E8, grain/debu film, tepi menggelap | frame 7,6 dtk ("But there's a slight misunderstanding") |
| Teknik lain | grid/kolase arsip (5 dtk, 22 dtk), invert pada grid logo (6 dtk), kotak abu di belakang kata (12,5 dtk, 25,5 dtk), UI dashboard (52 dtk) | contact sheet |
| Audio | −14,2 LUFS, kategori "energi", musik 100–140 bpm | ebur128, `pace_read.py` |

Kartu di pustaka yang dipakai:
- **46 Lumitris** (produser sama): angka teks kecil vs raksasa, rasio skala ≥ 4×, kotak kata.
- **85 Sam John "Why does content feel so unoriginal?"**: topik yang sama; teknik slab warna dan grid montase untuk "mirip".
- **79 siirfannih taruhan 20 video**: maskot piksel (Clawd) dan UI chat Claude.
- **77 Energy & The Sun**: teks melintasi cut, kartu putih bertulisan, grid arsip + teks.

## 3. Kiblat dan RESEP

- **Kiblat = reel Tesla**, dibedah jadi kartu baru 86 (`pustaka/README.md` §Referensi baru). Pengikatnya: sistem teks (kecil di garis tengah + kata raksasa), ritme montase, hard cut.
- **Kanvas** mengikuti arahan Irfan: putih #FFFFFF polos, tanpa vignette radial (memori "putih utama, tanpa radial"). Grain halus dipinjam dari reel, belum diputuskan (lihat §6).
- **Warna**: hitam teks, merah #D6202B untuk penekanan, cyan #29DFD4 hanya sebagai hasil invert P03. Babak slop memakai krem/pastel *sebagai isi yang dikritik*, tidak sebagai palet video.
- **Teknik pinjaman**: Clawd + UI chat (79), slab/grid (85), grid arsip (77), UI Premiere dan Remotion Studio dibangun ulang dari screenshot lampiran Irfan.

## 4. Peta adegan (struktur dari storyboard REVISI, visual akhir dirancang ulang per LANTAI D19c)

| Beat | VO | Rencana visual | Sumber aset |
|---|---|---|---|
| P01 | Kenapa banyak video … flat dan mirip-mirip? | kanvas putih, kata per kata; 8 kartu konten mengorbit, pelan → cepat → pusaran menyapu frame | kartu buatan sendiri (keluarga P05) |
| P02 | Claude | Clawd di timeline editor, pop | Clawd piksel (gaya kartu 79) + UI editor |
| P03 | sudah mengubah industri kreatif | merah ±75 % lebar; invert penuh pada "industri" | tipografi |
| P04 | dan membuat … hitungan menit | UI chat Claude: video.mp4 diunggah, prompt diketik, flash | rekaman layar Irfan **atau** UI dibangun ulang (lihat §6) |
| P05 | tapi rasanya AI-slop. | scroll beranda IG; makin ke bawah makin seragam | UI IG setia ke aslinya, akun fiktif, isi buatan sendiri |
| P06 | Coba perhatiin … dan AI Slop. | satu unggahan dibedah: berantakan → kembar → latar krem → siluet → rakit ulang | lapisan dari kartu P05 |
| P07 | Buat belajar … karya orang lain | referensi di samping timeline Premiere, klip dipotong manual | UI Premiere dibangun ulang dari screenshot |
| P08 | dan AI bikin kita … lebih cepat | match cut playhead → chat Claude → timeline Remotion tersusun sendiri | **rekaman Remotion Studio asli dari proyek video ini** |
| P09 | Masalahnya … mirip dan familiar | 2 kartu brand → mundur ke grid 4×2 identik | buatan sendiri |
| P10 | dan yang mirip? … susah diingat … | grid memudar baris demi baris sampai putih kosong (pengecualian fade yang disengaja) | – |
| P11 | Founder itu jualan kepercayaan | usul: footage manusia nyata (bukan kartu 2D) | stok berlisensi |
| P12 | … ingat orangnya, bukan videonya | "orangnya" merah raksasa di samping orang nyata; feed generik memudar | stok berlisensi |
| P13 | Jadi apa … mudah diingat? | kembali ke kanvas P01, ruang orbit kosong | tipografi |
| P14 | ceritamu, sudut pandangmu, hal yang cuma kamu alami | 3 hard cut: foto asli → POV kamera → detail benda | **foto/benda asli Irfan** |
| P15 | Seleramu | merah raksasa, tahan 1,2 dtk, selesai | tipografi |

## 5. Urutan kerja (mengikuti `projects/flat-mirip-mirip/TAHAP.md`)

1. **Kartu 86 + RESEP**: contact sheet ke `guide/referensi/sheets/`, transkrip, kartu dari `KARTU-TEMPLATE.md`, `RESEP.md` lulus `resep_check.py`.
2. **Profil merek Behindwork**: belum ada `merek/behindwork/BRAND.md` + `EDITING.md`. Diisi bersama Irfan, lalu `profil_cek.py` LULUS. Ini gerbang pertama.
3. **VO**: uji 1 kalimat dengan 1–2 suara, lalu VO penuh per potongan (perkiraan ±830 kredit; biaya disebut dulu). Potong jeda, kunci dengan `audio_order.py lock suara` + `cut_check.py`. Timing panel storyboard disesuaikan ke VO asli.
4. **Preview**: still per beat P01–P15 + 3 klip draft (pusaran P01→P02, invert P03, scroll P05). Masukan Irfan → `DECISIONS.md`.
5. **Aset**: unduhan stok/domain publik ke `projects/flat-mirip-mirip/aset/` (≤ 300 MB, catat URL + lisensi + hash), screenshot/rekaman Remotion Studio dibuat sendiri, foto P14 dan (bila dipilih) rekaman P04 dari Irfan.
6. **Produksi**: `tema.ts` + komponen bersama (KataKecil, KataRaksasa, Kanvas, KartuSlop, FeedIG, ChatClaude, EditorTimeline, Clawd), lalu satu TASK per adegan. Audit semua frame, SFX → musik (Epidemic/SFXIrfan), Devil's Advocate.
7. **Render 1** → satu ronde masukan → **Render 2**. Tiap render di-upload ke Drive "Claude edit/flat-mirip-mirip".

## 6. Yang perlu keputusan Irfan

1. **Nada visual P07–P12.** Storyboard REVISI memakai kartu 2D datar (segitiga, lingkaran merah) untuk P07–P12. Reel referensi ±95 % footage nyata, dengan 53 cut. Kalau babak "jawaban" juga 2D datar, videonya bisa terlihat sama dengan konten yang ia kritik. Usul: P01–P10 sintetis (sengaja), P11–P14 footage/foto nyata. Pilihan: (a) usulan ini, (b) ikuti REVISI apa adanya.
2. **Profil Behindwork**: font, watermark/handle (P15 di brief menulis `@siirfannih`, tapi video diposting ke Behindwork), dan outro logo seperti reel (4 dtk) atau tidak. Kalau ada outro, VO harus ≤ 56 dtk.
3. **P04 Claude chat**: rekaman layar asli dari Irfan, atau dibangun ulang setia ke UI Claude (seperti kartu 79-k5)?
4. **Durasi**: 131 kata ≈ 58–62 dtk. Bila VO lewat 60 dtk, boleh memotong "bisa sangat" dan "seringkali"?

Default yang dipakai sampai dijawab: merah #D6202B; IG dibangun setia ke UI aslinya dengan akun dan isi fiktif (akun asli di screenshot lampiran tidak ditampilkan sebagai "AI slop"); tanpa footage film berhak cipta (reel memakai cuplikan film, kita tidak).

## 7. Hambatan teknis

- **Disk**: root 100 % terpakai, sisa ±1,1 GB. Audit semua frame (`render.sh frames`) + render 1080p butuh beberapa GB. Ini perlu diselesaikan sebelum langkah 6.
- **Folder `~/work/assets-script-final-3/`** milik user `openbot` (izin 700), tidak bisa dibaca sesi ini. Aset proyek ditaruh di folder proyek ini.
- **ElevenLabs**: konektor claude.ai belum diotorisasi; jalur API lokal dicek saat langkah 3.
- **Hak Clawd**: maskot Anthropic; sudah dipakai di video siirfan, tapi Behindwork akun publik. Keputusan tetap di Irfan.
