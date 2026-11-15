import sys, json, numpy as np
from faster_whisper import WhisperModel
m = WhisperModel('large-v3', device='cpu', compute_type='int8', cpu_threads=8)
for spec in sys.argv[1:]:
    base, a0, a1 = spec.split(':'); a0 = float(a0); a1 = float(a1)
    a = np.load(f'audio16k/{base}.npy').astype(np.float32) / 32768
    seg = a[int(a0 * 16000):int(a1 * 16000)]
    segs, _ = m.transcribe(seg, language='id', word_timestamps=True, vad_filter=False, beam_size=5,
                           initial_prompt='Bali Digifest, Primakara, konten kreator, workshop, generasi muda.')
    S = [{'s': s.start + a0, 'e': s.end + a0, 't': s.text.strip(), 'lp': s.avg_logprob,
          'w': [[w.start + a0, w.end + a0, w.word, w.probability] for w in s.words]} for s in segs]
    json.dump(S, open(f'transcripts_L/{base}_{int(a0)}.json', 'w'), ensure_ascii=False)
    print('==', base, a0, a1, flush=True)
    for s in S:
        print(f"{s['s']:6.2f}-{s['e']:6.2f} [{s['lp']:.2f}] {s['t']}", flush=True)
