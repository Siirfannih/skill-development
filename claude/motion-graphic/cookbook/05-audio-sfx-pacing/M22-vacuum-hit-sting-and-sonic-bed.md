---
id: "M22"
pola: Vacuum-Before-Hit Sting & Sonic Bed
pack: 05-audio-sfx-pacing
kategori: sfx
kategori_lain: [camera, typography]
trigger: pembuka/penutup merek atau pivot gelap→terang butuh hantaman tunggal mahal sesudah jeda vakum
sumber: gabungan mekanik sting vakum-lalu-hantaman & bed berfilter
dilihat_bergerak: ya
diukur: ya
alias: ["94", "23", "53"]
vault: [../_vault/05-sfx-and-audio-mapping/94-vacuum-before-hit-logo-sting.md, ../_vault/05-sfx-and-audio-mapping/23-sonic-event-hierarchy.md]
---
### M22 · Vacuum-Before-Hit Sting & Sonic Bed
- **Trigger:** pembuka/penutup merek atau pivot gelap→terang butuh hantaman tunggal mahal sesudah jeda vakum
- **Anti-Pattern:** Menghantam logo/pivot tanpa menyisakan ruang vakum sebelumnya, menumpuk 5 impact sama keras dalam 15 dtk, atau memutus ekor musik/SFX dengan crossfade di dalam `<Sequence>` terpisah.
- **Invariant:** Tarik napas vakum (`0,35–0,45 dtk` pengosongan musik/bed) + riser/suction menjelang pivot, lalu jatuhkan 1 peak tier-1 (`impact` + chime) tepat di frame 1 reveal; pasang semua `<Audio>` di satu bus global luar `<Sequence>` adegan.
- **Primitives/Ref:** `SmoothAudioClip.tsx`, `scripts/juri/audio_bus_check.py`, `scripts/audio/sfx_potong.py`. · Vault: `../_vault/05-sfx-and-audio-mapping/94-vacuum-before-hit-logo-sting.md` · `../_vault/05-sfx-and-audio-mapping/23-sonic-event-hierarchy.md`
- **Gate:** `audio_bus_check.py` + `sfx_potong.py --laporan` + `audio_phone.py --gate` PASS.
