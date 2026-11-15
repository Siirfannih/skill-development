# Pipeline v6–v10 · Bali Digifest recap (kode saja)

Salinan kode dari `~/work/bdf26/v6/` di PC server (media, transkrip, dan data testimoni tidak di-commit).
Urutan (`run6.sh`): `sil6.py` (potong VO: kalimat utuh, celah-saja, isian) → `build6.py` (EDL, b-roll, hook A/B) → `extract_shots6.py` (cache per shot) → `mix6.py` → `sync9.py` (waktu kata dari suara final) → `heads6.py` / `broll_map6.py` (cache) → `kt6.py` → `layout6p.py` → `hook7.py` → `center8.py` (teks tengah setinggi dada, bebas wajah) → `kt6b.py` (kata besar, tag statis) → render.
QA: `qa_wave10.py` (batas potong tidak memotong gelombang), `qa_cuts8.py`, `qa_pause8.py`, `qa_drops8.py`, `bedah8.py` (per detik), `qa_frames9.py` (3 frame per teks dari video final), `qa_faces8.py`, `qa_audio6.py`.
