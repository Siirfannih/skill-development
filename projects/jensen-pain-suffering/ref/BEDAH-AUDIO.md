# Bedah audio ref 55 (Refference02cinematic-story.mp4) — 15 Nov

Alat: demucs htdemucs (stem vocals / no_vocals) → `earshot timeline --detail high` pada stem no_vocals (`timeline_novocals.txt`) + ebur128 per 6 dtk.

## Backsound: dinamis mengikuti cerita, bukan bed rata
| Babak (dtk) | Musik (earshot stem) | VO LUFS | Musik+SFX LUFS | Jarak |
|---|---|---|---|---|
| 0–6 tesis + bukti | string quartet pizzicato, stab orkestra | −16,1 | −21,4 | −5 dB |
| 8–14 jawaban | inspirational, pizzicato, riser | −15,4 | −23,3 | −8 dB |
| 16–22 belok ke diri | sama, tipis | −14,9 | −29,8 | −15 dB |
| 24–30 kredensial | sama, tipis | −17,6 | −31,3 | −14 dB |
| 32–38 twist | ganti: jazz/glitch hop, naik | −14,6 | −16,5 | −2 dB |
| 40–46 janji + sub drop | glitch hop | −17,1 | −16,3 | +1 dB |

Pelajaran: musik keras di pembuka (hook), mundur jauh saat cerita personal/penjelasan, lalu naik hampir setara suara di twist/puncak. Ganti musik = ganti babak. Ekor sunyi 1,5 dtk di akhir.
Catatan: ini bertentangan dengan `guide/audio` "sebaran RMS bed per 3 dtk ≤ 4 dB" — untuk proyek ini kiblat menang (ditulis di RESEP).

## SFX: jarang, hanya di momen; musik yang membawa "event"
Dari 199 onset stem musik, 73 adalah not/stab musik itu sendiri. SFX berlabel yang benar-benar SFX:
- 0,0 stab orkestra (hantaman pembuka, frame 0)
- 10,2 · 13,7 riser menuju jawaban
- 13,9 whoosh (transisi ke babak lambat)
- 20,4 shutter kamera (kilatan cahaya 1 frame)
- 31,9–32,8 pop (foto/teks muncul di twist)
- 33,9 whoosh besar (gerak fisheye)
- 38,2–38,9 snare ×3 + glitch (judul bab)
- 43,8 sub drop (punchline "grilled cheese")
≈ 10–14 momen SFX dalam 46 dtk. Angka kartu "±0,65/dtk" termasuk not musik yang ditandai UI/pop; SFX momen nyata ≈ 0,25–0,3/dtk.
Hard cut sebagian besar TANPA SFX (78 % cut jatuh di onset musik/suku kata, bukan bunyi tambahan).
