import numpy as np,soundfile as sf,subprocess,json
SR=48000
def load(p,ss=None,to=None):
    cmd=['ffmpeg','-v','error']+(['-ss',str(ss)] if ss is not None else [])+['-i',p]+(['-t',str(to-ss)] if to else [])+['-vn','-ac','1','-ar',str(SR),'-af','loudnorm=I=-18:TP=-2','-f','f32le','-']
    return np.frombuffer(subprocess.run(cmd,capture_output=True,check=True).stdout,dtype=np.float32).copy()
C='/home/claude/clips/'
plan=[('lead',0.35),('vo','01_hook'),('gap',0.40),('vo','02_janji'),('gap',0.45),('vo','03_kenyataan'),('gap',0.35),
 ('clip','jensen',C+'jensen_quote.mp4',0.05,4.60, "You're not going to lose your job to an AI, but you're going to lose your job to somebody who uses AI."),('gap',0.35),
 ('vo','04_visi'),('gap',0.35),('clip','altman',C+'altman_quote.mp4',0.08,3.72,"It is a legitimate single-person billion-dollar company, as far as I can tell."),('gap',0.40),
 ('vo','05_tidakterlihat'),('tail',2.6)]
out=[];t=0;segs=[];words=[]
for p in plan:
    if p[0] in('lead','gap','tail'):
        a=np.zeros(int(p[1]*SR),np.float32)
    elif p[0]=='vo':
        a=load(f'vo/v1t/{p[1]}.wav')
        for w,s,e in json.load(open(f'vo/v1t/{p[1]}.words.json')): words.append({'w':w,'s':round(t+s,3),'e':round(t+e,3),'seg':p[1]})
    else:
        a=load(p[2],p[3],p[4]); n=int(0.03*SR); a[:n]*=np.linspace(0,1,n); a[-n:]*=np.linspace(1,0,n)
    if p[0] in('vo','clip'): segs.append({'id':p[1],'s':round(t,3),'e':round(t+len(a)/SR,3),**({'text':p[5],'src':p[2],'in':p[3]} if p[0]=='clip' else {})})
    out.append(a); t+=len(a)/SR
y=np.concatenate(out); sf.write('vo/temp_master_v1.wav',y,SR)
json.dump({'fps':30,'duration':round(t,3),'segments':segs,'words':words},open('vo/vo.json','w'),ensure_ascii=False,indent=1)
print('total',round(t,2)); [print(s['id'],s['s'],s['e']) for s in segs]
