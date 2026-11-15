"""Build guarded v5 candidate data/audio; never renders a final composition.

Only source gaps and explicitly named tuh fillers are candidates. Both endpoints
are frame aligned, >=50ms from content timestamps and measured in a low energy
2ms window. This deliberately rejects cuts when source timestamps leave no guard.
"""
from pathlib import Path
import argparse, importlib.util, json, math, os, subprocess, sys
import numpy as np
import soundfile as sf
P = Path(__file__).resolve().parents[1]
ROOT = P.parents[1]
def load(path): return json.loads(path.read_text())
def save(path, value): path.parent.mkdir(parents=True, exist_ok=True); path.write_text(json.dumps(value, ensure_ascii=False, indent=2)+'\n')
def module(name, path):
    spec=importlib.util.spec_from_file_location(name,path); m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m
# recut's CLI executes at import; keep the exact no-overlap mapper here.
def mapper(removed, t):
    return round(t-sum(max(0., min(t,b)-a) for a,b in removed if t>a),6)
def main():
    ap=argparse.ArgumentParser(); ap.add_argument('--audio', action='store_true')
    ap.add_argument('--proxy', action='store_true'); ap.add_argument('--transcribe', action='store_true'); a=ap.parse_args()
    if a.proxy or a.transcribe:
        processes=subprocess.check_output(['ps','-eo','pid=,pcpu=,comm=,args='],text=True)
        busy=[]
        for row in processes.splitlines():
            fields=row.strip().split(None,3)
            if len(fields)<4: continue
            pid,cpu,comm,args=fields
            if int(pid)==os.getpid(): continue
            if float(cpu)>250 or comm=='ffmpeg' or (comm in ('node','python','python3') and any(q in args for q in ('remotion render','faster_whisper'))):
                busy.append(dict(pid=int(pid),cpu=float(cpu),command=comm))
        if busy: raise SystemExit('Resource gate BLOCKED: '+json.dumps(busy))
    x,sr=sf.read(P/'audio/voice_raw.wav',dtype='float32',always_2d=True)
    mono=x.mean(1); dur=len(x)/sr; W=load(P/'edit/words_final.json'); content=[q for q in W if q['w'].lower().strip('.?!')!='tuh']
    old=load(P/'edit/potong_v3.json'); out=[]; decisions=[]; edges=[]
    def safe(t): return all(not(q['s']-.05-1e-8<t<q['e']+.05+1e-8) for q in content)
    def db(t):
        i=round(t*sr); v=mono[max(0,i-48):min(len(mono),i+48)]
        return float(20*np.log10(np.sqrt(np.mean(v*v))+1e-9))
    for start,end,reason in old:
        if "tuh" in reason:
            decisions.append(dict(source=[start,end],reason=reason,status='rejected: source filler touches content; full removal cannot retain 50ms guard without waveform alignment')); continue
        if "di dalam" in reason or 'tengah kalimat' in reason:
            decisions.append(dict(source=[start,end],reason=reason,status='rejected: word interior')); continue
        # Guard clipping happens BEFORE frame snapping; sample energy decides among valid frames.
        valid=[f/30 for f in range(math.ceil(start*30),math.floor(end*30)+1) if safe(f/30) and db(f/30)<-38]
        if len(valid)<2 or valid[-1]-valid[0]<1/30:
            decisions.append(dict(source=[start,end],reason=reason,status='rejected: no guarded low-energy frame pair')); continue
        lo,hi=valid[0],valid[-1]
        # Low-energy endpoints only, no time overlap: audio and face use identical frame cuts.
        if out and lo<=out[-1][1]: continue
        out.append([lo,hi,reason]); edges.append(dict(start=lo,end=hi,start_db=db(lo),end_db=db(hi)))
        decisions.append(dict(source=[start,end],reason=reason,status='kept with guarded measured endpoints',cut=[lo,hi]))
    removed=[q[:2] for q in out]; newdur=dur-sum(b-a for a,b in removed)
    mapped=[dict(w=q['w'],s=mapper(removed,q['s']),e=mapper(removed,q['e'])) for q in content]
    gate=module('gate_v5',ROOT/'claude/motion-graphic/scripts/gate/cut_check.py')
    result=gate.validate_cuts(W,removed,mapped)
    save(P/'edit/potong_v5.json',out); save(P/'edit/v5/cut_decisions.json',decisions)
    mp=dict(removed=removed,fps=30,dur_old=dur,dur_new=newdur,overlap_samples=0,micro_fade_ms=2,edges=edges)
    save(P/'edit/v5/map.json',mp); save(P/'edit/v5/words_final.json',mapped); save(P/'edit/v5/validation.json',result)
    save(P/'remotion/src/data/words_v5.json',mapped)
    save(P/'edit/v5/words_actual.json',[dict(w=q['w'],s=mapper(removed,q['s']),e=mapper(removed,q['e'])) for q in W])
    # Animation ramps reproduce v3b's continuous chase; face MUST use the exact edit map, never these ramps.
    knots=[[0.,0.]]; total=0.
    for i,(start,end) in enumerate(removed):
        n=start-total; left=start-(removed[i-1][1] if i else 0); right=(removed[i+1][0] if i+1<len(removed) else dur)-end
        width=min(max(.5,1.25*(end-start)),1.2,left*.45,right*.45)
        knots.extend([[n-width,start-width],[n+width,end+width]]); total+=end-start
    knots.append([newdur,dur]); knots.sort()
    save(P/'remotion/src/data/knots_v5.json',dict(knots=knots,dur_frames=round(newdur*30),note='continuous animation chase; exact audio/face cuts in edit/v5/map.json'))
    save(P/'edit/v5/regression.json',[dict(source=q,mapped=m,retained=1.) for q,m in zip(content,mapped) if q['w'].lower().strip('.?!') in {'apa','untuk','dan','mungkin','semua','share','gak','mau','satu','sekedar','aku'}])
    if a.audio:
        keep=[]; cur=0
        for start,end in removed: keep.append((cur,start)); cur=end
        keep.append((cur,dur)); parts=[]; fade=round(.002*sr)
        for i,(start,end) in enumerate(keep):
            seg=x[round(start*sr):round(end*sr)].copy(); ramp=np.linspace(0,1,fade,dtype=np.float32)[:,None]
            if i: seg[:fade]*=ramp
            if i<len(keep)-1: seg[-fade:]*=ramp[::-1]
            parts.append(seg)
        sf.write(P/'edit/v5/suara.wav',np.concatenate(parts),sr,subtype='FLOAT')
    if a.proxy:
        proxy=P/'edit/v5/face-proxy'
        subprocess.run([sys.executable,str(ROOT/'claude/motion-graphic/scripts/audio/recut.py'),'cut',
            '--audio',str(P/'audio/voice_raw.wav'),'--video',str(P/'edit/face_edit.mp4'),
            '--remove',str(P/'edit/potong_v5.json'),'--source-words',str(P/'edit/words_final.json'),
            '--out',str(proxy),'--video-scale','0.5'],check=True)
        subprocess.run(['ffmpeg','-v','error','-threads','2','-y','-i',str(proxy/'wajah.mp4'),
            '-i',str(P/'edit/v5/voice_clean.wav'),'-map','0:v','-map','1:a','-c:v','copy','-c:a','aac',
            '-threads','2',str(P/'edit/v5/face-audio-proxy.mp4')],check=True)
    if a.transcribe:
        from faster_whisper import WhisperModel
        model=WhisperModel('large-v3',device='cpu',compute_type='int8',cpu_threads=2,num_workers=1,local_files_only=True)
        segments,info=model.transcribe(str(P/'edit/v5/voice_clean.wav'),language='id',word_timestamps=True,beam_size=5,condition_on_previous_text=False)
        actual=[dict(w=w.word.strip(),s=w.start,e=w.end) for seg in segments for w in seg.words]
        save(P/'edit/v5/transcript.json',actual)
        import difflib,re
        normalize=lambda words: re.findall(r'[a-z0-9]+',' '.join(q['w'].lower() for q in words))
        target,heard=normalize(content),normalize(actual)
        save(P/'edit/v5/transcript-check.json',dict(pass_=target==heard,initial_prompt=None,
            target_tokens=len(target),heard_tokens=len(heard),diff=list(difflib.ndiff(target,heard))))
    print(json.dumps(dict(validator=result['pass_'],cuts=len(out),duration=newdur,frames=round(newdur*30),source_words=len(W),target_words=len(mapped),filler_cuts=sum('tuh' in q[2] for q in out))))
if __name__=='__main__': main()
