"""v14 finishing: shorten the video by tightening the VO — never by cutting speech.
 1. tempo: each original trim (vo/v2) is time-stretched x TEMPO with ffmpeg rubberband (pitch + formants kept).
 2. pauses: every quiet run inside a chunk (measured on the audio, -42 dB) longer than its target loses only its
    quiet middle; targets are per pause (sentence ends 0.28 s, dramatic "…" beats and visual-heavy beats longer).
 3. act hinges: chunks are re-packed so the real silence between them is CHUNK_GAP.
 4. tail after "seleramu." shortened.
Writes vo/v3/cXX_trim.wav + video/src/vo.json (words remapped). Scenes and audio cues are all anchored to
vo.json words, so the visuals and SFX follow automatically.   Run: python3 tools/tighten.py"""
import json, numpy as np, soundfile as sf, os, subprocess

ROOT = '/home/claude/thegap'
SRC = json.load(open(f'{ROOT}/video/src/vo_v13.json'))
OUT = f'{ROOT}/vo/v3'; os.makedirs(OUT, exist_ok=True)
TEMPO = 1.05
GEN = 0.28        # default target for an inner pause (s)
# inner pauses that keep more air, keyed by (chunk, first word after the pause)
OVR = {
    ('c01', 'Ira'): 0.50,        # JARAK tag reads + pull back before the dive
    ('c02', 'taste-mu'): 0.36,   # "itu… tanda"
    ('c03', 'berhenti'): 0.45,   # suspense before the negative
    ('c04', 'Tapi'): 0.42,       # braam + tiles take the centre
    ('c04', 'Edit'): 0.36,       # sentence snap zoom-out before the first Claude session
    ('c04', 'Menulis.'): 0.36,   # one Claude session per task needs ~30 f
    ('c04', 'Mencari'): 0.34,
    ('c05', 'semua'): 0.40,      # "perlahan…"
    ('c06', 'yang'): 0.38,       # "satu pun…"
    ('c08', 'ia'): 0.42,         # "hanya satu…"
    ('c09', 'tidak'): 0.40,      # "tapi … tidak dengan seleramu" before the drop
}
MIN_KEEP = 0.25   # never shorten a pause that is already below this
# real silence between the last sound of a chunk and the first sound of the next
CHUNK_GAP = {'c01': 0.42, 'c02': 0.40, 'c03': 0.55, 'c04': 0.42, 'c05': 0.60, 'c06': 0.55, 'c07': 0.50, 'c08': 0.55}
TAIL = 2.6        # vo.total = last chunk end + TAIL (lib adds +1.0 s) — v13 was 3.6
XF = 0.012
THR_DB = -42

def runs_below(m, sr, thr, min_len):
    hop = int(0.01 * sr); n = len(m) // hop
    r = np.sqrt(np.mean(m[: n * hop].reshape(n, hop) ** 2, 1) + 1e-12)
    q = r < thr; out = []; s = None
    for j in range(n + 1):
        if j < n and q[j]:
            if s is None: s = j
        else:
            if s is not None and (j - s) * 0.01 >= min_len: out.append((s * 0.01, j * 0.01))
            s = None
    return out, r

def stretch(src, dst):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-af', f'rubberband=tempo={TEMPO}:formant=preserved:pitchq=quality', dst], check=True)

out_words, out_chunks, log = [], [], []
prev_end = None; prev_c = None
for ch in SRC['chunks']:
    cid = ch['id']
    st = f'{OUT}/{cid}_st.wav'; stretch(f'{ROOT}/vo/v2/{cid}_trim.wav', st)
    x, sr = sf.read(st); m = x if x.ndim == 1 else x.mean(1)
    thr = 10 ** (THR_DB / 20) * np.max(np.abs(m))
    ws = [dict(w) for w in SRC['words'] if w['c'] == cid]
    for w in ws: w['s'] = (w['s'] - ch['start']) / TEMPO; w['e'] = (w['e'] - ch['start']) / TEMPO
    runs, r = runs_below(m, sr, thr, MIN_KEEP)
    loud = np.where(r >= thr)[0]; on, off = loud[0] * 0.01, (loud[-1] + 1) * 0.01
    cuts = []
    for a, b in runs:
        if a <= on or b >= off: continue          # leading / trailing silence handled by packing
        nxt = min([w for w in ws if w['s'] >= b - 0.25], key=lambda w: w['s'], default=ws[-1])
        tgt = OVR.get((cid, nxt['w']), GEN)
        rem = (b - a) - tgt
        if rem < 0.04: continue
        mid = (a + b) / 2; cuts.append((mid - rem / 2, mid + rem / 2))
        log.append(f'{cid} {a:6.2f} pause {b-a:.2f} -> {tgt:.2f}  before "{nxt["w"]}"')
    pieces = []; last = 0
    for c0, c1 in cuts: pieces.append(x[int(last * sr): int(c0 * sr)]); last = c1
    pieces.append(x[int(last * sr):])
    nxf = int(XF * sr); y = pieces[0]
    for p in pieces[1:]:
        rr = np.linspace(0, 1, nxf); rr = rr if x.ndim == 1 else rr[:, None]
        y = np.concatenate([y[:-nxf], y[-nxf:] * (1 - rr) + p[:nxf] * rr, p[nxf:]])
    sf.write(f'{OUT}/{cid}_trim.wav', y, sr); os.remove(st)
    def remap(t):
        sh = 0.0
        for c0, c1 in cuts:
            if t >= c1: sh += (c1 - c0) - XF
            elif t > c0: sh += t - c0
        return t - sh
    on2, off2 = remap(on), remap(off)
    start = ch['start'] if prev_end is None else prev_end + CHUNK_GAP[prev_c] - on2
    out_chunks.append({'id': cid, 'start': round(float(start), 3), 'dur': round(len(y) / sr, 3), 'src': ch['src']})
    for w in ws: out_words.append({'w': w['w'], 's': round(float(start + remap(w['s'])), 3), 'e': round(float(start + remap(w['e'])), 3), 'c': cid})
    prev_end = start + off2; prev_c = cid

total = round(float(prev_end + TAIL + 0.0), 3)
json.dump({'chunks': out_chunks, 'words': out_words, 'total': total}, open(f'{ROOT}/video/src/vo.json', 'w'), indent=0)
print('\n'.join(log))
print(f'video {SRC["total"] + 1:.1f} s -> {total + 1:.1f} s')
