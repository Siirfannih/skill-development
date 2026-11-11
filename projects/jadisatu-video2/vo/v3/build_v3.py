# v3: rakit dialog tanpa jeda mati (Irfan 27 Okt 13:04 "tanpa jeda, diam sama sekali").
# Jeda internal > 0,22 dtk dipadatkan jadi 0,12 dtk; jeda antar item 0,04 dtk; kartu 0,55 / 0,65 dtk.
import subprocess, json, numpy as np, soundfile as sf
SR = 48000; CL = "../../../../Personal-video/Bahan/clean/talkinghead_clean_audio.wav"
def load(p, a=None, b=None):
    cmd = ["ffmpeg", "-v", "error"] + (["-ss", str(a), "-to", str(b)] if a is not None else []) + ["-i", p, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, dtype=np.float32).copy()
def fade(x, ms=8):
    n = int(ms / 1000 * SR)
    if len(x) > 2 * n: x = x.copy(); x[:n] *= np.linspace(0, 1, n); x[-n:] *= np.linspace(1, 0, n)
    return x
def squeeze(x, thr=-42, maxgap=0.12, mingap=0.22):
    hop = int(0.01 * SR); e = np.array([np.sqrt(np.mean(x[i:i + hop] ** 2) + 1e-12) for i in range(0, len(x), hop)])
    db = 20 * np.log10(e / (e.max() + 1e-9)); quiet = db < thr
    # buang ujung
    idx = np.where(~quiet)[0]; a, b = max(0, idx[0] - 2), min(len(quiet), idx[-1] + 4)
    out = []; i = a
    while i < b:
        if quiet[i]:
            j = i
            while j < b and quiet[j]: j += 1
            n = j - i
            keep = n if n * 0.01 < mingap else int(maxgap / 0.01)
            out.append(fade(x[i * hop:(i + keep) * hop], 6)); i = j
        else:
            j = i
            while j < b and not quiet[j]: j += 1
            out.append(x[i * hop:j * hop]); i = j
    return np.concatenate(out)
def clip(*parts): return np.concatenate([fade(load(CL, a, b)) for a, b in parts]) * 10 ** (-3 / 20)
sil = lambda s: np.zeros(int(s * SR), np.float32)
V = "../v2/fast/"
seq = [("vo", "s1"), ("card", "taruhan", 0.55), ("vo", "s2"), ("clip", "C1", [(3.28, 6.10)]), ("vo", "s3"), ("clip", "C2", [(7.62, 11.45)]),
       ("card", "MENJIJIKKAN", 0.65), ("vo", "s4"), ("clip", "C3", [(14.84, 16.84), (18.08, 19.95)]), ("vo", "s5"), ("clip", "C4", [(26.78, 35.40)]),
       ("vo", "s6"), ("card", "taruhan", 0.55), ("clip", "C5", [(39.56, 43.90), (44.85, 46.20)]),
       ("clip", "C6", [(49.30, 50.72), (51.40, 51.60), (52.15, 54.70)]), ("vo", "s7")]
GAP = 0.04; out = []; t = 0; marks = []
for it in seq:
    if it[0] == "vo": x = fade(squeeze(load(V + it[1] + ".wav")))
    elif it[0] == "clip": x = squeeze(clip(*it[2]), thr=-40, maxgap=0.10, mingap=0.20)
    else: x = sil(it[2])
    marks.append({"item": it[1], "type": it[0], "start": round(t, 3), "end": round(t + len(x) / SR, 3)})
    out += [x, sil(GAP)]; t += len(x) / SR + GAP
y = np.concatenate(out); sf.write("dialog_raw.wav", y, SR)
json.dump({"total": round(t, 3), "marks": marks}, open("timing.json", "w"), indent=1)
print("total", round(t, 2))
