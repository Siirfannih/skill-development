---
id: "Q04"
pola: Audio Phone & Stem Gates
pack: 06-qc-and-verification
kategori: qc
kategori_lain: [sfx]
trigger: verifikasi final seluruh stem VO, SFX, dan musik setelah fase visual lulus dan sebelum MP4 final
fungsi: [qc]
sumber: sintesis gerbang produksi audio & uji speaker HP
dilihat_bergerak: ya
diukur: ya
alias: []
vault: [../_vault/05-sfx-and-audio-mapping/93-change-marked-sound-hierarchy.md]
---
### Q04 · Audio Phone & Stem Gates
- **Trigger:** verifikasi final seluruh stem VO, SFX, dan musik setelah fase visual lulus dan sebelum MP4 final
- **Anti-Pattern:** Menguji loudness hanya dari rata-rata global (sementara musik hilang di beberapa detik atau ekor SFX terpotong), lupa mengecek hasil sesudah encode AAC (+0,8 dBTP), atau mengirim mix tanpa uji speaker HP.
- **Invariant:** Kunci urutan stem via `audio_order.py`, audit sinkron bunyi-gerak via `frame_audit.py --fase audio`, ukur jendela lokal 100 ms–1 dtk pada file kiriman (`audio_phone.py --gate`, `sfx_potong.py`, `audio_qa.py --module5`), lalu jalankan `gerbang_produksi.sh`.
- **Primitives/Ref:** `scripts/gate/audio_order.py`, `sfx_density.py`, `scripts/audio/audio_phone.py`, `sfx_potong.py`, `scripts/juri/gerbang_produksi.sh`. · Vault: `../_vault/05-sfx-and-audio-mapping/93-change-marked-sound-hierarchy.md`
- **Gate:** `audio_order.py` + `sfx_potong.py` + `audio_phone.py --gate` + `gerbang_produksi.sh` exit 0.
