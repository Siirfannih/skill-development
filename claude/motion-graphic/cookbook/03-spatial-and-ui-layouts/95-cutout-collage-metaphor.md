---
id: "95"
pola: Cutout-Collage Metaphor
kategori: layout
kategori_lain: [typography, camera]
trigger: penjelasan konsep atau paradoks lewat benda metafora cutout di kanvas gradien; cerita kontras kecepatan vs kedalaman atau kebiasaan vs hasil; rangkaian argumen cepat dengan prop simbolik (jam, otak, kendaraan, kursor)
sumber: rt2rj (esai visual cutout halftone di kanvas gradien biru-ungu) · 9:16 · 51,7 dtk
dilihat_bergerak: ya
diukur: ya
alias: [cutout, collage, metaphor, halftones]
---
# 95 · Cutout-Collage Metaphor

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya.
> Sumber: `rt2rj.mp4` (51,7 dtk, 716x1274, 30 fps) · Frame: `../../guide/referensi/sheets/95-rt2rj.jpg` (1 fps) · Video sumber: `/home/irfan/work/pustaka-video/unggahan/95-rt2rj.mp4`
> Dilihat bergerak: **ya** (contact sheet 1 fps 52 sel + pemeriksaan transisi).

**Inti mekanik (1 kalimat):** Setiap frasa argumen diwakili oleh satu benda cutout monokrom-halftone berbayangan lembut yang mengambang di atas kanvas gradien bersih, disertai judul display tebal yang terikat ke benda itu dan kata pengantar mungil di atasnya.
**Narrative trigger:**
- Argumen paradoks atau analogi konseptual ("bukan X melainkan Y") → T1
- Benda metafora berinteraksi dengan elemen digital (kursor klik, kotak piksel, jam berdetak) → T2

## Kondisi footage asli
- Tanpa A-roll talking head dan tanpa klip B-roll penuh; 100 % motion graphic komposit di atas satu kanvas gradien radial bersih (`#B7B7FF` → `#EEF0FF`).
- Tiap adegan hanya memuat 1 subjek cutout halftone utama (±35–55 % lebar frame) dengan drop shadow nyata + 1 blok tipografi di atas/bawah subjek.

## Pola

### T1 · Floating Halftone Cutout + Anchor Typography · layout
- **Trigger:** kalimat membawa satu metafora benda konkret (jam, pel, meja diner, koin, chip).
- **Yang terlihat:** objek cutout tanpa kotak bingkai (PNG transparan dengan drop shadow lembut) masuk dengan `scale` 0,88→1 dan sedikit rotasi (-3°→0° dalam 8 frame `CURVE.land`), lalu melayang pelan (`±4 px` sinusoidal selama hold) agar hold > 1 dtk tetap hidup.
- **Mekanik Remotion (titik awal):**
  - Lapisan: kanvas gradien bersih → bayangan elips/drop-shadow di bawah objek → gambar PNG transparan objek → teks pengantar kecil (italic/regular 28–36 px) tepat di atas hero display tebal (`84–120 px`).
- **SFX:** famili `taktil` atau `ui` (misal potongan pendek kertas/objek mendarat `documenter.mp3` atau `pop up.mp3` dari `~/sfx/SFXIrfan`) di level alami tepat saat cutout mendarat.
- **Remix:** pertahankan 1 subjek cutout + drop shadow + 1 jangkar kata hero; ganti palet gradien, font, dan prop metafora sesuai cerita proyek.

### T2 · Interactive Prop Overlay · camera
- **Trigger:** benda metafora dimodifikasi oleh aksi (kursor mengklik subjek, kilau piksel/glint, blok kode menempel).
- **Yang terlihat:** kursor piksel/panah atau aksen vektor masuk menyentuh sisi objek cutout di ketukan kata kerja ("killing", "building", "designing").
- **Mekanik Remotion (titik awal):** pakai `Kursor.tsx` atau overlay SVG ringan yang bergerak ke titik fokus objek pada 6–10 frame lalu memicu kilat kecil / perubahan warna aksen.
- **SFX:** famili `mekanik` atau `ui` (`Enter.mp3` / klik kursor dari `~/sfx/SFXIrfan`) tepat di frame sentuh.
- **Remix:** pertahankan mekanik kursor/aksi menyentuh objek; ganti jenis ikon kursor dan warna sorotan mengikuti merek proyek.
