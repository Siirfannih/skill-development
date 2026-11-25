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
- **Anti-Pattern:** Menulis kode Remotion sebelum `BRAND.md`/`EDITING.md`, naskah, storyboard, `TYPE-TEST`, `TRANSITION-SHEET`, dan `RESEP.md` disetujui; atau langsung mengeksekusi permintaan user yang kabur (*"bikin premium"*, *"tambah glass/glow"*, campur serif+bold) padahal bertabrakan dengan referensi utama.
- **Invariant:** Jalankan **Brief Sanitizer** sebelum build (jika brief user memicu *AI-Slop Trigger* atau konflik referensi, berhenti 1 turn untuk menyandingkan bukti & konfirmasi opsi aman); lalu jalankan `profil_cek.py` → naskah → `board.py` + `TYPE-TEST` + `TRANSITION-SHEET` → `resep_check.py` → `cek_komposisi.py`.
- **Primitives/Ref:** `scripts/juri/profil_cek.py`, `resep_check.py`, `tahap.py`, `scripts/storyboard/board.py`, `scripts/gate/cek_komposisi.py`. · Vault: `../_vault/06-script-and-story/18-sentence-role-scene-matching.md`
- **Gate:** `profil_cek.py` + `resep_check.py` + `cek_komposisi.py` exit 0 sebelum build.
