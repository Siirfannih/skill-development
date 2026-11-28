"""Mix pratinjau ep02: VO utuh + SFX dari shotlist (tanpa musik). Level relatif VO: transisi/aksen -6 dB, tick -14 dB; ekor SFX fade 200 ms."""
import json, os, subprocess, sys
sl = json.load(open("shotlist.json")); total = sl["target_duration_sec"]
cues = [(c["t"], os.path.expanduser(c["file"]), c["pilar"]) for b in sl["beats"] for c in b["sfx"]]
DUR = {"transisi": 0.7, "aksen": 0.5, "tick": 0.25, "foley": 0.4, "bed": 1.0}; GAIN = {"transisi": -9, "aksen": -9, "tick": -16, "foley": -14, "bed": -30}
ins = ["-i", "remotion/public/vo.wav"]; fl = []; mix = ["[0:a]apad=whole_dur=%s[vo]" % total]; lab = ["[vo]"]
for i, (t, f, p) in enumerate(cues, 1):
    ins += ["-i", f]; d = DUR[p]
    fl.append(f"[{i}:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:{d},afade=t=out:st={d-0.2:.2f}:d=0.2,volume={GAIN[p]}dB,adelay={int(t*1000)}|{int(t*1000)}[s{i}]"); lab.append(f"[s{i}]")
vo = "[0:a]aformat=sample_rates=48000:channel_layouts=stereo,apad=whole_dur=%s[vo]" % total
graph = ";".join([vo] + fl + ["".join(lab) + f"amix=inputs={len(lab)}:normalize=0:duration=longest,atrim=0:{total}[m]"])
subprocess.run(["ffmpeg", "-v", "error", "-y"] + ins + ["-filter_complex", graph, "-map", "[m]", "-c:a", "pcm_s16le", "-ar", "48000", "audio/mix.wav"], check=True)
print("mix.wav", len(cues), "cue")
