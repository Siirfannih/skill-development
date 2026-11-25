---
id: "M08"
pola: Expressive Letter Path, Gloss & Overhang
pack: 02-typography-talking-head
kategori: typography
kategori_lain: [camera, layout]
trigger: judul masuk per huruf di lintasan lengkung; sapuan kilat huruf; kata overhang di atas promo
sumber: gabungan mekanik huruf lengkung, kilau, & overhang
dilihat_bergerak: tidak
diukur: ya
alias: ["44", "62", "74", "47"]
vault: [../_vault/02-typography-and-captions/44-curved-path-letter-arrival.md, ../_vault/02-typography-and-captions/62-per-letter-gloss-headline.md, ../_vault/02-typography-and-captions/74-scripted-keyword-overhang.md, ../_vault/02-typography-and-captions/47-camera-flown-type-objects.md]
---
### M08 · Expressive Letter Path, Gloss & Overhang
- **Trigger:** judul masuk per huruf di lintasan lengkung; sapuan kilat huruf; kata overhang di atas promo
- **Anti-Pattern:** Membuat animasi huruf terlalu lambat (> 10 f setelah onset) hingga tidak terbaca, memasang strip caption bawah terpisah, atau membuat huruf 3D extruded tanpa persetujuan `render_mode`.
- **Invariant:** Pastikan kata utuh dan terbaca ≤ 4 frame sesudah onset (`kt_ocr.py`); gunakan `LightSweep.tsx` untuk kilau per-huruf dan path SVG 2D untuk huruf melengkung; hindari menyisipkan efek tulisan tangan jika bertentangan dengan `BRAND.md`.
- **Primitives/Ref:** `LightSweep.tsx`, `aeKeyframe.ts`, `curves.ts` (`CURVE.reveal`), `Kursor.tsx`. · Vault: `../_vault/02-typography-and-captions/44-curved-path-letter-arrival.md` · `../_vault/02-typography-and-captions/62-per-letter-gloss-headline.md` · `../_vault/02-typography-and-captions/74-scripted-keyword-overhang.md` · `../_vault/02-typography-and-captions/47-camera-flown-type-objects.md`
- **Gate:** `kt_ocr.py` PASS pada onset + 4 f + `motion_lint.py` PASS.
