"""Kunci suara: potongan naskah_A -> jeda mati dirapatkan -> edl.json (rentang src per keping, waktu out)."""
import json, subprocess, numpy as np, soundfile as sf
FPS = 30
src, sr = sf.read("raw/src48.wav", dtype="float32")
if src.ndim > 1: src = src.mean(1)
hop = int(sr * 0.01)
rms = np.array([np.sqrt(np.mean(src[i:i+hop]**2)) + 1e-9 for i in range(0, len(src) - hop, hop)])
db = 20 * np.log10(rms)
TH, MINP, KEEP = -45.0, 0.30, 0.10   # dB, jeda minimal yang dipotong, sisa tiap sisi
naskah = json.load(open("edit/naskah_A.json"))["potongan"]
keping = []
for p in naskah:
    a, b = p["src"]
    i0, i1 = int(a * 100), int(b * 100)
    quiet = db[i0:i1] < TH
    runs, start = [], None
    for k, q in enumerate(quiet):
        if q and start is None: start = k
        if (not q or k == len(quiet) - 1) and start is not None:
            end = k if not q else k + 1
            if (end - start) / 100 >= MINP and start > 5 and end < len(quiet) - 5:
                runs.append(((i0 + start) / 100, (i0 + end) / 100))
            start = None
    cur = a
    for s, e in runs:
        keping.append({"id": p["id"], "src": [round(cur, 3), round(s + KEEP, 3)]})
        cur = e - KEEP
    keping.append({"id": p["id"], "src": [round(cur, 3), round(b, 3)], "jeda": p["jeda"]})
# waktu out, dibulatkan ke frame supaya video & audio memakai potongan yang sama
t = 0.0
for k in keping:
    a, b = k["src"]
    n = max(1, round((b - a) * FPS)); b = a + n / FPS
    k["src"] = [round(a, 4), round(b, 4)]; k["out"] = [round(t, 4), round(t + n / FPS, 4)]
    t += n / FPS
    if k.get("jeda"):
        g = round(k["jeda"] * FPS) / FPS; k["jeda"] = g; t += g
json.dump({"fps": FPS, "durasi": round(t, 3), "keping": keping}, open("edit/edl.json", "w"), indent=1)
# audio: tiap keping dengan fade 8 ms, jeda = hening
room = src[int(0.05 * sr):int(1.0 * sr)]
out = np.zeros(int(round(t * sr)) + sr, dtype="float32")
for k in keping:
    a, b = k["src"]; seg = src[int(a * sr):int(b * sr)].copy()
    f = int(0.008 * sr); w = np.linspace(0, 1, f); seg[:f] *= w; seg[-f:] *= w[::-1]
    o = int(round(k["out"][0] * sr)); out[o:o + len(seg)] += seg
    if k.get("jeda"):  # isi jeda dengan room tone asli (0,05-1,0 dtk sumber), bukan hening digital
        n = int(round(k["jeda"] * sr)); rt = np.tile(room, n // len(room) + 1)[:n].copy()
        rt[:f] *= w; rt[-f:] *= w[::-1]; e = o + len(seg); out[e:e + n] += rt[:len(out) - e]
out = out[:int(round(t * sr))]
sf.write("audio/voice_raw.wav", out, sr)
# kata: waktu src -> waktu out
words = [w for s in json.load(open("bedah/raw_words.json")) for w in s["words"]]
ow = []
for k in keping:
    a, b = k["src"]
    for w in words:
        mid = (w["s"] + w["e"]) / 2
        if a <= mid < b:
            ow.append({"w": w["w"].strip(), "id": k["id"], "s": round(k["out"][0] + max(w["s"], a) - a, 3), "e": round(k["out"][0] + min(w["e"], b) - a, 3)})
json.dump(ow, open("edit/words.json", "w"), ensure_ascii=False, indent=0)
print("keping", len(keping), "durasi", round(t, 2), "kata", len(ow))
