"""v17 (Irfan 19:20: some SFX feel rough/kasar). Comfort scorecard for SFX files:
  hiss   = share of energy above 6 kHz (desis)
  bite   = share in 2–6 kHz (where harshness lives)
  rough  = envelope modulation 30–150 Hz relative to the mean envelope (grit / scratchiness, sensory roughness)
  attack = time from 10 % to 90 % of peak (ms): very fast + bright = clicky
  harsh_z / soft_z = earshot CLAP match against "harsh scratchy grating noise" and "soft smooth pleasant sound"
Usage: python3 tools/sfx_comfort.py file1 [file2 ...]   (prints a table, sorted by comfort)"""
import sys, json, re, subprocess, numpy as np, librosa, scipy.signal as ss

E = __import__('os').environ.get('EARSHOT', 'earshot')
def metrics(f):
    y, sr = librosa.load(f, sr=44100, mono=True)
    if not len(y) or np.max(np.abs(y)) < 1e-6: return None
    y = y / np.max(np.abs(y))
    S = np.abs(np.fft.rfft(y)) ** 2; fr = np.fft.rfftfreq(len(y), 1 / sr); tot = S.sum() + 1e-12
    band = lambda a, b: S[(fr >= a) & (fr < b)].sum() / tot
    env = np.abs(ss.hilbert(y)); env = ss.sosfilt(ss.butter(2, 400, 'low', fs=sr, output='sos'), env)
    act = env > 0.1 * env.max()
    e = env[act] if act.sum() > 100 else env
    m = ss.sosfilt(ss.butter(2, [30, 150], 'band', fs=sr, output='sos'), e)
    rough = float(np.sqrt(np.mean(m ** 2)) / (np.mean(e) + 1e-9))
    pk = int(np.argmax(env)); a10 = np.argmax(env[:pk + 1] > 0.1 * env[pk]); a90 = np.argmax(env[:pk + 1] > 0.9 * env[pk])
    return dict(dur=round(len(y) / sr, 2), low=round(band(0, 250), 2), mid=round(band(500, 2000), 2), bite=round(band(2000, 6000), 2),
                hiss=round(band(6000, 22050), 2), rough=round(rough, 3), attack_ms=round((a90 - a10) / sr * 1000, 1))
def rank(desc, files):
    out = subprocess.run([E, 'rank', desc, *files], capture_output=True, text=True).stdout
    z = {}
    for line in out.splitlines():
        mm = re.search(r'z\s+([+-]?\d+\.\d).*?cos\s+\S+\s+(\S.*?\.(?:mp3|wav))', line)
        if mm: z[mm.group(2).strip()] = float(mm.group(1))
    return z
if __name__ == '__main__':
    files = sys.argv[1:]
    M = {f: metrics(f) for f in files}
    hz = rank('harsh scratchy grating noise', files); sz = rank('soft smooth pleasant sound', files)
    rows = []
    for f, m in M.items():
        if not m: continue
        b = f.split('/')[-1]
        m['harsh_z'] = hz.get(b, hz.get(f, 0)); m['soft_z'] = sz.get(b, sz.get(f, 0))
        m['comfort'] = round(m['soft_z'] - m['harsh_z'] - 6 * m['hiss'] - 3 * m['bite'] - 8 * m['rough'], 2)
        rows.append((m['comfort'], b, m))
    for c, b, m in sorted(rows, reverse=True):
        print(f"{c:6.2f}  {b[:46]:46} hiss {m['hiss']:.2f} bite {m['bite']:.2f} mid {m['mid']:.2f} low {m['low']:.2f} rough {m['rough']:.3f} atk {m['attack_ms']:5.1f}ms harsh_z {m['harsh_z']:+.1f} soft_z {m['soft_z']:+.1f}")
    json.dump({b: {k_: float(v_) for k_, v_ in m.items()} for c, b, m in rows}, open(__import__('os').environ.get('MG_ROOT', '.') + '/qa_sfx_comfort.json', 'w'), indent=1)
