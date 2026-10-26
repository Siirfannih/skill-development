import sys, numpy as np, librosa, subprocess, json
f=sys.argv[1]; cuts=[float(x) for x in open(sys.argv[2]).read().split()] if len(sys.argv)>2 else []
subprocess.run(['ffmpeg','-v','error','-y','-i',f,'-ac','1','-ar','22050','/tmp/a.wav'])
y,sr=librosa.load('/tmp/a.wav',sr=22050)
H,P=librosa.decompose.hpss(librosa.stft(y))
yp=librosa.istft(P)  # percussive ~ SFX transients
env=librosa.onset.onset_strength(y=yp,sr=sr)
on=librosa.onset.onset_detect(onset_envelope=env,sr=sr,backtrack=True,units='time',delta=0.12)
dur=len(y)/sr
S=np.abs(librosa.stft(y))
cent=librosa.feature.spectral_centroid(S=S,sr=sr)[0]; t=librosa.frames_to_time(np.arange(len(cent)),sr=sr)
cs=[float(np.median(cent[(t>=o)&(t<o+0.08)])) for o in on]
tempo,beats=librosa.beat.beat_track(y=y,sr=sr,units='time')
rms=librosa.feature.rms(y=y)[0]
# cut coverage: onset within ±3 frames (0.1s)
cov=[c for c in cuts if any(abs(o-c)<=0.1 for o in on)]
off=[round((min(on,key=lambda o:abs(o-c))-c)*30,1) for c in cuts] if len(on) else []
fr=lambda a,b:(a>=b)
hi=sum(1 for c in cs if c>3000)
print(json.dumps({'file':f,'dur':round(dur,1),'onsets':len(on),'onsets_per_s':round(len(on)/dur,2),'tempo':float(np.atleast_1d(tempo)[0]),
 'centroid_med_Hz':int(np.median(cs)) if cs else 0,'onsets_centroid_gt3k_pct':round(100*hi/max(1,len(cs))),
 'cuts':len(cuts),'cuts_with_sfx_pct':round(100*len(cov)/max(1,len(cuts))),'cut_offsets_frames':off,
 'first_onsets':[round(o,2) for o in on[:40]]}))
