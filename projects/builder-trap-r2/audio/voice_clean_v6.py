"""Filter once in source time, remove measured latency, then cut exact samples."""
import os
for key in ('OMP_NUM_THREADS', 'OPENBLAS_NUM_THREADS', 'MKL_NUM_THREADS'): os.environ[key] = '2'
from pathlib import Path
import hashlib, json, math, re, subprocess
import numpy as np
import soundfile as sf
from scipy.signal import correlate

P = Path(__file__).resolve().parents[1]
OUT = P / 'edit/v6'
SR = 48000
def save(p, value): p.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def lag(a,b,maxlag=2400):
    # correlate(processed, source) >0 means the filter delayed the voice.
    c=correlate(b,a,mode='full',method='fft'); center=len(a)-1
    z=c[center-maxlag:center+maxlag+1]
    return int(np.argmax(z)-maxlag)
def lufs(p):
    run=subprocess.run(['ffmpeg','-hide_banner','-nostats','-threads','2','-filter_threads','1',
        '-i',str(p),'-af','ebur128','-f','null','-'],capture_output=True,text=True,check=True)
    vals=re.findall(r'I:\s+(-?[0-9.]+|-inf) LUFS',run.stderr)
    return float(vals[-1])

x,sr=sf.read(OUT/'source_raw.wav',dtype='float32')
assert sr==SR
pad=SR//4
padded=np.pad(x,(pad,pad))
run=subprocess.run(['ffmpeg','-v','error','-threads','2','-filter_threads','1',
    '-f','f32le','-ar',str(SR),'-ac','1','-i','pipe:0','-af','highpass=f=70,afftdn=nr=3:nf=-55',
    '-f','f32le','-ar',str(SR),'-ac','1','pipe:1'],input=padded.tobytes(),capture_output=True,check=True)
filtered=np.frombuffer(run.stdout,dtype=np.float32)
uncomp=filtered[pad:pad+len(x)]
windows=[(.2,2),(12,14),(29,31),(55,57),(80,82)]
before=[dict(window=[a,b],lag_samples=lag(x[round(a*SR):round(b*SR)],uncomp[round(a*SR):round(b*SR)])) for a,b in windows]
delay=round(float(np.median([q['lag_samples'] for q in before])))
y=filtered[pad+delay:pad+delay+len(x)].copy()
assert len(y)==len(x)
after=[dict(window=[a,b],lag_samples=lag(x[round(a*SR):round(b*SR)],y[round(a*SR):round(b*SR)])) for a,b in windows]
sf.write(OUT/'source_clean_unity.wav',y,SR,subtype='FLOAT')
mp=json.loads((OUT/'map.json').read_text())
W=json.loads((OUT/'words_source.json').read_text())
spans=[(max(0,q['s']-.06),min(len(y)/SR,q['e']+.10)) for q in W]
# Keep the R-032 transition unattenuated before the explicit source splice.
for g in json.loads((OUT/'source-origins.json').read_text()):
    if g['id']=='10':
        off=g['source_frames'][0]/30-g['raw'][0]
        spans.append((105.53+off,106.0+off))
merged=[]
for a,b in sorted(spans):
    if merged and a<=merged[-1][1]: merged[-1][1]=max(merged[-1][1],b)
    else: merged.append([a,b])
gain=np.ones(len(y),np.float32)
floor=10**(-36/20)
ramps=[]
for (_,b),(a,_) in zip(merged,merged[1:]):
    if a-b<.15: continue
    i,j=round(b*SR),round(a*SR); n=min(round(.025*SR),(j-i)//3)
    gain[i:j]=floor
    t=np.sin(np.linspace(0,np.pi/2,n,dtype=np.float32))**2
    gain[i:i+n]=1-(1-floor)*t
    gain[j-n:j]=floor+(1-floor)*t
    ramps.append(dict(source=[b,a],ramp_ms=n/SR*1000))
y*=gain
parts=[y[a*1600:b*1600] for a,b in mp['retained_source_frame_spans']]
z=np.concatenate(parts)
mapped=json.loads((OUT/'words_mapped.json').read_text())
fade_proof=[]
for frame in mp['join_frames']:
    t=frame/30; i=frame*1600
    r032=frame==mp.get('r032_join_frame')
    n=round((.003 if r032 else .002)*SR)
    previous=max((q['e'] for q in mapped if q['e']<=t),default=0)
    following=min((q['s'] for q in mapped if q['s']>=t),default=len(z)/SR)
    safe=t-previous>=.05-1e-6 and following-t>=.05-1e-6
    if safe or r032:
        up=np.sin(np.linspace(0,np.pi/2,n,dtype=np.float32))**2
        z[i-n:i]*=up[::-1]; z[i:i+n]*=up
    fade_proof.append(dict(frame=frame,applied=safe or r032,fade_ms=(3 if r032 else 2) if safe or r032 else 0,
        left_guard_ms=(t-previous)*1000,right_guard_ms=(following-t)*1000,
        scoped_exception='R-032 native option2 approved sin2 3ms, conservative word coverage reaches splice' if r032 else None))
unity=OUT/'voice_clean_unity.wav'; sf.write(unity,z,SR,subtype='FLOAT')
measured=lufs(unity); peak=float(np.max(np.abs(z)))
gain_db=max(0,min(-16-measured,-1.25-20*np.log10(peak+1e-12)))
# Per-phrase upward gain is static inside speech. Change it only in a measured
# low-energy gap; merge adjacent phrases if no quiet transition is available.
boundaries=[0]; boundary_proof=[]
for previous,following in zip(mapped,mapped[1:]):
    if not previous['w'].endswith(('.', '?', '!')): continue
    lo=max(boundaries[-1]+round(.15*SR),round((previous['e']-.025)*SR))
    hi=min(len(z),round((following['s']+.025)*SR))
    if hi-lo<round(.012*SR): continue
    size=round(.008*SR)
    rms=np.convolve(z[lo:hi].astype(np.float64)**2,np.ones(size)/size,mode='valid')
    at=int(np.argmin(rms)); level=10*np.log10(float(rms[at])+1e-24)
    if level>-42: continue
    pos=lo+at+size//2
    boundaries.append(pos); boundary_proof.append(dict(sample=pos,window_db=level,between=[previous['w'],following['w']]))
boundaries.append(len(z))
phrase_rows=[]; phrase_gains=[]
scratch=OUT/'phrase-analysis.wav'
for a,b in zip(boundaries,boundaries[1:]):
    part=z[a:b]; sf.write(scratch,part,SR,subtype='FLOAT')
    integrated=lufs(scratch); part_peak=20*np.log10(float(np.max(np.abs(part)))+1e-12)
    up_db=max(0,min(-16-integrated,-1.25-part_peak))
    phrase_gains.append(10**(up_db/20))
    phrase_rows.append(dict(samples=[a,b],seconds=[a/SR,b/SR],source_lufs=integrated,source_peak_db=part_peak,
        gain_db=up_db,expected_peak_db=part_peak+up_db,source_crest_db=part_peak-20*np.log10(float(np.sqrt(np.mean(part**2)))+1e-12)))
envelope=np.ones(len(z),np.float32)
for (a,b),value in zip(zip(boundaries,boundaries[1:]),phrase_gains): envelope[a:b]=value
for index,pos in enumerate(boundaries[1:-1]):
    n=round(.004*SR); t=np.sin(np.linspace(0,np.pi/2,2*n,dtype=np.float32))**2
    envelope[pos-n:pos+n]=phrase_gains[index]+(phrase_gains[index+1]-phrase_gains[index])*t
z*=envelope
sf.write(OUT/'voice_clean.wav',z,SR,subtype='FLOAT')
proof=dict(source_sha256=sha(OUT/'source_raw.wav'),map_sha256=sha(OUT/'map.json'),
    words_source_sha256=sha(OUT/'words_source.json'),voice_clean_sha256=sha(OUT/'voice_clean.wav'),
    filter='highpass=f=70,afftdn=nr=3:nf=-55',filter_padding_samples=pad,
    filter_latency_samples=delay,filter_latency_ms=delay/SR*1000,
    measurements_before=before,measurements_after=after,fade_windows=fade_proof,gap_envelopes=ramps,
    gain_db=gain_db,unity_lufs=measured,phrase_gain=phrase_rows,phrase_gain_boundaries=boundary_proof,
    gain_policy='static upward only per phrase, 8ms sin2 changes confined to measured quiet windows; no limiter',
    final_lufs=lufs(OUT/'voice_clean.wav'),
    sample_peak_db=20*np.log10(float(np.max(np.abs(z)))+1e-12),samples=len(z),frames=len(z)//1600,
    latency_pass=all(abs(q['lag_samples'])<=48 for q in after),
    r032_splice='raw105.65→107.15, native option2 approved3ms sin2; zero left guard is explicit scoped exception')
save(OUT/'voice_clean.provenance.json',proof)
print(json.dumps({k:proof[k] for k in ['filter_latency_ms','measurements_after','gain_db','final_lufs','sample_peak_db','samples','frames','latency_pass']}))
