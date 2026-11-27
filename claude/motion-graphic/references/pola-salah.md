# Rejected patterns (SLOP codes)

Patterns the owner has rejected in real frames, written as what is visible or measurable, so a frame can be checked against them. They name a look, not a technique: the same gradient or glow can be right in another frame. Open when a frame is being judged, or when `bahan.md` points here. The owner's frames are not stored in the repo (they show people); where the repo has an equivalent image, it is linked.

Scope: **general** = applies to any video unless REF-SPEC or the brand says otherwise. **Bound** = was said about one video or scene; treat it as a question to ask, not a rule.

Status: the general/bound split for W01, W02, W05 is the planner's default, awaiting the owner's confirmation.

## Colour and material

| Code | What is visible | Scope | `../cookbook/contoh-gagal/` |
|---|---|---|---|
| SLOP-W01 | Dark blue to violet gradient across the frame, with glow on the focus object | general, except when that colour belongs to the brand and the gradient stays soft | 04 |
| SLOP-W02 | One centred radial (white or colour) on black, one layer, nothing it lights | general | none |
| SLOP-W03 | Pink gradient behind a white UI | bound (one video) | none |
| SLOP-W04 | Saturated accent from another family on black (pure blue, red) that jumps out | general (one accent family, `palette.md`) | none |
| SLOP-W05 | White glow behind a dark UI window | general, except when the reference shows the same glow with a reason | none |
| SLOP-W06 | Rough speckled black canvas where a clean dark field was wanted | bound (scenes sharing that background) | none |
| SLOP-W07 | Saturated royal-blue UI with yellow shapes, "full colour" UI | bound (one scene) | none |
| SLOP-W08 | Whole frame darkened, the speaker included | bound (one video); the general part is "never darken the speaker" | none |

## Layout and form

| Code | What is visible | Scope | `../cookbook/contoh-gagal/` |
|---|---|---|---|
| SLOP-L01 | Text pinned to the top edge or a corner, far from the head | general | none |
| SLOP-L02 | Frame visibly heavier on one side | general | 08 |
| SLOP-L03 | Text too small or low contrast against its frame | general (S-T15) | 18 |
| SLOP-L04 | Curved text over a face or over other text | general | 19 |
| SLOP-L05 | Elements in the edge danger zone, source credit in a corner | general (S-V23) | none |
| SLOP-L06 | Serif face on a yellow label | bound (one video's type family) | 01 |
| SLOP-L07 | Mascot hanging in the air without footing | general (objects stand on something) | none |
| SLOP-L08 | Workflow drawn as rows of cards, pills and tables on a flat panel | general | none |
| SLOP-L09 | Pixel-grid transition covering the whole frame or in the wrong colour | bound (grid itself was approved) | none |
| SLOP-L10 | Invented app UI beside the words "not a template" instead of the real app | general (S-V5) | none |
| SLOP-L11 | Text, footage and solid background all equally strong in a fast reel | bound (fast reels) | none |

When a frame matches a code, either change it or write one line in `DECISIONS.md` saying why this frame is the exception. To build the opposite of W01/W02/W05, see `bahan.md` (committed gradient, light pool, one emitter).
