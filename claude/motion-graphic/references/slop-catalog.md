# Slop catalog (signs I have rejected)

Used to **scan**, not to ban techniques: fingerprints are written as appearance and measurements (KEBIJAKAN v2, policy v2), and apply unless REF-SPEC states otherwise. One sign with a written reason is allowed; multiple signs appearing together without a reason = video feels "AI". The *Floor* column points to items in `LANTAI.md`. Scan the storyboard (Storyboard/block out stage) and render (preview + QA, Mix → Deliver stage). Each new sign from my revisions gets one row here.

## Audio

| ID | Sign | How to check | Floor |
|---|---|---|---|
| S-A1 | Clean source voice becomes muffled, its air thinned, dynamics flattened | `gate/voice_fidelity.py` | Lantai E25a, §14.6 |
| S-A2 | Music mismatches mood (tense/build/drop under calm clip, melancholic when brief isn't) or masks voice | `music_fit.py --category <k> --voice` | Lantai E25 |
| S-A3 | Slow fade-in backing track or total silence mid-video | 0.5 s RMS of music stem | Lantai E25 |
| S-A4 | Objects, text, motion, or subtitle phrases without SFX; video feels empty | `gate/sfx_density.py` | Lantai E24 |
| S-A9 | One music track for every clip/act; candidates only from old library | `gate/music_batch.py` (fingerprint, not label); `music_fit.py` on used cuts: ≥ 20 candidates, ≥ 2 sources | Lantai E25, Lantai E24 |
| S-A11 | SFX spam: whoosh > 1 per second or too loud, same file repeated < 1 s; cues without role/reason | `gate/sfx_density.py` | Lantai E24, §14.3 |
| S-A10 | Reference or SFX never listened to (no earshot label) | `earshot describe/timeline` log | DENGAR gate |
| S-A5 | Woodblock knocks, felt, 8-bit sine, raw noise whoosh | file list in cue sheet | §14.5, §14.8 |
| S-A6 | Two layered sounds for one event | cue sheet: one event one file | §14.3 |
| S-A7 | VO sped up or given reverb | tempo 1.0; `vo_echo.py` | Lantai E23, §14.0 |
| S-A8 | SFX present in cue sheet but inaudible on phone | `audio_phone.py`; cue gain −4…−10 dB after peak normalization | Lantai E25a |
| S-A12 | Whoosh on a cut/frame switch without visible fast motion | cue sheet: each whoosh points to motion (wipe, dash, sweep, slide); cut = click | Lantai E24, §14.3 |

## Text

| ID | Sign | How to check | Floor |
|---|---|---|---|
| S-T1 | Caption > 2 lines, orphan word on line 2, or clipped at edge | `gate/caption_lines.py` + still | Lantai A1 |
| S-T9 | Spoken lines with no text in a TEKS-mode beat (VISUAL/MENYATU beats intentionally have no text) | `teks_plan.py --beats` vs still per phrase in TEKS beats | NEGATIF 6, `teks.md` |
| S-T10 | Words scattered without a clear reading order (jumping back up/left) | still per phrase: one-way word order | Lantai A8 |
| S-T11 | Quote ≥ 5 words, 3 lines centre-aligned over speaker's face | still; long quotes → blank canvas, left-aligned | Lantai C14, Lantai A8 |
| S-T12 | Text disappears before it has been fully read/spoken | duration of each phrase ≥ max(0.8; 0.30 + 0.06 × letters) | Lantai A8 |
| S-T13 | Single kinetic typography style throughout video: same font, size, position, and entrance animation for every word | kinetic word list + T code per word; thresholds (techniques per 15 s, consecutive identical techniques) = `kt_check.py` and `teks.md` §Kotak dan gerak teks, position follows object | `typography.md` §8 |
| S-T2 | Text repeats what is already obvious in the visual ("GRAY" over a grey phone) | squint test, devil's advocate | `decision-guide.md` §1 |
| S-T3 | Random mixed sizes within one line; serif set inline with bold | still per phrase | Lantai A6 |
| S-T4 | Box behind text that is already legible | contrast ≥ 4.5 : 1 without box | Lantai A9 |
| S-T5 | Blue text/accents on dark/navy background | luminance contrast | Lantai A7 |
| S-T6 | Headline in top-left corner; small label + two stepped italic words | still | Lantai D19c, Lantai C14 |
| S-T7 | The same three entrance styles (fade, pop, expand) repeated | same technique ≤ 2× in a row | `three-segment-gate.md` |
| S-T8 | Sentences/numbers on screen that are unspoken and not part of the shown UI/product | compare against transcript in TEKS beats | `teks.md` |
| S-T14 | Unsystematic second typeface: one "emotional" word switches font mid-line (raw *clip*, the *difference*, *craft*) across many phrases with varying roles. Appears identically across models and sessions. Allowed if REF-SPEC/brand gives it one fixed role used consistently | `gate/permukaan_cek.py` inventory; still per phrase | Lantai A7 |
| S-T15 | Readable text (labels, mono captions, UI proof text) under ~24 px @1080 when shown without camera zoom-in; smaller sizes are texture only and must not carry meaning | 100% still + measure letter height | `teks.md` §Keterbacaan |

## Visual and motion

| ID | Sign | How to check | Floor |
|---|---|---|---|
| S-V1 | Crossfade or fade as a transition | transition list | Lantai B13 |
| S-V2 | Vivid graphics floating over blurred and darkened footage | still | `decision-guide.md` §5 |
| S-V3 | Rainbow palette; accent outside brief palette | `palette_check.py` | Lantai C18a |
| S-V4 | Large text left + card/UI right with equal visual weight | squint test | Lantai C14 |
| S-V5 | Invented chat/app UI instead of real UI | compare against real screenshot | Lantai D20 |
| S-V6 | Storyboard placeholder shapes visible in render | still | Lantai D19c, Lantai D22 |
| S-V7 | Negative/RGB split effects sprinkled without an event | beat table: effects bound to events | Lantai C18b |
| S-V8 | Repeated chart format with identical framing | side-by-side stills | Lantai B13b |
| S-V9 | Gradient/style from one example of mine spread across all frames | list of changing frames | Lantai F28b |
| S-V10 | Illustration objects collide with text/cards, icons mismatch words or spill out of their container | bounding boxes per 10 fps sample frame; still | Lantai A8 |
| S-V11 | Video feels flat: identical camera frame start to finish, no slow push-in, punch-in/zoom-out, camera exploring illustration, subject cutout (text behind speaker), or motion blur on fast moves | start vs middle vs end stills: scale/position must change; camera move list per sentence | Lantai B13, Lantai B10 |
| S-V12 | Dark overlays/gradients pop in or vanish abruptly | play at 0.5×: overlay rises from bottom (ease-in-out), drops on exit | Lantai B13 |
| S-V13 | Text and visual far apart/detached; illustration window crops sides; text sits static while footage/object zooms; camera fails to follow focus object; wrong ending logic (magnifying glass stops on X) | still per beat + check: title ≤ 40 px from object, text follows camera transform, camera keyframes = focus object position | Lantai B12 |
| S-V14 | Illustrations are only generic shapes not depicting speech | beat table: word → meaning → 3 metaphors → choice | Lantai D19 |
| S-V15 | Naval's face shown while the host is speaking | speaker label per phrase vs shot | Lantai D21 |
| S-V16 | Crude self-made logos/icons (plane, ChatGPT knot); glow/triangles leaking out of cards | close-up still of each icon and joint | Lantai D20 |
| S-V17 | Picture drifts progressively behind voice (lip-sync slips up to ±0.5 s by end of clip): each video cut rounded up to whole frames while audio is exact, drift accumulates | compare base.mp4 vs voice.wav duration and video vs map cut positions | cut video per segment by exact frame count (`-frames:v` from cumulative 30 fps grid), cut audio separately |
| S-V18 | Dark vignette/circle on a white/light background | bright scene still: edges no darker than centre | palette.md |
| S-V19 | Brown + black base palette looks cheap | `palette_check.py`, still | palette.md |
| S-V20 | UI screenshot pasted as a static image instead of animated coded UI | asset list: no UI PNGs in scenes | Lantai D20 |
| S-V21 | Indecisive gradient: radial smudge/coloured blur blob without a crisp saturated zone, or blue gradient spread to scenes with no act change | `banding.py` (luma/saturation); count gradient scenes | palette.md, Lantai F28b |
| S-V22 | Palette invented from reference even though brand/`palettes.json` already exists | brief names palette from `palettes.json` + `palette_check.py` proof | palette.md §1 |
| S-V23 | Objects/text in frame edge red zone (outside x 165–1755, y 140–935 @1080p) without camera reason | still per beat with safe-frame overlay | storyboard.md §3 |
| S-V24 | Visual is only a large symbol/word instead of literal sentence action (good example: "addiction" = keep creating new repos without releasing; "not publishing" = type in Threads then save to draft) | beat table: sentence → visible action | Lantai D19 |
| S-V25 | Model's "Apple premium" material soup: more than one shadow/light/sheen system in one video; glass/blur on every card without reason; halo behind text (contrast < 4.5 : 1); near-monotone gradient (luma range < ±35, sat p95 < 0.15). Consistent material present in REF-SPEC is allowed | `scripts/banding.py` vs REF-SPEC; `gate/permukaan_cek.py` inventory; 100% still | Lantai C14a |
| S-V26 | Objects and text collide or overlap because frames were written at once without per-layer inspection | `gate/tabrakan_cek.py`; per-layer frame LOG | Lantai C15, F26a |
| S-V27 | Placeholder objects: empty boxes, grey lines replacing text, dashed borders, coloured blocks standing in for "cards" | binary test 5 (`dunia-visual.md` §8); 100% still | Lantai D22 |
| S-V28 | All frames medium shot in the centre with uniform scale and tiny UI (slide presentation) even though the reference varies shot sizes (edge-cropped macro, product close-up). Applies when REF-SPEC §3 states a different distribution | `banding.py` (focus area) vs REF-SPEC; shot type list per panel | NEGATIF 5, 10 |
| S-V29 | Overcorrection: feedback "too heavy/crowded/needs breathing room" answered with the opposite pole (flat pale white background with one colour speck in corner, object shrunk until text is unreadable). Metrics: complained metric shifts > ~60% of distance to target, or another metric worsens (unreadable text, F1 triggered) | `banding.py <new> --sebelum <old> [--target <ref>]` on 3-5 representative frames; numbers in DECISIONS | `references/revisi.md` |
| S-V30 | Sparse frame: focus area < ~12% without a text-like edge band (one tiny ball, nearly empty chart). Series with > 10% sparse frames = fix: fill with the beat's real object at readable size, or merge beats. Intentional quiet frames in REF-SPEC are allowed | `banding.py <frame>` (F3, warning) and `banding.py --seri <folder>` | NEGATIF 4-5 |
| S-V31 | Repeated composition pattern: same layout (e.g., one small object centred on a gradient) in > ~25% of frames, or same pattern in 3+ consecutive frames | `banding.py --seri <folder>` (warning: focus < 20% + near-centre centroid, % frames) + eye | NEGATIF 5, 10 |
| S-V32 | Blur on content meant to be read, or blur as filler; blurred dark cards across all scenes = fingerprint. Allowed only: transitions, depth-of-field behind a sharp focus, motion blur | 100% still; check for blur on proof text/UI | NEGATIF 2, 10 |
| S-V33 | Random tilt/3D across many frames without a system (material soup). Allowed if recorded in REF-SPEC/DECISIONS where and why (e.g., floating artifacts only in solution act) | list of tilted frames vs system note | NEGATIF 2 |
