# vibedesign: ruang kosong punya tugas (KMP-04), catatan sketsa, uji tukar
Masalah: koreksi pemilik soal ruang mati (D-026 whitespace lebar memaksa mata turun, D-031 whitespace mati antara headline dan dock, D-033 ruang atas kosong dan margin atas tidak seragam) belum jadi panduan; hanya D-020/D-028 yang sudah (KMP-02, KMP-03). Uji tukar copy (D-009, D-013, PSN-01) belum ada di cek akhir.
Perubahan:
- `guide/komposisi/GUIDE.md`: KMP-04 (pita kosong tanpa tugas ≤ 2× jarak antar-kelompok; margin atas seragam ≤ 1 % tinggi kanvas; boleh bila tugasnya ditulis satu kalimat di RESEP).
- `DESIGN-CORE.md` §1 langkah 3: kalimat tambahan (urutan terbaca 1→3 dan pita kosong terlebar dengan tugasnya di TAHAP); §2: satu butir "Ruang kosong punya tugas".
- `guide/hindari/GUIDE.md` "Cek cepat sebelum kirim": satu butir uji tukar.
- `SUMBER.md`: baris KMP-04 dan baris asal-usul.
Bukti: `projects/vibedesign-meta-carousel/DECISIONS.md:32,37,39` (KMP-04) dan `:15,19` (uji tukar); kasus `evals/cases/vd-007.json`.
Hasil cek: struktural lulus (`steward_check.py` 0 error, 52 peringatan, sama dengan sebelum; `peta.py --check`, `sumber_cek`, `sync_lantai`, `sync_negatif` bersih; DESIGN-CORE.md ≤ 4,2 KB). Uji perilaku BELUM DIJALANKAN (butuh model): protokol, kriteria lulus, dan cara menjalankan ada di `2026-11-27-vibedesign-ruang-kosong/skenario.md`. Perubahan ini belum teruji perilakunya.
Dampak: agen Designer mengukur pita kosong terlebar dan margin atas dan menuliskannya sebelum membangun; cek akhir menambah satu uji (tukar topik). Risiko: DESIGN-CORE.md membesar 3.367 → 3.635 byte; KMP-04 bisa terlalu ketat untuk slide yang sengaja lengang, itulah pengecualian "tugas ditulis di RESEP".
Level: Behavior
Persetujuan: permintaan langsung (Irfan 27 Nov, "vibedesign … perlu dilatih lagi", terjemahan) · diterapkan [A]
Cara membatalkan: `git revert` commit ini.
