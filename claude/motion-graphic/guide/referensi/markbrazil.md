# 16 markbrazil · "Noir Stage Podcast": guideline editing

> Dibedah Claude 9 Nov dari video kiriman Irfan (contact sheet di `sheets/`, scene detect ffmpeg, ebur128, spektrogram + onset librosa). Data referensi, bukan aturan: kalah dari `../../SKILL.md` dan `guide/` bila bertentangan; bagian "Benturan" berisi usulan yang belum disetujui.
> Sumber: `markbrazil_DfXWojqtOb8.mp4` · 720×1280 (9:16) · 30 fps · 23,1 dtk · potongan podcast (Gary Vaynerchuk) dengan "panggung" wide shot + close-up.
> Status: guideline editing (tata bahasa), **bukan template**. Lihat §11 untuk benturan dengan aturan tetap Irfan.

---

## 0. DNA dalam satu kalimat
**Panggung gelap sinematik (dua siluet di meja dengan lantai bercahaya) sebagai "rumah", tempat kata-kata vonis menyala merah neon serif italic di belakang para pembicara; close-up bicara dengan caption putih kecil dan lower third yang ter-decode.**

Cocok untuk: klip podcast/talk dengan klaim tajam, konten opini bisnis, "hot take".
Tidak cocok untuk: tutorial, konten hangat/ceria, explainer data.

---

## 1. Kanvas
| Item | Nilai |
|---|---|
| Rasio | 9:16, master 1080×1920, 30 fps |
| Latar | footage selalu penuh layar; tidak ada kartu |
| Safe area | teks utama di 25–60 % tinggi; caption close-up di ±62–66 % tinggi |

---

## 2. Struktur & ritme (terukur)
- 6 shot dalam 23 dtk, **median 2,7 dtk, p90 7,4 dtk** (close-up dibiarkan panjang), ±16 cut/menit — paling lambat cut-nya, tapi teks berubah setiap 0,1–0,3 dtk.
- Dua "kamera":
  - **STAGE** (wide, terkunci, ±45 % waktu): dua siluet di kursi tinggi, meja hitam, lantai memantulkan cahaya putih-dingin, latar gradien abu→hitam. Posisi panggung identik setiap kali kembali (lantai di y ±64 % tinggi). Tempat semua **kata vonis besar**.
  - **CLOSE-UP** (medium CU pembicara, low-key, ±55 % waktu): tempat narasi + lower third.
- Pola: CU menjelaskan → cut ke STAGE di kata klaim/angka → kembali CU. Angka dan list ("If you're not Streaming / Vlogging / Podcasting / Live selling") selalu di STAGE.
- Hook frame 0: **flash merah penuh** di atas STAGE, meluruh dalam ±4 f.

---

## 3. Warna & grade
| Token | Hex | Pakai |
|---|---|---|
| `red-core` | `#EC0002` | huruf kata vonis |
| `red-glow` | `#6E1A1C` → transparan | halo/bloom di sekitar huruf merah |
| `text` | `#FFFFFF` | caption, kata sambung, ikon garis |
| `bg-deep` | `#020508` | lantai bawah/vignette |
| `bg-mid` | `#19191A` | latar tengah panggung |
| Grade | hampir monokrom dingin, hitam pekat, highlight putih-biru di lantai, kulit didesaturasi | — |

Merah adalah **satu-satunya warna** dan hanya untuk kata yang ditekankan.

---

## 4. Tipografi
| Peran | Font (padanan) | Ukuran (% tinggi frame) | Catatan |
|---|---|---|---|
| Kata vonis (STAGE) | serif kontras tinggi **bold italic** — Playfair Display Black Italic / Recoleta Bold Italic | 5–7 % (angka "1000" ±7 %) | lowercase/sentence case, tracking −2 %, glow merah |
| Kata sambung (STAGE) | Inter Semibold | 1,5–2 % | putih, **menempel** di atas atau bawah kata merah ("If you're not" di atas; "five" di bawah; "that's" di kanan atas) |
| Caption (CU) | Inter Semibold | 2,2–2,5 % | sentence case, putih, rata tengah, 1 baris |
| Lower third | IBM Plex Mono / JetBrains Mono | nama 2 %, jabatan 1,3 % | nama KAPITAL; jabatan 2 baris; batang merah vertikal di kiri |

Kontras keluarga: serif italic emosional (vonis) vs sans netral (narasi) vs mono teknis (identitas).

---

## 5. Animasi teks (@30 fps)
| Kode | Nama | Spesifikasi |
|---|---|---|
| M-T1 | **Ignite word** (signature) | per kata merah: muncul di opasitas ±30 % merah gelap (2–3 f) → menyala penuh + bloom dalam 2–3 f. Kata berikutnya menyala berikutnya ("going" → "crazy"), stagger = onset VO |
| M-T2 | **Counter rush** | angka bergulir cepat 182→545→909→**1000** dalam ±12 f (ease-out), serif merah, kata sambung putih muncul kata demi kata di bawahnya |
| M-T3 | **Dot meter** | matriks titik putih kecil (±40×12) muncul baris demi baris bersamaan dengan counter, seperti meteran visual dari jumlah |
| M-T4 | **Soft word build** (CU caption) | kata muncul berurutan, tiap kata fade-in dari 0→100 % dalam 3–4 f dengan sedikit blur→tajam; kalimat menumpuk sampai selesai, lalu diganti |
| M-T5 | **Decode lower third** | batang merah tumbuh vertikal (scaleY 0→1, 3 f) → teks mono muncul sebagai karakter acak lalu terkunci kiri→kanan dalam ±8 f ("GARY Xcapgtejwm" → "GARY VAYNERCHUK") |
| M-T6 | **List swap** | dalam STAGE, ikon garis putih di atas berganti + kata merah berganti (Streaming → Vlogging → Podcasting → Live selling), kata sambung "If you're not" tetap; tiap item ±0,7 dtk; kata lama redup→hilang 3 f, baru ignite (M-T1) |
| M-T7 | **Censor bleep** | kata kasar disensor dengan asterisk di layar ("f**ked up.") + bunyi bleep sinus pada audio |

Kata merah **ditempatkan di belakang siluet** (silhouette di depan teks) → kedalaman 2.5D gratis.

---

## 6. Komposisi
- STAGE: kata merah di garis kepala siluet (±30–35 % tinggi), lebar sampai ±85 % frame; ikon di atasnya (±25 %), kata sambung putih kecil menempel pada kata merah.
- CU: kepala di atas, **lower third di kiri ±55 %**, caption di bawahnya ±63 %. Caption tidak pernah menutupi wajah.
- Dot meter di area kosong atas panggung (dekoratif-informatif).

---

## 7. Kamera & transisi
| Kode | Transisi | Spesifikasi |
|---|---|---|
| M-X1 | **Red flash** | overlay merah penuh opasitas 90 % → 0 dalam 4 f (hook / pembuka) |
| M-X2 | Hard cut CU ↔ STAGE | di onset kata vonis (cut tepat sebelum kata merah menyala) |
| M-X3 | Motion cut | cut saat tangan pembicara bergerak cepat (gerak menyembunyikan cut) |

STAGE terkunci (posisi lantai bervariasi ≤ 1 %); CU statis atau handheld sangat halus. Energi datang dari teks, bukan kamera.

---

## 8. Elemen grafis
- **Ikon garis putih** (line icon, stroke ±3 px @1080, sedikit glow putih) per item list: streaming, vlog, podcast, live shopping.
- **Lower third**: batang merah 4 px × tinggi blok, jarak 16 px ke teks mono. Muncul sekali per pembicara/segmen, judul sekunder bisa berganti ("OPEN RESIDENCY / Full conversation on YouTube").
- **Dot matrix** titik putih 3 px, jarak 10 px.

---

## 9. Audio (terukur)
- −17,5 LUFS integrated, **LRA 1,7 LU** (sangat padat, gaya podcast-clip).
- Bed musik/drone gelap kontinu di bawah VO (spektrogram tidak pernah kosong) kecuali **satu drop ±0,2 dtk** di ±11,3 dtk berisi **bleep sinus** (sensor) — ini juga berfungsi sebagai kantong senyap sebelum punchline.
- **Onset tertinggi dari 4 referensi: ±2,35/dtk**, dan **5 dari 6 cut punya transien dalam ±100 ms** → setiap cut ke STAGE diberi hit/whoosh pendek; setiap ignite word punya aksen kecil.
- Centroid median ±1,6 kHz → mix gelap-hangat, cocok dengan visual noir.

Untuk proyek kita: hit di cut ke STAGE = satu impact rendah konsisten (20–250 Hz) + transien tipis; ignite = satu "ember/flare" lembut 500 Hz–2 kHz (SFX asli, bukan sintesis); counter = satu tick-roll dengan lock di angka akhir.

---

## 10. Implementasi Remotion
```tsx
// tokens.gl03.ts (master 1080×1920)
export const GL03 = {
  fps: 30,
  red: '#EC0002', redGlow: 'rgba(236,0,2,0.55)', white: '#FFFFFF',
  font: {verdict: '"Playfair Display", serif', sans: 'Inter, sans-serif', mono: '"JetBrains Mono", monospace'},
  size: {verdict: 0.06, number: 0.07, connector: 0.018, caption: 0.024, ltName: 0.02, ltRole: 0.013}, // × 1920
};
```
```tsx
// IgniteWord.tsx — M-T1
import {useCurrentFrame, interpolate} from 'remotion';
import {GL03} from './tokens.gl03';
export const IgniteWord: React.FC<{text: string; at: number}> = ({text, at}) => {
  const f = useCurrentFrame() - at;
  if (f < 0) return null;
  const o = interpolate(f, [0, 2, 5], [0.3, 0.35, 1], {extrapolateRight: 'clamp'});
  const glow = interpolate(f, [2, 5, 9], [0, 1.3, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <span style={{fontFamily: GL03.font.verdict, fontStyle: 'italic', fontWeight: 900, color: GL03.red,
    opacity: o, letterSpacing: '-0.02em', marginRight: '0.22em',
    textShadow: `0 0 ${18 * glow}px ${GL03.redGlow}, 0 0 ${48 * glow}px ${GL03.redGlow}`}}>{text}</span>;
};
```
```tsx
// DecodeText.tsx — M-T5
import {useCurrentFrame, random} from 'remotion';
const CH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
export const DecodeText: React.FC<{text: string; at: number; dur?: number}> = ({text, at, dur = 8}) => {
  const f = useCurrentFrame() - at;
  if (f < 0) return null;
  const locked = Math.floor((f / dur) * text.length);
  return <>{text.split('').map((c, i) => c === ' ' || i < locked ? c
    : CH[Math.floor(random(`${text}-${i}-${f}`) * CH.length)]).join('')}</>;
};
```
Siluet di depan teks: render STAGE dua kali — layer bawah plate penuh, layer atas **matte siluet** (PNG/ProRes alpha hasil segmentasi sekali) di atas teks merah. Layer order: `stagePlate → verdictText → silhouetteMatte → connector/icon`.

---

## 11. Benturan dengan aturan tetap Irfan + rekomendasi
| Referensi melakukan | Aturanmu | Opsi |
|---|---|---|
| Serif **Black** italic tebal | Font layar bersih & ramping | **A (disarankan):** serif italic weight 500–600 (Instrument Serif Italic / Playfair Italic 500) dengan ukuran sedikit lebih besar — emosi serif tetap, tanpa berat. B: pertahankan Black hanya untuk angka hero (maks 1× per video). |
| Merah untuk **semua** kata vonis termasuk netral ("going crazy", "Streaming") | Merah = negatif/penekanan yang terdengar buruk; warna harus punya alasan | **A:** merah hanya untuk kata negatif/peringatan; kata solusi/alternatif biru (sesuai aturan warnamu) — tapi **jangan biru di latar gelap**, jadi kata solusi pakai putih + glow netral. B: satu warna merah tetap sebagai brand (melanggar logika warnamu — tidak disarankan). |
| Kata sambung di **atas** kata merah ("If you're not") | Teks tidak di atas visual; urutan baca ikut kamera | Kata sambung boleh di atas kata merah karena keduanya teks (bukan di atas visual) dan urutan bacanya benar (sambung → vonis). Ikon di atas teks: pindahkan ikon ke **kiri kata merah** sebagai inline icon. |
| Tanda baca & asterisk di layar ("f**ked up.") | Tanpa tanda baca di layar | Hilangkan titik; untuk kata kasar ganti katanya di layar atau pakai bleep audio saja. |
| Flash merah penuh di frame 0 | Invert/flash hanya untuk transisi/emphasis, tidak ditabur | Boleh 1× sebagai hook, dengan SFX klik kamera tajam yang konsisten; jangan diulang. |

---

## 12. QC checklist
- [ ] STAGE identik setiap kembali (selisih posisi lantai ≤ 1 %).
- [ ] Kata merah selalu di belakang siluet; tidak ada huruf yang menutupi kepala siluet.
- [ ] Ignite ≤ 6 f per kata; tidak ada dua kata menyala bersamaan kecuali frasa sudah lengkap.
- [ ] Lower third decode selesai ≤ 10 f dan muncul sekali per segmen.
- [ ] Setiap cut ke STAGE punya hit audio dalam ±2 f.
- [ ] Bed musik kontinu; drop senyap hanya di 1 punchline (≤ 0,4 dtk).
- [ ] Uji HP 360 px: kata sambung putih 1,8 % masih terbaca (naikkan ke 2,2 % jika tidak).
- [ ] Kontras merah `#EC0002` vs latar `#19191A` = 3,8 : 1 → hanya lolos untuk teks besar (≥ 5 % tinggi); jangan pakai merah untuk teks kecil.
