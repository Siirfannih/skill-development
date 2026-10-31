# Brief putaran kamera · v2 (Irfan 31 Okt 20:19)

Masukan Irfan: "Camera movement yang biasanya diterapkan pada sebelum-sebelumnya juga belum diterapkan maksimal." Kamera di v1 terlalu hemat: banyak adegan hanya drift atau diam.

## Pola kamera Irfan yang wajib terlihat di setiap babak
1. **Kamera sebagai alat fokus, diulang sepanjang video.** Close-up mengikuti objek yang aktif/bergerak (C18 follow, framing 1,6–2,5×). Di momen penekanan, kamera **patah mendadak ke wide** (C15 snap reflow atau patah ≤ 6 f). Pola close → patah wide minimal sekali per babak.
2. **C01 zoom mikro di kata kunci**, 1,04–1,16× dalam 13–25 f, mulai tepat di onset kata kunci (kata yang slam, berwarna aksen, atau inti kalimat). Hampir setiap shot.
3. **C20 cut zoom**: potong ke subjek yang sama 1,6–3× lebih dekat di garis pandang sama, dengan momentum 4–8 f. Satu per 6–10 dtk, jatuh di downbeat/kata. Ini cara Instagram menjaga perhatian.
4. **C08 sapuan kiri→kanan** untuk barisan/daftar, bukan menambah teks.
5. **C02 push-in** membangun tensi sebelum kalimat penting. **C06 reveal-out** dari detail ke konteks.
6. **Transisi kamera** di batas panel: C04 seam di puncak kecepatan, C07 whip, C03/C05 push-through/zoom-through, dengan motion blur ≤ 2–3 f. Panel yang sekarang hanya cut boleh diubah menjadi gerak kamera yang menyambung, asalkan kode X di storyboard tetap dihormati.
7. **Kamera 2.5D**: yang bergerak kamera, bukan objek. Lapisan teks di depan, objek di tengah, latar di belakang, dengan parallax beda kecepatan per lapis.
8. **Gerak dalam shot pelan** (3–8 dtk, ease-in-out); **transisi antar shot cepat** (2–9 f). Tidak ada linear kecuali drift. Gerak kamera yang sama tidak dipakai dua beat berturut-turut.

## Batas (jangan dilanggar)
- **Keterbacaan.** Teks harus diam atau hampir diam (≤ 6 px/f) selama dibaca, minimal 0,8 dtk per frasa. Kamera besar bergerak sebelum/sesudah teks, bukan saat teks dibaca. Kamera tidak boleh melewati teks sebelum teks itu sempat terbaca.
- Teks tidak terpotong tepi pada zoom maksimum. Hitung bounding box teks dikali skala kamera.
- **Waktu event visual (kata muncul, objek mendarat, klik) TIDAK BERUBAH**, karena cue SFX v12 sudah dikunci ke waktu itu.
  - Kalau gerak kamera baru menghasilkan event diskret baru (cut zoom, whip, patah ke wide, push-through), tambahkan cue SFX-nya ke `sfx/cues_<kelompok>.json` milikmu dengan format SFX-BRIEF.md. Kelas: `whoosh_s` untuk whip/patah, `sub_thud` untuk mendarat berat, `riser` untuk push-through.
  - Cut zoom C20 cukup diberi bunyi bila terdengar sebagai event; boleh senyap kalau menempel di kata yang sudah berbunyi.
- Deterministik, memakai `Camera`, `keys`, `prog`, `EZ` dari `src/lib/anim.tsx`.

## Verifikasi
- `npx tsc --noEmit -p .`
- Still sebelum/sesudah di 2–3 momen kamera per panel, render satu per satu:
  `npx remotion still Preview <out>.png --props='{"from":<detik>}' --frame=0 --scale=0.4`
  Preview utama sudah bisa dirender lagi; error S03a lama sudah tidak ada.
- Laporkan per panel: gerak kamera sebelum → sesudah, cue SFX baru (id), dan alasan bila sebuah panel sengaja tetap diam.
