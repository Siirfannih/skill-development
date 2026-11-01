# Feedback Irfan 2 Nov 00.16 (v8 screenshot) + keputusan desain Claude

## F1 · 1:28–1:31 halaman "Cofounder" (S05e_SameChance?)
Masalah: satu template landing page diulang berjajar, monoton, dimensi kurang terasa.
Referensi: reel heynazir (instagram.com/reels/DfMSQM6x_SR) — latar gelap, kartu-kartu preview berbeda melayang di ruang mengitari ikon di tengah.
Desain v9:
- Latar hitam (fokus). Di tengah: logo AI asli digambar ulang sebagai SVG (ChatGPT; boleh Claude/Gemini berganti) — kartu **mengorbit** di elips 2.5D (z → skala, blur selektif, kartu di belakang logo tertutup logo).
- 8–10 preview **berbeda semua**: nama startup, palet, layout (hero gelap, gradien, editorial serif, mockup app HP, dashboard, pricing, chat UI, landing produk). Kualitas "situs asli terbaik", tanpa label contoh/placeholder.
- Kamera: push-in pelan + sedikit parallax; anchor kata dari ANCHORS-V9 tetap (SAMA) di tengah depan, masuk di frame terukur.
- SFX: tiap kartu yang lewat dekat kamera = glass_ping/ui_tap dengan pan sesuai x (tidak semua kartu, hanya yang mendekat).

## F2 · Teks per kata untuk narasumber (bukan VO) TETAP dipakai, tapi bervariasi
Konfirmasi Irfan: tidak semua teks jadi anchor. Teks per kata seperti "launched a new AI" masih perlu, terutama saat **narasumber** (berita, Jensen, Altman) berbicara. Kelemahannya hanya monoton (gaya/efek sama).
Keputusan sistem (menjaga aturan "peran sama = keluarga gaya sama"):
- Keluarga font tetap satu (Inter), tapi **4 teknik masuk** yang dipilih per fungsi kata: (a) kata biasa → mask-reveal naik 3 f; (b) kata tekanan → AnchorWord (snap + grain 12 fps, lebih besar); (c) angka/uang → scale-slam + tracking rapat; (d) kata penutup kalimat → tracking-out pelan. Variasi ukuran per kata (hierarki), tata letak mengikuti ruang kosong frame, di belakang kepala bila matte ada.
- VO tetap anchor-only.

## F3 · "Janji ditepati" (31,9–40,3) — ganti grafik kurva
Kurva tidak cocok untuk "janji ditepati". Desain v9 (kontinuitas dengan 02c — kartu tugas Input data pesanan / Invoice Oktober.pdf / Rekap penjualan.xlsx):
1. 31,9 "Sebagian janji itu memang ditepati": kartu-kartu tugas yang sama kembali sebagai daftar; kursor agent AI mencentang ✓ satu per satu (snap cepat, ui_tap pan per kartu). Anchor DITEPATI menempel di samping daftar yang tuntas.
2. 34,6 "Kita bekerja jauh lebih cepat": bar waktu kerja "8 jam" whip-compress jadi "45 menit" (low_whoosh + sub_impact kecil saat mendarat).
3. 36,7 "Tapi … tidak berhenti di tahap ini": daftar terus bergulir, muncul tugas yang lebih manusiawi — Menulis, Berpikir, Memutuskan — ikut diambil AI → jembatan ke 03a ("mengajari AI berpikir, menulis, bekerja"). Break ke wide pada "tidak".
Warna: netral hitam/putih; biru hanya untuk aksen solusi (bukan teks biru di gelap).
