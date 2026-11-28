#!/usr/bin/env python3
"""buat_caption.py (alat lokal ep01): waktu kata naskah dari words_aktual.json (ASR, kata bisa beda ejaan). Kata cocok = jangkar
(difflib), kata tak cocok diinterpolasi proporsional jumlah huruf di antara jangkar. Keluaran captions.json: chunk <=3 kata."""
import difflib, json, re, sys
script, wj, out = sys.argv[1:4]
body = re.sub(r"^---.*?---", "", open(script, encoding="utf-8").read(), flags=re.S).strip()
S = body.split()
norm = lambda w: re.sub(r"[^a-z0-9]", "", w.lower())
ASR = json.load(open(wj))
A = [norm(w["w"]) for w in ASR]; B = [norm(w) for w in S]
# normalisasi ejaan ASR -> naskah untuk jangkar
alias = {"kalo": "kalau", "deket": "dekat", "gak": "nggak", "tetep": "tetap", "dapet": "dapat", "rame": "ramai", "lho": "loh", "nginjar": "ngincer", "harald": "harold"}
A = [alias.get(a, a) for a in A]
sm = difflib.SequenceMatcher(None, A, B, autojunk=False)
t = [None] * len(S); e = [None] * len(S)
for a, b, n in sm.get_matching_blocks():
    for k in range(n): t[b + k] = ASR[a + k]["s"]; e[b + k] = ASR[a + k]["e"]
# interpolasi
i = 0
end_audio = ASR[-1]["e"]
while i < len(S):
    if t[i] is None:
        j = i
        while j < len(S) and t[j] is None: j += 1
        t0 = e[i - 1] if i > 0 else 0.0; t1 = t[j] if j < len(S) else end_audio
        tot = sum(len(norm(S[k])) + 1 for k in range(i, j)); c = t0
        for k in range(i, j):
            d = (t1 - t0) * (len(norm(S[k])) + 1) / tot; t[k] = round(c, 3); e[k] = round(c + d, 3); c += d
        i = j
    else: i += 1
words = [{"w": S[k], "s": round(t[k], 3), "e": round(max(e[k], t[k] + 0.08), 3)} for k in range(len(S))]
# pastikan monoton
for k in range(1, len(words)):
    if words[k]["s"] < words[k - 1]["s"] + 0.04: words[k]["s"] = round(words[k - 1]["s"] + 0.04, 3)
    words[k]["e"] = max(words[k]["e"], words[k]["s"] + 0.08)
chunks, cur = [], []
for w in words:
    if cur and len(" ".join(x["w"] for x in cur + [w])) > 20:
        chunks.append(cur); cur = []
    cur.append(w)
    txt = " ".join(x["w"] for x in cur)
    if len(cur) >= 3 or len(txt) >= 20 or re.search(r"[.?!,]$", w["w"]) and len(cur) >= 2 or re.search(r"[.?!]$", w["w"]):
        chunks.append(cur); cur = []
if cur: chunks.append(cur)
res = [{"words": c, "t0": c[0]["s"], "t1": c[-1]["e"]} for c in chunks]
json.dump({"words": words, "chunks": res, "durasi": round(end_audio, 3)}, open(out, "w"), ensure_ascii=False, indent=0)
print(len(S), "kata naskah;", sum(1 for k in range(len(S)) if False), "chunk", len(res), "cocok", sum(n for _, _, n in sm.get_matching_blocks()))
for c in res[:60]: print(f"{c['t0']:.2f}-{c['t1']:.2f}", " ".join(x['w'] for x in c['words']))
