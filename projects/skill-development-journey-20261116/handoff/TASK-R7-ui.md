# TASK-R7-ui · teks di adegan UI/kartu/Blender + warna SELESAI (D-445, D-453, D-462, D-463)
Baca dulu `handoff/R7-BERSAMA.md`. Rancangan: `handoff/RANCANGAN-KT-R6.md` baris UI repo, UI app Claude, kartu, Blender.

TUJUAN: teks di adegan UI hidup di dunia UI (ikut kamera UI, duduk di elemen yang dirujuk), SELESAI memakai hijau merek, dan "100% FULL AI" turun ke posisi yang seimbang.

## KONTEKS
- Adegan UI pakai versi R4 (bukan R5): lapisan `D_REPO`, `D_REPO_WAJAH` (1,53–4,47) dan `D_APP`, `D_APP_WAJAH` (23,59–36,3) di `lego/lego_r6.json` = render dari kode R4. Kode R4 ada di git: `git log --oneline -- remotion/src/video/` (render final 1 = 18 Nov ±06:30; kandidat commit `e6b0358`/`2ade90b`; kode b1/b3 sekarang adalah versi R5 gelap yang DITOLAK Irfan, jangan dipakai). Pulihkan kode R4 adegan itu sebagai komposisi baru (mis. `DuniaRepoR4`, `AppClaudeR4`) di file baru, render dengan props yang sama seperti lapisan R4 (lihat `lego/lapisan_opaque.json` di commit R4), lalu cek PSNR ≥ 45 dB vs cache R4 sebelum mengubah apa pun.
- **SELESAI (T004, 3,11 dtk)**: sekarang huruf hijau lumut #1A7F37 di atas UI putih. Ganti ke hijau merek chartreuse `#C8E64A` (D-463). Chartreuse di atas putih gagal kontras → bentuk: pita/blok chartreuse membulat di belakang kata, kata hitam `#080608` Anton (blok di sini sah karena kontras, LANTAI A9). Centang/aksen hijau lain di adegan repo ikut chartreuse.
- Teks UI (bentuk baru, ikut kamera UI):
  | ID | Ucapan | Tempat |
  |---|---|---|
  | T003 T005 | "akhirnya proyek ini" / "juga." | menempel header repo / baris commit terakhir |
  | T039–T047 | "Dan ini bukan sebuah template. Jadi kalau orang-orang kan sering banget bilang edit kayak … Nah, aku ngebalik. Progres di baliknya" | label SF Pro di tepi jendela yang ikut push kamera; "template." menempel kolom prompt tempat `/apple-style` diketik; "ngebalik." di dekat bubble cerita; satu kata besar boleh sebagian di belakang jendela |
  | T048 T049 | "Gimana caranya biar AI ini" | K4/tangga di wajah setelah keluar UI (34,4–36,3) |
  | T065 T066 T067 T068? T070 | "ChatGPT Pro Max yang" "20 kali" "5 kali" | "ChatGPT Pro" dan "Claude Pro" sebagai tag kaca menempel kartunya masing-masing (KARTU1 kanan atas, KARTU2 kiri); kartu angka R4 (putih) tetap |
  | T080 T082 T083 + T081 | Blender: "Ini", "Dan menurut kalian", "videonya kayak gimana?", slab "100% FULL AI" | teks narasi di bidang meja/monitor (perspektif ikut kamera Blender); **T081 "100% FULL AI" turun** (D-453): blok slab berpusat ±38–45 % tinggi frame di ruang kosong kiri, tidak menyentuh lampu, tidak menutupi monitor |
- Kamera UI: teks yang menempel elemen UI dihitung dari transform yang sama dengan komposisi UI (rakit teks DI DALAM komposisi UI R4 bila itu paling bersih).

## FILE BOLEH
BARU: `remotion/src/video/r4/**` (kode R4 yang dipulihkan + teks UI), `lego/r7_ui.py`, `lego/r7_override_ui.json`, `lego/cache/r7_ui_*`, `qc/r7/ui/**`. UBAH: `remotion/src/video/Root.tsx` (hanya menambah Composition), `remotion/src/video/bersama/tema.ts` (hanya token `hijauMerek: '#C8E64A'` bertanda D-463).
## FILE JANGAN
b1–b7 versi sekarang, `lego/lego_r6.json`, `lego/r6_gabung.py`, `lego/r7_gabung.py`, `teks.json`, audio/, edit/, file override pekerja lain, Blender/scene (teks Blender dibuat sebagai lapisan 2D di atas render b10a.mov).
## LARANGAN
Lihat R7-BERSAMA. Tidak ada kata yang tampil dua kali (teks lama T0xx yang diganti → `buang`/`ganti`). Tidak ada glow.
## LULUS BILA
1. tsc lulus; PSNR R4-pulih ≥ 45 dB vs cache R4 (sebelum diubah).
2. Rakitan rentang 1,3–4,6 / 23,4–36,6 / 45–54 / 72–76,5 dan still 2 fps + still penuh (3,3 / 25,3 / 29,5 / 33,0 / 49,5 / 73,8) di `qc/r7/ui/` + `sanding.jpg` vs `63-k5-prompt-kaca.jpg`, `63-k6-chat-klip.jpg`.
3. Kontras SELESAI ≥ 4,5:1 (tulis angkanya).
## LAPORAN
`handoff/REPORT-R7-ui.md`.
