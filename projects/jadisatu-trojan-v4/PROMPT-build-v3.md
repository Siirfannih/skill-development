# Prompt worker · Trojan v4 build v3 dari nol (Claude Code, sesi baru)

Disusun 7 Nov dengan struktur prompt-master (Template M + memory block, Claude Code). Prompt ini berdiri sendiri: sesi baru tidak punya akses ke PC server. Satu-satunya sumber adalah repo GitHub. Tempel blok di bawah apa adanya.

```
## Context (carry forward)
- Pemilik: Irfan (Jadisatu). Dia bukan engineer dan memeriksa hasil akhirnya saja. Bahasa laporan: Indonesia.
- Tugas: video motion "Trojan v4" untuk Jadisatu Workspace + jasa kreatif. Format A (motion dengan VO narator), 1920×1080, 30 fps.
- Render v2 dibuat di PC server, sekarang tidak bisa diakses, dan kode Remotion-nya tidak ada di repo. Build Remotion dari nol.
- Yang SUDAH final dan ada di repo Siirfannih/skill-development (branch main):
  - naskah dan storyboard: content-ops/pieces/2026-11-07_jadisatu_motion-trojan-v4-storyboard.md;
  - VO final yang sudah dirapatkan: projects/jadisatu-trojan-v4/vo/vo.wav, 83,3 dtk, voice ElevenLabs "Jadisatu Narrator V3";
  - timing per beat dan per kata: projects/jadisatu-trojan-v4/remotion/src/vo.json, dengan format {fps, total, beats:[{b,s,e,text}], words:[{w,s,e,b}]} dalam detik;
  - package.json Remotion: projects/jadisatu-trojan-v4/remotion/package.json;
  - keputusan D1–D4: projects/jadisatu-trojan-v4/DECISIONS.md.
- Durasi ±83 dtk sudah diterima. VO TIDAK BOLEH dipercepat atau digenerate ulang.
- Penolakan Irfan pada v2, kata-katanya: "tampilan videonya jadi 3d dan sangat funy atau cerah … collor Brand video kita adalah White, Biru sebagai icon dan beberapa tampilan dan kita ga punya permintaan 3d ke semua bagian termasuk efek glasses berwarna biru". Ukuran v2: 3 keluarga warna (biru 53 %, kuning-oranye 33 % dari emoji 3D, merah 9 %).
- Yang diterima dari v2:
  - urutan beat dan jenis komponen UI (ponsel WhatsApp, dasbor, kalender, chip cabang, slider harga, carousel platform, chip CTA);
  - tidak ada baris subtitle (Irfan 7 Nov): teks hanya sebagai bagian visual (kata besar, isi chat, label UI).

## Objective
Bangun dan render trojan_v4_v3.mp4 dari nol di Remotion dengan memakai VO dan timing yang sudah ada. Visual flat 2D dengan palet brand putih + biru, rapi seperti referensi 07/08/09, siap diperiksa Irfan tanpa revisi gaya.

## Baca dulu (urut, hanya ini)
1. Storyboard di atas. Bagian yang mengikat: tabel beat, "Beat 8: peragaan layanan", dan "Standar visual & build". Bagian "Mandat jalan otomatis" berlaku, kecuali hal VO yang sudah selesai.
2. claude/motion-graphic/SKILL.md, lalu references/delivery-gate.md.
3. claude/motion-graphic/guide/visual/GUIDE.md, guide/gerak/, guide/sfx/, dan guide/audio/ (GUIDE.md masing-masing).
4. Contact sheet referensi: claude/motion-graphic/guide/referensi/sheets/07-baikov-shapes.jpg, 08-mosycreate-save-reminders.jpg, 09-thekrishray-motion-designer.jpg, dan 10–13 untuk komposisi beat 8. Baca catatannya di guide/referensi/README.md.

## Standar visual (wajib di setiap frame)
Palet:
- Latar putih #FFFFFF atau stage #F4F5F7.
- Teks #0F172A, teks redup #5B6475, garis #E6E8EC.
- Biru #2563EB (gelap #1D4ED8) satu-satunya aksen: ikon, tombol, slider, chip aktif, layar "gratis".
- Variasi latar: 1–2 layar biru solid penuh seperti 07, dan hitam hanya untuk kredit beat 10 seperti 08.
- Hijau #067647 / merah #B42318 hanya untuk angka naik/turun dan selisih di beat 2.
- Pengecualian ruang WhatsApp, mengikuti tampilan asli: gelembung #D9FDD3, wallpaper #EFEAE2, centang #53BDEB, tombol kirim #00A884.
- Pengecualian lain: kartu karakter beat 3, website Risol Bu Sari, dan DM Instagram beat 9 memakai warnanya sendiri.
- Mouse selalu karakter Jadisatu (lembar "Karakter Mouse Jadisatu" di halaman storyboard): oranye #F59A2E, sisi lipat #E8821C, rambut dan mata #0F172A, tepi putih. Pose idle, hover, melesat, klik. 72 px di pembuka dan 60 px di UI pada frame 960. Titik klik ujung kiri atas, miring maksimal 35°, gerak ease-out, klik squash 0,9 selama 3 frame.

Bentuk:
- Flat 2D. Ikon garis lucide-react, stroke 1,75, berwarna biru atau tinta.
- Logo platform asli kecil hanya untuk WhatsApp, Instagram, dan Google (simple-icons).
- Emoji hanya sebagai isi teks chat (🥺 di bubble "udah makan belum?").
- NEVER: emoji 3D/Fluent, backdrop-filter atau kaca, radial-gradient atau blob latar, glow, ikon 3D, gradien merah, putih dengan gradien biru, bintang/sparkle, konfeti, three.js.
- Bayangan hanya abu tipis: 0 1px 2px rgba(15,23,42,.06), 0 8px 24px rgba(15,23,42,.06).
- Radius kartu 16–20 px.

Tipografi:
- Plus Jakarta Sans (@remotion/google-fonts).
- Tanpa subtitle. Teks yang tampil adalah bagian visual, muncul mengikuti words[] di vo.json; ikuti panel storyboard Wonder halaman Motion Trojan v4.
- Ukuran seragam dalam satu baris; jangan mencampur besar-kecil.

Gerak (ambil dari 09):
- Komponen UI berubah atau tertarik menjadi komponen berikutnya.
- Blur gerak hanya saat perpindahan (@remotion/motion-blur).
- Spring halus, tanpa bouncy berlebihan.
- Cut di kata VO.
- Satu fokus per momen.

## Beat (waktu vo.json sementara: VO disusun ulang karena terlalu lambat, visual jadi acuan pertama, Irfan 7 Nov)
1. Pembuka satu baris per kata, kata baru mendorong kata lama keluar frame: Gimana, kalau, nyatet keuangan, usaha itu, Semudah, chattingan. Mouse interaktif berhenti di bawah kata yang diucap dan terbang antar frame; di "chattingan" mouse mengklik, kata melebar jadi ruang chat WhatsApp layar penuh, kontak ayang: "udah makan belum? 🥺" lalu dijawab "udah dong". Tidak ada transaksi di hook.
2. Kucing oranye vektor (mata spiral, memegang kepala) di tengah tanpa teks, delapan ikon garis berputar mengelilinginya; ikon buku dan spreadsheet menyala biru saat disebut. Lalu dua kartu "catatan Rp850.000" ≠ "laci Rp720.000".
3. Kartu karakter datar ala referensi pilihan avatar: lapak kecil, titip jualan, punya toko. Warna kartu mengikuti karakter. Kucing oranye vektor pose natural, kecil, di belakang tiap karakter (lapisan: latar, kucing, karakter). Ketiganya diberi ikon buku yang sama, lalu satu ikon buku tercoret "akhirnya nggak dicatat".
4. Label Jadisatu Workspace + ponsel WhatsApp yang dibangun ulang per elemen mengikuti tampilan asli, kontak Jadisatu, ruang chat sama dengan beat 1. Pesan "jual 12 risol 60rb" diketik, lalu terkirim. Bubble balasan "✓ Tercatat · Pemasukan · Penjualan Rp60.000". Pesan "beli gas 25rb" mendapat label Pengeluaran. Dua bubble terbang ke kolom Pemasukan/Pengeluaran.
5. Baris catatan menyatu jadi kartu "Laporan hari ini" di kata "laporan". Di "dikirim" kartu masuk ke thread WhatsApp yang sama, jam 18.00 (penjualan, pengeluaran, laba berjalan + link). Ketuk link, dasbor Ringkasan Workspace tersusun per widget saat VO menyebut "Workspace" di awal beat 6.
6. Kalender November menyorot tanggal stok habis dalam lingkaran biru. Kartu saran belanja muncul. Lalu kartu akun "Risol Bu Sari": kursor menekan "+ Tambah cabang", dan chip Cabang 1 · 2 · 3 muncul.
7. Slider harga "− Rp … +" digeser turun. Tepat di "gratis" hard cut ke biru penuh #2563EB, tanpa Rp0 dan tanpa tombol. 56,3–56,6: dinding kata dari kalimat VO (cobain, Workspace ini, secara, GRATIS, baru mulai usaha) meluncur naik, semua gelap #010C4C dan blur. 56,6–56,9: "GRATIS" huruf besar mendarat di tengah, putih tajam, Plus Jakarta Sans 600 sekitar 170 px pada frame 960; kata lain tetap gelap blur, terpotong tepi frame. 56,9–57,4: push 6% lalu tahan. Keluar: dinding kata melesat naik masuk beat 8.
8. Carousel platform Instagram → website → Google Bisnis → Workspace, ikuti "Beat 8: peragaan layanan" di storyboard. Semua untuk usaha fiktif "Risol Bu Sari":
   - grid IG terisi foto satu per satu;
   - website F&B yang terlihat jadi: hero gelap, menu pre-order dengan foto dan harga contoh, halaman digulir;
   - panel Google Bisnis dibangun ulang dan dikelola: jam buka diubah, foto diunggah, postingan dibuat, ulasan dibalas;
   - dasbor berlabel "siap pakai".
   Foto berlisensi bebas (Unsplash/Pexels) dicatat di CREDITS.md. Bila unduhan gagal, pakai tile putih berikon garis biru. NEVER tampilkan angka hasil (rating, followers, omzet) atau nama usaha nyata.
9. Postingan kucing 4:5 ("Data rapi, owner santai") terpotong di atas frame, kolom komentar di bawahnya jadi fokus, "workspace" diketik dan terkirim. Layar meredup, notifikasi Instagram turun dari atas, mouse mengkliknya, DM terbuka. User mengetik "Ambil akses", balasan berisi dua tombol: Akses Website dan Claim Bundling, bukan URL. Di "DM kami" DM yang sama ditahan dengan dua tombol tetap terlihat. Tidak ada layar chip.
10. Layar hitam, kalimat kecil "Oh iya, video ini juga kami yang bikin.", logo Jadisatu, dan bubble kecil "udah makan belum? 🥺" kembali di samping logo.

UI produk: ambil struktur dan teks dari repo Siirfannih/jadisatu-partner (apps/portal/src, read-only) bila bisa diakses. Bila tidak, bangun dari deskripsi di atas. Jangan mengarang fitur di luar storyboard.

## Audio
- VO: vo/vo.wav dipakai apa adanya, hanya gain linear. Jangan dipercepat, dipotong ulang, atau digenerate ulang.
- Musik: kategori energi (100–140 bpm), beat 10 hangat dan resolve.
  - Buat dengan claude/motion-graphic/scripts/audio/el_music.py, yang membutuhkan ELEVENLABS_API_KEY sudah ter-set sebagai env.
  - Pilih atau verifikasi dengan scripts/audio/music_fit.py --category energi --voice vo/vo.wav --duration 83.3.
  - Level mengikuti saran music_fit.
- SFX: satu bunyi per aksi UI (ketik, kirim, notif, klik, pop, whoosh, tick slider, ding).
  - Sumber urut: projects/jadisatu-60s/remotion/sfx-el/ dan sfx-extra/ di repo, lalu scripts/audio/el_sfx.py.
  - Cek kenyamanan dengan scripts/audio/sfx_comfort.py bila tersedia.

## Scope
- Kerjakan hanya di: projects/jadisatu-trojan-v4/ (remotion/src, remotion/public, out/, CREDITS.md, DECISIONS.md).
- JANGAN sentuh: vo/, remotion/src/vo.json, naskah/storyboard, file di claude/ (skill), dan proyek lain.
- Dependensi yang boleh: yang ada di package.json. Tambahan hanya bila wajib, catat di DECISIONS.md.

## Urutan kerja
1. Setup: npm ci di remotion/.
2. Buat komposisi Trojan dengan durasi Math.ceil(vo.json total × 30) frame dengan Audio vo.wav.
3. Render 10 still, satu per beat, di titik tengah beat. Susun out/v3_vs_ref.jpg: setiap still berdampingan dengan frame setara dari sheet 07/08/09. Perbaiki still yang kalah rapi.
4. Render audio saja: npx remotion render <Comp> out/audio.wav --codec=wav. Cek music_fit dan sfx.
5. Render penuh di latar belakang ke out/trojan_v4_v3.mp4.
6. Jalankan semua Acceptance Criteria dan perbaiki sampai lolos.

## Acceptance Criteria
- [ ] `grep -rniE "fluent|backdrop-filter|radial-gradient|three" projects/jadisatu-trojan-v4/remotion/src` → 0 baris.
- [ ] `python3 claude/motion-graphic/scripts/palette_check.py out/trojan_v4_v3.mp4 --max 1` → satu keluarga aksen (biru ±220°), dominan ≥ 70 %, di luar panel pengecualian palet.
- [ ] Durasi MP4 = durasi vo.json total ±0,1 dtk. VO di mix tidak dipercepat (cek dengan alignment kata di detik 10, 40, dan 75).
- [ ] music_fit kategori energi → lolos SNR VO vs musik.
- [ ] Delivery Gate (references/delivery-gate.md) diisi, setiap PASS dengan bukti.
- [ ] Sumber setiap foto/aset pihak ketiga ada di CREDITS.md.

## Action Boundaries
- Mandat Irfan 7 Nov berlaku: kerjakan semua yang ada di dalam scope tanpa menunggu persetujuan. Biaya ElevenLabs untuk musik/SFX sudah dibudgetkan; catat kredit yang terpakai.
- Berhenti dan laporkan hanya bila:
  - repo tidak bisa di-clone;
  - ELEVENLABS_API_KEY tidak ada (tetap render versi VO + SFX repo tanpa musik, lalu laporkan);
  - ada tindakan yang tidak bisa dibatalkan di luar proyek (posting, deploy).
- Bila satu kriteria gagal 3 kali berturut-turut: tulis penyebabnya di DECISIONS.md, serahkan versi terbaik, dan lanjutkan ke kriteria lain.

## Progress Evidence
- Commit ke main berkala. Pesan commit menyebut "Agent: Claude". Jangan commit node_modules atau out/*.mp4 (ikuti .gitignore). Periksa perubahan remote sebelum push.
- Laporan akhir dalam bahasa Indonesia sederhana:
  - lokasi MP4 dan contact sheet;
  - output setiap perintah cek (tempel apa adanya);
  - keputusan sendiri di DECISIONS.md (D5 dst.), satu baris alasan per keputusan;
  - kredit EL yang terpakai.
- Klaim selesai hanya berdasarkan output alat.

## Session Strategy
Sesi baru: semua konteks ada di prompt dan repo. Tanpa subagent.
```

Catatan:
- Sebelum menempel, pastikan sesi baru punya akses ke repo `Siirfannih/skill-development` (wajib) dan `Siirfannih/jadisatu-partner` (opsional, untuk UI), serta env `ELEVENLABS_API_KEY` sudah ter-set.
- Prompt ini memberi agen akses tulis. Cek ulang scope dan path sebelum menempel.
