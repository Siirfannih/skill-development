---
id: "Q02"
pola: Visual Balance & 6-Class Fail Catalog
pack: 06-qc-and-verification
kategori: qc
kategori_lain: [typography, layout]
trigger: menilai still per beat dan mencegah 6 kelas kesalahan visual yang pernah ditolak pemilik
fungsi: [qc]
sumber: sintesis 21 contoh gagal & cek keseimbangan visual
dilihat_bergerak: ya
diukur: ya
alias: []
vault: [../_vault/02-typography-and-captions/83-head-space-word-staging.md]
---
### Q02 · Visual Balance & 6-Class Fail Catalog
- **Trigger:** menilai still per beat dan mencegah 6 kelas kesalahan visual yang pernah ditolak pemilik
- **Anti-Pattern:** Lolos skor skrip padahal (1) dua lapis teks/pita bawah, (2) massa berat satu sisi atau 3–4 objek berebut fokus, (3) teks menimpa wajah/gestur/motif/kolom UI, (4) spam grid simetris (> 4 kartu identik) atau tekstur Apple Glass + radial glow ungu/biru generik pada objek 2,5D/3D, (5) dokumen bukti diburamkan, atau (6) komposisi dikarang tanpa memeriksa keyframe kartu referensi.
- **Invariant:** Buka still di ukuran 25% & 100% berdampingan dengan frame kunci kiblat (`sandingkan.py`): cek satu fokus dominan, 3–4 elemen organik (bukan grid spam), urutan baca, satu permukaan utuh, kedekatan ke subjek (4–8%), dan kesesuaian syarat `KONDISI.md`; elemen yang tidak lolos makna, sistem, takaran dihapus atau diganti.
- **Primitives/Ref:** `scripts/juri/sandingkan.py`, `teks_cek.py`, `tema_cek.py`, `palette_check.py`, `cookbook/contoh-gagal/`. · Vault: `../_vault/02-typography-and-captions/83-head-space-word-staging.md`
- **Gate:** `qc/JURI.md` berisi evaluasi per still + `PUTUSAN: LULUS` sebelum render draft/final.
