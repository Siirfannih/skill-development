# Susun SFX dari cues: puncak bunyi jatuh di frame visual (align=peak) atau onset di frame (align=onset).
import json, sys, subprocess, numpy as np, soundfile as sf
SR=48000; DUR=47.6; P='/home/irfan/work/skill-development/projects/jensen-pain-suffering'
I='/home/irfan/sfx/SFXIrfan/'; N=P+'/sfx/internet/'
def load(f, trim=None):
    cmd=['ffmpeg','-v','error','-i',f]+(['-ss',str(trim[0]),'-t',str(trim[1]-trim[0])] if trim else [])+['-ac','2','-ar',str(SR),'-f','f32le','-']
    a=np.frombuffer(subprocess.run(cmd,capture_output=True).stdout,dtype=np.float32).reshape(-1,2).copy()
    a/=max(np.abs(a).max(),1e-6)                      # normalisasi puncak
    n=int((0.25 if trim and trim[1]-trim[0]>1 else 0.01)*SR); a[-n:]*=np.linspace(1,0,n)[:,None]  # fade keluar 10 ms
    return a
C=[ # t, file, align, gain_dB, trim, peran, alasan, dengar
 (0.0,   N+'orchestra_stab_1.mp3','onset',-12,(0,1.6),'stab pembuka','ref 55: stab orkestra di frame 0','strings ensemble / orchestral stab (z +5,0)'),
 (3.467, I+'Pergantianfoto.mp3','onset',-1,(0.0,0.35),'foto muncul','bingkai foto wisuda masuk (nama SFXIrfan: Pergantianfoto)','klik pen/toggle'),
 (5.467, I+'Pergantianfoto.mp3','onset',-1,(0.0,0.35),'foto muncul','foto di bingkai berganti; satu peran satu bunyi','klik pen/toggle'),
 (7.733, I+'ES_Designed, Riser, Transition, Fast, Short, Clean 01 - Epidemic Sound.mp3','peak',-7,None,'menuju punch','ref 55 riser menuju jawaban; memuncak di punch-in f232','reverse cymbal / riser'),
 (7.733, N+'cinematic_impact_hit_4.mp3','onset',-9,(0,1.3),'hantaman punch','punch-in 135 % + flash "I hope suffering"','cinematic hit with long tail'),
 (9.033, N+'vintage_camera_flash_2.mp3','onset',-8,None,'kilatan foto','masuk babak II cetakan foto (ref 55 shutter di kilatan foto)','camera shutter click (z +3)'),
 (12.567,I+'Woosh.mp3','peak',-9,None,'geser cetakan','kamera menyusuri cetakan arsip dengan motion blur (gerak kamera besar terlihat; nama SFXIrfan: Woosh = gerak kamera sedang)','fast/soft air whoosh'),
 (15.267,I+'Cutcontrastransision.mp3','onset',-2,None,'cut kontras','twist ke monokrom (nama SFXIrfan: cut kontras)','pen click / key release'),
 (18.100,N+'snare_hit_reverb_3.mp3','onset',-5,None,'judul','kartu judul SUFFERING (ref 55 snare di judul bab)','cinematic hit / snare (z +4,5)'),
 (23.633,I+'Keyboardtyping.mp3','onset',-6,(0.5,2.5),'ketik','tangan mengetik terlihat di shot keyboard (detail)','keyboard typing fast'),
 (30.767,I+'ES_Swooshes, Whoosh, Big, Cinematic - Epidemic Sound.mp3','peak',-7,None,'ledakan percik','percikan api masuk, gerak besar terlihat','big cinematic whoosh'),
 (32.233,I+'scaningfast.mp3','peak',-5,None,'pan cepat','PCB pan cepat (nama SFXIrfan: scaningfast)','whoosh pendek'),
 (34.590,N+'braam_1.mp3','onset',-5,None,'puncak jawaban','"character." jawaban inti; basmenyebar (SFXIrfan) diganti karena hampir seluruhnya sub-bass, tidak terdengar di speaker HP (audio_phone -37 dB)','cinematic hit with long tail / deep impact (z +3,8)'),
 (44.333,I+'ES_Designed, Riser, Transition, Fast, Short, Clean 01 - Epidemic Sound.mp3','peak',-7,None,'menuju punch','riser menuju kartu hitam; satu peran satu bunyi','reverse cymbal / riser'),
 (44.333,I+'ES_Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz - Epidemic Sound.mp3','onset',-5,None,'punchline','kartu "AMPLE / DOSES" (ref 55 sub drop di punchline)','sub bass drop'),
]
out=np.zeros((int(DUR*SR)+SR,2),np.float32); cues=[]
for t,f,al,g,tr,peran,alasan,dengar in C:
    a=load(f,tr)*10**(g/20); env=np.abs(a).sum(1); pk=int(np.argmax(env)) if al=='peak' else int(np.argmax(env>0.1*env.max()))  # onset = awal energi nyata
    s=int(t*SR)-pk; 
    if s<0: a=a[-s:]; s=0
    out[s:s+len(a)]+=a[:len(out)-s]
    cues.append({'t':round(t,3),'mulai':round(s/SR,3),'frame':round(t*30),'align':al,'file':f.split('/')[-1],'gain_db':g,'peran':peran,'alasan':alasan,'dengar':dengar})
out=out[:int(DUR*SR)]; n=int(1.5*SR); 
sf.write(P+'/audio/sfx.wav',out,SR,subtype='FLOAT'); json.dump({'cues':cues},open(P+'/audio/cues.json','w'),indent=1,ensure_ascii=False)
print(len(cues),'cue', round(len(cues)/DUR,3),'/dtk', 'puncak', round(20*np.log10(np.abs(out).max()),1),'dBFS')
