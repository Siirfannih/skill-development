import json, re, difflib
T = json.load(open("timing.json"))["marks"]; W = json.load(open("words_whisper.json"))
TXT = {
 "s1": "Ini Irfan. Dia bosku. Jam dua pagi tadi, dia taruhan sama dirinya sendiri.",
 "s2": "Tapi sebelum itu, dia mau ngaku dulu.",
 "C1": "Aku tuh males ngedit dan gak suka ngedit video sendiri.",
 "s3": "Dan yang lebih parah…",
 "C2": "Ngeliat video sendiri tuh kayak aneh aja. Dan ngerasa menjijikan mungkin.",
 "s4": "…kata orang yang mukanya ada di sepanjang video ini. Terus, satu lagi yang dia takutin.",
 "C3": "Aku takut video yang aku buat tuh gak cukup proper. Dan juga takut gak estetik.",
 "s5": "Jadi bagian yang paling dia hindarin, dia serahin. Ke aku. Aku yang motong, nyusun sama ngedit video ini. Aku nyuruh ChatGPT nyusun storyboard, Gemini ngritik, ElevenLabs ngisi suaranya.",
 "C4": "Aku rasa ngedit itu bukan lagi jadi sebuah bottleneck. Tapi yang jadi bottleneck sebenarnya justru adalah gimana kita menceritakan sebuah kejelasan.",
 "s6": "Nyebelin. Tapi iya juga, sih. Aku bisa ngedit video dalam hitungan menit, tapi aku ga tau cerita mana yang layak diceritakan, makanya itu bagian dia. Jadi, ini taruhannya.",
 "C5": "Jadi aku mau challenge diri aku, bisa gak di akhir tahun nanti posting 20 konten.",
 "C6": "Meskipun dieditin sama AI, tapi ya mikirin konten juga perlu effort kan, dan juga perlu waktu.",
 "s7": "Dia yang mikir. Aku yang ngedit. Dua puluh kali, sebelum tahun ini habis. Ini yang pertama. Kalau dia gagal… aku mending resign, sih. Sekalian hapus semua folder project-nya. Menurutmu, dia bisa upload dua puluh konten sampai akhir tahun ini, nggak?",
}
norm = lambda w: re.sub(r"[^a-z0-9]", "", w.lower().replace("nggak", "gak").replace("ga", "gak") if False else w.lower())
out = []
for m in T:
    if m["type"] == "card": continue
    toks = TXT[m["item"]].split()
    ws = [w for w in W if w["s"] >= m["start"] - 0.05 and w["s"] < m["end"]]
    a = [norm(t) for t in toks]; b = [norm(w["w"]) for w in ws]
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    times = [None] * len(toks)
    for blk in sm.get_opcodes():
        tag, i1, i2, j1, j2 = blk
        if tag == "equal" or (tag == "replace" and i2 - i1 == j2 - j1):
            for k in range(i2 - i1): times[i1 + k] = (ws[j1 + k]["s"], ws[j1 + k]["e"])
        elif tag == "replace":
            s0, e0 = ws[j1]["s"], ws[j2 - 1]["e"]
            for k in range(i2 - i1):
                times[i1 + k] = (s0 + (e0 - s0) * k / (i2 - i1), s0 + (e0 - s0) * (k + 1) / (i2 - i1))
    # isi yang kosong dengan interpolasi
    for k in range(len(times)):
        if times[k] is None:
            prev = next((times[j][1] for j in range(k - 1, -1, -1) if times[j]), m["start"])
            nxt = next((times[j][0] for j in range(k + 1, len(times)) if times[j]), m["end"])
            times[k] = (prev, min(nxt, prev + 0.3))
    out.append({"item": m["item"], "start": m["start"], "end": m["end"], "words": [{"w": t, "s": round(s, 3), "e": round(e, 3)} for t, (s, e) in zip(toks, times)]})
json.dump(out, open("captions.json", "w"), ensure_ascii=False, indent=0)
for o in out: print(o["item"], " ".join(f"{x['s']:.2f}:{x['w']}" for x in o["words"])[:400])
