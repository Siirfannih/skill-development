# Audit Repo skill-development, 2 Nov 2026

Cakupan: seluruh pohon kecuali `projects/pengganti-kita-sendiri/` dan `GrokAgent/` (tidak disentuh). Isi `external/` adalah submodule kosong di clone ini, jadi tidak diaudit. Tidak ada `CLAUDE.md`, `.claude/`, `.mcp.json`, settings, atau hook di repo, jadi tidak ada konfigurasi plugin/MCP yang memberatkan model (poin 4 bersih). `tools/sync.sh` tidak dijalankan.

Ringkasan: repo 311 MB, tetapi 160 MB di antaranya `projects/` (media video). Seluruh `claude/` hanya 576 KB. Skill sudah terkonsolidasi: satu skill video (`motion-graphic`) sesuai INDEX. Beban token terbesar bukan dari skill yang diwajibkan, melainkan dari satu skill yang panjang (cinedance) dan dari media/lockfile di `projects/`.

## (a) Dipindah ke `_archive/`

| Asal | Tujuan | Alasan |
|---|---|---|
| `claude/motion-graphic/scripts/__pycache__/` | `_archive/claude/motion-graphic/scripts/__pycache__/` | Cache bytecode yang ikut ter-commit, bukan sumber. `.gitignore` ditambah `__pycache__/` dan `*.pyc`. |
| `archive/motion-director/SKILL.v2-17okt.md` | `_archive/archive/motion-director/SKILL.v2-17okt.md` | Versi v2 lama (25 KB), sudah digantikan v3 lalu `motion-graphic`. Tidak ada file lain yang merujuk jalurnya. |
| `archive/motion-graphic-playbook/RETRO.md` | `_archive/archive/motion-graphic-playbook/RETRO.md` | Salinan lama dari `claude/motion-graphic/RETRO.md` (isinya awalan identik dari versi hidup yang lebih panjang). |

Link di INDEX.md tidak ada yang menunjuk ke tiga file ini, jadi INDEX tidak diubah.

## (b) Usulan, butuh keputusan Irfan

**1. Dua folder arsip: `archive/` (sudah ada, tertulis di INDEX) dan `_archive/` (baru).**
- A. Gabung semua ke `_archive/` dan perbarui INDEX (baris Struktur + tabel Arsip). Dampak: satu tempat arsip, nol kebingungan; 1 commit. Rekomendasi.
- B. Pertahankan `archive/` untuk skill lama dan `_archive/` untuk sampah hasil audit. Dampak: dua nama mirip, agent bisa salah muat.

**2. Media besar di `projects/` (160 MB, 282 file media ter-commit; ~145 MB di `jadisatu-60s`).** Terbesar: `assets/P04c-hand-sketch.mp4` 35 MB, `render/TheGap-Jadisatu-v18.mp4` 15,5 MB, `assets/P04b-crush-discard-work.mp4` 15 MB, `assets/P01-ira-glass.png` 10 MB, `assets/P03-adele-21.png` 10 MB, 19 file WAV di `remotion/vo/` dan `remotion/vo/v3/` (±20 MB). Memindahkan ke `_archive/` tidak mengecilkan clone (riwayat git tetap), dan sebagian dipakai build Remotion, jadi tidak saya pindah.
- A. Pindahkan media ke penyimpanan luar (Drive/R2/Git LFS), simpan hanya manifest + hash di repo; bersihkan riwayat dengan `git filter-repo`. Dampak: clone turun dari 311 MB ke sekitar 20 MB, agent cepat clone; biaya: riwayat ditulis ulang, semua agent harus clone ulang, perlu jadwal tanpa agent lain aktif.
- B. Hapus dari pohon kerja saja (media final tetap di riwayat), tambahkan `projects/*/assets/`, `render/`, `*.wav`, `*.mp4` ke `.gitignore`. Dampak: working tree ringan, clone tetap berat; risiko rendah.
- C. Biarkan. Dampak: tiap agent baru menarik 300 MB; tidak memengaruhi token karena media tidak dibaca.

**3. Lockfile dan JSON besar yang tidak pernah perlu dibaca agent:** `projects/jadisatu-60s/remotion/video/package-lock.json` (193 KB), `projects/ai-change-everything/remotion/package-lock.json` (160 KB), `render/cues.json` (38 KB), `sfx-extra/_catalog.json` (35 KB). Risiko: agent yang `grep`/`cat` folder proyek menelan puluhan ribu token. Usul: tambahkan baris di `AGENTS.md` "jangan buka `package-lock.json`, `*.json` di render/ dan sfx-extra/", atau pindahkan lockfile ke `.gitattributes` `-diff linguist-generated`. Dampak rendah, tanpa risiko.

**4. Duplikat kode antar proyek:** `ai-change-everything/vo/vo.json` identik byte-per-byte dengan `ai-change-everything/remotion/src/lib/vo.json` (md5 sama); `jadisatu-60s/remotion/video/src/vo.json` dan `vo_v13.json` hampir sama (1146 baris). `jadisatu-60s/remotion/vo/` (v2) dan `vo/v3/` memuat 9 pasang WAV hasil trim versi lama dan baru. Usul: simpan satu salinan dan buat build merujuknya; tunggu sampai agent proyek selesai agar build tidak putus. Itu sebabnya belum saya pindah.

**5. `claude/cinedance-block-library/SKILL.md` (477 baris, 39 KB, ±10 ribu token, berbahasa Inggris) dimuat penuh setiap kali dipicu.** Skill ini juga satu-satunya yang melanggar aturan INDEX "SKILL.md < 500 baris; detail di references/" nyaris (477) dan jauh lebih berat dari semua skill lain (rata-rata skill lain 8-21 KB).
- A. Pecah: `SKILL.md` ±80 baris (cara pakai + daftar kode), blok teks per kategori di `references/blocks-<kategori>.md` yang dibaca hanya sesuai kode yang dipakai. Dampak: beban turun ±75% per pemanggilan; perlu eval pemicu ulang (EVALS-DESIGN).
- B. Biarkan, karena skill dipicu jarang. Dampak: 10 ribu token tiap dipicu.

**6. `claude/motion-graphic/SKILL.md` (151 baris, 21 KB, ±5 ribu token) + `RETRO.md` (19,6 KB) + `references/audio.md` (16,5 KB).** Sudah memakai pola cabang dan baik. `RETRO.md` penuh nama skill lama (`MOTION-SYSTEM.md`, `TYPE-STYLES.md`, `irfan-motion-director`) yang sekarang hanya ada di arsip. Usul: ringkas `RETRO.md` menjadi tabel pelajaran yang masih berlaku (±5 KB), pindahkan narasi lama ke arsip. Dampak: lebih sedikit rujukan mati. Perlu persetujuan karena ini mengubah isi.

**7. Skill duplikat di runtime Irfan di luar repo.** Daftar skill terpasang (anthropic-skills) masih memuat `motion-director`, `motion-graphic`, dan `motion-graphic-playbook` sekaligus; deskripsi `motion-director` mengklaim "satu-satunya pegangan", `motion-graphic` juga. Repo hanya mengakui `motion-graphic`. Akibatnya model bisa memicu skill yang salah dan memuat 3 deskripsi. Usul A: copot `motion-director` dan `motion-graphic-playbook` dari instalasi (jalankan `tools/sync.sh` setelah memastikan skrip tidak menyalin arsip). Usul B: biarkan. A direkomendasikan; saya tidak menyentuh instalasi lokal.

**8. Folder `experimental/dual-agent-sound/`** (780 KB; berisi `examples/pengganti-kita-sendiri/v10..v13` dengan skrip mix berulang: `mix10.py`, `mix11.py`, `assemble12.py`, `mix13.py`, `qa13.json`). Versi lama v10-v12 hanyalah iterasi. Usul: simpan v13 saja sebagai contoh, pindahkan v10-v12 ke `_archive/`. Saya tidak memindahkannya karena folder `pengganti-kita-sendiri` sedang dikerjakan agent lain dan LOG.md mungkin merujuknya.

**9. `archive/morning/` (skill contoh bawaan Anthropic, 18 KB + font woff2).** INDEX sendiri menyebutnya bukan milik Irfan. Usul: pindahkan ke `_archive/` bersama keputusan nomor 1.

## (c) Top 15 file terberat (di luar `pengganti-kita-sendiri/`, `GrokAgent/`, media)

Perkiraan token = byte / 4.

| # | File | Baris | KB | ±Token | Dimuat default? |
|---|---|---|---|---|---|
| 1 | `projects/jadisatu-60s/remotion/video/package-lock.json` | 5305 | 193 | 48 rb | Tidak, tapi risiko bila di-grep |
| 2 | `projects/ai-change-everything/remotion/package-lock.json` | 4407 | 160 | 40 rb | Tidak |
| 3 | `archive/motion-director/SKILL.md` | 779 | 50 | 12,5 rb | Tidak (arsip) |
| 4 | `projects/jadisatu-60s/remotion/tools/audio_build.py` | 645 | 44 | 11 rb | Tidak |
| 5 | `claude/cinedance-block-library/SKILL.md` | 477 | 39 | 10 rb | Ya, saat dipicu |
| 6 | `projects/jadisatu-60s/render/cues.json` | 2409 | 38 | 9,5 rb | Tidak |
| 7 | `projects/jadisatu-60s/remotion/sfx-extra/_catalog.json` | 1656 | 35 | 8,8 rb | Tidak |
| 8 | `archive/motion-graphic-playbook/SKILL.md` | 401 | 31 | 7,8 rb | Tidak (arsip) |
| 9 | `content-ops/research/2026-10-affiliate-niche.md` | 408 | 27 | 6,8 rb | Hanya jalur content-ops |
| 10 | `archive/morning/SKILL.md` | 152 | 18 | 4,5 rb | Tidak (arsip) |
| 11 | `claude/motion-graphic/SKILL.md` | 151 | 21 | 5,3 rb | Ya, setiap video |
| 12 | `claude/motion-graphic/RETRO.md` | 139 | 19,6 | 4,9 rb | Tidak wajib, tapi sering terbuka |
| 13 | `claude/motion-graphic/references/audio.md` | 237 | 16,5 | 4,1 rb | Saat gerbang audio |
| 14 | `claude/working-with-irfan/SKILL.md` | 140 | 13 | 3,3 rb | Ya, setiap tugas |
| 15 | `claude/motion-graphic/references/typography.md` | 165 | 11,4 | 2,9 rb | Saat gerbang tipografi |

Muatan wajib tipikal untuk sesi video: INDEX (5 KB) + working-with-irfan (13 KB) + motion-graphic (21 KB) + irfan-creative-workflow (10 KB) ≈ 49 KB ≈ 12 ribu token. Wajar. Tidak ada SKILL.md lain yang melewati 400 baris selain cinedance.

## (d) Kontradiksi dan ketidakkonsistenan (dicatat, tidak diselesaikan)

1. **Kecepatan VO.** Preferensi Irfan: VO tidak pernah dipercepat (rate 1,0); tempo dari jeda. Tetapi `projects/jadisatu-60s/STATUS.md` dan `DECISIONS.md` (D-034) memakai "VO dipercepat 5 % dengan rubberband", dan `projects/ai-change-everything/STATUS.md` + `SCRIPT.md` memakai "tempo ×1,05-1,06". `claude/jadisatu-narrator-vo/SKILL.md` menetapkan ±139 kata/menit tanpa melarang percepatan. Perlu keputusan: apakah aturan "jangan dipercepat" masuk ke `motion-graphic/references/audio.md` dan proyek lama ditandai pengecualian.
2. **Aturan kosong vs ledger proyek.** `motion-graphic` melarang highlight box/scrim, sedangkan RETRO menyimpan entri lama yang menyebut "blok merah solid" sebagai kegagalan, jadi searah; tetapi rujukan RETRO ke `MOTION-SYSTEM.md §8`, `TYPE-STYLES.md`, dan `irfan-motion-director §3` menunjuk file yang sudah diarsipkan, sehingga agent yang mengikutinya menemui jalan buntu.
3. **Jumlah SFX.** Preferensi Irfan: tidak ada batas SFX, tiap peristiwa visual bermakna punya SFX; `build.md`/`audio.md` menuntut "audit SFX" dan bridge SFX di setiap perpindahan, searah. Namun skill `earshot`-style "tanpa SFX di setiap kata kinetik" (hanya kata sendirian/penekanan) berbenturan dengan butir lama "SFX ≥ 85 % terukur termasuk onset teks" yang tersisa di RETRO (entri 18 Okt). Perlu penandaan mana yang berlaku.
4. **Rujukan "Mac/~/Proyek/video-editor/skills"** di RETRO dan sebagian skill vs aturan terbaru "repo adalah sumber, push langsung ke main". Dua sumber kebenaran.
5. **Rujukan rusak (non-INDEX).** `claude/jadisatu-canvas/evals/results/2026-10-29-storyboard/baseline-skill.md` menaut `references/clients.md` yang relatif ke folder itu; itu snapshot eval beku, jadi dibiarkan. Semua tautan di INDEX.md, AGENTS.md, README valid.
6. **Perbedaan batas panjang.** INDEX: SKILL.md < 500 baris; Anthropic dan rangkuman Irfan menyarankan lebih ringkas. cinedance (477) lolos secara teknis tetapi 39 KB.
7. **Dua pengakuan "skill video tunggal":** INDEX dan `motion-graphic/SKILL.md` menyatakan `motion-graphic` pengganti; instalasi runtime (lihat b.7) belum selaras.
