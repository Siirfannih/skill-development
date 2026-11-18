TUJUAN
Bangun ulang UI beranda Instagram iOS dan UI Adobe Premiere Pro sebagai komponen Remotion SVG/JSX yang tampilannya setia ke aplikasi aslinya, untuk video flat-mirip-mirip, beserta still untuk dinilai Sutradara.

KONTEKS (folder kerja: projects/flat-mirip-mirip; Remotion 4.0.380 terpasang di remotion/)
- Aturan Irfan: tidak ada rekaman layar; semua UI dibangun ulang dan harus sama persis dengan UI asli; Instagram tanpa PNG, semua SVG. Irfan tidak mengirim screenshot resolusi penuh: kamu yang menyusun tampilan dari pengetahuan UI asli + acuan yang ada.
- Acuan yang ada (baca saja): `media/acuan/irfan/ig-cari-irfan.webp` (924×2000, halaman Cari IG iOS milik Irfan: status bar, kolom Cari, tab bar bawah = beranda, reels, kirim/DM bertitik merah, cari, avatar profil), `media/acuan/irfan/ig-profil-irfan.png` (grid profil), `media/acuan/irfan/premiere-irfan.png` (750×422 Premiere Pro: panel Project kiri, Timeline tengah dengan banyak track V/A, Program Monitor kanan atas, Source Monitor kanan bawah).
- Kegunaan di video: P05 "tapi rasanya AI-slop." = beranda IG di bingkai iPhone, scroll makin cepat, isinya unggahan "AI slop" yang mirip semua. P06/P09 = satu unggahan dibedah / grid unggahan. P07 "meniru karya orang lain" = Premiere Pro: klip referensi di Program Monitor, klip dipotong manual di timeline, playhead berjalan.
- Komponen yang diminta:
  1. `remotion/src/bersama/ui-asli/instagram/` :
     - `ikon.tsx`: ikon SVG IG iOS (beranda, reels, kirim/DM, cari, suka/hati, komentar, repost, bagikan/kirim, simpan/bookmark, tambah "+", titik tiga, status bar sinyal/wifi/baterai) digambar mendekati ikon asli (stroke ±2 px @ skala iPhone 393 pt, ujung membulat).
     - `wordmark.tsx`: wordmark "Instagram" asli sebagai path SVG. Ambil file SVG wordmark dari Wikimedia Commons (cari "Instagram logo" wordmark; API commons.wikimedia.org dengan User-Agent aplikasi generik, tanpa data pribadi), lalu tempel path-nya sebagai JSX. Catat URL sumbernya di REPORT. Bila tidak ditemukan, laporkan; JANGAN mengetik "Instagram" dengan font biasa.
     - `BerandaIG.tsx`: layar beranda iOS 2025 (393×852 pt, dirender pada skala prop): status bar (jam "19.51", sinyal, wifi, baterai), header (tombol "+" kiri, wordmark tengah/kiri sesuai versi terbaru, hati kanan), baris story (lingkaran avatar bergradien IG asli untuk story belum dilihat + nama), lalu daftar unggahan: header unggahan (avatar, nama akun fiktif, titik tiga), media 4:5, baris aksi (hati, komentar, repost, kirim + angka di samping ikon; simpan di kanan), "Disukai oleh …", caption 1–2 baris, waktu; tab bar bawah (beranda aktif). Props: `unggahan: {akun: string; avatarSeed: number; media: ReactNode; suka: string; caption: string}[]`, `scrollY: number` (px konten), `skala: number`.
     - `BingkaiIPhone.tsx`: bingkai iPhone (badan hitam, sudut membulat, Dynamic Island) SVG; children = layar.
     - Nama akun fiktif generik (mis. "kreatif.harian", "studio.konten", "ide.visual"); jangan memakai nama akun dari screenshot Irfan.
  2. `remotion/src/bersama/ui-asli/premiere/PremierePro.tsx` (+ file pendukung di folder itu): Premiere Pro 2025 tema gelap: bilah menu (Premiere Pro, File, Edit, Clip, Sequence, Markers, Graphics and Titles, View, Window, Help), tab workspace (Import/Edit/Export), panel Project kiri dengan daftar bin/file, Timeline (track V1–V3, A1–A3, header track dengan ikon kunci/mata/M/S, klip video ungu-pink dan audio hijau dengan gelombang, playhead biru + timecode biru kiri atas), Program Monitor kanan atas dengan timecode dan kontrol transport, Source Monitor kanan bawah. Warna/proporsi mendekati premiere-irfan.png. Font: Adobe Clean tidak tersedia → Source Sans 3 (OFL): unduh dari repo resmi adobe-fonts/source-sans (GitHub) ke `remotion/public/fonts/source-sans-3-*.otf|woff2` dan muat dengan delayRender. Props: `program: ReactNode` (isi Program Monitor), `source?: ReactNode`, `klip: {track: string; mulai: number; durasi: number; label: string}[]`, `playhead: number` (detik), `skala?: number`.
  3. Komposisi uji `UjiC` (1920×1080, 90 frame) di `remotion/src/bersama/ui-asli/UjiC.tsx`: f0–44 = BingkaiIPhone + BerandaIG di tengah kanvas putih #FFFFFF, scrollY naik dari 0 ke ±1600 px; f45–89 = PremierePro layar penuh dengan playhead berjalan. Media unggahan dan isi monitor untuk uji = bentuk SVG sederhana (persegi krem + lingkaran + siluet) — Sutradara nanti menggantinya dengan KartuSlop dan footage. Daftarkan lewat `remotion/src/RootC.tsx` (ekspor `UjiCRoot`) + entry `remotion/src/indexC.ts`.

LARANGAN
- Tanpa PNG/JPG di komponen; semua SVG/JSX.
- Warna UI asli hanya di folder `ui-asli/instagram/` dan `ui-asli/premiere/`.
- Tidak menampilkan akun/nama/foto asli dari screenshot Irfan.
- Kurva gerak dari src/lib/curves.ts; scroll memakai kurva, bukan linear.

FILE BOLEH
- projects/flat-mirip-mirip/remotion/src/bersama/ui-asli/instagram/** (baru)
- projects/flat-mirip-mirip/remotion/src/bersama/ui-asli/premiere/** (baru)
- projects/flat-mirip-mirip/remotion/src/bersama/ui-asli/UjiC.tsx, projects/flat-mirip-mirip/remotion/src/RootC.tsx, projects/flat-mirip-mirip/remotion/src/indexC.ts
- projects/flat-mirip-mirip/remotion/public/fonts/source-sans-3-*
- projects/flat-mirip-mirip/media/acuan/komponen/C-*.png
- projects/flat-mirip-mirip/handoff/REPORT-komponen-C-r1.md

FILE JANGAN
tema.ts, src/Root.tsx, src/index.ts, src/RootB.tsx, src/indexB.ts, src/bersama/ui-asli/claude/**, src/bersama/ui-asli/remotion/**, src/bersama/* lain (milik pekerja lain yang sedang jalan paralel), src/pinjam/**, folder proyek lain, file skill.

LULUS BILA
- `npx tsc --noEmit -p .` di remotion/ lulus (bila gagal karena file pekerja lain yang sedang ditulis, laporkan file mana; file tugasmu sendiri harus bersih).
- Still `media/acuan/komponen/C-ig-f000.png`, `C-ig-f040.png`, `C-premiere-f070.png` (entry indexC.ts).
- `C-sanding-ig.png`: tab bar + status bar hasil berdampingan dengan ig-cari-irfan.webp (bagian atas dan bawah) pada skala sama; `C-sanding-premiere.png`: hasil vs premiere-irfan.png pada lebar sama.
- REPORT berisi daftar perbedaan yang masih terlihat terhadap acuan (jujur, per elemen) dan sumber wordmark.

JANGAN
Commit, render video penuh, menyentuh file pekerja lain.

LAPORAN
REPORT-komponen-C-r1.md.
