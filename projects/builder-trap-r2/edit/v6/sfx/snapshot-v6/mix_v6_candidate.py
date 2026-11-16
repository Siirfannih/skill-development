"""SFX-only provisional render. Do not mix VO until the final voice hash is received."""
import json, subprocess
from pathlib import Path
import numpy as np
import soundfile as sf
P=Path(__file__).resolve().parents[1]; S=Path('/home/irfan/sfx/SFXIrfan'); SR=48000; N=2493*1600
V=S/'Move.mp3'
# source, trim [s,e], fade-in/out, normalized peak dBFS
roles={
 'footage_change':(S/'Pergantianfoto.mp3',1.23,1.50,.006,.025,-20),
 'camera':(S/'Wooshcameramovementtransisi.mp3',.90,None,.02,.08,-22),
 'impact':(V,3.82,4.352,.008,.04,-15),
 'title':(S/'ES_Scifi, Computer, Short Beeps, Glitch 02 - Epidemic Sound.mp3',0,None,.004,.04,-18),
 'mosaic':(S/'Cut.mp3',0,None,.008,.08,-20),
 'ui_click':(S/'Enter.mp3',0,None,.005,.02,-21),
 'screen_entry':(S/'Cutcontrastransision.mp3',0,None,.005,.025,-21),
 'typing':(S/'Keyboardtyping.mp3',0,.96,.006,.02,-25),
 'ui_confirm':(S/'Lasertransision.mp3',0,None,.006,.03,-23),
 'card_motion':(S/'pop up.mp3',.035,None,.006,.025,-20),
}
labels={'footage_change':'earshot crop: pen/key click', 'camera':'earshot source: fast whoosh / swoosh passing', 'impact':'earshot: punchy impact', 'title':'earshot: digital glitch / error buzz', 'mosaic':'earshot: error buzz/digital glitch', 'ui_click':'earshot: key press', 'screen_entry':'earshot: pen click/key release', 'typing':'earshot crop: keyboard typing', 'ui_confirm':'earshot: triangle/glass ting', 'card_motion':'earshot: bubble pop'}
def decode(p):
 cmd=['ffmpeg','-threads','2','-v','error','-i',str(p),'-ac','1','-ar',str(SR),'-f','f32le','-']
 return np.frombuffer(subprocess.run(cmd,capture_output=True,check=True).stdout,np.float32).copy()
cache={}; stem=np.zeros(N,np.float32); placed=[]
for q in json.loads((P/'edit/v6/sfx/events.json').read_text())['events']:
 path,ss,end,fi,fo,g=roles[q['peran']]; key=str(path)
 g+=6
 if q['peran']=='card_motion':
  reduction={268:3,460:3,1071:3,1168:6,1214:3,1535:6,1555:3,1575:3,1594:6,1615:3,1635:6,1650:3,2267:6,2301:8,2335:6}.get(q['frame'],0)
  g-=reduction
 if q['peran']=='camera' and q['frame']==996: g-=2
 if q['peran']=='typing' and q['frame']==1475: end=.32
 if q['peran']=='camera':
  avail=(q['frame']-q['start_frame'])/30
  if q['frame']==1660: avail=7/30
  desired=max(.90,round(1.2087-avail+.01,2)); fi=.02
  ss=.90 if desired<=.92 else .99 if desired<=1.02 else 1.12
  if q['frame']==1487: ss=1.15
 if key not in cache: cache[key]=decode(path)
 source=cache[key]; stop=round((end if end is not None else len(source)/SR)*SR); h=source[round(ss*SR):stop].copy(); full=len(source)/SR
 n=round(fi*SR); h[:n]*=np.sin(np.linspace(0,np.pi/2,n))**2
 n=round(fo*SR); h[-n:]*=np.cos(np.linspace(0,np.pi/2,n))**2
 pk=float(np.max(np.abs(h))); h*=10**(g/20)/pk
 if q['peran']=='card_motion' and q['frame']==2284: h*=-1
 clipname=q['peran'] + (('_g'+str(g).replace('-','m')) if q['peran'] in ('card_motion','camera') else '') + ('_polarity' if q['peran']=='card_motion' and q['frame']==2284 else '') + (('_'+str(ss).replace('.','_')) if q['peran']=='camera' else '_short' if q['peran']=='typing' and end==.32 else '')
 sf.write(P/'edit/v6/sfx'/f'{clipname}.wav',h,SR,subtype='FLOAT')
 pi=int(np.argmax(np.abs(h))); start=round(q['frame']/30*SR)-pi
 # A visual may start later than the pre-roll needed to center a sound; preserve start, flag peak discrepancy.
 start=max(start,round(q['start_frame']/30*SR)); endi=start+len(h)
 if start<0 or endi>N: raise ValueError(q)
 stem[start:endi]+=h
 threshold=max(float(np.max(np.abs(h)))*.01,1e-7); ids=np.flatnonzero(np.abs(h)>=threshold)
 onset=(start+int(ids[0]))/SR; peak=(start+pi)/SR
 placed.append(dict(t=peak,clip=str(P/'edit/v6/sfx'/f'{clipname}.wav'),start_sample=start,file=str(path),peran=q['peran'],alasan=q['objek'],dengar=labels[q['peran']],visual_start_frame=q['start_frame'],visual_peak_frame=q['frame'],source_start=ss,source_end=stop/SR,source_full_duration=full,fade_in=fi,fade_out=fo,actual_peak_offset=pi/SR,actual_peak_time=peak,peak_error_frames=(peak*30-q['frame']),actual_onset=onset,tail_rms_dbfs=20*np.log10(max(float(np.sqrt(np.mean(h[-2400:]**2))),1e-12)),gain_dbfs=g))
sf.write(P/'edit/v6/stem_sfx.wav',stem,SR,subtype='FLOAT')
(P/'audio/cues_v6.json').write_text(json.dumps({'cues':placed},indent=2,ensure_ascii=False)+'\n')
print('cues',len(placed),'max peak error f',max(abs(c['peak_error_frames']) for c in placed))
for a,b in zip(sorted(placed,key=lambda x:x['actual_onset']),sorted(placed,key=lambda x:x['actual_onset'])[1:]):
 if b['actual_onset']-a['actual_onset'] < .1: print('ONSET_CONFLICT',round(a['actual_onset'],3),a['peran'],round(b['actual_onset'],3),b['peran'])
for c in placed:
 if abs(c['peak_error_frames'])>1: print('ALIGN_CONFLICT',c['visual_peak_frame'],c['peran'],round(c['peak_error_frames'],2))

# Final music/mix is explicitly requested only after the SFX stem and new VO hash exist.
if __name__ == '__main__' and '--mix' in __import__('sys').argv:
 import hashlib
 expected='d56ab12f772c35f7c7c037243974d95c84eb6b60c786523d03dfb1a574e8983f'
 voicepath=P/'edit/v6/voice_clean.wav'
 actual=hashlib.sha256(voicepath.read_bytes()).hexdigest()
 if actual!=expected: raise ValueError('Voice hash mismatch: '+actual)
 def dec_stereo(path,ss=0,dur=None,af=None):
  args=['ffmpeg','-v','error','-threads','2','-ss',str(ss),'-i',str(path)]
  if dur is not None: args+=['-t',str(dur)]
  if af:args+=['-af',af]
  args+=['-ac','2','-ar',str(SR),'-f','f32le','-']
  return np.frombuffer(subprocess.run(args,check=True,capture_output=True).stdout,np.float32).reshape(-1,2).copy()
 def place(buf,x,at,gain,fi,fo):
  x=x.copy()*10**(gain/20); n=round(fi*SR)
  if n: x[:n]*=(np.sin(np.linspace(0,np.pi/2,n))**2)[:,None]
  n=round(fo*SR)
  if n:x[-n:]*=(np.cos(np.linspace(0,np.pi/2,n))**2)[:,None]
  i=round(at*SR); n=max(0,min(len(x),len(buf)-i)); buf[i:i+n]+=x[:n]
 knots=np.array(json.loads((P/'remotion/src/data/knots_v6.json').read_text())['knots'])
 T3,T4=(float(np.interp(t,knots[:,1],knots[:,0])) for t in (46.62,75.58))
 mus=np.zeros((N,2),np.float32); aware=P/'assets/music_aware.wav'
 place(mus,dec_stereo(aware,0,T3+.25),0,0,.03,.25)
 # The existing dark drone is repeated with long fades at overlaps; it remains below Aware.
 drone=dec_stereo(P/'audio/sfx_el/drone_dark.mp3'); t=T3-.05
 while t<T4:
  end=min(T4+.4,t+len(drone)/SR); x=drone[:round((end-t)*SR)]
  place(mus,x,t,-9,.35,.4); t+=len(drone)/SR-.7
 place(mus,dec_stereo(aware,92.25,T4-T3+.3,af='lowpass=f=1200,lowpass=f=1200'),T3+.4,-6,1.5,.3)
 place(mus,dec_stereo(aware,172.27,N/SR-T4),T4,0,.15,.5)
 # Determine music LUFS with EBU R128 and set bed approximately 10 dB below VO.
 temp=P/'edit/v6/sfx/music-unscaled.wav';sf.write(temp,mus,SR,subtype='FLOAT')
 proc=subprocess.run(['ffmpeg','-hide_banner','-threads','2','-i',str(temp),'-af','ebur128','-f','null','-'],capture_output=True,text=True,check=True)
 import re
 vals=re.findall(r'I:\s*(-?\d+\.\d+) LUFS',proc.stderr); level=float(vals[-1]); gain=-32.0-level
 mus*=10**(gain/20)
 i4=round(T4*SR); ramp=round(.4*SR); curve=1-(1-10**(-4/20))*np.sin(np.linspace(0,np.pi/2,ramp))**2
 mus[i4:i4+ramp]*=curve[:,None];mus[i4+ramp:]*=10**(-4/20)
 # One static, gentle chapter level change; no per-word music gain.
 a=round(66.30*SR);b=round(66.50*SR);g=10**(-2/20)
 mus[a:b]*=(g+(1-g)*np.cos(np.linspace(0,np.pi/2,b-a))**2)[:,None];mus[b:]*=g
 voice,sr=sf.read(voicepath,dtype='float32'); assert sr==SR and len(voice)==N
 voice=np.repeat(voice[:,None],2,axis=1) if voice.ndim==1 else voice
 sfx,sr=sf.read(P/'edit/v6/stem_sfx.wav',dtype='float32'); sfx=np.repeat(sfx[:,None],2,axis=1)
 bed=mus+sfx
 # Local attenuation only where the unprocessed sum approaches the ceiling.
 # 30 ms approach and release; 4 ms central hold. No VO scaling or limiting.
 target=10**(-1.10/20); raw=voice+bed
 ix=np.flatnonzero(np.max(np.abs(raw),axis=1)>target)
 groups=np.split(ix,np.flatnonzero(np.diff(ix)>int(.025*SR))+1) if len(ix) else []
 env=np.ones(N,np.float32); dips=[]
 for ids in groups:
  if not len(ids): continue
  lo=max(0,int(ids[0])-192);hi=min(N,int(ids[-1])+193)
  vv=voice[lo:hi];bb=bed[lo:hi]; alpha=1.0
  # Binary search the largest constant bed gain which satisfies both channels in this interval.
  if np.max(np.abs(vv+bb))>target:
   low,high=0.,1.
   for _ in range(24):
    mid=(low+high)/2
    if np.max(np.abs(vv+mid*bb))<=target: low=mid
    else: high=mid
   alpha=low
  if alpha>=.9999:continue
  n=round(.03*SR); a=max(0,lo-n);z=min(N,hi+n)
  local=np.ones(z-a,np.float32);l=lo-a;r=z-hi
  if l:local[:l]=alpha+(1-alpha)*np.cos(np.linspace(0,np.pi/2,l))**2
  local[l:l+hi-lo]=alpha
  if r:local[l+hi-lo:]=alpha+(1-alpha)*np.sin(np.linspace(0,np.pi/2,r))**2
  env[a:z]=np.minimum(env[a:z],local)
  dips.append(dict(start=a/SR,peak_start=lo/SR,peak_end=hi/SR,end=z/SR,min_gain_db=20*np.log10(max(alpha,1e-9))))
 mus*=env[:,None];sfx*=env[:,None];mix=voice+mus+sfx
 sf.write(P/'edit/v6/stem_music.wav',mus,SR,subtype='FLOAT')
 sf.write(P/'edit/v6/stem_sfx.wav',sfx[:,0],SR,subtype='FLOAT')
 sf.write(P/'edit/v6/mix.wav',mix,SR,subtype='FLOAT')
 (P/'edit/v6/sfx/bed-dips.json').write_text(json.dumps(dips,indent=2)+'\n')
 for c in placed:
  clip,_=sf.read(c['clip'],dtype='float32'); st=c['start_sample']; clip=clip*env[st:st+len(clip)]; pi=int(np.argmax(np.abs(clip)))
  c['actual_peak_offset']=pi/SR; c['actual_peak_time']=(st+pi)/SR; c['t']=c['actual_peak_time']; c['peak_error_frames']=c['t']*30-c['visual_peak_frame']
  threshold=max(float(np.max(np.abs(clip)))*.01,1e-7); ids=np.flatnonzero(np.abs(clip)>=threshold);c['actual_onset']=(st+int(ids[0]))/SR
  c['bed_gain_at_peak_db']=20*np.log10(max(float(env[st+pi]),1e-9))
 (P/'audio/cues_v6.json').write_text(json.dumps({'cues':placed},indent=2,ensure_ascii=False)+'\n')
 print('AFTER DIPS max peak error frames',max(abs(c['peak_error_frames']) for c in placed))
 print('MIX BUILT',actual,'T3',T3,'T4',T4,'music original',level,'gain',gain,'samplepeak',20*np.log10(np.max(np.abs(mix))))
