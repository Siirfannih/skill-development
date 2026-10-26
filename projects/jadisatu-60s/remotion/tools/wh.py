import sys,subprocess,numpy as np
from faster_whisper import WhisperModel
def load(f):
    raw=subprocess.run(['ffmpeg','-v','error','-i',f,'-ac','1','-ar','16000','-f','f32le','-'],capture_output=True).stdout
    return np.frombuffer(raw,np.float32)
if __name__=='__main__':
    m=WhisperModel(sys.argv[2] if len(sys.argv)>2 else 'tiny',device='cpu',compute_type='int8')
    for f in sys.argv[1].split(','):
        segs,info=m.transcribe(load(f),vad_filter=True)
        print(f,info.language,round(info.language_probability,2),'|',' '.join(s.text for s in segs)[:220])
