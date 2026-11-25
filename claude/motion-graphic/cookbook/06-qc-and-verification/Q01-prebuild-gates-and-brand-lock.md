---
id: "Q01"
pola: Pre-Build Gates & Brand Lock
pack: 06-qc-and-verification
kategori: qc
kategori_lain: [script, layout]
trigger: memulai proyek video baru atau beralih dari pra-produksi ke penulisan kode Remotion
sumber: sintesis gerbang 0–3 pra-build
dilihat_bergerak: ya
diukur: ya
alias: []
vault: [../_vault/06-script-and-story/18-sentence-role-scene-matching.md]
---
### Q01 · Pre-Build Gates & Brand Lock
- **Trigger:** memulai proyek video baru atau beralih dari pra-produksi ke penulisan kode Remotion
- **Anti-Pattern:** Meniru layout referensi/kartu secara mentah tanpa membedah naskah; menumpuk elemen ramai tanpa hierarki kedalaman; atau langsung mengeksekusi brief kabur (*"bikin premium"*, *"tambah glass/glow"*, campur serif+bold) tanpa menyelaraskan dengan referensi.
- **Invariant:** Jalankan **Script-First Breakdown** (bedah pesan tiap kalimat → pilih wujud paling sederhana, default 1 fokus tunggal; bila menggambarkan banyak item/keramaian, batasi maks 2–3 tajam di depan & sisanya makin jauh makin redup) + **Brief Sanitizer** (berhenti 1 turn bila brief memicu *AI-Slop Trigger* atau konflik referensi); lalu jalankan `profil_cek.py` → naskah → `board.py` + `TYPE-TEST` + `TRANSITION-SHEET` → `resep_check.py` → `cek_komposisi.py`.
- **Primitives/Ref:** `scripts/juri/profil_cek.py`, `resep_check.py`, `tahap.py`, `scripts/storyboard/board.py`, `scripts/gate/cek_komposisi.py`. · Vault: `../_vault/06-script-and-story/18-sentence-role-scene-matching.md`
- **Gate:** `profil_cek.py` + `resep_check.py` + `cek_komposisi.py` exit 0 sebelum build.
