# AE-Primitives

Pustaka efek Remotion bergaya After Effects / editorial-dokumenter. Diimpor, tidak ditulis ulang per proyek. Setiap komponen menerapkan mekanik dari kartu cookbook yang disebut di bawah; kartu tetap sumber selera (kapan, seberapa besar), pustaka ini hanya cara membangunnya.

## Pasang

Salin `scripts/remotion/curves.ts` ke `remotion/src/lib/curves.ts` dan folder `ae-primitives/` ke `remotion/src/lib/ae-primitives/` (pustaka mengimpor `../curves`). Tanpa paket npm tambahan: hanya `remotion` 4.x dan React.

```tsx
import { WhipPanTransition, SpatialAnchorCamera, HighlighterSweep, fr, DURASI } from "./lib/ae-primitives";
```

Aturan yang dipegang semua komponen:
- Murni dari frame (tanpa `Math.random` tanpa biji, tanpa jam). Aman di-scrub dan dirender paralel.
- Durasi dalam frame; bawaan ditulis @30 fps di `presets.ts` dan diskalakan dengan `fr(n, fps)`.
- Tidak ada font di komponen (ikut induk; huruf dimuat dari file oleh proyek). Tidak ada warna merek bawaan: warna aksen wajib lewat props atau token `tema.ts` proyek; bawaan hanya putih/hitam netral (`NETRAL`).
- Kurva dari `curves.ts` (`CURVE.land/heavy/whip/reveal/leave/drift`), tidak ada gerak linear.
- Blur gerak berasal dari kecepatan (shutter 200°), bukan blur di tempat.

## Kenapa dikelompokkan begini

Kartu cookbook memakai kategori camera / typography / layout / texture, tetapi mekanik yang bisa dipakai ulang mengelompok menurut **apa yang disentuh efeknya**:

| Folder | Isi | Alasan |
|---|---|---|
| `transisi/` | WhipPan, GridFlashReveal, SceneChain | butuh dua adegan dan tumpang frame; adegan lama tetap di bawah |
| `aksen/` | FlashCut, InvertFlash | denyut 1–4 f di ketukan; kartu memakainya di titik potong (19.T3, 66.T2) **dan** di dalam satu adegan (86.T5, 23.T4), jadi tidak dikunci sebagai transisi |
| `kamera/` | SpatialAnchorCamera, MotionBlurWrapper | satu kamera 2D bergerak di atas satu dunia (39, 63, 65) |
| `kedalaman/` | SpatialDepthStage | lapis z + parallax + blur fokus (87.T3, 10-13, 94.T5); beda dari kamera 2D karena tiap lapis bergerak dengan faktornya sendiri |
| `teks/` | HighlighterSweep | efek pada huruf/frasa (48, 92) |
| `tekstur/` | SelectiveColorSpotlight, Scrim | grade dan pelapis gambar (19.T1, 39.T1) |
| `inti/` | aeKeyframe, gerak, DirectionalBlur, acak | matematika dan filter bersama |

## Komponen

### transisi/WhipPanTransition.tsx · `WhipPanTransition`, `WhipPan`, `whipOffset`
- Kartu: 19.T3 Flash-Inversion Whip Chain · 65.T2 Cursor-Driven Giant Word Whip · 71.T4 (whip 6–8 f, blur penuh); `camera-transition.md` C07/X06.
- Pakai saat: pergantian cepat antar bukti; lompatan dari arsip ke kini; pergantian babak cepat di hook; menyambung dua dunia warna. Jangan bila kata yang lewat adalah punchline (whip membuatnya tak terbaca).
- Props: `outgoing`, `incoming`, `at` (frame mulai), `durationInFrames` (8 f), `direction` `left|right|up|down` (arah konten bergeser; bawaan `left` = maju), `intensity` `lembut|normal|keras`, `gaya` `strip` (A+B satu pita, `CURVE.whip`) | `tumpang` (B meluncur di atas A, `CURVE.land`), `noChroma`.
- `<WhipPan phase="in"|"out" from>` membungkus satu adegan (dipakai SceneChain). Blur, regang, dan geser RGB dihitung dari kecepatan: puncak di tengah, nol di ujung.

```tsx
<WhipPanTransition at={0} outgoing={<SceneA />} incoming={<SceneB />} direction="left" />
```

### transisi/GridFlashReveal.tsx · `GridFlashReveal`, `gridOrder`
- Kartu: 14.T1 Tile-Grid Cut Wipe · 63.T3 Click-Triggered Grid Wave.
- Pakai saat: berpindah antar B-roll atau antar demo dengan sentakan kecil (14.T1, `pattern="random"`, ≤ 7 f, petak putih); pergantian babak UI yang dipicu aksi terlihat (63.T3, `pattern="ring"` dari titik klik). Jangan tanpa pemicu terlihat, di atas pembicara, di setiap transisi, atau lebih dari 3× per 10 dtk.
- Props: `durationInFrames` (14 f), `from`, `cols`/`rows` (bawaan 12 kolom lanskap / 5 potret, baris dari rasio), `pattern` `diagonal|random|ring|sweep`, `origin {x,y}`, `edge`, `seed`, `spread` (0,7), `grow`, `flashColor` (kosong = tanpa kilat petak), `flashIn`/`flashHold`/`flashOut` (`flashOut={0}` = petak hilang seketika), `flashGap` (px), `flashBlend` (`"screen"` di adegan gelap).

```tsx
<SceneA />
<GridFlashReveal pattern="ring" origin={{ x: 0.7, y: 0.35 }} flashColor={tema.aksen} flashBlend="screen" flashGap={8}>
  <SceneB />
</GridFlashReveal>
// gaya kartu 14: <GridFlashReveal pattern="random" durationInFrames={7} grow={false} flashColor="#fff" flashIn={1} flashHold={2} flashOut={0} spread={0.6}>
```

### transisi/SceneChain.tsx · `SceneChain`, `overlapFrames`
- Kartu: — (perakit). Aturan: `camera-transition.md` §10 (≥ 4 tipe per 30 dtk, tidak ada tipe sama berturut-turut, pemicu di akhir frase VO).
- Pakai saat: merangkai adegan dengan transisi `cut | whip | grid | flash`. Panjang total = jumlah durasi adegan; adegan lama diperpanjang selama frame transisi berikutnya sehingga tidak ada frame hitam di sambungan.
- Props: `scenes: { id, durationInFrames, content, enter? }[]`, `background`.

```tsx
<SceneChain scenes={[
  { id: "a", durationInFrames: 60, content: <A /> },
  { id: "b", durationInFrames: 75, content: <B />, enter: { type: "whip", direction: "left" } },
  { id: "c", durationInFrames: 90, content: <C />, enter: { type: "grid", pattern: "diagonal" } },
  { id: "d", durationInFrames: 45, content: <D />, enter: { type: "flash" } },
]} />
```

### aksen/FlashCut.tsx · `FlashCut`, `flashEnvelope`
- Kartu: 66.T2 Frame-Locked Flash Cut · 19.T3 (kilat 1–2 f); `camera-transition.md` X12; `guide/gerak` GRK-01 (flash = N frame intensitas penuh tanpa naik/turun).
- Pakai saat: cut yang perlu diberi aksen "klik kamera", di beat musik. Jangan di konten tenang atau di setiap cut; kilat putih penuh maksimal 1–2× per video (X12).
- Props: `at`, `hold` (2 f), `decay` (0; `FLASH.exposure` = tahan 1 luruh 3), `color` (putih netral; latar terang → warna gelap), `mode` `solid|overexpose`, `brightness`, `blend`, `children` (wajib untuk overexpose; tanpa children = lapisan saja).

### aksen/InvertFlash.tsx · `InvertFlash`, `invertActive`
- Kartu: 19.T3 (inversi 2 f) · 86.T5 Local Invert Logo Grid · 23.T4 Negative Glitch Flip.
- Pakai saat: pergantian cepat antar bukti yang dipicu kata (19.T3); pengungkapan nama atau logo setelah grid foto (86.T5, `region`); pembalikan masalah ke solusi, "bukan lagi" (23.T4, `mode="flicker"`). Jangan bila kata tidak berganti (kilat tanpa alasan) atau audiens sensitif kilat.
- Props: `at`, `durationInFrames` (2 f), `mode` `solid|flicker`, `every` (2 f), `grayscale` (0..1), `region {x,y,w,h}` (pecahan frame), `children` (membungkus = filter; tanpa children = lapisan `difference` di atas saudaranya).

### kamera/SpatialAnchorCamera.tsx · `SpatialAnchorCamera`, `anchorCamera`, `coverBox`
- Kartu: 39.T1 Selective-Color Group Index · 63.T1 Floating Window Virtual Camera · 65.T3 Anchor-Object Camera Dive; `camera-transition.md` C19 (drift saat hold); GRK-02 (teks dunia ikut bidangnya).
- Pakai saat: cerita banyak tokoh dari satu foto, kembali ke foto yang sama untuk menyorot tokoh berikut (39.T1); satu halaman/desktop dibawa satu kamera yang tidak pernah diam (63.T1).
- Props: `path: FocalKey[]` (`at` frame, `fx`,`fy` 0..1 di aset, `s` zoom ≥ 1 relatif cover, `ax`,`ay` posisi layar, `drift` per detik = 0,012, `pegas`), `contentWidth`/`contentHeight` (ukuran asli aset; isi dirender di kotak ini lalu diskalakan), `pegas` (`PEGAS.jangkar`), `shutter`/`maxBlur` (blur searah saat pindah), `opaque`, `background`.
- Perilaku: pegas ketat (tanpa pantul) dari posisi kamera yang sebenarnya, zoom di ruang log, drift setelah mendarat; `coverBox` menjepit sehingga tepi aset tidak pernah terlihat. Teks yang ditaruh di dalam aset ikut kamera.

```tsx
<SpatialAnchorCamera contentWidth={3000} contentHeight={2000} path={[
  { at: 0, fx: 0.2, fy: 0.3, s: 1.5 },
  { at: fr(40, fps), fx: 0.7, fy: 0.35, s: 1.9 },
]}>
  <Img src={staticFile("foto.jpg")} style={{ width: "100%", height: "100%" }} />
</SpatialAnchorCamera>
```

### kamera/MotionBlurWrapper.tsx · `MotionBlurWrapper`
- Kartu: 87.T2 Per-Letter Motion-Blur Landing · 67.T1 Motion-Blur Counter Roll; `smooth-motion.md` §1 (shutter 200°).
- Pakai saat: kata isi pendek yang diucapkan cepat dan perlu terasa berat atau bersemangat (87.T2); angka pengumuman yang naik ke nilai akhir (67.T1); objek apa pun yang bergerak cepat.
- Props: `pose(frame) => {x, y, scale?, rotate?}` (murni), `shutter` (200), `maxBlur` (40), `chromaRatio`/`maxChroma`, `fill`, `opaque`, `origin`.
- Batas: blur dari translasi saja; blur zoom/rotasi tidak dihitung (snap zoom: `<CameraMotionBlur>` bila paket `@remotion/motion-blur` sudah ada di proyek, dan uji dulu di dalam `<Sequence>`).

```tsx
<MotionBlurWrapper pose={(f) => ({ x: 0, y: -380 * (1 - move(f, react(i, fps), 8, "land")) })}>
  <span>{huruf}</span>
</MotionBlurWrapper>
```

### kedalaman/SpatialDepthStage.tsx · `SpatialDepthStage`, `DepthLayer`, `depthFactor`
- Kartu: 87.T3 Focus-Pull Contrast Layers · 10-13.T1 Depth-Scattered Photo Satellites · 94.T5 Depth-Blurred UI Dive.
- Pakai saat: kalimat koreksi atau kontras ("bukan karena X, tapi karena Y") dengan tarik fokus antarlapis (87.T3); memperagakan layanan atau isi feed, pembuka/penutup yang lega (10-13.T1); kata merek diikuti demo UI dalam satu pegangan kamera (94.T5).
- Props panggung: `camera {x, y, push, rotate}`, `focusZ` (animasikan untuk tarik fokus, 6–8 f `CURVE.reveal`), `distance` (1000), `blurPerUnit` (0,012), `maxBlur` (14), `dimPerUnit`, `background`. Props lapis: `z` (negatif jauh, 0 hero, positif dekat), `fill` + `overscan` (latar yang harus menutup frame), `extraBlur`, `sharp`.

```tsx
<SpatialDepthStage camera={{ x: camX, push }} focusZ={focus}>
  <DepthLayer z={-800} fill><Latar /></DepthLayer>
  <DepthLayer z={0}><Hero /></DepthLayer>
  <DepthLayer z={250}><TeksDepan /></DepthLayer>
</SpatialDepthStage>
```

### teks/HighlighterSweep.tsx · `HighlighterSweep`, `sweepProgress`
- Kartu: 48.T1 Highlighter Caption Box (sorot koran: `scaleX` dari kiri 8 f `CURVE.reveal`, `multiply`) · 92.T5 Blank-Page Quote Highlight.
- Pakai saat: kutipan tertulis dari narasumber yang menjadi bukti (92.T5); fakta yang diucapkan datar tapi perlu dibaca, sorot di koran/halaman (48.T1).
- Props: `color` (wajib, dari token), `start`, `durationInFrames` (12 f), `direction` `ltr|rtl`, `coverage` (0,9; 0,5 = spidol setengah bawah), `padX`, `radius`, `blend` (`"multiply"` di atas kertas/foto), `textColor`.
- Frasa yang terlipat: tiap baris menyapu bersamaan.

```tsx
<p>Paragraf biasa, lalu <HighlighterSweep color={tema.stabilo} start={fr(18, fps)} blend="multiply">kutipan yang disorot</HighlighterSweep>.</p>
```

### tekstur/SelectiveColorSpotlight.tsx · `SelectiveColorSpotlight`
- Kartu: 19.T1 Desaturated Crowd Spotlight · 39.T1 Selective-Color Group Index.
- Pakai saat: menyebut satu orang di tengah kelompok atau generasi; "dari foto inilah dia mulai". Jangan untuk foto satu orang atau wajah terlalu kecil untuk disorot.
- Props: `focus {x, y, rx, ry}` (pecahan frame), `start`, `durationInFrames` (9 f), `progress` (manual), `dim` (0,55), `blur` (2 px), `feather` (0,35), `haloColor` (kosong = tanpa pendar), `haloOpacity`.
- Isi dirender dua kali (salinan grade + salinan ber-mask): untuk video berarti dua decoder.

### tekstur/Scrim.tsx · `Scrim`
- Kartu: — . Lantai A7/A9 (kontras ≥ 4,5:1, kotak hanya bila kontras gagal) dan B13 (overlay masuk/keluar dengan gerak).
- Pakai saat: teks di atas foto gagal kontras dan kotak tidak diinginkan.
- Props: `side` `left|right|top|bottom|flat`, `strength` (0,62), `color` (hitam netral), `enterAt`/`enterFrames`, `exitAt`/`exitFrames` (meluncur dari sisinya, `CURVE.heavy` / `CURVE.leave`).

### inti/
- `aeKeyframe.ts` · `aeValue`, `aeValueN`, `aeEase`, `overshootKeys`, `aeVelocity`, `EASY_EASE`: keyframe gaya Graph Editor AE (influence %, kecepatan di kunci, hold, overshoot). Pakai saat angka AE/kartu menyebut influence (mis. `aeEase(18, 92)` resep teks R1, `smooth-motion.md` §2) atau satu properti punya > 2 kunci. Gerak dua kunci biasa: `move()` + `CURVE`.
- `gerak.ts` · `kecepatan`, `blurDariKecepatan`, `chromaDariKecepatan`: kecepatan dari fungsi pose (±0,5 f) dan blur setara shutter.
- `DirectionalBlur.tsx` · blur searah + geser RGB lewat satu filter SVG; arah miring dengan trik putar. `opaque` untuk isi buram penuh: tepi dibantali salinan bergeser lalu dipotong ke bentuk isi, setara "repeat edge pixels".
- `acak.ts` · `acakBerbiji`, `acakIndeks`, `idAman`.

## Jebakan yang sudah diukur

- `edgeMode="duplicate"` pada `feGaussianBlur` tidak dihormati Chrome render Remotion: tepi blur memudar ke transparan (pinggiran gelap ±2σ). `DirectionalBlur opaque` menggantinya dengan bantalan salinan. Jangan pakai `opaque` untuk objek ber-alpha (bagian kosong jadi hitam).
- `feColorMatrix` alpha=1 tidak menormalkan warna tepi di Chrome (warna tetap terpremultiplikasi); jangan dipakai untuk menghapus pinggiran blur.
- `clip-path: path()` dipakai GridFlashReveal; koordinatnya px terhadap kotak elemen (elemen harus seukuran frame).
- Filter SVG pada adegan penuh mahal; matikan sendiri saat diam (komponen sudah melewati filter bila blur dan RGB < 0,05 px).

## Belum ada (kandidat dari kartu yang sama)

Radial burst antardunia (25.T1), zoom-through ke objek/huruf (19.T4, C05), grid klip pembuka lalu push ke satu kotak (93.T6), blob organik penutup glitch (23.T4). Bangun dengan pola yang sama (frame murni, kurva dari `curves.ts`, warna dari props) bila proyek membutuhkannya.
