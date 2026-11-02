"""Satu ronde dengar: timeline (video+cues) tiap master + describe bagian penting stem musik/master."""
import sys, json, soundfile as sf
from earshot import api
tag = sys.argv[1]; W = '/home/claude/pks/v20/work'; V = '/mnt/user-data/uploads/AI-Video/pks-studio/seg/v11final_v.mp4'
for v in (1, 2):
    m = f'/home/claude/pks/v20/master_video{v}.wav'
    r = api.timeline(m, video=V, cues=f'{W}/cues_v{v}.json', detail='high')
    json.dump(r, open(f'{W}/timeline_v{v}_master{tag}.json', 'w'), indent=1, default=str)
    print(f'##### timeline master v{v}\n', r['summary'], flush=True)
    x, sr = sf.read(m); mu, _ = sf.read(f'{W}/v{v}_music.wav')
    for name, src, a, b in [('music cold open', mu, 0, 10.3), ('master cold open', x, 0, 10.3), ('music 10-20', mu, 10.3, 20),
                            ('master 49-56 (dark)', x, 49.5, 56), ('master outro', x, 126.3, 132.8)]:
        p = f'{W}/seg_v{v}.wav'; sf.write(p, src[int(a * sr):int(b * sr)], sr)
        print(f'--- v{v} {name}: ', api.describe(p)['summary'][:420], flush=True)
