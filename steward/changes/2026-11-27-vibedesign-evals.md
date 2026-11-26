# vibedesign: enam kasus eval baru (vd-006 … vd-011)
Masalah: lima kasus eval (vd-001..005), belum ada hasil; koreksi tata ruang (jarak kelompok, ruang kosong, objek melayang), karakter, angka, dan profil merek yang belum ada belum jadi kasus, jadi perubahan skill berikutnya tidak punya uji untuknya.
Perubahan: enam berkas `claude/vibedesign/evals/cases/vd-006.json` … `vd-011.json` (format sama dengan vd-001, Indonesia, 3–4 assertion yang bisa dicek); satu baris asal-usul di `claude/vibedesign/SUMBER.md`. Tidak ada aturan atau instruksi skill yang berubah.
Bukti: `projects/vibedesign-meta-carousel/DECISIONS.md` D-020 (:26), D-026/D-031/D-033 (:32,:37,:39), D-028 (:34), D-010/D-016/D-017 (:16,:22,:23), D-034/D-035 (:40,:41); `review/2026-11-23.md:42` di ops-report (Designer diminta menunggu BRAND.md).
Hasil cek: `python3 -m json.tool` lulus untuk 11 berkas kasus; `steward_check.py` 0 error, 52 peringatan (sama dengan sebelum); kasus belum dijalankan terhadap model (hasil per kasus: `evals/results/` kosong).
Dampak: perubahan skill vibedesign berikutnya diuji terhadap kasus ini. Assertion vd-007/vd-008 merujuk KMP-04 dan KMP-03; vd-011 merujuk perilaku "draf profil, jangan menunggu" (WP-07).
Level: Behavior
Persetujuan: permintaan langsung (Irfan 27 Nov, "vibedesign … perlu dilatih lagi", terjemahan) · diterapkan [A]
Cara membatalkan: `git revert` commit ini.
