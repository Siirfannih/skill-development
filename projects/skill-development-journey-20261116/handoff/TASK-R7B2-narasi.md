# TASK-R7B2-narasi · narasi & slab mengikuti spine (kasus 3.2, 3.6, 3.1 sebagian; D-476/477/478)
Baca `handoff/R7B2-BERSAMA.md`. Pemilik lapisan teks wajah (override `lego/r7_override_ktwajah.json`, kode `remotion/src/video/bersama/kt83/**`, `lego/r7_ktwajah.py`).
## Maksud
Seluruh narasi yang diucapkan di adegan wajah terasa satu keluarga dengan still spine 1 dan 7, dan BERGERAK seperti `GERAK.md` (bukan potong-ganti). Slab kata kunci masuk seperti FINALLY.
## Kasus
- 3.2 · semua wadah di belakang narasi (pil abu/kaca, tag gelap, pil biru "habis banget") DIHAPUS. Keterbacaan dari posisi dan ukuran: di dinding kosong samping kepala bila dada ramai/tertutup tangan. Kata penekanan pakai bobot/ukuran, bukan wadah.
- Gerak: semua narasi (tangga, K4 dada, cincin) masuk dengan gelombang huruf (lihat strip zache 2,85–3,45 dtk); kata lama dalam satu frasa tetap di tempatnya; frasa satu makna satu kelompok (tidak dipecah ke sudut berbeda, D-465).
- Slab WORKFLOW-NYA, BALIK MODAL, LINTAS AGENT: tetap utuh di belakang kepala (still 4, keputusan Irfan: biarkan terpotong kepala), gerak masuk diganti seperti FINALLY (strip `lembar_gerak.jpg` baris a vs d). Label kecil "cuma mempelajari"/"Karena perlu"/"sistem kerja" rapat di atas slab, ukurannya diputuskan dari frame (kasus 3.6/§7.4).
- Saat narasi tampil di depan slab yang masih ada, slab diburamkan ringan (strip `ref-zache` 13,0–15,5 dtk).
- DECISION, VIRAL!! (15–21 dtk parodi, jangan dirapikan), FINALLY: tidak diubah selain jarak "dalam" yang sudah benar.
## FILE BOLEH
Kode/lapisan milik ktwajah di atas + `remotion/src/video/Root.tsx` (tambah Composition) + `remotion/src/video/bersama/tema.ts` (token baru bertanda D-47x). FILE JANGAN: override pekerja lain, adegan UI/IG/Blender/D, audio, edit, lego/r7_gabung.py.
## LAPORAN
`handoff/REPORT-R7B2-narasi.md` (lihat R7B2-BERSAMA §Menyerahkan).
