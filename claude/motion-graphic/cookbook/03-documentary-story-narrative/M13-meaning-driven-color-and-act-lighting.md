---
id: "M13"
pola: Meaning-Driven Color & Act Lighting
pack: 03-documentary-story-narrative
kategori: texture
kategori_lain: [layout, typography]
trigger: pergeseran suasana per babak lewat satu warna cahaya atau desaturasi bermakna saat kata kunci muncul
fungsi: [suasana]
sumber: gabungan mekanik grading naratif & desaturasi bermakna
dilihat_bergerak: tidak
diukur: ya
alias: ["58", "76"]
vault: [../_vault/04-tactile-textures-and-grading/58-single-hue-act-lighting.md, ../_vault/04-tactile-textures-and-grading/76-meaning-triggered-desaturation.md]
---
### M13 · Meaning-Driven Color & Act Lighting
- **Trigger:** pergeseran suasana per babak lewat satu warna cahaya atau desaturasi bermakna saat kata kunci muncul
- **Anti-Pattern:** Menghancurkan detail bayangan gelap saat grading dingin (`VIS-05`), memicu blok kompresi dari grain berlebih (`VIS-06`), atau memakai crossfade antar-babak warna.
- **Invariant:** Ikat perubahan hue/saturasi langsung ke makna ucapan (masalah → desaturasi/merah, sistem/solusi → terang bersih); ganti babak lewat cut/whip di downbeat dan jaga kanal bayangan tetap terbaca di kompresi HP/IG.
- **Primitives/Ref:** `SelectiveColorSpotlight.tsx`, `Scrim.tsx`, `curves.ts` (`CURVE.drift`), `scripts/gate/grade_ukur.py`. · Vault: `../_vault/04-tactile-textures-and-grading/58-single-hue-act-lighting.md` · `../_vault/04-tactile-textures-and-grading/76-meaning-triggered-desaturation.md`
- **Gate:** `grade_ukur.py` + `palette_check.py` PASS.
