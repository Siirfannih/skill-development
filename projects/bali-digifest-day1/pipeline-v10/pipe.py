import sys, os, subprocess, time, json, numpy as np
D = '/home/irfan/work/bdf26/v6/proxy/01 Testimoni & Narasumber/'
W = {
 '0378_Testimoni_0925': ['5-20','26-45','65-78','85-100'],
 '0557_Testimoni_1517': ['28-48','49-60','61-74','91-95'],
 '0368_Testimoni_0906': ['0-30','98-110','135-152','155-166'],
 '0373_Testimoni_0916': ['3-17','86-123','160-167','173-188'],
 '0441_Testimoni_1029': ['39-51','53-65','66-76'],
 '0426_Testimoni_1010_Narasumber': ['12-32','66-85'],
 '0427_Testimoni_1012_Narasumber': ['74-120','150-202'],
 '0500_Testimoni_1126_Clay': ['44-72','96-111'],
 '0442_Testimoni_1031': ['39-60'],
 '0365_Testimoni_0859': ['22-34','57-62'],
}
from faster_whisper import WhisperModel
m = WhisperModel('large-v3', device='cpu', compute_type='int8', cpu_threads=6)
todo = list(W)
extra = ['0530_Testimoni_1227_Clay','0531_Testimoni_1235','0379_Testimoni_0927','0387_Testimoni_0935','0473_Testimoni_1105','0491_Testimoni_1119','0499_Testimoni_1126_Clay']
while todo or extra:
    prog = False
    for n in list(extra) + list(todo):
        f = D + n + '.mp4'
        if not os.path.exists(f): continue
        pcm = subprocess.run(['ffmpeg','-v','error','-i',f,'-map','0:a:0','-ac','1','-ar','16000','-f','s16le','-'],capture_output=True).stdout
        x16 = np.frombuffer(pcm, np.int16)
        np.save(f'/home/irfan/work/bdf26/v6/audio16k/{n}.npy', x16)
        print('AUDIO', n, round(len(x16)/16000,1), 's', flush=True)
        if n in W:
            a = x16.astype(np.float32)/32768
            for w in W[n]:
                a0,a1 = map(float,w.split('-'))
                segs,_ = m.transcribe(a[int(a0*16000):int(a1*16000)], language='id', word_timestamps=True, vad_filter=False, beam_size=5,
                    initial_prompt='Bali Digifest, Primakara, konten kreator, workshop, generasi muda.')
                S=[{'s':s.start+a0,'e':s.end+a0,'t':s.text.strip(),'lp':s.avg_logprob,'w':[[q.start+a0,q.end+a0,q.word,q.probability] for q in s.words]} for s in segs]
                json.dump(S, open(f'/home/irfan/work/bdf26/v6/work/L_{n[:4]}_{int(a0)}.json','w'), ensure_ascii=False)
                print('==', n, w, flush=True)
                for s in S: print(f"{s['s']:7.2f}-{s['e']:7.2f} [{s['lp']:.2f}] {s['t']}", flush=True)
            todo.remove(n)
        else: extra.remove(n)
        prog = True
    if not prog: time.sleep(10)
print('DONE', flush=True)
