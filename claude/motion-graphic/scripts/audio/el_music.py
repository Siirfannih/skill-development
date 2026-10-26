"""v15 score: one continuous ElevenLabs Music composition whose sections are timed to the VO acts (vo.json).
Usage: python3 tools/el_music.py <out.mp3> [plan.json]   — key read from .el_key (never printed)."""
import json, sys, urllib.request, urllib.error

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
vo = json.load(open(f'{ROOT}/video/src/vo.json'))
def T(c, p, n=1):
    k = 0
    for w in vo['words']:
        if w['c'] == c and w['w'].lower().startswith(p.lower()):
            k += 1
            if k == n: return w['s']
END = vo['total'] + 1.0

# (start time, name, positive local styles, negative local styles) — each act has one job.
ACTS = [
    (0.0, 'hook', ['cold open, instant attention, tight sub-bass pulse, muted clock-like ticks, minimal modern cinematic tension, 112 bpm, A minor', 'airy glassy swell and soft low impact at the end of the section as a reveal'], ['piano', 'vocals']),
    (T('c02', 'Bertahun'), 'longing', ['emotional yet driving, bittersweet, warm analog synth pad with soft cello swells over a steady pulsing pluck and light kick at 112 bpm, matches fast editing, heartfelt but with momentum, sustained and full the whole time, F major to A minor'], ['vocals', 'piano', 'solo piano', 'slow ballad']),
    (T('c03', 'Sekarang'), 'acceleration', ['tension rising fast, 124 bpm, pulsing synth bass, ticking hi-hats, rising filter sweep, urgency, keeps building and getting denser the whole time'], ['vocals', 'piano']),
    (T('c03', 'berhenti'), 'stopped', ['the beat is gone, only a deep low drone and a reversed swell in one continuous crescendo that keeps rising to the very last second, suspense, held breath'], ['drums', 'melody', 'vocals']),
    (T('c04', 'AI'), 'pressure', ['massive cinematic braam hit on the first beat, then dark driving electronic pulse 116 bpm, ominous minor arpeggio, tense, unsettling, mechanical'], ['vocals', 'happy']),
    (T('c05', 'perlahan'), 'sameness', ['beat drops out, eerie detuned synth pad, cold, hollow, uncanny sameness, sparse'], ['drums', 'vocals']),
    (T('c06', 'Ira'), 'void', ['dark minimal ambient, low drone, slow heartbeat kick, vast empty space, contemplative and heavy'], ['vocals', 'melody too busy']),
    (T('c07', 'Karena'), 'discovery', ['hope returning, curious and warm, music box and soft bells over gentle plucked synth, light rhythmic pulse builds layer by layer, inspiring'], ['vocals', 'sad']),
    (T('c08', 'Rick'), 'confidence', ['confident warm groove, organic drums and round bass, studio warmth, laid-back swagger, tasteful, human'], ['vocals', 'epic orchestra']),
    (T('c09', 'AI'), 'build', ['future bass build-up, rising snare roll and riser, tension climbing toward a drop, anticipation, energetic'], ['vocals']),
    (T('c09', 'seleramu'), 'drop', ['euphoric future bass drop on the first beat, wide supersaws, triumphant, then resolving and fading to a clean ending'], ['vocals']),
]

def plan():
    secs = []
    for i, (t0, name, pos, neg) in enumerate(ACTS):
        t1 = ACTS[i + 1][0] if i + 1 < len(ACTS) else END
        secs.append({'section_name': name, 'positive_local_styles': pos, 'negative_local_styles': neg, 'duration_ms': int(round((t1 - t0) * 1000)), 'lines': []})
    return {
        'positive_global_styles': ['instrumental cinematic score for an Apple-style product film', 'modern, premium, clean mix', 'one continuous evolving piece with seamless transitions between sections'],
        'negative_global_styles': ['vocals', 'lyrics', 'choir', 'lo-fi', 'cheesy', 'silence gaps'],
        'sections': secs,
    }

CUES = {  # per-act cues (Irfan 17:52: each part of the backsound has its own job). (t0, t1, tail, sections)
    'c1_opening': (0.0, T('c02', 'Bertahun'), 1.5, [ACTS[0][1:]]),
    'c2_longing': (T('c02', 'Bertahun'), T('c03', 'Sekarang'), 6.0, [ACTS[1][1:]]),
    'c3_accel': (T('c03', 'Sekarang'), T('c03', 'berhenti'), 5.0, [ACTS[2][1:]]),
    'c4_stopped': (T('c03', 'berhenti'), T('c04', 'AI'), 3.0, [ACTS[3][1:]]),
    'c5_pressure': (T('c04', 'AI'), T('c05', 'perlahan'), 6.0, [ACTS[4][1:]]),
    'c6_void': (T('c05', 'perlahan'), T('c07', 'Karena'), 1.5, [ACTS[5][1:], ACTS[6][1:]]),
}
def cue_plan(name):
    t0, t1, tail, secs = CUES[name]
    if len(secs) == 1:
        durs = [t1 - t0 + tail]
    else:
        mid = T('c06', 'Ira'); durs = [mid - t0, t1 - mid + tail]
    return {
        'positive_global_styles': ['instrumental cinematic underscore for an Apple-style product film', 'modern, premium, clean mix', 'full energy from the very first beat, no fade-in'],
        'negative_global_styles': ['vocals', 'lyrics', 'choir', 'lo-fi', 'cheesy', 'silence', 'fade-out', 'ending', 'outro', 'decrescendo'],
        'sections': [{'section_name': n, 'positive_local_styles': pos, 'negative_local_styles': neg, 'duration_ms': max(3000, int(round(d * 1000))), 'lines': []} for (n, pos, neg), d in zip(secs, durs)],
    }

if __name__ == '__main__' and len(sys.argv) > 1 and sys.argv[1] == 'cues':
    import concurrent.futures as cf
    names = sys.argv[2:] or list(CUES)
    def gen(n):
        p = cue_plan(n); out = f'{ROOT}/music/{n}.mp3'
        json.dump(p, open(out[:-4] + '_plan.json', 'w'), indent=1)
        req = urllib.request.Request('https://api.elevenlabs.io/v1/music?output_format=mp3_44100_192', data=json.dumps({'composition_plan': p, 'model_id': 'music_v1'}).encode(), headers={'xi-api-key': KEY, 'Content-Type': 'application/json'})
        try:
            open(out, 'wb').write(urllib.request.urlopen(req, timeout=600).read()); return n + ' ok'
        except urllib.error.HTTPError as e:
            return n + f' HTTP {e.code} ' + e.read()[:300].decode(errors='replace')
    with cf.ThreadPoolExecutor(2) as ex:
        for r in ex.map(gen, names): print(r)
    sys.exit()

if __name__ == '__main__':
    out = sys.argv[1]
    p = json.load(open(sys.argv[2])) if len(sys.argv) > 2 else plan()
    json.dump(p, open(out.rsplit('.', 1)[0] + '_plan.json', 'w'), indent=1)
    body = json.dumps({'composition_plan': p, 'model_id': 'music_v1'}).encode()
    req = urllib.request.Request('https://api.elevenlabs.io/v1/music?output_format=mp3_44100_192', data=body,
                                 headers={'xi-api-key': KEY, 'Content-Type': 'application/json'})
    try:
        r = urllib.request.urlopen(req, timeout=600)
        open(out, 'wb').write(r.read()); print('ok', out)
    except urllib.error.HTTPError as e:
        print('HTTP', e.code, e.read()[:600].decode(errors='replace'))
