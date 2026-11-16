"""Build the v6 voice spine and exact raw-source frame map; no scene render."""
from pathlib import Path
import argparse, hashlib, importlib.util, json, math, os, subprocess, sys
for key in ('OMP_NUM_THREADS', 'OPENBLAS_NUM_THREADS', 'MKL_NUM_THREADS'):
    os.environ[key] = '2'
import numpy as np
import soundfile as sf
from scipy.signal import resample_poly

P = Path(__file__).resolve().parents[1]
ROOT = P.parents[1]
OUT = P / 'edit/v6'
FPS, SR = 30, 48000

def load(p): return json.loads(Path(p).read_text())
def save(p, value):
    p = Path(p); p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')
def sha(p):
    h = hashlib.sha256()
    with open(p, 'rb') as f:
        for part in iter(lambda: f.read(1 << 20), b''): h.update(part)
    return h.hexdigest()
def module(name, p):
    spec = importlib.util.spec_from_file_location(name, p)
    obj = importlib.util.module_from_spec(spec); spec.loader.exec_module(obj); return obj
def mapper(removed, t):
    return round(t - sum(max(0., min(t, b) - a) for a, b in removed if t > a), 8)
def runs(mask):
    edges = np.diff(np.r_[False, mask, False].astype(np.int8))
    return list(zip(np.flatnonzero(edges == 1), np.flatnonzero(edges == -1)))
def db(x): return float(20 * np.log10(np.sqrt(np.mean(np.asarray(x, np.float64) ** 2)) + 1e-12))

def source():
    raw, sr = sf.read(P / 'raw/src48.wav', dtype='float32', always_2d=True)
    assert sr == SR
    raw = raw.mean(1)
    edl = load(P / 'edit/edl.json')['keping']
    # Re-open the pre-v5 raw joins rather than inheriting fades/cropped phonemes.
    groups = []
    for part in edl:
        if groups and groups[-1]['id'] == part['id']:
            groups[-1]['raw'][1] = part['src'][1]
            groups[-1]['old'][1] = part['out'][1]
            groups[-1]['parts'].append(part)
            groups[-1]['gap'] = part.get('jeda', 0)
        else:
            groups.append(dict(id=part['id'], raw=part['src'][:], old=part['out'][:], parts=[part], gap=part.get('jeda', 0)))
    # Native-WAV independent hearing found the earlier fragment was bleed from
    # "sekarang". The /s/ of Semua begins around raw70.74, after the long gap.
    groups[0]['raw'][0] = 70.66666666666667
    next(g for g in groups if g['id']=='4')['raw'][1]=47.6
    # The second "Apa" is actually before the discarded false start "yang".
    # Keep it in the source and explicitly mark the noncanonical false start.
    cursor = 0; chunks = []
    for g in groups:
        phase = -1 / 60 if g['id'] == '10' else 0
        a, b = [round((t - phase) * FPS) for t in g['raw']]
        g['raw_frames'] = [a, b]; g['raw'] = [a / FPS + phase, b / FPS + phase]
        g['raw_phase_seconds'] = phase
        n = b - a
        g['source_frames'] = [cursor, cursor + n]
        chunks.append(raw[round(g['raw'][0] * SR):round(g['raw'][1] * SR)]); cursor += n
        gap = round(g['gap'] * FPS)
        if gap:
            chunks.append(np.zeros(gap * 1600, np.float32)); cursor += gap
    x = np.concatenate(chunks)
    sf.write(OUT / 'source_raw.wav', x, SR, subtype='FLOAT')
    canonical = load(P / 'edit/words_final.json')
    words = []
    for index, q in enumerate(canonical):
        mid = (q['s'] + q['e']) / 2
        g = min(groups, key=lambda g: max(g['old'][0] - mid, 0, mid - g['old'][1]))
        def raw_time(t):
            piece = min(g['parts'], key=lambda p: max(p['out'][0] - t, 0, t - p['out'][1]))
            return piece['src'][0] + t - piece['out'][0]
        rs, re = raw_time(q['s']), raw_time(q['e'])
        if index == 0:
            rs = 70.735
        if q['w']=='something.':
            re=47.6
        if q['w'] == 'Apa' and q['s'] == 89.14:
            rs, re = 105.24, 105.65
        offset = g['source_frames'][0] / FPS - g['raw'][0]
        words.append(dict(w=q['w'], s=max(0, rs + offset), e=min(len(x) / SR, re + offset),
                          index=index, raw_s=rs, raw_e=re, group=g['id'], old_s=q['s'], old_e=q['e']))
    save(OUT / 'source-origins.json', groups)
    save(OUT / 'words_source_initial.json', words)
    print(json.dumps(dict(source_seconds=len(x) / SR, words=len(words), groups=len(groups))))

def refine():
    x, sr = sf.read(OUT / 'source_raw.wav', dtype='float32')
    W = load(OUT / 'words_source_initial.json')
    hop = SR // 100
    energy = np.sqrt(np.mean(x[:len(x) // hop * hop].reshape(-1, hop).astype(np.float64) ** 2, axis=1))
    D = 20 * np.log10(energy + 1e-12)
    median = float(np.median(np.concatenate([D[max(0, int(q['s'] * 100)):int(q['e'] * 100)] for q in W])))
    floor = float(np.percentile(D[D > -120], 10))
    # Candidate clean output measured a -38.2dB threshold after +1.108dB gain;
    # express that same measured speech/noise boundary in source amplitude.
    threshold = max(median - 18, floor + 8, -39.3)
    quiet = D < threshold
    corrections = []
    for q in W:
        a, b = max(0, int(q['s'] * 100)), min(len(D), math.ceil(q['e'] * 100))
        original = [q['s'], q['e']]
        low = [(a + c, a + d) for c, d in runs(quiet[a:b]) if d - c >= 18]
        if low:
            # Whisper commonly assigns the previous release plus a thought gap
            # to the next word. Record every such correction for source review.
            c, d = max(low, key=lambda r: r[1] - r[0])
            before = np.sum(~quiet[a:c]); after = np.sum(~quiet[d:b])
            if after >= 7 and (before <= 12 or d - a >= (b - a) * .35):
                q['s'] = max(q['s'], d / 100 - .005)
            elif before >= 7:
                q['e'] = min(q['e'], c / 100 + .005)
        a, b = max(0, int(q['s'] * 100)), min(len(D), math.ceil(q['e'] * 100))
        active = np.flatnonzero(~quiet[a:b])
        if len(active):
            q['s'] = max(q['s'], (a + int(active[0])) / 100 - .005)
            q['e'] = min(q['e'], (a + int(active[-1]) + 1) / 100 + .005)
        if q['e'] <= q['s']:
            raise SystemExit(f'no measured word body: {q}')
        q['s'], q['e'] = round(q['s'], 6), round(q['e'], 6)
        if max(abs(original[0]-q['s']),abs(original[1]-q['e'])) >= .001:
            corrections.append(dict(index=q['index'], word=q['w'], initial=original,
                                    refined=[q['s'], q['e']], low_runs=[[c / 100, d / 100] for c, d in low],
                                    method='ASR source span + 10ms RMS, boundary padding 5ms; plus independent 50ms cut guards'))
    save(OUT / 'words_source.json', W)
    save(OUT / 'source-word-corrections.json', dict(threshold_db=threshold, speech_median_db=median, corrections=corrections))
    cuts = []; rejected = []
    for left, right in zip(W, W[1:]):
        if right['s'] <= left['e']: continue
        sentence = left['w'].endswith(('.', '?', '!'))
        target = .24 if sentence else .10
        gap = right['s'] - left['e']
        if left['index'] == 217 and right['index'] == 218:
            origins = load(OUT / 'source-origins.json')
            origin = next(g for g in origins if g['id'] == '10')
            offset = origin['source_frames'][0] / FPS - origin['raw'][0]
            a, b = 105.65 + offset, 107.15 + offset
            cuts.append([a,b,'R-032: Apa dipulihkan, false-start yang + jeda dibuang'])
            continue
        if gap < (.32 if sentence else .18): continue
        # At least 50ms of measured word protection on each side; frame snapping
        # can only increase the retained protection, never move into a word.
        lo = math.ceil((left['e'] + .05) * FPS - 1e-8)
        hi = math.floor((right['s'] - .05) * FPS + 1e-8)
        def edge(f):
            i = f * 1600; return db(x[max(0, i - 48):min(len(x), i + 48)])
        while lo <= hi and edge(lo) > -38: lo += 1
        while hi >= lo and edge(hi) > -38: hi -= 1
        keep_extra = max(0, round(target * FPS) - round((gap - (hi - lo) / FPS) * FPS))
        hi -= keep_extra
        if hi <= lo:
            rejected.append(dict(left=left['w'], right=right['w'], gap=gap, reason='no low-energy guarded frame pair'))
            continue
        cuts.append([lo / FPS, hi / FPS, f"jeda {left['w']}→{right['w']}"])
    save(P / 'edit/potong_v6.json', cuts)
    save(OUT / 'rejected-candidates.json', rejected)
    print(json.dumps(dict(corrections=len(corrections), cuts=len(cuts), removed_seconds=sum(b-a for a,b,_ in cuts), rejected=rejected)))

def build():
    x, sr = sf.read(OUT / 'source_raw.wav', dtype='float32')
    W = load(OUT / 'words_source.json')
    removed = [q[:2] for q in load(P / 'edit/potong_v6.json')]
    mapped = [dict(w=q['w'], s=mapper(removed, q['s']), e=mapper(removed, q['e'])) for q in W]
    gate = module('cuts_v6', ROOT / 'claude/motion-graphic/scripts/gate/cut_check.py')
    validation = gate.validate_cuts(W, removed, mapped, fillers='eee,emm,eh,hmm,uh,ah,um')
    save(OUT / 'validation.json', validation)
    apa=W[217]
    expected_failure=f"guard Apa@{apa['s']}: <0.05s"
    blocking=[q for q in validation['failures'] if q!=expected_failure]
    adjudicated=dict(pass_for_scope=not blocking,automatic_source_guard_pass=validation['pass_'],
        blocking_failures=blocking,exceptions=[dict(id='R-032',word_index=217,
            raw_cut=[105.65,107.15],left_guard_ms=0,
            reason='native auditory option2: full Apa / zero false-start yang / natural; continuous word transition has no 50ms silent guard',
            authority='Irfan cut saja + lead explicit scoped exception 16Nov2026',
            source_span_policy='conservative coverage through105.65; no shortening labels to fabricate guard')])
    save(OUT/'validation-adjudicated.json',adjudicated)
    if blocking: raise SystemExit('source guard FAIL: ' + ';'.join(blocking))
    bounds = [0] + [round(t * FPS) for pair in removed for t in pair] + [len(x) // 1600]
    spans = list(zip(bounds[::2], bounds[1::2]))
    parts = [x[a * 1600:b * 1600] for a, b in spans]
    y = np.concatenate(parts)
    sf.write(OUT / 'suara.wav', y, sr, subtype='FLOAT')
    origins = load(OUT / 'source-origins.json')
    output_segments = []; cursor = 0
    for a, b in spans:
        for origin in origins:
            c, d = origin['source_frames']; lo, hi = max(a, c), min(b, d)
            if hi <= lo: continue
            out_start = cursor + lo - a
            raw_start = origin['raw_frames'][0] + lo - c
            output_segments.append(dict(out_frames=[out_start, out_start + hi-lo],
                                        raw_frames=[raw_start, raw_start+hi-lo],
                                        raw_times=[raw_start/FPS+origin.get('raw_phase_seconds',0),
                                                   (raw_start+hi-lo)/FPS+origin.get('raw_phase_seconds',0)],
                                        group=origin['id']))
        cursor += b - a
    joins = []; total = 0
    for a, b in removed:
        joins.append(round((a - total) * FPS)); total += b-a
    # Raw-origin discontinuities also need source-safe boundary envelopes.
    for before, after in zip(output_segments, output_segments[1:]):
        if before['raw_frames'][1] != after['raw_frames'][0]: joins.append(after['out_frames'][0])
    joins = sorted(set(joins))
    proof = []
    for a,b in removed:
        indexa, indexb = round(a*SR), round(b*SR)
        proof.append(dict(source=[a,b], start_db=db(x[indexa-48:indexa+48]), end_db=db(x[indexb-48:indexb+48]),
                          left_guard_ms=round((a-max(q['e'] for q in W if q['e'] <= a))*1000,3),
                          right_guard_ms=round((min(q['s'] for q in W if q['s'] >= b)-b)*1000,3)))
    mp = dict(fps=FPS, sample_rate=SR, removed=removed, dur_old=len(x)/SR, dur_new=len(y)/SR,
              dur_frames=len(y)//1600, overlap_samples=0, join_frames=joins,
              retained_source_frame_spans=spans, raw_segments=output_segments, edges=proof,
              scoped_exceptions=adjudicated['exceptions'],r032_join_frame=round(mapped[217]['e']*FPS),
              source_sha256=sha(OUT/'source_raw.wav'), source_words_sha256=sha(OUT/'words_source.json'))
    save(OUT / 'map.json', mp); save(OUT / 'words_mapped.json', mapped)
    captions = [q for q in mapped if q['w'].lower().strip('.?!') != 'tuh']
    save(P / 'remotion/src/data/words_v6.json', captions)
    # Anchor animation time to the original authored timeline at every word.
    # Linear interpolation remains monotonic; face/audio bypass this chase map.
    knots = [[0., 0.]]
    for original, actual in zip(W, mapped):
        for a,b in [(actual['s'],original['old_s']),(actual['e'],original['old_e'])]:
            if a > knots[-1][0]+1e-6 and b >= knots[-1][1]: knots.append([a,b])
    knots.append([len(y)/SR, 94.9666666667])
    save(P / 'remotion/src/data/knots_v6.json', dict(knots=knots, dur_frames=len(y)//1600,
         face_jumps=joins, note='continuous monotonic scene retime; exact raw face/audio map in edit/v6/map.json'))
    print(json.dumps(dict(source_guard='PASS' if validation['pass_'] else 'R-032 SCOPED EXCEPTION', words=len(W), cuts=len(removed), frames=len(y)//1600, duration=len(y)/SR)))

def face():
    import fcntl
    mp = load(OUT / 'map.json')
    lock = open('/tmp/remotion-heavy-render.lock', 'a')
    fcntl.flock(lock, fcntl.LOCK_EX)
    origins=load(OUT/'source-origins.json')
    parts=OUT/'face-parts'; parts.mkdir(exist_ok=True)
    paths=[]
    for g in origins:
        count=g['source_frames'][1]-g['source_frames'][0]
        gap=round(g['gap']*FPS); path=parts/f'source-{g["id"]}.mp4'
        vf=f'fps=30,trim=end_frame={count},setpts=PTS-STARTPTS'
        if gap: vf+=f',tpad=stop_mode=clone:stop={gap}'
        vf+=f',trim=end_frame={count+gap}'
        signature=parts/f'source-{g["id"]}.json'
        expected=dict(raw=g['raw'],frames=count+gap,filter=vf)
        if not path.exists() or not signature.exists() or load(signature)!=expected:
            subprocess.run(['ffmpeg','-v','error','-y','-threads','2','-filter_threads','1',
                '-ss',f'{g["raw"][0]:.12f}','-i',str(P/'raw/raw.mp4'),'-map','0:v:0',
                '-vf',vf,'-an','-c:v','libx264','-threads','2','-preset','fast','-crf','18',str(path)],check=True)
            save(signature,expected)
        paths.append(path)
        print('face source',g['id'],count+gap,flush=True)
    listing=parts/'concat.txt'; listing.write_text(''.join(f"file '{p}'\n" for p in paths))
    source_face=OUT/'source_face_v6.mp4'
    subprocess.run(['ffmpeg','-v','error','-y','-threads','2','-f','concat','-safe','0',
        '-i',str(listing),'-map','0:v:0','-an','-c:v','copy',str(source_face)],check=True)
    mp=load(OUT/'map.json')
    spans=mp['retained_source_frame_spans']
    filters=[f'[0:v]trim=start_frame={a}:end_frame={b},setpts=PTS-STARTPTS[v{i}]' for i,(a,b) in enumerate(spans)]
    filters.append(''.join(f'[v{i}]' for i in range(len(spans)))+f'concat=n={len(spans)}:v=1:a=0[out]')
    subprocess.run(['ffmpeg','-v','error','-y','-threads','2','-filter_complex_threads','1',
        '-i',str(source_face),'-filter_complex',';'.join(filters),'-map','[out]','-an',
        '-c:v','libx264','-threads','2','-preset','fast','-crf','18','-fps_mode','cfr',str(OUT/'face_edit_v6.mp4')],check=True)
    frames=int(subprocess.check_output(['ffprobe','-v','error','-count_frames','-select_streams','v:0',
        '-show_entries','stream=nb_read_frames','-of','csv=p=0',str(OUT/'face_edit_v6.mp4')],text=True).strip())
    if frames != mp['dur_frames']: raise SystemExit(f'face frame FAIL {frames} != {mp["dur_frames"]}')
    save(OUT/'face-check.json',dict(pass_=True,frames=frames,source_map_sha256=sha(OUT/'map.json'),face_sha256=sha(OUT/'face_edit_v6.mp4')))
    print('face frame PASS',frames)

def transcribe():
    from faster_whisper import WhisperModel
    model=WhisperModel('large-v3',device='cpu',compute_type='int8',cpu_threads=2,num_workers=1,local_files_only=True)
    input_audio_sha=sha(OUT/'voice_clean.wav'); input_map_sha=sha(OUT/'map.json')
    x,sr=sf.read(OUT/'voice_clean.wav',dtype='float32',always_2d=True)
    audio=np.ascontiguousarray(resample_poly(x.mean(1),1,3),dtype='float32')
    segments,info=model.transcribe(audio,language='id',word_timestamps=True,beam_size=5,condition_on_previous_text=False,initial_prompt=None)
    actual=[dict(w=w.word.strip(),s=w.start,e=w.end,p=w.probability) for s in segments for w in s.words]
    save(OUT/'words_actual.json',actual)
    save(OUT/'asr-provenance.json',dict(audio_sha256=input_audio_sha,map_sha256=input_map_sha,
        model='large-v3 cached local only',cpu_threads=2,compute_type='int8',initial_prompt=None,
        condition_on_previous_text=False,beam_size=5))
    import re,difflib
    def norm(ws): return re.findall('[a-z0-9]+',' '.join(q['w'].lower() for q in ws))
    target,heard=norm(load(OUT/'words_mapped.json')),norm(actual)
    save(OUT/'transcript-check.json',dict(pass_=target==heard,initial_prompt=None,target_tokens=len(target),heard_tokens=len(heard),
                                        differences=[x for x in difflib.ndiff(target,heard) if not x.startswith('  ')]))
    print(json.dumps(load(OUT/'transcript-check.json')))

if __name__ == '__main__':
    OUT.mkdir(parents=True,exist_ok=True)
    ap=argparse.ArgumentParser(); ap.add_argument('step',choices=['source','refine','build','face','transcribe']); args=ap.parse_args()
    globals()[args.step]()
