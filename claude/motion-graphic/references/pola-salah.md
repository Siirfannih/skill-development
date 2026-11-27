# Rejected patterns (SLOP and S codes)

Patterns the owner rejected in real frames and renders, written as what is visible or measurable so a frame can be checked against them. They name a look, not a technique: the same gradient or glow can be right in another frame, and anything REF-SPEC states with its reason is allowed. Use the list to **scan** the storyboard (storyboard step) and the render (preview and QA before deliver), or when `bahan.md` points here. One sign with a written reason is fine; several signs together without a reason make a video feel "AI". When a frame matches, change it or write one line in `DECISIONS.md` saying why it is the exception. A new sign from a revision gets one row here.

Scope of SLOP codes: **general** = any video unless REF-SPEC or the brand says otherwise; **bound** = said about one video or scene, so treat it as a question to ask, not a rule (W01, W02, W05 split is the planner's default, awaiting the owner). The owner's frames are not stored (they show people); `../cookbook/contoh-gagal/` numbers link an equivalent image where one exists.

## Colour and material
| Code | What is visible | Scope / check |
|---|---|---|
| SLOP-W01 | Dark blue to violet gradient across the frame, glow on the focus object | general, unless the colour is the brand's and the gradient stays soft · contoh-gagal 04 |
| SLOP-W02 | One centred radial (white or colour) on black, one layer, lighting nothing | general |
| SLOP-W03 | Pink gradient behind a white UI | bound (one video) |
| SLOP-W04 | Saturated accent from another family on black (pure blue, red) that jumps out | general (one accent family, `warna.md`) |
| SLOP-W05 | White glow behind a dark UI window | general, unless the reference shows it with a reason |
| SLOP-W06 | Rough speckled black canvas where a clean dark field was wanted | bound (scenes sharing that background) |
| SLOP-W07 | Saturated royal-blue "full colour" UI with yellow shapes | bound (one scene) |
| SLOP-W08 | Whole frame darkened, speaker included | bound; the general part is "never darken the speaker" |
| S-V2 | Vivid graphics floating over blurred, darkened footage | still (`decision-guide.md` §5) |
| S-V3 | Rainbow palette; accent outside the palette | `palette_check.py` |
| S-V18 / S-V19 | Dark vignette on a light background / brown + black base | bright still: edges no darker than centre; `warna.md` |
| S-V21 | Indecisive gradient: radial smudge or colour blob without a crisp saturated zone; blue gradient spread to scenes with no act change | `banding.py` (luma/saturation); count gradient scenes |
| S-V25 | Material soup: more than one shadow/light/sheen system; glass on every card without reason; halo behind text; near-monotone gradient (luma range < ±35, sat p95 < 0.15) | `banding.py` vs REF-SPEC; `gate/permukaan_cek.py`; 100 % still |
| S-V32 | Blur on content meant to be read, or blur as filler (blurred dark cards everywhere); fine for transitions, depth of field behind a sharp focus, motion blur | 100 % still on proof text/UI |
| S-V33 | Random tilt/3D across many frames without a system; fine when REF-SPEC/DECISIONS says where and why | list of tilted frames vs the system note |

To build the opposite of W01/W02/W05: `bahan.md` (committed gradient, light pool, one emitter).

## Layout and form
| Code | What is visible | Scope / check |
|---|---|---|
| SLOP-L01 / S-T6 | Text pinned to the top edge or a corner, far from the head; small label + two stepped italic words | general · still |
| SLOP-L02 / S-V4 | Frame visibly heavier on one side; large text left + card right with equal weight | general · squint test · contoh-gagal 08 |
| SLOP-L03 / S-T15 | Text meant to be read under ~24 px @1080 without a camera zoom-in, or low contrast | general · 100 % still, letter height (`teks.md` §Keterbacaan) · contoh-gagal 18 |
| SLOP-L04 | Curved text over a face or over other text | general · contoh-gagal 19 |
| SLOP-L05 / S-V23 | Text inside the edge margin (default 5 %, NEGATIF 5) or objects at the edge without a camera or REF-SPEC reason; source credit in a corner | general · still with safe-frame overlay |
| SLOP-L06 | Serif face on a yellow label | bound (one video's type) · contoh-gagal 01 |
| SLOP-L07 | Mascot hanging in the air without footing | general (objects stand on something) |
| SLOP-L08 | Workflow drawn as rows of cards, pills and tables on a flat panel | general |
| SLOP-L09 | Pixel-grid transition covering the whole frame or in the wrong colour | bound (the grid itself was approved) |
| SLOP-L10 / S-V5 / S-V20 | Invented app/chat UI instead of the real app; UI screenshot pasted as a static image instead of animated coded UI | general · compare with a real screenshot; no UI PNGs in scenes |
| SLOP-L11 | Text, footage and solid background all equally strong in a fast reel | bound (fast reels) |
| S-V6 / S-V27 | Placeholders: empty boxes, grey lines for text, dashed borders, coloured blocks standing in for cards | binary test 5 (`dunia-visual.md` §8); 100 % still |
| S-V10 / S-V26 | Objects collide with text/cards, icons mismatch words or spill out of their container | `gate/tabrakan_cek.py`; per-layer frames |
| S-V13 | Text far from its object; text static while the footage zooms; camera not following the focus object; wrong ending logic | still per beat: text near its object, follows the camera transform |
| S-V14 / S-V24 | Generic shapes or a literal noun instead of what the sentence does ("not publishing" = typing in Threads then saving to draft) | beat table: sentence → visible action |
| S-V15 | A guest's face shown while the host speaks | speaker label per phrase vs shot |
| S-V16 | Crude self-made logos/icons; glow or shapes leaking out of cards | close-up still of each icon and joint |
| S-V28 | Every frame a centred medium shot with uniform scale and tiny UI (slides) while the reference varies shot size | `banding.py` (focus area) vs REF-SPEC §3 |
| S-V30 | Sparse frame: focus area < ~12 % without a text band; a series with > 10 % sparse frames needs the beat's real object at readable size, or merged beats | `banding.py <frame>`, `banding.py --seri` |
| S-V31 | Same composition (e.g. one small object centred on a gradient) in > ~25 % of frames or 3+ in a row | `banding.py --seri` + eye |
| S-V29 | Overcorrection to the opposite pole after "too heavy/crowded" | `revisi.md` §Revision direction |

## Text
| Code | What is visible | Check |
|---|---|---|
| S-T1 | Caption > 2 lines, orphan word on line 2, or clipped at an edge | `gate/caption_lines.py` + still |
| S-T2 | Text repeating what the visual already shows ("GRAY" over a grey phone) | squint test (`decision-guide.md` §1) |
| S-T3 / S-T14 | Mixed sizes in one line; one "emotional" word switching typeface across many phrases without a fixed role | still per phrase; `gate/permukaan_cek.py` (NEGATIF 1) |
| S-T4 / S-T5 | Box behind text that is already legible; blue text on dark/navy | contrast without the box (`teks.md`) |
| S-T7 / S-T13 | Same entrance (fade, pop, expand) everywhere; one kinetic style for every word | `kt_check.py`, `teks.md` §Gerak teks per peran |
| S-T8 / S-T9 | Unspoken sentences or numbers that are not shown UI; spoken lines without text in a TEKS beat | transcript vs TEKS beats (`teks_plan.py --beats`) |
| S-T10 / S-T11 | No clear reading order; a quote ≥ 5 words in 3 centred lines over the speaker's face | still per phrase; long quotes → blank canvas, left-aligned |
| S-T12 | Text gone before it is read or spoken | each phrase ≥ max(0.8; 0.30 + 0.06 × letters) s |

## Motion
| Code | What is visible | Check |
|---|---|---|
| S-V1 / S-V12 | Crossfade as a transition; dark overlays popping in or vanishing abruptly | transition list; play at 0.5× (`kamera-gerak.md`) |
| S-V7 | Negative/RGB split sprinkled without an event | beat table: effects bound to events |
| S-V8 | Repeated chart with identical framing | side-by-side stills |
| S-V9 | Gradient/style from one example spread across every frame | list of changed frames |
| S-V11 | Flat video: same camera frame start to end, no push, punch-in, cutout, or motion blur on fast moves | start/middle/end stills; camera move per sentence |
| S-V17 | Picture drifting behind voice (up to ±0.5 s) because each cut was rounded to whole frames | cut video by exact frame count on the cumulative 30 fps grid, audio separately |

## Audio
| Code | What is audible | Check |
|---|---|---|
| S-A1 / S-A7 | Clean voice muffled, thinned, flattened; VO sped up or given reverb | `gate/voice_fidelity.py`; tempo 1.0, `vo_echo.py` |
| S-A2 / S-A9 | Music against the mood or masking voice; one track for every clip, candidates only from the old library | `music_fit.py --category <k> --voice`; `gate/music_batch.py` (≥ 20 candidates, ≥ 2 sources) |
| S-A3 | Slow fade-in backing track or total silence mid-video | 0.5 s RMS of the music stem |
| S-A4 / S-A11 | Objects, text or motion without SFX (unless silence is the written choice); SFX spam (whoosh > 1 per second, same file < 1 s apart, cues without a role) | `gate/sfx_density.py` |
| S-A5 / S-A6 | Woodblock, felt, 8-bit sine, raw noise whoosh; two layered sounds for one event | cue sheet: one event, one file |
| S-A8 | SFX in the cue sheet but inaudible on a phone | `audio_phone.py`; cue gain −4…−10 dB after peak normalisation |
| S-A10 | Reference or SFX never listened to | `earshot describe/timeline` log |
| S-A12 | Whoosh on a cut without visible fast motion | each whoosh points to a motion; a cut = click |
