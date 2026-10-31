"""Mix v13 — audit audio Irfan/Gemini 31 Okt 21:37 (Modul 1–5). Lihat skill motion-graphic/references/audio.md §14.6.
- Klip narasumber: rantai Modul 1 di assemble12.py + handle J/L-cut; di sini disamakan ke VO −1,25 LU (VO −14 / klip −15…−15,5 LUFS di master)
- Musik tidak pernah 0 di bawah klip: turun 6 dB dengan ramp 0,4 / 0,5 dtk; tidak ada beat drop ke hening
- Sub-pad hangat (sub 20–150 Hz target 25–55 % daya), musik di bawah VO −22…−25 LUFS
- Palet SFX Modul 3 + velocity-peak Modul 4 + level puncak absolut Modul 5; penutup: 300 ms pre-drop → sub drop + ekor synth 3 dtk
"""
import json,subprocess,sys,numpy as np,soundfile as sf,pyloudnorm as pyln
from scipy.signal import butter,sosfilt
from scipy.ndimage import minimum_filter1d,maximum_filter1d
SR=48000; t2i=lambda s:int(round(s*SR)); db2=lambda g:10**(g/20)
P=json.load(open(sys.argv[1])) if len(sys.argv)>1 else {}
G=lambda k,d:P.get(k,d)
meter=pyln.Meter(SR)
def load(p,a=0.0,b=None,ch=2):
    args=['ffmpeg','-v','error','-ss',str(a)]+(['-t',str(b-a)] if b else [])+['-i',p,'-ac',str(ch),'-ar',str(SR),'-f','f32le','-']
    x=np.frombuffer(subprocess.run(args,capture_output=True).stdout,np.float32).copy(); return x.reshape(-1,ch) if ch>1 else x
T=json.load(open('timeline.json')); N=t2i(T['total']); BL={b.get('name'):b for b in T['blocks'] if b['kind']!='pad'}
dia,_=sf.read('stem_dialog.wav'); dia=np.pad(dia,(0,max(0,N-len(dia))))[:N]
JEN=BL['jensen']; J0=JEN['t']; J1=J0+JEN['dur']
# dinamika narator per babak (blueprint: B1 dekat & tegas, B2 terukur, B3 intim) → memberi ruang LRA tanpa kompresi rata
vg=np.ones(N); B2s=BL['s3']['t']; B3s=J0-1.5
for a_,b_,gdb in [(0,B2s,G('vo_b1_db',0.0)),(B2s,B3s,G('vo_b2_db',0.0)),(B3s,T['total'],G('vo_b3_db',0.0))]: vg[t2i(a_):t2i(b_)]=db2(gdb)
_e06=[w for w in T['words'] if w['src']=='s6' and w['w'].lower().startswith('tapi')][0]['s']; vg[t2i(_e06):]*=db2(G('vo_end_db',0.0))   # penutup lebih intim (06e→06g)
vg=np.convolve(vg,np.ones(t2i(0.3))/t2i(0.3),'same')
for b_ in T['blocks']:   # tiap blok VO/klip disamakan loudness-nya dulu, baru dinamika per babak
    if b_['kind'] in ('vo','clip'):
        i_,j_=t2i(b_['t']),t2i(b_['t']+b_['dur']); l_=meter.integrated_loudness(dia[i_:j_])
        if np.isfinite(l_): dia[i_:j_]*=db2((G('vo_lufs',-16.0)-(1.0 if b_['kind']=='clip' else 0.0))-l_)
dia=dia*vg
# v13 (audit Gemini terverifikasi: Jensen −21,3 / Altman −20,4 dB RMS vs narator −14…−16,5): klip = LUFS blok VO sebelumnya −1 LU
_bl=[b_ for b_ in T['blocks'] if b_['kind'] in ('vo','clip')]
for _k,b_ in enumerate(_bl):
    if b_['kind']=='clip':
        _pv=[x for x in _bl[:_k] if x['kind']=='vo']; _v=_pv[-1] if _pv else [x for x in _bl if x['kind']=='vo'][0]
        lv=meter.integrated_loudness(dia[t2i(_v['t']):t2i(_v['t']+_v['dur'])]); i_,j_=t2i(b_['t']),t2i(b_['t']+b_['dur']); lc=meter.integrated_loudness(dia[i_:j_])
        if np.isfinite(lv) and np.isfinite(lc): dia[i_:j_]*=db2(lv-G('clip_below_vo',1.25)-lc)
# ekor ruang tipis pada VO (narator tidak lagi «kering terpotong»): IR noise eksponensial 0,6 dtk, LPF 3 kHz, send −22 dB
# v14: reverb VO dihapus (tidak ada IR)
_vo=np.zeros_like(dia)
for b_ in T['blocks']:
    if b_['kind']=='vo': _vo[t2i(b_['t']):t2i(b_['t']+b_['dur'])]=dia[t2i(b_['t']):t2i(b_['t']+b_['dur'])]
# v14: VO kering — reverb buatan dihapus (sumber gema yang dikeluhkan Irfan 31 Okt 23:34; audit independen sd_v14)
# v12: room tone jembatan antar pembicara (tanpa gap)
from roomtone import add_roomtone
_vr=float(np.sqrt(np.mean(dia[np.abs(dia)>0.01]**2)))
# QC 1 Nov: ujung klip Altman — blip suku kata berikut sesudah «tell.» dipotong bersih dengan fade 50 ms
_a=BL['altman']; _e=_a['t']+_a['dur']
if _e>74.4: dia[t2i(74.40):t2i(74.45)]*=np.linspace(1,0,t2i(0.45)-t2i(0.40)) if False else np.linspace(1,0,t2i(74.45)-t2i(74.40)); dia[t2i(74.45):t2i(_e)]=0
dia,_rt=add_roomtone(dia,T,_vr); json.dump(_rt,open('roomtone_log.json','w'),indent=0)
# ── musik: satu trek utuh dari detik 0 sumber
bed=load('/home/claude/music_hunt/dl2/188.mp3',G('music_offset',0.0),G('music_offset',0.0)+T['total']+0.5)[:N]
bed=np.pad(bed,((0,N-len(bed)),(0,0)))
# v10: ostinato ritmis 117,5 BPM (E minor) di 0:00→beat drop dan sesudah Jensen→06e; Echoes jadi bed gelap (LPF) di bawahnya
W_=T['words']; POST=BL['s4']['t']; E06=[w for w in W_ if w['src']=='s6' and w['w'].lower().startswith('tapi')][0]['s']
ost=np.zeros((N,2))
def put_ost(f,t0,t1,rel=1.2):
    x=load(f,0,t1-t0+rel); i0=t2i(t0); n=min(len(x),N-i0); y=x[:n].copy(); r=t2i(rel); y[-r:]*=np.linspace(1,0,r)[:,None]**2; ost[i0:i0+n]+=y
put_ost('/home/claude/v9/music10/OST_A1x.wav',0.0,J0-0.9,rel=0.25)
put_ost('/home/claude/v9/music10/OST_B2.mp3',POST,E06,rel=1.5)
ostreg=np.zeros(N); ostreg[:t2i(J0-0.9)]=1; ostreg[t2i(POST):t2i(E06)]=1; ostreg=np.convolve(ostreg,np.ones(t2i(1.0))/t2i(1.0),'same')
lp=np.stack([sosfilt(butter(2,1200,'lp',fs=SR,output='sos'),bed[:,c]) for c in (0,1)],1)
bed=bed*(1-ostreg)[:,None]+lp*db2(G('bed_under_ost_db',-9.0))*ostreg[:,None]
kos=meter.integrated_loudness(ost[ost.any(1)]); kbd=meter.integrated_loudness(bed[t2i(POST):t2i(E06)])
ost*=db2(kbd+G('ost_over_bed_db',6.0)-kos)
mus=bed+ost
mus=mus-np.stack([sosfilt(butter(2,[2500,6000],'bp',fs=SR,output='sos'),mus[:,c]) for c in (0,1)],1)*0.4   # ruang untuk vokal (<4 kHz dominan)
# ducking sidechain dari VO (attack 30 ms, release 400 ms)
fr=t2i(0.02); e=np.array([np.sqrt(np.mean(dia[i:i+fr]**2)) for i in range(0,N,fr)]); vo=np.sqrt(np.mean(dia[np.abs(dia)>0.01]**2))
on=(e>vo*db2(-24)).astype(float); g=np.zeros_like(on); v=0; rel=np.exp(-1/(G('duck_rel_s',0.25)/0.02)); att=1-np.exp(-1/(0.03/0.02))
for i,o in enumerate(on): v=v+(o-v)*att if o>v else v*rel; g[i]=v
duck=np.repeat(g,fr)[:N]; depth=db2(G('duck_db',-7))*(1-ostreg)+db2(G('duck_ost_db',-5))*ostreg; dk=1-duck*(1-depth)   # ostinato tetap terdengar di bawah VO
# target per wilayah = level BED musik (sebelum ducking; terdengar di sela kalimat): [0,J0-SILENCE)=-26 ; mute saat Jensen ; setelah: fade-in pelan ke -20
def seg_gain(x,target):
    l=meter.integrated_loudness(x); return db2(target-l) if np.isfinite(l) else 1.0
pre_end=J0-1.5   # 1,5 dtk sebelum Jensen = beat drop (musik keluar pelan)
a=mus[:t2i(pre_end)]; k1=seg_gain(a,G('lufs_pre',-26.0)-G('master_comp',0.0))
b=mus[t2i(J1):]; k2=seg_gain(b,G('lufs_post',-20.0)-G('master_comp',0.0))
env=np.zeros(N)
env[:t2i(J1)]=k1; xf_=t2i(1.6); env[t2i(J1):]=k2; env[t2i(J1):t2i(J1)+xf_]=k1+(k2-k1)*np.linspace(0,1,xf_)   # v13: tidak ada beat drop ke 0
cenv=np.ones(N)   # Modul 2.3: BGM turun 6 dB di bawah klip narasumber, ramp masuk 0,4 dtk (12 f) / keluar 0,5 dtk (15 f)
for b_ in T['blocks']:
    if b_['kind']=='clip':
        a_,c_=t2i(b_['t']),t2i(b_['t']+b_['dur']); r1,r2=t2i(0.4),t2i(0.5); lo=db2(G('clip_bgm_db',-6.0))
        cenv[a_:c_]=np.minimum(cenv[a_:c_],lo); _u=np.linspace(0,1,a_-max(0,a_-r1)); cenv[max(0,a_-r1):a_]=np.minimum(cenv[max(0,a_-r1):a_],lo+(1-lo)*(0.5+0.5*np.cos(np.pi*_u)))   # ramp kosinus (QC: duck linear terasa mendadak)
        _u=np.linspace(0,1,len(cenv[c_:c_+r2])); cenv[c_:c_+r2]=np.minimum(cenv[c_:c_+r2],lo+(1-lo)*(0.5-0.5*np.cos(np.pi*_u)))
env*=cenv
sw=t2i(G('end_swell_s',24.0)); env[-sw:]*=db2(np.linspace(0,G('end_swell_db',5.0),sw))   # swell naik di akhir (resolusi)
tail=t2i(2.5); env[-tail:]*=np.linspace(1,0,tail)
mus=mus*(env*dk)[:,None]
# v13: sub-pad hangat di bawah seluruh musik (audit: sub 5,8 % vs ref 39–55 %). Di bawah klip Jensen tetap ada, −10 dB (tidak mati ke 0).
# v14: sub-pad sinus sintetis dihapus (bukan sumber nyata; dengung 132 dtk)
# Modul 5: musik (termasuk sub-pad) di bawah VO −22…−25 LUFS di master
_voa=duck>0.6
_lu=meter.integrated_loudness(mus[_voa]) if _voa.sum()>SR else -70
if np.isfinite(_lu): mus*=db2((G('mus_under_vo',-23.5)-G('master_comp',0.0))-_lu)
# ── SFX (maks 15): file, trim, waktu, dB relatif VO, LPF, pan
# v12 (Irfan 31 Okt 20:12): SFX per event visual (skill §14.3) — cues11 + cue per babak dari sfx/cues_*.json, dikurangi replace_*
from sfx14 import render_sfx
C=json.load(open('cues14s.json'))
sfx,placed=render_sfx(C,N,dia,G('master_comp',0.0))
# ── penutup (Modul 3.6)
_b3=[q for q in C if q['role']=='impact' and q['t']>T['total']-4]
if _b3:
    tb=_b3[0]['t']; i_a,i_b=t2i(tb-0.30),t2i(tb); r_=t2i(0.03)
    dip=np.ones(N); dip[i_a:i_b]=db2(-18); dip[i_a-r_:i_a]=np.linspace(1,db2(-18),r_); dip[i_b:i_b+t2i(0.05)]=np.linspace(db2(-18),1,t2i(0.05))   # v14: tarik napas −18 dB, bukan hening mati
    mus*=dip[:,None]; sfx[:i_b]*=dip[:i_b,None]
    # v14: ekor akor sinus sintetis dihapus; penutup = bass drop + ekor musik asli
# ── jumlah + master
mix=np.stack([dia,dia],1)+mus+sfx
for nm,x in [('dialog_g',dia),('music',mus),('sfx',sfx),('mix_raw',mix)]: sf.write(f'stem_{nm}.wav',x.astype(np.float32),SR,subtype='FLOAT')
g=-14.0-meter.integrated_loudness(mix)
if abs(g)>0.3 and not P.get('_pass2'):
    P2=dict(P,master_comp=round(G('master_comp',0.0)+g,2),_pass2=True); json.dump(P2,open('/tmp/_p2.json','w')); sys.exit(subprocess.run([sys.executable,sys.argv[0],'/tmp/_p2.json']).returncode)
m=mix*db2(g)
th=db2(-2.2); k=t2i(0.005); gr=np.minimum(1,th/np.maximum(np.abs(m).max(1),1e-9)); gr=minimum_filter1d(gr,2*k+1); gr=np.convolve(gr,np.ones(k)/k,'same'); gr=minimum_filter1d(gr,k)
m=np.clip(m*gr[:,None],-db2(-1.6),db2(-1.6)); sf.write('mix_master.wav',m.astype(np.float32),SR,subtype='PCM_24')
json.dump(placed,open('placed14.json','w'),indent=0,ensure_ascii=False)
# ── gerbang lulus
r=subprocess.run(['ffmpeg','-hide_banner','-i','mix_master.wav','-af','ebur128=peak=true','-f','null','-'],capture_output=True,text=True).stderr
import re
I=float(re.findall(r'I:\s+(-?[\d.]+) LUFS',r)[-1]); LRA=float(re.findall(r'LRA:\s+([\d.]+) LU',r)[-1]); TP=float(re.findall(r'Peak:\s+(-?[\d.]+) dBFS',r)[-1])
W=T['words']; gaps=[b_['s']-a_['e'] for a_,b_ in zip(W,W[1:]) if a_['src']==b_['src'] and a_['w'][-1] in '.?']
def lufs(x): l=meter.integrated_loudness(x); return round(l,1)
ud=np.maximum(dk,1e-3)[:,None]; mpre=round(lufs(mus[:t2i(pre_end)]/ud[:t2i(pre_end)])+g,1); mpost=round(lufs(mus[t2i(J1+6):-t2i(2.5)]/ud[t2i(J1+6):-t2i(2.5)]/db2(0))+g,1)   # level bed (tanpa ducking) di domain master
jen=float(np.sqrt(np.mean(mus[t2i(J0):t2i(J1)]**2)))
ok=(-14.5<=I<=-14.0) and TP<=-1.5   # v13: gerbang Modul 5 (spektrum/abrupt/level per kelas di audio_qa.py)
print(json.dumps(dict(I=I,LRA=LRA,TP=TP,mean_sentence_gap=round(float(np.mean(gaps)),2),music_lufs_pre=mpre,music_lufs_post=mpost,music_during_jensen_lufs=round(lufs(mus[t2i(J0):t2i(J1)])+g,1),sfx_cues=len(C),PASS=bool(ok))))
