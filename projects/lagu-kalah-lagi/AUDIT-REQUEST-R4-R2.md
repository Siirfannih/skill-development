---
id: REQ-20261031-2300-loris-storyboard-r4-r2
round: 2
previous_audit: /Users/igedeirfankusumaputra/AI-OPS/audit-bridge/outbox/REQ-20261031-2300-loris-storyboard-r4.audit.md
project_dir: /Users/igedeirfankusumaputra/wonder/workspaces/skill-development/crayfish
deliverables:
  - projects/lagu-kalah-lagi/STORYBOARD.md
  - projects/lagu-kalah-lagi/canvas-r4.json
  - projects/lagu-kalah-lagi/qa-r4/
standards:
  - projects/lagu-kalah-lagi/DECISIONS.md
  - projects/lagu-kalah-lagi/REVIEW-R4.md
---

## Permintaan Irfan (salin kata per kata)
> Aku mau kamu selesaikan semua bagian terlebeih dahulu dan hapus versi lama atau yang kurang relevant

## Yang sudah dikerjakan
- Melanjutkan chat storyboard lagu di Wonder page Loris. Chat sebelumnya berakhir dengan pilihan menggambar ulang sisa panel; pengguna meminta seluruh bagian selesai lalu versi lama dibuang. Lingkup ini storyboard 25 panel, bukan video penuh.
- 25 panel diselaraskan dengan tokoh siluet punggung/rim light, wajah dan tangan sawo matang. 01/07/19 memakai basis v3; komposisi acuan 02/07/20/22 dipertahankan dengan penyesuaian tokoh. Panduan karakter dan produksi menggantikan panduan eksperimen lama.
- Seluruh 32 akar lama dicadangkan dan dihapus setelah pengganti diperiksa. Canvas kini 27 akar = 25 panel dan dua panduan, disusun grid 5×5. Snapshot source sebelum/sesudah tersedia untuk audit inventaris dan pemulihan.
- Screenshot native Wonder 27 artboard disimpan sebagai JPEG di qa-r4; bukan gambar render ulang lokal. 25 panel diperiksa secara visual oleh pembuat; penilaian independen belum ada.

## File yang diubah / dibuat
- STORYBOARD.md, DECISIONS.md, REVIEW-R4.md.
- canvas-before-r4.json (32 akar backup), canvas-r4.json (27 akar sesudah dan source).
- qa-r4/panel-01.jpg sampai panel-25.jpg; panel-tat.jpg = panduan tokoh, panel-had.jpg = panduan produksi.
- Tidak ada perubahan Remotion atau skill global. Dua file kandidat sementara dihapus setelah snapshot live disimpan.

## Kriteria lulus
- [ ] Semua 25 beat ada dan satu versi aktif per nomor; lirik, visual, kamera/transisi dan niat SFX tersedia.
- [ ] Arah tokoh sesuai keputusan terakhir; kulit wajah terang bukan oval navy. Skala objek ruang nyata masuk akal, metafora batin ditandai.
- [ ] Lingkungan acuan ACC tidak berubah di luar koreksi tokoh/07 v3 yang sudah diminta; urutan/pasangan cerita terbaca.
- [ ] Tidak ada artboard lama tersisa dalam inventaris aktif; backup cukup untuk pemulihan source.
- [ ] Gambar/caption tidak saling bertentangan secara material; tidak mengklaim video, timing audio atau persetujuan kreatif final sudah selesai.

## Bahan untuk audit SFX semantik
N/A untuk produksi audio: keluaran berupa storyboard diam. Cue di STORYBOARD.md adalah rencana; tidak ada events audio per-frame, EDL final atau stem karena file lagu belum tersedia dan produksi audio tidak dikerjakan.

## Masalah diketahui / di luar cakupan
- Durasi 142 detik masih estimasi. File lagu/judul pasti/subtitle belum diberikan. Default tanpa overlay lirik. Caption lirik di luar ilustrasi bukan subtitle video.
- Montase pikiran menghubungkan 1 November, antisipasi akhir tahun, dunia daun/buku, lalu 2 November. Kejelasan perpindahan waktu saat animasi belum teruji.
- Grain, blur, animatic, rig karakter berjalan dan mix belum dibangun. Scene07 dari sesi lama dipertahankan, tidak diuji ulang.
- SVG mewarisi warna literal karena var() di atribut SVG pernah gagal pada renderer Wonder; token file tetap dipakai di caption. Ini batas renderer yang dicatat, bukan alasan mengklaim fidelitas gerak.
- Disk Mac 4,32 GiB: tidak melakukan build/render berat. Hanya operasi canvas remote, dokumentasi dan ekstraksi JPEG kecil.

## Perubahan sejak audit sebelumnya
1. MAJOR pantulan 22: embun atas dipindah ke tepi atas, tidak menutup rambut/mata/wajah; sisa senyum putih dihapus. Screenshot panel-22.jpg diperbarui.
2. Embun 16/17: bidang tipis dan tetes terlihat, alis/mulut murung, senyum kaca bergeser di bawah mulut nyata. Screenshot panel-16/17.jpg diperbarui.
3. Caption SFX 06/14/17/20/23/24 mengikuti cue spec, tidak menambah riser/drone atau memotong lagu.
4. Metadata pra-edit yang masih tersimpan dipulihkan ke canvas-before-r4-layout.json: 32 akar dengan label/x/y/width/height. File pendamping source, bukan mengubah riwayat sumber.
5. Panel 05: spec dan caption disamakan menjadi balon dari HP/pikiran, tidak lagi menyebut buku yang tidak terlihat.
6. Panel 21: torso miring 10°, siku/tangan diturunkan untuk ayunan. Batas tiga percobaan visual elemen ini tercapai; pose diam masih memerlukan uji animatic. Tidak mengklaim siklus lari sudah berhasil.
7. Panel 15: caption dipadatkan. Pembacaan live terbaru menunjukkan semua 25 panel setinggi 828.
Snapshot canvas-r4.json dan semua screenshot panel terdampak diperbarui setelah koreksi. Inventaris live masih 27; bukan instruksi meminta verdict tertentu.
