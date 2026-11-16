# REPORT v6 · Perbaikan gerbang SFX

Tanggal: 16 November 2026. Agen: Codex. Hasil: dua bug validator diperbaiki; semua 32 tes audio lulus. Ini hasil pemeriksaan validator, bukan putusan QC video.

## Masalah dan perubahan

Lantai E24 (`claude/motion-graphic/SKILL.md`, butir 24) mewajibkan satu peran memakai satu file, onset minimal 100 ms, whoosh minimal 1 detik, serta maksimal 5 cue dalam jendela 2 detik. `spam_check()` masih menolak pengulangan file yang sama kurang dari 1 detik, sehingga gelombang objek yang sah ditolak.

Bug kedua: pola whoosh mencakup semua nama/peran `transisi` atau `transition`, tetapi mengabaikan label `dengar`. Katalog `claude/motion-graphic/guide/sfx/SFXIRFAN.md` membedakan `Cutcontrastransision.mp3` (pen click / key release), `Lasertransision.mp3` (triangle / glass ting), dan `scaningfast.mp3` (whoosh pendek). Batas 1 detik pada E24 berlaku untuk whoosh; fungsi cut/transisi saja tidak membuktikan bunyinya whoosh.

- `claude/motion-graphic/scripts/gate/sfx_density.py`: hapus loop `last`/file dan pengecualian regex kata/typing dari `spam_check()`; perbarui dua docstring terkait. Hapus hanya kata generik `transisi|transition` dari pola WHOOSH; pertahankan `whoosh|woosh|swoosh|swish|whip`. Cari pola tersebut pada gabungan `peran`, `file`, dan `dengar`: satu bukti saja cukup, sehingga label netral tidak membatalkan bukti whoosh dari field lain. Tidak ada pengecualian nama file. Ambang flam, burst, peran, palet, cakupan, kewajiban `alasan`/`dengar`, dan bunyi per kata tidak berubah. Tidak ada waiver/override baru.
- `claude/motion-graphic/scripts/tests/test_audio_gates.py`: tambah delapan tes regresi. Tes burst dan kasus siapa yang dianggap whoosh menjalankan `main()` asli dengan pembacaan cue JSON sebenarnya; hanya `visual_events()` diganti data tetap supaya tidak perlu decode video. Rumus burst tidak disalin ke tes.

Diff dua file kode: 107 baris ditambah, 11 dihapus; laporan ini adalah file ketiga yang dibuat. Tidak ada perubahan video, konfigurasi global, atau symlink. Commit, push, dan pembaruan peta diserahkan ke sesi utama.

## Bukti regresi

| Kasus | Hasil setelah perbaikan |
|---|---|
| B08, peran dan file sama, onset `[0, 0.23, 0.46]` | `spam_check=[]`; gerbang PASS, exit 0 |
| B20, peran dan file sama, tujuh onset `i * 0.65`, `i=0..6` | `spam_check=[]`; gerbang PASS, exit 0 |
| Dua whoosh dengan file berbeda, jarak 0.65 detik | 1 pelanggaran whoosh |
| Dua whoosh dengan file berbeda, jarak tepat 1 detik | Tidak ada pelanggaran whoosh |
| Pen click `Cutcontrastransision.mp3`, ting `Lasertransision.mp3`, dan glitch `panel-transition.wav`, masing-masing diulang pada 0 dan 0.3 detik | `spam_check=[]`; gerbang PASS, exit 0 |
| Whoosh hanya terbukti melalui peran, hanya nama file, atau hanya `dengar` pada `scaningfast.wav`, jarak 0.65 detik | Gerbang FAIL, exit 1 karena whoosh; nama/label netral di field lain tidak mengecualikannya |
| Ketiga sumber bukti whoosh di atas, jarak tepat 1 detik | Gerbang PASS, exit 0 |
| File `Cutcontrastransision.mp3` diberi label `dengar=air whoosh` | Tetap FAIL pada 0.65 detik dan PASS pada 1 detik; nama file katalog bukan allowlist |
| Alias `whoosh`, `woosh`, `swoosh`, `swish`, `whip` pada masing-masing field peran/file/dengar, jarak 0.65 detik | Semua tetap terdeteksi sebagai pelanggaran whoosh |
| Dua click, file sama maupun berbeda, jarak 0.099 detik | 1 pelanggaran flam |
| Dua click, file sama maupun berbeda, jarak tepat 0.1 detik | Tidak ada pelanggaran flam |
| 5 cue pada `[0, 0.4, 0.8, 1.2, 1.6]` | Gerbang PASS, exit 0 |
| 6 cue pada `[0, 0.3, 0.6, 0.9, 1.2, 1.5]` | Gerbang FAIL, exit 1, `rentetan 6 cue dalam 2 dtk (maks 5)` |
| 6 cue dengan yang terakhir tepat pada 2 detik | Gerbang PASS; cue pada batas 2 detik tidak masuk jendela awal |
| Tes lama `test_one_role_one_file` | PASS; pergantian file per peran dan pemakaian file untuk beberapa peran tetap ditolak |
| Tes lama palet terlarang dan cakupan objek | PASS |

Sebelum perbaikan pertama, menjalankan tes baru terhadap implementasi lama menghasilkan exit 1: B08 memiliki 2 false positive dan B20 memiliki 6 false positive `file sama`. Uji lima cue dan jendela tepat 2 detik juga gagal karena cek legacy yang sama. Uji batas whoosh dan flam sudah lulus saat itu.

Sebelum perbaikan kedua, full suite dengan tes baru menghasilkan `Ran 32 tests in 3.822s`, exit 1, 9 kegagalan subtes: tiga transisi non-whoosh salah ditolak; lima alias whoosh pada `dengar` tidak ditangkap; dan whoosh pada `scaningfast.wav` berjarak 0.65 detik lolos keliru. Semua tes perbaikan pertama tetap lulus.

## Perintah dan exit code

Dijalankan dari root worktree memakai `/home/irfan/work/mg-venv/bin/python`, dengan `OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1`.

```bash
env OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 /home/irfan/work/mg-venv/bin/python -m unittest discover -s claude/motion-graphic/scripts/tests -p test_audio_gates.py -k SfxPolicyTests -v
```

Sebelum fix: 7 tes, 4 kegagalan (termasuk subtes B08/B20), exit **1**. Sesudah fix: 7 tes lulus, exit **0**.

```bash
env OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 /home/irfan/work/mg-venv/bin/python -m unittest discover -s claude/motion-graphic/scripts/tests -p test_audio_gates.py -v
```

Sesudah perbaikan pertama: `Ran 29 tests in 3.812s`, `OK`, exit **0**. Sesudah perbaikan kedua: seluruh **32 tes lulus**, `OK`, exit **0**. Tes menampilkan `ResourceWarning` dari pembacaan file lama di `load_cues()`; tidak ada kegagalan tes dan penanganan file tersebut tidak diubah dalam fix ini.

```bash
git diff --check -- claude/motion-graphic/scripts/gate/sfx_density.py claude/motion-graphic/scripts/tests/test_audio_gates.py
```

Hasil: tanpa keluaran, exit **0**.
