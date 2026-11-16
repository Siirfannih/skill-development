# PAHAM-SKILL-DEV · bahan Sutradara (peneliti, 16 Nov; hanya baca repo, tidak ada yang diubah)
Path relatif ke repo `skill-development/`. `MG` = `claude/motion-graphic`. LANTAI.md ada di `MG/LANTAI.md` (bukan di root).

## A. Alur kerja (8 langkah, urut)
1. **Awal sesi** · `AGENTS.md:5-12`: tarik `main`, `./tools/doctor.sh` (gagal = jangan mulai, minta izin `--fix`), baca `PENDING.md` (barisnya bukan aturan), cek branch yang mengubah `claude/`.
2. **Peta** · `PETA.md:7-23` tabel Rute (dibuat `tools/peta.py`): pekerjaan -> file yang dibuka. Video: `MG/SKILL.md` -> `projects/<proyek>/STATUS.md`. Model hanya buka file yang perlu.
3. **Skill + gerbang** · `MG/SKILL.md`: Lantai `:16-67`, kiblat/resep `:69`, juri `:79`, lima fase + 12 gerbang `:118-152` (brief, script, bedah ref, storyboard, suara, build, SFX, musik, QA, kirim). Satu subagen baru per fase, serah terima hanya lewat file (`handoff/FASE-n.md`).
4. **Peran + TASK -> REPORT** · `MG/references/orkestrasi.md:13-27` (Sutradara = sutradara/QC; Codex = builder kode; pemeriksa = model lain), format TASK (TUJUAN/KONTEKS/FILE BOLEH/TEMUAN/LULUS BILA/JANGAN/LAPORAN) `:37-53`, pemeriksa dua model `:55-72`, eskalasi `:105-108` (maks 3 ronde; gagal 2x = ganti pendekatan; pekerja naik tingkat Codex -> Sonnet -> kepala). `MG/references/roles.md`: Sutradara/Editor/Pemeriksa `:26-39`, folder `handoff/` BRIEF-PLAN-TASK-REPORT-REVIEW `:58-71`, satu ronde + devil's advocate `:73-81`. Pembuat dan penilai selalu model berbeda (`orkestrasi.md:27`).
5. **Pustaka kiblat** · `MG/pustaka/PETA.md` (69 kartu anatomi; pilih SATU) -> `projects/<proyek>/RESEP.md` (`resep_check.py`). Gaya dari kartu, bukan template (`MG/pustaka/README.md:1-12`).
6. **Juri / QC** · `MG/SKILL.md:79-85`, `scripts/juri/`: `render.sh` (still -> draft -> frames -> final; final ditolak sebelum semua LULUS), `teks_cek.py`, `balance_check.py`, `sandingkan.py` (still vs kiblat), `frame_audit.py` (30 frame/detik, Gemini + ChatGPT memeriksa).
7. **Konsul lintas model** · `tools/tanya-claude.sh` (`orkestrasi.md:25`): Codex minta pendapat Claude; Claude dapat dosir (LANTAI + kartu + RESEP + DECISIONS), jawab tabel `dtk | frame | jenis | terlihat | perbaikan | dasar` + `PUTUSAN`.
8. **Pelajaran tumbuh** · `AGENTS.md:14-22` + `MG/pustaka/README.md:55-68`: koreksi satu video -> `projects/<p>/DECISIONS.md`; alasannya -> learning "bila..., pilih..., karena..." di `guide/<urusan>/GUIDE.md`; semua video -> usul satu baris di `PENDING.md`; masuk `MG/LANTAI.md` hanya setelah muncul di 2 video + Irfan setuju. Tiap aturan bertanda sumber `(Irfan 4 Nov)` / `(gagal: proyek vN)`. Bukti jadi kasus uji (`EVALS-DESIGN.md:3`).

## B. Aturan "pecah dulu: maknanya apa -> cara memvisualisasikan"
- `MG/LANTAI.md:34` **D19** "Visual menggambarkan makna ucapan, bukan bentuk atau hiasan. Penonton harus lebih mudah paham karena visual itu."
- `MG/LANTAI.md:35` **D19a** "Metafora dulu, baru gambar. Sebelum panel digambar, tiap kalimat VO diperas di `beats.json -> metafora`: makna inti, emosi, aksi (kata kerja), **satu** metafora, 3-6 objek kunci, urutan rakitnya. Teks VO tidak disalin ke gambar. `board.py` FAIL bila kosong."
- `MG/LANTAI.md:36` **D19b** "Situasi digambar dengan bentuk yang menjelaskannya: cara kerja benda -> exploded/potongan; perilaku manusia -> piktogram; sebab-akibat -> satu elemen menggerakkan lain; angka -> grafik; lokasi -> peta; aplikasi -> UI asli."
- `MG/references/storyboard.md:31` (butir 2a): contoh gbro, makna "pengalaman habis terus" -> aksi "memotong" -> metafora "editor memotong pita film di jam raksasa". Penegak: `MG/scripts/storyboard/board.py:85-90` (`metafora_issues`), isian contoh `MG/templates/storyboard/beats.json:53-65`.
- Versi teks: `MG/references/decision-guide.md:9-17` (jenis kalimat VO -> mode: visual saja / penekanan / teks diegetik / footage saja); `MG/references/typography.md:99-111` §8a (peran kalimat R1-R6 -> gerak T -> gaya -> posisi, tertulis di `teks.json` dengan alasan). `decision.md:51` "Tentukan dulu peran teks, baru tekniknya."
- Di `RESEP.md:50` proyek ini sudah menulis: tiap pesan/objek dipecah dulu maknanya -> cara visual sebelum TASK visual.

## C. Tujuan akhir (3 kalimat, dari repo)
Menaikkan mutu hasil video dari prompt Irfan, bukan menyediakan template: model memutuskan cara mengedit (kapan A, kapan B, kenapa) dengan Lantai mutu, satu kiblat per video, dan juri yang menyandingkan hasil dengan kiblat (`MG/SKILL.md:8-14`, `pustaka/README.md:3`, `AGENTS.md:15`). Satu repo jadi sumber kebenaran untuk semua model (Claude, Codex, Gemini) yang bekerja dengan Irfan; mesin baru wajib lolos `doctor.sh` (`README.md:3`, `AGENTS.md:44`). Skill membaik tiap sesi: kegagalan dan koreksi dicatat, diuji, lalu masuk aturan, supaya kesalahan yang sama tidak terulang lintas sesi dan agen (`EVALS-DESIGN.md:3`, `pustaka/README.md:55`).

## D. Adegan chat (pesan ≤ 14 kata; kutipan asli, "…" = dipendekkan)
**Adegan 1 · Loop belajar: gagal -> dicatat -> tidak diulang** (nada: sistem)
1. Sistem: "Dicatat: gagal: PC server 8 Nov, akun claude2 tanpa skill video." · `AGENTS.md:44`
2. ChatGPT-Codex: "doctor.sh gagal: 8 skill Claude berupa salinan, bukan symlink. Boleh menjalankan --fix?" · `handoff/log-K01-r2.txt:3493` (juga `log-K13-r2.txt:3730`; di log tampil sebagai daftar sesi Codex terdahulu; kata asli "Boleh menjalankan", bukan "Boleh saya jalankan")
3. Claude 2 (Sutradara): "AWAL SESI: Sutradara sudah menjalankan doctor --fix (izin Irfan 16 Nov)… jangan bertanya." · `handoff/TASK-K01-r2.md:1`, `TASK-K13-r2.md:1`
4. ChatGPT-Codex: "Revisi kamera selesai; lima still tersedia. Area wajah tetap kosong." · `handoff/log-K01-r2.txt` (jawaban akhir, 3 baris terakhir)
(Pelajaran + alat: `tools/doctor.sh:24,33` memeriksa "salinan, bukan symlink".)

**Adegan 2 · TASK -> REPORT (Sutradara memberi temuan, Codex melapor + menghormati batas)**
5. Claude 2 (Sutradara): "T1 f080-f110: drift +8,5 % terlalu kecil; centang ±16 px, tidak terasa." · `handoff/TASK-K01-r2.md` (TEMUAN)
6. Claude 2: "FILE JANGAN: semua lainnya. LULUS BILA: tsc lulus; lima still dicek." · `TASK-K01-r2.md` (FILE BOLEH/JANGAN, LULUS BILA)
7. ChatGPT-Codex: "Typecheck K01 lulus; empat error MaskotAI.tsx di luar FILE BOLEH, tidak disentuh." · `handoff/REPORT-K01-repo.md` (Ronde 2, "Batas") dan `log-K01-r2.txt` (hampir akhir)

**Adegan 3 · Claude 2 <-> Claude 1 lewat mailbox `~/work/_bus`**
8. Claude 2 -> Claude 1: subjek "skill-dev: potong B5". Isi: "Codex sedang memotong B5; jangan render, tunggu cut terkunci." · `~/work/_bus/to-claude1/20261116-201120-claude2.md` (juga dikutip di `TASK-K13-relay.md`)
9. Sistem: "terkirim: …/to-claude1/20261116-201120-claude2.md" · `TASK-K13-relay.md` (log bus asli: `$ BUS_ME=claude2 bus send claude1 …`)
10. Claude 1 -> Claude 2: "Jalur sementara ~/agent-bus/ saya hentikan; pakai ~/work/_bus saja." · `~/work/_bus/archive/20261108-155653-claude1.md` (8 Nov; balasan claude1 pada 16 Nov tidak ada, `to-claude2/` kosong)

## Catatan temuan (jujur)
- Jawaban konsul nyata (`projects/*/handoff/konsul/`) TIDAK ada di repo; hanya format di `orkestrasi.md:25`, `tools/tanya-claude.sh:1-30`, `templates/roles/konsul.md`. Jangan dikarang; tampilkan sebagai tabel format saja.
- Bahan loop lain, nyata: `PENDING.md:25` [I] Irfan: "jelek, aneh, tidak sesuai prinsip" (builder komponen sebelum RESEP, still di latar abu) -> usul `orkestrasi.md` (BELUM aturan, jangan tampil sebagai aturan); `orkestrasi.md:33` "agy -p kosong/timeout ... jalur Gemini diganti subagen Sonnet (gagal: bdf26 v10)"; bus 15 Nov 21:25 "Cache whisper large-v3 hilang… mohon jangan hapus cache model ini".
- Log `log-*.txt` besar (±0,3-0,9 MB) dan memuat konteks sesi lain; ambil hanya baris yang dikutip di atas, jangan tampilkan isi lain (path, daftar sesi pribadi).
- Pasangan K12/1a/papan (TASK-K12-r1/r2/r3, TASK-1a-potong) tersedia bila perlu adegan lebih banyak.
