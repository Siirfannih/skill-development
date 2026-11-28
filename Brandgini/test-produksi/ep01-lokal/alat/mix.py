#!/usr/bin/env python3
"""mix.py (alat lokal ep01): stem VO + SFX (dari cues shotlist.json) + bed ruang -> mix.wav, stem_*.wav, cues.json.
Aturan: SFX tanpa fade-in (transien utuh), fade-out kosinus 150-300 ms, level relatif median ucapan VO (transisi/aksen -5 dB,
tick/foley -14 dB), bed ruang konstan sangat pelan, VO tidak diturunkan (mix hanya dipangkas <= 0,5 dB bila puncak > -1 dBFS).
  mix.py shotlist.json audio/suara.wav audio/
"""
import json, os, sys
import numpy as np, soundfile as sf
from scipy.signal import resample_poly
sl, vo_p, outd = sys.argv[1:4]
SR = 48000
def load(p):
    x, sr = sf.read(os.path.expanduser(p), always_2d=True, dtype="float32"); x = x.mean(1)
    if sr != SR: x = resample_poly(x, SR, sr).astype("float32")
    return x
vo = load(vo_p); N = len(vo) + int(0.1 * SR)
vo = np.concatenate([vo, np.zeros(N - len(vo), "float32")])
def rms_db(x): return 20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-9)
fr = 4800; e = np.array([rms_db(vo[i:i + fr]) for i in range(0, len(vo) - fr, fr)])
vo_med = float(np.median(e[e > -40]))
REL = {"transisi": -5, "aksen": -5, "tick": -14, "foley": -14, "bed": -36}
MAXLEN = {"transisi": 1.1, "aksen": 1.0, "tick": 0.25, "foley": 0.45}
sfx = np.zeros(N, "float32"); cues = []
S = json.load(open(sl))
for b in S["beats"]:
    for c in b["sfx"]:
        x = load(c["file"]).copy(); p = c["pilar"]
        x = x[: int(MAXLEN[p] * SR)]
        idx = np.where(np.abs(x) > 10 ** (-40 / 20) * np.abs(x).max())[0]
        if len(idx): x = x[: idx[-1] + 1]
        fo = min(len(x) // 2, int(0.25 * SR)); x[-fo:] *= (0.5 * (1 + np.cos(np.linspace(0, np.pi, fo)))).astype("float32")
        g = 10 ** ((vo_med + REL[p] - rms_db(x[: int(0.4 * SR)] if len(x) > 0 else x)) / 20)
        x = x * g; pk = np.abs(x).max()
        if pk > 0.5: x *= 0.5 / pk
        i0 = int(c["t"] * SR); seg = vo[i0:i0 + len(x)] + sfx[i0:i0 + len(x)]; xs = x[: len(seg)]
        lo, hi = 0.0, 1.0   # skala terbesar yang menjaga puncak mix <= -1 dBFS TANPA menurunkan VO (SFX yang mengalah)
        for _ in range(14):
            m = (lo + hi) / 2
            if np.abs(seg + m * xs).max() <= 10 ** (-1.2 / 20): lo = m
            else: hi = m
        x = x * lo; sfx[i0:i0 + len(xs)] += x[: len(xs)]
        cues.append({"t": c["t"], "file": os.path.basename(c["file"]), "pilar": p, "beat": b["beat_id"], "durasi": round(len(x) / SR, 3), "skala_puncak": round(lo, 2), "objek": b["metafora"]["objek"][0]})
bed = load("~/sfx/Epidemic/ruang/audio-visual-8mm-projector-5648e70b.wav")
bed = np.tile(bed, int(np.ceil(N / len(bed))))[:N]; bed *= 10 ** ((vo_med + REL["bed"] - rms_db(bed)) / 20)
bed[:int(0.0 * SR)] = 0
# musik bed (v2, ADDENDUM-2 butir 11): intro tenang 0-16,5 dtk dari trek Kenyset, diulang dengan crossfade kosinus 1,2 dtk; -9 dB dari median ucapan
mus = np.zeros(N, "float32")
if len(sys.argv) > 4:
    m = load(sys.argv[4])[: int(16.5 * SR)].copy(); xf = int(1.2 * SR); L = len(m)
    fi = np.sin(np.linspace(0, np.pi / 2, xf)) .astype("float32"); fo = np.cos(np.linspace(0, np.pi / 2, xf)).astype("float32")
    out = np.zeros(N + L, "float32"); pos = 0
    while pos < N:
        seg = m.copy(); seg[:xf] *= fi if pos > 0 else 1; seg[-xf:] *= fo
        out[pos:pos + L] += seg; pos += L - xf
    mus = out[:N]; mus *= 10 ** ((vo_med - 9 - rms_db(mus)) / 20)
    mus[: int(0.4 * SR)] *= np.linspace(0, 1, int(0.4 * SR)).astype("float32"); mus[-int(1.5 * SR):] *= np.linspace(1, 0, int(1.5 * SR)).astype("float32")
bed = bed + mus
mix = vo + sfx + bed; pk = np.abs(mix).max(); trim = 0.0
if pk > 10 ** (-1.0 / 20): trim = 20 * np.log10(pk / 10 ** (-1.0 / 20)); k = 10 ** (-trim / 20); mix *= k; vo_s, sfx_s, bed_s = vo * k, sfx * k, bed * k
else: vo_s, sfx_s, bed_s = vo, sfx, bed
os.makedirs(outd, exist_ok=True)
for n, x in (("stem_vo", vo_s), ("stem_sfx", sfx_s), ("stem_music", bed_s), ("mix", mix)): sf.write(f"{outd}/{n}.wav", np.stack([x, x], 1), SR, subtype="FLOAT")
json.dump({"cues": cues}, open(f"{outd}/cues.json", "w"), ensure_ascii=False, indent=1)
print(f"median ucapan {vo_med:.1f} dBFS; {len(cues)} cue; puncak mix {20*np.log10(pk):.2f} dBFS; pangkas {trim:.2f} dB; durasi {N/SR:.2f}s")
