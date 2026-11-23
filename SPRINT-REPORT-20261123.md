# Sprint malam 23 Nov 2026 · core, pemilih kartu cookbook, gerbang fail-closed

Branch `feat/core-gates-format-locks` (basis `origin/main` `424f2313`). Agent: Claude (claude2). Belum di-merge; menunggu audit.

## Koreksi bedah branch (23 Nov 2026)

Alasan: `formats/` (template gaya tetap) bertentangan dengan `cookbook/README.md` §1 (konsep user + mekanik cookbook = output baru) dan `SARINGAN.md` (selera tinggal di proyek; hanya Kelas H dan P yang naik ke skill).

| # | Butir koreksi | Yang dikerjakan |
|---|---|---|
| 1 | Hapus `formats/` | `git rm -rf claude/motion-graphic/formats` (3 file). Tidak ada lagi sebutan `formats/` atau "Format Bible" di `AGENTS.md`, `SKILL.md`, `MOTION-CORE.md`, `PETA.md`, `tools/peta.py` (dijaga tes). Sisa sebutan hanya di `SUMBER.md` (asal-usul), laporan ini, dan tes yang menolak kemunculannya |
| 2 | Lepas gerbang dari `FORMAT` | `gerbang_produksi.sh` tidak membaca `projects/<proyek>/FORMAT` atau slug apa pun. `WAJAH`, `INSET`, `TEPI`, `ASET` tetap memblokir secara bawaan. Ketat jadi pilihan proyek: `gerbang_produksi.sh --ketat`, atau file `projects/<proyek>/qc/ketat` (kosong = semua tanda memblokir; berisi nama tanda, mis. `JEDA KARTU LOGO` = tanda itu saja yang ikut memblokir). `cek_komposisi.py --blok` kini menolak nama tanda tak dikenal (salah ketik tidak diam-diam melonggarkan gerbang) |
| 3 | Blok Invarian Anti-Sok-Tahu | Lima butir, identik, di byte 0 `AGENTS.md` dan `MOTION-CORE.md` (855 byte) |
| 4 | Tulis ulang `MOTION-CORE.md` + rute `SKILL.md` | 7.123 byte. Alur: gerbang 1–3 → Langkah 1 cookbook (`pilih_kartu.py`, 2–4 kartu, tabel racikan dan remix per beat) → Langkah 2 Remotion dari nol + `render.sh final` / `gerbang_produksi.sh`. `SKILL.md` bagian atas dan `cookbook/README.md` §2 butir 3 menunjuk `pilih_kartu.py` |
| 5 | `scripts/cookbook/pilih_kartu.py` | Mem-parse tabel `cookbook/INDEX.md` (kolom dicari dari baris judul). `--cari`, `--kategori`, `--bergerak`, `--limit` (bawaan 4). Keluaran `ID / Nama / Bergerak/Diukur / Path kartu / Keyframes`. Keluar 0 ada hasil, 1 tidak ada yang cocok, 2 INDEX tidak terbaca |
| 6 | Tes, `SUMBER.md`, verifikasi | Lihat tabel di bawah. Asal-usul hanya di `SUMBER.md` root |

## File berubah (seluruh branch terhadap basis)

Baru:
- `claude/motion-graphic/MOTION-CORE.md` (7.123 byte; batas 10.000)
- `claude/motion-graphic/scripts/cookbook/pilih_kartu.py`
- `claude/motion-graphic/scripts/gate/cek_komposisi.py` (versi umum dari `projects/behindwork-batch-1/remotion/bangun/`)
- `claude/motion-graphic/scripts/juri/gerbang_produksi.sh` (dipanggil `render.sh final`/`lego`)
- `claude/motion-graphic/scripts/tests/test_gerbang_produksi.py` (33 tes), `test_audit_dokumen.py` (16 tes), `test_pilih_kartu.py` (24 tes)

Diubah:
- `AGENTS.md`: blok invarian di byte 0; sesi produksi menunjuk MOTION-CORE lalu folder proyek
- `claude/motion-graphic/SKILL.md`: bagian atas = pintu MOTION-CORE + alur dua langkah dengan `pilih_kartu.py`
- `claude/motion-graphic/cookbook/README.md` §2 butir 3: pencocokan *Narrative trigger* lewat `pilih_kartu.py`
- `claude/motion-graphic/scripts/audio/audio_phone.py` (`--gate`), `sfx_comfort.py` (`--min-comfort`), `sfx_potong.py` (`--laporan`), `audio/README.md`
- `claude/motion-graphic/scripts/juri/render.sh`: satu baris pemanggil gerbang produksi + komentar butir 10
- `claude/motion-graphic/references/build.md`: Remotion + rakit lego sebagai jalur utama, dua sisa rujukan AE dihapus
- `tools/peta.py`: rute produksi, grup pintu produksi, `jaga_rute()`, blok kutipan di awal file dilewati saat mengambil ringkasan; `PETA.md` diregenerasi
- `SUMBER.md` (root): asal-usul semua perubahan

Dihapus oleh koreksi: `claude/motion-graphic/formats/README.md`, `story-doc-16x9.md`, `journey-talkinghead.md`.

## Hasil verifikasi (dijalankan setelah perubahan terakhir)

| Perintah | Hasil |
|---|---|
| `cd claude/motion-graphic/scripts && python3 -m unittest discover -s tests` | `Ran 181 tests in 37.3s` · `OK` (108 lama + 73 di tiga file tes branch ini) |
| `python3 tools/peta.py` | `PETA.md ditulis (268 baris)`; `--check`: `PETA.md terbaru` |
| `python3 tools/sumber_cek.py` | `0 tanda sumber di 269 file instruksi (bersih)`, exit 0 |
| `CLAUDE_CONFIG_DIR=~/.claude-2 ./tools/doctor.sh` | exit 1, **hanya** karena baris "skill … terpasang sebagai salinan, bukan symlink ke repo" (symlink akun menunjuk repo utama, bukan worktree ini). Semua cek isi OK: PETA terbaru, cookbook valid, lantai SKILL.md = LANTAI.md, file instruksi tanpa tanda sumber |

Ukuran token (perkiraan, tokenizer pembanding `tiktoken`; tokenizer Claude tidak tersedia di mesin ini): blok invarian 240 (`o200k_base`) / 282 (`cl100k_base`), batas 350. `MOTION-CORE.md` utuh 2.209 / 2.481, batas 2.500. Tes repo menjaga batas byte (blok < 1.050 byte, file < 10.000 byte), bukan token.

Contoh `pilih_kartu.py` pada INDEX asli (86 kartu terbaca, semua path ada): `--cari "demo fitur produk" --bergerak` → 63, S03, 93, S02; `--cari "lompatan waktu" --kategori sfx` → tidak ada yang cocok, keluar 1.

## Yang diukur pada data nyata

`cek_komposisi.py` dijalankan pada `projects/behindwork-batch-1/remotion/src/data/ep01–ep05.json` (r2) dengan `public/` dari mesin kerja (hanya dibaca):
- Mode bawaan: kelima episode LULUS (nol WAJAH/INSET/TEPI/ASET), jadi proyek itu tidak pecah.
- Tanda baru pada ep01: `JEDA` di 6,74 dtk (0,38 dtk kosong), 18,41 dtk (0,71), 52,58 dtk (0,34), dan `PITA` (24 baris subtitle bersama KT). Dua yang pertama cocok dengan jeda gelap 0:06 dan 0:18 di audit visual. Tanda itu hanya peringatan secara bawaan; ep01–05 baru **ditolak** bila proyeknya memilih ketat (`--ketat` atau `qc/ketat`). Pengukuran ini dari sebelum koreksi dan tidak diulang; logika tanda tidak berubah.

## Temuan audit W4/W6: keadaan di basis

- `storyboard.md §16.3`: tidak ada lagi di `424f2313`; `irfan-creative-workflow/SKILL.md` merujuk `storyboard.md` §5, dan heading itu ada. Tidak diubah; ditambah tes yang memeriksa semua rujukan `file.md §N` di pintu masuk (16 rujukan, semua valid).
- `orkestrasi.md` "tidak membuka gambarnya": sudah tidak ada di basis. Tidak diubah; ditambah tes regresi.
- `build.md`: kalimat "Default: After Effects" sudah tidak ada; dua sisa rujukan AE dibersihkan dan kalimat jalur utama dipertegas.
- `PETA.md` Fase 3: sudah memuat `guide/visual/GUIDE.md`; `tools/peta.py` sekarang berhenti bila baris itu kehilangan guide teks/visual/gerak.

## Belum teruji / batasan

1. `render.sh final` ujung-ke-ujung dengan gerbang baru pada proyek nyata belum dijalankan (butuh audio terkunci, still, JURI, audit frame). Yang teruji: `gerbang_produksi.sh` sendiri (9 tes) dan bahwa `render.sh` memanggilnya sebelum "Render penuh ditolak".
2. `audio_phone.py --gate` dan `sfx_comfort.py --min-comfort` diuji dengan sinyal sintetis, belum dengan stem video nyata. Tes `sfx_comfort` memakai `earshot` tiruan (skor CLAP 0), jadi bagian CLAP tidak teruji.
3. Belum ada skrip mix yang menulis `audio/sfx_potong.json`; gerbang potong baru aktif setelah mix proyek menulis laporan itu. Begitu juga stem: mesin behindwork belum menulis `stem_*.wav`.
4. Tanda `LOGO` butuh kotak `ramai` di `aset.json`; pre-processor aset (`aset_peta.py`, di folder proyek) belum mengisinya, jadi harus ditandai tangan. Jeda 0:46 juga tidak tertangkap `JEDA` pada data r2.
5. `SKILL.md` motion-graphic tetap ±26 KB karena salinan Lantai disinkronkan `tools/sync_lantai.py`; sesi yang memuat skill lewat daftar skill tetap menerima file penuh. Yang ramping adalah `MOTION-CORE.md`.
6. `pilih_kartu.py` mencocokkan teks kolom *Narrative trigger* di INDEX, yang dipotong `…` oleh `tools/cookbook.py index`. Kata kunci yang hanya ada di bagian trigger yang terpotong (isi lengkapnya di kartu) tidak ditemukan. Pencocokan memakai potongan teks, belum sinonim: "angka" tidak menemukan kartu yang menulis "number".
7. Pintu MOTION-CORE dan `pilih_kartu.py` belum diuji lewat `EVALS-DESIGN.md` (bandingkan perilaku agen lama vs baru). Statusnya: lolos tes struktur dan tes unit, belum teruji di sesi produksi.
8. `cookbook/INDEX.md` §Cara pakai (dibangkitkan `tools/cookbook.py`) dan `irfan-creative-workflow/SKILL.md` gerbang 3 masih menyebut INDEX tanpa `pilih_kartu.py`; tidak diubah karena di luar daftar koreksi. Keduanya tidak bertentangan, hanya belum menunjuk alatnya.

## Perlu keputusan

- [K-20261123-1] Pita subtitle Indonesia di video Behindwork berbahasa Inggris (D-15/D-22 proyek).
  Setelah koreksi: `PITA` hanya peringatan secara bawaan, jadi proyek itu tidak ditolak. Bila proyek mau ketat tanpa `PITA`, isi `qc/ketat` dengan `JEDA KARTU LOGO`.
  Status: tidak lagi menghalangi; tinggal pilihan proyek.
- [K-20261123-2] Daftar tanda di `qc/ketat` (ketat sebagian) adalah tambahan pelaksana, tidak ada di daftar koreksi.
  Default yang dipakai: dipertahankan, karena menjawab K-20261123-1 tanpa mengikat gaya.
  Dampak kalau ditolak: hapus cabang `--blok` di `gerbang_produksi.sh` dan satu tes; `qc/ketat` kembali berarti "semua tanda".
