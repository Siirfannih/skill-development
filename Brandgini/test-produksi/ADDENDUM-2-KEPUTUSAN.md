# Addendum 2 (25 Nov 2026, 22:40) — keputusan atas pertanyaan agen ep02/ep03

Diputuskan oleh agen utama atas mandat Irfan (Irfan sedang pergi). Berlaku di atas ADDENDUM-KEPUTUSAN.md bila bertentangan.

0. **Butir 7 ADDENDUM-KEPUTUSAN.md sudah diperbarui**: gerbang mekanis adalah alat bantu dan **boleh tidak dijalankan atau kegagalannya diterima** bila kondisinya berbeda, dengan satu baris alasan + bukti di LOG. Yang mutlak hanya teknis pengiriman (format, resolusi, clipping) dan legal. Baca ulang butir 7.
1. **`cut_check` / kunci suara pada TTS**: kegagalan ambang jeda pada stem TTS diterima dengan alasan tertulis (jeda TTS alami tapi berbeda pola dari suara manusia). Kunci suara dilanjutkan.
2. **Loudness take TTS**: −17,9 LUFS dengan puncak ≤ −1 dBFS diterima; trim linear ≤ 0,5 dB boleh (K-07). Tidak ada TTS ulang hanya demi angka.
3. **Kata ganda caption pelat vs teks kinetik**: diterima sebagai bagian K-05 (plan memakai caption selalu aktif + "teks layar"). Batasi teks kinetik besar ke 1 kata kunci per beat.
4. **Golden frame belum ada**: G6 dilewati dengan alasan "golden belum disetujui Irfan"; simpan 2–3 still terbaik sebagai **kandidat golden** di `qc/golden-kandidat/` untuk disetujui Irfan.
5. **Hook yang diucapkan** (cap pembuka ikut di VO) dan **objek vektor 2D** (tanpa foto berlisensi): diterima.
6. **Kuota Gemini TTS Free Tier 10 permintaan/hari** (reset ±16:00 WITA): **jangan memanggil TTS lagi malam ini**. ep02 memakai take yang sudah ada. ep03: lanjutkan storyboard dan build dengan timing perkiraan dari naskah (catat sebagai deviasi urutan tahap dengan alasan kuota); VO dan penyesuaian timing dikerjakan setelah kuota pulih — tandai item `tertahan` dengan alasan "menunggu kuota TTS" setelah build siap.
7. **Target**: ep02 sampai render final + `sg_qc.sh` + `review_final`. ep03 sampai storyboard + build siap-VO.
8. Keputusan baru: laporkan di balasan akhir (bagian "Keputusan untuk Irfan"), jangan hanya di file.

## Tambahan Irfan (22:35)
9. **Kesalahan/noise di take TTS dipotong (cut), bukan generate ulang.** Potong bagian yang salah, gagap, atau noise dengan alat potong (`recut`/alat di `alat/`), lalu lanjut. Generate ulang hanya bila potongan tidak bisa menyelamatkan kalimat.
10. **Partikel lisan ("tuh", "nih", "loh", "gitu") di naskah lisan disengaja**, bukan filler sampah; keluarkan dari daftar filler saat `cut_check`/`audio_order lock` (catat alasannya).
11. **Musik bed**: cari dulu di library Drive `gdrive:Claude edit/sfx/` (rclone: `~/.local/bin/rclone`, termasuk `Kenyset/` dan `Epidemic/ruang/`); bila tidak ada yang cocok, cari di internet trek berlisensi **komersial tanpa kewajiban kredit** (mis. Pixabay Content License atau CC0/public domain). Jangan pakai trek yang mewajibkan atribusi (video tanpa kredit, K-02). Catat URL sumber + URL lisensi di LOG. Lolos `sfx_vet.py`/`music_fit.py` sebagai pertimbangan (butir 7).
