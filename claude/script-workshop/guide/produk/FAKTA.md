# Fakta produk yang boleh diklaim (Jadisatu)

Sumber: kata Irfan + repo produk `Siirfannih/jadisatu-partner` (`OFFER.md`, `MASTER-PLAN.md`, `services/*/README.md`). **Cari di sini dan di repo itu dulu**; baru tanya Irfan bila tidak ketemu. Jangan menebak (Irfan 7 Nov). Fakta baru di sesi → tambahkan di sini dengan tanggal.

## Jadisatu
- Dua produk (Canvas untuk pasar global, Workspace untuk UMKM Indonesia) + layanan jadisatucreative (sosmed, video editing, desain, kampanye). Situs payung: jadisatu.cloud.

## Workspace
- Halaman disesuaikan per industri/niche (mis. F&B, klinik); pengguna tinggal upload data.
- Setup gratis, bisa dilakukan sendiri lewat website. Berbayar: kustomisasi (mis. Customer Care AI). Harga per workspace; ada kontrak minimum untuk Workspace dan paket kreatif.
- **Gratis untuk klien layanan kreatif** (jasa kelola sosmed/konten).
- **Gratis 100 % untuk yang baru mulai bisnis / belajar administrasi** (termasuk mahasiswa yang jualan): daftar di website, akses penuh termasuk catat lewat WhatsApp; CTA konten: komen "workspace", link dikirim (Irfan 6–7 Nov).
- **Catat lewat WA**: ketik kalimat biasa ("jual 12 risol 60rb", "beli gas 25rb") → dicatat sebagai pemasukan/pengeluaran dengan kategori (penjualan, bahan baku, operasional, transport, gaji, modal); kalimat ragu tidak dicatat diam-diam (`jadisatu-partner` docs/implementation/ws-backend-20261101/PARSER-M3.md).
- Greatstock: bagian dari Workspace (stok). Detail cara kerjanya: tanya Irfan sebelum diklaim spesifik.
- Laporan bisa diakses via WhatsApp (gateway, pemilik tidak perlu buka website); agen menjawab chat WhatsApp pemilik dan menulis ke database.
- MCP: pengguna bisa menghubungkan AI sendiri (Claude, Gemini, dll.) untuk menganalisis data bisnisnya.
- **Multi-cabang**: tiap cabang bisa punya akun sendiri (multi-akun, member + role), atau semua data di-upload lalu ditandai per cabang (Irfan 7 Nov; `services/accounting` memakai `branch_id`).
- Penjualan dari kasir sampai marketplace dirangkum jadi satu (copy situs); file ekspor (mis. Shopee) bisa dikirim lewat WA (`services/ingest`). TikTok/bank: rencana WS9, cek status sebelum disebut.
- **Stok** (`services/stock`): peringkat produk, tren mingguan, forecast harian, saran restock (berapa beli, memperhitungkan waktu tunggu supplier) bila stok akhir diunggah. **Tidak memperhitungkan musim/promo** (tertulis di kode): jangan klaim "tahu musim ramai".
- Analitik lain: akuntansi (laba-rugi, arus kas, rekonsiliasi). Detail dan status per fitur: `jadisatu-partner/STATUS.md`.
- Live sejak 5 Nov 2026.

## Paket agensi (konfirmasi dulu sebelum masuk konten)
- Workspace gratis untuk klien jasa kelola sosmed (OFFER.md).
- Irfan 7 Nov: landing untuk pemilik bisnis yang mau coba; kelola sosmed sampai video TikTok; refund bila tidak perform/tidak sesuai harapan. Syarat refund belum tertulis (OFFER.md lama: "No Perform No Pay ditunda"): tanya syarat sebelum dijanjikan di konten.

## Harga
Ada di `OFFER.md` tapi berubah-ubah; jangan tulis harga di konten tanpa konfirmasi Irfan di sesi.

## Bukti & klaim
- Bukti di landing/konten harus kasus nyata, tidak pernah data simulasi/demo.
- Belum ada klien/penjualan (Nov 2026): jangan menulis testimoni, jumlah pengguna, atau hasil pelanggan.
