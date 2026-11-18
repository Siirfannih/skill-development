# TASK-R5c-D · adegan D (57,6–72,2 dtk) = satu sesi chat Claude (pekerja baru)

TUJUAN
Bangun ulang adegan D (komposisi `RelayDunia`, file `remotion/src/video/b7.tsx`, lapisan `D_RELAY` di `lego/bangun.py`) menjadi SATU jendela sesi chat Claude Code yang tampil seperti UI asli, di latar satu warna hitam. Adegan ini menunjukkan cara kerja lintas agen: Claude adalah komandan; ChatGPT tidak pernah bicara langsung di sesi ini. Semua keputusan sudah final (DECISIONS D-431, D-432, D-435, D-436); jangan menunggu jawaban, kerjakan.

Proyek `P = ~/work/skill-development/projects/skill-development-journey-20261116`. Repo skill: `~/work/skill-development`.

## Orientasi (baca dulu, urut)
1. `DECISIONS.md` baris D-431, D-432, D-435, D-436 (bunyi Irfan).
2. Lihat GAMBAR: `sumber/ref-r5c/g2-satu-halaman-chat.png` (bubble prompt kanan, baris aksi + kartu hasil kiri, latar polos), `g3-kolom-input-opus.png` (kolom input: `+`, nama model, tombol kirim oranye), `g4-mosaik-transisi.webp` (mosaik piksel oranye sebagai transisi masuk), `g1-logo-baris-latar-hitam.png` (latar hitam, logo asli). Kiblat gaya: `~/work/skill-development/claude/motion-graphic/pustaka/kartu/17-ganimate.md` §1–§5 (UI SaaS bersih, satu latar per adegan, objek muncul satu per satu mengikuti ucapan, tanpa adegan diam).
3. Kode: `remotion/src/video/b7.tsx` (versi tiga jendela: DIBUANG isinya, ekspor `DesktopAgen` + tipe `DesktopProps` dan pola `pre`/`post` + `WajahDorong` di awal/akhir tetap), `remotion/src/video/b3.tsx` (jendela Claude adegan B yang sudah diterima: pakai ulang bentuk jendela, kursor, mosaik baris ±142), `bersama/tema.ts` (TOKEN), `bersama/LogoChatGPT.tsx`, `bersama/Karakter2D`/`KarakterLayer.tsx` (Clawd), `lego/bangun.py` blok "B5b: dunia Mac" (±baris 741–757: `kun5`, `add("D_RELAY", …)`, objek).
4. Sistem desain: `~/work/skill-development/claude/motion-graphic/templates/sistem-desain/README.md`. Bundle entry `src/video/index.ts` (`remotion/.entry`).

## Isi adegan (urut ucapan; waktu = onset kata, ambil dengan `W.s(...)` seperti `kun5` sekarang)
Satu jendela besar (±1560×880, tengah) berjudul "skill-development · Revisi video siirfan". Kolom input bawah gaya g3 ("Opus 5.5 · Medium", tombol kirim `MEREK.primer`). Pesan menumpuk dari atas; kamera dorong pelan terus (1,00 → ±1,06) dan menggulir mengikuti pesan terbaru. Tidak ada frame diam: selalu ada teks mengalir, spinner, kursor, atau baris terminal berjalan.

| Ucapan (detik) | Yang muncul di sesi |
|---|---|
| "Kayak yang kalian lihat ini" 57,6–59,0 | Mosaik piksel oranye (g4) membuka jendela sesi yang sudah berisi satu prompt Irfan di bubble kanan: "Revisi potongan ronde 3, cek semua gerbang." |
| "Bahkan ChatGPT bisa koordinasi ke Claude" 59,7–61,5 | Baris acara gaya OpenBot (teks redup + logo ChatGPT): "Update dari ChatGPT · session A · 12:20". Claude (logo Claude) membalas, teks mengalir: "ChatGPT selesai memotong ronde 3. Satu gerbang masih gagal: jeda di batas kalimat 68,7 dtk." |
| "Claude bisa dikoordinasi sebaliknya" 61,6–62,8 | Claude: "Saya sudah memerintahkan ChatGPT session A memperbaiki batas kalimat itu." + baris aksi "Messaged ChatGPT · session A ›" + blok terminal kecil yang mengetik `bus send chatgpt-a "perbaiki jeda 68,7 dtk"` → `terkirim`. |
| "ChatGPT dengan session yang berbeda pun bisa koordinasi untuk meminimalisir kesalahan yang sama" 63,6–67,9 | Claude: "Saya minta ChatGPT session B memeriksa hasilnya." + "Messaged ChatGPT · session B ›". Lalu baris acara "Update dari ChatGPT · session B". Claude: "ChatGPT session B memberi masukan: kesalahan ini pernah terjadi di video lain. Saya catat supaya tidak terulang." |
| "Sehingga ada loop pembelajaran yang terjadi di sini" 68,0–72,1 | Baris aksi "Edit guide/teks/GUIDE.md ›" dengan satu baris diff hijau "+ Potong di jeda, bukan di dalam kata." → "Ran cut_check.py ›" terminal `PASS` + centang. Claude: "Pelajaran tersimpan di skill-development. Session A dan B memakai aturan yang sama mulai sekarang." Adegan dipotong (post) ke wajah. |

Clawd (tokoh pixel Claude, satu-satunya tokoh di adegan ini, D-436): kecil (±64 px) di baris indikator kerja di atas kolom input ("Working…"/"Mengirim…" + timer), bergerak saat Claude bekerja (mengetik/bergoyang), lega + centang di akhir. Tidak ada tokoh ChatGPT/Gemini dan tidak ada avatar pixel ChatGPT.

Tidak ada KT narasi di rentang ini (sudah dihapus di `lego/teks.py`, D-435). Teks di layar hanya UI.

## Gaya (wajib dari token)
- Latar `MEREK.latar` polos. Tanpa gradien, glow lebar, vignette, atau radial (D-431/D-435).
- Jendela `NETRAL.panel`, garis `NETRAL.garis`, kolom input `NETRAL.input`, teks `NETRAL.teks`, teks redup `NETRAL.redup`, aksen `MEREK.primer` hanya di tombol kirim, spinner, titik fokus. Hijau centang = `PENGECUALIAN.hijauSelesai.warna`.
- Huruf `HURUF.keluarga.ui`; ukuran hanya `HURUF.ukuran.ui` (isi pesan), `uiKecil` (baris acara/aksi, terminal), `label` (judul jendela, timer). Tidak ada ukuran lain.
- Logo asli Claude (asterisk) dan nilai warnanya → komponen baru `remotion/src/video/bersama/ui-asli/claude/LogoClaude.tsx` (warna UI asli boleh literal di folder itu). Logo ChatGPT: `bersama/LogoChatGPT.tsx`.
- File adegan `b7.tsx` TIDAK menulis kode warna hex, `fontFamily: '…'` literal, atau `fontSize: <angka>` literal. Komponen baru yang dipakai ulang (bubble, baris acara, baris aksi, terminal, kolom input) taruh di `remotion/src/video/bersama/chat/`.
- Gerak: kurva dari `curves.ts`/helper yang ada (`move`, dll.), tanpa crossfade/fade sebagai transisi; pesan masuk dari bawah (geser + muncul ≤ 4 f), teks Claude mengalir per kata.

## FILE BOLEH
`remotion/src/video/b7.tsx`, `remotion/src/video/bersama/chat/**` (baru), `remotion/src/video/bersama/ui-asli/claude/**` (baru), `lego/bangun.py` HANYA blok "B5b: dunia Mac" (kunci waktu + `add("D_RELAY"…)` + daftar objek), turunan lego (`lego/*.json`, `lego/cache/`, `objects.json`), `qc/r5c/D/**`, `handoff/REPORT-R5c-D.md`.
FILE JANGAN: `lego/teks.py`, `remotion/src/video/bersama/KT.tsx`, `bersama/tema.ts` (butuh token baru → tulis di REPORT, Sutradara menambahkan), `b1–b6.tsx`, `edit/*`, `audio/*`, `DECISIONS.md`, `RESEP.md`, `evaluation.md`, `STATUS.md`, `out/*`, `qc/master_gambar.mp4` (Sutradara yang merakit), skrip `~/work/skill-development/claude/motion-graphic/scripts/*`, proyek lain. Jangan commit/push.

## LULUS BILA
1. `cd remotion && npx tsc --noEmit` exit 0; `python3 ~/work/skill-development/claude/motion-graphic/scripts/juri/tema_cek.py remotion/src/video` tidak menyebut `b7.tsx` (file lain boleh masih gagal); `motion_lint` PASS untuk b7.
2. `python3 lego/teks.py && python3 lego/bangun.py` jalan; lapisan `D_RELAY` di `lego/lapisan.json` memuat kunci baru.
3. Still resolusi penuh komposisi `RelayDunia` (props dari `lego/lapisan.json` entri `D_RELAY`, `npx remotion still src/video/index.ts RelayDunia … --props=<file>`) di `qc/r5c/D/`: tiap 1 dtk dari 57,6 sampai 72,1 dtk (15 still) + strip 1-frame 12 f di awal (mosaik) dan 12 f di akhir. Kamu sudah melihat semuanya: teks UI tidak terpotong tepi jendela, tidak ada frame diam > 6 f, Clawd terlihat bekerja.
4. Durasi lapisan tetap (dunia mulai `w5s`, panjang `dun + (pre+post)/FPS`), tidak menyentuh adegan sebelum/sesudah.

## LAPORAN
`handoff/REPORT-R5c-D.md` ≤ 25 baris: file diubah/dibuat, satu baris per still (yang terlihat), log gerbang (≤ 10 baris), token baru yang dibutuhkan, penyimpangan + alasan.
