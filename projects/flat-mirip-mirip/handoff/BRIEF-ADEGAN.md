CATATAN AWAL SESI (dari Sutradara): doctor.sh sudah dijalankan Sutradara dan LULUS. Bila saat kamu jalankan doctor gagal HANYA karena "PETA.md basi" (file baru dari pekerja paralel), lanjutkan tugas: jangan menjalankan --fix, jangan mengubah PETA.md, cukup catat di REPORT. Untuk kegagalan doctor jenis lain, berhenti dan laporkan.

# BRIEF bersama untuk semua TASK adegan (dibaca utuh oleh pekerja adegan)

## Kontrak teknis
- Proyek Remotion: `projects/flat-mirip-mirip/remotion` (1920×1080, 30 fps). Typecheck: `npx tsc --noEmit -p .` dari folder itu.
- Satu adegan = satu file `remotion/src/adegan/Pxx.tsx` yang mengekspor `export const Pxx: React.FC = () => …`. Durasi adegan = `NASKAH['Pxx'].selesai - NASKAH['Pxx'].mulai` (detik × 30). Adegan dirender di dalam `<Sequence>` oleh master, jadi waktu di dalam adegan relatif awal adegan: pakai `kataRelatif('Pxx')` dari `src/data/naskah.ts` (field `t, mulai, selesai, kelompok`).
- **Waktu sekarang SEMENTARA** dan akan diganti waktu VO. Semua gerak dikunci ke kata/kelompok (mis. "orbit merapat saat kata ke-k mulai"), bukan ke nomor frame tetap. Jangan menulis angka frame mati untuk peristiwa yang terkait ucapan.
- Uji: buat `remotion/src/adegan/uji-<grup>.tsx` yang mengekspor `<UjiRoot>` berisi satu `<Composition id="Pxx">` per adegan grupmu, + entry `remotion/src/index-<grup>.ts` (`registerRoot`). Render still: `npx remotion still src/index-<grup>.ts Pxx ../media/acuan/adegan/Pxx-fNNN.png --frame=NNN`. Satu still per kelompok kata (frame tengah kelompok) + still pada momen gerak utama.
- Komponen bersama (sudah lulus, JANGAN diubah; bila kurang props, buat wrapper lokal di file adeganmu dan laporkan): `src/bersama/` → `Kanvas`, `KataKecil` (`kata`, `diFootage`), `KataTekan` (`kata`, `warna: 'tinta'|'primer'`), `KataRaksasa` (`kata`, `lebar`), `Invert` (`mulai`,`selesai` frame), `Flash` (`mulai`), `KartuSlop` (`seed`, `rasio`, `bagian`), `Fonts`; `src/bersama/Clawd.tsx` (`pose`, `emosi`, `skala`, `pegangPlayhead`); `src/bersama/ui-asli/claude/AppClaudeTerang` (`lampiran`, `ketik{teks,mulai,cps}`, `kirimPada`), `ui-asli/remotion/StudioRemotion` (`komposisi`, `aktif`, `track[]`, `playhead`, `preview`), `ui-asli/instagram/{BerandaIG, BingkaiIPhone, ikon, wordmark}`, `ui-asli/premiere/PremierePro` (`program`, `source`, `klip[]`, `playhead`). Contoh pemakaian yang sudah lulus: `src/bersama/ui-asli/UjiB.tsx`, `UjiC.tsx`, `src/uji/PapanFootage.tsx` (pola footage bermaterial + TekanFootage putih + kartu foto P14).
- Token: `src/bersama/tema.ts` saja. Kurva: `src/lib/curves.ts` (`move`, kurva `land/heavy/whip/reveal/leave/drift`, `react(i)`, `dur`).
- Aset (lewat `staticFile('media/…')`): gambar slop `media/aset-slop/k1-01…k5-02.png` (4:5); video jadi `media/footage/jadi/jensen-v4-00-14.mp4`, `sdj-final1-00-12.mp4`; footage `media/footage/F*/…`, `G*/…` (lihat `media/footage/LOG.md`).

## Aturan (salinan yang relevan; ADEGAN.md §Aturan seluruh video berlaku penuh)
1. Tanpa waktu mati: tiap 0,4–1,2 dtk ada peristiwa visual; kamera selalu drift/push pelan (Lantai B10).
2. Kata per kata saat diucapkan, maks 3 kata per tampil, tanda tanya tampil (A4); teks hanya dari ucapan (A5), kecuali isi UI asli.
3. Masuk tidak pakai fade/blur-in; gerak cepat pakai motion blur; tanpa crossfade (B13, B13a). Stagger pakai `react(i)`, bukan i × konstanta.
4. Teks tidak menutup wajah; kontras ≥ 4,5:1; tidak menyentuh tepi (margin 5 %).
5. Tidak ada merah di atas footage/latar gelap (D-18); footage dan ilustrasi vektor tidak dicampur dalam satu adegan (D-20).
7. Narasi TIDAK PERNAH diletakkan di atas preview/monitor yang memutar video jadi (video itu punya caption sendiri → dua teks bertabrakan). Tempatkan di ruang kosong UI (panel kosong) atau di luar jendela. Tokoh Clawd di editor harus terbaca: tinggi ±16–20 % frame, kamera punch-in ke timeline.
6. Tidak ada placeholder: semua yang tampil terlihat seperti produk/konten nyata (D22).

## Lulus bila (semua TASK adegan)
- `npx tsc --noEmit -p .` lulus.
- `python3 claude/motion-graphic/scripts/juri/motion_lint.py projects/flat-mirip-mirip/remotion/src/adegan` PASS.
- `python3 claude/motion-graphic/scripts/juri/tema_cek.py projects/flat-mirip-mirip/remotion/src` (alat butuh folder berisi `bersama/tema.ts`): tidak ada baris untuk file grupmu (temuan di `pinjam/` diketahui dan diabaikan; warna literal hanya `rgba(0,0,0,a)` untuk gelap footage).
- Still per kelompok kata ada di `media/acuan/adegan/`, dan kamu sudah melihatnya sendiri: tulis di REPORT satu baris per still (apa yang terlihat, apakah sesuai ADEGAN.md).

## Jangan
Commit; render video penuh; mengubah file di luar FILE BOLEH TASK-mu; mengubah komponen bersama, tema.ts, naskah.ts, Root.tsx/index.ts.