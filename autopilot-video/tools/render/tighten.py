# Rapatkan jeda VO > 0.45 s menjadi ~0.28 s (aturan Irfan: jeda VO menurunkan attention span), lalu hitung ulang waktu kata.
import json, subprocess
w = json.load(open("runs/vo_words.json"))
PAD, GAP = 0.12, 0.28
segs, cur = [], [w[0]]
for a, b in zip(w, w[1:]):
    if b["s"] - a["e"] > 0.45:
        segs.append(cur); cur = [b]
    else:
        cur.append(b)
segs.append(cur)
parts, t, out = [], 0.0, []
for i, sg in enumerate(segs):
    s0 = max(0, sg[0]["s"] - PAD); s1 = sg[-1]["e"] + PAD
    for x in sg:
        out.append({"w": x["w"], "s": round(t + x["s"] - s0, 3), "e": round(t + x["e"] - s0, 3)})
    parts.append((s0, s1)); t += (s1 - s0) + (GAP - 2 * PAD if GAP > 2 * PAD else 0.04)
flt = []
for i, (a, b) in enumerate(parts):
    flt.append(f"[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.02,afade=t=out:st={b-a-0.03:.3f}:d=0.03[s{i}]")
gap = GAP - 2 * PAD if GAP > 2 * PAD else 0.04
chain = "".join(f"[s{i}]" + (f"[g{i}]" if i < len(parts) - 1 else "") for i in range(len(parts)))
for i in range(len(parts) - 1):
    flt.append(f"anullsrc=r=44100:cl=mono,atrim=0:{gap:.3f}[g{i}]")
flt.append(f"{chain}concat=n={2*len(parts)-1}:v=0:a=1[out]")
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", "public/audio/vo.mp3", "-filter_complex", ";".join(flt), "-map", "[out]", "-ac", "1", "-ar", "44100", "public/audio/vo_tight.wav"], check=True)
json.dump(out, open("runs/vo_words_tight.json", "w"), ensure_ascii=False)
print("segmen", len(parts), "durasi baru", round(out[-1]["e"], 2))
print(" ".join(f"{x['w']}@{x['s']:.2f}" for x in out))
