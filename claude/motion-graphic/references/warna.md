# Colour gate (entry and exit)

Moved from `dunia-visual.md` §9 so that reference stays under 15 KB. Tool: `scripts/warna/cek-warna.mjs` (see `scripts/warna/README.md`).


Two mandatory gates, one CLI: `scripts/warna/cek-warna.mjs` (Node; `npm ci` once in `scripts/warna/`). Colour words in a brief ("soft blue") are not values; palettes come from a reference or brand profile, measured.

- **Entry** (before designing): `node scripts/warna/cek-warna.mjs masuk <video|still folder|png...> [--ke-spec REF-SPEC.json] [--ke-tema tema.ts]`. Outputs `palet.json`: per frame type (light/dark) 4-5 real HEX values with area % and role (background = largest area, ink = highest contrast against background, accent = most saturated OKLCH, neutral/surface), luminance, WCAG ratio, and ink:background APCA Lc. `--ke-spec` inserts the `palet` key into the spec; `--ke-tema` writes `tema.ts` tokens (derived values are tagged). Used verbatim: colours in code come from these tokens, not guesses.
- **Exit** (each frame before handoff): `node scripts/warna/cek-warna.mjs keluar <frame.png|folder> --palet palet.json [--html frame.html | --tanpa-teks noteks.png] [--abaikan x,y,w,h]`. Three checks, exits 1 if any fails:
  1. **warna-nyasar** (stray colour): colour clusters >= 0.5% area whose ΔE2000 > 12 to every palette colour (including +-25 L tints/shades and gradient mixes between palette colours). Photos/footage are excluded with `--abaikan`.
  2. **kontras-apca** (APCA contrast): per text block, APCA Lc >= 60 (body text) or >= 45 (large: >= 48 px @1080, or bold >= 38 px); WCAG 2 ratio is reported as a notice. Text is separated by rendering twice (with and without text), not guessed: HTML automatically (`data-lapis="teks"` per block), Remotion via a second `sembunyikanTeks` still (`toolkit/starter/src/Video.tsx`). axe-core also runs for HTML frames as a supplement (notice), not a judge.
  3. **warna-nanggung** (muddy/indecisive colour): areas >= 3% (or a block's text or background colour) in the muddy band, OKLCH chroma 0.03-0.08 at lightness 0.45-0.75, that are not palette colours. Fix: pick neutral grey (chroma < 0.03) or decisive colour (>= 0.08), or add it to the palette from the reference if it is genuinely part of the system.
- Deliberate exceptions: text that intentionally fades or dims as story language is given `data-sengaja="pudar"`; text under `filter: blur(>= 1.5px)` and occluded text are skipped automatically (logged in `dilewati`).
- The production gate (`gerbang_produksi.sh`) and `board.py` run the exit gate when `palet.json` exists in the project. Threshold and calibration details: `scripts/warna/README.md`.
