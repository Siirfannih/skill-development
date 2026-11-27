# Materials: how to build richness from light, depth and surface

Open when choosing style directions (`dunia-visual.md` §7) or when a frame looks flat. Not read at session start.

Measured on the 682 reference keyframes: 49 % flat backgrounds, 22 % gradients, 29 % photo or texture, and 71 % use 0-1 hues. Richness in the references comes from material (light, depth, surface, crop), not from more colours. A flat white card on a pale one-tone background is what you get when no material was chosen.

Each entry: when it carries meaning, how to build it, what moves in video, where the values came from, how it fails, how to check. Every demo is a standalone HTML in `toolkit/bahan/` (open it, copy the mechanism, take colours from the brand or REF-SPEC, never from the demo). `toolkit/bahan/lembar/<name>.jpg` shows the demo beside its source keyframes (`guide/referensi/sheets/keyframes/`). Open the keyframes themselves before you reuse a value.

One frame uses one material system: one light direction, one shadow type for objects of a kind, one surface (NEGATIF 2). Change material at an act boundary, not mid-act.

| Material | Demo | Source keyframes | Demo vs source |
|---|---|---|---|
| Committed gradient | `gradien.html` | 36-k7, 42-k2 | close |
| Light pool in the dark | `kolam-cahaya.html` | 36-k1, 65-k2 | close |
| Bright studio + one shadow system | `studio-terang.html` | 39-k5, 39-k8 | close |
| Depth through layers | `kedalaman-lapis.html` | 25-k3, 24-k8 | partial (no 3D object) |
| Paper, grain, ink | `kertas-grain.html` | 26-k2, 85-k6 | close |
| Emissive glass, one emitter | `kaca-kilau.html` | 34-k6, 35-k3 | close |
| Macro crop, bleed, lens depth | `bleed-macro.html` | 50-k3, 20-k2 | close |
| LED dot matrix | `matriks-titik.html` | 08-k4, 65-k3 | partial (fewer colour zones) |
| Graded photo behind type | `foto-grade.html` | 77-k7, 70-k2 | needs a ready asset |

## Committed gradient
- **When:** colour itself is the message of the beat (confirmation, warmth, an act's mood), or the brand owns a gradient.
- **Do:** two hues that differ in hue or lightness own the whole frame; interpolate `in oklab` (`in oklch` if the middle greys out); a second radial zone from one corner gives the light a direction; 3-5 % fractal-noise grain on top against H.264 banding. White type ≥ 100 px @1080.
- **Moves:** the angle or the corner zone drifts slowly (2-4 % of frame per second); at an act change the hue pair shifts.
- **Fails:** SLOP-W01, W02 (`pola-salah.md`); a one-tone wash (luma range < 35 and sat p95 < 0.15 = `banding.py` F1).
- **Check:** `banding.py <frame>` passes F1; you can name which hue owns the frame and where the light enters.

## Light pool in the dark
- **When:** a reveal, a logo, a quiet closing line; darkness that should feel like a room, not a void.
- **Do:** near-black base (#050405 to #120a0c); one warm source centred just outside an edge: a wide ambient ellipse (~95 % x 75 %) plus a tighter core (~75 % x 50 %), each a radial gradient to transparent; the top third stays dark so type reads. This is a vignette with a cause: the light source. Remotion: `toolkit/latar/LightWaveBg` (core outside frame) does the same with Gaussian falloff.
- **Moves:** the core rises or brightens 10-20 % as the subject arrives; never pulses on a loop.
- **Fails:** a centred radial halo with nothing to light (SLOP-W02); glow behind a dark UI window (SLOP-W05).
- **Check:** cover the light source edge with your hand: the frame should go flat. If it does not change, the light has no source.

## Bright studio and one shadow system
- **When:** a physical object (photo, folder, ticket, device) should feel placed and real on a light canvas.
- **Do:** off-white sweep lit from top-centre: radial `#fbfbfb` → `#ededee` (55 %) → `#d6d6d8` at the corners. Every object gets the same two shadows: contact (0 2px 3px, ~22 % black) plus soft (0 26px 50px -12px, ~28 %) and optionally a far one (0 60px 90px -30px). Slight rotation (±2°) reads as placed by hand.
- **Moves:** an object lands: soft shadow shrinks and darkens as it nears the surface; the light never moves.
- **Fails:** a flat card on a flat pale field (no falloff, no contact shadow): the default this file exists to replace. Dark vignette on a light background without a source = S-V18.
- **Check:** squint: corners are 8-12 % darker than the centre; every object's shadow points the same way.

## Depth through layers
- **When:** abundance, clutter, a world around one item; a camera that travels.
- **Do:** three planes. Far: large soft shapes blurred 18-30 px. Focus: one object, sharp, with the frame's only hard shadow. Near: one object cropped by the frame edge, blurred 28-40 px. Blur grows with distance from the focus plane; near objects are larger. Remotion: `Camera25D` layers with `z` and focus blur.
- **Moves:** parallax (near plane moves 2-3x the far plane), or a focus pull from near to focus plane.
- **Fails:** blur on text meant to be read (S-V32); every card the same size and sharpness (slide look, S-V28).
- **Check:** at thumbnail size you can still point to the one sharp object.

## Paper, grain, ink
- **When:** craft, drafts, editorial, history, "made by hand" claims.
- **Do:** warm off-white base (#efe6cf range, never grey); low-frequency fibre mottling (`feTurbulence` baseFrequency ~.005, multiply ~.5) plus fine grain (~.75, multiply ~.35); ink in `mix-blend-mode: multiply` with a 4-6 px displacement for rough edges; a cast shadow printed through a halftone dot mask (8 px pitch) instead of a smooth blur.
- **Moves:** grain re-seeds every 2-3 frames (boiling), the halftone shadow slides as if the light moved; ink can stamp in with a 2-frame overshoot.
- **Fails:** rough black canvas texture where clean was asked (SLOP-W06, context-bound); grain on dim footage (`grade.md`).
- **Check:** 100 % crop: the ink takes the paper's texture; the shadow is dots, not a grey blur.

## Emissive glass, one emitter
- **When:** AI, search, connection, a system waking up: the light is the subject.
- **Do:** near-black field with a faint tint of the emitter's hue; ONE emissive object (a ring from a `conic-gradient`, masked to a band, blurred 14-22 px, plus a sharper copy at ~3 px); everything else is lit by it, e.g. a pill with only a 1.5 px rim highlight on its top edge in the same hue.
- **Moves:** the bright arc travels around the ring (rotate the conic `from` angle); the rim highlight follows the arc.
- **Fails:** glass on every card without a reason (S-V25); several glows of different colours (material soup).
- **Check:** count light sources: one.

## Macro crop, bleed, lens depth
- **When:** dates, numbers, a detail that matters; anything that would otherwise be a small object in the middle.
- **Do:** put the camera so close the object leaves the frame on 3-4 sides; tilt the plane (`rotateX ~28°, rotateZ ~-14°` with perspective ~1400 px); keep a sharp band through the subject and blur 5-8 px toward the far edges (`backdrop-filter` with a gradient mask).
- **Moves:** slow push along the plane, or a rack focus from one number to the next.
- **Fails:** small centred object on an empty canvas (S-V30, S-V31).
- **Check:** the subject is ≥ 60 % of frame height or bleeds; the sharp band lands on the subject.

## LED dot matrix
- **When:** screens, feeds, digital noise behind a turning-point line.
- **Do:** black field; colour lives in 2-3 soft radial zones under a dot mask (`radial-gradient(circle, #000 5.5px, transparent 6.6px) 0 0/24px 24px`); dim the dots behind the type.
- **Moves:** the colour zones scroll under the fixed dots, as if the screen played something.
- **Fails:** the dots compete with the type (dim the centre); dots on every scene.
- **Check:** text contrast measured on the worst region (`cek-warna.mjs keluar`).

## Graded photo behind type (needs a ready asset)
Code can draw a sky gradient with turbulence clouds (`foto-grade.html`), but it reads as an illustration next to 77-k7 and cannot reach a real landscape or a rocket plume (70-k2). Use a real photo or rendered plate as the background asset, graded to the act's colour (`grade.md`), with type over it. In motion graphics a raw photo is a reference to redraw objects from; a photo used as a background plate is a different job and is allowed. Write the asset, its job and how it moves before fetching it.
