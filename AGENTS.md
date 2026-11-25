> **Invarian kerja** (berlaku di atas isi lain di file ini; ringkasannya menjaga penalaran mekanikal dan gerbang mutu):
> 1. **Cookbook = perpustakaan mekanik, bukan template.** Konsep user + 2–4 kartu mekanik cookbook = output baru. Jangan membuat template gaya tetap atau menyalin gaya antar proyek.
> 2. **Promosi aturan hanya lewat `SARINGAN.md`** (S = proyek, P = pertimbangan, H = hukum netral-gaya terukur). Selera satu proyek tidak naik ke aturan global.
> 3. **Gerbang pemilik tidak dilewati.** Konsep/topik, naskah final, serta storyboard + tabel racikan cookbook disetujui pemilik sebelum produksi atau pemakaian kredit.
> 4. **Aturan = praktik terbaik, bukan hukum tetap.** Lantai, kartu, `render.sh final`, `gerbang_produksi.sh`, `scripts/gate/*` = default; kondisi nyata video/suara/frame menang. Melewati gerbang boleh dengan satu baris alasan + bukti di LOG. Alat gerbang tidak diubah demi satu video.
> 5. **Baca dulu, jangan menebak.** Bahan sumber dan outbox/proyek terkait dibaca sebelum menyimpulkan atau memberi perintah.

# Bekerja di Skill Development

Repo ini menyimpan cara kerja AI bersama Irfan.

**Sesi produksi video (satu video = satu sesi terpisah):** muat [claude/motion-graphic/MOTION-CORE.md](claude/motion-graphic/MOTION-CORE.md) + `claude/motion-graphic/cookbook/00-core-invariants.md`, lalu `projects/<proyek ini>/` (jangan mengintip atau menyalin racikan episode lain; bila arah visual belum terkunci di brief, ajukan pertanyaan pengunci dulu). Kartu cookbook dimuat per kartu: cari per beat dengan `claude/motion-graphic/scripts/cookbook/pilih_kartu.py` (filter `--pack` dari tabel tipe konten `cookbook/INDEX.md`) dan buka hanya 2–4 kartu untuk seluruh video; pack utuh, `PETA.md`, `RETRO.md`, `SUMBER.md`, `cookbook/CATALOG.md`, dan `_vault/` utuh tidak dimuat di awal sesi.

**Sesi lain (naskah, revisi, perubahan skill), pintu masuknya satu: file ini → [PETA.md](PETA.md) → [PENDING.md](PENDING.md).** Tabel Rute di PETA menunjuk file yang dibuka untuk pekerjaanmu, jadi buka hanya itu, bukan seluruh repo. [README.md](README.md) dan [INDEX.md](INDEX.md) adalah katalog, bukan pintu. Urutan otoritas: §Cara membaca repo ini butir 2.

## Cara membaca repo ini

Berlaku untuk pekerja, subagen, dan auditor. Tujuannya: setiap keputusan diambil dari aturan yang benar-benar dibaca, bukan dari ingatan atau pencarian kata.

1. **Satu pintu, bacaan awal kecil.** Sesi produksi video: `claude/motion-graphic/MOTION-CORE.md` → `projects/<proyek>/`; butir di bawah ini berlaku untuk sesi lainnya. Mulai dari file ini → tabel **Rute** di PETA (hanya tabel itu; katalog di bawahnya dibuka untuk mencari file) → PENDING. Tugas video: setelah itu `claude/irfan-creative-workflow/SKILL.md` §2 (tahap Brief → Naskah → Storyboard/block out: bedah bahan user dulu, naskah, storyboard dengan racikan kartu cookbook, persetujuan user; belum ada kode sebelum storyboard disetujui), lalu `claude/motion-graphic/MOTION-CORE.md` (tabel tahap kanonik, 10 aturan Lantai, gerbang render), lalu `projects/<proyek>/TAHAP.md`; `scripts/juri/tahap.py` menunjuk langkah berikutnya dan bagian yang dibaca untuk langkah itu. `claude/motion-graphic/SKILL.md` dibuka per bagian saat langkah menyebutnya, tidak utuh di awal; `LANTAI.md` dibaca utuh saat juri, revisi, dan sebelum render. README dan INDEX tidak dibaca. Saat mendelegasikan, sebut rutenya di brief, supaya subagen tahu bobot tiap aturan yang ia baca.
2. **Urutan otoritas (kanonik; file lain merujuk kalimat ini): brief/instruksi Irfan → `projects/<proyek>` → profil merek → Lantai/Kelas H → kartu cookbook → `guide/`/`references/`.** Lapis yang lebih awal menang bila bertentangan. (a) Brief dan instruksi Irfan di sesi ini. (b) `projects/<proyek ini>/` (`RESEP.md`, `DECISIONS.md`): hanya untuk video ini. Folder proyek lain tidak dibuka dan isinya bukan aturan, kecuali Irfan menyuruh memakainya. (c) Profil merek (`BRAND.md`, `EDITING.md` di folder data user): nilai pasti merek dan arah edit yang sudah user pilih. (d) `LANTAI.md` dan gerbang mekanis Kelas H (`SARINGAN.md`): mutu yang berlaku di semua gaya. Kartu yang bertentangan dengannya kalah, penyesuaiannya ditulis di `RESEP.md`; pengecualian Lantai hanya atas instruksi Irfan dan dicatat di `RESEP.md`. (e) Kartu `claude/motion-graphic/cookbook/` (lewat `scripts/cookbook/pilih_kartu.py`) + frame kuncinya: selera visual Irfan yang sudah ia setujui. Keputusan kecil yang tidak dijawab brief (font, ukuran, warna, gerak, posisi) diambil dari kartu kiblat atau kartu yang paling mirip dengan permintaan, tidak dikarang. (f) `guide/`, `references/`: pelajaran global (kesalahan yang pernah terjadi dan cara menghindarinya) dan rujukan teknis, dipakai untuk menimbang dan mengecek mutu. Baris bertanggal di `references/` dibaca bersama kondisi yang melahirkannya.
3. **Setiap pesan baru memilih rute.** Cocokkan dengan satu baris Rute sebelum edit pertama, juga di tengah sesi panjang. Keluhan atas video yang sudah dirender selalu masuk rute revisi, sekecil apa pun.
4. **Baca bagian yang disebut langkahmu sampai habis, saat langkah itu dikerjakan.** Bukan semua file di awal sesi. `grep` hanya untuk menemukan lokasi. Langkah dianggap selesai hanya bila dicentang di `TAHAP.md` dengan buktinya; render final menolak tahap yang belum berbukti.
5. **Cari jawabannya di repo sebelum bertanya.** Bila tetap harus bertanya, sebut file yang sudah dibaca dan apa yang tidak terjawab.
6. **Koreksi dicatat saat diterima, di proyeknya.** Setiap koreksi Irfan langsung masuk `projects/<proyek>/DECISIONS.md` (rinci: §Akhir sesi butir 1). Yang naik ke repo hanya yang lolos [SARINGAN.md](SARINGAN.md): kelas kegagalan (bukan kejadian), tanpa kata benda proyek, netral gaya, mekanis, ber-gerbang, ditulis sebagai butir ber-ID Pemicu → Anti-pola → Invarian → Karena → Boleh → Gerbang. Selera dan gaya satu video tidak pernah menjadi larangan umum.
7. **Aturan rasa tinggal di tiga tempat, dan ketiganya dibuka sebelum merancang atau menilai visual:** frame kunci kartu (yang bagus), `cookbook/contoh-gagal/` (yang jelek), dan `guide/<urusan>/GUIDE.md` §Cara memutuskan (pelajaran bersyarat).

| Sebelum menulis | Butuh | Tidak cukup |
|---|---|---|
| "aturannya tidak ada" | `LANTAI.md`, kartu yang dipakai proyek (di `RESEP.md`), dan docstring skrip juri yang mengukurnya, dibaca utuh | pencarian kata |
| "sudah beres / lulus" | keluaran alat atau ukuran (frame, detik) dari hasil terbaru | still acak, verdict dari render sebelumnya |
| perubahan pada video yang sudah dikirim | tiap lapisan yang berubah menunjuk satu butir ledger `DECISIONS.md` | "sekalian dirapikan" |

## Awal sesi (wajib, sebelum bekerja)

1. Ambil `main` terbaru. Skill di `main` adalah satu-satunya sumber aturan.
   - Jalankan `./tools/doctor.sh` (hanya mengecek). Bila GAGAL, jangan mulai pekerjaan: laporkan hasilnya ke Irfan dan minta persetujuan untuk `./tools/doctor.sh --fix` (memasang skill `claude/*` sebagai symlink ke akun Claude Code dan Codex yang dipakai; skill Remotion resmi ke Claude). Setelah disetujui, jalankan lalu cek ulang.
   - Skill yang baru dipasang mungkin belum masuk daftar skill sesi ini: baca SKILL.md-nya langsung dari repo. Jangan bekerja dari ingatan atau dari skill lain yang namanya mirip.
   - Skill di `archive/` (`motion-director`, `motion-graphic-playbook`, `irfan-motion-director`) sudah digabung ke `claude/motion-graphic`; bila masih muncul di daftar skill (misalnya dari pustaka akun claude.ai), abaikan dan laporkan ke Irfan.
2. **Tugas video: cek profil merek dulu.** Cari `merek/<slug>/BRAND.md` dan `EDITING.md` di folder data user (strukturnya di `claude/motion-graphic/templates/merek/README.md`; lokasinya dipilih user, tidak pernah ditetapkan repo ini) dan jalankan `scripts/juri/profil_cek.py`. Belum ada atau GAGAL → isi bersama user sebelum mengerjakan video.
3. Baca [PENDING.md](PENDING.md). Barisnya bukan aturan. Baris yang menyangkut tugas ini ditanyakan di chat sesi ini, satu pesan: ya / tidak. Jangan menunggu filenya dibuka.
4. Cek branch yang belum masuk `main` dan mengubah `claude/` (`git log origin/main..origin/<branch> -- claude/`). Bila ada, laporkan ke Irfan sebelum mulai.

## Akhir sesi (wajib, sebelum menutup)

1. Skill adalah cara memutuskan, bukan template. **Bawaannya, koreksi Irfan tinggal di proyeknya** (`projects/<proyek>/DECISIONS.md`), tanpa menanyakan cakupannya ke Irfan. Pelajaran global hanya untuk kesalahan kerja yang salah di gaya apa pun (teks menutup wajah atau terpotong, fonem terpotong, yang sudah disetujui ikut berubah, elemen ditambahkan padahal tidak diminta), disaring dan ditulis menurut [SARINGAN.md](SARINGAN.md) ke `guide/<urusan>/GUIDE.md` §Cara memutuskan; butir yang mirip disunting per ID, bukan ditambah. Selera dan gaya (warna, jenis huruf, tulisan tangan, gaya komik, efek tertentu) tetap di proyek; bila soal cara memakai satu gaya, jadi "Catatan pakai" di kartu kiblatnya. Ragu = proyek. Untuk video ikuti `claude/motion-graphic/cookbook/README.md` §Tumbuh: frame yang ditolak → `cookbook/contoh-gagal/` beserta konteksnya; hal yang berlaku di semua video → usul ke `PENDING.md`, dan baru masuk `LANTAI.md` setelah muncul di dua video berbeda dan Irfan menyetujui bunyinya. Skill lain: tulis ke file skill tempat aturannya berlaku; aturan lama yang bertentangan diganti di tempat. Instruksi untuk satu sesi atau satu proyek (pembagian model, urutan kerja, cara QC) masuk `projects/<proyek>/DECISIONS.md` dan tidak ditulis ke `references/`.
2. Aturan ditulis sebagai instruksi: apa yang dikerjakan, kapan berlaku, dan cara mengeceknya. File instruksi (`AGENTS.md`, `SKILL.md`, `LANTAI.md`, `references/`, `guide/`, kartu, template, docstring skrip) tidak memuat nama peminta, tanggal permintaan, versi proyek tempat kejadiannya, atau cerita kegagalan. Contoh salah tanpa nama dan tanggal boleh, begitu juga tanggal ukur data ("dicek 7 Nov 2026"). Asal-usul tiap aturan dicatat di `SUMBER.md` skill itu (file tingkat repo: `SUMBER.md` di root), satu baris di bawah nama filenya. `tools/sumber_cek.py` menolak tanda sumber di file instruksi; doctor menjalankannya.
3. Pelajaran yang belum disetujui masuk ke `PENDING.md`, satu baris, **dan ditanyakan di chat sesi yang sama** (ya / tidak) sebelum sesi ditutup. File itu hanya catatan bila belum dijawab, bukan tempat menunggu. Baris yang berumur lebih dari 7 hari dipindah ke `PENDING-ARSIP.md` (tetap tercatat, tidak dibaca di awal sesi).
4. Perubahan skill masuk ke `main` di sesi yang sama (merge atau pull request yang disebut ke Irfan). Jangan tinggalkan pelajaran di branch.
5. Pesan commit menyebut agen: `Agent: Claude`, `Agent: Codex`, dsb.
6. Skill tetap ringkas: `LANTAI.md` satu baris per ID; butir `guide/` memakai format enam kolom SARINGAN.md, tiap kolom satu kalimat; cara ukur rinci di docstring skrip atau `references/`.
7. File ditambah/diubah/dihapus → `python3 tools/peta.py` sebelum commit (doctor menandai PETA.md basi).

## Jadisatu Canvas · semua klien MCP

Untuk membaca, mengubah, atau menghubungkan ruang Jadisatu Canvas, muat [claude/jadisatu-canvas/SKILL.md](claude/jadisatu-canvas/SKILL.md). Nama folder `claude/` adalah konvensi penyimpanan repo; aturan skill ini berlaku juga bagi Codex dan klien MCP lain. Baca referensi konfigurasi hanya untuk klien yang sedang dipakai. Klien tanpa akses repo dapat menerima berkas skill sebagai instruksi dari pemilik.

Pemuatan skill dan pemberian akses MCP adalah dua langkah terpisah. Jangan memasang pengaturan global, menyalin token, memberi akses penyedia baru, atau menganggap room yang direset masih membawa konteks lama hanya karena skill tersedia.

## Sesi scriptwriter

Untuk pengembangan ide, naskah, dan storyboard, baca [scriptwriter/README.md](scriptwriter/README.md). Folder itu menyimpan mandat peran dan pengembangan cara kerja. Skill aktif tetap berada di `claude/`; hindari membuat skill kedua untuk konsep yang sudah ada.

Gunakan `claude/working-with-irfan/SKILL.md` untuk cara berkolaborasi, `claude/script-workshop/SKILL.md` untuk pengembangan naskah, dan cabang `claude/motion-graphic/references/storyboard.md` saat naskah sudah final. Muat cabang tambahan sesuai kebutuhan, bukan semua referensi sekaligus. Untuk proyek yang punya rencana tertulis, gunakan `claude/autopilot-prd/SKILL.md` dalam cakupan permintaan aktif.

## Menyimpan kemajuan

- Pisahkan keputusan khusus satu konten di `projects/<proyek>/` dari cara kerja yang dapat dipakai lintas konten.
- Simpan alasan keputusan, bukti yang dilihat, dan dampak revisi. Satu hasil bagus belum membuktikan sebuah aturan berlaku umum.
- Perubahan skill mengikuti [EVALS-DESIGN.md](EVALS-DESIGN.md): simpan kasus, bandingkan perilaku lama dan baru, lalu terapkan sesuai gerbangnya. Status awal atau dugaan tidak boleh dilaporkan sebagai hasil teruji.
- Setelah pemeriksaan yang diwajibkan lulus, commit dan push perubahan dalam cakupan tugas dengan pesan yang menjelaskan kemajuannya. Periksa perubahan remote sebelum push; jangan menimpa pekerjaan agent lain.
- Sesi scriptwriter mencatat titik lanjut di `scriptwriter/DAILY.md` dan mengirim laporan ke `ops-report` bila tersedia; sesi itu tidak mengambil antrean proyek lain di repo.

Mesin atau akun baru wajib lolos `tools/doctor.sh` sebelum bekerja; pemasangan lewat `--fix` dengan persetujuan Irfan. Dependensi media lain (demucs, model besar) dipasang hanya bila tugasnya butuh.
