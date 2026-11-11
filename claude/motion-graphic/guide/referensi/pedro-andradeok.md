# 14 pedro.andradeok · "Grid Cut Editorial": guideline editing

> Dibedah Claude 9 Nov dari video kiriman Irfan (contact sheet di `sheets/`, scene detect ffmpeg, ebur128, spektrogram + onset librosa). Standar kualitas Irfan; kartu anatominya di `../../pustaka/kartu/`. Bila bertentangan dengan `../../LANTAI.md`, lantai menang; bagian "Benturan" berisi usulan yang belum disetujui.
> Sumber: `pedro.andradeok_De8GO2-RItV.mp4` · 960×720 (4:3) · 29,97 fps · 34,3 dtk · talking head + B-roll + screen recording Premiere.
> Status: guideline editing (tata bahasa), **bukan template**. Ambil prinsipnya, bukan isinya. Lihat §11 untuk benturan dengan aturan tetap Irfan.

---

## 0. DNA dalam satu kalimat
**Sinematik hangat + kata-kata putih bersih yang "mengorbit" pembicara, diselingi transisi grid-tile dan subjek yang keluar dari bingkai.** Rasanya: kreator editor yang sedang mengajar, personal, tenang, tapi tiap 2–3 detik ada kejutan visual kecil.

Cocok untuk: tutorial/edu personal, behind-the-scenes, "aku tunjukkan triknya", konten creator-to-creator.
Tidak cocok untuk: dokumenter serius, explainer data berat.

---

## 1. Kanvas
| Item | Nilai referensi | Untuk proyek kita |
|---|---|---|
| Rasio | 4:3 (960×720) | Ikuti orientasi footage. Horizontal → 1440×1080 (4:3) atau 1920×1080. Vertikal → 1080×1350 (4:5) |
| fps | 29,97 | 30 |
| Safe area | teks sampai ±6 % dari tepi | margin 6 % kiri/kanan, 8 % bawah |
| Background | selalu footage penuh; kartu abu terang `#E6E6E6` hanya saat "title moment" | sama |

---

## 2. Struktur & ritme (terukur)
- **Shot median 2,5 dtk**, p90 4,4 dtk, ±23 cut/menit (scene detection) — ditambah perubahan teks tiap 0,2–0,4 dtk sehingga *selalu ada yang baru*.
- Pola blok:
  1. **Hook 0–1,8 dtk**: 3 B-roll sinematik (taman → jalan → Times Square), satu kata/frasa per shot, ditutup *title card* "Grid Cut".
  2. **A-roll** (talking head, wide-medium, kamera eye-level, sedikit wide-angle) → menjelaskan.
  3. **Insert** (tangan di keyboard, close-up layar) 1–1,5 dtk untuk kata kerja ("hubiese", "costado").
  4. **Screen recording** UI (Premiere) dengan zoom ke panel yang sedang dibahas, 1 kata per frame di bawah panel.
  5. **Demo hasil**: jendela app melayang di atas wallpaper macOS (rounded window + shadow), transisi grid diputar di dalamnya.
  6. **Penutup A-roll**: kata kunci penutup dalam tanda kutip, besar ("“huella”").
- Rasio waktu (kira-kira): A-roll 45 % · screen/UI 35 % · B-roll/insert 20 %.

---

## 3. Warna & grade
| Token | Hex | Pakai |
|---|---|---|
| `text` | `#FFFFFF` | semua teks |
| `title-card` | `#E6E6E6` | latar title moment |
| `tile-flash` | `#FFFFFF` | kotak grid transisi |
| Grade A-roll | tungsten hangat, highlight oranye, bayangan teal-gelap, kontras rendah-sedang, vignette lembut | — |
| Grade B-roll | natural, sedikit desaturasi, hitam diangkat (filmic) | — |

Aturan: **tidak ada warna aksen pada teks.** Hierarki dibuat murni dari ukuran dan posisi, bukan warna.

---

## 4. Tipografi
| Peran | Font (padanan) | Ukuran (% tinggi frame) | Catatan |
|---|---|---|---|
| Kata narasi | Helvetica Now Display Medium / Inter Display Semibold | 3,5–4,5 % | lowercase/sentence case, tracking −2 % |
| Kata kunci | sama, Bold | 5,5–7 % | — |
| Angka / kata hero | sama, Bold | 11–16 % | "20", "transición", "Grid Cut" |
| Satuan kecil | sama, Medium | 1,5–2 % | menempel kanan-bawah angka ("20 ᵐⁱⁿᵘᵗᵒˢ") |
| Kata pengantar | sama, Medium | 2–2,5 % | duduk tepat di atas kata besar, rata kiri ("esta / **transición**", "mucha / **precisión**") |

- Rasio kata hero : pengantar ≈ **5–7 : 1**. Ini sumber "rasa editorial"-nya.
- Leading sangat rapat (≈ 0,85) untuk pasangan pengantar + hero, seperti logotype.
- Tidak ada stroke, tidak ada bayangan, tidak ada box. Keterbacaan dari footage yang gelap/low-key.

---

## 5. Animasi teks (@30 fps)
| Kode | Nama | Spesifikasi | Kapan |
|---|---|---|---|
| P-T1 | **Word-pop** | kata muncul *cut-in* (0 f) atau scale 0,92→1 dalam 3 f + opacity 0→1 dalam 2 f. Satu kata per kata VO, onset +0…+2 f | default A-roll |
| P-T2 | **Orbit build** | kata-kata satu kalimat muncul satu-satu di posisi berbeda **mengelilingi kepala** (zona kiri-atas, kiri, kanan-atas, kanan-bawah), tetap tinggal sampai kalimat selesai, lalu hilang bersamaan (cut 0 f) | kalimat penegasan ("lo único que tenés que hacer") |
| P-T3 | **Stack pair** | kata pengantar kecil muncul dulu, 4–8 f kemudian kata hero besar muncul di bawahnya | konsep/istilah |
| P-T4 | **Number + unit** | angka hero cut-in, satuan kecil menyusul 2–3 f | angka |
| P-T5 | **Title wipe** | judul ("Grid Cut") terbuka kiri→kanan per huruf/potongan dalam ±10 f (mask), subjek ter-cutout **di depan** huruf | judul/nama teknik |
| P-T6 | **Panel caption** | 1 kata, kecil (3 %), rata kiri di bawah panel UI yang dibahas, ganti tiap kata VO | screen recording |

Aturan keluar: teks **hilang dengan cut**, tidak fade. Satu kata hanya bertahan selama kata itu diucapkan (±6–12 f), kecuali Orbit build.

---

## 6. Komposisi
- Posisi teks dipilih dari **ruang kosong di sekitar kepala**, bukan satu baris subtitle tetap.
- Di A-roll medium: zona teks = kiri dan kanan kepala, garis mata sampai dada. Teks tidak pernah menutupi wajah.
- Kata hero menempel ke subjek (di depan dada atau di sisi bahu), seolah bagian dari ruang.
- Screen recording: **zoom ke panel yang dibahas sampai panel mengisi ≥ 60 % frame**; kata di bawah panel, rata kiri dengan tepi panel.
- Demo window: jendela app rounded (radius ±1,5 % lebar) + drop shadow lembut, melayang di atas wallpaper alam berwarna dingin.

---

## 7. Kamera & transisi
| Kode | Transisi | Spesifikasi | Kapan |
|---|---|---|---|
| P-X1 | **Grid Cut** (signature) | frame dibagi grid (±4×3). Tile-tile putih `#FFFFFF` muncul acak 1–2 f per tile, total 5–7 f, sebagian tile langsung menampilkan shot B → shot B penuh | antar B-roll di hook; demo |
| P-X2 | **Band squeeze + pop-out** | latar berubah `#E6E6E6`, shot menyusut vertikal jadi pita horizontal (±40 % tinggi) dalam 3–4 f; subjek cutout **keluar dari pita** (kepala & kaki melewati tepi) | title moment |
| P-X3 | Hard cut on word | cut tepat di onset kata pertama kalimat baru | A-roll ↔ insert |
| P-X4 | Punch-in A-roll | cut ke framing 110–125 % dari shot yang sama | tiap 2–3 kalimat, cegah monoton |
| P-X5 | Zoom ke UI | scale 100→140–180 % ke panel dalam 8–12 f, ease-out | screen recording |

Kamera A-roll statis (tripod). Semua "gerak" datang dari cut, punch-in, dan transisi.

---

## 8. Elemen grafis
- **Subject cutout** (segmentasi) untuk P-X2 dan teks-di-belakang-subjek di P-T5.
- **macOS window chrome** asli (traffic lights, judul) saat demo app.
- Dock/ikon asli app (Pr, Ae, Finder) boleh terlihat di bawah — memberi konteks nyata.

---

## 9. Audio (terukur)
- Loudness −17,4 LUFS integrated, LRA 2,1 LU (sangat padat/konsisten).
- **Bed musik kontinu tanpa jeda** di bawah VO sepanjang video (spektrogram: energi rendah-tengah tidak pernah putus).
- Onset perkusif ±1,1/dtk; hanya ±1/3 cut punya transien SFX dalam ±100 ms → SFX hemat, dipakai di transisi Grid Cut (klik/tick per tile) dan title moment.
- Centroid median ±2,0 kHz → mix cerah tapi tidak menusuk.

Untuk proyek kita (ikuti aturan tetap Irfan): SFX asli (bukan sintesis), **satu bunyi konsisten per kata kunci kode** — tile grid = satu klik kamera/shutter tipis per gelombang tile, bukan per tile; title pop-out = whoosh tipis mid-frequency; tidak ada jeda senyap pada backsound.

---

## 10. Implementasi Remotion
```tsx
// tokens.gl01.ts
export const GL01 = {
  fps: 30,
  color: { text: '#FFFFFF', card: '#E6E6E6', tile: '#FFFFFF' },
  font: { family: '"Inter Display", "Helvetica Now Display", sans-serif', track: '-0.02em' },
  size: { narr: 0.04, key: 0.062, hero: 0.14, unit: 0.018, lead: 0.022 }, // × height
};
```
```tsx
// WordPop.tsx — P-T1
import {useCurrentFrame, interpolate, Easing} from 'remotion';
export const WordPop: React.FC<{text: string; x: number; y: number; size: number; at: number; until: number}> =
({text, x, y, size, at, until}) => {
  const f = useCurrentFrame();
  if (f < at || f >= until) return null;           // keluar = cut, bukan fade
  const p = interpolate(f, [at, at + 3], [0, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return <div style={{position: 'absolute', left: x, top: y, fontSize: size, color: '#fff',
    fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 0.85,
    opacity: Math.min(1, p * 1.5), transform: `scale(${0.92 + 0.08 * p})`, transformOrigin: 'left bottom'}}>{text}</div>;
};
```
```tsx
// GridCut.tsx — P-X1 (A → B dalam ±6 f)
import {AbsoluteFill, useCurrentFrame, random} from 'remotion';
export const GridCut: React.FC<{A: React.ReactNode; B: React.ReactNode; start: number; cols?: number; rows?: number; dur?: number}> =
({A, B, start, cols = 4, rows = 3, dur = 6}) => {
  const f = useCurrentFrame() - start;
  const tiles = Array.from({length: cols * rows}, (_, i) => {
    const t = Math.floor(random(`gc-${i}`) * dur);   // seed → deterministik
    const state = f < t ? 'A' : f < t + 1 ? 'flash' : 'B';
    return {i, state};
  });
  return <AbsoluteFill>
    <AbsoluteFill>{f >= dur + 1 ? B : A}</AbsoluteFill>
    {f >= 0 && f < dur + 1 && tiles.map(({i, state}) => {
      const c = i % cols, r = Math.floor(i / cols);
      const style = {position: 'absolute' as const, left: `${(c / cols) * 100}%`, top: `${(r / rows) * 100}%`,
        width: `${100 / cols}%`, height: `${100 / rows}%`, overflow: 'hidden'};
      if (state === 'flash') return <div key={i} style={{...style, background: '#fff'}} />;
      if (state === 'B') return <div key={i} style={style}>
        <div style={{position: 'absolute', width: `${cols * 100}%`, height: `${rows * 100}%`,
          left: `${-c * 100}%`, top: `${-r * 100}%`}}>{B}</div></div>;
      return null;
    })}
  </AbsoluteFill>;
};
```
Orbit build (P-T2): simpan posisi tiap kata di `script.json` (`{word, t, x, y, size}`) — posisi ditentukan per kalimat dari peta ruang kosong frame, bukan acak.

---

## 11. Benturan dengan aturan tetap Irfan + rekomendasi
| Referensi melakukan | Aturanmu | Opsi |
|---|---|---|
| Orbit build menaruh kata di **kiri-atas** ("lo") | Tidak ada teks top-left; urutan baca ikut arah kamera | **A (disarankan):** orbit dimulai di tengah-kiri setinggi mata, bergerak searah jarum jam ke kanan-bawah → urutan baca tetap kiri→kanan, atas→bawah tanpa zona top-left. B: orbit hanya 2 zona (kiri & kanan kepala). |
| Teks di atas visual (kata di atas kepala/panel) | Teks tidak di atas visual | Pakai kiri/kanan objek atau bawah; P-T6 sudah di bawah panel ✔ |
| Subjek cutout keluar dari pita abu | Tidak ada cutout bicara di latar hitam kosong | Aman — cutout di sini adalah B-roll di title card terang, bukan talking head. Jangan pakai untuk A-roll. |
| Kata bertahan hanya selama diucapkan | Teks bertahan sampai VO menyelesaikannya, tanpa flicker | Untuk subtitle berjalan pakai Orbit build/accumulate; P-T1 hanya untuk kata tunggal yang memang selesai diucapkan. |

---

## 12. QC checklist (ukur, jangan kira-kira)
- [ ] Median panjang shot 2–3 dtk; ada perubahan visual/teks minimal tiap 0,5 dtk.
- [ ] Rasio kata hero : pengantar ≥ 5 : 1 di setiap Stack pair.
- [ ] Tidak ada teks berwarna, berbox, berbayang.
- [ ] Grid Cut ≤ 7 f, tile deterministik (seed), tidak ada frame kosong.
- [ ] Panel UI yang dibahas ≥ 60 % frame.
- [ ] Teks tidak menutupi wajah; tidak ada teks di kiri-atas.
- [ ] Bed musik kontinu; −14 LUFS master / ≤ −1 dBTP (referensi −17,4, naikkan untuk IG).
