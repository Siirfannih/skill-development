"""Ronde dengar akhir: timeline (video+cues) + sheet PNG zoom pada kedua master."""
import json
from earshot import api
W = '/home/claude/pks/v20/work'; V = '/mnt/user-data/uploads/AI-Video/pks-studio/seg/v11final_v.mp4'
for v in (1, 2):
    m = f'/home/claude/pks/v20/master_video{v}.wav'
    r = api.timeline(m, video=V, cues=f'{W}/cues_v{v}.json', detail='high')
    json.dump(r, open(f'{W}/timeline_v{v}_master_final.json', 'w'), indent=1, default=str)
    print(f'##### v{v}\n', r['summary'], flush=True)
api.sheet('/home/claude/pks/v20/master_video2.wav', f'{W}/sheet_v2_0_16.png', video=V, cues=f'{W}/cues_v2.json', start=0, end=16)
api.sheet('/home/claude/pks/v20/master_video1.wav', f'{W}/sheet_v1_40_56.png', video=V, cues=f'{W}/cues_v1.json', start=40, end=56)
api.sheet('/home/claude/pks/v20/master_video2.wav', f'{W}/sheet_v2_118_133.png', video=V, cues=f'{W}/cues_v2.json', start=118, end=132.8)
print('sheets ok')
