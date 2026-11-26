import json, sys, urllib.request, base64, subprocess, os
k = subprocess.run(["security", "find-generic-password", "-s", "elevenlabs-api-key", "-w"], capture_output=True, text=True).stdout.strip()
if not k:
    k = open(os.path.expanduser("~/Documents/Skill-Development/.secrets/elevenlabs.key")).read().strip()
vid = "1k39YpzqXZn52BgyLyGO"
text = ("Pompa airmu nggak rusak. Air sumurmu yang terlalu dalam. "
        "Pompa sumur dangkal itu sebenarnya nggak nyedot air. Dia cuma bikin ruang hampa di dalam pipa. "
        "Yang mendorong air naik adalah tekanan udara di permukaan sumur. "
        "Masalahnya, dorongan udara cuma kuat sampai sekitar tujuh sampai sembilan meter. "
        "Lebih dalam dari itu, pompa baru pun bakal mancing terus. "
        "Jadi ukur dulu jarak pompa ke permukaan air. Lebih dari sembilan meter, pakai pompa jet sumur dalam. "
        "Sumur di rumahmu sedalam apa? Tulis di komentar.")
body = json.dumps({"text": text, "model_id": "eleven_multilingual_v2", "language_code": "id",
                   "voice_settings": {"stability": 0.5, "similarity_boost": 0.8, "style": 0.25, "speed": 1.05}}).encode()
req = urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{vid}/with-timestamps?output_format=mp3_44100_128",
                             data=body, headers={"xi-api-key": k, "Content-Type": "application/json"})
try:
    d = json.load(urllib.request.urlopen(req, timeout=180))
except urllib.error.HTTPError as e:
    print("HTTP", e.code, e.read()[:500]); sys.exit(1)
open("public/audio/vo.mp3", "wb").write(base64.b64decode(d["audio_base64"]))
a = d["alignment"]; json.dump(a, open("runs/vo_alignment.json", "w"))
words, cur, st, pe = [], "", None, None
for ch, s, e in zip(a["characters"], a["character_start_times_seconds"], a["character_end_times_seconds"]):
    if ch.strip() == "":
        if cur: words.append({"w": cur, "s": st, "e": pe}); cur = ""
        continue
    if not cur: st = s
    cur += ch; pe = e
if cur: words.append({"w": cur, "s": st, "e": pe})
json.dump(words, open("runs/vo_words.json", "w"), ensure_ascii=False, indent=0)
print("ok words", len(words), "end", words[-1]["e"])
