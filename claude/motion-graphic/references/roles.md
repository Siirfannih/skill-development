# Dua peran: Sutradara dan Editor (layer komunikasi)

Dibaca di gerbang 0 setiap pekerjaan video. Gerbang 0–12 di `SKILL.md` §4 tidak berubah; file ini hanya mengatur **siapa** mengerjakan gerbang mana dan **bagaimana** keduanya berbicara (Irfan 11 Nov).

## Isi
1. Kenapa dipecah
2. Peran dan batasnya
3. Peta gerbang
4. Folder serah terima
5. Protokol satu ronde
6. Menjalankan Editor
7. Kapan boleh satu peran
8. Menguji hipotesis

## 1. Kenapa dipecah

- **Hipotesis Irfan (11 Nov, belum terbukti):** satu agen yang merancang sekaligus membangun memuat semua file dan kualitasnya turun.
- **Angka beban konteks (diukur 11 Nov):** `SKILL.md` + `references/` + `guide/` + `guide/referensi/` + `RETRO.md` + `working-with-irfan` = ±306 KB, ±78 ribu token, sebelum transkrip, kode, dan log render. Editor hanya butuh ±25 % dari itu.
- **Pelajaran yang sudah ada di repo:**
  - Kritik yang diberi catatan pembuat cenderung menyetujui; kritik buta lebih jujur (`experimental/dual-agent-sound`).
  - Catatan konteks dikutip seolah temuan, jadi konteks yang diserahkan harus netral (`dual-agent-sound`).
  - Satu sumber kebenaran per beat, perbaikan menyebut ID beat + ID temuan, devil's advocate sebelum temuan sampai ke builder (`autopilot-video/DESIGN.md` §3–4).

Model sama, konteks beda: Sutradara memegang **kenapa**, Editor memegang **bagaimana**.

## 2. Peran dan batasnya

| | **Sutradara** (sesi utama, bicara dengan Irfan) | **Editor** (subagen, membangun video) |
|---|---|---|
| Tugas | Intake, pertanyaan ke Irfan, bedah referensi, memilih gaya (`templates/gaya/`), rencana edit + menu opsi, kontrak beat, review buta, devil's advocate, Delivery Gate, laporan ke Irfan | Persiapan media, build tiap beat, still, render, sound sesuai cue, gate mekanis, laporan berbukti |
| Membaca | `working-with-irfan`, `SKILL.md`, `guide/`, cabang keputusan (`decision*.md`, `storyboard.md`, `analysis-qa.md`, `copywriting.md`, `delivery-gate.md`), `projects/<proyek>/`, RETRO, referensi | **Hanya** `handoff/` + file yang disebut di `TASK` (biasanya `templates/gaya/<gaya>/STYLE.md`, `build.md`, `typography.md`, `smooth-motion.md`, skill engine: Remotion / `engines/talking-head-reels/`) |
| Menulis | `handoff/BRIEF.md`, `PLAN.json`, `TASK-rN.md`, `REVIEW-rN.md`, `DECISIONS.md` | Kode build, aset, render, `handoff/REPORT-rN.md`, `handoff/QUESTIONS.md` |
| Tidak boleh | Menulis kode build atau render (kecuali skrip ukur), menyetujui hasil tanpa melihat still | Bicara ke Irfan, mengubah `PLAN.json`/`BRIEF.md`, menebak hal yang tidak ada di TASK, menulis "final", membaca RETRO atau seluruh skill |

Instruksi Irfan selalu melewati Sutradara. Editor tidak pernah menerima chat mentah Irfan; ia menerima TASK yang sudah diterjemahkan, ber-ID, dan terukur.

## 3. Peta gerbang

| Gerbang (`SKILL.md` §4) | Sutradara | Editor |
|---|---|---|
| 0 Muat konteks | ✔ | memuat `handoff/` saja |
| 1 Brief (+ pilih gaya) | ✔ | — |
| 2 Script / daftar potongan | ✔ | transkrip kata per kata + potong jeda (TASK r0) |
| 3 Bedah referensi | ✔ termasuk tabel kalimat → adegan (`analysis-qa.md` §2) | — |
| 4 Storyboard / rencana edit menu | ✔ Irfan memilih | — |
| 5 TYPE-TEST + TRANSITION-SHEET | review | membangun still |
| 6 Suara dikunci | mengunci | menyiapkan audio |
| 7 Validasi satu adegan | review buta | membangun |
| 8 Build semua adegan | review buta per beat | membangun |
| 9–10 SFX, musik | menyusun cue sheet dari event + review dengar | menempatkan, mixing |
| 11 Preview + QA | devil's advocate, Delivery Gate | menjalankan gate mekanis, melapor angka |
| 12 Kirim | ✔ | — |

## 4. Folder serah terima

`projects/<proyek>/handoff/` (klip tanpa folder proyek: `<folder video>/handoff/`). Kerangka: `templates/roles/handoff.md`.

| File | Ditulis | Isi |
|---|---|---|
| `BRIEF.md` | Sutradara | Brief Irfan apa adanya, keputusan terkunci, gaya terpilih + token, Hard Gate yang relevan, aset + lisensi. Netral: fakta dan keputusan, bukan cerita proses |
| `MENU.md` | Sutradara | Rencana edit 3 opsi per beat untuk dipilih Irfan (`templates/gaya/README.md`); pilihan masuk PLAN |
| `PLAN.json` | Sutradara | Beat: `id`, waktu, kata, jenis adegan (ID dari gaya), opsi terpilih, teks layar persis, SFX `peran`+`alasan`, `lulus_bila` terukur. Format `beats.json` storyboard + `adegan` dan `lulus_bila` |
| `TASK-rN.md` | Sutradara | Cakupan ronde (beat mana), file yang boleh dibaca, keluaran wajib, temuan yang harus diperbaiki (ID), yang tidak boleh berubah |
| `REPORT-rN.md` | Editor (Sutradara menyimpan bila subagen dilarang menulis file laporan) | Yang dikerjakan per beat, path bukti (still sheet, render, keluaran gate), angka, penyimpangan dari TASK + alasan |
| `QUESTIONS.md` | Editor | Pertanyaan alih-alih menebak; Sutradara menjawab sendiri atau meneruskan ke Irfan |
| `REVIEW-rN.md` | Sutradara | Temuan `F-rN-xx` → beat, bukti (timestamp/frame), kriteria terukur, hasil devil's advocate (LOLOS/BUANG + alasan) |
| `DECISIONS.md` | Sutradara | Keputusan + sumber (Irfan / default + alasan) |

## 5. Protokol satu ronde

1. Sutradara menulis `TASK-rN.md`. Satu TASK = satu tujuan yang bisa dicek (mis. "B01–B05 still + render tanpa audio").
2. Editor membangun, menjalankan gate mekanis yang disebut TASK, menulis `REPORT-rN.md`. Ragu = `QUESTIONS.md`, lalu lanjut ke beat lain.
3. **Review buta:** Sutradara melihat still/render dan mengukur sendiri **sebelum** membaca REPORT. Setelah itu baru REPORT dibaca untuk mencocokkan angka.
4. **Devil's advocate per temuan** (`working-with-irfan` §2a): apakah melanggar BRIEF/PLAN/Hard Gate, atau hanya selera? Bisakah diukur? Apakah merusak beat yang sudah lolos? Temuan yang tidak lolos dibuang dan dicatat.
5. Temuan yang lolos masuk `TASK-r(N+1).md` dengan ID. Beat yang lolos dikunci (`scripts/baseline_lock.py`).
6. Maks 3 ronde per beat; gagal 2× di butir sama = ganti pendekatan; gagal 3× = tanya Irfan dengan frame sebelum/sesudah + 2 opsi.
7. Revisi Irfan: Sutradara memberi nomor setiap catatan, menunggu Irfan selesai ("udah", "go"), menerjemahkan ke satu TASK, Editor mengerjakan dalam satu putaran. Setiap putaran = versi baru, versi yang sudah dilihat Irfan tidak ditimpa.

## 6. Menjalankan Editor

- **Claude Code:** `Agent` (subagent_type `general-purpose`), prompt = isi `templates/roles/editor.md` dengan path proyek dan TASK terisi. Ronde berikutnya diteruskan ke Editor yang sama (`SendMessage`) supaya konteks build tetap ada. Editor mati atau konteks penuh = Editor baru membaca `handoff/` dari awal; semua status ada di file, bukan di chat.
- **Render panjang:** Editor menjalankannya di latar belakang dan melapor saat selesai.
- **Klien lain** (Codex, `claude -p`): prompt yang sama; folder serah terima sama.
- Sutradara tidak memanggil lebih dari satu Editor untuk beat yang sama. Beberapa video sekaligus: satu Editor per video (`SKILL.md` §4).

## 7. Kapan boleh satu peran

Perubahan sekecil satu angka/teks di satu beat yang sudah terkunci, atau pertanyaan tanpa build: Sutradara boleh mengerjakan sendiri dan mencatatnya di `DECISIONS.md`. Selebihnya dua peran.

## 8. Menguji hipotesis

Belum terbukti. Uji yang diusulkan (`evals/cases/mg-052-uji-dua-peran.json`): brief + footage yang sama, (A) satu agen, (B) Sutradara + Editor. Bandingkan: skor rubrik R1–R7 oleh `video-reviewer` tanpa tahu versi, jumlah revisi Irfan sampai "oke", pelanggaran Hard Gate, waktu dan token. Hasil masuk `evals/results/`; sampai ada hasil, jangan melaporkan dua peran sebagai "lebih baik".
