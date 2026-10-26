"""v15: real SFX from ElevenLabs sound generation for the kinds that were code-synthesized (Irfan 17:52).
Warm / thock / no ear-fatigue brief baked into every prompt. Writes sfx/el/<kind>_<n>.mp3.  Key from .el_key."""
import json, os, sys, urllib.request, urllib.error, concurrent.futures as cf

import os as _os
ROOT = _os.environ.get('MG_ROOT', '/home/claude/thegap')
def _key():
    """ElevenLabs key, never printed: $ELEVENLABS_API_KEY → $MG_ROOT/.el_key → Skill-Development/.secrets/elevenlabs.key
    (Mac: also in Keychain, service 'elevenlabs-api-key'). See tools/ELEVENLABS.md in the skill-development repo."""
    import os
    if os.environ.get('ELEVENLABS_API_KEY'): return os.environ['ELEVENLABS_API_KEY'].strip()
    for p_ in (f'{ROOT}/.el_key', os.path.expanduser('~/Documents/Skill-Development/.secrets/elevenlabs.key'),
               os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../../.secrets/elevenlabs.key')):
        if os.path.exists(p_): return open(p_).read().strip()
    raise SystemExit('ElevenLabs key not found — see tools/ELEVENLABS.md')
KEY = _key()
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

# v17 (Irfan 19:20): comfort first, using his reference keywords. Every prompt asks for a soft, smooth version.
SOFT = ', soft and smooth, gentle on the ears, no hiss, no harsh highs, no distortion, clean studio recording, single isolated sound, no music'
LIB.update({
    'v17_pop': ('minimalist bubble pop, round and soft' + SOFT, 0.5, 4),
    'v17_click': ('clean app click, glass UI tap, quiet and rounded' + SOFT, 0.5, 4),
    'v17_tick': ('very subtle glass UI tick, tiny and delicate' + SOFT, 0.5, 3),
    'v17_typing': ('digital typing on a quiet soft keyboard, gentle fast keystrokes' + SOFT, 1.5, 3),
    'v17_whoosh': ('airy whoosh transition, smooth air movement' + SOFT, 0.8, 4),
    'v17_whip': ('whip pan swoosh, fast smooth air' + SOFT, 0.6, 3),
    'v17_glide': ('kinetic motion whoosh, light and silky, slow' + SOFT, 1.0, 3),
    'v17_scribble': ('marker scribble sound, gentle felt-tip pen on paper, muted' + SOFT, 0.8, 3),
    'v17_impact': ('subtle bass drop impact, deep and clean, warm' + SOFT, 1.5, 3),
    'v17_thud': ('soft deep thump of a card landing on a table, warm' + SOFT, 0.7, 3),
    'v17_riser': ('short cinematic riser, airy and smooth, builds then stops' + SOFT, 1.2, 3),
    'v17_lens': ('soft glass lens focus sound, gentle glassy shimmer' + SOFT, 0.8, 3),
    'v17_shutter': ('camera shutter click, crisp but soft, muted mechanical' + SOFT, 0.5, 3),
})

if __name__ == '__main__':
    kinds = sys.argv[1:] or list(LIB)
    jobs = [(k, i) for k in kinds for i in range(LIB[k][2])]
    with cf.ThreadPoolExecutor(2) as ex:
        for r in ex.map(gen, jobs): print(r)
