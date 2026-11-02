"""earshot timeline (video + cues) pada master dan stem SFX; simpan ringkasan + json."""
import sys, json
from earshot import api
v = sys.argv[1]; tag = sys.argv[2] if len(sys.argv) > 2 else ''
W = '/home/claude/pks/v20/work'; V = '/mnt/user-data/uploads/AI-Video/pks-studio/seg/v11final_v.mp4'
for name, path in [('master', f'/home/claude/pks/v20/master_video{v}.wav'), ('sfx', f'{W}/v{v}_sfx.wav')]:
    r = api.timeline(path, video=V, cues=f'{W}/cues_v{v}.json', detail='high')
    json.dump(r, open(f'{W}/timeline_v{v}_{name}{tag}.json', 'w'), indent=1, default=str)
    print(f'##### {name}\n', r.get('summary'), flush=True)
