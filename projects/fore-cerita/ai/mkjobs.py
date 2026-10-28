import json, sys
R = "/Users/igedeirfankusumaputra/Proyek/fore-cerita/ai/ref"
K = "/Users/igedeirfankusumaputra/Proyek/fore-cerita/ai/keys"
OUT = "/mnt/user-data/outputs/aijobs"

STYLE = ("Hand-painted 2D anime illustration, flat angular cel planes with only 2-3 values per surface, no lineart, "
         "soft dry brush edges, low contrast with lifted blacks, heavy film grain, warm amber-honey palette with deep "
         "umber-brown shadows and a few muted olive-green accents, muted colors only, no pure white, no saturated colors, "
         "no blue or teal tones anywhere")

MAN = ("young Indonesian man about 24 (adult office worker): short messy black hair in 4-5 chunky locks, warm tan skin, "
       "gentle tired eyes, plain white short-sleeve button shirt, dark olive-green lanyard with a small ID card, "
       "dark charcoal trousers")
WOMAN = ("young Indonesian woman about 23: shoulder-length straight dark brown hair with soft bangs, warm tan skin, "
         "bright cheerful eyes, cream loose open shirt over a dark olive top, long dark olive skirt")


def sheets():
    man = ("Character turnaround sheet on a plain warm beige paper background: the SAME man shown four times side by "
           "side - front view, three-quarter view, side profile, back view - full body standing, relaxed slightly "
           f"slouched posture. He is a {MAN}, simple dark sneakers. Exactly match the man's face, hair and clothes "
           f"from the reference images. {STYLE}. No text, no labels.")
    wom = ("Character turnaround sheet on a plain warm beige paper background: the SAME woman shown four times side by "
           "side - front view, three-quarter view, side profile, back view - full body standing, relaxed natural "
           f"posture. She is a {WOMAN}, simple flat shoes, small canvas tote bag. Exactly match the woman (on the "
           f"right in the reference) face, hair and clothes. {STYLE}. No text, no labels.")
    return {"project": "fore-ai", "scenes": [
        {"type": "image", "model": "Nano Banana Pro", "aspect_ratio": "16:9", "prompt": man,
         "reference_images": [f"{R}/N_ots_her.jpg", f"{R}/N_two_laugh.jpg"]},
        {"type": "image", "model": "Nano Banana Pro", "aspect_ratio": "16:9", "prompt": wom,
         "reference_images": [f"{R}/N_two_laugh.jpg", f"{R}/v5_65.7.jpg"]},
    ]}


SHEET_M = f"{K}/sheet_man.jpg"
SHEET_W = f"{K}/sheet_woman.jpg"
REAL = ("REALITY lighting: low-key night coffee shop, warm amber pendant lamps, soft round bokeh, deep umber-brown "
        "shadows, dark olive plants")
DREAM = ("DREAM lighting (same amber palette, NOT grey, NOT mint, NOT blue): brighter and hazier, soft golden haze "
         "filling the air, glowing bloom on windows and light sources, floating motes of light dust, edges of the "
         "frame fading into warm cream haze, lifted warm beige-brown shadows")
SIL = ("faceless dark umber-brown silhouette figures with a faint warm amber rim light, no facial features, standing "
       "still and staring")
CUP = "a clear plastic iced coffee cup with milky brown coffee, ice and a small dark green leaf logo"
HIM = f"the man from the character sheet ({MAN})"
HER = f"the woman from the character sheet ({WOMAN})"

# (id, refs, comp frame, prompt)
SHOTS = [
    ("k01", "M", "v5_4", f"POV extreme close-up: {HIM}'s hands hold a smartphone low over a dark wooden cafe table, the phone "
     "screen is a plain softly glowing warm-white rectangle with nothing on it, hands steady, iced coffee blurred at the edge. "
     + REAL),
    ("k02", "M", "v5_4", f"Medium over-the-shoulder shot from behind {HIM}'s right shoulder at a small round corner table: he "
     f"holds his phone, on the table {CUP} and a closed brown planner, rule of thirds with the cup at lower right. " + REAL),
    ("k03", "-", "v5_5.2", f"Macro extreme close-up of one big water droplet of condensation on the side of {CUP} at night. "
     "Inside the droplet, refracted like a tiny lens, glows a miniature upside-down image of a sunlit small bedroom with a "
     "window and a bed in golden morning light. The droplet is clear water, not white, not a glass ball. Dark cafe bokeh "
     "behind. " + REAL),
    ("k04a", "M", "v5_7", f"Long shot of a small rented bedroom (kos) in the morning: {HIM} stands small at the right, "
     "pulling open a curtain at the left window, wooden floor, simple bed, standing fan, clothes rack. Horizontal "
     "composition. " + DREAM),
    ("k04b", "M", "v5_7", f"Medium shot in the same small morning bedroom: {HIM} bends over the bed straightening the "
     "blanket neatly with both hands. " + DREAM),
    ("k04c", "M", "v5_7", f"Medium close shot in the same small morning bedroom: {HIM} stands up straight beside the made "
     "bed with a faint hopeful smile, window light behind him. " + DREAM),
    ("k05a", "M", "v5_15", f"Medium frontal shot, one-point perspective with all lines converging to him: {HIM} sits at an "
     "office desk resting his chin on one hand, bored tired eyes, rows of office desks receding behind. " + DREAM),
    ("k05b", "M", "v5_15", f"Medium frontal shot, one-point perspective, identical framing and pose: {HIM} sits at a "
     "university classroom desk resting his chin on one hand, bored, rows of empty desks receding behind. " + DREAM),
    ("k05c", "M", "v5_15", f"Medium frontal shot, one-point perspective down the aisle of a city bus, identical framing "
     f"and pose: {HIM} sits on a bus seat resting his chin on one hand, bored, window light. " + DREAM),
    ("k05d", "M", "v5_15", f"Medium frontal shot, identical framing and pose: {HIM} sits at a small desk in his bedroom at "
     "night under a warm desk lamp resting his chin on one hand, bored, laptop open. Same golden haze but dimmer. " + DREAM),
    ("k05e", "M", "v5_15", f"Medium frontal shot, one-point perspective down the aisle of a city bus: {HIM} sits resting "
     f"his chin on one hand; at the far edges of the frame stand two {SIL}. " + DREAM),
    ("k06", "M", "v5_23", f"Top-down shot looking straight down at {HIM} lying on his back on a single bed, eyes open "
     "staring at the ceiling, body placed diagonally across the frame, rumpled blanket. " + DREAM),
    ("k07", "M", "v5_25.5", f"Wide establishing shot: {HIM} lies on his single bed which floats in an endless empty space "
     f"of warm golden haze and soft clouds; small {SIL} stand far away on a faint horizon line around him. Horizontal "
     "composition, he is small. " + DREAM),
    ("k08", "M", "v5_30", f"Close-up, slightly high angle: an open planner notebook on a desk, the left page has faint "
     "printed ruled lines and NO writing at all, completely empty, his hand rests on the right page holding a pen. "
     "Static. " + DREAM),
    ("k09", "-", "v5_36", "Medium shot of an empty hazy room corner with a window, soft and out of focus, nothing in the "
     "foreground, used as a background plate. " + DREAM),
    ("k10", "M", "v5_42", f"Long shot on a running track at golden hour: {HIM} stands still in the middle hugging a "
     f"planner to his chest while {SIL} run past him on both sides - one wears a graduation gown and cap, one an office "
     "lanyard, one is a couple holding hands. Horizontal composition. " + DREAM),
    ("k11", "M", "v5_46", f"POV close-up: {HIM}'s hand holds a smartphone upright in the center of the frame, the screen "
     "is a plain softly glowing warm-white rectangle with nothing on it, blurred bedroom behind. Static. " + DREAM),
    ("k12", "M", "v5_50", f"Medium shot from behind: {HIM} wearing a backpack stands in the doorway of his kos room, one "
     "hand on the door handle, looking down a narrow alley with converging lines; two "
     f"{SIL} stand at the far end of the alley. " + DREAM),
    ("k13", "-", "v5_52.5", f"Medium close shot across a coffee shop counter: a barista's hand (dark olive apron sleeve) "
     f"hands {CUP} to a customer's reaching hand. " + DREAM),
    ("k14", "M", "v5_55.5", f"Medium over-the-shoulder shot from behind {HIM}'s right shoulder at a small round corner "
     f"table, phone in hand, {CUP} and a closed brown planner on the table, exactly the same composition as a night "
     "cafe shot but in daylight dream haze. " + DREAM),
    ("k15", "M", "v5_60", f"Medium frontal shot, pyramid composition: {HIM} sits at a small cafe table with his head in "
     f"both hands, an open planner in front of him; tall {SIL} crowd closely around the table on both sides. " + DREAM),
    ("k16", "-", "v5_62.8", f"Macro extreme close-up of one big water droplet of condensation on the side of {CUP}. "
     "Inside the droplet, refracted like a tiny lens, glows a miniature upside-down image of a hazy golden cafe table "
     "surrounded by dark figures. The droplet is clear water, not white, not a glass ball. A woman's elbow in a cream "
     "sleeve enters at the edge of frame touching the table. Dark night cafe bokeh behind. " + REAL),
    ("k17", "-", "v5_64", f"Top-down close-up: {CUP} lies tipped over on a dark wooden table, coffee and ice spilling "
     "across an open planner page with faint ruled lines and no writing. Diagonal composition. " + REAL),
    ("k18", "MW", "v5_65.7", f"Two-shot at a small cafe table at night, left and right thirds: {HIM} on the left and {HER} "
     "on the right both laughing, she holds a tissue, spilled coffee and a wet planner on the table. " + REAL),
    ("k19", "MW", "v5_67.5", f"Over-the-shoulder shot from behind {HER}'s shoulder (blurred foreground): {HIM} laughs and "
     "holds up a coffee-stained planner page toward her, iced coffee on the table. " + REAL),
    ("k20", "-", "v5_69", "Top-down close-up: two open planners side by side on a dark wooden cafe table, each page has "
     "faint ruled lines and NO writing at all, a man's hand holding a pen on the left planner and a woman's hand with a "
     "pen on the right planner. Static. " + REAL),
    ("k21a", "MW", "v5_72", f"Long shot, pyramid composition: a long cafe bench table at night, {HIM} and {HER} sit in the "
     f"middle smiling, and three {SIL} sit around them at the table. " + REAL),
    ("k21b", "MW", "v5_72", f"Long shot, pyramid composition: a long cafe bench table at night, {HIM} and {HER} sit in the "
     "middle laughing, and three warm friendly young people (two men, one woman, casual clothes) sit around them at the "
     "table chatting, iced coffees on the table. " + REAL),
]


def keys():
    scenes = []
    for sid, who, comp, p in SHOTS:
        refs = []
        if "M" in who: refs.append(SHEET_M)
        if "W" in who: refs.append(SHEET_W)
        refs.append(f"{R}/N_two_laugh.jpg" if len(refs) < 2 else f"{R}/{comp}.jpg")
        if len(refs) < 3: refs.append(f"{R}/{comp}.jpg")
        prompt = (f"{p} Use the last reference image only for camera framing and composition; use the other references "
                  f"for character identity and for the painting style and color palette. {STYLE}. Cinematic 16:9 film "
                  "frame, no text, no letters, no watermark.")
        scenes.append({"type": "image", "model": "Nano Banana Pro", "aspect_ratio": "16:9", "prompt": prompt, "variants": 2, "download_quality": "upscaled",
                       "reference_images": refs})
    return {"project": "fore-ai-keys", "scenes": scenes}


if __name__ == "__main__":
    name = sys.argv[1]
    job = globals()[name]()
    json.dump(job, open(f"{OUT}/{name}.json", "w"), indent=1)
    print(f"{OUT}/{name}.json", len(job["scenes"]))
