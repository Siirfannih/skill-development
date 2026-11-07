# Mix v2: lebih keras & padat (Irfan 27 Okt 13:04 "audio ini kurang keras"). Tanpa hening panjang.
import subprocess, json, numpy as np, soundfile as sf
SR = 48000; OFF = 0.6
T = {m["item"] + ("2" if m["item"] == "taruhan" and i > 2 else ""): m for i, m in enumerate(json.load(open("../vo/v3/timing.json"))["marks"])}
WD = [w for c in json.load(open("../vo/v3/captions.json")) for w in c["words"]]
def at(w, n=1):
    xs = [x["s"] for x in WD if x["w"].lower().strip(".,…?") == w]
    return xs[n - 1]
TOTAL = 2622 / 30 if False else (round((78.95 + OFF) * 30) + 66) / 30
def load(p):
    d = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(d, np.float32).reshape(-1, 2).copy()
N = int(TOTAL * SR); out = np.zeros((N, 2), np.float32)
def place(x, t, g=1.0):
    i = int(t * SR); j = min(N, i + len(x)); out[i:j] += x[: j - i] * g
A = lambda s: s + OFF
place(load("../vo/v3/dialog.wav"), OFF, 1.0)
music = load("music_groove.mp3")
# musik dipotong/diregang per bagian tidak perlu; envelope saja. Bed 0.20 di bawah suara, 0.30 di sela.
mj = T["MENJIJIKKAN"]; t1 = T["taruhan"]; t2 = T["taruhan2"]
env = [(0, 0), (0.40, 0), (0.43, 0.30), (1.0, 0.20),
       (A(t1["start"]) - 0.01, 0.20), (A(t1["start"]), 0.08), (A(t1["end"]), 0.08), (A(t1["end"]) + 0.05, 0.20),
       (A(mj["start"]) - 0.01, 0.20), (A(mj["start"]) + 0.25, 0.0), (A(mj["end"]), 0.0), (A(mj["end"]) + 0.08, 0.20),
       (A(t2["start"]) - 0.01, 0.20), (A(t2["start"]), 0.08), (A(t2["end"]), 0.08), (A(t2["end"]) + 0.05, 0.22),
       (A(at("20")) - 0.05, 0.24), (A(at("20")), 0.30), (A(at("20")) + 1.0, 0.22),
       (A(at("sih", 2)) + 0.25, 0.22), (A(at("sih", 2)) + 0.3, 0.06), (A(at("menurutmu")), 0.06), (A(at("menurutmu")) + 0.2, 0.20),
       (A(78.9), 0.22), (A(79.0), 0.38), (TOTAL - 0.5, 0.38), (TOTAL, 0)]
t = np.arange(len(music)) / SR
g = np.interp(t, [p[0] for p in env], [p[1] for p in env]).astype(np.float32)
place(music * g[:, None], 0)
S = lambda f: load(f"sfx/{f}.mp3")
cues = [("switch", 0.40, 0.7), ("whoosh", A(at("dia")) - 0.05, 0.45), ("shutter", A(at("dia")), 0.4), ("whoosh", A(at("jam")) - 0.05, 0.45), ("ui_pop", A(at("jam")), 0.4),
        ("key_clack", A(t1["start"]), 0.8), ("whoosh", A(t1["end"]) - 0.08, 0.5), ("whoosh", A(T["C1"]["start"]) - 0.05, 0.35),
        ("whoosh", A(T["s3"]["start"]) - 0.05, 0.45), ("whoosh", A(T["C2"]["start"]) - 0.05, 0.35),
        ("key_clack", A(mj["start"]), 0.9), ("tape_stop", A(mj["start"]) + 0.02, 0.55), ("whoosh", A(mj["end"]) - 0.08, 0.5),
        ("ui_pop", A(T["s4"]["start"]) + 0.0, 0.4), ("ui_pop", A(T["s4"]["start"]) + 0.17, 0.42), ("ui_pop", A(T["s4"]["start"]) + 0.33, 0.44), ("ui_pop", A(T["s4"]["start"]) + 0.5, 0.46), ("ui_pop", A(T["s4"]["start"]) + 0.67, 0.48),
        ("whoosh", A(at("terus")) - 0.05, 0.45), ("whoosh", A(T["C3"]["start"]) - 0.05, 0.35),
        ("typing", A(at("jadi")), 0.45), ("mouse_click", A(at("serahin")) + 0.13, 0.6), ("whoosh", A(at("serahin")) + 0.15, 0.45),
        ("ui_pop", A(at("ke")), 0.6), ("whoosh", A(at("aku", 5)) - 0.05, 0.45), ("ui_pop", A(at("aku", 5)), 0.5),
        ("mouse_click", A(at("motong")), 0.5), ("ui_pop", A(at("nyusun")), 0.45), ("key_clack", A(at("ngedit", 3)), 0.6),
        ("whoosh", A(at("nyuruh")) - 0.05, 0.4), ("ui_pop", A(at("chatgpt")), 0.5), ("ui_pop", A(at("gemini")), 0.5), ("ui_pop", A(at("elevenlabs")), 0.5),
        ("whoosh", A(T["C4"]["start"]) - 0.05, 0.45), ("riser", A(T["C4"]["start"]) + 0.3, 0.3),
        ("whoosh", A(at("tapi")) + 0.15, 0.45), ("mouse_click", A(at("tapi")) + 0.3, 0.4), ("mouse_click", A(at("tapi")) + 0.4, 0.35), ("mouse_click", A(at("tapi")) + 0.5, 0.35),
        ("whoosh", A(at("gimana")) - 0.05, 0.4), ("whoosh", A(T["s6"]["start"]) - 0.05, 0.4),
        ("typing", A(at("aku", 8 if False else 1)) * 0 + A(WD[[i for i, w in enumerate(WD) if w["w"] == "bisa"][0]]["s"]) - 0.1, 0.35),
        ("key_clack", A([w["s"] for w in WD if w["w"] == "layak"][0]), 0.85), ("whoosh", A([w["s"] for w in WD if w["w"] == "makanya"][0]) - 0.08, 0.5),
        ("key_clack", A(t2["start"]), 0.8), ("whoosh", A(t2["end"]) - 0.08, 0.5), ("riser", A(at("20")) - 2.0, 0.45),
        ("key_clack", A(at("20")), 0.9), ("ui_pop", A(at("20")) + 0.1, 0.6), ("whoosh", A(T["C6"]["start"]) - 0.05, 0.35),
        ("whoosh", A(T["s7"]["start"]) - 0.05, 0.4), ("key_clack", A(at("mikir")), 0.5), ("key_clack", A(WD[[i for i, w in enumerate(WD) if w["w"] == "ngedit." ][-1]]["s"]), 0.5),
        ("ui_pop", A(at("dua", 2)), 0.4), ("ding", A(at("pertama")), 0.6), ("whoosh", A(at("kalau")) - 0.05, 0.45),
        ("mouse_click", A(at("sekalian")), 0.6), ("trash", A(at("project-nya")) + 0.4, 0.65), ("whoosh", A(at("menurutmu")) - 0.05, 0.4)]
for f, tt, gg in cues: place(S(f), tt, gg)
sf.write("mix_v2_raw.wav", out, SR)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", "mix_v2_raw.wav", "-af",
                "acompressor=threshold=-20dB:ratio=2.5:attack=10:release=120:makeup=3,alimiter=limit=0.89:attack=3:release=40,loudnorm=I=-11.5:TP=-1.0:LRA=6",
                "-ar", "48000", "mix_v2.wav"], check=True)
print("ok", round(N / SR, 2))
