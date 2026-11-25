---
id: "Q03"
pola: Frame Audit 100% (No Sampling)
pack: 06-qc-and-verification
kategori: qc
kategori_lain: [camera, typography]
trigger: audit visual menyeluruh setelah adegan tersusun dan sebelum masuk fase SFX/musik maupun render final
sumber: sintesis audit semua frame tanpa sampling
dilihat_bergerak: ya
diukur: ya
alias: []
vault: [../_vault/01-camera-and-transitions/14-tile-grid-cut-wipe.md]
---
### Q03 · Frame Audit 100% (No Sampling)
- **Trigger:** audit visual menyeluruh setelah adegan tersusun dan sebelum masuk fase SFX/musik maupun render final
- **Anti-Pattern:** Menilai video dari still acak tiap 8–15 frame, melewatkan patahan transisi/frame kosong di batas adegan, atau mengabaikan kata KT yang belum lengkap saat muncul.
- **Invariant:** Render seluruh frame skala 0,5 (`render.sh <proyek> frames`), bangun lembar kontak per ≤ 10 dtk via `frame_audit.py` + `SELURUH.jpg`, periksa dengan mata oleh satu penilai (`pemeriksa-frame`) + 1 ronde `devils-advocate` steril sebelum render final.
- **Primitives/Ref:** `scripts/juri/render.sh`, `frame_audit.py`, `kt_ocr.py`, `motion_lint.py`, `templates/roles/devils-advocate.md`. · Vault: `../_vault/01-camera-and-transitions/14-tile-grid-cut-wipe.md`
- **Gate:** `frame_audit.py` (`PUTUSAN: LULUS` di semua chunk) + `kt_ocr.py` + `motion_lint.py` PASS.
