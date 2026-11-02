# Earshot · bedah audio referensi vs PKS (2 Nov 2026, Irfan 12.57)

Alat: `earshot timeline --detail high`. Hasilnya per event: label, jenis, centroid, prominence di atas bed, dan sinkron terhadap potongan gambar. Ringkasan dibuat dengan `ears/tl_sum.py`, dan profil bersama ada di `ears/refs/profile.json`. Semua file berada di Mac `pks-studio/ears/refs/`.

| Video | Event/dtk | Label teratas | Centroid UI | Prominence (dB di atas bed): UI / whoosh / hit | Potongan tanpa bunyi ±100 ms |
|---|---|---|---|---|---|
| Apple Style | 7,0 | chat message pop 14, sub bass drop 23, notification ding, glockenspiel, plucked string; whoosh hanya 4 | 756 Hz | 15,8 / 11,8 / 13,7 | 1/22 |
| Kinetic typography (ber-VO) | 7,1 | punchy impact 15, sub drop 10, uplifter 4, whip pan 3 | 841 Hz | 10,0 / 8,7 / 5,9 | 2/22 |
| Sound efex | 6,1 | chat message pop 17, whip pan 14, sub drop 12 | 682 Hz | 8,9 / 7,1 / 7,4 | 2/25 |
| Emotion | 4,7 | chat message pop 20, orchestral stab 13, notification ding 9, plucked string 7, camera shutter | 369 Hz | 13,0 / 3,9 / 13,0 | 49/158 |
| The Gap v18 (lulus) | 6,6 | chat message pop 17, sub drop 12, notification ding 9, glockenspiel 5, bubble pop 5 | 451 Hz | 9,2 / 5,3 / 8,6 | 10/82 |
| Video #2 v11 (lulus) | 7,7 | punchy impact 15, sub drop 15, plucked string 9, bubble pop 7 | 617 Hz | 8,2 / 8,8 / 6,7 | 4/54 |
| **PKS v10c** (palet baru) | 6,9 | chat message pop 15, whip pan 6, camera shutter 4, notification ding 4, glockenspiel 4; **spacebar press 6** | 602 Hz | **12,9 / 15,3 / 14,2** | 15/144 |

## Pola yang berlaku di semua referensi bagus
1. **Bunyi bernada pendek.** Pop pesan, ding, glockenspiel, petikan senar dan kalimba mendominasi UI. Centroid sekitar 400–850 Hz: hangat dan renyah, tidak berdesis. Ini sifat "seperti seruling" yang Irfan maksud.
2. **Whoosh jarang.** Apple Style 4×, The Gap 3×, video #2 5×. Whoosh hanya muncul sebagai whip pan saat kamera berpindah. Video yang banyak memakai whoosh (Sound efex, 14×) juga punya banyak potongan whip.
3. **Penekanan memakai sub drop / punchy impact pendek** di potongan besar, bukan whoosh berat.
4. **Hampir semua potongan punya bunyi dalam ±100 ms** (Apple 21/22, video #2 50/54).
5. **SFX di video ber-VO hanya 5–9 dB di atas bed.** SFX yang menonjol lebih dari itu terdengar kasar.

## Yang diubah di PKS v10c → v10c2
- Prominence PKS (UI 12,9 / whoosh 15,3 / hit 14,2) lebih tinggi daripada semua referensi ber-VO, jadi level diturunkan:
  - whoosh −6 dB;
  - hit dan pop −3 dB;
  - klik −1 dB.
- Klik kamera terlambat 58 ms secara konsisten di semua potongan foto (sync `near +58 ms`). Penyebabnya: penyelarasan onset-10 % memakai awal desis file. Sekarang shutter, klik dan kata diselaraskan pada **puncak transien**.
- Klik kata dengan `ipad_click` terdengar sebagai "spacebar press". Irfan meminta suara mouse, jadi diganti `mouse-click-290204`.
