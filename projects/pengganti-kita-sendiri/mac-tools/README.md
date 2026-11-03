# Alat Mac PKS (salinan dari `~/Documents/Skill-Development/AI-Video/pks-studio/`)

Disalin ke repo pada 3 Nov 2026 supaya proyek berikutnya bisa memakainya lagi. Path di dalam skrip masih path Mac Irfan.

**Render Remotion**
- `seg.sh <nama> <a> <b> [scale]`: render segmen; dengan prop sfxlog menghasilkan penanda `.sfx`.
- `patch22.sh <fA> <fB>`: tambal rentang frame di render final, lalu mux ulang dua versi audio.
- `final21.sh`: render final.
- `stills.sh`: still QC per frame, dijadikan lembar.
- `sync21.sh`: sinkronkan `remotion/src` dari origin/main tanpa menyentuh clone lokal.

**`ears/` (venv earshot, Python 3.12)**
- `palette.py`, `palette2.py`, `rank.py`: pilih SFX dengan telinga earshot.
- `family.py`: potong file SFX berisi banyak varian berdasarkan jeda hening.
- `irfan_sfx.py`: katalog folder SFXIrfan.
- `motion_curve.py`: kurva gerak video (flow, diff, onset), untuk menaruh puncak whoosh di kecepatan kamera tertinggi dan mencari jeda statis.
- `tl_sum.py`: ringkasan timeline earshot referensi.
