# TASK r9 · Builder Trap r2 v5 — pulihkan kata utuh, sambungan halus, UI lebih berdimensi

## TUJUAN

Lanjutkan v4 tanpa membangun ulang: buat kandidat v5 yang tidak memotong fonem/kata, tetap lip-sync, dan memperbaiki kedalaman visual UI yang masih flat. Builder hanya menulis kode/data dan membuat proxy/still terukur; render final menunggu audit Sutradara.

## KONTEKS

Permintaan Irfan 16 Nov 2026:

> pemotongan audionya itu belum tepat, jadi suaraku terpotong di tengah-tengah, dan juga beberapa bagian visual itu kurang.
>
> Perbaikan prioritas kamu ada pada pemotongan audio yang kurang mulus. Tapi ada beberapa visualnya yang bisa diimprove lagi, misalkan ditambahin perspective agar UI-di videonya itu enggak terlalu flat, dan sebagainya.

Bukti audit independen sebelum tugas ini:

- `edit/v3/map.json` memiliki 39 splice. Banyak rentang buang masuk ke kata isi.
- `Apa` asli 89,14–89,56 dtk (420 ms) tinggal 27 ms pada timeline v4 karena gabungan cut 88,1667–89,5333.
- `Untuk` 540→247 ms; `Dan` setelah “sadar” 560→347 ms; `mungkin` 900→433 ms; `Semua` 740→407 ms.
- `scripts/audio/recut.py` fade-to-zero 4 ms di dua sisi tanpa overlap; `cut_check.py` memeriksa JSON kata lama yang hanya di-remap, jadi jumlah kata tetap 225 walau fonem hilang.
- Kandidat safe-cut awal: buang filler `tuh` dan jeda/noise nyata saja; jangan buang rentang beralasan `diam di dalam '<kata>'` kecuali waveform + transkrip ulang membuktikan kata tetap utuh.
- Contact sheet v4 menunjukkan dunia dinding bukti sudah berdimensi; UI Threads/GitHub full-frame di babak gelap masih paling flat. B12–B13 ChatGPT sudah memakai kamera Stage dan tidak boleh dibangun ulang.

## BACA HANYA

- `projects/builder-trap-r2/DELIVERY-v4.md`
- `projects/builder-trap-r2/DECISIONS.md` R-017…R-025
- `projects/builder-trap-r2/RESEP.md`
- `projects/builder-trap-r2/edit/potong_v3.json`
- `projects/builder-trap-r2/edit/v3/map.json`
- `projects/builder-trap-r2/edit/v3/words_final.json`
- `projects/builder-trap-r2/edit/words_final.json`
- `projects/builder-trap-r2/edit/make_knots_v3b.py`
- `projects/builder-trap-r2/audio/voice_clean_v3.py`
- `projects/builder-trap-r2/audio/cues_r8.py`
- `projects/builder-trap-r2/audio/mix_v3.py`
- `projects/builder-trap-r2/remotion/src/engine/timewarp.ts`
- `projects/builder-trap-r2/remotion/src/Main.tsx`
- `projects/builder-trap-r2/remotion/src/scenes/Act3.tsx`
- `projects/builder-trap-r2/remotion/src/scenes/Act4.tsx`
- `claude/motion-graphic/scripts/audio/recut.py`
- `claude/motion-graphic/scripts/gate/cut_check.py`

Jangan menjelajah folder lain. Kalau perlu file lain, tulis alasan di REPORT sebelum membukanya.

## FILE BOLEH DIUBAH

- `projects/builder-trap-r2/edit/potong_v5.json` (baru)
- `projects/builder-trap-r2/edit/make_v5.py` (baru; orkestrasi cut/remap, bukan render final)
- `projects/builder-trap-r2/edit/v5/**` (keluaran kerja; file media besar tetap ignored)
- `projects/builder-trap-r2/audio/voice_clean_v5.py` (baru)
- `projects/builder-trap-r2/audio/cues_v5.py` (baru)
- `projects/builder-trap-r2/audio/mix_v5.py` (baru)
- `projects/builder-trap-r2/remotion/src/data/knots_v5.json`
- `projects/builder-trap-r2/remotion/src/data/words_v5.json`
- `projects/builder-trap-r2/remotion/src/engine/timewarp.ts`
- `projects/builder-trap-r2/remotion/src/engine/words.ts`
- `projects/builder-trap-r2/remotion/src/Main.tsx`
- `projects/builder-trap-r2/remotion/src/Root.tsx`
- `projects/builder-trap-r2/remotion/src/scenes/Act3.tsx`
- `projects/builder-trap-r2/remotion/src/scenes/Act4.tsx`
- `projects/builder-trap-r2/handoff/REPORT-r9.md`
- `projects/builder-trap-r2/STATUS.md`
- `claude/motion-graphic/scripts/audio/recut.py`
- `claude/motion-graphic/scripts/gate/cut_check.py`

Jangan mengubah `scripts/juri/render.sh`, RESEP, PLAN, komponen UI bersama, beat lain, atau aset sumber.

## TEMUAN YANG HARUS DIPERBAIKI

1. **A-r9-01 · kata terpotong:** pulihkan semua kata non-filler. Rentang buang tidak boleh overlap kata non-filler >20 ms dan wajib menyisakan guard 50 ms dari onset/offset ujaran. `Apa`, `Untuk`, `Dan`, `mungkin`, `Semua`, `Share`, `gak`, `mau`, `satu`, `sekedar`, dan `aku` adalah daftar regresi wajib.
2. **A-r9-02 · sambungan notch:** potong pada titik energi rendah/zero crossing. Jika equal-power crossfade 12–20 ms diterapkan, durasi overlap harus masuk peta waktu sehingga audio–video tidak drift. Jika tidak bisa dibuktikan sinkron, gunakan splice di celah sunyi dengan micro-fade maksimal 2 ms dan tulis alasannya—jangan mempertahankan notch 4 ms di dalam fonem.
3. **A-r9-03 · gate palsu:** gate harus FAIL bila rentang buang overlap kata non-filler >20 ms atau durasi kata hasil remap menyusut <85% dari sumber. Filler eksplisit `tuh` boleh dibuang. Jangan memakai jumlah entri JSON sebagai bukti kata terdengar.
4. **V-r9-01 · UI flat:** beri perspektif/paralaks ringan hanya pada UI babak gelap/penutup yang masih seperti bidang ditempel (prioritas B17 dan B25; B18/B19 hanya bila still membuktikan perlu). Gunakan Stage/Place yang sudah ada, rotasi Y maksimal ±4°, X maksimal ±2°, z/shadow dan gerak kamera kecil. UI harus tetap terbaca dan tidak keluar safe frame. Jangan mengubah B12–B13.

## LARANGAN

- Jangan render final, jangan mengubah naskah/urutan kata, jangan generate aset berbayar.
- Jangan memotong di dalam kata atau mengandalkan timestamp Whisper sebagai batas akhir gelombang.
- Jangan menulis ulang scene; revisi diff pada beat sasaran saja.
- Jangan menjalankan render/Whisper saat job berat sesi lain aktif. Cek `pgrep -af 'remotion|ffmpeg|faster_whisper'`; untuk proxy gunakan concurrency 1 dan maksimal 2 thread.
- Jangan menghapus cache/aset/hasil sesi lain.

## LULUS BILA

1. Validator overlap/durasi kata PASS; seluruh kata non-filler mempertahankan ≥85% durasi sumber, dan 11 kata regresi di atas ≥90% atau dijelaskan dari waveform.
2. Transkrip ulang suara final tanpa prompt menghasilkan isi yang sama dengan target 225 kata dikurangi tiga filler `tuh`; tidak ada kata isi hilang/terpotong. Jalankan setelah job berat lain selesai.
3. Durasi audio, video wajah, komposisi, dan peta waktu berbeda ≤1 frame; spot lip-sync minimal awal, tengah, akhir PASS.
4. Typecheck Remotion PASS; `cekkata.mjs` PASS.
5. Still before/after B17 dan B25 menunjukkan kedalaman tambahan tanpa penurunan keterbacaan, safe frame, atau identitas UI asli.
6. Proxy audio/video skala 0,5 dibuat hanya setelah resource aman; belum final.
7. `REPORT-r9.md` memuat cut yang dipertahankan/dibuang, hasil validator, durasi, timestamp 11 kata regresi, file berubah, hasil typecheck, dan path proxy/still.

## FORMAT REPORT

```
Butir: builder-trap-r2-v5-r9 · <lulus | berjalan | tertahan>
Selesai: <bukti singkat>
Sisa: <kriteria belum lulus>
Gerbang: overlap <ok/gagal> · transkrip <ok/gagal/menunggu> · lip-sync <..> · typecheck <..> · cek kata <..> · still <..> · proxy <..>
Perlu keputusan: <atau ->
Catatan reviewer: <maks 3 baris>
```

