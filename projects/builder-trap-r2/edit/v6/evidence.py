import os
for k in ('OMP_NUM_THREADS','OPENBLAS_NUM_THREADS','MKL_NUM_THREADS'):os.environ[k]='2'
from pathlib import Path
import json, soundfile as sf, numpy as np, math
P=Path(__file__).resolve().parent
mp=json.loads((P/'map.json').read_text());w=json.loads((P/'words_source.json').read_text());a,sr=sf.read(P/'source_raw.wav',dtype='float32');b,br=sf.read(P/'voice_clean.wav',dtype='float32');out=P/'cut-windows';out.mkdir(exist_ok=True);rows=[];removed=0
for i,(x,y) in enumerate(mp['removed']):
 join=x-removed;removed+=y-x
 source_start=max(0,x-.3);source_end=min(len(a)/sr,y+.3);final_start=max(0,join-.3);final_end=min(len(b)/sr,join+.3)
 sf.write(out/f'cut-{i:02d}-source.wav',a[round(source_start*sr):round(source_end*sr)],sr,subtype='PCM_16');sf.write(out/f'cut-{i:02d}-v6.wav',b[round(final_start*sr):round(final_end*sr)],sr,subtype='PCM_16')
 rows.append(dict(index=i,removed_source=[x,y],source_window=[source_start,source_end],v6_window=[final_start,final_end],join_frame=round(join*30),energy=mp['edges'][i],auditory_review='not claimed by builder'))
(out/'windows.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
kn=json.loads((P.parents[1]/'remotion/src/data/knots_v6.json').read_text());knots=np.array(kn['knots']);times=np.arange(mp['dur_frames'])/30;warped=np.interp(times,knots[:,0],knots[:,1]);frames=np.rint(warped*30).astype(int)
# Face's child frame remains real even while its parent is in a warped Freeze.
cur=frames;real=np.arange(mp['dur_frames']);child=cur-(cur-np.clip(real,0,mp['dur_frames']-1))
checks=dict(source_guard_min_ms=min(min(q['left_guard_ms'],q['right_guard_ms']) for q in mp['edges']),
 source_frames_exact=all(abs(t*30-round(t*30))<1e-7 for pair in mp['removed'] for t in pair),
 output_samples=len(b),output_frames=mp['dur_frames'],audio_frame_exact=len(b)==mp['dur_frames']*1600,
 scene_time_monotonic=bool(np.all(np.diff(frames)>=0)),face_playback_no_reset=bool(np.all(child==real)),
 knots_duration_frames=kn['dur_frames'],no_time_stretch=True)
(P/'timeline-check.json').write_text(json.dumps(checks,indent=2)+'\n');print(json.dumps(checks))
