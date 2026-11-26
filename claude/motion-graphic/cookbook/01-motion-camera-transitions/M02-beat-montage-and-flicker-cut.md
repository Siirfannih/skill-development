---
id: "M02"
pola: Beat Montage & Silhouette Flicker Cut
pack: 01-motion-camera-transitions
kategori: camera
kategori_lain: [texture, sfx]
trigger: montase satu hari atau b-roll berirama di atas beat musik; pergantian shot terasa dipotret
fungsi: [suasana, transisi]
sumber: gabungan montase beat-locked & flicker cut
dilihat_bergerak: tidak
diukur: ya
alias: ["21", "66"]
vault: [../_vault/01-camera-and-transitions/21-beat-locked-day-montage.md, ../_vault/01-camera-and-transitions/66-silhouette-flicker-cut.md]
---
### M02 · Beat Montage & Silhouette Flicker Cut
- **Trigger:** montase satu hari atau b-roll berirama di atas beat musik; pergantian shot terasa dipotret
- **Anti-Pattern:** Memotong di luar ketukan, menaruh caption subtitle di pita bawah saat montase cepat, atau mengulang flicker/flash pada lebih dari 2 cut berurutan.
- **Invariant:** Percepat kepadatan cut menuju puncak musik dengan `FlashCut`/`InvertFlash` (2 f) atau 2-frame silhouette lead (`persepsi.py` matte); pertahankan variasi arah/framing tiap cut tanpa crossfade dan beri klik/shutter di puncak beat.
- **Primitives/Ref:** `FlashCut.tsx`, `InvertFlash.tsx`, `SceneChain.tsx`, `scripts/lego/persepsi.py`. · Vault: `../_vault/01-camera-and-transitions/21-beat-locked-day-montage.md` · `../_vault/01-camera-and-transitions/66-silhouette-flicker-cut.md`
- **Gate:** `motion_lint.py` + `sfx_density.py` (`transisi`) PASS + `frame_audit.py` bebas kedipan tak bermotivasi.
