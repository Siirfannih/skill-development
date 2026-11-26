# Peta migrasi: nasib tiap aturan pengelolaan setelah skill-steward dipakai

Dokumen ini dibaca sebelum menyetujui apa pun. Isinya: ke mana tiap aturan dari audit (G01–G85) pergi, file mana yang jadi penunjuk atau pensiun, dan urutan lima commit pertama.

Cara baca:
- **pindah ke §x / references/y**: aturannya sekarang tinggal di skill-steward. Bunyi lama dihapus dari file asal.
- **tetap di <file>**: ini aturan kerja produksi, bukan aturan pengelolaan repo. Tidak disentuh.
- **dihapus**: duplikat atau basi. Alasannya ditulis.
- **konflik Kxx, menunggu keputusan**: butuh jawabanmu dulu. Nomor backlog merujuk `steward/backlog.md`.
- **Berubah** = perilaku agen berubah, bukan sekadar pindah tempat.

Catatan versi: peta ini ditulis untuk versi awal `claude/skill-steward/SKILL.md`. Nomor § di sini mengikuti versi itu, bukan yang sekarang. Istilah lama: Tier 0/1/2 sekarang Mechanical/Behavior/Risky (SKILL.md §4); `steward/decided/` sekarang bagian "Decided" di `steward/backlog.md`; "mode langsung" sekarang "aku minta perubahan" (SKILL.md §2); tidak ada lagi agen steward khusus, jadwal mingguan, atau tag "Agent:" wajib.

Singkatan: `MG` = `claude/motion-graphic`, `CB` = `MG/cookbook`, `EVALS` = `EVALS-DESIGN.md`. Bukti `file:baris` dari audit, dicek ulang di repo commit `8adf0c7`.

## 1. Tabel nasib aturan

| ID | Aturan (ringkas) | Sumber | Nasib |
|---|---|---|---|
| G01 | Promosi aturan hanya lewat SARINGAN | `AGENTS.md:3`; `MG/MOTION-CORE.md:3` | pindah ke §4 langkah 2, §6 Promosi, `references/placement.md`. Kedua salinan dihapus (menutup K20) |
| G02 | Aturan = praktik terbaik kecuali NEGATIF; gerbang boleh dilewati dengan 1 baris alasan | `AGENTS.md:5`; `MG/MOTION-CORE.md:5` | konflik K03 + K13, menunggu keputusan. Setelah diputuskan tetap di `AGENTS.md` (aturan isi produksi) |
| G03 | Alat gerbang tidak diubah demi satu video | `AGENTS.md:5` | pindah ke §2 (sesi produksi tidak mengedit file instruksi) dan §5 Tier 1 (mengubah cek) |
| G04 | `scripts/gate`/`juri` tidak diedit di sesi produksi | `MG/MOTION-CORE.md:93` | pindah ke §2 dan §5. Ikut backlog 2 (MOTION-CORE diarsip benar) |
| G05 | Pintu sesi produksi video | `AGENTS.md:12` | tetap di `AGENTS.md` (bukan aturan pengelolaan) |
| G06 | Pintu sesi lain: AGENTS → Rute PETA → PENDING | `AGENTS.md:14,20` | tetap di `AGENTS.md`. Sesi "mengubah skill" dialihkan ke skill-steward; PENDING diganti (G20) |
| G07 | Urutan otoritas ditulis sekali di AGENTS | `AGENTS.md:21` | tetap di `AGENTS.md` (sesuai §3 butir 3). Salinan yang salah kutip = konflik K12 |
| G08 | Instruksi eksplisit pemilik menang | `AGENTS.md:21(a)` | tetap di `AGENTS.md` untuk produksi. Untuk perubahan repo sudah ada di §2 Mode langsung dan §3 butir 1 |
| G09 | Tiap pesan baru memilih satu baris Rute | `AGENTS.md:22` | tetap di `AGENTS.md` (bukan aturan pengelolaan) |
| G10 | Baca bagian langkah sampai habis; centang `TAHAP.md` | `AGENTS.md:23` | tetap di `AGENTS.md` (bukan aturan pengelolaan) |
| G11 | Cari jawaban di repo sebelum bertanya | `AGENTS.md:24` | tetap di `AGENTS.md` (bukan aturan pengelolaan) |
| G12 | Koreksi dicatat di `DECISIONS.md` saat diterima | `AGENTS.md:25,46`; `SARINGAN.md:6` | tetap di `AGENTS.md:25` (perilaku produksi, sejalan §2). Salinan lain dihapus (duplikat C01) |
| G13 | Syarat klaim "aturannya tidak ada" | `AGENTS.md:30` | tetap di `AGENTS.md`. Versi lain di `tools/peta.py:21` diganti karena menunjuk LANTAI yang diarsip (C14) |
| G14 | Klaim "beres/lulus" butuh keluaran alat terbaru | `AGENTS.md:31` | tetap di `AGENTS.md`. Untuk perubahan repo sudah ada di §4 langkah 5 |
| G15 | Awal sesi ambil `main` terbaru | `AGENTS.md:36` | tetap di `AGENTS.md` (bukan aturan pengelolaan) |
| G16 | Jalankan doctor; GAGAL = jangan mulai | `AGENTS.md:37`; `tools/doctor.sh:90-93` | tetap di `AGENTS.md`. Masalah sesi cloud = backlog 19 (E12). Mengubah doctor = Tier 2 |
| G17 | Skill baru dipasang dibaca langsung dari repo | `AGENTS.md:38` | tetap di `AGENTS.md` (bukan aturan pengelolaan) |
| G18 | Skill di `archive/` diabaikan dan dilaporkan | `AGENTS.md:39` | tetap di `AGENTS.md` (bukan aturan pengelolaan) |
| G19 | Tugas video: cek profil merek dulu | `AGENTS.md:40` | tetap di `AGENTS.md` (bukan aturan pengelolaan) |
| G20 | Baca PENDING di awal sesi, tanya ya/tidak di chat | `AGENTS.md:41`; `PENDING.md:3` | dihapus. Diganti `steward/inbox/` dan §6 Promosi. **Berubah:** pertanyaan masuk laporan perubahan berikutnya, tidak di tengah produksi |
| G21 | Cek branch yang belum masuk `main` | `AGENTS.md:42` | tetap di `AGENTS.md` (cek awal sesi). Branch `steward/*` (§2) ikut dicek |
| G22 | Koreksi tinggal di proyek, tanpa tanya cakupan; ragu = proyek | `AGENTS.md:46`; `CB/README.md:112-114`; `tools/peta.py:37` | pindah ke §6 Promosi. **Berubah:** cakupan yang ragu ditanyakan di laporan perubahan (menutup K10) |
| G23 | Pelajaran global hanya untuk kesalahan kerja → guide §Cara memutuskan | `AGENTS.md:46`; `SARINGAN.md:13,25` | pindah ke §6 Promosi dan `references/placement.md` |
| G24 | Cara pakai satu gaya → "Catatan pakai" di kartu | `AGENTS.md:46`; `SARINGAN.md:12`; `CB/README.md:120` | dihapus (basi: 0 dari 44 kartu aktif punya bagian itu, R16). Selera tetap di proyek (§6). Menutup K11 |
| G25 | Frame ditolak → `contoh-gagal/` + sebab | `AGENTS.md:46`; `CB/README.md:121` | pindah ke `references/placement.md` |
| G26 | Hal semua video → PENDING; masuk NEGATIF/`references/` setelah 2 video, uji no-op, disetujui | `AGENTS.md:46` | konflik K04, sudah ditetapkan skill-steward §6: bagian `## Hard rules` di `MG/SKILL.md` + skrip cek. Syarat lain → §6 Promosi; uji no-op → §4 langkah 5 |
| G27 | Skill lain: tulis di file skillnya; aturan lama diganti di tempat | `AGENTS.md:46` | pindah ke §4 langkah 3 dan §6 Ganti, jangan tambah (menutup K20) |
| G28 | Instruksi satu sesi/proyek → `DECISIONS.md` | `AGENTS.md:46` | pindah ke `references/placement.md` |
| G29 | Aturan berisi apa, kapan, kenapa, cara cek | `AGENTS.md:47`; `SARINGAN.md:35` | pindah ke `references/writing.md` |
| G30 | Tanpa nama/tanggal/cerita; asal-usul ke SUMBER | `AGENTS.md:47`; `SARINGAN.md:42` | pindah ke §6 dan §4 langkah 7. `tools/sumber_cek.py` tetap sebagai penegak |
| G31 | Pelajaran belum disetujui → PENDING + tanya di sesi itu | `AGENTS.md:48` | dihapus. Diganti proposal di `steward/inbox/` (§2) dan laporan perubahan (§5 Tier 1) |
| G32 | Baris PENDING > 7 hari → `PENDING-ARSIP.md` | `AGENTS.md:48` | dihapus (basi: `PENDING-ARSIP.md` tidak pernah ada, R01; PENDING pensiun). Menutup K19 |
| G33 | Jawaban ya/tidak/dibiarkan | `PENDING.md:3` | pindah ke `references/maintenance.md` (alur inbox). Keputusan dicatat di `steward/decided/` |
| G34 | Tanda `[I]` kata pemilik, `[A]` analisis AI | `PENDING.md:5` | pindah ke format proposal inbox (`references/maintenance.md`). Tetap perlu: §6 Promosi membedakan koreksimu dari simpulan agen |
| G35 | Perubahan skill masuk `main` di sesi yang sama | `AGENTS.md:49` | dihapus. Diganti §4 langkah 7 dan §5 (Tier 0 langsung, Tier 1–2 setelah ya). Menutup K07 |
| G36 | Pesan commit menyebut agen | `AGENTS.md:50` | tetap di `AGENTS.md` sampai backlog 21 (E16) diputuskan: ditegakkan hook (Tier 2) atau dihapus |
| G37 | `MG/SKILL.md` ≤ 12 KB dan ≤ 200 baris | `AGENTS.md:51` | konflik K08, menunggu keputusan |
| G38 | NEGATIF 10 butir, tiap butir satu alasan | `AGENTS.md:51`; `tools/sync_negatif.py:30` | tetap di `claude/_bersama/NEGATIF.md` + `sync_negatif.py`. §6 Hukum keras merujuknya. Kalimat di `AGENTS.md:51` dihapus |
| G39 | Butir guide memakai format enam kolom | `AGENTS.md:51` | pindah ke `references/writing.md` (menang di K09: SARINGAN 22 Nov, dipakai 34 butir guide) |
| G40 | `peta.py` dijalankan sebelum commit | `AGENTS.md:52`; `tools/peta.py:4-6` | pindah ke §4 langkah 7 |
| G41 | `PETA.md` tidak diedit tangan | `tools/peta.py:122` | pindah ke §6 File bangkitan. Kepala `PETA.md` tetap (dibangkitkan) |
| G42 | Penjaga baris Rute di `peta.py` | `tools/peta.py:102-119` | tetap di `tools/peta.py` (cek mekanis, bukan teks aturan) |
| G43 | Hindari skill kedua untuk konsep yang ada | `AGENTS.md:62` | pindah ke §6 Satu konsep, satu nama, satu rumah |
| G44 | Keputusan satu konten dipisah; satu hasil bagus belum aturan | `AGENTS.md:68-69` | pindah ke §6 Promosi dan `references/placement.md` |
| G45 | Perubahan skill ikut EVALS; dugaan bukan hasil uji | `AGENTS.md:70` | pindah ke §4 langkah 5 dan `references/testing.md` |
| G46 | Commit/push setelah cek; cek remote; jangan timpa | `AGENTS.md:71` | pindah ke §4 langkah 7 (rebase ke `main`, cek ulang) |
| G47 | Mesin baru wajib lolos doctor; `--fix` dengan izin | `AGENTS.md:74` | tetap di `AGENTS.md`. Mengubah doctor/sync = §5 Tier 2 |
| G48 | NEGATIF kanonik; salinan persis dijaga skrip | `claude/_bersama/NEGATIF.md:3` | tetap di `NEGATIF.md` + `sync_negatif.py` (sah menurut §6: salinan dijaga skrip) |
| G49 | Tiap ID LANTAI punya rumah di MIGRASI-LANTAI | `tools/sync_lantai.py:4-7` | tetap di `tools/sync_lantai.py`. Jadi bukti saat LANTAI diarsip (backlog 2) |
| G50 | SARINGAN dibaca saat koreksi akan ditulis ke repo | `SARINGAN.md:3` | dihapus. Diganti description skill-steward dan §2 |
| G51 | Satu kejadian tidak langsung menulis ke guide/LANTAI/kartu | `SARINGAN.md:6` | pindah ke §6 Promosi. **Berubah:** koreksimu yang salah di gaya apa pun langsung jadi aturan (Tier 1); simpulan agen tetap butuh dua proyek |
| G52 | Kelas S/P/H dan tempatnya | `SARINGAN.md:10-14` | pindah ke `references/placement.md`. Tujuan H (LANTAI, sudah arsip) = konflik K01/K04, menunggu keputusan |
| G53 | Ragu → kelas lebih rendah; parameter gaya tidak naik | `SARINGAN.md:16` | pindah ke §6 Promosi dan `references/placement.md` |
| G54 | Enam uji kandidat P/H | `SARINGAN.md:19-25` | pindah ke `references/placement.md` |
| G55 | H: ≥ 2 proyek, tanpa salah-tembak, disetujui lewat PENDING | `SARINGAN.md:26` | pindah ke §6 Promosi, §6 Hukum keras, `references/testing.md`. Persetujuan lewat laporan perubahan (§5), bukan PENDING |
| G56 | Format butir `[URS-NN]` enam kolom | `SARINGAN.md:30-38` | pindah ke `references/writing.md` (menang di K09) |
| G57 | Kode urusan; ID tidak dipakai ulang | `SARINGAN.md:39` | pindah ke `references/writing.md`. Tabrakan kode antar-skill = backlog 20 (E08) |
| G58 | Tanpa huruf kapital/"WAJIB"; aturan mutlak jadi gerbang kode | `SARINGAN.md:39` | pindah ke `references/writing.md` dan §6 Hukum keras |
| G59 | SUMBER per ID + penghitung `nilai` | `SARINGAN.md:42` | asal-usul → §4 langkah 7. Penghitung `nilai` menunggu keputusan (backlog 20, E07) |
| G60 | Ubah per ID, jangan tulis ulang massal | `SARINGAN.md:45` | pindah ke `references/writing.md` |
| G61 | Penilaian akhir proyek, "Pola lama", naik/turun kelas | `SARINGAN.md:46` | menunggu keputusan (backlog 20, E07). Belum pernah dipakai ("Pola lama" = 0 hasil). Bila dipertahankan → `references/maintenance.md` |
| G62 | Butir lama tanpa ID dibiarkan sampai disentuh | `SARINGAN.md:47` | pindah ke `references/migration.md` |
| G63 | Revisi → `RETRO.md` + `evals/inbox/` | `EVALS:24` | dihapus. Diganti §2 (`DECISIONS.md` + `steward/inbox/`). Menutup K06. `RETRO.md` dibekukan sebagai riwayat |
| G64 | Inbox → `evals/cases/<id>.json`, 2–5 assertion | `EVALS:25` | pindah ke `references/testing.md` |
| G65 | Patch ke cabang yang tepat; sumber di SUMBER | `EVALS:26` | pindah ke `references/placement.md` dan §4 langkah 7 |
| G66 | Agen segar menjalankan kasus lama vs baru; grader terpisah | `EVALS:27,51` | pindah ke §4 langkah 5 dan `references/testing.md` (runner `tools/run_evals.sh` tidak ada, R02) |
| G67 | Mekanis merge otomatis; aturan baru disetujui di RETRO | `EVALS:57-59` | pindah ke §5 (Tier 0 / Tier 1). Menutup K05 |
| G68 | Inti > 150 baris / cabang > 300 tanpa TOC ditolak | `EVALS:60` | konflik K08, menunggu keputusan |
| G69 | Merge → `sync.sh` memasang skill | `EVALS:29` | tetap di `tools/sync.sh`. Kata "menyalin" basi (R05, nyatanya symlink). Mengubah sync = Tier 2 |
| G70 | Eval pemicu ± 20 permintaan per skill | `EVALS:34-35` | pindah ke `references/testing.md` (baru vibedesign yang punya, R03) |
| G71 | Sinyal pemakaian → `evals/inbox/usage.md` | `EVALS:64-68` | dihapus sebagai file (tidak pernah ada, R04). Sinyalnya ditulis sebagai proposal `steward/inbox/` |
| G72 | Per sesi tahap 1–2; mingguan atau inbox ≥ 5 tahap 3–7 | `EVALS:94-95` | pindah ke §7 (pemicunya sama: mingguan atau ≥ 5 proposal) |
| G73 | Format learning "bila …, pilih …, karena …" | `CB/README.md:114` | dihapus (kalah di K09: format enam kolom lebih baru dan dipakai; "bila…pilih" hanya 1 butir) |
| G74 | Semua video → PENDING; masuk LANTAI setelah 2 video | `CB/README.md:122`; `MG/LANTAI.md:7` | konflik K01/K04, menunggu keputusan. Sisanya → §6 Promosi |
| G75 | Referensi baru dilihat bergerak (strip frame) | `CB/README.md:105-108` | tetap di `CB/README.md` §8 (cara bedah referensi) |
| G76 | Kartu ditulis dari `KARTU-TEMPLATE.md` | `CB/README.md:108` | konflik K14, menunggu keputusan. Usulan: format Invariant Card yang ditegakkan `cookbook.py` menang (`MG/SUMBER.md:43`, 25 Nov) |
| G77 | Kartu disimpan per kategori, lalu `cookbook.py index` + `cek` | `CB/README.md:109` | tetap di `CB/README.md` §8 sebagai langkah alat. **Berubah:** kartu = file instruksi, jadi kartu baru lewat §4 (Tier 1), bukan oleh sesi produksi (§2) |
| G78 | `CATALOG/POLA/SFX.md` dibangkitkan | `CB/README.md:47`; `tools/cookbook.py:36` | pindah ke §6 File bangkitan. `cookbook.py` tetap penegak |
| G79 | `INDEX.md` < 600 tok, `00-core` < 1.000 tok | `tools/cookbook.py:37-38` | tetap di `tools/cookbook.py` (cek mekanis). Disatukan dengan batas lain di backlog 10 |
| G80 | Kartu "belum dilihat bergerak" dipakai setelah dilihat | `CB/README.md:66` | tetap di `CB/README.md` (bukan aturan pengelolaan) |
| G81 | SUMBER bukan instruksi; dibuka hanya saat mengubah skill | `SUMBER.md:3-5` (+ 6 salinan) | pindah ke §4 langkah 1 dan 7, `references/conflicts.md`. Di tiap SUMBER tinggal satu baris penanda; syarat "dua video" dihapus (diganti §6) |
| G82 | Butir baru vibedesign LANTAI hanya lewat SARINGAN | `claude/vibedesign/LANTAI.md:5` | pindah ke §4. `vibedesign/LANTAI.md` tetap aktif sebagai rumah hukum keras vibedesign |
| G83 | Mengubah skill: buka AGENTS + SARINGAN | `MG/SKILL.md:79` | dihapus (duplikat beda bunyi, C15). Diganti satu baris penunjuk ke skill-steward |
| G84 | Rute "Mengubah skill": AGENTS §Akhir sesi, EVALS, §Tumbuh | `tools/peta.py:42` | dihapus (C15). Baris Rute diubah menunjuk skill-steward |
| G85 | Render final tidak dilewati, termasuk karena tenggat | `MG/MOTION-CORE.md:92` | konflik K03, menunggu keputusan. Usulan: `AGENTS.md:5` menang (`SUMBER.md:127`, 25 Nov, membalik aturan 23 Nov) |

Rekap: 27 tetap (aturan kerja atau alat), 38 pindah, 11 dihapus, 7 konflik menunggu keputusan (G02, G26, G37, G68, G74, G76, G85). Sebagian menunggu juga: G52 (tujuan H, K01/K04), G59 dan G61 (E07), G36 (E16). Sampai dijawab, bunyinya tidak diubah.

## 2. File yang menjadi penunjuk atau pensiun

- **`AGENTS.md` §Akhir sesi (baris 46–52)**: diganti dua baris. Koreksi masuk `projects/<proyek>/DECISIONS.md`. Mengubah file instruksi atau menjadikan koreksi aturan: buka skill-steward. Invarian 2 (baris 3) dan §Menyimpan kemajuan butir 3–4 (baris 70–71) juga jadi penunjuk. Efek: `AGENTS.md` mengecil dari ± 4.312 token (batas cek 2.000).
- **`SARINGAN.md`**: isinya pindah ke `placement.md`, `writing.md`, `testing.md`. Setelah semua rujukan diganti (`AGENTS.md:3,25,46,51`; `MG/SKILL.md:79`; `claude/vibedesign/LANTAI.md:5`), file dipindah ke `archive/`.
- **`EVALS-DESIGN.md`**: format kasus eval dan eval pemicu pindah ke `testing.md`. Gerbang, jadwal, dan struktur sudah diganti §4, §5, §7. File dipindah ke `archive/`.
- **`CB/README.md` §9 Tumbuh**: diganti satu baris penunjuk ke skill-steward. Tabel "simpan di mana" pindah ke `placement.md`. §8 langkah 2 ditulis ulang ke format kartu yang ditegakkan alat (K14).
- **`SUMBER.md` (root dan per skill)**: tetap sebagai catatan asal-usul, bukan instruksi. Paragraf pembuka jadi satu baris. Baris baru ditulis lewat §4 langkah 7. Skill tanpa SUMBER dibuatkan (backlog 17).
- **`PENDING.md` → `steward/inbox/`**: tiap baris jadi satu proposal, tanda `[I]`/`[A]` dipertahankan. Baris yang sudah terjawab ditutup dan dicatat di `steward/decided/`: baris 9 dan 14 oleh NEGATIF v2 (`MG/SUMBER.md:1203`), baris 24 oleh AUD-06 (`MG/guide/audio/GUIDE.md:47`). Lalu file diarsip dan `AGENTS.md:41,48` dihapus.
- Ikut pensiun: `MG/LANTAI.md` dan `MG/MOTION-CORE.md` ke `archive/` setelah isi aktifnya pindah (backlog 2). `MG/RETRO.md` dibekukan sebagai riwayat.

## 3. Lima commit pertama

1. **Tier 0 · PETA bersih** (backlog 1). `peta.py` melewati `node_modules`, `.gitignore` ditambah, PETA dibangkitkan ulang. Ini membuka doctor yang sekarang pasti GAGAL.
2. **Tier 1 · Pasang skill-steward.** Tambah skill dan folder `steward/inbox`, `steward/decided`, `steward/changes`. Rute "Mengubah skill" (`tools/peta.py:42`, `MG/SKILL.md:79`, `AGENTS.md:70`) menunjuk skill-steward. `AGENTS.md` §Akhir sesi dan invarian 2 jadi penunjuk.
3. **Tier 1 · Pensiunkan SARINGAN, EVALS-DESIGN, §Tumbuh** (backlog 8 dan 9). Isi yang masih berlaku dipindah ke references skill-steward, tiga file jadi penunjuk lalu diarsip, `RETRO.md` dibekukan.
4. **Tier 1 · PENDING → `steward/inbox/`** (backlog 7, termasuk penutupan K16 di backlog 12).
5. **Tier 1 · Arsip LANTAI dan MOTION-CORE dengan benar** (backlog 2, bersama 3 dan 11). Dikerjakan setelah K03 dan K04 dijawab.

Sesudah itu: urutan otoritas K12/K13 (backlog 6, Tier 2).

## 4. Keputusan yang ditunggu

- K03: apakah "gerbang boleh dilewati dengan satu baris alasan" juga berlaku untuk `render.sh final`?
- K08: angka batas ukuran mana yang dipakai di `steward_check.py`, dan apakah `MG/SKILL.md` tetap punya batas lebih ketat?
- K12/K13 (Tier 2): `MG/SKILL.md:18` jadi penunjuk ke `AGENTS.md`, atau salinan yang dijaga skrip?
- K18: `00-core-invariants.md` wajib atau opsional di sesi produksi (bila tidak gugur oleh backlog 13)?
- E07, E12, E16: penghitung `nilai` dipertahankan atau dihapus; doctor punya mode untuk sesi cloud; tag "Agent:" ditegakkan hook atau dihapus.
