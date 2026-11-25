# Efek dan 3D: kapan, mana yang aman, resep

Referensi mandiri (bukan gerbang wajib). Angka bertanda (usulan) belum diuji; sisanya dari uji repo atau dokumen resmi (Remotion, Blender), dicek 25 Nov 2026.

## 1. CSS 2,5D, `@remotion/three`, atau Blender

Default: CSS 2,5D (`SpatialDepthStage`, `SpatialAnchorCamera`). 3D dipilih hanya bila SEMUA benar:
1. Beat butuh sudut pandang nyata: kamera lewat >= 2 sisi objek, atau >= 3 lapis dengan parallax >= 10% geser (usulan).
2. Objek utama <= 1 per shot, gaya sesuai `BRAND.md` (low-poly/voxel/clay). Gaya 2D flat/cutout: 3D dilarang tanpa persetujuan di `RESEP.md` (`MOTION-CORE.md`).
3. Shot 3D >= 2 dtk, total <= 25% durasi, <= 1 shot per 10 dtk (usulan).
4. Teks dan tekstur tetap tajam 1080p; hanya 3D yang boleh setengah resolusi lalu diperbesar.

Pilih renderer:

| Renderer | Pakai bila | Biaya (terukur di mesin tanpa GPU) |
|---|---|---|
| `@remotion/three` | perkiraan <= 2 dtk/frame; push/orbit, logo, maskot low-poly | 0,95-1,89 dtk/frame (uji `Kepiting3D.tsx`, SwiftShader) |
| Blender Cycles | butuh GI, DOF, bahan nyata | ~60 dtk/frame CPU (77 frame = 77 mnt); Blender belum ada di PATH PC |

Perkiraan total > 30 mnt: tanya pemilik (biaya/waktu). Aturan `@remotion/three`: animasi dari `useCurrentFrame()` (bukan `useFrame()`), `<Sequence layout="none">` di dalam canvas, render server `chromiumOptions.gl: "angle"`. Blender: `scripts/blender/render_seq.sh`, hasil EXR/PNG sebagai `<Img>` per frame.

## 2. Matriks determinisme

| Mekanisme | Putusan | Perlakuan |
|---|---|---|
| Animasi dari `useCurrentFrame()` | aman | standar |
| `useFrame()`, `requestAnimationFrame`, `Math.random` | tidak aman | `random(seed)` dari Remotion |
| GSAP | aman bila `paused: true` + `seek(frame/fps)` | |
| Bloom, glow, vignette | dilarang (K2) | kulit referensi; tidak dipakai |
| DoF, chromatic aberration (tanpa memori) | aman bila berfungsi | chromatic aberration hanya di momen impact |
| Afterimage, trail, TAA (butuh frame sebelumnya) | tidak aman | `<CameraMotionBlur>` / `<Trail>`, atau bake offline |
| Fisika real-time di browser | tidak aman | bake (Blender rigid body) lalu putar per frame |
| Cycles | aman | render sequence |

Motion blur 3D resmi: `<CameraMotionBlur>` (shutter 180, samples 10; biaya x samples). `useCurrentFrame()` di luar komponen blur mematikan blur.

## 3. Filter SVG deterministik

Tanpa paket tambahan; semua parameter dari `frame`. Tanpa grain atau tekstur dekoratif di atas gradien (K2); chromatic aberration <= 2 px usulan, hanya di momen impact.

```tsx
const f = useCurrentFrame();
<svg width={0} height={0}><defs>
  <filter id="tex">
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} seed={f % 997} result="n"/>
    <feColorMatrix in="n" type="saturate" values="0" result="g"/>
    <feComposite in="SourceGraphic" in2="g" operator="arithmetic" k1="0" k2="1" k3="0.05" k4="-0.025"/>
    <feComponentTransfer><feFuncR type="discrete" tableValues="0 .33 .66 1"/><feFuncG type="discrete" tableValues="0 .33 .66 1"/><feFuncB type="discrete" tableValues="0 .33 .66 1"/></feComponentTransfer>
  </filter>
  <filter id="riak"><feTurbulence baseFrequency="0.01 0.03" seed={7} result="t"/>
    <feDisplacementMap in="SourceGraphic" in2="t" scale={12 * Math.sin(f / 20)}/></filter>
</defs></svg>
<div style={{ filter: "url(#tex)" }}>...</div>
```
`#tex`: grain (seed berubah per frame) lalu posterize 4 level. `#riak`: displacement riak (seed tetap, `scale` dari frame). Biaya di bench repo 0,4-0,6 dtk/frame. Snippet belum diuji render di sesi ini; ukur dulu di still. Posterize + grain pada footage redup: lihat larangan di `grade.md`.

## 4. Catatan mesin

WebGL di PC server jatuh ke SwiftShader (CPU) bila akun belum masuk grup `render` dan `video`; GPU tidak terjangkau. Jangan menjalankan `usermod`/`sudo` untuk itu; catat `UNMASKED_RENDERER_WEBGL` dan pakai angka biaya SwiftShader di atas. Hindari `gl: "swangle"` (sekitar 8x lebih lambat, kualitas turun). Cek `blender --version` sebelum menjadwalkan render Blender.
