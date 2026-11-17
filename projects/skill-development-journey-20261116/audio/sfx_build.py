"""Fase 4 SFX: cues.json + stem_sfx.wav dari objects.json (1 SFX per objek/visual penting, satu peran satu file)."""
import json,re,subprocess,sys
import numpy as np,soundfile as sf
from pathlib import Path
SR=48000
P=Path(__file__).resolve().parent;R=P.parent
D='/home/irfan/sfx/SFXIrfan/'
O0=json.load(open(R/'objects.json'));SENYAP={(18.333,'S09'),(19.467,'S12')}
O=[]
for o in O0:
    o=dict(o)
    if (o['t'],o['lapisan']) in SENYAP:
        o['senyap']=True;o['alasan']='rentetan tumpukan slop: dua elemen dibiarkan senyap supaya tidak >5 cue dalam 2 dtk (Lantai E24); bunyi slop tetangga (+-0,3 dtk) menutupnya'
    if o['nama'].startswith('kartu Dicatat terbang'):
        o['catatan']='audit 6: cue digeser ke frame puncak (tooltip mendarat di dock) 68,80 dtk; t builder %.3f = awal terbang'%o['t'];o['t']=68.80;o['frame']=2062
    if o['peran']=='tulisan-tangan':
        o['senyap']=True;o['alasan']='tulisan tangan = teks KT yang ditulis mengikuti ucapan: senyap seperti KT per kata (Lantai E24)'
    O.append(o)
json.dump(O,open(P/'objects.json','w'),ensure_ascii=False,indent=1)
OUT_ALL=O
O=[o for o in O if not o.get('senyap')]
DEN=json.load(open(P/'sfx_dengar.json'))
ES=lambda s:f"ES_{s} - Epidemic Sound.mp3"
ROLES={ # file, mode, pre, length, dB, fade, alasan
 'kata-hero':dict(file='Cut.mp3',mode='onset',pre=0.003,len=0.45,db=-5,fade=0.15,why='slab/kata raksasa masuk: klik penekanan renyah (Cut.mp3: crisp interface click) yang terdengar di HP (Irfan 17 Nov: AI SLOP/DECISION harus berbunyi; thud sub lama tak terdengar)'),
 'kertas':dict(file='../Kenyset/flipcard-91468.mp3',mode='onset',pre=0.005,len=0.6,db=-6,fade=0.2,why='"habis banget": bunyi kertas dibalik (Irfan 17 Nov)'),
 'transisi-dunia':dict(file='Woosh.mp3',mode='peak',pre=0.45,len=1.0,db=-4,fade=0.35,why='dunia berganti (repo, aplikasi, relay): whoosh udara tipis, puncak di frame pergantian'),
 'runtuh':dict(file=ES('Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz'),mode='onset',pre=0.01,len=1.6,db=-8,fade=0.6,why='tumpukan AI slop runtuh saat grade turun dan slab AI SLOP masuk (B2b)'),
 'objek-mendarat':dict(file='pop up.mp3',mode='onset',pre=0.004,len=0.25,db=-7,fade=0.05,why='kartu/bubble/karakter/daftar muncul atau mendarat: pop renyah pendek'),
 'kunci-slam':dict(file='Kinetictypography(gunakansecaraacak).mp3',mode='onset',pre=0.004,len=0.35,db=-6,fade=0.12,why='kata kunci slam tampil (bukan per kata): tick lembut'),
 'kinetik-cincin':dict(file='Cutcontrastransision.mp3',mode='onset',pre=0.002,len=0.3,db=-6,fade=0.08,why='kata cincin di belakang kepala masuk: klik pena kontras tipis'),
 'ketik':dict(file='Keyboardtyping.mp3',mode='onset',pre=0.0,len=0.9,db=-6,fade=0.15,start=1.0,why='"/" diketik di kolom perintah (B3a): ketikan keyboard pendek'),
 'pesan':dict(file=ES('User Interface, Alert, Notification, Message, Text'),mode='onset',pre=0.005,len=0.8,db=-7,fade=0.3,why='pesan/amplop agen masuk (B5b): ding notifikasi lembut'),
 'terverifikasi':dict(file=ES('User Interface, Click, UI Buttons, Confirm, Menu'),mode='onset',pre=0.003,len=0.5,db=-7,fade=0.2,why='centang hijau loop pembelajaran tertutup: satu konfirmasi bersih'),
 'slop':dict(file=ES('Scifi, Computer, Short Beeps, Glitch 02'),mode='onset',pre=0.003,len=0.3,db=-8,fade=0.1,why='elemen dekor AI slop menumpuk: glitch/clutter tipis, satu file untuk seluruh tumpukan'),
 'putus':dict(file=ES('User Interface, Glitch, Glitch Databend 04'),mode='onset',pre=0.01,len=0.5,db=-7,fade=0.25,why='kata putus-putus terpecah: glitch digital tipis'),
 'kacau':dict(file='Katapertama.mp3',mode='onset',pre=0.002,len=0.3,db=-8,fade=0.1,why='kata kacau (habis banget, lintas agent, kesalahan): klik glitch renyah'),
 'klik':dict(file='Enter.mp3',mode='onset',pre=0.003,len=0.19,db=-8,fade=0.05,why='kursor mengklik saran perintah (B3a): ketukan tombol tegas'),
 'sapa':dict(file='../Kenyset/marimba-bloop-3-188151.mp3',mode='onset',pre=0.004,len=0.45,db=-8,fade=0.15,why='tokoh menyapa lewat bubble "Hi, aku …" (D-401): bloop marimba ceria, beda dari pop objek'),
 'coretan':dict(file='../Kenyset/message-envoye-iphone-apple-391098.mp3',mode='onset',pre=0.004,len=0.4,db=-10,fade=0.12,why='panah goresan digambar (D-406): decit seperti spidol di permukaan licin (earshot: finger squeaking on glass); pustaka lokal tidak punya SFX spidol'),
 'penutup':dict(file='Lasertransision.mp3',mode='onset',pre=0.002,len=0.36,db=-8,fade=0.2,why='setelah kalimat terakhir: ting penutup tenang'),
}
import os
RUNTUH_SHIFT=float(os.environ.get('RUNTUH_SHIFT','-0.03'))
PRI=['runtuh','transisi-dunia','kata-hero','sapa','coretan','kertas','terverifikasi','pesan','slop','ketik','klik','objek-mendarat','kunci-slam','kinetik-cincin','putus','kacau']
def role_of(o):
    p,n=o['peran'],o['nama']
    if p=='bubble-sapa':return 'sapa'
    if p=='coretan':return 'coretan'
    if p in('karakter','kartu-mendarat','bubble-pilihan'):return 'objek-mendarat'
    if p in('hero','slab-di-belakang-kepala','slab-di-depan'):return 'kata-hero'
    if p=='slot-opaque':return 'objek-mendarat'   # onset slot meja 3D: bunyi lembut (whoosh masuk/keluar ada di lingkaran wajah dan postingan IG; jarak whoosh >=1 dtk)
    if p in('dunia-transisi','wajah-lingkaran'):return 'transisi-dunia'
    if p=='kata-kunci-slam':return 'kunci-slam'
    if p=='kata-cincin':return 'kinetik-cincin'
    if p in('slop-dekor','slop-teks'):return 'slop'
    if p=='grade':return 'runtuh'
    if p=='kata-terputus':return 'putus'
    if p=='kata-kacau':return 'kertas' if n.lower().startswith('habis') else 'kacau'
    if p=='item-ui':
        if n.startswith('klik'):return 'klik'
        if n.startswith('saran'):return 'objek-mendarat'
        if 'diketik' in n or n.startswith('/'):return 'ketik'
        if 'pesan' in n or 'amplop' in n or n.startswith('komentar') or 'aliran' in n:return 'pesan'
        if 'centang' in n:return 'terverifikasi'
        return 'objek-mendarat'
    raise SystemExit('peran tak dikenal '+p)
objs=sorted(O,key=lambda o:o['t'])
groups=[];cur=[]
for o in objs:
    if cur and o['t']-cur[0]['t']<=0.19: cur.append(o)
    else:
        if cur:groups.append(cur)
        cur=[o]
groups.append(cur)
cues=[]
for g in groups:
    role=min((role_of(o) for o in g),key=PRI.index)
    t=round((g[0]['t']+g[-1]['t'])/2,3)
    if role=='runtuh': t=round(t+RUNTUH_SHIFT,3)
    cues.append(dict(t=t,role=role,objs=[o['nama'] for o in g],lapisan=[o['lapisan'] for o in g]))
# temuan audit 17 Nov (frame 29,97): peran yang sama dengan cue sejenis (satu peran satu file)
for t,role,why,db,ln in ((34.731,'transisi-dunia','transisi lingkaran wajah <-> layar (audit 1, digeser +0,463 dtk ke suara R7)',None,None),(50.384,'objek-mendarat','kartu paket kedua masuk (audit 1, +0,434)',None,None),
    (53.558,'transisi-dunia','kartu keluar (audit 2, +0,405): whoosh gain rendah',-9,None),(72.075,'transisi-dunia','zoom kartu ke wajah menuju B6 (audit 1, +0,534; R4 ronde 3: digeser ke frame cut slot f2160)',None,None),
    (28.929,'ketik','"/apple" diketik di kolom perintah (f867, audit 6): ketikan halus',-10,0.40),(30.554,'ketik','"cinematic" diketik di kolom perintah (audit 6): ketikan halus',-10,0.66),
    (21.55,'runtuh','bingkai neon jatuh (f646, audit 6): sub-drop rendah',-10,None)):
    cues.append(dict(t=t,role=role,objs=[why],lapisan=['audit'],db=db,len=ln))
# Irfan 17 Nov: AI SLOP masuk bersamaan grade/runtuh (bass dive tak terdengar di HP) -> klik penekanan tersendiri
for o in OUT_ALL:
    if o['nama']=='AI SLOP':cues.append(dict(t=round(o['t']+0.13,3),role='kata-hero',objs=['AI SLOP (klik penekanan, >=100 ms setelah runtuh)'],lapisan=[o['lapisan']]))
    if o['lapisan']=='O_slot b10a':pass
for o in OUT_ALL:
    if o['peran']=='slot-opaque':
        SLOT_WHOOSH=72.075  # transisi-dunia (f2160): ketik harus >=100 ms sesudahnya (gerbang E24)   # shot meja 3D: Claude mengetik sebelum menoleh (Irfan 17 Nov: shot dipanjangkan) -> ketikan lembut
        import json as _j;_t0=[l for l in _j.load(open(R/'lego/lego.json'))['lapisan'] if l['id']=='b10a_meja3d'][0]['t']+0.0056  # R4 ronde 2: ikut t slot (offset timing.start - slot lama 72,2055)
        cues.append(dict(t=round(max(_t0+0.1,SLOT_WHOOSH+0.102),3),role='ketik',objs=['Claude mengetik di meja 3D'],lapisan=[o['lapisan']],db=-12,len=1.6))
cues.sort(key=lambda c:c['t'])
cues.append(dict(t=83.55,role='penutup',objs=['ekor setelah kalimat terakhir'],lapisan=[]))
# render stem
def load(f):
    raw=subprocess.run(['ffmpeg','-v','error','-i',D+f,'-ac','1','-ar',str(SR),'-f','f32le','-'],capture_output=True).stdout
    return np.frombuffer(raw,np.float32).copy()
cache={}
def excerpt(role,db=None,ln=None):
    s=dict(ROLES[role]);
    if db is not None: s['db']=db
    if ln is not None: s['len']=ln;s['fade']=min(s['fade'],ln*0.3)
    y=cache.setdefault(s['file'],load(s['file']))
    hop=int(0.002*SR);env=np.array([np.sqrt(np.mean(y[i:i+hop]**2)) for i in range(0,len(y)-hop,hop)])
    if s['mode']=='peak':
        c=int(np.argmax(env))*hop;a=max(0,c-int(s['pre']*SR));pk=c-a
    else:
        a0=int(s.get('start',0)*SR)
        e=env[a0//hop:a0//hop+int(1.5*SR)//hop] if a0 else env[:int(2.0*SR)//hop]
        thr=0.35*e.max();i=int(np.argmax(e>thr));on=a0+i*hop
        a=max(0,on-int(s['pre']*SR));pk=on-a
    seg=y[a:a+int(s['len']*SR)].copy()
    n=min(len(seg),int(s['fade']*SR));seg[-n:]*=np.linspace(1,0,n)**2
    seg[:int(0.002*SR)]*=np.linspace(0,1,int(0.002*SR))
    seg=seg/(np.abs(seg).max()+1e-9)*10**(s['db']/20)
    return seg,pk/SR
import soundfile as _sf
NS=_sf.info(str(R/'edit/suara.wav')).frames;dur=NS/SR;stem=np.zeros(NS+SR,np.float32);out=[]
for c in cues:
    seg,pk=excerpt(c['role'],c.get('db'),c.get('len'));s=dict(ROLES[c['role']])
    if c.get('db') is not None: s['db']=c['db']
    i=int(round((c['t']-pk)*SR))
    if i<0:seg=seg[-i:];i=0
    end=min(len(stem),i+len(seg));stem[i:end]+=seg[:end-i]
    f=s['file'];out.append(dict(t=c['t'],peran=c['role'],alasan=f"{s['why']} [{' + '.join(c['objs'])[:90]}]",file=f,dengar=DEN[f].split('Sounds most like: ')[1].split(' [')[0] if 'Sounds most like' in DEN.get(f,'') else '',
        dB=s['db'],terikat_ke_visual=c['lapisan'],offset_puncak_s=round(pk,3),mode=s['mode']))
def _rev(p):
    lo,hi=0.0,1.0
    for _ in range(40):
        m=(lo+hi)/2;x=3*(1-m)**2*m*.22+3*(1-m)*m*m*.36+m**3
        lo,hi=(m,hi) if x<p else (lo,m)
    m=(lo+hi)/2;return 3*(1-m)**2*m*1+3*(1-m)*m*m*1+m**3
tick=load('../Kenyset/immersivecontrol-button-click-sound-463065.mp3');tick=tick/(np.abs(tick).max()+1e-9)*10**(-13/20)
for o in OUT_ALL:
    if o['peran']!='kartu-mendarat':continue
    angka=int(o['nama'].split()[-1].rstrip('x×'));t0=o['t']-0.43;fl=round(0.45*30)
    prev=1;ts=[]
    for f in range(fl+4,fl+4+23):
        v=round(1+(angka-1)*_rev(min(1,(f-fl-4)/22)))
        if v>prev:ts.append(t0+f/30);prev=v
    for t in ts:
        i=int(round(t*SR));stem[i:i+len(tick)]+=tick[:len(stem)-i]
    out.append(dict(t=round(ts[0],3),peran='hitung',alasan=f'hitungan angka kartu naik ke {angka}: tick per kenaikan ({len(ts)} tick, Irfan 17 Nov)',file='../Kenyset/immersivecontrol-button-click-sound-463065.mp3',dengar=DEN['../Kenyset/immersivecontrol-button-click-sound-463065.mp3'].split('Sounds most like: ')[1].split(' [')[0],dB=-13,terikat_ke_visual=[o['lapisan']],offset_puncak_s=0.0,mode='onset'))
out.sort(key=lambda c:c['t'])
stem=stem[:NS]
sf.write(P/'stem_sfx.wav',stem,SR,subtype='FLOAT')
json.dump(out,open(P/'cues.json','w'),ensure_ascii=False,indent=1)
print(len(cues),'cue;',len(OUT_ALL),'objek; peak stem',round(float(20*np.log10(np.abs(stem).max())),1),'dBFS')
import collections;print(collections.Counter(c['role'] for c in cues))
ts=[c['t'] for c in cues];print('min gap',min(b-a for a,b in zip(ts,ts[1:])),'max per 2s',max(sum(1 for u in ts if t<=u<t+2) for t in ts))
