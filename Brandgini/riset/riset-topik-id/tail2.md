
### (d) Pipeline hemat token

| Tahap | Siapa | Model / alat | Output | Catatan hemat |
|---|---|---|---|---|
| 1. Pilih topik + fact sheet | **Manda** (koordinator) | Riset sendiri (web/YouTube) | `fakta.md` per topik: 5–8 fakta + link sumber, bagian yang wajib dihindari | Satu batch untuk 7 topik sekaligus per minggu; tidak memakai worker. |
| 2. Naskah | Worker PC **Claude Sonnet** | Sonnet (default) | Naskah tabel detik/VO/visual seperti contoh di atas | Brief berisi template + fact sheet; jangan izinkan fakta di luar fact sheet. Opus hanya kalau naskah gagal QC dua kali. **Tidak memakai Fable.** |
| 3. QC naskah | **Manda** | — | Lolos / revisi | Cek: hook ≤12 kata, 130–150 kata, tiap klaim ada di fact sheet, tanpa nasihat keuangan/medis. |
| 4. Voice | **Irfan** (rekam HP) atau TTS (perlu izin biaya) | — | `vo.wav` | Rekam 7 naskah sekaligus, 1 sesi seminggu. |
| 5. Timing caption | Worker PC | Whisper lokal / skrip | `words.json` per kata | Tanpa LLM. |
| 6. Animasi | Worker PC **Codex** (effort medium) atau **Claude Sonnet** | Remotion + komponen bersama (caption, palet, SFX) | `render.mp4` 1080×1920 | Komponen dibuat sekali (Opus boleh untuk merancang kit dasar); per video hanya adegan baru. |
| 7. QC video | Skrip otomatis + **Manda** | ffprobe/ffmpeg + lihat 6 frame | Laporan QC | Otomatis: durasi 45–60 dtk, -14 LUFS, caption tidak keluar zona aman, tanpa file SFX kayu. Manda melihat frame 0, 3, 15, 30, 45, dan akhir. |
| 8. Upload | **Irfan** menyetujui, lalu upload (manual atau terjadwal) | YouTube Studio + Meta Business Suite | Link | **Tidak ada posting tanpa persetujuan Irfan.** Otomasi upload baru setelah dia OK. |

Catatan: `aops` saat ini belum punya flag model. Usulan menambah `--model` (Sonnet default, Opus maks) masih menunggu OK Irfan, dan perubahan file agent-ops wajib lewat `aops change`. Skema ini belum dijalankan dan aops tidak saya sentuh.

Perkiraan beban per video: Manda ±1 fact sheet + 2 QC; worker 1 naskah + 1 render. Token terbesar ada di animasi, jadi kit komponen bersama adalah penghemat utama.

### (e) KPI & aturan evaluasi

Angka ambang di bawah adalah titik awal saya, **bukan standar resmi**; disesuaikan setelah 30 video.

| KPI | Kapan | Target awal | Tindakan |
|---|---|---|---|
| Views YouTube 48 jam | tiap video | ≥1.000 normal, ≥10.000 bagus, ≥100.000 hit | Hit: buat 2–3 lanjutan dengan pilar/pola yang sama dalam 7 hari. |
| Viewed vs swiped away (Shorts) | 48 jam | ≥65% | Di bawah 50%: hook dan frame 1 jadi bahan perbaikan untuk video berikutnya. |
| Rata-rata % ditonton | 48 jam | ≥80% (loop bisa >100%) | Di bawah 60%: build terlalu lambat; potong ke 45 dtk. |
| Views FB Reels 48 jam + rata-rata waktu tonton | tiap video | belum ada patokan (data FB belum terverifikasi) | Catat saja selama 30 hari, lalu bandingkan dengan YouTube. |
| Subscriber per 1.000 views | mingguan | ≥2 | Rendah: tambah seri bernomor/berulang. |

Aturan ganti pilar:
- Setiap pilar dinilai setelah **minimal 6 video**.
- Kalau median 48 jam suatu pilar < 50% dari median channel, pilar itu **dijeda** 2 minggu dan slotnya diberikan ke pilar terbaik.
- Pilar dengan 2 hit (≥100 rb) dalam 10 video **dinaikkan** menjadi 1 slot per hari.
- **Jangan** upload ulang video yang flop dengan hook baru. Itu duplikat. Hook baru dipakai untuk topik baru.
- Review mingguan oleh Manda (Senin): tabel views 48 jam, retensi, dan keputusan pilar. Dikirim ke Irfan sebagai ringkasan, bukan sebagai posting.

### (f) Nama channel kandidat

Ketersediaan handle YouTube/Facebook **belum dicek satu per satu**. Pencarian cepat menemukan channel kecil bernama mirip "Rakit Nol" dan "Di Balik Struk"; nama di bawah dipilih supaya tidak bertabrakan dengan "Kok Bisa?" (6,5 jt subscriber) atau "Kita Bedah".

| Nama | Positioning |
|---|---|
| **Rakit Sendiri** | "Kita rakit sistemnya dari nol." Paling jujur ke format; mudah jadi seri. |
| **Mesin Rupiah** | Mesin yang menggerakkan uangmu sehari-hari (ATM, tol, SPBU, kasir). Paling dekat ke pilar pemenang. |
| **Di Balik Mesin** | Mesin dan pabrik yang kamu pakai tiap hari, dibongkar satu per satu. |
| **Ternyata Sistemnya** | Gaya penasaran ("ternyata…"), luas untuk semua pilar. |
| **Jalur Rupiah** | Menelusuri ke mana uang dan barangmu pergi (ongkir, uang lusuh, bensin). Cocok kalau fokus uang dipertajam. |

Rekomendasi saya: **Rakit Sendiri** (format jadi merek, tidak terkunci di satu pilar) atau **Mesin Rupiah** kalau Irfan ingin mempertegas sudut uang.

## 6. Yang belum terverifikasi

- **Facebook Reels:** tidak ada angka views Reels untuk niche ini. Meta tidak menyediakan data publik per Reel, dan riset tanpa login tidak bisa membacanya. Semua bukti di atas berasal dari YouTube.
- **TikTok:** tidak saya tarik di sesi ini (tanpa login/API). Bukti TikTok kosong.
- **Google Trends per kata kunci "kenapa…/cara kerja…" 2026:** belum ditarik; yang ada hanya Year in Search 2025.
- **Angka KB/PPK/ID/CC/WH/LR** dari daftar channel dibulatkan dan tanggalnya tidak dibaca satu per satu.
- **Topik bertanda "—"** belum punya bukti; skornya tebakan.
- **Mekanisme di tiga naskah contoh** masih perlu dicek ke sumber Indonesia (Pertamina/ESDM/Metrologi untuk SPBU, standar ATM, Hotelling). Saya menulisnya dari pengetahuan umum dan menandai bagian yang rawan.
- **Jam tayang, ambang KPI, dan 2 video per hari** adalah hipotesis. Kita Bedah mengunggah ±7 per hari dan tetap tumbuh, tapi kebijakan YouTube tentang konten berulang membuat saya memilih 1–2 per hari.
- **Ketersediaan nama channel** belum dicek.
- **Cara produksi pesaing** (AI generatif atau manual) dan negara penontonnya tidak bisa dipastikan.
