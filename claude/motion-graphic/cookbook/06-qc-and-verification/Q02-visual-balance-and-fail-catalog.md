---
id: "Q02"
pola: Visual Balance & 6-Class Fail Catalog
pack: 06-qc-and-verification
kategori: qc
kategori_lain: [typography, layout]
trigger: menilai still per beat dan mencegah 6 kelas kesalahan visual yang pernah ditolak pemilik
sumber: sintesis 21 contoh gagal & cek keseimbangan visual
dilihat_bergerak: ya
diukur: ya
alias: []
vault: [../_vault/02-typography-and-captions/83-head-space-word-staging.md]
---
### Q02 · Visual Balance & 6-Class Fail Catalog
- **Trigger:** menilai still per beat dan mencegah 6 kelas kesalahan visual yang pernah ditolak pemilik
- **Anti-Pattern:** Lolos skor skrip padahal (1) dua lapis teks/pita bawah, (2) massa berat satu sisi frame, (3) teks menimpa wajah/gestur/motif/kolom UI, (4) inset kecil mengambang di kanvas kosong, (5) dokumen bukti diburamkan, atau (6) teknik kartu dipasang tanpa mencocokkan kondisi footage.
- **Invariant:** Buka still di ukuran 25% & 100% berdampingan dengan frame kunci kiblat (`sandingkan.py`): cek keseimbangan massa kiri-kanan, satu fokus, urutan baca, satu permukaan utuh, kedekatan ke subjek (4–8%), dan kesesuaian syarat `KONDISI.md`.
- **Primitives/Ref:** `scripts/juri/sandingkan.py`, `teks_cek.py`, `tema_cek.py`, `palette_check.py`, `cookbook/contoh-gagal/`. · Vault: `../_vault/02-typography-and-captions/83-head-space-word-staging.md`
- **Gate:** `qc/JURI.md` berisi evaluasi per still + `PUTUSAN: LULUS` sebelum render draft/final.
