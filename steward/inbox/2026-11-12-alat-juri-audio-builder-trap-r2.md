# alat juri audio builder trap r2
Origin: [A] agent inference
Project: projects/builder-trap-r2
What happened: carried over from the retired `PENDING.md` (line 18, kept verbatim in `archive/riwayat/PENDING.md`). Text, in the original Indonesian:
> Alat juri/audio (builder-trap r2, 12 Nov): (1) `render.sh final` gagal "kartu kiblat tidak ditemukan" bila dijalankan dari folder proyek — `resep_check.py` mencari kartu relatif ke cwd; jalankan dari root repo atau perbaiki path. (2) Render final gagal di PC beban tinggi (delayRender Img 28 dtk); usul `Config.setDelayRenderTimeoutInMilliseconds(180000)` di template proyek. (3) `visual_coverage.py`/`sync_cues.py` masih ber-path proyek lama (`render/cues.json`, `/home/claude/thegap`). Perbaiki?
Evidence: as cited in the text above.
Suggested lesson: Three tool fixes: `resep_check.py` finds the reference card relative to cwd; render timeout in the project template; old project paths in `visual_coverage.py` and `sync_cues.py`.
