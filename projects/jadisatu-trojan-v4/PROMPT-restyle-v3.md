# Prompt worker · Trojan v4 restyle v3 (Claude Code)

Ditulis ulang 7 Nov dengan struktur prompt-master (Template M, Claude Code). Tempel blok di bawah ke sesi Claude Code di mesin kerja.

```
## Context (carry forward)
- Proyek: projects/jadisatu-trojan-v4/ di repo skill-development. Render v2 (trojan_v4_v2.mp4, 83 dtk, 1920×1080) sudah jadi: struktur, timing, VO, dan komponen UI-nya diterima.
- VO final sudah ada (vo/take1, remotion/src/vo.json, keputusan D1–D4 di DECISIONS.md). Durasi ±83 dtk diterima; VO tidak dipercepat.
- Yang ditolak Irfan dari v2, kata-katanya: "tampilan videonya jadi 3d dan sangat funy atau cerah … collor Brand video kita adalah White, Biru sebagai icon dan beberapa tampilan dan kita ga punya permintaan 3d ke semua bagian termasuk efek glasses berwarna biru".
- Penyebabnya brief lama (sudah diperbaiki di storyboard): brief menyuruh emoji 3D Fluent, latar gradien lembut, dan satu aksen hangat. Ukuran v2: palette_check menemukan 3 keluarga warna (biru 53 %, kuning-oranye 33 % dari emoji 3D, merah 9 %).

## Objective
Restyle render v2 menjadi v3 yang flat 2D dengan palet brand Jadisatu (putih + biru), tanpa mengubah naskah, VO, timing, atau urutan beat, supaya terlihat seperti referensi 07/08/09, bukan ilustrasi 3D yang ramai.

## Sumber yang wajib dibaca dulu
1. content-ops/pieces/2026-11-07_jadisatu_motion-trojan-v4-storyboard.md: bagian "Standar visual & build" (versi 7 Nov 09:56) dan "Beat 8: peragaan layanan".
2. claude/motion-graphic/guide/visual/GUIDE.md bagian "Brand dulu, gaya referensi kedua".
3. Contact sheet referensi: claude/motion-graphic/guide/referensi/sheets/07-baikov-shapes.jpg, 08-mosycreate-save-reminders.jpg, 09-thekrishray-motion-designer.jpg.
4. Token warna: jadisatu-partner/apps/portal/src/index.css.

## Target State
Palet:
- Latar putih #FFFFFF atau stage #F4F5F7.
- Teks tinta #0F172A, teks redup #5B6475, garis #E6E8EC.
- Biru #2563EB (gelap #1D4ED8) satu-satunya aksen: ikon, tombol, slider, chip aktif, kartu "Gratis", dan sesekali layar biru solid penuh seperti 07.
- Hijau #067647 / merah #B42318 hanya untuk angka naik/turun dan selisih catatan di beat 2.
- Hitam hanya di kredit beat 10, seperti 08.

Ganti per beat (komponen UI yang sudah ada dipertahankan):
- Beat 1: hapus emoji 3D melayang dan gumpalan ungu. Pertahankan kata diketik, logo WhatsApp kecil, dan bubble chat ("udah makan belum? 🥺" boleh karena emoji itu isi chat).
- Beat 2: ganti ikon 3D (buku, clipboard, pensil, Excel) dengan ikon garis datar (notebook, file-spreadsheet, wallet) berwarna tinta atau biru. Kartu Rp850.000 ≠ Rp720.000 dipertahankan.
- Beat 3: troli, kardus, dan toko 3D diganti ikon garis biru di kartu putih; ikon buku yang sama di ketiganya juga ikon garis.
- Beat 4–6: ponsel WhatsApp, dasbor, kalender, dan chip cabang dipertahankan. Ganti latar gradien atau blob dengan putih polos.
- Beat 7: slider dipertahankan. Kartu "Gratis" diubah dari koral menjadi biru solid dengan teks putih. Hapus sparkle dan konfeti 3D.
- Beat 8: tile emoji makanan 3D diganti foto stok berlisensi bebas berbingkai membulat. Kalau unduhan gagal, pakai tile putih/abu muda berikon garis biru. Grid Instagram diisi foto, bukan emoji berwarna.
- Beat 9: chip dipertahankan. Hapus amplop 3D dan emoji dekoratif.
- Beat 10: tetap.

Larangan untuk semua beat:
- Tidak ada backdrop-filter atau kaca.
- Tidak ada radial-gradient atau blob berwarna di latar.
- Tidak ada glow biru di kartu.
- Bayangan hanya tipis abu netral (mis. 0 1px 2px rgba(15,23,42,.06), 0 8px 24px rgba(15,23,42,.06)).

## Scope
- Kerjakan hanya di: projects/jadisatu-trojan-v4/remotion/src/ (komponen dan style) dan projects/jadisatu-trojan-v4/remotion/public/ (aset ikon/foto baru), ditambah CREDITS.md dan DECISIONS.md proyek.
- JANGAN sentuh: vo/, remotion/src/vo.json, file audio, musik, SFX, timing beat, naskah, dan file skill di claude/.
- Ikon: lucide-react (lisensi ISC) boleh dipasang sebagai dependensi baru. Hapus aset Fluent Emoji 3D dari render.

## Constraints
- Hanya lakukan perubahan gaya di atas. Jangan menambah beat, animasi baru, atau efek di luar daftar.
- Gerak, transisi, dan blur gerak saat perpindahan tetap seperti v2.
- Teks layar tetap satu baris per momen dan mengikuti onset VO.
- JANGAN generate ulang VO. Kredit ElevenLabs untuk SFX/musik hanya bila memang ada aset audio yang hilang.

## Acceptance Criteria
- [ ] `grep -rniE "fluent|backdrop-filter|radial-gradient" projects/jadisatu-trojan-v4/remotion/src` → 0 baris.
- [ ] `python3 claude/motion-graphic/scripts/palette_check.py out/trojan_v4_v3.mp4 --max 1` lolos: satu keluarga aksen (biru ±220°) dan dominan ≥ 70 %.
- [ ] Still per beat (10 still, 1920×1080) disusun berdampingan dengan frame setara dari sheet 07/08/09 dalam satu contact sheet `out/v3_vs_ref.jpg`. Setiap still: latar putih/biru solid/hitam, tanpa objek 3D.
- [ ] `python3 claude/motion-graphic/scripts/gate/caption_lines.py out/trojan_v4_v3.mp4` → PASS.
- [ ] Durasi v3 sama dengan v2 (±0,1 dtk), dan audio v3 identik dengan v2 (render audio-only, bandingkan hash atau selisih RMS).
- [ ] Sumber setiap foto stok dicatat di CREDITS.md.

## Urutan kerja
1. Restyle komponen.
2. Render 10 still.
3. Buat contact sheet perbandingan dan perbaiki still yang masih kalah rapi.
4. Baru render penuh di latar belakang.
5. Jalankan semua cek.

## Action Boundaries
- Lanjutkan sendiri tanpa menunggu persetujuan untuk semua langkah di dalam scope (mandat Irfan 7 Nov masih berlaku).
- Berhenti hanya bila akses repo atau kredensial tidak ada, atau sebelum tindakan yang tidak bisa dibatalkan di luar proyek (posting, deploy, menghapus file di luar out/).
- Bila satu kriteria gagal 3 kali berturut-turut, berhenti, tulis penyebabnya di DECISIONS.md, dan serahkan v3 terbaik.

## Progress Evidence
- Commit ke main berkala dengan "Agent: Claude".
- Laporan akhir:
  - path MP4;
  - contact sheet;
  - output setiap perintah cek (tempel apa adanya);
  - daftar keputusan sendiri di DECISIONS.md (D5 dst.);
  - kredit EL yang terpakai.
- Klaim selesai hanya berdasarkan output alat, bukan perkiraan.

## Session Strategy
Continue: konteks proyek trojan-v4 masih dibutuhkan. Tanpa subagent.
```

Catatan: prompt ini memberi worker akses tulis di mesin kerja. Cek ulang scope dan path sebelum menempel.
