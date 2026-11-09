# 17 _ganimate_ · "Editorial Explainer System": guideline editing

> Dibedah Claude 9 Nov dari video kiriman Irfan (contact sheet di `sheets/`, scene detect ffmpeg, ebur128, spektrogram + onset librosa). Data referensi, bukan aturan: kalah dari `../../SKILL.md` dan `guide/` bila bertentangan; bagian "Benturan" berisi usulan yang belum disetujui.
> Sumber: `_ganimate__DfICqhOvP-0.mp4` · 1280×720 (16:9) · 23,98 fps · 14,4 dtk · **showreel 2×2**: empat proyek motion explainer diputar bersamaan, panel bergantian isi.
> Karena ini showreel studio, guideline ini merangkum **sistem bersama** + **4 mode** yang bisa dipilih per babak. Status: tata bahasa, **bukan template**. Lihat §11.

---

## 0. DNA dalam satu kalimat
**Explainer gaya editorial-tech: tipografi grotesk bersih, objek nyata (UI asli, logo asli, arsip, ikon isometrik) yang dihidupkan satu per satu mengikuti VO, dengan label berwarna sebagai satu-satunya aksen.**

Cocok untuk: explainer AI/teknologi/bisnis, brand story, data story, launch produk (sangat dekat dengan kebutuhan Jadisatu).

---

## 1. Kanvas
| Item | Nilai |
|---|---|
| Rasio master | 16:9 1920×1080 (tiap panel showreel adalah 16:9 penuh); turunan 9:16 dengan menata ulang, bukan crop |
| fps | referensi 23,98; kita 30 |
| Safe area | 6 % tepi; teks utama di sepertiga tengah |

---

## 2. Struktur & ritme
- Mosaik: ±46 perubahan panel/menit (median 1,2 dtk) — per proyek individual kira-kira **1,5–2,5 dtk per beat**.
- Setiap beat = **1 objek + ≤ 4 kata**. Objek muncul tepat di kata VO yang menyebutnya.
- Pola babak: pembuka sinematik (arsip/stock, kata putih kecil) → masalah/konsep (tipografi besar di hitam/putih) → mekanisme (UI asli / diagram) → data (peta, chart) → klaim penutup.

---

## 3. Warna (sistem bersama: netral + 1 aksen per mode)
| Token | Hex | Pakai |
|---|---|---|
| `ink` | `#000000` | latar tipografi gelap |
| `navy-grid` | `#010915` | latar diagram isometrik/peta |
| `grid-line` | `#183B48` | garis grid tipis 1 px |
| `paper` | `#FFFFFF` | latar editorial/chart |
| `teal` | `#0099AB` | label tag, sel peta, bangunan |
| `teal-light` | `#8BC9D1` / `#E3F9FC` | sisi terang isometrik |
| `coral` | `#ED605A` | 1 kata aksen di judul ("tools") |
| `yellow` | ≈ `#F3D34A` | sorotan/bar data utama (di latar putih) |
| `ai-blue` | gradien biru lembut | glow "AI berpikir" di UI |

Satu mode = satu aksen. Teal tidak bercampur kuning dalam satu frame kecuali chart.

---

## 4. Tipografi
| Peran | Font (padanan) | Ukuran (% tinggi) | Catatan |
|---|---|---|---|
| Judul | Aeonik / Inter Display Medium 500 | 9–12 % | sentence case, tracking −3 %, dua baris rata kiri |
| Kata narasi | sama, Regular/Medium | 3–4 % | putih di gelap, hitam di putih, rata tengah |
| Kata hero editorial | sama, Medium | 10–12 % | "Which AI **Source**" |
| Label tag | Inter Regular | 3–3,5 % | putih di kotak teal, padding 0,3 em, tanpa radius |
| Data/UI | font UI asli produk | sesuai UI | — |

Weight maksimal Medium. Ringan, editorial, mahal.

---

## 5. Animasi teks & objek (@30 fps)
| Kode | Nama | Spesifikasi |
|---|---|---|
| G-T1 | **Inline logo sentence** | kalimat judul memuat logo asli sebagai kata ("AI ✦ ⌀ ◎ ⛵ tools"): logo pop satu per satu 0→110→100 % dalam 6 f, stagger 3 f; kata aksen coral muncul terakhir |
| G-T2 | **Word step** | kata narasi ganti di tempat setiap kata VO (cut 0 f atau slide-up 6 px 3 f); kadang dua kata mengapit objek ("Everything [TV] around you") |
| G-T3 | **Highlight wipe** | kotak warna tumbuh kiri→kanan di belakang 1 kata hero dalam 5–6 f |
| G-T4 | **Tag attach** | label teal muncul menempel pojok kanan-atas objek, wipe kiri→kanan 4 f, tepat saat VO menyebut objek |
| G-T5 | **Type-in UI** | teks diketik di kolom chat asli, cursor I-beam nyata, karakter 1–2/f, tombol kirim aktif di akhir |
| G-T6 | **Giant letter flash** | satu kata narasi tiba-tiba digambar raksasa memenuhi tinggi frame 2–3 f lalu kembali ke ukuran normal ("no") — penekanan ritmis |

---

## 6. Empat mode visual (pilih per babak, jangan campur dalam satu shot)
| Mode | Latar | Isi | Kamera |
|---|---|---|---|
| **A. Cinematic archive** | footage penuh (arsip, stock: TV tua, roket, bumi, dandelion) | 1–2 kata putih kecil di tengah atau mengapit objek | cut cepat 0,4–1 dtk, cocok untuk montase pembuka "Life / By People" |
| **B. Real UI** | wallpaper alam macOS / putih-abu lembut | dock & ikon app asli (WhatsApp, Notion, Meet, Drive, Calendar), kolom chat AI, cursor, glow biru | zoom ke dock/kolom input 1,0→1,4× ease-out 12 f |
| **C. Editorial paper** | putih + garis registrasi tipis (crosshair di pojok/tepi) | kata hero + highlight kuning, pixel chart teal, bar chart dengan bar utama kuning, label kecil | statis atau slide horizontal |
| **D. Isometric data** | navy + grid 1 px | ikon bangunan isometrik (2-tone teal), label tag, peta piksel teal | **truck diagonal kontinu** mengikuti sumbu isometrik; objek baru masuk dari tepi saat disebut (Schools → Universities → Hotels → dealerships → Commercial properties) |

---

## 7. Kamera & transisi
| Kode | Transisi | Spesifikasi |
|---|---|---|
| G-X1 | Cut on word | default; cut di onset kata |
| G-X2 | Isometric truck | kamera bergeser konstan ±2–4 % lebar/dtk sepanjang sumbu 30°; item lama keluar frame, baru masuk — transisi tanpa cut |
| G-X3 | Zoom-to-UI | dari wide wallpaper ke kolom/dock, 12–16 f, mendarat ease-out kuat |
| G-X4 | Glow bloom | lingkaran blur biru membesar dari kolom input ("AI menjawab") 8–10 f lalu meluruh |
| G-X5 | Light burst | silau putih-krem mengembang ke frame (arsip/energi) sebagai jembatan ke babak data |

---

## 8. Elemen grafis
- **Isometrik**: sudut 30°, dua nada (atap terang `#E3F9FC`, dinding teal), jendela grid, tanpa outline hitam.
- **Peta piksel**: sel persegi teal dengan variasi opasitas; muncul sel demi sel (stagger acak 1 f).
- **Chart**: bar tipis, satu bar kuning (subjek), sisanya abu terang; label angka kecil di atas bar; label hitam pekat sebagai judul chart.
- **Garis registrasi**: garis 1 px abu + titik kotak kecil di simpul, memberi rasa "blueprint/editorial".
- **UI**: selalu UI dan logo asli produk (sesuai aturanmu), bukan generik.

---

## 9. Audio (terukur)
- −17,2 LUFS integrated, LRA 1,9 LU.
- Bed musik kontinu (elektronik halus), berganti tekstur/bass di ±11 dtk (masuk babak data) — **satu titik ganti musik per babak**.
- Banyak SFX tonal (whoosh tipis, sweep, pop) terlihat sebagai kurva di spektrogram atas; centroid median ±1,3 kHz → hangat, tidak menusuk.
- Onset ±1,2/dtk; hanya sebagian cut ber-transien (showreel memutar audio satu proyek) — jangan jadikan acuan kepadatan SFX.

Untuk proyek kita: tag attach = satu pop kecil konsisten; zoom-to-UI = whoosh tipis mid; type-in = klik keyboard per kata; glow bloom = swell lembut; truck isometrik = tanpa SFX kontinu, hanya pop per objek baru.

---

## 10. Implementasi Remotion
```tsx
// tokens.gl04.ts
export const GL04 = {
  fps: 30,
  color: {ink: '#000000', navy: '#010915', grid: '#183B48', paper: '#FFFFFF',
          teal: '#0099AB', tealLight: '#E3F9FC', coral: '#ED605A', yellow: '#F3D34A'},
  font: {display: 'Aeonik, "Inter Display", Inter, sans-serif', ui: 'Inter, sans-serif'},
  size: {title: 0.105, narr: 0.035, hero: 0.11, tag: 0.032}, // × 1080
};
```
```tsx
// Tag.tsx — G-T4
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {GL04} from './tokens.gl04';
export const Tag: React.FC<{text: string; at: number; x: number; y: number}> = ({text, at, x, y}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic)});
  if (p === 0) return null;
  return <div style={{position: 'absolute', left: x, top: y, background: GL04.color.teal, color: '#fff',
    fontFamily: GL04.font.ui, fontSize: 1080 * GL04.size.tag, padding: '0.15em 0.3em',
    clipPath: `inset(0 ${100 - p * 100}% 0 0)`}}>{text}</div>;
};
```
```tsx
// IsoTruck.tsx — G-X2: semua objek di satu "world", kamera = translate kontinu
import {AbsoluteFill, useCurrentFrame} from 'remotion';
export const IsoTruck: React.FC<{speedPx: number; children: React.ReactNode}> = ({speedPx, children}) => {
  const f = useCurrentFrame();
  const d = f * speedPx;                     // sepanjang sumbu 30°
  const dx = -d * Math.cos(Math.PI / 6), dy = -d * Math.sin(Math.PI / 6);
  return <AbsoluteFill style={{background: '#010915', overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: 0, transform: `translate(${dx}px, ${dy}px)`}}>{children}</div>
  </AbsoluteFill>;
};
```
Objek isometrik: SVG (bisa dianimasikan per bagian, sesuai aturan vektormu), diletakkan di koordinat world; muncul pop 0→1,05→1 (8 f) saat `at` = onset kata.

---

## 11. Benturan dengan aturan tetap Irfan + rekomendasi
| Referensi melakukan | Aturanmu / motion-graphic | Opsi |
|---|---|---|
| Kotak kuning di belakang kata ("Source") — highlight blok | `references/typography.md`: kotak/stabilo hanya bila menyelesaikan keterbacaan | **A (disarankan):** pindahkan aksen ke **isi huruf** (kata hero berwarna, tanpa blok) atau garis bawah tipis yang tumbuh. B: izinkan blok sebagai pengecualian khusus mode C editorial — perlu persetujuanmu dan dicatat di RETRO. |
| Label tag kotak teal di belakang teks | sama (blok di belakang kata) | Tag adalah **label objek diegetik** (callout), bukan highlight kalimat → layak dipakai; jaga tetap kecil dan menempel objek. |
| Teks putih kecil mengapit objek di footage arsip | Teks tengah dulu, lalu visual; teks tidak di atas visual | "Everything [TV] around you" sudah kiri-kanan objek ✔. Pastikan ukuran ≥ 3,5 % untuk uji HP. |
| Teal di latar navy | Jangan biru di latar gelap | Teal `#0099AB` vs navy = 5,85 : 1 (aman sebagai blok), tapi **teks putih di atas teal hanya 3,42 : 1** — kurang untuk teks kecil. **A (disarankan):** gelapkan tag ke `#007C8A` (putih ≈ 4,9 : 1) atau naikkan teks tag ke ≥ 3,5 % tinggi. Tetap jangan pakai teks teal di navy. |
| Weight Medium semua | Font ramping ✔ | Sejalan, pertahankan. |
| Mode D: kamera truck kontinu | Info diam (`references/camera-transition.md`) | Truck boleh karena geraknya *adalah* informasi (daftar bertambah); kecepatan konstan, tanpa gerak lain. |

---

## 12. QC checklist
- [ ] Satu mode per babak; satu aksen warna per frame (kecuali chart).
- [ ] Setiap objek/tag muncul ±2 f dari kata VO yang menyebutnya.
- [ ] Semua logo/UI asli, vektor bersih, tidak blur.
- [ ] Weight teks ≤ Medium; tidak ada teks teal di navy.
- [ ] Truck isometrik: kecepatan konstan, tidak ada objek masuk sebelum disebut.
- [ ] 1 titik ganti musik per babak; SFX pop per objek baru (≥ 85 % event bersuara).
