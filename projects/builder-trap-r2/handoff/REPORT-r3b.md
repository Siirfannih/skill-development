# REPORT r3b · Editor B · babak 3–4 (B16–B26)

> Disimpan oleh Sutradara dari balasan Editor B (14 Nov): Write ditolak untuk subagen ("Subagents should return findings as text"); Editor tidak memutar (`templates/roles/editor.md`).

Still `qc/stills_r3b/r3b_<label>.png` (skala 0,5; 34 still), lembar `qc/r3b_sheet.jpg`. File diubah: `src/scenes/Act3.tsx`, `Act3.text.ts`, `Act4.tsx`, `Act4.text.ts`. Tidak diubah: Act3a*, mesin, UI, Act1*/Act2*, BRIEF, PLAN, `out/`.

| ID | Dikerjakan | Angka |
|---|---|---|
| F-v1-01 | Biru hardcoded Act3 diganti (kata baru `C.freshDark`, denyut Drafts `#C9CBD1`, bayangan kartu netral); `hiColor={C.threadDark}` ke GitHub B18/B20; kartu B20 `saturate(0.25)` | biru (hue 200–250°, S > 25 %) B16 0 · B17 ≤ 0,02 · B18 0,96–1,70 · B19 0,10–3,03 (UI GitHub asli) · B20 0 · B21 0 · B22 ≤ 0,11 % |
| F-v1-02 | Triad B16–B18 84 → 96 px layar (2 baris); blok B22 dipecah | K3 96 · B19-K4 122/58 · B20-K4 97/56 · B21-K4 101/58, 104/59 · B22-N1b 82 · B25-N1 68 px |
| F-v1-03 | Crop berurutan: B13 T → B16 F1 → B19 P → B21a M → B21b P → B23 F4 → B24 F2 → B25a M → B26 F4; teks 20–60 px dari tepi wajah | tidak ada dua crop sama berurutan, tidak ada pita sama 3× |
| F-v1-07 | B21b crop P pusat x 1077 (dulu 720): benda hitam (sumber x < 500) keluar frame | — |
| F-v1-04 | B19 punch 1,8× ke Create; B20 punch 0,9 → 1,5× ke "No releases published" saat beku; B22 punch 3,5× ke "No threads yet" lalu whip mundur | Create ±104 px (9,5 %); Releases ±189 px (17,5 %); "No threads yet" huruf 67–69 px (6,2 %) |
| F-v1-05 | B20 teks menempel tumpukan kartu; B22 teks di bawah "No threads yet"; B14 tidak dikerjakan (file Editor A, Q-r3b-01) | celah teks–kartu ≤ 140 px layar |
| F-v1-06 | Renderer triad ditulis ulang: "menjual" hilang f1522 (50,73 dtk); "apapun." mengikuti lebar kunci; B19 dibuka dengan jendela utuh 9 f lalu push | celah "mempublikasikan apapun." = 1 spasi |
| F-r3a-01 | Kepala triad + "apapun." `C.inkDarkDim`, kunci putih | — |
| F-r3a-02 | `hiColor #C9CBD1` lewat prop | — |

Gate: `teks_cek.py qc/stills_r3b` 11 tanda, semua teks UI asli (dialog Threads, form/daftar GitHub, nama repo, "Profile"), bukan narasi. `cekkata.mjs 38.95 94.97`: semua kata tampil tepat sekali (exit 0). `tsc --noEmit` bersih.
Pertanyaan Q-r3b-01…06 di `QUESTIONS.md`.
