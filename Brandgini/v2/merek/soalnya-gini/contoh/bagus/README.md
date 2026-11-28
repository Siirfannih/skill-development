# Golden frame Soalnya Gini

Style frame yang disetujui Irfan, dipakai `tools/golden_cek.py` (keyframe per beat vs golden) dan `$MG/juri/sandingkan.py`.

## Cara membuat (sekali per gaya, sebelum episode pertama gaya itu)
1. Komponen bersama gaya dibangun (skill 06 §2).
2. Render still 1080x1920 dari komposisi Remotion yang sama (`render.sh still`), satu per `visual_type` yang paling sering: A-kolase `cap_pembuka`, `tanda_tangan_buka`, `kolase_hero`, `diagram_rakit`, `payoff_oh_gitu`; B-arsip `arsip_stabilo`, `arsip_polaroid`, `arsip_cetakbiru`, `arsip_stempel`.
3. Irfan menilai berdampingan dengan frame referensi (`../../../../analisis/detail/`) dan `cookbook/contoh-gagal/`. Setuju → ID baris DECISIONS.
4. Tambah entri di `golden.json`:
   `{"file": "A-kolase_hero.png", "gaya": "A-kolase", "visual_type": "kolase_hero", "disetujui": "D-012", "catatan": "…"}`
   Entri dengan `"disetujui": null` diabaikan. Frame yang ditolak → `../ditolak/` + satu baris sebab di EDITING.md.

Golden mengunci **gaya** (kanvas, huruf, aksen, perlakuan cutout, kepadatan), bukan komposisi: tiap episode tetap punya komposisi sendiri (kebijakan "minimal variation" YouTube, README §6).
