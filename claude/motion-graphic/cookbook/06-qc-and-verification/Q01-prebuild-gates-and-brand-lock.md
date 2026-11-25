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
- **Anti-Pattern:** Menulis kode Remotion atau generate aset berbayar sebelum `BRAND.md`/`EDITING.md`, naskah final, storyboard + tabel kritik 10 kolom, `TYPE-TEST`, `TRANSITION-SHEET`, dan `RESEP.md` disetujui pemilik.
- **Invariant:** Jalankan berurutan: `profil_cek.py` → naskah disetujui → `board.py` + Tabel Kritik + `TYPE-TEST` + `TRANSITION-SHEET` → `resep_check.py` → `cek_komposisi.py`; konfirmasi `render_mode` & `kt_tick` di `EDITING.md` dan `placement-map.json` sebelum worker build dimulai.
- **Primitives/Ref:** `scripts/juri/profil_cek.py`, `resep_check.py`, `tahap.py`, `scripts/storyboard/board.py`, `scripts/gate/cek_komposisi.py`. · Vault: `../_vault/06-script-and-story/18-sentence-role-scene-matching.md`
- **Gate:** `profil_cek.py` + `resep_check.py` + `cek_komposisi.py` exit 0 sebelum build.
