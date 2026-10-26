"""v15: real SFX from ElevenLabs sound generation for the kinds that were code-synthesized (Irfan 17:52).
Warm / thock / no ear-fatigue brief baked into every prompt. Writes sfx/el/<kind>_<n>.mp3.  Key from .el_key."""
import json, os, sys, urllib.request, urllib.error, concurrent.futures as cf

ROOT = '/home/claude/thegap'
KEY = open(f'{ROOT}/.el_key').read().strip()
OUT = f'{ROOT}/sfx/el'; os.makedirs(OUT, exist_ok=True)
WARM = ', warm and muted, low-mid weight, no harsh high frequencies, clean studio recording, single isolated sound, no music'
LIB = {  # kind: (prompt, seconds, variants)
    'thud': ('deep soft cinematic thud of an object landing, sub-heavy low impact' + WARM, 1.0, 3),
    'impact': ('punchy cinematic impact hit with a deep boom and a short airy tail, premium trailer style' + WARM, 1.6, 2),
    'thock': ('satisfying deep thock, like a premium mechanical keyboard key bottoming out or a wooden block tap' + WARM, 0.5, 3),
    'tick': ('very short soft wooden tick, subtle tactile UI tap, like a muted clock tick' + WARM, 0.5, 3),
    'glide': ('smooth paper card gliding across a table, soft airy swipe' + WARM, 1.0, 3),
    'swell': ('soft reverse swell rising into a moment, airy whoosh pad building up' + WARM, 1.2, 2),
    'riser': ('short cinematic riser, rising tension whoosh that builds and stops, sucked-in air' + WARM, 1.2, 2),
    'scribble': ('marker pen quickly scribbling a cross-out mark on paper' + WARM, 1.0, 2),
    'camwhoosh': ('fast camera whip pan whoosh, deep air pressure swoosh that lands' + WARM, 0.8, 3),
    'lens': ('magnifying glass lens sliding into place, soft glassy focus click with a gentle low thump' + WARM, 0.8, 2),
    'cursor': ('soft computer mouse click, muted and close' + WARM, 0.5, 2),
    'heartbeat': ('single slow deep heartbeat thump, cinematic, sub' + WARM, 1.0, 1),
}

def gen(job):
    kind, i = job
    out = f'{OUT}/{kind}_{i}.mp3'
    if os.path.exists(out): return f'{kind}_{i} cached'
    prompt, sec, _ = LIB[kind]
    body = json.dumps({'text': prompt, 'duration_seconds': sec, 'prompt_influence': 0.55}).encode()
    req = urllib.request.Request('https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_192', data=body, headers={'xi-api-key': KEY, 'Content-Type': 'application/json'})
    for _ in range(4):
        try:
            open(out, 'wb').write(urllib.request.urlopen(req, timeout=180).read()); return f'{kind}_{i} ok'
        except urllib.error.HTTPError as e:
            if e.code == 429: import time; time.sleep(3); continue
            return f'{kind}_{i} HTTP {e.code} {e.read()[:200]}'
    return f'{kind}_{i} gave up'

if __name__ == '__main__':
    kinds = sys.argv[1:] or list(LIB)
    jobs = [(k, i) for k in kinds for i in range(LIB[k][2])]
    with cf.ThreadPoolExecutor(2) as ex:
        for r in ex.map(gen, jobs): print(r)
