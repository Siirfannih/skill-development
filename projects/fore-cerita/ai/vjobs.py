"""Video jobs per shot (Flow image-to-video). Usage: python3 vjobs.py titles.json out.json [ids...]
titles.json maps keyframe id -> Flow asset title (first frame)."""
import json, sys

KEEP = ("Keep the exact hand-painted 2D anime look of the first frame: flat angular cel planes, warm amber-honey palette, "
        "umber shadows, film grain, same character face and clothes. No style change, no new characters, no text, no "
        "morphing, natural subtle motion.")

# id: (duration s, motion prompt, last-frame keyframe id or None)
V = {
    "v02": (4, "He scrolls his phone slowly with his thumb, then his thumb stops and he stays still staring at the screen. "
               "Very slow gentle push-in. The cup and planner stay still.", None),
    "v03": (4, "Continuous macro push-in: the camera moves slowly forward into the water droplet on the cup until the "
               "sunlit bedroom seen inside the droplet fills the whole frame and becomes the room itself.", "k04a"),
    "v04a": (4, "He pulls the curtain open with one arm, warm morning light floods across the room. Locked-off wide camera "
                "with a slow lateral drift.", None),
    "v04b": (4, "He smooths and straightens the blanket on the bed with both hands, slowly and carefully. Static camera.", None),
    "v04c": (4, "He straightens up and gives a small hopeful smile, light dust floating in the window light. Slow push-in.", None),
    "v05a": (4, "He sits completely bored, chin on hand, blinks slowly once; office lights flicker softly behind. Locked-off "
                "camera, no camera movement.", None),
    "v05b": (4, "He sits completely bored, chin on hand, blinks slowly and sighs; dust drifts in the classroom light. "
                "Locked-off camera, no camera movement.", None),
    "v05c": (4, "He sits bored on the moving bus, chin on hand, the bus sways gently and light from the windows slides "
                "across him. Locked-off camera.", None),
    "v05d": (4, "He sits bored at the night desk, chin on hand, the lamp hums, he blinks slowly. Locked-off camera.", None),
    "v05e": (4, "He sits bored, chin on hand; the dark faceless silhouettes at the edges slowly lean in a little, he does "
                "not notice them. Locked-off camera.", None),
    "v06": (4, "He lies still on his back with open eyes, only breathing and one slow blink. The camera slowly rotates "
               "clockwise a few degrees, looking straight down.", None),
    "v07": (4, "The bed floats gently up and down in the endless golden haze, soft clouds drift; the far dark silhouettes "
               "stand still on the horizon. Slow crane back pulling away.", None),
    "v08": (8, "Almost still: his hand rests on the page holding the pen, he taps the pen once and does not write. Dust "
               "motes float in the light. Completely locked-off camera, the notebook does not move at all.", None),
    "v10": (6, "The dark silhouettes run past him from left to right on both sides, he stands still hugging the planner and "
               "watches them leave him behind. Camera trucks slowly from left to right.", None),
    "v11": (4, "His hand holds the phone very still, only a tiny natural hand tremor, the background stays blurred. "
               "Completely locked-off camera.", None),
    "v12": (4, "He hesitates with his hand on the door handle, then steps forward out of the doorway into the alley, "
               "walking away from camera. The two silhouettes at the end of the alley stand still. Slow push-in.", None),
    "v13": (4, "The barista's hand slides the iced coffee across the counter into the customer's hand, the customer takes "
               "it. Slow push-in.", None),
    "v14": (4, "He scrolls his phone slowly, then stops and stares; warm hazy light, dust floating. Very slow push-in.", None),
    "v15": (6, "He keeps his head in his hands; the faceless dark silhouettes slowly step closer and close in around the "
               "table. Slow push-in.", None),
    "v16": (4, "The woman's elbow bumps the table: the cup jolts, the water droplet trembles, slides down and bursts into "
               "tiny splashes. Locked-off macro camera, quick motion.", None),
    "v17": (4, "Iced coffee spills out of the tipped cup and spreads across the open planner page, ice cubes slide. "
               "Top-down locked-off camera with a tiny shake.", None),
    "v18": (4, "Both laugh, embarrassed then genuinely; she dabs the table with a tissue, he covers his face laughing. "
               "Static camera.", None),
    "v19": (4, "He laughs and holds up the coffee-stained planner page toward her, shaking it a little to show the stain. "
               "Very slow push-in.", None),
    "v20": (4, "Both hands hold their pens still above the pages, hardly moving. Completely locked-off top-down camera, "
               "the planners do not move.", None),
    "v21": (6, "The dark silhouettes around the bench table gradually turn into warm friendly people who laugh and chat "
               "together with the couple. Slow crane back.", "k21b"),
}
FIRST = {"v02": "k02", "v03": "k03", "v04a": "k04a", "v04b": "k04b", "v04c": "k04c", "v05a": "k05a", "v05b": "k05b",
         "v05c": "k05c", "v05d": "k05d", "v05e": "k05e", "v06": "k06", "v07": "k07", "v08": "k08", "v10": "k10",
         "v11": "k11", "v12": "k12", "v13": "k13", "v14": "k14", "v15": "k15", "v16": "k16", "v17": "k17",
         "v18": "k18", "v19": "k19", "v20": "k20", "v21": "k21a"}

if __name__ == "__main__":
    titles = json.load(open(sys.argv[1]))
    ids = sys.argv[3:] or list(V)
    scenes = []
    for vid in ids:
        d, p, last = V[vid]
        s = {"type": "video", "model": "Omni 1.1 Flash", "aspect_ratio": "16:9", "duration": d, "resolution": "720p",
             "max_credits": 14, "first_frame": "asset:" + titles[FIRST[vid]], "prompt": f"{p} {KEEP}",
             "download_quality": "upscaled"}
        if last:
            s["last_frame"] = "asset:" + titles[last]
        scenes.append(s)
    json.dump({"project": "fore-clips", "scenes": scenes}, open(sys.argv[2], "w"), indent=1)
    json.dump(ids, open(sys.argv[2].replace(".json", "_map.json"), "w"))
    print(len(scenes), ids)
