import json,re,subprocess,sys
sys.path.insert(0,'/home/claude/thegap/tools')
CH={
'c01':"Ada jarak antara seleramu dan kemampuanmu. | Ira Glass menyebutnya the gap.",
'c02':"Bertahun-tahun, karyamu akan mengecewakanmu. Dan rasa kecewa itu… tanda taste-mu sedang bekerja.",
'c03':"Sekarang, AI menutup jarak itu dalam tiga detik. Kamu bisa bangun apapun dengan AI. | Dan tastemu… berhenti tumbuh.",
'c04':"Faktanya, kita takut digantikan AI. Tapi di satu sisi, kita menyerahkan semua yang enggan kita kerjakan kepadanya. Edit video. Menulis. Mencari kerja. Mencari uang.",
'c05':"Hasilnya jadi dalam hitungan detik, dan kita merasa cukup. | Dan perlahan… semua karya mulai terlihat sama.",
'c06':"Ira Glass bilang, jarak itu hanya tertutup lewat banyak karya. AI memberimu ribuan. Tapi tidak satu pun… yang membuat kamu kecewa.",
'c07':"Karena taste tumbuh dari tiga hal yang tidak bisa di-generate. | Pengalaman: semua yang pernah kamu coba, dan gagal. Direction: berani memilih satu, lalu membuang sisanya. Cara melihat: tahu ada yang salah, sebelum orang lain menyadarinya.",
'c08':"Rick Rubin tidak bisa memainkan alat musik. Tapi ia memproduseri Johnny Cash dan Adele. Yang ia bawa ke studio hanya satu… ia tau apa yang bagus.",
'c09':"AI bisa membuat sesuatu dengan cepat, menciptakan bisnis dalam satu malam, meniru cara kerjamu… | tapi tidak dengan seleramu.",
}
# gap after chunk (s) — longer at act hinges
GAP={'c01':0.7,'c02':0.6,'c03':0.9,'c04':0.7,'c05':1.1,'c06':0.9,'c07':1.0,'c08':0.8,'c09':0}
LEAD=0.3
def syl(w): return max(1,len(re.findall(r'[aiueo]+',w.lower().replace('ai','a'))))
def est(text):
    t=0;out=[]
    for tok in text.split():
        if tok=='|': t+=0.6; continue
        clean=re.sub(r'[^\w\-]','',tok)
        d=0.075+0.16*syl(clean); out.append([tok,round(t,3),round(t+d,3)]); t+=d
        if tok.endswith('…'): t+=0.45
        elif tok.endswith(('.',':')): t+=0.5
        elif tok.endswith(','): t+=0.25
    return out,t
def real(c,text):
    return real2(c,text)
def _old(c,text):
    from wh import load
    from faster_whisper import WhisperModel
    m=WhisperModel('small',device='cpu',compute_type='int8')
    segs,_=m.transcribe(load(c+'_trim.wav'),language='id',word_timestamps=True)
    ws=[[w.word.strip(),w.start,w.end] for s in segs for w in s.words]
    toks=[x for x in text.split() if x!='|']
    # merge whisper pieces to script tokens by char length
    out=[];i=0
    for tok in toks:
        target=len(re.sub(r'[^\w]','',tok)); acc='';s=ws[i][1]
        while len(re.sub(r'[^\w]','',acc))<target-1 and i<len(ws): acc+=ws[i][0]; e=ws[i][2]; i+=1
        out.append([tok,round(s,3),round(e,3)])
    dur=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',c+'_trim.wav'],capture_output=True,text=True).stdout)
    return out,dur
import os, difflib
os.chdir('/home/claude/thegap/vo/v2')
_M=None
def norm(x): return re.sub(r'[^a-z]','',x.lower().replace('3','tiga').replace('1','satu'))
def real2(c,text):
    global _M
    from wh import load
    from faster_whisper import WhisperModel
    if _M is None: _M=WhisperModel('small',device='cpu',compute_type='int8')
    segs,_=_M.transcribe(load(c+'_trim.wav'),language='id',word_timestamps=True)
    ws=[(w.word,w.start,w.end) for s in segs for w in s.words]
    A='';At=[]
    for w,s,e in ws:
        n=norm(w)
        for k,ch in enumerate(n): A+=ch; At.append(s+(e-s)*k/max(1,len(n)))
    toks=[x for x in text.split() if x!='|']
    B='';Bi=[]
    for i,t in enumerate(toks):
        for ch in norm(t): B+=ch; Bi.append(i)
    sm=difflib.SequenceMatcher(None,B,A,autojunk=False)
    mp={}
    for a,b,n in sm.get_matching_blocks():
        for k in range(n): mp[a+k]=At[b+k]
    out=[];pos=0
    for i,t in enumerate(toks):
        L=len(norm(t)); idx=[pos+k for k in range(L) if pos+k in mp]; 
        st=mp[idx[0]] if idx else None; en=mp[idx[-1]] if idx else None
        out.append([t,st,en]); pos+=L
    for i in range(len(out)):
        if out[i][1] is None: out[i][1]=out[i-1][2] if i else 0; out[i][2]=out[i][1]+0.2
    out=[[t,round(s,3),round(e,3)] for t,s,e in out]
    dur=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',c+'_trim.wav'],capture_output=True,text=True).stdout)
    return out,dur
words=[];chunks=[];t=LEAD
for c,text in CH.items():
    if os.path.exists(c+'_trim.wav'): ws,d=real(c,text); src='real'
    else: ws,d=est(text); src='est'
    chunks.append({'id':c,'start':round(t,3),'dur':round(d,3),'src':src})
    for w,s,e in ws: words.append({'w':w,'s':round(t+s,3),'e':round(t+e,3),'c':c})
    t+=d+GAP[c]
json.dump({'chunks':chunks,'words':words,'total':round(t+3.6,3)},open('/home/claude/thegap/video/src/vo.json','w'),indent=0)
for c in chunks: print(c)
print(len(words),'words total',round(t+2.6,2))
