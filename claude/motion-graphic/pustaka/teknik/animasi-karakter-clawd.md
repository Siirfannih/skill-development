# Teknik: animasi karakter maskot (bedah ClaudeAnimationBase, "Clawd")

Lembar TEKNIK: pola gerak/akting karakter yang boleh dipinjam untuk maskot apa pun (Claude crab, bunga Codex `>_`, bintang Gemini). Warna, huruf, tekstur, tempo tetap dari kiblat proyek; LANTAI berlaku.

## 1. Sumber, lisensi, status
- Repo `JohnHeibel/ClaudeAnimationBase`, commit `0ac8bf2` (dikloning 16 Nov). **MIT, (c) 2026 John Heibel**: boleh dipakai ulang, diubah, dijual; syarat satu: **sertakan notis hak cipta + teks lisensi di salinan/bagian substansial** (`animasi-karakter-clawd/LICENSE`). Karakter "Clawd" adalah maskot Claude Code (merek Anthropic): untuk video Jadisatu/Tuntunly pakai polanya, bukan menjiplak tokoh sebagai identitas kita.
- Status: **teknik pinjaman **. Belum diuji pada video kita; `clawd-motion.ts` baru dicek numerik (tanpa NaN, kurva sesuai asli), belum dirender di Remotion.
- Aset di `animasi-karakter-clawd/`: `LICENSE`, `docs/emotions.jpg` (31 emosi), `docs/views.jpg` (5 sudut, gerak, 15 topi), `src/motion-excerpt.js` (kutipan verbatim, hanya matematika gerak), `src/clawd-motion.ts` (port TS murni-dari-waktu, tanpa p5). Lihat gambar dulu; angka di bawah dari kode.

## 2. Cara repo membangun karakter (PENTING: bukan voxel, bukan 3D)
- **2D datar, dilukis**: p5.js + p5.brush, kanvas 1920x1080 (`core.js:3`, `:276`). Panduan melarang 3D: "Never project 3D … no `rotateY`" (`ANIMATION_GUIDE.md:31`). Kedalaman dari tumpang-tindih, skala, warna lebih pucat/biru.
- **Rig = poligon berlapis, satuan `u`**: badan 10u x 6u (x -5u..5u, y -8u..-2u), 4 kaki 1u x 2.2u, 2 lengan 2.2u x 1u berporos (±4.9u, -4.5u), mata celah 1u x 2u di (±2.5u, -6u), tanpa mulut saat diam (`clawd.js:5-8`). Urutan lapis: lengan jauh → kaki → badan (wash datar + elips terang `lt` + pita gelap `dk` + garis tinta) → wajah → topi → lengan dekat → kait `draw()` (`clawd.js:104-145`).
- **Pivot = kaki**: `translate(x, y+dy)` lalu `rotate`, jadi miring/putar berporos di tanah (`clawd.js:82-83`). Bayangan elips tinta di bawah kaki, mengecil saat melompat (`:76-77`).
- **Putar badan = gambar kunci, bukan proyeksi**: `VIEWS` front, q (3/4, sisi gelap `strip` -5..-2.3), side, qback, back (`clawd.js:20-31`). `spinView` membulatkan heading ke kelipatan 1/8 putaran; `turn` memakai ease + smear `.55*sin(k*pi)` (`:34-43`). Lihat `docs/views.jpg`.
- **Material**: wash 255 = warna datar tepat; `fill` cat-air 60-150 untuk bayangan; garis `ink` satu goresan meruncing (`core.js:195`); tebal garis `sw = clamp(u/15, .45, 2.4)`, jitter `J = .07u` (`clawd.js:71`). Cahaya = `glow()` ADD, bukan cat (`core.js:105-110`). Tekstur kertas + grain multiply + vignette (`core.js:248-265`).
- **Kamera**: `camBegin(cx,cy,zoom,rot)` = transform 2D (`core.js:91`); "views" repo = sudut karakter, bukan kamera. Ukuran: medium u 20-28, close-up 40-70, u<12 hanya wide (`ANIMATION_GUIDE.md:319-324`).

## 3. Sistem animasi (semua murni dari t, tanpa state antar-frame: `ANIMATION_GUIDE.md:229`)
- **Easing**: `ease` smoothstep, `easeOut` kubik, `backOut` s=1,9, `easeIn` kubik, `elasticOut` (`core.js:14-16,35-36`); `kf(t, [[t0,v0],...], ease)` (`:38`). **Tak ada lerp linear.**
- **Idle**: beat dari `bpm` (default 120 → 0,5 dtk; `config.js:5`). `_b`: `ab=|sin(bp*pi)|`, `hit=e^(-6f)` (`clawd.js:541`, `core.js:32`). Netral: `dy -.25*ab`, `sq .03*hit`, lengan .15±.05 (`:543`). Kedip: tiap 3,67 dtk, tertutup 0,133 dtk, fase per `seed` (`:248`). Garis tinta "mendidih" 12 gambar/dtk (`core.js:4`).
- **Squash & stretch**: skala x `1+sq*.6`, y `1-sq` (`clawd.js:84`); sq<0 meregang. `jump`: jongkok 0,12 dtk sq .18, naik sq -.16, mendarat sq `.22*e^(-8a)*cos(20a)` (`core.js:67-72`). `take`: sq .12 antisipasi 0,1 dtk, lalu -.26 dan dy -1,2 memantul (`:74-78`).
- **Overlap/follow-through**: `spring(t,t0,k=6,w=18)` (`core.js:59`); lengan pose ikut dengan fase beda kiri/kanan (hindari "twinning", `ANIMATION_GUIDE.md:105`); topi, emote, ekor menyusul.
- **Transisi emosi** `emotions(t, keys)` (`clawd.js:589-617`): sipit 0,1 dtk sebelum ganti dan 0,14 dtk sesudah; pose menyeberang `backOut(seg(age,0,.4))`; warna `ease(0,3 dtk)`; lalu `take(E.take)`; emote muncul `seg(age,.06,.32)`, emosi sekali-pakai pudar 1,4-1,8 dtk. Wajah tidak pernah "snap".
- **Aksi**: `stroll` (ease in-out, fase kaki = jarak/4u, bob `-|sin|*.5`; `core.js:81`), walk samping: pasangan diagonal ayun .55u, angkat .8u (`clawd.js:109-111`). `arcPt` untuk lemparan. `shakeXY` 24 fps (`core.js:54`).
- **Emosi (31; angka dari `clawd.js:543-573`)**: kolom `take` = besar reaksi saat MASUK emosi.

| emosi | take | gerak idle (u, rad) | wajah/warna |
|---|---|---|---|
| neutral | .3 | dy -.25, lengan .15 | mata celah |
| happy | .6 | dy -1,2 per beat, lengan .4±.4 | mata ^ ^, senyum, pipi .3 |
| excited | 1 | dy -2,4 (2 hit/beat), lengan 1±.5 | mata lebar, spark |
| love | .7 | rot .08, dx .5, dy -.6 | mata hati, rosy .5, pipi .8 |
| proud | .5 | sq -.1 (menjulang), lengan -.9 | gold .3, mata tutup |
| sad | .3 | sq .08, lengan -.75, lookY .5, gerak sangat lambat | biru .35, gloom .35, awan |
| angry | .8 | getar dx .1 @18 Hz, sq .12*hit | flush .45, alis miring |
| scared | 1,1 | getar dx .1 @22 Hz, sq -.06, lengan 1 | pucat .6, lookX bolak-balik |
| surprised | 1,3 | sq -.12, dy -.3, lengan 1,1 | mata lebar, mulut O, "!" pudar |
| idea | 1,1 | dy -1 per beat, lengan R 1,55 | mata kilau, bohlam |
| thinking | .4 | lookX .5, lookY -.8, rot .05 | titik-titik |
| sleepy / bored | .2 | napas sq .05±.05 @0,3 Hz / desah tiap 4 beat | zzz / mata sipit |
- **Demo** (`src/scenes/demo.js`): tempo baca dihitung per "read" (`ANIMATION_GUIDE.md:49-61,447-461`): lempar 0,15 dtk, terbang 0,8, kedatangan tahan ±0,45, reaksi 0,6, iris tutup (`demo.js:157`). Versi pertama memadatkan semuanya 1,3 dtk dan tak terbaca.

## 4. Render
- `render.mjs`: puppeteer-core + Chrome headless, `studio.html?render`, `window.renderAt(t)` → `canvas.toDataURL` (`core.js:301`). Default **24 fps** (`render.mjs:38`), 1920x1080, JPEG q .93-.94, ffmpeg libx264 crf 17-18 (`:48-50,142-144`). `--frames --workers=4` paralel + dapat dilanjutkan, tulis atomik (`:116-136`).
- GPU: `--use-gl=angle`; `--soft-gl` = SwiftShader; `--gpu-angle=vulkan|gl-egl` untuk node NVIDIA tanpa layar; `gpu_probe.mjs` mencetak renderer tiap set flag (`render.mjs:55-67`). Target ≤1,5 dtk/frame (`ANIMATION_GUIDE.md:275`).
- **Tanpa alpha/transparansi**: kertas buram di bawah semua. Tepi: garis tinta satu goresan, `pixelDensity(1)` tanpa supersample, tebal garis dikecilkan saat zoom (`ANIMATION_GUIDE.md:270`); tiap bentuk digambar di sekitar pusatnya agar stroke tak runtuh pada zoom ≥2 (`core.js:178`). Untuk alpha dan tepi bersih kita butuh jalur sendiri (§5).
- Alat cek: `--sheet` (kontak), `--strip=a:b` (SETIAP frame), `--crop`/`--crop-at` (resolusi penuh; `render.mjs:4-9`).

## 5. Ke Remotion kita (4.0.380, three 0.180, 1920x1080, 29,97 fps)
| repo | Remotion |
|---|---|
| `T` global, `renderAt(t)` | `t = useCurrentFrame() / fps`; semua pose = fungsi `t` |
| `shots([[t0,fn]])`, `lt` | `<Sequence from>` + `useCurrentFrame()` lokal |
| `kf`, `ease`, `easeOut` | `interpolate` + `CURVE.*`/`move()` di `curves.ts` (soft→drift, out→land, in→leave) |
| `onTwos`, `BOIL=12` | `Math.floor(t*12)/12` (±2,5 frame/gambar di 29,97) |
| `boilSeed(key)` | biji deterministik (`hash(i)`); tanpa `Math.random()` |
| `camBegin(cx,cy,zoom)` | kamera three / `drift()` di `curves.ts`; `shakeXY` → `hash(floor(t*24))` |
| `glow()` ADD | `THREE.AdditiveBlending` atau `mix-blend-mode: screen` |
| `clawd(x,y,u,pose)` | `<Rig pose={...}/>` dengan pivot di dasar (grup three `position.y=dy*u`, `scale=squashScale`) |
- **Salin langsung (MIT, sertakan LICENSE)**: matematika waktu/gerak: `seg, kf, spring, ring, arcPt, jump, take, stroll, spinView, turn, _b, EMO.body, emotions` → sudah dipindah ke `src/clawd-motion.ts`. Tabel `VIEWS`, angka pose, dan urutan lapis sebagai data.
- **Tulis ulang**: semua gambar (p5.brush, kertas, grain, mendidih, `paint/inkLine`), `render.mjs` (diganti `render.sh`), `glow`, `letter`. Mutu tepi dan alpha: render sprite dari SVG/canvas 2x + `anisotropy`, `premultipliedAlpha`, komposit di Remotion.
- **Resep karakter baru (mis. bunga Codex `>_`)**: (1) tulis storyboard dengan daftar *read* + waktu tiap read (`ANIMATION_GUIDE.md:115-134`); (2) lembar model: gambar karakter di ≥3 sudut kunci (depan, 3/4, samping) sebagai still, tentukan `u`, pivot di dasar, daftar bagian + koordinat lokal seperti `clawd.js:5-8`; (3) pilih rig (§6) dan beri tiap bagian lapis/kedalaman z; (4) pakai medan pose yang sama (`dx, dy, sq, rot, aL/aR` → mis. sudut kelopak kiri/kanan, `lookX/Y`, `squint`, `tint`); (5) tulis tabel `EMO` 6-8 emosi untuk karakter itu: wajah + `take` + `body(t)` terkunci beat; (6) `emotions(t, keys)` untuk SEMUA perubahan, dan atur `take` per emosi; (7) lapis idle: napas, bob per beat, kedip 3,67 dtk, kelopak menyusul lewat `spring` dengan jeda tak rata (`react(i)`); (8) aksi lewat `jump/take/stroll/turn`; (9) cek `npx remotion still` 3 ukuran (kontak, strip tiap frame saat gerak, crop wajah), plus QC UI/overlap kita; (10) render akhir lewat `render.sh` kita, bukan skrip repo.

## 6. Bila…, pilih…, karena…
- Bila tokoh dilihat dari satu sisi miring dan jarang berputar (gaya kartu 37: sprite di set 3D), pilih **sprite/billboard berlapis + sudut kunci tergambar** dalam adegan three, karena repo membuktikan 5 gambar + smear cukup dan membentuk bentuk lebih kuat daripada kubus 3D kecil. Pilih mesh/voxel 3D penuh hanya bila kamera mengorbit >60° atau ada paralaks antarobjek.
- Bila beat adalah momen cerita (kaget, ide, takut), pilih emosi ber-`take` ≥1 (surprised 1,3; furious 1,2; scared/idea 1,1); untuk beat narasi pilih `take` .2-.4 (neutral, thinking, bored), karena take besar menandai peristiwa dan harus langka.
- Bila ada VO/musik, kunci idle ke bpm/ketukan dan letakkan puncak (`take`, lompat) di ketukan; tanpa musik tetap pakai 120 bpm (`ANIMATION_GUIDE.md:69`), karena tubuh yang diam terbaca sebagai bug.
- Bila karakter kecil di frame lebar (u<12), pilih HANYA gerak besar (lompat, jalan); akting wajah di u ≥40, karena mata 1u x 2u tak terbaca kecil.
- Bila ada benda bercahaya, pilih cahaya aditif, bukan wash, karena warna cat bercampur jadi hijau-kelabu (`ANIMATION_GUIDE.md:32,439`).
- Bila simbol `>_` harus terbaca (usulan, belum diuji): pasang sebagai decal datar di cakram depan yang tetap menghadap kamera ≤35° yaw, ≥18% tinggi tokoh; gerakkan tubuh/kelopak, jangan menggilir simbolnya.

## 7. Kesalahan yang dihindari
- Dari repo (`ANIMATION_GUIDE.md:423-441`): berdiri diam tersenyum tanpa peristiwa; semua bergerak sama cepat, peristiwa bertumpuk tanpa tahan; wajah "snap"; gerak mekanis (linear, semua bagian serempak, dua lengan sama/kembar); pose penakut; seam tanpa transisi; 3D proyeksi; benda melayang dekat tangan; tiap shot dunia berbeda; teks/papan yang mengulang cerita.
- Dari kegagalan kita: **maskot stiker datar** (tanpa squash, bayangan, atau overlap: beri `sq`, bayangan di dasar, kelopak/lengan menyusul); **menghadap lurus kamera** (pakai 3/4 `q` sebagai pose dasar, `front` hanya untuk wajah/akting); **ubin kubus kecil** (satu bentuk, satu garis luar, tokoh ≥ u 20 di medium); **render kasar** (sprite 2x, tepi anti-alias, jangan JPEG antara); **simbol `>_` tak terbaca** (kontras, ukuran, tak diputar jauh dari kamera).
