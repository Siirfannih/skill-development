# Storyboard v1 · Iklan & onboarding Workspace (treatment Baikov)

Piece: `2026-11-07_jadisatu_ads-workspace-owner` · Status: STORYBOARD DRAFT (menunggu review Irfan)
Format A (motion) · **master 1920×1080, 30 fps** · ±50 dtk · versi 9:16 dibuat dari master dengan reframe per beat
Gaya: `claude/motion-graphic/guide/referensi/baikov.md` (BK01–BK10) · UI: komponen asli `jadisatu-partner/apps/portal` + `apps/greatstock` dianimasikan di Remotion, data demo sintetis

## 0. Kunci brief
- **Penonton:** pemilik usaha dengan lebih dari satu cabang/outlet.
- **Pesan tunggal:** semua cabang kepantau dari satu tempat, tanpa ribet, dan stok dihitung otomatis.
- **Suara:** **teks layar membawa cerita** (seperti Baikov, bisa ditonton tanpa suara). VO opsional memakai naskah §2 file piece; bila VO dipakai, teks layar = kata VO.
- **Palet video:** `jadisatu-terang` (dasar #F1F0EB, teks #282723, aksen biru #1A3AD0, biru lembut #DCE4FF) + **satu aksen hangat** (kuning, dipakai hanya untuk "gratis" dan tanda selesai). UI di dalam layar memakai warna aslinya (#2563EB). Tidak ada teks biru di latar gelap.
- **Font video:** Outfit (display), Inter (teks). UI tetap Plus Jakarta Sans/Poppins sesuai portal.
- **Audio:** kategori `energi` (iklan, event visual rapat) · musik ±110–120 bpm, cut di ketukan · SFX satu bunyi per event (`guide/sfx/`). Diukur ulang dengan `pace_read.py` pada animatic.
- **Aturan teks:** satu baris satu ukuran; teks muncul kata per kata; saat UI jadi subjek, tidak ada paragraf di atasnya.

## 1. Beat

| # | Waktu (f @30) | Teks layar (persis) | Visual: subjek → objek | Teknik | Kamera / transisi keluar | SFX |
|---|---|---|---|---|---|---|
| 1 | 0:00–0:04 (0–120) | **Gimana kalau semua cabangmu bisa kamu pantau dari satu tempat?** | Kalimat dibangun kata per kata di tengah; foto kecil toko, kasir, gudang disisipkan di antara kata sebagai tanda baca; kata "cabangmu" berwarna biru lalu settle ke tinta | BK01, T01 per kata, T08 foto inline | kalimat ditarik mengecil (scale 1→0,35) sementara foto berkumpul → jadi titik-titik cabang | pop lembut per foto; satu tick per kata kunci |
| 2 | 0:04–0:09 (120–270) | Bergantian, satu per satu: **Buku catatan** · **Foto struk** · **File Excel** · **Laporan telat** | Kata kecil di tengah; shape besar (lingkaran, tangga, kartu) memenuhi tepi frame, tiap kata punya bentuknya sendiri (buku = kartu bertumpuk, struk = strip panjang, Excel = grid, telat = jam) | BK02, BK03 shape berfungsi, T07 slot swap | sweep bidang biru dari kanan antar kata; kata keempat (jam) berputar lambat | rustle kertas, shutter, klik, tick jam (satu per kata) |
| 3 | 0:09–0:13 (270–390) | **Jadi** · **satu** → **Jadisatu Workspace** | Bar naik membawa pecahan "Ja / di / sa / tu", tinggi bar disamakan, pecahan merapat jadi "Jadisatu"; "Workspace" menyusul kecil di bawah | BK04 huruf naik dari bar (T27), T13 merapat | bar berubah jadi deret kartu cabang; kamera menyusuri kartu kiri → kanan | riser pendek berakhir di "Jadisatu", pop di "Workspace" |
| 4 | 0:13–0:18 (390–540) | **Cabang 1** · **Cabang 2** · **Cabang 3** · **Semua cabang** | Roda pilihan melengkung pada bidang biru; satu pilihan aktif (putih) berganti; berhenti di "Semua cabang" dengan squash klik | BK06, T18 teks di silinder | roda ditarik jauh; pilihan aktif menyusut jadi ikon di sidebar dasbor | tick per langkah roda, klik di "Semua cabang" |
| 5 | 0:18–0:24 (540–720) | — (UI jadi subjek) | **UI asli** halaman Ringkasan Workspace lahir bertahap: bingkai → sidebar → kartu omzet → grafik penjualan → daftar transaksi, data tiga cabang mengalir masuk | BK07 | push pelan ke dasbor | pop per widget (diredam, satu keluarga), swoosh saat data masuk |
| 6 | 0:24–0:29 (720–870) | **Cabang mana yang paling laku hari ini?** (kecil, di atas kartu) | Highlight satu widget penjualan per cabang; batang cabang teratas menyala, label angka demo naik | BK08, T16 counter | kamera mendekat ke batang teratas, lalu panel hijau WA naik dari kanan | ding pada batang teratas, tick roll counter |
| 7 | 0:29–0:35 (870–1050) | Di dalam chat: **jual 12 risol 60rb** → balasan agen (teks asli dari Workspace) | Panel WhatsApp (tampilan WA asli) mendarat; pesan diketik per huruf, terkirim, bubble balasan "tercatat" muncul; di dasbor belakang angka penjualan bertambah | BK08 panel asisten, T11 typewriter | kamera keluar dari panel → bubble/avatar tersusun di bidang biru; satu bubble laporan "Laporan hari ini" jadi jembatan | ketik keyboard iPhone per kata, kirim, notif WA |
| 8 | 0:35–0:41 (1050–1230) | **Tahu kapan stok habis, dan berapa yang perlu dibeli** | **UI asli** stok (Greatstock): garis stok turun ke titik habis, kartu hari-sampai-habis, kartu saran belanja muncul dari kartu tengah | BK09, T16 counter | kartu saran membesar jadi portal (shape kuning) ke adegan berikut | glide sepanjang garis, lock pada counter, ding di kartu saran |
| 9 | 0:41–0:46 (1230–1380) | **Sosial media bisnismu kami yang kelola,** → **Workspace-nya gratis.** | Wipe shape kuning membuka grid konten (feed, story, video TikTok) karya tim; kata "gratis" berwarna kuning, satu-satunya aksen hangat | BK05 wipe dari benda cerita, T01 | grid ditarik mundur menyisakan satu kartu "Done" | pop per konten, impact kecil di "gratis" |
| 10 | 0:46–0:50 (1380–1500) | **Cek detail paketnya di jadisatu.cloud** | Kartu "Done" mengecil; foto toko dan titik cabang dari beat 1 kembali berkumpul membentuk logo Jadisatu; tombol CTA | BK10 objek pembuka kembali | hold logo 1 dtk, gerak berhenti | resolve musik, satu klik di tombol |

## 2. Cek sutradara (per draft)
- Satu fokus per momen: beat 6–7 dua lapis (dasbor + panel WA) → dasbor diredam/blur saat panel aktif.
- Setiap teks punya sumber: naskah iklan §2 + fakta `script-workshop/guide/produk/FAKTA.md`. Tidak ada harga, refund, angka pelanggan.
- UI asli: halaman Ringkasan, penjualan per cabang, stok, dan balasan agen WA diambil dari repo; angka demo diberi data sintetis yang wajar (bukan klaim).
- Hindari (`guide/hindari/`): tidak ada crossfade; caption tidak dipakai (teks adalah narasi); palet satu aksen + satu hangat.
- 9:16: beat 1–4 dan 9–10 disusun ulang vertikal; beat 5–8 crop ke widget aktif (kamera BK08 sudah mengarah ke satu bagian).

## 3. Terbuka untuk Irfan
1. Hook beat 1: pakai "Gimana kalau semua cabangmu bisa kamu pantau dari satu tempat?" atau dua pertanyaan naskah ("hari ini cabang mana yang paling laku, dan stok apa yang bakal habis minggu depan?").
2. VO: tanpa VO (seperti Baikov), suara Irfan, atau narator AI.
3. Refund: ditambahkan di beat 9 setelah syaratnya ada, atau tidak.
4. Kata di beat 2 (Buku catatan, Foto struk, File Excel, Laporan telat): sesuai cara cabang melapor di bisnis targetmu?
