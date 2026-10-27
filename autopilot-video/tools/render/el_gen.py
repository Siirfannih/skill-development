import json, sys, urllib.request, subprocess, os
k = subprocess.run(["security", "find-generic-password", "-s", "elevenlabs-api-key", "-w"], capture_output=True, text=True).stdout.strip()
if not k:
    k = open(os.path.expanduser("~/Documents/Skill-Development/.secrets/elevenlabs.key")).read().strip()
H = {"xi-api-key": k, "Content-Type": "application/json"}
def post(url, body, out):
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers=H)
    try:
        open(out, "wb").write(urllib.request.urlopen(req, timeout=300).read()); print("ok", out)
    except urllib.error.HTTPError as e:
        print("HTTP", e.code, out, e.read()[:400])
what = sys.argv[1]
if what == "music":
    post("https://api.elevenlabs.io/v1/music", {
        "prompt": "Instrumental underscore for a calm, curious educational explainer about how a water pump works. Soft marimba plucks, warm analog synth pad, gentle muted kick, 100 bpm, minimal and premium like an Apple product film. Steady from the start with no silent intro; slight tension and fewer notes from 22 to 27 seconds; brighter resolve from 27 seconds; clean ending. No vocals.",
        "music_length_ms": 42000, "model_id": "music_v1"}, "public/audio/music.mp3")
else:
    post("https://api.elevenlabs.io/v1/sound-generation", {
        "text": "soft deep muffled thud, low frequency impact, warm, no high frequencies, short",
        "duration_seconds": 1.0, "prompt_influence": 0.6}, "public/audio/sfx_thud.mp3")
