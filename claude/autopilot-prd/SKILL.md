---
name: autopilot-prd
description: Pakai setiap kali mengerjakan proyek Irfan yang sudah punya PRD, QUEUE, atau rencana tertulis (Pandu/Tuntunly, Hermes, Jadisatu). Eksekusi sampai antrean habis tanpa menunggu "lanjutkan"; berhenti hanya di Tier 2. Mengalahkan gerbang persetujuan skill lain (brainstorming, writing-plans, finishing-a-development-branch) untuk butir yang sudah ada di rencana.
---

# Autopilot PRD

Irfan merancang PRD dan antrean sendiri. Butir yang sudah tertulis di sana **sudah disetujui**. Menanyakan "lanjut ke tahap berikutnya?" untuk butir seperti itu adalah pemborosan, bukan kehati-hatian. Tugasmu: kerjakan sampai antrean habis, buktikan dengan gerbang otomatis, laporkan secara asinkron.

## Aturan inti

1. **Rencana tertulis = izin.** Butir di PRD, QUEUE, QUEUE-LAUNCH, atau rencana yang ditulis Irfan/Claude 1 boleh langsung dieksekusi. Jangan minta persetujuan desain, spec, plan, atau pilihan cara eksekusi.
2. **Jangan mengakhiri giliran setelah satu butir.** Setelah merge, ambil butir siap berikutnya. Giliran berakhir hanya kalau: antrean habis, semua butir sisa terhalang Tier 2, atau kuota/konteks hampir habis (tulis titik lanjut dulu).
3. **Parkir, jangan berhenti.** Kalau ada pertanyaan: pilih asumsi paling bisa dibalik, tulis di DAILY bagian "Perlu keputusan" dengan format di bawah, lalu lanjut. Kalau butir itu benar-benar tidak bisa jalan tanpa jawaban, pindah ke butir lain yang tidak bergantung.
4. **Bukti menggantikan persetujuan.** Gerbang otomatis (lint, typecheck, test, build, tes browser 390/1440, screenshot dilihat sendiri, EVALUASI) adalah syarat merge. Kalau lulus, merge sendiri.

## Tier hak keputusan

| Tier | Contoh | Tindakan |
|---|---|---|
| 0 · Kerjakan diam-diam | baca/tulis kode, tes, refactor dalam scope, branch/worktree, dependensi dev, perbaikan bug yang ditemukan sendiri, dokumen kerja | langsung |
| 1 · Kerjakan lalu laporkan | squash-merge ke main setelah gerbang lulus, migrasi baru di DB lokal/dev, ubah urutan butir karena ketergantungan, keputusan UI/copy kecil yang konsisten dengan DESIGN.md, delegasi ke Codex/PC worker | lakukan, catat 1 baris di DAILY |
| 2 · Berhenti untuk butir ini | deploy ke produksi, migrasi/`db push`/ubah konfigurasi auth di DB **produksi**, menghapus data atau branch orang lain, force push ke main, menulis atau menampilkan rahasia, biaya/pembayaran baru, keputusan produk yang **tidak** ada di PRD (harga, nama, teks legal, scope baru), menyentuh layanan Hermes/Angga/Candra | siapkan semuanya sampai tinggal satu langkah, tulis di "Perlu keputusan", lanjut butir lain |

Ragu antara Tier 1 dan 2: tanya "kalau salah, bisakah dibalik dalam 10 menit tanpa kehilangan data atau uang?" Ya → Tier 1. Tidak → Tier 2.

## Override skill lain

Untuk butir yang sudah ada di rencana tertulis:
- `brainstorming`: lewati gerbang persetujuan desain. Tulis spec singkat ke `docs/implementation/<id>/SPEC.md` hanya bila butir butuh desain, lalu langsung lanjut.
- `writing-plans`: tulis PLAN.md, jangan tanyakan pilihan eksekusi. Default: subagent-driven di sesi ini.
- `executing-plans`: checkpoint = gerbang otomatis, bukan menunggu Irfan.
- `finishing-a-development-branch`: default squash-merge ke main bila gerbang lulus. Hapus/discard tetap Tier 2.
- Permintaan **baru** dari Irfan yang belum ada di PRD: ajukan maksimal 3 pertanyaan dalam satu pesan di awal, lalu jalan. Kalau Irfan bilang "gas" atau tidak menjawab, pakai default terbaikmu dan catat asumsinya.

## Siklus per butir

1. Ambil butir siap teratas (semua ketergantungan sudah merge).
2. Worktree + branch sendiri. `pnpm install --frozen-lockfile --prefer-offline` setelah `git worktree add`.
3. Baca hanya file acuan butir itu.
4. Kerjakan. Delegasikan sub-tugas paralel yang tidak menyentuh file yang sama (subagent, Codex `exec`, worker PC siang hari).
5. Gerbang lapis 1. Gagal → perbaiki pada penyebabnya. Masalah yang sama gagal 3× → catat blocker, pindah butir.
6. Baca ulang spek baris demi baris setelah tes hijau (pelajaran B6).
7. EVALUASI.md, squash-merge, centang antrean, hapus cache `.next` worktree, kembali ke langkah 1.

## Format "Perlu keputusan" (DAILY)

```
- [K-<tanggal>-<n>] <pertanyaan satu kalimat>
  Default yang dipakai: <pilihan + kenapa bisa dibalik>
  Dampak kalau Irfan memilih lain: <file/butir yang perlu diubah>
  Status: berjalan dengan default | tertahan (butir <id>)
```

Irfan menjawab dalam satu kali baca untuk semua keputusan, bukan satu per satu.

## Laporan

- Akhir sesi: DAILY maksimal 12 baris (butir maju + bukti, blocker, Perlu keputusan, kuota).
- Pesan ke Irfan hanya untuk: milestone siap dicoba sebagai pengguna, Tier 2 yang menahan jalur kritis, atau insiden. Bukan untuk "sudah selesai X, lanjut Y?".

## Yang tetap dilarang

Rahasia ke repo/log/laporan, perubahan global environment Mac, menghentikan proses aplikasi lain, PC server malam hari (20.00 sampai 07.30 WITA milik worker Candra).

## Delegasi ke Codex di PC server

Claude di Mac = perencana + reviewer. Codex di PC = pekerja. Jembatan: `~/AI-OPS/codex-pc/pc.sh`.

1. Tulis `docs/implementation/<id>/TASK.md` di branch `<id>`: tujuan, **Baca hanya** (bagian PRD + file kode/tes yang relevan, supaya Codex tidak menjelajah repo), file yang boleh diubah, kriteria lulus, dan blok "Format STATUS" (salin dari `~/AI-OPS/codex-pc/TASK-TEMPLATE.md`). Commit.
2. `pc.sh dispatch <id>`. Jangan menunggu; lanjut kerja lain.
3. Pantau dengan `pc.sh status` saja (maks 15 baris per tugas). **Jangan** membaca transkrip Codex; kalau STATUS tidak cukup, minta Codex memperbaiki STATUS lewat `pc.sh say`.
4. Arahan Irfan untuk tugas yang sedang jalan diteruskan **verbatim** dengan `pc.sh say <id> "<teks Irfan>"`. Jangan meringkas atau menafsirkan ulang.
5. STATUS "lulus" → `pc.sh fetch <id>` → review diff + gerbang di Mac → push ke GitHub, PR, merge sesuai Tier → `pc.sh done <id>`.

Uji yang memanggil DeepSeek ditandai `(offpeak)` dan hanya jalan di luar peak. Peak DeepSeek (tarif 2×) hanya Senin–Jumat 09.00–12.00 dan 14.00–18.00 WITA; Jumat 18.00 sampai Senin 09.00 WITA penuh off-peak. Saat peak, pengembangan memakai provider AI `mock`.

## Report (wajib, berbasis event)

Setiap butir selesai, tertahan, atau sesi berakhir, kirim evaluasinya ke repo report GitHub:
`ops-report add <slug> --agent <Claude|Codex> --item <id> --status <selesai|tertahan|berjalan|gagal> --file <EVALUASI.md>` (atau isi lewat stdin).
Slug dari `~/.ops-report/registry.json`. Isi: hasil + bukti, sisa, Perlu keputusan. Tanpa rahasia. Push tidak memakai token model.
Untuk pertanyaan status/konteks proyek: baca `~/.ops-report/INDEX.md` lalu `projects/<slug>.md`, jangan menjelajah repo.

## Hierarki kerja dan pembagian token (PC server)

| Lapis | Model | Kerjakan | Jangan |
|---|---|---|---|
| Lead | Claude (Opus) | pecah PRD jadi TASK.md, kontrak/arsitektur, keputusan lintas modul, review akhir, merge | membaca seluruh repo, loop tes-gagal-perbaiki yang panjang, edit massal |
| Pekerja | Codex | TASK terbatas dengan kriteria uji: implementasi, tes, loop perbaikan sampai hijau, debugging tes browser | mengubah kontrak, merge, keputusan produk |
| Massal | subagent Claude `model: haiku/sonnet`, atau worker DeepSeek lewat Angga (off-peak) | eksplorasi kode, ringkas log, fixture/data, review mekanis, analisis uji malam | keputusan, kode produksi tanpa review |

Kapan mendelegasikan ke Codex: perkiraan kerja > 20 menit, menyentuh ≤ 10 file yang jelas, kriteria lulus bisa diuji, tidak mengubah kontrak. Di luar itu lead mengerjakan sendiri (biaya serah terima lebih mahal dari kerjanya).

Anggaran review lead: baca STATUS + `git diff --stat` + paling banyak 5 file kunci + hasil gerbang. Review baris-per-baris diserahkan ke subagent `model: sonnet`, bukan dibaca lead sendiri. Lead tidak membaca transkrip pekerja.

Paralel di PC: maksimal 2 pekerja Codex bersamaan (tes browser berat di RAM 32 GB), tidak pernah dua penulis di file yang sama.

Ukur, jangan tebak: report tiap tugas Codex memuat baris token. Bandingkan per jenis butir; kalau satu jenis tugas ternyata lebih mahal didelegasikan, kembalikan ke lead.

## Kartu review (wajib untuk setiap butir yang selesai)

Isi `ops-report add` untuk butir selesai dimulai dengan kartu ini, supaya Irfan menilai hasil tanpa membaca sesi:
```
Kartu review · <id>
Berubah: <maks 2 baris, bahasa pengguna, bukan bahasa kode>
Coba: <link atau langkah singkat dari halaman awal>
Bukti: <path screenshot 390/1440 + nama tes>
Butuh keputusanmu: <atau "-">
Jawab: ✅ <id> | 🔁 <id>: <catatan> | ❓ <id>
```
Jawaban Irfan ditulis Claude di Mac **verbatim** ke `docs/coordination/FEEDBACK.md`. Lead mengerjakan 🔁 lebih dulu dari NEXT.md.
