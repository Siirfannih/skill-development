# VO lokal (OmniVoice) yang dipasang ke jendela waktu kalimat VO lama, supaya timing visual tidak berubah.
# Pakai: python vo_fit.py <proyek_dir> <ref_wav> <ref_txt>
import sys, json, re, subprocess, tempfile, os, time
import numpy as np, soundfile as sf, torch
from omnivoice import OmniVoice

proj, ref_wav, ref_txt = sys.argv[1], sys.argv[2], open(sys.argv[3]).read().strip()
SR = 48000
words = json.load(open(f"{proj}/runs/vo_words_tight.json"))
# kelompokkan kata menjadi kalimat (berakhir . ? atau ,-tidak)
sents, cur = [], []
for w in words:
    cur.append(w)
    if re.search(r"[.?!]$", w["w"]):
        sents.append(cur); cur = []
if cur: sents.append(cur)
dev = "mps" if torch.backends.mps.is_available() else "cpu"
model = OmniVoice.from_pretrained("k2-fsa/OmniVoice", device_map=dev, dtype=torch.float32)
msr = getattr(model, "sampling_rate", 24000)
total = int(40.0 * SR)
buf = np.zeros(total, dtype=np.float32)
report = []
for i, s in enumerate(sents):
    text = " ".join(x["w"] for x in s)
    t0, t1 = s[0]["s"], s[-1]["e"]
    a = model.generate(text=text, ref_audio=ref_wav, ref_text=ref_txt, speed=1.0)
    a = a[0] if isinstance(a, (list, tuple)) else a
    a = a.squeeze().detach().cpu().numpy() if hasattr(a, "detach") else np.asarray(a).squeeze()
    tmp = tempfile.mkdtemp()
    sf.write(f"{tmp}/in.wav", a, msr)
    # buang hening awal/akhir
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{tmp}/in.wav", "-af",
                    "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse",
                    "-ar", str(SR), "-ac", "1", f"{tmp}/trim.wav"], check=True)
    x, _ = sf.read(f"{tmp}/trim.wav")
    d_new, d_old = len(x) / SR, (t1 - t0) + 0.06
    f = max(0.8, min(1.25, d_new / d_old))
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{tmp}/trim.wav", "-af", f"atempo={f:.4f}", "-ar", str(SR), "-ac", "1", f"{tmp}/fit.wav"], check=True)
    y, _ = sf.read(f"{tmp}/fit.wav")
    st = int(t0 * SR)
    n = min(len(y), total - st)
    buf[st:st + n] += y[:n].astype(np.float32)
    report.append(f"{i+1:02d} {t0:6.2f}-{t1:6.2f} lama={d_old:.2f}s baru={d_new:.2f}s tempo={f:.2f} | {text}")
    print(report[-1], flush=True)
peak = np.max(np.abs(buf)) or 1.0
buf = buf / peak * 0.89
sf.write(f"{proj}/public/audio/vo_local.wav", buf, SR)
open(f"{proj}/runs/vo_local_report.txt", "w").write("\n".join(report))
print("ok vo_local.wav")
