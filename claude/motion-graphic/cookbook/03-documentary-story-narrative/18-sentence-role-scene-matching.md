---
id: "18"
pola: Sentence-Role Scene Matching
pack: 03-documentary-story-narrative
kategori: script
kategori_lain: [layout, texture, typography]
trigger: klip wawancara/esai edukasi yang dipecah per peran kalimat ke adegan ilustratif berganti-ganti
sumber: wawancara edukatif & esai berilustrasi · 30 fps
dilihat_bergerak: tidak
diukur: ya
alias: []
vault: [../_vault/06-script-and-story/18-sentence-role-scene-matching.md]
---
### 18 · Sentence-Role Scene Matching
- **Trigger:** klip wawancara/esai edukasi yang dipecah per peran kalimat ke adegan ilustratif berganti-ganti
- **Anti-Pattern:** Menempelkan palet gradien biru generik ke semua proyek, membiarkan ilustrasi tidak menggambarkan ucapan, atau menyalin template gaya tetap tanpa racikan proyek.
- **Invariant:** Petakan setiap kalimat ke perannya (pembuka kategori, bukti fakta, analogi personal, vonis) dan ganti perlakuan visual antar-peran (lukisan/ilustrasi, garis alur, teks ruang kosong) memakai palet merek proyek aktif.
- **Primitives/Ref:** `SpatialDepthStage.tsx`, `HighlighterSweep.tsx`, `curves.ts`. · Vault: `../_vault/06-script-and-story/18-sentence-role-scene-matching.md`
- **Gate:** Tabel storyboard + kolom uji logika dunia nyata (`VIS-02`) + `resep_check.py` PASS.
