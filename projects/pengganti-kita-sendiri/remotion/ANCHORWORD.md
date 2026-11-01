# AnchorWord (PKS v9, B13)

`src/lib/AnchorWord.tsx` mengekspor `AnchorWord`, `AnchorStage`, `useAnchorAt`. Belum dipasang ke adegan (menunggu ANCHORS-V9.md).

## Gerak
Cepat–Hantam–Lambat: masuk 3 f (`enter="scale"` 1,35→1 + blur horizontal, atau `"left"`/`"right"` whip geser 260 px + blur searah),
lalu drift ease-out ekstrem 100→104 % selama ±1,5 dtk. Keluar `exit="cut"` (default) atau `"snap"` (3 f geser + blur). Tanpa linear, tanpa fade opasitas.
Posterize 12 fps hanya untuk grup teks ini (`Math.floor(f/2.5)*2.5`). Tekstur kertas: filter `feTurbulence` per langkah 12 fps pada glyph
(`grain` 0..1, default 0,5, alfa glyph tetap tinggi). Satu baris, Inter Black.

## Pakai
```tsx
import { AnchorWord, AnchorStage, useAnchorAt } from "../lib/AnchorWord";
const W = word("semalam", "s1", 1);          // detik absolut onset kata VO
const at = useAnchorAt(W.s);                  // -> frame lokal di dalam <Scene>
<AnchorWord text="SEMALAM" at={at} until={at + 40} x={960} y={540} size={260} color="#FAF8EC"
            enter="right" sfx={{ kind: "hit", id: "01a:anchor:semalam" }} />
```
Props: `text, at, until?, x, y, size, color, align (left|center|right: sisi yang menempel di x,y), enter, exit, maskSrc?, maskNode?, trackFn?, sfx?, grain?`.
`trackFn(frame) => {x,y}` = offset yang ditambahkan ke (x,y) per frame (kata menempel pada objek bergerak; dikuantisasi 12 fps juga).
Kontras, warna, dan penempatan (tidak di atas visual, tidak kiri-atas, tidak biru di gelap) tetap tanggung jawab adegan.

## Teks di BELAKANG subjek (layer z)
Cara utama (disarankan): bungkus dengan `AnchorStage`, urutan z = `bg` → teks → `fg`.
```tsx
<AnchorStage
  bg={<Img src={staticFile("shots/x_bg.png")} />}          // latar penuh (subjek ikut ada di sini, tertutup fg yang identik)
  fg={<Img src={staticFile("shots/x_subject.png")} />}      // cutout subjek PNG alfa 1920x1080, SAMA persis posisi/skala dengan bg
>
  <AnchorWord text="..." ... />
</AnchorStage>
```
Cutout diberikan adegan (dari hasil remove-background pada frame yang sama; kalau kamera bergerak, transform `bg` dan `fg` harus sama).
Alternatif per kata: `maskSrc="/shots/x_subject.png"` (kata dihapus di area alfa subjek, mask statis di ruang layar) atau `maskNode`.
Jangan pakai keduanya sekaligus dengan `fg`.
