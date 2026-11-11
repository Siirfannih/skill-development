# 15 jefferson_fisher · "Card Caption Clean": guideline editing

> Dibedah Claude 9 Nov dari video kiriman Irfan (contact sheet di `sheets/`, scene detect ffmpeg, ebur128, spektrogram + onset librosa). Standar kualitas Irfan; kartu anatominya di `../../pustaka/kartu/`. Bila bertentangan dengan `../../LANTAI.md`, lantai menang; bagian "Benturan" berisi usulan yang belum disetujui.
> Sumber: `jefferson_fisher_DfA5xGzxFRy.mp4` · 720×1280 (9:16) · 30 fps · 41,2 dtk · percakapan duduk (podcast/interview) + stock B-roll.
> Status: guideline editing (tata bahasa), **bukan template**. Lihat §11 untuk benturan dengan aturan tetap Irfan.

---

## 0. DNA dalam satu kalimat
**Footage diletakkan sebagai kartu rounded di tengah layar hitam, dengan caption kapital satu-dua kata yang "terisi cahaya" mengikuti suara — tenang, premium, fokus penuh pada kata-kata pembicara.**

Cocok untuk: konten nasihat/komunikasi, potongan podcast, quote dari talk, konten kepercayaan (authority).
Tidak cocok untuk: konten energi tinggi, tutorial UI, explainer grafis.

---

## 1. Kanvas
| Item | Nilai referensi (720×1280) | Skala master 1080×1920 |
|---|---|---|
| Latar | hitam murni `#000000` | sama |
| Kartu footage | x 13–705, y 380–973 → **692×594 (≈ 7:6)** | ±1040×890, margin kiri/kanan ±20 px |
| Pusat kartu | y = 53 % tinggi frame (sedikit di bawah tengah) | y ≈ 1015 |
| Radius sudut | ±3 % lebar kartu | ±30 px |
| Area hitam | atas ±30 %, bawah ±24 % | dibiarkan kosong — **jangan diisi teks/judul** |

Footage di dalam kartu di-crop (cover), bukan di-fit. Kartu tidak pernah bergerak; yang berganti hanya isinya.

---

## 2. Struktur & ritme (terukur)
- **Shot median 2,95 dtk**, p90 4,6 dtk, ±20 cut/menit.
- Alur:
  1. **Cold open** langsung kalimat pertama (tanpa judul, tanpa logo).
  2. Pembicara medium close-up ↔ **reverse shot lawan bicara** (profil) ↔ insert tangan/ponsel → cut mengikuti siapa yang berbicara/bereaksi.
  3. **Stock B-roll ilustratif** saat cerita ("phone", "friends") — 2–5 dtk per klip, grade sama gelap.
  4. **End card**: hitam penuh, CTA kapital 2 baris di tengah ("FOLLOW FOR MORE / COMMUNICATION ADVICE") ±3 dtk, tanpa animasi besar.
- Tidak ada punch-in digital; variasi datang dari multicam (2 sudut pembicara + 1 lawan bicara) dan insert.

---

## 3. Warna & grade
| Token | Hex | Pakai |
|---|---|---|
| `bg` | `#000000` | latar layar |
| `caption-on` | `#FFFFFF` | kata yang sudah/sedang diucapkan |
| `caption-pre` | putih 55 % opasitas + tint dingin (≈ `#BFD3D6` @ 70 %) | kata sebelum terisi |
| Grade | low-key, kontras sedang, saturasi turun ±15 %, kulit hangat netral, latar abu-hitam | — |

Hampir monokrom. Satu-satunya "warna" adalah kulit dan B-roll.

---

## 4. Tipografi
| Peran | Font (padanan) | Ukuran | Catatan |
|---|---|---|---|
| Caption | SF Pro Display Bold / Inter Bold | cap-height ≈ 2,8 % tinggi frame (±54 px di 1920) | **KAPITAL**, tracking −1 %, rata tengah |
| End card | sama | ≈ 2,8 % | 2 baris, leading 1,05 |

- Maksimal **2 baris** (contoh: "DO YOU FEEL / A DIFFERENCE?"), lebar maksimal ±70 % lebar kartu.
- Tidak ada stroke/box. Ada **soft shadow sangat halus** (blur besar, opasitas rendah) supaya terbaca di atas baju gelap/latar terang.

---

## 5. Animasi teks (@30 fps)
| Kode | Nama | Spesifikasi |
|---|---|---|
| J-T1 | **Light-fill reveal** (signature) | kata muncul langsung di posisinya dalam status `caption-pre` (redup, tint dingin) lalu **sapuan cahaya kiri→kanan** mengubahnya jadi putih solid dalam 3–6 f, mengikuti suku kata (contoh "TALK" putih, "ING" masih redup di frame yang sama). Tepi sapuan lembut (gradien ±15 % lebar kata) |
| J-T2 | **Accumulate** | frasa dibangun kata demi kata di baris yang sama ("DO" → "DO YOU" → "DO YOU FEEL"), turun ke baris 2 bila perlu; seluruh frasa diganti sekaligus (cut 0 f) di awal frasa berikutnya atau di cut |
| J-T3 | **Single word** | saat bicara cepat, hanya 1 kata per kali ("LIKE" → "THIS" → "TO" → "YOU"), ganti tiap ±4–8 f |

- Onset kata = onset suku kata VO (+0…+2 f). Sapuan selesai sebelum kata berikutnya muncul.
- Tidak ada scale, bounce, rotasi. **Satu-satunya gerak adalah cahaya.** Itu yang membuatnya terasa mahal.
- Caption ikut pindah ke shot berikutnya tanpa reset posisi (posisi tetap).

---

## 6. Komposisi
- Posisi caption **tetap**: tengah horizontal, ±50–55 % tinggi kartu (sekitar dada/dagu pembicara medium close-up).
- Framing pembicara: mata di sepertiga atas kartu, headroom kecil, tubuh terpotong di dada → caption jatuh di area baju gelap (kontras alami).
- Reverse shot lawan bicara: profil, kiri/kanan kartu, ruang kosong ke arah pandangannya.
- B-roll: subjek di tengah (ponsel di tengah, pasangan di tengah) supaya caption jatuh di objek yang dibicarakan.

---

## 7. Transisi
| Kode | Transisi | Spesifikasi |
|---|---|---|
| J-X1 | Hard cut | 100 % transisi. Cut di akhir frasa atau di kata pertama frasa berikutnya |
| J-X2 | Cut ke end card | kartu hilang (cut), hitam penuh, CTA langsung tampil |

Tidak ada whoosh visual, tidak ada zoom. Kesederhanaan adalah identitasnya.

---

## 8. Elemen grafis
Tidak ada: lower third, logo, progress bar, ikon. Hanya kartu + caption + end card.

---

## 9. Audio (terukur)
- −17,8 LUFS integrated, **LRA 5,3 LU** (paling dinamis dari 4 referensi).
- **Tanpa musik latar**: spektrogram menunjukkan jeda benar-benar senyap di antara frasa. Hanya dialog bersih (room tone diredam).
- Onset ±1,2/dtk = konsonan bicara; **tidak ada SFX**.
- Centroid median ±1,7 kHz → suara hangat, dekat (close-mic).

---

## 10. Implementasi Remotion
```tsx
// tokens.gl02.ts (master 1080×1920)
export const GL02 = {
  fps: 30, bg: '#000000',
  card: {x: 20, y: 570, w: 1040, h: 890, radius: 30},
  caption: {font: '"SF Pro Display", Inter, sans-serif', weight: 700, size: 76, // cap ≈ 54 px
            track: '-0.01em', yInCard: 0.52, maxW: 0.7, on: '#FFFFFF', pre: 'rgba(205,222,225,0.55)'},
};
```
```tsx
// Card.tsx
import {AbsoluteFill, OffthreadVideo} from 'remotion';
import {GL02} from './tokens.gl02';
export const Card: React.FC<{src: string; startFrom?: number}> = ({src, startFrom}) => (
  <AbsoluteFill style={{background: GL02.bg}}>
    <div style={{position: 'absolute', left: GL02.card.x, top: GL02.card.y, width: GL02.card.w,
      height: GL02.card.h, borderRadius: GL02.card.radius, overflow: 'hidden'}}>
      <OffthreadVideo src={src} startFrom={startFrom} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    </div>
  </AbsoluteFill>
);
```
```tsx
// LightFillWord.tsx — J-T1 (start = onset kata, dur = durasi suku kata, 3–6 f)
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {GL02} from './tokens.gl02';
export const LightFillWord: React.FC<{text: string; start: number; dur: number}> = ({text, start, dur}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [start, start + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad)});
  const edge = p * 130 - 15; // % posisi sapuan, tepi lembut 15 %
  return <span style={{
    backgroundImage: `linear-gradient(90deg, ${GL02.caption.on} ${edge}%, ${GL02.caption.pre} ${edge + 15}%)`,
    WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
    textShadow: 'none', filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.35))', marginRight: '0.25em'}}>{text}</span>;
};
```
Caption container: `position:absolute; left:50%; top: card.y + card.h*0.52; transform: translate(-50%,-50%); max-width: card.w*0.7; text-align:center; text-transform: uppercase`. Data kata dari transkrip ber-timestamp (Whisper/ElevenLabs STT) → `words.json`.

---

## 11. Benturan dengan aturan tetap Irfan + rekomendasi
| Referensi melakukan | Aturanmu | Opsi |
|---|---|---|
| Caption **bold kapital** | Font layar bersih & ramping, bukan weight berat | **A (disarankan):** Inter/SF Pro **Semibold 600**, tetap kapital, tracking +1 % — mempertahankan rasa "label" tanpa berat. B: sentence case Medium 500 (lebih lembut, kehilangan ketegasan). |
| Tanda baca di layar ("A DIFFERENCE?") | Teks layar tanpa tanda baca | Buang "?" — intonasi tanya sudah dibawa VO. |
| Caption 2 baris | Satu baris per kalimat | Pecah frasa jadi segmen ≤ 3 kata satu baris (J-T2 tanpa turun baris). |
| Tanpa musik, jeda senyap | Backsound tanpa jeda senyap mendadak; satu palet akustik | **A:** bed ambient sangat tipis (−28…−32 dB di bawah VO) supaya tidak ada lubang senyap, tetap terasa "bersih". B: tanpa musik bila konten murni percakapan nyata — sebutkan sebagai pengecualian sadar. |
| Footage pembicara pria | VO narator perempuan | Berlaku untuk VO narasi buatan; footage interview asli tidak terpengaruh. |

---

## 12. QC checklist
- [ ] Kartu: posisi/ukuran/radius identik di setiap frame (cek 3 still).
- [ ] Caption tidak pernah keluar dari ±70 % lebar kartu; tidak ada caption di area hitam.
- [ ] Onset kata +0…+2 f dari suku kata (cek 5 kata acak dengan waveform).
- [ ] Sapuan selesai sebelum kata berikutnya; tidak ada dua kata dalam status "pre" sekaligus kecuali saat accumulate.
- [ ] 100 % hard cut; end card ≤ 3 dtk.
- [ ] Uji HP 360 px: caption terbaca di semua shot (kontras ≥ 4,5 : 1, tambah drop-shadow halus jika latar terang).
