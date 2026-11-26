---
id: "Q05"
pola: Surgical Revision & Baseline Lock
pack: 06-qc-and-verification
kategori: qc
kategori_lain: [camera, typography]
trigger: mengerjakan masukan atau keluhan revisi atas video yang sudah pernah dirender
fungsi: [qc]
sumber: sintesis aturan revisi diff per atribut & baseline lock
dilihat_bergerak: ya
diukur: ya
alias: []
vault: [../_vault/01-camera-and-transitions/63-virtual-camera-desktop-stage.md]
---
### Q05 · Surgical Revision & Baseline Lock
- **Trigger:** mengerjakan masukan atau keluhan revisi atas video yang sudah pernah dirender
- **Anti-Pattern:** Menulis ulang proyek dari nol saat revisi, memigrasi adegan yang sudah disetujui, mengubah atribut yang tidak diminta (warna/posisi/durasi blok lain), atau merakit ulang seluruh master penuh di setiap ronde kecil.
- **Invariant:** Catat masukan ke `DECISIONS.md` dulu, kunci basis lewat `revisi_cek.py mulai` + `baseline_lock.py approve`, ubah hanya lapisan/atribut yang diminta, rakit rentang berubah (`compose.py --rentang` + still sebelum/sesudah), dan validasi dengan `revisi_cek.py cek`.
- **Primitives/Ref:** `scripts/juri/revisi_cek.py`, `scripts/baseline_lock.py`, `scripts/lego/compose.py`, `references/revision-log.md`. · Vault: `../_vault/01-camera-and-transitions/63-virtual-camera-desktop-stage.md`
- **Gate:** `revisi_cek.py cek` + `baseline_lock.py check` PASS (nol perubahan di luar ledger).
