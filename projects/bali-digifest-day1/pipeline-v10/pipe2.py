import json, time, numpy as np
while 'DONE' not in open('/home/irfan/work/bdf26/v6/work/pipe.log').read(): time.sleep(10)
from faster_whisper import WhisperModel
m = WhisperModel('large-v3', device='cpu', compute_type='int8', cpu_threads=8)
for n in ['0530_Testimoni_1227_Clay','0531_Testimoni_1235']:
    a = np.load(f'/home/irfan/work/bdf26/v6/audio16k/{n}.npy').astype(np.float32)/32768
    segs,_ = m.transcribe(a, language='id', word_timestamps=True, vad_filter=False, beam_size=5, initial_prompt='Bali Digifest, Primakara, konten kreator, workshop, generasi muda.')
    S=[{'s':s.start,'e':s.end,'t':s.text.strip(),'lp':s.avg_logprob,'w':[[q.start,q.end,q.word,q.probability] for q in s.words]} for s in segs]
    json.dump(S, open(f'/home/irfan/work/bdf26/v6/work/L_{n[:4]}_full.json','w'), ensure_ascii=False)
    print('==',n,flush=True)
    for s in S: print(f"{s['s']:7.2f}-{s['e']:7.2f} [{s['lp']:.2f}] {s['t']}", flush=True)
print('DONE2',flush=True)
