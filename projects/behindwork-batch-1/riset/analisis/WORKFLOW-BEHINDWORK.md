# Workflow Produksi Behindwork (v0, 22 Nov 2026)

Behindwork: video vertikal 9:16, 45–90 dtk, full motion dan digital. Cerita perjalanan founder/startup dari sudut yang jarang diketahui, ditutup dengan satu pelajaran. Semua B-roll diambil dari internet (klip YouTube, foto arsip, headline, kutipan), tidak ada syuting.

Prinsip utama: **akurat dulu, baru menarik.** Klaim viral yang salah dijadikan hook koreksi ("Katanya Jensen Huang dulu tukang cuci mobil. Salah.").

Dokumen pendukung (folder ini):
- `RISET-METODE-DAN-PILOT.md`: protokol riset, label keyakinan, panduan footage, risiko hak cipta, 15 kandidat cerita, pilot Jensen.
- `STRUKTUR-SCRIPT.md`: pola hook dan beat dari 22 transkrip, template script, contoh script Jensen.
- `ANALISIS-VISUAL-REFERENSI.md`: bedah shot `arthurcrockbooks` dan `rt2rj`, style guide v0 (font, palet, kosakata motion, tempo).
- `../transkrip/`: transkrip semua video (md + json bertimestamp).

---

## Alur 7 tahap per video

| # | Tahap | Hasil | Gerbang lolos |
|---|---|---|---|
| 1 | Pilih cerita | 1 baris angle + 1 baris pelajaran | Angle bisa diverifikasi; bukan gosip/skandal |
| 2 | Deep research | `riset.md` (lembar riset) | Tiap klaim punya ID, ≥2 sumber independen, label TINGGI/SEDANG |
| 3 | Script | `script.md` (tabel waktu, VO, teks layar, visual, ID sumber) | Semua kalimat fakta menunjuk ID sumber; durasi sesuai anggaran kata |
| 4 | Sourcing footage | `footage/` + `footage.csv` | Tiap baris visual punya file + URL + timestamp + lisensi |
| 5 | Konsep editing | `storyboard.md` (mode panggung + motion per beat) | Tiap beat memakai kosakata motion dari style guide |
| 6 | VO + edit | Render 1080×1920 | Gerbang QC (bawah) |
| 7 | Publish + arsip | Caption + daftar sumber di caption/komentar | Sumber tercantum |

Struktur folder per episode:
```
Behindwork/episode/<NN-slug>/
  riset.md  script.md  footage.csv  storyboard.md
  footage/  audio/  render/
```

---

## Tahap 1 · Pilih cerita

Kriteria angle (minimal 3 dari 4):
1. **Tidak diketahui umum:** bukan "Steve Jobs drop out", tapi detail yang membuat orang berhenti scroll.
2. **Kontras:** posisi dulu vs sekarang (pencuci piring → chip AI).
3. **Bisa dibuktikan:** ada sumber primer (wawancara, buku, filing, arsip).
4. **Punya pelajaran yang bisa dipakai penonton**, bukan sekadar trivia.

Bonus: ada mitos populer yang bisa dikoreksi. Tolak cerita yang inti sumbernya hanya listicle, situs kutipan, atau konten AI.

Cek konteks terbaru sebelum mulai: status founder saat ini (masih CEO? sudah mundur? ada kasus hukum?). Contoh: per 12 Nov 2026 Jensen Huang mundur sebagai CEO NVIDIA, Colette Kress CEO interim. Ia ditulis "co-founder NVIDIA" atau "mantan CEO", dan video tetap fokus pada cerita awal, bukan skandal.

## Tahap 2 · Deep research

Ikuti `RISET-METODE-DAN-PILOT.md` §2. Ringkasnya:
1. Kumpulkan sumber dari tier tertinggi dulu: wawancara/ceramah founder (video dengan timestamp), buku/biografi resmi, filing SEC/arsip perusahaan, lalu media kredibel.
2. Tulis setiap klaim sebagai baris: `ID | klaim | sumber 1 (URL+timestamp/halaman) | sumber 2 | label`.
3. Kutipan wajib dicek ke sumber asli (video + menit). Kutipan yang hanya ada di situs kutipan tidak dipakai.
4. Angka dan tanggal dicek ulang, angka valuasi ditulis dengan tanggal ("per Nov 2026").
5. Myth-check: cari versi viral cerita ini, catat bagian yang salah atau dilebihkan. Bagian ini sering jadi hook.
6. Sambil riset, catat **kandidat visual** per klaim (foto arsip, klip wawancara di menit sekian, headline). Riset dan sourcing berjalan bersamaan supaya tidak mencari dua kali.

Klaim berlabel RENDAH tidak masuk script. Klaim SEDANG boleh masuk dengan kata pelunak ("menurut wawancaranya tahun 2023…").

## Tahap 3 · Script

Pakai template di `STRUKTUR-SCRIPT.md`. Kerangka dasar 45–60 dtk:

| Beat | Waktu | Fungsi |
|---|---|---|
| Hook | 0–3 dtk | Kontras / koreksi mitos / angka + nama. Satu kalimat. |
| Setup | 3–10 dtk | Siapa, kapan, di mana. Buka loop ("tapi ada satu hal yang jarang diceritakan"). |
| Cerita | 10–40 dtk | 3–4 beat eskalasi, tiap beat satu fakta konkret + visual bukti. Re-hook di tengah. |
| Titik balik | ±3/4 durasi | Momen keputusan; kutipan asli founder bila ada. |
| Pelajaran | 5–8 dtk | Satu kalimat yang bisa dipakai penonton, tidak menggurui. |
| CTA / loop | 2–4 dtk | Komentar kata kunci, follow untuk seri, atau kalimat yang menyambung ke hook. |

Format kolom: `waktu | VO | teks layar | visual/B-roll | ID sumber`. Bahasa Indonesia lisan, kalimat pendek, satu ide per kalimat.

## Tahap 4 · Sourcing footage

Panduan lengkap di `RISET-METODE-DAN-PILOT.md` §3. Aturan praktis:
- Prioritas: press kit/newsroom perusahaan, Wikimedia Commons/public domain, arsip (archive.org, Library of Congress), lalu klip YouTube wawancara/keynote.
- Klip YouTube diambil pendek (umumnya ≤3–5 dtk per potong), ditransformasi (crop 9:16, grade, overlay teks, narasi kita), sumber dicantumkan di layar atau caption.
- Unduh potongan langsung by timestamp:
  ```bash
  yt-dlp --download-sections "*1:23-1:31" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" <URL>
  ```
- Headline/artikel: screenshot bersih (mode baca), untuk efek Paper Fly-in.
- Catat semua di `footage.csv`: `beat | file | URL | timestamp | jenis | lisensi/catatan`.
- Kekurangan visual untuk ide abstrak diisi motion graphic (text-only beat, diagram, glow orb), bukan stok generik yang tidak relevan.

Catatan risiko: penggunaan klip berhak cipta untuk komentar pendek ada di wilayah abu-abu (fair use AS, UU 28/2014 di Indonesia). Mitigasinya ada di dokumen riset §3.2. Klaim Content ID tetap mungkin terjadi.

## Tahap 5 · Konsep editing

Dua mode panggung dari referensi, dipilih per episode atau per bagian:

| Mode | Asal | Ciri | Cocok untuk |
|---|---|---|---|
| **Editorial** | `arthurcrockbooks` | Tiga panggung bergantian (biru polos text-only, putih diagram, footage B&W/warm); lockup serif besar + sans kecil; Paper Fly-in untuk bukti; ±1,5 dtk per beat | Cerita dengan banyak bukti, angka, headline |
| **Kolase** | `rt2rj` | Satu kanvas gradien periwinkle tanpa cut; cut-out duotone + metafora surreal; teks condensed caps per kata; orbit/ripple/pixel dissolve; ganti adegan ±3 dtk | Cerita emosional/konseptual, sedikit footage bagus |

Storyboard per beat: `waktu | mode | latar | elemen | motion (nama dari kosakata) | teks layar | SFX`. Pakai nama motion dari style guide (Word Build, Lockup Snap, Card Stack, Paper Fly-in, Highlight Swipe, Stroke Draw, Orbit Ring, Ripple Pulse, Pixel Dissolve, Ken Burns Slow, Parallax 2.5D, Text-only Beat, dll).

Aturan ringkas: maksimal 2 keluarga font, tidak ada layar diam >1,5 dtk, bukti ditahan ≥1,5 dtk agar terbaca, satu jenis transisi "berisik" per video, grain 3–5% selalu aktif.

## Tahap 6 · VO dan edit

1. VO dulu (rekam suara sendiri atau TTS), lalu ambil timestamp kata (Whisper `word_timestamps`) untuk sinkron teks layar.
2. Edit di Remotion (skill `remotion-*` dan `motion-graphic` sudah tersedia) memakai komponen per kosakata motion, supaya episode berikutnya tinggal ganti data.
3. Musik ambient/piano rendah, SFX whoosh/pop/impact sesuai §9 style guide.

**Gerbang QC sebelum publish:**
- [ ] Setiap fakta di VO dan teks layar cocok dengan lembar riset (ID ada, label ≥ SEDANG).
- [ ] Nama, ejaan, tahun, angka benar; status founder terkini benar.
- [ ] Teks di safe zone, terbaca di HP, tidak tertutup UI Reels.
- [ ] Tidak ada layar statis >1,5 dtk; hook visual berubah 2–3 kali dalam 3 dtk pertama.
- [ ] Sumber dicantumkan (layar dan/atau caption).

## Tahap 7 · Publish dan arsip

Caption: 1 kalimat hook ulang, pelajaran, daftar sumber singkat. Simpan riset, script, footage.csv, render final ke folder episode, lalu salin hasil akhir ke `AI-Cloud/Projects/behindwork/Outputs`.

---

## Pembagian kerja dengan AI (opsional)

| Tahap | Bisa didelegasikan | Tetap dicek manusia |
|---|---|---|
| Riset | Agen deep research mengisi lembar riset | Klaim kunci dan kutipan dibuka sendiri |
| Script | Draft dari template | Nada suara, pilihan hook |
| Sourcing | Daftar URL + timestamp, unduh via yt-dlp | Relevansi dan kualitas klip |
| Edit | Render Remotion dari storyboard | Audit visual frame per frame |

## Perlu keputusan

1. **Episode pertama Jensen Huang:** jalan sekarang dengan konteks netral ("co-founder, mantan CEO"), atau tunda sampai berita mundurnya mereda? Default: jalan, fokus ke cerita Denny's dan Oneida.
2. **Mode visual default:** Editorial (arthurcrockbooks) atau Kolase (rt2rj)? Default: Editorial untuk episode berbasis bukti.
3. **VO:** suara sendiri atau TTS? Default: suara sendiri.
