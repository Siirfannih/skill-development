---
id: "A02"
pola: VO Tightening & Music Pacing
pack: 05-audio-sfx-pacing
kategori: sfx
kategori_lain: [script]
trigger: memadatkan jeda VO untuk retensi tanpa mempercepat bicara, membersihkan noise, dan memilih musik per babak
sumber: sintesis aturan suara utuh & tempo musik
dilihat_bergerak: ya
diukur: ya
alias: []
vault: [../_vault/05-sfx-and-audio-mapping/24-visual-event-pop-mapping.md]
---
### A02 · VO Tightening & Music Pacing
- **Trigger:** memadatkan jeda VO untuk retensi tanpa mempercepat bicara, membersihkan noise, dan memilih musik per babak
- **Anti-Pattern:** Mempercepat `TEMPO > 1.0`, memotong fonem/suku akhir kata, menjalankan denoise pada sumber bersih ≤ −50 dB, memasang limiter yang merusak VO, atau memakai satu track musik datar sepanjang batch.
- **Invariant:** Kunci `TEMPO = 1.0`; pangkas jeda mati dengan `cut_check.py --suggest --max-inner 0.12 --max-sentence 0.22` + `recut.py`; angkat frasa pelan secara statis tanpa limiter; pilih musik per babak lewat `pace_read.py` → `music_fit.py` (kandidat ≥ 20 dari ≥ 2 sumber) dengan ramp automation ≥ 250 ms.
- **Primitives/Ref:** `scripts/gate/cut_check.py`, `pause_clean.py`, `voice_level.py`, `voice_fidelity.py`, `music_batch.py`, `scripts/audio/tighten_ig.py`. · Vault: `../_vault/05-sfx-and-audio-mapping/24-visual-event-pop-mapping.md`
- **Gate:** `cut_check.py` + `pause_clean.py` + `voice_level.py` + `music_batch.py` PASS.
