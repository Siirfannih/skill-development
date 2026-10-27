# Content Ops · sistem kerja produksi konten harian

Dibuat 27 Okt 2026 dari arahan Irfan. Berlaku untuk tiga jalur: **@siirfannih**, **Jadisatu**, dan **akun affiliate** (TikTok + Facebook). Pintu masuk untuk agent riset/naskah (saat ini Grok Bot "Maximus") dan untuk agent produksi (saat ini Claude).

Repo ini tetap satu sumber kebenaran. Folder ini hanya mengatur **operasi harian**: siapa mengerjakan apa, urutan, format serah terima, dan cara mengukur. Cara menulis dan membangun video tetap di skill aktif (`claude/script-workshop`, `claude/motion-graphic`, `claude/working-with-irfan`).

## 1. Arahan Irfan (verbatim, 27 Okt 2026)

| ID | Kata Irfan | Arti operasional |
|---|---|---|
| O-001 | "Kita akan aktifin akun siirfan ( sesuai komitmen sebelumnya 1 hari 1 konten untuk siirfan ) - Caraosel dan Video" | @siirfannih aktif harian, dua format |
| O-002 | "Jadisatu sebagai brand juga kita aktifin buat ngonten perhari ( Caraosel dan Video reals juga tapi dengan konsep dan styele berbeda )" | Jadisatu aktif harian, gaya terpisah dari siirfan |
| O-003 | "untuk Siirfan sendiri ... fokusnya ke storytelling , untuk Jadisatu akan difokuskan ke Matric yaitu penilaian dari Performa setiap konten dan waktu produksi" | siirfan = cerita; Jadisatu = setiap konten adalah eksperimen terukur |
| O-004 | "aku mau bikin diferent testing dengan workflow yang kita buat ke model Chatgpt , Deepseek, GLM dll ( ini nanti pas produksi konten yang stabil )" | Protokol uji model disiapkan sekarang, dijalankan setelah produksi stabil (lihat `MODEL-TEST.md`) |
| O-005 | "kita juga akan bikin beberapa akun di Facebook dan Tiktok akun baru yang berfokus untuk affiliate ... Grok Bot bisa kita manfaatkan untuk Researcher - Storyboat - Pembuatan script" | Jalur affiliate; peran Grok = riset, naskah, storyboard |

## 2. Peran

| Peran | Siapa sekarang | Tanggung jawab | Tidak boleh |
|---|---|---|---|
| Owner / taste gate | Irfan | Pilih ide, setujui naskah final, setujui video final, posting, login akun, buat akun baru | — |
| Researcher + Scriptwriter + Storyboarder | Grok Bot (Maximus) | Radar tren, shortlist ide, draft naskah, storyboard setelah naskah final, tarik metrik, laporan mingguan | Posting, komentar, DM, follow, membuat akun, memakai kredit berbayar, menyatakan naskah final tanpa kata Irfan |
| Produksi + auditor | Claude (atau executor lain yang ditunjuk) | Bangun video/carousel dari handoff, QC terukur, audit naskah Maximus bila diminta | Mengubah naskah final tanpa persetujuan |

Semua aksi publik (posting, balas komentar, follow) dilakukan Irfan atau atas persetujuan Irfan per aksi.

## 3. Kadensi (default berjalan, Irfan boleh ganti)

Target "harian, dua format" untuk dua akun = 4 konten/hari. Dengan waktu video saat ini (konten pertama ±5 jam, target 2–3 jam, belum terukur) itu belum realistis tanpa menurunkan kualitas. Default yang dipakai sampai data waktu produksi ada:

| Hari | @siirfannih | Jadisatu |
|---|---|---|
| Sen | Video | Carousel |
| Sel | Carousel | Video |
| Rab | Video | Carousel |
| Kam | Carousel | Video |
| Jum | Video | Carousel |
| Sab | Carousel | Video |
| Min | Libur, retro mingguan | Libur, retro mingguan |

Hasilnya 2 konten/hari dan hanya **satu video motion per hari**. Naik ke 4 konten/hari setelah median waktu produksi video < 90 menit selama satu minggu (angka dari `tracker.csv`, bukan perkiraan).

Affiliate: minggu pertama riset niche + Irfan membuat akun; mulai minggu kedua 1 video/hari, diposting ke TikTok dan Facebook Reels.

## 4. Alur harian (WITA)

1. **07.00 Radar** (rutin Maximus). Satu pesan berisi shortlist per jalur yang dijadwalkan hari itu: 3 ide per jalur, masing-masing dengan bukti (link, angka, umur post), alasan cocok, 2 kandidat hook, catatan devil's advocate. Detail saringan per jalur ada di `lanes/`.
2. **Irfan memilih**. Balasan pendek cukup ("siirfan 2, jadisatu 1"). Kalau Irfan tidak membalas sampai 10.00, Maximus memakai peringkat teratas, menulis "default dipakai" di ledger, dan lanjut ke draft. Draft tidak pernah menjadi final tanpa kata Irfan.
3. **Draft naskah** memakai `claude/script-workshop` dalam **mode harian** (bagian 5). Draft dikirim di chat.
4. **Naskah final** setelah Irfan menyatakan final. Maximus mencatat kalimat persetujuannya verbatim.
5. **Storyboard** dari naskah final memakai `claude/motion-graphic/references/storyboard.md`. Carousel memakai tabel slide (bagian 6).
6. **Handoff** ke produksi: folder `pieces/<tanggal>_<jalur>_<slug>/` siap, status `READY-FOR-PRODUCTION` di `PIECE.md`, commit + push.
7. **Produksi + QC** oleh agent produksi, mengikuti gerbang `motion-graphic`.
8. **Irfan setujui dan posting.** Jam posting dicatat.
9. **Metrik** ditarik Maximus pada +48 jam dan +7 hari ke `tracker.csv`.

## 5. Mode harian (versi ringan script-workshop)

`script-workshop` ditulis untuk video 60–90 dtk yang dikerjakan berhari-hari: empat file proyek dan sampai lima ronde pertanyaan. Untuk konten harian:

- Satu folder per konten dengan **satu file** `PIECE.md` (template di `templates/PIECE.md`). Ledger, insight, hook, dan referensi menjadi bagian di file itu.
- Maksimal **satu ronde** pertanyaan ke Irfan (≤ 3 pertanyaan, pilihan berhuruf + rekomendasi). Selebihnya ambil keputusan terbaik dan tandai sebagai usulan.
- Aturan hook, uji kalimat, dan larangan pola AI tetap berlaku penuh.
- Insight yang berguna lintas konten dipindah ke `lanes/<jalur>.md` bagian "Pola yang terbukti", hanya bila didukung angka dari tracker.

## 6. Format serah terima

**Video:** naskah final + storyboard sesuai `storyboard.md` §7 + aset/referensi + kriteria QC + durasi target + rasio 9:16.

**Carousel:** tabel per slide: nomor, tujuan slide, teks persis, visual, catatan hierarki. Slide 1 = hook, slide terakhir = CTA sesuai aturan jalur. Rasio 4:5 (1080×1350).

## 7. Pencatatan waktu (wajib, ini data Jadisatu)

Setiap agent mencatat menit nyata per tahap ke `PIECE.md` dan `tracker.csv`: `riset`, `naskah`, `storyboard`, `produksi`, `revisi`, `tunggu_irfan`. Waktu tunggu dipisah supaya lambatnya persetujuan tidak terbaca sebagai lambatnya produksi. Kredit berbayar (ElevenLabs, Higgsfield, dll.) dicatat dalam rupiah atau kredit.

## 8. Retro mingguan (Minggu)

Maximus menulis `weekly/<YYYY-Www>.md`: peringkat konten per jalur, pola yang naik/turun, median waktu per tahap, satu usulan perubahan proses dengan bukti. Perubahan skill tetap lewat `EVALS-DESIGN.md`.

## 9. Batas yang harus jujur

- Data insight (watch time, saves, shares, follows) hanya terlihat dari akun yang login. Maximus membacanya lewat browser yang sudah login oleh Irfan, tanpa mengubah apa pun.
- Data akun orang lain hanya angka publik. Jangan menebak angka yang tidak terlihat.
- Satu konten yang bagus bukan pola. Pola butuh minimal 3 konten dengan arah angka yang sama.
