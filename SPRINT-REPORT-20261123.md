# Sprint malam 23 Nov 2026 · core, format terkunci, gerbang fail-closed

Branch `feat/core-gates-format-locks` (basis `origin/main` `424f2313`). Agent: Claude (claude2). Belum di-merge; menunggu audit.

## File berubah

Baru:
- `claude/motion-graphic/MOTION-CORE.md` (6.979 byte; batas 12.000)
- `claude/motion-graphic/formats/README.md`, `story-doc-16x9.md`, `journey-talkinghead.md`
- `claude/motion-graphic/scripts/gate/cek_komposisi.py` (versi umum dari `projects/behindwork-batch-1/remotion/bangun/`)
- `claude/motion-graphic/scripts/juri/gerbang_produksi.sh` (dipanggil `render.sh final`/`lego`)
- `claude/motion-graphic/scripts/tests/test_gerbang_produksi.py` (31 tes), `test_audit_dokumen.py` (12 tes)

Diubah:
- `AGENTS.md`, `claude/motion-graphic/SKILL.md`: bagian atas menunjuk MOTION-CORE + satu Format Bible untuk sesi produksi
- `claude/motion-graphic/scripts/audio/audio_phone.py` (`--gate`), `sfx_comfort.py` (`--min-comfort`), `sfx_potong.py` (`--laporan`), `audio/README.md`
- `claude/motion-graphic/scripts/juri/render.sh`: satu baris pemanggil gerbang produksi + komentar butir 10
- `claude/motion-graphic/references/build.md`: Remotion + rakit lego sebagai jalur utama, dua sisa rujukan AE dihapus
- `tools/peta.py`: rute produksi, grup pintu produksi, `jaga_rute()`; `PETA.md` diregenerasi
- `SUMBER.md` (root): asal-usul semua perubahan

## Hasil verifikasi (dijalankan setelah perubahan terakhir)

| Perintah | Hasil |
|---|---|
| `cd claude/motion-graphic/scripts && python3 -m unittest discover -s tests` | `Ran 151 tests in 36.4s` · `OK` (108 lama + 43 baru) |
| `python3 tools/peta.py` | `PETA.md ditulis (270 baris)`; `--check`: `PETA.md terbaru` |
| `python3 tools/sumber_cek.py` | `0 tanda sumber di 271 file instruksi (bersih)`, exit 0 |
| `CLAUDE_CONFIG_DIR=~/.claude-2 ./tools/doctor.sh` | exit 1, **hanya** karena 16 baris "skill … terpasang sebagai salinan, bukan symlink ke repo" (symlink akun menunjuk repo utama, bukan worktree ini). Semua cek isi OK: repo terbaru, PETA terbaru, cookbook valid, lantai SKILL.md = LANTAI.md, file instruksi tanpa tanda sumber, font 232 file |

## Yang diukur pada data nyata

`cek_komposisi.py` dijalankan pada `projects/behindwork-batch-1/remotion/src/data/ep01–ep05.json` (r2) dengan `public/` dari mesin kerja (hanya dibaca):
- Mode bawaan: kelima episode LULUS (nol WAJAH/INSET/TEPI/ASET), jadi proyek itu tidak pecah.
- Tanda baru pada ep01: `JEDA` di 6,74 dtk (0,38 dtk kosong), 18,41 dtk (0,71), 52,58 dtk (0,34), dan `PITA` (24 baris subtitle bersama KT). Dua yang pertama cocok dengan jeda gelap 0:06 dan 0:18 di audit visual. Dengan `--ketat` (format story-doc) ep01–05 **ditolak** sampai subtitle dan jeda itu diperbaiki.

## Temuan audit W4/W6: keadaan di basis

- `storyboard.md §16.3`: tidak ada lagi di `424f2313`; `irfan-creative-workflow/SKILL.md` merujuk `storyboard.md` §5, dan heading itu ada. Tidak diubah; ditambah tes yang memeriksa semua rujukan `file.md §N` di pintu masuk (16 rujukan, semua valid).
- `orkestrasi.md` "tidak membuka gambarnya": sudah tidak ada di basis. Tidak diubah; ditambah tes regresi.
- `build.md`: kalimat "Default: After Effects" sudah tidak ada; dua sisa rujukan AE dibersihkan dan kalimat jalur utama dipertegas.
- `PETA.md` Fase 3: sudah memuat `guide/visual/GUIDE.md`; `tools/peta.py` sekarang berhenti bila baris itu kehilangan guide teks/visual/gerak.

## Belum teruji / batasan

1. `render.sh final` ujung-ke-ujung dengan gerbang baru pada proyek nyata belum dijalankan (butuh audio terkunci, still, JURI, audit frame). Yang teruji: `gerbang_produksi.sh` sendiri (8 tes) dan bahwa `render.sh` memanggilnya sebelum "Render penuh ditolak".
2. `audio_phone.py --gate` dan `sfx_comfort.py --min-comfort` diuji dengan sinyal sintetis, belum dengan stem video nyata. Tes `sfx_comfort` memakai `earshot` tiruan (skor CLAP 0), jadi bagian CLAP tidak teruji.
3. Belum ada skrip mix yang menulis `audio/sfx_potong.json`; gerbang potong baru aktif setelah mix proyek menulis laporan itu. Begitu juga stem: mesin behindwork belum menulis `stem_*.wav`.
4. Tanda `LOGO` butuh kotak `ramai` di `aset.json`; pre-processor aset (`aset_peta.py`, di folder proyek) belum mengisinya, jadi harus ditandai tangan. Kasus papan Denny's 0:44 tidak tertangkap otomatis tanpa itu. Jeda 0:46 juga tidak tertangkap `JEDA` (di data r2 kanvas itu berisi teks tepat waktu; kemungkinan asalnya render r3 atau gerak masuk teks).
5. `SKILL.md` motion-graphic tetap 25 KB karena salinan Lantai disinkronkan `tools/sync_lantai.py`; sesi yang memuat skill lewat daftar skill tetap menerima file penuh. Yang berubah adalah instruksi di atasnya. Merampingkan SKILL.md berarti mengubah mekanisme sinkron Lantai; tidak dikerjakan di sprint ini.
6. `journey-talkinghead` belum punya mesin atau gerbang komposisi mekanis (proyek acuannya di luar repo); cek dunia/potong masih dengan mata + hitung potong ffmpeg. Angka "±1 cue tiap 0,9 dtk" diturunkan dari K-13 (76 cue / 66 dtk), bukan diukur ulang.
7. Format Bible belum diuji lewat `EVALS-DESIGN.md` (bandingkan perilaku agen lama vs baru); statusnya rancangan yang lolos tes struktur, bukan hasil teruji di produksi.

## Perlu keputusan

- [K-20261123-1] Pita subtitle Indonesia di video Behindwork berbahasa Inggris (D-15/D-22 proyek) bertentangan dengan format story-doc yang baru (nol pita bila KT tampil).
  Default yang dipakai: format melarang; pengecualian hanya atas instruksi yang dicatat di `RESEP.md`, dan `--ketat` tetap menolak. Bisa dibalik dengan mengeluarkan `PITA` dari daftar blokir format.
  Dampak kalau memilih lain: `formats/story-doc-16x9.md` §6, `gerbang_produksi.sh` (flag `--ketat`), satu tes.
  Status: berjalan dengan default.
