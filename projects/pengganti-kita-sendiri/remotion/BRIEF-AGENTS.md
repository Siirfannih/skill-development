# Brief build adegan Remotion · «Pengganti Kita Sendiri» (@siirfannih)

Kamu membangun adegan animasi untuk beberapa panel storyboard. Video: 1920×1080, 30 fps, 132,8 dtk, audio master sudah final (`public/audio/mix_v11.wav`). Visual harus mengikuti audio, bukan sebaliknya.

## Sumber kebenaran
- **Desain**: `src/panels/P<kode>.tsx` adalah panel storyboard Wonder yang sudah disetujui Irfan (960×540, Tailwind, variabel warna di `src/index.css`). Komentar di tiap file memuat keterangan storyboard: VO, visual, kamera (kode C..), transisi keluar (X..), SFX. **Jangan edit file panel.** Salin markup yang kamu butuhkan ke file adeganmu, lalu pecah jadi elemen yang bisa dianimasikan.
- **Waktu**: `PANEL-TIMING.md` berisi rentang tiap panel, timestamp tiap kata VO, dan SFX yang sudah ada di mix. Gerak penting harus mendarat di timestamp itu. Ambil waktu di kode lewat helper (`word()`, `panel()`), jangan menulis angka detik secara manual kecuali turunan dari helper.
- **Framework** (baca dulu, jangan diubah):
  - `src/lib/time.ts`: `panel(code)`, `word(teks, src, n)`, `wordsOf(src)`, `block(name)`, `f(detik)`. Nilai `src` kata VO: s1..s6 (narator), jensen, altman, news_*.
  - `src/lib/anim.tsx`:
    - `<Scene code="01b" pre post>`: membungkus adeganmu dan merender di rentang panel.
    - `useT()`: detik absolut.
    - `prog(t, a, b, ez)`, `keys(t, [[t,v],...])`, `EZ.out/inOut/acc`.
    - `<Panel2x>`: menskalakan markup 960×540 ke 1920×1080.
    - `<Camera scale x y rot ox oy blur>`, `shake()`.
    - `<KWord at out kind>`: teks kinetik per kata. kind: rise=T01, slam=T03, pop=T19, flipX=T28, swingY=T29, blurIn=T02, fade.
    - `<Grain>`.
  - `src/lib/media.tsx`: `<Clip src at inS outS grade>` memutar potongan video (muted; audio dari mix). Tersedia `DOC_GRADE`.
- **Contoh lengkap**: `src/scenes/S00_ColdOpen.tsx` (cold open yang sudah jadi). Tiru struktur dan tingkat detailnya.

## Cara mendaftarkan adegan
Buat file `src/scenes/S<kode>_<Nama>.tsx` (contoh `S01b_LogoRace.tsx`). Di akhir file:
```ts
export const SCENE = { Component: S01b_LogoRace, covers: ["01b"] };
```
Registrasi berjalan otomatis (`src/scenes/index.ts`). **Hanya buat atau ubah file milikmu sendiri.** Komponen bantu khusus kelompokmu taruh di `src/scenes/_<kelompok>_shared.tsx`; jangan sentuh file lain. Satu file boleh meng-cover beberapa panel bila transisinya kontinu (contoh: 03c+03d).

## Aturan desain (Irfan, wajib)
1. **Storyboard = struktur, bukan render akhir.** Pertahankan komposisi, palet, dan tipografi panel, lalu hidupkan: setiap elemen masuk dengan gerak beralasan, kamera mengikuti kode C di storyboard, dan keluar sesuai kode X. Tidak ada placeholder yang terlihat placeholder. Kalau panel bilang "foto = placeholder", pakai aset nyata yang tersedia.
2. **Teks**:
   - Kata muncul per kata, +2 frame setelah onset kata VO (`KWord at={word(...).s}`).
   - Teks layar tanpa tanda baca. Panel kadang menulis "LEBIH CEPAT." atau "Tanpa sadar,"; hapus tanda bacanya.
   - Satu baris per kalimat. Teks besar Inter 800/900. Satu kata aksen saja.
   - Teks tidak boleh di kiri atas atau di atas visual. Letakkan di tengah, di samping objek, atau di bawah.
   - Tidak ada scrim, glow, outline, atau blok warna di belakang kata.
   - Jangan ada teks biru di atas latar gelap/navy. Biru = solusi/alternatif, merah = negatif.
3. **Satu fokus per frame.** Tidak boleh layout teks besar di kiri + UI di kanan. Elemen yang diperbesar keluar frame dengan wajar.
4. **Kamera** hemat dan tegas:
   - Diam atau drift ≤ 1,03× di adegan informasional.
   - Gerak besar di pergantian makna. Kamera 2.5D: kamera yang bergerak, objek tetap bidang datar.
   - Easing hanya dari `EZ` (tanpa linear kecuali drift).
   - Overshoot UI ≤ 1,05; tanpa overshoot pada teks besar.
5. **Transisi**:
   - Tanpa crossfade. Pakai kode X di storyboard (cut on motion, zoom-through, hard cut di batas babak, whip, bloom match, frame-in-frame).
   - Adegan baru mendarat di kata pertama frasanya.
   - Elemen berisi teks tidak boleh bergerak > 25 px/frame tanpa alasan (teks jadi "barcode").
6. **UI asli**: kalau panel menampilkan ChatGPT, Gmail, dan sejenisnya, bentuknya harus seperti produk aslinya. Ikon AI asli ada di `public/icons/*.svg` (openai, claude-color, gemini-color, meta, nvidia-color, lovable-color, cursor, notion, whatsapp, x). AI digambar sebagai ikon AI, tidak pernah sebagai manusia.
7. **Gerak mengikuti logika dunia nyata**: membuang = jatuh ke tong; satu tugas = satu sesi chat; kiasan VO ("dalam semalam", "ribuan") tidak digambar literal.
8. **Audio sudah final.** Visual mendarat tepat di cue SFX yang tercantum di PANEL-TIMING (±1 frame), dan tidak ada gerak bermakna yang mendahului bunyinya.
9. **Deterministik**: tanpa `Math.random`, `Date`, atau state antar frame. Semua dihitung dari `useT()`.

## Verifikasi (wajib sebelum lapor)
- `npx tsc --noEmit -p .` bersih.
- Render still di beberapa momen kunci per panel (awal, kata kunci, akhir):
  ```
  npx remotion still Preview /home/claude/pks-out/<kode>_<detik>.png --props='{"from":<detik>}' --frame=0 --scale=0.4
  ```
  Lihat gambarnya (Read). Server hanya 2 CPU dan agen lain bekerja paralel, jadi render **satu per satu** dan maksimal ±3 still per panel. Jangan render video.
- Cek sendiri: teks terbaca dan tidak terpotong tepi, tidak tumpang tindih, satu fokus, transisi masuk/keluar nyambung dengan panel sebelum/sesudah (lihat `src/panels/` tetangga).

## Laporan (balasan akhirmu, ringkas)
- File yang dibuat dan panel yang di-cover.
- Untuk tiap panel: apa yang dianimasikan, kamera, transisi masuk/keluar.
- Penyimpangan dari storyboard beserta alasannya.
- Hal yang belum beres atau butuh aset.
