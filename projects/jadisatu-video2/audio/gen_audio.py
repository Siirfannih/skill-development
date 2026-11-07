# SFX + musik ElevenLabs untuk Jadisatu #2. Kunci dari env ELEVENLABS_API_KEY (tidak pernah dicetak).
import json, os, sys, urllib.request, concurrent.futures as cf
KEY = os.environ["ELEVENLABS_API_KEY"]
def post(url, body, out):
    r = urllib.request.Request(url, data=json.dumps(body).encode(), headers={"xi-api-key": KEY, "Content-Type": "application/json"})
    try:
        open(out, "wb").write(urllib.request.urlopen(r, timeout=300).read()); return out, "ok"
    except urllib.error.HTTPError as e:
        return out, f"HTTP {e.code} {e.read()[:300]}"
SFX = {
    "switch": ("single crisp light switch click, close up, dry, no reverb", 0.6),
    "key_clack": ("single mechanical keyboard key thock, soft and deep, dry", 0.5),
    "ui_pop": ("subtle soft UI pop, clean bubble click, interface sound, dry", 0.5),
    "mouse_click": ("single quiet mouse click, dry, close", 0.5),
    "shutter": ("short mechanical camera shutter click, clean", 0.5),
    "tape_stop": ("vinyl record brake, tape stop slowing down fast, short", 0.8),
    "whoosh": ("very subtle thin air whoosh, short soft transition, no bass", 0.5),
    "ding": ("muted dry service bell ding, soft, short", 0.8),
    "trash": ("crumpled paper dropped into a trash can, short, dry", 1.0),
    "riser": ("short soft rising swell building tension, clean, no bass boom", 2.0),
    "typing": ("fast light laptop keyboard typing, soft keys, dry", 2.0),
}
MUSIC = {
    "positive_global_styles": ["instrumental playful comedic underscore for a short social video", "modern clean mix, light funky groove, round bass guitar, crisp tight drums, muted guitar plucks, 98 bpm", "minimal, premium, not cheesy"],
    "negative_global_styles": ["vocals", "lyrics", "choir", "cinematic trailer", "silence gaps", "kazoo", "cartoon"],
    "sections": [
        {"section_name": "intro", "positive_local_styles": ["groove kicks in immediately with bass and drums, cheeky and confident"], "negative_local_styles": ["slow build"], "duration_ms": 6000, "lines": []},
        {"section_name": "story", "positive_local_styles": ["steady light groove, sparse and bouncy, leaves room for voice, playful"], "negative_local_styles": ["busy melody"], "duration_ms": 42600, "lines": []},
        {"section_name": "honest", "positive_local_styles": ["thinner arrangement, just soft keys and light bass, warm and a bit reflective but still moving"], "negative_local_styles": ["drums heavy"], "duration_ms": 11700, "lines": []},
        {"section_name": "build", "positive_local_styles": ["short build up, rising snare roll and filter sweep, anticipation"], "negative_local_styles": ["drop too early"], "duration_ms": 5800, "lines": []},
        {"section_name": "drop", "positive_local_styles": ["full groove drop on the first beat, energetic funky bass, claps, upbeat and fun"], "negative_local_styles": ["epic"], "duration_ms": 15800, "lines": []},
        {"section_name": "outro", "positive_local_styles": ["groove continues then resolves to a clean final hit and short tail"], "negative_local_styles": ["long fade"], "duration_ms": 5600, "lines": []},
    ],
}
jobs = [("https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128", {"text": t, "duration_seconds": d, "prompt_influence": 0.6}, f"sfx/{k}.mp3") for k, (t, d) in SFX.items()]
jobs.append(("https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128", {"composition_plan": MUSIC, "model_id": "music_v1"}, "music_groove.mp3"))
only = sys.argv[1:]
with cf.ThreadPoolExecutor(2) as ex:
    for out, res in ex.map(lambda j: post(*j), [j for j in jobs if not only or os.path.basename(j[2]).split(".")[0] in only]):
        print(out, res, flush=True)
